/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { downloadContent } from '@igo2/utils';
import { Observable } from 'rxjs';
import * as olformat from 'ol/format';
import OlFeature from 'ol/Feature';
import { ExportInvalidFileError, ExportNothingToExportError } from './export.errors';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
var ExportService = /** @class */ (function () {
    function ExportService(config) {
        this.config = config;
        this.ogreUrl = this.config.getConfig('importExport.url');
    }
    /**
     * @param {?} olFeatures
     * @param {?} format
     * @param {?} title
     * @param {?=} projectionIn
     * @param {?=} projectionOut
     * @return {?}
     */
    ExportService.prototype.export = /**
     * @param {?} olFeatures
     * @param {?} format
     * @param {?} title
     * @param {?=} projectionIn
     * @param {?=} projectionOut
     * @return {?}
     */
    function (olFeatures, format, title, projectionIn, projectionOut) {
        if (projectionIn === void 0) { projectionIn = 'EPSG:4326'; }
        if (projectionOut === void 0) { projectionOut = 'EPSG:4326'; }
        /** @type {?} */
        var exportOlFeatures = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            /** @type {?} */
            var keys = olFeature
                .getKeys()
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return !key.startsWith('_'); }));
            /** @type {?} */
            var properties = keys.reduce((/**
             * @param {?} acc
             * @param {?} key
             * @return {?}
             */
            function (acc, key) {
                acc[key] = olFeature.get(key);
                return acc;
            }), { geometry: olFeature.getGeometry() });
            return new OlFeature(properties);
        }));
        return this.exportAsync(exportOlFeatures, format, title, projectionIn, projectionOut);
    };
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    ExportService.prototype.exportAsync = /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (olFeatures, format, title, projectionIn, projectionOut) {
        var _this = this;
        /** @type {?} */
        var doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            /** @type {?} */
            var nothingToExport = _this.nothingToExport(olFeatures, format);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            var ogreFormats = Object.keys(ExportService.ogreFormats);
            if (ogreFormats.indexOf(format) >= 0) {
                if (_this.ogreUrl === undefined) {
                    if (ExportService.noOgreFallbacks.indexOf(format) >= 0) {
                        _this.exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut);
                    }
                    else {
                        observer.error(new ExportInvalidFileError());
                    }
                    return;
                }
                _this.exportWithOgre(olFeatures, observer, format, title, projectionIn, projectionOut);
            }
            else {
                _this.exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut);
            }
        });
        return new Observable(doExport);
    };
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} observer
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    ExportService.prototype.exportToFile = /**
     * @private
     * @param {?} olFeatures
     * @param {?} observer
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (olFeatures, observer, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        var olFormat = new olformat[format]();
        /** @type {?} */
        var featuresText = olFormat.writeFeatures(olFeatures, {
            dataProjection: projectionOut,
            featureProjection: projectionIn,
            featureType: 'feature',
            featureNS: 'http://example.com/feature'
        });
        /** @type {?} */
        var fileName = title + "." + format.toLowerCase();
        downloadContent(featuresText, 'text/plain;charset=utf-8', fileName);
        observer.complete();
    };
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} observer
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    ExportService.prototype.exportWithOgre = /**
     * @private
     * @param {?} olFeatures
     * @param {?} observer
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (olFeatures, observer, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        var featuresText = new olformat.GeoJSON().writeFeatures(olFeatures, {
            dataProjection: projectionOut,
            featureProjection: projectionIn,
            featureType: 'feature',
            featureNS: 'http://example.com/feature'
        });
        /** @type {?} */
        var url = this.ogreUrl + "/convertJson";
        /** @type {?} */
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('target', '_blank');
        form.setAttribute('action', url);
        form.acceptCharset = 'UTF-8';
        form.enctype = 'application/x-www-form-urlencoded; charset=utf-8;';
        /** @type {?} */
        var geojsonField = document.createElement('input');
        geojsonField.setAttribute('type', 'hidden');
        geojsonField.setAttribute('name', 'json');
        geojsonField.setAttribute('value', featuresText);
        form.appendChild(geojsonField);
        /** @type {?} */
        var outputNameField = document.createElement('input');
        /** @type {?} */
        var outputName = format === 'Shapefile'
            ? title + ".zip"
            : title + "." + format.toLowerCase();
        outputNameField.setAttribute('type', 'hidden');
        outputNameField.setAttribute('name', 'outputName');
        outputNameField.setAttribute('value', outputName);
        form.appendChild(outputNameField);
        /** @type {?} */
        var ogreFormat = ExportService.ogreFormats[format];
        /** @type {?} */
        var outputFormatField = document.createElement('input');
        outputFormatField.setAttribute('type', 'hidden');
        outputFormatField.setAttribute('name', 'format');
        outputFormatField.setAttribute('value', ogreFormat);
        form.appendChild(outputFormatField);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        observer.complete();
    };
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @return {?}
     */
    ExportService.prototype.nothingToExport = /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @return {?}
     */
    function (olFeatures, format) {
        if (olFeatures.length === 0) {
            return true;
        }
        if (format === 'GPX') {
            /** @type {?} */
            var pointOrLine = olFeatures.find((/**
             * @param {?} olFeature
             * @return {?}
             */
            function (olFeature) {
                return (['Point', 'LineString'].indexOf(olFeature.getGeometry().getType()) >=
                    0);
            }));
            return pointOrLine === undefined;
        }
        return false;
    };
    ExportService.ogreFormats = {
        GML: 'gml',
        GPX: 'gpx',
        KML: 'kml',
        Shapefile: 'ESRI Shapefile',
        CSV: 'CSV'
    };
    ExportService.noOgreFallbacks = ['GML', 'GPX', 'KML'];
    ExportService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ExportService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    /** @nocollapse */ ExportService.ngInjectableDef = i0.defineInjectable({ factory: function ExportService_Factory() { return new ExportService(i0.inject(i1.ConfigService)); }, token: ExportService, providedIn: "root" });
    return ExportService;
}());
export { ExportService };
if (false) {
    /** @type {?} */
    ExportService.ogreFormats;
    /** @type {?} */
    ExportService.noOgreFallbacks;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype.ogreUrl;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBR25DLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsMEJBQTBCLEVBQzNCLE1BQU0saUJBQWlCLENBQUM7OztBQUV6QjtJQWdCRSx1QkFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7Ozs7O0lBRUQsOEJBQU07Ozs7Ozs7O0lBQU4sVUFDRSxVQUF1QixFQUN2QixNQUFvQixFQUNwQixLQUFhLEVBQ2IsWUFBMEIsRUFDMUIsYUFBMkI7UUFEM0IsNkJBQUEsRUFBQSwwQkFBMEI7UUFDMUIsOEJBQUEsRUFBQSwyQkFBMkI7O1lBRXJCLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxTQUFvQjs7Z0JBQ3JELElBQUksR0FBRyxTQUFTO2lCQUNuQixPQUFPLEVBQUU7aUJBQ1QsTUFBTTs7OztZQUFDLFVBQUMsR0FBVyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFwQixDQUFvQixFQUFDOztnQkFDMUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNOzs7OztZQUM1QixVQUFDLEdBQVcsRUFBRSxHQUFXO2dCQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxHQUFHLENBQUM7WUFDYixDQUFDLEdBQ0QsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQ3RDO1lBQ0QsT0FBTyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxXQUFXLENBQ3JCLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sS0FBSyxFQUNMLFlBQVksRUFDWixhQUFhLENBQ2QsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7Ozs7SUFFTyxtQ0FBVzs7Ozs7Ozs7O0lBQW5CLFVBQ0UsVUFBdUIsRUFDdkIsTUFBb0IsRUFDcEIsS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLGFBQXFCO1FBTHZCLGlCQW9EQzs7WUE3Q08sUUFBUTs7OztRQUFHLFVBQUMsUUFBd0I7O2dCQUNsQyxlQUFlLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO1lBQ2hFLElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtnQkFDNUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLDBCQUEwQixFQUFFLENBQUMsQ0FBQztnQkFDakQsT0FBTzthQUNSOztnQkFFSyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1lBQzFELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksS0FBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQzlCLElBQUksYUFBYSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN0RCxLQUFJLENBQUMsWUFBWSxDQUNmLFVBQVUsRUFDVixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBQ1osYUFBYSxDQUNkLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLHNCQUFzQixFQUFFLENBQUMsQ0FBQztxQkFDOUM7b0JBQ0QsT0FBTztpQkFDUjtnQkFDRCxLQUFJLENBQUMsY0FBYyxDQUNqQixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ0wsWUFBWSxFQUNaLGFBQWEsQ0FDZCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFlBQVksQ0FDZixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ0wsWUFBWSxFQUNaLGFBQWEsQ0FDZCxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUE7UUFFRCxPQUFPLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7Ozs7O0lBRU8sb0NBQVk7Ozs7Ozs7Ozs7SUFBcEIsVUFDRSxVQUF1QixFQUN2QixRQUF3QixFQUN4QixNQUFvQixFQUNwQixLQUFhLEVBQ2IsWUFBb0IsRUFDcEIsYUFBcUI7O1lBRWYsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFOztZQUNqQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDdEQsY0FBYyxFQUFFLGFBQWE7WUFDN0IsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsNEJBQTRCO1NBQ3hDLENBQUM7O1lBRUksUUFBUSxHQUFNLEtBQUssU0FBSSxNQUFNLENBQUMsV0FBVyxFQUFJO1FBRW5ELGVBQWUsQ0FBQyxZQUFZLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7Ozs7Ozs7O0lBRU8sc0NBQWM7Ozs7Ozs7Ozs7SUFBdEIsVUFDRSxVQUF1QixFQUN2QixRQUF3QixFQUN4QixNQUFjLEVBQ2QsS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLGFBQXFCOztZQUVmLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQ3BFLGNBQWMsRUFBRSxhQUFhO1lBQzdCLGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLDRCQUE0QjtTQUN4QyxDQUFDOztZQUVJLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxpQkFBYzs7WUFDbkMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsbURBQW1ELENBQUM7O1lBRTdELFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUNwRCxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDOztZQUV6QixlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7O1lBQ2pELFVBQVUsR0FDZCxNQUFNLEtBQUssV0FBVztZQUNwQixDQUFDLENBQUksS0FBSyxTQUFNO1lBQ2hCLENBQUMsQ0FBSSxLQUFLLFNBQUksTUFBTSxDQUFDLFdBQVcsRUFBSTtRQUN4QyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvQyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNuRCxlQUFlLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztZQUU1QixVQUFVLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7O1lBQzlDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ3pELGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7OztJQUVPLHVDQUFlOzs7Ozs7SUFBdkIsVUFBd0IsVUFBdUIsRUFBRSxNQUFjO1FBQzdELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTs7Z0JBQ2QsV0FBVyxHQUFHLFVBQVUsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxTQUFTO2dCQUMzQyxPQUFPLENBQ0wsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbEUsQ0FBQyxDQUNGLENBQUM7WUFDSixDQUFDLEVBQUM7WUFDRixPQUFPLFdBQVcsS0FBSyxTQUFTLENBQUM7U0FDbEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUE3TE0seUJBQVcsR0FBRztRQUNuQixHQUFHLEVBQUUsS0FBSztRQUNWLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLEtBQUs7UUFDVixTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLEdBQUcsRUFBRSxLQUFLO0tBQ1gsQ0FBQztJQUVLLDZCQUFlLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDOztnQkFaaEQsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFoQlEsYUFBYTs7O3dCQUZ0QjtDQWtOQyxBQWxNRCxJQWtNQztTQS9MWSxhQUFhOzs7SUFDeEIsMEJBTUU7O0lBRUYsOEJBQStDOzs7OztJQUUvQyxnQ0FBd0I7Ozs7O0lBRVosK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBkb3dubG9hZENvbnRlbnQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IEV4cG9ydEZvcm1hdCB9IGZyb20gJy4vZXhwb3J0LnR5cGUnO1xyXG5pbXBvcnQge1xyXG4gIEV4cG9ydEludmFsaWRGaWxlRXJyb3IsXHJcbiAgRXhwb3J0Tm90aGluZ1RvRXhwb3J0RXJyb3JcclxufSBmcm9tICcuL2V4cG9ydC5lcnJvcnMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwb3J0U2VydmljZSB7XHJcbiAgc3RhdGljIG9ncmVGb3JtYXRzID0ge1xyXG4gICAgR01MOiAnZ21sJyxcclxuICAgIEdQWDogJ2dweCcsXHJcbiAgICBLTUw6ICdrbWwnLFxyXG4gICAgU2hhcGVmaWxlOiAnRVNSSSBTaGFwZWZpbGUnLFxyXG4gICAgQ1NWOiAnQ1NWJ1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBub09ncmVGYWxsYmFja3MgPSBbJ0dNTCcsICdHUFgnLCAnS01MJ107XHJcblxyXG4gIHByaXZhdGUgb2dyZVVybDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5vZ3JlVXJsID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQudXJsJyk7XHJcbiAgfVxyXG5cclxuICBleHBvcnQoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIGZvcm1hdDogRXhwb3J0Rm9ybWF0LFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25JbiA9ICdFUFNHOjQzMjYnLFxyXG4gICAgcHJvamVjdGlvbk91dCA9ICdFUFNHOjQzMjYnXHJcbiAgKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCBleHBvcnRPbEZlYXR1cmVzID0gb2xGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBvbEZlYXR1cmVcclxuICAgICAgICAuZ2V0S2V5cygpXHJcbiAgICAgICAgLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+ICFrZXkuc3RhcnRzV2l0aCgnXycpKTtcclxuICAgICAgY29uc3QgcHJvcGVydGllcyA9IGtleXMucmVkdWNlKFxyXG4gICAgICAgIChhY2M6IG9iamVjdCwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGFjY1trZXldID0gb2xGZWF0dXJlLmdldChrZXkpO1xyXG4gICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgZ2VvbWV0cnk6IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpIH1cclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIG5ldyBPbEZlYXR1cmUocHJvcGVydGllcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5leHBvcnRBc3luYyhcclxuICAgICAgZXhwb3J0T2xGZWF0dXJlcyxcclxuICAgICAgZm9ybWF0LFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgcHJvamVjdGlvbkluLFxyXG4gICAgICBwcm9qZWN0aW9uT3V0XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHBvcnRBc3luYyhcclxuICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgZm9ybWF0OiBFeHBvcnRGb3JtYXQsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGRvRXhwb3J0ID0gKG9ic2VydmVyOiBPYnNlcnZlcjx2b2lkPikgPT4ge1xyXG4gICAgICBjb25zdCBub3RoaW5nVG9FeHBvcnQgPSB0aGlzLm5vdGhpbmdUb0V4cG9ydChvbEZlYXR1cmVzLCBmb3JtYXQpO1xyXG4gICAgICBpZiAobm90aGluZ1RvRXhwb3J0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yKCkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgb2dyZUZvcm1hdHMgPSBPYmplY3Qua2V5cyhFeHBvcnRTZXJ2aWNlLm9ncmVGb3JtYXRzKTtcclxuICAgICAgaWYgKG9ncmVGb3JtYXRzLmluZGV4T2YoZm9ybWF0KSA+PSAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub2dyZVVybCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBpZiAoRXhwb3J0U2VydmljZS5ub09ncmVGYWxsYmFja3MuaW5kZXhPZihmb3JtYXQpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5leHBvcnRUb0ZpbGUoXHJcbiAgICAgICAgICAgICAgb2xGZWF0dXJlcyxcclxuICAgICAgICAgICAgICBvYnNlcnZlcixcclxuICAgICAgICAgICAgICBmb3JtYXQsXHJcbiAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgcHJvamVjdGlvbkluLFxyXG4gICAgICAgICAgICAgIHByb2plY3Rpb25PdXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBFeHBvcnRJbnZhbGlkRmlsZUVycm9yKCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV4cG9ydFdpdGhPZ3JlKFxyXG4gICAgICAgICAgb2xGZWF0dXJlcyxcclxuICAgICAgICAgIG9ic2VydmVyLFxyXG4gICAgICAgICAgZm9ybWF0LFxyXG4gICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICBwcm9qZWN0aW9uSW4sXHJcbiAgICAgICAgICBwcm9qZWN0aW9uT3V0XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmV4cG9ydFRvRmlsZShcclxuICAgICAgICAgIG9sRmVhdHVyZXMsXHJcbiAgICAgICAgICBvYnNlcnZlcixcclxuICAgICAgICAgIGZvcm1hdCxcclxuICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgcHJvamVjdGlvbkluLFxyXG4gICAgICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGRvRXhwb3J0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhwb3J0VG9GaWxlKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4sXHJcbiAgICBmb3JtYXQ6IEV4cG9ydEZvcm1hdCxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgb2xmb3JtYXRbZm9ybWF0XSgpO1xyXG4gICAgY29uc3QgZmVhdHVyZXNUZXh0ID0gb2xGb3JtYXQud3JpdGVGZWF0dXJlcyhvbEZlYXR1cmVzLCB7XHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluLFxyXG4gICAgICBmZWF0dXJlVHlwZTogJ2ZlYXR1cmUnLFxyXG4gICAgICBmZWF0dXJlTlM6ICdodHRwOi8vZXhhbXBsZS5jb20vZmVhdHVyZSdcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGZpbGVOYW1lID0gYCR7dGl0bGV9LiR7Zm9ybWF0LnRvTG93ZXJDYXNlKCl9YDtcclxuXHJcbiAgICBkb3dubG9hZENvbnRlbnQoZmVhdHVyZXNUZXh0LCAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04JywgZmlsZU5hbWUpO1xyXG4gICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhwb3J0V2l0aE9ncmUoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIG9ic2VydmVyOiBPYnNlcnZlcjx2b2lkPixcclxuICAgIGZvcm1hdDogc3RyaW5nLFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjb25zdCBmZWF0dXJlc1RleHQgPSBuZXcgb2xmb3JtYXQuR2VvSlNPTigpLndyaXRlRmVhdHVyZXMob2xGZWF0dXJlcywge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JbixcclxuICAgICAgZmVhdHVyZVR5cGU6ICdmZWF0dXJlJyxcclxuICAgICAgZmVhdHVyZU5TOiAnaHR0cDovL2V4YW1wbGUuY29tL2ZlYXR1cmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm9ncmVVcmx9L2NvbnZlcnRKc29uYDtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ3Bvc3QnKTtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XHJcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWN0aW9uJywgdXJsKTtcclxuICAgIGZvcm0uYWNjZXB0Q2hhcnNldCA9ICdVVEYtOCc7XHJcbiAgICBmb3JtLmVuY3R5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04Oyc7XHJcblxyXG4gICAgY29uc3QgZ2VvanNvbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGdlb2pzb25GaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XHJcbiAgICBnZW9qc29uRmllbGQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2pzb24nKTtcclxuICAgIGdlb2pzb25GaWVsZC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZmVhdHVyZXNUZXh0KTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZ2VvanNvbkZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBvdXRwdXROYW1lRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgY29uc3Qgb3V0cHV0TmFtZSA9XHJcbiAgICAgIGZvcm1hdCA9PT0gJ1NoYXBlZmlsZSdcclxuICAgICAgICA/IGAke3RpdGxlfS56aXBgXHJcbiAgICAgICAgOiBgJHt0aXRsZX0uJHtmb3JtYXQudG9Mb3dlckNhc2UoKX1gO1xyXG4gICAgb3V0cHV0TmFtZUZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuICAgIG91dHB1dE5hbWVGaWVsZC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnb3V0cHV0TmFtZScpO1xyXG4gICAgb3V0cHV0TmFtZUZpZWxkLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBvdXRwdXROYW1lKTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQob3V0cHV0TmFtZUZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBvZ3JlRm9ybWF0ID0gRXhwb3J0U2VydmljZS5vZ3JlRm9ybWF0c1tmb3JtYXRdO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgb3V0cHV0Rm9ybWF0RmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG4gICAgb3V0cHV0Rm9ybWF0RmllbGQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2Zvcm1hdCcpO1xyXG4gICAgb3V0cHV0Rm9ybWF0RmllbGQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG9ncmVGb3JtYXQpO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChvdXRwdXRGb3JtYXRGaWVsZCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGZvcm0pO1xyXG5cclxuICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5vdGhpbmdUb0V4cG9ydChvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSwgZm9ybWF0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChvbEZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChmb3JtYXQgPT09ICdHUFgnKSB7XHJcbiAgICAgIGNvbnN0IHBvaW50T3JMaW5lID0gb2xGZWF0dXJlcy5maW5kKG9sRmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIFsnUG9pbnQnLCAnTGluZVN0cmluZyddLmluZGV4T2Yob2xGZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0VHlwZSgpKSA+PVxyXG4gICAgICAgICAgMFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcG9pbnRPckxpbmUgPT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19