'use strict';
const ASSESSMENT_STEPS=[
 ['pre','Pre-arrival',[83,109,276,34]],
 ['scene','PPE / BSI · scene safety · resources · equipment',[86,168,269,160]],
 ['avpu','Responsiveness: AVPU',[505,192,241,111]],
 ['abc','ABCs',[441,382,148,35]],
 ['pulse','Pulse?',[640,348,60,28]],
 ['cpr','CPR · AED · BVM',[677,459,61,81]],
 ['return','If signs of life return',[623,599,180,35]],
 ['bleeding','X · Major bleeding? → Yes',[22,459,204,29]],
 ['control','Bleeding control: pressure · tourniquet · wound packing',[389,434,138,79]],
 ['airway','Airway open and protected? → No',[22,546,302,29]],
 ['open','Maneuver · suction · adjunct',[388,529,140,62]],
 ['breathing','Breathing / ventilation effective? → No',[22,630,302,29]],
 ['bvm','BVM',[387,616,140,43]],
 ['oxygenation','Oxygenation ≤ 94%? → Yes',[72,713,215,31]],
 ['oxygen','NRB · NC',[400,693,115,55]],
 ['circulation','Circulation: pink, warm, dry skin? → No',[22,799,302,30]],
 ['shock','Shock treatment: blanket · supine · oxygen',[386,776,143,79]],
 ['quality','Pulse: rate and quality check',[54,882,245,31]],
 ['transport','Transport decision',[95,1009,153,35]],
 ['priority','Orange intervention used → chart says Code 3',[299,1004,153,43]]
].map(([id,label,box],i)=>({id,label,box,number:i+1}));
let assessmentState=null;
function initAssessment(){if(!assessmentState)resetAssessment(false)}
function resetAssessment(draw=true){assessmentState={placements:{},selected:null,checked:false,revealed:false,order:shuffle(ASSESSMENT_STEPS.map(s=>s.id)),message:'Choose a label, then choose a blank. You can also drag labels into place.'};if(draw)assessmentPractice()}
function assessmentPractice(){initAssessment();const s=assessmentState,used=Object.values(s.placements),correct=ASSESSMENT_STEPS.filter(x=>s.placements[x.id]===x.id).length;app.innerHTML=heading('Build the primary assessment.','Fill the blanks on your course flowchart. Drag and drop, or tap a label and then a numbered blank.')+`<div class="assessment-actions"><button onclick="navigate('diagrams')">← Diagrams & resources</button><a class="button" href="#primary-summary" onclick="event.preventDefault();document.getElementById('primary-summary').scrollIntoView()">Skip to summary ↓</a><a class="button" href="/resources/primary-assessment-original.png" target="_blank" rel="noopener">Open original chart ↗</a><button onclick="checkAssessment()" class="primary">Check answers</button><button onclick="revealAssessment()">Show answers</button><button onclick="resetAssessment()">Reset & shuffle</button></div><div class="assessment-status" role="status" aria-live="polite">${esc(s.message)} <b>${used.length}/${ASSESSMENT_STEPS.length} placed${s.checked?' · '+correct+'/'+ASSESSMENT_STEPS.length+' correct':''}</b></div><div class="assessment-layout"><section class="assessment-bank" aria-label="Draggable answer bank"><h2>Answer bank</h2><p>Tap to select. Tap a filled blank to return its label.</p><div class="assessment-labels">${s.order.map(id=>{const x=ASSESSMENT_STEPS.find(q=>q.id===id);return `<button draggable="${!used.includes(id)}" class="assessment-label ${s.selected===id?'picked':''}" ${used.includes(id)?'disabled':''} aria-pressed="${s.selected===id}" onclick="selectAssessment('${id}')" ondragstart="dragAssessment(event,'${id}')" ondragend="endAssessmentDrag()">${esc(x.label)}</button>`}).join('')}</div></section><div class="assessment-scroll" tabindex="0" aria-label="Primary assessment diagram. Scroll horizontally on small screens."><div class="assessment-canvas"><img src="/resources/primary-assessment-original.png" alt="Primary assessment course flowchart with 20 numbered answer spaces. The original diagram is available from Open original chart.">${ASSESSMENT_STEPS.map(x=>{const placed=ASSESSMENT_STEPS.find(q=>q.id===s.placements[x.id]),[left,top,width,height]=x.box;return `<button id="assessment-slot-${x.id}" class="assessment-slot ${placed?'filled':''} ${s.checked?(placed?.id===x.id?'is-correct':'is-wrong'):''}" style="left:${left/890*100}%;top:${top/1076*100}%;width:${width/890*100}%;height:${height/1076*100}%" onclick="placeAssessment('${x.id}')" ondragover="event.preventDefault();event.dataTransfer.dropEffect='move'" ondrop="dropAssessment(event,'${x.id}')" aria-label="Blank ${x.number}${placed?', '+esc(placed.label):', empty'}${s.checked?(placed?.id===x.id?', correct':', incorrect'):''}"><span>${placed?esc(placed.label):x.number}</span></button>`}).join('')}</div></div></div><section class="notice"><b>Course-chart recall.</b> This exercise reproduces your supplied chart, including its oxygen threshold and “Code 3” wording. Oxygen targets, positioning, and transport priority depend on patient needs and current local protocols. The orange boxes are not a universal lights-and-siren rule. In an unresponsive patient, assess breathing and pulse together; the chart is a memory aid, not a complete resuscitation algorithm. <a href="https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support" target="_blank" rel="noopener">AHA reference ↗</a></section><section id="primary-summary" class="contentcard" style="margin-top:1.5rem"></section>`;renderPrimarySummary()}
function selectAssessment(id){initAssessment();if(Object.values(assessmentState.placements).includes(id))return;assessmentState.selected=assessmentState.selected===id?null:id;assessmentState.message=assessmentState.selected?'Selected: '+ASSESSMENT_STEPS.find(x=>x.id===id).label+'. Choose a numbered blank.':'Selection cleared.';assessmentPractice()}
function placeAssessment(slot,id=assessmentState?.selected){initAssessment();if(!ASSESSMENT_STEPS.some(x=>x.id===slot))return;const s=assessmentState;if(id&&ASSESSMENT_STEPS.some(x=>x.id===id)){for(const k of Object.keys(s.placements))if(s.placements[k]===id)delete s.placements[k];s.placements[slot]=id;s.message='Label placed. Choose another label, or check your answers.'}else if(s.placements[slot]){delete s.placements[slot];s.message='Label returned to the answer bank.'}else{s.message='Choose a label from the answer bank first.'}s.selected=null;s.checked=false;s.revealed=false;assessmentPractice()}
function dragAssessment(event,id){event.dataTransfer.setData('text/plain',id);event.dataTransfer.effectAllowed='move';assessmentState.selected=id;const el=document.querySelector('.assessment-status');if(el)el.innerHTML='Dragging a label. Drop it into a numbered blank. <b>'+Object.keys(assessmentState.placements).length+'/20 placed</b>'}
function dropAssessment(event,slot){event.preventDefault();const id=event.dataTransfer.getData('text/plain');if(ASSESSMENT_STEPS.some(x=>x.id===id))placeAssessment(slot,id)}
function endAssessmentDrag(){if(assessmentState)assessmentState.selected=null}
function checkAssessment(){initAssessment();const s=assessmentState;s.checked=true;s.selected=null;const n=ASSESSMENT_STEPS.filter(x=>s.placements[x.id]===x.id).length;s.message=n===ASSESSMENT_STEPS.length?'All 20 correct. Reset and try recalling the sequence again.':'Green is correct. Red needs another look, including empty blanks. Tap a placed label to return it and try again.';assessmentPractice()}
function revealAssessment(){initAssessment();const s=assessmentState;for(const x of ASSESSMENT_STEPS)s.placements[x.id]=x.id;s.checked=true;s.revealed=true;s.selected=null;s.message='Answer key shown. Reset to begin a fresh practice round.';assessmentPractice()}

const PRIMARY_SUMMARY_WORDS = ["primary assessment","threats to life","general impression","urgency of a patient’s condition","AVPU approach","airway, breathing, and circulation","traditional A-B-C approach","A-B-C","immediate needs","needs","transported"];
const PRIMARY_SUMMARY_LINES = [
  [
    "The ",
    0,
    " is a systematic approach to quickly finding and treating immediate ",
    1,
    "."
  ],
  [
    "The ",
    2,
    " gives you an initial sense of the ",
    3,
    "."
  ],
  [
    "A quick check of responsiveness uses the ",
    4,
    "."
  ],
  [
    "Quickly evaluating ",
    5,
    " helps identify life threats to treat before continuing the assessment."
  ],
  [
    "For a breathing patient with signs of life, the chapter describes the ",
    6,
    "."
  ],
  [
    "The mnemonic ",
    7,
    " guides the choice of interventions. Choose interventions based on the patient’s ",
    8,
    ". Adjust their order to fit the patient’s ",
    9,
    "."
  ],
  [
    "Patient priority indicates how urgently they need to be ",
    10,
    " and helps guide the rest of the assessment."
  ]
];
const PRIMARY_SUMMARY = { id: 'primary-summary', title: 'Primary Assessment Summary', words: PRIMARY_SUMMARY_WORDS, lines: PRIMARY_SUMMARY_LINES };
const VITALS_SUMMARY = {
  id: 'vitals-summary',
  title: 'Vital Signs Summary',
  words: ['condition', 'baseline vital signs', 'pulse', 'respirations', 'skin, pupils', 'blood pressure',
    'adults and children', 'repeated', 'continuing assessment', '15 minutes', '5 minutes'],
  lines: [
    ['To establish a starting point for assessing a patient’s ', 0, ', take a complete set of ', 1,
      ' that includes ', 2, ', ', 3, ', ', 4, ', and ', 5, '.'],
    ['Know the normal ranges for pulse, respirations, and blood pressure in ', 6, '.'],
    ['Trends become clearer when vital signs are ', 7, ' as part of the ', 8, '.'],
    ['Recheck vital signs at least every ', 9, ' for a stable patient and at least every ', 10, ' for an unstable patient.']
  ]
};

const summaryRounds = new Map();

function renderPrimarySummary() {
  renderChapterSummary(PRIMARY_SUMMARY);
}

function renderChapterSummary(summary, focusId) {
  const {id, title, words, lines} = summary;
  const panel = document.getElementById(id);
  if (!summaryRounds.has(id)) {
    summaryRounds.set(id, {order: shuffle(words.map((_, i) => i)), placed: {}, selected: null, checked: false});
  }
  const round = summaryRounds.get(id);
  const {order, placed, selected, checked} = round;
  const assigned = Object.values(placed);
  const score = words.filter((_, i) => placed[i] === i).length;

  panel.innerHTML = `
    <h2>${title}</h2>
    <p>Drag each phrase into its blank, or select a phrase and then a blank. Select a filled blank to return its phrase to the bank.</p>
    <section class="assessment-bank" aria-label="Summary answer bank">
      <h3>Answer bank</h3>
      <div class="assessment-labels">${order.map(i => `
        <button type="button" data-word="${i}" class="assessment-label ${selected === i ? 'picked' : ''}"
          draggable="${!assigned.includes(i)}" aria-pressed="${selected === i}"
          ${assigned.includes(i) ? 'disabled' : ''}>${esc(words[i])}</button>`).join('')}</div>
    </section>
    <div style="margin:1rem 0">${lines.map(parts => `<p style="line-height:2">${parts.map(part => {
      if (typeof part === 'string') return esc(part);
      const phrase = words[placed[part]];
      const result = checked ? (placed[part] === part ? 'Correct' : phrase ? 'Try again' : 'Empty') : '';
      return `<button type="button" data-blank="${part}" style="vertical-align:baseline;white-space:normal;text-align:left"
        aria-label="Blank ${part + 1}${phrase ? ', ' + esc(phrase) : ''}${result ? ', ' + result : ''}">${phrase ? esc(phrase) : 'Blank ' + (part + 1)}${result ? ' · ' + result : ''}</button>`;
    }).join('')}</p>`).join('')}</div>
    <div class="assessment-actions">
      <button type="button" class="primary" data-check>Check summary</button>
      <button type="button" data-reset>Reset &amp; shuffle</button>
    </div>
    <p class="assessment-status" role="status">${assigned.length}/${words.length} placed${checked ? ' · ' + score + '/' + words.length + ' correct' : ''}${selected !== null ? ' · Selected: ' + esc(words[selected]) : ''}</p>`;

  const place = (blank, word) => {
    if (word === null) delete placed[blank];
    else if (Number.isInteger(word) && words[word] && !assigned.includes(word)) placed[blank] = word;
    else return;
    round.selected = null;
    round.checked = false;
    renderChapterSummary(summary, `[data-blank="${blank}"]`);
  };
  const dragType = 'application/x-emt-' + id;
  for (const button of panel.querySelectorAll('[data-word]')) {
    const word = Number(button.dataset.word);
    button.onclick = () => {
      round.selected = selected === word ? null : word;
      renderChapterSummary(summary, `[data-word="${word}"]`);
    };
    button.ondragstart = event => {
      event.dataTransfer.setData(dragType, String(word));
      event.dataTransfer.effectAllowed = 'move';
    };
  }
  for (const button of panel.querySelectorAll('[data-blank]')) {
    const blank = Number(button.dataset.blank);
    button.onclick = () => place(blank, selected);
    button.ondragover = event => event.preventDefault();
    button.ondrop = event => {
      event.preventDefault();
      const word = event.dataTransfer.getData(dragType);
      if (word !== '') place(blank, Number(word));
    };
  }
  panel.querySelector('[data-check]').onclick = () => {
    round.checked = true;
    round.selected = null;
    renderChapterSummary(summary, '[data-check]');
  };
  panel.querySelector('[data-reset]').onclick = () => {
    summaryRounds.delete(id);
    renderChapterSummary(summary, '[data-reset]');
  };
  if (focusId) panel.querySelector(focusId)?.focus({preventScroll:true});
}
