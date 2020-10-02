/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { combineLatest } from 'rxjs';
import { RouteService } from '@igo2/core';
import { MapService } from '../../map/shared/map.service';
import { LayerListComponent } from './layer-list.component';
import { map, debounceTime } from 'rxjs/operators';
var LayerListBindingDirective = /** @class */ (function () {
    function LayerListBindingDirective(component, mapService, route) {
        this.mapService = mapService;
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
        // this.component.layers = [];
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
            _this.setLayersVisibilityStatus(shownLayers, _this.component.excludeBaseLayers);
        }));
    };
    /**
     * @private
     * @param {?} layers
     * @param {?} excludeBaseLayers
     * @return {?}
     */
    LayerListBindingDirective.prototype.setLayersVisibilityStatus = /**
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
    /**
     * @type {?}
     * @private
     */
    LayerListBindingDirective.prototype.mapService;
    /**
     * @type {?}
     * @private
     */
    LayerListBindingDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1saXN0L2xheWVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFxQixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRDtJQVFFLG1DQUNVLFNBQTZCLEVBQzdCLFVBQXNCLEVBQ1YsS0FBbUI7UUFEL0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNWLFVBQUssR0FBTCxLQUFLLENBQWM7UUFFdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELDRDQUFROzs7SUFBUjtRQUFBLGlCQWVDO1FBZEMsd0JBQXdCO1FBQ3hCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsMEJBQTBCLEdBQUcsYUFBYSxDQUFDO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxXQUFXO1NBQUMsQ0FDckQsQ0FBQyxJQUFJLENBQ0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUNqQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQXdCOztnQkFDN0IsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQyxLQUFZO2dCQUMvQyxPQUFPLEtBQUssQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDO1lBQ3hDLENBQUMsRUFBQztZQUNGLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztZQUNwQyxLQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoRixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyw2REFBeUI7Ozs7OztJQUFqQyxVQUFrQyxNQUFlLEVBQUUsaUJBQTBCO1FBQTdFLGlCQVdDO1FBVkMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxNQUFNO2FBQzNDLE1BQU07Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLEtBQUssaUJBQWlCLEVBQXJDLENBQXFDLEVBQUU7YUFDdkQsR0FBRzs7OztRQUFDLFVBQUMsS0FBWSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBZCxDQUFjLEVBQUMsQ0FBQzthQUN0QyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsUUFBbUIsSUFBSyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQXZCLENBQXVCLEVBQUMsQ0FBQzthQUMzRCxTQUFTOzs7O1FBQUMsVUFBQyxtQkFBNEI7WUFDdEMsT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQjtRQUF4RCxDQUF3RCxFQUFDLENBQUM7SUFDaEUsQ0FBQzs7OztJQUVELCtDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUU7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7U0FDckM7SUFDSCxDQUFDOztnQkFwREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDOzs7O2dCQU5RLGtCQUFrQix1QkFhdEIsSUFBSTtnQkFkQSxVQUFVO2dCQURWLFlBQVksdUJBaUJoQixRQUFROztJQTJDYixnQ0FBQztDQUFBLEFBdERELElBc0RDO1NBbkRZLHlCQUF5Qjs7Ozs7O0lBQ3BDLDhDQUFzQzs7Ozs7SUFDdEMsK0RBQWlEOztJQUNqRCx1REFBaUM7Ozs7O0lBSS9CLCtDQUE4Qjs7Ozs7SUFDOUIsMENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBPbkluaXQsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgbWFwLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29MYXllckxpc3RCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IExheWVyTGlzdENvbXBvbmVudDtcclxuICBwcml2YXRlIGxheWVyc09yUmVzb2x1dGlvbkNoYW5nZSQkOiBTdWJzY3JpcHRpb247XHJcbiAgbGF5ZXJzVmlzaWJpbGl0eSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IExheWVyTGlzdENvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIE92ZXJyaWRlIGlucHV0IGxheWVyc1xyXG4gICAgLy8gdGhpcy5jb21wb25lbnQubGF5ZXJzID0gW107XHJcbiAgICB0aGlzLmxheWVyc09yUmVzb2x1dGlvbkNoYW5nZSQkID0gY29tYmluZUxhdGVzdChbXHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5nZXRNYXAoKS5sYXllcnMkLFxyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiRdXHJcbiAgICApLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgxMClcclxuICAgICkuc3Vic2NyaWJlKChidW5jaDogW0xheWVyW10sIG51bWJlcl0pID0+IHtcclxuICAgICAgY29uc3Qgc2hvd25MYXllcnMgPSBidW5jaFswXS5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBsYXllci5zaG93SW5MYXllckxpc3QgPT09IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudC5sYXllcnMgPSBzaG93bkxheWVycztcclxuICAgICAgdGhpcy5zZXRMYXllcnNWaXNpYmlsaXR5U3RhdHVzKHNob3duTGF5ZXJzLCB0aGlzLmNvbXBvbmVudC5leGNsdWRlQmFzZUxheWVycyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0TGF5ZXJzVmlzaWJpbGl0eVN0YXR1cyhsYXllcnM6IExheWVyW10sIGV4Y2x1ZGVCYXNlTGF5ZXJzOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkID0gY29tYmluZUxhdGVzdChsYXllcnNcclxuICAgICAgLmZpbHRlcihsYXllciA9PiBsYXllci5iYXNlTGF5ZXIgIT09IGV4Y2x1ZGVCYXNlTGF5ZXJzIClcclxuICAgICAgLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci52aXNpYmxlJCkpXHJcbiAgICAgIC5waXBlKG1hcCgodmlzaWJsZXM6IGJvb2xlYW5bXSkgPT4gdmlzaWJsZXMuZXZlcnkoQm9vbGVhbikpKVxyXG4gICAgICAuc3Vic2NyaWJlKChhbGxMYXllcnNBcmVWaXNpYmxlOiBib29sZWFuKSA9PlxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxheWVyc0FyZUFsbFZpc2libGUgPSBhbGxMYXllcnNBcmVWaXNpYmxlKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXllcnNPclJlc29sdXRpb25DaGFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=