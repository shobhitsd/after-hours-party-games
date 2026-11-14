// Fixed field order is shared with the server. A secret 256-bit nonce hides small capacity draws.
export function proofText(p){return JSON.stringify([p.roundId,p.version,p.seatedCount,p.capacities,p.tieOrder,p.nonce]);}
// Portable SHA-256 also verifies on plain HTTP LAN addresses, where SubtleCrypto is unavailable.
export function sha256(text){
 const bytes=new TextEncoder().encode(text),n=Math.ceil((bytes.length+9)/64)*64,b=new Uint8Array(n);b.set(bytes);b[bytes.length]=128;
 const dv=new DataView(b.buffer);dv.setUint32(n-4,bytes.length*8);dv.setUint32(n-8,Math.floor(bytes.length/0x20000000));
 const k=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
 const h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],w=new Uint32Array(64),ro=(x,n)=>(x>>>n)|(x<<(32-n));
 for(let offset=0;offset<n;offset+=64){for(let i=0;i<16;i++)w[i]=dv.getUint32(offset+i*4);for(let i=16;i<64;i++){const x=w[i-15],y=w[i-2];w[i]=(w[i-16]+(ro(x,7)^ro(x,18)^(x>>>3))+w[i-7]+(ro(y,17)^ro(y,19)^(y>>>10)))>>>0;}
  let [a,c,d,e,f,g,j,l]=h;for(let i=0;i<64;i++){const t1=(l+(ro(f,6)^ro(f,11)^ro(f,25))+((f&g)^(~f&j))+k[i]+w[i])>>>0,t2=((ro(a,2)^ro(a,13)^ro(a,22))+((a&c)^(a&d)^(c&d)))>>>0;l=j;j=g;g=f;f=(e+t1)>>>0;e=d;d=c;c=a;a=(t1+t2)>>>0;}[a,c,d,e,f,g,j,l].forEach((v,i)=>h[i]=(h[i]+v)>>>0);
 }return h.map(x=>x.toString(16).padStart(8,'0')).join('');
}
export function verifyProof(proof,commitment){try{return sha256(proofText(proof))===commitment;}catch{return false;}}
