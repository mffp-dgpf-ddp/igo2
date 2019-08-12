/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
export class PanelComponent {
    constructor() {
        this._withHeader = true;
    }
    /**
     * @return {?}
     */
    get title() {
        return this._title;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this._title = value;
    }
    /**
     * @return {?}
     */
    get withHeader() {
        return this._withHeader;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set withHeader(value) {
        this._withHeader = value;
    }
}
PanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-panel',
                template: "<div *ngIf=\"withHeader\" class=\"igo-panel-header\" title=\"\">\r\n  <h3>\r\n    <ng-content select=\"[panelLeftButton]\"></ng-content>\r\n    <div class=\"igo-panel-title\">\r\n      {{title}}\r\n      <ng-content select=\"[panelHeader]\"></ng-content>\r\n    </div>\r\n    <ng-content select=\"[panelRightButton]\"></ng-content>\r\n  </h3>\r\n</div>\r\n<div class=\"igo-panel-content\" title=\"\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.igo-panel-header{height:46px;padding:3px;text-align:center}.igo-panel-header h3{margin:0;height:40px}.igo-panel-header>>>[panelleftbutton]{float:left;margin-right:-40px}.igo-panel-header>>>[panelrightbutton]{float:right}.igo-panel-content{overflow:auto}:host.igo-panel-with-header .igo-panel-content{height:calc(100% - 46px)}:host:not(.igo-panel-with-header) .igo-panel-content{height:100%}.igo-panel-title{display:block;width:calc(100% - 80px);margin-left:40px;height:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;line-height:40px;float:left}"]
            }] }
];
/** @nocollapse */
PanelComponent.ctorParameters = () => [];
PanelComponent.propDecorators = {
    title: [{ type: Input }],
    withHeader: [{ type: Input }, { type: HostBinding, args: ['class.igo-panel-with-header',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PanelComponent.prototype._title;
    /**
     * @type {?}
     * @private
     */
    PanelComponent.prototype._withHeader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3BhbmVsL3BhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQVF2QixNQUFNLE9BQU8sY0FBYztJQXFCekI7UUFGUSxnQkFBVyxHQUFHLElBQUksQ0FBQztJQUVaLENBQUM7Ozs7SUFuQmhCLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7OztJQUdELElBRUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7OztJQUNELElBQUksVUFBVSxDQUFDLEtBQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7O1lBeEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIseWNBQXFDO2dCQUVyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7O29CQUdFLEtBQUs7eUJBU0wsS0FBSyxZQUNMLFdBQVcsU0FBQyw2QkFBNkI7Ozs7Ozs7SUFIMUMsZ0NBQXVCOzs7OztJQVV2QixxQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBIb3N0QmluZGluZ1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tcGFuZWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wYW5lbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcGFuZWwuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWxDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCB0aXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl90aXRsZTtcclxuICB9XHJcbiAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RpdGxlOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pZ28tcGFuZWwtd2l0aC1oZWFkZXInKVxyXG4gIGdldCB3aXRoSGVhZGVyKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dpdGhIZWFkZXI7XHJcbiAgfVxyXG4gIHNldCB3aXRoSGVhZGVyKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl93aXRoSGVhZGVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3dpdGhIZWFkZXIgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19