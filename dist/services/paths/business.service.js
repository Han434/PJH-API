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
exports.BusinessService = void 0;
const Logger_1 = __importDefault(require("../../config/Logger"));
class BusinessService {
    constructor(businessRepository) {
        this.businessRepository = businessRepository;
    }
    handleError(operation, error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        Logger_1.default.error(`Error ${operation}: ${errorMessage}`);
        throw new Error(`Error ${operation}: ${errorMessage}`);
    }
    getBusinesses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.businessRepository.findAll();
            }
            catch (error) {
                this.handleError("fetching businesss", error);
            }
        });
    }
    getBusiness(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.businessRepository.findById(id);
            }
            catch (error) {
                this.handleError("fetching business by ID", error);
            }
        });
    }
    createBusiness(businessData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.businessRepository.create(businessData);
            }
            catch (error) {
                this.handleError("creating business", error);
            }
        });
    }
    updateBusiness(id, businessData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.businessRepository.update(id, businessData);
            }
            catch (error) {
                this.handleError("updating business", error);
            }
        });
    }
    deleteBusiness(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.businessRepository.delete(id);
            }
            catch (error) {
                this.handleError("deleting business", error);
            }
        });
    }
}
exports.BusinessService = BusinessService;
