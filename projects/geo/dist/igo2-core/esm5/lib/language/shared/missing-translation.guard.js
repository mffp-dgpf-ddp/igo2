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
        if (params.key.substr(0, 4) === 'igo.') {
            throw new Error("The Key \"" + params.key + "\" is missing in locale file.");
        }
        else {
            return params.key;
        }
    };
    return IgoMissingTranslationHandler;
}());
export { IgoMissingTranslationHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2luZy10cmFuc2xhdGlvbi5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGFuZ3VhZ2Uvc2hhcmVkL21pc3NpbmctdHJhbnNsYXRpb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBO0lBQUE7SUFlQSxDQUFDOzs7OztJQWRDLDZDQUFNOzs7O0lBQU4sVUFBTyxNQUF1QztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7O2dCQUNuQyxLQUFLLEdBQ1Q7cURBQzZDO1lBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFFRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFZLE1BQU0sQ0FBQyxHQUFHLGtDQUE4QixDQUFDLENBQUM7U0FDdkU7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFDSCxtQ0FBQztBQUFELENBQUMsQUFmRCxJQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyLFxyXG4gIE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJQYXJhbXNcclxufSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJZ29NaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIGltcGxlbWVudHMgTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciB7XHJcbiAgaGFuZGxlKHBhcmFtczogTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlclBhcmFtcykge1xyXG4gICAgaWYgKCFwYXJhbXMudHJhbnNsYXRlU2VydmljZS5sYW5ncy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgZXJyb3IgPVxyXG4gICAgICAgICdUcmFuc2xhdGlvbnMgYXJlIG5vdCB5ZXQgbG9hZGVkLiBcXFxyXG4gICAgICAgICBDaGVjayB0aGF0IHRoZSBMYW5ndWFnZVNlcnZpY2UgaXMgaW5qZWN0ZWQuJztcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGFyYW1zLmtleS5zdWJzdHIoMCwgNCkgPT09ICdpZ28uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBLZXkgXCIke3BhcmFtcy5rZXl9XCIgaXMgbWlzc2luZyBpbiBsb2NhbGUgZmlsZS5gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXMua2V5O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=