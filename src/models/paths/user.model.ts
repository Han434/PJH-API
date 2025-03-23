import mongoose, { Schema } from "mongoose";
import { UserDocument } from "../../interfaces/";

export const UserSchema: Schema<UserDocument> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
