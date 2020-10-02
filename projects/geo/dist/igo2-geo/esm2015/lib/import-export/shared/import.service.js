/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ImportService {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.ogreUrl = this.config.getConfig('importExport.url');
        /** @type {?} */
        const configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax = (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
    }
    /**
     * @param {?} file
     * @param {?=} projectionIn
     * @param {?=} projectionOut
     * @return {?}
     */
    import(file, projectionIn = 'EPSG:4326', projectionOut = 'EPSG:4326') {
        return this.importAsync(file, projectionIn, projectionOut);
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    getFileImporter(file) {
        /** @type {?} */
        const extension = getFileExtension(file);
        /** @type {?} */
        const mimeType = file.type;
        /** @type {?} */
        const allowedMimeTypes = [
            ...ImportService.allowedMimeTypes,
            ...ImportService.allowedZipMimeTypes
        ];
        /** @type {?} */
        const allowedExtensions = ImportService.allowedExtensions;
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
    }
    /**
     * @private
     * @param {?} file
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    importAsync(file, projectionIn, projectionOut) {
        /** @type {?} */
        const doImport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            if (file.size >= this.clientSideFileSizeMax) {
                observer.error(new ImportSizeError());
                return;
            }
            /** @type {?} */
            const importer = this.getFileImporter(file);
            if (importer === undefined) {
                observer.error(new ImportInvalidFileError());
                return;
            }
            importer.call(this, file, observer, projectionIn, projectionOut);
        });
        return new Observable(doImport);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    importFile(file, observer, projectionIn, projectionOut) {
        /** @type {?} */
        const reader = new FileReader();
        reader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            try {
                /** @type {?} */
                const features = this.parseFeaturesFromFile(file, event.target.result, projectionIn, projectionOut);
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
        evt => {
            observer.error(new ImportUnreadableFileError());
        });
        reader.readAsText(file, 'UTF-8');
    }
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    importFileWithOgre(file, observer, projectionIn, projectionOut) {
        /** @type {?} */
        const url = `${this.ogreUrl}/convert`;
        /** @type {?} */
        const formData = new FormData();
        formData.append('upload', file);
        formData.append('sourceSrs', projectionIn);
        formData.append('targetSrs', projectionOut);
        formData.append('formatOutput', 'GEOJSON');
        formData.append('skipFailures', '');
        this.http.post(url, formData, { headers: new HttpHeaders() }).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            if (response === null) {
                observer.error(new ImportUnreadableFileError());
                return;
            }
            /** @type {?} */
            const errors = ((/** @type {?} */ (response))).errors || [];
            if (errors.length > 0) {
                observer.error(new ImportUnreadableFileError());
            }
            else {
                /** @type {?} */
                const features = this.parseFeaturesFromGeoJSON(file, response, projectionOut);
                observer.next(features);
                observer.complete();
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            error.error.caught = true;
            /** @type {?} */
            const errMsg = error.error.msg || '';
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
    }
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    parseFeaturesFromFile(file, data, projectionIn, projectionOut) {
        /** @type {?} */
        const extension = getFileExtension(file);
        /** @type {?} */
        const mimeType = file.type;
        /** @type {?} */
        const GeoJSON = new olformat.GeoJSON();
        /** @type {?} */
        let format;
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
        const olFeatures = format.readFeatures(data, {
            dataProjection: projectionIn,
            featureProjection: projectionOut
        });
        /** @type {?} */
        const features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            return Object.assign(GeoJSON.writeFeatureObject(olFeature), {
                projection: projectionOut,
                meta: {
                    id: uuid(),
                    title: computeLayerTitleFromFile(file)
                }
            });
        }));
        return features;
    }
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionOut
     * @return {?}
     */
    parseFeaturesFromGeoJSON(file, data, projectionOut) {
        /** @type {?} */
        const olFormat = new olformat.GeoJSON();
        /** @type {?} */
        const olFeatures = olFormat.readFeatures(data);
        /** @type {?} */
        const features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            return Object.assign(olFormat.writeFeatureObject(olFeature), {
                projection: projectionOut,
                meta: {
                    id: uuid(),
                    title: computeLayerTitleFromFile(file)
                }
            });
        }));
        return features;
    }
}
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
ImportService.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService }
];
/** @nocollapse */ ImportService.ngInjectableDef = i0.defineInjectable({ factory: function ImportService_Factory() { return new ImportService(i0.inject(i1.HttpClient), i0.inject(i2.ConfigService)); }, token: ImportService, providedIn: "root" });
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
    ImportService.prototype.clientSideFileSizeMax;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvaW1wb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUl0QyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUN6QixlQUFlLEVBQ2YsY0FBYyxFQUNmLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLN0UsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBbUJ4QixZQUFvQixJQUFnQixFQUFVLE1BQXFCO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7Y0FDbkQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsc0NBQXNDLENBQUM7UUFDdEYsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElB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QUksUUFBUSxDQUFDLE9BQU8sRUFBRTs7Y0FDakMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDOztjQUN4QyxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtZQUN2RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzRCxVQUFVLEVBQUUsYUFBYTtnQkFDekIsSUFBSSxFQUFFO29CQUNKLEVBQUUsRUFBRSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLHlCQUF5QixDQUFDLElBQUksQ0FBQztpQkFDdkM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUM7UUFFRixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOztBQTlPTSw4QkFBZ0IsR0FBRztJQUN4QixxQkFBcUI7SUFDckIsc0NBQXNDO0lBQ3RDLHFCQUFxQjtJQUNyQixrQkFBa0I7Q0FDbkIsQ0FBQztBQUVLLGlDQUFtQixHQUFHO0lBQzNCLGlCQUFpQjtJQUNqQiw4QkFBOEI7SUFDOUIsbUJBQW1CO0NBQ3BCLENBQUM7QUFFSywrQkFBaUIsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzs7WUFqQnJFLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXJCUSxVQUFVO1lBRVYsYUFBYTs7Ozs7SUFxQnBCLCtCQUtFOztJQUVGLGtDQUlFOztJQUVGLGdDQUFvRTs7Ozs7SUFFcEUsZ0NBQXdCOzs7OztJQUN4Qiw4Q0FBc0M7Ozs7O0lBRTFCLDZCQUF3Qjs7Ozs7SUFBRSwrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBJbXBvcnRJbnZhbGlkRmlsZUVycm9yLFxyXG4gIEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IsXHJcbiAgSW1wb3J0U2l6ZUVycm9yLFxyXG4gIEltcG9ydFNSU0Vycm9yXHJcbn0gZnJvbSAnLi9pbXBvcnQuZXJyb3JzJztcclxuaW1wb3J0IHsgY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZSwgZ2V0RmlsZUV4dGVuc2lvbiB9IGZyb20gJy4vaW1wb3J0LnV0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEltcG9ydFNlcnZpY2Uge1xyXG4gIHN0YXRpYyBhbGxvd2VkTWltZVR5cGVzID0gW1xyXG4gICAgJ2FwcGxpY2F0aW9uL2dtbCt4bWwnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtZWFydGgua21sK3htbCcsXHJcbiAgICAnYXBwbGljYXRpb24vZ3B4K3htbCcsXHJcbiAgICAnYXBwbGljYXRpb24vanNvbidcclxuICBdO1xyXG5cclxuICBzdGF0aWMgYWxsb3dlZFppcE1pbWVUeXBlcyA9IFtcclxuICAgICdhcHBsaWNhdGlvbi96aXAnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL3gtemlwLWNvbXByZXNzZWQnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL3gtemlwJ1xyXG4gIF07XHJcblxyXG4gIHN0YXRpYyBhbGxvd2VkRXh0ZW5zaW9ucyA9IFsnZ2VvanNvbicsICdrbWwnLCAnZ3B4JywgJ2pzb24nLCAnZ21sJ107XHJcblxyXG4gIHByaXZhdGUgb2dyZVVybDogc3RyaW5nO1xyXG4gIHByaXZhdGUgY2xpZW50U2lkZUZpbGVTaXplTWF4OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMub2dyZVVybCA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0RXhwb3J0LnVybCcpO1xyXG4gICAgY29uc3QgY29uZmlnRmlsZVNpemVNYiA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0RXhwb3J0LmNsaWVudFNpZGVGaWxlU2l6ZU1heE1iJyk7XHJcbiAgICB0aGlzLmNsaWVudFNpZGVGaWxlU2l6ZU1heCA9IChjb25maWdGaWxlU2l6ZU1iID8gY29uZmlnRmlsZVNpemVNYiA6IDMwKSAqICBNYXRoLnBvdygxMDI0LCAyKTtcclxuICB9XHJcblxyXG4gIGltcG9ydChcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBwcm9qZWN0aW9uSW4gPSAnRVBTRzo0MzI2JyxcclxuICAgIHByb2plY3Rpb25PdXQgPSAnRVBTRzo0MzI2J1xyXG4gICk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbXBvcnRBc3luYyhmaWxlLCBwcm9qZWN0aW9uSW4sIHByb2plY3Rpb25PdXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGaWxlSW1wb3J0ZXIoXHJcbiAgICBmaWxlOiBGaWxlXHJcbiAgKTogKFxyXG4gICAgZmlsZTogRmlsZSxcclxuICAgIG9ic2VydmVyOiBPYnNlcnZlcjxGZWF0dXJlW10+LFxyXG4gICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICApID0+IHZvaWQge1xyXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RmlsZUV4dGVuc2lvbihmaWxlKTtcclxuICAgIGNvbnN0IG1pbWVUeXBlID0gZmlsZS50eXBlO1xyXG4gICAgY29uc3QgYWxsb3dlZE1pbWVUeXBlcyA9IFtcclxuICAgICAgLi4uSW1wb3J0U2VydmljZS5hbGxvd2VkTWltZVR5cGVzLFxyXG4gICAgICAuLi5JbXBvcnRTZXJ2aWNlLmFsbG93ZWRaaXBNaW1lVHlwZXNcclxuICAgIF07XHJcbiAgICBjb25zdCBhbGxvd2VkRXh0ZW5zaW9ucyA9IEltcG9ydFNlcnZpY2UuYWxsb3dlZEV4dGVuc2lvbnM7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBhbGxvd2VkTWltZVR5cGVzLmluZGV4T2YobWltZVR5cGUpIDwgMCAmJlxyXG4gICAgICBhbGxvd2VkRXh0ZW5zaW9ucy5pbmRleE9mKGV4dGVuc2lvbikgPCAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIG1pbWVUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicgfHxcclxuICAgICAgWydqc29uJywgJ2dlb2pzb24nLCAna21sJywgJ2dweCddLmluZGV4T2YoZXh0ZW5zaW9uKSA+PSAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW1wb3J0RmlsZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vZ3JlVXJsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW1wb3J0RmlsZVdpdGhPZ3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGltcG9ydEFzeW5jKFxyXG4gICAgZmlsZTogRmlsZSxcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuICAgIGNvbnN0IGRvSW1wb3J0ID0gKG9ic2VydmVyOiBPYnNlcnZlcjxGZWF0dXJlW10+KSA9PiB7XHJcbiAgICAgIGlmIChmaWxlLnNpemUgPj0gdGhpcy5jbGllbnRTaWRlRmlsZVNpemVNYXgpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0U2l6ZUVycm9yKCkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBpbXBvcnRlciA9IHRoaXMuZ2V0RmlsZUltcG9ydGVyKGZpbGUpO1xyXG4gICAgICBpZiAoaW1wb3J0ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRJbnZhbGlkRmlsZUVycm9yKCkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaW1wb3J0ZXIuY2FsbCh0aGlzLCBmaWxlLCBvYnNlcnZlciwgcHJvamVjdGlvbkluLCBwcm9qZWN0aW9uT3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGRvSW1wb3J0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW1wb3J0RmlsZShcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8RmVhdHVyZVtdPixcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5wYXJzZUZlYXR1cmVzRnJvbUZpbGUoXHJcbiAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnJlc3VsdCxcclxuICAgICAgICAgIHByb2plY3Rpb25JbixcclxuICAgICAgICAgIHByb2plY3Rpb25PdXRcclxuICAgICAgICApO1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQoZmVhdHVyZXMpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlYWRlci5vbmVycm9yID0gZXZ0ID0+IHtcclxuICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUsICdVVEYtOCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbXBvcnRGaWxlV2l0aE9ncmUoXHJcbiAgICBmaWxlOiBGaWxlLFxyXG4gICAgb2JzZXJ2ZXI6IE9ic2VydmVyPEZlYXR1cmVbXT4sXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5vZ3JlVXJsfS9jb252ZXJ0YDtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3VwbG9hZCcsIGZpbGUpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdzb3VyY2VTcnMnLCBwcm9qZWN0aW9uSW4pO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCd0YXJnZXRTcnMnLCBwcm9qZWN0aW9uT3V0KTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZm9ybWF0T3V0cHV0JywgJ0dFT0pTT04nKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnc2tpcEZhaWx1cmVzJywgJycpO1xyXG5cclxuICAgIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKCkgfSkuc3Vic2NyaWJlKFxyXG4gICAgICAocmVzcG9uc2U6IHsgZXJyb3JzPzogc3RyaW5nW10gfSB8IG9iamVjdCB8IG51bGwpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UgPT09IG51bGwpIHtcclxuICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yKCkpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gKHJlc3BvbnNlIGFzIGFueSkuZXJyb3JzIHx8IFtdO1xyXG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5wYXJzZUZlYXR1cmVzRnJvbUdlb0pTT04oXHJcbiAgICAgICAgICAgIGZpbGUsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLFxyXG4gICAgICAgICAgICBwcm9qZWN0aW9uT3V0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChmZWF0dXJlcyk7XHJcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICBlcnJvci5lcnJvci5jYXVnaHQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGVyck1zZyA9IGVycm9yLmVycm9yLm1zZyB8fCAnJztcclxuICAgICAgICBpZiAoZXJyTXNnID09PSAnTm8gdmFsaWQgZmlsZXMgZm91bmQnKSB7XHJcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0SW52YWxpZEZpbGVFcnJvcigpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgZXJyTXNnLnN0YXJ0V2l0aCgnRVJST1IgMTogRmFpbGVkIHRvIHByb2Nlc3MgU1JTIGRlZmluaXRpb24nKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFNSU0Vycm9yKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlRmVhdHVyZXNGcm9tRmlsZShcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBkYXRhOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICk6IEZlYXR1cmVbXSB7XHJcbiAgICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uKGZpbGUpO1xyXG4gICAgY29uc3QgbWltZVR5cGUgPSBmaWxlLnR5cGU7XHJcblxyXG4gICAgY29uc3QgR2VvSlNPTiA9IG5ldyBvbGZvcm1hdC5HZW9KU09OKCk7XHJcblxyXG4gICAgbGV0IGZvcm1hdDtcclxuICAgIGlmIChtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtZWFydGgua21sK3htbCcpIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LktNTCgpO1xyXG4gICAgfSBlbHNlIGlmIChtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2dtbCt4bWwnKSB7XHJcbiAgICAgIGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5HTUwoKTtcclxuICAgIH0gZWxzZSBpZiAobWltZVR5cGUgPT09ICdhcHBsaWNhdGlvbi9ncHgreG1sJykge1xyXG4gICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuR1BYKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2l0Y2ggKGV4dGVuc2lvbikge1xyXG4gICAgICAgIGNhc2UgJ2ttbCc6XHJcbiAgICAgICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuS01MKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdncHgnOlxyXG4gICAgICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LkdQWCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZ21sJzpcclxuICAgICAgICAgIGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5HTUwoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmb3JtYXQgPSBHZW9KU09OO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gZm9ybWF0LnJlYWRGZWF0dXJlcyhkYXRhLCB7XHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW4sXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gb2xGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKEdlb0pTT04ud3JpdGVGZWF0dXJlT2JqZWN0KG9sRmVhdHVyZSksIHtcclxuICAgICAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgICB0aXRsZTogY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZShmaWxlKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlRmVhdHVyZXNGcm9tR2VvSlNPTihcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBkYXRhOiBvYmplY3QsXHJcbiAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICApOiBGZWF0dXJlW10ge1xyXG4gICAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgb2xmb3JtYXQuR2VvSlNPTigpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlcyhkYXRhKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gb2xGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG9sRm9ybWF0LndyaXRlRmVhdHVyZU9iamVjdChvbEZlYXR1cmUpLCB7XHJcbiAgICAgICAgcHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICBpZDogdXVpZCgpLFxyXG4gICAgICAgICAgdGl0bGU6IGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUoZmlsZSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG4gIH1cclxufVxyXG4iXX0=