/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PrintOutputFormat, PrintPaperFormat, PrintOrientation, PrintResolution, PrintSaveImageFormat } from '../shared/print.type';
export class PrintFormComponent {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
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
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    get imageFormat() {
        return this.imageFormatField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set imageFormat(value) {
        this.imageFormatField.setValue(value || PrintSaveImageFormat.Jpeg, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get outputFormat() {
        return this.outputFormatField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set outputFormat(value) {
        this.outputFormatField.setValue(value || PrintOutputFormat.Pdf, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get paperFormat() {
        return this.paperFormatField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set paperFormat(value) {
        this.paperFormatField.setValue(value || PrintPaperFormat.Letter, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this.orientationField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this.orientationField.setValue(value || PrintOrientation.landscape, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get resolution() {
        return this.resolutionField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set resolution(value) {
        this.resolutionField.setValue(value || PrintResolution['96'], {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get title() {
        return this.titleField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this.titleField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get comment() {
        return this.commentField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set comment(value) {
        this.commentField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get showProjection() {
        return this.showProjectionField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showProjection(value) {
        this.showProjectionField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get showScale() {
        return this.showScaleField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showScale(value) {
        this.showScaleField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get showLegend() {
        return this.showLegendField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showLegend(value) {
        this.showLegendField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get doZipFile() {
        return this.doZipFileField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set doZipFile(value) {
        this.doZipFileField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get outputFormatField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).outputFormat));
    }
    /**
     * @return {?}
     */
    get paperFormatField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).paperFormat));
    }
    /**
     * @return {?}
     */
    get imageFormatField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).imageFormat));
    }
    /**
     * @return {?}
     */
    get orientationField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).orientation));
    }
    /**
     * @return {?}
     */
    get resolutionField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).resolution));
    }
    /**
     * @return {?}
     */
    get commentField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).comment));
    }
    /**
     * @return {?}
     */
    get showProjectionField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showProjection));
    }
    /**
     * @return {?}
     */
    get showScaleField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showScale));
    }
    /**
     * @return {?}
     */
    get showLegendField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showLegend));
    }
    /**
     * @return {?}
     */
    get doZipFileField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).doZipFile));
    }
    /**
     * @return {?}
     */
    get titleField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).title));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.doZipFileField.setValue(false);
    }
    /**
     * @param {?} data
     * @param {?} isValid
     * @return {?}
     */
    handleFormSubmit(data, isValid) {
        this.submitted = true;
        data.isPrintService = this.isPrintService;
        if (isValid) {
            this.submit.emit(data);
        }
    }
    /**
     * @return {?}
     */
    toggleImageSaveProp() {
        if (this.outputFormatField.value === 'Image') {
            this.isPrintService = false;
        }
        else {
            this.isPrintService = true;
        }
    }
}
PrintFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-print-form',
                template: "<form class=\"igo-form\" [formGroup]=\"form\">\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        formControlName=\"title\"\r\n        placeholder=\"{{'igo.geo.printForm.title' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        formControlName=\"comment\"\r\n        placeholder=\"{{'igo.geo.printForm.comment' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <div class=\"print-slide-toggle-container\">\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showProjection\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showProjection' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showScale\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showScale' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showLegend\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showLegend' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"doZipFile\"\r\n        [labelPosition]=\"'before'\"\r\n        [style.display]=\"isPrintService ? 'none' : ''\">\r\n        {{'igo.geo.printForm.doZipFile' | translate}}\r\n      </mat-slide-toggle>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <mat-select (selectionChange)=\"toggleImageSaveProp()\"\r\n        formControlName=\"outputFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.outputFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let outputFormat of outputFormats | keyvalue \" [value]=\"outputFormat.key\">\r\n            {{outputFormat.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'block' : 'none'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"paperFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.paperFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let paperFormat of paperFormats | keyvalue \" [value]=\"paperFormat.key\">\r\n          {{('igo.geo.printForm.paperFormats.' + paperFormat.value) | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'none' : 'block'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"imageFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.imageFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let imageFormat of imageFormats | keyvalue \" [value]=\"imageFormat.key\">\r\n          {{imageFormat.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" style=\"display: none;\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"resolution\"\r\n        placeholder=\"{{'igo.geo.printForm.resolution' | translate}}\">\r\n        <mat-option *ngFor=\"let resolution of resolutions | keyvalue \" [value]=\"resolution.key\">\r\n          {{resolution.value + ' PPI'}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'block' : 'none'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"orientation\"\r\n        placeholder=\"{{'igo.geo.printForm.orientation' | translate}}\">\r\n        <mat-option *ngFor=\"let orientation of orientations | keyvalue \" [value]=\"orientation.key\">\r\n          {{('igo.geo.printForm.' + orientation.value) | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-form-button-group print-button-top-padding\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"button\"\r\n      [disabled]=\"!form.valid || disabled\"\r\n      (click)=\"handleFormSubmit(form.value, form.valid)\">\r\n      {{'igo.geo.printForm.saveBtn' | translate}}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                styles: ["mat-form-field{width:100%}.print-slide-toggle-container{overflow-x:hidden}.print-slide-toggle-container mat-slide-toggle{width:100%;margin:10px}.print-slide-toggle-container mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px);font-size:16px}.print-option{display:block;margin-right:10px;margin-bottom:15px}.print-button-top-padding{padding-top:25px}.igo-form{padding:10px 5px 5px}.igo-form-button-group{text-align:center}"]
            }] }
];
/** @nocollapse */
PrintFormComponent.ctorParameters = () => [
    { type: FormBuilder }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcHJpbnQvcHJpbnQtZm9ybS9wcmludC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBRUwsV0FBVyxFQUVYLFVBQVUsRUFDWCxNQUFNLGdCQUFnQixDQUFDO0FBSXhCLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3JCLE1BQU0sc0JBQXNCLENBQUM7QUFPOUIsTUFBTSxPQUFPLGtCQUFrQjs7OztJQWlLN0IsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUE3SnJDLGtCQUFhLEdBQUcsaUJBQWlCLENBQUM7UUFDbEMsaUJBQVksR0FBRyxnQkFBZ0IsQ0FBQztRQUNoQyxpQkFBWSxHQUFHLGdCQUFnQixDQUFDO1FBQ2hDLGdCQUFXLEdBQUcsZUFBZSxDQUFDO1FBQzlCLGlCQUFZLEdBQUcsb0JBQW9CLENBQUM7UUFDcEMsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFTckIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQTZJaEIsV0FBTSxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDakMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNmLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDakIsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLFdBQVcsRUFB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WUFuQkMsV0FBVzs7O3VCQStCVixLQUFLOzBCQVNMLEtBQUs7MkJBVUwsS0FBSzswQkFVTCxLQUFLOzBCQVVMLEtBQUs7eUJBVUwsS0FBSztvQkFVTCxLQUFLO3NCQVFMLEtBQUs7NkJBT0wsS0FBSzt3QkFPTCxLQUFLO3lCQU9MLEtBQUs7d0JBUUwsS0FBSztxQkFvREwsTUFBTTs7OztJQTlKUCxrQ0FBdUI7O0lBQ3ZCLHVDQUEwQjs7SUFFMUIsMkNBQXlDOztJQUN6QywwQ0FBdUM7O0lBQ3ZDLDBDQUF1Qzs7SUFDdkMseUNBQXFDOztJQUNyQywwQ0FBMkM7O0lBQzNDLDRDQUE2Qjs7Ozs7SUFTN0IsdUNBQTBCOztJQTZJMUIsb0NBQWtFOzs7OztJQUV0RCx5Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgRm9ybUdyb3VwLFxyXG4gIEZvcm1CdWlsZGVyLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIFZhbGlkYXRvcnNcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBQcmludE9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvcHJpbnQuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgUHJpbnRPdXRwdXRGb3JtYXQsXHJcbiAgUHJpbnRQYXBlckZvcm1hdCxcclxuICBQcmludE9yaWVudGF0aW9uLFxyXG4gIFByaW50UmVzb2x1dGlvbixcclxuICBQcmludFNhdmVJbWFnZUZvcm1hdFxyXG59IGZyb20gJy4uL3NoYXJlZC9wcmludC50eXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXByaW50LWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmludC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wcmludC1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFByaW50Rm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgc3VibWl0dGVkOiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgb3V0cHV0Rm9ybWF0cyA9IFByaW50T3V0cHV0Rm9ybWF0O1xyXG4gIHB1YmxpYyBwYXBlckZvcm1hdHMgPSBQcmludFBhcGVyRm9ybWF0O1xyXG4gIHB1YmxpYyBvcmllbnRhdGlvbnMgPSBQcmludE9yaWVudGF0aW9uO1xyXG4gIHB1YmxpYyByZXNvbHV0aW9ucyA9IFByaW50UmVzb2x1dGlvbjtcclxuICBwdWJsaWMgaW1hZ2VGb3JtYXRzID0gUHJpbnRTYXZlSW1hZ2VGb3JtYXQ7XHJcbiAgcHVibGljIGlzUHJpbnRTZXJ2aWNlID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgaW1hZ2VGb3JtYXQoKTogUHJpbnRTYXZlSW1hZ2VGb3JtYXQge1xyXG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VGb3JtYXRGaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IGltYWdlRm9ybWF0KHZhbHVlOiBQcmludFNhdmVJbWFnZUZvcm1hdCkge1xyXG4gICAgdGhpcy5pbWFnZUZvcm1hdEZpZWxkLnNldFZhbHVlKHZhbHVlIHx8IFByaW50U2F2ZUltYWdlRm9ybWF0LkpwZWcsIHtcclxuICAgICAgb25seVNlbGY6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgb3V0cHV0Rm9ybWF0KCk6IFByaW50T3V0cHV0Rm9ybWF0IHtcclxuICAgIHJldHVybiB0aGlzLm91dHB1dEZvcm1hdEZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgb3V0cHV0Rm9ybWF0KHZhbHVlOiBQcmludE91dHB1dEZvcm1hdCkge1xyXG4gICAgdGhpcy5vdXRwdXRGb3JtYXRGaWVsZC5zZXRWYWx1ZSh2YWx1ZSB8fCBQcmludE91dHB1dEZvcm1hdC5QZGYsIHtcclxuICAgICAgb25seVNlbGY6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgcGFwZXJGb3JtYXQoKTogUHJpbnRQYXBlckZvcm1hdCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXBlckZvcm1hdEZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgcGFwZXJGb3JtYXQodmFsdWU6IFByaW50UGFwZXJGb3JtYXQpIHtcclxuICAgIHRoaXMucGFwZXJGb3JtYXRGaWVsZC5zZXRWYWx1ZSh2YWx1ZSB8fCBQcmludFBhcGVyRm9ybWF0LkxldHRlciwge1xyXG4gICAgICBvbmx5U2VsZjogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBvcmllbnRhdGlvbigpOiBQcmludE9yaWVudGF0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9uRmllbGQudmFsdWU7XHJcbiAgfVxyXG4gIHNldCBvcmllbnRhdGlvbih2YWx1ZTogUHJpbnRPcmllbnRhdGlvbikge1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbkZpZWxkLnNldFZhbHVlKHZhbHVlIHx8IFByaW50T3JpZW50YXRpb24ubGFuZHNjYXBlLCB7XHJcbiAgICAgIG9ubHlTZWxmOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHJlc29sdXRpb24oKTogUHJpbnRSZXNvbHV0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLnJlc29sdXRpb25GaWVsZC52YWx1ZTtcclxuICB9XHJcbiAgc2V0IHJlc29sdXRpb24odmFsdWU6IFByaW50UmVzb2x1dGlvbikge1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uRmllbGQuc2V0VmFsdWUodmFsdWUgfHwgUHJpbnRSZXNvbHV0aW9uWyc5NiddLCB7XHJcbiAgICAgIG9ubHlTZWxmOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZUZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy50aXRsZUZpZWxkLnNldFZhbHVlKHZhbHVlLCB7IG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29tbWVudCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbWVudEZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgY29tbWVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNvbW1lbnRGaWVsZC5zZXRWYWx1ZSh2YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBnZXQgc2hvd1Byb2plY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaG93UHJvamVjdGlvbkZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgc2hvd1Byb2plY3Rpb24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc2hvd1Byb2plY3Rpb25GaWVsZC5zZXRWYWx1ZSh2YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBnZXQgc2hvd1NjYWxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvd1NjYWxlRmllbGQudmFsdWU7XHJcbiAgfVxyXG4gIHNldCBzaG93U2NhbGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc2hvd1NjYWxlRmllbGQuc2V0VmFsdWUodmFsdWUsIHsgb25seVNlbGY6IHRydWUgfSk7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNob3dMZWdlbmQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaG93TGVnZW5kRmllbGQudmFsdWU7XHJcbiAgfVxyXG4gIHNldCBzaG93TGVnZW5kKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNob3dMZWdlbmRGaWVsZC5zZXRWYWx1ZSh2YWx1ZSwgeyBvbmx5U2VsZjogdHJ1ZSB9KTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRvWmlwRmlsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmRvWmlwRmlsZUZpZWxkLnZhbHVlO1xyXG4gIH1cclxuICBzZXQgZG9aaXBGaWxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRvWmlwRmlsZUZpZWxkLnNldFZhbHVlKHZhbHVlLCB7IG9ubHlTZWxmOiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG91dHB1dEZvcm1hdEZpZWxkKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmZvcm0uY29udHJvbHMgYXMgYW55KS5vdXRwdXRGb3JtYXQgYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFwZXJGb3JtYXRGaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkucGFwZXJGb3JtYXQgYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBnZXQgaW1hZ2VGb3JtYXRGaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkuaW1hZ2VGb3JtYXQgYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBnZXQgb3JpZW50YXRpb25GaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkub3JpZW50YXRpb24gYXMgRm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBnZXQgcmVzb2x1dGlvbkZpZWxkKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmZvcm0uY29udHJvbHMgYXMgYW55KS5yZXNvbHV0aW9uIGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbW1lbnRGaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkuY29tbWVudCBhcyBGb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIGdldCBzaG93UHJvamVjdGlvbkZpZWxkKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmZvcm0uY29udHJvbHMgYXMgYW55KS5zaG93UHJvamVjdGlvbiBhcyBGb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIGdldCBzaG93U2NhbGVGaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkuc2hvd1NjYWxlIGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dMZWdlbmRGaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkuc2hvd0xlZ2VuZCBhcyBGb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIGdldCBkb1ppcEZpbGVGaWVsZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5mb3JtLmNvbnRyb2xzIGFzIGFueSkuZG9aaXBGaWxlIGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRpdGxlRmllbGQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZm9ybS5jb250cm9scyBhcyBhbnkpLnRpdGxlIGFzIEZvcm1Db250cm9sO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHN1Ym1pdDogRXZlbnRFbWl0dGVyPFByaW50T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XHJcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgdGl0bGU6IFsnJywgW11dLFxyXG4gICAgICBjb21tZW50OiBbJycsIFtdXSxcclxuICAgICAgb3V0cHV0Rm9ybWF0OiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgIHBhcGVyRm9ybWF0OiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgIGltYWdlRm9ybWF0OiBbICcnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICByZXNvbHV0aW9uOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgIG9yaWVudGF0aW9uOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgIHNob3dQcm9qZWN0aW9uOiBmYWxzZSxcclxuICAgICAgc2hvd1NjYWxlOiBmYWxzZSxcclxuICAgICAgc2hvd0xlZ2VuZDogZmFsc2UsXHJcbiAgICAgIGRvWmlwRmlsZTogW3toaWRkZW46IHRoaXMuaXNQcmludFNlcnZpY2UgfV1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmRvWmlwRmlsZUZpZWxkLnNldFZhbHVlKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUZvcm1TdWJtaXQoZGF0YTogUHJpbnRPcHRpb25zLCBpc1ZhbGlkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICBkYXRhLmlzUHJpbnRTZXJ2aWNlID0gdGhpcy5pc1ByaW50U2VydmljZTtcclxuICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgIHRoaXMuc3VibWl0LmVtaXQoZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVJbWFnZVNhdmVQcm9wKCkge1xyXG4gICAgaWYgKHRoaXMub3V0cHV0Rm9ybWF0RmllbGQudmFsdWUgPT09ICdJbWFnZScpIHtcclxuICAgICAgdGhpcy5pc1ByaW50U2VydmljZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1ByaW50U2VydmljZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==