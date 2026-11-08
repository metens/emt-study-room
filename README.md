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
