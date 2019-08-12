/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olTileGridWMTS from 'ol/tilegrid/WMTS';
import * as olproj from 'ol/proj';
import { getTopLeft as extentGetTopLeft, getWidth as extentGetWidth } from 'ol/extent.js';
/**
 * @param {?=} epsg
 * @return {?}
 */
export function createDefaultTileGrid(epsg) {
    /** @type {?} */
    const projection = epsg ? olproj.get(epsg) : olproj.get('EPSG:3857');
    /** @type {?} */
    const projectionExtent = projection.getExtent();
    /** @type {?} */
    const size = extentGetWidth(projectionExtent) / 256;
    /** @type {?} */
    const resolutions = new Array(20);
    /** @type {?} */
    const matrixIds = new Array(20);
    for (let z = 0; z < 20; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    return new olTileGridWMTS({
        origin: extentGetTopLeft(projectionExtent),
        resolutions,
        matrixIds
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS91dGlscy90aWxlZ3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUNMLFVBQVUsSUFBSSxnQkFBZ0IsRUFDOUIsUUFBUSxJQUFJLGNBQWMsRUFDM0IsTUFBTSxjQUFjLENBQUM7Ozs7O0FBRXRCLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUFhOztVQUMzQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzs7VUFDOUQsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRTs7VUFDekMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUc7O1VBQzdDLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7O1VBQzNCLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUMzQixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7SUFFRCxPQUFPLElBQUksY0FBYyxDQUFDO1FBQ3hCLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxQyxXQUFXO1FBQ1gsU0FBUztLQUNWLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xUaWxlR3JpZFdNVFMgZnJvbSAnb2wvdGlsZWdyaWQvV01UUyc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHtcclxuICBnZXRUb3BMZWZ0IGFzIGV4dGVudEdldFRvcExlZnQsXHJcbiAgZ2V0V2lkdGggYXMgZXh0ZW50R2V0V2lkdGhcclxufSBmcm9tICdvbC9leHRlbnQuanMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRUaWxlR3JpZChlcHNnPzogc3RyaW5nKTogb2xUaWxlR3JpZFdNVFMge1xyXG4gIGNvbnN0IHByb2plY3Rpb24gPSBlcHNnID8gb2xwcm9qLmdldChlcHNnKSA6IG9scHJvai5nZXQoJ0VQU0c6Mzg1NycpO1xyXG4gIGNvbnN0IHByb2plY3Rpb25FeHRlbnQgPSBwcm9qZWN0aW9uLmdldEV4dGVudCgpO1xyXG4gIGNvbnN0IHNpemUgPSBleHRlbnRHZXRXaWR0aChwcm9qZWN0aW9uRXh0ZW50KSAvIDI1NjtcclxuICBjb25zdCByZXNvbHV0aW9ucyA9IG5ldyBBcnJheSgyMCk7XHJcbiAgY29uc3QgbWF0cml4SWRzID0gbmV3IEFycmF5KDIwKTtcclxuICBmb3IgKGxldCB6ID0gMDsgeiA8IDIwOyArK3opIHtcclxuICAgIHJlc29sdXRpb25zW3pdID0gc2l6ZSAvIE1hdGgucG93KDIsIHopO1xyXG4gICAgbWF0cml4SWRzW3pdID0gejtcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgb2xUaWxlR3JpZFdNVFMoe1xyXG4gICAgb3JpZ2luOiBleHRlbnRHZXRUb3BMZWZ0KHByb2plY3Rpb25FeHRlbnQpLFxyXG4gICAgcmVzb2x1dGlvbnMsXHJcbiAgICBtYXRyaXhJZHNcclxuICB9KTtcclxufVxyXG4iXX0=