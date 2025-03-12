import express from "express";
import { requireAuth } from "@clerk/express";
import { webhooks } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/webhooks", webhooks);

export default router;
