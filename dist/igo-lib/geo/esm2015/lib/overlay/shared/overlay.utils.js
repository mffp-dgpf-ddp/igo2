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
    return (/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature) => {
        /** @type {?} */
        const geometryType = olFeature.getGeometry().getType();
        /** @type {?} */
        const style = geometryType === 'Point' ? markerStyle : defaultStyle;
        style.getText().setText(olFeature.get('_mapTitle'));
        return style;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUdwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7OztBQU0xQyxNQUFNLFVBQVUsa0JBQWtCOztVQUMxQixpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFO0lBQ2pELE9BQU8sSUFBSSxXQUFXLENBQUM7UUFDckIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtLQUNqQyxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFPRCxTQUFTLHVCQUF1Qjs7VUFDeEIsWUFBWSxHQUFHLHlCQUF5QixFQUFFOztVQUMxQyxXQUFXLEdBQUcsd0JBQXdCLEVBQUU7SUFFOUM7Ozs7SUFBTyxDQUFDLFNBQW9CLEVBQUUsRUFBRTs7Y0FDeEIsWUFBWSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O2NBQ2hELEtBQUssR0FBRyxZQUFZLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVk7UUFDbkUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLEVBQUM7QUFDSixDQUFDOzs7OztBQU1ELFNBQVMseUJBQXlCOztVQUMxQixNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3hCLENBQUM7O1VBRUksSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDM0IsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE1BQU07UUFDTixJQUFJO1FBQ0osS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUN4QixNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU07WUFDTixJQUFJO1NBQ0wsQ0FBQztRQUNGLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2RCxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFNRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsS0FBSyxHQUFHLE1BQU07O1FBQ2pELFNBQVM7SUFDYixRQUFRLEtBQUssRUFBRTtRQUNiLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssT0FBTztZQUNWLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDbEIsTUFBTTtRQUNSO1lBQ0UsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUNuQixNQUFNO0tBQ1Q7SUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN2QixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxnQ0FBZ0MsR0FBRyxTQUFTLEdBQUcsV0FBVztZQUMvRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOztZQUNqQixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCLENBQUM7UUFDRixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN6QyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdkQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIG92ZXJsYXkgbGF5ZXIgYW5kIGl0J3Mgc291cmNlXHJcbiAqIEByZXR1cm5zIE92ZXJsYXkgbGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TGF5ZXIoKTogVmVjdG9yTGF5ZXIge1xyXG4gIGNvbnN0IG92ZXJsYXlEYXRhU291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKCk7XHJcbiAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogJ092ZXJsYXknLFxyXG4gICAgekluZGV4OiAzMDAsXHJcbiAgICBzb3VyY2U6IG92ZXJsYXlEYXRhU291cmNlLFxyXG4gICAgc3R5bGU6IGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKClcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBvdmVybGF5IHN0eWxlIHdpdGggbWFya2VycyBmb3IgcG9pbnRzIGFuZCBhIGJhc2ljIHN0cm9rZS9maWxsXHJcbiAqIGNvbWJpbmF0aW9uIGZvciBsaW5lcyBhbmQgcG9seWdvbnNcclxuICogQHJldHVybnMgU3R5bGUgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlMYXllclN0eWxlKCk6IChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4gb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3QgZGVmYXVsdFN0eWxlID0gY3JlYXRlT3ZlcmxheURlZmF1bHRTdHlsZSgpO1xyXG4gIGNvbnN0IG1hcmtlclN0eWxlID0gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKCk7XHJcblxyXG4gIHJldHVybiAob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIGNvbnN0IGdlb21ldHJ5VHlwZSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldFR5cGUoKTtcclxuICAgIGNvbnN0IHN0eWxlID0gZ2VvbWV0cnlUeXBlID09PSAnUG9pbnQnID8gbWFya2VyU3R5bGUgOiBkZWZhdWx0U3R5bGU7XHJcbiAgICBzdHlsZS5nZXRUZXh0KCkuc2V0VGV4dChvbEZlYXR1cmUuZ2V0KCdfbWFwVGl0bGUnKSk7XHJcbiAgICByZXR1cm4gc3R5bGU7XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGJhc2ljIHN0eWxlIGZvciBsaW5lcyBhbmQgcG9seWdvbnNcclxuICogQHJldHVybnMgU3R5bGVcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlEZWZhdWx0U3R5bGUoKTogb2xzdHlsZS5TdHlsZSB7XHJcbiAgY29uc3Qgc3Ryb2tlID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcclxuICAgIHdpZHRoOiAyLFxyXG4gICAgY29sb3I6IFswLCAxNjEsIDIyMiwgMV1cclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmlsbCA9IG5ldyBvbHN0eWxlLlN0cm9rZSh7XHJcbiAgICBjb2xvcjogWzAsIDE2MSwgMjIyLCAwLjE1XVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgc3Ryb2tlLFxyXG4gICAgZmlsbCxcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICByYWRpdXM6IDUsXHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbFxyXG4gICAgfSksXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcclxuICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7IGNvbG9yOiAnIzAwMCcgfSksXHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjZmZmJywgd2lkdGg6IDMgfSksXHJcbiAgICAgIG92ZXJmbG93OiB0cnVlXHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbWFya2VyIHN0eWxlIGZvciBwb2ludHNcclxuICogQHJldHVybnMgU3R5bGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFya2VyU3R5bGUoY29sb3IgPSAnYmx1ZScpOiBvbHN0eWxlLlN0eWxlIHtcclxuICBsZXQgaWNvbkNvbG9yO1xyXG4gIHN3aXRjaCAoY29sb3IpIHtcclxuICAgIGNhc2UgJ2JsdWUnOlxyXG4gICAgY2FzZSAncmVkJzpcclxuICAgIGNhc2UgJ3llbGxvdyc6XHJcbiAgICBjYXNlICdncmVlbic6XHJcbiAgICAgIGljb25Db2xvciA9IGNvbG9yO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGljb25Db2xvciA9ICdibHVlJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XHJcbiAgICAgIHNyYzogJy4vYXNzZXRzL2lnbzIvZ2VvL2ljb25zL3BsYWNlXycgKyBpY29uQ29sb3IgKyAnXzM2cHguc3ZnJyxcclxuICAgICAgaW1nU2l6ZTogWzM2LCAzNl0sIC8vIGZvciBpZVxyXG4gICAgICBhbmNob3I6IFswLjUsIDFdXHJcbiAgICB9KSxcclxuICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xyXG4gICAgICBmb250OiAnMTJweCBDYWxpYnJpLHNhbnMtc2VyaWYnLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHsgY29sb3I6ICcjMDAwJyB9KSxcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcclxuICAgICAgb3ZlcmZsb3c6IHRydWVcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuIl19