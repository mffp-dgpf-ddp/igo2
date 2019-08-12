/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olstyle from 'ol/style';
import OlPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import OlOverlay from 'ol/Overlay';
import { getCenter as olGetCenter } from 'ol/extent';
import { getLength as olGetLength, getArea as olGetArea } from 'ol/sphere';
import { MeasureAreaUnit, MeasureAreaUnitAbbreviation, MeasureLengthUnit, MeasureLengthUnitAbbreviation } from './measure.enum';
/**
 * Convert value from meters to kilometers
 * @param {?} value Value in meters
 * @return {?} Value in kilometers
 */
export function metersToKilometers(value) {
    return value * 0.001;
}
/**
 * Convert value from meters to feet
 * @param {?} value Value in meters
 * @return {?} Value in feet
 */
export function metersToFeet(value) {
    return value * 3.2808;
}
/**
 * Convert value from meters to miles
 * @param {?} value Value in meters
 * @return {?} Value in miles
 */
export function metersToMiles(value) {
    return value * 0.000621;
}
/**
 * Convert value from square meters to square kilometers
 * @param {?} value Value in square meters
 * @return {?} Value in square kilometers
 */
export function squareMetersToSquareKilometers(value) {
    return value * 0.000001;
}
/**
 * Convert value from square meters to square miles
 * @param {?} value Value in square meters
 * @return {?} Value in square miles
 */
export function squareMetersToSquareMiles(value) {
    return value * 0.0000003861;
}
/**
 * Convert value from square meters to square feet
 * @param {?} value Value in square meters
 * @return {?} Value in square feet
 */
export function squareMetersToSquareFeet(value) {
    return value * 10.764;
}
/**
 * Convert value from square meters to hectares
 * @param {?} value Value in square meters
 * @return {?} Value in hectares
 */
export function squareMetersToHectares(value) {
    return value * 0.0001;
}
/**
 * Convert value from square meters to acres
 * @param {?} value Value in square meters
 * @return {?} Value in acres
 */
export function squareMetersToAcres(value) {
    return value * 0.00024711;
}
/**
 * Convert value from meters to the specified length unit
 * @param {?} value Value in meters
 * @param {?} unit Length unit
 * @return {?} Value in unit
 */
export function metersToUnit(value, unit) {
    /** @type {?} */
    const conversionMapper = new Map([
        [MeasureLengthUnit.Meters, (/**
             * @param {?} val
             * @return {?}
             */
            (val) => val)],
        [MeasureLengthUnit.Kilometers, metersToKilometers],
        [MeasureLengthUnit.Miles, metersToMiles],
        [MeasureLengthUnit.Feet, metersToFeet],
    ]);
    /** @type {?} */
    const conversion = conversionMapper.get(unit);
    return conversion ? conversion(value) : undefined;
}
/**
 * Convert value from square meters to the specified area unit
 * @param {?} value Value in meters
 * @param {?} unit Area unit
 * @return {?} Value in unit
 */
export function squareMetersToUnit(value, unit) {
    /** @type {?} */
    const conversionMapper = new Map([
        [MeasureAreaUnit.SquareMeters, (/**
             * @param {?} val
             * @return {?}
             */
            (val) => val)],
        [MeasureAreaUnit.SquareKilometers, squareMetersToSquareKilometers],
        [MeasureAreaUnit.SquareMiles, squareMetersToSquareMiles],
        [MeasureAreaUnit.SquareFeet, squareMetersToSquareFeet],
        [MeasureAreaUnit.Hectares, squareMetersToHectares],
        [MeasureAreaUnit.Acres, squareMetersToAcres],
    ]);
    /** @type {?} */
    const conversion = conversionMapper.get(unit);
    return conversion ? conversion(value) : undefined;
}
/**
 * This method format a measure to a readable format
 * @param {?} measure Measure
 * @param {?=} options Formatting options
 * @return {?} Formatted measure
 */
export function formatMeasure(measure, options) {
    /** @type {?} */
    let decimal = options.decimal;
    if (decimal === undefined || decimal < 0) {
        decimal = 1;
    }
    /** @type {?} */
    const parts = [];
    if (options.locale !== undefined) {
        parts.push(measure.toLocaleString(options.locale, {
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal
        }));
    }
    else {
        parts.push(measure.toFixed(decimal).toString());
    }
    if (options.unit !== undefined && options.unitAbbr === true) {
        parts.push(MeasureLengthUnitAbbreviation[options.unit] ||
            MeasureAreaUnitAbbreviation[options.unit]);
    }
    return parts.filter((/**
     * @param {?} p
     * @return {?}
     */
    p => p !== undefined)).join(' ');
}
/**
 * Compute best length measure unit for a given measure in meters
 * @param {?} value Value in meters
 * @return {?} Measure unit
 */
export function computeBestLengthUnit(value) {
    /** @type {?} */
    let unit = MeasureLengthUnit.Meters;
    /** @type {?} */
    let converted = value;
    /** @type {?} */
    const possibleUnits = [MeasureLengthUnit.Kilometers];
    while (converted > 1000 && possibleUnits.length > 0) {
        unit = possibleUnits.pop();
        converted = metersToUnit(value, unit);
    }
    return unit;
}
/**
 * Compute best length measure unit for a given measure in square meters
 * @param {?} value Value in meters
 * @return {?} Measure unit
 */
export function computeBestAreaUnit(value) {
    /** @type {?} */
    let unit = MeasureAreaUnit.SquareMeters;
    /** @type {?} */
    let converted = value;
    /** @type {?} */
    const possibleUnits = [MeasureAreaUnit.SquareKilometers];
    while (converted > 1000000 && possibleUnits.length > 0) {
        unit = possibleUnits.pop();
        converted = squareMetersToUnit(value, unit);
    }
    return unit;
}
/**
 * Create a default style for a measure interaction
 * @return {?} OL style
 */
export function createMeasureInteractionStyle() {
    return new olstyle.Style({
        stroke: new olstyle.Stroke({
            color: '#ffcc33',
            lineDash: [10, 10],
            width: 2
        }),
        fill: new olstyle.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        image: new olstyle.Circle({
            radius: 5,
            stroke: new olstyle.Stroke({
                color: '#ffcc33',
            }),
            fill: new olstyle.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            })
        })
    });
}
/**
 * Create a default style for a measure layer
 * @return {?} OL style
 */
export function createMeasureLayerStyle() {
    return new olstyle.Style({
        stroke: new olstyle.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        fill: new olstyle.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        })
    });
}
/**
 * Compute the length in meters of an OL geometry with a given projection
 * @param {?} olGeometry Ol geometry
 * @param {?} projection olGeometry's projection
 * @return {?} Length in meters
 */
export function measureOlGeometryLength(olGeometry, projection) {
    if (olGeometry instanceof OlPoint) {
        return undefined;
    }
    if (olGeometry.getFlatCoordinates().length === 0) {
        return undefined;
    }
    return olGetLength(olGeometry, { projection });
}
/**
 * Compute the area in square meters of an OL geometry with a given projection
 * @param {?} olGeometry Ol geometry
 * @param {?} projection olGeometry's projection
 * @return {?} Area in square meters
 */
export function measureOlGeometryArea(olGeometry, projection) {
    if (olGeometry instanceof OlPoint || olGeometry instanceof OlLineString) {
        return undefined;
    }
    if (olGeometry.getFlatCoordinates().length === 0) {
        return undefined;
    }
    return olGetArea(olGeometry, { projection });
}
/**
 * Compute the area (square meters), length (meters) and last length (meters)
 * of an OL geometry with a given projection.
 * @param {?} olGeometry Ol geometry
 * @param {?} projection olGeometry's projection
 * @return {?} Computed measure
 */
export function measureOlGeometry(olGeometry, projection) {
    /** @type {?} */
    const length = measureOlGeometryLength(olGeometry, projection);
    /** @type {?} */
    const area = measureOlGeometryArea(olGeometry, projection);
    /** @type {?} */
    const lengths = [];
    /** @type {?} */
    const coordinates = olGeometry.flatCoordinates;
    /** @type {?} */
    const coordinatesLength = coordinates.length;
    for (let i = 0; i <= coordinatesLength - 4; i += 2) {
        /** @type {?} */
        const olSegment = new OlLineString([
            [coordinates[i], coordinates[i + 1]],
            [coordinates[i + 2], coordinates[i + 3]]
        ]);
        lengths.push(measureOlGeometryLength(olSegment, projection));
    }
    return {
        area,
        length,
        lengths
    };
}
/**
 * Update an OL geometry midpoints and return an array of those points
 * @param {?} olGeometry OL Geometry
 * @return {?} OL points
 */
export function updateOlGeometryMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = getOlGeometryMidpoints(olGeometry);
    // TODO: handle multi geometries
    /** @type {?} */
    const coordinates = olGeometry.flatCoordinates;
    /** @type {?} */
    const midpointsLength = olMidpoints.length;
    for (let i = 0; i < midpointsLength; i++) {
        /** @type {?} */
        const j = i * 2;
        /** @type {?} */
        const olSegment = new OlLineString([
            [coordinates[j], coordinates[j + 1]],
            [coordinates[j + 2], coordinates[j + 3]]
        ]);
        /** @type {?} */
        const midpointCoordinate = olSegment.getCoordinateAt(0.5);
        /** @type {?} */
        const olMidpoint = olMidpoints[i];
        if (olMidpoint !== undefined) {
            olMidpoint.setCoordinates(midpointCoordinate);
        }
        else {
            olMidpoints[i] = new OlPoint(midpointCoordinate);
        }
    }
    return olMidpoints;
}
/**
 * Clear an OL geometry midpoints and return an array of those points
 * @param {?} olGeometry OL Geometry
 * @return {?}
 */
export function clearOlGeometryMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = olGeometry.get('_midpoints') || [];
    /** @type {?} */
    const midpointsLength = olMidpoints.length;
    for (let i = 0; i < midpointsLength; i++) {
        /** @type {?} */
        const olMidpoint = olMidpoints[i];
        if (olMidpoint !== undefined) {
            if (olMidpoint !== undefined) {
                clearOlMidpointTooltip(olMidpoint);
            }
        }
    }
    olGeometry.set('_midpoints', undefined, true);
    return olMidpoints;
}
/**
 * Return an array of  OL geometry midpoints, if any
 * @param {?} olGeometry OL Geometry
 * @return {?} OL points
 */
function getOlGeometryMidpoints(olGeometry) {
    /** @type {?} */
    const expectedNumber = Math.max((olGeometry.flatCoordinates.length / 2) - 1, 0);
    // TODO: This works but it's quite messy. If time permits,
    // clean this. Maybe a Tooltip class could handle that
    /** @type {?} */
    let olMidpoints = olGeometry.get('_midpoints');
    if (olMidpoints === undefined) {
        olMidpoints = new Array(expectedNumber);
        olGeometry.set('_midpoints', olMidpoints, true);
        return olMidpoints;
    }
    if (expectedNumber === olMidpoints.length) {
        return olMidpoints;
    }
    if (expectedNumber > olMidpoints.length) {
        olMidpoints.push(...new Array(expectedNumber - olMidpoints.length));
        return olMidpoints;
    }
    for (let i = expectedNumber; i < olMidpoints.length; i++) {
        /** @type {?} */
        const olMidpoint = olMidpoints[expectedNumber];
        if (olMidpoint !== undefined) {
            clearOlMidpointTooltip(olMidpoint);
        }
    }
    olMidpoints.splice(expectedNumber);
    return olMidpoints;
}
/**
 * Remove an OL midpoint's tooltip from the map
 * @param {?} olMidpoint OL Point
 * @return {?}
 */
function clearOlMidpointTooltip(olMidpoint) {
    /** @type {?} */
    const olTooltip = olMidpoint.get('_tooltip');
    if (olTooltip !== undefined) {
        /** @type {?} */
        const olMap = olTooltip.getMap();
        if (olMap !== undefined) {
            olMap.removeOverlay(olTooltip);
        }
    }
}
/**
 * Add an OL overlay at each midpoint and return an array of those overlays
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
export function updateOlTooltipsAtMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = updateOlGeometryMidpoints(olGeometry);
    /** @type {?} */
    const olTooltips = olMidpoints.map((/**
     * @param {?} olMidpoint
     * @return {?}
     */
    (olMidpoint) => {
        /** @type {?} */
        let olTooltip = olMidpoint.get('_tooltip');
        if (olTooltip === undefined) {
            olTooltip = createOlTooltipAtPoint(olMidpoint);
        }
        else {
            olTooltip.setPosition(olMidpoint.flatCoordinates);
        }
        return olTooltip;
    }));
    return olTooltips;
}
/**
 * Return an array of OL overlay at midspoints, if any
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
export function getOlTooltipsAtMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = getOlGeometryMidpoints(olGeometry);
    return olMidpoints.map((/**
     * @param {?} olMidpoint
     * @return {?}
     */
    (olMidpoint) => {
        return olMidpoint ? olMidpoint.get('_tooltip') : undefined;
    }));
}
/**
 * Update an OL geometry center and return it
 * @param {?} olGeometry OL Geometry
 * @return {?} OL point
 */
export function updateOlGeometryCenter(olGeometry) {
    /** @type {?} */
    let olCenter = olGeometry.get('_center');
    /** @type {?} */
    const centerCoordinate = olGetCenter(olGeometry.getExtent());
    if (olCenter !== undefined) {
        olCenter.setCoordinates(centerCoordinate);
    }
    else {
        olCenter = new OlPoint(centerCoordinate);
        olGeometry.set('_center', olCenter);
    }
    return olCenter;
}
/**
 * Add an OL overlay at the center of a geometry and return that overlay
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlay
 */
export function updateOlTooltipAtCenter(olGeometry) {
    /** @type {?} */
    const olCenter = updateOlGeometryCenter(olGeometry);
    /** @type {?} */
    let olTooltip = olCenter.get('_tooltip');
    if (olTooltip === undefined) {
        olTooltip = createOlTooltipAtPoint(olCenter);
    }
    else {
        olTooltip.setPosition(olCenter.flatCoordinates);
    }
    return olTooltip;
}
/**
 * Return an array of OL overlay at midspoints, if any
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
export function getOlTooltipAtCenter(olGeometry) {
    /** @type {?} */
    const olCenter = olGeometry.get('_center');
    return olCenter ? olCenter.get('_tooltip') : undefined;
}
/**
 * Get all the tooltips of an OL geometry
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
export function getTooltipsOfOlGeometry(olGeometry) {
    /** @type {?} */
    const olTooltips = [].concat(getOlTooltipsAtMidpoints(olGeometry) || []);
    /** @type {?} */
    const olCenterTooltip = getOlTooltipAtCenter(olGeometry);
    if (olCenterTooltip !== undefined) {
        olTooltips.push(olCenterTooltip);
    }
    return olTooltips;
}
/**
 * Create an OL overlay at a point and bind the overlay to the point
 * @param {?} olPoint OL Point
 * @return {?} OL overlay
 */
export function createOlTooltipAtPoint(olPoint) {
    /** @type {?} */
    const olTooltip = new OlOverlay({
        element: document.createElement('div'),
        offset: [-30, -10],
        className: [
            'igo-map-tooltip',
            'igo-map-tooltip-measure'
        ].join(' '),
        stopEvent: false
    });
    olTooltip.setPosition(olPoint.flatCoordinates);
    olPoint.set('_tooltip', olTooltip);
    return olTooltip;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZWFzdXJlL3NoYXJlZC9tZWFzdXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUVwQyxPQUFPLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFDcEMsT0FBTyxZQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLElBQUksV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JELE9BQU8sRUFDTCxTQUFTLElBQUksV0FBVyxFQUN4QixPQUFPLElBQUksU0FBUyxFQUNyQixNQUFNLFdBQVcsQ0FBQztBQUduQixPQUFPLEVBQ0wsZUFBZSxFQUNmLDJCQUEyQixFQUMzQixpQkFBaUIsRUFDakIsNkJBQTZCLEVBQzlCLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQU94QixNQUFNLFVBQVUsa0JBQWtCLENBQUMsS0FBYTtJQUM5QyxPQUFPLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDdkIsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUFhO0lBQ3hDLE9BQU8sS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUN4QixDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQWE7SUFDekMsT0FBTyxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBQzFCLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxLQUFhO0lBQzFELE9BQU8sS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUMxQixDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsS0FBYTtJQUNyRCxPQUFPLEtBQUssR0FBRyxZQUFZLENBQUM7QUFDOUIsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHdCQUF3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QyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQzFDLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDekQsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFVBQW9DOztVQUNwRSxVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7O1VBQ2xFLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7SUFDeEQsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1FBQ2pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDbEM7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsT0FBZ0I7O1VBQy9DLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUM5QixPQUFPLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDdEMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbEIsU0FBUyxFQUFFO1lBQ1QsaUJBQWlCO1lBQ2pCLHlCQUF5QjtTQUMxQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDWCxTQUFTLEVBQUUsS0FBSztLQUNqQixDQUFDO0lBQ0YsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFbkMsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcclxuaW1wb3J0IE9sUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcbmltcG9ydCBPbExpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcclxuaW1wb3J0IE9sUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xyXG5pbXBvcnQgT2xPdmVybGF5IGZyb20gJ29sL092ZXJsYXknO1xyXG5pbXBvcnQgeyBnZXRDZW50ZXIgYXMgb2xHZXRDZW50ZXIgfSBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQge1xyXG4gIGdldExlbmd0aCBhcyBvbEdldExlbmd0aCxcclxuICBnZXRBcmVhIGFzIG9sR2V0QXJlYVxyXG59IGZyb20gJ29sL3NwaGVyZSc7XHJcblxyXG5pbXBvcnQgeyBNZWFzdXJlIH0gZnJvbSAnLi9tZWFzdXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1xyXG4gIE1lYXN1cmVBcmVhVW5pdCxcclxuICBNZWFzdXJlQXJlYVVuaXRBYmJyZXZpYXRpb24sXHJcbiAgTWVhc3VyZUxlbmd0aFVuaXQsXHJcbiAgTWVhc3VyZUxlbmd0aFVuaXRBYmJyZXZpYXRpb25cclxufSBmcm9tICcuL21lYXN1cmUuZW51bSc7XHJcblxyXG4vKipcclxuICogQ29udmVydCB2YWx1ZSBmcm9tIG1ldGVycyB0byBraWxvbWV0ZXJzXHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBtZXRlcnNcclxuICogQHJldHVybnMgVmFsdWUgaW4ga2lsb21ldGVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1ldGVyc1RvS2lsb21ldGVycyh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gdmFsdWUgKiAwLjAwMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBtZXRlcnMgdG8gZmVldFxyXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgaW4gbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIGZlZXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXRlcnNUb0ZlZXQodmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHZhbHVlICogMy4yODA4O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCB2YWx1ZSBmcm9tIG1ldGVycyB0byBtaWxlc1xyXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgaW4gbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIG1pbGVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWV0ZXJzVG9NaWxlcyh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gdmFsdWUgKiAwLjAwMDYyMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBzcXVhcmUgbWV0ZXJzIHRvIHNxdWFyZSBraWxvbWV0ZXJzXHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBzcXVhcmUgbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIHNxdWFyZSBraWxvbWV0ZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlTWV0ZXJzVG9TcXVhcmVLaWxvbWV0ZXJzKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiB2YWx1ZSAqIDAuMDAwMDAxO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCB2YWx1ZSBmcm9tIHNxdWFyZSBtZXRlcnMgdG8gc3F1YXJlIG1pbGVzXHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBzcXVhcmUgbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIHNxdWFyZSBtaWxlc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZU1ldGVyc1RvU3F1YXJlTWlsZXModmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHZhbHVlICogMC4wMDAwMDAzODYxO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCB2YWx1ZSBmcm9tIHNxdWFyZSBtZXRlcnMgdG8gc3F1YXJlIGZlZXRcclxuICogQHBhcmFtIHZhbHVlIFZhbHVlIGluIHNxdWFyZSBtZXRlcnNcclxuICogQHJldHVybnMgVmFsdWUgaW4gc3F1YXJlIGZlZXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVNZXRlcnNUb1NxdWFyZUZlZXQodmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHZhbHVlICogMTAuNzY0O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCB2YWx1ZSBmcm9tIHNxdWFyZSBtZXRlcnMgdG8gaGVjdGFyZXNcclxuICogQHBhcmFtIHZhbHVlIFZhbHVlIGluIHNxdWFyZSBtZXRlcnNcclxuICogQHJldHVybnMgVmFsdWUgaW4gaGVjdGFyZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVNZXRlcnNUb0hlY3RhcmVzKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiB2YWx1ZSAqIDAuMDAwMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBzcXVhcmUgbWV0ZXJzIHRvIGFjcmVzXHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBzcXVhcmUgbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIGFjcmVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlTWV0ZXJzVG9BY3Jlcyh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gdmFsdWUgKiAwLjAwMDI0NzExO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCB2YWx1ZSBmcm9tIG1ldGVycyB0byB0aGUgc3BlY2lmaWVkIGxlbmd0aCB1bml0XHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBtZXRlcnNcclxuICogQHBhcmFtIHVuaXQgTGVuZ3RoIHVuaXRcclxuICogQHJldHVybnMgVmFsdWUgaW4gdW5pdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1ldGVyc1RvVW5pdCh2YWx1ZTogbnVtYmVyLCB1bml0OiBNZWFzdXJlTGVuZ3RoVW5pdCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgY29uc3QgY29udmVyc2lvbk1hcHBlciA9IG5ldyBNYXAoW1xyXG4gICAgW01lYXN1cmVMZW5ndGhVbml0Lk1ldGVycywgKHZhbDogbnVtYmVyKSA9PiB2YWxdLFxyXG4gICAgW01lYXN1cmVMZW5ndGhVbml0LktpbG9tZXRlcnMsIG1ldGVyc1RvS2lsb21ldGVyc10sXHJcbiAgICBbTWVhc3VyZUxlbmd0aFVuaXQuTWlsZXMsIG1ldGVyc1RvTWlsZXNdLFxyXG4gICAgW01lYXN1cmVMZW5ndGhVbml0LkZlZXQsIG1ldGVyc1RvRmVldF0sXHJcbiAgXSk7XHJcbiAgY29uc3QgY29udmVyc2lvbiA9IGNvbnZlcnNpb25NYXBwZXIuZ2V0KHVuaXQpO1xyXG5cclxuICByZXR1cm4gY29udmVyc2lvbiA/IGNvbnZlcnNpb24odmFsdWUpIDogdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCB2YWx1ZSBmcm9tIHNxdWFyZSBtZXRlcnMgdG8gdGhlIHNwZWNpZmllZCBhcmVhIHVuaXRcclxuICogQHBhcmFtIHZhbHVlIFZhbHVlIGluIG1ldGVyc1xyXG4gKiBAcGFyYW0gdW5pdCBBcmVhIHVuaXRcclxuICogQHJldHVybnMgVmFsdWUgaW4gdW5pdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZU1ldGVyc1RvVW5pdCh2YWx1ZTogbnVtYmVyLCB1bml0OiBNZWFzdXJlQXJlYVVuaXQpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gIGNvbnN0IGNvbnZlcnNpb25NYXBwZXIgPSBuZXcgTWFwKFtcclxuICAgIFtNZWFzdXJlQXJlYVVuaXQuU3F1YXJlTWV0ZXJzLCAodmFsOiBudW1iZXIpID0+IHZhbF0sXHJcbiAgICBbTWVhc3VyZUFyZWFVbml0LlNxdWFyZUtpbG9tZXRlcnMsIHNxdWFyZU1ldGVyc1RvU3F1YXJlS2lsb21ldGVyc10sXHJcbiAgICBbTWVhc3VyZUFyZWFVbml0LlNxdWFyZU1pbGVzLCBzcXVhcmVNZXRlcnNUb1NxdWFyZU1pbGVzXSxcclxuICAgIFtNZWFzdXJlQXJlYVVuaXQuU3F1YXJlRmVldCwgc3F1YXJlTWV0ZXJzVG9TcXVhcmVGZWV0XSxcclxuICAgIFtNZWFzdXJlQXJlYVVuaXQuSGVjdGFyZXMsIHNxdWFyZU1ldGVyc1RvSGVjdGFyZXNdLFxyXG4gICAgW01lYXN1cmVBcmVhVW5pdC5BY3Jlcywgc3F1YXJlTWV0ZXJzVG9BY3Jlc10sXHJcbiAgXSk7XHJcbiAgY29uc3QgY29udmVyc2lvbiA9IGNvbnZlcnNpb25NYXBwZXIuZ2V0KHVuaXQpO1xyXG5cclxuICByZXR1cm4gY29udmVyc2lvbiA/IGNvbnZlcnNpb24odmFsdWUpIDogdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBtZXRob2QgZm9ybWF0IGEgbWVhc3VyZSB0byBhIHJlYWRhYmxlIGZvcm1hdFxyXG4gKiBAcGFyYW0gbWVhc3VyZSBNZWFzdXJlXHJcbiAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9uc1xyXG4gKiBAcmV0dXJucyBGb3JtYXR0ZWQgbWVhc3VyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE1lYXN1cmUobWVhc3VyZTogbnVtYmVyLCBvcHRpb25zPzoge1xyXG4gIGRlY2ltYWw/OiBudW1iZXI7XHJcbiAgdW5pdD86IE1lYXN1cmVBcmVhVW5pdCB8IE1lYXN1cmVMZW5ndGhVbml0O1xyXG4gIHVuaXRBYmJyPzogYm9vbGVhbjtcclxuICBsb2NhbGU/OiBzdHJpbmc7XHJcbn0pIHtcclxuICBsZXQgZGVjaW1hbCA9IG9wdGlvbnMuZGVjaW1hbDtcclxuICBpZiAoZGVjaW1hbCA9PT0gdW5kZWZpbmVkIHx8IGRlY2ltYWwgPCAwKSB7XHJcbiAgICBkZWNpbWFsID0gMTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnRzID0gW107XHJcbiAgaWYgKG9wdGlvbnMubG9jYWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHBhcnRzLnB1c2gobWVhc3VyZS50b0xvY2FsZVN0cmluZyhvcHRpb25zLmxvY2FsZSwge1xyXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IGRlY2ltYWwsXHJcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogZGVjaW1hbFxyXG4gICAgfSkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXJ0cy5wdXNoKG1lYXN1cmUudG9GaXhlZChkZWNpbWFsKS50b1N0cmluZygpKTtcclxuICB9XHJcblxyXG4gIGlmIChvcHRpb25zLnVuaXQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnVuaXRBYmJyID09PSB0cnVlKSB7XHJcbiAgICBwYXJ0cy5wdXNoKFxyXG4gICAgICBNZWFzdXJlTGVuZ3RoVW5pdEFiYnJldmlhdGlvbltvcHRpb25zLnVuaXRdIHx8XHJcbiAgICAgIE1lYXN1cmVBcmVhVW5pdEFiYnJldmlhdGlvbltvcHRpb25zLnVuaXRdXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnRzLmZpbHRlcihwID0+IHAgIT09IHVuZGVmaW5lZCkuam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBiZXN0IGxlbmd0aCBtZWFzdXJlIHVuaXQgZm9yIGEgZ2l2ZW4gbWVhc3VyZSBpbiBtZXRlcnNcclxuICogQHBhcmFtIHZhbHVlIFZhbHVlIGluIG1ldGVyc1xyXG4gKiBAcmV0dXJucyBNZWFzdXJlIHVuaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlQmVzdExlbmd0aFVuaXQodmFsdWU6IG51bWJlcik6IE1lYXN1cmVMZW5ndGhVbml0IHtcclxuICBsZXQgdW5pdCA9IE1lYXN1cmVMZW5ndGhVbml0Lk1ldGVycztcclxuICBsZXQgY29udmVydGVkID0gdmFsdWU7XHJcbiAgY29uc3QgcG9zc2libGVVbml0cyA9IFtNZWFzdXJlTGVuZ3RoVW5pdC5LaWxvbWV0ZXJzXTtcclxuICB3aGlsZSAoY29udmVydGVkID4gMTAwMCAmJiBwb3NzaWJsZVVuaXRzLmxlbmd0aCA+IDApIHtcclxuICAgIHVuaXQgPSBwb3NzaWJsZVVuaXRzLnBvcCgpO1xyXG4gICAgY29udmVydGVkID0gbWV0ZXJzVG9Vbml0KHZhbHVlLCB1bml0KTtcclxuICB9XHJcbiAgcmV0dXJuIHVuaXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIGJlc3QgbGVuZ3RoIG1lYXN1cmUgdW5pdCBmb3IgYSBnaXZlbiBtZWFzdXJlIGluIHNxdWFyZSBtZXRlcnNcclxuICogQHBhcmFtIHZhbHVlIFZhbHVlIGluIG1ldGVyc1xyXG4gKiBAcmV0dXJucyBNZWFzdXJlIHVuaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlQmVzdEFyZWFVbml0KHZhbHVlOiBudW1iZXIpOiBNZWFzdXJlQXJlYVVuaXQge1xyXG4gIGxldCB1bml0ID0gTWVhc3VyZUFyZWFVbml0LlNxdWFyZU1ldGVycztcclxuICBsZXQgY29udmVydGVkID0gdmFsdWU7XHJcbiAgY29uc3QgcG9zc2libGVVbml0cyA9IFtNZWFzdXJlQXJlYVVuaXQuU3F1YXJlS2lsb21ldGVyc107XHJcbiAgd2hpbGUgKGNvbnZlcnRlZCA+IDEwMDAwMDAgJiYgcG9zc2libGVVbml0cy5sZW5ndGggPiAwKSB7XHJcbiAgICB1bml0ID0gcG9zc2libGVVbml0cy5wb3AoKTtcclxuICAgIGNvbnZlcnRlZCA9IHNxdWFyZU1ldGVyc1RvVW5pdCh2YWx1ZSwgdW5pdCk7XHJcbiAgfVxyXG4gIHJldHVybiB1bml0O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZGVmYXVsdCBzdHlsZSBmb3IgYSBtZWFzdXJlIGludGVyYWN0aW9uXHJcbiAqIEByZXR1cm5zIE9MIHN0eWxlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVhc3VyZUludGVyYWN0aW9uU3R5bGUoKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgY29sb3I6ICcjZmZjYzMzJyxcclxuICAgICAgbGluZURhc2g6IFsxMCwgMTBdLFxyXG4gICAgICB3aWR0aDogMlxyXG4gICAgfSksXHJcbiAgICBmaWxsOiAgbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJ1xyXG4gICAgfSksXHJcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgY29sb3I6ICcjZmZjYzMzJyxcclxuICAgICAgfSksXHJcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJ1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGRlZmF1bHQgc3R5bGUgZm9yIGEgbWVhc3VyZSBsYXllclxyXG4gKiBAcmV0dXJucyBPTCBzdHlsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lYXN1cmVMYXllclN0eWxlKCk6IG9sc3R5bGUuU3R5bGUge1xyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgIGNvbG9yOiAnI2ZmY2MzMycsXHJcbiAgICAgIHdpZHRoOiAyXHJcbiAgICB9KSxcclxuICAgIGZpbGw6ICBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgbGVuZ3RoIGluIG1ldGVycyBvZiBhbiBPTCBnZW9tZXRyeSB3aXRoIGEgZ2l2ZW4gcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBnZW9tZXRyeVxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbiBvbEdlb21ldHJ5J3MgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBMZW5ndGggaW4gbWV0ZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVhc3VyZU9sR2VvbWV0cnlMZW5ndGgob2xHZW9tZXRyeTogT2xHZW9tZXRyeSwgcHJvamVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICBpZiAob2xHZW9tZXRyeSBpbnN0YW5jZW9mIE9sUG9pbnQpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIGlmIChvbEdlb21ldHJ5LmdldEZsYXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgcmV0dXJuIG9sR2V0TGVuZ3RoKG9sR2VvbWV0cnksIHtwcm9qZWN0aW9ufSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIHRoZSBhcmVhIGluIHNxdWFyZSBtZXRlcnMgb2YgYW4gT0wgZ2VvbWV0cnkgd2l0aCBhIGdpdmVuIHByb2plY3Rpb25cclxuICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgZ2VvbWV0cnlcclxuICogQHBhcmFtIHByb2plY3Rpb24gb2xHZW9tZXRyeSdzIHByb2plY3Rpb25cclxuICogQHJldHVybnMgQXJlYSBpbiBzcXVhcmUgbWV0ZXJzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVhc3VyZU9sR2VvbWV0cnlBcmVhKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnksIHByb2plY3Rpb246IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgaWYgKG9sR2VvbWV0cnkgaW5zdGFuY2VvZiBPbFBvaW50IHx8IG9sR2VvbWV0cnkgaW5zdGFuY2VvZiBPbExpbmVTdHJpbmcpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIGlmIChvbEdlb21ldHJ5LmdldEZsYXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgcmV0dXJuIG9sR2V0QXJlYShvbEdlb21ldHJ5LCB7cHJvamVjdGlvbn0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgYXJlYSAoc3F1YXJlIG1ldGVycyksIGxlbmd0aCAobWV0ZXJzKSBhbmQgbGFzdCBsZW5ndGggKG1ldGVycylcclxuICogb2YgYW4gT0wgZ2VvbWV0cnkgd2l0aCBhIGdpdmVuIHByb2plY3Rpb24uXHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIGdlb21ldHJ5XHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uIG9sR2VvbWV0cnkncyBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIENvbXB1dGVkIG1lYXN1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZWFzdXJlT2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbEdlb21ldHJ5LCBwcm9qZWN0aW9uOiBzdHJpbmcpOiBNZWFzdXJlIHtcclxuICBjb25zdCBsZW5ndGggPSBtZWFzdXJlT2xHZW9tZXRyeUxlbmd0aChvbEdlb21ldHJ5LCBwcm9qZWN0aW9uKTtcclxuICBjb25zdCBhcmVhID0gbWVhc3VyZU9sR2VvbWV0cnlBcmVhKG9sR2VvbWV0cnksIHByb2plY3Rpb24pO1xyXG5cclxuICBjb25zdCBsZW5ndGhzID0gW107XHJcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBvbEdlb21ldHJ5LmZsYXRDb29yZGluYXRlcztcclxuICBjb25zdCBjb29yZGluYXRlc0xlbmd0aCA9IGNvb3JkaW5hdGVzLmxlbmd0aDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBjb29yZGluYXRlc0xlbmd0aCAtIDQ7IGkgKz0gMikge1xyXG4gICAgY29uc3Qgb2xTZWdtZW50ID0gbmV3IE9sTGluZVN0cmluZyhbXHJcbiAgICAgIFtjb29yZGluYXRlc1tpXSwgY29vcmRpbmF0ZXNbaSArIDFdXSxcclxuICAgICAgW2Nvb3JkaW5hdGVzW2kgKyAyXSwgY29vcmRpbmF0ZXNbaSArIDNdXVxyXG4gICAgXSk7XHJcblxyXG4gICAgbGVuZ3Rocy5wdXNoKG1lYXN1cmVPbEdlb21ldHJ5TGVuZ3RoKG9sU2VnbWVudCwgcHJvamVjdGlvbikpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGFyZWEsXHJcbiAgICBsZW5ndGgsXHJcbiAgICBsZW5ndGhzXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBhbiBPTCBnZW9tZXRyeSBtaWRwb2ludHMgYW5kIHJldHVybiBhbiBhcnJheSBvZiB0aG9zZSBwb2ludHNcclxuICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgR2VvbWV0cnlcclxuICogQHJldHVybnMgT0wgcG9pbnRzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlT2xHZW9tZXRyeU1pZHBvaW50cyhvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pOiBPbFBvaW50W10ge1xyXG4gIGNvbnN0IG9sTWlkcG9pbnRzID0gZ2V0T2xHZW9tZXRyeU1pZHBvaW50cyhvbEdlb21ldHJ5KTtcclxuXHJcbiAgLy8gVE9ETzogaGFuZGxlIG11bHRpIGdlb21ldHJpZXNcclxuICBjb25zdCBjb29yZGluYXRlcyA9IG9sR2VvbWV0cnkuZmxhdENvb3JkaW5hdGVzO1xyXG4gIGNvbnN0IG1pZHBvaW50c0xlbmd0aCA9IG9sTWlkcG9pbnRzLmxlbmd0aDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG1pZHBvaW50c0xlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBqID0gaSAqIDI7XHJcbiAgICBjb25zdCBvbFNlZ21lbnQgPSBuZXcgT2xMaW5lU3RyaW5nKFtcclxuICAgICAgW2Nvb3JkaW5hdGVzW2pdLCBjb29yZGluYXRlc1tqICsgMV1dLFxyXG4gICAgICBbY29vcmRpbmF0ZXNbaiArIDJdLCBjb29yZGluYXRlc1tqICsgM11dXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBtaWRwb2ludENvb3JkaW5hdGUgPSBvbFNlZ21lbnQuZ2V0Q29vcmRpbmF0ZUF0KDAuNSk7XHJcbiAgICBjb25zdCBvbE1pZHBvaW50ID0gb2xNaWRwb2ludHNbaV07XHJcbiAgICBpZiAob2xNaWRwb2ludCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9sTWlkcG9pbnQuc2V0Q29vcmRpbmF0ZXMobWlkcG9pbnRDb29yZGluYXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9sTWlkcG9pbnRzW2ldID0gbmV3IE9sUG9pbnQobWlkcG9pbnRDb29yZGluYXRlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG9sTWlkcG9pbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xlYXIgYW4gT0wgZ2VvbWV0cnkgbWlkcG9pbnRzIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgdGhvc2UgcG9pbnRzXHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJPbEdlb21ldHJ5TWlkcG9pbnRzKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbikge1xyXG4gIGNvbnN0IG9sTWlkcG9pbnRzID0gb2xHZW9tZXRyeS5nZXQoJ19taWRwb2ludHMnKSB8fCBbXTtcclxuICBjb25zdCBtaWRwb2ludHNMZW5ndGggPSBvbE1pZHBvaW50cy5sZW5ndGg7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaWRwb2ludHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3Qgb2xNaWRwb2ludCA9IG9sTWlkcG9pbnRzW2ldO1xyXG4gICAgaWYgKG9sTWlkcG9pbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAob2xNaWRwb2ludCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2xlYXJPbE1pZHBvaW50VG9vbHRpcChvbE1pZHBvaW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb2xHZW9tZXRyeS5zZXQoJ19taWRwb2ludHMnLCB1bmRlZmluZWQsIHRydWUpO1xyXG5cclxuICByZXR1cm4gb2xNaWRwb2ludHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgIE9MIGdlb21ldHJ5IG1pZHBvaW50cywgaWYgYW55XHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqIEByZXR1cm5zIE9MIHBvaW50c1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T2xHZW9tZXRyeU1pZHBvaW50cyhvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pOiBPbFBvaW50W10ge1xyXG4gIGNvbnN0IGV4cGVjdGVkTnVtYmVyID0gTWF0aC5tYXgoKG9sR2VvbWV0cnkuZmxhdENvb3JkaW5hdGVzLmxlbmd0aCAvIDIpIC0gMSwgMCk7XHJcblxyXG4gIC8vIFRPRE86IFRoaXMgd29ya3MgYnV0IGl0J3MgcXVpdGUgbWVzc3kuIElmIHRpbWUgcGVybWl0cyxcclxuICAvLyBjbGVhbiB0aGlzLiBNYXliZSBhIFRvb2x0aXAgY2xhc3MgY291bGQgaGFuZGxlIHRoYXRcclxuICBsZXQgb2xNaWRwb2ludHMgPSBvbEdlb21ldHJ5LmdldCgnX21pZHBvaW50cycpO1xyXG4gIGlmIChvbE1pZHBvaW50cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbE1pZHBvaW50cyA9IG5ldyBBcnJheShleHBlY3RlZE51bWJlcik7XHJcbiAgICBvbEdlb21ldHJ5LnNldCgnX21pZHBvaW50cycsIG9sTWlkcG9pbnRzLCB0cnVlKTtcclxuICAgIHJldHVybiBvbE1pZHBvaW50cztcclxuICB9XHJcblxyXG4gIGlmIChleHBlY3RlZE51bWJlciA9PT0gb2xNaWRwb2ludHMubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gb2xNaWRwb2ludHM7XHJcbiAgfVxyXG5cclxuICBpZiAoZXhwZWN0ZWROdW1iZXIgPiBvbE1pZHBvaW50cy5sZW5ndGgpIHtcclxuICAgIG9sTWlkcG9pbnRzLnB1c2goLi4ubmV3IEFycmF5KGV4cGVjdGVkTnVtYmVyIC0gb2xNaWRwb2ludHMubGVuZ3RoKSk7XHJcbiAgICByZXR1cm4gb2xNaWRwb2ludHM7XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpID0gZXhwZWN0ZWROdW1iZXI7IGkgPCBvbE1pZHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3Qgb2xNaWRwb2ludCA9IG9sTWlkcG9pbnRzW2V4cGVjdGVkTnVtYmVyXTtcclxuICAgIGlmIChvbE1pZHBvaW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY2xlYXJPbE1pZHBvaW50VG9vbHRpcChvbE1pZHBvaW50KTtcclxuICAgIH1cclxuICB9XHJcbiAgb2xNaWRwb2ludHMuc3BsaWNlKGV4cGVjdGVkTnVtYmVyKTtcclxuXHJcbiAgcmV0dXJuIG9sTWlkcG9pbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFuIE9MIG1pZHBvaW50J3MgdG9vbHRpcCBmcm9tIHRoZSBtYXBcclxuICogQHBhcmFtIG9sTWlkcG9pbnQgT0wgUG9pbnRcclxuICovXHJcbmZ1bmN0aW9uIGNsZWFyT2xNaWRwb2ludFRvb2x0aXAob2xNaWRwb2ludDogT2xQb2ludCkge1xyXG4gIGNvbnN0IG9sVG9vbHRpcCA9IG9sTWlkcG9pbnQuZ2V0KCdfdG9vbHRpcCcpO1xyXG4gIGlmIChvbFRvb2x0aXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc3Qgb2xNYXAgPSBvbFRvb2x0aXAuZ2V0TWFwKCk7XHJcbiAgICBpZiAob2xNYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvbE1hcC5yZW1vdmVPdmVybGF5KG9sVG9vbHRpcCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQWRkIGFuIE9MIG92ZXJsYXkgYXQgZWFjaCBtaWRwb2ludCBhbmQgcmV0dXJuIGFuIGFycmF5IG9mIHRob3NlIG92ZXJsYXlzXHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqIEByZXR1cm5zIE9MIG92ZXJsYXlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlT2xUb29sdGlwc0F0TWlkcG9pbnRzKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbik6IE9sT3ZlcmxheVtdIHtcclxuICBjb25zdCBvbE1pZHBvaW50cyA9IHVwZGF0ZU9sR2VvbWV0cnlNaWRwb2ludHMob2xHZW9tZXRyeSk7XHJcbiAgY29uc3Qgb2xUb29sdGlwcyA9IG9sTWlkcG9pbnRzLm1hcCgob2xNaWRwb2ludDogT2xQb2ludCkgPT4ge1xyXG4gICAgbGV0IG9sVG9vbHRpcCA9IG9sTWlkcG9pbnQuZ2V0KCdfdG9vbHRpcCcpO1xyXG4gICAgaWYgKG9sVG9vbHRpcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9sVG9vbHRpcCA9IGNyZWF0ZU9sVG9vbHRpcEF0UG9pbnQob2xNaWRwb2ludCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbFRvb2x0aXAuc2V0UG9zaXRpb24ob2xNaWRwb2ludC5mbGF0Q29vcmRpbmF0ZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9sVG9vbHRpcDtcclxuICB9KTtcclxuICByZXR1cm4gb2xUb29sdGlwcztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhbiBhcnJheSBvZiBPTCBvdmVybGF5IGF0IG1pZHNwb2ludHMsIGlmIGFueVxyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gKiBAcmV0dXJucyBPTCBvdmVybGF5c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9sVG9vbHRpcHNBdE1pZHBvaW50cyhvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pOiBPbE92ZXJsYXlbXSB7XHJcbiAgY29uc3Qgb2xNaWRwb2ludHMgPSBnZXRPbEdlb21ldHJ5TWlkcG9pbnRzKG9sR2VvbWV0cnkpO1xyXG4gIHJldHVybiBvbE1pZHBvaW50cy5tYXAoKG9sTWlkcG9pbnQ6IE9sUG9pbnQpID0+IHtcclxuICAgIHJldHVybiBvbE1pZHBvaW50ID8gb2xNaWRwb2ludC5nZXQoJ190b29sdGlwJykgOiB1bmRlZmluZWQ7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgYW4gT0wgZ2VvbWV0cnkgY2VudGVyIGFuZCByZXR1cm4gaXRcclxuICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgR2VvbWV0cnlcclxuICogQHJldHVybnMgT0wgcG9pbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVPbEdlb21ldHJ5Q2VudGVyKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbik6IE9sUG9pbnQge1xyXG4gIGxldCBvbENlbnRlciA9IG9sR2VvbWV0cnkuZ2V0KCdfY2VudGVyJyk7XHJcbiAgY29uc3QgY2VudGVyQ29vcmRpbmF0ZSA9IG9sR2V0Q2VudGVyKG9sR2VvbWV0cnkuZ2V0RXh0ZW50KCkpO1xyXG4gIGlmIChvbENlbnRlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbENlbnRlci5zZXRDb29yZGluYXRlcyhjZW50ZXJDb29yZGluYXRlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgb2xDZW50ZXIgPSBuZXcgT2xQb2ludChjZW50ZXJDb29yZGluYXRlKTtcclxuICAgIG9sR2VvbWV0cnkuc2V0KCdfY2VudGVyJywgb2xDZW50ZXIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9sQ2VudGVyO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGFuIE9MIG92ZXJsYXkgYXQgdGhlIGNlbnRlciBvZiBhIGdlb21ldHJ5IGFuZCByZXR1cm4gdGhhdCBvdmVybGF5XHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqIEByZXR1cm5zIE9MIG92ZXJsYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVPbFRvb2x0aXBBdENlbnRlcihvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pOiBPbE92ZXJsYXkge1xyXG4gIGNvbnN0IG9sQ2VudGVyID0gdXBkYXRlT2xHZW9tZXRyeUNlbnRlcihvbEdlb21ldHJ5KTtcclxuICBsZXQgb2xUb29sdGlwID0gb2xDZW50ZXIuZ2V0KCdfdG9vbHRpcCcpO1xyXG4gIGlmIChvbFRvb2x0aXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xUb29sdGlwID0gY3JlYXRlT2xUb29sdGlwQXRQb2ludChvbENlbnRlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIG9sVG9vbHRpcC5zZXRQb3NpdGlvbihvbENlbnRlci5mbGF0Q29vcmRpbmF0ZXMpO1xyXG4gIH1cclxuICByZXR1cm4gb2xUb29sdGlwO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFuIGFycmF5IG9mIE9MIG92ZXJsYXkgYXQgbWlkc3BvaW50cywgaWYgYW55XHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqIEByZXR1cm5zIE9MIG92ZXJsYXlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2xUb29sdGlwQXRDZW50ZXIob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKTogT2xPdmVybGF5IHtcclxuICBjb25zdCBvbENlbnRlciA9IG9sR2VvbWV0cnkuZ2V0KCdfY2VudGVyJyk7XHJcbiAgcmV0dXJuIG9sQ2VudGVyID8gb2xDZW50ZXIuZ2V0KCdfdG9vbHRpcCcpIDogdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IGFsbCB0aGUgdG9vbHRpcHMgb2YgYW4gT0wgZ2VvbWV0cnlcclxuICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgR2VvbWV0cnlcclxuICogQHJldHVybnMgT0wgb3ZlcmxheXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUb29sdGlwc09mT2xHZW9tZXRyeShvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pOiBPbE92ZXJsYXlbXSB7XHJcbiAgY29uc3Qgb2xUb29sdGlwcyA9IFtdLmNvbmNhdChnZXRPbFRvb2x0aXBzQXRNaWRwb2ludHMob2xHZW9tZXRyeSkgfHwgW10pO1xyXG4gIGNvbnN0IG9sQ2VudGVyVG9vbHRpcCA9IGdldE9sVG9vbHRpcEF0Q2VudGVyKG9sR2VvbWV0cnkpO1xyXG4gIGlmIChvbENlbnRlclRvb2x0aXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xUb29sdGlwcy5wdXNoKG9sQ2VudGVyVG9vbHRpcCk7XHJcbiAgfVxyXG4gIHJldHVybiBvbFRvb2x0aXBzO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIE9MIG92ZXJsYXkgYXQgYSBwb2ludCBhbmQgYmluZCB0aGUgb3ZlcmxheSB0byB0aGUgcG9pbnRcclxuICogQHBhcmFtIG9sUG9pbnQgT0wgUG9pbnRcclxuICogQHJldHVybnMgT0wgb3ZlcmxheVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9sVG9vbHRpcEF0UG9pbnQob2xQb2ludDogT2xQb2ludCk6IE9sT3ZlcmxheSB7XHJcbiAgY29uc3Qgb2xUb29sdGlwID0gbmV3IE9sT3ZlcmxheSh7XHJcbiAgICBlbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgIG9mZnNldDogWy0zMCwgLTEwXSxcclxuICAgIGNsYXNzTmFtZTogW1xyXG4gICAgICAnaWdvLW1hcC10b29sdGlwJyxcclxuICAgICAgJ2lnby1tYXAtdG9vbHRpcC1tZWFzdXJlJ1xyXG4gICAgXS5qb2luKCcgJyksXHJcbiAgICBzdG9wRXZlbnQ6IGZhbHNlXHJcbiAgfSk7XHJcbiAgb2xUb29sdGlwLnNldFBvc2l0aW9uKG9sUG9pbnQuZmxhdENvb3JkaW5hdGVzKTtcclxuICBvbFBvaW50LnNldCgnX3Rvb2x0aXAnLCBvbFRvb2x0aXApO1xyXG5cclxuICByZXR1cm4gb2xUb29sdGlwO1xyXG59XHJcbiJdfQ==