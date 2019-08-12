/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
let PrintToolComponent = class PrintToolComponent {
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
PrintToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-print-tool',
                template: "<igo-print [map]=\"map\"></igo-print>\r\n"
            }] }
];
/** @nocollapse */
PrintToolComponent.ctorParameters = () => [
    { type: MapState }
];
PrintToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'print',
        title: 'igo.integration.tools.print',
        icon: 'printer'
    }),
    tslib_1.__metadata("design:paramtypes", [MapState])
], PrintToolComponent);
export { PrintToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PrintToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9wcmludC10b29sL3ByaW50LXRvb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztJQVdsQyxrQkFBa0IsU0FBbEIsa0JBQWtCOzs7O0lBSzdCLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBRyxDQUFDOzs7O0lBSjFDLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFDM0IsQ0FBQztDQUdGLENBQUE7O1lBVkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLHFEQUEwQzthQUMzQzs7OztZQVZRLFFBQVE7O0FBV0osa0JBQWtCO0lBVDlCLGFBQWEsQ0FBQztRQUNiLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFLDZCQUE2QjtRQUNwQyxJQUFJLEVBQUUsU0FBUztLQUNoQixDQUFDOzZDQVU4QixRQUFRO0dBTDNCLGtCQUFrQixDQU05QjtTQU5ZLGtCQUFrQjs7Ozs7O0lBS2pCLHNDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVG9vbENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTdGF0ZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc3RhdGUnO1xyXG5cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdwcmludCcsXHJcbiAgdGl0bGU6ICdpZ28uaW50ZWdyYXRpb24udG9vbHMucHJpbnQnLFxyXG4gIGljb246ICdwcmludGVyJ1xyXG59KVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1wcmludC10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHJpbnQtdG9vbC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFByaW50VG9vbENvbXBvbmVudCB7XHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU3RhdGUubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTdGF0ZTogTWFwU3RhdGUpIHt9XHJcbn1cclxuIl19