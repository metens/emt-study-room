'use strict';
const SHOCK_PROFILES = [
  {
    "id": "hypovolemic",
    "name": "Hypovolemic shock",
    "hook": "Low volume",
    "mechanism": "Too little circulating fluid reduces filling of the heart and forward blood flow.",
    "causes": "External or internal bleeding; severe fluid loss from vomiting, diarrhea, or burns.",
    "signs": "A fast, weak pulse; cool, pale, sweaty skin; rapid breathing; thirst, dizziness, or confusion. Blood pressure may fall later.",
    "distinction": "Look for a source of blood or fluid loss. Bleeding can be hidden; a normal early blood pressure does not exclude shock.",
    "url": "https://www.merckmanuals.com/professional/critical-care-medicine/shock-and-fluid-resuscitation/shock"
  },
  {
    "id": "cardiogenic",
    "name": "Cardiogenic shock",
    "hook": "Pump failure",
    "mechanism": "The heart cannot pump enough blood because of a primary cardiac problem.",
    "causes": "A major myocardial infarction, severe pump dysfunction, or a serious rhythm disturbance.",
    "signs": "Poor perfusion with cool, sweaty skin and weakness or confusion. Chest discomfort, dyspnea, lung crackles, or neck-vein distention may occur.",
    "distinction": "Pump failure can cause pulmonary congestion. Crackles or chest pain are clues, not required findings. A low blood pressure alone does not prove the heart is weak.",
    "url": "https://www.nhlbi.nih.gov/health/cardiogenic-shock"
  },
  {
    "id": "obstructive",
    "name": "Obstructive shock",
    "hook": "Blocked flow",
    "mechanism": "A mechanical barrier prevents effective cardiac filling or blood outflow.",
    "causes": "Tension pneumothorax, cardiac tamponade, or a major pulmonary embolism.",
    "signs": "Poor perfusion and breathing difficulty. Tension pneumothorax may produce markedly reduced breath sounds on one side; tamponade may cause neck-vein distention with hypotension.",
    "distinction": "Identify the obstructing process. Classic findings are not always present; do not wait for tracheal deviation or a complete tamponade triad.",
    "url": "https://www.heart.org/-/media/EA6947053C3740EA85A471E4668F35CB.pdf"
  },
  {
    "id": "distributive",
    "name": "Distributive shock",
    "hook": "Widespread dilation",
    "mechanism": "Loss of vascular tone and sometimes capillary leakage create maldistribution of blood and inadequate tissue perfusion.",
    "causes": "Septic, anaphylactic, and neurogenic shock are important subtypes.",
    "signs": "Findings vary: early sepsis may cause warm, flushed skin; anaphylaxis may cause hives, swelling, or wheezing; neurogenic shock may cause warm skin and an inappropriately slow pulse.",
    "distinction": "Distributive shock is not always warm or fast-pulsed. Later sepsis may be cold or mottled. Do not assume shock after trauma is neurogenic without considering bleeding and obstruction.",
    "url": "https://nj.gov/health/ems/documents/NEWJERSEYEMSCLINICALPRACTICEPROTOCOLS_GUIDELINES_FINAL8.21.2025v1.pdf"
  }
];
window.STUDY_ITEMS.push(...[
  {
    "id": "shock-hypovolemic-note",
    "type": "note",
    "title": "Hypovolemic shock",
    "body": "Too little circulating fluid reduces filling of the heart and forward blood flow.\n\nCauses: External or internal bleeding; severe fluid loss from vomiting, diarrhea, or burns.\n\nSigns and symptoms: A fast, weak pulse; cool, pale, sweaty skin; rapid breathing; thirst, dizziness, or confusion. Blood pressure may fall later.\n\nRemember: Look for a source of blood or fluid loss. Bleeding can be hidden; a normal early blood pressure does not exclude shock.",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.merckmanuals.com/professional/critical-care-medicine/shock-and-fluid-resuscitation/shock"
  },
  {
    "id": "shock-cardiogenic-note",
    "type": "note",
    "title": "Cardiogenic shock",
    "body": "The heart cannot pump enough blood because of a primary cardiac problem.\n\nCauses: A major myocardial infarction, severe pump dysfunction, or a serious rhythm disturbance.\n\nSigns and symptoms: Poor perfusion with cool, sweaty skin and weakness or confusion. Chest discomfort, dyspnea, lung crackles, or neck-vein distention may occur.\n\nRemember: Pump failure can cause pulmonary congestion. Crackles or chest pain are clues, not required findings. A low blood pressure alone does not prove the heart is weak.",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.nhlbi.nih.gov/health/cardiogenic-shock"
  },
  {
    "id": "shock-obstructive-note",
    "type": "note",
    "title": "Obstructive shock",
    "body": "A mechanical barrier prevents effective cardiac filling or blood outflow.\n\nCauses: Tension pneumothorax, cardiac tamponade, or a major pulmonary embolism.\n\nSigns and symptoms: Poor perfusion and breathing difficulty. Tension pneumothorax may produce markedly reduced breath sounds on one side; tamponade may cause neck-vein distention with hypotension.\n\nRemember: Identify the obstructing process. Classic findings are not always present; do not wait for tracheal deviation or a complete tamponade triad.",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.heart.org/-/media/EA6947053C3740EA85A471E4668F35CB.pdf"
  },
  {
    "id": "shock-distributive-note",
    "type": "note",
    "title": "Distributive shock",
    "body": "Loss of vascular tone and sometimes capillary leakage create maldistribution of blood and inadequate tissue perfusion.\n\nCauses: Septic, anaphylactic, and neurogenic shock are important subtypes.\n\nSigns and symptoms: Findings vary: early sepsis may cause warm, flushed skin; anaphylaxis may cause hives, swelling, or wheezing; neurogenic shock may cause warm skin and an inappropriately slow pulse.\n\nRemember: Distributive shock is not always warm or fast-pulsed. Later sepsis may be cold or mottled. Do not assume shock after trauma is neurogenic without considering bleeding and obstruction.",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://nj.gov/health/ems/documents/NEWJERSEYEMSCLINICALPRACTICEPROTOCOLS_GUIDELINES_FINAL8.21.2025v1.pdf"
  },
  {
    "id": "shock-identify-1",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "A critical loss of circulating blood or fluid reduces venous return and tissue perfusion. Which shock mechanism is described?",
    "options": [
      "Cardiogenic shock",
      "Obstructive shock",
      "Distributive shock",
      "Hypovolemic shock"
    ],
    "correct": 3,
    "body": "The key problem is inadequate circulating volume. Blood loss and non-blood fluid loss can both produce hypovolemic shock.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.merckmanuals.com/professional/critical-care-medicine/shock-and-fluid-resuscitation/shock"
  },
  {
    "id": "shock-identify-2",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "A primary failure of the heart’s pumping function prevents adequate tissue perfusion. Which type of shock is this?",
    "options": [
      "Obstructive shock",
      "Distributive shock",
      "Cardiogenic shock",
      "Hypovolemic shock"
    ],
    "correct": 2,
    "body": "Cardiogenic shock begins with a cardiac pumping problem. It does not mean that the heart has necessarily stopped.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.nhlbi.nih.gov/health/cardiogenic-shock"
  },
  {
    "id": "shock-identify-3",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "An external mechanical process prevents the heart from filling or ejecting blood effectively. Which shock category fits?",
    "options": [
      "Distributive shock",
      "Obstructive shock",
      "Hypovolemic shock",
      "Cardiogenic shock"
    ],
    "correct": 1,
    "body": "Mechanical interference with circulation defines obstructive shock. Examples include tamponade, tension pneumothorax, and a major pulmonary embolism.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.heart.org/-/media/EA6947053C3740EA85A471E4668F35CB.pdf"
  },
  {
    "id": "shock-identify-4",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Widespread vasodilation causes blood to be poorly distributed despite no initial major external fluid loss. Which category fits?",
    "options": [
      "Distributive shock",
      "Hypovolemic shock",
      "Cardiogenic shock",
      "Obstructive shock"
    ],
    "correct": 0,
    "body": "Distributive shock involves loss of vascular tone and maldistribution of flow. Capillary leakage and fluid loss may also contribute.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://nj.gov/health/ems/documents/NEWJERSEYEMSCLINICALPRACTICEPROTOCOLS_GUIDELINES_FINAL8.21.2025v1.pdf"
  },
  {
    "id": "shock-identify-5",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "After major abdominal trauma, a patient has suspected internal bleeding, a weak rapid pulse, and cool clammy skin. Which shock type is most consistent?",
    "options": [
      "Cardiogenic shock",
      "Obstructive shock",
      "Distributive shock",
      "Hypovolemic shock"
    ],
    "correct": 3,
    "body": "The suspected hemorrhage is the strongest clue to hypovolemia. Other causes or mixed shock remain possible in trauma.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.merckmanuals.com/professional/critical-care-medicine/shock-and-fluid-resuscitation/shock"
  },
  {
    "id": "shock-identify-6",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "After a large myocardial infarction, a patient has poor perfusion, severe dyspnea, and crackles from pulmonary congestion. Which shock type best fits?",
    "options": [
      "Obstructive shock",
      "Distributive shock",
      "Cardiogenic shock",
      "Hypovolemic shock"
    ],
    "correct": 2,
    "body": "Myocardial injury can impair pumping and cause pulmonary congestion. Interpret the findings together rather than relying on one sign.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.nhlbi.nih.gov/health/cardiogenic-shock"
  },
  {
    "id": "shock-identify-7",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Following chest trauma, a patient deteriorates with severe dyspnea, very unequal breath sounds, and poor perfusion from suspected tension pneumothorax. Which category fits?",
    "options": [
      "Distributive shock",
      "Obstructive shock",
      "Hypovolemic shock",
      "Cardiogenic shock"
    ],
    "correct": 1,
    "body": "Pressure from a tension pneumothorax can impede venous return. That mechanical impairment produces obstructive shock.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.heart.org/-/media/EA6947053C3740EA85A471E4668F35CB.pdf"
  },
  {
    "id": "shock-identify-8",
    "set": "shock-identify",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "After an allergen exposure, a patient develops wheezing, hives, swelling, and hypotension from anaphylaxis. Which broad shock category is this?",
    "options": [
      "Distributive shock",
      "Hypovolemic shock",
      "Cardiogenic shock",
      "Obstructive shock"
    ],
    "correct": 0,
    "body": "Anaphylactic shock belongs to the distributive category. Vasodilation and capillary leakage can reduce effective circulation.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://nj.gov/health/ems/documents/NEWJERSEYEMSCLINICALPRACTICEPROTOCOLS_GUIDELINES_FINAL8.21.2025v1.pdf"
  },
  {
    "id": "shock-signs-1",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which pattern best supports hemorrhagic hypovolemic shock?",
    "options": [
      "Allergen exposure with hives and wheezing",
      "A high spinal injury with warm dry skin and a slow pulse",
      "A primary pump failure with pulmonary congestion",
      "Suspected blood loss, a weak rapid pulse, and cool pale sweaty skin"
    ],
    "correct": 3,
    "body": "Volume loss plus poor perfusion supports hypovolemic shock. Skin and pulse findings alone are not specific.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.merckmanuals.com/professional/critical-care-medicine/shock-and-fluid-resuscitation/shock"
  },
  {
    "id": "shock-signs-2",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which history and findings most support nonhemorrhagic hypovolemic shock?",
    "options": [
      "Myocardial damage with lung crackles and no fluid-loss history",
      "Allergen exposure with facial swelling and hives",
      "Profuse vomiting and diarrhea followed by dehydration, weakness, and poor perfusion",
      "A sudden mechanical blockage of pulmonary circulation"
    ],
    "correct": 2,
    "body": "Severe gastrointestinal fluid loss can reduce circulating volume even without hemorrhage.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.merckmanuals.com/professional/critical-care-medicine/shock-and-fluid-resuscitation/shock"
  },
  {
    "id": "shock-signs-3",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which cluster is most consistent with cardiogenic shock after a myocardial infarction?",
    "options": [
      "Warm dry skin and bradycardia after a high spinal injury",
      "Cool sweaty skin, poor perfusion, dyspnea, and crackles from pulmonary congestion",
      "Large blood loss with an otherwise intact cardiac pump",
      "Hives and wheezing after a bee sting"
    ],
    "correct": 1,
    "body": "Poor perfusion with evidence of cardiac injury and congestion supports pump failure. Not every patient has all of these findings.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.nhlbi.nih.gov/health/cardiogenic-shock"
  },
  {
    "id": "shock-signs-4",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which pattern should make you consider cardiogenic shock?",
    "options": [
      "A serious cardiac problem with signs of low output and possible pulmonary edema",
      "Severe diarrhea with marked fluid depletion",
      "Tension pneumothorax mechanically restricting cardiac filling",
      "Widespread vasodilation following anaphylaxis"
    ],
    "correct": 0,
    "body": "The defining clue is a primary cardiac pumping disorder; pulmonary congestion may be present.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.nhlbi.nih.gov/health/cardiogenic-shock"
  },
  {
    "id": "shock-signs-5",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which pattern best fits obstructive shock caused by tension pneumothorax?",
    "options": [
      "Gastrointestinal fluid loss with dehydration",
      "Diffuse hives and swelling after food exposure",
      "A slow pulse and warm skin from loss of sympathetic tone",
      "Chest trauma, worsening respiratory distress, very unequal breath sounds, and poor perfusion"
    ],
    "correct": 3,
    "body": "Tension pneumothorax can impair circulation and ventilation. Tracheal deviation is not required and may be a late finding.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.heart.org/-/media/EA6947053C3740EA85A471E4668F35CB.pdf"
  },
  {
    "id": "shock-signs-6",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which combination can support cardiac tamponade as a cause of obstructive shock?",
    "options": [
      "Loss of blood volume through gastrointestinal bleeding",
      "Allergic vasodilation with widespread urticaria",
      "Impaired filling from fluid around the heart, hypotension, and possible distended neck veins",
      "Primary myocardial pump failure without an external filling barrier"
    ],
    "correct": 2,
    "body": "Tamponade compresses the heart and restricts filling. The classic collection of signs is not always complete.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://www.heart.org/-/media/EA6947053C3740EA85A471E4668F35CB.pdf"
  },
  {
    "id": "shock-signs-7",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which findings can occur in the septic subtype of distributive shock?",
    "options": [
      "A myocardial infarction causing isolated pump failure",
      "Suspected infection with poor perfusion; fever or low temperature, confusion, and sometimes warm flushed skin early",
      "Isolated blood loss as the sole mechanism",
      "A mechanical obstruction from a tension pneumothorax"
    ],
    "correct": 1,
    "body": "Sepsis is an infection-related emergency. Skin can be warm early or cool/mottled later; fever is not universal.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://nj.gov/health/ems/documents/NEWJERSEYEMSCLINICALPRACTICEPROTOCOLS_GUIDELINES_FINAL8.21.2025v1.pdf"
  },
  {
    "id": "shock-signs-8",
    "set": "shock-signs",
    "type": "question",
    "topic": "Shock & resuscitation",
    "domain": "Primary Assessment",
    "title": "Which pattern is associated with neurogenic distributive shock?",
    "options": [
      "A high spinal cord injury with hypotension, warm dry skin, and a relatively slow pulse",
      "External hemorrhage with marked tachycardia as the volume-loss pattern",
      "An isolated coronary event with pulmonary congestion",
      "Pleural pressure causing one-sided loss of breath sounds"
    ],
    "correct": 0,
    "body": "Loss of sympathetic tone may cause vasodilation and bradycardia. In trauma, still assess for bleeding and other causes of shock.",
    "source": "Shock review · clinical references",
    "sourceUrl": "https://nj.gov/health/ems/documents/NEWJERSEYEMSCLINICALPRACTICEPROTOCOLS_GUIDELINES_FINAL8.21.2025v1.pdf"
  }
]);

function shockStudy(){app.innerHTML=heading('Recognize the mechanism of shock.','Four categories. Different causes. A shared problem: inadequate tissue perfusion.')+`<section class="hero"><div><div class="eyebrow">SHOCK REVIEW</div><h2>Volume. Pump. Obstruction. Distribution.</h2><p>Learn what fails in each type, then practice recognizing the clues in both directions.</p><div class="actions"><button class="primary" onclick="navigate('shock-identify')">Identify the shock · 8 questions →</button><button onclick="navigate('shock-signs')">Choose the signs · 8 questions →</button></div></div></section><div class="notice"><b>Look at the whole patient.</b> Findings overlap, and mixed shock can occur. Hypotension can be absent early. A single skin sign, pulse rate, or blood-pressure reading cannot reliably identify the category.</div><div class="shock-profiles">${SHOCK_PROFILES.map(x=>`<article class="contentcard"><span class="tag">${esc(x.hook)}</span><h2>${esc(x.name)}</h2><p>${esc(x.mechanism)}</p><h3>Common causes</h3><p>${esc(x.causes)}</p><h3>Signs & symptoms to look for</h3><p>${esc(x.signs)}</p><div class="notice">${esc(x.distinction)}</div><a class="textlink" href="${esc(x.url)}" target="_blank" rel="noopener">Clinical reference ↗</a></article>`).join('')}</div><section class="contentcard"><h2>Distributive shock has several patterns.</h2><table><thead><tr><th>Subtype</th><th>Helpful context</th></tr></thead><tbody><tr><td>Septic</td><td>Infection with organ dysfunction; temperature, mental status, and skin findings vary.</td></tr><tr><td>Anaphylactic</td><td>Allergen exposure; airway, breathing, skin, gastrointestinal, and circulatory findings can occur. Skin findings may be absent.</td></tr><tr><td>Neurogenic</td><td>Spinal cord injury with loss of sympathetic tone; the pulse may be slow rather than fast.</td></tr></tbody></table><p class="storage-note">These are recognition exercises, not diagnostic rules or treatment orders. Follow your course and local protocols for assessment and management.</p><p class="source"><a href="https://www.cdc.gov/sepsis/about/" target="_blank" rel="noopener">CDC sepsis reference ↗</a> · <a href="https://www.nhlbi.nih.gov/health/cardiogenic-shock" target="_blank" rel="noopener">NHLBI cardiogenic shock reference ↗</a></p></section>`}
