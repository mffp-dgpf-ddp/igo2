import { Layer } from '../../layer/shared/layers/layer';
import { DownloadDataSourceOptions } from '../shared/download.interface';
import { DownloadService } from '../shared/download.service';
export declare class DownloadButtonComponent {
    private downloadService;
    layer: Layer;
    private _layer;
    color: string;
    private _color;
    constructor(downloadService: DownloadService);
    openDownload(layer: Layer): void;
    readonly options: DownloadDataSourceOptions;
}
