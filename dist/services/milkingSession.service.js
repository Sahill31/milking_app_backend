"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.endSession = exports.getSessions = exports.createSession = void 0;
const milkingSession_1 = require("../models/milkingSession");
const logger_1 = require("../utils/logger");
const createSession = async (data) => {
    try {
        logger_1.logger.info("Creating new milking session", { start_time: data.start_time });
        const session = await milkingSession_1.MilkingSession.create({
            start_time: new Date(data.start_time),
        });
        logger_1.logger.info("Successfully created milking session", { sessionId: session._id });
        return session;
    }
    catch (error) {
        logger_1.logger.error("Failed to create milking session", error);
        throw error;
    }
};
exports.createSession = createSession;
const getSessions = async () => {
    try {
        logger_1.logger.info("Retrieving milking sessions");
        const sessions = await milkingSession_1.MilkingSession.find().sort({ createdAt: -1 });
        logger_1.logger.info("Successfully retrieved milking sessions");
        return sessions;
    }
    catch (error) {
        logger_1.logger.error("Failed to retrieve milking sessions", error);
        throw error;
    }
};
exports.getSessions = getSessions;
const endSession = async (id, data) => {
    try {
        logger_1.logger.info("Ending milking session", { sessionId: id, milk_quantity: data.milk_quantity });
        const session = await milkingSession_1.MilkingSession.findById(id);
        if (!session) {
            throw new Error("Session not found");
        }
        if (session.end_time || session.status === "completed") {
            throw new Error("Session already ended");
        }
        const endTime = new Date();
        const startTime = session.start_time;
        const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        const updatedSession = await milkingSession_1.MilkingSession.findByIdAndUpdate(id, {
            end_time: endTime,
            duration: duration,
            milk_quantity: data.milk_quantity,
            notes: data.notes || "",
            status: "completed",
        }, { new: true });
        logger_1.logger.info("Successfully ended milking session", {
            sessionId: id,
            duration,
            oldStatus: session.status,
            newStatus: "completed"
        });
        return updatedSession;
    }
    catch (error) {
        logger_1.logger.error("Failed to end milking session", error);
        throw error;
    }
};
exports.endSession = endSession;
const getSummary = async () => {
    try {
        logger_1.logger.info("Generating milking session summary");
        const data = await milkingSession_1.MilkingSession.aggregate([
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
        logger_1.logger.info("Successfully generated milking session summary", summary);
        return summary;
    }
    catch (error) {
        logger_1.logger.error("Failed to generate milking session summary", error);
        throw error;
    }
};
exports.getSummary = getSummary;
