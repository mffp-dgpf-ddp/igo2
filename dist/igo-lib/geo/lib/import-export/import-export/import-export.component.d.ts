import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService, LanguageService } from '@igo2/core';
import { IgoMap } from '../../map/shared/map';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { ExportOptions } from '../shared/export.interface';
import { ExportService } from '../shared/export.service';
import { ImportService } from '../shared/import.service';
export declare class ImportExportComponent implements OnDestroy, OnInit {
    private importService;
    private exportService;
    private languageService;
    private messageService;
    private formBuilder;
    form: FormGroup;
    formats: {
        GeoJSON: "GeoJSON";
        GML: "GML";
        GPX: "GPX";
        KML: "KML";
        Shapefile: "Shapefile";
    };
    layers: VectorLayer[];
    inputProj: string;
    private layers$$;
    map: IgoMap;
    constructor(importService: ImportService, exportService: ExportService, languageService: LanguageService, messageService: MessageService, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    importFiles(files: File[]): void;
    handleExportFormSubmit(data: ExportOptions): void;
    private buildForm;
    private onFileImportSuccess;
    private onFileImportError;
    private onFileExportError;
}
