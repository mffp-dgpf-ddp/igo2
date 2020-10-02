/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import { combineLatest } from 'rxjs';
import { MapService } from '../../map/shared/map.service';
import { debounceTime } from 'rxjs/operators';
import { LayerLegendListComponent } from './layer-legend-list.component';
var LayerLegendListBindingDirective = /** @class */ (function () {
    function LayerLegendListBindingDirective(component, mapService) {
        this.mapService = mapService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    LayerLegendListBindingDirective.prototype.ngOnInit = /**
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
            _this.layersVisibility$$ = combineLatest(shownLayers
                .map((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) { return layer.visible$; })))
                .subscribe((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                _this.component.change$.next();
            }));
        }));
    };
    /**
     * @return {?}
     */
    LayerLegendListBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layersOrResolutionChange$$.unsubscribe();
        if (this.layersVisibility$$ !== undefined) {
            this.layersVisibility$$.unsubscribe();
            this.layersVisibility$$ = undefined;
        }
    };
    LayerLegendListBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoLayerLegendListBinding]'
                },] }
    ];
    /** @nocollapse */
    LayerLegendListBindingDirective.ctorParameters = function () { return [
        { type: LayerLegendListComponent, decorators: [{ type: Self }] },
        { type: MapService }
    ]; };
    return LayerLegendListBindingDirective;
}());
export { LayerLegendListBindingDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerLegendListBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    LayerLegendListBindingDirective.prototype.layersOrResolutionChange$$;
    /** @type {?} */
    LayerLegendListBindingDirective.prototype.layersVisibility$$;
    /**
     * @type {?}
     * @private
     */
    LayerLegendListBindingDirective.prototype.mapService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLWxpc3QtYmluZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGVnZW5kLWxpc3QvbGF5ZXItbGVnZW5kLWxpc3QtYmluZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUErQixNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQWdCLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUduRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFO0lBUUUseUNBQ1UsU0FBbUMsRUFDbkMsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsa0RBQVE7OztJQUFSO1FBQUEsaUJBcUJDO1FBcEJDLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLDBCQUEwQixHQUFHLGFBQWEsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU87WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxjQUFjLENBQUMsV0FBVztTQUFDLENBQ3JELENBQUMsSUFBSSxDQUNKLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FDakIsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUF3Qjs7Z0JBQzdCLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTs7OztZQUFDLFVBQUMsS0FBWTtnQkFDL0MsT0FBTyxLQUFLLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQztZQUN4QyxDQUFDLEVBQUM7WUFDRixLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7WUFFcEMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxXQUFXO2lCQUNoRCxHQUFHOzs7O1lBQUMsVUFBQyxLQUFZLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFkLENBQWMsRUFBQyxDQUFDO2lCQUN0QyxTQUFTOzs7O1lBQUMsVUFBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hDLENBQUMsRUFDQSxDQUFDO1FBQ04sQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQscURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtZQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztTQUNyQztJQUNILENBQUM7O2dCQTVDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtpQkFDeEM7Ozs7Z0JBSlEsd0JBQXdCLHVCQVc1QixJQUFJO2dCQWRBLFVBQVU7O0lBbURuQixzQ0FBQztDQUFBLEFBOUNELElBOENDO1NBM0NZLCtCQUErQjs7Ozs7O0lBQzFDLG9EQUE0Qzs7Ozs7SUFDNUMscUVBQWlEOztJQUNqRCw2REFBaUM7Ozs7O0lBSS9CLHFEQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgU2VsZiwgT25Jbml0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBMYXllckxlZ2VuZExpc3RDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxlZ2VuZC1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29MYXllckxlZ2VuZExpc3RCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyTGVnZW5kTGlzdEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IExheWVyTGVnZW5kTGlzdENvbXBvbmVudDtcclxuICBwcml2YXRlIGxheWVyc09yUmVzb2x1dGlvbkNoYW5nZSQkOiBTdWJzY3JpcHRpb247XHJcbiAgbGF5ZXJzVmlzaWJpbGl0eSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IExheWVyTGVnZW5kTGlzdENvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIE92ZXJyaWRlIGlucHV0IGxheWVyc1xyXG4gICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gW107XHJcbiAgICB0aGlzLmxheWVyc09yUmVzb2x1dGlvbkNoYW5nZSQkID0gY29tYmluZUxhdGVzdChbXHJcbiAgICAgIHRoaXMubWFwU2VydmljZS5nZXRNYXAoKS5sYXllcnMkLFxyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiRdXHJcbiAgICApLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgxMClcclxuICAgICkuc3Vic2NyaWJlKChidW5jaDogW0xheWVyW10sIG51bWJlcl0pID0+IHtcclxuICAgICAgY29uc3Qgc2hvd25MYXllcnMgPSBidW5jaFswXS5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBsYXllci5zaG93SW5MYXllckxpc3QgPT09IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudC5sYXllcnMgPSBzaG93bkxheWVycztcclxuXHJcbiAgICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkID0gY29tYmluZUxhdGVzdChzaG93bkxheWVyc1xyXG4gICAgICAgIC5tYXAoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIudmlzaWJsZSQpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKHIpID0+IHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoYW5nZSQubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzT3JSZXNvbHV0aW9uQ2hhbmdlJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmICh0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19