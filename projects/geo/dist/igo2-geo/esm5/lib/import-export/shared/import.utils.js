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
    if (styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute')) {
        /** @type {?} */
        var styleByAttribute_1 = styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute');
        /** @type {?} */
        var styleBy = (/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            return styleService.createStyleByAttribute(feature, styleByAttribute_1);
        });
        style = styleBy;
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.style')) {
        /** @type {?} */
        var radius = styleListService.getStyleList(layerTitle.toString() + '.style.radius');
        /** @type {?} */
        var stroke = new olStyle.Stroke({
            color: styleListService.getStyleList(layerTitle.toString() + '.style.stroke.color'),
            width: styleListService.getStyleList(layerTitle.toString() + '.style.stroke.width')
        });
        /** @type {?} */
        var fill = new olStyle.Fill({
            color: styleListService.getStyleList(layerTitle.toString() + '.style.fill.color')
        });
        style = new olStyle.Style({
            stroke: stroke,
            fill: fill,
            image: new olStyle.Circle({
                radius: radius ? radius : 5,
                stroke: stroke,
                fill: fill
            })
        });
    }
    else {
        /** @type {?} */
        var radius = styleListService.getStyleList('default.style.radius');
        /** @type {?} */
        var stroke = new olStyle.Stroke({
            color: styleListService.getStyleList('default.style.stroke.color'),
            width: styleListService.getStyleList('default.style.stroke.width')
        });
        /** @type {?} */
        var fill = new olStyle.Fill({
            color: styleListService.getStyleList('default.style.fill.color')
        });
        style = new olStyle.Style({
            stroke: stroke,
            fill: fill,
            image: new olStyle.Circle({
                radius: radius ? radius : 5,
                stroke: stroke,
                fill: fill
            })
        });
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2ltcG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFJcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7OztBQU9yRSxNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBbUIsRUFBRSxHQUFXLEVBQUUsVUFBa0I7O1FBQ3JGLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLFVBQUMsT0FBZ0IsSUFBSyxPQUFBLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFwQyxDQUFvQyxFQUFDOztRQUVyRixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDOztRQUNuQyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixLQUFLLEVBQUUsQ0FBQztLQUNULENBQUM7O1FBRUksSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztR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eUIsQ0FBQyxJQUFVO0lBQ2xELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sU3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGZlYXR1cmVUb09sLCBtb3ZlVG9PbEZlYXR1cmVzIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvc3R5bGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0eWxlQnlBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvdmVjdG9yLXN0eWxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFN0eWxlTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1saXN0L3N0eWxlLWxpc3Quc2VydmljZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGF5ZXJBbmRGZWF0dXJlc1RvTWFwKGZlYXR1cmVzOiBGZWF0dXJlW10sIG1hcDogSWdvTWFwLCBsYXllclRpdGxlOiBzdHJpbmcpOiBWZWN0b3JMYXllciB7XHJcbiAgY29uc3Qgb2xGZWF0dXJlcyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZTogRmVhdHVyZSkgPT4gZmVhdHVyZVRvT2woZmVhdHVyZSwgbWFwLnByb2plY3Rpb24pKTtcclxuXHJcbiAgY29uc3QgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgY29uc3QgZyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgY29uc3QgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgY29uc3Qgc3Ryb2tlID0gbmV3IG9sU3R5bGUuU3Ryb2tlKHtcclxuICAgIGNvbG9yOiBbciwgZywgYiwgMV0sXHJcbiAgICB3aWR0aDogMlxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmaWxsID0gbmV3IG9sU3R5bGUuRmlsbCh7XHJcbiAgICBjb2xvcjogW3IsIGcsIGIsIDAuNF1cclxuICB9KTtcclxuICBjb25zdCBzb3VyY2VPcHRpb25zOiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgJiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHtcclxuICAgIHF1ZXJ5YWJsZTogdHJ1ZVxyXG4gIH07XHJcbiAgY29uc3Qgc291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gIHNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICBjb25zdCBsYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICB0aXRsZTogbGF5ZXJUaXRsZSxcclxuICAgIHNvdXJjZSxcclxuICAgIHN0eWxlOiBuZXcgb2xTdHlsZS5TdHlsZSh7XHJcbiAgICAgIHN0cm9rZSxcclxuICAgICAgZmlsbCxcclxuICAgICAgaW1hZ2U6IG5ldyBvbFN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgcmFkaXVzOiA1LFxyXG4gICAgICAgIHN0cm9rZSxcclxuICAgICAgICBmaWxsXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgbW92ZVRvT2xGZWF0dXJlcyhtYXAsIG9sRmVhdHVyZXMpO1xyXG5cclxuICByZXR1cm4gbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllckFuZEZlYXR1cmVzU3R5bGVkVG9NYXAoZmVhdHVyZXM6IEZlYXR1cmVbXSwgbWFwOiBJZ29NYXAsIGxheWVyVGl0bGU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLCBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSk6IFZlY3RvckxheWVyIHtcclxuICBjb25zdCBvbEZlYXR1cmVzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlKSA9PiBmZWF0dXJlVG9PbChmZWF0dXJlLCBtYXAucHJvamVjdGlvbikpO1xyXG4gIGxldCBzdHlsZTtcclxuXHJcbiAgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGVCeUF0dHJpYnV0ZScpKSB7XHJcbiAgICBjb25zdCBzdHlsZUJ5QXR0cmlidXRlOiBTdHlsZUJ5QXR0cmlidXRlID0gc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5zdHlsZUJ5QXR0cmlidXRlJyk7XHJcblxyXG4gICAgY29uc3Qgc3R5bGVCeSA9IGZlYXR1cmUgPT4ge1xyXG4gICAgICByZXR1cm4gc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoXHJcbiAgICAgICAgZmVhdHVyZSxcclxuICAgICAgICBzdHlsZUJ5QXR0cmlidXRlXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gICAgc3R5bGUgPSBzdHlsZUJ5O1xyXG5cclxuICB9IGVsc2UgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGUnKSkge1xyXG4gICAgY29uc3QgcmFkaXVzID0gc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5zdHlsZS5yYWRpdXMnKTtcclxuXHJcbiAgICBjb25zdCBzdHJva2UgPSBuZXcgb2xTdHlsZS5TdHJva2Uoe1xyXG4gICAgICBjb2xvcjogc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5zdHlsZS5zdHJva2UuY29sb3InKSxcclxuICAgICAgd2lkdGg6IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGUuc3Ryb2tlLndpZHRoJylcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGZpbGwgPSBuZXcgb2xTdHlsZS5GaWxsKHtcclxuICAgICAgY29sb3I6IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGUuZmlsbC5jb2xvcicpXHJcbiAgICB9KTtcclxuXHJcbiAgICBzdHlsZSA9IG5ldyBvbFN0eWxlLlN0eWxlKHtcclxuICAgICAgc3Ryb2tlLFxyXG4gICAgICBmaWxsLFxyXG4gICAgICBpbWFnZTogbmV3IG9sU3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICByYWRpdXM6IHJhZGl1cyA/IHJhZGl1cyA6IDUsXHJcbiAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgIGZpbGxcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCByYWRpdXMgPSBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdCgnZGVmYXVsdC5zdHlsZS5yYWRpdXMnKTtcclxuXHJcbiAgICBjb25zdCBzdHJva2UgPSBuZXcgb2xTdHlsZS5TdHJva2Uoe1xyXG4gICAgICBjb2xvcjogc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoJ2RlZmF1bHQuc3R5bGUuc3Ryb2tlLmNvbG9yJyksXHJcbiAgICAgIHdpZHRoOiBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdCgnZGVmYXVsdC5zdHlsZS5zdHJva2Uud2lkdGgnKVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZmlsbCA9IG5ldyBvbFN0eWxlLkZpbGwoe1xyXG4gICAgICBjb2xvcjogc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoJ2RlZmF1bHQuc3R5bGUuZmlsbC5jb2xvcicpXHJcbiAgICB9KTtcclxuXHJcbiAgICBzdHlsZSA9IG5ldyBvbFN0eWxlLlN0eWxlKHtcclxuICAgICAgc3Ryb2tlLFxyXG4gICAgICBmaWxsLFxyXG4gICAgICBpbWFnZTogbmV3IG9sU3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICByYWRpdXM6IHJhZGl1cyA/IHJhZGl1cyA6IDUsXHJcbiAgICAgICAgc3Ryb2tlLFxyXG4gICAgICAgIGZpbGxcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuICBjb25zdCBzb3VyY2VPcHRpb25zOiBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgJiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHtcclxuICAgIHF1ZXJ5YWJsZTogdHJ1ZVxyXG4gIH07XHJcbiAgY29uc3Qgc291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gIHNvdXJjZS5vbC5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuXHJcbiAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgdGl0bGU6IGxheWVyVGl0bGUsXHJcbiAgICBzb3VyY2UsXHJcbiAgICBzdHlsZVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgbW92ZVRvT2xGZWF0dXJlcyhtYXAsIG9sRmVhdHVyZXMpO1xyXG5cclxuICByZXR1cm4gbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhcclxuICBmaWxlOiBGaWxlLFxyXG4gIGZlYXR1cmVzOiBGZWF0dXJlW10sXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIHN0eWxlTGlzdFNlcnZpY2U/OiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gIHN0eWxlU2VydmljZT86IFN0eWxlU2VydmljZVxyXG4pIHtcclxuICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBoYW5kbGVOb3RoaW5nVG9JbXBvcnRFcnJvcihmaWxlLCBtZXNzYWdlU2VydmljZSwgbGFuZ3VhZ2VTZXJ2aWNlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxheWVyVGl0bGUgPSBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGUpO1xyXG5cclxuICBpZiAoIXN0eWxlTGlzdFNlcnZpY2UpIHtcclxuICAgIGFkZExheWVyQW5kRmVhdHVyZXNUb01hcChmZWF0dXJlcywgbWFwLCBsYXllclRpdGxlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWRkTGF5ZXJBbmRGZWF0dXJlc1N0eWxlZFRvTWFwKGZlYXR1cmVzLCBtYXAsIGxheWVyVGl0bGUsIHN0eWxlTGlzdFNlcnZpY2UsIHN0eWxlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IG1lc3NhZ2VUaXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnN1Y2Nlc3MudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuc3VjY2Vzcy50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogbGF5ZXJUaXRsZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgbWVzc2FnZVRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgZXJyTWFwcGluZyA9IHtcclxuICAgICdJbnZhbGlkIGZpbGUnOiBoYW5kbGVJbnZhbGlkRmlsZUltcG9ydEVycm9yLFxyXG4gICAgJ0ZpbGUgaXMgdG9vIGxhcmdlJzogaGFuZGxlU2l6ZUZpbGVJbXBvcnRFcnJvcixcclxuICAgICdGYWlsZWQgdG8gcmVhZCBmaWxlJzogaGFuZGxlVW5yZWFkYmxlRmlsZUltcG9ydEVycm9yLFxyXG4gICAgJ0ludmFsaWQgU1JTIGRlZmluaXRpb24nOiBoYW5kbGVTUlNJbXBvcnRFcnJvclxyXG4gIH07XHJcbiAgZXJyTWFwcGluZ1tlcnJvci5tZXNzYWdlXShmaWxlLCBlcnJvciwgbWVzc2FnZVNlcnZpY2UsIGxhbmd1YWdlU2VydmljZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVJbnZhbGlkRmlsZUltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgZXJyb3I6IEVycm9yLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuaW52YWxpZC50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkLnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWUsXHJcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGVcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVVbnJlYWRibGVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS51bnJlYWRhYmxlLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnVucmVhZGFibGUudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNpemVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS50b29MYXJnZS50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS50b29MYXJnZS50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lXHJcbiAgfSk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTm90aGluZ1RvSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuKSB7XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmVtcHR5LnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmVtcHR5LnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWUsXHJcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGVcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTUlNJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuaW52YWxpZFNSUy50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkU1JTLnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWUsXHJcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGVcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlRXh0ZW5zaW9uKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xyXG4gIHJldHVybiBmaWxlLm5hbWUuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZShmaWxlOiBGaWxlKTogc3RyaW5nIHtcclxuICByZXR1cm4gZmlsZS5uYW1lLnN1YnN0cigwLCBmaWxlLm5hbWUubGFzdEluZGV4T2YoJy4nKSk7XHJcbn1cclxuIl19