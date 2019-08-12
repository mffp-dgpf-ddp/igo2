/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class LanguageService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        /** @type {?} */
        const lang = this.getLanguage();
        this.translate.setDefaultLang(lang);
    }
    /**
     * @return {?}
     */
    getLanguage() {
        /** @type {?} */
        const browserLang = this.translate.getBrowserLang();
        return browserLang.match(/en|fr/) ? browserLang : 'en';
    }
    /**
     * @param {?} language
     * @return {?}
     */
    setLanguage(language) {
        this.translate.use(language);
        this.translate.reloadLang(language);
    }
}
LanguageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LanguageService.ctorParameters = () => [
    { type: TranslateService }
];
/** @nocollapse */ LanguageService.ngInjectableDef = i0.defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(i0.inject(i1.TranslateService)); }, token: LanguageService, providedIn: "root" });
if (false) {
    /** @type {?} */
    LanguageService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUt2RCxNQUFNLE9BQU8sZUFBZTs7OztJQUMxQixZQUFtQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjs7Y0FDdEMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLFdBQVc7O2NBQ1YsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFO1FBQ25ELE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekQsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsUUFBZ0I7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBakJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpRLGdCQUFnQjs7Ozs7SUFNWCxvQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExhbmd1YWdlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgY29uc3QgbGFuZyA9IHRoaXMuZ2V0TGFuZ3VhZ2UoKTtcclxuICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKGxhbmcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExhbmd1YWdlKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBicm93c2VyTGFuZyA9IHRoaXMudHJhbnNsYXRlLmdldEJyb3dzZXJMYW5nKCk7XHJcbiAgICByZXR1cm4gYnJvd3NlckxhbmcubWF0Y2goL2VufGZyLykgPyBicm93c2VyTGFuZyA6ICdlbic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy50cmFuc2xhdGUudXNlKGxhbmd1YWdlKTtcclxuICAgIHRoaXMudHJhbnNsYXRlLnJlbG9hZExhbmcobGFuZ3VhZ2UpO1xyXG4gIH1cclxufVxyXG4iXX0=