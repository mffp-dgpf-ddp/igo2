import { Watcher } from '@igo2/utils';
import { ImageLayer } from '../shared/layers/image-layer';
export declare class ImageWatcher extends Watcher {
    protected id: string;
    protected loaded: number;
    protected loading: number;
    private source;
    constructor(layer: ImageLayer);
    protected watch(): void;
    protected unwatch(): void;
    private handleLoadStart;
    private handleLoadEnd;
}
