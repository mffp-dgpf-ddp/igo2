/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class OsmLinks {
    /**
     * @param {?} lon
     * @param {?} lat
     * @param {?=} zoom
     * @return {?}
     */
    static getOpenStreetMapLink(lon, lat, zoom = 17) {
        // return 'https://www.google.com/maps?q=' + lat + ',' + lon;
        return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;
    }
    /**
     * @param {?} lon
     * @param {?} lat
     * @param {?=} zoom
     * @return {?}
     */
    static getOpenStreetCamLink(lon, lat, zoom = 17) {
        return `https://openstreetcam.org/map/@${lat},${lon},${zoom}z`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtTGlua3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvdXRpbHMvb3NtTGlua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxRQUFROzs7Ozs7O0lBQ25CLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQWUsRUFBRTtRQUNyRCw2REFBNkQ7UUFDN0QsT0FBUSx1Q0FBdUMsR0FBRyxTQUFTLEdBQUcsUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzdGLENBQUM7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFlLEVBQUU7UUFDckQsT0FBUSxrQ0FBa0MsR0FBRyxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQztJQUNsRSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgT3NtTGlua3Mge1xyXG4gIHN0YXRpYyBnZXRPcGVuU3RyZWV0TWFwTGluayhsb24sIGxhdCwgem9vbTogbnVtYmVyID0gMTcpIHtcclxuICAgIC8vIHJldHVybiAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzP3E9JyArIGxhdCArICcsJyArIGxvbjtcclxuICAgIHJldHVybiAgYGh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnLz9tbGF0PSR7bGF0fSZtbG9uPSR7bG9ufSNtYXA9JHt6b29tfS8ke2xhdH0vJHtsb259YDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRPcGVuU3RyZWV0Q2FtTGluayhsb24sIGxhdCwgem9vbTogbnVtYmVyID0gMTcpIHtcclxuICAgIHJldHVybiAgYGh0dHBzOi8vb3BlbnN0cmVldGNhbS5vcmcvbWFwL0Ake2xhdH0sJHtsb259LCR7em9vbX16YDtcclxuICB9XHJcbn1cclxuIl19