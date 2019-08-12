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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1saWJyYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctbGlicmFyeS9jYXRhbG9nLWxpYnJhcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFXbkMsTUFBTSxPQUFPLHNCQUFzQjtJQUxuQzs7OztRQW9CWSx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFHNUMsQ0FBQztJQXNCUCxDQUFDOzs7OztJQWpCQyxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7Ozs7SUFPRCxlQUFlLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUMvQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2QsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiwwWEFBK0M7Z0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7b0JBTUUsS0FBSztrQkFLTCxLQUFLO2tDQUtMLE1BQU07Ozs7Ozs7SUFWUCx1Q0FBcUM7Ozs7O0lBS3JDLHFDQUFxQjs7Ozs7SUFLckIscURBR0siLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBDYXRhbG9nIH0gZnJvbSAnLi4vc2hhcmVkL2NhdGFsb2cuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgdG8gYnJvd3NlIGEgbGlzdCBvZiBhdmFpbGFibGUgY2F0YWxvZ3NcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctbGlicmFyeScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctbGlicmFyeS5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dMaWJhcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSBob2xkaW5nIHRoZSBjYXRhbG9nc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBFbnRpdHlTdG9yZTxDYXRhbG9nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIHRvIGFkZCB0aGUgY2F0YWxvZyBpdGVtcyB0b1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIGEgY2F0YWxvZyBpcyBzZWxlY3RlZCBvciB1bnNlbGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNhdGFsb2dTZWxlY3RDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgY2F0YWxvZzogQ2F0YWxvZztcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBjYXRhbG9nIGlzIHNlbGVjdGVkLCB1cGRhdGUgaXQncyBzdGF0ZSBpbiB0aGUgc3RvcmVcclxuICAgKiBhbmQgZW1pdCB0aGUgY2F0YWxvZyBzZWxlY3QgY2hhbmdlIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25DYXRhbG9nU2VsZWN0KGNhdGFsb2c6IENhdGFsb2cpIHtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlKGNhdGFsb2csIHtcclxuICAgICAgc2VsZWN0ZWQ6IHRydWUsXHJcbiAgICAgIGZvY3VzZWQ6IHRydWVcclxuICAgIH0sIHRydWUpO1xyXG4gICAgdGhpcy5jYXRhbG9nU2VsZWN0Q2hhbmdlLmVtaXQoe3NlbGVjdGVkOiB0cnVlLCBjYXRhbG9nfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=