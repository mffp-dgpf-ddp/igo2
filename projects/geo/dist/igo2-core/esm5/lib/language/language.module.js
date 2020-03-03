/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';
import { provideDefaultLanguageLoader } from './shared/language.provider';
import { IgoMissingTranslationHandler } from './shared/missing-translation.guard';
var IgoLanguageModule = /** @class */ (function () {
    function IgoLanguageModule() {
    }
    /**
     * @return {?}
     */
    IgoLanguageModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoLanguageModule,
            providers: [provideDefaultLanguageLoader()]
        };
    };
    IgoLanguageModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        TranslateModule.forRoot({
                            missingTranslationHandler: {
                                provide: MissingTranslationHandler,
                                useClass: IgoMissingTranslationHandler
                            }
                        })
                    ],
                    declarations: [],
                    exports: [TranslateModule]
                },] }
    ];
    return IgoLanguageModule;
}());
export { IgoLanguageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9sYW5ndWFnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFDTCxlQUFlLEVBQ2YseUJBQXlCLEVBQzFCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbEY7SUFBQTtJQW1CQSxDQUFDOzs7O0lBTlEseUJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztTQUM1QyxDQUFDO0lBQ0osQ0FBQzs7Z0JBbEJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZUFBZSxDQUFDLE9BQU8sQ0FBQzs0QkFDdEIseUJBQXlCLEVBQUU7Z0NBQ3pCLE9BQU8sRUFBRSx5QkFBeUI7Z0NBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7NkJBQ3ZDO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDM0I7O0lBUUQsd0JBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQVBZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgVHJhbnNsYXRlTW9kdWxlLFxyXG4gIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJcclxufSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0TGFuZ3VhZ2VMb2FkZXIgfSBmcm9tICcuL3NoYXJlZC9sYW5ndWFnZS5wcm92aWRlcic7XHJcbmltcG9ydCB7IElnb01pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgfSBmcm9tICcuL3NoYXJlZC9taXNzaW5nLXRyYW5zbGF0aW9uLmd1YXJkJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBtaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyOiB7XHJcbiAgICAgICAgcHJvdmlkZTogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcixcclxuICAgICAgICB1c2VDbGFzczogSWdvTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbVHJhbnNsYXRlTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvTGFuZ3VhZ2VNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdExhbmd1YWdlTG9hZGVyKCldXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=