"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middlewares/validate");
const session_validation_1 = require("../validation/session.validation");
const milkingSession_controller_1 = require("../controllers/milkingSession.controller");
const router = express_1.default.Router();
router.post("/", (0, validate_1.validate)(session_validation_1.createSessionSchema), milkingSession_controller_1.createSession);
router.get("/", milkingSession_controller_1.getSessions);
router.get("/summary", milkingSession_controller_1.getSummary);
router.patch("/:id/end", (0, validate_1.validate)(session_validation_1.endSessionSchema), milkingSession_controller_1.endSession);
exports.default = router;
