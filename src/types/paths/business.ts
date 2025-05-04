import { Document, Types } from "mongoose";

export interface BusinessInterface {
    name: string;
    businessType: string;
    user: Types.ObjectId[];
}

export interface BusinessDocument extends Document, BusinessInterface {}
