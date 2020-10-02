import * as olstyle from 'ol/style';
import { VectorLayer } from '../../layer';
/**
 * Create an overlay layer and it's source
 * @returns Overlay layer
 */
export declare function createOverlayLayer(): VectorLayer;
/**
 * Create a basic style for lines and polygons
 * @returns Style
 */
export declare function createOverlayDefaultStyle({ text, fillOpacity, strokeWidth, strokeOpacity, color, strokeColor }?: {
    text?: string;
    fillOpacity?: number;
    strokeWidth?: number;
    strokeOpacity?: number;
    color?: number[];
    strokeColor?: number[];
}): olstyle.Style;
/**
 * Create a marker style for points
 * @returns Style
 */
export declare function createOverlayMarkerStyle({ text, opacity, color, outlineColor }?: {
    text?: string;
    opacity?: number;
    color?: string;
    outlineColor?: string | number[];
}): olstyle.Style;
