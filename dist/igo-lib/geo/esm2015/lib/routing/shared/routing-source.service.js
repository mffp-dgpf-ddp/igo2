/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { RoutingSource } from '../routing-sources/routing-source';
export class RoutingSourceService {
    /**
     * @param {?} sources
     */
    constructor(sources) {
        this.sources = sources;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1zb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9yb3V0aW5nL3NoYXJlZC9yb3V0aW5nLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbEUsTUFBTSxPQUFPLG9CQUFvQjs7OztJQUMvQixZQUFtQixPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtJQUFHLENBQUM7Q0FDaEQ7OztJQURhLHVDQUErQjs7Ozs7O0FBRzdDLE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxPQUF3QjtJQUNsRSxPQUFPLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsT0FBTztRQUNMLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsVUFBVSxFQUFFLDJCQUEyQjtRQUN2QyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDdEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0aW5nU291cmNlIH0gZnJvbSAnLi4vcm91dGluZy1zb3VyY2VzL3JvdXRpbmctc291cmNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSb3V0aW5nU291cmNlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZXM6IFJvdXRpbmdTb3VyY2VbXSkge31cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmdTb3VyY2VTZXJ2aWNlRmFjdG9yeShzb3VyY2VzOiBSb3V0aW5nU291cmNlW10pIHtcclxuICByZXR1cm4gbmV3IFJvdXRpbmdTb3VyY2VTZXJ2aWNlKHNvdXJjZXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJvdXRpbmdTb3VyY2VTZXJ2aWNlKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBwcm92aWRlOiBSb3V0aW5nU291cmNlU2VydmljZSxcclxuICAgIHVzZUZhY3Rvcnk6IHJvdXRpbmdTb3VyY2VTZXJ2aWNlRmFjdG9yeSxcclxuICAgIGRlcHM6IFtSb3V0aW5nU291cmNlXVxyXG4gIH07XHJcbn1cclxuIl19