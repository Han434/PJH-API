"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LocationSchema = new mongoose_1.Schema({
    locationName: {
        type: String,
        required: true,
    },
    business: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Business",
        required: true,
    },
    user: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
});
