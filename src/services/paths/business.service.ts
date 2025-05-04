import { BaseRepository } from "../../types";
import { BusinessInterface } from "../../types";
import logger from "../../config/Logger";

export class BusinessService {
    private businessRepository: BaseRepository<BusinessInterface>;

    constructor(businessRepository: BaseRepository<BusinessInterface>) {
        this.businessRepository = businessRepository;
    }

    private handleError(operation: string, error: unknown): never {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        logger.error(`Error ${operation}: ${errorMessage}`);
        throw new Error(`Error ${operation}: ${errorMessage}`);
    }

    public async getBusinesses(): Promise<BusinessInterface[]> {
        try {
            return await this.businessRepository.findAll();
        } catch (error) {
            this.handleError("fetching businesss", error);
        }
    }

    public async getBusiness(id: string): Promise<BusinessInterface | null> {
        try {
            return await this.businessRepository.findById(id);
        } catch (error) {
            this.handleError("fetching business by ID", error);
        }
    }

    public async createBusiness(
        businessData: BusinessInterface
    ): Promise<BusinessInterface> {
        try {
            return await this.businessRepository.create(businessData);
        } catch (error) {
            this.handleError("creating business", error);
        }
    }

    public async updateBusiness(
        id: string,
        businessData: Partial<BusinessInterface>
    ): Promise<BusinessInterface | null> {
        try {
            return await this.businessRepository.update(id, businessData);
        } catch (error) {
            this.handleError("updating business", error);
        }
    }

    public async deleteBusiness(id: string): Promise<boolean> {
        try {
            return await this.businessRepository.delete(id);
        } catch (error) {
            this.handleError("deleting business", error);
        }
    }
}
