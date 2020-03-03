import { TranslateService } from '@ngx-translate/core';
export declare class LanguageService {
    translate: TranslateService;
    private language;
    constructor(translate: TranslateService);
    getLanguage(): string;
    setLanguage(language: string): void;
}
