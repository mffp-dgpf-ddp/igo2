/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TileArcGISRestDataSource } from '../../datasource/shared/datasources/tilearcgisrest-datasource';
var TimeFilterService = /** @class */ (function () {
    function TimeFilterService() {
    }
    /**
     * @param {?} datasource
     * @param {?} date
     * @return {?}
     */
    TimeFilterService.prototype.filterByDate = /**
     * @param {?} datasource
     * @param {?} date
     * @return {?}
     */
    function (datasource, date) {
        /** @type {?} */
        var time;
        /** @type {?} */
        var newdateform;
        /** @type {?} */
        var newdateformStart;
        /** @type {?} */
        var newdateformEnd;
        if (Array.isArray(date)) {
            /** @type {?} */
            var dates = [];
            if (date[0]) {
                newdateformStart = this.reformatDateTime(date[0]);
                dates.push(date[0]);
            }
            if (date[1]) {
                newdateformEnd = this.reformatDateTime(date[1]);
                dates.push(date[1]);
            }
            if (dates.length === 2 && newdateformStart !== newdateformEnd) {
                if (datasource instanceof TileArcGISRestDataSource) {
                    time = newdateformStart + ',' + newdateformEnd;
                }
                else {
                    time = newdateformStart + '/' + newdateformEnd;
                }
            }
            if (newdateformStart === newdateformEnd) {
                time = newdateformStart;
            }
        }
        else if (date) {
            newdateform = this.reformatDateTime(date);
            time = newdateform;
        }
        /** @type {?} */
        var params = { time: time };
        datasource.ol.updateParams(params);
    };
    /**
     * @param {?} datasource
     * @param {?} year
     * @return {?}
     */
    TimeFilterService.prototype.filterByYear = /**
     * @param {?} datasource
     * @param {?} year
     * @return {?}
     */
    function (datasource, year) {
        /** @type {?} */
        var time;
        /** @type {?} */
        var newdateformStart;
        /** @type {?} */
        var newdateformEnd;
        if (Array.isArray(year)) {
            /** @type {?} */
            var years = [];
            if (year[0]) {
                newdateformStart = year[0];
                years.push(year[0]);
            }
            if (year[1]) {
                newdateformEnd = year[1];
                years.push(year[1]);
            }
            if (years.length === 2 && newdateformStart !== newdateformEnd) {
                if (datasource instanceof TileArcGISRestDataSource) {
                    time = newdateformStart + ',' + newdateformEnd;
                }
                else {
                    time = newdateformStart + '/' + newdateformEnd;
                }
            }
            if (newdateformStart === newdateformEnd) {
                time = newdateformStart;
            }
        }
        else if (year) {
            time = year;
        }
        /** @type {?} */
        var params = { time: time };
        datasource.ol.updateParams(params);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    TimeFilterService.prototype.reformatDateTime = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var year = value.getFullYear();
        /** @type {?} */
        var month = value.getMonth() + 1;
        /** @type {?} */
        var day = value.getUTCDate();
        /** @type {?} */
        var hour = value.getUTCHours();
        /** @type {?} */
        var minute = value.getUTCMinutes();
        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }
        if (Number(hour) < 10) {
            hour = '0' + hour;
        }
        if (Number(minute) < 10) {
            minute = '0' + minute;
        }
        return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00Z';
    };
    TimeFilterService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TimeFilterService.ctorParameters = function () { return []; };
    return TimeFilterService;
}());
export { TimeFilterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL3RpbWUtZmlsdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFFekc7SUFFRTtJQUFlLENBQUM7Ozs7OztJQUVoQix3Q0FBWTs7Ozs7SUFBWixVQUNFLFVBQW9ELEVBQ3BELElBQXlCOztZQUVyQixJQUFJOztZQUNKLFdBQVc7O1lBQ1gsZ0JBQWdCOztZQUNoQixjQUFjO1FBRWxCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7Z0JBQ2pCLEtBQUssR0FBRyxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNYLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQjtZQUNELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNYLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGdCQUFnQixLQUFLLGNBQWMsRUFBRTtnQkFDN0QsSUFBSSxVQUFVLFlBQVksd0JBQXdCLEVBQUU7b0JBQ2xELElBQUksR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcs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LENBQUM7U0FDdkI7UUFFRCxPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUM3RSxDQUFDOztnQkF0R0YsVUFBVTs7OztJQXVHWCx3QkFBQztDQUFBLEFBdkdELElBdUdDO1NBdEdZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy90aWxlYXJjZ2lzcmVzdC1kYXRhc291cmNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGZpbHRlckJ5RGF0ZShcclxuICAgIGRhdGFzb3VyY2U6IFdNU0RhdGFTb3VyY2UgfCBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgICBkYXRlOiBEYXRlIHwgW0RhdGUsIERhdGVdXHJcbiAgKSB7XHJcbiAgICBsZXQgdGltZTtcclxuICAgIGxldCBuZXdkYXRlZm9ybTtcclxuICAgIGxldCBuZXdkYXRlZm9ybVN0YXJ0O1xyXG4gICAgbGV0IG5ld2RhdGVmb3JtRW5kO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGUpKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVzID0gW107XHJcbiAgICAgIGlmIChkYXRlWzBdKSB7XHJcbiAgICAgICAgbmV3ZGF0ZWZvcm1TdGFydCA9IHRoaXMucmVmb3JtYXREYXRlVGltZShkYXRlWzBdKTtcclxuICAgICAgICBkYXRlcy5wdXNoKGRhdGVbMF0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRlWzFdKSB7XHJcbiAgICAgICAgbmV3ZGF0ZWZvcm1FbmQgPSB0aGlzLnJlZm9ybWF0RGF0ZVRpbWUoZGF0ZVsxXSk7XHJcbiAgICAgICAgZGF0ZXMucHVzaChkYXRlWzFdKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0ZXMubGVuZ3RoID09PSAyICYmIG5ld2RhdGVmb3JtU3RhcnQgIT09IG5ld2RhdGVmb3JtRW5kKSB7XHJcbiAgICAgICAgaWYgKGRhdGFzb3VyY2UgaW5zdGFuY2VvZiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UpIHtcclxuICAgICAgICAgIHRpbWUgPSBuZXdkYXRlZm9ybVN0YXJ0ICsgJywnICsgbmV3ZGF0ZWZvcm1FbmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRpbWUgPSBuZXdkYXRlZm9ybVN0YXJ0ICsgJy8nICsgbmV3ZGF0ZWZvcm1FbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdkYXRlZm9ybVN0YXJ0ID09PSBuZXdkYXRlZm9ybUVuZCkge1xyXG4gICAgICAgIHRpbWUgPSBuZXdkYXRlZm9ybVN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGUpIHtcclxuICAgICAgbmV3ZGF0ZWZvcm0gPSB0aGlzLnJlZm9ybWF0RGF0ZVRpbWUoZGF0ZSk7XHJcbiAgICAgIHRpbWUgPSBuZXdkYXRlZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXMgPSB7IHRpbWUgfTtcclxuICAgIGRhdGFzb3VyY2Uub2wudXBkYXRlUGFyYW1zKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJCeVllYXIoXHJcbiAgICBkYXRhc291cmNlOiBXTVNEYXRhU291cmNlIHwgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gICAgeWVhcjogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXVxyXG4gICkge1xyXG4gICAgbGV0IHRpbWU7XHJcbiAgICBsZXQgbmV3ZGF0ZWZvcm1TdGFydDtcclxuICAgIGxldCBuZXdkYXRlZm9ybUVuZDtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh5ZWFyKSkge1xyXG4gICAgICBjb25zdCB5ZWFycyA9IFtdO1xyXG4gICAgICBpZiAoeWVhclswXSkge1xyXG4gICAgICAgIG5ld2RhdGVmb3JtU3RhcnQgPSB5ZWFyWzBdO1xyXG4gICAgICAgIHllYXJzLnB1c2goeWVhclswXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHllYXJbMV0pIHtcclxuICAgICAgICBuZXdkYXRlZm9ybUVuZCA9IHllYXJbMV07XHJcbiAgICAgICAgeWVhcnMucHVzaCh5ZWFyWzFdKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoeWVhcnMubGVuZ3RoID09PSAyICYmIG5ld2RhdGVmb3JtU3RhcnQgIT09IG5ld2RhdGVmb3JtRW5kKSB7XHJcbiAgICAgICAgaWYgKGRhdGFzb3VyY2UgaW5zdGFuY2VvZiBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UpIHtcclxuICAgICAgICAgIHRpbWUgPSBuZXdkYXRlZm9ybVN0YXJ0ICsgJywnICsgbmV3ZGF0ZWZvcm1FbmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRpbWUgPSBuZXdkYXRlZm9ybVN0YXJ0ICsgJy8nICsgbmV3ZGF0ZWZvcm1FbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdkYXRlZm9ybVN0YXJ0ID09PSBuZXdkYXRlZm9ybUVuZCkge1xyXG4gICAgICAgIHRpbWUgPSBuZXdkYXRlZm9ybVN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHllYXIpIHtcclxuICAgICAgdGltZSA9IHllYXI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zID0geyB0aW1lIH07XHJcbiAgICBkYXRhc291cmNlLm9sLnVwZGF0ZVBhcmFtcyhwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZvcm1hdERhdGVUaW1lKHZhbHVlKSB7XHJcbiAgICBjb25zdCB5ZWFyID0gdmFsdWUuZ2V0RnVsbFllYXIoKTtcclxuICAgIGxldCBtb250aCA9IHZhbHVlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgbGV0IGRheSA9IHZhbHVlLmdldFVUQ0RhdGUoKTtcclxuICAgIGxldCBob3VyID0gdmFsdWUuZ2V0VVRDSG91cnMoKTtcclxuICAgIGxldCBtaW51dGUgPSB2YWx1ZS5nZXRVVENNaW51dGVzKCk7XHJcblxyXG4gICAgaWYgKE51bWJlcihtb250aCkgPCAxMCkge1xyXG4gICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChOdW1iZXIoZGF5KSA8IDEwKSB7XHJcbiAgICAgIGRheSA9ICcwJyArIGRheTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTnVtYmVyKGhvdXIpIDwgMTApIHtcclxuICAgICAgaG91ciA9ICcwJyArIGhvdXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE51bWJlcihtaW51dGUpIDwgMTApIHtcclxuICAgICAgbWludXRlID0gJzAnICsgbWludXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXkgKyAnVCcgKyBob3VyICsgJzonICsgbWludXRlICsgJzowMFonO1xyXG4gIH1cclxufVxyXG4iXX0=