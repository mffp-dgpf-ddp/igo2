/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { OgcFilterWriter } from '../../filter/shared/ogc-filter';
import { WktService } from '../../wkt/shared/wkt.service';
import { IgoMap } from '../../map';
import { OgcFilterOperatorType } from '../../filter/shared/ogc-filter.enum';
export class OgcFilterFormComponent {
    /**
     * @param {?} wktService
     */
    constructor(wktService) {
        this.wktService = wktService;
        this.value = '';
        this.color = 'primary';
        this.snrc = '';
        this.baseOverlayName = 'ogcFilterOverlay_';
        this.floatLabel = 'never';
        // TODO: Filter permitted operator based on wfscapabilities
        // Need to work on regex on XML capabilities because
        // comaparison operator's name varies between WFS servers...
        // Ex: IsNull vs PropertyIsNull vs IsNil ...
        this.ogcFilterOperators = new OgcFilterWriter().operators;
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
    ngOnInit() {
        this.computeAllowedOperators();
    }
    /**
     * @return {?}
     */
    computeAllowedOperators() {
        /** @type {?} */
        let allowedOperators = this.datasource.options.ogcFilters.allowedOperatorsType;
        /** @type {?} */
        let effectiveOperators = {};
        if (!allowedOperators) {
            allowedOperators = OgcFilterOperatorType.BasicAndSpatial;
        }
        switch (allowedOperators.toLowerCase()) {
            case 'all':
                effectiveOperators = this.ogcFilterOperators;
                break;
            case 'spatial':
                effectiveOperators = {
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
                break;
            case 'basicandspatial':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
                break;
            case 'basic':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] }
                };
                break;
            case 'basicnumeric':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsGreaterThan: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsGreaterThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsLessThan: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsLessThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
                };
                break;
            default:
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
        }
        this.ogcFilterOperators = effectiveOperators;
    }
    /**
     * @return {?}
     */
    updateField() {
        if (!this.datasource.options.sourceFields) {
            return;
        }
        this.fields = this.datasource.options.sourceFields
            .filter((/**
         * @param {?} sf
         * @return {?}
         */
        sf => (sf.excludeFromOgcFilters === undefined || !sf.excludeFromOgcFilters)));
        this.fields.filter((/**
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
     * @param {?} event
     * @param {?} filter
     * @param {?} property
     * @return {?}
     */
    toggleFilterState(event, filter, property) {
        this.updateField();
        if (event.checked) {
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
        if (this.ogcFilterOperators[filter.operator].spatial === false) {
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
                    wktPoly = this.wktService.snrcToWkt(this.snrc, this.map.projection).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
                else if (value !== '' &&
                    (checkSNRC1m.test(value) ||
                        checkSNRC250k.test(value) ||
                        checkSNRC50k.test(value))) {
                    wktPoly = this.wktService.snrcToWkt(value, this.map.projection).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
            }
            else if (filter.igoSpatialSelector === 'fixedExtent') {
                wktPoly = this.wktService.extentToWkt(mapProjection, this.map.viewController.getExtent(), mapProjection).wktPoly;
                element.wkt_geometry = wktPoly;
            }
        }));
        this.refreshFilters();
    }
}
OgcFilterFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-form',
                template: "<mat-list-item class=\"mat-typography\">\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\">\r\n    <mat-select class=\"logical\" [disabled]=\"!currentFilter.active\" (selectionChange)=\"refreshFilters()\" [(ngModel)]=\"currentFilter.parentLogical\"\r\n      *ngIf=\"activeFilters.indexOf(currentFilter) !== 0 && currentFilter.active===true\">\r\n      <mat-option value=\"And\">{{'igo.geo.operators.And' | translate}}</mat-option>\r\n      <mat-option value=\"Or\">{{'igo.geo.operators.Or' | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <span *ngIf=\"fields && fields.length > 0 && fields[0].name !== ''\">\r\n      <mat-select [disabled]=\"!currentFilter.active\" *ngIf=\"['Contains','Intersects','Within'].indexOf(currentFilter.operator) === -1\"\r\n        [(ngModel)]=\"currentFilter.propertyName\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.sourceFields.selectField' | translate\"\r\n        (selectionChange)=\"updateField()\">\r\n        <mat-option *ngFor=\"let field of fields\" [value]=\"field.name\">{{field.alias}}</mat-option>\r\n      </mat-select>\r\n    </span>\r\n    <span *ngIf=\"fields && fields.length === 1 && fields[0].name === ''\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput #fieldPerUser (keyup)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\"\r\n          (blur)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\" [(ngModel)]=\"currentFilter.propertyName\">\r\n\r\n        <button mat-button *ngIf=\"currentFilter.propertyName\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.propertyName=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <mat-select \r\n    tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.selectOperator' | translate\"\r\n    [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n\r\n    <!-- PropertyIsEqualTo -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsEqualTo' || currentFilter.operator === 'PropertyIsNotEqualTo'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionequalto (keyup)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsEqualTo  -->\r\n\r\n\r\n    <!-- PropertyIsLike  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsLike'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #pattern (keyup)=\"changeProperty(currentFilter,'pattern',pattern.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'pattern',pattern.value)\" [ngModel]=\"currentFilter.pattern\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.pattern\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.pattern=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsLike  -->\r\n\r\n    <!-- PropertyIsNull  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsNull'\"></span>\r\n    <!-- PropertyIsNull  -->\r\n\r\n    <!-- PropertyIs_Than  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsGreaterThan' || currentFilter.operator === 'PropertyIsGreaterThanOrEqualTo' || currentFilter.operator === 'PropertyIsLessThan' || currentFilter.operator === 'PropertyIsLessThanOrEqualTo'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionthan type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n    </span>\r\n    <!-- PropertyIs_Than  -->\r\n\r\n\r\n    <!-- PropertyIsBetween -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsBetween'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #lowerBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\" [ngModel]=\"currentFilter.lowerBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.lowerBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.lowerBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #upperBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\" [ngModel]=\"currentFilter.upperBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.upperBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.upperBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsBetween  -->\r\n\r\n\r\n    <!-- During -->\r\n    <span *ngIf=\"currentFilter.operator === 'During'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #begin (keyup)=\"changeProperty(currentFilter,'begin',begin.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'begin',begin.value)\" [ngModel]=\"currentFilter.begin\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values \" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.begin\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.begin=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #end (keyup)=\"changeProperty(currentFilter,'end',end.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'end',end.value)\" [ngModel]=\"currentFilter.end\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.end\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.end=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n\r\n    </span>\r\n    <!-- During  -->\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n\r\n\r\n  <!-- PropertySpatial  -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select  \r\n      matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.selectOperator' | translate\" tooltip-position=\"below\"\r\n      [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.igoSpatialSelector\" (selectionChange)=\"changeGeometry(currentFilter,value)\">\r\n      <mat-option *ngFor=\"let igoSpatialSelector of igoSpatialSelectors\" [value]=\"igoSpatialSelector.type\">{{('igo.geo.spatialSelector.'+ igoSpatialSelector.type) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <button mat-button [disabled]=\"!currentFilter.active\" *ngIf=\"currentFilter.igoSpatialSelector === 'fixedExtent'\"\r\n      matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"changeGeometry(currentFilter,value)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.spatialSelector.btnSetExtent' | translate\">\r\n      <mat-icon svgIcon=\"arrow-expand-all\"></mat-icon>\r\n    </button>\r\n\r\n\r\n    <mat-form-field *ngIf=\"currentFilter.igoSpatialSelector === 'snrc'\" [floatLabel]=\"floatLabel\">\r\n      <input [placeholder]=\"'igo.geo.filter.placeholderSnrc' | translate\" matInput #htmlSnrc (keyup)=\"changeGeometry(currentFilter,htmlSnrc.value)\" (blur)=\"changeGeometry(currentFilter,htmlSnrc.value)\"\r\n        [(ngModel)]=\"snrc\">\r\n      <button mat-button *ngIf=\"snrc\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"snrc=''\">\r\n        <mat-icon svgIcon=\"close\"></mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- PropertySpatial  -->\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <mat-slide-toggle class=\"example-margin\" (change)=\"toggleFilterState($event,currentFilter,'active')\" tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"currentFilter.active\"\r\n        [disabled]=\"disabled\">\r\n      </mat-slide-toggle>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.removeFilter' | translate\"\r\n        color=\"warn\" (click)=\"deleteFilter(currentFilter)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <mat-divider></mat-divider>\r\n</mat-list-item>\r\n",
                styles: [":host{overflow:hidden}.mat-list-item{height:auto}.mat-form-field{width:100%}.mat-list-item>>>div.mat-list-item-content{display:inline-table;width:100%}.logical{font-weight:700}input,mat-select{margin-top:10px;text-align:center}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-button-group{float:center;padding:0 3px}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
OgcFilterFormComponent.ctorParameters = () => [
    { type: WktService }
];
OgcFilterFormComponent.propDecorators = {
    refreshFilters: [{ type: Input }],
    datasource: [{ type: Input }],
    map: [{ type: Input }],
    currentFilter: [{ type: Input }],
    floatLabel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    OgcFilterFormComponent.prototype.ogcFilterOperators;
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
    /** @type {?} */
    OgcFilterFormComponent.prototype.baseOverlayName;
    /** @type {?} */
    OgcFilterFormComponent.prototype.refreshFilters;
    /** @type {?} */
    OgcFilterFormComponent.prototype.datasource;
    /** @type {?} */
    OgcFilterFormComponent.prototype.map;
    /** @type {?} */
    OgcFilterFormComponent.prototype.currentFilter;
    /** @type {?} */
    OgcFilterFormComponent.prototype.floatLabel;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype.wktService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci1mb3JtL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQVE1RSxNQUFNLE9BQU8sc0JBQXNCOzs7O0lBNkJqQyxZQUNVLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUEzQnpCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFJWCxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixvQkFBZSxHQUFHLG1CQUFtQixDQUFDO1FBVXBDLGVBQVUsR0FBbUIsT0FBTyxDQUFDO1FBWTVDLDJEQUEyRDtRQUMzRCxvREFBb0Q7UUFDcEQsNERBQTREO1FBQzVELDRDQUE0QztRQUM1QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQ3pCO2dCQUNFLElBQUksRUFBRSxhQUFhO2FBQ3BCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGLENBQUM7UUFDRixvQ0FBb0M7SUFDdEMsQ0FBQzs7OztJQXhCRCxJQUFJLGFBQWE7UUFDZixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTyxJ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QkFDeEUsT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7aUJBQ2hDO2FBQ0Y7aUJBQU0sSUFBSSxNQUFNLENBQUMsa0JBQWtCLEtBQUssYUFBYSxFQUFFO2dCQUN0RCxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQ25DLGFBQWEsRUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFDbkMsYUFBYSxDQUNkLENBQUMsT0FBTyxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBdk5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiw4M2JBQStDOzthQUVoRDs7OztZQVRRLFVBQVU7Ozs2QkFzQmhCLEtBQUs7eUJBRUwsS0FBSztrQkFFTCxLQUFLOzRCQUVMLEtBQUs7eUJBRUwsS0FBSzs7OztJQW5CTixvREFBMEI7O0lBQzFCLHFEQUEyQjs7SUFDM0IsdUNBQWtCOztJQUNsQiwrQ0FBcUI7O0lBQ3JCLHdDQUFxQjs7SUFDckIsd0NBQXFCOztJQUNyQix1Q0FBeUI7O0lBQ3pCLHNDQUFpQjs7SUFDakIsMENBQWdCOztJQUNoQixpREFBNkM7O0lBRTdDLGdEQUFvQzs7SUFFcEMsNENBQTZDOztJQUU3QyxxQ0FBcUI7O0lBRXJCLCtDQUE0Qjs7SUFFNUIsNENBQThDOzs7OztJQVU1Qyw0Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSxcclxuICBPZ2NGaWx0ZXJzT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBXa3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd2t0L3NoYXJlZC93a3Quc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlck9wZXJhdG9yVHlwZSB9IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5lbnVtJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgb2djRmlsdGVyT3BlcmF0b3JzO1xyXG4gIHB1YmxpYyBpZ29TcGF0aWFsU2VsZWN0b3JzO1xyXG4gIHB1YmxpYyB2YWx1ZSA9ICcnO1xyXG4gIHB1YmxpYyBpbnB1dE9wZXJhdG9yO1xyXG4gIHB1YmxpYyBmaWVsZHM6IGFueVtdO1xyXG4gIHB1YmxpYyB2YWx1ZXM6IGFueVtdO1xyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuICBwdWJsaWMgc25yYyA9ICcnO1xyXG4gIHB1YmxpYyBkaXNhYmxlZDtcclxuICBwdWJsaWMgYmFzZU92ZXJsYXlOYW1lID0gJ29nY0ZpbHRlck92ZXJsYXlfJztcclxuXHJcbiAgQElucHV0KCkgcmVmcmVzaEZpbHRlcnM6ICgpID0+IHZvaWQ7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGFzb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KCkgY3VycmVudEZpbHRlcjogYW55O1xyXG5cclxuICBASW5wdXQoKSBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICduZXZlcic7XHJcblxyXG4gIGdldCBhY3RpdmVGaWx0ZXJzKCkge1xyXG4gICAgdGhpcy51cGRhdGVGaWVsZCgpO1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycy5maWx0ZXIoXHJcbiAgICAgIGYgPT4gZi5hY3RpdmUgPT09IHRydWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgd2t0U2VydmljZTogV2t0U2VydmljZVxyXG4gICkge1xyXG4gICAgLy8gVE9ETzogRmlsdGVyIHBlcm1pdHRlZCBvcGVyYXRvciBiYXNlZCBvbiB3ZnNjYXBhYmlsaXRpZXNcclxuICAgIC8vIE5lZWQgdG8gd29yayBvbiByZWdleCBvbiBYTUwgY2FwYWJpbGl0aWVzIGJlY2F1c2VcclxuICAgIC8vIGNvbWFwYXJpc29uIG9wZXJhdG9yJ3MgbmFtZSB2YXJpZXMgYmV0d2VlbiBXRlMgc2VydmVycy4uLlxyXG4gICAgLy8gRXg6IElzTnVsbCB2cyBQcm9wZXJ0eUlzTnVsbCB2cyBJc05pbCAuLi5cclxuICAgIHRoaXMub2djRmlsdGVyT3BlcmF0b3JzID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpLm9wZXJhdG9ycztcclxuICAgIHRoaXMuaWdvU3BhdGlhbFNlbGVjdG9ycyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6ICdmaXhlZEV4dGVudCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6ICdzbnJjJ1xyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gICAgLy8gVE9ETzogc2VsZWN0RmVhdHVyZSAmIGRyYXdGZWF0dXJlXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY29tcHV0ZUFsbG93ZWRPcGVyYXRvcnMoKTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVBbGxvd2VkT3BlcmF0b3JzKCkge1xyXG4gICAgbGV0IGFsbG93ZWRPcGVyYXRvcnMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmFsbG93ZWRPcGVyYXRvcnNUeXBlO1xyXG4gICAgbGV0IGVmZmVjdGl2ZU9wZXJhdG9yczoge30gPSB7fTtcclxuXHJcbiAgICBpZiAoIWFsbG93ZWRPcGVyYXRvcnMpICB7XHJcbiAgICAgIGFsbG93ZWRPcGVyYXRvcnMgPSBPZ2NGaWx0ZXJPcGVyYXRvclR5cGUuQmFzaWNBbmRTcGF0aWFsO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoYWxsb3dlZE9wZXJhdG9ycy50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgICAgZWZmZWN0aXZlT3BlcmF0b3JzID0gdGhpcy5vZ2NGaWx0ZXJPcGVyYXRvcnM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NwYXRpYWwnOlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHtcclxuICAgICAgICAgIEludGVyc2VjdHM6IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFdpdGhpbjogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Jhc2ljYW5kc3BhdGlhbCc6XHJcbiAgICAgICAgZWZmZWN0aXZlT3BlcmF0b3JzID0ge1xyXG4gICAgICAgICAgUHJvcGVydHlJc0VxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzTm90RXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIEludGVyc2VjdHM6IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFdpdGhpbjogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Jhc2ljJzpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYmFzaWNudW1lcmljJzpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzR3JlYXRlclRoYW5PckVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNMZXNzVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc0xlc3NUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgSW50ZXJzZWN0czogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgV2l0aGluOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9nY0ZpbHRlck9wZXJhdG9ycyA9IGVmZmVjdGl2ZU9wZXJhdG9ycztcclxuICB9XHJcblxyXG4gIHVwZGF0ZUZpZWxkKCkge1xyXG4gICAgaWYgKCF0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5maWVsZHMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHNcclxuICAgIC5maWx0ZXIoc2YgPT4gKHNmLmV4Y2x1ZGVGcm9tT2djRmlsdGVycyA9PT0gdW5kZWZpbmVkIHx8ICFzZi5leGNsdWRlRnJvbU9nY0ZpbHRlcnMpKTtcclxuICAgIHRoaXMuZmllbGRzLmZpbHRlcihmID0+IGYubmFtZSA9PT0gdGhpcy5jdXJyZW50RmlsdGVyLnByb3BlcnR5TmFtZSlcclxuICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBlbGVtZW50LnZhbHVlcyAhPT0gdW5kZWZpbmVkID8gZWxlbWVudC52YWx1ZXMuc29ydCgpIDogW107XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRmlsdGVyU3RhdGUoZXZlbnQsIGZpbHRlcjogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucywgcHJvcGVydHkpIHtcclxuICAgIHRoaXMudXBkYXRlRmllbGQoKTtcclxuICAgIGlmIChldmVudC5jaGVja2VkKSB7XHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVyc1xyXG4gICAgICAgIC5maWx0ZXIoZiA9PiBmLmZpbHRlcmlkID09PSBmaWx0ZXIuZmlsdGVyaWQpXHJcbiAgICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBlbGVtZW50W3Byb3BlcnR5XSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbW92ZU92ZXJsYXlCeUlEKGZpbHRlci5maWx0ZXJpZCk7XHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVyc1xyXG4gICAgICAgIC5maWx0ZXIoZiA9PiBmLmZpbHRlcmlkID09PSBmaWx0ZXIuZmlsdGVyaWQpXHJcbiAgICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBlbGVtZW50W3Byb3BlcnR5XSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRmlsdGVyKGZpbHRlcjogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucykge1xyXG4gICAgY29uc3Qgb2djRmlsdGVyczogT2djRmlsdGVyc09wdGlvbnMgPSB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzO1xyXG4gICAgb2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzID0gb2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZpbHRlcihcclxuICAgICAgZiA9PiBmLmZpbHRlcmlkICE9PSBmaWx0ZXIuZmlsdGVyaWRcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXlCeUlEKGZpbHRlci5maWx0ZXJpZCk7XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTnVtZXJpY1Byb3BlcnR5KGZpbHRlcjogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucywgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICB0aGlzLmNoYW5nZVByb3BlcnR5KGZpbHRlciwgcHJvcGVydHksIHBhcnNlRmxvYXQodmFsdWUpKTtcclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlT3ZlcmxheUJ5SUQoaWQpIHtcclxuICAgIGNvbnN0IG92ZXJsYXlJZCA9IHRoaXMuYmFzZU92ZXJsYXlOYW1lICsgaWQ7XHJcbiAgICBpZiAodGhpcy5tYXAub3ZlcmxheS5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKG92ZXJsYXlJZCkpIHtcclxuICAgICAgdGhpcy5tYXAub3ZlcmxheS5kYXRhU291cmNlLm9sLnJlbW92ZUZlYXR1cmUoXHJcbiAgICAgICAgdGhpcy5tYXAub3ZlcmxheS5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKG92ZXJsYXlJZClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZU9wZXJhdG9yKGZpbHRlcikge1xyXG4gICAgaWYgKHRoaXMub2djRmlsdGVyT3BlcmF0b3JzW2ZpbHRlci5vcGVyYXRvcl0uc3BhdGlhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5yZW1vdmVPdmVybGF5QnlJRChmaWx0ZXIuZmlsdGVyaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlUHJvcGVydHkoZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVyc1xyXG4gICAgICAuZmlsdGVyKGYgPT4gZi5maWx0ZXJpZCA9PT0gZmlsdGVyLmZpbHRlcmlkKVxyXG4gICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBlbGVtZW50W3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUdlb21ldHJ5KGZpbHRlciwgdmFsdWU/KSB7XHJcbiAgICBjb25zdCBjaGVja1NOUkM1MGsgPSAvXFxkezIsM31bYS1sXVswLDFdWzAtOV0vZ2k7XHJcbiAgICBjb25zdCBjaGVja1NOUkMyNTBrID0gL1xcZHsyLDN9W2EtcF0vZ2k7XHJcbiAgICBjb25zdCBjaGVja1NOUkMxbSA9IC9cXGR7MiwzfS9naTtcclxuICAgIGNvbnN0IG1hcFByb2plY3Rpb24gPSB0aGlzLm1hcC5wcm9qZWN0aW9uO1xyXG4gICAgdGhpcy5yZW1vdmVPdmVybGF5QnlJRChmaWx0ZXIuZmlsdGVyaWQpO1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgIC5maWx0ZXIoZiA9PiBmLmZpbHRlcmlkID09PSBmaWx0ZXIuZmlsdGVyaWQpXHJcbiAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGxldCB3a3RQb2x5O1xyXG4gICAgICAgIGlmIChmaWx0ZXIuaWdvU3BhdGlhbFNlbGVjdG9yID09PSAnc25yYycpIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycgJiYgdGhpcy5zbnJjICE9PSAnJykge1xyXG4gICAgICAgICAgICB3a3RQb2x5ID0gdGhpcy53a3RTZXJ2aWNlLnNucmNUb1drdCh0aGlzLnNucmMsIHRoaXMubWFwLnByb2plY3Rpb24pLndrdFBvbHk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQud2t0X2dlb21ldHJ5ID0gd2t0UG9seTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgIHZhbHVlICE9PSAnJyAmJlxyXG4gICAgICAgICAgICAoY2hlY2tTTlJDMW0udGVzdCh2YWx1ZSkgfHxcclxuICAgICAgICAgICAgICBjaGVja1NOUkMyNTBrLnRlc3QodmFsdWUpIHx8XHJcbiAgICAgICAgICAgICAgY2hlY2tTTlJDNTBrLnRlc3QodmFsdWUpKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHdrdFBvbHkgPSB0aGlzLndrdFNlcnZpY2Uuc25yY1RvV2t0KHZhbHVlLCB0aGlzLm1hcC5wcm9qZWN0aW9uKS53a3RQb2x5O1xyXG4gICAgICAgICAgICBlbGVtZW50LndrdF9nZW9tZXRyeSA9IHdrdFBvbHk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuaWdvU3BhdGlhbFNlbGVjdG9yID09PSAnZml4ZWRFeHRlbnQnKSB7XHJcbiAgICAgICAgICB3a3RQb2x5ID0gdGhpcy53a3RTZXJ2aWNlLmV4dGVudFRvV2t0KFxyXG4gICAgICAgICAgICBtYXBQcm9qZWN0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKSxcclxuICAgICAgICAgICAgbWFwUHJvamVjdGlvblxyXG4gICAgICAgICAgKS53a3RQb2x5O1xyXG4gICAgICAgICAgZWxlbWVudC53a3RfZ2VvbWV0cnkgPSB3a3RQb2x5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==