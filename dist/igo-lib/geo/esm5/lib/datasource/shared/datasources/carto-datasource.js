/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olSourceCarto from 'ol/source/CartoDB';
import { DataSource } from './datasource';
import { QueryHtmlTarget } from '../../../query/shared/query.enums';
var CartoDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(CartoDataSource, _super);
    function CartoDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CartoDataSource.prototype, "params", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.options.params));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartoDataSource.prototype, "queryTitle", {
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
    Object.defineProperty(CartoDataSource.prototype, "queryHtmlTarget", {
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
    CartoDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var crossOrigin = this.options.crossOrigin
            ? this.options.crossOrigin
            : 'Anonymous';
        /** @type {?} */
        var sourceOptions = Object.assign({
            crossOrigin: crossOrigin
        }, this.options);
        return new olSourceCarto(sourceOptions);
    };
    /**
     * @return {?}
     */
    CartoDataSource.prototype.getLegend = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var legend = _super.prototype.getLegend.call(this);
        if (legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        var htmlString = '<table>';
        if (this.options.config.layers[0].legend != null) {
            this.options.config.layers[0].legend.items.forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
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
            var layerOptions = this.options.config.layers[0].options;
            // All available cartocss style options
            /** @type {?} */
            var types = [
                'polygon-fill:',
                'marker-fill:',
                'shield-fill:',
                'building-fill:',
                'line-color:'
            ];
            try {
                for (var types_1 = tslib_1.__values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                    var oneType = types_1_1.value;
                    if (layerOptions.cartocss.includes(oneType)) {
                        /** @type {?} */
                        var type = layerOptions.cartocss.split(oneType).pop();
                        /** @type {?} */
                        var color = type.substr(0, type.indexOf(';'));
                        if (color.includes('ramp')) {
                            /** @type {?} */
                            var colors = color.split(', (')[1].split(',');
                            /** @type {?} */
                            var data = color.split(', (')[2].split(',');
                            for (var j = 0; j < colors.length; j++) {
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
                            var title = layerOptions.layer_name
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (types_1_1 && !types_1_1.done && (_a = types_1.return)) _a.call(types_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            htmlString += '</table>';
            return [{ html: htmlString }];
        }
    };
    return CartoDataSource;
}(DataSource));
export { CartoDataSource };
if (false) {
    /** @type {?} */
    CartoDataSource.prototype.ol;
    /** @type {?} */
    CartoDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydG8tZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jYXJ0by1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEU7SUFBcUMsMkNBQVU7SUFBL0M7O0lBNEdBLENBQUM7SUF4R0Msc0JBQUksbUNBQU07Ozs7UUFBVjtZQUNFLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQU8sQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtnQkFDckMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtnQkFDbEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWU7Ozs7UUFBbkI7WUFDRSxPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsZUFBZTtnQkFDMUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsZUFBZTtnQkFDdkMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7Ozs7O0lBRVMsd0NBQWM7Ozs7SUFBeEI7O1lBQ1EsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8s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SSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztpQ0FDcEI7Z0NBQ0QsVUFBVTtvQ0FDUixVQUFVO3dDQUNWLDJCQUEyQjt3Q0FDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQzt3Q0FDVCwyQkFBMkI7d0NBQzNCLE1BQU07d0NBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQzt3Q0FDUCxZQUFZLENBQUM7NkJBQ2hCOzRCQUNELE1BQU07eUJBQ1A7NkJBQU07O2dDQUNDLEtBQUssR0FBRyxZQUFZLENBQUMsVUFBVTtnQ0FDbkMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVO2dDQUN6QixDQUFDLENBQUMsRUFBRTs0QkFDTixVQUFVO2dDQUNSLFVBQVU7b0NBQ1YsMkJBQTJCO29DQUMzQixLQUFLO29DQUNMLHNCQUFzQjtvQ0FDdEIsV0FBVztvQ0FDWCxLQUFLO29DQUNMLFlBQVksQ0FBQzs0QkFDZixNQUFNO3lCQUNQO3FCQUNGO2lCQUNGOzs7Ozs7Ozs7WUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTVHRCxDQUFxQyxVQUFVLEdBNEc5Qzs7OztJQTNHQyw2QkFBeUI7O0lBQ3pCLGtDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZUNhcnRvIGZyb20gJ29sL3NvdXJjZS9DYXJ0b0RCJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlTGVnZW5kT3B0aW9ucyB9IGZyb20gJy4vZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9jYXJ0by1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFF1ZXJ5SHRtbFRhcmdldCB9IGZyb20gJy4uLy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5lbnVtcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FydG9EYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZUNhcnRvO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBDYXJ0b0RhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICBnZXQgcGFyYW1zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtcyBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBnZXQgcXVlcnlUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5VGl0bGVcclxuICAgICAgOiAndGl0bGUnO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5SHRtbFRhcmdldCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeUh0bWxUYXJnZXRcclxuICAgICAgPyAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgIDogUXVlcnlIdG1sVGFyZ2V0LkJMQU5LO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlQ2FydG8ge1xyXG4gICAgY29uc3QgY3Jvc3NPcmlnaW4gPSB0aGlzLm9wdGlvbnMuY3Jvc3NPcmlnaW5cclxuICAgICAgPyB0aGlzLm9wdGlvbnMuY3Jvc3NPcmlnaW5cclxuICAgICAgOiAnQW5vbnltb3VzJztcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgY3Jvc3NPcmlnaW5cclxuICAgICAgfSxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIG5ldyBvbFNvdXJjZUNhcnRvKHNvdXJjZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kKCk6IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zW10ge1xyXG4gICAgY29uc3QgbGVnZW5kID0gc3VwZXIuZ2V0TGVnZW5kKCk7XHJcbiAgICBpZiAobGVnZW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxlZ2VuZDtcclxuICAgIH1cclxuICAgIGxldCBodG1sU3RyaW5nID0gJzx0YWJsZT4nO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb25maWcubGF5ZXJzWzBdLmxlZ2VuZCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5jb25maWcubGF5ZXJzWzBdLmxlZ2VuZC5pdGVtcy5mb3JFYWNoKGYgPT4ge1xyXG4gICAgICAgIGlmIChmLnZpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICAgICAgJzx0cj48dGQ+JyArXHJcbiAgICAgICAgICAgICc8cD48Zm9udCBzaXplPVwiNVwiIGNvbG9yPVwiJyArXHJcbiAgICAgICAgICAgIGYudmFsdWUgK1xyXG4gICAgICAgICAgICAnXCI+ICYjOTY3OTwvZm9udD48L3A+PC90ZD4nICtcclxuICAgICAgICAgICAgJzx0ZD4nICtcclxuICAgICAgICAgICAgZi5uYW1lICtcclxuICAgICAgICAgICAgJzwvdGQ+PC90cj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgICAgcmV0dXJuIFt7IGh0bWw6IGh0bWxTdHJpbmcgfV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUcnkgdG8gYnVpbGQgdGhlIGxlZ2VuZCBmcm9tIHRoZSBjYXJ0b2NzcyBvcHRpb25zXHJcbiAgICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5jb25maWcubGF5ZXJzWzBdLm9wdGlvbnM7XHJcbiAgICAgIC8vIEFsbCBhdmFpbGFibGUgY2FydG9jc3Mgc3R5bGUgb3B0aW9uc1xyXG4gICAgICBjb25zdCB0eXBlcyA9IFtcclxuICAgICAgICAncG9seWdvbi1maWxsOicsXHJcbiAgICAgICAgJ21hcmtlci1maWxsOicsXHJcbiAgICAgICAgJ3NoaWVsZC1maWxsOicsXHJcbiAgICAgICAgJ2J1aWxkaW5nLWZpbGw6JyxcclxuICAgICAgICAnbGluZS1jb2xvcjonXHJcbiAgICAgIF07XHJcbiAgICAgIGZvciAoY29uc3Qgb25lVHlwZSBvZiB0eXBlcykge1xyXG4gICAgICAgIGlmIChsYXllck9wdGlvbnMuY2FydG9jc3MuaW5jbHVkZXMob25lVHlwZSkpIHtcclxuICAgICAgICAgIGNvbnN0IHR5cGUgPSBsYXllck9wdGlvbnMuY2FydG9jc3Muc3BsaXQob25lVHlwZSkucG9wKCk7XHJcbiAgICAgICAgICBjb25zdCBjb2xvciA9IHR5cGUuc3Vic3RyKDAsIHR5cGUuaW5kZXhPZignOycpKTtcclxuICAgICAgICAgIGlmIChjb2xvci5pbmNsdWRlcygncmFtcCcpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9ycyA9IGNvbG9yLnNwbGl0KCcsICgnKVsxXS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gY29sb3Iuc3BsaXQoJywgKCcpWzJdLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgY29sb3JzW2pdID0gY29sb3JzW2pdLnJlcGxhY2UoLyhcInxcXCkpL2csICcnKTtcclxuICAgICAgICAgICAgICBkYXRhW2pdID0gZGF0YVtqXS5yZXBsYWNlKC8oXCJ8XFwpKS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgaWYgKGRhdGFbal0ucmVwbGFjZSgvXFxzKy9nLCAnJykgPT09ICc9Jykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtqXSA9ICdBdXRyZXMnO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBodG1sU3RyaW5nICs9XHJcbiAgICAgICAgICAgICAgICAnPHRyPjx0ZD4nICtcclxuICAgICAgICAgICAgICAgICc8cD48Zm9udCBzaXplPVwiNVwiIGNvbG9yPVwiJyArXHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbal0gK1xyXG4gICAgICAgICAgICAgICAgJ1wiPiAmIzk2Nzk8L2ZvbnQ+PC9wPjwvdGQ+JyArXHJcbiAgICAgICAgICAgICAgICAnPHRkPicgK1xyXG4gICAgICAgICAgICAgICAgZGF0YVtqXSArXHJcbiAgICAgICAgICAgICAgICAnPC90ZD48L3RyPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGxheWVyT3B0aW9ucy5sYXllcl9uYW1lXHJcbiAgICAgICAgICAgICAgPyBsYXllck9wdGlvbnMubGF5ZXJfbmFtZVxyXG4gICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICAgICAgICAnPHRyPjx0ZD4nICtcclxuICAgICAgICAgICAgICAnPHA+PGZvbnQgc2l6ZT1cIjVcIiBjb2xvcj1cIicgK1xyXG4gICAgICAgICAgICAgIGNvbG9yICtcclxuICAgICAgICAgICAgICAnXCI+ICYjOTY3OTwvZm9udD48L3A+JyArXHJcbiAgICAgICAgICAgICAgJzwvdGQ+PHRkPicgK1xyXG4gICAgICAgICAgICAgIHRpdGxlICtcclxuICAgICAgICAgICAgICAnPC90ZD48L3RyPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBodG1sU3RyaW5nICs9ICc8L3RhYmxlPic7XHJcbiAgICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=