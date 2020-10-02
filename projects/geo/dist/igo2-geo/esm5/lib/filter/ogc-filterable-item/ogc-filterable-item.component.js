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
import { BehaviorSubject } from 'rxjs';
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
        this.showLegend$ = new BehaviorSubject(false);
        this.header = true;
        this.ogcFilterWriter = new OgcFilterWriter();
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
        if (ogcFilters.pushButtons && ogcFilters.pushButtons.bundles.length > 0) {
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
        var interfaceOgcFilters = this.datasource
            .options.ogcFilters.interfaceOgcFilters;
        /** @type {?} */
        var arr = interfaceOgcFilters || [];
        /** @type {?} */
        var lastLevel = arr.length === 0 ? 0 : arr[arr.length - 1].level;
        /** @type {?} */
        var firstFieldName = '';
        /** @type {?} */
        var includedFields = this.datasource.options.sourceFields.filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return !f.excludeFromOgcFilters; }));
        if (includedFields.length > 0) {
            firstFieldName =
                includedFields[0].name === undefined ? '' : includedFields[0].name;
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
        /** @type {?} */
        var allowedOperators = this.ogcFilterWriter.computeAllowedOperators(this.datasource.options.sourceFields, firstFieldName, this.datasource.options.ogcFilters.allowedOperatorsType);
        /** @type {?} */
        var firstOperatorName = Object.keys(allowedOperators)[0];
        arr.push(this.ogcFilterWriter.addInterfaceFilter((/** @type {?} */ ({
            propertyName: firstFieldName,
            operator: firstOperatorName,
            active: status,
            igoSpatialSelector: 'fixedExtent',
            srsName: this.map.projection,
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
                ogcLayer.filters = this.ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
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
                    ogcLayer.filters = this.ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
                    rebuildFilter = this.ogcFilterWriter.buildFilter(ogcLayer.filters, undefined, undefined, ((/** @type {?} */ (this.layer.dataSource.options))).fieldNameGeometry);
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
        return (!this.datasource.options.sourceFields ||
            this.datasource.options.sourceFields.length === 0);
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
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.toggleLegend = /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        this.layer.legendCollapsed = collapsed;
        this.showLegend$.next(!collapsed);
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.toggleLegendOnClick = /**
     * @return {?}
     */
    function () {
        if (!this.filtersCollapsed) {
            this.toggleLegend(this.showLegend$.value);
        }
    };
    /**
     * @return {?}
     */
    OgcFilterableItemComponent.prototype.toggleFiltersCollapsed = /**
     * @return {?}
     */
    function () {
        this.filtersCollapsed = !this.filtersCollapsed;
    };
    OgcFilterableItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filterable-item',
                    template: "<mat-list-item>\r\n\r\n  <mat-icon\r\n    *ngIf=\"header\"\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse [target]=\"ogcFilters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\"\r\n    svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" *ngIf=\"header\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n    <span *ngIf=\"downloadable && header\">\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n        [color]=\"color\" (click)=\"openDownload()\">\r\n        <mat-icon svgIcon=\"download\"></mat-icon>\r\n      </button>\r\n    </span>\r\n    <button *ngIf=\"isAdvancedOgcFilters() && filtersAreEditable\" [disabled]=\"addFilterDisabled()\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n      <mat-icon svgIcon=\"plus\"></mat-icon>\r\n    </button>\r\n    <button *ngIf=\"!layer.visible && header\" mat-icon-button tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"color\" (click)=\"setVisible()\">\r\n      <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n    </button>\r\n</mat-list-item>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n    <div *ngIf=\"header\" #legend class=\"igo-layer-legend-container\">\r\n      <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n      </igo-layer-legend>\r\n    </div>\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filterable-form>\r\n\r\n  <section class=\"mat-typography\">\r\n  <mat-checkbox labelPosition='before' *ngIf=\"hasPushButton && filtersAreEditable\" (change)=\"changeOgcFilterType($event)\"\r\n    [(ngModel)]=\"datasource.options.ogcFilters.advancedOgcFilters\">\r\n    {{'igo.geo.filter.advancedOgcFilters' | translate}}\r\n  </mat-checkbox>\r\n</section>\r\n</div>\r\n",
                    styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}.mat-list-item{height:auto}.igo-layer-legend-container{padding-left:1.125em;width:calc(100% - 18px)}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
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
        header: [{ type: Input }]
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
    OgcFilterableItemComponent.prototype.showLegend$;
    /**
     * @type {?}
     * @private
     */
    OgcFilterableItemComponent.prototype.ogcFilterWriter;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.layer;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.map;
    /** @type {?} */
    OgcFilterableItemComponent.prototype.header;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFTekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QztJQW1DRSxvQ0FDVSxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFEaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUEvQm5DLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFakIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBUTFELFdBQU0sR0FBWSxJQUFJLENBQUM7UUFrQjlCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBakJELHNC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QUNyQyw0REFBc0M7O0lBQ3RDLHdEQUFpQzs7SUFDakMsc0RBQStCOztJQUMvQixtREFBc0M7O0lBQ3RDLGlEQUFtRTs7Ozs7SUFFbkUscURBQXdCOztJQUV4QiwyQ0FBc0I7O0lBRXRCLHlDQUFxQjs7SUFFckIsNENBQWdDOzs7OztJQWU5QixzREFBMEM7Ozs7O0lBQzFDLHFEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgRG93bmxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZG93bmxvYWQvc2hhcmVkL2Rvd25sb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9uc1BhcmFtcyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlLFxyXG4gIE9nY0ZpbHRlcnNPcHRpb25zLFxyXG4gIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNcclxufSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPR0NGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyYWJsZS1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHByaXZhdGUgbGFzdFJ1bk9nY0ZpbHRlcjtcclxuICBwcml2YXRlIGRlZmF1bHRMb2dpY2FsUGFyZW50ID0gJ0FuZCc7XHJcbiAgcHVibGljIGhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICBwdWJsaWMgZmlsdGVyc0FyZUVkaXRhYmxlID0gdHJ1ZTtcclxuICBwdWJsaWMgZmlsdGVyc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgcHVibGljIGhhc1B1c2hCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93TGVnZW5kJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgb2djRmlsdGVyV3JpdGVyO1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBoZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBnZXQgcmVmcmVzaEZ1bmMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoRmlsdGVycy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFzb3VyY2UoKTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIuZGF0YVNvdXJjZSBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIGdldCBkb3dubG9hZGFibGUoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkuZG93bmxvYWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgb2djRmlsdGVyU2VydmljZTogT0dDRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZG93bmxvYWRTZXJ2aWNlOiBEb3dubG9hZFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMub2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIGlmIChvZ2NGaWx0ZXJzLnB1c2hCdXR0b25zICYmIG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMuYnVuZGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChvZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmhhc1B1c2hCdXR0b24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMudHlwZSkge1xyXG4gICAgICBjYXNlICd3bXMnOlxyXG4gICAgICAgIHRoaXMub2djRmlsdGVyU2VydmljZS5zZXRPZ2NXTVNGaWx0ZXJzT3B0aW9ucyh0aGlzLmRhdGFzb3VyY2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZnMnOlxyXG4gICAgICAgIHRoaXMub2djRmlsdGVyU2VydmljZS5zZXRPZ2NXRlNGaWx0ZXJzT3B0aW9ucyh0aGlzLmRhdGFzb3VyY2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZ2NGaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpIHtcclxuICAgICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSBKU09OLnBhcnNlKFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkob2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgb2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZpbHRlcihmID0+IGYud2t0X2dlb21ldHJ5KS5sZW5ndGggPj0gMVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5oYXNBY3RpdmVTcGF0aWFsRmlsdGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlsdGVyc0FyZUVkaXRhYmxlID0gb2djRmlsdGVycy5lZGl0YWJsZVxyXG4gICAgICAgID8gb2djRmlsdGVycy5lZGl0YWJsZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRGaWx0ZXJUb1NlcXVlbmNlKCkge1xyXG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gZmFsc2U7XHJcbiAgICBjb25zdCBpbnRlcmZhY2VPZ2NGaWx0ZXJzOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW10gPSB0aGlzLmRhdGFzb3VyY2VcclxuICAgICAgLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3QgYXJyID0gaW50ZXJmYWNlT2djRmlsdGVycyB8fCBbXTtcclxuICAgIGNvbnN0IGxhc3RMZXZlbCA9IGFyci5sZW5ndGggPT09IDAgPyAwIDogYXJyW2Fyci5sZW5ndGggLSAxXS5sZXZlbDtcclxuICAgIGxldCBmaXJzdEZpZWxkTmFtZSA9ICcnO1xyXG4gICAgY29uc3QgaW5jbHVkZWRGaWVsZHMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMuZmlsdGVyKGYgPT4gIWYuZXhjbHVkZUZyb21PZ2NGaWx0ZXJzKTtcclxuICAgIGlmIChpbmNsdWRlZEZpZWxkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZpcnN0RmllbGROYW1lID1cclxuICAgICAgICBpbmNsdWRlZEZpZWxkc1swXS5uYW1lID09PSB1bmRlZmluZWQgPyAnJyA6IGluY2x1ZGVkRmllbGRzWzBdLm5hbWU7XHJcbiAgICB9XHJcbiAgICBsZXQgZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICBjb25zdCBkYXRhc291cmNlT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZVxyXG4gICAgICAub3B0aW9ucyBhcyBXRlNEYXRhU291cmNlT3B0aW9uc1BhcmFtcztcclxuICAgIGlmIChkYXRhc291cmNlT3B0aW9ucy5maWVsZE5hbWVHZW9tZXRyeSkge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9IGRhdGFzb3VyY2VPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTICYmXHJcbiAgICAgICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgKSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID0gKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTXHJcbiAgICAgICAgLmZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhdHVzID0gYXJyLmxlbmd0aCA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuICAgIGNvbnN0IGFsbG93ZWRPcGVyYXRvcnMgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5jb21wdXRlQWxsb3dlZE9wZXJhdG9ycyhcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzLFxyXG4gICAgICBmaXJzdEZpZWxkTmFtZSxcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hbGxvd2VkT3BlcmF0b3JzVHlwZSk7XHJcbiAgICBjb25zdCBmaXJzdE9wZXJhdG9yTmFtZSA9IE9iamVjdC5rZXlzKGFsbG93ZWRPcGVyYXRvcnMpWzBdO1xyXG5cclxuICAgIGFyci5wdXNoKFxyXG4gICAgICB0aGlzLm9nY0ZpbHRlcldyaXRlci5hZGRJbnRlcmZhY2VGaWx0ZXIoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiBmaXJzdEZpZWxkTmFtZSxcclxuICAgICAgICAgIG9wZXJhdG9yOiBmaXJzdE9wZXJhdG9yTmFtZSxcclxuICAgICAgICAgIGFjdGl2ZTogc3RhdHVzLFxyXG4gICAgICAgICAgaWdvU3BhdGlhbFNlbGVjdG9yOiAnZml4ZWRFeHRlbnQnLFxyXG4gICAgICAgICAgc3JzTmFtZTogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICB9IGFzIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsXHJcbiAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgbGFzdExldmVsLFxyXG4gICAgICAgIHRoaXMuZGVmYXVsdExvZ2ljYWxQYXJlbnRcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IGFycjtcclxuICB9XHJcblxyXG4gIG9wZW5Eb3dubG9hZCgpIHtcclxuICAgIHRoaXMuZG93bmxvYWRTZXJ2aWNlLm9wZW4odGhpcy5sYXllcik7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoRmlsdGVycyhmb3JjZT86IGJvb2xlYW4pIHtcclxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzOiBPZ2NGaWx0ZXJzT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gb2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZpbHRlcihcclxuICAgICAgZiA9PiBmLmFjdGl2ZSA9PT0gdHJ1ZVxyXG4gICAgKTtcclxuICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBvZ2NGaWx0ZXJzLmZpbHRlcnMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIG9nY0ZpbHRlcnMuZmlsdGVyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgYWN0aXZlRmlsdGVyc1swXS5wYXJlbnRMb2dpY2FsID0gYWN0aXZlRmlsdGVyc1sxXS5wYXJlbnRMb2dpY2FsO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICBhY3RpdmVGaWx0ZXJzLmZpbHRlcihcclxuICAgICAgICBhZiA9PiBbJ0NvbnRhaW5zJywgJ0ludGVyc2VjdHMnLCAnV2l0aGluJ10uaW5kZXhPZihhZi5vcGVyYXRvcikgIT09IC0xXHJcbiAgICAgICkubGVuZ3RoID09PSAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5oYXNBY3RpdmVTcGF0aWFsRmlsdGVyID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgIShKU09OLnN0cmluZ2lmeSh0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShhY3RpdmVGaWx0ZXJzKSlcclxuICAgICkge1xyXG4gICAgICBpZiAodGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ3dmcycpIHtcclxuICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgY29uc3Qgb2djTGF5ZXI6IE9nY0ZpbHRlcnNPcHRpb25zID0gb2djRGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICAgICAgb2djTGF5ZXIuZmlsdGVycyA9IHRoaXMub2djRmlsdGVyV3JpdGVyLnJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd21zJyAmJlxyXG4gICAgICAgIG9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgcmVidWlsZEZpbHRlciA9ICcnO1xyXG4gICAgICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5yZWJ1aWx0SWdvT2djRmlsdGVyT2JqZWN0RnJvbVNlcXVlbmNlKFxyXG4gICAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmVidWlsZEZpbHRlciA9IHRoaXMub2djRmlsdGVyV3JpdGVyLmJ1aWxkRmlsdGVyKFxyXG4gICAgICAgICAgICBvZ2NMYXllci5maWx0ZXJzLFxyXG4gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgKHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2djRmlsdGVyU2VydmljZS5maWx0ZXJCeU9nYyhcclxuICAgICAgICAgIHRoaXMuZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlLFxyXG4gICAgICAgICAgcmVidWlsZEZpbHRlclxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJlZCA9XHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5sYXN0UnVuT2djRmlsdGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhY3RpdmVGaWx0ZXJzKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZGVudGljYWwgZmlsdGVyLiBOb3RoaW5nIHRyaWdnZXJlZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZpc2libGUoKSB7XHJcbiAgICB0aGlzLmxheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzQWR2YW5jZWRPZ2NGaWx0ZXJzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEZpbHRlckRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgIXRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcyB8fFxyXG4gICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID09PSAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VPZ2NGaWx0ZXJzQWR2YW5jZWRPZ2NGaWx0ZXJzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlT2djRmlsdGVyVHlwZShpc0FkdmFuY2VkT2djRmlsdGVycykge1xyXG4gICAgdGhpcy5jaGFuZ2VPZ2NGaWx0ZXJzQWR2YW5jZWRPZ2NGaWx0ZXJzKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzLmNoZWNrZWQpO1xyXG4gICAgaWYgKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzLmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoRmlsdGVycyh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlTGVnZW5kKGNvbGxhcHNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllci5sZWdlbmRDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICB0aGlzLnNob3dMZWdlbmQkLm5leHQoIWNvbGxhcHNlZCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVMZWdlbmRPbkNsaWNrKCkge1xyXG4gICAgaWYgKCF0aGlzLmZpbHRlcnNDb2xsYXBzZWQpIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQodGhpcy5zaG93TGVnZW5kJC52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGaWx0ZXJzQ29sbGFwc2VkKCkge1xyXG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gIXRoaXMuZmlsdGVyc0NvbGxhcHNlZDtcclxuICB9XHJcbn1cclxuIl19