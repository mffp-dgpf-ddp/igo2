/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { LayerListService } from '@igo2/geo';
import { ShareMapComponent } from './share-map.component';
import { RouteService } from '@igo2/core';
var ShareMapBindingDirective = /** @class */ (function () {
    function ShareMapBindingDirective(component, layerListService, route) {
        this.layerListService = layerListService;
        this.route = route;
        this.component = component;
    }
    /**
     * @return {?}
     */
    ShareMapBindingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initRoutes();
    };
    /**
     * @private
     * @return {?}
     */
    ShareMapBindingDirective.prototype.initRoutes = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.route &&
            (this.route.options.llcKKey || this.route.options.llcAKey ||
                this.route.options.llcVKey || this.route.options.llcVKey)) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                /** @type {?} */
                var keywordFromUrl = params[(/** @type {?} */ (_this.route.options.llcKKey))];
                /** @type {?} */
                var sortedAplhaFromUrl = params[(/** @type {?} */ (_this.route.options.llcAKey))];
                /** @type {?} */
                var onlyVisibleFromUrl = params[(/** @type {?} */ (_this.route.options.llcVKey))];
                /** @type {?} */
                var onlyInRangeFromUrl = params[(/** @type {?} */ (_this.route.options.llcRKey))];
                if (keywordFromUrl && !_this.layerListService.keywordInitialized) {
                    _this.layerListService.keyword = keywordFromUrl;
                    _this.layerListService.keywordInitialized = true;
                }
                if (sortedAplhaFromUrl && !_this.layerListService.sortedAlphaInitialized) {
                    _this.layerListService.sortedAlpha = sortedAplhaFromUrl === '1' ? true : false;
                    _this.layerListService.sortedAlphaInitialized = true;
                }
                if (onlyVisibleFromUrl && !_this.layerListService.onlyVisibleInitialized) {
                    _this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                    _this.layerListService.onlyVisibleInitialized = true;
                }
                if (onlyInRangeFromUrl && !_this.layerListService.onlyInRangeInitialized) {
                    _this.layerListService.onlyInRange = onlyInRangeFromUrl === '1' ? true : false;
                    _this.layerListService.onlyInRangeInitialized = true;
                }
                if (!_this.component.hasApi) {
                    _this.component.resetUrl();
                }
            }));
        }
    };
    ShareMapBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoShareMapBinding]'
                },] }
    ];
    /** @nocollapse */
    ShareMapBindingDirective.ctorParameters = function () { return [
        { type: ShareMapComponent, decorators: [{ type: Self }] },
        { type: LayerListService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    return ShareMapBindingDirective;
}());
export { ShareMapBindingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZS1tYXAvc2hhcmUtbWFwL3NoYXJlLW1hcC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQVUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTFDO0lBTUUsa0NBQ1UsU0FBNEIsRUFDNUIsZ0JBQWtDLEVBQ3RCLEtBQW1CO1FBRC9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRU8sNkNBQVU7Ozs7SUFBbEI7UUFBQSxpQkFnQ0M7UUEvQkMsSUFDRSxJQUFJLENBQUMsS0FBSztZQUNWLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxNQUFNOztvQkFFL0IsY0FBYyxHQUFHLE1BQU0sQ0FBQyxtQkFBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQzs7b0JBQzdELGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQzs7b0JBQ2pFLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQzs7b0JBQ2pFLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQVUsQ0FBQztnQkFDdkUsSUFBSSxjQUFjLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7b0JBQy9ELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO29CQUMvQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2lCQUNqRDtnQkFDRCxJQUFJLGtCQUFrQixJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFO29CQUN2RSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLGtCQUFrQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzlFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7aUJBQ3JEO2dCQUNELElBQUksa0JBQWtCLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUU7b0JBQ3ZFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDOUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztpQkFDckQ7Z0JBQ0QsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRTtvQkFDdkUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxrQkFBa0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUM5RSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQzFCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQzNCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2dCQWxERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtpQkFDakM7Ozs7Z0JBTFEsaUJBQWlCLHVCQVVyQixJQUFJO2dCQVhBLGdCQUFnQjtnQkFFaEIsWUFBWSx1QkFXaEIsUUFBUTs7SUEwQ2IsK0JBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQWhEWSx3QkFBd0I7Ozs7OztJQUNuQyw2Q0FBcUM7Ozs7O0lBSW5DLG9EQUEwQzs7Ozs7SUFDMUMseUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllckxpc3RTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuaW1wb3J0IHsgU2hhcmVNYXBDb21wb25lbnQgfSBmcm9tICcuL3NoYXJlLW1hcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1NoYXJlTWFwQmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZU1hcEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBTaGFyZU1hcENvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogU2hhcmVNYXBDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGxheWVyTGlzdFNlcnZpY2U6IExheWVyTGlzdFNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmluaXRSb3V0ZXMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFJvdXRlcygpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yb3V0ZSAmJlxyXG4gICAgICAodGhpcy5yb3V0ZS5vcHRpb25zLmxsY0tLZXkgfHwgdGhpcy5yb3V0ZS5vcHRpb25zLmxsY0FLZXkgfHxcclxuICAgICAgICB0aGlzLnJvdXRlLm9wdGlvbnMubGxjVktleSB8fCB0aGlzLnJvdXRlLm9wdGlvbnMubGxjVktleSkpIHtcclxuICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHJcbiAgICAgICAgY29uc3Qga2V5d29yZEZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY0tLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBjb25zdCBzb3J0ZWRBcGxoYUZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY0FLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBjb25zdCBvbmx5VmlzaWJsZUZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1ZLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBjb25zdCBvbmx5SW5SYW5nZUZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1JLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBpZiAoa2V5d29yZEZyb21VcmwgJiYgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkID0ga2V5d29yZEZyb21Vcmw7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNvcnRlZEFwbGhhRnJvbVVybCAmJiAhdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYSA9IHNvcnRlZEFwbGhhRnJvbVVybCA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob25seVZpc2libGVGcm9tVXJsICYmICF0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlID0gb25seVZpc2libGVGcm9tVXJsID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbmx5SW5SYW5nZUZyb21VcmwgJiYgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2UgPSBvbmx5SW5SYW5nZUZyb21VcmwgPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudC5oYXNBcGkpIHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnJlc2V0VXJsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19