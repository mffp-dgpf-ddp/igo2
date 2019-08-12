/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { Observable } from 'rxjs';
import * as olformat from 'ol/format';
import OlFeature from 'ol/Feature';
import { downloadContent } from './export.utils';
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
            var keys = olFeature.getKeys().filter((/**
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
        var url = this.ogreUrl + "/convert";
        /** @type {?} */
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        /** @type {?} */
        var geojsonField = document.createElement('input');
        geojsonField.setAttribute('type', 'hidden');
        geojsonField.setAttribute('name', 'json');
        geojsonField.setAttribute('value', featuresText);
        form.appendChild(geojsonField);
        /** @type {?} */
        var outputNameField = document.createElement('input');
        /** @type {?} */
        var outputName = format === 'Shapefile' ? title + ".zip" : title;
        outputNameField.setAttribute('type', 'hidden');
        outputNameField.setAttribute('name', 'outputName');
        outputNameField.setAttribute('value', outputName);
        form.appendChild(outputNameField);
        /** @type {?} */
        var ogreFormat = ExportService.ogreFormats[format];
        /** @type {?} */
        var outputFormatField = document.createElement('input');
        outputFormatField.setAttribute('type', 'hidden');
        outputFormatField.setAttribute('name', 'formatOutput');
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
                return ['Point', 'LineString'].indexOf(olFeature.getGeometry().getType()) >= 0;
            }));
            return pointOrLine === undefined;
        }
        return false;
    };
    ExportService.ogreFormats = {
        GML: 'gml',
        GPX: 'gpx',
        KML: 'kml',
        Shapefile: 'ESRI Shapefile'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLDBCQUEwQixFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUVyRjtJQWdCRSx1QkFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7Ozs7O0lBRUQsOEJBQU07Ozs7Ozs7O0lBQU4sVUFDRSxVQUF1QixFQUN2QixNQUFvQixFQUNwQixLQUFhLEVBQ2IsWUFBMEIsRUFDMUIsYUFBMkI7UUFEM0IsNkJBQUEsRUFBQSwwQkFBMEI7UUFDMUIsOEJBQUEsRUFBQSwyQkFBMkI7O1lBRXJCLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxTQUFvQjs7Z0JBQ3JELElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTTs7OztZQUFDLFVBQUMsR0FBVyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFwQixDQUFvQixFQUFDOztn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O1NBQ2xDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBakpNLHlCQUFXLEdBQUc7UUFDbkIsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztRQUNWLEdBQUcsRUFBRSxLQUFLO1FBQ1YsU0FBUyxFQUFFLGdCQUFnQjtLQUM1QixDQUFDO0lBRUssNkJBQWUsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7O2dCQVpoRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWJRLGFBQWE7Ozt3QkFGdEI7Q0FvS0MsQUF2SkQsSUF1SkM7U0FwSlksYUFBYTs7O0lBRXhCLDBCQUtFOztJQUVGLDhCQUErQzs7Ozs7SUFFL0MsZ0NBQXdCOzs7OztJQUVaLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgZG93bmxvYWRDb250ZW50IH0gZnJvbSAnLi9leHBvcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBFeHBvcnRGb3JtYXQgfSBmcm9tICcuL2V4cG9ydC50eXBlJztcclxuaW1wb3J0IHsgRXhwb3J0SW52YWxpZEZpbGVFcnJvciwgRXhwb3J0Tm90aGluZ1RvRXhwb3J0RXJyb3IgfSBmcm9tICcuL2V4cG9ydC5lcnJvcnMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwb3J0U2VydmljZSB7XHJcblxyXG4gIHN0YXRpYyBvZ3JlRm9ybWF0cyA9IHtcclxuICAgIEdNTDogJ2dtbCcsXHJcbiAgICBHUFg6ICdncHgnLFxyXG4gICAgS01MOiAna21sJyxcclxuICAgIFNoYXBlZmlsZTogJ0VTUkkgU2hhcGVmaWxlJ1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBub09ncmVGYWxsYmFja3MgPSBbJ0dNTCcsICdHUFgnLCAnS01MJ107XHJcblxyXG4gIHByaXZhdGUgb2dyZVVybDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5vZ3JlVXJsID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQudXJsJyk7XHJcbiAgfVxyXG5cclxuICBleHBvcnQoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIGZvcm1hdDogRXhwb3J0Rm9ybWF0LFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25JbiA9ICdFUFNHOjQzMjYnLFxyXG4gICAgcHJvamVjdGlvbk91dCA9ICdFUFNHOjQzMjYnXHJcbiAgKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCBleHBvcnRPbEZlYXR1cmVzID0gb2xGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBvbEZlYXR1cmUuZ2V0S2V5cygpLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+ICFrZXkuc3RhcnRzV2l0aCgnXycpKTtcclxuICAgICAgY29uc3QgcHJvcGVydGllcyA9IGtleXMucmVkdWNlKChhY2M6IG9iamVjdCwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICBhY2Nba2V5XSA9IG9sRmVhdHVyZS5nZXQoa2V5KTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCB7Z2VvbWV0cnk6IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpfSk7XHJcbiAgICAgIHJldHVybiBuZXcgT2xGZWF0dXJlKHByb3BlcnRpZXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXhwb3J0QXN5bmMoZXhwb3J0T2xGZWF0dXJlcywgZm9ybWF0LCB0aXRsZSwgcHJvamVjdGlvbkluLCBwcm9qZWN0aW9uT3V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhwb3J0QXN5bmMoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIGZvcm1hdDogRXhwb3J0Rm9ybWF0LFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkb0V4cG9ydCA9IChvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4pID0+IHtcclxuICAgICAgY29uc3Qgbm90aGluZ1RvRXhwb3J0ID0gdGhpcy5ub3RoaW5nVG9FeHBvcnQob2xGZWF0dXJlcywgZm9ybWF0KTtcclxuICAgICAgaWYgKG5vdGhpbmdUb0V4cG9ydCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG9ncmVGb3JtYXRzID0gT2JqZWN0LmtleXMoRXhwb3J0U2VydmljZS5vZ3JlRm9ybWF0cyk7XHJcbiAgICAgIGlmIChvZ3JlRm9ybWF0cy5pbmRleE9mKGZvcm1hdCkgPj0gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9ncmVVcmwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaWYgKEV4cG9ydFNlcnZpY2Uubm9PZ3JlRmFsbGJhY2tzLmluZGV4T2YoZm9ybWF0KSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwb3J0VG9GaWxlKG9sRmVhdHVyZXMsIG9ic2VydmVyLCBmb3JtYXQsIHRpdGxlLCBwcm9qZWN0aW9uSW4sIHByb2plY3Rpb25PdXQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEV4cG9ydEludmFsaWRGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXhwb3J0V2l0aE9ncmUob2xGZWF0dXJlcywgb2JzZXJ2ZXIsIGZvcm1hdCwgdGl0bGUsIHByb2plY3Rpb25JbiwgcHJvamVjdGlvbk91dCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5leHBvcnRUb0ZpbGUob2xGZWF0dXJlcywgb2JzZXJ2ZXIsIGZvcm1hdCwgdGl0bGUsIHByb2plY3Rpb25JbiwgcHJvamVjdGlvbk91dCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGRvRXhwb3J0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhwb3J0VG9GaWxlKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4sXHJcbiAgICBmb3JtYXQ6IEV4cG9ydEZvcm1hdCxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgb2xmb3JtYXRbZm9ybWF0XSgpO1xyXG4gICAgY29uc3QgZmVhdHVyZXNUZXh0ID0gb2xGb3JtYXQud3JpdGVGZWF0dXJlcyhvbEZlYXR1cmVzLCB7XHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluLFxyXG4gICAgICBmZWF0dXJlVHlwZTogJ2ZlYXR1cmUnLFxyXG4gICAgICBmZWF0dXJlTlM6ICdodHRwOi8vZXhhbXBsZS5jb20vZmVhdHVyZSdcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGZpbGVOYW1lID0gYCR7dGl0bGV9LiR7Zm9ybWF0LnRvTG93ZXJDYXNlKCl9YDtcclxuXHJcbiAgICBkb3dubG9hZENvbnRlbnQoZmVhdHVyZXNUZXh0LCAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04JywgZmlsZU5hbWUpO1xyXG4gICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhwb3J0V2l0aE9ncmUoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIG9ic2VydmVyOiBPYnNlcnZlcjx2b2lkPixcclxuICAgIGZvcm1hdDogc3RyaW5nLFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjb25zdCBmZWF0dXJlc1RleHQgPSBuZXcgb2xmb3JtYXQuR2VvSlNPTigpLndyaXRlRmVhdHVyZXMob2xGZWF0dXJlcywge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JbixcclxuICAgICAgZmVhdHVyZVR5cGU6ICdmZWF0dXJlJyxcclxuICAgICAgZmVhdHVyZU5TOiAnaHR0cDovL2V4YW1wbGUuY29tL2ZlYXR1cmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm9ncmVVcmx9L2NvbnZlcnRgO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAncG9zdCcpO1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIHVybCk7XHJcblxyXG4gICAgY29uc3QgZ2VvanNvbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGdlb2pzb25GaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XHJcbiAgICBnZW9qc29uRmllbGQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2pzb24nKTtcclxuICAgIGdlb2pzb25GaWVsZC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZmVhdHVyZXNUZXh0KTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZ2VvanNvbkZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBvdXRwdXROYW1lRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgY29uc3Qgb3V0cHV0TmFtZSA9IGZvcm1hdCA9PT0gJ1NoYXBlZmlsZScgPyBgJHt0aXRsZX0uemlwYCA6IHRpdGxlO1xyXG4gICAgb3V0cHV0TmFtZUZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuICAgIG91dHB1dE5hbWVGaWVsZC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnb3V0cHV0TmFtZScpO1xyXG4gICAgb3V0cHV0TmFtZUZpZWxkLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBvdXRwdXROYW1lKTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQob3V0cHV0TmFtZUZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBvZ3JlRm9ybWF0ID0gRXhwb3J0U2VydmljZS5vZ3JlRm9ybWF0c1tmb3JtYXRdO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgb3V0cHV0Rm9ybWF0RmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG4gICAgb3V0cHV0Rm9ybWF0RmllbGQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2Zvcm1hdE91dHB1dCcpO1xyXG4gICAgb3V0cHV0Rm9ybWF0RmllbGQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG9ncmVGb3JtYXQpO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChvdXRwdXRGb3JtYXRGaWVsZCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGZvcm0pO1xyXG5cclxuICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5vdGhpbmdUb0V4cG9ydChvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSwgZm9ybWF0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChvbEZlYXR1cmVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgaWYgKGZvcm1hdCA9PT0gJ0dQWCcpIHtcclxuICAgICAgY29uc3QgcG9pbnRPckxpbmUgPSBvbEZlYXR1cmVzLmZpbmQoKG9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbJ1BvaW50JywgJ0xpbmVTdHJpbmcnXS5pbmRleE9mKG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKSkgPj0gMDtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwb2ludE9yTGluZSA9PT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=