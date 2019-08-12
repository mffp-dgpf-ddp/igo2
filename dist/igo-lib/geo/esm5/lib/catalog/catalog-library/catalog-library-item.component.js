/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { IgoMap } from '../../map';
/**
 * Catalog library item
 */
var CatalogLibaryItemComponent = /** @class */ (function () {
    function CatalogLibaryItemComponent() {
    }
    Object.defineProperty(CatalogLibaryItemComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return getEntityTitle(this.catalog); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CatalogLibaryItemComponent.prototype, "icon", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return getEntityIcon(this.catalog) || 'image-multiple'; },
        enumerable: true,
        configurable: true
    });
    CatalogLibaryItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-library-item',
                    template: "<mat-list-item>\r\n  <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 mat-line>{{title}}</h4>\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    CatalogLibaryItemComponent.propDecorators = {
        catalog: [{ type: Input }],
        map: [{ type: Input }]
    };
    return CatalogLibaryItemComponent;
}());
export { CatalogLibaryItemComponent };
if (false) {
    /**
     * Catalog
     * @type {?}
     */
    CatalogLibaryItemComponent.prototype.catalog;
    /**
     * Map to add the catalog items to
     * @type {?}
     */
    CatalogLibaryItemComponent.prototype.map;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvY2F0YWxvZy1saWJyYXJ5L2NhdGFsb2ctbGlicmFyeS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7OztBQU9uQztJQUFBO0lBMEJBLENBQUM7SUFOQyxzQkFBSSw2Q0FBSztRQUhUOztXQUVHOzs7OztRQUNILGNBQXNCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBSzVELHNCQUFJLDRDQUFJO1FBSFI7O1dBRUc7Ozs7O1FBQ0gsY0FBcUIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7O2dCQXpCL0UsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLG9KQUFvRDtvQkFDcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7MEJBTUUsS0FBSztzQkFLTCxLQUFLOztJQVdSLGlDQUFDO0NBQUEsQUExQkQsSUEwQkM7U0FyQlksMEJBQTBCOzs7Ozs7SUFLckMsNkNBQTBCOzs7OztJQUsxQix5Q0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgQ2F0YWxvZyB9IGZyb20gJy4uL3NoYXJlZC9jYXRhbG9nLmludGVyZmFjZSc7XHJcblxyXG4vKipcclxuICogQ2F0YWxvZyBsaWJyYXJ5IGl0ZW1cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctbGlicmFyeS1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1saWJyYXJ5LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nTGliYXJ5SXRlbUNvbXBvbmVudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2dcclxuICAgKi9cclxuICBASW5wdXQoKSBjYXRhbG9nOiBDYXRhbG9nO1xyXG5cclxuICAvKipcclxuICAgKiBNYXAgdG8gYWRkIHRoZSBjYXRhbG9nIGl0ZW1zIHRvXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5jYXRhbG9nKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgaWNvbigpOiBzdHJpbmcgeyByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmNhdGFsb2cpIHx8ICdpbWFnZS1tdWx0aXBsZSc7IH1cclxufVxyXG4iXX0=