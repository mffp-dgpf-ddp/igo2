/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @type {?} */
    let lonLat;
    /** @type {?} */
    let coordStr;
    /** @type {?} */
    let negativeLon;
    /** @type {?} */
    let degreesLon;
    /** @type {?} */
    let minutesLon;
    /** @type {?} */
    let secondsLon;
    /** @type {?} */
    let directionLon;
    /** @type {?} */
    let decimalLon;
    /** @type {?} */
    let negativeLat;
    /** @type {?} */
    let degreesLat;
    /** @type {?} */
    let minutesLat;
    /** @type {?} */
    let secondsLat;
    /** @type {?} */
    let directionLat;
    /** @type {?} */
    let decimalLat;
    /** @type {?} */
    let pattern;
    /** @type {?} */
    let timeZone;
    /** @type {?} */
    let radius;
    /** @type {?} */
    let conf;
    /** @type {?} */
    let lon;
    /** @type {?} */
    let lat;
    /** @type {?} */
    const projectionPattern = '(;[\\d]{4,6})';
    /** @type {?} */
    const toProjection = '4326';
    /** @type {?} */
    let projectionStr;
    /** @type {?} */
    const projectionRegex = new RegExp(projectionPattern, 'g');
    /** @type {?} */
    const lonlatCoord = '([-+])?([\\d]{1,3})([,.](\\d+))?';
    /** @type {?} */
    const lonLatPattern = `${lonlatCoord}[\\s,.]\\s*${lonlatCoord}`;
    /** @type {?} */
    const lonLatRegex = new RegExp(`^${lonLatPattern}$`, 'g');
    /** @type {?} */
    const dmsCoord = '([0-9]{1,2})[:|°]?\\s*([0-9]{1,2})?[:|\'|′|’]?\\s*([0-9]{1,2}(?:\.[0-9]+){0,1})?\\s*["|″|”]?\\s*';
    /** @type {?} */
    const dmsCoordPattern = `${dmsCoord}([N|S]),?\\s*${dmsCoord}([E|W])`;
    /** @type {?} */
    const dmsRegex = new RegExp(`^${dmsCoordPattern}`, 'gi');
    /** @type {?} */
    const patternUtmMtm = '(UTM|MTM)\-?(\\d{1,2})[\\s,.]*(\\d+[\\s.,]?\\d+)[\\s,.]+(\\d+[\\s.,]?\\d+)';
    /** @type {?} */
    const utmMtmRegex = new RegExp(`^${patternUtmMtm}`, 'gi');
    /** @type {?} */
    const ddCoord = '([-+])?(\\d{1,3})[,.](\\d+)';
    /** @type {?} */
    const patternDd = `${ddCoord}[,.]?\\s*${ddCoord}`;
    /** @type {?} */
    const ddRegex = new RegExp(`^${patternDd}`, 'g');
    /** @type {?} */
    const dmdCoord = '([-+])?(\\d{1,3})[\\s,.]{1}(\\d{1,2})[\\s,.]{1}(\\d{1,2})[.,]?(\\d{1,5})?';
    /** @type {?} */
    const patternDmd = `${dmdCoord}[,.]?\\s*${dmdCoord}`;
    /** @type {?} */
    const dmdRegex = new RegExp(`^${patternDmd}`, 'g');
    // tslint:disable:max-line-length
    /** @type {?} */
    const patternBELL = 'LAT\\s*[\\s:]*\\s*([-+])?(\\d{1,2})[\\s.,]?(\\d+)?[\\s.,]?\\s*(\\d{1,2}([.,]\\d+)?)?\\s*(N|S|E|W)?\\s*LONG\\s*[\\s:]*\\s*([-+])?(\\d{1,3})[\\s.,]?(\\d+)?[\\s.,]?\\s*(\\d{1,2}([.,]\\d+)?)?\\s*(N|S|E|W)?\\s*UNC\\s*[\\s:]?\\s*(\\d+)\\s*CONF\\s*[\\s:]?\\s*(\\d{1,3})';
    /** @type {?} */
    const bellRegex = new RegExp(`^${patternBELL}?`, 'gi');
    /** @type {?} */
    const mmCoord = '([-+]?\\d+)[,.]?(\\d+)?';
    /** @type {?} */
    const mmPattern = `${mmCoord}[\\s,.]\\s*${mmCoord}`;
    /** @type {?} */
    const mmRegex = new RegExp(`^${mmPattern}$`, 'g');
    str = str.toLocaleUpperCase();
    // Extract projection
    if (projectionRegex.test(str)) {
        [coordStr, projectionStr] = str.split(';');
    }
    else {
        coordStr = str;
    }
    if (lonLatRegex.test(coordStr)) {
        [,
            negativeLon,
            lon,
            ,
            decimalLon,
            negativeLat,
            lat,
            ,
            decimalLat] = coordStr.match(lonLatPattern);
        lon = parseFloat((negativeLon ? negativeLon : '') + lon + '.' + decimalLon);
        lat = parseFloat((negativeLat ? negativeLat : '') + lat + '.' + decimalLat);
    }
    else if (dmsRegex.test(coordStr)) {
        [,
            degreesLon,
            minutesLon,
            secondsLon,
            directionLon,
            degreesLat,
            minutesLat,
            secondsLat,
            directionLat] = coordStr.match(dmsCoordPattern);
        lon = convertDMSToDD(parseFloat(degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat(degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (utmMtmRegex.test(coordStr)) {
        [, pattern, timeZone, lon, lat] = coordStr.match(patternUtmMtm);
        /** @type {?} */
        const utm = '+proj=' + pattern + ' +zone=' + timeZone;
        /** @type {?} */
        const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
        [lon, lat] = proj4(utm.toLocaleLowerCase(), wgs84, [parseFloat(lon), parseFloat(lat)]);
    }
    else if (dmdRegex.test(coordStr)) {
        [,
            negativeLon,
            degreesLon,
            minutesLon,
            secondsLon,
            decimalLon,
            negativeLat,
            degreesLat,
            minutesLat,
            secondsLat,
            decimalLat] = coordStr.match(patternDmd);
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (ddRegex.test(coordStr)) {
        [,
            negativeLon,
            degreesLon,
            decimalLon,
            negativeLat,
            degreesLat,
            decimalLat] = coordStr.match(patternDd);
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (bellRegex.test(coordStr)) {
        [,
            negativeLat,
            degreesLat,
            minutesLat,
            secondsLat,
            ,
            directionLat,
            negativeLon,
            degreesLon,
            minutesLon,
            secondsLon,
            ,
            directionLon,
            radius,
            conf] = coordStr.match(patternBELL);
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
        [, lon, decimalLon, lat, decimalLat] = coordStr.match(mmPattern);
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
        const source = projectionStr ? 'EPSG:' + projectionStr : mapProjection;
        /** @type {?} */
        const dest = 'EPSG:' + toProjection;
        try {
            lonLat = olproj.transform(lonLat, source, dest);
        }
        catch (e) {
            return { lonLat: undefined, message: 'Projection ' + source + ' not supported', radius: undefined, conf: undefined };
        }
    }
    return { lonLat, message: '', radius: radius ? parseInt(radius, 10) : undefined, conf: conf ? parseInt(conf, 10) : undefined };
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
    let dd = degrees + (minutes / 60) + (seconds / 3600);
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
    const tolerance = 1 / 10000;
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
export function getResolutionFromScale(scale, dpi = 72) {
    return scale / (39.37 * dpi);
}
/**
 * Return the resolution from a scale denom
 * @param {?} resolution
 * @param {?=} unit
 * @param {?=} dpi
 * @return {?} Resolution
 */
export function getScaleFromResolution(resolution, unit = 'm', dpi = 72) {
    return resolution * olproj.METERS_PER_UNIT[unit] * 39.37 * dpi;
}
/**
 * Returns true if the CTRL key is pushed during an Ol MapBrowserPointerEvent
 * @param {?} event OL MapBrowserPointerEvent
 * @return {?} Whether the CTRL key is pushed
 */
export function ctrlKeyDown(event) {
    /** @type {?} */
    const originalEvent = event.originalEvent;
    return (!originalEvent.altKey &&
        (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUVsQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRzdCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7QUFZMUIsTUFBTSxVQUFVLGNBQWMsQ0FBQyxHQUFXLEVBQUUsYUFBcUI7O1FBSzNELE1BQXdCOztRQUN4QixRQUFnQjs7UUFDaEIsV0FBbUI7O1FBQ25CLFVBQWtCOztRQUNsQixVQUFrQjs7UUFDbEIsVUFBa0I7O1FBQ2xCLFlBQW9COztRQUNwQixVQUFrQjs7UUFDbEIsV0FBbUI7O1FBQ25CLFVBQWtCOztRQUNsQixVQUFrQjs7UUFDbEIsVUFBa0I7O1FBQ2xCLFlBQW9COztRQUNwQixVQUFrQjs7UUFDbEIsT0FBZTs7UUFDZixRQUFnQjs7UUFDaEIsTUFBYzs7UUFDZCxJQUFZOztRQUNaLEdBQVE7O1FBQ1IsR0FBUTs7VUFFTixpQkFBaUIsR0FBRyxlQUFlOztVQUNuQyxZQUFZLEdBQUcsTUFBTTs7UUFDdkIsYUFBcUI7O1VBQ25CLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUM7O1VBRXBELFdBQVcsR0FBSSxrQ0FBa0M7O1VBQ2pELGFBQWEsR0FBRyxHQUFHLFdBQVcsY0FBYyxXQUFXLEVBQUU7O1VBQ3pELFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLGFBQWEsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7VUFFbkQsUUFBUSxHQUFHLGtHQUFrRzs7VUFDN0csZUFBZSxHQUFHLEdBQUcsUUFBUSxnQkFBZ0IsUUFBUSxTQUFTOztVQUM5RCxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxlQUFlLEVBQUUsRUFBRSxJQUFJLENBQUM7O1VBRWxELGFBQWEsR0FBRyw0RUFBNEU7O1VBQzVGLFdBQVcsR0FBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLGFBQWEsRUFBRSxFQUFFLElBQUksQ0FBQzs7VUFFcEQsT0FBTyxHQUFHLDZCQUE2Qjs7VUFDdkMsU0FBUyxHQUFHLEdBQUcsT0FBTyxZQUFZLE9BQU8sRUFBRTs7VUFDM0MsT0FBTyxHQUFJLElBQUksTUFBTSxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDOztVQUUzQyxRQUFRLEdBQUcsMkVBQTJFOztVQUN0RixVQUFVLEdBQUcsR0FBRyxRQUFRLFlBQVksUUFBUSxFQUFFOztVQUM5QyxRQUFRLEdBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxVQUFVLEVBQUUsRUFBRSxHQUFHLENBQUM7OztVQUc3QyxXQUFXLEdBQUcsd1FBQXdROztVQUN0UixTQUFTLEdBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxXQUFXLEdBQUcsRUFBRSxJQUFJLENBQUM7O1VBRWpELE9BQU8sR0FBRyx5QkFBeUI7O1VBQ25DLFNBQVMsR0FBRyxHQUFHLE9BQU8sY0FBYyxPQUFPLEVBQUU7O1VBQzdDLE9BQU8sR0FBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFNBQVMsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUVsRCxHQUFHLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFOUIscUJBQXFCO0lBQ3JCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVDO1NBQU07UUFDTCxRQUFRLEdBQUcsR0FBRyxDQUFDO0tBQ2hCO0lBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRTlCLENBQUM7WUFDQSxXQUFXO1lBQ1gsR0FBRztZQUNILEFBREk7WUFFSixVQUFVO1lBQ1YsV0FBVztZQUNYLEdBQUc7WUFDSCxBQURJO1lBRUosVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU3QyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDNUUsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0tBRTdFO1NBQU0sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2hDLENBQUM7WUFDQSxVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7WUFDVixZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1lBQ1YsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVqRCxHQUFHLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNHLEdBQUcsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FFOUc7U0FBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7O2NBQzFELEdBQUcsR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLFNBQVMsR0FBRyxRQUFROztjQUMvQyxLQUFLLEdBQUcsa0RBQWtEO1FBQ2hFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUUxRjtTQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsQyxDQUFDO1lBQ0MsV0FBVztZQUNYLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7WUFDVixXQUFXO1lBQ1gsVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQyxHQUFHLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzlJLEdBQUcsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FFL0k7U0FBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0IsQ0FBQztZQUNDLFdBQVc7WUFDWCxVQUFVO1lBQ1YsVUFBVTtZQUNWLFdBQVc7WUFDWCxVQUFVO1lBQ1YsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUxQyxHQUFHLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzlJLEdBQUcsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FFako7U0FBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkMsQ0FBQztZQUNDLFdBQVc7WUFDWCxVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7WUFDVixBQURXO1lBRVgsWUFBWTtZQUNaLFdBQVc7WUFDWCxVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7WUFDVixBQURXO1lBRVgsWUFBWTtZQUNaLE1BQU07WUFDTixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRDLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLFlBQVksR0FBRyxHQUFHLENBQUM7U0FDcEI7UUFFRCxvQ0FBb0M7UUFDcEMsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1NBQ3BGO2FBQU07WUFDTCxHQUFHLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQzVHO1FBRUQsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1NBQ3BGO2FBQU07WUFDTCxHQUFHLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQzVHO0tBRUY7U0FBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakUsSUFBSSxVQUFVLEVBQUU7WUFDZCxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUM7U0FDMUM7UUFFRCxJQUFJLFVBQVUsRUFBRTtZQUNkLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQztTQUMxQztLQUVKO1NBQU07UUFDTCxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO0tBQzdFO0lBRUQsbURBQW1EO0lBQ25ELElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO1FBQ3RCLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUNiLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNaO2FBQU07WUFDTCxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDWjtLQUNGO0lBRUQsa0RBQWtEO0lBQ2xELElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtRQUNiLE1BQU0sR0FBRyxtQkFBQSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBb0IsQ0FBQztLQUN6QztTQUFNO1FBQ0wsTUFBTSxHQUFHLG1CQUFBLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFvQixDQUFDO0tBQ3pDO0lBRUQsdUZBQXVGO0lBQ3ZGLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxJQUFJLGFBQWEsS0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7O2NBRXRHLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWE7O2NBQ2hFLElBQUksR0FBRyxPQUFPLEdBQUcsWUFBWTtRQUVuQyxJQUFJO1lBQ0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGFBQWEsR0FBRyxNQUFNLEdBQUcsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7U0FDcEg7S0FDRjtJQUVELE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUM7QUFDL0gsQ0FBQzs7Ozs7Ozs7O0FBU0QsU0FBUyxjQUFjLENBQUMsT0FBZSxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsU0FBaUI7SUFDMUYsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLENBQUM7SUFDdkIsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLENBQUM7O1FBQ25CLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBRXBELElBQUksU0FBUyxLQUFLLEdBQUcsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO1FBQ3hDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztLQUNaLENBQUMsK0JBQStCO0lBQ2pDLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxNQUFvQixFQUFFLE1BQW9CO0lBQzNFLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ2hELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1VBRUssU0FBUyxHQUFHLENBQUMsR0FBRyxLQUFLO0lBQzNCLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSTtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNyRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0FBQzFGLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBSztJQUMvQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixJQUFJLEtBQUssR0FBRyxLQUFLLEVBQUU7UUFBRSxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7S0FBRTtJQUV6QyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFO1FBQUUsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQUU7SUFFekMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNyQixDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUU7SUFDcEUsT0FBTyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQzs7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBa0IsRUFBRSxPQUFlLEdBQUcsRUFBRSxNQUFjLEVBQUU7SUFDN0YsT0FBTyxVQUFVLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ2pFLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBK0I7O1VBQ25ELGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYTtJQUN6QyxPQUFPLENBQ0wsQ0FBQyxhQUFhLENBQUMsTUFBTTtRQUNyQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUNyRCxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQ3hCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyUG9pbnRlckV2ZW50IGFzIE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCB9IGZyb20gJ29sL01hcEJyb3dzZXJFdmVudCc7XHJcbmltcG9ydCB7IE1BQyB9IGZyb20gJ29sL2hhcyc7XHJcblxyXG5pbXBvcnQgeyBNYXBWaWV3U3RhdGUgfSBmcm9tICcuL21hcC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgcHJvajQgZnJvbSAncHJvajQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWV0aG9kIGV4dHJhY3RzIGEgY29vcmRpbmF0ZSB0dXBsZSBmcm9tIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0gc3RyIEFueSBzdHJpbmdcclxuICogQHBhcmFtIG1hcFByb2plY3Rpb24gc3RyaW5nIE1hcCBQcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIG9iamVjdDpcclxuICogICAgICAgICAgICAgbG9uTGF0OiBDb29yZGluYXRlLFxyXG4gKiAgICAgICAgICAgICBtZXNzYWdlOiBNZXNzYWdlIG9mIGVycm9yLFxyXG4gKiAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyBvZiB0aGUgY29uZmllbmNlIG9mIGNvb3JkaW5hdGUsXHJcbiAqICAgICAgICAgICAgIGNvbmY6IGNvbmZpZGVuY2Ugb2YgdGhlIGNvb3JkaW5hdGV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9Mb25MYXQoc3RyOiBzdHJpbmcsIG1hcFByb2plY3Rpb246IHN0cmluZyk6IHtsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiBudW1iZXIgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmY6IG51bWJlciB8IHVuZGVmaW5lZH0ge1xyXG5cclxuICBsZXQgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gIGxldCBjb29yZFN0cjogc3RyaW5nO1xyXG4gIGxldCBuZWdhdGl2ZUxvbjogc3RyaW5nO1xyXG4gIGxldCBkZWdyZWVzTG9uOiBzdHJpbmc7XHJcbiAgbGV0IG1pbnV0ZXNMb246IHN0cmluZztcclxuICBsZXQgc2Vjb25kc0xvbjogc3RyaW5nO1xyXG4gIGxldCBkaXJlY3Rpb25Mb246IHN0cmluZztcclxuICBsZXQgZGVjaW1hbExvbjogc3RyaW5nO1xyXG4gIGxldCBuZWdhdGl2ZUxhdDogc3RyaW5nO1xyXG4gIGxldCBkZWdyZWVzTGF0OiBzdHJpbmc7XHJcbiAgbGV0IG1pbnV0ZXNMYXQ6IHN0cmluZztcclxuICBsZXQgc2Vjb25kc0xhdDogc3RyaW5nO1xyXG4gIGxldCBkaXJlY3Rpb25MYXQ6IHN0cmluZztcclxuICBsZXQgZGVjaW1hbExhdDogc3RyaW5nO1xyXG4gIGxldCBwYXR0ZXJuOiBzdHJpbmc7XHJcbiAgbGV0IHRpbWVab25lOiBzdHJpbmc7XHJcbiAgbGV0IHJhZGl1czogc3RyaW5nO1xyXG4gIGxldCBjb25mOiBzdHJpbmc7XHJcbiAgbGV0IGxvbjogYW55O1xyXG4gIGxldCBsYXQ6IGFueTtcclxuXHJcbiAgY29uc3QgcHJvamVjdGlvblBhdHRlcm4gPSAnKDtbXFxcXGRdezQsNn0pJztcclxuICBjb25zdCB0b1Byb2plY3Rpb24gPSAnNDMyNic7XHJcbiAgbGV0IHByb2plY3Rpb25TdHI6IHN0cmluZztcclxuICBjb25zdCBwcm9qZWN0aW9uUmVnZXggPSBuZXcgUmVnRXhwKHByb2plY3Rpb25QYXR0ZXJuLCAnZycpO1xyXG5cclxuICBjb25zdCBsb25sYXRDb29yZCA9ICAnKFstK10pPyhbXFxcXGRdezEsM30pKFssLl0oXFxcXGQrKSk/JztcclxuICBjb25zdCBsb25MYXRQYXR0ZXJuID0gYCR7bG9ubGF0Q29vcmR9W1xcXFxzLC5dXFxcXHMqJHtsb25sYXRDb29yZH1gO1xyXG4gIGNvbnN0IGxvbkxhdFJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7bG9uTGF0UGF0dGVybn0kYCwgJ2cnKTtcclxuXHJcbiAgY29uc3QgZG1zQ29vcmQgPSAnKFswLTldezEsMn0pWzp8wrBdP1xcXFxzKihbMC05XXsxLDJ9KT9bOnxcXCd84oCyfOKAmV0/XFxcXHMqKFswLTldezEsMn0oPzpcXC5bMC05XSspezAsMX0pP1xcXFxzKltcInzigLN84oCdXT9cXFxccyonO1xyXG4gIGNvbnN0IGRtc0Nvb3JkUGF0dGVybiA9IGAke2Rtc0Nvb3JkfShbTnxTXSksP1xcXFxzKiR7ZG1zQ29vcmR9KFtFfFddKWA7XHJcbiAgY29uc3QgZG1zUmVnZXggPSBuZXcgUmVnRXhwKGBeJHtkbXNDb29yZFBhdHRlcm59YCwgJ2dpJyk7XHJcblxyXG4gIGNvbnN0IHBhdHRlcm5VdG1NdG0gPSAnKFVUTXxNVE0pXFwtPyhcXFxcZHsxLDJ9KVtcXFxccywuXSooXFxcXGQrW1xcXFxzLixdP1xcXFxkKylbXFxcXHMsLl0rKFxcXFxkK1tcXFxccy4sXT9cXFxcZCspJztcclxuICBjb25zdCB1dG1NdG1SZWdleCA9ICBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuVXRtTXRtfWAsICdnaScpO1xyXG5cclxuICBjb25zdCBkZENvb3JkID0gJyhbLStdKT8oXFxcXGR7MSwzfSlbLC5dKFxcXFxkKyknO1xyXG4gIGNvbnN0IHBhdHRlcm5EZCA9IGAke2RkQ29vcmR9WywuXT9cXFxccyoke2RkQ29vcmR9YDtcclxuICBjb25zdCBkZFJlZ2V4ID0gIG5ldyBSZWdFeHAoYF4ke3BhdHRlcm5EZH1gLCAnZycpO1xyXG5cclxuICBjb25zdCBkbWRDb29yZCA9ICcoWy0rXSk/KFxcXFxkezEsM30pW1xcXFxzLC5dezF9KFxcXFxkezEsMn0pW1xcXFxzLC5dezF9KFxcXFxkezEsMn0pWy4sXT8oXFxcXGR7MSw1fSk/JztcclxuICBjb25zdCBwYXR0ZXJuRG1kID0gYCR7ZG1kQ29vcmR9WywuXT9cXFxccyoke2RtZENvb3JkfWA7XHJcbiAgY29uc3QgZG1kUmVnZXggPSAgbmV3IFJlZ0V4cChgXiR7cGF0dGVybkRtZH1gLCAnZycpO1xyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGhcclxuICBjb25zdCBwYXR0ZXJuQkVMTCA9ICdMQVRcXFxccypbXFxcXHM6XSpcXFxccyooWy0rXSk/KFxcXFxkezEsMn0pW1xcXFxzLixdPyhcXFxcZCspP1tcXFxccy4sXT9cXFxccyooXFxcXGR7MSwyfShbLixdXFxcXGQrKT8pP1xcXFxzKihOfFN8RXxXKT9cXFxccypMT05HXFxcXHMqW1xcXFxzOl0qXFxcXHMqKFstK10pPyhcXFxcZHsxLDN9KVtcXFxccy4sXT8oXFxcXGQrKT9bXFxcXHMuLF0/XFxcXHMqKFxcXFxkezEsMn0oWy4sXVxcXFxkKyk/KT9cXFxccyooTnxTfEV8Vyk/XFxcXHMqVU5DXFxcXHMqW1xcXFxzOl0/XFxcXHMqKFxcXFxkKylcXFxccypDT05GXFxcXHMqW1xcXFxzOl0/XFxcXHMqKFxcXFxkezEsM30pJztcclxuICBjb25zdCBiZWxsUmVnZXggPSAgbmV3IFJlZ0V4cChgXiR7cGF0dGVybkJFTEx9P2AsICdnaScpO1xyXG5cclxuICBjb25zdCBtbUNvb3JkID0gJyhbLStdP1xcXFxkKylbLC5dPyhcXFxcZCspPyc7XHJcbiAgY29uc3QgbW1QYXR0ZXJuID0gYCR7bW1Db29yZH1bXFxcXHMsLl1cXFxccyoke21tQ29vcmR9YDtcclxuICBjb25zdCBtbVJlZ2V4ID0gIG5ldyBSZWdFeHAoYF4ke21tUGF0dGVybn0kYCwgJ2cnKTtcclxuXHJcbiAgc3RyID0gc3RyLnRvTG9jYWxlVXBwZXJDYXNlKCk7XHJcblxyXG4gIC8vIEV4dHJhY3QgcHJvamVjdGlvblxyXG4gIGlmIChwcm9qZWN0aW9uUmVnZXgudGVzdChzdHIpKSB7XHJcbiAgICBbY29vcmRTdHIsIHByb2plY3Rpb25TdHJdID0gc3RyLnNwbGl0KCc7Jyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvb3JkU3RyID0gc3RyO1xyXG4gIH1cclxuXHJcbiAgaWYgKGxvbkxhdFJlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcblxyXG4gICAgWyxcclxuICAgICBuZWdhdGl2ZUxvbixcclxuICAgICBsb24sXHJcbiAgICAgLFxyXG4gICAgIGRlY2ltYWxMb24sXHJcbiAgICAgbmVnYXRpdmVMYXQsXHJcbiAgICAgbGF0LFxyXG4gICAgICxcclxuICAgICBkZWNpbWFsTGF0XSA9IGNvb3JkU3RyLm1hdGNoKGxvbkxhdFBhdHRlcm4pO1xyXG5cclxuICAgIGxvbiA9IHBhcnNlRmxvYXQoKG5lZ2F0aXZlTG9uID8gbmVnYXRpdmVMb24gOiAnJykgKyBsb24gKyAnLicgKyBkZWNpbWFsTG9uKTtcclxuICAgIGxhdCA9IHBhcnNlRmxvYXQoKG5lZ2F0aXZlTGF0ID8gbmVnYXRpdmVMYXQgOiAnJykgKyBsYXQgKyAnLicgKyBkZWNpbWFsTGF0KTtcclxuXHJcbiAgfSBlbHNlIGlmIChkbXNSZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgICBbLFxyXG4gICAgICAgZGVncmVlc0xvbixcclxuICAgICAgIG1pbnV0ZXNMb24sXHJcbiAgICAgICBzZWNvbmRzTG9uLFxyXG4gICAgICAgZGlyZWN0aW9uTG9uLFxyXG4gICAgICAgZGVncmVlc0xhdCxcclxuICAgICAgIG1pbnV0ZXNMYXQsXHJcbiAgICAgICBzZWNvbmRzTGF0LFxyXG4gICAgICAgZGlyZWN0aW9uTGF0XSA9IGNvb3JkU3RyLm1hdGNoKGRtc0Nvb3JkUGF0dGVybik7XHJcblxyXG4gICAgICBsb24gPSBjb252ZXJ0RE1TVG9ERChwYXJzZUZsb2F0KGRlZ3JlZXNMb24pLCBwYXJzZUZsb2F0KG1pbnV0ZXNMb24pLCBwYXJzZUZsb2F0KHNlY29uZHNMb24pLCBkaXJlY3Rpb25Mb24pO1xyXG4gICAgICBsYXQgPSBjb252ZXJ0RE1TVG9ERChwYXJzZUZsb2F0KGRlZ3JlZXNMYXQpLCBwYXJzZUZsb2F0KG1pbnV0ZXNMYXQpLCBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLCBkaXJlY3Rpb25MYXQpO1xyXG5cclxuICB9IGVsc2UgaWYgKHV0bU10bVJlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcbiAgICAgIFssIHBhdHRlcm4sIHRpbWVab25lLCBsb24sIGxhdF0gPSBjb29yZFN0ci5tYXRjaChwYXR0ZXJuVXRtTXRtKTtcclxuICAgICAgY29uc3QgdXRtID0gJytwcm9qPScgKyBwYXR0ZXJuICsgJyArem9uZT0nICsgdGltZVpvbmU7XHJcbiAgICAgIGNvbnN0IHdnczg0ID0gJytwcm9qPWxvbmdsYXQgK2VsbHBzPVdHUzg0ICtkYXR1bT1XR1M4NCArbm9fZGVmcyc7XHJcbiAgICAgIFtsb24sIGxhdF0gPSBwcm9qNCh1dG0udG9Mb2NhbGVMb3dlckNhc2UoKSwgd2dzODQsIFtwYXJzZUZsb2F0KGxvbiksIHBhcnNlRmxvYXQobGF0KV0pO1xyXG5cclxuICB9IGVsc2UgaWYgKGRtZFJlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcbiAgICBbLFxyXG4gICAgICBuZWdhdGl2ZUxvbixcclxuICAgICAgZGVncmVlc0xvbixcclxuICAgICAgbWludXRlc0xvbixcclxuICAgICAgc2Vjb25kc0xvbixcclxuICAgICAgZGVjaW1hbExvbixcclxuICAgICAgbmVnYXRpdmVMYXQsXHJcbiAgICAgIGRlZ3JlZXNMYXQsXHJcbiAgICAgIG1pbnV0ZXNMYXQsXHJcbiAgICAgIHNlY29uZHNMYXQsXHJcbiAgICAgIGRlY2ltYWxMYXRdID0gY29vcmRTdHIubWF0Y2gocGF0dGVybkRtZCk7XHJcblxyXG4gICAgbG9uID0gY29udmVydERNU1RvREQocGFyc2VGbG9hdCgobmVnYXRpdmVMb24gPyBuZWdhdGl2ZUxvbiA6ICcnKSArIGRlZ3JlZXNMb24pLCBwYXJzZUZsb2F0KG1pbnV0ZXNMb24pLCBwYXJzZUZsb2F0KHNlY29uZHNMb24pLCBkaXJlY3Rpb25Mb24pO1xyXG4gICAgbGF0ID0gY29udmVydERNU1RvREQocGFyc2VGbG9hdCgobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGRlZ3JlZXNMYXQpLCBwYXJzZUZsb2F0KG1pbnV0ZXNMYXQpLCBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLCBkaXJlY3Rpb25MYXQpO1xyXG5cclxuICB9IGVsc2UgaWYgKGRkUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgICAgWyxcclxuICAgICAgICBuZWdhdGl2ZUxvbixcclxuICAgICAgICBkZWdyZWVzTG9uLFxyXG4gICAgICAgIGRlY2ltYWxMb24sXHJcbiAgICAgICAgbmVnYXRpdmVMYXQsXHJcbiAgICAgICAgZGVncmVlc0xhdCxcclxuICAgICAgICBkZWNpbWFsTGF0XSA9IGNvb3JkU3RyLm1hdGNoKHBhdHRlcm5EZCk7XHJcblxyXG4gICAgICBsb24gPSBjb252ZXJ0RE1TVG9ERChwYXJzZUZsb2F0KChuZWdhdGl2ZUxvbiA/IG5lZ2F0aXZlTG9uIDogJycpICsgZGVncmVlc0xvbiksIHBhcnNlRmxvYXQobWludXRlc0xvbiksIHBhcnNlRmxvYXQoc2Vjb25kc0xvbiksIGRpcmVjdGlvbkxvbik7XHJcbiAgICAgIGxhdCA9IGNvbnZlcnRETVNUb0REKHBhcnNlRmxvYXQoKG5lZ2F0aXZlTGF0ID8gbmVnYXRpdmVMYXQgOiAnJykgKyBkZWdyZWVzTGF0KSwgcGFyc2VGbG9hdChtaW51dGVzTGF0KSwgcGFyc2VGbG9hdChzZWNvbmRzTGF0KSwgZGlyZWN0aW9uTGF0KTtcclxuXHJcbiAgfSBlbHNlIGlmIChiZWxsUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIFssXHJcbiAgICAgIG5lZ2F0aXZlTGF0LFxyXG4gICAgICBkZWdyZWVzTGF0LFxyXG4gICAgICBtaW51dGVzTGF0LFxyXG4gICAgICBzZWNvbmRzTGF0LFxyXG4gICAgICAsXHJcbiAgICAgIGRpcmVjdGlvbkxhdCxcclxuICAgICAgbmVnYXRpdmVMb24sXHJcbiAgICAgIGRlZ3JlZXNMb24sXHJcbiAgICAgIG1pbnV0ZXNMb24sXHJcbiAgICAgIHNlY29uZHNMb24sXHJcbiAgICAgICxcclxuICAgICAgZGlyZWN0aW9uTG9uLFxyXG4gICAgICByYWRpdXMsXHJcbiAgICAgIGNvbmZdID0gY29vcmRTdHIubWF0Y2gocGF0dGVybkJFTEwpO1xyXG5cclxuICAgIC8vIFNldCBkZWZhdWx0IHZhbHVlIGZvciBOb3J0aCBBbWVyaWNhXHJcbiAgICBpZiAoIWRpcmVjdGlvbkxvbikge1xyXG4gICAgICBkaXJlY3Rpb25Mb24gPSAnVyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgcmVhbCBtaW51dGVzIG9yIGRlY2ltYWxzXHJcbiAgICBpZiAobWludXRlc0xvbiAmJiBtaW51dGVzTG9uLmxlbmd0aCA+IDIpIHtcclxuICAgICAgbG9uID0gcGFyc2VGbG9hdCgobmVnYXRpdmVMb24gPyBuZWdhdGl2ZUxvbiA6ICcnKSArIGRlZ3JlZXNMb24gKyAnLicgKyBtaW51dGVzTG9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvbiA9IGNvbnZlcnRETVNUb0REKHBhcnNlRmxvYXQoZGVncmVlc0xvbiksIHBhcnNlRmxvYXQobWludXRlc0xvbiksIHBhcnNlRmxvYXQoc2Vjb25kc0xvbiksIGRpcmVjdGlvbkxvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1pbnV0ZXNMYXQgJiYgbWludXRlc0xhdC5sZW5ndGggPiAyKSB7XHJcbiAgICAgIGxhdCA9IHBhcnNlRmxvYXQoKG5lZ2F0aXZlTGF0ID8gbmVnYXRpdmVMYXQgOiAnJykgKyBkZWdyZWVzTGF0ICsgJy4nICsgbWludXRlc0xhdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXQgPSBjb252ZXJ0RE1TVG9ERChwYXJzZUZsb2F0KGRlZ3JlZXNMYXQpLCBwYXJzZUZsb2F0KG1pbnV0ZXNMYXQpLCBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLCBkaXJlY3Rpb25MYXQpO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2UgaWYgKG1tUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgICAgWywgbG9uLCBkZWNpbWFsTG9uLCBsYXQsIGRlY2ltYWxMYXRdID0gY29vcmRTdHIubWF0Y2gobW1QYXR0ZXJuKTtcclxuXHJcbiAgICAgIGlmIChkZWNpbWFsTG9uKSB7XHJcbiAgICAgICAgbG9uID0gcGFyc2VGbG9hdChsb24gKyAnLicgKyBkZWNpbWFsTG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRlY2ltYWxMYXQpIHtcclxuICAgICAgICBsYXQgPSBwYXJzZUZsb2F0KGxhdCArICcuJyArIGRlY2ltYWxMYXQpO1xyXG4gICAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4ge2xvbkxhdDogdW5kZWZpbmVkLCBtZXNzYWdlOiAnJywgcmFkaXVzOiB1bmRlZmluZWQsIGNvbmY6IHVuZGVmaW5lZH07XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgYSBuZWdhdGl2ZSBjb29yZGluYXRlIGZvciBOb3J0aCBBbWVyaWNhIHpvbmVcclxuICBpZiAobG9uID4gMCAmJiBsYXQgPiAwKSB7XHJcbiAgICBpZiAobG9uID4gbGF0KSB7XHJcbiAgICAgIGxvbiA9IC1sb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXQgPSAtbGF0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gUmV2ZXJzZSBjb29yZGluYXRlIHRvIHJlc3BlY3QgbG9uTGF0IGNvbnZlbnRpb25cclxuICBpZiAobG9uIDwgbGF0KSB7XHJcbiAgICBsb25MYXQgPSBbbG9uLCBsYXRdIGFzIFtudW1iZXIsIG51bWJlcl07XHJcbiAgfSBlbHNlIHtcclxuICAgIGxvbkxhdCA9IFtsYXQsIGxvbl0gYXMgW251bWJlciwgbnVtYmVyXTtcclxuICB9XHJcblxyXG4gIC8vIFJlcHJvamVjdCB0aGUgY29vcmRpbmF0ZSBpZiBwcm9qZWN0aW9uIHBhcmFtZXRlciBoYXZlIGJlZW4gc2V0IGFuZCBjb29yZCBpcyBub3QgNDMyNlxyXG4gIGlmICgocHJvamVjdGlvblN0ciAhPT0gdW5kZWZpbmVkICYmIHByb2plY3Rpb25TdHIgIT09IHRvUHJvamVjdGlvbikgfHwgKGxvbkxhdFswXSA+IDE4MCB8fCBsb25MYXRbMF0gPCAtMTgwKSkge1xyXG5cclxuICAgIGNvbnN0IHNvdXJjZSA9IHByb2plY3Rpb25TdHIgPyAnRVBTRzonICsgcHJvamVjdGlvblN0ciA6IG1hcFByb2plY3Rpb247XHJcbiAgICBjb25zdCBkZXN0ID0gJ0VQU0c6JyArIHRvUHJvamVjdGlvbjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBsb25MYXQgPSBvbHByb2oudHJhbnNmb3JtKGxvbkxhdCwgc291cmNlLCBkZXN0KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmV0dXJuIHtsb25MYXQ6IHVuZGVmaW5lZCwgbWVzc2FnZTogJ1Byb2plY3Rpb24gJyArIHNvdXJjZSArICcgbm90IHN1cHBvcnRlZCcsIHJhZGl1czogdW5kZWZpbmVkLCBjb25mOiB1bmRlZmluZWR9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtsb25MYXQsIG1lc3NhZ2U6ICcnLCByYWRpdXM6IHJhZGl1cyA/IHBhcnNlSW50KHJhZGl1cywgMTApIDogdW5kZWZpbmVkLCBjb25mOiBjb25mID8gcGFyc2VJbnQoY29uZiwgMTApIDogdW5kZWZpbmVkfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgZGVncmVlcyBtaW51dGVzIHNlY29uZHMgdG8gZGRcclxuICogQHBhcmFtIGRlZ3JlZXMgRGVncmVlc1xyXG4gKiBAcGFyYW0gbWludXRlcyBNaW51dGVzXHJcbiAqIEBwYXJhbSBzZWNvbmRzIFNlY29uZHNcclxuICogQHBhcmFtIGRpcmVjdGlvbiBEaXJlY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGNvbnZlcnRETVNUb0REKGRlZ3JlZXM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKSB7XHJcbiAgbWludXRlcyA9IG1pbnV0ZXMgfHwgMDtcclxuICBzZWNvbmRzID0gc2Vjb25kcyB8fCAwO1xyXG4gIGxldCBkZCA9IGRlZ3JlZXMgKyAobWludXRlcyAvIDYwKSArIChzZWNvbmRzIC8gMzYwMCk7XHJcblxyXG4gIGlmIChkaXJlY3Rpb24gPT09ICdTJyB8fCBkaXJlY3Rpb24gPT09ICdXJykge1xyXG4gICAgICBkZCA9IC1kZDtcclxuICB9IC8vIERvbid0IGRvIGFueXRoaW5nIGZvciBOIG9yIEVcclxuICByZXR1cm4gZGQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBvZiB0d28gdmlldyBzdGF0ZXMgYXJlIGVxdWFsLlxyXG4gKiBAcGFyYW0gc3RhdGUxIFZpZXcgc3RhdGVcclxuICogQHBhcmFtIHN0YXRlMiBWaWV3IHN0YXRlXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgc3RhdGVzIGFyZSBlcXVhbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHZpZXdTdGF0ZXNBcmVFcXVhbChzdGF0ZTE6IE1hcFZpZXdTdGF0ZSwgc3RhdGUyOiBNYXBWaWV3U3RhdGUpOiBib29sZWFuIHtcclxuICBpZiAoc3RhdGUxID09PSB1bmRlZmluZWQgfHwgc3RhdGUyID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvbGVyYW5jZSA9IDEgLyAxMDAwMDtcclxuICByZXR1cm4gc3RhdGUxLnpvb20gPT09IHN0YXRlMi56b29tICYmXHJcbiAgICBNYXRoLnRydW5jKHN0YXRlMS5jZW50ZXJbMF0gLyB0b2xlcmFuY2UpID09PSBNYXRoLnRydW5jKHN0YXRlMi5jZW50ZXJbMF0gLyB0b2xlcmFuY2UpICYmXHJcbiAgICBNYXRoLnRydW5jKHN0YXRlMS5jZW50ZXJbMV0gLyB0b2xlcmFuY2UpID09PSBNYXRoLnRydW5jKHN0YXRlMi5jZW50ZXJbMV0gLyB0b2xlcmFuY2UpO1xyXG59XHJcblxyXG4vKipcclxuICogRm9ybWF0IHRoZSBzY2FsZSB0byBhIGh1bWFuIHJlYWRhYmxlIHRleHRcclxuICogQHBhcmFtIFNjYWxlIG9mIHRoZSBtYXBcclxuICogQHJldHVybnMgSHVtYW4gcmVhZGFibGUgc2NhbGUgdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFNjYWxlKHNjYWxlKSB7XHJcbiAgc2NhbGUgPSBNYXRoLnJvdW5kKHNjYWxlKTtcclxuICBpZiAoc2NhbGUgPCAxMDAwMCkgeyByZXR1cm4gc2NhbGUgKyAnJzsgfVxyXG5cclxuICBzY2FsZSA9IE1hdGgucm91bmQoc2NhbGUgLyAxMDAwKTtcclxuICBpZiAoc2NhbGUgPCAxMDAwKSB7IHJldHVybiBzY2FsZSArICdLJzsgfVxyXG5cclxuICBzY2FsZSA9IE1hdGgucm91bmQoc2NhbGUgLyAxMDAwKTtcclxuICByZXR1cm4gc2NhbGUgKyAnTSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHJlc29sdXRpb24gZnJvbSBhIHNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBzY2FsZSBTY2FsZSBkZW5vbVxyXG4gKiBAcGFyYW0gZHBpIERQSVxyXG4gKiBAcmV0dXJucyBSZXNvbHV0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShzY2FsZTogbnVtYmVyLCBkcGk6IG51bWJlciA9IDcyKTogbnVtYmVyIHtcclxuICByZXR1cm4gc2NhbGUgLyAoMzkuMzcgKiBkcGkpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSByZXNvbHV0aW9uIGZyb20gYSBzY2FsZSBkZW5vbVxyXG4gKiBAcGFyYW0gU2NhbGUgZGVub21cclxuICogQHJldHVybnMgUmVzb2x1dGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlRnJvbVJlc29sdXRpb24ocmVzb2x1dGlvbjogbnVtYmVyLCB1bml0OiBzdHJpbmcgPSAnbScsIGRwaTogbnVtYmVyID0gNzIpOiBudW1iZXIge1xyXG4gIHJldHVybiByZXNvbHV0aW9uICogb2xwcm9qLk1FVEVSU19QRVJfVU5JVFt1bml0XSAqIDM5LjM3ICogZHBpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBDVFJMIGtleSBpcyBwdXNoZWQgZHVyaW5nIGFuIE9sIE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICogQHBhcmFtIGV2ZW50IE9MIE1hcEJyb3dzZXJQb2ludGVyRXZlbnRcclxuICogQHJldHVybnMgV2hldGhlciB0aGUgQ1RSTCBrZXkgaXMgcHVzaGVkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3RybEtleURvd24oZXZlbnQ6IE9sTWFwQnJvd3NlclBvaW50ZXJFdmVudCk6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50O1xyXG4gIHJldHVybiAoXHJcbiAgICAhb3JpZ2luYWxFdmVudC5hbHRLZXkgJiZcclxuICAgIChNQUMgPyBvcmlnaW5hbEV2ZW50Lm1ldGFLZXkgOiBvcmlnaW5hbEV2ZW50LmN0cmxLZXkpICYmXHJcbiAgICAhb3JpZ2luYWxFdmVudC5zaGlmdEtleVxyXG4gICk7XHJcbn1cclxuIl19