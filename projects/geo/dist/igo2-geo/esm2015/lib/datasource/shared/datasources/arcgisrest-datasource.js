/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceVector from 'ol/source/Vector';
import olFormatEsriJSON from 'ol/format/EsriJSON';
import * as olloadingstrategy from 'ol/loadingstrategy';
import { DataSource } from './datasource';
export class ArcGISRestDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const esrijsonFormat = new olFormatEsriJSON();
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
                const baseUrl = this.options.url + '/' + this.options.layer + '/query/';
                /** @type {?} */
                const geometry = encodeURIComponent('{"xmin":' +
                    extent[0] +
                    ',"ymin":' +
                    extent[1] +
                    ',"xmax":' +
                    extent[2] +
                    ',"ymax":' +
                    extent[3] +
                    ',"spatialReference":{"wkid":102100}}');
                /** @type {?} */
                const params = [
                    'f=json',
                    `geometry=${geometry}`,
                    'geometryType=esriGeometryEnvelope',
                    'inSR=102100',
                    'spatialRel=esriSpatialRelIntersects',
                    'outFields=*',
                    'returnGeometry=true',
                    'outSR=102100'
                ];
                if (this.options.params.timeFilter) {
                    /** @type {?} */
                    const time = `time=${this.options.params.timeExtent}`;
                    params.push(time);
                }
                if (this.options.params.customParams) {
                    this.options.params.customParams.forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    element => {
                        params.push(element);
                    }));
                }
                return `${baseUrl}?${params.join('&')}`;
            }).bind(this),
            strategy: olloadingstrategy.bbox
        });
    }
    /**
     * @return {?}
     */
    getLegend() {
        /** @type {?} */
        const legendInfo = this.options.params.legendInfo;
        /** @type {?} */
        const legend = super.getLegend();
        if (legendInfo === undefined || legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        const id = parseInt(this.options.layer, 10);
        /** @type {?} */
        const lyr = legendInfo.layers[id];
        /** @type {?} */
        let htmlString = '<table><tr><td>' + lyr.layerName + '</td></tr>';
        for (const lyrLegend of lyr.legend) {
            /** @type {?} */
            const modifiedUrl = this.options.url.replace('FeatureServer', 'MapServer');
            /** @type {?} */
            const src = `${modifiedUrl}/${lyr.layerId}/images/${lyrLegend.url}`;
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
    ArcGISRestDataSource.prototype.ol;
    /** @type {?} */
    ArcGISRestDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjZ2lzcmVzdC1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEtBQUssaUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFFeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUkxQyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsVUFBVTs7Ozs7SUFJeEMsY0FBYzs7Y0FDaEIsY0FBYyxHQUFHLElBQUksZ0JBQWdCLEVBQUU7UUFDN0MsT0FBTyxJQUFJLGNBQWMsQ0FBQztZQUN4QixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWTtZQUM5QyxRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLEdBQUcsRUFBRTs7Ozs7O1lBQUEsVUFBUyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUk7O3NCQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVM7O3NCQUNqRSxRQUFRLEdBQUcsa0JBQWtCLENBQ2pDLFVBQVU7b0JBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxVQUFVO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVTtvQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULFVBQVU7b0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxzQ0FBc0MsQ0FDekM7O3NCQUNLLE1BQU0sR0FBRztvQkFDYixRQUFRO29CQUNSLFlBQVksUUFBUSxFQUFFO29CQUN0QixtQ0FBbUM7b0JBQ25DLGFBQWE7b0JBQ2IscUNBQXFDO29CQUNyQyxhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsY0FBYztpQkFDZjtnQkFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTs7MEJBQzVCLElBQUksR0FBRyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtvQkFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN2QixDQUFDLEVBQUMsQ0FBQztpQkFDSjtnQkFDRCxPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNaLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVOztjQUMzQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRTtRQUNoQyxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakQsT0FBTyxNQUFNLENBQUM7U0FDZjs7Y0FFSyxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs7Y0FDckMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOztZQUM3QixVQUFVLEdBQUcsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZO1FBRWpFLEtBQUssTUFBTSxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTs7a0JBQzVCLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQzFDLGVBQWUsRUFDZixXQUFXLENBQ1o7O2tCQUNLLEdBQUcsR0FBRyxHQUFHLFdBQVcsSUFBSSxHQUFHLENBQUMsT0FBTyxXQUFXLFNBQVMsQ0FBQyxHQUFHLEVBQUU7O2tCQUM3RCxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUN2RCxVQUFVO2dCQUNSLGlDQUFpQztvQkFDakMsR0FBRztvQkFDSCx1QkFBdUI7b0JBQ3ZCLEtBQUs7b0JBQ0wsWUFBWSxDQUFDO1NBQ2hCO1FBQ0QsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUN6QixPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7O0lBRU0sU0FBUyxLQUFJLENBQUM7Q0FDdEI7OztJQTdFQyxrQ0FBMEI7O0lBQzFCLHVDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IG9sRm9ybWF0RXNyaUpTT04gZnJvbSAnb2wvZm9ybWF0L0VzcmlKU09OJztcclxuaW1wb3J0ICogYXMgb2xsb2FkaW5nc3RyYXRlZ3kgZnJvbSAnb2wvbG9hZGluZ3N0cmF0ZWd5JztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBMZWdlbmQgfSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9hcmNnaXNyZXN0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcmNHSVNSZXN0RGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VWZWN0b3I7XHJcbiAgcHVibGljIG9wdGlvbnM6IEFyY0dJU1Jlc3REYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yIHtcclxuICAgIGNvbnN0IGVzcmlqc29uRm9ybWF0ID0gbmV3IG9sRm9ybWF0RXNyaUpTT04oKTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xyXG4gICAgICBhdHRyaWJ1dGlvbnM6IHRoaXMub3B0aW9ucy5wYXJhbXMuYXR0cmlidXRpb25zLFxyXG4gICAgICBvdmVybGFwczogZmFsc2UsXHJcbiAgICAgIGZvcm1hdDogZXNyaWpzb25Gb3JtYXQsXHJcbiAgICAgIHVybDogZnVuY3Rpb24oZXh0ZW50LCByZXNvbHV0aW9uLCBwcm9qKSB7XHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHRoaXMub3B0aW9ucy51cmwgKyAnLycgKyB0aGlzLm9wdGlvbnMubGF5ZXIgKyAnL3F1ZXJ5Lyc7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICAne1wieG1pblwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMF0gK1xyXG4gICAgICAgICAgICAnLFwieW1pblwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMV0gK1xyXG4gICAgICAgICAgICAnLFwieG1heFwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbMl0gK1xyXG4gICAgICAgICAgICAnLFwieW1heFwiOicgK1xyXG4gICAgICAgICAgICBleHRlbnRbM10gK1xyXG4gICAgICAgICAgICAnLFwic3BhdGlhbFJlZmVyZW5jZVwiOntcIndraWRcIjoxMDIxMDB9fSdcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtcclxuICAgICAgICAgICdmPWpzb24nLFxyXG4gICAgICAgICAgYGdlb21ldHJ5PSR7Z2VvbWV0cnl9YCxcclxuICAgICAgICAgICdnZW9tZXRyeVR5cGU9ZXNyaUdlb21ldHJ5RW52ZWxvcGUnLFxyXG4gICAgICAgICAgJ2luU1I9MTAyMTAwJyxcclxuICAgICAgICAgICdzcGF0aWFsUmVsPWVzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cycsXHJcbiAgICAgICAgICAnb3V0RmllbGRzPSonLFxyXG4gICAgICAgICAgJ3JldHVybkdlb21ldHJ5PXRydWUnLFxyXG4gICAgICAgICAgJ291dFNSPTEwMjEwMCdcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zLnRpbWVGaWx0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IHRpbWUgPSBgdGltZT0ke3RoaXMub3B0aW9ucy5wYXJhbXMudGltZUV4dGVudH1gO1xyXG4gICAgICAgICAgcGFyYW1zLnB1c2godGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zLmN1c3RvbVBhcmFtcykge1xyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLnBhcmFtcy5jdXN0b21QYXJhbXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke2Jhc2VVcmx9PyR7cGFyYW1zLmpvaW4oJyYnKX1gO1xyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgIHN0cmF0ZWd5OiBvbGxvYWRpbmdzdHJhdGVneS5iYm94XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZCgpOiBMZWdlbmRbXSB7XHJcbiAgICBjb25zdCBsZWdlbmRJbmZvID0gdGhpcy5vcHRpb25zLnBhcmFtcy5sZWdlbmRJbmZvO1xyXG4gICAgY29uc3QgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAobGVnZW5kSW5mbyA9PT0gdW5kZWZpbmVkIHx8IGxlZ2VuZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMubGF5ZXIsIDEwKTtcclxuICAgIGNvbnN0IGx5ciA9IGxlZ2VuZEluZm8ubGF5ZXJzW2lkXTtcclxuICAgIGxldCBodG1sU3RyaW5nID0gJzx0YWJsZT48dHI+PHRkPicgKyBseXIubGF5ZXJOYW1lICsgJzwvdGQ+PC90cj4nO1xyXG5cclxuICAgIGZvciAoY29uc3QgbHlyTGVnZW5kIG9mIGx5ci5sZWdlbmQpIHtcclxuICAgICAgY29uc3QgbW9kaWZpZWRVcmwgPSB0aGlzLm9wdGlvbnMudXJsLnJlcGxhY2UoXHJcbiAgICAgICAgJ0ZlYXR1cmVTZXJ2ZXInLFxyXG4gICAgICAgICdNYXBTZXJ2ZXInXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHNyYyA9IGAke21vZGlmaWVkVXJsfS8ke2x5ci5sYXllcklkfS9pbWFnZXMvJHtseXJMZWdlbmQudXJsfWA7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gbHlyTGVnZW5kLmxhYmVsLnJlcGxhY2UoJzxOdWxsPicsICdOdWxsJyk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICBgPHRyPjx0ZCBhbGlnbj0nbGVmdCc+PGltZyBzcmM9XCJgICtcclxuICAgICAgICBzcmMgK1xyXG4gICAgICAgIGBcIiBhbHQgPScnIC8+PC90ZD48dGQ+YCArXHJcbiAgICAgICAgbGFiZWwgK1xyXG4gICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgIH1cclxuICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19