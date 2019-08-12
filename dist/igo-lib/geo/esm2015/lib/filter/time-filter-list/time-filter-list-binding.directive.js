/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import { MapService } from '../../map/shared/map.service';
import { TimeFilterListComponent } from './time-filter-list.component';
export class TimeFilterListBindingDirective {
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
TimeFilterListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoTimeFilterListBinding]'
            },] }
];
/** @nocollapse */
TimeFilterListBindingDirective.ctorParameters = () => [
    { type: TimeFilterListComponent, decorators: [{ type: Self }] },
    { type: MapService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimeFilterListBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    TimeFilterListBindingDirective.prototype.layers$$;
    /**
     * @type {?}
     * @private
     */
    TimeFilterListBindingDirective.prototype.mapService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvdGltZS1maWx0ZXItbGlzdC90aW1lLWZpbHRlci1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBS3ZFLE1BQU0sT0FBTyw4QkFBOEI7Ozs7O0lBSXpDLFlBQ1UsU0FBa0MsRUFDbEMsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7OztZQXpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjthQUN2Qzs7OztZQUpRLHVCQUF1Qix1QkFVM0IsSUFBSTtZQVhBLFVBQVU7Ozs7Ozs7SUFPakIsbURBQTJDOzs7OztJQUMzQyxrREFBK0I7Ozs7O0lBSTdCLG9EQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgU2VsZiwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29UaW1lRmlsdGVyTGlzdEJpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZUZpbHRlckxpc3RCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBUaW1lRmlsdGVyTGlzdENvbXBvbmVudDtcclxuICBwcml2YXRlIGxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gT3ZlcnJpZGUgaW5wdXQgbGF5ZXJzXHJcbiAgICB0aGlzLmNvbXBvbmVudC5sYXllcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmxheWVycyQkID0gdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpLmxheWVycyQuc3Vic2NyaWJlKGxheWVycyA9PiB7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IGxheWVycztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxheWVycyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==