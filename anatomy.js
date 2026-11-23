'use strict';
// Coordinates refer to the supplied 709 × 1536 screenshot, cropped at y=200.
const ANATOMY_LABELS=[
 ['Superior',[318,224,110,32],['cranial'],'Toward the head.'],
 ['Sagittal plane',[514,263,180,34],['sagittal','median plane','midsagittal plane','midsagittal'],'Divides left and right; the midline version is midsagittal.'],
 ['Frontal plane',[565,374,140,34],['frontal','coronal','coronal plane'],'Divides anterior and posterior portions.'],
 ['Superior',[281,487,88,31],['cranial'],'Upward arrow on the trunk.'],
 ['Medial',[371,486,80,32],[],'Toward the midline.'],
 ['Lateral',[450,486,83,32],[],'Away from the midline.'],
 ['Posterior',[124,563,91,31],['dorsal'],'Toward the back of the trunk.'],
 ['Anterior',[55,628,88,32],['ventral'],'Toward the front of the trunk.'],
 ['Inferior',[289,588,88,32],['caudal'],'Downward arrow on the trunk.'],
 ['Proximal',[441,588,93,31],[],'Along the arm toward its attachment to the trunk.'],
 ['Transverse plane',[575,570,130,65],['transverse','horizontal','horizontal plane','axial','axial plane'],'Horizontal plane dividing upper and lower portions.'],
 ['Distal',[472,685,84,32],[],'Along the arm away from its attachment.'],
 ['Palmar',[68,716,77,32],['volar'],'Palm surface of the hand.'],
 ['Dorsal',[573,716,105,32],['dorsum','dorsal hand'],'Back surface of the hand (surface term).'],
 ['Proximal',[373,753,92,32],[],'Along the leg toward its attachment to the trunk.'],
 ['Distal',[382,882,81,32],[],'Along the leg away from its attachment.'],
 ['Posterior',[90,991,107,32],['dorsal'],'Toward the back of the body.'],
 ['Anterior',[40,1069,108,32],['ventral'],'Toward the front of the body.'],
 ['Dorsal',[563,991,112,32],['dorsum','dorsal foot'],'Top surface of the foot (surface term).'],
 ['Plantar',[606,1056,99,32],[],'Sole surface of the foot.'],
 ['Inferior',[321,1144,106,34],['caudal'],'Whole-body arrow pointing toward the feet.']
].map(([answer,box,aliases,hint],i)=>({id:i,answer,box,aliases,hint}));
let anatomyAnswers={},anatomyRevealed=false;
function normalizeAnatomy(value){return String(value).toLowerCase().trim().replace(/[-–]/g,' ').replace(/\s+/g,' ')}
function anatomyCorrect(label,value){return [label.answer,...label.aliases].some(a=>normalizeAnatomy(a)===normalizeAnatomy(value))}
function anatomyPractice(){app.innerHTML=heading('Anatomy: name each arrow.','Type the missing directional terms, body surfaces, and anatomical planes. Repeated terms are intentional.')+`<div class="toolbar"><button class="primary" onclick="checkAnatomy()">Check answers</button><button onclick="revealAnatomy()">Reveal answers</button><button onclick="resetAnatomy()">Try again</button><a class="button" href="/resources/anatomy-reference.jpeg" target="_blank" rel="noopener">Original reference ↗</a></div><p class="notice">The reference contains labeling errors. The bottom whole-body arrow means <b>inferior</b>; plantar means the sole of the foot. The three planes are sagittal, frontal (coronal), and transverse. Dorsal means the back of the hand or top of the foot when naming those surfaces.</p><p id="anatomy-status" role="status" aria-live="polite">21 blanks · Type directly into the boxes on the diagram. Synonyms and capitalization are accepted.</p><div class="anatomy-scroll" tabindex="0" aria-label="Anatomy diagram. Scroll sideways to reach all blanks on a small screen."><div class="anatomy-canvas"><img src="/resources/anatomy-reference.jpeg" alt="Front-facing anatomical figure with directional arrows, body surfaces, and three body planes. Each label is replaced by a numbered input."><span class="anatomy-mask" style="left:0;top:0;width:230px;height:55px"></span><span class="anatomy-mask" style="left:530px;top:293px;width:179px;height:35px"></span><span class="anatomy-mask" style="left:567px;top:473px;width:100px;height:35px"></span>${ANATOMY_LABELS.map(x=>{const [left,top,width,height]=x.box;return `<label class="anatomy-blank" style="left:${left}px;top:${top-200}px;width:${width}px;height:${height}px"><span>${x.id+1}</span><input id="anatomy-${x.id}" aria-label="Blank ${x.id+1}" autocomplete="off" autocapitalize="none" spellcheck="false" value="${esc(anatomyAnswers[x.id]||'')}" oninput="editAnatomy(${x.id},this.value)" placeholder=""></label>`}).join('')}</div></div><p class="source">Terminology checked against <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/1-6-anatomical-terminology" target="_blank" rel="noopener">OpenStax: Anatomical Terminology ↗</a>. Illustration: user-supplied reference. The screenshot has mixed-language and duplicate plane labels, which are masked in this practice.</p>`}
function editAnatomy(id,value){
  if(!ANATOMY_LABELS[id])return;
  anatomyAnswers[id]=value;
  anatomyRevealed=false;
  const input=document.getElementById('anatomy-'+id);
  if(input.value!==value)input.value=value;
  input.removeAttribute('aria-invalid');
  input.removeAttribute('title');
  input.parentElement.classList.remove('anatomy-right','anatomy-wrong');
  document.getElementById('anatomy-status').textContent='Answers changed. Check again when ready.';
}
function checkAnatomy(){
  const labels=ANATOMY_LABELS,answers=anatomyAnswers;
  let correct=0;
  for(const x of labels){
    const ok=anatomyCorrect(x,answers[x.id]||'');
    if(ok)correct++;
    const input=document.getElementById('anatomy-'+x.id);
    input.parentElement.classList.toggle('anatomy-right',ok);
    input.parentElement.classList.toggle('anatomy-wrong',!ok);
    input.setAttribute('aria-invalid',String(!ok));
    input.title=ok?'Correct':answers[x.id]?'Try again':'Unanswered';
  }
  document.getElementById('anatomy-status').textContent=anatomyRevealed
    ?'Answers revealed. Study the diagram, then choose Try again.'
    :`${correct} of ${labels.length} correct. Review the marked boxes on the diagram.`;
}
function revealAnatomy(){for(const x of ANATOMY_LABELS)anatomyAnswers[x.id]=x.answer;anatomyRevealed=true;anatomyPractice();checkAnatomy()}
function resetAnatomy(){anatomyAnswers={};anatomyRevealed=false;anatomyPractice()}
