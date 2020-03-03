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
        if (this.storedQueriesOptions && !this.storedQueriesOptions.available) {
            return;
        }
        /** @type {?} */
        const defaultStoredqueryId = 'rtss';
        /** @type {?} */
        const defaultFieldSplitter = [
            { name: 'rtss', defaultValue: '-99' },
            { name: 'chainage', defaultValue: '0', splitPrefix: '\\+' }
        ];
        /** @type {?} */
        const defaultOutputformat = 'text/xml; subtype=gml/3.1.1';
        /** @type {?} */
        const defaultSrsname = 'EPSG:4326';
        /** @type {?} */
        const defaultResultTitle = 'title';
        if (!this.storedQueriesOptions) {
            console.log(' No configuration for this search source (storedqueries). You will use the default values');
            this.storedQueriesOptions = {
                storedquery_id: defaultStoredqueryId,
                fields: defaultFieldSplitter,
                outputformat: defaultOutputformat,
                srsname: defaultSrsname,
                resultTitle: defaultResultTitle
            };
            this.resultTitle = defaultResultTitle;
            console.log('Default values', this.storedQueriesOptions);
        }
        if (!this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            const err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You have to set "fields" into options. ex: fields: {"name": "rtss", "defaultValue": "-99"}');
        }
        this.storedQueriesOptions.outputformat =
            this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        this.storedQueriesOptions.srsname =
            this.storedQueriesOptions.srsname || 'EPSG:4326';
        /** @type {?} */
        const storedQueryId = this.storedQueriesOptions.storedquery_id.toLowerCase();
        if (storedQueryId.includes('getfeaturebyid') &&
            this.storedQueriesOptions.outputformat
                .toLowerCase()
                .includes('getfeaturebyid')) {
            /** @type {?} */
            let err = 'You must set a geojson format for your stored query. This is due to an openlayers issue)';
            err += ' (wfs 1.1.0 & gml 3.1.1 limitation)';
            throw new Error(err);
        }
        if (!(this.storedQueriesOptions.fields instanceof Array)) {
            this.storedQueriesOptions.fields = [this.storedQueriesOptions.fields];
        }
        this.multipleFieldsQuery =
            this.storedQueriesOptions.fields.length > 1 ? true : false;
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
        this.storedQueriesOptions.resultTitle =
            this.storedQueriesOptions.resultTitle || this.resultTitle;
    }
    /**
     * @return {?}
     */
    getId() {
        return StoredQueriesSearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return StoredQueriesSearchSource.type;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Stored Queries',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/ws/swtq'
        };
    }
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
            response => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
        else {
            return this.http.get(this.searchUrl, { params }).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            response => {
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
        const localFields = [...fields].reverse();
        localFields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        field => {
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
        const wfsversion = this.storedQueriesOptions.storedquery_id
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
        const title = data.properties[this.storedQueriesOptions.resultTitle]
            ? this.storedQueriesOptions.resultTitle
            : this.resultTitle;
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
        this.storedQueriesOptions.outputformat =
            this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        this.storedQueriesOptions.srsname =
            this.storedQueriesOptions.srsname || 'EPSG:4326';
        this.storedQueriesOptions.resultTitle =
            this.storedQueriesOptions.resultTitle || this.resultTitle;
    }
    /**
     * @return {?}
     */
    getId() {
        return StoredQueriesReverseSearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return StoredQueriesReverseSearchSource.type;
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
            response => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
        else {
            return this.http.get(this.searchUrl, { params }).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            response => {
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
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                storedquery_id: this.storedQueriesOptions.storedquery_id,
                srsname: this.storedQueriesOptions.srsname,
                outputformat: this.storedQueriesOptions.outputformat
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
        const title = data.properties[this.storedQueriesOptions.resultTitle]
            ? this.storedQueriesOptions.resultTitle
            : this.resultTitle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkcXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc3RvcmVkcXVlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUc5RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsT0FBTyxFQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFHcEQsT0FBTyxFQUFFLFlBQVksRUFBNkIsTUFBTSxVQUFVLENBQUM7QUFnQm5FLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDOzs7O0FBTXRDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxZQUFZOzs7OztJQWN6RCxZQUNVLElBQWdCLEVBQ0wsT0FBNEI7UUFFL0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSFAsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUl4QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQUEsT0FBTyxFQUFvQyxDQUFDO1FBQ3hFLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRTtZQUNyRSxPQUFPO1NBQ1I7O2NBRUssb0JBQW9CLEdBQUcsTUFBTTs7Y0FDN0Isb0JBQW9CLEdBQTBCO1lBQ2xELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFO1lBQ3JDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7U0FDNUQ7O2NBQ0ss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QUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixVQUFVO2dCQUNWLElBQUksRUFBRTtvQkFDSixFQUFFO29CQUNGLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztpQkFDOUI7YUFDRjtZQUNELElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsT0FBTztnQkFDakIsRUFBRTtnQkFDRixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLElBQUksRUFBRSxZQUFZO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLGlCQUFpQixDQUN2QixJQUE4Qjs7Y0FFeEIsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQ2YsZ0NBQWdDLENBQUMsbUJBQW1CLENBQ3JEO1FBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQzs7QUFqTE0sbUNBQUUsR0FBRyxzQkFBc0IsQ0FBQztBQUM1QixxQ0FBSSxHQUFHLE9BQU8sQ0FBQztBQUNmLG9EQUFtQixHQUFhLEVBQUUsQ0FBQzs7WUFMM0MsVUFBVTs7OztZQTNVRixVQUFVOzRDQXVWZCxNQUFNLFNBQUMsU0FBUzs7OztJQVRuQixvQ0FBbUM7O0lBQ25DLHNDQUFzQjs7SUFDdEIscURBQTBDOztJQUMxQyx1REFBNEI7O0lBQzVCLGdFQUFxRTs7SUFDckUsK0RBQW9DOzs7OztJQUdsQyxnREFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmUgfSBmcm9tICcuLi8uLi8uLi9mZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlLCBUZXh0U2VhcmNoLCBSZXZlcnNlU2VhcmNoIH0gZnJvbSAnLi9zb3VyY2UnO1xyXG5pbXBvcnQge1xyXG4gIFNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgVGV4dFNlYXJjaE9wdGlvbnMsXHJcbiAgUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxufSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBTdG9yZWRRdWVyaWVzRGF0YSxcclxuICBTdG9yZWRRdWVyaWVzUmVzcG9uc2UsXHJcbiAgU3RvcmVkUXVlcmllc1JldmVyc2VEYXRhLFxyXG4gIFN0b3JlZFF1ZXJpZXNSZXZlcnNlUmVzcG9uc2UsXHJcbiAgU3RvcmVkUXVlcmllc1NlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgU3RvcmVkUXVlcmllc0ZpZWxkcyxcclxuICBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL3N0b3JlZHF1ZXJpZXMuaW50ZXJmYWNlcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5cclxuLyoqXHJcbiAqIFN0b3JlZFF1ZXJpZXMgc2VhcmNoIHNvdXJjZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3RvcmVkUXVlcmllc1NlYXJjaFNvdXJjZSBleHRlbmRzIFNlYXJjaFNvdXJjZVxyXG4gIGltcGxlbWVudHMgVGV4dFNlYXJjaCB7XHJcbiAgc3RhdGljIGlkID0gJ3N0b3JlZHF1ZXJpZXMnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXHJcbiAgICAnYm91bmRlZEJ5JyxcclxuICAgICdpZCcsXHJcbiAgICAnY29vcmRfeCcsXHJcbiAgICAnY29vcmRfeSdcclxuICBdO1xyXG4gIHB1YmxpYyByZXN1bHRUaXRsZTogJ3RpdGxlJztcclxuICBwdWJsaWMgc3RvcmVkUXVlcmllc09wdGlvbnM6IFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBtdWx0aXBsZUZpZWxkc1F1ZXJ5OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBTZWFyY2hTb3VyY2VPcHRpb25zXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMgPSBvcHRpb25zIGFzIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gICAgaWYgKHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMgJiYgIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuYXZhaWxhYmxlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0U3RvcmVkcXVlcnlJZCA9ICdydHNzJztcclxuICAgIGNvbnN0IGRlZmF1bHRGaWVsZFNwbGl0dGVyOiBTdG9yZWRRdWVyaWVzRmllbGRzW10gPSBbXHJcbiAgICAgIHsgbmFtZTogJ3J0c3MnLCBkZWZhdWx0VmFsdWU6ICctOTknIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NoYWluYWdlJywgZGVmYXVsdFZhbHVlOiAnMCcsIHNwbGl0UHJlZml4OiAnXFxcXCsnIH1cclxuICAgIF07XHJcbiAgICBjb25zdCBkZWZhdWx0T3V0cHV0Zm9ybWF0ID0gJ3RleHQveG1sOyBzdWJ0eXBlPWdtbC8zLjEuMSc7XHJcbiAgICBjb25zdCBkZWZhdWx0U3JzbmFtZSA9ICdFUFNHOjQzMjYnO1xyXG4gICAgY29uc3QgZGVmYXVsdFJlc3VsdFRpdGxlID0gJ3RpdGxlJztcclxuXHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgJyBObyBjb25maWd1cmF0aW9uIGZvciB0aGlzIHNlYXJjaCBzb3VyY2UgKHN0b3JlZHF1ZXJpZXMpLiBZb3Ugd2lsbCB1c2UgdGhlIGRlZmF1bHQgdmFsdWVzJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zID0ge1xyXG4gICAgICAgIHN0b3JlZHF1ZXJ5X2lkOiBkZWZhdWx0U3RvcmVkcXVlcnlJZCxcclxuICAgICAgICBmaWVsZHM6IGRlZmF1bHRGaWVsZFNwbGl0dGVyLFxyXG4gICAgICAgIG91dHB1dGZvcm1hdDogZGVmYXVsdE91dHB1dGZvcm1hdCxcclxuICAgICAgICBzcnNuYW1lOiBkZWZhdWx0U3JzbmFtZSxcclxuICAgICAgICByZXN1bHRUaXRsZTogZGVmYXVsdFJlc3VsdFRpdGxlXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucmVzdWx0VGl0bGUgPSBkZWZhdWx0UmVzdWx0VGl0bGU7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdEZWZhdWx0IHZhbHVlcycsIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZCkge1xyXG4gICAgICBjb25zdCBlcnIgPVxyXG4gICAgICAgICdTdG9yZWQgUXVlcmllcyA6WW91IGhhdmUgdG8gc2V0IFwic3RvcmVkcXVlcnlfaWRcIiBpbnRvIFN0b3JlZFF1ZXJpZXMgb3B0aW9ucy4gZXg6IHN0b3JlZHF1ZXJ5X2lkOiBcIm5hbWVvZnN0b3JlZHF1ZXJpZVwiJztcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAnU3RvcmVkIFF1ZXJpZXMgOllvdSBoYXZlIHRvIHNldCBcImZpZWxkc1wiIGludG8gb3B0aW9ucy4gZXg6IGZpZWxkczoge1wibmFtZVwiOiBcInJ0c3NcIiwgXCJkZWZhdWx0VmFsdWVcIjogXCItOTlcIn0nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5vdXRwdXRmb3JtYXQgPVxyXG4gICAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCB8fCAndGV4dC94bWw7IHN1YnR5cGU9Z21sLzMuMS4xJztcclxuICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSA9XHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3JzbmFtZSB8fCAnRVBTRzo0MzI2JztcclxuXHJcbiAgICBjb25zdCBzdG9yZWRRdWVyeUlkID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKFxyXG4gICAgICBzdG9yZWRRdWVyeUlkLmluY2x1ZGVzKCdnZXRmZWF0dXJlYnlpZCcpICYmXHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0XHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAuaW5jbHVkZXMoJ2dldGZlYXR1cmVieWlkJylcclxuICAgICkge1xyXG4gICAgICBsZXQgZXJyID1cclxuICAgICAgICAnWW91IG11c3Qgc2V0IGEgZ2VvanNvbiBmb3JtYXQgZm9yIHlvdXIgc3RvcmVkIHF1ZXJ5LiBUaGlzIGlzIGR1ZSB0byBhbiBvcGVubGF5ZXJzIGlzc3VlKSc7XHJcbiAgICAgIGVyciArPSAnICh3ZnMgMS4xLjAgJiBnbWwgMy4xLjEgbGltaXRhdGlvbiknO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoISh0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcyA9IFt0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkc107XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tdWx0aXBsZUZpZWxkc1F1ZXJ5ID1cclxuICAgICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5maWVsZHMubGVuZ3RoID4gMSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmZpZWxkcy5mb3JFYWNoKChmaWVsZCwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubXVsdGlwbGVGaWVsZHNRdWVyeSAmJiAhZmllbGQuc3BsaXRQcmVmaXggJiYgaW5kZXggIT09IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAnU3RvcmVkIFF1ZXJpZXMgOllvdSBtdXN0IHNldCBhIGZpZWxkIHNwbGl0ZXIgaW50byB5b3VyIGZpZWxkIGRlZmluaXRpb24gKG9wdGlvbmFsIGZvciB0aGUgZmlyc3Qgb25lISknXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZpZWxkLmRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICdTdG9yZWQgUXVlcmllcyA6WW91IG11c3Qgc2V0IGEgZmllbGQgZGVmYXVsdCB2YWx1ZSBpbnRvIHlvdXIgZmllbGQgZGVmaW5pdGlvbidcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlID1cclxuICAgICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZSB8fCB0aGlzLnJlc3VsdFRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlLmlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnU3RvcmVkIFF1ZXJpZXMnLFxyXG4gICAgICBzZWFyY2hVcmw6ICdodHRwczovL2dlb2VnbC5tc3AuZ291di5xYy5jYS9hcGlzL3dzL3N3dHEnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gVVJMIENBTEwgRVhBTVBMRVM6XHJcbiAgLy8gIEdldEZlYXR1cmVCeUlkIChtYW5kYXRvcnkgc3RvcmVkcXVlcnkgZm9yIHdmcyBzZXJ2ZXIpIChvdXRwdXRmb3JtYXQgbXVzdCBiZSBpbiBnZW9qc29uKVxyXG4gIC8vICB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgLy8gIGh0dHBzOi8vZ2VvZWdsLm1zcC5nb3V2LnFjLmNhL2FwaXMvd3Mvc3d0cT9zZXJ2aWNlPXdmcyZ2ZXJzaW9uPTIuMC4wJnJlcXVlc3Q9R2V0RmVhdHVyZSZzdG9yZWRxdWVyeV9pZD11cm46b2djOmRlZjpxdWVyeTpPR0MtV0ZTOjpHZXRGZWF0dXJlQnlJZCZzcnNuYW1lPWVwc2c6NDMyNiZvdXRwdXRmb3JtYXQ9Z2VvanNvbiZJRD1hX251bV9yb3V0ZS4xMzJcclxuICAvLyAgQ3VzdG9tIFN0b3JlZFF1ZXJ5XHJcbiAgLy8gIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAvLyAgaHR0cHM6Ly9nZW9lZ2wubXNwLmdvdXYucWMuY2EvYXBpcy93cy9zd3RxP3NlcnZpY2U9d2ZzJnZlcnNpb249MS4xLjAmcmVxdWVzdD1HZXRGZWF0dXJlJnN0b3JlZHF1ZXJ5X2lkPXJ0c3Mmc3JzbmFtZT1lcHNnOjQzMjYmb3V0cHV0Zm9ybWF0PXRleHQveG1sOyUyMHN1YnR5cGU9Z21sLzMuMS4xJnJ0c3M9MDAxMzgwMTExMDAwMGMmY2hhaW5hZ2U9MTJcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHBhcmFtIHRlcm0gTG9jYXRpb24gbmFtZSBvciBrZXl3b3JkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiA8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W11cclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdPiB7XHJcbiAgICBjb25zdCBzdG9yZWRxdWVyaWVzUGFyYW1zID0gdGhpcy50ZXJtU3BsaXR0ZXIoXHJcbiAgICAgIHRlcm0sXHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuZmllbGRzXHJcbiAgICApO1xyXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgICAgb3B0aW9ucyB8fCB7fSxcclxuICAgICAgc3RvcmVkcXVlcmllc1BhcmFtc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG5ldyBSZWdFeHAoJy4qP2dtbC4qPycsICdpJykudGVzdCh0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyh0aGlzLmV4dHJhY3RXRlNEYXRhKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSkucGlwZShcclxuICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHModGhpcy5leHRyYWN0V0ZTRGF0YShyZXNwb25zZSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0O1xyXG4gICAgY29uc3QgcGF0dGVybkdtbDMgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpO1xyXG4gICAgY29uc3QgcGF0dGVybkdlb2pzb24gPSBuZXcgUmVnRXhwKCcuKj9qc29uLio/JywgJ2knKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdlb2pzb24udGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuR21sMy50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0V0ZTRGF0YShyZXMpIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpO1xyXG4gICAgY29uc3QgZ2VvanNvbiA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICBjb25zdCB3ZnNmZWF0dXJlcyA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBKU09OLnBhcnNlKG5ldyBnZW9qc29uKCkud3JpdGVGZWF0dXJlcyh3ZnNmZWF0dXJlcykpO1xyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXJtU3BsaXR0ZXIodGVybTogc3RyaW5nLCBmaWVsZHM6IFN0b3JlZFF1ZXJpZXNGaWVsZHNbXSk6IHt9IHtcclxuICAgIGNvbnN0IHNwbGl0dGVkVGVybSA9IHt9O1xyXG4gICAgbGV0IHJlbWFpbmluZ1Rlcm0gPSB0ZXJtO1xyXG4gICAgbGV0IGNudCA9IDA7XHJcblxyXG4gICAgLy8gVXNlZCB0byBidWlsZCB0aGUgZGVmYXVsdCB2YWx1ZXNcclxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgc3BsaXR0ZWRUZXJtW2ZpZWxkLm5hbWVdID0gZmllbGQuZGVmYXVsdFZhbHVlO1xyXG4gICAgICBjb25zdCBzcGxpdHRlclJlZ2V4ID0gbmV3IFJlZ0V4cChmaWVsZC5zcGxpdFByZWZpeCArICcoLispJywgJ2knKTtcclxuICAgICAgaWYgKHNwbGl0dGVyUmVnZXgudGVzdChyZW1haW5pbmdUZXJtKSkge1xyXG4gICAgICAgIGNudCA9IGZpZWxkLnNwbGl0UHJlZml4ID8gKGNudCArPSAxKSA6IGNudDtcclxuICAgICAgICByZW1haW5pbmdUZXJtID0gcmVtYWluaW5nVGVybS5zcGxpdChzcGxpdHRlclJlZ2V4KVsxXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoY250ID09PSAwKSB7XHJcbiAgICAgIHNwbGl0dGVkVGVybVtmaWVsZHNbMF0ubmFtZV0gPSB0ZXJtO1xyXG4gICAgICByZXR1cm4gc3BsaXR0ZWRUZXJtO1xyXG4gICAgfVxyXG4gICAgcmVtYWluaW5nVGVybSA9IHRlcm07XHJcbiAgICBjb25zdCBsb2NhbEZpZWxkcyA9IFsuLi5maWVsZHNdLnJldmVyc2UoKTtcclxuICAgIGxvY2FsRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICBjb25zdCBzcGxpdHRlclJlZ2V4ID0gbmV3IFJlZ0V4cChmaWVsZC5zcGxpdFByZWZpeCB8fCAnJyArICcoLispJywgJ2knKTtcclxuICAgICAgaWYgKHJlbWFpbmluZ1Rlcm0gfHwgcmVtYWluaW5nVGVybSAhPT0gJycpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSByZW1haW5pbmdUZXJtLnNwbGl0KHNwbGl0dGVyUmVnZXgpO1xyXG4gICAgICAgIHJlbWFpbmluZ1Rlcm0gPSB2YWx1ZXNbMF07XHJcbiAgICAgICAgaWYgKHZhbHVlc1sxXSkge1xyXG4gICAgICAgICAgc3BsaXR0ZWRUZXJtW2ZpZWxkLm5hbWVdID0gdmFsdWVzWzFdLnRyaW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNwbGl0dGVkVGVybTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVJlcXVlc3RQYXJhbXMoXHJcbiAgICBvcHRpb25zOiBUZXh0U2VhcmNoT3B0aW9ucyxcclxuICAgIHF1ZXJ5UGFyYW1zXHJcbiAgKTogSHR0cFBhcmFtcyB7XHJcbiAgICBjb25zdCB3ZnN2ZXJzaW9uID0gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zdG9yZWRxdWVyeV9pZFxyXG4gICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAuaW5jbHVkZXMoJ2dldGZlYXR1cmVieWlkJylcclxuICAgICAgPyAnMi4wLjAnXHJcbiAgICAgIDogJzEuMS4wJztcclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VydmljZTogJ3dmcycsXHJcbiAgICAgICAgICB2ZXJzaW9uOiB3ZnN2ZXJzaW9uLFxyXG4gICAgICAgICAgcmVxdWVzdDogJ0dldEZlYXR1cmUnLFxyXG4gICAgICAgICAgc3RvcmVkcXVlcnlfaWQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQsXHJcbiAgICAgICAgICBzcnNuYW1lOiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUsXHJcbiAgICAgICAgICBvdXRwdXRmb3JtYXQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBxdWVyeVBhcmFtcyxcclxuICAgICAgICB0aGlzLnBhcmFtcyxcclxuICAgICAgICBvcHRpb25zLnBhcmFtcyB8fCB7fVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJlc3VsdHMoXHJcbiAgICByZXNwb25zZTogU3RvcmVkUXVlcmllc1Jlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogU3RvcmVkUXVlcmllc0RhdGEpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YVRvUmVzdWx0KGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRhdGFUb1Jlc3VsdChkYXRhOiBTdG9yZWRRdWVyaWVzRGF0YSk6IFNlYXJjaFJlc3VsdDxGZWF0dXJlPiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUHJvcGVydGllcyhkYXRhKTtcclxuICAgIGNvbnN0IGlkID0gW3RoaXMuZ2V0SWQoKSwgcHJvcGVydGllcy50eXBlLCBkYXRhLmlkXS5qb2luKCcuJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRhdGEucHJvcGVydGllc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnJlc3VsdFRpdGxlXVxyXG4gICAgICA/IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGVcclxuICAgICAgOiB0aGlzLnJlc3VsdFRpdGxlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICAvLyBleHRlbnQ6IGRhdGEuYmJveCxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllc1t0aXRsZV1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzLnRpdGxlLFxyXG4gICAgICAgIHRpdGxlSHRtbDogZGF0YS5wcm9wZXJ0aWVzW3RpdGxlXSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoZGF0YTogU3RvcmVkUXVlcmllc0RhdGEpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIFN0b3JlZFF1ZXJpZXNTZWFyY2hTb3VyY2UucHJvcGVydGllc0JsYWNrbGlzdFxyXG4gICAgKTtcclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN0b3JlZFF1ZXJpZXNSZXZlcnNlIHNlYXJjaCBzb3VyY2VcclxuICovXHJcblxyXG4vLyBFWEFNUExFIENBTExTXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuLy8gaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHE/c2VydmljZT13ZnMmdmVyc2lvbj0xLjEuMCZyZXF1ZXN0PUdldEZlYXR1cmUmc3RvcmVkcXVlcnlfaWQ9bGltX2FkbSZzcnNuYW1lPWVwc2c6NDMyNiZvdXRwdXRmb3JtYXQ9dGV4dC94bWw7JTIwc3VidHlwZT1nbWwvMy4xLjEmbG9uZz0tNzEuMjkyNDY5JmxhdD00Ni43NDgxMDdcclxuLy9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlIGV4dGVuZHMgU2VhcmNoU291cmNlXHJcbiAgaW1wbGVtZW50cyBSZXZlcnNlU2VhcmNoIHtcclxuICBzdGF0aWMgaWQgPSAnc3RvcmVkcXVlcmllc3JldmVyc2UnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuICBzdGF0aWMgcHJvcGVydGllc0JsYWNrbGlzdDogc3RyaW5nW10gPSBbXTtcclxuICBwdWJsaWMgcmVzdWx0VGl0bGU6ICd0aXRsZSc7XHJcbiAgcHVibGljIHN0b3JlZFF1ZXJpZXNPcHRpb25zOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG11bHRpcGxlRmllbGRzUXVlcnk6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucyA9IG9wdGlvbnMgYXMgU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2VPcHRpb25zO1xyXG4gICAgaWYgKCF0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnN0b3JlZHF1ZXJ5X2lkKSB7XHJcbiAgICAgIGNvbnN0IGVyciA9XHJcbiAgICAgICAgJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJzdG9yZWRxdWVyeV9pZFwiIGludG8gU3RvcmVkUXVlcmllcyBvcHRpb25zLiBleDogc3RvcmVkcXVlcnlfaWQ6IFwibmFtZW9mc3RvcmVkcXVlcmllXCInO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5sb25nRmllbGQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICdTdG9yZWQgUXVlcmllcyA6WW91IGhhdmUgdG8gc2V0IFwibG9uZ0ZpZWxkXCIgdG8gbWFwIHRoZSBsb25naXR1ZGUgY29vcmRpbmF0ZSB0byB0aGUgcXVlcnkgcGFyYW1zLidcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5sYXRGaWVsZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgJ1N0b3JlZCBRdWVyaWVzIDpZb3UgaGF2ZSB0byBzZXQgXCJsYXRGaWVsZFwiIHRvIG1hcCB0aGUgbGF0aXR1ZGUgY29vcmRpbmF0ZSB0byB0aGUgcXVlcnkgcGFyYW1zLidcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdCA9XHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0IHx8ICd0ZXh0L3htbDsgc3VidHlwZT1nbWwvMy4xLjEnO1xyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zcnNuYW1lID1cclxuICAgICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5zcnNuYW1lIHx8ICdFUFNHOjQzMjYnO1xyXG4gICAgdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZSA9XHJcbiAgICAgIHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGUgfHwgdGhpcy5yZXN1bHRUaXRsZTtcclxuICB9XHJcblxyXG4gIGdldElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2UuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RvcmVkUXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2UudHlwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0T3B0aW9ucygpOiBTZWFyY2hTb3VyY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAnU3RvcmVkIFF1ZXJpZXMgKHJldmVyc2UpJyxcclxuICAgICAgc2VhcmNoVXJsOiAnaHR0cHM6Ly93cy5tYXBzZXJ2ZXIudHJhbnNwb3J0cy5nb3V2LnFjLmNhL3N3dHEnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIGEgbG9jYXRpb24gYnkgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0gbG9uTGF0IExvY2F0aW9uIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIGRpc3RhbmNlIFNlYXJjaCByYWlkdXMgYXJvdW5kIGxvbkxhdFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgPFNlYXJjaFJlc3VsdDxGZWF0dXJlPltdXHJcbiAgICovXHJcbiAgcmV2ZXJzZVNlYXJjaChcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IE9ic2VydmFibGU8U2VhcmNoUmVzdWx0PEZlYXR1cmU+W10+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29tcHV0ZVJlcXVlc3RQYXJhbXMobG9uTGF0LCBvcHRpb25zIHx8IHt9KTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG5ldyBSZWdFeHAoJy4qP2dtbC4qPycsICdpJykudGVzdCh0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLm91dHB1dGZvcm1hdClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0UmVzdWx0cyh0aGlzLmV4dHJhY3RXRlNEYXRhKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlYXJjaFVybCwgeyBwYXJhbXMgfSkucGlwZShcclxuICAgICAgICBtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdFJlc3VsdHModGhpcy5leHRyYWN0V0ZTRGF0YShyZXNwb25zZSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm1hdEZyb21PcHRpb25zKCkge1xyXG4gICAgbGV0IG9sRm9ybWF0Q2xzO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0O1xyXG4gICAgY29uc3QgcGF0dGVybkdtbDMgPSBuZXcgUmVnRXhwKCcuKj9nbWwuKj8nLCAnaScpO1xyXG4gICAgY29uc3QgcGF0dGVybkdlb2pzb24gPSBuZXcgUmVnRXhwKCcuKj9qc29uLio/JywgJ2knKTtcclxuXHJcbiAgICBpZiAocGF0dGVybkdlb2pzb24udGVzdChvdXRwdXRGb3JtYXQpKSB7XHJcbiAgICAgIG9sRm9ybWF0Q2xzID0gb2xmb3JtYXQuR2VvSlNPTjtcclxuICAgIH1cclxuICAgIGlmIChwYXR0ZXJuR21sMy50ZXN0KG91dHB1dEZvcm1hdCkpIHtcclxuICAgICAgb2xGb3JtYXRDbHMgPSBvbGZvcm1hdC5XRlM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbEZvcm1hdENscygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0V0ZTRGF0YShyZXMpIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gdGhpcy5nZXRGb3JtYXRGcm9tT3B0aW9ucygpO1xyXG4gICAgY29uc3QgZ2VvanNvbiA9IG9sZm9ybWF0Lkdlb0pTT047XHJcbiAgICBjb25zdCB3ZnNmZWF0dXJlcyA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBKU09OLnBhcnNlKG5ldyBnZW9qc29uKCkud3JpdGVGZWF0dXJlcyh3ZnNmZWF0dXJlcykpO1xyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlUmVxdWVzdFBhcmFtcyhcclxuICAgIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICAgIG9wdGlvbnM/OiBSZXZlcnNlU2VhcmNoT3B0aW9uc1xyXG4gICk6IEh0dHBQYXJhbXMge1xyXG4gICAgY29uc3QgbG9uZ0xhdFBhcmFtcyA9IHt9O1xyXG4gICAgbG9uZ0xhdFBhcmFtc1t0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLmxvbmdGaWVsZF0gPSBsb25MYXRbMF07XHJcbiAgICBsb25nTGF0UGFyYW1zW3RoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMubGF0RmllbGRdID0gbG9uTGF0WzFdO1xyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VydmljZTogJ1dGUycsXHJcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4xLjAnLFxyXG4gICAgICAgICAgcmVxdWVzdDogJ0dldEZlYXR1cmUnLFxyXG4gICAgICAgICAgc3RvcmVkcXVlcnlfaWQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMuc3RvcmVkcXVlcnlfaWQsXHJcbiAgICAgICAgICBzcnNuYW1lOiB0aGlzLnN0b3JlZFF1ZXJpZXNPcHRpb25zLnNyc25hbWUsXHJcbiAgICAgICAgICBvdXRwdXRmb3JtYXQ6IHRoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMub3V0cHV0Zm9ybWF0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb25nTGF0UGFyYW1zLFxyXG4gICAgICAgIHRoaXMucGFyYW1zLFxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zIHx8IHt9XHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UmVzdWx0cyhcclxuICAgIHJlc3BvbnNlOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZVJlc3BvbnNlXHJcbiAgKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+W10ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmZlYXR1cmVzLm1hcCgoZGF0YTogU3RvcmVkUXVlcmllc1JldmVyc2VEYXRhKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFUb1Jlc3VsdChkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkYXRhVG9SZXN1bHQoZGF0YTogU3RvcmVkUXVlcmllc1JldmVyc2VEYXRhKTogU2VhcmNoUmVzdWx0PEZlYXR1cmU+IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVQcm9wZXJ0aWVzKGRhdGEpO1xyXG4gICAgY29uc3QgaWQgPSBbdGhpcy5nZXRJZCgpLCBwcm9wZXJ0aWVzLnR5cGUsIGRhdGEuaWRdLmpvaW4oJy4nKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZGF0YS5wcm9wZXJ0aWVzW3RoaXMuc3RvcmVkUXVlcmllc09wdGlvbnMucmVzdWx0VGl0bGVdXHJcbiAgICAgID8gdGhpcy5zdG9yZWRRdWVyaWVzT3B0aW9ucy5yZXN1bHRUaXRsZVxyXG4gICAgICA6IHRoaXMucmVzdWx0VGl0bGU7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgICBnZW9tZXRyeTogZGF0YS5nZW9tZXRyeSxcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgdGl0bGU6IGRhdGEucHJvcGVydGllc1t0aXRsZV1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkYXRhVHlwZTogRkVBVFVSRSxcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogZGF0YS5wcm9wZXJ0aWVzW3RpdGxlXSxcclxuICAgICAgICBpY29uOiAnbWFwLW1hcmtlcidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVByb3BlcnRpZXMoXHJcbiAgICBkYXRhOiBTdG9yZWRRdWVyaWVzUmV2ZXJzZURhdGFcclxuICApOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3RVdGlscy5yZW1vdmVLZXlzKFxyXG4gICAgICBkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlLnByb3BlcnRpZXNCbGFja2xpc3RcclxuICAgICk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB7IHR5cGU6IGRhdGEucHJvcGVydGllcy5kb2NfdHlwZSB9KTtcclxuICB9XHJcbn1cclxuIl19