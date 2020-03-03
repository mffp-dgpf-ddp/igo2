import { IgoMap } from '../../map/shared/map';
import { PrintOptions } from '../shared/print.interface';
import { PrintOutputFormat, PrintPaperFormat, PrintOrientation, PrintResolution, PrintSaveImageFormat } from '../shared/print.type';
import { PrintService } from '../shared/print.service';
export declare class PrintComponent {
    private printService;
    disabled: boolean;
    map: IgoMap;
    private _map;
    outputFormat: PrintOutputFormat;
    private _outputFormat;
    paperFormat: PrintPaperFormat;
    private _paperFormat;
    orientation: PrintOrientation;
    private _orientation;
    imageFormat: PrintSaveImageFormat;
    private _imageFormat;
    resolution: PrintResolution;
    private _resolution;
    constructor(printService: PrintService);
    handleFormSubmit(data: PrintOptions): void;
}
