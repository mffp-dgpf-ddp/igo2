import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource } from './source';
import { ILayerSearchSource } from './ilayer';
/**
 * ILayer search source factory
 * @ignore
 */
export declare function ilayerSearchSourceFactory(http: HttpClient, languageService: LanguageService, config: ConfigService): ILayerSearchSource;
/**
 * Function that returns a provider for the ILayer search source
 */
export declare function provideILayerSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof ilayerSearchSourceFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService | typeof LanguageService)[];
};
