import { MilkingSession } from "../models/milkingSession";
import { logger } from "../utils/logger";

export const createSession = async (data: { start_time: string }) => {
  try {
    logger.info("Creating new milking session", { start_time: data.start_time });
    
    const session = await MilkingSession.create({
      start_time: new Date(data.start_time),
    });

    logger.info("Successfully created milking session", { sessionId: session._id });
    return session;
  } catch (error) {
    logger.error("Failed to create milking session", error);
    throw error;
  }
};

export const getSessions = async () => {
  try {
    logger.info("Retrieving milking sessions");
    const sessions = await MilkingSession.find({ status: "completed" }).sort({ createdAt: -1 });
    logger.info("Successfully retrieved milking sessions");
    return sessions;
  } catch (error) {
    logger.error("Failed to retrieve milking sessions", error);
    throw error;
  }
};

export const endSession = async (id: string, data: { milk_quantity: number; notes?: string }) => {
  try {
    logger.info("Ending milking session", { sessionId: id, milk_quantity: data.milk_quantity });
    
    const session = await MilkingSession.findById(id);
    if (!session) {
      throw new Error("Session not found");
    }

    if (session.end_time || session.status === "completed") {
      throw new Error("Session already ended");
    }

    const endTime = new Date();
    const startTime = session.start_time;
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const updatedSession = await MilkingSession.findByIdAndUpdate(
      id,
      {
        end_time: endTime,
        duration: duration,
        milk_quantity: data.milk_quantity,
        notes: data.notes || "",
        status: "completed",
      },
      { new: true }
    );

    logger.info("Successfully ended milking session", { 
      sessionId: id, 
      duration,
      oldStatus: session.status,
      newStatus: "completed" 
    });
    return updatedSession;
  } catch (error) {
    logger.error("Failed to end milking session", error);
    throw error;
  }
};

export const getSummary = async () => {
  try {
    logger.info("Generating milking session summary");
    const data = await MilkingSession.aggregate([
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalMilk: { $sum: "$milk_quantity" },
          avgMilk: { $avg: "$milk_quantity" },
        },
      },
    ]);

    const summary = data[0] || { totalSessions: 0, totalMilk: 0, avgMilk: 0 };
    logger.info("Successfully generated milking session summary", summary);
    return summary;
  } catch (error) {
    logger.error("Failed to generate milking session summary", error);
    throw error;
  }
};