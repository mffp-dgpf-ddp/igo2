import { RouteService, ConfigService, MessageService } from '@igo2/core';
import { IgoMap, RoutingFormService } from '@igo2/geo';
import { ContextService } from '../../context-manager/shared/context.service';
export declare class ShareMapService {
    private config;
    private contextService;
    private messageService;
    private routingFormService;
    private route;
    private apiUrl;
    constructor(config: ConfigService, contextService: ContextService, messageService: MessageService, routingFormService: RoutingFormService, route: RouteService);
    getUrl(map: IgoMap, formValues: any, publicShareOption: any): string;
    getUrlWithApi(map: IgoMap, formValues: any): string;
    getUrlWithoutApi(map: IgoMap, publicShareOption: any): string;
}
