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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWlvbmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZXhwb3J0LWlvbmljLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFJM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFLdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFFakQ7SUFHd0MsOENBQWE7SUFFbkQsNEJBQ0ksTUFBcUIsRUFDYixRQUFrQixFQUNsQixVQUFzQixFQUN0QixJQUFVO1FBSnRCLFlBTUksa0JBQU0sTUFBTSxDQUFDLFNBQ2Q7UUFMUyxjQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFVBQUksR0FBSixJQUFJLENBQU07O0lBR3BCLENBQUM7Ozs7Ozs7Ozs7O0lBRVMseUNBQVk7Ozs7Ozs7Ozs7SUFBdEIsVUFDRSxVQUF1QixFQUN2QixRQUF3QixFQUN4QixNQUFvQixFQUNwQixLQUFhLEVBQ2IsWUFBb0IsRUFDcEIsYUFBcUI7UUFOdkIsaUJBZ0NDO1FBeEJDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7O2dCQUN6QixRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNqQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RELGNBQWMsRUFBRSxhQUFhO2dCQUM3QixpQkFBaUIsRUFBRSxZQUFZO2dCQUMvQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsU0FBUyxFQUFFLDRCQUE0QjthQUN4QyxDQUFDOztnQkFFSSxVQUFRLEdBQU0sS0FBSyxTQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUk7O2dCQUM3QyxXQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxVQUFVO1lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVMsRUFBRSxVQUFRLEVBQUUsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUMsT0FBTztnQkFDdkYsT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFTLEdBQUcsR0FBRyxHQUFHLFVBQVEsRUFBRSxZQUFZLENBQUM7WUFBOUQsQ0FBOEQsRUFBQyxDQUFDO1lBQ2hFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0wsaUJBQU0sWUFBWSxZQUNoQixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ0wsWUFBWSxFQUNaLGFBQWEsQ0FDZCxDQUFDO1NBQ0g7SUFDSCxDQUFDOztnQkE5Q0osVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFoQlEsYUFBYTtnQkFTYixRQUFRO2dCQUVSLFVBQVU7Z0JBRFYsSUFBSTs7OzZCQVpiO0NBK0RDLEFBL0NELENBR3dDLGFBQWEsR0E0Q3BEO1NBNUNZLGtCQUFrQjs7Ozs7O0lBSXpCLHNDQUEwQjs7Ozs7SUFDMUIsd0NBQThCOzs7OztJQUM5QixrQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IEV4cG9ydEZvcm1hdCB9IGZyb20gJy4vZXhwb3J0LnR5cGUnO1xyXG5cclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZpbGUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpbGUvbmd4JztcclxuaW1wb3J0IHsgRmlsZU9wZW5lciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS1vcGVuZXIvbmd4JztcclxuaW1wb3J0IHsgRXhwb3J0U2VydmljZSB9IGZyb20gJy4vZXhwb3J0LnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRXhwb3J0SW9uaWNTZXJ2aWNlIGV4dGVuZHMgRXhwb3J0U2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxyXG4gICAgICBwcml2YXRlIGZpbGVPcGVuZXI6IEZpbGVPcGVuZXIsXHJcbiAgICAgIHByaXZhdGUgZmlsZTogRmlsZVxyXG4gICAgKSB7XHJcbiAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4cG9ydFRvRmlsZShcclxuICAgICAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgICAgIG9ic2VydmVyOiBPYnNlcnZlcjx2b2lkPixcclxuICAgICAgZm9ybWF0OiBFeHBvcnRGb3JtYXQsXHJcbiAgICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgICBwcm9qZWN0aW9uT3V0OiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pcygnY29yZG92YScpKSB7XHJcbiAgICAgICAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgb2xmb3JtYXRbZm9ybWF0XSgpO1xyXG4gICAgICAgIGNvbnN0IGZlYXR1cmVzVGV4dCA9IG9sRm9ybWF0LndyaXRlRmVhdHVyZXMob2xGZWF0dXJlcywge1xyXG4gICAgICAgICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluLFxyXG4gICAgICAgICAgZmVhdHVyZVR5cGU6ICdmZWF0dXJlJyxcclxuICAgICAgICAgIGZlYXR1cmVOUzogJ2h0dHA6Ly9leGFtcGxlLmNvbS9mZWF0dXJlJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGAke3RpdGxlfS4ke2Zvcm1hdC50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5maWxlLmV4dGVybmFsUm9vdERpcmVjdG9yeSArICdEb3dubG9hZCc7XHJcbiAgICAgICAgdGhpcy5maWxlLndyaXRlRmlsZShkaXJlY3RvcnksIGZpbGVOYW1lLCBmZWF0dXJlc1RleHQsIHsgcmVwbGFjZTogdHJ1ZSB9KS50aGVuKChzdWNjZXNzKSA9PlxyXG4gICAgICAgIHRoaXMuZmlsZU9wZW5lci5vcGVuKGRpcmVjdG9yeSArICcvJyArIGZpbGVOYW1lLCAndGV4dC9wbGFpbicpKTtcclxuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1cGVyLmV4cG9ydFRvRmlsZShcclxuICAgICAgICAgIG9sRmVhdHVyZXMsXHJcbiAgICAgICAgICBvYnNlcnZlcixcclxuICAgICAgICAgIGZvcm1hdCxcclxuICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgcHJvamVjdGlvbkluLFxyXG4gICAgICAgICAgcHJvamVjdGlvbk91dFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=