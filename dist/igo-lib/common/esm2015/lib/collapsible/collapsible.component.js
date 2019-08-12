/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class CollapsibleComponent {
    constructor() {
        this._title = '';
        this._collapsed = false;
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
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        this._collapsed = value;
    }
}
CollapsibleComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-collapsible',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    svgIcon=\"chevron-up\" \r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"content\"\r\n    [collapsed]=\"collapsed\">\r\n  </mat-icon>\r\n  <h4 matLine>{{title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                styles: [":host>>>.mat-list .mat-list-item.mat-list-avatar{height:auto;width:auto;padding:0}mat-list-item{overflow:hidden}"]
            }] }
];
/** @nocollapse */
CollapsibleComponent.ctorParameters = () => [];
CollapsibleComponent.propDecorators = {
    title: [{ type: Input }],
    collapsed: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    CollapsibleComponent.prototype._title;
    /**
     * @type {?}
     * @private
     */
    CollapsibleComponent.prototype._collapsed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2libGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NvbGxhcHNpYmxlL2NvbGxhcHNpYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPakQsTUFBTSxPQUFPLG9CQUFvQjtJQW1CL0I7UUFYUSxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBU1osZUFBVSxHQUFHLEtBQUssQ0FBQztJQUVaLENBQUM7Ozs7SUFsQmhCLElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7OztJQUdELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUNELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7O1lBckJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixzVkFBMkM7O2FBRTVDOzs7OztvQkFFRSxLQUFLO3dCQVNMLEtBQUs7Ozs7Ozs7SUFGTixzQ0FBb0I7Ozs7O0lBU3BCLDBDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbGxhcHNpYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29sbGFwc2libGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbGxhcHNpYmxlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbGxhcHNpYmxlQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCB0aXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl90aXRsZTtcclxuICB9XHJcbiAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RpdGxlID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbGxhcHNlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWQ7XHJcbiAgfVxyXG4gIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2NvbGxhcHNlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiJdfQ==