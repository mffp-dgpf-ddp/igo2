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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctbGlicmFyeS9jYXRhbG9nLWxpYnJhcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFNbkM7SUFBQTs7OztRQW9CWSx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFHNUMsQ0FBQztJQXNCUCxDQUFDO0lBcEJDOztPQUVHOzs7OztJQUNILHlDQUFROzs7O0lBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxnREFBZTs7Ozs7OztJQUFmLFVBQWdCLE9BQWdCO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDL0IsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSTtTQUNkLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Z0JBM0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiwwWEFBK0M7b0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7O3dCQU1FLEtBQUs7c0JBS0wsS0FBSztzQ0FLTCxNQUFNOztJQXlCVCw2QkFBQztDQUFBLEFBN0NELElBNkNDO1NBeENZLHNCQUFzQjs7Ozs7O0lBS2pDLHVDQUFxQzs7Ozs7SUFLckMscUNBQXFCOzs7OztJQUtyQixxREFHSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IENhdGFsb2cgfSBmcm9tICcuLi9zaGFyZWQvY2F0YWxvZy5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB0byBicm93c2UgYSBsaXN0IG9mIGF2YWlsYWJsZSBjYXRhbG9nc1xyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1saWJyYXJ5JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1saWJyYXJ5LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0xpYmFyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIGhvbGRpbmcgdGhlIGNhdGFsb2dzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPENhdGFsb2c+O1xyXG5cclxuICAvKipcclxuICAgKiBNYXAgdG8gYWRkIHRoZSBjYXRhbG9nIGl0ZW1zIHRvXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgYSBjYXRhbG9nIGlzIHNlbGVjdGVkIG9yIHVuc2VsZWN0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2F0YWxvZ1NlbGVjdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGNhdGFsb2cgaXMgc2VsZWN0ZWQsIHVwZGF0ZSBpdCdzIHN0YXRlIGluIHRoZSBzdG9yZVxyXG4gICAqIGFuZCBlbWl0IHRoZSBjYXRhbG9nIHNlbGVjdCBjaGFuZ2UgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkNhdGFsb2dTZWxlY3QoY2F0YWxvZzogQ2F0YWxvZykge1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUoY2F0YWxvZywge1xyXG4gICAgICBzZWxlY3RlZDogdHJ1ZSxcclxuICAgICAgZm9jdXNlZDogdHJ1ZVxyXG4gICAgfSwgdHJ1ZSk7XHJcbiAgICB0aGlzLmNhdGFsb2dTZWxlY3RDaGFuZ2UuZW1pdCh7c2VsZWN0ZWQ6IHRydWUsIGNhdGFsb2d9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==