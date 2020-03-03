/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DirectionsSource } from '../directions-sources/directions-source';
export class DirectionsSourceService {
    /**
     * @param {?} sources
     */
    constructor(sources) {
        this.sources = sources;
    }
}
if (false) {
    /** @type {?} */
    DirectionsSourceService.prototype.sources;
}
/**
 * @param {?} sources
 * @return {?}
 */
export function directionsSourceServiceFactory(sources) {
    return new DirectionsSourceService(sources);
}
/**
 * @return {?}
 */
export function provideDirectionsSourceService() {
    return {
        provide: DirectionsSourceService,
        useFactory: directionsSourceServiceFactory,
        deps: [DirectionsSource]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1zb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3Rpb25zL3NoYXJlZC9kaXJlY3Rpb25zLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUUzRSxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBQ2xDLFlBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQUcsQ0FBQztDQUNuRDs7O0lBRGEsMENBQWtDOzs7Ozs7QUFHaEQsTUFBTSxVQUFVLDhCQUE4QixDQUFDLE9BQTJCO0lBQ3hFLE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QyxDQUFDOzs7O0FBRUQsTUFBTSxVQUFVLDhCQUE4QjtJQUM1QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxVQUFVLEVBQUUsOEJBQThCO1FBQzFDLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDO0tBQ3pCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uc1NvdXJjZSB9IGZyb20gJy4uL2RpcmVjdGlvbnMtc291cmNlcy9kaXJlY3Rpb25zLXNvdXJjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlyZWN0aW9uc1NvdXJjZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VzOiBEaXJlY3Rpb25zU291cmNlW10pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3Rpb25zU291cmNlU2VydmljZUZhY3Rvcnkoc291cmNlczogRGlyZWN0aW9uc1NvdXJjZVtdKSB7XHJcbiAgcmV0dXJuIG5ldyBEaXJlY3Rpb25zU291cmNlU2VydmljZShzb3VyY2VzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVEaXJlY3Rpb25zU291cmNlU2VydmljZSgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogRGlyZWN0aW9uc1NvdXJjZVNlcnZpY2UsXHJcbiAgICB1c2VGYWN0b3J5OiBkaXJlY3Rpb25zU291cmNlU2VydmljZUZhY3RvcnksXHJcbiAgICBkZXBzOiBbRGlyZWN0aW9uc1NvdXJjZV1cclxuICB9O1xyXG59XHJcbiJdfQ==