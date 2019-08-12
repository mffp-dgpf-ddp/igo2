import { TranslateService } from '@ngx-translate/core';
export declare class LanguageService {
    translate: TranslateService;
    constructor(translate: TranslateService);
    getLanguage(): string;
    setLanguage(language: string): void;
}
