/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var QueryService = /** @class */ (function () {
    function QueryService(http) {
        this.http = http;
        this.queryEnabled = true;
    }
    /**
     * @param {?} layers
     * @param {?} options
     * @return {?}
     */
    QueryService.prototype.query = /**
     * @param {?} layers
     * @param {?} options
     * @return {?}
     */
    function (layers, options) {
        var _this = this;
        return layers
            .filter((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.visible && layer.isInResolutionsRange; }))
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.queryLayer(layer, options); }));
    };
    /**
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    QueryService.prototype.queryLayer = /**
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    function (layer, options) {
        var _this = this;
        /** @type {?} */
        var url = this.getQueryUrl(layer.dataSource, options);
        if (!url) {
            return of([]);
        }
        if (((/** @type {?} */ (layer.dataSource))).options.queryFormat ===
            QueryFormat.HTMLGML2) {
            /** @type {?} */
            var urlGml = this.getQueryUrl(layer.dataSource, options, true);
            return this.http.get(urlGml, { responseType: 'text' }).pipe(mergeMap((/**
             * @param {?} gmlRes
             * @return {?}
             */
            function (gmlRes) {
                /** @type {?} */
                var imposedGeom = _this.mergeGML(gmlRes, url);
                return _this.http
                    .get(url, { responseType: 'text' })
                    .pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    return _this.extractData(res, layer, options, url, imposedGeom);
                })));
            })));
        }
        /** @type {?} */
        var request = this.http.get(url, { responseType: 'text' });
        return request.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.extractData(res, layer, options, url); })));
    };
    /**
     * @private
     * @param {?} gmlRes
     * @param {?} url
     * @return {?}
     */
    QueryService.prototype.mergeGML = /**
     * @private
     * @param {?} gmlRes
     * @param {?} url
     * @return {?}
     */
    function (gmlRes, url) {
        /** @type {?} */
        var parser = new olFormatGML2();
        /** @type {?} */
        var features = parser.readFeatures(gmlRes);
        // Handle non standard GML output (MapServer)
        if (features.length === 0) {
            parser = new olformat.WMSGetFeatureInfo();
            features = parser.readFeatures(gmlRes);
        }
        /** @type {?} */
        var olmline = new olgeom.MultiLineString([]);
        /** @type {?} */
        var pts;
        /** @type {?} */
        var ptsArray = [];
        /** @type {?} */
        var olmpoly = new olgeom.MultiPolygon([]);
        /** @type {?} */
        var firstFeatureType;
        /** @type {?} */
        var nbFeatures = features.length;
        // Check if geometry intersect bbox
        // for geoserver getfeatureinfo response in data projection, not call projection
        /** @type {?} */
        var searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        var bboxRaw = searchParams.bbox;
        /** @type {?} */
        var bbox = bboxRaw.split(',');
        /** @type {?} */
        var bboxExtent = olextent.createEmpty();
        olextent.extend(bboxExtent, bbox);
        /** @type {?} */
        var outBboxExtent = false;
        features.map((/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            /*  if (!feature.getGeometry().simplify(100).intersectsExtent(bboxExtent)) {
                    outBboxExtent = true;
                    // TODO: Check to project the geometry?
                  }*/
            /** @type {?} */
            var featureGeometryCoordinates = feature.getGeometry().getCoordinates();
            /** @type {?} */
            var featureGeometryType = feature.getGeometry().getType();
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
        var olmpts;
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
    };
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} o
     * @return {?}
     */
    QueryService.prototype.cross = /**
     * @param {?} a
     * @param {?} b
     * @param {?} o
     * @return {?}
     */
    function (a, b, o) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    };
    /**
     * @param points An array of [X, Y] coordinates
     * This method is use instead of turf.js convexHull because Turf needs at least 3 point to make a hull.
     * https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
     */
    /**
     * @param {?} points An array of [X, Y] coordinates
     * This method is use instead of turf.js convexHull because Turf needs at least 3 point to make a hull.
     * https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
     * @return {?}
     */
    QueryService.prototype.convexHull = /**
     * @param {?} points An array of [X, Y] coordinates
     * This method is use instead of turf.js convexHull because Turf needs at least 3 point to make a hull.
     * https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
     * @return {?}
     */
    function (points) {
        var e_1, _a;
        points.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
        }));
        /** @type {?} */
        var lower = [];
        try {
            for (var points_1 = tslib_1.__values(points), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
                var point = points_1_1.value;
                while (lower.length >= 2 &&
                    this.cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
                    lower.pop();
                }
                lower.push(point);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (points_1_1 && !points_1_1.done && (_a = points_1.return)) _a.call(points_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /** @type {?} */
        var upper = [];
        for (var i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 &&
                this.cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }
        upper.pop();
        lower.pop();
        return lower.concat(upper);
    };
    /**
     * @private
     * @param {?} res
     * @param {?} layer
     * @param {?} options
     * @param {?} url
     * @param {?=} imposedGeometry
     * @return {?}
     */
    QueryService.prototype.extractData = /**
     * @private
     * @param {?} res
     * @param {?} layer
     * @param {?} options
     * @param {?} url
     * @param {?=} imposedGeometry
     * @return {?}
     */
    function (res, layer, options, url, imposedGeometry) {
        var _this = this;
        /** @type {?} */
        var queryDataSource = (/** @type {?} */ (layer.dataSource));
        /** @type {?} */
        var allowedFieldsAndAlias = this.getAllowedFieldsAndAlias(layer);
        /** @type {?} */
        var features = [];
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
        function (feature, index) {
            /** @type {?} */
            var mapLabel = feature.properties[queryDataSource.mapLabel];
            /** @type {?} */
            var exclude;
            if (layer.options.sourceOptions.type === 'wms') {
                /** @type {?} */
                var sourceOptions = (/** @type {?} */ (layer.options
                    .sourceOptions));
                exclude = sourceOptions ? sourceOptions.excludeAttribute : undefined;
            }
            /** @type {?} */
            var title = _this.getQueryTitle(feature, layer);
            if (!title && features.length > 1) {
                title = layer.title + " (" + (index + 1) + ")";
            }
            else if (!title) {
                title = layer.title;
            }
            /** @type {?} */
            var meta = Object.assign({}, feature.meta || {}, {
                id: uuid(),
                title: title,
                mapTitle: mapLabel,
                sourceTitle: layer.title,
                order: 1000 - layer.zIndex,
                excludeAttribute: exclude
            });
            return Object.assign(feature, {
                meta: meta,
                projection: queryDataSource.options.type === 'carto'
                    ? 'EPSG:4326'
                    : options.projection
            });
        }));
    };
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    QueryService.prototype.extractGML2Data = /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    function (res, zIndex, allowedFieldsAndAlias) {
        var _this = this;
        /** @type {?} */
        var parser = new olFormatGML2();
        /** @type {?} */
        var features = parser.readFeatures(res);
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
        function (feature) {
            return _this.featureToResult(feature, zIndex, allowedFieldsAndAlias);
        }));
    };
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    QueryService.prototype.extractGML3Data = /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    function (res, zIndex, allowedFieldsAndAlias) {
        var _this = this;
        /** @type {?} */
        var parser = new olFormatGML3();
        /** @type {?} */
        var features = parser.readFeatures(res);
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            return _this.featureToResult(feature, zIndex, allowedFieldsAndAlias);
        }));
    };
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    QueryService.prototype.extractGeoJSONData = /**
     * @private
     * @param {?} res
     * @return {?}
     */
    function (res) {
        /** @type {?} */
        var features = [];
        try {
            features = JSON.parse(res).features;
        }
        catch (e) {
            console.warn('query.service: Unable to parse geojson', '\n', res);
        }
        return features;
    };
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @return {?}
     */
    QueryService.prototype.extractEsriJSONData = /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @return {?}
     */
    function (res, zIndex) {
        var _this = this;
        /** @type {?} */
        var parser = new olFormatEsriJSON();
        /** @type {?} */
        var features = parser.readFeatures(res);
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) { return _this.featureToResult(feature, zIndex); }));
    };
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    QueryService.prototype.extractTextData = /**
     * @private
     * @param {?} res
     * @return {?}
     */
    function (res) {
        // TODO
        return [];
    };
    /**
     * @private
     * @param {?} res
     * @param {?} htmlTarget
     * @param {?} url
     * @param {?=} imposedGeometry
     * @return {?}
     */
    QueryService.prototype.extractHtmlData = /**
     * @private
     * @param {?} res
     * @param {?} htmlTarget
     * @param {?} url
     * @param {?=} imposedGeometry
     * @return {?}
     */
    function (res, htmlTarget, url, imposedGeometry) {
        // _blank , iframe or undefined
        /** @type {?} */
        var searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        var bboxRaw = searchParams.bbox;
        /** @type {?} */
        var width = parseInt(searchParams.width, 10);
        /** @type {?} */
        var height = parseInt(searchParams.height, 10);
        /** @type {?} */
        var xPosition = parseInt(searchParams.i || searchParams.x, 10);
        /** @type {?} */
        var yPosition = parseInt(searchParams.j || searchParams.y, 10);
        /** @type {?} */
        var projection = searchParams.crs || searchParams.srs || 'EPSG:3857';
        /** @type {?} */
        var bbox = bboxRaw.split(',');
        /** @type {?} */
        var threshold = (Math.abs(parseFloat(bbox[0])) - Math.abs(parseFloat(bbox[2]))) * 0.05;
        // for context in degree (EPSG:4326,4269...)
        if (Math.abs(parseFloat(bbox[0])) < 180) {
            threshold = 0.045;
        }
        /** @type {?} */
        var clickx = parseFloat(bbox[0]) +
            (Math.abs(parseFloat(bbox[0]) - parseFloat(bbox[2])) * xPosition) /
                width -
            threshold;
        /** @type {?} */
        var clicky = parseFloat(bbox[1]) +
            (Math.abs(parseFloat(bbox[1]) - parseFloat(bbox[3])) * yPosition) /
                height -
            threshold;
        /** @type {?} */
        var clickx1 = clickx + threshold * 2;
        /** @type {?} */
        var clicky1 = clicky + threshold * 2;
        /** @type {?} */
        var wktPoly = 'POLYGON((' +
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
        var format = new olformat.WKT();
        /** @type {?} */
        var tenPercentWidthGeom = format.readFeature(wktPoly);
        /** @type {?} */
        var f = (/** @type {?} */ (tenPercentWidthGeom.getGeometry()));
        if (htmlTarget !== QueryHtmlTarget.BLANK &&
            htmlTarget !== QueryHtmlTarget.IFRAME) {
            htmlTarget = QueryHtmlTarget.IFRAME;
        }
        /** @type {?} */
        var bodyTagStart = res.toLowerCase().indexOf('<body>');
        /** @type {?} */
        var bodyTagEnd = res.toLowerCase().lastIndexOf('</body>') + 7;
        // replace \r \n  and ' ' with '' to validate if the body is really empty.
        /** @type {?} */
        var body = res.slice(bodyTagStart, bodyTagEnd).replace(/(\r|\n|\s)/g, '');
        if (body === '<body></body>' || res === '') {
            return [];
        }
        return [
            {
                type: FEATURE,
                projection: projection,
                properties: { target: htmlTarget, body: res, url: url },
                geometry: imposedGeometry || {
                    type: f.getType(),
                    coordinates: f.getCoordinates()
                }
            }
        ];
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    QueryService.prototype.getQueryParams = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var queryString = url.split('?');
        if (!queryString[1]) {
            return;
        }
        /** @type {?} */
        var pairs = queryString[1].split('&');
        /** @type {?} */
        var result = {};
        pairs.forEach((/**
         * @param {?} pair
         * @return {?}
         */
        function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        }));
        return result;
    };
    /**
     * @param {?} featureOL
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    QueryService.prototype.featureToResult = /**
     * @param {?} featureOL
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    function (featureOL, zIndex, allowedFieldsAndAlias) {
        /** @type {?} */
        var featureGeometry = (/** @type {?} */ (featureOL.getGeometry()));
        /** @type {?} */
        var properties = Object.assign({}, featureOL.getProperties());
        delete properties.geometry;
        delete properties.boundedBy;
        delete properties.shape;
        delete properties.SHAPE;
        delete properties.the_geom;
        /** @type {?} */
        var geometry;
        if (featureGeometry !== undefined) {
            geometry = {
                type: featureGeometry.getType(),
                coordinates: featureGeometry.getCoordinates()
            };
        }
        return {
            type: FEATURE,
            projection: undefined,
            properties: properties,
            geometry: geometry,
            meta: {
                id: uuid(),
                order: 1000 - zIndex,
                alias: allowedFieldsAndAlias
            }
        };
    };
    /**
     * @private
     * @param {?} datasource
     * @param {?} options
     * @param {?=} forceGML2
     * @return {?}
     */
    QueryService.prototype.getQueryUrl = /**
     * @private
     * @param {?} datasource
     * @param {?} options
     * @param {?=} forceGML2
     * @return {?}
     */
    function (datasource, options, forceGML2) {
        if (forceGML2 === void 0) { forceGML2 = false; }
        /** @type {?} */
        var url;
        switch (datasource.constructor) {
            case WMSDataSource:
                /** @type {?} */
                var wmsDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                var WMSGetFeatureInfoOptions = {
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
                var cartoDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                var baseUrl = 'https://' +
                    cartoDatasource.options.account +
                    '.carto.com/api/v2/sql?';
                /** @type {?} */
                var format = 'format=GeoJSON';
                /** @type {?} */
                var sql = '&q=' + cartoDatasource.options.config.layers[0].options.sql;
                /** @type {?} */
                var clause = ' WHERE ST_Intersects(the_geom_webmercator,ST_BUFFER(ST_SetSRID(ST_POINT(';
                /** @type {?} */
                var meters = cartoDatasource.options.queryPrecision
                    ? cartoDatasource.options.queryPrecision
                    : '1000';
                /** @type {?} */
                var coordinates = options.coordinates[0] +
                    ',' +
                    options.coordinates[1] +
                    '),3857),' +
                    meters +
                    '))';
                url = "" + baseUrl + format + sql + clause + coordinates;
                break;
            case TileArcGISRestDataSource:
                /** @type {?} */
                var tileArcGISRestDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                var extent = olextent.boundingExtent([options.coordinates]);
                if (tileArcGISRestDatasource.options.queryPrecision) {
                    extent = olextent.buffer(extent, tileArcGISRestDatasource.options.queryPrecision);
                }
                /** @type {?} */
                var serviceUrl = tileArcGISRestDatasource.options.url +
                    '/' +
                    tileArcGISRestDatasource.options.layer +
                    '/query/';
                /** @type {?} */
                var geometry = encodeURIComponent('{"xmin":' +
                    extent[0] +
                    ',"ymin":' +
                    extent[1] +
                    ',"xmax":' +
                    extent[2] +
                    ',"ymax":' +
                    extent[3] +
                    ',"spatialReference":{"wkid":102100}}');
                /** @type {?} */
                var params = [
                    'f=json',
                    "geometry=" + geometry,
                    'geometryType=esriGeometryEnvelope',
                    'inSR=102100',
                    'spatialRel=esriSpatialRelIntersects',
                    'outFields=*',
                    'returnGeometry=true',
                    'outSR=102100'
                ];
                url = serviceUrl + "?" + params.join('&');
                break;
            default:
                break;
        }
        return url;
    };
    /**
     * @private
     * @param {?} queryFormat
     * @return {?}
     */
    QueryService.prototype.getMimeInfoFormat = /**
     * @private
     * @param {?} queryFormat
     * @return {?}
     */
    function (queryFormat) {
        /** @type {?} */
        var mime;
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
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    QueryService.prototype.getAllowedFieldsAndAlias = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var allowedFieldsAndAlias;
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
            function (sourceField) {
                /** @type {?} */
                var alias = sourceField.alias ? sourceField.alias : sourceField.name;
                allowedFieldsAndAlias[sourceField.name] = alias;
            }));
        }
        return allowedFieldsAndAlias;
    };
    /**
     * @param {?} feature
     * @param {?} layer
     * @return {?}
     */
    QueryService.prototype.getQueryTitle = /**
     * @param {?} feature
     * @param {?} layer
     * @return {?}
     */
    function (feature, layer) {
        /** @type {?} */
        var title;
        if (layer.options && layer.options.source && layer.options.source.options) {
            /** @type {?} */
            var dataSourceOptions = (/** @type {?} */ (layer.options.source
                .options));
            if (dataSourceOptions.queryTitle) {
                title = this.getLabelMatch(feature, dataSourceOptions.queryTitle);
            }
        }
        return title;
    };
    /**
     * @param {?} feature
     * @param {?} labelMatch
     * @return {?}
     */
    QueryService.prototype.getLabelMatch = /**
     * @param {?} feature
     * @param {?} labelMatch
     * @return {?}
     */
    function (feature, labelMatch) {
        /** @type {?} */
        var label = labelMatch;
        /** @type {?} */
        var labelToGet = Array.from(labelMatch.matchAll(/\$\{([^\{\}]+)\}/g));
        labelToGet.forEach((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            label = label.replace(v[0], feature.properties[v[1]]);
        }));
        // Nothing done? check feature's attribute
        if (labelToGet.length === 0 && label === labelMatch) {
            label = feature.properties[labelMatch] || labelMatch;
        }
        return label;
    };
    QueryService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    QueryService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ QueryService.ngInjectableDef = i0.defineInjectable({ factory: function QueryService_Factory() { return new QueryService(i0.inject(i1.HttpClient)); }, token: QueryService, providedIn: "root" });
    return QueryService;
}());
export { QueryService };
if (false) {
    /** @type {?} */
    QueryService.prototype.queryEnabled;
    /**
     * @type {?}
     * @private
     */
    QueryService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBRWxDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTdELE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLHdCQUF3QixFQUV6QixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPN0Q7SUFNRSxzQkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUY3QixpQkFBWSxHQUFHLElBQUksQ0FBQztJQUVZLENBQUM7Ozs7OztJQUV4Qyw0QkFBSzs7Ozs7SUFBTCxVQUFNLE1BQWUsRUFBRSxPQUFxQjtRQUE1QyxpQkFJQztRQUhDLE9BQU8sTUFBTTthQUNW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TyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUM7U0FDdEQ7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQXZvQkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFoQ1EsVUFBVTs7O3VCQURuQjtDQXVxQkMsQUF4b0JELElBd29CQztTQXJvQlksWUFBWTs7O0lBQ3ZCLG9DQUEyQjs7Ozs7SUFFZiw0QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgb2xGb3JtYXRHTUwyIGZyb20gJ29sL2Zvcm1hdC9HTUwyJztcclxuaW1wb3J0IG9sRm9ybWF0R01MMyBmcm9tICdvbC9mb3JtYXQvR01MMyc7XHJcbmltcG9ydCBvbEZvcm1hdEVzcmlKU09OIGZyb20gJ29sL2Zvcm1hdC9Fc3JpSlNPTic7XHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCAqIGFzIG9sZ2VvbSBmcm9tICdvbC9nZW9tJztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGRUFUVVJFIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7XHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFdNU0RhdGFTb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBRdWVyeUZvcm1hdCwgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi9xdWVyeS5lbnVtcyc7XHJcbmltcG9ydCB7XHJcbiAgUXVlcnlPcHRpb25zLFxyXG4gIFF1ZXJ5YWJsZURhdGFTb3VyY2UsXHJcbiAgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnNcclxufSBmcm9tICcuL3F1ZXJ5LmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUXVlcnlTZXJ2aWNlIHtcclxuICBwdWJsaWMgcXVlcnlFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBxdWVyeShsYXllcnM6IExheWVyW10sIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPltdIHtcclxuICAgIHJldHVybiBsYXllcnNcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBsYXllci52aXNpYmxlICYmIGxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlKVxyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHRoaXMucXVlcnlMYXllcihsYXllciwgb3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgcXVlcnlMYXllcihsYXllcjogTGF5ZXIsIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFF1ZXJ5VXJsKGxheWVyLmRhdGFTb3VyY2UsIG9wdGlvbnMpO1xyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChsYXllci5kYXRhU291cmNlIGFzIFF1ZXJ5YWJsZURhdGFTb3VyY2UpLm9wdGlvbnMucXVlcnlGb3JtYXQgPT09XHJcbiAgICAgIFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgdXJsR21sID0gdGhpcy5nZXRRdWVyeVVybChsYXllci5kYXRhU291cmNlLCBvcHRpb25zLCB0cnVlKTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsR21sLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pLnBpcGUoXHJcbiAgICAgICAgbWVyZ2VNYXAoZ21sUmVzID0+IHtcclxuICAgICAgICAgIGNvbnN0IGltcG9zZWRHZW9tID0gdGhpcy5tZXJnZUdNTChnbWxSZXMsIHVybCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgIG1hcChyZXMgPT5cclxuICAgICAgICAgICAgICAgIHRoaXMuZXh0cmFjdERhdGEocmVzLCBsYXllciwgb3B0aW9ucywgdXJsLCBpbXBvc2VkR2VvbSlcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5odHRwLmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdC5waXBlKG1hcChyZXMgPT4gdGhpcy5leHRyYWN0RGF0YShyZXMsIGxheWVyLCBvcHRpb25zLCB1cmwpKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1lcmdlR01MKGdtbFJlcywgdXJsKSB7XHJcbiAgICBsZXQgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMigpO1xyXG4gICAgbGV0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhnbWxSZXMpO1xyXG4gICAgLy8gSGFuZGxlIG5vbiBzdGFuZGFyZCBHTUwgb3V0cHV0IChNYXBTZXJ2ZXIpXHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHBhcnNlciA9IG5ldyBvbGZvcm1hdC5XTVNHZXRGZWF0dXJlSW5mbygpO1xyXG4gICAgICBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMoZ21sUmVzKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9sbWxpbmUgPSBuZXcgb2xnZW9tLk11bHRpTGluZVN0cmluZyhbXSk7XHJcbiAgICBsZXQgcHRzO1xyXG4gICAgY29uc3QgcHRzQXJyYXkgPSBbXTtcclxuICAgIGxldCBvbG1wb2x5ID0gbmV3IG9sZ2VvbS5NdWx0aVBvbHlnb24oW10pO1xyXG4gICAgbGV0IGZpcnN0RmVhdHVyZVR5cGU7XHJcbiAgICBjb25zdCBuYkZlYXR1cmVzID0gZmVhdHVyZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGdlb21ldHJ5IGludGVyc2VjdCBiYm94XHJcbiAgICAvLyBmb3IgZ2Vvc2VydmVyIGdldGZlYXR1cmVpbmZvIHJlc3BvbnNlIGluIGRhdGEgcHJvamVjdGlvbiwgbm90IGNhbGwgcHJvamVjdGlvblxyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zOiBhbnkgPSB0aGlzLmdldFF1ZXJ5UGFyYW1zKHVybC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGJib3hSYXcgPSBzZWFyY2hQYXJhbXMuYmJveDtcclxuICAgIGNvbnN0IGJib3ggPSBiYm94UmF3LnNwbGl0KCcsJyk7XHJcbiAgICBjb25zdCBiYm94RXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuICAgIG9sZXh0ZW50LmV4dGVuZChiYm94RXh0ZW50LCBiYm94KTtcclxuICAgIGNvbnN0IG91dEJib3hFeHRlbnQgPSBmYWxzZTtcclxuICAgIGZlYXR1cmVzLm1hcChmZWF0dXJlID0+IHtcclxuICAgICAgLyogIGlmICghZmVhdHVyZS5nZXRHZW9tZXRyeSgpLnNpbXBsaWZ5KDEwMCkuaW50ZXJzZWN0c0V4dGVudChiYm94RXh0ZW50KSkge1xyXG4gICAgICAgIG91dEJib3hFeHRlbnQgPSB0cnVlO1xyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRvIHByb2plY3QgdGhlIGdlb21ldHJ5P1xyXG4gICAgICB9Ki9cclxuICAgICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMgPSBmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5VHlwZSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCk7XHJcblxyXG4gICAgICBpZiAoIWZpcnN0RmVhdHVyZVR5cGUgJiYgIW91dEJib3hFeHRlbnQpIHtcclxuICAgICAgICBmaXJzdEZlYXR1cmVUeXBlID0gZmVhdHVyZUdlb21ldHJ5VHlwZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIW91dEJib3hFeHRlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGZlYXR1cmVHZW9tZXRyeVR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ1BvaW50JzpcclxuICAgICAgICAgICAgaWYgKG5iRmVhdHVyZXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICBwdHMgPSBuZXcgb2xnZW9tLlBvaW50KGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBwdHNBcnJheS5wdXNoKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgICAgICBvbG1saW5lLmFwcGVuZExpbmVTdHJpbmcoXHJcbiAgICAgICAgICAgICAgbmV3IG9sZ2VvbS5MaW5lU3RyaW5nKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgICAgICBvbG1wb2x5LmFwcGVuZFBvbHlnb24oXHJcbiAgICAgICAgICAgICAgbmV3IG9sZ2VvbS5Qb2x5Z29uKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ011bHRpUG9seWdvbic6XHJcbiAgICAgICAgICAgIG9sbXBvbHkgPSBuZXcgb2xnZW9tLk11bHRpUG9seWdvbihmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcywgJ1hZJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IG9sbXB0cztcclxuICAgIGlmIChwdHNBcnJheS5sZW5ndGggPT09IDAgJiYgcHRzKSB7XHJcbiAgICAgIG9sbXB0cyA9IHtcclxuICAgICAgICB0eXBlOiBwdHMuZ2V0VHlwZSgpLFxyXG4gICAgICAgIGNvb3JkaW5hdGVzOiBwdHMuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2xtcHRzID0ge1xyXG4gICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcclxuICAgICAgICBjb29yZGluYXRlczogW3RoaXMuY29udmV4SHVsbChwdHNBcnJheSldXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChmaXJzdEZlYXR1cmVUeXBlKSB7XHJcbiAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiBvbG1saW5lLmdldFR5cGUoKSxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBvbG1saW5lLmdldENvb3JkaW5hdGVzKClcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdQb2ludCc6XHJcbiAgICAgICAgcmV0dXJuIG9sbXB0cztcclxuICAgICAgY2FzZSAnUG9seWdvbic6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6IG9sbXBvbHkuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IG9sbXBvbHkuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgIGNhc2UgJ011bHRpUG9seWdvbic6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6IG9sbXBvbHkuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IG9sbXBvbHkuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3Jvc3MoYSwgYiwgbykge1xyXG4gICAgcmV0dXJuIChhWzBdIC0gb1swXSkgKiAoYlsxXSAtIG9bMV0pIC0gKGFbMV0gLSBvWzFdKSAqIChiWzBdIC0gb1swXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gcG9pbnRzIEFuIGFycmF5IG9mIFtYLCBZXSBjb29yZGluYXRlc1xyXG4gICAqIFRoaXMgbWV0aG9kIGlzIHVzZSBpbnN0ZWFkIG9mIHR1cmYuanMgY29udmV4SHVsbCBiZWNhdXNlIFR1cmYgbmVlZHMgYXQgbGVhc3QgMyBwb2ludCB0byBtYWtlIGEgaHVsbC5cclxuICAgKiBodHRwczovL2VuLndpa2lib29rcy5vcmcvd2lraS9BbGdvcml0aG1fSW1wbGVtZW50YXRpb24vR2VvbWV0cnkvQ29udmV4X2h1bGwvTW9ub3RvbmVfY2hhaW4jSmF2YVNjcmlwdFxyXG4gICAqL1xyXG4gIGNvbnZleEh1bGwocG9pbnRzKSB7XHJcbiAgICBwb2ludHMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICByZXR1cm4gYVswXSA9PT0gYlswXSA/IGFbMV0gLSBiWzFdIDogYVswXSAtIGJbMF07XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBsb3dlciA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwb2ludCBvZiBwb2ludHMpIHtcclxuICAgICAgd2hpbGUgKFxyXG4gICAgICAgIGxvd2VyLmxlbmd0aCA+PSAyICYmXHJcbiAgICAgICAgdGhpcy5jcm9zcyhsb3dlcltsb3dlci5sZW5ndGggLSAyXSwgbG93ZXJbbG93ZXIubGVuZ3RoIC0gMV0sIHBvaW50KSA8PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxvd2VyLnBvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGxvd2VyLnB1c2gocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwcGVyID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gcG9pbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIHdoaWxlIChcclxuICAgICAgICB1cHBlci5sZW5ndGggPj0gMiAmJlxyXG4gICAgICAgIHRoaXMuY3Jvc3MoXHJcbiAgICAgICAgICB1cHBlclt1cHBlci5sZW5ndGggLSAyXSxcclxuICAgICAgICAgIHVwcGVyW3VwcGVyLmxlbmd0aCAtIDFdLFxyXG4gICAgICAgICAgcG9pbnRzW2ldXHJcbiAgICAgICAgKSA8PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHVwcGVyLnBvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHVwcGVyLnB1c2gocG9pbnRzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICB1cHBlci5wb3AoKTtcclxuICAgIGxvd2VyLnBvcCgpO1xyXG4gICAgcmV0dXJuIGxvd2VyLmNvbmNhdCh1cHBlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3REYXRhKFxyXG4gICAgcmVzLFxyXG4gICAgbGF5ZXI6IExheWVyLFxyXG4gICAgb3B0aW9uczogUXVlcnlPcHRpb25zLFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBpbXBvc2VkR2VvbWV0cnk/XHJcbiAgKTogRmVhdHVyZVtdIHtcclxuICAgIGNvbnN0IHF1ZXJ5RGF0YVNvdXJjZSA9IGxheWVyLmRhdGFTb3VyY2UgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZTtcclxuXHJcbiAgICBjb25zdCBhbGxvd2VkRmllbGRzQW5kQWxpYXMgPSB0aGlzLmdldEFsbG93ZWRGaWVsZHNBbmRBbGlhcyhsYXllcik7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBbXTtcclxuICAgIHN3aXRjaCAocXVlcnlEYXRhU291cmNlLm9wdGlvbnMucXVlcnlGb3JtYXQpIHtcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwzOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R01MM0RhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBsYXllci56SW5kZXgsXHJcbiAgICAgICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkpTT046XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR0VPSlNPTjpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdlb0pTT05EYXRhKHJlcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuRVNSSUpTT046XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RFc3JpSlNPTkRhdGEocmVzLCBsYXllci56SW5kZXgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LlRFWFQ6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RUZXh0RGF0YShyZXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUw6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RIdG1sRGF0YShcclxuICAgICAgICAgIHJlcyxcclxuICAgICAgICAgIHF1ZXJ5RGF0YVNvdXJjZS5xdWVyeUh0bWxUYXJnZXQsXHJcbiAgICAgICAgICB1cmxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0SHRtbERhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2UucXVlcnlIdG1sVGFyZ2V0LFxyXG4gICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgaW1wb3NlZEdlb21ldHJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwyOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R01MMkRhdGEocmVzLCBsYXllciwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1hcExhYmVsID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3F1ZXJ5RGF0YVNvdXJjZS5tYXBMYWJlbF07XHJcblxyXG4gICAgICBsZXQgZXhjbHVkZTtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAnd21zJykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBsYXllci5vcHRpb25zXHJcbiAgICAgICAgICAuc291cmNlT3B0aW9ucyBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICBleGNsdWRlID0gc291cmNlT3B0aW9ucyA/IHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHRpdGxlID0gdGhpcy5nZXRRdWVyeVRpdGxlKGZlYXR1cmUsIGxheWVyKTtcclxuICAgICAgaWYgKCF0aXRsZSAmJiBmZWF0dXJlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGl0bGUgPSBgJHtsYXllci50aXRsZX0gKCR7aW5kZXggKyAxfSlgO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0aXRsZSkge1xyXG4gICAgICAgIHRpdGxlID0gbGF5ZXIudGl0bGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCBmZWF0dXJlLm1ldGEgfHwge30sIHtcclxuICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIG1hcFRpdGxlOiBtYXBMYWJlbCxcclxuICAgICAgICBzb3VyY2VUaXRsZTogbGF5ZXIudGl0bGUsXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSBsYXllci56SW5kZXgsXHJcbiAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZTogZXhjbHVkZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGZlYXR1cmUsIHtcclxuICAgICAgICBtZXRhLFxyXG4gICAgICAgIHByb2plY3Rpb246XHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnY2FydG8nXHJcbiAgICAgICAgICAgID8gJ0VQU0c6NDMyNidcclxuICAgICAgICAgICAgOiBvcHRpb25zLnByb2plY3Rpb25cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEdNTDJEYXRhKHJlcywgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXM/KSB7XHJcbiAgICBsZXQgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMigpO1xyXG4gICAgbGV0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgLy8gSGFuZGxlIG5vbiBzdGFuZGFyZCBHTUwgb3V0cHV0IChNYXBTZXJ2ZXIpXHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHBhcnNlciA9IG5ldyBvbGZvcm1hdC5XTVNHZXRGZWF0dXJlSW5mbygpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgJ3F1ZXJ5LnNlcnZpY2U6IE11bHRpcG9seWdvbnMgYXJlIGJhZGx5IG1hbmFnZWQgaW4gbWFwc2VydmVyIGluIEdNTDIuIFVzZSBhbm90aGVyIGZvcm1hdC4nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHTUwzRGF0YShyZXMsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzPykge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMygpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKGZlYXR1cmUgPT5cclxuICAgICAgdGhpcy5mZWF0dXJlVG9SZXN1bHQoZmVhdHVyZSwgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0R2VvSlNPTkRhdGEocmVzKSB7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGZlYXR1cmVzID0gSlNPTi5wYXJzZShyZXMpLmZlYXR1cmVzO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ3F1ZXJ5LnNlcnZpY2U6IFVuYWJsZSB0byBwYXJzZSBnZW9qc29uJywgJ1xcbicsIHJlcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RFc3JpSlNPTkRhdGEocmVzLCB6SW5kZXgpIHtcclxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEVzcmlKU09OKCk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4gdGhpcy5mZWF0dXJlVG9SZXN1bHQoZmVhdHVyZSwgekluZGV4KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RUZXh0RGF0YShyZXMpIHtcclxuICAgIC8vIFRPRE9cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEh0bWxEYXRhKFxyXG4gICAgcmVzLFxyXG4gICAgaHRtbFRhcmdldDogUXVlcnlIdG1sVGFyZ2V0LFxyXG4gICAgdXJsLFxyXG4gICAgaW1wb3NlZEdlb21ldHJ5P1xyXG4gICkge1xyXG4gICAgLy8gX2JsYW5rICwgaWZyYW1lIG9yIHVuZGVmaW5lZFxyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zOiBhbnkgPSB0aGlzLmdldFF1ZXJ5UGFyYW1zKHVybC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGJib3hSYXcgPSBzZWFyY2hQYXJhbXMuYmJveDtcclxuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLndpZHRoLCAxMCk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaGVpZ2h0LCAxMCk7XHJcbiAgICBjb25zdCB4UG9zaXRpb24gPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaSB8fCBzZWFyY2hQYXJhbXMueCwgMTApO1xyXG4gICAgY29uc3QgeVBvc2l0aW9uID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmogfHwgc2VhcmNoUGFyYW1zLnksIDEwKTtcclxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBzZWFyY2hQYXJhbXMuY3JzIHx8IHNlYXJjaFBhcmFtcy5zcnMgfHwgJ0VQU0c6Mzg1Nyc7XHJcblxyXG4gICAgY29uc3QgYmJveCA9IGJib3hSYXcuc3BsaXQoJywnKTtcclxuICAgIGxldCB0aHJlc2hvbGQgPVxyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgLSBNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMl0pKSkgKiAwLjA1O1xyXG5cclxuICAgIC8vIGZvciBjb250ZXh0IGluIGRlZ3JlZSAoRVBTRzo0MzI2LDQyNjkuLi4pXHJcbiAgICBpZiAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgPCAxODApIHtcclxuICAgICAgdGhyZXNob2xkID0gMC4wNDU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xpY2t4ID1cclxuICAgICAgcGFyc2VGbG9hdChiYm94WzBdKSArXHJcbiAgICAgIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMF0pIC0gcGFyc2VGbG9hdChiYm94WzJdKSkgKiB4UG9zaXRpb24pIC9cclxuICAgICAgICB3aWR0aCAtXHJcbiAgICAgIHRocmVzaG9sZDtcclxuICAgIGNvbnN0IGNsaWNreSA9XHJcbiAgICAgIHBhcnNlRmxvYXQoYmJveFsxXSkgK1xyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzFdKSAtIHBhcnNlRmxvYXQoYmJveFszXSkpICogeVBvc2l0aW9uKSAvXHJcbiAgICAgICAgaGVpZ2h0IC1cclxuICAgICAgdGhyZXNob2xkO1xyXG4gICAgY29uc3QgY2xpY2t4MSA9IGNsaWNreCArIHRocmVzaG9sZCAqIDI7XHJcbiAgICBjb25zdCBjbGlja3kxID0gY2xpY2t5ICsgdGhyZXNob2xkICogMjtcclxuXHJcbiAgICBjb25zdCB3a3RQb2x5ID1cclxuICAgICAgJ1BPTFlHT04oKCcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5MSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3gxICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5MSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3gxICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcpKSc7XHJcblxyXG4gICAgY29uc3QgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LldLVCgpO1xyXG4gICAgY29uc3QgdGVuUGVyY2VudFdpZHRoR2VvbSA9IGZvcm1hdC5yZWFkRmVhdHVyZSh3a3RQb2x5KTtcclxuICAgIGNvbnN0IGYgPSB0ZW5QZXJjZW50V2lkdGhHZW9tLmdldEdlb21ldHJ5KCkgYXMgYW55O1xyXG5cclxuICAgIGlmIChcclxuICAgICAgaHRtbFRhcmdldCAhPT0gUXVlcnlIdG1sVGFyZ2V0LkJMQU5LICYmXHJcbiAgICAgIGh0bWxUYXJnZXQgIT09IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUVcclxuICAgICkge1xyXG4gICAgICBodG1sVGFyZ2V0ID0gUXVlcnlIdG1sVGFyZ2V0LklGUkFNRTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib2R5VGFnU3RhcnQgPSByZXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKCc8Ym9keT4nKTtcclxuICAgIGNvbnN0IGJvZHlUYWdFbmQgPSByZXMudG9Mb3dlckNhc2UoKS5sYXN0SW5kZXhPZignPC9ib2R5PicpICsgNztcclxuICAgIC8vIHJlcGxhY2UgXFxyIFxcbiAgYW5kICcgJyB3aXRoICcnIHRvIHZhbGlkYXRlIGlmIHRoZSBib2R5IGlzIHJlYWxseSBlbXB0eS5cclxuICAgIGNvbnN0IGJvZHkgPSByZXMuc2xpY2UoYm9keVRhZ1N0YXJ0LCBib2R5VGFnRW5kKS5yZXBsYWNlKC8oXFxyfFxcbnxcXHMpL2csICcnKTtcclxuICAgIGlmIChib2R5ID09PSAnPGJvZHk+PC9ib2R5PicgfHwgcmVzID09PSAnJykge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbixcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7IHRhcmdldDogaHRtbFRhcmdldCwgYm9keTogcmVzLCB1cmwgfSxcclxuICAgICAgICBnZW9tZXRyeTogaW1wb3NlZEdlb21ldHJ5IHx8IHtcclxuICAgICAgICAgIHR5cGU6IGYuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGYuZ2V0Q29vcmRpbmF0ZXMoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlcnlQYXJhbXModXJsKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHVybC5zcGxpdCgnPycpO1xyXG4gICAgaWYgKCFxdWVyeVN0cmluZ1sxXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYWlycyA9IHF1ZXJ5U3RyaW5nWzFdLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICBwYWlycy5mb3JFYWNoKHBhaXIgPT4ge1xyXG4gICAgICBwYWlyID0gcGFpci5zcGxpdCgnPScpO1xyXG4gICAgICByZXN1bHRbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSB8fCAnJyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmVhdHVyZVRvUmVzdWx0KFxyXG4gICAgZmVhdHVyZU9MOiBvbEZlYXR1cmUsXHJcbiAgICB6SW5kZXg6IG51bWJlcixcclxuICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz9cclxuICApOiBGZWF0dXJlIHtcclxuICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeSA9IGZlYXR1cmVPTC5nZXRHZW9tZXRyeSgpIGFzIGFueTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVPTC5nZXRQcm9wZXJ0aWVzKCkpO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuZ2VvbWV0cnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5ib3VuZGVkQnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5zaGFwZTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLlNIQVBFO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMudGhlX2dlb207XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5O1xyXG4gICAgaWYgKGZlYXR1cmVHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdlb21ldHJ5ID0ge1xyXG4gICAgICAgIHR5cGU6IGZlYXR1cmVHZW9tZXRyeS5nZXRUeXBlKCksXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IGZlYXR1cmVHZW9tZXRyeS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgcHJvamVjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICBnZW9tZXRyeSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSB6SW5kZXgsXHJcbiAgICAgICAgYWxpYXM6IGFsbG93ZWRGaWVsZHNBbmRBbGlhc1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVVybChcclxuICAgIGRhdGFzb3VyY2U6IFF1ZXJ5YWJsZURhdGFTb3VyY2UsXHJcbiAgICBvcHRpb25zOiBRdWVyeU9wdGlvbnMsXHJcbiAgICBmb3JjZUdNTDIgPSBmYWxzZVxyXG4gICk6IHN0cmluZyB7XHJcbiAgICBsZXQgdXJsO1xyXG4gICAgc3dpdGNoIChkYXRhc291cmNlLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgIGNhc2UgV01TRGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCB3bXNEYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlO1xyXG5cclxuICAgICAgICBjb25zdCBXTVNHZXRGZWF0dXJlSW5mb09wdGlvbnMgPSB7XHJcbiAgICAgICAgICBJTkZPX0ZPUk1BVDpcclxuICAgICAgICAgICAgd21zRGF0YXNvdXJjZS5wYXJhbXMuSU5GT19GT1JNQVQgfHxcclxuICAgICAgICAgICAgdGhpcy5nZXRNaW1lSW5mb0Zvcm1hdChkYXRhc291cmNlLm9wdGlvbnMucXVlcnlGb3JtYXQpLFxyXG4gICAgICAgICAgUVVFUllfTEFZRVJTOiB3bXNEYXRhc291cmNlLnBhcmFtcy5MQVlFUlMsXHJcbiAgICAgICAgICBGRUFUVVJFX0NPVU5UOiB3bXNEYXRhc291cmNlLnBhcmFtcy5GRUFUVVJFX0NPVU5UIHx8ICc1J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChmb3JjZUdNTDIpIHtcclxuICAgICAgICAgIFdNU0dldEZlYXR1cmVJbmZvT3B0aW9ucy5JTkZPX0ZPUk1BVCA9IHRoaXMuZ2V0TWltZUluZm9Gb3JtYXQoXHJcbiAgICAgICAgICAgIFF1ZXJ5Rm9ybWF0LkdNTDJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cmwgPSB3bXNEYXRhc291cmNlLm9sLmdldEdldEZlYXR1cmVJbmZvVXJsKFxyXG4gICAgICAgICAgb3B0aW9ucy5jb29yZGluYXRlcyxcclxuICAgICAgICAgIG9wdGlvbnMucmVzb2x1dGlvbixcclxuICAgICAgICAgIG9wdGlvbnMucHJvamVjdGlvbixcclxuICAgICAgICAgIFdNU0dldEZlYXR1cmVJbmZvT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gY29uc3Qgd21zVmVyc2lvbiA9XHJcbiAgICAgICAgLy8gICB3bXNEYXRhc291cmNlLnBhcmFtcy5WRVJTSU9OIHx8XHJcbiAgICAgICAgLy8gICB3bXNEYXRhc291cmNlLnBhcmFtcy52ZXJzaW9uIHx8XHJcbiAgICAgICAgLy8gICAnMS4zLjAnO1xyXG4gICAgICAgIC8vIGlmICh3bXNWZXJzaW9uICE9PSAnMS4zLjAnKSB7XHJcbiAgICAgICAgLy8gICB1cmwgPSB1cmwucmVwbGFjZSgnJkk9JywgJyZYPScpO1xyXG4gICAgICAgIC8vICAgdXJsID0gdXJsLnJlcGxhY2UoJyZKPScsICcmWT0nKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2FydG9EYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IGNhcnRvRGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgQ2FydG9EYXRhU291cmNlO1xyXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPVxyXG4gICAgICAgICAgJ2h0dHBzOi8vJyArXHJcbiAgICAgICAgICBjYXJ0b0RhdGFzb3VyY2Uub3B0aW9ucy5hY2NvdW50ICtcclxuICAgICAgICAgICcuY2FydG8uY29tL2FwaS92Mi9zcWw/JztcclxuICAgICAgICBjb25zdCBmb3JtYXQgPSAnZm9ybWF0PUdlb0pTT04nO1xyXG4gICAgICAgIGNvbnN0IHNxbCA9XHJcbiAgICAgICAgICAnJnE9JyArIGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLmNvbmZpZy5sYXllcnNbMF0ub3B0aW9ucy5zcWw7XHJcbiAgICAgICAgY29uc3QgY2xhdXNlID1cclxuICAgICAgICAgICcgV0hFUkUgU1RfSW50ZXJzZWN0cyh0aGVfZ2VvbV93ZWJtZXJjYXRvcixTVF9CVUZGRVIoU1RfU2V0U1JJRChTVF9QT0lOVCgnO1xyXG4gICAgICAgIGNvbnN0IG1ldGVycyA9IGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICA/IGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICA6ICcxMDAwJztcclxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9XHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzWzBdICtcclxuICAgICAgICAgICcsJyArXHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzWzFdICtcclxuICAgICAgICAgICcpLDM4NTcpLCcgK1xyXG4gICAgICAgICAgbWV0ZXJzICtcclxuICAgICAgICAgICcpKSc7XHJcblxyXG4gICAgICAgIHVybCA9IGAke2Jhc2VVcmx9JHtmb3JtYXR9JHtzcWx9JHtjbGF1c2V9JHtjb29yZGluYXRlc31gO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2UgPSBkYXRhc291cmNlIGFzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTtcclxuICAgICAgICBsZXQgZXh0ZW50ID0gb2xleHRlbnQuYm91bmRpbmdFeHRlbnQoW29wdGlvbnMuY29vcmRpbmF0ZXNdKTtcclxuICAgICAgICBpZiAodGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb24pIHtcclxuICAgICAgICAgIGV4dGVudCA9IG9sZXh0ZW50LmJ1ZmZlcihcclxuICAgICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgICB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvblxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VydmljZVVybCA9XHJcbiAgICAgICAgICB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy51cmwgK1xyXG4gICAgICAgICAgJy8nICtcclxuICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLmxheWVyICtcclxuICAgICAgICAgICcvcXVlcnkvJztcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IGVuY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICd7XCJ4bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFswXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsxXSArXHJcbiAgICAgICAgICAgICcsXCJ4bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsyXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFszXSArXHJcbiAgICAgICAgICAgICcsXCJzcGF0aWFsUmVmZXJlbmNlXCI6e1wid2tpZFwiOjEwMjEwMH19J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAgICAgJ2Y9anNvbicsXHJcbiAgICAgICAgICBgZ2VvbWV0cnk9JHtnZW9tZXRyeX1gLFxyXG4gICAgICAgICAgJ2dlb21ldHJ5VHlwZT1lc3JpR2VvbWV0cnlFbnZlbG9wZScsXHJcbiAgICAgICAgICAnaW5TUj0xMDIxMDAnLFxyXG4gICAgICAgICAgJ3NwYXRpYWxSZWw9ZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJyxcclxuICAgICAgICAgICdvdXRGaWVsZHM9KicsXHJcbiAgICAgICAgICAncmV0dXJuR2VvbWV0cnk9dHJ1ZScsXHJcbiAgICAgICAgICAnb3V0U1I9MTAyMTAwJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgdXJsID0gYCR7c2VydmljZVVybH0/JHtwYXJhbXMuam9pbignJicpfWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TWltZUluZm9Gb3JtYXQocXVlcnlGb3JtYXQpIHtcclxuICAgIGxldCBtaW1lO1xyXG4gICAgc3dpdGNoIChxdWVyeUZvcm1hdCkge1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdNTDI6XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi92bmQub2djLmdtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMzpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL3ZuZC5vZ2MuZ21sLzMuMS4xJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5KU09OOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vanNvbic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR0VPSlNPTjpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL2dlb2pzb24nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LlRFWFQ6XHJcbiAgICAgICAgbWltZSA9ICd0ZXh0L3BsYWluJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MOlxyXG4gICAgICAgIG1pbWUgPSAndGV4dC9odG1sJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MR01MMjpcclxuICAgICAgICBtaW1lID0gJ3RleHQvaHRtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi92bmQub2djLmdtbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1pbWU7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxvd2VkRmllbGRzQW5kQWxpYXMobGF5ZXI6IGFueSkge1xyXG4gICAgbGV0IGFsbG93ZWRGaWVsZHNBbmRBbGlhcztcclxuICAgIGlmIChcclxuICAgICAgbGF5ZXIub3B0aW9ucyAmJlxyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZSAmJlxyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZS5vcHRpb25zICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA+PSAxXHJcbiAgICApIHtcclxuICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0ge307XHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlLm9wdGlvbnMuc291cmNlRmllbGRzLmZvckVhY2goc291cmNlRmllbGQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFsaWFzID0gc291cmNlRmllbGQuYWxpYXMgPyBzb3VyY2VGaWVsZC5hbGlhcyA6IHNvdXJjZUZpZWxkLm5hbWU7XHJcbiAgICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzW3NvdXJjZUZpZWxkLm5hbWVdID0gYWxpYXM7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFsbG93ZWRGaWVsZHNBbmRBbGlhcztcclxuICB9XHJcblxyXG4gIGdldFF1ZXJ5VGl0bGUoZmVhdHVyZTogRmVhdHVyZSwgbGF5ZXI6IExheWVyKTogc3RyaW5nIHtcclxuICAgIGxldCB0aXRsZTtcclxuICAgIGlmIChsYXllci5vcHRpb25zICYmIGxheWVyLm9wdGlvbnMuc291cmNlICYmIGxheWVyLm9wdGlvbnMuc291cmNlLm9wdGlvbnMpIHtcclxuICAgICAgY29uc3QgZGF0YVNvdXJjZU9wdGlvbnMgPSBsYXllci5vcHRpb25zLnNvdXJjZVxyXG4gICAgICAgIC5vcHRpb25zIGFzIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zO1xyXG4gICAgICBpZiAoZGF0YVNvdXJjZU9wdGlvbnMucXVlcnlUaXRsZSkge1xyXG4gICAgICAgIHRpdGxlID0gdGhpcy5nZXRMYWJlbE1hdGNoKGZlYXR1cmUsIGRhdGFTb3VyY2VPcHRpb25zLnF1ZXJ5VGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFiZWxNYXRjaChmZWF0dXJlOiBGZWF0dXJlLCBsYWJlbE1hdGNoKTogc3RyaW5nIHtcclxuICAgIGxldCBsYWJlbCA9IGxhYmVsTWF0Y2g7XHJcbiAgICBjb25zdCBsYWJlbFRvR2V0ID0gQXJyYXkuZnJvbShsYWJlbE1hdGNoLm1hdGNoQWxsKC9cXCRcXHsoW15cXHtcXH1dKylcXH0vZykpO1xyXG5cclxuICAgIGxhYmVsVG9HZXQuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKHZbMF0sIGZlYXR1cmUucHJvcGVydGllc1t2WzFdXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBOb3RoaW5nIGRvbmU/IGNoZWNrIGZlYXR1cmUncyBhdHRyaWJ1dGVcclxuICAgIGlmIChsYWJlbFRvR2V0Lmxlbmd0aCA9PT0gMCAmJiBsYWJlbCA9PT0gbGFiZWxNYXRjaCkge1xyXG4gICAgICBsYWJlbCA9IGZlYXR1cmUucHJvcGVydGllc1tsYWJlbE1hdGNoXSB8fCBsYWJlbE1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxuICB9XHJcbn1cclxuIl19