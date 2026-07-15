import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "CollabSpace API is healthy 🚀",
  });
});

app.use("/api/v1", routes);

export default app;