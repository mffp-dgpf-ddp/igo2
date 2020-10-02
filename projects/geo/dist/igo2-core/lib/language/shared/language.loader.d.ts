import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { ConfigService } from '../../config/config.service';
export declare class LanguageLoader implements TranslateLoader {
    private http;
    private prefix?;
    private suffix;
    private config?;
    constructor(http: HttpClient, prefix?: string, suffix?: string, config?: ConfigService);
    getTranslation(lang: string): any;
}
