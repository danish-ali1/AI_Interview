import express from 'express'
import authRoutes from './routes/auth.route.js'
import interviewRoutes from './routes/interview.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: true,
  credentials: true
}))
app.use("/api/auth",authRoutes)
app.use("/api/interview",interviewRoutes)

export default app