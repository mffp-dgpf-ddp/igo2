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
import { ExportFormat } from './export.type';
import { ExportInvalidFileError, ExportNothingToExportError } from './export.errors';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
export class ExportService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.aggregateInComment = true;
        this.ogreUrl = this.config.getConfig('importExport.url');
        /** @type {?} */
        const gpxAggregateInComment = this.config.getConfig('importExport.gpxAggregateInComment');
        if (gpxAggregateInComment !== undefined) {
            this.aggregateInComment = gpxAggregateInComment;
        }
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
        const exportOlFeatures = this.generateFeature(olFeatures, format);
        return this.exportAsync(exportOlFeatures, format, title, projectionIn, projectionOut);
    }
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @return {?}
     */
    generateFeature(olFeatures, format) {
        if (format === ExportFormat.GPX && this.aggregateInComment) {
            return this.generateAggratedFeature(olFeatures);
        }
        return olFeatures.map((/**
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
    }
    /**
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    generateAggratedFeature(olFeatures) {
        return olFeatures.map((/**
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
            let comment = '';
            /** @type {?} */
            const properties = keys.reduce((/**
             * @param {?} acc
             * @param {?} key
             * @return {?}
             */
            (acc, key) => {
                if (key !== undefined && key !== 'geometry') {
                    comment += key + ':' + olFeature.get(key) + '   \r\n';
                }
                acc[key] = olFeature.get(key);
                return acc;
            }), { geometry: olFeature.getGeometry() });
            /** @type {?} */
            const newFeature = new OlFeature(properties);
            newFeature.set('name', olFeature.getId());
            newFeature.set('cmt', comment);
            return newFeature;
        }));
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
     * @protected
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
        form.style.display = 'none';
        document.body.appendChild(form);
        form.setAttribute('method', 'post');
        form.setAttribute('target', '_blank');
        form.setAttribute('action', url);
        form.acceptCharset = 'UTF-8';
        form.enctype = 'application/x-www-form-urlencoded; charset=utf-8;';
        if (format === 'CSVsemicolon') {
            /** @type {?} */
            const options = document.createElement('input');
            options.setAttribute('type', 'hidden');
            options.setAttribute('name', 'lco');
            options.setAttribute('value', 'SEPARATOR=SEMICOLON');
            form.appendChild(options);
        }
        /** @type {?} */
        const geojsonField = document.createElement('input');
        geojsonField.setAttribute('type', 'hidden');
        geojsonField.setAttribute('name', 'json');
        geojsonField.setAttribute('value', featuresText);
        form.appendChild(geojsonField);
        /** @type {?} */
        const outputNameField = document.createElement('input');
        /** @type {?} */
        let outputName = format === 'Shapefile'
            ? `${title}.zip`
            : `${title}.${format.toLowerCase()}`;
        if (format === 'CSVcomma' || format === 'CSVsemicolon') {
            outputName = `${title}.csv`;
        }
        outputName = outputName.replace(' ', '_');
        outputName = outputName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        outputNameField.setAttribute('type', 'hidden');
        outputNameField.setAttribute('name', 'outputName');
        outputNameField.setAttribute('value', outputName);
        form.appendChild(outputNameField);
        /** @type {?} */
        let ogreFormat = ExportService.ogreFormats[format];
        if (format === 'CSVcomma' || format === 'CSVsemicolon') {
            ogreFormat = 'CSV';
        }
        /** @type {?} */
        const outputFormatField = document.createElement('input');
        outputFormatField.setAttribute('type', 'hidden');
        outputFormatField.setAttribute('name', 'format');
        outputFormatField.setAttribute('value', ogreFormat);
        form.appendChild(outputFormatField);
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
                return (['Point', 'LineString', 'MultiLineString'].indexOf(olFeature.getGeometry().getType()) >=
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
    CSVcomma: 'CSVcomma',
    CSVsemicolon: 'CSVsemicolon'
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
    ExportService.prototype.aggregateInComment;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUNMLHNCQUFzQixFQUN0QiwwQkFBMEIsRUFDM0IsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBS3pCLE1BQU0sT0FBTyxhQUFhOzs7O0lBZXhCLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFGakMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBR3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7Y0FDbkQscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ2pELG9DQUFvQyxDQUNyQztRQUNELElBQUkscUJBQXFCLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQztTQUNqRDtJQUNILENBQUM7Ozs7Ozs7OztJQUVELE1BQU0sQ0FDSixVQUF1QixFQUN2QixNQUFvQixFQUNwQixLQUFhLEVBQ2IsWUFBWSxHQUFHLFdBQVcsRUFDMUIsYUFBYSxHQUFHLFdBQVc7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LFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSTs7OztZQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLENBQ0wsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckYsQ0FBQyxDQUNGLENBQUM7WUFDSixDQUFDLEVBQUM7WUFDRixPQUFPLFdBQVcsS0FBSyxTQUFTLENBQUM7U0FDbEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O0FBN1BNLHlCQUFXLEdBQUc7SUFDbkIsR0FBRyxFQUFFLEtBQUs7SUFDVixHQUFHLEVBQUUsS0FBSztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsU0FBUyxFQUFFLGdCQUFnQjtJQUMzQixRQUFRLEVBQUUsVUFBVTtJQUNwQixZQUFZLEVBQUUsY0FBYztDQUM3QixDQUFDO0FBRUssNkJBQWUsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7O1lBYmhELFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWhCUSxhQUFhOzs7OztJQWtCcEIsMEJBT0U7O0lBRUYsOEJBQStDOzs7OztJQUUvQyxnQ0FBd0I7Ozs7O0lBQ3hCLDJDQUEyQzs7Ozs7SUFFL0IsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBkb3dubG9hZENvbnRlbnQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IEV4cG9ydEZvcm1hdCB9IGZyb20gJy4vZXhwb3J0LnR5cGUnO1xyXG5pbXBvcnQge1xyXG4gIEV4cG9ydEludmFsaWRGaWxlRXJyb3IsXHJcbiAgRXhwb3J0Tm90aGluZ1RvRXhwb3J0RXJyb3JcclxufSBmcm9tICcuL2V4cG9ydC5lcnJvcnMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwb3J0U2VydmljZSB7XHJcbiAgc3RhdGljIG9ncmVGb3JtYXRzID0ge1xyXG4gICAgR01MOiAnZ21sJyxcclxuICAgIEdQWDogJ2dweCcsXHJcbiAgICBLTUw6ICdrbWwnLFxyXG4gICAgU2hhcGVmaWxlOiAnRVNSSSBTaGFwZWZpbGUnLFxyXG4gICAgQ1NWY29tbWE6ICdDU1Zjb21tYScsXHJcbiAgICBDU1ZzZW1pY29sb246ICdDU1ZzZW1pY29sb24nXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIG5vT2dyZUZhbGxiYWNrcyA9IFsnR01MJywgJ0dQWCcsICdLTUwnXTtcclxuXHJcbiAgcHJpdmF0ZSBvZ3JlVXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBhZ2dyZWdhdGVJbkNvbW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5vZ3JlVXJsID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQudXJsJyk7XHJcbiAgICBjb25zdCBncHhBZ2dyZWdhdGVJbkNvbW1lbnQgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoXHJcbiAgICAgICdpbXBvcnRFeHBvcnQuZ3B4QWdncmVnYXRlSW5Db21tZW50J1xyXG4gICAgKTtcclxuICAgIGlmIChncHhBZ2dyZWdhdGVJbkNvbW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFnZ3JlZ2F0ZUluQ29tbWVudCA9IGdweEFnZ3JlZ2F0ZUluQ29tbWVudDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydChcclxuICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgZm9ybWF0OiBFeHBvcnRGb3JtYXQsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbkluID0gJ0VQU0c6NDMyNicsXHJcbiAgICBwcm9qZWN0aW9uT3V0ID0gJ0VQU0c6NDMyNidcclxuICApOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGV4cG9ydE9sRmVhdHVyZXMgPSB0aGlzLmdlbmVyYXRlRmVhdHVyZShvbEZlYXR1cmVzLCBmb3JtYXQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmV4cG9ydEFzeW5jKFxyXG4gICAgICBleHBvcnRPbEZlYXR1cmVzLFxyXG4gICAgICBmb3JtYXQsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBwcm9qZWN0aW9uSW4sXHJcbiAgICAgIHByb2plY3Rpb25PdXRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdlbmVyYXRlRmVhdHVyZShcclxuICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgZm9ybWF0OiBFeHBvcnRGb3JtYXRcclxuICApOiBPbEZlYXR1cmVbXSB7XHJcbiAgICBpZiAoZm9ybWF0ID09PSBFeHBvcnRGb3JtYXQuR1BYICYmIHRoaXMuYWdncmVnYXRlSW5Db21tZW50KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlQWdncmF0ZWRGZWF0dXJlKG9sRmVhdHVyZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvbEZlYXR1cmVzLm1hcCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IG9sRmVhdHVyZVxyXG4gICAgICAgIC5nZXRLZXlzKClcclxuICAgICAgICAuZmlsdGVyKChrZXk6IHN0cmluZykgPT4gIWtleS5zdGFydHNXaXRoKCdfJykpO1xyXG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0ga2V5cy5yZWR1Y2UoXHJcbiAgICAgICAgKGFjYzogb2JqZWN0LCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgYWNjW2tleV0gPSBvbEZlYXR1cmUuZ2V0KGtleSk7XHJcbiAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBnZW9tZXRyeTogb2xGZWF0dXJlLmdldEdlb21ldHJ5KCkgfVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gbmV3IE9sRmVhdHVyZShwcm9wZXJ0aWVzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUFnZ3JhdGVkRmVhdHVyZShvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSk6IE9sRmVhdHVyZVtdIHtcclxuICAgIHJldHVybiBvbEZlYXR1cmVzLm1hcCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IG9sRmVhdHVyZVxyXG4gICAgICAgIC5nZXRLZXlzKClcclxuICAgICAgICAuZmlsdGVyKChrZXk6IHN0cmluZykgPT4gIWtleS5zdGFydHNXaXRoKCdfJykpO1xyXG4gICAgICBsZXQgY29tbWVudDogc3RyaW5nID0gJyc7XHJcbiAgICAgIGNvbnN0IHByb3BlcnRpZXM6IGFueVtdID0ga2V5cy5yZWR1Y2UoXHJcbiAgICAgICAgKGFjYzogb2JqZWN0LCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkICYmIGtleSAhPT0gJ2dlb21ldHJ5Jykge1xyXG4gICAgICAgICAgICBjb21tZW50ICs9IGtleSArICc6JyArIG9sRmVhdHVyZS5nZXQoa2V5KSArICcgICBcXHJcXG4nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYWNjW2tleV0gPSBvbEZlYXR1cmUuZ2V0KGtleSk7XHJcbiAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBnZW9tZXRyeTogb2xGZWF0dXJlLmdldEdlb21ldHJ5KCkgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBuZXdGZWF0dXJlID0gbmV3IE9sRmVhdHVyZShwcm9wZXJ0aWVzKTtcclxuICAgICAgbmV3RmVhdHVyZS5zZXQoJ25hbWUnLCBvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICAgIG5ld0ZlYXR1cmUuc2V0KCdjbXQnLCBjb21tZW50KTtcclxuXHJcbiAgICAgIHJldHVybiBuZXdGZWF0dXJlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4cG9ydEFzeW5jKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBmb3JtYXQ6IEV4cG9ydEZvcm1hdCxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgY29uc3QgZG9FeHBvcnQgPSAob2JzZXJ2ZXI6IE9ic2VydmVyPHZvaWQ+KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vdGhpbmdUb0V4cG9ydCA9IHRoaXMubm90aGluZ1RvRXhwb3J0KG9sRmVhdHVyZXMsIGZvcm1hdCk7XHJcbiAgICAgIGlmIChub3RoaW5nVG9FeHBvcnQgPT09IHRydWUpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgRXhwb3J0Tm90aGluZ1RvRXhwb3J0RXJyb3IoKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBvZ3JlRm9ybWF0cyA9IE9iamVjdC5rZXlzKEV4cG9ydFNlcnZpY2Uub2dyZUZvcm1hdHMpO1xyXG4gICAgICBpZiAob2dyZUZvcm1hdHMuaW5kZXhPZihmb3JtYXQpID49IDApIHtcclxuICAgICAgICBpZiAodGhpcy5vZ3JlVXJsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmIChFeHBvcnRTZXJ2aWNlLm5vT2dyZUZhbGxiYWNrcy5pbmRleE9mKGZvcm1hdCkgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmV4cG9ydFRvRmlsZShcclxuICAgICAgICAgICAgICBvbEZlYXR1cmVzLFxyXG4gICAgICAgICAgICAgIG9ic2VydmVyLFxyXG4gICAgICAgICAgICAgIGZvcm1hdCxcclxuICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICBwcm9qZWN0aW9uSW4sXHJcbiAgICAgICAgICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEV4cG9ydEludmFsaWRGaWxlRXJyb3IoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXhwb3J0V2l0aE9ncmUoXHJcbiAgICAgICAgICBvbEZlYXR1cmVzLFxyXG4gICAgICAgICAgb2JzZXJ2ZXIsXHJcbiAgICAgICAgICBmb3JtYXQsXHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIHByb2plY3Rpb25JbixcclxuICAgICAgICAgIHByb2plY3Rpb25PdXRcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZXhwb3J0VG9GaWxlKFxyXG4gICAgICAgICAgb2xGZWF0dXJlcyxcclxuICAgICAgICAgIG9ic2VydmVyLFxyXG4gICAgICAgICAgZm9ybWF0LFxyXG4gICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICBwcm9qZWN0aW9uSW4sXHJcbiAgICAgICAgICBwcm9qZWN0aW9uT3V0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZG9FeHBvcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGV4cG9ydFRvRmlsZShcclxuICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgb2JzZXJ2ZXI6IE9ic2VydmVyPHZvaWQ+LFxyXG4gICAgZm9ybWF0OiBFeHBvcnRGb3JtYXQsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICApIHtcclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gbmV3IG9sZm9ybWF0W2Zvcm1hdF0oKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzVGV4dCA9IG9sRm9ybWF0LndyaXRlRmVhdHVyZXMob2xGZWF0dXJlcywge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JbixcclxuICAgICAgZmVhdHVyZVR5cGU6ICdmZWF0dXJlJyxcclxuICAgICAgZmVhdHVyZU5TOiAnaHR0cDovL2V4YW1wbGUuY29tL2ZlYXR1cmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmaWxlTmFtZSA9IGAke3RpdGxlfS4ke2Zvcm1hdC50b0xvd2VyQ2FzZSgpfWA7XHJcblxyXG4gICAgZG93bmxvYWRDb250ZW50KGZlYXR1cmVzVGV4dCwgJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcsIGZpbGVOYW1lKTtcclxuICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4cG9ydFdpdGhPZ3JlKFxyXG4gICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4sXHJcbiAgICBmb3JtYXQ6IHN0cmluZyxcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgY29uc3QgZmVhdHVyZXNUZXh0OiBzdHJpbmcgPSBuZXcgb2xmb3JtYXQuR2VvSlNPTigpLndyaXRlRmVhdHVyZXMoXHJcbiAgICAgIG9sRmVhdHVyZXMsXHJcbiAgICAgIHtcclxuICAgICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluLFxyXG4gICAgICAgIGZlYXR1cmVUeXBlOiAnZmVhdHVyZScsXHJcbiAgICAgICAgZmVhdHVyZU5TOiAnaHR0cDovL2V4YW1wbGUuY29tL2ZlYXR1cmUnXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5vZ3JlVXJsfS9jb252ZXJ0SnNvbmA7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAncG9zdCcpO1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLCB1cmwpO1xyXG5cclxuICAgIGZvcm0uYWNjZXB0Q2hhcnNldCA9ICdVVEYtOCc7XHJcbiAgICBmb3JtLmVuY3R5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04Oyc7XHJcblxyXG4gICAgaWYgKGZvcm1hdCA9PT0gJ0NTVnNlbWljb2xvbicpIHtcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIG9wdGlvbnMuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG4gICAgICBvcHRpb25zLnNldEF0dHJpYnV0ZSgnbmFtZScsICdsY28nKTtcclxuICAgICAgb3B0aW9ucy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ1NFUEFSQVRPUj1TRU1JQ09MT04nKTtcclxuICAgICAgZm9ybS5hcHBlbmRDaGlsZChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW9qc29uRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgZ2VvanNvbkZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuICAgIGdlb2pzb25GaWVsZC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnanNvbicpO1xyXG4gICAgZ2VvanNvbkZpZWxkLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBmZWF0dXJlc1RleHQpO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChnZW9qc29uRmllbGQpO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dE5hbWVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBsZXQgb3V0cHV0TmFtZSA9XHJcbiAgICAgIGZvcm1hdCA9PT0gJ1NoYXBlZmlsZSdcclxuICAgICAgICA/IGAke3RpdGxlfS56aXBgXHJcbiAgICAgICAgOiBgJHt0aXRsZX0uJHtmb3JtYXQudG9Mb3dlckNhc2UoKX1gO1xyXG4gICAgaWYgKGZvcm1hdCA9PT0gJ0NTVmNvbW1hJyB8fCBmb3JtYXQgPT09ICdDU1ZzZW1pY29sb24nKSB7XHJcbiAgICAgIG91dHB1dE5hbWUgPSBgJHt0aXRsZX0uY3N2YDtcclxuICAgIH1cclxuICAgIG91dHB1dE5hbWUgPSBvdXRwdXROYW1lLnJlcGxhY2UoJyAnLCAnXycpO1xyXG4gICAgb3V0cHV0TmFtZSA9IG91dHB1dE5hbWUubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICBvdXRwdXROYW1lRmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG4gICAgb3V0cHV0TmFtZUZpZWxkLnNldEF0dHJpYnV0ZSgnbmFtZScsICdvdXRwdXROYW1lJyk7XHJcbiAgICBvdXRwdXROYW1lRmllbGQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG91dHB1dE5hbWUpO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChvdXRwdXROYW1lRmllbGQpO1xyXG5cclxuICAgIGxldCBvZ3JlRm9ybWF0ID0gRXhwb3J0U2VydmljZS5vZ3JlRm9ybWF0c1tmb3JtYXRdO1xyXG4gICAgaWYgKGZvcm1hdCA9PT0gJ0NTVmNvbW1hJyB8fCBmb3JtYXQgPT09ICdDU1ZzZW1pY29sb24nKSB7XHJcbiAgICAgIG9ncmVGb3JtYXQgPSAnQ1NWJztcclxuICAgIH1cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIG91dHB1dEZvcm1hdEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuICAgIG91dHB1dEZvcm1hdEZpZWxkLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmb3JtYXQnKTtcclxuICAgIG91dHB1dEZvcm1hdEZpZWxkLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBvZ3JlRm9ybWF0KTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQob3V0cHV0Rm9ybWF0RmllbGQpO1xyXG5cclxuICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGZvcm0pO1xyXG5cclxuICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5vdGhpbmdUb0V4cG9ydChvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSwgZm9ybWF0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChvbEZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChmb3JtYXQgPT09ICdHUFgnKSB7XHJcbiAgICAgIGNvbnN0IHBvaW50T3JMaW5lID0gb2xGZWF0dXJlcy5maW5kKG9sRmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIFsnUG9pbnQnLCAnTGluZVN0cmluZycsICdNdWx0aUxpbmVTdHJpbmcnXS5pbmRleE9mKG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKSkgPj1cclxuICAgICAgICAgIDBcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHBvaW50T3JMaW5lID09PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==