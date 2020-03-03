/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';
import { createOverlayMarkerStyle } from '../../overlay';
import * as i0 from "@angular/core";
export class StyleService {
    /**
     * @param {?} options
     * @return {?}
     */
    createStyle(options) {
        if (!options) {
            return createOverlayMarkerStyle();
        }
        if (typeof options === 'function' || options instanceof olstyle.Style) {
            return options;
        }
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
        let olKey;
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
        if (key === 'backgroundFill') {
            olCls = olstyle.Fill;
        }
        if (key === 'backgroundStroke') {
            olCls = olstyle.Stroke;
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
        const label = styleByAttribute.label.attribute || styleByAttribute.label;
        /** @type {?} */
        const labelStyle = this.parseStyle('text', styleByAttribute.label.style) ||
            new olstyle.Text();
        labelStyle.setText(this.getLabel(feature, label));
        /** @type {?} */
        const baseStyle = styleByAttribute.baseStyle;
        if (type === 'circle') {
            for (let i = 0; i < size; i++) {
                /** @type {?} */
                const val = typeof feature.get(attribute) !== 'undefined'
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
            for (let i = 0; i < size; i++) {
                /** @type {?} */
                const val = typeof feature.get(attribute) !== 'undefined'
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
    }
    /**
     * @param {?} feature
     * @param {?=} clusterParam
     * @param {?=} layerStyle
     * @return {?}
     */
    createClusterStyle(feature, clusterParam = {}, layerStyle) {
        /** @type {?} */
        let style;
        /** @type {?} */
        const size = feature.get('features').length;
        if (size !== 1) {
            if (clusterParam.clusterRanges) {
                for (const r of clusterParam.clusterRanges) {
                    if ((!r.minRadius || r.minRadius <= size) &&
                        (!r.maxRadius || r.maxRadius >= size)) {
                        style = this.createStyle(r.style);
                        break;
                    }
                }
            }
            if (!style) {
                /** @type {?} */
                let clusterRadius;
                if (clusterParam.radiusCalc) {
                    clusterRadius = clusterParam.radiusCalc(size);
                }
                else {
                    /** @type {?} */
                    const radiusMin = 6;
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
    }
    /**
     * @param {?} feature
     * @param {?} labelMatch
     * @return {?}
     */
    getLabel(feature, labelMatch) {
        /** @type {?} */
        let label = labelMatch;
        /** @type {?} */
        const labelToGet = Array.from(labelMatch.matchAll(/\$\{([^\{\}]+)\}/g));
        labelToGet.forEach((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            label = label.replace(v[0], feature.get(v[1]));
        }));
        // Nothing done? check feature's attribute
        if (labelToGet.length === 0 && label === labelMatch) {
            label = feature.get(labelMatch) || labelMatch;
        }
        return label;
    }
}
StyleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ StyleService.ngInjectableDef = i0.defineInjectable({ factory: function StyleService_Factory() { return new StyleService(); }, token: StyleService, providedIn: "root" });
if (false) {
    /** @type {?} */
    StyleService.prototype.style;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFJbkMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUt6RCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFHdkIsV0FBVyxDQUFDLE9BQStCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLHdCQUF3QixFQUFFLENBQUM7U0FDbkM7UUFDRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsSUFBSSxPQUFPLFlBQVksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNyRSxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7OztJQUVPLFVBQVUsQ0FBQyxHQUFXLEVBQUUsS0FBVTs7Y0FDbEMsWUFBWSxHQUFHLEVBQUU7O2NBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUVoQyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzs7OztZQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUks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QUFPLENBQUMsSUFBSSxDQUFDO2dDQUNyQixLQUFLLEVBQUUsTUFBTTs2QkFDZCxDQUFDO3lCQUNILENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBVTs7WUFDdEIsS0FBSyxHQUFHLFVBQVU7O2NBQ2hCLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV2RSxVQUFVLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQyxFQUFDLENBQUM7UUFFSCwwQ0FBMEM7UUFDMUMsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ25ELEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQztTQUMvQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBcFBGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7SUFFQyw2QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IHsgU3R5bGVCeUF0dHJpYnV0ZSB9IGZyb20gJy4vdmVjdG9yLXN0eWxlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgeyBDbHVzdGVyUGFyYW0gfSBmcm9tICcuL2NsdXN0ZXJQYXJhbSc7XHJcbmltcG9ydCB7IGNyZWF0ZU92ZXJsYXlNYXJrZXJTdHlsZSB9IGZyb20gJy4uLy4uL292ZXJsYXknO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3R5bGVTZXJ2aWNlIHtcclxuICBwdWJsaWMgc3R5bGU6IG9sc3R5bGUuU3R5bGU7XHJcblxyXG4gIGNyZWF0ZVN0eWxlKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIG9sc3R5bGUuU3R5bGUpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5wYXJzZVN0eWxlKCdzdHlsZScsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVN0eWxlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogb2xzdHlsZSB7XHJcbiAgICBjb25zdCBzdHlsZU9wdGlvbnMgPSB7fTtcclxuICAgIGNvbnN0IG9sQ2xzID0gdGhpcy5nZXRPbENscyhrZXkpO1xyXG5cclxuICAgIGlmIChvbENscyAmJiB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChfa2V5ID0+IHtcclxuICAgICAgICBjb25zdCBvbEtleSA9IHRoaXMuZ2V0T2xLZXkoX2tleSk7XHJcbiAgICAgICAgc3R5bGVPcHRpb25zW29sS2V5XSA9IHRoaXMucGFyc2VTdHlsZShfa2V5LCB2YWx1ZVtfa2V5XSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbmV3IG9sQ2xzKHN0eWxlT3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9sS2V5KGtleTogYW55KSB7XHJcbiAgICBsZXQgb2xLZXk7XHJcbiAgICBzd2l0Y2ggKGtleS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgIGNhc2UgJ2NpcmNsZSc6XHJcbiAgICAgIGNhc2UgJ3JlZ3VsYXJzaGFwZSc6XHJcbiAgICAgIGNhc2UgJ2ljb24nOlxyXG4gICAgICAgIG9sS2V5ID0gJ2ltYWdlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xLZXkgfHwga2V5O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPbENscyhrZXk6IGFueSkge1xyXG4gICAgbGV0IG9sQ2xzID0gb2xzdHlsZVtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSldO1xyXG4gICAgaWYgKGtleSA9PT0gJ3JlZ3VsYXJzaGFwZScpIHtcclxuICAgICAgb2xDbHMgPSBvbHN0eWxlLlJlZ3VsYXJTaGFwZTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09ICdiYWNrZ3JvdW5kRmlsbCcpIHtcclxuICAgICAgb2xDbHMgPSBvbHN0eWxlLkZpbGw7XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5ID09PSAnYmFja2dyb3VuZFN0cm9rZScpIHtcclxuICAgICAgb2xDbHMgPSBvbHN0eWxlLlN0cm9rZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xDbHM7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTdHlsZUJ5QXR0cmlidXRlKGZlYXR1cmUsIHN0eWxlQnlBdHRyaWJ1dGU6IFN0eWxlQnlBdHRyaWJ1dGUpIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGNvbnN0IHR5cGUgPSBzdHlsZUJ5QXR0cmlidXRlLnR5cGU7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBzdHlsZUJ5QXR0cmlidXRlLmF0dHJpYnV0ZTtcclxuICAgIGNvbnN0IGRhdGEgPSBzdHlsZUJ5QXR0cmlidXRlLmRhdGE7XHJcbiAgICBjb25zdCBzdHJva2UgPSBzdHlsZUJ5QXR0cmlidXRlLnN0cm9rZTtcclxuICAgIGNvbnN0IHdpZHRoID0gc3R5bGVCeUF0dHJpYnV0ZS53aWR0aDtcclxuICAgIGNvbnN0IGZpbGwgPSBzdHlsZUJ5QXR0cmlidXRlLmZpbGw7XHJcbiAgICBjb25zdCByYWRpdXMgPSBzdHlsZUJ5QXR0cmlidXRlLnJhZGl1cztcclxuICAgIGNvbnN0IGljb24gPSBzdHlsZUJ5QXR0cmlidXRlLmljb247XHJcbiAgICBjb25zdCBzY2FsZSA9IHN0eWxlQnlBdHRyaWJ1dGUuc2NhbGU7XHJcbiAgICBjb25zdCBzaXplID0gZGF0YS5sZW5ndGg7XHJcbiAgICBjb25zdCBsYWJlbCA9IHN0eWxlQnlBdHRyaWJ1dGUubGFiZWwuYXR0cmlidXRlIHx8IHN0eWxlQnlBdHRyaWJ1dGUubGFiZWw7XHJcbiAgICBjb25zdCBsYWJlbFN0eWxlID1cclxuICAgICAgdGhpcy5wYXJzZVN0eWxlKCd0ZXh0Jywgc3R5bGVCeUF0dHJpYnV0ZS5sYWJlbC5zdHlsZSkgfHxcclxuICAgICAgbmV3IG9sc3R5bGUuVGV4dCgpO1xyXG4gICAgbGFiZWxTdHlsZS5zZXRUZXh0KHRoaXMuZ2V0TGFiZWwoZmVhdHVyZSwgbGFiZWwpKTtcclxuICAgIGNvbnN0IGJhc2VTdHlsZSA9IHN0eWxlQnlBdHRyaWJ1dGUuYmFzZVN0eWxlO1xyXG4gICAgaWYgKHR5cGUgPT09ICdjaXJjbGUnKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlLmdldChhdHRyaWJ1dGUpICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICA/IGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSlcclxuICAgICAgICAgICAgOiAnJztcclxuICAgICAgICBpZiAodmFsID09PSBkYXRhW2ldIHx8IHZhbC50b1N0cmluZygpLm1hdGNoKGRhdGFbaV0pKSB7XHJcbiAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XHJcbiAgICAgICAgICAgICAgICAgIHNyYzogaWNvbltpXSxcclxuICAgICAgICAgICAgICAgICAgc2NhbGU6IHNjYWxlID8gc2NhbGVbaV0gOiAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyA/IHJhZGl1c1tpXSA6IDQsXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBzdHJva2UgPyBzdHJva2VbaV0gOiAnYmxhY2snLFxyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGggPyB3aWR0aFtpXSA6IDFcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBmaWxsID8gZmlsbFtpXSA6ICdibGFjaydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdGV4dDogbGFiZWxTdHlsZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmZWF0dXJlLmdldFN0eWxlKCkpIHtcclxuICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgcmFkaXVzOiA0LFxyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNiYmJiZjInXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JlZ3VsYXInKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID1cclxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlLmdldChhdHRyaWJ1dGUpICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICA/IGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSlcclxuICAgICAgICAgICAgOiAnJztcclxuICAgICAgICBpZiAodmFsID09PSBkYXRhW2ldIHx8IHZhbC50b1N0cmluZygpLm1hdGNoKGRhdGFbaV0pKSB7XHJcbiAgICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBzdHJva2UgPyBzdHJva2VbaV0gOiAnYmxhY2snLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoID8gd2lkdGhbaV0gOiAxXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogZmlsbCA/IGZpbGxbaV0gOiAncmdiYSgyNTUsMjU1LDI1NSwwLjQpJ1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRleHQ6IGxhYmVsU3R5bGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIF07XHJcbiAgICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgT2xGZWF0dXJlKSB7XHJcbiAgICAgICAgaWYgKCFmZWF0dXJlLmdldFN0eWxlKCkpIHtcclxuICAgICAgICAgIGlmIChiYXNlU3R5bGUpIHtcclxuICAgICAgICAgICAgc3R5bGUgPSB0aGlzLmNyZWF0ZVN0eWxlKGJhc2VTdHlsZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI2JiYmJmMidcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZUNsdXN0ZXJTdHlsZShmZWF0dXJlLCBjbHVzdGVyUGFyYW06IENsdXN0ZXJQYXJhbSA9IHt9LCBsYXllclN0eWxlKSB7XHJcbiAgICBsZXQgc3R5bGU6IG9sc3R5bGUuU3R5bGU7XHJcbiAgICBjb25zdCBzaXplID0gZmVhdHVyZS5nZXQoJ2ZlYXR1cmVzJykubGVuZ3RoO1xyXG4gICAgaWYgKHNpemUgIT09IDEpIHtcclxuICAgICAgaWYgKGNsdXN0ZXJQYXJhbS5jbHVzdGVyUmFuZ2VzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCByIG9mIGNsdXN0ZXJQYXJhbS5jbHVzdGVyUmFuZ2VzKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICghci5taW5SYWRpdXMgfHwgci5taW5SYWRpdXMgPD0gc2l6ZSkgJiZcclxuICAgICAgICAgICAgKCFyLm1heFJhZGl1cyB8fCByLm1heFJhZGl1cyA+PSBzaXplKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gdGhpcy5jcmVhdGVTdHlsZShyLnN0eWxlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXN0eWxlKSB7XHJcbiAgICAgICAgbGV0IGNsdXN0ZXJSYWRpdXM6IG51bWJlcjtcclxuICAgICAgICBpZiAoY2x1c3RlclBhcmFtLnJhZGl1c0NhbGMpIHtcclxuICAgICAgICAgIGNsdXN0ZXJSYWRpdXMgPSBjbHVzdGVyUGFyYW0ucmFkaXVzQ2FsYyhzaXplKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgcmFkaXVzTWluID0gNjtcclxuICAgICAgICAgIGNsdXN0ZXJSYWRpdXMgPSA1ICogTWF0aC5sb2coc2l6ZSk7XHJcbiAgICAgICAgICBpZiAoY2x1c3RlclJhZGl1cyA8IHJhZGl1c01pbikge1xyXG4gICAgICAgICAgICBjbHVzdGVyUmFkaXVzID0gcmFkaXVzTWluO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3R5bGUgPSBbXHJcbiAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICAgIHJhZGl1czogY2x1c3RlclJhZGl1cyxcclxuICAgICAgICAgICAgICBvcGFjaXR5OiAwLjQsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNCwgMTM0LCA0NSwgMC41KSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgICAgICAgICAgdGV4dDogc2l6ZS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0eWxlID0gdGhpcy5jcmVhdGVTdHlsZShsYXllclN0eWxlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZTtcclxuICB9XHJcblxyXG4gIGdldExhYmVsKGZlYXR1cmUsIGxhYmVsTWF0Y2gpOiBzdHJpbmcge1xyXG4gICAgbGV0IGxhYmVsID0gbGFiZWxNYXRjaDtcclxuICAgIGNvbnN0IGxhYmVsVG9HZXQgPSBBcnJheS5mcm9tKGxhYmVsTWF0Y2gubWF0Y2hBbGwoL1xcJFxceyhbXlxce1xcfV0rKVxcfS9nKSk7XHJcblxyXG4gICAgbGFiZWxUb0dldC5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UodlswXSwgZmVhdHVyZS5nZXQodlsxXSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTm90aGluZyBkb25lPyBjaGVjayBmZWF0dXJlJ3MgYXR0cmlidXRlXHJcbiAgICBpZiAobGFiZWxUb0dldC5sZW5ndGggPT09IDAgJiYgbGFiZWwgPT09IGxhYmVsTWF0Y2gpIHtcclxuICAgICAgbGFiZWwgPSBmZWF0dXJlLmdldChsYWJlbE1hdGNoKSB8fCBsYWJlbE1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxuICB9XHJcbn1cclxuIl19