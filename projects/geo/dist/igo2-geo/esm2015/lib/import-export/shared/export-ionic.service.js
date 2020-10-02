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
            console.log(directory);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWlvbmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LWlvbmljLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUkzQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUt0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQUtqRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsYUFBYTs7Ozs7OztJQUVuRCxZQUNJLE1BQXFCLEVBQ2IsUUFBa0IsRUFDbEIsVUFBc0IsRUFDdEIsSUFBVTtRQUVsQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFKTixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUdwQixDQUFDOzs7Ozs7Ozs7OztJQUVTLFlBQVksQ0FDcEIsVUFBdUIsRUFDdkIsUUFBd0IsRUFDeEIsTUFBb0IsRUFDcEIsS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLGFBQXFCO1FBRXJCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7O2tCQUN6QixRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7O2tCQUNqQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RELGNBQWMsRUFBRSxhQUFhO2dCQUM3QixpQkFBaUIsRUFBRSxZQUFZO2dCQUMvQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsU0FBUyxFQUFFLDRCQUE0QjthQUN4QyxDQUFDOztrQkFFSSxRQUFRLEdBQUcsR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFOztrQkFDN0MsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsVUFBVTtZQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDM0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxRQUFRLEVBQUUsWUFBWSxDQUFDLEVBQUMsQ0FBQztZQUNoRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNMLEtBQUssQ0FBQyxZQUFZLENBQ2hCLFVBQVUsRUFDVixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBQ1osYUFBYSxDQUNkLENBQUM7U0FDSDtJQUNILENBQUM7OztZQS9DSixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFoQlEsYUFBYTtZQVNiLFFBQVE7WUFFUixVQUFVO1lBRFYsSUFBSTs7Ozs7Ozs7SUFXUCxzQ0FBMEI7Ozs7O0lBQzFCLHdDQUE4Qjs7Ozs7SUFDOUIsa0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZm9ybWF0IGZyb20gJ29sL2Zvcm1hdCc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcblxyXG5pbXBvcnQgeyBFeHBvcnRGb3JtYXQgfSBmcm9tICcuL2V4cG9ydC50eXBlJztcclxuXHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGaWxlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlL25neCc7XHJcbmltcG9ydCB7IEZpbGVPcGVuZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpbGUtb3BlbmVyL25neCc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuL2V4cG9ydC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cG9ydElvbmljU2VydmljZSBleHRlbmRzIEV4cG9ydFNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgICAgcHJpdmF0ZSBmaWxlT3BlbmVyOiBGaWxlT3BlbmVyLFxyXG4gICAgICBwcml2YXRlIGZpbGU6IEZpbGVcclxuICAgICkge1xyXG4gICAgICBzdXBlcihjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleHBvcnRUb0ZpbGUoXHJcbiAgICAgIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gICAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4sXHJcbiAgICAgIGZvcm1hdDogRXhwb3J0Rm9ybWF0LFxyXG4gICAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICAgICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgaWYgKHRoaXMucGxhdGZvcm0uaXMoJ2NvcmRvdmEnKSkge1xyXG4gICAgICAgIGNvbnN0IG9sRm9ybWF0ID0gbmV3IG9sZm9ybWF0W2Zvcm1hdF0oKTtcclxuICAgICAgICBjb25zdCBmZWF0dXJlc1RleHQgPSBvbEZvcm1hdC53cml0ZUZlYXR1cmVzKG9sRmVhdHVyZXMsIHtcclxuICAgICAgICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JbixcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOiAnZmVhdHVyZScsXHJcbiAgICAgICAgICBmZWF0dXJlTlM6ICdodHRwOi8vZXhhbXBsZS5jb20vZmVhdHVyZSdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBgJHt0aXRsZX0uJHtmb3JtYXQudG9Mb3dlckNhc2UoKX1gO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMuZmlsZS5leHRlcm5hbFJvb3REaXJlY3RvcnkgKyAnRG93bmxvYWQnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRpcmVjdG9yeSk7XHJcbiAgICAgICAgdGhpcy5maWxlLndyaXRlRmlsZShkaXJlY3RvcnksIGZpbGVOYW1lLCBmZWF0dXJlc1RleHQsIHsgcmVwbGFjZTogdHJ1ZSB9KS50aGVuKChzdWNjZXNzKSA9PlxyXG4gICAgICAgIHRoaXMuZmlsZU9wZW5lci5vcGVuKGRpcmVjdG9yeSArICcvJyArIGZpbGVOYW1lLCAndGV4dC9wbGFpbicpKTtcclxuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1cGVyLmV4cG9ydFRvRmlsZShcclxuICAgICAgICAgIG9sRmVhdHVyZXMsXHJcbiAgICAgICAgICBvYnNlcnZlcixcclxuICAgICAgICAgIGZvcm1hdCxcclxuICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgcHJvamVjdGlvbkluLFxyXG4gICAgICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=