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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy90aWxlYXJjZ2lzcmVzdC1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxzQkFBc0IsTUFBTSwwQkFBMEIsQ0FBQztBQUk5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRTtJQUE4QyxvREFBVTtJQUF4RDs7SUF1REEsQ0FBQztJQW5EQyxzQkFBSSw0Q0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBTyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNyQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw4Q0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFEQUFlOzs7O1FBQW5CO1lBQ0UsT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLGVBQWU7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLGVBQWU7Z0JBQ3ZDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7OztPQUFBOzs7OztJQUVTLGlEQUFjOzs7O0lBQXhCO1FBQ0UsT0FBTyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsNENBQVM7OztJQUFUOzs7WUFDUSxNQUFNLEdBQUcsaUJBQU0sU0FBUyxXQUFFO1FBQ2hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7O1lBRUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7O1lBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOztZQUMxQyxVQUFVLEdBQUcsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZOztZQUVqRSxLQUF3QixJQUFBLEtBQUEsaUJBQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBL0IsSUFBTSxTQUFTLFdBQUE7O29CQUNaLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBSSxHQUFHLENBQUMsT0FBTyxnQkFDNUMsU0FBUyxDQUFDLEdBQ1Y7O29CQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUN2RCxVQUFVO29CQUNSLGtDQUFpQzt3QkFDakMsR0FBRzt3QkFDSCx3QkFBdUI7d0JBQ3ZCLEtBQUs7d0JBQ0wsWUFBWSxDQUFDO2FBQ2hCOzs7Ozs7Ozs7UUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFTSw0Q0FBUzs7O0lBQWhCLGNBQW9CLENBQUM7SUFDdkIsK0JBQUM7QUFBRCxDQUFDLEFBdkRELENBQThDLFVBQVUsR0F1RHZEOzs7O0lBdERDLHNDQUFrQzs7SUFDbEMsMkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QgZnJvbSAnb2wvc291cmNlL1RpbGVBcmNHSVNSZXN0JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTGVnZW5kIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3RpbGVhcmNnaXNyZXN0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVGlsZUFyY0dJU1Jlc3Q7XHJcbiAgcHVibGljIG9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA6ICd0aXRsZSc7XHJcbiAgfVxyXG5cclxuICBnZXQgbWFwTGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkubWFwTGFiZWw7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlIdG1sVGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgOiBRdWVyeUh0bWxUYXJnZXQuQkxBTks7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VUaWxlQXJjR0lTUmVzdCB7XHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QodGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZCgpOiBMZWdlbmRbXSB7XHJcbiAgICBjb25zdCBsZWdlbmQgPSBzdXBlci5nZXRMZWdlbmQoKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGVnZW5kSW5mbyA9PT0gdW5kZWZpbmVkIHx8IGxlZ2VuZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMubGF5ZXIsIDEwKTtcclxuICAgIGNvbnN0IGx5ciA9IHRoaXMub3B0aW9ucy5sZWdlbmRJbmZvLmxheWVyc1tpZF07XHJcbiAgICBsZXQgaHRtbFN0cmluZyA9ICc8dGFibGU+PHRyPjx0ZD4nICsgbHlyLmxheWVyTmFtZSArICc8L3RkPjwvdHI+JztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGx5ckxlZ2VuZCBvZiBseXIubGVnZW5kKSB7XHJcbiAgICAgIGNvbnN0IHNyYyA9IGAke3RoaXMub3B0aW9ucy51cmx9LyR7bHlyLmxheWVySWR9L2ltYWdlcy8ke1xyXG4gICAgICAgIGx5ckxlZ2VuZC51cmxcclxuICAgICAgfWA7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gbHlyTGVnZW5kLmxhYmVsLnJlcGxhY2UoJzxOdWxsPicsICdOdWxsJyk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICBgPHRyPjx0ZCBhbGlnbj0nbGVmdCc+PGltZyBzcmM9XCJgICtcclxuICAgICAgICBzcmMgK1xyXG4gICAgICAgIGBcIiBhbHQgPScnIC8+PC90ZD48dGQ+YCArXHJcbiAgICAgICAgbGFiZWwgK1xyXG4gICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgIH1cclxuICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19