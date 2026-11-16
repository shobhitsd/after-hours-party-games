import {Readable} from 'node:stream';
import handleRequest from '../server.js';

// Web-standard entry preserves original webhook bytes: no JSON body helper runs first.
export default {
 async fetch(request){
  const req=request.body?Readable.fromWeb(request.body):Readable.from([]);
  req.method=request.method;req.url=request.url;req.headers=Object.fromEntries(request.headers);
  req.headers.host??=new URL(request.url).host;req.serverless=true;
  req.socket={remoteAddress:req.headers['x-forwarded-for']?.split(',')[0].trim()||'serverless'};
  let status=200,headers={},chunks=[];
  const res={headersSent:false,writeHead(code,values){status=code;headers=values;this.headersSent=true;},write(data){chunks.push(Buffer.from(data));},end(data){if(data)chunks.push(Buffer.from(data));}};
  await handleRequest(req,res);
  return new Response(Buffer.concat(chunks),{status,headers});
 }
};
