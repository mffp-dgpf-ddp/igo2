/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as olformat from 'ol/format';
import * as olextent from 'ol/extent';
import olFormatGML2 from 'ol/format/GML2';
import olFormatGML3 from 'ol/format/GML3';
import olFormatEsriJSON from 'ol/format/EsriJSON';
import { uuid } from '@igo2/utils';
import { FEATURE } from '../../feature/shared/feature.enums';
import { WMSDataSource, CartoDataSource, TileArcGISRestDataSource } from '../../datasource';
import { QueryFormat, QueryHtmlTarget } from './query.enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class QueryService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.queryEnabled = true;
    }
    /**
     * @param {?} layers
     * @param {?} options
     * @return {?}
     */
    query(layers, options) {
        return layers
            .filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.visible && layer.isInResolutionsRange))
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.queryLayer(layer, options)));
    }
    /**
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    queryLayer(layer, options) {
        /** @type {?} */
        const url = this.getQueryUrl(layer.dataSource, options);
        if (!url) {
            return of([]);
        }
        /** @type {?} */
        const request = this.http.get(url, { responseType: 'text' });
        return request.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => this.extractData(res, layer, options, url))));
    }
    /**
     * @private
     * @param {?} res
     * @param {?} layer
     * @param {?} options
     * @param {?} url
     * @return {?}
     */
    extractData(res, layer, options, url) {
        /** @type {?} */
        const queryDataSource = (/** @type {?} */ (layer.dataSource));
        /** @type {?} */
        let allowedFieldsAndAlias;
        if (layer.options &&
            layer.options.sourceOptions &&
            layer.options.sourceOptions.sourceFields &&
            layer.options.sourceOptions.sourceFields.length >= 1) {
            allowedFieldsAndAlias = {};
            layer.options.sourceOptions.sourceFields.forEach((/**
             * @param {?} sourceField
             * @return {?}
             */
            sourceField => {
                /** @type {?} */
                const alias = sourceField.alias ? sourceField.alias : sourceField.name;
                allowedFieldsAndAlias[sourceField.name] = alias;
            }));
        }
        /** @type {?} */
        let features = [];
        switch (queryDataSource.options.queryFormat) {
            case QueryFormat.GML3:
                features = this.extractGML3Data(res, layer.zIndex, allowedFieldsAndAlias);
                break;
            case QueryFormat.JSON:
            case QueryFormat.GEOJSON:
                features = this.extractGeoJSONData(res);
                break;
            case QueryFormat.ESRIJSON:
                features = this.extractEsriJSONData(res, layer.zIndex);
                break;
            case QueryFormat.TEXT:
                features = this.extractTextData(res);
                break;
            case QueryFormat.HTML:
                features = this.extractHtmlData(res, queryDataSource.queryHtmlTarget, url);
                break;
            case QueryFormat.GML2:
            default:
                features = this.extractGML2Data(res, layer, allowedFieldsAndAlias);
                break;
        }
        return features.map((/**
         * @param {?} feature
         * @param {?} index
         * @return {?}
         */
        (feature, index) => {
            /** @type {?} */
            let title = feature.properties[queryDataSource.queryTitle];
            if (!title && features.length > 1) {
                title = `${layer.title} (${index + 1})`;
            }
            else if (!title) {
                title = layer.title;
            }
            /** @type {?} */
            const meta = Object.assign({}, feature.meta || {}, {
                id: uuid(),
                title,
                mapTitle: title,
                sourceTitle: layer.title,
                order: 1000 - layer.zIndex
            });
            return Object.assign(feature, {
                meta,
                projection: queryDataSource.options.type === 'carto'
                    ? 'EPSG:4326'
                    : options.projection
            });
        }));
    }
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    extractGML2Data(res, zIndex, allowedFieldsAndAlias) {
        /** @type {?} */
        let parser = new olFormatGML2();
        /** @type {?} */
        let features = parser.readFeatures(res);
        // Handle non standard GML output (MapServer)
        if (features.length === 0) {
            parser = new olformat.WMSGetFeatureInfo();
            features = parser.readFeatures(res);
        }
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => this.featureToResult(feature, zIndex, allowedFieldsAndAlias)));
    }
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    extractGML3Data(res, zIndex, allowedFieldsAndAlias) {
        /** @type {?} */
        const parser = new olFormatGML3();
        /** @type {?} */
        const features = parser.readFeatures(res);
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => this.featureToResult(feature, zIndex, allowedFieldsAndAlias)));
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractGeoJSONData(res) {
        /** @type {?} */
        let features = [];
        try {
            features = JSON.parse(res).features;
        }
        catch (e) {
            console.warn('query.service: Unable to parse geojson', '\n', res);
        }
        return features;
    }
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @return {?}
     */
    extractEsriJSONData(res, zIndex) {
        /** @type {?} */
        const parser = new olFormatEsriJSON();
        /** @type {?} */
        const features = parser.readFeatures(res);
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => this.featureToResult(feature, zIndex)));
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractTextData(res) {
        // TODO
        return [];
    }
    /**
     * @private
     * @param {?} res
     * @param {?} htmlTarget
     * @param {?} url
     * @return {?}
     */
    extractHtmlData(res, htmlTarget, url) {
        // _blank , iframe or undefined
        /** @type {?} */
        const searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        const bboxRaw = searchParams.bbox;
        /** @type {?} */
        const width = parseInt(searchParams.width, 10);
        /** @type {?} */
        const height = parseInt(searchParams.height, 10);
        /** @type {?} */
        const xPosition = parseInt(searchParams.i || searchParams.x, 10);
        /** @type {?} */
        const yPosition = parseInt(searchParams.j || searchParams.y, 10);
        /** @type {?} */
        const projection = searchParams.crs || searchParams.srs || 'EPSG:3857';
        /** @type {?} */
        const bbox = bboxRaw.split(',');
        /** @type {?} */
        let threshold = (Math.abs(parseFloat(bbox[0])) - Math.abs(parseFloat(bbox[2]))) * 0.05;
        // for context in degree (EPSG:4326,4269...)
        if (Math.abs(parseFloat(bbox[0])) < 180) {
            threshold = 0.045;
        }
        /** @type {?} */
        const clickx = parseFloat(bbox[0]) +
            (Math.abs(parseFloat(bbox[0]) - parseFloat(bbox[2])) * xPosition) /
                width -
            threshold;
        /** @type {?} */
        const clicky = parseFloat(bbox[1]) +
            (Math.abs(parseFloat(bbox[1]) - parseFloat(bbox[3])) * yPosition) /
                height -
            threshold;
        /** @type {?} */
        const clickx1 = clickx + threshold * 2;
        /** @type {?} */
        const clicky1 = clicky + threshold * 2;
        /** @type {?} */
        const wktPoly = 'POLYGON((' +
            clickx +
            ' ' +
            clicky +
            ', ' +
            clickx +
            ' ' +
            clicky1 +
            ', ' +
            clickx1 +
            ' ' +
            clicky1 +
            ', ' +
            clickx1 +
            ' ' +
            clicky +
            ', ' +
            clickx +
            ' ' +
            clicky +
            '))';
        /** @type {?} */
        const format = new olformat.WKT();
        /** @type {?} */
        const tenPercentWidthGeom = format.readFeature(wktPoly);
        /** @type {?} */
        const f = (/** @type {?} */ (tenPercentWidthGeom.getGeometry()));
        if (htmlTarget !== QueryHtmlTarget.BLANK &&
            htmlTarget !== QueryHtmlTarget.IFRAME) {
            htmlTarget = QueryHtmlTarget.IFRAME;
        }
        /** @type {?} */
        const bodyTagStart = res.toLowerCase().indexOf('<body>');
        /** @type {?} */
        const bodyTagEnd = res.toLowerCase().lastIndexOf('</body>') + 7;
        // replace \r \n  and ' ' with '' to validate if the body is really empty.
        /** @type {?} */
        const body = res.slice(bodyTagStart, bodyTagEnd).replace(/(\r|\n|\s)/g, '');
        if (body === '<body></body>' || res === '') {
            return [];
        }
        return [
            {
                type: FEATURE,
                projection,
                properties: { target: htmlTarget, body: res, url },
                geometry: { type: f.getType(), coordinates: f.getCoordinates() }
            }
        ];
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    getQueryParams(url) {
        /** @type {?} */
        const queryString = url.split('?');
        if (!queryString[1]) {
            return;
        }
        /** @type {?} */
        const pairs = queryString[1].split('&');
        /** @type {?} */
        const result = {};
        pairs.forEach((/**
         * @param {?} pair
         * @return {?}
         */
        pair => {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        }));
        return result;
    }
    /**
     * @private
     * @param {?} featureOL
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    featureToResult(featureOL, zIndex, allowedFieldsAndAlias) {
        /** @type {?} */
        const featureGeometry = (/** @type {?} */ (featureOL.getGeometry()));
        /** @type {?} */
        const properties = Object.assign({}, featureOL.getProperties());
        delete properties.geometry;
        delete properties.boundedBy;
        delete properties.shape;
        delete properties.SHAPE;
        delete properties.the_geom;
        /** @type {?} */
        let geometry;
        if (featureGeometry !== undefined) {
            geometry = {
                type: featureGeometry.getType(),
                coordinates: featureGeometry.getCoordinates()
            };
        }
        return {
            type: FEATURE,
            projection: undefined,
            properties,
            geometry,
            meta: {
                id: uuid(),
                order: 1000 - zIndex,
                alias: allowedFieldsAndAlias
            }
        };
    }
    /**
     * @private
     * @param {?} datasource
     * @param {?} options
     * @return {?}
     */
    getQueryUrl(datasource, options) {
        /** @type {?} */
        let url;
        switch (datasource.constructor) {
            case WMSDataSource:
                /** @type {?} */
                const wmsDatasource = (/** @type {?} */ (datasource));
                url = wmsDatasource.ol.getGetFeatureInfoUrl(options.coordinates, options.resolution, options.projection, {
                    INFO_FORMAT: wmsDatasource.params.info_format ||
                        this.getMimeInfoFormat(datasource.options.queryFormat),
                    QUERY_LAYERS: wmsDatasource.params.layers,
                    FEATURE_COUNT: wmsDatasource.params.feature_count || '5'
                });
                if (wmsDatasource.params.version !== '1.3.0') {
                    url = url.replace('&I=', '&X=');
                    url = url.replace('&J=', '&Y=');
                }
                break;
            case CartoDataSource:
                /** @type {?} */
                const cartoDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                const baseUrl = 'https://' +
                    cartoDatasource.options.account +
                    '.carto.com/api/v2/sql?';
                /** @type {?} */
                const format = 'format=GeoJSON';
                /** @type {?} */
                const sql = '&q=' + cartoDatasource.options.config.layers[0].options.sql;
                /** @type {?} */
                const clause = ' WHERE ST_Intersects(the_geom_webmercator,ST_BUFFER(ST_SetSRID(ST_POINT(';
                /** @type {?} */
                const metres = cartoDatasource.options.queryPrecision
                    ? cartoDatasource.options.queryPrecision
                    : '1000';
                /** @type {?} */
                const coordinates = options.coordinates[0] +
                    ',' +
                    options.coordinates[1] +
                    '),3857),' +
                    metres +
                    '))';
                url = `${baseUrl}${format}${sql}${clause}${coordinates}`;
                break;
            case TileArcGISRestDataSource:
                /** @type {?} */
                const tileArcGISRestDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                let extent = olextent.boundingExtent([options.coordinates]);
                if (tileArcGISRestDatasource.options.queryPrecision) {
                    extent = olextent.buffer(extent, tileArcGISRestDatasource.options.queryPrecision);
                }
                /** @type {?} */
                const serviceUrl = tileArcGISRestDatasource.options.url +
                    '/' +
                    tileArcGISRestDatasource.options.layer +
                    '/query/';
                /** @type {?} */
                const geometry = encodeURIComponent('{"xmin":' +
                    extent[0] +
                    ',"ymin":' +
                    extent[1] +
                    ',"xmax":' +
                    extent[2] +
                    ',"ymax":' +
                    extent[3] +
                    ',"spatialReference":{"wkid":102100}}');
                /** @type {?} */
                const params = [
                    'f=json',
                    `geometry=${geometry}`,
                    'geometryType=esriGeometryEnvelope',
                    'inSR=102100',
                    'spatialRel=esriSpatialRelIntersects',
                    'outFields=*',
                    'returnGeometry=true',
                    'outSR=102100'
                ];
                url = `${serviceUrl}?${params.join('&')}`;
                break;
            default:
                break;
        }
        return url;
    }
    /**
     * @private
     * @param {?} queryFormat
     * @return {?}
     */
    getMimeInfoFormat(queryFormat) {
        /** @type {?} */
        let mime;
        switch (queryFormat) {
            case QueryFormat.GML2:
                mime = 'application/vnd.ogc.gml';
                break;
            case QueryFormat.GML3:
                mime = 'application/vnd.ogc.gml/3.1.1';
                break;
            case QueryFormat.JSON:
                mime = 'application/json';
                break;
            case QueryFormat.GEOJSON:
                mime = 'application/geojson';
                break;
            case QueryFormat.TEXT:
                mime = 'text/plain';
                break;
            case QueryFormat.HTML:
                mime = 'text/html';
                break;
            default:
                mime = 'application/vnd.ogc.gml';
                break;
        }
        return mime;
    }
}
QueryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
QueryService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ QueryService.ngInjectableDef = i0.defineInjectable({ factory: function QueryService_Factory() { return new QueryService(i0.inject(i1.HttpClient)); }, token: QueryService, providedIn: "root" });
if (false) {
    /** @type {?} */
    QueryService.prototype.queryEnabled;
    /**
     * @type {?}
     * @private
     */
    QueryService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU3RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZix3QkFBd0IsRUFDekIsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTTdELE1BQU0sT0FBTyxZQUFZOzs7O0lBR3ZCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGN0IsaUJBQVksR0FBRyxJQUFJLENBQUM7SUFFWSxDQUFDOzs7Ozs7SUFFeEMsS0FBSyxDQUFDLE1BQWUsRUFBRSxPQUFxQjtRQUMxQyxPQUFPLE1BQU07YUFDVixNQUFNOzs7O1FBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLG9CQUFvQixFQUFDO2FBQ3JFLEdBQUc7Ozs7UUFBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUMsQ0FBQztJQUM1RCxDQUFDOzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBWSxFQUFFLE9BQXFCOztjQUN0QyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZjs7Y0FFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzVELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7Ozs7Ozs7SUFFTyxXQUFXLENBQ2pCLEdBQUcsRUFDSCxLQUFZLEVBQ1osT0FBcUIsRUFDckIsR0FBVzs7Y0FFTCxlQUFlLEdBQUcsbUJBQUEsS0FBSyxDQUFDLFVBQVUsRUFBdUI7O1lBRTNELHFCQUFxQjtRQUN6QixJQUNFLEtBQUssQ0FBQyxPQUFPO1lBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhO1lBQzNCLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVk7WUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQ3BEO1lBQ0EscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O1lBQUMsV0FBVyxDQUFDLEVBQUU7O3NCQUN2RCxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQ3RFLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDbEQsQ0FBQyxFQUFDLENBQUM7U0FDSjs7WUFDRyxRQUFRLEdBQUcsRUFBRTtRQUNqQixRQUFRLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzNDLEtBQUssV0FBVyxDQUFDLElBQUk7Z0JBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUM3QixHQUFHLEVBQ0gsS0FBSyxDQUFDLE1BQU0sRUFDWixxQkFBcUIsQ0FDdEIsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEtBQUssV0FBVyxDQUFDLE9BQU87Z0JBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxRQUFRO2dCQUN2QixRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUk7Z0JBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUM3QixHQUFHLEVBQ0gsZUFBZSxDQUFDLGVBQWUsRUFDL0IsR0FBRyxDQUNKLENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQztZQUN0QjtnQkFDRSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUM7Z0JBQ25FLE1BQU07U0FDVDtRQUVELE9BQU8sUUFBUSxDQUFDLEdBQUc7Ozs7O1FBQUMsQ0FBQyxPQUFnQixFQUFFLEtBQWEsRUFBRSxFQUFFOztnQkFDbEQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUN6QztpQkFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNyQjs7a0JBQ0ssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFO2dCQUNqRCxFQUFFLEVBQUUsSUFBSSxFQUFFO2dCQUNWLEtBQUs7Z0JBQ0wsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsV0FBVyxFQUFFLEtBQUssQ0FBQyxLQUFLO2dCQUN4QixLQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNO2FBQzNCLENBQUM7WUFFRixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUM1QixJQUFJO2dCQUNKLFVBQVUsRUFDUixlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPO29CQUN0QyxDQUFDLENBQUMsV0FBVztvQkFDYixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVU7YUFDekIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7OztJQUVPLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLHFCQUFzQjs7WUFDckQsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFOztZQUMzQixRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDdkMsNkNBQTZDO1FBQzdDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDMUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7UUFFRCxPQUFPLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixDQUFDLEVBQzdELENBQUM7SUFDSixDQUFDOzs7Ozs7OztJQUVPLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLHFCQUFzQjs7Y0FDbkQsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFOztjQUMzQixRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDekMsT0FBTyxRQUFRLENBQUMsR0FBRzs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxFQUM3RCxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsR0FBRzs7WUFDeEIsUUFBUSxHQUFHLEVBQUU7UUFDakIsSUFBSTtZQUNGLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUNyQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsR0FBRyxFQUFFLE1BQU07O2NBQy9CLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFOztjQUMvQixRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFFekMsT0FBTyxRQUFRLENBQUMsR0FBRzs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUMsQ0FBQztJQUN4RSxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsR0FBRztRQUN6QixPQUFPO1FBQ1AsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7Ozs7OztJQUVPLGVBQWUsQ0FBQyxHQUFHLEVBQUUsVUFBMkIsRUFBRSxHQUFHOzs7Y0FFckQsWUFBWSxHQUFRLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDOztjQUMxRCxPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUk7O2NBQzNCLEtBQUssR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7O2NBQ3hDLE1BQU0sR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7O2NBQzFDLFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Y0FDMUQsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDOztjQUMxRCxVQUFVLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxJQUFJLFdBQVc7O2NBRWhFLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7WUFDM0IsU0FBUyxHQUNYLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSTtRQUV4RSw0Q0FBNEM7UUFDNUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUN2QyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ25COztjQUVLLE1BQU0sR0FDVixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUMvRCxLQUFLO1lBQ1AsU0FBUzs7Y0FDTCxNQUFNLEdBQ1YsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDL0QsTUFBTTtZQUNSLFNBQVM7O2NBQ0wsT0FBTyxHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsQ0FBQzs7Y0FDaEMsT0FBTyxHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsQ0FBQzs7Y0FFaEMsT0FBTyxHQUNYLFdBQVc7WUFDWCxNQUFNO1lBQ04sR0FBRztZQUNILE1BQU07WUFDTixJQUFJO1lBQ0osTUFBTTtZQUNOLEdBQUc7WUFDSCxPQUFPO1lBQ1AsSUFBSTtZQUNKLE9BQU87WUFDUCxHQUFHO1lBQ0gsT0FBTztZQUNQLElBQUk7WUFDSixPQUFPO1lBQ1AsR0FBRztZQUNILE1BQU07WUFDTixJQUFJO1lBQ0osTUFBTTtZQUNOLEdBQUc7WUFDSCxNQUFNO1lBQ04sSUFBSTs7Y0FFQSxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFOztjQUMzQixtQkFBbUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQzs7Y0FDakQsQ0FBQyxHQUFHLG1CQUFBLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxFQUFPO1FBRWxELElBQ0UsVUFBVSxLQUFLLGVBQWUsQ0FBQyxLQUFLO1lBQ3BDLFVBQVUsS0FBSyxlQUFlLENBQUMsTUFBTSxFQUNyQztZQUNBLFVBQVUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1NBQ3JDOztjQUVLLFlBQVksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7Y0FDbEQsVUFBVSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzs7O2NBRXpELElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztRQUMzRSxJQUFJLElBQUksS0FBSyxlQUFlLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtZQUMxQyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTztZQUNMO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLFVBQVU7Z0JBQ1YsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDbEQsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO2FBQ2pFO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxHQUFHOztjQUNsQixXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNuQixPQUFPO1NBQ1I7O2NBQ0ssS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztjQUVqQyxNQUFNLEdBQUcsRUFBRTtRQUNqQixLQUFLLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7OztJQUVPLGVBQWUsQ0FDckIsU0FBb0IsRUFDcEIsTUFBYyxFQUNkLHFCQUFzQjs7Y0FFaEIsZUFBZSxHQUFHLG1CQUFBLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBTzs7Y0FDaEQsVUFBVSxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNwRSxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzVCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN4QixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDeEIsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDOztZQUV2QixRQUFRO1FBQ1osSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ2pDLFFBQVEsR0FBRztnQkFDVCxJQUFJLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsV0FBVyxFQUFFLGVBQWUsQ0FBQyxjQUFjLEVBQUU7YUFDOUMsQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVTtZQUNWLFFBQVE7WUFDUixJQUFJLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLElBQUksRUFBRTtnQkFDVixLQUFLLEVBQUUsSUFBSSxHQUFHLE1BQU07Z0JBQ3BCLEtBQUssRUFBRSxxQkFBcUI7YUFDN0I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLFdBQVcsQ0FDakIsVUFBK0IsRUFDL0IsT0FBcUI7O1lBRWpCLEdBQUc7UUFDUCxRQUFRLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDOUIsS0FBSyxhQUFhOztzQkFDVixhQUFhLEdBQUcsbUJBQUEsVUFBVSxFQUFpQjtnQkFDakQsR0FBRyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQ3pDLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCO29CQUNFLFdBQVcsRUFDVCxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVc7d0JBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFDeEQsWUFBWSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTTtvQkFDekMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLEdBQUc7aUJBQ3pELENBQ0YsQ0FBQztnQkFDRixJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDNUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2dCQUNELE1BQU07WUFDUixLQUFLLGVBQWU7O3NCQUNaLGVBQWUsR0FBRyxtQkFBQSxVQUFVLEVBQW1COztzQkFDL0MsT0FBTyxHQUNYLFVBQVU7b0JBQ1YsZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPO29CQUMvQix3QkFBd0I7O3NCQUNwQixNQUFNLEdBQUcsZ0JBQWdCOztzQkFDekIsR0FBRyxHQUNQLEtBQUssR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUc7O3NCQUN4RCxNQUFNLEdBQ1YsMEVBQTBFOztzQkFDdEUsTUFBTSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYztvQkFDbkQsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYztvQkFDeEMsQ0FBQyxDQUFDLE1BQU07O3NCQUNKLFdBQVcsR0FDZixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsR0FBRztvQkFDSCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsVUFBVTtvQkFDVixNQUFNO29CQUNOLElBQUk7Z0JBRU4sR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLFdBQVcsRUFBRSxDQUFDO2dCQUN6RCxNQUFNO1lBQ1IsS0FBSyx3QkFBd0I7O3NCQUNyQix3QkFBd0IsR0FBRyxtQkFBQSxVQUFVLEVBQTRCOztvQkFDbkUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNELElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtvQkFDbkQsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQ3RCLE1BQU0sRUFDTix3QkFBd0IsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUNoRCxDQUFDO2lCQUNIOztzQkFDSyxVQUFVLEdBQ2Qsd0JBQXdCLENBQUMsT0FBTyxDQUFDLEdBQUc7b0JBQ3BDLEdBQUc7b0JBQ0gsd0JBQXdCLENBQUMsT0FBTyxDQUFDLEtBQUs7b0JBQ3RDLFNBQVM7O3NCQUNMLFFBQVEsR0FBRyxrQkFBa0IsQ0FDakMsVUFBVTtvQkFDUixNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULFVBQVU7b0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxVQUFVO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVTtvQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULHNDQUFzQyxDQUN6Qzs7c0JBQ0ssTUFBTSxHQUFHO29CQUNiLFFBQVE7b0JBQ1IsWUFBWSxRQUFRLEVBQUU7b0JBQ3RCLG1DQUFtQztvQkFDbkMsYUFBYTtvQkFDYixxQ0FBcUM7b0JBQ3JDLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQixjQUFjO2lCQUNmO2dCQUNELEdBQUcsR0FBRyxHQUFHLFVBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQzFDLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUVPLGlCQUFpQixDQUFDLFdBQVc7O1lBQy9CLElBQUk7UUFDUixRQUFRLFdBQVcsRUFBRTtZQUNuQixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcseUJBQXlCLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcsK0JBQStCLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzFCLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxPQUFPO2dCQUN0QixJQUFJLEdBQUcscUJBQXFCLENBQUM7Z0JBQzdCLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUNwQixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSTtnQkFDbkIsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDbkIsTUFBTTtZQUNSO2dCQUNFLElBQUksR0FBRyx5QkFBeUIsQ0FBQztnQkFDakMsTUFBTTtTQUNUO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUEvWUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBMUJRLFVBQVU7Ozs7O0lBNEJqQixvQ0FBMkI7Ozs7O0lBRWYsNEJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgb2xGb3JtYXRHTUwyIGZyb20gJ29sL2Zvcm1hdC9HTUwyJztcclxuaW1wb3J0IG9sRm9ybWF0R01MMyBmcm9tICdvbC9mb3JtYXQvR01MMyc7XHJcbmltcG9ydCBvbEZvcm1hdEVzcmlKU09OIGZyb20gJ29sL2Zvcm1hdC9Fc3JpSlNPTic7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQge1xyXG4gIFdNU0RhdGFTb3VyY2UsXHJcbiAgQ2FydG9EYXRhU291cmNlLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZVxyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgUXVlcnlGb3JtYXQsIFF1ZXJ5SHRtbFRhcmdldCB9IGZyb20gJy4vcXVlcnkuZW51bXMnO1xyXG5pbXBvcnQgeyBRdWVyeU9wdGlvbnMsIFF1ZXJ5YWJsZURhdGFTb3VyY2UgfSBmcm9tICcuL3F1ZXJ5LmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUXVlcnlTZXJ2aWNlIHtcclxuICBwdWJsaWMgcXVlcnlFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBxdWVyeShsYXllcnM6IExheWVyW10sIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPltdIHtcclxuICAgIHJldHVybiBsYXllcnNcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBsYXllci52aXNpYmxlICYmIGxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlKVxyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHRoaXMucXVlcnlMYXllcihsYXllciwgb3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgcXVlcnlMYXllcihsYXllcjogTGF5ZXIsIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFF1ZXJ5VXJsKGxheWVyLmRhdGFTb3VyY2UsIG9wdGlvbnMpO1xyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5odHRwLmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdC5waXBlKG1hcChyZXMgPT4gdGhpcy5leHRyYWN0RGF0YShyZXMsIGxheWVyLCBvcHRpb25zLCB1cmwpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3REYXRhKFxyXG4gICAgcmVzLFxyXG4gICAgbGF5ZXI6IExheWVyLFxyXG4gICAgb3B0aW9uczogUXVlcnlPcHRpb25zLFxyXG4gICAgdXJsOiBzdHJpbmdcclxuICApOiBGZWF0dXJlW10ge1xyXG4gICAgY29uc3QgcXVlcnlEYXRhU291cmNlID0gbGF5ZXIuZGF0YVNvdXJjZSBhcyBRdWVyeWFibGVEYXRhU291cmNlO1xyXG5cclxuICAgIGxldCBhbGxvd2VkRmllbGRzQW5kQWxpYXM7XHJcbiAgICBpZiAoXHJcbiAgICAgIGxheWVyLm9wdGlvbnMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPj0gMVxyXG4gICAgKSB7XHJcbiAgICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhcyA9IHt9O1xyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFsaWFzID0gc291cmNlRmllbGQuYWxpYXMgPyBzb3VyY2VGaWVsZC5hbGlhcyA6IHNvdXJjZUZpZWxkLm5hbWU7XHJcbiAgICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzW3NvdXJjZUZpZWxkLm5hbWVdID0gYWxpYXM7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGZlYXR1cmVzID0gW107XHJcbiAgICBzd2l0Y2ggKHF1ZXJ5RGF0YVNvdXJjZS5vcHRpb25zLnF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMzpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdNTDNEYXRhKFxyXG4gICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgbGF5ZXIuekluZGV4LFxyXG4gICAgICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5KU09OOlxyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdFT0pTT046XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RHZW9KU09ORGF0YShyZXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkVTUklKU09OOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0RXNyaUpTT05EYXRhKHJlcywgbGF5ZXIuekluZGV4KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5URVhUOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0VGV4dERhdGEocmVzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0SHRtbERhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2UucXVlcnlIdG1sVGFyZ2V0LFxyXG4gICAgICAgICAgdXJsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwyOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R01MMkRhdGEocmVzLCBsYXllciwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGxldCB0aXRsZSA9IGZlYXR1cmUucHJvcGVydGllc1txdWVyeURhdGFTb3VyY2UucXVlcnlUaXRsZV07XHJcbiAgICAgIGlmICghdGl0bGUgJiYgZmVhdHVyZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRpdGxlID0gYCR7bGF5ZXIudGl0bGV9ICgke2luZGV4ICsgMX0pYDtcclxuICAgICAgfSBlbHNlIGlmICghdGl0bGUpIHtcclxuICAgICAgICB0aXRsZSA9IGxheWVyLnRpdGxlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCBmZWF0dXJlLm1ldGEgfHwge30sIHtcclxuICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIG1hcFRpdGxlOiB0aXRsZSxcclxuICAgICAgICBzb3VyY2VUaXRsZTogbGF5ZXIudGl0bGUsXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSBsYXllci56SW5kZXhcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmZWF0dXJlLCB7XHJcbiAgICAgICAgbWV0YSxcclxuICAgICAgICBwcm9qZWN0aW9uOlxyXG4gICAgICAgICAgcXVlcnlEYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ2NhcnRvJ1xyXG4gICAgICAgICAgICA/ICdFUFNHOjQzMjYnXHJcbiAgICAgICAgICAgIDogb3B0aW9ucy5wcm9qZWN0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHTUwyRGF0YShyZXMsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzPykge1xyXG4gICAgbGV0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEdNTDIoKTtcclxuICAgIGxldCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIC8vIEhhbmRsZSBub24gc3RhbmRhcmQgR01MIG91dHB1dCAoTWFwU2VydmVyKVxyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBwYXJzZXIgPSBuZXcgb2xmb3JtYXQuV01TR2V0RmVhdHVyZUluZm8oKTtcclxuICAgICAgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcChmZWF0dXJlID0+XHJcbiAgICAgIHRoaXMuZmVhdHVyZVRvUmVzdWx0KGZlYXR1cmUsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEdNTDNEYXRhKHJlcywgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXM/KSB7XHJcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwzKCk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHZW9KU09ORGF0YShyZXMpIHtcclxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgZmVhdHVyZXMgPSBKU09OLnBhcnNlKHJlcykuZmVhdHVyZXM7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncXVlcnkuc2VydmljZTogVW5hYmxlIHRvIHBhcnNlIGdlb2pzb24nLCAnXFxuJywgcmVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEVzcmlKU09ORGF0YShyZXMsIHpJbmRleCkge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0RXNyaUpTT04oKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFRleHREYXRhKHJlcykge1xyXG4gICAgLy8gVE9ET1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0SHRtbERhdGEocmVzLCBodG1sVGFyZ2V0OiBRdWVyeUh0bWxUYXJnZXQsIHVybCkge1xyXG4gICAgLy8gX2JsYW5rICwgaWZyYW1lIG9yIHVuZGVmaW5lZFxyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zOiBhbnkgPSB0aGlzLmdldFF1ZXJ5UGFyYW1zKHVybC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGJib3hSYXcgPSBzZWFyY2hQYXJhbXMuYmJveDtcclxuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLndpZHRoLCAxMCk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaGVpZ2h0LCAxMCk7XHJcbiAgICBjb25zdCB4UG9zaXRpb24gPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaSB8fCBzZWFyY2hQYXJhbXMueCwgMTApO1xyXG4gICAgY29uc3QgeVBvc2l0aW9uID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmogfHwgc2VhcmNoUGFyYW1zLnksIDEwKTtcclxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBzZWFyY2hQYXJhbXMuY3JzIHx8IHNlYXJjaFBhcmFtcy5zcnMgfHwgJ0VQU0c6Mzg1Nyc7XHJcblxyXG4gICAgY29uc3QgYmJveCA9IGJib3hSYXcuc3BsaXQoJywnKTtcclxuICAgIGxldCB0aHJlc2hvbGQgPVxyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgLSBNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMl0pKSkgKiAwLjA1O1xyXG5cclxuICAgIC8vIGZvciBjb250ZXh0IGluIGRlZ3JlZSAoRVBTRzo0MzI2LDQyNjkuLi4pXHJcbiAgICBpZiAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgPCAxODApIHtcclxuICAgICAgdGhyZXNob2xkID0gMC4wNDU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xpY2t4ID1cclxuICAgICAgcGFyc2VGbG9hdChiYm94WzBdKSArXHJcbiAgICAgIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMF0pIC0gcGFyc2VGbG9hdChiYm94WzJdKSkgKiB4UG9zaXRpb24pIC9cclxuICAgICAgICB3aWR0aCAtXHJcbiAgICAgIHRocmVzaG9sZDtcclxuICAgIGNvbnN0IGNsaWNreSA9XHJcbiAgICAgIHBhcnNlRmxvYXQoYmJveFsxXSkgK1xyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzFdKSAtIHBhcnNlRmxvYXQoYmJveFszXSkpICogeVBvc2l0aW9uKSAvXHJcbiAgICAgICAgaGVpZ2h0IC1cclxuICAgICAgdGhyZXNob2xkO1xyXG4gICAgY29uc3QgY2xpY2t4MSA9IGNsaWNreCArIHRocmVzaG9sZCAqIDI7XHJcbiAgICBjb25zdCBjbGlja3kxID0gY2xpY2t5ICsgdGhyZXNob2xkICogMjtcclxuXHJcbiAgICBjb25zdCB3a3RQb2x5ID1cclxuICAgICAgJ1BPTFlHT04oKCcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5MSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3gxICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5MSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3gxICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcpKSc7XHJcblxyXG4gICAgY29uc3QgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LldLVCgpO1xyXG4gICAgY29uc3QgdGVuUGVyY2VudFdpZHRoR2VvbSA9IGZvcm1hdC5yZWFkRmVhdHVyZSh3a3RQb2x5KTtcclxuICAgIGNvbnN0IGYgPSB0ZW5QZXJjZW50V2lkdGhHZW9tLmdldEdlb21ldHJ5KCkgYXMgYW55O1xyXG5cclxuICAgIGlmIChcclxuICAgICAgaHRtbFRhcmdldCAhPT0gUXVlcnlIdG1sVGFyZ2V0LkJMQU5LICYmXHJcbiAgICAgIGh0bWxUYXJnZXQgIT09IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUVcclxuICAgICkge1xyXG4gICAgICBodG1sVGFyZ2V0ID0gUXVlcnlIdG1sVGFyZ2V0LklGUkFNRTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib2R5VGFnU3RhcnQgPSByZXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKCc8Ym9keT4nKTtcclxuICAgIGNvbnN0IGJvZHlUYWdFbmQgPSByZXMudG9Mb3dlckNhc2UoKS5sYXN0SW5kZXhPZignPC9ib2R5PicpICsgNztcclxuICAgIC8vIHJlcGxhY2UgXFxyIFxcbiAgYW5kICcgJyB3aXRoICcnIHRvIHZhbGlkYXRlIGlmIHRoZSBib2R5IGlzIHJlYWxseSBlbXB0eS5cclxuICAgIGNvbnN0IGJvZHkgPSByZXMuc2xpY2UoYm9keVRhZ1N0YXJ0LCBib2R5VGFnRW5kKS5yZXBsYWNlKC8oXFxyfFxcbnxcXHMpL2csICcnKTtcclxuICAgIGlmIChib2R5ID09PSAnPGJvZHk+PC9ib2R5PicgfHwgcmVzID09PSAnJykge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbixcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7IHRhcmdldDogaHRtbFRhcmdldCwgYm9keTogcmVzLCB1cmwgfSxcclxuICAgICAgICBnZW9tZXRyeTogeyB0eXBlOiBmLmdldFR5cGUoKSwgY29vcmRpbmF0ZXM6IGYuZ2V0Q29vcmRpbmF0ZXMoKSB9XHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXJ5UGFyYW1zKHVybCkge1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSB1cmwuc3BsaXQoJz8nKTtcclxuICAgIGlmICghcXVlcnlTdHJpbmdbMV0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFpcnMgPSBxdWVyeVN0cmluZ1sxXS5zcGxpdCgnJicpO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gICAgcGFpcnMuZm9yRWFjaChwYWlyID0+IHtcclxuICAgICAgcGFpciA9IHBhaXIuc3BsaXQoJz0nKTtcclxuICAgICAgcmVzdWx0W3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0gfHwgJycpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmZWF0dXJlVG9SZXN1bHQoXHJcbiAgICBmZWF0dXJlT0w6IG9sRmVhdHVyZSxcclxuICAgIHpJbmRleDogbnVtYmVyLFxyXG4gICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzP1xyXG4gICk6IEZlYXR1cmUge1xyXG4gICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5ID0gZmVhdHVyZU9MLmdldEdlb21ldHJ5KCkgYXMgYW55O1xyXG4gICAgY29uc3QgcHJvcGVydGllczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZU9MLmdldFByb3BlcnRpZXMoKSk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5nZW9tZXRyeTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmJvdW5kZWRCeTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLnNoYXBlO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuU0hBUEU7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy50aGVfZ2VvbTtcclxuXHJcbiAgICBsZXQgZ2VvbWV0cnk7XHJcbiAgICBpZiAoZmVhdHVyZUdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZ2VvbWV0cnkgPSB7XHJcbiAgICAgICAgdHlwZTogZmVhdHVyZUdlb21ldHJ5LmdldFR5cGUoKSxcclxuICAgICAgICBjb29yZGluYXRlczogZmVhdHVyZUdlb21ldHJ5LmdldENvb3JkaW5hdGVzKClcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICBwcm9qZWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgIGdlb21ldHJ5LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICBvcmRlcjogMTAwMCAtIHpJbmRleCxcclxuICAgICAgICBhbGlhczogYWxsb3dlZEZpZWxkc0FuZEFsaWFzXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXJ5VXJsKFxyXG4gICAgZGF0YXNvdXJjZTogUXVlcnlhYmxlRGF0YVNvdXJjZSxcclxuICAgIG9wdGlvbnM6IFF1ZXJ5T3B0aW9uc1xyXG4gICk6IHN0cmluZyB7XHJcbiAgICBsZXQgdXJsO1xyXG4gICAgc3dpdGNoIChkYXRhc291cmNlLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgIGNhc2UgV01TRGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCB3bXNEYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlO1xyXG4gICAgICAgIHVybCA9IHdtc0RhdGFzb3VyY2Uub2wuZ2V0R2V0RmVhdHVyZUluZm9VcmwoXHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzLFxyXG4gICAgICAgICAgb3B0aW9ucy5yZXNvbHV0aW9uLFxyXG4gICAgICAgICAgb3B0aW9ucy5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBJTkZPX0ZPUk1BVDpcclxuICAgICAgICAgICAgICB3bXNEYXRhc291cmNlLnBhcmFtcy5pbmZvX2Zvcm1hdCB8fFxyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0TWltZUluZm9Gb3JtYXQoZGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5Rm9ybWF0KSxcclxuICAgICAgICAgICAgUVVFUllfTEFZRVJTOiB3bXNEYXRhc291cmNlLnBhcmFtcy5sYXllcnMsXHJcbiAgICAgICAgICAgIEZFQVRVUkVfQ09VTlQ6IHdtc0RhdGFzb3VyY2UucGFyYW1zLmZlYXR1cmVfY291bnQgfHwgJzUnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAod21zRGF0YXNvdXJjZS5wYXJhbXMudmVyc2lvbiAhPT0gJzEuMy4wJykge1xyXG4gICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJyZJPScsICcmWD0nKTtcclxuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKCcmSj0nLCAnJlk9Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIENhcnRvRGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCBjYXJ0b0RhdGFzb3VyY2UgPSBkYXRhc291cmNlIGFzIENhcnRvRGF0YVNvdXJjZTtcclxuICAgICAgICBjb25zdCBiYXNlVXJsID1cclxuICAgICAgICAgICdodHRwczovLycgK1xyXG4gICAgICAgICAgY2FydG9EYXRhc291cmNlLm9wdGlvbnMuYWNjb3VudCArXHJcbiAgICAgICAgICAnLmNhcnRvLmNvbS9hcGkvdjIvc3FsPyc7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gJ2Zvcm1hdD1HZW9KU09OJztcclxuICAgICAgICBjb25zdCBzcWwgPVxyXG4gICAgICAgICAgJyZxPScgKyBjYXJ0b0RhdGFzb3VyY2Uub3B0aW9ucy5jb25maWcubGF5ZXJzWzBdLm9wdGlvbnMuc3FsO1xyXG4gICAgICAgIGNvbnN0IGNsYXVzZSA9XHJcbiAgICAgICAgICAnIFdIRVJFIFNUX0ludGVyc2VjdHModGhlX2dlb21fd2VibWVyY2F0b3IsU1RfQlVGRkVSKFNUX1NldFNSSUQoU1RfUE9JTlQoJztcclxuICAgICAgICBjb25zdCBtZXRyZXMgPSBjYXJ0b0RhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvblxyXG4gICAgICAgICAgPyBjYXJ0b0RhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvblxyXG4gICAgICAgICAgOiAnMTAwMCc7XHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPVxyXG4gICAgICAgICAgb3B0aW9ucy5jb29yZGluYXRlc1swXSArXHJcbiAgICAgICAgICAnLCcgK1xyXG4gICAgICAgICAgb3B0aW9ucy5jb29yZGluYXRlc1sxXSArXHJcbiAgICAgICAgICAnKSwzODU3KSwnICtcclxuICAgICAgICAgIG1ldHJlcyArXHJcbiAgICAgICAgICAnKSknO1xyXG5cclxuICAgICAgICB1cmwgPSBgJHtiYXNlVXJsfSR7Zm9ybWF0fSR7c3FsfSR7Y2xhdXNlfSR7Y29vcmRpbmF0ZXN9YDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2U6XHJcbiAgICAgICAgY29uc3QgdGlsZUFyY0dJU1Jlc3REYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2U7XHJcbiAgICAgICAgbGV0IGV4dGVudCA9IG9sZXh0ZW50LmJvdW5kaW5nRXh0ZW50KFtvcHRpb25zLmNvb3JkaW5hdGVzXSk7XHJcbiAgICAgICAgaWYgKHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uKSB7XHJcbiAgICAgICAgICBleHRlbnQgPSBvbGV4dGVudC5idWZmZXIoXHJcbiAgICAgICAgICAgIGV4dGVudCxcclxuICAgICAgICAgICAgdGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPVxyXG4gICAgICAgICAgdGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMudXJsICtcclxuICAgICAgICAgICcvJyArXHJcbiAgICAgICAgICB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5sYXllciArXHJcbiAgICAgICAgICAnL3F1ZXJ5Lyc7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICAne1wieG1pblwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMF0gK1xyXG4gICAgICAgICAgICAnLFwieW1pblwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMV0gK1xyXG4gICAgICAgICAgICAnLFwieG1heFwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMl0gK1xyXG4gICAgICAgICAgICAnLFwieW1heFwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbM10gK1xyXG4gICAgICAgICAgICAnLFwic3BhdGlhbFJlZmVyZW5jZVwiOntcIndraWRcIjoxMDIxMDB9fSdcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtcclxuICAgICAgICAgICdmPWpzb24nLFxyXG4gICAgICAgICAgYGdlb21ldHJ5PSR7Z2VvbWV0cnl9YCxcclxuICAgICAgICAgICdnZW9tZXRyeVR5cGU9ZXNyaUdlb21ldHJ5RW52ZWxvcGUnLFxyXG4gICAgICAgICAgJ2luU1I9MTAyMTAwJyxcclxuICAgICAgICAgICdzcGF0aWFsUmVsPWVzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cycsXHJcbiAgICAgICAgICAnb3V0RmllbGRzPSonLFxyXG4gICAgICAgICAgJ3JldHVybkdlb21ldHJ5PXRydWUnLFxyXG4gICAgICAgICAgJ291dFNSPTEwMjEwMCdcclxuICAgICAgICBdO1xyXG4gICAgICAgIHVybCA9IGAke3NlcnZpY2VVcmx9PyR7cGFyYW1zLmpvaW4oJyYnKX1gO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE1pbWVJbmZvRm9ybWF0KHF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICBsZXQgbWltZTtcclxuICAgIHN3aXRjaCAocXVlcnlGb3JtYXQpIHtcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwyOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vdm5kLm9nYy5nbWwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdNTDM6XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi92bmQub2djLmdtbC8zLjEuMSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuSlNPTjpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdFT0pTT046XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi9nZW9qc29uJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5URVhUOlxyXG4gICAgICAgIG1pbWUgPSAndGV4dC9wbGFpbic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuSFRNTDpcclxuICAgICAgICBtaW1lID0gJ3RleHQvaHRtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi92bmQub2djLmdtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1pbWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==