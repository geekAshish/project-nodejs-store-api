import { Router } from "express";
import { dashboard, login } from "../controller/auth";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);

export default router;
