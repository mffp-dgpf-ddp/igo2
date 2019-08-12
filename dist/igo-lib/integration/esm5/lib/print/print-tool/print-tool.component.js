/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
var PrintToolComponent = /** @class */ (function () {
    function PrintToolComponent(mapState) {
        this.mapState = mapState;
    }
    Object.defineProperty(PrintToolComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mapState.map;
        },
        enumerable: true,
        configurable: true
    });
    PrintToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-print-tool',
                    template: "<igo-print [map]=\"map\"></igo-print>\r\n"
                }] }
    ];
    /** @nocollapse */
    PrintToolComponent.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    PrintToolComponent = tslib_1.__decorate([
        ToolComponent({
            name: 'print',
            title: 'igo.integration.tools.print',
            icon: 'printer'
        }),
        tslib_1.__metadata("design:paramtypes", [MapState])
    ], PrintToolComponent);
    return PrintToolComponent;
}());
export { PrintToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PrintToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9wcmludC10b29sL3ByaW50LXRvb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFnQjdDLDRCQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQUoxQyxzQkFBSSxtQ0FBRzs7OztRQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTs7Z0JBUEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLHFEQUEwQztpQkFDM0M7Ozs7Z0JBVlEsUUFBUTs7SUFXSixrQkFBa0I7UUFUOUIsYUFBYSxDQUFDO1lBQ2IsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsNkJBQTZCO1lBQ3BDLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7aURBVThCLFFBQVE7T0FMM0Isa0JBQWtCLENBTTlCO0lBQUQseUJBQUM7Q0FBQSxJQUFBO1NBTlksa0JBQWtCOzs7Ozs7SUFLakIsc0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IE1hcFN0YXRlIH0gZnJvbSAnLi4vLi4vbWFwL21hcC5zdGF0ZSc7XHJcblxyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ3ByaW50JyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5wcmludCcsXHJcbiAgaWNvbjogJ3ByaW50ZXInXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXByaW50LXRvb2wnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmludC10b29sLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpbnRUb29sQ29tcG9uZW50IHtcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBTdGF0ZS5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcFN0YXRlOiBNYXBTdGF0ZSkge31cclxufVxyXG4iXX0=