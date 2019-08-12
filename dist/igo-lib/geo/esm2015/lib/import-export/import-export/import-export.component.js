/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ImportExportComponent {
    /**
     * @param {?} importService
     * @param {?} exportService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} formBuilder
     */
    constructor(importService, exportService, languageService, messageService, formBuilder) {
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
    ngOnInit() {
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        layers => {
            this.layers = (/** @type {?} */ (layers
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                return layer instanceof VectorLayer && layer.exportable === true;
            }))));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
    /**
     * @param {?} files
     * @return {?}
     */
    importFiles(files) {
        for (const file of files) {
            this.importService
                .import(file, this.inputProj)
                .subscribe((/**
             * @param {?} features
             * @return {?}
             */
            (features) => this.onFileImportSuccess(file, features)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => this.onFileImportError(file, error)));
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    handleExportFormSubmit(data) {
        /** @type {?} */
        const layer = this.map.getLayerById(data.layer);
        /** @type {?} */
        const olFeatures = layer.dataSource.ol.getFeatures();
        this.exportService
            .export(olFeatures, data.format, layer.title, this.map.projection)
            .subscribe((/**
         * @return {?}
         */
        () => { }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.onFileExportError(error)));
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        this.form = this.formBuilder.group({
            format: ['', [Validators.required]],
            layer: ['', [Validators.required]]
        });
    }
    /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    onFileImportSuccess(file, features) {
        handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    onFileImportError(file, error) {
        handleFileImportError(file, error, this.messageService, this.languageService);
    }
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    onFileExportError(error) {
        handleFileExportError(error, this.messageService, this.languageService);
    }
}
ImportExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-import-export',
                template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.importTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\">\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <input\r\n            matInput\r\n            placeholder=\"{{'igo.geo.importExportForm.importProjPlaceholder' | translate}}\"\r\n            name=\"inputProj\"\r\n            [(ngModel)]=\"inputProj\">\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\">\r\n          {{'igo.geo.importExportForm.importButton' | translate}}\r\n        </button>\r\n        <input\r\n          #fileInput\r\n          type=\"file\"\r\n          [style.display]=\"'none'\"\r\n          (click)=\"fileInput.value = null\"\r\n          (change)=\"importFiles($event.target.files)\">\r\n      </div>\r\n    </form>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.exportTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\" [formGroup]=\"form\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"layer\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportLayerPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let layer of layers\" [value]=\"layer.id\">\r\n              {{layer.title}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"format\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportFormatPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let format of formats | keyvalue \" [value]=\"format.key\">\r\n              {{format.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button\r\n          mat-raised-button\r\n          type=\"button\"\r\n          [disabled]=\"!form.valid\"\r\n          (click)=\"handleExportFormSubmit(form.value)\">\r\n          {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n      </div>\r\n\r\n    </form>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                styles: ["mat-form-field{width:100%}.igo-form{padding:5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
            }] }
];
/** @nocollapse */
ImportExportComponent.ctorParameters = () => [
    { type: ImportService },
    { type: ExportService },
    { type: LanguageService },
    { type: MessageService },
    { type: FormBuilder }
];
ImportExportComponent.propDecorators = {
    map: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFhLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXJFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBT3hGLE1BQU0sT0FBTyxxQkFBcUI7Ozs7Ozs7O0lBV2hDLFlBQ1UsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsZUFBZ0MsRUFDaEMsY0FBOEIsRUFDOUIsV0FBd0I7UUFKeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWIzQixZQUFPLEdBQUcs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QzdCLDg0RUFBNkM7O2FBRTlDOzs7O1lBUFEsYUFBYTtZQURiLGFBQWE7WUFWRyxlQUFlO1lBQS9CLGNBQWM7WUFISCxXQUFXOzs7a0JBK0I1QixLQUFLOzs7O0lBUE4scUNBQXVCOztJQUN2Qix3Q0FBOEI7O0lBQzlCLHVDQUE2Qjs7SUFDN0IsMENBQXVDOzs7OztJQUV2Qyx5Q0FBK0I7O0lBRS9CLG9DQUFxQjs7Ozs7SUFHbkIsOENBQW9DOzs7OztJQUNwQyw4Q0FBb0M7Ozs7O0lBQ3BDLGdEQUF3Qzs7Ozs7SUFDeEMsK0NBQXNDOzs7OztJQUN0Qyw0Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xyXG5cclxuaW1wb3J0IHsgaGFuZGxlRmlsZUV4cG9ydEVycm9yIH0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC51dGlscyc7XHJcbmltcG9ydCB7IEV4cG9ydE9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEV4cG9ydEZvcm1hdCB9IGZyb20gJy4uL3NoYXJlZC9leHBvcnQudHlwZSc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2ltcG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MsIGhhbmRsZUZpbGVJbXBvcnRFcnJvciB9IGZyb20gJy4uL3NoYXJlZC9pbXBvcnQudXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28taW1wb3J0LWV4cG9ydCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ltcG9ydC1leHBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1wb3J0RXhwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyBmb3JtYXRzID0gRXhwb3J0Rm9ybWF0O1xyXG4gIHB1YmxpYyBsYXllcnM6IFZlY3RvckxheWVyW107XHJcbiAgcHVibGljIGlucHV0UHJvajogc3RyaW5nID0gJ0VQU0c6NDMyNic7XHJcblxyXG4gIHByaXZhdGUgbGF5ZXJzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBpbXBvcnRTZXJ2aWNlOiBJbXBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBleHBvcnRTZXJ2aWNlOiBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXJcclxuICApIHtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZShsYXllcnMgPT4ge1xyXG4gICAgICB0aGlzLmxheWVycyA9IGxheWVyc1xyXG4gICAgICAgIC5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVyIGluc3RhbmNlb2YgVmVjdG9yTGF5ZXIgJiYgbGF5ZXIuZXhwb3J0YWJsZSA9PT0gdHJ1ZTtcclxuICAgICAgICB9KSBhcyBWZWN0b3JMYXllcltdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGltcG9ydEZpbGVzKGZpbGVzOiBGaWxlW10pIHtcclxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xyXG4gICAgICB0aGlzLmltcG9ydFNlcnZpY2VcclxuICAgICAgICAuaW1wb3J0KGZpbGUsIHRoaXMuaW5wdXRQcm9qKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4gdGhpcy5vbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGZlYXR1cmVzKSxcclxuICAgICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlSW1wb3J0RXJyb3IoZmlsZSwgZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUV4cG9ydEZvcm1TdWJtaXQoZGF0YTogRXhwb3J0T3B0aW9ucykge1xyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLm1hcC5nZXRMYXllckJ5SWQoZGF0YS5sYXllcik7XHJcbiAgICBjb25zdCBvbEZlYXR1cmVzID0gbGF5ZXIuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlcygpO1xyXG4gICAgdGhpcy5leHBvcnRTZXJ2aWNlXHJcbiAgICAgIC5leHBvcnQob2xGZWF0dXJlcywgZGF0YS5mb3JtYXQsIGxheWVyLnRpdGxlLCB0aGlzLm1hcC5wcm9qZWN0aW9uKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHt9LFxyXG4gICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlRXhwb3J0RXJyb3IoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRm9ybSgpIHtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBmb3JtYXQ6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgbGF5ZXI6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMsIHRoaXMubWFwLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydEVycm9yKGZpbGU6IEZpbGUsIGVycm9yOiBFcnJvcikge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUV4cG9ydEVycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgaGFuZGxlRmlsZUV4cG9ydEVycm9yKGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==