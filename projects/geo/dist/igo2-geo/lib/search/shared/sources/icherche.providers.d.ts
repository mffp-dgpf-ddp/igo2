import { Injector } from '@angular/core';
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
export declare function ichercheSearchSourceFactory(http: HttpClient, languageService: LanguageService, config: ConfigService, formatter: IChercheSearchResultFormatter, injector: Injector): IChercheSearchSource;
/**
 * Function that returns a provider for the ICherche search source
 */
export declare function provideIChercheSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof ichercheSearchSourceFactory;
    multi: boolean;
    deps: (typeof Injector | typeof HttpClient | typeof ConfigService | typeof LanguageService | typeof IChercheSearchResultFormatter)[];
};
/**
 * IChercheReverse search source factory
 * @ignore
 */
export declare function ichercheReverseSearchSourceFactory(http: HttpClient, languageService: LanguageService, config: ConfigService, injector: Injector): IChercheReverseSearchSource;
/**
 * Function that returns a provider for the IChercheReverse search source
 */
export declare function provideIChercheReverseSearchSource(): {
    provide: typeof SearchSource;
    useFactory: typeof ichercheReverseSearchSourceFactory;
    multi: boolean;
    deps: (typeof Injector | typeof HttpClient | typeof ConfigService | typeof LanguageService)[];
};
