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
    Object.defineProperty(CartoDataSource.prototype, "mapLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.options))).mapLabel;
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
            : 'anonymous';
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
    /**
     * @return {?}
     */
    CartoDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () { };
    return CartoDataSource;
}(DataSource));
export { CartoDataSource };
if (false) {
    /** @type {?} */
    CartoDataSource.prototype.ol;
    /** @type {?} */
    CartoDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydG8tZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jYXJ0by1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEU7SUFBcUMsMkNBQVU7SUFBL0M7O0lBbUhBLENBQUM7SUEvR0Msc0JBQUksbUNBQU07Ozs7UUFBVjtZQUNFLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQU8sQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtnQkFDckMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtnQkFDbEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBRUQsc0JBQUkscUNBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBZTs7OztRQUFuQjtZQUNFLE9BQU8sQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO2dCQUMxQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxlQUFlO2dCQUN2QyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUM1QixDQUFD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RSxDQUFDLENBQUM7Z0NBQ3pDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFO29DQUN2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO2lDQUNwQjtnQ0FDRCxVQUFVO29DQUNSLFVBQVU7d0NBQ1YsMkJBQTJCO3dDQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDO3dDQUNULDJCQUEyQjt3Q0FDM0IsTUFBTTt3Q0FDTixJQUFJLENBQUMsQ0FBQyxDQUFDO3dDQUNQLFlBQVksQ0FBQzs2QkFDaEI7NEJBQ0QsTUFBTTt5QkFDUDs2QkFBTTs7Z0NBQ0MsS0FBSyxHQUFHLFlBQVksQ0FBQyxVQUFVO2dDQUNuQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVU7Z0NBQ3pCLENBQUMsQ0FBQyxFQUFFOzRCQUNOLFVBQVU7Z0NBQ1IsVUFBVTtvQ0FDViwyQkFBMkI7b0NBQzNCLEtBQUs7b0NBQ0wsc0JBQXNCO29DQUN0QixXQUFXO29DQUNYLEtBQUs7b0NBQ0wsWUFBWSxDQUFDOzRCQUNmLE1BQU07eUJBQ1A7cUJBQ0Y7aUJBQ0Y7Ozs7Ozs7OztZQUNELFVBQVUsSUFBSSxVQUFVLENBQUM7WUFDekIsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7O0lBRU0sbUNBQVM7OztJQUFoQixjQUFvQixDQUFDO0lBQ3ZCLHNCQUFDO0FBQUQsQ0FBQyxBQW5IRCxDQUFxQyxVQUFVLEdBbUg5Qzs7OztJQWxIQyw2QkFBeUI7O0lBQ3pCLGtDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZUNhcnRvIGZyb20gJ29sL3NvdXJjZS9DYXJ0b0RCJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBMZWdlbmQgfSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ2FydG9EYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vY2FydG8tZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhcnRvRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VDYXJ0bztcclxuICBwdWJsaWMgb3B0aW9uczogQ2FydG9EYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5VGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgIDogJ3RpdGxlJztcclxuICB9XHJcblxyXG4gIGdldCBtYXBMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgYW55KS5tYXBMYWJlbDtcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeUh0bWxUYXJnZXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA6IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZUNhcnRvIHtcclxuICAgIGNvbnN0IGNyb3NzT3JpZ2luID0gdGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luXHJcbiAgICAgID8gdGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luXHJcbiAgICAgIDogJ2Fub255bW91cyc7XHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIGNyb3NzT3JpZ2luXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMub3B0aW9uc1xyXG4gICAgKTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VDYXJ0byhzb3VyY2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZCgpOiBMZWdlbmRbXSB7XHJcbiAgICBjb25zdCBsZWdlbmQgPSBzdXBlci5nZXRMZWdlbmQoKTtcclxuICAgIGlmIChsZWdlbmQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGVnZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBodG1sU3RyaW5nID0gJzx0YWJsZT4nO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb25maWcubGF5ZXJzWzBdLmxlZ2VuZCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5jb25maWcubGF5ZXJzWzBdLmxlZ2VuZC5pdGVtcy5mb3JFYWNoKGYgPT4ge1xyXG4gICAgICAgIGlmIChmLnZpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICAgICAgJzx0cj48dGQ+JyArXHJcbiAgICAgICAgICAgICc8cD48Zm9udCBzaXplPVwiNVwiIGNvbG9yPVwiJyArXHJcbiAgICAgICAgICAgIGYudmFsdWUgK1xyXG4gICAgICAgICAgICAnXCI+ICYjOTY3OTwvZm9udD48L3A+PC90ZD4nICtcclxuICAgICAgICAgICAgJzx0ZD4nICtcclxuICAgICAgICAgICAgZi5uYW1lICtcclxuICAgICAgICAgICAgJzwvdGQ+PC90cj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGh0bWxTdHJpbmcgKz0gJzwvdGFibGU+JztcclxuICAgICAgcmV0dXJuIFt7IGh0bWw6IGh0bWxTdHJpbmcgfV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUcnkgdG8gYnVpbGQgdGhlIGxlZ2VuZCBmcm9tIHRoZSBjYXJ0b2NzcyBvcHRpb25zXHJcbiAgICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5jb25maWcubGF5ZXJzWzBdLm9wdGlvbnM7XHJcbiAgICAgIC8vIEFsbCBhdmFpbGFibGUgY2FydG9jc3Mgc3R5bGUgb3B0aW9uc1xyXG4gICAgICBjb25zdCB0eXBlcyA9IFtcclxuICAgICAgICAncG9seWdvbi1maWxsOicsXHJcbiAgICAgICAgJ21hcmtlci1maWxsOicsXHJcbiAgICAgICAgJ3NoaWVsZC1maWxsOicsXHJcbiAgICAgICAgJ2J1aWxkaW5nLWZpbGw6JyxcclxuICAgICAgICAnbGluZS1jb2xvcjonXHJcbiAgICAgIF07XHJcbiAgICAgIGZvciAoY29uc3Qgb25lVHlwZSBvZiB0eXBlcykge1xyXG4gICAgICAgIGlmIChsYXllck9wdGlvbnMuY2FydG9jc3MuaW5jbHVkZXMob25lVHlwZSkpIHtcclxuICAgICAgICAgIGNvbnN0IHR5cGUgPSBsYXllck9wdGlvbnMuY2FydG9jc3Muc3BsaXQob25lVHlwZSkucG9wKCk7XHJcbiAgICAgICAgICBjb25zdCBjb2xvciA9IHR5cGUuc3Vic3RyKDAsIHR5cGUuaW5kZXhPZignOycpKTtcclxuICAgICAgICAgIGlmIChjb2xvci5pbmNsdWRlcygncmFtcCcpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9ycyA9IGNvbG9yLnNwbGl0KCcsICgnKVsxXS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gY29sb3Iuc3BsaXQoJywgKCcpWzJdLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgY29sb3JzW2pdID0gY29sb3JzW2pdLnJlcGxhY2UoLyhcInxcXCkpL2csICcnKTtcclxuICAgICAgICAgICAgICBkYXRhW2pdID0gZGF0YVtqXS5yZXBsYWNlKC8oXCJ8XFwpKS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgaWYgKGRhdGFbal0ucmVwbGFjZSgvXFxzKy9nLCAnJykgPT09ICc9Jykge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtqXSA9ICdBdXRyZXMnO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBodG1sU3RyaW5nICs9XHJcbiAgICAgICAgICAgICAgICAnPHRyPjx0ZD4nICtcclxuICAgICAgICAgICAgICAgICc8cD48Zm9udCBzaXplPVwiNVwiIGNvbG9yPVwiJyArXHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbal0gK1xyXG4gICAgICAgICAgICAgICAgJ1wiPiAmIzk2Nzk8L2ZvbnQ+PC9wPjwvdGQ+JyArXHJcbiAgICAgICAgICAgICAgICAnPHRkPicgK1xyXG4gICAgICAgICAgICAgICAgZGF0YVtqXSArXHJcbiAgICAgICAgICAgICAgICAnPC90ZD48L3RyPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGxheWVyT3B0aW9ucy5sYXllcl9uYW1lXHJcbiAgICAgICAgICAgICAgPyBsYXllck9wdGlvbnMubGF5ZXJfbmFtZVxyXG4gICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIGh0bWxTdHJpbmcgKz1cclxuICAgICAgICAgICAgICAnPHRyPjx0ZD4nICtcclxuICAgICAgICAgICAgICAnPHA+PGZvbnQgc2l6ZT1cIjVcIiBjb2xvcj1cIicgK1xyXG4gICAgICAgICAgICAgIGNvbG9yICtcclxuICAgICAgICAgICAgICAnXCI+ICYjOTY3OTwvZm9udD48L3A+JyArXHJcbiAgICAgICAgICAgICAgJzwvdGQ+PHRkPicgK1xyXG4gICAgICAgICAgICAgIHRpdGxlICtcclxuICAgICAgICAgICAgICAnPC90ZD48L3RyPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBodG1sU3RyaW5nICs9ICc8L3RhYmxlPic7XHJcbiAgICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcbn1cclxuIl19