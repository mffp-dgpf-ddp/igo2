/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class StoredQueriesSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
        this.storedQueriesOptions = (/** @type {?} */ (options));
        if (!this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            const err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You have to set "fields" into options. ex: fields: {"name": "rtss", "defaultValue": "-99"}');
        }
        this.storedQueriesOptions.outputformat = this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        this.storedQueriesOptions.srsname = this.storedQueriesOptions.srsname || 'EPSG:4326';
        /** @type {?} */
        const storedQueryId = this.storedQueriesOptions.storedquery_id.toLowerCase();
        if (storedQueryId.includes('getfeaturebyid') && this.storedQueriesOptions.outputformat.toLowerCase().includes('getfeaturebyid')) {
            /** @type {?} */
            let err = 'You must set a geojson format for your stored query. This is due to an openlayers issue)';
            err += ' (wfs 1.1.0 & gml 3.1.1 limitation)';
            throw new Error(err);
        }
        if (!this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You must set a fields definition for your stored query');
        }
        if (!(this.storedQueriesOptions.fields instanceof Array)) {
            this.storedQueriesOptions.fields = [this.storedQueriesOptions.fields];
        }
        this.multipleFieldsQuery = this.storedQueriesOptions.fields.length > 1 ? true : false;
        this.storedQueriesOptions.fields.forEach((/**
         * @param {?} field
         * @param {?} index
         * @return {?}
         */
        (field, index) => {
            if (this.multipleFieldsQuery && !field.splitPrefix && index !== 0) {
                throw new Error('Stored Queries :You must set a field spliter into your field definition (optional for the first one!)');
            }
            if (!field.defaultValue) {
                throw new Error('Stored Queries :You must set a field default value into your field definition');
            }
        }));
        this.storedQueriesOptions.resultTitle = this.storedQueriesOptions.resultTitle || this.resultTitle;
    }
    /**
     * @return {?}
     */
    getId() {
        return StoredQueriesSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Stored Queries',
            searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
        };
    }
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
    search(term, options) {
        /** @type {?} */
        const storedqueriesParams = this.termSplitter(term, this.storedQueriesOptions.fields);
        /** @type {?} */
        const params = this.computeRequestParams(options || {}, storedqueriesParams);
        if (new RegExp('.*?gml.*?', 'i').test(this.storedQueriesOptions.outputformat)) {
            return this.http
                .get(this.searchUrl, { params, responseType: 'text' })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
        else {
            return this.http
                .get(this.searchUrl, { params })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
    }
    /**
     * @private
     * @return {?}
     */
    getFormatFromOptions() {
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        const outputFormat = this.storedQueriesOptions.outputformat;
        /** @type {?} */
        const patternGml3 = new RegExp('.*?gml.*?', 'i');
        /** @type {?} */
        const patternGeojson = new RegExp('.*?json.*?', 'i');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = olformat.GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = olformat.WFS;
        }
        return new olFormatCls();
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractWFSData(res) {
        /** @type {?} */
        const olFormat = this.getFormatFromOptions();
        /** @type {?} */
        const geojson = olformat.GeoJSON;
        /** @type {?} */
        const wfsfeatures = olFormat.readFeatures(res);
        /** @type {?} */
        const features = JSON.parse(new geojson().writeFeatures(wfsfeatures));
        return features;
    }
    /**
     * @private
     * @param {?} term
     * @param {?} fields
     * @return {?}
     */
    termSplitter(term, fields) {
        /** @type {?} */
        const splittedTerm = {};
        /** @type {?} */
        let remainingTerm = term;
        /** @type {?} */
        let cnt = 0;
        // Used to build the default values
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        field => {
            splittedTerm[field.name] = field.defaultValue;
            /** @type {?} */
            const splitterRegex = new RegExp(field.splitPrefix + '(.+)', 'i');
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
        const localFields = [...fields].reverse();
        localFields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            /** @type {?} */
            const splitterRegex = new RegExp(field.splitPrefix || '' + '(.+)', 'i');
            if (remainingTerm || remainingTerm !== '') {
                /** @type {?} */
                const values = remainingTerm.split(splitterRegex);
                remainingTerm = values[0];
                if (values[1]) {
                    splittedTerm[field.name] = values[1].trim();
                }
            }
        }));
        return splittedTerm;
    }
    /**
     * @private
     * @param {?} options
     * @param {?} queryParams
     * @return {?}
     */
    computeRequestParams(options, queryParams) {
        /** @type {?} */
        const wfsversion = this.storedQueriesOptions.storedquery_id.toLowerCase().includes('getfeaturebyid') ? '2.0.0' : '1.1.0';
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
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.dataToResult(data);
        }));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, data.id].join('.');
        /** @type {?} */
        const title = data.properties[this.storedQueriesOptions.resultTitle] ? this.storedQueriesOptions.resultTitle : this.resultTitle;
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                // extent: data.bbox,
                properties,
                meta: {
                    id,
                    title: data.properties[title]
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties.title,
                titleHtml: data.properties[title],
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, StoredQueriesSearchSource.propertiesBlacklist);
        return properties;
    }
}
StoredQueriesSearchSource.id = 'storedqueries';
StoredQueriesSearchSource.type = FEATURE;
StoredQueriesSearchSource.propertiesBlacklist = [];
StoredQueriesSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StoredQueriesSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
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
export class StoredQueriesReverseSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
        this.storedQueriesOptions = (/** @type {?} */ (options));
        if (!this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            const err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!this.storedQueriesOptions.longField) {
            throw new Error('Stored Queries :You have to set "longField" to map the longitude coordinate to the query params.');
        }
        if (!this.storedQueriesOptions.latField) {
            throw new Error('Stored Queries :You have to set "latField" to map the latitude coordinate to the query params.');
        }
        this.storedQueriesOptions.outputformat = this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        this.storedQueriesOptions.srsname = this.storedQueriesOptions.srsname || 'EPSG:4326';
        this.storedQueriesOptions.resultTitle = this.storedQueriesOptions.resultTitle || this.resultTitle;
    }
    /**
     * @return {?}
     */
    getId() {
        return StoredQueriesReverseSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Stored Queries (reverse)',
            searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
        };
    }
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat, options) {
        /** @type {?} */
        const params = this.computeRequestParams(lonLat, options || {});
        if (new RegExp('.*?gml.*?', 'i').test(this.storedQueriesOptions.outputformat)) {
            return this.http
                .get(this.searchUrl, { params, responseType: 'text' })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
        else {
            return this.http
                .get(this.searchUrl, { params })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
    }
    /**
     * @private
     * @return {?}
     */
    getFormatFromOptions() {
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        const outputFormat = this.storedQueriesOptions.outputformat;
        /** @type {?} */
        const patternGml3 = new RegExp('.*?gml.*?', 'i');
        /** @type {?} */
        const patternGeojson = new RegExp('.*?json.*?', 'i');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = olformat.GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = olformat.WFS;
        }
        return new olFormatCls();
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractWFSData(res) {
        /** @type {?} */
        const olFormat = this.getFormatFromOptions();
        /** @type {?} */
        const geojson = olformat.GeoJSON;
        /** @type {?} */
        const wfsfeatures = olFormat.readFeatures(res);
        /** @type {?} */
        const features = JSON.parse(new geojson().writeFeatures(wfsfeatures));
        return features;
    }
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    computeRequestParams(lonLat, options) {
        /** @type {?} */
        const longLatParams = {};
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
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.dataToResult(data);
        }));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, data.id].join('.');
        /** @type {?} */
        const title = data.properties[this.storedQueriesOptions.resultTitle] ? this.storedQueriesOptions.resultTitle : this.resultTitle;
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                properties,
                meta: {
                    id,
                    title: data.properties[title]
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties[title],
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, StoredQueriesReverseSearchSource.propertiesBlacklist);
        return Object.assign(properties, { type: data.properties.doc_type });
    }
}
StoredQueriesReverseSearchSource.id = 'storedqueriesreverse';
StoredQueriesReverseSearchSource.type = FEATURE;
StoredQueriesReverseSearchSource.propertiesBlacklist = [];
StoredQueriesReverseSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StoredQueriesReverseSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkcXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc3RvcmVkcXVlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUc5RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsT0FBTyxFQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFHcEQsT0FBTyxFQUFFLFlBQVksRUFBNkIsTUFBTSxVQUFVLENBQUM7QUFnQm5FLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDOzs7O0FBTXRDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxZQUFZOzs7OztJQVF6RCxZQUNVLElBQWdCLEVBQ0wsT0FBNEI7UUFFL0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSFAsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUl4QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQUEsT0FBTyxFQUFvQyxDQUFFO1FBQ3pFLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFOztrQkFDdkMsR0FBRyxHQUFHLHVIQUF1SDtZQUNuSSxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7WUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0R0FBNEcsQ0FBQyxDQUFDO1NBQy9IO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMs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bnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSwgVGV4dFNlYXJjaCwgUmV2ZXJzZVNlYXJjaCB9IGZyb20gJy4vc291cmNlJztcclxuaW1wb3J0IHtcclxuICBTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIFRleHRTZWFyY2hPcHRpb25zLFxyXG4gIFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbn0gZnJvbSAnLi9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgU3RvcmVkUXVlcmllc0RhdGEsXHJcbiAgU3RvcmVkUXVlcmllc1Jlc3BvbnNlLFxyXG4gIFN0b3JlZFF1ZXJpZXNSZXZlcnNlRGF0YSxcclxuICBTdG9yZWRRdWVyaWVzUmV2ZXJzZVJlc3BvbnNlLFxyXG4gIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2VPcHRpb25zLFxyXG4gIFN0b3JlZFF1ZXJpZXNGaWVsZHMsXHJcbiAgU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi9zdG9yZWRxdWVyaWVzLmludGVyZmFjZXMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuXHJcbi8qKlxyXG4gKiBTdG9yZWRRdWVyaWVzIHNlYXJjaCBzb3VyY2VcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2UgaW1wbGVtZW50cyBUZXh0U2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnc3RvcmVkcXVlcmllcyc7XHJcbiAgc3RhdGljIHR5cGUgPSBGRUFUVVJFO1xyXG4gIHN0YXRpYyBwcm9wZXJ0aWVzQmxhY2tsaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG4gIHB1YmxpYyByZXN1bHRUaXRsZTogJ3RpdGxlJztcclxuICBwdWJsaWMgc3RvcmVkUXVlcmllc09wdGlvbnM6IFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBtdWx0aXBsZUZpZWxkc1F1ZXJ5OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMgPSBvcHRpb25zIGFzIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2VPcHRpb25zIDtcclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZCkge1xyXG4gICAgICBjb25zdCBlcnIgPSAnU3RvcmVkIFF1ZXJpZXMgOllvdSBoYXZlIHRvIHNldCBcInN0b3JlZHF1ZXJ5X2lkXCIgaW50byBTdG9yZWRRdWVyaWVzIG9wdGlvbnMuIGV4OiBzdG9yZWRxdWVyeV9pZDogXCJuYW1lb2ZzdG9yZWRxdWVyaWVcIic7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJmaWVsZHNcIiBpbnRvIG9wdGlvbnMuIGV4OiBmaWVsZHM6IHtcIm5hbWVcIjogXCJydHNzXCIsIFwiZGVmYXVsdFZhbHVlXCI6IFwiLTk5XCJ9Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCB8fCAndGV4dC94bWw7IHN1YnR5cGU9Z21sLzMuMS4xJztcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSB8fCAnRVBTRzo0MzI2JztcclxuXHJcbiAgICBjb25zdCBzdG9yZWRRdWVyeUlkID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKHN0b3JlZFF1ZXJ5SWQuaW5jbHVkZXMoJ2dldGZlYXR1cmVieWlkJykgJiYgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZ2V0ZmVhdHVyZWJ5aWQnKSApIHtcclxuICAgICAgbGV0IGVyciA9ICdZb3UgbXVzdCBzZXQgYSBnZW9qc29uIGZvcm1hdCBmb3IgeW91ciBzdG9yZWQgcXVlcnkuIFRoaXMgaXMgZHVlIHRvIGFuIG9wZW5sYXllcnMgaXNzdWUpJztcclxuICAgICAgZXJyICs9ICcgKHdmcyAxLjEuMCAmIGdtbCAzLjEuMSBsaW1pdGF0aW9uKSc7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yZWQgUXVlcmllcyA6WW91IG11c3Qgc2V0IGEgZmllbGRzIGRlZmluaXRpb24gZm9yIHlvdXIgc3RvcmVkIHF1ZXJ5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCEodGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMgPSBbdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHNdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVsdGlwbGVGaWVsZHNRdWVyeSAgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcy5sZW5ndGggPiAxID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzLmZvckVhY2goKGZpZWxkLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5tdWx0aXBsZUZpZWxkc1F1ZXJ5ICYmICFmaWVsZC5zcGxpdFByZWZpeCAmJiBpbmRleCAhPT0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmVkIFF1ZXJpZXMgOllvdSBtdXN0IHNldCBhIGZpZWxkIHNwbGl0ZXIgaW50byB5b3VyIGZpZWxkIGRlZmluaXRpb24gKG9wdGlvbmFsIGZvciB0aGUgZmlyc3Qgb25lISknKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZpZWxkLmRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmVkIFF1ZXJpZXMgOllvdSBtdXN0IHNldCBhIGZpZWxkIGRlZmF1bHQgdmFsdWUgaW50byB5b3VyIGZpZWxkIGRlZmluaXRpb24nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZSA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGUgfHwgdGhpcy5yZXN1bHRUaXRsZTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RvcmVkUXVlcmllc1NlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnU3RvcmVkIFF1ZXJpZXMnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL3dzLm1hcHNlcnZlci50cmFuc3BvcnRzLmdvdXYucWMuY2Evc3d0cSdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBVUkwgQ0FMTCBFWEFNUExFUzpcclxuICAvLyAgR2V0RmVhdHVyZUJ5SWQgKG1hbmRhdG9yeSBzdG9yZWRxdWVyeSBmb3Igd2ZzIHNlcnZlcikgKG91dHB1dGZvcm1hdCBtdXN0IGJlIGluIGdlb2pzb24pXHJcbiAgLy8gIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAvLyAgaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHE/c2VydmljZT13ZnMmdmVyc2lvbj0yLjAuMCZyZXF1ZXN0PUdldEZlYXR1cmUmc3RvcmVkcXVlcnlfaWQ9dXJuOm9nYzpkZWY6cXVlcnk6T0dDLVdGUzo6R2V0RmVhdHVyZUJ5SWQmc3JzbmFtZT1lcHNnOjQzMjYmb3V0cHV0Zm9ybWF0PWdlb2pzb24mSUQ9YV9udW1fcm91dGUuMTMyXHJcbiAgLy8gIEN1c3RvbSBTdG9yZWRRdWVyeVxyXG4gIC8vICB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgLy8gIGh0dHBzOi8vd3MubWFwc2VydmVyLnRyYW5zcG9ydHMuZ291di5xYy5jYS9zd3RxP3NlcnZpY2U9d2ZzJnZlcnNpb249MS4xLjAmcmVxdWVzdD1HZXRGZWF0dXJlJnN0b3JlZHF1ZXJ5X2lkPXJ0c3Mmc3JzbmFtZT1lcHNnOjQzMjYmb3V0cHV0Zm9ybWF0PXRleHQveG1sOyUyMHN1YnR5cGU9Z21sLzMuMS4xJnJ0c3M9MDAxMzgwMTExMDAwMGMmY2hhaW5hZ2U9MTJcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTG9jYXRpb24gbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBzdG9yZWRxdWVyaWVzUGFyYW1zID0gdGhpcy50ZXJtU3BsaXR0ZXIodGVybSwgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMgKTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXMob3B0aW9ucyB8fCB7fSwgc3RvcmVkcXVlcmllc1BhcmFtcyk7XHJcblxyXG4gICAgaWYgKG5ldyBSZWdFeHAoJy4qP2dtbC4qPycsICdpJykudGVzdCh0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcywgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgLnBpcGUobWFwKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RSZXN1bHRzKHRoaXMuZXh0cmFjdFdGU0RhdGEocmVzcG9uc2UpKTtcclxuICAgICAgfSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHRoaXMuc2VhcmNoVXJsLCB7IHBhcmFtcyB9KVxyXG4gICAgICAucGlwZShtYXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHModGhpcy5leHRyYWN0V0ZTRGF0YShyZXNwb25zZSkpO1xyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0O1xyXG4gICAgY29uc3QgcGF0dGVybkdtbDMgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpO1xyXG4gICAgY29uc3QgcGF0dGVybkdlb2pzb24gPSBuZXcgUmVnRXhwKCcuKj9qc29uLio/JywgJ2knKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdlb2pzb24udGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuR21sMy50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0V0ZTRGF0YShyZXMpIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpO1xyXG4gICAgY29uc3QgZ2VvanNvbiA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICBjb25zdCB3ZnNmZWF0dXJlcyA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBKU09OLnBhcnNlKG5ldyBnZW9qc29uKCkud3JpdGVGZWF0dXJlcyh3ZnNmZWF0dXJlcykpO1xyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXJtU3BsaXR0ZXIodGVybTogc3RyaW5nLCBmaWVsZHM6IFN0b3JlZFF1ZXJpZXNGaWVsZHNbXSk6IHt9IHtcclxuICAgIGNvbnN0IHNwbGl0dGVkVGVybSA9IHt9O1xyXG4gICAgbGV0IHJlbWFpbmluZ1Rlcm0gPSB0ZXJtO1xyXG4gICAgbGV0IGNudCA9IDA7XHJcblxyXG4gICAgLy8gVXNlZCB0byBidWlsZCB0aGUgZGVmYXVsdCB2YWx1ZXNcclxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgc3BsaXR0ZWRUZXJtW2ZpZWxkLm5hbWVdID0gZmllbGQuZGVmYXVsdFZhbHVlO1xyXG4gICAgICBjb25zdCBzcGxpdHRlclJlZ2V4ID0gbmV3IFJlZ0V4cChmaWVsZC5zcGxpdFByZWZpeCArICcoLispJywgJ2knKTtcclxuICAgICAgaWYgKHNwbGl0dGVyUmVnZXgudGVzdChyZW1haW5pbmdUZXJtKSkge1xyXG4gICAgICAgIGNudCA9IGZpZWxkLnNwbGl0UHJlZml4ID8gY250ICs9IDEgOiBjbnQ7XHJcbiAgICAgICAgcmVtYWluaW5nVGVybSA9IHJlbWFpbmluZ1Rlcm0uc3BsaXQoc3BsaXR0ZXJSZWdleClbMV07XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgIGlmIChjbnQgPT09IDApIHtcclxuICAgICAgc3BsaXR0ZWRUZXJtW2ZpZWxkc1swXS5uYW1lXSA9IHRlcm07XHJcbiAgICAgIHJldHVybiBzcGxpdHRlZFRlcm07XHJcbiAgICB9XHJcbiAgICByZW1haW5pbmdUZXJtID0gdGVybTtcclxuICAgIGNvbnN0IGxvY2FsRmllbGRzID0gWy4uLmZpZWxkc10ucmV2ZXJzZSgpO1xyXG4gICAgbG9jYWxGaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcclxuICAgICAgY29uc3Qgc3BsaXR0ZXJSZWdleCA9IG5ldyBSZWdFeHAoZmllbGQuc3BsaXRQcmVmaXggfHwgJycgKyAnKC4rKScsICdpJyk7XHJcbiAgICAgIGlmIChyZW1haW5pbmdUZXJtIHx8IHJlbWFpbmluZ1Rlcm0gIT09ICcnKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gcmVtYWluaW5nVGVybS5zcGxpdChzcGxpdHRlclJlZ2V4KTtcclxuICAgICAgICByZW1haW5pbmdUZXJtID0gdmFsdWVzWzBdO1xyXG4gICAgICAgIGlmICh2YWx1ZXNbMV0pIHtcclxuICAgICAgICAgIHNwbGl0dGVkVGVybVtmaWVsZC5uYW1lXSA9IHZhbHVlc1sxXS50cmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzcGxpdHRlZFRlcm07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVSZXF1ZXN0UGFyYW1zKG9wdGlvbnM6IFRleHRTZWFyY2hPcHRpb25zLCBxdWVyeVBhcmFtcyk6IEh0dHBQYXJhbXMge1xyXG4gICAgY29uc3Qgd2ZzdmVyc2lvbiA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZ2V0ZmVhdHVyZWJ5aWQnKSA/ICcyLjAuMCcgOiAnMS4xLjAnO1xyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHtcclxuICAgICAgZnJvbU9iamVjdDogT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzZXJ2aWNlOiAnd2ZzJyxcclxuICAgICAgICAgIHZlcnNpb246IHdmc3ZlcnNpb24sXHJcbiAgICAgICAgICByZXF1ZXN0OiAnR2V0RmVhdHVyZScsXHJcbiAgICAgICAgICBzdG9yZWRxdWVyeV9pZDogdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZCxcclxuICAgICAgICAgIHNyc25hbWU6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSxcclxuICAgICAgICAgIG91dHB1dGZvcm1hdDogdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHF1ZXJ5UGFyYW1zLFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhyZXNwb25zZTogU3RvcmVkUXVlcmllc1Jlc3BvbnNlKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogU3RvcmVkUXVlcmllc0RhdGEpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBTdG9yZWRRdWVyaWVzRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgcHJvcGVydGllcy50eXBlLCBkYXRhLmlkXS5qb2luKCcuJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRhdGEucHJvcGVydGllc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlXSA/IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGUgOiB0aGlzLnJlc3VsdFRpdGxlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICAvLyBleHRlbnQ6IGRhdGEuYmJveCxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllc1t0aXRsZV1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogZGF0YS5wcm9wZXJ0aWVzW3RpdGxlXSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogU3RvcmVkUXVlcmllc0RhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN0b3JlZFF1ZXJpZXNSZXZlcnNlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcblxyXG4gLy8gRVhBTVBMRSBDQUxMU1xyXG4gLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gLy8gaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHE/c2VydmljZT13ZnMmdmVyc2lvbj0xLjEuMCZyZXF1ZXN0PUdldEZlYXR1cmUmc3RvcmVkcXVlcnlfaWQ9bGltX2FkbSZzcnNuYW1lPWVwc2c6NDMyNiZvdXRwdXRmb3JtYXQ9dGV4dC94bWw7JTIwc3VidHlwZT1nbWwvMy4xLjEmbG9uZz0tNzEuMjkyNDY5JmxhdD00Ni43NDgxMDdcclxuIC8vXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZVxyXG4gIGltcGxlbWVudHMgUmV2ZXJzZVNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ3N0b3JlZHF1ZXJpZXNyZXZlcnNlJztcclxuICBzdGF0aWMgdHlwZSA9IEZFQVRVUkU7XHJcbiAgc3RhdGljIHByb3BlcnRpZXNCbGFja2xpc3Q6IHN0cmluZ1tdID0gW107XHJcbiAgcHVibGljIHJlc3VsdFRpdGxlOiAndGl0bGUnO1xyXG4gIHB1YmxpYyBzdG9yZWRRdWVyaWVzT3B0aW9uczogU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBtdWx0aXBsZUZpZWxkc1F1ZXJ5OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMgPSBvcHRpb25zIGFzIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlT3B0aW9ucyA7XHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQpIHtcclxuICAgICAgY29uc3QgZXJyID0gJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJzdG9yZWRxdWVyeV9pZFwiIGludG8gU3RvcmVkUXVlcmllcyBvcHRpb25zLiBleDogc3RvcmVkcXVlcnlfaWQ6IFwibmFtZW9mc3RvcmVkcXVlcmllXCInO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5sb25nRmllbGQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yZWQgUXVlcmllcyA6WW91IGhhdmUgdG8gc2V0IFwibG9uZ0ZpZWxkXCIgdG8gbWFwIHRoZSBsb25naXR1ZGUgY29vcmRpbmF0ZSB0byB0aGUgcXVlcnkgcGFyYW1zLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmxhdEZpZWxkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmVkIFF1ZXJpZXMgOllvdSBoYXZlIHRvIHNldCBcImxhdEZpZWxkXCIgdG8gbWFwIHRoZSBsYXRpdHVkZSBjb29yZGluYXRlIHRvIHRoZSBxdWVyeSBwYXJhbXMuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCB8fCAndGV4dC94bWw7IHN1YnR5cGU9Z21sLzMuMS4xJztcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSB8fCAnRVBTRzo0MzI2JztcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGUgPSB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlIHx8IHRoaXMucmVzdWx0VGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdTdG9yZWQgUXVlcmllcyAocmV2ZXJzZSknLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL3dzLm1hcHNlcnZlci50cmFuc3BvcnRzLmdvdXYucWMuY2Evc3d0cSdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggYSBsb2NhdGlvbiBieSBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBsb25MYXQgTG9jYXRpb24gY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gZGlzdGFuY2UgU2VhcmNoIHJhaWR1cyBhcm91bmQgbG9uTGF0XHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICByZXZlcnNlU2VhcmNoKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHQ8RmVhdHVyZT5bXT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyhsb25MYXQsIG9wdGlvbnMgfHwge30pO1xyXG5cclxuICAgIGlmIChuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpLnRlc3QodGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKG1hcCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyh0aGlzLmV4dHJhY3RXRlNEYXRhKHJlc3BvbnNlKSk7XHJcbiAgICAgIH0pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSlcclxuICAgICAgLnBpcGUobWFwKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RSZXN1bHRzKHRoaXMuZXh0cmFjdFdGU0RhdGEocmVzcG9uc2UpKTtcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9ybWF0RnJvbU9wdGlvbnMoKSB7XHJcbiAgICBsZXQgb2xGb3JtYXRDbHM7XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQ7XHJcbiAgICBjb25zdCBwYXR0ZXJuR21sMyA9IG5ldyBSZWdFeHAoJy4qP2dtbC4qPycsICdpJyk7XHJcbiAgICBjb25zdCBwYXR0ZXJuR2VvanNvbiA9IG5ldyBSZWdFeHAoJy4qP2pzb24uKj8nLCAnaScpO1xyXG5cclxuICAgIGlmIChwYXR0ZXJuR2VvanNvbi50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5HZW9KU09OO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhdHRlcm5HbWwzLnRlc3Qob3V0cHV0Rm9ybWF0KSkge1xyXG4gICAgICBvbEZvcm1hdENscyA9IG9sZm9ybWF0LldGUztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IG9sRm9ybWF0Q2xzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RXRlNEYXRhKHJlcykge1xyXG4gICAgY29uc3Qgb2xGb3JtYXQgPSB0aGlzLmdldEZvcm1hdEZyb21PcHRpb25zKCk7XHJcbiAgICBjb25zdCBnZW9qc29uID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIGNvbnN0IHdmc2ZlYXR1cmVzID0gb2xGb3JtYXQucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IEpTT04ucGFyc2UobmV3IGdlb2pzb24oKS53cml0ZUZlYXR1cmVzKHdmc2ZlYXR1cmVzKSk7XHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVSZXF1ZXN0UGFyYW1zKFxyXG4gICAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gICAgb3B0aW9ucz86IFJldmVyc2VTZWFyY2hPcHRpb25zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICBjb25zdCBsb25nTGF0UGFyYW1zID0gIHt9O1xyXG4gICAgbG9uZ0xhdFBhcmFtc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmxvbmdGaWVsZF0gPSBsb25MYXRbMF07XHJcbiAgICBsb25nTGF0UGFyYW1zW3RoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMubGF0RmllbGRdID0gbG9uTGF0WzFdO1xyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VydmljZTogJ3dmcycsXHJcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4xLjAnLFxyXG4gICAgICAgICAgcmVxdWVzdDogJ0dldEZlYXR1cmUnLFxyXG4gICAgICAgICAgc3RvcmVkcXVlcnlfaWQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQsXHJcbiAgICAgICAgICBzcnNuYW1lOiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUsXHJcbiAgICAgICAgICBvdXRwdXRmb3JtYXQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9uZ0xhdFBhcmFtcyxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMoXHJcbiAgICByZXNwb25zZTogU3RvcmVkUXVlcmllc1JldmVyc2VSZXNwb25zZVxyXG4gICk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdIHtcclxuICAgIHJldHVybiByZXNwb25zZS5mZWF0dXJlcy5tYXAoKGRhdGE6IFN0b3JlZFF1ZXJpZXNSZXZlcnNlRGF0YSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhVG9SZXN1bHQoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGF0YVRvUmVzdWx0KGRhdGE6IFN0b3JlZFF1ZXJpZXNSZXZlcnNlRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgcHJvcGVydGllcy50eXBlLCBkYXRhLmlkXS5qb2luKCcuJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRhdGEucHJvcGVydGllc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlXSA/IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGUgOiB0aGlzLnJlc3VsdFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZ2VvbWV0cnk6IGRhdGEuZ2VvbWV0cnksXHJcbiAgICAgICAgcHJvcGVydGllcyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHRpdGxlOiBkYXRhLnByb3BlcnRpZXNbdGl0bGVdXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGF0YVR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllc1t0aXRsZV0sXHJcbiAgICAgICAgaWNvbjogJ21hcC1tYXJrZXInXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVQcm9wZXJ0aWVzKGRhdGE6IFN0b3JlZFF1ZXJpZXNSZXZlcnNlRGF0YSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdFV0aWxzLnJlbW92ZUtleXMoXHJcbiAgICAgIGRhdGEucHJvcGVydGllcyxcclxuICAgICAgU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHsgdHlwZTogZGF0YS5wcm9wZXJ0aWVzLmRvY190eXBlIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=