/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as olStyle from 'ol/style';
import { FeatureDataSource, VectorLayer, ClusterDataSource } from '@igo2/geo';
/**
 * @param {?} file
 * @param {?} context
 * @param {?} messageService
 * @param {?} languageService
 * @param {?} contextService
 * @return {?}
 */
export function handleFileImportSuccess(file, context, messageService, languageService, contextService) {
    if (Object.keys(context).length <= 0) {
        handleNothingToImportError(file, messageService, languageService);
        return;
    }
    /** @type {?} */
    const contextTitle = computeLayerTitleFromFile(file);
    addContextToContextList(context, contextTitle, contextService);
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const messageTitle = translate.instant('igo.context.contextImportExport.import.success.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.success.text', {
        value: contextTitle
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
        'Failed to read file': handleUnreadbleFileImportError
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
    const title = translate.instant('igo.context.contextImportExport.import.invalid.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.invalid.text', {
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
 * @param {?} sizeMb
 * @return {?}
 */
export function handleSizeFileImportError(file, error, messageService, languageService, sizeMb) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.import.tooLarge.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.tooLarge.text', {
        value: file.name,
        size: sizeMb
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
    const title = translate.instant('igo.context.contextImportExport.import.unreadable.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.unreadable.text', {
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
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.context.contextImportExport.import.empty.title');
    /** @type {?} */
    const message = translate.instant('igo.context.contextImportExport.import.empty.text', {
        value: file.name
    });
    messageService.error(message, title);
}
/**
 * @param {?} context
 * @param {?} contextTitle
 * @param {?} contextService
 * @return {?}
 */
export function addContextToContextList(context, contextTitle, contextService) {
    context.title = contextTitle;
    context.imported = true;
    contextService.contexts$.value.ours.unshift(context);
    contextService.contexts$.next(contextService.contexts$.value);
    contextService.importedContext.unshift(context);
    contextService.loadContext(context.uri);
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
/**
 * @param {?} olFeatures
 * @param {?} map
 * @param {?} layerTitle
 * @return {?}
 */
export function addImportedFeaturesToMap(olFeatures, map, layerTitle) {
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
    return layer;
}
/**
 * @param {?} olFeatures
 * @param {?} map
 * @param {?} layerTitle
 * @param {?} styleListService
 * @param {?} styleService
 * @return {?}
 */
export function addImportedFeaturesStyledToMap(olFeatures, map, layerTitle, styleListService, styleService) {
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
        (feature) => {
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
        (feature) => {
            return styleService.createClusterStyle(feature, clusterParam, baseStyle);
        });
    }
    else if (styleListService.getStyleList(layerTitle.toString() + '.style')) {
        style = styleService.createStyle(styleListService.getStyleList(layerTitle.toString() + '.style'));
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
    return layer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pbXBvcnQudXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtaW1wb3J0LWV4cG9ydC9zaGFyZWQvY29udGV4dC1pbXBvcnQudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBRXBDLE9BQU8sRUFDTCxpQkFBaUIsRUFHakIsV0FBVyxFQU9YLGlCQUFpQixFQUNsQixNQUFNLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBTW5CLE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsSUFBVSxFQUNWLE9BQXdCLEVBQ3hCLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLGNBQThCO0lBRTlCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3BDLDBCQUEwQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDbEUsT0FBTztLQUNSOztVQUVLLFlBQVksR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7SUFFcEQsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQzs7VUFFekQsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTOztVQUNyQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FDcEMsc0RBQXNELENBQ3ZEOztVQUNLLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUMvQixxREFBcUQsRUFDckQ7UUFDRSxLQUFLLEVBQUUsWUFBWTtLQUNwQixDQUNGO0lBQ0QsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDaEQsQ0FBQzs7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxJQUFVLEVBQ1YsS0FBWSxFQUNaLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hD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O1FBQ0QsTUFBTSxHQUFHLElBQUksaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzFDO1NBQU07O2NBQ0MsYUFBYSxHQUNZO1lBQzdCLElBQUksRUFBRSxRQUFRO1lBQ2QsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuQzs7VUFFSyxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUM7UUFDNUIsS0FBSyxFQUFFLFVBQVU7UUFDakIsTUFBTTtRQUNOLEtBQUs7S0FDTixDQUFDO0lBQ0YsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVwQixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbFN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZURhdGFTb3VyY2UsXHJcbiAgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zLFxyXG4gIElnb01hcCxcclxuICBWZWN0b3JMYXllcixcclxuICBRdWVyeWFibGVEYXRhU291cmNlT3B0aW9ucyxcclxuICBTdHlsZVNlcnZpY2UsXHJcbiAgU3R5bGVMaXN0U2VydmljZSxcclxuICBTdHlsZUJ5QXR0cmlidXRlLFxyXG4gIENsdXN0ZXJQYXJhbSxcclxuICBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMsXHJcbiAgQ2x1c3RlckRhdGFTb3VyY2VcclxufSBmcm9tICdAaWdvMi9nZW8nO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4uLy4uL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhcclxuICBmaWxlOiBGaWxlLFxyXG4gIGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCxcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlXHJcbikge1xyXG4gIGlmIChPYmplY3Qua2V5cyhjb250ZXh0KS5sZW5ndGggPD0gMCkge1xyXG4gICAgaGFuZGxlTm90aGluZ1RvSW1wb3J0RXJyb3IoZmlsZSwgbWVzc2FnZVNlcnZpY2UsIGxhbmd1YWdlU2VydmljZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0VGl0bGUgPSBjb21wdXRlTGF5ZXJUaXRsZUZyb21GaWxlKGZpbGUpO1xyXG5cclxuICBhZGRDb250ZXh0VG9Db250ZXh0TGlzdChjb250ZXh0LCBjb250ZXh0VGl0bGUsIGNvbnRleHRTZXJ2aWNlKTtcclxuXHJcbiAgY29uc3QgdHJhbnNsYXRlID0gbGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICBjb25zdCBtZXNzYWdlVGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmltcG9ydC5zdWNjZXNzLnRpdGxlJ1xyXG4gICk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgJ2lnby5jb250ZXh0LmNvbnRleHRJbXBvcnRFeHBvcnQuaW1wb3J0LnN1Y2Nlc3MudGV4dCcsXHJcbiAgICB7XHJcbiAgICAgIHZhbHVlOiBjb250ZXh0VGl0bGVcclxuICAgIH1cclxuICApO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgbWVzc2FnZVRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihcclxuICBmaWxlOiBGaWxlLFxyXG4gIGVycm9yOiBFcnJvcixcclxuICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgc2l6ZU1iPzogbnVtYmVyXHJcbikge1xyXG4gIHNpemVNYiA9IHNpemVNYiA/IHNpemVNYiA6IDMwO1xyXG4gIGNvbnN0IGVyck1hcHBpbmcgPSB7XHJcbiAgICAnSW52YWxpZCBmaWxlJzogaGFuZGxlSW52YWxpZEZpbGVJbXBvcnRFcnJvcixcclxuICAgICdGaWxlIGlzIHRvbyBsYXJnZSc6IGhhbmRsZVNpemVGaWxlSW1wb3J0RXJyb3IsXHJcbiAgICAnRmFpbGVkIHRvIHJlYWQgZmlsZSc6IGhhbmRsZVVucmVhZGJsZUZpbGVJbXBvcnRFcnJvclxyXG4gIH07XHJcbiAgZXJyTWFwcGluZ1tlcnJvci5tZXNzYWdlXShcclxuICAgIGZpbGUsXHJcbiAgICBlcnJvcixcclxuICAgIG1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgbGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgc2l6ZU1iXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUludmFsaWRGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmltcG9ydC5pbnZhbGlkLnRpdGxlJ1xyXG4gICk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgJ2lnby5jb250ZXh0LmNvbnRleHRJbXBvcnRFeHBvcnQuaW1wb3J0LmludmFsaWQudGV4dCcsXHJcbiAgICB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWUsXHJcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGVcclxuICAgIH1cclxuICApO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNpemVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIHNpemVNYjogbnVtYmVyXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmltcG9ydC50b29MYXJnZS50aXRsZSdcclxuICApO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmltcG9ydC50b29MYXJnZS50ZXh0JyxcclxuICAgIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZSxcclxuICAgICAgc2l6ZTogc2l6ZU1iXHJcbiAgICB9XHJcbiAgKTtcclxuICBtZXNzYWdlU2VydmljZS5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVVbnJlYWRibGVGaWxlSW1wb3J0RXJyb3IoXHJcbiAgZmlsZTogRmlsZSxcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmltcG9ydC51bnJlYWRhYmxlLnRpdGxlJ1xyXG4gICk7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgJ2lnby5jb250ZXh0LmNvbnRleHRJbXBvcnRFeHBvcnQuaW1wb3J0LnVucmVhZGFibGUudGV4dCcsXHJcbiAgICB7XHJcbiAgICAgIHZhbHVlOiBmaWxlLm5hbWVcclxuICAgIH1cclxuICApO1xyXG4gIG1lc3NhZ2VTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU5vdGhpbmdUb0ltcG9ydEVycm9yKFxyXG4gIGZpbGU6IEZpbGUsXHJcbiAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbikge1xyXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmltcG9ydC5lbXB0eS50aXRsZSdcclxuICApO1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICdpZ28uY29udGV4dC5jb250ZXh0SW1wb3J0RXhwb3J0LmltcG9ydC5lbXB0eS50ZXh0JyxcclxuICAgIHtcclxuICAgICAgdmFsdWU6IGZpbGUubmFtZVxyXG4gICAgfVxyXG4gICk7XHJcbiAgbWVzc2FnZVNlcnZpY2UuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29udGV4dFRvQ29udGV4dExpc3QoXHJcbiAgY29udGV4dDogRGV0YWlsZWRDb250ZXh0LFxyXG4gIGNvbnRleHRUaXRsZTogc3RyaW5nLFxyXG4gIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZVxyXG4pIHtcclxuICBjb250ZXh0LnRpdGxlID0gY29udGV4dFRpdGxlO1xyXG4gIGNvbnRleHQuaW1wb3J0ZWQgPSB0cnVlO1xyXG4gIGNvbnRleHRTZXJ2aWNlLmNvbnRleHRzJC52YWx1ZS5vdXJzLnVuc2hpZnQoY29udGV4dCk7XHJcbiAgY29udGV4dFNlcnZpY2UuY29udGV4dHMkLm5leHQoY29udGV4dFNlcnZpY2UuY29udGV4dHMkLnZhbHVlKTtcclxuICBjb250ZXh0U2VydmljZS5pbXBvcnRlZENvbnRleHQudW5zaGlmdChjb250ZXh0KTtcclxuICBjb250ZXh0U2VydmljZS5sb2FkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlRXh0ZW5zaW9uKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xyXG4gIHJldHVybiBmaWxlLm5hbWUuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUxheWVyVGl0bGVGcm9tRmlsZShmaWxlOiBGaWxlKTogc3RyaW5nIHtcclxuICByZXR1cm4gZmlsZS5uYW1lLnN1YnN0cigwLCBmaWxlLm5hbWUubGFzdEluZGV4T2YoJy4nKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRlZEZlYXR1cmVzVG9NYXAoXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgbGF5ZXJUaXRsZTogc3RyaW5nXHJcbik6IFZlY3RvckxheWVyIHtcclxuICBjb25zdCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBiID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICBjb25zdCBzdHJva2UgPSBuZXcgb2xTdHlsZS5TdHJva2Uoe1xyXG4gICAgY29sb3I6IFtyLCBnLCBiLCAxXSxcclxuICAgIHdpZHRoOiAyXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZpbGwgPSBuZXcgb2xTdHlsZS5GaWxsKHtcclxuICAgIGNvbG9yOiBbciwgZywgYiwgMC40XVxyXG4gIH0pO1xyXG4gIGNvbnN0IHNvdXJjZU9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyAmIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgdHlwZTogJ3ZlY3RvcicsXHJcbiAgICBxdWVyeWFibGU6IHRydWVcclxuICB9O1xyXG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBGZWF0dXJlRGF0YVNvdXJjZShzb3VyY2VPcHRpb25zKTtcclxuICBzb3VyY2Uub2wuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgdGl0bGU6IGxheWVyVGl0bGUsXHJcbiAgICBzb3VyY2UsXHJcbiAgICBzdHlsZTogbmV3IG9sU3R5bGUuU3R5bGUoe1xyXG4gICAgICBzdHJva2UsXHJcbiAgICAgIGZpbGwsXHJcbiAgICAgIGltYWdlOiBuZXcgb2xTdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgIHJhZGl1czogNSxcclxuICAgICAgICBzdHJva2UsXHJcbiAgICAgICAgZmlsbFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KTtcclxuICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG5cclxuICByZXR1cm4gbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRlZEZlYXR1cmVzU3R5bGVkVG9NYXAoXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgbGF5ZXJUaXRsZTogc3RyaW5nLFxyXG4gIHN0eWxlTGlzdFNlcnZpY2U6IFN0eWxlTGlzdFNlcnZpY2UsXHJcbiAgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2VcclxuKTogVmVjdG9yTGF5ZXIge1xyXG4gIGxldCBzdHlsZTtcclxuICBsZXQgZGlzdGFuY2U6IG51bWJlcjtcclxuXHJcbiAgaWYgKFxyXG4gICAgc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5zdHlsZUJ5QXR0cmlidXRlJylcclxuICApIHtcclxuICAgIGNvbnN0IHN0eWxlQnlBdHRyaWJ1dGU6IFN0eWxlQnlBdHRyaWJ1dGUgPSBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChcclxuICAgICAgbGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5zdHlsZUJ5QXR0cmlidXRlJ1xyXG4gICAgKTtcclxuXHJcbiAgICBzdHlsZSA9IChmZWF0dXJlKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGVCeUF0dHJpYnV0ZShmZWF0dXJlLCBzdHlsZUJ5QXR0cmlidXRlKTtcclxuICAgIH07XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIHN0eWxlTGlzdFNlcnZpY2UuZ2V0U3R5bGVMaXN0KGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuY2x1c3RlclN0eWxlJylcclxuICApIHtcclxuICAgIGNvbnN0IGNsdXN0ZXJQYXJhbTogQ2x1c3RlclBhcmFtID0gc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoXHJcbiAgICAgIGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuY2x1c3RlclBhcmFtJ1xyXG4gICAgKTtcclxuICAgIGRpc3RhbmNlID0gc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QoXHJcbiAgICAgIGxheWVyVGl0bGUudG9TdHJpbmcoKSArICcuZGlzdGFuY2UnXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGJhc2VTdHlsZSA9IHN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShcclxuICAgICAgc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5jbHVzdGVyU3R5bGUnKVxyXG4gICAgKTtcclxuXHJcbiAgICBzdHlsZSA9IChmZWF0dXJlKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdHlsZVNlcnZpY2UuY3JlYXRlQ2x1c3RlclN0eWxlKGZlYXR1cmUsIGNsdXN0ZXJQYXJhbSwgYmFzZVN0eWxlKTtcclxuICAgIH07XHJcbiAgfSBlbHNlIGlmIChzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLnN0eWxlJykpIHtcclxuICAgIHN0eWxlID0gc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKFxyXG4gICAgICBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdChsYXllclRpdGxlLnRvU3RyaW5nKCkgKyAnLnN0eWxlJylcclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN0eWxlID0gc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKFxyXG4gICAgICBzdHlsZUxpc3RTZXJ2aWNlLmdldFN0eWxlTGlzdCgnZGVmYXVsdC5zdHlsZScpXHJcbiAgICApO1xyXG4gIH1cclxuICBsZXQgc291cmNlO1xyXG5cclxuICBpZiAoc3R5bGVMaXN0U2VydmljZS5nZXRTdHlsZUxpc3QobGF5ZXJUaXRsZS50b1N0cmluZygpICsgJy5jbHVzdGVyU3R5bGUnKSkge1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9uczogQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zICZcclxuICAgICAgUXVlcnlhYmxlRGF0YVNvdXJjZU9wdGlvbnMgPSB7XHJcbiAgICAgIGRpc3RhbmNlLFxyXG4gICAgICB0eXBlOiAnY2x1c3RlcicsXHJcbiAgICAgIHF1ZXJ5YWJsZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHNvdXJjZSA9IG5ldyBDbHVzdGVyRGF0YVNvdXJjZShzb3VyY2VPcHRpb25zKTtcclxuICAgIHNvdXJjZS5vbC5zb3VyY2UuYWRkRmVhdHVyZXMob2xGZWF0dXJlcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnM6IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyAmXHJcbiAgICAgIFF1ZXJ5YWJsZURhdGFTb3VyY2VPcHRpb25zID0ge1xyXG4gICAgICB0eXBlOiAndmVjdG9yJyxcclxuICAgICAgcXVlcnlhYmxlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgc291cmNlID0gbmV3IEZlYXR1cmVEYXRhU291cmNlKHNvdXJjZU9wdGlvbnMpO1xyXG4gICAgc291cmNlLm9sLmFkZEZlYXR1cmVzKG9sRmVhdHVyZXMpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgdGl0bGU6IGxheWVyVGl0bGUsXHJcbiAgICBzb3VyY2UsXHJcbiAgICBzdHlsZVxyXG4gIH0pO1xyXG4gIG1hcC5hZGRMYXllcihsYXllcik7XHJcblxyXG4gIHJldHVybiBsYXllcjtcclxufVxyXG4iXX0=