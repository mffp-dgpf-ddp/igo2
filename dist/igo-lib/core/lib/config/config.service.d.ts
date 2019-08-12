import { Injector } from '@angular/core';
import { ConfigOptions } from './config.interface';
export declare class ConfigService {
    private injector;
    private config;
    constructor(injector: Injector);
    /**
     * Use to get the data found in config file
     */
    getConfig(key: string): any;
    /**
     * This method loads "[path]" to get all config's variables
     */
    load(options: ConfigOptions): true | Promise<{}>;
}
