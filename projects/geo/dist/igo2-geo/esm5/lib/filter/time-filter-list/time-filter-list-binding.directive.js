/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import { MapService } from '../../map/shared/map.service';
import { TimeFilterListComponent } from './time-filter-list.component';
var TimeFilterListBindingDirective = /** @class */ (function () {
    function TimeFilterListBindingDirective(component, mapService) {
        this.mapService = mapService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    TimeFilterListBindingDirective.prototype.ngOnInit = /**
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
    TimeFilterListBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layers$$.unsubscribe();
    };
    TimeFilterListBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoTimeFilterListBinding]'
                },] }
    ];
    /** @nocollapse */
    TimeFilterListBindingDirective.ctorParameters = function () { return [
        { type: TimeFilterListComponent, decorators: [{ type: Self }] },
        { type: MapService }
    ]; };
    return TimeFilterListBindingDirective;
}());
export { TimeFilterListBindingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvdGltZS1maWx0ZXItbGlzdC90aW1lLWZpbHRlci1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZFO0lBT0Usd0NBQ1UsU0FBa0MsRUFDbEMsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsaURBQVE7OztJQUFSO1FBQUEsaUJBT0M7UUFOQyx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsTUFBTTtZQUMvRCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDakMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsb0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOztnQkF6QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7aUJBQ3ZDOzs7O2dCQUpRLHVCQUF1Qix1QkFVM0IsSUFBSTtnQkFYQSxVQUFVOztJQTZCbkIscUNBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXZCWSw4QkFBOEI7Ozs7OztJQUN6QyxtREFBMkM7Ozs7O0lBQzNDLGtEQUErQjs7Ozs7SUFJN0Isb0RBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWxpc3QuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1RpbWVGaWx0ZXJMaXN0QmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lRmlsdGVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50O1xyXG4gIHByaXZhdGUgbGF5ZXJzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogVGltZUZpbHRlckxpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBPdmVycmlkZSBpbnB1dCBsYXllcnNcclxuICAgIHRoaXMuY29tcG9uZW50LmxheWVycyA9IFtdO1xyXG5cclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJC5zdWJzY3JpYmUobGF5ZXJzID0+IHtcclxuICAgICAgdGhpcy5jb21wb25lbnQubGF5ZXJzID0gbGF5ZXJzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19