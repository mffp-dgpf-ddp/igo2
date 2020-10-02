/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            _this.exportableLayers$.next((/** @type {?} */ (layers.filter((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                return ((layer instanceof VectorLayer && layer.exportable === true) ||
                    (layer.dataSource.options.download &&
                        layer.dataSource.options.download.url));
            })))));
        }));
        /** @type {?} */
        var configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
        this.fileSizeMb = this.clientSideFileSizeMax / Math.pow(1024, 2);
        this.exportOptions$$ = this.exportOptions$
            .pipe(skipWhile((/**
         * @param {?} exportOptions
         * @return {?}
         */
        function (exportOptions) { return !exportOptions; })))
            .subscribe((/**
         * @param {?} exportOptions
         * @return {?}
         */
        function (exportOptions) {
            _this.form.patchValue(exportOptions, { emitEvent: true });
            if (exportOptions.layer) {
                _this.computeFormats(exportOptions.layer.map((/**
                 * @param {?} l
                 * @return {?}
                 */
                function (l) { return _this.map.getLayerById(l); })));
            }
        }));
        this.formLayer$$ = this.form
            .get('layer')
            .valueChanges.subscribe((/**
         * @param {?} layerId
         * @return {?}
         */
        function (layerId) {
            _this.handlePreviousLayerSpecs();
            /** @type {?} */
            var layers = layerId.map((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return _this.map.getLayerById(l); }));
            _this.computeFormats(layers);
            if (Object.keys(_this.formats$.value).indexOf(_this.form.value.format) ===
                -1) {
                _this.form.patchValue({ format: undefined });
            }
            _this.loading$.next(true);
            /** @type {?} */
            var previousSpecs = [];
            layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
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
            _this.previousLayerSpecs$.next(previousSpecs);
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.loading$.next(false);
            }), 500);
        }));
        this.formats$$ = this.formats$
            .pipe(skipWhile((/**
         * @param {?} formats
         * @return {?}
         */
        function (formats) { return !formats; })))
            .subscribe((/**
         * @param {?} formats
         * @return {?}
         */
        function (formats) {
            if (Object.keys(formats).length === 1) {
                _this.form.patchValue({ format: formats[Object.keys(formats)[0]] });
            }
        }));
        this.exportableLayers$$ = this.exportableLayers$
            .pipe(skipWhile((/**
         * @param {?} layers
         * @return {?}
         */
        function (layers) { return !layers; })))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        function (layers) {
            if (layers.length === 1) {
                _this.form.patchValue({ layer: layers[0].id });
            }
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
        this.exportableLayers$$.unsubscribe();
        this.formats$$.unsubscribe();
        this.formLayer$$.unsubscribe();
        if (this.exportOptions$$) {
            this.exportOptions$$.unsubscribe();
        }
        this.exportOptionsChange.emit(this.form.value);
        this.handlePreviousLayerSpecs();
    };
    /**
     * @private
     * @return {?}
     */
    ImportExportComponent.prototype.handlePreviousLayerSpecs = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var previousSpecs = this.previousLayerSpecs$.value;
        if (previousSpecs && previousSpecs.length) {
            previousSpecs.forEach((/**
             * @param {?} specs
             * @return {?}
             */
            function (specs) {
                /** @type {?} */
                var previousLayer = _this.map.getLayerById(specs.id);
                previousLayer.visible = specs.visible;
                previousLayer.opacity = specs.opacity;
                ((/** @type {?} */ (previousLayer))).queryable = specs.queryable;
            }));
        }
        this.previousLayerSpecs$.next(undefined);
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
        data.layer.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            /** @type {?} */
            var lay = _this.map.getLayerById(layer);
            /** @type {?} */
            var filename = lay.title;
            if (data.name !== undefined) {
                filename = data.name;
            }
            /** @type {?} */
            var dSOptions = lay.dataSource.options;
            if (data.format === ExportFormat.URL &&
                dSOptions.download &&
                dSOptions.download.url) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    // better look an feel
                    window.open(dSOptions.download.url, '_blank');
                    _this.loading$.next(false);
                }), 500);
                return;
            }
            /** @type {?} */
            var olFeatures;
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
                function (cluster) {
                    return cluster.get('features');
                }));
            }
            _this.exportService
                .export(olFeatures, data.format, filename, _this.map.projection)
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
        handleFileImportError(file, error, this.messageService, this.languageService, this.fileSizeMb);
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
    /**
     * @private
     * @return {?}
     */
    ImportExportComponent.prototype.loadConfig = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.config.getConfig('importExport.forceNaming') !== undefined) {
            this.forceNaming = this.config.getConfig('importExport.forceNaming');
        }
        this.computeFormats();
    };
    /**
     * @private
     * @param {?=} layers
     * @return {?}
     */
    ImportExportComponent.prototype.computeFormats = /**
     * @private
     * @param {?=} layers
     * @return {?}
     */
    function (layers) {
        if (layers && layers.length) {
            /** @type {?} */
            var formatsType_1 = {
                onlyUrl: false,
                onlyVector: false,
                vectorAndUrl: false
            };
            layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                if (!layer) {
                    return;
                }
                if (!(layer instanceof VectorLayer) &&
                    layer.dataSource.options.download &&
                    layer.dataSource.options.download.url) {
                    formatsType_1.onlyUrl = true;
                }
                else if (layer.dataSource.options.download &&
                    layer.dataSource.options.download.url) {
                    formatsType_1.vectorAndUrl = true;
                }
                else if (layer instanceof VectorLayer) {
                    formatsType_1.onlyVector = true;
                }
            }));
            if (formatsType_1.onlyUrl === true && formatsType_1.onlyVector === false) {
                this.formats$.next(strEnum(['URL']));
            }
            else if (formatsType_1.onlyVector === true &&
                formatsType_1.onlyUrl === false) {
                this.computeFormats(); // reset
                if (ExportFormat.URL in this.formats$.value) {
                    /** @type {?} */
                    var keys = Object.keys(this.formats$.value).filter((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) { return key !== 'URL'; }));
                    this.formats$.next(strEnum(keys));
                }
            }
            else if (formatsType_1.vectorAndUrl === true &&
                formatsType_1.onlyUrl === false &&
                formatsType_1.onlyVector === false) {
                this.computeFormats(); // reset
                if (!(ExportFormat.URL in this.formats$.value)) {
                    /** @type {?} */
                    var keys = Object.keys(this.formats$.value);
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
            var validatedListFormat = this.validateListFormat(this.config.getConfig('importExport.formats'));
            this.formats$.next(strEnum(validatedListFormat));
        }
        else {
            this.formats$.next(ExportFormat);
        }
    };
    /**
     * @private
     * @param {?} formats
     * @return {?}
     */
    ImportExportComponent.prototype.validateListFormat = /**
     * @private
     * @param {?} formats
     * @return {?}
     */
    function (formats) {
        return formats
            .filter((/**
         * @param {?} format
         * @return {?}
         */
        function (format) {
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
        function (format) {
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
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    ImportExportComponent.prototype.tabChanged = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.selectedTabIndex.emit(tab.index);
    };
    /**
     * @private
     * @return {?}
     */
    ImportExportComponent.prototype.onFileExportSuccess = /**
     * @private
     * @return {?}
     */
    function () {
        handleFileExportSuccess(this.messageService, this.languageService);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImportExportComponent.prototype.onImportExportChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.activeImportExport = event.value;
    };
    ImportExportComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-import-export',
                    template: "<div class=\"import-export-toggle mat-typography\">\r\n  <mat-button-toggle-group\r\n        [value]=\"activeImportExport\"\r\n        (change)=\"onImportExportChange($event)\">\r\n        <mat-button-toggle [value]=\"'import'\">\r\n          {{'igo.geo.importExportForm.importTabTitle' | translate}}\r\n        </mat-button-toggle>\r\n        <mat-button-toggle [value]=\"'export'\">\r\n          {{'igo.geo.importExportForm.exportTabTitle' | translate}}\r\n        </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</div>\r\n\r\n<form class=\"igo-form\" *ngIf=\"activeImportExport === 'import'\">\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        placeholder=\"{{'igo.geo.importExportForm.importProjPlaceholder' | translate}}\"\r\n        name=\"inputProj\"\r\n        [(ngModel)]=\"inputProj\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\" [disabled]=\"loading$ | async\">\r\n      {{'igo.geo.importExportForm.importButton' | translate}}\r\n    </button>\r\n    <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n    <input\r\n      hidden\r\n      #fileInput\r\n      type=\"file\"\r\n      [style.display]=\"'none'\"\r\n      (click)=\"fileInput.value = null\"\r\n      (change)=\"importFiles($event.target.files)\">\r\n  </div>\r\n</form>\r\n<section class=\"mat-typography\" *ngIf=\"activeImportExport === 'import'\">\r\n  <h4>{{'igo.geo.importExportForm.importClarifications' | translate}}</h4>\r\n  <ul>\r\n    <li>{{'igo.geo.importExportForm.importSizeMax' | translate: {size: fileSizeMb} }}</li>\r\n    <li>{{'igo.geo.importExportForm.importFormatAuthorized' | translate}}</li>\r\n    <li>{{'igo.geo.importExportForm.importShpZip' | translate}}</li>\r\n  </ul>\r\n</section>\r\n\r\n<section class=\"mat-typography\" *ngIf=\"(exportableLayers$ | async).length === 0 && activeImportExport === 'export'\">\r\n  <h4>{{'igo.geo.importExportForm.exportNoLayersExportable' | translate}}</h4>\r\n</section>\r\n\r\n<form class=\"igo-form\" [formGroup]=\"form\" *ngIf=\"(exportableLayers$ | async).length > 0 && activeImportExport === 'export'\">\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <mat-label>{{'igo.geo.importExportForm.exportLayerPlaceholder' | translate}}</mat-label>\r\n      <mat-select\r\n        [formControl]=\"form.controls.layer\" multiple>\r\n        <mat-option *ngFor=\"let layer of (exportableLayers$ | async)\" [value]=\"layer.id\">\r\n          {{layer.title}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <mat-label>{{'igo.geo.importExportForm.exportFormatPlaceholder' | translate}}</mat-label>\r\n      <mat-select\r\n        formControlName=\"format\">\r\n        <ng-container *ngIf=\"(formats$ | async).length !== 0\">\r\n          <mat-option *ngFor=\"let format of (formats$ | async) | keyvalue\" [value]=\"format.key\">\r\n            {{'igo.geo.export.format.' + format.value | translate}}\r\n          </mat-option>\r\n        </ng-container>\r\n        <mat-option *ngIf=\"(formats$ | async).length === 0\" disabled=\"true\">\r\n          {{'igo.geo.export.noFormat.title' | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" *ngIf=\"forceNaming && form.value.format !== 'URL'\">\r\n    <mat-form-field>\r\n        <input matInput formControlName=\"name\" placeholder=\"{{'igo.geo.importExportForm.exportFileNamePlaceholder' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"export-options mat-typography\" *ngIf=\"form.value.format !== 'URL'\">\r\n    <mat-slide-toggle\r\n        formControlName=\"featureInMapExtent\"\r\n        [labelPosition]=\"'before'\">\r\n          {{'igo.geo.importExportForm.exportFeatureInExtent' | translate}}\r\n    </mat-slide-toggle>\r\n  </div>\r\n\r\n  <div class=\"igo-form-button-group\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"button\"\r\n      [disabled]=\"!form.valid || (loading$ | async)\"\r\n      (click)=\"handleExportFormSubmit(form.value)\">\r\n      {{form.value.format !== 'URL'  ? ('igo.geo.importExportForm.exportButton' | translate): ('igo.geo.importExportForm.exportButtonLink' | translate)}}\r\n    </button>\r\n    <igo-spinner [shown]=\"loading$ | async\"></igo-spinner>\r\n  </div>\r\n\r\n</form>\r\n",
                    styles: [".import-export-toggle{padding:10px;text-align:center}.import-export-toggle mat-button-toggle-group{width:100%}.import-export-toggle mat-button-toggle-group mat-button-toggle{width:50%}h4{padding:0 5px}.igo-form{padding:15px 5px}.igo-input-container mat-form-field{width:100%}.igo-form-button-group{text-align:center;padding-top:10px}igo-spinner{position:absolute;padding-left:10px}.export-options{overflow-x:hidden}.export-options mat-slide-toggle{width:100%;margin:10px}.export-options mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px)}"]
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
        map: [{ type: Input }],
        selectedIndex: [{ type: Input }],
        selectedTabIndex: [{ type: Output }],
        exportOptions$: [{ type: Input }],
        exportOptionsChange: [{ type: Output }]
    };
    return ImportExportComponent;
}());
export { ImportExportComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUUzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFJckUsT0FBTyxFQUNMLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDeEIsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFB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LG9EQUFrRTs7Ozs7SUFHaEUsOENBQW9DOzs7OztJQUNwQyw4Q0FBb0M7Ozs7O0lBQ3BDLGdEQUF3Qzs7Ozs7SUFDeEMsK0NBQXNDOzs7OztJQUN0QyxpREFBMEM7Ozs7O0lBQzFDLDZDQUFrQzs7Ozs7SUFDbEMsNENBQWdDOzs7OztJQUNoQyx1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgc3RyRW51bSB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3Rvci1sYXllcic7XHJcbmltcG9ydCB7IEFueUxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9hbnktbGF5ZXInO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgaGFuZGxlRmlsZUV4cG9ydEVycm9yLFxyXG4gIGhhbmRsZUZpbGVFeHBvcnRTdWNjZXNzXHJcbn0gZnJvbSAnLi4vc2hhcmVkL2V4cG9ydC51dGlscyc7XHJcbmltcG9ydCB7IEV4cG9ydE9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEV4cG9ydEZvcm1hdCB9IGZyb20gJy4uL3NoYXJlZC9leHBvcnQudHlwZSc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvZXhwb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2ltcG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyxcclxuICBoYW5kbGVGaWxlSW1wb3J0RXJyb3JcclxufSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnV0aWxzJztcclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHlsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtbGlzdC9zdHlsZS1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXRUYWJDaGFuZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgc2tpcFdoaWxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28taW1wb3J0LWV4cG9ydCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ltcG9ydC1leHBvcnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ltcG9ydC1leHBvcnQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1wb3J0RXhwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIGZvcm1hdHMkID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBleHBvcnRhYmxlTGF5ZXJzJDogQmVoYXZpb3JTdWJqZWN0PEFueUxheWVyW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgIFtdXHJcbiAgKTtcclxuICBwdWJsaWMgaW5wdXRQcm9qOiBzdHJpbmcgPSAnRVBTRzo0MzI2JztcclxuICBwdWJsaWMgbG9hZGluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuICBwdWJsaWMgZm9yY2VOYW1pbmcgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcnMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZXhwb3J0YWJsZUxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBmb3JtYXRzJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGZvcm1MYXllciQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBleHBvcnRPcHRpb25zJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBlc3BnQ29kZVJlZ2V4ID0gbmV3IFJlZ0V4cCgnXlxcXFxkezQsNn0nKTtcclxuICBwcml2YXRlIGNsaWVudFNpZGVGaWxlU2l6ZU1heDogbnVtYmVyO1xyXG4gIHB1YmxpYyBhY3RpdmVJbXBvcnRFeHBvcnQ6IHN0cmluZyA9ICdpbXBvcnQnO1xyXG4gIHB1YmxpYyBmaWxlU2l6ZU1iOiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgcHJldmlvdXNMYXllclNwZWNzJDogQmVoYXZpb3JTdWJqZWN0PFxyXG4gICAge1xyXG4gICAgICBpZDogc3RyaW5nO1xyXG4gICAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgICBvcGFjaXR5OiBudW1iZXI7XHJcbiAgICAgIHF1ZXJ5YWJsZTogYm9vbGVhbjtcclxuICAgIH1bXVxyXG4gID4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRUYWJJbmRleCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICBASW5wdXQoKSBleHBvcnRPcHRpb25zJDogQmVoYXZpb3JTdWJqZWN0PEV4cG9ydE9wdGlvbnM+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgIHVuZGVmaW5lZFxyXG4gICk7XHJcblxyXG4gIEBPdXRwdXQoKSBleHBvcnRPcHRpb25zQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxFeHBvcnRPcHRpb25zPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaW1wb3J0U2VydmljZTogSW1wb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXhwb3J0U2VydmljZTogRXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVMaXN0U2VydmljZTogU3R5bGVMaXN0U2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmxvYWRDb25maWcoKTtcclxuICAgIHRoaXMuYnVpbGRGb3JtKCk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmxheWVycyQkID0gdGhpcy5tYXAubGF5ZXJzJC5zdWJzY3JpYmUoKGxheWVycykgPT4ge1xyXG4gICAgICB0aGlzLmV4cG9ydGFibGVMYXllcnMkLm5leHQoXHJcbiAgICAgICAgbGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAobGF5ZXIgaW5zdGFuY2VvZiBWZWN0b3JMYXllciAmJiBsYXllci5leHBvcnRhYmxlID09PSB0cnVlKSB8fFxyXG4gICAgICAgICAgICAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkICYmXHJcbiAgICAgICAgICAgICAgbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkLnVybClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSkgYXMgQW55TGF5ZXJbXVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjb25maWdGaWxlU2l6ZU1iID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKFxyXG4gICAgICAnaW1wb3J0RXhwb3J0LmNsaWVudFNpZGVGaWxlU2l6ZU1heE1iJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuY2xpZW50U2lkZUZpbGVTaXplTWF4ID1cclxuICAgICAgKGNvbmZpZ0ZpbGVTaXplTWIgPyBjb25maWdGaWxlU2l6ZU1iIDogMzApICogTWF0aC5wb3coMTAyNCwgMik7XHJcbiAgICB0aGlzLmZpbGVTaXplTWIgPSB0aGlzLmNsaWVudFNpZGVGaWxlU2l6ZU1heCAvIE1hdGgucG93KDEwMjQsIDIpO1xyXG5cclxuICAgIHRoaXMuZXhwb3J0T3B0aW9ucyQkID0gdGhpcy5leHBvcnRPcHRpb25zJFxyXG4gICAgICAucGlwZShza2lwV2hpbGUoKGV4cG9ydE9wdGlvbnMpID0+ICFleHBvcnRPcHRpb25zKSlcclxuICAgICAgLnN1YnNjcmliZSgoZXhwb3J0T3B0aW9ucykgPT4ge1xyXG4gICAgICAgIHRoaXMuZm9ybS5wYXRjaFZhbHVlKGV4cG9ydE9wdGlvbnMsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChleHBvcnRPcHRpb25zLmxheWVyKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbXB1dGVGb3JtYXRzKFxyXG4gICAgICAgICAgICBleHBvcnRPcHRpb25zLmxheWVyLm1hcCgobCkgPT4gdGhpcy5tYXAuZ2V0TGF5ZXJCeUlkKGwpKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZm9ybUxheWVyJCQgPSB0aGlzLmZvcm1cclxuICAgICAgLmdldCgnbGF5ZXInKVxyXG4gICAgICAudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgobGF5ZXJJZCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUHJldmlvdXNMYXllclNwZWNzKCk7XHJcbiAgICAgICAgY29uc3QgbGF5ZXJzID0gbGF5ZXJJZC5tYXAoKGwpID0+IHRoaXMubWFwLmdldExheWVyQnlJZChsKSk7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlRm9ybWF0cyhsYXllcnMpO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1hdHMkLnZhbHVlKS5pbmRleE9mKHRoaXMuZm9ybS52YWx1ZS5mb3JtYXQpID09PVxyXG4gICAgICAgICAgLTFcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMuZm9ybS5wYXRjaFZhbHVlKHsgZm9ybWF0OiB1bmRlZmluZWQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNTcGVjczoge1xyXG4gICAgICAgICAgaWQ6IHN0cmluZztcclxuICAgICAgICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICAgICAgICBvcGFjaXR5OiBudW1iZXI7XHJcbiAgICAgICAgICBxdWVyeWFibGU6IGJvb2xlYW47XHJcbiAgICAgICAgfVtdID0gW107XHJcbiAgICAgICAgbGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGxheWVyIGluc3RhbmNlb2YgVmVjdG9yTGF5ZXIgJiZcclxuICAgICAgICAgICAgbGF5ZXIuZGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlcygpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzU3BlY3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgaWQ6IGxheWVyLmlkLFxyXG4gICAgICAgICAgICAgIHZpc2libGU6IGxheWVyLnZpc2libGUsXHJcbiAgICAgICAgICAgICAgb3BhY2l0eTogbGF5ZXIub3BhY2l0eSxcclxuICAgICAgICAgICAgICBxdWVyeWFibGU6IChsYXllciBhcyBhbnkpLnF1ZXJ5YWJsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGF5ZXIub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGxheWVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnByZXZpb3VzTGF5ZXJTcGVjcyQubmV4dChwcmV2aW91c1NwZWNzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5mb3JtYXRzJCQgPSB0aGlzLmZvcm1hdHMkXHJcbiAgICAgIC5waXBlKHNraXBXaGlsZSgoZm9ybWF0cykgPT4gIWZvcm1hdHMpKVxyXG4gICAgICAuc3Vic2NyaWJlKChmb3JtYXRzKSA9PiB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGZvcm1hdHMpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUoeyBmb3JtYXQ6IGZvcm1hdHNbT2JqZWN0LmtleXMoZm9ybWF0cylbMF1dIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5leHBvcnRhYmxlTGF5ZXJzJCQgPSB0aGlzLmV4cG9ydGFibGVMYXllcnMkXHJcbiAgICAgIC5waXBlKHNraXBXaGlsZSgobGF5ZXJzKSA9PiAhbGF5ZXJzKSlcclxuICAgICAgLnN1YnNjcmliZSgobGF5ZXJzKSA9PiB7XHJcbiAgICAgICAgaWYgKGxheWVycy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIHRoaXMuZm9ybS5wYXRjaFZhbHVlKHsgbGF5ZXI6IGxheWVyc1swXS5pZCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxheWVycyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmV4cG9ydGFibGVMYXllcnMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5mb3JtYXRzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZm9ybUxheWVyJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmICh0aGlzLmV4cG9ydE9wdGlvbnMkJCkge1xyXG4gICAgICB0aGlzLmV4cG9ydE9wdGlvbnMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5leHBvcnRPcHRpb25zQ2hhbmdlLmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcclxuICAgIHRoaXMuaGFuZGxlUHJldmlvdXNMYXllclNwZWNzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVByZXZpb3VzTGF5ZXJTcGVjcygpIHtcclxuICAgIGNvbnN0IHByZXZpb3VzU3BlY3MgPSB0aGlzLnByZXZpb3VzTGF5ZXJTcGVjcyQudmFsdWU7XHJcbiAgICBpZiAocHJldmlvdXNTcGVjcyAmJiBwcmV2aW91c1NwZWNzLmxlbmd0aCkge1xyXG4gICAgICBwcmV2aW91c1NwZWNzLmZvckVhY2goKHNwZWNzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNMYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZChzcGVjcy5pZCk7XHJcbiAgICAgICAgcHJldmlvdXNMYXllci52aXNpYmxlID0gc3BlY3MudmlzaWJsZTtcclxuICAgICAgICBwcmV2aW91c0xheWVyLm9wYWNpdHkgPSBzcGVjcy5vcGFjaXR5O1xyXG4gICAgICAgIChwcmV2aW91c0xheWVyIGFzIGFueSkucXVlcnlhYmxlID0gc3BlY3MucXVlcnlhYmxlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMucHJldmlvdXNMYXllclNwZWNzJC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBpbXBvcnRGaWxlcyhmaWxlczogRmlsZVtdKSB7XHJcbiAgICBsZXQgaW5wdXRQcm9qID0gdGhpcy5pbnB1dFByb2o7XHJcbiAgICBpZiAodGhpcy5lc3BnQ29kZVJlZ2V4LnRlc3QoaW5wdXRQcm9qKSkge1xyXG4gICAgICBpbnB1dFByb2ogPSBgRVBTRzoke2lucHV0UHJvan1gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcclxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xyXG4gICAgICB0aGlzLmltcG9ydFNlcnZpY2UuaW1wb3J0KGZpbGUsIGlucHV0UHJvaikuc3Vic2NyaWJlKFxyXG4gICAgICAgIChmZWF0dXJlczogRmVhdHVyZVtdKSA9PiB0aGlzLm9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMpLFxyXG4gICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlSW1wb3J0RXJyb3IoZmlsZSwgZXJyb3IpLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXhwb3J0Rm9ybVN1Ym1pdChkYXRhOiBFeHBvcnRPcHRpb25zKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XHJcbiAgICBkYXRhLmxheWVyLmZvckVhY2goKGxheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxheSA9IHRoaXMubWFwLmdldExheWVyQnlJZChsYXllcik7XHJcbiAgICAgIGxldCBmaWxlbmFtZSA9IGxheS50aXRsZTtcclxuICAgICAgaWYgKGRhdGEubmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmlsZW5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZFNPcHRpb25zOiBEYXRhU291cmNlT3B0aW9ucyA9IGxheS5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBkYXRhLmZvcm1hdCA9PT0gRXhwb3J0Rm9ybWF0LlVSTCAmJlxyXG4gICAgICAgIGRTT3B0aW9ucy5kb3dubG9hZCAmJlxyXG4gICAgICAgIGRTT3B0aW9ucy5kb3dubG9hZC51cmxcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvLyBiZXR0ZXIgbG9vayBhbiBmZWVsXHJcbiAgICAgICAgICB3aW5kb3cub3BlbihkU09wdGlvbnMuZG93bmxvYWQudXJsLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgb2xGZWF0dXJlcztcclxuICAgICAgaWYgKGRhdGEuZmVhdHVyZUluTWFwRXh0ZW50KSB7XHJcbiAgICAgICAgb2xGZWF0dXJlcyA9IGxheS5kYXRhU291cmNlLm9sLmdldEZlYXR1cmVzSW5FeHRlbnQoXHJcbiAgICAgICAgICBsYXkubWFwLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvbEZlYXR1cmVzID0gbGF5LmRhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZXMoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobGF5LmRhdGFTb3VyY2UgaW5zdGFuY2VvZiBDbHVzdGVyRGF0YVNvdXJjZSkge1xyXG4gICAgICAgIG9sRmVhdHVyZXMgPSBvbEZlYXR1cmVzLmZsYXRNYXAoKGNsdXN0ZXI6IGFueSkgPT5cclxuICAgICAgICAgIGNsdXN0ZXIuZ2V0KCdmZWF0dXJlcycpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5leHBvcnRTZXJ2aWNlXHJcbiAgICAgICAgLmV4cG9ydChvbEZlYXR1cmVzLCBkYXRhLmZvcm1hdCwgZmlsZW5hbWUsIHRoaXMubWFwLnByb2plY3Rpb24pXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICgpID0+IHt9LFxyXG4gICAgICAgICAgKGVycm9yOiBFcnJvcikgPT4gdGhpcy5vbkZpbGVFeHBvcnRFcnJvcihlcnJvciksXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25GaWxlRXhwb3J0U3VjY2VzcygpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRGb3JtKCkge1xyXG4gICAgaWYgKHRoaXMuZm9yY2VOYW1pbmcpIHtcclxuICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgZm9ybWF0OiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sXHJcbiAgICAgICAgbGF5ZXI6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgICBmZWF0dXJlSW5NYXBFeHRlbnQ6IFtmYWxzZSwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgICBuYW1lOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICBmb3JtYXQ6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXSxcclxuICAgICAgICBsYXllcjogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dLFxyXG4gICAgICAgIGZlYXR1cmVJbk1hcEV4dGVudDogW2ZhbHNlLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGU6IEZpbGUsIGZlYXR1cmVzOiBGZWF0dXJlW10pIHtcclxuICAgIGlmICghdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRXaXRoU3R5bGUnKSkge1xyXG4gICAgICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhcclxuICAgICAgICBmaWxlLFxyXG4gICAgICAgIGZlYXR1cmVzLFxyXG4gICAgICAgIHRoaXMubWFwLFxyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UsXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2VcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKFxyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgZmVhdHVyZXMsXHJcbiAgICAgICAgdGhpcy5tYXAsXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZSxcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZSxcclxuICAgICAgICB0aGlzLnN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgICAgICAgdGhpcy5zdHlsZVNlcnZpY2VcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlSW1wb3J0RXJyb3IoZmlsZTogRmlsZSwgZXJyb3I6IEVycm9yKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKFxyXG4gICAgICBmaWxlLFxyXG4gICAgICBlcnJvcixcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZSxcclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UsXHJcbiAgICAgIHRoaXMuZmlsZVNpemVNYlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlRXhwb3J0RXJyb3IoZXJyb3I6IEVycm9yKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgaGFuZGxlRmlsZUV4cG9ydEVycm9yKGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRDb25maWcoKSB7XHJcbiAgICBpZiAodGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQuZm9yY2VOYW1pbmcnKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZm9yY2VOYW1pbmcgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydEV4cG9ydC5mb3JjZU5hbWluZycpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb21wdXRlRm9ybWF0cygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlRm9ybWF0cyhsYXllcnM/OiBBbnlMYXllcltdKSB7XHJcbiAgICBpZiAobGF5ZXJzICYmIGxheWVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgZm9ybWF0c1R5cGUgPSB7XHJcbiAgICAgICAgb25seVVybDogZmFsc2UsXHJcbiAgICAgICAgb25seVZlY3RvcjogZmFsc2UsXHJcbiAgICAgICAgdmVjdG9yQW5kVXJsOiBmYWxzZVxyXG4gICAgICB9O1xyXG4gICAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IHtcclxuICAgICAgICBpZiAoIWxheWVyKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICEobGF5ZXIgaW5zdGFuY2VvZiBWZWN0b3JMYXllcikgJiZcclxuICAgICAgICAgIGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5kb3dubG9hZCAmJlxyXG4gICAgICAgICAgbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkLnVybFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgZm9ybWF0c1R5cGUub25seVVybCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgIGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5kb3dubG9hZCAmJlxyXG4gICAgICAgICAgbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkLnVybFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgZm9ybWF0c1R5cGUudmVjdG9yQW5kVXJsID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxheWVyIGluc3RhbmNlb2YgVmVjdG9yTGF5ZXIpIHtcclxuICAgICAgICAgIGZvcm1hdHNUeXBlLm9ubHlWZWN0b3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZm9ybWF0c1R5cGUub25seVVybCA9PT0gdHJ1ZSAmJiBmb3JtYXRzVHlwZS5vbmx5VmVjdG9yID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0cyQubmV4dChzdHJFbnVtKFsnVVJMJ10pKTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICBmb3JtYXRzVHlwZS5vbmx5VmVjdG9yID09PSB0cnVlICYmXHJcbiAgICAgICAgZm9ybWF0c1R5cGUub25seVVybCA9PT0gZmFsc2VcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlRm9ybWF0cygpOyAvLyByZXNldFxyXG4gICAgICAgIGlmIChFeHBvcnRGb3JtYXQuVVJMIGluIHRoaXMuZm9ybWF0cyQudmFsdWUpIHtcclxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmZvcm1hdHMkLnZhbHVlKS5maWx0ZXIoXHJcbiAgICAgICAgICAgIChrZXkpID0+IGtleSAhPT0gJ1VSTCdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmZvcm1hdHMkLm5leHQoc3RyRW51bShrZXlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGZvcm1hdHNUeXBlLnZlY3RvckFuZFVybCA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgIGZvcm1hdHNUeXBlLm9ubHlVcmwgPT09IGZhbHNlICYmXHJcbiAgICAgICAgZm9ybWF0c1R5cGUub25seVZlY3RvciA9PT0gZmFsc2VcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlRm9ybWF0cygpOyAvLyByZXNldFxyXG4gICAgICAgIGlmICghKEV4cG9ydEZvcm1hdC5VUkwgaW4gdGhpcy5mb3JtYXRzJC52YWx1ZSkpIHtcclxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmZvcm1hdHMkLnZhbHVlKTtcclxuICAgICAgICAgIGtleXMucHVzaCgnVVJMJyk7XHJcbiAgICAgICAgICB0aGlzLmZvcm1hdHMkLm5leHQoc3RyRW51bShrZXlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0cyQubmV4dChbXSk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hbGVydChcclxuICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAnaWdvLmdlby5leHBvcnQubm9Gb3JtYXQudGV4dCdcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgJ2lnby5nZW8uZXhwb3J0Lm5vRm9ybWF0LnRpdGxlJ1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydEV4cG9ydC5mb3JtYXRzJykgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCB2YWxpZGF0ZWRMaXN0Rm9ybWF0ID0gdGhpcy52YWxpZGF0ZUxpc3RGb3JtYXQoXHJcbiAgICAgICAgdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQuZm9ybWF0cycpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZm9ybWF0cyQubmV4dChzdHJFbnVtKHZhbGlkYXRlZExpc3RGb3JtYXQpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybWF0cyQubmV4dChFeHBvcnRGb3JtYXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZGF0ZUxpc3RGb3JtYXQoZm9ybWF0czogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gZm9ybWF0c1xyXG4gICAgICAuZmlsdGVyKChmb3JtYXQpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBmb3JtYXQudG9VcHBlckNhc2UoKSA9PT0gRXhwb3J0Rm9ybWF0LkNTVmNvbW1hLnRvVXBwZXJDYXNlKCkgfHxcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuQ1NWc2VtaWNvbG9uLnRvVXBwZXJDYXNlKCkgfHxcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuR01MLnRvVXBwZXJDYXNlKCkgfHxcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuR1BYLnRvVXBwZXJDYXNlKCkgfHxcclxuICAgICAgICAgIGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuR2VvSlNPTi50b1VwcGVyQ2FzZSgpIHx8XHJcbiAgICAgICAgICBmb3JtYXQudG9VcHBlckNhc2UoKSA9PT0gRXhwb3J0Rm9ybWF0LktNTC50b1VwcGVyQ2FzZSgpIHx8XHJcbiAgICAgICAgICBmb3JtYXQudG9VcHBlckNhc2UoKSA9PT0gRXhwb3J0Rm9ybWF0LlNoYXBlZmlsZS50b1VwcGVyQ2FzZSgpIHx8XHJcbiAgICAgICAgICBmb3JtYXQudG9VcHBlckNhc2UoKSA9PT0gRXhwb3J0Rm9ybWF0LlVSTC50b1VwcGVyQ2FzZSgpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLm1hcCgoZm9ybWF0KSA9PiB7XHJcbiAgICAgICAgaWYgKGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuQ1NWY29tbWEudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgZm9ybWF0ID0gRXhwb3J0Rm9ybWF0LkNTVmNvbW1hO1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuQ1NWc2VtaWNvbG9uLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IEV4cG9ydEZvcm1hdC5DU1ZzZW1pY29sb247XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm9ybWF0LnRvVXBwZXJDYXNlKCkgPT09IEV4cG9ydEZvcm1hdC5HTUwudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgZm9ybWF0ID0gRXhwb3J0Rm9ybWF0LkdNTDtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3JtYXQudG9VcHBlckNhc2UoKSA9PT0gRXhwb3J0Rm9ybWF0LkdQWC50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBFeHBvcnRGb3JtYXQuR1BYO1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuR2VvSlNPTi50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBFeHBvcnRGb3JtYXQuR2VvSlNPTjtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3JtYXQudG9VcHBlckNhc2UoKSA9PT0gRXhwb3J0Rm9ybWF0LktNTC50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICBmb3JtYXQgPSBFeHBvcnRGb3JtYXQuS01MO1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuU2hhcGVmaWxlLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IEV4cG9ydEZvcm1hdC5TaGFwZWZpbGU7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZvcm1hdC50b1VwcGVyQ2FzZSgpID09PSBFeHBvcnRGb3JtYXQuVVJMLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IEV4cG9ydEZvcm1hdC5VUkw7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGFiQ2hhbmdlZCh0YWI6IE1hdFRhYkNoYW5nZUV2ZW50KSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFiSW5kZXguZW1pdCh0YWIuaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVFeHBvcnRTdWNjZXNzKCkge1xyXG4gICAgaGFuZGxlRmlsZUV4cG9ydFN1Y2Nlc3ModGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgb25JbXBvcnRFeHBvcnRDaGFuZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMuYWN0aXZlSW1wb3J0RXhwb3J0ID0gZXZlbnQudmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==