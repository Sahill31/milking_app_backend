import * as service from "../services/milkingSession.service";
import { logger } from "../utils/logger";
import { isError } from "../utils/errorUtils";

export const createSession = async (req: any, res: any) => {
  try {
    logger.info("Controller: Creating new session request received");
    const data = await service.createSession(req.body);
    logger.info("Controller: Session created successfully");
    res.json({ success: true, data });
  } catch (error: unknown) {
    logger.error("Controller: Failed to create session", error);
    res.status(500).json({ success: false, message: "Failed to create session" });
  }
};

export const getSessions = async (_: any, res: any) => {
  try {
    logger.info("Controller: Retrieving sessions request received");
    const data = await service.getSessions();
    logger.info("Controller: Sessions retrieved successfully");
    res.json({ success: true, data });
  } catch (error: unknown) {
    logger.error("Controller: Failed to retrieve sessions", error);
    res.status(500).json({ success: false, message: "Failed to retrieve sessions" });
  }
};

export const endSession = async (req: any, res: any) => {
  try {
    logger.info("Controller: Ending session request received", { sessionId: req.params.id });
    const data = await service.endSession(req.params.id, req.body);
    logger.info("Controller: Session ended successfully");
    res.json({ success: true, data });
  } catch (error: unknown) {
    logger.error("Controller: Failed to end session", error);

    if (isError(error)) {
      if (error.message === "Session not found") {
        return res
          .status(404)
          .json({ success: false, message: error.message });
      }

      if (error.message === "Session already ended") {
        return res
          .status(400)
          .json({ success: false, message: error.message });
      }
    }

    return res
      .status(500)
      .json({ success: false, message: "Failed to end session" });
  }
};

export const getSummary = async (_: any, res: any) => {
  try {
    logger.info("Controller: Generating summary request received");
    const data = await service.getSummary();
    logger.info("Controller: Summary generated successfully");
    res.json({ success: true, data });
  } catch (error: unknown) {
    logger.error("Controller: Failed to generate summary", error);
    res.status(500).json({ success: false, message: "Failed to generate summary" });
  }
};