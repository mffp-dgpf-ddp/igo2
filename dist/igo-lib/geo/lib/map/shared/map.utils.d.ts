import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';
import { MapViewState } from './map.interface';
/**
 * This method extracts a coordinate tuple from a string.
 * @param str Any string
 * @param mapProjection string Map Projection
 * @returns object:
 *             lonLat: Coordinate,
 *             message: Message of error,
 *             radius: radius of the confience of coordinate,
 *             conf: confidence of the coordinate}
 */
export declare function stringToLonLat(str: string, mapProjection: string): {
    lonLat: [number, number] | undefined;
    message: string;
    radius: number | undefined;
    conf: number | undefined;
};
/**
 * Return true of two view states are equal.
 * @param state1 View state
 * @param state2 View state
 * @returns True if the view states are equal
 */
export declare function viewStatesAreEqual(state1: MapViewState, state2: MapViewState): boolean;
/**
 * Format the scale to a human readable text
 * @param Scale of the map
 * @returns Human readable scale text
 */
export declare function formatScale(scale: any): string;
/**
 * Return the resolution from a scale denom
 * @param scale Scale denom
 * @param dpi DPI
 * @returns Resolution
 */
export declare function getResolutionFromScale(scale: number, dpi?: number): number;
/**
 * Return the resolution from a scale denom
 * @param Scale denom
 * @returns Resolution
 */
export declare function getScaleFromResolution(resolution: number, unit?: string, dpi?: number): number;
/**
 * Returns true if the CTRL key is pushed during an Ol MapBrowserPointerEvent
 * @param event OL MapBrowserPointerEvent
 * @returns Whether the CTRL key is pushed
 */
export declare function ctrlKeyDown(event: OlMapBrowserPointerEvent): boolean;
