/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as olstyle from 'ol/style';
import * as i0 from "@angular/core";
export class StyleService {
    constructor() { }
    /**
     * @param {?} options
     * @return {?}
     */
    createStyle(options) {
        return this.parseStyle('style', options);
    }
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    parseStyle(key, value) {
        /** @type {?} */
        const styleOptions = {};
        /** @type {?} */
        const olCls = this.getOlCls(key);
        if (olCls && value instanceof Object) {
            Object.keys(value).forEach((/**
             * @param {?} _key
             * @return {?}
             */
            _key => {
                /** @type {?} */
                const olKey = this.getOlKey(_key);
                styleOptions[olKey] = this.parseStyle(_key, value[_key]);
            }));
            return new olCls(styleOptions);
        }
        else {
            return value;
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getOlKey(key) {
        /** @type {?} */
        let olKey = key.toLowerCase();
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
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getOlCls(key) {
        /** @type {?} */
        let olCls = olstyle[key.charAt(0).toUpperCase() + key.slice(1)];
        if (key === 'regularshape') {
            olCls = olstyle.RegularShape;
        }
        return olCls;
    }
    /**
     * @param {?} feature
     * @param {?} styleByAttribute
     * @return {?}
     */
    createStyleByAttribute(feature, styleByAttribute) {
        /** @type {?} */
        let style;
        /** @type {?} */
        const type = styleByAttribute.type;
        /** @type {?} */
        const attribute = styleByAttribute.attribute;
        /** @type {?} */
        const data = styleByAttribute.data;
        /** @type {?} */
        const stroke = styleByAttribute.stroke;
        /** @type {?} */
        const width = styleByAttribute.width;
        /** @type {?} */
        const fill = styleByAttribute.fill;
        /** @type {?} */
        const radius = styleByAttribute.radius;
        /** @type {?} */
        const icon = styleByAttribute.icon;
        /** @type {?} */
        const scale = styleByAttribute.scale;
        /** @type {?} */
        const size = data.length;
        /** @type {?} */
        const label = styleByAttribute.label;
        /** @type {?} */
        const baseStyle = styleByAttribute.baseStyle;
        if (type === 'circle') {
            for (let i = 0; i < size; i++) {
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
            for (let i = 0; i < size; i++) {
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
    }
    /**
     * @param {?} feature
     * @param {?} clusterParam
     * @return {?}
     */
    createClusterStyle(feature, clusterParam) {
        /** @type {?} */
        let style;
        /** @type {?} */
        const range = clusterParam.clusterRange;
        /** @type {?} */
        const icon = clusterParam.clusterIcon;
        /** @type {?} */
        const iconScale = clusterParam.clusterScale;
        /** @type {?} */
        const size = feature.get('features').length;
        /** @type {?} */
        let color;
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
    }
}
StyleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
StyleService.ctorParameters = () => [];
/** @nocollapse */ StyleService.ngInjectableDef = i0.defineInjectable({ factory: function StyleService_Factory() { return new StyleService(); }, token: StyleService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFPcEMsTUFBTSxPQUFPLFlBQVk7SUFDdkIsZ0JBQWUsQ0FBQzs7Ozs7SUFFaEIsV0FBVyxDQUFDLE9BQStCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7OztJQUVPLFVBQVUsQ0FBQyxHQUFXLEVBQUUsS0FBVTs7Y0FDbEMsWUFBWSxHQUFHLEVBQUU7O2NBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUVoQyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzs7OztZQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEdBQVE7O1lBQ25CLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFO1FBQzdCLFFBQVEsS0FBSyxFQUFFO1lB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QUFDLElBQUksQ0FBQzs0QkFDdEIsR0FBRyxFQUFFLElBQUk7NEJBQ1QsS0FBSyxFQUFFLFNBQVM7eUJBQ2pCLENBQUM7cUJBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDTDtpQkFBTTtnQkFDTCxLQUFLLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ3pCLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7NEJBQ3RCLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUc7NEJBQ3RCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0NBQ3ZCLEtBQUssRUFBRSxPQUFPOzZCQUNqQixDQUFDOzRCQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0NBQ25CLEtBQUssRUFBRSxNQUFNOzZCQUNoQixDQUFDO3lCQUNMLENBQUM7cUJBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDTDtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUF2TUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCB7IFN0eWxlQnlBdHRyaWJ1dGUgfSBmcm9tICcuL3N0eWxlYnlhdHRyaWJ1dGUnO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGFyYW0gfSBmcm9tICcuL2NsdXN0ZXJQYXJhbSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHlsZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgY3JlYXRlU3R5bGUob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyc2VTdHlsZSgnc3R5bGUnLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VTdHlsZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IG9sc3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVPcHRpb25zID0ge307XHJcbiAgICBjb25zdCBvbENscyA9IHRoaXMuZ2V0T2xDbHMoa2V5KTtcclxuXHJcbiAgICBpZiAob2xDbHMgJiYgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goX2tleSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2xLZXkgPSB0aGlzLmdldE9sS2V5KF9rZXkpO1xyXG4gICAgICAgIHN0eWxlT3B0aW9uc1tvbEtleV0gPSB0aGlzLnBhcnNlU3R5bGUoX2tleSwgdmFsdWVbX2tleV0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG5ldyBvbENscyhzdHlsZU9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPbEtleShrZXk6IGFueSkge1xyXG4gICAgbGV0IG9sS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBzd2l0Y2ggKG9sS2V5KSB7XHJcbiAgICAgIGNhc2UgJ2NpcmNsZSc6XHJcbiAgICAgIGNhc2UgJ3JlZ3VsYXJzaGFwZSc6XHJcbiAgICAgIGNhc2UgJ2ljb24nOlxyXG4gICAgICAgIG9sS2V5ID0gJ2ltYWdlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xLZXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9sQ2xzKGtleTogYW55KSB7XHJcbiAgICBsZXQgb2xDbHMgPSBvbHN0eWxlW2tleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKV07XHJcbiAgICBpZiAoa2V5ID09PSAncmVndWxhcnNoYXBlJykge1xyXG4gICAgICBvbENscyA9IG9sc3R5bGUuUmVndWxhclNoYXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvbENscztcclxuICB9XHJcblxyXG4gIGNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoZmVhdHVyZSwgc3R5bGVCeUF0dHJpYnV0ZTogU3R5bGVCeUF0dHJpYnV0ZSkge1xyXG4gICAgbGV0IHN0eWxlO1xyXG4gICAgY29uc3QgdHlwZSA9IHN0eWxlQnlBdHRyaWJ1dGUudHlwZTtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IHN0eWxlQnlBdHRyaWJ1dGUuYXR0cmlidXRlO1xyXG4gICAgY29uc3QgZGF0YSA9IHN0eWxlQnlBdHRyaWJ1dGUuZGF0YTtcclxuICAgIGNvbnN0IHN0cm9rZSA9IHN0eWxlQnlBdHRyaWJ1dGUuc3Ryb2tlO1xyXG4gICAgY29uc3Qgd2lkdGggPSBzdHlsZUJ5QXR0cmlidXRlLndpZHRoO1xyXG4gICAgY29uc3QgZmlsbCA9IHN0eWxlQnlBdHRyaWJ1dGUuZmlsbDtcclxuICAgIGNvbnN0IHJhZGl1cyA9IHN0eWxlQnlBdHRyaWJ1dGUucmFkaXVzO1xyXG4gICAgY29uc3QgaWNvbiA9IHN0eWxlQnlBdHRyaWJ1dGUuaWNvbjtcclxuICAgIGNvbnN0IHNjYWxlID0gc3R5bGVCeUF0dHJpYnV0ZS5zY2FsZTtcclxuICAgIGNvbnN0IHNpemUgPSBkYXRhLmxlbmd0aDtcclxuICAgIGNvbnN0IGxhYmVsID0gc3R5bGVCeUF0dHJpYnV0ZS5sYWJlbDtcclxuICAgIGNvbnN0IGJhc2VTdHlsZSA9IHN0eWxlQnlBdHRyaWJ1dGUuYmFzZVN0eWxlO1xyXG4gICAgaWYgKHR5cGUgPT09ICdjaXJjbGUnKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSkgPT09IGRhdGFbaV0pIHtcclxuICAgICAgICAgIGlmIChpY29uKSB7XHJcbiAgICAgICAgICAgc3R5bGUgPSBbbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICAgICAgICAgICBzcmM6IGljb25baV0sXHJcbiAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZSA/IHNjYWxlW2ldIDogMVxyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3R5bGUgPSBbbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyA/IHJhZGl1c1tpXSA6IDQsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHN0cm9rZSA/IHN0cm9rZVtpXSA6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBmaWxsID8gZmlsbFtpXSA6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSldO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZlYXR1cmUuZ2V0U3R5bGUoKSkge1xyXG4gICAgICAgc3R5bGUgPSBbbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICByYWRpdXM6IDQsXHJcbiAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICB9KSxcclxuICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgIGNvbG9yOiAnI2JiYmJmMidcclxuICAgICAgICAgICB9KVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgfSldO1xyXG4gICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgIH1cclxuICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyZWd1bGFyJykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZmVhdHVyZS5nZXQoYXR0cmlidXRlKSA9PT0gZGF0YVtpXSkge1xyXG4gICAgICAgICAgICBzdHlsZSA9IFtuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHN0cm9rZSA/IHN0cm9rZVtpXSA6ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGggPyB3aWR0aFtpXSA6IDFcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBmaWxsID8gZmlsbFtpXSA6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNCknXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBmZWF0dXJlLmdldChsYWJlbCksXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgIGlmICghZmVhdHVyZS5nZXRTdHlsZSgpKSB7XHJcbiAgICAgICAgICBpZiAoYmFzZVN0eWxlKSB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gdGhpcy5jcmVhdGVTdHlsZShiYXNlU3R5bGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzdHlsZSA9IFtuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJ1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjYmJiYmYyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSldO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgIH1cclxuICAgfVxyXG5cclxuICAgY3JlYXRlQ2x1c3RlclN0eWxlKGZlYXR1cmUsIGNsdXN0ZXJQYXJhbTogQ2x1c3RlclBhcmFtKSB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBjb25zdCByYW5nZSA9IGNsdXN0ZXJQYXJhbS5jbHVzdGVyUmFuZ2U7XHJcbiAgICBjb25zdCBpY29uID0gY2x1c3RlclBhcmFtLmNsdXN0ZXJJY29uO1xyXG4gICAgY29uc3QgaWNvblNjYWxlID0gY2x1c3RlclBhcmFtLmNsdXN0ZXJTY2FsZTtcclxuICAgIGNvbnN0IHNpemUgPSBmZWF0dXJlLmdldCgnZmVhdHVyZXMnKS5sZW5ndGg7XHJcbiAgICBsZXQgY29sb3I7XHJcbiAgICBpZiAoc2l6ZSAhPT0gMSkge1xyXG4gICAgICBpZiAocmFuZ2UpIHtcclxuICAgICAgICBpZiAoc2l6ZSA+PSByYW5nZVsxXSkge1xyXG4gICAgICAgICAgICBjb2xvciA9ICdyZWQnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2l6ZSA8IHJhbmdlWzFdICYmIHNpemUgPj0gcmFuZ2VbMF0pIHtcclxuICAgICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHNpemUgPCByYW5nZVswXSkge1xyXG4gICAgICAgICAgICBjb2xvciA9ICdncmVlbic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHN0eWxlID0gW25ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgcmFkaXVzOiAyICogc2l6ZSArIDMuNCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHJhbmdlID8gY29sb3IgOiAnYmx1ZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KSxcclxuICAgICAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgICAgICAgdGV4dDogc2l6ZS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgIHN0eWxlID0gW25ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5JY29uKHtcclxuICAgICAgICAgICAgc3JjOiBpY29uLFxyXG4gICAgICAgICAgICBzY2FsZTogaWNvblNjYWxlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdHlsZSA9IFtuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgICByYWRpdXM6IDIgKiBzaXplICsgMy40LFxyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6ICdibHVlJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0eWxlO1xyXG4gIH1cclxufVxyXG4iXX0=