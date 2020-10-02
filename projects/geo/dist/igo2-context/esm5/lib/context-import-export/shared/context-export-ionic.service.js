/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfigService } from '@igo2/core';
import { downloadContent } from '@igo2/utils';
import { ExportNothingToExportError } from './context-export.errors';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ContextExportService } from './context-export.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "@ionic/angular";
import * as i3 from "@ionic-native/file-opener/ngx/index";
import * as i4 from "@ionic-native/file/ngx/index";
var ContextExportIonicService = /** @class */ (function (_super) {
    tslib_1.__extends(ContextExportIonicService, _super);
    function ContextExportIonicService(config, platform, fileOpener, file) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.platform = platform;
        _this.fileOpener = fileOpener;
        _this.file = file;
        return _this;
    }
    /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    ContextExportIonicService.prototype.exportAsync = /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    function (res) {
        var _this = this;
        /** @type {?} */
        var doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            /** @type {?} */
            var nothingToExport = _super.prototype.nothingToExport.call(_this, res);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            var contextJSON = JSON.stringify(res);
            if (_this.platform.is('cordova')) {
                /** @type {?} */
                var directory_1 = _this.config.getConfig('ExportDirectory');
                _this.file.writeFile(directory_1, res.uri + ".json", contextJSON, { replace: true }).then((/**
                 * @param {?} success
                 * @return {?}
                 */
                function (success) {
                    return _this.fileOpener.open(directory_1 + '/' + (res.uri + ".json"), 'text/plain');
                }));
                observer.complete();
            }
            else {
                downloadContent(contextJSON, 'text/json;charset=utf-8', res.uri + ".json");
                observer.complete();
            }
        });
        return new Observable(doExport);
    };
    ContextExportIonicService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ContextExportIonicService.ctorParameters = function () { return [
        { type: ConfigService },
        { type: Platform },
        { type: FileOpener },
        { type: File }
    ]; };
    /** @nocollapse */ ContextExportIonicService.ngInjectableDef = i0.defineInjectable({ factory: function ContextExportIonicService_Factory() { return new ContextExportIonicService(i0.inject(i1.ConfigService), i0.inject(i2.Platform), i0.inject(i3.FileOpener), i0.inject(i4.File)); }, token: ContextExportIonicService, providedIn: "root" });
    return ContextExportIonicService;
}(ContextExportService));
export { ContextExportIonicService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextExportIonicService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ContextExportIonicService.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    ContextExportIonicService.prototype.fileOpener;
    /**
     * @type {?}
     * @private
     */
    ContextExportIonicService.prototype.file;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1leHBvcnQtaW9uaWMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1pbXBvcnQtZXhwb3J0L3NoYXJlZC9jb250ZXh0LWV4cG9ydC1pb25pYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHOUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckUsT0FBTyxFQUFZLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBRWhFO0lBRytDLHFEQUFvQjtJQUVqRSxtQ0FDVSxNQUFxQixFQUNyQixRQUFrQixFQUNsQixVQUFzQixFQUN0QixJQUFVO1FBSnBCLFlBTUksaUJBQU8sU0FDVjtRQU5TLFlBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsY0FBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixVQUFJLEdBQUosSUFBSSxDQUFNOztJQUdwQixDQUFDOzs7Ozs7SUFFUywrQ0FBVzs7Ozs7SUFBckIsVUFBc0IsR0FBb0I7UUFBMUMsaUJBcUJDOztZQXBCTyxRQUFROzs7O1FBQUcsVUFBQyxRQUF3Qjs7Z0JBQ2hDLGVBQWUsR0FBRyxpQkFBTSxlQUFlLGFBQUMsR0FBRyxDQUFDO1lBQ2xELElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtnQkFDMUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLDBCQUEwQixFQUFFLENBQUMsQ0FBQztnQkFDakQsT0FBTzthQUNWOztnQkFFSyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFFdkMsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTs7b0JBQ3ZCLFdBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDMUQsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBUyxFQUFLLEdBQUcsQ0FBQyxHQUFHLFVBQU8sRUFBRSxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJOzs7O2dCQUFDLFVBQUMsT0FBTztvQkFDL0YsT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFTLEdBQUcsR0FBRyxJQUFNLEdBQUcsQ0FBQyxHQUFHLFVBQU8sQ0FBQSxFQUFFLFlBQVksQ0FBQztnQkFBdkUsQ0FBdUUsRUFBQyxDQUFDO2dCQUN6RSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsZUFBZSxDQUFDLFdBQVcsRUFBRSx5QkFBeUIsRUFBSyxHQUFHLENBQUMsR0FBRyxVQUFPLENBQUMsQ0FBQztnQkFDM0UsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFBO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDOztnQkFuQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFkUSxhQUFhO2dCQU9iLFFBQVE7Z0JBRVIsVUFBVTtnQkFEVixJQUFJOzs7b0NBVmI7Q0FrREMsQUFwQ0QsQ0FHK0Msb0JBQW9CLEdBaUNsRTtTQWpDWSx5QkFBeUI7Ozs7OztJQUdsQywyQ0FBNkI7Ozs7O0lBQzdCLDZDQUEwQjs7Ozs7SUFDMUIsK0NBQThCOzs7OztJQUM5Qix5Q0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IGRvd25sb2FkQ29udGVudCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvciB9IGZyb20gJy4vY29udGV4dC1leHBvcnQuZXJyb3JzJztcclxuaW1wb3J0IHsgT2JzZXJ2ZXIsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGaWxlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlL25neCc7XHJcbmltcG9ydCB7IEZpbGVPcGVuZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpbGUtb3BlbmVyL25neCc7XHJcbmltcG9ydCB7IENvbnRleHRFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZXh0LWV4cG9ydC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRFeHBvcnRJb25pY1NlcnZpY2UgZXh0ZW5kcyBDb250ZXh0RXhwb3J0U2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgIHByaXZhdGUgZmlsZU9wZW5lcjogRmlsZU9wZW5lcixcclxuICAgIHByaXZhdGUgZmlsZTogRmlsZVxyXG4gICAgKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZXhwb3J0QXN5bmMocmVzOiBEZXRhaWxlZENvbnRleHQpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGRvRXhwb3J0ID0gKG9ic2VydmVyOiBPYnNlcnZlcjx2b2lkPikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5vdGhpbmdUb0V4cG9ydCA9IHN1cGVyLm5vdGhpbmdUb0V4cG9ydChyZXMpO1xyXG4gICAgICAgIGlmIChub3RoaW5nVG9FeHBvcnQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yKCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb250ZXh0SlNPTiA9IEpTT04uc3RyaW5naWZ5KHJlcyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzKCdjb3Jkb3ZhJykpIHtcclxuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdFeHBvcnREaXJlY3RvcnknKTtcclxuICAgICAgICAgICAgdGhpcy5maWxlLndyaXRlRmlsZShkaXJlY3RvcnksIGAke3Jlcy51cml9Lmpzb25gLCBjb250ZXh0SlNPTiwgeyByZXBsYWNlOiB0cnVlIH0pLnRoZW4oKHN1Y2Nlc3MpID0+XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZU9wZW5lci5vcGVuKGRpcmVjdG9yeSArICcvJyArIGAke3Jlcy51cml9Lmpzb25gLCAndGV4dC9wbGFpbicpKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb3dubG9hZENvbnRlbnQoY29udGV4dEpTT04sICd0ZXh0L2pzb247Y2hhcnNldD11dGYtOCcsIGAke3Jlcy51cml9Lmpzb25gKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGRvRXhwb3J0KTtcclxuICB9XHJcbn1cclxuIl19