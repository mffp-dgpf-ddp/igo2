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
                    template: "<igo-layer-list\r\n  igoLayerListBinding\r\n  [excludeBaseLayers]=\"excludeBaseLayers\"\r\n  [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n  [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n  [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n  [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n\r\n  <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n    <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n    <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n    <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n  </ng-template>\r\n\r\n</igo-layer-list>\r\n"
                }] }
    ];
    MapDetailsToolComponent.propDecorators = {
        toggleLegendOnVisibilityChange: [{ type: Input }],
        expandLegendOfVisibleLayers: [{ type: Input }],
        updateLegendOnResolutionChange: [{ type: Input }],
        ogcFiltersInLayers: [{ type: Input }],
        layerListControls: [{ type: Input }]
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWRldGFpbHMtdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9tYXAvbWFwLWRldGFpbHMtdG9vbC9tYXAtZGV0YWlscy10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sV0FBVyxDQUFDOztJQUlsRDtRQVVXLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCxnQ0FBMkIsR0FBWSxLQUFLLENBQUM7UUFFN0MsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUVuQyxzQkFBaUIsR0FBNkIsRUFBRSxDQUFDO0lBeUI1RCxDQUFDO0lBdkJDLHNCQUFJLHNEQUFpQjs7OztRQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhEQUF5Qjs7OztRQUE3Qjs7Z0JBQ1EsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDdEMsV0FBVyxFQUFFLHFCQUFxQixDQUFDLE9BQU87YUFDM0MsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFMUIsUUFBUSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFO2dCQUMxQyxLQUFLLHFCQUFxQixDQUFDLE1BQU07b0JBQy9CLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7b0JBQzdELGlCQUFpQixDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztvQkFDL0MsTUFBTTtnQkFDUixLQUFLLHFCQUFxQixDQUFDLEtBQUs7b0JBQzlCLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7b0JBQzVELGlCQUFpQixDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztvQkFDL0MsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7WUFDRCxPQUFPLGlCQUFpQixDQUFDO1FBQzNCLENBQUM7OztPQUFBOztnQkFyQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLHd1QkFBZ0Q7aUJBQ2pEOzs7aURBRUUsS0FBSzs4Q0FFTCxLQUFLO2lEQUVMLEtBQUs7cUNBRUwsS0FBSztvQ0FFTCxLQUFLOztJQVRLLHVCQUF1QjtRQVRuQyxhQUFhLENBQUM7WUFDYixJQUFJLEVBQUUsWUFBWTtZQUNsQixLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztPQUtXLHVCQUF1QixDQWtDbkM7SUFBRCw4QkFBQztDQUFBLElBQUE7U0FsQ1ksdUJBQXVCOzs7SUFDbEMsaUVBQXlEOztJQUV6RCw4REFBc0Q7O0lBRXRELGlFQUF5RDs7SUFFekQscURBQTRDOztJQUU1QyxvREFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNFbnVtIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9tYXAtZGV0YWlscy10b29sLmludGVyZmFjZSc7XHJcblxyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ21hcERldGFpbHMnLFxyXG4gIHRpdGxlOiAnaWdvLmludGVncmF0aW9uLnRvb2xzLm1hcCcsXHJcbiAgaWNvbjogJ21hcCdcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbWFwLWRldGFpbHMtdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hcC1kZXRhaWxzLXRvb2wuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBEZXRhaWxzVG9vbENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZE9mVmlzaWJsZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgb2djRmlsdGVyc0luTGF5ZXJzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXJMaXN0Q29udHJvbHM6IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyA9IHt9O1xyXG5cclxuICBnZXQgZXhjbHVkZUJhc2VMYXllcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllckxpc3RDb250cm9scy5leGNsdWRlQmFzZUxheWVycyB8fCBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBsYXllckZpbHRlckFuZFNvcnRPcHRpb25zKCk6IGFueSB7XHJcbiAgICBjb25zdCBmaWx0ZXJTb3J0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICBzaG93VG9vbGJhcjogTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmRlZmF1bHRcclxuICAgIH0sIHRoaXMubGF5ZXJMaXN0Q29udHJvbHMpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5sYXllckxpc3RDb250cm9scy5zaG93VG9vbGJhcikge1xyXG4gICAgICBjYXNlIExheWVyTGlzdENvbnRyb2xzRW51bS5hbHdheXM6XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIgPSBMYXllckxpc3RDb250cm9sc0VudW0uYWx3YXlzO1xyXG4gICAgICAgIGZpbHRlclNvcnRPcHRpb25zLnRvb2xiYXJUaHJlc2hvbGQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyOlxyXG4gICAgICAgIGZpbHRlclNvcnRPcHRpb25zLnNob3dUb29sYmFyID0gTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyO1xyXG4gICAgICAgIGZpbHRlclNvcnRPcHRpb25zLnRvb2xiYXJUaHJlc2hvbGQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsdGVyU29ydE9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==