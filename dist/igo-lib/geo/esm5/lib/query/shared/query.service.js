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
     * @param {?} res
     * @param {?} layer
     * @param {?} options
     * @param {?} url
     * @return {?}
     */
    QueryService.prototype.extractData = /**
     * @private
     * @param {?} res
     * @param {?} layer
     * @param {?} options
     * @param {?} url
     * @return {?}
     */
    function (res, layer, options, url) {
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
     * @return {?}
     */
    QueryService.prototype.extractHtmlData = /**
     * @private
     * @param {?} res
     * @param {?} htmlTarget
     * @param {?} url
     * @return {?}
     */
    function (res, htmlTarget, url) {
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
                geometry: { type: f.getType(), coordinates: f.getCoordinates() }
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
     * @return {?}
     */
    QueryService.prototype.getQueryUrl = /**
     * @private
     * @param {?} datasource
     * @param {?} options
     * @return {?}
     */
    function (datasource, options) {
        /** @type {?} */
        var url;
        switch (datasource.constructor) {
            case WMSDataSource:
                /** @type {?} */
                var wmsDatasource = (/** @type {?} */ (datasource));
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
                var metres = cartoDatasource.options.queryPrecision
                    ? cartoDatasource.options.queryPrecision
                    : '1000';
                /** @type {?} */
                var coordinates = options.coordinates[0] +
                    ',' +
                    options.coordinates[1] +
                    '),3857),' +
                    metres +
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU3RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZix3QkFBd0IsRUFDekIsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRzdEO0lBTUUsc0JBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGN0IsaUJBQVksR0FBRyxJQUFJLENBQUM7SUFFWSxDQUFDOzs7Ozs7SUFFeEMsNEJBQUs7Ozs7O0lBQUwsVUFBTSxNQUFlLEVBQUUsT0FBcUI7UUFBNUMsaUJBSUM7UUFIQyxPQUFPLE1BQU07YUFDVixNQUFNOzs7O1FBQUMsVUFBQyxLQUFZLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsRUFBM0MsQ0FBMkMsRUFBQzthQUNyRSxHQUFHOzs7O1FBQUMsVUFBQyxLQUFZLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBL0IsQ0FBK0IsRUFBQyxDQUFDO0lBQzVELENBQUM7Ozs7OztJQUVELGlDQUFVOzs7OztJQUFWLFVBQVcsS0FBWSxFQUFFLE9BQXFCO1FBQTlDLGlCQVFDOztZQVBPLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNmOztZQUVLLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDNUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQTFDLENBQTBDLEVBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7Ozs7OztJQUVPLGtDQUFXOzs7Ozs7OztJQUFuQixVQUNFLEdBQUcsRUFDSCxLQUFZLEVBQ1osT0FBcUIsRUFDckIsR0FBVzs7WUFFTCxlQUFlLEdBQUcsbUJBQUEsS0FBSyxDQUFDLFVBQVUsRUFBdUI7O1lBRTNELHFCQUFxQjtRQUN6QixJQUNFLEtBQUssQ0FBQyxPQUFPO1lBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhO1lBQzNCLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVk7WUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQ3BEO1lBQ0EscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxXQUFXOztvQkFDcEQsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUN0RSxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2xELENBQUMsRUFBQyxDQUFDO1NBQ0o7O1lBQ0csUUFBUSxHQUFHLEVBQUU7UUFDakIsUUFBUSxlQUFlLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUMzQyxLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDN0IsR0FBRyxFQUNILEtBQUssQ0FBQyxNQUFNLEVBQ1oscUJBQXFCLENBQ3RCLENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQztZQUN0QixLQUFLLFdBQVcsQ0FBQyxPQUFPO2dCQUN0QixRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsUUFBUTtnQkFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2RCxNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSTtnQkFDbkIsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDN0IsR0FBRyxFQUNILGVBQWUsQ0FBQyxlQUFlLEVBQy9CLEdBQUcsQ0FDSixDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDdEI7Z0JBQ0UsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNO1NBQ1Q7UUFFRCxPQUFPLFFBQVEsQ0FBQyxHQUFHOzs7OztRQUFDLFVBQUMsT0FBZ0IsRUFBRSxLQUFhOztnQkFDOUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxLQUFLLEdBQU0sS0FBSyxDQUFDLEtBQUssV0FBSyxLQUFLLEdBQUcsQ0FBQyxPQUFHLENBQUM7YUFDekM7aUJBQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDakIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDckI7O2dCQUNLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRTtnQkFDakQsRUFBRSxFQUFFLElBQUksRUFBRTtnQkFDVixLQUFLLE9BQUE7Z0JBQ0wsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsV0FBVyxFQUFFLEtBQUssQ0FBQyxLQUFLO2dCQUN4QixLQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNO2FBQzNCLENBQUM7WUFFRixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUM1QixJQUFJLE1BQUE7Z0JBQ0osVUFBVSxFQUNSLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU87b0JBQ3RDLENBQUMsQ0FBQyxXQUFXO29CQUNiLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVTthQUN6QixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7O0lBRU8sc0NBQWU7Ozs7Ozs7SUFBdkIsVUFBd0IsR0FBRyxFQUFFLE1BQU0sRUFBRSxxQkFBc0I7UUFBM0QsaUJBWUM7O1lBWEssTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFOztZQUMzQixRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDdkMsNkNBQTZDO1FBQzdDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDMUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7UUFFRCxPQUFPLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxPQUFPO1lBQ3pCLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixDQUFDO1FBQTVELENBQTRELEVBQzdELENBQUM7SUFDSixDQUFDOzs7Ozs7OztJQUVPLHNDQUFlOzs7Ozs7O0lBQXZCLFVBQXdCLEdBQUcsRUFBRSxNQUFNLEVBQUUscUJBQXNCO1FBQTNELGlCQU1DOztZQUxPLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRTs7WUFDM0IsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQ3pDLE9BQU8sUUFBUSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLE9BQU87WUFDekIsT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUscUJBQXFCLENBQUM7UUFBNUQsQ0FBNEQsRUFDN0QsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLHlDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsR0FBRzs7WUFDeEIsUUFBUSxHQUFHLEVBQUU7UUFDakIsSUFBSTtZQUNGLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUNyQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7Ozs7O0lBRU8sMENBQW1COzs7Ozs7SUFBM0IsVUFBNEIsR0FBRyxFQUFFLE1BQU07UUFBdkMsaUJBS0M7O1lBSk8sTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUU7O1lBQy9CLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUV6QyxPQUFPLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBckMsQ0FBcUMsRUFBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7OztJQUVPLHNDQUFlOzs7OztJQUF2QixVQUF3QixHQUFHO1FBQ3pCLE9BQU87UUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7Ozs7O0lBRU8sc0NBQWU7Ozs7Ozs7SUFBdkIsVUFBd0IsR0FBRyxFQUFFLFVBQTJCLEVBQUUsR0FBRzs7O1lBRXJELFlBQVksR0FBUSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7WUFDMUQsT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJOztZQUMzQixLQUFLLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztZQUN4QyxNQUFNLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDOztZQUMxQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7O1lBQzFELFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7WUFDMUQsVUFBVSxHQUFHLFlBQVksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsSUFBSSxXQUFXOztZQUVoRSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBQzNCLFNBQVMsR0FDWCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUk7UUFFeEUsNENBQTRDO1FBQzVDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDdkMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUNuQjs7WUFFSyxNQUFNLEdBQ1YsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDL0QsS0FBSztZQUNQLFNBQVM7O1lBQ0wsTUFBTSxHQUNWLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQy9ELE1BQU07WUFDUixTQUFTOztZQUNMLE9BQU8sR0FBRyxNQUFNLEdBQUcsU0FBUyxHQUFHLENBQUM7O1lBQ2hDLE9BQU8sR0FBRyxNQUFNLEdBQUcsU0FBUyxHQUFHLENBQUM7O1lBRWhDLE9BQU8sR0FDWCxXQUFXO1lBQ1gsTUFBTTtZQUNOLEdBQUc7WUFDSCxNQUFNO1lBQ04sSUFBSTtZQUNKLE1BQU07WUFDTixHQUFHO1lBQ0gsT0FBTztZQUNQLElBQUk7WUFDSixPQUFPO1lBQ1AsR0FBRztZQUNILE9BQU87WUFDUCxJQUFJO1lBQ0osT0FBTztZQUNQLEdBQUc7WUFDSCxNQUFNO1lBQ04sSUFBSTtZQUNKLE1BQU07WUFDTixHQUFHO1lBQ0gsTUFBTTtZQUNOLElBQUk7O1lBRUEsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRTs7WUFDM0IsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7O1lBQ2pELENBQUMsR0FBRyxtQkFBQSxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsRUFBTztRQUVsRCxJQUNFLFVBQVUsS0FBSyxlQUFlLENBQUMsS0FBSztZQUNwQyxVQUFVLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFDckM7WUFDQSxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztTQUNyQzs7WUFFSyxZQUFZLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBQ2xELFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7OztZQUV6RCxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7UUFDM0UsSUFBSSxJQUFJLEtBQUssZUFBZSxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFDMUMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE9BQU87WUFDTDtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixVQUFVLFlBQUE7Z0JBQ1YsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBQSxFQUFFO2dCQUNsRCxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7YUFDakU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU8scUNBQWM7Ozs7O0lBQXRCLFVBQXVCLEdBQUc7O1lBQ2xCLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ25CLE9BQU87U0FDUjs7WUFDSyxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBRWpDLE1BQU0sR0FBRyxFQUFFO1FBQ2pCLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxJQUFJO1lBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7OztJQUVPLHNDQUFlOzs7Ozs7O0lBQXZCLFVBQ0UsU0FBb0IsRUFDcEIsTUFBYyxFQUNkLHFCQUFzQjs7WUFFaEIsZUFBZSxHQUFHLG1CQUFBLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBTzs7WUFDaEQsVUFBVSxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNwRSxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzVCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN4QixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDeEIsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDOztZQUV2QixRQUFRO1FBQ1osSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ2pDLFFBQVEsR0FBRztnQkFDVCxJQUFJLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsV0FBVyxFQUFFLGVBQWUsQ0FBQyxjQUFjLEVBQUU7YUFDOUMsQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxZQUFBO1lBQ1YsUUFBUSxVQUFBO1lBQ1IsSUFBSSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxJQUFJLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLElBQUksR0FBRyxNQUFNO2dCQUNwQixLQUFLLEVBQUUscUJBQXFCO2FBQzdCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7SUFFTyxrQ0FBVzs7Ozs7O0lBQW5CLFVBQ0UsVUFBK0IsRUFDL0IsT0FBcUI7O1lBRWpCLEdBQUc7UUFDUCxRQUFRLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDOUIsS0FBSyxhQUFhOztvQkFDVixhQUFhLEdBQUcsbUJBQUEsVUFBVSxFQUFpQjtnQkFDakQsR0FBRyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQ3pDLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCO29CQUNFLFdBQVcsRUFDVCxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVc7d0JBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFDeEQsWUFBWSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTTtvQkFDekMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLEdBQUc7aUJBQ3pELENBQ0YsQ0FBQztnQkFDRixJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDNUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2dCQUNELE1BQU07WUFDUixLQUFLLGVBQWU7O29CQUNaLGVBQWUsR0FBRyxtQkFBQSxVQUFVLEVBQW1COztvQkFDL0MsT0FBTyxHQUNYLFVBQVU7b0JBQ1YsZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPO29CQUMvQix3QkFBd0I7O29CQUNwQixNQUFNLEdBQUcsZ0JBQWdCOztvQkFDekIsR0FBRyxHQUNQLEtBQUssR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUc7O29CQUN4RCxNQUFNLEdBQ1YsMEVBQTBFOztvQkFDdEUsTUFBTSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYztvQkFDbkQsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYztvQkFDeEMsQ0FBQyxDQUFDLE1BQU07O29CQUNKLFdBQVcsR0FDZixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsR0FBRztvQkFDSCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsVUFBVTtvQkFDVixNQUFNO29CQUNOLElBQUk7Z0JBRU4sR0FBRyxHQUFHLEtBQUcsT0FBTyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLFdBQWEsQ0FBQztnQkFDekQsTUFBTTtZQUNSLEtBQUssd0JBQXdCOztvQkFDckIsd0JBQXdCLEdBQUcsbUJBQUEsVUFBVSxFQUE0Qjs7b0JBQ25FLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7b0JBQ25ELE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUN0QixNQUFNLEVBQ04sd0JBQXdCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDaEQsQ0FBQztpQkFDSDs7b0JBQ0ssVUFBVSxHQUNkLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxHQUFHO29CQUNwQyxHQUFHO29CQUNILHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxLQUFLO29CQUN0QyxTQUFTOztvQkFDTCxRQUFRLEdBQUcsa0JBQWtCLENBQ2pDLFVBQVU7b0JBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxVQUFVO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVTtvQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULFVBQVU7b0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxzQ0FBc0MsQ0FDekM7O29CQUNLLE1BQU0sR0FBRztvQkFDYixRQUFRO29CQUNSLGNBQVksUUFBVTtvQkFDdEIsbUNBQW1DO29CQUNuQyxhQUFhO29CQUNiLHFDQUFxQztvQkFDckMsYUFBYTtvQkFDYixxQkFBcUI7b0JBQ3JCLGNBQWM7aUJBQ2Y7Z0JBQ0QsR0FBRyxHQUFNLFVBQVUsU0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDO2dCQUMxQyxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs7Ozs7SUFFTyx3Q0FBaUI7Ozs7O0lBQXpCLFVBQTBCLFdBQVc7O1lBQy9CLElBQUk7UUFDUixRQUFRLFdBQVcsRUFBRTtZQUNuQixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcseUJBQXlCLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcsK0JBQStCLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzFCLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxPQUFPO2dCQUN0QixJQUFJLEdBQUcscUJBQXFCLENBQUM7Z0JBQzdCLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUNwQixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSTtnQkFDbkIsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDbkIsTUFBTTtZQUNSO2dCQUNFLElBQUksR0FBRyx5QkFBeUIsQ0FBQztnQkFDakMsTUFBTTtTQUNUO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkEvWUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkExQlEsVUFBVTs7O3VCQURuQjtDQXlhQyxBQWhaRCxJQWdaQztTQTdZWSxZQUFZOzs7SUFDdkIsb0NBQTJCOzs7OztJQUVmLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0ICogYXMgb2xleHRlbnQgZnJvbSAnb2wvZXh0ZW50JztcclxuaW1wb3J0IG9sRm9ybWF0R01MMiBmcm9tICdvbC9mb3JtYXQvR01MMic7XHJcbmltcG9ydCBvbEZvcm1hdEdNTDMgZnJvbSAnb2wvZm9ybWF0L0dNTDMnO1xyXG5pbXBvcnQgb2xGb3JtYXRFc3JpSlNPTiBmcm9tICdvbC9mb3JtYXQvRXNyaUpTT04nO1xyXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZFQVRVUkUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHtcclxuICBXTVNEYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2VcclxufSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IFF1ZXJ5Rm9ybWF0LCBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuL3F1ZXJ5LmVudW1zJztcclxuaW1wb3J0IHsgUXVlcnlPcHRpb25zLCBRdWVyeWFibGVEYXRhU291cmNlIH0gZnJvbSAnLi9xdWVyeS5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFF1ZXJ5U2VydmljZSB7XHJcbiAgcHVibGljIHF1ZXJ5RW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgcXVlcnkobGF5ZXJzOiBMYXllcltdLCBvcHRpb25zOiBRdWVyeU9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT5bXSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzXHJcbiAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIudmlzaWJsZSAmJiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSlcclxuICAgICAgLm1hcCgobGF5ZXI6IExheWVyKSA9PiB0aGlzLnF1ZXJ5TGF5ZXIobGF5ZXIsIG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIHF1ZXJ5TGF5ZXIobGF5ZXI6IExheWVyLCBvcHRpb25zOiBRdWVyeU9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRRdWVyeVVybChsYXllci5kYXRhU291cmNlLCBvcHRpb25zKTtcclxuICAgIGlmICghdXJsKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuaHR0cC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3QucGlwZShtYXAocmVzID0+IHRoaXMuZXh0cmFjdERhdGEocmVzLCBsYXllciwgb3B0aW9ucywgdXJsKSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShcclxuICAgIHJlcyxcclxuICAgIGxheWVyOiBMYXllcixcclxuICAgIG9wdGlvbnM6IFF1ZXJ5T3B0aW9ucyxcclxuICAgIHVybDogc3RyaW5nXHJcbiAgKTogRmVhdHVyZVtdIHtcclxuICAgIGNvbnN0IHF1ZXJ5RGF0YVNvdXJjZSA9IGxheWVyLmRhdGFTb3VyY2UgYXMgUXVlcnlhYmxlRGF0YVNvdXJjZTtcclxuXHJcbiAgICBsZXQgYWxsb3dlZEZpZWxkc0FuZEFsaWFzO1xyXG4gICAgaWYgKFxyXG4gICAgICBsYXllci5vcHRpb25zICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyAmJlxyXG4gICAgICBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzICYmXHJcbiAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMubGVuZ3RoID49IDFcclxuICAgICkge1xyXG4gICAgICBhbGxvd2VkRmllbGRzQW5kQWxpYXMgPSB7fTtcclxuICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcy5mb3JFYWNoKHNvdXJjZUZpZWxkID0+IHtcclxuICAgICAgICBjb25zdCBhbGlhcyA9IHNvdXJjZUZpZWxkLmFsaWFzID8gc291cmNlRmllbGQuYWxpYXMgOiBzb3VyY2VGaWVsZC5uYW1lO1xyXG4gICAgICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhc1tzb3VyY2VGaWVsZC5uYW1lXSA9IGFsaWFzO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxldCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgc3dpdGNoIChxdWVyeURhdGFTb3VyY2Uub3B0aW9ucy5xdWVyeUZvcm1hdCkge1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkdNTDM6XHJcbiAgICAgICAgZmVhdHVyZXMgPSB0aGlzLmV4dHJhY3RHTUwzRGF0YShcclxuICAgICAgICAgIHJlcyxcclxuICAgICAgICAgIGxheWVyLnpJbmRleCxcclxuICAgICAgICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuSlNPTjpcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HRU9KU09OOlxyXG4gICAgICAgIGZlYXR1cmVzID0gdGhpcy5leHRyYWN0R2VvSlNPTkRhdGEocmVzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5FU1JJSlNPTjpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEVzcmlKU09ORGF0YShyZXMsIGxheWVyLnpJbmRleCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuVEVYVDpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdFRleHREYXRhKHJlcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuSFRNTDpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEh0bWxEYXRhKFxyXG4gICAgICAgICAgcmVzLFxyXG4gICAgICAgICAgcXVlcnlEYXRhU291cmNlLnF1ZXJ5SHRtbFRhcmdldCxcclxuICAgICAgICAgIHVybFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMjpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBmZWF0dXJlcyA9IHRoaXMuZXh0cmFjdEdNTDJEYXRhKHJlcywgbGF5ZXIsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzLm1hcCgoZmVhdHVyZTogRmVhdHVyZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICBsZXQgdGl0bGUgPSBmZWF0dXJlLnByb3BlcnRpZXNbcXVlcnlEYXRhU291cmNlLnF1ZXJ5VGl0bGVdO1xyXG4gICAgICBpZiAoIXRpdGxlICYmIGZlYXR1cmVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aXRsZSA9IGAke2xheWVyLnRpdGxlfSAoJHtpbmRleCArIDF9KWA7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRpdGxlKSB7XHJcbiAgICAgICAgdGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBtZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZS5tZXRhIHx8IHt9LCB7XHJcbiAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBtYXBUaXRsZTogdGl0bGUsXHJcbiAgICAgICAgc291cmNlVGl0bGU6IGxheWVyLnRpdGxlLFxyXG4gICAgICAgIG9yZGVyOiAxMDAwIC0gbGF5ZXIuekluZGV4XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZmVhdHVyZSwge1xyXG4gICAgICAgIG1ldGEsXHJcbiAgICAgICAgcHJvamVjdGlvbjpcclxuICAgICAgICAgIHF1ZXJ5RGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICdjYXJ0bydcclxuICAgICAgICAgICAgPyAnRVBTRzo0MzI2J1xyXG4gICAgICAgICAgICA6IG9wdGlvbnMucHJvamVjdGlvblxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0R01MMkRhdGEocmVzLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz8pIHtcclxuICAgIGxldCBwYXJzZXIgPSBuZXcgb2xGb3JtYXRHTUwyKCk7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICAvLyBIYW5kbGUgbm9uIHN0YW5kYXJkIEdNTCBvdXRwdXQgKE1hcFNlcnZlcilcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcGFyc2VyID0gbmV3IG9sZm9ybWF0LldNU0dldEZlYXR1cmVJbmZvKCk7XHJcbiAgICAgIGZlYXR1cmVzID0gcGFyc2VyLnJlYWRGZWF0dXJlcyhyZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcy5tYXAoZmVhdHVyZSA9PlxyXG4gICAgICB0aGlzLmZlYXR1cmVUb1Jlc3VsdChmZWF0dXJlLCB6SW5kZXgsIGFsbG93ZWRGaWVsZHNBbmRBbGlhcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RHTUwzRGF0YShyZXMsIHpJbmRleCwgYWxsb3dlZEZpZWxkc0FuZEFsaWFzPykge1xyXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IG9sRm9ybWF0R01MMygpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBwYXJzZXIucmVhZEZlYXR1cmVzKHJlcyk7XHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKGZlYXR1cmUgPT5cclxuICAgICAgdGhpcy5mZWF0dXJlVG9SZXN1bHQoZmVhdHVyZSwgekluZGV4LCBhbGxvd2VkRmllbGRzQW5kQWxpYXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0R2VvSlNPTkRhdGEocmVzKSB7XHJcbiAgICBsZXQgZmVhdHVyZXMgPSBbXTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGZlYXR1cmVzID0gSlNPTi5wYXJzZShyZXMpLmZlYXR1cmVzO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ3F1ZXJ5LnNlcnZpY2U6IFVuYWJsZSB0byBwYXJzZSBnZW9qc29uJywgJ1xcbicsIHJlcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RFc3JpSlNPTkRhdGEocmVzLCB6SW5kZXgpIHtcclxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBvbEZvcm1hdEVzcmlKU09OKCk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IHBhcnNlci5yZWFkRmVhdHVyZXMocmVzKTtcclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXMubWFwKGZlYXR1cmUgPT4gdGhpcy5mZWF0dXJlVG9SZXN1bHQoZmVhdHVyZSwgekluZGV4KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RUZXh0RGF0YShyZXMpIHtcclxuICAgIC8vIFRPRE9cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEh0bWxEYXRhKHJlcywgaHRtbFRhcmdldDogUXVlcnlIdG1sVGFyZ2V0LCB1cmwpIHtcclxuICAgIC8vIF9ibGFuayAsIGlmcmFtZSBvciB1bmRlZmluZWRcclxuICAgIGNvbnN0IHNlYXJjaFBhcmFtczogYW55ID0gdGhpcy5nZXRRdWVyeVBhcmFtcyh1cmwudG9Mb3dlckNhc2UoKSk7XHJcbiAgICBjb25zdCBiYm94UmF3ID0gc2VhcmNoUGFyYW1zLmJib3g7XHJcbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy53aWR0aCwgMTApO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmhlaWdodCwgMTApO1xyXG4gICAgY29uc3QgeFBvc2l0aW9uID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmkgfHwgc2VhcmNoUGFyYW1zLngsIDEwKTtcclxuICAgIGNvbnN0IHlQb3NpdGlvbiA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5qIHx8IHNlYXJjaFBhcmFtcy55LCAxMCk7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gc2VhcmNoUGFyYW1zLmNycyB8fCBzZWFyY2hQYXJhbXMuc3JzIHx8ICdFUFNHOjM4NTcnO1xyXG5cclxuICAgIGNvbnN0IGJib3ggPSBiYm94UmF3LnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgdGhyZXNob2xkID1cclxuICAgICAgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFswXSkpIC0gTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzJdKSkpICogMC4wNTtcclxuXHJcbiAgICAvLyBmb3IgY29udGV4dCBpbiBkZWdyZWUgKEVQU0c6NDMyNiw0MjY5Li4uKVxyXG4gICAgaWYgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFswXSkpIDwgMTgwKSB7XHJcbiAgICAgIHRocmVzaG9sZCA9IDAuMDQ1O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsaWNreCA9XHJcbiAgICAgIHBhcnNlRmxvYXQoYmJveFswXSkgK1xyXG4gICAgICAoTWF0aC5hYnMocGFyc2VGbG9hdChiYm94WzBdKSAtIHBhcnNlRmxvYXQoYmJveFsyXSkpICogeFBvc2l0aW9uKSAvXHJcbiAgICAgICAgd2lkdGggLVxyXG4gICAgICB0aHJlc2hvbGQ7XHJcbiAgICBjb25zdCBjbGlja3kgPVxyXG4gICAgICBwYXJzZUZsb2F0KGJib3hbMV0pICtcclxuICAgICAgKE1hdGguYWJzKHBhcnNlRmxvYXQoYmJveFsxXSkgLSBwYXJzZUZsb2F0KGJib3hbM10pKSAqIHlQb3NpdGlvbikgL1xyXG4gICAgICAgIGhlaWdodCAtXHJcbiAgICAgIHRocmVzaG9sZDtcclxuICAgIGNvbnN0IGNsaWNreDEgPSBjbGlja3ggKyB0aHJlc2hvbGQgKiAyO1xyXG4gICAgY29uc3QgY2xpY2t5MSA9IGNsaWNreSArIHRocmVzaG9sZCAqIDI7XHJcblxyXG4gICAgY29uc3Qgd2t0UG9seSA9XHJcbiAgICAgICdQT0xZR09OKCgnICtcclxuICAgICAgY2xpY2t4ICtcclxuICAgICAgJyAnICtcclxuICAgICAgY2xpY2t5ICtcclxuICAgICAgJywgJyArXHJcbiAgICAgIGNsaWNreCArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreTEgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4MSArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreTEgK1xyXG4gICAgICAnLCAnICtcclxuICAgICAgY2xpY2t4MSArXHJcbiAgICAgICcgJyArXHJcbiAgICAgIGNsaWNreSArXHJcbiAgICAgICcsICcgK1xyXG4gICAgICBjbGlja3ggK1xyXG4gICAgICAnICcgK1xyXG4gICAgICBjbGlja3kgK1xyXG4gICAgICAnKSknO1xyXG5cclxuICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5XS1QoKTtcclxuICAgIGNvbnN0IHRlblBlcmNlbnRXaWR0aEdlb20gPSBmb3JtYXQucmVhZEZlYXR1cmUod2t0UG9seSk7XHJcbiAgICBjb25zdCBmID0gdGVuUGVyY2VudFdpZHRoR2VvbS5nZXRHZW9tZXRyeSgpIGFzIGFueTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGh0bWxUYXJnZXQgIT09IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSyAmJlxyXG4gICAgICBodG1sVGFyZ2V0ICE9PSBRdWVyeUh0bWxUYXJnZXQuSUZSQU1FXHJcbiAgICApIHtcclxuICAgICAgaHRtbFRhcmdldCA9IFF1ZXJ5SHRtbFRhcmdldC5JRlJBTUU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9keVRhZ1N0YXJ0ID0gcmVzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignPGJvZHk+Jyk7XHJcbiAgICBjb25zdCBib2R5VGFnRW5kID0gcmVzLnRvTG93ZXJDYXNlKCkubGFzdEluZGV4T2YoJzwvYm9keT4nKSArIDc7XHJcbiAgICAvLyByZXBsYWNlIFxcciBcXG4gIGFuZCAnICcgd2l0aCAnJyB0byB2YWxpZGF0ZSBpZiB0aGUgYm9keSBpcyByZWFsbHkgZW1wdHkuXHJcbiAgICBjb25zdCBib2R5ID0gcmVzLnNsaWNlKGJvZHlUYWdTdGFydCwgYm9keVRhZ0VuZCkucmVwbGFjZSgvKFxccnxcXG58XFxzKS9nLCAnJyk7XHJcbiAgICBpZiAoYm9keSA9PT0gJzxib2R5PjwvYm9keT4nIHx8IHJlcyA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICAgIHByb2plY3Rpb24sXHJcbiAgICAgICAgcHJvcGVydGllczogeyB0YXJnZXQ6IGh0bWxUYXJnZXQsIGJvZHk6IHJlcywgdXJsIH0sXHJcbiAgICAgICAgZ2VvbWV0cnk6IHsgdHlwZTogZi5nZXRUeXBlKCksIGNvb3JkaW5hdGVzOiBmLmdldENvb3JkaW5hdGVzKCkgfVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVBhcmFtcyh1cmwpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gdXJsLnNwbGl0KCc/Jyk7XHJcbiAgICBpZiAoIXF1ZXJ5U3RyaW5nWzFdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhaXJzID0gcXVlcnlTdHJpbmdbMV0uc3BsaXQoJyYnKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgIHBhaXJzLmZvckVhY2gocGFpciA9PiB7XHJcbiAgICAgIHBhaXIgPSBwYWlyLnNwbGl0KCc9Jyk7XHJcbiAgICAgIHJlc3VsdFtwYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdIHx8ICcnKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmVhdHVyZVRvUmVzdWx0KFxyXG4gICAgZmVhdHVyZU9MOiBvbEZlYXR1cmUsXHJcbiAgICB6SW5kZXg6IG51bWJlcixcclxuICAgIGFsbG93ZWRGaWVsZHNBbmRBbGlhcz9cclxuICApOiBGZWF0dXJlIHtcclxuICAgIGNvbnN0IGZlYXR1cmVHZW9tZXRyeSA9IGZlYXR1cmVPTC5nZXRHZW9tZXRyeSgpIGFzIGFueTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmVPTC5nZXRQcm9wZXJ0aWVzKCkpO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMuZ2VvbWV0cnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5ib3VuZGVkQnk7XHJcbiAgICBkZWxldGUgcHJvcGVydGllcy5zaGFwZTtcclxuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLlNIQVBFO1xyXG4gICAgZGVsZXRlIHByb3BlcnRpZXMudGhlX2dlb207XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5O1xyXG4gICAgaWYgKGZlYXR1cmVHZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdlb21ldHJ5ID0ge1xyXG4gICAgICAgIHR5cGU6IGZlYXR1cmVHZW9tZXRyeS5nZXRUeXBlKCksXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IGZlYXR1cmVHZW9tZXRyeS5nZXRDb29yZGluYXRlcygpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgcHJvamVjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICBnZW9tZXRyeSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgb3JkZXI6IDEwMDAgLSB6SW5kZXgsXHJcbiAgICAgICAgYWxpYXM6IGFsbG93ZWRGaWVsZHNBbmRBbGlhc1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVyeVVybChcclxuICAgIGRhdGFzb3VyY2U6IFF1ZXJ5YWJsZURhdGFTb3VyY2UsXHJcbiAgICBvcHRpb25zOiBRdWVyeU9wdGlvbnNcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IHVybDtcclxuICAgIHN3aXRjaCAoZGF0YXNvdXJjZS5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICBjYXNlIFdNU0RhdGFTb3VyY2U6XHJcbiAgICAgICAgY29uc3Qgd21zRGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgV01TRGF0YVNvdXJjZTtcclxuICAgICAgICB1cmwgPSB3bXNEYXRhc291cmNlLm9sLmdldEdldEZlYXR1cmVJbmZvVXJsKFxyXG4gICAgICAgICAgb3B0aW9ucy5jb29yZGluYXRlcyxcclxuICAgICAgICAgIG9wdGlvbnMucmVzb2x1dGlvbixcclxuICAgICAgICAgIG9wdGlvbnMucHJvamVjdGlvbixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgSU5GT19GT1JNQVQ6XHJcbiAgICAgICAgICAgICAgd21zRGF0YXNvdXJjZS5wYXJhbXMuaW5mb19mb3JtYXQgfHxcclxuICAgICAgICAgICAgICB0aGlzLmdldE1pbWVJbmZvRm9ybWF0KGRhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeUZvcm1hdCksXHJcbiAgICAgICAgICAgIFFVRVJZX0xBWUVSUzogd21zRGF0YXNvdXJjZS5wYXJhbXMubGF5ZXJzLFxyXG4gICAgICAgICAgICBGRUFUVVJFX0NPVU5UOiB3bXNEYXRhc291cmNlLnBhcmFtcy5mZWF0dXJlX2NvdW50IHx8ICc1J1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHdtc0RhdGFzb3VyY2UucGFyYW1zLnZlcnNpb24gIT09ICcxLjMuMCcpIHtcclxuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKCcmST0nLCAnJlg9Jyk7XHJcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgnJko9JywgJyZZPScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDYXJ0b0RhdGFTb3VyY2U6XHJcbiAgICAgICAgY29uc3QgY2FydG9EYXRhc291cmNlID0gZGF0YXNvdXJjZSBhcyBDYXJ0b0RhdGFTb3VyY2U7XHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9XHJcbiAgICAgICAgICAnaHR0cHM6Ly8nICtcclxuICAgICAgICAgIGNhcnRvRGF0YXNvdXJjZS5vcHRpb25zLmFjY291bnQgK1xyXG4gICAgICAgICAgJy5jYXJ0by5jb20vYXBpL3YyL3NxbD8nO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdCA9ICdmb3JtYXQ9R2VvSlNPTic7XHJcbiAgICAgICAgY29uc3Qgc3FsID1cclxuICAgICAgICAgICcmcT0nICsgY2FydG9EYXRhc291cmNlLm9wdGlvbnMuY29uZmlnLmxheWVyc1swXS5vcHRpb25zLnNxbDtcclxuICAgICAgICBjb25zdCBjbGF1c2UgPVxyXG4gICAgICAgICAgJyBXSEVSRSBTVF9JbnRlcnNlY3RzKHRoZV9nZW9tX3dlYm1lcmNhdG9yLFNUX0JVRkZFUihTVF9TZXRTUklEKFNUX1BPSU5UKCc7XHJcbiAgICAgICAgY29uc3QgbWV0cmVzID0gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgID8gY2FydG9EYXRhc291cmNlLm9wdGlvbnMucXVlcnlQcmVjaXNpb25cclxuICAgICAgICAgIDogJzEwMDAnO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID1cclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMF0gK1xyXG4gICAgICAgICAgJywnICtcclxuICAgICAgICAgIG9wdGlvbnMuY29vcmRpbmF0ZXNbMV0gK1xyXG4gICAgICAgICAgJyksMzg1NyksJyArXHJcbiAgICAgICAgICBtZXRyZXMgK1xyXG4gICAgICAgICAgJykpJztcclxuXHJcbiAgICAgICAgdXJsID0gYCR7YmFzZVVybH0ke2Zvcm1hdH0ke3NxbH0ke2NsYXVzZX0ke2Nvb3JkaW5hdGVzfWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICAgIGNvbnN0IHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZSA9IGRhdGFzb3VyY2UgYXMgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlO1xyXG4gICAgICAgIGxldCBleHRlbnQgPSBvbGV4dGVudC5ib3VuZGluZ0V4dGVudChbb3B0aW9ucy5jb29yZGluYXRlc10pO1xyXG4gICAgICAgIGlmICh0aWxlQXJjR0lTUmVzdERhdGFzb3VyY2Uub3B0aW9ucy5xdWVyeVByZWNpc2lvbikge1xyXG4gICAgICAgICAgZXh0ZW50ID0gb2xleHRlbnQuYnVmZmVyKFxyXG4gICAgICAgICAgICBleHRlbnQsXHJcbiAgICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnF1ZXJ5UHJlY2lzaW9uXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID1cclxuICAgICAgICAgIHRpbGVBcmNHSVNSZXN0RGF0YXNvdXJjZS5vcHRpb25zLnVybCArXHJcbiAgICAgICAgICAnLycgK1xyXG4gICAgICAgICAgdGlsZUFyY0dJU1Jlc3REYXRhc291cmNlLm9wdGlvbnMubGF5ZXIgK1xyXG4gICAgICAgICAgJy9xdWVyeS8nO1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgJ3tcInhtaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzBdICtcclxuICAgICAgICAgICAgJyxcInltaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzFdICtcclxuICAgICAgICAgICAgJyxcInhtYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzJdICtcclxuICAgICAgICAgICAgJyxcInltYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzNdICtcclxuICAgICAgICAgICAgJyxcInNwYXRpYWxSZWZlcmVuY2VcIjp7XCJ3a2lkXCI6MTAyMTAwfX0nXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAnZj1qc29uJyxcclxuICAgICAgICAgIGBnZW9tZXRyeT0ke2dlb21ldHJ5fWAsXHJcbiAgICAgICAgICAnZ2VvbWV0cnlUeXBlPWVzcmlHZW9tZXRyeUVudmVsb3BlJyxcclxuICAgICAgICAgICdpblNSPTEwMjEwMCcsXHJcbiAgICAgICAgICAnc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnLFxyXG4gICAgICAgICAgJ291dEZpZWxkcz0qJyxcclxuICAgICAgICAgICdyZXR1cm5HZW9tZXRyeT10cnVlJyxcclxuICAgICAgICAgICdvdXRTUj0xMDIxMDAnXHJcbiAgICAgICAgXTtcclxuICAgICAgICB1cmwgPSBgJHtzZXJ2aWNlVXJsfT8ke3BhcmFtcy5qb2luKCcmJyl9YDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNaW1lSW5mb0Zvcm1hdChxdWVyeUZvcm1hdCkge1xyXG4gICAgbGV0IG1pbWU7XHJcbiAgICBzd2l0Y2ggKHF1ZXJ5Rm9ybWF0KSB7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuR01MMjpcclxuICAgICAgICBtaW1lID0gJ2FwcGxpY2F0aW9uL3ZuZC5vZ2MuZ21sJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HTUwzOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vdm5kLm9nYy5nbWwvMy4xLjEnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkpTT046XHJcbiAgICAgICAgbWltZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBRdWVyeUZvcm1hdC5HRU9KU09OOlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vZ2VvanNvbic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUXVlcnlGb3JtYXQuVEVYVDpcclxuICAgICAgICBtaW1lID0gJ3RleHQvcGxhaW4nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFF1ZXJ5Rm9ybWF0LkhUTUw6XHJcbiAgICAgICAgbWltZSA9ICd0ZXh0L2h0bWwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIG1pbWUgPSAnYXBwbGljYXRpb24vdm5kLm9nYy5nbWwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtaW1lO1xyXG4gIH1cclxufVxyXG4iXX0=