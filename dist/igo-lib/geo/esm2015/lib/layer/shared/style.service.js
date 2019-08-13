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
            for (let i = 0; i < size; i++) {
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
        const scale = clusterParam.clusterScale;
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
                            scale
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFRcEMsTUFBTSxPQUFPLFlBQVk7SUFDdkIsZ0JBQWUsQ0FBQzs7Ozs7SUFFaEIsV0FBVyxDQUFDLE9BQStCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7OztJQUVPLFVBQVUsQ0FBQyxHQUFXLEVBQUUsS0FBVTs7Y0FDbEMsWUFBWSxHQUFHLEVBQUU7O2NBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUVoQyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzs7OztZQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEdBQVE7O1lBQ25CLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFO1FBQzdCLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLE1BQU07Z0JBQ1QsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDaEIsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEdBQVE7O1lBQ25CLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksR0FBRyxLQUFLLGNBQWMsRUFBRTtZQUMxQixLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUM5QjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7O0lBQ0Qsc0JBQXNCLENBQUMsT0FBTyxFQUFFLGdCQUFrQzs7WUFDNUQsS0FBSzs7Y0FDSCxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSTs7Y0FDNUIsU0FBUyxHQUFHLGdCQUFnQixDQUFDLFNBQVM7O2NBQ3RDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJOztjQUM1QixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsTUFBTTs7Y0FDaEMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUs7O2NBQzlCLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJOztjQUM1QixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsTUFBTTs7Y0FDaEMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUk7O2NBQzVCLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLOztjQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU07O2NBQ2xCLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLOztjQUM5QixTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUztRQUM1QyxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxJQUFJLEVBQUU7d0JBQ1IsS0FBSyxHQUFHOzRCQUNOLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQztnQ0FDaEIsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztvQ0FDdEIsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0NBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUM1QixDQUFDOzZCQUNILENBQUM7eUJBQ0gsQ0FBQzt3QkFDRixPQUFPLEtBQUssQ0FBQztxQkFDZDtvQkFDRCxLQUFLLEdBQUc7d0JBQ04sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDOzRCQUNoQixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO2dDQUN4QixNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzlCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0NBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztpQ0FDcEMsQ0FBQztnQ0FDRixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO29DQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87aUNBQ2hDLENBQUM7NkJBQ0gsQ0FBQzt5QkFDSCxDQUFDO3FCQUNILENBQUM7b0JBQ0YsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3ZCLEtBQUssR0FBRztvQkFDTixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ2hCLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7NEJBQ3hCLE1BQU0sRUFBRSxDQUFDOzRCQUNULE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0NBQ3pCLEtBQUssRUFBRSxPQUFPOzZCQUNmLENBQUM7NEJBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDckIsS0FBSyxFQUFFLFNBQVM7NkJBQ2pCLENBQUM7eUJBQ0gsQ0FBQztxQkFDSCxDQUFDO2lCQUNILENBQUM7Z0JBQ0YsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3RDLEtBQUssR0FBRzt3QkFDTixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7NEJBQ2hCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0NBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztnQ0FDbkMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUM1QixDQUFDOzRCQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0NBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCOzZCQUNoRCxDQUFDOzRCQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0NBQ3JCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztnQ0FDeEIsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztvQ0FDekIsS0FBSyxFQUFFLE9BQU87aUNBQ2YsQ0FBQzs2QkFDSCxDQUFDO3lCQUNILENBQUM7cUJBQ0gsQ0FBQztvQkFDRixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxTQUFTLEVBQUU7b0JBQ2IsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3BDLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELEtBQUssR0FBRztvQkFDTixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ2hCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7NEJBQ3pCLEtBQUssRUFBRSxPQUFPO3lCQUNmLENBQUM7d0JBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDckIsS0FBSyxFQUFFLFNBQVM7eUJBQ2pCLENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDO2dCQUNGLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtJQUNILENBQUM7Ozs7OztJQUVELGtCQUFrQixDQUFDLE9BQU8sRUFBRSxZQUEwQjs7WUFDaEQsS0FBSzs7Y0FDSCxLQUFLLEdBQUcsWUFBWSxDQUFDLFlBQVk7O2NBQ2pDLElBQUksR0FBRyxZQUFZLENBQUMsV0FBVzs7Y0FDL0IsS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZOztjQUNqQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNOztZQUN2QyxLQUFLO1FBQ1QsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ2QsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM5QyxLQUFLLEdBQUcsUUFBUSxDQUFDO2lCQUNsQjtxQkFBTSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzFCLEtBQUssR0FBRyxPQUFPLENBQUM7aUJBQ2pCO2FBQ0Y7WUFDRCxLQUFLLEdBQUc7Z0JBQ04sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNoQixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO3dCQUN4QixNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHO3dCQUN0QixNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDOzRCQUN6QixLQUFLLEVBQUUsT0FBTzt5QkFDZixDQUFDO3dCQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7NEJBQ3JCLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTTt5QkFDOUIsQ0FBQztxQkFDSCxDQUFDO29CQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNyQixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDOzRCQUNyQixLQUFLLEVBQUUsTUFBTTt5QkFDZCxDQUFDO3FCQUNILENBQUM7aUJBQ0gsQ0FBQzthQUNILENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsS0FBSyxHQUFHO29CQUNOLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDaEIsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDdEIsR0FBRyxFQUFFLElBQUk7NEJBQ1QsS0FBSzt5QkFDTixDQUFDO3FCQUNILENBQUM7aUJBQ0gsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLEtBQUssR0FBRztvQkFDTixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ2hCLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7NEJBQ3hCLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUc7NEJBQ3RCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0NBQ3pCLEtBQUssRUFBRSxPQUFPOzZCQUNmLENBQUM7NEJBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDckIsS0FBSyxFQUFFLE1BQU07NkJBQ2QsQ0FBQzt5QkFDSCxDQUFDO3FCQUNILENBQUM7aUJBQ0gsQ0FBQzthQUNIO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQXRORixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IHsgU3R5bGVCeUF0dHJpYnV0ZSB9IGZyb20gJy4vc3R5bGVieWF0dHJpYnV0ZSc7XHJcblxyXG5pbXBvcnQgeyBDbHVzdGVyUGFyYW0gfSBmcm9tICcuL2NsdXN0ZXJQYXJhbSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHlsZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgY3JlYXRlU3R5bGUob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyc2VTdHlsZSgnc3R5bGUnLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VTdHlsZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IG9sc3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVPcHRpb25zID0ge307XHJcbiAgICBjb25zdCBvbENscyA9IHRoaXMuZ2V0T2xDbHMoa2V5KTtcclxuXHJcbiAgICBpZiAob2xDbHMgJiYgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goX2tleSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2xLZXkgPSB0aGlzLmdldE9sS2V5KF9rZXkpO1xyXG4gICAgICAgIHN0eWxlT3B0aW9uc1tvbEtleV0gPSB0aGlzLnBhcnNlU3R5bGUoX2tleSwgdmFsdWVbX2tleV0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG5ldyBvbENscyhzdHlsZU9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPbEtleShrZXk6IGFueSkge1xyXG4gICAgbGV0IG9sS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBzd2l0Y2ggKG9sS2V5KSB7XHJcbiAgICAgIGNhc2UgJ2NpcmNsZSc6XHJcbiAgICAgIGNhc2UgJ3JlZ3VsYXJzaGFwZSc6XHJcbiAgICAgIGNhc2UgJ2ljb24nOlxyXG4gICAgICAgIG9sS2V5ID0gJ2ltYWdlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2xLZXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9sQ2xzKGtleTogYW55KSB7XHJcbiAgICBsZXQgb2xDbHMgPSBvbHN0eWxlW2tleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKV07XHJcbiAgICBpZiAoa2V5ID09PSAncmVndWxhcnNoYXBlJykge1xyXG4gICAgICBvbENscyA9IG9sc3R5bGUuUmVndWxhclNoYXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvbENscztcclxuICB9XHJcbiAgY3JlYXRlU3R5bGVCeUF0dHJpYnV0ZShmZWF0dXJlLCBzdHlsZUJ5QXR0cmlidXRlOiBTdHlsZUJ5QXR0cmlidXRlKSB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBjb25zdCB0eXBlID0gc3R5bGVCeUF0dHJpYnV0ZS50eXBlO1xyXG4gICAgY29uc3QgYXR0cmlidXRlID0gc3R5bGVCeUF0dHJpYnV0ZS5hdHRyaWJ1dGU7XHJcbiAgICBjb25zdCBkYXRhID0gc3R5bGVCeUF0dHJpYnV0ZS5kYXRhO1xyXG4gICAgY29uc3Qgc3Ryb2tlID0gc3R5bGVCeUF0dHJpYnV0ZS5zdHJva2U7XHJcbiAgICBjb25zdCB3aWR0aCA9IHN0eWxlQnlBdHRyaWJ1dGUud2lkdGg7XHJcbiAgICBjb25zdCBmaWxsID0gc3R5bGVCeUF0dHJpYnV0ZS5maWxsO1xyXG4gICAgY29uc3QgcmFkaXVzID0gc3R5bGVCeUF0dHJpYnV0ZS5yYWRpdXM7XHJcbiAgICBjb25zdCBpY29uID0gc3R5bGVCeUF0dHJpYnV0ZS5pY29uO1xyXG4gICAgY29uc3Qgc2NhbGUgPSBzdHlsZUJ5QXR0cmlidXRlLnNjYWxlO1xyXG4gICAgY29uc3Qgc2l6ZSA9IGRhdGEubGVuZ3RoO1xyXG4gICAgY29uc3QgbGFiZWwgPSBzdHlsZUJ5QXR0cmlidXRlLmxhYmVsO1xyXG4gICAgY29uc3QgYmFzZVN0eWxlID0gc3R5bGVCeUF0dHJpYnV0ZS5iYXNlU3R5bGU7XHJcbiAgICBpZiAodHlwZSA9PT0gJ2NpcmNsZScpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICBpZiAoZmVhdHVyZS5nZXQoYXR0cmlidXRlKSA9PT0gZGF0YVtpXSkge1xyXG4gICAgICAgICAgaWYgKGljb24pIHtcclxuICAgICAgICAgICAgc3R5bGUgPSBbXHJcbiAgICAgICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICAgICAgICAgICAgICBzcmM6IGljb25baV0sXHJcbiAgICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZSA/IHNjYWxlW2ldIDogMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMgPyByYWRpdXNbaV0gOiA0LFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogc3Ryb2tlID8gc3Ryb2tlW2ldIDogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgICAgY29sb3I6IGZpbGwgPyBmaWxsW2ldIDogJ2JsYWNrJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmZWF0dXJlLmdldFN0eWxlKCkpIHtcclxuICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgcmFkaXVzOiA0LFxyXG4gICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyNiYmJiZjInXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JlZ3VsYXInKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmUuZ2V0KGF0dHJpYnV0ZSkgPT09IGRhdGFbaV0pIHtcclxuICAgICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHN0cm9rZSA/IHN0cm9rZVtpXSA6ICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGggPyB3aWR0aFtpXSA6IDFcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBmaWxsID8gZmlsbFtpXSA6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNCknXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBmZWF0dXJlLmdldChsYWJlbCksXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWZlYXR1cmUuZ2V0U3R5bGUoKSkge1xyXG4gICAgICAgIGlmIChiYXNlU3R5bGUpIHtcclxuICAgICAgICAgIHN0eWxlID0gdGhpcy5jcmVhdGVTdHlsZShiYXNlU3R5bGUpO1xyXG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHlsZSA9IFtcclxuICAgICAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICBjb2xvcjogJyNiYmJiZjInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDbHVzdGVyU3R5bGUoZmVhdHVyZSwgY2x1c3RlclBhcmFtOiBDbHVzdGVyUGFyYW0pIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGNvbnN0IHJhbmdlID0gY2x1c3RlclBhcmFtLmNsdXN0ZXJSYW5nZTtcclxuICAgIGNvbnN0IGljb24gPSBjbHVzdGVyUGFyYW0uY2x1c3Rlckljb247XHJcbiAgICBjb25zdCBzY2FsZSA9IGNsdXN0ZXJQYXJhbS5jbHVzdGVyU2NhbGU7XHJcbiAgICBjb25zdCBzaXplID0gZmVhdHVyZS5nZXQoJ2ZlYXR1cmVzJykubGVuZ3RoO1xyXG4gICAgbGV0IGNvbG9yO1xyXG4gICAgaWYgKHNpemUgIT09IDEpIHtcclxuICAgICAgaWYgKHJhbmdlKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPj0gcmFuZ2VbMV0pIHtcclxuICAgICAgICAgIGNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaXplIDwgcmFuZ2VbMV0gJiYgc2l6ZSA+PSByYW5nZVswXSkge1xyXG4gICAgICAgICAgY29sb3IgPSAnb3JhbmdlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHNpemUgPCByYW5nZVswXSkge1xyXG4gICAgICAgICAgY29sb3IgPSAnZ3JlZW4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzdHlsZSA9IFtcclxuICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgcmFkaXVzOiAyICogc2l6ZSArIDMuNCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICBjb2xvcjogcmFuZ2UgPyBjb2xvciA6ICdibHVlJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgICAgICAgdGV4dDogc2l6ZS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgIHN0eWxlID0gW1xyXG4gICAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XHJcbiAgICAgICAgICAgICAgc3JjOiBpY29uLFxyXG4gICAgICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3R5bGUgPSBbXHJcbiAgICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICAgIHJhZGl1czogMiAqIHNpemUgKyAzLjQsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaydcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmx1ZSdcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==