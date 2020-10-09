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
export class LayerListBindingDirective {
    /**
     * @param {?} component
     * @param {?} mapService
     * @param {?} route
     */
    constructor(component, mapService, route) {
        this.mapService = mapService;
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
            this.setLayersVisibilityStatus(shownLayers, this.component.excludeBaseLayers);
        }));
    }
    /**
     * @private
     * @param {?} layers
     * @param {?} excludeBaseLayers
     * @return {?}
     */
    setLayersVisibilityStatus(layers, excludeBaseLayers) {
        if (this.layersVisibility$$ !== undefined) {
            this.layersVisibility$$.unsubscribe();
            this.layersVisibility$$ = undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1saXN0L2xheWVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFxQixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtuRCxNQUFNLE9BQU8seUJBQXlCOzs7Ozs7SUFLcEMsWUFDVSxTQUE2QixFQUM3QixVQUFzQixFQUNWLEtBQW1CO1FBRC9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDVixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBRXZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsYUFBYSxDQUFDO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxXQUFXO1NBQUMsQ0FDckQsQ0FBQyxJQUFJLENBQ0osWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUNqQixDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRTs7a0JBQ2pDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTs7OztZQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ25ELE9BQU8sS0FBSyxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUM7WUFDeEMsQ0FBQyxFQUFDO1lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLHlCQUF5QixDQUFDLE1BQWUsRUFBRSxpQkFBMEI7UUFDM0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxNQUFNO2FBQzNDLE1BQU07Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssaUJBQWlCLEVBQUU7YUFDdkQsR0FBRzs7OztRQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLENBQUM7YUFDdEMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLFFBQW1CLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQzthQUMzRCxTQUFTOzs7O1FBQUMsQ0FBQyxtQkFBNEIsRUFBRSxFQUFFLENBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLEVBQUMsQ0FBQztJQUNoRSxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUU7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7WUFwREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7YUFDbEM7Ozs7WUFOUSxrQkFBa0IsdUJBYXRCLElBQUk7WUFkQSxVQUFVO1lBRFYsWUFBWSx1QkFpQmhCLFFBQVE7Ozs7Ozs7SUFQWCw4Q0FBc0M7Ozs7O0lBQ3RDLCtEQUFpRDs7SUFDakQsdURBQWlDOzs7OztJQUkvQiwrQ0FBOEI7Ozs7O0lBQzlCLDBDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgU2VsZiwgT25Jbml0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IG1hcCwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvTGF5ZXJMaXN0QmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxpc3RCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBMYXllckxpc3RDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBsYXllcnNPclJlc29sdXRpb25DaGFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG4gIGxheWVyc1Zpc2liaWxpdHkkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgY29tcG9uZW50OiBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBPdmVycmlkZSBpbnB1dCBsYXllcnNcclxuICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IFtdO1xyXG4gICAgdGhpcy5sYXllcnNPclJlc29sdXRpb25DaGFuZ2UkJCA9IGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJCxcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kXVxyXG4gICAgKS5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWUoMTApXHJcbiAgICApLnN1YnNjcmliZSgoYnVuY2g6IFtMYXllcltdLCBudW1iZXJdKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNob3duTGF5ZXJzID0gYnVuY2hbMF0uZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gbGF5ZXIuc2hvd0luTGF5ZXJMaXN0ID09PSB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gc2hvd25MYXllcnM7XHJcbiAgICAgIHRoaXMuc2V0TGF5ZXJzVmlzaWJpbGl0eVN0YXR1cyhzaG93bkxheWVycywgdGhpcy5jb21wb25lbnQuZXhjbHVkZUJhc2VMYXllcnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldExheWVyc1Zpc2liaWxpdHlTdGF0dXMobGF5ZXJzOiBMYXllcltdLCBleGNsdWRlQmFzZUxheWVyczogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCA9IGNvbWJpbmVMYXRlc3QobGF5ZXJzXHJcbiAgICAgIC5maWx0ZXIobGF5ZXIgPT4gbGF5ZXIuYmFzZUxheWVyICE9PSBleGNsdWRlQmFzZUxheWVycyApXHJcbiAgICAgIC5tYXAoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIudmlzaWJsZSQpKVxyXG4gICAgICAucGlwZShtYXAoKHZpc2libGVzOiBib29sZWFuW10pID0+IHZpc2libGVzLmV2ZXJ5KEJvb2xlYW4pKSlcclxuICAgICAgLnN1YnNjcmliZSgoYWxsTGF5ZXJzQXJlVmlzaWJsZTogYm9vbGVhbikgPT5cclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5sYXllcnNBcmVBbGxWaXNpYmxlID0gYWxsTGF5ZXJzQXJlVmlzaWJsZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzT3JSZXNvbHV0aW9uQ2hhbmdlJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmICh0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJzVmlzaWJpbGl0eSQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19