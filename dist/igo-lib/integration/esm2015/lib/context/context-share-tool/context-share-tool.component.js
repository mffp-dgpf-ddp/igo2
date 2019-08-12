/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
let ContextShareToolComponent = class ContextShareToolComponent {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
        this.hasCopyLinkButton = false;
        this.hasShareMapButton = true;
    }
    /**
     * @return {?}
     */
    get map() { return this.mapState.map; }
};
ContextShareToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-share-tool',
                template: "<igo-share-map\r\n  igoShareMapBinding\r\n  [map]=\"map\"\r\n  [hasCopyLinkButton]=\"hasCopyLinkButton\"\r\n  [hasShareMapButton]=\"hasShareMapButton\"\r\n></igo-share-map>\r\n"
            }] }
];
/** @nocollapse */
ContextShareToolComponent.ctorParameters = () => [
    { type: MapState }
];
ContextShareToolComponent.propDecorators = {
    hasCopyLinkButton: [{ type: Input }],
    hasShareMapButton: [{ type: Input }]
};
ContextShareToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'shareMap',
        title: 'igo.integration.tools.shareMap',
        icon: 'share-variant'
    }),
    tslib_1.__metadata("design:paramtypes", [MapState])
], ContextShareToolComponent);
export { ContextShareToolComponent };
if (false) {
    /** @type {?} */
    ContextShareToolComponent.prototype.hasCopyLinkButton;
    /** @type {?} */
    ContextShareToolComponent.prototype.hasShareMapButton;
    /**
     * @type {?}
     * @private
     */
    ContextShareToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1zaGFyZS10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQvY29udGV4dC1zaGFyZS10b29sL2NvbnRleHQtc2hhcmUtdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztJQVdsQyx5QkFBeUIsU0FBekIseUJBQXlCOzs7O0lBT3BDLFlBQ1UsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVBuQixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFbkMsc0JBQWlCLEdBQVksSUFBSSxDQUFDO0lBTXhDLENBQUM7Ozs7SUFKSixJQUFJLEdBQUcsS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUtoRCxDQUFBOztZQWRBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyw0TEFBa0Q7YUFDbkQ7Ozs7WUFWUSxRQUFROzs7Z0NBWWQsS0FBSztnQ0FFTCxLQUFLOztBQUhLLHlCQUF5QjtJQVRyQyxhQUFhLENBQUM7UUFDYixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsZ0NBQWdDO1FBQ3ZDLElBQUksRUFBRSxlQUFlO0tBQ3RCLENBQUM7NkNBYW9CLFFBQVE7R0FSakIseUJBQXlCLENBVXJDO1NBVlkseUJBQXlCOzs7SUFDcEMsc0RBQTRDOztJQUU1QyxzREFBMkM7Ozs7O0lBS3pDLDZDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgTWFwU3RhdGUgfSBmcm9tICcuLi8uLi9tYXAvbWFwLnN0YXRlJztcclxuXHJcbkBUb29sQ29tcG9uZW50KHtcclxuICBuYW1lOiAnc2hhcmVNYXAnLFxyXG4gIHRpdGxlOiAnaWdvLmludGVncmF0aW9uLnRvb2xzLnNoYXJlTWFwJyxcclxuICBpY29uOiAnc2hhcmUtdmFyaWFudCdcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1zaGFyZS10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1zaGFyZS10b29sLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dFNoYXJlVG9vbENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgaGFzQ29weUxpbmtCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgaGFzU2hhcmVNYXBCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBnZXQgbWFwKCk6IElnb01hcCB7IHJldHVybiB0aGlzLm1hcFN0YXRlLm1hcDsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWFwU3RhdGU6IE1hcFN0YXRlXHJcbiAgKSB7fVxyXG59XHJcbiJdfQ==