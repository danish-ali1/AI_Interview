import express from "express";
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {getAllUsers,getAllSessions,addQuestion,} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users",protectedRoute,authorizeRoles("admin"),getAllUsers);

router.get("/sessions",protectedRoute,authorizeRoles("admin"),getAllSessions);

router.post("/addQuestions",protectedRoute,authorizeRoles("admin"),addQuestion);


export default router;
