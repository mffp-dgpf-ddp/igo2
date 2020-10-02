/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export function stringToLonLat(str, mapProjection, opts = {}) {
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
    let zone;
    /** @type {?} */
    let radius;
    /** @type {?} */
    let conf;
    /** @type {?} */
    let lon;
    /** @type {?} */
    let lat;
    /** @type {?} */
    const projectionPattern = '(\\s*;\\s*[\\d]{4,6})';
    /** @type {?} */
    const toProjection = '4326';
    /** @type {?} */
    let projectionStr;
    /** @type {?} */
    const projectionRegex = new RegExp(projectionPattern, 'g');
    /** @type {?} */
    const lonlatCoord = '([-+])?([\\d]{1,3})([,.](\\d+))?';
    /** @type {?} */
    const lonLatPattern = `${lonlatCoord}[\\s,]+${lonlatCoord}`;
    /** @type {?} */
    const lonLatRegex = new RegExp(`^${lonLatPattern}$`, 'g');
    /** @type {?} */
    const dmsCoord = '([0-9]{1,2})[:|°]?\\s*([0-9]{1,2})?[:|\'|′|’]?\\s*([0-9]{1,2}(?:.[0-9]+){0,1})?\\s*["|″|”]?\\s*';
    /** @type {?} */
    const dmsCoordPattern = `${dmsCoord}([N|S|E|W|O]),?\\s*${dmsCoord}([N|S|E|W|O])`;
    /** @type {?} */
    const dmsRegex = new RegExp(`^${dmsCoordPattern}`, 'gi');
    /** @type {?} */
    const patternUtm = '(UTM)-?(\\d{1,2})[\\s,]*(\\d+[.,]?\\d+)[\\s,]+(\\d+[.,]?\\d+)';
    /** @type {?} */
    const utmRegex = new RegExp(`^${patternUtm}`, 'gi');
    /** @type {?} */
    const patternMtm = '(MTM)-?(\\d{1,2})[\\s,]*(\\d+[.,]?\\d+)[\\s,]+(\\d+[.,]?\\d+)';
    /** @type {?} */
    const mtmRegex = new RegExp(`^${patternMtm}`, 'gi');
    /** @type {?} */
    const ddCoord = '([-+])?(\\d{1,3})[,.](\\d+)';
    /** @type {?} */
    const patternDd = `${ddCoord}\\s*[,]?\\s*${ddCoord}`;
    /** @type {?} */
    const ddRegex = new RegExp(`^${patternDd}`, 'g');
    /** @type {?} */
    const dmdCoord = '([-+])?(\\d{1,3})[\\s,.]{1}(\\d{1,2})[\\s,.]{1}(\\d{1,2})[.,]?(\\d{1,5})?';
    /** @type {?} */
    const patternDmd = `${dmdCoord}\\s*[,.]?\\s*${dmdCoord}`;
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
    const mmPattern = `${mmCoord}[\\s,]+${mmCoord}`;
    /** @type {?} */
    const mmRegex = new RegExp(`^${mmPattern}$`, 'g');
    /** @type {?} */
    let isXYCoords = false;
    str = str.toLocaleUpperCase().trim();
    // Extract projection
    if (projectionRegex.test(str)) {
        [coordStr, projectionStr] = str.split(';').map((/**
         * @param {?} s
         * @return {?}
         */
        s => s.trim()));
    }
    else {
        coordStr = str;
    }
    if (lonLatRegex.test(coordStr)) {
        [
            ,
            negativeLon,
            lon,
            ,
            decimalLon,
            negativeLat,
            lat,
            ,
            decimalLat
        ] = coordStr.match(lonLatPattern);
        lon = parseFloat((negativeLon ? negativeLon : '') + lon + '.' + decimalLon);
        lat = parseFloat((negativeLat ? negativeLat : '') + lat + '.' + decimalLat);
    }
    else if (dmsRegex.test(coordStr)) {
        [
            ,
            degreesLon,
            minutesLon,
            secondsLon,
            directionLon,
            degreesLat,
            minutesLat,
            secondsLat,
            directionLat
        ] = coordStr.match(dmsCoordPattern);
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
        [, , zone, lon, lat] = coordStr.match(patternUtm);
        /** @type {?} */
        const epsgUtm = Number(zone) < 10 ? `EPSG:3260${zone}` : `EPSG:326${zone}`;
        [lon, lat] = olproj.transform([parseFloat(lon), parseFloat(lat)], epsgUtm, 'EPSG:4326');
    }
    else if (mtmRegex.test(coordStr)) {
        isXYCoords = true;
        [, , zone, lon, lat] = coordStr.match(patternMtm);
        /** @type {?} */
        const epsgMtm = Number(zone) < 10 ? `EPSG:3218${zone}` : `EPSG:321${80 + Number(zone)}`;
        [lon, lat] = olproj.transform([parseFloat(lon), parseFloat(lat)], epsgMtm, 'EPSG:4326');
    }
    else if (dmdRegex.test(coordStr)) {
        [
            ,
            negativeLon,
            degreesLon,
            minutesLon,
            secondsLon,
            decimalLon,
            negativeLat,
            degreesLat,
            minutesLat,
            secondsLat,
            decimalLat
        ] = coordStr.match(patternDmd);
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (ddRegex.test(coordStr)) {
        [
            ,
            negativeLon,
            degreesLon,
            decimalLon,
            negativeLat,
            degreesLat,
            decimalLat
        ] = coordStr.match(patternDd);
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (bellRegex.test(coordStr)) {
        [
            ,
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
            conf
        ] = coordStr.match(patternBELL);
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
        [, lon, decimalLon, lat, decimalLat] = coordStr.match(mmPattern);
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
        const source = projectionStr ? 'EPSG:' + projectionStr : mapProjection;
        /** @type {?} */
        const dest = 'EPSG:' + toProjection;
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
        lonLat,
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
    let dd = degrees + minutes / 60 + seconds / 3600;
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
export function getResolutionFromScale(scale, dpi = 96) {
    /** @type {?} */
    const inchesPerMeter = 39.3701;
    return scale / (inchesPerMeter * dpi);
}
/**
 * Return the resolution from a scale denom
 * @param {?} resolution
 * @param {?=} unit
 * @param {?=} dpi
 * @return {?} Resolution
 */
export function getScaleFromResolution(resolution, unit = 'm', dpi = 96) {
    /** @type {?} */
    const inchesPerMeter = 39.3701;
    return resolution * olproj.METERS_PER_UNIT[unit] * inchesPerMeter * dpi;
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
/**
 * @param {?} coord
 * @param {?=} decimal
 * @return {?}
 */
export function roundCoordTo(coord, decimal = 3) {
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
    const rawCoord3857 = olproj.transform(lonLat, 'EPSG:4326', 'EPSG:3857');
    /** @type {?} */
    const convertedLonLat = [
        {
            code: 'EPSG:3857',
            alias: 'Web mercator',
            coord: rawCoord3857,
            igo2CoordFormat: `${roundCoordTo(rawCoord3857).join(', ')} ; 3857`
        }
    ];
    // detect the current utm zone.
    /** @type {?} */
    const utmZone = utmZoneFromLonLat(lonLat);
    /** @type {?} */
    const epsgUtm = utmZone < 10 ? `EPSG:3260${utmZone}` : `EPSG:326${utmZone}`;
    /** @type {?} */
    const utmName = `UTM-${utmZone}`;
    /** @type {?} */
    const rawCoordUtm = olproj.transform(lonLat, 'EPSG:4326', epsgUtm);
    convertedLonLat.push({
        code: epsgUtm,
        alias: 'UTM',
        coord: rawCoordUtm,
        igo2CoordFormat: `${utmName} ${roundCoordTo(rawCoordUtm).join(', ')}`
    });
    // detect the current mtm zone.
    /** @type {?} */
    const mtmZone = mtmZoneFromLonLat(lonLat);
    if (mtmZone) {
        /** @type {?} */
        const epsgMtm = mtmZone < 10 ? `EPSG:3218${mtmZone}` : `EPSG:321${80 + mtmZone}`;
        /** @type {?} */
        const mtmName = `MTM-${mtmZone}`;
        /** @type {?} */
        const rawCoordMtm = olproj.transform(lonLat, 'EPSG:4326', epsgMtm);
        convertedLonLat.push({
            code: epsgMtm,
            alias: 'MTM',
            coord: rawCoordMtm,
            igo2CoordFormat: `${mtmName} ${roundCoordTo(rawCoordMtm).join(', ')}`
        });
    }
    projections.forEach((/**
     * @param {?} projection
     * @return {?}
     */
    projection => {
        /** @type {?} */
        const rawCoord = olproj.transform(lonLat, 'EPSG:4326', projection.code);
        /** @type {?} */
        const numericEpsgCode = projection.code.split(':')[1];
        convertedLonLat.push({
            code: projection.code,
            alias: projection.alias || projection.code,
            coord: rawCoord,
            igo2CoordFormat: `${roundCoordTo(rawCoord).join(', ')} ; ${numericEpsgCode}`
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
    const long = lonLat[0];
    /** @type {?} */
    let mtmZone;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUVsQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7QUFpQjdCLE1BQU0sVUFBVSxjQUFjLENBQzVCLEdBQVcsRUFDWCxhQUFxQixFQUNyQixPQUE4QixFQUFFOztRQU81QixNQUF3Qjs7UUFDeEIsUUFBZ0I7O1FBQ2hCLFdBQW1COztRQUNuQixVQUFrQjs7UUFDbEIsVUFBa0I7O1FBQ2xCLFVBQWtCOztRQUNsQixZQUFvQjs7UUFDcEIsVUFBa0I7O1FBQ2xCLFdBQW1COztRQUNuQixVQUFrQjs7UUFDbEIsVUFBa0I7O1FBQ2xCLFVBQWtCOztRQUNsQixZQUFvQjs7UUFDcEIsVUFBa0I7O1FBQ2xCLElBQVk7O1FBQ1osTUFBYzs7UUFDZCxJQUFZOztRQUNaLEdBQVE7O1FBQ1IsR0FBUTs7VUFFTixpQkFBaUIsR0FBRyx1QkFBdUI7O1VBQzNDLFlBQVksR0FBRyxNQUFNOztRQUN2QixhQUFxQjs7VUFDbkIsZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQzs7VUFFcEQsV0FBVyxHQUFHLGtDQUFrQzs7VUFDaEQsYUFBYSxHQUFHLEdBQUcsV0FBVyxVQUFVLFdBQVcsRUFBRTs7VUFDckQsV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksYUFBYSxHQUFHLEVBQUUsR0FBRyxDQUFDOztVQUVuRCxRQUFRLEdBQ1osaUdBQWlHOztVQUM3RixlQUFlLEdBQUcsR0FBRyxRQUFRLHNCQUFzQixRQUFRLGVBQWU7O1VBQzFFLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLGVBQWUsRUFBRSxFQUFFLElBQUksQ0FBQzs7VUFFbEQs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RUFBRTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxHQUFHLENBQUMsQ0FBQztLQUNiO0lBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDYjtJQUNELElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxHQUFHLENBQUMsQ0FBQztLQUNiO0lBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDYjtJQUNELElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxHQUFHLENBQUMsQ0FBQztLQUNiO0lBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJQb2ludGVyRXZlbnQgYXMgT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50IH0gZnJvbSAnb2wvTWFwQnJvd3NlckV2ZW50JztcclxuaW1wb3J0IHsgTUFDIH0gZnJvbSAnb2wvaGFzJztcclxuXHJcbmltcG9ydCB7IE1hcFZpZXdTdGF0ZSB9IGZyb20gJy4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCBwcm9qNCBmcm9tICdwcm9qNCc7XHJcbmltcG9ydCB7IFByb2plY3Rpb24gfSBmcm9tICcuL3Byb2plY3Rpb24uaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBtZXRob2QgZXh0cmFjdHMgYSBjb29yZGluYXRlIHR1cGxlIGZyb20gYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSBzdHIgQW55IHN0cmluZ1xyXG4gKiBAcGFyYW0gbWFwUHJvamVjdGlvbiBzdHJpbmcgTWFwIFByb2plY3Rpb25cclxuICogQHBhcmFtIG9wdHMuZm9yY2VOQSBib29sZWFuIEZvcmNlIE5vcnRoIEFtZXJpY2EgWm9uZVxyXG4gKiBAcmV0dXJucyBvYmplY3Q6XHJcbiAqICAgICAgICAgICAgIGxvbkxhdDogQ29vcmRpbmF0ZSxcclxuICogICAgICAgICAgICAgbWVzc2FnZTogTWVzc2FnZSBvZiBlcnJvcixcclxuICogICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMgb2YgdGhlIGNvbmZpZW5jZSBvZiBjb29yZGluYXRlLFxyXG4gKiAgICAgICAgICAgICBjb25mOiBjb25maWRlbmNlIG9mIHRoZSBjb29yZGluYXRlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvTG9uTGF0KFxyXG4gIHN0cjogc3RyaW5nLFxyXG4gIG1hcFByb2plY3Rpb246IHN0cmluZyxcclxuICBvcHRzOiB7IGZvcmNlTkE/OiBib29sZWFuIH0gPSB7fVxyXG4pOiB7XHJcbiAgbG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdIHwgdW5kZWZpbmVkO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICByYWRpdXM6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICBjb25mOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbn0ge1xyXG4gIGxldCBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl07XHJcbiAgbGV0IGNvb3JkU3RyOiBzdHJpbmc7XHJcbiAgbGV0IG5lZ2F0aXZlTG9uOiBzdHJpbmc7XHJcbiAgbGV0IGRlZ3JlZXNMb246IHN0cmluZztcclxuICBsZXQgbWludXRlc0xvbjogc3RyaW5nO1xyXG4gIGxldCBzZWNvbmRzTG9uOiBzdHJpbmc7XHJcbiAgbGV0IGRpcmVjdGlvbkxvbjogc3RyaW5nO1xyXG4gIGxldCBkZWNpbWFsTG9uOiBzdHJpbmc7XHJcbiAgbGV0IG5lZ2F0aXZlTGF0OiBzdHJpbmc7XHJcbiAgbGV0IGRlZ3JlZXNMYXQ6IHN0cmluZztcclxuICBsZXQgbWludXRlc0xhdDogc3RyaW5nO1xyXG4gIGxldCBzZWNvbmRzTGF0OiBzdHJpbmc7XHJcbiAgbGV0IGRpcmVjdGlvbkxhdDogc3RyaW5nO1xyXG4gIGxldCBkZWNpbWFsTGF0OiBzdHJpbmc7XHJcbiAgbGV0IHpvbmU6IHN0cmluZztcclxuICBsZXQgcmFkaXVzOiBzdHJpbmc7XHJcbiAgbGV0IGNvbmY6IHN0cmluZztcclxuICBsZXQgbG9uOiBhbnk7XHJcbiAgbGV0IGxhdDogYW55O1xyXG5cclxuICBjb25zdCBwcm9qZWN0aW9uUGF0dGVybiA9ICcoXFxcXHMqO1xcXFxzKltcXFxcZF17NCw2fSknO1xyXG4gIGNvbnN0IHRvUHJvamVjdGlvbiA9ICc0MzI2JztcclxuICBsZXQgcHJvamVjdGlvblN0cjogc3RyaW5nO1xyXG4gIGNvbnN0IHByb2plY3Rpb25SZWdleCA9IG5ldyBSZWdFeHAocHJvamVjdGlvblBhdHRlcm4sICdnJyk7XHJcblxyXG4gIGNvbnN0IGxvbmxhdENvb3JkID0gJyhbLStdKT8oW1xcXFxkXXsxLDN9KShbLC5dKFxcXFxkKykpPyc7XHJcbiAgY29uc3QgbG9uTGF0UGF0dGVybiA9IGAke2xvbmxhdENvb3JkfVtcXFxccyxdKyR7bG9ubGF0Q29vcmR9YDtcclxuICBjb25zdCBsb25MYXRSZWdleCA9IG5ldyBSZWdFeHAoYF4ke2xvbkxhdFBhdHRlcm59JGAsICdnJyk7XHJcblxyXG4gIGNvbnN0IGRtc0Nvb3JkID1cclxuICAgICcoWzAtOV17MSwyfSlbOnzCsF0/XFxcXHMqKFswLTldezEsMn0pP1s6fFxcJ3zigLJ84oCZXT9cXFxccyooWzAtOV17MSwyfSg/Oi5bMC05XSspezAsMX0pP1xcXFxzKltcInzigLN84oCdXT9cXFxccyonO1xyXG4gIGNvbnN0IGRtc0Nvb3JkUGF0dGVybiA9IGAke2Rtc0Nvb3JkfShbTnxTfEV8V3xPXSksP1xcXFxzKiR7ZG1zQ29vcmR9KFtOfFN8RXxXfE9dKWA7XHJcbiAgY29uc3QgZG1zUmVnZXggPSBuZXcgUmVnRXhwKGBeJHtkbXNDb29yZFBhdHRlcm59YCwgJ2dpJyk7XHJcblxyXG4gIGNvbnN0IHBhdHRlcm5VdG0gPVxyXG4gICAgJyhVVE0pLT8oXFxcXGR7MSwyfSlbXFxcXHMsXSooXFxcXGQrWy4sXT9cXFxcZCspW1xcXFxzLF0rKFxcXFxkK1suLF0/XFxcXGQrKSc7XHJcbiAgY29uc3QgdXRtUmVnZXggPSBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuVXRtfWAsICdnaScpO1xyXG5cclxuICBjb25zdCBwYXR0ZXJuTXRtID1cclxuICAgICcoTVRNKS0/KFxcXFxkezEsMn0pW1xcXFxzLF0qKFxcXFxkK1suLF0/XFxcXGQrKVtcXFxccyxdKyhcXFxcZCtbLixdP1xcXFxkKyknO1xyXG4gIGNvbnN0IG10bVJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7cGF0dGVybk10bX1gLCAnZ2knKTtcclxuXHJcbiAgY29uc3QgZGRDb29yZCA9ICcoWy0rXSk/KFxcXFxkezEsM30pWywuXShcXFxcZCspJztcclxuICBjb25zdCBwYXR0ZXJuRGQgPSBgJHtkZENvb3JkfVxcXFxzKlssXT9cXFxccyoke2RkQ29vcmR9YDtcclxuICBjb25zdCBkZFJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7cGF0dGVybkRkfWAsICdnJyk7XHJcblxyXG4gIGNvbnN0IGRtZENvb3JkID1cclxuICAgICcoWy0rXSk/KFxcXFxkezEsM30pW1xcXFxzLC5dezF9KFxcXFxkezEsMn0pW1xcXFxzLC5dezF9KFxcXFxkezEsMn0pWy4sXT8oXFxcXGR7MSw1fSk/JztcclxuICBjb25zdCBwYXR0ZXJuRG1kID0gYCR7ZG1kQ29vcmR9XFxcXHMqWywuXT9cXFxccyoke2RtZENvb3JkfWA7XHJcbiAgY29uc3QgZG1kUmVnZXggPSBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuRG1kfWAsICdnJyk7XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxyXG4gIGNvbnN0IHBhdHRlcm5CRUxMID1cclxuICAgICdMQVRcXFxccypbXFxcXHM6XSpcXFxccyooWy0rXSk/KFxcXFxkezEsMn0pW1xcXFxzLixdPyhcXFxcZCspP1tcXFxccy4sXT9cXFxccyooXFxcXGR7MSwyfShbLixdXFxcXGQrKT8pP1xcXFxzKihOfFN8RXxXKT9cXFxccypMT05HXFxcXHMqW1xcXFxzOl0qXFxcXHMqKFstK10pPyhcXFxcZHsxLDN9KVtcXFxccy4sXT8oXFxcXGQrKT9bXFxcXHMuLF0/XFxcXHMqKFxcXFxkezEsMn0oWy4sXVxcXFxkKyk/KT9cXFxccyooTnxTfEV8Vyk/XFxcXHMqVU5DXFxcXHMqW1xcXFxzOl0/XFxcXHMqKFxcXFxkKylcXFxccypDT05GXFxcXHMqW1xcXFxzOl0/XFxcXHMqKFxcXFxkezEsM30pJztcclxuICBjb25zdCBiZWxsUmVnZXggPSBuZXcgUmVnRXhwKGBeJHtwYXR0ZXJuQkVMTH0/YCwgJ2dpJyk7XHJcblxyXG4gIGNvbnN0IG1tQ29vcmQgPSAnKFstK10/XFxcXGQrKVssLl0/KFxcXFxkKyk/JztcclxuICBjb25zdCBtbVBhdHRlcm4gPSBgJHttbUNvb3JkfVtcXFxccyxdKyR7bW1Db29yZH1gO1xyXG4gIGNvbnN0IG1tUmVnZXggPSBuZXcgUmVnRXhwKGBeJHttbVBhdHRlcm59JGAsICdnJyk7XHJcblxyXG4gIGxldCBpc1hZQ29vcmRzID0gZmFsc2U7XHJcblxyXG4gIHN0ciA9IHN0ci50b0xvY2FsZVVwcGVyQ2FzZSgpLnRyaW0oKTtcclxuXHJcbiAgLy8gRXh0cmFjdCBwcm9qZWN0aW9uXHJcbiAgaWYgKHByb2plY3Rpb25SZWdleC50ZXN0KHN0cikpIHtcclxuICAgIFtjb29yZFN0ciwgcHJvamVjdGlvblN0cl0gPSBzdHIuc3BsaXQoJzsnKS5tYXAocyA9PiBzLnRyaW0oKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvb3JkU3RyID0gc3RyO1xyXG4gIH1cclxuICBpZiAobG9uTGF0UmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIFtcclxuICAgICAgLFxyXG4gICAgICBuZWdhdGl2ZUxvbixcclxuICAgICAgbG9uLFxyXG4gICAgICAsXHJcbiAgICAgIGRlY2ltYWxMb24sXHJcbiAgICAgIG5lZ2F0aXZlTGF0LFxyXG4gICAgICBsYXQsXHJcbiAgICAgICxcclxuICAgICAgZGVjaW1hbExhdFxyXG4gICAgXSA9IGNvb3JkU3RyLm1hdGNoKGxvbkxhdFBhdHRlcm4pO1xyXG5cclxuICAgIGxvbiA9IHBhcnNlRmxvYXQoKG5lZ2F0aXZlTG9uID8gbmVnYXRpdmVMb24gOiAnJykgKyBsb24gKyAnLicgKyBkZWNpbWFsTG9uKTtcclxuICAgIGxhdCA9IHBhcnNlRmxvYXQoKG5lZ2F0aXZlTGF0ID8gbmVnYXRpdmVMYXQgOiAnJykgKyBsYXQgKyAnLicgKyBkZWNpbWFsTGF0KTtcclxuICB9IGVsc2UgaWYgKGRtc1JlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcbiAgICBbXHJcbiAgICAgICxcclxuICAgICAgZGVncmVlc0xvbixcclxuICAgICAgbWludXRlc0xvbixcclxuICAgICAgc2Vjb25kc0xvbixcclxuICAgICAgZGlyZWN0aW9uTG9uLFxyXG4gICAgICBkZWdyZWVzTGF0LFxyXG4gICAgICBtaW51dGVzTGF0LFxyXG4gICAgICBzZWNvbmRzTGF0LFxyXG4gICAgICBkaXJlY3Rpb25MYXRcclxuICAgIF0gPSBjb29yZFN0ci5tYXRjaChkbXNDb29yZFBhdHRlcm4pO1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb25Mb24gPT09ICdTJyB8fCBkaXJlY3Rpb25Mb24gPT09ICdOJykge1xyXG4gICAgICBkZWdyZWVzTG9uID0gW2RlZ3JlZXNMYXQsIChkZWdyZWVzTGF0ID0gZGVncmVlc0xvbildWzBdO1xyXG4gICAgICBtaW51dGVzTG9uID0gW21pbnV0ZXNMYXQsIChtaW51dGVzTGF0ID0gbWludXRlc0xvbildWzBdO1xyXG4gICAgICBzZWNvbmRzTG9uID0gW3NlY29uZHNMYXQsIChzZWNvbmRzTGF0ID0gc2Vjb25kc0xvbildWzBdO1xyXG4gICAgICBkaXJlY3Rpb25Mb24gPSBbZGlyZWN0aW9uTGF0LCAoZGlyZWN0aW9uTGF0ID0gZGlyZWN0aW9uTG9uKV1bMF07XHJcbiAgICB9XHJcblxyXG4gICAgbG9uID0gY29udmVydERNU1RvREQoXHJcbiAgICAgIHBhcnNlRmxvYXQoZGVncmVlc0xvbiksXHJcbiAgICAgIHBhcnNlRmxvYXQobWludXRlc0xvbiksXHJcbiAgICAgIHBhcnNlRmxvYXQoc2Vjb25kc0xvbiksXHJcbiAgICAgIGRpcmVjdGlvbkxvblxyXG4gICAgKTtcclxuICAgIGxhdCA9IGNvbnZlcnRETVNUb0REKFxyXG4gICAgICBwYXJzZUZsb2F0KGRlZ3JlZXNMYXQpLFxyXG4gICAgICBwYXJzZUZsb2F0KG1pbnV0ZXNMYXQpLFxyXG4gICAgICBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLFxyXG4gICAgICBkaXJlY3Rpb25MYXRcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmICh1dG1SZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgaXNYWUNvb3JkcyA9IHRydWU7XHJcbiAgICBbLCAsIHpvbmUsIGxvbiwgbGF0XSA9IGNvb3JkU3RyLm1hdGNoKHBhdHRlcm5VdG0pO1xyXG4gICAgY29uc3QgZXBzZ1V0bSA9IE51bWJlcih6b25lKSA8IDEwID8gYEVQU0c6MzI2MCR7em9uZX1gIDogYEVQU0c6MzI2JHt6b25lfWA7XHJcbiAgICBbbG9uLCBsYXRdID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgW3BhcnNlRmxvYXQobG9uKSwgcGFyc2VGbG9hdChsYXQpXSxcclxuICAgICAgZXBzZ1V0bSxcclxuICAgICAgJ0VQU0c6NDMyNidcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChtdG1SZWdleC50ZXN0KGNvb3JkU3RyKSkge1xyXG4gICAgaXNYWUNvb3JkcyA9IHRydWU7XHJcbiAgICBbLCAsIHpvbmUsIGxvbiwgbGF0XSA9IGNvb3JkU3RyLm1hdGNoKHBhdHRlcm5NdG0pO1xyXG4gICAgY29uc3QgZXBzZ010bSA9XHJcbiAgICAgIE51bWJlcih6b25lKSA8IDEwID8gYEVQU0c6MzIxOCR7em9uZX1gIDogYEVQU0c6MzIxJHs4MCArIE51bWJlcih6b25lKX1gO1xyXG4gICAgW2xvbiwgbGF0XSA9IG9scHJvai50cmFuc2Zvcm0oXHJcbiAgICAgIFtwYXJzZUZsb2F0KGxvbiksIHBhcnNlRmxvYXQobGF0KV0sXHJcbiAgICAgIGVwc2dNdG0sXHJcbiAgICAgICdFUFNHOjQzMjYnXHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAoZG1kUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIFtcclxuICAgICAgLFxyXG4gICAgICBuZWdhdGl2ZUxvbixcclxuICAgICAgZGVncmVlc0xvbixcclxuICAgICAgbWludXRlc0xvbixcclxuICAgICAgc2Vjb25kc0xvbixcclxuICAgICAgZGVjaW1hbExvbixcclxuICAgICAgbmVnYXRpdmVMYXQsXHJcbiAgICAgIGRlZ3JlZXNMYXQsXHJcbiAgICAgIG1pbnV0ZXNMYXQsXHJcbiAgICAgIHNlY29uZHNMYXQsXHJcbiAgICAgIGRlY2ltYWxMYXRcclxuICAgIF0gPSBjb29yZFN0ci5tYXRjaChwYXR0ZXJuRG1kKTtcclxuXHJcbiAgICBsb24gPSBjb252ZXJ0RE1TVG9ERChcclxuICAgICAgcGFyc2VGbG9hdCgobmVnYXRpdmVMb24gPyBuZWdhdGl2ZUxvbiA6ICcnKSArIGRlZ3JlZXNMb24pLFxyXG4gICAgICBwYXJzZUZsb2F0KG1pbnV0ZXNMb24pLFxyXG4gICAgICBwYXJzZUZsb2F0KHNlY29uZHNMb24pLFxyXG4gICAgICBkaXJlY3Rpb25Mb25cclxuICAgICk7XHJcbiAgICBsYXQgPSBjb252ZXJ0RE1TVG9ERChcclxuICAgICAgcGFyc2VGbG9hdCgobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGRlZ3JlZXNMYXQpLFxyXG4gICAgICBwYXJzZUZsb2F0KG1pbnV0ZXNMYXQpLFxyXG4gICAgICBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLFxyXG4gICAgICBkaXJlY3Rpb25MYXRcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChkZFJlZ2V4LnRlc3QoY29vcmRTdHIpKSB7XHJcbiAgICBbXHJcbiAgICAgICxcclxuICAgICAgbmVnYXRpdmVMb24sXHJcbiAgICAgIGRlZ3JlZXNMb24sXHJcbiAgICAgIGRlY2ltYWxMb24sXHJcbiAgICAgIG5lZ2F0aXZlTGF0LFxyXG4gICAgICBkZWdyZWVzTGF0LFxyXG4gICAgICBkZWNpbWFsTGF0XHJcbiAgICBdID0gY29vcmRTdHIubWF0Y2gocGF0dGVybkRkKTtcclxuXHJcbiAgICBsb24gPSBjb252ZXJ0RE1TVG9ERChcclxuICAgICAgcGFyc2VGbG9hdCgobmVnYXRpdmVMb24gPyBuZWdhdGl2ZUxvbiA6ICcnKSArIGRlZ3JlZXNMb24pLFxyXG4gICAgICBwYXJzZUZsb2F0KG1pbnV0ZXNMb24pLFxyXG4gICAgICBwYXJzZUZsb2F0KHNlY29uZHNMb24pLFxyXG4gICAgICBkaXJlY3Rpb25Mb25cclxuICAgICk7XHJcbiAgICBsYXQgPSBjb252ZXJ0RE1TVG9ERChcclxuICAgICAgcGFyc2VGbG9hdCgobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGRlZ3JlZXNMYXQpLFxyXG4gICAgICBwYXJzZUZsb2F0KG1pbnV0ZXNMYXQpLFxyXG4gICAgICBwYXJzZUZsb2F0KHNlY29uZHNMYXQpLFxyXG4gICAgICBkaXJlY3Rpb25MYXRcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmIChiZWxsUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIFtcclxuICAgICAgLFxyXG4gICAgICBuZWdhdGl2ZUxhdCxcclxuICAgICAgZGVncmVlc0xhdCxcclxuICAgICAgbWludXRlc0xhdCxcclxuICAgICAgc2Vjb25kc0xhdCxcclxuICAgICAgLFxyXG4gICAgICBkaXJlY3Rpb25MYXQsXHJcbiAgICAgIG5lZ2F0aXZlTG9uLFxyXG4gICAgICBkZWdyZWVzTG9uLFxyXG4gICAgICBtaW51dGVzTG9uLFxyXG4gICAgICBzZWNvbmRzTG9uLFxyXG4gICAgICAsXHJcbiAgICAgIGRpcmVjdGlvbkxvbixcclxuICAgICAgcmFkaXVzLFxyXG4gICAgICBjb25mXHJcbiAgICBdID0gY29vcmRTdHIubWF0Y2gocGF0dGVybkJFTEwpO1xyXG5cclxuICAgIC8vIFNldCBkZWZhdWx0IHZhbHVlIGZvciBOb3J0aCBBbWVyaWNhXHJcbiAgICBpZiAoIWRpcmVjdGlvbkxvbikge1xyXG4gICAgICBkaXJlY3Rpb25Mb24gPSAnVyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgcmVhbCBtaW51dGVzIG9yIGRlY2ltYWxzXHJcbiAgICBpZiAobWludXRlc0xvbiAmJiBtaW51dGVzTG9uLmxlbmd0aCA+IDIpIHtcclxuICAgICAgbG9uID0gcGFyc2VGbG9hdChcclxuICAgICAgICAobmVnYXRpdmVMb24gPyBuZWdhdGl2ZUxvbiA6ICcnKSArIGRlZ3JlZXNMb24gKyAnLicgKyBtaW51dGVzTG9uXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb24gPSBjb252ZXJ0RE1TVG9ERChcclxuICAgICAgICBwYXJzZUZsb2F0KGRlZ3JlZXNMb24pLFxyXG4gICAgICAgIHBhcnNlRmxvYXQobWludXRlc0xvbiksXHJcbiAgICAgICAgcGFyc2VGbG9hdChzZWNvbmRzTG9uKSxcclxuICAgICAgICBkaXJlY3Rpb25Mb25cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWludXRlc0xhdCAmJiBtaW51dGVzTGF0Lmxlbmd0aCA+IDIpIHtcclxuICAgICAgbGF0ID0gcGFyc2VGbG9hdChcclxuICAgICAgICAobmVnYXRpdmVMYXQgPyBuZWdhdGl2ZUxhdCA6ICcnKSArIGRlZ3JlZXNMYXQgKyAnLicgKyBtaW51dGVzTGF0XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXQgPSBjb252ZXJ0RE1TVG9ERChcclxuICAgICAgICBwYXJzZUZsb2F0KGRlZ3JlZXNMYXQpLFxyXG4gICAgICAgIHBhcnNlRmxvYXQobWludXRlc0xhdCksXHJcbiAgICAgICAgcGFyc2VGbG9hdChzZWNvbmRzTGF0KSxcclxuICAgICAgICBkaXJlY3Rpb25MYXRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKG1tUmVnZXgudGVzdChjb29yZFN0cikpIHtcclxuICAgIGlzWFlDb29yZHMgPSB0cnVlO1xyXG4gICAgWywgbG9uLCBkZWNpbWFsTG9uLCBsYXQsIGRlY2ltYWxMYXRdID0gY29vcmRTdHIubWF0Y2gobW1QYXR0ZXJuKTtcclxuXHJcbiAgICBpZiAoZGVjaW1hbExvbikge1xyXG4gICAgICBsb24gPSBwYXJzZUZsb2F0KGxvbiArICcuJyArIGRlY2ltYWxMb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWNpbWFsTGF0KSB7XHJcbiAgICAgIGxhdCA9IHBhcnNlRmxvYXQobGF0ICsgJy4nICsgZGVjaW1hbExhdCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxvbkxhdDogdW5kZWZpbmVkLFxyXG4gICAgICBtZXNzYWdlOiAnJyxcclxuICAgICAgcmFkaXVzOiB1bmRlZmluZWQsXHJcbiAgICAgIGNvbmY6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmIChvcHRzLmZvcmNlTkEgJiYgIWlzWFlDb29yZHMpIHtcclxuICAgIC8vIFNldCBhIG5lZ2F0aXZlIGNvb3JkaW5hdGUgZm9yIE5vcnRoIEFtZXJpY2Egem9uZVxyXG4gICAgaWYgKGxvbiA+IDAgJiYgbGF0ID4gMCkge1xyXG4gICAgICBpZiAobG9uID4gbGF0KSB7XHJcbiAgICAgICAgbG9uID0gLWxvbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsYXQgPSAtbGF0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZXJzZSBjb29yZGluYXRlIHRvIHJlc3BlY3QgbG9uTGF0IGNvbnZlbnRpb25cclxuICAgIGlmIChsb24gPiBsYXQpIHtcclxuICAgICAgbG9uID0gW2xhdCwgKGxhdCA9IGxvbildWzBdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9uTGF0ID0gW051bWJlcihsb24pLCBOdW1iZXIobGF0KV0gYXMgW251bWJlciwgbnVtYmVyXTtcclxuXHJcbiAgLy8gUmVwcm9qZWN0IHRoZSBjb29yZGluYXRlIGlmIHByb2plY3Rpb24gcGFyYW1ldGVyIGhhdmUgYmVlbiBzZXQgYW5kIGNvb3JkIGlzIG5vdCA0MzI2XHJcbiAgaWYgKFxyXG4gICAgKHByb2plY3Rpb25TdHIgIT09IHVuZGVmaW5lZCAmJiBwcm9qZWN0aW9uU3RyICE9PSB0b1Byb2plY3Rpb24pIHx8XHJcbiAgICAobG9uTGF0WzBdID4gMTgwIHx8IGxvbkxhdFswXSA8IC0xODApIHx8XHJcbiAgICAobG9uTGF0WzFdID4gOTAgfHwgbG9uTGF0WzFdIDwgLTkwKVxyXG4gICkge1xyXG4gICAgY29uc3Qgc291cmNlID0gcHJvamVjdGlvblN0ciA/ICdFUFNHOicgKyBwcm9qZWN0aW9uU3RyIDogbWFwUHJvamVjdGlvbjtcclxuICAgIGNvbnN0IGRlc3QgPSAnRVBTRzonICsgdG9Qcm9qZWN0aW9uO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxvbkxhdCA9IG9scHJvai50cmFuc2Zvcm0obG9uTGF0LCBzb3VyY2UsIGRlc3QpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvbkxhdDogdW5kZWZpbmVkLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdQcm9qZWN0aW9uICcgKyBzb3VyY2UgKyAnIG5vdCBzdXBwb3J0ZWQnLFxyXG4gICAgICAgIHJhZGl1czogdW5kZWZpbmVkLFxyXG4gICAgICAgIGNvbmY6IHVuZGVmaW5lZFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxvbkxhdCxcclxuICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgcmFkaXVzOiByYWRpdXMgPyBwYXJzZUludChyYWRpdXMsIDEwKSA6IHVuZGVmaW5lZCxcclxuICAgIGNvbmY6IGNvbmYgPyBwYXJzZUludChjb25mLCAxMCkgOiB1bmRlZmluZWRcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBkZWdyZWVzIG1pbnV0ZXMgc2Vjb25kcyB0byBkZFxyXG4gKiBAcGFyYW0gZGVncmVlcyBEZWdyZWVzXHJcbiAqIEBwYXJhbSBtaW51dGVzIE1pbnV0ZXNcclxuICogQHBhcmFtIHNlY29uZHMgU2Vjb25kc1xyXG4gKiBAcGFyYW0gZGlyZWN0aW9uIERpcmVjdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gY29udmVydERNU1RvREQoXHJcbiAgZGVncmVlczogbnVtYmVyLFxyXG4gIG1pbnV0ZXM6IG51bWJlcixcclxuICBzZWNvbmRzOiBudW1iZXIsXHJcbiAgZGlyZWN0aW9uOiBzdHJpbmdcclxuKSB7XHJcbiAgbWludXRlcyA9IG1pbnV0ZXMgfHwgMDtcclxuICBzZWNvbmRzID0gc2Vjb25kcyB8fCAwO1xyXG4gIGxldCBkZCA9IGRlZ3JlZXMgKyBtaW51dGVzIC8gNjAgKyBzZWNvbmRzIC8gMzYwMDtcclxuXHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gJ1MnIHx8IGRpcmVjdGlvbiA9PT0gJ1cnKSB7XHJcbiAgICBkZCA9IC1kZDtcclxuICB9IC8vIERvbid0IGRvIGFueXRoaW5nIGZvciBOIG9yIEVcclxuICByZXR1cm4gZGQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBvZiB0d28gdmlldyBzdGF0ZXMgYXJlIGVxdWFsLlxyXG4gKiBAcGFyYW0gc3RhdGUxIFZpZXcgc3RhdGVcclxuICogQHBhcmFtIHN0YXRlMiBWaWV3IHN0YXRlXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgc3RhdGVzIGFyZSBlcXVhbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHZpZXdTdGF0ZXNBcmVFcXVhbChcclxuICBzdGF0ZTE6IE1hcFZpZXdTdGF0ZSxcclxuICBzdGF0ZTI6IE1hcFZpZXdTdGF0ZVxyXG4pOiBib29sZWFuIHtcclxuICBpZiAoc3RhdGUxID09PSB1bmRlZmluZWQgfHwgc3RhdGUyID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvbGVyYW5jZSA9IDEgLyAxMDAwMDtcclxuICByZXR1cm4gKFxyXG4gICAgc3RhdGUxLnpvb20gPT09IHN0YXRlMi56b29tICYmXHJcbiAgICBNYXRoLnRydW5jKHN0YXRlMS5jZW50ZXJbMF0gLyB0b2xlcmFuY2UpID09PVxyXG4gICAgICBNYXRoLnRydW5jKHN0YXRlMi5jZW50ZXJbMF0gLyB0b2xlcmFuY2UpICYmXHJcbiAgICBNYXRoLnRydW5jKHN0YXRlMS5jZW50ZXJbMV0gLyB0b2xlcmFuY2UpID09PVxyXG4gICAgICBNYXRoLnRydW5jKHN0YXRlMi5jZW50ZXJbMV0gLyB0b2xlcmFuY2UpXHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZvcm1hdCB0aGUgc2NhbGUgdG8gYSBodW1hbiByZWFkYWJsZSB0ZXh0XHJcbiAqIEBwYXJhbSBTY2FsZSBvZiB0aGUgbWFwXHJcbiAqIEByZXR1cm5zIEh1bWFuIHJlYWRhYmxlIHNjYWxlIHRleHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRTY2FsZShzY2FsZSkge1xyXG4gIHNjYWxlID0gTWF0aC5yb3VuZChzY2FsZSk7XHJcbiAgaWYgKHNjYWxlIDwgMTAwMDApIHtcclxuICAgIHJldHVybiBzY2FsZSArICcnO1xyXG4gIH1cclxuXHJcbiAgc2NhbGUgPSBNYXRoLnJvdW5kKHNjYWxlIC8gMTAwMCk7XHJcbiAgaWYgKHNjYWxlIDwgMTAwMCkge1xyXG4gICAgcmV0dXJuIHNjYWxlICsgJ0snO1xyXG4gIH1cclxuXHJcbiAgc2NhbGUgPSBNYXRoLnJvdW5kKHNjYWxlIC8gMTAwMCk7XHJcbiAgcmV0dXJuIHNjYWxlICsgJ00nO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSByZXNvbHV0aW9uIGZyb20gYSBzY2FsZSBkZW5vbVxyXG4gKiBAcGFyYW0gc2NhbGUgU2NhbGUgZGVub21cclxuICogQHBhcmFtIGRwaSBEUElcclxuICogQHJldHVybnMgUmVzb2x1dGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlc29sdXRpb25Gcm9tU2NhbGUoXHJcbiAgc2NhbGU6IG51bWJlcixcclxuICBkcGk6IG51bWJlciA9IDk2XHJcbik6IG51bWJlciB7XHJcbiAgY29uc3QgaW5jaGVzUGVyTWV0ZXIgPSAzOS4zNzAxO1xyXG4gIHJldHVybiBzY2FsZSAvIChpbmNoZXNQZXJNZXRlciAqIGRwaSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHJlc29sdXRpb24gZnJvbSBhIHNjYWxlIGRlbm9tXHJcbiAqIEBwYXJhbSBTY2FsZSBkZW5vbVxyXG4gKiBAcmV0dXJucyBSZXNvbHV0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihcclxuICByZXNvbHV0aW9uOiBudW1iZXIsXHJcbiAgdW5pdDogc3RyaW5nID0gJ20nLFxyXG4gIGRwaTogbnVtYmVyID0gOTZcclxuKTogbnVtYmVyIHtcclxuICBjb25zdCBpbmNoZXNQZXJNZXRlciA9IDM5LjM3MDE7XHJcbiAgcmV0dXJuIHJlc29sdXRpb24gKiBvbHByb2ouTUVURVJTX1BFUl9VTklUW3VuaXRdICogaW5jaGVzUGVyTWV0ZXIgKiBkcGk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIENUUkwga2V5IGlzIHB1c2hlZCBkdXJpbmcgYW4gT2wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcGFyYW0gZXZlbnQgT0wgTWFwQnJvd3NlclBvaW50ZXJFdmVudFxyXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBDVFJMIGtleSBpcyBwdXNoZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjdHJsS2V5RG93bihldmVudDogT2xNYXBCcm93c2VyUG9pbnRlckV2ZW50KTogYm9vbGVhbiB7XHJcbiAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XHJcbiAgcmV0dXJuIChcclxuICAgICFvcmlnaW5hbEV2ZW50LmFsdEtleSAmJlxyXG4gICAgKE1BQyA/IG9yaWdpbmFsRXZlbnQubWV0YUtleSA6IG9yaWdpbmFsRXZlbnQuY3RybEtleSkgJiZcclxuICAgICFvcmlnaW5hbEV2ZW50LnNoaWZ0S2V5XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kQ29vcmRUbyhjb29yZDogW251bWJlciwgbnVtYmVyXSwgZGVjaW1hbDogbnVtYmVyID0gMykge1xyXG4gIHJldHVybiBbY29vcmRbMF0udG9GaXhlZChkZWNpbWFsKSwgY29vcmRbMV0udG9GaXhlZChkZWNpbWFsKV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGNvbnZlcnRlZCBjb29yZGluYXRlcy5cclxuICogQ29udmVyc2lvbiBpcyBkb25lIGZvciBldmVyeSBjb25maWd1cmVkIHByb2plY3Rpb25zXHJcbiAqIGFuZCBmb3IgdGhlIGN1cnJlbnQgVVRNIHpvbmUgYW5kIE1UTSB6b25lLlxyXG4gKiBAcGFyYW0gbG9uTGF0IFtudW1iZXIsIG51bWJlcl0gYXJyYXkgb2YgdGhlIGNvb3JkaW5hdGUgdG8gdHJhbnNmb3JtLlxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbnMgIFByb2plY3Rpb25bXSBBcnJheSBvZiBkZXN0aW5hdGlvbiBwcm9qZWN0aW9uLlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIGFuIGFycmF5IG9mIGNvbnZlcnRlZCBjb29yZGluYXRlcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb25MYXRDb252ZXJzaW9uKFxyXG4gIGxvbkxhdDogW251bWJlciwgbnVtYmVyXSxcclxuICBwcm9qZWN0aW9uczogUHJvamVjdGlvbltdXHJcbik6IHtcclxuICBjb2RlOiBzdHJpbmc7XHJcbiAgYWxpYXM6IHN0cmluZztcclxuICBjb29yZDogW251bWJlciwgbnVtYmVyXTtcclxuICBpZ28yQ29vcmRGb3JtYXQ6IHN0cmluZztcclxufVtdIHtcclxuICBjb25zdCByYXdDb29yZDM4NTcgPSBvbHByb2oudHJhbnNmb3JtKGxvbkxhdCwgJ0VQU0c6NDMyNicsICdFUFNHOjM4NTcnKTtcclxuICBjb25zdCBjb252ZXJ0ZWRMb25MYXQgPSBbXHJcbiAgICB7XHJcbiAgICAgIGNvZGU6ICdFUFNHOjM4NTcnLFxyXG4gICAgICBhbGlhczogJ1dlYiBtZXJjYXRvcicsXHJcbiAgICAgIGNvb3JkOiByYXdDb29yZDM4NTcsXHJcbiAgICAgIGlnbzJDb29yZEZvcm1hdDogYCR7cm91bmRDb29yZFRvKHJhd0Nvb3JkMzg1Nykuam9pbignLCAnKX0gOyAzODU3YFxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIC8vIGRldGVjdCB0aGUgY3VycmVudCB1dG0gem9uZS5cclxuICBjb25zdCB1dG1ab25lID0gdXRtWm9uZUZyb21Mb25MYXQobG9uTGF0KTtcclxuICBjb25zdCBlcHNnVXRtID0gdXRtWm9uZSA8IDEwID8gYEVQU0c6MzI2MCR7dXRtWm9uZX1gIDogYEVQU0c6MzI2JHt1dG1ab25lfWA7XHJcbiAgY29uc3QgdXRtTmFtZSA9IGBVVE0tJHt1dG1ab25lfWA7XHJcbiAgY29uc3QgcmF3Q29vcmRVdG0gPSBvbHByb2oudHJhbnNmb3JtKGxvbkxhdCwgJ0VQU0c6NDMyNicsIGVwc2dVdG0pO1xyXG4gIGNvbnZlcnRlZExvbkxhdC5wdXNoKHtcclxuICAgIGNvZGU6IGVwc2dVdG0sXHJcbiAgICBhbGlhczogJ1VUTScsXHJcbiAgICBjb29yZDogcmF3Q29vcmRVdG0sXHJcbiAgICBpZ28yQ29vcmRGb3JtYXQ6IGAke3V0bU5hbWV9ICR7cm91bmRDb29yZFRvKHJhd0Nvb3JkVXRtKS5qb2luKCcsICcpfWBcclxuICB9KTtcclxuXHJcbiAgLy8gZGV0ZWN0IHRoZSBjdXJyZW50IG10bSB6b25lLlxyXG4gIGNvbnN0IG10bVpvbmUgPSBtdG1ab25lRnJvbUxvbkxhdChsb25MYXQpO1xyXG4gIGlmIChtdG1ab25lKSB7XHJcbiAgICBjb25zdCBlcHNnTXRtID1cclxuICAgICAgbXRtWm9uZSA8IDEwID8gYEVQU0c6MzIxOCR7bXRtWm9uZX1gIDogYEVQU0c6MzIxJHs4MCArIG10bVpvbmV9YDtcclxuICAgIGNvbnN0IG10bU5hbWUgPSBgTVRNLSR7bXRtWm9uZX1gO1xyXG4gICAgY29uc3QgcmF3Q29vcmRNdG0gPSBvbHByb2oudHJhbnNmb3JtKGxvbkxhdCwgJ0VQU0c6NDMyNicsIGVwc2dNdG0pO1xyXG4gICAgY29udmVydGVkTG9uTGF0LnB1c2goe1xyXG4gICAgICBjb2RlOiBlcHNnTXRtLFxyXG4gICAgICBhbGlhczogJ01UTScsXHJcbiAgICAgIGNvb3JkOiByYXdDb29yZE10bSxcclxuICAgICAgaWdvMkNvb3JkRm9ybWF0OiBgJHttdG1OYW1lfSAke3JvdW5kQ29vcmRUbyhyYXdDb29yZE10bSkuam9pbignLCAnKX1gXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb2plY3Rpb25zLmZvckVhY2gocHJvamVjdGlvbiA9PiB7XHJcbiAgICBjb25zdCByYXdDb29yZCA9IG9scHJvai50cmFuc2Zvcm0obG9uTGF0LCAnRVBTRzo0MzI2JywgcHJvamVjdGlvbi5jb2RlKTtcclxuICAgIGNvbnN0IG51bWVyaWNFcHNnQ29kZSA9IHByb2plY3Rpb24uY29kZS5zcGxpdCgnOicpWzFdO1xyXG4gICAgY29udmVydGVkTG9uTGF0LnB1c2goe1xyXG4gICAgICBjb2RlOiBwcm9qZWN0aW9uLmNvZGUsXHJcbiAgICAgIGFsaWFzOiBwcm9qZWN0aW9uLmFsaWFzIHx8IHByb2plY3Rpb24uY29kZSxcclxuICAgICAgY29vcmQ6IHJhd0Nvb3JkLFxyXG4gICAgICBpZ28yQ29vcmRGb3JtYXQ6IGAke3JvdW5kQ29vcmRUbyhyYXdDb29yZCkuam9pbihcclxuICAgICAgICAnLCAnXHJcbiAgICAgICl9IDsgJHtudW1lcmljRXBzZ0NvZGV9YFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBjb252ZXJ0ZWRMb25MYXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlY3QgdGhlIGN1cnJlbnQgdXRtIHpvbmUgb2YgdGhlIGxvbi9sYXQgY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIGxvbkxhdCBbbnVtYmVyLCBudW1iZXJdIGFycmF5IG9mIHRoZSBjb29yZGluYXRlIHRvIGRldGVjdCB0aGUgVVRNIHpvbmUuXHJcbiAqIEByZXR1cm5zIG51bWJlciBUaGUgVVRNIHpvbmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXRtWm9uZUZyb21Mb25MYXQobG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdKSB7XHJcbiAgcmV0dXJuIE1hdGguY2VpbCgobG9uTGF0WzBdICsgMTgwKSAvIDYpO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZWN0IHRoZSBjdXJyZW50IG10bSB6b25lIG9mIHRoZSBsb24vbGF0IGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSBsb25MYXQgW251bWJlciwgbnVtYmVyXSBhcnJheSBvZiB0aGUgY29vcmRpbmF0ZSB0byBkZXRlY3QgdGhlIE1UTSB6b25lLlxyXG4gKiBAcmV0dXJucyBudW1iZXIgVGhlIE1UTSB6b25lLiBVbmRlZmluZWQgaWYgb3V0c2lkZSBvZiB0aGUgbXRtIGFwcGxpY2F0aW9uIHpvbmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbXRtWm9uZUZyb21Mb25MYXQobG9uTGF0OiBbbnVtYmVyLCBudW1iZXJdKSB7XHJcbiAgY29uc3QgbG9uZyA9IGxvbkxhdFswXTtcclxuICBsZXQgbXRtWm9uZTtcclxuICBpZiAobG9uZyA8IC01MSAmJiBsb25nID4gLTU0KSB7XHJcbiAgICBtdG1ab25lID0gMTtcclxuICB9XHJcbiAgaWYgKGxvbmcgPCAtNTQgJiYgbG9uZyA+IC01Nykge1xyXG4gICAgbXRtWm9uZSA9IDI7XHJcbiAgfVxyXG4gIGlmIChsb25nIDwgLTU3ICYmIGxvbmcgPiAtNjApIHtcclxuICAgIG10bVpvbmUgPSAzO1xyXG4gIH1cclxuICBpZiAobG9uZyA8IC02MCAmJiBsb25nID4gLTYzKSB7XHJcbiAgICBtdG1ab25lID0gNDtcclxuICB9XHJcbiAgaWYgKGxvbmcgPCAtNjMgJiYgbG9uZyA+IC02Nikge1xyXG4gICAgbXRtWm9uZSA9IDU7XHJcbiAgfVxyXG4gIGlmIChsb25nIDwgLTY2ICYmIGxvbmcgPiAtNjkpIHtcclxuICAgIG10bVpvbmUgPSA2O1xyXG4gIH1cclxuICBpZiAobG9uZyA8IC02OSAmJiBsb25nID4gLTcyKSB7XHJcbiAgICBtdG1ab25lID0gNztcclxuICB9XHJcbiAgaWYgKGxvbmcgPCAtNzIgJiYgbG9uZyA+IC03NSkge1xyXG4gICAgbXRtWm9uZSA9IDg7XHJcbiAgfVxyXG4gIGlmIChsb25nIDwgLTc1ICYmIGxvbmcgPiAtNzgpIHtcclxuICAgIG10bVpvbmUgPSA5O1xyXG4gIH1cclxuICBpZiAobG9uZyA8IC03OCAmJiBsb25nID4gLTgxKSB7XHJcbiAgICBtdG1ab25lID0gMTA7XHJcbiAgfVxyXG4gIHJldHVybiBtdG1ab25lO1xyXG59XHJcbiJdfQ==