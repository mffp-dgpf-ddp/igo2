/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceVector from 'ol/source/Vector';
import olFormatEsriJSON from 'ol/format/EsriJSON';
import * as olloadingstrategy from 'ol/loadingstrategy';
import { DataSource } from './datasource';
var ArcGISRestDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(ArcGISRestDataSource, _super);
    function ArcGISRestDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    ArcGISRestDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var esrijsonFormat = new olFormatEsriJSON();
        return new olSourceVector({
            attributions: this.options.params.attributions,
            overlaps: false,
            format: esrijsonFormat,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            function (extent, resolution, proj) {
                /** @type {?} */
                var baseUrl = this.options.url + '/' + this.options.layer + '/query/';
                /** @type {?} */
                var geometry = encodeURIComponent('{"xmin":' +
                    extent[0] +
                    ',"ymin":' +
                    extent[1] +
                    ',"xmax":' +
                    extent[2] +
                    ',"ymax":' +
                    extent[3] +
                    ',"spatialReference":{"wkid":102100}}');
                /** @type {?} */
                var params = [
                    'f=json',
                    "geometry=" + geometry,
                    'geometryType=esriGeometryEnvelope',
                    'inSR=102100',
                    'spatialRel=esriSpatialRelIntersects',
                    'outFields=*',
                    'returnGeometry=true',
                    'outSR=102100'
                ];
                if (this.options.params.timeFilter) {
                    /** @type {?} */
                    var time = "time=" + this.options.params.timeExtent;
                    params.push(time);
                }
                if (this.options.params.customParams) {
                    this.options.params.customParams.forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    function (element) {
                        params.push(element);
                    }));
                }
                return baseUrl + "?" + params.join('&');
            }).bind(this),
            strategy: olloadingstrategy.bbox
        });
    };
    /**
     * @return {?}
     */
    ArcGISRestDataSource.prototype.getLegend = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var legendInfo = this.options.params.legendInfo;
        /** @type {?} */
        var legend = _super.prototype.getLegend.call(this);
        if (legendInfo === undefined || legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        var id = parseInt(this.options.layer, 10);
        /** @type {?} */
        var lyr = legendInfo.layers[id];
        /** @type {?} */
        var htmlString = '<table><tr><td>' + lyr.layerName + '</td></tr>';
        try {
            for (var _b = tslib_1.__values(lyr.legend), _c = _b.next(); !_c.done; _c = _b.next()) {
                var lyrLegend = _c.value;
                /** @type {?} */
                var modifiedUrl = this.options.url.replace('FeatureServer', 'MapServer');
                /** @type {?} */
                var src = modifiedUrl + "/" + lyr.layerId + "/images/" + lyrLegend.url;
                /** @type {?} */
                var label = lyrLegend.label.replace('<Null>', 'Null');
                htmlString +=
                    "<tr><td align='left'><img src=\"" +
                        src +
                        "\" alt ='' /></td><td>" +
                        label +
                        '</td></tr>';
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        htmlString += '</table>';
        return [{ html: htmlString }];
    };
    return ArcGISRestDataSource;
}(DataSource));
export { ArcGISRestDataSource };
if (false) {
    /** @type {?} */
    ArcGISRestDataSource.prototype.ol;
    /** @type {?} */
    ArcGISRestDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjZ2lzcmVzdC1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxLQUFLLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBRXhELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJMUM7SUFBMEMsZ0RBQVU7SUFBcEQ7O0lBMkVBLENBQUM7Ozs7O0lBdkVXLDZDQUFjOzs7O0lBQXhCOztZQUNRLGNBQWMsR0FBRyxJQUFJLGdCQUFnQixFQUFFO1FBQzdDLE9BQU8sSUFBSSxjQUFjLENBQUM7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVk7WUFDOUMsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsY0FBYztZQUN0QixHQUFHLEVBQUU7Ozs7OztZQUFBLFVBQVMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJOztvQkFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTOztvQkFDakUsUUFBUSxHQUFHLGtCQUFrQixDQUNqQyxVQUFVO29CQUNSLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVTtvQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULFVBQVU7b0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxVQUFVO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1Qsc0NBQXNDLENBQ3pDOztvQkFDSyxNQUFNLEdBQUc7b0JBQ2IsUUFBUTtvQkFDUixjQUFZLFFBQVU7b0JBQ3RCLG1DQUFtQztvQkFDbkMsYUFBYTtvQkFDYixxQ0FBcUM7b0JBQ3JDLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQixjQUFjO2lCQUNmO2dCQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFOzt3QkFDNUIsSUFBSSxHQUFHLFVBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBWTtvQkFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsT0FBTzt3QkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkIsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7Z0JBQ0QsT0FBVSxPQUFPLFNBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQztZQUMxQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNaLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCx3Q0FBUzs7O0lBQVQ7OztZQUNRLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVOztZQUMzQyxNQUFNLEdBQUcsaUJBQU0sU0FBUyxXQUFFO1FBQ2hDLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRCxPQUFPLE1BQU0sQ0FBQztTQUNmOztZQUNLLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztZQUNyQyxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7O1lBQzdCLFVBQVUsR0FBRyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVk7O1lBRWpFLEtBQXdCLElBQUEsS0FBQSxpQkFBQSxHQUFHLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO2dCQUEvQixJQUFNLFNBQVMsV0FBQTs7b0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDMUMsZUFBZSxFQUNmLFdBQVcsQ0FDWjs7b0JBQ0ssR0FBRyxHQUFNLFdBQVcsU0FBSSxHQUFHLENBQUMsT0FBTyxnQkFBVyxTQUFTLENBQUMsR0FBSzs7b0JBQzdELEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUN2RCxVQUFVO29CQUNSLGtDQUFpQzt3QkFDakMsR0FBRzt3QkFDSCx3QkFBdUI7d0JBQ3ZCLEtBQUs7d0JBQ0wsWUFBWSxDQUFDO2FBQ2hCOzs7Ozs7Ozs7UUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUEzRUQsQ0FBMEMsVUFBVSxHQTJFbkQ7Ozs7SUExRUMsa0NBQTBCOztJQUMxQix1Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCBvbEZvcm1hdEVzcmlKU09OIGZyb20gJ29sL2Zvcm1hdC9Fc3JpSlNPTic7XHJcbmltcG9ydCAqIGFzIG9sbG9hZGluZ3N0cmF0ZWd5IGZyb20gJ29sL2xvYWRpbmdzdHJhdGVneSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnMgfSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9hcmNnaXNyZXN0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcmNHSVNSZXN0RGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VWZWN0b3I7XHJcbiAgcHVibGljIG9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yIHtcclxuICAgIGNvbnN0IGVzcmlqc29uRm9ybWF0ID0gbmV3IG9sRm9ybWF0RXNyaUpTT04oKTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xyXG4gICAgICBhdHRyaWJ1dGlvbnM6IHRoaXMub3B0aW9ucy5wYXJhbXMuYXR0cmlidXRpb25zLFxyXG4gICAgICBvdmVybGFwczogZmFsc2UsXHJcbiAgICAgIGZvcm1hdDogZXNyaWpzb25Gb3JtYXQsXHJcbiAgICAgIHVybDogZnVuY3Rpb24oZXh0ZW50LCByZXNvbHV0aW9uLCBwcm9qKSB7XHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHRoaXMub3B0aW9ucy51cmwgKyAnLycgKyB0aGlzLm9wdGlvbnMubGF5ZXIgKyAnL3F1ZXJ5Lyc7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICAne1wieG1pblwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMF0gK1xyXG4gICAgICAgICAgICAnLFwieW1pblwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMV0gK1xyXG4gICAgICAgICAgICAnLFwieG1heFwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMl0gK1xyXG4gICAgICAgICAgICAnLFwieW1heFwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbM10gK1xyXG4gICAgICAgICAgICAnLFwic3BhdGlhbFJlZmVyZW5jZVwiOntcIndraWRcIjoxMDIxMDB9fSdcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtcclxuICAgICAgICAgICdmPWpzb24nLFxyXG4gICAgICAgICAgYGdlb21ldHJ5PSR7Z2VvbWV0cnl9YCxcclxuICAgICAgICAgICdnZW9tZXRyeVR5cGU9ZXNyaUdlb21ldHJ5RW52ZWxvcGUnLFxyXG4gICAgICAgICAgJ2luU1I9MTAyMTAwJyxcclxuICAgICAgICAgICdzcGF0aWFsUmVsPWVzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cycsXHJcbiAgICAgICAgICAnb3V0RmllbGRzPSonLFxyXG4gICAgICAgICAgJ3JldHVybkdlb21ldHJ5PXRydWUnLFxyXG4gICAgICAgICAgJ291dFNSPTEwMjEwMCdcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zLnRpbWVGaWx0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IHRpbWUgPSBgdGltZT0ke3RoaXMub3B0aW9ucy5wYXJhbXMudGltZUV4dGVudH1gO1xyXG4gICAgICAgICAgcGFyYW1zLnB1c2godGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zLmN1c3RvbVBhcmFtcykge1xyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcy5jdXN0b21QYXJhbXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke2Jhc2VVcmx9PyR7cGFyYW1zLmpvaW4oJyYnKX1gO1xyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgIHN0cmF0ZWd5OiBvbGxvYWRpbmdzdHJhdGVneS5iYm94XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZCgpOiBEYXRhU291cmNlTGVnZW5kT3B0aW9uc1tdIHtcclxuICAgIGNvbnN0IGxlZ2VuZEluZm8gPSB0aGlzLm9wdGlvbnMucGFyYW1zLmxlZ2VuZEluZm87XHJcbiAgICBjb25zdCBsZWdlbmQgPSBzdXBlci5nZXRMZWdlbmQoKTtcclxuICAgIGlmIChsZWdlbmRJbmZvID09PSB1bmRlZmluZWQgfHwgbGVnZW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQodGhpcy5vcHRpb25zLmxheWVyLCAxMCk7XHJcbiAgICBjb25zdCBseXIgPSBsZWdlbmRJbmZvLmxheWVyc1tpZF07XHJcbiAgICBsZXQgaHRtbFN0cmluZyA9ICc8dGFibGU+PHRyPjx0ZD4nICsgbHlyLmxheWVyTmFtZSArICc8L3RkPjwvdHI+JztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGx5ckxlZ2VuZCBvZiBseXIubGVnZW5kKSB7XHJcbiAgICAgIGNvbnN0IG1vZGlmaWVkVXJsID0gdGhpcy5vcHRpb25zLnVybC5yZXBsYWNlKFxyXG4gICAgICAgICdGZWF0dXJlU2VydmVyJyxcclxuICAgICAgICAnTWFwU2VydmVyJ1xyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBzcmMgPSBgJHttb2RpZmllZFVybH0vJHtseXIubGF5ZXJJZH0vaW1hZ2VzLyR7bHlyTGVnZW5kLnVybH1gO1xyXG4gICAgICBjb25zdCBsYWJlbCA9IGx5ckxlZ2VuZC5sYWJlbC5yZXBsYWNlKCc8TnVsbD4nLCAnTnVsbCcpO1xyXG4gICAgICBodG1sU3RyaW5nICs9XHJcbiAgICAgICAgYDx0cj48dGQgYWxpZ249J2xlZnQnPjxpbWcgc3JjPVwiYCArXHJcbiAgICAgICAgc3JjICtcclxuICAgICAgICBgXCIgYWx0ID0nJyAvPjwvdGQ+PHRkPmAgK1xyXG4gICAgICAgIGxhYmVsICtcclxuICAgICAgICAnPC90ZD48L3RyPic7XHJcbiAgICB9XHJcbiAgICBodG1sU3RyaW5nICs9ICc8L3RhYmxlPic7XHJcbiAgICByZXR1cm4gW3sgaHRtbDogaHRtbFN0cmluZyB9XTtcclxuICB9XHJcbn1cclxuIl19