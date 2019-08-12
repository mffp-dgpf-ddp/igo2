import { DynamicComponentService } from '../../dynamic-component/shared/dynamic-component.service';
import { Widget } from './widget';
export declare class WidgetService {
    private dynamicComponentService;
    constructor(dynamicComponentService: DynamicComponentService);
    create(widgetCls: any): Widget;
}
