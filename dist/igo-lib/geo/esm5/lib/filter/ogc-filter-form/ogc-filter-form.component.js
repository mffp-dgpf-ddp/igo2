/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { OgcFilterWriter } from '../../filter/shared/ogc-filter';
import { WktService } from '../../wkt/shared/wkt.service';
import { IgoMap } from '../../map';
import { OgcFilterOperatorType } from '../../filter/shared/ogc-filter.enum';
var OgcFilterFormComponent = /** @class */ (function () {
    function OgcFilterFormComponent(wktService) {
        this.wktService = wktService;
        this.value = '';
        this.color = 'primary';
        this.snrc = '';
        this.baseOverlayName = 'ogcFilterOverlay_';
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
    Object.defineProperty(OgcFilterFormComponent.prototype, "activeFilters", {
        get: /**
         * @return {?}
         */
        function () {
            this.updateField();
            return this.datasource.options.ogcFilters.interfaceOgcFilters.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.active === true; }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OgcFilterFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.computeAllowedOperators();
    };
    /**
     * @return {?}
     */
    OgcFilterFormComponent.prototype.computeAllowedOperators = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var allowedOperators = this.datasource.options.ogcFilters.allowedOperatorsType;
        /** @type {?} */
        var effectiveOperators = {};
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
    };
    /**
     * @return {?}
     */
    OgcFilterFormComponent.prototype.updateField = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.datasource.options.sourceFields) {
            return;
        }
        this.fields = this.datasource.options.sourceFields
            .filter((/**
         * @param {?} sf
         * @return {?}
         */
        function (sf) { return (sf.excludeFromOgcFilters === undefined || !sf.excludeFromOgcFilters); }));
        this.fields.filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === _this.currentFilter.propertyName; }))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            _this.values = element.values !== undefined ? element.values.sort() : [];
        }));
    };
    /**
     * @param {?} event
     * @param {?} filter
     * @param {?} property
     * @return {?}
     */
    OgcFilterFormComponent.prototype.toggleFilterState = /**
     * @param {?} event
     * @param {?} filter
     * @param {?} property
     * @return {?}
     */
    function (event, filter, property) {
        this.updateField();
        if (event.checked) {
            this.datasource.options.ogcFilters.interfaceOgcFilters
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.filterid === filter.filterid; }))
                .forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
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
            function (f) { return f.filterid === filter.filterid; }))
                .forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                element[property] = false;
            }));
        }
        this.refreshFilters();
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    OgcFilterFormComponent.prototype.deleteFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        /** @type {?} */
        var ogcFilters = this.datasource.options.ogcFilters;
        ogcFilters.interfaceOgcFilters = ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.filterid !== filter.filterid; }));
        this.removeOverlayByID(filter.filterid);
        this.refreshFilters();
    };
    /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    OgcFilterFormComponent.prototype.changeNumericProperty = /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    function (filter, property, value) {
        this.changeProperty(filter, property, parseFloat(value));
        this.refreshFilters();
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    OgcFilterFormComponent.prototype.removeOverlayByID = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var overlayId = this.baseOverlayName + id;
        if (this.map.overlay.dataSource.ol.getFeatureById(overlayId)) {
            this.map.overlay.dataSource.ol.removeFeature(this.map.overlay.dataSource.ol.getFeatureById(overlayId));
        }
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    OgcFilterFormComponent.prototype.changeOperator = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        if (this.ogcFilterOperators[filter.operator].spatial === false) {
            this.removeOverlayByID(filter.filterid);
        }
        this.refreshFilters();
    };
    /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    OgcFilterFormComponent.prototype.changeProperty = /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    function (filter, property, value) {
        this.datasource.options.ogcFilters.interfaceOgcFilters
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.filterid === filter.filterid; }))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            element[property] = value;
        }));
        this.refreshFilters();
    };
    /**
     * @param {?} filter
     * @param {?=} value
     * @return {?}
     */
    OgcFilterFormComponent.prototype.changeGeometry = /**
     * @param {?} filter
     * @param {?=} value
     * @return {?}
     */
    function (filter, value) {
        var _this = this;
        /** @type {?} */
        var checkSNRC50k = /\d{2,3}[a-l][0,1][0-9]/gi;
        /** @type {?} */
        var checkSNRC250k = /\d{2,3}[a-p]/gi;
        /** @type {?} */
        var checkSNRC1m = /\d{2,3}/gi;
        /** @type {?} */
        var mapProjection = this.map.projection;
        this.removeOverlayByID(filter.filterid);
        this.datasource.options.ogcFilters.interfaceOgcFilters
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.filterid === filter.filterid; }))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** @type {?} */
            var wktPoly;
            if (filter.igoSpatialSelector === 'snrc') {
                if (value === '' && _this.snrc !== '') {
                    wktPoly = _this.wktService.snrcToWkt(_this.snrc).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
                else if (value !== '' &&
                    (checkSNRC1m.test(value) ||
                        checkSNRC250k.test(value) ||
                        checkSNRC50k.test(value))) {
                    wktPoly = _this.wktService.snrcToWkt(value).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
            }
            else if (filter.igoSpatialSelector === 'fixedExtent') {
                wktPoly = _this.wktService.extentToWkt(mapProjection, _this.map.getExtent(), mapProjection).wktPoly;
                element.wkt_geometry = wktPoly;
            }
        }));
        this.refreshFilters();
    };
    OgcFilterFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-form',
                    template: "<mat-list-item>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\">\r\n    <mat-select class=\"logical\" [disabled]=\"!currentFilter.active\" (selectionChange)=\"refreshFilters()\" [(ngModel)]=\"currentFilter.parentLogical\"\r\n      *ngIf=\"activeFilters.indexOf(currentFilter) !== 0 && currentFilter.active===true\">\r\n      <mat-option value=\"And\">{{'igo.geo.operators.And' | translate}}</mat-option>\r\n      <mat-option value=\"Or\">{{'igo.geo.operators.Or' | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <span *ngIf=\"fields && fields.length > 0 && fields[0].name !== ''\">\r\n      <mat-select [disabled]=\"!currentFilter.active\" *ngIf=\"['Contains','Intersects','Within'].indexOf(currentFilter.operator) === -1\"\r\n        [(ngModel)]=\"currentFilter.propertyName\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.sourceFields.selectField' | translate\"\r\n        (selectionChange)=\"updateField()\">\r\n        <mat-option *ngFor=\"let field of fields\" [value]=\"field.name\">{{field.alias}}</mat-option>\r\n      </mat-select>\r\n    </span>\r\n    <span *ngIf=\"fields && fields.length === 1 && fields[0].name === ''\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput #fieldPerUser (keyup)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\"\r\n          (blur)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\" [(ngModel)]=\"currentFilter.propertyName\">\r\n\r\n        <button mat-button *ngIf=\"currentFilter.propertyName\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.propertyName=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n\r\n    <!-- PropertyIsEqualTo -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsEqualTo' || currentFilter.operator === 'PropertyIsNotEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionequalto (keyup)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsEqualTo  -->\r\n\r\n\r\n    <!-- PropertyIsLike  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsLike'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #pattern (keyup)=\"changeProperty(currentFilter,'pattern',pattern.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'pattern',pattern.value)\" [ngModel]=\"currentFilter.pattern\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.pattern\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.pattern=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsLike  -->\r\n\r\n    <!-- PropertyIsNull  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsNull'\"></span>\r\n    <!-- PropertyIsNull  -->\r\n\r\n    <!-- PropertyIs_Than  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsGreaterThan' || currentFilter.operator === 'PropertyIsGreaterThanOrEqualTo' || currentFilter.operator === 'PropertyIsLessThan' || currentFilter.operator === 'PropertyIsLessThanOrEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionthan type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n    </span>\r\n    <!-- PropertyIs_Than  -->\r\n\r\n\r\n    <!-- PropertyIsBetween -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsBetween'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #lowerBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\" [ngModel]=\"currentFilter.lowerBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.lowerBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.lowerBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #upperBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\" [ngModel]=\"currentFilter.upperBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.upperBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.upperBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsBetween  -->\r\n\r\n\r\n    <!-- During -->\r\n    <span *ngIf=\"currentFilter.operator === 'During'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #begin (keyup)=\"changeProperty(currentFilter,'begin',begin.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'begin',begin.value)\" [ngModel]=\"currentFilter.begin\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values \" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.begin\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.begin=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #end (keyup)=\"changeProperty(currentFilter,'end',end.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'end',end.value)\" [ngModel]=\"currentFilter.end\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.end\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.end=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n\r\n    </span>\r\n    <!-- During  -->\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n\r\n\r\n  <!-- PropertySpatial  -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.igoSpatialSelector\" (selectionChange)=\"changeGeometry(currentFilter,value)\">\r\n      <mat-option *ngFor=\"let igoSpatialSelector of igoSpatialSelectors\" [value]=\"igoSpatialSelector.type\">{{('igo.geo.spatialSelector.'+ igoSpatialSelector.type) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <button mat-button [disabled]=\"!currentFilter.active\" *ngIf=\"currentFilter.igoSpatialSelector === 'fixedExtent'\"\r\n      matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"changeGeometry(currentFilter,value)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.spatialSelector.btnSetExtent' | translate\">\r\n      <mat-icon svgIcon=\"arrow-expand-all\"></mat-icon>\r\n    </button>\r\n\r\n\r\n    <mat-form-field *ngIf=\"currentFilter.igoSpatialSelector === 'snrc'\">\r\n      <input matInput #htmlSnrc (keyup)=\"changeGeometry(currentFilter,htmlSnrc.value)\" (blur)=\"changeGeometry(currentFilter,htmlSnrc.value)\"\r\n        [(ngModel)]=\"snrc\">\r\n      <button mat-button *ngIf=\"snrc\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"snrc=''\">\r\n        <mat-icon svgIcon=\"close\"></mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- PropertySpatial  -->\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <mat-slide-toggle class=\"example-margin\" (change)=\"toggleFilterState($event,currentFilter,'active')\" tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"currentFilter.active\"\r\n        [disabled]=\"disabled\">\r\n      </mat-slide-toggle>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.removeFilter' | translate\"\r\n        color=\"warn\" (click)=\"deleteFilter(currentFilter)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <mat-divider></mat-divider>\r\n</mat-list-item>\r\n",
                    styles: [":host{overflow:hidden}.mat-list-item{height:auto}.mat-list-item>>>div.mat-list-item-content{display:inline-table}.logical{font-weight:700}input,mat-select{margin-top:10px;text-align:center}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-button-group{float:center;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
                }] }
    ];
    /** @nocollapse */
    OgcFilterFormComponent.ctorParameters = function () { return [
        { type: WktService }
    ]; };
    OgcFilterFormComponent.propDecorators = {
        refreshFilters: [{ type: Input }],
        datasource: [{ type: Input }],
        map: [{ type: Input }],
        currentFilter: [{ type: Input }]
    };
    return OgcFilterFormComponent;
}());
export { OgcFilterFormComponent };
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
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype.wktService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci1mb3JtL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RTtJQWdDRSxnQ0FDVSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBekJ6QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBSVgsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUNsQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsb0JBQWUsR0FBRyxtQkFBbUIsQ0FBQztRQW9CM0MsMkRBQTJEO1FBQzNELG9EQUFvRDtRQUNwRCw0REFBNEQ7UUFDNUQsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMxRCxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekI7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7YUFDcEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0YsQ0FBQztRQUNGLG9DQUFvQztJQUN0QyxDQUFDO0lBeEJELHNCQUFJLGlEQUFhOzs7O1FBQWpCO1lBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFD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QUFDLEtBQUssQ0FBQyxDQUFDLEVBQzNCO29CQUNBLE9BQU8sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ25ELE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2lCQUNoQzthQUNGO2lCQUFNLElBQUksTUFBTSxDQUFDLGtCQUFrQixLQUFLLGFBQWEsRUFBRTtnQkFDdEQsT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUNuQyxhQUFhLEVBQ2IsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFDcEIsYUFBYSxDQUNkLENBQUMsT0FBTyxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBck5GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQix5alpBQStDOztpQkFFaEQ7Ozs7Z0JBUlEsVUFBVTs7O2lDQXFCaEIsS0FBSzs2QkFFTCxLQUFLO3NCQUVMLEtBQUs7Z0NBRUwsS0FBSzs7SUErTFIsNkJBQUM7Q0FBQSxBQXRORCxJQXNOQztTQWpOWSxzQkFBc0I7OztJQUNqQyxvREFBMEI7O0lBQzFCLHFEQUEyQjs7SUFDM0IsdUNBQWtCOztJQUNsQiwrQ0FBcUI7O0lBQ3JCLHdDQUFxQjs7SUFDckIsd0NBQXFCOztJQUNyQix1Q0FBeUI7O0lBQ3pCLHNDQUFpQjs7SUFDakIsMENBQWdCOztJQUNoQixpREFBNkM7O0lBRTdDLGdEQUFvQzs7SUFFcEMsNENBQTZDOztJQUU3QyxxQ0FBcUI7O0lBRXJCLCtDQUE0Qjs7Ozs7SUFVMUIsNENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsXHJcbiAgT2djRmlsdGVyYWJsZURhdGFTb3VyY2UsXHJcbiAgT2djRmlsdGVyc09wdGlvbnNcclxufSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyJztcclxuaW1wb3J0IHsgV2t0U2VydmljZSB9IGZyb20gJy4uLy4uL3drdC9zaGFyZWQvd2t0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJPcGVyYXRvclR5cGUgfSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuZW51bSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgb2djRmlsdGVyT3BlcmF0b3JzO1xyXG4gIHB1YmxpYyBpZ29TcGF0aWFsU2VsZWN0b3JzO1xyXG4gIHB1YmxpYyB2YWx1ZSA9ICcnO1xyXG4gIHB1YmxpYyBpbnB1dE9wZXJhdG9yO1xyXG4gIHB1YmxpYyBmaWVsZHM6IGFueVtdO1xyXG4gIHB1YmxpYyB2YWx1ZXM6IGFueVtdO1xyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuICBwdWJsaWMgc25yYyA9ICcnO1xyXG4gIHB1YmxpYyBkaXNhYmxlZDtcclxuICBwdWJsaWMgYmFzZU92ZXJsYXlOYW1lID0gJ29nY0ZpbHRlck92ZXJsYXlfJztcclxuXHJcbiAgQElucHV0KCkgcmVmcmVzaEZpbHRlcnM6ICgpID0+IHZvaWQ7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGFzb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KCkgY3VycmVudEZpbHRlcjogYW55O1xyXG5cclxuICBnZXQgYWN0aXZlRmlsdGVycygpIHtcclxuICAgIHRoaXMudXBkYXRlRmllbGQoKTtcclxuICAgIHJldHVybiB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuYWN0aXZlID09PSB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHdrdFNlcnZpY2U6IFdrdFNlcnZpY2VcclxuICApIHtcclxuICAgIC8vIFRPRE86IEZpbHRlciBwZXJtaXR0ZWQgb3BlcmF0b3IgYmFzZWQgb24gd2ZzY2FwYWJpbGl0aWVzXHJcbiAgICAvLyBOZWVkIHRvIHdvcmsgb24gcmVnZXggb24gWE1MIGNhcGFiaWxpdGllcyBiZWNhdXNlXHJcbiAgICAvLyBjb21hcGFyaXNvbiBvcGVyYXRvcidzIG5hbWUgdmFyaWVzIGJldHdlZW4gV0ZTIHNlcnZlcnMuLi5cclxuICAgIC8vIEV4OiBJc051bGwgdnMgUHJvcGVydHlJc051bGwgdnMgSXNOaWwgLi4uXHJcbiAgICB0aGlzLm9nY0ZpbHRlck9wZXJhdG9ycyA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKS5vcGVyYXRvcnM7XHJcbiAgICB0aGlzLmlnb1NwYXRpYWxTZWxlY3RvcnMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnZml4ZWRFeHRlbnQnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnc25yYydcclxuICAgICAgfVxyXG4gICAgXTtcclxuICAgIC8vIFRPRE86IHNlbGVjdEZlYXR1cmUgJiBkcmF3RmVhdHVyZVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbXB1dGVBbGxvd2VkT3BlcmF0b3JzKCk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlQWxsb3dlZE9wZXJhdG9ycygpIHtcclxuICAgIGxldCBhbGxvd2VkT3BlcmF0b3JzID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hbGxvd2VkT3BlcmF0b3JzVHlwZTtcclxuICAgIGxldCBlZmZlY3RpdmVPcGVyYXRvcnM6IHt9ID0ge307XHJcblxyXG4gICAgaWYgKCFhbGxvd2VkT3BlcmF0b3JzKSAge1xyXG4gICAgICBhbGxvd2VkT3BlcmF0b3JzID0gT2djRmlsdGVyT3BlcmF0b3JUeXBlLkJhc2ljQW5kU3BhdGlhbDtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGFsbG93ZWRPcGVyYXRvcnMudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICBjYXNlICdhbGwnOlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHRoaXMub2djRmlsdGVyT3BlcmF0b3JzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzcGF0aWFsJzpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdiYXNpY2FuZHNwYXRpYWwnOlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHtcclxuICAgICAgICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdiYXNpYyc6XHJcbiAgICAgICAgZWZmZWN0aXZlT3BlcmF0b3JzID0ge1xyXG4gICAgICAgICAgUHJvcGVydHlJc0VxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzTm90RXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Jhc2ljbnVtZXJpYyc6XHJcbiAgICAgICAgZWZmZWN0aXZlT3BlcmF0b3JzID0ge1xyXG4gICAgICAgICAgUHJvcGVydHlJc0VxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzTm90RXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNHcmVhdGVyVGhhbjogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc0dyZWF0ZXJUaGFuT3JFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzTGVzc1RoYW46IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNMZXNzVGhhbk9yRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgZWZmZWN0aXZlT3BlcmF0b3JzID0ge1xyXG4gICAgICAgICAgUHJvcGVydHlJc0VxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzTm90RXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIEludGVyc2VjdHM6IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFdpdGhpbjogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vZ2NGaWx0ZXJPcGVyYXRvcnMgPSBlZmZlY3RpdmVPcGVyYXRvcnM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWVsZCgpIHtcclxuICAgIGlmICghdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZmllbGRzID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzXHJcbiAgICAuZmlsdGVyKHNmID0+IChzZi5leGNsdWRlRnJvbU9nY0ZpbHRlcnMgPT09IHVuZGVmaW5lZCB8fCAhc2YuZXhjbHVkZUZyb21PZ2NGaWx0ZXJzKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5maWx0ZXIoZiA9PiBmLm5hbWUgPT09IHRoaXMuY3VycmVudEZpbHRlci5wcm9wZXJ0eU5hbWUpXHJcbiAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gZWxlbWVudC52YWx1ZXMgIT09IHVuZGVmaW5lZCA/IGVsZW1lbnQudmFsdWVzLnNvcnQoKSA6IFtdO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZpbHRlclN0YXRlKGV2ZW50LCBmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsIHByb3BlcnR5KSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZpZWxkKCk7XHJcbiAgICBpZiAoZXZlbnQuY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgICAuZmlsdGVyKGYgPT4gZi5maWx0ZXJpZCA9PT0gZmlsdGVyLmZpbHRlcmlkKVxyXG4gICAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVPdmVybGF5QnlJRChmaWx0ZXIuZmlsdGVyaWQpO1xyXG4gICAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgICAuZmlsdGVyKGYgPT4gZi5maWx0ZXJpZCA9PT0gZmlsdGVyLmZpbHRlcmlkKVxyXG4gICAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbHRlcihmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG9nY0ZpbHRlcnM6IE9nY0ZpbHRlcnNPcHRpb25zID0gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycztcclxuICAgIG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycyA9IG9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVycy5maWx0ZXIoXHJcbiAgICAgIGYgPT4gZi5maWx0ZXJpZCAhPT0gZmlsdGVyLmZpbHRlcmlkXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZW1vdmVPdmVybGF5QnlJRChmaWx0ZXIuZmlsdGVyaWQpO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU51bWVyaWNQcm9wZXJ0eShmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5jaGFuZ2VQcm9wZXJ0eShmaWx0ZXIsIHByb3BlcnR5LCBwYXJzZUZsb2F0KHZhbHVlKSk7XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZU92ZXJsYXlCeUlEKGlkKSB7XHJcbiAgICBjb25zdCBvdmVybGF5SWQgPSB0aGlzLmJhc2VPdmVybGF5TmFtZSArIGlkO1xyXG4gICAgaWYgKHRoaXMubWFwLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChvdmVybGF5SWQpKSB7XHJcbiAgICAgIHRoaXMubWFwLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKFxyXG4gICAgICAgIHRoaXMubWFwLm92ZXJsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChvdmVybGF5SWQpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VPcGVyYXRvcihmaWx0ZXIpIHtcclxuICAgIGlmICh0aGlzLm9nY0ZpbHRlck9wZXJhdG9yc1tmaWx0ZXIub3BlcmF0b3JdLnNwYXRpYWwgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVByb3BlcnR5KGZpbHRlcjogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucywgcHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgZWxlbWVudFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VHZW9tZXRyeShmaWx0ZXIsIHZhbHVlPykge1xyXG4gICAgY29uc3QgY2hlY2tTTlJDNTBrID0gL1xcZHsyLDN9W2EtbF1bMCwxXVswLTldL2dpO1xyXG4gICAgY29uc3QgY2hlY2tTTlJDMjUwayA9IC9cXGR7MiwzfVthLXBdL2dpO1xyXG4gICAgY29uc3QgY2hlY2tTTlJDMW0gPSAvXFxkezIsM30vZ2k7XHJcbiAgICBjb25zdCBtYXBQcm9qZWN0aW9uID0gdGhpcy5tYXAucHJvamVjdGlvbjtcclxuICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuICAgIHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuaW50ZXJmYWNlT2djRmlsdGVyc1xyXG4gICAgICAuZmlsdGVyKGYgPT4gZi5maWx0ZXJpZCA9PT0gZmlsdGVyLmZpbHRlcmlkKVxyXG4gICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBsZXQgd2t0UG9seTtcclxuICAgICAgICBpZiAoZmlsdGVyLmlnb1NwYXRpYWxTZWxlY3RvciA9PT0gJ3NucmMnKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnICYmIHRoaXMuc25yYyAhPT0gJycpIHtcclxuICAgICAgICAgICAgd2t0UG9seSA9IHRoaXMud2t0U2VydmljZS5zbnJjVG9Xa3QodGhpcy5zbnJjKS53a3RQb2x5O1xyXG4gICAgICAgICAgICBlbGVtZW50LndrdF9nZW9tZXRyeSA9IHdrdFBvbHk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICB2YWx1ZSAhPT0gJycgJiZcclxuICAgICAgICAgICAgKGNoZWNrU05SQzFtLnRlc3QodmFsdWUpIHx8XHJcbiAgICAgICAgICAgICAgY2hlY2tTTlJDMjUway50ZXN0KHZhbHVlKSB8fFxyXG4gICAgICAgICAgICAgIGNoZWNrU05SQzUway50ZXN0KHZhbHVlKSlcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB3a3RQb2x5ID0gdGhpcy53a3RTZXJ2aWNlLnNucmNUb1drdCh2YWx1ZSkud2t0UG9seTtcclxuICAgICAgICAgICAgZWxlbWVudC53a3RfZ2VvbWV0cnkgPSB3a3RQb2x5O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmlnb1NwYXRpYWxTZWxlY3RvciA9PT0gJ2ZpeGVkRXh0ZW50Jykge1xyXG4gICAgICAgICAgd2t0UG9seSA9IHRoaXMud2t0U2VydmljZS5leHRlbnRUb1drdChcclxuICAgICAgICAgICAgbWFwUHJvamVjdGlvbixcclxuICAgICAgICAgICAgdGhpcy5tYXAuZ2V0RXh0ZW50KCksXHJcbiAgICAgICAgICAgIG1hcFByb2plY3Rpb25cclxuICAgICAgICAgICkud2t0UG9seTtcclxuICAgICAgICAgIGVsZW1lbnQud2t0X2dlb21ldHJ5ID0gd2t0UG9seTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxufVxyXG4iXX0=