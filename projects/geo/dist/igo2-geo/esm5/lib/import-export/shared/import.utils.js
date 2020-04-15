/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olStyle from 'ol/style';
import { FeatureDataSource } from '../../datasource/shared/datasources/feature-datasource';
import { featureToOl, moveToOlFeatures } from '../../feature/shared/feature.utils';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { ClusterDataSource } from '../../datasource/shared/datasources/cluster-datasource';
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
 * @param {?} features
 * @param {?} map
 * @param {?} layerTitle
 * @param {?} styleListService
 * @param {?} styleService
 * @return {?}
 */
export function addLayerAndFeaturesStyledToMap(features, map, layerTitle, styleListService, styleService) {
    /** @type {?} */
    var olFeatures = features.map((/**
     * @param {?} feature
     * @return {?}
     */
    function (feature) { return featureToOl(feature, map.projection); }));
    /** @type {?} */
    var style;
    /** @type {?} */
    var distance;
    if (styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute')) {
        /** @type {?} */
        var styleByAttribute_1 = styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute');
        style = (/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            return styleService.createStyleByAttribute(feature, styleByAttribute_1);
        });
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
        /** @type {?} */
        var clusterParam_1 = styleListService.getStyleList(layerTitle.toString() + '.clusterParam');
        distance = styleListService.getStyleList(layerTitle.toString() + '.distance');
        /** @type {?} */
        var baseStyle_1 = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.clusterStyle'));
        style = (/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            return styleService.createClusterStyle(feature, clusterParam_1, baseStyle_1);
        });
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.style')) {
        style = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.style'));
    }
    else {
        style = styleService.createStyle(styleListService.getStyleList('default.style'));
    }
    /** @type {?} */
    var source;
    if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
        /** @type {?} */
        var sourceOptions = {
            distance: distance,
            type: 'cluster',
            queryable: true
        };
        source = new ClusterDataSource(sourceOptions);
        source.ol.source.addFeatures(olFeatures);
    }
    else {
        /** @type {?} */
        var sourceOptions = {
            queryable: true
        };
        source = new FeatureDataSource(sourceOptions);
        source.ol.addFeatures(olFeatures);
    }
    /** @type {?} */
    var layer = new VectorLayer({
        title: layerTitle,
        source: source,
        style: style
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
 * @param {?=} styleListService
 * @param {?=} styleService
 * @return {?}
 */
export function handleFileImportSuccess(file, features, map, messageService, languageService, styleListService, styleService) {
    if (features.length === 0) {
        handleNothingToImportError(file, messageService, languageService);
        return;
    }
    /** @type {?} */
    var layerTitle = computeLayerTitleFromFile(file);
    if (!styleListService) {
        addLayerAndFeaturesToMap(features, map, layerTitle);
    }
    else {
        addLayerAndFeaturesStyledToMap(features, map, layerTitle, styleListService, styleService);
    }
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
    var errMapping = {
        'Invalid file': handleInvalidFileImportError,
        'File is too large': handleSizeFileImportError,
        'Failed to read file': handleUnreadbleFileImportError,
        'Invalid SRS definition': handleSRSImportError
    };
    errMapping[error.message](file, error, messageService, languageService);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleInvalidFileImportError(file, error, messageService, languageService) {
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
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleUnreadbleFileImportError(file, error, messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.dropGeoFile.unreadable.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.dropGeoFile.unreadable.text', {
        value: file.name
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleSizeFileImportError(file, error, messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.dropGeoFile.tooLarge.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.dropGeoFile.tooLarge.text', {
        value: file.name
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
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleSRSImportError(file, messageService, languageService) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.dropGeoFile.invalidSRS.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.dropGeoFile.invalidSRS.text', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2ltcG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFJcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQU9yRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQzs7Ozs7OztBQUczRixNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBbUIsRUFBRSxHQUFXLEVBQUUsVUFBa0I7O1FBQ3JGLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLFVBQUMsT0FBZ0IsSUFBSyxPQUFBLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFwQyxDQUFvQyxFQUFDOztRQUVyRixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixLQUFLLEVBQUUsQ0FBQztLQUNULENB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LENBQUMsaUNBQWlDLENBQUM7O1FBQzVELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFO1FBQ2hFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDdEIsQ0FBQztJQUNGLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQ2xDLElBQVUsRUFDVixjQUE4QixFQUM5QixlQUFnQzs7UUFFMUIsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTOztRQUNyQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQzs7UUFDakUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMscUNBQXFDLEVBQUU7UUFDckUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO1FBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtLQUN0QixDQUFDO0lBQ0YsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdkMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBVTtJQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2xELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLElBQVU7SUFDbEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xTdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZmVhdHVyZVRvT2wsIG1vdmVUb09sRmVhdHVyZXMgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3Rvci1sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9zdHlsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R5bGVCeUF0dHJpYnV0ZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC92ZWN0b3Itc3R5bGUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU3R5bGVMaXN0U2VydmljZSB9IGZyb20gJy4uL3N0eWxlLWxpc3Qvc3R5bGUtbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlclBhcmFtIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2NsdXN0ZXJQYXJhbSc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGF5ZXJBbmRGZWF0dXJlc1RvTWFwKGZlYXR1cmVzOiBGZWF0dXJlW10sIG1hcDogSWdvTWFwLCBsYXllclRpdGxlOiBzdHJpbmcpOiBWZWN0b3JMYXllciB7XHJcbiAgY29uc3Qgb2xGZWF0dXJlcyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZTogRmVhdHVyZSkgPT4gZmVhdHVyZVRvT2woZmVhdHVyZSwgbWFwLnByb2plY3Rpb24pKTtcclxuXHJcbiAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgY29uc3QgZyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgY29uc3QgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgY29uc3Qgc3Ryb2tlID0gbmV3IG9sU3R5bGUuU3Ryb2tlKHtcclxuICAgIGNvbG9yOiBbciwgZywgYiwgMV0sXHJcbiAgICB3aWR0aDogMlxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmaWxsID0gbmV3IG9sU3R5bGUuRmlsbCh7XHJcbiAgICBjb2xvcjogW3IsIGcsIGIsIDAuNF1cclxuICB9KTtcclxuICBjb25zdCBzb3VyY2VPcHRpb25zOiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgJiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHtcclxuICAgIHF1ZXJ5YWJsZTogdHJ1ZVxyXG4gIH07XHJcbiAgY29uc3Qgc291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gIHNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICBjb25zdCBsYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogbGF5ZXJUaXRsZSxcclxuICAgIHNvdXJjZSxcclxuICAgIHN0eWxlOiBuZXcgb2xTdHlsZS5TdHlsZSh7XHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbCxcclxuICAgICAgaW1hZ2U6IG5ldyBvbFN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICAgIHN0cm9rZSxcclxuICAgICAgICBmaWxsXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgbW92ZVRvT2xGZWF0dXJlcyhtYXAsIG9sRmVhdHVyZXMpO1xyXG5cclxuICByZXR1cm4gbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllckFuZEZlYXR1cmVzU3R5bGVkVG9NYXAoZmVhdHVyZXM6IEZlYXR1cmVbXSwgbWFwOiBJZ29NYXAsIGxheWVyVGl0bGU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLCBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSk6IFZlY3RvckxheWVyIHtcclxuICBjb25zdCBvbEZlYXR1cmVzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlKSA9PiBmZWF0dXJlVG9PbChmZWF0dXJlLCBtYXAucHJvamVjdGlvbikpO1xyXG4gIGxldCBzdHlsZTtcclxuICBsZXQgZGlzdGFuY2U6IG51bWJlcjtcclxuXHJcbiAgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGVCeUF0dHJpYnV0ZScpKSB7XHJcbiAgICBjb25zdCBzdHlsZUJ5QXR0cmlidXRlOiBTdHlsZUJ5QXR0cmlidXRlID0gc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5zdHlsZUJ5QXR0cmlidXRlJyk7XHJcblxyXG4gICAgc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgcmV0dXJuIHN0eWxlU2VydmljZS5jcmVhdGVTdHlsZUJ5QXR0cmlidXRlKFxyXG4gICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgc3R5bGVCeUF0dHJpYnV0ZVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgfSBlbHNlIGlmIChzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLmNsdXN0ZXJTdHlsZScpKSB7XHJcbiAgICBjb25zdCBjbHVzdGVyUGFyYW06IENsdXN0ZXJQYXJhbSA9IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuY2x1c3RlclBhcmFtJyk7XHJcbiAgICBkaXN0YW5jZSA9IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuZGlzdGFuY2UnKTtcclxuXHJcbiAgICBjb25zdCBiYXNlU3R5bGUgPSBzdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5jbHVzdGVyU3R5bGUnKSk7XHJcblxyXG4gICAgc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgcmV0dXJuIHN0eWxlU2VydmljZS5jcmVhdGVDbHVzdGVyU3R5bGUoXHJcbiAgICAgICAgZmVhdHVyZSxcclxuICAgICAgICBjbHVzdGVyUGFyYW0sXHJcbiAgICAgICAgYmFzZVN0eWxlXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICB9IGVsc2UgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGUnKSkge1xyXG5cclxuICAgIHN0eWxlID0gc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGUnKSk7XHJcblxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgc3R5bGUgPSBzdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoJ2RlZmF1bHQuc3R5bGUnKSk7XHJcblxyXG4gIH1cclxuICBsZXQgc291cmNlO1xyXG5cclxuICBpZiAoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5jbHVzdGVyU3R5bGUnKSkge1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9uczogQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zICYgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgIGRpc3RhbmNlLFxyXG4gICAgICB0eXBlOiAnY2x1c3RlcicsXHJcbiAgICAgIHF1ZXJ5YWJsZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHNvdXJjZSA9IG5ldyBDbHVzdGVyRGF0YVNvdXJjZShzb3VyY2VPcHRpb25zKTtcclxuICAgIHNvdXJjZS5vbC5zb3VyY2UuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyAmIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICBxdWVyeWFibGU6IHRydWVcclxuICAgIH07XHJcbiAgICBzb3VyY2UgPSBuZXcgRmVhdHVyZURhdGFTb3VyY2Uoc291cmNlT3B0aW9ucyk7XHJcbiAgICBzb3VyY2Uub2wuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBsYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogbGF5ZXJUaXRsZSxcclxuICAgIHNvdXJjZSxcclxuICAgIHN0eWxlXHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKGxheWVyKTtcclxuICBtb3ZlVG9PbEZlYXR1cmVzKG1hcCwgb2xGZWF0dXJlcyk7XHJcblxyXG4gIHJldHVybiBsYXllcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgZmVhdHVyZXM6IEZlYXR1cmVbXSxcclxuICBtYXA6IElnb01hcCxcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgc3R5bGVMaXN0U2VydmljZT86IFN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgc3R5bGVTZXJ2aWNlPzogU3R5bGVTZXJ2aWNlXHJcbikge1xyXG4gIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgIGhhbmRsZU5vdGhpbmdUb0ltcG9ydEVycm9yKGZpbGUsIG1lc3NhZ2VTZXJ2aWNlLCBsYW5ndWFnZVNlcnZpY2UpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGF5ZXJUaXRsZSA9IGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUoZmlsZSk7XHJcblxyXG4gIGlmICghc3R5bGVMaXN0U2VydmljZSkge1xyXG4gICAgYWRkTGF5ZXJBbmRGZWF0dXJlc1RvTWFwKGZlYXR1cmVzLCBtYXAsIGxheWVyVGl0bGUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhZGRMYXllckFuZEZlYXR1cmVzU3R5bGVkVG9NYXAoZmVhdHVyZXMsIG1hcCwgbGF5ZXJUaXRsZSwgc3R5bGVMaXN0U2VydmljZSwgc3R5bGVTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgbWVzc2FnZVRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuc3VjY2Vzcy50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5zdWNjZXNzLnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBsYXllclRpdGxlXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCBtZXNzYWdlVGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRmlsZUltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgZXJyb3I6IEVycm9yLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCBlcnJNYXBwaW5nID0ge1xyXG4gICAgJ0ludmFsaWQgZmlsZSc6IGhhbmRsZUludmFsaWRGaWxlSW1wb3J0RXJyb3IsXHJcbiAgICAnRmlsZSBpcyB0b28gbGFyZ2UnOiBoYW5kbGVTaXplRmlsZUltcG9ydEVycm9yLFxyXG4gICAgJ0ZhaWxlZCB0byByZWFkIGZpbGUnOiBoYW5kbGVVbnJlYWRibGVGaWxlSW1wb3J0RXJyb3IsXHJcbiAgICAnSW52YWxpZCBTUlMgZGVmaW5pdGlvbic6IGhhbmRsZVNSU0ltcG9ydEVycm9yXHJcbiAgfTtcclxuICBlcnJNYXBwaW5nW2Vycm9yLm1lc3NhZ2VdKGZpbGUsIGVycm9yLCBtZXNzYWdlU2VydmljZSwgbGFuZ3VhZ2VTZXJ2aWNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUludmFsaWRGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmludmFsaWQudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgbWltZVR5cGU6IGZpbGUudHlwZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVVucmVhZGJsZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnVucmVhZGFibGUudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUudW5yZWFkYWJsZS50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2l6ZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnRvb0xhcmdlLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnRvb0xhcmdlLnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWVcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVOb3RoaW5nVG9JbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuZW1wdHkudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuZW1wdHkudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgbWltZVR5cGU6IGZpbGUudHlwZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNSU0ltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkU1JTLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmludmFsaWRTUlMudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgbWltZVR5cGU6IGZpbGUudHlwZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVFeHRlbnNpb24oZmlsZTogRmlsZSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGZpbGUubmFtZS5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xyXG4gIHJldHVybiBmaWxlLm5hbWUuc3Vic3RyKDAsIGZpbGUubmFtZS5sYXN0SW5kZXhPZignLicpKTtcclxufVxyXG4iXX0=