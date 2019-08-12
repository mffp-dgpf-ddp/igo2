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
import { ImportInvalidFileError, ImportUnreadableFileError } from './import.errors';
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
        const allowedMimeTypes = [...ImportService.allowedMimeTypes, ...ImportService.allowedZipMimeTypes];
        /** @type {?} */
        const allowedExtensions = ImportService.allowedExtensions;
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
        this.http
            .post(url, formData, { headers: new HttpHeaders() })
            .subscribe((/**
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
            observer.error(new ImportUnreadableFileError());
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
    ImportService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ImportService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvaW1wb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUl0QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUs3RSxNQUFNLE9BQU8sYUFBYTs7Ozs7SUF5QnhCLFlBQ1UsSUFBZ0IsRUFDaEIsTUFBcUI7UUFEckIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBRTdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVUsRUFBRSxZQUFZLEdBQUcsV0FBVyxFQUFFLGFBQWEsR0FBRyxXQUFXO1FBQ3hFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7OztJQUVPLGVBQWUsQ0FBQyxJQUFVOztjQUMxQixTQUFTLEdBQUcs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QWlCcEIsK0JBS0U7O0lBRUYsa0NBSUU7O0lBRUYsZ0NBTUU7Ozs7O0lBRUYsZ0NBQXdCOzs7OztJQUd0Qiw2QkFBd0I7Ozs7O0lBQ3hCLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJbXBvcnRJbnZhbGlkRmlsZUVycm9yLCBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yIH0gZnJvbSAnLi9pbXBvcnQuZXJyb3JzJztcclxuaW1wb3J0IHsgY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZSwgZ2V0RmlsZUV4dGVuc2lvbiB9IGZyb20gJy4vaW1wb3J0LnV0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEltcG9ydFNlcnZpY2Uge1xyXG5cclxuICBzdGF0aWMgYWxsb3dlZE1pbWVUeXBlcyA9IFtcclxuICAgICdhcHBsaWNhdGlvbi9nbWwreG1sJyxcclxuICAgICdhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttbCt4bWwnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL2dweCt4bWwnLFxyXG4gICAgJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgXTtcclxuXHJcbiAgc3RhdGljIGFsbG93ZWRaaXBNaW1lVHlwZXMgPSBbXHJcbiAgICAnYXBwbGljYXRpb24vemlwJyxcclxuICAgICdhcHBsaWNhdGlvbi94LXppcC1jb21wcmVzc2VkJyxcclxuICAgICdhcHBsaWNhdGlvbi94LXppcCdcclxuICBdO1xyXG5cclxuICBzdGF0aWMgYWxsb3dlZEV4dGVuc2lvbnMgPSBbXHJcbiAgICAnZ2VvanNvbicsXHJcbiAgICAna21sJyxcclxuICAgICdncHgnLFxyXG4gICAgJ2pzb24nLFxyXG4gICAgJ2dtbCdcclxuICBdO1xyXG5cclxuICBwcml2YXRlIG9ncmVVcmw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5vZ3JlVXJsID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQudXJsJyk7XHJcbiAgfVxyXG5cclxuICBpbXBvcnQoZmlsZTogRmlsZSwgcHJvamVjdGlvbkluID0gJ0VQU0c6NDMyNicsIHByb2plY3Rpb25PdXQgPSAnRVBTRzo0MzI2Jyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbXBvcnRBc3luYyhmaWxlLCBwcm9qZWN0aW9uSW4sIHByb2plY3Rpb25PdXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGaWxlSW1wb3J0ZXIoZmlsZTogRmlsZSk6IChmaWxlOiBGaWxlLCBvYnNlcnZlcjogT2JzZXJ2ZXI8RmVhdHVyZVtdPiwgcHJvamVjdGlvbkluOiBzdHJpbmcsIHByb2plY3Rpb25PdXQ6IHN0cmluZykgPT4gdm9pZCB7XHJcbiAgICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uKGZpbGUpO1xyXG4gICAgY29uc3QgbWltZVR5cGUgPSBmaWxlLnR5cGU7XHJcbiAgICBjb25zdCBhbGxvd2VkTWltZVR5cGVzID0gWy4uLkltcG9ydFNlcnZpY2UuYWxsb3dlZE1pbWVUeXBlcywgLi4uSW1wb3J0U2VydmljZS5hbGxvd2VkWmlwTWltZVR5cGVzXTtcclxuICAgIGNvbnN0IGFsbG93ZWRFeHRlbnNpb25zID0gSW1wb3J0U2VydmljZS5hbGxvd2VkRXh0ZW5zaW9ucztcclxuXHJcbiAgICBpZiAoYWxsb3dlZE1pbWVUeXBlcy5pbmRleE9mKG1pbWVUeXBlKSA8IDAgJiYgYWxsb3dlZEV4dGVuc2lvbnMuaW5kZXhPZihleHRlbnNpb24pIDwgMCkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIGlmIChtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nIHx8IFsnanNvbicsICdnZW9qc29uJywgJ2ttbCddLmluZGV4T2YoZXh0ZW5zaW9uKSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmltcG9ydEZpbGU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMub2dyZVVybCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmltcG9ydEZpbGVXaXRoT2dyZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbXBvcnRBc3luYyhmaWxlOiBGaWxlLCBwcm9qZWN0aW9uSW46IHN0cmluZywgcHJvamVjdGlvbk91dDogc3RyaW5nKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcclxuICAgIGNvbnN0IGRvSW1wb3J0ID0gKG9ic2VydmVyOiBPYnNlcnZlcjxGZWF0dXJlW10+KSA9PiB7XHJcbiAgICAgIGNvbnN0IGltcG9ydGVyID0gdGhpcy5nZXRGaWxlSW1wb3J0ZXIoZmlsZSk7XHJcbiAgICAgIGlmIChpbXBvcnRlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydEludmFsaWRGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbXBvcnRlci5jYWxsKHRoaXMsIGZpbGUsIG9ic2VydmVyLCBwcm9qZWN0aW9uSW4sIHByb2plY3Rpb25PdXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZG9JbXBvcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbXBvcnRGaWxlKGZpbGU6IEZpbGUsIG9ic2VydmVyOiBPYnNlcnZlcjxGZWF0dXJlW10+LCBwcm9qZWN0aW9uSW46IHN0cmluZywgcHJvamVjdGlvbk91dDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5wYXJzZUZlYXR1cmVzRnJvbUZpbGUoXHJcbiAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnJlc3VsdCxcclxuICAgICAgICAgIHByb2plY3Rpb25JbixcclxuICAgICAgICAgIHByb2plY3Rpb25PdXRcclxuICAgICAgICApO1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQoZmVhdHVyZXMpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlYWRlci5vbmVycm9yID0gZXZ0ID0+IHtcclxuICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUsICdVVEYtOCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbXBvcnRGaWxlV2l0aE9ncmUoZmlsZTogRmlsZSwgb2JzZXJ2ZXI6IE9ic2VydmVyPEZlYXR1cmVbXT4sIHByb2plY3Rpb25Jbjogc3RyaW5nLCBwcm9qZWN0aW9uT3V0OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMub2dyZVVybH0vY29udmVydGA7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCd1cGxvYWQnLCBmaWxlKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnc291cmNlU3JzJywgcHJvamVjdGlvbkluKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgndGFyZ2V0U3JzJywgcHJvamVjdGlvbk91dCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2Zvcm1hdE91dHB1dCcsICdHRU9KU09OJyk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3NraXBGYWlsdXJlcycsICcnKTtcclxuXHJcbiAgICB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QodXJsLCBmb3JtRGF0YSwge2hlYWRlcnM6IG5ldyBIdHRwSGVhZGVycygpfSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAocmVzcG9uc2U6IHtlcnJvcnM/OiBzdHJpbmdbXX0gfCBvYmplY3QgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSAocmVzcG9uc2UgYXMgYW55KS5lcnJvcnMgfHwgW107XHJcbiAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMucGFyc2VGZWF0dXJlc0Zyb21HZW9KU09OKGZpbGUsIHJlc3BvbnNlLCBwcm9qZWN0aW9uT3V0KTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChmZWF0dXJlcyk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlRmVhdHVyZXNGcm9tRmlsZShmaWxlOiBGaWxlLCBkYXRhOiBzdHJpbmcsIHByb2plY3Rpb25Jbjogc3RyaW5nLCBwcm9qZWN0aW9uT3V0OiBzdHJpbmcpOiBGZWF0dXJlW10ge1xyXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RmlsZUV4dGVuc2lvbihmaWxlKTtcclxuICAgIGNvbnN0IG1pbWVUeXBlID0gZmlsZS50eXBlO1xyXG5cclxuICAgIGNvbnN0IEdlb0pTT04gPSBuZXcgb2xmb3JtYXQuR2VvSlNPTigpO1xyXG5cclxuICAgIGxldCBmb3JtYXQ7XHJcbiAgICBpZiAobWltZVR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttbCt4bWwnKSB7XHJcbiAgICAgIGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5LTUwoKTtcclxuICAgIH0gZWxzZSBpZiAobWltZVR5cGUgPT09ICdhcHBsaWNhdGlvbi9nbWwreG1sJykge1xyXG4gICAgICBmb3JtYXQgPSBuZXcgb2xmb3JtYXQuR01MKCk7XHJcbiAgICB9IGVsc2UgaWYgKG1pbWVUeXBlID09PSAnYXBwbGljYXRpb24vZ3B4K3htbCcpIHtcclxuICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LkdQWCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoIChleHRlbnNpb24pIHtcclxuICAgICAgICBjYXNlICdrbWwnOlxyXG4gICAgICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LktNTCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICBjYXNlICdncHgnOlxyXG4gICAgICAgICAgZm9ybWF0ID0gbmV3IG9sZm9ybWF0LkdQWCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZ21sJzpcclxuICAgICAgICAgIGZvcm1hdCA9IG5ldyBvbGZvcm1hdC5HTUwoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmb3JtYXQgPSBHZW9KU09OO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gZm9ybWF0LnJlYWRGZWF0dXJlcyhkYXRhLCB7XHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW4sXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gb2xGZWF0dXJlcy5tYXAoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKEdlb0pTT04ud3JpdGVGZWF0dXJlT2JqZWN0KG9sRmVhdHVyZSksIHtcclxuICAgICAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgICB0aXRsZTogY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZShmaWxlKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlRmVhdHVyZXNGcm9tR2VvSlNPTihmaWxlOiBGaWxlLCBkYXRhOiBvYmplY3QsIHByb2plY3Rpb25PdXQ6IHN0cmluZyk6IEZlYXR1cmVbXSB7XHJcbiAgICBjb25zdCBvbEZvcm1hdCA9IG5ldyBvbGZvcm1hdC5HZW9KU09OKCk7XHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gb2xGb3JtYXQucmVhZEZlYXR1cmVzKGRhdGEpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBvbEZlYXR1cmVzLm1hcCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob2xGb3JtYXQud3JpdGVGZWF0dXJlT2JqZWN0KG9sRmVhdHVyZSksIHtcclxuICAgICAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIGlkOiB1dWlkKCksXHJcbiAgICAgICAgICB0aXRsZTogY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZShmaWxlKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==