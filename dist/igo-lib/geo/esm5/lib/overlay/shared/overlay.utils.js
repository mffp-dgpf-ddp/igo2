/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olstyle from 'ol/style';
import { FeatureDataSource } from '../../datasource';
import { VectorLayer } from '../../layer';
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
            var geometryType = olFeature.getGeometry().getType();
            style = geometryType === 'Point' ? markerStyle : defaultStyle;
            style.getText().setText(olFeature.get('_mapTitle'));
            return style;
        }
    });
}
/**
 * Create a basic style for lines and polygons
 * @return {?} Style
 */
function createOverlayDefaultStyle() {
    /** @type {?} */
    var stroke = new olstyle.Stroke({
        width: 2,
        color: [0, 161, 222, 1]
    });
    /** @type {?} */
    var fill = new olstyle.Stroke({
        color: [0, 161, 222, 0.15]
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
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
/**
 * Create a marker style for points
 * @param {?=} color
 * @return {?} Style
 */
export function createOverlayMarkerStyle(color) {
    if (color === void 0) { color = 'blue'; }
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
            imgSize: [36, 36],
            // for ie
            anchor: [0.5, 1]
        }),
        text: new olstyle.Text({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUdwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7OztBQU0xQyxNQUFNLFVBQVUsa0JBQWtCOztRQUMxQixpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFO0lBQ2pELE9BQU8sSUFBSSxXQUFXLENBQUM7UUFDckIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtLQUNqQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFPRCxTQUFTLHVCQUF1Qjs7UUFDeEIsWUFBWSxHQUFHLHlCQUF5QixFQUFFOztRQUMxQyxXQUFXLEdBQUcsd0JBQXdCLEVBQUU7O1FBQzFDLEtBQUs7SUFFVDs7OztJQUFPLFVBQUMsU0FBb0I7UUFDMUIsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssZUFBZSxFQUFFO1lBQ3pDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0SCxPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU07O2dCQUNDLFlBQVksR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ3RELEtBQUssR0FBRyxZQUFZLEtBQUssT0FBTyxD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LEVBQUEsWUFBOEMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDOztRQUcxRCxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxXQUFXO1FBQ2xCLEtBQUssRUFBRSxVQUFVO0tBQ2xCLENBQUM7O1FBRUksSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixLQUFLLEVBQUUsUUFBUTtLQUNoQixDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDdkIsTUFBTSxRQUFBO1FBQ04sSUFBSSxNQUFBO1FBQ0osS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUN4QixNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU0sUUFBQTtZQUNOLElBQUksTUFBQTtTQUNMLENBQUM7UUFDRixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN6QyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdkQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIG92ZXJsYXkgbGF5ZXIgYW5kIGl0J3Mgc291cmNlXHJcbiAqIEByZXR1cm5zIE92ZXJsYXkgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TGF5ZXIoKTogVmVjdG9yTGF5ZXIge1xyXG4gIGNvbnN0IG92ZXJsYXlEYXRhU291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKCk7XHJcbiAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogJ092ZXJsYXknLFxyXG4gICAgekluZGV4OiAzMDAsXHJcbiAgICBzb3VyY2U6IG92ZXJsYXlEYXRhU291cmNlLFxyXG4gICAgc3R5bGU6IGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKClcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBvdmVybGF5IHN0eWxlIHdpdGggbWFya2VycyBmb3IgcG9pbnRzIGFuZCBhIGJhc2ljIHN0cm9rZS9maWxsXHJcbiAqIGNvbWJpbmF0aW9uIGZvciBsaW5lcyBhbmQgcG9seWdvbnNcclxuICogQHJldHVybnMgU3R5bGUgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKCk6IChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3QgZGVmYXVsdFN0eWxlID0gY3JlYXRlT3ZlcmxheURlZmF1bHRTdHlsZSgpO1xyXG4gIGNvbnN0IG1hcmtlclN0eWxlID0gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKCk7XHJcbiAgbGV0IHN0eWxlO1xyXG5cclxuICByZXR1cm4gKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICBpZiAob2xGZWF0dXJlLmdldElkKCkgPT09ICdidWZmZXJGZWF0dXJlJykge1xyXG4gICAgICBzdHlsZSA9IGNyZWF0ZUJ1ZmZlclN0eWxlKG9sRmVhdHVyZS5nZXQoJ2J1ZmZlclN0cm9rZScpLCAyLCBvbEZlYXR1cmUuZ2V0KCdidWZmZXJGaWxsJyksIG9sRmVhdHVyZS5nZXQoJ2J1ZmZlclRleHQnKSk7XHJcbiAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGdlb21ldHJ5VHlwZSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKTtcclxuICAgICAgc3R5bGUgPSBnZW9tZXRyeVR5cGUgPT09ICdQb2ludCcgPyBtYXJrZXJTdHlsZSA6IGRlZmF1bHRTdHlsZTtcclxuICAgICAgc3R5bGUuZ2V0VGV4dCgpLnNldFRleHQob2xGZWF0dXJlLmdldCgnX21hcFRpdGxlJykpO1xyXG4gICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGJhc2ljIHN0eWxlIGZvciBsaW5lcyBhbmQgcG9seWdvbnNcclxuICogQHJldHVybnMgU3R5bGVcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlEZWZhdWx0U3R5bGUoKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3Qgc3Ryb2tlID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgIHdpZHRoOiAyLFxyXG4gICAgY29sb3I6IFswLCAxNjEsIDIyMiwgMV1cclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmlsbCA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICBjb2xvcjogWzAsIDE2MSwgMjIyLCAwLjE1XVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgc3Ryb2tlLFxyXG4gICAgZmlsbCxcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICByYWRpdXM6IDUsXHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbFxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAnIzAwMCcgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSksXHJcbiAgICAgIG92ZXJmbG93OiB0cnVlXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbWFya2VyIHN0eWxlIGZvciBwb2ludHNcclxuICogQHJldHVybnMgU3R5bGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFya2VyU3R5bGUoY29sb3IgPSAnYmx1ZScpOiBvbHN0eWxlLlN0eWxlIHtcclxuICBsZXQgaWNvbkNvbG9yO1xyXG4gIHN3aXRjaCAoY29sb3IpIHtcclxuICAgIGNhc2UgJ2JsdWUnOlxyXG4gICAgY2FzZSAncmVkJzpcclxuICAgIGNhc2UgJ3llbGxvdyc6XHJcbiAgICBjYXNlICdncmVlbic6XHJcbiAgICAgIGljb25Db2xvciA9IGNvbG9yO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGljb25Db2xvciA9ICdibHVlJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XHJcbiAgICAgIHNyYzogJy4vYXNzZXRzL2lnbzIvZ2VvL2ljb25zL3BsYWNlXycgKyBpY29uQ29sb3IgKyAnXzM2cHguc3ZnJyxcclxuICAgICAgaW1nU2l6ZTogWzM2LCAzNl0sIC8vIGZvciBpZVxyXG4gICAgICBhbmNob3I6IFswLjUsIDFdXHJcbiAgICB9KSxcclxuICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICBmb250OiAnMTJweCBDYWxpYnJpLHNhbnMtc2VyaWYnLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHsgY29sb3I6ICcjMDAwJyB9KSxcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcclxuICAgICAgb3ZlcmZsb3c6IHRydWVcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlclN0eWxlKFxyXG4gIHN0cm9rZVJHQkE6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdID0gWzAsIDE2MSwgMjIyLCAxXSxcclxuICBzdHJva2VXaWR0aDogbnVtYmVyID0gMixcclxuICBmaWxsUkdCQTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSBbMCwgMTYxLCAyMjIsIDAuMTVdLFxyXG4gIGJ1ZmZlclJhZGl1cz9cclxuKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3Qgc3Ryb2tlID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgIHdpZHRoOiBzdHJva2VXaWR0aCxcclxuICAgIGNvbG9yOiBzdHJva2VSR0JBXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZpbGwgPSBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgY29sb3I6IGZpbGxSR0JBXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBzdHJva2UsXHJcbiAgICBmaWxsLFxyXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgIHJhZGl1czogNSxcclxuICAgICAgc3Ryb2tlLFxyXG4gICAgICBmaWxsXHJcbiAgICB9KSxcclxuICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICBmb250OiAnMTJweCBDYWxpYnJpLHNhbnMtc2VyaWYnLFxyXG4gICAgICB0ZXh0OiBidWZmZXJSYWRpdXMsXHJcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnI2ZmZicsIHdpZHRoOiAzIH0pLFxyXG4gICAgICBvdmVyZmxvdzogdHJ1ZVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG4iXX0=