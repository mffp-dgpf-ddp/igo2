/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
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
        var locale$ = combineLatest([igoLocale$, appLocale$]);
        return locale$.pipe(map((/**
         * @param {?} translations
         * @return {?}
         */
        function (translations) {
            return ObjectUtils.mergeDeep(translations[0], translations[1]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UubG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9zaGFyZWQvbGFuZ3VhZ2UubG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU0xQztJQUNFLHdCQUNVLElBQWdCLEVBQ2hCLE1BQWUsRUFDZixNQUF3QixFQUN4QixNQUFzQjtRQUR0Qix1QkFBQSxFQUFBLGdCQUF3QjtRQUZ4QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVM7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUM3QixDQUFDOzs7OztJQUVHLHVDQUFjOzs7O0lBQXJCLFVBQXNCLElBQVk7O1lBQzFCLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBYSxJQUFJLFVBQU8sQ0FBQzs7WUFDL0MsVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFFbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLFVBQVUsQ0FBQztTQUNuQjs7WUFFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBUSxDQUFDOztZQUVqRSxPQUFPLEdBQUcsYUFBYSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FDakIsR0FBRzs7OztRQUFDLFVBQUEsWUFBWTtZQUNkLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7Ozs7Ozs7SUE1QkcsOEJBQXdCOzs7OztJQUN4QixnQ0FBdUI7Ozs7O0lBQ3ZCLGdDQUFnQzs7Ozs7SUFDaEMsZ0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IG9mLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShhcmc6IHN0cmluZyk6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZUxvYWRlciBpbXBsZW1lbnRzIFRyYW5zbGF0ZUxvYWRlciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIHByZWZpeD86IHN0cmluZyxcclxuICAgIHByaXZhdGUgc3VmZml4OiBzdHJpbmcgPSAnLmpzb24nLFxyXG4gICAgcHJpdmF0ZSBjb25maWc/OiBDb25maWdTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBwdWJsaWMgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogYW55IHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gcmVxdWlyZShgLi4vbG9jYWxlLyR7bGFuZ30uanNvbmApO1xyXG4gICAgY29uc3QgaWdvTG9jYWxlJCA9IG9mKHRyYW5zbGF0aW9uKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgIXRoaXMucHJlZml4KSB7XHJcbiAgICAgIHRoaXMucHJlZml4ID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdsYW5ndWFnZS5wcmVmaXgnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMucHJlZml4KSB7XHJcbiAgICAgIHJldHVybiBpZ29Mb2NhbGUkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFwcExvY2FsZSQgPSB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucHJlZml4fSR7bGFuZ30ke3RoaXMuc3VmZml4fWApO1xyXG5cclxuICAgIGNvbnN0IGxvY2FsZSQgPSBjb21iaW5lTGF0ZXN0KFtpZ29Mb2NhbGUkLCBhcHBMb2NhbGUkXSk7XHJcblxyXG4gICAgcmV0dXJuIGxvY2FsZSQucGlwZShcclxuICAgICAgbWFwKHRyYW5zbGF0aW9ucyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcCh0cmFuc2xhdGlvbnNbMF0sIHRyYW5zbGF0aW9uc1sxXSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=