/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var BackdropComponent = /** @class */ (function () {
    function BackdropComponent() {
    }
    Object.defineProperty(BackdropComponent.prototype, "shown", {
        get: /**
         * @return {?}
         */
        function () {
            return this._shown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._shown = value;
        },
        enumerable: true,
        configurable: true
    });
    BackdropComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-backdrop',
                    template: "<div [ngClass]=\"{'igo-backdrop-shown': shown}\"></div>\r\n",
                    styles: [":host>div{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(100,100,100,.5);z-index:2;display:none}:host>div.igo-backdrop-shown{display:block}"]
                }] }
    ];
    /** @nocollapse */
    BackdropComponent.ctorParameters = function () { return []; };
    BackdropComponent.propDecorators = {
        shown: [{ type: Input }]
    };
    return BackdropComponent;
}());
export { BackdropComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BackdropComponent.prototype._shown;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2Ryb3AuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2JhY2tkcm9wL2JhY2tkcm9wLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQ7SUFlRTtJQUFlLENBQUM7SUFUaEIsc0JBQ0ksb0NBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBYztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTs7Z0JBVEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4Qix1RUFBd0M7O2lCQUV6Qzs7Ozs7d0JBRUUsS0FBSzs7SUFVUix3QkFBQztDQUFBLEFBaEJELElBZ0JDO1NBWFksaUJBQWlCOzs7Ozs7SUFRNUIsbUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tYmFja2Ryb3AnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9iYWNrZHJvcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYmFja2Ryb3AuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFja2Ryb3BDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3duKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nob3duO1xyXG4gIH1cclxuICBzZXQgc2hvd24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3duID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Nob3duOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19