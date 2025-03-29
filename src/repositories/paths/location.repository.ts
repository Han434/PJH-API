import { LocationInterface } from "../../interfaces/";
import { BaseRepository } from "../../interfaces";
import { LocationModel } from "../../models";
import logger from "../../config/Logger";

export class LocationRepository implements BaseRepository<LocationInterface> {
    private handleError(operation: string, error: unknown): never {
        logger.error(`Error ${operation}`, error);
        throw new Error(`Error ${operation}`);
    }
    public async findById(id: string): Promise<LocationInterface | null> {
        try {
            return await LocationModel.findById(id);
        } catch (error) {
            this.handleError("fetching location by ID", error);
        }
    }

    public async findAll(): Promise<LocationInterface[]> {
        try {
            return await LocationModel.find();
        } catch (error) {
            this.handleError("fetching all locations", error);
        }
    }

    public async create(
        locationDate: LocationInterface
    ): Promise<LocationInterface> {
        try {
            return await LocationModel.create(locationDate);
        } catch (error) {
            this.handleError("creating location", error);
        }
    }

    public async update(
        id: string,
        locationDate: Partial<LocationInterface>
    ): Promise<LocationInterface | null> {
        try {
            return await LocationModel.findByIdAndUpdate(id, locationDate, {
                new: true,
            });
        } catch (error) {
            this.handleError("updating location", error);
        }
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await LocationModel.findByIdAndDelete(id);
            return result ? true : false;
        } catch (error) {
            this.handleError("deleting location", error);
        }
    }
}
