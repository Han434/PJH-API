"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = __importDefault(require("./Logger"));
const path_1 = __importDefault(require("path"));
// Ensure .env is loaded correctly
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
console.log("MONGO_URI from index.ts:", process.env.MONGO_URI);
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGO_URI = process.env.MONGO_URI;
    console.log("MONGO_URI", MONGO_URI);
    if (!MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }
    try {
        console.log("Connecting to database...");
        yield mongoose_1.default.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30s
            socketTimeoutMS: 45000,
        });
        console.log("Database connected successfully");
        Logger_1.default.info("Connected to database");
        mongoose_1.default.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            Logger_1.default.error(`MongoDB connection error: ${err.message}`);
        });
        mongoose_1.default.connection.once("open", () => {
            console.log("MongoDB connection is open.");
        });
    }
    catch (error) {
        console.error("Database connection error:", error);
        Logger_1.default.error(`Database connection error: ${error}`);
        process.exit(1);
    }
});
exports.connectDatabase = connectDatabase;
const disconnectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Disconnecting from the database...");
        yield mongoose_1.default.disconnect();
        console.log("Database disconnected successfully");
        Logger_1.default.info("Disconnected from database");
    }
    catch (error) {
        console.error("Error disconnecting from database:", error);
        if (error instanceof Error) {
            Logger_1.default.error(`Error disconnecting from database: ${error.message}`);
        }
        else {
            Logger_1.default.error("Error disconnecting from database: Unknown error");
        }
    }
});
exports.disconnectDatabase = disconnectDatabase;
