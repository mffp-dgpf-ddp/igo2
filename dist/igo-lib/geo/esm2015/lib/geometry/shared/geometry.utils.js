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
 * @return {?} OL style
 */
export function createDrawInteractionStyle() {
    return new olstyle.Style({
        stroke: new olstyle.Stroke({
            color: [0, 153, 255, 1],
            width: 2
        }),
        fill: new olstyle.Fill({
            color: [0, 153, 255, 0.2]
        }),
        image: new olstyle.Circle({
            radius: 5,
            stroke: new olstyle.Stroke({
                color: [0, 153, 255, 1],
            }),
            fill: new olstyle.Fill({
                color: [0, 153, 255, 0.2]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnkudXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZ2VvbWV0cnkvc2hhcmVkL2dlb21ldHJ5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLGFBQWEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCw4QkFBOEIsRUFDOUIsNEJBQTRCLEVBQzVCLHFDQUFxQyxFQUNyQyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQU01QixNQUFNLFVBQVUsMEJBQTBCO0lBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDekIsS0FBSyxFQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQztRQUNGLElBQUksRUFBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDdEIsS0FBSyxFQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQzNCLENBQUM7UUFDRixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDekIsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFD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LENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDakI7S0FDRjtJQUVELElBQUksc0JBQXNCLElBQUksQ0FBQyxFQUFFO1FBQy9CLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFM0IsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFNBQW9CLEVBQUUsWUFBMEI7SUFDdkYsMEVBQTBFO0lBQzFFLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbExpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcclxuaW1wb3J0IE9sTGluZWFyUmluZyBmcm9tICdvbC9nZW9tL0xpbmVhclJpbmcnO1xyXG5pbXBvcnQgT2xQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XHJcbmltcG9ydCBPbEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgbGluZUludGVyc2VjdCBmcm9tICdAdHVyZi9saW5lLWludGVyc2VjdCc7XHJcbmltcG9ydCB7IGxpbmVTdHJpbmcgfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgR2VvbWV0cnlTbGljZU11bHRpUG9seWdvbkVycm9yLFxyXG4gIEdlb21ldHJ5U2xpY2VMaW5lU3RyaW5nRXJyb3IsXHJcbiAgR2VvbWV0cnlTbGljZVRvb01hbnlJbnRlcnNlY3Rpb25FcnJvclxyXG4gfSBmcm9tICcuL2dlb21ldHJ5LmVycm9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZGVmYXVsdCBzdHlsZSBmb3IgZHJhdyBhbmQgbW9kaWZ5IGludGVyYWN0aW9uc1xyXG4gKiBAcmV0dXJucyBPTCBzdHlsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURyYXdJbnRlcmFjdGlvblN0eWxlKCk6IG9sc3R5bGUuU3R5bGUge1xyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgIGNvbG9yOiAgWzAsIDE1MywgMjU1LCAxXSxcclxuICAgICAgd2lkdGg6IDJcclxuICAgIH0pLFxyXG4gICAgZmlsbDogIG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICBjb2xvcjogIFswLCAxNTMsIDI1NSwgMC4yXVxyXG4gICAgfSksXHJcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgY29sb3I6IFswLCAxNTMsIDI1NSwgMV0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICBjb2xvcjogIFswLCAxNTMsIDI1NSwgMC4yXVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGRlZmF1bHQgc3R5bGUgZm9yIGRyYXdpbmcgYSBob2xlXHJcbiAqIEByZXR1cm5zIE9MIHN0eWxlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRHJhd0hvbGVJbnRlcmFjdGlvblN0eWxlKCk6IG9sc3R5bGUuU3R5bGUge1xyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgIGNvbG9yOiAgWzAsIDE1MywgMjU1LCAxXSxcclxuICAgICAgd2lkdGg6IDJcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTbGljZSBnZW9tZXRyeSBpbnRvIHR3byBwYXJ0c1xyXG4gKiBAcGFyYW0gb2xHZW9tZXRyeSBPTCBnZW9tZXRyeVxyXG4gKiBAcGFyYW0gb2xTbGljZXIgU2xpY2luZyBsaW5lXHJcbiAqIEByZXR1cm5zIE5ldyBPTCBnZW9tZXRyaWVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VPbEdlb21ldHJ5KFxyXG4gIG9sR2VvbWV0cnk6IE9sTGluZVN0cmluZyB8IE9sUG9seWdvbixcclxuICBvbFNsaWNlcjogT2xMaW5lU3RyaW5nXHJcbik6IEFycmF5PE9sTGluZVN0cmluZyB8IE9sUG9seWdvbj4ge1xyXG4gIGlmIChvbEdlb21ldHJ5IGluc3RhbmNlb2YgT2xQb2x5Z29uKSB7XHJcbiAgICByZXR1cm4gc2xpY2VPbFBvbHlnb24ob2xHZW9tZXRyeSwgb2xTbGljZXIpO1xyXG4gIH0gZWxzZSBpZiAob2xHZW9tZXRyeSBpbnN0YW5jZW9mIE9sTGluZVN0cmluZykge1xyXG4gICAgcmV0dXJuIHNsaWNlT2xMaW5lU3RyaW5nKG9sR2VvbWV0cnksIG9sU2xpY2VyKTtcclxuICB9XHJcbiAgcmV0dXJuIFtdO1xyXG59XHJcblxyXG4vKipcclxuICogU2xpY2UgT0wgTGluZVN0cmluZyBpbnRvIG9uZSBvciBtb3JlIGxpbmVzXHJcbiAqIEBwYXJhbSBvbExpbmVTdHJpbmcgT0wgbGluZSBzdHJpbmdcclxuICogQHBhcmFtIG9sU2xpY2VyIFNsaWNpbmcgbGluZVxyXG4gKiBAcmV0dXJucyBOZXcgT0wgbGluZSBzdHJpbmdzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VPbExpbmVTdHJpbmcob2xMaW5lU3RyaW5nOiBPbExpbmVTdHJpbmcsIG9sU2xpY2VyOiBPbExpbmVTdHJpbmcpOiBPbExpbmVTdHJpbmdbXSB7XHJcbiAgcmV0dXJuIFtdO1xyXG59XHJcblxyXG4vKipcclxuICogU2xpY2UgT0wgUG9seWdvbiBpbnRvIG9uZSBvciBtb3JlIHBvbHlnb25zXHJcbiAqIEBwYXJhbSBvbFBvbHlnb24gT0wgcG9seWdvblxyXG4gKiBAcGFyYW0gb2xTbGljZXIgU2xpY2luZyBsaW5lXHJcbiAqIEByZXR1cm5zIE5ldyBPTCBwb2x5Z29uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNsaWNlT2xQb2x5Z29uKG9sUG9seWdvbjogT2xQb2x5Z29uLCBvbFNsaWNlcjogT2xMaW5lU3RyaW5nKTogT2xQb2x5Z29uW10ge1xyXG4gIGlmIChvbFBvbHlnb24uZ2V0TGluZWFyUmluZ0NvdW50KCkgPiAxKSB7XHJcbiAgICB0aHJvdyBuZXcgR2VvbWV0cnlTbGljZU11bHRpUG9seWdvbkVycm9yKCk7XHJcbiAgfVxyXG5cclxuICBpZiAob2xTbGljZXIuZ2V0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPiAyKSB7XHJcbiAgICB0aHJvdyBuZXcgR2VvbWV0cnlTbGljZUxpbmVTdHJpbmdFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgb2xHZW9KU09OID0gbmV3IE9sR2VvSlNPTigpO1xyXG4gIGNvbnN0IHNsaWNlciA9IG9sR2VvSlNPTi53cml0ZUdlb21ldHJ5T2JqZWN0KG9sU2xpY2VyKTtcclxuICBjb25zdCBvdXRlckNvb3JkaW5hdGVzID0gb2xQb2x5Z29uLmdldExpbmVhclJpbmcoMCkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuXHJcbiAgY29uc3QgcGFydHMgPSBbW10sIFtdXTtcclxuICBsZXQgdG90YWxJbnRlcnNlY3Rpb25Db3VudCA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDAsIGlpID0gb3V0ZXJDb29yZGluYXRlcy5sZW5ndGggLSAxOyBpIDwgaWk7IGkrKykge1xyXG4gICAgY29uc3Qgc2VnbWVudENvb3JkaW5hdGVzID0gW291dGVyQ29vcmRpbmF0ZXNbaV0sIG91dGVyQ29vcmRpbmF0ZXNbaSArIDFdXTtcclxuICAgIGNvbnN0IHNlZ21lbnQgPSBsaW5lU3RyaW5nKHNlZ21lbnRDb29yZGluYXRlcyk7XHJcbiAgICBjb25zdCBpbnRlcnNlY3Rpb25zID0gbGluZUludGVyc2VjdChzZWdtZW50LCBzbGljZXIpLmZlYXR1cmVzO1xyXG5cclxuICAgIGNvbnN0IGludGVyc2VjdGlvbkNvdW50ID0gaW50ZXJzZWN0aW9ucy5sZW5ndGg7XHJcbiAgICB0b3RhbEludGVyc2VjdGlvbkNvdW50ICs9IGludGVyc2VjdGlvbkNvdW50O1xyXG4gICAgaWYgKGludGVyc2VjdGlvbkNvdW50ID4gMSB8fCB0b3RhbEludGVyc2VjdGlvbkNvdW50ID4gMikge1xyXG4gICAgICB0aHJvdyBuZXcgR2VvbWV0cnlTbGljZVRvb01hbnlJbnRlcnNlY3Rpb25FcnJvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnRzWzBdLnB1c2goc2VnbWVudENvb3JkaW5hdGVzWzBdKTtcclxuICAgIGlmIChpbnRlcnNlY3Rpb25Db3VudCA9PT0gMSkge1xyXG4gICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3Rpb25zWzBdLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xyXG4gICAgICBwYXJ0c1swXS5wdXNoKGludGVyc2VjdGlvbik7XHJcbiAgICAgIHBhcnRzWzFdLnB1c2goaW50ZXJzZWN0aW9uKTtcclxuICAgICAgcGFydHMucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHRvdGFsSW50ZXJzZWN0aW9uQ291bnQgPD0gMSkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgcGFydHNbMF0ucHVzaChwYXJ0c1swXVswXSk7XHJcbiAgcGFydHNbMV0ucHVzaChwYXJ0c1sxXVswXSk7XHJcblxyXG4gIHJldHVybiBbbmV3IE9sUG9seWdvbihbcGFydHNbMF1dKSwgbmV3IE9sUG9seWdvbihbcGFydHNbMV1dKV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTcGxpY2UgZ2VvbWV0cnkgaW50byB0d28gcGFydHNcclxuICogQHBhcmFtIG9sR2VvbWV0cnkgT0wgZ2VvbWV0cnlcclxuICogQHBhcmFtIG9sU2xpY2VyIFNsaWNpbmcgbGluZVxyXG4gKiBAcmV0dXJucyBOZXcgT0wgZ2VvbWV0cmllc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpbmVhclJpbmdUb09sUG9seWdvbihvbFBvbHlnb246IE9sUG9seWdvbiwgb2xMaW5lYXJSaW5nOiBPbExpbmVhclJpbmcgKTogT2xQb2x5Z29uIHtcclxuICAvLyBUT0RPOiBtYWtlIHNvbWUgdmFsaWRhdGlvbiBhbmQgc3VwcG9ydCB1cGRhdGluZyBhbiBleGlzdGluZyBsaW5lYXIgcmluZ1xyXG4gIG9sUG9seWdvbi5hcHBlbmRMaW5lYXJSaW5nKG9sTGluZWFyUmluZyk7XHJcbn1cclxuIl19