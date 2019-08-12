/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
var DirectionsToolComponent = /** @class */ (function () {
    function DirectionsToolComponent(mapState) {
        this.mapState = mapState;
    }
    Object.defineProperty(DirectionsToolComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mapState.map;
        },
        enumerable: true,
        configurable: true
    });
    DirectionsToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-directions-tool',
                    template: "<igo-routing-form igoRoutingFormBinding></igo-routing-form>\r\n"
                }] }
    ];
    /** @nocollapse */
    DirectionsToolComponent.ctorParameters = function () { return [
        { type: MapState }
    ]; };
    DirectionsToolComponent = tslib_1.__decorate([
        ToolComponent({
            name: 'directions',
            title: 'igo.integration.tools.directions',
            icon: 'directions'
        }),
        tslib_1.__metadata("design:paramtypes", [MapState])
    ], DirectionsToolComponent);
    return DirectionsToolComponent;
}());
export { DirectionsToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGlvbnMvZGlyZWN0aW9ucy10b29sL2RpcmVjdGlvbnMtdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQWdCN0MsaUNBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBRyxDQUFDO0lBSjFDLHNCQUFJLHdDQUFHOzs7O1FBQVA7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQzNCLENBQUM7OztPQUFBOztnQkFQRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsMkVBQStDO2lCQUNoRDs7OztnQkFWUSxRQUFROztJQVdKLHVCQUF1QjtRQVRuQyxhQUFhLENBQUM7WUFDYixJQUFJLEVBQUUsWUFBWTtZQUNsQixLQUFLLEVBQUUsa0NBQWtDO1lBQ3pDLElBQUksRUFBRSxZQUFZO1NBQ25CLENBQUM7aURBVThCLFFBQVE7T0FMM0IsdUJBQXVCLENBTW5DO0lBQUQsOEJBQUM7Q0FBQSxJQUFBO1NBTlksdUJBQXVCOzs7Ozs7SUFLdEIsMkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IE1hcFN0YXRlIH0gZnJvbSAnLi4vLi4vbWFwL21hcC5zdGF0ZSc7XHJcblxyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ2RpcmVjdGlvbnMnLFxyXG4gIHRpdGxlOiAnaWdvLmludGVncmF0aW9uLnRvb2xzLmRpcmVjdGlvbnMnLFxyXG4gIGljb246ICdkaXJlY3Rpb25zJ1xyXG59KVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1kaXJlY3Rpb25zLXRvb2wnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kaXJlY3Rpb25zLXRvb2wuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25zVG9vbENvbXBvbmVudCB7XHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU3RhdGUubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXBTdGF0ZTogTWFwU3RhdGUpIHt9XHJcbn1cclxuIl19