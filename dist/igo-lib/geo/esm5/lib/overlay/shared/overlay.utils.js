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
    var bufferStyle = createBufferStyle();
    /** @type {?} */
    var style;
    return (/**
     * @param {?} olFeature
     * @return {?}
     */
    function (olFeature) {
        console.log(olFeature.getId());
        if (olFeature.getId() === 'bufferFeature') {
            style = createBufferStyle(olFeature.get('bufferStroke'), 2, olFeature.get('bufferFill'), olFeature.get('bufferText'));
            console.log(style);
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
 * @param {?=} text
 * @return {?}
 */
function createBufferStyle(strokeRGBA, strokeWidth, fillRGBA, text) {
    if (strokeRGBA === void 0) { strokeRGBA = [0, 161, 222, 1]; }
    if (strokeWidth === void 0) { strokeWidth = 2; }
    if (fillRGBA === void 0) { fillRGBA = [0, 161, 222, 0.15]; }
    /** @type {?} */
    var stroke = new olstyle.Stroke({
        color: strokeRGBA,
        width: strokeWidth
    });
    /** @type {?} */
    var fill = new olstyle.Fill({
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
            text: text,
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 })
        })
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUdwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7OztBQU0xQyxNQUFNLFVBQVUsa0JBQWtCOztRQUMxQixpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFO0lBQ2pELE9BQU8sSUFBSSxXQUFXLENBQUM7UUFDckIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtLQUNqQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFPRCxTQUFTLHVCQUF1Qjs7UUFDeEIsWUFBWSxHQUFHLHlCQUF5QixFQUFFOztRQUMxQyxXQUFXLEdBQUcsd0JBQXdCLEVBQUU7O1FBQ3hDLFdBQVcsR0FBRyxpQkFBaUIsRUFBRTs7UUFDbkMsS0FBSztJQUVUOzs7O0lBQU8sVUFBQyxTQUFvQjtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLGVBQWUsRUFBRTtZQUN6QyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFL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QUNoRSxJQUFLO0lBSEwsMkJBQUEsRUFBQSxjQUFnRCxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDL0QsNEJBQUEsRUFBQSxlQUF1QjtJQUN2Qix5QkFBQSxFQUFBLFlBQThDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQzs7UUFHMUQsTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxLQUFLLEVBQUUsVUFBVTtRQUNqQixLQUFLLEVBQUUsV0FBVztLQUNuQixDQUFDOztRQUVJLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDNUIsS0FBSyxFQUFFLFFBQVE7S0FDaEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7UUFDRixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUN4RCxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIG92ZXJsYXkgbGF5ZXIgYW5kIGl0J3Mgc291cmNlXHJcbiAqIEByZXR1cm5zIE92ZXJsYXkgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TGF5ZXIoKTogVmVjdG9yTGF5ZXIge1xyXG4gIGNvbnN0IG92ZXJsYXlEYXRhU291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKCk7XHJcbiAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogJ092ZXJsYXknLFxyXG4gICAgekluZGV4OiAzMDAsXHJcbiAgICBzb3VyY2U6IG92ZXJsYXlEYXRhU291cmNlLFxyXG4gICAgc3R5bGU6IGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKClcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBvdmVybGF5IHN0eWxlIHdpdGggbWFya2VycyBmb3IgcG9pbnRzIGFuZCBhIGJhc2ljIHN0cm9rZS9maWxsXHJcbiAqIGNvbWJpbmF0aW9uIGZvciBsaW5lcyBhbmQgcG9seWdvbnNcclxuICogQHJldHVybnMgU3R5bGUgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKCk6IChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3QgZGVmYXVsdFN0eWxlID0gY3JlYXRlT3ZlcmxheURlZmF1bHRTdHlsZSgpO1xyXG4gIGNvbnN0IG1hcmtlclN0eWxlID0gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKCk7XHJcbiAgY29uc3QgYnVmZmVyU3R5bGUgPSBjcmVhdGVCdWZmZXJTdHlsZSgpO1xyXG4gIGxldCBzdHlsZTtcclxuXHJcbiAgcmV0dXJuIChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2cob2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgaWYgKG9sRmVhdHVyZS5nZXRJZCgpID09PSAnYnVmZmVyRmVhdHVyZScpIHtcclxuICAgICAgc3R5bGUgPSBjcmVhdGVCdWZmZXJTdHlsZShvbEZlYXR1cmUuZ2V0KCdidWZmZXJTdHJva2UnKSwgMiwgb2xGZWF0dXJlLmdldCgnYnVmZmVyRmlsbCcpLCBvbEZlYXR1cmUuZ2V0KCdidWZmZXJUZXh0JykpO1xyXG4gICAgICBjb25zb2xlLmxvZyhzdHlsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBnZW9tZXRyeVR5cGUgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCk7XHJcbiAgICAgIHN0eWxlID0gZ2VvbWV0cnlUeXBlID09PSAnUG9pbnQnID8gbWFya2VyU3R5bGUgOiBkZWZhdWx0U3R5bGU7XHJcbiAgICAgIHN0eWxlLmdldFRleHQoKS5zZXRUZXh0KG9sRmVhdHVyZS5nZXQoJ19tYXBUaXRsZScpKTtcclxuICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBiYXNpYyBzdHlsZSBmb3IgbGluZXMgYW5kIHBvbHlnb25zXHJcbiAqIEByZXR1cm5zIFN0eWxlXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVPdmVybGF5RGVmYXVsdFN0eWxlKCk6IG9sc3R5bGUuU3R5bGUge1xyXG4gIGNvbnN0IHN0cm9rZSA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICB3aWR0aDogMixcclxuICAgIGNvbG9yOiBbMCwgMTYxLCAyMjIsIDFdXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZpbGwgPSBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgY29sb3I6IFswLCAxNjEsIDIyMiwgMC4xNV1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgIHN0cm9rZSxcclxuICAgIGZpbGwsXHJcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICBzdHJva2UsXHJcbiAgICAgIGZpbGxcclxuICAgIH0pLFxyXG4gICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgIGZvbnQ6ICcxMnB4IENhbGlicmksc2Fucy1zZXJpZicsXHJcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnI2ZmZicsIHdpZHRoOiAzIH0pLFxyXG4gICAgICBvdmVyZmxvdzogdHJ1ZVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG1hcmtlciBzdHlsZSBmb3IgcG9pbnRzXHJcbiAqIEByZXR1cm5zIFN0eWxlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKGNvbG9yID0gJ2JsdWUnKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgbGV0IGljb25Db2xvcjtcclxuICBzd2l0Y2ggKGNvbG9yKSB7XHJcbiAgICBjYXNlICdibHVlJzpcclxuICAgIGNhc2UgJ3JlZCc6XHJcbiAgICBjYXNlICd5ZWxsb3cnOlxyXG4gICAgY2FzZSAnZ3JlZW4nOlxyXG4gICAgICBpY29uQ29sb3IgPSBjb2xvcjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpY29uQ29sb3IgPSAnYmx1ZSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pZ28yL2dlby9pY29ucy9wbGFjZV8nICsgaWNvbkNvbG9yICsgJ18zNnB4LnN2ZycsXHJcbiAgICAgIGltZ1NpemU6IFszNiwgMzZdLCAvLyBmb3IgaWVcclxuICAgICAgYW5jaG9yOiBbMC41LCAxXVxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAnIzAwMCcgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSksXHJcbiAgICAgIG92ZXJmbG93OiB0cnVlXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXJTdHlsZShcclxuICBzdHJva2VSR0JBOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IFswLCAxNjEsIDIyMiwgMV0sXHJcbiAgc3Ryb2tlV2lkdGg6IG51bWJlciA9IDIsXHJcbiAgZmlsbFJHQkE6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdID0gWzAsIDE2MSwgMjIyLCAwLjE1XSxcclxuICB0ZXh0P1xyXG4pOiBvbHN0eWxlLlN0eWxlIHtcclxuICBjb25zdCBzdHJva2UgPSBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgY29sb3I6IHN0cm9rZVJHQkEsXHJcbiAgICB3aWR0aDogc3Ryb2tlV2lkdGhcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmlsbCA9IG5ldyBvbHN0eWxlLkZpbGwoe1xyXG4gICAgY29sb3I6IGZpbGxSR0JBXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBzdHJva2U6IHN0cm9rZSxcclxuICAgIGZpbGw6IGZpbGwsXHJcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICBzdHJva2U6IHN0cm9rZSxcclxuICAgICAgZmlsbDogZmlsbFxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAnIzAwMCcgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSlcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuIl19