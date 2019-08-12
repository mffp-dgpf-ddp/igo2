/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olStyle from 'ol/style';
import { FeatureDataSource } from '../../datasource/shared/datasources/feature-datasource';
import { featureToOl, moveToOlFeatures } from '../../feature/shared/feature.utils';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
/**
 * @param {?} features
 * @param {?} map
 * @param {?} layerTitle
 * @return {?}
 */
export function addLayerAndFeaturesToMap(features, map, layerTitle) {
    /** @type {?} */
    var olFeatures = features.map((/**
     * @param {?} feature
     * @return {?}
     */
    function (feature) { return featureToOl(feature, map.projection); }));
    /** @type {?} */
    var r = Math.floor(Math.random() * 255);
    /** @type {?} */
    var g = Math.floor(Math.random() * 255);
    /** @type {?} */
    var b = Math.floor(Math.random() * 255);
    /** @type {?} */
    var stroke = new olStyle.Stroke({
        color: [r, g, b, 1],
        width: 2
    });
    /** @type {?} */
    var fill = new olStyle.Fill({
        color: [r, g, b, 0.4]
    });
    /** @type {?} */
    var sourceOptions = {
        queryable: true
    };
    /** @type {?} */
    var source = new FeatureDataSource(sourceOptions);
    source.ol.addFeatures(olFeatures);
    /** @type {?} */
    var layer = new VectorLayer({
        title: layerTitle,
        source: source,
        style: new olStyle.Style({
            stroke: stroke,
            fill: fill,
            image: new olStyle.Circle({
                radius: 5,
                stroke: stroke,
                fill: fill
            })
        })
    });
    map.addLayer(layer);
    moveToOlFeatures(map, olFeatures);
    return layer;
}
/**
 * @param {?} file
 * @param {?} features
 * @param {?} map
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleFileImportSuccess(file, features, map, messageService, languageService) {
    if (features.length === 0) {
        this.handleNothingToImportError(file, messageService, languageService);
        return;
    }
    /** @type {?} */
    var layerTitle = computeLayerTitleFromFile(file);
    addLayerAndFeaturesToMap(features, map, layerTitle);
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var messageTitle = translate.instant('igo.geo.dropGeoFile.success.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.dropGeoFile.success.text', {
        value: layerTitle
    });
    messageService.success(message, messageTitle);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleFileImportError(file, error, messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.dropGeoFile.invalid.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.dropGeoFile.invalid.text', {
        value: file.name,
        mimeType: file.type
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleNothingToImportError(file, messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.dropGeoFile.empty.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.dropGeoFile.empty.text', {
        value: file.name,
        mimeType: file.type
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @return {?}
 */
export function getFileExtension(file) {
    return file.name.split('.').pop().toLowerCase();
}
/**
 * @param {?} file
 * @return {?}
 */
export function computeLayerTitleFromFile(file) {
    return file.name.substr(0, file.name.lastIndexOf('.'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2ltcG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFJcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7OztBQUlyRSxNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBbUIsRUFBRSxHQUFXLEVBQUUsVUFBa0I7O1FBQ3JGLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLFVBQUMsT0FBZ0IsSUFBSyxPQUFBLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFwQyxDQUFvQyxFQUFDOztRQUVyRixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixLQUFLLEVBQUUsQ0FBQztLQUNULENBQUM7O1FBRUksSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztRQUM1QixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7S0FDdEIsQ0FBQzs7UUFDSSxhQUFhLEdBQTBEO1FBQzNFLFNBQVMsRUFBRSxJQUFJO0tBQ2hCOztRQUNLLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztJQUNuRCxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFDNUIsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDO1FBQzVCLEtBQUssRUFBRSxVQUFVO1FBQ2pCLE1BQU0sUUFBQTtRQUNOLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdkIsTUFBTSxRQUFBO1lBQ04sSUFBSSxNQUFBO1lBQ0osS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxRQUFBO2dCQUNOLElBQUksTUFBQTthQUNMLENBQUM7U0FDSCxDQUFDO0tBQ0gsQ0FBQztJQUNGLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRWxDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQzs7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLHVCQUF1QixDQUNyQyxJQUFVLEVBQ1YsUUFBbUIsRUFDbkIsR0FBVyxFQUNYLGNBQThCLEVBQzlCLGVBQWdDO0lBRWhDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDekIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDdkUsT0FBTztLQUNSOztRQUVLLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7SUFDbEQsd0JBQXdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzs7UUFFOUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTOztRQUNyQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQzs7UUFDckUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEVBQUU7UUFDbEUsS0FBSyxFQUFFLFVBQVU7S0FDcEIsQ0FBQztJQUNGLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2hELENBQUM7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxJQUFVLEVBQ1YsS0FBWSxFQUNaLGNBQThCLEVBQzlCLGVBQWdDOztRQUUxQixTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVM7O1FBQ3JDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDOztRQUM5RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRTtRQUNsRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7UUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO0tBQ3RCLENBQUM7SUFDRixjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUN4QyxJQUFVLEVBQ1YsY0FBOEIsRUFDOUIsZUFBZ0M7O1FBRTFCLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUM7O1FBQzVELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFO1FBQ2hFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDdEIsQ0FBQztJQUNGLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQVU7SUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNsRCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxJQUFVO0lBQ2xELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGZlYXR1cmVUb09sLCBtb3ZlVG9PbEZlYXR1cmVzIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExheWVyQW5kRmVhdHVyZXNUb01hcChmZWF0dXJlczogRmVhdHVyZVtdLCBtYXA6IElnb01hcCwgbGF5ZXJUaXRsZTogc3RyaW5nKTogVmVjdG9yTGF5ZXIge1xyXG4gIGNvbnN0IG9sRmVhdHVyZXMgPSBmZWF0dXJlcy5tYXAoKGZlYXR1cmU6IEZlYXR1cmUpID0+IGZlYXR1cmVUb09sKGZlYXR1cmUsIG1hcC5wcm9qZWN0aW9uKSk7XHJcblxyXG4gIGNvbnN0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gIGNvbnN0IGcgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gIGNvbnN0IGIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gIGNvbnN0IHN0cm9rZSA9IG5ldyBvbFN0eWxlLlN0cm9rZSh7XHJcbiAgICBjb2xvcjogW3IsIGcsIGIsIDFdLFxyXG4gICAgd2lkdGg6IDJcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmlsbCA9IG5ldyBvbFN0eWxlLkZpbGwoe1xyXG4gICAgY29sb3I6IFtyLCBnLCBiLCAwLjRdXHJcbiAgfSk7XHJcbiAgY29uc3Qgc291cmNlT3B0aW9uczogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zICYgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICBxdWVyeWFibGU6IHRydWVcclxuICB9O1xyXG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBGZWF0dXJlRGF0YVNvdXJjZShzb3VyY2VPcHRpb25zKTtcclxuICBzb3VyY2Uub2wuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgdGl0bGU6IGxheWVyVGl0bGUsXHJcbiAgICBzb3VyY2UsXHJcbiAgICBzdHlsZTogbmV3IG9sU3R5bGUuU3R5bGUoe1xyXG4gICAgICBzdHJva2UsXHJcbiAgICAgIGZpbGwsXHJcbiAgICAgIGltYWdlOiBuZXcgb2xTdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgIHJhZGl1czogNSxcclxuICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgZmlsbFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KTtcclxuICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG4gIG1vdmVUb09sRmVhdHVyZXMobWFwLCBvbEZlYXR1cmVzKTtcclxuXHJcbiAgcmV0dXJuIGxheWVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoXHJcbiAgZmlsZTogRmlsZSxcclxuICBmZWF0dXJlczogRmVhdHVyZVtdLFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICB0aGlzLmhhbmRsZU5vdGhpbmdUb0ltcG9ydEVycm9yKGZpbGUsIG1lc3NhZ2VTZXJ2aWNlLCBsYW5ndWFnZVNlcnZpY2UpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGF5ZXJUaXRsZSA9IGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUoZmlsZSk7XHJcbiAgYWRkTGF5ZXJBbmRGZWF0dXJlc1RvTWFwKGZlYXR1cmVzLCBtYXAsIGxheWVyVGl0bGUpO1xyXG5cclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IG1lc3NhZ2VUaXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnN1Y2Nlc3MudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuc3VjY2Vzcy50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogbGF5ZXJUaXRsZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgbWVzc2FnZVRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmludmFsaWQudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuaW52YWxpZC50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lLFxyXG4gICAgICBtaW1lVHlwZTogZmlsZS50eXBlXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTm90aGluZ1RvSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmVtcHR5LnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmVtcHR5LnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWUsXHJcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGVcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlRXh0ZW5zaW9uKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xyXG4gIHJldHVybiBmaWxlLm5hbWUuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZShmaWxlOiBGaWxlKTogc3RyaW5nIHtcclxuICByZXR1cm4gZmlsZS5uYW1lLnN1YnN0cigwLCBmaWxlLm5hbWUubGFzdEluZGV4T2YoJy4nKSk7XHJcbn1cclxuIl19