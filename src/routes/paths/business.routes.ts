import express from "express";
import { BusinessController } from "../../controllers/";
import { BusinessService } from "../../services/";
import { BusinessRepository } from "../../repositories";

const router = express.Router();
const businessService = new BusinessService(new BusinessRepository());
const businessController = new BusinessController(businessService);

router.get("/", businessController.getBusinesses.bind(businessController));
router.get("/:id", businessController.getBusiness.bind(businessController));
router.post("/", businessController.createBusiness.bind(businessController));
router.put("/:id", businessController.updateBusiness.bind(businessController));
router.delete("/:id", businessController.deleteBusiness.bind(businessController));

export default router;