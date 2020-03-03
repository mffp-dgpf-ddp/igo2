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
        if (((/** @type {?} */ (layer.dataSource))).options.queryFormat ===
            QueryFormat.HTMLGML2) {
            /** @type {?} */
            const urlGml = this.getQueryUrl(layer.dataSource, options, true);
            return this.http.get(urlGml, { responseType: 'text' }).pipe(mergeMap((/**
             * @param {?} gmlRes
             * @return {?}
             */
            gmlRes => {
                /** @type {?} */
                const imposedGeom = this.mergeGML(gmlRes, url);
                return this.http
                    .get(url, { responseType: 'text' })
                    .pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => this.extractData(res, layer, options, url, imposedGeom))));
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
            while (lower.length >= 2 &&
                this.cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
                lower.pop();
            }
            lower.push(point);
        }
        /** @type {?} */
        const upper = [];
        for (let i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 &&
                this.cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
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
        const allowedFieldsAndAlias = this.getAllowedFieldsAndAlias(layer);
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
            const mapLabel = feature.properties[queryDataSource.mapLabel];
            /** @type {?} */
            let exclude;
            if (layer.options.sourceOptions.type === 'wms') {
                /** @type {?} */
                const sourceOptions = (/** @type {?} */ (layer.options
                    .sourceOptions));
                exclude = sourceOptions ? sourceOptions.excludeAttribute : undefined;
            }
            /** @type {?} */
            let title = this.getQueryTitle(feature, layer);
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
                mapTitle: mapLabel,
                sourceTitle: layer.title,
                order: 1000 - layer.zIndex,
                excludeAttribute: exclude
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
            try {
                features = parser.readFeatures(res);
            }
            catch (e) {
                console.warn('query.service: Multipolygons are badly managed in mapserver in GML2. Use another format.');
            }
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
                geometry: imposedGeometry || {
                    type: f.getType(),
                    coordinates: f.getCoordinates()
                }
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
                    INFO_FORMAT: wmsDatasource.params.INFO_FORMAT ||
                        this.getMimeInfoFormat(datasource.options.queryFormat),
                    QUERY_LAYERS: wmsDatasource.params.LAYERS,
                    FEATURE_COUNT: wmsDatasource.params.FEATURE_COUNT || '5'
                };
                if (forceGML2) {
                    WMSGetFeatureInfoOptions.INFO_FORMAT = this.getMimeInfoFormat(QueryFormat.GML2);
                }
                url = wmsDatasource.ol.getGetFeatureInfoUrl(options.coordinates, options.resolution, options.projection, WMSGetFeatureInfoOptions);
                // const wmsVersion =
                //   wmsDatasource.params.VERSION ||
                //   wmsDatasource.params.version ||
                //   '1.3.0';
                // if (wmsVersion !== '1.3.0') {
                //   url = url.replace('&I=', '&X=');
                //   url = url.replace('&J=', '&Y=');
                // }
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
    /**
     * @param {?} layer
     * @return {?}
     */
    getAllowedFieldsAndAlias(layer) {
        /** @type {?} */
        let allowedFieldsAndAlias;
        if (layer.options &&
            layer.options.source &&
            layer.options.source.options &&
            layer.options.source.options.sourceFields &&
            layer.options.source.options.sourceFields.length >= 1) {
            allowedFieldsAndAlias = {};
            layer.options.source.options.sourceFields.forEach((/**
             * @param {?} sourceField
             * @return {?}
             */
            sourceField => {
                /** @type {?} */
                const alias = sourceField.alias ? sourceField.alias : sourceField.name;
                allowedFieldsAndAlias[sourceField.name] = alias;
            }));
        }
        return allowedFieldsAndAlias;
    }
    /**
     * @param {?} feature
     * @param {?} layer
     * @return {?}
     */
    getQueryTitle(feature, layer) {
        /** @type {?} */
        let title;
        if (layer.options && layer.options.source && layer.options.source.options) {
            /** @type {?} */
            const dataSourceOptions = (/** @type {?} */ (layer.options.source
                .options));
            if (dataSourceOptions.queryTitle) {
                title = this.getLabelMatch(feature, dataSourceOptions.queryTitle);
            }
        }
        return title;
    }
    /**
     * @param {?} feature
     * @param {?} labelMatch
     * @return {?}
     */
    getLabelMatch(feature, labelMatch) {
        /** @type {?} */
        let label = labelMatch;
        /** @type {?} */
        const labelToGet = Array.from(labelMatch.matchAll(/\$\{([^\{\}]+)\}/g));
        labelToGet.forEach((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            label = label.replace(v[0], feature.properties[v[1]]);
        }));
        // Nothing done? check feature's attribute
        if (labelToGet.length === 0 && label === labelMatch) {
            label = feature.properties[labelMatch] || labelMatch;
        }
        return label;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFN0QsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2Ysd0JBQXdCLEVBRXpCLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVU3RCxNQUFNLE9BQU8sWUFBWTs7OztJQUd2QixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRjdCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO0lBRVksQ0FBQzs7Ozs7O0lBRXhDLEtBQUssQ0FBQyxNQUFlLEVBQUUsT0FBcUI7UUFDMUMsT0FBTyxNQUFNO2FBQ1YsTUFB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QUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRTtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQUMsT0FBZ0IsRUFBRSxVQUFVOztZQUNwQyxLQUFLLEdBQUcsVUFBVTs7Y0FDaEIsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRXZFLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDLEVBQUMsQ0FBQztRQUVILDBDQUEwQztRQUMxQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbkQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDO1NBQ3REO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUF2b0JGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWhDUSxVQUFVOzs7OztJQWtDakIsb0NBQTJCOzs7OztJQUVmLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCBvbEZvcm1hdEdNTDIgZnJvbSAnb2wvZm9ybWF0L0dNTDInO1xyXG5pbXBvcnQgb2xGb3JtYXRHTUwzIGZyb20gJ29sL2Zvcm1hdC9HTUwzJztcclxuaW1wb3J0IG9sRm9ybWF0RXNyaUpTT04gZnJvbSAnb2wvZm9ybWF0L0VzcmlKU09OJztcclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0ICogYXMgb2xnZW9tIGZyb20gJ29sL2dlb20nO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZFQVRVUkUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHtcclxuICBXTVNEYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgV01TRGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IFF1ZXJ5Rm9ybWF0LCBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuL3F1ZXJ5LmVudW1zJztcclxuaW1wb3J0IHtcclxuICBRdWVyeU9wdGlvbnMsXHJcbiAgUXVlcnlhYmxlRGF0YVNvdXJjZSxcclxuICBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4vcXVlcnkuaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVyeVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBxdWVyeUVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gIHF1ZXJ5KGxheWVyczogTGF5ZXJbXSwgb3B0aW9uczogUXVlcnlPcHRpb25zKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+W10ge1xyXG4gICAgcmV0dXJuIGxheWVyc1xyXG4gICAgICAuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IGxheWVyLnZpc2libGUgJiYgbGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2UpXHJcbiAgICAgIC5tYXAoKGxheWVyOiBMYXllcikgPT4gdGhpcy5xdWVyeUxheWVyKGxheWVyLCBvcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBxdWVyeUxheWVyKGxheWVyOiBMYXllciwgb3B0aW9uczogUXVlcnlPcHRpb25zKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0UXVlcnlVcmwobGF5ZXIuZGF0YVNvdXJjZSwgb3B0aW9ucyk7XHJcbiAgICBpZiAoIXVybCkge1xyXG4gICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgKGxheWVyLmRhdGFTb3VyY2UgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZSkub3B0aW9ucy5xdWVyeUZvcm1hdCA9PT1cclxuICAgICAgUXVlcnlGb3JtYXQuSFRNTEdNTDJcclxuICAgICkge1xyXG4gICAgICBjb25zdCB1cmxHbWwgPSB0aGlzLmdldFF1ZXJ5VXJsKGxheWVyLmRhdGFTb3VyY2UsIG9wdGlvbnMsIHRydWUpO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmxHbWwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSkucGlwZShcclxuICAgICAgICBtZXJnZU1hcChnbWxSZXMgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW1wb3NlZEdlb20gPSB0aGlzLm1lcmdlR01MKGdtbFJlcywgdXJsKTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgbWFwKHJlcyA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5leHRyYWN0RGF0YShyZXMsIGxheWVyLCBvcHRpb25zLCB1cmwsIGltcG9zZWRHZW9tKVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmh0dHAuZ2V0KHVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KTtcclxuICAgIHJldHVybiByZXF1ZXN0LnBpcGUobWFwKHJlcyA9PiB0aGlzLmV4dHJhY3REYXRhKHJlcywgbGF5ZXIsIG9wdGlvbnMsIHVybCkpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWVyZ2VHTUwoZ21sUmVzLCB1cmwpIHtcclxuICAgIGxldCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwyKCk7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKGdtbFJlcyk7XHJcbiAgICAvLyBIYW5kbGUgbm9uIHN0YW5kYXJkIEdNTCBvdXRwdXQgKE1hcFNlcnZlcilcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcGFyc2VyID0gbmV3IG9sZm9ybWF0LldNU0dldEZlYXR1cmVJbmZvKCk7XHJcbiAgICAgIGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhnbWxSZXMpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb2xtbGluZSA9IG5ldyBvbGdlb20uTXVsdGlMaW5lU3RyaW5nKFtdKTtcclxuICAgIGxldCBwdHM7XHJcbiAgICBjb25zdCBwdHNBcnJheSA9IFtdO1xyXG4gICAgbGV0IG9sbXBvbHkgPSBuZXcgb2xnZW9tLk11bHRpUG9seWdvbihbXSk7XHJcbiAgICBsZXQgZmlyc3RGZWF0dXJlVHlwZTtcclxuICAgIGNvbnN0IG5iRmVhdHVyZXMgPSBmZWF0dXJlcy5sZW5ndGg7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgZ2VvbWV0cnkgaW50ZXJzZWN0IGJib3hcclxuICAgIC8vIGZvciBnZW9zZXJ2ZXIgZ2V0ZmVhdHVyZWluZm8gcmVzcG9uc2UgaW4gZGF0YSBwcm9qZWN0aW9uLCBub3QgY2FsbCBwcm9qZWN0aW9uXHJcbiAgICBjb25zdCBzZWFyY2hQYXJhbXM6IGFueSA9IHRoaXMuZ2V0UXVlcnlQYXJhbXModXJsLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgYmJveFJhdyA9IHNlYXJjaFBhcmFtcy5iYm94O1xyXG4gICAgY29uc3QgYmJveCA9IGJib3hSYXcuc3BsaXQoJywnKTtcclxuICAgIGNvbnN0IGJib3hFeHRlbnQgPSBvbGV4dGVudC5jcmVhdGVFbXB0eSgpO1xyXG4gICAgb2xleHRlbnQuZXh0ZW5kKGJib3hFeHRlbnQsIGJib3gpO1xyXG4gICAgY29uc3Qgb3V0QmJveEV4dGVudCA9IGZhbHNlO1xyXG4gICAgZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4ge1xyXG4gICAgICAvKiAgaWYgKCFmZWF0dXJlLmdldEdlb21ldHJ5KCkuc2ltcGxpZnkoMTAwKS5pbnRlcnNlY3RzRXh0ZW50KGJib3hFeHRlbnQpKSB7XHJcbiAgICAgICAgb3V0QmJveEV4dGVudCA9IHRydWU7XHJcbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgdG8gcHJvamVjdCB0aGUgZ2VvbWV0cnk/XHJcbiAgICAgIH0qL1xyXG4gICAgICBjb25zdCBmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcyA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICBjb25zdCBmZWF0dXJlR2VvbWV0cnlUeXBlID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKTtcclxuXHJcbiAgICAgIGlmICghZmlyc3RGZWF0dXJlVHlwZSAmJiAhb3V0QmJveEV4dGVudCkge1xyXG4gICAgICAgIGZpcnN0RmVhdHVyZVR5cGUgPSBmZWF0dXJlR2VvbWV0cnlUeXBlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghb3V0QmJveEV4dGVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZmVhdHVyZUdlb21ldHJ5VHlwZSkge1xyXG4gICAgICAgICAgY2FzZSAnUG9pbnQnOlxyXG4gICAgICAgICAgICBpZiAobmJGZWF0dXJlcyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIHB0cyA9IG5ldyBvbGdlb20uUG9pbnQoZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMsICdYWScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHB0c0FycmF5LnB1c2goZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnTGluZVN0cmluZyc6XHJcbiAgICAgICAgICAgIG9sbWxpbmUuYXBwZW5kTGluZVN0cmluZyhcclxuICAgICAgICAgICAgICBuZXcgb2xnZW9tLkxpbmVTdHJpbmcoZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMsICdYWScpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnUG9seWdvbic6XHJcbiAgICAgICAgICAgIG9sbXBvbHkuYXBwZW5kUG9seWdvbihcclxuICAgICAgICAgICAgICBuZXcgb2xnZW9tLlBvbHlnb24oZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMsICdYWScpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcclxuICAgICAgICAgICAgb2xtcG9seSA9IG5ldyBvbGdlb20uTXVsdGlQb2x5Z29uKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgb2xtcHRzO1xyXG4gICAgaWYgKHB0c0FycmF5Lmxlbmd0aCA9PT0gMCAmJiBwdHMpIHtcclxuICAgICAgb2xtcHRzID0ge1xyXG4gICAgICAgIHR5cGU6IHB0cy5nZXRUeXBlKCksXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IHB0cy5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbG1wdHMgPSB7XHJcbiAgICAgICAgdHlwZTogJ1BvbHlnb24nLFxyXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbdGhpcy5jb252ZXhIdWxsKHB0c0FycmF5KV1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGZpcnN0RmVhdHVyZVR5cGUpIHtcclxuICAgICAgY2FzZSAnTGluZVN0cmluZyc6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6IG9sbWxpbmUuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IG9sbWxpbmUuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgIGNhc2UgJ1BvaW50JzpcclxuICAgICAgICByZXR1cm4gb2xtcHRzO1xyXG4gICAgICBjYXNlICdQb2x5Z29uJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogb2xtcG9seS5nZXRUeXBlKCksXHJcbiAgICAgICAgICBjb29yZGluYXRlczogb2xtcG9seS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogb2xtcG9seS5nZXRUeXBlKCksXHJcbiAgICAgICAgICBjb29yZGluYXRlczogb2xtcG9seS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgICAgfTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcm9zcyhhLCBiLCBvKSB7XHJcbiAgICByZXR1cm4gKGFbMF0gLSBvWzBdKSAqIChiWzFdIC0gb1sxXSkgLSAoYVsxXSAtIG9bMV0pICogKGJbMF0gLSBvWzBdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBwb2ludHMgQW4gYXJyYXkgb2YgW1gsIFldIGNvb3JkaW5hdGVzXHJcbiAgICogVGhpcyBtZXRob2QgaXMgdXNlIGluc3RlYWQgb2YgdHVyZi5qcyBjb252ZXhIdWxsIGJlY2F1c2UgVHVyZiBuZWVkcyBhdCBsZWFzdCAzIHBvaW50IHRvIG1ha2UgYSBodWxsLlxyXG4gICAqIGh0dHBzOi8vZW4ud2lraWJvb2tzLm9yZy93aWtpL0FsZ29yaXRobV9JbXBsZW1lbnRhdGlvbi9HZW9tZXRyeS9Db252ZXhfaHVsbC9Nb25vdG9uZV9jaGFpbiNKYXZhU2NyaXB0XHJcbiAgICovXHJcbiAgY29udmV4SHVsbChwb2ludHMpIHtcclxuICAgIHBvaW50cy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIHJldHVybiBhWzBdID09PSBiWzBdID8gYVsxXSAtIGJbMV0gOiBhWzBdIC0gYlswXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGxvd2VyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHBvaW50cykge1xyXG4gICAgICB3aGlsZSAoXHJcbiAgICAgICAgbG93ZXIubGVuZ3RoID49IDIgJiZcclxuICAgICAgICB0aGlzLmNyb3NzKGxvd2VyW2xvd2VyLmxlbmd0aCAtIDJdLCBsb3dlcltsb3dlci5sZW5ndGggLSAxXSwgcG9pbnQpIDw9IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgbG93ZXIucG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgbG93ZXIucHVzaChwb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBwZXIgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSBwb2ludHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgd2hpbGUgKFxyXG4gICAgICAgIHVwcGVyLmxlbmd0aCA+PSAyICYmXHJcbiAgICAgICAgdGhpcy5jcm9zcyhcclxuICAgICAgICAgIHVwcGVyW3VwcGVyLmxlbmd0aCAtIDJdLFxyXG4gICAgICAgICAgdXBwZXJbdXBwZXIubGVuZ3RoIC0gMV0sXHJcbiAgICAgICAgICBwb2ludHNbaV1cclxuICAgICAgICApIDw9IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdXBwZXIucG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgdXBwZXIucHVzaChwb2ludHNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwcGVyLnBvcCgpO1xyXG4gICAgbG93ZXIucG9wKCk7XHJcbiAgICByZXR1cm4gbG93ZXIuY29uY2F0KHVwcGVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdERhdGEoXHJcbiAgICByZXMsXHJcbiAgICBsYXllcjogTGF5ZXIsXHJcbiAgICBvcHRpb25zOiBRdWVyeU9wdGlvbnMsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIGltcG9zZWRHZW9tZXRyeT9cclxuICApOiBGZWF0dXJlW10ge1xyXG4gICAgY29uc3QgcXVlcnlEYXRhU291cmNlID0gbGF5ZXIuZGF0YVNvdXJjZSBhcyBRdWVyeWFibGVEYXRhU291cmNlO1xyXG5cclxuICAgIGNvbnN0IGFsbG93ZWRGaWVsZHNBbmRBbGlhcyA9IHRoaXMuZ2V0QWxsb3dlZEZpZWxkc0FuZEFsaWFzKGxheWVyKTtcclxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgc3dpdGNoIChxdWVyeURhdGFTb3VyY2Uub3B0aW9ucy5xdWVyeUZvcm1hdCkge1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdNTDM6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RHTUwzRGF0YShcclxuICAgICAgICAgIHJlcyxcclxuICAgICAgICAgIGxheWVyLnpJbmRleCxcclxuICAgICAgICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuSlNPTjpcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HRU9KU09OOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R2VvSlNPTkRhdGEocmVzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5FU1JJSlNPTjpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEVzcmlKU09ORGF0YShyZXMsIGxheWVyLnpJbmRleCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuVEVYVDpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdFRleHREYXRhKHJlcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuSFRNTDpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEh0bWxEYXRhKFxyXG4gICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgcXVlcnlEYXRhU291cmNlLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICAgIHVybFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuSFRNTEdNTDI6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RIdG1sRGF0YShcclxuICAgICAgICAgIHJlcyxcclxuICAgICAgICAgIHF1ZXJ5RGF0YVNvdXJjZS5xdWVyeUh0bWxUYXJnZXQsXHJcbiAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICBpbXBvc2VkR2VvbWV0cnlcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdNTDI6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RHTUwyRGF0YShyZXMsIGxheWVyLCBhbGxvd2VkRmllbGRzQW5kQWxpYXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoKGZlYXR1cmU6IEZlYXR1cmUsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgY29uc3QgbWFwTGFiZWwgPSBmZWF0dXJlLnByb3BlcnRpZXNbcXVlcnlEYXRhU291cmNlLm1hcExhYmVsXTtcclxuXHJcbiAgICAgIGxldCBleGNsdWRlO1xyXG4gICAgICBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICd3bXMnKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IGxheWVyLm9wdGlvbnNcclxuICAgICAgICAgIC5zb3VyY2VPcHRpb25zIGFzIFdNU0RhdGFTb3VyY2VPcHRpb25zO1xyXG4gICAgICAgIGV4Y2x1ZGUgPSBzb3VyY2VPcHRpb25zID8gc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlIDogdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgdGl0bGUgPSB0aGlzLmdldFF1ZXJ5VGl0bGUoZmVhdHVyZSwgbGF5ZXIpO1xyXG4gICAgICBpZiAoIXRpdGxlICYmIGZlYXR1cmVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aXRsZSA9IGAke2xheWVyLnRpdGxlfSAoJHtpbmRleCArIDF9KWA7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRpdGxlKSB7XHJcbiAgICAgICAgdGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWV0YSA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmUubWV0YSB8fCB7fSwge1xyXG4gICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgbWFwVGl0bGU6IG1hcExhYmVsLFxyXG4gICAgICAgIHNvdXJjZVRpdGxlOiBsYXllci50aXRsZSxcclxuICAgICAgICBvcmRlcjogMTAwMCAtIGxheWVyLnpJbmRleCxcclxuICAgICAgICBleGNsdWRlQXR0cmlidXRlOiBleGNsdWRlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZmVhdHVyZSwge1xyXG4gICAgICAgIG1ldGEsXHJcbiAgICAgICAgcHJvamVjdGlvbjpcclxuICAgICAgICAgIHF1ZXJ5RGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICdjYXJ0bydcclxuICAgICAgICAgICAgPyAnRVBTRzo0MzI2J1xyXG4gICAgICAgICAgICA6IG9wdGlvbnMucHJvamVjdGlvblxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0R01MMkRhdGEocmVzLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz8pIHtcclxuICAgIGxldCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwyKCk7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICAvLyBIYW5kbGUgbm9uIHN0YW5kYXJkIEdNTCBvdXRwdXQgKE1hcFNlcnZlcilcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcGFyc2VyID0gbmV3IG9sZm9ybWF0LldNU0dldEZlYXR1cmVJbmZvKCk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICAncXVlcnkuc2VydmljZTogTXVsdGlwb2x5Z29ucyBhcmUgYmFkbHkgbWFuYWdlZCBpbiBtYXBzZXJ2ZXIgaW4gR01MMi4gVXNlIGFub3RoZXIgZm9ybWF0LidcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcChmZWF0dXJlID0+XHJcbiAgICAgIHRoaXMuZmVhdHVyZVRvUmVzdWx0KGZlYXR1cmUsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEdNTDNEYXRhKHJlcywgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXM/KSB7XHJcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwzKCk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHZW9KU09ORGF0YShyZXMpIHtcclxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgZmVhdHVyZXMgPSBKU09OLnBhcnNlKHJlcykuZmVhdHVyZXM7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncXVlcnkuc2VydmljZTogVW5hYmxlIHRvIHBhcnNlIGdlb2pzb24nLCAnXFxuJywgcmVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEVzcmlKU09ORGF0YShyZXMsIHpJbmRleCkge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0RXNyaUpTT04oKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFRleHREYXRhKHJlcykge1xyXG4gICAgLy8gVE9ET1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0SHRtbERhdGEoXHJcbiAgICByZXMsXHJcbiAgICBodG1sVGFyZ2V0OiBRdWVyeUh0bWxUYXJnZXQsXHJcbiAgICB1cmwsXHJcbiAgICBpbXBvc2VkR2VvbWV0cnk/XHJcbiAgKSB7XHJcbiAgICAvLyBfYmxhbmsgLCBpZnJhbWUgb3IgdW5kZWZpbmVkXHJcbiAgICBjb25zdCBzZWFyY2hQYXJhbXM6IGFueSA9IHRoaXMuZ2V0UXVlcnlQYXJhbXModXJsLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgYmJveFJhdyA9IHNlYXJjaFBhcmFtcy5iYm94O1xyXG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUludChzZWFyY2hQYXJhbXMud2lkdGgsIDEwKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5oZWlnaHQsIDEwKTtcclxuICAgIGNvbnN0IHhQb3NpdGlvbiA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5pIHx8IHNlYXJjaFBhcmFtcy54LCAxMCk7XHJcbiAgICBjb25zdCB5UG9zaXRpb24gPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaiB8fCBzZWFyY2hQYXJhbXMueSwgMTApO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHNlYXJjaFBhcmFtcy5jcnMgfHwgc2VhcmNoUGFyYW1zLnNycyB8fCAnRVBTRzozODU3JztcclxuXHJcbiAgICBjb25zdCBiYm94ID0gYmJveFJhdy5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IHRocmVzaG9sZCA9XHJcbiAgICAgIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMF0pKSAtIE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFsyXSkpKSAqIDAuMDU7XHJcblxyXG4gICAgLy8gZm9yIGNvbnRleHQgaW4gZGVncmVlIChFUFNHOjQzMjYsNDI2OS4uLilcclxuICAgIGlmIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMF0pKSA8IDE4MCkge1xyXG4gICAgICB0aHJlc2hvbGQgPSAwLjA0NTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGlja3ggPVxyXG4gICAgICBwYXJzZUZsb2F0KGJib3hbMF0pICtcclxuICAgICAgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFswXSkgLSBwYXJzZUZsb2F0KGJib3hbMl0pKSAqIHhQb3NpdGlvbikgL1xyXG4gICAgICAgIHdpZHRoIC1cclxuICAgICAgdGhyZXNob2xkO1xyXG4gICAgY29uc3QgY2xpY2t5ID1cclxuICAgICAgcGFyc2VGbG9hdChiYm94WzFdKSArXHJcbiAgICAgIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMV0pIC0gcGFyc2VGbG9hdChiYm94WzNdKSkgKiB5UG9zaXRpb24pIC9cclxuICAgICAgICBoZWlnaHQgLVxyXG4gICAgICB0aHJlc2hvbGQ7XHJcbiAgICBjb25zdCBjbGlja3gxID0gY2xpY2t4ICsgdGhyZXNob2xkICogMjtcclxuICAgIGNvbnN0IGNsaWNreTEgPSBjbGlja3kgKyB0aHJlc2hvbGQgKiAyO1xyXG5cclxuICAgIGNvbnN0IHdrdFBvbHkgPVxyXG4gICAgICAnUE9MWUdPTigoJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kxICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreDEgK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kxICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreDEgK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJykpJztcclxuXHJcbiAgICBjb25zdCBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuV0tUKCk7XHJcbiAgICBjb25zdCB0ZW5QZXJjZW50V2lkdGhHZW9tID0gZm9ybWF0LnJlYWRGZWF0dXJlKHdrdFBvbHkpO1xyXG4gICAgY29uc3QgZiA9IHRlblBlcmNlbnRXaWR0aEdlb20uZ2V0R2VvbWV0cnkoKSBhcyBhbnk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBodG1sVGFyZ2V0ICE9PSBRdWVyeUh0bWxUYXJnZXQuQkxBTksgJiZcclxuICAgICAgaHRtbFRhcmdldCAhPT0gUXVlcnlIdG1sVGFyZ2V0LklGUkFNRVxyXG4gICAgKSB7XHJcbiAgICAgIGh0bWxUYXJnZXQgPSBRdWVyeUh0bWxUYXJnZXQuSUZSQU1FO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvZHlUYWdTdGFydCA9IHJlcy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJzxib2R5PicpO1xyXG4gICAgY29uc3QgYm9keVRhZ0VuZCA9IHJlcy50b0xvd2VyQ2FzZSgpLmxhc3RJbmRleE9mKCc8L2JvZHk+JykgKyA3O1xyXG4gICAgLy8gcmVwbGFjZSBcXHIgXFxuICBhbmQgJyAnIHdpdGggJycgdG8gdmFsaWRhdGUgaWYgdGhlIGJvZHkgaXMgcmVhbGx5IGVtcHR5LlxyXG4gICAgY29uc3QgYm9keSA9IHJlcy5zbGljZShib2R5VGFnU3RhcnQsIGJvZHlUYWdFbmQpLnJlcGxhY2UoLyhcXHJ8XFxufFxccykvZywgJycpO1xyXG4gICAgaWYgKGJvZHkgPT09ICc8Ym9keT48L2JvZHk+JyB8fCByZXMgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgICBwcm9qZWN0aW9uLFxyXG4gICAgICAgIHByb3BlcnRpZXM6IHsgdGFyZ2V0OiBodG1sVGFyZ2V0LCBib2R5OiByZXMsIHVybCB9LFxyXG4gICAgICAgIGdlb21ldHJ5OiBpbXBvc2VkR2VvbWV0cnkgfHwge1xyXG4gICAgICAgICAgdHlwZTogZi5nZXRUeXBlKCksXHJcbiAgICAgICAgICBjb29yZGluYXRlczogZi5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gdXJsLnNwbGl0KCc/Jyk7XHJcbiAgICBpZiAoIXF1ZXJ5U3RyaW5nWzFdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhaXJzID0gcXVlcnlTdHJpbmdbMV0uc3BsaXQoJyYnKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgIHBhaXJzLmZvckVhY2gocGFpciA9PiB7XHJcbiAgICAgIHBhaXIgPSBwYWlyLnNwbGl0KCc9Jyk7XHJcbiAgICAgIHJlc3VsdFtwYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdIHx8ICcnKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmZWF0dXJlVG9SZXN1bHQoXHJcbiAgICBmZWF0dXJlT0w6IG9sRmVhdHVyZSxcclxuICAgIHpJbmRleDogbnVtYmVyLFxyXG4gICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzP1xyXG4gICk6IEZlYXR1cmUge1xyXG4gICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5ID0gZmVhdHVyZU9MLmdldEdlb21ldHJ5KCkgYXMgYW55O1xyXG4gICAgY29uc3QgcHJvcGVydGllczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZU9MLmdldFByb3BlcnRpZXMoKSk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5nZW9tZXRyeTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmJvdW5kZWRCeTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLnNoYXBlO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuU0hBUEU7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy50aGVfZ2VvbTtcclxuXHJcbiAgICBsZXQgZ2VvbWV0cnk7XHJcbiAgICBpZiAoZmVhdHVyZUdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZ2VvbWV0cnkgPSB7XHJcbiAgICAgICAgdHlwZTogZmVhdHVyZUdlb21ldHJ5LmdldFR5cGUoKSxcclxuICAgICAgICBjb29yZGluYXRlczogZmVhdHVyZUdlb21ldHJ5LmdldENvb3JkaW5hdGVzKClcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICBwcm9qZWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgIGdlb21ldHJ5LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICBvcmRlcjogMTAwMCAtIHpJbmRleCxcclxuICAgICAgICBhbGlhczogYWxsb3dlZEZpZWxkc0FuZEFsaWFzXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXJ5VXJsKFxyXG4gICAgZGF0YXNvdXJjZTogUXVlcnlhYmxlRGF0YVNvdXJjZSxcclxuICAgIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyxcclxuICAgIGZvcmNlR01MMiA9IGZhbHNlXHJcbiAgKTogc3RyaW5nIHtcclxuICAgIGxldCB1cmw7XHJcbiAgICBzd2l0Y2ggKGRhdGFzb3VyY2UuY29uc3RydWN0b3IpIHtcclxuICAgICAgY2FzZSBXTVNEYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IHdtc0RhdGFzb3VyY2UgPSBkYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2U7XHJcblxyXG4gICAgICAgIGNvbnN0IFdNU0dldEZlYXR1cmVJbmZvT3B0aW9ucyA9IHtcclxuICAgICAgICAgIElORk9fRk9STUFUOlxyXG4gICAgICAgICAgICB3bXNEYXRhc291cmNlLnBhcmFtcy5JTkZPX0ZPUk1BVCB8fFxyXG4gICAgICAgICAgICB0aGlzLmdldE1pbWVJbmZvRm9ybWF0KGRhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeUZvcm1hdCksXHJcbiAgICAgICAgICBRVUVSWV9MQVlFUlM6IHdtc0RhdGFzb3VyY2UucGFyYW1zLkxBWUVSUyxcclxuICAgICAgICAgIEZFQVRVUkVfQ09VTlQ6IHdtc0RhdGFzb3VyY2UucGFyYW1zLkZFQVRVUkVfQ09VTlQgfHwgJzUnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZvcmNlR01MMikge1xyXG4gICAgICAgICAgV01TR2V0RmVhdHVyZUluZm9PcHRpb25zLklORk9fRk9STUFUID0gdGhpcy5nZXRNaW1lSW5mb0Zvcm1hdChcclxuICAgICAgICAgICAgUXVlcnlGb3JtYXQuR01MMlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVybCA9IHdtc0RhdGFzb3VyY2Uub2wuZ2V0R2V0RmVhdHVyZUluZm9VcmwoXHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzLFxyXG4gICAgICAgICAgb3B0aW9ucy5yZXNvbHV0aW9uLFxyXG4gICAgICAgICAgb3B0aW9ucy5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgV01TR2V0RmVhdHVyZUluZm9PcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBjb25zdCB3bXNWZXJzaW9uID1cclxuICAgICAgICAvLyAgIHdtc0RhdGFzb3VyY2UucGFyYW1zLlZFUlNJT04gfHxcclxuICAgICAgICAvLyAgIHdtc0RhdGFzb3VyY2UucGFyYW1zLnZlcnNpb24gfHxcclxuICAgICAgICAvLyAgICcxLjMuMCc7XHJcbiAgICAgICAgLy8gaWYgKHdtc1ZlcnNpb24gIT09ICcxLjMuMCcpIHtcclxuICAgICAgICAvLyAgIHVybCA9IHVybC5yZXBsYWNlKCcmST0nLCAnJlg9Jyk7XHJcbiAgICAgICAgLy8gICB1cmwgPSB1cmwucmVwbGFjZSgnJko9JywgJyZZPScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDYXJ0b0RhdGFTb3VyY2U6XHJcbiAgICAgICAgY29uc3QgY2FydG9EYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBDYXJ0b0RhdGFTb3VyY2U7XHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9XHJcbiAgICAgICAgICAnaHR0cHM6Ly8nICtcclxuICAgICAgICAgIGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLmFjY291bnQgK1xyXG4gICAgICAgICAgJy5jYXJ0by5jb20vYXBpL3YyL3NxbD8nO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdCA9ICdmb3JtYXQ9R2VvSlNPTic7XHJcbiAgICAgICAgY29uc3Qgc3FsID1cclxuICAgICAgICAgICcmcT0nICsgY2FydG9EYXRhc291cmNlLm9wdGlvbnMuY29uZmlnLmxheWVyc1swXS5vcHRpb25zLnNxbDtcclxuICAgICAgICBjb25zdCBjbGF1c2UgPVxyXG4gICAgICAgICAgJyBXSEVSRSBTVF9JbnRlcnNlY3RzKHRoZV9nZW9tX3dlYm1lcmNhdG9yLFNUX0JVRkZFUihTVF9TZXRTUklEKFNUX1BPSU5UKCc7XHJcbiAgICAgICAgY29uc3QgbWV0ZXJzID0gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgID8gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgIDogJzEwMDAnO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID1cclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMF0gK1xyXG4gICAgICAgICAgJywnICtcclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMV0gK1xyXG4gICAgICAgICAgJyksMzg1NyksJyArXHJcbiAgICAgICAgICBtZXRlcnMgK1xyXG4gICAgICAgICAgJykpJztcclxuXHJcbiAgICAgICAgdXJsID0gYCR7YmFzZVVybH0ke2Zvcm1hdH0ke3NxbH0ke2NsYXVzZX0ke2Nvb3JkaW5hdGVzfWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlO1xyXG4gICAgICAgIGxldCBleHRlbnQgPSBvbGV4dGVudC5ib3VuZGluZ0V4dGVudChbb3B0aW9ucy5jb29yZGluYXRlc10pO1xyXG4gICAgICAgIGlmICh0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvbikge1xyXG4gICAgICAgICAgZXh0ZW50ID0gb2xleHRlbnQuYnVmZmVyKFxyXG4gICAgICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID1cclxuICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnVybCArXHJcbiAgICAgICAgICAnLycgK1xyXG4gICAgICAgICAgdGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMubGF5ZXIgK1xyXG4gICAgICAgICAgJy9xdWVyeS8nO1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgJ3tcInhtaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzBdICtcclxuICAgICAgICAgICAgJyxcInltaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzFdICtcclxuICAgICAgICAgICAgJyxcInhtYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzJdICtcclxuICAgICAgICAgICAgJyxcInltYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzNdICtcclxuICAgICAgICAgICAgJyxcInNwYXRpYWxSZWZlcmVuY2VcIjp7XCJ3a2lkXCI6MTAyMTAwfX0nXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAnZj1qc29uJyxcclxuICAgICAgICAgIGBnZW9tZXRyeT0ke2dlb21ldHJ5fWAsXHJcbiAgICAgICAgICAnZ2VvbWV0cnlUeXBlPWVzcmlHZW9tZXRyeUVudmVsb3BlJyxcclxuICAgICAgICAgICdpblNSPTEwMjEwMCcsXHJcbiAgICAgICAgICAnc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnLFxyXG4gICAgICAgICAgJ291dEZpZWxkcz0qJyxcclxuICAgICAgICAgICdyZXR1cm5HZW9tZXRyeT10cnVlJyxcclxuICAgICAgICAgICdvdXRTUj0xMDIxMDAnXHJcbiAgICAgICAgXTtcclxuICAgICAgICB1cmwgPSBgJHtzZXJ2aWNlVXJsfT8ke3BhcmFtcy5qb2luKCcmJyl9YDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNaW1lSW5mb0Zvcm1hdChxdWVyeUZvcm1hdCkge1xyXG4gICAgbGV0IG1pbWU7XHJcbiAgICBzd2l0Y2ggKHF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMjpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL3ZuZC5vZ2MuZ21sJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwzOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vdm5kLm9nYy5nbWwvMy4xLjEnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkpTT046XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HRU9KU09OOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vZ2VvanNvbic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuVEVYVDpcclxuICAgICAgICBtaW1lID0gJ3RleHQvcGxhaW4nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUw6XHJcbiAgICAgICAgbWltZSA9ICd0ZXh0L2h0bWwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyOlxyXG4gICAgICAgIG1pbWUgPSAndGV4dC9odG1sJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL3ZuZC5vZ2MuZ21sJztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWltZTtcclxuICB9XHJcblxyXG4gIGdldEFsbG93ZWRGaWVsZHNBbmRBbGlhcyhsYXllcjogYW55KSB7XHJcbiAgICBsZXQgYWxsb3dlZEZpZWxkc0FuZEFsaWFzO1xyXG4gICAgaWYgKFxyXG4gICAgICBsYXllci5vcHRpb25zICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlLm9wdGlvbnMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID49IDFcclxuICAgICkge1xyXG4gICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXMgPSB7fTtcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgY29uc3QgYWxpYXMgPSBzb3VyY2VGaWVsZC5hbGlhcyA/IHNvdXJjZUZpZWxkLmFsaWFzIDogc291cmNlRmllbGQubmFtZTtcclxuICAgICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXNbc291cmNlRmllbGQubmFtZV0gPSBhbGlhcztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWxsb3dlZEZpZWxkc0FuZEFsaWFzO1xyXG4gIH1cclxuXHJcbiAgZ2V0UXVlcnlUaXRsZShmZWF0dXJlOiBGZWF0dXJlLCBsYXllcjogTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHRpdGxlO1xyXG4gICAgaWYgKGxheWVyLm9wdGlvbnMgJiYgbGF5ZXIub3B0aW9ucy5zb3VyY2UgJiYgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucykge1xyXG4gICAgICBjb25zdCBkYXRhU291cmNlT3B0aW9ucyA9IGxheWVyLm9wdGlvbnMuc291cmNlXHJcbiAgICAgICAgLm9wdGlvbnMgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgICAgIGlmIChkYXRhU291cmNlT3B0aW9ucy5xdWVyeVRpdGxlKSB7XHJcbiAgICAgICAgdGl0bGUgPSB0aGlzLmdldExhYmVsTWF0Y2goZmVhdHVyZSwgZGF0YVNvdXJjZU9wdGlvbnMucXVlcnlUaXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXRMYWJlbE1hdGNoKGZlYXR1cmU6IEZlYXR1cmUsIGxhYmVsTWF0Y2gpOiBzdHJpbmcge1xyXG4gICAgbGV0IGxhYmVsID0gbGFiZWxNYXRjaDtcclxuICAgIGNvbnN0IGxhYmVsVG9HZXQgPSBBcnJheS5mcm9tKGxhYmVsTWF0Y2gubWF0Y2hBbGwoL1xcJFxceyhbXlxce1xcfV0rKVxcfS9nKSk7XHJcblxyXG4gICAgbGFiZWxUb0dldC5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UodlswXSwgZmVhdHVyZS5wcm9wZXJ0aWVzW3ZbMV1dKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE5vdGhpbmcgZG9uZT8gY2hlY2sgZmVhdHVyZSdzIGF0dHJpYnV0ZVxyXG4gICAgaWYgKGxhYmVsVG9HZXQubGVuZ3RoID09PSAwICYmIGxhYmVsID09PSBsYWJlbE1hdGNoKSB7XHJcbiAgICAgIGxhYmVsID0gZmVhdHVyZS5wcm9wZXJ0aWVzW2xhYmVsTWF0Y2hdIHx8IGxhYmVsTWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=