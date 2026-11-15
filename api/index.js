import handleRequest from '../server.js';

export default async function handler(req, res) {
  try {
    return await handleRequest(req, res);
  } catch (err) {
    console.error('Vercel Serverless Function Error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err?.message || 'Server error' }));
    } else {
      res.end();
    }
  }
}
