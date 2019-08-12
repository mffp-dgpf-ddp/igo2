import { Watcher } from '@igo2/utils';
import { TileLayer } from '../shared/layers/tile-layer';
export declare class TileWatcher extends Watcher {
    private id;
    private loaded;
    private loading;
    private source;
    constructor(layer: TileLayer);
    protected watch(): void;
    protected unwatch(): void;
    private handleLoadStart;
    private handleLoadEnd;
}
