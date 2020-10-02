/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
import { FEATURE } from '../../../feature';
import { SearchSource } from './source';
import * as olformat from 'ol/format';
/**
 * StoredQueries search source
 */
var StoredQueriesSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(StoredQueriesSearchSource, _super);
    function StoredQueriesSearchSource(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.storedQueriesOptions = (/** @type {?} */ (options));
        if (_this.storedQueriesOptions && !_this.storedQueriesOptions.available) {
            return _this;
        }
        /** @type {?} */
        var defaultStoredqueryId = 'rtss';
        /** @type {?} */
        var defaultFieldSplitter = [
            { name: 'rtss', defaultValue: '-99' },
            { name: 'chainage', defaultValue: '0', splitPrefix: '\\+' }
        ];
        /** @type {?} */
        var defaultOutputformat = 'text/xml; subtype=gml/3.1.1';
        /** @type {?} */
        var defaultSrsname = 'EPSG:4326';
        /** @type {?} */
        var defaultResultTitle = 'title';
        if (!_this.storedQueriesOptions) {
            console.log(' No configuration for this search source (storedqueries). You will use the default values');
            _this.storedQueriesOptions = {
                storedquery_id: defaultStoredqueryId,
                fields: defaultFieldSplitter,
                outputformat: defaultOutputformat,
                srsname: defaultSrsname,
                resultTitle: defaultResultTitle
            };
            _this.resultTitle = defaultResultTitle;
            console.log('Default values', _this.storedQueriesOptions);
        }
        if (!_this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            var err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!_this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You have to set "fields" into options. ex: fields: {"name": "rtss", "defaultValue": "-99"}');
        }
        _this.storedQueriesOptions.outputformat =
            _this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        _this.storedQueriesOptions.srsname =
            _this.storedQueriesOptions.srsname || 'EPSG:4326';
        /** @type {?} */
        var storedQueryId = _this.storedQueriesOptions.storedquery_id.toLowerCase();
        if (storedQueryId.includes('getfeaturebyid') &&
            _this.storedQueriesOptions.outputformat
                .toLowerCase()
                .includes('getfeaturebyid')) {
            /** @type {?} */
            var err = 'You must set a geojson format for your stored query. This is due to an openlayers issue)';
            err += ' (wfs 1.1.0 & gml 3.1.1 limitation)';
            throw new Error(err);
        }
        if (!(_this.storedQueriesOptions.fields instanceof Array)) {
            _this.storedQueriesOptions.fields = [_this.storedQueriesOptions.fields];
        }
        _this.multipleFieldsQuery =
            _this.storedQueriesOptions.fields.length > 1 ? true : false;
        _this.storedQueriesOptions.fields.forEach((/**
         * @param {?} field
         * @param {?} index
         * @return {?}
         */
        function (field, index) {
            if (_this.multipleFieldsQuery && !field.splitPrefix && index !== 0) {
                throw new Error('Stored Queries :You must set a field spliter into your field definition (optional for the first one!)');
            }
            if (!field.defaultValue) {
                throw new Error('Stored Queries :You must set a field default value into your field definition');
            }
        }));
        _this.storedQueriesOptions.resultTitle =
            _this.storedQueriesOptions.resultTitle || _this.resultTitle;
        return _this;
    }
    /**
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return StoredQueriesSearchSource.id;
    };
    /**
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return StoredQueriesSearchSource.type;
    };
    /**
     * @protected
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'Stored Queries',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/ws/swtq'
        };
    };
    // URL CALL EXAMPLES:
    //  GetFeatureById (mandatory storedquery for wfs server) (outputformat must be in geojson)
    //  tslint:disable-next-line:max-line-length
    //  https://geoegl.msp.gouv.qc.ca/apis/ws/swtq?service=wfs&version=2.0.0&request=GetFeature&storedquery_id=urn:ogc:def:query:OGC-WFS::GetFeatureById&srsname=epsg:4326&outputformat=geojson&ID=a_num_route.132
    //  Custom StoredQuery
    //  tslint:disable-next-line:max-line-length
    //  https://geoegl.msp.gouv.qc.ca/apis/ws/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=rtss&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&rtss=0013801110000c&chainage=12
    /**
     * Search a location by name or keyword
     * @param term Location name or keyword
     * @returns Observable of <SearchResult<Feature>[]
     */
    // URL CALL EXAMPLES:
    //  GetFeatureById (mandatory storedquery for wfs server) (outputformat must be in geojson)
    //  tslint:disable-next-line:max-line-length
    //  https://geoegl.msp.gouv.qc.ca/apis/ws/swtq?service=wfs&version=2.0.0&request=GetFeature&storedquery_id=urn:ogc:def:query:OGC-WFS::GetFeatureById&srsname=epsg:4326&outputformat=geojson&ID=a_num_route.132
    //  Custom StoredQuery
    //  tslint:disable-next-line:max-line-length
    //  https://geoegl.msp.gouv.qc.ca/apis/ws/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=rtss&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&rtss=0013801110000c&chainage=12
    /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    StoredQueriesSearchSource.prototype.search = 
    // URL CALL EXAMPLES:
    //  GetFeatureById (mandatory storedquery for wfs server) (outputformat must be in geojson)
    //  tslint:disable-next-line:max-line-length
    //  https://geoegl.msp.gouv.qc.ca/apis/ws/swtq?service=wfs&version=2.0.0&request=GetFeature&storedquery_id=urn:ogc:def:query:OGC-WFS::GetFeatureById&srsname=epsg:4326&outputformat=geojson&ID=a_num_route.132
    //  Custom StoredQuery
    //  tslint:disable-next-line:max-line-length
    //  https://geoegl.msp.gouv.qc.ca/apis/ws/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=rtss&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&rtss=0013801110000c&chainage=12
    /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (term, options) {
        var _this = this;
        /** @type {?} */
        var storedqueriesParams = this.termSplitter(term, this.storedQueriesOptions.fields);
        /** @type {?} */
        var params = this.computeRequestParams(options || {}, storedqueriesParams);
        if (new RegExp('.*?gml.*?', 'i').test(this.storedQueriesOptions.outputformat)) {
            return this.http
                .get(this.searchUrl, { params: params, responseType: 'text' })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                return _this.extractResults(_this.extractWFSData(response));
            })));
        }
        else {
            return this.http.get(this.searchUrl, { params: params }).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                return _this.extractResults(_this.extractWFSData(response));
            })));
        }
    };
    /**
     * @private
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.getFormatFromOptions = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olFormatCls;
        /** @type {?} */
        var outputFormat = this.storedQueriesOptions.outputformat;
        /** @type {?} */
        var patternGml3 = new RegExp('.*?gml.*?', 'i');
        /** @type {?} */
        var patternGeojson = new RegExp('.*?json.*?', 'i');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = olformat.GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = olformat.WFS;
        }
        return new olFormatCls();
    };
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.extractWFSData = /**
     * @private
     * @param {?} res
     * @return {?}
     */
    function (res) {
        /** @type {?} */
        var olFormat = this.getFormatFromOptions();
        /** @type {?} */
        var geojson = olformat.GeoJSON;
        /** @type {?} */
        var wfsfeatures = olFormat.readFeatures(res);
        /** @type {?} */
        var features = JSON.parse(new geojson().writeFeatures(wfsfeatures));
        return features;
    };
    /**
     * @private
     * @param {?} term
     * @param {?} fields
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.termSplitter = /**
     * @private
     * @param {?} term
     * @param {?} fields
     * @return {?}
     */
    function (term, fields) {
        /** @type {?} */
        var splittedTerm = {};
        /** @type {?} */
        var remainingTerm = term;
        /** @type {?} */
        var cnt = 0;
        // Used to build the default values
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            splittedTerm[field.name] = field.defaultValue;
            /** @type {?} */
            var splitterRegex = new RegExp(field.splitPrefix + '(.+)', 'i');
            if (splitterRegex.test(remainingTerm)) {
                cnt = field.splitPrefix ? (cnt += 1) : cnt;
                remainingTerm = remainingTerm.split(splitterRegex)[1];
            }
        }));
        if (cnt === 0) {
            splittedTerm[fields[0].name] = term;
            return splittedTerm;
        }
        remainingTerm = term;
        /** @type {?} */
        var localFields = tslib_1.__spread(fields).reverse();
        localFields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            /** @type {?} */
            var splitterRegex = new RegExp(field.splitPrefix || '' + '(.+)', 'i');
            if (remainingTerm || remainingTerm !== '') {
                /** @type {?} */
                var values = remainingTerm.split(splitterRegex);
                remainingTerm = values[0];
                if (values[1]) {
                    splittedTerm[field.name] = values[1].trim();
                }
            }
        }));
        return splittedTerm;
    };
    /**
     * @private
     * @param {?} options
     * @param {?} queryParams
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.computeRequestParams = /**
     * @private
     * @param {?} options
     * @param {?} queryParams
     * @return {?}
     */
    function (options, queryParams) {
        /** @type {?} */
        var wfsversion = this.storedQueriesOptions.storedquery_id
            .toLowerCase()
            .includes('getfeaturebyid')
            ? '2.0.0'
            : '1.1.0';
        return new HttpParams({
            fromObject: Object.assign({
                service: 'wfs',
                version: wfsversion,
                request: 'GetFeature',
                storedquery_id: this.storedQueriesOptions.storedquery_id,
                srsname: this.storedQueriesOptions.srsname,
                outputformat: this.storedQueriesOptions.outputformat
            }, queryParams, this.params, options.params || {})
        });
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.dataToResult(data);
        }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var id = [this.getId(), properties.type, data.id].join('.');
        /** @type {?} */
        var title = data.properties[this.storedQueriesOptions.resultTitle]
            ? this.storedQueriesOptions.resultTitle
            : this.resultTitle;
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                // extent: data.bbox,
                properties: properties,
                meta: {
                    id: id,
                    title: data.properties[title]
                }
            },
            meta: {
                dataType: FEATURE,
                id: id,
                title: data.properties.title,
                titleHtml: data.properties[title],
                icon: 'map-marker'
            }
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    StoredQueriesSearchSource.prototype.computeProperties = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = ObjectUtils.removeKeys(data.properties, StoredQueriesSearchSource.propertiesBlacklist);
        return properties;
    };
    StoredQueriesSearchSource.id = 'storedqueries';
    StoredQueriesSearchSource.type = FEATURE;
    StoredQueriesSearchSource.propertiesBlacklist = [
        'boundedBy',
        'id',
        'coord_x',
        'coord_y'
    ];
    StoredQueriesSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StoredQueriesSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
    ]; };
    return StoredQueriesSearchSource;
}(SearchSource));
export { StoredQueriesSearchSource };
if (false) {
    /** @type {?} */
    StoredQueriesSearchSource.id;
    /** @type {?} */
    StoredQueriesSearchSource.type;
    /** @type {?} */
    StoredQueriesSearchSource.propertiesBlacklist;
    /** @type {?} */
    StoredQueriesSearchSource.prototype.resultTitle;
    /** @type {?} */
    StoredQueriesSearchSource.prototype.storedQueriesOptions;
    /** @type {?} */
    StoredQueriesSearchSource.prototype.multipleFieldsQuery;
    /**
     * @type {?}
     * @private
     */
    StoredQueriesSearchSource.prototype.http;
}
/**
 * StoredQueriesReverse search source
 */
// EXAMPLE CALLS
// tslint:disable-next-line:max-line-length
// https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=lim_adm&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&long=-71.292469&lat=46.748107
//
var StoredQueriesReverseSearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(StoredQueriesReverseSearchSource, _super);
    function StoredQueriesReverseSearchSource(http, options) {
        var _this = _super.call(this, options) || this;
        _this.http = http;
        _this.storedQueriesOptions = (/** @type {?} */ (options));
        if (!_this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            var err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!_this.storedQueriesOptions.longField) {
            throw new Error('Stored Queries :You have to set "longField" to map the longitude coordinate to the query params.');
        }
        if (!_this.storedQueriesOptions.latField) {
            throw new Error('Stored Queries :You have to set "latField" to map the latitude coordinate to the query params.');
        }
        _this.storedQueriesOptions.outputformat =
            _this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        _this.storedQueriesOptions.srsname =
            _this.storedQueriesOptions.srsname || 'EPSG:4326';
        _this.storedQueriesOptions.resultTitle =
            _this.storedQueriesOptions.resultTitle || _this.resultTitle;
        return _this;
    }
    /**
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return StoredQueriesReverseSearchSource.id;
    };
    /**
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return StoredQueriesReverseSearchSource.type;
    };
    /**
     * @protected
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'Stored Queries (reverse)',
            searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
        };
    };
    /**
     * Search a location by coordinates
     * @param lonLat Location coordinates
     * @param distance Search raidus around lonLat
     * @returns Observable of <SearchResult<Feature>[]
     */
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    StoredQueriesReverseSearchSource.prototype.reverseSearch = /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    function (lonLat, options) {
        var _this = this;
        /** @type {?} */
        var params = this.computeRequestParams(lonLat, options || {});
        if (new RegExp('.*?gml.*?', 'i').test(this.storedQueriesOptions.outputformat)) {
            return this.http
                .get(this.searchUrl, { params: params, responseType: 'text' })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                return _this.extractResults(_this.extractWFSData(response));
            })));
        }
        else {
            return this.http.get(this.searchUrl, { params: params }).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                return _this.extractResults(_this.extractWFSData(response));
            })));
        }
    };
    /**
     * @private
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.getFormatFromOptions = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olFormatCls;
        /** @type {?} */
        var outputFormat = this.storedQueriesOptions.outputformat;
        /** @type {?} */
        var patternGml3 = new RegExp('.*?gml.*?', 'i');
        /** @type {?} */
        var patternGeojson = new RegExp('.*?json.*?', 'i');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = olformat.GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = olformat.WFS;
        }
        return new olFormatCls();
    };
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.extractWFSData = /**
     * @private
     * @param {?} res
     * @return {?}
     */
    function (res) {
        /** @type {?} */
        var olFormat = this.getFormatFromOptions();
        /** @type {?} */
        var geojson = olformat.GeoJSON;
        /** @type {?} */
        var wfsfeatures = olFormat.readFeatures(res);
        /** @type {?} */
        var features = JSON.parse(new geojson().writeFeatures(wfsfeatures));
        return features;
    };
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.computeRequestParams = /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    function (lonLat, options) {
        /** @type {?} */
        var longLatParams = {};
        longLatParams[this.storedQueriesOptions.longField] = lonLat[0];
        longLatParams[this.storedQueriesOptions.latField] = lonLat[1];
        return new HttpParams({
            fromObject: Object.assign({
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                storedquery_id: this.storedQueriesOptions.storedquery_id,
                srsname: this.storedQueriesOptions.srsname,
                outputformat: this.storedQueriesOptions.outputformat
            }, longLatParams, this.params, options.params || {})
        });
    };
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.extractResults = /**
     * @private
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var _this = this;
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return _this.dataToResult(data);
        }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.dataToResult = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = this.computeProperties(data);
        /** @type {?} */
        var id = [this.getId(), properties.type, data.id].join('.');
        /** @type {?} */
        var title = data.properties[this.storedQueriesOptions.resultTitle]
            ? this.storedQueriesOptions.resultTitle
            : this.resultTitle;
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                properties: properties,
                meta: {
                    id: id,
                    title: data.properties[title]
                }
            },
            meta: {
                dataType: FEATURE,
                id: id,
                title: data.properties[title],
                icon: 'map-marker'
            }
        };
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    StoredQueriesReverseSearchSource.prototype.computeProperties = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var properties = ObjectUtils.removeKeys(data.properties, StoredQueriesReverseSearchSource.propertiesBlacklist);
        return Object.assign(properties, { type: data.properties.doc_type });
    };
    StoredQueriesReverseSearchSource.id = 'storedqueriesreverse';
    StoredQueriesReverseSearchSource.type = FEATURE;
    StoredQueriesReverseSearchSource.propertiesBlacklist = [];
    StoredQueriesReverseSearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StoredQueriesReverseSearchSource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
    ]; };
    return StoredQueriesReverseSearchSource;
}(SearchSource));
export { StoredQueriesReverseSearchSource };
if (false) {
    /** @type {?} */
    StoredQueriesReverseSearchSource.id;
    /** @type {?} */
    StoredQueriesReverseSearchSource.type;
    /** @type {?} */
    StoredQueriesReverseSearchSource.propertiesBlacklist;
    /** @type {?} */
    StoredQueriesReverseSearchSource.prototype.resultTitle;
    /** @type {?} */
    StoredQueriesReverseSearchSource.prototype.storedQueriesOptions;
    /** @type {?} */
    StoredQueriesReverseSearchSource.prototype.multipleFieldsQuery;
    /**
     * @type {?}
     * @private
     */
    StoredQueriesReverseSearchSource.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkcXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc3RvcmVkcXVlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLGtCQUFrQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQTZCLE1BQU0sVUFBVSxDQUFDO0FBZ0JuRSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQzs7OztBQUt0QztJQUMrQyxxREFBWTtJQWN6RCxtQ0FDVSxJQUFnQixFQUNMLE9BQTRCO1FBRmpELFlBSUUsa0JBQU0sT0FBTyxDQUFDLFNBaUZmO1FBcEZTLFVBQUksR0FBSixJQUFJLENBQVk7UUFJeEIsS0FBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFBLE9BQU8sRUFBb0MsQ0FBQztRQUN4RSxJQUFJLEtBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUU7O1NBRXRFOztZQUVLLG9CQUFvQixHQUFHLE1BQU07O1lBQzdCLG9CQUFvQixHQUEwQjtZQUNsRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRTtZQUNyQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1NBQzVEOztZQUNLLG1CQUFtQixHQUFHLDZCQUE2Qjs7WUFD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QUFHLE9BQU8sQ0FBQztJQUNmLG9EQUFtQixHQUFhLEVBQUUsQ0FBQzs7Z0JBTDNDLFVBQVU7Ozs7Z0JBM1VGLFVBQVU7Z0RBdVZkLE1BQU0sU0FBQyxTQUFTOztJQXlLckIsdUNBQUM7Q0FBQSxBQXJMRCxDQUNzRCxZQUFZLEdBb0xqRTtTQXBMWSxnQ0FBZ0M7OztJQUUzQyxvQ0FBbUM7O0lBQ25DLHNDQUFzQjs7SUFDdEIscURBQTBDOztJQUMxQyx1REFBNEI7O0lBQzVCLGdFQUFxRTs7SUFDckUsK0RBQW9DOzs7OztJQUdsQyxnREFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoLCBSZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIFNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgVGV4dFNlYXJjaE9wdGlvbnMsXHJcbiAgUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxufSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBTdG9yZWRRdWVyaWVzRGF0YSxcclxuICBTdG9yZWRRdWVyaWVzUmVzcG9uc2UsXHJcbiAgU3RvcmVkUXVlcmllc1JldmVyc2VEYXRhLFxyXG4gIFN0b3JlZFF1ZXJpZXNSZXZlcnNlUmVzcG9uc2UsXHJcbiAgU3RvcmVkUXVlcmllc1NlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgU3RvcmVkUXVlcmllc0ZpZWxkcyxcclxuICBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL3N0b3JlZHF1ZXJpZXMuaW50ZXJmYWNlcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlZFF1ZXJpZXMgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3RvcmVkUXVlcmllc1NlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZVxyXG4gIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ3N0b3JlZHF1ZXJpZXMnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXHJcbiAgICAnYm91bmRlZEJ5JyxcclxuICAgICdpZCcsXHJcbiAgICAnY29vcmRfeCcsXHJcbiAgICAnY29vcmRfeSdcclxuICBdO1xyXG4gIHB1YmxpYyByZXN1bHRUaXRsZTogJ3RpdGxlJztcclxuICBwdWJsaWMgc3RvcmVkUXVlcmllc09wdGlvbnM6IFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBtdWx0aXBsZUZpZWxkc1F1ZXJ5OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMgPSBvcHRpb25zIGFzIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gICAgaWYgKHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMgJiYgIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuYXZhaWxhYmxlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0U3RvcmVkcXVlcnlJZCA9ICdydHNzJztcclxuICAgIGNvbnN0IGRlZmF1bHRGaWVsZFNwbGl0dGVyOiBTdG9yZWRRdWVyaWVzRmllbGRzW10gPSBbXHJcbiAgICAgIHsgbmFtZTogJ3J0c3MnLCBkZWZhdWx0VmFsdWU6ICctOTknIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NoYWluYWdlJywgZGVmYXVsdFZhbHVlOiAnMCcsIHNwbGl0UHJlZml4OiAnXFxcXCsnIH1cclxuICAgIF07XHJcbiAgICBjb25zdCBkZWZhdWx0T3V0cHV0Zm9ybWF0ID0gJ3RleHQveG1sOyBzdWJ0eXBlPWdtbC8zLjEuMSc7XHJcbiAgICBjb25zdCBkZWZhdWx0U3JzbmFtZSA9ICdFUFNHOjQzMjYnO1xyXG4gICAgY29uc3QgZGVmYXVsdFJlc3VsdFRpdGxlID0gJ3RpdGxlJztcclxuXHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgJyBObyBjb25maWd1cmF0aW9uIGZvciB0aGlzIHNlYXJjaCBzb3VyY2UgKHN0b3JlZHF1ZXJpZXMpLiBZb3Ugd2lsbCB1c2UgdGhlIGRlZmF1bHQgdmFsdWVzJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zID0ge1xyXG4gICAgICAgIHN0b3JlZHF1ZXJ5X2lkOiBkZWZhdWx0U3RvcmVkcXVlcnlJZCxcclxuICAgICAgICBmaWVsZHM6IGRlZmF1bHRGaWVsZFNwbGl0dGVyLFxyXG4gICAgICAgIG91dHB1dGZvcm1hdDogZGVmYXVsdE91dHB1dGZvcm1hdCxcclxuICAgICAgICBzcnNuYW1lOiBkZWZhdWx0U3JzbmFtZSxcclxuICAgICAgICByZXN1bHRUaXRsZTogZGVmYXVsdFJlc3VsdFRpdGxlXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucmVzdWx0VGl0bGUgPSBkZWZhdWx0UmVzdWx0VGl0bGU7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdEZWZhdWx0IHZhbHVlcycsIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZCkge1xyXG4gICAgICBjb25zdCBlcnIgPVxyXG4gICAgICAgICdTdG9yZWQgUXVlcmllcyA6WW91IGhhdmUgdG8gc2V0IFwic3RvcmVkcXVlcnlfaWRcIiBpbnRvIFN0b3JlZFF1ZXJpZXMgb3B0aW9ucy4gZXg6IHN0b3JlZHF1ZXJ5X2lkOiBcIm5hbWVvZnN0b3JlZHF1ZXJpZVwiJztcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAnU3RvcmVkIFF1ZXJpZXMgOllvdSBoYXZlIHRvIHNldCBcImZpZWxkc1wiIGludG8gb3B0aW9ucy4gZXg6IGZpZWxkczoge1wibmFtZVwiOiBcInJ0c3NcIiwgXCJkZWZhdWx0VmFsdWVcIjogXCItOTlcIn0nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQgPVxyXG4gICAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCB8fCAndGV4dC94bWw7IHN1YnR5cGU9Z21sLzMuMS4xJztcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSA9XHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSB8fCAnRVBTRzo0MzI2JztcclxuXHJcbiAgICBjb25zdCBzdG9yZWRRdWVyeUlkID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKFxyXG4gICAgICBzdG9yZWRRdWVyeUlkLmluY2x1ZGVzKCdnZXRmZWF0dXJlYnlpZCcpICYmXHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0XHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAuaW5jbHVkZXMoJ2dldGZlYXR1cmVieWlkJylcclxuICAgICkge1xyXG4gICAgICBsZXQgZXJyID1cclxuICAgICAgICAnWW91IG11c3Qgc2V0IGEgZ2VvanNvbiBmb3JtYXQgZm9yIHlvdXIgc3RvcmVkIHF1ZXJ5LiBUaGlzIGlzIGR1ZSB0byBhbiBvcGVubGF5ZXJzIGlzc3VlKSc7XHJcbiAgICAgIGVyciArPSAnICh3ZnMgMS4xLjAgJiBnbWwgMy4xLjEgbGltaXRhdGlvbiknO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoISh0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcyA9IFt0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkc107XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tdWx0aXBsZUZpZWxkc1F1ZXJ5ID1cclxuICAgICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMubGVuZ3RoID4gMSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcy5mb3JFYWNoKChmaWVsZCwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubXVsdGlwbGVGaWVsZHNRdWVyeSAmJiAhZmllbGQuc3BsaXRQcmVmaXggJiYgaW5kZXggIT09IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAnU3RvcmVkIFF1ZXJpZXMgOllvdSBtdXN0IHNldCBhIGZpZWxkIHNwbGl0ZXIgaW50byB5b3VyIGZpZWxkIGRlZmluaXRpb24gKG9wdGlvbmFsIGZvciB0aGUgZmlyc3Qgb25lISknXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZpZWxkLmRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICdTdG9yZWQgUXVlcmllcyA6WW91IG11c3Qgc2V0IGEgZmllbGQgZGVmYXVsdCB2YWx1ZSBpbnRvIHlvdXIgZmllbGQgZGVmaW5pdGlvbidcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlID1cclxuICAgICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZSB8fCB0aGlzLnJlc3VsdFRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnU3RvcmVkIFF1ZXJpZXMnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL3dzL3N3dHEnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gVVJMIENBTEwgRVhBTVBMRVM6XHJcbiAgLy8gIEdldEZlYXR1cmVCeUlkIChtYW5kYXRvcnkgc3RvcmVkcXVlcnkgZm9yIHdmcyBzZXJ2ZXIpIChvdXRwdXRmb3JtYXQgbXVzdCBiZSBpbiBnZW9qc29uKVxyXG4gIC8vICB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgLy8gIGh0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL2FwaXMvd3Mvc3d0cT9zZXJ2aWNlPXdmcyZ2ZXJzaW9uPTIuMC4wJnJlcXVlc3Q9R2V0RmVhdHVyZSZzdG9yZWRxdWVyeV9pZD11cm46b2djOmRlZjpxdWVyeTpPR0MtV0ZTOjpHZXRGZWF0dXJlQnlJZCZzcnNuYW1lPWVwc2c6NDMyNiZvdXRwdXRmb3JtYXQ9Z2VvanNvbiZJRD1hX251bV9yb3V0ZS4xMzJcclxuICAvLyAgQ3VzdG9tIFN0b3JlZFF1ZXJ5XHJcbiAgLy8gIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAvLyAgaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy93cy9zd3RxP3NlcnZpY2U9d2ZzJnZlcnNpb249MS4xLjAmcmVxdWVzdD1HZXRGZWF0dXJlJnN0b3JlZHF1ZXJ5X2lkPXJ0c3Mmc3JzbmFtZT1lcHNnOjQzMjYmb3V0cHV0Zm9ybWF0PXRleHQveG1sOyUyMHN1YnR5cGU9Z21sLzMuMS4xJnJ0c3M9MDAxMzgwMTExMDAwMGMmY2hhaW5hZ2U9MTJcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTG9jYXRpb24gbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBzdG9yZWRxdWVyaWVzUGFyYW1zID0gdGhpcy50ZXJtU3BsaXR0ZXIoXHJcbiAgICAgIHRlcm0sXHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzXHJcbiAgICApO1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgICAgb3B0aW9ucyB8fCB7fSxcclxuICAgICAgc3RvcmVkcXVlcmllc1BhcmFtc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG5ldyBSZWdFeHAoJy4qP2dtbC4qPycsICdpJykudGVzdCh0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyh0aGlzLmV4dHJhY3RXRlNEYXRhKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSkucGlwZShcclxuICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHModGhpcy5leHRyYWN0V0ZTRGF0YShyZXNwb25zZSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0O1xyXG4gICAgY29uc3QgcGF0dGVybkdtbDMgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpO1xyXG4gICAgY29uc3QgcGF0dGVybkdlb2pzb24gPSBuZXcgUmVnRXhwKCcuKj9qc29uLio/JywgJ2knKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdlb2pzb24udGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuR21sMy50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0V0ZTRGF0YShyZXMpIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpO1xyXG4gICAgY29uc3QgZ2VvanNvbiA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICBjb25zdCB3ZnNmZWF0dXJlcyA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBKU09OLnBhcnNlKG5ldyBnZW9qc29uKCkud3JpdGVGZWF0dXJlcyh3ZnNmZWF0dXJlcykpO1xyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXJtU3BsaXR0ZXIodGVybTogc3RyaW5nLCBmaWVsZHM6IFN0b3JlZFF1ZXJpZXNGaWVsZHNbXSk6IHt9IHtcclxuICAgIGNvbnN0IHNwbGl0dGVkVGVybSA9IHt9O1xyXG4gICAgbGV0IHJlbWFpbmluZ1Rlcm0gPSB0ZXJtO1xyXG4gICAgbGV0IGNudCA9IDA7XHJcblxyXG4gICAgLy8gVXNlZCB0byBidWlsZCB0aGUgZGVmYXVsdCB2YWx1ZXNcclxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgc3BsaXR0ZWRUZXJtW2ZpZWxkLm5hbWVdID0gZmllbGQuZGVmYXVsdFZhbHVlO1xyXG4gICAgICBjb25zdCBzcGxpdHRlclJlZ2V4ID0gbmV3IFJlZ0V4cChmaWVsZC5zcGxpdFByZWZpeCArICcoLispJywgJ2knKTtcclxuICAgICAgaWYgKHNwbGl0dGVyUmVnZXgudGVzdChyZW1haW5pbmdUZXJtKSkge1xyXG4gICAgICAgIGNudCA9IGZpZWxkLnNwbGl0UHJlZml4ID8gKGNudCArPSAxKSA6IGNudDtcclxuICAgICAgICByZW1haW5pbmdUZXJtID0gcmVtYWluaW5nVGVybS5zcGxpdChzcGxpdHRlclJlZ2V4KVsxXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoY250ID09PSAwKSB7XHJcbiAgICAgIHNwbGl0dGVkVGVybVtmaWVsZHNbMF0ubmFtZV0gPSB0ZXJtO1xyXG4gICAgICByZXR1cm4gc3BsaXR0ZWRUZXJtO1xyXG4gICAgfVxyXG4gICAgcmVtYWluaW5nVGVybSA9IHRlcm07XHJcbiAgICBjb25zdCBsb2NhbEZpZWxkcyA9IFsuLi5maWVsZHNdLnJldmVyc2UoKTtcclxuICAgIGxvY2FsRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICBjb25zdCBzcGxpdHRlclJlZ2V4ID0gbmV3IFJlZ0V4cChmaWVsZC5zcGxpdFByZWZpeCB8fCAnJyArICcoLispJywgJ2knKTtcclxuICAgICAgaWYgKHJlbWFpbmluZ1Rlcm0gfHwgcmVtYWluaW5nVGVybSAhPT0gJycpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSByZW1haW5pbmdUZXJtLnNwbGl0KHNwbGl0dGVyUmVnZXgpO1xyXG4gICAgICAgIHJlbWFpbmluZ1Rlcm0gPSB2YWx1ZXNbMF07XHJcbiAgICAgICAgaWYgKHZhbHVlc1sxXSkge1xyXG4gICAgICAgICAgc3BsaXR0ZWRUZXJtW2ZpZWxkLm5hbWVdID0gdmFsdWVzWzFdLnRyaW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNwbGl0dGVkVGVybTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVJlcXVlc3RQYXJhbXMoXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9ucyxcclxuICAgIHF1ZXJ5UGFyYW1zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICBjb25zdCB3ZnN2ZXJzaW9uID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZFxyXG4gICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAuaW5jbHVkZXMoJ2dldGZlYXR1cmVieWlkJylcclxuICAgICAgPyAnMi4wLjAnXHJcbiAgICAgIDogJzEuMS4wJztcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VydmljZTogJ3dmcycsXHJcbiAgICAgICAgICB2ZXJzaW9uOiB3ZnN2ZXJzaW9uLFxyXG4gICAgICAgICAgcmVxdWVzdDogJ0dldEZlYXR1cmUnLFxyXG4gICAgICAgICAgc3RvcmVkcXVlcnlfaWQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQsXHJcbiAgICAgICAgICBzcnNuYW1lOiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUsXHJcbiAgICAgICAgICBvdXRwdXRmb3JtYXQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBxdWVyeVBhcmFtcyxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMoXHJcbiAgICByZXNwb25zZTogU3RvcmVkUXVlcmllc1Jlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogU3RvcmVkUXVlcmllc0RhdGEpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBTdG9yZWRRdWVyaWVzRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgcHJvcGVydGllcy50eXBlLCBkYXRhLmlkXS5qb2luKCcuJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRhdGEucHJvcGVydGllc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlXVxyXG4gICAgICA/IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGVcclxuICAgICAgOiB0aGlzLnJlc3VsdFRpdGxlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICAvLyBleHRlbnQ6IGRhdGEuYmJveCxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllc1t0aXRsZV1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogZGF0YS5wcm9wZXJ0aWVzW3RpdGxlXSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogU3RvcmVkUXVlcmllc0RhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN0b3JlZFF1ZXJpZXNSZXZlcnNlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcblxyXG4vLyBFWEFNUExFIENBTExTXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuLy8gaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHE/c2VydmljZT13ZnMmdmVyc2lvbj0xLjEuMCZyZXF1ZXN0PUdldEZlYXR1cmUmc3RvcmVkcXVlcnlfaWQ9bGltX2FkbSZzcnNuYW1lPWVwc2c6NDMyNiZvdXRwdXRmb3JtYXQ9dGV4dC94bWw7JTIwc3VidHlwZT1nbWwvMy4xLjEmbG9uZz0tNzEuMjkyNDY5JmxhdD00Ni43NDgxMDdcclxuLy9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlXHJcbiAgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnc3RvcmVkcXVlcmllc3JldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXTtcclxuICBwdWJsaWMgcmVzdWx0VGl0bGU6ICd0aXRsZSc7XHJcbiAgcHVibGljIHN0b3JlZFF1ZXJpZXNPcHRpb25zOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG11bHRpcGxlRmllbGRzUXVlcnk6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucyA9IG9wdGlvbnMgYXMgU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gICAgaWYgKCF0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnN0b3JlZHF1ZXJ5X2lkKSB7XHJcbiAgICAgIGNvbnN0IGVyciA9XHJcbiAgICAgICAgJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJzdG9yZWRxdWVyeV9pZFwiIGludG8gU3RvcmVkUXVlcmllcyBvcHRpb25zLiBleDogc3RvcmVkcXVlcnlfaWQ6IFwibmFtZW9mc3RvcmVkcXVlcmllXCInO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5sb25nRmllbGQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICdTdG9yZWQgUXVlcmllcyA6WW91IGhhdmUgdG8gc2V0IFwibG9uZ0ZpZWxkXCIgdG8gbWFwIHRoZSBsb25naXR1ZGUgY29vcmRpbmF0ZSB0byB0aGUgcXVlcnkgcGFyYW1zLidcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5sYXRGaWVsZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJsYXRGaWVsZFwiIHRvIG1hcCB0aGUgbGF0aXR1ZGUgY29vcmRpbmF0ZSB0byB0aGUgcXVlcnkgcGFyYW1zLidcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCA9XHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0IHx8ICd0ZXh0L3htbDsgc3VidHlwZT1nbWwvMy4xLjEnO1xyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zcnNuYW1lID1cclxuICAgICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zcnNuYW1lIHx8ICdFUFNHOjQzMjYnO1xyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZSA9XHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGUgfHwgdGhpcy5yZXN1bHRUaXRsZTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnU3RvcmVkIFF1ZXJpZXMgKHJldmVyc2UpJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHEnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbG9uTGF0IExvY2F0aW9uIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGRpc3RhbmNlIFNlYXJjaCByYWlkdXMgYXJvdW5kIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXMobG9uTGF0LCBvcHRpb25zIHx8IHt9KTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG5ldyBSZWdFeHAoJy4qP2dtbC4qPycsICdpJykudGVzdCh0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyh0aGlzLmV4dHJhY3RXRlNEYXRhKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSkucGlwZShcclxuICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHModGhpcy5leHRyYWN0V0ZTRGF0YShyZXNwb25zZSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0O1xyXG4gICAgY29uc3QgcGF0dGVybkdtbDMgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpO1xyXG4gICAgY29uc3QgcGF0dGVybkdlb2pzb24gPSBuZXcgUmVnRXhwKCcuKj9qc29uLio/JywgJ2knKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdlb2pzb24udGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuR21sMy50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0V0ZTRGF0YShyZXMpIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpO1xyXG4gICAgY29uc3QgZ2VvanNvbiA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICBjb25zdCB3ZnNmZWF0dXJlcyA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBKU09OLnBhcnNlKG5ldyBnZW9qc29uKCkud3JpdGVGZWF0dXJlcyh3ZnNmZWF0dXJlcykpO1xyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgY29uc3QgbG9uZ0xhdFBhcmFtcyA9IHt9O1xyXG4gICAgbG9uZ0xhdFBhcmFtc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmxvbmdGaWVsZF0gPSBsb25MYXRbMF07XHJcbiAgICBsb25nTGF0UGFyYW1zW3RoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMubGF0RmllbGRdID0gbG9uTGF0WzFdO1xyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VydmljZTogJ1dGUycsXHJcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4xLjAnLFxyXG4gICAgICAgICAgcmVxdWVzdDogJ0dldEZlYXR1cmUnLFxyXG4gICAgICAgICAgc3RvcmVkcXVlcnlfaWQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQsXHJcbiAgICAgICAgICBzcnNuYW1lOiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUsXHJcbiAgICAgICAgICBvdXRwdXRmb3JtYXQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb25nTGF0UGFyYW1zLFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhcclxuICAgIHJlc3BvbnNlOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZVJlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogU3RvcmVkUXVlcmllc1JldmVyc2VEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogU3RvcmVkUXVlcmllc1JldmVyc2VEYXRhKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIGRhdGEuaWRdLmpvaW4oJy4nKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZGF0YS5wcm9wZXJ0aWVzW3RoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGVdXHJcbiAgICAgID8gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZVxyXG4gICAgICA6IHRoaXMucmVzdWx0VGl0bGU7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllc1t0aXRsZV1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzW3RpdGxlXSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoXHJcbiAgICBkYXRhOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZURhdGFcclxuICApOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlLnByb3BlcnRpZXNCbGFja2xpc3RcclxuICAgICk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB7IHR5cGU6IGRhdGEucHJvcGVydGllcy5kb2NfdHlwZSB9KTtcclxuICB9XHJcbn1cclxuIl19