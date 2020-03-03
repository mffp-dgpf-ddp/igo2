import { ConfigService } from '../../config/config.service';
export declare class AnalyticsService {
    private config;
    private options;
    readonly paq: any;
    constructor(config: ConfigService);
    private initMatomo;
    setUser(user?: {
        id: number;
        sourceId?: string;
        firstName?: string;
        lastName?: string;
    }, profils?: string[]): void;
    trackSearch(term: string, nbResults: number): void;
    trackEvent(category: string, action: string, name: string): void;
}
