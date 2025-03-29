import { BaseRepository } from "../../interfaces/";
import { LocationInterface } from "../../interfaces/";
import logger from "../../config/Logger";

export class LocationService {
    private locationRepository: BaseRepository<LocationInterface>;

    constructor(locationRepository: BaseRepository<LocationInterface>) {
        this.locationRepository = locationRepository;
    }

    private handleError(operation: string, error: unknown): never {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        logger.error(`Error ${operation}: ${errorMessage}`);
        throw new Error(`Error ${operation}: ${errorMessage}`);
    }

    public async getLocations(): Promise<LocationInterface[]> {
        try {
            return await this.locationRepository.findAll();
        } catch (error) {
            this.handleError("fetching businesss", error);
        }
    }

    public async getLocation(id: string): Promise<LocationInterface | null> {
        try {
            return await this.locationRepository.findById(id);
        } catch (error) {
            this.handleError("fetching business by ID", error);
        }
    }

    public async createLocation(
        businessData: LocationInterface
    ): Promise<LocationInterface> {
        try {
            return await this.locationRepository.create(businessData);
        } catch (error) {
            this.handleError("creating business", error);
        }
    }

    public async updateLocation(
        id: string,
        businessData: Partial<LocationInterface>
    ): Promise<LocationInterface | null> {
        try {
            return await this.locationRepository.update(id, businessData);
        } catch (error) {
            this.handleError("updating business", error);
        }
    }

    public async deleteLocation(id: string): Promise<boolean> {
        try {
            return await this.locationRepository.delete(id);
        } catch (error) {
            this.handleError("deleting business", error);
        }
    }
}
