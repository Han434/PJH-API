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
exports.UserService = void 0;
const Logger_1 = __importDefault(require("../../config/Logger"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    handleError(operation, error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        Logger_1.default.error(`Error ${operation}: ${errorMessage}`);
        throw new Error(`Error ${operation}: ${errorMessage}`);
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findAll();
            }
            catch (error) {
                this.handleError("fetching users", error);
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findById(id);
            }
            catch (error) {
                this.handleError("fetching user by ID", error);
            }
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.create(userData);
            }
            catch (error) {
                this.handleError("creating user", error);
            }
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.update(id, userData);
            }
            catch (error) {
                this.handleError("updating user", error);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.delete(id);
            }
            catch (error) {
                this.handleError("deleting user", error);
            }
        });
    }
}
exports.UserService = UserService;
