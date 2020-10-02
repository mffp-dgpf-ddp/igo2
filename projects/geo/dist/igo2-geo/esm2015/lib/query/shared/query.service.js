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
import { QueryFormat, QueryFormatMimeType, QueryHtmlTarget } from './query.enums';
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
            case QueryFormat.GEOJSON2:
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
        if (features.length > 0 && features[0].geometry == null) {
            /** @type {?} */
            const geomToAdd = this.createGeometryFromUrlClick(url);
            for (const feature of features) {
                feature.geometry = geomToAdd;
            }
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
     * @param {?} url
     * @return {?}
     */
    createGeometryFromUrlClick(url) {
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
        /** @type {?} */
        const newGeom = {
            type: f.getType(),
            coordinates: f.getCoordinates()
        };
        return newGeom;
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
        let features = [];
        try {
            features = parser.readFeatures(res);
        }
        catch (e) {
            console.warn('query.service: GML3 is not well supported');
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
        /** @type {?} */
        const searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        const projection = searchParams.crs || searchParams.srs || 'EPSG:3857';
        /** @type {?} */
        const geomToAdd = this.createGeometryFromUrlClick(url);
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
                geometry: imposedGeometry || geomToAdd
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
        let mime = 'application/vnd.ogc.gml';
        /** @type {?} */
        const keyEnum = Object.keys(QueryFormat).find((/**
         * @param {?} key
         * @return {?}
         */
        key => QueryFormat[key] === queryFormat));
        if (keyEnum) {
            mime = QueryFormatMimeType[keyEnum];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFN0QsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2Ysd0JBQXdCLEVBRXpCLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUNMLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsZUFBZSxFQUNoQixNQUFNLGVBQWUsQ0FBQzs7O0FBVXZCLE1BQU0sT0FBTyxZQUFZOzs7O0lBR3ZCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGN0IsaUJBQVksR0FBRyxJQUFJLENBQUM7SUFFWSxDQUFDOzs7Ozs7SUFFeEMsS0FBSyxDQUFDLE1BQWUsRUFBRSxPQUFxQjtRQUMxQyxPQUFP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LFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFwQ1EsVUFBVTs7Ozs7SUFzQ2pCLG9DQUEyQjs7Ozs7SUFFZiw0QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgb2xGb3JtYXRHTUwyIGZyb20gJ29sL2Zvcm1hdC9HTUwyJztcclxuaW1wb3J0IG9sRm9ybWF0R01MMyBmcm9tICdvbC9mb3JtYXQvR01MMyc7XHJcbmltcG9ydCBvbEZvcm1hdEVzcmlKU09OIGZyb20gJ29sL2Zvcm1hdC9Fc3JpSlNPTic7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCAqIGFzIG9sZ2VvbSBmcm9tICdvbC9nZW9tJztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGRUFUVVJFIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7XHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIFF1ZXJ5Rm9ybWF0LFxyXG4gIFF1ZXJ5Rm9ybWF0TWltZVR5cGUsXHJcbiAgUXVlcnlIdG1sVGFyZ2V0XHJcbn0gZnJvbSAnLi9xdWVyeS5lbnVtcyc7XHJcbmltcG9ydCB7XHJcbiAgUXVlcnlPcHRpb25zLFxyXG4gIFF1ZXJ5YWJsZURhdGFTb3VyY2UsXHJcbiAgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL3F1ZXJ5LmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUXVlcnlTZXJ2aWNlIHtcclxuICBwdWJsaWMgcXVlcnlFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBxdWVyeShsYXllcnM6IExheWVyW10sIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPltdIHtcclxuICAgIHJldHVybiBsYXllcnNcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBsYXllci52aXNpYmxlICYmIGxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlKVxyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHRoaXMucXVlcnlMYXllcihsYXllciwgb3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgcXVlcnlMYXllcihsYXllcjogTGF5ZXIsIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFF1ZXJ5VXJsKGxheWVyLmRhdGFTb3VyY2UsIG9wdGlvbnMpO1xyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChsYXllci5kYXRhU291cmNlIGFzIFF1ZXJ5YWJsZURhdGFTb3VyY2UpLm9wdGlvbnMucXVlcnlGb3JtYXQgPT09XHJcbiAgICAgIFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgdXJsR21sID0gdGhpcy5nZXRRdWVyeVVybChsYXllci5kYXRhU291cmNlLCBvcHRpb25zLCB0cnVlKTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsR21sLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pLnBpcGUoXHJcbiAgICAgICAgbWVyZ2VNYXAoZ21sUmVzID0+IHtcclxuICAgICAgICAgIGNvbnN0IGltcG9zZWRHZW9tID0gdGhpcy5tZXJnZUdNTChnbWxSZXMsIHVybCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgIG1hcChyZXMgPT5cclxuICAgICAgICAgICAgICAgIHRoaXMuZXh0cmFjdERhdGEocmVzLCBsYXllciwgb3B0aW9ucywgdXJsLCBpbXBvc2VkR2VvbSlcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5odHRwLmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdC5waXBlKG1hcChyZXMgPT4gdGhpcy5leHRyYWN0RGF0YShyZXMsIGxheWVyLCBvcHRpb25zLCB1cmwpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1lcmdlR01MKGdtbFJlcywgdXJsKSB7XHJcbiAgICBsZXQgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMigpO1xyXG4gICAgbGV0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhnbWxSZXMpO1xyXG4gICAgLy8gSGFuZGxlIG5vbiBzdGFuZGFyZCBHTUwgb3V0cHV0IChNYXBTZXJ2ZXIpXHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHBhcnNlciA9IG5ldyBvbGZvcm1hdC5XTVNHZXRGZWF0dXJlSW5mbygpO1xyXG4gICAgICBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMoZ21sUmVzKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9sbWxpbmUgPSBuZXcgb2xnZW9tLk11bHRpTGluZVN0cmluZyhbXSk7XHJcbiAgICBsZXQgcHRzO1xyXG4gICAgY29uc3QgcHRzQXJyYXkgPSBbXTtcclxuICAgIGxldCBvbG1wb2x5ID0gbmV3IG9sZ2VvbS5NdWx0aVBvbHlnb24oW10pO1xyXG4gICAgbGV0IGZpcnN0RmVhdHVyZVR5cGU7XHJcbiAgICBjb25zdCBuYkZlYXR1cmVzID0gZmVhdHVyZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGdlb21ldHJ5IGludGVyc2VjdCBiYm94XHJcbiAgICAvLyBmb3IgZ2Vvc2VydmVyIGdldGZlYXR1cmVpbmZvIHJlc3BvbnNlIGluIGRhdGEgcHJvamVjdGlvbiwgbm90IGNhbGwgcHJvamVjdGlvblxyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zOiBhbnkgPSB0aGlzLmdldFF1ZXJ5UGFyYW1zKHVybC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGJib3hSYXcgPSBzZWFyY2hQYXJhbXMuYmJveDtcclxuICAgIGNvbnN0IGJib3ggPSBiYm94UmF3LnNwbGl0KCcsJyk7XHJcbiAgICBjb25zdCBiYm94RXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuICAgIG9sZXh0ZW50LmV4dGVuZChiYm94RXh0ZW50LCBiYm94KTtcclxuICAgIGNvbnN0IG91dEJib3hFeHRlbnQgPSBmYWxzZTtcclxuICAgIGZlYXR1cmVzLm1hcChmZWF0dXJlID0+IHtcclxuICAgICAgLyogIGlmICghZmVhdHVyZS5nZXRHZW9tZXRyeSgpLnNpbXBsaWZ5KDEwMCkuaW50ZXJzZWN0c0V4dGVudChiYm94RXh0ZW50KSkge1xyXG4gICAgICAgIG91dEJib3hFeHRlbnQgPSB0cnVlO1xyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRvIHByb2plY3QgdGhlIGdlb21ldHJ5P1xyXG4gICAgICB9Ki9cclxuICAgICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMgPSBmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5VHlwZSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCk7XHJcblxyXG4gICAgICBpZiAoIWZpcnN0RmVhdHVyZVR5cGUgJiYgIW91dEJib3hFeHRlbnQpIHtcclxuICAgICAgICBmaXJzdEZlYXR1cmVUeXBlID0gZmVhdHVyZUdlb21ldHJ5VHlwZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIW91dEJib3hFeHRlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGZlYXR1cmVHZW9tZXRyeVR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ1BvaW50JzpcclxuICAgICAgICAgICAgaWYgKG5iRmVhdHVyZXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICBwdHMgPSBuZXcgb2xnZW9tLlBvaW50KGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBwdHNBcnJheS5wdXNoKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgICAgICBvbG1saW5lLmFwcGVuZExpbmVTdHJpbmcoXHJcbiAgICAgICAgICAgICAgbmV3IG9sZ2VvbS5MaW5lU3RyaW5nKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgICAgICBvbG1wb2x5LmFwcGVuZFBvbHlnb24oXHJcbiAgICAgICAgICAgICAgbmV3IG9sZ2VvbS5Qb2x5Z29uKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ011bHRpUG9seWdvbic6XHJcbiAgICAgICAgICAgIG9sbXBvbHkgPSBuZXcgb2xnZW9tLk11bHRpUG9seWdvbihmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcywgJ1hZJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IG9sbXB0cztcclxuICAgIGlmIChwdHNBcnJheS5sZW5ndGggPT09IDAgJiYgcHRzKSB7XHJcbiAgICAgIG9sbXB0cyA9IHtcclxuICAgICAgICB0eXBlOiBwdHMuZ2V0VHlwZSgpLFxyXG4gICAgICAgIGNvb3JkaW5hdGVzOiBwdHMuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2xtcHRzID0ge1xyXG4gICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcclxuICAgICAgICBjb29yZGluYXRlczogW3RoaXMuY29udmV4SHVsbChwdHNBcnJheSldXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChmaXJzdEZlYXR1cmVUeXBlKSB7XHJcbiAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiBvbG1saW5lLmdldFR5cGUoKSxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBvbG1saW5lLmdldENvb3JkaW5hdGVzKClcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdQb2ludCc6XHJcbiAgICAgICAgcmV0dXJuIG9sbXB0cztcclxuICAgICAgY2FzZSAnUG9seWdvbic6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6IG9sbXBvbHkuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IG9sbXBvbHkuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgIGNhc2UgJ011bHRpUG9seWdvbic6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6IG9sbXBvbHkuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IG9sbXBvbHkuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3Jvc3MoYSwgYiwgbykge1xyXG4gICAgcmV0dXJuIChhWzBdIC0gb1swXSkgKiAoYlsxXSAtIG9bMV0pIC0gKGFbMV0gLSBvWzFdKSAqIChiWzBdIC0gb1swXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gcG9pbnRzIEFuIGFycmF5IG9mIFtYLCBZXSBjb29yZGluYXRlc1xyXG4gICAqIFRoaXMgbWV0aG9kIGlzIHVzZSBpbnN0ZWFkIG9mIHR1cmYuanMgY29udmV4SHVsbCBiZWNhdXNlIFR1cmYgbmVlZHMgYXQgbGVhc3QgMyBwb2ludCB0byBtYWtlIGEgaHVsbC5cclxuICAgKiBodHRwczovL2VuLndpa2lib29rcy5vcmcvd2lraS9BbGdvcml0aG1fSW1wbGVtZW50YXRpb24vR2VvbWV0cnkvQ29udmV4X2h1bGwvTW9ub3RvbmVfY2hhaW4jSmF2YVNjcmlwdFxyXG4gICAqL1xyXG4gIGNvbnZleEh1bGwocG9pbnRzKSB7XHJcbiAgICBwb2ludHMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICByZXR1cm4gYVswXSA9PT0gYlswXSA/IGFbMV0gLSBiWzFdIDogYVswXSAtIGJbMF07XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBsb3dlciA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBwb2ludHMpIHtcclxuICAgICAgd2hpbGUgKFxyXG4gICAgICAgIGxvd2VyLmxlbmd0aCA+PSAyICYmXHJcbiAgICAgICAgdGhpcy5jcm9zcyhsb3dlcltsb3dlci5sZW5ndGggLSAyXSwgbG93ZXJbbG93ZXIubGVuZ3RoIC0gMV0sIHBvaW50KSA8PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxvd2VyLnBvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGxvd2VyLnB1c2gocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwcGVyID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gcG9pbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIHdoaWxlIChcclxuICAgICAgICB1cHBlci5sZW5ndGggPj0gMiAmJlxyXG4gICAgICAgIHRoaXMuY3Jvc3MoXHJcbiAgICAgICAgICB1cHBlclt1cHBlci5sZW5ndGggLSAyXSxcclxuICAgICAgICAgIHVwcGVyW3VwcGVyLmxlbmd0aCAtIDFdLFxyXG4gICAgICAgICAgcG9pbnRzW2ldXHJcbiAgICAgICAgKSA8PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHVwcGVyLnBvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHVwcGVyLnB1c2gocG9pbnRzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICB1cHBlci5wb3AoKTtcclxuICAgIGxvd2VyLnBvcCgpO1xyXG4gICAgcmV0dXJuIGxvd2VyLmNvbmNhdCh1cHBlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3REYXRhKFxyXG4gICAgcmVzLFxyXG4gICAgbGF5ZXI6IExheWVyLFxyXG4gICAgb3B0aW9uczogUXVlcnlPcHRpb25zLFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBpbXBvc2VkR2VvbWV0cnk/XHJcbiAgKTogRmVhdHVyZVtdIHtcclxuICAgIGNvbnN0IHF1ZXJ5RGF0YVNvdXJjZSA9IGxheWVyLmRhdGFTb3VyY2UgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZTtcclxuXHJcbiAgICBjb25zdCBhbGxvd2VkRmllbGRzQW5kQWxpYXMgPSB0aGlzLmdldEFsbG93ZWRGaWVsZHNBbmRBbGlhcyhsYXllcik7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBbXTtcclxuICAgIHN3aXRjaCAocXVlcnlEYXRhU291cmNlLm9wdGlvbnMucXVlcnlGb3JtYXQpIHtcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwzOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R01MM0RhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBsYXllci56SW5kZXgsXHJcbiAgICAgICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkpTT046XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR0VPSlNPTjpcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HRU9KU09OMjpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdlb0pTT05EYXRhKHJlcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuRVNSSUpTT046XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RFc3JpSlNPTkRhdGEocmVzLCBsYXllci56SW5kZXgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LlRFWFQ6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RUZXh0RGF0YShyZXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUw6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RIdG1sRGF0YShcclxuICAgICAgICAgIHJlcyxcclxuICAgICAgICAgIHF1ZXJ5RGF0YVNvdXJjZS5xdWVyeUh0bWxUYXJnZXQsXHJcbiAgICAgICAgICB1cmxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0SHRtbERhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2UucXVlcnlIdG1sVGFyZ2V0LFxyXG4gICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgaW1wb3NlZEdlb21ldHJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwyOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R01MMkRhdGEocmVzLCBsYXllciwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID4gMCAmJiBmZWF0dXJlc1swXS5nZW9tZXRyeSA9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGdlb21Ub0FkZCA9IHRoaXMuY3JlYXRlR2VvbWV0cnlGcm9tVXJsQ2xpY2sodXJsKTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgZmVhdHVyZSBvZiBmZWF0dXJlcykge1xyXG4gICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkgPSBnZW9tVG9BZGQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1hcExhYmVsID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3F1ZXJ5RGF0YVNvdXJjZS5tYXBMYWJlbF07XHJcblxyXG4gICAgICBsZXQgZXhjbHVkZTtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAnd21zJykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBsYXllci5vcHRpb25zXHJcbiAgICAgICAgICAuc291cmNlT3B0aW9ucyBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICBleGNsdWRlID0gc291cmNlT3B0aW9ucyA/IHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHRpdGxlID0gdGhpcy5nZXRRdWVyeVRpdGxlKGZlYXR1cmUsIGxheWVyKTtcclxuICAgICAgaWYgKCF0aXRsZSAmJiBmZWF0dXJlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGl0bGUgPSBgJHtsYXllci50aXRsZX0gKCR7aW5kZXggKyAxfSlgO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0aXRsZSkge1xyXG4gICAgICAgIHRpdGxlID0gbGF5ZXIudGl0bGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCBmZWF0dXJlLm1ldGEgfHwge30sIHtcclxuICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIG1hcFRpdGxlOiBtYXBMYWJlbCxcclxuICAgICAgICBzb3VyY2VUaXRsZTogbGF5ZXIudGl0bGUsXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSBsYXllci56SW5kZXgsXHJcbiAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZTogZXhjbHVkZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZlYXR1cmUsIHtcclxuICAgICAgICBtZXRhLFxyXG4gICAgICAgIHByb2plY3Rpb246XHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnY2FydG8nXHJcbiAgICAgICAgICAgID8gJ0VQU0c6NDMyNidcclxuICAgICAgICAgICAgOiBvcHRpb25zLnByb2plY3Rpb25cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlR2VvbWV0cnlGcm9tVXJsQ2xpY2sodXJsKSB7XHJcbiAgICBjb25zdCBzZWFyY2hQYXJhbXM6IGFueSA9IHRoaXMuZ2V0UXVlcnlQYXJhbXModXJsLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgYmJveFJhdyA9IHNlYXJjaFBhcmFtcy5iYm94O1xyXG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUludChzZWFyY2hQYXJhbXMud2lkdGgsIDEwKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5oZWlnaHQsIDEwKTtcclxuICAgIGNvbnN0IHhQb3NpdGlvbiA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5pIHx8IHNlYXJjaFBhcmFtcy54LCAxMCk7XHJcbiAgICBjb25zdCB5UG9zaXRpb24gPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaiB8fCBzZWFyY2hQYXJhbXMueSwgMTApO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHNlYXJjaFBhcmFtcy5jcnMgfHwgc2VhcmNoUGFyYW1zLnNycyB8fCAnRVBTRzozODU3JztcclxuXHJcbiAgICBjb25zdCBiYm94ID0gYmJveFJhdy5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IHRocmVzaG9sZCA9XHJcbiAgICAgIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMF0pKSAtIE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFsyXSkpKSAqIDAuMDU7XHJcblxyXG4gICAgLy8gZm9yIGNvbnRleHQgaW4gZGVncmVlIChFUFNHOjQzMjYsNDI2OS4uLilcclxuICAgIGlmIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMF0pKSA8IDE4MCkge1xyXG4gICAgICB0aHJlc2hvbGQgPSAwLjA0NTtcclxuICAgIH1cclxuICAgIGNvbnN0IGNsaWNreCA9XHJcbiAgICAgIHBhcnNlRmxvYXQoYmJveFswXSkgK1xyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSAtIHBhcnNlRmxvYXQoYmJveFsyXSkpICogeFBvc2l0aW9uKSAvXHJcbiAgICAgICAgd2lkdGggLVxyXG4gICAgICB0aHJlc2hvbGQ7XHJcbiAgICBjb25zdCBjbGlja3kgPVxyXG4gICAgICBwYXJzZUZsb2F0KGJib3hbMV0pICtcclxuICAgICAgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFsxXSkgLSBwYXJzZUZsb2F0KGJib3hbM10pKSAqIHlQb3NpdGlvbikgL1xyXG4gICAgICAgIGhlaWdodCAtXHJcbiAgICAgIHRocmVzaG9sZDtcclxuICAgIGNvbnN0IGNsaWNreDEgPSBjbGlja3ggKyB0aHJlc2hvbGQgKiAyO1xyXG4gICAgY29uc3QgY2xpY2t5MSA9IGNsaWNreSArIHRocmVzaG9sZCAqIDI7XHJcblxyXG4gICAgY29uc3Qgd2t0UG9seSA9XHJcbiAgICAgICdQT0xZR09OKCgnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreTEgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4MSArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreTEgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4MSArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnKSknO1xyXG5cclxuICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5XS1QoKTtcclxuICAgIGNvbnN0IHRlblBlcmNlbnRXaWR0aEdlb20gPSBmb3JtYXQucmVhZEZlYXR1cmUod2t0UG9seSk7XHJcbiAgICBjb25zdCBmID0gdGVuUGVyY2VudFdpZHRoR2VvbS5nZXRHZW9tZXRyeSgpIGFzIGFueTtcclxuXHJcbiAgICBjb25zdCBuZXdHZW9tID0ge1xyXG4gICAgICB0eXBlOiBmLmdldFR5cGUoKSxcclxuICAgICAgY29vcmRpbmF0ZXM6IGYuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3R2VvbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEdNTDJEYXRhKHJlcywgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXM/KSB7XHJcbiAgICBsZXQgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMigpO1xyXG4gICAgbGV0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgLy8gSGFuZGxlIG5vbiBzdGFuZGFyZCBHTUwgb3V0cHV0IChNYXBTZXJ2ZXIpXHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHBhcnNlciA9IG5ldyBvbGZvcm1hdC5XTVNHZXRGZWF0dXJlSW5mbygpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgJ3F1ZXJ5LnNlcnZpY2U6IE11bHRpcG9seWdvbnMgYXJlIGJhZGx5IG1hbmFnZWQgaW4gbWFwc2VydmVyIGluIEdNTDIuIFVzZSBhbm90aGVyIGZvcm1hdC4nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHTUwzRGF0YShyZXMsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzPykge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMygpO1xyXG4gICAgbGV0IGZlYXR1cmVzID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdxdWVyeS5zZXJ2aWNlOiBHTUwzIGlzIG5vdCB3ZWxsIHN1cHBvcnRlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcChmZWF0dXJlID0+XHJcbiAgICAgIHRoaXMuZmVhdHVyZVRvUmVzdWx0KGZlYXR1cmUsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEdlb0pTT05EYXRhKHJlcykge1xyXG4gICAgbGV0IGZlYXR1cmVzID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICBmZWF0dXJlcyA9IEpTT04ucGFyc2UocmVzKS5mZWF0dXJlcztcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdxdWVyeS5zZXJ2aWNlOiBVbmFibGUgdG8gcGFyc2UgZ2VvanNvbicsICdcXG4nLCByZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RXNyaUpTT05EYXRhKHJlcywgekluZGV4KSB7XHJcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRFc3JpSlNPTigpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcChmZWF0dXJlID0+IHRoaXMuZmVhdHVyZVRvUmVzdWx0KGZlYXR1cmUsIHpJbmRleCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0VGV4dERhdGEocmVzKSB7XHJcbiAgICAvLyBUT0RPXHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RIdG1sRGF0YShcclxuICAgIHJlcyxcclxuICAgIGh0bWxUYXJnZXQ6IFF1ZXJ5SHRtbFRhcmdldCxcclxuICAgIHVybCxcclxuICAgIGltcG9zZWRHZW9tZXRyeT9cclxuICApIHtcclxuICAgIGNvbnN0IHNlYXJjaFBhcmFtczogYW55ID0gdGhpcy5nZXRRdWVyeVBhcmFtcyh1cmwudG9Mb3dlckNhc2UoKSk7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gc2VhcmNoUGFyYW1zLmNycyB8fCBzZWFyY2hQYXJhbXMuc3JzIHx8ICdFUFNHOjM4NTcnO1xyXG4gICAgY29uc3QgZ2VvbVRvQWRkID0gdGhpcy5jcmVhdGVHZW9tZXRyeUZyb21VcmxDbGljayh1cmwpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgaHRtbFRhcmdldCAhPT0gUXVlcnlIdG1sVGFyZ2V0LkJMQU5LICYmXHJcbiAgICAgIGh0bWxUYXJnZXQgIT09IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUVcclxuICAgICkge1xyXG4gICAgICBodG1sVGFyZ2V0ID0gUXVlcnlIdG1sVGFyZ2V0LklGUkFNRTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib2R5VGFnU3RhcnQgPSByZXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKCc8Ym9keT4nKTtcclxuICAgIGNvbnN0IGJvZHlUYWdFbmQgPSByZXMudG9Mb3dlckNhc2UoKS5sYXN0SW5kZXhPZignPC9ib2R5PicpICsgNztcclxuICAgIC8vIHJlcGxhY2UgXFxyIFxcbiAgYW5kICcgJyB3aXRoICcnIHRvIHZhbGlkYXRlIGlmIHRoZSBib2R5IGlzIHJlYWxseSBlbXB0eS5cclxuICAgIGNvbnN0IGJvZHkgPSByZXMuc2xpY2UoYm9keVRhZ1N0YXJ0LCBib2R5VGFnRW5kKS5yZXBsYWNlKC8oXFxyfFxcbnxcXHMpL2csICcnKTtcclxuICAgIGlmIChib2R5ID09PSAnPGJvZHk+PC9ib2R5PicgfHwgcmVzID09PSAnJykge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbixcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7IHRhcmdldDogaHRtbFRhcmdldCwgYm9keTogcmVzLCB1cmwgfSxcclxuICAgICAgICBnZW9tZXRyeTogaW1wb3NlZEdlb21ldHJ5IHx8IGdlb21Ub0FkZFxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gdXJsLnNwbGl0KCc/Jyk7XHJcbiAgICBpZiAoIXF1ZXJ5U3RyaW5nWzFdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhaXJzID0gcXVlcnlTdHJpbmdbMV0uc3BsaXQoJyYnKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgIHBhaXJzLmZvckVhY2gocGFpciA9PiB7XHJcbiAgICAgIHBhaXIgPSBwYWlyLnNwbGl0KCc9Jyk7XHJcbiAgICAgIHJlc3VsdFtwYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdIHx8ICcnKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmZWF0dXJlVG9SZXN1bHQoXHJcbiAgICBmZWF0dXJlT0w6IG9sRmVhdHVyZSxcclxuICAgIHpJbmRleDogbnVtYmVyLFxyXG4gICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzP1xyXG4gICk6IEZlYXR1cmUge1xyXG4gICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5ID0gZmVhdHVyZU9MLmdldEdlb21ldHJ5KCkgYXMgYW55O1xyXG4gICAgY29uc3QgcHJvcGVydGllczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZU9MLmdldFByb3BlcnRpZXMoKSk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5nZW9tZXRyeTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmJvdW5kZWRCeTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLnNoYXBlO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuU0hBUEU7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy50aGVfZ2VvbTtcclxuXHJcbiAgICBsZXQgZ2VvbWV0cnk7XHJcbiAgICBpZiAoZmVhdHVyZUdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZ2VvbWV0cnkgPSB7XHJcbiAgICAgICAgdHlwZTogZmVhdHVyZUdlb21ldHJ5LmdldFR5cGUoKSxcclxuICAgICAgICBjb29yZGluYXRlczogZmVhdHVyZUdlb21ldHJ5LmdldENvb3JkaW5hdGVzKClcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICBwcm9qZWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgIGdlb21ldHJ5LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICBvcmRlcjogMTAwMCAtIHpJbmRleCxcclxuICAgICAgICBhbGlhczogYWxsb3dlZEZpZWxkc0FuZEFsaWFzXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXJ5VXJsKFxyXG4gICAgZGF0YXNvdXJjZTogUXVlcnlhYmxlRGF0YVNvdXJjZSxcclxuICAgIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyxcclxuICAgIGZvcmNlR01MMiA9IGZhbHNlXHJcbiAgKTogc3RyaW5nIHtcclxuICAgIGxldCB1cmw7XHJcbiAgICBzd2l0Y2ggKGRhdGFzb3VyY2UuY29uc3RydWN0b3IpIHtcclxuICAgICAgY2FzZSBXTVNEYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IHdtc0RhdGFzb3VyY2UgPSBkYXRhc291cmNlIGFzIFdNU0RhdGFTb3VyY2U7XHJcblxyXG4gICAgICAgIGNvbnN0IFdNU0dldEZlYXR1cmVJbmZvT3B0aW9ucyA9IHtcclxuICAgICAgICAgIElORk9fRk9STUFUOlxyXG4gICAgICAgICAgICB3bXNEYXRhc291cmNlLnBhcmFtcy5JTkZPX0ZPUk1BVCB8fFxyXG4gICAgICAgICAgICB0aGlzLmdldE1pbWVJbmZvRm9ybWF0KGRhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeUZvcm1hdCksXHJcbiAgICAgICAgICBRVUVSWV9MQVlFUlM6IHdtc0RhdGFzb3VyY2UucGFyYW1zLkxBWUVSUyxcclxuICAgICAgICAgIEZFQVRVUkVfQ09VTlQ6IHdtc0RhdGFzb3VyY2UucGFyYW1zLkZFQVRVUkVfQ09VTlQgfHwgJzUnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZvcmNlR01MMikge1xyXG4gICAgICAgICAgV01TR2V0RmVhdHVyZUluZm9PcHRpb25zLklORk9fRk9STUFUID0gdGhpcy5nZXRNaW1lSW5mb0Zvcm1hdChcclxuICAgICAgICAgICAgUXVlcnlGb3JtYXQuR01MMlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVybCA9IHdtc0RhdGFzb3VyY2Uub2wuZ2V0R2V0RmVhdHVyZUluZm9VcmwoXHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzLFxyXG4gICAgICAgICAgb3B0aW9ucy5yZXNvbHV0aW9uLFxyXG4gICAgICAgICAgb3B0aW9ucy5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgV01TR2V0RmVhdHVyZUluZm9PcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBjb25zdCB3bXNWZXJzaW9uID1cclxuICAgICAgICAvLyAgIHdtc0RhdGFzb3VyY2UucGFyYW1zLlZFUlNJT04gfHxcclxuICAgICAgICAvLyAgIHdtc0RhdGFzb3VyY2UucGFyYW1zLnZlcnNpb24gfHxcclxuICAgICAgICAvLyAgICcxLjMuMCc7XHJcbiAgICAgICAgLy8gaWYgKHdtc1ZlcnNpb24gIT09ICcxLjMuMCcpIHtcclxuICAgICAgICAvLyAgIHVybCA9IHVybC5yZXBsYWNlKCcmST0nLCAnJlg9Jyk7XHJcbiAgICAgICAgLy8gICB1cmwgPSB1cmwucmVwbGFjZSgnJko9JywgJyZZPScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDYXJ0b0RhdGFTb3VyY2U6XHJcbiAgICAgICAgY29uc3QgY2FydG9EYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBDYXJ0b0RhdGFTb3VyY2U7XHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9XHJcbiAgICAgICAgICAnaHR0cHM6Ly8nICtcclxuICAgICAgICAgIGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLmFjY291bnQgK1xyXG4gICAgICAgICAgJy5jYXJ0by5jb20vYXBpL3YyL3NxbD8nO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdCA9ICdmb3JtYXQ9R2VvSlNPTic7XHJcbiAgICAgICAgY29uc3Qgc3FsID1cclxuICAgICAgICAgICcmcT0nICsgY2FydG9EYXRhc291cmNlLm9wdGlvbnMuY29uZmlnLmxheWVyc1swXS5vcHRpb25zLnNxbDtcclxuICAgICAgICBjb25zdCBjbGF1c2UgPVxyXG4gICAgICAgICAgJyBXSEVSRSBTVF9JbnRlcnNlY3RzKHRoZV9nZW9tX3dlYm1lcmNhdG9yLFNUX0JVRkZFUihTVF9TZXRTUklEKFNUX1BPSU5UKCc7XHJcbiAgICAgICAgY29uc3QgbWV0ZXJzID0gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgID8gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgIDogJzEwMDAnO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID1cclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMF0gK1xyXG4gICAgICAgICAgJywnICtcclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMV0gK1xyXG4gICAgICAgICAgJyksMzg1NyksJyArXHJcbiAgICAgICAgICBtZXRlcnMgK1xyXG4gICAgICAgICAgJykpJztcclxuXHJcbiAgICAgICAgdXJsID0gYCR7YmFzZVVybH0ke2Zvcm1hdH0ke3NxbH0ke2NsYXVzZX0ke2Nvb3JkaW5hdGVzfWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlO1xyXG4gICAgICAgIGxldCBleHRlbnQgPSBvbGV4dGVudC5ib3VuZGluZ0V4dGVudChbb3B0aW9ucy5jb29yZGluYXRlc10pO1xyXG4gICAgICAgIGlmICh0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvbikge1xyXG4gICAgICAgICAgZXh0ZW50ID0gb2xleHRlbnQuYnVmZmVyKFxyXG4gICAgICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID1cclxuICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnVybCArXHJcbiAgICAgICAgICAnLycgK1xyXG4gICAgICAgICAgdGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMubGF5ZXIgK1xyXG4gICAgICAgICAgJy9xdWVyeS8nO1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgJ3tcInhtaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzBdICtcclxuICAgICAgICAgICAgJyxcInltaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzFdICtcclxuICAgICAgICAgICAgJyxcInhtYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzJdICtcclxuICAgICAgICAgICAgJyxcInltYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzNdICtcclxuICAgICAgICAgICAgJyxcInNwYXRpYWxSZWZlcmVuY2VcIjp7XCJ3a2lkXCI6MTAyMTAwfX0nXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAnZj1qc29uJyxcclxuICAgICAgICAgIGBnZW9tZXRyeT0ke2dlb21ldHJ5fWAsXHJcbiAgICAgICAgICAnZ2VvbWV0cnlUeXBlPWVzcmlHZW9tZXRyeUVudmVsb3BlJyxcclxuICAgICAgICAgICdpblNSPTEwMjEwMCcsXHJcbiAgICAgICAgICAnc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnLFxyXG4gICAgICAgICAgJ291dEZpZWxkcz0qJyxcclxuICAgICAgICAgICdyZXR1cm5HZW9tZXRyeT10cnVlJyxcclxuICAgICAgICAgICdvdXRTUj0xMDIxMDAnXHJcbiAgICAgICAgXTtcclxuICAgICAgICB1cmwgPSBgJHtzZXJ2aWNlVXJsfT8ke3BhcmFtcy5qb2luKCcmJyl9YDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNaW1lSW5mb0Zvcm1hdChxdWVyeUZvcm1hdDogc3RyaW5nKSB7XHJcbiAgICBsZXQgbWltZSA9ICdhcHBsaWNhdGlvbi92bmQub2djLmdtbCc7XHJcbiAgICBjb25zdCBrZXlFbnVtID0gT2JqZWN0LmtleXMoUXVlcnlGb3JtYXQpLmZpbmQoXHJcbiAgICAgIGtleSA9PiBRdWVyeUZvcm1hdFtrZXldID09PSBxdWVyeUZvcm1hdFxyXG4gICAgKTtcclxuICAgIGlmIChrZXlFbnVtKSB7XHJcbiAgICAgIG1pbWUgPSBRdWVyeUZvcm1hdE1pbWVUeXBlW2tleUVudW1dO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtaW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsb3dlZEZpZWxkc0FuZEFsaWFzKGxheWVyOiBhbnkpIHtcclxuICAgIGxldCBhbGxvd2VkRmllbGRzQW5kQWxpYXM7XHJcbiAgICBpZiAoXHJcbiAgICAgIGxheWVyLm9wdGlvbnMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2UgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucyAmJlxyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcyAmJlxyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPj0gMVxyXG4gICAgKSB7XHJcbiAgICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhcyA9IHt9O1xyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZS5vcHRpb25zLnNvdXJjZUZpZWxkcy5mb3JFYWNoKHNvdXJjZUZpZWxkID0+IHtcclxuICAgICAgICBjb25zdCBhbGlhcyA9IHNvdXJjZUZpZWxkLmFsaWFzID8gc291cmNlRmllbGQuYWxpYXMgOiBzb3VyY2VGaWVsZC5uYW1lO1xyXG4gICAgICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhc1tzb3VyY2VGaWVsZC5uYW1lXSA9IGFsaWFzO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhbGxvd2VkRmllbGRzQW5kQWxpYXM7XHJcbiAgfVxyXG5cclxuICBnZXRRdWVyeVRpdGxlKGZlYXR1cmU6IEZlYXR1cmUsIGxheWVyOiBMYXllcik6IHN0cmluZyB7XHJcbiAgICBsZXQgdGl0bGU7XHJcbiAgICBpZiAobGF5ZXIub3B0aW9ucyAmJiBsYXllci5vcHRpb25zLnNvdXJjZSAmJiBsYXllci5vcHRpb25zLnNvdXJjZS5vcHRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VPcHRpb25zID0gbGF5ZXIub3B0aW9ucy5zb3VyY2VcclxuICAgICAgICAub3B0aW9ucyBhcyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgaWYgKGRhdGFTb3VyY2VPcHRpb25zLnF1ZXJ5VGl0bGUpIHtcclxuICAgICAgICB0aXRsZSA9IHRoaXMuZ2V0TGFiZWxNYXRjaChmZWF0dXJlLCBkYXRhU291cmNlT3B0aW9ucy5xdWVyeVRpdGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aXRsZTtcclxuICB9XHJcblxyXG4gIGdldExhYmVsTWF0Y2goZmVhdHVyZTogRmVhdHVyZSwgbGFiZWxNYXRjaCk6IHN0cmluZyB7XHJcbiAgICBsZXQgbGFiZWwgPSBsYWJlbE1hdGNoO1xyXG4gICAgY29uc3QgbGFiZWxUb0dldCA9IEFycmF5LmZyb20obGFiZWxNYXRjaC5tYXRjaEFsbCgvXFwkXFx7KFteXFx7XFx9XSspXFx9L2cpKTtcclxuXHJcbiAgICBsYWJlbFRvR2V0LmZvckVhY2godiA9PiB7XHJcbiAgICAgIGxhYmVsID0gbGFiZWwucmVwbGFjZSh2WzBdLCBmZWF0dXJlLnByb3BlcnRpZXNbdlsxXV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTm90aGluZyBkb25lPyBjaGVjayBmZWF0dXJlJ3MgYXR0cmlidXRlXHJcbiAgICBpZiAobGFiZWxUb0dldC5sZW5ndGggPT09IDAgJiYgbGFiZWwgPT09IGxhYmVsTWF0Y2gpIHtcclxuICAgICAgbGFiZWwgPSBmZWF0dXJlLnByb3BlcnRpZXNbbGFiZWxNYXRjaF0gfHwgbGFiZWxNYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbiAgfVxyXG59XHJcbiJdfQ==