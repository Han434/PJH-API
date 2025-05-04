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
exports.LocationRepository = void 0;
const models_1 = require("../../models");
const Logger_1 = __importDefault(require("../../config/Logger"));
class LocationRepository {
    findByUserName(userName) {
        throw new Error("Method not implemented.");
    }
    handleError(operation, error) {
        Logger_1.default.error(`Error ${operation}`, error);
        throw new Error(`Error ${operation}`);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.LocationModel.findById(id);
            }
            catch (error) {
                this.handleError("fetching location by ID", error);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.LocationModel.find();
            }
            catch (error) {
                this.handleError("fetching all locations", error);
            }
        });
    }
    create(locationData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.LocationModel.create(locationData);
            }
            catch (error) {
                this.handleError("creating location", error);
            }
        });
    }
    update(id, locationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.LocationModel.findByIdAndUpdate(id, locationDate, {
                    new: true,
                });
            }
            catch (error) {
                this.handleError("updating location", error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.LocationModel.findByIdAndDelete(id);
                return result ? true : false;
            }
            catch (error) {
                this.handleError("deleting location", error);
            }
        });
    }
}
exports.LocationRepository = LocationRepository;
