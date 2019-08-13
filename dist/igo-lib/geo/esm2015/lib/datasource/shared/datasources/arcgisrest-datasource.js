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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjZ2lzcmVzdC1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEtBQUssaUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFFeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUkxQyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsVUFBVTs7Ozs7SUFJeEMsY0FBYzs7Y0FDaEIsY0FBYyxHQUFHLElBQUksZ0JBQWdCLEVBQUU7UUFDN0MsT0FBTyxJQUFJLGNBQWMsQ0FBQztZQUN4QixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWTtZQUM5QyxRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLEdBQUcsRUFBRTs7Ozs7O1lBQUEsVUFBUyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUk7O3NCQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVM7O3NCQUNqRSxRQUFRLEdBQUcsa0JBQWtCLENBQ2pDLFVBQVU7b0JBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxVQUFVO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVTtvQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULFVBQVU7b0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVCxzQ0FBc0MsQ0FDekM7O3NCQUNLLE1BQU0sR0FBRztvQkFDYixRQUFRO29CQUNSLFlBQVksUUFBUSxFQUFFO29CQUN0QixtQ0FBbUM7b0JBQ25DLGFBQWE7b0JBQ2IscUNBQXFDO29CQUNyQyxhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsY0FBYztpQkFDZjtnQkFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTs7MEJBQzVCLElBQUksR0FBRyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtvQkFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN2QixDQUFDLEVBQUMsQ0FBQztpQkFDSjtnQkFDRCxPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNaLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVOztjQUMzQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRTtRQUNoQyxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakQsT0FBTyxNQUFNLENBQUM7U0FDZjs7Y0FDSyxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs7Y0FDckMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOztZQUM3QixVQUFVLEdBQUcsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZO1FBRWpFLEtBQUssTUFBTSxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTs7a0JBQzVCLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQzFDLGVBQWUsRUFDZixXQUFXLENBQ1o7O2tCQUNLLEdBQUcsR0FBRyxHQUFHLFdBQVcsSUFBSSxHQUFHLENBQUMsT0FBTyxXQUFXLFNBQVMsQ0FBQyxHQUFHLEVBQUU7O2tCQUM3RCxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUN2RCxVQUFVO2dCQUNSLGlDQUFpQztvQkFDakMsR0FBRztvQkFDSCx1QkFBdUI7b0JBQ3ZCLEtBQUs7b0JBQ0wsWUFBWSxDQUFDO1NBQ2hCO1FBQ0QsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUN6QixPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7O0lBRU0sU0FBUyxLQUFJLENBQUM7Q0FDdEI7OztJQTVFQyxrQ0FBMEI7O0lBQzFCLHVDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0IG9sRm9ybWF0RXNyaUpTT04gZnJvbSAnb2wvZm9ybWF0L0VzcmlKU09OJztcclxuaW1wb3J0ICogYXMgb2xsb2FkaW5nc3RyYXRlZ3kgZnJvbSAnb2wvbG9hZGluZ3N0cmF0ZWd5JztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlTGVnZW5kT3B0aW9ucyB9IGZyb20gJy4vZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL2FyY2dpc3Jlc3QtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFyY0dJU1Jlc3REYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvcjtcclxuICBwdWJsaWMgb3B0aW9uczogQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3Ige1xyXG4gICAgY29uc3QgZXNyaWpzb25Gb3JtYXQgPSBuZXcgb2xGb3JtYXRFc3JpSlNPTigpO1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZVZlY3Rvcih7XHJcbiAgICAgIGF0dHJpYnV0aW9uczogdGhpcy5vcHRpb25zLnBhcmFtcy5hdHRyaWJ1dGlvbnMsXHJcbiAgICAgIG92ZXJsYXBzOiBmYWxzZSxcclxuICAgICAgZm9ybWF0OiBlc3JpanNvbkZvcm1hdCxcclxuICAgICAgdXJsOiBmdW5jdGlvbihleHRlbnQsIHJlc29sdXRpb24sIHByb2opIHtcclxuICAgICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5vcHRpb25zLnVybCArICcvJyArIHRoaXMub3B0aW9ucy5sYXllciArICcvcXVlcnkvJztcclxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IGVuY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICd7XCJ4bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFswXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWluXCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsxXSArXHJcbiAgICAgICAgICAgICcsXCJ4bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFsyXSArXHJcbiAgICAgICAgICAgICcsXCJ5bWF4XCI6JyArXHJcbiAgICAgICAgICAgIGV4dGVudFszXSArXHJcbiAgICAgICAgICAgICcsXCJzcGF0aWFsUmVmZXJlbmNlXCI6e1wid2tpZFwiOjEwMjEwMH19J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW1xyXG4gICAgICAgICAgJ2Y9anNvbicsXHJcbiAgICAgICAgICBgZ2VvbWV0cnk9JHtnZW9tZXRyeX1gLFxyXG4gICAgICAgICAgJ2dlb21ldHJ5VHlwZT1lc3JpR2VvbWV0cnlFbnZlbG9wZScsXHJcbiAgICAgICAgICAnaW5TUj0xMDIxMDAnLFxyXG4gICAgICAgICAgJ3NwYXRpYWxSZWw9ZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJyxcclxuICAgICAgICAgICdvdXRGaWVsZHM9KicsXHJcbiAgICAgICAgICAncmV0dXJuR2VvbWV0cnk9dHJ1ZScsXHJcbiAgICAgICAgICAnb3V0U1I9MTAyMTAwJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJhbXMudGltZUZpbHRlcikge1xyXG4gICAgICAgICAgY29uc3QgdGltZSA9IGB0aW1lPSR7dGhpcy5vcHRpb25zLnBhcmFtcy50aW1lRXh0ZW50fWA7XHJcbiAgICAgICAgICBwYXJhbXMucHVzaCh0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJhbXMuY3VzdG9tUGFyYW1zKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnMucGFyYW1zLmN1c3RvbVBhcmFtcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBwYXJhbXMucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7YmFzZVVybH0/JHtwYXJhbXMuam9pbignJicpfWA7XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgc3RyYXRlZ3k6IG9sbG9hZGluZ3N0cmF0ZWd5LmJib3hcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKCk6IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zW10ge1xyXG4gICAgY29uc3QgbGVnZW5kSW5mbyA9IHRoaXMub3B0aW9ucy5wYXJhbXMubGVnZW5kSW5mbztcclxuICAgIGNvbnN0IGxlZ2VuZCA9IHN1cGVyLmdldExlZ2VuZCgpO1xyXG4gICAgaWYgKGxlZ2VuZEluZm8gPT09IHVuZGVmaW5lZCB8fCBsZWdlbmQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGVnZW5kO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMubGF5ZXIsIDEwKTtcclxuICAgIGNvbnN0IGx5ciA9IGxlZ2VuZEluZm8ubGF5ZXJzW2lkXTtcclxuICAgIGxldCBodG1sU3RyaW5nID0gJzx0YWJsZT48dHI+PHRkPicgKyBseXIubGF5ZXJOYW1lICsgJzwvdGQ+PC90cj4nO1xyXG5cclxuICAgIGZvciAoY29uc3QgbHlyTGVnZW5kIG9mIGx5ci5sZWdlbmQpIHtcclxuICAgICAgY29uc3QgbW9kaWZpZWRVcmwgPSB0aGlzLm9wdGlvbnMudXJsLnJlcGxhY2UoXHJcbiAgICAgICAgJ0ZlYXR1cmVTZXJ2ZXInLFxyXG4gICAgICAgICdNYXBTZXJ2ZXInXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHNyYyA9IGAke21vZGlmaWVkVXJsfS8ke2x5ci5sYXllcklkfS9pbWFnZXMvJHtseXJMZWdlbmQudXJsfWA7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gbHlyTGVnZW5kLmxhYmVsLnJlcGxhY2UoJzxOdWxsPicsICdOdWxsJyk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICBgPHRyPjx0ZCBhbGlnbj0nbGVmdCc+PGltZyBzcmM9XCJgICtcclxuICAgICAgICBzcmMgK1xyXG4gICAgICAgIGBcIiBhbHQgPScnIC8+PC90ZD48dGQ+YCArXHJcbiAgICAgICAgbGFiZWwgK1xyXG4gICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgIH1cclxuICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19