export default async function handler(req, res) {
  if (req.url === '/api/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      ok: true,
      node: process.version,
      argv: process.argv,
      cwd: process.cwd()
    }));
  }

  try {
    const { handleRequest } = await import('../server.js');
    if (req.headers && req.headers['x-matched-path']) {
      req.url = req.headers['x-matched-path'];
    }
    return await handleRequest(req, res);
  } catch (err) {
    console.error('Serverless Handler Error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: err.message || 'Server error',
        stack: err.stack,
        code: err.code,
        name: err.name
      }));
    }
  }
}
