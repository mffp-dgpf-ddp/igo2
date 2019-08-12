/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, LanguageService } from '@igo2/core';
import { IgoMap } from '../../map/shared/map';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { handleFileExportError } from '../shared/export.utils';
import { ExportFormat } from '../shared/export.type';
import { ExportService } from '../shared/export.service';
import { ImportService } from '../shared/import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
var ImportExportComponent = /** @class */ (function () {
    function ImportExportComponent(importService, exportService, languageService, messageService, formBuilder) {
        this.importService = importService;
        this.exportService = exportService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.formBuilder = formBuilder;
        this.formats = ExportFormat;
        this.inputProj = 'EPSG:4326';
        this.buildForm();
    }
    /**
     * @return {?}
     */
    ImportExportComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        function (layers) {
            _this.layers = (/** @type {?} */ (layers
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                return layer instanceof VectorLayer && layer.exportable === true;
            }))));
        }));
    };
    /**
     * @return {?}
     */
    ImportExportComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layers$$.unsubscribe();
    };
    /**
     * @param {?} files
     * @return {?}
     */
    ImportExportComponent.prototype.importFiles = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        var _this = this;
        var e_1, _a;
        var _loop_1 = function (file) {
            this_1.importService
                .import(file, this_1.inputProj)
                .subscribe((/**
             * @param {?} features
             * @return {?}
             */
            function (features) { return _this.onFileImportSuccess(file, features); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return _this.onFileImportError(file, error); }));
        };
        var this_1 = this;
        try {
            for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                _loop_1(file);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ImportExportComponent.prototype.handleExportFormSubmit = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        /** @type {?} */
        var layer = this.map.getLayerById(data.layer);
        /** @type {?} */
        var olFeatures = layer.dataSource.ol.getFeatures();
        this.exportService
            .export(olFeatures, data.format, layer.title, this.map.projection)
            .subscribe((/**
         * @return {?}
         */
        function () { }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.onFileExportError(error); }));
    };
    /**
     * @private
     * @return {?}
     */
    ImportExportComponent.prototype.buildForm = /**
     * @private
     * @return {?}
     */
    function () {
        this.form = this.formBuilder.group({
            format: ['', [Validators.required]],
            layer: ['', [Validators.required]]
        });
    };
    /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    ImportExportComponent.prototype.onFileImportSuccess = /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    function (file, features) {
        handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
    };
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    ImportExportComponent.prototype.onFileImportError = /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    function (file, error) {
        handleFileImportError(file, error, this.messageService, this.languageService);
    };
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    ImportExportComponent.prototype.onFileExportError = /**
     * @private
     * @param {?} error
     * @return {?}
     */
    function (error) {
        handleFileExportError(error, this.messageService, this.languageService);
    };
    ImportExportComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-import-export',
                    template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.importTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\">\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <input\r\n            matInput\r\n            placeholder=\"{{'igo.geo.importExportForm.importProjPlaceholder' | translate}}\"\r\n            name=\"inputProj\"\r\n            [(ngModel)]=\"inputProj\">\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\">\r\n          {{'igo.geo.importExportForm.importButton' | translate}}\r\n        </button>\r\n        <input\r\n          #fileInput\r\n          type=\"file\"\r\n          [style.display]=\"'none'\"\r\n          (click)=\"fileInput.value = null\"\r\n          (change)=\"importFiles($event.target.files)\">\r\n      </div>\r\n    </form>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.exportTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\" [formGroup]=\"form\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"layer\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportLayerPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let layer of layers\" [value]=\"layer.id\">\r\n              {{layer.title}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"format\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportFormatPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let format of formats | keyvalue \" [value]=\"format.key\">\r\n              {{format.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button\r\n          mat-raised-button\r\n          type=\"button\"\r\n          [disabled]=\"!form.valid\"\r\n          (click)=\"handleExportFormSubmit(form.value)\">\r\n          {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n      </div>\r\n\r\n    </form>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                    styles: ["mat-form-field{width:100%}.igo-form{padding:5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
                }] }
    ];
    /** @nocollapse */
    ImportExportComponent.ctorParameters = function () { return [
        { type: ImportService },
        { type: ExportService },
        { type: LanguageService },
        { type: MessageService },
        { type: FormBuilder }
    ]; };
    ImportExportComponent.propDecorators = {
        map: [{ type: Input }]
    };
    return ImportExportComponent;
}());
export { ImportExportComponent };
if (false) {
    /** @type {?} */
    ImportExportComponent.prototype.form;
    /** @type {?} */
    ImportExportComponent.prototype.formats;
    /** @type {?} */
    ImportExportComponent.prototype.layers;
    /** @type {?} */
    ImportExportComponent.prototype.inputProj;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.layers$$;
    /** @type {?} */
    ImportExportComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.importService;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.exportService;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.formBuilder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBYSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV4RjtJQWdCRSwrQkFDVSxhQUE0QixFQUM1QixhQUE0QixFQUM1QixlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixXQUF3QjtRQUp4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBYjNCLFlBQU8sR0FBRyxZQUFZLENBQUM7UUFFdkIsY0FBUyxH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QixVQUEwQixLQUFZO1FBQ3BDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxRSxDQUFDOztnQkE5RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLDg0RUFBNkM7O2lCQUU5Qzs7OztnQkFQUSxhQUFhO2dCQURiLGFBQWE7Z0JBVkcsZUFBZTtnQkFBL0IsY0FBYztnQkFISCxXQUFXOzs7c0JBK0I1QixLQUFLOztJQWlFUiw0QkFBQztDQUFBLEFBL0VELElBK0VDO1NBMUVZLHFCQUFxQjs7O0lBRWhDLHFDQUF1Qjs7SUFDdkIsd0NBQThCOztJQUM5Qix1Q0FBNkI7O0lBQzdCLDBDQUF1Qzs7Ozs7SUFFdkMseUNBQStCOztJQUUvQixvQ0FBcUI7Ozs7O0lBR25CLDhDQUFvQzs7Ozs7SUFDcEMsOENBQW9DOzs7OztJQUNwQyxnREFBd0M7Ozs7O0lBQ3hDLCtDQUFzQzs7Ozs7SUFDdEMsNENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuXHJcbmltcG9ydCB7IGhhbmRsZUZpbGVFeHBvcnRFcnJvciB9IGZyb20gJy4uL3NoYXJlZC9leHBvcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBFeHBvcnRPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBFeHBvcnRGb3JtYXQgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LnR5cGUnO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW1wb3J0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9pbXBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzLCBoYW5kbGVGaWxlSW1wb3J0RXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWltcG9ydC1leHBvcnQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pbXBvcnQtZXhwb3J0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pbXBvcnQtZXhwb3J0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEltcG9ydEV4cG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgZm9ybWF0cyA9IEV4cG9ydEZvcm1hdDtcclxuICBwdWJsaWMgbGF5ZXJzOiBWZWN0b3JMYXllcltdO1xyXG4gIHB1YmxpYyBpbnB1dFByb2o6IHN0cmluZyA9ICdFUFNHOjQzMjYnO1xyXG5cclxuICBwcml2YXRlIGxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW1wb3J0U2VydmljZTogSW1wb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXhwb3J0U2VydmljZTogRXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmxheWVycyQkID0gdGhpcy5tYXAubGF5ZXJzJC5zdWJzY3JpYmUobGF5ZXJzID0+IHtcclxuICAgICAgdGhpcy5sYXllcnMgPSBsYXllcnNcclxuICAgICAgICAuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBsYXllciBpbnN0YW5jZW9mIFZlY3RvckxheWVyICYmIGxheWVyLmV4cG9ydGFibGUgPT09IHRydWU7XHJcbiAgICAgICAgfSkgYXMgVmVjdG9yTGF5ZXJbXTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxheWVycyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBpbXBvcnRGaWxlcyhmaWxlczogRmlsZVtdKSB7XHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcclxuICAgICAgdGhpcy5pbXBvcnRTZXJ2aWNlXHJcbiAgICAgICAgLmltcG9ydChmaWxlLCB0aGlzLmlucHV0UHJvailcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcyksXHJcbiAgICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFeHBvcnRGb3JtU3VibWl0KGRhdGE6IEV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGRhdGEubGF5ZXIpO1xyXG4gICAgY29uc3Qgb2xGZWF0dXJlcyA9IGxheWVyLmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZXMoKTtcclxuICAgIHRoaXMuZXhwb3J0U2VydmljZVxyXG4gICAgICAuZXhwb3J0KG9sRmVhdHVyZXMsIGRhdGEuZm9ybWF0LCBsYXllci50aXRsZSwgdGhpcy5tYXAucHJvamVjdGlvbilcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7fSxcclxuICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUV4cG9ydEVycm9yKGVycm9yKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEZvcm0oKSB7XHJcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgZm9ybWF0OiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgIGxheWVyOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGU6IEZpbGUsIGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGZlYXR1cmVzLCB0aGlzLm1hcCwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRFcnJvcihmaWxlOiBGaWxlLCBlcnJvcjogRXJyb3IpIHtcclxuICAgIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihmaWxlLCBlcnJvciwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVFeHBvcnRFcnJvcihlcnJvcjogRXJyb3IpIHtcclxuICAgIGhhbmRsZUZpbGVFeHBvcnRFcnJvcihlcnJvciwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxufVxyXG4iXX0=