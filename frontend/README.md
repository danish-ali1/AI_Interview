This frontend application provides the user interface for the AI-based interview evaluation system. It allows candidates to take interviews, submit answers, and view evaluation results, while administrators can manage questions and monitor system activity.

The frontend communicates with the backend API and handles authentication using cookie-based sessions. It is designed with a clean structure and responsive layout to provide a smooth user experience.

Tech Stack

The application is built using React with Vite as the development environment. Axios is used for API communication. Tailwind CSS is used for styling and layout. Routing is managed on the client side to separate candidate and admin views.

Core Functionality

Users can register and log in through authentication forms. After login, access is controlled based on user role. Candidates are directed to interview-related pages where they can start sessions, answer questions, and view feedback.

Admin users have access to a dashboard where they can add and manage questions. The interface separates administrative functionality from candidate features to ensure proper role-based access.

The frontend communicates securely with the backend using HTTP-only cookies for authentication. Protected routes prevent unauthorized users from accessing restricted pages.

Application Flow

After logging in, the user is redirected based on their role. Candidates can begin an interview session, answer questions one by one, and view their evaluation results once completed. Scores such as relevance, sentiment, and confidence are displayed in a structured format.

Admins can access a dashboard that allows them to create new questions by specifying role, difficulty, model answer, and keywords. These questions are then available for interview sessions.

Project Structure

The frontend follows a component-based architecture. Pages are organized by role and functionality. Reusable components are separated from page-level logic. API calls are centralized using an Axios instance configuration to maintain consistency across requests.

State management is handled locally within components where possible, keeping the structure simple and maintainable.

Setup Instructions

Clone the repository and install dependencies using npm install. Start the development server using npm run dev. By default, the application runs on:

http://localhost:5173

Ensure the backend server is running and properly configured to allow CORS requests from the frontend.

Security

Authentication relies on HTTP-only cookies set by the backend. The frontend does not manually store tokens in local storage. Protected routes check authentication state before rendering sensitive components. Role-based navigation ensures that admin and candidate views remain isolated.

Future Improvements

The interface can be enhanced with improved analytics visualization, better session history tracking, advanced filtering for question management, and more refined UI feedback states. The structure allows for these improvements without major refactoring.