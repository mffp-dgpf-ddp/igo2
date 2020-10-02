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
import { QueryFormat, QueryFormatMimeType, QueryHtmlTarget } from './query.enums';
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
        var e_2, _a;
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
            var geomToAdd = this.createGeometryFromUrlClick(url);
            try {
                for (var features_1 = tslib_1.__values(features), features_1_1 = features_1.next(); !features_1_1.done; features_1_1 = features_1.next()) {
                    var feature = features_1_1.value;
                    feature.geometry = geomToAdd;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (features_1_1 && !features_1_1.done && (_a = features_1.return)) _a.call(features_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
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
     * @param {?} url
     * @return {?}
     */
    QueryService.prototype.createGeometryFromUrlClick = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
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
        /** @type {?} */
        var newGeom = {
            type: f.getType(),
            coordinates: f.getCoordinates()
        };
        return newGeom;
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
        var features = [];
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
        /** @type {?} */
        var searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        var projection = searchParams.crs || searchParams.srs || 'EPSG:3857';
        /** @type {?} */
        var geomToAdd = this.createGeometryFromUrlClick(url);
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
                geometry: imposedGeometry || geomToAdd
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
        var mime = 'application/vnd.ogc.gml';
        /** @type {?} */
        var keyEnum = Object.keys(QueryFormat).find((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return QueryFormat[key] === queryFormat; }));
        if (keyEnum) {
            mime = QueryFormatMimeType[keyEnum];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBRWxDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTdELE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLHdCQUF3QixFQUV6QixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFDTCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLGVBQWUsRUFDaEIsTUFBTSxlQUFlLENBQUM7OztBQU92QjtJQU1FLHNCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRjdCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO0lBRVksQ0FBQzs7Ozs7O0lBRXhDLDRCQUFLOzs7OztJQUFMLFVBQU0sTUFBZSxFQUFFLE9BQXFCO1FBQTVDLGlCQUlDO1FBSEMs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LFVBQVU7O1lBQ3BDLEtBQUssR0FBRyxVQUFVOztZQUNoQixVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFdkUsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLENBQUM7WUFDbEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDLEVBQUMsQ0FBQztRQUVILDBDQUEwQztRQUMxQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbkQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDO1NBQ3REO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkF6b0JGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBcENRLFVBQVU7Ozt1QkFEbkI7Q0E2cUJDLEFBMW9CRCxJQTBvQkM7U0F2b0JZLFlBQVk7OztJQUN2QixvQ0FBMkI7Ozs7O0lBRWYsNEJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0ICogYXMgb2xleHRlbnQgZnJvbSAnb2wvZXh0ZW50JztcclxuaW1wb3J0IG9sRm9ybWF0R01MMiBmcm9tICdvbC9mb3JtYXQvR01MMic7XHJcbmltcG9ydCBvbEZvcm1hdEdNTDMgZnJvbSAnb2wvZm9ybWF0L0dNTDMnO1xyXG5pbXBvcnQgb2xGb3JtYXRFc3JpSlNPTiBmcm9tICdvbC9mb3JtYXQvRXNyaUpTT04nO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgKiBhcyBvbGdlb20gZnJvbSAnb2wvZ2VvbSc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQge1xyXG4gIFdNU0RhdGFTb3VyY2UsXHJcbiAgQ2FydG9EYXRhU291cmNlLFxyXG4gIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBXTVNEYXRhU291cmNlT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBRdWVyeUZvcm1hdCxcclxuICBRdWVyeUZvcm1hdE1pbWVUeXBlLFxyXG4gIFF1ZXJ5SHRtbFRhcmdldFxyXG59IGZyb20gJy4vcXVlcnkuZW51bXMnO1xyXG5pbXBvcnQge1xyXG4gIFF1ZXJ5T3B0aW9ucyxcclxuICBRdWVyeWFibGVEYXRhU291cmNlLFxyXG4gIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zXHJcbn0gZnJvbSAnLi9xdWVyeS5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5U2VydmljZSB7XHJcbiAgcHVibGljIHF1ZXJ5RW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgcXVlcnkobGF5ZXJzOiBMYXllcltdLCBvcHRpb25zOiBRdWVyeU9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT5bXSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzXHJcbiAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIudmlzaWJsZSAmJiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSlcclxuICAgICAgLm1hcCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLnF1ZXJ5TGF5ZXIobGF5ZXIsIG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIHF1ZXJ5TGF5ZXIobGF5ZXI6IExheWVyLCBvcHRpb25zOiBRdWVyeU9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRRdWVyeVVybChsYXllci5kYXRhU291cmNlLCBvcHRpb25zKTtcclxuICAgIGlmICghdXJsKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAobGF5ZXIuZGF0YVNvdXJjZSBhcyBRdWVyeWFibGVEYXRhU291cmNlKS5vcHRpb25zLnF1ZXJ5Rm9ybWF0ID09PVxyXG4gICAgICBRdWVyeUZvcm1hdC5IVE1MR01MMlxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHVybEdtbCA9IHRoaXMuZ2V0UXVlcnlVcmwobGF5ZXIuZGF0YVNvdXJjZSwgb3B0aW9ucywgdHJ1ZSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybEdtbCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS5waXBlKFxyXG4gICAgICAgIG1lcmdlTWFwKGdtbFJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpbXBvc2VkR2VvbSA9IHRoaXMubWVyZ2VHTUwoZ21sUmVzLCB1cmwpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAuZ2V0KHVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICBtYXAocmVzID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4dHJhY3REYXRhKHJlcywgbGF5ZXIsIG9wdGlvbnMsIHVybCwgaW1wb3NlZEdlb20pXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuaHR0cC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QucGlwZShtYXAocmVzID0+IHRoaXMuZXh0cmFjdERhdGEocmVzLCBsYXllciwgb3B0aW9ucywgdXJsKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtZXJnZUdNTChnbWxSZXMsIHVybCkge1xyXG4gICAgbGV0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEdNTDIoKTtcclxuICAgIGxldCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMoZ21sUmVzKTtcclxuICAgIC8vIEhhbmRsZSBub24gc3RhbmRhcmQgR01MIG91dHB1dCAoTWFwU2VydmVyKVxyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBwYXJzZXIgPSBuZXcgb2xmb3JtYXQuV01TR2V0RmVhdHVyZUluZm8oKTtcclxuICAgICAgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKGdtbFJlcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvbG1saW5lID0gbmV3IG9sZ2VvbS5NdWx0aUxpbmVTdHJpbmcoW10pO1xyXG4gICAgbGV0IHB0cztcclxuICAgIGNvbnN0IHB0c0FycmF5ID0gW107XHJcbiAgICBsZXQgb2xtcG9seSA9IG5ldyBvbGdlb20uTXVsdGlQb2x5Z29uKFtdKTtcclxuICAgIGxldCBmaXJzdEZlYXR1cmVUeXBlO1xyXG4gICAgY29uc3QgbmJGZWF0dXJlcyA9IGZlYXR1cmVzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBnZW9tZXRyeSBpbnRlcnNlY3QgYmJveFxyXG4gICAgLy8gZm9yIGdlb3NlcnZlciBnZXRmZWF0dXJlaW5mbyByZXNwb25zZSBpbiBkYXRhIHByb2plY3Rpb24sIG5vdCBjYWxsIHByb2plY3Rpb25cclxuICAgIGNvbnN0IHNlYXJjaFBhcmFtczogYW55ID0gdGhpcy5nZXRRdWVyeVBhcmFtcyh1cmwudG9Mb3dlckNhc2UoKSk7XHJcbiAgICBjb25zdCBiYm94UmF3ID0gc2VhcmNoUGFyYW1zLmJib3g7XHJcbiAgICBjb25zdCBiYm94ID0gYmJveFJhdy5zcGxpdCgnLCcpO1xyXG4gICAgY29uc3QgYmJveEV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcbiAgICBvbGV4dGVudC5leHRlbmQoYmJveEV4dGVudCwgYmJveCk7XHJcbiAgICBjb25zdCBvdXRCYm94RXh0ZW50ID0gZmFsc2U7XHJcbiAgICBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiB7XHJcbiAgICAgIC8qICBpZiAoIWZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5zaW1wbGlmeSgxMDApLmludGVyc2VjdHNFeHRlbnQoYmJveEV4dGVudCkpIHtcclxuICAgICAgICBvdXRCYm94RXh0ZW50ID0gdHJ1ZTtcclxuICAgICAgICAvLyBUT0RPOiBDaGVjayB0byBwcm9qZWN0IHRoZSBnZW9tZXRyeT9cclxuICAgICAgfSovXHJcbiAgICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeUNvb3JkaW5hdGVzID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeVR5cGUgPSBmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0VHlwZSgpO1xyXG5cclxuICAgICAgaWYgKCFmaXJzdEZlYXR1cmVUeXBlICYmICFvdXRCYm94RXh0ZW50KSB7XHJcbiAgICAgICAgZmlyc3RGZWF0dXJlVHlwZSA9IGZlYXR1cmVHZW9tZXRyeVR5cGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFvdXRCYm94RXh0ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChmZWF0dXJlR2VvbWV0cnlUeXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdQb2ludCc6XHJcbiAgICAgICAgICAgIGlmIChuYkZlYXR1cmVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgcHRzID0gbmV3IG9sZ2VvbS5Qb2ludChmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcywgJ1hZJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcHRzQXJyYXkucHVzaChmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdMaW5lU3RyaW5nJzpcclxuICAgICAgICAgICAgb2xtbGluZS5hcHBlbmRMaW5lU3RyaW5nKFxyXG4gICAgICAgICAgICAgIG5ldyBvbGdlb20uTGluZVN0cmluZyhmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcywgJ1hZJylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdQb2x5Z29uJzpcclxuICAgICAgICAgICAgb2xtcG9seS5hcHBlbmRQb2x5Z29uKFxyXG4gICAgICAgICAgICAgIG5ldyBvbGdlb20uUG9seWdvbihmZWF0dXJlR2VvbWV0cnlDb29yZGluYXRlcywgJ1hZJylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxyXG4gICAgICAgICAgICBvbG1wb2x5ID0gbmV3IG9sZ2VvbS5NdWx0aVBvbHlnb24oZmVhdHVyZUdlb21ldHJ5Q29vcmRpbmF0ZXMsICdYWScpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBvbG1wdHM7XHJcbiAgICBpZiAocHRzQXJyYXkubGVuZ3RoID09PSAwICYmIHB0cykge1xyXG4gICAgICBvbG1wdHMgPSB7XHJcbiAgICAgICAgdHlwZTogcHRzLmdldFR5cGUoKSxcclxuICAgICAgICBjb29yZGluYXRlczogcHRzLmdldENvb3JkaW5hdGVzKClcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9sbXB0cyA9IHtcclxuICAgICAgICB0eXBlOiAnUG9seWdvbicsXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IFt0aGlzLmNvbnZleEh1bGwocHRzQXJyYXkpXVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoZmlyc3RGZWF0dXJlVHlwZSkge1xyXG4gICAgICBjYXNlICdMaW5lU3RyaW5nJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogb2xtbGluZS5nZXRUeXBlKCksXHJcbiAgICAgICAgICBjb29yZGluYXRlczogb2xtbGluZS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSAnUG9pbnQnOlxyXG4gICAgICAgIHJldHVybiBvbG1wdHM7XHJcbiAgICAgIGNhc2UgJ1BvbHlnb24nOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiBvbG1wb2x5LmdldFR5cGUoKSxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBvbG1wb2x5LmdldENvb3JkaW5hdGVzKClcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiBvbG1wb2x5LmdldFR5cGUoKSxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBvbG1wb2x5LmdldENvb3JkaW5hdGVzKClcclxuICAgICAgICB9O1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyb3NzKGEsIGIsIG8pIHtcclxuICAgIHJldHVybiAoYVswXSAtIG9bMF0pICogKGJbMV0gLSBvWzFdKSAtIChhWzFdIC0gb1sxXSkgKiAoYlswXSAtIG9bMF0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHBvaW50cyBBbiBhcnJheSBvZiBbWCwgWV0gY29vcmRpbmF0ZXNcclxuICAgKiBUaGlzIG1ldGhvZCBpcyB1c2UgaW5zdGVhZCBvZiB0dXJmLmpzIGNvbnZleEh1bGwgYmVjYXVzZSBUdXJmIG5lZWRzIGF0IGxlYXN0IDMgcG9pbnQgdG8gbWFrZSBhIGh1bGwuXHJcbiAgICogaHR0cHM6Ly9lbi53aWtpYm9va3Mub3JnL3dpa2kvQWxnb3JpdGhtX0ltcGxlbWVudGF0aW9uL0dlb21ldHJ5L0NvbnZleF9odWxsL01vbm90b25lX2NoYWluI0phdmFTY3JpcHRcclxuICAgKi9cclxuICBjb252ZXhIdWxsKHBvaW50cykge1xyXG4gICAgcG9pbnRzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gPyBhWzFdIC0gYlsxXSA6IGFbMF0gLSBiWzBdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbG93ZXIgPSBbXTtcclxuICAgIGZvciAoY29uc3QgcG9pbnQgb2YgcG9pbnRzKSB7XHJcbiAgICAgIHdoaWxlIChcclxuICAgICAgICBsb3dlci5sZW5ndGggPj0gMiAmJlxyXG4gICAgICAgIHRoaXMuY3Jvc3MobG93ZXJbbG93ZXIubGVuZ3RoIC0gMl0sIGxvd2VyW2xvd2VyLmxlbmd0aCAtIDFdLCBwb2ludCkgPD0gMFxyXG4gICAgICApIHtcclxuICAgICAgICBsb3dlci5wb3AoKTtcclxuICAgICAgfVxyXG4gICAgICBsb3dlci5wdXNoKHBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cHBlciA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IHBvaW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICB3aGlsZSAoXHJcbiAgICAgICAgdXBwZXIubGVuZ3RoID49IDIgJiZcclxuICAgICAgICB0aGlzLmNyb3NzKFxyXG4gICAgICAgICAgdXBwZXJbdXBwZXIubGVuZ3RoIC0gMl0sXHJcbiAgICAgICAgICB1cHBlclt1cHBlci5sZW5ndGggLSAxXSxcclxuICAgICAgICAgIHBvaW50c1tpXVxyXG4gICAgICAgICkgPD0gMFxyXG4gICAgICApIHtcclxuICAgICAgICB1cHBlci5wb3AoKTtcclxuICAgICAgfVxyXG4gICAgICB1cHBlci5wdXNoKHBvaW50c1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBwZXIucG9wKCk7XHJcbiAgICBsb3dlci5wb3AoKTtcclxuICAgIHJldHVybiBsb3dlci5jb25jYXQodXBwZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShcclxuICAgIHJlcyxcclxuICAgIGxheWVyOiBMYXllcixcclxuICAgIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgaW1wb3NlZEdlb21ldHJ5P1xyXG4gICk6IEZlYXR1cmVbXSB7XHJcbiAgICBjb25zdCBxdWVyeURhdGFTb3VyY2UgPSBsYXllci5kYXRhU291cmNlIGFzIFF1ZXJ5YWJsZURhdGFTb3VyY2U7XHJcblxyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0gdGhpcy5nZXRBbGxvd2VkRmllbGRzQW5kQWxpYXMobGF5ZXIpO1xyXG4gICAgbGV0IGZlYXR1cmVzID0gW107XHJcbiAgICBzd2l0Y2ggKHF1ZXJ5RGF0YVNvdXJjZS5vcHRpb25zLnF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMzpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdNTDNEYXRhKFxyXG4gICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgbGF5ZXIuekluZGV4LFxyXG4gICAgICAgICAgYWxsb3dlZEZpZWxkc0FuZEFsaWFzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5KU09OOlxyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdFT0pTT046XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR0VPSlNPTjI6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RHZW9KU09ORGF0YShyZXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkVTUklKU09OOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0RXNyaUpTT05EYXRhKHJlcywgbGF5ZXIuekluZGV4KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5URVhUOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0VGV4dERhdGEocmVzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0SHRtbERhdGEoXHJcbiAgICAgICAgICByZXMsXHJcbiAgICAgICAgICBxdWVyeURhdGFTb3VyY2UucXVlcnlIdG1sVGFyZ2V0LFxyXG4gICAgICAgICAgdXJsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5IVE1MR01MMjpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEh0bWxEYXRhKFxyXG4gICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgcXVlcnlEYXRhU291cmNlLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICAgIHVybCxcclxuICAgICAgICAgIGltcG9zZWRHZW9tZXRyeVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMjpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdNTDJEYXRhKHJlcywgbGF5ZXIsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA+IDAgJiYgZmVhdHVyZXNbMF0uZ2VvbWV0cnkgPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBnZW9tVG9BZGQgPSB0aGlzLmNyZWF0ZUdlb21ldHJ5RnJvbVVybENsaWNrKHVybCk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGZlYXR1cmUgb2YgZmVhdHVyZXMpIHtcclxuICAgICAgICBmZWF0dXJlLmdlb21ldHJ5ID0gZ2VvbVRvQWRkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcCgoZmVhdHVyZTogRmVhdHVyZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICBjb25zdCBtYXBMYWJlbCA9IGZlYXR1cmUucHJvcGVydGllc1txdWVyeURhdGFTb3VyY2UubWFwTGFiZWxdO1xyXG5cclxuICAgICAgbGV0IGV4Y2x1ZGU7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3dtcycpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gbGF5ZXIub3B0aW9uc1xyXG4gICAgICAgICAgLnNvdXJjZU9wdGlvbnMgYXMgV01TRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgICAgICAgZXhjbHVkZSA9IHNvdXJjZU9wdGlvbnMgPyBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGUgOiB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB0aXRsZSA9IHRoaXMuZ2V0UXVlcnlUaXRsZShmZWF0dXJlLCBsYXllcik7XHJcbiAgICAgIGlmICghdGl0bGUgJiYgZmVhdHVyZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRpdGxlID0gYCR7bGF5ZXIudGl0bGV9ICgke2luZGV4ICsgMX0pYDtcclxuICAgICAgfSBlbHNlIGlmICghdGl0bGUpIHtcclxuICAgICAgICB0aXRsZSA9IGxheWVyLnRpdGxlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZS5tZXRhIHx8IHt9LCB7XHJcbiAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBtYXBUaXRsZTogbWFwTGFiZWwsXHJcbiAgICAgICAgc291cmNlVGl0bGU6IGxheWVyLnRpdGxlLFxyXG4gICAgICAgIG9yZGVyOiAxMDAwIC0gbGF5ZXIuekluZGV4LFxyXG4gICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGU6IGV4Y2x1ZGVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmZWF0dXJlLCB7XHJcbiAgICAgICAgbWV0YSxcclxuICAgICAgICBwcm9qZWN0aW9uOlxyXG4gICAgICAgICAgcXVlcnlEYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ2NhcnRvJ1xyXG4gICAgICAgICAgICA/ICdFUFNHOjQzMjYnXHJcbiAgICAgICAgICAgIDogb3B0aW9ucy5wcm9qZWN0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUdlb21ldHJ5RnJvbVVybENsaWNrKHVybCkge1xyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zOiBhbnkgPSB0aGlzLmdldFF1ZXJ5UGFyYW1zKHVybC50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGJib3hSYXcgPSBzZWFyY2hQYXJhbXMuYmJveDtcclxuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLndpZHRoLCAxMCk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaGVpZ2h0LCAxMCk7XHJcbiAgICBjb25zdCB4UG9zaXRpb24gPSBwYXJzZUludChzZWFyY2hQYXJhbXMuaSB8fCBzZWFyY2hQYXJhbXMueCwgMTApO1xyXG4gICAgY29uc3QgeVBvc2l0aW9uID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmogfHwgc2VhcmNoUGFyYW1zLnksIDEwKTtcclxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBzZWFyY2hQYXJhbXMuY3JzIHx8IHNlYXJjaFBhcmFtcy5zcnMgfHwgJ0VQU0c6Mzg1Nyc7XHJcblxyXG4gICAgY29uc3QgYmJveCA9IGJib3hSYXcuc3BsaXQoJywnKTtcclxuICAgIGxldCB0aHJlc2hvbGQgPVxyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgLSBNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMl0pKSkgKiAwLjA1O1xyXG5cclxuICAgIC8vIGZvciBjb250ZXh0IGluIGRlZ3JlZSAoRVBTRzo0MzI2LDQyNjkuLi4pXHJcbiAgICBpZiAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSkgPCAxODApIHtcclxuICAgICAgdGhyZXNob2xkID0gMC4wNDU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjbGlja3ggPVxyXG4gICAgICBwYXJzZUZsb2F0KGJib3hbMF0pICtcclxuICAgICAgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFswXSkgLSBwYXJzZUZsb2F0KGJib3hbMl0pKSAqIHhQb3NpdGlvbikgL1xyXG4gICAgICAgIHdpZHRoIC1cclxuICAgICAgdGhyZXNob2xkO1xyXG4gICAgY29uc3QgY2xpY2t5ID1cclxuICAgICAgcGFyc2VGbG9hdChiYm94WzFdKSArXHJcbiAgICAgIChNYXRoLmFicyhwYXJzZUZsb2F0KGJib3hbMV0pIC0gcGFyc2VGbG9hdChiYm94WzNdKSkgKiB5UG9zaXRpb24pIC9cclxuICAgICAgICBoZWlnaHQgLVxyXG4gICAgICB0aHJlc2hvbGQ7XHJcbiAgICBjb25zdCBjbGlja3gxID0gY2xpY2t4ICsgdGhyZXNob2xkICogMjtcclxuICAgIGNvbnN0IGNsaWNreTEgPSBjbGlja3kgKyB0aHJlc2hvbGQgKiAyO1xyXG5cclxuICAgIGNvbnN0IHdrdFBvbHkgPVxyXG4gICAgICAnUE9MWUdPTigoJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kxICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreDEgK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kxICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreDEgK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJykpJztcclxuXHJcbiAgICBjb25zdCBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuV0tUKCk7XHJcbiAgICBjb25zdCB0ZW5QZXJjZW50V2lkdGhHZW9tID0gZm9ybWF0LnJlYWRGZWF0dXJlKHdrdFBvbHkpO1xyXG4gICAgY29uc3QgZiA9IHRlblBlcmNlbnRXaWR0aEdlb20uZ2V0R2VvbWV0cnkoKSBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgbmV3R2VvbSA9IHtcclxuICAgICAgdHlwZTogZi5nZXRUeXBlKCksXHJcbiAgICAgIGNvb3JkaW5hdGVzOiBmLmdldENvb3JkaW5hdGVzKClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ld0dlb207XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHTUwyRGF0YShyZXMsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzPykge1xyXG4gICAgbGV0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEdNTDIoKTtcclxuICAgIGxldCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgIC8vIEhhbmRsZSBub24gc3RhbmRhcmQgR01MIG91dHB1dCAoTWFwU2VydmVyKVxyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBwYXJzZXIgPSBuZXcgb2xmb3JtYXQuV01TR2V0RmVhdHVyZUluZm8oKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAgICdxdWVyeS5zZXJ2aWNlOiBNdWx0aXBvbHlnb25zIGFyZSBiYWRseSBtYW5hZ2VkIGluIG1hcHNlcnZlciBpbiBHTUwyLiBVc2UgYW5vdGhlciBmb3JtYXQuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKGZlYXR1cmUgPT5cclxuICAgICAgdGhpcy5mZWF0dXJlVG9SZXN1bHQoZmVhdHVyZSwgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0R01MM0RhdGEocmVzLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz8pIHtcclxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEdNTDMoKTtcclxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncXVlcnkuc2VydmljZTogR01MMyBpcyBub3Qgd2VsbCBzdXBwb3J0ZWQnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHZW9KU09ORGF0YShyZXMpIHtcclxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgZmVhdHVyZXMgPSBKU09OLnBhcnNlKHJlcykuZmVhdHVyZXM7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncXVlcnkuc2VydmljZTogVW5hYmxlIHRvIHBhcnNlIGdlb2pzb24nLCAnXFxuJywgcmVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEVzcmlKU09ORGF0YShyZXMsIHpJbmRleCkge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0RXNyaUpTT04oKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PiB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFRleHREYXRhKHJlcykge1xyXG4gICAgLy8gVE9ET1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0SHRtbERhdGEoXHJcbiAgICByZXMsXHJcbiAgICBodG1sVGFyZ2V0OiBRdWVyeUh0bWxUYXJnZXQsXHJcbiAgICB1cmwsXHJcbiAgICBpbXBvc2VkR2VvbWV0cnk/XHJcbiAgKSB7XHJcbiAgICBjb25zdCBzZWFyY2hQYXJhbXM6IGFueSA9IHRoaXMuZ2V0UXVlcnlQYXJhbXModXJsLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHNlYXJjaFBhcmFtcy5jcnMgfHwgc2VhcmNoUGFyYW1zLnNycyB8fCAnRVBTRzozODU3JztcclxuICAgIGNvbnN0IGdlb21Ub0FkZCA9IHRoaXMuY3JlYXRlR2VvbWV0cnlGcm9tVXJsQ2xpY2sodXJsKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGh0bWxUYXJnZXQgIT09IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSyAmJlxyXG4gICAgICBodG1sVGFyZ2V0ICE9PSBRdWVyeUh0bWxUYXJnZXQuSUZSQU1FXHJcbiAgICApIHtcclxuICAgICAgaHRtbFRhcmdldCA9IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9keVRhZ1N0YXJ0ID0gcmVzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignPGJvZHk+Jyk7XHJcbiAgICBjb25zdCBib2R5VGFnRW5kID0gcmVzLnRvTG93ZXJDYXNlKCkubGFzdEluZGV4T2YoJzwvYm9keT4nKSArIDc7XHJcbiAgICAvLyByZXBsYWNlIFxcciBcXG4gIGFuZCAnICcgd2l0aCAnJyB0byB2YWxpZGF0ZSBpZiB0aGUgYm9keSBpcyByZWFsbHkgZW1wdHkuXHJcbiAgICBjb25zdCBib2R5ID0gcmVzLnNsaWNlKGJvZHlUYWdTdGFydCwgYm9keVRhZ0VuZCkucmVwbGFjZSgvKFxccnxcXG58XFxzKS9nLCAnJyk7XHJcbiAgICBpZiAoYm9keSA9PT0gJzxib2R5PjwvYm9keT4nIHx8IHJlcyA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb24sXHJcbiAgICAgICAgcHJvcGVydGllczogeyB0YXJnZXQ6IGh0bWxUYXJnZXQsIGJvZHk6IHJlcywgdXJsIH0sXHJcbiAgICAgICAgZ2VvbWV0cnk6IGltcG9zZWRHZW9tZXRyeSB8fCBnZW9tVG9BZGRcclxuICAgICAgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlcnlQYXJhbXModXJsKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHVybC5zcGxpdCgnPycpO1xyXG4gICAgaWYgKCFxdWVyeVN0cmluZ1sxXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYWlycyA9IHF1ZXJ5U3RyaW5nWzFdLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICBwYWlycy5mb3JFYWNoKHBhaXIgPT4ge1xyXG4gICAgICBwYWlyID0gcGFpci5zcGxpdCgnPScpO1xyXG4gICAgICByZXN1bHRbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSB8fCAnJyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmVhdHVyZVRvUmVzdWx0KFxyXG4gICAgZmVhdHVyZU9MOiBvbEZlYXR1cmUsXHJcbiAgICB6SW5kZXg6IG51bWJlcixcclxuICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz9cclxuICApOiBGZWF0dXJlIHtcclxuICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeSA9IGZlYXR1cmVPTC5nZXRHZW9tZXRyeSgpIGFzIGFueTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVPTC5nZXRQcm9wZXJ0aWVzKCkpO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuZ2VvbWV0cnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5ib3VuZGVkQnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5zaGFwZTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLlNIQVBFO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMudGhlX2dlb207XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5O1xyXG4gICAgaWYgKGZlYXR1cmVHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdlb21ldHJ5ID0ge1xyXG4gICAgICAgIHR5cGU6IGZlYXR1cmVHZW9tZXRyeS5nZXRUeXBlKCksXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IGZlYXR1cmVHZW9tZXRyeS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgcHJvamVjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICBnZW9tZXRyeSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSB6SW5kZXgsXHJcbiAgICAgICAgYWxpYXM6IGFsbG93ZWRGaWVsZHNBbmRBbGlhc1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVVybChcclxuICAgIGRhdGFzb3VyY2U6IFF1ZXJ5YWJsZURhdGFTb3VyY2UsXHJcbiAgICBvcHRpb25zOiBRdWVyeU9wdGlvbnMsXHJcbiAgICBmb3JjZUdNTDIgPSBmYWxzZVxyXG4gICk6IHN0cmluZyB7XHJcbiAgICBsZXQgdXJsO1xyXG4gICAgc3dpdGNoIChkYXRhc291cmNlLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgIGNhc2UgV01TRGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCB3bXNEYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBXTVNEYXRhU291cmNlO1xyXG5cclxuICAgICAgICBjb25zdCBXTVNHZXRGZWF0dXJlSW5mb09wdGlvbnMgPSB7XHJcbiAgICAgICAgICBJTkZPX0ZPUk1BVDpcclxuICAgICAgICAgICAgd21zRGF0YXNvdXJjZS5wYXJhbXMuSU5GT19GT1JNQVQgfHxcclxuICAgICAgICAgICAgdGhpcy5nZXRNaW1lSW5mb0Zvcm1hdChkYXRhc291cmNlLm9wdGlvbnMucXVlcnlGb3JtYXQpLFxyXG4gICAgICAgICAgUVVFUllfTEFZRVJTOiB3bXNEYXRhc291cmNlLnBhcmFtcy5MQVlFUlMsXHJcbiAgICAgICAgICBGRUFUVVJFX0NPVU5UOiB3bXNEYXRhc291cmNlLnBhcmFtcy5GRUFUVVJFX0NPVU5UIHx8ICc1J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChmb3JjZUdNTDIpIHtcclxuICAgICAgICAgIFdNU0dldEZlYXR1cmVJbmZvT3B0aW9ucy5JTkZPX0ZPUk1BVCA9IHRoaXMuZ2V0TWltZUluZm9Gb3JtYXQoXHJcbiAgICAgICAgICAgIFF1ZXJ5Rm9ybWF0LkdNTDJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cmwgPSB3bXNEYXRhc291cmNlLm9sLmdldEdldEZlYXR1cmVJbmZvVXJsKFxyXG4gICAgICAgICAgb3B0aW9ucy5jb29yZGluYXRlcyxcclxuICAgICAgICAgIG9wdGlvbnMucmVzb2x1dGlvbixcclxuICAgICAgICAgIG9wdGlvbnMucHJvamVjdGlvbixcclxuICAgICAgICAgIFdNU0dldEZlYXR1cmVJbmZvT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gY29uc3Qgd21zVmVyc2lvbiA9XHJcbiAgICAgICAgLy8gICB3bXNEYXRhc291cmNlLnBhcmFtcy5WRVJTSU9OIHx8XHJcbiAgICAgICAgLy8gICB3bXNEYXRhc291cmNlLnBhcmFtcy52ZXJzaW9uIHx8XHJcbiAgICAgICAgLy8gICAnMS4zLjAnO1xyXG4gICAgICAgIC8vIGlmICh3bXNWZXJzaW9uICE9PSAnMS4zLjAnKSB7XHJcbiAgICAgICAgLy8gICB1cmwgPSB1cmwucmVwbGFjZSgnJkk9JywgJyZYPScpO1xyXG4gICAgICAgIC8vICAgdXJsID0gdXJsLnJlcGxhY2UoJyZKPScsICcmWT0nKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2FydG9EYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IGNhcnRvRGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgQ2FydG9EYXRhU291cmNlO1xyXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPVxyXG4gICAgICAgICAgJ2h0dHBzOi8vJyArXHJcbiAgICAgICAgICBjYXJ0b0RhdGFzb3VyY2Uub3B0aW9ucy5hY2NvdW50ICtcclxuICAgICAgICAgICcuY2FydG8uY29tL2FwaS92Mi9zcWw/JztcclxuICAgICAgICBjb25zdCBmb3JtYXQgPSAnZm9ybWF0PUdlb0pTT04nO1xyXG4gICAgICAgIGNvbnN0IHNxbCA9XHJcbiAgICAgICAgICAnJnE9JyArIGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLmNvbmZpZy5sYXllcnNbMF0ub3B0aW9ucy5zcWw7XHJcbiAgICAgICAgY29uc3QgY2xhdXNlID1cclxuICAgICAgICAgICcgV0hFUkUgU1RfSW50ZXJzZWN0cyh0aGVfZ2VvbV93ZWJtZXJjYXRvcixTVF9CVUZGRVIoU1RfU2V0U1JJRChTVF9QT0lOVCgnO1xyXG4gICAgICAgIGNvbnN0IG1ldGVycyA9IGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICA/IGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICA6ICcxMDAwJztcclxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9XHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzWzBdICtcclxuICAgICAgICAgICcsJyArXHJcbiAgICAgICAgICBvcHRpb25zLmNvb3JkaW5hdGVzWzFdICtcclxuICAgICAgICAgICcpLDM4NTcpLCcgK1xyXG4gICAgICAgICAgbWV0ZXJzICtcclxuICAgICAgICAgICcpKSc7XHJcblxyXG4gICAgICAgIHVybCA9IGAke2Jhc2VVcmx9JHtmb3JtYXR9JHtzcWx9JHtjbGF1c2V9JHtjb29yZGluYXRlc31gO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTpcclxuICAgICAgICBjb25zdCB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2UgPSBkYXRhc291cmNlIGFzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTtcclxuICAgICAgICBsZXQgZXh0ZW50ID0gb2xleHRlbnQuYm91bmRpbmdFeHRlbnQoW29wdGlvbnMuY29vcmRpbmF0ZXNdKTtcclxuICAgICAgICBpZiAodGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb24pIHtcclxuICAgICAgICAgIGV4dGVudCA9IG9sZXh0ZW50LmJ1ZmZlcihcclxuICAgICAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgICAgICB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvblxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VydmljZVVybCA9XHJcbiAgICAgICAgICB0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy51cmwgK1xyXG4gICAgICAgICAgJy8nICtcclxuICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLmxheWVyICtcclxuICAgICAgICAgICcvcXVlcnkvJztcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IGVuY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICd7XCJ4bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFswXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsxXSArXHJcbiAgICAgICAgICAgICcsXCJ4bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsyXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFszXSArXHJcbiAgICAgICAgICAgICcsXCJzcGF0aWFsUmVmZXJlbmNlXCI6e1wid2tpZFwiOjEwMjEwMH19J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAgICAgJ2Y9anNvbicsXHJcbiAgICAgICAgICBgZ2VvbWV0cnk9JHtnZW9tZXRyeX1gLFxyXG4gICAgICAgICAgJ2dlb21ldHJ5VHlwZT1lc3JpR2VvbWV0cnlFbnZlbG9wZScsXHJcbiAgICAgICAgICAnaW5TUj0xMDIxMDAnLFxyXG4gICAgICAgICAgJ3NwYXRpYWxSZWw9ZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJyxcclxuICAgICAgICAgICdvdXRGaWVsZHM9KicsXHJcbiAgICAgICAgICAncmV0dXJuR2VvbWV0cnk9dHJ1ZScsXHJcbiAgICAgICAgICAnb3V0U1I9MTAyMTAwJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgdXJsID0gYCR7c2VydmljZVVybH0/JHtwYXJhbXMuam9pbignJicpfWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TWltZUluZm9Gb3JtYXQocXVlcnlGb3JtYXQ6IHN0cmluZykge1xyXG4gICAgbGV0IG1pbWUgPSAnYXBwbGljYXRpb24vdm5kLm9nYy5nbWwnO1xyXG4gICAgY29uc3Qga2V5RW51bSA9IE9iamVjdC5rZXlzKFF1ZXJ5Rm9ybWF0KS5maW5kKFxyXG4gICAgICBrZXkgPT4gUXVlcnlGb3JtYXRba2V5XSA9PT0gcXVlcnlGb3JtYXRcclxuICAgICk7XHJcbiAgICBpZiAoa2V5RW51bSkge1xyXG4gICAgICBtaW1lID0gUXVlcnlGb3JtYXRNaW1lVHlwZVtrZXlFbnVtXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWltZTtcclxuICB9XHJcblxyXG4gIGdldEFsbG93ZWRGaWVsZHNBbmRBbGlhcyhsYXllcjogYW55KSB7XHJcbiAgICBsZXQgYWxsb3dlZEZpZWxkc0FuZEFsaWFzO1xyXG4gICAgaWYgKFxyXG4gICAgICBsYXllci5vcHRpb25zICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlLm9wdGlvbnMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMgJiZcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID49IDFcclxuICAgICkge1xyXG4gICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXMgPSB7fTtcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VGaWVsZCA9PiB7XHJcbiAgICAgICAgY29uc3QgYWxpYXMgPSBzb3VyY2VGaWVsZC5hbGlhcyA/IHNvdXJjZUZpZWxkLmFsaWFzIDogc291cmNlRmllbGQubmFtZTtcclxuICAgICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXNbc291cmNlRmllbGQubmFtZV0gPSBhbGlhcztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWxsb3dlZEZpZWxkc0FuZEFsaWFzO1xyXG4gIH1cclxuXHJcbiAgZ2V0UXVlcnlUaXRsZShmZWF0dXJlOiBGZWF0dXJlLCBsYXllcjogTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHRpdGxlO1xyXG4gICAgaWYgKGxheWVyLm9wdGlvbnMgJiYgbGF5ZXIub3B0aW9ucy5zb3VyY2UgJiYgbGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucykge1xyXG4gICAgICBjb25zdCBkYXRhU291cmNlT3B0aW9ucyA9IGxheWVyLm9wdGlvbnMuc291cmNlXHJcbiAgICAgICAgLm9wdGlvbnMgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgICAgIGlmIChkYXRhU291cmNlT3B0aW9ucy5xdWVyeVRpdGxlKSB7XHJcbiAgICAgICAgdGl0bGUgPSB0aGlzLmdldExhYmVsTWF0Y2goZmVhdHVyZSwgZGF0YVNvdXJjZU9wdGlvbnMucXVlcnlUaXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGl0bGU7XHJcbiAgfVxyXG5cclxuICBnZXRMYWJlbE1hdGNoKGZlYXR1cmU6IEZlYXR1cmUsIGxhYmVsTWF0Y2gpOiBzdHJpbmcge1xyXG4gICAgbGV0IGxhYmVsID0gbGFiZWxNYXRjaDtcclxuICAgIGNvbnN0IGxhYmVsVG9HZXQgPSBBcnJheS5mcm9tKGxhYmVsTWF0Y2gubWF0Y2hBbGwoL1xcJFxceyhbXlxce1xcfV0rKVxcfS9nKSk7XHJcblxyXG4gICAgbGFiZWxUb0dldC5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UodlswXSwgZmVhdHVyZS5wcm9wZXJ0aWVzW3ZbMV1dKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE5vdGhpbmcgZG9uZT8gY2hlY2sgZmVhdHVyZSdzIGF0dHJpYnV0ZVxyXG4gICAgaWYgKGxhYmVsVG9HZXQubGVuZ3RoID09PSAwICYmIGxhYmVsID09PSBsYWJlbE1hdGNoKSB7XHJcbiAgICAgIGxhYmVsID0gZmVhdHVyZS5wcm9wZXJ0aWVzW2xhYmVsTWF0Y2hdIHx8IGxhYmVsTWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=