/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
export class LoggingInterceptor {
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        const started = Date.now();
        /** @type {?} */
        let ok;
        // extend server response observable with logging
        return next.handle(req).pipe(tap((
        // Succeeds when there is a response; ignore other events
        /**
         * @param {?} event
         * @return {?}
         */
        event => (ok = event instanceof HttpResponse ? 'succeeded' : '')), (
        // Operation failed; error is an HttpErrorResponse
        /**
         * @param {?} error
         * @return {?}
         */
        error => (ok = 'failed'))), 
        // Log when response observable either completes or errors
        finalize((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const elapsed = Date.now() - started;
            /** @type {?} */
            const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
            console.log(msg);
        })));
    }
}
LoggingInterceptor.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcmVxdWVzdC9sb2dnaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFLTCxZQUFZLEVBQ2IsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRy9DLE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztJQUM3QixTQUFTLENBQ1AsR0FBcUIsRUFDckIsSUFBaUI7O2NBRVgsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7O1lBQ3RCLEVBQVU7UUFFZCxpREFBaUQ7UUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDMUIsR0FBRzs7Ozs7O1FBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7Ozs7O1FBRWhFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQ3pCO1FBQ0QsMERBQTBEO1FBQzFELFFBQVE7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ04sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPOztrQkFDOUIsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsYUFBYTtlQUN4QyxFQUFFLE9BQU8sT0FBTyxNQUFNO1lBRTdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OztZQTFCRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBJbnRlcmNlcHRvcixcclxuICBIdHRwSGFuZGxlcixcclxuICBIdHRwRXZlbnQsXHJcbiAgSHR0cFJlcXVlc3QsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAsIGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTG9nZ2luZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICBpbnRlcmNlcHQoXHJcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXHJcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgIGNvbnN0IHN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xyXG4gICAgbGV0IG9rOiBzdHJpbmc7XHJcblxyXG4gICAgLy8gZXh0ZW5kIHNlcnZlciByZXNwb25zZSBvYnNlcnZhYmxlIHdpdGggbG9nZ2luZ1xyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShcclxuICAgICAgdGFwKFxyXG4gICAgICAgIC8vIFN1Y2NlZWRzIHdoZW4gdGhlcmUgaXMgYSByZXNwb25zZTsgaWdub3JlIG90aGVyIGV2ZW50c1xyXG4gICAgICAgIGV2ZW50ID0+IChvayA9IGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlID8gJ3N1Y2NlZWRlZCcgOiAnJyksXHJcbiAgICAgICAgLy8gT3BlcmF0aW9uIGZhaWxlZDsgZXJyb3IgaXMgYW4gSHR0cEVycm9yUmVzcG9uc2VcclxuICAgICAgICBlcnJvciA9PiAob2sgPSAnZmFpbGVkJylcclxuICAgICAgKSxcclxuICAgICAgLy8gTG9nIHdoZW4gcmVzcG9uc2Ugb2JzZXJ2YWJsZSBlaXRoZXIgY29tcGxldGVzIG9yIGVycm9yc1xyXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSBzdGFydGVkO1xyXG4gICAgICAgIGNvbnN0IG1zZyA9IGAke3JlcS5tZXRob2R9IFwiJHtyZXEudXJsV2l0aFBhcmFtc31cIlxyXG4gICAgICAgICAgICAgJHtva30gaW4gJHtlbGFwc2VkfSBtcy5gO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19