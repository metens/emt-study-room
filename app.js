'use strict';
const items=window.STUDY_ITEMS||[];
const sections=[['home','⌂','Overview'],['scenarios','⚑','Dispatch scenarios'],['vitals','✚','Vitals'],['mental-status','◇','Mental status'],['airway-slides','▤','Airway slide deck'],['medical','▤','Medical Assessment slides'],['pharm','✚','Pharmacology'],['notes','▤','Notes'],['diagrams','◇','Diagrams'],['anatomy','↕','Anatomy blanks'],['anatomy-physiology','◇','Anatomy & physiology'],['skeleton','♧','Skeletal system'],['organs','♡','Heart & airway anatomy'],['respiratory','↔','Respiratory diagram'],['assessment','↔','Flowchart practice'],['mnemonics','?','SAMPLE & OPQRST'],['ecg','♡','ECG placement'],['shock','⚡','Types of shock'],['cards','▣','Flashcards'],['quiz','✓','Quizzes'],['exam','◷','Practice exams'],['progress','↗','My progress']];
const domains=['Scene Size-Up and Safety','Primary Assessment','Secondary Assessment','Patient Treatment and Transport','Operations'];
const app=document.querySelector('#app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state={attempts:[],known:[]},view='home',search='',topic='',selectedSet='',drugFilter='',fieldFilter='',deck=[],cardIndex=0,flipped=false,session=null,storageAvailable=true;
try{const saved=JSON.parse(localStorage.getItem('emt-public-study-v1'));if(saved&&Array.isArray(saved.attempts)&&Array.isArray(saved.known)){state.attempts=saved.attempts.filter(x=>Number.isFinite(x.score)&&typeof x.date==='string'&&Array.isArray(x.answers)).slice(-100);state.known=saved.known.filter(x=>typeof x==='string')}}catch{storageAvailable=false}
function save(){try{localStorage.setItem('emt-public-study-v1',JSON.stringify(state))}catch{storageAvailable=false;document.querySelector('#message').textContent='This browser could not save progress. You can still study and review this session.';document.querySelector('#message').className='toast'}}
function heading(title,sub){return `<div class="intro"><div class="eyebrow">EMT STUDY ROOM</div><h1>${title}</h1><p class="muted">${sub}</p></div>`}
function source(x){return `<div class="source">${esc(x.source)}${x.sourceUrl?.startsWith('https://')?` · <a href="${esc(x.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open reference ↗</a>`:''}</div>`}
function filtered(type){return items.filter(x=>x.type===type&&(!(['question','card','note'].includes(type)&&selectedSet)||(selectedSet==='starter'?!x.set:x.set===selectedSet))&&(!drugFilter||x.drug===drugFilter)&&(!fieldFilter||x.field===fieldFilter)&&(!topic||x.topic===topic)&&[x.title,x.body,x.topic,x.source].join(' ').toLowerCase().includes(search.toLowerCase()))}
function controls(type){const available=[...new Set(items.filter(x=>x.type===type).map(x=>x.topic))];return `<div class="toolbar"><label class="search-label">Search ${type==='question'?'questions':type==='card'?'flashcards':type==='diagram'?'diagrams':'notes'}<input id="search" type="search" placeholder="Find a concept…" value="${esc(search)}" oninput="search=this.value;updateList()"></label><label class="filter-label">Topic<select id="topic-filter" onchange="topic=this.value;updateList()"><option value="">All topics</option>${available.map(t=>`<option value="${esc(t)}" ${topic===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label>${type==='question'?`<label class="filter-label">Study set<select id="set-filter" onchange="selectedSet=this.value;drugFilter='';fieldFilter='';render()"><option value="" ${!selectedSet?'selected':''}>All questions</option><option value="airway-images" ${selectedSet==='airway-images'?'selected':''}>Airway & Respiration · 70</option><option value="airway-review" ${selectedSet==='airway-review'?'selected':''}>Airway Basics & Suction · 28</option><option value="pharmacology" ${selectedSet==='pharmacology'?'selected':''}>Pharmacology · 63</option><option value="shock-identify" ${selectedSet==='shock-identify'?'selected':''}>Identify the shock · 8</option><option value="shock-signs" ${selectedSet==='shock-signs'?'selected':''}>Shock signs & symptoms · 8</option><option value="airway-deck" ${selectedSet==='airway-deck'?'selected':''}>Airway slide deck · 34</option><option value="medical-assessment" ${selectedSet==='medical-assessment'?'selected':''}>Medical Assessment slides · 21</option><option value="starter" ${selectedSet==='starter'?'selected':''}>Introductory questions · 15</option></select></label>`:''}${selectedSet==='pharmacology'?pharmFilters(type):''}</div>`}
function noMatch(){return '<div class="no-match"><h2>No matches yet.</h2><p class="muted">Try a different topic or search term. More course material can be added to the site over time.</p></div>'}
function navigate(next){const pharmRoute={'pharm-quiz':'quiz','pharm-cards':'cards','pharm-notes':'notes','shock-identify':'quiz','shock-signs':'quiz','medical-quiz':'quiz','medical-exam':'exam','airway-deck-quiz':'quiz','airway-deck-exam':'exam','airway-deck-cards':'cards'}[next];const requested=next;if(pharmRoute)next=pharmRoute;const review=next==='airway-review';const airway=next==='airway-test'||next==='airway-quiz';if(review)next='quiz';if(airway)next=next==='airway-test'?'exam':'quiz';if(!sections.some(x=>x[0]===next))next='home';if(session&&!session.done&&!confirm('Leave this practice session? Your unfinished answers will not be saved.'))return;session=null;view=next;search='';topic='';drugFilter='';fieldFilter='';selectedSet=pharmRoute?(requested.startsWith('airway-deck-')?'airway-deck':requested.startsWith('medical-')?'medical-assessment':requested.startsWith('shock-')?requested:'pharmacology'):review?'airway-review':airway?'airway-images':'';cardIndex=0;flipped=false;history.replaceState(null,'','#'+(pharmRoute?requested:review?'airway-review':airway?(view==='exam'?'airway-test':'airway-quiz'):view));render();window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true})}
function render(){document.querySelector('#nav').innerHTML=sections.map(([key,icon,name])=>`<button ${view===key?'aria-current="page"':''} class="${view===key?'active':''}" onclick="navigate('${key}')"><b aria-hidden="true">${icon}</b>${name}</button>`).join('');document.querySelector('#breadcrumb').textContent='Study room / '+sections.find(x=>x[0]===view)[2];if(view==='home'){home();return}if(view==='airway-slides'){airwayDeckStudy();return}if(view==='medical'){medicalStudy();return}if(view==='pharm'){pharmacology();return}if(view==='mental-status'){mentalStatusPractice();return}if(view==='vitals'){vitalsPractice();return}if(view==='scenarios'){dispatchPractice();return}if(view==='respiratory'){respiratoryPractice();return}if(view==='organs'){organPractice();return}if(view==='skeleton'){skeletonPractice();return}if(view==='anatomy-physiology'){anatomyPdfPractice();return}if(view==='anatomy'){anatomyPractice();return}if(view==='assessment'){assessmentPractice();return}if(view==='mnemonics'){historyPractice();return}if(view==='ecg'){ecgPractice();return}if(view==='shock'){shockStudy();return}if(view==='progress'){progress();return}const titles={notes:['Understand the essentials.','Clear, focused notes with references for deeper reading.'],diagrams:['See how it fits together.','Simple visual maps to connect the concepts.'],cards:['Give your memory a workout.','Think of your answer, then flip the card to check.'],quiz:['Practice with purpose.','Answer a question, read the explanation, and learn from the result.'],exam:['Put it all together.','A timed practice session with feedback after you finish.']};const type={notes:'note',diagrams:'diagram',cards:'card',quiz:'question',exam:'question'}[view];app.innerHTML=heading(...titles[view])+controls(type)+'<div id="listing"></div>';updateList()}
function home(){app.innerHTML=heading('Make your next study session count.','One calm place to learn, practice, and put it all together.')+`<section class="course-feature"><span class="tag">NEW · DISPATCH SCENARIO TRAINER</span><h2>Dispatch to decision.</h2><p>Nine unfolding calls. Choose scene precautions, sort PPE and equipment, assess AVPU and XABC, and defend your transport priorities.</p><button class="primary" onclick="navigate('scenarios')">Take a random dispatch →</button></section><section class="course-feature"><span class="tag">NEW · ANATOMY PRACTICE</span><h2>Name each arrow.</h2><p>Fill 21 blanks on your anatomy diagram: directional terms, body surfaces, and planes. Check, reveal, and retry.</p><button class="primary" onclick="navigate('anatomy')">Practice anatomy →</button><button onclick="navigate('anatomy-physiology')">Practice the Anatomy &amp; Physiology PDF →</button><button onclick="navigate('skeleton')">Practice the skeletal system →</button><button onclick="navigate('organs')">Practice heart, throat & lungs →</button><button onclick="navigate('respiratory')">Label the respiratory diagram →</button></section><section class="course-feature"><span class="tag">NEW · CHAPTERS 9–10</span><h2>Airway, Respiration & Ventilation</h2><p>Original 22-slide PowerPoint, 34 questions, 34 flashcards, airway-path practice and ventilation calculations.</p><button class="primary" onclick="navigate(\'airway-slides\')">Study the Airway deck →</button></section><section class="course-feature"><span class="tag">NEW · YOUR SLIDE DECK</span><h2>Medical Assessment</h2><p>13-slide study companion, 21 questions, sequence practice and patient scenarios.</p><button class="primary" onclick="navigate(\'medical\')">Study the Medical Assessment deck →</button></section><section class="hero"><div><div class="eyebrow">SMALL SESSIONS. STRONGER RECALL.</div><h2>A little more ready.<br>One question at a time.</h2><p>Review a concept, test your recall, and come back to what needs practice. Start anywhere and study at your own pace.</p><button class="primary" onclick="navigate('quiz')">Start practicing &nbsp; →</button></div><div class="hero-art" aria-hidden="true"><div class="orbit"><div>✚</div></div></div></section><section class="course-feature"><div><span class="tag">NEW · FROM YOUR COURSE MATERIAL</span><h2>Airway & Respiration</h2><p>70 questions covering airway assessment, oxygen, ventilation, suction, and pediatric care. Adapted from your screenshots, with explanations and clarified clinical guidance.</p></div><div class="actions"><button class="primary" onclick="navigate('airway-test')">Take the 70-question test →</button><button onclick="navigate('airway-quiz')">Practice with feedback</button></div></section><section class="course-feature"><span class="tag">NEW · REVIEW QUIZ</span><h2>Airway Basics & Suction</h2><p>28 questions from your review notes: anatomy, airway warning signs, positioning, OPA/NPA selection, and suction technique. Read an explanation after each answer.</p><button class="primary" onclick="navigate('airway-review')">Start the 28-question review →</button></section><section class="course-feature"><span class="tag">NEW · MEDICATION MEMORY LAB</span><h2>Learn all nine medications.</h2><p>63 flashcards, 63 quiz questions, and nine medication profiles. Practice doses, indications, contraindications, precautions, routes, actions, and side effects.</p><button class="primary" onclick="navigate('pharm')">Open Pharmacology →</button></section><div class="stats"><div class="stat"><span>Study materials</span><strong>${items.length}</strong><span>Ready whenever you are</span></div><div class="stat"><span>Completed sessions</span><strong>${state.attempts.length}</strong><span>On this browser</span></div><div class="stat"><span>Latest practice score</span><strong>${state.attempts.length?state.attempts.at(-1).score+'%':'—'}</strong><span>${state.attempts.length?'Keep building on it':'Your starting point awaits'}</span></div></div><div class="sectiontitle"><h2>How would you like to study?</h2><span>A different way to make it stick</span></div><div class="grid">${[['notes','▤','Read & understand','Focused notes organized by topic.',items.filter(x=>x.type==='note').length+' notes'],['cards','▣','Test your recall','Flip through concepts at your own pace.',items.filter(x=>x.type==='card').length+' flashcards'],['quiz','✓','Practice questions','Get feedback and understand why.',items.filter(x=>x.type==='question').length+' questions'],['diagrams','◇','See the connections','Keep visual explanations close by.',items.filter(x=>x.type==='diagram').length+' diagrams'],['exam','◷','Put it all together','Practice under a timer, then review.','Build your confidence'],['progress','↗','Keep moving forward','See your results and review topics.','Saved on this browser']].map(([v,i,n,p,c])=>`<button class="tile" onclick="navigate('${v}')"><span class="symbol" aria-hidden="true">${i}</span><h3>${n}</h3><p>${p}</p><div class="bottom"><span>${c}</span><span aria-hidden="true">↗</span></div></button>`).join('')}</div><div class="notice">This introductory library is a starting point. It covers a small part of EMT coursework; use it alongside your textbook, instructor feedback, and practical skills.</div>`}
function updateList(){if(session&&!session.done)session=null;const el=document.querySelector('#listing');if(!el)return;if(view==='notes'||view==='diagrams'){const a=filtered(view==='notes'?'note':'diagram');el.innerHTML=a.length?a.map(x=>`<article class="contentcard"><span class="tag">${esc(x.topic)}</span><h2>${esc(x.title)}</h2>${view==='diagrams'?`<a href="${esc(x.image)}" target="_blank" rel="noopener"><img class="diagram" src="${esc(x.image)}" alt="${esc(x.title)}" loading="lazy"></a>${x.practice?'<button class="primary" onclick="navigate(\'assessment\')">Practice: fill in the blanks →</button>':''}`:''}<div class="note">${esc(x.body)}</div>${source(x)}</article>`).join(''):noMatch();return}if(view==='cards'){deck=filtered('card');cardIndex=0;flipped=false;showCard();return}const bank=filtered('question');el.innerHTML=bank.length?`<div class="contentcard"><span class="tag">${bank.length} questions available</span><h2>${selectedSet==='airway-deck'?'Airway, Respiration & Ventilation · Slide practice':selectedSet==='medical-assessment'?'Medical Assessment · Slide practice':selectedSet==='shock-identify'?'Identify the type of shock':selectedSet==='shock-signs'?'Match the shock to its signs':selectedSet==='pharmacology'?'EMT Pharmacology · Chart review':selectedSet==='airway-review'?'Airway Basics & Suction · Review quiz':selectedSet==='airway-images'?'Airway & Respiration · Course review':view==='exam'?'Ready for a practice exam?':'A focused round of practice.'}</h2>${selectedSet==='pharmacology'?'<p class="muted">Study the reviewed chart, with unit corrections and product-specific cautions. Filter by medication or recall category. Doses here support course recall; use current local protocols and product instructions for clinical care.</p>':''}${selectedSet==='airway-review'?'<p class="muted">Based on your 28 supplied questions, answers, and explanations. Questions 17, 19, 22, and 25 are clarified for trauma positioning, drainage, gag-reflex assessment, and exposure-based PPE.</p>':''}${selectedSet==='airway-images'?'<p class="muted">Adapted from course questions 1–70. Older or ambiguous items have been clarified; equipment-specific values are identified in the explanations. Use your current course and local protocols for skills practice.</p>':''}<p class="muted">${view==='exam'?'Allow one minute per question. You can move between questions and submit early. Explanations appear after submission.':'Questions and answer choices are shuffled. See an explanation after each answer.'}</p><label>Number of questions<select id="qcount">${[5,10,20,35,50].filter(n=>n<bank.length).concat(bank.length).map(n=>`<option value="${n}" ${['airway-images','airway-review','pharmacology','shock-identify','shock-signs','medical-assessment','airway-deck'].includes(selectedSet)&&n===bank.length?'selected':''}>${n}${n===bank.length?' · full set':''}</option>`).join('')}</select></label><button class="primary" onclick="startSession()">Begin ${view==='exam'?'practice exam':'quiz'} →</button><p class="storage-note">Results save only in this browser. This is fixed multiple-choice practice, not the official adaptive NREMT exam.</p></div>`:noMatch()}
function showCard(){const el=document.querySelector('#listing');if(!deck.length){el.innerHTML=noMatch();return}const x=deck[cardIndex],known=state.known.includes(x.id);el.innerHTML=`<div class="sectiontitle"><p class="muted">Card ${cardIndex+1} of ${deck.length} · ${esc(x.topic)}</p><span class="pill">${known?'Marked familiar':'Practice recall'}</span></div><button class="flash" onclick="flipped=!flipped;showCard()" aria-label="${flipped?'Answer. '+esc(x.body)+'. Flip to prompt':'Prompt. '+esc(x.title)+'. Flip to reveal answer'}"><small>${flipped?'ANSWER':'PROMPT'}</small>${esc(flipped?x.body:x.title)}<span class="hint">Tap or press Enter to flip</span></button><div class="actions"><button onclick="moveCard(-1)" aria-label="Previous flashcard">← Previous</button><button class="primary" onclick="markCard('${x.id}')">${known?'Practice again':'I know this'}</button><button onclick="moveCard(1)" aria-label="Next flashcard">Next →</button></div><div class="bookmark-line"><span class="muted">${deck.filter(c=>state.known.includes(c.id)).length} of ${deck.length} marked familiar</span><button class="textbutton" onclick="shuffleDeck()">Shuffle cards</button></div>${source(x)}`}
function moveCard(d){cardIndex=(cardIndex+d+deck.length)%deck.length;flipped=false;showCard()}
function markCard(id){state.known=state.known.includes(id)?state.known.filter(x=>x!==id):[...state.known,id];save();showCard()}
function shuffle(a){const result=[...a];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
function shuffleDeck(){deck=shuffle(deck);cardIndex=0;flipped=false;showCard()}
function startSession(ids){const bank=ids?items.filter(x=>x.type==='question'&&ids.includes(x.id)):filtered('question');const count=ids?bank.length:Number(document.querySelector('#qcount').value);if(!bank.length)return;session={mode:view,questions:shuffle(bank).slice(0,count).map(q=>({...q,choices:shuffle(q.options.map((text,index)=>({text,index})))})),answers:[],i:0,done:false,end:Date.now()+count*60000};document.querySelectorAll('.toolbar').forEach(x=>x.hidden=true);showQuestion()}
function showQuestion(){const s=session;if(!s||s.done)return;const q=s.questions[s.i],answered=s.answers[s.i]!==undefined;document.querySelector('#listing').innerHTML=`<div class="contentcard"><div class="sectiontitle"><span class="tag">Question ${s.i+1} / ${s.questions.length} · ${esc(q.topic)}${q.sourceQuestion?' · Course Q'+q.sourceQuestion:''}</span>${s.mode==='exam'?'<span class="clock" id="clock" role="timer" aria-label="Time remaining"></span>':''}</div><div class="progress" aria-hidden="true"><div style="width:${(s.i+1)/s.questions.length*100}%"></div></div><h2>${esc(q.title)}</h2>${q.choices.map((choice,i)=>`<button class="answer ${answered?(s.mode==='quiz'?(choice.index===q.correct?'correct':s.answers[s.i]===choice.index?'wrong':''):s.answers[s.i]===choice.index?'selected':''):''}" onclick="answer(${choice.index})" ${answered&&s.mode==='quiz'?'disabled':''} ${s.mode==='exam'?`aria-pressed="${s.answers[s.i]===choice.index}"`:''}>${String.fromCharCode(65+i)}. ${esc(choice.text)}</button>`).join('')}${answered&&s.mode==='quiz'?`<div class="feedback" role="status"><b>${s.answers[s.i]===q.correct?'Correct.':'Keep this one in mind.'}</b><p>Correct answer: ${esc(q.options[q.correct])}</p><p>${esc(q.body)}</p>${source(q)}</div>`:''}<div class="question-actions">${s.mode==='exam'?`<button onclick="previousQuestion()" ${s.i===0?'disabled':''}>← Previous</button>`:'<span></span>'}<button class="primary" onclick="nextQuestion()" ${s.mode==='quiz'&&!answered?'disabled':''}>${s.i===s.questions.length-1?'Finish & review':'Next question →'}</button></div>${s.mode==='exam'?`<div class="quiz-jump" aria-label="Jump to a question">${s.questions.map((_,i)=>`<button class="${s.answers[i]!==undefined?'answered':''} ${s.i===i?'current':''}" onclick="jumpQuestion(${i})" aria-label="Question ${i+1}${s.answers[i]!==undefined?', answered':', unanswered'}" ${s.i===i?'aria-current="step"':''}>${i+1}</button>`).join('')}</div><div class="sectiontitle"><span class="muted">${s.answers.filter(x=>x!==undefined).length}/${s.questions.length} answered</span><button class="textbutton" onclick="submitExam()">Submit exam early</button></div>`:''}</div>`;tick()}
function answer(index){const s=session;if(!s||s.done||(s.mode==='quiz'&&s.answers[s.i]!==undefined))return;s.answers[s.i]=index;showQuestion()}
function nextQuestion(){if(!session||session.done)return;if(session.mode==='quiz'&&session.answers[session.i]===undefined)return;if(session.i<session.questions.length-1){session.i++;showQuestion()}else if(session.mode==='exam'){submitExam()}else finish()}
function previousQuestion(){if(session&&session.i>0){session.i--;showQuestion()}}
function jumpQuestion(i){if(session&&!session.done&&i>=0&&i<session.questions.length){session.i=i;showQuestion()}}
function submitExam(){if(!session||session.done)return;const missing=session.questions.length-session.answers.filter(x=>x!==undefined).length;if(missing&&!confirm(`Submit with ${missing} unanswered question${missing===1?'':'s'}? Unanswered questions count as incorrect.`))return;finish()}
function tick(){const s=session;if(!s||s.done||s.mode!=='exam')return;const left=Math.max(0,Math.ceil((s.end-Date.now())/1000)),el=document.querySelector('#clock');if(el){el.textContent=Math.floor(left/60)+':'+String(left%60).padStart(2,'0');el.classList.toggle('urgent',left<=30)}if(left===0)finish(true)}
function finish(timedOut=false){const s=session;if(!s||s.done)return;s.done=true;const answers=s.questions.map((q,i)=>({id:q.id,correct:q.correct===s.answers[i],answer:s.answers[i]??null,domain:q.domain})),correct=answers.filter(x=>x.correct).length,score=Math.round(correct/answers.length*100);state.attempts.push({date:new Date().toISOString(),mode:s.mode,score,answers});state.attempts=state.attempts.slice(-100);save();const missed=answers.filter(x=>!x.correct).map(x=>x.id);document.querySelector('#listing').innerHTML=`<section class="contentcard"><span class="tag">${timedOut?'Time is up':'Session complete'}</span><div class="result-score">${score}%</div><h2>${correct} of ${answers.length} correct.</h2><p class="muted">${score===100?'A strong round. Keep expanding the topics you practice.':'Every correction is a useful next step. Review the explanations below.'}</p><div class="toolbar"><button class="primary" onclick="restartPractice()">Practice again</button>${missed.length?`<button onclick="reviewMissed()">Retry missed questions (${missed.length})</button>`:''}<button onclick="navigate('progress')">My progress →</button></div><p class="storage-note">${storageAvailable?'Saved in this browser.':'Progress could not be saved in this browser.'} Practice accuracy is not an NREMT pass prediction.</p></section>`+s.questions.map((q,i)=>`<article class="contentcard"><span class="tag">${answers[i].correct?'Correct':'Review next'} · ${esc(q.topic)}</span><h3>${esc(q.title)}</h3><p>Your answer: ${esc(q.options[s.answers[i]]??'Not answered')}</p><p><b>Correct answer: ${esc(q.options[q.correct])}</b></p><div class="note">${esc(q.body)}</div>${source(q)}</article>`).join('');document.querySelector('#listing').scrollIntoView({behavior:'instant',block:'start'})}
function restartPractice(){session=null;render()}
function reviewMissed(){if(!session)return;const missed=session.questions.filter((q,i)=>q.correct!==session.answers[i]).map(q=>q.id);session=null;view='quiz';render();startSession(missed)}
function progress(){const latest=new Map();for(const a of state.attempts)for(const q of a.answers)if(items.some(x=>x.id===q.id))latest.set(q.id,q);const rows=domains.map(domain=>{const all=[...latest.values()].filter(q=>q.domain===domain);return {domain,count:all.length,score:all.length?Math.round(all.filter(x=>x.correct).length/all.length*100):null}});app.innerHTML=heading('Keep moving forward.','Your practice history and review topics, saved in this browser.')+`<div class="notice">No account or shared tracking. Clearing this browser’s site data removes this history, and it does not sync between devices.</div><section class="contentcard"><span class="tag">Your study snapshot</span><h2>${latest.size} unique questions practiced</h2><p class="muted">This uses your latest answer to each question. Repeating a question does not increase the number of unique questions.</p><div class="domainlist">${rows.map(r=>`<div class="domainrow"><div><b>${esc(r.domain)}</b><small>${r.count} unique questions · ${r.count===0?'Try this domain':r.score<80?'Review these concepts':'Keep building your coverage'}</small></div><strong>${r.score===null?'—':r.score+'%'}</strong><div class="domainbar"><i style="width:${r.score||0}%"></i></div></div>`).join('')}</div><p class="storage-note">These are practice results, not a validated readiness measure or passing standard. The ${items.filter(x=>x.type==='question').length}-question bank covers selected study topics.</p></section><div class="sectiontitle"><h2>Recent sessions</h2><span>${state.attempts.length} completed</span></div>`+(state.attempts.length?state.attempts.slice(-10).reverse().map(a=>`<div class="attempt"><b>${a.score}%</b><span>${a.mode==='exam'?'Timed practice':'Quiz'} · ${a.answers.length} questions</span><small>${esc(new Date(a.date).toLocaleDateString())}</small></div>`).join(''):'<div class="empty"><h2>Your first session starts here.</h2><p>Complete a quiz or practice exam to see your results.</p><button class="primary" onclick="navigate(\'quiz\')">Start a quiz →</button></div>')}
window.addEventListener('hashchange',()=>{const next=location.hash.slice(1);if((sections.some(x=>x[0]===next)||['airway-test','airway-quiz','airway-review','pharm-quiz','pharm-cards','pharm-notes','shock-identify','shock-signs','medical-quiz','medical-exam','airway-deck-quiz','airway-deck-exam','airway-deck-cards'].includes(next))&&next!==view)navigate(next)});
window.addEventListener('beforeunload',e=>{if(session&&!session.done){e.preventDefault();e.returnValue=''}});
setInterval(tick,1000);

const BP_PRACTICES = [
  {number: 1, video: 'MMtXcCjFG-c', answer: '98/68', distractors: ['94/68', '98/64', '102/72']},
  {number: 4, video: 'MdmAjQF4Qy4', answer: '92/68', distractors: ['92/60', '96/68', '96/72']},
  {number: 5, video: 'RWg2704SABo', answer: '108/68', distractors: ['104/68', '108/64', '112/72']},
  {number: 6, video: '97sHyni7g0I', answer: '96/68', distractors: ['96/70', '98/66', '100/68']}
];
let bpPracticeIndex = 0;

function vitalsPractice(index = bpPracticeIndex) {
  bpPracticeIndex = index;
  const practice = BP_PRACTICES[index];
  const choices = shuffle([practice.answer, ...practice.distractors]);
  app.innerHTML = heading('Vitals: Manual blood pressure', 'Watch the cuff gauge and listen for the Korotkoff sounds as the pressure falls.') + `
    <section class="contentcard">
      <div class="actions" role="group" aria-label="Choose a blood pressure practice video">
        ${BP_PRACTICES.map(({number}, i) => `<button type="button" aria-pressed="${i === index}" class="${i === index ? 'primary' : ''}" onclick="switchBpPractice(${i})">Practice ${number}</button>`).join('')}
      </div>
      <h2 id="bp-practice-heading" tabindex="-1">Practice ${practice.number}</h2>
      <iframe title="Manual blood pressure video, practice ${practice.number}"
        src="https://www.youtube-nocookie.com/embed/${practice.video}?autoplay=1&amp;playsinline=1"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen style="display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:12px"></iframe>
      <p class="storage-note">If the video pauses on load, press Play and turn up the sound.
        <a href="https://www.youtube.com/watch?v=${practice.video}" target="_blank" rel="noopener">Watch on YouTube ↗</a>
      </p>
      <form id="bp-answer-form">
        <fieldset>
          <legend>What blood pressure did you hear?</legend>
          ${choices.map(choice => `<label style="display:block;margin:8px 0"><input type="radio" name="bp-reading" value="${choice}" required> ${choice} mmHg</label>`).join('')}
        </fieldset>
        <div class="actions">
          <button type="submit" class="primary">Check reading</button>
          <button type="button" onclick="switchBpPractice(${index})">Replay &amp; retry</button>
          ${index < BP_PRACTICES.length - 1 ? `<button type="button" onclick="switchBpPractice(${index + 1})">Next video →</button>` : ''}
        </div>
        <p id="bp-feedback" role="status"></p>
      </form>
    </section>`;
  const form = document.querySelector('#bp-answer-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const reading = new FormData(form).get('bp-reading');
    if (!choices.includes(reading)) return;
    const result = reading === practice.answer ? 'Correct.' : 'Try listening again.';
    document.querySelector('#bp-feedback').textContent =
      result + ' The video’s answer key gives ' + practice.answer + ' mmHg.';
    form.querySelector('fieldset').disabled = true;
    form.querySelector('button[type="submit"]').disabled = true;
  });
}

function switchBpPractice(index) {
  vitalsPractice(index);
  document.querySelector('#bp-practice-heading').focus({preventScroll: true});
}


const MENTAL_CASES = [
  ['Waiting at the trailhead','The patient looks at you before you speak. They correctly give their name, the trailhead, the day and approximate time, and explain they called after twisting an ankle. They follow a two-part command.','A','4',4,5,6,'The day and clock time both check time. The reason EMS was called checks situation.'],
  ['After a fall','The patient tracks you with eyes already open and follows a two-part command. They give their name and recognize the parking lot and the fall, but insist it is Monday morning when it is Friday evening. They speak in full sentences.','A','3',4,4,6,'They are alert and oriented to person, place, and situation. Time is incorrect. Coherent but disoriented speech scores V4.'],
  ['In the ambulance','The patient’s eyes are open before you speak. They give their correct name, location, and date, but cannot explain why EMS was called. They follow a two-part command.','A','3',4,5,6,'Situation is missing for A&O ×4. The official GCS verbal criteria use name, place, and date, so the verbal score here is V5.'],
  ['On the couch','The patient’s eyes are closed until you call their name. They answer in sentences, correctly name themselves and their apartment, but give the wrong date and cannot explain why EMS is there. They follow a two-part command.','V','2',3,4,6,'They respond to voice. Two orientation domains are demonstrated, but spontaneous alertness is absent.'],
  ['On the floor','The patient does not respond to voice. With a pressure stimulus, they open their eyes, groan, and reach toward the source to stop it. They do not follow commands.','P','unknown',2,2,5,'Purposeful movement toward the stimulus is localization. Groaning provides no orientation answers.'],
  ['Beside a bicycle','The patient responds only to pressure. Their eyes stay closed. They say isolated, unrelated words and quickly pull their arm away without reaching toward the source.','P','unknown',1,3,4,'Pulling away is withdrawal. Recognizable isolated words score V3, but they do not establish orientation.'],
  ['On the gym floor','The patient’s eyes remain closed, and they make no sound. With pressure, their elbows bend slowly and both arms draw inward across the chest.','P','unknown',1,1,3,'Stereotyped inward arm flexion is abnormal flexion, also called decorticate posturing.'],
  ['At the base of the stairs','The patient’s eyes remain closed, and they make no sound. With pressure, both elbows straighten and the arms extend stiffly.','P','unknown',1,1,2,'Elbow extension in response to pressure is abnormal extension, also called decerebrate posturing.'],
  ['Found lying still','The patient does not open their eyes, make a sound, or move in response to voice or pressure. There is no factor preventing assessment of any component.','U','unknown',1,1,1,'There is no response across all three GCS components. Orientation cannot be assessed.']
];
const MENTAL_OPTIONS = {
  alertness: [['A','Alert'],['V','Responds to voice'],['P','Responds to pressure'],['U','Unresponsive']],
  orientation: [['4','4 domains'],['3','3 domains'],['2','2 domains'],['1','1 domain'],['0','0 domains'],['unknown','Cannot assess']],
  eye: [[4,'Spontaneous'],[3,'To sound'],[2,'To pressure'],[1,'None']],
  verbal: [[5,'Oriented'],[4,'Confused conversation'],[3,'Isolated words'],[2,'Sounds only'],[1,'None']],
  motor: [[6,'Follows commands'],[5,'Localizes'],[4,'Withdraws / normal flexion'],[3,'Abnormal flexion'],[2,'Extension'],[1,'None']]
};
let mentalCaseIndex = 0;

function mentalStatusPractice(move = 0) {
  mentalCaseIndex = (mentalCaseIndex + move + MENTAL_CASES.length) % MENTAL_CASES.length;
  const [title, observations, alertness, orientation, eye, verbal, motor, reason] = MENTAL_CASES[mentalCaseIndex];
  const fields = [
    ['alertness','Level of responsiveness (AVPU)',alertness],
    ['orientation','How many orientation domains are demonstrated?',orientation],
    ['eye','GCS eye opening',eye],
    ['verbal','GCS verbal response',verbal],
    ['motor','GCS motor response',motor]
  ];
  app.innerHTML = heading('Mental status practice', 'Observe the patient, then score alertness, orientation, and the Glasgow Coma Scale.') + `
    <section class="contentcard">
      <span class="tag">CASE ${mentalCaseIndex + 1} OF ${MENTAL_CASES.length}</span>
      <h2 id="mental-case-heading" tabindex="-1">${esc(title)}</h2>
      <figure style="margin:0 0 1rem;max-width:480px">
        <div style="position:relative;overflow:hidden;aspect-ratio:3 / 2;border-radius:12px;background:#edf2e5">
          <img src="/diagrams/mental-status-scenes.jpg" alt="" style="position:absolute;max-width:none;width:300%;height:300%;left:-${(mentalCaseIndex % 3) * 100}%;top:-${Math.floor(mentalCaseIndex / 3) * 100}%">
        </div>
        <figcaption class="storage-note">AI-generated training scene. Use the written observations to score the response.</figcaption>
      </figure>
      <p>${esc(observations)}</p>
      <form id="mental-form">
        <div class="toolbar">
          ${fields.map(([key,label]) => `<label>${label}
            <select name="${key}" required><option value="">Choose…</option>
              ${MENTAL_OPTIONS[key].map(([value,name]) => `<option value="${value}">${key === 'eye' || key === 'verbal' || key === 'motor' ? value + ' · ' : ''}${name}</option>`).join('')}
            </select></label>`).join('')}
        </div>
        <div class="actions">
          <button type="submit" class="primary">Check assessment</button>
          <button type="button" onclick="switchMentalCase(-1)">Previous case</button>
          <button type="button" onclick="switchMentalCase(1)">Next case →</button>
        </div>
        <div id="mental-feedback" role="status"></div>
      </form>
    </section>
    <section class="contentcard">
      <details>
        <summary>Review AVPU, orientation, and GCS</summary>
        <p>AVPU describes what it takes to get a response. Orientation describes what the patient knows. GCS scores what the patient’s eyes, speech, and movement do.</p>
        <h3>Level of responsiveness (AVPU)</h3>
        <dl>
          <dt><strong>A · Alert</strong></dt><dd>Awake and engages spontaneously. An alert patient can still be confused.</dd>
          <dt><strong>V · Responds to voice</strong></dt><dd>First opens their eyes, speaks, or moves when spoken to.</dd>
          <dt><strong>P · Responds to pressure</strong></dt><dd>Voice gets no response, but pressure produces eye opening, a sound, or movement.</dd>
          <dt><strong>U · Unresponsive</strong></dt><dd>No response to voice or pressure.</dd>
        </dl>
        <h3>Orientation domains</h3>
        <ul>
          <li><strong>Person</strong> — “What’s your name?”</li>
          <li><strong>Place</strong> — “Where are you right now?”</li>
          <li><strong>Time</strong> — “What day is it?” or “About what time is it?” Both prompts test one domain.</li>
          <li><strong>Situation</strong> — “What happened?” or “Why are we here?”</li>
        </ul>
        <p>Count the domains the patient answers correctly. Choose <strong>0 domains</strong> if they give usable answers and miss all four. Choose <strong>Cannot assess</strong> if they cannot give usable answers, such as when they only groan. A patient who wakes to voice can answer orientation questions after waking and still score V on AVPU.</p>
        <h3>Glasgow Coma Scale (GCS)</h3>
        <p>Score the best observed response in each category, then add E + V + M.</p>
        <div style="overflow-x:auto">
          <table>
            <thead><tr><th scope="col">Score</th><th scope="col">Eye (E)</th><th scope="col">Verbal (V)</th><th scope="col">Motor (M)</th></tr></thead>
            <tbody>
              <tr><th scope="row">6</th><td>—</td><td>—</td><td>Follows commands</td></tr>
              <tr><th scope="row">5</th><td>—</td><td>Correctly gives name, place, and date</td><td>Localizes by reaching toward the stimulus to stop it</td></tr>
              <tr><th scope="row">4</th><td>Opens spontaneously</td><td>Coherent conversation with disorientation</td><td>Withdraws by quickly pulling away</td></tr>
              <tr><th scope="row">3</th><td>Opens to sound</td><td>Recognizable, isolated words</td><td>Abnormal flexion with arms drawing inward</td></tr>
              <tr><th scope="row">2</th><td>Opens to pressure</td><td>Sounds only, such as groans</td><td>Abnormal extension with elbows straightening</td></tr>
              <tr><th scope="row">1</th><td>No eye opening</td><td>No verbal response</td><td>No motor response</td></tr>
            </tbody>
          </table>
        </div>
        <p>A patient who gives their correct name, place, and date can score <strong>V5</strong> even if they miss situation and demonstrate three of the four orientation domains.</p>
        <h3>Worked example</h3>
        <p>A patient opens their eyes when you call their name, speaks in sentences, gives their correct name and location, gets the date wrong, cannot explain why EMS is there, and follows commands.</p>
        <ul>
          <li><strong>AVPU V</strong> — First responds to voice.</li>
          <li><strong>2 orientation domains</strong> — Demonstrates person and place.</li>
          <li><strong>GCS 13 (E3 V4 M6)</strong> — Eyes open to sound, conversation shows disorientation, and the patient follows commands.</li>
        </ul>
        <p class="source"><a href="https://www.glasgowcomascale.org/downloads/GCS-Assessment-Aid-English.pdf" target="_blank" rel="noopener">Official GCS assessment aid</a> · <a href="https://www.ncbi.nlm.nih.gov/books/NBK615348/table/ch7.tab1/" target="_blank" rel="noopener">Mental status assessment reference</a></p>
      </details>
    </section>`;
  const form = document.querySelector('#mental-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const answers = new FormData(form);
    const correct = fields.filter(([key,,value]) => answers.get(key) === String(value)).length;
    let orientationResult = 'Orientation cannot be assessed';
    if (orientation !== 'unknown') {
      orientationResult = alertness === 'A'
        ? 'A&O ×' + orientation
        : 'Oriented to ' + orientation + ' domains after a voice stimulus';
    }
    const response = MENTAL_OPTIONS.alertness.find(([value]) => value === alertness)[1];
    document.querySelector('#mental-feedback').innerHTML =
      `<p><b>${correct}/5 correct</b> · ${response} · ${orientationResult}</p>
       <p><b>GCS ${eye + verbal + motor}</b> (E${eye} V${verbal} M${motor}). ${esc(reason)}</p>`;
  });
}

function switchMentalCase(move) {
  mentalStatusPractice(move);
  document.querySelector('#mental-case-heading').focus({preventScroll: true});
}

const initialHash=location.hash.slice(1);if(['airway-deck-quiz','airway-deck-exam','airway-deck-cards'].includes(initialHash)){view={'airway-deck-quiz':'quiz','airway-deck-exam':'exam','airway-deck-cards':'cards'}[initialHash];selectedSet='airway-deck'}else if(['medical-quiz','medical-exam'].includes(initialHash)){view=initialHash==='medical-exam'?'exam':'quiz';selectedSet='medical-assessment'}else if(['shock-identify','shock-signs'].includes(initialHash)){view='quiz';selectedSet=initialHash}else if(['pharm-quiz','pharm-cards','pharm-notes'].includes(initialHash)){view={'pharm-quiz':'quiz','pharm-cards':'cards','pharm-notes':'notes'}[initialHash];selectedSet='pharmacology'}else if(initialHash==='airway-review'){view='quiz';selectedSet='airway-review'}else if(['airway-test','airway-quiz'].includes(initialHash)){view=initialHash==='airway-test'?'exam':'quiz';selectedSet='airway-images'}else{view=sections.some(x=>x[0]===initialHash)?initialHash:'home'}render();

function pharmFilters(type){return `<label class="filter-label">Medication<select onchange="drugFilter=this.value;updateList()"><option value="">All nine medications</option>${(window.PHARMACOLOGY||[]).map(d=>`<option value="${esc(d.name)}" ${drugFilter===d.name?'selected':''}>${esc(d.name)}</option>`).join('')}</select></label>${type==='note'?'':`<label class="filter-label">Recall category<select onchange="fieldFilter=this.value;updateList()"><option value="">All seven categories</option>${[...new Set(items.filter(x=>x.set==='pharmacology'&&x.field).map(x=>x.field))].map(f=>`<option value="${esc(f)}" ${fieldFilter===f?'selected':''}>${esc(f)}</option>`).join('')}</select></label>`}` }
function pharmacology(){app.innerHTML=heading('Know the medication. Know the reason.','Your nine-medication chart, turned into active recall.')+`<section class="hero"><div><div class="eyebrow">EMT PHARMACOLOGY · MEDICATION MEMORY LAB</div><h2>Say it. Flip it. Test it.</h2><p>For each drug, recall: dose, indication, contraindications, precautions, route, action, and side effects. Start with flashcards, then test what sticks.</p><div class="actions"><button class="primary" onclick="navigate('pharm-cards')">Study 63 flashcards →</button><button onclick="navigate('pharm-quiz')">Practice 63 questions</button></div></div></section><section class="contentcard"><h2>A repeatable memory routine</h2><p>Before flipping, say the drug’s <b>dose → reason to give → reasons to stop → precautions → route → action → side effects</b>. Mark it familiar only after recalling the answer. Use the medication and category filters to work on weak spots.</p><p class="storage-note">This is a study aid based on your chart, not a complete formulary or a standing order. Your chart’s “NREMT” and “OR” labels do not establish current scope of practice.</p></section><div class="sectiontitle"><h2>Nine drugs. Nine memory hooks.</h2><button onclick="navigate('pharm-notes')">Read all profiles →</button></div><div class="grid">${(window.PHARMACOLOGY||[]).map(d=>`<article class="contentcard"><span class="tag">Medication recall</span><h3>${esc(d.name)}</h3><p>${esc(d.hook)}</p><button onclick="studyDrug('${d.id}')">Practice this medication →</button></article>`).join('')}</div><section class="contentcard"><span class="tag">CHART CHECK · READ BEFORE MEMORIZING</span><h2>Corrections and context</h2><p>The study cards use reviewed wording. These notes explain where the uploaded chart needs correction or a protocol check.</p>${(window.PHARMACOLOGY||[]).map(d=>`<details><summary>${esc(d.name)}</summary><p>${esc(d.note)}</p>${source(items.find(x=>x.id==='pharm-'+d.id+'-note'))}</details>`).join('')}</section>`}
function studyDrug(id){const d=(window.PHARMACOLOGY||[]).find(x=>x.id===id);if(!d)return;navigate('pharm-cards');drugFilter=d.name;render()}
