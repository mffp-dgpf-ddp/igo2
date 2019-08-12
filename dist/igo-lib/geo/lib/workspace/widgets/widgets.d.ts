import { InjectionToken } from '@angular/core';
import { Widget, WidgetService } from '@igo2/common';
export declare const OgcFilterWidget: InjectionToken<Widget>;
export declare function ogcFilterWidgetFactory(widgetService: WidgetService): Widget;
export declare function provideOgcFilterWidget(): {
    provide: InjectionToken<Widget>;
    useFactory: typeof ogcFilterWidgetFactory;
    deps: (typeof WidgetService)[];
};
