/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Optional } from '@angular/core';
import { of, zip } from 'rxjs';
import { withLatestFrom, skip, filter } from 'rxjs/operators';
import { RouteService } from '@igo2/core';
import { MapBrowserComponent, LayerService } from '@igo2/geo';
import { ContextService } from './context.service';
var LayerContextDirective = /** @class */ (function () {
    function LayerContextDirective(component, contextService, layerService, route) {
        this.component = component;
        this.contextService = contextService;
        this.layerService = layerService;
        this.route = route;
        this.contextLayers = [];
    }
    Object.defineProperty(LayerContextDirective.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LayerContextDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.context$$ = this.contextService.context$
            .pipe(filter((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return context !== undefined; })))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return _this.handleContextChange(context); }));
        if (this.route &&
            this.route.options.visibleOnLayersKey &&
            this.route.options.visibleOffLayersKey &&
            this.route.options.contextKey) {
            /** @type {?} */
            var queryParams$$_1 = this.route.queryParams
                .pipe(skip(1))
                .subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                _this.queryParams = params;
                queryParams$$_1.unsubscribe();
            }));
        }
    };
    /**
     * @return {?}
     */
    LayerContextDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.context$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    LayerContextDirective.prototype.handleContextChange = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        if (context.layers === undefined) {
            return;
        }
        this.map.removeLayers(this.contextLayers);
        this.contextLayers = [];
        /** @type {?} */
        var layersAndIndex$ = zip.apply(void 0, tslib_1.__spread(context.layers.map((/**
         * @param {?} layerOptions
         * @param {?} index
         * @return {?}
         */
        function (layerOptions, index) {
            return _this.layerService.createAsyncLayer(layerOptions).pipe(withLatestFrom(of(index)));
        }))));
        layersAndIndex$.subscribe((/**
         * @param {?} layersAndIndex
         * @return {?}
         */
        function (layersAndIndex) {
            /** @type {?} */
            var layers = layersAndIndex.reduce((/**
             * @param {?} acc
             * @param {?} bunch
             * @return {?}
             */
            function (acc, bunch) {
                var _a = tslib_1.__read(bunch, 2), layer = _a[0], index = _a[1];
                layer.visible = _this.computeLayerVisibilityFromUrl(layer);
                layer.zIndex = layer.zIndex || index + 1; // Map indexes start at 1
                acc[index] = layer;
                return acc;
            }), new Array(layersAndIndex.length));
            _this.contextLayers = layers;
            _this.map.addLayers(layers);
        }));
    };
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    LayerContextDirective.prototype.computeLayerVisibilityFromUrl = /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var params = this.queryParams;
        /** @type {?} */
        var currentContext = this.contextService.context$.value.uri;
        /** @type {?} */
        var currentLayerid = layer.id;
        /** @type {?} */
        var visible = layer.visible;
        if (!params || !currentLayerid) {
            return visible;
        }
        /** @type {?} */
        var contextParams = params[(/** @type {?} */ (this.route.options.contextKey))];
        if (contextParams === currentContext || !contextParams) {
            /** @type {?} */
            var visibleOnLayersParams = '';
            /** @type {?} */
            var visibleOffLayersParams = '';
            /** @type {?} */
            var visiblelayers = [];
            /** @type {?} */
            var invisiblelayers = [];
            if (this.route.options.visibleOnLayersKey &&
                params[(/** @type {?} */ (this.route.options.visibleOnLayersKey))]) {
                visibleOnLayersParams =
                    params[(/** @type {?} */ (this.route.options.visibleOnLayersKey))];
            }
            if (this.route.options.visibleOffLayersKey &&
                params[(/** @type {?} */ (this.route.options.visibleOffLayersKey))]) {
                visibleOffLayersParams =
                    params[(/** @type {?} */ (this.route.options.visibleOffLayersKey))];
            }
            /* This order is important because to control whichever
             the order of * param. First whe open and close everything.*/
            if (visibleOnLayersParams === '*') {
                visible = true;
            }
            if (visibleOffLayersParams === '*') {
                visible = false;
            }
            // After, managing named layer by id (context.json OR id from datasource)
            visiblelayers = visibleOnLayersParams.split(',');
            invisiblelayers = visibleOffLayersParams.split(',');
            if (visiblelayers.indexOf(currentLayerid) > -1) {
                visible = true;
            }
            if (invisiblelayers.indexOf(currentLayerid) > -1) {
                visible = false;
            }
        }
        return visible;
    };
    LayerContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoLayerContext]'
                },] }
    ];
    /** @nocollapse */
    LayerContextDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent },
        { type: ContextService },
        { type: LayerService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    return LayerContextDirective;
}());
export { LayerContextDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.context$$;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.queryParams;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.contextLayers;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    LayerContextDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItY29udGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvbGF5ZXItY29udGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFnQixFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDMUMsT0FBTyxFQUVMLG1CQUFtQixFQUVuQixZQUFZLEVBRWIsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25EO0lBY0UsK0JBQ1UsU0FBOEIsRUFDOUIsY0FBOEIsRUFDOUIsWUFBMEIsRUFDZCxLQUFtQjtRQUgvQixjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBVmpDLGtCQUFhLEdBQVksRUFBRSxDQUFDO0lBV2pDLENBQUM7SUFUSixzQkFBSSxzQ0FBRzs7OztRQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7OztJQVNELHdDQUFROzs7SUFBUjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUTthQUMxQyxJQUFJLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsT0FBTyxJQUFJLE9B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QUNwRCxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDaEI7WUFDRCxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hELE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDakI7U0FDRjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQTNIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7Ozs7Z0JBWEMsbUJBQW1CO2dCQU1aLGNBQWM7Z0JBSnJCLFlBQVk7Z0JBTEwsWUFBWSx1QkE4QmhCLFFBQVE7O0lBMEdiLDRCQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0F6SFkscUJBQXFCOzs7Ozs7SUFFaEMsMENBQWdDOzs7OztJQUNoQyw0Q0FBeUI7Ozs7O0lBRXpCLDhDQUFvQzs7Ozs7SUFPbEMsMENBQXNDOzs7OztJQUN0QywrQ0FBc0M7Ozs7O0lBQ3RDLDZDQUFrQzs7Ozs7SUFDbEMsc0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgb2YsIHppcCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB3aXRoTGF0ZXN0RnJvbSwgc2tpcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSWdvTWFwLFxyXG4gIE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgTGF5ZXIsXHJcbiAgTGF5ZXJTZXJ2aWNlLFxyXG4gIExheWVyT3B0aW9uc1xyXG59IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGV0YWlsZWRDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29MYXllckNvbnRleHRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJDb250ZXh0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIGNvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgcXVlcnlQYXJhbXM6IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0TGF5ZXJzOiBMYXllcltdID0gW107XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JFxyXG4gICAgICAucGlwZShmaWx0ZXIoY29udGV4dCA9PiBjb250ZXh0ICE9PSB1bmRlZmluZWQpKVxyXG4gICAgICAuc3Vic2NyaWJlKGNvbnRleHQgPT4gdGhpcy5oYW5kbGVDb250ZXh0Q2hhbmdlKGNvbnRleHQpKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucm91dGUgJiZcclxuICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleSAmJlxyXG4gICAgICB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleSAmJlxyXG4gICAgICB0aGlzLnJvdXRlLm9wdGlvbnMuY29udGV4dEtleVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zJCQgPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXHJcbiAgICAgICAgLnBpcGUoc2tpcCgxKSlcclxuICAgICAgICAuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLnF1ZXJ5UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgICAgcXVlcnlQYXJhbXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVDb250ZXh0Q2hhbmdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgaWYgKGNvbnRleHQubGF5ZXJzID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXJzKHRoaXMuY29udGV4dExheWVycyk7XHJcbiAgICB0aGlzLmNvbnRleHRMYXllcnMgPSBbXTtcclxuXHJcbiAgICBjb25zdCBsYXllcnNBbmRJbmRleCQgPSB6aXAoLi4uY29udGV4dC5sYXllcnMubWFwKChsYXllck9wdGlvbnM6IExheWVyT3B0aW9ucywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllclNlcnZpY2UuY3JlYXRlQXN5bmNMYXllcihsYXllck9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgd2l0aExhdGVzdEZyb20ob2YoaW5kZXgpKVxyXG4gICAgICApO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGxheWVyc0FuZEluZGV4JC5zdWJzY3JpYmUoKGxheWVyc0FuZEluZGV4OiBbTGF5ZXIsIG51bWJlcl1bXSkgPT4ge1xyXG4gICAgICBjb25zdCBsYXllcnMgPSBsYXllcnNBbmRJbmRleC5yZWR1Y2UoKGFjYzogTGF5ZXJbXSwgYnVuY2g6IFtMYXllciwgbnVtYmVyXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtsYXllciwgaW5kZXhdID0gYnVuY2g7XHJcbiAgICAgICAgbGF5ZXIudmlzaWJsZSA9IHRoaXMuY29tcHV0ZUxheWVyVmlzaWJpbGl0eUZyb21VcmwobGF5ZXIpO1xyXG4gICAgICAgIGxheWVyLnpJbmRleCA9IGxheWVyLnpJbmRleCB8fCBpbmRleCArIDE7ICAvLyBNYXAgaW5kZXhlcyBzdGFydCBhdCAxXHJcbiAgICAgICAgYWNjW2luZGV4XSA9IGxheWVyO1xyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH0sIG5ldyBBcnJheShsYXllcnNBbmRJbmRleC5sZW5ndGgpKTtcclxuICAgICAgdGhpcy5jb250ZXh0TGF5ZXJzID0gbGF5ZXJzO1xyXG4gICAgICB0aGlzLm1hcC5hZGRMYXllcnMobGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJWaXNpYmlsaXR5RnJvbVVybChsYXllcjogTGF5ZXIpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucXVlcnlQYXJhbXM7XHJcbiAgICBjb25zdCBjdXJyZW50Q29udGV4dCA9IHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCQudmFsdWUudXJpO1xyXG4gICAgY29uc3QgY3VycmVudExheWVyaWQ6IHN0cmluZyA9IGxheWVyLmlkO1xyXG5cclxuICAgIGxldCB2aXNpYmxlID0gbGF5ZXIudmlzaWJsZTtcclxuICAgIGlmICghcGFyYW1zIHx8ICFjdXJyZW50TGF5ZXJpZCkge1xyXG4gICAgICByZXR1cm4gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250ZXh0UGFyYW1zID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5IGFzIHN0cmluZ107XHJcbiAgICBpZiAoY29udGV4dFBhcmFtcyA9PT0gY3VycmVudENvbnRleHQgfHwgIWNvbnRleHRQYXJhbXMpIHtcclxuICAgICAgbGV0IHZpc2libGVPbkxheWVyc1BhcmFtcyA9ICcnO1xyXG4gICAgICBsZXQgdmlzaWJsZU9mZkxheWVyc1BhcmFtcyA9ICcnO1xyXG4gICAgICBsZXQgdmlzaWJsZWxheWVyczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgbGV0IGludmlzaWJsZWxheWVyczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5ICYmXHJcbiAgICAgICAgcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT25MYXllcnNLZXkgYXMgc3RyaW5nXVxyXG4gICAgICApIHtcclxuICAgICAgICB2aXNpYmxlT25MYXllcnNQYXJhbXMgPVxyXG4gICAgICAgICAgcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT25MYXllcnNLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgJiZcclxuICAgICAgICBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgYXMgc3RyaW5nXVxyXG4gICAgICApIHtcclxuICAgICAgICB2aXNpYmxlT2ZmTGF5ZXJzUGFyYW1zID1cclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleSBhcyBzdHJpbmddO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBUaGlzIG9yZGVyIGlzIGltcG9ydGFudCBiZWNhdXNlIHRvIGNvbnRyb2wgd2hpY2hldmVyXHJcbiAgICAgICB0aGUgb3JkZXIgb2YgKiBwYXJhbS4gRmlyc3Qgd2hlIG9wZW4gYW5kIGNsb3NlIGV2ZXJ5dGhpbmcuKi9cclxuICAgICAgaWYgKHZpc2libGVPbkxheWVyc1BhcmFtcyA9PT0gJyonKSB7XHJcbiAgICAgICAgdmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZpc2libGVPZmZMYXllcnNQYXJhbXMgPT09ICcqJykge1xyXG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWZ0ZXIsIG1hbmFnaW5nIG5hbWVkIGxheWVyIGJ5IGlkIChjb250ZXh0Lmpzb24gT1IgaWQgZnJvbSBkYXRhc291cmNlKVxyXG4gICAgICB2aXNpYmxlbGF5ZXJzID0gdmlzaWJsZU9uTGF5ZXJzUGFyYW1zLnNwbGl0KCcsJyk7XHJcbiAgICAgIGludmlzaWJsZWxheWVycyA9IHZpc2libGVPZmZMYXllcnNQYXJhbXMuc3BsaXQoJywnKTtcclxuICAgICAgaWYgKHZpc2libGVsYXllcnMuaW5kZXhPZihjdXJyZW50TGF5ZXJpZCkgPiAtMSkge1xyXG4gICAgICAgIHZpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpbnZpc2libGVsYXllcnMuaW5kZXhPZihjdXJyZW50TGF5ZXJpZCkgPiAtMSkge1xyXG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2aXNpYmxlO1xyXG4gIH1cclxufVxyXG4iXX0=