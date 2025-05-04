import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BaseRepository, UserInterface } from "../../types";
import logger from "../../config/Logger";
import dotenv from "dotenv";
dotenv.config();

// Validate JWT secret at load time
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export class AuthService {
    private userRepository: BaseRepository<UserInterface>;

    constructor(userRepository: BaseRepository<UserInterface>) {
        this.userRepository = userRepository;
    }

    /**
     * Logs in a user by verifying credentials and returning a JWT.
     * @param userName - The user's username.
     * @param password - The user's password.
     * @returns JWT token string
     */
    public async logIn(userName: string, password: string): Promise<string> {
        try {
            const user = await this.userRepository.findByUserName(userName);
            if (!user) throw new Error("Invalid credentials");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user._id }, JWT_SECRET as string, {
                expiresIn: "1h",
            });

            return token;
        } catch (error) {
            this.handleError("logging in user", error);
        }
    }

    /**
     * Handles and logs errors with a consistent format.
     * @param operation - The operation name for context.
     * @param error - The error thrown.
     */
    private handleError(operation: string, error: unknown): never {
        const message = error instanceof Error ? error.message : String(error);
        logger.error(`Error during ${operation}: ${message}`);
        throw new Error(`Error during ${operation}: ${message}`);
    }
}
