import OlLayer from 'ol/layer/Layer';
import { AnyLayer } from '../../layer/shared/layers/any-layer';
/**
 * Whether a layer is queryable
 * @param layer Layer
 * @returns True if the layer s squeryable
 */
export declare function layerIsQueryable(layer: AnyLayer): boolean;
/**
 * Whether an OL layer is queryable
 * @param layer Layer
 * @returns True if the ol layer is queryable
 */
export declare function olLayerIsQueryable(olLayer: OlLayer): boolean;
