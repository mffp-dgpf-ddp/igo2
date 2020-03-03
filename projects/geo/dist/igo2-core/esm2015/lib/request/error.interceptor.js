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
        /** @type {?} */
        const errorContainer = { httpError: undefined };
        return next.handle(req).pipe(catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => this.handleError(error, errorContainer))), finalize((/**
         * @return {?}
         */
        () => {
            this.handleCaughtError(errorContainer);
            this.handleUncaughtError(errorContainer);
        })));
    }
    /**
     * @private
     * @param {?} httpError
     * @param {?} errorContainer
     * @return {?}
     */
    handleError(httpError, errorContainer) {
        if (httpError instanceof HttpErrorResponse) {
            /** @type {?} */
            const errorObj = httpError.error === 'object' ? httpError.error : {};
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
    }
    /**
     * @private
     * @param {?} errorContainer
     * @return {?}
     */
    handleCaughtError(errorContainer) {
        /** @type {?} */
        const httpError = errorContainer.httpError;
        if (httpError && httpError.error.toDisplay) {
            httpError.error.caught = true;
            this.messageService.error(httpError.error.message, httpError.error.title);
        }
    }
    /**
     * @private
     * @param {?} errorContainer
     * @return {?}
     */
    handleUncaughtError(errorContainer) {
        /** @type {?} */
        const httpError = errorContainer.httpError;
        if (httpError && !httpError.error.caught) {
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.errors.uncaught.message');
            /** @type {?} */
            const title = translate.instant('igo.core.errors.uncaught.title');
            httpError.error.caught = true;
            this.messageService.error(message, title);
        }
    }
}
ErrorInterceptor.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ErrorInterceptor.ctorParameters = () => [
    { type: MessageService },
    { type: Injector }
];
/** @nocollapse */ ErrorInterceptor.ngInjectableDef = i0.defineInjectable({ factory: function ErrorInterceptor_Factory() { return new ErrorInterceptor(i0.inject(i1.MessageService), i0.inject(i0.INJECTOR)); }, token: ErrorInterceptor, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL3JlcXVlc3QvZXJyb3IuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFLTCxpQkFBaUIsRUFDbEIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBS3RFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBQzNCLFlBQ1UsY0FBOEIsRUFDOUIsUUFBa0I7UUFEbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQzs7Ozs7O0lBRUosU0FBUyxDQUNQLEdBQXFCLEVBQ3JCLElBQWlCOztjQUVYLGNBQWMsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7UUFDL0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDMUIsVUFBVTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLEVBQUMsRUFDNUQsUUFBUTs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLFdBQVcsQ0FDakIsU0FBNEIsRUFDNUIsY0FBZ0Q7UUFFaEQsSUFBSSxTQUFTLFlBQVksaUJBQWlCLEVBQUU7O2tCQUNwQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEUsUUFBUSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ25FLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRXhCLFNBQVMsR0FBRyxJQUFJLGlCQUFpQixDQUFDO2dCQUNoQyxLQUFLLEVBQUUsUUFBUTtnQkFDZixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87Z0JBQzFCLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTtnQkFDeEIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVO2dCQUNoQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUc7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxjQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNyQyxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFFTyxpQkFBaUIsQ0FBQyxjQUFnRDs7Y0FDbEUsU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTO1FBQzFDLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQzFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNFO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsY0FFM0I7O2NBQ08sU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTO1FBQzFDLElBQUksU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7O2tCQUNsQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUzs7a0JBQ3hELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDOztrQkFDL0QsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7WUFDakUsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7OztZQWhFRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFMUSxjQUFjO1lBWkYsUUFBUTs7Ozs7Ozs7SUFvQnpCLDBDQUFzQzs7Ozs7SUFDdEMsb0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBIdHRwSW50ZXJjZXB0b3IsXHJcbiAgSHR0cEhhbmRsZXIsXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cEV2ZW50LFxyXG4gIEh0dHBFcnJvclJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbWVzc2FnZS9zaGFyZWQvbWVzc2FnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXJyb3JJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgKSB7fVxyXG5cclxuICBpbnRlcmNlcHQoXHJcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXHJcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgIGNvbnN0IGVycm9yQ29udGFpbmVyID0geyBodHRwRXJyb3I6IHVuZGVmaW5lZCB9O1xyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBlcnJvckNvbnRhaW5lcikpLFxyXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDYXVnaHRFcnJvcihlcnJvckNvbnRhaW5lcik7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVVbmNhdWdodEVycm9yKGVycm9yQ29udGFpbmVyKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUVycm9yKFxyXG4gICAgaHR0cEVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSxcclxuICAgIGVycm9yQ29udGFpbmVyOiB7IGh0dHBFcnJvcjogSHR0cEVycm9yUmVzcG9uc2UgfVxyXG4gICkge1xyXG4gICAgaWYgKGh0dHBFcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yT2JqID0gaHR0cEVycm9yLmVycm9yID09PSAnb2JqZWN0JyA/IGh0dHBFcnJvci5lcnJvciA6IHt9O1xyXG4gICAgICBlcnJvck9iai5tZXNzYWdlID0gaHR0cEVycm9yLmVycm9yLm1lc3NhZ2UgfHwgaHR0cEVycm9yLnN0YXR1c1RleHQ7XHJcbiAgICAgIGVycm9yT2JqLmNhdWdodCA9IGZhbHNlO1xyXG5cclxuICAgICAgaHR0cEVycm9yID0gbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcclxuICAgICAgICBlcnJvcjogZXJyb3JPYmosXHJcbiAgICAgICAgaGVhZGVyczogaHR0cEVycm9yLmhlYWRlcnMsXHJcbiAgICAgICAgc3RhdHVzOiBodHRwRXJyb3Iuc3RhdHVzLFxyXG4gICAgICAgIHN0YXR1c1RleHQ6IGh0dHBFcnJvci5zdGF0dXNUZXh0LFxyXG4gICAgICAgIHVybDogaHR0cEVycm9yLnVybFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBlcnJvckNvbnRhaW5lci5odHRwRXJyb3IgPSBodHRwRXJyb3I7XHJcbiAgICByZXR1cm4gdGhyb3dFcnJvcihodHRwRXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVDYXVnaHRFcnJvcihlcnJvckNvbnRhaW5lcjogeyBodHRwRXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlIH0pIHtcclxuICAgIGNvbnN0IGh0dHBFcnJvciA9IGVycm9yQ29udGFpbmVyLmh0dHBFcnJvcjtcclxuICAgIGlmIChodHRwRXJyb3IgJiYgaHR0cEVycm9yLmVycm9yLnRvRGlzcGxheSkge1xyXG4gICAgICBodHRwRXJyb3IuZXJyb3IuY2F1Z2h0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihodHRwRXJyb3IuZXJyb3IubWVzc2FnZSwgaHR0cEVycm9yLmVycm9yLnRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlVW5jYXVnaHRFcnJvcihlcnJvckNvbnRhaW5lcjoge1xyXG4gICAgaHR0cEVycm9yOiBIdHRwRXJyb3JSZXNwb25zZTtcclxuICB9KSB7XHJcbiAgICBjb25zdCBodHRwRXJyb3IgPSBlcnJvckNvbnRhaW5lci5odHRwRXJyb3I7XHJcbiAgICBpZiAoaHR0cEVycm9yICYmICFodHRwRXJyb3IuZXJyb3IuY2F1Z2h0KSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLmVycm9ycy51bmNhdWdodC5tZXNzYWdlJyk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLmVycm9ycy51bmNhdWdodC50aXRsZScpO1xyXG4gICAgICBodHRwRXJyb3IuZXJyb3IuY2F1Z2h0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==