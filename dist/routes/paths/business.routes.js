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
const businessService = new services_1.BusinessService(new repositories_1.BusinessRepository());
const businessController = new controllers_1.BusinessController(businessService);
router.get("/", businessController.getBusinesses.bind(businessController));
router.get("/:id", businessController.getBusiness.bind(businessController));
router.post("/", businessController.createBusiness.bind(businessController));
router.put("/:id", businessController.updateBusiness.bind(businessController));
router.delete("/:id", businessController.deleteBusiness.bind(businessController));
exports.default = router;
