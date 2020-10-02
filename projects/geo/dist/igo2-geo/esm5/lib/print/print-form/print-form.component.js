/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PrintOutputFormat, PrintPaperFormat, PrintOrientation, PrintResolution, PrintSaveImageFormat } from '../shared/print.type';
var PrintFormComponent = /** @class */ (function () {
    function PrintFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.outputFormats = PrintOutputFormat;
        this.paperFormats = PrintPaperFormat;
        this.orientations = PrintOrientation;
        this.resolutions = PrintResolution;
        this.imageFormats = PrintSaveImageFormat;
        this.isPrintService = true;
        this._disabled = false;
        this.submit = new EventEmitter();
        this.form = this.formBuilder.group({
            title: ['', []],
            comment: ['', []],
            outputFormat: ['', [Validators.required]],
            paperFormat: ['', [Validators.required]],
            imageFormat: ['', [Validators.required]],
            resolution: ['', [Validators.required]],
            orientation: ['', [Validators.required]],
            showProjection: false,
            showScale: false,
            showLegend: false,
            doZipFile: [{ hidden: this.isPrintService }]
        });
    }
    Object.defineProperty(PrintFormComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "imageFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this.imageFormatField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.imageFormatField.setValue(value || PrintSaveImageFormat.Jpeg, {
                onlySelf: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "outputFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this.outputFormatField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.outputFormatField.setValue(value || PrintOutputFormat.Pdf, {
                onlySelf: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "paperFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this.paperFormatField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.paperFormatField.setValue(value || PrintPaperFormat.Letter, {
                onlySelf: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "orientation", {
        get: /**
         * @return {?}
         */
        function () {
            return this.orientationField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.orientationField.setValue(value || PrintOrientation.landscape, {
                onlySelf: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "resolution", {
        get: /**
         * @return {?}
         */
        function () {
            return this.resolutionField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.resolutionField.setValue(value || PrintResolution['96'], {
                onlySelf: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this.titleField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.titleField.setValue(value, { onlySelf: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "comment", {
        get: /**
         * @return {?}
         */
        function () {
            return this.commentField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.commentField.setValue(value, { onlySelf: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "showProjection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showProjectionField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.showProjectionField.setValue(value, { onlySelf: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "showScale", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showScaleField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.showScaleField.setValue(value, { onlySelf: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "showLegend", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showLegendField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.showLegendField.setValue(value, { onlySelf: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "doZipFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this.doZipFileField.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.doZipFileField.setValue(value, { onlySelf: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "outputFormatField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).outputFormat));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "paperFormatField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).paperFormat));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "imageFormatField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).imageFormat));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "orientationField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).orientation));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "resolutionField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).resolution));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "commentField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).comment));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "showProjectionField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showProjection));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "showScaleField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showScale));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "showLegendField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showLegend));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "doZipFileField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).doZipFile));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintFormComponent.prototype, "titleField", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).title));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PrintFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.doZipFileField.setValue(false);
    };
    /**
     * @param {?} data
     * @param {?} isValid
     * @return {?}
     */
    PrintFormComponent.prototype.handleFormSubmit = /**
     * @param {?} data
     * @param {?} isValid
     * @return {?}
     */
    function (data, isValid) {
        this.submitted = true;
        data.isPrintService = this.isPrintService;
        if (isValid) {
            this.submit.emit(data);
        }
    };
    /**
     * @return {?}
     */
    PrintFormComponent.prototype.toggleImageSaveProp = /**
     * @return {?}
     */
    function () {
        if (this.outputFormatField.value === 'Image') {
            this.isPrintService = false;
        }
        else {
            this.isPrintService = true;
        }
    };
    PrintFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-print-form',
                    template: "<form class=\"igo-form\" [formGroup]=\"form\">\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        formControlName=\"title\"\r\n        placeholder=\"{{'igo.geo.printForm.title' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        formControlName=\"comment\"\r\n        placeholder=\"{{'igo.geo.printForm.comment' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <div class=\"print-slide-toggle-container mat-typography\">\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showProjection\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showProjection' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showScale\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showScale' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showLegend\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showLegend' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"doZipFile\"\r\n        [labelPosition]=\"'before'\"\r\n        [style.display]=\"isPrintService ? 'none' : ''\">\r\n        {{'igo.geo.printForm.doZipFile' | translate}}\r\n      </mat-slide-toggle>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <mat-select (selectionChange)=\"toggleImageSaveProp()\"\r\n        formControlName=\"outputFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.outputFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let outputFormat of outputFormats | keyvalue \" [value]=\"outputFormat.key\">\r\n            {{outputFormat.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'block' : 'none'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"paperFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.paperFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let paperFormat of paperFormats | keyvalue \" [value]=\"paperFormat.key\">\r\n          {{('igo.geo.printForm.paperFormats.' + paperFormat.value) | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'none' : 'block'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"imageFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.imageFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let imageFormat of imageFormats | keyvalue \" [value]=\"imageFormat.key\">\r\n          {{imageFormat.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" style=\"display: none;\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"resolution\"\r\n        placeholder=\"{{'igo.geo.printForm.resolution' | translate}}\">\r\n        <mat-option *ngFor=\"let resolution of resolutions | keyvalue \" [value]=\"resolution.key\">\r\n          {{resolution.value + ' PPI'}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'block' : 'none'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"orientation\"\r\n        placeholder=\"{{'igo.geo.printForm.orientation' | translate}}\">\r\n        <mat-option *ngFor=\"let orientation of orientations | keyvalue \" [value]=\"orientation.key\">\r\n          {{('igo.geo.printForm.' + orientation.value) | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-form-button-group print-button-top-padding\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"button\"\r\n      [disabled]=\"!form.valid || disabled\"\r\n      (click)=\"handleFormSubmit(form.value, form.valid)\">\r\n      {{'igo.geo.printForm.saveBtn' | translate}}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                    styles: ["mat-form-field{width:100%}.print-slide-toggle-container{overflow-x:hidden}.print-slide-toggle-container mat-slide-toggle{width:100%;margin:10px}.print-slide-toggle-container mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px)}.print-option{display:block;margin-right:10px;margin-bottom:15px}.print-button-top-padding{padding-top:25px}.igo-form{padding:10px 5px 5px}.igo-form-button-group{text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    PrintFormComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    PrintFormComponent.propDecorators = {
        disabled: [{ type: Input }],
        imageFormat: [{ type: Input }],
        outputFormat: [{ type: Input }],
        paperFormat: [{ type: Input }],
        orientation: [{ type: Input }],
        resolution: [{ type: Input }],
        title: [{ type: Input }],
        comment: [{ type: Input }],
        showProjection: [{ type: Input }],
        showScale: [{ type: Input }],
        showLegend: [{ type: Input }],
        doZipFile: [{ type: Input }],
        submit: [{ type: Output }]
    };
    return PrintFormComponent;
}());
export { PrintFormComponent };
if (false) {
    /** @type {?} */
    PrintFormComponent.prototype.form;
    /** @type {?} */
    PrintFormComponent.prototype.submitted;
    /** @type {?} */
    PrintFormComponent.prototype.outputFormats;
    /** @type {?} */
    PrintFormComponent.prototype.paperFormats;
    /** @type {?} */
    PrintFormComponent.prototype.orientations;
    /** @type {?} */
    PrintFormComponent.prototype.resolutions;
    /** @type {?} */
    PrintFormComponent.prototype.imageFormats;
    /** @type {?} */
    PrintFormComponent.prototype.isPrintService;
    /**
     * @type {?}
     * @private
     */
    PrintFormComponent.prototype._disabled;
    /** @type {?} */
    PrintFormComponent.prototype.submit;
    /**
     * @type {?}
     * @private
     */
    PrintFormComponent.prototype.formBuilder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcHJpbnQvcHJpbnQtZm9ybS9wcmludC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBRUwsV0FBVyxFQUVYLFVBQVUsRUFDWCxNQUFNLGdCQUFnQixDQUFDO0FBSXhCLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3JCLE1BQU0sc0JBQXNCLENBQUM7QUFFOUI7SUFzS0UsNEJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBN0pyQyxrQkFBYSxHQUFHLGlCQUFpQixDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsZ0JBQWdCLENBQUM7UUFDaEMsaUJBQVksR0FBRyxnQkFBZ0IsQ0FBQztRQUNoQyxnQkFBVyxHQUFHLGVBQWUsQ0FBQztRQUM5QixpQkFBWSxHQUFHLG9CQUFvQixDQUFDO1FBQ3BDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBU3JCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUE2SWhCLFdBQU0sR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdoRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDZixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ2pCLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FB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QUNFLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7Z0JBeE1GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQiw4N0lBQTBDOztpQkFFM0M7Ozs7Z0JBbkJDLFdBQVc7OzsyQkErQlYsS0FBSzs4QkFTTCxLQUFLOytCQVVMLEtBQUs7OEJBVUwsS0FBSzs4QkFVTCxLQUFLOzZCQVVMLEtBQUs7d0JBVUwsS0FBSzswQkFRTCxLQUFLO2lDQU9MLEtBQUs7NEJBT0wsS0FBSzs2QkFPTCxLQUFLOzRCQVFMLEtBQUs7eUJBb0RMLE1BQU07O0lBcUNULHlCQUFDO0NBQUEsQUF6TUQsSUF5TUM7U0FwTVksa0JBQWtCOzs7SUFDN0Isa0NBQXVCOztJQUN2Qix1Q0FBMEI7O0lBRTFCLDJDQUF5Qzs7SUFDekMsMENBQXVDOztJQUN2QywwQ0FBdUM7O0lBQ3ZDLHlDQUFxQzs7SUFDckMsMENBQTJDOztJQUMzQyw0Q0FBNkI7Ozs7O0lBUzdCLHVDQUEwQjs7SUE2STFCLG9DQUFrRTs7Ozs7SUFFdEQseUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEZvcm1Hcm91cCxcclxuICBGb3JtQnVpbGRlcixcclxuICBGb3JtQ29udHJvbCxcclxuICBWYWxpZGF0b3JzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgUHJpbnRPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3ByaW50LmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIFByaW50T3V0cHV0Rm9ybWF0LFxyXG4gIFByaW50UGFwZXJGb3JtYXQsXHJcbiAgUHJpbnRPcmllbnRhdGlvbixcclxuICBQcmludFJlc29sdXRpb24sXHJcbiAgUHJpbnRTYXZlSW1hZ2VGb3JtYXRcclxufSBmcm9tICcuLi9zaGFyZWQvcHJpbnQudHlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1wcmludC1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHJpbnQtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHJpbnQtZm9ybS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcmludEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIHN1Ym1pdHRlZDogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIG91dHB1dEZvcm1hdHMgPSBQcmludE91dHB1dEZvcm1hdDtcclxuICBwdWJsaWMgcGFwZXJGb3JtYXRzID0gUHJpbnRQYXBlckZvcm1hdDtcclxuICBwdWJsaWMgb3JpZW50YXRpb25zID0gUHJpbnRPcmllbnRhdGlvbjtcclxuICBwdWJsaWMgcmVzb2x1dGlvbnMgPSBQcmludFJlc29sdXRpb247XHJcbiAgcHVibGljIGltYWdlRm9ybWF0cyA9IFByaW50U2F2ZUltYWdlRm9ybWF0O1xyXG4gIHB1YmxpYyBpc1ByaW50U2VydmljZSA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGltYWdlRm9ybWF0KCk6IFByaW50U2F2ZUltYWdlRm9ybWF0IHtcclxuICAgIHJldHVybiB0aGlzLmltYWdlRm9ybWF0RmllbGQudmFsdWU7XHJcbiAgfVxyXG4gIHNldCBpbWFnZUZvcm1hdCh2YWx1ZTogUHJpbnRTYXZlSW1hZ2VGb3JtYXQpIHtcclxuICAgIHRoaXMuaW1hZ2VGb3JtYXRGaWVsZC5zZXRWYWx1ZSh2YWx1ZSB8fCBQcmludFNhdmVJbWFnZUZvcm1hdC5KcGVnLCB7XHJcbiAgICAgIG9ubHlTZWxmOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG91dHB1dEZvcm1hdCgpOiBQcmludE91dHB1dEZvcm1hdCB7XHJcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRGb3JtYXRGaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IG91dHB1dEZvcm1hdCh2YWx1ZTogUHJpbnRPdXRwdXRGb3JtYXQpIHtcclxuICAgIHRoaXMub3V0cHV0Rm9ybWF0RmllbGQuc2V0VmFsdWUodmFsdWUgfHwgUHJpbnRPdXRwdXRGb3JtYXQuUGRmLCB7XHJcbiAgICAgIG9ubHlTZWxmOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhcGVyRm9ybWF0KCk6IFByaW50UGFwZXJGb3JtYXQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFwZXJGb3JtYXRGaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IHBhcGVyRm9ybWF0KHZhbHVlOiBQcmludFBhcGVyRm9ybWF0KSB7XHJcbiAgICB0aGlzLnBhcGVyRm9ybWF0RmllbGQuc2V0VmFsdWUodmFsdWUgfHwgUHJpbnRQYXBlckZvcm1hdC5MZXR0ZXIsIHtcclxuICAgICAgb25seVNlbGY6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgb3JpZW50YXRpb24oKTogUHJpbnRPcmllbnRhdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbkZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgb3JpZW50YXRpb24odmFsdWU6IFByaW50T3JpZW50YXRpb24pIHtcclxuICAgIHRoaXMub3JpZW50YXRpb25GaWVsZC5zZXRWYWx1ZSh2YWx1ZSB8fCBQcmludE9yaWVudGF0aW9uLmxhbmRzY2FwZSwge1xyXG4gICAgICBvbmx5U2VsZjogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCByZXNvbHV0aW9uKCk6IFByaW50UmVzb2x1dGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNvbHV0aW9uRmllbGQudmFsdWU7XHJcbiAgfVxyXG4gIHNldCByZXNvbHV0aW9uKHZhbHVlOiBQcmludFJlc29sdXRpb24pIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbkZpZWxkLnNldFZhbHVlKHZhbHVlIHx8IFByaW50UmVzb2x1dGlvblsnOTYnXSwge1xyXG4gICAgICBvbmx5U2VsZjogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGVGaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudGl0bGVGaWVsZC5zZXRWYWx1ZSh2YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbW1lbnQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1lbnRGaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IGNvbW1lbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5jb21tZW50RmllbGQuc2V0VmFsdWUodmFsdWUsIHsgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dQcm9qZWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvd1Byb2plY3Rpb25GaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IHNob3dQcm9qZWN0aW9uKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNob3dQcm9qZWN0aW9uRmllbGQuc2V0VmFsdWUodmFsdWUsIHsgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dTY2FsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNob3dTY2FsZUZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgc2hvd1NjYWxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNob3dTY2FsZUZpZWxkLnNldFZhbHVlKHZhbHVlLCB7IG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIGdldCBzaG93TGVnZW5kKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvd0xlZ2VuZEZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgc2hvd0xlZ2VuZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zaG93TGVnZW5kRmllbGQuc2V0VmFsdWUodmFsdWUsIHsgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkb1ppcEZpbGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kb1ppcEZpbGVGaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IGRvWmlwRmlsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kb1ppcEZpbGVGaWVsZC5zZXRWYWx1ZSh2YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIGdldCBvdXRwdXRGb3JtYXRGaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkub3V0cHV0Rm9ybWF0IGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcGVyRm9ybWF0RmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLnBhcGVyRm9ybWF0IGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGltYWdlRm9ybWF0RmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLmltYWdlRm9ybWF0IGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9yaWVudGF0aW9uRmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLm9yaWVudGF0aW9uIGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJlc29sdXRpb25GaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkucmVzb2x1dGlvbiBhcyBGb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIGdldCBjb21tZW50RmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLmNvbW1lbnQgYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBnZXQgc2hvd1Byb2plY3Rpb25GaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkuc2hvd1Byb2plY3Rpb24gYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBnZXQgc2hvd1NjYWxlRmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLnNob3dTY2FsZSBhcyBGb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIGdldCBzaG93TGVnZW5kRmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLnNob3dMZWdlbmQgYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBnZXQgZG9aaXBGaWxlRmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLmRvWmlwRmlsZSBhcyBGb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIGdldCB0aXRsZUZpZWxkKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmZvcm0uY29udHJvbHMgYXMgYW55KS50aXRsZSBhcyBGb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxQcmludE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHRpdGxlOiBbJycsIFtdXSxcclxuICAgICAgY29tbWVudDogWycnLCBbXV0sXHJcbiAgICAgIG91dHB1dEZvcm1hdDogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICBwYXBlckZvcm1hdDogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICBpbWFnZUZvcm1hdDogWyAnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgcmVzb2x1dGlvbjogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICBvcmllbnRhdGlvbjogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICBzaG93UHJvamVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHNob3dTY2FsZTogZmFsc2UsXHJcbiAgICAgIHNob3dMZWdlbmQ6IGZhbHNlLFxyXG4gICAgICBkb1ppcEZpbGU6IFt7aGlkZGVuOiB0aGlzLmlzUHJpbnRTZXJ2aWNlIH1dXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5kb1ppcEZpbGVGaWVsZC5zZXRWYWx1ZShmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVGb3JtU3VibWl0KGRhdGE6IFByaW50T3B0aW9ucywgaXNWYWxpZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlO1xyXG4gICAgZGF0YS5pc1ByaW50U2VydmljZSA9IHRoaXMuaXNQcmludFNlcnZpY2U7XHJcbiAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLnN1Ym1pdC5lbWl0KGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlSW1hZ2VTYXZlUHJvcCgpIHtcclxuICAgIGlmICh0aGlzLm91dHB1dEZvcm1hdEZpZWxkLnZhbHVlID09PSAnSW1hZ2UnKSB7XHJcbiAgICAgIHRoaXMuaXNQcmludFNlcnZpY2UgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNQcmludFNlcnZpY2UgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=