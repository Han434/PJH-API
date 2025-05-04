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
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logger_1 = __importDefault(require("../../config/Logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Validate JWT secret at load time
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Logs in a user by verifying credentials and returning a JWT.
     * @param userName - The user's username.
     * @param password - The user's password.
     * @returns JWT token string
     */
    logIn(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByUserName(userName);
                if (!user)
                    throw new Error("Invalid credentials");
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch)
                    throw new Error("Invalid credentials");
                const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, {
                    expiresIn: "1h",
                });
                return token;
            }
            catch (error) {
                this.handleError("logging in user", error);
            }
        });
    }
    /**
     * Handles and logs errors with a consistent format.
     * @param operation - The operation name for context.
     * @param error - The error thrown.
     */
    handleError(operation, error) {
        const message = error instanceof Error ? error.message : String(error);
        Logger_1.default.error(`Error during ${operation}: ${message}`);
        throw new Error(`Error during ${operation}: ${message}`);
    }
}
exports.AuthService = AuthService;
