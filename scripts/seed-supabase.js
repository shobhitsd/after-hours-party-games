// Generate deterministic, repeatable seed SQL. No remote writes unless --apply is supplied.
import {createHash} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {packedQuestions} from '../packed-content.js';
import {createDatabase} from '../lib/supabase.js';
const uuid=text=>{const h=createHash('sha256').update(text).digest('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-4${h.slice(13,16)}-a${h.slice(17,20)}-${h.slice(20,32)}`;};
const quote=s=>s==null?'NULL':"'"+String(s).replaceAll("'","''")+"'";
const questions=[],options=[];
for(const [question,choices]of packedQuestions){const id=uuid('packed-question:'+question);questions.push({id,question,is_vip:false,is_active:true});choices.forEach((o,i)=>options.push({id:uuid(id+':'+i),question_id:id,text:o.text,image_url:o.image||null,order_index:i}));}
if(process.argv.includes('--apply')){
 const db=createDatabase();if(!db.configured())throw new Error('Configure Supabase URL, public key and server secret before --apply.');
 // Stable primary keys make reruns safe; the local fallback covers a partially seeded bank.
 for(const [table,rows]of [['packed_questions',questions],['packed_options',options]])await db.request(table+'?on_conflict=id',{method:'POST',body:rows,merge:true});
 console.log(`Seeded ${questions.length} Packed House questions and ${options.length} options.`);
}else{
 const sql=['BEGIN;'];
 for(const q of questions)sql.push(`INSERT INTO public.packed_questions(id,question,is_vip,is_active) VALUES(${quote(q.id)},${quote(q.question)},false,true) ON CONFLICT(id) DO UPDATE SET question=excluded.question;`);
 for(const o of options)sql.push(`INSERT INTO public.packed_options(id,question_id,text,image_url,order_index) VALUES(${quote(o.id)},${quote(o.question_id)},${quote(o.text)},${quote(o.image_url)},${o.order_index}) ON CONFLICT(id) DO UPDATE SET text=excluded.text,image_url=excluded.image_url,order_index=excluded.order_index;`);
 sql.push('COMMIT;');await writeFile(new URL('../supabase/seed-packed.sql',import.meta.url),sql.join('\n')+'\n');console.log(`Prepared supabase/seed-packed.sql: ${questions.length} questions, ${options.length} options. No cloud writes.`);
}
