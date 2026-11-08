const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');const {DatabaseSync}=require('node:sqlite');
function compile(path,dependencies){const source=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true,resolveJsonModule:true}}).outputText;const m={exports:{}};vm.runInNewContext(source,{exports:m.exports,module:m,require:name=>{if(name in dependencies)return dependencies[name];throw Error(name)},Response,Request,URL,crypto,Date,Map,Set,Error,JSON,Number,Array,String,console},{filename:path});return m.exports}
const study=compile('lib/study.ts',{'./starter.json':JSON.parse(fs.readFileSync('lib/starter.json','utf8'))});
const sqlite=new DatabaseSync(':memory:');for(const path of fs.readdirSync('drizzle').filter(x=>x.endsWith('.sql')).sort())sqlite.exec(fs.readFileSync('drizzle/'+path,'utf8'));
const DB={prepare(sql){return {bind(...args){return statement(sql,args)},...statement(sql,[])}}};
function statement(sql,args){return {async all(){return {results:sqlite.prepare(sql).all(...args)}},async first(){return sqlite.prepare(sql).get(...args)||null},async run(){return sqlite.prepare(sql).run(...args)}}}
let identity=null;const route=compile('app/api/study/route.ts',{'cloudflare:workers':{env:{DB}},'../../chatgpt-auth':{getChatGPTUser:async()=>identity},'../../../lib/study':study});
const A={userId:'test-user-a',email:'a@example.test'},B={userId:'test-user-b',email:'b@example.test'},OWNER={userId:'test-owner',email:'publisher@example.test'};
async function get(user){identity=user;const r=await route.GET();assert.equal(r.status,200);return r.json()}
async function post(user,body,status=200,origin='https://study.test'){identity=user;const r=await route.POST(new Request('https://study.test/api/study',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(body)}));const d=await r.json();assert.equal(r.status,status,JSON.stringify(d));return d}
const material={type:'card',topic:'Foundations',domain:study.domains[0],title:'Test concept',body:'Test answer',source:'Synthetic test fixture',visibility:'private'};
test('Private isolation, explicit sharing, publisher rights, moderation and private progress',async()=>{
 const pub=await get(null);assert.equal(pub.items.length,32);assert.equal(pub.user,null);
 await post(null,{action:'create',item:material},401);
 const a=await post(A,{action:'create',item:material});assert((await get(A)).items.some(x=>x.id===a.id));assert(!(await get(B)).items.some(x=>x.id===a.id));assert(!(await get(null)).items.some(x=>x.id===a.id));
 await post(B,{action:'update',id:a.id,item:{...material,title:'Changed'}},404);await post(B,{action:'archive',id:a.id},403);
 await post(A,{action:'create',item:{...material,visibility:'community'}},400);
 await post(A,{action:'create',item:{...material,visibility:'library'},confirmShared:true},400);
 const c=await post(A,{action:'create',item:{...material,visibility:'community',author:'Classmate'},confirmShared:true});assert((await get(B)).items.some(x=>x.id===c.id));
 const l=await post(OWNER,{action:'create',item:{...material,visibility:'library'},confirmShared:true});assert((await get(null)).items.some(x=>x.id===l.id));
 await post(A,{action:'create',item:{...material,type:'question',options:['A','B','C','D'],correct:0,visibility:'community'},confirmShared:true},400);
 await post(A,{action:'create',item:material},403,'https://foreign.test');
 await post(B,{action:'report',id:c.id,reason:'Synthetic correction request'});const queue=await get(OWNER);assert.equal(queue.reports.length,1);assert.equal((await get(B)).reports.length,0);
 await post(B,{action:'hide',id:c.id},403);await post(OWNER,{action:'hide',id:c.id});assert(!(await get(null)).items.some(x=>x.id===c.id));await post(A,{action:'restore',id:c.id},403);
 await post(OWNER,{action:'resolve',id:queue.reports[0].id});assert.equal((await get(OWNER)).reports.length,0);
 await post(A,{action:'archive',id:a.id});assert(!(await get(A)).items.some(x=>x.id===a.id));assert((await get(A)).archived.some(x=>x.id===a.id));await post(A,{action:'restore',id:a.id});assert((await get(A)).items.some(x=>x.id===a.id));
 const q=study.library.find(x=>x.type==='question');const attempt=await post(A,{action:'attempt',id:'test-attempt',mode:'quiz',score:100,answers:[{id:q.id,answer:(q.correct+1)%4}]});assert.equal(attempt.attempt.score,0);
 await post(A,{action:'attempt',id:'test-attempt',mode:'quiz',answers:[{id:q.id,answer:q.correct}]});assert.equal((await get(A)).attempts.length,1);assert.equal((await get(B)).attempts.length,0);assert.equal((await get(null)).attempts.length,0);
 const pq=await post(A,{action:'create',item:{...material,type:'question',options:['A','B','C','D'],correct:0}});await post(B,{action:'attempt',id:'cross-user-question',mode:'quiz',answers:[{id:pq.id,answer:0}]},400);
});
test('Readiness uses unique, recent library questions and latest answers only',()=>{
 const now=Date.now(),q=study.library.find(x=>x.type==='question');const answer={id:q.id,correct:true,domain:q.domain,eligible:true,answer:q.correct};const attempts=[{id:'a',date:new Date(now-1000).toISOString(),answers:[answer],score:100,mode:'quiz'},{id:'b',date:new Date(now).toISOString(),answers:[{...answer,correct:false}],score:0,mode:'quiz'}];let r=study.readiness(attempts,now);assert.equal(r.total,1);assert.equal(r.score,0);assert.equal(r.enough,false);
 r=study.readiness([{...attempts[0],answers:[{...answer,eligible:false}]}],now);assert.equal(r.total,0);
 r=study.readiness([{...attempts[0],date:new Date(now-31*86400000).toISOString()}],now);assert.equal(r.total,0);
 const all=study.domains.flatMap((domain,d)=>Array.from({length:10},(_,i)=>({...answer,id:`${d}-${i}`,domain})));r=study.readiness([{...attempts[0],answers:all}],now);assert.equal(r.total,50);assert.equal(r.enough,true);assert.equal(r.label,'Consistent practice performance');
});
