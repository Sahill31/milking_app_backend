"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const sessionCleanup_job_1 = require("./jobs/sessionCleanup.job");
dotenv_1.default.config();
app_1.default.use("/api/sessions", session_routes_1.default);
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, async () => {
    await (0, db_1.connectDB)();
    console.log(`Server running on port ${PORT}`);
    // Initialize session cleanup job
    (0, sessionCleanup_job_1.sessionCleanupJob)();
});
