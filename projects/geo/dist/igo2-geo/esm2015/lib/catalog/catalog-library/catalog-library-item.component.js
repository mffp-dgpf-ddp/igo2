/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getEntityTitle } from '@igo2/common';
import { IgoMap } from '../../map';
import { Catalog } from '../shared/catalog.abstract';
/**
 * Catalog library item
 */
export class CatalogLibaryItemComponent {
    /**
     * \@internal
     * @return {?}
     */
    get title() { return getEntityTitle(this.catalog); }
}
CatalogLibaryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-library-item',
                template: "<mat-list-item>\r\n  <h4 mat-line>{{title}}</h4>\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
CatalogLibaryItemComponent.propDecorators = {
    catalog: [{ type: Input }],
    map: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvY2F0YWxvZy1saWJyYXJ5L2NhdGFsb2ctbGlicmFyeS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQVVyRCxNQUFNLE9BQU8sMEJBQTBCOzs7OztJQWVyQyxJQUFJLEtBQUssS0FBYSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUFwQjdELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxvRkFBb0Q7Z0JBQ3BELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7c0JBTUUsS0FBSztrQkFLTCxLQUFLOzs7Ozs7O0lBTE4sNkNBQTBCOzs7OztJQUsxQix5Q0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBDYXRhbG9nIH0gZnJvbSAnLi4vc2hhcmVkL2NhdGFsb2cuYWJzdHJhY3QnO1xyXG5cclxuLyoqXHJcbiAqIENhdGFsb2cgbGlicmFyeSBpdGVtXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jYXRhbG9nLWxpYnJhcnktaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctbGlicmFyeS1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0xpYmFyeUl0ZW1Db21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBDYXRhbG9nXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2F0YWxvZzogQ2F0YWxvZztcclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIHRvIGFkZCB0aGUgY2F0YWxvZyBpdGVtcyB0b1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIGdldEVudGl0eVRpdGxlKHRoaXMuY2F0YWxvZyk7IH1cclxuXHJcbn1cclxuIl19