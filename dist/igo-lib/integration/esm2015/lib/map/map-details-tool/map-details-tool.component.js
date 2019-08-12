/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { LayerListControlsEnum } from '@igo2/geo';
let MapDetailsToolComponent = class MapDetailsToolComponent {
    constructor() {
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.ogcFiltersInLayers = true;
        this.layerListControls = {};
    }
    /**
     * @return {?}
     */
    get excludeBaseLayers() {
        return this.layerListControls.excludeBaseLayers || false;
    }
    /**
     * @return {?}
     */
    get layerFilterAndSortOptions() {
        /** @type {?} */
        const filterSortOptions = Object.assign({
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
    }
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWRldGFpbHMtdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9tYXAvbWFwLWRldGFpbHMtdG9vbC9tYXAtZGV0YWlscy10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sV0FBVyxDQUFDO0lBYXJDLHVCQUF1QixTQUF2Qix1QkFBdUI7SUFUcEM7UUFVVyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFFaEQsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO1FBRTdDLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFFbkMsc0JBQWlCLEdBQTZCLEVBQUUsQ0FBQztJQXlCNUQsQ0FBQzs7OztJQXZCQyxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUM7SUFDM0QsQ0FBQzs7OztJQUVELElBQUkseUJBQXlCOztjQUNyQixpQkFBaUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3RDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxPQUFPO1NBQzNDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRTFCLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtZQUMxQyxLQUFLLHFCQUFxQixDQUFDLE1BQU07Z0JBQy9CLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzdELGlCQUFpQixDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztnQkFDL0MsTUFBTTtZQUNSLEtBQUsscUJBQXFCLENBQUMsS0FBSztnQkFDOUIsaUJBQWlCLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztnQkFDNUQsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO2dCQUMvQyxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0NBQ0YsQ0FBQTs7WUF0Q0EsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLHd1QkFBZ0Q7YUFDakQ7Ozs2Q0FFRSxLQUFLOzBDQUVMLEtBQUs7NkNBRUwsS0FBSztpQ0FFTCxLQUFLO2dDQUVMLEtBQUs7O0FBVEssdUJBQXVCO0lBVG5DLGFBQWEsQ0FBQztRQUNiLElBQUksRUFBRSxZQUFZO1FBQ2xCLEtBQUssRUFBRSwyQkFBMkI7UUFDbEMsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDO0dBS1csdUJBQXVCLENBa0NuQztTQWxDWSx1QkFBdUI7OztJQUNsQyxpRUFBeUQ7O0lBRXpELDhEQUFzRDs7SUFFdEQsaUVBQXlEOztJQUV6RCxxREFBNEM7O0lBRTVDLG9EQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc0VudW0gfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL21hcC1kZXRhaWxzLXRvb2wuaW50ZXJmYWNlJztcclxuXHJcbkBUb29sQ29tcG9uZW50KHtcclxuICBuYW1lOiAnbWFwRGV0YWlscycsXHJcbiAgdGl0bGU6ICdpZ28uaW50ZWdyYXRpb24udG9vbHMubWFwJyxcclxuICBpY29uOiAnbWFwJ1xyXG59KVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1tYXAtZGV0YWlscy10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFwLWRldGFpbHMtdG9vbC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcERldGFpbHNUb29sQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSB0b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kTGVnZW5kT2ZWaXNpYmxlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBvZ2NGaWx0ZXJzSW5MYXllcnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBsYXllckxpc3RDb250cm9sczogTGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zID0ge307XHJcblxyXG4gIGdldCBleGNsdWRlQmFzZUxheWVycygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdENvbnRyb2xzLmV4Y2x1ZGVCYXNlTGF5ZXJzIHx8IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKTogYW55IHtcclxuICAgIGNvbnN0IGZpbHRlclNvcnRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgIHNob3dUb29sYmFyOiBMYXllckxpc3RDb250cm9sc0VudW0uZGVmYXVsdFxyXG4gICAgfSwgdGhpcy5sYXllckxpc3RDb250cm9scyk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmxheWVyTGlzdENvbnRyb2xzLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICBmaWx0ZXJTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9IExheWVyTGlzdENvbnRyb2xzRW51bS5hbHdheXM7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIgPSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBmaWx0ZXJTb3J0T3B0aW9ucztcclxuICB9XHJcbn1cclxuIl19