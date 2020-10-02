/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DirectionsSource } from '../directions-sources/directions-source';
var DirectionsSourceService = /** @class */ (function () {
    function DirectionsSourceService(sources) {
        this.sources = sources;
    }
    return DirectionsSourceService;
}());
export { DirectionsSourceService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1zb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3Rpb25zL3NoYXJlZC9kaXJlY3Rpb25zLXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUUzRTtJQUNFLGlDQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFHLENBQUM7SUFDcEQsOEJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7OztJQURhLDBDQUFrQzs7Ozs7O0FBR2hELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxPQUEyQjtJQUN4RSxPQUFPLElBQUksdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSw4QkFBOEI7SUFDNUMsT0FBTztRQUNMLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztLQUN6QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbnNTb3VyY2UgfSBmcm9tICcuLi9kaXJlY3Rpb25zLXNvdXJjZXMvZGlyZWN0aW9ucy1zb3VyY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpcmVjdGlvbnNTb3VyY2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlczogRGlyZWN0aW9uc1NvdXJjZVtdKSB7fVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlyZWN0aW9uc1NvdXJjZVNlcnZpY2VGYWN0b3J5KHNvdXJjZXM6IERpcmVjdGlvbnNTb3VyY2VbXSkge1xyXG4gIHJldHVybiBuZXcgRGlyZWN0aW9uc1NvdXJjZVNlcnZpY2Uoc291cmNlcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlRGlyZWN0aW9uc1NvdXJjZVNlcnZpY2UoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHByb3ZpZGU6IERpcmVjdGlvbnNTb3VyY2VTZXJ2aWNlLFxyXG4gICAgdXNlRmFjdG9yeTogZGlyZWN0aW9uc1NvdXJjZVNlcnZpY2VGYWN0b3J5LFxyXG4gICAgZGVwczogW0RpcmVjdGlvbnNTb3VyY2VdXHJcbiAgfTtcclxufVxyXG4iXX0=