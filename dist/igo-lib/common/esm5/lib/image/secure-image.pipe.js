/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
var SecureImagePipe = /** @class */ (function () {
    function SecureImagePipe(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    SecureImagePipe.prototype.transform = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
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
        function (blob) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /** @type {?} */
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = (/**
                 * @return {?}
                 */
                function () {
                    observer.next(reader.result);
                });
            }));
        })));
    };
    SecureImagePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'secureImage'
                },] }
    ];
    /** @nocollapse */
    SecureImagePipe.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return SecureImagePipe;
}());
export { SecureImagePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SecureImagePipe.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLWltYWdlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvaW1hZ2Uvc2VjdXJlLWltYWdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQztJQUlFLHlCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUcsQ0FBQzs7Ozs7SUFFeEMsbUNBQVM7Ozs7SUFBVCxVQUFVLEdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsbUJBQW1CLEVBQUUsT0FBTzthQUM3QjtZQUNELFlBQVksRUFBRSxNQUFNO1NBQ3JCLENBQUM7YUFDRCxJQUFJLENBQ0gsU0FBUzs7OztRQUFDLFVBQUEsSUFBSTtZQUNaLE9BQU8sSUFBSSxVQUFVOzs7O1lBQUMsVUFBQSxRQUFROztvQkFDdEIsTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO2dCQUMvQixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsU0FBUzs7O2dCQUFHO29CQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxDQUFBLENBQUM7WUFDSixDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUNILENBQUM7SUFDTixDQUFDOztnQkF6QkYsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxhQUFhO2lCQUNwQjs7OztnQkFQUSxVQUFVOztJQStCbkIsc0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXZCWSxlQUFlOzs7Ozs7SUFDZCwrQkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnc2VjdXJlSW1hZ2UnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWN1cmVJbWFnZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gIHRyYW5zZm9ybSh1cmw6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHVybCwge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIGFjdGl2aXR5SW50ZXJjZXB0b3I6ICdmYWxzZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2Jsb2InXHJcbiAgICAgIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcChibG9iID0+IHtcclxuICAgICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xyXG4gICAgICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVhZGVyLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=