/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
export class OgcFilterButtonComponent {
    constructor() {
        this.color = 'primary';
        this.ogcFilterCollapse = false;
    }
    /**
     * @return {?}
     */
    get badge() {
        /** @type {?} */
        const filter = (/** @type {?} */ (this.options.ogcFilters));
        if (filter && !filter.advancedOgcFilters) {
            if (filter.pushButtons) {
                /** @type {?} */
                const pushButtons = (/** @type {?} */ (filter.pushButtons));
                /** @type {?} */
                const currentPushButtonGroup = pushButtons.groups.find((/**
                 * @param {?} gr
                 * @return {?}
                 */
                gr => gr.enabled));
                /** @type {?} */
                let cntPushButtons = 0;
                if (currentPushButtonGroup) {
                    currentPushButtonGroup.computedButtons.map((/**
                     * @param {?} cb
                     * @return {?}
                     */
                    cb => cntPushButtons += cb.buttons.filter((/**
                     * @param {?} button
                     * @return {?}
                     */
                    button => button.enabled)).length));
                }
                return cntPushButtons > 0 ? cntPushButtons : undefined;
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
    }
    /**
     * @return {?}
     */
    get layer() {
        return this._layer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layer(value) {
        this._layer = value;
        if (value) {
            this.options = (/** @type {?} */ (this.layer.dataSource.options));
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = (/** @type {?} */ (this.layer.dataSource.options));
    }
}
OgcFilterButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-button',
                template: "<button \r\n  *ngIf=\"header && options.ogcFilters && options.ogcFilters.enabled &&\r\n  (options.ogcFilters.pushButtons || options.ogcFilters.editable)\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\">\r\n  <mat-icon [matBadge]=\"badge\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" svgIcon=\"filter\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && options.ogcFilters.enabled &&\r\n(options.ogcFilters.pushButtons || options.ogcFilters.editable)\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [header]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
OgcFilterButtonComponent.ctorParameters = () => [];
OgcFilterButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    color: [{ type: Input }],
    header: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBU25DLE1BQU0sT0FBTyx3QkFBd0I7SUE2Q25DO1FBTlMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUk1QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFbEIsQ0FBQzs7OztJQXpDaEIsSUFBSSxLQUFLOztjQUNELE1BQU0sR0FBRyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBTztRQUM3QyxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTtZQUN4QyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7O3NCQUNoQixXQUFXLEdBQUcsbUJBQUEsTUFBTSxDQUFDLFdBQVcsRUFBaUI7O3NCQUNqRCxzQkFBc0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7Z0JBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDOztvQkFDcEUsY0FBYyxHQUFHLENBQUM7Z0JBQ3RCLElBQUksc0JBQXNCLEVBQUU7b0JBQzFCLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxHQUFHOzs7O29CQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztvQkFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQztpQkFDeEg7Z0JBQ0QsT0FBTyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzthQUN4RDtpQkFBTTtnQkFDTCxPQUFPO2FBQ1I7U0FDRjthQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM5RCxPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM3RCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7SUFFRCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQWtDLENBQUM7U0FDaEY7SUFDSCxDQUFDOzs7O0lBYUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFrQyxDQUFDO0lBQ2pGLENBQUM7OztZQXZERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsdTVCQUFpRDtnQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7OztvQkEwQkUsS0FBSztrQkFZTCxLQUFLO29CQUVMLEtBQUs7cUJBRUwsS0FBSzs7OztJQXZDTiwyQ0FBK0M7Ozs7O0lBaUMvQywwQ0FBZTs7SUFFZix1Q0FBcUI7O0lBRXJCLHlDQUFtQzs7SUFFbkMsMENBQXlCOztJQUV6QixxREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMsIElnb1B1c2hCdXR0b24sIE9nY0ZpbHRlcnNPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXItYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHB1YmxpYyBvcHRpb25zOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGdldCBiYWRnZSgpIHtcclxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMub3B0aW9ucy5vZ2NGaWx0ZXJzIGFzIGFueTtcclxuICAgIGlmIChmaWx0ZXIgJiYgIWZpbHRlci5hZHZhbmNlZE9nY0ZpbHRlcnMpIHtcclxuICAgICAgaWYgKGZpbHRlci5wdXNoQnV0dG9ucykge1xyXG4gICAgICAgIGNvbnN0IHB1c2hCdXR0b25zID0gZmlsdGVyLnB1c2hCdXR0b25zIGFzIElnb1B1c2hCdXR0b247XHJcbiAgICAgICAgY29uc3QgY3VycmVudFB1c2hCdXR0b25Hcm91cCA9IHB1c2hCdXR0b25zLmdyb3Vwcy5maW5kKGdyID0+IGdyLmVuYWJsZWQpO1xyXG4gICAgICAgIGxldCBjbnRQdXNoQnV0dG9ucyA9IDA7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQdXNoQnV0dG9uR3JvdXApIHtcclxuICAgICAgICAgIGN1cnJlbnRQdXNoQnV0dG9uR3JvdXAuY29tcHV0ZWRCdXR0b25zLm1hcChjYiA9PiBjbnRQdXNoQnV0dG9ucyArPSBjYi5idXR0b25zLmZpbHRlcihidXR0b24gPT4gYnV0dG9uLmVuYWJsZWQpLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbnRQdXNoQnV0dG9ucyA+IDAgPyBjbnRQdXNoQnV0dG9ucyA6IHVuZGVmaW5lZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZmlsdGVyICYmIGZpbHRlci5maWx0ZXJzICYmICFmaWx0ZXIuZmlsdGVycy5maWx0ZXJzKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmZpbHRlcnMgJiYgZmlsdGVyLmZpbHRlcnMuZmlsdGVycykge1xyXG4gICAgICByZXR1cm4gZmlsdGVyLmZpbHRlcnMuZmlsdGVycy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBsYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSAncHJpbWFyeSc7XHJcblxyXG4gIEBJbnB1dCgpIGhlYWRlcjogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIG9nY0ZpbHRlckNvbGxhcHNlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==