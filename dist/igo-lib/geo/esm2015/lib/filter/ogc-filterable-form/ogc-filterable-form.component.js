/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../../map';
export class OgcFilterableFormComponent {
    constructor() {
        this.color = 'primary';
    }
    /**
     * @return {?}
     */
    get datasource() {
        return this._dataSource;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set datasource(value) {
        this._dataSource = value;
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get refreshFunc() {
        return this.refreshFilters;
    }
    /**
     * @return {?}
     */
    get showFeatureOnMap() {
        return this._showFeatureOnMap;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showFeatureOnMap(value) {
        this._showFeatureOnMap = value;
    }
}
OgcFilterableFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filterable-form',
                template: "<igo-list [navigation]=\"false\" [selection]=\"true\">\r\n  <ng-template ngFor let-currentFilter [ngForOf]=\"this.datasource.options.ogcFilters.interfaceOgcFilters\">\r\n    <igo-ogc-filter-form igoListItem [color]=\"color\" [currentFilter]=\"currentFilter\" [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\" [showFeatureOnMap]=\"showFeatureOnMap\">\r\n    </igo-ogc-filter-form>\r\n  </ng-template>\r\n</igo-list>\r\n"
            }] }
];
/** @nocollapse */
OgcFilterableFormComponent.ctorParameters = () => [];
OgcFilterableFormComponent.propDecorators = {
    datasource: [{ type: Input }],
    map: [{ type: Input }],
    refreshFilters: [{ type: Input }],
    showFeatureOnMap: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    OgcFilterableFormComponent.prototype.refreshFilters;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableFormComponent.prototype._showFeatureOnMap;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableFormComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableFormComponent.prototype._dataSource;
    /** @type {?} */
    OgcFilterableFormComponent.prototype.color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWZvcm0vb2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFNbkMsTUFBTSxPQUFPLDBCQUEwQjtJQXFDckM7UUFGTyxVQUFLLEdBQUcsU0FBUyxDQUFDO0lBRVYsQ0FBQzs7OztJQXBDaEIsSUFDSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBOEI7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELElBQ0ksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOzs7OztJQUNELElBQUksR0FBRyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7OztJQUtELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDOzs7O0lBQ0QsSUFDSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFDRCxJQUFJLGdCQUFnQixDQUFDLEtBQWM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7WUFqQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLHVjQUFtRDthQUNwRDs7Ozs7eUJBRUUsS0FBSztrQkFRTCxLQUFLOzZCQVNMLEtBQUs7K0JBS0wsS0FBSzs7OztJQUxOLG9EQUFrQzs7Ozs7SUFhbEMsdURBQW1DOzs7OztJQUNuQywwQ0FBcUI7Ozs7O0lBQ3JCLGlEQUE2Qzs7SUFFN0MsMkNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSB9IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyYWJsZS1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlcmFibGVGb3JtQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBkYXRhc291cmNlKCk6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xyXG4gIH1cclxuICBzZXQgZGF0YXNvdXJjZSh2YWx1ZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2UpIHtcclxuICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcclxuICBASW5wdXQoKSByZWZyZXNoRmlsdGVyczogRnVuY3Rpb247XHJcblxyXG4gIGdldCByZWZyZXNoRnVuYygpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZnJlc2hGaWx0ZXJzO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIGdldCBzaG93RmVhdHVyZU9uTWFwKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nob3dGZWF0dXJlT25NYXA7XHJcbiAgfVxyXG4gIHNldCBzaG93RmVhdHVyZU9uTWFwKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93RmVhdHVyZU9uTWFwID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG93RmVhdHVyZU9uTWFwOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG5cclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=