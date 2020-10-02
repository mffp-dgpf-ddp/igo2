/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import { combineLatest } from 'rxjs';
import { MapService } from '../../map/shared/map.service';
import { debounceTime } from 'rxjs/operators';
import { LayerLegendListComponent } from './layer-legend-list.component';
export class LayerLegendListBindingDirective {
    /**
     * @param {?} component
     * @param {?} mapService
     */
    constructor(component, mapService) {
        this.mapService = mapService;
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
            this.layersVisibility$$ = combineLatest(shownLayers
                .map((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => layer.visible$)))
                .subscribe((/**
             * @param {?} r
             * @return {?}
             */
            (r) => {
                this.component.change$.next();
            }));
        }));
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
LayerLegendListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoLayerLegendListBinding]'
            },] }
];
/** @nocollapse */
LayerLegendListBindingDirective.ctorParameters = () => [
    { type: LayerLegendListComponent, decorators: [{ type: Self }] },
    { type: MapService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLWxpc3QtYmluZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGVnZW5kLWxpc3QvbGF5ZXItbGVnZW5kLWxpc3QtYmluZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUErQixNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQWdCLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUduRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBS3pFLE1BQU0sT0FBTywrQkFBK0I7Ozs7O0lBSzFDLFlBQ1UsU0FBbUMsRUFDbkMsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLDBCQUEwQixHQUFHLGFBQWEsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU87WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxjQUFjLENBQUMsV0FBVztTQUFDLENBQ3JELENBQUMsSUFBSSxDQUNKLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FDakIsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUF3QixFQUFFLEVBQUU7O2tCQUNqQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLEtBQVksRUFBRSxFQUFFO2dCQUNuRCxPQUFPLEtBQUssQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDO1lBQ3hDLENBQUMsRUFBQztZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztZQUVwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxDQUFDLFdBQVc7aUJBQ2hELEdBQUc7Ozs7WUFBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxDQUFDO2lCQUN0QyxTQUFTOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEVBQ0EsQ0FBQztRQUNOLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7O1lBNUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOzs7O1lBSlEsd0JBQXdCLHVCQVc1QixJQUFJO1lBZEEsVUFBVTs7Ozs7OztJQVNqQixvREFBNEM7Ozs7O0lBQzVDLHFFQUFpRDs7SUFDakQsNkRBQWlDOzs7OztJQUkvQixxREFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFNlbGYsIE9uSW5pdCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTGF5ZXJMZWdlbmRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1sZWdlbmQtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvTGF5ZXJMZWdlbmRMaXN0QmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxlZ2VuZExpc3RCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBMYXllckxlZ2VuZExpc3RDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBsYXllcnNPclJlc29sdXRpb25DaGFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG4gIGxheWVyc1Zpc2liaWxpdHkkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgY29tcG9uZW50OiBMYXllckxlZ2VuZExpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBPdmVycmlkZSBpbnB1dCBsYXllcnNcclxuICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IFtdO1xyXG4gICAgdGhpcy5sYXllcnNPclJlc29sdXRpb25DaGFuZ2UkJCA9IGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJCxcclxuICAgICAgdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kXVxyXG4gICAgKS5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWUoMTApXHJcbiAgICApLnN1YnNjcmliZSgoYnVuY2g6IFtMYXllcltdLCBudW1iZXJdKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNob3duTGF5ZXJzID0gYnVuY2hbMF0uZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gbGF5ZXIuc2hvd0luTGF5ZXJMaXN0ID09PSB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gc2hvd25MYXllcnM7XHJcblxyXG4gICAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCA9IGNvbWJpbmVMYXRlc3Qoc2hvd25MYXllcnNcclxuICAgICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IGxheWVyLnZpc2libGUkKSlcclxuICAgICAgICAuc3Vic2NyaWJlKChyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGFuZ2UkLm5leHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxheWVyc09yUmVzb2x1dGlvbkNoYW5nZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBpZiAodGhpcy5sYXllcnNWaXNpYmlsaXR5JCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmxheWVyc1Zpc2liaWxpdHkkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==