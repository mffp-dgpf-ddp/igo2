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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydG8tZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jYXJ0by1kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEU7SUFBcUMsMkNBQVU7SUFBL0M7O0lBOEdBLENBQUM7SUExR0Msc0JBQUksbUNBQU07Ozs7UUFBVjtZQUNFLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQU8sQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtnQkFDckMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVTtnQkFDbEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWU7Ozs7UUFBbkI7WUFDRSxPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsZUFBZTtnQkFDMUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsZUFBZTtnQkFDdkMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7Ozs7O0lBRVMsd0NBQWM7Ozs7SUFBeEI7O1lBQ1EsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8s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SSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztpQ0FDcEI7Z0NBQ0QsVUFBVTtvQ0FDUixVQUFVO3dDQUNWLDJCQUEyQjt3Q0FDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQzt3Q0FDVCwyQkFBMkI7d0NBQzNCLE1BQU07d0NBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQzt3Q0FDUCxZQUFZLENBQUM7NkJBQ2hCOzRCQUNELE1BQU07eUJBQ1A7NkJBQU07O2dDQUNDLEtBQUssR0FBRyxZQUFZLENBQUMsVUFBVTtnQ0FDbkMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVO2dDQUN6QixDQUFDLENBQUMsRUFBRTs0QkFDTixVQUFVO2dDQUNSLFVBQVU7b0NBQ1YsMkJBQTJCO29DQUMzQixLQUFLO29DQUNMLHNCQUFzQjtvQ0FDdEIsV0FBVztvQ0FDWCxLQUFLO29DQUNMLFlBQVksQ0FBQzs0QkFDZixNQUFNO3lCQUNQO3FCQUNGO2lCQUNGOzs7Ozs7Ozs7WUFDRCxVQUFVLElBQUksVUFBVSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7OztJQUVNLG1DQUFTOzs7SUFBaEIsY0FBb0IsQ0FBQztJQUN2QixzQkFBQztBQUFELENBQUMsQUE5R0QsQ0FBcUMsVUFBVSxHQThHOUM7Ozs7SUE3R0MsNkJBQXlCOztJQUN6QixrQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VDYXJ0byBmcm9tICdvbC9zb3VyY2UvQ2FydG9EQic7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZUxlZ2VuZE9wdGlvbnMgfSBmcm9tICcuL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ2FydG9EYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vY2FydG8tZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBRdWVyeUh0bWxUYXJnZXQgfSBmcm9tICcuLi8uLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuZW51bXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhcnRvRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VDYXJ0bztcclxuICBwdWJsaWMgb3B0aW9uczogQ2FydG9EYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgZ2V0IHBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbXMgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHF1ZXJ5VGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlUaXRsZVxyXG4gICAgICA/ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5xdWVyeVRpdGxlXHJcbiAgICAgIDogJ3RpdGxlJztcclxuICB9XHJcblxyXG4gIGdldCBxdWVyeUh0bWxUYXJnZXQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zIGFzIGFueSkucXVlcnlIdG1sVGFyZ2V0XHJcbiAgICAgID8gKHRoaXMub3B0aW9ucyBhcyBhbnkpLnF1ZXJ5SHRtbFRhcmdldFxyXG4gICAgICA6IFF1ZXJ5SHRtbFRhcmdldC5CTEFOSztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZUNhcnRvIHtcclxuICAgIGNvbnN0IGNyb3NzT3JpZ2luID0gdGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luXHJcbiAgICAgID8gdGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luXHJcbiAgICAgIDogJ2Fub255bW91cyc7XHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIGNyb3NzT3JpZ2luXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMub3B0aW9uc1xyXG4gICAgKTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VDYXJ0byhzb3VyY2VPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZCgpOiBEYXRhU291cmNlTGVnZW5kT3B0aW9uc1tdIHtcclxuICAgIGNvbnN0IGxlZ2VuZCA9IHN1cGVyLmdldExlZ2VuZCgpO1xyXG4gICAgaWYgKGxlZ2VuZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsZWdlbmQ7XHJcbiAgICB9XHJcbiAgICBsZXQgaHRtbFN0cmluZyA9ICc8dGFibGU+JztcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29uZmlnLmxheWVyc1swXS5sZWdlbmQgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm9wdGlvbnMuY29uZmlnLmxheWVyc1swXS5sZWdlbmQuaXRlbXMuZm9yRWFjaChmID0+IHtcclxuICAgICAgICBpZiAoZi52aXNpYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBodG1sU3RyaW5nICs9XHJcbiAgICAgICAgICAgICc8dHI+PHRkPicgK1xyXG4gICAgICAgICAgICAnPHA+PGZvbnQgc2l6ZT1cIjVcIiBjb2xvcj1cIicgK1xyXG4gICAgICAgICAgICBmLnZhbHVlICtcclxuICAgICAgICAgICAgJ1wiPiAmIzk2Nzk8L2ZvbnQ+PC9wPjwvdGQ+JyArXHJcbiAgICAgICAgICAgICc8dGQ+JyArXHJcbiAgICAgICAgICAgIGYubmFtZSArXHJcbiAgICAgICAgICAgICc8L3RkPjwvdHI+JztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBodG1sU3RyaW5nICs9ICc8L3RhYmxlPic7XHJcbiAgICAgIHJldHVybiBbeyBodG1sOiBodG1sU3RyaW5nIH1dO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gVHJ5IHRvIGJ1aWxkIHRoZSBsZWdlbmQgZnJvbSB0aGUgY2FydG9jc3Mgb3B0aW9uc1xyXG4gICAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuY29uZmlnLmxheWVyc1swXS5vcHRpb25zO1xyXG4gICAgICAvLyBBbGwgYXZhaWxhYmxlIGNhcnRvY3NzIHN0eWxlIG9wdGlvbnNcclxuICAgICAgY29uc3QgdHlwZXMgPSBbXHJcbiAgICAgICAgJ3BvbHlnb24tZmlsbDonLFxyXG4gICAgICAgICdtYXJrZXItZmlsbDonLFxyXG4gICAgICAgICdzaGllbGQtZmlsbDonLFxyXG4gICAgICAgICdidWlsZGluZy1maWxsOicsXHJcbiAgICAgICAgJ2xpbmUtY29sb3I6J1xyXG4gICAgICBdO1xyXG4gICAgICBmb3IgKGNvbnN0IG9uZVR5cGUgb2YgdHlwZXMpIHtcclxuICAgICAgICBpZiAobGF5ZXJPcHRpb25zLmNhcnRvY3NzLmluY2x1ZGVzKG9uZVR5cGUpKSB7XHJcbiAgICAgICAgICBjb25zdCB0eXBlID0gbGF5ZXJPcHRpb25zLmNhcnRvY3NzLnNwbGl0KG9uZVR5cGUpLnBvcCgpO1xyXG4gICAgICAgICAgY29uc3QgY29sb3IgPSB0eXBlLnN1YnN0cigwLCB0eXBlLmluZGV4T2YoJzsnKSk7XHJcbiAgICAgICAgICBpZiAoY29sb3IuaW5jbHVkZXMoJ3JhbXAnKSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb2xvcnMgPSBjb2xvci5zcGxpdCgnLCAoJylbMV0uc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGNvbG9yLnNwbGl0KCcsICgnKVsyXS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgIGNvbG9yc1tqXSA9IGNvbG9yc1tqXS5yZXBsYWNlKC8oXCJ8XFwpKS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgZGF0YVtqXSA9IGRhdGFbal0ucmVwbGFjZSgvKFwifFxcKSkvZywgJycpO1xyXG4gICAgICAgICAgICAgIGlmIChkYXRhW2pdLnJlcGxhY2UoL1xccysvZywgJycpID09PSAnPScpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbal0gPSAnQXV0cmVzJztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaHRtbFN0cmluZyArPVxyXG4gICAgICAgICAgICAgICAgJzx0cj48dGQ+JyArXHJcbiAgICAgICAgICAgICAgICAnPHA+PGZvbnQgc2l6ZT1cIjVcIiBjb2xvcj1cIicgK1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2pdICtcclxuICAgICAgICAgICAgICAgICdcIj4gJiM5Njc5PC9mb250PjwvcD48L3RkPicgK1xyXG4gICAgICAgICAgICAgICAgJzx0ZD4nICtcclxuICAgICAgICAgICAgICAgIGRhdGFbal0gK1xyXG4gICAgICAgICAgICAgICAgJzwvdGQ+PC90cj4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsYXllck9wdGlvbnMubGF5ZXJfbmFtZVxyXG4gICAgICAgICAgICAgID8gbGF5ZXJPcHRpb25zLmxheWVyX25hbWVcclxuICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICBodG1sU3RyaW5nICs9XHJcbiAgICAgICAgICAgICAgJzx0cj48dGQ+JyArXHJcbiAgICAgICAgICAgICAgJzxwPjxmb250IHNpemU9XCI1XCIgY29sb3I9XCInICtcclxuICAgICAgICAgICAgICBjb2xvciArXHJcbiAgICAgICAgICAgICAgJ1wiPiAmIzk2Nzk8L2ZvbnQ+PC9wPicgK1xyXG4gICAgICAgICAgICAgICc8L3RkPjx0ZD4nICtcclxuICAgICAgICAgICAgICB0aXRsZSArXHJcbiAgICAgICAgICAgICAgJzwvdGQ+PC90cj4nO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaHRtbFN0cmluZyArPSAnPC90YWJsZT4nO1xyXG4gICAgICByZXR1cm4gW3sgaHRtbDogaHRtbFN0cmluZyB9XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG59XHJcbiJdfQ==