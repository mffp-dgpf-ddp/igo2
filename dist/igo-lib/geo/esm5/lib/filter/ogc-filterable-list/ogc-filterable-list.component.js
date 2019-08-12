/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IgoMap } from '../../map';
var OgcFilterableListComponent = /** @class */ (function () {
    function OgcFilterableListComponent(cdRef) {
        this.cdRef = cdRef;
        this._layers = [];
    }
    Object.defineProperty(OgcFilterableListComponent.prototype, "layers", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layers;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layers = value;
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableListComponent.prototype, "map", {
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
    OgcFilterableListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filterable-list',
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-layer [ngForOf]=\"layers | filterableDataSource: 'ogc'\">\r\n    <igo-ogc-filterable-item igoListItem [ogcFiltersHeaderShown]=\"true\" [layer]=\"layer\" \r\n    [map]=\"layer.map\" ></igo-ogc-filterable-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    OgcFilterableListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    OgcFilterableListComponent.propDecorators = {
        layers: [{ type: Input }],
        map: [{ type: Input }]
    };
    return OgcFilterableListComponent;
}());
export { OgcFilterableListComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OgcFilterableListComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableListComponent.prototype._layers;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableListComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWxpc3Qvb2djLWZpbHRlcmFibGUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQztJQXlCRSxvQ0FBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFGcEMsWUFBTyxHQUFZLEVBQUUsQ0FBQztJQUVpQixDQUFDO0lBbkJoRCxzQkFDSSw4Q0FBTTs7OztRQURWO1lBRUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7Ozs7O1FBQ0QsVUFBVyxLQUFjO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BSkE7SUFLRCxzQkFDSSwyQ0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUhBOztnQkFqQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLHVWQUFtRDtvQkFDbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQVZDLGlCQUFpQjs7O3lCQVloQixLQUFLO3NCQVFMLEtBQUs7O0lBWVIsaUNBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXJCWSwwQkFBMEI7Ozs7OztJQWlCckMsMENBQXFCOzs7OztJQUNyQiw2Q0FBOEI7Ozs7O0lBRWxCLDJDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlcmFibGUtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXJhYmxlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJhYmxlTGlzdENvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVycztcclxuICB9XHJcbiAgc2V0IGxheWVycyh2YWx1ZTogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5fbGF5ZXJzID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBMYXllcltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG59XHJcbiJdfQ==