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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy90aWxlYXJjZ2lzcmVzdC1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxzQkFBc0IsTUFBTSwwQkFBMEIsQ0FBQztBQUk5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRTtJQUE4QyxvREFBVTtJQUF4RDs7SUFrREEsQ0FBQztJQTlDQyxzQkFBSSw0Q0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBTyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNyQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxREFBZTs7OztRQUFuQjtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO2dCQUMxQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO2dCQUN2QyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7Ozs7SUFFUyxpREFBYzs7OztJQUF4QjtRQUNFLE9BQU8sSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELDRDQUFTOzs7SUFBVDs7O1lBQ1EsTUFBTSxHQUFHLGlCQUFNLFNBQVMsV0FBRTtRQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5RCxPQUFPLE1BQU0sQ0FBQztTQUNmOztZQUNLLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztZQUNyQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7WUFDMUMsVUFBVSxHQUFHLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUcsWUFBWTs7WUFFakUsS0FBd0IsSUFBQSxLQUFBLGlCQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQS9CLElBQU0sU0FBUyxXQUFBOztvQkFDWixHQUFHLEdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQUksR0FBRyxDQUFDLE9BQU8sZ0JBQzVDLFNBQVMsQ0FBQyxHQUNWOztvQkFDSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDdkQsVUFBVTtvQkFDUixrQ0FBaUM7d0JBQ2pDLEdBQUc7d0JBQ0gsd0JBQXVCO3dCQUN2QixLQUFLO3dCQUNMLFlBQVksQ0FBQzthQUNoQjs7Ozs7Ozs7O1FBQ0QsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUN6QixPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7O0lBRU0sNENBQVM7OztJQUFoQixjQUFvQixDQUFDO0lBQ3ZCLCtCQUFDO0FBQUQsQ0FBQyxBQWxERCxDQUE4QyxVQUFVLEdBa0R2RDs7OztJQWpEQyxzQ0FBa0M7O0lBQ2xDLDJDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVRpbGVBcmNHSVNSZXN0IGZyb20gJ29sL3NvdXJjZS9UaWxlQXJjR0lTUmVzdCc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3RpbGVhcmNnaXNyZXN0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVGlsZUFyY0dJU1Jlc3Q7XHJcbiAgcHVibGljIG9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA6ICd0aXRsZSc7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlIdG1sVGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgOiBRdWVyeUh0bWxUYXJnZXQuQkxBTks7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VUaWxlQXJjR0lTUmVzdCB7XHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QodGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZCgpOiBEYXRhU291cmNlTGVnZW5kT3B0aW9uc1tdIHtcclxuICAgIGNvbnN0IGxlZ2VuZCA9IHN1cGVyLmdldExlZ2VuZCgpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sZWdlbmRJbmZvID09PSB1bmRlZmluZWQgfHwgbGVnZW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQodGhpcy5vcHRpb25zLmxheWVyLCAxMCk7XHJcbiAgICBjb25zdCBseXIgPSB0aGlzLm9wdGlvbnMubGVnZW5kSW5mby5sYXllcnNbaWRdO1xyXG4gICAgbGV0IGh0bWxTdHJpbmcgPSAnPHRhYmxlPjx0cj48dGQ+JyArIGx5ci5sYXllck5hbWUgKyAnPC90ZD48L3RyPic7XHJcblxyXG4gICAgZm9yIChjb25zdCBseXJMZWdlbmQgb2YgbHlyLmxlZ2VuZCkge1xyXG4gICAgICBjb25zdCBzcmMgPSBgJHt0aGlzLm9wdGlvbnMudXJsfS8ke2x5ci5sYXllcklkfS9pbWFnZXMvJHtcclxuICAgICAgICBseXJMZWdlbmQudXJsXHJcbiAgICAgIH1gO1xyXG4gICAgICBjb25zdCBsYWJlbCA9IGx5ckxlZ2VuZC5sYWJlbC5yZXBsYWNlKCc8TnVsbD4nLCAnTnVsbCcpO1xyXG4gICAgICBodG1sU3RyaW5nICs9XHJcbiAgICAgICAgYDx0cj48dGQgYWxpZ249J2xlZnQnPjxpbWcgc3JjPVwiYCArXHJcbiAgICAgICAgc3JjICtcclxuICAgICAgICBgXCIgYWx0ID0nJyAvPjwvdGQ+PHRkPmAgK1xyXG4gICAgICAgIGxhYmVsICtcclxuICAgICAgICAnPC90ZD48L3RyPic7XHJcbiAgICB9XHJcbiAgICBodG1sU3RyaW5nICs9ICc8L3RhYmxlPic7XHJcbiAgICByZXR1cm4gW3sgaHRtbDogaHRtbFN0cmluZyB9XTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG59XHJcbiJdfQ==