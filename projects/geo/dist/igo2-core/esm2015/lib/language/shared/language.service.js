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
        this.language = this.translate.getBrowserLang();
        /** @type {?} */
        const lang = this.getLanguage();
        this.translate.setDefaultLang(lang);
    }
    /**
     * @return {?}
     */
    getLanguage() {
        return this.language.match(/en|fr/) ? this.language : 'en';
    }
    /**
     * @param {?} language
     * @return {?}
     */
    setLanguage(language) {
        this.language = language.match(/en|fr/) ? language : 'en';
        this.translate.use(this.language);
        this.translate.reloadLang(this.language);
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
    /**
     * @type {?}
     * @private
     */
    LanguageService.prototype.language;
    /** @type {?} */
    LanguageService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUt2RCxNQUFNLE9BQU8sZUFBZTs7OztJQUcxQixZQUFtQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUZ0QyxhQUFRLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Y0FHbkQsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdELENBQUM7Ozs7O0lBRU0sV0FBVyxDQUFDLFFBQWdCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7WUFuQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBSlEsZ0JBQWdCOzs7Ozs7OztJQU12QixtQ0FBMkQ7O0lBRS9DLG9DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VTZXJ2aWNlIHtcclxuICBwcml2YXRlIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRCcm93c2VyTGFuZygpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XHJcbiAgICBjb25zdCBsYW5nID0gdGhpcy5nZXRMYW5ndWFnZSgpO1xyXG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcobGFuZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmxhbmd1YWdlLm1hdGNoKC9lbnxmci8pID8gdGhpcy5sYW5ndWFnZSA6ICdlbic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlLm1hdGNoKC9lbnxmci8pID8gbGFuZ3VhZ2UgOiAnZW4nO1xyXG4gICAgdGhpcy50cmFuc2xhdGUudXNlKHRoaXMubGFuZ3VhZ2UpO1xyXG4gICAgdGhpcy50cmFuc2xhdGUucmVsb2FkTGFuZyh0aGlzLmxhbmd1YWdlKTtcclxuICB9XHJcbn1cclxuIl19