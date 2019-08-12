/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
export class LanguageLoader {
    /**
     * @param {?} http
     * @param {?=} prefix
     * @param {?=} suffix
     * @param {?=} config
     */
    constructor(http, prefix, suffix = '.json', config) {
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
        this.config = config;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        /** @type {?} */
        const translation = require(`../locale/${lang}.json`);
        /** @type {?} */
        const igoLocale$ = of(translation);
        if (this.config && !this.prefix) {
            this.prefix = this.config.getConfig('language.prefix');
        }
        if (!this.prefix) {
            return igoLocale$;
        }
        /** @type {?} */
        const appLocale$ = this.http.get(`${this.prefix}${lang}${this.suffix}`);
        /** @type {?} */
        const locale$ = combineLatest(igoLocale$, appLocale$);
        return locale$.pipe(map((/**
         * @param {?} translations
         * @return {?}
         */
        translations => {
            return Object.assign(translations[0], translations[1]);
        })));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    LanguageLoader.prototype.http;
    /**
     * @type {?}
     * @private
     */
    LanguageLoader.prototype.prefix;
    /**
     * @type {?}
     * @private
     */
    LanguageLoader.prototype.suffix;
    /**
     * @type {?}
     * @private
     */
    LanguageLoader.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UubG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9zaGFyZWQvbGFuZ3VhZ2UubG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckMsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7SUFDekIsWUFDVSxJQUFnQixFQUNoQixNQUFlLEVBQ2YsU0FBaUIsT0FBTyxFQUN4QixNQUFzQjtRQUh0QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVM7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUM3QixDQUFDOzs7OztJQUVHLGNBQWMsQ0FBQyxJQUFZOztjQUMxQixXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUM7O2NBQy9DLFVBQVUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBRWxDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxVQUFVLENBQUM7U0FDbkI7O2NBRUssVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztjQUVqRSxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7UUFFckQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixHQUFHOzs7O1FBQUMsWUFBWSxDQUFDLEVBQUU7WUFDakIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGOzs7Ozs7SUE1QkcsOEJBQXdCOzs7OztJQUN4QixnQ0FBdUI7Ozs7O0lBQ3ZCLGdDQUFnQzs7Ozs7SUFDaEMsZ0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IG9mLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XHJcblxyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUoYXJnOiBzdHJpbmcpOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VMb2FkZXIgaW1wbGVtZW50cyBUcmFuc2xhdGVMb2FkZXIge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBwcmVmaXg/OiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIHN1ZmZpeDogc3RyaW5nID0gJy5qc29uJyxcclxuICAgIHByaXZhdGUgY29uZmlnPzogQ29uZmlnU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHJlcXVpcmUoYC4uL2xvY2FsZS8ke2xhbmd9Lmpzb25gKTtcclxuICAgIGNvbnN0IGlnb0xvY2FsZSQgPSBvZih0cmFuc2xhdGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnICYmICF0aGlzLnByZWZpeCkge1xyXG4gICAgICB0aGlzLnByZWZpeCA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnbGFuZ3VhZ2UucHJlZml4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnByZWZpeCkge1xyXG4gICAgICByZXR1cm4gaWdvTG9jYWxlJDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcHBMb2NhbGUkID0gdGhpcy5odHRwLmdldChgJHt0aGlzLnByZWZpeH0ke2xhbmd9JHt0aGlzLnN1ZmZpeH1gKTtcclxuXHJcbiAgICBjb25zdCBsb2NhbGUkID0gY29tYmluZUxhdGVzdChpZ29Mb2NhbGUkLCBhcHBMb2NhbGUkKTtcclxuXHJcbiAgICByZXR1cm4gbG9jYWxlJC5waXBlKFxyXG4gICAgICBtYXAodHJhbnNsYXRpb25zID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0cmFuc2xhdGlvbnNbMF0sIHRyYW5zbGF0aW9uc1sxXSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=