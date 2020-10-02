import { ConfigService } from '@igo2/core';
import { Projection } from './projection.interfaces';
/**
 * When injected, this service automatically registers and
 * projection defined in the application config. A custom projection
 * needs to be registered to be usable by OL.
 */
export declare class ProjectionService {
    private config;
    constructor(config: ConfigService);
    /**
     * Define a proj4 projection and register it in OL
     * @param projection Projection
     */
    registerProjection(projection: Projection): void;
}
