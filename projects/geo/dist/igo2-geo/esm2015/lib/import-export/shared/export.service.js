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
export class ExportService {
    /**
     * @param {?} config
     */
    constructor(config) {
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
    export(olFeatures, format, title, projectionIn = 'EPSG:4326', projectionOut = 'EPSG:4326') {
        /** @type {?} */
        const exportOlFeatures = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature) => {
            /** @type {?} */
            const keys = olFeature
                .getKeys()
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => !key.startsWith('_')));
            /** @type {?} */
            const properties = keys.reduce((/**
             * @param {?} acc
             * @param {?} key
             * @return {?}
             */
            (acc, key) => {
                acc[key] = olFeature.get(key);
                return acc;
            }), { geometry: olFeature.getGeometry() });
            return new OlFeature(properties);
        }));
        return this.exportAsync(exportOlFeatures, format, title, projectionIn, projectionOut);
    }
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    exportAsync(olFeatures, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        const doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const nothingToExport = this.nothingToExport(olFeatures, format);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            const ogreFormats = Object.keys(ExportService.ogreFormats);
            if (ogreFormats.indexOf(format) >= 0) {
                if (this.ogreUrl === undefined) {
                    if (ExportService.noOgreFallbacks.indexOf(format) >= 0) {
                        this.exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut);
                    }
                    else {
                        observer.error(new ExportInvalidFileError());
                    }
                    return;
                }
                this.exportWithOgre(olFeatures, observer, format, title, projectionIn, projectionOut);
            }
            else {
                this.exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut);
            }
        });
        return new Observable(doExport);
    }
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
    exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        const olFormat = new olformat[format]();
        /** @type {?} */
        const featuresText = olFormat.writeFeatures(olFeatures, {
            dataProjection: projectionOut,
            featureProjection: projectionIn,
            featureType: 'feature',
            featureNS: 'http://example.com/feature'
        });
        /** @type {?} */
        const fileName = `${title}.${format.toLowerCase()}`;
        downloadContent(featuresText, 'text/plain;charset=utf-8', fileName);
        observer.complete();
    }
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
    exportWithOgre(olFeatures, observer, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        const featuresText = new olformat.GeoJSON().writeFeatures(olFeatures, {
            dataProjection: projectionOut,
            featureProjection: projectionIn,
            featureType: 'feature',
            featureNS: 'http://example.com/feature'
        });
        /** @type {?} */
        const url = `${this.ogreUrl}/convertJson`;
        /** @type {?} */
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('target', '_blank');
        form.setAttribute('action', url);
        form.acceptCharset = 'UTF-8';
        form.enctype = 'application/x-www-form-urlencoded; charset=utf-8;';
        /** @type {?} */
        const geojsonField = document.createElement('input');
        geojsonField.setAttribute('type', 'hidden');
        geojsonField.setAttribute('name', 'json');
        geojsonField.setAttribute('value', featuresText);
        form.appendChild(geojsonField);
        /** @type {?} */
        const outputNameField = document.createElement('input');
        /** @type {?} */
        const outputName = format === 'Shapefile'
            ? `${title}.zip`
            : `${title}.${format.toLowerCase()}`;
        outputNameField.setAttribute('type', 'hidden');
        outputNameField.setAttribute('name', 'outputName');
        outputNameField.setAttribute('value', outputName);
        form.appendChild(outputNameField);
        /** @type {?} */
        const ogreFormat = ExportService.ogreFormats[format];
        /** @type {?} */
        const outputFormatField = document.createElement('input');
        outputFormatField.setAttribute('type', 'hidden');
        outputFormatField.setAttribute('name', 'format');
        outputFormatField.setAttribute('value', ogreFormat);
        form.appendChild(outputFormatField);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        observer.complete();
    }
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @return {?}
     */
    nothingToExport(olFeatures, format) {
        if (olFeatures.length === 0) {
            return true;
        }
        if (format === 'GPX') {
            /** @type {?} */
            const pointOrLine = olFeatures.find((/**
             * @param {?} olFeature
             * @return {?}
             */
            olFeature => {
                return (['Point', 'LineString'].indexOf(olFeature.getGeometry().getType()) >=
                    0);
            }));
            return pointOrLine === undefined;
        }
        return false;
    }
}
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
ExportService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ ExportService.ngInjectableDef = i0.defineInjectable({ factory: function ExportService_Factory() { return new ExportService(i0.inject(i1.ConfigService)); }, token: ExportService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBR25DLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsMEJBQTBCLEVBQzNCLE1BQU0saUJBQWlCLENBQUM7OztBQUt6QixNQUFNLE9BQU8sYUFBYTs7OztJQWF4QixZQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7Ozs7SUFFRCxNQUFNLENBQ0osVUFBdUIsRUFDdkIsTUFBb0IsRUFDcEIsS0FBYSxFQUNiLFlBQVksR0FBRyxXQUFXLEVBQzFCLGFBQWEsR0FBRyxXQUFXOztjQUVyQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsR0FBRzs7OztRQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFOztrQkFDekQsSUFBSSxHQUFHLFNBQVM7aUJBQ25CLE9BQU8sRUFBRTtpQkFDVCxNQUFNOzs7O1lBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQzs7a0JBQzFDLFVBQVUsR0FBRyxJQUFJ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LENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNsRSxDQUFDLENBQ0YsQ0FBQztZQUNKLENBQUMsRUFBQztZQUNGLE9BQU8sV0FBVyxLQUFLLFNBQVMsQ0FBQztTQUNsQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7QUE3TE0seUJBQVcsR0FBRztJQUNuQixHQUFHLEVBQUUsS0FBSztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsR0FBRyxFQUFFLEtBQUs7SUFDVixTQUFTLEVBQUUsZ0JBQWdCO0lBQzNCLEdBQUcsRUFBRSxLQUFLO0NBQ1gsQ0FBQztBQUVLLDZCQUFlLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDOztZQVpoRCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFoQlEsYUFBYTs7Ozs7SUFrQnBCLDBCQU1FOztJQUVGLDhCQUErQzs7Ozs7SUFFL0MsZ0NBQXdCOzs7OztJQUVaLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgZG93bmxvYWRDb250ZW50IH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBFeHBvcnRGb3JtYXQgfSBmcm9tICcuL2V4cG9ydC50eXBlJztcclxuaW1wb3J0IHtcclxuICBFeHBvcnRJbnZhbGlkRmlsZUVycm9yLFxyXG4gIEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yXHJcbn0gZnJvbSAnLi9leHBvcnQuZXJyb3JzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cG9ydFNlcnZpY2Uge1xyXG4gIHN0YXRpYyBvZ3JlRm9ybWF0cyA9IHtcclxuICAgIEdNTDogJ2dtbCcsXHJcbiAgICBHUFg6ICdncHgnLFxyXG4gICAgS01MOiAna21sJyxcclxuICAgIFNoYXBlZmlsZTogJ0VTUkkgU2hhcGVmaWxlJyxcclxuICAgIENTVjogJ0NTVidcclxuICB9O1xyXG5cclxuICBzdGF0aWMgbm9PZ3JlRmFsbGJhY2tzID0gWydHTUwnLCAnR1BYJywgJ0tNTCddO1xyXG5cclxuICBwcml2YXRlIG9ncmVVcmw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMub2dyZVVybCA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0RXhwb3J0LnVybCcpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0KFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBmb3JtYXQ6IEV4cG9ydEZvcm1hdCxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uSW4gPSAnRVBTRzo0MzI2JyxcclxuICAgIHByb2plY3Rpb25PdXQgPSAnRVBTRzo0MzI2J1xyXG4gICk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgY29uc3QgZXhwb3J0T2xGZWF0dXJlcyA9IG9sRmVhdHVyZXMubWFwKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXlzID0gb2xGZWF0dXJlXHJcbiAgICAgICAgLmdldEtleXMoKVxyXG4gICAgICAgIC5maWx0ZXIoKGtleTogc3RyaW5nKSA9PiAha2V5LnN0YXJ0c1dpdGgoJ18nKSk7XHJcbiAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBrZXlzLnJlZHVjZShcclxuICAgICAgICAoYWNjOiBvYmplY3QsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBhY2Nba2V5XSA9IG9sRmVhdHVyZS5nZXQoa2V5KTtcclxuICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IGdlb21ldHJ5OiBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKSB9XHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBuZXcgT2xGZWF0dXJlKHByb3BlcnRpZXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXhwb3J0QXN5bmMoXHJcbiAgICAgIGV4cG9ydE9sRmVhdHVyZXMsXHJcbiAgICAgIGZvcm1hdCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIHByb2plY3Rpb25JbixcclxuICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhwb3J0QXN5bmMoXHJcbiAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgIGZvcm1hdDogRXhwb3J0Rm9ybWF0LFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkb0V4cG9ydCA9IChvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4pID0+IHtcclxuICAgICAgY29uc3Qgbm90aGluZ1RvRXhwb3J0ID0gdGhpcy5ub3RoaW5nVG9FeHBvcnQob2xGZWF0dXJlcywgZm9ybWF0KTtcclxuICAgICAgaWYgKG5vdGhpbmdUb0V4cG9ydCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG9ncmVGb3JtYXRzID0gT2JqZWN0LmtleXMoRXhwb3J0U2VydmljZS5vZ3JlRm9ybWF0cyk7XHJcbiAgICAgIGlmIChvZ3JlRm9ybWF0cy5pbmRleE9mKGZvcm1hdCkgPj0gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9ncmVVcmwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaWYgKEV4cG9ydFNlcnZpY2Uubm9PZ3JlRmFsbGJhY2tzLmluZGV4T2YoZm9ybWF0KSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwb3J0VG9GaWxlKFxyXG4gICAgICAgICAgICAgIG9sRmVhdHVyZXMsXHJcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIsXHJcbiAgICAgICAgICAgICAgZm9ybWF0LFxyXG4gICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgIHByb2plY3Rpb25JbixcclxuICAgICAgICAgICAgICBwcm9qZWN0aW9uT3V0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgRXhwb3J0SW52YWxpZEZpbGVFcnJvcigpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5leHBvcnRXaXRoT2dyZShcclxuICAgICAgICAgIG9sRmVhdHVyZXMsXHJcbiAgICAgICAgICBvYnNlcnZlcixcclxuICAgICAgICAgIGZvcm1hdCxcclxuICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgcHJvamVjdGlvbkluLFxyXG4gICAgICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5leHBvcnRUb0ZpbGUoXHJcbiAgICAgICAgICBvbEZlYXR1cmVzLFxyXG4gICAgICAgICAgb2JzZXJ2ZXIsXHJcbiAgICAgICAgICBmb3JtYXQsXHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIHByb2plY3Rpb25JbixcclxuICAgICAgICAgIHByb2plY3Rpb25PdXRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkb0V4cG9ydCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4cG9ydFRvRmlsZShcclxuICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgb2JzZXJ2ZXI6IE9ic2VydmVyPHZvaWQ+LFxyXG4gICAgZm9ybWF0OiBFeHBvcnRGb3JtYXQsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gbmV3IG9sZm9ybWF0W2Zvcm1hdF0oKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzVGV4dCA9IG9sRm9ybWF0LndyaXRlRmVhdHVyZXMob2xGZWF0dXJlcywge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JbixcclxuICAgICAgZmVhdHVyZVR5cGU6ICdmZWF0dXJlJyxcclxuICAgICAgZmVhdHVyZU5TOiAnaHR0cDovL2V4YW1wbGUuY29tL2ZlYXR1cmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmaWxlTmFtZSA9IGAke3RpdGxlfS4ke2Zvcm1hdC50b0xvd2VyQ2FzZSgpfWA7XHJcblxyXG4gICAgZG93bmxvYWRDb250ZW50KGZlYXR1cmVzVGV4dCwgJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcsIGZpbGVOYW1lKTtcclxuICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4cG9ydFdpdGhPZ3JlKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4sXHJcbiAgICBmb3JtYXQ6IHN0cmluZyxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3QgZmVhdHVyZXNUZXh0ID0gbmV3IG9sZm9ybWF0Lkdlb0pTT04oKS53cml0ZUZlYXR1cmVzKG9sRmVhdHVyZXMsIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW4sXHJcbiAgICAgIGZlYXR1cmVUeXBlOiAnZmVhdHVyZScsXHJcbiAgICAgIGZlYXR1cmVOUzogJ2h0dHA6Ly9leGFtcGxlLmNvbS9mZWF0dXJlJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5vZ3JlVXJsfS9jb252ZXJ0SnNvbmA7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsICdwb3N0Jyk7XHJcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIHVybCk7XHJcbiAgICBmb3JtLmFjY2VwdENoYXJzZXQgPSAnVVRGLTgnO1xyXG4gICAgZm9ybS5lbmN0eXBlID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtODsnO1xyXG5cclxuICAgIGNvbnN0IGdlb2pzb25GaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBnZW9qc29uRmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG4gICAgZ2VvanNvbkZpZWxkLnNldEF0dHJpYnV0ZSgnbmFtZScsICdqc29uJyk7XHJcbiAgICBnZW9qc29uRmllbGQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGZlYXR1cmVzVGV4dCk7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGdlb2pzb25GaWVsZCk7XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0TmFtZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGNvbnN0IG91dHB1dE5hbWUgPVxyXG4gICAgICBmb3JtYXQgPT09ICdTaGFwZWZpbGUnXHJcbiAgICAgICAgPyBgJHt0aXRsZX0uemlwYFxyXG4gICAgICAgIDogYCR7dGl0bGV9LiR7Zm9ybWF0LnRvTG93ZXJDYXNlKCl9YDtcclxuICAgIG91dHB1dE5hbWVGaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XHJcbiAgICBvdXRwdXROYW1lRmllbGQuc2V0QXR0cmlidXRlKCduYW1lJywgJ291dHB1dE5hbWUnKTtcclxuICAgIG91dHB1dE5hbWVGaWVsZC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgb3V0cHV0TmFtZSk7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKG91dHB1dE5hbWVGaWVsZCk7XHJcblxyXG4gICAgY29uc3Qgb2dyZUZvcm1hdCA9IEV4cG9ydFNlcnZpY2Uub2dyZUZvcm1hdHNbZm9ybWF0XTtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIG91dHB1dEZvcm1hdEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuICAgIG91dHB1dEZvcm1hdEZpZWxkLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmb3JtYXQnKTtcclxuICAgIG91dHB1dEZvcm1hdEZpZWxkLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBvZ3JlRm9ybWF0KTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQob3V0cHV0Rm9ybWF0RmllbGQpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmb3JtKTtcclxuXHJcbiAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBub3RoaW5nVG9FeHBvcnQob2xGZWF0dXJlczogT2xGZWF0dXJlW10sIGZvcm1hdDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAob2xGZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoZm9ybWF0ID09PSAnR1BYJykge1xyXG4gICAgICBjb25zdCBwb2ludE9yTGluZSA9IG9sRmVhdHVyZXMuZmluZChvbEZlYXR1cmUgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBbJ1BvaW50JywgJ0xpbmVTdHJpbmcnXS5pbmRleE9mKG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKSkgPj1cclxuICAgICAgICAgIDBcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHBvaW50T3JMaW5lID09PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==