/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { OgcFilterWriter } from '../../filter/shared/ogc-filter';
import { WktService } from '../../wkt/shared/wkt.service';
import { IgoMap } from '../../map';
import { BehaviorSubject } from 'rxjs';
var OgcFilterFormComponent = /** @class */ (function () {
    function OgcFilterFormComponent(wktService) {
        this.wktService = wktService;
        this.ogcFilterOperators$ = new BehaviorSubject(undefined);
        this.value = '';
        // public fields: any[];
        this.fields$ = new BehaviorSubject([]);
        this.color = 'primary';
        this.snrc = '';
        this.baseOverlayName = 'ogcFilterOverlay_';
        this.currentFilter$ = new BehaviorSubject(undefined);
        this.floatLabel = 'never';
        // TODO: Filter permitted operator based on wfscapabilities
        // Need to work on regex on XML capabilities because
        // comaparison operator's name varies between WFS servers...
        // Ex: IsNull vs PropertyIsNull vs IsNil ...
        this.allOgcFilterOperators = new OgcFilterWriter().operators;
        this.ogcFilterOperators$.next(this.allOgcFilterOperators);
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
    Object.defineProperty(OgcFilterFormComponent.prototype, "currentFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentFilter$.value;
        },
        set: /**
         * @param {?} currentFilter
         * @return {?}
         */
        function (currentFilter) {
            this.currentFilter$.next(currentFilter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterFormComponent.prototype, "activeFilters", {
        get: /**
         * @return {?}
         */
        function () {
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
        this.updateField();
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
        /** @type {?} */
        var fields = this.datasource.options.sourceFields
            .filter((/**
         * @param {?} sf
         * @return {?}
         */
        function (sf) { return (sf.excludeFromOgcFilters === undefined || !sf.excludeFromOgcFilters); }));
        fields.filter((/**
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
        this.fields$.next(fields);
        /** @type {?} */
        var allowedOperators = new OgcFilterWriter().computeAllowedOperators(fields, this.currentFilter.propertyName, this.datasource.options.ogcFilters.allowedOperatorsType);
        this.ogcFilterOperators$.next(allowedOperators);
        if (Object.keys(allowedOperators).indexOf(this.currentFilter$.value.operator) === -1) {
            this.currentFilter$.value.operator = Object.keys(allowedOperators)[0];
        }
        this.refreshFilters();
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
        if (this.ogcFilterOperators$.value[filter.operator].spatial === false) {
            this.removeOverlayByID(filter.filterid);
        }
        this.refreshFilters();
    };
    // Issue with mapserver 7.2 and Postgis layers. Fixed in 7.4
    // Due to this issue, the checkbox is hide.
    // Issue with mapserver 7.2 and Postgis layers. Fixed in 7.4
    // Due to this issue, the checkbox is hide.
    /**
     * @param {?} matchCase
     * @return {?}
     */
    OgcFilterFormComponent.prototype.changeCaseSensitive = 
    // Issue with mapserver 7.2 and Postgis layers. Fixed in 7.4
    // Due to this issue, the checkbox is hide.
    /**
     * @param {?} matchCase
     * @return {?}
     */
    function (matchCase) {
        this.currentFilter.matchCase = matchCase.checked;
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
                    template: "<mat-list-item class=\"mat-typography\">\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\">\r\n    <mat-select class=\"logical\" [disabled]=\"!currentFilter.active\" (selectionChange)=\"refreshFilters()\" [(ngModel)]=\"currentFilter.parentLogical\"\r\n      *ngIf=\"activeFilters.indexOf(currentFilter) !== 0 && currentFilter.active===true\">\r\n      <mat-option tooltip-position=\"above\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.operators.tooltip.And' | translate\" value=\"And\">{{'igo.geo.operators.And' | translate}}</mat-option>\r\n      <mat-option tooltip-position=\"above\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.operators.tooltip.Or' | translate\" value=\"Or\">{{'igo.geo.operators.Or' | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <span *ngIf=\"(fields$ | async) && (fields$| async).length > 0 && (fields$| async)[0].name !== ''\">\r\n      <mat-select [disabled]=\"!currentFilter.active\" *ngIf=\"['Contains','Intersects','Within'].indexOf(currentFilter.operator) === -1\"\r\n        [(ngModel)]=\"currentFilter.propertyName\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.sourceFields.selectField' | translate\"\r\n        (selectionChange)=\"updateField()\">\r\n        <mat-option *ngFor=\"let field of  (fields$| async)\" [value]=\"field.name\">{{field.alias}}</mat-option>\r\n      </mat-select>\r\n    </span>\r\n    <span *ngIf=\" (fields$| async) &&  (fields$| async).length === 1 &&  (fields$| async)[0].name === ''\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput #fieldPerUser (keyup)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\"\r\n          (blur)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\" [(ngModel)]=\"currentFilter.propertyName\">\r\n\r\n        <button mat-button *ngIf=\"currentFilter.propertyName\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.propertyName=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <mat-select \r\n    tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.selectOperator' | translate\"\r\n    [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of (ogcFilterOperators$ | async) | keyvalue\" [value]=\"operator.key\" tooltip-position=\"above\" matTooltipShowDelay=\"500\" [matTooltip]=\"('igo.geo.operators.tooltip.'+ operator.key) | translate\" >{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n\r\n    <!-- PropertyIsEqualTo -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsEqualTo' || currentFilter.operator === 'PropertyIsNotEqualTo'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionequalto (keyup)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsEqualTo  -->\r\n\r\n\r\n    <!-- PropertyIsLike  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsLike'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #pattern (keyup)=\"changeProperty(currentFilter,'pattern',pattern.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'pattern',pattern.value)\" [ngModel]=\"currentFilter.pattern\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.pattern\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.pattern=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsLike  -->\r\n\r\n    <!-- PropertyIsNull  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsNull'\"></span>\r\n    <!-- PropertyIsNull  -->\r\n\r\n    <!-- PropertyIs_Than  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsGreaterThan' || currentFilter.operator === 'PropertyIsGreaterThanOrEqualTo' || currentFilter.operator === 'PropertyIsLessThan' || currentFilter.operator === 'PropertyIsLessThanOrEqualTo'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionthan type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n    </span>\r\n    <!-- PropertyIs_Than  -->\r\n\r\n\r\n    <!-- PropertyIsBetween -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsBetween'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #lowerBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\" [ngModel]=\"currentFilter.lowerBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.lowerBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.lowerBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #upperBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\" [ngModel]=\"currentFilter.upperBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.upperBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.upperBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsBetween  -->\r\n\r\n\r\n    <!-- During -->\r\n    <span *ngIf=\"currentFilter.operator === 'During'\">\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #begin (keyup)=\"changeProperty(currentFilter,'begin',begin.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'begin',begin.value)\" [ngModel]=\"currentFilter.begin\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values \" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.begin\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.begin=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field [floatLabel]=\"floatLabel\">\r\n        <input [placeholder]=\"'igo.geo.filter.placeholder' | translate\" [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #end (keyup)=\"changeProperty(currentFilter,'end',end.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'end',end.value)\" [ngModel]=\"currentFilter.end\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\" matTooltipShowDelay=\"500\" [matTooltip]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.end\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.end=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n\r\n    </span>\r\n    <!-- During  -->\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n\r\n\r\n  <!-- PropertySpatial  -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select  \r\n      matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.selectOperator' | translate\" tooltip-position=\"below\"\r\n      [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of (ogcFilterOperators$ | async) | keyvalue\" [value]=\"operator.key\"  tooltip-position=\"above\" matTooltipShowDelay=\"500\" [matTooltip]=\"('igo.geo.operators.tooltip.'+ operator.key) | translate\" >{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.igoSpatialSelector\" (selectionChange)=\"changeGeometry(currentFilter,value)\">\r\n      <mat-option *ngFor=\"let igoSpatialSelector of igoSpatialSelectors\" [value]=\"igoSpatialSelector.type\">{{('igo.geo.spatialSelector.'+ igoSpatialSelector.type) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <button mat-button [disabled]=\"!currentFilter.active\" *ngIf=\"currentFilter.igoSpatialSelector === 'fixedExtent'\"\r\n      matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"changeGeometry(currentFilter,value)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.spatialSelector.btnSetExtent' | translate\">\r\n      <mat-icon svgIcon=\"arrow-expand-all\"></mat-icon>\r\n    </button>\r\n\r\n\r\n    <mat-form-field *ngIf=\"currentFilter.igoSpatialSelector === 'snrc'\" [floatLabel]=\"floatLabel\">\r\n      <input [placeholder]=\"'igo.geo.filter.placeholderSnrc' | translate\" matInput #htmlSnrc (keyup)=\"changeGeometry(currentFilter,htmlSnrc.value)\" (blur)=\"changeGeometry(currentFilter,htmlSnrc.value)\"\r\n        [(ngModel)]=\"snrc\">\r\n      <button mat-button *ngIf=\"snrc\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"snrc=''\">\r\n        <mat-icon svgIcon=\"close\"></mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- PropertySpatial  -->\r\n\r\n  <!-- <mat-checkbox labelPosition='before' (change)=\"changeCaseSensitive($event)\" [(ngModel)]=\"currentFilter.matchCase\">\r\n    {{('igo.geo.operators.caseSensitive') | translate}}\r\n  </mat-checkbox> -->\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <mat-slide-toggle class=\"example-margin\" (change)=\"toggleFilterState($event,currentFilter,'active')\" tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"currentFilter.active\"\r\n        [disabled]=\"disabled\">\r\n      </mat-slide-toggle>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.removeFilter' | translate\"\r\n        color=\"warn\" (click)=\"deleteFilter(currentFilter)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <mat-divider></mat-divider>\r\n</mat-list-item>\r\n",
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
    OgcFilterFormComponent.prototype.allOgcFilterOperators;
    /** @type {?} */
    OgcFilterFormComponent.prototype.ogcFilterOperators$;
    /** @type {?} */
    OgcFilterFormComponent.prototype.igoSpatialSelectors;
    /** @type {?} */
    OgcFilterFormComponent.prototype.value;
    /** @type {?} */
    OgcFilterFormComponent.prototype.inputOperator;
    /** @type {?} */
    OgcFilterFormComponent.prototype.fields$;
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
    OgcFilterFormComponent.prototype.currentFilter$;
    /** @type {?} */
    OgcFilterFormComponent.prototype.refreshFilters;
    /** @type {?} */
    OgcFilterFormComponent.prototype.datasource;
    /** @type {?} */
    OgcFilterFormComponent.prototype.map;
    /** @type {?} */
    OgcFilterFormComponent.prototype.floatLabel;
    /**
     * @type {?}
     * @private
     */
    OgcFilterFormComponent.prototype.wktService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci1mb3JtL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVOLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3ZDO0lBMENFLGdDQUNVLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFwQ3pCLHdCQUFtQixHQUFHLElBQUksZUFBZSxDQUF5QixTQUFTLENBQUMsQ0FBQztRQUU3RSxVQUFLLEdBQUcsRUFBRSxDQUFDOztRQUdYLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBOEIsRUFBRSxDQUFDLENBQUM7UUFFL0QsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUNsQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsb0JBQWUsR0FBRyxtQkFBbUIsQ0FBQztRQUN0QyxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFNLFNBQVMsQ0FBQyxDQUFDO1FBZ0JuRCxlQUFVLEdBQW1CLE9BQU8sQ0FBQztRQVc1QywyREFBMkQ7UUFDM0Qsb0RBQW9EO1FBQ3BELDREQUE0RDtRQUM1RCw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQzdELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7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Q0FBeUI7O0lBQ3pCLHNDQUFpQjs7SUFDakIsMENBQWdCOztJQUNoQixpREFBNkM7O0lBQzdDLGdEQUE0RDs7SUFFNUQsZ0RBQW9DOztJQUVwQyw0Q0FBNkM7O0lBRTdDLHFDQUFxQjs7SUFVckIsNENBQThDOzs7OztJQVM1Qyw0Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucyxcclxuICBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSxcclxuICBPZ2NGaWx0ZXJzT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJXcml0ZXIgfSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXInO1xyXG5pbXBvcnQgeyBXa3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vd2t0L3NoYXJlZC93a3Quc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU291cmNlRmllbGRzT3B0aW9uc1BhcmFtcyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXItZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBhbGxPZ2NGaWx0ZXJPcGVyYXRvcnM7XHJcbiAgcHVibGljIG9nY0ZpbHRlck9wZXJhdG9ycyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgW2tleTogc3RyaW5nXTogYW55IH0+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGlnb1NwYXRpYWxTZWxlY3RvcnM7XHJcbiAgcHVibGljIHZhbHVlID0gJyc7XHJcbiAgcHVibGljIGlucHV0T3BlcmF0b3I7XHJcbiAgLy8gcHVibGljIGZpZWxkczogYW55W107XHJcbiAgcHVibGljIGZpZWxkcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNvdXJjZUZpZWxkc09wdGlvbnNQYXJhbXNbXT4oW10pO1xyXG4gIHB1YmxpYyB2YWx1ZXM6IGFueVtdO1xyXG4gIHB1YmxpYyBjb2xvciA9ICdwcmltYXJ5JztcclxuICBwdWJsaWMgc25yYyA9ICcnO1xyXG4gIHB1YmxpYyBkaXNhYmxlZDtcclxuICBwdWJsaWMgYmFzZU92ZXJsYXlOYW1lID0gJ29nY0ZpbHRlck92ZXJsYXlfJztcclxuICBwdWJsaWMgY3VycmVudEZpbHRlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4odW5kZWZpbmVkKTtcclxuXHJcbiAgQElucHV0KCkgcmVmcmVzaEZpbHRlcnM6ICgpID0+IHZvaWQ7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGFzb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY3VycmVudEZpbHRlcihjdXJyZW50RmlsdGVyOiBhbnkpIHtcclxuICAgIHRoaXMuY3VycmVudEZpbHRlciQubmV4dChjdXJyZW50RmlsdGVyKTtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRGaWx0ZXIoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRGaWx0ZXIkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnbmV2ZXInO1xyXG5cclxuICBnZXQgYWN0aXZlRmlsdGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuYWN0aXZlID09PSB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHdrdFNlcnZpY2U6IFdrdFNlcnZpY2VcclxuICApIHtcclxuICAgIC8vIFRPRE86IEZpbHRlciBwZXJtaXR0ZWQgb3BlcmF0b3IgYmFzZWQgb24gd2ZzY2FwYWJpbGl0aWVzXHJcbiAgICAvLyBOZWVkIHRvIHdvcmsgb24gcmVnZXggb24gWE1MIGNhcGFiaWxpdGllcyBiZWNhdXNlXHJcbiAgICAvLyBjb21hcGFyaXNvbiBvcGVyYXRvcidzIG5hbWUgdmFyaWVzIGJldHdlZW4gV0ZTIHNlcnZlcnMuLi5cclxuICAgIC8vIEV4OiBJc051bGwgdnMgUHJvcGVydHlJc051bGwgdnMgSXNOaWwgLi4uXHJcbiAgICB0aGlzLmFsbE9nY0ZpbHRlck9wZXJhdG9ycyA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKS5vcGVyYXRvcnM7XHJcbiAgICB0aGlzLm9nY0ZpbHRlck9wZXJhdG9ycyQubmV4dCh0aGlzLmFsbE9nY0ZpbHRlck9wZXJhdG9ycyk7XHJcbiAgICB0aGlzLmlnb1NwYXRpYWxTZWxlY3RvcnMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnZml4ZWRFeHRlbnQnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnc25yYydcclxuICAgICAgfVxyXG4gICAgXTtcclxuICAgIC8vIFRPRE86IHNlbGVjdEZlYXR1cmUgJiBkcmF3RmVhdHVyZVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZpZWxkKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWVsZCgpIHtcclxuICAgIGlmICghdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkc1xyXG4gICAgICAuZmlsdGVyKHNmID0+IChzZi5leGNsdWRlRnJvbU9nY0ZpbHRlcnMgPT09IHVuZGVmaW5lZCB8fCAhc2YuZXhjbHVkZUZyb21PZ2NGaWx0ZXJzKSk7XHJcbiAgICBmaWVsZHMuZmlsdGVyKGYgPT4gZi5uYW1lID09PSB0aGlzLmN1cnJlbnRGaWx0ZXIucHJvcGVydHlOYW1lKVxyXG4gICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlcyA9IGVsZW1lbnQudmFsdWVzICE9PSB1bmRlZmluZWQgPyBlbGVtZW50LnZhbHVlcy5zb3J0KCkgOiBbXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5maWVsZHMkLm5leHQoZmllbGRzKTtcclxuICAgIGNvbnN0IGFsbG93ZWRPcGVyYXRvcnMgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCkuY29tcHV0ZUFsbG93ZWRPcGVyYXRvcnMoXHJcbiAgICAgIGZpZWxkcyxcclxuICAgICAgdGhpcy5jdXJyZW50RmlsdGVyLnByb3BlcnR5TmFtZSxcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5hbGxvd2VkT3BlcmF0b3JzVHlwZSk7XHJcbiAgICB0aGlzLm9nY0ZpbHRlck9wZXJhdG9ycyQubmV4dChhbGxvd2VkT3BlcmF0b3JzKTtcclxuICAgIGlmIChPYmplY3Qua2V5cyhhbGxvd2VkT3BlcmF0b3JzKS5pbmRleE9mKHRoaXMuY3VycmVudEZpbHRlciQudmFsdWUub3BlcmF0b3IpID09PSAtMSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRGaWx0ZXIkLnZhbHVlLm9wZXJhdG9yID0gT2JqZWN0LmtleXMoYWxsb3dlZE9wZXJhdG9ycylbMF07XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGaWx0ZXJTdGF0ZShldmVudCwgZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLCBwcm9wZXJ0eSkge1xyXG4gICAgdGhpcy51cGRhdGVGaWVsZCgpO1xyXG4gICAgaWYgKGV2ZW50LmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWx0ZXIoZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zKSB7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzOiBPZ2NGaWx0ZXJzT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuZmlsdGVyaWQgIT09IGZpbHRlci5maWx0ZXJpZFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VOdW1lcmljUHJvcGVydHkoZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIHRoaXMuY2hhbmdlUHJvcGVydHkoZmlsdGVyLCBwcm9wZXJ0eSwgcGFyc2VGbG9hdCh2YWx1ZSkpO1xyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVPdmVybGF5QnlJRChpZCkge1xyXG4gICAgY29uc3Qgb3ZlcmxheUlkID0gdGhpcy5iYXNlT3ZlcmxheU5hbWUgKyBpZDtcclxuICAgIGlmICh0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQob3ZlcmxheUlkKSkge1xyXG4gICAgICB0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZShcclxuICAgICAgICB0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQob3ZlcmxheUlkKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlT3BlcmF0b3IoZmlsdGVyKSB7XHJcbiAgICBpZiAodGhpcy5vZ2NGaWx0ZXJPcGVyYXRvcnMkLnZhbHVlW2ZpbHRlci5vcGVyYXRvcl0uc3BhdGlhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5yZW1vdmVPdmVybGF5QnlJRChmaWx0ZXIuZmlsdGVyaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgLy8gSXNzdWUgd2l0aCBtYXBzZXJ2ZXIgNy4yIGFuZCBQb3N0Z2lzIGxheWVycy4gRml4ZWQgaW4gNy40XHJcbiAgLy8gRHVlIHRvIHRoaXMgaXNzdWUsIHRoZSBjaGVja2JveCBpcyBoaWRlLlxyXG4gIGNoYW5nZUNhc2VTZW5zaXRpdmUobWF0Y2hDYXNlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRGaWx0ZXIubWF0Y2hDYXNlID0gbWF0Y2hDYXNlLmNoZWNrZWQ7XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQcm9wZXJ0eShmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgIC5maWx0ZXIoZiA9PiBmLmZpbHRlcmlkID09PSBmaWx0ZXIuZmlsdGVyaWQpXHJcbiAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlR2VvbWV0cnkoZmlsdGVyLCB2YWx1ZT8pIHtcclxuICAgIGNvbnN0IGNoZWNrU05SQzUwayA9IC9cXGR7MiwzfVthLWxdWzAsMV1bMC05XS9naTtcclxuICAgIGNvbnN0IGNoZWNrU05SQzI1MGsgPSAvXFxkezIsM31bYS1wXS9naTtcclxuICAgIGNvbnN0IGNoZWNrU05SQzFtID0gL1xcZHsyLDN9L2dpO1xyXG4gICAgY29uc3QgbWFwUHJvamVjdGlvbiA9IHRoaXMubWFwLnByb2plY3Rpb247XHJcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXlCeUlEKGZpbHRlci5maWx0ZXJpZCk7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgbGV0IHdrdFBvbHk7XHJcbiAgICAgICAgaWYgKGZpbHRlci5pZ29TcGF0aWFsU2VsZWN0b3IgPT09ICdzbnJjJykge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyAmJiB0aGlzLnNucmMgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHdrdFBvbHkgPSB0aGlzLndrdFNlcnZpY2Uuc25yY1RvV2t0KHRoaXMuc25yYywgdGhpcy5tYXAucHJvamVjdGlvbikud2t0UG9seTtcclxuICAgICAgICAgICAgZWxlbWVudC53a3RfZ2VvbWV0cnkgPSB3a3RQb2x5O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgdmFsdWUgIT09ICcnICYmXHJcbiAgICAgICAgICAgIChjaGVja1NOUkMxbS50ZXN0KHZhbHVlKSB8fFxyXG4gICAgICAgICAgICAgIGNoZWNrU05SQzI1MGsudGVzdCh2YWx1ZSkgfHxcclxuICAgICAgICAgICAgICBjaGVja1NOUkM1MGsudGVzdCh2YWx1ZSkpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgd2t0UG9seSA9IHRoaXMud2t0U2VydmljZS5zbnJjVG9Xa3QodmFsdWUsIHRoaXMubWFwLnByb2plY3Rpb24pLndrdFBvbHk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQud2t0X2dlb21ldHJ5ID0gd2t0UG9seTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5pZ29TcGF0aWFsU2VsZWN0b3IgPT09ICdmaXhlZEV4dGVudCcpIHtcclxuICAgICAgICAgIHdrdFBvbHkgPSB0aGlzLndrdFNlcnZpY2UuZXh0ZW50VG9Xa3QoXHJcbiAgICAgICAgICAgIG1hcFByb2plY3Rpb24sXHJcbiAgICAgICAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpLFxyXG4gICAgICAgICAgICBtYXBQcm9qZWN0aW9uXHJcbiAgICAgICAgICApLndrdFBvbHk7XHJcbiAgICAgICAgICBlbGVtZW50LndrdF9nZW9tZXRyeSA9IHdrdFBvbHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaEZpbHRlcnMoKTtcclxuICB9XHJcbn1cclxuIl19