import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Request logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());

export default app;