/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceCarto from 'ol/source/CartoDB';
import { DataSource } from './datasource';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
export class CartoDataSource extends DataSource {
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
        /** @type {?} */
        const crossOrigin = this.options.crossOrigin
            ? this.options.crossOrigin
            : 'anonymous';
        /** @type {?} */
        const sourceOptions = Object.assign({
            crossOrigin
        }, this.options);
        return new olSourceCarto(sourceOptions);
    }
    /**
     * @return {?}
     */
    getLegend() {
        /** @type {?} */
        const legend = super.getLegend();
        if (legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        let htmlString = '<table>';
        if (this.options.config.layers[0].legend != null) {
            this.options.config.layers[0].legend.items.forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                if (f.visible === true) {
                    htmlString +=
                        '<tr><td>' +
                            '<p><font size="5" color="' +
                            f.value +
                            '"> &#9679</font></p></td>' +
                            '<td>' +
                            f.name +
                            '</td></tr>';
                }
            }));
            htmlString += '</table>';
            return [{ html: htmlString }];
        }
        else {
            // Try to build the legend from the cartocss options
            /** @type {?} */
            const layerOptions = this.options.config.layers[0].options;
            // All available cartocss style options
            /** @type {?} */
            const types = [
                'polygon-fill:',
                'marker-fill:',
                'shield-fill:',
                'building-fill:',
                'line-color:'
            ];
            for (const oneType of types) {
                if (layerOptions.cartocss.includes(oneType)) {
                    /** @type {?} */
                    const type = layerOptions.cartocss.split(oneType).pop();
                    /** @type {?} */
                    const color = type.substr(0, type.indexOf(';'));
                    if (color.includes('ramp')) {
                        /** @type {?} */
                        const colors = color.split(', (')[1].split(',');
                        /** @type {?} */
                        const data = color.split(', (')[2].split(',');
                        for (let j = 0; j < colors.length; j++) {
                            colors[j] = colors[j].replace(/("|\))/g, '');
                            data[j] = data[j].replace(/("|\))/g, '');
                            if (data[j].replace(/\s+/g, '') === '=') {
                                data[j] = 'Autres';
                            }
                            htmlString +=
                                '<tr><td>' +
                                    '<p><font size="5" color="' +
                                    colors[j] +
                                    '"> &#9679</font></p></td>' +
                                    '<td>' +
                                    data[j] +
                                    '</td></tr>';
                        }
                        break;
                    }
                    else {
                        /** @type {?} */
                        const title = layerOptions.layer_name
                            ? layerOptions.layer_name
                            : '';
                        htmlString +=
                            '<tr><td>' +
                                '<p><font size="5" color="' +
                                color +
                                '"> &#9679</font></p>' +
                                '</td><td>' +
                                title +
                                '</td></tr>';
                        break;
                    }
                }
            }
            htmlString += '</table>';
            return [{ html: htmlString }];
        }
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    CartoDataSource.prototype.ol;
    /** @type {?} */
    CartoDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydG8tZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jYXJ0by1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLGFBQWEsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxVQUFVOzs7O0lBSTdDLElBQUksTUFBTTtRQUNSLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQU8sQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFVBQVU7WUFDckMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtZQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsZUFBZTtZQUMxQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO1lBQ3ZDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRVMsY0FBYzs7Y0FDaEIsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQzFCLENBQUMsQ0FBQyxXQUFXOztjQUNULGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNqQztZQUNFLFdBQVc7U0FDWixFQUNELElBQUksQ0FBQyxPQUFPLENBQ2I7UUFDRCxPQUFPLElBQUksYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFO1FBQ2hDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckIsT0FBTyxNQUFNLENBQUM7U0FDZjs7WUFFRyxVQUFVLEdBQUcsU0FBUztRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLENBQUMsRUFBRTtnQkFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtvQkFDdEIsVUFBVTt3QkFDUixVQUFVOzRCQUNWLDJCQUEyQjs0QkFDM0IsQ0FBQyxDQUFDLEtBQUs7NEJBQ1AsMkJBQTJCOzRCQUMzQixNQUFNOzRCQUNOLENBQUMsQ0FBQyxJQUFJOzRCQUNOLFlBQVksQ0FBQztpQkFDaEI7WUFDSCxDQUFDLEVBQUMsQ0FBQztZQUNILFVBQVUsSUFBSSxVQUFVLENBQUM7WUFDekIsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDL0I7YUFBTTs7O2tCQUVDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTzs7O2tCQUVwRCxLQUFLLEdBQUc7Z0JBQ1osZUFBZTtnQkFDZixjQUFjO2dCQUNkLGNBQWM7Z0JBQ2QsZ0JBQWdCO2dCQUNoQixhQUFhO2FBQ2Q7WUFDRCxLQUFLLE1BQU0sT0FBTyxJQUFJLEtBQUssRUFBRTtnQkFDM0IsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTs7MEJBQ3JDLElBQUksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUU7OzBCQUNqRCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzs4QkFDcEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7OEJBQ3pDLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN0QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQzdDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDekMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0NBQ3ZDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7NkJBQ3BCOzRCQUNELFVBQVU7Z0NBQ1IsVUFBVTtvQ0FDViwyQkFBMkI7b0NBQzNCLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0NBQ1QsMkJBQTJCO29DQUMzQixNQUFNO29DQUNOLElBQUksQ0FBQyxDQUFDLENBQUM7b0NBQ1AsWUFBWSxDQUFDO3lCQUNoQjt3QkFDRCxNQUFNO3FCQUNQO3lCQUFNOzs4QkFDQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFVBQVU7NEJBQ25DLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVTs0QkFDekIsQ0FBQyxDQUFDLEVBQUU7d0JBQ04sVUFBVTs0QkFDUixVQUFVO2dDQUNWLDJCQUEyQjtnQ0FDM0IsS0FBSztnQ0FDTCxzQkFBc0I7Z0NBQ3RCLFdBQVc7Z0NBQ1gsS0FBSztnQ0FDTCxZQUFZLENBQUM7d0JBQ2YsTUFBTTtxQkFDUDtpQkFDRjthQUNGO1lBQ0QsVUFBVSxJQUFJLFVBQVUsQ0FBQztZQUN6QixPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7Ozs7SUFFTSxTQUFTLEtBQUksQ0FBQztDQUN0Qjs7O0lBbEhDLDZCQUF5Qjs7SUFDekIsa0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlQ2FydG8gZnJvbSAnb2wvc291cmNlL0NhcnRvREInO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IExlZ2VuZCB9IGZyb20gJy4vZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9jYXJ0by1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFF1ZXJ5SHRtbFRhcmdldCB9IGZyb20gJy4uLy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5lbnVtcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FydG9EYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZUNhcnRvO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICBnZXQgcGFyYW1zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtcyBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgOiAndGl0bGUnO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1hcExhYmVsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucyBhcyBhbnkpLm1hcExhYmVsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5SHRtbFRhcmdldCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgIDogUXVlcnlIdG1sVGFyZ2V0LkJMQU5LO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlQ2FydG8ge1xyXG4gICAgY29uc3QgY3Jvc3NPcmlnaW4gPSB0aGlzLm9wdGlvbnMuY3Jvc3NPcmlnaW5cclxuICAgICAgPyB0aGlzLm9wdGlvbnMuY3Jvc3NPcmlnaW5cclxuICAgICAgOiAnYW5vbnltb3VzJztcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgY3Jvc3NPcmlnaW5cclxuICAgICAgfSxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZUNhcnRvKHNvdXJjZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKCk6IExlZ2VuZFtdIHtcclxuICAgIGNvbnN0IGxlZ2VuZCA9IHN1cGVyLmdldExlZ2VuZCgpO1xyXG4gICAgaWYgKGxlZ2VuZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGh0bWxTdHJpbmcgPSAnPHRhYmxlPic7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbmZpZy5sYXllcnNbMF0ubGVnZW5kICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmNvbmZpZy5sYXllcnNbMF0ubGVnZW5kLml0ZW1zLmZvckVhY2goZiA9PiB7XHJcbiAgICAgICAgaWYgKGYudmlzaWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgaHRtbFN0cmluZyArPVxyXG4gICAgICAgICAgICAnPHRyPjx0ZD4nICtcclxuICAgICAgICAgICAgJzxwPjxmb250IHNpemU9XCI1XCIgY29sb3I9XCInICtcclxuICAgICAgICAgICAgZi52YWx1ZSArXHJcbiAgICAgICAgICAgICdcIj4gJiM5Njc5PC9mb250PjwvcD48L3RkPicgK1xyXG4gICAgICAgICAgICAnPHRkPicgK1xyXG4gICAgICAgICAgICBmLm5hbWUgK1xyXG4gICAgICAgICAgICAnPC90ZD48L3RyPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaHRtbFN0cmluZyArPSAnPC90YWJsZT4nO1xyXG4gICAgICByZXR1cm4gW3sgaHRtbDogaHRtbFN0cmluZyB9XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRyeSB0byBidWlsZCB0aGUgbGVnZW5kIGZyb20gdGhlIGNhcnRvY3NzIG9wdGlvbnNcclxuICAgICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zLmNvbmZpZy5sYXllcnNbMF0ub3B0aW9ucztcclxuICAgICAgLy8gQWxsIGF2YWlsYWJsZSBjYXJ0b2NzcyBzdHlsZSBvcHRpb25zXHJcbiAgICAgIGNvbnN0IHR5cGVzID0gW1xyXG4gICAgICAgICdwb2x5Z29uLWZpbGw6JyxcclxuICAgICAgICAnbWFya2VyLWZpbGw6JyxcclxuICAgICAgICAnc2hpZWxkLWZpbGw6JyxcclxuICAgICAgICAnYnVpbGRpbmctZmlsbDonLFxyXG4gICAgICAgICdsaW5lLWNvbG9yOidcclxuICAgICAgXTtcclxuICAgICAgZm9yIChjb25zdCBvbmVUeXBlIG9mIHR5cGVzKSB7XHJcbiAgICAgICAgaWYgKGxheWVyT3B0aW9ucy5jYXJ0b2Nzcy5pbmNsdWRlcyhvbmVUeXBlKSkge1xyXG4gICAgICAgICAgY29uc3QgdHlwZSA9IGxheWVyT3B0aW9ucy5jYXJ0b2Nzcy5zcGxpdChvbmVUeXBlKS5wb3AoKTtcclxuICAgICAgICAgIGNvbnN0IGNvbG9yID0gdHlwZS5zdWJzdHIoMCwgdHlwZS5pbmRleE9mKCc7JykpO1xyXG4gICAgICAgICAgaWYgKGNvbG9yLmluY2x1ZGVzKCdyYW1wJykpIHtcclxuICAgICAgICAgICAgY29uc3QgY29sb3JzID0gY29sb3Iuc3BsaXQoJywgKCcpWzFdLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBjb2xvci5zcGxpdCgnLCAoJylbMl0uc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICBjb2xvcnNbal0gPSBjb2xvcnNbal0ucmVwbGFjZSgvKFwifFxcKSkvZywgJycpO1xyXG4gICAgICAgICAgICAgIGRhdGFbal0gPSBkYXRhW2pdLnJlcGxhY2UoLyhcInxcXCkpL2csICcnKTtcclxuICAgICAgICAgICAgICBpZiAoZGF0YVtqXS5yZXBsYWNlKC9cXHMrL2csICcnKSA9PT0gJz0nKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2pdID0gJ0F1dHJlcyc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICAgICAgICAgICc8dHI+PHRkPicgK1xyXG4gICAgICAgICAgICAgICAgJzxwPjxmb250IHNpemU9XCI1XCIgY29sb3I9XCInICtcclxuICAgICAgICAgICAgICAgIGNvbG9yc1tqXSArXHJcbiAgICAgICAgICAgICAgICAnXCI+ICYjOTY3OTwvZm9udD48L3A+PC90ZD4nICtcclxuICAgICAgICAgICAgICAgICc8dGQ+JyArXHJcbiAgICAgICAgICAgICAgICBkYXRhW2pdICtcclxuICAgICAgICAgICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbGF5ZXJPcHRpb25zLmxheWVyX25hbWVcclxuICAgICAgICAgICAgICA/IGxheWVyT3B0aW9ucy5sYXllcl9uYW1lXHJcbiAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgaHRtbFN0cmluZyArPVxyXG4gICAgICAgICAgICAgICc8dHI+PHRkPicgK1xyXG4gICAgICAgICAgICAgICc8cD48Zm9udCBzaXplPVwiNVwiIGNvbG9yPVwiJyArXHJcbiAgICAgICAgICAgICAgY29sb3IgK1xyXG4gICAgICAgICAgICAgICdcIj4gJiM5Njc5PC9mb250PjwvcD4nICtcclxuICAgICAgICAgICAgICAnPC90ZD48dGQ+JyArXHJcbiAgICAgICAgICAgICAgdGl0bGUgK1xyXG4gICAgICAgICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgICAgcmV0dXJuIFt7IGh0bWw6IGh0bWxTdHJpbmcgfV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=