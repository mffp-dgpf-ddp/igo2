/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IgoMissingTranslationHandler = /** @class */ (function () {
    function IgoMissingTranslationHandler() {
    }
    /**
     * @param {?} params
     * @return {?}
     */
    IgoMissingTranslationHandler.prototype.handle = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (!params.translateService.langs.length) {
            /** @type {?} */
            var error = 'Translations are not yet loaded. \
         Check that the LanguageService is injected.';
            throw new Error(error);
        }
        throw new Error("The Key \"" + params.key + "\" is missing in locale file.");
    };
    return IgoMissingTranslationHandler;
}());
export { IgoMissingTranslationHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2luZy10cmFuc2xhdGlvbi5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGFuZ3VhZ2Uvc2hhcmVkL21pc3NpbmctdHJhbnNsYXRpb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBO0lBQUE7SUFVQSxDQUFDOzs7OztJQVRDLDZDQUFNOzs7O0lBQU4sVUFBTyxNQUF1QztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7O2dCQUNuQyxLQUFLLEdBQ1Q7cURBQzZDO1lBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGVBQVksTUFBTSxDQUFDLEdBQUcsa0NBQThCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0gsbUNBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlcixcclxuICBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyUGFyYW1zXHJcbn0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSWdvTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciBpbXBsZW1lbnRzIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXIge1xyXG4gIGhhbmRsZShwYXJhbXM6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJQYXJhbXMpIHtcclxuICAgIGlmICghcGFyYW1zLnRyYW5zbGF0ZVNlcnZpY2UubGFuZ3MubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID1cclxuICAgICAgICAnVHJhbnNsYXRpb25zIGFyZSBub3QgeWV0IGxvYWRlZC4gXFxcclxuICAgICAgICAgQ2hlY2sgdGhhdCB0aGUgTGFuZ3VhZ2VTZXJ2aWNlIGlzIGluamVjdGVkLic7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBLZXkgXCIke3BhcmFtcy5rZXl9XCIgaXMgbWlzc2luZyBpbiBsb2NhbGUgZmlsZS5gKTtcclxuICB9XHJcbn1cclxuIl19