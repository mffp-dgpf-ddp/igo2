/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
var OgcFilterButtonComponent = /** @class */ (function () {
    function OgcFilterButtonComponent() {
        this._color = 'primary';
        this.ogcFilterCollapse = false;
        this._ogcFiltersInLayers = false;
    }
    Object.defineProperty(OgcFilterButtonComponent.prototype, "layer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterButtonComponent.prototype, "map", {
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
    Object.defineProperty(OgcFilterButtonComponent.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterButtonComponent.prototype, "ogcFiltersInLayers", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ogcFiltersInLayers;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._ogcFiltersInLayers = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OgcFilterButtonComponent.prototype.toggleOgcFilter = /**
     * @return {?}
     */
    function () {
        if (this.layer.isInResolutionsRange) {
            this.ogcFilterCollapse = !this.ogcFilterCollapse;
        }
    };
    Object.defineProperty(OgcFilterButtonComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.layer) {
                return;
            }
            return this.layer.dataSource.options;
        },
        enumerable: true,
        configurable: true
    });
    OgcFilterButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-button',
                    template: "<button *ngIf=\"ogcFiltersInLayers && options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleOgcFilter()\">\r\n  <mat-icon\r\n    [ngClass]='{disabled: !layer.isInResolutionsRange}'>\r\n    filter_list\r\n  </mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [ogcFiltersHeaderShown]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OgcFilterButtonComponent.ctorParameters = function () { return []; };
    OgcFilterButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        map: [{ type: Input }],
        color: [{ type: Input }],
        ogcFiltersInLayers: [{ type: Input }]
    };
    return OgcFilterButtonComponent;
}());
export { OgcFilterButtonComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._layer;
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._color;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.ogcFilterCollapse;
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._ogcFiltersInLayers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR25DO0lBNkNFO1FBYlEsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUVwQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFTekIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO0lBRXJCLENBQUM7SUF0Q2hCLHNCQUNJLDJDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQVk7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx5Q0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0ksMkNBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQVFELHNCQUNJLHdEQUFrQjs7OztRQUR0QjtZQUVFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xDLENBQUM7Ozs7O1FBQ0QsVUFBdUIsS0FBYztZQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUM7OztPQUhBOzs7O0lBUUQsa0RBQWU7OztJQUFmO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFRCxzQkFBSSw2Q0FBTzs7OztRQUFYO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTzthQUNSO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7O2dCQTFERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsczRCQUFpRDtvQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7d0JBRUUsS0FBSztzQkFTTCxLQUFLO3dCQVNMLEtBQUs7cUNBV0wsS0FBSzs7SUF1QlIsK0JBQUM7Q0FBQSxBQTNERCxJQTJEQztTQXJEWSx3QkFBd0I7Ozs7OztJQVFuQywwQ0FBc0I7Ozs7O0lBU3RCLHdDQUFxQjs7Ozs7SUFTckIsMENBQTJCOztJQUUzQixxREFBaUM7Ozs7O0lBU2pDLHVEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlci1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyQnV0dG9uQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBsYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgcHVibGljIG9nY0ZpbHRlckNvbGxhcHNlID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG9nY0ZpbHRlcnNJbkxheWVycygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9vZ2NGaWx0ZXJzSW5MYXllcnM7XHJcbiAgfVxyXG4gIHNldCBvZ2NGaWx0ZXJzSW5MYXllcnModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX29nY0ZpbHRlcnNJbkxheWVycyA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9vZ2NGaWx0ZXJzSW5MYXllcnMgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICB0b2dnbGVPZ2NGaWx0ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5sYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSkge1xyXG4gICAgICB0aGlzLm9nY0ZpbHRlckNvbGxhcHNlID0gIXRoaXMub2djRmlsdGVyQ29sbGFwc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgb3B0aW9ucygpOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMge1xyXG4gICAgaWYgKCF0aGlzLmxheWVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19