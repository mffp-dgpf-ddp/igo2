/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MessageService, LanguageService, ConfigService } from '@igo2/core';
import { IgoMap } from '../../map/shared/map';
import { ClusterDataSource } from '../../datasource/shared/datasources/cluster-datasource';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { handleFileExportError } from '../shared/export.utils';
import { ExportFormat } from '../shared/export.type';
import { ExportService } from '../shared/export.service';
import { ImportService } from '../shared/import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
import { StyleService } from '../../layer/shared/style.service';
import { StyleListService } from '../style-list/style-list.service';
var ImportExportComponent = /** @class */ (function () {
    function ImportExportComponent(importService, exportService, languageService, messageService, styleListService, styleService, formBuilder, config) {
        this.importService = importService;
        this.exportService = exportService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.styleListService = styleListService;
        this.styleService = styleService;
        this.formBuilder = formBuilder;
        this.config = config;
        this.formats = ExportFormat;
        this.inputProj = 'EPSG:4326';
        this.loading$ = new BehaviorSubject(false);
        this.espgCodeRegex = new RegExp('^\\d{4,6}');
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
            _this.layers = (/** @type {?} */ (layers.filter((/**
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
        /** @type {?} */
        var inputProj = this.inputProj;
        if (this.espgCodeRegex.test(inputProj)) {
            inputProj = "EPSG:" + inputProj;
        }
        this.loading$.next(true);
        var _loop_1 = function (file) {
            this_1.importService.import(file, inputProj).subscribe((/**
             * @param {?} features
             * @return {?}
             */
            function (features) { return _this.onFileImportSuccess(file, features); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return _this.onFileImportError(file, error); }), (/**
             * @return {?}
             */
            function () {
                _this.loading$.next(false);
            }));
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
        this.loading$.next(true);
        /** @type {?} */
        var layer = this.map.getLayerById(data.layer);
        /** @type {?} */
        var olFeatures = layer.dataSource.ol.getFeatures();
        if (layer.dataSource instanceof ClusterDataSource) {
            olFeatures = olFeatures.flatMap((/**
             * @param {?} cluster
             * @return {?}
             */
            function (cluster) { return cluster.get('features'); }));
        }
        this.exportService
            .export(olFeatures, data.format, layer.title, this.map.projection)
            .subscribe((/**
         * @return {?}
         */
        function () { }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.onFileExportError(error); }), (/**
         * @return {?}
         */
        function () {
            _this.loading$.next(false);
        }));
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
        if (!this.config.getConfig('importWithStyle')) {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
        }
        else {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService, this.styleListService, this.styleService);
        }
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
        this.loading$.next(false);
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
        this.loading$.next(false);
        handleFileExportError(error, this.messageService, this.languageService);
    };
    ImportExportComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-import-export',
                    template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.importTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\">\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <input\r\n            matInput\r\n            placeholder=\"{{'igo.geo.importExportForm.importProjPlaceholder' | translate}}\"\r\n            name=\"inputProj\"\r\n            [(ngModel)]=\"inputProj\">\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n          {{'igo.geo.importExportForm.importButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n        <input\r\n          #fileInput\r\n          type=\"file\"\r\n          [style.display]=\"'none'\"\r\n          (click)=\"fileInput.value = null\"\r\n          (change)=\"importFiles($event.target.files)\">\r\n      </div>\r\n    </form>\r\n    <section class=\"mat-typography\">\r\n    <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n    <ul>\r\n      <li>{{'igo.geo.importExportForm.importSizeMax' | translate}}</li>\r\n      <li>{{'igo.geo.importExportForm.importShpZip' | translate}}</li>\r\n    </ul>\r\n  </section>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.exportTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\" [formGroup]=\"form\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"layer\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportLayerPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let layer of layers\" [value]=\"layer.id\">\r\n              {{layer.title}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"format\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportFormatPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let format of formats | keyvalue \" [value]=\"format.key\">\r\n              {{format.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button\r\n          mat-raised-button\r\n          type=\"button\"\r\n          [disabled]=\"!form.valid || (loading$ | async)\"\r\n          (click)=\"handleExportFormSubmit(form.value)\">\r\n          {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n      </div>\r\n\r\n    </form>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                    styles: ["mat-form-field{width:100%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}"]
                }] }
    ];
    /** @nocollapse */
    ImportExportComponent.ctorParameters = function () { return [
        { type: ImportService },
        { type: ExportService },
        { type: LanguageService },
        { type: MessageService },
        { type: StyleListService },
        { type: StyleService },
        { type: FormBuilder },
        { type: ConfigService }
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
    /** @type {?} */
    ImportExportComponent.prototype.loading$;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.layers$$;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.espgCodeRegex;
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
    ImportExportComponent.prototype.styleListService;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.styleService;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.formBuilder;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBYSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzVFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUUzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFcEU7SUFrQkUsK0JBQ1UsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsZUFBZ0MsRUFDaEMsY0FBOEIs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QWdDOzs7OztJQUNoQyx1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuXHJcbmltcG9ydCB7IGhhbmRsZUZpbGVFeHBvcnRFcnJvciB9IGZyb20gJy4uL3NoYXJlZC9leHBvcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBFeHBvcnRPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBFeHBvcnRGb3JtYXQgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LnR5cGUnO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW1wb3J0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9pbXBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MsXHJcbiAgaGFuZGxlRmlsZUltcG9ydEVycm9yXHJcbn0gZnJvbSAnLi4vc2hhcmVkL2ltcG9ydC51dGlscyc7XHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9zdHlsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R5bGVMaXN0U2VydmljZSB9IGZyb20gJy4uL3N0eWxlLWxpc3Qvc3R5bGUtbGlzdC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWltcG9ydC1leHBvcnQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pbXBvcnQtZXhwb3J0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pbXBvcnQtZXhwb3J0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEltcG9ydEV4cG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyBmb3JtYXRzID0gRXhwb3J0Rm9ybWF0O1xyXG4gIHB1YmxpYyBsYXllcnM6IFZlY3RvckxheWVyW107XHJcbiAgcHVibGljIGlucHV0UHJvajogc3RyaW5nID0gJ0VQU0c6NDMyNic7XHJcbiAgcHVibGljIGxvYWRpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgbGF5ZXJzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBlc3BnQ29kZVJlZ2V4ID0gbmV3IFJlZ0V4cCgnXlxcXFxkezQsNn0nKTtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBpbXBvcnRTZXJ2aWNlOiBJbXBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBleHBvcnRTZXJ2aWNlOiBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZShsYXllcnMgPT4ge1xyXG4gICAgICB0aGlzLmxheWVycyA9IGxheWVycy5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBsYXllciBpbnN0YW5jZW9mIFZlY3RvckxheWVyICYmIGxheWVyLmV4cG9ydGFibGUgPT09IHRydWU7XHJcbiAgICAgIH0pIGFzIFZlY3RvckxheWVyW107XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXllcnMkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgaW1wb3J0RmlsZXMoZmlsZXM6IEZpbGVbXSkge1xyXG4gICAgbGV0IGlucHV0UHJvaiA9IHRoaXMuaW5wdXRQcm9qO1xyXG4gICAgaWYgKHRoaXMuZXNwZ0NvZGVSZWdleC50ZXN0KGlucHV0UHJvaikpIHtcclxuICAgICAgaW5wdXRQcm9qID0gYEVQU0c6JHtpbnB1dFByb2p9YDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcclxuICAgICAgdGhpcy5pbXBvcnRTZXJ2aWNlLmltcG9ydChmaWxlLCBpbnB1dFByb2opLnN1YnNjcmliZShcclxuICAgICAgICAoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4gdGhpcy5vbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGZlYXR1cmVzKSxcclxuICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yKSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUV4cG9ydEZvcm1TdWJtaXQoZGF0YTogRXhwb3J0T3B0aW9ucykge1xyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLm1hcC5nZXRMYXllckJ5SWQoZGF0YS5sYXllcik7XHJcbiAgICBsZXQgb2xGZWF0dXJlcyA9IGxheWVyLmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZXMoKTtcclxuICAgIGlmIChsYXllci5kYXRhU291cmNlIGluc3RhbmNlb2YgQ2x1c3RlckRhdGFTb3VyY2UpIHtcclxuICAgICAgb2xGZWF0dXJlcyA9IG9sRmVhdHVyZXMuZmxhdE1hcCgoY2x1c3RlcjogYW55KSA9PiBjbHVzdGVyLmdldCgnZmVhdHVyZXMnKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmV4cG9ydFNlcnZpY2VcclxuICAgICAgLmV4cG9ydChvbEZlYXR1cmVzLCBkYXRhLmZvcm1hdCwgbGF5ZXIudGl0bGUsIHRoaXMubWFwLnByb2plY3Rpb24pXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge30sXHJcbiAgICAgICAgKGVycm9yOiBFcnJvcikgPT4gdGhpcy5vbkZpbGVFeHBvcnRFcnJvcihlcnJvciksXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRm9ybSgpIHtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBmb3JtYXQ6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgbGF5ZXI6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydFdpdGhTdHlsZScpKSB7XHJcbiAgICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhcclxuICAgICAgZmlsZSxcclxuICAgICAgZmVhdHVyZXMsXHJcbiAgICAgIHRoaXMubWFwLFxyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZVxyXG4gICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKFxyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgZmVhdHVyZXMsXHJcbiAgICAgICAgdGhpcy5tYXAsXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZSxcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZSxcclxuICAgICAgICB0aGlzLnN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgICAgICAgdGhpcy5zdHlsZVNlcnZpY2VcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlSW1wb3J0RXJyb3IoZmlsZTogRmlsZSwgZXJyb3I6IEVycm9yKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKFxyXG4gICAgICBmaWxlLFxyXG4gICAgICBlcnJvcixcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZSxcclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2VcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUV4cG9ydEVycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgIGhhbmRsZUZpbGVFeHBvcnRFcnJvcihlcnJvciwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxufVxyXG4iXX0=