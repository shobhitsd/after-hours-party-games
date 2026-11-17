import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {emptyPlayer,fail} from './hidden-engine.js';
const localQueues=new Map();
async function replaceFile(temp,file){
 // Windows antivirus/indexers can hold a just-written file briefly. Keep the old
 // complete file until atomic replacement succeeds; never delete it as a fallback.
 for(let attempt=0;;attempt++){
  try{await rename(temp,file);return;}catch(e){if(!['EPERM','EBUSY','EACCES'].includes(e.code)||attempt>=8)throw e;await new Promise(resolve=>setTimeout(resolve,25*(attempt+1)));}
 }
}

// This adapter deliberately uses Postgres as the sole hosted source of truth.
// The file adapter is for a single-process local prototype, never serverless.
export function createHiddenStore({database,env=process.env,file=path.resolve('.local/hidden-depths.json')}={}){
 const local=!env.VERCEL&&env.HIDDEN_DEPTHS_STORE!=='supabase';
 async function disk(operation){
  const work=(localQueues.get(file)||Promise.resolve()).catch(()=>{}).then(async()=>{let all={};try{all=JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
   const before=JSON.stringify(all),result=operation(all),after=JSON.stringify(all);
   if(before!==after){await mkdir(path.dirname(file),{recursive:true});const temp=file+'.'+randomUUID()+'.tmp';await writeFile(temp,after,{mode:0o600});await replaceFile(temp,file);}return structuredClone(result);});
  localQueues.set(file,work);try{return await work;}finally{if(localQueues.get(file)===work)localQueues.delete(file);}
 }
 async function rpc(name,body){if(!database?.configured())fail('Hidden Depths needs its database connection. Your existing games are still available.',503);return database.request('rpc/hd_'+name,{method:'POST',body});}
 return {
  local,
  async read(key){return local?disk(all=>all[key]??={revision:0,state:emptyPlayer()}):rpc('read',{p_key:key});},
  async cas(key,revision,state){return local?disk(all=>{if(all[key]?.revision!==revision)return false;all[key]={revision:revision+1,state};return true;}):rpc('cas',{p_key:key,p_revision:revision,p_state:state});},
  async claim(guest,account,guestRevision,accountRevision,state){
   return local?disk(all=>{if(all[guest]?.revision!==guestRevision||all[account]?.revision!==accountRevision||all[guest].state.claim)return false;all[guest]={revision:guestRevision+1,state:{...emptyPlayer(),claim:account}};all[account]={revision:accountRevision+1,state};return true;}):rpc('claim',{p_guest:guest,p_account:account,p_guest_revision:guestRevision,p_account_revision:accountRevision,p_state:state});
  }
 };
}
