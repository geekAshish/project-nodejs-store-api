import { Router } from "express";
import { dashboard, login } from "../controller/auth";

const router = Router();

router.route("/login").post(login);
router.route("/dashboard").get(dashboard);

export default router;
