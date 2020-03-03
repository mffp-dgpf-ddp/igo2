/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EntityStore } from '@igo2/common';
import { IgoMap } from '../../map';
/**
 * Component to browse a list of available catalogs
 */
var CatalogLibaryComponent = /** @class */ (function () {
    function CatalogLibaryComponent() {
        /**
         * Event emitted a catalog is selected or unselected
         */
        this.catalogSelectChange = new EventEmitter();
    }
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    CatalogLibaryComponent.prototype.ngOnInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.store.state.clear();
    };
    /**
     * When a catalog is selected, update it's state in the store
     * and emit the catalog select change event
     * @internal
     */
    /**
     * When a catalog is selected, update it's state in the store
     * and emit the catalog select change event
     * \@internal
     * @param {?} catalog
     * @return {?}
     */
    CatalogLibaryComponent.prototype.onCatalogSelect = /**
     * When a catalog is selected, update it's state in the store
     * and emit the catalog select change event
     * \@internal
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        this.store.state.update(catalog, {
            selected: true,
            focused: true
        }, true);
        this.catalogSelectChange.emit({ selected: true, catalog: catalog });
    };
    CatalogLibaryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-library',
                    template: "<igo-list [navigation]=\"false\">\r\n  <ng-template ngFor let-catalog [ngForOf]=\"store.view.all$() | async\">\r\n    <igo-catalog-library-item\r\n      igoListItem\r\n      color=\"accent\"\r\n      [map]=\"map\"\r\n      [catalog]=\"catalog\"\r\n      (select)=\"onCatalogSelect(catalog)\">\r\n    </igo-catalog-library-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    CatalogLibaryComponent.propDecorators = {
        store: [{ type: Input }],
        map: [{ type: Input }],
        catalogSelectChange: [{ type: Output }]
    };
    return CatalogLibaryComponent;
}());
export { CatalogLibaryComponent };
if (false) {
    /**
     * Store holding the catalogs
     * @type {?}
     */
    CatalogLibaryComponent.prototype.store;
    /**
     * Map to add the catalog items to
     * @type {?}
     */
    CatalogLibaryComponent.prototype.map;
    /**
     * Event emitted a catalog is selected or unselected
     * @type {?}
     */
    CatalogLibaryComponent.prototype.catalogSelectChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctbGlicmFyeS9jYXRhbG9nLWxpYnJhcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFNbkM7SUFBQTs7OztRQW9CWSx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFHNUMsQ0FBQztJQXNCUCxDQUFDO0lBcEJDOztPQUVHOzs7OztJQUNILHlDQUFROzs7O0lBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxnREFBZTs7Ozs7OztJQUFmLFVBQWdCLE9BQWdCO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDL0IsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSTtTQUNkLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Z0JBM0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiwwWEFBK0M7b0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7O3dCQU1FLEtBQUs7c0JBS0wsS0FBSztzQ0FLTCxNQUFNOztJQXlCVCw2QkFBQztDQUFBLEFBN0NELElBNkNDO1NBeENZLHNCQUFzQjs7Ozs7O0lBS2pDLHVDQUFxQzs7Ozs7SUFLckMscUNBQXFCOzs7OztJQUtyQixxREFHSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IENhdGFsb2cgfSBmcm9tICcuLi9zaGFyZWQvY2F0YWxvZy5hYnN0cmFjdCc7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHRvIGJyb3dzZSBhIGxpc3Qgb2YgYXZhaWxhYmxlIGNhdGFsb2dzXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jYXRhbG9nLWxpYnJhcnknLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXRhbG9nLWxpYnJhcnkuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nTGliYXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcmUgaG9sZGluZyB0aGUgY2F0YWxvZ3NcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8Q2F0YWxvZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBhZGQgdGhlIGNhdGFsb2cgaXRlbXMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCBhIGNhdGFsb2cgaXMgc2VsZWN0ZWQgb3IgdW5zZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjYXRhbG9nU2VsZWN0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIGNhdGFsb2c6IENhdGFsb2c7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgY2F0YWxvZyBpcyBzZWxlY3RlZCwgdXBkYXRlIGl0J3Mgc3RhdGUgaW4gdGhlIHN0b3JlXHJcbiAgICogYW5kIGVtaXQgdGhlIGNhdGFsb2cgc2VsZWN0IGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uQ2F0YWxvZ1NlbGVjdChjYXRhbG9nOiBDYXRhbG9nKSB7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZShjYXRhbG9nLCB7XHJcbiAgICAgIHNlbGVjdGVkOiB0cnVlLFxyXG4gICAgICBmb2N1c2VkOiB0cnVlXHJcbiAgICB9LCB0cnVlKTtcclxuICAgIHRoaXMuY2F0YWxvZ1NlbGVjdENoYW5nZS5lbWl0KHtzZWxlY3RlZDogdHJ1ZSwgY2F0YWxvZ30pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19