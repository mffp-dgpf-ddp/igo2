import { Layer } from '../shared/layers/layer';
import { LayerLegend } from '../shared/layers/layer.interface';
/**
 * Get all the layers legend
 * @return Array of legend
 */
export declare function getLayersLegends(layers: Layer[], scale?: number): LayerLegend[];
