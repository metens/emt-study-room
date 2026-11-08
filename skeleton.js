'use strict';
const SKELETON_SETS={
 detail:{title:'Detailed skeleton',image:'skeleton-detail.jpeg',crop:190,height:960,note:'The handwritten reference swaps the jaw labels: upper jaw = maxilla; lower jaw = mandible. Its occipital callout is not a valid anterior-view target, so it is excluded from scoring. Some hand labels are cut off; use the numbered list to type comfortably.',masks:[[422,300,229,30]],labels:[
 ['Skull',[207,233,69,31],['cranium'],'Bones of the head.'],
 ['Frontal bone',[414,196,190,32],['frontal'],'Forehead.'],
 ['Parietal bone',[429,230,190,31],['parietal'],'Upper sides of the braincase.'],
 ['Temporal bone',[428,261,190,32],['temporal'],'Side of the skull near the ear.'],
 ['Maxilla',[159,293,103,30],['maxillae','upper jaw'],'Upper jaw; corrected from the handwritten label.'],
 ['Mandible',[176,322,85,27],['lower jaw'],'Lower jaw; corrected from the handwritten label.'],
 ['Cervical vertebrae',[423,333,225,32],['cervical','cervical spine'],'Seven vertebrae of the neck.'],
 ['Clavicle',[487,362,161,31],['collarbone'],'Collarbone.'],
 ['Scapula',[490,396,158,33],['shoulder blade'],'Shoulder blade.'],
 ['Sternum',[112,398,99,32],['breastbone'],'Central chest bone.'],
 ['Ribs',[141,435,59,30],['rib'],'Curved bones enclosing the chest.'],
 ['Humerus',[500,462,148,33],[],'Upper arm bone.'],
 ['Thoracic vertebrae',[96,488,106,49],['thoracic','thoracic spine'],'Twelve vertebrae associated with the ribs.'],
 ['Lumbar vertebrae',[100,556,98,49],['lumbar','lumbar spine'],'Five vertebrae of the lower back.'],
 ['Radius',[521,565,127,34],[],'Thumb-side forearm bone in anatomical position.'],
 ['Ulna',[525,602,123,34],[],'Little-finger-side forearm bone.'],
 ['Sacrum',[99,607,86,33],[],'Fused bone at the base of the spine between the hip bones.'],
 ['Coccyx',[100,637,78,32],['tailbone'],'Tailbone below the sacrum.'],
 ['Carpals',[545,647,103,32],['carpal','carpal bones'],'Wrist bones.'],
 ['Metacarpals',[552,682,96,33],['metacarpal','metacarpal bones'],'Palm bones.'],
 ['Pelvic girdle',[98,680,69,53],['hip bones','hip bone','coxal bones'],'The paired hip bones.'],
 ['Ilium',[100,749,56,32],[],'Broad upper part of the hip bone.'],
 ['Ischium',[142,780,86,33],[],'Posteroinferior part of the hip bone; bears weight when sitting.'],
 ['Pubis',[172,816,65,33],['pubic bone'],'Anterior part of the hip bone.'],
 ['Phalanges',[550,727,98,55],['phalanges hand','hand phalanges','finger bones'],'Finger bones.'],
 ['Femur',[455,778,130,33],['thighbone'],'Thigh bone.'],
 ['Patella',[453,847,179,34],['kneecap'],'Kneecap.'],
 ['Tibia',[453,915,178,34],['shinbone'],'Larger, medial lower-leg bone.'],
 ['Fibula',[452,951,178,34],[],'Slender, lateral lower-leg bone.'],
 ['Tarsals',[463,1025,185,34],['tarsal','tarsal bones'],'Ankle and proximal foot bones.'],
 ['Metatarsals',[474,1063,174,32],['metatarsal','metatarsal bones'],'Long bones between the tarsals and toes.'],
 ['Phalanges',[473,1096,175,39],['phalanges foot','foot phalanges','toe bones'],'Toe bones.']
 ]},
 overview:{title:'Anterior & posterior views',image:'skeleton-overview.jpeg',crop:200,height:710,note:'The screenshot’s search overlay obscures part of the feet. Use the detailed skeleton to practice toe bones. This diagram distinguishes the axial skeleton (central bones) from the appendicular skeleton (limbs and girdles).',masks:[],labels:[
 ['Cranial portion',[310,224,88,20],['cranial','cranium'],'Braincase portion of the skull.'],
 ['Facial portion',[308,249,92,20],['facial','facial bones'],'Bones of the face.'],
 ['Clavicle',[330,311,55,19],['collarbone'],'Collarbone.'],
 ['Scapula',[330,334,55,19],['shoulder blade'],'Shoulder blade.'],
 ['Sternum',[329,371,57,20],['breastbone'],'Breastbone.'],
 ['Ribs',[341,395,32,19],['rib'],'Bones of the rib cage.'],
 ['Vertebral column',[7,421,57,36],['spine','spinal column'],'Anterior-view callout to the spine.'],
 ['Vertebral column',[635,422,65,35],['spine','spinal column'],'Posterior-view callout to the spine.'],
 ['Pelvic girdle',[7,474,67,51],['hip bones','coxal bones'],'Anterior-view callout to the hip bones.'],
 ['Pelvic girdle',[634,474,68,51],['hip bones','coxal bones'],'Posterior-view callout to the hip bones.'],
 ['Humerus',[328,433,57,20],[],'Upper arm bone.'],
 ['Ulna',[339,465,38,20],[],'Forearm bone on the little-finger side.'],
 ['Radius',[334,484,46,20],[],'Forearm bone on the thumb side.'],
 ['Carpals',[332,501,51,20],['carpal bones','carpal'],'Wrist bones.'],
 ['Metacarpals',[318,535,74,20],['metacarpal bones','metacarpal'],'Palm bones.'],
 ['Phalanges',[315,566,63,20],['finger bones','hand phalanges'],'Finger bones.'],
 ['Femur',[333,629,46,20],['thighbone'],'Thigh bone.'],
 ['Patella',[333,649,46,20],['kneecap'],'Kneecap.'],
 ['Tibia',[333,722,37,20],['shinbone'],'Larger, medial lower-leg bone.'],
 ['Fibula',[333,751,41,20],[],'Slender, lateral lower-leg bone.'],
 ['Tarsals',[270,806,70,18],['tarsal bones','tarsal'],'Ankle and proximal foot bones.'],
 ['Metatarsals',[270,824,80,18],['metatarsal bones','metatarsal'],'Long bones of the foot.']
 ]}
};
for(const set of Object.values(SKELETON_SETS))set.labels=set.labels.map(([answer,box,aliases,hint],id)=>({id,answer,box,aliases,hint}));
let skeletonSet='detail';const skeletonRounds={detail:{},overview:{}};let skeletonRevealed=false;
function skeletonNormalize(v){return String(v??'').toLowerCase().trim().replace(/[()]/g,'').replace(/[-–]/g,' ').replace(/\s+/g,' ')}
function skeletonCorrect(x,v){return [x.answer,...x.aliases].some(a=>skeletonNormalize(a)===skeletonNormalize(v))}
function switchSkeleton(key){if(!SKELETON_SETS[key])return;skeletonSet=key;skeletonRevealed=false;skeletonPractice()}
function skeletonPractice(){const set=SKELETON_SETS[skeletonSet],answers=skeletonRounds[skeletonSet];app.innerHTML=heading('Skeletal system: name each bone.','Fill the blanks on both supplied diagrams. Switch views to practice different landmarks.')+`<div class="toolbar">${Object.entries(SKELETON_SETS).map(([key,s])=>`<button aria-pressed="${key===skeletonSet}" class="${key===skeletonSet?'primary':''}" onclick="switchSkeleton('${key}')">${s.title} · ${s.labels.length}</button>`).join('')}</div><div class="toolbar"><button class="primary" onclick="checkSkeleton()">Check answers</button><button onclick="revealSkeleton()">Reveal answers</button><button onclick="resetSkeleton()">Try again</button><a class="button" href="/resources/${set.image}" target="_blank" rel="noopener">Original reference ↗</a></div><p class="notice">${esc(set.note)}</p><p id="skeleton-status" role="status" aria-live="polite">${set.labels.length} blanks · Type on the diagram or use the larger numbered fields below. Common synonyms and capitalization are accepted.</p><div class="anatomy-scroll" tabindex="0" aria-label="Skeletal diagram. Scroll sideways on small screens."><div class="skeleton-canvas" style="height:${set.height}px"><img src="/resources/${set.image}" style="top:-${set.crop}px" alt="${set.title} skeleton with numbered blanks replacing bone labels.">${set.masks.map(([x,y,w,h])=>`<span class="anatomy-mask" style="left:${x}px;top:${y-set.crop}px;width:${w}px;height:${h}px;font:12px system-ui;padding:5px">Posterior skull not shown</span>`).join('')}${set.labels.map(x=>{const [left,top,width,height]=x.box;return `<label class="anatomy-blank skeleton-blank" style="left:${left}px;top:${top-set.crop}px;width:${width}px;height:${height}px"><span>${x.id+1}</span><input id="skeleton-${x.id}" aria-label="Skeleton blank ${x.id+1}" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="…" value="${esc(answers[x.id]||'')}" oninput="editSkeleton(${x.id},this.value)"></label>`}).join('')}</div></div><section class="contentcard"><h2>Numbered answer list</h2><p>These larger fields stay in sync with the diagram. Expand a hint when needed.</p><div class="anatomy-list">${set.labels.map(x=>`<div><label for="skeleton-list-${x.id}">Blank ${x.id+1}</label><input id="skeleton-list-${x.id}" autocomplete="off" autocapitalize="none" spellcheck="false" value="${esc(answers[x.id]||'')}" oninput="editSkeleton(${x.id},this.value)"><span class="anatomy-result" id="skeleton-result-${x.id}"></span><details><summary>Hint ${x.id+1}</summary><p>${esc(x.hint)}</p></details></div>`).join('')}</div></section><p class="source">User-supplied diagrams. Overview illustration: OpenStax, CC BY 4.0; handwritten illustration credited to Dr. Jay Variya in the reference. Practice overlays and corrected jaw labels added. <a href="https://openstax.org/books/biology-2e/pages/38-1-types-of-skeletal-systems" target="_blank" rel="noopener">Skeletal-system reference ↗</a></p>`}
function editSkeleton(id,value){if(!SKELETON_SETS[skeletonSet].labels[id])return;skeletonRounds[skeletonSet][id]=value;skeletonRevealed=false;for(const prefix of ['skeleton-','skeleton-list-']){const input=document.getElementById(prefix+id);if(input.value!==value)input.value=value;input.removeAttribute('aria-invalid')}document.getElementById('skeleton-'+id).parentElement.classList.remove('anatomy-right','anatomy-wrong');document.getElementById('skeleton-result-'+id).textContent='';document.getElementById('skeleton-status').textContent='Answers changed. Check again when ready.'}
function checkSkeleton(){const labels=SKELETON_SETS[skeletonSet].labels,answers=skeletonRounds[skeletonSet];let correct=0;for(const x of labels){const ok=skeletonCorrect(x,answers[x.id]);if(ok)correct++;const el=document.getElementById('skeleton-'+x.id);el.parentElement.classList.toggle('anatomy-right',ok);el.parentElement.classList.toggle('anatomy-wrong',!ok);for(const prefix of ['skeleton-','skeleton-list-'])document.getElementById(prefix+x.id).setAttribute('aria-invalid',String(!ok));document.getElementById('skeleton-result-'+x.id).textContent=ok?'✓ Correct':answers[x.id]?'Try again':'Unanswered'}document.getElementById('skeleton-status').textContent=skeletonRevealed?'Answers revealed — study the bones, then choose Try again.':`${correct} of ${labels.length} correct. Review marked blanks or expand their hints.`}
function revealSkeleton(){for(const x of SKELETON_SETS[skeletonSet].labels)skeletonRounds[skeletonSet][x.id]=x.answer;skeletonRevealed=true;skeletonPractice();checkSkeleton()}
function resetSkeleton(){skeletonRounds[skeletonSet]={};skeletonRevealed=false;skeletonPractice()}
