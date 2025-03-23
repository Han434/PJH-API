import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./Logger";
import path from "path";

// Ensure .env is loaded correctly
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("MONGO_URI from index.ts:", process.env.MONGO_URI);

export const connectDatabase = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    console.log("MONGO_URI", MONGO_URI);

    if (!MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        console.log("Connecting to database...");
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30s
            socketTimeoutMS: 45000,
        });

        console.log("Database connected successfully");
        logger.info("Connected to database");

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            logger.error(`MongoDB connection error: ${err.message}`);
        });

        mongoose.connection.once("open", () => {
            console.log("MongoDB connection is open.");
        });
    } catch (error) {
        console.error("Database connection error:", error);
        logger.error(`Database connection error: ${error}`);
        process.exit(1);
    }
};
export const disconnectDatabase = async (): Promise<void> => {
    try {
        console.log("Disconnecting from the database...");
        await mongoose.disconnect();
        console.log("Database disconnected successfully");
        logger.info("Disconnected from database");
    } catch (error) {
        console.error("Error disconnecting from database:", error);
        if (error instanceof Error) {
            logger.error(`Error disconnecting from database: ${error.message}`);
        } else {
            logger.error("Error disconnecting from database: Unknown error");
        }
    }
};
