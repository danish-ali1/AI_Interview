AI Interview System is a full-stack web application that simulates technical interviews and evaluates candidate answers automatically. The system allows candidates to take structured interviews and receive AI-based evaluation, while administrators manage the question bank and control interview content.

The application is divided into two main parts: a backend API that handles authentication, session management, evaluation logic, and data storage, and a frontend application that provides the user interface for candidates and administrators.

Features

The system supports secure authentication with role-based access control. Candidates can start interview sessions, submit answers, and receive structured feedback based on relevance, sentiment, and confidence scoring. Administrators can add and manage interview questions, including role, difficulty level, model answers, and keywords.

The evaluation logic is powered by a custom NLP service that compares user answers with model answers using semantic similarity and keyword matching techniques.

Tech Stack

Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication (HTTP-only cookies)

Frontend
React (Vite)
Axios
Tailwind CSS

System Roles

Candidate users can take interviews and view their evaluation results.

Admin users can access protected routes to manage the question bank and control interview content.

Demo Credentials

The following demo credentials are provided for testing the system.

Admin Login

Email: admin21@gmail.com

Password: admin21

Candidate Login

Email: eren21@gmail.com

Password: eren21

These accounts are intended for demonstration and evaluation purposes only.

The application is live at https://ai-interview-delta-blush.vercel.app