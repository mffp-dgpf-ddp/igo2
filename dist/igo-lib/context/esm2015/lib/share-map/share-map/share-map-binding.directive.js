/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { LayerListService } from '@igo2/geo';
import { ShareMapComponent } from './share-map.component';
import { RouteService } from '@igo2/core';
export class ShareMapBindingDirective {
    /**
     * @param {?} component
     * @param {?} layerListService
     * @param {?} route
     */
    constructor(component, layerListService, route) {
        this.layerListService = layerListService;
        this.route = route;
        this.component = component;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initRoutes();
    }
    /**
     * @private
     * @return {?}
     */
    initRoutes() {
        if (this.route &&
            (this.route.options.llcKKey || this.route.options.llcAKey ||
                this.route.options.llcVKey || this.route.options.llcVKey)) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const keywordFromUrl = params[(/** @type {?} */ (this.route.options.llcKKey))];
                /** @type {?} */
                const sortedAplhaFromUrl = params[(/** @type {?} */ (this.route.options.llcAKey))];
                /** @type {?} */
                const onlyVisibleFromUrl = params[(/** @type {?} */ (this.route.options.llcVKey))];
                /** @type {?} */
                const onlyInRangeFromUrl = params[(/** @type {?} */ (this.route.options.llcRKey))];
                if (keywordFromUrl && !this.layerListService.keywordInitialized) {
                    this.layerListService.keyword = keywordFromUrl;
                    this.layerListService.keywordInitialized = true;
                }
                if (sortedAplhaFromUrl && !this.layerListService.sortedAlphaInitialized) {
                    this.layerListService.sortedAlpha = sortedAplhaFromUrl === '1' ? true : false;
                    this.layerListService.sortedAlphaInitialized = true;
                }
                if (onlyVisibleFromUrl && !this.layerListService.onlyVisibleInitialized) {
                    this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                    this.layerListService.onlyVisibleInitialized = true;
                }
                if (onlyInRangeFromUrl && !this.layerListService.onlyInRangeInitialized) {
                    this.layerListService.onlyInRange = onlyInRangeFromUrl === '1' ? true : false;
                    this.layerListService.onlyInRangeInitialized = true;
                }
                if (!this.component.hasApi) {
                    this.component.resetUrl();
                }
            }));
        }
    }
}
ShareMapBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoShareMapBinding]'
            },] }
];
/** @nocollapse */
ShareMapBindingDirective.ctorParameters = () => [
    { type: ShareMapComponent, decorators: [{ type: Self }] },
    { type: LayerListService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShareMapBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    ShareMapBindingDirective.prototype.layerListService;
    /**
     * @type {?}
     * @private
     */
    ShareMapBindingDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZS1tYXAvc2hhcmUtbWFwL3NoYXJlLW1hcC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQVUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBSzFDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQUduQyxZQUNVLFNBQTRCLEVBQzVCLGdCQUFrQyxFQUN0QixLQUFtQjtRQUQvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFFdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFTyxVQUFVO1FBQ2hCLElBQ0UsSUFBSSxDQUFDLEtBQUs7WUFDVixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2dCQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFOztzQkFFbEMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQzs7c0JBQzdELGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQzs7c0JBQ2pFLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQzs7c0JBQ2pFLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQztnQkFDdkUsSUFBSSxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7b0JBQy9ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO29CQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2lCQUNqRDtnQkFDRCxJQUFJLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFO29CQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLGtCQUFrQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7aUJBQ3JEO2dCQUNELElBQUksa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUU7b0JBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDOUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztpQkFDckQ7Z0JBQ0QsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRTtvQkFDdkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxrQkFBa0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQzNCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQWxERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjthQUNqQzs7OztZQUxRLGlCQUFpQix1QkFVckIsSUFBSTtZQVhBLGdCQUFnQjtZQUVoQixZQUFZLHVCQVdoQixRQUFROzs7Ozs7O0lBTFgsNkNBQXFDOzs7OztJQUluQyxvREFBMEM7Ozs7O0lBQzFDLHlDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgU2VsZiwgT25Jbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJMaXN0U2VydmljZSB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcbmltcG9ydCB7IFNoYXJlTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9zaGFyZS1tYXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29TaGFyZU1hcEJpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2hhcmVNYXBCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogU2hhcmVNYXBDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IFNoYXJlTWFwQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBsYXllckxpc3RTZXJ2aWNlOiBMYXllckxpc3RTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pbml0Um91dGVzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRSb3V0ZXMoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucm91dGUgJiZcclxuICAgICAgKHRoaXMucm91dGUub3B0aW9ucy5sbGNLS2V5IHx8IHRoaXMucm91dGUub3B0aW9ucy5sbGNBS2V5IHx8XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1ZLZXkgfHwgdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1ZLZXkpKSB7XHJcbiAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleXdvcmRGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNLS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgY29uc3Qgc29ydGVkQXBsaGFGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNBS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgY29uc3Qgb25seVZpc2libGVGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNWS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgY29uc3Qgb25seUluUmFuZ2VGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNSS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgaWYgKGtleXdvcmRGcm9tVXJsICYmICF0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZCA9IGtleXdvcmRGcm9tVXJsO1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmRJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzb3J0ZWRBcGxoYUZyb21VcmwgJiYgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGEgPSBzb3J0ZWRBcGxoYUZyb21VcmwgPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ubHlWaXNpYmxlRnJvbVVybCAmJiAhdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZSA9IG9ubHlWaXNpYmxlRnJvbVVybCA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob25seUluUmFuZ2VGcm9tVXJsICYmICF0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlID0gb25seUluUmFuZ2VGcm9tVXJsID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5jb21wb25lbnQuaGFzQXBpKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5yZXNldFVybCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==