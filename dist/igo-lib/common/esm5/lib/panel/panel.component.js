/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
var PanelComponent = /** @class */ (function () {
    function PanelComponent() {
        this._withHeader = true;
    }
    Object.defineProperty(PanelComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this._title;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "withHeader", {
        get: /**
         * @return {?}
         */
        function () {
            return this._withHeader;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._withHeader = value;
        },
        enumerable: true,
        configurable: true
    });
    PanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-panel',
                    template: "<div *ngIf=\"withHeader\" class=\"igo-panel-header\" title=\"\">\r\n  <h3>\r\n    <ng-content select=\"[panelLeftButton]\"></ng-content>\r\n    <div class=\"igo-panel-title\">\r\n      {{title}}\r\n      <ng-content select=\"[panelHeader]\"></ng-content>\r\n    </div>\r\n    <ng-content select=\"[panelRightButton]\"></ng-content>\r\n  </h3>\r\n</div>\r\n<div class=\"igo-panel-content\" title=\"\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}.igo-panel-header{height:46px;padding:3px;text-align:center}.igo-panel-header h3{margin:0;height:40px}.igo-panel-header>>>[panelleftbutton]{float:left;margin-right:-40px}.igo-panel-header>>>[panelrightbutton]{float:right}.igo-panel-content{overflow:auto}:host.igo-panel-with-header .igo-panel-content{height:calc(100% - 46px)}:host:not(.igo-panel-with-header) .igo-panel-content{height:100%}.igo-panel-title{display:block;width:calc(100% - 80px);margin-left:40px;height:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;line-height:40px;float:left}"]
                }] }
    ];
    /** @nocollapse */
    PanelComponent.ctorParameters = function () { return []; };
    PanelComponent.propDecorators = {
        title: [{ type: Input }],
        withHeader: [{ type: Input }, { type: HostBinding, args: ['class.igo-panel-with-header',] }]
    };
    return PanelComponent;
}());
export { PanelComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3BhbmVsL3BhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQTJCRTtRQUZRLGdCQUFXLEdBQUcsSUFBSSxDQUFDO0lBRVosQ0FBQztJQW5CaEIsc0JBQ0ksaUNBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQU1ELHNCQUVJLHNDQUFVOzs7O1FBRmQ7WUFHRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzs7Ozs7UUFDRCxVQUFlLEtBQWM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSEE7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLHljQUFxQztvQkFFckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7d0JBR0UsS0FBSzs2QkFTTCxLQUFLLFlBQ0wsV0FBVyxTQUFDLDZCQUE2Qjs7SUFVNUMscUJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQXRCWSxjQUFjOzs7Ozs7SUFTekIsZ0NBQXVCOzs7OztJQVV2QixxQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBIb3N0QmluZGluZ1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tcGFuZWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wYW5lbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcGFuZWwuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWxDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCB0aXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl90aXRsZTtcclxuICB9XHJcbiAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RpdGxlOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pZ28tcGFuZWwtd2l0aC1oZWFkZXInKVxyXG4gIGdldCB3aXRoSGVhZGVyKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dpdGhIZWFkZXI7XHJcbiAgfVxyXG4gIHNldCB3aXRoSGVhZGVyKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl93aXRoSGVhZGVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3dpdGhIZWFkZXIgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19