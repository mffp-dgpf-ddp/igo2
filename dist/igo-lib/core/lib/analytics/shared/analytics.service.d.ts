import { ConfigService } from '../../config/config.service';
export declare class AnalyticsService {
    private config;
    private options;
    constructor(config: ConfigService);
    private initMatomo;
}
