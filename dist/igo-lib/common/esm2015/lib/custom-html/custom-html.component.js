/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class CustomHtmlComponent {
    constructor() {
        this._html = '';
    }
    /**
     * @return {?}
     */
    get html() {
        return this._html;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set html(value) {
        this._html = value;
    }
}
CustomHtmlComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-custom-html',
                template: "<div class=\"custom-html\" [innerHTML]=\"html | sanitizeHtml \"></div>\r\n",
                styles: [".custom-html{padding:20px}"]
            }] }
];
/** @nocollapse */
CustomHtmlComponent.ctorParameters = () => [];
CustomHtmlComponent.propDecorators = {
    html: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    CustomHtmlComponent.prototype._html;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWh0bWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2N1c3RvbS1odG1sL2N1c3RvbS1odG1sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPakQsTUFBTSxPQUFPLG1CQUFtQjtJQVU5QjtRQUZRLFVBQUssR0FBRyxFQUFFLENBQUM7SUFFSixDQUFDOzs7O0lBVGhCLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7OztJQUNELElBQUksSUFBSSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHNGQUEyQzs7YUFFNUM7Ozs7O21CQUVFLEtBQUs7Ozs7Ozs7SUFPTixvQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jdXN0b20taHRtbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbS1odG1sLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jdXN0b20taHRtbC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21IdG1sQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBodG1sKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5faHRtbDtcclxuICB9XHJcbiAgc2V0IGh0bWwodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5faHRtbCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9odG1sID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=