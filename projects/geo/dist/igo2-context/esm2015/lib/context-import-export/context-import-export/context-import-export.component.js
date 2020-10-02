/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ContextImportExportComponent {
    /**
     * @param {?} contextImportService
     * @param {?} contextExportService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} formBuilder
     * @param {?} config
     * @param {?} contextService
     */
    constructor(contextImportService, contextExportService, languageService, messageService, formBuilder, config, contextService) {
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
    ngOnInit() {
        /** @type {?} */
        const configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
        this.fileSizeMb = this.clientSideFileSizeMax / Math.pow(1024, 2);
        this.layerList = this.contextService.getContextLayers(this.map);
    }
    /**
     * @param {?} files
     * @return {?}
     */
    importFiles(files) {
        this.loading$.next(true);
        for (const file of files) {
            this.contextImportService.import(file).subscribe((/**
             * @param {?} context
             * @return {?}
             */
            (context) => this.onFileImportSuccess(file, context)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => this.onFileImportError(file, error)), (/**
             * @return {?}
             */
            () => {
                this.loading$.next(false);
            }));
        }
    }
    /**
     * @param {?} contextOptions
     * @return {?}
     */
    handleExportFormSubmit(contextOptions) {
        this.loading$.next(true);
        this.res = this.contextService.getContextFromLayers(this.map, contextOptions.layers, contextOptions.name);
        this.res.imported = true;
        this.contextExportService
            .export(this.res)
            .subscribe((/**
         * @return {?}
         */
        () => { }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.onFileExportError(error)), (/**
         * @return {?}
         */
        () => {
            this.onFileExportSuccess();
            this.loading$.next(false);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        this.form = this.formBuilder.group({
            layers: ['', [Validators.required]],
            name: ['', [Validators.required]]
        });
    }
    /**
     * @private
     * @param {?} file
     * @param {?} context
     * @return {?}
     */
    onFileImportSuccess(file, context) {
        handleFileImportSuccess(file, context, this.messageService, this.languageService, this.contextService);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    onFileImportError(file, error) {
        this.loading$.next(false);
        handleFileImportError(file, error, this.messageService, this.languageService, this.fileSizeMb);
    }
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    onFileExportError(error) {
        this.loading$.next(false);
        handleFileExportError(error, this.messageService, this.languageService);
    }
    /**
     * @private
     * @return {?}
     */
    onFileExportSuccess() {
        handleFileExportSuccess(this.messageService, this.languageService);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    selectAll(e) {
        if (e._selected) {
            this.form.controls.layers.setValue(this.layerList);
            e._selected = true;
        }
        if (e._selected === false) {
            this.form.controls.layers.setValue([]);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onImportExportChange(event) {
        this.activeImportExport = event.value;
    }
}
ContextImportExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-import-export',
                template: "<div class=\"import-export-toggle mat-typography\">\r\n    <mat-button-toggle-group\r\n          [value]=\"activeImportExport\"\r\n          (change)=\"onImportExportChange($event)\">\r\n          <mat-button-toggle [value]=\"'import'\">\r\n            {{'igo.geo.importExportForm.importTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n          <mat-button-toggle [value]=\"'export'\">\r\n            {{'igo.geo.importExportForm.exportTabTitle' | translate}}\r\n          </mat-button-toggle>\r\n    </mat-button-toggle-group>\r\n</div>\r\n\r\n<div *ngIf=\"activeImportExport === 'import'\">\r\n    <form class=\"igo-form\">\r\n        <div class=\"igo-form-button-group\">\r\n            <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n                {{'igo.geo.importExportForm.importButton' | translate}}\r\n            </button>\r\n            <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n            <input\r\n                #fileInput\r\n                type=\"file\"\r\n                [style.display]=\"'none'\"\r\n                (click)=\"fileInput.value = null\"\r\n                (change)=\"importFiles($event.target.files)\">\r\n        </div>\r\n    </form>\r\n    <section class=\"mat-typography\">\r\n        <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n            <ul>\r\n                <li>{{'igo.geo.importExportForm.importSizeMax' | translate: {size: fileSizeMb} }}</li>\r\n            </ul>\r\n    </section>\r\n</div>\r\n\r\n\r\n<form class=\"igo-form\" *ngIf=\"activeImportExport === 'export'\" [formGroup]=\"form\">\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field class=\"example-full-width\">\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportContextName' | translate}}</mat-label>\r\n            <input formControlName=\"name\" matInput [value]=\"\">\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n            <mat-label>{{'igo.context.contextImportExport.export.exportPlaceHolder' | translate}}</mat-label>\r\n            <mat-select formControlName=\"layers\" multiple>\r\n                <mat-option [value]=\"1\" (click)=\"selectAll(e)\" #e>\r\n                    {{'igo.context.contextImportExport.export.exportSelectAll' | translate}}\r\n                </mat-option>\r\n                <mat-divider></mat-divider>\r\n                <mat-option *ngFor=\"let layer of layerList\" [value]=\"layer\">{{layer.title}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"igo-form-button-group\">\r\n        <button\r\n            mat-raised-button\r\n            type=\"button\"\r\n            [disabled]=\"!form.valid || (loading$ | async)\"\r\n            (click)=\"handleExportFormSubmit(form.value)\">\r\n            {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n    </div>\r\n</form>\r\n",
                styles: [".import-export-toggle{padding:10px;text-align:center}.import-export-toggle mat-button-toggle-group{width:100%}.import-export-toggle mat-button-toggle-group mat-button-toggle{width:50%}.igo-input-container{padding:10px}.igo-input-container mat-form-field{width:100%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}"]
            }] }
];
/** @nocollapse */
ContextImportExportComponent.ctorParameters = () => [
    { type: ContextImportService },
    { type: ContextExportService },
    { type: LanguageService },
    { type: MessageService },
    { type: FormBuilder },
    { type: ConfigService },
    { type: ContextService }
];
ContextImportExportComponent.propDecorators = {
    map: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pbXBvcnQtZXhwb3J0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1pbXBvcnQtZXhwb3J0L2NvbnRleHQtaW1wb3J0LWV4cG9ydC9jb250ZXh0LWltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQWEsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxNQUFNLEVBQXNCLE1BQU0sV0FBVyxDQUFDO0FBRXZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3RCLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBUXhFLE1BQU0sT0FBTyw0QkFBNEI7Ozs7Ozs7Ozs7SUFjdkMsWUFDVSxvQkFBMEMsRUFDMUMsb0JBQTBDLEVBQzFDLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLE1BQXFCLEVBQ3JCLGNBQThCO1FBTjlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7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LENBQUM7U0FDdEI7UUFDRCxJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLEtBQUs7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQzs7O1lBdkhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyx1akdBQXFEOzthQUV0RDs7OztZQVJRLG9CQUFvQjtZQUNwQixvQkFBb0I7WUFYSixlQUFlO1lBQS9CLGNBQWM7WUFISCxXQUFXO1lBR1csYUFBYTtZQVM5QyxjQUFjOzs7a0JBc0JwQixLQUFLOzs7O0lBWE4sNENBQXVCOztJQUN2Qiw4Q0FBNkI7O0lBQzdCLGlEQUF1Qzs7SUFDdkMsZ0RBQTZDOztJQUM3QyxtREFBMkI7O0lBQzNCLGlEQUEwQjs7SUFDMUIsMkNBQTRCOzs7OztJQUM1Qiw2REFBc0M7O0lBQ3RDLGtEQUEwQjs7SUFDMUIsMERBQTZDOztJQUU3QywyQ0FBcUI7Ozs7O0lBR25CLDREQUFrRDs7Ozs7SUFDbEQsNERBQWtEOzs7OztJQUNsRCx1REFBd0M7Ozs7O0lBQ3hDLHNEQUFzQzs7Ozs7SUFDdEMsbURBQWdDOzs7OztJQUNoQyw4Q0FBNkI7Ozs7O0lBQzdCLHNEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwLCBMYXllciwgVmVjdG9yTGF5ZXIgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgaGFuZGxlRmlsZUV4cG9ydEVycm9yIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQtZXhwb3J0LnV0aWxzJztcclxuaW1wb3J0IHtcclxuICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyxcclxuICBoYW5kbGVGaWxlSW1wb3J0RXJyb3JcclxufSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC1pbXBvcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBoYW5kbGVGaWxlRXhwb3J0U3VjY2VzcyB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LWV4cG9ydC51dGlscyc7XHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29udGV4dC1tYW5hZ2VyL3NoYXJlZC9jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0SW1wb3J0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LWltcG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29udGV4dEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC1leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1pbXBvcnQtZXhwb3J0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1pbXBvcnQtZXhwb3J0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb250ZXh0LWltcG9ydC1leHBvcnQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEltcG9ydEV4cG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgbGF5ZXJzOiBWZWN0b3JMYXllcltdO1xyXG4gIHB1YmxpYyBpbnB1dFByb2o6IHN0cmluZyA9ICdFUFNHOjQzMjYnO1xyXG4gIHB1YmxpYyBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG4gIHB1YmxpYyBmb3JjZU5hbWluZyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBsYXllckxpc3Q6IExheWVyW107XHJcbiAgcHVibGljIHJlczogRGV0YWlsZWRDb250ZXh0O1xyXG4gIHByaXZhdGUgY2xpZW50U2lkZUZpbGVTaXplTWF4OiBudW1iZXI7XHJcbiAgcHVibGljIGZpbGVTaXplTWI6IG51bWJlcjtcclxuICBwdWJsaWMgYWN0aXZlSW1wb3J0RXhwb3J0OiBzdHJpbmcgPSAnaW1wb3J0JztcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0SW1wb3J0U2VydmljZTogQ29udGV4dEltcG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbnRleHRFeHBvcnRTZXJ2aWNlOiBDb250ZXh0RXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgY29uZmlnRmlsZVNpemVNYiA9IHRoaXMuY29uZmlnLmdldENvbmZpZyhcclxuICAgICAgJ2ltcG9ydEV4cG9ydC5jbGllbnRTaWRlRmlsZVNpemVNYXhNYidcclxuICAgICk7XHJcbiAgICB0aGlzLmNsaWVudFNpZGVGaWxlU2l6ZU1heCA9XHJcbiAgICAgIChjb25maWdGaWxlU2l6ZU1iID8gY29uZmlnRmlsZVNpemVNYiA6IDMwKSAqIE1hdGgucG93KDEwMjQsIDIpO1xyXG4gICAgdGhpcy5maWxlU2l6ZU1iID0gdGhpcy5jbGllbnRTaWRlRmlsZVNpemVNYXggLyBNYXRoLnBvdygxMDI0LCAyKTtcclxuICAgIHRoaXMubGF5ZXJMaXN0ID0gdGhpcy5jb250ZXh0U2VydmljZS5nZXRDb250ZXh0TGF5ZXJzKHRoaXMubWFwKTtcclxuICB9XHJcblxyXG4gIGltcG9ydEZpbGVzKGZpbGVzOiBGaWxlW10pIHtcclxuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcclxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xyXG4gICAgICB0aGlzLmNvbnRleHRJbXBvcnRTZXJ2aWNlLmltcG9ydChmaWxlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkgPT4gdGhpcy5vbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGNvbnRleHQpLFxyXG4gICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlSW1wb3J0RXJyb3IoZmlsZSwgZXJyb3IpLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXhwb3J0Rm9ybVN1Ym1pdChjb250ZXh0T3B0aW9ucykge1xyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xyXG4gICAgdGhpcy5yZXMgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTGF5ZXJzKHRoaXMubWFwLCBjb250ZXh0T3B0aW9ucy5sYXllcnMsIGNvbnRleHRPcHRpb25zLm5hbWUpO1xyXG4gICAgdGhpcy5yZXMuaW1wb3J0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5jb250ZXh0RXhwb3J0U2VydmljZVxyXG4gICAgICAuZXhwb3J0KHRoaXMucmVzKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHt9LFxyXG4gICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlRXhwb3J0RXJyb3IoZXJyb3IpLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMub25GaWxlRXhwb3J0U3VjY2VzcygpO1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbn1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEZvcm0oKSB7XHJcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICBsYXllcnM6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgICBuYW1lOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGU6IEZpbGUsIGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoXHJcbiAgICBmaWxlLFxyXG4gICAgY29udGV4dCxcclxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UsXHJcbiAgICB0aGlzLmxhbmd1YWdlU2VydmljZSxcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2VcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydEVycm9yKGZpbGU6IEZpbGUsIGVycm9yOiBFcnJvcikge1xyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihcclxuICAgICAgZmlsZSxcclxuICAgICAgZXJyb3IsXHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UsXHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgICB0aGlzLmZpbGVTaXplTWJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUV4cG9ydEVycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgIGhhbmRsZUZpbGVFeHBvcnRFcnJvcihlcnJvciwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVFeHBvcnRTdWNjZXNzKCkge1xyXG4gICAgaGFuZGxlRmlsZUV4cG9ydFN1Y2Nlc3ModGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0QWxsKGUpIHtcclxuICAgIGlmIChlLl9zZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5sYXllcnMuc2V0VmFsdWUodGhpcy5sYXllckxpc3QpO1xyXG4gICAgICAgIGUuX3NlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChlLl9zZWxlY3RlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGF5ZXJzLnNldFZhbHVlKFtdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uSW1wb3J0RXhwb3J0Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmFjdGl2ZUltcG9ydEV4cG9ydCA9IGV2ZW50LnZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=