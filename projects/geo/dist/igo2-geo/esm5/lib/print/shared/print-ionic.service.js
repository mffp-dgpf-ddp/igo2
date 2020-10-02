/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MessageService, ActivityService, LanguageService } from '@igo2/core';
import { PrintService } from './print.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "@ionic/angular";
import * as i3 from "@ionic-native/file-opener/ngx/index";
import * as i4 from "@ionic-native/file/ngx/index";
var PrintIonicService = /** @class */ (function (_super) {
    tslib_1.__extends(PrintIonicService, _super);
    function PrintIonicService(messageService, activityService, languageService, platform, fileOpener, file) {
        var _this = _super.call(this, messageService, activityService, languageService) || this;
        _this.platform = platform;
        _this.fileOpener = fileOpener;
        _this.file = file;
        return _this;
    }
    /**
     * @protected
     * @param {?} doc
     * @return {?}
     */
    PrintIonicService.prototype.saveDoc = /**
     * @protected
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        var _this = this;
        if (this.platform.is('cordova')) {
            /** @type {?} */
            var docOutput = doc.output();
            /** @type {?} */
            var buffer = new ArrayBuffer(docOutput.length);
            /** @type {?} */
            var array = new Uint8Array(buffer);
            this.setDate();
            for (var i = 0; i < docOutput.length; i++) {
                array[i] = docOutput.charCodeAt(i);
            }
            /** @type {?} */
            var fileName_1 = 'map' + this.year + '-' + this.month + '-' + this.day + '-' + this.hour + '-' + this.minute + '.pdf';
            /** @type {?} */
            var directory_1 = this.file.externalRootDirectory + 'Download';
            this.file.writeFile(directory_1, fileName_1, buffer, { replace: true }).then((/**
             * @param {?} success
             * @return {?}
             */
            function (success) {
                return _this.fileOpener.open(directory_1 + '/' + fileName_1, 'application/pdf');
            }));
        }
        else {
            _super.prototype.saveDoc.call(this, doc);
        }
    };
    /**
     * @private
     * @return {?}
     */
    PrintIonicService.prototype.setDate = /**
     * @private
     * @return {?}
     */
    function () {
        this.date = new Date();
        this.day = this.date.getDate().toString();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
            this.month = '0' + this.month.toString();
        }
        else {
            this.month = this.month.toString();
        }
        this.year = this.date.getFullYear().toString();
        this.hour = this.date.getHours().toString();
        this.minute = this.date.getMinutes().toString();
    };
    PrintIonicService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    PrintIonicService.ctorParameters = function () { return [
        { type: MessageService },
        { type: ActivityService },
        { type: LanguageService },
        { type: Platform },
        { type: FileOpener },
        { type: File }
    ]; };
    /** @nocollapse */ PrintIonicService.ngInjectableDef = i0.defineInjectable({ factory: function PrintIonicService_Factory() { return new PrintIonicService(i0.inject(i1.MessageService), i0.inject(i1.ActivityService), i0.inject(i1.LanguageService), i0.inject(i2.Platform), i0.inject(i3.FileOpener), i0.inject(i4.File)); }, token: PrintIonicService, providedIn: "root" });
    return PrintIonicService;
}(PrintService));
export { PrintIonicService };
if (false) {
    /** @type {?} */
    PrintIonicService.prototype.date;
    /** @type {?} */
    PrintIonicService.prototype.day;
    /** @type {?} */
    PrintIonicService.prototype.month;
    /** @type {?} */
    PrintIonicService.prototype.hour;
    /** @type {?} */
    PrintIonicService.prototype.minute;
    /** @type {?} */
    PrintIonicService.prototype.year;
    /**
     * @type {?}
     * @private
     */
    PrintIonicService.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    PrintIonicService.prototype.fileOpener;
    /**
     * @type {?}
     * @private
     */
    PrintIonicService.prototype.file;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtaW9uaWMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9zaGFyZWQvcHJpbnQtaW9uaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBRS9DO0lBR3VDLDZDQUFZO0lBUWpELDJCQUNFLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLGVBQWdDLEVBQ3hCLFFBQWtCLEVBQ2xCLFVBQXNCLEVBQ3RCLElBQVU7UUFOcEIsWUFRRSxrQkFBTSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQyxTQUN4RDtRQUxTLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsZ0JBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsVUFBSSxHQUFKLElBQUksQ0FBTTs7SUFHcEIsQ0FBQzs7Ozs7O0lBRVMsbUNBQU87Ozs7O0lBQWpCLFVBQWtCLEdBQVU7UUFBNUIsaUJBZ0JDO1FBZkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTs7Z0JBQ3pCLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFOztnQkFDeEIsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O2dCQUMxQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0Qzs7Z0JBQ0ssVUFBUSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07O2dCQUMvRyxXQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxVQUFVO1lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVMsRUFBRSxVQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUMsT0FBTztnQkFDL0UsT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFTLEdBQUcsR0FBRyxHQUFHLFVBQVEsRUFBRSxpQkFBaUIsQ0FBQztZQUFuRSxDQUFtRSxFQUFDLENBQUM7U0FDeEU7YUFBTTtZQUNILGlCQUFNLE9BQU8sWUFBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUM7Ozs7O0lBQ08sbUNBQU87Ozs7SUFBZjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUM7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BELENBQUM7O2dCQW5ERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUxRLGNBQWM7Z0JBQUUsZUFBZTtnQkFBRSxlQUFlO2dCQUpoRCxRQUFRO2dCQUVSLFVBQVU7Z0JBRFYsSUFBSTs7OzRCQUhiO0NBNkRDLEFBcERELENBR3VDLFlBQVksR0FpRGxEO1NBakRZLGlCQUFpQjs7O0lBQzVCLGlDQUFXOztJQUNYLGdDQUFZOztJQUNaLGtDQUFXOztJQUNYLGlDQUFhOztJQUNiLG1DQUFlOztJQUNmLGlDQUFhOzs7OztJQU1YLHFDQUEwQjs7Ozs7SUFDMUIsdUNBQThCOzs7OztJQUM5QixpQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIGpzUERGIGZyb20gJ2pzcGRmJztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZpbGUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpbGUvbmd4JztcclxuaW1wb3J0IHsgRmlsZU9wZW5lciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS1vcGVuZXIvbmd4JztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBBY3Rpdml0eVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBQcmludFNlcnZpY2UgfSBmcm9tICcuL3ByaW50LnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpbnRJb25pY1NlcnZpY2UgZXh0ZW5kcyBQcmludFNlcnZpY2Uge1xyXG4gIGRhdGU6IERhdGU7XHJcbiAgZGF5OiBzdHJpbmc7XHJcbiAgbW9udGg6IGFueTtcclxuICBob3VyOiBzdHJpbmc7XHJcbiAgbWludXRlOiBzdHJpbmc7XHJcbiAgeWVhcjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlTZXJ2aWNlLFxyXG4gICAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgIHByaXZhdGUgZmlsZU9wZW5lcjogRmlsZU9wZW5lcixcclxuICAgIHByaXZhdGUgZmlsZTogRmlsZVxyXG4gICkge1xyXG4gICAgc3VwZXIobWVzc2FnZVNlcnZpY2UsIGFjdGl2aXR5U2VydmljZSwgbGFuZ3VhZ2VTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzYXZlRG9jKGRvYzoganNQREYpIHtcclxuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzKCdjb3Jkb3ZhJykpIHtcclxuICAgICAgY29uc3QgZG9jT3V0cHV0ID0gZG9jLm91dHB1dCgpO1xyXG4gICAgICBjb25zdCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoZG9jT3V0cHV0Lmxlbmd0aCk7XHJcbiAgICAgIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcclxuICAgICAgdGhpcy5zZXREYXRlKCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jT3V0cHV0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBhcnJheVtpXSA9IGRvY091dHB1dC5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gJ21hcCcgKyB0aGlzLnllYXIgKyAnLScgKyB0aGlzLm1vbnRoICsgJy0nICsgdGhpcy5kYXkgKyAnLScgKyB0aGlzLmhvdXIgKyAnLScgKyB0aGlzLm1pbnV0ZSArICcucGRmJztcclxuICAgICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5maWxlLmV4dGVybmFsUm9vdERpcmVjdG9yeSArICdEb3dubG9hZCc7XHJcbiAgICAgIHRoaXMuZmlsZS53cml0ZUZpbGUoZGlyZWN0b3J5LCBmaWxlTmFtZSwgYnVmZmVyLCB7IHJlcGxhY2U6IHRydWUgfSkudGhlbigoc3VjY2VzcykgPT5cclxuICAgICAgICB0aGlzLmZpbGVPcGVuZXIub3BlbihkaXJlY3RvcnkgKyAnLycgKyBmaWxlTmFtZSwgJ2FwcGxpY2F0aW9uL3BkZicpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3VwZXIuc2F2ZURvYyhkb2MpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIHNldERhdGUoKSB7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMuZGF5ID0gdGhpcy5kYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICB0aGlzLm1vbnRoID0gdGhpcy5kYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICBpZiAodGhpcy5tb250aCA8IDEwKSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9ICcwJyArIHRoaXMubW9udGgudG9TdHJpbmcoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubW9udGggPSB0aGlzLm1vbnRoLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy55ZWFyID0gdGhpcy5kYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcclxuICAgICAgdGhpcy5ob3VyID0gdGhpcy5kYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKTtcclxuICAgICAgdGhpcy5taW51dGUgPSB0aGlzLmRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==