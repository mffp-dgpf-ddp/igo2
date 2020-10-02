/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class PrintIonicService extends PrintService {
    /**
     * @param {?} messageService
     * @param {?} activityService
     * @param {?} languageService
     * @param {?} platform
     * @param {?} fileOpener
     * @param {?} file
     */
    constructor(messageService, activityService, languageService, platform, fileOpener, file) {
        super(messageService, activityService, languageService);
        this.platform = platform;
        this.fileOpener = fileOpener;
        this.file = file;
    }
    /**
     * @protected
     * @param {?} doc
     * @return {?}
     */
    saveDoc(doc) {
        if (this.platform.is('cordova')) {
            /** @type {?} */
            const docOutput = doc.output();
            /** @type {?} */
            const buffer = new ArrayBuffer(docOutput.length);
            /** @type {?} */
            const array = new Uint8Array(buffer);
            this.setDate();
            for (let i = 0; i < docOutput.length; i++) {
                array[i] = docOutput.charCodeAt(i);
            }
            /** @type {?} */
            const fileName = 'map' + this.year + '-' + this.month + '-' + this.day + '-' + this.hour + '-' + this.minute + '.pdf';
            /** @type {?} */
            const directory = this.file.externalRootDirectory + 'Download';
            this.file.writeFile(directory, fileName, buffer, { replace: true }).then((/**
             * @param {?} success
             * @return {?}
             */
            (success) => this.fileOpener.open(directory + '/' + fileName, 'application/pdf')));
        }
        else {
            super.saveDoc(doc);
        }
    }
    /**
     * @private
     * @return {?}
     */
    setDate() {
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
    }
}
PrintIonicService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
PrintIonicService.ctorParameters = () => [
    { type: MessageService },
    { type: ActivityService },
    { type: LanguageService },
    { type: Platform },
    { type: FileOpener },
    { type: File }
];
/** @nocollapse */ PrintIonicService.ngInjectableDef = i0.defineInjectable({ factory: function PrintIonicService_Factory() { return new PrintIonicService(i0.inject(i1.MessageService), i0.inject(i1.ActivityService), i0.inject(i1.LanguageService), i0.inject(i2.Platform), i0.inject(i3.FileOpener), i0.inject(i4.File)); }, token: PrintIonicService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtaW9uaWMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9zaGFyZWQvcHJpbnQtaW9uaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7QUFLL0MsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFlBQVk7Ozs7Ozs7OztJQVFqRCxZQUNFLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLGVBQWdDLEVBQ3hCLFFBQWtCLEVBQ2xCLFVBQXNCLEVBQ3RCLElBQVU7UUFFbEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKaEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQU07SUFHcEIsQ0FBQzs7Ozs7O0lBRVMsT0FBTyxDQUFDLEdBQVU7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTs7a0JBQ3pCLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFOztrQkFDeEIsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O2tCQUMxQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0Qzs7a0JBQ0ssUUFBUSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07O2tCQUMvRyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxVQUFVO1lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDbkYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsRUFBQyxDQUFDO1NBQ3hFO2FBQU07WUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7Ozs7SUFDTyxPQUFPO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMxQzthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEQsQ0FBQzs7O1lBbkRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUxRLGNBQWM7WUFBRSxlQUFlO1lBQUUsZUFBZTtZQUpoRCxRQUFRO1lBRVIsVUFBVTtZQURWLElBQUk7Ozs7O0lBVVgsaUNBQVc7O0lBQ1gsZ0NBQVk7O0lBQ1osa0NBQVc7O0lBQ1gsaUNBQWE7O0lBQ2IsbUNBQWU7O0lBQ2YsaUNBQWE7Ozs7O0lBTVgscUNBQTBCOzs7OztJQUMxQix1Q0FBOEI7Ozs7O0lBQzlCLGlDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMganNQREYgZnJvbSAnanNwZGYnO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRmlsZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xyXG5pbXBvcnQgeyBGaWxlT3BlbmVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlLW9wZW5lci9uZ3gnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIEFjdGl2aXR5U2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFByaW50U2VydmljZSB9IGZyb20gJy4vcHJpbnQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcmludElvbmljU2VydmljZSBleHRlbmRzIFByaW50U2VydmljZSB7XHJcbiAgZGF0ZTogRGF0ZTtcclxuICBkYXk6IHN0cmluZztcclxuICBtb250aDogYW55O1xyXG4gIGhvdXI6IHN0cmluZztcclxuICBtaW51dGU6IHN0cmluZztcclxuICB5ZWFyOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZpdHlTZXJ2aWNlOiBBY3Rpdml0eVNlcnZpY2UsXHJcbiAgICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxyXG4gICAgcHJpdmF0ZSBmaWxlT3BlbmVyOiBGaWxlT3BlbmVyLFxyXG4gICAgcHJpdmF0ZSBmaWxlOiBGaWxlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihtZXNzYWdlU2VydmljZSwgYWN0aXZpdHlTZXJ2aWNlLCBsYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNhdmVEb2MoZG9jOiBqc1BERikge1xyXG4gICAgaWYgKHRoaXMucGxhdGZvcm0uaXMoJ2NvcmRvdmEnKSkge1xyXG4gICAgICBjb25zdCBkb2NPdXRwdXQgPSBkb2Mub3V0cHV0KCk7XHJcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihkb2NPdXRwdXQubGVuZ3RoKTtcclxuICAgICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG4gICAgICB0aGlzLnNldERhdGUoKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2NPdXRwdXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGFycmF5W2ldID0gZG9jT3V0cHV0LmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZmlsZU5hbWUgPSAnbWFwJyArIHRoaXMueWVhciArICctJyArIHRoaXMubW9udGggKyAnLScgKyB0aGlzLmRheSArICctJyArIHRoaXMuaG91ciArICctJyArIHRoaXMubWludXRlICsgJy5wZGYnO1xyXG4gICAgICBjb25zdCBkaXJlY3RvcnkgPSB0aGlzLmZpbGUuZXh0ZXJuYWxSb290RGlyZWN0b3J5ICsgJ0Rvd25sb2FkJztcclxuICAgICAgdGhpcy5maWxlLndyaXRlRmlsZShkaXJlY3RvcnksIGZpbGVOYW1lLCBidWZmZXIsIHsgcmVwbGFjZTogdHJ1ZSB9KS50aGVuKChzdWNjZXNzKSA9PlxyXG4gICAgICAgIHRoaXMuZmlsZU9wZW5lci5vcGVuKGRpcmVjdG9yeSArICcvJyArIGZpbGVOYW1lLCAnYXBwbGljYXRpb24vcGRmJykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzdXBlci5zYXZlRG9jKGRvYyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgc2V0RGF0ZSgpIHtcclxuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgdGhpcy5kYXkgPSB0aGlzLmRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgIHRoaXMubW9udGggPSB0aGlzLmRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgIGlmICh0aGlzLm1vbnRoIDwgMTApIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gJzAnICsgdGhpcy5tb250aC50b1N0cmluZygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5tb250aCA9IHRoaXMubW9udGgudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnllYXIgPSB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpO1xyXG4gICAgICB0aGlzLmhvdXIgPSB0aGlzLmRhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpO1xyXG4gICAgICB0aGlzLm1pbnV0ZSA9IHRoaXMuZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuIl19