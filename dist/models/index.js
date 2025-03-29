"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = exports.BusinessModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_constant_1 = __importDefault(require("../utilities/database.constant"));
const user_model_1 = require("./paths/user.model");
const business_models_1 = require("./paths/business.models");
const location_models_1 = require("./paths/location.models");
exports.UserModel = mongoose_1.default.model(database_constant_1.default.USER.DB_NAME, user_model_1.UserSchema, database_constant_1.default.USER.COLLECTION_NAME);
exports.BusinessModel = mongoose_1.default.model(database_constant_1.default.BUSINESS.DB_NAME, business_models_1.BusinessSchema, database_constant_1.default.BUSINESS.COLLECTION_NAME);
exports.LocationModel = mongoose_1.default.model(database_constant_1.default.LOCATION.DB_NAME, location_models_1.LocationSchema, database_constant_1.default.LOCATION.COLLECTION_NAME);
