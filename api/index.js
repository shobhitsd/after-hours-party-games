import { handleRequest } from '../server.js';

export default async function handler(req, res) {
  try {
    if (req.headers['x-matched-path']) {
      req.url = req.headers['x-matched-path'];
    }
    return await handleRequest(req, res);
  } catch (err) {
    console.error('Serverless Handler Error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
    }
  }
}
