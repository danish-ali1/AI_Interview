This backend application powers an AI-based interview evaluation system. It manages authentication, role-based access control, interview sessions, answer submission, and automated NLP-based evaluation. The system allows candidates to take interviews and receive structured scoring, while administrators manage the question bank and control interview content.

The architecture is modular and organized to keep business logic separate from routing and configuration, making the application scalable and maintainable.

Tech Stack

The backend is built using Node.js and Express.js. MongoDB is used as the database, with Mongoose for schema modeling and data management. Authentication is handled using JSON Web Tokens stored in HTTP-only cookies. The evaluation logic is implemented as a separate NLP service within the application.

Core Functionality

The system supports secure user authentication with role-based access control. Two roles exist in the application: candidate and admin. Candidates can start interview sessions, submit answers, and receive evaluation scores. Admin users can manage the question bank and access protected administrative routes.

Interview sessions are created for candidates, and each submitted answer is evaluated automatically. The evaluation result is stored along with the answer and linked to the corresponding session.

NLP Evaluation

The backend includes a custom NLP service that evaluates each submitted answer. The evaluation calculates three values: relevance, sentiment, and confidence.

Relevance measures how closely the user’s answer aligns with the model answer. This is determined using a combination of keyword matching and semantic similarity techniques, focusing on meaning rather than exact wording.

Sentiment analysis classifies the tone of the response as positive, neutral, or negative. While sentiment does not determine correctness, it provides additional communication insight.

Confidence scoring estimates how clearly and directly the answer is written. Structured explanations and precise technical language generally result in higher confidence scores.

The evaluation result is stored inside the scores field of the Answer model.

Project Structure

The backend follows a structured organization. Route definitions are separated from controllers, and controllers delegate evaluation logic to services. Database schemas are defined in models, authentication and authorization logic is placed in middleware, and configuration is managed separately. This structure ensures clarity and maintainability as the system grows.

Setup Instructions

Clone the repository and install dependencies using npm install. Create a .env file in the root directory and define the required environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

After configuration, start the development server using npm run dev. The backend will run locally on the configured port.

API Structure

The backend exposes authentication routes for user registration, login, and logout. Interview routes handle session creation, answer submission, and feedback retrieval. Admin routes are protected and allow management of questions in the system. All protected endpoints require valid authentication.

Security

Passwords are hashed before being stored in the database. JWT tokens are stored in HTTP-only cookies to reduce exposure to client-side scripts. Role-based middleware restricts access to administrative functionality. Basic validation and structured error handling are implemented to ensure reliable API behavior.

Future Improvements

The NLP evaluation layer can be enhanced with more advanced semantic models, refined confidence detection, and role-specific scoring logic. The architecture allows these improvements without major changes to the existing API structure.