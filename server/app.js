import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/errorHandler.js";
import router from "./routes/dealsRouter.js";

const app = express();

// Enable CORS
app.use(cors({
    origin: true, // allow all origins
}));

// Parse JSON request bodies
app.use(express.json());

// API routes
app.use("/api/deals", router);

// Global error handler
app.use(errorHandler);

export default app;
