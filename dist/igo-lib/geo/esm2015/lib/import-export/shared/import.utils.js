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
    const olFeatures = features.map((/**
     * @param {?} feature
     * @return {?}
     */
    (feature) => featureToOl(feature, map.projection)));
    /** @type {?} */
    const r = Math.floor(Math.random() * 255);
    /** @type {?} */
    const g = Math.floor(Math.random() * 255);
    /** @type {?} */
    const b = Math.floor(Math.random() * 255);
    /** @type {?} */
    const stroke = new olStyle.Stroke({
        color: [r, g, b, 1],
        width: 2
    });
    /** @type {?} */
    const fill = new olStyle.Fill({
        color: [r, g, b, 0.4]
    });
    /** @type {?} */
    const sourceOptions = {
        queryable: true
    };
    /** @type {?} */
    const source = new FeatureDataSource(sourceOptions);
    source.ol.addFeatures(olFeatures);
    /** @type {?} */
    const layer = new VectorLayer({
        title: layerTitle,
        source,
        style: new olStyle.Style({
            stroke,
            fill,
            image: new olStyle.Circle({
                radius: 5,
                stroke,
                fill
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
    const layerTitle = computeLayerTitleFromFile(file);
    addLayerAndFeaturesToMap(features, map, layerTitle);
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const messageTitle = translate.instant('igo.geo.dropGeoFile.success.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.success.text', {
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
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.dropGeoFile.invalid.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.invalid.text', {
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
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.dropGeoFile.empty.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.empty.text', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2ltcG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFJcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7OztBQUlyRSxNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBbUIsRUFBRSxHQUFXLEVBQUUsVUFBa0I7O1VBQ3JGLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUM7O1VBRXJGLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7O1VBQ25DLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7O1VBQ25DLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7O1VBQ25DLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDaEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLEtBQUssRUFBRSxDQUFDO0tBQ1QsQ0FBQzs7VUFFSSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzVCLEtB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Q0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbEQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsSUFBVTtJQUNsRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBmZWF0dXJlVG9PbCwgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5pbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllckFuZEZlYXR1cmVzVG9NYXAoZmVhdHVyZXM6IEZlYXR1cmVbXSwgbWFwOiBJZ29NYXAsIGxheWVyVGl0bGU6IHN0cmluZyk6IFZlY3RvckxheWVyIHtcclxuICBjb25zdCBvbEZlYXR1cmVzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlKSA9PiBmZWF0dXJlVG9PbChmZWF0dXJlLCBtYXAucHJvamVjdGlvbikpO1xyXG5cclxuICBjb25zdCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBiID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBzdHJva2UgPSBuZXcgb2xTdHlsZS5TdHJva2Uoe1xyXG4gICAgY29sb3I6IFtyLCBnLCBiLCAxXSxcclxuICAgIHdpZHRoOiAyXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZpbGwgPSBuZXcgb2xTdHlsZS5GaWxsKHtcclxuICAgIGNvbG9yOiBbciwgZywgYiwgMC40XVxyXG4gIH0pO1xyXG4gIGNvbnN0IHNvdXJjZU9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyAmIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgcXVlcnlhYmxlOiB0cnVlXHJcbiAgfTtcclxuICBjb25zdCBzb3VyY2UgPSBuZXcgRmVhdHVyZURhdGFTb3VyY2Uoc291cmNlT3B0aW9ucyk7XHJcbiAgc291cmNlLm9sLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gIGNvbnN0IGxheWVyID0gbmV3IFZlY3RvckxheWVyKHtcclxuICAgIHRpdGxlOiBsYXllclRpdGxlLFxyXG4gICAgc291cmNlLFxyXG4gICAgc3R5bGU6IG5ldyBvbFN0eWxlLlN0eWxlKHtcclxuICAgICAgc3Ryb2tlLFxyXG4gICAgICBmaWxsLFxyXG4gICAgICBpbWFnZTogbmV3IG9sU3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICByYWRpdXM6IDUsXHJcbiAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgIGZpbGxcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKGxheWVyKTtcclxuICBtb3ZlVG9PbEZlYXR1cmVzKG1hcCwgb2xGZWF0dXJlcyk7XHJcblxyXG4gIHJldHVybiBsYXllcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgZmVhdHVyZXM6IEZlYXR1cmVbXSxcclxuICBtYXA6IElnb01hcCxcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgdGhpcy5oYW5kbGVOb3RoaW5nVG9JbXBvcnRFcnJvcihmaWxlLCBtZXNzYWdlU2VydmljZSwgbGFuZ3VhZ2VTZXJ2aWNlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxheWVyVGl0bGUgPSBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGUpO1xyXG4gIGFkZExheWVyQW5kRmVhdHVyZXNUb01hcChmZWF0dXJlcywgbWFwLCBsYXllclRpdGxlKTtcclxuXHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCBtZXNzYWdlVGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5zdWNjZXNzLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnN1Y2Nlc3MudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGxheWVyVGl0bGVcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIG1lc3NhZ2VUaXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmludmFsaWQudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgbWltZVR5cGU6IGZpbGUudHlwZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU5vdGhpbmdUb0ltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5lbXB0eS50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5lbXB0eS50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lLFxyXG4gICAgICBtaW1lVHlwZTogZmlsZS50eXBlXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZUV4dGVuc2lvbihmaWxlOiBGaWxlKTogc3RyaW5nIHtcclxuICByZXR1cm4gZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUoZmlsZTogRmlsZSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGZpbGUubmFtZS5zdWJzdHIoMCwgZmlsZS5uYW1lLmxhc3RJbmRleE9mKCcuJykpO1xyXG59XHJcbiJdfQ==