/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy
// ChangeDetectorRef
 } from '@angular/core';
import { map } from 'rxjs/operators';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import { ToolComponent, getEntityTitle } from '@igo2/common';
import { LayerService, FEATURE, FeatureMotion, LAYER, moveToOlFeatures } from '@igo2/geo';
import { MapState } from '../../map/map.state';
import { SearchState } from '../search.state';
/**
 * Tool to browse the search results
 */
let SearchResultsToolComponent = /**
 * Tool to browse the search results
 */
class SearchResultsToolComponent {
    /**
     * @param {?} mapState
     * @param {?} layerService
     * @param {?} searchState
     */
    constructor(mapState, layerService, searchState // private cdRef: ChangeDetectorRef
    ) {
        this.mapState = mapState;
        this.layerService = layerService;
        this.searchState = searchState;
        this.topPanelState = 'initial';
        this.format = new olFormatGeoJSON();
    }
    /**
     * Store holding the search results
     * \@internal
     * @return {?}
     */
    get store() {
        return this.searchState.store;
    }
    /**
     * Map to display the results on
     * \@internal
     * @return {?}
     */
    get map() {
        return this.mapState.map;
    }
    /**
     * @return {?}
     */
    get featureTitle() {
        return this.feature ? getEntityTitle(this.feature) : undefined;
    }
    /**
     * @return {?}
     */
    get feature$() {
        return this.store.stateView
            .firstBy$((/**
         * @param {?} e
         * @return {?}
         */
        e => e.state.focused))
            .pipe(map((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            this.feature = element ? ((/** @type {?} */ (element.entity.data))) : undefined;
            return this.feature;
        })));
    }
    /**
     * Try to add a feature to the map when it's being focused
     * \@internal
     * @param {?} result A search result that could be a feature
     * @return {?}
     */
    onResultFocus(result) {
        if (this.topPanelState === 'initial') {
            this.toggleTopPanel();
        }
        this.tryAddFeatureToMap(result);
    }
    /**
     * Try to add a feature or a layer to the map when it's being selected
     * \@internal
     * @param {?} result A search result that could be a feature or some layer options
     * @return {?}
     */
    onResultSelect(result) {
        if (this.topPanelState === 'initial') {
            this.toggleTopPanel();
        }
        this.tryAddFeatureToMap(result);
        this.tryAddLayerToMap(result);
    }
    /**
     * @return {?}
     */
    toggleTopPanel() {
        if (this.topPanelState === 'collapsed') {
            this.topPanelState = 'expanded';
        }
        else {
            this.topPanelState = 'collapsed';
        }
    }
    /**
     * @return {?}
     */
    zoomToFeatureExtent() {
        if (this.feature.geometry) {
            /** @type {?} */
            const olFeature = this.format.readFeature(this.feature, {
                dataProjection: this.feature.projection,
                featureProjection: this.map.projection
            });
            moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
    }
    /**
     * Try to add a feature to the map overlay
     * @private
     * @param {?} result A search result that could be a feature
     * @return {?}
     */
    tryAddFeatureToMap(result) {
        if (result.meta.dataType !== FEATURE) {
            return undefined;
        }
        /** @type {?} */
        const feature = ((/** @type {?} */ (result))).data;
        // Somethimes features have no geometry. It happens with some GetFeatureInfo
        if (feature.geometry === undefined) {
            return;
        }
        this.map.overlay.setFeatures([feature], FeatureMotion.Default);
    }
    /**
     * Try to add a layer to the map
     * @private
     * @param {?} result A search result that could be some layer options
     * @return {?}
     */
    tryAddLayerToMap(result) {
        if (this.map === undefined) {
            return;
        }
        if (result.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const layerOptions = ((/** @type {?} */ (result))).data;
        this.layerService
            .createAsyncLayer(layerOptions)
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.map.addLayer(layer)));
    }
};
SearchResultsToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results-tool',
                template: "<igo-flexible\r\n  #topPanel\r\n  initial=\"100%\"\r\n  initialMobile=\"100%\"\r\n  collapsed=\"60%\"\r\n  expanded=\"calc(100% - 58px)\"\r\n  [state]=\"topPanelState\">\r\n\r\n  <div class=\"igo-content\">\r\n    <igo-search-results\r\n      [store]=\"store\"\r\n      (resultFocus)=\"onResultFocus($event)\"\r\n      (resultSelect)=\"onResultSelect($event)\">\r\n    </igo-search-results>\r\n  </div>\r\n\r\n  <div igoFlexibleFill class=\"igo-content\">\r\n    <igo-panel [title]=\"featureTitle\" *ngIf=\"feature$ |\u00A0async\">\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelLeftButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"toggleTopPanel()\">\r\n        <mat-icon [svgIcon]=\"topPanel.state === 'collapsed'? 'arrow-down' : 'arrow-up'\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        panelRightButton\r\n        class=\"igo-icon-button\"\r\n        (click)=\"zoomToFeatureExtent()\"\r\n        *ngIf=\"feature.geometry\">\r\n        <mat-icon svgIcon=\"magnify-plus-outline\"></mat-icon>\r\n      </button>\r\n\r\n      <igo-feature-details\r\n        [feature]=\"feature$ | async\">\r\n      </igo-feature-details>\r\n    </igo-panel>\r\n  </div>\r\n\r\n</igo-flexible>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SearchResultsToolComponent.ctorParameters = () => [
    { type: MapState },
    { type: LayerService },
    { type: SearchState }
];
/**
 * Tool to browse the search results
 */
SearchResultsToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'searchResults',
        title: 'igo.integration.tools.searchResults',
        icon: 'magnify'
    }),
    tslib_1.__metadata("design:paramtypes", [MapState,
        LayerService,
        SearchState // private cdRef: ChangeDetectorRef
    ])
], SearchResultsToolComponent);
export { SearchResultsToolComponent };
if (false) {
    /** @type {?} */
    SearchResultsToolComponent.prototype.feature;
    /** @type {?} */
    SearchResultsToolComponent.prototype.topPanelState;
    /**
     * @type {?}
     * @private
     */
    SearchResultsToolComponent.prototype.format;
    /**
     * @type {?}
     * @private
     */
    SearchResultsToolComponent.prototype.mapState;
    /**
     * @type {?}
     * @private
     */
    SearchResultsToolComponent.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    SearchResultsToolComponent.prototype.searchState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLXJlc3VsdHMtdG9vbC9zZWFyY2gtcmVzdWx0cy10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCO0FBQ3ZCLG9CQUFvQjtFQUNyQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUVMLGFBQWEsRUFFYixjQUFjLEVBQ2YsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUNMLFlBQVksRUFFWixPQUFPLEVBRVAsYUFBYSxFQUNiLEtBQUssRUFHTCxnQkFBZ0IsRUFDakIsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztJQWVqQywwQkFBMEI7OztNQUExQiwwQkFBMEI7Ozs7OztJQXFDckMsWUFDVSxRQUFrQixFQUNsQixZQUEwQixFQUMxQixXQUF3QixDQUFDLG1DQUFtQzs7UUFGNUQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQU4zQixrQkFBYSxHQUFrQixTQUFTLENBQUM7UUFDeEMsV0FBTSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFNcEMsQ0FBQzs7Ozs7O0lBcENKLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxHQUFH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QyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ2xDLE9BQU8sU0FBUyxDQUFDO1NBQ2xCOztjQUNLLFlBQVksR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBOEIsQ0FBQyxDQUFDLElBQUk7UUFDaEUsSUFBSSxDQUFDLFlBQVk7YUFDZCxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7YUFDOUIsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0YsQ0FBQTs7WUE5SEEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLHN2Q0FBbUQ7Z0JBQ25ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBaEJRLFFBQVE7WUFYZixZQUFZO1lBYUwsV0FBVzs7Ozs7QUFlUCwwQkFBMEI7SUFWdEMsYUFBYSxDQUFDO1FBQ2IsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLHFDQUFxQztRQUM1QyxJQUFJLEVBQUUsU0FBUztLQUNoQixDQUFDOzZDQTRDb0IsUUFBUTtRQUNKLFlBQVk7UUFDYixXQUFXLENBQUMsbUNBQW1DOztHQXhDM0QsMEJBQTBCLENBeUh0QztTQXpIWSwwQkFBMEI7OztJQWdDckMsNkNBQXdCOztJQUV4QixtREFBZ0Q7Ozs7O0lBQ2hELDRDQUF1Qzs7Ozs7SUFHckMsOENBQTBCOzs7OztJQUMxQixrREFBa0M7Ozs7O0lBQ2xDLGlEQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbiAgLy8gQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCBvbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5cclxuaW1wb3J0IHtcclxuICBFbnRpdHlTdG9yZSxcclxuICBUb29sQ29tcG9uZW50LFxyXG4gIEZsZXhpYmxlU3RhdGUsXHJcbiAgZ2V0RW50aXR5VGl0bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBMYXllclNlcnZpY2UsXHJcbiAgTGF5ZXJPcHRpb25zLFxyXG4gIEZFQVRVUkUsXHJcbiAgRmVhdHVyZSxcclxuICBGZWF0dXJlTW90aW9uLFxyXG4gIExBWUVSLFxyXG4gIFNlYXJjaFJlc3VsdCxcclxuICBJZ29NYXAsXHJcbiAgbW92ZVRvT2xGZWF0dXJlc1xyXG59IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBNYXBTdGF0ZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc3RhdGUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoU3RhdGUgfSBmcm9tICcuLi9zZWFyY2guc3RhdGUnO1xyXG5cclxuLyoqXHJcbiAqIFRvb2wgdG8gYnJvd3NlIHRoZSBzZWFyY2ggcmVzdWx0c1xyXG4gKi9cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdzZWFyY2hSZXN1bHRzJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5zZWFyY2hSZXN1bHRzJyxcclxuICBpY29uOiAnbWFnbmlmeSdcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLXJlc3VsdHMtdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLXRvb2wuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzVG9vbENvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgICogU3RvcmUgaG9sZGluZyB0aGUgc2VhcmNoIHJlc3VsdHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgc3RvcmUoKTogRW50aXR5U3RvcmU8U2VhcmNoUmVzdWx0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hTdGF0ZS5zdG9yZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBkaXNwbGF5IHRoZSByZXN1bHRzIG9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU3RhdGUubWFwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGZlYXR1cmVUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZSA/IGdldEVudGl0eVRpdGxlKHRoaXMuZmVhdHVyZSkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgZmVhdHVyZSQoKTogT2JzZXJ2YWJsZTxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zdGF0ZVZpZXdcclxuICAgICAgLmZpcnN0QnkkKGUgPT4gZS5zdGF0ZS5mb2N1c2VkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZlYXR1cmUgPSBlbGVtZW50ID8gKGVsZW1lbnQuZW50aXR5LmRhdGEgYXMgRmVhdHVyZSkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5mZWF0dXJlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmVhdHVyZTogRmVhdHVyZTtcclxuXHJcbiAgcHVibGljIHRvcFBhbmVsU3RhdGU6IEZsZXhpYmxlU3RhdGUgPSAnaW5pdGlhbCc7XHJcbiAgcHJpdmF0ZSBmb3JtYXQgPSBuZXcgb2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtYXBTdGF0ZTogTWFwU3RhdGUsXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTdGF0ZTogU2VhcmNoU3RhdGUgLy8gcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyeSB0byBhZGQgYSBmZWF0dXJlIHRvIHRoZSBtYXAgd2hlbiBpdCdzIGJlaW5nIGZvY3VzZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKiBAcGFyYW0gcmVzdWx0IEEgc2VhcmNoIHJlc3VsdCB0aGF0IGNvdWxkIGJlIGEgZmVhdHVyZVxyXG4gICAqL1xyXG4gIG9uUmVzdWx0Rm9jdXMocmVzdWx0OiBTZWFyY2hSZXN1bHQpIHtcclxuICAgIGlmICh0aGlzLnRvcFBhbmVsU3RhdGUgPT09ICdpbml0aWFsJykge1xyXG4gICAgICB0aGlzLnRvZ2dsZVRvcFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRyeUFkZEZlYXR1cmVUb01hcChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJ5IHRvIGFkZCBhIGZlYXR1cmUgb3IgYSBsYXllciB0byB0aGUgbWFwIHdoZW4gaXQncyBiZWluZyBzZWxlY3RlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSByZXN1bHQgQSBzZWFyY2ggcmVzdWx0IHRoYXQgY291bGQgYmUgYSBmZWF0dXJlIG9yIHNvbWUgbGF5ZXIgb3B0aW9uc1xyXG4gICAqL1xyXG4gIG9uUmVzdWx0U2VsZWN0KHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICBpZiAodGhpcy50b3BQYW5lbFN0YXRlID09PSAnaW5pdGlhbCcpIHtcclxuICAgICAgdGhpcy50b2dnbGVUb3BQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50cnlBZGRGZWF0dXJlVG9NYXAocmVzdWx0KTtcclxuICAgIHRoaXMudHJ5QWRkTGF5ZXJUb01hcChyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVG9wUGFuZWwoKSB7XHJcbiAgICBpZiAodGhpcy50b3BQYW5lbFN0YXRlID09PSAnY29sbGFwc2VkJykge1xyXG4gICAgICB0aGlzLnRvcFBhbmVsU3RhdGUgPSAnZXhwYW5kZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50b3BQYW5lbFN0YXRlID0gJ2NvbGxhcHNlZCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB6b29tVG9GZWF0dXJlRXh0ZW50KCkge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZS5nZW9tZXRyeSkge1xyXG4gICAgICBjb25zdCBvbEZlYXR1cmUgPSB0aGlzLmZvcm1hdC5yZWFkRmVhdHVyZSh0aGlzLmZlYXR1cmUsIHtcclxuICAgICAgICBkYXRhUHJvamVjdGlvbjogdGhpcy5mZWF0dXJlLnByb2plY3Rpb24sXHJcbiAgICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb25cclxuICAgICAgfSk7XHJcbiAgICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIFtvbEZlYXR1cmVdLCBGZWF0dXJlTW90aW9uLlpvb20pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJ5IHRvIGFkZCBhIGZlYXR1cmUgdG8gdGhlIG1hcCBvdmVybGF5XHJcbiAgICogQHBhcmFtIHJlc3VsdCBBIHNlYXJjaCByZXN1bHQgdGhhdCBjb3VsZCBiZSBhIGZlYXR1cmVcclxuICAgKi9cclxuICBwcml2YXRlIHRyeUFkZEZlYXR1cmVUb01hcChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkge1xyXG4gICAgaWYgKHJlc3VsdC5tZXRhLmRhdGFUeXBlICE9PSBGRUFUVVJFKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBmZWF0dXJlID0gKHJlc3VsdCBhcyBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4pLmRhdGE7XHJcblxyXG4gICAgLy8gU29tZXRoaW1lcyBmZWF0dXJlcyBoYXZlIG5vIGdlb21ldHJ5LiBJdCBoYXBwZW5zIHdpdGggc29tZSBHZXRGZWF0dXJlSW5mb1xyXG4gICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tYXAub3ZlcmxheS5zZXRGZWF0dXJlcyhbZmVhdHVyZV0sIEZlYXR1cmVNb3Rpb24uRGVmYXVsdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcnkgdG8gYWRkIGEgbGF5ZXIgdG8gdGhlIG1hcFxyXG4gICAqIEBwYXJhbSByZXN1bHQgQSBzZWFyY2ggcmVzdWx0IHRoYXQgY291bGQgYmUgc29tZSBsYXllciBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0cnlBZGRMYXllclRvTWFwKHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XHJcbiAgICBpZiAodGhpcy5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3VsdC5tZXRhLmRhdGFUeXBlICE9PSBMQVlFUikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gKHJlc3VsdCBhcyBTZWFyY2hSZXN1bHQ8TGF5ZXJPcHRpb25zPikuZGF0YTtcclxuICAgIHRoaXMubGF5ZXJTZXJ2aWNlXHJcbiAgICAgIC5jcmVhdGVBc3luY0xheWVyKGxheWVyT3B0aW9ucylcclxuICAgICAgLnN1YnNjcmliZShsYXllciA9PiB0aGlzLm1hcC5hZGRMYXllcihsYXllcikpO1xyXG4gIH1cclxufVxyXG4iXX0=