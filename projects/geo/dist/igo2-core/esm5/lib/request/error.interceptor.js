/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MessageService } from '../message/shared/message.service';
import { LanguageService } from '../language/shared/language.service';
import * as i0 from "@angular/core";
import * as i1 from "../message/shared/message.service";
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(messageService, injector) {
        this.messageService = messageService;
        this.injector = injector;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    ErrorInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        /** @type {?} */
        var errorContainer = { httpError: undefined };
        return next.handle(req).pipe(catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.handleError(error, errorContainer); })), finalize((/**
         * @return {?}
         */
        function () {
            _this.handleCaughtError(errorContainer);
            _this.handleUncaughtError(errorContainer);
        })));
    };
    /**
     * @private
     * @param {?} httpError
     * @param {?} errorContainer
     * @return {?}
     */
    ErrorInterceptor.prototype.handleError = /**
     * @private
     * @param {?} httpError
     * @param {?} errorContainer
     * @return {?}
     */
    function (httpError, errorContainer) {
        if (httpError instanceof HttpErrorResponse) {
            /** @type {?} */
            var errorObj = httpError.error === 'object' ? httpError.error : {};
            errorObj.message = httpError.error.message || httpError.statusText;
            errorObj.caught = false;
            httpError = new HttpErrorResponse({
                error: errorObj,
                headers: httpError.headers,
                status: httpError.status,
                statusText: httpError.statusText,
                url: httpError.url
            });
        }
        errorContainer.httpError = httpError;
        return throwError(httpError);
    };
    /**
     * @private
     * @param {?} errorContainer
     * @return {?}
     */
    ErrorInterceptor.prototype.handleCaughtError = /**
     * @private
     * @param {?} errorContainer
     * @return {?}
     */
    function (errorContainer) {
        /** @type {?} */
        var httpError = errorContainer.httpError;
        if (httpError && httpError.error.toDisplay) {
            httpError.error.caught = true;
            this.messageService.error(httpError.error.message, httpError.error.title);
        }
    };
    /**
     * @private
     * @param {?} errorContainer
     * @return {?}
     */
    ErrorInterceptor.prototype.handleUncaughtError = /**
     * @private
     * @param {?} errorContainer
     * @return {?}
     */
    function (errorContainer) {
        /** @type {?} */
        var httpError = errorContainer.httpError;
        if (httpError && !httpError.error.caught) {
            /** @type {?} */
            var translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            var message = translate.instant('igo.core.errors.uncaught.message');
            /** @type {?} */
            var title = translate.instant('igo.core.errors.uncaught.title');
            httpError.error.caught = true;
            this.messageService.error(message, title);
        }
    };
    ErrorInterceptor.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ErrorInterceptor.ctorParameters = function () { return [
        { type: MessageService },
        { type: Injector }
    ]; };
    /** @nocollapse */ ErrorInterceptor.ngInjectableDef = i0.defineInjectable({ factory: function ErrorInterceptor_Factory() { return new ErrorInterceptor(i0.inject(i1.MessageService), i0.inject(i0.INJECTOR)); }, token: ErrorInterceptor, providedIn: "root" });
    return ErrorInterceptor;
}());
export { ErrorInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ErrorInterceptor.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ErrorInterceptor.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL3JlcXVlc3QvZXJyb3IuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFLTCxpQkFBaUIsRUFDbEIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBRXRFO0lBSUUsMEJBQ1UsY0FBOEIsRUFDOUIsUUFBa0I7UUFEbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQzs7Ozs7O0lBRUosb0NBQVM7Ozs7O0lBQVQsVUFDRSxHQUFxQixFQUNyQixJQUFpQjtRQUZuQixpQkFZQzs7WUFSTyxjQUFjLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFO1FBQy9DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzFCLFVBQVU7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxFQUF2QyxDQUF1QyxFQUFDLEVBQzVELFFBQVE7OztRQUFDO1lBQ1AsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLHNDQUFXOzs7Ozs7SUFBbkIsVUFDRSxTQUE0QixFQUM1QixjQUFnRDtRQUVoRCxJQUFJLFNBQVMsWUFBWSxpQkFBaUIsRUFBRTs7Z0JBQ3BDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwRSxRQUFRLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDbkUsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFeEIsU0FBUyxHQUFHLElBQUksaUJBQWlCLENBQUM7Z0JBQ2hDLEtBQUssRUFBRSxRQUFRO2dCQUNmLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTztnQkFDMUIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN4QixVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7Z0JBQ2hDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRzthQUNuQixDQUFDLENBQUM7U0FDSjtRQUVELGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3JDLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVPLDRDQUFpQjs7Ozs7SUFBekIsVUFBMEIsY0FBZ0Q7O1lBQ2xFLFNBQVMsR0FBRyxjQUFjLENBQUMsU0FBUztRQUMxQyxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUMxQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRTtJQUNILENBQUM7Ozs7OztJQUVPLDhDQUFtQjs7Ozs7SUFBM0IsVUFBNEIsY0FFM0I7O1lBQ08sU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTO1FBQzFDLElBQUksU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7O2dCQUNsQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUzs7Z0JBQ3hELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDOztnQkFDL0QsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7WUFDakUsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7O2dCQWhFRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUxRLGNBQWM7Z0JBWkYsUUFBUTs7OzJCQUE3QjtDQWdGQyxBQWpFRCxJQWlFQztTQTlEWSxnQkFBZ0I7Ozs7OztJQUV6QiwwQ0FBc0M7Ozs7O0lBQ3RDLG9DQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSHR0cEludGVyY2VwdG9yLFxyXG4gIEh0dHBIYW5kbGVyLFxyXG4gIEh0dHBSZXF1ZXN0LFxyXG4gIEh0dHBFdmVudCxcclxuICBIdHRwRXJyb3JSZXNwb25zZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uL21lc3NhZ2Uvc2hhcmVkL21lc3NhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJy4uL2xhbmd1YWdlL3NoYXJlZC9sYW5ndWFnZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEVycm9ySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkge31cclxuXHJcbiAgaW50ZXJjZXB0KFxyXG4gICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxyXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICBjb25zdCBlcnJvckNvbnRhaW5lciA9IHsgaHR0cEVycm9yOiB1bmRlZmluZWQgfTtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgZXJyb3JDb250YWluZXIpKSxcclxuICAgICAgZmluYWxpemUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2F1Z2h0RXJyb3IoZXJyb3JDb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVW5jYXVnaHRFcnJvcihlcnJvckNvbnRhaW5lcik7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihcclxuICAgIGh0dHBFcnJvcjogSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgICBlcnJvckNvbnRhaW5lcjogeyBodHRwRXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlIH1cclxuICApIHtcclxuICAgIGlmIChodHRwRXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xyXG4gICAgICBjb25zdCBlcnJvck9iaiA9IGh0dHBFcnJvci5lcnJvciA9PT0gJ29iamVjdCcgPyBodHRwRXJyb3IuZXJyb3IgOiB7fTtcclxuICAgICAgZXJyb3JPYmoubWVzc2FnZSA9IGh0dHBFcnJvci5lcnJvci5tZXNzYWdlIHx8IGh0dHBFcnJvci5zdGF0dXNUZXh0O1xyXG4gICAgICBlcnJvck9iai5jYXVnaHQgPSBmYWxzZTtcclxuXHJcbiAgICAgIGh0dHBFcnJvciA9IG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XHJcbiAgICAgICAgZXJyb3I6IGVycm9yT2JqLFxyXG4gICAgICAgIGhlYWRlcnM6IGh0dHBFcnJvci5oZWFkZXJzLFxyXG4gICAgICAgIHN0YXR1czogaHR0cEVycm9yLnN0YXR1cyxcclxuICAgICAgICBzdGF0dXNUZXh0OiBodHRwRXJyb3Iuc3RhdHVzVGV4dCxcclxuICAgICAgICB1cmw6IGh0dHBFcnJvci51cmxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXJyb3JDb250YWluZXIuaHR0cEVycm9yID0gaHR0cEVycm9yO1xyXG4gICAgcmV0dXJuIHRocm93RXJyb3IoaHR0cEVycm9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ2F1Z2h0RXJyb3IoZXJyb3JDb250YWluZXI6IHsgaHR0cEVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSB9KSB7XHJcbiAgICBjb25zdCBodHRwRXJyb3IgPSBlcnJvckNvbnRhaW5lci5odHRwRXJyb3I7XHJcbiAgICBpZiAoaHR0cEVycm9yICYmIGh0dHBFcnJvci5lcnJvci50b0Rpc3BsYXkpIHtcclxuICAgICAgaHR0cEVycm9yLmVycm9yLmNhdWdodCA9IHRydWU7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoaHR0cEVycm9yLmVycm9yLm1lc3NhZ2UsIGh0dHBFcnJvci5lcnJvci50aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVVuY2F1Z2h0RXJyb3IoZXJyb3JDb250YWluZXI6IHtcclxuICAgIGh0dHBFcnJvcjogSHR0cEVycm9yUmVzcG9uc2U7XHJcbiAgfSkge1xyXG4gICAgY29uc3QgaHR0cEVycm9yID0gZXJyb3JDb250YWluZXIuaHR0cEVycm9yO1xyXG4gICAgaWYgKGh0dHBFcnJvciAmJiAhaHR0cEVycm9yLmVycm9yLmNhdWdodCkge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5lcnJvcnMudW5jYXVnaHQubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5lcnJvcnMudW5jYXVnaHQudGl0bGUnKTtcclxuICAgICAgaHR0cEVycm9yLmVycm9yLmNhdWdodCA9IHRydWU7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=