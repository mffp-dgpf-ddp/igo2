import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PrintOptions } from '../shared/print.interface';
import { PrintOutputFormat, PrintPaperFormat, PrintOrientation, PrintResolution, PrintSaveImageFormat } from '../shared/print.type';
export declare class PrintFormComponent implements OnInit {
    private formBuilder;
    form: FormGroup;
    submitted: boolean;
    outputFormats: {
        Pdf: "Pdf";
        Image: "Image";
    };
    paperFormats: {
        A0: "A0";
        A1: "A1";
        A2: "A2";
        A3: "A3";
        A4: "A4";
        A5: "A5";
        Letter: "Letter";
        Legal: "Legal";
    };
    orientations: {
        landscape: "landscape";
        portrait: "portrait";
    };
    resolutions: {
        "72": "72";
        "96": "96";
        "150": "150";
        "300": "300";
    };
    imageFormats: {
        Bmp: "Bmp";
        Gif: "Gif";
        Jpeg: "Jpeg";
        Png: "Png";
        Tiff: "Tiff";
    };
    isPrintService: boolean;
    disabled: boolean;
    private _disabled;
    imageFormat: PrintSaveImageFormat;
    outputFormat: PrintOutputFormat;
    paperFormat: PrintPaperFormat;
    orientation: PrintOrientation;
    resolution: PrintResolution;
    title: string;
    comment: string;
    showProjection: boolean;
    showScale: boolean;
    showLegend: boolean;
    doZipFile: boolean;
    readonly outputFormatField: FormControl;
    readonly paperFormatField: FormControl;
    readonly imageFormatField: FormControl;
    readonly orientationField: FormControl;
    readonly resolutionField: FormControl;
    readonly commentField: FormControl;
    readonly showProjectionField: FormControl;
    readonly showScaleField: FormControl;
    readonly showLegendField: FormControl;
    readonly doZipFileField: FormControl;
    readonly titleField: FormControl;
    submit: EventEmitter<PrintOptions>;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    handleFormSubmit(data: PrintOptions, isValid: boolean): void;
    toggleImageSaveProp(): void;
}
