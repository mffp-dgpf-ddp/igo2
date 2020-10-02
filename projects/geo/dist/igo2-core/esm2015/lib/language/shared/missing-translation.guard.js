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
        if (params.key.substr(0, 4) === 'igo.') {
            throw new Error(`The Key "${params.key}" is missing in locale file.`);
        }
        else {
            return params.key;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2luZy10cmFuc2xhdGlvbi5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGFuZ3VhZ2Uvc2hhcmVkL21pc3NpbmctdHJhbnNsYXRpb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE1BQU0sT0FBTyw0QkFBNEI7Ozs7O0lBQ3ZDLE1BQU0sQ0FBQyxNQUF1QztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7O2tCQUNuQyxLQUFLLEdBQ1Q7cURBQzZDO1lBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFFRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLE1BQU0sQ0FBQyxHQUFHLDhCQUE4QixDQUFDLENBQUM7U0FDdkU7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNuQjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcixcclxuICBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zXHJcbn0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSWdvTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciBpbXBsZW1lbnRzIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIge1xyXG4gIGhhbmRsZShwYXJhbXM6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJQYXJhbXMpIHtcclxuICAgIGlmICghcGFyYW1zLnRyYW5zbGF0ZVNlcnZpY2UubGFuZ3MubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID1cclxuICAgICAgICAnVHJhbnNsYXRpb25zIGFyZSBub3QgeWV0IGxvYWRlZC4gXFxcclxuICAgICAgICAgQ2hlY2sgdGhhdCB0aGUgTGFuZ3VhZ2VTZXJ2aWNlIGlzIGluamVjdGVkLic7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhcmFtcy5rZXkuc3Vic3RyKDAsIDQpID09PSAnaWdvLicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgS2V5IFwiJHtwYXJhbXMua2V5fVwiIGlzIG1pc3NpbmcgaW4gbG9jYWxlIGZpbGUuYCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcGFyYW1zLmtleTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19