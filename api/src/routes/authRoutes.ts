import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();
const authController = new AuthController();

//post /api/auth/register
router.post("/register", (req, res) => authController.register(req, res));

//post /api/auth/register
router.get("/login", (req, res) => authController.login(req, res));

export default router;