'use strict';

const RESPIRATORY_PANELS = [
  {
    title: 'Lungs overview',
    height: 477,
    instruction: 'Place the labels on the original lung illustration. Follow each leader line to the structure it marks.',
    drawing: `<image href="/resources/respiratory-practice.jpeg" x="0" y="-200" width="709" height="1536"/>
      <g fill="#fff"><rect x="135" y="23" width="127" height="32"/><rect x="342" y="48" width="68" height="29"/>
      <rect x="515" y="109" width="150" height="36"/><rect x="8" y="234" width="86" height="35"/>
      <rect x="609" y="316" width="68" height="36"/><rect x="260" y="430" width="106" height="38"/></g>
      <path d="M87 390 124 345 M548 392 455 337" fill="none" stroke="#264342" stroke-width="2"/>
      <circle cx="124" cy="345" r="3" fill="#264342"/><circle cx="455" cy="337" r="3" fill="#264342"/>`,
    targets: [
      ['Right main bronchus', 199, 41, 'The main airway entering the patient’s right lung, on the viewer’s left.'],
      ['Trachea', 374, 63, 'The windpipe. C-shaped cartilage rings support the airway.'],
      ['Intercostal muscles', 585, 128, 'Muscles between the ribs. External intercostals help lift the rib cage during inhalation.'],
      ['Bronchiole', 54, 251, 'A smaller airway branch leading toward the gas-exchange region.'],
      ['Alveoli', 644, 334, 'Clusters of tiny air sacs. Their thin walls allow gas exchange with surrounding capillaries.'],
      ['Diaphragm', 308, 446, 'The main muscle of quiet inhalation. Contraction flattens and lowers it.'],
      ['Rib cage', 73, 399, 'The bony framework protects the lungs and moves with breathing.'],
      ['Lung', 564, 402, 'The lung contains branching airways and alveoli.']
    ]
  },
  {
    title: 'Upper airway',
    height: 390,
    instruction: 'Trace inhaled air from the nostril toward the trachea.',
    drawing: `<path d="M330 42 C229 24 160 70 157 121 L123 160 Q116 171 137 177 L149 183 L153 213 Q157 241 200 239 L225 241 Q232 276 201 331 L386 331 Q345 281 354 231 Q401 186 404 126 Q404 67 330 42Z" fill="#f7decb" stroke="#76534a" stroke-width="3"/>
      <path d="M141 172 Q145 132 197 124 Q248 119 281 145 L291 177 Q249 151 198 161 L146 179Z" fill="#f38699" stroke="#963f57" stroke-width="3"/>
      <path d="M155 191 Q208 177 261 192 Q226 224 161 207Z" fill="#dc7b7c" stroke="#963f57" stroke-width="2"/>
      <path d="M274 140 Q300 150 302 180 L302 230 Q295 244 280 237 L279 188 Q276 169 263 157Z" fill="#af85bf" stroke="#694671" stroke-width="2"/>
      <path d="M278 229 Q294 220 310 232 L307 259 Q293 268 278 258Z" fill="#76b1da" stroke="#31546a" stroke-width="2"/>
      <path d="M285 259 H308 L319 338 H294Z" fill="#a6ccdf" stroke="#31546a" stroke-width="2"/>
      <path d="M287 272h23 m-21 14h23 m-21 14h23 m-21 14h23 m-21 14h23" stroke="#47768e" stroke-width="3"/>
      <g fill="none" stroke="#264342" stroke-width="2"><path d="M142 177H63 M194 142L229 89H358 M292 191H488 M307 243L346 280H481"/></g>`,
    targets: [
      ['Nostril', 48, 177, 'Air enters through the nostril during nasal breathing.'],
      ['Nasal cavity', 378, 89, 'Helps warm, moisten and filter inhaled air.'],
      ['Pharynx', 507, 191, 'A shared passage for air and food behind the nose and mouth.'],
      ['Larynx', 501, 280, 'The voice box connects the pharynx to the trachea.']
    ]
  },
  {
    title: 'Alveolar gas exchange',
    height: 360,
    instruction: 'Label the two structures and the direction of each gas. The upper chamber contains alveolar air and the lower channel contains blood.',
    drawing: `<defs><marker id="resp-gas-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3 0 6Z" fill="context-stroke"/></marker>
      <linearGradient id="resp-blood"><stop stop-color="#638ad0"/><stop offset="1" stop-color="#df6973"/></linearGradient></defs>
      <path d="M113 204 Q101 139 157 120 Q166 60 235 77 Q269 33 322 67 Q374 34 412 78 Q478 61 496 118 Q548 134 541 204Z" fill="#fbe1e5" stroke="#a0475d" stroke-width="5"/>
      <path d="M76 223H574V280H76Z" fill="url(#resp-blood)" stroke="#4b6076" stroke-width="3"/>
      <g fill="#ab3a51" opacity=".75"><ellipse cx="112" cy="252" rx="18" ry="8"/><ellipse cx="195" cy="247" rx="18" ry="8"/><ellipse cx="427" cy="252" rx="18" ry="8"/><ellipse cx="520" cy="247" rx="18" ry="8"/></g>
      <path d="M255 148V255" stroke="#1b7758" stroke-width="7" marker-end="url(#resp-gas-arrow)"/>
      <path d="M385 252V147" stroke="#285998" stroke-width="7" marker-end="url(#resp-gas-arrow)"/>
      <path d="M534 204L580 173H630 M569 256H629" fill="none" stroke="#264342" stroke-width="2"/>
      <path d="M239 184H171 M401 184H466" fill="none" stroke="#264342" stroke-width="2"/>`,
    targets: [
      ['Thin alveolar wall', 647, 173, 'A short diffusion distance helps gases cross between alveolar air and capillary blood.'],
      ['Capillary network', 648, 256, 'Small blood vessels lie next to the air sacs and carry blood through the gas-exchange region.'],
      ['O₂ into blood', 150, 184, 'Oxygen diffuses from alveolar air into pulmonary capillary blood.'],
      ['CO₂ into alveoli', 482, 184, 'Carbon dioxide diffuses from pulmonary capillary blood into the alveoli and is exhaled.']
    ]
  },
  {
    title: 'Breathing mechanics',
    height: 340,
    instruction: 'Compare the two phases of quiet breathing. Place the rib, diaphragm, and airflow labels.',
    drawing: `<defs><marker id="resp-breath-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3 0 6Z" fill="#315e63"/></marker></defs>
      <rect x="19" y="20" width="324" height="300" rx="18" fill="#eef7f1"/><rect x="366" y="20" width="324" height="300" rx="18" fill="#eef5fc"/>
      <g fill="#203d3b" font-size="20" font-weight="700" text-anchor="middle"><text x="181" y="53">Inhale</text><text x="528" y="53">Exhale</text></g>
      <g fill="#f9cbd5" stroke="#984e62" stroke-width="2"><path d="M182 95Q86 113 88 222L272 222Q269 113 182 95Z"/><path d="M528 111Q440 131 445 218Q528 156 611 218Q616 131 528 111Z"/></g>
      <g fill="none" stroke="#b86b43" stroke-width="10" stroke-linecap="round"><path d="M88 225Q183 211 273 225"/><path d="M445 220Q528 146 611 220"/></g>
      <g stroke="#315e63" stroke-width="4" marker-end="url(#resp-breath-arrow)"><path d="M105 141L72 112"/><path d="M252 141L285 112"/><path d="M181 211V251"/><path d="M451 116L473 145"/><path d="M608 116L586 145"/><path d="M528 192V151"/><path d="M181 65V111"/><path d="M528 114V67"/></g>`,
    targets: [
      ['Ribs move up and out', 72, 96, 'External intercostals contract to help lift and expand the rib cage.'],
      ['Diaphragm contracts and flattens', 181, 271, 'The diaphragm moves down, increasing the volume of the chest.'],
      ['Volume rises, pressure falls, air enters', 249, 73, 'Expansion lowers pressure in the alveoli below atmospheric pressure, so air flows in.'],
      ['Ribs move down and in', 636, 96, 'During quiet exhalation, the rib cage returns toward its resting position.'],
      ['Diaphragm relaxes and domes', 528, 271, 'During quiet exhalation, relaxation and elastic recoil reduce chest volume.'],
      ['Volume falls, pressure rises, air leaves', 460, 73, 'As the lungs recoil, alveolar pressure rises above atmospheric pressure and air flows out.']
    ]
  }
];

let respiratoryPanel = 0;
let respiratorySelected = null;
let respiratoryMessage = '';
let respiratorySuppressClick = false;
const respiratoryRounds = RESPIRATORY_PANELS.map(panel => ({
  order: null, placements: Array(panel.targets.length).fill(null), result: null
}));

function respiratoryPractice(focusId) {
  const panel = RESPIRATORY_PANELS[respiratoryPanel];
  const round = respiratoryRounds[respiratoryPanel];
  round.order ??= shuffle(panel.targets.map((_, index) => index));
  const completed = respiratoryRounds.filter(entry => entry.result === 'checked' &&
    entry.placements.every((label, index) => label === index)).length;
  const filled = round.placements.filter(label => label !== null).length;
  const correct = round.placements.filter((label, index) => label === index).length;
  const status = respiratoryMessage || (round.result === 'revealed' ? 'Answers revealed for this panel.' :
    round.result === 'checked' ? `${correct} of ${panel.targets.length} correct.` :
    `${filled} of ${panel.targets.length} labels placed. Choose a label, then a number.`);

  app.innerHTML = heading('Respiratory anatomy', 'Label the lungs, upper airway, alveolar gas exchange, and the mechanics of breathing.') + `
    <div class="toolbar respiratory-tabs" aria-label="Diagram panels">
      ${RESPIRATORY_PANELS.map((item, index) => `<button type="button" id="resp-tab-${index}" aria-pressed="${index === respiratoryPanel}" class="${index === respiratoryPanel ? 'primary' : ''}" onclick="respiratorySwitch(${index})">${item.title}</button>`).join('')}
    </div>
    <p class="muted">${completed} of ${RESPIRATORY_PANELS.length} panels completed with all labels correct.</p>
    <section class="contentcard respiratory-board">
      <h2>${panel.title}</h2><p>${panel.instruction}</p>
      <div class="respiratory-bank">
        <h3>Label bank</h3><p>Drag a label to a numbered target, or select a label and then tap a target.</p>
        <div class="respiratory-labels">
          ${round.order.filter(label => !round.placements.includes(label)).map(label =>
            `<button type="button" id="resp-label-${label}" aria-pressed="${respiratorySelected === label}" onpointerdown="respiratoryGrab(event, ${label})" onclick="respiratorySelect(${label})">${esc(panel.targets[label][0])}</button>`).join('')}
          ${filled === panel.targets.length ? '<span>All labels placed.</span>' : ''}
        </div>
      </div>
      <p id="resp-status" role="status" aria-live="polite" tabindex="-1">${esc(status)}</p>
      <div class="respiratory-canvas" style="aspect-ratio:709/${panel.height}">
        <svg viewBox="0 0 709 ${panel.height}" role="img" aria-label="${panel.title} diagram">${panel.drawing}</svg>
        ${panel.targets.map(([, x, y], index) => {
          const label = round.placements[index];
          const state = round.result === 'checked' ? (label === index ? 'correct' : 'incorrect') : '';
          const name = label === null ? 'empty' : panel.targets[label][0];
          return `<button type="button" id="resp-target-${index}" class="respiratory-target ${state}" style="left:${100 * x / 709}%;top:${100 * y / panel.height}%" aria-label="Target ${index + 1}, ${esc(name)}${state ? ', ' + state : ''}" title="${esc(name)}" data-placed="${label !== null}" ${label === null ? '' : `onpointerdown="respiratoryGrab(event, ${label})"`} onclick="respiratoryTarget(${index})">${index + 1}</button>`;
        }).join('')}
      </div>
      <div class="toolbar respiratory-actions">
        <button type="button" class="primary" onclick="respiratoryReview(false)">Check panel</button>
        <button type="button" onclick="respiratoryReview(true)">Reveal answers</button>
        <button type="button" onclick="respiratoryReset()">Reset panel</button>
      </div>
      ${filled || round.result ? `<ol class="respiratory-key">${panel.targets.map((target, index) => {
        const label = round.placements[index];
        const name = label === null ? 'Unplaced' : panel.targets[label][0];
        const result = round.result === 'checked' ? (label === index ? 'Correct' : 'Try again') : '';
        return `<li><strong>${esc(name)}</strong>${result ? ` · ${result}` : ''}
          ${label !== null && round.result !== 'revealed' ? ` <button type="button" class="respiratory-return" aria-label="Return label from target ${index + 1}" onclick="respiratoryMove(${label}, null)">Return</button>` : ''}
          ${(round.result === 'revealed' || (round.result === 'checked' && label === index)) ? `<p>${esc(target[3])}</p>` : ''}</li>`;
      }).join('')}</ol>` : ''}
    </section>
    <p class="source">Lung illustration from the supplied Science Sauce reference. Insets adapted from the supplied respiratory-system and gas-exchange references. <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange" target="_blank" rel="noopener">Gas exchange reference</a> · <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing" target="_blank" rel="noopener">Breathing mechanics reference</a></p>`;
  if (focusId) document.getElementById(focusId)?.focus({preventScroll: true});
}

function respiratorySwitch(index) {
  if (!RESPIRATORY_PANELS[index]) return;
  respiratoryPanel = index;
  respiratorySelected = null;
  respiratoryMessage = '';
  respiratoryPractice('resp-tab-' + index);
}

function respiratorySelect(label) {
  if (respiratorySuppressClick) return;
  respiratorySelected = respiratorySelected === label ? null : label;
  respiratoryMessage = respiratorySelected === null ? 'Selection cleared.' :
    RESPIRATORY_PANELS[respiratoryPanel].targets[label][0] + ' selected. Choose a target.';
  respiratoryPractice('resp-label-' + label);
}

function respiratoryTarget(index) {
  if (respiratorySuppressClick) return;
  const placed = respiratoryRounds[respiratoryPanel].placements[index];
  if (respiratorySelected !== null) {
    respiratoryMove(respiratorySelected, index);
  } else if (placed !== null) {
    respiratoryMove(placed, null);
  }
}

function respiratoryMove(label, destination) {
  const round = respiratoryRounds[respiratoryPanel];
  const panel = RESPIRATORY_PANELS[respiratoryPanel];
  if (!Number.isInteger(label) || !panel.targets[label]) return;
  if (destination !== null && (!Number.isInteger(destination) || !panel.targets[destination])) return;
  const previous = round.placements.indexOf(label);
  if (previous >= 0) round.placements[previous] = null;
  if (destination !== null) round.placements[destination] = label;
  round.result = null;
  respiratorySelected = null;
  respiratoryMessage = destination === null ? 'Label returned to the bank.' :
    `${panel.targets[label][0]} placed at target ${destination + 1}.`;
  respiratoryPractice(destination === null ? 'resp-label-' + label : 'resp-target-' + destination);
}

function respiratoryGrab(event, label) {
  if (!event.isPrimary || event.button !== 0) return;
  const button = event.currentTarget;
  const {pointerId, clientX, clientY} = event;
  let ghost = null;
  button.setPointerCapture(pointerId);

  function move(pointer) {
    if (!ghost && Math.hypot(pointer.clientX - clientX, pointer.clientY - clientY) < 6) return;
    if (!ghost) {
      ghost = document.createElement('span');
      ghost.className = 'respiratory-drag-label';
      ghost.textContent = RESPIRATORY_PANELS[respiratoryPanel].targets[label][0];
      ghost.setAttribute('aria-hidden', 'true');
      document.body.append(ghost);
    }
    ghost.style.left = pointer.clientX + 'px';
    ghost.style.top = pointer.clientY + 'px';
  }

  function finish(pointer) {
    button.removeEventListener('pointermove', move);
    button.removeEventListener('pointerup', finish);
    button.removeEventListener('pointercancel', finish);
    button.removeEventListener('lostpointercapture', finish);
    if (!ghost) return;
    ghost.remove();
    respiratorySuppressClick = true;
    setTimeout(() => { respiratorySuppressClick = false; }, 0);
    if (pointer.type !== 'pointerup') return;
    const drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
    const target = drop?.closest('.respiratory-target');
    if (target) {
      respiratoryMove(label, Number(target.id.slice('resp-target-'.length)));
    } else if (drop?.closest('.respiratory-bank')) {
      respiratoryMove(label, null);
    }
  }

  button.addEventListener('pointermove', move);
  button.addEventListener('pointerup', finish);
  button.addEventListener('pointercancel', finish);
  button.addEventListener('lostpointercapture', finish);
}

function respiratoryReview(reveal) {
  const round = respiratoryRounds[respiratoryPanel];
  if (reveal) {
    round.placements = round.placements.map((_, index) => index);
    round.result = 'revealed';
  } else if (round.result !== 'revealed') {
    round.result = 'checked';
  }
  respiratorySelected = null;
  respiratoryMessage = '';
  respiratoryPractice('resp-status');
}

function respiratoryReset() {
  const round = respiratoryRounds[respiratoryPanel];
  round.placements.fill(null);
  round.order = null;
  round.result = null;
  respiratorySelected = null;
  respiratoryMessage = '';
  respiratoryPractice('resp-status');
}
