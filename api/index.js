export default async function handler(req, res) {
  // If Vercel rewrote the path, restore original path from x-matched-path
  if (req.headers && req.headers['x-matched-path']) {
    req.url = req.headers['x-matched-path'];
  }

  // Diagnostic ping
  if (req.url && req.url.includes('/api/ping')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, node: process.version, cwd: process.cwd(), url: req.url }));
  }

  // Step-by-step diagnostic loader to catch any import failure cleanly
  const diag = { ok: true, url: req.url, steps: [] };

  try {
    diag.steps.push('importing data.js');
    const data = await import('../data.js');
    diag.steps.push('data.js ok');
  } catch (e) {
    diag.error = 'data.js: ' + e.message;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(diag));
  }

  try {
    diag.steps.push('importing variety.js');
    const variety = await import('../variety.js');
    diag.steps.push('variety.js ok');
  } catch (e) {
    diag.error = 'variety.js: ' + e.message;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(diag));
  }

  try {
    diag.steps.push('importing bots.js');
    const bots = await import('../bots.js');
    diag.steps.push('bots.js ok');
  } catch (e) {
    diag.error = 'bots.js: ' + e.message;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(diag));
  }

  try {
    diag.steps.push('importing lone.js');
    const lone = await import('../lone.js');
    diag.steps.push('lone.js ok');
  } catch (e) {
    diag.error = 'lone.js: ' + e.message;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(diag));
  }

  try {
    diag.steps.push('importing engine.js');
    const engine = await import('../engine.js');
    diag.steps.push('engine.js ok');
  } catch (e) {
    diag.error = 'engine.js: ' + e.message;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(diag));
  }

  try {
    diag.steps.push('importing server.js');
    const { handleRequest } = await import('../server.js');
    diag.steps.push('server.js ok');
    return await handleRequest(req, res);
  } catch (e) {
    diag.error = 'server.js: ' + e.message;
    if (!res.headersSent) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(diag));
    }
  }
}
