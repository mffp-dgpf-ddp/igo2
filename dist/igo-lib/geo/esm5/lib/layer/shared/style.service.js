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
                                    color: stroke ? stroke[i] : 'black'
                                }),
                                fill: new olstyle.Fill({
                                    color: fill ? fill[i] : 'black'
                                })
                            })
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
                if (feature.get(attribute) === data[i]) {
                    style = [
                        new olstyle.Style({
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
                        })
                    ];
                    return style;
                }
            }
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
        var scale = clusterParam.clusterScale;
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
            style = [
                new olstyle.Style({
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
                })
            ];
        }
        else {
            if (icon) {
                style = [
                    new olstyle.Style({
                        image: new olstyle.Icon({
                            src: icon,
                            scale: scale
                        })
                    })
                ];
            }
            else {
                style = [
                    new olstyle.Style({
                        image: new olstyle.Circle({
                            radius: 2 * size + 3.4,
                            stroke: new olstyle.Stroke({
                                color: 'black'
                            }),
                            fill: new olstyle.Fill({
                                color: 'blue'
                            })
                        })
                    })
                ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFLcEM7SUFJRTtJQUFlLENBQUM7Ozs7O0lBRWhCLGtDQUFXOzs7O0lBQVgsVUFBWSxPQUErQjtRQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7Ozs7SUFFTyxpQ0FBVTs7Ozs7O0lBQWxCLFVBQW1CLEdBQVcsRUFBRSxLQUFVO1FBQTFDLGlCQWFDOztZQVpPLFlBQVksR0FBRyxFQUFFOztZQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFFaEMsSUFBSSxLQUFLLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLElBQUk7O29CQUN2QixLQUFLLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7Ozs7SUFFTywrQkFBUTs7Ozs7SUFBaEIsVUFBaUIsR0FBUTs7WUFDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUU7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SyxHQUFHO29CQUNOLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDaEIsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDdEIsR0FBRyxFQUFFLElBQUk7NEJBQ1QsS0FBSyxPQUFBO3lCQUNOLENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHO29CQUNOLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDaEIsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQzs0QkFDeEIsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRzs0QkFDdEIsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztnQ0FDekIsS0FBSyxFQUFFLE9BQU87NkJBQ2YsQ0FBQzs0QkFDRixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO2dDQUNyQixLQUFLLEVBQUUsTUFBTTs2QkFDZCxDQUFDO3lCQUNILENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBdE5GLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3VCQVREO0NBOE5DLEFBdk5ELElBdU5DO1NBcE5ZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IHsgU3R5bGVCeUF0dHJpYnV0ZSB9IGZyb20gJy4vc3R5bGVieWF0dHJpYnV0ZSc7XHJcblxyXG5pbXBvcnQgeyBDbHVzdGVyUGFyYW0gfSBmcm9tICcuL2NsdXN0ZXJQYXJhbSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHlsZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgY3JlYXRlU3R5bGUob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyc2VTdHlsZSgnc3R5bGUnLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VTdHlsZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IG9sc3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVPcHRpb25zID0ge307XHJcbiAgICBjb25zdCBvbENscyA9IHRoaXMuZ2V0T2xDbHMoa2V5KTtcclxuXHJcbiAgICBpZiAob2xDbHMgJiYgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goX2tleSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2xLZXkgPSB0aGlzLmdldE9sS2V5KF9rZXkpO1xyXG4gICAgICAgIHN0eWxlT3B0aW9uc1tvbEtleV0gPSB0aGlzLnBhcnNlU3R5bGUoX2tleSwgdmFsdWVbX2tleV0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG5ldyBvbENscyhzdHlsZU9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPbEtleShrZXk6IGFueSkge1xyXG4gICAgbGV0IG9sS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBzd2l0Y2ggKG9sS2V5KSB7XHJcbiAgICAgIGNhc2UgJ2NpcmNsZSc6XHJcbiAgICAgIGNhc2UgJ3JlZ3VsYXJzaGFwZSc6XHJcbiAgICAgIGNhc2UgJ2ljb24nOlxyXG4gICAgICAgIG9sS2V5ID0gJ2ltYWdlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xLZXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9sQ2xzKGtleTogYW55KSB7XHJcbiAgICBsZXQgb2xDbHMgPSBvbHN0eWxlW2tleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKV07XHJcbiAgICBpZiAoa2V5ID09PSAncmVndWxhcnNoYXBlJykge1xyXG4gICAgICBvbENscyA9IG9sc3R5bGUuUmVndWxhclNoYXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvbENscztcclxuICB9XHJcbiAgY3JlYXRlU3R5bGVCeUF0dHJpYnV0ZShmZWF0dXJlLCBzdHlsZUJ5QXR0cmlidXRlOiBTdHlsZUJ5QXR0cmlidXRlKSB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBjb25zdCB0eXBlID0gc3R5bGVCeUF0dHJpYnV0ZS50eXBlO1xyXG4gICAgY29uc3QgYXR0cmlidXRlID0gc3R5bGVCeUF0dHJpYnV0ZS5hdHRyaWJ1dGU7XHJcbiAgICBjb25zdCBkYXRhID0gc3R5bGVCeUF0dHJpYnV0ZS5kYXRhO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gc3R5bGVCeUF0dHJpYnV0ZS5zdHJva2U7XHJcbiAgICBjb25zdCB3aWR0aCA9IHN0eWxlQnlBdHRyaWJ1dGUud2lkdGg7XHJcbiAgICBjb25zdCBmaWxsID0gc3R5bGVCeUF0dHJpYnV0ZS5maWxsO1xyXG4gICAgY29uc3QgcmFkaXVzID0gc3R5bGVCeUF0dHJpYnV0ZS5yYWRpdXM7XHJcbiAgICBjb25zdCBpY29uID0gc3R5bGVCeUF0dHJpYnV0ZS5pY29uO1xyXG4gICAgY29uc3Qgc2NhbGUgPSBzdHlsZUJ5QXR0cmlidXRlLnNjYWxlO1xyXG4gICAgY29uc3Qgc2l6ZSA9IGRhdGEubGVuZ3RoO1xyXG4gICAgY29uc3QgbGFiZWwgPSBzdHlsZUJ5QXR0cmlidXRlLmxhYmVsO1xyXG4gICAgY29uc3QgYmFzZVN0eWxlID0gc3R5bGVCeUF0dHJpYnV0ZS5iYXNlU3R5bGU7XHJcbiAgICBpZiAodHlwZSA9PT0gJ2NpcmNsZScpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICBpZiAoZmVhdHVyZS5nZXQoYXR0cmlidXRlKSA9PT0gZGF0YVtpXSkge1xyXG4gICAgICAgICAgaWYgKGljb24pIHtcclxuICAgICAgICAgICAgc3R5bGUgPSBbXHJcbiAgICAgICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICAgICAgICAgICAgICBzcmM6IGljb25baV0sXHJcbiAgICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZSA/IHNjYWxlW2ldIDogMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMgPyByYWRpdXNbaV0gOiA0LFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogc3Ryb2tlID8gc3Ryb2tlW2ldIDogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6IGZpbGwgPyBmaWxsW2ldIDogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmZWF0dXJlLmdldFN0eWxlKCkpIHtcclxuICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgcmFkaXVzOiA0LFxyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNiYmJiZjInXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JlZ3VsYXInKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSkgPT09IGRhdGFbaV0pIHtcclxuICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHN0cm9rZSA/IHN0cm9rZVtpXSA6ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGggPyB3aWR0aFtpXSA6IDFcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBmaWxsID8gZmlsbFtpXSA6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNCknXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBmZWF0dXJlLmdldChsYWJlbCksXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZlYXR1cmUuZ2V0U3R5bGUoKSkge1xyXG4gICAgICAgIGlmIChiYXNlU3R5bGUpIHtcclxuICAgICAgICAgIHN0eWxlID0gdGhpcy5jcmVhdGVTdHlsZShiYXNlU3R5bGUpO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICBjb2xvcjogJyNiYmJiZjInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDbHVzdGVyU3R5bGUoZmVhdHVyZSwgY2x1c3RlclBhcmFtOiBDbHVzdGVyUGFyYW0pIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGNvbnN0IHJhbmdlID0gY2x1c3RlclBhcmFtLmNsdXN0ZXJSYW5nZTtcclxuICAgIGNvbnN0IGljb24gPSBjbHVzdGVyUGFyYW0uY2x1c3Rlckljb247XHJcbiAgICBjb25zdCBzY2FsZSA9IGNsdXN0ZXJQYXJhbS5jbHVzdGVyU2NhbGU7XHJcbiAgICBjb25zdCBzaXplID0gZmVhdHVyZS5nZXQoJ2ZlYXR1cmVzJykubGVuZ3RoO1xyXG4gICAgbGV0IGNvbG9yO1xyXG4gICAgaWYgKHNpemUgIT09IDEpIHtcclxuICAgICAgaWYgKHJhbmdlKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPj0gcmFuZ2VbMV0pIHtcclxuICAgICAgICAgIGNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaXplIDwgcmFuZ2VbMV0gJiYgc2l6ZSA+PSByYW5nZVswXSkge1xyXG4gICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHNpemUgPCByYW5nZVswXSkge1xyXG4gICAgICAgICAgY29sb3IgPSAnZ3JlZW4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzdHlsZSA9IFtcclxuICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgcmFkaXVzOiAyICogc2l6ZSArIDMuNCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICBjb2xvcjogcmFuZ2UgPyBjb2xvciA6ICdibHVlJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgICAgICAgdGV4dDogc2l6ZS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XHJcbiAgICAgICAgICAgICAgc3JjOiBpY29uLFxyXG4gICAgICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3R5bGUgPSBbXHJcbiAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICAgIHJhZGl1czogMiAqIHNpemUgKyAzLjQsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmx1ZSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==