/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ContextExportIonicService extends ContextExportService {
    /**
     * @param {?} config
     * @param {?} platform
     * @param {?} fileOpener
     * @param {?} file
     */
    constructor(config, platform, fileOpener, file) {
        super();
        this.config = config;
        this.platform = platform;
        this.fileOpener = fileOpener;
        this.file = file;
    }
    /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    exportAsync(res) {
        /** @type {?} */
        const doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const nothingToExport = super.nothingToExport(res);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            const contextJSON = JSON.stringify(res);
            if (this.platform.is('cordova')) {
                /** @type {?} */
                const directory = this.config.getConfig('ExportDirectory');
                this.file.writeFile(directory, `${res.uri}.json`, contextJSON, { replace: true }).then((/**
                 * @param {?} success
                 * @return {?}
                 */
                (success) => this.fileOpener.open(directory + '/' + `${res.uri}.json`, 'text/plain')));
                observer.complete();
            }
            else {
                downloadContent(contextJSON, 'text/json;charset=utf-8', `${res.uri}.json`);
                observer.complete();
            }
        });
        return new Observable(doExport);
    }
}
ContextExportIonicService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextExportIonicService.ctorParameters = () => [
    { type: ConfigService },
    { type: Platform },
    { type: FileOpener },
    { type: File }
];
/** @nocollapse */ ContextExportIonicService.ngInjectableDef = i0.defineInjectable({ factory: function ContextExportIonicService_Factory() { return new ContextExportIonicService(i0.inject(i1.ConfigService), i0.inject(i2.Platform), i0.inject(i3.FileOpener), i0.inject(i4.File)); }, token: ContextExportIonicService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1leHBvcnQtaW9uaWMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1pbXBvcnQtZXhwb3J0L3NoYXJlZC9jb250ZXh0LWV4cG9ydC1pb25pYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUc5QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRSxPQUFPLEVBQVksVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFLaEUsTUFBTSxPQUFPLHlCQUEwQixTQUFRLG9CQUFvQjs7Ozs7OztJQUVqRSxZQUNVLE1BQXFCLEVBQ3JCLFFBQWtCLEVBQ2xCLFVBQXNCLEVBQ3RCLElBQVU7UUFFaEIsS0FBSyxFQUFFLENBQUM7UUFMRixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFNO0lBR3BCLENBQUM7Ozs7OztJQUVTLFdBQVcsQ0FBQyxHQUFvQjs7Y0FDbEMsUUFBUTs7OztRQUFHLENBQUMsUUFBd0IsRUFBRSxFQUFFOztrQkFDcEMsZUFBZSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDO1lBQ2xELElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtnQkFDMUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLDBCQUEwQixFQUFFLENBQUMsQ0FBQztnQkFDakQsT0FBTzthQUNWOztrQkFFSyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFFdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTs7c0JBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Ozs7Z0JBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNuRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxFQUFFLFlBQVksQ0FBQyxFQUFDLENBQUM7Z0JBQ3pFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxlQUFlLENBQUMsV0FBVyxFQUFFLHlCQUF5QixFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7Z0JBQzNFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQTtRQUNELE9BQU8sSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7O1lBbkNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWRRLGFBQWE7WUFPYixRQUFRO1lBRVIsVUFBVTtZQURWLElBQUk7Ozs7Ozs7O0lBVVQsMkNBQTZCOzs7OztJQUM3Qiw2Q0FBMEI7Ozs7O0lBQzFCLCtDQUE4Qjs7Ozs7SUFDOUIseUNBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBkb3dubG9hZENvbnRlbnQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRXhwb3J0Tm90aGluZ1RvRXhwb3J0RXJyb3IgfSBmcm9tICcuL2NvbnRleHQtZXhwb3J0LmVycm9ycyc7XHJcbmltcG9ydCB7IE9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRmlsZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xyXG5pbXBvcnQgeyBGaWxlT3BlbmVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlLW9wZW5lci9uZ3gnO1xyXG5pbXBvcnQgeyBDb250ZXh0RXhwb3J0U2VydmljZSB9IGZyb20gJy4vY29udGV4dC1leHBvcnQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0RXhwb3J0SW9uaWNTZXJ2aWNlIGV4dGVuZHMgQ29udGV4dEV4cG9ydFNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICBwcml2YXRlIGZpbGVPcGVuZXI6IEZpbGVPcGVuZXIsXHJcbiAgICBwcml2YXRlIGZpbGU6IEZpbGVcclxuICAgICkge1xyXG4gICAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGV4cG9ydEFzeW5jKHJlczogRGV0YWlsZWRDb250ZXh0KTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkb0V4cG9ydCA9IChvYnNlcnZlcjogT2JzZXJ2ZXI8dm9pZD4pID0+IHtcclxuICAgICAgICBjb25zdCBub3RoaW5nVG9FeHBvcnQgPSBzdXBlci5ub3RoaW5nVG9FeHBvcnQocmVzKTtcclxuICAgICAgICBpZiAobm90aGluZ1RvRXhwb3J0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBFeHBvcnROb3RoaW5nVG9FeHBvcnRFcnJvcigpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29udGV4dEpTT04gPSBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pcygnY29yZG92YScpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnRXhwb3J0RGlyZWN0b3J5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZS53cml0ZUZpbGUoZGlyZWN0b3J5LCBgJHtyZXMudXJpfS5qc29uYCwgY29udGV4dEpTT04sIHsgcmVwbGFjZTogdHJ1ZSB9KS50aGVuKChzdWNjZXNzKSA9PlxyXG4gICAgICAgICAgICB0aGlzLmZpbGVPcGVuZXIub3BlbihkaXJlY3RvcnkgKyAnLycgKyBgJHtyZXMudXJpfS5qc29uYCwgJ3RleHQvcGxhaW4nKSk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG93bmxvYWRDb250ZW50KGNvbnRleHRKU09OLCAndGV4dC9qc29uO2NoYXJzZXQ9dXRmLTgnLCBgJHtyZXMudXJpfS5qc29uYCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkb0V4cG9ydCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==