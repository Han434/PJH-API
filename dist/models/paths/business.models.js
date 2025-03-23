"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BusinessSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    user: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
});
