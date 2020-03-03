/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ImportExportComponent {
    /**
     * @param {?} importService
     * @param {?} exportService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} styleListService
     * @param {?} styleService
     * @param {?} formBuilder
     * @param {?} config
     */
    constructor(importService, exportService, languageService, messageService, styleListService, styleService, formBuilder, config) {
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
    ngOnInit() {
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        layers => {
            this.layers = (/** @type {?} */ (layers.filter((/**
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
        /** @type {?} */
        let inputProj = this.inputProj;
        if (this.espgCodeRegex.test(inputProj)) {
            inputProj = `EPSG:${inputProj}`;
        }
        this.loading$.next(true);
        for (const file of files) {
            this.importService.import(file, inputProj).subscribe((/**
             * @param {?} features
             * @return {?}
             */
            (features) => this.onFileImportSuccess(file, features)), (/**
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
     * @param {?} data
     * @return {?}
     */
    handleExportFormSubmit(data) {
        this.loading$.next(true);
        /** @type {?} */
        const layer = this.map.getLayerById(data.layer);
        /** @type {?} */
        let olFeatures = layer.dataSource.ol.getFeatures();
        if (layer.dataSource instanceof ClusterDataSource) {
            olFeatures = olFeatures.flatMap((/**
             * @param {?} cluster
             * @return {?}
             */
            (cluster) => cluster.get('features')));
        }
        this.exportService
            .export(olFeatures, data.format, layer.title, this.map.projection)
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
            this.loading$.next(false);
        }));
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
        if (!this.config.getConfig('importWithStyle')) {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
        }
        else {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService, this.styleListService, this.styleService);
        }
    }
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    onFileImportError(file, error) {
        this.loading$.next(false);
        handleFileImportError(file, error, this.messageService, this.languageService);
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
}
ImportExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-import-export',
                template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.importTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\">\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <input\r\n            matInput\r\n            placeholder=\"{{'igo.geo.importExportForm.importProjPlaceholder' | translate}}\"\r\n            name=\"inputProj\"\r\n            [(ngModel)]=\"inputProj\">\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n          {{'igo.geo.importExportForm.importButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n        <input\r\n          #fileInput\r\n          type=\"file\"\r\n          [style.display]=\"'none'\"\r\n          (click)=\"fileInput.value = null\"\r\n          (change)=\"importFiles($event.target.files)\">\r\n      </div>\r\n    </form>\r\n    <section class=\"mat-typography\">\r\n    <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n    <ul>\r\n      <li>{{'igo.geo.importExportForm.importSizeMax' | translate}}</li>\r\n      <li>{{'igo.geo.importExportForm.importShpZip' | translate}}</li>\r\n    </ul>\r\n  </section>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.exportTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\" [formGroup]=\"form\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"layer\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportLayerPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let layer of layers\" [value]=\"layer.id\">\r\n              {{layer.title}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"format\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportFormatPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let format of formats | keyvalue \" [value]=\"format.key\">\r\n              {{format.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button\r\n          mat-raised-button\r\n          type=\"button\"\r\n          [disabled]=\"!form.valid || (loading$ | async)\"\r\n          (click)=\"handleExportFormSubmit(form.value)\">\r\n          {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n        <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n      </div>\r\n\r\n    </form>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                styles: ["mat-form-field{width:100%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}"]
            }] }
];
/** @nocollapse */
ImportExportComponent.ctorParameters = () => [
    { type: ImportService },
    { type: ExportService },
    { type: LanguageService },
    { type: MessageService },
    { type: StyleListService },
    { type: StyleService },
    { type: FormBuilder },
    { type: ConfigService }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFhLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHNUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRTNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQU9wRSxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7Ozs7OztJQWFoQyxZQUNVLGFBQTRCLEVBQzVCLGFBQTRC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VSxFQUFFLEtBQVk7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIscUJBQXFCLENBQ25CLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxDQUFDLGNBQWMsRUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FDckIsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLGlCQUFpQixDQUFDLEtBQVk7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQXpIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsbzRGQUE2Qzs7YUFFOUM7Ozs7WUFaUSxhQUFhO1lBRGIsYUFBYTtZQVhHLGVBQWU7WUFBL0IsY0FBYztZQWtCZCxnQkFBZ0I7WUFEaEIsWUFBWTtZQXBCRCxXQUFXO1lBR1csYUFBYTs7O2tCQW9DcEQsS0FBSzs7OztJQVZOLHFDQUF1Qjs7SUFDdkIsd0NBQThCOztJQUM5Qix1Q0FBNkI7O0lBQzdCLDBDQUF1Qzs7SUFDdkMseUNBQTZDOzs7OztJQUU3Qyx5Q0FBK0I7Ozs7O0lBRS9CLDhDQUFnRDs7SUFFaEQsb0NBQXFCOzs7OztJQUduQiw4Q0FBb0M7Ozs7O0lBQ3BDLDhDQUFvQzs7Ozs7SUFDcEMsZ0RBQXdDOzs7OztJQUN4QywrQ0FBc0M7Ozs7O0lBQ3RDLGlEQUEwQzs7Ozs7SUFDMUMsNkNBQWtDOzs7OztJQUNsQyw0Q0FBZ0M7Ozs7O0lBQ2hDLHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBDbHVzdGVyRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xyXG5cclxuaW1wb3J0IHsgaGFuZGxlRmlsZUV4cG9ydEVycm9yIH0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC51dGlscyc7XHJcbmltcG9ydCB7IEV4cG9ydE9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEV4cG9ydEZvcm1hdCB9IGZyb20gJy4uL3NoYXJlZC9leHBvcnQudHlwZSc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2ltcG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyxcclxuICBoYW5kbGVGaWxlSW1wb3J0RXJyb3JcclxufSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnV0aWxzJztcclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHlsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtbGlzdC9zdHlsZS1saXN0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28taW1wb3J0LWV4cG9ydCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ltcG9ydC1leHBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1wb3J0RXhwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIGZvcm1hdHMgPSBFeHBvcnRGb3JtYXQ7XHJcbiAgcHVibGljIGxheWVyczogVmVjdG9yTGF5ZXJbXTtcclxuICBwdWJsaWMgaW5wdXRQcm9qOiBzdHJpbmcgPSAnRVBTRzo0MzI2JztcclxuICBwdWJsaWMgbG9hZGluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcnMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIGVzcGdDb2RlUmVnZXggPSBuZXcgUmVnRXhwKCdeXFxcXGR7NCw2fScpO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGltcG9ydFNlcnZpY2U6IEltcG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGV4cG9ydFNlcnZpY2U6IEV4cG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN0eWxlTGlzdFNlcnZpY2U6IFN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN0eWxlU2VydmljZTogU3R5bGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5sYXllcnMkJCA9IHRoaXMubWFwLmxheWVycyQuc3Vic2NyaWJlKGxheWVycyA9PiB7XHJcbiAgICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGxheWVyIGluc3RhbmNlb2YgVmVjdG9yTGF5ZXIgJiYgbGF5ZXIuZXhwb3J0YWJsZSA9PT0gdHJ1ZTtcclxuICAgICAgfSkgYXMgVmVjdG9yTGF5ZXJbXTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxheWVycyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBpbXBvcnRGaWxlcyhmaWxlczogRmlsZVtdKSB7XHJcbiAgICBsZXQgaW5wdXRQcm9qID0gdGhpcy5pbnB1dFByb2o7XHJcbiAgICBpZiAodGhpcy5lc3BnQ29kZVJlZ2V4LnRlc3QoaW5wdXRQcm9qKSkge1xyXG4gICAgICBpbnB1dFByb2ogPSBgRVBTRzoke2lucHV0UHJvan1gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcclxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xyXG4gICAgICB0aGlzLmltcG9ydFNlcnZpY2UuaW1wb3J0KGZpbGUsIGlucHV0UHJvaikuc3Vic2NyaWJlKFxyXG4gICAgICAgIChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB0aGlzLm9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMpLFxyXG4gICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlSW1wb3J0RXJyb3IoZmlsZSwgZXJyb3IpLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXhwb3J0Rm9ybVN1Ym1pdChkYXRhOiBFeHBvcnRPcHRpb25zKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChkYXRhLmxheWVyKTtcclxuICAgIGxldCBvbEZlYXR1cmVzID0gbGF5ZXIuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlcygpO1xyXG4gICAgaWYgKGxheWVyLmRhdGFTb3VyY2UgaW5zdGFuY2VvZiBDbHVzdGVyRGF0YVNvdXJjZSkge1xyXG4gICAgICBvbEZlYXR1cmVzID0gb2xGZWF0dXJlcy5mbGF0TWFwKChjbHVzdGVyOiBhbnkpID0+IGNsdXN0ZXIuZ2V0KCdmZWF0dXJlcycpKTtcclxuICAgIH1cclxuICAgIHRoaXMuZXhwb3J0U2VydmljZVxyXG4gICAgICAuZXhwb3J0KG9sRmVhdHVyZXMsIGRhdGEuZm9ybWF0LCBsYXllci50aXRsZSwgdGhpcy5tYXAucHJvamVjdGlvbilcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7fSxcclxuICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUV4cG9ydEVycm9yKGVycm9yKSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRGb3JtKCkge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIGZvcm1hdDogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICBsYXllcjogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlOiBGaWxlLCBmZWF0dXJlczogRmVhdHVyZVtdKSB7XHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0V2l0aFN0eWxlJykpIHtcclxuICAgIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKFxyXG4gICAgICBmaWxlLFxyXG4gICAgICBmZWF0dXJlcyxcclxuICAgICAgdGhpcy5tYXAsXHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UsXHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoXHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBmZWF0dXJlcyxcclxuICAgICAgICB0aGlzLm1hcCxcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHRoaXMuc3R5bGVMaXN0U2VydmljZSxcclxuICAgICAgICB0aGlzLnN0eWxlU2VydmljZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRFcnJvcihmaWxlOiBGaWxlLCBlcnJvcjogRXJyb3IpIHtcclxuICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICBoYW5kbGVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgICAgIGZpbGUsXHJcbiAgICAgIGVycm9yLFxyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlRXhwb3J0RXJyb3IoZXJyb3I6IEVycm9yKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgaGFuZGxlRmlsZUV4cG9ydEVycm9yKGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==