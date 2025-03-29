import express from "express";
import { LocationController } from "../../controllers/";
import { LocationService } from "../../services/";
import { LocationRepository } from "../../repositories";

const router = express.Router();
const locationService = new LocationService(new LocationRepository());
const locationController = new LocationController(locationService);

router.get("/", locationController.getLocations.bind(LocationController));
router.get("/:id", locationController.getLocation.bind(LocationController));
router.post("/", locationController.createLocation.bind(LocationController));
router.put("/:id", locationController.updateLocation.bind(LocationController));
router.delete(
    "/:id",
    locationController.deleteLocation.bind(LocationController)
);

export default router;