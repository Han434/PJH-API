export interface BaseService<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
