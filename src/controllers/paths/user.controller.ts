import { Request, Response } from "express";
import { UserService } from "../../services/";
import logger from "../../config/Logger";
import { UserInterface } from "../../interfaces/";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
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

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users: UserInterface[] = await this.userService.getUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            this.handleError(res, error, "Error fetching users");
        }
    };

    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const user: UserInterface | null =
                await this.userService.getUser(id);

            if (!user) {
                return this.handleError(
                    res,
                    null,
                    "User not found",
                    "USER_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({ success: true, data: user });
        } catch (error) {
            this.handleError(res, error, "Error fetching user by ID");
        }
    };

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, userName, password } = req.body;
            if (!name || !userName || !password) {
                return this.handleError(
                    res,
                    null,
                    "Missing required fields",
                    "BAD_REQUEST",
                    400
                );
            }

            const userData: UserInterface = req.body;
            const newUser: UserInterface =
                await this.userService.createUser(userData);

            res.status(201).json({
                success: true,
                data: newUser,
                message: "User successfully created",
            });
        } catch (error) {
            this.handleError(res, error, "Error creating user");
        }
    };

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const userData: Partial<UserInterface> = req.body;

            if (Object.keys(userData).length === 0) {
                return this.handleError(
                    res,
                    null,
                    "No update fields provided",
                    "BAD_REQUEST",
                    400
                );
            }

            const updatedUser: UserInterface | null =
                await this.userService.updateUser(id, userData);

            if (!updatedUser) {
                return this.handleError(
                    res,
                    null,
                    "User not found or unable to update",
                    "USER_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({
                success: true,
                data: updatedUser,
                message: "User successfully updated",
            });
        } catch (error) {
            this.handleError(res, error, "Error updating user");
        }
    };

    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const isDeleted = await this.userService.deleteUser(id);

            if (!isDeleted) {
                return this.handleError(
                    res,
                    null,
                    "User not found or unable to delete",
                    "USER_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({
                success: true,
                message: "User successfully deleted",
            });
        } catch (error) {
            this.handleError(res, error, "Error deleting user");
        }
    };
}
