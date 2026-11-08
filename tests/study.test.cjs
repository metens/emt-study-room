const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const dataContext={window:{}};vm.runInNewContext(fs.readFileSync('data.js','utf8'),dataContext);const items=dataContext.window.STUDY_ITEMS;assert.equal(items.length,32);assert.equal(new Set(items.map(x=>x.id)).size,items.length);for(const x of items){assert(x.title&&x.body&&x.source);if(x.type==='question'){assert.equal(x.options.length,4);assert(Number.isInteger(x.correct)&&x.correct>=0&&x.correct<4);assert.equal(new Set(x.options).size,4)}if(x.type==='diagram')assert(fs.existsSync('.'+x.image));}
const nodes=new Map();function element(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',className:'',classList:{toggle(){}},focus(){},scrollIntoView(){}});return nodes.get(id)}
const stored=new Map();const context={window:{STUDY_ITEMS:items,addEventListener(){},scrollTo(){}},document:{querySelector:element,querySelectorAll(){return[]}},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},location:{hash:''},history:{replaceState(){}},setInterval(){},confirm:()=>true,Math,Date,Map,JSON,console};vm.createContext(context);vm.runInContext(fs.readFileSync('app.js','utf8'),context);
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
