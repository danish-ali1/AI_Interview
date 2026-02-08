AI Interview Preparation Platform (Phase 1)

This repository contains the backend implementation for a text-based interview simulation platform.

The system allows users to authenticate, start an interview for a selected role, answer questions, and receive automated feedback based on basic answer evaluation logic.

This project covers Phase 1 backend and core evaluation requirements.

Tech Stack: Node.js,Express.js,MongoDb(Atlas),Mongoose,JWT Authentication

Features Implemented: User signup, login, and logout, Protected interview routes, Interview session creation, Role-based question handling, Answer submission and storage, Automatic next-question flow,Basic answer relevance scoring, Interview progress tracking

Interview Flow: at first the user needs to sign up and log in, then interview session can be started by selecting a role and a session id is generated.Questions are served one at a time and user submits an answer for each question.Answer is evaluated and stored then next question is returned automatically.
Interview ends after all questions are answered

Answer Evaluation Logic: As of now I am  using a simple rule-based evaluation approach.Each question contains a list of predefined keywords.User answers are checked against these keywords to calculate a relevance score.This logic provides basic automated feedback and will be extended in later phases.

Answer evaluation logic is abstracted into a service layer.
Each answer is scored based on: Keyword matching, Similarity with model answer, Sentiment analysis (rule-based)

Future enhancement:Python-based NLP evaluation

Questions are seeded separately using a dedicated seed script.
This allows easy reset or extension of the question bank without affecting interview sessions.














