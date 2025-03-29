import { Request, Response } from "express";
import { LocationService } from "../../services/";
import logger from "../../config/Logger";
import { LocationInterface } from "../../interfaces/";

export class LocationController {
    private locationService: LocationService;

    constructor(LocationService: LocationService) {
        this.locationService = LocationService;
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

    public getLocations = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const locations: LocationInterface[] =
                await this.locationService.getLocations();
            res.status(200).json({ success: true, data: locations });
        } catch (error) {
            this.handleError(res, error, "Error fetching locations");
        }
    };

    public getLocation = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            const location: LocationInterface | null =
                await this.locationService.getLocation(id);

            if (!location) {
                return this.handleError(
                    res,
                    null,
                    "User not found",
                    "USER_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({ success: true, data: location });
        } catch (error) {
            this.handleError(res, error, "Error fetching user by ID");
        }
    };

    public createLocation = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { locationName, business, user } = req.body;
            if (!locationName || !business || !user) {
                return this.handleError(
                    res,
                    null,
                    "Missing required fields",
                    "BAD_REQUEST",
                    400
                );
            }

            const locationDate: LocationInterface = req.body;
            const newLocation: LocationInterface =
                await this.locationService.createLocation(locationDate);

            res.status(201).json({
                success: true,
                data: newLocation,
                message: "Location successfully created",
            });
        } catch (error) {
            this.handleError(res, error, "Error creating location");
        }
    };

    public updateLocation = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const id: string = req.params.id;
            const locationData: Partial<LocationInterface> = req.body;

            if (Object.keys(locationData).length === 0) {
                return this.handleError(
                    res,
                    null,
                    "No update fields provided",
                    "BAD_REQUEST",
                    400
                );
            }

            const updatedLocation: LocationInterface | null =
                await this.locationService.updateLocation(id, locationData);

            if (!updatedLocation) {
                return this.handleError(
                    res,
                    null,
                    "Location not found or unable to update",
                    "LOCATION_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({
                success: true,
                data: updatedLocation,
                message: "Location successfully updated",
            });
        } catch (error) {
            this.handleError(res, error, "Error updating user");
        }
    };

    public deleteLocation = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const id: string = req.params.id;
            const isDeleted = await this.locationService.deleteLocation(id);

            if (!isDeleted) {
                return this.handleError(
                    res,
                    null,
                    "Location not found or unable to delete",
                    "LOCATION_NOT_FOUND",
                    404
                );
            }

            res.status(200).json({
                success: true,
                message: "Location successfully deleted",
            });
        } catch (error) {
            this.handleError(res, error, "Error deleting Location");
        }
    };
}
