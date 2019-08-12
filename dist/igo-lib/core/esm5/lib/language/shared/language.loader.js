/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
var LanguageLoader = /** @class */ (function () {
    function LanguageLoader(http, prefix, suffix, config) {
        if (suffix === void 0) { suffix = '.json'; }
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
        this.config = config;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    LanguageLoader.prototype.getTranslation = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        /** @type {?} */
        var translation = require("../locale/" + lang + ".json");
        /** @type {?} */
        var igoLocale$ = of(translation);
        if (this.config && !this.prefix) {
            this.prefix = this.config.getConfig('language.prefix');
        }
        if (!this.prefix) {
            return igoLocale$;
        }
        /** @type {?} */
        var appLocale$ = this.http.get("" + this.prefix + lang + this.suffix);
        /** @type {?} */
        var locale$ = combineLatest(igoLocale$, appLocale$);
        return locale$.pipe(map((/**
         * @param {?} translations
         * @return {?}
         */
        function (translations) {
            return Object.assign(translations[0], translations[1]);
        })));
    };
    return LanguageLoader;
}());
export { LanguageLoader };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UubG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9zaGFyZWQvbGFuZ3VhZ2UubG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckM7SUFDRSx3QkFDVSxJQUFnQixFQUNoQixNQUFlLEVBQ2YsTUFBd0IsRUFDeEIsTUFBc0I7UUFEdEIsdUJBQUEsRUFBQSxnQkFBd0I7UUFGeEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFDN0IsQ0FBQzs7Ozs7SUFFRyx1Q0FBYzs7OztJQUFyQixVQUFzQixJQUFZOztZQUMxQixXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWEsSUFBSSxVQUFPLENBQUM7O1lBQy9DLFVBQVUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBRWxDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxVQUFVLENBQUM7U0FDbkI7O1lBRUssVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQVEsQ0FBQzs7WUFFakUsT0FBTyxHQUFHLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO1FBRXJELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FDakIsR0FBRzs7OztRQUFDLFVBQUEsWUFBWTtZQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7Ozs7Ozs7SUE1QkcsOEJBQXdCOzs7OztJQUN4QixnQ0FBdUI7Ozs7O0lBQ3ZCLGdDQUFnQzs7Ozs7SUFDaEMsZ0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IG9mLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XHJcblxyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUoYXJnOiBzdHJpbmcpOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VMb2FkZXIgaW1wbGVtZW50cyBUcmFuc2xhdGVMb2FkZXIge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBwcmVmaXg/OiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIHN1ZmZpeDogc3RyaW5nID0gJy5qc29uJyxcclxuICAgIHByaXZhdGUgY29uZmlnPzogQ29uZmlnU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHJlcXVpcmUoYC4uL2xvY2FsZS8ke2xhbmd9Lmpzb25gKTtcclxuICAgIGNvbnN0IGlnb0xvY2FsZSQgPSBvZih0cmFuc2xhdGlvbik7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnICYmICF0aGlzLnByZWZpeCkge1xyXG4gICAgICB0aGlzLnByZWZpeCA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnbGFuZ3VhZ2UucHJlZml4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnByZWZpeCkge1xyXG4gICAgICByZXR1cm4gaWdvTG9jYWxlJDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcHBMb2NhbGUkID0gdGhpcy5odHRwLmdldChgJHt0aGlzLnByZWZpeH0ke2xhbmd9JHt0aGlzLnN1ZmZpeH1gKTtcclxuXHJcbiAgICBjb25zdCBsb2NhbGUkID0gY29tYmluZUxhdGVzdChpZ29Mb2NhbGUkLCBhcHBMb2NhbGUkKTtcclxuXHJcbiAgICByZXR1cm4gbG9jYWxlJC5waXBlKFxyXG4gICAgICBtYXAodHJhbnNsYXRpb25zID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0cmFuc2xhdGlvbnNbMF0sIHRyYW5zbGF0aW9uc1sxXSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=