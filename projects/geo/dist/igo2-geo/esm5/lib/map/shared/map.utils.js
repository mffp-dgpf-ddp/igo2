/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as olproj from 'ol/proj';
import { MAC } from 'ol/has';
/**
 * This method extracts a coordinate tuple from a string.
 * @param {?} str Any string
 * @param {?} mapProjection string Map Projection
 * @param {?=} opts
 * @return {?} object:
 *             lonLat: Coordinate,
 *             message: Message of error,
 *             radius: radius of the confience of coordinate,
 *             conf: confidence of the coordinate}
 */
export function stringToLonLat(str, mapProjection, opts) {
    if (opts === void 0) { opts = {}; }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
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
    var zone;
    /** @type {?} */
    var radius;
    /** @type {?} */
    var conf;
    /** @type {?} */
    var lon;
    /** @type {?} */
    var lat;
    /** @type {?} */
    var projectionPattern = '(\\s*;\\s*[\\d]{4,6})';
    /** @type {?} */
    var toProjection = '4326';
    /** @type {?} */
    var projectionStr;
    /** @type {?} */
    var projectionRegex = new RegExp(projectionPattern, 'g');
    /** @type {?} */
    var lonlatCoord = '([-+])?([\\d]{1,3})([,.](\\d+))?';
    /** @type {?} */
    var lonLatPattern = lonlatCoord + "[\\s,]+" + lonlatCoord;
    /** @type {?} */
    var lonLatRegex = new RegExp("^" + lonLatPattern + "$", 'g');
    /** @type {?} */
    var dmsCoord = '([0-9]{1,2})[:|°]?\\s*([0-9]{1,2})?[:|\'|′|’]?\\s*([0-9]{1,2}(?:.[0-9]+){0,1})?\\s*["|″|”]?\\s*';
    /** @type {?} */
    var dmsCoordPattern = dmsCoord + "([N|S|E|W|O]),?\\s*" + dmsCoord + "([N|S|E|W|O])";
    /** @type {?} */
    var dmsRegex = new RegExp("^" + dmsCoordPattern, 'gi');
    /** @type {?} */
    var patternUtm = '(UTM)-?(\\d{1,2})[\\s,]*(\\d+[.,]?\\d+)[\\s,]+(\\d+[.,]?\\d+)';
    /** @type {?} */
    var utmRegex = new RegExp("^" + patternUtm, 'gi');
    /** @type {?} */
    var patternMtm = '(MTM)-?(\\d{1,2})[\\s,]*(\\d+[.,]?\\d+)[\\s,]+(\\d+[.,]?\\d+)';
    /** @type {?} */
    var mtmRegex = new RegExp("^" + patternMtm, 'gi');
    /** @type {?} */
    var ddCoord = '([-+])?(\\d{1,3})[,.](\\d+)';
    /** @type {?} */
    var patternDd = ddCoord + "\\s*[,]?\\s*" + ddCoord;
    /** @type {?} */
    var ddRegex = new RegExp("^" + patternDd, 'g');
    /** @type {?} */
    var dmdCoord = '([-+])?(\\d{1,3})[\\s,.]{1}(\\d{1,2})[\\s,.]{1}(\\d{1,2})[.,]?(\\d{1,5})?';
    /** @type {?} */
    var patternDmd = dmdCoord + "\\s*[,.]?\\s*" + dmdCoord;
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
    var mmPattern = mmCoord + "[\\s,]+" + mmCoord;
    /** @type {?} */
    var mmRegex = new RegExp("^" + mmPattern + "$", 'g');
    /** @type {?} */
    var isXYCoords = false;
    str = str.toLocaleUpperCase().trim();
    // Extract projection
    if (projectionRegex.test(str)) {
        _a = tslib_1.__read(str.split(';').map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.trim(); })), 2), coordStr = _a[0], projectionStr = _a[1];
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
        if (directionLon === 'S' || directionLon === 'N') {
            degreesLon = [degreesLat, (degreesLat = degreesLon)][0];
            minutesLon = [minutesLat, (minutesLat = minutesLon)][0];
            secondsLon = [secondsLat, (secondsLat = secondsLon)][0];
            directionLon = [directionLat, (directionLat = directionLon)][0];
        }
        lon = convertDMSToDD(parseFloat(degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat(degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (utmRegex.test(coordStr)) {
        isXYCoords = true;
        _d = tslib_1.__read(coordStr.match(patternUtm), 5), zone = _d[2], lon = _d[3], lat = _d[4];
        /** @type {?} */
        var epsgUtm = Number(zone) < 10 ? "EPSG:3260" + zone : "EPSG:326" + zone;
        _e = tslib_1.__read(olproj.transform([parseFloat(lon), parseFloat(lat)], epsgUtm, 'EPSG:4326'), 2), lon = _e[0], lat = _e[1];
    }
    else if (mtmRegex.test(coordStr)) {
        isXYCoords = true;
        _f = tslib_1.__read(coordStr.match(patternMtm), 5), zone = _f[2], lon = _f[3], lat = _f[4];
        /** @type {?} */
        var epsgMtm = Number(zone) < 10 ? "EPSG:3218" + zone : "EPSG:321" + (80 + Number(zone));
        _g = tslib_1.__read(olproj.transform([parseFloat(lon), parseFloat(lat)], epsgMtm, 'EPSG:4326'), 2), lon = _g[0], lat = _g[1];
    }
    else if (dmdRegex.test(coordStr)) {
        _h = tslib_1.__read(coordStr.match(patternDmd), 11), negativeLon = _h[1], degreesLon = _h[2], minutesLon = _h[3], secondsLon = _h[4], decimalLon = _h[5], negativeLat = _h[6], degreesLat = _h[7], minutesLat = _h[8], secondsLat = _h[9], decimalLat = _h[10];
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (ddRegex.test(coordStr)) {
        _j = tslib_1.__read(coordStr.match(patternDd), 7), negativeLon = _j[1], degreesLon = _j[2], decimalLon = _j[3], negativeLat = _j[4], degreesLat = _j[5], decimalLat = _j[6];
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (bellRegex.test(coordStr)) {
        _k = tslib_1.__read(coordStr.match(patternBELL), 15), negativeLat = _k[1], degreesLat = _k[2], minutesLat = _k[3], secondsLat = _k[4], directionLat = _k[6], negativeLon = _k[7], degreesLon = _k[8], minutesLon = _k[9], secondsLon = _k[10], directionLon = _k[12], radius = _k[13], conf = _k[14];
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
        isXYCoords = true;
        _l = tslib_1.__read(coordStr.match(mmPattern), 5), lon = _l[1], decimalLon = _l[2], lat = _l[3], decimalLat = _l[4];
        if (decimalLon) {
            lon = parseFloat(lon + '.' + decimalLon);
        }
        if (decimalLat) {
            lat = parseFloat(lat + '.' + decimalLat);
        }
    }
    else {
        return {
            lonLat: undefined,
            message: '',
            radius: undefined,
            conf: undefined
        };
    }
    if (opts.forceNA && !isXYCoords) {
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
        if (lon > lat) {
            lon = [lat, (lat = lon)][0];
        }
    }
    lonLat = (/** @type {?} */ ([Number(lon), Number(lat)]));
    // Reproject the coordinate if projection parameter have been set and coord is not 4326
    if ((projectionStr !== undefined && projectionStr !== toProjection) ||
        (lonLat[0] > 180 || lonLat[0] < -180) ||
        (lonLat[1] > 90 || lonLat[1] < -90)) {
        /** @type {?} */
        var source = projectionStr ? 'EPSG:' + projectionStr : mapProjection;
        /** @type {?} */
        var dest = 'EPSG:' + toProjection;
        try {
            lonLat = olproj.transform(lonLat, source, dest);
        }
        catch (e) {
            return {
                lonLat: undefined,
                message: 'Projection ' + source + ' not supported',
                radius: undefined,
                conf: undefined
            };
        }
    }
    return {
        lonLat: lonLat,
        message: '',
        radius: radius ? parseInt(radius, 10) : undefined,
        conf: conf ? parseInt(conf, 10) : undefined
    };
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
    var dd = degrees + minutes / 60 + seconds / 3600;
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
    return (state1.zoom === state2.zoom &&
        Math.trunc(state1.center[0] / tolerance) ===
            Math.trunc(state2.center[0] / tolerance) &&
        Math.trunc(state1.center[1] / tolerance) ===
            Math.trunc(state2.center[1] / tolerance));
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
    if (dpi === void 0) { dpi = 96; }
    /** @type {?} */
    var inchesPerMeter = 39.3701;
    return scale / (inchesPerMeter * dpi);
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
    if (dpi === void 0) { dpi = 96; }
    /** @type {?} */
    var inchesPerMeter = 39.3701;
    return resolution * olproj.METERS_PER_UNIT[unit] * inchesPerMeter * dpi;
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
/**
 * @param {?} coord
 * @param {?=} decimal
 * @return {?}
 */
export function roundCoordTo(coord, decimal) {
    if (decimal === void 0) { decimal = 3; }
    return [coord[0].toFixed(decimal), coord[1].toFixed(decimal)];
}
/**
 * Returns an array of converted coordinates.
 * Conversion is done for every configured projections
 * and for the current UTM zone and MTM zone.
 * @param {?} lonLat [number, number] array of the coordinate to transform.
 * @param {?} projections  Projection[] Array of destination projection.
 * @return {?} Returns an array of converted coordinates.
 */
export function lonLatConversion(lonLat, projections) {
    /** @type {?} */
    var rawCoord3857 = olproj.transform(lonLat, 'EPSG:4326', 'EPSG:3857');
    /** @type {?} */
    var convertedLonLat = [
        {
            code: 'EPSG:3857',
            alias: 'Web mercator',
            coord: rawCoord3857,
            igo2CoordFormat: roundCoordTo(rawCoord3857).join(', ') + " ; 3857"
        }
    ];
    // detect the current utm zone.
    /** @type {?} */
    var utmZone = utmZoneFromLonLat(lonLat);
    /** @type {?} */
    var epsgUtm = utmZone < 10 ? "EPSG:3260" + utmZone : "EPSG:326" + utmZone;
    /** @type {?} */
    var utmName = "UTM-" + utmZone;
    /** @type {?} */
    var rawCoordUtm = olproj.transform(lonLat, 'EPSG:4326', epsgUtm);
    convertedLonLat.push({
        code: epsgUtm,
        alias: 'UTM',
        coord: rawCoordUtm,
        igo2CoordFormat: utmName + " " + roundCoordTo(rawCoordUtm).join(', ')
    });
    // detect the current mtm zone.
    /** @type {?} */
    var mtmZone = mtmZoneFromLonLat(lonLat);
    if (mtmZone) {
        /** @type {?} */
        var epsgMtm = mtmZone < 10 ? "EPSG:3218" + mtmZone : "EPSG:321" + (80 + mtmZone);
        /** @type {?} */
        var mtmName = "MTM-" + mtmZone;
        /** @type {?} */
        var rawCoordMtm = olproj.transform(lonLat, 'EPSG:4326', epsgMtm);
        convertedLonLat.push({
            code: epsgMtm,
            alias: 'MTM',
            coord: rawCoordMtm,
            igo2CoordFormat: mtmName + " " + roundCoordTo(rawCoordMtm).join(', ')
        });
    }
    projections.forEach((/**
     * @param {?} projection
     * @return {?}
     */
    function (projection) {
        /** @type {?} */
        var rawCoord = olproj.transform(lonLat, 'EPSG:4326', projection.code);
        /** @type {?} */
        var numericEpsgCode = projection.code.split(':')[1];
        convertedLonLat.push({
            code: projection.code,
            alias: projection.alias || projection.code,
            coord: rawCoord,
            igo2CoordFormat: roundCoordTo(rawCoord).join(', ') + " ; " + numericEpsgCode
        });
    }));
    return convertedLonLat;
}
/**
 * Detect the current utm zone of the lon/lat coordinate.
 * @param {?} lonLat [number, number] array of the coordinate to detect the UTM zone.
 * @return {?} number The UTM zone.
 */
export function utmZoneFromLonLat(lonLat) {
    return Math.ceil((lonLat[0] + 180) / 6);
}
/**
 * Detect the current mtm zone of the lon/lat coordinate.
 * @param {?} lonLat [number, number] array of the coordinate to detect the MTM zone.
 * @return {?} number The MTM zone. Undefined if outside of the mtm application zone.
 */
export function mtmZoneFromLonLat(lonLat) {
    /** @type {?} */
    var long = lonLat[0];
    /** @type {?} */
    var mtmZone;
    if (long < -51 && long > -54) {
        mtmZone = 1;
    }
    if (long < -54 && long > -57) {
        mtmZone = 2;
    }
    if (long < -57 && long > -60) {
        mtmZone = 3;
    }
    if (long < -60 && long > -63) {
        mtmZone = 4;
    }
    if (long < -63 && long > -66) {
        mtmZone = 5;
    }
    if (long < -66 && long > -69) {
        mtmZone = 6;
    }
    if (long < -69 && long > -72) {
        mtmZone = 7;
    }
    if (long < -72 && long > -75) {
        mtmZone = 8;
    }
    if (long < -75 && long > -78) {
        mtmZone = 9;
    }
    if (long < -78 && long > -81) {
        mtmZone = 10;
    }
    return mtmZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7O0FBaUI3QixNQUFNLFVBQVUsY0FBYyxDQUM1QixHQUFXLEVBQ1gsYUFBcUIsRUFDckIsSUFBZ0M7SUFBaEMscUJBQUEsRUFBQSxTQUFnQzs7O1FBTzVCLE1BQXdCOztRQUN4QixRQUFnQjs7UUFDaEIsV0FBbUI7O1FBQ25CLFVBQWtCOztRQUNsQixVQUFrQjs7UUFDbEIsVUFBa0I7O1FBQ2xCLFlBQW9COztRQUNwQixVQUFrQjs7UUFDbEIsV0FBbUI7O1FBQ25CLFVBQWtCOztRQUNsQixVQUFrQjs7UUFDbEIsVUFBa0I7O1FBQ2xCLFlBQW9COztRQUNwQixVQUFrQjs7UUFDbEIsSUFBWTs7UUFDWixNQUFjOztRQUNkLElBQVk7O1FBQ1osR0FBUTs7UUFDUixHQUFROztRQUVOLGlCQUFpQixHQUFHLHVCQUF1Qjs7UUFDM0MsWUFBWSxHQUFHLE1BQU07O1FBQ3ZCLGFBQXFCOztRQUNuQixlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDOztRQUVwRCxXQUFXLEdBQUcsa0NBQWtDOztRQUNoRCxhQUFhLEdBQU0sV0FBVyxlQUFVLFdBQWE7O1FBQ3JELFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFJLGFBQWEsTUFBRyxFQUFFLEdBQUcsQ0FBQzs7UUFFbkQsUUFBUSxHQUNaLGlHQUFpRzs7UUFDN0YsZUFBZSxHQUFNLFFBQVEsMkJBQXNCLFFBQVEsa0JBQWU7O1FBQzFFLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFJLGVBQWlCLEVBQUUsSUFBSSxDQUFDOztRQUVs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QUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNkO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlclBvaW50ZXJFdmVudCBhcyBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgfSBmcm9tICdvbC9NYXBCcm93c2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBNQUMgfSBmcm9tICdvbC9oYXMnO1xyXG5cclxuaW1wb3J0IHsgTWFwVmlld1N0YXRlIH0gZnJvbSAnLi9tYXAuaW50ZXJmYWNlJztcclxuaW1wb3J0IHByb2o0IGZyb20gJ3Byb2o0JztcclxuaW1wb3J0IHsgUHJvamVjdGlvbiB9IGZyb20gJy4vcHJvamVjdGlvbi5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1ldGhvZCBleHRyYWN0cyBhIGNvb3JkaW5hdGUgdHVwbGUgZnJvbSBhIHN0cmluZy5cclxuICogQHBhcmFtIHN0ciBBbnkgc3RyaW5nXHJcbiAqIEBwYXJhbSBtYXBQcm9qZWN0aW9uIHN0cmluZyBNYXAgUHJvamVjdGlvblxyXG4gKiBAcGFyYW0gb3B0cy5mb3JjZU5BIGJvb2xlYW4gRm9yY2UgTm9ydGggQW1lcmljYSBab25lXHJcbiAqIEByZXR1cm5zIG9iamVjdDpcclxuICogICAgICAgICAgICAgbG9uTGF0OiBDb29yZGluYXRlLFxyXG4gKiAgICAgICAgICAgICBtZXNzYWdlOiBNZXNzYWdlIG9mIGVycm9yLFxyXG4gKiAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyBvZiB0aGUgY29uZmllbmNlIG9mIGNvb3JkaW5hdGUsXHJcbiAqICAgICAgICAgICAgIGNvbmY6IGNvbmZpZGVuY2Ugb2YgdGhlIGNvb3JkaW5hdGV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9Mb25MYXQoXHJcbiAgc3RyOiBzdHJpbmcsXHJcbiAgbWFwUHJvamVjdGlvbjogc3RyaW5nLFxyXG4gIG9wdHM6IHsgZm9yY2VOQT86IGJvb2xlYW4gfSA9IHt9XHJcbik6IHtcclxuICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0gfCB1bmRlZmluZWQ7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIHJhZGl1czogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gIGNvbmY6IG51bWJlciB8IHVuZGVmaW5lZDtcclxufSB7XHJcbiAgbGV0IGxvbkxhdDogW251bWJlciwgbnVtYmVyXTtcclxuICBsZXQgY29vcmRTdHI6IHN0cmluZztcclxuICBsZXQgbmVnYXRpdmVMb246IHN0cmluZztcclxuICBsZXQgZGVncmVlc0xvbjogc3RyaW5nO1xyXG4gIGxldCBtaW51dGVzTG9uOiBzdHJpbmc7XHJcbiAgbGV0IHNlY29uZHNMb246IHN0cmluZztcclxuICBsZXQgZGlyZWN0aW9uTG9uOiBzdHJpbmc7XHJcbiAgbGV0IGRlY2ltYWxMb246IHN0cmluZztcclxuICBsZXQgbmVnYXRpdmVMYXQ6IHN0cmluZztcclxuICBsZXQgZGVncmVlc0xhdDogc3RyaW5nO1xyXG4gIGxldCBtaW51dGVzTGF0OiBzdHJpbmc7XHJcbiAgbGV0IHNlY29uZHNMYXQ6IHN0cmluZztcclxuICBsZXQgZGlyZWN0aW9uTGF0OiBzdHJpbmc7XHJcbiAgbGV0IGRlY2ltYWxMYXQ6IHN0cmluZztcclxuICBsZXQgem9uZTogc3RyaW5nO1xyXG4gIGxldCByYWRpdXM6IHN0cmluZztcclxuICBsZXQgY29uZjogc3RyaW5nO1xyXG4gIGxldCBsb246IGFueTtcclxuICBsZXQgbGF0OiBhbnk7XHJcblxyXG4gIGNvbnN0IHByb2plY3Rpb25QYXR0ZXJuID0gJyhcXFxccyo7XFxcXHMqW1xcXFxkXXs0LDZ9KSc7XHJcbiAgY29uc3QgdG9Qcm9qZWN0aW9uID0gJzQzMjYnO1xyXG4gIGxldCBwcm9qZWN0aW9uU3RyOiBzdHJpbmc7XHJcbiAgY29uc3QgcHJvamVjdGlvblJlZ2V4ID0gbmV3IFJlZ0V4cChwcm9qZWN0aW9uUGF0dGVybiwgJ2cnKTtcclxuXHJcbiAgY29uc3QgbG9ubGF0Q29vcmQgPSAnKFstK10pPyhbXFxcXGRdezEsM30pKFssLl0oXFxcXGQrKSk/JztcclxuICBjb25zdCBsb25MYXRQYXR0ZXJuID0gYCR7bG9ubGF0Q29vcmR9W1xcXFxzLF0rJHtsb25sYXRDb29yZH1gO1xyXG4gIGNvbnN0IGxvbkxhdFJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7bG9uTGF0UGF0dGVybn0kYCwgJ2cnKTtcclxuXHJcbiAgY29uc3QgZG1zQ29vcmQgPVxyXG4gICAgJyhbMC05XXsxLDJ9KVs6fMKwXT9cXFxccyooWzAtOV17MSwyfSk/Wzp8XFwnfOKAsnzigJldP1xcXFxzKihbMC05XXsxLDJ9KD86LlswLTldKyl7MCwxfSk/XFxcXHMqW1wifOKAs3zigJ1dP1xcXFxzKic7XHJcbiAgY29uc3QgZG1zQ29vcmRQYXR0ZXJuID0gYCR7ZG1zQ29vcmR9KFtOfFN8RXxXfE9dKSw/XFxcXHMqJHtkbXNDb29yZH0oW058U3xFfFd8T10pYDtcclxuICBjb25zdCBkbXNSZWdleCA9IG5ldyBSZWdFeHAoYF4ke2Rtc0Nvb3JkUGF0dGVybn1gLCAnZ2knKTtcclxuXHJcbiAgY29uc3QgcGF0dGVyblV0bSA9XHJcbiAgICAnKFVUTSktPyhcXFxcZHsxLDJ9KVtcXFxccyxdKihcXFxcZCtbLixdP1xcXFxkKylbXFxcXHMsXSsoXFxcXGQrWy4sXT9cXFxcZCspJztcclxuICBjb25zdCB1dG1SZWdleCA9IG5ldyBSZWdFeHAoYF4ke3BhdHRlcm5VdG19YCwgJ2dpJyk7XHJcblxyXG4gIGNvbnN0IHBhdHRlcm5NdG0gPVxyXG4gICAgJyhNVE0pLT8oXFxcXGR7MSwyfSlbXFxcXHMsXSooXFxcXGQrWy4sXT9cXFxcZCspW1xcXFxzLF0rKFxcXFxkK1suLF0/XFxcXGQrKSc7XHJcbiAgY29uc3QgbXRtUmVnZXggPSBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuTXRtfWAsICdnaScpO1xyXG5cclxuICBjb25zdCBkZENvb3JkID0gJyhbLStdKT8oXFxcXGR7MSwzfSlbLC5dKFxcXFxkKyknO1xyXG4gIGNvbnN0IHBhdHRlcm5EZCA9IGAke2RkQ29vcmR9XFxcXHMqWyxdP1xcXFxzKiR7ZGRDb29yZH1gO1xyXG4gIGNvbnN0IGRkUmVnZXggPSBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuRGR9YCwgJ2cnKTtcclxuXHJcbiAgY29uc3QgZG1kQ29vcmQgPVxyXG4gICAgJyhbLStdKT8oXFxcXGR7MSwzfSlbXFxcXHMsLl17MX0oXFxcXGR7MSwyfSlbXFxcXHMsLl17MX0oXFxcXGR7MSwyfSlbLixdPyhcXFxcZHsxLDV9KT8nO1xyXG4gIGNvbnN0IHBhdHRlcm5EbWQgPSBgJHtkbWRDb29yZH1cXFxccypbLC5dP1xcXFxzKiR7ZG1kQ29vcmR9YDtcclxuICBjb25zdCBkbWRSZWdleCA9IG5ldyBSZWdFeHAoYF4ke3BhdHRlcm5EbWR9YCwgJ2cnKTtcclxuXHJcbiAgLy8gdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgY29uc3QgcGF0dGVybkJFTEwgPVxyXG4gICAgJ0xBVFxcXFxzKltcXFxcczpdKlxcXFxzKihbLStdKT8oXFxcXGR7MSwyfSlbXFxcXHMuLF0/KFxcXFxkKyk/W1xcXFxzLixdP1xcXFxzKihcXFxcZHsxLDJ9KFsuLF1cXFxcZCspPyk/XFxcXHMqKE58U3xFfFcpP1xcXFxzKkxPTkdcXFxccypbXFxcXHM6XSpcXFxccyooWy0rXSk/KFxcXFxkezEsM30pW1xcXFxzLixdPyhcXFxcZCspP1tcXFxccy4sXT9cXFxccyooXFxcXGR7MSwyfShbLixdXFxcXGQrKT8pP1xcXFxzKihOfFN8RXxXKT9cXFxccypVTkNcXFxccypbXFxcXHM6XT9cXFxccyooXFxcXGQrKVxcXFxzKkNPTkZcXFxccypbXFxcXHM6XT9cXFxccyooXFxcXGR7MSwzfSknO1xyXG4gIGNvbnN0IGJlbGxSZWdleCA9IG5ldyBSZWdFeHAoYF4ke3BhdHRlcm5CRUxMfT9gLCAnZ2knKTtcclxuXHJcbiAgY29uc3QgbW1Db29yZCA9ICcoWy0rXT9cXFxcZCspWywuXT8oXFxcXGQrKT8nO1xyXG4gIGNvbnN0IG1tUGF0dGVybiA9IGAke21tQ29vcmR9W1xcXFxzLF0rJHttbUNvb3JkfWA7XHJcbiAgY29uc3QgbW1SZWdleCA9IG5ldyBSZWdFeHAoYF4ke21tUGF0dGVybn0kYCwgJ2cnKTtcclxuXHJcbiAgbGV0IGlzWFlDb29yZHMgPSBmYWxzZTtcclxuXHJcbiAgc3RyID0gc3RyLnRvTG9jYWxlVXBwZXJDYXNlKCkudHJpbSgpO1xyXG5cclxuICAvLyBFeHRyYWN0IHByb2plY3Rpb25cclxuICBpZiAocHJvamVjdGlvblJlZ2V4LnRlc3Qoc3RyKSkge1xyXG4gICAgW2Nvb3JkU3RyLCBwcm9qZWN0aW9uU3RyXSA9IHN0ci5zcGxpdCgnOycpLm1hcChzID0+IHMudHJpbSgpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29vcmRTdHIgPSBzdHI7XHJcbiAgfVxyXG4gIGlmIChsb25MYXRSZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgW1xyXG4gICAgICAsXHJcbiAgICAgIG5lZ2F0aXZlTG9uLFxyXG4gICAgICBsb24sXHJcbiAgICAgICxcclxuICAgICAgZGVjaW1hbExvbixcclxuICAgICAgbmVnYXRpdmVMYXQsXHJcbiAgICAgIGxhdCxcclxuICAgICAgLFxyXG4gICAgICBkZWNpbWFsTGF0XHJcbiAgICBdID0gY29vcmRTdHIubWF0Y2gobG9uTGF0UGF0dGVybik7XHJcblxyXG4gICAgbG9uID0gcGFyc2VGbG9hdCgobmVnYXRpdmVMb24gPyBuZWdhdGl2ZUxvbiA6ICcnKSArIGxvbiArICcuJyArIGRlY2ltYWxMb24pO1xyXG4gICAgbGF0ID0gcGFyc2VGbG9hdCgobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGxhdCArICcuJyArIGRlY2ltYWxMYXQpO1xyXG4gIH0gZWxzZSBpZiAoZG1zUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIFtcclxuICAgICAgLFxyXG4gICAgICBkZWdyZWVzTG9uLFxyXG4gICAgICBtaW51dGVzTG9uLFxyXG4gICAgICBzZWNvbmRzTG9uLFxyXG4gICAgICBkaXJlY3Rpb25Mb24sXHJcbiAgICAgIGRlZ3JlZXNMYXQsXHJcbiAgICAgIG1pbnV0ZXNMYXQsXHJcbiAgICAgIHNlY29uZHNMYXQsXHJcbiAgICAgIGRpcmVjdGlvbkxhdFxyXG4gICAgXSA9IGNvb3JkU3RyLm1hdGNoKGRtc0Nvb3JkUGF0dGVybik7XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbkxvbiA9PT0gJ1MnIHx8IGRpcmVjdGlvbkxvbiA9PT0gJ04nKSB7XHJcbiAgICAgIGRlZ3JlZXNMb24gPSBbZGVncmVlc0xhdCwgKGRlZ3JlZXNMYXQgPSBkZWdyZWVzTG9uKV1bMF07XHJcbiAgICAgIG1pbnV0ZXNMb24gPSBbbWludXRlc0xhdCwgKG1pbnV0ZXNMYXQgPSBtaW51dGVzTG9uKV1bMF07XHJcbiAgICAgIHNlY29uZHNMb24gPSBbc2Vjb25kc0xhdCwgKHNlY29uZHNMYXQgPSBzZWNvbmRzTG9uKV1bMF07XHJcbiAgICAgIGRpcmVjdGlvbkxvbiA9IFtkaXJlY3Rpb25MYXQsIChkaXJlY3Rpb25MYXQgPSBkaXJlY3Rpb25Mb24pXVswXTtcclxuICAgIH1cclxuXHJcbiAgICBsb24gPSBjb252ZXJ0RE1TVG9ERChcclxuICAgICAgcGFyc2VGbG9hdChkZWdyZWVzTG9uKSxcclxuICAgICAgcGFyc2VGbG9hdChtaW51dGVzTG9uKSxcclxuICAgICAgcGFyc2VGbG9hdChzZWNvbmRzTG9uKSxcclxuICAgICAgZGlyZWN0aW9uTG9uXHJcbiAgICApO1xyXG4gICAgbGF0ID0gY29udmVydERNU1RvREQoXHJcbiAgICAgIHBhcnNlRmxvYXQoZGVncmVlc0xhdCksXHJcbiAgICAgIHBhcnNlRmxvYXQobWludXRlc0xhdCksXHJcbiAgICAgIHBhcnNlRmxvYXQoc2Vjb25kc0xhdCksXHJcbiAgICAgIGRpcmVjdGlvbkxhdFxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKHV0bVJlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcbiAgICBpc1hZQ29vcmRzID0gdHJ1ZTtcclxuICAgIFssICwgem9uZSwgbG9uLCBsYXRdID0gY29vcmRTdHIubWF0Y2gocGF0dGVyblV0bSk7XHJcbiAgICBjb25zdCBlcHNnVXRtID0gTnVtYmVyKHpvbmUpIDwgMTAgPyBgRVBTRzozMjYwJHt6b25lfWAgOiBgRVBTRzozMjYke3pvbmV9YDtcclxuICAgIFtsb24sIGxhdF0gPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICBbcGFyc2VGbG9hdChsb24pLCBwYXJzZUZsb2F0KGxhdCldLFxyXG4gICAgICBlcHNnVXRtLFxyXG4gICAgICAnRVBTRzo0MzI2J1xyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKG10bVJlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcbiAgICBpc1hZQ29vcmRzID0gdHJ1ZTtcclxuICAgIFssICwgem9uZSwgbG9uLCBsYXRdID0gY29vcmRTdHIubWF0Y2gocGF0dGVybk10bSk7XHJcbiAgICBjb25zdCBlcHNnTXRtID1cclxuICAgICAgTnVtYmVyKHpvbmUpIDwgMTAgPyBgRVBTRzozMjE4JHt6b25lfWAgOiBgRVBTRzozMjEkezgwICsgTnVtYmVyKHpvbmUpfWA7XHJcbiAgICBbbG9uLCBsYXRdID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgW3BhcnNlRmxvYXQobG9uKSwgcGFyc2VGbG9hdChsYXQpXSxcclxuICAgICAgZXBzZ010bSxcclxuICAgICAgJ0VQU0c6NDMyNidcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChkbWRSZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgW1xyXG4gICAgICAsXHJcbiAgICAgIG5lZ2F0aXZlTG9uLFxyXG4gICAgICBkZWdyZWVzTG9uLFxyXG4gICAgICBtaW51dGVzTG9uLFxyXG4gICAgICBzZWNvbmRzTG9uLFxyXG4gICAgICBkZWNpbWFsTG9uLFxyXG4gICAgICBuZWdhdGl2ZUxhdCxcclxuICAgICAgZGVncmVlc0xhdCxcclxuICAgICAgbWludXRlc0xhdCxcclxuICAgICAgc2Vjb25kc0xhdCxcclxuICAgICAgZGVjaW1hbExhdFxyXG4gICAgXSA9IGNvb3JkU3RyLm1hdGNoKHBhdHRlcm5EbWQpO1xyXG5cclxuICAgIGxvbiA9IGNvbnZlcnRETVNUb0REKFxyXG4gICAgICBwYXJzZUZsb2F0KChuZWdhdGl2ZUxvbiA/IG5lZ2F0aXZlTG9uIDogJycpICsgZGVncmVlc0xvbiksXHJcbiAgICAgIHBhcnNlRmxvYXQobWludXRlc0xvbiksXHJcbiAgICAgIHBhcnNlRmxvYXQoc2Vjb25kc0xvbiksXHJcbiAgICAgIGRpcmVjdGlvbkxvblxyXG4gICAgKTtcclxuICAgIGxhdCA9IGNvbnZlcnRETVNUb0REKFxyXG4gICAgICBwYXJzZUZsb2F0KChuZWdhdGl2ZUxhdCA/IG5lZ2F0aXZlTGF0IDogJycpICsgZGVncmVlc0xhdCksXHJcbiAgICAgIHBhcnNlRmxvYXQobWludXRlc0xhdCksXHJcbiAgICAgIHBhcnNlRmxvYXQoc2Vjb25kc0xhdCksXHJcbiAgICAgIGRpcmVjdGlvbkxhdFxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGRkUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIFtcclxuICAgICAgLFxyXG4gICAgICBuZWdhdGl2ZUxvbixcclxuICAgICAgZGVncmVlc0xvbixcclxuICAgICAgZGVjaW1hbExvbixcclxuICAgICAgbmVnYXRpdmVMYXQsXHJcbiAgICAgIGRlZ3JlZXNMYXQsXHJcbiAgICAgIGRlY2ltYWxMYXRcclxuICAgIF0gPSBjb29yZFN0ci5tYXRjaChwYXR0ZXJuRGQpO1xyXG5cclxuICAgIGxvbiA9IGNvbnZlcnRETVNUb0REKFxyXG4gICAgICBwYXJzZUZsb2F0KChuZWdhdGl2ZUxvbiA/IG5lZ2F0aXZlTG9uIDogJycpICsgZGVncmVlc0xvbiksXHJcbiAgICAgIHBhcnNlRmxvYXQobWludXRlc0xvbiksXHJcbiAgICAgIHBhcnNlRmxvYXQoc2Vjb25kc0xvbiksXHJcbiAgICAgIGRpcmVjdGlvbkxvblxyXG4gICAgKTtcclxuICAgIGxhdCA9IGNvbnZlcnRETVNUb0REKFxyXG4gICAgICBwYXJzZUZsb2F0KChuZWdhdGl2ZUxhdCA/IG5lZ2F0aXZlTGF0IDogJycpICsgZGVncmVlc0xhdCksXHJcbiAgICAgIHBhcnNlRmxvYXQobWludXRlc0xhdCksXHJcbiAgICAgIHBhcnNlRmxvYXQoc2Vjb25kc0xhdCksXHJcbiAgICAgIGRpcmVjdGlvbkxhdFxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGJlbGxSZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgW1xyXG4gICAgICAsXHJcbiAgICAgIG5lZ2F0aXZlTGF0LFxyXG4gICAgICBkZWdyZWVzTGF0LFxyXG4gICAgICBtaW51dGVzTGF0LFxyXG4gICAgICBzZWNvbmRzTGF0LFxyXG4gICAgICAsXHJcbiAgICAgIGRpcmVjdGlvbkxhdCxcclxuICAgICAgbmVnYXRpdmVMb24sXHJcbiAgICAgIGRlZ3JlZXNMb24sXHJcbiAgICAgIG1pbnV0ZXNMb24sXHJcbiAgICAgIHNlY29uZHNMb24sXHJcbiAgICAgICxcclxuICAgICAgZGlyZWN0aW9uTG9uLFxyXG4gICAgICByYWRpdXMsXHJcbiAgICAgIGNvbmZcclxuICAgIF0gPSBjb29yZFN0ci5tYXRjaChwYXR0ZXJuQkVMTCk7XHJcblxyXG4gICAgLy8gU2V0IGRlZmF1bHQgdmFsdWUgZm9yIE5vcnRoIEFtZXJpY2FcclxuICAgIGlmICghZGlyZWN0aW9uTG9uKSB7XHJcbiAgICAgIGRpcmVjdGlvbkxvbiA9ICdXJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiByZWFsIG1pbnV0ZXMgb3IgZGVjaW1hbHNcclxuICAgIGlmIChtaW51dGVzTG9uICYmIG1pbnV0ZXNMb24ubGVuZ3RoID4gMikge1xyXG4gICAgICBsb24gPSBwYXJzZUZsb2F0KFxyXG4gICAgICAgIChuZWdhdGl2ZUxvbiA/IG5lZ2F0aXZlTG9uIDogJycpICsgZGVncmVlc0xvbiArICcuJyArIG1pbnV0ZXNMb25cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvbiA9IGNvbnZlcnRETVNUb0REKFxyXG4gICAgICAgIHBhcnNlRmxvYXQoZGVncmVlc0xvbiksXHJcbiAgICAgICAgcGFyc2VGbG9hdChtaW51dGVzTG9uKSxcclxuICAgICAgICBwYXJzZUZsb2F0KHNlY29uZHNMb24pLFxyXG4gICAgICAgIGRpcmVjdGlvbkxvblxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtaW51dGVzTGF0ICYmIG1pbnV0ZXNMYXQubGVuZ3RoID4gMikge1xyXG4gICAgICBsYXQgPSBwYXJzZUZsb2F0KFxyXG4gICAgICAgIChuZWdhdGl2ZUxhdCA/IG5lZ2F0aXZlTGF0IDogJycpICsgZGVncmVlc0xhdCArICcuJyArIG1pbnV0ZXNMYXRcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhdCA9IGNvbnZlcnRETVNUb0REKFxyXG4gICAgICAgIHBhcnNlRmxvYXQoZGVncmVlc0xhdCksXHJcbiAgICAgICAgcGFyc2VGbG9hdChtaW51dGVzTGF0KSxcclxuICAgICAgICBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLFxyXG4gICAgICAgIGRpcmVjdGlvbkxhdFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAobW1SZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgaXNYWUNvb3JkcyA9IHRydWU7XHJcbiAgICBbLCBsb24sIGRlY2ltYWxMb24sIGxhdCwgZGVjaW1hbExhdF0gPSBjb29yZFN0ci5tYXRjaChtbVBhdHRlcm4pO1xyXG5cclxuICAgIGlmIChkZWNpbWFsTG9uKSB7XHJcbiAgICAgIGxvbiA9IHBhcnNlRmxvYXQobG9uICsgJy4nICsgZGVjaW1hbExvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlY2ltYWxMYXQpIHtcclxuICAgICAgbGF0ID0gcGFyc2VGbG9hdChsYXQgKyAnLicgKyBkZWNpbWFsTGF0KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9uTGF0OiB1bmRlZmluZWQsXHJcbiAgICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgICByYWRpdXM6IHVuZGVmaW5lZCxcclxuICAgICAgY29uZjogdW5kZWZpbmVkXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKG9wdHMuZm9yY2VOQSAmJiAhaXNYWUNvb3Jkcykge1xyXG4gICAgLy8gU2V0IGEgbmVnYXRpdmUgY29vcmRpbmF0ZSBmb3IgTm9ydGggQW1lcmljYSB6b25lXHJcbiAgICBpZiAobG9uID4gMCAmJiBsYXQgPiAwKSB7XHJcbiAgICAgIGlmIChsb24gPiBsYXQpIHtcclxuICAgICAgICBsb24gPSAtbG9uO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxhdCA9IC1sYXQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXZlcnNlIGNvb3JkaW5hdGUgdG8gcmVzcGVjdCBsb25MYXQgY29udmVudGlvblxyXG4gICAgaWYgKGxvbiA+IGxhdCkge1xyXG4gICAgICBsb24gPSBbbGF0LCAobGF0ID0gbG9uKV1bMF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb25MYXQgPSBbTnVtYmVyKGxvbiksIE51bWJlcihsYXQpXSBhcyBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICAvLyBSZXByb2plY3QgdGhlIGNvb3JkaW5hdGUgaWYgcHJvamVjdGlvbiBwYXJhbWV0ZXIgaGF2ZSBiZWVuIHNldCBhbmQgY29vcmQgaXMgbm90IDQzMjZcclxuICBpZiAoXHJcbiAgICAocHJvamVjdGlvblN0ciAhPT0gdW5kZWZpbmVkICYmIHByb2plY3Rpb25TdHIgIT09IHRvUHJvamVjdGlvbikgfHxcclxuICAgIChsb25MYXRbMF0gPiAxODAgfHwgbG9uTGF0WzBdIDwgLTE4MCkgfHxcclxuICAgIChsb25MYXRbMV0gPiA5MCB8fCBsb25MYXRbMV0gPCAtOTApXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzb3VyY2UgPSBwcm9qZWN0aW9uU3RyID8gJ0VQU0c6JyArIHByb2plY3Rpb25TdHIgOiBtYXBQcm9qZWN0aW9uO1xyXG4gICAgY29uc3QgZGVzdCA9ICdFUFNHOicgKyB0b1Byb2plY3Rpb247XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbG9uTGF0ID0gb2xwcm9qLnRyYW5zZm9ybShsb25MYXQsIHNvdXJjZSwgZGVzdCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbG9uTGF0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgbWVzc2FnZTogJ1Byb2plY3Rpb24gJyArIHNvdXJjZSArICcgbm90IHN1cHBvcnRlZCcsXHJcbiAgICAgICAgcmFkaXVzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgY29uZjogdW5kZWZpbmVkXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbG9uTGF0LFxyXG4gICAgbWVzc2FnZTogJycsXHJcbiAgICByYWRpdXM6IHJhZGl1cyA/IHBhcnNlSW50KHJhZGl1cywgMTApIDogdW5kZWZpbmVkLFxyXG4gICAgY29uZjogY29uZiA/IHBhcnNlSW50KGNvbmYsIDEwKSA6IHVuZGVmaW5lZFxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IGRlZ3JlZXMgbWludXRlcyBzZWNvbmRzIHRvIGRkXHJcbiAqIEBwYXJhbSBkZWdyZWVzIERlZ3JlZXNcclxuICogQHBhcmFtIG1pbnV0ZXMgTWludXRlc1xyXG4gKiBAcGFyYW0gc2Vjb25kcyBTZWNvbmRzXHJcbiAqIEBwYXJhbSBkaXJlY3Rpb24gRGlyZWN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0RE1TVG9ERChcclxuICBkZWdyZWVzOiBudW1iZXIsXHJcbiAgbWludXRlczogbnVtYmVyLFxyXG4gIHNlY29uZHM6IG51bWJlcixcclxuICBkaXJlY3Rpb246IHN0cmluZ1xyXG4pIHtcclxuICBtaW51dGVzID0gbWludXRlcyB8fCAwO1xyXG4gIHNlY29uZHMgPSBzZWNvbmRzIHx8IDA7XHJcbiAgbGV0IGRkID0gZGVncmVlcyArIG1pbnV0ZXMgLyA2MCArIHNlY29uZHMgLyAzNjAwO1xyXG5cclxuICBpZiAoZGlyZWN0aW9uID09PSAnUycgfHwgZGlyZWN0aW9uID09PSAnVycpIHtcclxuICAgIGRkID0gLWRkO1xyXG4gIH0gLy8gRG9uJ3QgZG8gYW55dGhpbmcgZm9yIE4gb3IgRVxyXG4gIHJldHVybiBkZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIG9mIHR3byB2aWV3IHN0YXRlcyBhcmUgZXF1YWwuXHJcbiAqIEBwYXJhbSBzdGF0ZTEgVmlldyBzdGF0ZVxyXG4gKiBAcGFyYW0gc3RhdGUyIFZpZXcgc3RhdGVcclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmlldyBzdGF0ZXMgYXJlIGVxdWFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdmlld1N0YXRlc0FyZUVxdWFsKFxyXG4gIHN0YXRlMTogTWFwVmlld1N0YXRlLFxyXG4gIHN0YXRlMjogTWFwVmlld1N0YXRlXHJcbik6IGJvb2xlYW4ge1xyXG4gIGlmIChzdGF0ZTEgPT09IHVuZGVmaW5lZCB8fCBzdGF0ZTIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9sZXJhbmNlID0gMSAvIDEwMDAwO1xyXG4gIHJldHVybiAoXHJcbiAgICBzdGF0ZTEuem9vbSA9PT0gc3RhdGUyLnpvb20gJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgPT09XHJcbiAgICAgIE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclswXSAvIHRvbGVyYW5jZSkgJiZcclxuICAgIE1hdGgudHJ1bmMoc3RhdGUxLmNlbnRlclsxXSAvIHRvbGVyYW5jZSkgPT09XHJcbiAgICAgIE1hdGgudHJ1bmMoc3RhdGUyLmNlbnRlclsxXSAvIHRvbGVyYW5jZSlcclxuICApO1xyXG59XHJcblxyXG4vKipcclxuICogRm9ybWF0IHRoZSBzY2FsZSB0byBhIGh1bWFuIHJlYWRhYmxlIHRleHRcclxuICogQHBhcmFtIFNjYWxlIG9mIHRoZSBtYXBcclxuICogQHJldHVybnMgSHVtYW4gcmVhZGFibGUgc2NhbGUgdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFNjYWxlKHNjYWxlKSB7XHJcbiAgc2NhbGUgPSBNYXRoLnJvdW5kKHNjYWxlKTtcclxuICBpZiAoc2NhbGUgPCAxMDAwMCkge1xyXG4gICAgcmV0dXJuIHNjYWxlICsgJyc7XHJcbiAgfVxyXG5cclxuICBzY2FsZSA9IE1hdGgucm91bmQoc2NhbGUgLyAxMDAwKTtcclxuICBpZiAoc2NhbGUgPCAxMDAwKSB7XHJcbiAgICByZXR1cm4gc2NhbGUgKyAnSyc7XHJcbiAgfVxyXG5cclxuICBzY2FsZSA9IE1hdGgucm91bmQoc2NhbGUgLyAxMDAwKTtcclxuICByZXR1cm4gc2NhbGUgKyAnTSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHJlc29sdXRpb24gZnJvbSBhIHNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBzY2FsZSBTY2FsZSBkZW5vbVxyXG4gKiBAcGFyYW0gZHBpIERQSVxyXG4gKiBAcmV0dXJucyBSZXNvbHV0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShcclxuICBzY2FsZTogbnVtYmVyLFxyXG4gIGRwaTogbnVtYmVyID0gOTZcclxuKTogbnVtYmVyIHtcclxuICBjb25zdCBpbmNoZXNQZXJNZXRlciA9IDM5LjM3MDE7XHJcbiAgcmV0dXJuIHNjYWxlIC8gKGluY2hlc1Blck1ldGVyICogZHBpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcmVzb2x1dGlvbiBmcm9tIGEgc2NhbGUgZGVub21cclxuICogQHBhcmFtIFNjYWxlIGRlbm9tXHJcbiAqIEByZXR1cm5zIFJlc29sdXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZUZyb21SZXNvbHV0aW9uKFxyXG4gIHJlc29sdXRpb246IG51bWJlcixcclxuICB1bml0OiBzdHJpbmcgPSAnbScsXHJcbiAgZHBpOiBudW1iZXIgPSA5NlxyXG4pOiBudW1iZXIge1xyXG4gIGNvbnN0IGluY2hlc1Blck1ldGVyID0gMzkuMzcwMTtcclxuICByZXR1cm4gcmVzb2x1dGlvbiAqIG9scHJvai5NRVRFUlNfUEVSX1VOSVRbdW5pdF0gKiBpbmNoZXNQZXJNZXRlciAqIGRwaTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgQ1RSTCBrZXkgaXMgcHVzaGVkIGR1cmluZyBhbiBPbCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAqIEBwYXJhbSBldmVudCBPTCBNYXBCcm93c2VyUG9pbnRlckV2ZW50XHJcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIENUUkwga2V5IGlzIHB1c2hlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGN0cmxLZXlEb3duKGV2ZW50OiBPbE1hcEJyb3dzZXJQb2ludGVyRXZlbnQpOiBib29sZWFuIHtcclxuICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudDtcclxuICByZXR1cm4gKFxyXG4gICAgIW9yaWdpbmFsRXZlbnQuYWx0S2V5ICYmXHJcbiAgICAoTUFDID8gb3JpZ2luYWxFdmVudC5tZXRhS2V5IDogb3JpZ2luYWxFdmVudC5jdHJsS2V5KSAmJlxyXG4gICAgIW9yaWdpbmFsRXZlbnQuc2hpZnRLZXlcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm91bmRDb29yZFRvKGNvb3JkOiBbbnVtYmVyLCBudW1iZXJdLCBkZWNpbWFsOiBudW1iZXIgPSAzKSB7XHJcbiAgcmV0dXJuIFtjb29yZFswXS50b0ZpeGVkKGRlY2ltYWwpLCBjb29yZFsxXS50b0ZpeGVkKGRlY2ltYWwpXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgY29udmVydGVkIGNvb3JkaW5hdGVzLlxyXG4gKiBDb252ZXJzaW9uIGlzIGRvbmUgZm9yIGV2ZXJ5IGNvbmZpZ3VyZWQgcHJvamVjdGlvbnNcclxuICogYW5kIGZvciB0aGUgY3VycmVudCBVVE0gem9uZSBhbmQgTVRNIHpvbmUuXHJcbiAqIEBwYXJhbSBsb25MYXQgW251bWJlciwgbnVtYmVyXSBhcnJheSBvZiB0aGUgY29vcmRpbmF0ZSB0byB0cmFuc2Zvcm0uXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9ucyAgUHJvamVjdGlvbltdIEFycmF5IG9mIGRlc3RpbmF0aW9uIHByb2plY3Rpb24uXHJcbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgb2YgY29udmVydGVkIGNvb3JkaW5hdGVzLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvbkxhdENvbnZlcnNpb24oXHJcbiAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdLFxyXG4gIHByb2plY3Rpb25zOiBQcm9qZWN0aW9uW11cclxuKToge1xyXG4gIGNvZGU6IHN0cmluZztcclxuICBhbGlhczogc3RyaW5nO1xyXG4gIGNvb3JkOiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gIGlnbzJDb29yZEZvcm1hdDogc3RyaW5nO1xyXG59W10ge1xyXG4gIGNvbnN0IHJhd0Nvb3JkMzg1NyA9IG9scHJvai50cmFuc2Zvcm0obG9uTGF0LCAnRVBTRzo0MzI2JywgJ0VQU0c6Mzg1NycpO1xyXG4gIGNvbnN0IGNvbnZlcnRlZExvbkxhdCA9IFtcclxuICAgIHtcclxuICAgICAgY29kZTogJ0VQU0c6Mzg1NycsXHJcbiAgICAgIGFsaWFzOiAnV2ViIG1lcmNhdG9yJyxcclxuICAgICAgY29vcmQ6IHJhd0Nvb3JkMzg1NyxcclxuICAgICAgaWdvMkNvb3JkRm9ybWF0OiBgJHtyb3VuZENvb3JkVG8ocmF3Q29vcmQzODU3KS5qb2luKCcsICcpfSA7IDM4NTdgXHJcbiAgICB9XHJcbiAgXTtcclxuXHJcbiAgLy8gZGV0ZWN0IHRoZSBjdXJyZW50IHV0bSB6b25lLlxyXG4gIGNvbnN0IHV0bVpvbmUgPSB1dG1ab25lRnJvbUxvbkxhdChsb25MYXQpO1xyXG4gIGNvbnN0IGVwc2dVdG0gPSB1dG1ab25lIDwgMTAgPyBgRVBTRzozMjYwJHt1dG1ab25lfWAgOiBgRVBTRzozMjYke3V0bVpvbmV9YDtcclxuICBjb25zdCB1dG1OYW1lID0gYFVUTS0ke3V0bVpvbmV9YDtcclxuICBjb25zdCByYXdDb29yZFV0bSA9IG9scHJvai50cmFuc2Zvcm0obG9uTGF0LCAnRVBTRzo0MzI2JywgZXBzZ1V0bSk7XHJcbiAgY29udmVydGVkTG9uTGF0LnB1c2goe1xyXG4gICAgY29kZTogZXBzZ1V0bSxcclxuICAgIGFsaWFzOiAnVVRNJyxcclxuICAgIGNvb3JkOiByYXdDb29yZFV0bSxcclxuICAgIGlnbzJDb29yZEZvcm1hdDogYCR7dXRtTmFtZX0gJHtyb3VuZENvb3JkVG8ocmF3Q29vcmRVdG0pLmpvaW4oJywgJyl9YFxyXG4gIH0pO1xyXG5cclxuICAvLyBkZXRlY3QgdGhlIGN1cnJlbnQgbXRtIHpvbmUuXHJcbiAgY29uc3QgbXRtWm9uZSA9IG10bVpvbmVGcm9tTG9uTGF0KGxvbkxhdCk7XHJcbiAgaWYgKG10bVpvbmUpIHtcclxuICAgIGNvbnN0IGVwc2dNdG0gPVxyXG4gICAgICBtdG1ab25lIDwgMTAgPyBgRVBTRzozMjE4JHttdG1ab25lfWAgOiBgRVBTRzozMjEkezgwICsgbXRtWm9uZX1gO1xyXG4gICAgY29uc3QgbXRtTmFtZSA9IGBNVE0tJHttdG1ab25lfWA7XHJcbiAgICBjb25zdCByYXdDb29yZE10bSA9IG9scHJvai50cmFuc2Zvcm0obG9uTGF0LCAnRVBTRzo0MzI2JywgZXBzZ010bSk7XHJcbiAgICBjb252ZXJ0ZWRMb25MYXQucHVzaCh7XHJcbiAgICAgIGNvZGU6IGVwc2dNdG0sXHJcbiAgICAgIGFsaWFzOiAnTVRNJyxcclxuICAgICAgY29vcmQ6IHJhd0Nvb3JkTXRtLFxyXG4gICAgICBpZ28yQ29vcmRGb3JtYXQ6IGAke210bU5hbWV9ICR7cm91bmRDb29yZFRvKHJhd0Nvb3JkTXRtKS5qb2luKCcsICcpfWBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvamVjdGlvbnMuZm9yRWFjaChwcm9qZWN0aW9uID0+IHtcclxuICAgIGNvbnN0IHJhd0Nvb3JkID0gb2xwcm9qLnRyYW5zZm9ybShsb25MYXQsICdFUFNHOjQzMjYnLCBwcm9qZWN0aW9uLmNvZGUpO1xyXG4gICAgY29uc3QgbnVtZXJpY0Vwc2dDb2RlID0gcHJvamVjdGlvbi5jb2RlLnNwbGl0KCc6JylbMV07XHJcbiAgICBjb252ZXJ0ZWRMb25MYXQucHVzaCh7XHJcbiAgICAgIGNvZGU6IHByb2plY3Rpb24uY29kZSxcclxuICAgICAgYWxpYXM6IHByb2plY3Rpb24uYWxpYXMgfHwgcHJvamVjdGlvbi5jb2RlLFxyXG4gICAgICBjb29yZDogcmF3Q29vcmQsXHJcbiAgICAgIGlnbzJDb29yZEZvcm1hdDogYCR7cm91bmRDb29yZFRvKHJhd0Nvb3JkKS5qb2luKFxyXG4gICAgICAgICcsICdcclxuICAgICAgKX0gOyAke251bWVyaWNFcHNnQ29kZX1gXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGNvbnZlcnRlZExvbkxhdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVjdCB0aGUgY3VycmVudCB1dG0gem9uZSBvZiB0aGUgbG9uL2xhdCBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0gbG9uTGF0IFtudW1iZXIsIG51bWJlcl0gYXJyYXkgb2YgdGhlIGNvb3JkaW5hdGUgdG8gZGV0ZWN0IHRoZSBVVE0gem9uZS5cclxuICogQHJldHVybnMgbnVtYmVyIFRoZSBVVE0gem9uZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1dG1ab25lRnJvbUxvbkxhdChsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0pIHtcclxuICByZXR1cm4gTWF0aC5jZWlsKChsb25MYXRbMF0gKyAxODApIC8gNik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlY3QgdGhlIGN1cnJlbnQgbXRtIHpvbmUgb2YgdGhlIGxvbi9sYXQgY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIGxvbkxhdCBbbnVtYmVyLCBudW1iZXJdIGFycmF5IG9mIHRoZSBjb29yZGluYXRlIHRvIGRldGVjdCB0aGUgTVRNIHpvbmUuXHJcbiAqIEByZXR1cm5zIG51bWJlciBUaGUgTVRNIHpvbmUuIFVuZGVmaW5lZCBpZiBvdXRzaWRlIG9mIHRoZSBtdG0gYXBwbGljYXRpb24gem9uZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtdG1ab25lRnJvbUxvbkxhdChsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0pIHtcclxuICBjb25zdCBsb25nID0gbG9uTGF0WzBdO1xyXG4gIGxldCBtdG1ab25lO1xyXG4gIGlmIChsb25nIDwgLTUxICYmIGxvbmcgPiAtNTQpIHtcclxuICAgIG10bVpvbmUgPSAxO1xyXG4gIH1cclxuICBpZiAobG9uZyA8IC01NCAmJiBsb25nID4gLTU3KSB7XHJcbiAgICBtdG1ab25lID0gMjtcclxuICB9XHJcbiAgaWYgKGxvbmcgPCAtNTcgJiYgbG9uZyA+IC02MCkge1xyXG4gICAgbXRtWm9uZSA9IDM7XHJcbiAgfVxyXG4gIGlmIChsb25nIDwgLTYwICYmIGxvbmcgPiAtNjMpIHtcclxuICAgIG10bVpvbmUgPSA0O1xyXG4gIH1cclxuICBpZiAobG9uZyA8IC02MyAmJiBsb25nID4gLTY2KSB7XHJcbiAgICBtdG1ab25lID0gNTtcclxuICB9XHJcbiAgaWYgKGxvbmcgPCAtNjYgJiYgbG9uZyA+IC02OSkge1xyXG4gICAgbXRtWm9uZSA9IDY7XHJcbiAgfVxyXG4gIGlmIChsb25nIDwgLTY5ICYmIGxvbmcgPiAtNzIpIHtcclxuICAgIG10bVpvbmUgPSA3O1xyXG4gIH1cclxuICBpZiAobG9uZyA8IC03MiAmJiBsb25nID4gLTc1KSB7XHJcbiAgICBtdG1ab25lID0gODtcclxuICB9XHJcbiAgaWYgKGxvbmcgPCAtNzUgJiYgbG9uZyA+IC03OCkge1xyXG4gICAgbXRtWm9uZSA9IDk7XHJcbiAgfVxyXG4gIGlmIChsb25nIDwgLTc4ICYmIGxvbmcgPiAtODEpIHtcclxuICAgIG10bVpvbmUgPSAxMDtcclxuICB9XHJcbiAgcmV0dXJuIG10bVpvbmU7XHJcbn1cclxuIl19