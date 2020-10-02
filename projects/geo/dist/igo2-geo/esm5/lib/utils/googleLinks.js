/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GoogleLinks = /** @class */ (function () {
    function GoogleLinks() {
    }
    /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    GoogleLinks.getGoogleMapsCoordLink = /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    function (lon, lat) {
        return 'https://www.google.com/maps?q=' + lat + ',' + lon;
    };
    /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    GoogleLinks.getGoogleStreetViewLink = /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    function (lon, lat) {
        return 'https://www.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lon;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    GoogleLinks.getGoogleMapsNameLink = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var encodedName = encodeURI(name);
        return 'https://www.google.com/maps?q=' + encodedName;
    };
    return GoogleLinks;
}());
export { GoogleLinks };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlTGlua3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvZ29vZ2xlTGlua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBQUE7SUFhQSxDQUFDOzs7Ozs7SUFaUSxrQ0FBc0I7Ozs7O0lBQTdCLFVBQThCLEdBQUcsRUFBRSxHQUFHO1FBQ3BDLE9BQU8sZ0NBQWdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDNUQsQ0FBQzs7Ozs7O0lBRU0sbUNBQXVCOzs7OztJQUE5QixVQUErQixHQUFHLEVBQUUsR0FBRztRQUNyQyxPQUFPLDhDQUE4QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQzFFLENBQUM7Ozs7O0lBRU0saUNBQXFCOzs7O0lBQTVCLFVBQTZCLElBQUk7O1lBQ3pCLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ25DLE9BQU8sZ0NBQWdDLEdBQUcsV0FBVyxDQUFDO0lBQ3hELENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFiRCxJQWFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdvb2dsZUxpbmtzIHtcclxuICBzdGF0aWMgZ2V0R29vZ2xlTWFwc0Nvb3JkTGluayhsb24sIGxhdCkge1xyXG4gICAgcmV0dXJuICdodHRwczovL3d3dy5nb29nbGUuY29tL21hcHM/cT0nICsgbGF0ICsgJywnICsgbG9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEdvb2dsZVN0cmVldFZpZXdMaW5rKGxvbiwgbGF0KSB7XHJcbiAgICByZXR1cm4gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcz9xPSZsYXllcj1jJmNibGw9JyArIGxhdCArICcsJyArIGxvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRHb29nbGVNYXBzTmFtZUxpbmsobmFtZSkge1xyXG4gICAgY29uc3QgZW5jb2RlZE5hbWUgPSBlbmNvZGVVUkkobmFtZSk7XHJcbiAgICByZXR1cm4gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcz9xPScgKyBlbmNvZGVkTmFtZTtcclxuICB9XHJcbn1cclxuIl19