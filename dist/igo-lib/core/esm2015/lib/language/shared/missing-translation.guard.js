/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class IgoMissingTranslationHandler {
    /**
     * @param {?} params
     * @return {?}
     */
    handle(params) {
        if (!params.translateService.langs.length) {
            /** @type {?} */
            const error = 'Translations are not yet loaded. \
         Check that the LanguageService is injected.';
            throw new Error(error);
        }
        throw new Error(`The Key "${params.key}" is missing in locale file.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2luZy10cmFuc2xhdGlvbi5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGFuZ3VhZ2Uvc2hhcmVkL21pc3NpbmctdHJhbnNsYXRpb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE1BQU0sT0FBTyw0QkFBNEI7Ozs7O0lBQ3ZDLE1BQU0sQ0FBQyxNQUF1QztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7O2tCQUNuQyxLQUFLLEdBQ1Q7cURBQzZDO1lBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksTUFBTSxDQUFDLEdBQUcsOEJBQThCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIsXHJcbiAgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtc1xyXG59IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIElnb01pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIHtcclxuICBoYW5kbGUocGFyYW1zOiBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zKSB7XHJcbiAgICBpZiAoIXBhcmFtcy50cmFuc2xhdGVTZXJ2aWNlLmxhbmdzLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBlcnJvciA9XHJcbiAgICAgICAgJ1RyYW5zbGF0aW9ucyBhcmUgbm90IHlldCBsb2FkZWQuIFxcXHJcbiAgICAgICAgIENoZWNrIHRoYXQgdGhlIExhbmd1YWdlU2VydmljZSBpcyBpbmplY3RlZC4nO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgS2V5IFwiJHtwYXJhbXMua2V5fVwiIGlzIG1pc3NpbmcgaW4gbG9jYWxlIGZpbGUuYCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==