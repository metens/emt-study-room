const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const dataContext={window:{}};vm.runInNewContext(fs.readFileSync('data.js','utf8'),dataContext);const items=dataContext.window.STUDY_ITEMS;assert.equal(items.length,266);assert.equal(new Set(items.map(x=>x.id)).size,items.length);for(const x of items){assert(x.title&&x.body&&x.source);if(x.type==='question'){assert.equal(x.options.length,4);assert(Number.isInteger(x.correct)&&x.correct>=0&&x.correct<4);assert.equal(new Set(x.options).size,4)}if(x.type==='diagram')assert(fs.existsSync('.'+x.image));}
vm.runInNewContext(fs.readFileSync('pharmacology.js','utf8'),dataContext);
const nodes=new Map();function element(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',className:'',classList:{toggle(){}},focus(){},scrollIntoView(){}});return nodes.get(id)}
const stored=new Map();const context={window:{STUDY_ITEMS:items,PHARMACOLOGY:dataContext.window.PHARMACOLOGY,addEventListener(){},scrollTo(){}},document:{querySelector:element,querySelectorAll(){return[]}},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},location:{hash:''},history:{replaceState(){}},setInterval(){},confirm:()=>true,Math,Date,Map,JSON,console};vm.createContext(context);vm.runInContext(fs.readFileSync('assessment.js','utf8'),context);vm.runInContext(fs.readFileSync('app.js','utf8'),context);
function run(source){return vm.runInContext(source,context)}
assert(nodes.get('#app').innerHTML.includes('Make your next study session count.'));
// Shuffling retains the original answer index even when the labels change.
run("view='quiz'; document.querySelector('#qcount').value='5'; startSession()");assert.equal(run('session.questions.length'),5);run('session.questions.forEach((q,i)=>{session.answers[i]=q.correct}); finish()');assert.equal(run('state.attempts.at(-1).score'),100);assert(nodes.get('#listing').innerHTML.includes('Session complete'));assert(stored.has('emt-public-study-v1'));
// Unanswered exam questions receive no credit, and finishing twice saves once.
run("session=null; view='exam'; startSession(); session.answers[0]=session.questions[0].correct; finish(true); finish()");assert.equal(run('state.attempts.length'),2);assert.equal(run('state.attempts.at(-1).score'),20);
// Marking familiar concepts persists locally and can be undone.
run("view='cards'; deck=items.filter(x=>x.type==='card'); cardIndex=0; markCard(deck[0].id)");assert.equal(run('state.known.length'),1);run('markCard(deck[0].id)');assert.equal(run('state.known.length'),0);
run("session=null; view='progress'; render()");assert(nodes.get('#app').innerHTML.includes('unique questions practiced'));
assert(!fs.readFileSync('app.js','utf8').includes('fetch('));assert(!fs.readFileSync('index.html','utf8').includes('sign-in'));console.log('Passed: library integrity, shuffled scoring, timed submissions, local progress, flashcard persistence, account-free operation.');

// The dedicated course set has one item per screenshot question and stays isolated.
const course=items.filter(x=>x.set==='airway-images');assert.equal(course.length,70);assert.deepEqual(Array.from(course,x=>x.sourceQuestion).sort((a,b)=>a-b),Array.from({length:70},(_,i)=>i+1));
run("navigate('airway-test')");assert.equal(run('view'),'exam');assert.equal(run("filtered('question').length"),70);assert(nodes.get('#listing').innerHTML.includes('70 · full set'));
run("document.querySelector('#qcount').value='70';startSession()");assert.equal(run('session.questions.length'),70);assert(run("session.questions.every(q=>q.set==='airway-images')"));
run("session.questions.forEach((q,i)=>{session.answers[i]=q.correct});session.answers[0]=(session.questions[0].correct+1)%4;finish();reviewMissed()");assert.equal(run('session.questions.length'),1);assert.equal(run('session.mode'),'quiz');
run("session=null;navigate('quiz');selectedSet='starter'");assert.equal(run("filtered('question').length"),15);
console.log('Passed: 70-question course coverage, dedicated test selection, full-session scoring, missed-only retry, starter-bank isolation.');

const review=items.filter(x=>x.set==='airway-review');assert.equal(review.length,28);assert.deepEqual(Array.from(review,x=>x.sourceQuestion),Array.from({length:28},(_,i)=>i+1));
run("session=null;navigate('airway-review')");assert.equal(run('view'),'quiz');assert.equal(run("filtered('question').length"),28);assert(nodes.get('#listing').innerHTML.includes('28 · full set'));
run("document.querySelector('#qcount').value='28';startSession();session.questions.forEach((q,i)=>{session.answers[i]=q.correct});finish()");assert.equal(run('state.attempts.at(-1).score'),100);assert.equal(run('state.attempts.at(-1).answers.length'),28);
assert(review.find(x=>x.sourceQuestion===17).options[review.find(x=>x.sourceQuestion===17).correct].includes('no suspected head or neck trauma'));
assert(review.find(x=>x.sourceQuestion===22).title.includes('no gag reflex'));
console.log('Passed: 28-question review isolation, complete numbering, full-round scoring, and corrected trauma/OPA wording.');

const pharm=items.filter(x=>x.set==='pharmacology');assert.equal(pharm.filter(x=>x.type==='card').length,63);assert.equal(pharm.filter(x=>x.type==='question').length,63);assert.equal(pharm.filter(x=>x.type==='note').length,9);
run("session=null;navigate('pharm-cards')");assert.equal(run('deck.length'),63);run("studyDrug('glucose')");assert.equal(run('deck.length'),7);assert(run("deck.every(x=>x.drug==='Oral glucose')"));
run("navigate('pharm-quiz');document.querySelector('#qcount').value='63';startSession();session.questions.forEach((q,i)=>{session.answers[i]=q.correct});finish()");assert.equal(run('state.attempts.at(-1).score'),100);assert.equal(run('state.attempts.at(-1).answers.length'),63);
run("session=null;navigate('pharm-quiz');fieldFilter='Route';updateList()");assert.equal(run("filtered('question').length"),9);
run("navigate('pharm')");assert(nodes.get('#app').innerHTML.includes('Corrections and context'));
assert(pharm.find(x=>x.id==='pharm-glucose-card-0').body.includes('grams, not mg'));
assert(pharm.find(x=>x.id==='pharm-nitroglycerin-card-5').body.includes('rather than increasing'));
console.log('Passed: all nine drug profiles, 63 flashcards, 63 questions, medication/category filtering, scoring, and chart corrections.');

// Diagram placement supports selection, replacement, clearing, scoring, and reset.
run("session=null;navigate('assessment')");assert.equal(run('ASSESSMENT_STEPS.length'),20);assert(nodes.get('#app').innerHTML.includes('Answer bank'));
run("selectAssessment('pre');placeAssessment('scene')");assert.equal(run("assessmentState.placements.scene"),'pre');run('checkAssessment()');assert.equal(run('assessmentState.checked'),true);assert(nodes.get('#app').innerHTML.includes('0/20 correct'));
run("placeAssessment('pre','pre')");assert.equal(run("assessmentState.placements.pre"),'pre');assert.equal(run("assessmentState.placements.scene"),undefined);
run("placeAssessment('pre')");assert.equal(run("assessmentState.placements.pre"),undefined);
run('revealAssessment()');assert.equal(run('Object.keys(assessmentState.placements).length'),20);assert.equal(run('assessmentState.revealed'),true);
run('resetAssessment()');assert.equal(run('Object.keys(assessmentState.placements).length'),0);assert.equal(run('assessmentState.checked'),false);
run("dropAssessment({preventDefault(){},dataTransfer:{getData(){return 'invalid'}}},'pre')");assert.equal(run('Object.keys(assessmentState.placements).length'),0);
run("dropAssessment({preventDefault(){},dataTransfer:{getData(){return 'pre'}}},'pre')");assert.equal(run('assessmentState.placements.pre'),'pre');
console.log('Passed: 20 diagram blanks, placement/return/move, answer checking, reveal/reset, and drag payload validation.');
