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
    const overlayDataSource = new FeatureDataSource();
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
    const defaultStyle = createOverlayDefaultStyle();
    /** @type {?} */
    const markerStyle = createOverlayMarkerStyle();
    /** @type {?} */
    let style;
    return (/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature) => {
        if (olFeature.getId() === 'bufferFeature') {
            style = createBufferStyle(olFeature.get('bufferStroke'), 2, olFeature.get('bufferFill'), olFeature.get('bufferText'));
            return style;
        }
        else {
            /** @type {?} */
            const geometryType = olFeature.getGeometry().getType();
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
    const stroke = new olstyle.Stroke({
        width: 2,
        color: [0, 161, 222, 1]
    });
    /** @type {?} */
    const fill = new olstyle.Stroke({
        color: [0, 161, 222, 0.15]
    });
    return new olstyle.Style({
        stroke,
        fill,
        image: new olstyle.Circle({
            radius: 5,
            stroke,
            fill
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
export function createOverlayMarkerStyle(color = 'blue') {
    /** @type {?} */
    let iconColor;
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
function createBufferStyle(strokeRGBA = [0, 161, 222, 1], strokeWidth = 2, fillRGBA = [0, 161, 222, 0.15], bufferRadius) {
    /** @type {?} */
    const stroke = new olstyle.Stroke({
        width: strokeWidth,
        color: strokeRGBA
    });
    /** @type {?} */
    const fill = new olstyle.Stroke({
        color: fillRGBA
    });
    return new olstyle.Style({
        stroke,
        fill,
        image: new olstyle.Circle({
            radius: 5,
            stroke,
            fill
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUdwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7OztBQU0xQyxNQUFNLFVBQVUsa0JBQWtCOztVQUMxQixpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFO0lBQ2pELE9BQU8sSUFBSSxXQUFXLENBQUM7UUFDckIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtLQUNqQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFPRCxTQUFTLHVCQUF1Qjs7VUFDeEIsWUFBWSxHQUFHLHlCQUF5QixFQUFFOztVQUMxQyxXQUFXLEdBQUcsd0JBQXdCLEVBQUU7O1FBQzFDLEtBQUs7SUFFVDs7OztJQUFPLENBQUMsU0FBb0IsRUFBRSxFQUFFO1FBQzlCLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLGVBQWUsRUFBRTtZQUN6QyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEgsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNOztrQkFDQyxZQUFZLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUN0RCxLQUFLLEdBQUcsWUFBWSxL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QUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxXQUFXO1FBQ2xCLEtBQUssRUFBRSxVQUFVO0tBQ2xCLENBQUM7O1VBRUksSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixLQUFLLEVBQUUsUUFBUTtLQUNoQixDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDdkIsTUFBTTtRQUNOLElBQUk7UUFDSixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTTtZQUNOLElBQUk7U0FDTCxDQUFDO1FBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDekMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3ZELFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBvdmVybGF5IGxheWVyIGFuZCBpdCdzIHNvdXJjZVxyXG4gKiBAcmV0dXJucyBPdmVybGF5IGxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3ZlcmxheUxheWVyKCk6IFZlY3RvckxheWVyIHtcclxuICBjb25zdCBvdmVybGF5RGF0YVNvdXJjZSA9IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpO1xyXG4gIHJldHVybiBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgdGl0bGU6ICdPdmVybGF5JyxcclxuICAgIHpJbmRleDogMzAwLFxyXG4gICAgc291cmNlOiBvdmVybGF5RGF0YVNvdXJjZSxcclxuICAgIHN0eWxlOiBjcmVhdGVPdmVybGF5TGF5ZXJTdHlsZSgpXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gb3ZlcmxheSBzdHlsZSB3aXRoIG1hcmtlcnMgZm9yIHBvaW50cyBhbmQgYSBiYXNpYyBzdHJva2UvZmlsbFxyXG4gKiBjb21iaW5hdGlvbiBmb3IgbGluZXMgYW5kIHBvbHlnb25zXHJcbiAqIEByZXR1cm5zIFN0eWxlIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVPdmVybGF5TGF5ZXJTdHlsZSgpOiAob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IG9sc3R5bGUuU3R5bGUge1xyXG4gIGNvbnN0IGRlZmF1bHRTdHlsZSA9IGNyZWF0ZU92ZXJsYXlEZWZhdWx0U3R5bGUoKTtcclxuICBjb25zdCBtYXJrZXJTdHlsZSA9IGNyZWF0ZU92ZXJsYXlNYXJrZXJTdHlsZSgpO1xyXG4gIGxldCBzdHlsZTtcclxuXHJcbiAgcmV0dXJuIChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgaWYgKG9sRmVhdHVyZS5nZXRJZCgpID09PSAnYnVmZmVyRmVhdHVyZScpIHtcclxuICAgICAgc3R5bGUgPSBjcmVhdGVCdWZmZXJTdHlsZShvbEZlYXR1cmUuZ2V0KCdidWZmZXJTdHJva2UnKSwgMiwgb2xGZWF0dXJlLmdldCgnYnVmZmVyRmlsbCcpLCBvbEZlYXR1cmUuZ2V0KCdidWZmZXJUZXh0JykpO1xyXG4gICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBnZW9tZXRyeVR5cGUgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCk7XHJcbiAgICAgIHN0eWxlID0gZ2VvbWV0cnlUeXBlID09PSAnUG9pbnQnID8gbWFya2VyU3R5bGUgOiBkZWZhdWx0U3R5bGU7XHJcbiAgICAgIHN0eWxlLmdldFRleHQoKS5zZXRUZXh0KG9sRmVhdHVyZS5nZXQoJ19tYXBUaXRsZScpKTtcclxuICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBiYXNpYyBzdHlsZSBmb3IgbGluZXMgYW5kIHBvbHlnb25zXHJcbiAqIEByZXR1cm5zIFN0eWxlXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVPdmVybGF5RGVmYXVsdFN0eWxlKCk6IG9sc3R5bGUuU3R5bGUge1xyXG4gIGNvbnN0IHN0cm9rZSA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICB3aWR0aDogMixcclxuICAgIGNvbG9yOiBbMCwgMTYxLCAyMjIsIDFdXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZpbGwgPSBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgY29sb3I6IFswLCAxNjEsIDIyMiwgMC4xNV1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgIHN0cm9rZSxcclxuICAgIGZpbGwsXHJcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICBzdHJva2UsXHJcbiAgICAgIGZpbGxcclxuICAgIH0pLFxyXG4gICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgIGZvbnQ6ICcxMnB4IENhbGlicmksc2Fucy1zZXJpZicsXHJcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnI2ZmZicsIHdpZHRoOiAzIH0pLFxyXG4gICAgICBvdmVyZmxvdzogdHJ1ZVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG1hcmtlciBzdHlsZSBmb3IgcG9pbnRzXHJcbiAqIEByZXR1cm5zIFN0eWxlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKGNvbG9yID0gJ2JsdWUnKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgbGV0IGljb25Db2xvcjtcclxuICBzd2l0Y2ggKGNvbG9yKSB7XHJcbiAgICBjYXNlICdibHVlJzpcclxuICAgIGNhc2UgJ3JlZCc6XHJcbiAgICBjYXNlICd5ZWxsb3cnOlxyXG4gICAgY2FzZSAnZ3JlZW4nOlxyXG4gICAgICBpY29uQ29sb3IgPSBjb2xvcjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpY29uQ29sb3IgPSAnYmx1ZSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pZ28yL2dlby9pY29ucy9wbGFjZV8nICsgaWNvbkNvbG9yICsgJ18zNnB4LnN2ZycsXHJcbiAgICAgIGltZ1NpemU6IFszNiwgMzZdLCAvLyBmb3IgaWVcclxuICAgICAgYW5jaG9yOiBbMC41LCAxXVxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAnIzAwMCcgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSksXHJcbiAgICAgIG92ZXJmbG93OiB0cnVlXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXJTdHlsZShcclxuICBzdHJva2VSR0JBOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IFswLCAxNjEsIDIyMiwgMV0sXHJcbiAgc3Ryb2tlV2lkdGg6IG51bWJlciA9IDIsXHJcbiAgZmlsbFJHQkE6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdID0gWzAsIDE2MSwgMjIyLCAwLjE1XSxcclxuICBidWZmZXJSYWRpdXM/XHJcbik6IG9sc3R5bGUuU3R5bGUge1xyXG4gIGNvbnN0IHN0cm9rZSA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICB3aWR0aDogc3Ryb2tlV2lkdGgsXHJcbiAgICBjb2xvcjogc3Ryb2tlUkdCQVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmaWxsID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgIGNvbG9yOiBmaWxsUkdCQVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgc3Ryb2tlLFxyXG4gICAgZmlsbCxcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICByYWRpdXM6IDUsXHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbFxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgdGV4dDogYnVmZmVyUmFkaXVzLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHsgY29sb3I6ICcjMDAwJyB9KSxcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcclxuICAgICAgb3ZlcmZsb3c6IHRydWVcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuIl19