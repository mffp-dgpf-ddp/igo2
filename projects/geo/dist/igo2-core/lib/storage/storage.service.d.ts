import { ConfigService } from '../config/config.service';
import { StorageScope, StorageOptions } from './storage.interface';
export declare class StorageService {
    private config;
    protected options: StorageOptions;
    constructor(config: ConfigService);
    /**
     * Use to get the data found in storage file
     */
    get(key: string, scope?: StorageScope): string | object | boolean | number;
    set(key: string, value: string | object | boolean | number, scope?: StorageScope): void;
    remove(key: string, scope?: StorageScope): void;
}
