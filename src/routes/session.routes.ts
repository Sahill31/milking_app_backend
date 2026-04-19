import express from "express";
import { validate } from "../middlewares/validate";
import { createSessionSchema, endSessionSchema } from "../validation/session.validation";
import {
  createSession,
  getSessions,
  getSummary,
  endSession,
} from "../controllers/milkingSession.controller";

const router = express.Router();

router.post("/", validate(createSessionSchema), createSession);
router.get("/", getSessions);
router.get("/summary", getSummary);
router.patch("/:id/end", validate(endSessionSchema), endSession);

export default router;