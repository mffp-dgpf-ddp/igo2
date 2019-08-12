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
        if (!_this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            var err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!_this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You have to set "fields" into options. ex: fields: {"name": "rtss", "defaultValue": "-99"}');
        }
        _this.storedQueriesOptions.outputformat = _this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        _this.storedQueriesOptions.srsname = _this.storedQueriesOptions.srsname || 'EPSG:4326';
        /** @type {?} */
        var storedQueryId = _this.storedQueriesOptions.storedquery_id.toLowerCase();
        if (storedQueryId.includes('getfeaturebyid') && _this.storedQueriesOptions.outputformat.toLowerCase().includes('getfeaturebyid')) {
            /** @type {?} */
            var err = 'You must set a geojson format for your stored query. This is due to an openlayers issue)';
            err += ' (wfs 1.1.0 & gml 3.1.1 limitation)';
            throw new Error(err);
        }
        if (!_this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You must set a fields definition for your stored query');
        }
        if (!(_this.storedQueriesOptions.fields instanceof Array)) {
            _this.storedQueriesOptions.fields = [_this.storedQueriesOptions.fields];
        }
        _this.multipleFieldsQuery = _this.storedQueriesOptions.fields.length > 1 ? true : false;
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
        _this.storedQueriesOptions.resultTitle = _this.storedQueriesOptions.resultTitle || _this.resultTitle;
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
            searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
        };
    };
    // URL CALL EXAMPLES:
    //  GetFeatureById (mandatory storedquery for wfs server) (outputformat must be in geojson)
    //  tslint:disable-next-line:max-line-length
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=GetFeature&storedquery_id=urn:ogc:def:query:OGC-WFS::GetFeatureById&srsname=epsg:4326&outputformat=geojson&ID=a_num_route.132
    //  Custom StoredQuery
    //  tslint:disable-next-line:max-line-length
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=rtss&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&rtss=0013801110000c&chainage=12
    /**
     * Search a location by name or keyword
     * @param term Location name or keyword
     * @returns Observable of <SearchResult<Feature>[]
     */
    // URL CALL EXAMPLES:
    //  GetFeatureById (mandatory storedquery for wfs server) (outputformat must be in geojson)
    //  tslint:disable-next-line:max-line-length
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=GetFeature&storedquery_id=urn:ogc:def:query:OGC-WFS::GetFeatureById&srsname=epsg:4326&outputformat=geojson&ID=a_num_route.132
    //  Custom StoredQuery
    //  tslint:disable-next-line:max-line-length
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=rtss&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&rtss=0013801110000c&chainage=12
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
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=GetFeature&storedquery_id=urn:ogc:def:query:OGC-WFS::GetFeatureById&srsname=epsg:4326&outputformat=geojson&ID=a_num_route.132
    //  Custom StoredQuery
    //  tslint:disable-next-line:max-line-length
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=rtss&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&rtss=0013801110000c&chainage=12
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
            return this.http
                .get(this.searchUrl, { params: params })
                .pipe(map((/**
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
                cnt = field.splitPrefix ? cnt += 1 : cnt;
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
        var wfsversion = this.storedQueriesOptions.storedquery_id.toLowerCase().includes('getfeaturebyid') ? '2.0.0' : '1.1.0';
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
        var title = data.properties[this.storedQueriesOptions.resultTitle] ? this.storedQueriesOptions.resultTitle : this.resultTitle;
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
    StoredQueriesSearchSource.propertiesBlacklist = [];
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
        _this.storedQueriesOptions.outputformat = _this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        _this.storedQueriesOptions.srsname = _this.storedQueriesOptions.srsname || 'EPSG:4326';
        _this.storedQueriesOptions.resultTitle = _this.storedQueriesOptions.resultTitle || _this.resultTitle;
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
            return this.http
                .get(this.searchUrl, { params: params })
                .pipe(map((/**
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
                service: 'wfs',
                version: '1.1.0',
                request: 'GetFeature',
                storedquery_id: this.storedQueriesOptions.storedquery_id,
                srsname: this.storedQueriesOptions.srsname,
                outputformat: this.storedQueriesOptions.outputformat,
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
        var title = data.properties[this.storedQueriesOptions.resultTitle] ? this.storedQueriesOptions.resultTitle : this.resultTitle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkcXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc3RvcmVkcXVlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLGtCQUFrQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQTZCLE1BQU0sVUFBVSxDQUFDO0FBZ0JuRSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQzs7OztBQUt0QztJQUMrQyxxREFBWTtJQVF6RCxtQ0FDVSxJQUFnQixFQUNMLE9BQTRCO1FBRmpELFlBSUUsa0JBQU0sT0FBTyxDQUFDLFNBd0NmO1FBM0NTLFVBQUksR0FBSixJQUFJLENBQVk7UUFJeEIsS0FBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFBLE9BQU8sRUFBb0MsQ0FBRTtRQUN6RSxJQUFJLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRTs7Z0JBQ3ZDLEdBQUcsR0FBRyx1SEFBdUg7WUFDbkksTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEdBQTRHLENBQUMsQ0FBQztTQUMvSDtRQUVELEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFlB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O1FBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQTlKTSxtQ0FBRSxHQUFHLHNCQUFzQixDQUFDO0lBQzVCLHFDQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ2Ysb0RBQW1CLEdBQWEsRUFBRSxDQUFDOztnQkFMM0MsVUFBVTs7OztnQkFwUUYsVUFBVTtnREFnUmQsTUFBTSxTQUFDLFNBQVM7O0lBc0pyQix1Q0FBQztDQUFBLEFBbEtELENBQ3NELFlBQVksR0FpS2pFO1NBaktZLGdDQUFnQzs7O0lBRTNDLG9DQUFtQzs7SUFDbkMsc0NBQXNCOztJQUN0QixxREFBMEM7O0lBQzFDLHVEQUE0Qjs7SUFDNUIsZ0VBQXFFOztJQUNyRSwrREFBb0M7Ozs7O0lBR2xDLGdEQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZSB9IGZyb20gJy4uLy4uLy4uL2ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UsIFRleHRTZWFyY2gsIFJldmVyc2VTZWFyY2ggfSBmcm9tICcuL3NvdXJjZSc7XHJcbmltcG9ydCB7XHJcbiAgU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBUZXh0U2VhcmNoT3B0aW9ucyxcclxuICBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG59IGZyb20gJy4vc291cmNlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1xyXG4gIFN0b3JlZFF1ZXJpZXNEYXRhLFxyXG4gIFN0b3JlZFF1ZXJpZXNSZXNwb25zZSxcclxuICBTdG9yZWRRdWVyaWVzUmV2ZXJzZURhdGEsXHJcbiAgU3RvcmVkUXVlcmllc1JldmVyc2VSZXNwb25zZSxcclxuICBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlT3B0aW9ucyxcclxuICBTdG9yZWRRdWVyaWVzRmllbGRzLFxyXG4gIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4vc3RvcmVkcXVlcmllcy5pbnRlcmZhY2VzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcblxyXG4vKipcclxuICogU3RvcmVkUXVlcmllcyBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ3N0b3JlZHF1ZXJpZXMnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXTtcclxuICBwdWJsaWMgcmVzdWx0VGl0bGU6ICd0aXRsZSc7XHJcbiAgcHVibGljIHN0b3JlZFF1ZXJpZXNPcHRpb25zOiBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgbXVsdGlwbGVGaWVsZHNRdWVyeTogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zID0gb3B0aW9ucyBhcyBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlT3B0aW9ucyA7XHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQpIHtcclxuICAgICAgY29uc3QgZXJyID0gJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJzdG9yZWRxdWVyeV9pZFwiIGludG8gU3RvcmVkUXVlcmllcyBvcHRpb25zLiBleDogc3RvcmVkcXVlcnlfaWQ6IFwibmFtZW9mc3RvcmVkcXVlcmllXCInO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yZWQgUXVlcmllcyA6WW91IGhhdmUgdG8gc2V0IFwiZmllbGRzXCIgaW50byBvcHRpb25zLiBleDogZmllbGRzOiB7XCJuYW1lXCI6IFwicnRzc1wiLCBcImRlZmF1bHRWYWx1ZVwiOiBcIi05OVwifScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0ID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQgfHwgJ3RleHQveG1sOyBzdWJ0eXBlPWdtbC8zLjEuMSc7XHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUgfHwgJ0VQU0c6NDMyNic7XHJcblxyXG4gICAgY29uc3Qgc3RvcmVkUXVlcnlJZCA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChzdG9yZWRRdWVyeUlkLmluY2x1ZGVzKCdnZXRmZWF0dXJlYnlpZCcpICYmIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2dldGZlYXR1cmVieWlkJykgKSB7XHJcbiAgICAgIGxldCBlcnIgPSAnWW91IG11c3Qgc2V0IGEgZ2VvanNvbiBmb3JtYXQgZm9yIHlvdXIgc3RvcmVkIHF1ZXJ5LiBUaGlzIGlzIGR1ZSB0byBhbiBvcGVubGF5ZXJzIGlzc3VlKSc7XHJcbiAgICAgIGVyciArPSAnICh3ZnMgMS4xLjAgJiBnbWwgMy4xLjEgbGltaXRhdGlvbiknO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmVkIFF1ZXJpZXMgOllvdSBtdXN0IHNldCBhIGZpZWxkcyBkZWZpbml0aW9uIGZvciB5b3VyIHN0b3JlZCBxdWVyeScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzID0gW3RoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm11bHRpcGxlRmllbGRzUXVlcnkgID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMubGVuZ3RoID4gMSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcy5mb3JFYWNoKChmaWVsZCwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubXVsdGlwbGVGaWVsZHNRdWVyeSAmJiAhZmllbGQuc3BsaXRQcmVmaXggJiYgaW5kZXggIT09IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JlZCBRdWVyaWVzIDpZb3UgbXVzdCBzZXQgYSBmaWVsZCBzcGxpdGVyIGludG8geW91ciBmaWVsZCBkZWZpbml0aW9uIChvcHRpb25hbCBmb3IgdGhlIGZpcnN0IG9uZSEpJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmaWVsZC5kZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JlZCBRdWVyaWVzIDpZb3UgbXVzdCBzZXQgYSBmaWVsZCBkZWZhdWx0IHZhbHVlIGludG8geW91ciBmaWVsZCBkZWZpbml0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGUgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlIHx8IHRoaXMucmVzdWx0VGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdE9wdGlvbnMoKTogU2VhcmNoU291cmNlT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ1N0b3JlZCBRdWVyaWVzJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHEnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gVVJMIENBTEwgRVhBTVBMRVM6XHJcbiAgLy8gIEdldEZlYXR1cmVCeUlkIChtYW5kYXRvcnkgc3RvcmVkcXVlcnkgZm9yIHdmcyBzZXJ2ZXIpIChvdXRwdXRmb3JtYXQgbXVzdCBiZSBpbiBnZW9qc29uKVxyXG4gIC8vICB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgLy8gIGh0dHBzOi8vd3MubWFwc2VydmVyLnRyYW5zcG9ydHMuZ291di5xYy5jYS9zd3RxP3NlcnZpY2U9d2ZzJnZlcnNpb249Mi4wLjAmcmVxdWVzdD1HZXRGZWF0dXJlJnN0b3JlZHF1ZXJ5X2lkPXVybjpvZ2M6ZGVmOnF1ZXJ5Ok9HQy1XRlM6OkdldEZlYXR1cmVCeUlkJnNyc25hbWU9ZXBzZzo0MzI2Jm91dHB1dGZvcm1hdD1nZW9qc29uJklEPWFfbnVtX3JvdXRlLjEzMlxyXG4gIC8vICBDdXN0b20gU3RvcmVkUXVlcnlcclxuICAvLyAgdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gIC8vICBodHRwczovL3dzLm1hcHNlcnZlci50cmFuc3BvcnRzLmdvdXYucWMuY2Evc3d0cT9zZXJ2aWNlPXdmcyZ2ZXJzaW9uPTEuMS4wJnJlcXVlc3Q9R2V0RmVhdHVyZSZzdG9yZWRxdWVyeV9pZD1ydHNzJnNyc25hbWU9ZXBzZzo0MzI2Jm91dHB1dGZvcm1hdD10ZXh0L3htbDslMjBzdWJ0eXBlPWdtbC8zLjEuMSZydHNzPTAwMTM4MDExMTAwMDBjJmNoYWluYWdlPTEyXHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBhIGxvY2F0aW9uIGJ5IG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEBwYXJhbSB0ZXJtIExvY2F0aW9uIG5hbWUgb3Iga2V5d29yZFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgc2VhcmNoKFxyXG4gICAgdGVybTogc3RyaW5nLFxyXG4gICAgb3B0aW9ucz86IFRleHRTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3Qgc3RvcmVkcXVlcmllc1BhcmFtcyA9IHRoaXMudGVybVNwbGl0dGVyKHRlcm0sIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzICk7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNvbXB1dGVSZXF1ZXN0UGFyYW1zKG9wdGlvbnMgfHwge30sIHN0b3JlZHF1ZXJpZXNQYXJhbXMpO1xyXG5cclxuICAgIGlmIChuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpLnRlc3QodGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKG1hcCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyh0aGlzLmV4dHJhY3RXRlNEYXRhKHJlc3BvbnNlKSk7XHJcbiAgICAgIH0pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUobWFwKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RSZXN1bHRzKHRoaXMuZXh0cmFjdFdGU0RhdGEocmVzcG9uc2UpKTtcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGb3JtYXRGcm9tT3B0aW9ucygpIHtcclxuICAgIGxldCBvbEZvcm1hdENscztcclxuXHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdDtcclxuICAgIGNvbnN0IHBhdHRlcm5HbWwzID0gbmV3IFJlZ0V4cCgnLio/Z21sLio/JywgJ2knKTtcclxuICAgIGNvbnN0IHBhdHRlcm5HZW9qc29uID0gbmV3IFJlZ0V4cCgnLio/anNvbi4qPycsICdpJyk7XHJcblxyXG4gICAgaWYgKHBhdHRlcm5HZW9qc29uLnRlc3Qob3V0cHV0Rm9ybWF0KSkge1xyXG4gICAgICBvbEZvcm1hdENscyA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICB9XHJcbiAgICBpZiAocGF0dGVybkdtbDMudGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuV0ZTO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgb2xGb3JtYXRDbHMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFdGU0RhdGEocmVzKSB7XHJcbiAgICBjb25zdCBvbEZvcm1hdCA9IHRoaXMuZ2V0Rm9ybWF0RnJvbU9wdGlvbnMoKTtcclxuICAgIGNvbnN0IGdlb2pzb24gPSBvbGZvcm1hdC5HZW9KU09OO1xyXG4gICAgY29uc3Qgd2ZzZmVhdHVyZXMgPSBvbEZvcm1hdC5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gSlNPTi5wYXJzZShuZXcgZ2VvanNvbigpLndyaXRlRmVhdHVyZXMod2ZzZmVhdHVyZXMpKTtcclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdGVybVNwbGl0dGVyKHRlcm06IHN0cmluZywgZmllbGRzOiBTdG9yZWRRdWVyaWVzRmllbGRzW10pOiB7fSB7XHJcbiAgICBjb25zdCBzcGxpdHRlZFRlcm0gPSB7fTtcclxuICAgIGxldCByZW1haW5pbmdUZXJtID0gdGVybTtcclxuICAgIGxldCBjbnQgPSAwO1xyXG5cclxuICAgIC8vIFVzZWQgdG8gYnVpbGQgdGhlIGRlZmF1bHQgdmFsdWVzXHJcbiAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgIHNwbGl0dGVkVGVybVtmaWVsZC5uYW1lXSA9IGZpZWxkLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgY29uc3Qgc3BsaXR0ZXJSZWdleCA9IG5ldyBSZWdFeHAoZmllbGQuc3BsaXRQcmVmaXggKyAnKC4rKScsICdpJyk7XHJcbiAgICAgIGlmIChzcGxpdHRlclJlZ2V4LnRlc3QocmVtYWluaW5nVGVybSkpIHtcclxuICAgICAgICBjbnQgPSBmaWVsZC5zcGxpdFByZWZpeCA/IGNudCArPSAxIDogY250O1xyXG4gICAgICAgIHJlbWFpbmluZ1Rlcm0gPSByZW1haW5pbmdUZXJtLnNwbGl0KHNwbGl0dGVyUmVnZXgpWzFdO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgICBpZiAoY250ID09PSAwKSB7XHJcbiAgICAgIHNwbGl0dGVkVGVybVtmaWVsZHNbMF0ubmFtZV0gPSB0ZXJtO1xyXG4gICAgICByZXR1cm4gc3BsaXR0ZWRUZXJtO1xyXG4gICAgfVxyXG4gICAgcmVtYWluaW5nVGVybSA9IHRlcm07XHJcbiAgICBjb25zdCBsb2NhbEZpZWxkcyA9IFsuLi5maWVsZHNdLnJldmVyc2UoKTtcclxuICAgIGxvY2FsRmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNwbGl0dGVyUmVnZXggPSBuZXcgUmVnRXhwKGZpZWxkLnNwbGl0UHJlZml4IHx8ICcnICsgJyguKyknLCAnaScpO1xyXG4gICAgICBpZiAocmVtYWluaW5nVGVybSB8fCByZW1haW5pbmdUZXJtICE9PSAnJykge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHJlbWFpbmluZ1Rlcm0uc3BsaXQoc3BsaXR0ZXJSZWdleCk7XHJcbiAgICAgICAgcmVtYWluaW5nVGVybSA9IHZhbHVlc1swXTtcclxuICAgICAgICBpZiAodmFsdWVzWzFdKSB7XHJcbiAgICAgICAgICBzcGxpdHRlZFRlcm1bZmllbGQubmFtZV0gPSB2YWx1ZXNbMV0udHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3BsaXR0ZWRUZXJtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9ucywgcXVlcnlQYXJhbXMpOiBIdHRwUGFyYW1zIHtcclxuICAgIGNvbnN0IHdmc3ZlcnNpb24gPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnN0b3JlZHF1ZXJ5X2lkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2dldGZlYXR1cmVieWlkJykgPyAnMi4wLjAnIDogJzEuMS4wJztcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VydmljZTogJ3dmcycsXHJcbiAgICAgICAgICB2ZXJzaW9uOiB3ZnN2ZXJzaW9uLFxyXG4gICAgICAgICAgcmVxdWVzdDogJ0dldEZlYXR1cmUnLFxyXG4gICAgICAgICAgc3RvcmVkcXVlcnlfaWQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQsXHJcbiAgICAgICAgICBzcnNuYW1lOiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUsXHJcbiAgICAgICAgICBvdXRwdXRmb3JtYXQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBxdWVyeVBhcmFtcyxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMocmVzcG9uc2U6IFN0b3JlZFF1ZXJpZXNSZXNwb25zZSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IFN0b3JlZFF1ZXJpZXNEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogU3RvcmVkUXVlcmllc0RhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksIHByb3BlcnRpZXMudHlwZSwgZGF0YS5pZF0uam9pbignLicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkYXRhLnByb3BlcnRpZXNbdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZV0gPyB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlIDogdGhpcy5yZXN1bHRUaXRsZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IGRhdGEuZ2VvbWV0cnksXHJcbiAgICAgICAgLy8gZXh0ZW50OiBkYXRhLmJib3gsXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXNbdGl0bGVdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllcy50aXRsZSxcclxuICAgICAgICB0aXRsZUh0bWw6IGRhdGEucHJvcGVydGllc1t0aXRsZV0sXHJcbiAgICAgICAgaWNvbjogJ21hcC1tYXJrZXInXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVQcm9wZXJ0aWVzKGRhdGE6IFN0b3JlZFF1ZXJpZXNEYXRhKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0VXRpbHMucmVtb3ZlS2V5cyhcclxuICAgICAgZGF0YS5wcm9wZXJ0aWVzLFxyXG4gICAgICBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlLnByb3BlcnRpZXNCbGFja2xpc3RcclxuICAgICk7XHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdG9yZWRRdWVyaWVzUmV2ZXJzZSBzZWFyY2ggc291cmNlXHJcbiAqL1xyXG5cclxuIC8vIEVYQU1QTEUgQ0FMTFNcclxuIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuIC8vIGh0dHBzOi8vd3MubWFwc2VydmVyLnRyYW5zcG9ydHMuZ291di5xYy5jYS9zd3RxP3NlcnZpY2U9d2ZzJnZlcnNpb249MS4xLjAmcmVxdWVzdD1HZXRGZWF0dXJlJnN0b3JlZHF1ZXJ5X2lkPWxpbV9hZG0mc3JzbmFtZT1lcHNnOjQzMjYmb3V0cHV0Zm9ybWF0PXRleHQveG1sOyUyMHN1YnR5cGU9Z21sLzMuMS4xJmxvbmc9LTcxLjI5MjQ2OSZsYXQ9NDYuNzQ4MTA3XHJcbiAvL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2VcclxuICBpbXBsZW1lbnRzIFJldmVyc2VTZWFyY2gge1xyXG4gIHN0YXRpYyBpZCA9ICdzdG9yZWRxdWVyaWVzcmV2ZXJzZSc7XHJcbiAgc3RhdGljIHR5cGUgPSBGRUFUVVJFO1xyXG4gIHN0YXRpYyBwcm9wZXJ0aWVzQmxhY2tsaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG4gIHB1YmxpYyByZXN1bHRUaXRsZTogJ3RpdGxlJztcclxuICBwdWJsaWMgc3RvcmVkUXVlcmllc09wdGlvbnM6IFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgbXVsdGlwbGVGaWVsZHNRdWVyeTogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBASW5qZWN0KCdvcHRpb25zJykgb3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9uc1xyXG4gICkge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zID0gb3B0aW9ucyBhcyBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZU9wdGlvbnMgO1xyXG4gICAgaWYgKCF0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnN0b3JlZHF1ZXJ5X2lkKSB7XHJcbiAgICAgIGNvbnN0IGVyciA9ICdTdG9yZWQgUXVlcmllcyA6WW91IGhhdmUgdG8gc2V0IFwic3RvcmVkcXVlcnlfaWRcIiBpbnRvIFN0b3JlZFF1ZXJpZXMgb3B0aW9ucy4gZXg6IHN0b3JlZHF1ZXJ5X2lkOiBcIm5hbWVvZnN0b3JlZHF1ZXJpZVwiJztcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMubG9uZ0ZpZWxkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmVkIFF1ZXJpZXMgOllvdSBoYXZlIHRvIHNldCBcImxvbmdGaWVsZFwiIHRvIG1hcCB0aGUgbG9uZ2l0dWRlIGNvb3JkaW5hdGUgdG8gdGhlIHF1ZXJ5IHBhcmFtcy4nKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5sYXRGaWVsZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJsYXRGaWVsZFwiIHRvIG1hcCB0aGUgbGF0aXR1ZGUgY29vcmRpbmF0ZSB0byB0aGUgcXVlcnkgcGFyYW1zLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0ID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQgfHwgJ3RleHQveG1sOyBzdWJ0eXBlPWdtbC8zLjEuMSc7XHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUgfHwgJ0VQU0c6NDMyNic7XHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZSB8fCB0aGlzLnJlc3VsdFRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnU3RvcmVkIFF1ZXJpZXMgKHJldmVyc2UpJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHEnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbG9uTGF0IExvY2F0aW9uIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGRpc3RhbmNlIFNlYXJjaCByYWlkdXMgYXJvdW5kIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXMobG9uTGF0LCBvcHRpb25zIHx8IHt9KTtcclxuXHJcbiAgICBpZiAobmV3IFJlZ0V4cCgnLio/Z21sLio/JywgJ2knKS50ZXN0KHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0KSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zZWFyY2hVcmwsIHsgcGFyYW1zLCByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxyXG4gICAgICAucGlwZShtYXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHModGhpcy5leHRyYWN0V0ZTRGF0YShyZXNwb25zZSkpO1xyXG4gICAgICB9KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zZWFyY2hVcmwsIHsgcGFyYW1zIH0pXHJcbiAgICAgIC5waXBlKG1hcCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyh0aGlzLmV4dHJhY3RXRlNEYXRhKHJlc3BvbnNlKSk7XHJcbiAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0O1xyXG4gICAgY29uc3QgcGF0dGVybkdtbDMgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpO1xyXG4gICAgY29uc3QgcGF0dGVybkdlb2pzb24gPSBuZXcgUmVnRXhwKCcuKj9qc29uLio/JywgJ2knKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdlb2pzb24udGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuR21sMy50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0V0ZTRGF0YShyZXMpIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpO1xyXG4gICAgY29uc3QgZ2VvanNvbiA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICBjb25zdCB3ZnNmZWF0dXJlcyA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBKU09OLnBhcnNlKG5ldyBnZW9qc29uKCkud3JpdGVGZWF0dXJlcyh3ZnNmZWF0dXJlcykpO1xyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgY29uc3QgbG9uZ0xhdFBhcmFtcyA9ICB7fTtcclxuICAgIGxvbmdMYXRQYXJhbXNbdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5sb25nRmllbGRdID0gbG9uTGF0WzBdO1xyXG4gICAgbG9uZ0xhdFBhcmFtc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmxhdEZpZWxkXSA9IGxvbkxhdFsxXTtcclxuXHJcbiAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoe1xyXG4gICAgICBmcm9tT2JqZWN0OiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNlcnZpY2U6ICd3ZnMnLFxyXG4gICAgICAgICAgdmVyc2lvbjogJzEuMS4wJyxcclxuICAgICAgICAgIHJlcXVlc3Q6ICdHZXRGZWF0dXJlJyxcclxuICAgICAgICAgIHN0b3JlZHF1ZXJ5X2lkOiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnN0b3JlZHF1ZXJ5X2lkLFxyXG4gICAgICAgICAgc3JzbmFtZTogdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zcnNuYW1lLFxyXG4gICAgICAgICAgb3V0cHV0Zm9ybWF0OiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvbmdMYXRQYXJhbXMsXHJcbiAgICAgICAgdGhpcy5wYXJhbXMsXHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXMgfHwge31cclxuICAgICAgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSZXN1bHRzKFxyXG4gICAgcmVzcG9uc2U6IFN0b3JlZFF1ZXJpZXNSZXZlcnNlUmVzcG9uc2VcclxuICApOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZmVhdHVyZXMubWFwKChkYXRhOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZURhdGEpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZURhdGEpOiBTZWFyY2hSZXN1bHQ8RmVhdHVyZT4ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuY29tcHV0ZVByb3BlcnRpZXMoZGF0YSk7XHJcbiAgICBjb25zdCBpZCA9IFt0aGlzLmdldElkKCksIHByb3BlcnRpZXMudHlwZSwgZGF0YS5pZF0uam9pbignLicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkYXRhLnByb3BlcnRpZXNbdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZV0gPyB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlIDogdGhpcy5yZXN1bHRUaXRsZTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGdlb21ldHJ5OiBkYXRhLmdlb21ldHJ5LFxyXG4gICAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzW3RpdGxlXVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRhdGFUeXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXNbdGl0bGVdLFxyXG4gICAgICAgIGljb246ICdtYXAtbWFya2VyJ1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUHJvcGVydGllcyhkYXRhOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZURhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlLnByb3BlcnRpZXNCbGFja2xpc3RcclxuICAgICk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB7IHR5cGU6IGRhdGEucHJvcGVydGllcy5kb2NfdHlwZSB9KTtcclxuICB9XHJcbn1cclxuIl19