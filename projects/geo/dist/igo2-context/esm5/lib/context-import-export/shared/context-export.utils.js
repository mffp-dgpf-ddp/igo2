/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ExportNothingToExportError } from './context-export.errors';
/**
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleFileExportError(error, messageService, languageService) {
    if (error instanceof ExportNothingToExportError) {
        this.handleNothingToExportError(messageService, languageService);
        return;
    }
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.context.contextImportExport.export.failed.title');
    /** @type {?} */
    var message = translate.instant('igo.context.contextImportExport.export.failed.text');
    messageService.error(message, title);
}
/**
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleFileExportSuccess(messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.context.contextImportExport.export.success.title');
    /** @type {?} */
    var message = translate.instant('igo.context.contextImportExport.export.success.text');
    messageService.success(message, title);
}
/**
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleNothingToExportError(messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.context.contextImportExport.export.nothing.title');
    /** @type {?} */
    var message = translate.instant('igo.context.contextImportExport.export.nothing.text');
    messageService.error(message, title);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1leHBvcnQudXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtaW1wb3J0LWV4cG9ydC9zaGFyZWQvY29udGV4dC1leHBvcnQudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7O0FBRXJFLE1BQU0sVUFBVSxxQkFBcUIsQ0FDakMsS0FBWSxFQUNaLGNBQThCLEVBQzlCLGVBQWdDO0lBRWhDLElBQUksS0FBSyxZQUFZLDBCQUEwQixFQUFFO1FBQy9DLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDakUsT0FBTztLQUNSOztRQUNLLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMscURBQXFELENBQUM7O1FBQ2hGLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLG9EQUFvRCxDQUFDO0lBQ3ZGLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSx1QkFBdUIsQ0FDbkMsY0FBOEIsRUFDOUIsZUFBZ0M7O1FBRTFCLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsc0RBQXNELENBQUM7O1FBQ2pGLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHFEQUFxRCxDQUFDO0lBQ3hGLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FDdEMsY0FBOEIsRUFDOUIsZUFBZ0M7O1FBRTFCLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsc0RBQXNELENBQUM7O1FBQ2pGLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHFEQUFxRCxDQUFDO0lBQ3hGLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yIH0gZnJvbSAnLi9jb250ZXh0LWV4cG9ydC5lcnJvcnMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVFeHBvcnRFcnJvcihcclxuICAgIGVycm9yOiBFcnJvcixcclxuICAgIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvcikge1xyXG4gICAgICB0aGlzLmhhbmRsZU5vdGhpbmdUb0V4cG9ydEVycm9yKG1lc3NhZ2VTZXJ2aWNlLCBsYW5ndWFnZVNlcnZpY2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQuY29udGV4dEltcG9ydEV4cG9ydC5leHBvcnQuZmFpbGVkLnRpdGxlJyk7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LmNvbnRleHRJbXBvcnRFeHBvcnQuZXhwb3J0LmZhaWxlZC50ZXh0Jyk7XHJcbiAgICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGaWxlRXhwb3J0U3VjY2VzcyhcclxuICAgIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQuY29udGV4dEltcG9ydEV4cG9ydC5leHBvcnQuc3VjY2Vzcy50aXRsZScpO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmV4cG9ydC5zdWNjZXNzLnRleHQnKTtcclxuICAgIG1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTm90aGluZ1RvRXhwb3J0RXJyb3IoXHJcbiAgICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LmNvbnRleHRJbXBvcnRFeHBvcnQuZXhwb3J0Lm5vdGhpbmcudGl0bGUnKTtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQuY29udGV4dEltcG9ydEV4cG9ydC5leHBvcnQubm90aGluZy50ZXh0Jyk7XHJcbiAgICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuIl19