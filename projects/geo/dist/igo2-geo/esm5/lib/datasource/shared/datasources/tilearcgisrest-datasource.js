/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceTileArcGISRest from 'ol/source/TileArcGISRest';
import { DataSource } from './datasource';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
var TileArcGISRestDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(TileArcGISRestDataSource, _super);
    function TileArcGISRestDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TileArcGISRestDataSource.prototype, "params", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.options.params));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileArcGISRestDataSource.prototype, "queryTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.options))).queryTitle
                ? ((/** @type {?} */ (this.options))).queryTitle
                : 'title';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileArcGISRestDataSource.prototype, "mapLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.options))).mapLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileArcGISRestDataSource.prototype, "queryHtmlTarget", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.options))).queryHtmlTarget
                ? ((/** @type {?} */ (this.options))).queryHtmlTarget
                : QueryHtmlTarget.BLANK;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @return {?}
     */
    TileArcGISRestDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        return new olSourceTileArcGISRest(this.options);
    };
    /**
     * @return {?}
     */
    TileArcGISRestDataSource.prototype.getLegend = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var legend = _super.prototype.getLegend.call(this);
        if (this.options.legendInfo === undefined || legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        var id = parseInt(this.options.layer, 10);
        /** @type {?} */
        var lyr = this.options.legendInfo.layers[id];
        /** @type {?} */
        var htmlString = '<table><tr><td>' + lyr.layerName + '</td></tr>';
        try {
            for (var _b = tslib_1.__values(lyr.legend), _c = _b.next(); !_c.done; _c = _b.next()) {
                var lyrLegend = _c.value;
                /** @type {?} */
                var src = this.options.url + "/" + lyr.layerId + "/images/" + lyrLegend.url;
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
    TileArcGISRestDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return TileArcGISRestDataSource;
}(DataSource));
export { TileArcGISRestDataSource };
if (false) {
    /** @type {?} */
    TileArcGISRestDataSource.prototype.ol;
    /** @type {?} */
    TileArcGISRestDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy90aWxlYXJjZ2lzcmVzdC1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxzQkFBc0IsTUFBTSwwQkFBMEIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRTtJQUE4QyxvREFBVTtJQUF4RDs7SUF1REEsQ0FBQztJQW5EQyxzQkFBSSw0Q0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBTyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNyQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw4Q0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFEQUFlOzs7O1FBQW5CO1lBQ0UsT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLGVBQWU7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLGVBQWU7Z0JBQ3ZDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7OztPQUFBOzs7OztJQUVTLGlEQUFjOzs7O0lBQXhCO1FBQ0UsT0FBTyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsNENBQVM7OztJQUFUOzs7WUFDUSxNQUFNLEdBQUcsaUJBQU0sU0FBUyxXQUFFO1FBQ2hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7O1lBRUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7O1lBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOztZQUMxQyxVQUFVLEdBQUcsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZOztZQUVqRSxLQUF3QixJQUFBLEtBQUEsaUJBQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBL0IsSUFBTSxTQUFTLFdBQUE7O29CQUNaLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBSSxHQUFHLENBQUMsT0FBTyxnQkFDNUMsU0FBUyxDQUFDLEdBQ1Y7O29CQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUN2RCxVQUFVO29CQUNSLGtDQUFpQzt3QkFDakMsR0FBRzt3QkFDSCx3QkFBdUI7d0JBQ3ZCLEtBQUs7d0JBQ0wsWUFBWSxDQUFDO2FBQ2hCOzs7Ozs7Ozs7UUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFTSw0Q0FBUzs7O0lBQWhCLGNBQW9CLENBQUM7SUFDdkIsK0JBQUM7QUFBRCxDQUFDLEFBdkRELENBQThDLFVBQVUsR0F1RHZEOzs7O0lBdERDLHNDQUFrQzs7SUFDbEMsMkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QgZnJvbSAnb2wvc291cmNlL1RpbGVBcmNHSVNSZXN0JztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBMZWdlbmQgfSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vdGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VUaWxlQXJjR0lTUmVzdDtcclxuICBwdWJsaWMgb3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5VGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgIDogJ3RpdGxlJztcclxuICB9XHJcblxyXG4gIGdldCBtYXBMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5tYXBMYWJlbDtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeUh0bWxUYXJnZXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA6IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVRpbGVBcmNHSVNSZXN0IHtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VUaWxlQXJjR0lTUmVzdCh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKCk6IExlZ2VuZFtdIHtcclxuICAgIGNvbnN0IGxlZ2VuZCA9IHN1cGVyLmdldExlZ2VuZCgpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sZWdlbmRJbmZvID09PSB1bmRlZmluZWQgfHwgbGVnZW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy5sYXllciwgMTApO1xyXG4gICAgY29uc3QgbHlyID0gdGhpcy5vcHRpb25zLmxlZ2VuZEluZm8ubGF5ZXJzW2lkXTtcclxuICAgIGxldCBodG1sU3RyaW5nID0gJzx0YWJsZT48dHI+PHRkPicgKyBseXIubGF5ZXJOYW1lICsgJzwvdGQ+PC90cj4nO1xyXG5cclxuICAgIGZvciAoY29uc3QgbHlyTGVnZW5kIG9mIGx5ci5sZWdlbmQpIHtcclxuICAgICAgY29uc3Qgc3JjID0gYCR7dGhpcy5vcHRpb25zLnVybH0vJHtseXIubGF5ZXJJZH0vaW1hZ2VzLyR7XHJcbiAgICAgICAgbHlyTGVnZW5kLnVybFxyXG4gICAgICB9YDtcclxuICAgICAgY29uc3QgbGFiZWwgPSBseXJMZWdlbmQubGFiZWwucmVwbGFjZSgnPE51bGw+JywgJ051bGwnKTtcclxuICAgICAgaHRtbFN0cmluZyArPVxyXG4gICAgICAgIGA8dHI+PHRkIGFsaWduPSdsZWZ0Jz48aW1nIHNyYz1cImAgK1xyXG4gICAgICAgIHNyYyArXHJcbiAgICAgICAgYFwiIGFsdCA9JycgLz48L3RkPjx0ZD5gICtcclxuICAgICAgICBsYWJlbCArXHJcbiAgICAgICAgJzwvdGQ+PC90cj4nO1xyXG4gICAgfVxyXG4gICAgaHRtbFN0cmluZyArPSAnPC90YWJsZT4nO1xyXG4gICAgcmV0dXJuIFt7IGh0bWw6IGh0bWxTdHJpbmcgfV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=