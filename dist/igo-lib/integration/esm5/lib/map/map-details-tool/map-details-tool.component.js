/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { LayerListControlsEnum } from '@igo2/geo';
var MapDetailsToolComponent = /** @class */ (function () {
    function MapDetailsToolComponent() {
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.ogcFiltersInLayers = true;
        this.layerListControls = {};
        this.queryBadge = false;
    }
    Object.defineProperty(MapDetailsToolComponent.prototype, "excludeBaseLayers", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListControls.excludeBaseLayers || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapDetailsToolComponent.prototype, "layerFilterAndSortOptions", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var filterSortOptions = Object.assign({
                showToolbar: LayerListControlsEnum.default
            }, this.layerListControls);
            switch (this.layerListControls.showToolbar) {
                case LayerListControlsEnum.always:
                    filterSortOptions.showToolbar = LayerListControlsEnum.always;
                    filterSortOptions.toolbarThreshold = undefined;
                    break;
                case LayerListControlsEnum.never:
                    filterSortOptions.showToolbar = LayerListControlsEnum.never;
                    filterSortOptions.toolbarThreshold = undefined;
                    break;
                default:
                    break;
            }
            return filterSortOptions;
        },
        enumerable: true,
        configurable: true
    });
    MapDetailsToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-map-details-tool',
                    template: "<igo-layer-list\r\n  igoLayerListBinding\r\n  [excludeBaseLayers]=\"excludeBaseLayers\"\r\n  [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n  [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n  [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n  [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n  [queryBadge]=\"queryBadge\">\r\n\r\n  <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n    <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n    <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n    <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n  </ng-template>\r\n\r\n</igo-layer-list>\r\n"
                }] }
    ];
    MapDetailsToolComponent.propDecorators = {
        toggleLegendOnVisibilityChange: [{ type: Input }],
        expandLegendOfVisibleLayers: [{ type: Input }],
        updateLegendOnResolutionChange: [{ type: Input }],
        ogcFiltersInLayers: [{ type: Input }],
        layerListControls: [{ type: Input }],
        queryBadge: [{ type: Input }]
    };
    MapDetailsToolComponent = tslib_1.__decorate([
        ToolComponent({
            name: 'mapDetails',
            title: 'igo.integration.tools.map',
            icon: 'map'
        })
    ], MapDetailsToolComponent);
    return MapDetailsToolComponent;
}());
export { MapDetailsToolComponent };
if (false) {
    /** @type {?} */
    MapDetailsToolComponent.prototype.toggleLegendOnVisibilityChange;
    /** @type {?} */
    MapDetailsToolComponent.prototype.expandLegendOfVisibleLayers;
    /** @type {?} */
    MapDetailsToolComponent.prototype.updateLegendOnResolutionChange;
    /** @type {?} */
    MapDetailsToolComponent.prototype.ogcFiltersInLayers;
    /** @type {?} */
    MapDetailsToolComponent.prototype.layerListControls;
    /** @type {?} */
    MapDetailsToolComponent.prototype.queryBadge;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWRldGFpbHMtdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9tYXAvbWFwLWRldGFpbHMtdG9vbC9tYXAtZGV0YWlscy10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sV0FBVyxDQUFDOztJQUlsRDtRQVVXLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCxnQ0FBMkIsR0FBWSxLQUFLLENBQUM7UUFFN0MsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUVuQyxzQkFBaUIsR0FBNkIsRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBWSxLQUFLLENBQUM7SUF5QnZDLENBQUM7SUF2QkMsc0JBQUksc0RBQWlCOzs7O1FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDO1FBQzNELENBQUM7OztPQUFBO0lBRUQsc0JBQUksOERBQXlCOzs7O1FBQTdCOztnQkFDUSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN0QyxXQUFXLEVBQUUscUJBQXFCLENBQUMsT0FBTzthQUMzQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUUxQixRQUFRLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7Z0JBQzFDLEtBQUsscUJBQXFCLENBQUMsTUFBTTtvQkFDL0IsaUJBQWlCLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztvQkFDN0QsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO29CQUMvQyxNQUFNO2dCQUNSLEtBQUsscUJBQXFCLENBQUMsS0FBSztvQkFDOUIsaUJBQWlCLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztvQkFDNUQsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO29CQUMvQyxNQUFNO2dCQUNSO29CQUNFLE1BQU07YUFDVDtZQUNELE9BQU8saUJBQWlCLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7O2dCQXZDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMseXdCQUFnRDtpQkFDakQ7OztpREFFRSxLQUFLOzhDQUVMLEtBQUs7aURBRUwsS0FBSztxQ0FFTCxLQUFLO29DQUVMLEtBQUs7NkJBRUwsS0FBSzs7SUFYSyx1QkFBdUI7UUFUbkMsYUFBYSxDQUFDO1lBQ2IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsS0FBSyxFQUFFLDJCQUEyQjtZQUNsQyxJQUFJLEVBQUUsS0FBSztTQUNaLENBQUM7T0FLVyx1QkFBdUIsQ0FvQ25DO0lBQUQsOEJBQUM7Q0FBQSxJQUFBO1NBcENZLHVCQUF1Qjs7O0lBQ2xDLGlFQUF5RDs7SUFFekQsOERBQXNEOztJQUV0RCxpRUFBeUQ7O0lBRXpELHFEQUE0Qzs7SUFFNUMsb0RBQTBEOztJQUUxRCw2Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNFbnVtIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9tYXAtZGV0YWlscy10b29sLmludGVyZmFjZSc7XHJcblxyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ21hcERldGFpbHMnLFxyXG4gIHRpdGxlOiAnaWdvLmludGVncmF0aW9uLnRvb2xzLm1hcCcsXHJcbiAgaWNvbjogJ21hcCdcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbWFwLWRldGFpbHMtdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hcC1kZXRhaWxzLXRvb2wuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBEZXRhaWxzVG9vbENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZE9mVmlzaWJsZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgb2djRmlsdGVyc0luTGF5ZXJzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXJMaXN0Q29udHJvbHM6IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyA9IHt9O1xyXG5cclxuICBASW5wdXQoKSBxdWVyeUJhZGdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGdldCBleGNsdWRlQmFzZUxheWVycygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdENvbnRyb2xzLmV4Y2x1ZGVCYXNlTGF5ZXJzIHx8IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKTogYW55IHtcclxuICAgIGNvbnN0IGZpbHRlclNvcnRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgIHNob3dUb29sYmFyOiBMYXllckxpc3RDb250cm9sc0VudW0uZGVmYXVsdFxyXG4gICAgfSwgdGhpcy5sYXllckxpc3RDb250cm9scyk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmxheWVyTGlzdENvbnRyb2xzLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICBmaWx0ZXJTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9IExheWVyTGlzdENvbnRyb2xzRW51bS5hbHdheXM7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIgPSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBmaWx0ZXJTb3J0T3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19