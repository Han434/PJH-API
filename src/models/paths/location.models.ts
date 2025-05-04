import { Schema } from "mongoose";
import { LocationDocument } from "../../types/paths/location";

export const LocationSchema: Schema<LocationDocument> = new Schema({
    locationName: {
        type: String,
        required: true,
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
