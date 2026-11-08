import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
import {library,topics,domains,grade,readiness,type Material,type Attempt} from '../../../lib/study';
export const dynamic='force-dynamic';
const ownerEmail='publisher@example.test';
const out=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie','X-Content-Type-Options':'nosniff'}});
function db(){if(!env.DB)throw new Error('Study storage is temporarily unavailable.');return env.DB}
const admin=(u:{email:string}|null)=>u?.email.toLowerCase()===ownerEmail;
async function visible(userId?:string){const r=await db().prepare("SELECT id,owner_id,visibility,payload,status FROM materials WHERE status='active' AND (visibility IN ('library','community') OR owner_id=?) ORDER BY created_at DESC LIMIT 2000").bind(userId||'').all<{id:string;owner_id:string;visibility:string;payload:string;status:string}>();return [...library.map(x=>({...x,canEdit:false,status:'active'})),...r.results.map(x=>({...JSON.parse(x.payload),id:x.id,visibility:x.visibility,canEdit:x.owner_id===userId,status:x.status,builtIn:false}))] as Material[]}
function valid(input:any,isAdmin:boolean):Omit<Material,'id'>{
 if(!input||!['note','card','question','diagram'].includes(input.type))throw new Error('Choose a supported material type.');
 const text=(v:unknown,max:number)=>typeof v==='string'&&v.trim().length>0&&v.length<=max;
 if(!text(input.title,1500)||!text(input.body,20000)||!text(input.source,500)||!topics.includes(input.topic)||!domains.includes(input.domain))throw new Error('Add a title, content, source, topic, and study domain.');
 if(!['private','community','library'].includes(input.visibility))throw new Error('Choose where to save the material.');
 if(input.visibility==='library'&&!isAdmin)throw new Error('Only the publisher can add shared library material.');
 if(input.visibility==='community'&&!['note','card'].includes(input.type))throw new Error('The community pool accepts notes and flashcards.');
 let sourceUrl='';if(input.sourceUrl){try{const u=new URL(input.sourceUrl);if(u.protocol!=='https:')throw Error();sourceUrl=u.href}catch{throw new Error('Reference links must use https.')}}
 const data:Omit<Material,'id'>={type:input.type,title:input.title.trim(),body:input.body.trim(),source:input.source.trim(),sourceUrl,topic:input.topic,domain:input.domain,visibility:input.visibility,author:input.visibility==='private'?'You':String(input.author||'Classmate').trim().slice(0,40)||'Classmate',origin:typeof input.origin==='string'?input.origin.slice(0,200):undefined};
 if(input.type==='question'){if(!Array.isArray(input.options)||input.options.length!==4||!input.options.every((x:unknown)=>text(x,1500))||!Number.isInteger(input.correct)||input.correct<0||input.correct>3)throw new Error('Add four choices and select the correct answer.');data.options=input.options;data.correct=input.correct;}
 if(input.type==='diagram'){if(typeof input.image!=='string'||input.image.length>1500000||!(/^data:image\/(png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$/.test(input.image)||['/diagrams/assessment.svg','/diagrams/shock.svg'].includes(input.image)))throw new Error('Use a PNG, JPEG, or WebP image smaller than 1 MB.');data.image=input.image;}
 return data;
}
export async function GET(){try{const user=await getChatGPTUser(),isAdmin=admin(user),items=await visible(user?.userId);const a=user?await db().prepare('SELECT id,payload FROM attempts WHERE owner_id=? ORDER BY created_at DESC LIMIT 200').bind(user.userId).all<{id:string;payload:string}>():{results:[]};const attempts=a.results.map(x=>({...JSON.parse(x.payload),id:x.id})).reverse() as Attempt[];let archived:any[]=[],reports:any[]=[];if(user){const r=await db().prepare("SELECT id,payload,visibility,status FROM materials WHERE owner_id=? AND status<>'active' ORDER BY created_at DESC LIMIT 500").bind(user.userId).all<any>();archived=r.results.map(x=>({...JSON.parse(x.payload),id:x.id,visibility:x.visibility,status:x.status,canEdit:true}));}if(isAdmin){const r=await db().prepare("SELECT r.id,r.material_id,r.reason,m.payload FROM reports r LEFT JOIN materials m ON m.id=r.material_id WHERE r.status='open' ORDER BY r.created_at DESC LIMIT 100").all<any>();reports=r.results.map(x=>({id:x.id,materialId:x.material_id,reason:x.reason,title:x.payload?JSON.parse(x.payload).title:library.find(y=>y.id===x.material_id)?.title||'Unavailable material',builtIn:library.some(y=>y.id===x.material_id)}));}return out({items,attempts,archived,reports,readiness:readiness(attempts),user:user?{name:user.fullName||'Student',isAdmin}:null});}catch{return out({error:'Could not load the study collection. Please try again.'},503)}}
export async function POST(request:Request){try{
 const user=await getChatGPTUser();if(!user)return out({error:'Sign in to save material and progress.'},401);
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return out({error:'This action must start on this site.'},403);
 if(Number(request.headers.get('content-length')||0)>1700000)return out({error:'This upload is too large.'},413);
 const raw=await request.text();if(raw.length>1700000)return out({error:'This upload is too large.'},413);const body=JSON.parse(raw),isAdmin=admin(user);
 if(body.action==='create'||body.action==='update'){
 const payload=valid(body.item,isAdmin);if(payload.visibility!=='private'&&body.confirmShared!==true)return out({error:'Confirm that you want to share this material.'},400);
 if(body.action==='update'){
 const row=await db().prepare('SELECT owner_id FROM materials WHERE id=?').bind(body.id).first<{owner_id:string}>();if(!row||row.owner_id!==user.userId)return out({error:'Material not found.'},404);
 await db().prepare("UPDATE materials SET payload=?,kind=?,visibility=? WHERE id=? AND owner_id=? AND status='active'").bind(JSON.stringify(payload),payload.type,payload.visibility,body.id,user.userId).run();return out({ok:true});
 }
 const n=await db().prepare("SELECT COUNT(*) AS n FROM materials WHERE owner_id=? AND status='active'").bind(user.userId).first<{n:number}>();if((n?.n||0)>=500)return out({error:'Your collection has reached 500 items. Archive an item before adding more.'},400);
 const id=crypto.randomUUID();await db().prepare('INSERT INTO materials (id,owner_id,visibility,kind,payload,status,created_at) VALUES (?,?,?,?,?,?,?)').bind(id,user.userId,payload.visibility,payload.type,JSON.stringify(payload),'active',Date.now()).run();return out({ok:true,id});
 }
 if(['archive','restore','hide'].includes(body.action)){
 const row=await db().prepare('SELECT owner_id,visibility,status FROM materials WHERE id=?').bind(body.id).first<{owner_id:string;visibility:string;status:string}>();if(!row)return out({error:'Material not found.'},404);
 const own=row.owner_id===user.userId;if(body.action==='hide'?(!isAdmin||row.visibility==='private'):!own)return out({error:'This material is not available for this action.'},403);
 if(body.action==='restore'&&row.status==='hidden')return out({error:'This item is hidden by the publisher. Contact the publisher about the report.'},403);
 await db().prepare('UPDATE materials SET status=? WHERE id=?').bind(body.action==='restore'?'active':body.action==='hide'?'hidden':'archived',body.id).run();return out({ok:true});
 }
 if(body.action==='report'){
 if(!(await visible(user.userId)).some(x=>x.id===body.id&&x.visibility!=='private'))return out({error:'Shared material not found.'},404);
 if(typeof body.reason!=='string'||body.reason.trim().length<5||body.reason.length>1000)throw new Error('Describe the concern in 5–1,000 characters.');
 const existing=await db().prepare("SELECT id FROM reports WHERE reporter_id=? AND material_id=? AND status='open'").bind(user.userId,body.id).first();if(!existing)await db().prepare("INSERT INTO reports (id,material_id,reporter_id,reason,status,created_at) VALUES (?,?,?,?,'open',?)").bind(crypto.randomUUID(),body.id,user.userId,body.reason.trim(),Date.now()).run();return out({ok:true});
 }
 if(body.action==='resolve'){
 if(!isAdmin)return out({error:'Publisher access required.'},403);await db().prepare("UPDATE reports SET status='resolved' WHERE id=?").bind(body.id).run();return out({ok:true});
 }
 if(body.action==='attempt'){
 if(typeof body.id!=='string'||!/^[-a-zA-Z0-9]{1,80}$/.test(body.id)||!['quiz','exam'].includes(body.mode)||!Array.isArray(body.answers)||!body.answers.length||body.answers.length>100||new Set(body.answers.map((a:any)=>a.id)).size!==body.answers.length||!body.answers.every((a:any)=>typeof a.id==='string'&&(a.answer===null||Number.isInteger(a.answer)&&a.answer>=0&&a.answer<4)))throw new Error('The practice session is invalid.');
 const result=grade((await visible(user.userId)).filter(x=>x.type==='question'&&x.visibility!=='community'),body.answers),attempt={...result,date:new Date().toISOString(),mode:body.mode};await db().prepare('INSERT OR IGNORE INTO attempts (id,owner_id,payload,created_at) VALUES (?,?,?,?)').bind(body.id,user.userId,JSON.stringify(attempt),Date.now()).run();return out({ok:true,attempt:{...attempt,id:body.id}});
 }
 return out({error:'Unknown action.'},400);
 }catch(e){return out({error:e instanceof Error?e.message:'Could not save. Please try again.'},400)}}
