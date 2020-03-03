/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olstyle from 'ol/style';
import { FeatureDataSource } from '../../datasource';
import { VectorLayer, StyleService } from '../../layer';
/**
 * Create an overlay layer and it's source
 * @return {?} Overlay layer
 */
export function createOverlayLayer() {
    /** @type {?} */
    var overlayDataSource = new FeatureDataSource();
    return new VectorLayer({
        title: 'Overlay',
        zIndex: 300,
        source: overlayDataSource,
        style: createOverlayLayerStyle()
    });
}
/**
 * Create an overlay style with markers for points and a basic stroke/fill
 * combination for lines and polygons
 * @return {?} Style function
 */
function createOverlayLayerStyle() {
    /** @type {?} */
    var defaultStyle = createOverlayDefaultStyle();
    /** @type {?} */
    var markerStyle = createOverlayMarkerStyle();
    /** @type {?} */
    var style;
    return (/**
     * @param {?} olFeature
     * @return {?}
     */
    function (olFeature) {
        if (olFeature.getId() === 'bufferFeature') {
            style = createBufferStyle(olFeature.get('bufferStroke'), 2, olFeature.get('bufferFill'), olFeature.get('bufferText'));
            return style;
        }
        else {
            /** @type {?} */
            var customStyle = olFeature.get('_style');
            if (customStyle) {
                /** @type {?} */
                var styleService = new StyleService();
                return styleService.createStyle(customStyle);
            }
            /** @type {?} */
            var geometryType = olFeature.getGeometry().getType();
            style = geometryType === 'Point' ? markerStyle : defaultStyle;
            style.getText().setText(olFeature.get('_mapTitle'));
            return style;
        }
    });
}
/**
 * Create a basic style for lines and polygons
 * @param {?=} __0
 * @return {?} Style
 */
export function createOverlayDefaultStyle(_a) {
    var _b = _a === void 0 ? {} : _a, text = _b.text, fillOpacity = _b.fillOpacity, _c = _b.strokeWidth, strokeWidth = _c === void 0 ? 2 : _c, strokeOpacity = _b.strokeOpacity, _d = _b.color, color = _d === void 0 ? [0, 161, 222, 0.3] : _d;
    /** @type {?} */
    var fillWithOpacity = color.slice(0);
    /** @type {?} */
    var strokeWithOpacity = color.slice(0);
    strokeWithOpacity[3] = 1;
    if (fillOpacity) {
        fillWithOpacity[3] = fillOpacity;
    }
    if (strokeOpacity) {
        strokeWithOpacity[3] = strokeOpacity;
    }
    /** @type {?} */
    var stroke = new olstyle.Stroke({
        width: strokeWidth,
        color: strokeWithOpacity
    });
    /** @type {?} */
    var fill = new olstyle.Fill({
        color: fillWithOpacity
    });
    return new olstyle.Style({
        stroke: stroke,
        fill: fill,
        image: new olstyle.Circle({
            radius: 5,
            stroke: stroke,
            fill: fill
        }),
        text: new olstyle.Text({
            text: text,
            font: '12px Calibri,sans-serif',
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
/**
 * Create a marker style for points
 * @param {?=} __0
 * @return {?} Style
 */
export function createOverlayMarkerStyle(_a) {
    var _b = _a === void 0 ? {} : _a, text = _b.text, _c = _b.opacity, opacity = _c === void 0 ? 1 : _c, _d = _b.color, color = _d === void 0 ? 'blue' : _d;
    /** @type {?} */
    var iconColor;
    switch (color) {
        case 'blue':
        case 'red':
        case 'yellow':
        case 'green':
            iconColor = color;
            break;
        default:
            iconColor = 'blue';
            break;
    }
    return new olstyle.Style({
        image: new olstyle.Icon({
            src: './assets/igo2/geo/icons/place_' + iconColor + '_36px.svg',
            opacity: opacity,
            imgSize: [36, 36],
            // for ie
            anchor: [0.5, 0.92]
        }),
        text: new olstyle.Text({
            text: text,
            font: '12px Calibri,sans-serif',
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
/**
 * @param {?=} strokeRGBA
 * @param {?=} strokeWidth
 * @param {?=} fillRGBA
 * @param {?=} bufferRadius
 * @return {?}
 */
function createBufferStyle(strokeRGBA, strokeWidth, fillRGBA, bufferRadius) {
    if (strokeRGBA === void 0) { strokeRGBA = [0, 161, 222, 1]; }
    if (strokeWidth === void 0) { strokeWidth = 2; }
    if (fillRGBA === void 0) { fillRGBA = [0, 161, 222, 0.15]; }
    /** @type {?} */
    var stroke = new olstyle.Stroke({
        width: strokeWidth,
        color: strokeRGBA
    });
    /** @type {?} */
    var fill = new olstyle.Stroke({
        color: fillRGBA
    });
    return new olstyle.Style({
        stroke: stroke,
        fill: fill,
        image: new olstyle.Circle({
            radius: 5,
            stroke: stroke,
            fill: fill
        }),
        text: new olstyle.Text({
            font: '12px Calibri,sans-serif',
            text: bufferRadius,
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUdwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFNeEQsTUFBTSxVQUFVLGtCQUFrQjs7UUFDMUIsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTtJQUNqRCxPQUFPLElBQUksV0FBVyxDQUFDO1FBQ3JCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixLQUFLLEVBQUUsdUJBQXVCLEVBQUU7S0FDakMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7O0FBT0QsU0FBUyx1QkFBdUI7O1FBQ3hCLFlBQVksR0FBRyx5QkFBeUIsRUFBRTs7UUFDMUMsV0FBVyxHQUFHLHdCQUF3QixFQUFFOztRQUUxQyxLQUFLO0lBRVQ7Ozs7SUFBTyxVQUFDLFNBQW9CO1FBQzFCLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLGVBQWUsRUFBRTtZQUN6QyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEgsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNOztnQkFDQyxXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDM0MsSUFBSSxXQUFXLEVBQUU7O29CQUNULFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRTtnQkFDdkMsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzlDOztnQkFDSyxZQUFZLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUN0RCxLQUFLLEdBQUcsWUFBWSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFDOUQsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUMsRUFBQztBQUNKLENBQUM7Ozs7OztBQU1ELE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsRUFDNkc7UUFEN0csNEJBQzZHLEVBRDVHLGNBQUksRUFBRSw0QkFBVyxFQUFFLG1CQUFlLEVBQWYsb0NBQWUsRUFBRSxnQ0FBYSxFQUFFLGFBQTBCLEVBQTFCLCtDQUEwQjs7UUFHeEUsZUFBZSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztRQUNoQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4QyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsSUFBSSxXQUFXLEVBQUU7UUFDZixlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO0tBQ2xDO0lBQ0QsSUFBSSxhQUFhLEVBQUU7UUFDakIsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDO0tBQ3RDOztRQUVLLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDaEMsS0FBSyxFQUFFLFdBQVc7UUFDbEIsS0FBSyxFQUFFLGlCQUFpQjtLQUN6QixDQUFDOztRQUVJLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDNUIsS0FBSyxFQUFFLGVBQWU7S0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sUUFBQTtRQUNOLElBQUksTUFBQTtRQUNKLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDeEIsTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLFFBQUE7WUFDTixJQUFJLE1BQUE7U0FDTCxDQUFDO1FBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLE1BQUE7WUFDSixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDekMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3ZELFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNMLENBQUM7Ozs7OztBQU1ELE1BQU0sVUFBVSx3QkFBd0IsQ0FDdEMsRUFDeUQ7UUFEekQsNEJBQ3lELEVBRHhELGNBQUksRUFBRSxlQUFXLEVBQVgsZ0NBQVcsRUFBRSxhQUFjLEVBQWQsbUNBQWM7O1FBRzlCLFNBQVM7SUFDYixRQUFRLEtBQUssRUFBRTtRQUNiLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssT0FBTztZQUNWLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDbEIsTUFBTTtRQUNSO1lBQ0UsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUNuQixNQUFNO0tBQ1Q7SUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN2QixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxnQ0FBZ0MsR0FBRyxTQUFTLEdBQUcsV0FBVztZQUMvRCxPQUFPLFNBQUE7WUFDUCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOztZQUNqQixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1NBQ3BCLENBQUM7UUFDRixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksTUFBQTtZQUNKLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN6QyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdkQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7Ozs7QUFFRCxTQUFTLGlCQUFpQixDQUN4QixVQUErRCxFQUMvRCxXQUF1QixFQUN2QixRQUFnRSxFQUNoRSxZQUFhO0lBSGIsMkJBQUEsRUFBQSxjQUFnRCxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDL0QsNEJBQUEsRUFBQSxlQUF1QjtJQUN2Qix5QkFBQSxFQUFBLFlBQThDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQzs7UUFHMUQsTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxLQUFLLEVBQUUsV0FBVztRQUNsQixLQUFLLEVBQUUsVUFBVTtLQUNsQixDQUFDOztRQUVJLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDOUIsS0FBSyxFQUFFLFFBQVE7S0FDaEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sUUFBQTtRQUNOLElBQUksTUFBQTtRQUNKLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDeEIsTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLFFBQUE7WUFDTixJQUFJLE1BQUE7U0FDTCxDQUFDO1FBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDekMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3ZELFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyLCBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIG92ZXJsYXkgbGF5ZXIgYW5kIGl0J3Mgc291cmNlXHJcbiAqIEByZXR1cm5zIE92ZXJsYXkgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TGF5ZXIoKTogVmVjdG9yTGF5ZXIge1xyXG4gIGNvbnN0IG92ZXJsYXlEYXRhU291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKCk7XHJcbiAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogJ092ZXJsYXknLFxyXG4gICAgekluZGV4OiAzMDAsXHJcbiAgICBzb3VyY2U6IG92ZXJsYXlEYXRhU291cmNlLFxyXG4gICAgc3R5bGU6IGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKClcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBvdmVybGF5IHN0eWxlIHdpdGggbWFya2VycyBmb3IgcG9pbnRzIGFuZCBhIGJhc2ljIHN0cm9rZS9maWxsXHJcbiAqIGNvbWJpbmF0aW9uIGZvciBsaW5lcyBhbmQgcG9seWdvbnNcclxuICogQHJldHVybnMgU3R5bGUgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKCk6IChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3QgZGVmYXVsdFN0eWxlID0gY3JlYXRlT3ZlcmxheURlZmF1bHRTdHlsZSgpO1xyXG4gIGNvbnN0IG1hcmtlclN0eWxlID0gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKCk7XHJcblxyXG4gIGxldCBzdHlsZTtcclxuXHJcbiAgcmV0dXJuIChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgaWYgKG9sRmVhdHVyZS5nZXRJZCgpID09PSAnYnVmZmVyRmVhdHVyZScpIHtcclxuICAgICAgc3R5bGUgPSBjcmVhdGVCdWZmZXJTdHlsZShvbEZlYXR1cmUuZ2V0KCdidWZmZXJTdHJva2UnKSwgMiwgb2xGZWF0dXJlLmdldCgnYnVmZmVyRmlsbCcpLCBvbEZlYXR1cmUuZ2V0KCdidWZmZXJUZXh0JykpO1xyXG4gICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjdXN0b21TdHlsZSA9IG9sRmVhdHVyZS5nZXQoJ19zdHlsZScpO1xyXG4gICAgICBpZiAoY3VzdG9tU3R5bGUpIHtcclxuICAgICAgICBjb25zdCBzdHlsZVNlcnZpY2UgPSBuZXcgU3R5bGVTZXJ2aWNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShjdXN0b21TdHlsZSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZ2VvbWV0cnlUeXBlID0gb2xGZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0VHlwZSgpO1xyXG4gICAgICBzdHlsZSA9IGdlb21ldHJ5VHlwZSA9PT0gJ1BvaW50JyA/IG1hcmtlclN0eWxlIDogZGVmYXVsdFN0eWxlO1xyXG4gICAgICBzdHlsZS5nZXRUZXh0KCkuc2V0VGV4dChvbEZlYXR1cmUuZ2V0KCdfbWFwVGl0bGUnKSk7XHJcbiAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgYmFzaWMgc3R5bGUgZm9yIGxpbmVzIGFuZCBwb2x5Z29uc1xyXG4gKiBAcmV0dXJucyBTdHlsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlEZWZhdWx0U3R5bGUoXHJcbiAge3RleHQsIGZpbGxPcGFjaXR5LCBzdHJva2VXaWR0aCA9IDIsIHN0cm9rZU9wYWNpdHksIGNvbG9yID0gWzAsIDE2MSwgMjIyLCAwLjNdfTpcclxuICAgIHt0ZXh0Pzogc3RyaW5nLCBmaWxsT3BhY2l0eT86IG51bWJlciwgc3Ryb2tlV2lkdGg/OiBudW1iZXIsIHN0cm9rZU9wYWNpdHk/OiBudW1iZXIsIGNvbG9yPzogbnVtYmVyW119ICA9IHt9XHJcbiAgKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3QgZmlsbFdpdGhPcGFjaXR5ID0gY29sb3Iuc2xpY2UoMCk7XHJcbiAgY29uc3Qgc3Ryb2tlV2l0aE9wYWNpdHkgPSBjb2xvci5zbGljZSgwKTtcclxuICBzdHJva2VXaXRoT3BhY2l0eVszXSA9IDE7XHJcbiAgaWYgKGZpbGxPcGFjaXR5KSB7XHJcbiAgICBmaWxsV2l0aE9wYWNpdHlbM10gPSBmaWxsT3BhY2l0eTtcclxuICB9XHJcbiAgaWYgKHN0cm9rZU9wYWNpdHkpIHtcclxuICAgIHN0cm9rZVdpdGhPcGFjaXR5WzNdID0gc3Ryb2tlT3BhY2l0eTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN0cm9rZSA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICB3aWR0aDogc3Ryb2tlV2lkdGgsXHJcbiAgICBjb2xvcjogc3Ryb2tlV2l0aE9wYWNpdHlcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmlsbCA9IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgY29sb3I6IGZpbGxXaXRoT3BhY2l0eVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgc3Ryb2tlLFxyXG4gICAgZmlsbCxcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICByYWRpdXM6IDUsXHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbFxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgdGV4dCxcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAnIzAwMCcgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSksXHJcbiAgICAgIG92ZXJmbG93OiB0cnVlXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbWFya2VyIHN0eWxlIGZvciBwb2ludHNcclxuICogQHJldHVybnMgU3R5bGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFya2VyU3R5bGUoXHJcbiAge3RleHQsIG9wYWNpdHkgPSAxLCBjb2xvciA9ICdibHVlJ306XHJcbiAgICB7dGV4dD86IHN0cmluZywgb3BhY2l0eT86IG51bWJlciwgY29sb3I/OiBzdHJpbmd9ICA9IHt9XHJcbiAgKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgbGV0IGljb25Db2xvcjtcclxuICBzd2l0Y2ggKGNvbG9yKSB7XHJcbiAgICBjYXNlICdibHVlJzpcclxuICAgIGNhc2UgJ3JlZCc6XHJcbiAgICBjYXNlICd5ZWxsb3cnOlxyXG4gICAgY2FzZSAnZ3JlZW4nOlxyXG4gICAgICBpY29uQ29sb3IgPSBjb2xvcjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpY29uQ29sb3IgPSAnYmx1ZSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pZ28yL2dlby9pY29ucy9wbGFjZV8nICsgaWNvbkNvbG9yICsgJ18zNnB4LnN2ZycsXHJcbiAgICAgIG9wYWNpdHksXHJcbiAgICAgIGltZ1NpemU6IFszNiwgMzZdLCAvLyBmb3IgaWVcclxuICAgICAgYW5jaG9yOiBbMC41LCAwLjkyXVxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgdGV4dCxcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAnIzAwMCcgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSksXHJcbiAgICAgIG92ZXJmbG93OiB0cnVlXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXJTdHlsZShcclxuICBzdHJva2VSR0JBOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IFswLCAxNjEsIDIyMiwgMV0sXHJcbiAgc3Ryb2tlV2lkdGg6IG51bWJlciA9IDIsXHJcbiAgZmlsbFJHQkE6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdID0gWzAsIDE2MSwgMjIyLCAwLjE1XSxcclxuICBidWZmZXJSYWRpdXM/XHJcbik6IG9sc3R5bGUuU3R5bGUge1xyXG4gIGNvbnN0IHN0cm9rZSA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICB3aWR0aDogc3Ryb2tlV2lkdGgsXHJcbiAgICBjb2xvcjogc3Ryb2tlUkdCQVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmaWxsID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgIGNvbG9yOiBmaWxsUkdCQVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgc3Ryb2tlLFxyXG4gICAgZmlsbCxcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICByYWRpdXM6IDUsXHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbFxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgdGV4dDogYnVmZmVyUmFkaXVzLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHsgY29sb3I6ICcjMDAwJyB9KSxcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcclxuICAgICAgb3ZlcmZsb3c6IHRydWVcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuIl19