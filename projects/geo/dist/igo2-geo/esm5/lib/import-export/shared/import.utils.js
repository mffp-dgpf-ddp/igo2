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
        type: 'vector',
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
    else if (styleListService.getStyleList('default.clusterStyle') && features[0].geometry.type === 'Point') {
        /** @type {?} */
        var clusterParam_2 = styleListService.getStyleList('default.clusterParam');
        distance = styleListService.getStyleList('default.distance');
        /** @type {?} */
        var baseStyle_2 = styleService.createStyle(styleListService.getStyleList('default.clusterStyle'));
        style = (/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            return styleService.createClusterStyle(feature, clusterParam_2, baseStyle_2);
        });
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
    else if (styleListService.getStyleList(layerTitle.toString())) {
        /** @type {?} */
        var sourceOptions = {
            type: 'vector',
            queryable: true
        };
        source = new FeatureDataSource(sourceOptions);
        source.ol.addFeatures(olFeatures);
    }
    else if (styleListService.getStyleList('default.clusterStyle') && features[0].geometry.type === 'Point') {
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
            type: 'vector',
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
 * @param {?=} sizeMb
 * @return {?}
 */
export function handleFileImportError(file, error, messageService, languageService, sizeMb) {
    sizeMb = sizeMb ? sizeMb : 30;
    /** @type {?} */
    var errMapping = {
        'Invalid file': handleInvalidFileImportError,
        'File is too large': handleSizeFileImportError,
        'Failed to read file': handleUnreadbleFileImportError,
        'Invalid SRS definition': handleSRSImportError
    };
    errMapping[error.message](file, error, messageService, languageService, sizeMb);
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
 * @param {?} sizeMb
 * @return {?}
 */
export function handleSizeFileImportError(file, error, messageService, languageService, sizeMb) {
    /** @type {?} */
    var translate = languageService.translate;
    /** @type {?} */
    var title = translate.instant('igo.geo.dropGeoFile.tooLarge.title');
    /** @type {?} */
    var message = translate.instant('igo.geo.dropGeoFile.tooLarge.text', {
        value: file.name,
        size: sizeMb
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2ltcG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFJcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQU9yRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQzs7Ozs7OztBQUczRixNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBbUIsRUFBRSxHQUFXLEVBQUUsVUFBa0I7O1FBQ3JGLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLFVBQUMsT0FBZ0IsSUFBSyxPQUFBLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFwQyxDQUFvQyxFQUFDOztRQUVyRixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixLQUFLLEVBQUUsQ0FBQztLQUNULENB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QU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGZlYXR1cmVUb09sLCBtb3ZlVG9PbEZlYXR1cmVzIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0eWxlQnlBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvdmVjdG9yLXN0eWxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFN0eWxlTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1saXN0L3N0eWxlLWxpc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJQYXJhbSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9jbHVzdGVyUGFyYW0nO1xyXG5pbXBvcnQgeyBDbHVzdGVyRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExheWVyQW5kRmVhdHVyZXNUb01hcChmZWF0dXJlczogRmVhdHVyZVtdLCBtYXA6IElnb01hcCwgbGF5ZXJUaXRsZTogc3RyaW5nKTogVmVjdG9yTGF5ZXIge1xyXG4gIGNvbnN0IG9sRmVhdHVyZXMgPSBmZWF0dXJlcy5tYXAoKGZlYXR1cmU6IEZlYXR1cmUpID0+IGZlYXR1cmVUb09sKGZlYXR1cmUsIG1hcC5wcm9qZWN0aW9uKSk7XHJcblxyXG4gIGNvbnN0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gIGNvbnN0IGcgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gIGNvbnN0IGIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gIGNvbnN0IHN0cm9rZSA9IG5ldyBvbFN0eWxlLlN0cm9rZSh7XHJcbiAgICBjb2xvcjogW3IsIGcsIGIsIDFdLFxyXG4gICAgd2lkdGg6IDJcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmlsbCA9IG5ldyBvbFN0eWxlLkZpbGwoe1xyXG4gICAgY29sb3I6IFtyLCBnLCBiLCAwLjRdXHJcbiAgfSk7XHJcbiAgY29uc3Qgc291cmNlT3B0aW9uczogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zICYgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICB0eXBlOiAndmVjdG9yJyxcclxuICAgIHF1ZXJ5YWJsZTogdHJ1ZVxyXG4gIH07XHJcbiAgY29uc3Qgc291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gIHNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICBjb25zdCBsYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogbGF5ZXJUaXRsZSxcclxuICAgIHNvdXJjZSxcclxuICAgIHN0eWxlOiBuZXcgb2xTdHlsZS5TdHlsZSh7XHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbCxcclxuICAgICAgaW1hZ2U6IG5ldyBvbFN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICAgIHN0cm9rZSxcclxuICAgICAgICBmaWxsXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgbW92ZVRvT2xGZWF0dXJlcyhtYXAsIG9sRmVhdHVyZXMpO1xyXG5cclxuICByZXR1cm4gbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllckFuZEZlYXR1cmVzU3R5bGVkVG9NYXAoZmVhdHVyZXM6IEZlYXR1cmVbXSwgbWFwOiBJZ29NYXAsIGxheWVyVGl0bGU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLCBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSk6IFZlY3RvckxheWVyIHtcclxuICBjb25zdCBvbEZlYXR1cmVzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlKSA9PiBmZWF0dXJlVG9PbChmZWF0dXJlLCBtYXAucHJvamVjdGlvbikpO1xyXG4gIGxldCBzdHlsZTtcclxuICBsZXQgZGlzdGFuY2U6IG51bWJlcjtcclxuXHJcbiAgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGVCeUF0dHJpYnV0ZScpKSB7XHJcbiAgICBjb25zdCBzdHlsZUJ5QXR0cmlidXRlOiBTdHlsZUJ5QXR0cmlidXRlID0gc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5zdHlsZUJ5QXR0cmlidXRlJyk7XHJcblxyXG4gICAgc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgcmV0dXJuIHN0eWxlU2VydmljZS5jcmVhdGVTdHlsZUJ5QXR0cmlidXRlKFxyXG4gICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgc3R5bGVCeUF0dHJpYnV0ZVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgfSBlbHNlIGlmIChzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLmNsdXN0ZXJTdHlsZScpKSB7XHJcbiAgICBjb25zdCBjbHVzdGVyUGFyYW06IENsdXN0ZXJQYXJhbSA9IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuY2x1c3RlclBhcmFtJyk7XHJcbiAgICBkaXN0YW5jZSA9IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuZGlzdGFuY2UnKTtcclxuXHJcbiAgICBjb25zdCBiYXNlU3R5bGUgPSBzdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5jbHVzdGVyU3R5bGUnKSk7XHJcblxyXG4gICAgc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgcmV0dXJuIHN0eWxlU2VydmljZS5jcmVhdGVDbHVzdGVyU3R5bGUoXHJcbiAgICAgICAgZmVhdHVyZSxcclxuICAgICAgICBjbHVzdGVyUGFyYW0sXHJcbiAgICAgICAgYmFzZVN0eWxlXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICB9IGVsc2UgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGUnKSkge1xyXG5cclxuICAgIHN0eWxlID0gc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGUnKSk7XHJcblxyXG4gIH0gZWxzZSBpZiAoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoJ2RlZmF1bHQuY2x1c3RlclN0eWxlJykgJiYgZmVhdHVyZXNbMF0uZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICBjb25zdCBjbHVzdGVyUGFyYW06IENsdXN0ZXJQYXJhbSA9IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KCdkZWZhdWx0LmNsdXN0ZXJQYXJhbScpO1xyXG4gICAgICBkaXN0YW5jZSA9IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KCdkZWZhdWx0LmRpc3RhbmNlJyk7XHJcblxyXG4gICAgICBjb25zdCBiYXNlU3R5bGUgPSBzdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoJ2RlZmF1bHQuY2x1c3RlclN0eWxlJykpO1xyXG5cclxuICAgICAgc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgICByZXR1cm4gc3R5bGVTZXJ2aWNlLmNyZWF0ZUNsdXN0ZXJTdHlsZShcclxuICAgICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgICBjbHVzdGVyUGFyYW0sXHJcbiAgICAgICAgICBiYXNlU3R5bGVcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzdHlsZSA9IHN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdCgnZGVmYXVsdC5zdHlsZScpKTtcclxuICB9XHJcblxyXG4gIGxldCBzb3VyY2U7XHJcbiAgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuY2x1c3RlclN0eWxlJykpIHtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnM6IENsdXN0ZXJEYXRhU291cmNlT3B0aW9ucyAmIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICBkaXN0YW5jZSxcclxuICAgICAgdHlwZTogJ2NsdXN0ZXInLFxyXG4gICAgICBxdWVyeWFibGU6IHRydWVcclxuICAgIH07XHJcbiAgICBzb3VyY2UgPSBuZXcgQ2x1c3RlckRhdGFTb3VyY2Uoc291cmNlT3B0aW9ucyk7XHJcbiAgICBzb3VyY2Uub2wuc291cmNlLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gIH0gZWxzZSBpZiAoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpKSkge1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9uczogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zICYgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgIHR5cGU6ICd2ZWN0b3InLFxyXG4gICAgICBxdWVyeWFibGU6IHRydWVcclxuICAgIH07XHJcbiAgICBzb3VyY2UgPSBuZXcgRmVhdHVyZURhdGFTb3VyY2Uoc291cmNlT3B0aW9ucyk7XHJcbiAgICBzb3VyY2Uub2wuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgfSBlbHNlIGlmIChzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdCgnZGVmYXVsdC5jbHVzdGVyU3R5bGUnKSAmJiBmZWF0dXJlc1swXS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zOiBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMgJiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgZGlzdGFuY2UsXHJcbiAgICAgIHR5cGU6ICdjbHVzdGVyJyxcclxuICAgICAgcXVlcnlhYmxlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgc291cmNlID0gbmV3IENsdXN0ZXJEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gICAgc291cmNlLm9sLnNvdXJjZS5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9uczogRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zICYgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgIHR5cGU6ICd2ZWN0b3InLFxyXG4gICAgICBxdWVyeWFibGU6IHRydWVcclxuICAgIH07XHJcbiAgICBzb3VyY2UgPSBuZXcgRmVhdHVyZURhdGFTb3VyY2Uoc291cmNlT3B0aW9ucyk7XHJcbiAgICBzb3VyY2Uub2wuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBsYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogbGF5ZXJUaXRsZSxcclxuICAgIHNvdXJjZSxcclxuICAgIHN0eWxlXHJcbiAgfSk7XHJcbiAgbWFwLmFkZExheWVyKGxheWVyKTtcclxuICBtb3ZlVG9PbEZlYXR1cmVzKG1hcCwgb2xGZWF0dXJlcyk7XHJcblxyXG4gIHJldHVybiBsYXllcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgZmVhdHVyZXM6IEZlYXR1cmVbXSxcclxuICBtYXA6IElnb01hcCxcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgc3R5bGVMaXN0U2VydmljZT86IFN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgc3R5bGVTZXJ2aWNlPzogU3R5bGVTZXJ2aWNlXHJcbikge1xyXG4gIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgIGhhbmRsZU5vdGhpbmdUb0ltcG9ydEVycm9yKGZpbGUsIG1lc3NhZ2VTZXJ2aWNlLCBsYW5ndWFnZVNlcnZpY2UpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGF5ZXJUaXRsZSA9IGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUoZmlsZSk7XHJcblxyXG4gIGlmICghc3R5bGVMaXN0U2VydmljZSkge1xyXG4gICAgYWRkTGF5ZXJBbmRGZWF0dXJlc1RvTWFwKGZlYXR1cmVzLCBtYXAsIGxheWVyVGl0bGUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhZGRMYXllckFuZEZlYXR1cmVzU3R5bGVkVG9NYXAoZmVhdHVyZXMsIG1hcCwgbGF5ZXJUaXRsZSwgc3R5bGVMaXN0U2VydmljZSwgc3R5bGVTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgbWVzc2FnZVRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuc3VjY2Vzcy50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5zdWNjZXNzLnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBsYXllclRpdGxlXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCBtZXNzYWdlVGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRmlsZUltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgZXJyb3I6IEVycm9yLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICBzaXplTWI/OiBudW1iZXJcclxuKSB7XHJcbiAgc2l6ZU1iID0gc2l6ZU1iID8gc2l6ZU1iIDogMzA7XHJcbiAgY29uc3QgZXJyTWFwcGluZyA9IHtcclxuICAgICdJbnZhbGlkIGZpbGUnOiBoYW5kbGVJbnZhbGlkRmlsZUltcG9ydEVycm9yLFxyXG4gICAgJ0ZpbGUgaXMgdG9vIGxhcmdlJzogaGFuZGxlU2l6ZUZpbGVJbXBvcnRFcnJvcixcclxuICAgICdGYWlsZWQgdG8gcmVhZCBmaWxlJzogaGFuZGxlVW5yZWFkYmxlRmlsZUltcG9ydEVycm9yLFxyXG4gICAgJ0ludmFsaWQgU1JTIGRlZmluaXRpb24nOiBoYW5kbGVTUlNJbXBvcnRFcnJvclxyXG4gIH07XHJcbiAgZXJyTWFwcGluZ1tlcnJvci5tZXNzYWdlXShmaWxlLCBlcnJvciwgbWVzc2FnZVNlcnZpY2UsIGxhbmd1YWdlU2VydmljZSwgc2l6ZU1iKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUludmFsaWRGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmludmFsaWQudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgbWltZVR5cGU6IGZpbGUudHlwZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVVucmVhZGJsZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnVucmVhZGFibGUudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUudW5yZWFkYWJsZS50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2l6ZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgc2l6ZU1iOiBudW1iZXJcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnRvb0xhcmdlLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnRvb0xhcmdlLnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWUsXHJcbiAgICAgIHNpemU6IHNpemVNYlxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU5vdGhpbmdUb0ltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5lbXB0eS50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5lbXB0eS50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lLFxyXG4gICAgICBtaW1lVHlwZTogZmlsZS50eXBlXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU1JTSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmludmFsaWRTUlMudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuaW52YWxpZFNSUy50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lLFxyXG4gICAgICBtaW1lVHlwZTogZmlsZS50eXBlXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZUV4dGVuc2lvbihmaWxlOiBGaWxlKTogc3RyaW5nIHtcclxuICByZXR1cm4gZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVMYXllclRpdGxlRnJvbUZpbGUoZmlsZTogRmlsZSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGZpbGUubmFtZS5zdWJzdHIoMCwgZmlsZS5uYW1lLmxhc3RJbmRleE9mKCcuJykpO1xyXG59XHJcbiJdfQ==