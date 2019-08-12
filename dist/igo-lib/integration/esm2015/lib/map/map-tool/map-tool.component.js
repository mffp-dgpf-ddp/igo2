/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { LayerListControlsEnum } from '@igo2/geo';
/**
 * Tool to browse a map's layers or to choose a different map
 */
let MapToolComponent = /**
 * Tool to browse a map's layers or to choose a different map
 */
class MapToolComponent {
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
MapToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-map-tool',
                template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.map' |\u00A0translate\">\r\n    <igo-layer-list\r\n      igoLayerListBinding\r\n      [excludeBaseLayers]=\"excludeBaseLayers\"\r\n      [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n      [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n      [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n      [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n\r\n      <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n        <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n        <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n        <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n      </ng-template>\r\n\r\n    </igo-layer-list>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.contexts' |\u00A0translate\">\r\n    <igo-context-list igoContextListBinding></igo-context-list>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-tab-group,mat-tab-group ::ng-deep .mat-tab-body-wrapper{height:100%}"]
            }] }
];
MapToolComponent.propDecorators = {
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendOfVisibleLayers: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    ogcFiltersInLayers: [{ type: Input }],
    layerListControls: [{ type: Input }]
};
/**
 * Tool to browse a map's layers or to choose a different map
 */
MapToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'map',
        title: 'igo.integration.tools.map',
        icon: 'map'
    })
], MapToolComponent);
export { MapToolComponent };
if (false) {
    /** @type {?} */
    MapToolComponent.prototype.toggleLegendOnVisibilityChange;
    /** @type {?} */
    MapToolComponent.prototype.expandLegendOfVisibleLayers;
    /** @type {?} */
    MapToolComponent.prototype.updateLegendOnResolutionChange;
    /** @type {?} */
    MapToolComponent.prototype.ogcFiltersInLayers;
    /** @type {?} */
    MapToolComponent.prototype.layerListControls;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvbWFwL21hcC10b29sL21hcC10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0lBaUJyQyxnQkFBZ0I7OztNQUFoQixnQkFBZ0I7SUFYN0I7UUFhVyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFFaEQsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO1FBRTdDLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFFbkMsc0JBQWlCLEdBQTZCLEVBQUUsQ0FBQztJQTBCNUQsQ0FBQzs7OztJQXhCQyxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUM7SUFDM0QsQ0FBQzs7OztJQUVELElBQUkseUJBQXlCOztjQUNyQixpQkFBaUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3RDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxPQUFPO1NBQzNDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRTFCLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtZQUMxQyxLQUFLLHFCQUFxQixDQUFDLE1BQU07Z0JBQy9CLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzdELGlCQUFpQixDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztnQkFDL0MsTUFBTTtZQUNSLEtBQUsscUJBQXFCLENBQUMsS0FBSztnQkFDOUIsaUJBQWlCLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztnQkFDNUQsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO2dCQUMvQyxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0NBRUYsQ0FBQTs7WUExQ0EsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4Qix1a0NBQXdDO2dCQUV4QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs2Q0FHRSxLQUFLOzBDQUVMLEtBQUs7NkNBRUwsS0FBSztpQ0FFTCxLQUFLO2dDQUVMLEtBQUs7Ozs7O0FBVkssZ0JBQWdCO0lBWDVCLGFBQWEsQ0FBQztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLDJCQUEyQjtRQUNsQyxJQUFJLEVBQUUsS0FBSztLQUNaLENBQUM7R0FPVyxnQkFBZ0IsQ0FvQzVCO1NBcENZLGdCQUFnQjs7O0lBRTNCLDBEQUF5RDs7SUFFekQsdURBQXNEOztJQUV0RCwwREFBeUQ7O0lBRXpELDhDQUE0Qzs7SUFFNUMsNkNBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc0VudW0gfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL21hcC1kZXRhaWxzLXRvb2wuaW50ZXJmYWNlJztcclxuLyoqXHJcbiAqIFRvb2wgdG8gYnJvd3NlIGEgbWFwJ3MgbGF5ZXJzIG9yIHRvIGNob29zZSBhIGRpZmZlcmVudCBtYXBcclxuICovXHJcbkBUb29sQ29tcG9uZW50KHtcclxuICBuYW1lOiAnbWFwJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5tYXAnLFxyXG4gIGljb246ICdtYXAnXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1hcC10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFwLXRvb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hcC10b29sLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcFRvb2xDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKSB0b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kTGVnZW5kT2ZWaXNpYmxlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBvZ2NGaWx0ZXJzSW5MYXllcnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBsYXllckxpc3RDb250cm9sczogTGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zID0ge307XHJcblxyXG4gIGdldCBleGNsdWRlQmFzZUxheWVycygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdENvbnRyb2xzLmV4Y2x1ZGVCYXNlTGF5ZXJzIHx8IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKTogYW55IHtcclxuICAgIGNvbnN0IGZpbHRlclNvcnRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgIHNob3dUb29sYmFyOiBMYXllckxpc3RDb250cm9sc0VudW0uZGVmYXVsdFxyXG4gICAgfSwgdGhpcy5sYXllckxpc3RDb250cm9scyk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmxheWVyTGlzdENvbnRyb2xzLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICBmaWx0ZXJTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9IExheWVyTGlzdENvbnRyb2xzRW51bS5hbHdheXM7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIgPSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBmaWx0ZXJTb3J0T3B0aW9ucztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==