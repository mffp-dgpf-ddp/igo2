/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { PrintOutputFormat, PrintPaperFormat, PrintOrientation, PrintResolution, PrintSaveImageFormat } from '../shared/print.type';
import { PrintService } from '../shared/print.service';
var PrintComponent = /** @class */ (function () {
    function PrintComponent(printService) {
        this.printService = printService;
        this.disabled = false;
    }
    Object.defineProperty(PrintComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintComponent.prototype, "outputFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this._outputFormat;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._outputFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintComponent.prototype, "paperFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this._paperFormat;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._paperFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintComponent.prototype, "orientation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._orientation;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._orientation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintComponent.prototype, "imageFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this._imageFormat;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._imageFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintComponent.prototype, "resolution", {
        get: /**
         * @return {?}
         */
        function () {
            return this._resolution;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._resolution = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} data
     * @return {?}
     */
    PrintComponent.prototype.handleFormSubmit = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.disabled = true;
        if (data.isPrintService === true) {
            this.printService
                .print(this.map, data)
                .subscribe();
        }
        else {
            /** @type {?} */
            var nbFileToProcess = 1;
            if (data.showLegend) {
                nbFileToProcess++;
            }
            if (data.imageFormat.toLowerCase() === 'tiff') {
                nbFileToProcess++;
            }
            this.printService.defineNbFileToProcess(nbFileToProcess);
            /** @type {?} */
            var resolution = +data.resolution;
            this.printService.downloadMapImage(this.map, resolution, data.imageFormat, data.showProjection, data.showScale, data.showLegend, data.title, data.comment, data.doZipFile);
            if (data.showLegend) {
                this.printService.getLayersLegendImage(this.map, data.imageFormat, data.doZipFile, +resolution);
            }
        }
        this.disabled = false;
    };
    PrintComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-print',
                    template: "<igo-print-form\r\n  [outputFormat]=\"outputFormat\"\r\n  [paperFormat]=\"paperFormat\"\r\n  [orientation]=\"orientation\"\r\n  [imageFormat]=\"imageFormat\"\r\n  [resolution]=\"resolution\"\r\n  [disabled]=\"disabled\"\r\n  (submit)=\"handleFormSubmit($event)\">\r\n</igo-print-form>\r\n"
                }] }
    ];
    /** @nocollapse */
    PrintComponent.ctorParameters = function () { return [
        { type: PrintService }
    ]; };
    PrintComponent.propDecorators = {
        map: [{ type: Input }],
        outputFormat: [{ type: Input }],
        paperFormat: [{ type: Input }],
        orientation: [{ type: Input }],
        imageFormat: [{ type: Input }],
        resolution: [{ type: Input }]
    };
    return PrintComponent;
}());
export { PrintComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3ByaW50L3ByaW50L3ByaW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3JCLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZEO0lBNkRFLHdCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXhEdkMsYUFBUSxHQUFHLEtBQUssQ0FBQztJQXdEeUIsQ0FBQztJQXREbEQsc0JBQ0ksK0JBQUc7Ozs7UUFEUDtZQUVFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7OztRQUNELFVBQVEsS0FBYTtZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHdDQUFZOzs7O1FBRGhCO1lBRUUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7Ozs7O1FBQ0QsVUFBaUIsS0FBd0I7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx1Q0FBVzs7OztRQURmO1lBRUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBQ0QsVUFBZ0IsS0FBdUI7WUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx1Q0FBVzs7OztRQURmO1lBRUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBQ0QsVUFBZ0IsS0FBdUI7WUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx1Q0FBVzs7OztRQURmO1lBRUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBQ0QsVUFBZ0IsS0FBMkI7WUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSxzQ0FBVTs7OztRQURkO1lBRUUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7Ozs7O1FBQ0QsVUFBZSxLQUFzQjtZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7T0FIQTs7Ozs7SUFRRCx5Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsSUFBa0I7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWTtpQkFDZCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7aUJBQ3JCLFNBQVMsRUFBRSxDQUFDO1NBQ2hCO2FBQU07O2dCQUNELGVBQWUsR0FBRyxDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsZUFBZSxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO2dCQUM3QyxlQUFlLEVBQUUsQ0FBQzthQUNuQjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLENBQUM7O2dCQUVuRCxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUNoQyxJQUFJLENBQUMsR0FBRyxFQUNSLFVBQVUsRUFDVixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztZQUNGLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FDcEMsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsU0FBUyxFQUNkLENBQUMsVUFBVSxDQUNaLENBQUM7YUFDSDtTQUNGO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Z0JBeEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsNFNBQXFDO2lCQUN0Qzs7OztnQkFMUSxZQUFZOzs7c0JBU2xCLEtBQUs7K0JBU0wsS0FBSzs4QkFTTCxLQUFLOzhCQVNMLEtBQUs7OEJBU0wsS0FBSzs2QkFTTCxLQUFLOztJQXFEUixxQkFBQztDQUFBLEFBekdELElBeUdDO1NBckdZLGNBQWM7OztJQUN6QixrQ0FBd0I7Ozs7O0lBU3hCLDhCQUFxQjs7Ozs7SUFTckIsdUNBQXlDOzs7OztJQVN6QyxzQ0FBdUM7Ozs7O0lBU3ZDLHNDQUF1Qzs7Ozs7SUFTdkMsc0NBQTJDOzs7OztJQVMzQyxxQ0FBcUM7Ozs7O0lBRXpCLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgUHJpbnRPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3ByaW50LmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIFByaW50T3V0cHV0Rm9ybWF0LFxyXG4gIFByaW50UGFwZXJGb3JtYXQsXHJcbiAgUHJpbnRPcmllbnRhdGlvbixcclxuICBQcmludFJlc29sdXRpb24sXHJcbiAgUHJpbnRTYXZlSW1hZ2VGb3JtYXRcclxufSBmcm9tICcuLi9zaGFyZWQvcHJpbnQudHlwZSc7XHJcblxyXG5pbXBvcnQgeyBQcmludFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvcHJpbnQuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1wcmludCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ByaW50LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpbnRDb21wb25lbnQge1xyXG4gIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBvdXRwdXRGb3JtYXQoKTogUHJpbnRPdXRwdXRGb3JtYXQge1xyXG4gICAgcmV0dXJuIHRoaXMuX291dHB1dEZvcm1hdDtcclxuICB9XHJcbiAgc2V0IG91dHB1dEZvcm1hdCh2YWx1ZTogUHJpbnRPdXRwdXRGb3JtYXQpIHtcclxuICAgIHRoaXMuX291dHB1dEZvcm1hdCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9vdXRwdXRGb3JtYXQ6IFByaW50T3V0cHV0Rm9ybWF0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBwYXBlckZvcm1hdCgpOiBQcmludFBhcGVyRm9ybWF0IHtcclxuICAgIHJldHVybiB0aGlzLl9wYXBlckZvcm1hdDtcclxuICB9XHJcbiAgc2V0IHBhcGVyRm9ybWF0KHZhbHVlOiBQcmludFBhcGVyRm9ybWF0KSB7XHJcbiAgICB0aGlzLl9wYXBlckZvcm1hdCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9wYXBlckZvcm1hdDogUHJpbnRQYXBlckZvcm1hdDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgb3JpZW50YXRpb24oKTogUHJpbnRPcmllbnRhdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XHJcbiAgfVxyXG4gIHNldCBvcmllbnRhdGlvbih2YWx1ZTogUHJpbnRPcmllbnRhdGlvbikge1xyXG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IFByaW50T3JpZW50YXRpb247XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGltYWdlRm9ybWF0KCk6IFByaW50U2F2ZUltYWdlRm9ybWF0IHtcclxuICAgIHJldHVybiB0aGlzLl9pbWFnZUZvcm1hdDtcclxuICB9XHJcbiAgc2V0IGltYWdlRm9ybWF0KHZhbHVlOiBQcmludFNhdmVJbWFnZUZvcm1hdCkge1xyXG4gICAgdGhpcy5faW1hZ2VGb3JtYXQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaW1hZ2VGb3JtYXQ6IFByaW50U2F2ZUltYWdlRm9ybWF0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCByZXNvbHV0aW9uKCk6IFByaW50UmVzb2x1dGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x1dGlvbjtcclxuICB9XHJcbiAgc2V0IHJlc29sdXRpb24odmFsdWU6IFByaW50UmVzb2x1dGlvbikge1xyXG4gICAgdGhpcy5fcmVzb2x1dGlvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9yZXNvbHV0aW9uOiBQcmludFJlc29sdXRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJpbnRTZXJ2aWNlOiBQcmludFNlcnZpY2UpIHt9XHJcblxyXG4gIGhhbmRsZUZvcm1TdWJtaXQoZGF0YTogUHJpbnRPcHRpb25zKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoZGF0YS5pc1ByaW50U2VydmljZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnByaW50U2VydmljZVxyXG4gICAgICAgIC5wcmludCh0aGlzLm1hcCwgZGF0YSlcclxuICAgICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbmJGaWxlVG9Qcm9jZXNzID0gMTtcclxuXHJcbiAgICAgIGlmIChkYXRhLnNob3dMZWdlbmQpIHtcclxuICAgICAgICBuYkZpbGVUb1Byb2Nlc3MrKztcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5pbWFnZUZvcm1hdC50b0xvd2VyQ2FzZSgpID09PSAndGlmZicpIHtcclxuICAgICAgICBuYkZpbGVUb1Byb2Nlc3MrKztcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wcmludFNlcnZpY2UuZGVmaW5lTmJGaWxlVG9Qcm9jZXNzKG5iRmlsZVRvUHJvY2Vzcyk7XHJcblxyXG4gICAgICBjb25zdCByZXNvbHV0aW9uID0gK2RhdGEucmVzb2x1dGlvbjtcclxuICAgICAgdGhpcy5wcmludFNlcnZpY2UuZG93bmxvYWRNYXBJbWFnZShcclxuICAgICAgICB0aGlzLm1hcCxcclxuICAgICAgICByZXNvbHV0aW9uLFxyXG4gICAgICAgIGRhdGEuaW1hZ2VGb3JtYXQsXHJcbiAgICAgICAgZGF0YS5zaG93UHJvamVjdGlvbixcclxuICAgICAgICBkYXRhLnNob3dTY2FsZSxcclxuICAgICAgICBkYXRhLnNob3dMZWdlbmQsXHJcbiAgICAgICAgZGF0YS50aXRsZSxcclxuICAgICAgICBkYXRhLmNvbW1lbnQsXHJcbiAgICAgICAgZGF0YS5kb1ppcEZpbGVcclxuICAgICAgKTtcclxuICAgICAgaWYgKGRhdGEuc2hvd0xlZ2VuZCkge1xyXG4gICAgICAgIHRoaXMucHJpbnRTZXJ2aWNlLmdldExheWVyc0xlZ2VuZEltYWdlKFxyXG4gICAgICAgICAgdGhpcy5tYXAsXHJcbiAgICAgICAgICBkYXRhLmltYWdlRm9ybWF0LFxyXG4gICAgICAgICAgZGF0YS5kb1ppcEZpbGUsXHJcbiAgICAgICAgICArcmVzb2x1dGlvblxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19