import {serviceError} from './supabase.js';
export const CAS_SCRIPT="local current=redis.call('GET',KEYS[1]); if current~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',ARGV[3]); return 1";
export function createRoomStore({env=process.env,fetchImpl=fetch,rooms=new Map()}={}){
 const url=env.UPSTASH_REDIS_REST_URL,token=env.UPSTASH_REDIS_REST_TOKEN,shared=Boolean(url&&token),queues=new Map();
 const key=code=>'afterhours:room:'+code;
 async function command(args){
  if(!url||!token)throw serviceError('Shared room storage needs both Upstash settings.');
  try{const r=await fetchImpl(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(args),signal:AbortSignal.timeout(6000)});if(!r.ok)throw new Error();const data=await r.json();if(data.error)throw new Error();return data.result;}catch{throw serviceError('Shared room storage is temporarily unavailable. Your saved game has not been replaced. Please retry.');}
 }
 async function create(room){if(shared){if(await command(['SET',key(room.code),JSON.stringify(room),'EX',7200,'NX'])!=='OK')return false;}else if(rooms.has(room.code))return false;rooms.set(room.code,room);return true;}
 async function transaction(code,operation){
  if(typeof code!=='string'||!/^[A-Z2-9]{5}$/.test(code))throw serviceError('Enter a valid room code.',400);
  const previous=queues.get(code)||Promise.resolve();let release;const gate=new Promise(resolve=>release=resolve);queues.set(code,gate);await previous;
  try{for(let attempt=0;attempt<12;attempt++){
   const raw=shared?await command(['GET',key(code)]):null,original=shared?(raw?JSON.parse(raw):null):rooms.get(code);
   if(!original)throw serviceError('Room not found. It may have expired.',404);
   const room=structuredClone(original),result=await operation(room),serialized=JSON.stringify(room);
   if(shared&&serialized!==raw&&await command(['EVAL',CAS_SCRIPT,1,key(code),raw,serialized,7200])!==1)continue;
   rooms.set(code,room);return {room,result};
  }throw serviceError('The room is busy. Please try your action again.',409);
  }finally{release();if(queues.get(code)===gate)queues.delete(code);}
 }
 async function rateLimit(id,max=240){const n=await command(['EVAL',"local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],60) end; return n",1,'afterhours:limit:'+id]);return n<=max;}
 return {shared,rooms,create,transaction,rateLimit};
}
