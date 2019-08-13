/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as olproj from 'ol/proj';
import { MAC } from 'ol/has';
import proj4 from 'proj4';
/**
 * This method extracts a coordinate tuple from a string.
 * @param {?} str Any string
 * @param {?} mapProjection string Map Projection
 * @return {?} object:
 *             lonLat: Coordinate,
 *             message: Message of error,
 *             radius: radius of the confience of coordinate,
 *             conf: confidence of the coordinate}
 */
export function stringToLonLat(str, mapProjection) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    /** @type {?} */
    var lonLat;
    /** @type {?} */
    var coordStr;
    /** @type {?} */
    var negativeLon;
    /** @type {?} */
    var degreesLon;
    /** @type {?} */
    var minutesLon;
    /** @type {?} */
    var secondsLon;
    /** @type {?} */
    var directionLon;
    /** @type {?} */
    var decimalLon;
    /** @type {?} */
    var negativeLat;
    /** @type {?} */
    var degreesLat;
    /** @type {?} */
    var minutesLat;
    /** @type {?} */
    var secondsLat;
    /** @type {?} */
    var directionLat;
    /** @type {?} */
    var decimalLat;
    /** @type {?} */
    var pattern;
    /** @type {?} */
    var timeZone;
    /** @type {?} */
    var radius;
    /** @type {?} */
    var conf;
    /** @type {?} */
    var lon;
    /** @type {?} */
    var lat;
    /** @type {?} */
    var projectionPattern = '(;[\\d]{4,6})';
    /** @type {?} */
    var toProjection = '4326';
    /** @type {?} */
    var projectionStr;
    /** @type {?} */
    var projectionRegex = new RegExp(projectionPattern, 'g');
    /** @type {?} */
    var lonlatCoord = '([-+])?([\\d]{1,3})([,.](\\d+))?';
    /** @type {?} */
    var lonLatPattern = lonlatCoord + "[\\s,.]\\s*" + lonlatCoord;
    /** @type {?} */
    var lonLatRegex = new RegExp("^" + lonLatPattern + "$", 'g');
    /** @type {?} */
    var dmsCoord = '([0-9]{1,2})[:|°]?\\s*([0-9]{1,2})?[:|\'|′|’]?\\s*([0-9]{1,2}(?:\.[0-9]+){0,1})?\\s*["|″|”]?\\s*';
    /** @type {?} */
    var dmsCoordPattern = dmsCoord + "([N|S]),?\\s*" + dmsCoord + "([E|W])";
    /** @type {?} */
    var dmsRegex = new RegExp("^" + dmsCoordPattern, 'gi');
    /** @type {?} */
    var patternUtmMtm = '(UTM|MTM)\-?(\\d{1,2})[\\s,.]*(\\d+[\\s.,]?\\d+)[\\s,.]+(\\d+[\\s.,]?\\d+)';
    /** @type {?} */
    var utmMtmRegex = new RegExp("^" + patternUtmMtm, 'gi');
    /** @type {?} */
    var ddCoord = '([-+])?(\\d{1,3})[,.](\\d+)';
    /** @type {?} */
    var patternDd = ddCoord + "[,.]?\\s*" + ddCoord;
    /** @type {?} */
    var ddRegex = new RegExp("^" + patternDd, 'g');
    /** @type {?} */
    var dmdCoord = '([-+])?(\\d{1,3})[\\s,.]{1}(\\d{1,2})[\\s,.]{1}(\\d{1,2})[.,]?(\\d{1,5})?';
    /** @type {?} */
    var patternDmd = dmdCoord + "[,.]?\\s*" + dmdCoord;
    /** @type {?} */
    var dmdRegex = new RegExp("^" + patternDmd, 'g');
    // tslint:disable:max-line-length
    /** @type {?} */
    var patternBELL = 'LAT\\s*[\\s:]*\\s*([-+])?(\\d{1,2})[\\s.,]?(\\d+)?[\\s.,]?\\s*(\\d{1,2}([.,]\\d+)?)?\\s*(N|S|E|W)?\\s*LONG\\s*[\\s:]*\\s*([-+])?(\\d{1,3})[\\s.,]?(\\d+)?[\\s.,]?\\s*(\\d{1,2}([.,]\\d+)?)?\\s*(N|S|E|W)?\\s*UNC\\s*[\\s:]?\\s*(\\d+)\\s*CONF\\s*[\\s:]?\\s*(\\d{1,3})';
    /** @type {?} */
    var bellRegex = new RegExp("^" + patternBELL + "?", 'gi');
    /** @type {?} */
    var mmCoord = '([-+]?\\d+)[,.]?(\\d+)?';
    /** @type {?} */
    var mmPattern = mmCoord + "[\\s,.]\\s*" + mmCoord;
    /** @type {?} */
    var mmRegex = new RegExp("^" + mmPattern + "$", 'g');
    str = str.toLocaleUpperCase();
    // Extract projection
    if (projectionRegex.test(str)) {
        _a = tslib_1.__read(str.split(';'), 2), coordStr = _a[0], projectionStr = _a[1];
    }
    else {
        coordStr = str;
    }
    if (lonLatRegex.test(coordStr)) {
        _b = tslib_1.__read(coordStr.match(lonLatPattern), 9), negativeLon = _b[1], lon = _b[2], decimalLon = _b[4], negativeLat = _b[5], lat = _b[6], decimalLat = _b[8];
        lon = parseFloat((negativeLon ? negativeLon : '') + lon + '.' + decimalLon);
        lat = parseFloat((negativeLat ? negativeLat : '') + lat + '.' + decimalLat);
    }
    else if (dmsRegex.test(coordStr)) {
        _c = tslib_1.__read(coordStr.match(dmsCoordPattern), 9), degreesLon = _c[1], minutesLon = _c[2], secondsLon = _c[3], directionLon = _c[4], degreesLat = _c[5], minutesLat = _c[6], secondsLat = _c[7], directionLat = _c[8];
        lon = convertDMSToDD(parseFloat(degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat(degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (utmMtmRegex.test(coordStr)) {
        _d = tslib_1.__read(coordStr.match(patternUtmMtm), 5), pattern = _d[1], timeZone = _d[2], lon = _d[3], lat = _d[4];
        /** @type {?} */
        var utm = '+proj=' + pattern + ' +zone=' + timeZone;
        /** @type {?} */
        var wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
        _e = tslib_1.__read(proj4(utm.toLocaleLowerCase(), wgs84, [parseFloat(lon), parseFloat(lat)]), 2), lon = _e[0], lat = _e[1];
    }
    else if (dmdRegex.test(coordStr)) {
        _f = tslib_1.__read(coordStr.match(patternDmd), 11), negativeLon = _f[1], degreesLon = _f[2], minutesLon = _f[3], secondsLon = _f[4], decimalLon = _f[5], negativeLat = _f[6], degreesLat = _f[7], minutesLat = _f[8], secondsLat = _f[9], decimalLat = _f[10];
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (ddRegex.test(coordStr)) {
        _g = tslib_1.__read(coordStr.match(patternDd), 7), negativeLon = _g[1], degreesLon = _g[2], decimalLon = _g[3], negativeLat = _g[4], degreesLat = _g[5], decimalLat = _g[6];
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (bellRegex.test(coordStr)) {
        _h = tslib_1.__read(coordStr.match(patternBELL), 15), negativeLat = _h[1], degreesLat = _h[2], minutesLat = _h[3], secondsLat = _h[4], directionLat = _h[6], negativeLon = _h[7], degreesLon = _h[8], minutesLon = _h[9], secondsLon = _h[10], directionLon = _h[12], radius = _h[13], conf = _h[14];
        // Set default value for North America
        if (!directionLon) {
            directionLon = 'W';
        }
        // Check if real minutes or decimals
        if (minutesLon && minutesLon.length > 2) {
            lon = parseFloat((negativeLon ? negativeLon : '') + degreesLon + '.' + minutesLon);
        }
        else {
            lon = convertDMSToDD(parseFloat(degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        }
        if (minutesLat && minutesLat.length > 2) {
            lat = parseFloat((negativeLat ? negativeLat : '') + degreesLat + '.' + minutesLat);
        }
        else {
            lat = convertDMSToDD(parseFloat(degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
        }
    }
    else if (mmRegex.test(coordStr)) {
        _j = tslib_1.__read(coordStr.match(mmPattern), 5), lon = _j[1], decimalLon = _j[2], lat = _j[3], decimalLat = _j[4];
        if (decimalLon) {
            lon = parseFloat(lon + '.' + decimalLon);
        }
        if (decimalLat) {
            lat = parseFloat(lat + '.' + decimalLat);
        }
    }
    else {
        return { lonLat: undefined, message: '', radius: undefined, conf: undefined };
    }
    // Set a negative coordinate for North America zone
    if (lon > 0 && lat > 0) {
        if (lon > lat) {
            lon = -lon;
        }
        else {
            lat = -lat;
        }
    }
    // Reverse coordinate to respect lonLat convention
    if (lon < lat) {
        lonLat = (/** @type {?} */ ([lon, lat]));
    }
    else {
        lonLat = (/** @type {?} */ ([lat, lon]));
    }
    // Reproject the coordinate if projection parameter have been set and coord is not 4326
    if ((projectionStr !== undefined && projectionStr !== toProjection) || (lonLat[0] > 180 || lonLat[0] < -180)) {
        /** @type {?} */
        var source = projectionStr ? 'EPSG:' + projectionStr : mapProjection;
        /** @type {?} */
        var dest = 'EPSG:' + toProjection;
        try {
            lonLat = olproj.transform(lonLat, source, dest);
        }
        catch (e) {
            return { lonLat: undefined, message: 'Projection ' + source + ' not supported', radius: undefined, conf: undefined };
        }
    }
    return { lonLat: lonLat, message: '', radius: radius ? parseInt(radius, 10) : undefined, conf: conf ? parseInt(conf, 10) : undefined };
}
/**
 * Convert degrees minutes seconds to dd
 * @param {?} degrees Degrees
 * @param {?} minutes Minutes
 * @param {?} seconds Seconds
 * @param {?} direction Direction
 * @return {?}
 */
function convertDMSToDD(degrees, minutes, seconds, direction) {
    minutes = minutes || 0;
    seconds = seconds || 0;
    /** @type {?} */
    var dd = degrees + (minutes / 60) + (seconds / 3600);
    if (direction === 'S' || direction === 'W') {
        dd = -dd;
    } // Don't do anything for N or E
    return dd;
}
/**
 * Return true of two view states are equal.
 * @param {?} state1 View state
 * @param {?} state2 View state
 * @return {?} True if the view states are equal
 */
export function viewStatesAreEqual(state1, state2) {
    if (state1 === undefined || state2 === undefined) {
        return false;
    }
    /** @type {?} */
    var tolerance = 1 / 10000;
    return state1.zoom === state2.zoom &&
        Math.trunc(state1.center[0] / tolerance) === Math.trunc(state2.center[0] / tolerance) &&
        Math.trunc(state1.center[1] / tolerance) === Math.trunc(state2.center[1] / tolerance);
}
/**
 * Format the scale to a human readable text
 * @param {?} scale
 * @return {?} Human readable scale text
 */
export function formatScale(scale) {
    scale = Math.round(scale);
    if (scale < 10000) {
        return scale + '';
    }
    scale = Math.round(scale / 1000);
    if (scale < 1000) {
        return scale + 'K';
    }
    scale = Math.round(scale / 1000);
    return scale + 'M';
}
/**
 * Return the resolution from a scale denom
 * @param {?} scale Scale denom
 * @param {?=} dpi DPI
 * @return {?} Resolution
 */
export function getResolutionFromScale(scale, dpi) {
    if (dpi === void 0) { dpi = 72; }
    return scale / (39.37 * dpi);
}
/**
 * Return the resolution from a scale denom
 * @param {?} resolution
 * @param {?=} unit
 * @param {?=} dpi
 * @return {?} Resolution
 */
export function getScaleFromResolution(resolution, unit, dpi) {
    if (unit === void 0) { unit = 'm'; }
    if (dpi === void 0) { dpi = 72; }
    return resolution * olproj.METERS_PER_UNIT[unit] * 39.37 * dpi;
}
/**
 * Returns true if the CTRL key is pushed during an Ol MapBrowserPointerEvent
 * @param {?} event OL MapBrowserPointerEvent
 * @return {?} Whether the CTRL key is pushed
 */
export function ctrlKeyDown(event) {
    /** @type {?} */
    var originalEvent = event.originalEvent;
    return (!originalEvent.altKey &&
        (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUc3QixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7Ozs7Ozs7Ozs7O0FBWTFCLE1BQU0sVUFBVSxjQUFjLENBQUMsR0FBVyxFQUFFLGFBQXFCOzs7UUFLM0QsTUFBd0I7O1FBQ3hCLFFBQWdCOztRQUNoQixXQUFtQjs7UUFDbkIsVUFBa0I7O1FBQ2xCLFVBQWtCOztRQUNsQixVQUFrQjs7UUFDbEIsWUFBb0I7O1FBQ3BCLFVBQWtCOztRQUNsQixXQUFtQjs7UUFDbkIsVUFBa0I7O1FBQ2xCLFVBQWtCOztRQUNsQixVQUFrQjs7UUFDbEIsWUFBb0I7O1FBQ3BCLFVBQWtCOztRQUNsQixPQUFlOztRQUNmLFFBQWdCOztRQUNoQixNQUFjOztRQUNkLElBQVk7O1FBQ1osR0FBUTs7UUFDUixHQUFROztRQUVOLGlCQUFpQixHQUFHLGVBQWU7O1FBQ25DLFlBQVksR0FBRyxNQUFNOztRQUN2QixhQUFxQjs7UUFDbkIsZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQzs7UUFFcEQsV0FBVyxHQUFJLGtDQUFrQzs7UUFDakQsYUFBYSxHQUFNLFdBQVcsbUJBQWMsV0FBYTs7UUFDekQsV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQUksYUFBYSxNQUFHLEVBQUUsR0FBRyxDQUFDOztRQUVuRCxRQUFRLEdBQUcsa0dBQWtHOztRQUM3RyxlQUFlLEdBQU0sUUFBUSxxQkFBZ0IsUUFBUSxZQUFTOztRQUM5RCxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBSSxlQUFpQixFQUFFLElBQUksQ0FBQzs7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LEdBQUcsQ0FBQztBQUNyQixDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEtBQWEsRUFBRSxHQUFnQjtJQUFoQixvQkFBQSxFQUFBLFFBQWdCO0lBQ3BFLE9BQU8sS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7Ozs7Ozs7O0FBT0QsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQWtCLEVBQUUsSUFBa0IsRUFBRSxHQUFnQjtJQUFwQyxxQkFBQSxFQUFBLFVBQWtCO0lBQUUsb0JBQUEsRUFBQSxRQUFnQjtJQUM3RixPQUFPLFVBQVUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDakUsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUErQjs7UUFDbkQsYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhO0lBQ3pDLE9BQU8sQ0FDTCxDQUFDLGFBQWEsQ0FBQyxNQUFNO1FBQ3JCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ3JELENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FDeEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgTUFDIH0gZnJvbSAnb2wvaGFzJztcclxuXHJcbmltcG9ydCB7IE1hcFZpZXdTdGF0ZSB9IGZyb20gJy4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCc7XHJcblxyXG4vKipcclxuICogVGhpcyBtZXRob2QgZXh0cmFjdHMgYSBjb29yZGluYXRlIHR1cGxlIGZyb20gYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSBzdHIgQW55IHN0cmluZ1xyXG4gKiBAcGFyYW0gbWFwUHJvamVjdGlvbiBzdHJpbmcgTWFwIFByb2plY3Rpb25cclxuICogQHJldHVybnMgb2JqZWN0OlxyXG4gKiAgICAgICAgICAgICBsb25MYXQ6IENvb3JkaW5hdGUsXHJcbiAqICAgICAgICAgICAgIG1lc3NhZ2U6IE1lc3NhZ2Ugb2YgZXJyb3IsXHJcbiAqICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzIG9mIHRoZSBjb25maWVuY2Ugb2YgY29vcmRpbmF0ZSxcclxuICogICAgICAgICAgICAgY29uZjogY29uZmlkZW5jZSBvZiB0aGUgY29vcmRpbmF0ZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0xvbkxhdChzdHI6IHN0cmluZywgbWFwUHJvamVjdGlvbjogc3RyaW5nKToge2xvbkxhdDogW251bWJlciwgbnVtYmVyXSB8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpdXM6IG51bWJlciB8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZjogbnVtYmVyIHwgdW5kZWZpbmVkfSB7XHJcblxyXG4gIGxldCBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl07XHJcbiAgbGV0IGNvb3JkU3RyOiBzdHJpbmc7XHJcbiAgbGV0IG5lZ2F0aXZlTG9uOiBzdHJpbmc7XHJcbiAgbGV0IGRlZ3JlZXNMb246IHN0cmluZztcclxuICBsZXQgbWludXRlc0xvbjogc3RyaW5nO1xyXG4gIGxldCBzZWNvbmRzTG9uOiBzdHJpbmc7XHJcbiAgbGV0IGRpcmVjdGlvbkxvbjogc3RyaW5nO1xyXG4gIGxldCBkZWNpbWFsTG9uOiBzdHJpbmc7XHJcbiAgbGV0IG5lZ2F0aXZlTGF0OiBzdHJpbmc7XHJcbiAgbGV0IGRlZ3JlZXNMYXQ6IHN0cmluZztcclxuICBsZXQgbWludXRlc0xhdDogc3RyaW5nO1xyXG4gIGxldCBzZWNvbmRzTGF0OiBzdHJpbmc7XHJcbiAgbGV0IGRpcmVjdGlvbkxhdDogc3RyaW5nO1xyXG4gIGxldCBkZWNpbWFsTGF0OiBzdHJpbmc7XHJcbiAgbGV0IHBhdHRlcm46IHN0cmluZztcclxuICBsZXQgdGltZVpvbmU6IHN0cmluZztcclxuICBsZXQgcmFkaXVzOiBzdHJpbmc7XHJcbiAgbGV0IGNvbmY6IHN0cmluZztcclxuICBsZXQgbG9uOiBhbnk7XHJcbiAgbGV0IGxhdDogYW55O1xyXG5cclxuICBjb25zdCBwcm9qZWN0aW9uUGF0dGVybiA9ICcoO1tcXFxcZF17NCw2fSknO1xyXG4gIGNvbnN0IHRvUHJvamVjdGlvbiA9ICc0MzI2JztcclxuICBsZXQgcHJvamVjdGlvblN0cjogc3RyaW5nO1xyXG4gIGNvbnN0IHByb2plY3Rpb25SZWdleCA9IG5ldyBSZWdFeHAocHJvamVjdGlvblBhdHRlcm4sICdnJyk7XHJcblxyXG4gIGNvbnN0IGxvbmxhdENvb3JkID0gICcoWy0rXSk/KFtcXFxcZF17MSwzfSkoWywuXShcXFxcZCspKT8nO1xyXG4gIGNvbnN0IGxvbkxhdFBhdHRlcm4gPSBgJHtsb25sYXRDb29yZH1bXFxcXHMsLl1cXFxccyoke2xvbmxhdENvb3JkfWA7XHJcbiAgY29uc3QgbG9uTGF0UmVnZXggPSBuZXcgUmVnRXhwKGBeJHtsb25MYXRQYXR0ZXJufSRgLCAnZycpO1xyXG5cclxuICBjb25zdCBkbXNDb29yZCA9ICcoWzAtOV17MSwyfSlbOnzCsF0/XFxcXHMqKFswLTldezEsMn0pP1s6fFxcJ3zigLJ84oCZXT9cXFxccyooWzAtOV17MSwyfSg/OlxcLlswLTldKyl7MCwxfSk/XFxcXHMqW1wifOKAs3zigJ1dP1xcXFxzKic7XHJcbiAgY29uc3QgZG1zQ29vcmRQYXR0ZXJuID0gYCR7ZG1zQ29vcmR9KFtOfFNdKSw/XFxcXHMqJHtkbXNDb29yZH0oW0V8V10pYDtcclxuICBjb25zdCBkbXNSZWdleCA9IG5ldyBSZWdFeHAoYF4ke2Rtc0Nvb3JkUGF0dGVybn1gLCAnZ2knKTtcclxuXHJcbiAgY29uc3QgcGF0dGVyblV0bU10bSA9ICcoVVRNfE1UTSlcXC0/KFxcXFxkezEsMn0pW1xcXFxzLC5dKihcXFxcZCtbXFxcXHMuLF0/XFxcXGQrKVtcXFxccywuXSsoXFxcXGQrW1xcXFxzLixdP1xcXFxkKyknO1xyXG4gIGNvbnN0IHV0bU10bVJlZ2V4ID0gIG5ldyBSZWdFeHAoYF4ke3BhdHRlcm5VdG1NdG19YCwgJ2dpJyk7XHJcblxyXG4gIGNvbnN0IGRkQ29vcmQgPSAnKFstK10pPyhcXFxcZHsxLDN9KVssLl0oXFxcXGQrKSc7XHJcbiAgY29uc3QgcGF0dGVybkRkID0gYCR7ZGRDb29yZH1bLC5dP1xcXFxzKiR7ZGRDb29yZH1gO1xyXG4gIGNvbnN0IGRkUmVnZXggPSAgbmV3IFJlZ0V4cChgXiR7cGF0dGVybkRkfWAsICdnJyk7XHJcblxyXG4gIGNvbnN0IGRtZENvb3JkID0gJyhbLStdKT8oXFxcXGR7MSwzfSlbXFxcXHMsLl17MX0oXFxcXGR7MSwyfSlbXFxcXHMsLl17MX0oXFxcXGR7MSwyfSlbLixdPyhcXFxcZHsxLDV9KT8nO1xyXG4gIGNvbnN0IHBhdHRlcm5EbWQgPSBgJHtkbWRDb29yZH1bLC5dP1xcXFxzKiR7ZG1kQ29vcmR9YDtcclxuICBjb25zdCBkbWRSZWdleCA9ICBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuRG1kfWAsICdnJyk7XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxyXG4gIGNvbnN0IHBhdHRlcm5CRUxMID0gJ0xBVFxcXFxzKltcXFxcczpdKlxcXFxzKihbLStdKT8oXFxcXGR7MSwyfSlbXFxcXHMuLF0/KFxcXFxkKyk/W1xcXFxzLixdP1xcXFxzKihcXFxcZHsxLDJ9KFsuLF1cXFxcZCspPyk/XFxcXHMqKE58U3xFfFcpP1xcXFxzKkxPTkdcXFxccypbXFxcXHM6XSpcXFxccyooWy0rXSk/KFxcXFxkezEsM30pW1xcXFxzLixdPyhcXFxcZCspP1tcXFxccy4sXT9cXFxccyooXFxcXGR7MSwyfShbLixdXFxcXGQrKT8pP1xcXFxzKihOfFN8RXxXKT9cXFxccypVTkNcXFxccypbXFxcXHM6XT9cXFxccyooXFxcXGQrKVxcXFxzKkNPTkZcXFxccypbXFxcXHM6XT9cXFxccyooXFxcXGR7MSwzfSknO1xyXG4gIGNvbnN0IGJlbGxSZWdleCA9ICBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuQkVMTH0/YCwgJ2dpJyk7XHJcblxyXG4gIGNvbnN0IG1tQ29vcmQgPSAnKFstK10/XFxcXGQrKVssLl0/KFxcXFxkKyk/JztcclxuICBjb25zdCBtbVBhdHRlcm4gPSBgJHttbUNvb3JkfVtcXFxccywuXVxcXFxzKiR7bW1Db29yZH1gO1xyXG4gIGNvbnN0IG1tUmVnZXggPSAgbmV3IFJlZ0V4cChgXiR7bW1QYXR0ZXJufSRgLCAnZycpO1xyXG5cclxuICBzdHIgPSBzdHIudG9Mb2NhbGVVcHBlckNhc2UoKTtcclxuXHJcbiAgLy8gRXh0cmFjdCBwcm9qZWN0aW9uXHJcbiAgaWYgKHByb2plY3Rpb25SZWdleC50ZXN0KHN0cikpIHtcclxuICAgIFtjb29yZFN0ciwgcHJvamVjdGlvblN0cl0gPSBzdHIuc3BsaXQoJzsnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29vcmRTdHIgPSBzdHI7XHJcbiAgfVxyXG5cclxuICBpZiAobG9uTGF0UmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuXHJcbiAgICBbLFxyXG4gICAgIG5lZ2F0aXZlTG9uLFxyXG4gICAgIGxvbixcclxuICAgICAsXHJcbiAgICAgZGVjaW1hbExvbixcclxuICAgICBuZWdhdGl2ZUxhdCxcclxuICAgICBsYXQsXHJcbiAgICAgLFxyXG4gICAgIGRlY2ltYWxMYXRdID0gY29vcmRTdHIubWF0Y2gobG9uTGF0UGF0dGVybik7XHJcblxyXG4gICAgbG9uID0gcGFyc2VGbG9hdCgobmVnYXRpdmVMb24gPyBuZWdhdGl2ZUxvbiA6ICcnKSArIGxvbiArICcuJyArIGRlY2ltYWxMb24pO1xyXG4gICAgbGF0ID0gcGFyc2VGbG9hdCgobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGxhdCArICcuJyArIGRlY2ltYWxMYXQpO1xyXG5cclxuICB9IGVsc2UgaWYgKGRtc1JlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcbiAgICAgIFssXHJcbiAgICAgICBkZWdyZWVzTG9uLFxyXG4gICAgICAgbWludXRlc0xvbixcclxuICAgICAgIHNlY29uZHNMb24sXHJcbiAgICAgICBkaXJlY3Rpb25Mb24sXHJcbiAgICAgICBkZWdyZWVzTGF0LFxyXG4gICAgICAgbWludXRlc0xhdCxcclxuICAgICAgIHNlY29uZHNMYXQsXHJcbiAgICAgICBkaXJlY3Rpb25MYXRdID0gY29vcmRTdHIubWF0Y2goZG1zQ29vcmRQYXR0ZXJuKTtcclxuXHJcbiAgICAgIGxvbiA9IGNvbnZlcnRETVNUb0REKHBhcnNlRmxvYXQoZGVncmVlc0xvbiksIHBhcnNlRmxvYXQobWludXRlc0xvbiksIHBhcnNlRmxvYXQoc2Vjb25kc0xvbiksIGRpcmVjdGlvbkxvbik7XHJcbiAgICAgIGxhdCA9IGNvbnZlcnRETVNUb0REKHBhcnNlRmxvYXQoZGVncmVlc0xhdCksIHBhcnNlRmxvYXQobWludXRlc0xhdCksIHBhcnNlRmxvYXQoc2Vjb25kc0xhdCksIGRpcmVjdGlvbkxhdCk7XHJcblxyXG4gIH0gZWxzZSBpZiAodXRtTXRtUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgICAgWywgcGF0dGVybiwgdGltZVpvbmUsIGxvbiwgbGF0XSA9IGNvb3JkU3RyLm1hdGNoKHBhdHRlcm5VdG1NdG0pO1xyXG4gICAgICBjb25zdCB1dG0gPSAnK3Byb2o9JyArIHBhdHRlcm4gKyAnICt6b25lPScgKyB0aW1lWm9uZTtcclxuICAgICAgY29uc3Qgd2dzODQgPSAnK3Byb2o9bG9uZ2xhdCArZWxscHM9V0dTODQgK2RhdHVtPVdHUzg0ICtub19kZWZzJztcclxuICAgICAgW2xvbiwgbGF0XSA9IHByb2o0KHV0bS50b0xvY2FsZUxvd2VyQ2FzZSgpLCB3Z3M4NCwgW3BhcnNlRmxvYXQobG9uKSwgcGFyc2VGbG9hdChsYXQpXSk7XHJcblxyXG4gIH0gZWxzZSBpZiAoZG1kUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIFssXHJcbiAgICAgIG5lZ2F0aXZlTG9uLFxyXG4gICAgICBkZWdyZWVzTG9uLFxyXG4gICAgICBtaW51dGVzTG9uLFxyXG4gICAgICBzZWNvbmRzTG9uLFxyXG4gICAgICBkZWNpbWFsTG9uLFxyXG4gICAgICBuZWdhdGl2ZUxhdCxcclxuICAgICAgZGVncmVlc0xhdCxcclxuICAgICAgbWludXRlc0xhdCxcclxuICAgICAgc2Vjb25kc0xhdCxcclxuICAgICAgZGVjaW1hbExhdF0gPSBjb29yZFN0ci5tYXRjaChwYXR0ZXJuRG1kKTtcclxuXHJcbiAgICBsb24gPSBjb252ZXJ0RE1TVG9ERChwYXJzZUZsb2F0KChuZWdhdGl2ZUxvbiA/IG5lZ2F0aXZlTG9uIDogJycpICsgZGVncmVlc0xvbiksIHBhcnNlRmxvYXQobWludXRlc0xvbiksIHBhcnNlRmxvYXQoc2Vjb25kc0xvbiksIGRpcmVjdGlvbkxvbik7XHJcbiAgICBsYXQgPSBjb252ZXJ0RE1TVG9ERChwYXJzZUZsb2F0KChuZWdhdGl2ZUxhdCA/IG5lZ2F0aXZlTGF0IDogJycpICsgZGVncmVlc0xhdCksIHBhcnNlRmxvYXQobWludXRlc0xhdCksIHBhcnNlRmxvYXQoc2Vjb25kc0xhdCksIGRpcmVjdGlvbkxhdCk7XHJcblxyXG4gIH0gZWxzZSBpZiAoZGRSZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgICBbLFxyXG4gICAgICAgIG5lZ2F0aXZlTG9uLFxyXG4gICAgICAgIGRlZ3JlZXNMb24sXHJcbiAgICAgICAgZGVjaW1hbExvbixcclxuICAgICAgICBuZWdhdGl2ZUxhdCxcclxuICAgICAgICBkZWdyZWVzTGF0LFxyXG4gICAgICAgIGRlY2ltYWxMYXRdID0gY29vcmRTdHIubWF0Y2gocGF0dGVybkRkKTtcclxuXHJcbiAgICAgIGxvbiA9IGNvbnZlcnRETVNUb0REKHBhcnNlRmxvYXQoKG5lZ2F0aXZlTG9uID8gbmVnYXRpdmVMb24gOiAnJykgKyBkZWdyZWVzTG9uKSwgcGFyc2VGbG9hdChtaW51dGVzTG9uKSwgcGFyc2VGbG9hdChzZWNvbmRzTG9uKSwgZGlyZWN0aW9uTG9uKTtcclxuICAgICAgbGF0ID0gY29udmVydERNU1RvREQocGFyc2VGbG9hdCgobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGRlZ3JlZXNMYXQpLCBwYXJzZUZsb2F0KG1pbnV0ZXNMYXQpLCBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLCBkaXJlY3Rpb25MYXQpO1xyXG5cclxuICB9IGVsc2UgaWYgKGJlbGxSZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgWyxcclxuICAgICAgbmVnYXRpdmVMYXQsXHJcbiAgICAgIGRlZ3JlZXNMYXQsXHJcbiAgICAgIG1pbnV0ZXNMYXQsXHJcbiAgICAgIHNlY29uZHNMYXQsXHJcbiAgICAgICxcclxuICAgICAgZGlyZWN0aW9uTGF0LFxyXG4gICAgICBuZWdhdGl2ZUxvbixcclxuICAgICAgZGVncmVlc0xvbixcclxuICAgICAgbWludXRlc0xvbixcclxuICAgICAgc2Vjb25kc0xvbixcclxuICAgICAgLFxyXG4gICAgICBkaXJlY3Rpb25Mb24sXHJcbiAgICAgIHJhZGl1cyxcclxuICAgICAgY29uZl0gPSBjb29yZFN0ci5tYXRjaChwYXR0ZXJuQkVMTCk7XHJcblxyXG4gICAgLy8gU2V0IGRlZmF1bHQgdmFsdWUgZm9yIE5vcnRoIEFtZXJpY2FcclxuICAgIGlmICghZGlyZWN0aW9uTG9uKSB7XHJcbiAgICAgIGRpcmVjdGlvbkxvbiA9ICdXJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiByZWFsIG1pbnV0ZXMgb3IgZGVjaW1hbHNcclxuICAgIGlmIChtaW51dGVzTG9uICYmIG1pbnV0ZXNMb24ubGVuZ3RoID4gMikge1xyXG4gICAgICBsb24gPSBwYXJzZUZsb2F0KChuZWdhdGl2ZUxvbiA/IG5lZ2F0aXZlTG9uIDogJycpICsgZGVncmVlc0xvbiArICcuJyArIG1pbnV0ZXNMb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9uID0gY29udmVydERNU1RvREQocGFyc2VGbG9hdChkZWdyZWVzTG9uKSwgcGFyc2VGbG9hdChtaW51dGVzTG9uKSwgcGFyc2VGbG9hdChzZWNvbmRzTG9uKSwgZGlyZWN0aW9uTG9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWludXRlc0xhdCAmJiBtaW51dGVzTGF0Lmxlbmd0aCA+IDIpIHtcclxuICAgICAgbGF0ID0gcGFyc2VGbG9hdCgobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGRlZ3JlZXNMYXQgKyAnLicgKyBtaW51dGVzTGF0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhdCA9IGNvbnZlcnRETVNUb0REKHBhcnNlRmxvYXQoZGVncmVlc0xhdCksIHBhcnNlRmxvYXQobWludXRlc0xhdCksIHBhcnNlRmxvYXQoc2Vjb25kc0xhdCksIGRpcmVjdGlvbkxhdCk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSBpZiAobW1SZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgICBbLCBsb24sIGRlY2ltYWxMb24sIGxhdCwgZGVjaW1hbExhdF0gPSBjb29yZFN0ci5tYXRjaChtbVBhdHRlcm4pO1xyXG5cclxuICAgICAgaWYgKGRlY2ltYWxMb24pIHtcclxuICAgICAgICBsb24gPSBwYXJzZUZsb2F0KGxvbiArICcuJyArIGRlY2ltYWxMb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGVjaW1hbExhdCkge1xyXG4gICAgICAgIGxhdCA9IHBhcnNlRmxvYXQobGF0ICsgJy4nICsgZGVjaW1hbExhdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB7bG9uTGF0OiB1bmRlZmluZWQsIG1lc3NhZ2U6ICcnLCByYWRpdXM6IHVuZGVmaW5lZCwgY29uZjogdW5kZWZpbmVkfTtcclxuICB9XHJcblxyXG4gIC8vIFNldCBhIG5lZ2F0aXZlIGNvb3JkaW5hdGUgZm9yIE5vcnRoIEFtZXJpY2Egem9uZVxyXG4gIGlmIChsb24gPiAwICYmIGxhdCA+IDApIHtcclxuICAgIGlmIChsb24gPiBsYXQpIHtcclxuICAgICAgbG9uID0gLWxvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhdCA9IC1sYXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXZlcnNlIGNvb3JkaW5hdGUgdG8gcmVzcGVjdCBsb25MYXQgY29udmVudGlvblxyXG4gIGlmIChsb24gPCBsYXQpIHtcclxuICAgIGxvbkxhdCA9IFtsb24sIGxhdF0gYXMgW251bWJlciwgbnVtYmVyXTtcclxuICB9IGVsc2Uge1xyXG4gICAgbG9uTGF0ID0gW2xhdCwgbG9uXSBhcyBbbnVtYmVyLCBudW1iZXJdO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVwcm9qZWN0IHRoZSBjb29yZGluYXRlIGlmIHByb2plY3Rpb24gcGFyYW1ldGVyIGhhdmUgYmVlbiBzZXQgYW5kIGNvb3JkIGlzIG5vdCA0MzI2XHJcbiAgaWYgKChwcm9qZWN0aW9uU3RyICE9PSB1bmRlZmluZWQgJiYgcHJvamVjdGlvblN0ciAhPT0gdG9Qcm9qZWN0aW9uKSB8fCAobG9uTGF0WzBdID4gMTgwIHx8IGxvbkxhdFswXSA8IC0xODApKSB7XHJcblxyXG4gICAgY29uc3Qgc291cmNlID0gcHJvamVjdGlvblN0ciA/ICdFUFNHOicgKyBwcm9qZWN0aW9uU3RyIDogbWFwUHJvamVjdGlvbjtcclxuICAgIGNvbnN0IGRlc3QgPSAnRVBTRzonICsgdG9Qcm9qZWN0aW9uO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxvbkxhdCA9IG9scHJvai50cmFuc2Zvcm0obG9uTGF0LCBzb3VyY2UsIGRlc3QpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4ge2xvbkxhdDogdW5kZWZpbmVkLCBtZXNzYWdlOiAnUHJvamVjdGlvbiAnICsgc291cmNlICsgJyBub3Qgc3VwcG9ydGVkJywgcmFkaXVzOiB1bmRlZmluZWQsIGNvbmY6IHVuZGVmaW5lZH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2xvbkxhdCwgbWVzc2FnZTogJycsIHJhZGl1czogcmFkaXVzID8gcGFyc2VJbnQocmFkaXVzLCAxMCkgOiB1bmRlZmluZWQsIGNvbmY6IGNvbmYgPyBwYXJzZUludChjb25mLCAxMCkgOiB1bmRlZmluZWR9O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBkZWdyZWVzIG1pbnV0ZXMgc2Vjb25kcyB0byBkZFxyXG4gKiBAcGFyYW0gZGVncmVlcyBEZWdyZWVzXHJcbiAqIEBwYXJhbSBtaW51dGVzIE1pbnV0ZXNcclxuICogQHBhcmFtIHNlY29uZHMgU2Vjb25kc1xyXG4gKiBAcGFyYW0gZGlyZWN0aW9uIERpcmVjdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gY29udmVydERNU1RvREQoZGVncmVlczogbnVtYmVyLCBtaW51dGVzOiBudW1iZXIsIHNlY29uZHM6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpIHtcclxuICBtaW51dGVzID0gbWludXRlcyB8fCAwO1xyXG4gIHNlY29uZHMgPSBzZWNvbmRzIHx8IDA7XHJcbiAgbGV0IGRkID0gZGVncmVlcyArIChtaW51dGVzIC8gNjApICsgKHNlY29uZHMgLyAzNjAwKTtcclxuXHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gJ1MnIHx8IGRpcmVjdGlvbiA9PT0gJ1cnKSB7XHJcbiAgICAgIGRkID0gLWRkO1xyXG4gIH0gLy8gRG9uJ3QgZG8gYW55dGhpbmcgZm9yIE4gb3IgRVxyXG4gIHJldHVybiBkZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIG9mIHR3byB2aWV3IHN0YXRlcyBhcmUgZXF1YWwuXHJcbiAqIEBwYXJhbSBzdGF0ZTEgVmlldyBzdGF0ZVxyXG4gKiBAcGFyYW0gc3RhdGUyIFZpZXcgc3RhdGVcclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmlldyBzdGF0ZXMgYXJlIGVxdWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdmlld1N0YXRlc0FyZUVxdWFsKHN0YXRlMTogTWFwVmlld1N0YXRlLCBzdGF0ZTI6IE1hcFZpZXdTdGF0ZSk6IGJvb2xlYW4ge1xyXG4gIGlmIChzdGF0ZTEgPT09IHVuZGVmaW5lZCB8fCBzdGF0ZTIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9sZXJhbmNlID0gMSAvIDEwMDAwO1xyXG4gIHJldHVybiBzdGF0ZTEuem9vbSA9PT0gc3RhdGUyLnpvb20gJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgPT09IE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclsxXSAvIHRvbGVyYW5jZSkgPT09IE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclsxXSAvIHRvbGVyYW5jZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3JtYXQgdGhlIHNjYWxlIHRvIGEgaHVtYW4gcmVhZGFibGUgdGV4dFxyXG4gKiBAcGFyYW0gU2NhbGUgb2YgdGhlIG1hcFxyXG4gKiBAcmV0dXJucyBIdW1hbiByZWFkYWJsZSBzY2FsZSB0ZXh0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0U2NhbGUoc2NhbGUpIHtcclxuICBzY2FsZSA9IE1hdGgucm91bmQoc2NhbGUpO1xyXG4gIGlmIChzY2FsZSA8IDEwMDAwKSB7IHJldHVybiBzY2FsZSArICcnOyB9XHJcblxyXG4gIHNjYWxlID0gTWF0aC5yb3VuZChzY2FsZSAvIDEwMDApO1xyXG4gIGlmIChzY2FsZSA8IDEwMDApIHsgcmV0dXJuIHNjYWxlICsgJ0snOyB9XHJcblxyXG4gIHNjYWxlID0gTWF0aC5yb3VuZChzY2FsZSAvIDEwMDApO1xyXG4gIHJldHVybiBzY2FsZSArICdNJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcmVzb2x1dGlvbiBmcm9tIGEgc2NhbGUgZGVub21cclxuICogQHBhcmFtIHNjYWxlIFNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBkcGkgRFBJXHJcbiAqIEByZXR1cm5zIFJlc29sdXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvbHV0aW9uRnJvbVNjYWxlKHNjYWxlOiBudW1iZXIsIGRwaTogbnVtYmVyID0gNzIpOiBudW1iZXIge1xyXG4gIHJldHVybiBzY2FsZSAvICgzOS4zNyAqIGRwaSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHJlc29sdXRpb24gZnJvbSBhIHNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBTY2FsZSBkZW5vbVxyXG4gKiBAcmV0dXJucyBSZXNvbHV0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihyZXNvbHV0aW9uOiBudW1iZXIsIHVuaXQ6IHN0cmluZyA9ICdtJywgZHBpOiBudW1iZXIgPSA3Mik6IG51bWJlciB7XHJcbiAgcmV0dXJuIHJlc29sdXRpb24gKiBvbHByb2ouTUVURVJTX1BFUl9VTklUW3VuaXRdICogMzkuMzcgKiBkcGk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIENUUkwga2V5IGlzIHB1c2hlZCBkdXJpbmcgYW4gT2wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcGFyYW0gZXZlbnQgT0wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDVFJMIGtleSBpcyBwdXNoZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjdHJsS2V5RG93bihldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KTogYm9vbGVhbiB7XHJcbiAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XHJcbiAgcmV0dXJuIChcclxuICAgICFvcmlnaW5hbEV2ZW50LmFsdEtleSAmJlxyXG4gICAgKE1BQyA/IG9yaWdpbmFsRXZlbnQubWV0YUtleSA6IG9yaWdpbmFsRXZlbnQuY3RybEtleSkgJiZcclxuICAgICFvcmlnaW5hbEV2ZW50LnNoaWZ0S2V5XHJcbiAgKTtcclxufVxyXG4iXX0=