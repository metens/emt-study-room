import starter from './starter.json';
export const domains=['Scene Size-Up and Safety','Primary Assessment','Secondary Assessment','Patient Treatment and Transport','Operations'];
export const topics=['Foundations','Anatomy & physiology','Patient assessment','Airway & respiration','Shock & resuscitation','Medical emergencies','Trauma','Special populations','EMS operations'];
export type Material={id:string;type:string;title:string;body:string;topic:string;domain:string;source:string;sourceUrl?:string;visibility:string;author?:string;options?:string[];correct?:number;image?:string;builtIn?:boolean;canEdit?:boolean;status?:string;origin?:string};
export type Answer={id:string;answer:number|null;correct:boolean;domain:string;eligible:boolean};
export type Attempt={id:string;score:number;date:string;mode:string;answers:Answer[]};
export const library:Material[]=starter;
export function readiness(attempts:Attempt[],now=Date.now()){
 const latest=new Map<string,Answer>();
 for(const a of [...attempts].sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))){if(now-Date.parse(a.date)>30*86400000)continue;for(const q of a.answers)if(q.eligible)latest.set(q.id,q)}
 const rows=domains.map(domain=>{const a=[...latest.values()].filter(q=>q.domain===domain);return {domain,count:a.length,score:a.length?Math.round(a.filter(q=>q.correct).length/a.length*100):null}});
 const total=latest.size,correct=[...latest.values()].filter(a=>a.correct).length,coverage=rows.filter(x=>x.count>=5).length,score=total?Math.round(correct/total*100):null,enough=total>=50&&coverage===5;
 return {total,score,coverage,rows,label:!enough?'Building your baseline':rows.every(x=>(x.score??0)>=80)?'Consistent practice performance':'Focus your next review',enough};
}
export function grade(questions:Material[],answers:{id:string;answer:number|null}[]){const result=answers.map(a=>{const q=questions.find(q=>q.id===a.id);if(!q)throw new Error('A question is unavailable. Start a new session.');return {id:q.id,answer:a.answer,correct:q.correct===a.answer,domain:q.domain,eligible:q.visibility==='library'}});return {score:Math.round(result.filter(x=>x.correct).length/result.length*100),answers:result}}
