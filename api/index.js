import { Readable } from 'node:stream';
import handleRequest from '../server.js';

/**
 * Universal Vercel Serverless Function entrypoint.
 * Supports both standard Node.js (req, res) and Web Standard (Request) invocations.
 */
export default async function handler(req, res) {
  // 1. Standard Vercel Node.js runtime (req: IncomingMessage, res: ServerResponse)
  if (res && typeof res.writeHead === 'function') {
    try {
      if (req.headers && req.headers['x-matched-path']) {
        req.url = req.headers['x-matched-path'];
      }
      return await handleRequest(req, res);
    } catch (err) {
      console.error('Vercel Serverless Function Error:', err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err?.message || 'Server error' }));
      } else {
        res.end();
      }
      return;
    }
  }

  // 2. Web Standard / Edge / Test Fetch API invocation
  return handler.fetch(req);
}

handler.fetch = async function fetch(request) {
  try {
    const req = request.body ? Readable.fromWeb(request.body) : Readable.from([]);
    req.method = request.method;
    req.url = request.url;
    req.headers = Object.fromEntries(request.headers);
    req.headers.host ??= new URL(request.url).host;
    req.serverless = true;
    req.socket = { remoteAddress: req.headers['x-forwarded-for']?.split(',')[0].trim() || 'serverless' };

    let status = 200, headers = {}, chunks = [];
    const res = {
      headersSent: false,
      writeHead(code, values) {
        status = code;
        headers = values || {};
        this.headersSent = true;
      },
      write(data) {
        chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
      },
      end(data) {
        if (data) chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
      }
    };

    await handleRequest(req, res);
    return new Response(Buffer.concat(chunks), { status, headers });
  } catch (err) {
    console.error('Vercel Fetch Adapter Error:', err);
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
