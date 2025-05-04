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
exports.LocationController = void 0;
const Logger_1 = __importDefault(require("../../config/Logger"));
class LocationController {
    constructor(locationService) {
        this.getLocations = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield this.locationService.getLocations();
                res.status(200).json({ success: true, data: locations });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching locations");
            }
        });
        this.getLocation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const location = yield this.locationService.getLocation(id);
                if (!location) {
                    return this.handleError(res, null, "Location not found", "LOCATION_NOT_FOUND", 404);
                }
                res.status(200).json({ success: true, data: location });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching location by ID");
            }
        });
        this.createLocation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Creating location with data:", req.body);
            try {
                const { locationName, business, user } = req.body;
                if (!locationName || !business || !user) {
                    return this.handleError(res, null, "Missing required fields", "BAD_REQUEST", 400);
                }
                const locationData = req.body;
                const newLocation = yield this.locationService.createLocation(locationData);
                res.status(201).json({
                    success: true,
                    data: newLocation,
                    message: "Location successfully created",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error creating location");
            }
        });
        this.updateLocation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const locationData = req.body;
                if (Object.keys(locationData).length === 0) {
                    return this.handleError(res, null, "No update fields provided", "BAD_REQUEST", 400);
                }
                const updatedLocation = yield this.locationService.updateLocation(id, locationData);
                if (!updatedLocation) {
                    return this.handleError(res, null, "Location not found or unable to update", "LOCATION_NOT_FOUND", 404);
                }
                res.status(200).json({
                    success: true,
                    data: updatedLocation,
                    message: "Location successfully updated",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error updating location");
            }
        });
        this.deleteLocation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const isDeleted = yield this.locationService.deleteLocation(id);
                if (!isDeleted) {
                    return this.handleError(res, null, "Location not found or unable to delete", "LOCATION_NOT_FOUND", 404);
                }
                res.status(200).json({
                    success: true,
                    message: "Location successfully deleted",
                });
            }
            catch (error) {
                this.handleError(res, error, "Error deleting location");
            }
        });
        this.locationService = locationService;
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
exports.LocationController = LocationController;
