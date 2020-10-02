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
        type: 'vector',
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
 * @param {?} features
 * @param {?} map
 * @param {?} layerTitle
 * @param {?} styleListService
 * @param {?} styleService
 * @return {?}
 */
export function addLayerAndFeaturesStyledToMap(features, map, layerTitle, styleListService, styleService) {
    /** @type {?} */
    const olFeatures = features.map((/**
     * @param {?} feature
     * @return {?}
     */
    (feature) => featureToOl(feature, map.projection)));
    /** @type {?} */
    let style;
    /** @type {?} */
    let distance;
    if (styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute')) {
        /** @type {?} */
        const styleByAttribute = styleListService.getStyleList(layerTitle.toString() + '.styleByAttribute');
        style = (/**
         * @param {?} feature
         * @return {?}
         */
        feature => {
            return styleService.createStyleByAttribute(feature, styleByAttribute);
        });
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
        /** @type {?} */
        const clusterParam = styleListService.getStyleList(layerTitle.toString() + '.clusterParam');
        distance = styleListService.getStyleList(layerTitle.toString() + '.distance');
        /** @type {?} */
        const baseStyle = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.clusterStyle'));
        style = (/**
         * @param {?} feature
         * @return {?}
         */
        feature => {
            return styleService.createClusterStyle(feature, clusterParam, baseStyle);
        });
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.style')) {
        style = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.style'));
    }
    else if (styleListService.getStyleList('default.clusterStyle') && features[0].geometry.type === 'Point') {
        /** @type {?} */
        const clusterParam = styleListService.getStyleList('default.clusterParam');
        distance = styleListService.getStyleList('default.distance');
        /** @type {?} */
        const baseStyle = styleService.createStyle(styleListService.getStyleList('default.clusterStyle'));
        style = (/**
         * @param {?} feature
         * @return {?}
         */
        feature => {
            return styleService.createClusterStyle(feature, clusterParam, baseStyle);
        });
    }
    else {
        style = styleService.createStyle(styleListService.getStyleList('default.style'));
    }
    /** @type {?} */
    let source;
    if (styleListService.getStyleList(layerTitle.toString() + '.clusterStyle')) {
        /** @type {?} */
        const sourceOptions = {
            distance,
            type: 'cluster',
            queryable: true
        };
        source = new ClusterDataSource(sourceOptions);
        source.ol.source.addFeatures(olFeatures);
    }
    else if (styleListService.getStyleList(layerTitle.toString())) {
        /** @type {?} */
        const sourceOptions = {
            type: 'vector',
            queryable: true
        };
        source = new FeatureDataSource(sourceOptions);
        source.ol.addFeatures(olFeatures);
    }
    else if (styleListService.getStyleList('default.clusterStyle') && features[0].geometry.type === 'Point') {
        /** @type {?} */
        const sourceOptions = {
            distance,
            type: 'cluster',
            queryable: true
        };
        source = new ClusterDataSource(sourceOptions);
        source.ol.source.addFeatures(olFeatures);
    }
    else {
        /** @type {?} */
        const sourceOptions = {
            type: 'vector',
            queryable: true
        };
        source = new FeatureDataSource(sourceOptions);
        source.ol.addFeatures(olFeatures);
    }
    /** @type {?} */
    const layer = new VectorLayer({
        title: layerTitle,
        source,
        style
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
    const layerTitle = computeLayerTitleFromFile(file);
    if (!styleListService) {
        addLayerAndFeaturesToMap(features, map, layerTitle);
    }
    else {
        addLayerAndFeaturesStyledToMap(features, map, layerTitle, styleListService, styleService);
    }
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
 * @param {?=} sizeMb
 * @return {?}
 */
export function handleFileImportError(file, error, messageService, languageService, sizeMb) {
    sizeMb = sizeMb ? sizeMb : 30;
    /** @type {?} */
    const errMapping = {
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
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleUnreadbleFileImportError(file, error, messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.dropGeoFile.unreadable.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.unreadable.text', {
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
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.dropGeoFile.tooLarge.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.tooLarge.text', {
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
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
export function handleSRSImportError(file, messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.dropGeoFile.invalidSRS.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.invalidSRS.text', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2ltcG9ydC1leHBvcnQvc2hhcmVkL2ltcG9ydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFJcEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFHM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQU9yRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQzs7Ozs7OztBQUczRixNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBbUIsRUFBRSxHQUFXLEVBQUUsVUFBa0I7O1VBQ3JGLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRzs7OztJQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUM7O1VBRXJGLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7O1VBQ25DLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7O1VBQ25DLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7O1VBQ25DLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDaEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLEtBQUssRUFBRSxDQUFDO0tBQ1QsQ0FBQzs7VUFF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RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBmZWF0dXJlVG9PbCwgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHlsZUJ5QXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL3ZlY3Rvci1zdHlsZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBTdHlsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtbGlzdC9zdHlsZS1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyUGFyYW0gfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvY2x1c3RlclBhcmFtJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllckFuZEZlYXR1cmVzVG9NYXAoZmVhdHVyZXM6IEZlYXR1cmVbXSwgbWFwOiBJZ29NYXAsIGxheWVyVGl0bGU6IHN0cmluZyk6IFZlY3RvckxheWVyIHtcclxuICBjb25zdCBvbEZlYXR1cmVzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlOiBGZWF0dXJlKSA9PiBmZWF0dXJlVG9PbChmZWF0dXJlLCBtYXAucHJvamVjdGlvbikpO1xyXG5cclxuICBjb25zdCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBiID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBzdHJva2UgPSBuZXcgb2xTdHlsZS5TdHJva2Uoe1xyXG4gICAgY29sb3I6IFtyLCBnLCBiLCAxXSxcclxuICAgIHdpZHRoOiAyXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZpbGwgPSBuZXcgb2xTdHlsZS5GaWxsKHtcclxuICAgIGNvbG9yOiBbciwgZywgYiwgMC40XVxyXG4gIH0pO1xyXG4gIGNvbnN0IHNvdXJjZU9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyAmIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgdHlwZTogJ3ZlY3RvcicsXHJcbiAgICBxdWVyeWFibGU6IHRydWVcclxuICB9O1xyXG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBGZWF0dXJlRGF0YVNvdXJjZShzb3VyY2VPcHRpb25zKTtcclxuICBzb3VyY2Uub2wuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgdGl0bGU6IGxheWVyVGl0bGUsXHJcbiAgICBzb3VyY2UsXHJcbiAgICBzdHlsZTogbmV3IG9sU3R5bGUuU3R5bGUoe1xyXG4gICAgICBzdHJva2UsXHJcbiAgICAgIGZpbGwsXHJcbiAgICAgIGltYWdlOiBuZXcgb2xTdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgIHJhZGl1czogNSxcclxuICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgZmlsbFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KTtcclxuICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG4gIG1vdmVUb09sRmVhdHVyZXMobWFwLCBvbEZlYXR1cmVzKTtcclxuXHJcbiAgcmV0dXJuIGxheWVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGF5ZXJBbmRGZWF0dXJlc1N0eWxlZFRvTWFwKGZlYXR1cmVzOiBGZWF0dXJlW10sIG1hcDogSWdvTWFwLCBsYXllclRpdGxlOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVMaXN0U2VydmljZTogU3R5bGVMaXN0U2VydmljZSwgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UpOiBWZWN0b3JMYXllciB7XHJcbiAgY29uc3Qgb2xGZWF0dXJlcyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZTogRmVhdHVyZSkgPT4gZmVhdHVyZVRvT2woZmVhdHVyZSwgbWFwLnByb2plY3Rpb24pKTtcclxuICBsZXQgc3R5bGU7XHJcbiAgbGV0IGRpc3RhbmNlOiBudW1iZXI7XHJcblxyXG4gIGlmIChzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLnN0eWxlQnlBdHRyaWJ1dGUnKSkge1xyXG4gICAgY29uc3Qgc3R5bGVCeUF0dHJpYnV0ZTogU3R5bGVCeUF0dHJpYnV0ZSA9IHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuc3R5bGVCeUF0dHJpYnV0ZScpO1xyXG5cclxuICAgIHN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgIHJldHVybiBzdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGVCeUF0dHJpYnV0ZShcclxuICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgIHN0eWxlQnlBdHRyaWJ1dGVcclxuICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gIH0gZWxzZSBpZiAoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5jbHVzdGVyU3R5bGUnKSkge1xyXG4gICAgY29uc3QgY2x1c3RlclBhcmFtOiBDbHVzdGVyUGFyYW0gPSBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLmNsdXN0ZXJQYXJhbScpO1xyXG4gICAgZGlzdGFuY2UgPSBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLmRpc3RhbmNlJyk7XHJcblxyXG4gICAgY29uc3QgYmFzZVN0eWxlID0gc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuY2x1c3RlclN0eWxlJykpO1xyXG5cclxuICAgIHN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgIHJldHVybiBzdHlsZVNlcnZpY2UuY3JlYXRlQ2x1c3RlclN0eWxlKFxyXG4gICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgY2x1c3RlclBhcmFtLFxyXG4gICAgICAgIGJhc2VTdHlsZVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgfSBlbHNlIGlmIChzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLnN0eWxlJykpIHtcclxuXHJcbiAgICBzdHlsZSA9IHN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLnN0eWxlJykpO1xyXG5cclxuICB9IGVsc2UgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KCdkZWZhdWx0LmNsdXN0ZXJTdHlsZScpICYmIGZlYXR1cmVzWzBdLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgY29uc3QgY2x1c3RlclBhcmFtOiBDbHVzdGVyUGFyYW0gPSBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdCgnZGVmYXVsdC5jbHVzdGVyUGFyYW0nKTtcclxuICAgICAgZGlzdGFuY2UgPSBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdCgnZGVmYXVsdC5kaXN0YW5jZScpO1xyXG5cclxuICAgICAgY29uc3QgYmFzZVN0eWxlID0gc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KCdkZWZhdWx0LmNsdXN0ZXJTdHlsZScpKTtcclxuXHJcbiAgICAgIHN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlU2VydmljZS5jcmVhdGVDbHVzdGVyU3R5bGUoXHJcbiAgICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgICAgY2x1c3RlclBhcmFtLFxyXG4gICAgICAgICAgYmFzZVN0eWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3R5bGUgPSBzdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoJ2RlZmF1bHQuc3R5bGUnKSk7XHJcbiAgfVxyXG5cclxuICBsZXQgc291cmNlO1xyXG4gIGlmIChzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLmNsdXN0ZXJTdHlsZScpKSB7XHJcbiAgICBjb25zdCBzb3VyY2VPcHRpb25zOiBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMgJiBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgZGlzdGFuY2UsXHJcbiAgICAgIHR5cGU6ICdjbHVzdGVyJyxcclxuICAgICAgcXVlcnlhYmxlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgc291cmNlID0gbmV3IENsdXN0ZXJEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gICAgc291cmNlLm9sLnNvdXJjZS5hZGRGZWF0dXJlcyhvbEZlYXR1cmVzKTtcclxuICB9IGVsc2UgaWYgKHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSkpIHtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyAmIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICB0eXBlOiAndmVjdG9yJyxcclxuICAgICAgcXVlcnlhYmxlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgc291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gICAgc291cmNlLm9sLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gIH0gZWxzZSBpZiAoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoJ2RlZmF1bHQuY2x1c3RlclN0eWxlJykgJiYgZmVhdHVyZXNbMF0uZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9uczogQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zICYgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgIGRpc3RhbmNlLFxyXG4gICAgICB0eXBlOiAnY2x1c3RlcicsXHJcbiAgICAgIHF1ZXJ5YWJsZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHNvdXJjZSA9IG5ldyBDbHVzdGVyRGF0YVNvdXJjZShzb3VyY2VPcHRpb25zKTtcclxuICAgIHNvdXJjZS5vbC5zb3VyY2UuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyAmIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICB0eXBlOiAndmVjdG9yJyxcclxuICAgICAgcXVlcnlhYmxlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgc291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gICAgc291cmNlLm9sLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgdGl0bGU6IGxheWVyVGl0bGUsXHJcbiAgICBzb3VyY2UsXHJcbiAgICBzdHlsZVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgbW92ZVRvT2xGZWF0dXJlcyhtYXAsIG9sRmVhdHVyZXMpO1xyXG5cclxuICByZXR1cm4gbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhcclxuICBmaWxlOiBGaWxlLFxyXG4gIGZlYXR1cmVzOiBGZWF0dXJlW10sXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIHN0eWxlTGlzdFNlcnZpY2U/OiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gIHN0eWxlU2VydmljZT86IFN0eWxlU2VydmljZVxyXG4pIHtcclxuICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBoYW5kbGVOb3RoaW5nVG9JbXBvcnRFcnJvcihmaWxlLCBtZXNzYWdlU2VydmljZSwgbGFuZ3VhZ2VTZXJ2aWNlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxheWVyVGl0bGUgPSBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGUpO1xyXG5cclxuICBpZiAoIXN0eWxlTGlzdFNlcnZpY2UpIHtcclxuICAgIGFkZExheWVyQW5kRmVhdHVyZXNUb01hcChmZWF0dXJlcywgbWFwLCBsYXllclRpdGxlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWRkTGF5ZXJBbmRGZWF0dXJlc1N0eWxlZFRvTWFwKGZlYXR1cmVzLCBtYXAsIGxheWVyVGl0bGUsIHN0eWxlTGlzdFNlcnZpY2UsIHN0eWxlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IG1lc3NhZ2VUaXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnN1Y2Nlc3MudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuc3VjY2Vzcy50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogbGF5ZXJUaXRsZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgbWVzc2FnZVRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgc2l6ZU1iPzogbnVtYmVyXHJcbikge1xyXG4gIHNpemVNYiA9IHNpemVNYiA/IHNpemVNYiA6IDMwO1xyXG4gIGNvbnN0IGVyck1hcHBpbmcgPSB7XHJcbiAgICAnSW52YWxpZCBmaWxlJzogaGFuZGxlSW52YWxpZEZpbGVJbXBvcnRFcnJvcixcclxuICAgICdGaWxlIGlzIHRvbyBsYXJnZSc6IGhhbmRsZVNpemVGaWxlSW1wb3J0RXJyb3IsXHJcbiAgICAnRmFpbGVkIHRvIHJlYWQgZmlsZSc6IGhhbmRsZVVucmVhZGJsZUZpbGVJbXBvcnRFcnJvcixcclxuICAgICdJbnZhbGlkIFNSUyBkZWZpbml0aW9uJzogaGFuZGxlU1JTSW1wb3J0RXJyb3JcclxuICB9O1xyXG4gIGVyck1hcHBpbmdbZXJyb3IubWVzc2FnZV0oZmlsZSwgZXJyb3IsIG1lc3NhZ2VTZXJ2aWNlLCBsYW5ndWFnZVNlcnZpY2UsIHNpemVNYik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVJbnZhbGlkRmlsZUltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgZXJyb3I6IEVycm9yLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuaW52YWxpZC50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkLnRleHQnLCB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWUsXHJcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGVcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVVbnJlYWRibGVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS51bnJlYWRhYmxlLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLnVucmVhZGFibGUudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNpemVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIHNpemVNYjogbnVtYmVyXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS50b29MYXJnZS50aXRsZScpO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS50b29MYXJnZS50ZXh0Jywge1xyXG4gICAgICB2YWx1ZTogZmlsZS5uYW1lLFxyXG4gICAgICBzaXplOiBzaXplTWJcclxuICB9KTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVOb3RoaW5nVG9JbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4pIHtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBsYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuZW1wdHkudGl0bGUnKTtcclxuICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZHJvcEdlb0ZpbGUuZW1wdHkudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgbWltZVR5cGU6IGZpbGUudHlwZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNSU0ltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kcm9wR2VvRmlsZS5pbnZhbGlkU1JTLnRpdGxlJyk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRyb3BHZW9GaWxlLmludmFsaWRTUlMudGV4dCcsIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgbWltZVR5cGU6IGZpbGUudHlwZVxyXG4gIH0pO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVFeHRlbnNpb24oZmlsZTogRmlsZSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGZpbGUubmFtZS5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xyXG4gIHJldHVybiBmaWxlLm5hbWUuc3Vic3RyKDAsIGZpbGUubmFtZS5sYXN0SW5kZXhPZignLicpKTtcclxufVxyXG4iXX0=