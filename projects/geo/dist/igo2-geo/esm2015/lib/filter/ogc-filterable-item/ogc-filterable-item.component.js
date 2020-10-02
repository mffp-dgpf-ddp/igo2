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
        this.ogcFilterWriter = new OgcFilterWriter();
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
        /** @type {?} */
        const allowedOperators = this.ogcFilterWriter.computeAllowedOperators(this.datasource.options.sourceFields, firstFieldName, this.datasource.options.ogcFilters.allowedOperatorsType);
        /** @type {?} */
        const firstOperatorName = Object.keys(allowedOperators)[0];
        arr.push(this.ogcFilterWriter.addInterfaceFilter((/** @type {?} */ ({
            propertyName: firstFieldName,
            operator: firstOperatorName,
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
                ogcLayer.filters = this.ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
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
                template: "<mat-list-item>\r\n\r\n  <mat-icon\r\n    *ngIf=\"header\"\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse [target]=\"ogcFilters\"\r\n    [collapsed]=\"filtersCollapsed\"\r\n    (click)=\"toggleFiltersCollapsed()\"\r\n    svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 (click)=\"toggleLegendOnClick()\" *ngIf=\"header\" [ngStyle]=\"{'cursor': filtersCollapsed ? 'default' : 'pointer'}\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n    <span *ngIf=\"downloadable && header\">\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n        [color]=\"color\" (click)=\"openDownload()\">\r\n        <mat-icon svgIcon=\"download\"></mat-icon>\r\n      </button>\r\n    </span>\r\n    <button *ngIf=\"isAdvancedOgcFilters() && filtersAreEditable\" [disabled]=\"addFilterDisabled()\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n      <mat-icon svgIcon=\"plus\"></mat-icon>\r\n    </button>\r\n    <button *ngIf=\"!layer.visible && header\" mat-icon-button tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\" color=\"color\" (click)=\"setVisible()\">\r\n      <mat-icon svgIcon=\"eye-off\"></mat-icon>\r\n    </button>\r\n</mat-list-item>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n    <div *ngIf=\"header\" #legend class=\"igo-layer-legend-container\">\r\n      <igo-layer-legend *ngIf=\"showLegend$ | async\" [layer]=\"layer\">\r\n      </igo-layer-legend>\r\n    </div>\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filterable-form>\r\n\r\n  <section class=\"mat-typography\">\r\n  <mat-checkbox labelPosition='before' *ngIf=\"hasPushButton && filtersAreEditable\" (change)=\"changeOgcFilterType($event)\"\r\n    [(ngModel)]=\"datasource.options.ogcFilters.advancedOgcFilters\">\r\n    {{'igo.geo.filter.advancedOgcFilters' | translate}}\r\n  </mat-checkbox>\r\n</section>\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFTekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU92QyxNQUFNLE9BQU8sMEJBQTBCOzs7OztJQThCckMsWUFDVSxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFEaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUEvQm5DLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFakIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzlCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBUTFELFdBQU0sR0FBWSxJQUFJLENBQUM7UUFrQjlCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FB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IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgRG93bmxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZG93bmxvYWQvc2hhcmVkL2Rvd25sb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9uc1BhcmFtcyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dmcy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlLFxyXG4gIE9nY0ZpbHRlcnNPcHRpb25zLFxyXG4gIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnNcclxufSBmcm9tICcuLi9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPR0NGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL29nYy1maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyYWJsZS1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHByaXZhdGUgbGFzdFJ1bk9nY0ZpbHRlcjtcclxuICBwcml2YXRlIGRlZmF1bHRMb2dpY2FsUGFyZW50ID0gJ0FuZCc7XHJcbiAgcHVibGljIGhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSBmYWxzZTtcclxuICBwdWJsaWMgZmlsdGVyc0FyZUVkaXRhYmxlID0gdHJ1ZTtcclxuICBwdWJsaWMgZmlsdGVyc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgcHVibGljIGhhc1B1c2hCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzaG93TGVnZW5kJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgb2djRmlsdGVyV3JpdGVyO1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBoZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBnZXQgcmVmcmVzaEZ1bmMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoRmlsdGVycy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFzb3VyY2UoKTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIuZGF0YVNvdXJjZSBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIGdldCBkb3dubG9hZGFibGUoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkuZG93bmxvYWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgb2djRmlsdGVyU2VydmljZTogT0dDRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZG93bmxvYWRTZXJ2aWNlOiBEb3dubG9hZFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMub2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIGlmIChvZ2NGaWx0ZXJzLnB1c2hCdXR0b25zICYmIG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMuYnVuZGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChvZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb2djRmlsdGVycy5hZHZhbmNlZE9nY0ZpbHRlcnMgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmhhc1B1c2hCdXR0b24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAodGhpcy5kYXRhc291cmNlLm9wdGlvbnMudHlwZSkge1xyXG4gICAgICBjYXNlICd3bXMnOlxyXG4gICAgICAgIHRoaXMub2djRmlsdGVyU2VydmljZS5zZXRPZ2NXTVNGaWx0ZXJzT3B0aW9ucyh0aGlzLmRhdGFzb3VyY2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZnMnOlxyXG4gICAgICAgIHRoaXMub2djRmlsdGVyU2VydmljZS5zZXRPZ2NXRlNGaWx0ZXJzT3B0aW9ucyh0aGlzLmRhdGFzb3VyY2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZ2NGaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMpIHtcclxuICAgICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSBKU09OLnBhcnNlKFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkob2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgb2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZpbHRlcihmID0+IGYud2t0X2dlb21ldHJ5KS5sZW5ndGggPj0gMVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5oYXNBY3RpdmVTcGF0aWFsRmlsdGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlsdGVyc0FyZUVkaXRhYmxlID0gb2djRmlsdGVycy5lZGl0YWJsZVxyXG4gICAgICAgID8gb2djRmlsdGVycy5lZGl0YWJsZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRGaWx0ZXJUb1NlcXVlbmNlKCkge1xyXG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gZmFsc2U7XHJcbiAgICBjb25zdCBpbnRlcmZhY2VPZ2NGaWx0ZXJzOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zW10gPSB0aGlzLmRhdGFzb3VyY2VcclxuICAgICAgLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzO1xyXG4gICAgY29uc3QgYXJyID0gaW50ZXJmYWNlT2djRmlsdGVycyB8fCBbXTtcclxuICAgIGNvbnN0IGxhc3RMZXZlbCA9IGFyci5sZW5ndGggPT09IDAgPyAwIDogYXJyW2Fyci5sZW5ndGggLSAxXS5sZXZlbDtcclxuICAgIGxldCBmaXJzdEZpZWxkTmFtZSA9ICcnO1xyXG4gICAgY29uc3QgaW5jbHVkZWRGaWVsZHMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMuZmlsdGVyKGYgPT4gIWYuZXhjbHVkZUZyb21PZ2NGaWx0ZXJzKTtcclxuICAgIGlmIChpbmNsdWRlZEZpZWxkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZpcnN0RmllbGROYW1lID1cclxuICAgICAgICBpbmNsdWRlZEZpZWxkc1swXS5uYW1lID09PSB1bmRlZmluZWQgPyAnJyA6IGluY2x1ZGVkRmllbGRzWzBdLm5hbWU7XHJcbiAgICB9XHJcbiAgICBsZXQgZmllbGROYW1lR2VvbWV0cnk7XHJcbiAgICBjb25zdCBkYXRhc291cmNlT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZVxyXG4gICAgICAub3B0aW9ucyBhcyBXRlNEYXRhU291cmNlT3B0aW9uc1BhcmFtcztcclxuICAgIGlmIChkYXRhc291cmNlT3B0aW9ucy5maWVsZE5hbWVHZW9tZXRyeSkge1xyXG4gICAgICBmaWVsZE5hbWVHZW9tZXRyeSA9IGRhdGFzb3VyY2VPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTICYmXHJcbiAgICAgICh0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUy5maWVsZE5hbWVHZW9tZXRyeVxyXG4gICAgKSB7XHJcbiAgICAgIGZpZWxkTmFtZUdlb21ldHJ5ID0gKHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTXHJcbiAgICAgICAgLmZpZWxkTmFtZUdlb21ldHJ5O1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhdHVzID0gYXJyLmxlbmd0aCA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuICAgIGNvbnN0IGFsbG93ZWRPcGVyYXRvcnMgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5jb21wdXRlQWxsb3dlZE9wZXJhdG9ycyhcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzLFxyXG4gICAgICBmaXJzdEZpZWxkTmFtZSxcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hbGxvd2VkT3BlcmF0b3JzVHlwZSk7XHJcbiAgICBjb25zdCBmaXJzdE9wZXJhdG9yTmFtZSA9IE9iamVjdC5rZXlzKGFsbG93ZWRPcGVyYXRvcnMpWzBdO1xyXG5cclxuICAgIGFyci5wdXNoKFxyXG4gICAgICB0aGlzLm9nY0ZpbHRlcldyaXRlci5hZGRJbnRlcmZhY2VGaWx0ZXIoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiBmaXJzdEZpZWxkTmFtZSxcclxuICAgICAgICAgIG9wZXJhdG9yOiBmaXJzdE9wZXJhdG9yTmFtZSxcclxuICAgICAgICAgIGFjdGl2ZTogc3RhdHVzLFxyXG4gICAgICAgICAgaWdvU3BhdGlhbFNlbGVjdG9yOiAnZml4ZWRFeHRlbnQnLFxyXG4gICAgICAgICAgc3JzTmFtZTogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICB9IGFzIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsXHJcbiAgICAgICAgZmllbGROYW1lR2VvbWV0cnksXHJcbiAgICAgICAgbGFzdExldmVsLFxyXG4gICAgICAgIHRoaXMuZGVmYXVsdExvZ2ljYWxQYXJlbnRcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IGFycjtcclxuICB9XHJcblxyXG4gIG9wZW5Eb3dubG9hZCgpIHtcclxuICAgIHRoaXMuZG93bmxvYWRTZXJ2aWNlLm9wZW4odGhpcy5sYXllcik7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoRmlsdGVycyhmb3JjZT86IGJvb2xlYW4pIHtcclxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzOiBPZ2NGaWx0ZXJzT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gb2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZpbHRlcihcclxuICAgICAgZiA9PiBmLmFjdGl2ZSA9PT0gdHJ1ZVxyXG4gICAgKTtcclxuICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBvZ2NGaWx0ZXJzLmZpbHRlcnMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIG9nY0ZpbHRlcnMuZmlsdGVyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgYWN0aXZlRmlsdGVyc1swXS5wYXJlbnRMb2dpY2FsID0gYWN0aXZlRmlsdGVyc1sxXS5wYXJlbnRMb2dpY2FsO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICBhY3RpdmVGaWx0ZXJzLmZpbHRlcihcclxuICAgICAgICBhZiA9PiBbJ0NvbnRhaW5zJywgJ0ludGVyc2VjdHMnLCAnV2l0aGluJ10uaW5kZXhPZihhZi5vcGVyYXRvcikgIT09IC0xXHJcbiAgICAgICkubGVuZ3RoID09PSAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5oYXNBY3RpdmVTcGF0aWFsRmlsdGVyID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhhc0FjdGl2ZVNwYXRpYWxGaWx0ZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgIShKU09OLnN0cmluZ2lmeSh0aGlzLmxhc3RSdW5PZ2NGaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShhY3RpdmVGaWx0ZXJzKSlcclxuICAgICkge1xyXG4gICAgICBpZiAodGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ3dmcycpIHtcclxuICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgY29uc3Qgb2djTGF5ZXI6IE9nY0ZpbHRlcnNPcHRpb25zID0gb2djRGF0YVNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICAgICAgb2djTGF5ZXIuZmlsdGVycyA9IHRoaXMub2djRmlsdGVyV3JpdGVyLnJlYnVpbHRJZ29PZ2NGaWx0ZXJPYmplY3RGcm9tU2VxdWVuY2UoXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnd21zJyAmJlxyXG4gICAgICAgIG9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgcmVidWlsZEZpbHRlciA9ICcnO1xyXG4gICAgICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvZ2NEYXRhU291cmNlOiBhbnkgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICBjb25zdCBvZ2NMYXllcjogT2djRmlsdGVyc09wdGlvbnMgPSBvZ2NEYXRhU291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgICAgICAgIG9nY0xheWVyLmZpbHRlcnMgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5yZWJ1aWx0SWdvT2djRmlsdGVyT2JqZWN0RnJvbVNlcXVlbmNlKFxyXG4gICAgICAgICAgICBhY3RpdmVGaWx0ZXJzXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmVidWlsZEZpbHRlciA9IHRoaXMub2djRmlsdGVyV3JpdGVyLmJ1aWxkRmlsdGVyKFxyXG4gICAgICAgICAgICBvZ2NMYXllci5maWx0ZXJzLFxyXG4gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgKHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkuZmllbGROYW1lR2VvbWV0cnlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2djRmlsdGVyU2VydmljZS5maWx0ZXJCeU9nYyhcclxuICAgICAgICAgIHRoaXMuZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlLFxyXG4gICAgICAgICAgcmVidWlsZEZpbHRlclxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5maWx0ZXJlZCA9XHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXJzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5sYXN0UnVuT2djRmlsdGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhY3RpdmVGaWx0ZXJzKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZGVudGljYWwgZmlsdGVyLiBOb3RoaW5nIHRyaWdnZXJlZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZpc2libGUoKSB7XHJcbiAgICB0aGlzLmxheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzQWR2YW5jZWRPZ2NGaWx0ZXJzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuYWR2YW5jZWRPZ2NGaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEZpbHRlckRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgIXRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcyB8fFxyXG4gICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID09PSAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VPZ2NGaWx0ZXJzQWR2YW5jZWRPZ2NGaWx0ZXJzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmFkdmFuY2VkT2djRmlsdGVycyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlT2djRmlsdGVyVHlwZShpc0FkdmFuY2VkT2djRmlsdGVycykge1xyXG4gICAgdGhpcy5jaGFuZ2VPZ2NGaWx0ZXJzQWR2YW5jZWRPZ2NGaWx0ZXJzKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzLmNoZWNrZWQpO1xyXG4gICAgaWYgKGlzQWR2YW5jZWRPZ2NGaWx0ZXJzLmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoRmlsdGVycyh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlTGVnZW5kKGNvbGxhcHNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllci5sZWdlbmRDb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICB0aGlzLnNob3dMZWdlbmQkLm5leHQoIWNvbGxhcHNlZCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVMZWdlbmRPbkNsaWNrKCkge1xyXG4gICAgaWYgKCF0aGlzLmZpbHRlcnNDb2xsYXBzZWQpIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQodGhpcy5zaG93TGVnZW5kJC52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGaWx0ZXJzQ29sbGFwc2VkKCkge1xyXG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gIXRoaXMuZmlsdGVyc0NvbGxhcHNlZDtcclxuICB9XHJcbn1cclxuIl19