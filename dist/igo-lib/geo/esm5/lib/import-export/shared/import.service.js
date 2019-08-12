/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { uuid } from '@igo2/utils';
import { Observable } from 'rxjs';
import * as olformat from 'ol/format';
import { ImportInvalidFileError, ImportUnreadableFileError } from './import.errors';
import { computeLayerTitleFromFile, getFileExtension } from './import.utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@igo2/core";
var ImportService = /** @class */ (function () {
    function ImportService(http, config) {
        this.http = http;
        this.config = config;
        this.ogreUrl = this.config.getConfig('importExport.url');
    }
    /**
     * @param {?} file
     * @param {?=} projectionIn
     * @param {?=} projectionOut
     * @return {?}
     */
    ImportService.prototype.import = /**
     * @param {?} file
     * @param {?=} projectionIn
     * @param {?=} projectionOut
     * @return {?}
     */
    function (file, projectionIn, projectionOut) {
        if (projectionIn === void 0) { projectionIn = 'EPSG:4326'; }
        if (projectionOut === void 0) { projectionOut = 'EPSG:4326'; }
        return this.importAsync(file, projectionIn, projectionOut);
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    ImportService.prototype.getFileImporter = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var extension = getFileExtension(file);
        /** @type {?} */
        var mimeType = file.type;
        /** @type {?} */
        var allowedMimeTypes = tslib_1.__spread(ImportService.allowedMimeTypes, ImportService.allowedZipMimeTypes);
        /** @type {?} */
        var allowedExtensions = ImportService.allowedExtensions;
        if (allowedMimeTypes.indexOf(mimeType) < 0 && allowedExtensions.indexOf(extension) < 0) {
            return undefined;
        }
        else if (mimeType === 'application/json' || ['json', 'geojson', 'kml'].indexOf(extension) >= 0) {
            return this.importFile;
        }
        else if (this.ogreUrl !== undefined) {
            return this.importFileWithOgre;
        }
        return undefined;
    };
    /**
     * @private
     * @param {?} file
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    ImportService.prototype.importAsync = /**
     * @private
     * @param {?} file
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (file, projectionIn, projectionOut) {
        var _this = this;
        /** @type {?} */
        var doImport = (/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            /** @type {?} */
            var importer = _this.getFileImporter(file);
            if (importer === undefined) {
                observer.error(new ImportInvalidFileError());
                return;
            }
            importer.call(_this, file, observer, projectionIn, projectionOut);
        });
        return new Observable(doImport);
    };
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    ImportService.prototype.importFile = /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (file, observer, projectionIn, projectionOut) {
        var _this = this;
        /** @type {?} */
        var reader = new FileReader();
        reader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            try {
                /** @type {?} */
                var features = _this.parseFeaturesFromFile(file, event.target.result, projectionIn, projectionOut);
                observer.next(features);
            }
            catch (e) {
                observer.error(new ImportUnreadableFileError());
            }
            observer.complete();
        });
        reader.onerror = (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            observer.error(new ImportUnreadableFileError());
        });
        reader.readAsText(file, 'UTF-8');
    };
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    ImportService.prototype.importFileWithOgre = /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (file, observer, projectionIn, projectionOut) {
        var _this = this;
        /** @type {?} */
        var url = this.ogreUrl + "/convert";
        /** @type {?} */
        var formData = new FormData();
        formData.append('upload', file);
        formData.append('sourceSrs', projectionIn);
        formData.append('targetSrs', projectionOut);
        formData.append('formatOutput', 'GEOJSON');
        formData.append('skipFailures', '');
        this.http
            .post(url, formData, { headers: new HttpHeaders() })
            .subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (response === null) {
                observer.error(new ImportUnreadableFileError());
                return;
            }
            /** @type {?} */
            var errors = ((/** @type {?} */ (response))).errors || [];
            if (errors.length > 0) {
                observer.error(new ImportUnreadableFileError());
            }
            else {
                /** @type {?} */
                var features = _this.parseFeaturesFromGeoJSON(file, response, projectionOut);
                observer.next(features);
                observer.complete();
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            observer.error(new ImportUnreadableFileError());
        }));
    };
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    ImportService.prototype.parseFeaturesFromFile = /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (file, data, projectionIn, projectionOut) {
        /** @type {?} */
        var extension = getFileExtension(file);
        /** @type {?} */
        var mimeType = file.type;
        /** @type {?} */
        var GeoJSON = new olformat.GeoJSON();
        /** @type {?} */
        var format;
        if (mimeType === 'application/vnd.google-earth.kml+xml') {
            format = new olformat.KML();
        }
        else if (mimeType === 'application/gml+xml') {
            format = new olformat.GML();
        }
        else if (mimeType === 'application/gpx+xml') {
            format = new olformat.GPX();
        }
        else {
            switch (extension) {
                case 'kml':
                    format = new olformat.KML();
                    break;
                case 'gpx':
                    format = new olformat.GPX();
                    break;
                case 'gml':
                    format = new olformat.GML();
                    break;
                default:
                    format = GeoJSON;
                    break;
            }
        }
        /** @type {?} */
        var olFeatures = format.readFeatures(data, {
            dataProjection: projectionIn,
            featureProjection: projectionOut
        });
        /** @type {?} */
        var features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            return Object.assign(GeoJSON.writeFeatureObject(olFeature), {
                projection: projectionOut,
                meta: {
                    id: uuid(),
                    title: computeLayerTitleFromFile(file)
                }
            });
        }));
        return features;
    };
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionOut
     * @return {?}
     */
    ImportService.prototype.parseFeaturesFromGeoJSON = /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionOut
     * @return {?}
     */
    function (file, data, projectionOut) {
        /** @type {?} */
        var olFormat = new olformat.GeoJSON();
        /** @type {?} */
        var olFeatures = olFormat.readFeatures(data);
        /** @type {?} */
        var features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        function (olFeature) {
            return Object.assign(olFormat.writeFeatureObject(olFeature), {
                projection: projectionOut,
                meta: {
                    id: uuid(),
                    title: computeLayerTitleFromFile(file)
                }
            });
        }));
        return features;
    };
    ImportService.allowedMimeTypes = [
        'application/gml+xml',
        'application/vnd.google-earth.kml+xml',
        'application/gpx+xml',
        'application/json'
    ];
    ImportService.allowedZipMimeTypes = [
        'application/zip',
        'application/x-zip-compressed',
        'application/x-zip'
    ];
    ImportService.allowedExtensions = [
        'geojson',
        'kml',
        'gpx',
        'json',
        'gml'
    ];
    ImportService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ImportService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ConfigService }
    ]; };
    /** @nocollapse */ ImportService.ngInjectableDef = i0.defineInjectable({ factory: function ImportService_Factory() { return new ImportService(i0.inject(i1.HttpClient), i0.inject(i2.ConfigService)); }, token: ImportService, providedIn: "root" });
    return ImportService;
}());
export { ImportService };
if (false) {
    /** @type {?} */
    ImportService.allowedMimeTypes;
    /** @type {?} */
    ImportService.allowedZipMimeTypes;
    /** @type {?} */
    ImportService.allowedExtensions;
    /**
     * @type {?}
     * @private
     */
    ImportService.prototype.ogreUrl;
    /**
     * @type {?}
     * @private
     */
    ImportService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ImportService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvaW1wb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFJdEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHlCQUF5QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFN0U7SUE0QkUsdUJBQ1UsSUFBZ0IsRUFDaEIsTUFBcUI7UUFEckIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBRTdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7O0lBRUQsOEJBQU07Ozs7OztJQUFOLFVBQU8sSUFBVSxFQUFFLFlBQTBCLEVBQUUsYUFBMkI7UUFBdkQsNkJBQUEsRUFBQSwwQkFBMEI7UUFBRSw4QkFBQSxFQUFBLDJCQUEyQjtRQUN4RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7SUFFTyx1Q0FBZTs7Ozs7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O29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFoQlEsVUFBVTtnQkFFVixhQUFhOzs7d0JBSHRCO0NBOE1DLEFBL0xELElBK0xDO1NBNUxZLGFBQWE7OztJQUV4QiwrQkFLRTs7SUFFRixrQ0FJRTs7SUFFRixnQ0FNRTs7Ozs7SUFFRixnQ0FBd0I7Ozs7O0lBR3RCLDZCQUF3Qjs7Ozs7SUFDeEIsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEltcG9ydEludmFsaWRGaWxlRXJyb3IsIEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IgfSBmcm9tICcuL2ltcG9ydC5lcnJvcnMnO1xyXG5pbXBvcnQgeyBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlLCBnZXRGaWxlRXh0ZW5zaW9uIH0gZnJvbSAnLi9pbXBvcnQudXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1wb3J0U2VydmljZSB7XHJcblxyXG4gIHN0YXRpYyBhbGxvd2VkTWltZVR5cGVzID0gW1xyXG4gICAgJ2FwcGxpY2F0aW9uL2dtbCt4bWwnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtZWFydGgua21sK3htbCcsXHJcbiAgICAnYXBwbGljYXRpb24vZ3B4K3htbCcsXHJcbiAgICAnYXBwbGljYXRpb24vanNvbidcclxuICBdO1xyXG5cclxuICBzdGF0aWMgYWxsb3dlZFppcE1pbWVUeXBlcyA9IFtcclxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL3gtemlwLWNvbXByZXNzZWQnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL3gtemlwJ1xyXG4gIF07XHJcblxyXG4gIHN0YXRpYyBhbGxvd2VkRXh0ZW5zaW9ucyA9IFtcclxuICAgICdnZW9qc29uJyxcclxuICAgICdrbWwnLFxyXG4gICAgJ2dweCcsXHJcbiAgICAnanNvbicsXHJcbiAgICAnZ21sJ1xyXG4gIF07XHJcblxyXG4gIHByaXZhdGUgb2dyZVVybDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9ncmVVcmwgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydEV4cG9ydC51cmwnKTtcclxuICB9XHJcblxyXG4gIGltcG9ydChmaWxlOiBGaWxlLCBwcm9qZWN0aW9uSW4gPSAnRVBTRzo0MzI2JywgcHJvamVjdGlvbk91dCA9ICdFUFNHOjQzMjYnKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuICAgIHJldHVybiB0aGlzLmltcG9ydEFzeW5jKGZpbGUsIHByb2plY3Rpb25JbiwgcHJvamVjdGlvbk91dCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZpbGVJbXBvcnRlcihmaWxlOiBGaWxlKTogKGZpbGU6IEZpbGUsIG9ic2VydmVyOiBPYnNlcnZlcjxGZWF0dXJlW10+LCBwcm9qZWN0aW9uSW46IHN0cmluZywgcHJvamVjdGlvbk91dDogc3RyaW5nKSA9PiB2b2lkIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb24oZmlsZSk7XHJcbiAgICBjb25zdCBtaW1lVHlwZSA9IGZpbGUudHlwZTtcclxuICAgIGNvbnN0IGFsbG93ZWRNaW1lVHlwZXMgPSBbLi4uSW1wb3J0U2VydmljZS5hbGxvd2VkTWltZVR5cGVzLCAuLi5JbXBvcnRTZXJ2aWNlLmFsbG93ZWRaaXBNaW1lVHlwZXNdO1xyXG4gICAgY29uc3QgYWxsb3dlZEV4dGVuc2lvbnMgPSBJbXBvcnRTZXJ2aWNlLmFsbG93ZWRFeHRlbnNpb25zO1xyXG5cclxuICAgIGlmIChhbGxvd2VkTWltZVR5cGVzLmluZGV4T2YobWltZVR5cGUpIDwgMCAmJiBhbGxvd2VkRXh0ZW5zaW9ucy5pbmRleE9mKGV4dGVuc2lvbikgPCAwKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2UgaWYgKG1pbWVUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicgfHwgWydqc29uJywgJ2dlb2pzb24nLCAna21sJ10uaW5kZXhPZihleHRlbnNpb24pID49IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW1wb3J0RmlsZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vZ3JlVXJsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW1wb3J0RmlsZVdpdGhPZ3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGltcG9ydEFzeW5jKGZpbGU6IEZpbGUsIHByb2plY3Rpb25Jbjogc3RyaW5nLCBwcm9qZWN0aW9uT3V0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG4gICAgY29uc3QgZG9JbXBvcnQgPSAob2JzZXJ2ZXI6IE9ic2VydmVyPEZlYXR1cmVbXT4pID0+IHtcclxuICAgICAgY29uc3QgaW1wb3J0ZXIgPSB0aGlzLmdldEZpbGVJbXBvcnRlcihmaWxlKTtcclxuICAgICAgaWYgKGltcG9ydGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0SW52YWxpZEZpbGVFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGltcG9ydGVyLmNhbGwodGhpcywgZmlsZSwgb2JzZXJ2ZXIsIHByb2plY3Rpb25JbiwgcHJvamVjdGlvbk91dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkb0ltcG9ydCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGltcG9ydEZpbGUoZmlsZTogRmlsZSwgb2JzZXJ2ZXI6IE9ic2VydmVyPEZlYXR1cmVbXT4sIHByb2plY3Rpb25Jbjogc3RyaW5nLCBwcm9qZWN0aW9uT3V0OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG4gICAgcmVhZGVyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLnBhcnNlRmVhdHVyZXNGcm9tRmlsZShcclxuICAgICAgICAgIGZpbGUsXHJcbiAgICAgICAgICBldmVudC50YXJnZXQucmVzdWx0LFxyXG4gICAgICAgICAgcHJvamVjdGlvbkluLFxyXG4gICAgICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChmZWF0dXJlcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVhZGVyLm9uZXJyb3IgPSBldnQgPT4ge1xyXG4gICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSwgJ1VURi04Jyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGltcG9ydEZpbGVXaXRoT2dyZShmaWxlOiBGaWxlLCBvYnNlcnZlcjogT2JzZXJ2ZXI8RmVhdHVyZVtdPiwgcHJvamVjdGlvbkluOiBzdHJpbmcsIHByb2plY3Rpb25PdXQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5vZ3JlVXJsfS9jb252ZXJ0YDtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3VwbG9hZCcsIGZpbGUpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdzb3VyY2VTcnMnLCBwcm9qZWN0aW9uSW4pO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCd0YXJnZXRTcnMnLCBwcm9qZWN0aW9uT3V0KTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZm9ybWF0T3V0cHV0JywgJ0dFT0pTT04nKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnc2tpcEZhaWx1cmVzJywgJycpO1xyXG5cclxuICAgIHRoaXMuaHR0cFxyXG4gICAgICAucG9zdCh1cmwsIGZvcm1EYXRhLCB7aGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKCl9KVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwb25zZToge2Vycm9ycz86IHN0cmluZ1tdfSB8IG9iamVjdCB8IG51bGwpID0+IHtcclxuICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGVycm9ycyA9IChyZXNwb25zZSBhcyBhbnkpLmVycm9ycyB8fCBbXTtcclxuICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5wYXJzZUZlYXR1cmVzRnJvbUdlb0pTT04oZmlsZSwgcmVzcG9uc2UsIHByb2plY3Rpb25PdXQpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZlYXR1cmVzKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcjogRXJyb3IpID0+IHtcclxuICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VGZWF0dXJlc0Zyb21GaWxlKGZpbGU6IEZpbGUsIGRhdGE6IHN0cmluZywgcHJvamVjdGlvbkluOiBzdHJpbmcsIHByb2plY3Rpb25PdXQ6IHN0cmluZyk6IEZlYXR1cmVbXSB7XHJcbiAgICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uKGZpbGUpO1xyXG4gICAgY29uc3QgbWltZVR5cGUgPSBmaWxlLnR5cGU7XHJcblxyXG4gICAgY29uc3QgR2VvSlNPTiA9IG5ldyBvbGZvcm1hdC5HZW9KU09OKCk7XHJcblxyXG4gICAgbGV0IGZvcm1hdDtcclxuICAgIGlmIChtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtZWFydGgua21sK3htbCcpIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LktNTCgpO1xyXG4gICAgfSBlbHNlIGlmIChtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2dtbCt4bWwnKSB7XHJcbiAgICAgIGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5HTUwoKTtcclxuICAgIH0gZWxzZSBpZiAobWltZVR5cGUgPT09ICdhcHBsaWNhdGlvbi9ncHgreG1sJykge1xyXG4gICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuR1BYKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2l0Y2ggKGV4dGVuc2lvbikge1xyXG4gICAgICAgIGNhc2UgJ2ttbCc6XHJcbiAgICAgICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuS01MKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgIGNhc2UgJ2dweCc6XHJcbiAgICAgICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuR1BYKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdnbWwnOlxyXG4gICAgICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LkdNTCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGZvcm1hdCA9IEdlb0pTT047XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBmb3JtYXQucmVhZEZlYXR1cmVzKGRhdGEsIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25JbixcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25PdXRcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBvbEZlYXR1cmVzLm1hcCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oR2VvSlNPTi53cml0ZUZlYXR1cmVPYmplY3Qob2xGZWF0dXJlKSwge1xyXG4gICAgICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICAgIHRpdGxlOiBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VGZWF0dXJlc0Zyb21HZW9KU09OKGZpbGU6IEZpbGUsIGRhdGE6IG9iamVjdCwgcHJvamVjdGlvbk91dDogc3RyaW5nKTogRmVhdHVyZVtdIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gbmV3IG9sZm9ybWF0Lkdlb0pTT04oKTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBvbEZvcm1hdC5yZWFkRmVhdHVyZXMoZGF0YSk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IG9sRmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihvbEZvcm1hdC53cml0ZUZlYXR1cmVPYmplY3Qob2xGZWF0dXJlKSwge1xyXG4gICAgICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICAgIHRpdGxlOiBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcbn1cclxuIl19