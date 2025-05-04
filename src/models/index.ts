import mongoose from "mongoose";
import databaseConstants from "../utilities/database.constant";
import { UserSchema } from "./paths/user.model";
import { UserDocument } from "../types";
import { BusinessSchema } from "./paths/business.models";
import { BusinessDocument } from "../types";
import { LocationSchema } from "./paths/location.models";
import { LocationDocument } from "../types";

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

export const LocationModel = mongoose.model<LocationDocument>(
    databaseConstants.LOCATION.DB_NAME,
    LocationSchema,
    databaseConstants.LOCATION.COLLECTION_NAME
);
