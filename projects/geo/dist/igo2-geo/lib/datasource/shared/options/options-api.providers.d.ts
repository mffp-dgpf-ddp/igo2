import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { OptionsService } from './options.service';
import { OptionsApiService } from './options-api.service';
export declare function optionsApiFactory(http: HttpClient, configService: ConfigService): OptionsApiService;
export declare function provideOptionsApi(): {
    provide: typeof OptionsService;
    useFactory: typeof optionsApiFactory;
    deps: (typeof HttpClient | typeof ConfigService)[];
};
