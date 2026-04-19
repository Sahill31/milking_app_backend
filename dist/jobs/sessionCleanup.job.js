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
exports.sessionCleanupJob = void 0;
const cron = __importStar(require("node-cron"));
const milkingSession_1 = require("../models/milkingSession");
const logger_1 = require("../utils/logger");
// Marks abandoned sessions (active sessions older than 24 hours)
const sessionCleanupJob = () => {
    logger_1.logger.info('Starting session cleanup job');
    // Schedule to run every hour
    cron.schedule('0 * * * *', async () => {
        try {
            logger_1.logger.info('Running session cleanup task');
            // Find active sessions older than 24 hours
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const result = await milkingSession_1.MilkingSession.deleteMany({
                status: 'active',
                start_time: { $lt: twentyFourHoursAgo }
            });
            logger_1.logger.info(`Session cleanup completed: ${result.deletedCount} sessions deleted`);
        }
        catch (error) {
            logger_1.logger.error('Session cleanup job failed', error);
        }
    });
    logger_1.logger.info('Session cleanup job scheduled to run every hour');
};
exports.sessionCleanupJob = sessionCleanupJob;
