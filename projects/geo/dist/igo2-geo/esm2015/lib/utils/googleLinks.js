/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class GoogleLinks {
    /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    static getGoogleMapsCoordLink(lon, lat) {
        return 'https://www.google.com/maps?q=' + lat + ',' + lon;
    }
    /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    static getGoogleStreetViewLink(lon, lat) {
        return 'https://www.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lon;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    static getGoogleMapsNameLink(name) {
        /** @type {?} */
        const encodedName = encodeURI(name);
        return 'https://www.google.com/maps?q=' + encodedName;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlTGlua3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvZ29vZ2xlTGlua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxXQUFXOzs7Ozs7SUFDdEIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxHQUFHO1FBQ3BDLE9BQU8sZ0NBQWdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDNUQsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxHQUFHO1FBQ3JDLE9BQU8sOENBQThDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSTs7Y0FDekIsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDbkMsT0FBTyxnQ0FBZ0MsR0FBRyxXQUFXLENBQUM7SUFDeEQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdvb2dsZUxpbmtzIHtcclxuICBzdGF0aWMgZ2V0R29vZ2xlTWFwc0Nvb3JkTGluayhsb24sIGxhdCkge1xyXG4gICAgcmV0dXJuICdodHRwczovL3d3dy5nb29nbGUuY29tL21hcHM/cT0nICsgbGF0ICsgJywnICsgbG9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEdvb2dsZVN0cmVldFZpZXdMaW5rKGxvbiwgbGF0KSB7XHJcbiAgICByZXR1cm4gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcz9xPSZsYXllcj1jJmNibGw9JyArIGxhdCArICcsJyArIGxvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRHb29nbGVNYXBzTmFtZUxpbmsobmFtZSkge1xyXG4gICAgY29uc3QgZW5jb2RlZE5hbWUgPSBlbmNvZGVVUkkobmFtZSk7XHJcbiAgICByZXR1cm4gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcz9xPScgKyBlbmNvZGVkTmFtZTtcclxuICB9XHJcbn1cclxuIl19