/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { PrintOutputFormat, PrintPaperFormat, PrintOrientation, PrintResolution, PrintSaveImageFormat } from '../shared/print.type';
import { PrintService } from '../shared/print.service';
export class PrintComponent {
    /**
     * @param {?} printService
     */
    constructor(printService) {
        this.printService = printService;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get outputFormat() {
        return this._outputFormat;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set outputFormat(value) {
        this._outputFormat = value;
    }
    /**
     * @return {?}
     */
    get paperFormat() {
        return this._paperFormat;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set paperFormat(value) {
        this._paperFormat = value;
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this._orientation = value;
    }
    /**
     * @return {?}
     */
    get imageFormat() {
        return this._imageFormat;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set imageFormat(value) {
        this._imageFormat = value;
    }
    /**
     * @return {?}
     */
    get resolution() {
        return this._resolution;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set resolution(value) {
        this._resolution = value;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    handleFormSubmit(data) {
        this.disabled = true;
        if (data.isPrintService === true) {
            this.printService
                .print(this.map, data)
                .subscribe();
        }
        else {
            /** @type {?} */
            let nbFileToProcess = 1;
            if (data.showLegend) {
                nbFileToProcess++;
            }
            if (data.imageFormat.toLowerCase() === 'tiff') {
                nbFileToProcess++;
            }
            this.printService.defineNbFileToProcess(nbFileToProcess);
            /** @type {?} */
            const resolution = +data.resolution;
            this.printService.downloadMapImage(this.map, resolution, data.imageFormat, data.showProjection, data.showScale, data.showLegend, data.title, data.comment, data.doZipFile);
            if (data.showLegend) {
                this.printService.getLayersLegendImage(this.map, data.imageFormat, data.doZipFile, +resolution);
            }
        }
        this.disabled = false;
    }
}
PrintComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-print',
                template: "<igo-print-form\r\n  [outputFormat]=\"outputFormat\"\r\n  [paperFormat]=\"paperFormat\"\r\n  [orientation]=\"orientation\"\r\n  [imageFormat]=\"imageFormat\"\r\n  [resolution]=\"resolution\"\r\n  [disabled]=\"disabled\"\r\n  (submit)=\"handleFormSubmit($event)\">\r\n</igo-print-form>\r\n"
            }] }
];
/** @nocollapse */
PrintComponent.ctorParameters = () => [
    { type: PrintService }
];
PrintComponent.propDecorators = {
    map: [{ type: Input }],
    outputFormat: [{ type: Input }],
    paperFormat: [{ type: Input }],
    orientation: [{ type: Input }],
    imageFormat: [{ type: Input }],
    resolution: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PrintComponent.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    PrintComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    PrintComponent.prototype._outputFormat;
    /**
     * @type {?}
     * @private
     */
    PrintComponent.prototype._paperFormat;
    /**
     * @type {?}
     * @private
     */
    PrintComponent.prototype._orientation;
    /**
     * @type {?}
     * @private
     */
    PrintComponent.prototype._imageFormat;
    /**
     * @type {?}
     * @private
     */
    PrintComponent.prototype._resolution;
    /**
     * @type {?}
     * @private
     */
    PrintComponent.prototype.printService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3ByaW50L3ByaW50L3ByaW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3JCLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTXZELE1BQU0sT0FBTyxjQUFjOzs7O0lBeUR6QixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXhEdkMsYUFBUSxHQUFHLEtBQUssQ0FBQztJQXdEeUIsQ0FBQzs7OztJQXREbEQsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBR0QsSUFDSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBQ0QsSUFBSSxZQUFZLENBQUMsS0FBd0I7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQzs7OztJQUdELElBQ0ksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELElBQUksV0FBVyxDQUFDLEtBQXVCO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFHRCxJQUNJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUF1QjtRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7O0lBR0QsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBMkI7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7OztJQUdELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7OztJQUNELElBQUksVUFBVSxDQUFDLEtBQXNCO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBS0QsZ0JBQWdCLENBQUMsSUFBa0I7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWTtpQkFDZCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7aUJBQ3JCLFNBQVMsRUFBRSxDQUFDO1NBQ2hCO2FBQU07O2dCQUNELGVBQWUsR0FBRyxDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsZUFBZSxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO2dCQUM3QyxlQUFlLEVBQUUsQ0FBQzthQUNuQjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLENBQUM7O2tCQUVuRCxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUNoQyxJQUFJLENBQUMsR0FBRyxFQUNSLFVBQVUsRUFDVixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztZQUNGLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FDcEMsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsU0FBUyxFQUNkLENBQUMsVUFBVSxDQUNaLENBQUM7YUFDSDtTQUNGO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7O1lBeEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsNFNBQXFDO2FBQ3RDOzs7O1lBTFEsWUFBWTs7O2tCQVNsQixLQUFLOzJCQVNMLEtBQUs7MEJBU0wsS0FBSzswQkFTTCxLQUFLOzBCQVNMLEtBQUs7eUJBU0wsS0FBSzs7OztJQS9DTixrQ0FBd0I7Ozs7O0lBU3hCLDhCQUFxQjs7Ozs7SUFTckIsdUNBQXlDOzs7OztJQVN6QyxzQ0FBdUM7Ozs7O0lBU3ZDLHNDQUF1Qzs7Ozs7SUFTdkMsc0NBQTJDOzs7OztJQVMzQyxxQ0FBcUM7Ozs7O0lBRXpCLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgUHJpbnRPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3ByaW50LmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIFByaW50T3V0cHV0Rm9ybWF0LFxyXG4gIFByaW50UGFwZXJGb3JtYXQsXHJcbiAgUHJpbnRPcmllbnRhdGlvbixcclxuICBQcmludFJlc29sdXRpb24sXHJcbiAgUHJpbnRTYXZlSW1hZ2VGb3JtYXRcclxufSBmcm9tICcuLi9zaGFyZWQvcHJpbnQudHlwZSc7XHJcblxyXG5pbXBvcnQgeyBQcmludFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvcHJpbnQuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1wcmludCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ByaW50LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpbnRDb21wb25lbnQge1xyXG4gIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBvdXRwdXRGb3JtYXQoKTogUHJpbnRPdXRwdXRGb3JtYXQge1xyXG4gICAgcmV0dXJuIHRoaXMuX291dHB1dEZvcm1hdDtcclxuICB9XHJcbiAgc2V0IG91dHB1dEZvcm1hdCh2YWx1ZTogUHJpbnRPdXRwdXRGb3JtYXQpIHtcclxuICAgIHRoaXMuX291dHB1dEZvcm1hdCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9vdXRwdXRGb3JtYXQ6IFByaW50T3V0cHV0Rm9ybWF0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBwYXBlckZvcm1hdCgpOiBQcmludFBhcGVyRm9ybWF0IHtcclxuICAgIHJldHVybiB0aGlzLl9wYXBlckZvcm1hdDtcclxuICB9XHJcbiAgc2V0IHBhcGVyRm9ybWF0KHZhbHVlOiBQcmludFBhcGVyRm9ybWF0KSB7XHJcbiAgICB0aGlzLl9wYXBlckZvcm1hdCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9wYXBlckZvcm1hdDogUHJpbnRQYXBlckZvcm1hdDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgb3JpZW50YXRpb24oKTogUHJpbnRPcmllbnRhdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XHJcbiAgfVxyXG4gIHNldCBvcmllbnRhdGlvbih2YWx1ZTogUHJpbnRPcmllbnRhdGlvbikge1xyXG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IFByaW50T3JpZW50YXRpb247XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGltYWdlRm9ybWF0KCk6IFByaW50U2F2ZUltYWdlRm9ybWF0IHtcclxuICAgIHJldHVybiB0aGlzLl9pbWFnZUZvcm1hdDtcclxuICB9XHJcbiAgc2V0IGltYWdlRm9ybWF0KHZhbHVlOiBQcmludFNhdmVJbWFnZUZvcm1hdCkge1xyXG4gICAgdGhpcy5faW1hZ2VGb3JtYXQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaW1hZ2VGb3JtYXQ6IFByaW50U2F2ZUltYWdlRm9ybWF0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCByZXNvbHV0aW9uKCk6IFByaW50UmVzb2x1dGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x1dGlvbjtcclxuICB9XHJcbiAgc2V0IHJlc29sdXRpb24odmFsdWU6IFByaW50UmVzb2x1dGlvbikge1xyXG4gICAgdGhpcy5fcmVzb2x1dGlvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9yZXNvbHV0aW9uOiBQcmludFJlc29sdXRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJpbnRTZXJ2aWNlOiBQcmludFNlcnZpY2UpIHt9XHJcblxyXG4gIGhhbmRsZUZvcm1TdWJtaXQoZGF0YTogUHJpbnRPcHRpb25zKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoZGF0YS5pc1ByaW50U2VydmljZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnByaW50U2VydmljZVxyXG4gICAgICAgIC5wcmludCh0aGlzLm1hcCwgZGF0YSlcclxuICAgICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbmJGaWxlVG9Qcm9jZXNzID0gMTtcclxuXHJcbiAgICAgIGlmIChkYXRhLnNob3dMZWdlbmQpIHtcclxuICAgICAgICBuYkZpbGVUb1Byb2Nlc3MrKztcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5pbWFnZUZvcm1hdC50b0xvd2VyQ2FzZSgpID09PSAndGlmZicpIHtcclxuICAgICAgICBuYkZpbGVUb1Byb2Nlc3MrKztcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wcmludFNlcnZpY2UuZGVmaW5lTmJGaWxlVG9Qcm9jZXNzKG5iRmlsZVRvUHJvY2Vzcyk7XHJcblxyXG4gICAgICBjb25zdCByZXNvbHV0aW9uID0gK2RhdGEucmVzb2x1dGlvbjtcclxuICAgICAgdGhpcy5wcmludFNlcnZpY2UuZG93bmxvYWRNYXBJbWFnZShcclxuICAgICAgICB0aGlzLm1hcCxcclxuICAgICAgICByZXNvbHV0aW9uLFxyXG4gICAgICAgIGRhdGEuaW1hZ2VGb3JtYXQsXHJcbiAgICAgICAgZGF0YS5zaG93UHJvamVjdGlvbixcclxuICAgICAgICBkYXRhLnNob3dTY2FsZSxcclxuICAgICAgICBkYXRhLnNob3dMZWdlbmQsXHJcbiAgICAgICAgZGF0YS50aXRsZSxcclxuICAgICAgICBkYXRhLmNvbW1lbnQsXHJcbiAgICAgICAgZGF0YS5kb1ppcEZpbGVcclxuICAgICAgKTtcclxuICAgICAgaWYgKGRhdGEuc2hvd0xlZ2VuZCkge1xyXG4gICAgICAgIHRoaXMucHJpbnRTZXJ2aWNlLmdldExheWVyc0xlZ2VuZEltYWdlKFxyXG4gICAgICAgICAgdGhpcy5tYXAsXHJcbiAgICAgICAgICBkYXRhLmltYWdlRm9ybWF0LFxyXG4gICAgICAgICAgZGF0YS5kb1ppcEZpbGUsXHJcbiAgICAgICAgICArcmVzb2x1dGlvblxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19