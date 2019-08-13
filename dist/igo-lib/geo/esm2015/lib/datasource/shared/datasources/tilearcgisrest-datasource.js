/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceTileArcGISRest from 'ol/source/TileArcGISRest';
import { DataSource } from './datasource';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
export class TileArcGISRestDataSource extends DataSource {
    /**
     * @return {?}
     */
    get params() {
        return (/** @type {?} */ (this.options.params));
    }
    /**
     * @return {?}
     */
    get queryTitle() {
        return ((/** @type {?} */ (this.options))).queryTitle
            ? ((/** @type {?} */ (this.options))).queryTitle
            : 'title';
    }
    /**
     * @return {?}
     */
    get queryHtmlTarget() {
        return ((/** @type {?} */ (this.options))).queryHtmlTarget
            ? ((/** @type {?} */ (this.options))).queryHtmlTarget
            : QueryHtmlTarget.BLANK;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceTileArcGISRest(this.options);
    }
    /**
     * @return {?}
     */
    getLegend() {
        /** @type {?} */
        const legend = super.getLegend();
        if (this.options.legendInfo === undefined || legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        const id = parseInt(this.options.layer, 10);
        /** @type {?} */
        const lyr = this.options.legendInfo.layers[id];
        /** @type {?} */
        let htmlString = '<table><tr><td>' + lyr.layerName + '</td></tr>';
        for (const lyrLegend of lyr.legend) {
            /** @type {?} */
            const src = `${this.options.url}/${lyr.layerId}/images/${lyrLegend.url}`;
            /** @type {?} */
            const label = lyrLegend.label.replace('<Null>', 'Null');
            htmlString +=
                `<tr><td align='left'><img src="` +
                    src +
                    `" alt ='' /></td><td>` +
                    label +
                    '</td></tr>';
        }
        htmlString += '</table>';
        return [{ html: htmlString }];
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    TileArcGISRestDataSource.prototype.ol;
    /** @type {?} */
    TileArcGISRestDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy90aWxlYXJjZ2lzcmVzdC1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLHNCQUFzQixNQUFNLDBCQUEwQixDQUFDO0FBSTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBFLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxVQUFVOzs7O0lBSXRELElBQUksTUFBTTtRQUNSLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQU8sQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFVBQVU7WUFDckMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtZQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsZUFBZTtZQUMxQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO1lBQ3ZDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRVMsY0FBYztRQUN0QixPQUFPLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFO1FBQ2hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7O2NBQ0ssRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7O2NBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOztZQUMxQyxVQUFVLEdBQUcsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZO1FBRWpFLEtBQUssTUFBTSxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTs7a0JBQzVCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLFdBQzVDLFNBQVMsQ0FBQyxHQUNaLEVBQUU7O2tCQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ3ZELFVBQVU7Z0JBQ1IsaUNBQWlDO29CQUNqQyxHQUFHO29CQUNILHVCQUF1QjtvQkFDdkIsS0FBSztvQkFDTCxZQUFZLENBQUM7U0FDaEI7UUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFTSxTQUFTLEtBQUksQ0FBQztDQUN0Qjs7O0lBakRDLHNDQUFrQzs7SUFDbEMsMkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QgZnJvbSAnb2wvc291cmNlL1RpbGVBcmNHSVNSZXN0JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnMgfSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vdGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VUaWxlQXJjR0lTUmVzdDtcclxuICBwdWJsaWMgb3B0aW9uczogVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5VGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgIDogJ3RpdGxlJztcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeUh0bWxUYXJnZXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA6IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVRpbGVBcmNHSVNSZXN0IHtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VUaWxlQXJjR0lTUmVzdCh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKCk6IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zW10ge1xyXG4gICAgY29uc3QgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxlZ2VuZEluZm8gPT09IHVuZGVmaW5lZCB8fCBsZWdlbmQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGVnZW5kO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMubGF5ZXIsIDEwKTtcclxuICAgIGNvbnN0IGx5ciA9IHRoaXMub3B0aW9ucy5sZWdlbmRJbmZvLmxheWVyc1tpZF07XHJcbiAgICBsZXQgaHRtbFN0cmluZyA9ICc8dGFibGU+PHRyPjx0ZD4nICsgbHlyLmxheWVyTmFtZSArICc8L3RkPjwvdHI+JztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGx5ckxlZ2VuZCBvZiBseXIubGVnZW5kKSB7XHJcbiAgICAgIGNvbnN0IHNyYyA9IGAke3RoaXMub3B0aW9ucy51cmx9LyR7bHlyLmxheWVySWR9L2ltYWdlcy8ke1xyXG4gICAgICAgIGx5ckxlZ2VuZC51cmxcclxuICAgICAgfWA7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gbHlyTGVnZW5kLmxhYmVsLnJlcGxhY2UoJzxOdWxsPicsICdOdWxsJyk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICBgPHRyPjx0ZCBhbGlnbj0nbGVmdCc+PGltZyBzcmM9XCJgICtcclxuICAgICAgICBzcmMgK1xyXG4gICAgICAgIGBcIiBhbHQgPScnIC8+PC90ZD48dGQ+YCArXHJcbiAgICAgICAgbGFiZWwgK1xyXG4gICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgIH1cclxuICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19