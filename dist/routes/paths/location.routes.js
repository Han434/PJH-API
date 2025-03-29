"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers/");
const services_1 = require("../../services/");
const repositories_1 = require("../../repositories");
const router = express_1.default.Router();
const locationService = new services_1.LocationService(new repositories_1.LocationRepository());
const locationController = new controllers_1.LocationController(locationService);
router.get("/", locationController.getLocations.bind(controllers_1.LocationController));
router.get("/:id", locationController.getLocation.bind(controllers_1.LocationController));
router.post("/", locationController.createLocation.bind(controllers_1.LocationController));
router.put("/:id", locationController.updateLocation.bind(controllers_1.LocationController));
router.delete("/:id", locationController.deleteLocation.bind(controllers_1.LocationController));
exports.default = router;
