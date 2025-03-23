import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { connectDatabase, disconnectDatabase } from "./config/database";

// Load environment variables
dotenv.config();
if (!process.env.MONGO_URI) {
    console.error("❌ Missing required environment variables.");
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // CORS support
app.use(morgan("dev")); // Request logging
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api", routes);

// Global Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: err.message,
    });
});

// Connect to database before starting the server
connectDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error(
            "❌ Failed to connect to the database. Server not started.",
            err
        );
    });

// Graceful shutdown handling
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await disconnectDatabase();
    process.exit(0);
});
