/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as olstyle from 'ol/style';
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
        var olKey = key.toLowerCase();
        switch (olKey) {
            case 'circle':
            case 'regularshape':
            case 'icon':
                olKey = 'image';
                break;
            default:
                break;
        }
        return olKey;
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
        var label = styleByAttribute.label;
        /** @type {?} */
        var baseStyle = styleByAttribute.baseStyle;
        if (type === 'circle') {
            for (var i = 0; i < size; i++) {
                if (feature.get(attribute) === data[i]) {
                    if (icon) {
                        style = [new olstyle.Style({
                                image: new olstyle.Icon({
                                    src: icon[i],
                                    scale: scale ? scale[i] : 1
                                })
                            })];
                        return style;
                    }
                    style = [new olstyle.Style({
                            image: new olstyle.Circle({
                                radius: radius ? radius[i] : 4,
                                stroke: new olstyle.Stroke({
                                    color: stroke ? stroke[i] : 'black'
                                }),
                                fill: new olstyle.Fill({
                                    color: fill ? fill[i] : 'black'
                                })
                            })
                        })];
                    return style;
                }
            }
            if (!feature.getStyle()) {
                style = [new olstyle.Style({
                        image: new olstyle.Circle({
                            radius: 4,
                            stroke: new olstyle.Stroke({
                                color: 'black'
                            }),
                            fill: new olstyle.Fill({
                                color: '#bbbbf2'
                            })
                        })
                    })];
                return style;
            }
        }
        else if (type === 'regular') {
            for (var i = 0; i < size; i++) {
                if (feature.get(attribute) === data[i]) {
                    style = [new olstyle.Style({
                            stroke: new olstyle.Stroke({
                                color: stroke ? stroke[i] : 'black',
                                width: width ? width[i] : 1
                            }),
                            fill: new olstyle.Fill({
                                color: fill ? fill[i] : 'rgba(255,255,255,0.4)'
                            }),
                            text: new olstyle.Text({
                                text: feature.get(label),
                                stroke: new olstyle.Stroke({
                                    color: 'black'
                                })
                            })
                        })];
                    return style;
                }
            }
            if (!feature.getStyle()) {
                if (baseStyle) {
                    style = this.createStyle(baseStyle);
                    return style;
                }
                style = [new olstyle.Style({
                        stroke: new olstyle.Stroke({
                            color: 'black'
                        }),
                        fill: new olstyle.Fill({
                            color: '#bbbbf2'
                        })
                    })];
                return style;
            }
        }
    };
    /**
     * @param {?} feature
     * @param {?} clusterParam
     * @return {?}
     */
    StyleService.prototype.createClusterStyle = /**
     * @param {?} feature
     * @param {?} clusterParam
     * @return {?}
     */
    function (feature, clusterParam) {
        /** @type {?} */
        var style;
        /** @type {?} */
        var range = clusterParam.clusterRange;
        /** @type {?} */
        var icon = clusterParam.clusterIcon;
        /** @type {?} */
        var iconScale = clusterParam.clusterScale;
        /** @type {?} */
        var size = feature.get('features').length;
        /** @type {?} */
        var color;
        if (size !== 1) {
            if (range) {
                if (size >= range[1]) {
                    color = 'red';
                }
                else if (size < range[1] && size >= range[0]) {
                    color = 'orange';
                }
                else if (size < range[0]) {
                    color = 'green';
                }
            }
            style = [new olstyle.Style({
                    image: new olstyle.Circle({
                        radius: 2 * size + 3.4,
                        stroke: new olstyle.Stroke({
                            color: 'black'
                        }),
                        fill: new olstyle.Fill({
                            color: range ? color : 'blue'
                        })
                    }),
                    text: new olstyle.Text({
                        text: size.toString(),
                        fill: new olstyle.Fill({
                            color: '#fff'
                        })
                    })
                })];
        }
        else {
            if (icon) {
                style = [new olstyle.Style({
                        image: new olstyle.Icon({
                            src: icon,
                            scale: iconScale
                        })
                    })];
            }
            else {
                style = [new olstyle.Style({
                        image: new olstyle.Circle({
                            radius: 2 * size + 3.4,
                            stroke: new olstyle.Stroke({
                                color: 'black'
                            }),
                            fill: new olstyle.Fill({
                                color: 'blue'
                            })
                        })
                    })];
            }
        }
        return style;
    };
    StyleService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    StyleService.ctorParameters = function () { return []; };
    /** @nocollapse */ StyleService.ngInjectableDef = i0.defineInjectable({ factory: function StyleService_Factory() { return new StyleService(); }, token: StyleService, providedIn: "root" });
    return StyleService;
}());
export { StyleService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFJcEM7SUFJRTtJQUFlLENBQUM7Ozs7O0lBRWhCLGtDQUFXOzs7O0lBQVgsVUFBWSxPQUErQjtRQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7Ozs7SUFFTyxpQ0FBVTs7Ozs7O0lBQWxCLFVBQW1CLEdBQVcsRUFBRSxLQUFVO1FBQTFDLGlCQWFDOztZQVpPLFlBQVksR0FBRyxFQUFFOztZQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFFaEMsSUFBSSxLQUFLLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLElBQUk7O29CQUN2QixLQUFLLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7Ozs7SUFFTywrQkFBUTs7Ozs7SUFBaEIsVUFBaUIsR0FBUTs7WUFDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUU7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QUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDekIsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDdEIsR0FBRyxFQUFFLElBQUk7NEJBQ1QsS0FBSyxFQUFFLFNBQVM7eUJBQ2pCLENBQUM7cUJBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDTDtpQkFBTTtnQkFDTCxLQUFLLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ3pCLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7NEJBQ3RCLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUc7NEJBQ3RCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0NBQ3ZCLEtBQUssRUFBRSxPQUFPOzZCQUNqQixDQUFDOzRCQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0NBQ25CLEtBQUssRUFBRSxNQUFNOzZCQUNoQixDQUFDO3lCQUNMLENBQUM7cUJBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDTDtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkF2TUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7dUJBUkQ7Q0E4TUMsQUF4TUQsSUF3TUM7U0FyTVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgeyBTdHlsZUJ5QXR0cmlidXRlIH0gZnJvbSAnLi9zdHlsZWJ5YXR0cmlidXRlJztcclxuaW1wb3J0IHsgQ2x1c3RlclBhcmFtIH0gZnJvbSAnLi9jbHVzdGVyUGFyYW0nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3R5bGVTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGNyZWF0ZVN0eWxlKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgIHJldHVybiB0aGlzLnBhcnNlU3R5bGUoJ3N0eWxlJywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlU3R5bGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBvbHN0eWxlIHtcclxuICAgIGNvbnN0IHN0eWxlT3B0aW9ucyA9IHt9O1xyXG4gICAgY29uc3Qgb2xDbHMgPSB0aGlzLmdldE9sQ2xzKGtleSk7XHJcblxyXG4gICAgaWYgKG9sQ2xzICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKF9rZXkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9sS2V5ID0gdGhpcy5nZXRPbEtleShfa2V5KTtcclxuICAgICAgICBzdHlsZU9wdGlvbnNbb2xLZXldID0gdGhpcy5wYXJzZVN0eWxlKF9rZXksIHZhbHVlW19rZXldKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBuZXcgb2xDbHMoc3R5bGVPcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T2xLZXkoa2V5OiBhbnkpIHtcclxuICAgIGxldCBvbEtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgc3dpdGNoIChvbEtleSkge1xyXG4gICAgICBjYXNlICdjaXJjbGUnOlxyXG4gICAgICBjYXNlICdyZWd1bGFyc2hhcGUnOlxyXG4gICAgICBjYXNlICdpY29uJzpcclxuICAgICAgICBvbEtleSA9ICdpbWFnZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9sS2V5O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPbENscyhrZXk6IGFueSkge1xyXG4gICAgbGV0IG9sQ2xzID0gb2xzdHlsZVtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSldO1xyXG4gICAgaWYgKGtleSA9PT0gJ3JlZ3VsYXJzaGFwZScpIHtcclxuICAgICAgb2xDbHMgPSBvbHN0eWxlLlJlZ3VsYXJTaGFwZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xDbHM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTdHlsZUJ5QXR0cmlidXRlKGZlYXR1cmUsIHN0eWxlQnlBdHRyaWJ1dGU6IFN0eWxlQnlBdHRyaWJ1dGUpIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGNvbnN0IHR5cGUgPSBzdHlsZUJ5QXR0cmlidXRlLnR5cGU7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBzdHlsZUJ5QXR0cmlidXRlLmF0dHJpYnV0ZTtcclxuICAgIGNvbnN0IGRhdGEgPSBzdHlsZUJ5QXR0cmlidXRlLmRhdGE7XHJcbiAgICBjb25zdCBzdHJva2UgPSBzdHlsZUJ5QXR0cmlidXRlLnN0cm9rZTtcclxuICAgIGNvbnN0IHdpZHRoID0gc3R5bGVCeUF0dHJpYnV0ZS53aWR0aDtcclxuICAgIGNvbnN0IGZpbGwgPSBzdHlsZUJ5QXR0cmlidXRlLmZpbGw7XHJcbiAgICBjb25zdCByYWRpdXMgPSBzdHlsZUJ5QXR0cmlidXRlLnJhZGl1cztcclxuICAgIGNvbnN0IGljb24gPSBzdHlsZUJ5QXR0cmlidXRlLmljb247XHJcbiAgICBjb25zdCBzY2FsZSA9IHN0eWxlQnlBdHRyaWJ1dGUuc2NhbGU7XHJcbiAgICBjb25zdCBzaXplID0gZGF0YS5sZW5ndGg7XHJcbiAgICBjb25zdCBsYWJlbCA9IHN0eWxlQnlBdHRyaWJ1dGUubGFiZWw7XHJcbiAgICBjb25zdCBiYXNlU3R5bGUgPSBzdHlsZUJ5QXR0cmlidXRlLmJhc2VTdHlsZTtcclxuICAgIGlmICh0eXBlID09PSAnY2lyY2xlJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgIGlmIChmZWF0dXJlLmdldChhdHRyaWJ1dGUpID09PSBkYXRhW2ldKSB7XHJcbiAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgIHN0eWxlID0gW25ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5JY29uKHtcclxuICAgICAgICAgICAgICAgc3JjOiBpY29uW2ldLFxyXG4gICAgICAgICAgICAgICBzY2FsZTogc2NhbGUgPyBzY2FsZVtpXSA6IDFcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN0eWxlID0gW25ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMgPyByYWRpdXNbaV0gOiA0LFxyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBzdHJva2UgPyBzdHJva2VbaV0gOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogZmlsbCA/IGZpbGxbaV0gOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmZWF0dXJlLmdldFN0eWxlKCkpIHtcclxuICAgICAgIHN0eWxlID0gW25ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgcmFkaXVzOiA0LFxyXG4gICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICBjb2xvcjogJyNiYmJiZjInXHJcbiAgICAgICAgICAgfSlcclxuICAgICAgICAgfSlcclxuICAgICAgIH0pXTtcclxuICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICB9XHJcbiAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncmVndWxhcicpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSkgPT09IGRhdGFbaV0pIHtcclxuICAgICAgICAgICAgc3R5bGUgPSBbbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBzdHJva2UgPyBzdHJva2VbaV0gOiAnYmxhY2snLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoID8gd2lkdGhbaV0gOiAxXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogZmlsbCA/IGZpbGxbaV0gOiAncmdiYSgyNTUsMjU1LDI1NSwwLjQpJ1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogZmVhdHVyZS5nZXQobGFiZWwpLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICBpZiAoIWZlYXR1cmUuZ2V0U3R5bGUoKSkge1xyXG4gICAgICAgICAgaWYgKGJhc2VTdHlsZSkge1xyXG4gICAgICAgICAgICBzdHlsZSA9IHRoaXMuY3JlYXRlU3R5bGUoYmFzZVN0eWxlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3R5bGUgPSBbbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAnI2JiYmJmMidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGNyZWF0ZUNsdXN0ZXJTdHlsZShmZWF0dXJlLCBjbHVzdGVyUGFyYW06IENsdXN0ZXJQYXJhbSkge1xyXG4gICAgbGV0IHN0eWxlO1xyXG4gICAgY29uc3QgcmFuZ2UgPSBjbHVzdGVyUGFyYW0uY2x1c3RlclJhbmdlO1xyXG4gICAgY29uc3QgaWNvbiA9IGNsdXN0ZXJQYXJhbS5jbHVzdGVySWNvbjtcclxuICAgIGNvbnN0IGljb25TY2FsZSA9IGNsdXN0ZXJQYXJhbS5jbHVzdGVyU2NhbGU7XHJcbiAgICBjb25zdCBzaXplID0gZmVhdHVyZS5nZXQoJ2ZlYXR1cmVzJykubGVuZ3RoO1xyXG4gICAgbGV0IGNvbG9yO1xyXG4gICAgaWYgKHNpemUgIT09IDEpIHtcclxuICAgICAgaWYgKHJhbmdlKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPj0gcmFuZ2VbMV0pIHtcclxuICAgICAgICAgICAgY29sb3IgPSAncmVkJztcclxuICAgICAgICB9IGVsc2UgaWYgKHNpemUgPCByYW5nZVsxXSAmJiBzaXplID49IHJhbmdlWzBdKSB7XHJcbiAgICAgICAgICAgIGNvbG9yID0gJ29yYW5nZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaXplIDwgcmFuZ2VbMF0pIHtcclxuICAgICAgICAgICAgY29sb3IgPSAnZ3JlZW4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzdHlsZSA9IFtuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgIHJhZGl1czogMiAqIHNpemUgKyAzLjQsXHJcbiAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiByYW5nZSA/IGNvbG9yIDogJ2JsdWUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgICAgICAgIHRleHQ6IHNpemUudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgfSldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGljb24pIHtcclxuICAgICAgICBzdHlsZSA9IFtuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XHJcbiAgICAgICAgICAgIHNyYzogaWNvbixcclxuICAgICAgICAgICAgc2NhbGU6IGljb25TY2FsZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3R5bGUgPSBbbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgcmFkaXVzOiAyICogc2l6ZSArIDMuNCxcclxuICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmx1ZSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZTtcclxuICB9XHJcbn1cclxuIl19