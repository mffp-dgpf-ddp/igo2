import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource } from './source';
import { IChercheSearchSource, IChercheSearchResultFormatter, IChercheReverseSearchSource } from './icherche';
/**
 * ICherche search result formatter factory
 * @ignore
 */
export declare function defaultIChercheSearchResultFormatterFactory(languageService: LanguageService): IChercheSearchResultFormatter;
/**
 * Function that returns a provider for the ICherche search result formatter
 */
export declare function provideDefaultIChercheSearchResultFormatter(): {
    provide: typeof IChercheSearchResultFormatter;
    useFactory: typeof defaultIChercheSearchResultFormatterFactory;
    deps: (typeof LanguageService)[];
};
/**
 * ICherche search source factory
 * @ignore
 */
export declare function ichercheSearchSourceFactory(http: HttpClient, config: ConfigService, formatter: IChercheSearchResultFormatter): IChercheSearchSource;
/**
 * Function that returns a provider for the ICherche search source
 */
export declare function provideIChercheSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof ichercheSearchSourceFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService | typeof IChercheSearchResultFormatter)[];
};
/**
 * IChercheReverse search source factory
 * @ignore
 */
export declare function ichercheReverseSearchSourceFactory(http: HttpClient, config: ConfigService): IChercheReverseSearchSource;
/**
 * Function that returns a provider for the IChercheReverse search source
 */
export declare function provideIChercheReverseSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof ichercheReverseSearchSourceFactory;
    multi: boolean;
    deps: (typeof HttpClient | typeof ConfigService)[];
};
