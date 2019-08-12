import * as olstyle from 'ol/style';
import { VectorLayer } from '../../layer';
/**
 * Create an overlay layer and it's source
 * @returns Overlay layer
 */
export declare function createOverlayLayer(): VectorLayer;
/**
 * Create a marker style for points
 * @returns Style
 */
export declare function createOverlayMarkerStyle(color?: string): olstyle.Style;
