import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { ConfigService } from '../../config/config.service';
import { LanguageLoader } from './language.loader';
export declare function defaultLanguageLoader(http: HttpClient, config?: ConfigService): LanguageLoader;
export declare function provideLanguageLoader(loader?: any): {
    provide: typeof TranslateLoader;
    useFactory: any;
    deps: (typeof HttpClient)[];
};
export declare function provideDefaultLanguageLoader(loader?: any): {
    provide: typeof TranslateLoader;
    useFactory: any;
    deps: (typeof HttpClient | typeof ConfigService)[];
};
