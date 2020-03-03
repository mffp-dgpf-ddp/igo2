/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import { MapService } from '../../map/shared/map.service';
import { OgcFilterableListComponent } from './ogc-filterable-list.component';
export class OgcFilterableListBindingDirective {
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
        this.layers$$ = this.mapService.getMap().layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        layers => {
            this.component.layers = layers;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
}
OgcFilterableListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoOgcFilterableListBinding]'
            },] }
];
/** @nocollapse */
OgcFilterableListBindingDirective.ctorParameters = () => [
    { type: OgcFilterableListComponent, decorators: [{ type: Self }] },
    { type: MapService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OgcFilterableListBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableListBindingDirective.prototype.layers$$;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableListBindingDirective.prototype.mapService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlcmFibGUtbGlzdC9vZ2MtZmlsdGVyYWJsZS1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSzdFLE1BQU0sT0FBTyxpQ0FBaUM7Ozs7O0lBSTVDLFlBQ1UsU0FBcUMsRUFDckMsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7OztZQXpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjthQUMxQzs7OztZQUpRLDBCQUEwQix1QkFVOUIsSUFBSTtZQVhBLFVBQVU7Ozs7Ozs7SUFPakIsc0RBQThDOzs7OztJQUM5QyxxREFBK0I7Ozs7O0lBSTdCLHVEQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgU2VsZiwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyYWJsZS1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29PZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyYWJsZUxpc3RCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBPZ2NGaWx0ZXJhYmxlTGlzdENvbXBvbmVudDtcclxuICBwcml2YXRlIGxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gT3ZlcnJpZGUgaW5wdXQgbGF5ZXJzXHJcbiAgICB0aGlzLmNvbXBvbmVudC5sYXllcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmxheWVycyQkID0gdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpLmxheWVycyQuc3Vic2NyaWJlKGxheWVycyA9PiB7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IGxheWVycztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxheWVycyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==