import { Request, Response } from "express";
import { AuthService } from "../../services/";
import logger from "../../config/Logger";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private handleError(
        res: Response,
        error: unknown,
        message: string,
        code = "INTERNAL_SERVER_ERROR",
        status = 500
    ): void {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        logger.error(`${message}: ${errorMessage}`);
        res.status(status).json({
            success: false,
            error: { code, message: `${message}: ${errorMessage}` },
        });
    }

    public logIn = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userName, password } = req.body;
            if (!userName || !password) {
                return this.handleError(
                    res,
                    null,
                    "Missing required fields",
                    "BAD_REQUEST",
                    400
                );
            }
            try {
                const token = await this.authService.logIn(userName, password);
                res.status(200).json({ token });
            } catch (err) {
                if (err instanceof Error) {
                    res.status(401).json({ message: err.message });
                } else {
                    res.status(401).json({
                        message: "An unknown error occurred",
                    });
                }
            }
        } catch (error) {
            this.handleError(res, error, "Error fetching user by ID");
        }
    };

    public getProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(200).json({
                user: req,
            });
        } catch (error) {
            this.handleError(res, error, "Error fetching user profile");
        }
    };
}
