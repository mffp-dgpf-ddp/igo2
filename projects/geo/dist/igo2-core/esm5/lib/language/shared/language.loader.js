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
        var locale$ = combineLatest(igoLocale$, appLocale$);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UubG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9zaGFyZWQvbGFuZ3VhZ2UubG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU0xQztJQUNFLHdCQUNVLElBQWdCLEVBQ2hCLE1BQWUsRUFDZixNQUF3QixFQUN4QixNQUFzQjtRQUR0Qix1QkFBQSxFQUFBLGdCQUF3QjtRQUZ4QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVM7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUM3QixDQUFDOzs7OztJQUVHLHVDQUFjOzs7O0lBQXJCLFVBQXNCLElBQVk7O1lBQzFCLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBYSxJQUFJLFVBQU8sQ0FBQzs7WUFDL0MsVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFFbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLFVBQVUsQ0FBQztTQUNuQjs7WUFFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBUSxDQUFDOztZQUVqRSxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7UUFFckQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixHQUFHOzs7O1FBQUMsVUFBQSxZQUFZO1lBQ2QsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQzs7Ozs7OztJQTVCRyw4QkFBd0I7Ozs7O0lBQ3hCLGdDQUF1Qjs7Ozs7SUFDdkIsZ0NBQWdDOzs7OztJQUNoQyxnQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgb2YsIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgVHJhbnNsYXRlTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKGFyZzogc3RyaW5nKTogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIExhbmd1YWdlTG9hZGVyIGltcGxlbWVudHMgVHJhbnNsYXRlTG9hZGVyIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgcHJlZml4Pzogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBzdWZmaXg6IHN0cmluZyA9ICcuanNvbicsXHJcbiAgICBwcml2YXRlIGNvbmZpZz86IENvbmZpZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIHB1YmxpYyBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSByZXF1aXJlKGAuLi9sb2NhbGUvJHtsYW5nfS5qc29uYCk7XHJcbiAgICBjb25zdCBpZ29Mb2NhbGUkID0gb2YodHJhbnNsYXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiAhdGhpcy5wcmVmaXgpIHtcclxuICAgICAgdGhpcy5wcmVmaXggPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2xhbmd1YWdlLnByZWZpeCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wcmVmaXgpIHtcclxuICAgICAgcmV0dXJuIGlnb0xvY2FsZSQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXBwTG9jYWxlJCA9IHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5wcmVmaXh9JHtsYW5nfSR7dGhpcy5zdWZmaXh9YCk7XHJcblxyXG4gICAgY29uc3QgbG9jYWxlJCA9IGNvbWJpbmVMYXRlc3QoaWdvTG9jYWxlJCwgYXBwTG9jYWxlJCk7XHJcblxyXG4gICAgcmV0dXJuIGxvY2FsZSQucGlwZShcclxuICAgICAgbWFwKHRyYW5zbGF0aW9ucyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlRGVlcCh0cmFuc2xhdGlvbnNbMF0sIHRyYW5zbGF0aW9uc1sxXSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=