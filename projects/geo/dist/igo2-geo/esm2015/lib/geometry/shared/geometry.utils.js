/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olstyle from 'ol/style';
import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';
import OlGeoJSON from 'ol/format/GeoJSON';
import lineIntersect from '@turf/line-intersect';
import { lineString } from '@turf/helpers';
import { GeometrySliceMultiPolygonError, GeometrySliceLineStringError, GeometrySliceTooManyIntersectionError } from './geometry.errors';
/**
 * Create a default style for draw and modify interactions
 * @param {?=} color Style color (R, G, B)
 * @return {?} OL style
 */
export function createDrawInteractionStyle(color) {
    color = color || [0, 153, 255];
    return new olstyle.Style({
        stroke: new olstyle.Stroke({
            color: color.concat([1]),
            width: 2
        }),
        fill: new olstyle.Fill({
            color: color.concat([0.2])
        }),
        image: new olstyle.Circle({
            radius: 8,
            stroke: new olstyle.Stroke({
                color: color.concat([1])
            }),
            fill: new olstyle.Fill({
                color: color.concat([0.2])
            })
        })
    });
}
/**
 * Create a default style for drawing a hole
 * @return {?} OL style
 */
export function createDrawHoleInteractionStyle() {
    return new olstyle.Style({
        stroke: new olstyle.Stroke({
            color: [0, 153, 255, 1],
            width: 2
        })
    });
}
/**
 * Slice geometry into two parts
 * @param {?} olGeometry OL geometry
 * @param {?} olSlicer Slicing line
 * @return {?} New OL geometries
 */
export function sliceOlGeometry(olGeometry, olSlicer) {
    if (olGeometry instanceof OlPolygon) {
        return sliceOlPolygon(olGeometry, olSlicer);
    }
    else if (olGeometry instanceof OlLineString) {
        return sliceOlLineString(olGeometry, olSlicer);
    }
    return [];
}
/**
 * Slice OL LineString into one or more lines
 * @param {?} olLineString OL line string
 * @param {?} olSlicer Slicing line
 * @return {?} New OL line strings
 */
export function sliceOlLineString(olLineString, olSlicer) {
    return [];
}
/**
 * Slice OL Polygon into one or more polygons
 * @param {?} olPolygon OL polygon
 * @param {?} olSlicer Slicing line
 * @return {?} New OL polygons
 */
export function sliceOlPolygon(olPolygon, olSlicer) {
    if (olPolygon.getLinearRingCount() > 1) {
        throw new GeometrySliceMultiPolygonError();
    }
    if (olSlicer.getCoordinates().length > 2) {
        throw new GeometrySliceLineStringError();
    }
    /** @type {?} */
    const olGeoJSON = new OlGeoJSON();
    /** @type {?} */
    const slicer = olGeoJSON.writeGeometryObject(olSlicer);
    /** @type {?} */
    const outerCoordinates = olPolygon.getLinearRing(0).getCoordinates();
    /** @type {?} */
    const parts = [[], []];
    /** @type {?} */
    let totalIntersectionCount = 0;
    for (let i = 0, ii = outerCoordinates.length - 1; i < ii; i++) {
        /** @type {?} */
        const segmentCoordinates = [outerCoordinates[i], outerCoordinates[i + 1]];
        /** @type {?} */
        const segment = lineString(segmentCoordinates);
        /** @type {?} */
        const intersections = lineIntersect(segment, slicer).features;
        /** @type {?} */
        const intersectionCount = intersections.length;
        totalIntersectionCount += intersectionCount;
        if (intersectionCount > 1 || totalIntersectionCount > 2) {
            throw new GeometrySliceTooManyIntersectionError();
        }
        parts[0].push(segmentCoordinates[0]);
        if (intersectionCount === 1) {
            /** @type {?} */
            const intersection = intersections[0].geometry.coordinates;
            parts[0].push(intersection);
            parts[1].push(intersection);
            parts.reverse();
        }
    }
    if (totalIntersectionCount <= 1) {
        return [];
    }
    parts[0].push(parts[0][0]);
    parts[1].push(parts[1][0]);
    return [new OlPolygon([parts[0]]), new OlPolygon([parts[1]])];
}
/**
 * Splice geometry into two parts
 * @param {?} olPolygon
 * @param {?} olLinearRing
 * @return {?} New OL geometries
 */
export function addLinearRingToOlPolygon(olPolygon, olLinearRing) {
    // TODO: make some validation and support updating an existing linear ring
    olPolygon.appendLinearRing(olLinearRing);
}
/**
 * @param {?} olEvent
 * @return {?}
 */
export function getMousePositionFromOlGeometryEvent(olEvent) {
    /** @type {?} */
    const olGeometry = olEvent.target;
    if (olGeometry instanceof OlPolygon) {
        return olGeometry.flatCoordinates.slice(-4, -2);
    }
    return olGeometry.flatCoordinates.slice(-2);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnkudXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvc2hhcmVkL2dlb21ldHJ5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLGFBQWEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCw4QkFBOEIsRUFDOUIsNEJBQTRCLEVBQzVCLHFDQUFxQyxFQUNyQyxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFPNUIsTUFBTSxVQUFVLDBCQUEwQixDQUFDLEtBQWdDO0lBQ3pFLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDekIsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFLLEVBQUUsQ0FBQztTQUNULENBQUM7UUFDRixJQUFJLEVBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0IsQ0FBQztRQUNGLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDeEIsTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pCLENBQUM7WUFDRixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCLENBQUM7U0FDSCxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7QUFNRCxNQUFNLFVBQVUsOEJBQThCO0lBQzVDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDekIsS0FBSyxFQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsZUFBZSxDQUM3QixVQUFvQyxFQUNwQyxRQUFzQjtJQUV0QixJQUFJLFVBQVUsWUFBWSxTQUFTLEVBQUU7UUFDbkMsT0FBTyxjQUFjLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO1NBQU0sSUFBSSxVQUFVLFlBQVksWUFBWSxFQUFFO1FBQzdDLE9BQU8saUJBQWlCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFlBQTBCLEVBQUUsUUFBc0I7SUFDbEYsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxTQUFvQixFQUFFLFFBQXNCO0lBQ3pFLElBQUksU0FBUyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ3RDLE1BQU0sSUFBSSw4QkFBOEIsRUFBRSxDQUFDO0tBQzVDO0lBRUQsSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4QyxNQUFNLElBQUksNEJBQTRCLEVBQUUsQ0FBQztLQUMxQzs7VUFFSyxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUU7O1VBQzNCLE1BQU0sR0FBRyxTQUFTLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDOztVQUNoRCxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRTs7VUFFOUQsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7UUFDbEIsc0JBQXNCLEdBQUcsQ0FBQztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFOztjQUN2RCxrQkFBa0IsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Y0FDbkUsT0FBTyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQzs7Y0FDeEMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUTs7Y0FFdkQsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLE1BQU07UUFDOUMsc0JBQXNCLElBQUksaUJBQWlCLENBQUM7UUFDNUMsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sSUFBSSxxQ0FBcUMsRUFBRSxDQUFDO1NBQ25EO1FBRUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksaUJBQWlCLEtBQUssQ0FBQyxFQUFFOztrQkFDckIsWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVztZQUMxRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pCO0tBQ0Y7SUFFRCxJQUFJLHNCQUFzQixJQUFJLENBQUMsRUFBRTtRQUMvQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNCLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxTQUFvQixFQUFFLFlBQTBCO0lBQ3ZGLDBFQUEwRTtJQUMxRSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUNBQW1DLENBQ2pELE9BQXdCOztVQUVsQixVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU07SUFDakMsSUFBSSxVQUFVLFlBQVksU0FBUyxFQUFFO1FBQ25DLE9BQU8sVUFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRDtJQUNELE9BQU8sVUFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbExpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcclxuaW1wb3J0IE9sTGluZWFyUmluZyBmcm9tICdvbC9nZW9tL0xpbmVhclJpbmcnO1xyXG5pbXBvcnQgT2xQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XHJcbmltcG9ydCB7IEdlb21ldHJ5RXZlbnQgYXMgT2xHZW9tZXRyeUV2ZW50IH0gZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XHJcbmltcG9ydCBPbEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgbGluZUludGVyc2VjdCBmcm9tICdAdHVyZi9saW5lLWludGVyc2VjdCc7XHJcbmltcG9ydCB7IGxpbmVTdHJpbmcgfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgR2VvbWV0cnlTbGljZU11bHRpUG9seWdvbkVycm9yLFxyXG4gIEdlb21ldHJ5U2xpY2VMaW5lU3RyaW5nRXJyb3IsXHJcbiAgR2VvbWV0cnlTbGljZVRvb01hbnlJbnRlcnNlY3Rpb25FcnJvclxyXG4gfSBmcm9tICcuL2dlb21ldHJ5LmVycm9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZGVmYXVsdCBzdHlsZSBmb3IgZHJhdyBhbmQgbW9kaWZ5IGludGVyYWN0aW9uc1xyXG4gKiBAcGFyYW0gY29sb3IgU3R5bGUgY29sb3IgKFIsIEcsIEIpXHJcbiAqIEByZXR1cm5zIE9MIHN0eWxlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRHJhd0ludGVyYWN0aW9uU3R5bGUoY29sb3I/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pOiBvbHN0eWxlLlN0eWxlIHtcclxuICBjb2xvciA9IGNvbG9yIHx8IFswLCAxNTMsIDI1NV07XHJcbiAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgY29sb3I6IGNvbG9yLmNvbmNhdChbMV0pLFxyXG4gICAgICB3aWR0aDogMlxyXG4gICAgfSksXHJcbiAgICBmaWxsOiAgbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgIGNvbG9yOiBjb2xvci5jb25jYXQoWzAuMl0pXHJcbiAgICB9KSxcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICByYWRpdXM6IDgsXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICBjb2xvcjogY29sb3IuY29uY2F0KFsxXSlcclxuICAgICAgfSksXHJcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgIGNvbG9yOiBjb2xvci5jb25jYXQoWzAuMl0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZGVmYXVsdCBzdHlsZSBmb3IgZHJhd2luZyBhIGhvbGVcclxuICogQHJldHVybnMgT0wgc3R5bGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEcmF3SG9sZUludGVyYWN0aW9uU3R5bGUoKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgY29sb3I6ICBbMCwgMTUzLCAyNTUsIDFdLFxyXG4gICAgICB3aWR0aDogMlxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNsaWNlIGdlb21ldHJ5IGludG8gdHdvIHBhcnRzXHJcbiAqIEBwYXJhbSBvbEdlb21ldHJ5IE9MIGdlb21ldHJ5XHJcbiAqIEBwYXJhbSBvbFNsaWNlciBTbGljaW5nIGxpbmVcclxuICogQHJldHVybnMgTmV3IE9MIGdlb21ldHJpZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzbGljZU9sR2VvbWV0cnkoXHJcbiAgb2xHZW9tZXRyeTogT2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uLFxyXG4gIG9sU2xpY2VyOiBPbExpbmVTdHJpbmdcclxuKTogQXJyYXk8T2xMaW5lU3RyaW5nIHwgT2xQb2x5Z29uPiB7XHJcbiAgaWYgKG9sR2VvbWV0cnkgaW5zdGFuY2VvZiBPbFBvbHlnb24pIHtcclxuICAgIHJldHVybiBzbGljZU9sUG9seWdvbihvbEdlb21ldHJ5LCBvbFNsaWNlcik7XHJcbiAgfSBlbHNlIGlmIChvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xMaW5lU3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc2xpY2VPbExpbmVTdHJpbmcob2xHZW9tZXRyeSwgb2xTbGljZXIpO1xyXG4gIH1cclxuICByZXR1cm4gW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTbGljZSBPTCBMaW5lU3RyaW5nIGludG8gb25lIG9yIG1vcmUgbGluZXNcclxuICogQHBhcmFtIG9sTGluZVN0cmluZyBPTCBsaW5lIHN0cmluZ1xyXG4gKiBAcGFyYW0gb2xTbGljZXIgU2xpY2luZyBsaW5lXHJcbiAqIEByZXR1cm5zIE5ldyBPTCBsaW5lIHN0cmluZ3NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzbGljZU9sTGluZVN0cmluZyhvbExpbmVTdHJpbmc6IE9sTGluZVN0cmluZywgb2xTbGljZXI6IE9sTGluZVN0cmluZyk6IE9sTGluZVN0cmluZ1tdIHtcclxuICByZXR1cm4gW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTbGljZSBPTCBQb2x5Z29uIGludG8gb25lIG9yIG1vcmUgcG9seWdvbnNcclxuICogQHBhcmFtIG9sUG9seWdvbiBPTCBwb2x5Z29uXHJcbiAqIEBwYXJhbSBvbFNsaWNlciBTbGljaW5nIGxpbmVcclxuICogQHJldHVybnMgTmV3IE9MIHBvbHlnb25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VPbFBvbHlnb24ob2xQb2x5Z29uOiBPbFBvbHlnb24sIG9sU2xpY2VyOiBPbExpbmVTdHJpbmcpOiBPbFBvbHlnb25bXSB7XHJcbiAgaWYgKG9sUG9seWdvbi5nZXRMaW5lYXJSaW5nQ291bnQoKSA+IDEpIHtcclxuICAgIHRocm93IG5ldyBHZW9tZXRyeVNsaWNlTXVsdGlQb2x5Z29uRXJyb3IoKTtcclxuICB9XHJcblxyXG4gIGlmIChvbFNsaWNlci5nZXRDb29yZGluYXRlcygpLmxlbmd0aCA+IDIpIHtcclxuICAgIHRocm93IG5ldyBHZW9tZXRyeVNsaWNlTGluZVN0cmluZ0Vycm9yKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBvbEdlb0pTT04gPSBuZXcgT2xHZW9KU09OKCk7XHJcbiAgY29uc3Qgc2xpY2VyID0gb2xHZW9KU09OLndyaXRlR2VvbWV0cnlPYmplY3Qob2xTbGljZXIpO1xyXG4gIGNvbnN0IG91dGVyQ29vcmRpbmF0ZXMgPSBvbFBvbHlnb24uZ2V0TGluZWFyUmluZygwKS5nZXRDb29yZGluYXRlcygpO1xyXG5cclxuICBjb25zdCBwYXJ0cyA9IFtbXSwgW11dO1xyXG4gIGxldCB0b3RhbEludGVyc2VjdGlvbkNvdW50ID0gMDtcclxuICBmb3IgKGxldCBpID0gMCwgaWkgPSBvdXRlckNvb3JkaW5hdGVzLmxlbmd0aCAtIDE7IGkgPCBpaTsgaSsrKSB7XHJcbiAgICBjb25zdCBzZWdtZW50Q29vcmRpbmF0ZXMgPSBbb3V0ZXJDb29yZGluYXRlc1tpXSwgb3V0ZXJDb29yZGluYXRlc1tpICsgMV1dO1xyXG4gICAgY29uc3Qgc2VnbWVudCA9IGxpbmVTdHJpbmcoc2VnbWVudENvb3JkaW5hdGVzKTtcclxuICAgIGNvbnN0IGludGVyc2VjdGlvbnMgPSBsaW5lSW50ZXJzZWN0KHNlZ21lbnQsIHNsaWNlcikuZmVhdHVyZXM7XHJcblxyXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uQ291bnQgPSBpbnRlcnNlY3Rpb25zLmxlbmd0aDtcclxuICAgIHRvdGFsSW50ZXJzZWN0aW9uQ291bnQgKz0gaW50ZXJzZWN0aW9uQ291bnQ7XHJcbiAgICBpZiAoaW50ZXJzZWN0aW9uQ291bnQgPiAxIHx8IHRvdGFsSW50ZXJzZWN0aW9uQ291bnQgPiAyKSB7XHJcbiAgICAgIHRocm93IG5ldyBHZW9tZXRyeVNsaWNlVG9vTWFueUludGVyc2VjdGlvbkVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFydHNbMF0ucHVzaChzZWdtZW50Q29vcmRpbmF0ZXNbMF0pO1xyXG4gICAgaWYgKGludGVyc2VjdGlvbkNvdW50ID09PSAxKSB7XHJcbiAgICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbnNbMF0uZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XHJcbiAgICAgIHBhcnRzWzBdLnB1c2goaW50ZXJzZWN0aW9uKTtcclxuICAgICAgcGFydHNbMV0ucHVzaChpbnRlcnNlY3Rpb24pO1xyXG4gICAgICBwYXJ0cy5yZXZlcnNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAodG90YWxJbnRlcnNlY3Rpb25Db3VudCA8PSAxKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBwYXJ0c1swXS5wdXNoKHBhcnRzWzBdWzBdKTtcclxuICBwYXJ0c1sxXS5wdXNoKHBhcnRzWzFdWzBdKTtcclxuXHJcbiAgcmV0dXJuIFtuZXcgT2xQb2x5Z29uKFtwYXJ0c1swXV0pLCBuZXcgT2xQb2x5Z29uKFtwYXJ0c1sxXV0pXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNwbGljZSBnZW9tZXRyeSBpbnRvIHR3byBwYXJ0c1xyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBnZW9tZXRyeVxyXG4gKiBAcGFyYW0gb2xTbGljZXIgU2xpY2luZyBsaW5lXHJcbiAqIEByZXR1cm5zIE5ldyBPTCBnZW9tZXRyaWVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGluZWFyUmluZ1RvT2xQb2x5Z29uKG9sUG9seWdvbjogT2xQb2x5Z29uLCBvbExpbmVhclJpbmc6IE9sTGluZWFyUmluZyApOiBPbFBvbHlnb24ge1xyXG4gIC8vIFRPRE86IG1ha2Ugc29tZSB2YWxpZGF0aW9uIGFuZCBzdXBwb3J0IHVwZGF0aW5nIGFuIGV4aXN0aW5nIGxpbmVhciByaW5nXHJcbiAgb2xQb2x5Z29uLmFwcGVuZExpbmVhclJpbmcob2xMaW5lYXJSaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vdXNlUG9zaXRpb25Gcm9tT2xHZW9tZXRyeUV2ZW50KFxyXG4gIG9sRXZlbnQ6IE9sR2VvbWV0cnlFdmVudFxyXG4pOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICBjb25zdCBvbEdlb21ldHJ5ID0gb2xFdmVudC50YXJnZXQ7XHJcbiAgaWYgKG9sR2VvbWV0cnkgaW5zdGFuY2VvZiBPbFBvbHlnb24pIHtcclxuICAgIHJldHVybiBvbEdlb21ldHJ5LmZsYXRDb29yZGluYXRlcy5zbGljZSgtNCwgLTIpO1xyXG4gIH1cclxuICByZXR1cm4gb2xHZW9tZXRyeS5mbGF0Q29vcmRpbmF0ZXMuc2xpY2UoLTIpO1xyXG59XHJcbiJdfQ==