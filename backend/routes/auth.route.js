import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

// Define your authentication routes here

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;