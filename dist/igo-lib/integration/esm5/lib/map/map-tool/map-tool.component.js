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
var MapToolComponent = /** @class */ (function () {
    function MapToolComponent() {
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.ogcFiltersInLayers = true;
        this.layerListControls = {};
        this.queryBadge = false;
    }
    Object.defineProperty(MapToolComponent.prototype, "excludeBaseLayers", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListControls.excludeBaseLayers || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapToolComponent.prototype, "layerFilterAndSortOptions", {
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
    return MapToolComponent;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvbWFwL21hcC10b29sL21hcC10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztJQU1sRDtRQWFXLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCxnQ0FBMkIsR0FBWSxLQUFLLENBQUM7UUFFN0MsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUVuQyxzQkFBaUIsR0FBNkIsRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBWSxLQUFLLENBQUM7SUEwQnZDLENBQUM7SUF4QkMsc0JBQUksK0NBQWlCOzs7O1FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDO1FBQzNELENBQUM7OztPQUFBO0lBRUQsc0JBQUksdURBQXlCOzs7O1FBQTdCOztnQkFDUSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN0QyxXQUFXLEVBQUUscUJBQXFCLENBQUMsT0FBTzthQUMzQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUUxQixRQUFRLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7Z0JBQzFDLEtBQUsscUJBQXFCLENBQUMsTUFBTTtvQkFDL0IsaUJBQWlCLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztvQkFDN0QsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO29CQUMvQyxNQUFNO2dCQUNSLEtBQUsscUJBQXFCLENBQUMsS0FBSztvQkFDOUIsaUJBQWlCLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztvQkFDNUQsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO29CQUMvQyxNQUFNO2dCQUNSO29CQUNFLE1BQU07YUFDVDtZQUNELE9BQU8saUJBQWlCLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7O2dCQTFDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLDRtQ0FBd0M7b0JBRXhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7OztpREFHRSxLQUFLOzhDQUVMLEtBQUs7aURBRUwsS0FBSztxQ0FFTCxLQUFLO29DQUVMLEtBQUs7NkJBRUwsS0FBSzs7Ozs7SUFaSyxnQkFBZ0I7UUFYNUIsYUFBYSxDQUFDO1lBQ2IsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztPQU9XLGdCQUFnQixDQXNDNUI7SUFBRCx1QkFBQztDQUFBLElBQUE7U0F0Q1ksZ0JBQWdCOzs7SUFFM0IsMERBQXlEOztJQUV6RCx1REFBc0Q7O0lBRXRELDBEQUF5RDs7SUFFekQsOENBQTRDOztJQUU1Qyw2Q0FBMEQ7O0lBRTFELHNDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNFbnVtIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9tYXAtZGV0YWlscy10b29sLmludGVyZmFjZSc7XHJcbi8qKlxyXG4gKiBUb29sIHRvIGJyb3dzZSBhIG1hcCdzIGxheWVycyBvciB0byBjaG9vc2UgYSBkaWZmZXJlbnQgbWFwXHJcbiAqL1xyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ21hcCcsXHJcbiAgdGl0bGU6ICdpZ28uaW50ZWdyYXRpb24udG9vbHMubWFwJyxcclxuICBpY29uOiAnbWFwJ1xyXG59KVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1tYXAtdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hcC10b29sLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tYXAtdG9vbC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBUb29sQ29tcG9uZW50IHtcclxuXHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZE9mVmlzaWJsZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgb2djRmlsdGVyc0luTGF5ZXJzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXJMaXN0Q29udHJvbHM6IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyA9IHt9O1xyXG5cclxuICBASW5wdXQoKSBxdWVyeUJhZGdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGdldCBleGNsdWRlQmFzZUxheWVycygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdENvbnRyb2xzLmV4Y2x1ZGVCYXNlTGF5ZXJzIHx8IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKTogYW55IHtcclxuICAgIGNvbnN0IGZpbHRlclNvcnRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgIHNob3dUb29sYmFyOiBMYXllckxpc3RDb250cm9sc0VudW0uZGVmYXVsdFxyXG4gICAgfSwgdGhpcy5sYXllckxpc3RDb250cm9scyk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmxheWVyTGlzdENvbnRyb2xzLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICBmaWx0ZXJTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9IExheWVyTGlzdENvbnRyb2xzRW51bS5hbHdheXM7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIgPSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI7XHJcbiAgICAgICAgZmlsdGVyU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBmaWx0ZXJTb3J0T3B0aW9ucztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==