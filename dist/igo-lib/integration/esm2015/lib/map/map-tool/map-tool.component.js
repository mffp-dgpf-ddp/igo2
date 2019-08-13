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
        this.queryBadge = false;
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
                template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.map' |\u00A0translate\">\r\n    <igo-layer-list\r\n      igoLayerListBinding\r\n      [excludeBaseLayers]=\"excludeBaseLayers\"\r\n      [layerFilterAndSortOptions]=\"layerFilterAndSortOptions\"\r\n      [expandLegendOfVisibleLayers]=\"expandLegendOfVisibleLayers\"\r\n      [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n      [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n      [queryBadge]=\"queryBadge\">\r\n\r\n      <ng-template #igoLayerItemToolbar let-layer=\"layer\">\r\n        <igo-download-button [layer]=\"layer\"></igo-download-button>\r\n        <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n        <igo-ogc-filter-button [ogcFiltersInLayers]=\"ogcFiltersInLayers\" [layer]=\"layer\"></igo-ogc-filter-button>\r\n      </ng-template>\r\n\r\n    </igo-layer-list>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.integration.tools.contexts' |\u00A0translate\">\r\n    <igo-context-list igoContextListBinding></igo-context-list>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-tab-group,mat-tab-group ::ng-deep .mat-tab-body-wrapper{height:100%}"]
            }] }
];
MapToolComponent.propDecorators = {
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendOfVisibleLayers: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    ogcFiltersInLayers: [{ type: Input }],
    layerListControls: [{ type: Input }],
    queryBadge: [{ type: Input }]
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
    /** @type {?} */
    MapToolComponent.prototype.queryBadge;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvbWFwL21hcC10b29sL21hcC10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0lBaUJyQyxnQkFBZ0I7OztNQUFoQixnQkFBZ0I7SUFYN0I7UUFhVyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFFaEQsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO1FBRTdDLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFFbkMsc0JBQWlCLEdBQTZCLEVBQUUsQ0FBQztRQUVqRCxlQUFVLEdBQVksS0FBSyxDQUFDO0lBMEJ2QyxDQUFDOzs7O0lBeEJDLElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQztJQUMzRCxDQUFDOzs7O0lBRUQsSUFBSSx5QkFBeUI7O2NBQ3JCLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdEMsV0FBVyxFQUFFLHFCQUFxQixDQUFDLE9BQU87U0FDM0MsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFFMUIsUUFBUSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFO1lBQzFDLEtBQUsscUJBQXFCLENBQUMsTUFBTTtnQkFDL0IsaUJBQWlCLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztnQkFDN0QsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO2dCQUMvQyxNQUFNO1lBQ1IsS0FBSyxxQkFBcUIsQ0FBQyxLQUFLO2dCQUM5QixpQkFBaUIsQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDO2dCQUM1RCxpQkFBaUIsQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7Z0JBQy9DLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7UUFDRCxPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7Q0FFRixDQUFBOztZQTVDQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDRtQ0FBd0M7Z0JBRXhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OzZDQUdFLEtBQUs7MENBRUwsS0FBSzs2Q0FFTCxLQUFLO2lDQUVMLEtBQUs7Z0NBRUwsS0FBSzt5QkFFTCxLQUFLOzs7OztBQVpLLGdCQUFnQjtJQVg1QixhQUFhLENBQUM7UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSwyQkFBMkI7UUFDbEMsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDO0dBT1csZ0JBQWdCLENBc0M1QjtTQXRDWSxnQkFBZ0I7OztJQUUzQiwwREFBeUQ7O0lBRXpELHVEQUFzRDs7SUFFdEQsMERBQXlEOztJQUV6RCw4Q0FBNEM7O0lBRTVDLDZDQUEwRDs7SUFFMUQsc0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc0VudW0gfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL21hcC1kZXRhaWxzLXRvb2wuaW50ZXJmYWNlJztcclxuLyoqXHJcbiAqIFRvb2wgdG8gYnJvd3NlIGEgbWFwJ3MgbGF5ZXJzIG9yIHRvIGNob29zZSBhIGRpZmZlcmVudCBtYXBcclxuICovXHJcbkBUb29sQ29tcG9uZW50KHtcclxuICBuYW1lOiAnbWFwJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5tYXAnLFxyXG4gIGljb246ICdtYXAnXHJcbn0pXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1hcC10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFwLXRvb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hcC10b29sLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcFRvb2xDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKSB0b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kTGVnZW5kT2ZWaXNpYmxlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBvZ2NGaWx0ZXJzSW5MYXllcnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBsYXllckxpc3RDb250cm9sczogTGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zID0ge307XHJcblxyXG4gIEBJbnB1dCgpIHF1ZXJ5QmFkZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGV4Y2x1ZGVCYXNlTGF5ZXJzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJMaXN0Q29udHJvbHMuZXhjbHVkZUJhc2VMYXllcnMgfHwgZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQgbGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucygpOiBhbnkge1xyXG4gICAgY29uc3QgZmlsdGVyU29ydE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcclxuICAgICAgc2hvd1Rvb2xiYXI6IExheWVyTGlzdENvbnRyb2xzRW51bS5kZWZhdWx0XHJcbiAgICB9LCB0aGlzLmxheWVyTGlzdENvbnRyb2xzKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMubGF5ZXJMaXN0Q29udHJvbHMuc2hvd1Rvb2xiYXIpIHtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0uYWx3YXlzOlxyXG4gICAgICAgIGZpbHRlclNvcnRPcHRpb25zLnNob3dUb29sYmFyID0gTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5cztcclxuICAgICAgICBmaWx0ZXJTb3J0T3B0aW9ucy50b29sYmFyVGhyZXNob2xkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIExheWVyTGlzdENvbnRyb2xzRW51bS5uZXZlcjpcclxuICAgICAgICBmaWx0ZXJTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9IExheWVyTGlzdENvbnRyb2xzRW51bS5uZXZlcjtcclxuICAgICAgICBmaWx0ZXJTb3J0T3B0aW9ucy50b29sYmFyVGhyZXNob2xkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbHRlclNvcnRPcHRpb25zO1xyXG4gIH1cclxuXHJcbn1cclxuIl19