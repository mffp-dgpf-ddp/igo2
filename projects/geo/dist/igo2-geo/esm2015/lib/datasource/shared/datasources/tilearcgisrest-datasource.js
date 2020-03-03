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
    get mapLabel() {
        return ((/** @type {?} */ (this.options))).mapLabel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy90aWxlYXJjZ2lzcmVzdC1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLHNCQUFzQixNQUFNLDBCQUEwQixDQUFDO0FBSTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBFLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxVQUFVOzs7O0lBSXRELElBQUksTUFBTTtRQUNSLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQU8sQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFVBQVU7WUFDckMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtZQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsZUFBZTtZQUMxQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO1lBQ3ZDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRVMsY0FBYztRQUN0QixPQUFPLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFO1FBQ2hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7O2NBRUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7O2NBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOztZQUMxQyxVQUFVLEdBQUcsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZO1FBRWpFLEtBQUssTUFBTSxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTs7a0JBQzVCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLFdBQzVDLFNBQVMsQ0FBQyxHQUNaLEVBQUU7O2tCQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ3ZELFVBQVU7Z0JBQ1IsaUNBQWlDO29CQUNqQyxHQUFHO29CQUNILHVCQUF1QjtvQkFDdkIsS0FBSztvQkFDTCxZQUFZLENBQUM7U0FDaEI7UUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFTSxTQUFTLEtBQUksQ0FBQztDQUN0Qjs7O0lBdERDLHNDQUFrQzs7SUFDbEMsMkNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QgZnJvbSAnb2wvc291cmNlL1RpbGVBcmNHSVNSZXN0JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTGVnZW5kIH0gZnJvbSAnLi9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3RpbGVhcmNnaXNyZXN0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUXVlcnlIdG1sVGFyZ2V0IH0gZnJvbSAnLi4vLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmVudW1zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb2w6IG9sU291cmNlVGlsZUFyY0dJU1Jlc3Q7XHJcbiAgcHVibGljIG9wdGlvbnM6IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIGdldCBwYXJhbXMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1zIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA6ICd0aXRsZSc7XHJcbiAgfVxyXG5cclxuICBnZXQgbWFwTGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkubWFwTGFiZWw7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlIdG1sVGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgOiBRdWVyeUh0bWxUYXJnZXQuQkxBTks7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VUaWxlQXJjR0lTUmVzdCB7XHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlVGlsZUFyY0dJU1Jlc3QodGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZCgpOiBMZWdlbmRbXSB7XHJcbiAgICBjb25zdCBsZWdlbmQgPSBzdXBlci5nZXRMZWdlbmQoKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGVnZW5kSW5mbyA9PT0gdW5kZWZpbmVkIHx8IGxlZ2VuZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMubGF5ZXIsIDEwKTtcclxuICAgIGNvbnN0IGx5ciA9IHRoaXMub3B0aW9ucy5sZWdlbmRJbmZvLmxheWVyc1tpZF07XHJcbiAgICBsZXQgaHRtbFN0cmluZyA9ICc8dGFibGU+PHRyPjx0ZD4nICsgbHlyLmxheWVyTmFtZSArICc8L3RkPjwvdHI+JztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGx5ckxlZ2VuZCBvZiBseXIubGVnZW5kKSB7XHJcbiAgICAgIGNvbnN0IHNyYyA9IGAke3RoaXMub3B0aW9ucy51cmx9LyR7bHlyLmxheWVySWR9L2ltYWdlcy8ke1xyXG4gICAgICAgIGx5ckxlZ2VuZC51cmxcclxuICAgICAgfWA7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gbHlyTGVnZW5kLmxhYmVsLnJlcGxhY2UoJzxOdWxsPicsICdOdWxsJyk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICBgPHRyPjx0ZCBhbGlnbj0nbGVmdCc+PGltZyBzcmM9XCJgICtcclxuICAgICAgICBzcmMgK1xyXG4gICAgICAgIGBcIiBhbHQgPScnIC8+PC90ZD48dGQ+YCArXHJcbiAgICAgICAgbGFiZWwgK1xyXG4gICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgIH1cclxuICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19