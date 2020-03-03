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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBSW5DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFekQ7SUFBQTtLQXFQQzs7Ozs7SUEvT0Msa0NBQVc7Ozs7SUFBWCxVQUFZLE9BQStCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLHdCQUF3QixFQUFFLENBQUM7U0FDbkM7UUFDRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsSUFBSSxPQUFPLFlBQVksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNyRSxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7OztJQUVPLGlDQUFVOzs7Ozs7SUFBbEIsVUFBbUIsR0FBVyxFQUFFLEtBQVU7UUFBMUMsaUJBYUM7O1lBWk8sWUFBWSxHQUFHLEVBQUU7O1lBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUVoQyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsSUFBSTs7b0JBQ3ZCLEtBQUssR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDakMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMs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Q3ZCLDZCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgeyBTdHlsZUJ5QXR0cmlidXRlIH0gZnJvbSAnLi92ZWN0b3Itc3R5bGUuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7IENsdXN0ZXJQYXJhbSB9IGZyb20gJy4vY2x1c3RlclBhcmFtJztcclxuaW1wb3J0IHsgY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlIH0gZnJvbSAnLi4vLi4vb3ZlcmxheSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHlsZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBzdHlsZTogb2xzdHlsZS5TdHlsZTtcclxuXHJcbiAgY3JlYXRlU3R5bGUob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVPdmVybGF5TWFya2VyU3R5bGUoKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyB8fCBvcHRpb25zIGluc3RhbmNlb2Ygb2xzdHlsZS5TdHlsZSkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnBhcnNlU3R5bGUoJ3N0eWxlJywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlU3R5bGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBvbHN0eWxlIHtcclxuICAgIGNvbnN0IHN0eWxlT3B0aW9ucyA9IHt9O1xyXG4gICAgY29uc3Qgb2xDbHMgPSB0aGlzLmdldE9sQ2xzKGtleSk7XHJcblxyXG4gICAgaWYgKG9sQ2xzICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKF9rZXkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9sS2V5ID0gdGhpcy5nZXRPbEtleShfa2V5KTtcclxuICAgICAgICBzdHlsZU9wdGlvbnNbb2xLZXldID0gdGhpcy5wYXJzZVN0eWxlKF9rZXksIHZhbHVlW19rZXldKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBuZXcgb2xDbHMoc3R5bGVPcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T2xLZXkoa2V5OiBhbnkpIHtcclxuICAgIGxldCBvbEtleTtcclxuICAgIHN3aXRjaCAoa2V5LnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgY2FzZSAnY2lyY2xlJzpcclxuICAgICAgY2FzZSAncmVndWxhcnNoYXBlJzpcclxuICAgICAgY2FzZSAnaWNvbic6XHJcbiAgICAgICAgb2xLZXkgPSAnaW1hZ2UnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvbEtleSB8fCBrZXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9sQ2xzKGtleTogYW55KSB7XHJcbiAgICBsZXQgb2xDbHMgPSBvbHN0eWxlW2tleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKV07XHJcbiAgICBpZiAoa2V5ID09PSAncmVndWxhcnNoYXBlJykge1xyXG4gICAgICBvbENscyA9IG9sc3R5bGUuUmVndWxhclNoYXBlO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gJ2JhY2tncm91bmRGaWxsJykge1xyXG4gICAgICBvbENscyA9IG9sc3R5bGUuRmlsbDtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09ICdiYWNrZ3JvdW5kU3Ryb2tlJykge1xyXG4gICAgICBvbENscyA9IG9sc3R5bGUuU3Ryb2tlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvbENscztcclxuICB9XHJcblxyXG4gIGNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoZmVhdHVyZSwgc3R5bGVCeUF0dHJpYnV0ZTogU3R5bGVCeUF0dHJpYnV0ZSkge1xyXG4gICAgbGV0IHN0eWxlO1xyXG4gICAgY29uc3QgdHlwZSA9IHN0eWxlQnlBdHRyaWJ1dGUudHlwZTtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IHN0eWxlQnlBdHRyaWJ1dGUuYXR0cmlidXRlO1xyXG4gICAgY29uc3QgZGF0YSA9IHN0eWxlQnlBdHRyaWJ1dGUuZGF0YTtcclxuICAgIGNvbnN0IHN0cm9rZSA9IHN0eWxlQnlBdHRyaWJ1dGUuc3Ryb2tlO1xyXG4gICAgY29uc3Qgd2lkdGggPSBzdHlsZUJ5QXR0cmlidXRlLndpZHRoO1xyXG4gICAgY29uc3QgZmlsbCA9IHN0eWxlQnlBdHRyaWJ1dGUuZmlsbDtcclxuICAgIGNvbnN0IHJhZGl1cyA9IHN0eWxlQnlBdHRyaWJ1dGUucmFkaXVzO1xyXG4gICAgY29uc3QgaWNvbiA9IHN0eWxlQnlBdHRyaWJ1dGUuaWNvbjtcclxuICAgIGNvbnN0IHNjYWxlID0gc3R5bGVCeUF0dHJpYnV0ZS5zY2FsZTtcclxuICAgIGNvbnN0IHNpemUgPSBkYXRhLmxlbmd0aDtcclxuICAgIGNvbnN0IGxhYmVsID0gc3R5bGVCeUF0dHJpYnV0ZS5sYWJlbC5hdHRyaWJ1dGUgfHwgc3R5bGVCeUF0dHJpYnV0ZS5sYWJlbDtcclxuICAgIGNvbnN0IGxhYmVsU3R5bGUgPVxyXG4gICAgICB0aGlzLnBhcnNlU3R5bGUoJ3RleHQnLCBzdHlsZUJ5QXR0cmlidXRlLmxhYmVsLnN0eWxlKSB8fFxyXG4gICAgICBuZXcgb2xzdHlsZS5UZXh0KCk7XHJcbiAgICBsYWJlbFN0eWxlLnNldFRleHQodGhpcy5nZXRMYWJlbChmZWF0dXJlLCBsYWJlbCkpO1xyXG4gICAgY29uc3QgYmFzZVN0eWxlID0gc3R5bGVCeUF0dHJpYnV0ZS5iYXNlU3R5bGU7XHJcbiAgICBpZiAodHlwZSA9PT0gJ2NpcmNsZScpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICBjb25zdCB2YWwgPVxyXG4gICAgICAgICAgdHlwZW9mIGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSkgIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgICAgID8gZmVhdHVyZS5nZXQoYXR0cmlidXRlKVxyXG4gICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIGlmICh2YWwgPT09IGRhdGFbaV0gfHwgdmFsLnRvU3RyaW5nKCkubWF0Y2goZGF0YVtpXSkpIHtcclxuICAgICAgICAgIGlmIChpY29uKSB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5JY29uKHtcclxuICAgICAgICAgICAgICAgICAgc3JjOiBpY29uW2ldLFxyXG4gICAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGUgPyBzY2FsZVtpXSA6IDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3R5bGUgPSBbXHJcbiAgICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzID8gcmFkaXVzW2ldIDogNCxcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6IHN0cm9rZSA/IHN0cm9rZVtpXSA6ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCA/IHdpZHRoW2ldIDogMVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6IGZpbGwgPyBmaWxsW2ldIDogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICB0ZXh0OiBsYWJlbFN0eWxlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZlYXR1cmUuZ2V0U3R5bGUoKSkge1xyXG4gICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgICByYWRpdXM6IDQsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI2JiYmJmMidcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncmVndWxhcicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICBjb25zdCB2YWwgPVxyXG4gICAgICAgICAgdHlwZW9mIGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSkgIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgICAgID8gZmVhdHVyZS5nZXQoYXR0cmlidXRlKVxyXG4gICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIGlmICh2YWwgPT09IGRhdGFbaV0gfHwgdmFsLnRvU3RyaW5nKCkubWF0Y2goZGF0YVtpXSkpIHtcclxuICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHN0cm9rZSA/IHN0cm9rZVtpXSA6ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGggPyB3aWR0aFtpXSA6IDFcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBmaWxsID8gZmlsbFtpXSA6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNCknXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdGV4dDogbGFiZWxTdHlsZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGZlYXR1cmUgaW5zdGFuY2VvZiBPbEZlYXR1cmUpIHtcclxuICAgICAgICBpZiAoIWZlYXR1cmUuZ2V0U3R5bGUoKSkge1xyXG4gICAgICAgICAgaWYgKGJhc2VTdHlsZSkge1xyXG4gICAgICAgICAgICBzdHlsZSA9IHRoaXMuY3JlYXRlU3R5bGUoYmFzZVN0eWxlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3R5bGUgPSBbXHJcbiAgICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjYmJiYmYyJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ2x1c3RlclN0eWxlKGZlYXR1cmUsIGNsdXN0ZXJQYXJhbTogQ2x1c3RlclBhcmFtID0ge30sIGxheWVyU3R5bGUpIHtcclxuICAgIGxldCBzdHlsZTogb2xzdHlsZS5TdHlsZTtcclxuICAgIGNvbnN0IHNpemUgPSBmZWF0dXJlLmdldCgnZmVhdHVyZXMnKS5sZW5ndGg7XHJcbiAgICBpZiAoc2l6ZSAhPT0gMSkge1xyXG4gICAgICBpZiAoY2x1c3RlclBhcmFtLmNsdXN0ZXJSYW5nZXMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHIgb2YgY2x1c3RlclBhcmFtLmNsdXN0ZXJSYW5nZXMpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgKCFyLm1pblJhZGl1cyB8fCByLm1pblJhZGl1cyA8PSBzaXplKSAmJlxyXG4gICAgICAgICAgICAoIXIubWF4UmFkaXVzIHx8IHIubWF4UmFkaXVzID49IHNpemUpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgc3R5bGUgPSB0aGlzLmNyZWF0ZVN0eWxlKHIuc3R5bGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghc3R5bGUpIHtcclxuICAgICAgICBsZXQgY2x1c3RlclJhZGl1czogbnVtYmVyO1xyXG4gICAgICAgIGlmIChjbHVzdGVyUGFyYW0ucmFkaXVzQ2FsYykge1xyXG4gICAgICAgICAgY2x1c3RlclJhZGl1cyA9IGNsdXN0ZXJQYXJhbS5yYWRpdXNDYWxjKHNpemUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCByYWRpdXNNaW4gPSA2O1xyXG4gICAgICAgICAgY2x1c3RlclJhZGl1cyA9IDUgKiBNYXRoLmxvZyhzaXplKTtcclxuICAgICAgICAgIGlmIChjbHVzdGVyUmFkaXVzIDwgcmFkaXVzTWluKSB7XHJcbiAgICAgICAgICAgIGNsdXN0ZXJSYWRpdXMgPSByYWRpdXNNaW47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgcmFkaXVzOiBjbHVzdGVyUmFkaXVzLFxyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAuNCxcclxuICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI0LCAxMzQsIDQ1LCAwLjUpJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgICAgICAgICB0ZXh0OiBzaXplLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3R5bGUgPSB0aGlzLmNyZWF0ZVN0eWxlKGxheWVyU3R5bGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0eWxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFiZWwoZmVhdHVyZSwgbGFiZWxNYXRjaCk6IHN0cmluZyB7XHJcbiAgICBsZXQgbGFiZWwgPSBsYWJlbE1hdGNoO1xyXG4gICAgY29uc3QgbGFiZWxUb0dldCA9IEFycmF5LmZyb20obGFiZWxNYXRjaC5tYXRjaEFsbCgvXFwkXFx7KFteXFx7XFx9XSspXFx9L2cpKTtcclxuXHJcbiAgICBsYWJlbFRvR2V0LmZvckVhY2godiA9PiB7XHJcbiAgICAgIGxhYmVsID0gbGFiZWwucmVwbGFjZSh2WzBdLCBmZWF0dXJlLmdldCh2WzFdKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBOb3RoaW5nIGRvbmU/IGNoZWNrIGZlYXR1cmUncyBhdHRyaWJ1dGVcclxuICAgIGlmIChsYWJlbFRvR2V0Lmxlbmd0aCA9PT0gMCAmJiBsYWJlbCA9PT0gbGFiZWxNYXRjaCkge1xyXG4gICAgICBsYWJlbCA9IGZlYXR1cmUuZ2V0KGxhYmVsTWF0Y2gpIHx8IGxhYmVsTWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=