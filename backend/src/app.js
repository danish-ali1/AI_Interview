import express from 'express'
import authRoutes from './routes/auth.route.js'
import interviewRoutes from './routes/interview.route.js'
import adminRoutes from './routes/admin.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:[
      "http://localhost:5173",
     "https://ai-interview-delta-blush.vercel.app",
  ],
  credentials: true
}))
app.use("/api/auth",authRoutes)
app.use("/api/interview",interviewRoutes)
app.use("/api/admin",adminRoutes)

export default app