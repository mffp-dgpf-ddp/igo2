/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as olstyle from 'ol/style';
import { Layer } from '../../layer/shared/layers/layer';
import { DownloadService } from '../../download/shared/download.service';
import { OGCFilterService } from '../shared/ogc-filter.service';
import { IgoMap } from '../../map';
export class OgcFilterableItemComponent {
    /**
     * @param {?} ogcFilterService
     * @param {?} downloadService
     */
    constructor(ogcFilterService, downloadService) {
        this.ogcFilterService = ogcFilterService;
        this.downloadService = downloadService;
        this.color = 'primary';
        this.defaultLogicalParent = 'And';
        this.hasActiveSpatialFilter = false;
        this.filtersAreEditable = true;
        this.filtersCollapsed = true;
        this._showFeatureOnMap = false;
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
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get refreshFunc() {
        return this.refreshFilters.bind(this);
    }
    /**
     * @return {?}
     */
    get showFeatureOnMap() {
        return this._showFeatureOnMap;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showFeatureOnMap(value) {
        this._showFeatureOnMap = value;
    }
    /**
     * @return {?}
     */
    get datasource() {
        return (/** @type {?} */ (this.layer.dataSource));
    }
    /**
     * @return {?}
     */
    get ogcFiltersHeaderShown() {
        return this._ogcFiltersHeaderShown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set ogcFiltersHeaderShown(value) {
        this._ogcFiltersHeaderShown = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        switch (this.datasource.options.type) {
            case 'wms':
                this.ogcFilterService.setOgcWMSFiltersOptions(this.datasource);
                break;
            case 'wfs':
                this.ogcFilterService.setOgcWFSFiltersOptions(this.datasource);
                break;
            default:
                break;
        }
        if (this.datasource.options.ogcFilters) {
            if (this.datasource.options.ogcFilters.interfaceOgcFilters) {
                this.lastRunOgcFilter = JSON.parse(JSON.stringify(this.datasource.options.ogcFilters.interfaceOgcFilters));
                if (this.datasource.options.ogcFilters.interfaceOgcFilters.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.wkt_geometry)).length >= 1) {
                    this.hasActiveSpatialFilter = true;
                }
            }
            this.filtersAreEditable = this.datasource.options.ogcFilters.editable
                ? this.datasource.options.ogcFilters.editable
                : false;
        }
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    getOverlayByID(id) {
        this.map.overlay.dataSource.ol.getFeatureById(id);
    }
    /**
     * @return {?}
     */
    toggleShowFeatureOnMap() {
        this.showFeatureOnMap = !this.showFeatureOnMap;
        this.datasource.options.ogcFilters.interfaceOgcFilters.forEach((/**
         * @param {?} filter
         * @return {?}
         */
        filter => {
            /** @type {?} */
            let drawnFeature;
            /** @type {?} */
            let drawnStrokeColor = (/** @type {?} */ ([125, 136, 140, 0]));
            /** @type {?} */
            let drawStrokeWidth = 2;
            /** @type {?} */
            let drawnFillColor = (/** @type {?} */ ([125, 136, 140, 0]));
            drawnFeature = this.getOverlayByID('ogcFilterOverlay_' + filter.filterid);
            if (this.showFeatureOnMap !== false) {
                drawnStrokeColor = [125, 136, 140, 0.5];
                drawStrokeWidth = 2;
                drawnFillColor = [125, 136, 140, 0];
            }
            /** @type {?} */
            const stroke = new olstyle.Stroke({
                width: drawStrokeWidth,
                color: drawnStrokeColor
            });
            /** @type {?} */
            const fill = new olstyle.Stroke({
                color: drawnFillColor
            });
            /** @type {?} */
            const olStyle = new olstyle.Style({
                stroke,
                fill,
                image: new olstyle.Circle({
                    radius: 5,
                    stroke,
                    fill
                })
            });
            if (drawnFeature) {
                drawnFeature.setStyle(olStyle);
            }
        }));
    }
    /**
     * @return {?}
     */
    addFilterToSequence() {
        this.filtersCollapsed = false;
        /** @type {?} */
        const interfaceOgcFilters = this.datasource.options.ogcFilters.interfaceOgcFilters;
        /** @type {?} */
        const arr = interfaceOgcFilters || [];
        /** @type {?} */
        const lastLevel = arr.length === 0 ? 0 : arr[arr.length - 1].level;
        /** @type {?} */
        let firstFieldName = '';
        if (this.datasource.options.sourceFields.length > 0) {
            firstFieldName =
                this.datasource.options.sourceFields[0].name === undefined
                    ? ''
                    : this.datasource.options.sourceFields[0].name;
        }
        /** @type {?} */
        let fieldNameGeometry;
        /** @type {?} */
        const datasourceOptions = (/** @type {?} */ (this.datasource
            .options));
        if (datasourceOptions.fieldNameGeometry) {
            fieldNameGeometry = datasourceOptions.fieldNameGeometry;
        }
        else if (((/** @type {?} */ (this.datasource.options))).paramsWFS &&
            ((/** @type {?} */ (this.datasource.options))).paramsWFS.fieldNameGeometry) {
            fieldNameGeometry = ((/** @type {?} */ (this.datasource.options))).paramsWFS
                .fieldNameGeometry;
        }
        /** @type {?} */
        const status = arr.length === 0 ? true : false;
        arr.push(((/** @type {?} */ (this.datasource))).ogcFilterWriter.addInterfaceFilter({
            propertyName: firstFieldName,
            operator: 'PropertyIsEqualTo',
            active: status,
            igoSpatialSelector: 'fixedExtent'
        }, fieldNameGeometry, lastLevel, this.defaultLogicalParent));
        this.datasource.options.ogcFilters.interfaceOgcFilters = arr;
    }
    /**
     * @return {?}
     */
    openDownload() {
        this.downloadService.open(this.layer);
    }
    /**
     * @return {?}
     */
    refreshFilters() {
        /** @type {?} */
        const ogcFilters = this.datasource.options.ogcFilters;
        /** @type {?} */
        const activeFilters = ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.active === true));
        if (activeFilters.length === 0) {
            ogcFilters.filters = undefined;
            ogcFilters.filtered = false;
        }
        if (activeFilters.length > 1) {
            activeFilters[0].parentLogical = activeFilters[1].parentLogical;
        }
        if (activeFilters.filter((/**
         * @param {?} af
         * @return {?}
         */
        af => ['Contains', 'Intersects', 'Within'].indexOf(af.operator) !== -1)).length === 0) {
            this.hasActiveSpatialFilter = false;
        }
        else {
            this.hasActiveSpatialFilter = true;
        }
        if (!(JSON.stringify(this.lastRunOgcFilter) === JSON.stringify(activeFilters))) {
            if (this.layer.dataSource.options.type === 'wfs') {
                /** @type {?} */
                const ogcDataSource = this.layer.dataSource;
                /** @type {?} */
                const ogcLayer = ogcDataSource.options.ogcFilters;
                /** @type {?} */
                const writer = ogcDataSource.ogcFilterWriter;
                ogcLayer.filters = writer.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
                this.layer.dataSource.ol.clear();
            }
            else if (this.layer.dataSource.options.type === 'wms' &&
                ogcFilters.enabled) {
                /** @type {?} */
                let rebuildFilter = '';
                if (activeFilters.length >= 1) {
                    /** @type {?} */
                    const ogcDataSource = this.layer.dataSource;
                    /** @type {?} */
                    const ogcLayer = ogcDataSource.options.ogcFilters;
                    /** @type {?} */
                    const writer = ogcDataSource.ogcFilterWriter;
                    ogcLayer.filters = writer.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
                    rebuildFilter = ((/** @type {?} */ (this.layer
                        .dataSource))).ogcFilterWriter.buildFilter(ogcLayer.filters, undefined, undefined, ((/** @type {?} */ (this.layer.dataSource.options))).fieldNameGeometry);
                }
                this.ogcFilterService.filterByOgc((/** @type {?} */ (this.datasource)), rebuildFilter);
                this.datasource.options.ogcFilters.filtered =
                    activeFilters.length === 0 ? false : true;
            }
            this.lastRunOgcFilter = JSON.parse(JSON.stringify(activeFilters));
        }
        else {
            // identical filter. Nothing triggered
        }
    }
    /**
     * @return {?}
     */
    get downloadable() {
        return ((/** @type {?} */ (this.datasource.options))).download;
    }
    /**
     * @return {?}
     */
    setVisible() {
        this.layer.visible = true;
    }
}
OgcFilterableItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filterable-item',
                template: "<span *ngIf=\"filtersAreEditable\">\r\n<mat-list-item>\r\n\r\n  <mat-icon *ngIf=\"ogcFiltersHeaderShown\" class=\"igo-chevron\" mat-list-avatar igoCollapse [target]=\"ogcFilters\" [collapsed]=\"filtersCollapsed\" svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 *ngIf=\"ogcFiltersHeaderShown\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n  <h4 *ngIf=\"!ogcFiltersHeaderShown\" matLine></h4>\r\n\r\n  <button mat-icon-button *ngIf=\"hasActiveSpatialFilter && showFeatureOnMap\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.hideFeatureExtent' | translate\"\r\n  [disabled]=\"!layer.visible || !layer.isInResolutionsRange\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleShowFeatureOnMap()\">\r\n  <mat-icon svgIcon=\"border-outer\"></mat-icon>\r\n  </button>\r\n\r\n  <button mat-icon-button *ngIf=\"hasActiveSpatialFilter && !showFeatureOnMap\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.showFeatureExtent' | translate\"\r\n  [disabled]=\"!layer.visible || !layer.isInResolutionsRange\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleShowFeatureOnMap()\">\r\n    <mat-icon svgIcon=\"border-none\"></mat-icon>\r\n  </button>\r\n\r\n  <span *ngIf=\"downloadable && ogcFiltersHeaderShown\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n      [color]=\"color\" (click)=\"openDownload()\">\r\n      <mat-icon svgIcon=\"download\"></mat-icon>\r\n    </button>\r\n  </span>\r\n  <button [disabled]=\"!datasource.options.sourceFields ||\u00A0datasource.options.sourceFields.length === 0\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<button *ngIf=\"!layer.visible && ogcFiltersHeaderShown\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\"\r\ncolor=\"warn\" (click)=\"setVisible()\">\r\n<mat-icon svgIcon=\"error-outline\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\" [showFeatureOnMap]=\"showFeatureOnMap\">\r\n  </igo-ogc-filterable-form>\r\n</div>\r\n</span>\r\n",
                styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
OgcFilterableItemComponent.ctorParameters = () => [
    { type: OGCFilterService },
    { type: DownloadService }
];
OgcFilterableItemComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    showFeatureOnMap: [{ type: Input }],
    ogcFiltersHeaderShown: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    OgcFilterableItemComponent.prototype.color;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype.lastRunOgcFilter;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype.defaultLogicalParent;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.hasActiveSpatialFilter;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.filtersAreEditable;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.filtersCollapsed;
    /** @type {?} */
    OgcFilterableItemComponent.prototype._showFeatureOnMap;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype._layer;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype._ogcFiltersHeaderShown;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype.ogcFilterService;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype.downloadService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFTekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9uQyxNQUFNLE9BQU8sMEJBQTBCOzs7OztJQW9EckMsWUFDVSxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFEaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFyRG5DLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFakIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBNkJ4QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFvQjlCLENBQUM7Ozs7SUEvQ0osSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFDSSxHQUFH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QUUseUJBQXlCO2dCQUNuQyxrZ0ZBQW1EOzthQUVwRDs7OztZQVBRLGdCQUFnQjtZQVRoQixlQUFlOzs7b0JBeUJyQixLQUFLO2tCQVFMLEtBQUs7K0JBV0wsS0FBSztvQ0FnQkwsS0FBSzs7OztJQTFDTiwyQ0FBeUI7Ozs7O0lBQ3pCLHNEQUF5Qjs7Ozs7SUFDekIsMERBQXFDOztJQUNyQyw0REFBc0M7O0lBQ3RDLHdEQUFpQzs7SUFDakMsc0RBQStCOztJQTZCL0IsdURBQWlDOzs7OztJQUNqQywwQ0FBcUI7Ozs7O0lBQ3JCLDRDQUFzQjs7Ozs7SUFhdEIsNERBQXdDOzs7OztJQUd0QyxzREFBMEM7Ozs7O0lBQzFDLHFEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IERvd25sb2FkU2VydmljZSB9IGZyb20gJy4uLy4uL2Rvd25sb2FkL3NoYXJlZC9kb3dubG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnNQYXJhbXMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSxcclxuICBPZ2NGaWx0ZXJzT3B0aW9ucyxcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zXHJcbn0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT0dDRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlcmFibGUtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXJhYmxlLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXJhYmxlLWl0ZW0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyYWJsZUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuICBwcml2YXRlIGxhc3RSdW5PZ2NGaWx0ZXI7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0TG9naWNhbFBhcmVudCA9ICdBbmQnO1xyXG4gIHB1YmxpYyBoYXNBY3RpdmVTcGF0aWFsRmlsdGVyID0gZmFsc2U7XHJcbiAgcHVibGljIGZpbHRlcnNBcmVFZGl0YWJsZSA9IHRydWU7XHJcbiAgcHVibGljIGZpbHRlcnNDb2xsYXBzZWQgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBsYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcmVmcmVzaEZ1bmMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoRmlsdGVycy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIGdldCBzaG93RmVhdHVyZU9uTWFwKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nob3dGZWF0dXJlT25NYXA7XHJcbiAgfVxyXG4gIHNldCBzaG93RmVhdHVyZU9uTWFwKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93RmVhdHVyZU9uTWFwID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgX3Nob3dGZWF0dXJlT25NYXAgPSBmYWxzZTtcclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuICBwcml2YXRlIF9sYXllcjogTGF5ZXI7XHJcblxyXG4gIGdldCBkYXRhc291cmNlKCk6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBvZ2NGaWx0ZXJzSGVhZGVyU2hvd24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb2djRmlsdGVyc0hlYWRlclNob3duO1xyXG4gIH1cclxuICBzZXQgb2djRmlsdGVyc0hlYWRlclNob3duKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9vZ2NGaWx0ZXJzSGVhZGVyU2hvd24gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb2djRmlsdGVyc0hlYWRlclNob3duOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgb2djRmlsdGVyU2VydmljZTogT0dDRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZG93bmxvYWRTZXJ2aWNlOiBEb3dubG9hZFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dpdGNoICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3dtcyc6XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLnNldE9nY1dNU0ZpbHRlcnNPcHRpb25zKHRoaXMuZGF0YXNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dmcyc6XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLnNldE9nY1dGU0ZpbHRlcnNPcHRpb25zKHRoaXMuZGF0YXNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMpIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycykge1xyXG4gICAgICAgIHRoaXMubGFzdFJ1bk9nY0ZpbHRlciA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICAgICAgICBmID0+IGYud2t0X2dlb21ldHJ5XHJcbiAgICAgICAgICApLmxlbmd0aCA+PSAxXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5maWx0ZXJzQXJlRWRpdGFibGUgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICAgICAgPyB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3ZlcmxheUJ5SUQoaWQpIHtcclxuICAgIHRoaXMubWFwLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVTaG93RmVhdHVyZU9uTWFwKCkge1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZU9uTWFwID0gIXRoaXMuc2hvd0ZlYXR1cmVPbk1hcDtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgIGxldCBkcmF3bkZlYXR1cmU7XHJcbiAgICAgIGxldCBkcmF3blN0cm9rZUNvbG9yID0gWzEyNSwgMTM2LCAxNDAsIDBdIGFzIFtcclxuICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIG51bWJlcixcclxuICAgICAgICBudW1iZXJcclxuICAgICAgXTtcclxuICAgICAgbGV0IGRyYXdTdHJva2VXaWR0aCA9IDI7XHJcbiAgICAgIGxldCBkcmF3bkZpbGxDb2xvciA9IFsxMjUsIDEzNiwgMTQwLCAwXSBhcyBbXHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIG51bWJlcixcclxuICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgbnVtYmVyXHJcbiAgICAgIF07XHJcblxyXG4gICAgICBkcmF3bkZlYXR1cmUgPSB0aGlzLmdldE92ZXJsYXlCeUlEKCdvZ2NGaWx0ZXJPdmVybGF5XycgKyBmaWx0ZXIuZmlsdGVyaWQpO1xyXG4gICAgICBpZiAodGhpcy5zaG93RmVhdHVyZU9uTWFwICE9PSBmYWxzZSkge1xyXG4gICAgICAgIGRyYXduU3Ryb2tlQ29sb3IgPSBbMTI1LCAxMzYsIDE0MCwgMC41XTtcclxuICAgICAgICBkcmF3U3Ryb2tlV2lkdGggPSAyO1xyXG4gICAgICAgIGRyYXduRmlsbENvbG9yID0gWzEyNSwgMTM2LCAxNDAsIDBdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzdHJva2UgPSBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgIHdpZHRoOiBkcmF3U3Ryb2tlV2lkdGgsXHJcbiAgICAgICAgY29sb3I6IGRyYXduU3Ryb2tlQ29sb3JcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBmaWxsID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICBjb2xvcjogZHJhd25GaWxsQ29sb3JcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBvbFN0eWxlID0gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIHN0cm9rZSxcclxuICAgICAgICBmaWxsLFxyXG4gICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgICAgZmlsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGRyYXduRmVhdHVyZSkge1xyXG4gICAgICAgIGRyYXduRmVhdHVyZS5zZXRTdHlsZShvbFN0eWxlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRGaWx0ZXJUb1NlcXVlbmNlKCkge1xyXG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gZmFsc2U7XHJcbiAgICBjb25zdCBpbnRlcmZhY2VPZ2NGaWx0ZXJzOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW10gPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBhcnIgPSBpbnRlcmZhY2VPZ2NGaWx0ZXJzIHx8IFtdO1xyXG4gICAgY29uc3QgbGFzdExldmVsID0gYXJyLmxlbmd0aCA9PT0gMCA/IDAgOiBhcnJbYXJyLmxlbmd0aCAtIDFdLmxldmVsO1xyXG4gICAgbGV0IGZpcnN0RmllbGROYW1lID0gJyc7XHJcbiAgICBpZiAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZmlyc3RGaWVsZE5hbWUgPVxyXG4gICAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkc1swXS5uYW1lID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gJydcclxuICAgICAgICAgIDogdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzWzBdLm5hbWU7XHJcbiAgICB9XHJcbiAgICBsZXQgZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICBjb25zdCBkYXRhc291cmNlT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZVxyXG4gICAgICAub3B0aW9ucyBhcyBXRlNEYXRhU291cmNlT3B0aW9uc1BhcmFtcztcclxuICAgIGlmIChkYXRhc291cmNlT3B0aW9ucy5maWVsZE5hbWVHZW9tZXRyeSkge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9IGRhdGFzb3VyY2VPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTICYmXHJcbiAgICAgICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgKSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID0gKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTXHJcbiAgICAgICAgLmZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhdHVzID0gYXJyLmxlbmd0aCA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuICAgIGFyci5wdXNoKFxyXG4gICAgICAodGhpcy5kYXRhc291cmNlIGFzIGFueSkub2djRmlsdGVyV3JpdGVyLmFkZEludGVyZmFjZUZpbHRlcihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm9wZXJ0eU5hbWU6IGZpcnN0RmllbGROYW1lLFxyXG4gICAgICAgICAgb3BlcmF0b3I6ICdQcm9wZXJ0eUlzRXF1YWxUbycsXHJcbiAgICAgICAgICBhY3RpdmU6IHN0YXR1cyxcclxuICAgICAgICAgIGlnb1NwYXRpYWxTZWxlY3RvcjogJ2ZpeGVkRXh0ZW50J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgbGFzdExldmVsLFxyXG4gICAgICAgIHRoaXMuZGVmYXVsdExvZ2ljYWxQYXJlbnRcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IGFycjtcclxuICB9XHJcblxyXG4gIG9wZW5Eb3dubG9hZCgpIHtcclxuICAgIHRoaXMuZG93bmxvYWRTZXJ2aWNlLm9wZW4odGhpcy5sYXllcik7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoRmlsdGVycygpIHtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnM6IE9nY0ZpbHRlcnNPcHRpb25zID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuYWN0aXZlID09PSB0cnVlXHJcbiAgICApO1xyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIG9nY0ZpbHRlcnMuZmlsdGVycyA9IHVuZGVmaW5lZDtcclxuICAgICAgb2djRmlsdGVycy5maWx0ZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID4gMSkge1xyXG4gICAgICBhY3RpdmVGaWx0ZXJzWzBdLnBhcmVudExvZ2ljYWwgPSBhY3RpdmVGaWx0ZXJzWzFdLnBhcmVudExvZ2ljYWw7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGFjdGl2ZUZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICAgIGFmID0+IFsnQ29udGFpbnMnLCAnSW50ZXJzZWN0cycsICdXaXRoaW4nXS5pbmRleE9mKGFmLm9wZXJhdG9yKSAhPT0gLTFcclxuICAgICAgKS5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhKEpTT04uc3RyaW5naWZ5KHRoaXMubGFzdFJ1bk9nY0ZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKVxyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd2ZzJykge1xyXG4gICAgICAgIGNvbnN0IG9nY0RhdGFTb3VyY2U6IGFueSA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZTtcclxuICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICBjb25zdCB3cml0ZXIgPSBvZ2NEYXRhU291cmNlLm9nY0ZpbHRlcldyaXRlcjtcclxuICAgICAgICBvZ2NMYXllci5maWx0ZXJzID0gd3JpdGVyLnJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd21zJyAmJlxyXG4gICAgICAgIG9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgcmVidWlsZEZpbHRlciA9ICcnO1xyXG4gICAgICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICAgIGNvbnN0IHdyaXRlciA9IG9nY0RhdGFTb3VyY2Uub2djRmlsdGVyV3JpdGVyO1xyXG4gICAgICAgICAgb2djTGF5ZXIuZmlsdGVycyA9IHdyaXRlci5yZWJ1aWx0SWdvT2djRmlsdGVyT2JqZWN0RnJvbVNlcXVlbmNlKFxyXG4gICAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmVidWlsZEZpbHRlciA9ICh0aGlzLmxheWVyXHJcbiAgICAgICAgICAgIC5kYXRhU291cmNlIGFzIGFueSkub2djRmlsdGVyV3JpdGVyLmJ1aWxkRmlsdGVyKFxyXG4gICAgICAgICAgICBvZ2NMYXllci5maWx0ZXJzLFxyXG4gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgKHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2djRmlsdGVyU2VydmljZS5maWx0ZXJCeU9nYyhcclxuICAgICAgICAgIHRoaXMuZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlLFxyXG4gICAgICAgICAgcmVidWlsZEZpbHRlclxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJlZCA9XHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5sYXN0UnVuT2djRmlsdGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhY3RpdmVGaWx0ZXJzKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZGVudGljYWwgZmlsdGVyLiBOb3RoaW5nIHRyaWdnZXJlZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGRvd25sb2FkYWJsZSgpIHtcclxuICAgIHJldHVybiAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5kb3dubG9hZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRWaXNpYmxlKCkge1xyXG4gICAgdGhpcy5sYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19