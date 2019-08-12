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
var OgcFilterableItemComponent = /** @class */ (function () {
    function OgcFilterableItemComponent(ogcFilterService, downloadService) {
        this.ogcFilterService = ogcFilterService;
        this.downloadService = downloadService;
        this.color = 'primary';
        this.defaultLogicalParent = 'And';
        this.hasActiveSpatialFilter = false;
        this.filtersAreEditable = true;
        this.filtersCollapsed = true;
        this._showFeatureOnMap = false;
    }
    Object.defineProperty(OgcFilterableItemComponent.prototype, "layer", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableItemComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableItemComponent.prototype, "refreshFunc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.refreshFilters.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableItemComponent.prototype, "showFeatureOnMap", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showFeatureOnMap;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showFeatureOnMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableItemComponent.prototype, "datasource", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.layer.dataSource));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterableItemComponent.prototype, "ogcFiltersHeaderShown", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ogcFiltersHeaderShown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._ogcFiltersHeaderShown = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
                function (f) { return f.wkt_geometry; })).length >= 1) {
                    this.hasActiveSpatialFilter = true;
                }
            }
            this.filtersAreEditable = this.datasource.options.ogcFilters.editable
                ? this.datasource.options.ogcFilters.editable
                : false;
        }
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.getOverlayByID = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.map.overlay.dataSource.ol.getFeatureById(id);
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.toggleShowFeatureOnMap = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.showFeatureOnMap = !this.showFeatureOnMap;
        this.datasource.options.ogcFilters.interfaceOgcFilters.forEach((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            /** @type {?} */
            var drawnFeature;
            /** @type {?} */
            var drawnStrokeColor = (/** @type {?} */ ([125, 136, 140, 0]));
            /** @type {?} */
            var drawStrokeWidth = 2;
            /** @type {?} */
            var drawnFillColor = (/** @type {?} */ ([125, 136, 140, 0]));
            drawnFeature = _this.getOverlayByID('ogcFilterOverlay_' + filter.filterid);
            if (_this.showFeatureOnMap !== false) {
                drawnStrokeColor = [125, 136, 140, 0.5];
                drawStrokeWidth = 2;
                drawnFillColor = [125, 136, 140, 0];
            }
            /** @type {?} */
            var stroke = new olstyle.Stroke({
                width: drawStrokeWidth,
                color: drawnStrokeColor
            });
            /** @type {?} */
            var fill = new olstyle.Stroke({
                color: drawnFillColor
            });
            /** @type {?} */
            var olStyle = new olstyle.Style({
                stroke: stroke,
                fill: fill,
                image: new olstyle.Circle({
                    radius: 5,
                    stroke: stroke,
                    fill: fill
                })
            });
            if (drawnFeature) {
                drawnFeature.setStyle(olStyle);
            }
        }));
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.addFilterToSequence = /**
     * @return {?}
     */
    function () {
        this.filtersCollapsed = false;
        /** @type {?} */
        var interfaceOgcFilters = this.datasource.options.ogcFilters.interfaceOgcFilters;
        /** @type {?} */
        var arr = interfaceOgcFilters || [];
        /** @type {?} */
        var lastLevel = arr.length === 0 ? 0 : arr[arr.length - 1].level;
        /** @type {?} */
        var firstFieldName = '';
        if (this.datasource.options.sourceFields.length > 0) {
            firstFieldName =
                this.datasource.options.sourceFields[0].name === undefined
                    ? ''
                    : this.datasource.options.sourceFields[0].name;
        }
        /** @type {?} */
        var fieldNameGeometry;
        /** @type {?} */
        var datasourceOptions = (/** @type {?} */ (this.datasource
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
        var status = arr.length === 0 ? true : false;
        arr.push(((/** @type {?} */ (this.datasource))).ogcFilterWriter.addInterfaceFilter({
            propertyName: firstFieldName,
            operator: 'PropertyIsEqualTo',
            active: status,
            igoSpatialSelector: 'fixedExtent'
        }, fieldNameGeometry, lastLevel, this.defaultLogicalParent));
        this.datasource.options.ogcFilters.interfaceOgcFilters = arr;
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.openDownload = /**
     * @return {?}
     */
    function () {
        this.downloadService.open(this.layer);
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.refreshFilters = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ogcFilters = this.datasource.options.ogcFilters;
        /** @type {?} */
        var activeFilters = ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.active === true; }));
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
        function (af) { return ['Contains', 'Intersects', 'Within'].indexOf(af.operator) !== -1; })).length === 0) {
            this.hasActiveSpatialFilter = false;
        }
        else {
            this.hasActiveSpatialFilter = true;
        }
        if (!(JSON.stringify(this.lastRunOgcFilter) === JSON.stringify(activeFilters))) {
            if (this.layer.dataSource.options.type === 'wfs') {
                /** @type {?} */
                var ogcDataSource = this.layer.dataSource;
                /** @type {?} */
                var ogcLayer = ogcDataSource.options.ogcFilters;
                /** @type {?} */
                var writer = ogcDataSource.ogcFilterWriter;
                ogcLayer.filters = writer.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
                this.layer.dataSource.ol.clear();
            }
            else if (this.layer.dataSource.options.type === 'wms' &&
                ogcFilters.enabled) {
                /** @type {?} */
                var rebuildFilter = '';
                if (activeFilters.length >= 1) {
                    /** @type {?} */
                    var ogcDataSource = this.layer.dataSource;
                    /** @type {?} */
                    var ogcLayer = ogcDataSource.options.ogcFilters;
                    /** @type {?} */
                    var writer = ogcDataSource.ogcFilterWriter;
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
    };
    Object.defineProperty(OgcFilterableItemComponent.prototype, "downloadable", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.datasource.options))).download;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.setVisible = /**
     * @return {?}
     */
    function () {
        this.layer.visible = true;
    };
    OgcFilterableItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filterable-item',
                    template: "<span *ngIf=\"filtersAreEditable\">\r\n<mat-list-item>\r\n\r\n  <mat-icon *ngIf=\"ogcFiltersHeaderShown\" class=\"igo-chevron\" mat-list-avatar igoCollapse [target]=\"ogcFilters\" [collapsed]=\"filtersCollapsed\" svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 *ngIf=\"ogcFiltersHeaderShown\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n  <h4 *ngIf=\"!ogcFiltersHeaderShown\" matLine></h4>\r\n\r\n  <button mat-icon-button *ngIf=\"hasActiveSpatialFilter && showFeatureOnMap\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.hideFeatureExtent' | translate\"\r\n  [disabled]=\"!layer.visible || !layer.isInResolutionsRange\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleShowFeatureOnMap()\">\r\n  <mat-icon svgIcon=\"border-outer\"></mat-icon>\r\n  </button>\r\n\r\n  <button mat-icon-button *ngIf=\"hasActiveSpatialFilter && !showFeatureOnMap\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.showFeatureExtent' | translate\"\r\n  [disabled]=\"!layer.visible || !layer.isInResolutionsRange\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleShowFeatureOnMap()\">\r\n    <mat-icon svgIcon=\"border-none\"></mat-icon>\r\n  </button>\r\n\r\n  <span *ngIf=\"downloadable && ogcFiltersHeaderShown\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n      [color]=\"color\" (click)=\"openDownload()\">\r\n      <mat-icon svgIcon=\"download\"></mat-icon>\r\n    </button>\r\n  </span>\r\n  <button [disabled]=\"!datasource.options.sourceFields ||\u00A0datasource.options.sourceFields.length === 0\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<button *ngIf=\"!layer.visible && ogcFiltersHeaderShown\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\"\r\ncolor=\"warn\" (click)=\"setVisible()\">\r\n<mat-icon svgIcon=\"error-outline\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\" [showFeatureOnMap]=\"showFeatureOnMap\">\r\n  </igo-ogc-filterable-form>\r\n</div>\r\n</span>\r\n",
                    styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
                }] }
    ];
    /** @nocollapse */
    OgcFilterableItemComponent.ctorParameters = function () { return [
        { type: OGCFilterService },
        { type: DownloadService }
    ]; };
    OgcFilterableItemComponent.propDecorators = {
        layer: [{ type: Input }],
        map: [{ type: Input }],
        showFeatureOnMap: [{ type: Input }],
        ogcFiltersHeaderShown: [{ type: Input }]
    };
    return OgcFilterableItemComponent;
}());
export { OgcFilterableItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFTekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQztJQXlERSxvQ0FDVSxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFEaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFyRG5DLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFakIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBNkJ4QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFvQjlCLENBQUM7SUEvQ0osc0JBQ0ksNkNBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBWTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQUtELHNCQUNJLDJDQUFHOzs7O1FBRFA7WUFFRSxPQUFP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QU8sRUFBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ25ELENBQUM7OztPQUFBOzs7O0lBRU0sK0NBQVU7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDOztnQkExUUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLGtnRkFBbUQ7O2lCQUVwRDs7OztnQkFQUSxnQkFBZ0I7Z0JBVGhCLGVBQWU7Ozt3QkF5QnJCLEtBQUs7c0JBUUwsS0FBSzttQ0FXTCxLQUFLO3dDQWdCTCxLQUFLOztJQTJOUixpQ0FBQztDQUFBLEFBM1FELElBMlFDO1NBdFFZLDBCQUEwQjs7O0lBQ3JDLDJDQUF5Qjs7Ozs7SUFDekIsc0RBQXlCOzs7OztJQUN6QiwwREFBcUM7O0lBQ3JDLDREQUFzQzs7SUFDdEMsd0RBQWlDOztJQUNqQyxzREFBK0I7O0lBNkIvQix1REFBaUM7Ozs7O0lBQ2pDLDBDQUFxQjs7Ozs7SUFDckIsNENBQXNCOzs7OztJQWF0Qiw0REFBd0M7Ozs7O0lBR3RDLHNEQUEwQzs7Ozs7SUFDMUMscURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRG93bmxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZG93bmxvYWQvc2hhcmVkL2Rvd25sb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9uc1BhcmFtcyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlLFxyXG4gIE9nY0ZpbHRlcnNPcHRpb25zLFxyXG4gIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNcclxufSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPR0NGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyYWJsZS1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHByaXZhdGUgbGFzdFJ1bk9nY0ZpbHRlcjtcclxuICBwcml2YXRlIGRlZmF1bHRMb2dpY2FsUGFyZW50ID0gJ0FuZCc7XHJcbiAgcHVibGljIGhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICBwdWJsaWMgZmlsdGVyc0FyZUVkaXRhYmxlID0gdHJ1ZTtcclxuICBwdWJsaWMgZmlsdGVyc0NvbGxhcHNlZCA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxheWVyKCk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXllcjtcclxuICB9XHJcbiAgc2V0IGxheWVyKHZhbHVlOiBMYXllcikge1xyXG4gICAgdGhpcy5fbGF5ZXIgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCByZWZyZXNoRnVuYygpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZnJlc2hGaWx0ZXJzLmJpbmQodGhpcyk7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dGZWF0dXJlT25NYXAoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0ZlYXR1cmVPbk1hcDtcclxuICB9XHJcbiAgc2V0IHNob3dGZWF0dXJlT25NYXAodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dGZWF0dXJlT25NYXAgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBfc2hvd0ZlYXR1cmVPbk1hcCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG4gIHByaXZhdGUgX2xheWVyOiBMYXllcjtcclxuXHJcbiAgZ2V0IGRhdGFzb3VyY2UoKTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIuZGF0YVNvdXJjZSBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG9nY0ZpbHRlcnNIZWFkZXJTaG93bigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9vZ2NGaWx0ZXJzSGVhZGVyU2hvd247XHJcbiAgfVxyXG4gIHNldCBvZ2NGaWx0ZXJzSGVhZGVyU2hvd24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX29nY0ZpbHRlcnNIZWFkZXJTaG93biA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9vZ2NGaWx0ZXJzSGVhZGVyU2hvd246IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBvZ2NGaWx0ZXJTZXJ2aWNlOiBPR0NGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkb3dubG9hZFNlcnZpY2U6IERvd25sb2FkU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnR5cGUpIHtcclxuICAgICAgY2FzZSAnd21zJzpcclxuICAgICAgICB0aGlzLm9nY0ZpbHRlclNlcnZpY2Uuc2V0T2djV01TRmlsdGVyc09wdGlvbnModGhpcy5kYXRhc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2ZzJzpcclxuICAgICAgICB0aGlzLm9nY0ZpbHRlclNlcnZpY2Uuc2V0T2djV0ZTRmlsdGVyc09wdGlvbnModGhpcy5kYXRhc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycykge1xyXG4gICAgICBpZiAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0UnVuT2djRmlsdGVyID0gSlNPTi5wYXJzZShcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycylcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycy5maWx0ZXIoXHJcbiAgICAgICAgICAgIGYgPT4gZi53a3RfZ2VvbWV0cnlcclxuICAgICAgICAgICkubGVuZ3RoID49IDFcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMuaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmZpbHRlcnNBcmVFZGl0YWJsZSA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuZWRpdGFibGVcclxuICAgICAgICA/IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuZWRpdGFibGVcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdmVybGF5QnlJRChpZCkge1xyXG4gICAgdGhpcy5tYXAub3ZlcmxheS5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNob3dGZWF0dXJlT25NYXAoKSB7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlT25NYXAgPSAhdGhpcy5zaG93RmVhdHVyZU9uTWFwO1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgbGV0IGRyYXduRmVhdHVyZTtcclxuICAgICAgbGV0IGRyYXduU3Ryb2tlQ29sb3IgPSBbMTI1LCAxMzYsIDE0MCwgMF0gYXMgW1xyXG4gICAgICAgIG51bWJlcixcclxuICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIG51bWJlclxyXG4gICAgICBdO1xyXG4gICAgICBsZXQgZHJhd1N0cm9rZVdpZHRoID0gMjtcclxuICAgICAgbGV0IGRyYXduRmlsbENvbG9yID0gWzEyNSwgMTM2LCAxNDAsIDBdIGFzIFtcclxuICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgIG51bWJlcixcclxuICAgICAgICBudW1iZXJcclxuICAgICAgXTtcclxuXHJcbiAgICAgIGRyYXduRmVhdHVyZSA9IHRoaXMuZ2V0T3ZlcmxheUJ5SUQoJ29nY0ZpbHRlck92ZXJsYXlfJyArIGZpbHRlci5maWx0ZXJpZCk7XHJcbiAgICAgIGlmICh0aGlzLnNob3dGZWF0dXJlT25NYXAgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgZHJhd25TdHJva2VDb2xvciA9IFsxMjUsIDEzNiwgMTQwLCAwLjVdO1xyXG4gICAgICAgIGRyYXdTdHJva2VXaWR0aCA9IDI7XHJcbiAgICAgICAgZHJhd25GaWxsQ29sb3IgPSBbMTI1LCAxMzYsIDE0MCwgMF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHN0cm9rZSA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgd2lkdGg6IGRyYXdTdHJva2VXaWR0aCxcclxuICAgICAgICBjb2xvcjogZHJhd25TdHJva2VDb2xvclxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGZpbGwgPSBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgIGNvbG9yOiBkcmF3bkZpbGxDb2xvclxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG9sU3R5bGUgPSBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgIGZpbGwsXHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICByYWRpdXM6IDUsXHJcbiAgICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgICBmaWxsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZHJhd25GZWF0dXJlKSB7XHJcbiAgICAgICAgZHJhd25GZWF0dXJlLnNldFN0eWxlKG9sU3R5bGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZEZpbHRlclRvU2VxdWVuY2UoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnNDb2xsYXBzZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGludGVyZmFjZU9nY0ZpbHRlcnM6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXSA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycztcclxuICAgIGNvbnN0IGFyciA9IGludGVyZmFjZU9nY0ZpbHRlcnMgfHwgW107XHJcbiAgICBjb25zdCBsYXN0TGV2ZWwgPSBhcnIubGVuZ3RoID09PSAwID8gMCA6IGFyclthcnIubGVuZ3RoIC0gMV0ubGV2ZWw7XHJcbiAgICBsZXQgZmlyc3RGaWVsZE5hbWUgPSAnJztcclxuICAgIGlmICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBmaXJzdEZpZWxkTmFtZSA9XHJcbiAgICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzWzBdLm5hbWUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyAnJ1xyXG4gICAgICAgICAgOiB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHNbMF0ubmFtZTtcclxuICAgIH1cclxuICAgIGxldCBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIGNvbnN0IGRhdGFzb3VyY2VPcHRpb25zID0gdGhpcy5kYXRhc291cmNlXHJcbiAgICAgIC5vcHRpb25zIGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zO1xyXG4gICAgaWYgKGRhdGFzb3VyY2VPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5KSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID0gZGF0YXNvdXJjZU9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMgJiZcclxuICAgICAgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICApIHtcclxuICAgICAgZmllbGROYW1lR2VvbWV0cnkgPSAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlNcclxuICAgICAgICAuZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGF0dXMgPSBhcnIubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgYXJyLnB1c2goXHJcbiAgICAgICh0aGlzLmRhdGFzb3VyY2UgYXMgYW55KS5vZ2NGaWx0ZXJXcml0ZXIuYWRkSW50ZXJmYWNlRmlsdGVyKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3BlcnR5TmFtZTogZmlyc3RGaWVsZE5hbWUsXHJcbiAgICAgICAgICBvcGVyYXRvcjogJ1Byb3BlcnR5SXNFcXVhbFRvJyxcclxuICAgICAgICAgIGFjdGl2ZTogc3RhdHVzLFxyXG4gICAgICAgICAgaWdvU3BhdGlhbFNlbGVjdG9yOiAnZml4ZWRFeHRlbnQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICBsYXN0TGV2ZWwsXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9naWNhbFBhcmVudFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gYXJyO1xyXG4gIH1cclxuXHJcbiAgb3BlbkRvd25sb2FkKCkge1xyXG4gICAgdGhpcy5kb3dubG9hZFNlcnZpY2Uub3Blbih0aGlzLmxheWVyKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hGaWx0ZXJzKCkge1xyXG4gICAgY29uc3Qgb2djRmlsdGVyczogT2djRmlsdGVyc09wdGlvbnMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycy5maWx0ZXIoXHJcbiAgICAgIGYgPT4gZi5hY3RpdmUgPT09IHRydWVcclxuICAgICk7XHJcbiAgICBpZiAoYWN0aXZlRmlsdGVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgb2djRmlsdGVycy5maWx0ZXJzID0gdW5kZWZpbmVkO1xyXG4gICAgICBvZ2NGaWx0ZXJzLmZpbHRlcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYWN0aXZlRmlsdGVycy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGFjdGl2ZUZpbHRlcnNbMF0ucGFyZW50TG9naWNhbCA9IGFjdGl2ZUZpbHRlcnNbMV0ucGFyZW50TG9naWNhbDtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgYWN0aXZlRmlsdGVycy5maWx0ZXIoXHJcbiAgICAgICAgYWYgPT4gWydDb250YWlucycsICdJbnRlcnNlY3RzJywgJ1dpdGhpbiddLmluZGV4T2YoYWYub3BlcmF0b3IpICE9PSAtMVxyXG4gICAgICApLmxlbmd0aCA9PT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oYXNBY3RpdmVTcGF0aWFsRmlsdGVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICEoSlNPTi5zdHJpbmdpZnkodGhpcy5sYXN0UnVuT2djRmlsdGVyKSA9PT0gSlNPTi5zdHJpbmdpZnkoYWN0aXZlRmlsdGVycykpXHJcbiAgICApIHtcclxuICAgICAgaWYgKHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd3ZnMnKSB7XHJcbiAgICAgICAgY29uc3Qgb2djRGF0YVNvdXJjZTogYW55ID0gdGhpcy5sYXllci5kYXRhU291cmNlO1xyXG4gICAgICAgIGNvbnN0IG9nY0xheWVyOiBPZ2NGaWx0ZXJzT3B0aW9ucyA9IG9nY0RhdGFTb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzO1xyXG4gICAgICAgIGNvbnN0IHdyaXRlciA9IG9nY0RhdGFTb3VyY2Uub2djRmlsdGVyV3JpdGVyO1xyXG4gICAgICAgIG9nY0xheWVyLmZpbHRlcnMgPSB3cml0ZXIucmVidWlsdElnb09nY0ZpbHRlck9iamVjdEZyb21TZXF1ZW5jZShcclxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnNcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd3bXMnICYmXHJcbiAgICAgICAgb2djRmlsdGVycy5lbmFibGVkXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxldCByZWJ1aWxkRmlsdGVyID0gJyc7XHJcbiAgICAgICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID49IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG9nY0RhdGFTb3VyY2U6IGFueSA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZTtcclxuICAgICAgICAgIGNvbnN0IG9nY0xheWVyOiBPZ2NGaWx0ZXJzT3B0aW9ucyA9IG9nY0RhdGFTb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzO1xyXG4gICAgICAgICAgY29uc3Qgd3JpdGVyID0gb2djRGF0YVNvdXJjZS5vZ2NGaWx0ZXJXcml0ZXI7XHJcbiAgICAgICAgICBvZ2NMYXllci5maWx0ZXJzID0gd3JpdGVyLnJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGFjdGl2ZUZpbHRlcnNcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZWJ1aWxkRmlsdGVyID0gKHRoaXMubGF5ZXJcclxuICAgICAgICAgICAgLmRhdGFTb3VyY2UgYXMgYW55KS5vZ2NGaWx0ZXJXcml0ZXIuYnVpbGRGaWx0ZXIoXHJcbiAgICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAodGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5T2djKFxyXG4gICAgICAgICAgdGhpcy5kYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICByZWJ1aWxkRmlsdGVyXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcmVkID1cclxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlkZW50aWNhbCBmaWx0ZXIuIE5vdGhpbmcgdHJpZ2dlcmVkXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgZG93bmxvYWRhYmxlKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLmRvd25sb2FkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZpc2libGUoKSB7XHJcbiAgICB0aGlzLmxheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=