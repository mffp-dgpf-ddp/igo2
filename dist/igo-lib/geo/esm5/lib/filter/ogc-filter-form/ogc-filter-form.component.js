/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import * as olstyle from 'ol/style';
import { OgcFilterWriter } from '../../filter/shared/ogc-filter';
import { WktService } from '../../wkt/shared/wkt.service';
import { IgoMap } from '../../map';
var OgcFilterFormComponent = /** @class */ (function () {
    function OgcFilterFormComponent(cdRef, wktService) {
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
    Object.defineProperty(OgcFilterFormComponent.prototype, "datasource", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSource;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._dataSource = value;
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterFormComponent.prototype, "showFeatureOnMap", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showFeatureOnMap;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showFeatureOnMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterFormComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OgcFilterFormComponent.prototype, "currentFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentFilter;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._currentFilter = value;
        },
        enumerable: true,
        configurable: true
    });
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
    OgcFilterFormComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.map) {
            this.activeFilters
                .filter((/**
             * @param {?} af
             * @return {?}
             */
            function (af) { return ['Contains', 'Intersects', 'Within'].indexOf(af.operator) !== -1; }))
                .forEach((/**
             * @param {?} activeFilterSpatial
             * @return {?}
             */
            function (activeFilterSpatial) {
                if (activeFilterSpatial.wkt_geometry) {
                    _this.addWktAsOverlay(activeFilterSpatial.wkt_geometry, activeFilterSpatial.filterid, _this.map.projection);
                }
            }));
        }
    };
    /**
     * @param {?=} init
     * @return {?}
     */
    OgcFilterFormComponent.prototype.updateField = /**
     * @param {?=} init
     * @return {?}
     */
    function (init) {
        var _this = this;
        if (init === void 0) { init = true; }
        if (!this.datasource.options.sourceFields) {
            return;
        }
        this.fields = this.datasource.options.sourceFields.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
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
     * @private
     * @param {?} wkt
     * @param {?} filterid
     * @param {?} projection
     * @return {?}
     */
    OgcFilterFormComponent.prototype.addWktAsOverlay = /**
     * @private
     * @param {?} wkt
     * @param {?} filterid
     * @param {?} projection
     * @return {?}
     */
    function (wkt, filterid, projection) {
        /** @type {?} */
        var wktAsFeature = this.wktService.wktToFeature(wkt, projection);
        wktAsFeature.setId(this.baseOverlayName + filterid);
        /** @type {?} */
        var opacity = 0;
        if (this.showFeatureOnMap) {
            opacity = 0.5;
        }
        /** @type {?} */
        var stroke = new olstyle.Stroke({
            width: 2,
            color: [125, 136, 140, opacity]
        });
        return new olstyle.Style({
            stroke: stroke,
            image: new olstyle.Circle({
                radius: 5,
                stroke: stroke
            })
        });
        this.map.overlay.addOlFeature(wktAsFeature);
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
        /** @type {?} */
        var mapProjection = this.map.projection;
        if (event.checked) {
            if (filter.wkt_geometry !== '') {
                this.addWktAsOverlay(filter.wkt_geometry, filter.filterid, mapProjection);
            }
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
        if (this.operators[filter.operator].spatial === false) {
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
            if (wktPoly) {
                _this.addWktAsOverlay(wktPoly, filter.filterid, mapProjection);
            }
        }));
        this.refreshFilters();
    };
    OgcFilterFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter-form',
                    template: "<mat-list-item>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\">\r\n    <mat-select class=\"logical\" [disabled]=\"!currentFilter.active\" (selectionChange)=\"refreshFilters()\" [(ngModel)]=\"currentFilter.parentLogical\"\r\n      *ngIf=\"activeFilters.indexOf(currentFilter) !== 0 && currentFilter.active===true\">\r\n      <mat-option value=\"And\">{{'igo.geo.operators.And' | translate}}</mat-option>\r\n      <mat-option value=\"Or\">{{'igo.geo.operators.Or' | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <span *ngIf=\"fields && fields.length > 0 && fields[0].name !== ''\">\r\n      <mat-select [disabled]=\"!currentFilter.active\" *ngIf=\"['Contains','Intersects','Within'].indexOf(currentFilter.operator) === -1\"\r\n        [(ngModel)]=\"currentFilter.propertyName\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.sourceFields.selectField' | translate\"\r\n        (selectionChange)=\"updateField(false)\">\r\n        <mat-option *ngFor=\"let field of fields\" [value]=\"field.name\">{{field.alias}}</mat-option>\r\n      </mat-select>\r\n    </span>\r\n    <span *ngIf=\"fields && fields.length === 1 && fields[0].name === ''\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput #fieldPerUser (keyup)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\"\r\n          (blur)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\" [(ngModel)]=\"currentFilter.propertyName\">\r\n\r\n        <button mat-button *ngIf=\"currentFilter.propertyName\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.propertyName=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of operators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n\r\n    <!-- PropertyIsEqualTo -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsEqualTo' || currentFilter.operator === 'PropertyIsNotEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionequalto (keyup)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsEqualTo  -->\r\n\r\n\r\n    <!-- PropertyIsLike  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsLike'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #pattern (keyup)=\"changeProperty(currentFilter,'pattern',pattern.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'pattern',pattern.value)\" [ngModel]=\"currentFilter.pattern\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.pattern\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.pattern=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsLike  -->\r\n\r\n    <!-- PropertyIsNull  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsNull'\"></span>\r\n    <!-- PropertyIsNull  -->\r\n\r\n    <!-- PropertyIs_Than  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsGreaterThan' || currentFilter.operator === 'PropertyIsGreaterThanOrEqualTo' || currentFilter.operator === 'PropertyIsLessThan' || currentFilter.operator === 'PropertyIsLessThanOrEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionthan type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n    </span>\r\n    <!-- PropertyIs_Than  -->\r\n\r\n\r\n    <!-- PropertyIsBetween -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsBetween'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #lowerBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\" [ngModel]=\"currentFilter.lowerBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.lowerBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.lowerBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #upperBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\" [ngModel]=\"currentFilter.upperBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.upperBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.upperBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsBetween  -->\r\n\r\n\r\n    <!-- During -->\r\n    <span *ngIf=\"currentFilter.operator === 'During'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #begin (keyup)=\"changeProperty(currentFilter,'begin',begin.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'begin',begin.value)\" [ngModel]=\"currentFilter.begin\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values \" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.begin\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.begin=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #end (keyup)=\"changeProperty(currentFilter,'end',end.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'end',end.value)\" [ngModel]=\"currentFilter.end\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.end\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.end=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n\r\n    </span>\r\n    <!-- During  -->\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n\r\n\r\n  <!-- PropertySpatial  -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of operators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.igoSpatialSelector\" (selectionChange)=\"changeGeometry(currentFilter,value)\">\r\n      <mat-option *ngFor=\"let igoSpatialSelector of igoSpatialSelectors\" [value]=\"igoSpatialSelector.type\">{{('igo.geo.spatialSelector.'+ igoSpatialSelector.type) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <button mat-button [disabled]=\"!currentFilter.active\" *ngIf=\"currentFilter.igoSpatialSelector === 'fixedExtent'\"\r\n      matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"changeGeometry(currentFilter,value)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.spatialSelector.btnSetExtent' | translate\">\r\n      <mat-icon svgIcon=\"zoom-out_map\"></mat-icon>\r\n    </button>\r\n\r\n\r\n    <mat-form-field *ngIf=\"currentFilter.igoSpatialSelector === 'snrc'\">\r\n      <input matInput #htmlSnrc (keyup)=\"changeGeometry(currentFilter,htmlSnrc.value)\" (blur)=\"changeGeometry(currentFilter,htmlSnrc.value)\"\r\n        [(ngModel)]=\"snrc\">\r\n      <button mat-button *ngIf=\"snrc\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"snrc=''\">\r\n        <mat-icon svgIcon=\"close\"></mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- PropertySpatial  -->\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <mat-slide-toggle class=\"example-margin\" (change)=\"toggleFilterState($event,currentFilter,'active')\" tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"currentFilter.active\"\r\n        [disabled]=\"disabled\">\r\n      </mat-slide-toggle>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.removeFilter' | translate\"\r\n        color=\"warn\" (click)=\"deleteFilter(currentFilter)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <mat-divider></mat-divider>\r\n</mat-list-item>\r\n",
                    styles: [":host{overflow:hidden}.mat-list-item{height:auto}.mat-list-item>>>div.mat-list-item-content{display:inline-table}.logical{font-weight:700}input,mat-select{margin-top:10px;text-align:center}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-button-group{float:center;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
                }] }
    ];
    /** @nocollapse */
    OgcFilterFormComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: WktService }
    ]; };
    OgcFilterFormComponent.propDecorators = {
        refreshFilters: [{ type: Input }],
        datasource: [{ type: Input }],
        showFeatureOnMap: [{ type: Input }],
        map: [{ type: Input }],
        currentFilter: [{ type: Input }]
    };
    return OgcFilterFormComponent;
}());
export { OgcFilterFormComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvb2djLWZpbHRlci1mb3JtL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQU9wQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkM7SUFpRUUsZ0NBQ1UsS0FBd0IsRUFDeEIsVUFBc0I7UUFEdEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTNEeEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFHMUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUlYLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDbEIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUdWLG9CQUFlLEdBQUcsbUJBQW1CLENBQUM7UUFrRDNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM3QywyREFBMkQ7UUFDM0Qsb0RBQW9EO1FBQ3BELDREQUE0RDtRQUM1RCw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekI7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7YUFDcEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0YsQ0FBQztRQUNGLG9DQUFvQztJQUN0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QmhCLEtBQUs7NkJBRUwsS0FBSzttQ0FTTCxLQUFLO3NCQVFMLEtBQUs7Z0NBUUwsS0FBSzs7SUEwTVIsNkJBQUM7Q0FBQSxBQTVQRCxJQTRQQztTQXZQWSxzQkFBc0I7Ozs7OztJQUNqQyxpREFBeUM7Ozs7O0lBQ3pDLDZDQUE2Qzs7Ozs7SUFDN0MsZ0RBQWlDOztJQUNqQywyQ0FBaUI7O0lBQ2pCLHFEQUEyQjs7SUFDM0IsdUNBQWtCOztJQUNsQiwrQ0FBcUI7O0lBQ3JCLHdDQUFxQjs7SUFDckIsd0NBQXFCOztJQUNyQix1Q0FBeUI7O0lBQ3pCLHNDQUFpQjs7SUFDakIsMENBQWdCOzs7OztJQUNoQixzQ0FBcUI7O0lBQ3JCLGlEQUE2Qzs7Ozs7SUFDN0MsbURBQW1DOztJQUduQyxnREFBa0M7Ozs7O0lBMkNoQyx1Q0FBZ0M7Ozs7O0lBQ2hDLDRDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLFxyXG4gIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlLFxyXG4gIE9nY0ZpbHRlcnNPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQvb2djLWZpbHRlcic7XHJcbmltcG9ydCB7IFdrdFNlcnZpY2UgfSBmcm9tICcuLi8uLi93a3Qvc2hhcmVkL3drdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXItZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcclxuICBwcml2YXRlIG9nY0ZpbHRlcldyaXRlcjogT2djRmlsdGVyV3JpdGVyO1xyXG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRGaWx0ZXI6IGFueSA9IHt9O1xyXG4gIHB1YmxpYyBvcGVyYXRvcnM7XHJcbiAgcHVibGljIGlnb1NwYXRpYWxTZWxlY3RvcnM7XHJcbiAgcHVibGljIHZhbHVlID0gJyc7XHJcbiAgcHVibGljIGlucHV0T3BlcmF0b3I7XHJcbiAgcHVibGljIGZpZWxkczogYW55W107XHJcbiAgcHVibGljIHZhbHVlczogYW55W107XHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHB1YmxpYyBzbnJjID0gJyc7XHJcbiAgcHVibGljIGRpc2FibGVkO1xyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG4gIHB1YmxpYyBiYXNlT3ZlcmxheU5hbWUgPSAnb2djRmlsdGVyT3ZlcmxheV8nO1xyXG4gIHByaXZhdGUgX3Nob3dGZWF0dXJlT25NYXA6IGJvb2xlYW47XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcclxuICBASW5wdXQoKSByZWZyZXNoRmlsdGVyczogRnVuY3Rpb247XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRhdGFzb3VyY2UoKTogT2djRmlsdGVyYWJsZURhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XHJcbiAgfVxyXG4gIHNldCBkYXRhc291cmNlKHZhbHVlOiBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZSkge1xyXG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzaG93RmVhdHVyZU9uTWFwKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nob3dGZWF0dXJlT25NYXA7XHJcbiAgfVxyXG4gIHNldCBzaG93RmVhdHVyZU9uTWFwKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93RmVhdHVyZU9uTWFwID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjdXJyZW50RmlsdGVyKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEZpbHRlcjtcclxuICB9XHJcbiAgc2V0IGN1cnJlbnRGaWx0ZXIodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fY3VycmVudEZpbHRlciA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFjdGl2ZUZpbHRlcnMoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZpZWxkKCk7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzLmZpbHRlcihcclxuICAgICAgZiA9PiBmLmFjdGl2ZSA9PT0gdHJ1ZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHdrdFNlcnZpY2U6IFdrdFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMub2djRmlsdGVyV3JpdGVyID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpO1xyXG4gICAgLy8gVE9ETzogRmlsdGVyIHBlcm1pdHRlZCBvcGVyYXRvciBiYXNlZCBvbiB3ZnNjYXBhYmlsaXRpZXNcclxuICAgIC8vIE5lZWQgdG8gd29yayBvbiByZWdleCBvbiBYTUwgY2FwYWJpbGl0aWVzIGJlY2F1c2VcclxuICAgIC8vIGNvbWFwYXJpc29uIG9wZXJhdG9yJ3MgbmFtZSB2YXJpZXMgYmV0d2VlbiBXRlMgc2VydmVycy4uLlxyXG4gICAgLy8gRXg6IElzTnVsbCB2cyBQcm9wZXJ0eUlzTnVsbCB2cyBJc05pbCAuLi5cclxuICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5vZ2NGaWx0ZXJXcml0ZXIub3BlcmF0b3JzO1xyXG4gICAgdGhpcy5pZ29TcGF0aWFsU2VsZWN0b3JzID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogJ2ZpeGVkRXh0ZW50J1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogJ3NucmMnXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgICAvLyBUT0RPOiBzZWxlY3RGZWF0dXJlICYgZHJhd0ZlYXR1cmVcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIGlmICh0aGlzLm1hcCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUZpbHRlcnNcclxuICAgICAgICAuZmlsdGVyKFxyXG4gICAgICAgICAgYWYgPT4gWydDb250YWlucycsICdJbnRlcnNlY3RzJywgJ1dpdGhpbiddLmluZGV4T2YoYWYub3BlcmF0b3IpICE9PSAtMVxyXG4gICAgICAgIClcclxuICAgICAgICAuZm9yRWFjaChhY3RpdmVGaWx0ZXJTcGF0aWFsID0+IHtcclxuICAgICAgICAgIGlmIChhY3RpdmVGaWx0ZXJTcGF0aWFsLndrdF9nZW9tZXRyeSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFdrdEFzT3ZlcmxheShcclxuICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXJTcGF0aWFsLndrdF9nZW9tZXRyeSxcclxuICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXJTcGF0aWFsLmZpbHRlcmlkLFxyXG4gICAgICAgICAgICAgIHRoaXMubWFwLnByb2plY3Rpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZUZpZWxkKGluaXQgPSB0cnVlKSB7XHJcbiAgICBpZiAoIXRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGlmIChhLm5hbWUgPCBiLm5hbWUpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH0gZWxzZSBpZiAoYS5uYW1lID4gYi5uYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzXHJcbiAgICAgIC5maWx0ZXIoZiA9PiBmLm5hbWUgPT09IHRoaXMuY3VycmVudEZpbHRlci5wcm9wZXJ0eU5hbWUpXHJcbiAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gZWxlbWVudC52YWx1ZXMgIT09IHVuZGVmaW5lZCA/IGVsZW1lbnQudmFsdWVzLnNvcnQoKSA6IFtdO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkV2t0QXNPdmVybGF5KHdrdCwgZmlsdGVyaWQsIHByb2plY3Rpb24pIHtcclxuICAgIGNvbnN0IHdrdEFzRmVhdHVyZSA9IHRoaXMud2t0U2VydmljZS53a3RUb0ZlYXR1cmUod2t0LCBwcm9qZWN0aW9uKTtcclxuICAgIHdrdEFzRmVhdHVyZS5zZXRJZCh0aGlzLmJhc2VPdmVybGF5TmFtZSArIGZpbHRlcmlkKTtcclxuICAgIGxldCBvcGFjaXR5ID0gMDtcclxuICAgIGlmICh0aGlzLnNob3dGZWF0dXJlT25NYXApIHtcclxuICAgICAgb3BhY2l0eSA9IDAuNTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdHJva2UgPSBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICB3aWR0aDogMixcclxuICAgICAgY29sb3I6IFsxMjUsIDEzNiwgMTQwLCBvcGFjaXR5XVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgc3Ryb2tlLFxyXG4gICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICByYWRpdXM6IDUsXHJcbiAgICAgICAgc3Ryb2tlXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcC5vdmVybGF5LmFkZE9sRmVhdHVyZSh3a3RBc0ZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRmlsdGVyU3RhdGUoZXZlbnQsIGZpbHRlcjogT2djSW50ZXJmYWNlRmlsdGVyT3B0aW9ucywgcHJvcGVydHkpIHtcclxuICAgIHRoaXMudXBkYXRlRmllbGQoKTtcclxuICAgIGNvbnN0IG1hcFByb2plY3Rpb24gPSB0aGlzLm1hcC5wcm9qZWN0aW9uO1xyXG4gICAgaWYgKGV2ZW50LmNoZWNrZWQpIHtcclxuICAgICAgaWYgKGZpbHRlci53a3RfZ2VvbWV0cnkgIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5hZGRXa3RBc092ZXJsYXkoXHJcbiAgICAgICAgICBmaWx0ZXIud2t0X2dlb21ldHJ5LFxyXG4gICAgICAgICAgZmlsdGVyLmZpbHRlcmlkLFxyXG4gICAgICAgICAgbWFwUHJvamVjdGlvblxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuICAgICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWx0ZXIoZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zKSB7XHJcbiAgICBjb25zdCBvZ2NGaWx0ZXJzOiBPZ2NGaWx0ZXJzT3B0aW9ucyA9IHRoaXMuZGF0YXNvdXJjZS5vcHRpb25zLm9nY0ZpbHRlcnM7XHJcbiAgICBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMgPSBvZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnMuZmlsdGVyKFxyXG4gICAgICBmID0+IGYuZmlsdGVyaWQgIT09IGZpbHRlci5maWx0ZXJpZFxyXG4gICAgKTtcclxuICAgIHRoaXMucmVtb3ZlT3ZlcmxheUJ5SUQoZmlsdGVyLmZpbHRlcmlkKTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VOdW1lcmljUHJvcGVydHkoZmlsdGVyOiBPZ2NJbnRlcmZhY2VGaWx0ZXJPcHRpb25zLCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIHRoaXMuY2hhbmdlUHJvcGVydHkoZmlsdGVyLCBwcm9wZXJ0eSwgcGFyc2VGbG9hdCh2YWx1ZSkpO1xyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVPdmVybGF5QnlJRChpZCkge1xyXG4gICAgY29uc3Qgb3ZlcmxheUlkID0gdGhpcy5iYXNlT3ZlcmxheU5hbWUgKyBpZDtcclxuICAgIGlmICh0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQob3ZlcmxheUlkKSkge1xyXG4gICAgICB0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZShcclxuICAgICAgICB0aGlzLm1hcC5vdmVybGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQob3ZlcmxheUlkKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlT3BlcmF0b3IoZmlsdGVyKSB7XHJcbiAgICBpZiAodGhpcy5vcGVyYXRvcnNbZmlsdGVyLm9wZXJhdG9yXS5zcGF0aWFsID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnJlbW92ZU92ZXJsYXlCeUlEKGZpbHRlci5maWx0ZXJpZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQcm9wZXJ0eShmaWx0ZXI6IE9nY0ludGVyZmFjZUZpbHRlck9wdGlvbnMsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgdGhpcy5kYXRhc291cmNlLm9wdGlvbnMub2djRmlsdGVycy5pbnRlcmZhY2VPZ2NGaWx0ZXJzXHJcbiAgICAgIC5maWx0ZXIoZiA9PiBmLmZpbHRlcmlkID09PSBmaWx0ZXIuZmlsdGVyaWQpXHJcbiAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGVsZW1lbnRbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlR2VvbWV0cnkoZmlsdGVyLCB2YWx1ZT8pIHtcclxuICAgIGNvbnN0IGNoZWNrU05SQzUwayA9IC9cXGR7MiwzfVthLWxdWzAsMV1bMC05XS9naTtcclxuICAgIGNvbnN0IGNoZWNrU05SQzI1MGsgPSAvXFxkezIsM31bYS1wXS9naTtcclxuICAgIGNvbnN0IGNoZWNrU05SQzFtID0gL1xcZHsyLDN9L2dpO1xyXG4gICAgY29uc3QgbWFwUHJvamVjdGlvbiA9IHRoaXMubWFwLnByb2plY3Rpb247XHJcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXlCeUlEKGZpbHRlci5maWx0ZXJpZCk7XHJcbiAgICB0aGlzLmRhdGFzb3VyY2Uub3B0aW9ucy5vZ2NGaWx0ZXJzLmludGVyZmFjZU9nY0ZpbHRlcnNcclxuICAgICAgLmZpbHRlcihmID0+IGYuZmlsdGVyaWQgPT09IGZpbHRlci5maWx0ZXJpZClcclxuICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgbGV0IHdrdFBvbHk7XHJcbiAgICAgICAgaWYgKGZpbHRlci5pZ29TcGF0aWFsU2VsZWN0b3IgPT09ICdzbnJjJykge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyAmJiB0aGlzLnNucmMgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHdrdFBvbHkgPSB0aGlzLndrdFNlcnZpY2Uuc25yY1RvV2t0KHRoaXMuc25yYykud2t0UG9seTtcclxuICAgICAgICAgICAgZWxlbWVudC53a3RfZ2VvbWV0cnkgPSB3a3RQb2x5O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgdmFsdWUgIT09ICcnICYmXHJcbiAgICAgICAgICAgIChjaGVja1NOUkMxbS50ZXN0KHZhbHVlKSB8fFxyXG4gICAgICAgICAgICAgIGNoZWNrU05SQzI1MGsudGVzdCh2YWx1ZSkgfHxcclxuICAgICAgICAgICAgICBjaGVja1NOUkM1MGsudGVzdCh2YWx1ZSkpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgd2t0UG9seSA9IHRoaXMud2t0U2VydmljZS5zbnJjVG9Xa3QodmFsdWUpLndrdFBvbHk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQud2t0X2dlb21ldHJ5ID0gd2t0UG9seTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5pZ29TcGF0aWFsU2VsZWN0b3IgPT09ICdmaXhlZEV4dGVudCcpIHtcclxuICAgICAgICAgIHdrdFBvbHkgPSB0aGlzLndrdFNlcnZpY2UuZXh0ZW50VG9Xa3QoXHJcbiAgICAgICAgICAgIG1hcFByb2plY3Rpb24sXHJcbiAgICAgICAgICAgIHRoaXMubWFwLmdldEV4dGVudCgpLFxyXG4gICAgICAgICAgICBtYXBQcm9qZWN0aW9uXHJcbiAgICAgICAgICApLndrdFBvbHk7XHJcbiAgICAgICAgICBlbGVtZW50LndrdF9nZW9tZXRyeSA9IHdrdFBvbHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3a3RQb2x5KSB7XHJcbiAgICAgICAgICB0aGlzLmFkZFdrdEFzT3ZlcmxheSh3a3RQb2x5LCBmaWx0ZXIuZmlsdGVyaWQsIG1hcFByb2plY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2hGaWx0ZXJzKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==