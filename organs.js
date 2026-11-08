'use strict';
const ORGAN_SETS={
 heart:{title:'Heart',image:'heart-reference.jpeg',crop:200,height:630,note:'Right and left refer to the patient, so the right side of the heart appears on your left. Both pulmonary-vein callouts use the same answer. The arrows show blood flow.',labels:[
 ['Superior vena cava',[24,235,120,53],['svc'],'Large vein returning blood from the upper body to the right atrium.'],
 ['Aorta',[448,203,85,31],[],'Main artery carrying blood from the left ventricle to the body.'],
 ['Pulmonary artery',[491,246,170,57],['pulmonary arteries','pulmonary trunk'],'Carries blood from the right ventricle toward the lungs.'],
 ['Pulmonary vein',[20,391,134,57],['pulmonary veins'],'Returns oxygenated blood from the lungs to the left atrium.'],
 ['Pulmonary vein',[585,368,124,57],['pulmonary veins'],'Another callout to the vessels returning blood from the lungs.'],
 ['Right atrium',[12,466,87,56],['ra'],'Upper chamber receiving blood returning from the body.'],
 ['Left atrium',[585,478,99,56],['la'],'Upper chamber receiving blood from the lungs.'],
 ['Pulmonary valve',[0,546,123,57],['pulmonic valve','pulmonary semilunar valve'],'Outflow valve from the right ventricle.'],
 ['Mitral valve',[585,572,113,57],['bicuspid valve','left atrioventricular valve','left av valve'],'Valve between the left atrium and left ventricle.'],
 ['Tricuspid valve',[0,637,99,57],['right atrioventricular valve','right av valve'],'Valve between the right atrium and right ventricle.'],
 ['Aortic valve',[585,665,105,57],['aortic semilunar valve'],'Outflow valve from the left ventricle.'],
 ['Inferior vena cava',[0,720,112,62],['ivc'],'Large vein returning blood from the lower body.'],
 ['Right ventricle',[117,790,162,34],['rv'],'Lower chamber pumping blood toward the lungs.'],
 ['Left ventricle',[561,789,148,35],['lv'],'Lower chamber pumping blood into systemic circulation.']
 ]},
 throat:{title:'Throat & pharynx',image:'throat-reference.jpeg',crop:300,height:755,note:'Use the colored key as three additional blanks: yellow, green, and purple. Hypopharynx and laryngopharynx are accepted as synonyms.',labels:[
 ['Nasal cavity',[45,380,169,38],['nasal cavities'],'Space inside the nose.'],
 ['Nasopharynx',[452,365,207,41],[],'Yellow region: part of the pharynx behind the nasal cavity.'],
 ['Oropharynx',[452,406,207,40],[],'Green region: part of the pharynx behind the oral cavity.'],
 ['Hypopharynx',[452,446,207,41],['laryngopharynx'],'Purple region: lowest part of the pharynx.'],
 ['Tongue',[28,579,96,40],[],'Muscular structure occupying much of the oral cavity.'],
 ['Pharynx',[566,665,122,41],['throat'],'Shared passage behind the nose and mouth, outlined by the bracket.'],
 ['Larynx',[28,776,130,65],['voicebox','voice box'],'Voice box, superior to the trachea.'],
 ['Esophagus',[537,850,148,40],['oesophagus'],'Posterior passage carrying food toward the stomach.'],
 ['Trachea',[523,896,144,40],['windpipe'],'Air passage leading toward the bronchi.']
 ]},
 lungs:{title:'Lungs & bronchial tree',image:'lungs-reference.jpeg',crop:200,height:710,note:'Right and left refer to the patient. Primary bronchi are also called main bronchi; secondary bronchi are lobar bronchi. The carina marks the division of the trachea.',labels:[
 ['Larynx',[139,267,48,23],['voice box','voicebox'],'Voice box at the top of the pictured airway.'],
 ['Cricoid cartilage',[438,331,137,26],['cricoid'],'Ring-shaped cartilage just inferior to the thyroid cartilage.'],
 ['Trachea',[129,422,59,25],['windpipe'],'Main airway tube before it branches.'],
 ['Tracheal cartilages',[443,446,151,26],['tracheal cartilage','cartilage rings','tracheal rings','c shaped cartilage rings'],'Supportive rings that help keep the trachea open.'],
 ['Carina',[364,534,66,25],[],'Ridge at the division into the two main bronchi.'],
 ['Primary bronchi',[309,661,68,45],['main bronchi','mainstem bronchi','main stem bronchi','primary bronchus'],'First two branches entering the lungs.'],
 ['Secondary bronchi',[308,727,68,45],['lobar bronchi','secondary bronchus'],'Branches supplying individual lung lobes.'],
 ['Bronchioles',[315,840,72,27],['bronchiole'],'Smaller branches of the conducting airway.'],
 ['Right lung',[190,867,70,24],[],'Lung on the patient’s right; appears on the viewer’s left.'],
 ['Left lung',[461,867,68,24],[],'Lung on the patient’s left; appears on the viewer’s right.']
 ]}
};
for(const set of Object.values(ORGAN_SETS))set.labels=set.labels.map(([answer,box,aliases,hint],id)=>({id,answer,box,aliases,hint}));
let organSet='heart';const organRounds={heart:{},throat:{},lungs:{}};let organRevealed=false;
function organNormalize(v){return String(v??'').toLowerCase().trim().replace(/[()]/g,'').replace(/[-–]/g,' ').replace(/\s+/g,' ')}
function organCorrect(x,v){return [x.answer,...x.aliases].some(a=>organNormalize(a)===organNormalize(v))}
function switchOrgan(key){if(!ORGAN_SETS[key])return;organSet=key;organRevealed=false;organPractice()}
function organPractice(){const set=ORGAN_SETS[organSet],answers=organRounds[organSet];app.innerHTML=heading('Heart, throat & lung anatomy.','Fill the blanks on your three supplied diagrams. Each activity keeps its own answers while you switch tabs.')+`<div class="toolbar">${Object.entries(ORGAN_SETS).map(([key,s])=>`<button aria-pressed="${key===organSet}" class="${key===organSet?'primary':''}" onclick="switchOrgan('${key}')">${s.title} · ${s.labels.length}</button>`).join('')}</div><div class="toolbar"><button class="primary" onclick="checkOrgan()">Check answers</button><button onclick="revealOrgan()">Reveal answers</button><button onclick="resetOrgan()">Try again</button><a class="button" href="/resources/${set.image}" target="_blank" rel="noopener">Original reference ↗</a></div><p class="notice">${esc(set.note)}</p><p id="organ-status" role="status" aria-live="polite">${set.labels.length} blanks · Type on the diagram or use the larger numbered fields below. Common synonyms and capitalization are accepted.</p><div class="anatomy-scroll" tabindex="0" aria-label="Anatomy diagram. Scroll sideways on small screens."><div class="skeleton-canvas" style="height:${set.height}px"><img src="/resources/${set.image}" style="top:-${set.crop}px" alt="${set.title} organ with numbered blanks replacing bone labels.">${(set.masks||[]).map(([x,y,w,h])=>`<span class="anatomy-mask" style="left:${x}px;top:${y-set.crop}px;width:${w}px;height:${h}px;font:12px system-ui;padding:5px">Posterior skull not shown</span>`).join('')}${set.labels.map(x=>{const [left,top,width,height]=x.box;return `<label class="anatomy-blank skeleton-blank" style="left:${left}px;top:${top-set.crop}px;width:${width}px;height:${height}px"><span>${x.id+1}</span><input id="organ-${x.id}" aria-label="Organ blank ${x.id+1}" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="…" value="${esc(answers[x.id]||'')}" oninput="editOrgan(${x.id},this.value)"></label>`}).join('')}</div></div><section class="contentcard"><h2>Numbered answer list</h2><p>These larger fields stay in sync with the diagram. Expand a hint when needed.</p><div class="anatomy-list">${set.labels.map(x=>`<div><label for="organ-list-${x.id}">Blank ${x.id+1}</label><input id="organ-list-${x.id}" autocomplete="off" autocapitalize="none" spellcheck="false" value="${esc(answers[x.id]||'')}" oninput="editOrgan(${x.id},this.value)"><span class="anatomy-result" id="organ-result-${x.id}"></span><details><summary>Hint ${x.id+1}</summary><p>${esc(x.hint)}</p></details></div>`).join('')}</div></section><p class="source">User-supplied references: heart — Cardiology Associates of Michigan; pharynx — Cleveland Clinic; lungs — WisTech Open / OpenStax-derived illustration. Practice overlays added. <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy" target="_blank" rel="noopener">Heart reference ↗</a> · <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system" target="_blank" rel="noopener">Airway reference ↗</a></p>`}
function editOrgan(id,value){if(!ORGAN_SETS[organSet].labels[id])return;organRounds[organSet][id]=value;organRevealed=false;for(const prefix of ['organ-','organ-list-']){const input=document.getElementById(prefix+id);if(input.value!==value)input.value=value;input.removeAttribute('aria-invalid')}document.getElementById('organ-'+id).parentElement.classList.remove('anatomy-right','anatomy-wrong');document.getElementById('organ-result-'+id).textContent='';document.getElementById('organ-status').textContent='Answers changed. Check again when ready.'}
function checkOrgan(){const labels=ORGAN_SETS[organSet].labels,answers=organRounds[organSet];let correct=0;for(const x of labels){const ok=organCorrect(x,answers[x.id]);if(ok)correct++;const el=document.getElementById('organ-'+x.id);el.parentElement.classList.toggle('anatomy-right',ok);el.parentElement.classList.toggle('anatomy-wrong',!ok);for(const prefix of ['organ-','organ-list-'])document.getElementById(prefix+x.id).setAttribute('aria-invalid',String(!ok));document.getElementById('organ-result-'+x.id).textContent=ok?'✓ Correct':answers[x.id]?'Try again':'Unanswered'}document.getElementById('organ-status').textContent=organRevealed?'Answers revealed — study the structures, then choose Try again.':`${correct} of ${labels.length} correct. Review marked blanks or expand their hints.`}
function revealOrgan(){for(const x of ORGAN_SETS[organSet].labels)organRounds[organSet][x.id]=x.answer;organRevealed=true;organPractice();checkOrgan()}
function resetOrgan(){organRounds[organSet]={};organRevealed=false;organPractice()}
