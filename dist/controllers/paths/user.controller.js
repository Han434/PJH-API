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
exports.UserController = void 0;
const Logger_1 = __importDefault(require("../../config/Logger"));
class UserController {
    constructor(userService) {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getUsers();
                res.status(200).json({ success: true, data: users });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching users");
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.userService.getUser(id);
                if (!user) {
                    return this.handleError(res, null, "User not found", "USER_NOT_FOUND", 404);
                }
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching user by ID");
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                if (!name || !email) {
                    return this.handleError(res, null, "Missing required fields", "BAD_REQUEST", 400);
                }
                const userData = req.body;
                const newUser = yield this.userService.createUser(userData);
                res.status(201).json({
                    success: true,
                    data: newUser,
                    message: "User successfully created",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error creating user");
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userData = req.body;
                if (Object.keys(userData).length === 0) {
                    return this.handleError(res, null, "No update fields provided", "BAD_REQUEST", 400);
                }
                const updatedUser = yield this.userService.updateUser(id, userData);
                if (!updatedUser) {
                    return this.handleError(res, null, "User not found or unable to update", "USER_NOT_FOUND", 404);
                }
                res.status(200).json({
                    success: true,
                    data: updatedUser,
                    message: "User successfully updated",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error updating user");
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const isDeleted = yield this.userService.deleteUser(id);
                if (!isDeleted) {
                    return this.handleError(res, null, "User not found or unable to delete", "USER_NOT_FOUND", 404);
                }
                res.status(200).json({
                    success: true,
                    message: "User successfully deleted",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error deleting user");
            }
        });
        this.userService = userService;
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
exports.UserController = UserController;
