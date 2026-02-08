import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="bg-black/60 text-white p-10 rounded-xl max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to AI Interview Preparation Platform
        </h1>

        <p className="text-lg mb-6 leading-relaxed">
          Practice real interview questions, get instant AI-based feedback,
          improve your answers, and track your performance — all in one place.
        </p>

        <p className="text-sm text-gray-300 mb-8">
          Built for developers preparing for frontend, backend, and full-stack
          roles.
        </p>

        <Link to="/interview" className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Go to Interview
        </Link>
      </div>
    </div>
  )
}

export default Home