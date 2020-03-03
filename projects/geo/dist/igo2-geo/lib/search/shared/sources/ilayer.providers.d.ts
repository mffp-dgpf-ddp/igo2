import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource } from './source';
import { ILayerSearchSource, ILayerSearchResultFormatter } from './ilayer';
/**
 * ILayer search result formatter factory
 * @ignore
 */
export declare function ilayerSearchResultFormatterFactory(languageService: LanguageService): ILayerSearchResultFormatter;
/**
 * Function that returns a provider for the ILayer search result formatter
 */
export declare function provideILayerSearchResultFormatter(): {
    provide: typeof ILayerSearchResultFormatter;
    useFactory: typeof ilayerSearchResultFormatterFactory;
    deps: (typeof LanguageService)[];
};
/**
 * ILayer search source factory
 * @ignore
 */
export declare function ilayerSearchSourceFactory(http: HttpClient, languageService: LanguageService, config: ConfigService, formatter: ILayerSearchResultFormatter): ILayerSearchSource;
/**
 * Function that returns a provider for the ILayer search source
 */
export declare function provideILayerSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof ilayerSearchSourceFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService | typeof LanguageService | typeof ILayerSearchResultFormatter)[];
};
