"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRepository = exports.UserRepository = void 0;
const user_repository_1 = require("./paths/user.repository");
Object.defineProperty(exports, "UserRepository", { enumerable: true, get: function () { return user_repository_1.UserRepository; } });
const business_repository_1 = require("./paths/business.repository");
Object.defineProperty(exports, "BusinessRepository", { enumerable: true, get: function () { return business_repository_1.BusinessRepository; } });
