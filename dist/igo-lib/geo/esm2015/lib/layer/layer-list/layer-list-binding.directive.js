/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { RouteService } from '@igo2/core';
import { MapService } from '../../map/shared/map.service';
import { LayerListComponent } from './layer-list.component';
import { LayerListService } from './layer-list.service';
export class LayerListBindingDirective {
    /**
     * @param {?} component
     * @param {?} mapService
     * @param {?} layerListService
     * @param {?} route
     */
    constructor(component, mapService, layerListService, route) {
        this.mapService = mapService;
        this.layerListService = layerListService;
        this.route = route;
        this.component = component;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input layers
        this.component.layers = [];
        this.layers$$ = this.mapService
            .getMap()
            .layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            this.component.layers = layers.filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                return layer.showInLayerList === true;
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
                if (onlyVisibleFromUrl &&
                    !this.layerListService.onlyVisibleInitialized &&
                    this.component.hasLayerNotVisible) {
                    this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                    this.layerListService.onlyVisibleInitialized = true;
                }
                if (onlyInRangeFromUrl &&
                    !this.layerListService.onlyInRangeInitialized &&
                    this.component.hasLayerOutOfRange) {
                    this.layerListService.onlyInRange = onlyInRangeFromUrl === '1' ? true : false;
                    this.layerListService.onlyInRangeInitialized = true;
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
}
LayerListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoLayerListBinding]'
            },] }
];
/** @nocollapse */
LayerListBindingDirective.ctorParameters = () => [
    { type: LayerListComponent, decorators: [{ type: Self }] },
    { type: MapService },
    { type: LayerListService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerListBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    LayerListBindingDirective.prototype.layers$$;
    /**
     * @type {?}
     * @private
     */
    LayerListBindingDirective.prototype.mapService;
    /**
     * @type {?}
     * @private
     */
    LayerListBindingDirective.prototype.layerListService;
    /**
     * @type {?}
     * @private
     */
    LayerListBindingDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1saXN0L2xheWVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFvQyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFNeEQsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7OztJQUlwQyxZQUNVLFNBQTZCLEVBQzdCLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUN0QixLQUFtQjtRQUYvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVTthQUM1QixNQUFNLEVBQUU7YUFDUixPQUFPLENBQUMsU0FBUzs7OztRQUFDLENBQUMsTUFBZSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLEtBQVksRUFBRSxFQUFFO2dCQUNyRCxPQUFPLEtBQUssQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDO1lBQ3hDLENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVPLFVBQVU7UUFDaEIsSUFDRSxJQUFJLENBQUMsS0FBSztZQUNWLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUU7O3NCQUVsQyxjQUFjLEdBQUcsTUFBTSxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBVSxDQUFDOztzQkFDN0Qsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBVSxDQUFDOztzQkFDakUsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBVSxDQUFDOztzQkFDakUsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBVSxDQUFDO2dCQUN2RSxJQUFJLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDL0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7b0JBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7aUJBQ2pEO2dCQUNELElBQUksa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUU7b0JBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDOUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztpQkFDckQ7Z0JBQ0QsSUFBSSxrQkFBa0I7b0JBQ3BCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQjtvQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxrQkFBa0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLGtCQUFrQjtvQkFDcEIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCO29CQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFO29CQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLGtCQUFrQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7aUJBQ3JEO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7WUF0RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7YUFDbEM7Ozs7WUFOUSxrQkFBa0IsdUJBWXRCLElBQUk7WUFiQSxVQUFVO1lBRVYsZ0JBQWdCO1lBSGhCLFlBQVksdUJBaUJoQixRQUFROzs7Ozs7O0lBUFgsOENBQXNDOzs7OztJQUN0Qyw2Q0FBK0I7Ozs7O0lBSTdCLCtDQUE4Qjs7Ozs7SUFDOUIscURBQTBDOzs7OztJQUMxQywwQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFNlbGYsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9sYXllci1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvTGF5ZXJMaXN0QmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxpc3RCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBMYXllckxpc3RDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBsYXllcnMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgY29tcG9uZW50OiBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxheWVyTGlzdFNlcnZpY2U6IExheWVyTGlzdFNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBPdmVycmlkZSBpbnB1dCBsYXllcnNcclxuICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IFtdO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcFNlcnZpY2VcclxuICAgICAgLmdldE1hcCgpXHJcbiAgICAgIC5sYXllcnMkLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gbGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXIuc2hvd0luTGF5ZXJMaXN0ID09PSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5pdFJvdXRlcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Um91dGVzKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJvdXRlICYmXHJcbiAgICAgICh0aGlzLnJvdXRlLm9wdGlvbnMubGxjS0tleSB8fCB0aGlzLnJvdXRlLm9wdGlvbnMubGxjQUtleSB8fFxyXG4gICAgICAgIHRoaXMucm91dGUub3B0aW9ucy5sbGNWS2V5IHx8IHRoaXMucm91dGUub3B0aW9ucy5sbGNWS2V5KSkge1xyXG4gICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBrZXl3b3JkRnJvbVVybCA9IHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMubGxjS0tleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGNvbnN0IHNvcnRlZEFwbGhhRnJvbVVybCA9IHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMubGxjQUtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGNvbnN0IG9ubHlWaXNpYmxlRnJvbVVybCA9IHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMubGxjVktleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGNvbnN0IG9ubHlJblJhbmdlRnJvbVVybCA9IHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMubGxjUktleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGlmIChrZXl3b3JkRnJvbVVybCAmJiAhdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmRJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmQgPSBrZXl3b3JkRnJvbVVybDtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc29ydGVkQXBsaGFGcm9tVXJsICYmICF0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGFJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhID0gc29ydGVkQXBsaGFGcm9tVXJsID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGFJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbmx5VmlzaWJsZUZyb21VcmwgJiZcclxuICAgICAgICAgICF0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZCAmJlxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuaGFzTGF5ZXJOb3RWaXNpYmxlKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGUgPSBvbmx5VmlzaWJsZUZyb21VcmwgPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ubHlJblJhbmdlRnJvbVVybCAmJlxyXG4gICAgICAgICAgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkICYmXHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5oYXNMYXllck91dE9mUmFuZ2UpIHtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZSA9IG9ubHlJblJhbmdlRnJvbVVybCA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==