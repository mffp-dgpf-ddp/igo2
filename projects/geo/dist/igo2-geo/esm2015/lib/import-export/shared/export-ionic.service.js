/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '@igo2/core';
import * as olformat from 'ol/format';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ExportService } from './export.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "@ionic/angular";
import * as i3 from "@ionic-native/file-opener/ngx/index";
import * as i4 from "@ionic-native/file/ngx/index";
export class ExportIonicService extends ExportService {
    /**
     * @param {?} config
     * @param {?} platform
     * @param {?} fileOpener
     * @param {?} file
     */
    constructor(config, platform, fileOpener, file) {
        super(config);
        this.platform = platform;
        this.fileOpener = fileOpener;
        this.file = file;
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
        if (this.platform.is('cordova')) {
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
            /** @type {?} */
            const directory = this.file.externalRootDirectory + 'Download';
            this.file.writeFile(directory, fileName, featuresText, { replace: true }).then((/**
             * @param {?} success
             * @return {?}
             */
            (success) => this.fileOpener.open(directory + '/' + fileName, 'text/plain')));
            observer.complete();
        }
        else {
            super.exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut);
        }
    }
}
ExportIonicService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ExportIonicService.ctorParameters = () => [
    { type: ConfigService },
    { type: Platform },
    { type: FileOpener },
    { type: File }
];
/** @nocollapse */ ExportIonicService.ngInjectableDef = i0.defineInjectable({ factory: function ExportIonicService_Factory() { return new ExportIonicService(i0.inject(i1.ConfigService), i0.inject(i2.Platform), i0.inject(i3.FileOpener), i0.inject(i4.File)); }, token: ExportIonicService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ExportIonicService.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    ExportIonicService.prototype.fileOpener;
    /**
     * @type {?}
     * @private
     */
    ExportIonicService.prototype.file;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWlvbmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LWlvbmljLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUkzQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUt0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQUtqRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsYUFBYTs7Ozs7OztJQUVuRCxZQUNJLE1BQXFCLEVBQ2IsUUFBa0IsRUFDbEIsVUFBc0IsRUFDdEIsSUFBVTtRQUVsQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFKTixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUdwQixDQUFDOzs7Ozs7Ozs7OztJQUVTLFlBQVksQ0FDcEIsVUFBdUIsRUFDdkIsUUFBd0IsRUFDeEIsTUFBb0IsRUFDcEIsS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLGFBQXFCO1FBRXJCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7O2tCQUN6QixRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7O2tCQUNqQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RELGNBQWMsRUFBRSxhQUFhO2dCQUM3QixpQkFBaUIsRUFBRSxZQUFZO2dCQUMvQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsU0FBUyxFQUFFLDRCQUE0QjthQUN4QyxDQUFDOztrQkFFSSxRQUFRLEdBQUcsR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFOztrQkFDN0MsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsVUFBVTtZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQzNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsUUFBUSxFQUFFLFlBQVksQ0FBQyxFQUFDLENBQUM7WUFDaEUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxLQUFLLENBQUMsWUFBWSxDQUNoQixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ0wsWUFBWSxFQUNaLGFBQWEsQ0FDZCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7WUE5Q0osVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBaEJRLGFBQWE7WUFTYixRQUFRO1lBRVIsVUFBVTtZQURWLElBQUk7Ozs7Ozs7O0lBV1Asc0NBQTBCOzs7OztJQUMxQix3Q0FBOEI7Ozs7O0lBQzlCLGtDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgRXhwb3J0Rm9ybWF0IH0gZnJvbSAnLi9leHBvcnQudHlwZSc7XHJcblxyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRmlsZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xyXG5pbXBvcnQgeyBGaWxlT3BlbmVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlLW9wZW5lci9uZ3gnO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9leHBvcnQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnRJb25pY1NlcnZpY2UgZXh0ZW5kcyBFeHBvcnRTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICAgIHByaXZhdGUgZmlsZU9wZW5lcjogRmlsZU9wZW5lcixcclxuICAgICAgcHJpdmF0ZSBmaWxlOiBGaWxlXHJcbiAgICApIHtcclxuICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhwb3J0VG9GaWxlKFxyXG4gICAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgICAgb2JzZXJ2ZXI6IE9ic2VydmVyPHZvaWQ+LFxyXG4gICAgICBmb3JtYXQ6IEV4cG9ydEZvcm1hdCxcclxuICAgICAgdGl0bGU6IHN0cmluZyxcclxuICAgICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzKCdjb3Jkb3ZhJykpIHtcclxuICAgICAgICBjb25zdCBvbEZvcm1hdCA9IG5ldyBvbGZvcm1hdFtmb3JtYXRdKCk7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZXNUZXh0ID0gb2xGb3JtYXQud3JpdGVGZWF0dXJlcyhvbEZlYXR1cmVzLCB7XHJcbiAgICAgICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW4sXHJcbiAgICAgICAgICBmZWF0dXJlVHlwZTogJ2ZlYXR1cmUnLFxyXG4gICAgICAgICAgZmVhdHVyZU5TOiAnaHR0cDovL2V4YW1wbGUuY29tL2ZlYXR1cmUnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gYCR7dGl0bGV9LiR7Zm9ybWF0LnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSB0aGlzLmZpbGUuZXh0ZXJuYWxSb290RGlyZWN0b3J5ICsgJ0Rvd25sb2FkJztcclxuICAgICAgICB0aGlzLmZpbGUud3JpdGVGaWxlKGRpcmVjdG9yeSwgZmlsZU5hbWUsIGZlYXR1cmVzVGV4dCwgeyByZXBsYWNlOiB0cnVlIH0pLnRoZW4oKHN1Y2Nlc3MpID0+XHJcbiAgICAgICAgdGhpcy5maWxlT3BlbmVyLm9wZW4oZGlyZWN0b3J5ICsgJy8nICsgZmlsZU5hbWUsICd0ZXh0L3BsYWluJykpO1xyXG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3VwZXIuZXhwb3J0VG9GaWxlKFxyXG4gICAgICAgICAgb2xGZWF0dXJlcyxcclxuICAgICAgICAgIG9ic2VydmVyLFxyXG4gICAgICAgICAgZm9ybWF0LFxyXG4gICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICBwcm9qZWN0aW9uSW4sXHJcbiAgICAgICAgICBwcm9qZWN0aW9uT3V0XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==