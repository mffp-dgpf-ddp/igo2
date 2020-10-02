/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
var LanguageService = /** @class */ (function () {
    function LanguageService(translate) {
        this.translate = translate;
        this.language = this.translate.getBrowserLang();
        /** @type {?} */
        var lang = this.getLanguage();
        this.translate.setDefaultLang(lang);
    }
    /**
     * @return {?}
     */
    LanguageService.prototype.getLanguage = /**
     * @return {?}
     */
    function () {
        return this.language.match(/en|fr/) ? this.language : 'en';
    };
    /**
     * @param {?} language
     * @return {?}
     */
    LanguageService.prototype.setLanguage = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        this.language = language.match(/en|fr/) ? language : 'en';
        this.translate.use(this.language);
        this.translate.reloadLang(this.language);
    };
    LanguageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LanguageService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    /** @nocollapse */ LanguageService.ngInjectableDef = i0.defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(i0.inject(i1.TranslateService)); }, token: LanguageService, providedIn: "root" });
    return LanguageService;
}());
export { LanguageService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LanguageService.prototype.language;
    /** @type {?} */
    LanguageService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUV2RDtJQU1FLHlCQUFtQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUZ0QyxhQUFRLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7WUFHbkQsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLHFDQUFXOzs7SUFBbEI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFFTSxxQ0FBVzs7OztJQUFsQixVQUFtQixRQUFnQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Z0JBbkJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSlEsZ0JBQWdCOzs7MEJBRHpCO0NBdUJDLEFBcEJELElBb0JDO1NBakJZLGVBQWU7Ozs7OztJQUMxQixtQ0FBMkQ7O0lBRS9DLG9DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VTZXJ2aWNlIHtcclxuICBwcml2YXRlIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRCcm93c2VyTGFuZygpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XHJcbiAgICBjb25zdCBsYW5nID0gdGhpcy5nZXRMYW5ndWFnZSgpO1xyXG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcobGFuZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmxhbmd1YWdlLm1hdGNoKC9lbnxmci8pID8gdGhpcy5sYW5ndWFnZSA6ICdlbic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlLm1hdGNoKC9lbnxmci8pID8gbGFuZ3VhZ2UgOiAnZW4nO1xyXG4gICAgdGhpcy50cmFuc2xhdGUudXNlKHRoaXMubGFuZ3VhZ2UpO1xyXG4gICAgdGhpcy50cmFuc2xhdGUucmVsb2FkTGFuZyh0aGlzLmxhbmd1YWdlKTtcclxuICB9XHJcbn1cclxuIl19