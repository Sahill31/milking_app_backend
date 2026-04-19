"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.endSession = exports.getSessions = exports.createSession = void 0;
const service = __importStar(require("../services/milkingSession.service"));
const logger_1 = require("../utils/logger");
const errorUtils_1 = require("../utils/errorUtils");
const createSession = async (req, res) => {
    try {
        logger_1.logger.info("Controller: Creating new session request received");
        const data = await service.createSession(req.body);
        logger_1.logger.info("Controller: Session created successfully");
        res.json({ success: true, data });
    }
    catch (error) {
        logger_1.logger.error("Controller: Failed to create session", error);
        res.status(500).json({ success: false, message: "Failed to create session" });
    }
};
exports.createSession = createSession;
const getSessions = async (_, res) => {
    try {
        logger_1.logger.info("Controller: Retrieving sessions request received");
        const data = await service.getSessions();
        logger_1.logger.info("Controller: Sessions retrieved successfully");
        res.json({ success: true, data });
    }
    catch (error) {
        logger_1.logger.error("Controller: Failed to retrieve sessions", error);
        res.status(500).json({ success: false, message: "Failed to retrieve sessions" });
    }
};
exports.getSessions = getSessions;
const endSession = async (req, res) => {
    try {
        logger_1.logger.info("Controller: Ending session request received", { sessionId: req.params.id });
        const data = await service.endSession(req.params.id, req.body);
        logger_1.logger.info("Controller: Session ended successfully");
        res.json({ success: true, data });
    }
    catch (error) {
        logger_1.logger.error("Controller: Failed to end session", error);
        if ((0, errorUtils_1.isError)(error)) {
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
exports.endSession = endSession;
const getSummary = async (_, res) => {
    try {
        logger_1.logger.info("Controller: Generating summary request received");
        const data = await service.getSummary();
        logger_1.logger.info("Controller: Summary generated successfully");
        res.json({ success: true, data });
    }
    catch (error) {
        logger_1.logger.error("Controller: Failed to generate summary", error);
        res.status(500).json({ success: false, message: "Failed to generate summary" });
    }
};
exports.getSummary = getSummary;
