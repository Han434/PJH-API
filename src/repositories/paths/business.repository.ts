import { BusinessInterface } from "../../interfaces";
import { BaseRepository } from "../../interfaces";
import { BusinessModel } from "../../models";
import logger from "../../config/Logger";

export class BusinessRepository implements BaseRepository<BusinessInterface> {
    private handleError(operation: string, error: unknown): never {
        logger.error(`Error ${operation}`, error);
        throw new Error(`Error ${operation}`);
    }
    public async findById(id: string): Promise<BusinessInterface | null> {
        try {
            return await BusinessModel.findById(id);
        } catch (error) {
            this.handleError("fetching business by ID", error);
        }
    }

    public async findAll(): Promise<BusinessInterface[]> {
        try {
            return await BusinessModel.find();
        } catch (error) {
            this.handleError("fetching all businesss", error);
        }
    }

    public async create(
        businessData: BusinessInterface
    ): Promise<BusinessInterface> {
        try {
            return await BusinessModel.create(businessData);
        } catch (error) {
            this.handleError("creating business", error);
        }
    }

    public async update(
        id: string,
        businessData: Partial<BusinessInterface>
    ): Promise<BusinessInterface | null> {
        try {
            return await BusinessModel.findByIdAndUpdate(id, businessData, {
                new: true,
            });
        } catch (error) {
            this.handleError("updating business", error);
        }
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await BusinessModel.findByIdAndDelete(id);
            return result ? true : false;
        } catch (error) {
            this.handleError("deleting business", error);
        }
    }
}
