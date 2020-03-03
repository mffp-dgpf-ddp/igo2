import { Watcher } from '@igo2/utils';
import { VectorLayer } from '../shared/layers/vector-layer';
export declare class VectorWatcher extends Watcher {
    private id;
    private loaded;
    private loading;
    private layer;
    constructor(layer: VectorLayer);
    protected watch(): void;
    protected unwatch(): void;
}
