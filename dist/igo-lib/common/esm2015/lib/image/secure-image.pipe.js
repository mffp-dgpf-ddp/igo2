/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
export class SecureImagePipe {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    transform(url) {
        return this.http
            .get(url, {
            headers: {
                activityInterceptor: 'false'
            },
            responseType: 'blob'
        })
            .pipe(switchMap((/**
         * @param {?} blob
         * @return {?}
         */
        blob => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                /** @type {?} */
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = (/**
                 * @return {?}
                 */
                () => {
                    observer.next(reader.result);
                });
            }));
        })));
    }
}
SecureImagePipe.decorators = [
    { type: Pipe, args: [{
                name: 'secureImage'
            },] }
];
/** @nocollapse */
SecureImagePipe.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    SecureImagePipe.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLWltYWdlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvaW1hZ2Uvc2VjdXJlLWltYWdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUszQyxNQUFNLE9BQU8sZUFBZTs7OztJQUMxQixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUcsQ0FBQzs7Ozs7SUFFeEMsU0FBUyxDQUFDLEdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsbUJBQW1CLEVBQUUsT0FBTzthQUM3QjtZQUNELFlBQVksRUFBRSxNQUFNO1NBQ3JCLENBQUM7YUFDRCxJQUFJLENBQ0gsU0FBUzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2YsT0FBTyxJQUFJLFVBQVU7Ozs7WUFBQyxRQUFRLENBQUMsRUFBRTs7c0JBQ3pCLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTtnQkFDL0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFNBQVM7OztnQkFBRyxHQUFHLEVBQUU7b0JBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUEsQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7OztZQXpCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLGFBQWE7YUFDcEI7Ozs7WUFQUSxVQUFVOzs7Ozs7O0lBU0wsK0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ3NlY3VyZUltYWdlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VjdXJlSW1hZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh1cmwsIHtcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBhY3Rpdml0eUludGVyY2VwdG9yOiAnZmFsc2UnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJ1xyXG4gICAgICB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBzd2l0Y2hNYXAoYmxvYiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcclxuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlYWRlci5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIl19