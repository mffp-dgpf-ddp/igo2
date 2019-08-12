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
    return TileArcGISRestDataSource;
}(DataSource));
export { TileArcGISRestDataSource };
if (false) {
    /** @type {?} */
    TileArcGISRestDataSource.prototype.ol;
    /** @type {?} */
    TileArcGISRestDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy90aWxlYXJjZ2lzcmVzdC1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxzQkFBc0IsTUFBTSwwQkFBMEIsQ0FBQztBQUk5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRTtJQUE4QyxvREFBVTtJQUF4RDs7SUFnREEsQ0FBQztJQTVDQyxzQkFBSSw0Q0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBTyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNyQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxVQUFVO2dCQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxREFBZTs7OztRQUFuQjtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO2dCQUMxQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO2dCQUN2QyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7Ozs7SUFFUyxpREFBYzs7OztJQUF4QjtRQUNFLE9BQU8sSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELDRDQUFTOzs7SUFBVDs7O1lBQ1EsTUFBTSxHQUFHLGlCQUFNLFNBQVMsV0FBRTtRQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5RCxPQUFPLE1BQU0sQ0FBQztTQUNmOztZQUNLLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOztZQUNyQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7WUFDMUMsVUFBVSxHQUFHLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUcsWUFBWTs7WUFFakUsS0FBd0IsSUFBQSxLQUFBLGlCQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQS9CLElBQU0sU0FBUyxXQUFBOztvQkFDWixHQUFHLEdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQUksR0FBRyxDQUFDLE9BQU8sZ0JBQzVDLFNBQVMsQ0FBQyxHQUNWOztvQkFDSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDdkQsVUFBVTtvQkFDUixrQ0FBaUM7d0JBQ2pDLEdBQUc7d0JBQ0gsd0JBQXVCO3dCQUN2QixLQUFLO3dCQUNMLFlBQVksQ0FBQzthQUNoQjs7Ozs7Ozs7O1FBQ0QsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUN6QixPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0gsK0JBQUM7QUFBRCxDQUFDLEFBaERELENBQThDLFVBQVUsR0FnRHZEOzs7O0lBL0NDLHNDQUFrQzs7SUFDbEMsMkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QgZnJvbSAnb2wvc291cmNlL1RpbGVBcmNHSVNSZXN0JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnMgfSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vdGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VUaWxlQXJjR0lTUmVzdDtcclxuICBwdWJsaWMgb3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5VGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgIDogJ3RpdGxlJztcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeUh0bWxUYXJnZXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA6IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVRpbGVBcmNHSVNSZXN0IHtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VUaWxlQXJjR0lTUmVzdCh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKCk6IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zW10ge1xyXG4gICAgY29uc3QgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxlZ2VuZEluZm8gPT09IHVuZGVmaW5lZCB8fCBsZWdlbmQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGVnZW5kO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMubGF5ZXIsIDEwKTtcclxuICAgIGNvbnN0IGx5ciA9IHRoaXMub3B0aW9ucy5sZWdlbmRJbmZvLmxheWVyc1tpZF07XHJcbiAgICBsZXQgaHRtbFN0cmluZyA9ICc8dGFibGU+PHRyPjx0ZD4nICsgbHlyLmxheWVyTmFtZSArICc8L3RkPjwvdHI+JztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGx5ckxlZ2VuZCBvZiBseXIubGVnZW5kKSB7XHJcbiAgICAgIGNvbnN0IHNyYyA9IGAke3RoaXMub3B0aW9ucy51cmx9LyR7bHlyLmxheWVySWR9L2ltYWdlcy8ke1xyXG4gICAgICAgIGx5ckxlZ2VuZC51cmxcclxuICAgICAgfWA7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gbHlyTGVnZW5kLmxhYmVsLnJlcGxhY2UoJzxOdWxsPicsICdOdWxsJyk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICBgPHRyPjx0ZCBhbGlnbj0nbGVmdCc+PGltZyBzcmM9XCJgICtcclxuICAgICAgICBzcmMgK1xyXG4gICAgICAgIGBcIiBhbHQgPScnIC8+PC90ZD48dGQ+YCArXHJcbiAgICAgICAgbGFiZWwgK1xyXG4gICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgIH1cclxuICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gIH1cclxufVxyXG4iXX0=