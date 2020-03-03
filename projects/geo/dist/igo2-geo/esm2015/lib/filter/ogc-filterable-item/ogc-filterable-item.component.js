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
        this.hasPushButton = false;
        this.showLegend$ = new BehaviorSubject(false);
        this.header = true;
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
    get datasource() {
        return (/** @type {?} */ (this.layer.dataSource));
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
    ngOnInit() {
        /** @type {?} */
        const ogcFilters = this.datasource.options.ogcFilters;
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
                f => f.wkt_geometry)).length >= 1) {
                    this.hasActiveSpatialFilter = true;
                }
            }
            this.filtersAreEditable = ogcFilters.editable
                ? ogcFilters.editable
                : false;
        }
    }
    /**
     * @return {?}
     */
    addFilterToSequence() {
        this.filtersCollapsed = false;
        /** @type {?} */
        const interfaceOgcFilters = this.datasource
            .options.ogcFilters.interfaceOgcFilters;
        /** @type {?} */
        const arr = interfaceOgcFilters || [];
        /** @type {?} */
        const lastLevel = arr.length === 0 ? 0 : arr[arr.length - 1].level;
        /** @type {?} */
        let firstFieldName = '';
        /** @type {?} */
        const includedFields = this.datasource.options.sourceFields.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => !f.excludeFromOgcFilters));
        if (includedFields.length > 0) {
            firstFieldName =
                includedFields[0].name === undefined ? '' : includedFields[0].name;
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
        arr.push(new OgcFilterWriter().addInterfaceFilter((/** @type {?} */ ({
            propertyName: firstFieldName,
            operator: 'PropertyIsEqualTo',
            active: status,
            igoSpatialSelector: 'fixedExtent',
            srsName: this.map.projection,
        })), fieldNameGeometry, lastLevel, this.defaultLogicalParent));
        this.datasource.options.ogcFilters.interfaceOgcFilters = arr;
    }
    /**
     * @return {?}
     */
    openDownload() {
        this.downloadService.open(this.layer);
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    refreshFilters(force) {
        if (force === true) {
            this.lastRunOgcFilter = undefined;
        }
        /** @type {?} */
        const ogcFilters = this.datasource.options.ogcFilters;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
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
                ogcLayer.filters = ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
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
    }
    /**
     * @return {?}
     */
    setVisible() {
        this.layer.visible = true;
    }
    /**
     * @return {?}
     */
    isAdvancedOgcFilters() {
        return this.datasource.options.ogcFilters.advancedOgcFilters;
    }
    /**
     * @return {?}
     */
    addFilterDisabled() {
        return (!this.datasource.options.sourceFields ||
            this.datasource.options.sourceFields.length === 0);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    changeOgcFiltersAdvancedOgcFilters(value) {
        this.datasource.options.ogcFilters.advancedOgcFilters = value;
    }
    /**
     * @param {?} isAdvancedOgcFilters
     * @return {?}
     */
    changeOgcFilterType(isAdvancedOgcFilters) {
        this.changeOgcFiltersAdvancedOgcFilters(isAdvancedOgcFilters.checked);
        if (isAdvancedOgcFilters.checked) {
            this.refreshFilters(true);
        }
    }
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    toggleLegend(collapsed) {
        this.layer.legendCollapsed = collapsed;
        this.showLegend$.next(!collapsed);
    }
    /**
     * @return {?}
     */
    toggleLegendOnClick() {
        if (!this.filtersCollapsed) {
            this.toggleLegend(this.showLegend$.value);
        }
    }
    /**
     * @return {?}
     */
    toggleFiltersCollapsed() {
        this.filtersCollapsed = !this.filtersCollapsed;
    }
}
OgcFilterableItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filterable-item',
                template: "<mat-list-item>\r\n\r\n  <mat-icon \r\n    *ngIf=\"header\" \r\n    class=\"igo-chevron\" \r\n    mat-list-avatar \r\n    igoCollapse [target]=\"ogcFilters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\" \r\n    svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" *ngIf=\"header\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n  <h4 *ngIf=\"!header\" matLine></h4>\r\n\r\n  <span *ngIf=\"downloadable && header\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n      [color]=\"color\" (click)=\"openDownload()\">\r\n      <mat-icon svgIcon=\"download\"></mat-icon>\r\n    </button>\r\n  </span>\r\n  <button *ngIf=\"isAdvancedOgcFilters() && filtersAreEditable\" [disabled]=\"addFilterDisabled()\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n  <button *ngIf=\"!layer.visible && header\" mat-icon-button tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"warn\" (click)=\"setVisible()\">\r\n    <mat-icon svgIcon=\"alert-circle-outline\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n    <div *ngIf=\"header\" #legend class=\"igo-layer-legend-container\">\r\n      <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n      </igo-layer-legend>\r\n    </div>\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filterable-form>\r\n\r\n  <section class=\"mat-typography\">\r\n  <mat-checkbox labelPosition='before' *ngIf=\"hasPushButton && filtersAreEditable\" (change)=\"changeOgcFilterType($event)\"\r\n    [(ngModel)]=\"datasource.options.ogcFilters.advancedOgcFilters\">\r\n    {{'igo.geo.filter.advancedOgcFilters' | translate}}\r\n  </mat-checkbox>\r\n</section>\r\n</div>\r\n",
                styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}.mat-list-item{height:auto}.igo-layer-legend-container{padding-left:1.125em;width:calc(100% - 18px)}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
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
    header: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFTekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU92QyxNQUFNLE9BQU8sMEJBQTBCOzs7OztJQTRCckMsWUFDVSxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFEaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUE3Qm5DLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFakIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBTTFELFdBQU0sR0FBWSxJQUFJLENBQUM7SUFpQjdCLENBQUM7Ozs7SUFmSixJQUFJLFdBQVc7UUFDYixPQUFPLElBQUks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QUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7O0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqRCxDQUFDOzs7WUFyT0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLG13RUFBbUQ7O2FBRXBEOzs7O1lBVFEsZ0JBQWdCO1lBVGhCLGVBQWU7OztvQkE2QnJCLEtBQUs7a0JBRUwsS0FBSztxQkFFTCxLQUFLOzs7O0lBYk4sMkNBQXlCOzs7OztJQUN6QixzREFBeUI7Ozs7O0lBQ3pCLDBEQUFxQzs7SUFDckMsNERBQXNDOztJQUN0Qyx3REFBaUM7O0lBQ2pDLHNEQUErQjs7SUFDL0IsbURBQXNDOztJQUN0QyxpREFBbUU7O0lBRW5FLDJDQUFzQjs7SUFFdEIseUNBQXFCOztJQUVyQiw0Q0FBZ0M7Ozs7O0lBZTlCLHNEQUEwQzs7Ozs7SUFDMUMscURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBEb3dubG9hZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT2djRmlsdGVyYWJsZURhdGFTb3VyY2UsXHJcbiAgT2djRmlsdGVyc09wdGlvbnMsXHJcbiAgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9uc1xyXG59IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9HQ0ZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXJhYmxlLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyYWJsZS1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZ2MtZmlsdGVyYWJsZS1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHJpdmF0ZSBsYXN0UnVuT2djRmlsdGVyO1xyXG4gIHByaXZhdGUgZGVmYXVsdExvZ2ljYWxQYXJlbnQgPSAnQW5kJztcclxuICBwdWJsaWMgaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IGZhbHNlO1xyXG4gIHB1YmxpYyBmaWx0ZXJzQXJlRWRpdGFibGUgPSB0cnVlO1xyXG4gIHB1YmxpYyBmaWx0ZXJzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICBwdWJsaWMgaGFzUHVzaEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dMZWdlbmQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KCkgaGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgZ2V0IHJlZnJlc2hGdW5jKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaEZpbHRlcnMuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRhc291cmNlKCk6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLmRhdGFTb3VyY2UgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgZG93bmxvYWRhYmxlKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLmRvd25sb2FkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG9nY0ZpbHRlclNlcnZpY2U6IE9HQ0ZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRvd25sb2FkU2VydmljZTogRG93bmxvYWRTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzO1xyXG4gICAgaWYgKG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMgJiYgb2djRmlsdGVycy5wdXNoQnV0dG9ucy5idW5kbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKG9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaGFzUHVzaEJ1dHRvbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3dtcyc6XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLnNldE9nY1dNU0ZpbHRlcnNPcHRpb25zKHRoaXMuZGF0YXNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dmcyc6XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLnNldE9nY1dGU0ZpbHRlcnNPcHRpb25zKHRoaXMuZGF0YXNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9nY0ZpbHRlcnMpIHtcclxuICAgICAgaWYgKG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycykge1xyXG4gICAgICAgIHRoaXMubGFzdFJ1bk9nY0ZpbHRlciA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKGYgPT4gZi53a3RfZ2VvbWV0cnkpLmxlbmd0aCA+PSAxXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5maWx0ZXJzQXJlRWRpdGFibGUgPSBvZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICAgICAgPyBvZ2NGaWx0ZXJzLmVkaXRhYmxlXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZEZpbHRlclRvU2VxdWVuY2UoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnNDb2xsYXBzZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGludGVyZmFjZU9nY0ZpbHRlcnM6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNbXSA9IHRoaXMuZGF0YXNvdXJjZVxyXG4gICAgICAub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBhcnIgPSBpbnRlcmZhY2VPZ2NGaWx0ZXJzIHx8IFtdO1xyXG4gICAgY29uc3QgbGFzdExldmVsID0gYXJyLmxlbmd0aCA9PT0gMCA/IDAgOiBhcnJbYXJyLmxlbmd0aCAtIDFdLmxldmVsO1xyXG4gICAgbGV0IGZpcnN0RmllbGROYW1lID0gJyc7XHJcbiAgICBjb25zdCBpbmNsdWRlZEZpZWxkcyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5maWx0ZXIoZiA9PiAhZi5leGNsdWRlRnJvbU9nY0ZpbHRlcnMpO1xyXG4gICAgaWYgKGluY2x1ZGVkRmllbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZmlyc3RGaWVsZE5hbWUgPVxyXG4gICAgICAgIGluY2x1ZGVkRmllbGRzWzBdLm5hbWUgPT09IHVuZGVmaW5lZCA/ICcnIDogaW5jbHVkZWRGaWVsZHNbMF0ubmFtZTtcclxuICAgIH1cclxuICAgIGxldCBmaWVsZE5hbWVHZW9tZXRyeTtcclxuICAgIGNvbnN0IGRhdGFzb3VyY2VPcHRpb25zID0gdGhpcy5kYXRhc291cmNlXHJcbiAgICAgIC5vcHRpb25zIGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zUGFyYW1zO1xyXG4gICAgaWYgKGRhdGFzb3VyY2VPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5KSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID0gZGF0YXNvdXJjZU9wdGlvbnMuZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlMgJiZcclxuICAgICAgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICApIHtcclxuICAgICAgZmllbGROYW1lR2VvbWV0cnkgPSAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXNXRlNcclxuICAgICAgICAuZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGF0dXMgPSBhcnIubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgYXJyLnB1c2goXHJcbiAgICAgIG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKS5hZGRJbnRlcmZhY2VGaWx0ZXIoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiBmaXJzdEZpZWxkTmFtZSxcclxuICAgICAgICAgIG9wZXJhdG9yOiAnUHJvcGVydHlJc0VxdWFsVG8nLFxyXG4gICAgICAgICAgYWN0aXZlOiBzdGF0dXMsXHJcbiAgICAgICAgICBpZ29TcGF0aWFsU2VsZWN0b3I6ICdmaXhlZEV4dGVudCcsXHJcbiAgICAgICAgICBzcnNOYW1lOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgIH0gYXMgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICAgICAgICBmaWVsZE5hbWVHZW9tZXRyeSxcclxuICAgICAgICBsYXN0TGV2ZWwsXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9naWNhbFBhcmVudFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gYXJyO1xyXG4gIH1cclxuXHJcbiAgb3BlbkRvd25sb2FkKCkge1xyXG4gICAgdGhpcy5kb3dubG9hZFNlcnZpY2Uub3Blbih0aGlzLmxheWVyKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hGaWx0ZXJzKGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubGFzdFJ1bk9nY0ZpbHRlciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IG9nY0ZpbHRlcnM6IE9nY0ZpbHRlcnNPcHRpb25zID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIGNvbnN0IG9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuYWN0aXZlID09PSB0cnVlXHJcbiAgICApO1xyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIG9nY0ZpbHRlcnMuZmlsdGVycyA9IHVuZGVmaW5lZDtcclxuICAgICAgb2djRmlsdGVycy5maWx0ZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID4gMSkge1xyXG4gICAgICBhY3RpdmVGaWx0ZXJzWzBdLnBhcmVudExvZ2ljYWwgPSBhY3RpdmVGaWx0ZXJzWzFdLnBhcmVudExvZ2ljYWw7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGFjdGl2ZUZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICAgIGFmID0+IFsnQ29udGFpbnMnLCAnSW50ZXJzZWN0cycsICdXaXRoaW4nXS5pbmRleE9mKGFmLm9wZXJhdG9yKSAhPT0gLTFcclxuICAgICAgKS5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzQWN0aXZlU3BhdGlhbEZpbHRlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhKEpTT04uc3RyaW5naWZ5KHRoaXMubGFzdFJ1bk9nY0ZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKVxyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd2ZzJykge1xyXG4gICAgICAgIGNvbnN0IG9nY0RhdGFTb3VyY2U6IGFueSA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZTtcclxuICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICBvZ2NMYXllci5maWx0ZXJzID0gb2djRmlsdGVyV3JpdGVyLnJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd21zJyAmJlxyXG4gICAgICAgIG9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgcmVidWlsZEZpbHRlciA9ICcnO1xyXG4gICAgICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMgPSBvZ2NGaWx0ZXJXcml0ZXIucmVidWlsdElnb09nY0ZpbHRlck9iamVjdEZyb21TZXF1ZW5jZShcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyc1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJlYnVpbGRGaWx0ZXIgPSBvZ2NGaWx0ZXJXcml0ZXIuYnVpbGRGaWx0ZXIoXHJcbiAgICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAodGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZ2NGaWx0ZXJTZXJ2aWNlLmZpbHRlckJ5T2djKFxyXG4gICAgICAgICAgdGhpcy5kYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICByZWJ1aWxkRmlsdGVyXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmZpbHRlcmVkID1cclxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnMubGVuZ3RoID09PSAwID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlcnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlkZW50aWNhbCBmaWx0ZXIuIE5vdGhpbmcgdHJpZ2dlcmVkXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmlzaWJsZSgpIHtcclxuICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNBZHZhbmNlZE9nY0ZpbHRlcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRmlsdGVyRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzIHx8XHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZU9nY0ZpbHRlcnNBZHZhbmNlZE9nY0ZpbHRlcnModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VPZ2NGaWx0ZXJUeXBlKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzKSB7XHJcbiAgICB0aGlzLmNoYW5nZU9nY0ZpbHRlcnNBZHZhbmNlZE9nY0ZpbHRlcnMoaXNBZHZhbmNlZE9nY0ZpbHRlcnMuY2hlY2tlZCk7XHJcbiAgICBpZiAoaXNBZHZhbmNlZE9nY0ZpbHRlcnMuY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVMZWdlbmQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyLmxlZ2VuZENvbGxhcHNlZCA9IGNvbGxhcHNlZDtcclxuICAgIHRoaXMuc2hvd0xlZ2VuZCQubmV4dCghY29sbGFwc2VkKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZE9uQ2xpY2soKSB7XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyc0NvbGxhcHNlZCkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0aGlzLnNob3dMZWdlbmQkLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvZ2dsZUZpbHRlcnNDb2xsYXBzZWQoKSB7XHJcbiAgICB0aGlzLmZpbHRlcnNDb2xsYXBzZWQgPSAhdGhpcy5maWx0ZXJzQ29sbGFwc2VkO1xyXG4gIH1cclxufVxyXG4iXX0=