/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { DownloadService } from '../../download/shared/download.service';
import { OGCFilterService } from '../shared/ogc-filter.service';
import { IgoMap } from '../../map';
import { OgcFilterWriter } from '../shared/ogc-filter';
var OgcFilterableItemComponent = /** @class */ (function () {
    function OgcFilterableItemComponent(ogcFilterService, downloadService) {
        this.ogcFilterService = ogcFilterService;
        this.downloadService = downloadService;
        this.color = 'primary';
        this.defaultLogicalParent = 'And';
        this.hasActiveSpatialFilter = false;
        this.filtersAreEditable = true;
        this.filtersCollapsed = true;
        this.hasPushButton = false;
    }
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
    OgcFilterableItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ogcFilters = this.datasource.options.ogcFilters;
        if (ogcFilters.pushButtons &&
            ogcFilters.pushButtons.length > 0) {
            if (ogcFilters.advancedOgcFilters === undefined) {
                ogcFilters.advancedOgcFilters = false;
            }
            this.hasPushButton = true;
        }
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
        if (ogcFilters) {
            if (ogcFilters.interfaceOgcFilters) {
                this.lastRunOgcFilter = JSON.parse(JSON.stringify(ogcFilters.interfaceOgcFilters));
                if (ogcFilters.interfaceOgcFilters.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.wkt_geometry; })).length >= 1) {
                    this.hasActiveSpatialFilter = true;
                }
            }
            this.filtersAreEditable = ogcFilters.editable
                ? ogcFilters.editable
                : false;
        }
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
        arr.push(new OgcFilterWriter().addInterfaceFilter((/** @type {?} */ ({
            propertyName: firstFieldName,
            operator: 'PropertyIsEqualTo',
            active: status,
            igoSpatialSelector: 'fixedExtent'
        })), fieldNameGeometry, lastLevel, this.defaultLogicalParent));
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
     * @param {?=} force
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.refreshFilters = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (force === true) {
            this.lastRunOgcFilter = undefined;
        }
        /** @type {?} */
        var ogcFilters = this.datasource.options.ogcFilters;
        /** @type {?} */
        var ogcFilterWriter = new OgcFilterWriter();
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
                ogcLayer.filters = ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
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
                    ogcLayer.filters = ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
                    rebuildFilter = ogcFilterWriter.buildFilter(ogcLayer.filters, undefined, undefined, ((/** @type {?} */ (this.layer.dataSource.options))).fieldNameGeometry);
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
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.setVisible = /**
     * @return {?}
     */
    function () {
        this.layer.visible = true;
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.isAdvancedOgcFilters = /**
     * @return {?}
     */
    function () {
        return this.datasource.options.ogcFilters.advancedOgcFilters;
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.addFilterDisabled = /**
     * @return {?}
     */
    function () {
        return (!this.datasource.options.sourceFields || this.datasource.options.sourceFields.length === 0);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.changeOgcFiltersAdvancedOgcFilters = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.datasource.options.ogcFilters.advancedOgcFilters = value;
    };
    /**
     * @param {?} isAdvancedOgcFilters
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.changeOgcFilterType = /**
     * @param {?} isAdvancedOgcFilters
     * @return {?}
     */
    function (isAdvancedOgcFilters) {
        this.changeOgcFiltersAdvancedOgcFilters(isAdvancedOgcFilters.checked);
        if (isAdvancedOgcFilters.checked) {
            this.refreshFilters(true);
        }
    };
    OgcFilterableItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filterable-item',
                    template: "<span *ngIf=\"filtersAreEditable\">\r\n<mat-list-item>\r\n\r\n  <mat-icon *ngIf=\"ogcFiltersHeaderShown\" class=\"igo-chevron\" mat-list-avatar igoCollapse [target]=\"ogcFilters\" [collapsed]=\"filtersCollapsed\" svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 *ngIf=\"ogcFiltersHeaderShown\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n  <h4 *ngIf=\"!ogcFiltersHeaderShown\" matLine></h4>\r\n\r\n  <span *ngIf=\"downloadable && ogcFiltersHeaderShown\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n      [color]=\"color\" (click)=\"openDownload()\">\r\n      <mat-icon svgIcon=\"download\"></mat-icon>\r\n    </button>\r\n  </span>\r\n  <button *ngIf=\"isAdvancedOgcFilters()\" [disabled]=\"addFilterDisabled()\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<button *ngIf=\"!layer.visible && ogcFiltersHeaderShown\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\"\r\ncolor=\"warn\" (click)=\"setVisible()\">\r\n<mat-icon svgIcon=\"error-outline\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filterable-form>\r\n\r\n  <mat-checkbox labelPosition='before' *ngIf=\"hasPushButton\" (change)=\"changeOgcFilterType($event)\"\r\n    [(ngModel)]=\"datasource.options.ogcFilters.advancedOgcFilters\">\r\n    {{'igo.geo.filter.advancedOgcFilters' | translate}}\r\n  </mat-checkbox>\r\n</div>\r\n</span>\r\n",
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
    OgcFilterableItemComponent.prototype.hasPushButton;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.layer;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.map;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.ogcFiltersHeaderShown;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBSXpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFTekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQ7SUFnQ0Usb0NBQ1UsZ0JBQWtDLEVBQ2xDLGVBQWdDO1FBRGhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBNUJuQyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBRWpCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM5QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixrQkFBYSxHQUFZLEtBQUssQ0FBQztJQXVCbkMsQ0FBQztJQWpCSixzQkFBSSxtREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtEQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUEy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QkFBMEI7OztJQUNyQywyQ0FBeUI7Ozs7O0lBQ3pCLHNEQUF5Qjs7Ozs7SUFDekIsMERBQXFDOztJQUNyQyw0REFBc0M7O0lBQ3RDLHdEQUFpQzs7SUFDakMsc0RBQStCOztJQUMvQixtREFBc0M7O0lBRXRDLDJDQUFzQjs7SUFFdEIseUNBQXFCOztJQVVyQiwyREFBd0M7Ozs7O0lBT3RDLHNEQUEwQzs7Ozs7SUFDMUMscURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IERvd25sb2FkU2VydmljZSB9IGZyb20gJy4uLy4uL2Rvd25sb2FkL3NoYXJlZC9kb3dubG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZU9wdGlvbnNQYXJhbXMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSxcclxuICBPZ2NGaWx0ZXJzT3B0aW9ucyxcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zXHJcbn0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT0dDRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyYWJsZS1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHByaXZhdGUgbGFzdFJ1bk9nY0ZpbHRlcjtcclxuICBwcml2YXRlIGRlZmF1bHRMb2dpY2FsUGFyZW50ID0gJ0FuZCc7XHJcbiAgcHVibGljIGhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICBwdWJsaWMgZmlsdGVyc0FyZUVkaXRhYmxlID0gdHJ1ZTtcclxuICBwdWJsaWMgZmlsdGVyc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgcHVibGljIGhhc1B1c2hCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgZ2V0IHJlZnJlc2hGdW5jKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaEZpbHRlcnMuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRhc291cmNlKCk6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBvZ2NGaWx0ZXJzSGVhZGVyU2hvd246IGJvb2xlYW47XHJcblxyXG4gIGdldCBkb3dubG9hZGFibGUoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkuZG93bmxvYWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgb2djRmlsdGVyU2VydmljZTogT0dDRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZG93bmxvYWRTZXJ2aWNlOiBEb3dubG9hZFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3Qgb2djRmlsdGVycyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBpZiAoXHJcbiAgICAgIG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMgJiZcclxuICAgICAgb2djRmlsdGVycy5wdXNoQnV0dG9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKG9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIG9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFzUHVzaEJ1dHRvbiA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnR5cGUpIHtcclxuICAgICAgY2FzZSAnd21zJzpcclxuICAgICAgICB0aGlzLm9nY0ZpbHRlclNlcnZpY2Uuc2V0T2djV01TRmlsdGVyc09wdGlvbnModGhpcy5kYXRhc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2ZzJzpcclxuICAgICAgICB0aGlzLm9nY0ZpbHRlclNlcnZpY2Uuc2V0T2djV0ZTRmlsdGVyc09wdGlvbnModGhpcy5kYXRhc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAob2djRmlsdGVycykge1xyXG4gICAgICBpZiAob2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0UnVuT2djRmlsdGVyID0gSlNPTi5wYXJzZShcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycylcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycy5maWx0ZXIoXHJcbiAgICAgICAgICAgIGYgPT4gZi53a3RfZ2VvbWV0cnlcclxuICAgICAgICAgICkubGVuZ3RoID49IDFcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMuaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmZpbHRlcnNBcmVFZGl0YWJsZSA9IG9nY0ZpbHRlcnMuZWRpdGFibGVcclxuICAgICAgICA/IG9nY0ZpbHRlcnMuZWRpdGFibGVcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkRmlsdGVyVG9TZXF1ZW5jZSgpIHtcclxuICAgIHRoaXMuZmlsdGVyc0NvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgaW50ZXJmYWNlT2djRmlsdGVyczogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1tdID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3QgYXJyID0gaW50ZXJmYWNlT2djRmlsdGVycyB8fCBbXTtcclxuICAgIGNvbnN0IGxhc3RMZXZlbCA9IGFyci5sZW5ndGggPT09IDAgPyAwIDogYXJyW2Fyci5sZW5ndGggLSAxXS5sZXZlbDtcclxuICAgIGxldCBmaXJzdEZpZWxkTmFtZSA9ICcnO1xyXG4gICAgaWYgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZpcnN0RmllbGROYW1lID1cclxuICAgICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHNbMF0ubmFtZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/ICcnXHJcbiAgICAgICAgICA6IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkc1swXS5uYW1lO1xyXG4gICAgfVxyXG4gICAgbGV0IGZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgY29uc3QgZGF0YXNvdXJjZU9wdGlvbnMgPSB0aGlzLmRhdGFzb3VyY2VcclxuICAgICAgLm9wdGlvbnMgYXMgV0ZTRGF0YVNvdXJjZU9wdGlvbnNQYXJhbXM7XHJcbiAgICBpZiAoZGF0YXNvdXJjZU9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnkpIHtcclxuICAgICAgZmllbGROYW1lR2VvbWV0cnkgPSBkYXRhc291cmNlT3B0aW9ucy5maWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUyAmJlxyXG4gICAgICAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICkge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9ICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGU1xyXG4gICAgICAgIC5maWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YXR1cyA9IGFyci5sZW5ndGggPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgICBhcnIucHVzaChcclxuICAgICAgbmV3IE9nY0ZpbHRlcldyaXRlcigpLmFkZEludGVyZmFjZUZpbHRlcihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm9wZXJ0eU5hbWU6IGZpcnN0RmllbGROYW1lLFxyXG4gICAgICAgICAgb3BlcmF0b3I6ICdQcm9wZXJ0eUlzRXF1YWxUbycsXHJcbiAgICAgICAgICBhY3RpdmU6IHN0YXR1cyxcclxuICAgICAgICAgIGlnb1NwYXRpYWxTZWxlY3RvcjogJ2ZpeGVkRXh0ZW50J1xyXG4gICAgICAgIH0gYXMgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICBsYXN0TGV2ZWwsXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9naWNhbFBhcmVudFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gYXJyO1xyXG4gIH1cclxuXHJcbiAgb3BlbkRvd25sb2FkKCkge1xyXG4gICAgdGhpcy5kb3dubG9hZFNlcnZpY2Uub3Blbih0aGlzLmxheWVyKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hGaWx0ZXJzKGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubGFzdFJ1bk9nY0ZpbHRlciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IG9nY0ZpbHRlcnM6IE9nY0ZpbHRlcnNPcHRpb25zID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuYWN0aXZlID09PSB0cnVlXHJcbiAgICApO1xyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIG9nY0ZpbHRlcnMuZmlsdGVycyA9IHVuZGVmaW5lZDtcclxuICAgICAgb2djRmlsdGVycy5maWx0ZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID4gMSkge1xyXG4gICAgICBhY3RpdmVGaWx0ZXJzWzBdLnBhcmVudExvZ2ljYWwgPSBhY3RpdmVGaWx0ZXJzWzFdLnBhcmVudExvZ2ljYWw7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGFjdGl2ZUZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICAgIGFmID0+IFsnQ29udGFpbnMnLCAnSW50ZXJzZWN0cycsICdXaXRoaW4nXS5pbmRleE9mKGFmLm9wZXJhdG9yKSAhPT0gLTFcclxuICAgICAgKS5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhKEpTT04uc3RyaW5naWZ5KHRoaXMubGFzdFJ1bk9nY0ZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKVxyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd2ZzJykge1xyXG4gICAgICAgIGNvbnN0IG9nY0RhdGFTb3VyY2U6IGFueSA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZTtcclxuICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICBvZ2NMYXllci5maWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLnJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd21zJyAmJlxyXG4gICAgICAgIG9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgcmVidWlsZEZpbHRlciA9ICcnO1xyXG4gICAgICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIucmVidWlsdElnb09nY0ZpbHRlck9iamVjdEZyb21TZXF1ZW5jZShcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyc1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJlYnVpbGRGaWx0ZXIgPSBvZ2NGaWx0ZXJXcml0ZXIuYnVpbGRGaWx0ZXIoXHJcbiAgICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAodGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5T2djKFxyXG4gICAgICAgICAgdGhpcy5kYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICByZWJ1aWxkRmlsdGVyXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcmVkID1cclxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlkZW50aWNhbCBmaWx0ZXIuIE5vdGhpbmcgdHJpZ2dlcmVkXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmlzaWJsZSgpIHtcclxuICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNBZHZhbmNlZE9nY0ZpbHRlcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRmlsdGVyRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKCF0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMgfHzCoHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VPZ2NGaWx0ZXJzQWR2YW5jZWRPZ2NGaWx0ZXJzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlT2djRmlsdGVyVHlwZShpc0FkdmFuY2VkT2djRmlsdGVycykge1xyXG4gICAgdGhpcy5jaGFuZ2VPZ2NGaWx0ZXJzQWR2YW5jZWRPZ2NGaWx0ZXJzKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzLmNoZWNrZWQpO1xyXG4gICAgaWYgKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzLmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoRmlsdGVycyh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19