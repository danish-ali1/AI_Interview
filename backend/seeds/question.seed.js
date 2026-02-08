import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../src/models/Question.js";

dotenv.config();

const questions = [
 {
  role: "backend",
  difficulty: "easy",
  questionText: "What is a REST API?",
  modelAnswer: "REST API is an architectural style that uses HTTP methods and is stateless.",
  keywords: ["rest", "http", "stateless", "api"]
},
{
  role: "backend",
  difficulty: "easy",
  questionText: "What is HTTP?",
  modelAnswer: "HTTP is a protocol used for communication between client and server.",
  keywords: ["http", "protocol", "client", "server"]
},
{
  role: "backend",
  difficulty: "easy",
  questionText: "What is middleware in Express?",
  modelAnswer: "Middleware is a function that has access to request and response objects and can modify them.",
  keywords: ["middleware", "express", "request", "response"]
},
{
  role: "backend",
  difficulty: "easy",
  questionText: "What is JSON?",
  modelAnswer: "JSON is a lightweight data-interchange format used to transmit data between client and server.",
  keywords: ["json", "data", "format"]
},
{
  role: "backend",
  difficulty: "easy",
  questionText: "What is CRUD?",
  modelAnswer: "CRUD stands for Create, Read, Update, and Delete operations on data.",
  keywords: ["crud", "database", "operations"]
},
{
  role: "backend",
  difficulty: "medium",
  questionText: "Explain JWT authentication.",
  modelAnswer: "JWT is a token-based authentication mechanism where data is signed and verified.",
  keywords: ["jwt", "authentication", "token"]
},
{
  role: "backend",
  difficulty: "medium",
  questionText: "What is indexing in databases?",
  modelAnswer: "Indexing improves query performance by reducing data scan operations.",
  keywords: ["index", "database", "performance"]
},
{
  role: "backend",
  difficulty: "medium",
  questionText: "Difference between SQL and NoSQL?",
  modelAnswer: "SQL databases are relational, NoSQL are non-relational and schema-less.",
  keywords: ["sql", "nosql", "schema"]
},
{
  role: "backend",
  difficulty: "medium",
  questionText: "What is CORS?",
  modelAnswer: "CORS allows controlled access to resources across different origins.",
  keywords: ["cors", "security", "origin"]
},
{
  role: "backend",
  difficulty: "medium",
  questionText: "What is connection pooling?",
  modelAnswer: "Connection pooling reuses database connections to improve performance.",
  keywords: ["connection", "pooling", "database"]
},
{
  role: "backend",
  difficulty: "hard",
  questionText: "Explain database normalization.",
  modelAnswer: "Normalization organizes data to reduce redundancy and improve integrity.",
  keywords: ["normalization", "database", "redundancy"]
},
{
  role: "backend",
  difficulty: "hard",
  questionText: "How does event-driven architecture work?",
  modelAnswer: "It relies on events to trigger communication between decoupled services.",
  keywords: ["event-driven", "architecture", "services"]
},
{
  role: "backend",
  difficulty: "hard",
  questionText: "What is distributed locking?",
  modelAnswer: "Distributed locking ensures mutual exclusion across multiple systems.",
  keywords: ["distributed", "locking", "concurrency"]
},
{
  role: "backend",
  difficulty: "hard",
  questionText: "Explain CAP theorem.",
  modelAnswer: "CAP states that consistency, availability, and partition tolerance cannot be achieved together.",
  keywords: ["cap", "consistency", "availability"]
},
{
  role: "backend",
  difficulty: "hard",
  questionText: "How does database sharding work?",
  modelAnswer: "Sharding splits data across multiple databases to improve scalability.",
  keywords: ["sharding", "scalability", "database"]
},
{
  role: "frontend",
  difficulty: "easy",
  questionText: "What is HTML?",
  modelAnswer: "HTML is the markup language used to structure web pages.",
  keywords: ["html", "markup", "web"]
},
{
  role: "frontend",
  difficulty: "easy",
  questionText: "What is CSS?",
  modelAnswer: "CSS is used to style and layout web pages.",
  keywords: ["css", "style", "layout"]
},
{
  role: "frontend",
  difficulty: "easy",
  questionText: "What is JavaScript?",
  modelAnswer: "JavaScript is a programming language used to create dynamic web content.",
  keywords: ["javascript", "dynamic", "web"]
},
{
  role: "frontend",
  difficulty: "easy",
  questionText: "What is DOM?",
  modelAnswer: "DOM represents the structure of a webpage as objects.",
  keywords: ["dom", "document", "object"]
},
{
  role: "frontend",
  difficulty: "easy",
  questionText: "What is React?",
  modelAnswer: "React is a JavaScript library for building UI components.",
  keywords: ["react", "components", "ui"]
},
{
  role: "frontend",
  difficulty: "medium",
  questionText: "What are React hooks?",
  modelAnswer: "Hooks allow functional components to manage state and lifecycle.",
  keywords: ["hooks", "state", "react"]
},
{
  role: "frontend",
  difficulty: "medium",
  questionText: "What is state management?",
  modelAnswer: "State management handles application data flow and consistency.",
  keywords: ["state", "management", "data"]
},
{
  role: "frontend",
  difficulty: "medium",
  questionText: "Explain event delegation.",
  modelAnswer: "Event delegation uses event bubbling to handle events efficiently.",
  keywords: ["event", "delegation", "bubbling"]
},
{
  role: "frontend",
  difficulty: "medium",
  questionText: "What is virtual DOM?",
  modelAnswer: "Virtual DOM is a lightweight copy of the real DOM used for efficient updates.",
  keywords: ["virtual dom", "performance"]
},
{
  role: "frontend",
  difficulty: "medium",
  questionText: "What is responsive design?",
  modelAnswer: "Responsive design adapts UI across different screen sizes.",
  keywords: ["responsive", "design", "css"]
},
{
  role: "frontend",
  difficulty: "hard",
  questionText: "Explain reconciliation in React.",
  modelAnswer: "Reconciliation is React’s process of updating the DOM efficiently.",
  keywords: ["reconciliation", "react", "dom"]
},
{
  role: "frontend",
  difficulty: "hard",
  questionText: "What is code splitting?",
  modelAnswer: "Code splitting loads JavaScript chunks on demand.",
  keywords: ["code splitting", "performance"]
},
{
  role: "frontend",
  difficulty: "hard",
  questionText: "Explain SSR vs CSR.",
  modelAnswer: "SSR renders on server, CSR renders on client.",
  keywords: ["ssr", "csr", "rendering"]
},
{
  role: "frontend",
  difficulty: "hard",
  questionText: "What is hydration?",
  modelAnswer: "Hydration attaches event listeners to server-rendered HTML.",
  keywords: ["hydration", "ssr"]
},
{
  role: "frontend",
  difficulty: "hard",
  questionText: "Explain memoization in React.",
  modelAnswer: "Memoization prevents unnecessary re-renders by caching results.",
  keywords: ["memoization", "react", "performance"]
},
  {
    role: "fullstack",
    difficulty: "easy",
    questionText: "What is fullstack development?",
    modelAnswer: "It involves both frontend and backend development.",
    keywords: ["frontend", "backend", "fullstack"]
  },
  {
    role: "fullstack",
    difficulty: "easy",
    questionText: "What is API?",
    modelAnswer: "API allows communication between software systems.",
    keywords: ["api", "communication", "data"]
  },
  {
    role: "fullstack",
    difficulty: "easy",
    questionText: "What is Git?",
    modelAnswer: "Git is a version control system.",
    keywords: ["git", "version-control"]
  },
  {
    role: "fullstack",
    difficulty: "easy",
    questionText: "What is client-server model?",
    modelAnswer: "Client sends requests and server responds.",
    keywords: ["client", "server", "request"]
  },
  {
    role: "fullstack",
    difficulty: "easy",
    questionText: "What is CRUD?",
    modelAnswer: "CRUD stands for Create, Read, Update, Delete.",
    keywords: ["crud", "database", "operations"]
  },
  {
    role: "fullstack",
    difficulty: "medium",
    questionText: "How does authentication work in web apps?",
    modelAnswer: "Using tokens, sessions, or cookies to verify users.",
    keywords: ["authentication", "jwt", "session"]
  },
  {
    role: "fullstack",
    difficulty: "medium",
    questionText: "What is REST vs GraphQL?",
    modelAnswer: "REST uses endpoints, GraphQL uses a single query endpoint.",
    keywords: ["rest", "graphql", "api"]
  },
  {
    role: "fullstack",
    difficulty: "medium",
    questionText: "Explain deployment process.",
    modelAnswer: "Build, test, deploy to server or cloud.",
    keywords: ["deployment", "ci-cd", "server"]
  },
  {
    role: "fullstack",
    difficulty: "medium",
    questionText: "What is environment variable?",
    modelAnswer: "Variables used to store configuration data.",
    keywords: ["env", "config", "security"]
  },
  {
    role: "fullstack",
    difficulty: "medium",
    questionText: "What is rate limiting?",
    modelAnswer: "Limits number of requests from a client.",
    keywords: ["rate-limit", "security", "api"]
  },
  {
    role: "fullstack",
    difficulty: "hard",
    questionText: "How do you scale a web application?",
    modelAnswer: "Using load balancing, caching, and microservices.",
    keywords: ["scaling", "load-balancer", "cache"]
  },
  {
    role: "fullstack",
    difficulty: "hard",
    questionText: "Explain system design basics.",
    modelAnswer: "Designing scalable and reliable systems.",
    keywords: ["system-design", "scalability"]
  },
  {
    role: "fullstack",
    difficulty: "hard",
    questionText: "What is caching strategy?",
    modelAnswer: "Storing frequent data in memory to improve speed.",
    keywords: ["cache", "redis", "performance"]
  },
  {
    role: "fullstack",
    difficulty: "hard",
    questionText: "How does OAuth work?",
    modelAnswer: "OAuth allows third-party authentication securely.",
    keywords: ["oauth", "authentication", "security"]
  },
  {
    role: "fullstack",
    difficulty: "hard",
    questionText: "Explain distributed systems.",
    modelAnswer: "Multiple systems working together as one.",
    keywords: ["distributed", "network", "scalability"]
  },
  {
    role: "data-analyst",
    difficulty: "easy",
    questionText: "What is data analysis?",
    modelAnswer: "Process of inspecting and interpreting data.",
    keywords: ["data", "analysis", "insights"]
  },
  {
    role: "data-analyst",
    difficulty: "easy",
    questionText: "What is Excel used for?",
    modelAnswer: "Excel is used for data organization and analysis.",
    keywords: ["excel", "spreadsheet"]
  },
  {
    role: "data-analyst",
    difficulty: "easy",
    questionText: "What is SQL?",
    modelAnswer: "SQL is used to query databases.",
    keywords: ["sql", "database", "query"]
  },
  {
    role: "data-analyst",
    difficulty: "easy",
    questionText: "What is a dataset?",
    modelAnswer: "A collection of related data.",
    keywords: ["dataset", "data"]
  },
  {
    role: "data-analyst",
    difficulty: "easy",
    questionText: "What is visualization?",
    modelAnswer: "Graphical representation of data.",
    keywords: ["charts", "graphs", "visualization"]
  },
  {
    role: "data-analyst",
    difficulty: "medium",
    questionText: "What is data cleaning?",
    modelAnswer: "Removing or fixing incorrect data.",
    keywords: ["cleaning", "data", "quality"]
  },
  {
    role: "data-analyst",
    difficulty: "medium",
    questionText: "What is normalization?",
    modelAnswer: "Scaling data to a standard range.",
    keywords: ["normalization", "scaling"]
  },
  {
    role: "data-analyst",
    difficulty: "medium",
    questionText: "What is pivot table?",
    modelAnswer: "Tool to summarize large datasets.",
    keywords: ["pivot", "summary", "excel"]
  },
  {
    role: "data-analyst",
    difficulty: "medium",
    questionText: "Explain descriptive statistics.",
    modelAnswer: "Mean, median, mode describe data.",
    keywords: ["mean", "median", "mode"]
  },
  {
    role: "data-analyst",
    difficulty: "medium",
    questionText: "What is correlation?",
    modelAnswer: "Relationship between two variables.",
    keywords: ["correlation", "relationship"]
  },
  {
    role: "data-analyst",
    difficulty: "hard",
    questionText: "What is hypothesis testing?",
    modelAnswer: "Statistical method to validate assumptions.",
    keywords: ["hypothesis", "testing", "statistics"]
  },
  {
    role: "data-analyst",
    difficulty: "hard",
    questionText: "Explain regression analysis.",
    modelAnswer: "Predicts relationship between variables.",
    keywords: ["regression", "prediction"]
  },
  {
    role: "data-analyst",
    difficulty: "hard",
    questionText: "What is p-value?",
    modelAnswer: "Probability that results occurred by chance.",
    keywords: ["p-value", "statistics"]
  },
  {
    role: "data-analyst",
    difficulty: "hard",
    questionText: "What is ETL process?",
    modelAnswer: "Extract, Transform, Load data pipeline.",
    keywords: ["etl", "pipeline", "data"]
  },
  {
    role: "data-analyst",
    difficulty: "hard",
    questionText: "Explain time series analysis.",
    modelAnswer: "Analyzing data points over time.",
    keywords: ["time-series", "trend", "forecast"]
  }
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // clear existing to avoid duplicates
    await Question.deleteMany({});

    await Question.insertMany(questions);

    console.log(" Questions seeded successfully");
    process.exit();
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
};

seedQuestions();
