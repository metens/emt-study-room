# EMT Study Room

A free public EMT study website. No accounts, API keys, server, or database are required.

## Features

- Five starter notes, two concept diagrams, ten flashcards, and fifteen original practice questions with references.
- Topic filters and search.
- Flip flashcards, mark familiar concepts, and shuffle a deck.
- Quizzes with immediate explanations and a missed-question retry.
- Timed practice exams with question navigation and an answer review after submission.
- Practice history in local browser storage, with no cross-device synchronization.

The starter library is introductory, not comprehensive NREMT preparation. Results show practice accuracy and are not validated pass predictions. Follow course materials and local protocols.

## Add public course material

Edit `data.js` and commit to `main`; Vercel publishes changes automatically. All material here is public. Each item has an ID, type (`note`, `card`, `question`, `diagram`), title, body, topic, source, and optional HTTPS source URL. Questions have four options and a zero-based `correct` index; diagrams point to an asset under `diagrams/`.

## Hosting

Use Vercel's Other framework preset, no build or install command, with the project root as the output directory. `vercel.json` provides static settings and response headers. Production is intended for public access without Vercel Authentication.

The `sites-source` branch preserves the earlier server-backed version. This `main` branch contains the simplified static app.

## Checks

Run `node --check app.js` and `node tests/study.test.cjs`. No dependency installation is needed.

## Airway & Respiration course review
70 adapted questions from supplied course screenshots, numbered 1–70, are available at `/#airway-test` (timed) and `/#airway-quiz` (immediate feedback). The full bank now has 85 questions and 102 study items. Choices and question order are shuffled; missed questions can be retried. Source images and prior grades are not published. Older or ambiguous clinical statements were revised, with course-specific equipment conventions labeled.

## Airway Basics & Suction review
A separate 28-question review from supplied study notes is available at `/#airway-review`. The bank now contains 113 questions and 130 study items. Items 17, 19, 22, and 25 clarify trauma positioning, drainage, absence of gag reflex for an OPA, and exposure-based PPE.

## Pharmacology memory lab
`/#pharm` provides nine medication profiles, 63 flashcards, and 63 review questions from the uploaded chart. Dedicated routes: `/#pharm-cards`, `/#pharm-quiz`, `/#pharm-notes`. Medication/category filters isolate recall topics. Glucose units, aspirin arithmetic, nitroglycerin action, product-specific dosing, and scope statements have explicit corrections/context. These are course study materials, not a complete formulary or standing orders. Total: 265 study items, 176 questions.

## Primary assessment diagram
The original course chart is available in Diagrams and at `/resources/primary-assessment-original.png`. `/#assessment` provides a 20-blank overlay exercise with drag/drop, tap/keyboard selection, checking, reveal, return-to-bank, and shuffle/reset. The original remains intact. Its oxygen threshold and transport wording are labeled course-specific rather than universal clinical rules.

## SAMPLE & OPQRST matching
`/#mnemonics` offers two six-card question-matching activities with drag/drop and tap/keyboard placement, check/reveal, shuffle/reset, and separate in-memory rounds. Questions are adapted from supplied notes, including last ins/outs and prior episodes, with timing and severity clarifications.

## ECG placement
`/#ecg` provides original full-body limb and chest-detail schematics for ten electrode targets, drag/drop and tap placement, individual color selects, AHA/IEC modes, separate color and position scoring, references, and reveal/reset. V4–V6 are level; V3 is midway between V2 and V4. Color conventions follow the cited GE reference, including AHA V5 orange.

## Types of shock
`/#shock` explains hypovolemic, cardiogenic, obstructive, and distributive shock with causes, signs, and distinguishing context. `/#shock-identify` and `/#shock-signs` each offer eight questions with explanations and missed-only retry. Distributive examples include sepsis, anaphylaxis, and neurogenic shock. Signs overlap and are not diagnostic rules.
