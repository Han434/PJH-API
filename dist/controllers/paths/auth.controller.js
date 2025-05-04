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
exports.AuthController = void 0;
const Logger_1 = __importDefault(require("../../config/Logger"));
const JWT_SECRET = process.env.JWT_SECRET;
class AuthController {
    constructor(authService) {
        this.logIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, password } = req.body;
                if (!userName || !password) {
                    return this.handleError(res, null, "Missing required fields", "BAD_REQUEST", 400);
                }
                try {
                    const token = yield this.authService.logIn(userName, password);
                    res.status(200).json({ token });
                }
                catch (err) {
                    if (err instanceof Error) {
                        res.status(401).json({ message: err.message });
                    }
                    else {
                        res.status(401).json({
                            message: "An unknown error occurred",
                        });
                    }
                }
            }
            catch (error) {
                this.handleError(res, error, "Error fetching user by ID");
            }
        });
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    user: req,
                });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching user profile");
            }
        });
        this.authService = authService;
    }
    handleError(res, error, message, code = "INTERNAL_SERVER_ERROR", status = 500) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        Logger_1.default.error(`${message}: ${errorMessage}`);
        res.status(status).json({
            success: false,
            error: { code, message: `${message}: ${errorMessage}` },
        });
    }
}
exports.AuthController = AuthController;
