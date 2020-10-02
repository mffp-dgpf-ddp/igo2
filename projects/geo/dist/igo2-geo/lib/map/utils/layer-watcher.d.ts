import { Watcher } from '@igo2/utils';
import { Layer } from '../../layer/shared/layers';
export declare class LayerWatcher extends Watcher {
    private loaded;
    private loading;
    private layers;
    private subscriptions;
    constructor();
    watch(): void;
    unwatch(): void;
    watchLayer(layer: Layer): void;
    unwatchLayer(layer: Layer): void;
}
