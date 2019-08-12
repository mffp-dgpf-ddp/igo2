/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../../map';
var OgcFilterableFormComponent = /** @class */ (function () {
    function OgcFilterableFormComponent() {
        this.color = 'primary';
    }
    Object.defineProperty(OgcFilterableFormComponent.prototype, "datasource", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSource;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._dataSource = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableFormComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableFormComponent.prototype, "refreshFunc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.refreshFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableFormComponent.prototype, "showFeatureOnMap", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showFeatureOnMap;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showFeatureOnMap = value;
        },
        enumerable: true,
        configurable: true
    });
    OgcFilterableFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filterable-form',
                    template: "<igo-list [navigation]=\"false\" [selection]=\"true\">\r\n  <ng-template ngFor let-currentFilter [ngForOf]=\"this.datasource.options.ogcFilters.interfaceOgcFilters\">\r\n    <igo-ogc-filter-form igoListItem [color]=\"color\" [currentFilter]=\"currentFilter\" [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\" [showFeatureOnMap]=\"showFeatureOnMap\">\r\n    </igo-ogc-filter-form>\r\n  </ng-template>\r\n</igo-list>\r\n"
                }] }
    ];
    /** @nocollapse */
    OgcFilterableFormComponent.ctorParameters = function () { return []; };
    OgcFilterableFormComponent.propDecorators = {
        datasource: [{ type: Input }],
        map: [{ type: Input }],
        refreshFilters: [{ type: Input }],
        showFeatureOnMap: [{ type: Input }]
    };
    return OgcFilterableFormComponent;
}());
export { OgcFilterableFormComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWZvcm0vb2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkM7SUF5Q0U7UUFGTyxVQUFLLEdBQUcsU0FBUyxDQUFDO0lBRVYsQ0FBQztJQXBDaEIsc0JBQ0ksa0RBQVU7Ozs7UUFEZDtZQUVFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDOzs7OztRQUNELFVBQWUsS0FBOEI7WUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSEE7SUFLRCxzQkFDSSwyQ0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUhBO0lBUUQsc0JBQUksbURBQVc7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUNELHNCQUNJLHdEQUFnQjs7OztRQURwQjtZQUVFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hDLENBQUM7Ozs7O1FBQ0QsVUFBcUIsS0FBYztZQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7OztPQUhBOztnQkE5QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLHVjQUFtRDtpQkFDcEQ7Ozs7OzZCQUVFLEtBQUs7c0JBUUwsS0FBSztpQ0FTTCxLQUFLO21DQUtMLEtBQUs7O0lBZVIsaUNBQUM7Q0FBQSxBQTFDRCxJQTBDQztTQXRDWSwwQkFBMEI7OztJQWtCckMsb0RBQWtDOzs7OztJQWFsQyx1REFBbUM7Ozs7O0lBQ25DLDBDQUFxQjs7Ozs7SUFDckIsaURBQTZDOztJQUU3QywyQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXJhYmxlLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyYWJsZS1mb3JtLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRhdGFzb3VyY2UoKTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XHJcbiAgfVxyXG4gIHNldCBkYXRhc291cmNlKHZhbHVlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xyXG4gIEBJbnB1dCgpIHJlZnJlc2hGaWx0ZXJzOiBGdW5jdGlvbjtcclxuXHJcbiAgZ2V0IHJlZnJlc2hGdW5jKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaEZpbHRlcnM7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dGZWF0dXJlT25NYXAoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0ZlYXR1cmVPbk1hcDtcclxuICB9XHJcbiAgc2V0IHNob3dGZWF0dXJlT25NYXAodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dGZWF0dXJlT25NYXAgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3dGZWF0dXJlT25NYXA6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcblxyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiJdfQ==