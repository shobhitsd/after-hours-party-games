// A mistyped optional origin must not throw while the function module is loading.
export function resolvePublicOrigin(env=process.env){
 for(const value of [env.PUBLIC_ORIGIN,env.VERCEL_PROJECT_PRODUCTION_URL,env.VERCEL_URL]){
  if(!value?.trim())continue;
  try{const text=value.trim(),url=new URL(text.includes('://')?text:'https://'+text);if(['https:','http:'].includes(url.protocol)&&!url.username&&!url.password)return url.origin;}catch{}
 }
 return null;
}
