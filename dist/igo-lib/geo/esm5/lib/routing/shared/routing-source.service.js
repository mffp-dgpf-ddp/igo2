/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { RoutingSource } from '../routing-sources/routing-source';
var RoutingSourceService = /** @class */ (function () {
    function RoutingSourceService(sources) {
        this.sources = sources;
    }
    return RoutingSourceService;
}());
export { RoutingSourceService };
if (false) {
    /** @type {?} */
    RoutingSourceService.prototype.sources;
}
/**
 * @param {?} sources
 * @return {?}
 */
export function routingSourceServiceFactory(sources) {
    return new RoutingSourceService(sources);
}
/**
 * @return {?}
 */
export function provideRoutingSourceService() {
    return {
        provide: RoutingSourceService,
        useFactory: routingSourceServiceFactory,
        deps: [RoutingSource]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1zb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9yb3V0aW5nL3NoYXJlZC9yb3V0aW5nLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbEU7SUFDRSw4QkFBbUIsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7SUFBRyxDQUFDO0lBQ2pELDJCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEYSx1Q0FBK0I7Ozs7OztBQUc3QyxNQUFNLFVBQVUsMkJBQTJCLENBQUMsT0FBd0I7SUFDbEUsT0FBTyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsMkJBQTJCO0lBQ3pDLE9BQU87UUFDTCxPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLFVBQVUsRUFBRSwyQkFBMkI7UUFDdkMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDO0tBQ3RCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGluZ1NvdXJjZSB9IGZyb20gJy4uL3JvdXRpbmctc291cmNlcy9yb3V0aW5nLXNvdXJjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGluZ1NvdXJjZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VzOiBSb3V0aW5nU291cmNlW10pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByb3V0aW5nU291cmNlU2VydmljZUZhY3Rvcnkoc291cmNlczogUm91dGluZ1NvdXJjZVtdKSB7XHJcbiAgcmV0dXJuIG5ldyBSb3V0aW5nU291cmNlU2VydmljZShzb3VyY2VzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSb3V0aW5nU291cmNlU2VydmljZSgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvdmlkZTogUm91dGluZ1NvdXJjZVNlcnZpY2UsXHJcbiAgICB1c2VGYWN0b3J5OiByb3V0aW5nU291cmNlU2VydmljZUZhY3RvcnksXHJcbiAgICBkZXBzOiBbUm91dGluZ1NvdXJjZV1cclxuICB9O1xyXG59XHJcbiJdfQ==