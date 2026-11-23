'use strict';
const COMMUNICATION_CARDS = [
  [
    "When calling in patient information, include these elements:",
    "Unit identification and level of provider\nEstimated time of arrival (ETA)\nPatient’s age and gender\nChief complaint\nBrief, pertinent history of present illness or injury\nMajor past illnesses\nMental status\nBaseline vital signs\nPertinent findings of the physical exam\nEmergency medical care given\nResponse to emergency medical care\nContact made with medical direction if required or if you have questions"
  ],
  [
    "When completing the prehospital care report, or PCR, include the following:",
    "Patient’s name, address, date of birth, age, sex\nTreatment administered before arrival of the EMT (by bystanders, Emergency Medical Responders, or others)\nBilling and insurance information (in many jurisdictions)\nNature of the call\nMechanism of injury\nLocation where the patient was found\nSigns and symptoms\nBaseline and subsequent vital signs\nSecondary assessment\nCare administered and the effect that the care had on the patient (e.g., improved, no change)\nChanges in condition throughout the call"
  ],
  [
    "A PCR may or may not be a legal document in a court proceeding.",
    "A PCR may be a legal document in a court proceeding."
  ],
  [
    "The PCR should be completed as soon as possible after the completion of the call. OR You can wait to complete the PCR after the completion of the call until you have time.",
    "The PCR should be completed as soon as possible after the completion of the call."
  ],
  [
    "Is this True or False:\nData from PCRs may help determine future treatments, trends, research, and quality improvement.",
    "True.\nData from PCRs may help determine future treatments, trends, research, and quality improvement."
  ],
  [
    "True or False:\nYour report should “paint a picture” of your patient and their condition, accurately describing your contact with the patient throughout the call.",
    "True:\nYour report should “paint a picture” of your patient and their condition, accurately describing your contact with the patient throughout the call."
  ],
  [
    "True or False:\nInterpersonal communication is often challenging in EMS. Adopting best practices can improve communication capabilities significantly. Learn good communication skills on and off the job.",
    "BIG TRUE!\nInterpersonal communication is often challenging in EMS. Adopting best practices can improve communication capabilities significantly. Learn good communication skills on and off the job."
  ],
  [
    "What are some all-important legal concepts that an EMT must consider when documenting a call?",
    "Confidentiality, patient refusals, and falsification of records are all-important legal concepts that an EMT must consider when documenting a call."
  ]
];
const COMMUNICATION_PAGES = [
  {
    "number": 1,
    "text": "                          Communication & Documentation\n\nCommunication Systems and Radio Communication\nEMS radio systems consist of:\n\n   ●​ Base stations\n   ●​ Mobile radios\n   ●​ Portable radios\n   ●​ Repeaters\n   ●​ Cell phones\n   ●​ Telemetry\n\nComputers and tablets are constantly developing new technology and may change or get updated frequently.\n\nMany systems include backup radios for added support.\n\nAll forms of radio systems will require preventative maintenance and repair.\n\nRepeaters"
  },
  {
    "number": 2,
    "text": "Below is an example of an EMS communication system using repeaters.\n\n\n\n\nRadio Communication\nRadio communication is regulated by the Federal Communications Commission (FCC). The FCC oversees the following:\n\n   ●​ Assigns and licenses designated radio frequencies\n   ●​ Prevents interference with emergency radio traffic\n   ●​ Prohibits profanities and offensive language"
  },
  {
    "number": 3,
    "text": "Box 17-1 Principles of Radio Communication\n\nFollow These Principles When Using the EMS Radio System:\n\nMake sure that your radio is on and the volume is adjusted properly.\n\nReduce background noise by closing the vehicle window when possible.\n\nListen to the frequency and ensure that it is clear before beginning a transmission.\n\nPress the “press to talk” (PTT) button on the radio, then wait one second before speaking. This prevents cutting off the\nfirst few words of your transmission.\n\nSpeak with your lips about two to three inches from the microphone.\n\nWhen calling another unit or base station, use their unit number or name, followed by yours. “Dispatcher, this is\nAmbulance 2.”If the unit you are calling tells you to “Stand by,” wait until they tell you they are ready to take your\ntransmission.\n\nSpeak slowly and clearly.\n\nKeep the transmissions brief. If it takes longer than 30 seconds, stop at that point and pause for a few seconds so\nemergency traffic can use the frequency if necessary.\n\nUse plain English.\n\nAvoid codes.\n\nDo not use phrases such as “be advised.” These are implied and serve no purpose.\n\nCourtesy is assumed, so there is no need to say “Please,” “Thank you,” and “You’re welcome.”"
  },
  {
    "number": 4,
    "text": "When transmitting a number that might be unclear (15 may sound like 16 or 50), give the number and then repeat the\nindividual digits. Say “Fifteen, one-five.”\n\nAnything said over the radio can be heard by the public on a scanner. Do not use the patient’s name over the radio. For\nthe same reason, do not use profanities or statements that tend to slander any person. Use objective, impartial\nstatements.\n\nUse “we” instead of “l.” As an EMT, you will rarely be acting alone.“\n\nAffirmative” and “Negative” are preferred over “Yes” and “No” because the latter are difficult to hear.\n\nGive assessment information about your patient, but avoid offering a field diagnosis of the patient’s problem. For example,\nsay, “Patient complains of abdominal pain” rather than “Patient probably has appendicitis.”\n\nAvoid slang or abbreviations that are not authorized.\n\nUse EMS frequencies for only authorized EMS communication.\n\nRadio Transmissions Throughout the Call\n   ●​ The initial call often comes via telephone but may be radioed from another agency.\n   ●​ Without prompt and efficient dispatch and receipt of information, ambulances can be sent to the wrong location.\n   ●​ Dispatch records all times according to 24-hour clock.\n   ●​ Use the 24-hour clock for:\n          ○​ Time of Original call\n          ○​ Time ambulance was dispatched\n          ○​ Time ambulance reached staging area–Time ambulance arrived at scene\n   ●​ Dispatcher gives times after most transmissions.\n   ●​ Many transmissions are between the mobile radio within the ambulance and the dispatcher at a base station.\n   ●​ In some EMS systems, simple standard communications are transmitted by pushing a button on a mobile data\n      terminal (MDT) mounted in the ambulance."
  },
  {
    "number": 5,
    "text": "   ●​ Carry portable radio whenever you leave unit.\n\nRadio Medical Reports\nReport must be given to destination hospital so it can prepare for arrival.\n\nReports may be by radio, verbally (in person), in writing, or in all three ways.\n\nRadio report is specifically structured to present only most important information.\n\n“Paint a picture” of the patient in words.\n\nCommunication from the ambulance can be by radio or cell phone.\n\nMake sure you include:\n\n   1.​ Unit identification and level of provider.\n   2.​ Estimated time of arrival (ETA).\n   3.​ Patient’s age and gender.\n   4.​ Chief complaint.\n   5.​ Brief, pertinent history of present illness/injury.\n   6.​ Major past illnesses.\n   7.​ Mental status.\n   8.​ Baseline vital signs.\n   9.​ Pertinent findings of physical exam.\n   10.​Emergency care given.\n   11.​Response to emergency medical care.\n   12.​Contact medical direction if required or if you have a question.\n\nWhen you are communicating with medical direction, make sure you:\n\n   ●​ Give information clearly and accurately."
  },
  {
    "number": 6,
    "text": "   ●​ After receiving an order or denial for medication or procedure, repeat back word for word.\n   ●​ If order unclear, ask physician to repeat.\n   ●​ If order seems inappropriate, question the physician.\n\n\nThe Verbal Report\nThe verbal report should be given upon arrival at destination•\n\n   ●​ Introduce patient by name.\n   ●​ Give complete and detailed report.\n\nElements of the verbal report should include:\n\n   ●​   Chief complaint\n   ●​   History that was not given previously\n   ●​   Assessment treatment given en route\n   ●​   Additional vital signs taken en route\n\n\nInterpersonal Communication\nTeam Communication\nEMTs must communicate with others involved in patient care.\n\n   ●​ First responders\n   ●​ Advanced EMTs, paramedics\n   ●​ Home healthcare aides, family\n\nSpeak candidly and respectfully to:\n\n   ●​ Gather information about the patient.\n   ●​ Complete any necessary and appropriate transfer of care"
  },
  {
    "number": 7,
    "text": "Therapeutic Communication\nCommunication techniques are often learned by experience. They may be more difficult with those in crisis. Everyone can improve\ncommunication skills by learning effective communication techniques on and off the job.\n\nSome ways to show attentive listening are to:\n\n   ●​   Use eye contact. Eye contact shows interest, attentiveness, and comfort.\n   ●​   Be aware of position and body language.\n   ●​   Face the patient at eye level with arms down and relaxed.\n   ●​   Communicating with patients and others who are in crisis requires skill and tact.\n   ●​   Use language the patient can understand.\n   ●​   Do not use medical terms.\n   ●​   Explain procedures clearly and slowly.\n   ●​   Be honest and kind.\n   ●​   Dishonesty ruins confidence and rapport.\n   ●​   Use patient’s proper name. Using their name shows a sign of respect, especially with older patients.\n   ●​   Listen. Active listening is important to establish trust.\n\nPosition yourself at or below the patient’s eye level to be less intimidating and to aid communication.\n\nThere are a few special consideration to be aware of.\n\nAlways be compassionate and respectful if the patient and most especially when a patient:\n\n   ●​ Has a mental disability\n   ●​ Has visual or hearing impairments\n   ●​ Has any language barriers\n\nPediatric Note\nCome down to the pediatric patients level and be kind and be truthful.\n\nStay at a child’s eye level or lower. Keep your face relaxed and friendly. Stay calm."
  },
  {
    "number": 8,
    "text": "Prehospital Care Report\nPrehospital Care Report is the written documentation of what happened during a call.\n\nPrehospital Care Report comes in several forms:\n\n   ●​ Handwritten\n   ●​ Laptop–Tablet\n   ●​ Pen-based computers\n\nMake sure you drop (transfer) the Prehospital Care Report.\n\nFunctions of the Prehospital Care Report\nThe Patient Care Record documents the findings and treatment. It also conveys picture of scene. It is typically entered into patient’s\npermanent medical record.\n\nIt is a legal document and it:\n\n   ●​ Can be subpoenaed and used as evidence\n   ●​ May help patient win a case\n   ●​ May be used against you in case of negligence\n\nIt is also used as Administrative Data for the following: purposes:\n\n   ●​ Insurance information\n   ●​ Billing address\n\nAnother function of the Prehospital Care Report is for education and research as in:\n\n   ●​   Clinical research\n   ●​   Statistics\n   ●​   Continuing education\n   ●​   Tracking EMT’s personal experience"
  },
  {
    "number": 9,
    "text": "Quality improvement data can also be gleaned from the report and used to:\n\n   ●​   Routine call review\n   ●​   Ensures compliance to standards\n   ●​   Can reveal providers deserving special recognition\n   ●​   Can reveal opportunities for improvement\n\nData Elements\nData Elements developed by National Highway Traffic Safety Administration (NHTSA) contain more than four hundred elements for\nstatistical usage. The minimum data set is available and used nationwide.\n\nData can be accessed and run through the following queries:\n\n   ●​   Agency name,\n   ●​   date, times,\n   ●​   call number,\n   ●​   unit personnel and levels of certification,\n   ●​   and other basic information mandated by service\n\nThis is why it is important to use official time given by dispatch so all times in report match.\n\nPatient information that is recorded in the Prehospital Care Report:\n\n   ●​   Name, address, phone number\n   ●​   Gender, age, and date of birth\n   ●​   Weight\n   ●​   Race and/or ethnicity\n   ●​   Billing and insurance information\n\nWhat to include?\nInformation Gathered during the Call can and should include:"
  },
  {
    "number": 10,
    "text": "   ●​ General impression of patient\n   ●​ Narrative summary of call\n   ●​ Patient’s prior aid, past medical history, physical exam results, vital signs, ECG results, procedures and treatments,\n      medications administered, and other information as required by your service\n   ●​ Transport information\n\nNarrative Sections\nThe narrative sections on the Prehospital Report can include the following:\n\n   ●​ Objective information\n            ○​ Observable, measurable, verifiable\n   ●​ Subjective information\n            ○​ Subject to interpretation or opinion (often reported by patient)\n   ●​ Chief complaint\n            ○​ Primary complaint, as stated by patient\n            ○​ Best recorded as a direct quote\n   ●​ Pertinent negatives\n            ○​ Important negative findings\n   ●​ Avoid radio codes and nonstandard abbreviations.\n   ●​ Write legibly and use correct spelling.\n            ○​ Information must be read easily and accurately\n            ○​ PCR is a reflection of your care.\n   ●​ Use appropriate medical terminology.\n   ●​ If it’s not written down, you didn’t do it.\n\n\nSpecial Documentation Issues\nLegal Issues\nThere are quite a few legal issues to be aware of such as:\n\n   ●​ Confidentiality"
  },
  {
    "number": 11,
    "text": "          ○​ Covered by the Health Insurance Portability and Accountability Act (HIPAA)–\n          ○​ Accountability and security\n   ●​ Patient Refusals\n          ○​ High liability\n          ○​ Document all details in a “refusal of care” form\n   ●​ Falsification\n          ○​ Covering up errors\n          ○​ Recording something you forgot to do\n   ●​ Correction of Errors\n          ○​ Mistakes in documentation\n          ○​ Additions\n\nThink About It\n\nYou respond to a call for an unconscious male. Upon arrival the patient is awake, alert, and walking away. He states he\nwas just sleeping, and does not need or want treatment or transport.\n\n\nIs this a patient?\nIs a complete assessment and physical exam needed?\nHow will you document this call?\nShould you obtain a formal patient refusal?\nSpecial Situations\nMultiple-Casualty Incidents:\n\n   ●​ Logistical problem for EMS\n   ●​ Documentation of information for individual patients may be difficult.\n         ○​ Care and evaluation by several providers at different times and locations\n         ○​ Important to keep information with patients from an MCI scene as they move through the system\n\nSpecial Situation Reports:"
  },
  {
    "number": 12,
    "text": "●​   Exposure to infectious disease\n●​   Injury to yourself or another EMT\n●​   Hazardous or unsafe scenes\n●​   Referrals to social service agencies\n●​   Mandatory reports for child or elderly abuse"
  }
];
let communicationCardIndex = 0;
let communicationCardFlipped = false;

function communicationStudy() {
  app.innerHTML = heading('Communication & Documentation', 'Review the lecture notes and practice the eight flashcards from your recording.') + `
    <section class="contentcard">
      <div class="actions">
        <a class="button" href="/resources/communication-documentation.pdf" target="_blank" rel="noopener">Open original notes PDF ↗</a>
        <a class="button" href="#communication-notes" onclick="event.preventDefault();document.getElementById('communication-notes').scrollIntoView()">Read notes ↓</a>
      </div>
      <h2>Flashcards</h2>
      <p>Think of your answer, then select Turn. Use Previous and Next to move through the eight cards.</p>
      <div id="communication-flashcards"></div>
      <details><summary>Transcription notes</summary>
        <p>The first recorded answer is clipped at the top. Its complete checklist is supplied from the matching notes. The second answer repeats two entries in the recording. Each entry appears once here. The fifth answer is supplied from the notes because its reverse is not visible in the recording.</p>
      </details>
    </section>
    <section id="communication-notes" class="contentcard">
      <h2>Communication &amp; Documentation notes</h2>
      <details><summary>View the original 12-page PDF, including its diagrams</summary>
        <iframe loading="lazy" title="Communication and Documentation notes PDF"
          src="/resources/communication-documentation.pdf"
          style="display:block;width:100%;height:70vh;min-height:360px;border:1px solid var(--line);border-radius:12px"></iframe>
        <p><a href="/resources/communication-documentation.pdf" target="_blank" rel="noopener">Open PDF in a new tab ↗</a></p>
      </details>
      ${COMMUNICATION_PAGES.map(p=>`<details><summary>Page ${p.number} · ${esc(p.text.trim().split('\n').find(line=>line.trim()) || 'Notes')}</summary><div class="note" style="white-space:pre-wrap;overflow-wrap:anywhere">${esc(p.text)}</div></details>`).join('')}
    </section>`;
  renderCommunicationCard();
}

function renderCommunicationCard() {
  const card = COMMUNICATION_CARDS[communicationCardIndex];
  const panel = document.getElementById('communication-flashcards');
  panel.innerHTML = `
    <p role="status" aria-live="polite">Card ${communicationCardIndex + 1} of ${COMMUNICATION_CARDS.length} · ${communicationCardFlipped ? 'Answer' : 'Prompt'}</p>
    <button id="communication-card" class="flash" type="button"
      style="height:auto;min-height:240px;white-space:pre-line;font-size:clamp(16px,2vw,22px);line-height:1.6;text-align:left;overflow-wrap:anywhere"
      onclick="turnCommunicationCard()" aria-label="${communicationCardFlipped ? 'Answer. Turn to prompt' : 'Prompt. Turn to answer'}">
      ${esc(card[communicationCardFlipped ? 1 : 0])}
    </button>
    <div class="actions">
      <button type="button" onclick="moveCommunicationCard(-1)">← Previous</button>
      <button type="button" class="primary" onclick="turnCommunicationCard()">↻ Turn</button>
      <button type="button" onclick="moveCommunicationCard(1)">Next →</button>
    </div>`;
}

function turnCommunicationCard() {
  communicationCardFlipped = !communicationCardFlipped;
  renderCommunicationCard();
}

function moveCommunicationCard(direction) {
  communicationCardIndex = (communicationCardIndex + direction + COMMUNICATION_CARDS.length) % COMMUNICATION_CARDS.length;
  communicationCardFlipped = false;
  renderCommunicationCard();
}
