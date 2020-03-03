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
export class CatalogLibaryComponent {
    constructor() {
        /**
         * Event emitted a catalog is selected or unselected
         */
        this.catalogSelectChange = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.store.state.clear();
    }
    /**
     * When a catalog is selected, update it's state in the store
     * and emit the catalog select change event
     * \@internal
     * @param {?} catalog
     * @return {?}
     */
    onCatalogSelect(catalog) {
        this.store.state.update(catalog, {
            selected: true,
            focused: true
        }, true);
        this.catalogSelectChange.emit({ selected: true, catalog });
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctbGlicmFyeS9jYXRhbG9nLWxpYnJhcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFXbkMsTUFBTSxPQUFPLHNCQUFzQjtJQUxuQzs7OztRQW9CWSx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFHNUMsQ0FBQztJQXNCUCxDQUFDOzs7OztJQWpCQyxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7Ozs7SUFPRCxlQUFlLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUMvQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2QsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiwwWEFBK0M7Z0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7b0JBTUUsS0FBSztrQkFLTCxLQUFLO2tDQUtMLE1BQU07Ozs7Ozs7SUFWUCx1Q0FBcUM7Ozs7O0lBS3JDLHFDQUFxQjs7Ozs7SUFLckIscURBR0siLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBDYXRhbG9nIH0gZnJvbSAnLi4vc2hhcmVkL2NhdGFsb2cuYWJzdHJhY3QnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB0byBicm93c2UgYSBsaXN0IG9mIGF2YWlsYWJsZSBjYXRhbG9nc1xyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1saWJyYXJ5JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1saWJyYXJ5LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0xpYmFyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIGhvbGRpbmcgdGhlIGNhdGFsb2dzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPENhdGFsb2c+O1xyXG5cclxuICAvKipcclxuICAgKiBNYXAgdG8gYWRkIHRoZSBjYXRhbG9nIGl0ZW1zIHRvXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgYSBjYXRhbG9nIGlzIHNlbGVjdGVkIG9yIHVuc2VsZWN0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2F0YWxvZ1NlbGVjdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICBjYXRhbG9nOiBDYXRhbG9nO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGNhdGFsb2cgaXMgc2VsZWN0ZWQsIHVwZGF0ZSBpdCdzIHN0YXRlIGluIHRoZSBzdG9yZVxyXG4gICAqIGFuZCBlbWl0IHRoZSBjYXRhbG9nIHNlbGVjdCBjaGFuZ2UgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbkNhdGFsb2dTZWxlY3QoY2F0YWxvZzogQ2F0YWxvZykge1xyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUoY2F0YWxvZywge1xyXG4gICAgICBzZWxlY3RlZDogdHJ1ZSxcclxuICAgICAgZm9jdXNlZDogdHJ1ZVxyXG4gICAgfSwgdHJ1ZSk7XHJcbiAgICB0aGlzLmNhdGFsb2dTZWxlY3RDaGFuZ2UuZW1pdCh7c2VsZWN0ZWQ6IHRydWUsIGNhdGFsb2d9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==