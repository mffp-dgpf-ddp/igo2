/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { combineLatest } from 'rxjs';
import { RouteService } from '@igo2/core';
import { MapService } from '../../map/shared/map.service';
import { LayerListComponent } from './layer-list.component';
import { LayerListService } from './layer-list.service';
import { map, debounceTime } from 'rxjs/operators';
var LayerListBindingDirective = /** @class */ (function () {
    function LayerListBindingDirective(component, mapService, layerListService, route) {
        this.mapService = mapService;
        this.layerListService = layerListService;
        this.route = route;
        this.component = component;
    }
    /**
     * @return {?}
     */
    LayerListBindingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Override input layers
        this.component.layers = [];
        this.layersOrResolutionChange$$ = combineLatest([
            this.mapService.getMap().layers$,
            this.mapService.getMap().viewController.resolution$
        ]).pipe(debounceTime(10)).subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        function (bunch) {
            /** @type {?} */
            var shownLayers = bunch[0].filter((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                return layer.showInLayerList === true;
            }));
            _this.component.layers = shownLayers;
            _this.setLayersVisibilityRangeStatus(shownLayers, _this.component.excludeBaseLayers);
        }));
    };
    /**
     * @return {?}
     */
    LayerListBindingDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initRoutes();
    };
    /**
     * @private
     * @param {?} layers
     * @param {?} excludeBaseLayers
     * @return {?}
     */
    LayerListBindingDirective.prototype.setLayersVisibilityRangeStatus = /**
     * @private
     * @param {?} layers
     * @param {?} excludeBaseLayers
     * @return {?}
     */
    function (layers, excludeBaseLayers) {
        var _this = this;
        if (this.layersVisibility$$ !== undefined) {
            this.layersVisibility$$.unsubscribe();
            this.layersVisibility$$ = undefined;
        }
        if (this.layersRange$$ !== undefined) {
            this.layersRange$$.unsubscribe();
            this.layersRange$$ = undefined;
        }
        this.layersVisibility$$ = combineLatest(layers
            .filter((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.baseLayer !== excludeBaseLayers; }))
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.visible$; })))
            .pipe(map((/**
         * @param {?} visibles
         * @return {?}
         */
        function (visibles) { return visibles.every(Boolean); })))
            .subscribe((/**
         * @param {?} allLayersAreVisible
         * @return {?}
         */
        function (allLayersAreVisible) {
            return _this.component.layersAreAllVisible = allLayersAreVisible;
        }));
        this.layersRange$$ = combineLatest(layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.isInResolutionsRange$; })))
            .pipe(map((/**
         * @param {?} inrange
         * @return {?}
         */
        function (inrange) { return inrange.every(Boolean); })))
            .subscribe((/**
         * @param {?} layersAreAllInRange
         * @return {?}
         */
        function (layersAreAllInRange) {
            return _this.component.layersAreAllInRange = layersAreAllInRange;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    LayerListBindingDirective.prototype.initRoutes = /**
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
                if (onlyVisibleFromUrl &&
                    !_this.layerListService.onlyVisibleInitialized &&
                    !_this.component.layersAreAllVisible) {
                    _this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                    _this.layerListService.onlyVisibleInitialized = true;
                }
                if (onlyInRangeFromUrl &&
                    !_this.layerListService.onlyInRangeInitialized &&
                    !_this.component.layersAreAllInRange) {
                    _this.layerListService.onlyInRange = onlyInRangeFromUrl === '1' ? true : false;
                    _this.layerListService.onlyInRangeInitialized = true;
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    LayerListBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layersOrResolutionChange$$.unsubscribe();
        if (this.layersVisibility$$ !== undefined) {
            this.layersVisibility$$.unsubscribe();
            this.layersVisibility$$ = undefined;
        }
        if (this.layersRange$$ !== undefined) {
            this.layersRange$$.unsubscribe();
            this.layersRange$$ = undefined;
        }
    };
    LayerListBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoLayerListBinding]'
                },] }
    ];
    /** @nocollapse */
    LayerListBindingDirective.ctorParameters = function () { return [
        { type: LayerListComponent, decorators: [{ type: Self }] },
        { type: MapService },
        { type: LayerListService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    return LayerListBindingDirective;
}());
export { LayerListBindingDirective };
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
    LayerListBindingDirective.prototype.layersOrResolutionChange$$;
    /** @type {?} */
    LayerListBindingDirective.prototype.layersVisibility$$;
    /** @type {?} */
    LayerListBindingDirective.prototype.layersRange$$;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1saXN0L2xheWVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFvQyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRDtJQVNFLG1DQUNVLFNBQTZCLEVBQzdCLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUN0QixLQUFtQjtRQUYvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsNENBQVE7OztJQUFSO1FBQUEsaUJBZUM7UUFkQyx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxhQUFhLENBQUM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMs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RDs7SUFDakQsdURBQWlDOztJQUNqQyxrREFBNEI7Ozs7O0lBSTFCLCtDQUE4Qjs7Ozs7SUFDOUIscURBQTBDOzs7OztJQUMxQywwQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFNlbGYsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9sYXllci1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBtYXAsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0xheWVyTGlzdEJpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogTGF5ZXJMaXN0Q29tcG9uZW50O1xyXG4gIHByaXZhdGUgbGF5ZXJzT3JSZXNvbHV0aW9uQ2hhbmdlJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBsYXllcnNWaXNpYmlsaXR5JCQ6IFN1YnNjcmlwdGlvbjtcclxuICBsYXllcnNSYW5nZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IExheWVyTGlzdENvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgbGF5ZXJMaXN0U2VydmljZTogTGF5ZXJMaXN0U2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIE92ZXJyaWRlIGlucHV0IGxheWVyc1xyXG4gICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gW107XHJcbiAgICB0aGlzLmxheWVyc09yUmVzb2x1dGlvbkNoYW5nZSQkID0gY29tYmluZUxhdGVzdChbXHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5nZXRNYXAoKS5sYXllcnMkLFxyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiRdXHJcbiAgICApLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgxMClcclxuICAgICkuc3Vic2NyaWJlKChidW5jaDogW0xheWVyW10sIG51bWJlcl0pID0+IHtcclxuICAgICAgY29uc3Qgc2hvd25MYXllcnMgPSBidW5jaFswXS5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBsYXllci5zaG93SW5MYXllckxpc3QgPT09IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudC5sYXllcnMgPSBzaG93bkxheWVycztcclxuICAgICAgdGhpcy5zZXRMYXllcnNWaXNpYmlsaXR5UmFuZ2VTdGF0dXMoc2hvd25MYXllcnMsIHRoaXMuY29tcG9uZW50LmV4Y2x1ZGVCYXNlTGF5ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbml0Um91dGVzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldExheWVyc1Zpc2liaWxpdHlSYW5nZVN0YXR1cyhsYXllcnM6IExheWVyW10sIGV4Y2x1ZGVCYXNlTGF5ZXJzOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxheWVyc1JhbmdlJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyc1JhbmdlJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5sYXllcnNSYW5nZSQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgPSBjb21iaW5lTGF0ZXN0KGxheWVyc1xyXG4gICAgICAuZmlsdGVyKGxheWVyID0+IGxheWVyLmJhc2VMYXllciAhPT0gZXhjbHVkZUJhc2VMYXllcnMgKVxyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IGxheWVyLnZpc2libGUkKSlcclxuICAgICAgLnBpcGUobWFwKCh2aXNpYmxlczogYm9vbGVhbltdKSA9PiB2aXNpYmxlcy5ldmVyeShCb29sZWFuKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGFsbExheWVyc0FyZVZpc2libGU6IGJvb2xlYW4pID0+XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubGF5ZXJzQXJlQWxsVmlzaWJsZSA9IGFsbExheWVyc0FyZVZpc2libGUpO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzUmFuZ2UkJCA9IGNvbWJpbmVMYXRlc3QobGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSQpKVxyXG4gICAgICAucGlwZShtYXAoKGlucmFuZ2U6IGJvb2xlYW5bXSkgPT4gaW5yYW5nZS5ldmVyeShCb29sZWFuKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGxheWVyc0FyZUFsbEluUmFuZ2U6IGJvb2xlYW4pID0+XHJcbiAgICAgIHRoaXMuY29tcG9uZW50LmxheWVyc0FyZUFsbEluUmFuZ2UgPSBsYXllcnNBcmVBbGxJblJhbmdlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFJvdXRlcygpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yb3V0ZSAmJlxyXG4gICAgICAodGhpcy5yb3V0ZS5vcHRpb25zLmxsY0tLZXkgfHwgdGhpcy5yb3V0ZS5vcHRpb25zLmxsY0FLZXkgfHxcclxuICAgICAgICB0aGlzLnJvdXRlLm9wdGlvbnMubGxjVktleSB8fCB0aGlzLnJvdXRlLm9wdGlvbnMubGxjVktleSkpIHtcclxuICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHJcbiAgICAgICAgY29uc3Qga2V5d29yZEZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY0tLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBjb25zdCBzb3J0ZWRBcGxoYUZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY0FLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBjb25zdCBvbmx5VmlzaWJsZUZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1ZLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBjb25zdCBvbmx5SW5SYW5nZUZyb21VcmwgPSBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1JLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBpZiAoa2V5d29yZEZyb21VcmwgJiYgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkID0ga2V5d29yZEZyb21Vcmw7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNvcnRlZEFwbGhhRnJvbVVybCAmJiAhdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYSA9IHNvcnRlZEFwbGhhRnJvbVVybCA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob25seVZpc2libGVGcm9tVXJsICYmXHJcbiAgICAgICAgICAhdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgJiZcclxuICAgICAgICAgICF0aGlzLmNvbXBvbmVudC5sYXllcnNBcmVBbGxWaXNpYmxlKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGUgPSBvbmx5VmlzaWJsZUZyb21VcmwgPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ubHlJblJhbmdlRnJvbVVybCAmJlxyXG4gICAgICAgICAgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkICYmXHJcbiAgICAgICAgICAhdGhpcy5jb21wb25lbnQubGF5ZXJzQXJlQWxsSW5SYW5nZSkge1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlID0gb25seUluUmFuZ2VGcm9tVXJsID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXllcnNPclJlc29sdXRpb25DaGFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYXllcnNSYW5nZSQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcnNSYW5nZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJzUmFuZ2UkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==