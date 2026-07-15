import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Security
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// HTTP request logging
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CollabSpace API is running 🚀",
  });
});

export default app;