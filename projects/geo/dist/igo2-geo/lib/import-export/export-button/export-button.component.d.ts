import { Layer } from '../../layer/shared/layers/layer';
import { LayerOptions } from '../../layer';
export declare class ExportButtonComponent {
    layer: Layer;
    private _layer;
    color: string;
    private _color;
    constructor();
    readonly options: LayerOptions;
    layerIsExportable(): boolean;
}
