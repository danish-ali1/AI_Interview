import express from 'express'
import {protectedRoute} from '../middlewares/auth.middleware.js'
import { getNextQuestion,submitAnswer,startInterview,endInterview, getFeedback, getUserSessions } from '../controllers/interview.controller.js'
const router=express.Router()

router.post("/start",protectedRoute,startInterview)
router.get("/sessions",protectedRoute,getUserSessions)
router.get("/:sessionId/question",protectedRoute,getNextQuestion)
router.post("/:sessionId/answer",protectedRoute,submitAnswer)
router.post("/:sessionId/end",protectedRoute,endInterview)
router.get("/:sessionId/feedback", protectedRoute, getFeedback);


export default router