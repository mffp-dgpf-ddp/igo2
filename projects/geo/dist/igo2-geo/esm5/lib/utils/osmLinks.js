/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OsmLinks = /** @class */ (function () {
    function OsmLinks() {
    }
    /**
     * @param {?} lon
     * @param {?} lat
     * @param {?=} zoom
     * @return {?}
     */
    OsmLinks.getOpenStreetMapLink = /**
     * @param {?} lon
     * @param {?} lat
     * @param {?=} zoom
     * @return {?}
     */
    function (lon, lat, zoom) {
        if (zoom === void 0) { zoom = 17; }
        // return 'https://www.google.com/maps?q=' + lat + ',' + lon;
        return "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "#map=" + zoom + "/" + lat + "/" + lon;
    };
    /**
     * @param {?} lon
     * @param {?} lat
     * @param {?=} zoom
     * @return {?}
     */
    OsmLinks.getOpenStreetCamLink = /**
     * @param {?} lon
     * @param {?} lat
     * @param {?=} zoom
     * @return {?}
     */
    function (lon, lat, zoom) {
        if (zoom === void 0) { zoom = 17; }
        return "https://openstreetcam.org/map/@" + lat + "," + lon + "," + zoom + "z";
    };
    return OsmLinks;
}());
export { OsmLinks };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtTGlua3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvb3NtTGlua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBQUE7SUFTQSxDQUFDOzs7Ozs7O0lBUlEsNkJBQW9COzs7Ozs7SUFBM0IsVUFBNEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFpQjtRQUFqQixxQkFBQSxFQUFBLFNBQWlCO1FBQ3JELDZEQUE2RDtRQUM3RCxPQUFRLHlDQUF1QyxHQUFHLGNBQVMsR0FBRyxhQUFRLElBQUksU0FBSSxHQUFHLFNBQUksR0FBSyxDQUFDO0lBQzdGLENBQUM7Ozs7Ozs7SUFFTSw2QkFBb0I7Ozs7OztJQUEzQixVQUE0QixHQUFHLEVBQUUsR0FBRyxFQUFFLElBQWlCO1FBQWpCLHFCQUFBLEVBQUEsU0FBaUI7UUFDckQsT0FBUSxvQ0FBa0MsR0FBRyxTQUFJLEdBQUcsU0FBSSxJQUFJLE1BQUcsQ0FBQztJQUNsRSxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFURCxJQVNDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE9zbUxpbmtzIHtcclxuICBzdGF0aWMgZ2V0T3BlblN0cmVldE1hcExpbmsobG9uLCBsYXQsIHpvb206IG51bWJlciA9IDE3KSB7XHJcbiAgICAvLyByZXR1cm4gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcz9xPScgKyBsYXQgKyAnLCcgKyBsb247XHJcbiAgICByZXR1cm4gIGBodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy8/bWxhdD0ke2xhdH0mbWxvbj0ke2xvbn0jbWFwPSR7em9vbX0vJHtsYXR9LyR7bG9ufWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0T3BlblN0cmVldENhbUxpbmsobG9uLCBsYXQsIHpvb206IG51bWJlciA9IDE3KSB7XHJcbiAgICByZXR1cm4gIGBodHRwczovL29wZW5zdHJlZXRjYW0ub3JnL21hcC9AJHtsYXR9LCR7bG9ufSwke3pvb219emA7XHJcbiAgfVxyXG59XHJcbiJdfQ==