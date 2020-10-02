import { InjectionToken } from '@angular/core';
import { StyleListService } from './style-list.service';
import { StyleListOptions } from './style-list.interface';
export declare let STYLELIST_OPTIONS: InjectionToken<StyleListOptions>;
export declare function provideStyleListOptions(options: StyleListOptions): {
    provide: InjectionToken<StyleListOptions>;
    useValue: StyleListOptions;
};
export declare function styleListFactory(styleListService: StyleListService, options: StyleListOptions): () => true | Promise<{}>;
export declare function provideStyleListLoader(): {
    provide: InjectionToken<(() => void)[]>;
    useFactory: typeof styleListFactory;
    multi: boolean;
    deps: (typeof StyleListService | InjectionToken<StyleListOptions>)[];
};
