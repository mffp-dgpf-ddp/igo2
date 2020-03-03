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
                    wktPoly = _this.wktService.snrcToWkt(_this.snrc, _this.map.projection).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
                else if (value !== '' &&
                    (checkSNRC1m.test(value) ||
                        checkSNRC250k.test(value) ||
                        checkSNRC50k.test(value))) {
                    wktPoly = _this.wktService.snrcToWkt(value, _this.map.projection).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
            }
            else if (filter.igoSpatialSelector === 'fixedExtent') {
                wktPoly = _this.wktService.extentToWkt(mapProjection, _this.map.viewController.getExtent(), mapProjection).wktPoly;
                element.wkt_geometry = wktPoly;
            }
        }));
        this.refreshFilters();
    };
    OgcFilterFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-form',
                    template: "<mat-list-item class=\"mat-typography\">\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\">\r\n    <mat-select class=\"logical\" [disabled]=\"!currentFilter.active\" (selectionChange)=\"refreshFilters()\" [(ngModel)]=\"currentFilter.parentLogical\"\r\n      *ngIf=\"activeFilters.indexOf(currentFilter) !== 0 && currentFilter.active===true\">\r\n      <mat-option value=\"And\">{{'igo.geo.operators.And' | translate}}</mat-option>\r\n      <mat-option value=\"Or\">{{'igo.geo.operators.Or' | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <span *ngIf=\"fields && fields.length > 0 && fields[0].name !== ''\">\r\n      <mat-select [disabled]=\"!currentFilter.active\" *ngIf=\"['Contains','Intersects','Within'].indexOf(currentFilter.operator) === -1\"\r\n        [(ngModel)]=\"currentFilter.propertyName\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.sourceFields.selectField' | translate\"\r\n        (selectionChange)=\"updateField()\">\r\n        <mat-option *ngFor=\"let field of fields\" [value]=\"field.name\">{{field.alias}}</mat-option>\r\n      </mat-select>\r\n    </span>\r\n    <span *ngIf=\"fields && fields.length === 1 && fields[0].name === ''\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput #fieldPerUser (keyup)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\"\r\n          (blur)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\" [(ngModel)]=\"currentFilter.propertyName\">\r\n\r\n        <button mat-button *ngIf=\"currentFilter.propertyName\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.propertyName=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <mat-select \r\n    tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.selectOperator' | translate\"\r\n    [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n\r\n    <!-- PropertyIsEqualTo -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsEqualTo' || currentFilter.operator === 'PropertyIsNotEqualTo'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionequalto (keyup)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsEqualTo  -->\r\n\r\n\r\n    <!-- PropertyIsLike  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsLike'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #pattern (keyup)=\"changeProperty(currentFilter,'pattern',pattern.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'pattern',pattern.value)\" [ngModel]=\"currentFilter.pattern\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.pattern\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.pattern=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsLike  -->\r\n\r\n    <!-- PropertyIsNull  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsNull'\"></span>\r\n    <!-- PropertyIsNull  -->\r\n\r\n    <!-- PropertyIs_Than  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsGreaterThan' || currentFilter.operator === 'PropertyIsGreaterThanOrEqualTo' || currentFilter.operator === 'PropertyIsLessThan' || currentFilter.operator === 'PropertyIsLessThanOrEqualTo'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionthan type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n    </span>\r\n    <!-- PropertyIs_Than  -->\r\n\r\n\r\n    <!-- PropertyIsBetween -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsBetween'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #lowerBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\" [ngModel]=\"currentFilter.lowerBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.lowerBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.lowerBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #upperBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\" [ngModel]=\"currentFilter.upperBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.upperBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.upperBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsBetween  -->\r\n\r\n\r\n    <!-- During -->\r\n    <span *ngIf=\"currentFilter.operator === 'During'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #begin (keyup)=\"changeProperty(currentFilter,'begin',begin.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'begin',begin.value)\" [ngModel]=\"currentFilter.begin\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values \" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.begin\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.begin=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #end (keyup)=\"changeProperty(currentFilter,'end',end.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'end',end.value)\" [ngModel]=\"currentFilter.end\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.end\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.end=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n\r\n    </span>\r\n    <!-- During  -->\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n\r\n\r\n  <!-- PropertySpatial  -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select  \r\n      matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.selectOperator' | translate\" tooltip-position=\"below\"\r\n      [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.igoSpatialSelector\" (selectionChange)=\"changeGeometry(currentFilter,value)\">\r\n      <mat-option *ngFor=\"let igoSpatialSelector of igoSpatialSelectors\" [value]=\"igoSpatialSelector.type\">{{('igo.geo.spatialSelector.'+ igoSpatialSelector.type) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <button mat-button [disabled]=\"!currentFilter.active\" *ngIf=\"currentFilter.igoSpatialSelector === 'fixedExtent'\"\r\n      matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"changeGeometry(currentFilter,value)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.spatialSelector.btnSetExtent' | translate\">\r\n      <mat-icon svgIcon=\"arrow-expand-all\"></mat-icon>\r\n    </button>\r\n\r\n\r\n    <mat-form-field *ngIf=\"currentFilter.igoSpatialSelector === 'snrc'\" [floatLabel]=\"floatLabel\">\r\n      <input [placeholder]=\"'igo.geo.filter.placeholderSnrc' | translate\" matInput #htmlSnrc (keyup)=\"changeGeometry(currentFilter,htmlSnrc.value)\" (blur)=\"changeGeometry(currentFilter,htmlSnrc.value)\"\r\n        [(ngModel)]=\"snrc\">\r\n      <button mat-button *ngIf=\"snrc\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"snrc=''\">\r\n        <mat-icon svgIcon=\"close\"></mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- PropertySpatial  -->\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <mat-slide-toggle class=\"example-margin\" (change)=\"toggleFilterState($event,currentFilter,'active')\" tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"currentFilter.active\"\r\n        [disabled]=\"disabled\">\r\n      </mat-slide-toggle>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.removeFilter' | translate\"\r\n        color=\"warn\" (click)=\"deleteFilter(currentFilter)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <mat-divider></mat-divider>\r\n</mat-list-item>\r\n",
                    styles: [":host{overflow:hidden}.mat-list-item{height:auto}.mat-form-field{width:100%}.mat-list-item>>>div.mat-list-item-content{display:inline-table;width:100%}.logical{font-weight:700}input,mat-select{margin-top:10px;text-align:center}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-button-group{float:center;padding:0 3px}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
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
        currentFilter: [{ type: Input }],
        floatLabel: [{ type: Input }]
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
    /** @type {?} */
    OgcFilterFormComponent.prototype.floatLabel;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype.wktService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci1mb3JtL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUc1RTtJQWtDRSxnQ0FDVSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBM0J6QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBSVgsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUNsQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsb0JBQWUsR0FBRyxtQkFBbUIsQ0FBQztRQVVwQyxlQUFVLEdBQW1CLE9BQU8sQ0FBQztRQVk1QywyREFBMkQ7UUFDM0Qsb0RBQW9EO1FBQ3BELDREQUE0RDtRQUM1RCw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQzFELElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUN6QjtnQkFDRSxJQUFJLEVBQUUsYUFBYTthQUNwQjtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNO2FBQ2I7U0FDRixDQUFDO1FBQ0Ysb0NBQW9DO0lBQ3RDLENBQUM7SUF4QkQsc0JBQUksaURBQWE7Ozs7UUFBakI7WUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUMsVUFB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O0lBVTVDLDRDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlLFxyXG4gIE9nY0ZpbHRlcnNPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlcic7XHJcbmltcG9ydCB7IFdrdFNlcnZpY2UgfSBmcm9tICcuLi8uLi93a3Qvc2hhcmVkL3drdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgT2djRmlsdGVyT3BlcmF0b3JUeXBlIH0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyLmVudW0nO1xyXG5pbXBvcnQgeyBGbG9hdExhYmVsVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXItZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBvZ2NGaWx0ZXJPcGVyYXRvcnM7XHJcbiAgcHVibGljIGlnb1NwYXRpYWxTZWxlY3RvcnM7XHJcbiAgcHVibGljIHZhbHVlID0gJyc7XHJcbiAgcHVibGljIGlucHV0T3BlcmF0b3I7XHJcbiAgcHVibGljIGZpZWxkczogYW55W107XHJcbiAgcHVibGljIHZhbHVlczogYW55W107XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHB1YmxpYyBzbnJjID0gJyc7XHJcbiAgcHVibGljIGRpc2FibGVkO1xyXG4gIHB1YmxpYyBiYXNlT3ZlcmxheU5hbWUgPSAnb2djRmlsdGVyT3ZlcmxheV8nO1xyXG5cclxuICBASW5wdXQoKSByZWZyZXNoRmlsdGVyczogKCkgPT4gdm9pZDtcclxuXHJcbiAgQElucHV0KCkgZGF0YXNvdXJjZTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2U7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBjdXJyZW50RmlsdGVyOiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpIGZsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlID0gJ25ldmVyJztcclxuXHJcbiAgZ2V0IGFjdGl2ZUZpbHRlcnMoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZpZWxkKCk7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZpbHRlcihcclxuICAgICAgZiA9PiBmLmFjdGl2ZSA9PT0gdHJ1ZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB3a3RTZXJ2aWNlOiBXa3RTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICAvLyBUT0RPOiBGaWx0ZXIgcGVybWl0dGVkIG9wZXJhdG9yIGJhc2VkIG9uIHdmc2NhcGFiaWxpdGllc1xyXG4gICAgLy8gTmVlZCB0byB3b3JrIG9uIHJlZ2V4IG9uIFhNTCBjYXBhYmlsaXRpZXMgYmVjYXVzZVxyXG4gICAgLy8gY29tYXBhcmlzb24gb3BlcmF0b3IncyBuYW1lIHZhcmllcyBiZXR3ZWVuIFdGUyBzZXJ2ZXJzLi4uXHJcbiAgICAvLyBFeDogSXNOdWxsIHZzIFByb3BlcnR5SXNOdWxsIHZzIElzTmlsIC4uLlxyXG4gICAgdGhpcy5vZ2NGaWx0ZXJPcGVyYXRvcnMgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCkub3BlcmF0b3JzO1xyXG4gICAgdGhpcy5pZ29TcGF0aWFsU2VsZWN0b3JzID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogJ2ZpeGVkRXh0ZW50J1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogJ3NucmMnXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgICAvLyBUT0RPOiBzZWxlY3RGZWF0dXJlICYgZHJhd0ZlYXR1cmVcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb21wdXRlQWxsb3dlZE9wZXJhdG9ycygpO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZUFsbG93ZWRPcGVyYXRvcnMoKSB7XHJcbiAgICBsZXQgYWxsb3dlZE9wZXJhdG9ycyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnMuYWxsb3dlZE9wZXJhdG9yc1R5cGU7XHJcbiAgICBsZXQgZWZmZWN0aXZlT3BlcmF0b3JzOiB7fSA9IHt9O1xyXG5cclxuICAgIGlmICghYWxsb3dlZE9wZXJhdG9ycykgIHtcclxuICAgICAgYWxsb3dlZE9wZXJhdG9ycyA9IE9nY0ZpbHRlck9wZXJhdG9yVHlwZS5CYXNpY0FuZFNwYXRpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChhbGxvd2VkT3BlcmF0b3JzLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB0aGlzLm9nY0ZpbHRlck9wZXJhdG9ycztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc3BhdGlhbCc6XHJcbiAgICAgICAgZWZmZWN0aXZlT3BlcmF0b3JzID0ge1xyXG4gICAgICAgICAgSW50ZXJzZWN0czogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgV2l0aGluOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYmFzaWNhbmRzcGF0aWFsJzpcclxuICAgICAgICBlZmZlY3RpdmVPcGVyYXRvcnMgPSB7XHJcbiAgICAgICAgICBQcm9wZXJ0eUlzRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNOb3RFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgSW50ZXJzZWN0czogeyBzcGF0aWFsOiB0cnVlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgV2l0aGluOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYmFzaWMnOlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHtcclxuICAgICAgICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdiYXNpY251bWVyaWMnOlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHtcclxuICAgICAgICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzR3JlYXRlclRoYW46IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgICAgICAgIFByb3BlcnR5SXNHcmVhdGVyVGhhbk9yRXF1YWxUbzogeyBzcGF0aWFsOiBmYWxzZSwgZmllbGRSZXN0cmljdDogWydudW1iZXInXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc0xlc3NUaGFuOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbJ251bWJlciddIH0sXHJcbiAgICAgICAgICBQcm9wZXJ0eUlzTGVzc1RoYW5PckVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFsnbnVtYmVyJ10gfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGVmZmVjdGl2ZU9wZXJhdG9ycyA9IHtcclxuICAgICAgICAgIFByb3BlcnR5SXNFcXVhbFRvOiB7IHNwYXRpYWw6IGZhbHNlLCBmaWVsZFJlc3RyaWN0OiBbXSB9LFxyXG4gICAgICAgICAgUHJvcGVydHlJc05vdEVxdWFsVG86IHsgc3BhdGlhbDogZmFsc2UsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBJbnRlcnNlY3RzOiB7IHNwYXRpYWw6IHRydWUsIGZpZWxkUmVzdHJpY3Q6IFtdIH0sXHJcbiAgICAgICAgICBXaXRoaW46IHsgc3BhdGlhbDogdHJ1ZSwgZmllbGRSZXN0cmljdDogW10gfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2djRmlsdGVyT3BlcmF0b3JzID0gZWZmZWN0aXZlT3BlcmF0b3JzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRmllbGQoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkc1xyXG4gICAgLmZpbHRlcihzZiA9PiAoc2YuZXhjbHVkZUZyb21PZ2NGaWx0ZXJzID09PSB1bmRlZmluZWQgfHwgIXNmLmV4Y2x1ZGVGcm9tT2djRmlsdGVycykpO1xyXG4gICAgdGhpcy5maWVsZHMuZmlsdGVyKGYgPT4gZi5uYW1lID09PSB0aGlzLmN1cnJlbnRGaWx0ZXIucHJvcGVydHlOYW1lKVxyXG4gICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlcyA9IGVsZW1lbnQudmFsdWVzICE9PSB1bmRlZmluZWQgPyBlbGVtZW50LnZhbHVlcy5zb3J0KCkgOiBbXTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGaWx0ZXJTdGF0ZShldmVudCwgZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLCBwcm9wZXJ0eSkge1xyXG4gICAgdGhpcy51cGRhdGVGaWVsZCgpO1xyXG4gICAgaWYgKGV2ZW50LmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWx0ZXIoZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zKSB7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzOiBPZ2NGaWx0ZXJzT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuZmlsdGVyaWQgIT09IGZpbHRlci5maWx0ZXJpZFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VOdW1lcmljUHJvcGVydHkoZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIHRoaXMuY2hhbmdlUHJvcGVydHkoZmlsdGVyLCBwcm9wZXJ0eSwgcGFyc2VGbG9hdCh2YWx1ZSkpO1xyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVPdmVybGF5QnlJRChpZCkge1xyXG4gICAgY29uc3Qgb3ZlcmxheUlkID0gdGhpcy5iYXNlT3ZlcmxheU5hbWUgKyBpZDtcclxuICAgIGlmICh0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQob3ZlcmxheUlkKSkge1xyXG4gICAgICB0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZShcclxuICAgICAgICB0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQob3ZlcmxheUlkKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlT3BlcmF0b3IoZmlsdGVyKSB7XHJcbiAgICBpZiAodGhpcy5vZ2NGaWx0ZXJPcGVyYXRvcnNbZmlsdGVyLm9wZXJhdG9yXS5zcGF0aWFsID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnJlbW92ZU92ZXJsYXlCeUlEKGZpbHRlci5maWx0ZXJpZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQcm9wZXJ0eShmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgIC5maWx0ZXIoZiA9PiBmLmZpbHRlcmlkID09PSBmaWx0ZXIuZmlsdGVyaWQpXHJcbiAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlR2VvbWV0cnkoZmlsdGVyLCB2YWx1ZT8pIHtcclxuICAgIGNvbnN0IGNoZWNrU05SQzUwayA9IC9cXGR7MiwzfVthLWxdWzAsMV1bMC05XS9naTtcclxuICAgIGNvbnN0IGNoZWNrU05SQzI1MGsgPSAvXFxkezIsM31bYS1wXS9naTtcclxuICAgIGNvbnN0IGNoZWNrU05SQzFtID0gL1xcZHsyLDN9L2dpO1xyXG4gICAgY29uc3QgbWFwUHJvamVjdGlvbiA9IHRoaXMubWFwLnByb2plY3Rpb247XHJcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXlCeUlEKGZpbHRlci5maWx0ZXJpZCk7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgbGV0IHdrdFBvbHk7XHJcbiAgICAgICAgaWYgKGZpbHRlci5pZ29TcGF0aWFsU2VsZWN0b3IgPT09ICdzbnJjJykge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyAmJiB0aGlzLnNucmMgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHdrdFBvbHkgPSB0aGlzLndrdFNlcnZpY2Uuc25yY1RvV2t0KHRoaXMuc25yYywgdGhpcy5tYXAucHJvamVjdGlvbikud2t0UG9seTtcclxuICAgICAgICAgICAgZWxlbWVudC53a3RfZ2VvbWV0cnkgPSB3a3RQb2x5O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgdmFsdWUgIT09ICcnICYmXHJcbiAgICAgICAgICAgIChjaGVja1NOUkMxbS50ZXN0KHZhbHVlKSB8fFxyXG4gICAgICAgICAgICAgIGNoZWNrU05SQzI1MGsudGVzdCh2YWx1ZSkgfHxcclxuICAgICAgICAgICAgICBjaGVja1NOUkM1MGsudGVzdCh2YWx1ZSkpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgd2t0UG9seSA9IHRoaXMud2t0U2VydmljZS5zbnJjVG9Xa3QodmFsdWUsIHRoaXMubWFwLnByb2plY3Rpb24pLndrdFBvbHk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQud2t0X2dlb21ldHJ5ID0gd2t0UG9seTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5pZ29TcGF0aWFsU2VsZWN0b3IgPT09ICdmaXhlZEV4dGVudCcpIHtcclxuICAgICAgICAgIHdrdFBvbHkgPSB0aGlzLndrdFNlcnZpY2UuZXh0ZW50VG9Xa3QoXHJcbiAgICAgICAgICAgIG1hcFByb2plY3Rpb24sXHJcbiAgICAgICAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpLFxyXG4gICAgICAgICAgICBtYXBQcm9qZWN0aW9uXHJcbiAgICAgICAgICApLndrdFBvbHk7XHJcbiAgICAgICAgICBlbGVtZW50LndrdF9nZW9tZXRyeSA9IHdrdFBvbHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcbn1cclxuIl19