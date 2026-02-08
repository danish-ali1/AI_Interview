import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'
const router=express.Router()

router.post("/signup",signup)

router.post("/login",login)

router.get("/logout",logout)

router.get("/me",protectedRoute,(req,res)=>{
  res.status(200).json({
    success:true,
    user:req.user
  })
})

export default router