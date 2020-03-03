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
        arr.push(new OgcFilterWriter().addInterfaceFilter((/** @type {?} */ ({
            propertyName: firstFieldName,
            operator: 'PropertyIsEqualTo',
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
                    template: "<mat-list-item>\r\n\r\n  <mat-icon \r\n    *ngIf=\"header\" \r\n    class=\"igo-chevron\" \r\n    mat-list-avatar \r\n    igoCollapse [target]=\"ogcFilters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\" \r\n    svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" *ngIf=\"header\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n  <h4 *ngIf=\"!header\" matLine></h4>\r\n\r\n  <span *ngIf=\"downloadable && header\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n      [color]=\"color\" (click)=\"openDownload()\">\r\n      <mat-icon svgIcon=\"download\"></mat-icon>\r\n    </button>\r\n  </span>\r\n  <button *ngIf=\"isAdvancedOgcFilters() && filtersAreEditable\" [disabled]=\"addFilterDisabled()\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n  <button *ngIf=\"!layer.visible && header\" mat-icon-button tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"warn\" (click)=\"setVisible()\">\r\n    <mat-icon svgIcon=\"alert-circle-outline\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n    <div *ngIf=\"header\" #legend class=\"igo-layer-legend-container\">\r\n      <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n      </igo-layer-legend>\r\n    </div>\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filterable-form>\r\n\r\n  <section class=\"mat-typography\">\r\n  <mat-checkbox labelPosition='before' *ngIf=\"hasPushButton && filtersAreEditable\" (change)=\"changeOgcFilterType($event)\"\r\n    [(ngModel)]=\"datasource.options.ogcFilters.advancedOgcFilters\">\r\n    {{'igo.geo.filter.advancedOgcFilters' | translate}}\r\n  </mat-checkbox>\r\n</section>\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFTekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QztJQWlDRSxvQ0FDVSxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFEaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUE3Qm5DLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFakIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBTTFELFdBQU0sR0FBWSxJQUFJLENBQUM7SUFpQjdCLENBQUM7SUFmSixzQkFBSSxtREFBVzs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFD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QUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8saURBQVk7Ozs7O0lBQXBCLFVBQXFCLFNBQWtCO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCx3REFBbUI7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7OztJQUVELDJEQUFzQjs7O0lBQXRCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pELENBQUM7O2dCQXJPRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsbXdFQUFtRDs7aUJBRXBEOzs7O2dCQVRRLGdCQUFnQjtnQkFUaEIsZUFBZTs7O3dCQTZCckIsS0FBSztzQkFFTCxLQUFLO3lCQUVMLEtBQUs7O0lBbU5SLGlDQUFDO0NBQUEsQUF0T0QsSUFzT0M7U0FqT1ksMEJBQTBCOzs7SUFDckMsMkNBQXlCOzs7OztJQUN6QixzREFBeUI7Ozs7O0lBQ3pCLDBEQUFxQzs7SUFDckMsNERBQXNDOztJQUN0Qyx3REFBaUM7O0lBQ2pDLHNEQUErQjs7SUFDL0IsbURBQXNDOztJQUN0QyxpREFBbUU7O0lBRW5FLDJDQUFzQjs7SUFFdEIseUNBQXFCOztJQUVyQiw0Q0FBZ0M7Ozs7O0lBZTlCLHNEQUEwQzs7Ozs7SUFDMUMscURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBEb3dubG9hZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT2djRmlsdGVyYWJsZURhdGFTb3VyY2UsXHJcbiAgT2djRmlsdGVyc09wdGlvbnMsXHJcbiAgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1xyXG59IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9HQ0ZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXJhYmxlLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyYWJsZS1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZ2MtZmlsdGVyYWJsZS1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHJpdmF0ZSBsYXN0UnVuT2djRmlsdGVyO1xyXG4gIHByaXZhdGUgZGVmYXVsdExvZ2ljYWxQYXJlbnQgPSAnQW5kJztcclxuICBwdWJsaWMgaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IGZhbHNlO1xyXG4gIHB1YmxpYyBmaWx0ZXJzQXJlRWRpdGFibGUgPSB0cnVlO1xyXG4gIHB1YmxpYyBmaWx0ZXJzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICBwdWJsaWMgaGFzUHVzaEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dMZWdlbmQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KCkgaGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgZ2V0IHJlZnJlc2hGdW5jKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaEZpbHRlcnMuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRhc291cmNlKCk6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgZG93bmxvYWRhYmxlKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLmRvd25sb2FkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG9nY0ZpbHRlclNlcnZpY2U6IE9HQ0ZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRvd25sb2FkU2VydmljZTogRG93bmxvYWRTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMgJiYgb2djRmlsdGVycy5wdXNoQnV0dG9ucy5idW5kbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKG9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaGFzUHVzaEJ1dHRvbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3dtcyc6XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLnNldE9nY1dNU0ZpbHRlcnNPcHRpb25zKHRoaXMuZGF0YXNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dmcyc6XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLnNldE9nY1dGU0ZpbHRlcnNPcHRpb25zKHRoaXMuZGF0YXNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9nY0ZpbHRlcnMpIHtcclxuICAgICAgaWYgKG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycykge1xyXG4gICAgICAgIHRoaXMubGFzdFJ1bk9nY0ZpbHRlciA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKGYgPT4gZi53a3RfZ2VvbWV0cnkpLmxlbmd0aCA+PSAxXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5maWx0ZXJzQXJlRWRpdGFibGUgPSBvZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICAgICAgPyBvZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZEZpbHRlclRvU2VxdWVuY2UoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnNDb2xsYXBzZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGludGVyZmFjZU9nY0ZpbHRlcnM6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXSA9IHRoaXMuZGF0YXNvdXJjZVxyXG4gICAgICAub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBhcnIgPSBpbnRlcmZhY2VPZ2NGaWx0ZXJzIHx8IFtdO1xyXG4gICAgY29uc3QgbGFzdExldmVsID0gYXJyLmxlbmd0aCA9PT0gMCA/IDAgOiBhcnJbYXJyLmxlbmd0aCAtIDFdLmxldmVsO1xyXG4gICAgbGV0IGZpcnN0RmllbGROYW1lID0gJyc7XHJcbiAgICBjb25zdCBpbmNsdWRlZEZpZWxkcyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5maWx0ZXIoZiA9PiAhZi5leGNsdWRlRnJvbU9nY0ZpbHRlcnMpO1xyXG4gICAgaWYgKGluY2x1ZGVkRmllbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZmlyc3RGaWVsZE5hbWUgPVxyXG4gICAgICAgIGluY2x1ZGVkRmllbGRzWzBdLm5hbWUgPT09IHVuZGVmaW5lZCA/ICcnIDogaW5jbHVkZWRGaWVsZHNbMF0ubmFtZTtcclxuICAgIH1cclxuICAgIGxldCBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIGNvbnN0IGRhdGFzb3VyY2VPcHRpb25zID0gdGhpcy5kYXRhc291cmNlXHJcbiAgICAgIC5vcHRpb25zIGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zO1xyXG4gICAgaWYgKGRhdGFzb3VyY2VPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5KSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID0gZGF0YXNvdXJjZU9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMgJiZcclxuICAgICAgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICApIHtcclxuICAgICAgZmllbGROYW1lR2VvbWV0cnkgPSAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlNcclxuICAgICAgICAuZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGF0dXMgPSBhcnIubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgYXJyLnB1c2goXHJcbiAgICAgIG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKS5hZGRJbnRlcmZhY2VGaWx0ZXIoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiBmaXJzdEZpZWxkTmFtZSxcclxuICAgICAgICAgIG9wZXJhdG9yOiAnUHJvcGVydHlJc0VxdWFsVG8nLFxyXG4gICAgICAgICAgYWN0aXZlOiBzdGF0dXMsXHJcbiAgICAgICAgICBpZ29TcGF0aWFsU2VsZWN0b3I6ICdmaXhlZEV4dGVudCcsXHJcbiAgICAgICAgICBzcnNOYW1lOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgIH0gYXMgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICBsYXN0TGV2ZWwsXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9naWNhbFBhcmVudFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gYXJyO1xyXG4gIH1cclxuXHJcbiAgb3BlbkRvd25sb2FkKCkge1xyXG4gICAgdGhpcy5kb3dubG9hZFNlcnZpY2Uub3Blbih0aGlzLmxheWVyKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hGaWx0ZXJzKGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubGFzdFJ1bk9nY0ZpbHRlciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IG9nY0ZpbHRlcnM6IE9nY0ZpbHRlcnNPcHRpb25zID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuYWN0aXZlID09PSB0cnVlXHJcbiAgICApO1xyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIG9nY0ZpbHRlcnMuZmlsdGVycyA9IHVuZGVmaW5lZDtcclxuICAgICAgb2djRmlsdGVycy5maWx0ZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID4gMSkge1xyXG4gICAgICBhY3RpdmVGaWx0ZXJzWzBdLnBhcmVudExvZ2ljYWwgPSBhY3RpdmVGaWx0ZXJzWzFdLnBhcmVudExvZ2ljYWw7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGFjdGl2ZUZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICAgIGFmID0+IFsnQ29udGFpbnMnLCAnSW50ZXJzZWN0cycsICdXaXRoaW4nXS5pbmRleE9mKGFmLm9wZXJhdG9yKSAhPT0gLTFcclxuICAgICAgKS5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhKEpTT04uc3RyaW5naWZ5KHRoaXMubGFzdFJ1bk9nY0ZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKVxyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd2ZzJykge1xyXG4gICAgICAgIGNvbnN0IG9nY0RhdGFTb3VyY2U6IGFueSA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZTtcclxuICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICBvZ2NMYXllci5maWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLnJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd21zJyAmJlxyXG4gICAgICAgIG9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgcmVidWlsZEZpbHRlciA9ICcnO1xyXG4gICAgICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIucmVidWlsdElnb09nY0ZpbHRlck9iamVjdEZyb21TZXF1ZW5jZShcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyc1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJlYnVpbGRGaWx0ZXIgPSBvZ2NGaWx0ZXJXcml0ZXIuYnVpbGRGaWx0ZXIoXHJcbiAgICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAodGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5T2djKFxyXG4gICAgICAgICAgdGhpcy5kYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICByZWJ1aWxkRmlsdGVyXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcmVkID1cclxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlkZW50aWNhbCBmaWx0ZXIuIE5vdGhpbmcgdHJpZ2dlcmVkXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmlzaWJsZSgpIHtcclxuICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNBZHZhbmNlZE9nY0ZpbHRlcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRmlsdGVyRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzIHx8XHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZU9nY0ZpbHRlcnNBZHZhbmNlZE9nY0ZpbHRlcnModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VPZ2NGaWx0ZXJUeXBlKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzKSB7XHJcbiAgICB0aGlzLmNoYW5nZU9nY0ZpbHRlcnNBZHZhbmNlZE9nY0ZpbHRlcnMoaXNBZHZhbmNlZE9nY0ZpbHRlcnMuY2hlY2tlZCk7XHJcbiAgICBpZiAoaXNBZHZhbmNlZE9nY0ZpbHRlcnMuY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVMZWdlbmQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyLmxlZ2VuZENvbGxhcHNlZCA9IGNvbGxhcHNlZDtcclxuICAgIHRoaXMuc2hvd0xlZ2VuZCQubmV4dCghY29sbGFwc2VkKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZE9uQ2xpY2soKSB7XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyc0NvbGxhcHNlZCkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0aGlzLnNob3dMZWdlbmQkLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvZ2dsZUZpbHRlcnNDb2xsYXBzZWQoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnNDb2xsYXBzZWQgPSAhdGhpcy5maWx0ZXJzQ29sbGFwc2VkO1xyXG4gIH1cclxufVxyXG4iXX0=