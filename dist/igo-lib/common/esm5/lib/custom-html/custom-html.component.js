/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var CustomHtmlComponent = /** @class */ (function () {
    function CustomHtmlComponent() {
        this._html = '';
    }
    Object.defineProperty(CustomHtmlComponent.prototype, "html", {
        get: /**
         * @return {?}
         */
        function () {
            return this._html;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._html = value;
        },
        enumerable: true,
        configurable: true
    });
    CustomHtmlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-custom-html',
                    template: "<div class=\"custom-html\" [innerHTML]=\"html | sanitizeHtml \"></div>\r\n",
                    styles: [".custom-html{padding:20px}"]
                }] }
    ];
    /** @nocollapse */
    CustomHtmlComponent.ctorParameters = function () { return []; };
    CustomHtmlComponent.propDecorators = {
        html: [{ type: Input }]
    };
    return CustomHtmlComponent;
}());
export { CustomHtmlComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CustomHtmlComponent.prototype._html;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWh0bWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2N1c3RvbS1odG1sL2N1c3RvbS1odG1sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQ7SUFlRTtRQUZRLFVBQUssR0FBRyxFQUFFLENBQUM7SUFFSixDQUFDO0lBVGhCLHNCQUNJLHFDQUFJOzs7O1FBRFI7WUFFRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFDRCxVQUFTLEtBQWE7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQzs7O09BSEE7O2dCQVRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixzRkFBMkM7O2lCQUU1Qzs7Ozs7dUJBRUUsS0FBSzs7SUFVUiwwQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBWFksbUJBQW1COzs7Ozs7SUFROUIsb0NBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY3VzdG9tLWh0bWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jdXN0b20taHRtbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY3VzdG9tLWh0bWwuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHRtbENvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgaHRtbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2h0bWw7XHJcbiAgfVxyXG4gIHNldCBodG1sKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2h0bWwgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaHRtbCA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19