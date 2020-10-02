/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MessageService, LanguageService, ConfigService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { handleFileExportError } from '../shared/context-export.utils';
import { handleFileImportSuccess, handleFileImportError } from '../shared/context-import.utils';
import { handleFileExportSuccess } from '../shared/context-export.utils';
import { ContextService } from '../../context-manager/shared/context.service';
import { ContextImportService } from '../shared/context-import.service';
import { ContextExportService } from '../shared/context-export.service';
var ContextImportExportComponent = /** @class */ (function () {
    function ContextImportExportComponent(contextImportService, contextExportService, languageService, messageService, formBuilder, config, contextService) {
        this.contextImportService = contextImportService;
        this.contextExportService = contextExportService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.formBuilder = formBuilder;
        this.config = config;
        this.contextService = contextService;
        this.inputProj = 'EPSG:4326';
        this.loading$ = new BehaviorSubject(false);
        this.forceNaming = false;
        this.activeImportExport = 'import';
        this.buildForm();
    }
    /**
     * @return {?}
     */
    ContextImportExportComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
        this.fileSizeMb = this.clientSideFileSizeMax / Math.pow(1024, 2);
        this.layerList = this.contextService.getContextLayers(this.map);
    };
    /**
     * @param {?} files
     * @return {?}
     */
    ContextImportExportComponent.prototype.importFiles = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        var _this = this;
        var e_1, _a;
        this.loading$.next(true);
        var _loop_1 = function (file) {
            this_1.contextImportService.import(file).subscribe((/**
             * @param {?} context
             * @return {?}
             */
            function (context) { return _this.onFileImportSuccess(file, context); }), (/**
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
     * @param {?} contextOptions
     * @return {?}
     */
    ContextImportExportComponent.prototype.handleExportFormSubmit = /**
     * @param {?} contextOptions
     * @return {?}
     */
    function (contextOptions) {
        var _this = this;
        this.loading$.next(true);
        this.res = this.contextService.getContextFromLayers(this.map, contextOptions.layers, contextOptions.name);
        this.res.imported = true;
        this.contextExportService
            .export(this.res)
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
            _this.onFileExportSuccess();
            _this.loading$.next(false);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    ContextImportExportComponent.prototype.buildForm = /**
     * @private
     * @return {?}
     */
    function () {
        this.form = this.formBuilder.group({
            layers: ['', [Validators.required]],
            name: ['', [Validators.required]]
        });
    };
    /**
     * @private
     * @param {?} file
     * @param {?} context
     * @return {?}
     */
    ContextImportExportComponent.prototype.onFileImportSuccess = /**
     * @private
     * @param {?} file
     * @param {?} context
     * @return {?}
     */
    function (file, context) {
        handleFileImportSuccess(file, context, this.messageService, this.languageService, this.contextService);
    };
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    ContextImportExportComponent.prototype.onFileImportError = /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    function (file, error) {
        this.loading$.next(false);
        handleFileImportError(file, error, this.messageService, this.languageService, this.fileSizeMb);
    };
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    ContextImportExportComponent.prototype.onFileExportError = /**
     * @private
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.loading$.next(false);
        handleFileExportError(error, this.messageService, this.languageService);
    };
    /**
     * @private
     * @return {?}
     */
    ContextImportExportComponent.prototype.onFileExportSuccess = /**
     * @private
     * @return {?}
     */
    function () {
        handleFileExportSuccess(this.messageService, this.languageService);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ContextImportExportComponent.prototype.selectAll = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e._selected) {
            this.form.controls.layers.setValue(this.layerList);
            e._selected = true;
        }
        if (e._selected === false) {
            this.form.controls.layers.setValue([]);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ContextImportExportComponent.prototype.onImportExportChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.activeImportExport = event.value;
    };
    ContextImportExportComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-import-export',
                    template: "<div class=\"import-export-toggle mat-typography\">\r\n    <mat-button-toggle-group\r\n          [value]=\"activeImportExport\"\r\n          (change)=\"onImportExportChange($event)\">\r\n          <mat-button-toggle [value]=\"'import'\">\r\n            {{'igo.geo.importExportForm.importTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n          <mat-button-toggle [value]=\"'export'\">\r\n            {{'igo.geo.importExportForm.exportTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n    </mat-button-toggle-group>\r\n</div>\r\n\r\n<div *ngIf=\"activeImportExport === 'import'\">\r\n    <form class=\"igo-form\">\r\n        <div class=\"igo-form-button-group\">\r\n            <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n                {{'igo.geo.importExportForm.importButton' | translate}}\r\n            </button>\r\n            <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n            <input\r\n                #fileInput\r\n                type=\"file\"\r\n                [style.display]=\"'none'\"\r\n                (click)=\"fileInput.value = null\"\r\n                (change)=\"importFiles($event.target.files)\">\r\n        </div>\r\n    </form>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n            <ul>\r\n                <li>{{'igo.geo.importExportForm.importSizeMax' | translate: {size: fileSizeMb} }}</li>\r\n            </ul>\r\n    </section>\r\n</div>\r\n\r\n\r\n<form class=\"igo-form\" *ngIf=\"activeImportExport === 'export'\" [formGroup]=\"form\">\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportContextName' | translate}}</mat-label>\r\n            <input formControlName=\"name\" matInput [value]=\"\">\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportPlaceHolder' | translate}}</mat-label>\r\n            <mat-select formControlName=\"layers\" multiple>\r\n                <mat-option [value]=\"1\" (click)=\"selectAll(e)\" #e>\r\n                    {{'igo.context.contextImportExport.export.exportSelectAll' | translate}}\r\n                </mat-option>\r\n                <mat-divider></mat-divider>\r\n                <mat-option *ngFor=\"let layer of layerList\" [value]=\"layer\">{{layer.title}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-form-button-group\">\r\n        <button\r\n            mat-raised-button\r\n            type=\"button\"\r\n            [disabled]=\"!form.valid || (loading$ | async)\"\r\n            (click)=\"handleExportFormSubmit(form.value)\">\r\n            {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n    </div>\r\n</form>\r\n",
                    styles: [".import-export-toggle{padding:10px;text-align:center}.import-export-toggle mat-button-toggle-group{width:100%}.import-export-toggle mat-button-toggle-group mat-button-toggle{width:50%}.igo-input-container{padding:10px}.igo-input-container mat-form-field{width:100%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}"]
                }] }
    ];
    /** @nocollapse */
    ContextImportExportComponent.ctorParameters = function () { return [
        { type: ContextImportService },
        { type: ContextExportService },
        { type: LanguageService },
        { type: MessageService },
        { type: FormBuilder },
        { type: ConfigService },
        { type: ContextService }
    ]; };
    ContextImportExportComponent.propDecorators = {
        map: [{ type: Input }]
    };
    return ContextImportExportComponent;
}());
export { ContextImportExportComponent };
if (false) {
    /** @type {?} */
    ContextImportExportComponent.prototype.form;
    /** @type {?} */
    ContextImportExportComponent.prototype.layers;
    /** @type {?} */
    ContextImportExportComponent.prototype.inputProj;
    /** @type {?} */
    ContextImportExportComponent.prototype.loading$;
    /** @type {?} */
    ContextImportExportComponent.prototype.forceNaming;
    /** @type {?} */
    ContextImportExportComponent.prototype.layerList;
    /** @type {?} */
    ContextImportExportComponent.prototype.res;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.clientSideFileSizeMax;
    /** @type {?} */
    ContextImportExportComponent.prototype.fileSizeMb;
    /** @type {?} */
    ContextImportExportComponent.prototype.activeImportExport;
    /** @type {?} */
    ContextImportExportComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.contextImportService;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.contextExportService;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.formBuilder;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ContextImportExportComponent.prototype.contextService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pbXBvcnQtZXhwb3J0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1pbXBvcnQtZXhwb3J0L2NvbnRleHQtaW1wb3J0LWV4cG9ydC9jb250ZXh0LWltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFhLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFzQixNQUFNLFdBQVcsQ0FBQztBQUV2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUN0QixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUd4RTtJQW1CRSxzQ0FDVSxvQkFBMEMsRUFDMUMsb0JBQTBDLEVBQzFDLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLE1BQXFCLEVBQ3JCLGNBQThCO1FBTjlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMseUJBQW9CLEdBQXBCLG9CQUFv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dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29NYXAsIExheWVyLCBWZWN0b3JMYXllciB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBoYW5kbGVGaWxlRXhwb3J0RXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC1leHBvcnQudXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzLFxyXG4gIGhhbmRsZUZpbGVJbXBvcnRFcnJvclxyXG59IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LWltcG9ydC51dGlscyc7XHJcbmltcG9ydCB7IGhhbmRsZUZpbGVFeHBvcnRTdWNjZXNzIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQtZXhwb3J0LnV0aWxzJztcclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRleHRJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQtaW1wb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0RXhwb3J0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LWV4cG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGV0YWlsZWRDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC1tYW5hZ2VyL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jb250ZXh0LWltcG9ydC1leHBvcnQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZXh0LWltcG9ydC1leHBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbnRleHQtaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0SW1wb3J0RXhwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyBsYXllcnM6IFZlY3RvckxheWVyW107XHJcbiAgcHVibGljIGlucHV0UHJvajogc3RyaW5nID0gJ0VQU0c6NDMyNic7XHJcbiAgcHVibGljIGxvYWRpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcbiAgcHVibGljIGZvcmNlTmFtaW5nID0gZmFsc2U7XHJcbiAgcHVibGljIGxheWVyTGlzdDogTGF5ZXJbXTtcclxuICBwdWJsaWMgcmVzOiBEZXRhaWxlZENvbnRleHQ7XHJcbiAgcHJpdmF0ZSBjbGllbnRTaWRlRmlsZVNpemVNYXg6IG51bWJlcjtcclxuICBwdWJsaWMgZmlsZVNpemVNYjogbnVtYmVyO1xyXG4gIHB1YmxpYyBhY3RpdmVJbXBvcnRFeHBvcnQ6IHN0cmluZyA9ICdpbXBvcnQnO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbnRleHRJbXBvcnRTZXJ2aWNlOiBDb250ZXh0SW1wb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgY29udGV4dEV4cG9ydFNlcnZpY2U6IENvbnRleHRFeHBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmJ1aWxkRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjb25maWdGaWxlU2l6ZU1iID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKFxyXG4gICAgICAnaW1wb3J0RXhwb3J0LmNsaWVudFNpZGVGaWxlU2l6ZU1heE1iJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuY2xpZW50U2lkZUZpbGVTaXplTWF4ID1cclxuICAgICAgKGNvbmZpZ0ZpbGVTaXplTWIgPyBjb25maWdGaWxlU2l6ZU1iIDogMzApICogTWF0aC5wb3coMTAyNCwgMik7XHJcbiAgICB0aGlzLmZpbGVTaXplTWIgPSB0aGlzLmNsaWVudFNpZGVGaWxlU2l6ZU1heCAvIE1hdGgucG93KDEwMjQsIDIpO1xyXG4gICAgdGhpcy5sYXllckxpc3QgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRMYXllcnModGhpcy5tYXApO1xyXG4gIH1cclxuXHJcbiAgaW1wb3J0RmlsZXMoZmlsZXM6IEZpbGVbXSkge1xyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgIHRoaXMuY29udGV4dEltcG9ydFNlcnZpY2UuaW1wb3J0KGZpbGUpLnN1YnNjcmliZShcclxuICAgICAgICAoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSA9PiB0aGlzLm9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgY29udGV4dCksXHJcbiAgICAgICAgKGVycm9yOiBFcnJvcikgPT4gdGhpcy5vbkZpbGVJbXBvcnRFcnJvcihmaWxlLCBlcnJvciksXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFeHBvcnRGb3JtU3VibWl0KGNvbnRleHRPcHRpb25zKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XHJcbiAgICB0aGlzLnJlcyA9IHRoaXMuY29udGV4dFNlcnZpY2UuZ2V0Q29udGV4dEZyb21MYXllcnModGhpcy5tYXAsIGNvbnRleHRPcHRpb25zLmxheWVycywgY29udGV4dE9wdGlvbnMubmFtZSk7XHJcbiAgICB0aGlzLnJlcy5pbXBvcnRlZCA9IHRydWU7XHJcbiAgICB0aGlzLmNvbnRleHRFeHBvcnRTZXJ2aWNlXHJcbiAgICAgIC5leHBvcnQodGhpcy5yZXMpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge30sXHJcbiAgICAgICAgKGVycm9yOiBFcnJvcikgPT4gdGhpcy5vbkZpbGVFeHBvcnRFcnJvcihlcnJvciksXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vbkZpbGVFeHBvcnRTdWNjZXNzKCk7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxufVxyXG5cclxuICBwcml2YXRlIGJ1aWxkRm9ybSgpIHtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgIGxheWVyczogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgIG5hbWU6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhcclxuICAgIGZpbGUsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgdGhpcy5tZXNzYWdlU2VydmljZSxcclxuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlSW1wb3J0RXJyb3IoZmlsZTogRmlsZSwgZXJyb3I6IEVycm9yKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKFxyXG4gICAgICBmaWxlLFxyXG4gICAgICBlcnJvcixcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZSxcclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UsXHJcbiAgICAgIHRoaXMuZmlsZVNpemVNYlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlRXhwb3J0RXJyb3IoZXJyb3I6IEVycm9yKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgaGFuZGxlRmlsZUV4cG9ydEVycm9yKGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUV4cG9ydFN1Y2Nlc3MoKSB7XHJcbiAgICBoYW5kbGVGaWxlRXhwb3J0U3VjY2Vzcyh0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RBbGwoZSkge1xyXG4gICAgaWYgKGUuX3NlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxheWVycy5zZXRWYWx1ZSh0aGlzLmxheWVyTGlzdCk7XHJcbiAgICAgICAgZS5fc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGUuX3NlbGVjdGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5sYXllcnMuc2V0VmFsdWUoW10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25JbXBvcnRFeHBvcnRDaGFuZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMuYWN0aXZlSW1wb3J0RXhwb3J0ID0gZXZlbnQudmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==