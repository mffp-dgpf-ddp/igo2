/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';
import { createOverlayMarkerStyle } from '../../overlay';
import * as i0 from "@angular/core";
var StyleService = /** @class */ (function () {
    function StyleService() {
    }
    /**
     * @param {?} options
     * @return {?}
     */
    StyleService.prototype.createStyle = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (!options) {
            return createOverlayMarkerStyle();
        }
        if (typeof options === 'function' || options instanceof olstyle.Style) {
            return options;
        }
        return this.parseStyle('style', options);
    };
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    StyleService.prototype.parseStyle = /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var _this = this;
        /** @type {?} */
        var styleOptions = {};
        /** @type {?} */
        var olCls = this.getOlCls(key);
        if (olCls && value instanceof Object) {
            Object.keys(value).forEach((/**
             * @param {?} _key
             * @return {?}
             */
            function (_key) {
                /** @type {?} */
                var olKey = _this.getOlKey(_key);
                styleOptions[olKey] = _this.parseStyle(_key, value[_key]);
            }));
            return new olCls(styleOptions);
        }
        else {
            return value;
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    StyleService.prototype.getOlKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var olKey;
        switch (key.toLowerCase()) {
            case 'circle':
            case 'regularshape':
            case 'icon':
                olKey = 'image';
                break;
            default:
                break;
        }
        return olKey || key;
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    StyleService.prototype.getOlCls = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var olCls = olstyle[key.charAt(0).toUpperCase() + key.slice(1)];
        if (key === 'regularshape') {
            olCls = olstyle.RegularShape;
        }
        if (key === 'backgroundFill') {
            olCls = olstyle.Fill;
        }
        if (key === 'backgroundStroke') {
            olCls = olstyle.Stroke;
        }
        return olCls;
    };
    /**
     * @param {?} feature
     * @param {?} styleByAttribute
     * @return {?}
     */
    StyleService.prototype.createStyleByAttribute = /**
     * @param {?} feature
     * @param {?} styleByAttribute
     * @return {?}
     */
    function (feature, styleByAttribute) {
        /** @type {?} */
        var style;
        /** @type {?} */
        var type = styleByAttribute.type;
        /** @type {?} */
        var attribute = styleByAttribute.attribute;
        /** @type {?} */
        var data = styleByAttribute.data;
        /** @type {?} */
        var stroke = styleByAttribute.stroke;
        /** @type {?} */
        var width = styleByAttribute.width;
        /** @type {?} */
        var fill = styleByAttribute.fill;
        /** @type {?} */
        var radius = styleByAttribute.radius;
        /** @type {?} */
        var icon = styleByAttribute.icon;
        /** @type {?} */
        var scale = styleByAttribute.scale;
        /** @type {?} */
        var size = data.length;
        /** @type {?} */
        var label = styleByAttribute.label.attribute || styleByAttribute.label;
        /** @type {?} */
        var labelStyle = this.parseStyle('text', styleByAttribute.label.style) ||
            new olstyle.Text();
        labelStyle.setText(this.getLabel(feature, label));
        /** @type {?} */
        var baseStyle = styleByAttribute.baseStyle;
        if (type === 'circle') {
            for (var i = 0; i < size; i++) {
                /** @type {?} */
                var val = typeof feature.get(attribute) !== 'undefined'
                    ? feature.get(attribute)
                    : '';
                if (val === data[i] || val.toString().match(data[i])) {
                    if (icon) {
                        style = [
                            new olstyle.Style({
                                image: new olstyle.Icon({
                                    src: icon[i],
                                    scale: scale ? scale[i] : 1
                                })
                            })
                        ];
                        return style;
                    }
                    style = [
                        new olstyle.Style({
                            image: new olstyle.Circle({
                                radius: radius ? radius[i] : 4,
                                stroke: new olstyle.Stroke({
                                    color: stroke ? stroke[i] : 'black',
                                    width: width ? width[i] : 1
                                }),
                                fill: new olstyle.Fill({
                                    color: fill ? fill[i] : 'black'
                                })
                            }),
                            text: labelStyle
                        })
                    ];
                    return style;
                }
            }
            if (!feature.getStyle()) {
                style = [
                    new olstyle.Style({
                        image: new olstyle.Circle({
                            radius: 4,
                            stroke: new olstyle.Stroke({
                                color: 'black'
                            }),
                            fill: new olstyle.Fill({
                                color: '#bbbbf2'
                            })
                        })
                    })
                ];
                return style;
            }
        }
        else if (type === 'regular') {
            for (var i = 0; i < size; i++) {
                /** @type {?} */
                var val = typeof feature.get(attribute) !== 'undefined'
                    ? feature.get(attribute)
                    : '';
                if (val === data[i] || val.toString().match(data[i])) {
                    style = [
                        new olstyle.Style({
                            stroke: new olstyle.Stroke({
                                color: stroke ? stroke[i] : 'black',
                                width: width ? width[i] : 1
                            }),
                            fill: new olstyle.Fill({
                                color: fill ? fill[i] : 'rgba(255,255,255,0.4)'
                            }),
                            text: labelStyle
                        })
                    ];
                    return style;
                }
            }
            if (feature instanceof OlFeature) {
                if (!feature.getStyle()) {
                    if (baseStyle) {
                        style = this.createStyle(baseStyle);
                        return style;
                    }
                    style = [
                        new olstyle.Style({
                            stroke: new olstyle.Stroke({
                                color: 'black'
                            }),
                            fill: new olstyle.Fill({
                                color: '#bbbbf2'
                            })
                        })
                    ];
                    return style;
                }
            }
        }
    };
    /**
     * @param {?} feature
     * @param {?=} clusterParam
     * @param {?=} layerStyle
     * @return {?}
     */
    StyleService.prototype.createClusterStyle = /**
     * @param {?} feature
     * @param {?=} clusterParam
     * @param {?=} layerStyle
     * @return {?}
     */
    function (feature, clusterParam, layerStyle) {
        if (clusterParam === void 0) { clusterParam = {}; }
        var e_1, _a;
        /** @type {?} */
        var style;
        /** @type {?} */
        var size = feature.get('features').length;
        if (size !== 1) {
            if (clusterParam.clusterRanges) {
                try {
                    for (var _b = tslib_1.__values(clusterParam.clusterRanges), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var r = _c.value;
                        if ((!r.minRadius || r.minRadius <= size) &&
                            (!r.maxRadius || r.maxRadius >= size)) {
                            style = this.createStyle(r.style);
                            if (r.showRange) {
                                /** @type {?} */
                                var text = new olstyle.Text({
                                    text: size.toString(),
                                    fill: new olstyle.Fill({
                                        color: '#fff'
                                    })
                                });
                                style.setText(text);
                            }
                            if (r.dynamicRadius) {
                                /** @type {?} */
                                var clusterRadius = void 0;
                                /** @type {?} */
                                var radiusMin = style.image_.getRadius();
                                clusterRadius = 5 * Math.log(size);
                                if (clusterRadius < radiusMin) {
                                    clusterRadius = radiusMin;
                                }
                                style.image_.setRadius(clusterRadius);
                            }
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (!style) {
                /** @type {?} */
                var clusterRadius = void 0;
                if (clusterParam.radiusCalc) {
                    clusterRadius = clusterParam.radiusCalc(size);
                }
                else {
                    /** @type {?} */
                    var radiusMin = 6;
                    clusterRadius = 5 * Math.log(size);
                    if (clusterRadius < radiusMin) {
                        clusterRadius = radiusMin;
                    }
                }
                style = [
                    new olstyle.Style({
                        image: new olstyle.Circle({
                            radius: clusterRadius,
                            opacity: 0.4,
                            stroke: new olstyle.Stroke({
                                color: 'black'
                            }),
                            fill: new olstyle.Fill({
                                color: 'rgba(24, 134, 45, 0.5)'
                            })
                        }),
                        text: new olstyle.Text({
                            text: size.toString(),
                            fill: new olstyle.Fill({
                                color: '#fff'
                            })
                        })
                    })
                ];
            }
        }
        else {
            style = this.createStyle(layerStyle);
        }
        return style;
    };
    /**
     * @param {?} feature
     * @param {?} labelMatch
     * @return {?}
     */
    StyleService.prototype.getLabel = /**
     * @param {?} feature
     * @param {?} labelMatch
     * @return {?}
     */
    function (feature, labelMatch) {
        /** @type {?} */
        var label = labelMatch;
        /** @type {?} */
        var labelToGet = Array.from(labelMatch.matchAll(/\$\{([^\{\}]+)\}/g));
        labelToGet.forEach((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            label = label.replace(v[0], feature.get(v[1]));
        }));
        // Nothing done? check feature's attribute
        if (labelToGet.length === 0 && label === labelMatch) {
            label = feature.get(labelMatch) || labelMatch;
        }
        return label;
    };
    StyleService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ StyleService.ngInjectableDef = i0.defineInjectable({ factory: function StyleService_Factory() { return new StyleService(); }, token: StyleService, providedIn: "root" });
    return StyleService;
}());
export { StyleService };
if (false) {
    /** @type {?} */
    StyleService.prototype.style;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBSW5DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFekQ7SUFBQTtLQXlRQzs7Ozs7SUFuUUMsa0NBQVc7Ozs7SUFBWCxVQUFZLE9BQStCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLHdCQUF3QixFQUFFLENBQUM7U0FDbkM7UUFDRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsSUFBSSxPQUFPLFlBQVksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNyRSxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7OztJQUVPLGlDQUFVOzs7Ozs7SUFBbEIsVUFBbUIsR0FBVyxFQUFFLEtBQVU7UUFBMUMsaUJBYUM7O1lBWk8sWUFBWSxHQUFHLEVBQUU7O1lBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUVoQyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsSUFBSTs7b0JBQ3ZCLEtBQUssR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDakMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMs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Q3RCLEtBQUssR0FBRyxVQUFVOztZQUNoQixVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFdkUsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLENBQUM7WUFDbEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDLEVBQUMsQ0FBQztRQUVILDBDQUEwQztRQUMxQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbkQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDO1NBQy9DO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkF4UUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O3VCQVhEO0NBa1JDLEFBelFELElBeVFDO1NBdFFZLFlBQVk7OztJQUN2Qiw2QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IHsgU3R5bGVCeUF0dHJpYnV0ZSB9IGZyb20gJy4vdmVjdG9yLXN0eWxlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgeyBDbHVzdGVyUGFyYW0gfSBmcm9tICcuL2NsdXN0ZXJQYXJhbSc7XHJcbmltcG9ydCB7IGNyZWF0ZU92ZXJsYXlNYXJrZXJTdHlsZSB9IGZyb20gJy4uLy4uL292ZXJsYXknO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3R5bGVTZXJ2aWNlIHtcclxuICBwdWJsaWMgc3R5bGU6IG9sc3R5bGUuU3R5bGU7XHJcblxyXG4gIGNyZWF0ZVN0eWxlKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIG9sc3R5bGUuU3R5bGUpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZVN0eWxlKCdzdHlsZScsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVN0eWxlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogb2xzdHlsZSB7XHJcbiAgICBjb25zdCBzdHlsZU9wdGlvbnMgPSB7fTtcclxuICAgIGNvbnN0IG9sQ2xzID0gdGhpcy5nZXRPbENscyhrZXkpO1xyXG5cclxuICAgIGlmIChvbENscyAmJiB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChfa2V5ID0+IHtcclxuICAgICAgICBjb25zdCBvbEtleSA9IHRoaXMuZ2V0T2xLZXkoX2tleSk7XHJcbiAgICAgICAgc3R5bGVPcHRpb25zW29sS2V5XSA9IHRoaXMucGFyc2VTdHlsZShfa2V5LCB2YWx1ZVtfa2V5XSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbmV3IG9sQ2xzKHN0eWxlT3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9sS2V5KGtleTogYW55KSB7XHJcbiAgICBsZXQgb2xLZXk7XHJcbiAgICBzd2l0Y2ggKGtleS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgIGNhc2UgJ2NpcmNsZSc6XHJcbiAgICAgIGNhc2UgJ3JlZ3VsYXJzaGFwZSc6XHJcbiAgICAgIGNhc2UgJ2ljb24nOlxyXG4gICAgICAgIG9sS2V5ID0gJ2ltYWdlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xLZXkgfHwga2V5O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPbENscyhrZXk6IGFueSkge1xyXG4gICAgbGV0IG9sQ2xzID0gb2xzdHlsZVtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSldO1xyXG4gICAgaWYgKGtleSA9PT0gJ3JlZ3VsYXJzaGFwZScpIHtcclxuICAgICAgb2xDbHMgPSBvbHN0eWxlLlJlZ3VsYXJTaGFwZTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09ICdiYWNrZ3JvdW5kRmlsbCcpIHtcclxuICAgICAgb2xDbHMgPSBvbHN0eWxlLkZpbGw7XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5ID09PSAnYmFja2dyb3VuZFN0cm9rZScpIHtcclxuICAgICAgb2xDbHMgPSBvbHN0eWxlLlN0cm9rZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xDbHM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTdHlsZUJ5QXR0cmlidXRlKGZlYXR1cmUsIHN0eWxlQnlBdHRyaWJ1dGU6IFN0eWxlQnlBdHRyaWJ1dGUpIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGNvbnN0IHR5cGUgPSBzdHlsZUJ5QXR0cmlidXRlLnR5cGU7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBzdHlsZUJ5QXR0cmlidXRlLmF0dHJpYnV0ZTtcclxuICAgIGNvbnN0IGRhdGEgPSBzdHlsZUJ5QXR0cmlidXRlLmRhdGE7XHJcbiAgICBjb25zdCBzdHJva2UgPSBzdHlsZUJ5QXR0cmlidXRlLnN0cm9rZTtcclxuICAgIGNvbnN0IHdpZHRoID0gc3R5bGVCeUF0dHJpYnV0ZS53aWR0aDtcclxuICAgIGNvbnN0IGZpbGwgPSBzdHlsZUJ5QXR0cmlidXRlLmZpbGw7XHJcbiAgICBjb25zdCByYWRpdXMgPSBzdHlsZUJ5QXR0cmlidXRlLnJhZGl1cztcclxuICAgIGNvbnN0IGljb24gPSBzdHlsZUJ5QXR0cmlidXRlLmljb247XHJcbiAgICBjb25zdCBzY2FsZSA9IHN0eWxlQnlBdHRyaWJ1dGUuc2NhbGU7XHJcbiAgICBjb25zdCBzaXplID0gZGF0YS5sZW5ndGg7XHJcbiAgICBjb25zdCBsYWJlbCA9IHN0eWxlQnlBdHRyaWJ1dGUubGFiZWwuYXR0cmlidXRlIHx8IHN0eWxlQnlBdHRyaWJ1dGUubGFiZWw7XHJcbiAgICBjb25zdCBsYWJlbFN0eWxlID1cclxuICAgICAgdGhpcy5wYXJzZVN0eWxlKCd0ZXh0Jywgc3R5bGVCeUF0dHJpYnV0ZS5sYWJlbC5zdHlsZSkgfHxcclxuICAgICAgbmV3IG9sc3R5bGUuVGV4dCgpO1xyXG4gICAgbGFiZWxTdHlsZS5zZXRUZXh0KHRoaXMuZ2V0TGFiZWwoZmVhdHVyZSwgbGFiZWwpKTtcclxuICAgIGNvbnN0IGJhc2VTdHlsZSA9IHN0eWxlQnlBdHRyaWJ1dGUuYmFzZVN0eWxlO1xyXG4gICAgaWYgKHR5cGUgPT09ICdjaXJjbGUnKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlLmdldChhdHRyaWJ1dGUpICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICA/IGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSlcclxuICAgICAgICAgICAgOiAnJztcclxuICAgICAgICBpZiAodmFsID09PSBkYXRhW2ldIHx8IHZhbC50b1N0cmluZygpLm1hdGNoKGRhdGFbaV0pKSB7XHJcbiAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XHJcbiAgICAgICAgICAgICAgICAgIHNyYzogaWNvbltpXSxcclxuICAgICAgICAgICAgICAgICAgc2NhbGU6IHNjYWxlID8gc2NhbGVbaV0gOiAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyA/IHJhZGl1c1tpXSA6IDQsXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBzdHJva2UgPyBzdHJva2VbaV0gOiAnYmxhY2snLFxyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGggPyB3aWR0aFtpXSA6IDFcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBmaWxsID8gZmlsbFtpXSA6ICdibGFjaydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdGV4dDogbGFiZWxTdHlsZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmZWF0dXJlLmdldFN0eWxlKCkpIHtcclxuICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgcmFkaXVzOiA0LFxyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNiYmJiZjInXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JlZ3VsYXInKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlLmdldChhdHRyaWJ1dGUpICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICA/IGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSlcclxuICAgICAgICAgICAgOiAnJztcclxuICAgICAgICBpZiAodmFsID09PSBkYXRhW2ldIHx8IHZhbC50b1N0cmluZygpLm1hdGNoKGRhdGFbaV0pKSB7XHJcbiAgICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBzdHJva2UgPyBzdHJva2VbaV0gOiAnYmxhY2snLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoID8gd2lkdGhbaV0gOiAxXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogZmlsbCA/IGZpbGxbaV0gOiAncmdiYSgyNTUsMjU1LDI1NSwwLjQpJ1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRleHQ6IGxhYmVsU3R5bGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIF07XHJcbiAgICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgT2xGZWF0dXJlKSB7XHJcbiAgICAgICAgaWYgKCFmZWF0dXJlLmdldFN0eWxlKCkpIHtcclxuICAgICAgICAgIGlmIChiYXNlU3R5bGUpIHtcclxuICAgICAgICAgICAgc3R5bGUgPSB0aGlzLmNyZWF0ZVN0eWxlKGJhc2VTdHlsZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI2JiYmJmMidcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZUNsdXN0ZXJTdHlsZShmZWF0dXJlLCBjbHVzdGVyUGFyYW06IENsdXN0ZXJQYXJhbSA9IHt9LCBsYXllclN0eWxlKSB7XHJcbiAgICBsZXQgc3R5bGU6IG9sc3R5bGUuU3R5bGU7XHJcbiAgICBjb25zdCBzaXplID0gZmVhdHVyZS5nZXQoJ2ZlYXR1cmVzJykubGVuZ3RoO1xyXG4gICAgaWYgKHNpemUgIT09IDEpIHtcclxuICAgICAgaWYgKGNsdXN0ZXJQYXJhbS5jbHVzdGVyUmFuZ2VzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCByIG9mIGNsdXN0ZXJQYXJhbS5jbHVzdGVyUmFuZ2VzKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICghci5taW5SYWRpdXMgfHwgci5taW5SYWRpdXMgPD0gc2l6ZSkgJiZcclxuICAgICAgICAgICAgKCFyLm1heFJhZGl1cyB8fCByLm1heFJhZGl1cyA+PSBzaXplKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gdGhpcy5jcmVhdGVTdHlsZShyLnN0eWxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyLnNob3dSYW5nZSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHNpemUudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHN0eWxlLnNldFRleHQodGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyLmR5bmFtaWNSYWRpdXMpIHtcclxuICAgICAgICAgICAgICBsZXQgY2x1c3RlclJhZGl1czogbnVtYmVyO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJhZGl1c01pbiA9IHN0eWxlLmltYWdlXy5nZXRSYWRpdXMoKTtcclxuICAgICAgICAgICAgICBjbHVzdGVyUmFkaXVzID0gNSAqIE1hdGgubG9nKHNpemUpO1xyXG4gICAgICAgICAgICAgIGlmIChjbHVzdGVyUmFkaXVzIDwgcmFkaXVzTWluKSB7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyUmFkaXVzID0gcmFkaXVzTWluO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzdHlsZS5pbWFnZV8uc2V0UmFkaXVzKGNsdXN0ZXJSYWRpdXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzdHlsZSkge1xyXG4gICAgICAgIGxldCBjbHVzdGVyUmFkaXVzOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKGNsdXN0ZXJQYXJhbS5yYWRpdXNDYWxjKSB7XHJcbiAgICAgICAgICBjbHVzdGVyUmFkaXVzID0gY2x1c3RlclBhcmFtLnJhZGl1c0NhbGMoc2l6ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHJhZGl1c01pbiA9IDY7XHJcbiAgICAgICAgICBjbHVzdGVyUmFkaXVzID0gNSAqIE1hdGgubG9nKHNpemUpO1xyXG4gICAgICAgICAgaWYgKGNsdXN0ZXJSYWRpdXMgPCByYWRpdXNNaW4pIHtcclxuICAgICAgICAgICAgY2x1c3RlclJhZGl1cyA9IHJhZGl1c01pbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgICByYWRpdXM6IGNsdXN0ZXJSYWRpdXMsXHJcbiAgICAgICAgICAgICAgb3BhY2l0eTogMC40LFxyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjQsIDEzNCwgNDUsIDAuNSknXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICAgICAgICAgIHRleHQ6IHNpemUudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZidcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdHlsZSA9IHRoaXMuY3JlYXRlU3R5bGUobGF5ZXJTdHlsZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGU7XHJcbiAgfVxyXG5cclxuICBnZXRMYWJlbChmZWF0dXJlLCBsYWJlbE1hdGNoKTogc3RyaW5nIHtcclxuICAgIGxldCBsYWJlbCA9IGxhYmVsTWF0Y2g7XHJcbiAgICBjb25zdCBsYWJlbFRvR2V0ID0gQXJyYXkuZnJvbShsYWJlbE1hdGNoLm1hdGNoQWxsKC9cXCRcXHsoW15cXHtcXH1dKylcXH0vZykpO1xyXG5cclxuICAgIGxhYmVsVG9HZXQuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKHZbMF0sIGZlYXR1cmUuZ2V0KHZbMV0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE5vdGhpbmcgZG9uZT8gY2hlY2sgZmVhdHVyZSdzIGF0dHJpYnV0ZVxyXG4gICAgaWYgKGxhYmVsVG9HZXQubGVuZ3RoID09PSAwICYmIGxhYmVsID09PSBsYWJlbE1hdGNoKSB7XHJcbiAgICAgIGxhYmVsID0gZmVhdHVyZS5nZXQobGFiZWxNYXRjaCkgfHwgbGFiZWxNYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbiAgfVxyXG59XHJcbiJdfQ==