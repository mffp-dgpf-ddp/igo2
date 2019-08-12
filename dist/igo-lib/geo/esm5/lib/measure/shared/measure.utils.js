/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    var conversionMapper = new Map([
        [MeasureLengthUnit.Meters, (/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return val; })],
        [MeasureLengthUnit.Kilometers, metersToKilometers],
        [MeasureLengthUnit.Miles, metersToMiles],
        [MeasureLengthUnit.Feet, metersToFeet],
    ]);
    /** @type {?} */
    var conversion = conversionMapper.get(unit);
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
    var conversionMapper = new Map([
        [MeasureAreaUnit.SquareMeters, (/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return val; })],
        [MeasureAreaUnit.SquareKilometers, squareMetersToSquareKilometers],
        [MeasureAreaUnit.SquareMiles, squareMetersToSquareMiles],
        [MeasureAreaUnit.SquareFeet, squareMetersToSquareFeet],
        [MeasureAreaUnit.Hectares, squareMetersToHectares],
        [MeasureAreaUnit.Acres, squareMetersToAcres],
    ]);
    /** @type {?} */
    var conversion = conversionMapper.get(unit);
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
    var decimal = options.decimal;
    if (decimal === undefined || decimal < 0) {
        decimal = 1;
    }
    /** @type {?} */
    var parts = [];
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
    function (p) { return p !== undefined; })).join(' ');
}
/**
 * Compute best length measure unit for a given measure in meters
 * @param {?} value Value in meters
 * @return {?} Measure unit
 */
export function computeBestLengthUnit(value) {
    /** @type {?} */
    var unit = MeasureLengthUnit.Meters;
    /** @type {?} */
    var converted = value;
    /** @type {?} */
    var possibleUnits = [MeasureLengthUnit.Kilometers];
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
    var unit = MeasureAreaUnit.SquareMeters;
    /** @type {?} */
    var converted = value;
    /** @type {?} */
    var possibleUnits = [MeasureAreaUnit.SquareKilometers];
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
    return olGetLength(olGeometry, { projection: projection });
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
    return olGetArea(olGeometry, { projection: projection });
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
    var length = measureOlGeometryLength(olGeometry, projection);
    /** @type {?} */
    var area = measureOlGeometryArea(olGeometry, projection);
    /** @type {?} */
    var lengths = [];
    /** @type {?} */
    var coordinates = olGeometry.flatCoordinates;
    /** @type {?} */
    var coordinatesLength = coordinates.length;
    for (var i = 0; i <= coordinatesLength - 4; i += 2) {
        /** @type {?} */
        var olSegment = new OlLineString([
            [coordinates[i], coordinates[i + 1]],
            [coordinates[i + 2], coordinates[i + 3]]
        ]);
        lengths.push(measureOlGeometryLength(olSegment, projection));
    }
    return {
        area: area,
        length: length,
        lengths: lengths
    };
}
/**
 * Update an OL geometry midpoints and return an array of those points
 * @param {?} olGeometry OL Geometry
 * @return {?} OL points
 */
export function updateOlGeometryMidpoints(olGeometry) {
    /** @type {?} */
    var olMidpoints = getOlGeometryMidpoints(olGeometry);
    // TODO: handle multi geometries
    /** @type {?} */
    var coordinates = olGeometry.flatCoordinates;
    /** @type {?} */
    var midpointsLength = olMidpoints.length;
    for (var i = 0; i < midpointsLength; i++) {
        /** @type {?} */
        var j = i * 2;
        /** @type {?} */
        var olSegment = new OlLineString([
            [coordinates[j], coordinates[j + 1]],
            [coordinates[j + 2], coordinates[j + 3]]
        ]);
        /** @type {?} */
        var midpointCoordinate = olSegment.getCoordinateAt(0.5);
        /** @type {?} */
        var olMidpoint = olMidpoints[i];
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
    var olMidpoints = olGeometry.get('_midpoints') || [];
    /** @type {?} */
    var midpointsLength = olMidpoints.length;
    for (var i = 0; i < midpointsLength; i++) {
        /** @type {?} */
        var olMidpoint = olMidpoints[i];
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
    var expectedNumber = Math.max((olGeometry.flatCoordinates.length / 2) - 1, 0);
    // TODO: This works but it's quite messy. If time permits,
    // clean this. Maybe a Tooltip class could handle that
    /** @type {?} */
    var olMidpoints = olGeometry.get('_midpoints');
    if (olMidpoints === undefined) {
        olMidpoints = new Array(expectedNumber);
        olGeometry.set('_midpoints', olMidpoints, true);
        return olMidpoints;
    }
    if (expectedNumber === olMidpoints.length) {
        return olMidpoints;
    }
    if (expectedNumber > olMidpoints.length) {
        olMidpoints.push.apply(olMidpoints, tslib_1.__spread(new Array(expectedNumber - olMidpoints.length)));
        return olMidpoints;
    }
    for (var i = expectedNumber; i < olMidpoints.length; i++) {
        /** @type {?} */
        var olMidpoint = olMidpoints[expectedNumber];
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
    var olTooltip = olMidpoint.get('_tooltip');
    if (olTooltip !== undefined) {
        /** @type {?} */
        var olMap = olTooltip.getMap();
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
    var olMidpoints = updateOlGeometryMidpoints(olGeometry);
    /** @type {?} */
    var olTooltips = olMidpoints.map((/**
     * @param {?} olMidpoint
     * @return {?}
     */
    function (olMidpoint) {
        /** @type {?} */
        var olTooltip = olMidpoint.get('_tooltip');
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
    var olMidpoints = getOlGeometryMidpoints(olGeometry);
    return olMidpoints.map((/**
     * @param {?} olMidpoint
     * @return {?}
     */
    function (olMidpoint) {
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
    var olCenter = olGeometry.get('_center');
    /** @type {?} */
    var centerCoordinate = olGetCenter(olGeometry.getExtent());
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
    var olCenter = updateOlGeometryCenter(olGeometry);
    /** @type {?} */
    var olTooltip = olCenter.get('_tooltip');
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
    var olCenter = olGeometry.get('_center');
    return olCenter ? olCenter.get('_tooltip') : undefined;
}
/**
 * Get all the tooltips of an OL geometry
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
export function getTooltipsOfOlGeometry(olGeometry) {
    /** @type {?} */
    var olTooltips = [].concat(getOlTooltipsAtMidpoints(olGeometry) || []);
    /** @type {?} */
    var olCenterTooltip = getOlTooltipAtCenter(olGeometry);
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
    var olTooltip = new OlOverlay({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZWFzdXJlL3NoYXJlZC9tZWFzdXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBQ3BDLE9BQU8sWUFBWSxNQUFNLG9CQUFvQixDQUFDO0FBRTlDLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUUsU0FBUyxJQUFJLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsU0FBUyxJQUFJLFdBQVcsRUFDeEIsT0FBTyxJQUFJLFNBQVMsRUFDckIsTUFBTSxXQUFXLENBQUM7QUFHbkIsT0FBTyxFQUNMLGVBQWUsRUFDZiwyQkFBMkIsRUFDM0IsaUJBQWlCLEVBQ2pCLDZCQUE2QixFQUM5QixNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFPeEIsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEtBQWE7SUFDOUMsT0FBTyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBYTtJQUN4QyxPQUFPLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDeEIsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUFhO0lBQ3pDLE9BQU8sS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUMxQixDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsOEJBQThCLENBQUMsS0FBYTtJQUMxRCxPQUFPLEtBQUssR0FBRyxRQUFRLENBQUM7QUFDMUIsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHlCQUF5QixDQUFDLEtBQWE7SUFDckQsT0FBTyxLQUFLLEdBQUcsWUFBWSxDQUFDO0FBQzlCLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSx3QkFB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b0M7O1FBQ2pFLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUMxQyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3pELENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxVQUFvQzs7UUFDcEUsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOztRQUNsRSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxDQUFDO0lBQ3hELElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtRQUNqQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE9BQWdCOztRQUMvQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFDOUIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3RDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2xCLFNBQVMsRUFBRTtZQUNULGlCQUFpQjtZQUNqQix5QkFBeUI7U0FDMUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ1gsU0FBUyxFQUFFLEtBQUs7S0FDakIsQ0FBQztJQUNGLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRW5DLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sR2VvbWV0cnkgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCBPbFBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xyXG5pbXBvcnQgT2xMaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XHJcbmltcG9ydCBPbFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcclxuaW1wb3J0IE9sT3ZlcmxheSBmcm9tICdvbC9PdmVybGF5JztcclxuaW1wb3J0IHsgZ2V0Q2VudGVyIGFzIG9sR2V0Q2VudGVyIH0gZnJvbSAnb2wvZXh0ZW50JztcclxuaW1wb3J0IHtcclxuICBnZXRMZW5ndGggYXMgb2xHZXRMZW5ndGgsXHJcbiAgZ2V0QXJlYSBhcyBvbEdldEFyZWFcclxufSBmcm9tICdvbC9zcGhlcmUnO1xyXG5cclxuaW1wb3J0IHsgTWVhc3VyZSB9IGZyb20gJy4vbWVhc3VyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtcclxuICBNZWFzdXJlQXJlYVVuaXQsXHJcbiAgTWVhc3VyZUFyZWFVbml0QWJicmV2aWF0aW9uLFxyXG4gIE1lYXN1cmVMZW5ndGhVbml0LFxyXG4gIE1lYXN1cmVMZW5ndGhVbml0QWJicmV2aWF0aW9uXHJcbn0gZnJvbSAnLi9tZWFzdXJlLmVudW0nO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBtZXRlcnMgdG8ga2lsb21ldGVyc1xyXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgaW4gbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIGtpbG9tZXRlcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXRlcnNUb0tpbG9tZXRlcnModmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHZhbHVlICogMC4wMDE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHZhbHVlIGZyb20gbWV0ZXJzIHRvIGZlZXRcclxuICogQHBhcmFtIHZhbHVlIFZhbHVlIGluIG1ldGVyc1xyXG4gKiBAcmV0dXJucyBWYWx1ZSBpbiBmZWV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWV0ZXJzVG9GZWV0KHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiB2YWx1ZSAqIDMuMjgwODtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBtZXRlcnMgdG8gbWlsZXNcclxuICogQHBhcmFtIHZhbHVlIFZhbHVlIGluIG1ldGVyc1xyXG4gKiBAcmV0dXJucyBWYWx1ZSBpbiBtaWxlc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1ldGVyc1RvTWlsZXModmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHZhbHVlICogMC4wMDA2MjE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHZhbHVlIGZyb20gc3F1YXJlIG1ldGVycyB0byBzcXVhcmUga2lsb21ldGVyc1xyXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgaW4gc3F1YXJlIG1ldGVyc1xyXG4gKiBAcmV0dXJucyBWYWx1ZSBpbiBzcXVhcmUga2lsb21ldGVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZU1ldGVyc1RvU3F1YXJlS2lsb21ldGVycyh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gdmFsdWUgKiAwLjAwMDAwMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBzcXVhcmUgbWV0ZXJzIHRvIHNxdWFyZSBtaWxlc1xyXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgaW4gc3F1YXJlIG1ldGVyc1xyXG4gKiBAcmV0dXJucyBWYWx1ZSBpbiBzcXVhcmUgbWlsZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVNZXRlcnNUb1NxdWFyZU1pbGVzKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiB2YWx1ZSAqIDAuMDAwMDAwMzg2MTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBzcXVhcmUgbWV0ZXJzIHRvIHNxdWFyZSBmZWV0XHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBzcXVhcmUgbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIHNxdWFyZSBmZWV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlTWV0ZXJzVG9TcXVhcmVGZWV0KHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiB2YWx1ZSAqIDEwLjc2NDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBzcXVhcmUgbWV0ZXJzIHRvIGhlY3RhcmVzXHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBzcXVhcmUgbWV0ZXJzXHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIGhlY3RhcmVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlTWV0ZXJzVG9IZWN0YXJlcyh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gdmFsdWUgKiAwLjAwMDE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHZhbHVlIGZyb20gc3F1YXJlIG1ldGVycyB0byBhY3Jlc1xyXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgaW4gc3F1YXJlIG1ldGVyc1xyXG4gKiBAcmV0dXJucyBWYWx1ZSBpbiBhY3Jlc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZU1ldGVyc1RvQWNyZXModmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHZhbHVlICogMC4wMDAyNDcxMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBtZXRlcnMgdG8gdGhlIHNwZWNpZmllZCBsZW5ndGggdW5pdFxyXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgaW4gbWV0ZXJzXHJcbiAqIEBwYXJhbSB1bml0IExlbmd0aCB1bml0XHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIHVuaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXRlcnNUb1VuaXQodmFsdWU6IG51bWJlciwgdW5pdDogTWVhc3VyZUxlbmd0aFVuaXQpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gIGNvbnN0IGNvbnZlcnNpb25NYXBwZXIgPSBuZXcgTWFwKFtcclxuICAgIFtNZWFzdXJlTGVuZ3RoVW5pdC5NZXRlcnMsICh2YWw6IG51bWJlcikgPT4gdmFsXSxcclxuICAgIFtNZWFzdXJlTGVuZ3RoVW5pdC5LaWxvbWV0ZXJzLCBtZXRlcnNUb0tpbG9tZXRlcnNdLFxyXG4gICAgW01lYXN1cmVMZW5ndGhVbml0Lk1pbGVzLCBtZXRlcnNUb01pbGVzXSxcclxuICAgIFtNZWFzdXJlTGVuZ3RoVW5pdC5GZWV0LCBtZXRlcnNUb0ZlZXRdLFxyXG4gIF0pO1xyXG4gIGNvbnN0IGNvbnZlcnNpb24gPSBjb252ZXJzaW9uTWFwcGVyLmdldCh1bml0KTtcclxuXHJcbiAgcmV0dXJuIGNvbnZlcnNpb24gPyBjb252ZXJzaW9uKHZhbHVlKSA6IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdmFsdWUgZnJvbSBzcXVhcmUgbWV0ZXJzIHRvIHRoZSBzcGVjaWZpZWQgYXJlYSB1bml0XHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBtZXRlcnNcclxuICogQHBhcmFtIHVuaXQgQXJlYSB1bml0XHJcbiAqIEByZXR1cm5zIFZhbHVlIGluIHVuaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVNZXRlcnNUb1VuaXQodmFsdWU6IG51bWJlciwgdW5pdDogTWVhc3VyZUFyZWFVbml0KTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICBjb25zdCBjb252ZXJzaW9uTWFwcGVyID0gbmV3IE1hcChbXHJcbiAgICBbTWVhc3VyZUFyZWFVbml0LlNxdWFyZU1ldGVycywgKHZhbDogbnVtYmVyKSA9PiB2YWxdLFxyXG4gICAgW01lYXN1cmVBcmVhVW5pdC5TcXVhcmVLaWxvbWV0ZXJzLCBzcXVhcmVNZXRlcnNUb1NxdWFyZUtpbG9tZXRlcnNdLFxyXG4gICAgW01lYXN1cmVBcmVhVW5pdC5TcXVhcmVNaWxlcywgc3F1YXJlTWV0ZXJzVG9TcXVhcmVNaWxlc10sXHJcbiAgICBbTWVhc3VyZUFyZWFVbml0LlNxdWFyZUZlZXQsIHNxdWFyZU1ldGVyc1RvU3F1YXJlRmVldF0sXHJcbiAgICBbTWVhc3VyZUFyZWFVbml0LkhlY3RhcmVzLCBzcXVhcmVNZXRlcnNUb0hlY3RhcmVzXSxcclxuICAgIFtNZWFzdXJlQXJlYVVuaXQuQWNyZXMsIHNxdWFyZU1ldGVyc1RvQWNyZXNdLFxyXG4gIF0pO1xyXG4gIGNvbnN0IGNvbnZlcnNpb24gPSBjb252ZXJzaW9uTWFwcGVyLmdldCh1bml0KTtcclxuXHJcbiAgcmV0dXJuIGNvbnZlcnNpb24gPyBjb252ZXJzaW9uKHZhbHVlKSA6IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWV0aG9kIGZvcm1hdCBhIG1lYXN1cmUgdG8gYSByZWFkYWJsZSBmb3JtYXRcclxuICogQHBhcmFtIG1lYXN1cmUgTWVhc3VyZVxyXG4gKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnNcclxuICogQHJldHVybnMgRm9ybWF0dGVkIG1lYXN1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRNZWFzdXJlKG1lYXN1cmU6IG51bWJlciwgb3B0aW9ucz86IHtcclxuICBkZWNpbWFsPzogbnVtYmVyO1xyXG4gIHVuaXQ/OiBNZWFzdXJlQXJlYVVuaXQgfCBNZWFzdXJlTGVuZ3RoVW5pdDtcclxuICB1bml0QWJicj86IGJvb2xlYW47XHJcbiAgbG9jYWxlPzogc3RyaW5nO1xyXG59KSB7XHJcbiAgbGV0IGRlY2ltYWwgPSBvcHRpb25zLmRlY2ltYWw7XHJcbiAgaWYgKGRlY2ltYWwgPT09IHVuZGVmaW5lZCB8fCBkZWNpbWFsIDwgMCkge1xyXG4gICAgZGVjaW1hbCA9IDE7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJ0cyA9IFtdO1xyXG4gIGlmIChvcHRpb25zLmxvY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwYXJ0cy5wdXNoKG1lYXN1cmUudG9Mb2NhbGVTdHJpbmcob3B0aW9ucy5sb2NhbGUsIHtcclxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBkZWNpbWFsLFxyXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IGRlY2ltYWxcclxuICAgIH0pKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFydHMucHVzaChtZWFzdXJlLnRvRml4ZWQoZGVjaW1hbCkudG9TdHJpbmcoKSk7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy51bml0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy51bml0QWJiciA9PT0gdHJ1ZSkge1xyXG4gICAgcGFydHMucHVzaChcclxuICAgICAgTWVhc3VyZUxlbmd0aFVuaXRBYmJyZXZpYXRpb25bb3B0aW9ucy51bml0XSB8fFxyXG4gICAgICBNZWFzdXJlQXJlYVVuaXRBYmJyZXZpYXRpb25bb3B0aW9ucy51bml0XVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJ0cy5maWx0ZXIocCA9PiBwICE9PSB1bmRlZmluZWQpLmpvaW4oJyAnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYmVzdCBsZW5ndGggbWVhc3VyZSB1bml0IGZvciBhIGdpdmVuIG1lYXN1cmUgaW4gbWV0ZXJzXHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBtZXRlcnNcclxuICogQHJldHVybnMgTWVhc3VyZSB1bml0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUJlc3RMZW5ndGhVbml0KHZhbHVlOiBudW1iZXIpOiBNZWFzdXJlTGVuZ3RoVW5pdCB7XHJcbiAgbGV0IHVuaXQgPSBNZWFzdXJlTGVuZ3RoVW5pdC5NZXRlcnM7XHJcbiAgbGV0IGNvbnZlcnRlZCA9IHZhbHVlO1xyXG4gIGNvbnN0IHBvc3NpYmxlVW5pdHMgPSBbTWVhc3VyZUxlbmd0aFVuaXQuS2lsb21ldGVyc107XHJcbiAgd2hpbGUgKGNvbnZlcnRlZCA+IDEwMDAgJiYgcG9zc2libGVVbml0cy5sZW5ndGggPiAwKSB7XHJcbiAgICB1bml0ID0gcG9zc2libGVVbml0cy5wb3AoKTtcclxuICAgIGNvbnZlcnRlZCA9IG1ldGVyc1RvVW5pdCh2YWx1ZSwgdW5pdCk7XHJcbiAgfVxyXG4gIHJldHVybiB1bml0O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBiZXN0IGxlbmd0aCBtZWFzdXJlIHVuaXQgZm9yIGEgZ2l2ZW4gbWVhc3VyZSBpbiBzcXVhcmUgbWV0ZXJzXHJcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBpbiBtZXRlcnNcclxuICogQHJldHVybnMgTWVhc3VyZSB1bml0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUJlc3RBcmVhVW5pdCh2YWx1ZTogbnVtYmVyKTogTWVhc3VyZUFyZWFVbml0IHtcclxuICBsZXQgdW5pdCA9IE1lYXN1cmVBcmVhVW5pdC5TcXVhcmVNZXRlcnM7XHJcbiAgbGV0IGNvbnZlcnRlZCA9IHZhbHVlO1xyXG4gIGNvbnN0IHBvc3NpYmxlVW5pdHMgPSBbTWVhc3VyZUFyZWFVbml0LlNxdWFyZUtpbG9tZXRlcnNdO1xyXG4gIHdoaWxlIChjb252ZXJ0ZWQgPiAxMDAwMDAwICYmIHBvc3NpYmxlVW5pdHMubGVuZ3RoID4gMCkge1xyXG4gICAgdW5pdCA9IHBvc3NpYmxlVW5pdHMucG9wKCk7XHJcbiAgICBjb252ZXJ0ZWQgPSBzcXVhcmVNZXRlcnNUb1VuaXQodmFsdWUsIHVuaXQpO1xyXG4gIH1cclxuICByZXR1cm4gdW5pdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGRlZmF1bHQgc3R5bGUgZm9yIGEgbWVhc3VyZSBpbnRlcmFjdGlvblxyXG4gKiBAcmV0dXJucyBPTCBzdHlsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lYXN1cmVJbnRlcmFjdGlvblN0eWxlKCk6IG9sc3R5bGUuU3R5bGUge1xyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgIGNvbG9yOiAnI2ZmY2MzMycsXHJcbiAgICAgIGxpbmVEYXNoOiBbMTAsIDEwXSxcclxuICAgICAgd2lkdGg6IDJcclxuICAgIH0pLFxyXG4gICAgZmlsbDogIG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSdcclxuICAgIH0pLFxyXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgIHJhZGl1czogNSxcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgIGNvbG9yOiAnI2ZmY2MzMycsXHJcbiAgICAgIH0pLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSdcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBkZWZhdWx0IHN0eWxlIGZvciBhIG1lYXN1cmUgbGF5ZXJcclxuICogQHJldHVybnMgT0wgc3R5bGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZWFzdXJlTGF5ZXJTdHlsZSgpOiBvbHN0eWxlLlN0eWxlIHtcclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICBjb2xvcjogJyNmZmNjMzMnLFxyXG4gICAgICB3aWR0aDogMlxyXG4gICAgfSksXHJcbiAgICBmaWxsOiAgbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJ1xyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIGxlbmd0aCBpbiBtZXRlcnMgb2YgYW4gT0wgZ2VvbWV0cnkgd2l0aCBhIGdpdmVuIHByb2plY3Rpb25cclxuICogQHBhcmFtIG9sR2VvbWV0cnkgT2wgZ2VvbWV0cnlcclxuICogQHBhcmFtIHByb2plY3Rpb24gb2xHZW9tZXRyeSdzIHByb2plY3Rpb25cclxuICogQHJldHVybnMgTGVuZ3RoIGluIG1ldGVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lYXN1cmVPbEdlb21ldHJ5TGVuZ3RoKG9sR2VvbWV0cnk6IE9sR2VvbWV0cnksIHByb2plY3Rpb246IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgaWYgKG9sR2VvbWV0cnkgaW5zdGFuY2VvZiBPbFBvaW50KSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBpZiAob2xHZW9tZXRyeS5nZXRGbGF0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIHJldHVybiBvbEdldExlbmd0aChvbEdlb21ldHJ5LCB7cHJvamVjdGlvbn0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgYXJlYSBpbiBzcXVhcmUgbWV0ZXJzIG9mIGFuIE9MIGdlb21ldHJ5IHdpdGggYSBnaXZlbiBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9sIGdlb21ldHJ5XHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uIG9sR2VvbWV0cnkncyBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIEFyZWEgaW4gc3F1YXJlIG1ldGVyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lYXN1cmVPbEdlb21ldHJ5QXJlYShvbEdlb21ldHJ5OiBPbEdlb21ldHJ5LCBwcm9qZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gIGlmIChvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xQb2ludCB8fCBvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xMaW5lU3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBpZiAob2xHZW9tZXRyeS5nZXRGbGF0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIHJldHVybiBvbEdldEFyZWEob2xHZW9tZXRyeSwge3Byb2plY3Rpb259KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIGFyZWEgKHNxdWFyZSBtZXRlcnMpLCBsZW5ndGggKG1ldGVycykgYW5kIGxhc3QgbGVuZ3RoIChtZXRlcnMpXHJcbiAqIG9mIGFuIE9MIGdlb21ldHJ5IHdpdGggYSBnaXZlbiBwcm9qZWN0aW9uLlxyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPbCBnZW9tZXRyeVxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbiBvbEdlb21ldHJ5J3MgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBDb21wdXRlZCBtZWFzdXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVhc3VyZU9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xHZW9tZXRyeSwgcHJvamVjdGlvbjogc3RyaW5nKTogTWVhc3VyZSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gbWVhc3VyZU9sR2VvbWV0cnlMZW5ndGgob2xHZW9tZXRyeSwgcHJvamVjdGlvbik7XHJcbiAgY29uc3QgYXJlYSA9IG1lYXN1cmVPbEdlb21ldHJ5QXJlYShvbEdlb21ldHJ5LCBwcm9qZWN0aW9uKTtcclxuXHJcbiAgY29uc3QgbGVuZ3RocyA9IFtdO1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gb2xHZW9tZXRyeS5mbGF0Q29vcmRpbmF0ZXM7XHJcbiAgY29uc3QgY29vcmRpbmF0ZXNMZW5ndGggPSBjb29yZGluYXRlcy5sZW5ndGg7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gY29vcmRpbmF0ZXNMZW5ndGggLSA0OyBpICs9IDIpIHtcclxuICAgIGNvbnN0IG9sU2VnbWVudCA9IG5ldyBPbExpbmVTdHJpbmcoW1xyXG4gICAgICBbY29vcmRpbmF0ZXNbaV0sIGNvb3JkaW5hdGVzW2kgKyAxXV0sXHJcbiAgICAgIFtjb29yZGluYXRlc1tpICsgMl0sIGNvb3JkaW5hdGVzW2kgKyAzXV1cclxuICAgIF0pO1xyXG5cclxuICAgIGxlbmd0aHMucHVzaChtZWFzdXJlT2xHZW9tZXRyeUxlbmd0aChvbFNlZ21lbnQsIHByb2plY3Rpb24pKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhcmVhLFxyXG4gICAgbGVuZ3RoLFxyXG4gICAgbGVuZ3Roc1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgYW4gT0wgZ2VvbWV0cnkgbWlkcG9pbnRzIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgdGhvc2UgcG9pbnRzXHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqIEByZXR1cm5zIE9MIHBvaW50c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU9sR2VvbWV0cnlNaWRwb2ludHMob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKTogT2xQb2ludFtdIHtcclxuICBjb25zdCBvbE1pZHBvaW50cyA9IGdldE9sR2VvbWV0cnlNaWRwb2ludHMob2xHZW9tZXRyeSk7XHJcblxyXG4gIC8vIFRPRE86IGhhbmRsZSBtdWx0aSBnZW9tZXRyaWVzXHJcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBvbEdlb21ldHJ5LmZsYXRDb29yZGluYXRlcztcclxuICBjb25zdCBtaWRwb2ludHNMZW5ndGggPSBvbE1pZHBvaW50cy5sZW5ndGg7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaWRwb2ludHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgaiA9IGkgKiAyO1xyXG4gICAgY29uc3Qgb2xTZWdtZW50ID0gbmV3IE9sTGluZVN0cmluZyhbXHJcbiAgICAgIFtjb29yZGluYXRlc1tqXSwgY29vcmRpbmF0ZXNbaiArIDFdXSxcclxuICAgICAgW2Nvb3JkaW5hdGVzW2ogKyAyXSwgY29vcmRpbmF0ZXNbaiArIDNdXVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3QgbWlkcG9pbnRDb29yZGluYXRlID0gb2xTZWdtZW50LmdldENvb3JkaW5hdGVBdCgwLjUpO1xyXG4gICAgY29uc3Qgb2xNaWRwb2ludCA9IG9sTWlkcG9pbnRzW2ldO1xyXG4gICAgaWYgKG9sTWlkcG9pbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvbE1pZHBvaW50LnNldENvb3JkaW5hdGVzKG1pZHBvaW50Q29vcmRpbmF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbE1pZHBvaW50c1tpXSA9IG5ldyBPbFBvaW50KG1pZHBvaW50Q29vcmRpbmF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBvbE1pZHBvaW50cztcclxufVxyXG5cclxuLyoqXHJcbiAqIENsZWFyIGFuIE9MIGdlb21ldHJ5IG1pZHBvaW50cyBhbmQgcmV0dXJuIGFuIGFycmF5IG9mIHRob3NlIHBvaW50c1xyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyT2xHZW9tZXRyeU1pZHBvaW50cyhvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pIHtcclxuICBjb25zdCBvbE1pZHBvaW50cyA9IG9sR2VvbWV0cnkuZ2V0KCdfbWlkcG9pbnRzJykgfHwgW107XHJcbiAgY29uc3QgbWlkcG9pbnRzTGVuZ3RoID0gb2xNaWRwb2ludHMubGVuZ3RoO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWlkcG9pbnRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IG9sTWlkcG9pbnQgPSBvbE1pZHBvaW50c1tpXTtcclxuICAgIGlmIChvbE1pZHBvaW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKG9sTWlkcG9pbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNsZWFyT2xNaWRwb2ludFRvb2x0aXAob2xNaWRwb2ludCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9sR2VvbWV0cnkuc2V0KCdfbWlkcG9pbnRzJywgdW5kZWZpbmVkLCB0cnVlKTtcclxuXHJcbiAgcmV0dXJuIG9sTWlkcG9pbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFuIGFycmF5IG9mICBPTCBnZW9tZXRyeSBtaWRwb2ludHMsIGlmIGFueVxyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gKiBAcmV0dXJucyBPTCBwb2ludHNcclxuICovXHJcbmZ1bmN0aW9uIGdldE9sR2VvbWV0cnlNaWRwb2ludHMob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKTogT2xQb2ludFtdIHtcclxuICBjb25zdCBleHBlY3RlZE51bWJlciA9IE1hdGgubWF4KChvbEdlb21ldHJ5LmZsYXRDb29yZGluYXRlcy5sZW5ndGggLyAyKSAtIDEsIDApO1xyXG5cclxuICAvLyBUT0RPOiBUaGlzIHdvcmtzIGJ1dCBpdCdzIHF1aXRlIG1lc3N5LiBJZiB0aW1lIHBlcm1pdHMsXHJcbiAgLy8gY2xlYW4gdGhpcy4gTWF5YmUgYSBUb29sdGlwIGNsYXNzIGNvdWxkIGhhbmRsZSB0aGF0XHJcbiAgbGV0IG9sTWlkcG9pbnRzID0gb2xHZW9tZXRyeS5nZXQoJ19taWRwb2ludHMnKTtcclxuICBpZiAob2xNaWRwb2ludHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xNaWRwb2ludHMgPSBuZXcgQXJyYXkoZXhwZWN0ZWROdW1iZXIpO1xyXG4gICAgb2xHZW9tZXRyeS5zZXQoJ19taWRwb2ludHMnLCBvbE1pZHBvaW50cywgdHJ1ZSk7XHJcbiAgICByZXR1cm4gb2xNaWRwb2ludHM7XHJcbiAgfVxyXG5cclxuICBpZiAoZXhwZWN0ZWROdW1iZXIgPT09IG9sTWlkcG9pbnRzLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIG9sTWlkcG9pbnRzO1xyXG4gIH1cclxuXHJcbiAgaWYgKGV4cGVjdGVkTnVtYmVyID4gb2xNaWRwb2ludHMubGVuZ3RoKSB7XHJcbiAgICBvbE1pZHBvaW50cy5wdXNoKC4uLm5ldyBBcnJheShleHBlY3RlZE51bWJlciAtIG9sTWlkcG9pbnRzLmxlbmd0aCkpO1xyXG4gICAgcmV0dXJuIG9sTWlkcG9pbnRzO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IGV4cGVjdGVkTnVtYmVyOyBpIDwgb2xNaWRwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IG9sTWlkcG9pbnQgPSBvbE1pZHBvaW50c1tleHBlY3RlZE51bWJlcl07XHJcbiAgICBpZiAob2xNaWRwb2ludCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNsZWFyT2xNaWRwb2ludFRvb2x0aXAob2xNaWRwb2ludCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9sTWlkcG9pbnRzLnNwbGljZShleHBlY3RlZE51bWJlcik7XHJcblxyXG4gIHJldHVybiBvbE1pZHBvaW50cztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbiBPTCBtaWRwb2ludCdzIHRvb2x0aXAgZnJvbSB0aGUgbWFwXHJcbiAqIEBwYXJhbSBvbE1pZHBvaW50IE9MIFBvaW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjbGVhck9sTWlkcG9pbnRUb29sdGlwKG9sTWlkcG9pbnQ6IE9sUG9pbnQpIHtcclxuICBjb25zdCBvbFRvb2x0aXAgPSBvbE1pZHBvaW50LmdldCgnX3Rvb2x0aXAnKTtcclxuICBpZiAob2xUb29sdGlwICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IG9sTWFwID0gb2xUb29sdGlwLmdldE1hcCgpO1xyXG4gICAgaWYgKG9sTWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgb2xNYXAucmVtb3ZlT3ZlcmxheShvbFRvb2x0aXApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhbiBPTCBvdmVybGF5IGF0IGVhY2ggbWlkcG9pbnQgYW5kIHJldHVybiBhbiBhcnJheSBvZiB0aG9zZSBvdmVybGF5c1xyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gKiBAcmV0dXJucyBPTCBvdmVybGF5c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU9sVG9vbHRpcHNBdE1pZHBvaW50cyhvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pOiBPbE92ZXJsYXlbXSB7XHJcbiAgY29uc3Qgb2xNaWRwb2ludHMgPSB1cGRhdGVPbEdlb21ldHJ5TWlkcG9pbnRzKG9sR2VvbWV0cnkpO1xyXG4gIGNvbnN0IG9sVG9vbHRpcHMgPSBvbE1pZHBvaW50cy5tYXAoKG9sTWlkcG9pbnQ6IE9sUG9pbnQpID0+IHtcclxuICAgIGxldCBvbFRvb2x0aXAgPSBvbE1pZHBvaW50LmdldCgnX3Rvb2x0aXAnKTtcclxuICAgIGlmIChvbFRvb2x0aXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvbFRvb2x0aXAgPSBjcmVhdGVPbFRvb2x0aXBBdFBvaW50KG9sTWlkcG9pbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2xUb29sdGlwLnNldFBvc2l0aW9uKG9sTWlkcG9pbnQuZmxhdENvb3JkaW5hdGVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvbFRvb2x0aXA7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG9sVG9vbHRpcHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgT0wgb3ZlcmxheSBhdCBtaWRzcG9pbnRzLCBpZiBhbnlcclxuICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgR2VvbWV0cnlcclxuICogQHJldHVybnMgT0wgb3ZlcmxheXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPbFRvb2x0aXBzQXRNaWRwb2ludHMob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKTogT2xPdmVybGF5W10ge1xyXG4gIGNvbnN0IG9sTWlkcG9pbnRzID0gZ2V0T2xHZW9tZXRyeU1pZHBvaW50cyhvbEdlb21ldHJ5KTtcclxuICByZXR1cm4gb2xNaWRwb2ludHMubWFwKChvbE1pZHBvaW50OiBPbFBvaW50KSA9PiB7XHJcbiAgICByZXR1cm4gb2xNaWRwb2ludCA/IG9sTWlkcG9pbnQuZ2V0KCdfdG9vbHRpcCcpIDogdW5kZWZpbmVkO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIGFuIE9MIGdlb21ldHJ5IGNlbnRlciBhbmQgcmV0dXJuIGl0XHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqIEByZXR1cm5zIE9MIHBvaW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlT2xHZW9tZXRyeUNlbnRlcihvbEdlb21ldHJ5OiBPbExpbmVTdHJpbmcgfCBPbFBvbHlnb24pOiBPbFBvaW50IHtcclxuICBsZXQgb2xDZW50ZXIgPSBvbEdlb21ldHJ5LmdldCgnX2NlbnRlcicpO1xyXG4gIGNvbnN0IGNlbnRlckNvb3JkaW5hdGUgPSBvbEdldENlbnRlcihvbEdlb21ldHJ5LmdldEV4dGVudCgpKTtcclxuICBpZiAob2xDZW50ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xDZW50ZXIuc2V0Q29vcmRpbmF0ZXMoY2VudGVyQ29vcmRpbmF0ZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG9sQ2VudGVyID0gbmV3IE9sUG9pbnQoY2VudGVyQ29vcmRpbmF0ZSk7XHJcbiAgICBvbEdlb21ldHJ5LnNldCgnX2NlbnRlcicsIG9sQ2VudGVyKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvbENlbnRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZCBhbiBPTCBvdmVybGF5IGF0IHRoZSBjZW50ZXIgb2YgYSBnZW9tZXRyeSBhbmQgcmV0dXJuIHRoYXQgb3ZlcmxheVxyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gKiBAcmV0dXJucyBPTCBvdmVybGF5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlT2xUb29sdGlwQXRDZW50ZXIob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKTogT2xPdmVybGF5IHtcclxuICBjb25zdCBvbENlbnRlciA9IHVwZGF0ZU9sR2VvbWV0cnlDZW50ZXIob2xHZW9tZXRyeSk7XHJcbiAgbGV0IG9sVG9vbHRpcCA9IG9sQ2VudGVyLmdldCgnX3Rvb2x0aXAnKTtcclxuICBpZiAob2xUb29sdGlwID09PSB1bmRlZmluZWQpIHtcclxuICAgIG9sVG9vbHRpcCA9IGNyZWF0ZU9sVG9vbHRpcEF0UG9pbnQob2xDZW50ZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBvbFRvb2x0aXAuc2V0UG9zaXRpb24ob2xDZW50ZXIuZmxhdENvb3JkaW5hdGVzKTtcclxuICB9XHJcbiAgcmV0dXJuIG9sVG9vbHRpcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhbiBhcnJheSBvZiBPTCBvdmVybGF5IGF0IG1pZHNwb2ludHMsIGlmIGFueVxyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBHZW9tZXRyeVxyXG4gKiBAcmV0dXJucyBPTCBvdmVybGF5c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9sVG9vbHRpcEF0Q2VudGVyKG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbik6IE9sT3ZlcmxheSB7XHJcbiAgY29uc3Qgb2xDZW50ZXIgPSBvbEdlb21ldHJ5LmdldCgnX2NlbnRlcicpO1xyXG4gIHJldHVybiBvbENlbnRlciA/IG9sQ2VudGVyLmdldCgnX3Rvb2x0aXAnKSA6IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBhbGwgdGhlIHRvb2x0aXBzIG9mIGFuIE9MIGdlb21ldHJ5XHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIEdlb21ldHJ5XHJcbiAqIEByZXR1cm5zIE9MIG92ZXJsYXlzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9vbHRpcHNPZk9sR2VvbWV0cnkob2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uKTogT2xPdmVybGF5W10ge1xyXG4gIGNvbnN0IG9sVG9vbHRpcHMgPSBbXS5jb25jYXQoZ2V0T2xUb29sdGlwc0F0TWlkcG9pbnRzKG9sR2VvbWV0cnkpIHx8IFtdKTtcclxuICBjb25zdCBvbENlbnRlclRvb2x0aXAgPSBnZXRPbFRvb2x0aXBBdENlbnRlcihvbEdlb21ldHJ5KTtcclxuICBpZiAob2xDZW50ZXJUb29sdGlwICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sVG9vbHRpcHMucHVzaChvbENlbnRlclRvb2x0aXApO1xyXG4gIH1cclxuICByZXR1cm4gb2xUb29sdGlwcztcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBPTCBvdmVybGF5IGF0IGEgcG9pbnQgYW5kIGJpbmQgdGhlIG92ZXJsYXkgdG8gdGhlIHBvaW50XHJcbiAqIEBwYXJhbSBvbFBvaW50IE9MIFBvaW50XHJcbiAqIEByZXR1cm5zIE9MIG92ZXJsYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPbFRvb2x0aXBBdFBvaW50KG9sUG9pbnQ6IE9sUG9pbnQpOiBPbE92ZXJsYXkge1xyXG4gIGNvbnN0IG9sVG9vbHRpcCA9IG5ldyBPbE92ZXJsYXkoe1xyXG4gICAgZWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICBvZmZzZXQ6IFstMzAsIC0xMF0sXHJcbiAgICBjbGFzc05hbWU6IFtcclxuICAgICAgJ2lnby1tYXAtdG9vbHRpcCcsXHJcbiAgICAgICdpZ28tbWFwLXRvb2x0aXAtbWVhc3VyZSdcclxuICAgIF0uam9pbignICcpLFxyXG4gICAgc3RvcEV2ZW50OiBmYWxzZVxyXG4gIH0pO1xyXG4gIG9sVG9vbHRpcC5zZXRQb3NpdGlvbihvbFBvaW50LmZsYXRDb29yZGluYXRlcyk7XHJcbiAgb2xQb2ludC5zZXQoJ190b29sdGlwJywgb2xUb29sdGlwKTtcclxuXHJcbiAgcmV0dXJuIG9sVG9vbHRpcDtcclxufVxyXG4iXX0=