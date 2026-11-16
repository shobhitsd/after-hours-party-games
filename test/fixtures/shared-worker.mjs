import http from 'node:http';
import {handleRequest} from '../../server.js';
const server=http.createServer(handleRequest);
server.listen(0,'127.0.0.1',()=>process.send({port:server.address().port}));
process.on('message',message=>{if(message==='stop')server.close(()=>process.exit(0));});
