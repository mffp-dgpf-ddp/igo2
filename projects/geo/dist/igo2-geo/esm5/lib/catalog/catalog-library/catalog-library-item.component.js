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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvY2F0YWxvZy1saWJyYXJ5L2NhdGFsb2ctbGlicmFyeS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUtyRDtJQUFBO0lBc0JBLENBQUM7SUFGQyxzQkFBSSw2Q0FBSztRQUhUOztXQUVHOzs7OztRQUNILGNBQXNCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBOztnQkFwQjdELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxvRkFBb0Q7b0JBQ3BELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OzBCQU1FLEtBQUs7c0JBS0wsS0FBSzs7SUFPUixpQ0FBQztDQUFBLEFBdEJELElBc0JDO1NBakJZLDBCQUEwQjs7Ozs7O0lBS3JDLDZDQUEwQjs7Ozs7SUFLMUIseUNBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgQ2F0YWxvZyB9IGZyb20gJy4uL3NoYXJlZC9jYXRhbG9nLmFic3RyYWN0JztcclxuXHJcbi8qKlxyXG4gKiBDYXRhbG9nIGxpYnJhcnkgaXRlbVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1saWJyYXJ5LWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXRhbG9nLWxpYnJhcnktaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dMaWJhcnlJdGVtQ29tcG9uZW50IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgdGhlIGNhdGFsb2cgaXRlbXMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmNhdGFsb2cpOyB9XHJcblxyXG59XHJcbiJdfQ==