"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./paths/user.routes"));
const business_routes_1 = __importDefault(require("./paths/business.routes"));
const location_routes_1 = __importDefault(require("./paths/location.routes"));
const auth_routes_1 = __importDefault(require("./paths/auth.routes"));
const router = express_1.default.Router();
router.use("/user", user_routes_1.default);
router.use("/business", business_routes_1.default);
router.use("/location", location_routes_1.default);
router.use("/auth", auth_routes_1.default);
exports.default = router;
