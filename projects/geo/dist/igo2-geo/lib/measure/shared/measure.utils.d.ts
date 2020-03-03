import { LanguageService } from '@igo2/core';
import * as olstyle from 'ol/style';
import OlGeometry from 'ol/geom/Geometry';
import OlPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';
import OlOverlay from 'ol/Overlay';
import { Measure } from './measure.interfaces';
import { MeasureAreaUnit, MeasureLengthUnit } from './measure.enum';
/**
 * Convert value from meters to kilometers
 * @param value Value in meters
 * @returns Value in kilometers
 */
export declare function metersToKilometers(value: number): number;
/**
 * Convert value from meters to feet
 * @param value Value in meters
 * @returns Value in feet
 */
export declare function metersToFeet(value: number): number;
/**
 * Convert value from meters to miles
 * @param value Value in meters
 * @returns Value in miles
 */
export declare function metersToMiles(value: number): number;
/**
 * Convert value from square meters to square kilometers
 * @param value Value in square meters
 * @returns Value in square kilometers
 */
export declare function squareMetersToSquareKilometers(value: number): number;
/**
 * Convert value from square meters to square miles
 * @param value Value in square meters
 * @returns Value in square miles
 */
export declare function squareMetersToSquareMiles(value: number): number;
/**
 * Convert value from square meters to square feet
 * @param value Value in square meters
 * @returns Value in square feet
 */
export declare function squareMetersToSquareFeet(value: number): number;
/**
 * Convert value from square meters to hectares
 * @param value Value in square meters
 * @returns Value in hectares
 */
export declare function squareMetersToHectares(value: number): number;
/**
 * Convert value from square meters to acres
 * @param value Value in square meters
 * @returns Value in acres
 */
export declare function squareMetersToAcres(value: number): number;
/**
 * Convert value from meters to the specified length unit
 * @param value Value in meters
 * @param unit Length unit
 * @returns Value in unit
 */
export declare function metersToUnit(value: number, unit: MeasureLengthUnit): number | undefined;
/**
 * Convert value from square meters to the specified area unit
 * @param value Value in meters
 * @param unit Area unit
 * @returns Value in unit
 */
export declare function squareMetersToUnit(value: number, unit: MeasureAreaUnit): number | undefined;
/**
 * This method format a measure to a readable format
 * @param measure Measure
 * @param options Formatting options
 * @returns Formatted measure
 */
export declare function formatMeasure(measure: number, options?: {
    decimal?: number;
    unit?: MeasureAreaUnit | MeasureLengthUnit;
    unitAbbr?: boolean;
    locale?: string;
}, languageService?: LanguageService): string;
/**
 * Compute best length measure unit for a given measure in meters
 * @param value Value in meters
 * @returns Measure unit
 */
export declare function computeBestLengthUnit(value: number): MeasureLengthUnit;
/**
 * Compute best length measure unit for a given measure in square meters
 * @param value Value in meters
 * @returns Measure unit
 */
export declare function computeBestAreaUnit(value: number): MeasureAreaUnit;
/**
 * Create a default style for a measure interaction
 * @returns OL style
 */
export declare function createMeasureInteractionStyle(): olstyle.Style;
/**
 * Create a default style for a measure layer
 * @returns OL style
 */
export declare function createMeasureLayerStyle(): olstyle.Style;
/**
 * Compute the length in meters of an OL geometry with a given projection
 * @param olGeometry Ol geometry
 * @param projection olGeometry's projection
 * @returns Length in meters
 */
export declare function measureOlGeometryLength(olGeometry: OlGeometry, projection: string): number | undefined;
/**
 * Compute the area in square meters of an OL geometry with a given projection
 * @param olGeometry Ol geometry
 * @param projection olGeometry's projection
 * @returns Area in square meters
 */
export declare function measureOlGeometryArea(olGeometry: OlGeometry, projection: string): number | undefined;
/**
 * Compute the area (square meters), length (meters) and last length (meters)
 * of an OL geometry with a given projection.
 * @param olGeometry Ol geometry
 * @param projection olGeometry's projection
 * @returns Computed measure
 */
export declare function measureOlGeometry(olGeometry: OlGeometry, projection: string): Measure;
/**
 * Update an OL geometry midpoints and return an array of those points
 * @param olGeometry OL Geometry
 * @returns OL points
 */
export declare function updateOlGeometryMidpoints(olGeometry: OlLineString | OlPolygon): OlPoint[];
/**
 * Clear an OL geometry midpoints and return an array of those points
 * @param olGeometry OL Geometry
 */
export declare function clearOlGeometryMidpoints(olGeometry: OlLineString | OlPolygon): any;
/**
 * Add an OL overlay at each midpoint and return an array of those overlays
 * @param olGeometry OL Geometry
 * @returns OL overlays
 */
export declare function updateOlTooltipsAtMidpoints(olGeometry: OlLineString | OlPolygon): OlOverlay[];
/**
 * Return an array of OL overlay at midspoints, if any
 * @param olGeometry OL Geometry
 * @returns OL overlays
 */
export declare function getOlTooltipsAtMidpoints(olGeometry: OlLineString | OlPolygon): OlOverlay[];
/**
 * Update an OL geometry center and return it
 * @param olGeometry OL Geometry
 * @returns OL point
 */
export declare function updateOlGeometryCenter(olGeometry: OlLineString | OlPolygon): OlPoint;
/**
 * Add an OL overlay at the center of a geometry and return that overlay
 * @param olGeometry OL Geometry
 * @returns OL overlay
 */
export declare function updateOlTooltipAtCenter(olGeometry: OlLineString | OlPolygon): OlOverlay;
/**
 * Return an array of OL overlay at midspoints, if any
 * @param olGeometry OL Geometry
 * @returns OL overlays
 */
export declare function getOlTooltipAtCenter(olGeometry: OlLineString | OlPolygon): OlOverlay;
/**
 * Get all the tooltips of an OL geometry
 * @param olGeometry OL Geometry
 * @returns OL overlays
 */
export declare function getTooltipsOfOlGeometry(olGeometry: OlLineString | OlPolygon): OlOverlay[];
/**
 * Create an OL overlay at a point and bind the overlay to the point
 * @param olPoint OL Point
 * @returns OL overlay
 */
export declare function createOlTooltipAtPoint(olPoint: OlPoint): OlOverlay;
