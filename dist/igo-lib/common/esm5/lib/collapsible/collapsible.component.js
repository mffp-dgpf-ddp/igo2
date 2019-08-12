/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var CollapsibleComponent = /** @class */ (function () {
    function CollapsibleComponent() {
        this._title = '';
        this._collapsed = false;
    }
    Object.defineProperty(CollapsibleComponent.prototype, "title", {
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
    Object.defineProperty(CollapsibleComponent.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    CollapsibleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-collapsible',
                    template: "<mat-list-item>\r\n  <mat-icon\r\n    svgIcon=\"chevron-up\" \r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"content\"\r\n    [collapsed]=\"collapsed\">\r\n  </mat-icon>\r\n  <h4 matLine>{{title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                    styles: [":host>>>.mat-list .mat-list-item.mat-list-avatar{height:auto;width:auto;padding:0}mat-list-item{overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    CollapsibleComponent.ctorParameters = function () { return []; };
    CollapsibleComponent.propDecorators = {
        title: [{ type: Input }],
        collapsed: [{ type: Input }]
    };
    return CollapsibleComponent;
}());
export { CollapsibleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2libGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NvbGxhcHNpYmxlL2NvbGxhcHNpYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQ7SUF3QkU7UUFYUSxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBU1osZUFBVSxHQUFHLEtBQUssQ0FBQztJQUVaLENBQUM7SUFsQmhCLHNCQUNJLHVDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSwyQ0FBUzs7OztRQURiO1lBRUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBQ0QsVUFBYyxLQUFjO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUhBOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLHNWQUEyQzs7aUJBRTVDOzs7Ozt3QkFFRSxLQUFLOzRCQVNMLEtBQUs7O0lBVVIsMkJBQUM7Q0FBQSxBQXpCRCxJQXlCQztTQXBCWSxvQkFBb0I7Ozs7OztJQVEvQixzQ0FBb0I7Ozs7O0lBU3BCLDBDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbGxhcHNpYmxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29sbGFwc2libGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbGxhcHNpYmxlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbGxhcHNpYmxlQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCB0aXRsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl90aXRsZTtcclxuICB9XHJcbiAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RpdGxlID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbGxhcHNlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWQ7XHJcbiAgfVxyXG4gIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2NvbGxhcHNlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiJdfQ==