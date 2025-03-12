import express from "express";
import { webhooks } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/webhooks", webhooks);

export default router;
