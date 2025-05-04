import { Document } from "mongoose";

export interface UserInterface {
    [x: string]: any;
    name: string;
    userName: string;
    password: string;
    status: string;
    businessID: string;
}

export interface UserDocument extends Document, UserInterface {}
