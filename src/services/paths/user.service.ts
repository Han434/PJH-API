import { BaseRepository } from "../../interfaces/";
import { UserInterface } from "../../interfaces/";
import logger from "../../config/Logger";

export class UserService {
    private userRepository: BaseRepository<UserInterface>;

    constructor(userRepository: BaseRepository<UserInterface>) {
        this.userRepository = userRepository;
    }

    private handleError(operation: string, error: unknown): never {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        logger.error(`Error ${operation}: ${errorMessage}`);
        throw new Error(`Error ${operation}: ${errorMessage}`);
    }

    public async getUsers(): Promise<UserInterface[]> {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            this.handleError("fetching users", error);
        }
    }

    public async getUser(id: string): Promise<UserInterface | null> {
        try {
            return await this.userRepository.findById(id);
        } catch (error) {
            this.handleError("fetching user by ID", error);
        }
    }

    public async createUser(userData: UserInterface): Promise<UserInterface> {
        try {
            return await this.userRepository.create(userData);
        } catch (error) {
            this.handleError("creating user", error);
        }
    }

    public async updateUser(
        id: string,
        userData: Partial<UserInterface>
    ): Promise<UserInterface | null> {
        try {
            return await this.userRepository.update(id, userData);
        } catch (error) {
            this.handleError("updating user", error);
        }
    }

    public async deleteUser(id: string): Promise<boolean> {
        try {
            return await this.userRepository.delete(id);
        } catch (error) {
            this.handleError("deleting user", error);
        }
    }
}
