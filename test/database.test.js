import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';

test('Postgres migrations: private packs, concurrent-safe quota, VIP protection, billing replay and audit ownership',async()=>{
 const db=new PGlite();
 try{
 await db.exec(`CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role BYPASSRLS;
 CREATE SCHEMA auth;CREATE TABLE auth.users(id uuid PRIMARY KEY);
 CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 CREATE FUNCTION auth.role() RETURNS text LANGUAGE sql STABLE AS $$SELECT current_user::text$$;
 GRANT USAGE ON SCHEMA auth TO anon,authenticated,service_role;
 CREATE SCHEMA storage;CREATE TABLE storage.buckets(id text PRIMARY KEY,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
 CREATE TABLE storage.objects(id uuid PRIMARY KEY,bucket_id text,name text);ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;`);
 for(const name of ['001_initial_schema.sql','002_row_level_security.sql','003_storage_buckets.sql','004_backend_integration.sql'])await db.exec(await readFile(new URL('../supabase/migrations/'+name,import.meta.url),'utf8'));
 const a='11111111-1111-4111-8111-111111111111',b='22222222-2222-4222-8222-222222222222';
 await db.query('INSERT INTO auth.users VALUES($1),($2)',[a,b]);
 const questions=Array.from({length:5},(_,i)=>({question:'Question '+i,options:['A','B','C','D','E','F']}));
 const asUser=async id=>{await db.exec('RESET ROLE');await db.query("SELECT set_config('request.jwt.claim.sub',$1,false)",[id]);await db.exec('SET ROLE authenticated');};
 await asUser(a);
 const ids=[];for(let i=0;i<3;i++)ids.push((await db.query('SELECT save_custom_pack(null,$1,$2,false) AS p',['Pack '+i,JSON.stringify(questions)])).rows[0].p.id);
 await assert.rejects(db.query('SELECT save_custom_pack(null,$1,$2,false)',['Fourth',JSON.stringify(questions)]),/pack limit/i);
 await db.query('SELECT save_custom_pack($1,$2,$3,false)',[ids[0],'Updated',JSON.stringify(questions)]);
 await assert.rejects(db.query('INSERT INTO profiles(id,display_name,is_vip) VALUES($1,$2,true)',[a,'Cheater']),/permission denied/i);
 await assert.rejects(db.query('INSERT INTO custom_packs(host_id,title,questions) VALUES($1,$2,$3)',[a,'Bypass',JSON.stringify(questions)]),/permission denied/i);
 await assert.rejects(db.query('SELECT archive_game($1,$2)',['{}','[]']),/permission denied/i);
 await asUser(b);assert.equal((await db.query('SELECT * FROM custom_packs')).rows.length,0);
 await assert.rejects(db.query('SELECT save_custom_pack($1,$2,$3,false)',[ids[0],'Stolen',JSON.stringify(questions)]),/not found/i);
 await db.exec('RESET ROLE');await db.query("INSERT INTO subscriptions(user_id,provider_sub_id,status,valid_until) VALUES($1,'sub_vip','active',now()+interval '1 day')",[a]);
 await asUser(a);await db.query('SELECT save_custom_pack(null,$1,$2,true)',['VIP fourth',JSON.stringify(questions)]);
 await asUser(b);assert.equal((await db.query('SELECT * FROM custom_packs')).rows.length,1);
 await db.exec('RESET ROLE');
 await db.exec("INSERT INTO packed_questions(id,question,is_vip) VALUES(gen_random_uuid(),'Free',false),(gen_random_uuid(),'Paid',true);INSERT INTO packed_options(id,question_id,text,order_index) SELECT gen_random_uuid(),id,'Choice',0 FROM packed_questions");
 await db.exec('SET ROLE anon');assert.equal((await db.query('SELECT * FROM subscriptions')).rows.length,0);assert.equal((await db.query('SELECT * FROM packed_questions')).rows.length,1);assert.equal((await db.query('SELECT * FROM packed_options')).rows.length,1);
 await db.exec('RESET ROLE; SET ROLE service_role');
 const c=(await db.query('SELECT reserve_checkout($1) AS c',[a])).rows[0].c;assert.equal(c.created,true);assert.equal((await db.query('SELECT reserve_checkout($1) AS c',[a])).rows[0].c.created,false);
 await db.query("UPDATE billing_checkouts SET provider_sub_id='sub_test' WHERE user_id=$1",[a]);
 const apply=(id,time,status)=>db.query('SELECT apply_billing_event($1,$2,$3,$4,$5,$6,false) AS applied',[id,time,a,'sub_test',status,'2099-01-01T00:00:00Z']);
 assert.equal((await apply('event1',10,'active')).rows[0].applied,true);assert.equal((await apply('event1',10,'active')).rows[0].applied,false);
 await apply('event2',20,'canceled');await apply('older',15,'active');await apply('same-second-stale',20,'active');assert.equal((await db.query("SELECT status FROM subscriptions WHERE provider_sub_id='sub_test'")).rows[0].status,'canceled');
 const sid='33333333-3333-4333-8333-333333333333',rid='44444444-4444-4444-8444-444444444444';
 const session={id:sid,room_code:'ABCDE',game_slug:'packed',host_id:a,seated_count:6,total_rounds:1,finished:false,final_scores:{p:4}},receipts=[{round_number:1,round_id:rid,commitment:'a'.repeat(64),proof:{revealed:true},points:{p:4}}];
 await db.query('SELECT archive_game($1,$2)',[JSON.stringify(session),JSON.stringify(receipts)]);await db.query('SELECT archive_game($1,$2)',[JSON.stringify(session),JSON.stringify(receipts)]);assert.equal((await db.query('SELECT * FROM round_receipts')).rows.length,1);
 await asUser(b);assert.equal((await db.query('SELECT * FROM round_receipts')).rows.length,0);await asUser(a);assert.equal((await db.query('SELECT * FROM round_receipts')).rows.length,1);
 await db.exec('RESET ROLE');const seed=await readFile(new URL('../supabase/seed-packed.sql',import.meta.url),'utf8');await db.exec(seed);await db.exec(seed);assert.equal((await db.query('SELECT count(*)::int AS n FROM packed_questions')).rows[0].n,62);assert.equal((await db.query('SELECT count(*)::int AS n FROM packed_options')).rows[0].n,362);
 }finally{await db.close();}
});
