/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MessageService, LanguageService, ConfigService } from '@igo2/core';
import { strEnum } from '@igo2/utils';
import { IgoMap } from '../../map/shared/map';
import { ClusterDataSource } from '../../datasource/shared/datasources/cluster-datasource';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { handleFileExportError, handleFileExportSuccess } from '../shared/export.utils';
import { ExportFormat } from '../shared/export.type';
import { ExportService } from '../shared/export.service';
import { ImportService } from '../shared/import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
import { StyleService } from '../../layer/shared/style.service';
import { StyleListService } from '../style-list/style-list.service';
import { skipWhile } from 'rxjs/operators';
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
        this.formats$ = new BehaviorSubject(undefined);
        this.exportableLayers$ = new BehaviorSubject([]);
        this.inputProj = 'EPSG:4326';
        this.loading$ = new BehaviorSubject(false);
        this.forceNaming = false;
        this.espgCodeRegex = new RegExp('^\\d{4,6}');
        this.activeImportExport = 'import';
        this.previousLayerSpecs$ = new BehaviorSubject(undefined);
        this.selectedIndex = 0;
        this.selectedTabIndex = new EventEmitter();
        this.exportOptions$ = new BehaviorSubject(undefined);
        this.exportOptionsChange = new EventEmitter();
        this.loadConfig();
        this.buildForm();
        console.log(this);
        console.log(this.form);
        console.log(this.form);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            this.exportableLayers$.next((/** @type {?} */ (layers.filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                return ((layer instanceof VectorLayer && layer.exportable === true) ||
                    (layer.dataSource.options.download &&
                        layer.dataSource.options.download.url));
            })))));
        }));
        /** @type {?} */
        const configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
        this.fileSizeMb = this.clientSideFileSizeMax / Math.pow(1024, 2);
        this.exportOptions$$ = this.exportOptions$
            .pipe(skipWhile((/**
         * @param {?} exportOptions
         * @return {?}
         */
        (exportOptions) => !exportOptions)))
            .subscribe((/**
         * @param {?} exportOptions
         * @return {?}
         */
        (exportOptions) => {
            this.form.patchValue(exportOptions, { emitEvent: true });
            if (exportOptions.layer) {
                this.computeFormats(exportOptions.layer.map((/**
                 * @param {?} l
                 * @return {?}
                 */
                (l) => this.map.getLayerById(l))));
            }
        }));
        this.formLayer$$ = this.form
            .get('layer')
            .valueChanges.subscribe((/**
         * @param {?} layerId
         * @return {?}
         */
        (layerId) => {
            this.handlePreviousLayerSpecs();
            /** @type {?} */
            const layers = layerId.map((/**
             * @param {?} l
             * @return {?}
             */
            (l) => this.map.getLayerById(l)));
            this.computeFormats(layers);
            if (Object.keys(this.formats$.value).indexOf(this.form.value.format) ===
                -1) {
                this.form.patchValue({ format: undefined });
            }
            this.loading$.next(true);
            /** @type {?} */
            const previousSpecs = [];
            layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                if (layer instanceof VectorLayer &&
                    layer.dataSource.ol.getFeatures().length === 0) {
                    previousSpecs.push({
                        id: layer.id,
                        visible: layer.visible,
                        opacity: layer.opacity,
                        queryable: ((/** @type {?} */ (layer))).queryable
                    });
                    layer.opacity = 0;
                    layer.visible = true;
                }
            }));
            this.previousLayerSpecs$.next(previousSpecs);
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.loading$.next(false);
            }), 500);
        }));
        this.formats$$ = this.formats$
            .pipe(skipWhile((/**
         * @param {?} formats
         * @return {?}
         */
        (formats) => !formats)))
            .subscribe((/**
         * @param {?} formats
         * @return {?}
         */
        (formats) => {
            if (Object.keys(formats).length === 1) {
                this.form.patchValue({ format: formats[Object.keys(formats)[0]] });
            }
        }));
        this.exportableLayers$$ = this.exportableLayers$
            .pipe(skipWhile((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => !layers)))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            if (layers.length === 1) {
                this.form.patchValue({ layer: layers[0].id });
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
        this.exportableLayers$$.unsubscribe();
        this.formats$$.unsubscribe();
        this.formLayer$$.unsubscribe();
        if (this.exportOptions$$) {
            this.exportOptions$$.unsubscribe();
        }
        this.exportOptionsChange.emit(this.form.value);
        this.handlePreviousLayerSpecs();
    }
    /**
     * @private
     * @return {?}
     */
    handlePreviousLayerSpecs() {
        /** @type {?} */
        const previousSpecs = this.previousLayerSpecs$.value;
        if (previousSpecs && previousSpecs.length) {
            previousSpecs.forEach((/**
             * @param {?} specs
             * @return {?}
             */
            (specs) => {
                /** @type {?} */
                const previousLayer = this.map.getLayerById(specs.id);
                previousLayer.visible = specs.visible;
                previousLayer.opacity = specs.opacity;
                ((/** @type {?} */ (previousLayer))).queryable = specs.queryable;
            }));
        }
        this.previousLayerSpecs$.next(undefined);
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
        data.layer.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            /** @type {?} */
            const lay = this.map.getLayerById(layer);
            /** @type {?} */
            let filename = lay.title;
            if (data.name !== undefined) {
                filename = data.name;
            }
            /** @type {?} */
            const dSOptions = lay.dataSource.options;
            if (data.format === ExportFormat.URL &&
                dSOptions.download &&
                dSOptions.download.url) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    // better look an feel
                    window.open(dSOptions.download.url, '_blank');
                    this.loading$.next(false);
                }), 500);
                return;
            }
            /** @type {?} */
            let olFeatures;
            if (data.featureInMapExtent) {
                olFeatures = lay.dataSource.ol.getFeaturesInExtent(lay.map.viewController.getExtent());
            }
            else {
                olFeatures = lay.dataSource.ol.getFeatures();
            }
            if (lay.dataSource instanceof ClusterDataSource) {
                olFeatures = olFeatures.flatMap((/**
                 * @param {?} cluster
                 * @return {?}
                 */
                (cluster) => cluster.get('features')));
            }
            this.exportService
                .export(olFeatures, data.format, filename, this.map.projection)
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
        }));
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        if (this.forceNaming) {
            this.form = this.formBuilder.group({
                format: ['', [Validators.required]],
                layer: ['', [Validators.required]],
                featureInMapExtent: [false, [Validators.required]],
                name: ['', [Validators.required]]
            });
        }
        else {
            this.form = this.formBuilder.group({
                format: ['', [Validators.required]],
                layer: ['', [Validators.required]],
                featureInMapExtent: [false, [Validators.required]]
            });
        }
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
    loadConfig() {
        if (this.config.getConfig('importExport.forceNaming') !== undefined) {
            this.forceNaming = this.config.getConfig('importExport.forceNaming');
        }
        this.computeFormats();
    }
    /**
     * @private
     * @param {?=} layers
     * @return {?}
     */
    computeFormats(layers) {
        if (layers && layers.length) {
            /** @type {?} */
            const formatsType = {
                onlyUrl: false,
                onlyVector: false,
                vectorAndUrl: false
            };
            layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                if (!layer) {
                    return;
                }
                if (!(layer instanceof VectorLayer) &&
                    layer.dataSource.options.download &&
                    layer.dataSource.options.download.url) {
                    formatsType.onlyUrl = true;
                }
                else if (layer.dataSource.options.download &&
                    layer.dataSource.options.download.url) {
                    formatsType.vectorAndUrl = true;
                }
                else if (layer instanceof VectorLayer) {
                    formatsType.onlyVector = true;
                }
            }));
            if (formatsType.onlyUrl === true && formatsType.onlyVector === false) {
                this.formats$.next(strEnum(['URL']));
            }
            else if (formatsType.onlyVector === true &&
                formatsType.onlyUrl === false) {
                this.computeFormats(); // reset
                if (ExportFormat.URL in this.formats$.value) {
                    /** @type {?} */
                    const keys = Object.keys(this.formats$.value).filter((/**
                     * @param {?} key
                     * @return {?}
                     */
                    (key) => key !== 'URL'));
                    this.formats$.next(strEnum(keys));
                }
            }
            else if (formatsType.vectorAndUrl === true &&
                formatsType.onlyUrl === false &&
                formatsType.onlyVector === false) {
                this.computeFormats(); // reset
                if (!(ExportFormat.URL in this.formats$.value)) {
                    /** @type {?} */
                    const keys = Object.keys(this.formats$.value);
                    keys.push('URL');
                    this.formats$.next(strEnum(keys));
                }
            }
            else {
                this.formats$.next([]);
                this.messageService.alert(this.languageService.translate.instant('igo.geo.export.noFormat.text'), this.languageService.translate.instant('igo.geo.export.noFormat.title'));
            }
            return;
        }
        if (this.config.getConfig('importExport.formats') !== undefined) {
            /** @type {?} */
            const validatedListFormat = this.validateListFormat(this.config.getConfig('importExport.formats'));
            this.formats$.next(strEnum(validatedListFormat));
        }
        else {
            this.formats$.next(ExportFormat);
        }
    }
    /**
     * @private
     * @param {?} formats
     * @return {?}
     */
    validateListFormat(formats) {
        return formats
            .filter((/**
         * @param {?} format
         * @return {?}
         */
        (format) => {
            if (format.toUpperCase() === ExportFormat.CSVcomma.toUpperCase() ||
                format.toUpperCase() === ExportFormat.CSVsemicolon.toUpperCase() ||
                format.toUpperCase() === ExportFormat.GML.toUpperCase() ||
                format.toUpperCase() === ExportFormat.GPX.toUpperCase() ||
                format.toUpperCase() === ExportFormat.GeoJSON.toUpperCase() ||
                format.toUpperCase() === ExportFormat.KML.toUpperCase() ||
                format.toUpperCase() === ExportFormat.Shapefile.toUpperCase() ||
                format.toUpperCase() === ExportFormat.URL.toUpperCase()) {
                return format;
            }
        }))
            .map((/**
         * @param {?} format
         * @return {?}
         */
        (format) => {
            if (format.toUpperCase() === ExportFormat.CSVcomma.toUpperCase()) {
                format = ExportFormat.CSVcomma;
                return format;
            }
            if (format.toUpperCase() === ExportFormat.CSVsemicolon.toUpperCase()) {
                format = ExportFormat.CSVsemicolon;
                return format;
            }
            if (format.toUpperCase() === ExportFormat.GML.toUpperCase()) {
                format = ExportFormat.GML;
                return format;
            }
            if (format.toUpperCase() === ExportFormat.GPX.toUpperCase()) {
                format = ExportFormat.GPX;
                return format;
            }
            if (format.toUpperCase() === ExportFormat.GeoJSON.toUpperCase()) {
                format = ExportFormat.GeoJSON;
                return format;
            }
            if (format.toUpperCase() === ExportFormat.KML.toUpperCase()) {
                format = ExportFormat.KML;
                return format;
            }
            if (format.toUpperCase() === ExportFormat.Shapefile.toUpperCase()) {
                format = ExportFormat.Shapefile;
                return format;
            }
            if (format.toUpperCase() === ExportFormat.URL.toUpperCase()) {
                format = ExportFormat.URL;
                return format;
            }
        }));
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    tabChanged(tab) {
        this.selectedTabIndex.emit(tab.index);
    }
    /**
     * @private
     * @return {?}
     */
    onFileExportSuccess() {
        handleFileExportSuccess(this.messageService, this.languageService);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onImportExportChange(event) {
        this.activeImportExport = event.value;
    }
}
ImportExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-import-export',
                template: "<div class=\"import-export-toggle mat-typography\">\r\n  <mat-button-toggle-group\r\n        [value]=\"activeImportExport\"\r\n        (change)=\"onImportExportChange($event)\">\r\n        <mat-button-toggle [value]=\"'import'\">\r\n          {{'igo.geo.importExportForm.importTabTitle' | translate}}\r\n        </mat-button-toggle>\r\n        <mat-button-toggle [value]=\"'export'\">\r\n          {{'igo.geo.importExportForm.exportTabTitle' | translate}}\r\n        </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</div>\r\n\r\n<form class=\"igo-form\" *ngIf=\"activeImportExport === 'import'\">\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        placeholder=\"{{'igo.geo.importExportForm.importProjPlaceholder' | translate}}\"\r\n        name=\"inputProj\"\r\n        [(ngModel)]=\"inputProj\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n      {{'igo.geo.importExportForm.importButton' | translate}}\r\n    </button>\r\n    <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n    <input\r\n      hidden\r\n      #fileInput\r\n      type=\"file\"\r\n      [style.display]=\"'none'\"\r\n      (click)=\"fileInput.value = null\"\r\n      (change)=\"importFiles($event.target.files)\">\r\n  </div>\r\n</form>\r\n<section class=\"mat-typography\" *ngIf=\"activeImportExport === 'import'\">\r\n  <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n  <ul>\r\n    <li>{{'igo.geo.importExportForm.importSizeMax' | translate: {size: fileSizeMb} }}</li>\r\n    <li>{{'igo.geo.importExportForm.importFormatAuthorized' | translate}}</li>\r\n    <li>{{'igo.geo.importExportForm.importShpZip' | translate}}</li>\r\n  </ul>\r\n</section>\r\n\r\n<section class=\"mat-typography\" *ngIf=\"(exportableLayers$ | async).length === 0 && activeImportExport === 'export'\">\r\n  <h4>{{'igo.geo.importExportForm.exportNoLayersExportable' | translate}}</h4>\r\n</section>\r\n\r\n<form class=\"igo-form\" [formGroup]=\"form\" *ngIf=\"(exportableLayers$ | async).length > 0 && activeImportExport === 'export'\">\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <mat-label>{{'igo.geo.importExportForm.exportLayerPlaceholder' | translate}}</mat-label>\r\n      <mat-select\r\n        [formControl]=\"form.controls.layer\" multiple>\r\n        <mat-option *ngFor=\"let layer of (exportableLayers$ | async)\" [value]=\"layer.id\">\r\n          {{layer.title}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <mat-label>{{'igo.geo.importExportForm.exportFormatPlaceholder' | translate}}</mat-label>\r\n      <mat-select\r\n        formControlName=\"format\">\r\n        <ng-container *ngIf=\"(formats$ | async).length !== 0\">\r\n          <mat-option *ngFor=\"let format of (formats$ | async) | keyvalue\" [value]=\"format.key\">\r\n            {{'igo.geo.export.format.' + format.value | translate}}\r\n          </mat-option>\r\n        </ng-container>\r\n        <mat-option *ngIf=\"(formats$ | async).length === 0\" disabled=\"true\">\r\n          {{'igo.geo.export.noFormat.title' | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" *ngIf=\"forceNaming && form.value.format !== 'URL'\">\r\n    <mat-form-field>\r\n        <input matInput formControlName=\"name\" placeholder=\"{{'igo.geo.importExportForm.exportFileNamePlaceholder' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"export-options mat-typography\" *ngIf=\"form.value.format !== 'URL'\">\r\n    <mat-slide-toggle\r\n        formControlName=\"featureInMapExtent\"\r\n        [labelPosition]=\"'before'\">\r\n          {{'igo.geo.importExportForm.exportFeatureInExtent' | translate}}\r\n    </mat-slide-toggle>\r\n  </div>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"button\"\r\n      [disabled]=\"!form.valid || (loading$ | async)\"\r\n      (click)=\"handleExportFormSubmit(form.value)\">\r\n      {{form.value.format !== 'URL'  ? ('igo.geo.importExportForm.exportButton' | translate): ('igo.geo.importExportForm.exportButtonLink' | translate)}}\r\n    </button>\r\n    <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n  </div>\r\n\r\n</form>\r\n",
                styles: [".import-export-toggle{padding:10px;text-align:center}.import-export-toggle mat-button-toggle-group{width:100%}.import-export-toggle mat-button-toggle-group mat-button-toggle{width:50%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-input-container mat-form-field{width:100%}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}.export-options{overflow-x:hidden}.export-options mat-slide-toggle{width:100%;margin:10px}.export-options mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px)}"]
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
    map: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    selectedTabIndex: [{ type: Output }],
    exportOptions$: [{ type: Input }],
    exportOptionsChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ImportExportComponent.prototype.form;
    /** @type {?} */
    ImportExportComponent.prototype.formats$;
    /** @type {?} */
    ImportExportComponent.prototype.exportableLayers$;
    /** @type {?} */
    ImportExportComponent.prototype.inputProj;
    /** @type {?} */
    ImportExportComponent.prototype.loading$;
    /** @type {?} */
    ImportExportComponent.prototype.forceNaming;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.layers$$;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.exportableLayers$$;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.formats$$;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.formLayer$$;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.exportOptions$$;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.espgCodeRegex;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.clientSideFileSizeMax;
    /** @type {?} */
    ImportExportComponent.prototype.activeImportExport;
    /** @type {?} */
    ImportExportComponent.prototype.fileSizeMb;
    /**
     * @type {?}
     * @private
     */
    ImportExportComponent.prototype.previousLayerSpecs$;
    /** @type {?} */
    ImportExportComponent.prototype.map;
    /** @type {?} */
    ImportExportComponent.prototype.selectedIndex;
    /** @type {?} */
    ImportExportComponent.prototype.selectedTabIndex;
    /** @type {?} */
    ImportExportComponent.prototype.exportOptions$;
    /** @type {?} */
    ImportExportComponent.prototype.exportOptionsChange;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRTNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUlyRSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN4QixNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3RCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zQyxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7Ozs7OztJQTBDaEMsWUFDVSxhQUE0QixFQUM1QixhQUE0QixFQUM1QixlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsWUFBMEIsRUFDMUIsV0FBd0IsRUFDeEIsTUFBcUI7UUFQckIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFoRHhCLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxzQkFBaUIsR0FBZ0MsSUFBSSxlQUFlLENBQ3pFLEVBQUUsQ0FDSCxDQUFDO1FBQ0ssY0FBUyxHQUFXLFdBQVcsQ0FBQztRQUNoQyxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFRbkIsa0JBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6Qyx1QkFBa0IsR0FBVyxRQUFRLENBQUM7UUFHckMsd0JBQW1CLEdBT3ZCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBSTFCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFL0MsbUJBQWMsR0FBbUMsSUFBSSxlQUFlLENBQzNFLFNBQVMsQ0FDVixDQUFDO1FBRVEsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFZaEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUN6QixtQkFBQSxNQUFNLENBQUMsTUFBTTs7OztZQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQzdCLE9BQU8sQ0FDTCxDQUFDLEtBQUssWUFBWSxXQUFXLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUM7b0JBQzNELENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUTt3QkFDaEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUN6QyxDQUFDO1lBQ0osQ0FBQyxFQUFDLEVBQWMsQ0FDakIsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDOztjQUNHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUM1QyxzQ0FBc0MsQ0FDdkM7UUFDRCxJQUFJLENBQUMscUJBQXFCO1lBQ3hCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjO2FBQ3ZDLElBQUksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxFQUFDLENBQUM7YUFDbEQsU0FBUzs7OztRQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUNqQixhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQ3pELENBQUM7YUFDSDtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSTthQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ1osWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDOztrQkFDMUIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFDO1lBQzNELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFNUIsSUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLEVBQ0Y7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUM3QztZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztrQkFDbkIsYUFBYSxHQUtiLEVBQUU7WUFDUixNQUFNLENBQUMsT0FBTzs7OztZQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZCLElBQ0UsS0FBSyxZQUFZLFdBQVc7b0JBQzVCLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQzlDO29CQUNBLGFBQWEsQ0FBQyxJQUFJLENBQUM7d0JBQ2pCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTt3QkFDWixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87d0JBQ3RCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzt3QkFDdEIsU0FBUyxFQUFFLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxTQUFTO3FCQUNwQyxDQUFDLENBQUM7b0JBQ0gsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUN0QjtZQUNILENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3QyxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxHQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxFQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRO2FBQzNCLElBQUksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUM7YUFDdEMsU0FBUzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3BFO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQjthQUM3QyxJQUFJLENBQUMsU0FBUzs7OztRQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDO2FBQ3BDLFNBQVM7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQy9DO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVPLHdCQUF3Qjs7Y0FDeEIsYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1FBQ3BELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDekMsYUFBYSxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFOztzQkFDeEIsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3JELGFBQWEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDdEMsYUFBYSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUN0QyxDQUFDLG1CQUFBLGFBQWEsRUFBTyxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckQsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBYTs7WUFDbkIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTO1FBQzlCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdEMsU0FBUyxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsU0FBUzs7OztZQUNsRCxDQUFDLFFBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDOzs7O1lBQ2pFLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQzs7O1lBQ3JELEdBQUcsRUFBRTtnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixDQUFDLEVBQ0YsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxzQkFBc0IsQ0FBQyxJQUFtQjtRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFOztrQkFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3BDLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSztZQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUMzQixRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN0Qjs7a0JBQ0ssU0FBUyxHQUFzQixHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU87WUFDM0QsSUFDRSxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxHQUFHO2dCQUNoQyxTQUFTLENBQUMsUUFBUTtnQkFDbEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQ3RCO2dCQUNBLFVBQVU7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2Qsc0JBQXNCO29CQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxHQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNSLE9BQU87YUFDUjs7Z0JBRUcsVUFBVTtZQUNkLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMzQixVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQ2hELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUNuQyxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxZQUFZLGlCQUFpQixFQUFFO2dCQUMvQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU87Ozs7Z0JBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUN4QixDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsYUFBYTtpQkFDZixNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO2lCQUM5RCxTQUFTOzs7WUFDUixHQUFHLEVBQUUsR0FBRSxDQUFDOzs7O1lBQ1IsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7OztZQUMvQyxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUMsRUFDRixDQUFDO1FBQ04sQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLFNBQVM7UUFDZixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLGtCQUFrQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxrQkFBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuRCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxJQUFVLEVBQUUsUUFBbUI7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDN0MsdUJBQXVCLENBQ3JCLElBQUksRUFDSixRQUFRLEVBQ1IsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsZUFBZSxDQUNyQixDQUFDO1NBQ0g7YUFBTTtZQUNMLHVCQUF1QixDQUNyQixJQUFJLEVBQ0osUUFBUSxFQUNSLElBQUksQ0FBQyxHQUFHLEVBQ1IsSUFBSSxDQUFDLGNBQWMsRUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsWUFBWSxDQUNsQixDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBVSxFQUFFLEtBQVk7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIscUJBQXFCLENBQ25CLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxDQUFDLGNBQWMsRUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FDaEIsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLGlCQUFpQixDQUFDLEtBQVk7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNoQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUN0RTtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsTUFBbUI7UUFDeEMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTs7a0JBQ3JCLFdBQVcsR0FBRztnQkFDbEIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxLQUFLO2FBQ3BCO1lBQ0QsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLE9BQU87aUJBQ1I7Z0JBQ0QsSUFDRSxDQUFDLENBQUMsS0FBSyxZQUFZLFdBQVcsQ0FBQztvQkFDL0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUTtvQkFDakMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFDckM7b0JBQ0EsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQzVCO3FCQUFNLElBQ0wsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUTtvQkFDakMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFDckM7b0JBQ0EsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQ2pDO3FCQUFNLElBQUksS0FBSyxZQUFZLFdBQVcsRUFBRTtvQkFDdkMsV0FBVyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQy9CO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFFSCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO2dCQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQU0sSUFDTCxXQUFXLENBQUMsVUFBVSxLQUFLLElBQUk7Z0JBQy9CLFdBQVcsQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUM3QjtnQkFDQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxRQUFRO2dCQUMvQixJQUFJLFlBQVksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7OzBCQUNyQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU07Ozs7b0JBQ2xELENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxFQUN2QjtvQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDbkM7YUFDRjtpQkFBTSxJQUNMLFdBQVcsQ0FBQyxZQUFZLEtBQUssSUFBSTtnQkFDakMsV0FBVyxDQUFDLE9BQU8sS0FBSyxLQUFLO2dCQUM3QixXQUFXLENBQUMsVUFBVSxLQUFLLEtBQUssRUFDaEM7Z0JBQ0EsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsUUFBUTtnQkFDL0IsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFOzswQkFDeEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7b0JBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNuQzthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUNwQyw4QkFBOEIsQ0FDL0IsRUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQ3BDLCtCQUErQixDQUNoQyxDQUNGLENBQUM7YUFDSDtZQUNELE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsS0FBSyxTQUFTLEVBQUU7O2tCQUN6RCxtQkFBbUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQzlDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxPQUFpQjtRQUMxQyxPQUFPLE9BQU87YUFDWCxNQUFNOzs7O1FBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQixJQUNFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtnQkFDNUQsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO2dCQUNoRSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3ZELE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDdkQsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUMzRCxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3ZELE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtnQkFDN0QsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQ3ZEO2dCQUNBLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUM7YUFDRCxHQUFHOzs7O1FBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNkLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ2hFLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUMvQixPQUFPLE1BQU0sQ0FBQzthQUNmO1lBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssWUFBWSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDcEUsTUFBTSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQ25DLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUMzRCxNQUFNLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUNELElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzNELE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDO2dCQUMxQixPQUFPLE1BQU0sQ0FBQzthQUNmO1lBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDL0QsTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQzlCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUMzRCxNQUFNLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUNELElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ2pFLE1BQU0sR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxPQUFPLE1BQU0sQ0FBQzthQUNmO1lBRUQsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDM0QsTUFBTSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7Z0JBQzFCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU0sVUFBVSxDQUFDLEdBQXNCO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRU8sbUJBQW1CO1FBQ3pCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsS0FBSztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN4QyxDQUFDOzs7WUE5YkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLHcrSUFBNkM7O2FBRTlDOzs7O1lBZFEsYUFBYTtZQURiLGFBQWE7WUFqQkcsZUFBZTtZQUEvQixjQUFjO1lBd0JkLGdCQUFnQjtZQURoQixZQUFZO1lBMUJELFdBQVc7WUFHVyxhQUFhOzs7a0JBK0RwRCxLQUFLOzRCQUVMLEtBQUs7K0JBRUwsTUFBTTs2QkFFTixLQUFLO2tDQUlMLE1BQU07Ozs7SUF2Q1AscUNBQXVCOztJQUN2Qix5Q0FBaUQ7O0lBQ2pELGtEQUVFOztJQUNGLDBDQUF1Qzs7SUFDdkMseUNBQTZDOztJQUM3Qyw0Q0FBMkI7Ozs7O0lBRTNCLHlDQUErQjs7Ozs7SUFDL0IsbURBQXlDOzs7OztJQUN6QywwQ0FBZ0M7Ozs7O0lBQ2hDLDRDQUFrQzs7Ozs7SUFDbEMsZ0RBQXNDOzs7OztJQUV0Qyw4Q0FBZ0Q7Ozs7O0lBQ2hELHNEQUFzQzs7SUFDdEMsbURBQTZDOztJQUM3QywyQ0FBMEI7Ozs7O0lBRTFCLG9EQU9tQzs7SUFFbkMsb0NBQXFCOztJQUVyQiw4Q0FBbUM7O0lBRW5DLGlEQUF3RDs7SUFFeEQsK0NBRUU7O0lBRUYsb0RBQWtFOzs7OztJQUdoRSw4Q0FBb0M7Ozs7O0lBQ3BDLDhDQUFvQzs7Ozs7SUFDcEMsZ0RBQXdDOzs7OztJQUN4QywrQ0FBc0M7Ozs7O0lBQ3RDLGlEQUEwQzs7Ozs7SUFDMUMsNkNBQWtDOzs7OztJQUNsQyw0Q0FBZ0M7Ozs7O0lBQ2hDLHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBzdHJFbnVtIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuaW1wb3J0IHsgQW55TGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2FueS1sYXllcic7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBoYW5kbGVGaWxlRXhwb3J0RXJyb3IsXHJcbiAgaGFuZGxlRmlsZUV4cG9ydFN1Y2Nlc3NcclxufSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LnV0aWxzJztcclxuaW1wb3J0IHsgRXhwb3J0T3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9leHBvcnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRXhwb3J0Rm9ybWF0IH0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC50eXBlJztcclxuaW1wb3J0IHsgRXhwb3J0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEltcG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzLFxyXG4gIGhhbmRsZUZpbGVJbXBvcnRFcnJvclxyXG59IGZyb20gJy4uL3NoYXJlZC9pbXBvcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0eWxlTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1saXN0L3N0eWxlLWxpc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IE1hdFRhYkNoYW5nZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBza2lwV2hpbGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1pbXBvcnQtZXhwb3J0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnRFeHBvcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XHJcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgZm9ybWF0cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIGV4cG9ydGFibGVMYXllcnMkOiBCZWhhdmlvclN1YmplY3Q8QW55TGF5ZXJbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxyXG4gICAgW11cclxuICApO1xyXG4gIHB1YmxpYyBpbnB1dFByb2o6IHN0cmluZyA9ICdFUFNHOjQzMjYnO1xyXG4gIHB1YmxpYyBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG4gIHB1YmxpYyBmb3JjZU5hbWluZyA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBleHBvcnRhYmxlTGF5ZXJzJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGZvcm1hdHMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZm9ybUxheWVyJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGV4cG9ydE9wdGlvbnMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIGVzcGdDb2RlUmVnZXggPSBuZXcgUmVnRXhwKCdeXFxcXGR7NCw2fScpO1xyXG4gIHByaXZhdGUgY2xpZW50U2lkZUZpbGVTaXplTWF4OiBudW1iZXI7XHJcbiAgcHVibGljIGFjdGl2ZUltcG9ydEV4cG9ydDogc3RyaW5nID0gJ2ltcG9ydCc7XHJcbiAgcHVibGljIGZpbGVTaXplTWI6IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBwcmV2aW91c0xheWVyU3BlY3MkOiBCZWhhdmlvclN1YmplY3Q8XHJcbiAgICB7XHJcbiAgICAgIGlkOiBzdHJpbmc7XHJcbiAgICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICAgIG9wYWNpdHk6IG51bWJlcjtcclxuICAgICAgcXVlcnlhYmxlOiBib29sZWFuO1xyXG4gICAgfVtdXHJcbiAgPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZFRhYkluZGV4ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gIEBJbnB1dCgpIGV4cG9ydE9wdGlvbnMkOiBCZWhhdmlvclN1YmplY3Q8RXhwb3J0T3B0aW9ucz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxyXG4gICAgdW5kZWZpbmVkXHJcbiAgKTtcclxuXHJcbiAgQE91dHB1dCgpIGV4cG9ydE9wdGlvbnNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEV4cG9ydE9wdGlvbnM+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBpbXBvcnRTZXJ2aWNlOiBJbXBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBleHBvcnRTZXJ2aWNlOiBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMubG9hZENvbmZpZygpO1xyXG4gICAgdGhpcy5idWlsZEZvcm0oKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5mb3JtKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZSgobGF5ZXJzKSA9PiB7XHJcbiAgICAgIHRoaXMuZXhwb3J0YWJsZUxheWVycyQubmV4dChcclxuICAgICAgICBsYXllcnMuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIChsYXllciBpbnN0YW5jZW9mIFZlY3RvckxheWVyICYmIGxheWVyLmV4cG9ydGFibGUgPT09IHRydWUpIHx8XHJcbiAgICAgICAgICAgIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMuZG93bmxvYWQgJiZcclxuICAgICAgICAgICAgICBsYXllci5kYXRhU291cmNlLm9wdGlvbnMuZG93bmxvYWQudXJsKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KSBhcyBBbnlMYXllcltdXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNvbmZpZ0ZpbGVTaXplTWIgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoXHJcbiAgICAgICdpbXBvcnRFeHBvcnQuY2xpZW50U2lkZUZpbGVTaXplTWF4TWInXHJcbiAgICApO1xyXG4gICAgdGhpcy5jbGllbnRTaWRlRmlsZVNpemVNYXggPVxyXG4gICAgICAoY29uZmlnRmlsZVNpemVNYiA/IGNvbmZpZ0ZpbGVTaXplTWIgOiAzMCkgKiBNYXRoLnBvdygxMDI0LCAyKTtcclxuICAgIHRoaXMuZmlsZVNpemVNYiA9IHRoaXMuY2xpZW50U2lkZUZpbGVTaXplTWF4IC8gTWF0aC5wb3coMTAyNCwgMik7XHJcblxyXG4gICAgdGhpcy5leHBvcnRPcHRpb25zJCQgPSB0aGlzLmV4cG9ydE9wdGlvbnMkXHJcbiAgICAgIC5waXBlKHNraXBXaGlsZSgoZXhwb3J0T3B0aW9ucykgPT4gIWV4cG9ydE9wdGlvbnMpKVxyXG4gICAgICAuc3Vic2NyaWJlKChleHBvcnRPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoZXhwb3J0T3B0aW9ucywgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKGV4cG9ydE9wdGlvbnMubGF5ZXIpIHtcclxuICAgICAgICAgIHRoaXMuY29tcHV0ZUZvcm1hdHMoXHJcbiAgICAgICAgICAgIGV4cG9ydE9wdGlvbnMubGF5ZXIubWFwKChsKSA9PiB0aGlzLm1hcC5nZXRMYXllckJ5SWQobCkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5mb3JtTGF5ZXIkJCA9IHRoaXMuZm9ybVxyXG4gICAgICAuZ2V0KCdsYXllcicpXHJcbiAgICAgIC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChsYXllcklkKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVQcmV2aW91c0xheWVyU3BlY3MoKTtcclxuICAgICAgICBjb25zdCBsYXllcnMgPSBsYXllcklkLm1hcCgobCkgPT4gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGwpKTtcclxuICAgICAgICB0aGlzLmNvbXB1dGVGb3JtYXRzKGxheWVycyk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybWF0cyQudmFsdWUpLmluZGV4T2YodGhpcy5mb3JtLnZhbHVlLmZvcm1hdCkgPT09XHJcbiAgICAgICAgICAtMVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoeyBmb3JtYXQ6IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcclxuICAgICAgICBjb25zdCBwcmV2aW91c1NwZWNzOiB7XHJcbiAgICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICAgIG9wYWNpdHk6IG51bWJlcjtcclxuICAgICAgICAgIHF1ZXJ5YWJsZTogYm9vbGVhbjtcclxuICAgICAgICB9W10gPSBbXTtcclxuICAgICAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgbGF5ZXIgaW5zdGFuY2VvZiBWZWN0b3JMYXllciAmJlxyXG4gICAgICAgICAgICBsYXllci5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVzKCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgcHJldmlvdXNTcGVjcy5wdXNoKHtcclxuICAgICAgICAgICAgICBpZDogbGF5ZXIuaWQsXHJcbiAgICAgICAgICAgICAgdmlzaWJsZTogbGF5ZXIudmlzaWJsZSxcclxuICAgICAgICAgICAgICBvcGFjaXR5OiBsYXllci5vcGFjaXR5LFxyXG4gICAgICAgICAgICAgIHF1ZXJ5YWJsZTogKGxheWVyIGFzIGFueSkucXVlcnlhYmxlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsYXllci5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgbGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNMYXllclNwZWNzJC5uZXh0KHByZXZpb3VzU3BlY3MpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZvcm1hdHMkJCA9IHRoaXMuZm9ybWF0cyRcclxuICAgICAgLnBpcGUoc2tpcFdoaWxlKChmb3JtYXRzKSA9PiAhZm9ybWF0cykpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGZvcm1hdHMpID0+IHtcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZm9ybWF0cykubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZSh7IGZvcm1hdDogZm9ybWF0c1tPYmplY3Qua2V5cyhmb3JtYXRzKVswXV0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmV4cG9ydGFibGVMYXllcnMkJCA9IHRoaXMuZXhwb3J0YWJsZUxheWVycyRcclxuICAgICAgLnBpcGUoc2tpcFdoaWxlKChsYXllcnMpID0+ICFsYXllcnMpKVxyXG4gICAgICAuc3Vic2NyaWJlKChsYXllcnMpID0+IHtcclxuICAgICAgICBpZiAobGF5ZXJzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoeyBsYXllcjogbGF5ZXJzWzBdLmlkIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZXhwb3J0YWJsZUxheWVycyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmZvcm1hdHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5mb3JtTGF5ZXIkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMuZXhwb3J0T3B0aW9ucyQkKSB7XHJcbiAgICAgIHRoaXMuZXhwb3J0T3B0aW9ucyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmV4cG9ydE9wdGlvbnNDaGFuZ2UuZW1pdCh0aGlzLmZvcm0udmFsdWUpO1xyXG4gICAgdGhpcy5oYW5kbGVQcmV2aW91c0xheWVyU3BlY3MoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlUHJldmlvdXNMYXllclNwZWNzKCkge1xyXG4gICAgY29uc3QgcHJldmlvdXNTcGVjcyA9IHRoaXMucHJldmlvdXNMYXllclNwZWNzJC52YWx1ZTtcclxuICAgIGlmIChwcmV2aW91c1NwZWNzICYmIHByZXZpb3VzU3BlY3MubGVuZ3RoKSB7XHJcbiAgICAgIHByZXZpb3VzU3BlY3MuZm9yRWFjaCgoc3BlY3MpID0+IHtcclxuICAgICAgICBjb25zdCBwcmV2aW91c0xheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKHNwZWNzLmlkKTtcclxuICAgICAgICBwcmV2aW91c0xheWVyLnZpc2libGUgPSBzcGVjcy52aXNpYmxlO1xyXG4gICAgICAgIHByZXZpb3VzTGF5ZXIub3BhY2l0eSA9IHNwZWNzLm9wYWNpdHk7XHJcbiAgICAgICAgKHByZXZpb3VzTGF5ZXIgYXMgYW55KS5xdWVyeWFibGUgPSBzcGVjcy5xdWVyeWFibGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcmV2aW91c0xheWVyU3BlY3MkLm5leHQodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGltcG9ydEZpbGVzKGZpbGVzOiBGaWxlW10pIHtcclxuICAgIGxldCBpbnB1dFByb2ogPSB0aGlzLmlucHV0UHJvajtcclxuICAgIGlmICh0aGlzLmVzcGdDb2RlUmVnZXgudGVzdChpbnB1dFByb2opKSB7XHJcbiAgICAgIGlucHV0UHJvaiA9IGBFUFNHOiR7aW5wdXRQcm9qfWA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgIHRoaXMuaW1wb3J0U2VydmljZS5pbXBvcnQoZmlsZSwgaW5wdXRQcm9qKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcyksXHJcbiAgICAgICAgKGVycm9yOiBFcnJvcikgPT4gdGhpcy5vbkZpbGVJbXBvcnRFcnJvcihmaWxlLCBlcnJvciksXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFeHBvcnRGb3JtU3VibWl0KGRhdGE6IEV4cG9ydE9wdGlvbnMpIHtcclxuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcclxuICAgIGRhdGEubGF5ZXIuZm9yRWFjaCgobGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgbGF5ID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGxheWVyKTtcclxuICAgICAgbGV0IGZpbGVuYW1lID0gbGF5LnRpdGxlO1xyXG4gICAgICBpZiAoZGF0YS5uYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmaWxlbmFtZSA9IGRhdGEubmFtZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkU09wdGlvbnM6IERhdGFTb3VyY2VPcHRpb25zID0gbGF5LmRhdGFTb3VyY2Uub3B0aW9ucztcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGRhdGEuZm9ybWF0ID09PSBFeHBvcnRGb3JtYXQuVVJMICYmXHJcbiAgICAgICAgZFNPcHRpb25zLmRvd25sb2FkICYmXHJcbiAgICAgICAgZFNPcHRpb25zLmRvd25sb2FkLnVybFxyXG4gICAgICApIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIC8vIGJldHRlciBsb29rIGFuIGZlZWxcclxuICAgICAgICAgIHdpbmRvdy5vcGVuKGRTT3B0aW9ucy5kb3dubG9hZC51cmwsICdfYmxhbmsnKTtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBvbEZlYXR1cmVzO1xyXG4gICAgICBpZiAoZGF0YS5mZWF0dXJlSW5NYXBFeHRlbnQpIHtcclxuICAgICAgICBvbEZlYXR1cmVzID0gbGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZXNJbkV4dGVudChcclxuICAgICAgICAgIGxheS5tYXAudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KClcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9sRmVhdHVyZXMgPSBsYXkuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlcygpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChsYXkuZGF0YVNvdXJjZSBpbnN0YW5jZW9mIENsdXN0ZXJEYXRhU291cmNlKSB7XHJcbiAgICAgICAgb2xGZWF0dXJlcyA9IG9sRmVhdHVyZXMuZmxhdE1hcCgoY2x1c3RlcjogYW55KSA9PlxyXG4gICAgICAgICAgY2x1c3Rlci5nZXQoJ2ZlYXR1cmVzJylcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmV4cG9ydFNlcnZpY2VcclxuICAgICAgICAuZXhwb3J0KG9sRmVhdHVyZXMsIGRhdGEuZm9ybWF0LCBmaWxlbmFtZSwgdGhpcy5tYXAucHJvamVjdGlvbilcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKCkgPT4ge30sXHJcbiAgICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUV4cG9ydEVycm9yKGVycm9yKSxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkZpbGVFeHBvcnRTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEZvcm0oKSB7XHJcbiAgICBpZiAodGhpcy5mb3JjZU5hbWluZykge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICBmb3JtYXQ6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgICBsYXllcjogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgIGZlYXR1cmVJbk1hcEV4dGVudDogW2ZhbHNlLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgIG5hbWU6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgIGZvcm1hdDogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgIGxheWVyOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgICAgZmVhdHVyZUluTWFwRXh0ZW50OiBbZmFsc2UsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydFdpdGhTdHlsZScpKSB7XHJcbiAgICAgIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKFxyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgZmVhdHVyZXMsXHJcbiAgICAgICAgdGhpcy5tYXAsXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZSxcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoXHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBmZWF0dXJlcyxcclxuICAgICAgICB0aGlzLm1hcCxcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHRoaXMuc3R5bGVMaXN0U2VydmljZSxcclxuICAgICAgICB0aGlzLnN0eWxlU2VydmljZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRFcnJvcihmaWxlOiBGaWxlLCBlcnJvcjogRXJyb3IpIHtcclxuICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICBoYW5kbGVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgICAgIGZpbGUsXHJcbiAgICAgIGVycm9yLFxyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZSxcclxuICAgICAgdGhpcy5maWxlU2l6ZU1iXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVFeHBvcnRFcnJvcihlcnJvcjogRXJyb3IpIHtcclxuICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICBoYW5kbGVGaWxlRXhwb3J0RXJyb3IoZXJyb3IsIHRoaXMubWVzc2FnZVNlcnZpY2UsIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZENvbmZpZygpIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydEV4cG9ydC5mb3JjZU5hbWluZycpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5mb3JjZU5hbWluZyA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0RXhwb3J0LmZvcmNlTmFtaW5nJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbXB1dGVGb3JtYXRzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVGb3JtYXRzKGxheWVycz86IEFueUxheWVyW10pIHtcclxuICAgIGlmIChsYXllcnMgJiYgbGF5ZXJzLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBmb3JtYXRzVHlwZSA9IHtcclxuICAgICAgICBvbmx5VXJsOiBmYWxzZSxcclxuICAgICAgICBvbmx5VmVjdG9yOiBmYWxzZSxcclxuICAgICAgICB2ZWN0b3JBbmRVcmw6IGZhbHNlXHJcbiAgICAgIH07XHJcbiAgICAgIGxheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xyXG4gICAgICAgIGlmICghbGF5ZXIpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIShsYXllciBpbnN0YW5jZW9mIFZlY3RvckxheWVyKSAmJlxyXG4gICAgICAgICAgbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkICYmXHJcbiAgICAgICAgICBsYXllci5kYXRhU291cmNlLm9wdGlvbnMuZG93bmxvYWQudXJsXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBmb3JtYXRzVHlwZS5vbmx5VXJsID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkICYmXHJcbiAgICAgICAgICBsYXllci5kYXRhU291cmNlLm9wdGlvbnMuZG93bmxvYWQudXJsXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBmb3JtYXRzVHlwZS52ZWN0b3JBbmRVcmwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIgaW5zdGFuY2VvZiBWZWN0b3JMYXllcikge1xyXG4gICAgICAgICAgZm9ybWF0c1R5cGUub25seVZlY3RvciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChmb3JtYXRzVHlwZS5vbmx5VXJsID09PSB0cnVlICYmIGZvcm1hdHNUeXBlLm9ubHlWZWN0b3IgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRzJC5uZXh0KHN0ckVudW0oWydVUkwnXSkpO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGZvcm1hdHNUeXBlLm9ubHlWZWN0b3IgPT09IHRydWUgJiZcclxuICAgICAgICBmb3JtYXRzVHlwZS5vbmx5VXJsID09PSBmYWxzZVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmNvbXB1dGVGb3JtYXRzKCk7IC8vIHJlc2V0XHJcbiAgICAgICAgaWYgKEV4cG9ydEZvcm1hdC5VUkwgaW4gdGhpcy5mb3JtYXRzJC52YWx1ZSkge1xyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybWF0cyQudmFsdWUpLmZpbHRlcihcclxuICAgICAgICAgICAgKGtleSkgPT4ga2V5ICE9PSAnVVJMJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuZm9ybWF0cyQubmV4dChzdHJFbnVtKGtleXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgZm9ybWF0c1R5cGUudmVjdG9yQW5kVXJsID09PSB0cnVlICYmXHJcbiAgICAgICAgZm9ybWF0c1R5cGUub25seVVybCA9PT0gZmFsc2UgJiZcclxuICAgICAgICBmb3JtYXRzVHlwZS5vbmx5VmVjdG9yID09PSBmYWxzZVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmNvbXB1dGVGb3JtYXRzKCk7IC8vIHJlc2V0XHJcbiAgICAgICAgaWYgKCEoRXhwb3J0Rm9ybWF0LlVSTCBpbiB0aGlzLmZvcm1hdHMkLnZhbHVlKSkge1xyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybWF0cyQudmFsdWUpO1xyXG4gICAgICAgICAga2V5cy5wdXNoKCdVUkwnKTtcclxuICAgICAgICAgIHRoaXMuZm9ybWF0cyQubmV4dChzdHJFbnVtKGtleXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRzJC5uZXh0KFtdKTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFsZXJ0KFxyXG4gICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICdpZ28uZ2VvLmV4cG9ydC5ub0Zvcm1hdC50ZXh0J1xyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAnaWdvLmdlby5leHBvcnQubm9Gb3JtYXQudGl0bGUnXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0RXhwb3J0LmZvcm1hdHMnKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRlZExpc3RGb3JtYXQgPSB0aGlzLnZhbGlkYXRlTGlzdEZvcm1hdChcclxuICAgICAgICB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydEV4cG9ydC5mb3JtYXRzJylcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5mb3JtYXRzJC5uZXh0KHN0ckVudW0odmFsaWRhdGVkTGlzdEZvcm1hdCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtYXRzJC5uZXh0KEV4cG9ydEZvcm1hdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlTGlzdEZvcm1hdChmb3JtYXRzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBmb3JtYXRzXHJcbiAgICAgIC5maWx0ZXIoKGZvcm1hdCkgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuQ1NWY29tbWEudG9VcHBlckNhc2UoKSB8fFxyXG4gICAgICAgICAgZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5DU1ZzZW1pY29sb24udG9VcHBlckNhc2UoKSB8fFxyXG4gICAgICAgICAgZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5HTUwudG9VcHBlckNhc2UoKSB8fFxyXG4gICAgICAgICAgZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5HUFgudG9VcHBlckNhc2UoKSB8fFxyXG4gICAgICAgICAgZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5HZW9KU09OLnRvVXBwZXJDYXNlKCkgfHxcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuS01MLnRvVXBwZXJDYXNlKCkgfHxcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuU2hhcGVmaWxlLnRvVXBwZXJDYXNlKCkgfHxcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuVVJMLnRvVXBwZXJDYXNlKClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAubWFwKChmb3JtYXQpID0+IHtcclxuICAgICAgICBpZiAoZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5DU1Zjb21tYS50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBFeHBvcnRGb3JtYXQuQ1NWY29tbWE7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5DU1ZzZW1pY29sb24udG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgZm9ybWF0ID0gRXhwb3J0Rm9ybWF0LkNTVnNlbWljb2xvbjtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3JtYXQudG9VcHBlckNhc2UoKSA9PT0gRXhwb3J0Rm9ybWF0LkdNTC50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBFeHBvcnRGb3JtYXQuR01MO1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuR1BYLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IEV4cG9ydEZvcm1hdC5HUFg7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5HZW9KU09OLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IEV4cG9ydEZvcm1hdC5HZW9KU09OO1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuS01MLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IEV4cG9ydEZvcm1hdC5LTUw7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5TaGFwZWZpbGUudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgZm9ybWF0ID0gRXhwb3J0Rm9ybWF0LlNoYXBlZmlsZTtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5VUkwudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgZm9ybWF0ID0gRXhwb3J0Rm9ybWF0LlVSTDtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0YWJDaGFuZ2VkKHRhYjogTWF0VGFiQ2hhbmdlRXZlbnQpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleC5lbWl0KHRhYi5pbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUV4cG9ydFN1Y2Nlc3MoKSB7XHJcbiAgICBoYW5kbGVGaWxlRXhwb3J0U3VjY2Vzcyh0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBvbkltcG9ydEV4cG9ydENoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5hY3RpdmVJbXBvcnRFeHBvcnQgPSBldmVudC52YWx1ZTtcclxuICB9XHJcbn1cclxuIl19