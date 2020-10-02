/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
var OgcFilterButtonComponent = /** @class */ (function () {
    function OgcFilterButtonComponent() {
        this.color = 'primary';
        this.ogcFilterCollapse = false;
    }
    Object.defineProperty(OgcFilterButtonComponent.prototype, "badge", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var filter = (/** @type {?} */ (this.options.ogcFilters));
            if (filter && !filter.advancedOgcFilters) {
                if (filter.pushButtons) {
                    /** @type {?} */
                    var pushButtons = (/** @type {?} */ (filter.pushButtons));
                    /** @type {?} */
                    var currentPushButtonGroup = pushButtons.groups.find((/**
                     * @param {?} gr
                     * @return {?}
                     */
                    function (gr) { return gr.enabled; }));
                    /** @type {?} */
                    var cntPushButtons_1 = 0;
                    if (currentPushButtonGroup) {
                        currentPushButtonGroup.computedButtons.map((/**
                         * @param {?} cb
                         * @return {?}
                         */
                        function (cb) { return cntPushButtons_1 += cb.buttons.filter((/**
                         * @param {?} button
                         * @return {?}
                         */
                        function (button) { return button.enabled; })).length; }));
                    }
                    return cntPushButtons_1 > 0 ? cntPushButtons_1 : undefined;
                }
                else {
                    return;
                }
            }
            else if (filter && filter.filters && !filter.filters.filters) {
                return 1;
            }
            else if (filter && filter.filters && filter.filters.filters) {
                return filter.filters.filters.length;
            }
        },
        enumerable: true,
        configurable: true
    });
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
            if (value) {
                this.options = (/** @type {?} */ (this.layer.dataSource.options));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OgcFilterButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = (/** @type {?} */ (this.layer.dataSource.options));
    };
    OgcFilterButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-button',
                    template: "<button \r\n  *ngIf=\"header && options.ogcFilters && options.ogcFilters.enabled &&\r\n  (options.ogcFilters.pushButtons || options.ogcFilters.editable)\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\">\r\n  <mat-icon [matBadge]=\"badge\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" svgIcon=\"filter\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && options.ogcFilters.enabled &&\r\n(options.ogcFilters.pushButtons || options.ogcFilters.editable)\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [header]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
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
        header: [{ type: Input }]
    };
    return OgcFilterButtonComponent;
}());
export { OgcFilterButtonComponent };
if (false) {
    /** @type {?} */
    OgcFilterButtonComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    OgcFilterButtonComponent.prototype._layer;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.map;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.color;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.header;
    /** @type {?} */
    OgcFilterButtonComponent.prototype.ogcFilterCollapse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR25DO0lBbURFO1FBTlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUk1QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFbEIsQ0FBQztJQXpDaEIsc0JBQUksMkNBQUs7Ozs7UUFBVDs7Z0JBQ1EsTUFBTSxHQUFHLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFPO1lBQzdDLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFO2dCQUN4QyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7O3dCQUNoQixXQUFXLEdBQUcsbUJBQUEsTUFBTSxDQUFDLFdBQVcsRUFBaUI7O3dCQUNqRCxzQkFBc0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7b0JBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsT0FBTyxFQUFWLENBQVUsRUFBQzs7d0JBQ3BFLGdCQUFjLEdBQUcsQ0FBQztvQkFDdEIsSUFBSSxzQkFBc0IsRUFBRTt3QkFDMUIsc0JBQXNCLENBQUMsZUFBZSxDQUFDLEdBQUc7Ozs7d0JBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxnQkFBYyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTTs7Ozt3QkFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxPQUFPLEVBQWQsQ0FBYyxFQUFDLENBQUMsTUFBTSxFQUFwRSxDQUFvRSxFQUFDLENBQUM7cUJBQ3hIO29CQUNELE9BQU8sZ0JBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDeEQ7cUJBQU07b0JBQ0wsT0FBTztpQkFDUjthQUNGO2lCQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDOUQsT0FBTyxDQUFDLENBQUM7YUFDVjtpQkFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUM3RCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUN0QztRQUNILENBQUM7OztPQUFBO0lBRUQsc0JBQ0ksMkNBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBWTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBa0MsQ0FBQzthQUNoRjtRQUNILENBQUM7OztPQU5BOzs7O0lBbUJELDJDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFrQyxDQUFDO0lBQ2pGLENBQUM7O2dCQXZERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsdTVCQUFpRDtvQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7d0JBMEJFLEtBQUs7c0JBWUwsS0FBSzt3QkFFTCxLQUFLO3lCQUVMLEtBQUs7O0lBU1IsK0JBQUM7Q0FBQSxBQXhERCxJQXdEQztTQWxEWSx3QkFBd0I7OztJQUVuQywyQ0FBK0M7Ozs7O0lBaUMvQywwQ0FBZTs7SUFFZix1Q0FBcUI7O0lBRXJCLHlDQUFtQzs7SUFFbkMsMENBQXlCOztJQUV6QixxREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIElnb1B1c2hCdXR0b24sIE9nY0ZpbHRlcnNPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXItYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHB1YmxpYyBvcHRpb25zOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGdldCBiYWRnZSgpIHtcclxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMub3B0aW9ucy5vZ2NGaWx0ZXJzIGFzIGFueTtcclxuICAgIGlmIChmaWx0ZXIgJiYgIWZpbHRlci5hZHZhbmNlZE9nY0ZpbHRlcnMpIHtcclxuICAgICAgaWYgKGZpbHRlci5wdXNoQnV0dG9ucykge1xyXG4gICAgICAgIGNvbnN0IHB1c2hCdXR0b25zID0gZmlsdGVyLnB1c2hCdXR0b25zIGFzIElnb1B1c2hCdXR0b247XHJcbiAgICAgICAgY29uc3QgY3VycmVudFB1c2hCdXR0b25Hcm91cCA9IHB1c2hCdXR0b25zLmdyb3Vwcy5maW5kKGdyID0+IGdyLmVuYWJsZWQpO1xyXG4gICAgICAgIGxldCBjbnRQdXNoQnV0dG9ucyA9IDA7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQdXNoQnV0dG9uR3JvdXApIHtcclxuICAgICAgICAgIGN1cnJlbnRQdXNoQnV0dG9uR3JvdXAuY29tcHV0ZWRCdXR0b25zLm1hcChjYiA9PiBjbnRQdXNoQnV0dG9ucyArPSBjYi5idXR0b25zLmZpbHRlcihidXR0b24gPT4gYnV0dG9uLmVuYWJsZWQpLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbnRQdXNoQnV0dG9ucyA+IDAgPyBjbnRQdXNoQnV0dG9ucyA6IHVuZGVmaW5lZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlci5maWx0ZXJzICYmICFmaWx0ZXIuZmlsdGVycy5maWx0ZXJzKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmZpbHRlcnMgJiYgZmlsdGVyLmZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICByZXR1cm4gZmlsdGVyLmZpbHRlcnMuZmlsdGVycy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBsYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSAncHJpbWFyeSc7XHJcblxyXG4gIEBJbnB1dCgpIGhlYWRlcjogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIG9nY0ZpbHRlckNvbGxhcHNlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==