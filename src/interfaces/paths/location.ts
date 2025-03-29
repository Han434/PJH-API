import { Document, Types } from "mongoose";

export interface LocationInterface {
    locationName: string;
    business: Types.ObjectId;
    user: Types.ObjectId[];
}

export interface LocationDocument extends Document, LocationInterface {}
