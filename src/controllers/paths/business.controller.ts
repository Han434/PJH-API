import { Request, Response } from "express";
import { BusinessService } from "../../services/";
import logger from "../../config/Logger";
import { BusinessInterface } from "../../types";

export class BusinessController {
    private businessService: BusinessService;

    constructor(businessService: BusinessService) {
        this.businessService = businessService;
    }

    private handleError(
        res: Response,
        error: unknown,
        message: string,
        code = "INTERNAL_SERVER_ERROR",
        status = 500
    ): void {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        logger.error(`${message}: ${errorMessage}`);
        res.status(status).json({
            success: false,
            error: { code, message: `${message}: ${errorMessage}` },
        });
    }

    public getBusinesses = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const businesses: BusinessInterface[] =
                await this.businessService.getBusinesses();
            res.status(200).json({ success: true, data: businesses });
        } catch (error) {
            this.handleError(res, error, "Error fetching businesses");
        }
    };

    public getBusiness = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const business: BusinessInterface | null =
                await this.businessService.getBusiness(id);

            if (!business) {
                return this.handleError(
                    res,
                    null,
                    "User not found",
                    "USER_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({ success: true, data: business });
        } catch (error) {
            this.handleError(res, error, "Error fetching user by ID");
        }
    };

    public createBusiness = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { name, businessType, user } = req.body;
            if (!name || !businessType || !user) {
                return this.handleError(
                    res,
                    null,
                    "Missing required fields",
                    "BAD_REQUEST",
                    400
                );
            }

            const businessData: BusinessInterface = req.body;
            const newBusiness: BusinessInterface =
                await this.businessService.createBusiness(businessData);

            res.status(201).json({
                success: true,
                data: newBusiness,
                message: "Business successfully created",
            });
        } catch (error) {
            this.handleError(res, error, "Error creating business");
        }
    };

    public updateBusiness = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const id: string = req.params.id;
            const businessData: Partial<BusinessInterface> = req.body;

            if (Object.keys(businessData).length === 0) {
                return this.handleError(
                    res,
                    null,
                    "No update fields provided",
                    "BAD_REQUEST",
                    400
                );
            }

            const updatedBusiness: BusinessInterface | null =
                await this.businessService.updateBusiness(id, businessData);

            if (!updatedBusiness) {
                return this.handleError(
                    res,
                    null,
                    "Business not found or unable to update",
                    "BUSINESS_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({
                success: true,
                data: updatedBusiness,
                message: "User successfully updated",
            });
        } catch (error) {
            this.handleError(res, error, "Error updating user");
        }
    };

    public deleteBusiness = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const id: string = req.params.id;
            const isDeleted = await this.businessService.deleteBusiness(id);

            if (!isDeleted) {
                return this.handleError(
                    res,
                    null,
                    "Business not found or unable to delete",
                    "BUSINESS_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({
                success: true,
                message: "Business successfully deleted",
            });
        } catch (error) {
            this.handleError(res, error, "Error deleting business");
        }
    };
}
