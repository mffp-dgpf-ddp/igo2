/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ActivityService } from './activity.service';
export class ActivityInterceptor {
    /**
     * @param {?} activityService
     */
    constructor(activityService) {
        this.activityService = activityService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        const activity = req.headers.get('activityInterceptor');
        if (activity) {
            /** @type {?} */
            const actReq = req.clone({
                headers: req.headers.delete('activityInterceptor')
            });
            if (activity === 'false') {
                return next.handle(actReq);
            }
        }
        /** @type {?} */
        const id = this.activityService.register();
        return next.handle(req).pipe(finalize((/**
         * @return {?}
         */
        () => {
            this.activityService.unregister(id);
        })));
    }
}
ActivityInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ActivityInterceptor.ctorParameters = () => [
    { type: ActivityService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ActivityInterceptor.prototype.activityService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2FjdGl2aXR5LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQUM5QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDOzs7Ozs7SUFFeEQsU0FBUyxDQUNQLEdBQXFCLEVBQ3JCLElBQWlCOztjQUVYLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztRQUN2RCxJQUFJLFFBQVEsRUFBRTs7a0JBQ04sTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzthQUNuRCxDQUFDO1lBQ0YsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUI7U0FDRjs7Y0FFSyxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7UUFFMUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDMUIsUUFBUTs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OztZQXpCRixVQUFVOzs7O1lBRkYsZUFBZTs7Ozs7OztJQUlWLDhDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBIdHRwRXZlbnQsXHJcbiAgSHR0cEhhbmRsZXIsXHJcbiAgSHR0cEludGVyY2VwdG9yLFxyXG4gIEh0dHBSZXF1ZXN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEFjdGl2aXR5U2VydmljZSB9IGZyb20gJy4vYWN0aXZpdHkuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBY3Rpdml0eUludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlTZXJ2aWNlKSB7fVxyXG5cclxuICBpbnRlcmNlcHQoXHJcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXHJcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgIGNvbnN0IGFjdGl2aXR5ID0gcmVxLmhlYWRlcnMuZ2V0KCdhY3Rpdml0eUludGVyY2VwdG9yJyk7XHJcbiAgICBpZiAoYWN0aXZpdHkpIHtcclxuICAgICAgY29uc3QgYWN0UmVxID0gcmVxLmNsb25lKHtcclxuICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5kZWxldGUoJ2FjdGl2aXR5SW50ZXJjZXB0b3InKVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGFjdGl2aXR5ID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKGFjdFJlcSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnJlZ2lzdGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShcclxuICAgICAgZmluYWxpemUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnVucmVnaXN0ZXIoaWQpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19