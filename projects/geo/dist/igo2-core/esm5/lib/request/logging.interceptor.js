/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
var LoggingInterceptor = /** @class */ (function () {
    function LoggingInterceptor() {
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    LoggingInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        /** @type {?} */
        var started = Date.now();
        /** @type {?} */
        var ok;
        // extend server response observable with logging
        return next.handle(req).pipe(tap((
        // Succeeds when there is a response; ignore other events
        // Succeeds when there is a response; ignore other events
        /**
         * @param {?} event
         * @return {?}
         */
        function (event) { return (ok = event instanceof HttpResponse ? 'succeeded' : ''); }), (
        // Operation failed; error is an HttpErrorResponse
        // Operation failed; error is an HttpErrorResponse
        /**
         * @param {?} error
         * @return {?}
         */
        function (error) { return (ok = 'failed'); })), 
        // Log when response observable either completes or errors
        finalize((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var elapsed = Date.now() - started;
            /** @type {?} */
            var msg = req.method + " \"" + req.urlWithParams + "\"\n             " + ok + " in " + elapsed + " ms.";
            console.log(msg);
        })));
    };
    LoggingInterceptor.decorators = [
        { type: Injectable }
    ];
    return LoggingInterceptor;
}());
export { LoggingInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcmVxdWVzdC9sb2dnaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFLTCxZQUFZLEVBQ2IsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DO0lBQUE7SUEyQkEsQ0FBQzs7Ozs7O0lBekJDLHNDQUFTOzs7OztJQUFULFVBQ0UsR0FBcUIsRUFDckIsSUFBaUI7O1lBRVgsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7O1lBQ3RCLEVBQVU7UUFFZCxpREFBaUQ7UUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDMUIsR0FBRztRQUNELHlEQUF5RDs7Ozs7O1FBQ3pELFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxFQUFFLEdBQUcsS0FBSyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBdkQsQ0FBdUQ7UUFDaEUsa0RBQWtEOzs7Ozs7UUFDbEQsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBZixDQUFlLEVBQ3pCO1FBQ0QsMERBQTBEO1FBQzFELFFBQVE7OztRQUFDOztnQkFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU87O2dCQUM5QixHQUFHLEdBQU0sR0FBRyxDQUFDLE1BQU0sV0FBSyxHQUFHLENBQUMsYUFBYSx5QkFDeEMsRUFBRSxZQUFPLE9BQU8sU0FBTTtZQUU3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOztnQkExQkYsVUFBVTs7SUEyQlgseUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQTFCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSHR0cEludGVyY2VwdG9yLFxyXG4gIEh0dHBIYW5kbGVyLFxyXG4gIEh0dHBFdmVudCxcclxuICBIdHRwUmVxdWVzdCxcclxuICBIdHRwUmVzcG9uc2VcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMb2dnaW5nSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGludGVyY2VwdChcclxuICAgIHJlcTogSHR0cFJlcXVlc3Q8YW55PixcclxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXHJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG4gICAgY29uc3Qgc3RhcnRlZCA9IERhdGUubm93KCk7XHJcbiAgICBsZXQgb2s6IHN0cmluZztcclxuXHJcbiAgICAvLyBleHRlbmQgc2VydmVyIHJlc3BvbnNlIG9ic2VydmFibGUgd2l0aCBsb2dnaW5nXHJcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5waXBlKFxyXG4gICAgICB0YXAoXHJcbiAgICAgICAgLy8gU3VjY2VlZHMgd2hlbiB0aGVyZSBpcyBhIHJlc3BvbnNlOyBpZ25vcmUgb3RoZXIgZXZlbnRzXHJcbiAgICAgICAgZXZlbnQgPT4gKG9rID0gZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UgPyAnc3VjY2VlZGVkJyA6ICcnKSxcclxuICAgICAgICAvLyBPcGVyYXRpb24gZmFpbGVkOyBlcnJvciBpcyBhbiBIdHRwRXJyb3JSZXNwb25zZVxyXG4gICAgICAgIGVycm9yID0+IChvayA9ICdmYWlsZWQnKVxyXG4gICAgICApLFxyXG4gICAgICAvLyBMb2cgd2hlbiByZXNwb25zZSBvYnNlcnZhYmxlIGVpdGhlciBjb21wbGV0ZXMgb3IgZXJyb3JzXHJcbiAgICAgIGZpbmFsaXplKCgpID0+IHtcclxuICAgICAgICBjb25zdCBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIHN0YXJ0ZWQ7XHJcbiAgICAgICAgY29uc3QgbXNnID0gYCR7cmVxLm1ldGhvZH0gXCIke3JlcS51cmxXaXRoUGFyYW1zfVwiXHJcbiAgICAgICAgICAgICAke29rfSBpbiAke2VsYXBzZWR9IG1zLmA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=