import { UserInterface } from "../../types";
import { BaseRepository } from "../../types/paths/base.repository";
import { UserModel } from "../../models";
import logger from "../../config/Logger";

export class UserRepository implements BaseRepository<UserInterface> {
    private handleError(operation: string, error: unknown): never {
        logger.error(`Error ${operation}`, error);
        throw new Error(`Error ${operation}`);
    }

    public async findByUserName(
        userName: string
    ): Promise<UserInterface | null> {
        try {
            return await UserModel.findOne({ userName });
        } catch (error) {
            this.handleError("fetching user by User Name", error);
        }
    }

    public async findById(id: string): Promise<UserInterface | null> {
        try {
            return await UserModel.findById(id);
        } catch (error) {
            this.handleError("fetching user by ID", error);
        }
    }

    public async findAll(): Promise<UserInterface[]> {
        try {
            return await UserModel.find();
        } catch (error) {
            this.handleError("fetching all users", error);
        }
    }

    public async create(userData: UserInterface): Promise<UserInterface> {
        try {
            return await UserModel.create(userData);
        } catch (error) {
            this.handleError("creating user", error);
        }
    }

    public async update(
        id: string,
        userData: Partial<UserInterface>
    ): Promise<UserInterface | null> {
        try {
            return await UserModel.findByIdAndUpdate(id, userData, {
                new: true,
            });
        } catch (error) {
            this.handleError("updating user", error);
        }
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await UserModel.findByIdAndDelete(id);
            return result ? true : false;
        } catch (error) {
            this.handleError("deleting user", error);
        }
    }
}
