/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';
import { provideDefaultLanguageLoader } from './shared/language.provider';
import { IgoMissingTranslationHandler } from './shared/missing-translation.guard';
export class IgoLanguageModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoLanguageModule,
            providers: [provideDefaultLanguageLoader()]
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9sYW5ndWFnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFDTCxlQUFlLEVBQ2YseUJBQXlCLEVBQzFCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFjbEYsTUFBTSxPQUFPLGlCQUFpQjs7OztJQUM1QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLENBQUM7U0FDNUMsQ0FBQztJQUNKLENBQUM7OztZQWxCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLGVBQWUsQ0FBQyxPQUFPLENBQUM7d0JBQ3RCLHlCQUF5QixFQUFFOzRCQUN6QixPQUFPLEVBQUUseUJBQXlCOzRCQUNsQyxRQUFRLEVBQUUsNEJBQTRCO3lCQUN2QztxQkFDRixDQUFDO2lCQUNIO2dCQUNELFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7YUFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIFRyYW5zbGF0ZU1vZHVsZSxcclxuICBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyXHJcbn0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdExhbmd1YWdlTG9hZGVyIH0gZnJvbSAnLi9zaGFyZWQvbGFuZ3VhZ2UucHJvdmlkZXInO1xyXG5pbXBvcnQgeyBJZ29NaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIH0gZnJvbSAnLi9zaGFyZWQvbWlzc2luZy10cmFuc2xhdGlvbi5ndWFyZCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcclxuICAgICAgbWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcjoge1xyXG4gICAgICAgIHByb3ZpZGU6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsXHJcbiAgICAgICAgdXNlQ2xhc3M6IElnb01pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW10sXHJcbiAgZXhwb3J0czogW1RyYW5zbGF0ZU1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0xhbmd1YWdlTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRMYW5ndWFnZUxvYWRlcigpXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19