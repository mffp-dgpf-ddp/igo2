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
    /**
     * @return {?}
     */
    ArcGISRestDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return ArcGISRestDataSource;
}(DataSource));
export { ArcGISRestDataSource };
if (false) {
    /** @type {?} */
    ArcGISRestDataSource.prototype.ol;
    /** @type {?} */
    ArcGISRestDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjZ2lzcmVzdC1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxLQUFLLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBRXhELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJMUM7SUFBMEMsZ0RBQVU7SUFBcEQ7O0lBNkVBLENBQUM7Ozs7O0lBekVXLDZDQUFjOzs7O0lBQXhCOztZQUNRLGNBQWMsR0FBRyxJQUFJLGdCQUFnQixFQUFFO1FBQzdDLE9BQU8sSUFBSSxjQUFjLENBQUM7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVk7WUFDOUMsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsY0FBYztZQUN0QixHQUFHLEVBQUU7Ozs7OztZQUFBLFVBQVMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJOztvQkFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTOztvQkFDakUsUUFBUSxHQUFHLGtCQUFrQixDQUNqQyxVQUFVO29CQUNSLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVTtvQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULFVBQVU7b0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxVQUFVO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1Qsc0NBQXNDLENBQ3pDOztvQkFDSyxNQUFNLEdBQUc7b0JBQ2IsUUFBUTtvQkFDUixjQUFZLFFBQVU7b0JBQ3RCLG1DQUFtQztvQkFDbkMsYUFBYTtvQkFDYixxQ0FBcUM7b0JBQ3JDLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQixjQUFjO2lCQUNmO2dCQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFOzt3QkFDNUIsSUFBSSxHQUFHLFVBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBWTtvQkFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsT0FBTzt3QkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkIsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7Z0JBQ0QsT0FBVSxPQUFPLFNBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQztZQUMxQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNaLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCx3Q0FBUzs7O0lBQVQ7OztZQUNRLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVOztZQUMzQyxNQUFNLEdBQUcsaUJBQU0sU0FBUyxXQUFFO1FBQ2hDLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRCxPQUFPLE1BQU0sQ0FBQztTQUNmOztZQUNLLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztZQUNyQyxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7O1lBQzdCLFVBQVUsR0FBRyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVk7O1lBRWpFLEtBQXdCLElBQUEsS0FBQSxpQkFBQSxHQUFHLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO2dCQUEvQixJQUFNLFNBQVMsV0FBQTs7b0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDMUMsZUFBZSxFQUNmLFdBQVcsQ0FDWjs7b0JBQ0ssR0FBRyxHQUFNLFdBQVcsU0FBSSxHQUFHLENBQUMsT0FBTyxnQkFBVyxTQUFTLENBQUMsR0FBSzs7b0JBQzdELEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUN2RCxVQUFVO29CQUNSLGtDQUFpQzt3QkFDakMsR0FBRzt3QkFDSCx3QkFBdUI7d0JBQ3ZCLEtBQUs7d0JBQ0wsWUFBWSxDQUFDO2FBQ2hCOzs7Ozs7Ozs7UUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFTSx3Q0FBUzs7O0lBQWhCLGNBQW9CLENBQUM7SUFDdkIsMkJBQUM7QUFBRCxDQUFDLEFBN0VELENBQTBDLFVBQVUsR0E2RW5EOzs7O0lBNUVDLGtDQUEwQjs7SUFDMUIsdUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgb2xGb3JtYXRFc3JpSlNPTiBmcm9tICdvbC9mb3JtYXQvRXNyaUpTT04nO1xyXG5pbXBvcnQgKiBhcyBvbGxvYWRpbmdzdHJhdGVneSBmcm9tICdvbC9sb2FkaW5nc3RyYXRlZ3knO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vYXJjZ2lzcmVzdC1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXJjR0lTUmVzdERhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVmVjdG9yO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVZlY3RvciB7XHJcbiAgICBjb25zdCBlc3JpanNvbkZvcm1hdCA9IG5ldyBvbEZvcm1hdEVzcmlKU09OKCk7XHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlVmVjdG9yKHtcclxuICAgICAgYXR0cmlidXRpb25zOiB0aGlzLm9wdGlvbnMucGFyYW1zLmF0dHJpYnV0aW9ucyxcclxuICAgICAgb3ZlcmxhcHM6IGZhbHNlLFxyXG4gICAgICBmb3JtYXQ6IGVzcmlqc29uRm9ybWF0LFxyXG4gICAgICB1cmw6IGZ1bmN0aW9uKGV4dGVudCwgcmVzb2x1dGlvbiwgcHJvaikge1xyXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLm9wdGlvbnMudXJsICsgJy8nICsgdGhpcy5vcHRpb25zLmxheWVyICsgJy9xdWVyeS8nO1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgJ3tcInhtaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzBdICtcclxuICAgICAgICAgICAgJyxcInltaW5cIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzFdICtcclxuICAgICAgICAgICAgJyxcInhtYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzJdICtcclxuICAgICAgICAgICAgJyxcInltYXhcIjonICtcclxuICAgICAgICAgICAgZXh0ZW50WzNdICtcclxuICAgICAgICAgICAgJyxcInNwYXRpYWxSZWZlcmVuY2VcIjp7XCJ3a2lkXCI6MTAyMTAwfX0nXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAnZj1qc29uJyxcclxuICAgICAgICAgIGBnZW9tZXRyeT0ke2dlb21ldHJ5fWAsXHJcbiAgICAgICAgICAnZ2VvbWV0cnlUeXBlPWVzcmlHZW9tZXRyeUVudmVsb3BlJyxcclxuICAgICAgICAgICdpblNSPTEwMjEwMCcsXHJcbiAgICAgICAgICAnc3BhdGlhbFJlbD1lc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnLFxyXG4gICAgICAgICAgJ291dEZpZWxkcz0qJyxcclxuICAgICAgICAgICdyZXR1cm5HZW9tZXRyeT10cnVlJyxcclxuICAgICAgICAgICdvdXRTUj0xMDIxMDAnXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFtcy50aW1lRmlsdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCB0aW1lID0gYHRpbWU9JHt0aGlzLm9wdGlvbnMucGFyYW1zLnRpbWVFeHRlbnR9YDtcclxuICAgICAgICAgIHBhcmFtcy5wdXNoKHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFtcy5jdXN0b21QYXJhbXMpIHtcclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5wYXJhbXMuY3VzdG9tUGFyYW1zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHtiYXNlVXJsfT8ke3BhcmFtcy5qb2luKCcmJyl9YDtcclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICBzdHJhdGVneTogb2xsb2FkaW5nc3RyYXRlZ3kuYmJveFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmQoKTogRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnNbXSB7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gdGhpcy5vcHRpb25zLnBhcmFtcy5sZWdlbmRJbmZvO1xyXG4gICAgY29uc3QgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAobGVnZW5kSW5mbyA9PT0gdW5kZWZpbmVkIHx8IGxlZ2VuZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy5sYXllciwgMTApO1xyXG4gICAgY29uc3QgbHlyID0gbGVnZW5kSW5mby5sYXllcnNbaWRdO1xyXG4gICAgbGV0IGh0bWxTdHJpbmcgPSAnPHRhYmxlPjx0cj48dGQ+JyArIGx5ci5sYXllck5hbWUgKyAnPC90ZD48L3RyPic7XHJcblxyXG4gICAgZm9yIChjb25zdCBseXJMZWdlbmQgb2YgbHlyLmxlZ2VuZCkge1xyXG4gICAgICBjb25zdCBtb2RpZmllZFVybCA9IHRoaXMub3B0aW9ucy51cmwucmVwbGFjZShcclxuICAgICAgICAnRmVhdHVyZVNlcnZlcicsXHJcbiAgICAgICAgJ01hcFNlcnZlcidcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgc3JjID0gYCR7bW9kaWZpZWRVcmx9LyR7bHlyLmxheWVySWR9L2ltYWdlcy8ke2x5ckxlZ2VuZC51cmx9YDtcclxuICAgICAgY29uc3QgbGFiZWwgPSBseXJMZWdlbmQubGFiZWwucmVwbGFjZSgnPE51bGw+JywgJ051bGwnKTtcclxuICAgICAgaHRtbFN0cmluZyArPVxyXG4gICAgICAgIGA8dHI+PHRkIGFsaWduPSdsZWZ0Jz48aW1nIHNyYz1cImAgK1xyXG4gICAgICAgIHNyYyArXHJcbiAgICAgICAgYFwiIGFsdCA9JycgLz48L3RkPjx0ZD5gICtcclxuICAgICAgICBsYWJlbCArXHJcbiAgICAgICAgJzwvdGQ+PC90cj4nO1xyXG4gICAgfVxyXG4gICAgaHRtbFN0cmluZyArPSAnPC90YWJsZT4nO1xyXG4gICAgcmV0dXJuIFt7IGh0bWw6IGh0bWxTdHJpbmcgfV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=