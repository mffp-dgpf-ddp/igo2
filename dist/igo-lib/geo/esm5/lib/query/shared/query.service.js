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
        if (((/** @type {?} */ (layer.dataSource))).options.queryFormat === QueryFormat.HTMLGML2) {
            /** @type {?} */
            var urlGml = this.getQueryUrl(layer.dataSource, options, true);
            return this.http.get(urlGml, { responseType: 'text' })
                .pipe(mergeMap((/**
             * @param {?} gmlRes
             * @return {?}
             */
            function (gmlRes) {
                /** @type {?} */
                var imposedGeom = _this.mergeGML(gmlRes, url);
                return _this.http.get(url, { responseType: 'text' })
                    .pipe(map(((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return _this.extractData(res, layer, options, url, imposedGeom); }))));
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
                while (lower.length >= 2 && this.cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
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
            while (upper.length >= 2 && this.cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
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
        /** @type {?} */
        var queryDataSource = (/** @type {?} */ (layer.dataSource));
        /** @type {?} */
        var allowedFieldsAndAlias;
        if (layer.options &&
            layer.options.sourceOptions &&
            layer.options.sourceOptions.sourceFields &&
            layer.options.sourceOptions.sourceFields.length >= 1) {
            allowedFieldsAndAlias = {};
            layer.options.sourceOptions.sourceFields.forEach((/**
             * @param {?} sourceField
             * @return {?}
             */
            function (sourceField) {
                /** @type {?} */
                var alias = sourceField.alias ? sourceField.alias : sourceField.name;
                allowedFieldsAndAlias[sourceField.name] = alias;
            }));
        }
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
            var title = feature.properties[queryDataSource.queryTitle];
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
                mapTitle: title,
                sourceTitle: layer.title,
                order: 1000 - layer.zIndex
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
            features = parser.readFeatures(res);
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
                geometry: imposedGeometry || { type: f.getType(), coordinates: f.getCoordinates() }
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
     * @private
     * @param {?} featureOL
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    QueryService.prototype.featureToResult = /**
     * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBRWxDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTdELE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLHdCQUF3QixFQUN6QixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHN0Q7SUFNRSxzQkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUY3QixpQkFBWSxHQUFHLElBQUksQ0FBQztJQUVZLENBQUM7Ozs7OztJQUV4Qyw0QkFBSzs7Ozs7SUFBTCxVQUFNLE1BQWUsRUFBRSxPQUFxQjtRQUE1QyxpQkFJQztRQUhDLE9BQU8sTUFBTTthQUNW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QUksR0FBRyx5QkFBeUIsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUk7Z0JBQ25CLElBQUksR0FBRywrQkFBK0IsQ0FBQztnQkFDdkMsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUk7Z0JBQ25CLElBQUksR0FBRyxrQkFBa0IsQ0FBQztnQkFDMUIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLE9BQU87Z0JBQ3RCLElBQUksR0FBRyxxQkFBcUIsQ0FBQztnQkFDN0IsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUk7Z0JBQ25CLElBQUksR0FBRyxZQUFZLENBQUM7Z0JBQ3BCLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUNuQixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDbkIsTUFBTTtZQUNSO2dCQUNFLElBQUksR0FBRyx5QkFBeUIsQ0FBQztnQkFDakMsTUFBTTtTQUNUO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkFsakJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBM0JRLFVBQVU7Ozt1QkFEbkI7Q0E2a0JDLEFBbmpCRCxJQW1qQkM7U0FoakJZLFlBQVk7OztJQUN2QixvQ0FBMkI7Ozs7O0lBRWYsNEJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0ICogYXMgb2xleHRlbnQgZnJvbSAnb2wvZXh0ZW50JztcclxuaW1wb3J0IG9sRm9ybWF0R01MMiBmcm9tICdvbC9mb3JtYXQvR01MMic7XHJcbmltcG9ydCBvbEZvcm1hdEdNTDMgZnJvbSAnb2wvZm9ybWF0L0dNTDMnO1xyXG5pbXBvcnQgb2xGb3JtYXRFc3JpSlNPTiBmcm9tICdvbC9mb3JtYXQvRXNyaUpTT04nO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgKiBhcyBvbGdlb20gZnJvbSAnb2wvZ2VvbSc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQge1xyXG4gIFdNU0RhdGFTb3VyY2UsXHJcbiAgQ2FydG9EYXRhU291cmNlLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZVxyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgUXVlcnlGb3JtYXQsIFF1ZXJ5SHRtbFRhcmdldCB9IGZyb20gJy4vcXVlcnkuZW51bXMnO1xyXG5pbXBvcnQgeyBRdWVyeU9wdGlvbnMsIFF1ZXJ5YWJsZURhdGFTb3VyY2UgfSBmcm9tICcuL3F1ZXJ5LmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUXVlcnlTZXJ2aWNlIHtcclxuICBwdWJsaWMgcXVlcnlFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBxdWVyeShsYXllcnM6IExheWVyW10sIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPltdIHtcclxuICAgIHJldHVybiBsYXllcnNcclxuICAgICAgLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBsYXllci52aXNpYmxlICYmIGxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlKVxyXG4gICAgICAubWFwKChsYXllcjogTGF5ZXIpID0+IHRoaXMucXVlcnlMYXllcihsYXllciwgb3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgcXVlcnlMYXllcihsYXllcjogTGF5ZXIsIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFF1ZXJ5VXJsKGxheWVyLmRhdGFTb3VyY2UsIG9wdGlvbnMpO1xyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKGxheWVyLmRhdGFTb3VyY2UgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZSkub3B0aW9ucy5xdWVyeUZvcm1hdCA9PT0gUXVlcnlGb3JtYXQuSFRNTEdNTDIpIHtcclxuICAgICAgY29uc3QgdXJsR21sID0gdGhpcy5nZXRRdWVyeVVybChsYXllci5kYXRhU291cmNlLCBvcHRpb25zLCB0cnVlKTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsR21sLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKG1lcmdlTWFwKGdtbFJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1wb3NlZEdlb20gPSB0aGlzLm1lcmdlR01MKGdtbFJlcywgdXJsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgICAgIC5waXBlKG1hcCgocmVzID0+IHRoaXMuZXh0cmFjdERhdGEocmVzLCBsYXllciwgb3B0aW9ucywgdXJsLCBpbXBvc2VkR2VvbSkpKSk7XHJcbiAgICAgIH1cclxuICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuaHR0cC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QucGlwZShtYXAocmVzID0+IHRoaXMuZXh0cmFjdERhdGEocmVzLCBsYXllciwgb3B0aW9ucywgdXJsKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtZXJnZUdNTChnbWxSZXMsIHVybCkge1xyXG4gICAgbGV0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEdNTDIoKTtcclxuICAgIGxldCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMoZ21sUmVzKTtcclxuICAgIC8vIEhhbmRsZSBub24gc3RhbmRhcmQgR01MIG91dHB1dCAoTWFwU2VydmVyKVxyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBwYXJzZXIgPSBuZXcgb2xmb3JtYXQuV01TR2V0RmVhdHVyZUluZm8oKTtcclxuICAgICAgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKGdtbFJlcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvbG1saW5lID0gbmV3IG9sZ2VvbS5NdWx0aUxpbmVTdHJpbmcoW10pO1xyXG4gICAgbGV0IHB0cztcclxuICAgIGNvbnN0IHB0c0FycmF5ID0gW107XHJcbiAgICBsZXQgb2xtcG9seSA9IG5ldyBvbGdlb20uTXVsdGlQb2x5Z29uKFtdKTtcclxuICAgIGxldCBmaXJzdEZlYXR1cmVUeXBlO1xyXG4gICAgY29uc3QgbmJGZWF0dXJlcyA9IGZlYXR1cmVzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBnZW9tZXRyeSBpbnRlcnNlY3QgYmJveFxyXG4gICAgLy8gZm9yIGdlb3NlcnZlciBnZXRmZWF0dXJlaW5mbyByZXNwb25zZSBpbiBkYXRhIHByb2plY3Rpb24sIG5vdCBjYWxsIHByb2plY3Rpb25cclxuICAgIGNvbnN0IHNlYXJjaFBhcmFtczogYW55ID0gdGhpcy5nZXRRdWVyeVBhcmFtcyh1cmwudG9Mb3dlckNhc2UoKSk7XHJcbiAgICBjb25zdCBiYm94UmF3ID0gc2VhcmNoUGFyYW1zLmJib3g7XHJcbiAgICBjb25zdCBiYm94ID0gYmJveFJhdy5zcGxpdCgnLCcpO1xyXG4gICAgY29uc3QgYmJveEV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcbiAgICBvbGV4dGVudC5leHRlbmQoYmJveEV4dGVudCwgYmJveCk7XHJcbiAgICBjb25zdCBvdXRCYm94RXh0ZW50ID0gZmFsc2U7XHJcbiAgICBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiB7XHJcblxyXG4gICAgLyogIGlmICghZmVhdHVyZS5nZXRHZW9tZXRyeSgpLnNpbXBsaWZ5KDEwMCkuaW50ZXJzZWN0c0V4dGVudChiYm94RXh0ZW50KSkge1xyXG4gICAgICAgIG91dEJib3hFeHRlbnQgPSB0cnVlO1xyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIHRvIHByb2plY3QgdGhlIGdlb21ldHJ5P1xyXG4gICAgICB9Ki9cclxuICAgICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMgPSBmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgICAgY29uc3QgZmVhdHVyZUdlb21ldHJ5VHlwZSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCk7XHJcblxyXG4gICAgICBpZiAoIWZpcnN0RmVhdHVyZVR5cGUgJiYgIW91dEJib3hFeHRlbnQpIHtcclxuICAgICAgICBmaXJzdEZlYXR1cmVUeXBlID0gZmVhdHVyZUdlb21ldHJ5VHlwZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIW91dEJib3hFeHRlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGZlYXR1cmVHZW9tZXRyeVR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ1BvaW50JzpcclxuICAgICAgICAgICAgaWYgKG5iRmVhdHVyZXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICBwdHMgPSBuZXcgb2xnZW9tLlBvaW50KGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBwdHNBcnJheS5wdXNoKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxyXG4gICAgICAgICAgICBvbG1saW5lLmFwcGVuZExpbmVTdHJpbmcoXHJcbiAgICAgICAgICAgICAgbmV3IG9sZ2VvbS5MaW5lU3RyaW5nKGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzLCAnWFknKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnUG9seWdvbic6XHJcbiAgICAgICAgICAgIG9sbXBvbHkuYXBwZW5kUG9seWdvbihcclxuICAgICAgICAgICAgICBuZXcgb2xnZW9tLlBvbHlnb24oZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMsICdYWScpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxyXG4gICAgICAgICAgICBvbG1wb2x5ID0gbmV3IG9sZ2VvbS5NdWx0aVBvbHlnb24oZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMsICdYWScpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBvbG1wdHM7XHJcbiAgICBpZiAocHRzQXJyYXkubGVuZ3RoID09PSAwICYmIHB0cykge1xyXG4gICAgICBvbG1wdHMgPSB7XHJcbiAgICAgICAgdHlwZTogcHRzLmdldFR5cGUoKSxcclxuICAgICAgICBjb29yZGluYXRlczogcHRzLmdldENvb3JkaW5hdGVzKClcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9sbXB0cyA9IHtcclxuICAgICAgICB0eXBlOiAnUG9seWdvbicsXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IFt0aGlzLmNvbnZleEh1bGwocHRzQXJyYXkpXVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoZmlyc3RGZWF0dXJlVHlwZSkge1xyXG4gICAgICBjYXNlICdMaW5lU3RyaW5nJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogb2xtbGluZS5nZXRUeXBlKCksXHJcbiAgICAgICAgICBjb29yZGluYXRlczogb2xtbGluZS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSAnUG9pbnQnOlxyXG4gICAgICAgIHJldHVybiBvbG1wdHM7XHJcbiAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiBvbG1wb2x5LmdldFR5cGUoKSxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBvbG1wb2x5LmdldENvb3JkaW5hdGVzKClcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6IG9sbXBvbHkuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgICBjb29yZGluYXRlczogb2xtcG9seS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgICAgfTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcm9zcyhhLCBiLCBvKSB7XHJcbiAgICByZXR1cm4gKGFbMF0gLSBvWzBdKSAqIChiWzFdIC0gb1sxXSkgLSAoYVsxXSAtIG9bMV0pICogKGJbMF0gLSBvWzBdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBwb2ludHMgQW4gYXJyYXkgb2YgW1gsIFldIGNvb3JkaW5hdGVzXHJcbiAgICogVGhpcyBtZXRob2QgaXMgdXNlIGluc3RlYWQgb2YgdHVyZi5qcyBjb252ZXhIdWxsIGJlY2F1c2UgVHVyZiBuZWVkcyBhdCBsZWFzdCAzIHBvaW50IHRvIG1ha2UgYSBodWxsLlxyXG4gICAqIGh0dHBzOi8vZW4ud2lraWJvb2tzLm9yZy93aWtpL0FsZ29yaXRobV9JbXBsZW1lbnRhdGlvbi9HZW9tZXRyeS9Db252ZXhfaHVsbC9Nb25vdG9uZV9jaGFpbiNKYXZhU2NyaXB0XHJcbiAgICovXHJcbiAgY29udmV4SHVsbChwb2ludHMpIHtcclxuICAgIHBvaW50cy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIHJldHVybiBhWzBdID09PSBiWzBdID8gYVsxXSAtIGJbMV0gOiBhWzBdIC0gYlswXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGxvd2VyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHBvaW50cykge1xyXG4gICAgICB3aGlsZSAobG93ZXIubGVuZ3RoID49IDIgJiYgdGhpcy5jcm9zcyhsb3dlcltsb3dlci5sZW5ndGggLSAyXSwgbG93ZXJbbG93ZXIubGVuZ3RoIC0gMV0sIHBvaW50KSA8PSAwKSB7XHJcbiAgICAgICAgbG93ZXIucG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgbG93ZXIucHVzaChwb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBwZXIgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSBwb2ludHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgd2hpbGUgKHVwcGVyLmxlbmd0aCA+PSAyICYmIHRoaXMuY3Jvc3ModXBwZXJbdXBwZXIubGVuZ3RoIC0gMl0sIHVwcGVyW3VwcGVyLmxlbmd0aCAtIDFdLCBwb2ludHNbaV0pIDw9IDApIHtcclxuICAgICAgICB1cHBlci5wb3AoKTtcclxuICAgICAgfVxyXG4gICAgICB1cHBlci5wdXNoKHBvaW50c1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBwZXIucG9wKCk7XHJcbiAgICBsb3dlci5wb3AoKTtcclxuICAgIHJldHVybiBsb3dlci5jb25jYXQodXBwZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShcclxuICAgIHJlcyxcclxuICAgIGxheWVyOiBMYXllcixcclxuICAgIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgaW1wb3NlZEdlb21ldHJ5P1xyXG4gICk6IEZlYXR1cmVbXSB7XHJcbiAgICBjb25zdCBxdWVyeURhdGFTb3VyY2UgPSBsYXllci5kYXRhU291cmNlIGFzIFF1ZXJ5YWJsZURhdGFTb3VyY2U7XHJcblxyXG4gICAgbGV0IGFsbG93ZWRGaWVsZHNBbmRBbGlhcztcclxuICAgIGlmIChcclxuICAgICAgbGF5ZXIub3B0aW9ucyAmJlxyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcyAmJlxyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA+PSAxXHJcbiAgICApIHtcclxuICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0ge307XHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgY29uc3QgYWxpYXMgPSBzb3VyY2VGaWVsZC5hbGlhcyA/IHNvdXJjZUZpZWxkLmFsaWFzIDogc291cmNlRmllbGQubmFtZTtcclxuICAgICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXNbc291cmNlRmllbGQubmFtZV0gPSBhbGlhcztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBbXTtcclxuICAgIHN3aXRjaCAocXVlcnlEYXRhU291cmNlLm9wdGlvbnMucXVlcnlGb3JtYXQpIHtcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwzOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R01MM0RhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBsYXllci56SW5kZXgsXHJcbiAgICAgICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkpTT046XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR0VPSlNPTjpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdlb0pTT05EYXRhKHJlcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuRVNSSUpTT046XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RFc3JpSlNPTkRhdGEocmVzLCBsYXllci56SW5kZXgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LlRFWFQ6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RUZXh0RGF0YShyZXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUw6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RIdG1sRGF0YShcclxuICAgICAgICAgIHJlcyxcclxuICAgICAgICAgIHF1ZXJ5RGF0YVNvdXJjZS5xdWVyeUh0bWxUYXJnZXQsXHJcbiAgICAgICAgICB1cmxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0SHRtbERhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2UucXVlcnlIdG1sVGFyZ2V0LFxyXG4gICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgaW1wb3NlZEdlb21ldHJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwyOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R01MMkRhdGEocmVzLCBsYXllciwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGxldCB0aXRsZSA9IGZlYXR1cmUucHJvcGVydGllc1txdWVyeURhdGFTb3VyY2UucXVlcnlUaXRsZV07XHJcbiAgICAgIGlmICghdGl0bGUgJiYgZmVhdHVyZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRpdGxlID0gYCR7bGF5ZXIudGl0bGV9ICgke2luZGV4ICsgMX0pYDtcclxuICAgICAgfSBlbHNlIGlmICghdGl0bGUpIHtcclxuICAgICAgICB0aXRsZSA9IGxheWVyLnRpdGxlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCBmZWF0dXJlLm1ldGEgfHwge30sIHtcclxuICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIG1hcFRpdGxlOiB0aXRsZSxcclxuICAgICAgICBzb3VyY2VUaXRsZTogbGF5ZXIudGl0bGUsXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSBsYXllci56SW5kZXhcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmZWF0dXJlLCB7XHJcbiAgICAgICAgbWV0YSxcclxuICAgICAgICBwcm9qZWN0aW9uOlxyXG4gICAgICAgICAgcXVlcnlEYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ2NhcnRvJ1xyXG4gICAgICAgICAgICA/ICdFUFNHOjQzMjYnXHJcbiAgICAgICAgICAgIDogb3B0aW9ucy5wcm9qZWN0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHTUwyRGF0YShyZXMsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzPykge1xyXG4gICAgbGV0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEdNTDIoKTtcclxuICAgIGxldCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIC8vIEhhbmRsZSBub24gc3RhbmRhcmQgR01MIG91dHB1dCAoTWFwU2VydmVyKVxyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBwYXJzZXIgPSBuZXcgb2xmb3JtYXQuV01TR2V0RmVhdHVyZUluZm8oKTtcclxuICAgICAgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcChmZWF0dXJlID0+XHJcbiAgICAgIHRoaXMuZmVhdHVyZVRvUmVzdWx0KGZlYXR1cmUsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEdNTDNEYXRhKHJlcywgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXM/KSB7XHJcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwzKCk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHZW9KU09ORGF0YShyZXMpIHtcclxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgZmVhdHVyZXMgPSBKU09OLnBhcnNlKHJlcykuZmVhdHVyZXM7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncXVlcnkuc2VydmljZTogVW5hYmxlIHRvIHBhcnNlIGdlb2pzb24nLCAnXFxuJywgcmVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEVzcmlKU09ORGF0YShyZXMsIHpJbmRleCkge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0RXNyaUpTT04oKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFRleHREYXRhKHJlcykge1xyXG4gICAgLy8gVE9ET1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0SHRtbERhdGEocmVzLCBodG1sVGFyZ2V0OiBRdWVyeUh0bWxUYXJnZXQsIHVybCwgaW1wb3NlZEdlb21ldHJ5Pykge1xyXG4gICAgLy8gX2JsYW5rICwgaWZyYW1lIG9yIHVuZGVmaW5lZFxyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zOiBhbnkgPSB0aGlzLmdldFF1ZXJ5UGFyYW1zKHVybC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGJib3hSYXcgPSBzZWFyY2hQYXJhbXMuYmJveDtcclxuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLndpZHRoLCAxMCk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaGVpZ2h0LCAxMCk7XHJcbiAgICBjb25zdCB4UG9zaXRpb24gPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaSB8fCBzZWFyY2hQYXJhbXMueCwgMTApO1xyXG4gICAgY29uc3QgeVBvc2l0aW9uID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmogfHwgc2VhcmNoUGFyYW1zLnksIDEwKTtcclxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBzZWFyY2hQYXJhbXMuY3JzIHx8IHNlYXJjaFBhcmFtcy5zcnMgfHwgJ0VQU0c6Mzg1Nyc7XHJcblxyXG4gICAgY29uc3QgYmJveCA9IGJib3hSYXcuc3BsaXQoJywnKTtcclxuICAgIGxldCB0aHJlc2hvbGQgPVxyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgLSBNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMl0pKSkgKiAwLjA1O1xyXG5cclxuICAgIC8vIGZvciBjb250ZXh0IGluIGRlZ3JlZSAoRVBTRzo0MzI2LDQyNjkuLi4pXHJcbiAgICBpZiAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgPCAxODApIHtcclxuICAgICAgdGhyZXNob2xkID0gMC4wNDU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xpY2t4ID1cclxuICAgICAgcGFyc2VGbG9hdChiYm94WzBdKSArXHJcbiAgICAgIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMF0pIC0gcGFyc2VGbG9hdChiYm94WzJdKSkgKiB4UG9zaXRpb24pIC9cclxuICAgICAgICB3aWR0aCAtXHJcbiAgICAgIHRocmVzaG9sZDtcclxuICAgIGNvbnN0IGNsaWNreSA9XHJcbiAgICAgIHBhcnNlRmxvYXQoYmJveFsxXSkgK1xyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzFdKSAtIHBhcnNlRmxvYXQoYmJveFszXSkpICogeVBvc2l0aW9uKSAvXHJcbiAgICAgICAgaGVpZ2h0IC1cclxuICAgICAgdGhyZXNob2xkO1xyXG4gICAgY29uc3QgY2xpY2t4MSA9IGNsaWNreCArIHRocmVzaG9sZCAqIDI7XHJcbiAgICBjb25zdCBjbGlja3kxID0gY2xpY2t5ICsgdGhyZXNob2xkICogMjtcclxuXHJcbiAgICBjb25zdCB3a3RQb2x5ID1cclxuICAgICAgJ1BPTFlHT04oKCcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5MSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3gxICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5MSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3gxICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcpKSc7XHJcblxyXG4gICAgY29uc3QgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LldLVCgpO1xyXG4gICAgY29uc3QgdGVuUGVyY2VudFdpZHRoR2VvbSA9IGZvcm1hdC5yZWFkRmVhdHVyZSh3a3RQb2x5KTtcclxuICAgIGNvbnN0IGYgPSB0ZW5QZXJjZW50V2lkdGhHZW9tLmdldEdlb21ldHJ5KCkgYXMgYW55O1xyXG5cclxuICAgIGlmIChcclxuICAgICAgaHRtbFRhcmdldCAhPT0gUXVlcnlIdG1sVGFyZ2V0LkJMQU5LICYmXHJcbiAgICAgIGh0bWxUYXJnZXQgIT09IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUVcclxuICAgICkge1xyXG4gICAgICBodG1sVGFyZ2V0ID0gUXVlcnlIdG1sVGFyZ2V0LklGUkFNRTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib2R5VGFnU3RhcnQgPSByZXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKCc8Ym9keT4nKTtcclxuICAgIGNvbnN0IGJvZHlUYWdFbmQgPSByZXMudG9Mb3dlckNhc2UoKS5sYXN0SW5kZXhPZignPC9ib2R5PicpICsgNztcclxuICAgIC8vIHJlcGxhY2UgXFxyIFxcbiAgYW5kICcgJyB3aXRoICcnIHRvIHZhbGlkYXRlIGlmIHRoZSBib2R5IGlzIHJlYWxseSBlbXB0eS5cclxuICAgIGNvbnN0IGJvZHkgPSByZXMuc2xpY2UoYm9keVRhZ1N0YXJ0LCBib2R5VGFnRW5kKS5yZXBsYWNlKC8oXFxyfFxcbnxcXHMpL2csICcnKTtcclxuICAgIGlmIChib2R5ID09PSAnPGJvZHk+PC9ib2R5PicgfHwgcmVzID09PSAnJykge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgICAgcHJvamVjdGlvbixcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7IHRhcmdldDogaHRtbFRhcmdldCwgYm9keTogcmVzLCB1cmwgfSxcclxuICAgICAgICBnZW9tZXRyeTogaW1wb3NlZEdlb21ldHJ5IHx8IHsgdHlwZTogZi5nZXRUeXBlKCksIGNvb3JkaW5hdGVzOiBmLmdldENvb3JkaW5hdGVzKCkgfVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gdXJsLnNwbGl0KCc/Jyk7XHJcbiAgICBpZiAoIXF1ZXJ5U3RyaW5nWzFdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhaXJzID0gcXVlcnlTdHJpbmdbMV0uc3BsaXQoJyYnKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgIHBhaXJzLmZvckVhY2gocGFpciA9PiB7XHJcbiAgICAgIHBhaXIgPSBwYWlyLnNwbGl0KCc9Jyk7XHJcbiAgICAgIHJlc3VsdFtwYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdIHx8ICcnKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmVhdHVyZVRvUmVzdWx0KFxyXG4gICAgZmVhdHVyZU9MOiBvbEZlYXR1cmUsXHJcbiAgICB6SW5kZXg6IG51bWJlcixcclxuICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz9cclxuICApOiBGZWF0dXJlIHtcclxuICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeSA9IGZlYXR1cmVPTC5nZXRHZW9tZXRyeSgpIGFzIGFueTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVPTC5nZXRQcm9wZXJ0aWVzKCkpO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuZ2VvbWV0cnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5ib3VuZGVkQnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5zaGFwZTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLlNIQVBFO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMudGhlX2dlb207XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5O1xyXG4gICAgaWYgKGZlYXR1cmVHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdlb21ldHJ5ID0ge1xyXG4gICAgICAgIHR5cGU6IGZlYXR1cmVHZW9tZXRyeS5nZXRUeXBlKCksXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IGZlYXR1cmVHZW9tZXRyeS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgcHJvamVjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICBnZW9tZXRyeSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSB6SW5kZXgsXHJcbiAgICAgICAgYWxpYXM6IGFsbG93ZWRGaWVsZHNBbmRBbGlhc1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVVybChcclxuICAgIGRhdGFzb3VyY2U6IFF1ZXJ5YWJsZURhdGFTb3VyY2UsXHJcbiAgICBvcHRpb25zOiBRdWVyeU9wdGlvbnMsXHJcbiAgICBmb3JjZUdNTDIgPSBmYWxzZVxyXG4gICk6IHN0cmluZyB7XHJcbiAgICBsZXQgdXJsO1xyXG4gICAgc3dpdGNoIChkYXRhc291cmNlLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgIGNhc2UgV01TRGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCB3bXNEYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlO1xyXG5cclxuICAgICAgICBjb25zdCBXTVNHZXRGZWF0dXJlSW5mb09wdGlvbnMgPSB7XHJcbiAgICAgICAgICBJTkZPX0ZPUk1BVDogd21zRGF0YXNvdXJjZS5wYXJhbXMuaW5mb19mb3JtYXQgfHxcclxuICAgICAgICAgICAgdGhpcy5nZXRNaW1lSW5mb0Zvcm1hdChkYXRhc291cmNlLm9wdGlvbnMucXVlcnlGb3JtYXQpLFxyXG4gICAgICAgICAgUVVFUllfTEFZRVJTOiB3bXNEYXRhc291cmNlLnBhcmFtcy5sYXllcnMsXHJcbiAgICAgICAgICBGRUFUVVJFX0NPVU5UOiB3bXNEYXRhc291cmNlLnBhcmFtcy5mZWF0dXJlX2NvdW50IHx8ICc1J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChmb3JjZUdNTDIpIHtcclxuICAgICAgICAgIFdNU0dldEZlYXR1cmVJbmZvT3B0aW9ucy5JTkZPX0ZPUk1BVCA9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TWltZUluZm9Gb3JtYXQoUXVlcnlGb3JtYXQuR01MMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cmwgPSB3bXNEYXRhc291cmNlLm9sLmdldEdldEZlYXR1cmVJbmZvVXJsKFxyXG4gICAgICAgICAgb3B0aW9ucy5jb29yZGluYXRlcyxcclxuICAgICAgICAgIG9wdGlvbnMucmVzb2x1dGlvbixcclxuICAgICAgICAgIG9wdGlvbnMucHJvamVjdGlvbixcclxuICAgICAgICAgIFdNU0dldEZlYXR1cmVJbmZvT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHdtc0RhdGFzb3VyY2UucGFyYW1zLnZlcnNpb24gIT09ICcxLjMuMCcpIHtcclxuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKCcmST0nLCAnJlg9Jyk7XHJcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgnJko9JywgJyZZPScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDYXJ0b0RhdGFTb3VyY2U6XHJcbiAgICAgICAgY29uc3QgY2FydG9EYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBDYXJ0b0RhdGFTb3VyY2U7XHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9XHJcbiAgICAgICAgICAnaHR0cHM6Ly8nICtcclxuICAgICAgICAgIGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLmFjY291bnQgK1xyXG4gICAgICAgICAgJy5jYXJ0by5jb20vYXBpL3YyL3NxbD8nO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdCA9ICdmb3JtYXQ9R2VvSlNPTic7XHJcbiAgICAgICAgY29uc3Qgc3FsID1cclxuICAgICAgICAgICcmcT0nICsgY2FydG9EYXRhc291cmNlLm9wdGlvbnMuY29uZmlnLmxheWVyc1swXS5vcHRpb25zLnNxbDtcclxuICAgICAgICBjb25zdCBjbGF1c2UgPVxyXG4gICAgICAgICAgJyBXSEVSRSBTVF9JbnRlcnNlY3RzKHRoZV9nZW9tX3dlYm1lcmNhdG9yLFNUX0JVRkZFUihTVF9TZXRTUklEKFNUX1BPSU5UKCc7XHJcbiAgICAgICAgY29uc3QgbWV0ZXJzID0gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgID8gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgIDogJzEwMDAnO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID1cclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMF0gK1xyXG4gICAgICAgICAgJywnICtcclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMV0gK1xyXG4gICAgICAgICAgJyksMzg1NyksJyArXHJcbiAgICAgICAgICBtZXRlcnMgK1xyXG4gICAgICAgICAgJykpJztcclxuXHJcbiAgICAgICAgdXJsID0gYCR7YmFzZVVybH0ke2Zvcm1hdH0ke3NxbH0ke2NsYXVzZX0ke2Nvb3JkaW5hdGVzfWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlO1xyXG4gICAgICAgIGxldCBleHRlbnQgPSBvbGV4dGVudC5ib3VuZGluZ0V4dGVudChbb3B0aW9ucy5jb29yZGluYXRlc10pO1xyXG4gICAgICAgIGlmICh0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvbikge1xyXG4gICAgICAgICAgZXh0ZW50ID0gb2xleHRlbnQuYnVmZmVyKFxyXG4gICAgICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID1cclxuICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnVybCArXHJcbiAgICAgICAgICAnLycgK1xyXG4gICAgICAgICAgdGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMubGF5ZXIgK1xyXG4gICAgICAgICAgJy9xdWVyeS8nO1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgJ3tcInhtaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzBdICtcclxuICAgICAgICAgICAgJyxcInltaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzFdICtcclxuICAgICAgICAgICAgJyxcInhtYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzJdICtcclxuICAgICAgICAgICAgJyxcInltYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzNdICtcclxuICAgICAgICAgICAgJyxcInNwYXRpYWxSZWZlcmVuY2VcIjp7XCJ3a2lkXCI6MTAyMTAwfX0nXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAnZj1qc29uJyxcclxuICAgICAgICAgIGBnZW9tZXRyeT0ke2dlb21ldHJ5fWAsXHJcbiAgICAgICAgICAnZ2VvbWV0cnlUeXBlPWVzcmlHZW9tZXRyeUVudmVsb3BlJyxcclxuICAgICAgICAgICdpblNSPTEwMjEwMCcsXHJcbiAgICAgICAgICAnc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnLFxyXG4gICAgICAgICAgJ291dEZpZWxkcz0qJyxcclxuICAgICAgICAgICdyZXR1cm5HZW9tZXRyeT10cnVlJyxcclxuICAgICAgICAgICdvdXRTUj0xMDIxMDAnXHJcbiAgICAgICAgXTtcclxuICAgICAgICB1cmwgPSBgJHtzZXJ2aWNlVXJsfT8ke3BhcmFtcy5qb2luKCcmJyl9YDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNaW1lSW5mb0Zvcm1hdChxdWVyeUZvcm1hdCkge1xyXG4gICAgbGV0IG1pbWU7XHJcbiAgICBzd2l0Y2ggKHF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMjpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL3ZuZC5vZ2MuZ21sJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwzOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vdm5kLm9nYy5nbWwvMy4xLjEnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkpTT046XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HRU9KU09OOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vZ2VvanNvbic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuVEVYVDpcclxuICAgICAgICBtaW1lID0gJ3RleHQvcGxhaW4nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUw6XHJcbiAgICAgICAgbWltZSA9ICd0ZXh0L2h0bWwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUxHTUwyOlxyXG4gICAgICAgIG1pbWUgPSAndGV4dC9odG1sJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL3ZuZC5vZ2MuZ21sJztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWltZTtcclxuICB9XHJcbn1cclxuIl19