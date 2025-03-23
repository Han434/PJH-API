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
exports.UserRepository = void 0;
const models_1 = require("../../models");
const Logger_1 = __importDefault(require("../../config/Logger"));
class UserRepository {
    handleError(operation, error) {
        Logger_1.default.error(`Error ${operation}`, error);
        throw new Error(`Error ${operation}`);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.UserModel.findById(id);
            }
            catch (error) {
                this.handleError("fetching user by ID", error);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.UserModel.find();
            }
            catch (error) {
                this.handleError("fetching all users", error);
            }
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.UserModel.create(userData);
            }
            catch (error) {
                this.handleError("creating user", error);
            }
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.UserModel.findByIdAndUpdate(id, userData, {
                    new: true,
                });
            }
            catch (error) {
                this.handleError("updating user", error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.UserModel.findByIdAndDelete(id);
                return result ? true : false;
            }
            catch (error) {
                this.handleError("deleting user", error);
            }
        });
    }
}
exports.UserRepository = UserRepository;
