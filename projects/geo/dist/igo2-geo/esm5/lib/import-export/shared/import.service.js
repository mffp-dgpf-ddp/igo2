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
import { ImportInvalidFileError, ImportUnreadableFileError, ImportSizeError, ImportSRSError } from './import.errors';
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
        if (allowedMimeTypes.indexOf(mimeType) < 0 &&
            allowedExtensions.indexOf(extension) < 0) {
            return undefined;
        }
        else if (mimeType === 'application/json' ||
            ['json', 'geojson', 'kml', 'gpx'].indexOf(extension) >= 0) {
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
            if (file.size >= 30000000) {
                observer.error(new ImportSizeError());
                return;
            }
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
        this.http.post(url, formData, { headers: new HttpHeaders() }).subscribe((/**
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
            error.error.caught = true;
            /** @type {?} */
            var errMsg = error.error.msg || '';
            if (errMsg === 'No valid files found') {
                observer.error(new ImportInvalidFileError());
            }
            else if (errMsg.startWith('ERROR 1: Failed to process SRS definition')) {
                observer.error(new ImportSRSError());
            }
            else {
                observer.error(new ImportUnreadableFileError());
            }
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
    ImportService.allowedExtensions = ['geojson', 'kml', 'gpx', 'json', 'gml'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvaW1wb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFJdEMsT0FBTyxFQUNMLHNCQUFzQixFQUN0Qix5QkFBeUIsRUFDekIsZUFBZSxFQUNmLGNBQWMsRUFDZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRTdFO0lBcUJFLHVCQUFvQixJQUFnQixFQUFVLE1BQXFCO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7O0lBRUQsOEJBQU07Ozs7OztJQUFOLFVBQ0UsSUFBVSxFQUNWLFlBQTBCLEVBQzFCLGFBQTJCO1FBRDNCLDZCQUFBLEVBQUEsMEJBQTBCO1FBQzFCLDhCQUFBLEVBQUEsMkJBQTJCO1FBRTNCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENB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QyxRQUFRLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNELFVBQVUsRUFBRSxhQUFhO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUseUJBQXlCLENBQUMsSUFBSSxDQUFDO2lCQUN2QzthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBQztRQUVGLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUEzT00sOEJBQWdCLEdBQUc7UUFDeEIscUJBQXFCO1FBQ3JCLHNDQUFzQztRQUN0QyxxQkFBcUI7UUFDckIsa0JBQWtCO0tBQ25CLENBQUM7SUFFSyxpQ0FBbUIsR0FBRztRQUMzQixpQkFBaUI7UUFDakIsOEJBQThCO1FBQzlCLG1CQUFtQjtLQUNwQixDQUFDO0lBRUssK0JBQWlCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7O2dCQWpCckUsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFyQlEsVUFBVTtnQkFFVixhQUFhOzs7d0JBSHRCO0NBb1FDLEFBaFBELElBZ1BDO1NBN09ZLGFBQWE7OztJQUN4QiwrQkFLRTs7SUFFRixrQ0FJRTs7SUFFRixnQ0FBb0U7Ozs7O0lBRXBFLGdDQUF3Qjs7Ozs7SUFFWiw2QkFBd0I7Ozs7O0lBQUUsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgSW1wb3J0SW52YWxpZEZpbGVFcnJvcixcclxuICBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yLFxyXG4gIEltcG9ydFNpemVFcnJvcixcclxuICBJbXBvcnRTUlNFcnJvclxyXG59IGZyb20gJy4vaW1wb3J0LmVycm9ycyc7XHJcbmltcG9ydCB7IGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUsIGdldEZpbGVFeHRlbnNpb24gfSBmcm9tICcuL2ltcG9ydC51dGlscyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnRTZXJ2aWNlIHtcclxuICBzdGF0aWMgYWxsb3dlZE1pbWVUeXBlcyA9IFtcclxuICAgICdhcHBsaWNhdGlvbi9nbWwreG1sJyxcclxuICAgICdhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttbCt4bWwnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL2dweCt4bWwnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgXTtcclxuXHJcbiAgc3RhdGljIGFsbG93ZWRaaXBNaW1lVHlwZXMgPSBbXHJcbiAgICAnYXBwbGljYXRpb24vemlwJyxcclxuICAgICdhcHBsaWNhdGlvbi94LXppcC1jb21wcmVzc2VkJyxcclxuICAgICdhcHBsaWNhdGlvbi94LXppcCdcclxuICBdO1xyXG5cclxuICBzdGF0aWMgYWxsb3dlZEV4dGVuc2lvbnMgPSBbJ2dlb2pzb24nLCAna21sJywgJ2dweCcsICdqc29uJywgJ2dtbCddO1xyXG5cclxuICBwcml2YXRlIG9ncmVVcmw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5vZ3JlVXJsID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQudXJsJyk7XHJcbiAgfVxyXG5cclxuICBpbXBvcnQoXHJcbiAgICBmaWxlOiBGaWxlLFxyXG4gICAgcHJvamVjdGlvbkluID0gJ0VQU0c6NDMyNicsXHJcbiAgICBwcm9qZWN0aW9uT3V0ID0gJ0VQU0c6NDMyNidcclxuICApOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaW1wb3J0QXN5bmMoZmlsZSwgcHJvamVjdGlvbkluLCBwcm9qZWN0aW9uT3V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RmlsZUltcG9ydGVyKFxyXG4gICAgZmlsZTogRmlsZVxyXG4gICk6IChcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8RmVhdHVyZVtdPixcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKSA9PiB2b2lkIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb24oZmlsZSk7XHJcbiAgICBjb25zdCBtaW1lVHlwZSA9IGZpbGUudHlwZTtcclxuICAgIGNvbnN0IGFsbG93ZWRNaW1lVHlwZXMgPSBbXHJcbiAgICAgIC4uLkltcG9ydFNlcnZpY2UuYWxsb3dlZE1pbWVUeXBlcyxcclxuICAgICAgLi4uSW1wb3J0U2VydmljZS5hbGxvd2VkWmlwTWltZVR5cGVzXHJcbiAgICBdO1xyXG4gICAgY29uc3QgYWxsb3dlZEV4dGVuc2lvbnMgPSBJbXBvcnRTZXJ2aWNlLmFsbG93ZWRFeHRlbnNpb25zO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgYWxsb3dlZE1pbWVUeXBlcy5pbmRleE9mKG1pbWVUeXBlKSA8IDAgJiZcclxuICAgICAgYWxsb3dlZEV4dGVuc2lvbnMuaW5kZXhPZihleHRlbnNpb24pIDwgMFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nIHx8XHJcbiAgICAgIFsnanNvbicsICdnZW9qc29uJywgJ2ttbCcsICdncHgnXS5pbmRleE9mKGV4dGVuc2lvbikgPj0gMFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmltcG9ydEZpbGU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMub2dyZVVybCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmltcG9ydEZpbGVXaXRoT2dyZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbXBvcnRBc3luYyhcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICBjb25zdCBkb0ltcG9ydCA9IChvYnNlcnZlcjogT2JzZXJ2ZXI8RmVhdHVyZVtdPikgPT4ge1xyXG4gICAgICBpZiAoZmlsZS5zaXplID49IDMwMDAwMDAwKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFNpemVFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaW1wb3J0ZXIgPSB0aGlzLmdldEZpbGVJbXBvcnRlcihmaWxlKTtcclxuICAgICAgaWYgKGltcG9ydGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0SW52YWxpZEZpbGVFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGltcG9ydGVyLmNhbGwodGhpcywgZmlsZSwgb2JzZXJ2ZXIsIHByb2plY3Rpb25JbiwgcHJvamVjdGlvbk91dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkb0ltcG9ydCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGltcG9ydEZpbGUoXHJcbiAgICBmaWxlOiBGaWxlLFxyXG4gICAgb2JzZXJ2ZXI6IE9ic2VydmVyPEZlYXR1cmVbXT4sXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICByZWFkZXIub25sb2FkID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMucGFyc2VGZWF0dXJlc0Zyb21GaWxlKFxyXG4gICAgICAgICAgZmlsZSxcclxuICAgICAgICAgIGV2ZW50LnRhcmdldC5yZXN1bHQsXHJcbiAgICAgICAgICBwcm9qZWN0aW9uSW4sXHJcbiAgICAgICAgICBwcm9qZWN0aW9uT3V0XHJcbiAgICAgICAgKTtcclxuICAgICAgICBvYnNlcnZlci5uZXh0KGZlYXR1cmVzKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yKCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZWFkZXIub25lcnJvciA9IGV2dCA9PiB7XHJcbiAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlLCAnVVRGLTgnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW1wb3J0RmlsZVdpdGhPZ3JlKFxyXG4gICAgZmlsZTogRmlsZSxcclxuICAgIG9ic2VydmVyOiBPYnNlcnZlcjxGZWF0dXJlW10+LFxyXG4gICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMub2dyZVVybH0vY29udmVydGA7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCd1cGxvYWQnLCBmaWxlKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnc291cmNlU3JzJywgcHJvamVjdGlvbkluKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgndGFyZ2V0U3JzJywgcHJvamVjdGlvbk91dCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2Zvcm1hdE91dHB1dCcsICdHRU9KU09OJyk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3NraXBGYWlsdXJlcycsICcnKTtcclxuXHJcbiAgICB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycygpIH0pLnN1YnNjcmliZShcclxuICAgICAgKHJlc3BvbnNlOiB7IGVycm9ycz86IHN0cmluZ1tdIH0gfCBvYmplY3QgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IChyZXNwb25zZSBhcyBhbnkpLmVycm9ycyB8fCBbXTtcclxuICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMucGFyc2VGZWF0dXJlc0Zyb21HZW9KU09OKFxyXG4gICAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgICByZXNwb25zZSxcclxuICAgICAgICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIG9ic2VydmVyLm5leHQoZmVhdHVyZXMpO1xyXG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgZXJyb3IuZXJyb3IuY2F1Z2h0ID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBlcnJNc2cgPSBlcnJvci5lcnJvci5tc2cgfHwgJyc7XHJcbiAgICAgICAgaWYgKGVyck1zZyA9PT0gJ05vIHZhbGlkIGZpbGVzIGZvdW5kJykge1xyXG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydEludmFsaWRGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIGVyck1zZy5zdGFydFdpdGgoJ0VSUk9SIDE6IEZhaWxlZCB0byBwcm9jZXNzIFNSUyBkZWZpbml0aW9uJylcclxuICAgICAgICApIHtcclxuICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRTUlNFcnJvcigpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZUZlYXR1cmVzRnJvbUZpbGUoXHJcbiAgICBmaWxlOiBGaWxlLFxyXG4gICAgZGF0YTogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICApOiBGZWF0dXJlW10ge1xyXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RmlsZUV4dGVuc2lvbihmaWxlKTtcclxuICAgIGNvbnN0IG1pbWVUeXBlID0gZmlsZS50eXBlO1xyXG5cclxuICAgIGNvbnN0IEdlb0pTT04gPSBuZXcgb2xmb3JtYXQuR2VvSlNPTigpO1xyXG5cclxuICAgIGxldCBmb3JtYXQ7XHJcbiAgICBpZiAobWltZVR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttbCt4bWwnKSB7XHJcbiAgICAgIGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5LTUwoKTtcclxuICAgIH0gZWxzZSBpZiAobWltZVR5cGUgPT09ICdhcHBsaWNhdGlvbi9nbWwreG1sJykge1xyXG4gICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuR01MKCk7XHJcbiAgICB9IGVsc2UgaWYgKG1pbWVUeXBlID09PSAnYXBwbGljYXRpb24vZ3B4K3htbCcpIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LkdQWCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoIChleHRlbnNpb24pIHtcclxuICAgICAgICBjYXNlICdrbWwnOlxyXG4gICAgICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LktNTCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZ3B4JzpcclxuICAgICAgICAgIGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5HUFgoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2dtbCc6XHJcbiAgICAgICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuR01MKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgZm9ybWF0ID0gR2VvSlNPTjtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGZvcm1hdC5yZWFkRmVhdHVyZXMoZGF0YSwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbkluLFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbk91dFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IG9sRmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihHZW9KU09OLndyaXRlRmVhdHVyZU9iamVjdChvbEZlYXR1cmUpLCB7XHJcbiAgICAgICAgcHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgICAgdGl0bGU6IGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUoZmlsZSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZUZlYXR1cmVzRnJvbUdlb0pTT04oXHJcbiAgICBmaWxlOiBGaWxlLFxyXG4gICAgZGF0YTogb2JqZWN0LFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKTogRmVhdHVyZVtdIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gbmV3IG9sZm9ybWF0Lkdlb0pTT04oKTtcclxuICAgIGNvbnN0IG9sRmVhdHVyZXMgPSBvbEZvcm1hdC5yZWFkRmVhdHVyZXMoZGF0YSk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IG9sRmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihvbEZvcm1hdC53cml0ZUZlYXR1cmVPYmplY3Qob2xGZWF0dXJlKSwge1xyXG4gICAgICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgaWQ6IHV1aWQoKSxcclxuICAgICAgICAgIHRpdGxlOiBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxuICB9XHJcbn1cclxuIl19