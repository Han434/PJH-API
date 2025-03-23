import mongoose from "mongoose";
import databaseConstants from "../utilities/database.constant";
import { UserSchema } from "./paths/user.model";
import { UserDocument } from "../interfaces/";
import { BusinessSchema } from "./paths/business.models";
import { BusinessDocument } from "../interfaces/";

export const UserModel = mongoose.model<UserDocument>(
    databaseConstants.USER.DB_NAME,
    UserSchema,
    databaseConstants.USER.COLLECTION_NAME
);

export const BusinessModel = mongoose.model<BusinessDocument>(
    databaseConstants.BUSINESS.DB_NAME,
    BusinessSchema,
    databaseConstants.BUSINESS.COLLECTION_NAME
);
