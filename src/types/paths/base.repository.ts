export interface BaseRepository<T> {
    findByUserName(userName: string): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
