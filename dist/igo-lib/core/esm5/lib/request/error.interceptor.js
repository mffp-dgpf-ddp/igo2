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
        return next.handle(req).pipe(catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.handleError(error, req); })), finalize((/**
         * @return {?}
         */
        function () { return _this.handleCaughtError(); })), finalize((/**
         * @return {?}
         */
        function () { return _this.handleUncaughtError(); })));
    };
    /**
     * @private
     * @param {?} httpError
     * @param {?} req
     * @return {?}
     */
    ErrorInterceptor.prototype.handleError = /**
     * @private
     * @param {?} httpError
     * @param {?} req
     * @return {?}
     */
    function (httpError, req) {
        /** @type {?} */
        var msg = req.method + " " + req.urlWithParams + " " + httpError.status + " (" + httpError.statusText + ")";
        if (httpError instanceof HttpErrorResponse) {
            /** @type {?} */
            var errorObj = httpError.error === 'object' ? httpError.error : {};
            errorObj.message = httpError.error.message || httpError.statusText;
            errorObj.caught = false;
            console.error(msg, '\n', errorObj.message, '\n\n', httpError);
            this.httpError = new HttpErrorResponse({
                error: errorObj,
                headers: httpError.headers,
                status: httpError.status,
                statusText: httpError.statusText,
                url: httpError.url
            });
        }
        return throwError(this.httpError);
    };
    /**
     * @private
     * @return {?}
     */
    ErrorInterceptor.prototype.handleCaughtError = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.httpError && this.httpError.error.toDisplay) {
            this.httpError.error.caught = true;
            this.messageService.error(this.httpError.error.message, this.httpError.error.title);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ErrorInterceptor.prototype.handleUncaughtError = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.httpError && !this.httpError.error.caught) {
            /** @type {?} */
            var translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            var message = translate.instant('igo.core.errors.uncaught.message');
            /** @type {?} */
            var title = translate.instant('igo.core.errors.uncaught.title');
            this.httpError.error.caught = true;
            this.messageService.error(message, title);
        }
    };
    ErrorInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ErrorInterceptor.ctorParameters = function () { return [
        { type: MessageService },
        { type: Injector }
    ]; };
    return ErrorInterceptor;
}());
export { ErrorInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ErrorInterceptor.prototype.httpError;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL3JlcXVlc3QvZXJyb3IuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFLTCxpQkFBaUIsRUFDbEIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV0RTtJQUlFLDBCQUNVLGNBQThCLEVBQzlCLFFBQWtCO1FBRGxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7Ozs7OztJQUVKLG9DQUFTOzs7OztJQUFULFVBQ0UsR0FBcUIsRUFDckIsSUFBaUI7UUFGbkIsaUJBU0M7UUFMQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMxQixVQUFVOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBNUIsQ0FBNEIsRUFBQyxFQUNqRCxRQUFROzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixFQUFFLEVBQXhCLENBQXdCLEVBQUMsRUFDeEMsUUFBUTs7O1FBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUExQixDQUEwQixFQUFDLENBQzNDLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sc0NBQVc7Ozs7OztJQUFuQixVQUFvQixTQUE0QixFQUFFLEdBQXFCOztZQUMvRCxHQUFHLEdBQU0sR0FBRyxDQUFDLE1BQU0sU0FBSSxHQUFHLENBQUMsYUFBYSxTQUFJLFNBQVMsQ0FBQyxNQUFNLFVBQ2hFLFNBQVMsQ0FBQyxVQUFVLE1BQ25CO1FBRUgsSUFBSSxTQUFTLFlBQVksaUJBQWlCLEVBQUU7O2dCQUNwQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEUsUUFBUSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ25FLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUU5RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksaUJBQWlCLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSxRQUFRO2dCQUNmLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTztnQkFDMUIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN4QixVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7Z0JBQ2hDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRzthQUNuQixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVPLDRDQUFpQjs7OztJQUF6QjtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQzNCLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7O0lBRU8sOENBQW1COzs7O0lBQTNCO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFOztnQkFDNUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVM7O2dCQUN4RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQzs7Z0JBQy9ELEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7Z0JBN0RGLFVBQVU7Ozs7Z0JBSEYsY0FBYztnQkFaRixRQUFROztJQTZFN0IsdUJBQUM7Q0FBQSxBQTlERCxJQThEQztTQTdEWSxnQkFBZ0I7Ozs7OztJQUMzQixxQ0FBcUM7Ozs7O0lBR25DLDBDQUFzQzs7Ozs7SUFDdEMsb0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBIdHRwSW50ZXJjZXB0b3IsXHJcbiAgSHR0cEhhbmRsZXIsXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cEV2ZW50LFxyXG4gIEh0dHBFcnJvclJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbWVzc2FnZS9zaGFyZWQvbWVzc2FnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXJyb3JJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgcHJpdmF0ZSBodHRwRXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcclxuICApIHt9XHJcblxyXG4gIGludGVyY2VwdChcclxuICAgIHJlcTogSHR0cFJlcXVlc3Q8YW55PixcclxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXHJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCByZXEpKSxcclxuICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5oYW5kbGVDYXVnaHRFcnJvcigpKSxcclxuICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5oYW5kbGVVbmNhdWdodEVycm9yKCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihodHRwRXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlLCByZXE6IEh0dHBSZXF1ZXN0PGFueT4pIHtcclxuICAgIGNvbnN0IG1zZyA9IGAke3JlcS5tZXRob2R9ICR7cmVxLnVybFdpdGhQYXJhbXN9ICR7aHR0cEVycm9yLnN0YXR1c30gKCR7XHJcbiAgICAgIGh0dHBFcnJvci5zdGF0dXNUZXh0XHJcbiAgICB9KWA7XHJcblxyXG4gICAgaWYgKGh0dHBFcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yT2JqID0gaHR0cEVycm9yLmVycm9yID09PSAnb2JqZWN0JyA/IGh0dHBFcnJvci5lcnJvciA6IHt9O1xyXG4gICAgICBlcnJvck9iai5tZXNzYWdlID0gaHR0cEVycm9yLmVycm9yLm1lc3NhZ2UgfHwgaHR0cEVycm9yLnN0YXR1c1RleHQ7XHJcbiAgICAgIGVycm9yT2JqLmNhdWdodCA9IGZhbHNlO1xyXG4gICAgICBjb25zb2xlLmVycm9yKG1zZywgJ1xcbicsIGVycm9yT2JqLm1lc3NhZ2UsICdcXG5cXG4nLCBodHRwRXJyb3IpO1xyXG5cclxuICAgICAgdGhpcy5odHRwRXJyb3IgPSBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xyXG4gICAgICAgIGVycm9yOiBlcnJvck9iaixcclxuICAgICAgICBoZWFkZXJzOiBodHRwRXJyb3IuaGVhZGVycyxcclxuICAgICAgICBzdGF0dXM6IGh0dHBFcnJvci5zdGF0dXMsXHJcbiAgICAgICAgc3RhdHVzVGV4dDogaHR0cEVycm9yLnN0YXR1c1RleHQsXHJcbiAgICAgICAgdXJsOiBodHRwRXJyb3IudXJsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aHJvd0Vycm9yKHRoaXMuaHR0cEVycm9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ2F1Z2h0RXJyb3IoKSB7XHJcbiAgICBpZiAodGhpcy5odHRwRXJyb3IgJiYgdGhpcy5odHRwRXJyb3IuZXJyb3IudG9EaXNwbGF5KSB7XHJcbiAgICAgIHRoaXMuaHR0cEVycm9yLmVycm9yLmNhdWdodCA9IHRydWU7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgdGhpcy5odHRwRXJyb3IuZXJyb3IubWVzc2FnZSxcclxuICAgICAgICB0aGlzLmh0dHBFcnJvci5lcnJvci50aXRsZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVVbmNhdWdodEVycm9yKCkge1xyXG4gICAgaWYgKHRoaXMuaHR0cEVycm9yICYmICF0aGlzLmh0dHBFcnJvci5lcnJvci5jYXVnaHQpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUuZXJyb3JzLnVuY2F1Z2h0Lm1lc3NhZ2UnKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUuZXJyb3JzLnVuY2F1Z2h0LnRpdGxlJyk7XHJcbiAgICAgIHRoaXMuaHR0cEVycm9yLmVycm9yLmNhdWdodCA9IHRydWU7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=