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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
// Load environment variables
dotenv_1.default.config();
if (!process.env.MONGO_URI) {
    console.error("❌ Missing required environment variables.");
    process.exit(1);
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL || "*" })); // CORS support
app.use((0, morgan_1.default)("dev")); // Request logging
app.use(express_1.default.json()); // Parse JSON requests
// Routes
app.use("/api", routes_1.default);
// Global Error Handling
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: err.message,
    });
});
// Connect to database before starting the server
(0, database_1.connectDatabase)()
    .then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("❌ Failed to connect to the database. Server not started.", err);
});
// Graceful shutdown handling
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🛑 Shutting down server...");
    yield (0, database_1.disconnectDatabase)();
    process.exit(0);
}));
