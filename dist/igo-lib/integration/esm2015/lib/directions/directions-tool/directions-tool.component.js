/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
let DirectionsToolComponent = class DirectionsToolComponent {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
    }
    /**
     * @return {?}
     */
    get map() {
        return this.mapState.map;
    }
};
DirectionsToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-directions-tool',
                template: "<igo-routing-form igoRoutingFormBinding></igo-routing-form>\r\n"
            }] }
];
/** @nocollapse */
DirectionsToolComponent.ctorParameters = () => [
    { type: MapState }
];
DirectionsToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'directions',
        title: 'igo.integration.tools.directions',
        icon: 'directions'
    }),
    tslib_1.__metadata("design:paramtypes", [MapState])
], DirectionsToolComponent);
export { DirectionsToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGlvbnMvZGlyZWN0aW9ucy10b29sL2RpcmVjdGlvbnMtdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0lBV2xDLHVCQUF1QixTQUF2Qix1QkFBdUI7Ozs7SUFLbEMsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7Ozs7SUFKMUMsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMzQixDQUFDO0NBR0YsQ0FBQTs7WUFWQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsMkVBQStDO2FBQ2hEOzs7O1lBVlEsUUFBUTs7QUFXSix1QkFBdUI7SUFUbkMsYUFBYSxDQUFDO1FBQ2IsSUFBSSxFQUFFLFlBQVk7UUFDbEIsS0FBSyxFQUFFLGtDQUFrQztRQUN6QyxJQUFJLEVBQUUsWUFBWTtLQUNuQixDQUFDOzZDQVU4QixRQUFRO0dBTDNCLHVCQUF1QixDQU1uQztTQU5ZLHVCQUF1Qjs7Ozs7O0lBS3RCLDJDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVG9vbENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTdGF0ZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc3RhdGUnO1xyXG5cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdkaXJlY3Rpb25zJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5kaXJlY3Rpb25zJyxcclxuICBpY29uOiAnZGlyZWN0aW9ucydcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZGlyZWN0aW9ucy10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGlyZWN0aW9ucy10b29sLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlyZWN0aW9uc1Rvb2xDb21wb25lbnQge1xyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLm1hcFN0YXRlLm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwU3RhdGU6IE1hcFN0YXRlKSB7fVxyXG59XHJcbiJdfQ==