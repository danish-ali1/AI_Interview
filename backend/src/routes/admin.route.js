import express from "express";
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  getAllSessions,
  getSessionDetails
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/users",
  protectedRoute,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/sessions",
  protectedRoute,
  authorizeRoles("admin"),
  getAllSessions
);

router.get(
  "/sessions/:sessionId",
  protectedRoute,
  authorizeRoles("admin"),
  getSessionDetails
);

export default router;
