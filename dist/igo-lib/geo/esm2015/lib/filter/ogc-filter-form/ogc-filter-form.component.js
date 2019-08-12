/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import * as olstyle from 'ol/style';
import { OgcFilterWriter } from '../../filter/shared/ogc-filter';
import { WktService } from '../../wkt/shared/wkt.service';
import { IgoMap } from '../../map';
export class OgcFilterFormComponent {
    /**
     * @param {?} cdRef
     * @param {?} wktService
     */
    constructor(cdRef, wktService) {
        this.cdRef = cdRef;
        this.wktService = wktService;
        this._currentFilter = {};
        this.value = '';
        this.color = 'primary';
        this.snrc = '';
        this.baseOverlayName = 'ogcFilterOverlay_';
        this.ogcFilterWriter = new OgcFilterWriter();
        // TODO: Filter permitted operator based on wfscapabilities
        // Need to work on regex on XML capabilities because
        // comaparison operator's name varies between WFS servers...
        // Ex: IsNull vs PropertyIsNull vs IsNil ...
        this.operators = this.ogcFilterWriter.operators;
        this.igoSpatialSelectors = [
            {
                type: 'fixedExtent'
            },
            {
                type: 'snrc'
            }
        ];
        // TODO: selectFeature & drawFeature
    }
    /**
     * @return {?}
     */
    get datasource() {
        return this._dataSource;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set datasource(value) {
        this._dataSource = value;
        this.cdRef.detectChanges();
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
    get currentFilter() {
        return this._currentFilter;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentFilter(value) {
        this._currentFilter = value;
    }
    /**
     * @return {?}
     */
    get activeFilters() {
        this.updateField();
        return this.datasource.options.ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.active === true));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this.map) {
            this.activeFilters
                .filter((/**
             * @param {?} af
             * @return {?}
             */
            af => ['Contains', 'Intersects', 'Within'].indexOf(af.operator) !== -1))
                .forEach((/**
             * @param {?} activeFilterSpatial
             * @return {?}
             */
            activeFilterSpatial => {
                if (activeFilterSpatial.wkt_geometry) {
                    this.addWktAsOverlay(activeFilterSpatial.wkt_geometry, activeFilterSpatial.filterid, this.map.projection);
                }
            }));
        }
    }
    /**
     * @param {?=} init
     * @return {?}
     */
    updateField(init = true) {
        if (!this.datasource.options.sourceFields) {
            return;
        }
        this.fields = this.datasource.options.sourceFields.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            else if (a.name > b.name) {
                return 1;
            }
            else {
                return 0;
            }
        }));
        this.datasource.options.sourceFields
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === this.currentFilter.propertyName))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            this.values = element.values !== undefined ? element.values.sort() : [];
        }));
    }
    /**
     * @private
     * @param {?} wkt
     * @param {?} filterid
     * @param {?} projection
     * @return {?}
     */
    addWktAsOverlay(wkt, filterid, projection) {
        /** @type {?} */
        const wktAsFeature = this.wktService.wktToFeature(wkt, projection);
        wktAsFeature.setId(this.baseOverlayName + filterid);
        /** @type {?} */
        let opacity = 0;
        if (this.showFeatureOnMap) {
            opacity = 0.5;
        }
        /** @type {?} */
        const stroke = new olstyle.Stroke({
            width: 2,
            color: [125, 136, 140, opacity]
        });
        return new olstyle.Style({
            stroke,
            image: new olstyle.Circle({
                radius: 5,
                stroke
            })
        });
        this.map.overlay.addOlFeature(wktAsFeature);
    }
    /**
     * @param {?} event
     * @param {?} filter
     * @param {?} property
     * @return {?}
     */
    toggleFilterState(event, filter, property) {
        this.updateField();
        /** @type {?} */
        const mapProjection = this.map.projection;
        if (event.checked) {
            if (filter.wkt_geometry !== '') {
                this.addWktAsOverlay(filter.wkt_geometry, filter.filterid, mapProjection);
            }
            this.datasource.options.ogcFilters.interfaceOgcFilters
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.filterid === filter.filterid))
                .forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                element[property] = true;
            }));
        }
        else {
            this.removeOverlayByID(filter.filterid);
            this.datasource.options.ogcFilters.interfaceOgcFilters
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.filterid === filter.filterid))
                .forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                element[property] = false;
            }));
        }
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    deleteFilter(filter) {
        /** @type {?} */
        const ogcFilters = this.datasource.options.ogcFilters;
        ogcFilters.interfaceOgcFilters = ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.filterid !== filter.filterid));
        this.removeOverlayByID(filter.filterid);
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    changeNumericProperty(filter, property, value) {
        this.changeProperty(filter, property, parseFloat(value));
        this.refreshFilters();
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    removeOverlayByID(id) {
        /** @type {?} */
        const overlayId = this.baseOverlayName + id;
        if (this.map.overlay.dataSource.ol.getFeatureById(overlayId)) {
            this.map.overlay.dataSource.ol.removeFeature(this.map.overlay.dataSource.ol.getFeatureById(overlayId));
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    changeOperator(filter) {
        if (this.operators[filter.operator].spatial === false) {
            this.removeOverlayByID(filter.filterid);
        }
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    changeProperty(filter, property, value) {
        this.datasource.options.ogcFilters.interfaceOgcFilters
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.filterid === filter.filterid))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            element[property] = value;
        }));
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @param {?=} value
     * @return {?}
     */
    changeGeometry(filter, value) {
        /** @type {?} */
        const checkSNRC50k = /\d{2,3}[a-l][0,1][0-9]/gi;
        /** @type {?} */
        const checkSNRC250k = /\d{2,3}[a-p]/gi;
        /** @type {?} */
        const checkSNRC1m = /\d{2,3}/gi;
        /** @type {?} */
        const mapProjection = this.map.projection;
        this.removeOverlayByID(filter.filterid);
        this.datasource.options.ogcFilters.interfaceOgcFilters
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.filterid === filter.filterid))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            /** @type {?} */
            let wktPoly;
            if (filter.igoSpatialSelector === 'snrc') {
                if (value === '' && this.snrc !== '') {
                    wktPoly = this.wktService.snrcToWkt(this.snrc).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
                else if (value !== '' &&
                    (checkSNRC1m.test(value) ||
                        checkSNRC250k.test(value) ||
                        checkSNRC50k.test(value))) {
                    wktPoly = this.wktService.snrcToWkt(value).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
            }
            else if (filter.igoSpatialSelector === 'fixedExtent') {
                wktPoly = this.wktService.extentToWkt(mapProjection, this.map.getExtent(), mapProjection).wktPoly;
                element.wkt_geometry = wktPoly;
            }
            if (wktPoly) {
                this.addWktAsOverlay(wktPoly, filter.filterid, mapProjection);
            }
        }));
        this.refreshFilters();
    }
}
OgcFilterFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-form',
                template: "<mat-list-item>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\">\r\n    <mat-select class=\"logical\" [disabled]=\"!currentFilter.active\" (selectionChange)=\"refreshFilters()\" [(ngModel)]=\"currentFilter.parentLogical\"\r\n      *ngIf=\"activeFilters.indexOf(currentFilter) !== 0 && currentFilter.active===true\">\r\n      <mat-option value=\"And\">{{'igo.geo.operators.And' | translate}}</mat-option>\r\n      <mat-option value=\"Or\">{{'igo.geo.operators.Or' | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <span *ngIf=\"fields && fields.length > 0 && fields[0].name !== ''\">\r\n      <mat-select [disabled]=\"!currentFilter.active\" *ngIf=\"['Contains','Intersects','Within'].indexOf(currentFilter.operator) === -1\"\r\n        [(ngModel)]=\"currentFilter.propertyName\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.sourceFields.selectField' | translate\"\r\n        (selectionChange)=\"updateField(false)\">\r\n        <mat-option *ngFor=\"let field of fields\" [value]=\"field.name\">{{field.alias}}</mat-option>\r\n      </mat-select>\r\n    </span>\r\n    <span *ngIf=\"fields && fields.length === 1 && fields[0].name === ''\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput #fieldPerUser (keyup)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\"\r\n          (blur)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\" [(ngModel)]=\"currentFilter.propertyName\">\r\n\r\n        <button mat-button *ngIf=\"currentFilter.propertyName\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.propertyName=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of operators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n\r\n    <!-- PropertyIsEqualTo -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsEqualTo' || currentFilter.operator === 'PropertyIsNotEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionequalto (keyup)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsEqualTo  -->\r\n\r\n\r\n    <!-- PropertyIsLike  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsLike'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #pattern (keyup)=\"changeProperty(currentFilter,'pattern',pattern.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'pattern',pattern.value)\" [ngModel]=\"currentFilter.pattern\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.pattern\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.pattern=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsLike  -->\r\n\r\n    <!-- PropertyIsNull  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsNull'\"></span>\r\n    <!-- PropertyIsNull  -->\r\n\r\n    <!-- PropertyIs_Than  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsGreaterThan' || currentFilter.operator === 'PropertyIsGreaterThanOrEqualTo' || currentFilter.operator === 'PropertyIsLessThan' || currentFilter.operator === 'PropertyIsLessThanOrEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionthan type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n    </span>\r\n    <!-- PropertyIs_Than  -->\r\n\r\n\r\n    <!-- PropertyIsBetween -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsBetween'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #lowerBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\" [ngModel]=\"currentFilter.lowerBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.lowerBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.lowerBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #upperBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\" [ngModel]=\"currentFilter.upperBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.upperBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.upperBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsBetween  -->\r\n\r\n\r\n    <!-- During -->\r\n    <span *ngIf=\"currentFilter.operator === 'During'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #begin (keyup)=\"changeProperty(currentFilter,'begin',begin.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'begin',begin.value)\" [ngModel]=\"currentFilter.begin\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values \" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.begin\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.begin=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #end (keyup)=\"changeProperty(currentFilter,'end',end.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'end',end.value)\" [ngModel]=\"currentFilter.end\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.end\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.end=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n\r\n    </span>\r\n    <!-- During  -->\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n\r\n\r\n  <!-- PropertySpatial  -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of operators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.igoSpatialSelector\" (selectionChange)=\"changeGeometry(currentFilter,value)\">\r\n      <mat-option *ngFor=\"let igoSpatialSelector of igoSpatialSelectors\" [value]=\"igoSpatialSelector.type\">{{('igo.geo.spatialSelector.'+ igoSpatialSelector.type) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <button mat-button [disabled]=\"!currentFilter.active\" *ngIf=\"currentFilter.igoSpatialSelector === 'fixedExtent'\"\r\n      matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"changeGeometry(currentFilter,value)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.spatialSelector.btnSetExtent' | translate\">\r\n      <mat-icon svgIcon=\"zoom-out_map\"></mat-icon>\r\n    </button>\r\n\r\n\r\n    <mat-form-field *ngIf=\"currentFilter.igoSpatialSelector === 'snrc'\">\r\n      <input matInput #htmlSnrc (keyup)=\"changeGeometry(currentFilter,htmlSnrc.value)\" (blur)=\"changeGeometry(currentFilter,htmlSnrc.value)\"\r\n        [(ngModel)]=\"snrc\">\r\n      <button mat-button *ngIf=\"snrc\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"snrc=''\">\r\n        <mat-icon svgIcon=\"close\"></mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- PropertySpatial  -->\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <mat-slide-toggle class=\"example-margin\" (change)=\"toggleFilterState($event,currentFilter,'active')\" tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"currentFilter.active\"\r\n        [disabled]=\"disabled\">\r\n      </mat-slide-toggle>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.removeFilter' | translate\"\r\n        color=\"warn\" (click)=\"deleteFilter(currentFilter)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <mat-divider></mat-divider>\r\n</mat-list-item>\r\n",
                styles: [":host{overflow:hidden}.mat-list-item{height:auto}.mat-list-item>>>div.mat-list-item-content{display:inline-table}.logical{font-weight:700}input,mat-select{margin-top:10px;text-align:center}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-button-group{float:center;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
OgcFilterFormComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: WktService }
];
OgcFilterFormComponent.propDecorators = {
    refreshFilters: [{ type: Input }],
    datasource: [{ type: Input }],
    showFeatureOnMap: [{ type: Input }],
    map: [{ type: Input }],
    currentFilter: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype.ogcFilterWriter;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype._dataSource;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype._currentFilter;
    /** @type {?} */
    OgcFilterFormComponent.prototype.operators;
    /** @type {?} */
    OgcFilterFormComponent.prototype.igoSpatialSelectors;
    /** @type {?} */
    OgcFilterFormComponent.prototype.value;
    /** @type {?} */
    OgcFilterFormComponent.prototype.inputOperator;
    /** @type {?} */
    OgcFilterFormComponent.prototype.fields;
    /** @type {?} */
    OgcFilterFormComponent.prototype.values;
    /** @type {?} */
    OgcFilterFormComponent.prototype.color;
    /** @type {?} */
    OgcFilterFormComponent.prototype.snrc;
    /** @type {?} */
    OgcFilterFormComponent.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype._map;
    /** @type {?} */
    OgcFilterFormComponent.prototype.baseOverlayName;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype._showFeatureOnMap;
    /** @type {?} */
    OgcFilterFormComponent.prototype.refreshFilters;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype.wktService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci1mb3JtL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQU9wQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPbkMsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUE0RGpDLFlBQ1UsS0FBd0IsRUFDeEIsVUFBc0I7UUFEdEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTNEeEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFHMUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUlYLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDbEIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUdWLG9CQUFlLEdBQUcsbUJBQW1CLENBQUM7UUFrRDNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM3QywyREFBMkQ7UUFDM0Qsb0RBQW9EO1FBQ3BELDREQUE0RDtRQUM1RCw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekI7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7YUFDcEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0Ys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Z0I7Ozs7O0lBQ2hCLHNDQUFxQjs7SUFDckIsaURBQTZDOzs7OztJQUM3QyxtREFBbUM7O0lBR25DLGdEQUFrQzs7Ozs7SUEyQ2hDLHVDQUFnQzs7Ozs7SUFDaEMsNENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsXHJcbiAgT2djRmlsdGVyYWJsZURhdGFTb3VyY2UsXHJcbiAgT2djRmlsdGVyc09wdGlvbnNcclxufSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgV2t0U2VydmljZSB9IGZyb20gJy4uLy4uL3drdC9zaGFyZWQvd2t0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlci1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZ2MtZmlsdGVyLWZvcm0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gIHByaXZhdGUgb2djRmlsdGVyV3JpdGVyOiBPZ2NGaWx0ZXJXcml0ZXI7XHJcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcbiAgcHJpdmF0ZSBfY3VycmVudEZpbHRlcjogYW55ID0ge307XHJcbiAgcHVibGljIG9wZXJhdG9ycztcclxuICBwdWJsaWMgaWdvU3BhdGlhbFNlbGVjdG9ycztcclxuICBwdWJsaWMgdmFsdWUgPSAnJztcclxuICBwdWJsaWMgaW5wdXRPcGVyYXRvcjtcclxuICBwdWJsaWMgZmllbGRzOiBhbnlbXTtcclxuICBwdWJsaWMgdmFsdWVzOiBhbnlbXTtcclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHVibGljIHNucmMgPSAnJztcclxuICBwdWJsaWMgZGlzYWJsZWQ7XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcbiAgcHVibGljIGJhc2VPdmVybGF5TmFtZSA9ICdvZ2NGaWx0ZXJPdmVybGF5Xyc7XHJcbiAgcHJpdmF0ZSBfc2hvd0ZlYXR1cmVPbk1hcDogYm9vbGVhbjtcclxuXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xyXG4gIEBJbnB1dCgpIHJlZnJlc2hGaWx0ZXJzOiBGdW5jdGlvbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGF0YXNvdXJjZSgpOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcclxuICB9XHJcbiAgc2V0IGRhdGFzb3VyY2UodmFsdWU6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlKSB7XHJcbiAgICB0aGlzLl9kYXRhU291cmNlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dGZWF0dXJlT25NYXAoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0ZlYXR1cmVPbk1hcDtcclxuICB9XHJcbiAgc2V0IHNob3dGZWF0dXJlT25NYXAodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dGZWF0dXJlT25NYXAgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGN1cnJlbnRGaWx0ZXIoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RmlsdGVyO1xyXG4gIH1cclxuICBzZXQgY3VycmVudEZpbHRlcih2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLl9jdXJyZW50RmlsdGVyID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlRmlsdGVycygpIHtcclxuICAgIHRoaXMudXBkYXRlRmllbGQoKTtcclxuICAgIHJldHVybiB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuYWN0aXZlID09PSB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgd2t0U2VydmljZTogV2t0U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5vZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XHJcbiAgICAvLyBUT0RPOiBGaWx0ZXIgcGVybWl0dGVkIG9wZXJhdG9yIGJhc2VkIG9uIHdmc2NhcGFiaWxpdGllc1xyXG4gICAgLy8gTmVlZCB0byB3b3JrIG9uIHJlZ2V4IG9uIFhNTCBjYXBhYmlsaXRpZXMgYmVjYXVzZVxyXG4gICAgLy8gY29tYXBhcmlzb24gb3BlcmF0b3IncyBuYW1lIHZhcmllcyBiZXR3ZWVuIFdGUyBzZXJ2ZXJzLi4uXHJcbiAgICAvLyBFeDogSXNOdWxsIHZzIFByb3BlcnR5SXNOdWxsIHZzIElzTmlsIC4uLlxyXG4gICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5vcGVyYXRvcnM7XHJcbiAgICB0aGlzLmlnb1NwYXRpYWxTZWxlY3RvcnMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnZml4ZWRFeHRlbnQnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnc25yYydcclxuICAgICAgfVxyXG4gICAgXTtcclxuICAgIC8vIFRPRE86IHNlbGVjdEZlYXR1cmUgJiBkcmF3RmVhdHVyZVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgaWYgKHRoaXMubWFwKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlRmlsdGVyc1xyXG4gICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICBhZiA9PiBbJ0NvbnRhaW5zJywgJ0ludGVyc2VjdHMnLCAnV2l0aGluJ10uaW5kZXhPZihhZi5vcGVyYXRvcikgIT09IC0xXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5mb3JFYWNoKGFjdGl2ZUZpbHRlclNwYXRpYWwgPT4ge1xyXG4gICAgICAgICAgaWYgKGFjdGl2ZUZpbHRlclNwYXRpYWwud2t0X2dlb21ldHJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkV2t0QXNPdmVybGF5KFxyXG4gICAgICAgICAgICAgIGFjdGl2ZUZpbHRlclNwYXRpYWwud2t0X2dlb21ldHJ5LFxyXG4gICAgICAgICAgICAgIGFjdGl2ZUZpbHRlclNwYXRpYWwuZmlsdGVyaWQsXHJcbiAgICAgICAgICAgICAgdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRmllbGQoaW5pdCA9IHRydWUpIHtcclxuICAgIGlmICghdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZmllbGRzID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfSBlbHNlIGlmIChhLm5hbWUgPiBiLm5hbWUpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHNcclxuICAgICAgLmZpbHRlcihmID0+IGYubmFtZSA9PT0gdGhpcy5jdXJyZW50RmlsdGVyLnByb3BlcnR5TmFtZSlcclxuICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBlbGVtZW50LnZhbHVlcyAhPT0gdW5kZWZpbmVkID8gZWxlbWVudC52YWx1ZXMuc29ydCgpIDogW107XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRXa3RBc092ZXJsYXkod2t0LCBmaWx0ZXJpZCwgcHJvamVjdGlvbikge1xyXG4gICAgY29uc3Qgd2t0QXNGZWF0dXJlID0gdGhpcy53a3RTZXJ2aWNlLndrdFRvRmVhdHVyZSh3a3QsIHByb2plY3Rpb24pO1xyXG4gICAgd2t0QXNGZWF0dXJlLnNldElkKHRoaXMuYmFzZU92ZXJsYXlOYW1lICsgZmlsdGVyaWQpO1xyXG4gICAgbGV0IG9wYWNpdHkgPSAwO1xyXG4gICAgaWYgKHRoaXMuc2hvd0ZlYXR1cmVPbk1hcCkge1xyXG4gICAgICBvcGFjaXR5ID0gMC41O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0cm9rZSA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgIHdpZHRoOiAyLFxyXG4gICAgICBjb2xvcjogWzEyNSwgMTM2LCAxNDAsIG9wYWNpdHldXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICBzdHJva2UsXHJcbiAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgIHJhZGl1czogNSxcclxuICAgICAgICBzdHJva2VcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwLm92ZXJsYXkuYWRkT2xGZWF0dXJlKHdrdEFzRmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGaWx0ZXJTdGF0ZShldmVudCwgZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLCBwcm9wZXJ0eSkge1xyXG4gICAgdGhpcy51cGRhdGVGaWVsZCgpO1xyXG4gICAgY29uc3QgbWFwUHJvamVjdGlvbiA9IHRoaXMubWFwLnByb2plY3Rpb247XHJcbiAgICBpZiAoZXZlbnQuY2hlY2tlZCkge1xyXG4gICAgICBpZiAoZmlsdGVyLndrdF9nZW9tZXRyeSAhPT0gJycpIHtcclxuICAgICAgICB0aGlzLmFkZFdrdEFzT3ZlcmxheShcclxuICAgICAgICAgIGZpbHRlci53a3RfZ2VvbWV0cnksXHJcbiAgICAgICAgICBmaWx0ZXIuZmlsdGVyaWQsXHJcbiAgICAgICAgICBtYXBQcm9qZWN0aW9uXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgICAuZmlsdGVyKGYgPT4gZi5maWx0ZXJpZCA9PT0gZmlsdGVyLmZpbHRlcmlkKVxyXG4gICAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVPdmVybGF5QnlJRChmaWx0ZXIuZmlsdGVyaWQpO1xyXG4gICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgICAuZmlsdGVyKGYgPT4gZi5maWx0ZXJpZCA9PT0gZmlsdGVyLmZpbHRlcmlkKVxyXG4gICAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbHRlcihmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnM6IE9nY0ZpbHRlcnNPcHRpb25zID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycy5maWx0ZXIoXHJcbiAgICAgIGYgPT4gZi5maWx0ZXJpZCAhPT0gZmlsdGVyLmZpbHRlcmlkXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZW1vdmVPdmVybGF5QnlJRChmaWx0ZXIuZmlsdGVyaWQpO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU51bWVyaWNQcm9wZXJ0eShmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5jaGFuZ2VQcm9wZXJ0eShmaWx0ZXIsIHByb3BlcnR5LCBwYXJzZUZsb2F0KHZhbHVlKSk7XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZU92ZXJsYXlCeUlEKGlkKSB7XHJcbiAgICBjb25zdCBvdmVybGF5SWQgPSB0aGlzLmJhc2VPdmVybGF5TmFtZSArIGlkO1xyXG4gICAgaWYgKHRoaXMubWFwLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChvdmVybGF5SWQpKSB7XHJcbiAgICAgIHRoaXMubWFwLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKFxyXG4gICAgICAgIHRoaXMubWFwLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChvdmVybGF5SWQpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VPcGVyYXRvcihmaWx0ZXIpIHtcclxuICAgIGlmICh0aGlzLm9wZXJhdG9yc1tmaWx0ZXIub3BlcmF0b3JdLnNwYXRpYWwgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVByb3BlcnR5KGZpbHRlcjogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucywgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VHZW9tZXRyeShmaWx0ZXIsIHZhbHVlPykge1xyXG4gICAgY29uc3QgY2hlY2tTTlJDNTBrID0gL1xcZHsyLDN9W2EtbF1bMCwxXVswLTldL2dpO1xyXG4gICAgY29uc3QgY2hlY2tTTlJDMjUwayA9IC9cXGR7MiwzfVthLXBdL2dpO1xyXG4gICAgY29uc3QgY2hlY2tTTlJDMW0gPSAvXFxkezIsM30vZ2k7XHJcbiAgICBjb25zdCBtYXBQcm9qZWN0aW9uID0gdGhpcy5tYXAucHJvamVjdGlvbjtcclxuICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVyc1xyXG4gICAgICAuZmlsdGVyKGYgPT4gZi5maWx0ZXJpZCA9PT0gZmlsdGVyLmZpbHRlcmlkKVxyXG4gICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBsZXQgd2t0UG9seTtcclxuICAgICAgICBpZiAoZmlsdGVyLmlnb1NwYXRpYWxTZWxlY3RvciA9PT0gJ3NucmMnKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnICYmIHRoaXMuc25yYyAhPT0gJycpIHtcclxuICAgICAgICAgICAgd2t0UG9seSA9IHRoaXMud2t0U2VydmljZS5zbnJjVG9Xa3QodGhpcy5zbnJjKS53a3RQb2x5O1xyXG4gICAgICAgICAgICBlbGVtZW50LndrdF9nZW9tZXRyeSA9IHdrdFBvbHk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICB2YWx1ZSAhPT0gJycgJiZcclxuICAgICAgICAgICAgKGNoZWNrU05SQzFtLnRlc3QodmFsdWUpIHx8XHJcbiAgICAgICAgICAgICAgY2hlY2tTTlJDMjUway50ZXN0KHZhbHVlKSB8fFxyXG4gICAgICAgICAgICAgIGNoZWNrU05SQzUway50ZXN0KHZhbHVlKSlcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB3a3RQb2x5ID0gdGhpcy53a3RTZXJ2aWNlLnNucmNUb1drdCh2YWx1ZSkud2t0UG9seTtcclxuICAgICAgICAgICAgZWxlbWVudC53a3RfZ2VvbWV0cnkgPSB3a3RQb2x5O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmlnb1NwYXRpYWxTZWxlY3RvciA9PT0gJ2ZpeGVkRXh0ZW50Jykge1xyXG4gICAgICAgICAgd2t0UG9seSA9IHRoaXMud2t0U2VydmljZS5leHRlbnRUb1drdChcclxuICAgICAgICAgICAgbWFwUHJvamVjdGlvbixcclxuICAgICAgICAgICAgdGhpcy5tYXAuZ2V0RXh0ZW50KCksXHJcbiAgICAgICAgICAgIG1hcFByb2plY3Rpb25cclxuICAgICAgICAgICkud2t0UG9seTtcclxuICAgICAgICAgIGVsZW1lbnQud2t0X2dlb21ldHJ5ID0gd2t0UG9seTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdrdFBvbHkpIHtcclxuICAgICAgICAgIHRoaXMuYWRkV2t0QXNPdmVybGF5KHdrdFBvbHksIGZpbHRlci5maWx0ZXJpZCwgbWFwUHJvamVjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcbn1cclxuIl19