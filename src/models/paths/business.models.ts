import { Schema } from "mongoose";
import { BusinessDocument } from "../../interfaces/";

export const BusinessSchema: Schema<BusinessDocument> = new Schema({
    name: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    user: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
});
