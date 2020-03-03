import { Layer } from '../../layer/shared/layers/layer';
import { MetadataOptions, MetadataLayerOptions } from '../shared/metadata.interface';
import { MetadataService } from '../shared/metadata.service';
export declare class MetadataButtonComponent {
    private metadataService;
    layer: Layer;
    private _layer;
    color: string;
    private _color;
    constructor(metadataService: MetadataService);
    openMetadata(metadata: MetadataOptions): void;
    readonly options: MetadataLayerOptions;
}
