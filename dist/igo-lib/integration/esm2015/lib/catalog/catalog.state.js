/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { EntityStore } from '@igo2/common';
import * as i0 from "@angular/core";
/**
 * Service that holds the state of the catalog module
 */
export class CatalogState {
    constructor() {
        /**
         * Catalog -> Catalog items store mapping
         */
        this.catalogItemsStores = new Map();
        this._catalogStore = new EntityStore([]);
    }
    /**
     * Store that contains all the catalogs
     * @return {?}
     */
    get catalogStore() { return this._catalogStore; }
    /**
     * Get a catalog's items store
     * @param {?} catalog Catalog
     * @return {?} Store that contains the catalog items
     */
    getCatalogItemsStore(catalog) {
        return this.catalogItemsStores.get((/** @type {?} */ (catalog.id)));
    }
    /**
     * Bind a catalog items store to a catalog
     * @param {?} catalog Catalog
     * @param {?} store Catalog items store
     * @return {?}
     */
    setCatalogItemsStore(catalog, store) {
        this.catalogItemsStores.set((/** @type {?} */ (catalog.id)), store);
    }
}
CatalogState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CatalogState.ctorParameters = () => [];
/** @nocollapse */ CatalogState.ngInjectableDef = i0.defineInjectable({ factory: function CatalogState_Factory() { return new CatalogState(); }, token: CatalogState, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    CatalogState.prototype._catalogStore;
    /**
     * Catalog -> Catalog items store mapping
     * @type {?}
     * @private
     */
    CatalogState.prototype.catalogItemsStores;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2NhdGFsb2cvY2F0YWxvZy5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQVMzQyxNQUFNLE9BQU8sWUFBWTtJQWF2Qjs7OztRQUZRLHVCQUFrQixHQUFHLElBQUksR0FBRyxFQUFvQyxDQUFDO1FBR3ZFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFWRCxJQUFJLFlBQVksS0FBMkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBaUJ2RSxvQkFBb0IsQ0FBQyxPQUFnQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsbUJBQUEsT0FBTyxDQUFDLEVBQUUsRUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7OztJQU9ELG9CQUFvQixDQUFDLE9BQWdCLEVBQUUsS0FBK0I7UUFDcEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxtQkFBQSxPQUFPLENBQUMsRUFBRSxFQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7O1lBcENGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztJQU9DLHFDQUE0Qzs7Ozs7O0lBSzVDLDBDQUF5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgQ2F0YWxvZywgQ2F0YWxvZ0l0ZW0gfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgdGhhdCBob2xkcyB0aGUgc3RhdGUgb2YgdGhlIGNhdGFsb2cgbW9kdWxlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nU3RhdGUge1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgY2F0YWxvZ3NcclxuICAgKi9cclxuICBnZXQgY2F0YWxvZ1N0b3JlKCk6IEVudGl0eVN0b3JlPENhdGFsb2c+IHsgcmV0dXJuIHRoaXMuX2NhdGFsb2dTdG9yZTsgfVxyXG4gIHByaXZhdGUgX2NhdGFsb2dTdG9yZTogRW50aXR5U3RvcmU8Q2F0YWxvZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgLT4gQ2F0YWxvZyBpdGVtcyBzdG9yZSBtYXBwaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYXRhbG9nSXRlbXNTdG9yZXMgPSBuZXcgTWFwPHN0cmluZywgRW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0+PigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2NhdGFsb2dTdG9yZSA9IG5ldyBFbnRpdHlTdG9yZShbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYSBjYXRhbG9nJ3MgaXRlbXMgc3RvcmVcclxuICAgKiBAcGFyYW0gY2F0YWxvZyBDYXRhbG9nXHJcbiAgICogQHJldHVybnMgU3RvcmUgdGhhdCBjb250YWlucyB0aGUgY2F0YWxvZyBpdGVtc1xyXG4gICAqL1xyXG4gIGdldENhdGFsb2dJdGVtc1N0b3JlKGNhdGFsb2c6IENhdGFsb2cpOiBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2F0YWxvZ0l0ZW1zU3RvcmVzLmdldChjYXRhbG9nLmlkIGFzIHN0cmluZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIGEgY2F0YWxvZyBpdGVtcyBzdG9yZSB0byBhIGNhdGFsb2dcclxuICAgKiBAcGFyYW0gY2F0YWxvZyBDYXRhbG9nXHJcbiAgICogQHBhcmFtIHN0b3JlIENhdGFsb2cgaXRlbXMgc3RvcmVcclxuICAgKi9cclxuICBzZXRDYXRhbG9nSXRlbXNTdG9yZShjYXRhbG9nOiBDYXRhbG9nLCBzdG9yZTogRW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0+KSB7XHJcbiAgICB0aGlzLmNhdGFsb2dJdGVtc1N0b3Jlcy5zZXQoY2F0YWxvZy5pZCBhcyBzdHJpbmcsIHN0b3JlKTtcclxuICB9XHJcbn1cclxuIl19