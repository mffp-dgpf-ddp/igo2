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
        this.layersOrResolutionChange$$ = combineLatest([
            this.mapService.getMap().layers$,
            this.mapService.getMap().viewController.resolution$
        ]).pipe(debounceTime(10)).subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        (bunch) => {
            /** @type {?} */
            const shownLayers = bunch[0].filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                return layer.showInLayerList === true;
            }));
            this.component.layers = shownLayers;
            this.setLayersVisibilityRangeStatus(shownLayers, this.component.excludeBaseLayers);
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
     * @param {?} layers
     * @param {?} excludeBaseLayers
     * @return {?}
     */
    setLayersVisibilityRangeStatus(layers, excludeBaseLayers) {
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
        layer => layer.baseLayer !== excludeBaseLayers))
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.visible$)))
            .pipe(map((/**
         * @param {?} visibles
         * @return {?}
         */
        (visibles) => visibles.every(Boolean))))
            .subscribe((/**
         * @param {?} allLayersAreVisible
         * @return {?}
         */
        (allLayersAreVisible) => this.component.layersAreAllVisible = allLayersAreVisible));
        this.layersRange$$ = combineLatest(layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.isInResolutionsRange$)))
            .pipe(map((/**
         * @param {?} inrange
         * @return {?}
         */
        (inrange) => inrange.every(Boolean))))
            .subscribe((/**
         * @param {?} layersAreAllInRange
         * @return {?}
         */
        (layersAreAllInRange) => this.component.layersAreAllInRange = layersAreAllInRange));
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
                    !this.component.layersAreAllVisible) {
                    this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                    this.layerListService.onlyVisibleInitialized = true;
                }
                if (onlyInRangeFromUrl &&
                    !this.layerListService.onlyInRangeInitialized &&
                    !this.component.layersAreAllInRange) {
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
        this.layersOrResolutionChange$$.unsubscribe();
        if (this.layersVisibility$$ !== undefined) {
            this.layersVisibility$$.unsubscribe();
            this.layersVisibility$$ = undefined;
        }
        if (this.layersRange$$ !== undefined) {
            this.layersRange$$.unsubscribe();
            this.layersRange$$ = undefined;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1saXN0L2xheWVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFvQyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtuRCxNQUFNLE9BQU8seUJBQXlCOzs7Ozs7O0lBTXBDLFlBQ1UsU0FBNkIsRUFDN0IsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ3RCLEtBQW1CO1FBRi9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN0QixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBRXZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsYUFBYSxDQUFDO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxXQUFXO1NBQUMsQ0FDckQsQ0FBQyxJQUFJLENBQ0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUNqQixDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRTs7a0JBQ2pDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTs7OztZQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ25ELE9BQU8sS0FBSyxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUM7WUFDeEMsQ0FBQyxFQUFDO1lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUVPLDhCQUE4QixDQUFDLE1BQWUsRUFBRSxpQkFBMEI7UUFDaEYsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxNQUFNO2FBQzNDLE1BQU07Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssaUJBQWlCLEVBQUU7YUFDdkQsR0FBRzs7OztRQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLENBQUM7YUFDdEMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLFFBQW1CLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQzthQUMzRCxTQUFTOzs7O1FBQUMsQ0FBQyxtQkFBNEIsRUFBRSxFQUFFLENBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLEVBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUMsQ0FBQzthQUMxRixJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsT0FBa0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDO2FBQ3pELFNBQVM7Ozs7UUFBQyxDQUFDLG1CQUE0QixFQUFFLEVBQUUsQ0FDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsRUFBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNoQixJQUNFLElBQUksQ0FBQyxLQUFLO1lBQ1YsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7WUFBQyxNQUFNLENBQUMsRUFBRTs7c0JBRWxDLGNBQWMsR0FBRyxNQUFNLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFVLENBQUM7O3NCQUM3RCxrQkFBa0IsR0FBRyxNQUFNLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFVLENBQUM7O3NCQUNqRSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFVLENBQUM7O3NCQUNqRSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFVLENBQUM7Z0JBQ3ZFLElBQUksY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO29CQUMvRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztpQkFDakQ7Z0JBQ0QsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRTtvQkFDdkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxrQkFBa0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLGtCQUFrQjtvQkFDcEIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCO29CQUM3QyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDOUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztpQkFDckQ7Z0JBQ0QsSUFBSSxrQkFBa0I7b0JBQ3BCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQjtvQkFDN0MsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFO29CQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLGtCQUFrQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7aUJBQ3JEO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtZQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztTQUNyQztRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNoQztJQUNILENBQUM7OztZQTFHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjthQUNsQzs7OztZQVBRLGtCQUFrQix1QkFldEIsSUFBSTtZQWhCQSxVQUFVO1lBRVYsZ0JBQWdCO1lBSGhCLFlBQVksdUJBb0JoQixRQUFROzs7Ozs7O0lBVFgsOENBQXNDOzs7OztJQUN0QywrREFBaUQ7O0lBQ2pELHVEQUFpQzs7SUFDakMsa0RBQTRCOzs7OztJQUkxQiwrQ0FBOEI7Ozs7O0lBQzlCLHFEQUEwQzs7Ozs7SUFDMUMsMENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0U2VydmljZSB9IGZyb20gJy4vbGF5ZXItbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgbWFwLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29MYXllckxpc3RCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IExheWVyTGlzdENvbXBvbmVudDtcclxuICBwcml2YXRlIGxheWVyc09yUmVzb2x1dGlvbkNoYW5nZSQkOiBTdWJzY3JpcHRpb247XHJcbiAgbGF5ZXJzVmlzaWJpbGl0eSQkOiBTdWJzY3JpcHRpb247XHJcbiAgbGF5ZXJzUmFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgY29tcG9uZW50OiBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxheWVyTGlzdFNlcnZpY2U6IExheWVyTGlzdFNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBPdmVycmlkZSBpbnB1dCBsYXllcnNcclxuICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IFtdO1xyXG4gICAgdGhpcy5sYXllcnNPclJlc29sdXRpb25DaGFuZ2UkJCA9IGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJCxcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kXVxyXG4gICAgKS5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWUoMTApXHJcbiAgICApLnN1YnNjcmliZSgoYnVuY2g6IFtMYXllcltdLCBudW1iZXJdKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNob3duTGF5ZXJzID0gYnVuY2hbMF0uZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gbGF5ZXIuc2hvd0luTGF5ZXJMaXN0ID09PSB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gc2hvd25MYXllcnM7XHJcbiAgICAgIHRoaXMuc2V0TGF5ZXJzVmlzaWJpbGl0eVJhbmdlU3RhdHVzKHNob3duTGF5ZXJzLCB0aGlzLmNvbXBvbmVudC5leGNsdWRlQmFzZUxheWVycyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5pdFJvdXRlcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRMYXllcnNWaXNpYmlsaXR5UmFuZ2VTdGF0dXMobGF5ZXJzOiBMYXllcltdLCBleGNsdWRlQmFzZUxheWVyczogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYXllcnNSYW5nZSQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcnNSYW5nZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJzUmFuZ2UkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkID0gY29tYmluZUxhdGVzdChsYXllcnNcclxuICAgICAgLmZpbHRlcihsYXllciA9PiBsYXllci5iYXNlTGF5ZXIgIT09IGV4Y2x1ZGVCYXNlTGF5ZXJzIClcclxuICAgICAgLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci52aXNpYmxlJCkpXHJcbiAgICAgIC5waXBlKG1hcCgodmlzaWJsZXM6IGJvb2xlYW5bXSkgPT4gdmlzaWJsZXMuZXZlcnkoQm9vbGVhbikpKVxyXG4gICAgICAuc3Vic2NyaWJlKChhbGxMYXllcnNBcmVWaXNpYmxlOiBib29sZWFuKSA9PlxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxheWVyc0FyZUFsbFZpc2libGUgPSBhbGxMYXllcnNBcmVWaXNpYmxlKTtcclxuXHJcbiAgICB0aGlzLmxheWVyc1JhbmdlJCQgPSBjb21iaW5lTGF0ZXN0KGxheWVycy5tYXAoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2UkKSlcclxuICAgICAgLnBpcGUobWFwKChpbnJhbmdlOiBib29sZWFuW10pID0+IGlucmFuZ2UuZXZlcnkoQm9vbGVhbikpKVxyXG4gICAgICAuc3Vic2NyaWJlKChsYXllcnNBcmVBbGxJblJhbmdlOiBib29sZWFuKSA9PlxyXG4gICAgICB0aGlzLmNvbXBvbmVudC5sYXllcnNBcmVBbGxJblJhbmdlID0gbGF5ZXJzQXJlQWxsSW5SYW5nZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRSb3V0ZXMoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucm91dGUgJiZcclxuICAgICAgKHRoaXMucm91dGUub3B0aW9ucy5sbGNLS2V5IHx8IHRoaXMucm91dGUub3B0aW9ucy5sbGNBS2V5IHx8XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1ZLZXkgfHwgdGhpcy5yb3V0ZS5vcHRpb25zLmxsY1ZLZXkpKSB7XHJcbiAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleXdvcmRGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNLS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgY29uc3Qgc29ydGVkQXBsaGFGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNBS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgY29uc3Qgb25seVZpc2libGVGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNWS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgY29uc3Qgb25seUluUmFuZ2VGcm9tVXJsID0gcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5sbGNSS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgaWYgKGtleXdvcmRGcm9tVXJsICYmICF0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZCA9IGtleXdvcmRGcm9tVXJsO1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmRJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzb3J0ZWRBcGxoYUZyb21VcmwgJiYgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGEgPSBzb3J0ZWRBcGxoYUZyb21VcmwgPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ubHlWaXNpYmxlRnJvbVVybCAmJlxyXG4gICAgICAgICAgIXRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZUluaXRpYWxpemVkICYmXHJcbiAgICAgICAgICAhdGhpcy5jb21wb25lbnQubGF5ZXJzQXJlQWxsVmlzaWJsZSkge1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlID0gb25seVZpc2libGVGcm9tVXJsID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbmx5SW5SYW5nZUZyb21VcmwgJiZcclxuICAgICAgICAgICF0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZCAmJlxyXG4gICAgICAgICAgIXRoaXMuY29tcG9uZW50LmxheWVyc0FyZUFsbEluUmFuZ2UpIHtcclxuICAgICAgICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZSA9IG9ubHlJblJhbmdlRnJvbVVybCA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzT3JSZXNvbHV0aW9uQ2hhbmdlJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmICh0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGF5ZXJzUmFuZ2UkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzUmFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmxheWVyc1JhbmdlJCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=