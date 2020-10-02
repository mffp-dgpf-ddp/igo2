/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ExportIonicService = /** @class */ (function (_super) {
    tslib_1.__extends(ExportIonicService, _super);
    function ExportIonicService(config, platform, fileOpener, file) {
        var _this = _super.call(this, config) || this;
        _this.platform = platform;
        _this.fileOpener = fileOpener;
        _this.file = file;
        return _this;
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
    ExportIonicService.prototype.exportToFile = /**
     * @protected
     * @param {?} olFeatures
     * @param {?} observer
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    function (olFeatures, observer, format, title, projectionIn, projectionOut) {
        var _this = this;
        if (this.platform.is('cordova')) {
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
            var fileName_1 = title + "." + format.toLowerCase();
            /** @type {?} */
            var directory_1 = this.file.externalRootDirectory + 'Download';
            console.log(directory_1);
            this.file.writeFile(directory_1, fileName_1, featuresText, { replace: true }).then((/**
             * @param {?} success
             * @return {?}
             */
            function (success) {
                return _this.fileOpener.open(directory_1 + '/' + fileName_1, 'text/plain');
            }));
            observer.complete();
        }
        else {
            _super.prototype.exportToFile.call(this, olFeatures, observer, format, title, projectionIn, projectionOut);
        }
    };
    ExportIonicService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ExportIonicService.ctorParameters = function () { return [
        { type: ConfigService },
        { type: Platform },
        { type: FileOpener },
        { type: File }
    ]; };
    /** @nocollapse */ ExportIonicService.ngInjectableDef = i0.defineInjectable({ factory: function ExportIonicService_Factory() { return new ExportIonicService(i0.inject(i1.ConfigService), i0.inject(i2.Platform), i0.inject(i3.FileOpener), i0.inject(i4.File)); }, token: ExportIonicService, providedIn: "root" });
    return ExportIonicService;
}(ExportService));
export { ExportIonicService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWlvbmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LWlvbmljLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFJM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFLdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFFakQ7SUFHd0MsOENBQWE7SUFFbkQsNEJBQ0ksTUFBcUIsRUFDYixRQUFrQixFQUNsQixVQUFzQixFQUN0QixJQUFVO1FBSnRCLFlBTUksa0JBQU0sTUFBTSxDQUFDLFNBQ2Q7UUFMUyxjQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFVBQUksR0FBSixJQUFJLENBQU07O0lBR3BCLENBQUM7Ozs7Ozs7Ozs7O0lBRVMseUNBQVk7Ozs7Ozs7Ozs7SUFBdEIsVUFDRSxVQUF1QixFQUN2QixRQUF3QixFQUN4QixNQUFvQixFQUNwQixLQUFhLEVBQ2IsWUFBb0IsRUFDcEIsYUFBcUI7UUFOdkIsaUJBaUNDO1FBekJDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7O2dCQUN6QixRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNqQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RELGNBQWMsRUFBRSxhQUFhO2dCQUM3QixpQkFBaUIsRUFBRSxZQUFZO2dCQUMvQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsU0FBUyxFQUFFLDRCQUE0QjthQUN4QyxDQUFDOztnQkFFSSxVQUFRLEdBQU0sS0FBSyxTQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUk7O2dCQUM3QyxXQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxVQUFVO1lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBUyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBUyxFQUFFLFVBQVEsRUFBRSxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQyxPQUFPO2dCQUN2RixPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVMsR0FBRyxHQUFHLEdBQUcsVUFBUSxFQUFFLFlBQVksQ0FBQztZQUE5RCxDQUE4RCxFQUFDLENBQUM7WUFDaEUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxpQkFBTSxZQUFZLFlBQ2hCLFVBQVUsRUFDVixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBQ1osYUFBYSxDQUNkLENBQUM7U0FDSDtJQUNILENBQUM7O2dCQS9DSixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWhCUSxhQUFhO2dCQVNiLFFBQVE7Z0JBRVIsVUFBVTtnQkFEVixJQUFJOzs7NkJBWmI7Q0FnRUMsQUFoREQsQ0FHd0MsYUFBYSxHQTZDcEQ7U0E3Q1ksa0JBQWtCOzs7Ozs7SUFJekIsc0NBQTBCOzs7OztJQUMxQix3Q0FBOEI7Ozs7O0lBQzlCLGtDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgRXhwb3J0Rm9ybWF0IH0gZnJvbSAnLi9leHBvcnQudHlwZSc7XHJcblxyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRmlsZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xyXG5pbXBvcnQgeyBGaWxlT3BlbmVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlLW9wZW5lci9uZ3gnO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9leHBvcnQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnRJb25pY1NlcnZpY2UgZXh0ZW5kcyBFeHBvcnRTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICAgIHByaXZhdGUgZmlsZU9wZW5lcjogRmlsZU9wZW5lcixcclxuICAgICAgcHJpdmF0ZSBmaWxlOiBGaWxlXHJcbiAgICApIHtcclxuICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhwb3J0VG9GaWxlKFxyXG4gICAgICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICAgICAgb2JzZXJ2ZXI6IE9ic2VydmVyPHZvaWQ+LFxyXG4gICAgICBmb3JtYXQ6IEV4cG9ydEZvcm1hdCxcclxuICAgICAgdGl0bGU6IHN0cmluZyxcclxuICAgICAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgICAgIHByb2plY3Rpb25PdXQ6IHN0cmluZ1xyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzKCdjb3Jkb3ZhJykpIHtcclxuICAgICAgICBjb25zdCBvbEZvcm1hdCA9IG5ldyBvbGZvcm1hdFtmb3JtYXRdKCk7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZXNUZXh0ID0gb2xGb3JtYXQud3JpdGVGZWF0dXJlcyhvbEZlYXR1cmVzLCB7XHJcbiAgICAgICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW4sXHJcbiAgICAgICAgICBmZWF0dXJlVHlwZTogJ2ZlYXR1cmUnLFxyXG4gICAgICAgICAgZmVhdHVyZU5TOiAnaHR0cDovL2V4YW1wbGUuY29tL2ZlYXR1cmUnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gYCR7dGl0bGV9LiR7Zm9ybWF0LnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSB0aGlzLmZpbGUuZXh0ZXJuYWxSb290RGlyZWN0b3J5ICsgJ0Rvd25sb2FkJztcclxuICAgICAgICBjb25zb2xlLmxvZyhkaXJlY3RvcnkpO1xyXG4gICAgICAgIHRoaXMuZmlsZS53cml0ZUZpbGUoZGlyZWN0b3J5LCBmaWxlTmFtZSwgZmVhdHVyZXNUZXh0LCB7IHJlcGxhY2U6IHRydWUgfSkudGhlbigoc3VjY2VzcykgPT5cclxuICAgICAgICB0aGlzLmZpbGVPcGVuZXIub3BlbihkaXJlY3RvcnkgKyAnLycgKyBmaWxlTmFtZSwgJ3RleHQvcGxhaW4nKSk7XHJcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdXBlci5leHBvcnRUb0ZpbGUoXHJcbiAgICAgICAgICBvbEZlYXR1cmVzLFxyXG4gICAgICAgICAgb2JzZXJ2ZXIsXHJcbiAgICAgICAgICBmb3JtYXQsXHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIHByb2plY3Rpb25JbixcclxuICAgICAgICAgIHByb2plY3Rpb25PdXRcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19