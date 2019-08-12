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
export class ErrorInterceptor {
    /**
     * @param {?} messageService
     * @param {?} injector
     */
    constructor(messageService, injector) {
        this.messageService = messageService;
        this.injector = injector;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).pipe(catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => this.handleError(error, req))), finalize((/**
         * @return {?}
         */
        () => this.handleCaughtError())), finalize((/**
         * @return {?}
         */
        () => this.handleUncaughtError())));
    }
    /**
     * @private
     * @param {?} httpError
     * @param {?} req
     * @return {?}
     */
    handleError(httpError, req) {
        /** @type {?} */
        const msg = `${req.method} ${req.urlWithParams} ${httpError.status} (${httpError.statusText})`;
        if (httpError instanceof HttpErrorResponse) {
            /** @type {?} */
            const errorObj = httpError.error === 'object' ? httpError.error : {};
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
    }
    /**
     * @private
     * @return {?}
     */
    handleCaughtError() {
        if (this.httpError && this.httpError.error.toDisplay) {
            this.httpError.error.caught = true;
            this.messageService.error(this.httpError.error.message, this.httpError.error.title);
        }
    }
    /**
     * @private
     * @return {?}
     */
    handleUncaughtError() {
        if (this.httpError && !this.httpError.error.caught) {
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.errors.uncaught.message');
            /** @type {?} */
            const title = translate.instant('igo.core.errors.uncaught.title');
            this.httpError.error.caught = true;
            this.messageService.error(message, title);
        }
    }
}
ErrorInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ErrorInterceptor.ctorParameters = () => [
    { type: MessageService },
    { type: Injector }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL3JlcXVlc3QvZXJyb3IuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFLTCxpQkFBaUIsRUFDbEIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUd0RSxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQUczQixZQUNVLGNBQThCLEVBQzlCLFFBQWtCO1FBRGxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7Ozs7OztJQUVKLFNBQVMsQ0FDUCxHQUFxQixFQUNyQixJQUFpQjtRQUVqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMxQixVQUFVOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBQyxFQUNqRCxRQUFROzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxFQUN4QyxRQUFROzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUMzQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLFdBQVcsQ0FBQyxTQUE0QixFQUFFLEdBQXFCOztjQUMvRCxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxhQUFhLElBQUksU0FBUyxDQUFDLE1BQU0sS0FDaEUsU0FBUyxDQUFDLFVBQ1osR0FBRztRQUVILElBQUksU0FBUyxZQUFZLGlCQUFpQixFQUFFOztrQkFDcEMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BFLFFBQVEsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUNuRSxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlCQUFpQixDQUFDO2dCQUNyQyxLQUFLLEVBQUUsUUFBUTtnQkFDZixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87Z0JBQzFCLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTtnQkFDeEIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVO2dCQUNoQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUc7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDM0IsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFOztrQkFDNUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVM7O2tCQUN4RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQzs7a0JBQy9ELEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7O1lBN0RGLFVBQVU7Ozs7WUFIRixjQUFjO1lBWkYsUUFBUTs7Ozs7OztJQWlCM0IscUNBQXFDOzs7OztJQUduQywwQ0FBc0M7Ozs7O0lBQ3RDLG9DQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSHR0cEludGVyY2VwdG9yLFxyXG4gIEh0dHBIYW5kbGVyLFxyXG4gIEh0dHBSZXF1ZXN0LFxyXG4gIEh0dHBFdmVudCxcclxuICBIdHRwRXJyb3JSZXNwb25zZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uL21lc3NhZ2Uvc2hhcmVkL21lc3NhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJy4uL2xhbmd1YWdlL3NoYXJlZC9sYW5ndWFnZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEVycm9ySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIHByaXZhdGUgaHR0cEVycm9yOiBIdHRwRXJyb3JSZXNwb25zZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7fVxyXG5cclxuICBpbnRlcmNlcHQoXHJcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXHJcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IoZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgcmVxKSksXHJcbiAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuaGFuZGxlQ2F1Z2h0RXJyb3IoKSksXHJcbiAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuaGFuZGxlVW5jYXVnaHRFcnJvcigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoaHR0cEVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSwgcmVxOiBIdHRwUmVxdWVzdDxhbnk+KSB7XHJcbiAgICBjb25zdCBtc2cgPSBgJHtyZXEubWV0aG9kfSAke3JlcS51cmxXaXRoUGFyYW1zfSAke2h0dHBFcnJvci5zdGF0dXN9ICgke1xyXG4gICAgICBodHRwRXJyb3Iuc3RhdHVzVGV4dFxyXG4gICAgfSlgO1xyXG5cclxuICAgIGlmIChodHRwRXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xyXG4gICAgICBjb25zdCBlcnJvck9iaiA9IGh0dHBFcnJvci5lcnJvciA9PT0gJ29iamVjdCcgPyBodHRwRXJyb3IuZXJyb3IgOiB7fTtcclxuICAgICAgZXJyb3JPYmoubWVzc2FnZSA9IGh0dHBFcnJvci5lcnJvci5tZXNzYWdlIHx8IGh0dHBFcnJvci5zdGF0dXNUZXh0O1xyXG4gICAgICBlcnJvck9iai5jYXVnaHQgPSBmYWxzZTtcclxuICAgICAgY29uc29sZS5lcnJvcihtc2csICdcXG4nLCBlcnJvck9iai5tZXNzYWdlLCAnXFxuXFxuJywgaHR0cEVycm9yKTtcclxuXHJcbiAgICAgIHRoaXMuaHR0cEVycm9yID0gbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcclxuICAgICAgICBlcnJvcjogZXJyb3JPYmosXHJcbiAgICAgICAgaGVhZGVyczogaHR0cEVycm9yLmhlYWRlcnMsXHJcbiAgICAgICAgc3RhdHVzOiBodHRwRXJyb3Iuc3RhdHVzLFxyXG4gICAgICAgIHN0YXR1c1RleHQ6IGh0dHBFcnJvci5zdGF0dXNUZXh0LFxyXG4gICAgICAgIHVybDogaHR0cEVycm9yLnVybFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhyb3dFcnJvcih0aGlzLmh0dHBFcnJvcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNhdWdodEVycm9yKCkge1xyXG4gICAgaWYgKHRoaXMuaHR0cEVycm9yICYmIHRoaXMuaHR0cEVycm9yLmVycm9yLnRvRGlzcGxheSkge1xyXG4gICAgICB0aGlzLmh0dHBFcnJvci5lcnJvci5jYXVnaHQgPSB0cnVlO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKFxyXG4gICAgICAgIHRoaXMuaHR0cEVycm9yLmVycm9yLm1lc3NhZ2UsXHJcbiAgICAgICAgdGhpcy5odHRwRXJyb3IuZXJyb3IudGl0bGVcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlVW5jYXVnaHRFcnJvcigpIHtcclxuICAgIGlmICh0aGlzLmh0dHBFcnJvciAmJiAhdGhpcy5odHRwRXJyb3IuZXJyb3IuY2F1Z2h0KSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLmVycm9ycy51bmNhdWdodC5tZXNzYWdlJyk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLmVycm9ycy51bmNhdWdodC50aXRsZScpO1xyXG4gICAgICB0aGlzLmh0dHBFcnJvci5lcnJvci5jYXVnaHQgPSB0cnVlO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19