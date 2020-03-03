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
    var projection = epsg ? olproj.get(epsg) : olproj.get('EPSG:3857');
    /** @type {?} */
    var projectionExtent = projection.getExtent();
    /** @type {?} */
    var size = extentGetWidth(projectionExtent) / 256;
    /** @type {?} */
    var resolutions = new Array(20);
    /** @type {?} */
    var matrixIds = new Array(20);
    for (var z = 0; z < 20; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    return new olTileGridWMTS({
        origin: extentGetTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS91dGlscy90aWxlZ3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUNMLFVBQVUsSUFBSSxnQkFBZ0IsRUFDOUIsUUFBUSxJQUFJLGNBQWMsRUFDM0IsTUFBTSxjQUFjLENBQUM7Ozs7O0FBRXRCLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUFhOztRQUMzQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzs7UUFDOUQsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRTs7UUFDekMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUc7O1FBQzdDLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7O1FBQzNCLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUMzQixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7SUFFRCxPQUFPLElBQUksY0FBYyxDQUFDO1FBQ3hCLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxQyxXQUFXLGFBQUE7UUFDWCxTQUFTLFdBQUE7S0FDVixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sVGlsZUdyaWRXTVRTIGZyb20gJ29sL3RpbGVncmlkL1dNVFMnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCB7XHJcbiAgZ2V0VG9wTGVmdCBhcyBleHRlbnRHZXRUb3BMZWZ0LFxyXG4gIGdldFdpZHRoIGFzIGV4dGVudEdldFdpZHRoXHJcbn0gZnJvbSAnb2wvZXh0ZW50LmpzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWZhdWx0VGlsZUdyaWQoZXBzZz86IHN0cmluZyk6IG9sVGlsZUdyaWRXTVRTIHtcclxuICBjb25zdCBwcm9qZWN0aW9uID0gZXBzZyA/IG9scHJvai5nZXQoZXBzZykgOiBvbHByb2ouZ2V0KCdFUFNHOjM4NTcnKTtcclxuICBjb25zdCBwcm9qZWN0aW9uRXh0ZW50ID0gcHJvamVjdGlvbi5nZXRFeHRlbnQoKTtcclxuICBjb25zdCBzaXplID0gZXh0ZW50R2V0V2lkdGgocHJvamVjdGlvbkV4dGVudCkgLyAyNTY7XHJcbiAgY29uc3QgcmVzb2x1dGlvbnMgPSBuZXcgQXJyYXkoMjApO1xyXG4gIGNvbnN0IG1hdHJpeElkcyA9IG5ldyBBcnJheSgyMCk7XHJcbiAgZm9yIChsZXQgeiA9IDA7IHogPCAyMDsgKyt6KSB7XHJcbiAgICByZXNvbHV0aW9uc1t6XSA9IHNpemUgLyBNYXRoLnBvdygyLCB6KTtcclxuICAgIG1hdHJpeElkc1t6XSA9IHo7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IG9sVGlsZUdyaWRXTVRTKHtcclxuICAgIG9yaWdpbjogZXh0ZW50R2V0VG9wTGVmdChwcm9qZWN0aW9uRXh0ZW50KSxcclxuICAgIHJlc29sdXRpb25zLFxyXG4gICAgbWF0cml4SWRzXHJcbiAgfSk7XHJcbn1cclxuIl19