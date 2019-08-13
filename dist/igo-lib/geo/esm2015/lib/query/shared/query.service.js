/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as olformat from 'ol/format';
import * as olextent from 'ol/extent';
import olFormatGML2 from 'ol/format/GML2';
import olFormatGML3 from 'ol/format/GML3';
import olFormatEsriJSON from 'ol/format/EsriJSON';
import * as olgeom from 'ol/geom';
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
        if (((/** @type {?} */ (layer.dataSource))).options.queryFormat === QueryFormat.HTMLGML2) {
            /** @type {?} */
            const urlGml = this.getQueryUrl(layer.dataSource, options, true);
            return this.http.get(urlGml, { responseType: 'text' })
                .pipe(mergeMap((/**
             * @param {?} gmlRes
             * @return {?}
             */
            gmlRes => {
                /** @type {?} */
                const imposedGeom = this.mergeGML(gmlRes, url);
                return this.http.get(url, { responseType: 'text' })
                    .pipe(map(((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => this.extractData(res, layer, options, url, imposedGeom)))));
            })));
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
     * @param {?} gmlRes
     * @param {?} url
     * @return {?}
     */
    mergeGML(gmlRes, url) {
        /** @type {?} */
        let parser = new olFormatGML2();
        /** @type {?} */
        let features = parser.readFeatures(gmlRes);
        // Handle non standard GML output (MapServer)
        if (features.length === 0) {
            parser = new olformat.WMSGetFeatureInfo();
            features = parser.readFeatures(gmlRes);
        }
        /** @type {?} */
        const olmline = new olgeom.MultiLineString([]);
        /** @type {?} */
        let pts;
        /** @type {?} */
        const ptsArray = [];
        /** @type {?} */
        let olmpoly = new olgeom.MultiPolygon([]);
        /** @type {?} */
        let firstFeatureType;
        /** @type {?} */
        const nbFeatures = features.length;
        // Check if geometry intersect bbox
        // for geoserver getfeatureinfo response in data projection, not call projection
        /** @type {?} */
        const searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        const bboxRaw = searchParams.bbox;
        /** @type {?} */
        const bbox = bboxRaw.split(',');
        /** @type {?} */
        const bboxExtent = olextent.createEmpty();
        olextent.extend(bboxExtent, bbox);
        /** @type {?} */
        const outBboxExtent = false;
        features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => {
            /*  if (!feature.getGeometry().simplify(100).intersectsExtent(bboxExtent)) {
                    outBboxExtent = true;
                    // TODO: Check to project the geometry?
                  }*/
            /** @type {?} */
            const featureGeometryCoordinates = feature.getGeometry().getCoordinates();
            /** @type {?} */
            const featureGeometryType = feature.getGeometry().getType();
            if (!firstFeatureType && !outBboxExtent) {
                firstFeatureType = featureGeometryType;
            }
            if (!outBboxExtent) {
                switch (featureGeometryType) {
                    case 'Point':
                        if (nbFeatures === 1) {
                            pts = new olgeom.Point(featureGeometryCoordinates, 'XY');
                        }
                        else {
                            ptsArray.push(featureGeometryCoordinates);
                        }
                        break;
                    case 'LineString':
                        olmline.appendLineString(new olgeom.LineString(featureGeometryCoordinates, 'XY'));
                        break;
                    case 'Polygon':
                        olmpoly.appendPolygon(new olgeom.Polygon(featureGeometryCoordinates, 'XY'));
                        break;
                    case 'MultiPolygon':
                        olmpoly = new olgeom.MultiPolygon(featureGeometryCoordinates, 'XY');
                        break;
                    default:
                        return;
                }
            }
        }));
        /** @type {?} */
        let olmpts;
        if (ptsArray.length === 0 && pts) {
            olmpts = {
                type: pts.getType(),
                coordinates: pts.getCoordinates()
            };
        }
        else {
            olmpts = {
                type: 'Polygon',
                coordinates: [this.convexHull(ptsArray)]
            };
        }
        switch (firstFeatureType) {
            case 'LineString':
                return {
                    type: olmline.getType(),
                    coordinates: olmline.getCoordinates()
                };
            case 'Point':
                return olmpts;
            case 'Polygon':
                return {
                    type: olmpoly.getType(),
                    coordinates: olmpoly.getCoordinates()
                };
            case 'MultiPolygon':
                return {
                    type: olmpoly.getType(),
                    coordinates: olmpoly.getCoordinates()
                };
            default:
                return;
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} o
     * @return {?}
     */
    cross(a, b, o) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }
    /**
     * @param {?} points An array of [X, Y] coordinates
     * This method is use instead of turf.js convexHull because Turf needs at least 3 point to make a hull.
     * https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
     * @return {?}
     */
    convexHull(points) {
        points.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
        }));
        /** @type {?} */
        const lower = [];
        for (const point of points) {
            while (lower.length >= 2 && this.cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
                lower.pop();
            }
            lower.push(point);
        }
        /** @type {?} */
        const upper = [];
        for (let i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 && this.cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }
        upper.pop();
        lower.pop();
        return lower.concat(upper);
    }
    /**
     * @private
     * @param {?} res
     * @param {?} layer
     * @param {?} options
     * @param {?} url
     * @param {?=} imposedGeometry
     * @return {?}
     */
    extractData(res, layer, options, url, imposedGeometry) {
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
            case QueryFormat.HTMLGML2:
                features = this.extractHtmlData(res, queryDataSource.queryHtmlTarget, url, imposedGeometry);
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
     * @param {?=} imposedGeometry
     * @return {?}
     */
    extractHtmlData(res, htmlTarget, url, imposedGeometry) {
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
                geometry: imposedGeometry || { type: f.getType(), coordinates: f.getCoordinates() }
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
     * @param {?=} forceGML2
     * @return {?}
     */
    getQueryUrl(datasource, options, forceGML2 = false) {
        /** @type {?} */
        let url;
        switch (datasource.constructor) {
            case WMSDataSource:
                /** @type {?} */
                const wmsDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                const WMSGetFeatureInfoOptions = {
                    INFO_FORMAT: wmsDatasource.params.info_format ||
                        this.getMimeInfoFormat(datasource.options.queryFormat),
                    QUERY_LAYERS: wmsDatasource.params.layers,
                    FEATURE_COUNT: wmsDatasource.params.feature_count || '5'
                };
                if (forceGML2) {
                    WMSGetFeatureInfoOptions.INFO_FORMAT =
                        this.getMimeInfoFormat(QueryFormat.GML2);
                }
                url = wmsDatasource.ol.getGetFeatureInfoUrl(options.coordinates, options.resolution, options.projection, WMSGetFeatureInfoOptions);
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
                const meters = cartoDatasource.options.queryPrecision
                    ? cartoDatasource.options.queryPrecision
                    : '1000';
                /** @type {?} */
                const coordinates = options.coordinates[0] +
                    ',' +
                    options.coordinates[1] +
                    '),3857),' +
                    meters +
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
            case QueryFormat.HTMLGML2:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFN0QsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3pCLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU03RCxNQUFNLE9BQU8sWUFBWTs7OztJQUd2QixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRjdCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO0lBRVksQ0FBQzs7Ozs7O0lBRXhDLEtBQUssQ0FBQyxNQUFlLEVBQUUsT0FBcUI7UUFDMUMsT0FBTyxNQUFNO2FBQ1YsTUFB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QUNuQixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDbkIsTUFBTTtZQUNSO2dCQUNFLElBQUksR0FBRyx5QkFBeUIsQ0FBQztnQkFDakMsTUFBTTtTQUNUO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUFsakJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQTNCUSxVQUFVOzs7OztJQTZCakIsb0NBQTJCOzs7OztJQUVmLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCBvbEZvcm1hdEdNTDIgZnJvbSAnb2wvZm9ybWF0L0dNTDInO1xyXG5pbXBvcnQgb2xGb3JtYXRHTUwzIGZyb20gJ29sL2Zvcm1hdC9HTUwzJztcclxuaW1wb3J0IG9sRm9ybWF0RXNyaUpTT04gZnJvbSAnb2wvZm9ybWF0L0VzcmlKU09OJztcclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0ICogYXMgb2xnZW9tIGZyb20gJ29sL2dlb20nO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZFQVRVUkUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHtcclxuICBXTVNEYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VcclxufSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IFF1ZXJ5Rm9ybWF0LCBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuL3F1ZXJ5LmVudW1zJztcclxuaW1wb3J0IHsgUXVlcnlPcHRpb25zLCBRdWVyeWFibGVEYXRhU291cmNlIH0gZnJvbSAnLi9xdWVyeS5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5U2VydmljZSB7XHJcbiAgcHVibGljIHF1ZXJ5RW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgcXVlcnkobGF5ZXJzOiBMYXllcltdLCBvcHRpb25zOiBRdWVyeU9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT5bXSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzXHJcbiAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIudmlzaWJsZSAmJiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSlcclxuICAgICAgLm1hcCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLnF1ZXJ5TGF5ZXIobGF5ZXIsIG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIHF1ZXJ5TGF5ZXIobGF5ZXI6IExheWVyLCBvcHRpb25zOiBRdWVyeU9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRRdWVyeVVybChsYXllci5kYXRhU291cmNlLCBvcHRpb25zKTtcclxuICAgIGlmICghdXJsKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChsYXllci5kYXRhU291cmNlIGFzIFF1ZXJ5YWJsZURhdGFTb3VyY2UpLm9wdGlvbnMucXVlcnlGb3JtYXQgPT09IFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyKSB7XHJcbiAgICAgIGNvbnN0IHVybEdtbCA9IHRoaXMuZ2V0UXVlcnlVcmwobGF5ZXIuZGF0YVNvdXJjZSwgb3B0aW9ucywgdHJ1ZSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybEdtbCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxyXG4gICAgICAucGlwZShtZXJnZU1hcChnbWxSZXMgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltcG9zZWRHZW9tID0gdGhpcy5tZXJnZUdNTChnbWxSZXMsIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgICAgICAucGlwZShtYXAoKHJlcyA9PiB0aGlzLmV4dHJhY3REYXRhKHJlcywgbGF5ZXIsIG9wdGlvbnMsIHVybCwgaW1wb3NlZEdlb20pKSkpO1xyXG4gICAgICB9XHJcbiAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmh0dHAuZ2V0KHVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KTtcclxuICAgIHJldHVybiByZXF1ZXN0LnBpcGUobWFwKHJlcyA9PiB0aGlzLmV4dHJhY3REYXRhKHJlcywgbGF5ZXIsIG9wdGlvbnMsIHVybCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWVyZ2VHTUwoZ21sUmVzLCB1cmwpIHtcclxuICAgIGxldCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwyKCk7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKGdtbFJlcyk7XHJcbiAgICAvLyBIYW5kbGUgbm9uIHN0YW5kYXJkIEdNTCBvdXRwdXQgKE1hcFNlcnZlcilcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcGFyc2VyID0gbmV3IG9sZm9ybWF0LldNU0dldEZlYXR1cmVJbmZvKCk7XHJcbiAgICAgIGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhnbWxSZXMpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb2xtbGluZSA9IG5ldyBvbGdlb20uTXVsdGlMaW5lU3RyaW5nKFtdKTtcclxuICAgIGxldCBwdHM7XHJcbiAgICBjb25zdCBwdHNBcnJheSA9IFtdO1xyXG4gICAgbGV0IG9sbXBvbHkgPSBuZXcgb2xnZW9tLk11bHRpUG9seWdvbihbXSk7XHJcbiAgICBsZXQgZmlyc3RGZWF0dXJlVHlwZTtcclxuICAgIGNvbnN0IG5iRmVhdHVyZXMgPSBmZWF0dXJlcy5sZW5ndGg7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgZ2VvbWV0cnkgaW50ZXJzZWN0IGJib3hcclxuICAgIC8vIGZvciBnZW9zZXJ2ZXIgZ2V0ZmVhdHVyZWluZm8gcmVzcG9uc2UgaW4gZGF0YSBwcm9qZWN0aW9uLCBub3QgY2FsbCBwcm9qZWN0aW9uXHJcbiAgICBjb25zdCBzZWFyY2hQYXJhbXM6IGFueSA9IHRoaXMuZ2V0UXVlcnlQYXJhbXModXJsLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgYmJveFJhdyA9IHNlYXJjaFBhcmFtcy5iYm94O1xyXG4gICAgY29uc3QgYmJveCA9IGJib3hSYXcuc3BsaXQoJywnKTtcclxuICAgIGNvbnN0IGJib3hFeHRlbnQgPSBvbGV4dGVudC5jcmVhdGVFbXB0eSgpO1xyXG4gICAgb2xleHRlbnQuZXh0ZW5kKGJib3hFeHRlbnQsIGJib3gpO1xyXG4gICAgY29uc3Qgb3V0QmJveEV4dGVudCA9IGZhbHNlO1xyXG4gICAgZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4ge1xyXG5cclxuICAgIC8qICBpZiAoIWZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5zaW1wbGlmeSgxMDApLmludGVyc2VjdHNFeHRlbnQoYmJveEV4dGVudCkpIHtcclxuICAgICAgICBvdXRCYm94RXh0ZW50ID0gdHJ1ZTtcclxuICAgICAgICAvLyBUT0RPOiBDaGVjayB0byBwcm9qZWN0IHRoZSBnZW9tZXRyeT9cclxuICAgICAgfSovXHJcbiAgICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeVR5cGUgPSBmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0VHlwZSgpO1xyXG5cclxuICAgICAgaWYgKCFmaXJzdEZlYXR1cmVUeXBlICYmICFvdXRCYm94RXh0ZW50KSB7XHJcbiAgICAgICAgZmlyc3RGZWF0dXJlVHlwZSA9IGZlYXR1cmVHZW9tZXRyeVR5cGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFvdXRCYm94RXh0ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChmZWF0dXJlR2VvbWV0cnlUeXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdQb2ludCc6XHJcbiAgICAgICAgICAgIGlmIChuYkZlYXR1cmVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgcHRzID0gbmV3IG9sZ2VvbS5Qb2ludChmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcywgJ1hZJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcHRzQXJyYXkucHVzaChmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdMaW5lU3RyaW5nJzpcclxuICAgICAgICAgICAgb2xtbGluZS5hcHBlbmRMaW5lU3RyaW5nKFxyXG4gICAgICAgICAgICAgIG5ldyBvbGdlb20uTGluZVN0cmluZyhmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcywgJ1hZJykpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgICAgICBvbG1wb2x5LmFwcGVuZFBvbHlnb24oXHJcbiAgICAgICAgICAgICAgbmV3IG9sZ2VvbS5Qb2x5Z29uKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcclxuICAgICAgICAgICAgb2xtcG9seSA9IG5ldyBvbGdlb20uTXVsdGlQb2x5Z29uKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgb2xtcHRzO1xyXG4gICAgaWYgKHB0c0FycmF5Lmxlbmd0aCA9PT0gMCAmJiBwdHMpIHtcclxuICAgICAgb2xtcHRzID0ge1xyXG4gICAgICAgIHR5cGU6IHB0cy5nZXRUeXBlKCksXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IHB0cy5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbG1wdHMgPSB7XHJcbiAgICAgICAgdHlwZTogJ1BvbHlnb24nLFxyXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbdGhpcy5jb252ZXhIdWxsKHB0c0FycmF5KV1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGZpcnN0RmVhdHVyZVR5cGUpIHtcclxuICAgICAgY2FzZSAnTGluZVN0cmluZyc6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6IG9sbWxpbmUuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IG9sbWxpbmUuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgIGNhc2UgJ1BvaW50JzpcclxuICAgICAgICByZXR1cm4gb2xtcHRzO1xyXG4gICAgICBjYXNlICdQb2x5Z29uJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogb2xtcG9seS5nZXRUeXBlKCksXHJcbiAgICAgICAgICBjb29yZGluYXRlczogb2xtcG9seS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiBvbG1wb2x5LmdldFR5cGUoKSxcclxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IG9sbXBvbHkuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3Jvc3MoYSwgYiwgbykge1xyXG4gICAgcmV0dXJuIChhWzBdIC0gb1swXSkgKiAoYlsxXSAtIG9bMV0pIC0gKGFbMV0gLSBvWzFdKSAqIChiWzBdIC0gb1swXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gcG9pbnRzIEFuIGFycmF5IG9mIFtYLCBZXSBjb29yZGluYXRlc1xyXG4gICAqIFRoaXMgbWV0aG9kIGlzIHVzZSBpbnN0ZWFkIG9mIHR1cmYuanMgY29udmV4SHVsbCBiZWNhdXNlIFR1cmYgbmVlZHMgYXQgbGVhc3QgMyBwb2ludCB0byBtYWtlIGEgaHVsbC5cclxuICAgKiBodHRwczovL2VuLndpa2lib29rcy5vcmcvd2lraS9BbGdvcml0aG1fSW1wbGVtZW50YXRpb24vR2VvbWV0cnkvQ29udmV4X2h1bGwvTW9ub3RvbmVfY2hhaW4jSmF2YVNjcmlwdFxyXG4gICAqL1xyXG4gIGNvbnZleEh1bGwocG9pbnRzKSB7XHJcbiAgICBwb2ludHMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICByZXR1cm4gYVswXSA9PT0gYlswXSA/IGFbMV0gLSBiWzFdIDogYVswXSAtIGJbMF07XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBsb3dlciA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBwb2ludHMpIHtcclxuICAgICAgd2hpbGUgKGxvd2VyLmxlbmd0aCA+PSAyICYmIHRoaXMuY3Jvc3MobG93ZXJbbG93ZXIubGVuZ3RoIC0gMl0sIGxvd2VyW2xvd2VyLmxlbmd0aCAtIDFdLCBwb2ludCkgPD0gMCkge1xyXG4gICAgICAgIGxvd2VyLnBvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGxvd2VyLnB1c2gocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwcGVyID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gcG9pbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIHdoaWxlICh1cHBlci5sZW5ndGggPj0gMiAmJiB0aGlzLmNyb3NzKHVwcGVyW3VwcGVyLmxlbmd0aCAtIDJdLCB1cHBlclt1cHBlci5sZW5ndGggLSAxXSwgcG9pbnRzW2ldKSA8PSAwKSB7XHJcbiAgICAgICAgdXBwZXIucG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgdXBwZXIucHVzaChwb2ludHNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwcGVyLnBvcCgpO1xyXG4gICAgbG93ZXIucG9wKCk7XHJcbiAgICByZXR1cm4gbG93ZXIuY29uY2F0KHVwcGVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdERhdGEoXHJcbiAgICByZXMsXHJcbiAgICBsYXllcjogTGF5ZXIsXHJcbiAgICBvcHRpb25zOiBRdWVyeU9wdGlvbnMsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIGltcG9zZWRHZW9tZXRyeT9cclxuICApOiBGZWF0dXJlW10ge1xyXG4gICAgY29uc3QgcXVlcnlEYXRhU291cmNlID0gbGF5ZXIuZGF0YVNvdXJjZSBhcyBRdWVyeWFibGVEYXRhU291cmNlO1xyXG5cclxuICAgIGxldCBhbGxvd2VkRmllbGRzQW5kQWxpYXM7XHJcbiAgICBpZiAoXHJcbiAgICAgIGxheWVyLm9wdGlvbnMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPj0gMVxyXG4gICAgKSB7XHJcbiAgICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhcyA9IHt9O1xyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFsaWFzID0gc291cmNlRmllbGQuYWxpYXMgPyBzb3VyY2VGaWVsZC5hbGlhcyA6IHNvdXJjZUZpZWxkLm5hbWU7XHJcbiAgICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzW3NvdXJjZUZpZWxkLm5hbWVdID0gYWxpYXM7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGZlYXR1cmVzID0gW107XHJcbiAgICBzd2l0Y2ggKHF1ZXJ5RGF0YVNvdXJjZS5vcHRpb25zLnF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMzpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdNTDNEYXRhKFxyXG4gICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgbGF5ZXIuekluZGV4LFxyXG4gICAgICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5KU09OOlxyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdFT0pTT046XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RHZW9KU09ORGF0YShyZXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkVTUklKU09OOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0RXNyaUpTT05EYXRhKHJlcywgbGF5ZXIuekluZGV4KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5URVhUOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0VGV4dERhdGEocmVzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0SHRtbERhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2UucXVlcnlIdG1sVGFyZ2V0LFxyXG4gICAgICAgICAgdXJsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MR01MMjpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEh0bWxEYXRhKFxyXG4gICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgcXVlcnlEYXRhU291cmNlLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICAgIHVybCxcclxuICAgICAgICAgIGltcG9zZWRHZW9tZXRyeVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMjpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdNTDJEYXRhKHJlcywgbGF5ZXIsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcCgoZmVhdHVyZTogRmVhdHVyZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICBsZXQgdGl0bGUgPSBmZWF0dXJlLnByb3BlcnRpZXNbcXVlcnlEYXRhU291cmNlLnF1ZXJ5VGl0bGVdO1xyXG4gICAgICBpZiAoIXRpdGxlICYmIGZlYXR1cmVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aXRsZSA9IGAke2xheWVyLnRpdGxlfSAoJHtpbmRleCArIDF9KWA7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRpdGxlKSB7XHJcbiAgICAgICAgdGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBtZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZS5tZXRhIHx8IHt9LCB7XHJcbiAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBtYXBUaXRsZTogdGl0bGUsXHJcbiAgICAgICAgc291cmNlVGl0bGU6IGxheWVyLnRpdGxlLFxyXG4gICAgICAgIG9yZGVyOiAxMDAwIC0gbGF5ZXIuekluZGV4XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZmVhdHVyZSwge1xyXG4gICAgICAgIG1ldGEsXHJcbiAgICAgICAgcHJvamVjdGlvbjpcclxuICAgICAgICAgIHF1ZXJ5RGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICdjYXJ0bydcclxuICAgICAgICAgICAgPyAnRVBTRzo0MzI2J1xyXG4gICAgICAgICAgICA6IG9wdGlvbnMucHJvamVjdGlvblxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0R01MMkRhdGEocmVzLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz8pIHtcclxuICAgIGxldCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwyKCk7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICAvLyBIYW5kbGUgbm9uIHN0YW5kYXJkIEdNTCBvdXRwdXQgKE1hcFNlcnZlcilcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcGFyc2VyID0gbmV3IG9sZm9ybWF0LldNU0dldEZlYXR1cmVJbmZvKCk7XHJcbiAgICAgIGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHTUwzRGF0YShyZXMsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzPykge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMygpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKGZlYXR1cmUgPT5cclxuICAgICAgdGhpcy5mZWF0dXJlVG9SZXN1bHQoZmVhdHVyZSwgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0R2VvSlNPTkRhdGEocmVzKSB7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGZlYXR1cmVzID0gSlNPTi5wYXJzZShyZXMpLmZlYXR1cmVzO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ3F1ZXJ5LnNlcnZpY2U6IFVuYWJsZSB0byBwYXJzZSBnZW9qc29uJywgJ1xcbicsIHJlcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RFc3JpSlNPTkRhdGEocmVzLCB6SW5kZXgpIHtcclxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEVzcmlKU09OKCk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4gdGhpcy5mZWF0dXJlVG9SZXN1bHQoZmVhdHVyZSwgekluZGV4KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RUZXh0RGF0YShyZXMpIHtcclxuICAgIC8vIFRPRE9cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEh0bWxEYXRhKHJlcywgaHRtbFRhcmdldDogUXVlcnlIdG1sVGFyZ2V0LCB1cmwsIGltcG9zZWRHZW9tZXRyeT8pIHtcclxuICAgIC8vIF9ibGFuayAsIGlmcmFtZSBvciB1bmRlZmluZWRcclxuICAgIGNvbnN0IHNlYXJjaFBhcmFtczogYW55ID0gdGhpcy5nZXRRdWVyeVBhcmFtcyh1cmwudG9Mb3dlckNhc2UoKSk7XHJcbiAgICBjb25zdCBiYm94UmF3ID0gc2VhcmNoUGFyYW1zLmJib3g7XHJcbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy53aWR0aCwgMTApO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmhlaWdodCwgMTApO1xyXG4gICAgY29uc3QgeFBvc2l0aW9uID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmkgfHwgc2VhcmNoUGFyYW1zLngsIDEwKTtcclxuICAgIGNvbnN0IHlQb3NpdGlvbiA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5qIHx8IHNlYXJjaFBhcmFtcy55LCAxMCk7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gc2VhcmNoUGFyYW1zLmNycyB8fCBzZWFyY2hQYXJhbXMuc3JzIHx8ICdFUFNHOjM4NTcnO1xyXG5cclxuICAgIGNvbnN0IGJib3ggPSBiYm94UmF3LnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgdGhyZXNob2xkID1cclxuICAgICAgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFswXSkpIC0gTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzJdKSkpICogMC4wNTtcclxuXHJcbiAgICAvLyBmb3IgY29udGV4dCBpbiBkZWdyZWUgKEVQU0c6NDMyNiw0MjY5Li4uKVxyXG4gICAgaWYgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFswXSkpIDwgMTgwKSB7XHJcbiAgICAgIHRocmVzaG9sZCA9IDAuMDQ1O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsaWNreCA9XHJcbiAgICAgIHBhcnNlRmxvYXQoYmJveFswXSkgK1xyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSAtIHBhcnNlRmxvYXQoYmJveFsyXSkpICogeFBvc2l0aW9uKSAvXHJcbiAgICAgICAgd2lkdGggLVxyXG4gICAgICB0aHJlc2hvbGQ7XHJcbiAgICBjb25zdCBjbGlja3kgPVxyXG4gICAgICBwYXJzZUZsb2F0KGJib3hbMV0pICtcclxuICAgICAgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFsxXSkgLSBwYXJzZUZsb2F0KGJib3hbM10pKSAqIHlQb3NpdGlvbikgL1xyXG4gICAgICAgIGhlaWdodCAtXHJcbiAgICAgIHRocmVzaG9sZDtcclxuICAgIGNvbnN0IGNsaWNreDEgPSBjbGlja3ggKyB0aHJlc2hvbGQgKiAyO1xyXG4gICAgY29uc3QgY2xpY2t5MSA9IGNsaWNreSArIHRocmVzaG9sZCAqIDI7XHJcblxyXG4gICAgY29uc3Qgd2t0UG9seSA9XHJcbiAgICAgICdQT0xZR09OKCgnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreTEgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4MSArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreTEgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4MSArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnKSknO1xyXG5cclxuICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5XS1QoKTtcclxuICAgIGNvbnN0IHRlblBlcmNlbnRXaWR0aEdlb20gPSBmb3JtYXQucmVhZEZlYXR1cmUod2t0UG9seSk7XHJcbiAgICBjb25zdCBmID0gdGVuUGVyY2VudFdpZHRoR2VvbS5nZXRHZW9tZXRyeSgpIGFzIGFueTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGh0bWxUYXJnZXQgIT09IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSyAmJlxyXG4gICAgICBodG1sVGFyZ2V0ICE9PSBRdWVyeUh0bWxUYXJnZXQuSUZSQU1FXHJcbiAgICApIHtcclxuICAgICAgaHRtbFRhcmdldCA9IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9keVRhZ1N0YXJ0ID0gcmVzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignPGJvZHk+Jyk7XHJcbiAgICBjb25zdCBib2R5VGFnRW5kID0gcmVzLnRvTG93ZXJDYXNlKCkubGFzdEluZGV4T2YoJzwvYm9keT4nKSArIDc7XHJcbiAgICAvLyByZXBsYWNlIFxcciBcXG4gIGFuZCAnICcgd2l0aCAnJyB0byB2YWxpZGF0ZSBpZiB0aGUgYm9keSBpcyByZWFsbHkgZW1wdHkuXHJcbiAgICBjb25zdCBib2R5ID0gcmVzLnNsaWNlKGJvZHlUYWdTdGFydCwgYm9keVRhZ0VuZCkucmVwbGFjZSgvKFxccnxcXG58XFxzKS9nLCAnJyk7XHJcbiAgICBpZiAoYm9keSA9PT0gJzxib2R5PjwvYm9keT4nIHx8IHJlcyA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb24sXHJcbiAgICAgICAgcHJvcGVydGllczogeyB0YXJnZXQ6IGh0bWxUYXJnZXQsIGJvZHk6IHJlcywgdXJsIH0sXHJcbiAgICAgICAgZ2VvbWV0cnk6IGltcG9zZWRHZW9tZXRyeSB8fCB7IHR5cGU6IGYuZ2V0VHlwZSgpLCBjb29yZGluYXRlczogZi5nZXRDb29yZGluYXRlcygpIH1cclxuICAgICAgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlcnlQYXJhbXModXJsKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHVybC5zcGxpdCgnPycpO1xyXG4gICAgaWYgKCFxdWVyeVN0cmluZ1sxXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYWlycyA9IHF1ZXJ5U3RyaW5nWzFdLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICBwYWlycy5mb3JFYWNoKHBhaXIgPT4ge1xyXG4gICAgICBwYWlyID0gcGFpci5zcGxpdCgnPScpO1xyXG4gICAgICByZXN1bHRbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSB8fCAnJyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZlYXR1cmVUb1Jlc3VsdChcclxuICAgIGZlYXR1cmVPTDogb2xGZWF0dXJlLFxyXG4gICAgekluZGV4OiBudW1iZXIsXHJcbiAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXM/XHJcbiAgKTogRmVhdHVyZSB7XHJcbiAgICBjb25zdCBmZWF0dXJlR2VvbWV0cnkgPSBmZWF0dXJlT0wuZ2V0R2VvbWV0cnkoKSBhcyBhbnk7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBmZWF0dXJlT0wuZ2V0UHJvcGVydGllcygpKTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmdlb21ldHJ5O1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuYm91bmRlZEJ5O1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuc2hhcGU7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5TSEFQRTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLnRoZV9nZW9tO1xyXG5cclxuICAgIGxldCBnZW9tZXRyeTtcclxuICAgIGlmIChmZWF0dXJlR2VvbWV0cnkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBnZW9tZXRyeSA9IHtcclxuICAgICAgICB0eXBlOiBmZWF0dXJlR2VvbWV0cnkuZ2V0VHlwZSgpLFxyXG4gICAgICAgIGNvb3JkaW5hdGVzOiBmZWF0dXJlR2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIHByb2plY3Rpb246IHVuZGVmaW5lZCxcclxuICAgICAgcHJvcGVydGllcyxcclxuICAgICAgZ2VvbWV0cnksXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgIG9yZGVyOiAxMDAwIC0gekluZGV4LFxyXG4gICAgICAgIGFsaWFzOiBhbGxvd2VkRmllbGRzQW5kQWxpYXNcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlcnlVcmwoXHJcbiAgICBkYXRhc291cmNlOiBRdWVyeWFibGVEYXRhU291cmNlLFxyXG4gICAgb3B0aW9uczogUXVlcnlPcHRpb25zLFxyXG4gICAgZm9yY2VHTUwyID0gZmFsc2VcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IHVybDtcclxuICAgIHN3aXRjaCAoZGF0YXNvdXJjZS5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICBjYXNlIFdNU0RhdGFTb3VyY2U6XHJcbiAgICAgICAgY29uc3Qgd21zRGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgV01TRGF0YVNvdXJjZTtcclxuXHJcbiAgICAgICAgY29uc3QgV01TR2V0RmVhdHVyZUluZm9PcHRpb25zID0ge1xyXG4gICAgICAgICAgSU5GT19GT1JNQVQ6IHdtc0RhdGFzb3VyY2UucGFyYW1zLmluZm9fZm9ybWF0IHx8XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TWltZUluZm9Gb3JtYXQoZGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5Rm9ybWF0KSxcclxuICAgICAgICAgIFFVRVJZX0xBWUVSUzogd21zRGF0YXNvdXJjZS5wYXJhbXMubGF5ZXJzLFxyXG4gICAgICAgICAgRkVBVFVSRV9DT1VOVDogd21zRGF0YXNvdXJjZS5wYXJhbXMuZmVhdHVyZV9jb3VudCB8fCAnNSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZm9yY2VHTUwyKSB7XHJcbiAgICAgICAgICBXTVNHZXRGZWF0dXJlSW5mb09wdGlvbnMuSU5GT19GT1JNQVQgPVxyXG4gICAgICAgICAgICB0aGlzLmdldE1pbWVJbmZvRm9ybWF0KFF1ZXJ5Rm9ybWF0LkdNTDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXJsID0gd21zRGF0YXNvdXJjZS5vbC5nZXRHZXRGZWF0dXJlSW5mb1VybChcclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXMsXHJcbiAgICAgICAgICBvcHRpb25zLnJlc29sdXRpb24sXHJcbiAgICAgICAgICBvcHRpb25zLnByb2plY3Rpb24sXHJcbiAgICAgICAgICBXTVNHZXRGZWF0dXJlSW5mb09wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh3bXNEYXRhc291cmNlLnBhcmFtcy52ZXJzaW9uICE9PSAnMS4zLjAnKSB7XHJcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgnJkk9JywgJyZYPScpO1xyXG4gICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJyZKPScsICcmWT0nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2FydG9EYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IGNhcnRvRGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgQ2FydG9EYXRhU291cmNlO1xyXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPVxyXG4gICAgICAgICAgJ2h0dHBzOi8vJyArXHJcbiAgICAgICAgICBjYXJ0b0RhdGFzb3VyY2Uub3B0aW9ucy5hY2NvdW50ICtcclxuICAgICAgICAgICcuY2FydG8uY29tL2FwaS92Mi9zcWw/JztcclxuICAgICAgICBjb25zdCBmb3JtYXQgPSAnZm9ybWF0PUdlb0pTT04nO1xyXG4gICAgICAgIGNvbnN0IHNxbCA9XHJcbiAgICAgICAgICAnJnE9JyArIGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLmNvbmZpZy5sYXllcnNbMF0ub3B0aW9ucy5zcWw7XHJcbiAgICAgICAgY29uc3QgY2xhdXNlID1cclxuICAgICAgICAgICcgV0hFUkUgU1RfSW50ZXJzZWN0cyh0aGVfZ2VvbV93ZWJtZXJjYXRvcixTVF9CVUZGRVIoU1RfU2V0U1JJRChTVF9QT0lOVCgnO1xyXG4gICAgICAgIGNvbnN0IG1ldGVycyA9IGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICA/IGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICA6ICcxMDAwJztcclxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9XHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzWzBdICtcclxuICAgICAgICAgICcsJyArXHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzWzFdICtcclxuICAgICAgICAgICcpLDM4NTcpLCcgK1xyXG4gICAgICAgICAgbWV0ZXJzICtcclxuICAgICAgICAgICcpKSc7XHJcblxyXG4gICAgICAgIHVybCA9IGAke2Jhc2VVcmx9JHtmb3JtYXR9JHtzcWx9JHtjbGF1c2V9JHtjb29yZGluYXRlc31gO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2UgPSBkYXRhc291cmNlIGFzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTtcclxuICAgICAgICBsZXQgZXh0ZW50ID0gb2xleHRlbnQuYm91bmRpbmdFeHRlbnQoW29wdGlvbnMuY29vcmRpbmF0ZXNdKTtcclxuICAgICAgICBpZiAodGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb24pIHtcclxuICAgICAgICAgIGV4dGVudCA9IG9sZXh0ZW50LmJ1ZmZlcihcclxuICAgICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgICB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvblxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VydmljZVVybCA9XHJcbiAgICAgICAgICB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy51cmwgK1xyXG4gICAgICAgICAgJy8nICtcclxuICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLmxheWVyICtcclxuICAgICAgICAgICcvcXVlcnkvJztcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IGVuY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICd7XCJ4bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFswXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsxXSArXHJcbiAgICAgICAgICAgICcsXCJ4bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsyXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFszXSArXHJcbiAgICAgICAgICAgICcsXCJzcGF0aWFsUmVmZXJlbmNlXCI6e1wid2tpZFwiOjEwMjEwMH19J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAgICAgJ2Y9anNvbicsXHJcbiAgICAgICAgICBgZ2VvbWV0cnk9JHtnZW9tZXRyeX1gLFxyXG4gICAgICAgICAgJ2dlb21ldHJ5VHlwZT1lc3JpR2VvbWV0cnlFbnZlbG9wZScsXHJcbiAgICAgICAgICAnaW5TUj0xMDIxMDAnLFxyXG4gICAgICAgICAgJ3NwYXRpYWxSZWw9ZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJyxcclxuICAgICAgICAgICdvdXRGaWVsZHM9KicsXHJcbiAgICAgICAgICAncmV0dXJuR2VvbWV0cnk9dHJ1ZScsXHJcbiAgICAgICAgICAnb3V0U1I9MTAyMTAwJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgdXJsID0gYCR7c2VydmljZVVybH0/JHtwYXJhbXMuam9pbignJicpfWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TWltZUluZm9Gb3JtYXQocXVlcnlGb3JtYXQpIHtcclxuICAgIGxldCBtaW1lO1xyXG4gICAgc3dpdGNoIChxdWVyeUZvcm1hdCkge1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdNTDI6XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi92bmQub2djLmdtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMzpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL3ZuZC5vZ2MuZ21sLzMuMS4xJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5KU09OOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vanNvbic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR0VPSlNPTjpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL2dlb2pzb24nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LlRFWFQ6XHJcbiAgICAgICAgbWltZSA9ICd0ZXh0L3BsYWluJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MOlxyXG4gICAgICAgIG1pbWUgPSAndGV4dC9odG1sJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MR01MMjpcclxuICAgICAgICBtaW1lID0gJ3RleHQvaHRtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi92bmQub2djLmdtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1pbWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==