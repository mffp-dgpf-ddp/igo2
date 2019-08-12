/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TileArcGISRestDataSource } from '../../datasource/shared/datasources/tilearcgisrest-datasource';
export class TimeFilterService {
    constructor() { }
    /**
     * @param {?} datasource
     * @param {?} date
     * @return {?}
     */
    filterByDate(datasource, date) {
        /** @type {?} */
        let time;
        /** @type {?} */
        let newdateform;
        /** @type {?} */
        let newdateformStart;
        /** @type {?} */
        let newdateformEnd;
        if (Array.isArray(date)) {
            /** @type {?} */
            const dates = [];
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
        const params = { time };
        datasource.ol.updateParams(params);
    }
    /**
     * @param {?} datasource
     * @param {?} year
     * @return {?}
     */
    filterByYear(datasource, year) {
        /** @type {?} */
        let time;
        /** @type {?} */
        let newdateformStart;
        /** @type {?} */
        let newdateformEnd;
        if (Array.isArray(year)) {
            /** @type {?} */
            const years = [];
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
        const params = { time };
        datasource.ol.updateParams(params);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    reformatDateTime(value) {
        /** @type {?} */
        const year = value.getFullYear();
        /** @type {?} */
        let month = value.getMonth() + 1;
        /** @type {?} */
        let day = value.getUTCDate();
        /** @type {?} */
        let hour = value.getUTCHours();
        /** @type {?} */
        let minute = value.getUTCMinutes();
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
    }
}
TimeFilterService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TimeFilterService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvc2hhcmVkL3RpbWUtZmlsdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFHekcsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixnQkFBZSxDQUFDOzs7Ozs7SUFFaEIsWUFBWSxDQUNWLFVBQW9ELEVBQ3BELElBQXlCOztZQUVyQixJQUFJOztZQUNKLFdBQVc7O1lBQ1gsZ0JBQWdCOztZQUNoQixjQUFjO1FBRWxCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7a0JBQ2pCLEtBQUssR0FBRyxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNYLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQjtZQUNELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNYLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGdCQUFnQixLQUFLLGNBQWMsRUFBRTtnQkFDN0QsSUFBSSxVQUFVLFlBQVksd0JBQXdCLEVBQUU7b0JBQ2xELElBQUksR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDO2lCQUNoRDtxQkFBTTtvQkFDTCxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQztpQkFDaEQ7YUFDRjtZQUNELElBQUksZ0JBQWdCLEtBQUssY0FBYyxFQUFFO2dCQUN2QyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7YUFDekI7U0FDRjthQUFNLElBQUksSUFBSSxFQUFFO1lBQ2YsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1NBQ3BCOztjQUVLLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRTtRQUN2QixVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFRCxZQUFZLENBQ1YsVUFBb0QsRUFDcEQsSUFBK0I7O1lBRTNCLElBQUk7O1lBQ0osZ0JBQWdCOztZQUNoQixjQUFjO1FBRWxCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7a0JBQ2pCLEtBQUssR0FBRyxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNYLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQjtZQUNELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNYLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGdCQUFnQixLQUFLLGNBQWMsRUFBRTtnQkFDN0QsSUFBSSxVQUFVLFlBQVksd0JBQXdCLEVBQUU7b0JBQ2xELElBQUksR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDO2lCQUNoRDtxQkFBTTtvQkFDTCxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQztpQkFDaEQ7YUFDRjtZQUNELElBQUksZ0JBQWdCLEtBQUssY0FBYyxFQUFFO2dCQUN2QyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7YUFDekI7U0FDRjthQUFNLElBQUksSUFBSSxFQUFFO1lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNiOztjQUVLLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRTtRQUN2QixVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxLQUFLOztjQUN0QixJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRTs7WUFDNUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDOztZQUM1QixHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRTs7WUFDeEIsSUFBSSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUU7O1lBQzFCLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFO1FBRWxDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QixLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNyQjtRQUVELElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNqQjtRQUVELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNyQixJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNuQjtRQUVELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN2QixNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztTQUN2QjtRQUVELE9BQU8sSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQzdFLENBQUM7OztZQXRHRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3RpbGVhcmNnaXNyZXN0LWRhdGFzb3VyY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGltZUZpbHRlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgZmlsdGVyQnlEYXRlKFxyXG4gICAgZGF0YXNvdXJjZTogV01TRGF0YVNvdXJjZSB8IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICAgIGRhdGU6IERhdGUgfCBbRGF0ZSwgRGF0ZV1cclxuICApIHtcclxuICAgIGxldCB0aW1lO1xyXG4gICAgbGV0IG5ld2RhdGVmb3JtO1xyXG4gICAgbGV0IG5ld2RhdGVmb3JtU3RhcnQ7XHJcbiAgICBsZXQgbmV3ZGF0ZWZvcm1FbmQ7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZSkpIHtcclxuICAgICAgY29uc3QgZGF0ZXMgPSBbXTtcclxuICAgICAgaWYgKGRhdGVbMF0pIHtcclxuICAgICAgICBuZXdkYXRlZm9ybVN0YXJ0ID0gdGhpcy5yZWZvcm1hdERhdGVUaW1lKGRhdGVbMF0pO1xyXG4gICAgICAgIGRhdGVzLnB1c2goZGF0ZVswXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRhdGVbMV0pIHtcclxuICAgICAgICBuZXdkYXRlZm9ybUVuZCA9IHRoaXMucmVmb3JtYXREYXRlVGltZShkYXRlWzFdKTtcclxuICAgICAgICBkYXRlcy5wdXNoKGRhdGVbMV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRlcy5sZW5ndGggPT09IDIgJiYgbmV3ZGF0ZWZvcm1TdGFydCAhPT0gbmV3ZGF0ZWZvcm1FbmQpIHtcclxuICAgICAgICBpZiAoZGF0YXNvdXJjZSBpbnN0YW5jZW9mIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgdGltZSA9IG5ld2RhdGVmb3JtU3RhcnQgKyAnLCcgKyBuZXdkYXRlZm9ybUVuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGltZSA9IG5ld2RhdGVmb3JtU3RhcnQgKyAnLycgKyBuZXdkYXRlZm9ybUVuZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld2RhdGVmb3JtU3RhcnQgPT09IG5ld2RhdGVmb3JtRW5kKSB7XHJcbiAgICAgICAgdGltZSA9IG5ld2RhdGVmb3JtU3RhcnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0ZSkge1xyXG4gICAgICBuZXdkYXRlZm9ybSA9IHRoaXMucmVmb3JtYXREYXRlVGltZShkYXRlKTtcclxuICAgICAgdGltZSA9IG5ld2RhdGVmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgdGltZSB9O1xyXG4gICAgZGF0YXNvdXJjZS5vbC51cGRhdGVQYXJhbXMocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIGZpbHRlckJ5WWVhcihcclxuICAgIGRhdGFzb3VyY2U6IFdNU0RhdGFTb3VyY2UgfCBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgICB5ZWFyOiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddXHJcbiAgKSB7XHJcbiAgICBsZXQgdGltZTtcclxuICAgIGxldCBuZXdkYXRlZm9ybVN0YXJ0O1xyXG4gICAgbGV0IG5ld2RhdGVmb3JtRW5kO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHllYXIpKSB7XHJcbiAgICAgIGNvbnN0IHllYXJzID0gW107XHJcbiAgICAgIGlmICh5ZWFyWzBdKSB7XHJcbiAgICAgICAgbmV3ZGF0ZWZvcm1TdGFydCA9IHllYXJbMF07XHJcbiAgICAgICAgeWVhcnMucHVzaCh5ZWFyWzBdKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoeWVhclsxXSkge1xyXG4gICAgICAgIG5ld2RhdGVmb3JtRW5kID0geWVhclsxXTtcclxuICAgICAgICB5ZWFycy5wdXNoKHllYXJbMV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh5ZWFycy5sZW5ndGggPT09IDIgJiYgbmV3ZGF0ZWZvcm1TdGFydCAhPT0gbmV3ZGF0ZWZvcm1FbmQpIHtcclxuICAgICAgICBpZiAoZGF0YXNvdXJjZSBpbnN0YW5jZW9mIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgdGltZSA9IG5ld2RhdGVmb3JtU3RhcnQgKyAnLCcgKyBuZXdkYXRlZm9ybUVuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGltZSA9IG5ld2RhdGVmb3JtU3RhcnQgKyAnLycgKyBuZXdkYXRlZm9ybUVuZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld2RhdGVmb3JtU3RhcnQgPT09IG5ld2RhdGVmb3JtRW5kKSB7XHJcbiAgICAgICAgdGltZSA9IG5ld2RhdGVmb3JtU3RhcnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoeWVhcikge1xyXG4gICAgICB0aW1lID0geWVhcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXMgPSB7IHRpbWUgfTtcclxuICAgIGRhdGFzb3VyY2Uub2wudXBkYXRlUGFyYW1zKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZm9ybWF0RGF0ZVRpbWUodmFsdWUpIHtcclxuICAgIGNvbnN0IHllYXIgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IG1vbnRoID0gdmFsdWUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBsZXQgZGF5ID0gdmFsdWUuZ2V0VVRDRGF0ZSgpO1xyXG4gICAgbGV0IGhvdXIgPSB2YWx1ZS5nZXRVVENIb3VycygpO1xyXG4gICAgbGV0IG1pbnV0ZSA9IHZhbHVlLmdldFVUQ01pbnV0ZXMoKTtcclxuXHJcbiAgICBpZiAoTnVtYmVyKG1vbnRoKSA8IDEwKSB7XHJcbiAgICAgIG1vbnRoID0gJzAnICsgbW9udGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE51bWJlcihkYXkpIDwgMTApIHtcclxuICAgICAgZGF5ID0gJzAnICsgZGF5O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChOdW1iZXIoaG91cikgPCAxMCkge1xyXG4gICAgICBob3VyID0gJzAnICsgaG91cjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTnVtYmVyKG1pbnV0ZSkgPCAxMCkge1xyXG4gICAgICBtaW51dGUgPSAnMCcgKyBtaW51dGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheSArICdUJyArIGhvdXIgKyAnOicgKyBtaW51dGUgKyAnOjAwWic7XHJcbiAgfVxyXG59XHJcbiJdfQ==