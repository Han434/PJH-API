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
exports.BusinessController = void 0;
const Logger_1 = __importDefault(require("../../config/Logger"));
class BusinessController {
    constructor(businessService) {
        this.getBusinesses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const businesses = yield this.businessService.getBusinesses();
                res.status(200).json({ success: true, data: businesses });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching businesses");
            }
        });
        this.getBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const business = yield this.businessService.getBusiness(id);
                if (!business) {
                    return this.handleError(res, null, "User not found", "USER_NOT_FOUND", 404);
                }
                res.status(200).json({ success: true, data: business });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching user by ID");
            }
        });
        this.createBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, businessType, user } = req.body;
                if (!name || !businessType || !user) {
                    return this.handleError(res, null, "Missing required fields", "BAD_REQUEST", 400);
                }
                const businessData = req.body;
                const newBusiness = yield this.businessService.createBusiness(businessData);
                res.status(201).json({
                    success: true,
                    data: newBusiness,
                    message: "Business successfully created",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error creating business");
            }
        });
        this.updateBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const businessData = req.body;
                if (Object.keys(businessData).length === 0) {
                    return this.handleError(res, null, "No update fields provided", "BAD_REQUEST", 400);
                }
                const updatedBusiness = yield this.businessService.updateBusiness(id, businessData);
                if (!updatedBusiness) {
                    return this.handleError(res, null, "Business not found or unable to update", "BUSINESS_NOT_FOUND", 404);
                }
                res.status(200).json({
                    success: true,
                    data: updatedBusiness,
                    message: "User successfully updated",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error updating user");
            }
        });
        this.deleteBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const isDeleted = yield this.businessService.deleteBusiness(id);
                if (!isDeleted) {
                    return this.handleError(res, null, "Business not found or unable to delete", "BUSINESS_NOT_FOUND", 404);
                }
                res.status(200).json({
                    success: true,
                    message: "Business successfully deleted",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error deleting business");
            }
        });
        this.businessService = businessService;
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
exports.BusinessController = BusinessController;
