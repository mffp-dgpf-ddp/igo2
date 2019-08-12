/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import { MapService } from '../../map/shared/map.service';
import { OgcFilterableListComponent } from './ogc-filterable-list.component';
var OgcFilterableListBindingDirective = /** @class */ (function () {
    function OgcFilterableListBindingDirective(component, mapService) {
        this.mapService = mapService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    OgcFilterableListBindingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Override input layers
        this.component.layers = [];
        this.layers$$ = this.mapService.getMap().layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        function (layers) {
            _this.component.layers = layers;
        }));
    };
    /**
     * @return {?}
     */
    OgcFilterableListBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layers$$.unsubscribe();
    };
    OgcFilterableListBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoOgcFilterableListBinding]'
                },] }
    ];
    /** @nocollapse */
    OgcFilterableListBindingDirective.ctorParameters = function () { return [
        { type: OgcFilterableListComponent, decorators: [{ type: Self }] },
        { type: MapService }
    ]; };
    return OgcFilterableListBindingDirective;
}());
export { OgcFilterableListBindingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlcmFibGUtbGlzdC9vZ2MtZmlsdGVyYWJsZS1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTdFO0lBT0UsMkNBQ1UsU0FBcUMsRUFDckMsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsb0RBQVE7OztJQUFSO1FBQUEsaUJBT0M7UUFOQyx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsTUFBTTtZQUMvRCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDakMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsdURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOztnQkF6QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwrQkFBK0I7aUJBQzFDOzs7O2dCQUpRLDBCQUEwQix1QkFVOUIsSUFBSTtnQkFYQSxVQUFVOztJQTZCbkIsd0NBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXZCWSxpQ0FBaUM7Ozs7OztJQUM1QyxzREFBOEM7Ozs7O0lBQzlDLHFEQUErQjs7Ozs7SUFJN0IsdURBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWxpc3QuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb09nY0ZpbHRlcmFibGVMaXN0QmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50O1xyXG4gIHByaXZhdGUgbGF5ZXJzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBPdmVycmlkZSBpbnB1dCBsYXllcnNcclxuICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IFtdO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJC5zdWJzY3JpYmUobGF5ZXJzID0+IHtcclxuICAgICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gbGF5ZXJzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19