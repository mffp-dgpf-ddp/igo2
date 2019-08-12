/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as olextent from 'ol/extent';
import * as olproj from 'ol/proj';
import * as olstyle from 'ol/style';
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import { getEntityId, getEntityTitle, getEntityRevision, getEntityProperty } from '@igo2/common';
import { VectorLayer } from '../../layer';
import { FeatureDataSource } from '../../datasource';
import { FEATURE, FeatureMotion } from './feature.enums';
import { FeatureStoreLoadingStrategy, FeatureStoreSelectionStrategy } from './strategies';
/**
 * Create an Openlayers feature object out of a feature definition.
 * The output object has a reference to the feature id.
 * @param {?} feature Feature definition
 * @param {?} projectionOut Feature object projection
 * @param {?=} getId
 * @return {?} OpenLayers feature object
 */
export function featureToOl(feature, projectionOut, getId) {
    getId = getId ? getId : getEntityId;
    /** @type {?} */
    var olFormat = new OlFormatGeoJSON();
    /** @type {?} */
    var olFeature = olFormat.readFeature(feature, {
        dataProjection: feature.projection,
        featureProjection: projectionOut
    });
    olFeature.setId(getId(feature));
    /** @type {?} */
    var title = getEntityTitle(feature);
    if (title !== undefined) {
        olFeature.set('_title', title, true);
    }
    if (feature.extent !== undefined) {
        olFeature.set('_extent', feature.extent, true);
    }
    if (feature.projection !== undefined) {
        olFeature.set('_projection', feature.projection, true);
    }
    if (feature.extent !== undefined) {
        olFeature.set('_extent', feature.extent, true);
    }
    /** @type {?} */
    var mapTitle = getEntityProperty(feature, 'meta.mapTitle');
    if (mapTitle !== undefined) {
        olFeature.set('_mapTitle', mapTitle, true);
    }
    olFeature.set('_entityRevision', getEntityRevision(feature), true);
    return olFeature;
}
/**
 * Create a feature object out of an OL feature
 * The output object has a reference to the feature id.
 * @param {?} olFeature OL Feature
 * @param {?} projectionIn OL feature projection
 * @param {?=} olLayer
 * @param {?=} projectionOut Feature projection
 * @return {?} Feature
 */
export function featureFromOl(olFeature, projectionIn, olLayer, projectionOut) {
    if (projectionOut === void 0) { projectionOut = 'EPSG:4326'; }
    /** @type {?} */
    var title;
    /** @type {?} */
    var typeSource;
    /** @type {?} */
    var olFormat = new OlFormatGeoJSON();
    /** @type {?} */
    var keys = olFeature.getKeys().filter((/**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return !key.startsWith('_') && key !== 'geometry';
    }));
    /** @type {?} */
    var properties = keys.reduce((/**
     * @param {?} acc
     * @param {?} key
     * @return {?}
     */
    function (acc, key) {
        acc[key] = olFeature.get(key);
        return acc;
    }), {});
    /** @type {?} */
    var geometry = olFormat.writeGeometryObject(olFeature.getGeometry(), {
        dataProjection: projectionOut,
        featureProjection: projectionIn
    });
    if (olLayer) {
        title = olLayer.get('title');
        typeSource = olLayer.get('sourceOptions').type;
    }
    else {
        title = olFeature.get('_title');
    }
    /** @type {?} */
    var mapTitle = olFeature.get('_mapTitle');
    /** @type {?} */
    var id = olFeature.getId();
    return {
        type: FEATURE,
        projection: projectionOut,
        extent: olFeature.get('_extent'),
        meta: {
            id: id,
            title: title ? title : (mapTitle ? mapTitle : id),
            mapTitle: mapTitle,
            typeSource: typeSource,
            revision: olFeature.getRevision()
        },
        properties: properties,
        geometry: geometry
    };
}
/**
 * Compute an OL feature extent in it's map projection
 * @param {?} map Map
 * @param {?} olFeature OL feature
 * @return {?} Extent in the map projection
 */
export function computeOlFeatureExtent(map, olFeature) {
    /** @type {?} */
    var olExtent = olextent.createEmpty();
    /** @type {?} */
    var olFeatureExtent = olFeature.get('_extent');
    /** @type {?} */
    var olFeatureProjection = olFeature.get('_projection');
    if (olFeatureExtent !== undefined && olFeatureProjection !== undefined) {
        olExtent = olproj.transformExtent(olFeatureExtent, olFeatureProjection, map.projection);
    }
    else {
        /** @type {?} */
        var olGeometry = olFeature.getGeometry();
        if (olGeometry !== null) {
            olExtent = olGeometry.getExtent();
        }
    }
    return olExtent;
}
/**
 * Compute a multiple OL features extent in their map projection
 * @param {?} map Map
 * @param {?} olFeatures OL features
 * @return {?} Extent in the map projection
 */
export function computeOlFeaturesExtent(map, olFeatures) {
    /** @type {?} */
    var extent = olextent.createEmpty();
    olFeatures.forEach((/**
     * @param {?} olFeature
     * @return {?}
     */
    function (olFeature) {
        /** @type {?} */
        var featureExtent = computeOlFeatureExtent(map, olFeature);
        olextent.extend(extent, featureExtent);
    }));
    return extent;
}
/**
 * Scale an extent.
 * @param {?} extent Extent
 * @param {?} scale
 * @return {?} Scaled extent
 */
export function scaleExtent(extent, scale) {
    var _a = tslib_1.__read(olextent.getSize(extent), 2), width = _a[0], height = _a[1];
    return [
        scale[3] ? extent[0] - width * scale[3] : extent[0],
        scale[2] ? extent[1] - height * scale[2] : extent[1],
        scale[1] ? extent[2] + width * scale[1] : extent[2],
        scale[0] ? extent[3] + height * scale[0] : extent[3]
    ];
}
/**
 * Return true if features are out of view.
 * If features are too close to the edge, they are considered out of view.
 * We define the edge as 5% of the extent size.
 * @param {?} map Map
 * @param {?} featuresExtent The features's extent
 * @return {?} Return true if features are out of view
 */
export function featuresAreOutOfView(map, featuresExtent) {
    /** @type {?} */
    var mapExtent = map.getExtent();
    /** @type {?} */
    var edgeRatio = 0.05;
    /** @type {?} */
    var scale = [-1, -1, -1, -1].map((/**
     * @param {?} x
     * @return {?}
     */
    function (x) { return x * edgeRatio; }));
    /** @type {?} */
    var viewExtent = scaleExtent(mapExtent, (/** @type {?} */ (scale)));
    return !olextent.containsExtent(viewExtent, featuresExtent);
}
/**
 * Return true if features are too deep into the view. This results
 * in features being too small.
 * Features are considered too small if their extent occupies less than
 * 1% of the map extent.
 * @param {?} map Map
 * @param {?} featuresExtent The features's extent
 * @param {?=} areaRatio The features extent to view extent acceptable ratio
 * @return {?} Return true if features are too deep in the view
 */
export function featuresAreTooDeepInView(map, featuresExtent, areaRatio) {
    // An area ratio of 0.004 means that the feature extent's width and height
    // should be about 1/16 of the map extent's width and height
    areaRatio = areaRatio ? areaRatio : 0.004;
    /** @type {?} */
    var mapExtent = map.getExtent();
    /** @type {?} */
    var mapExtentArea = olextent.getArea(mapExtent);
    /** @type {?} */
    var featuresExtentArea = olextent.getArea(featuresExtent);
    return featuresExtentArea / mapExtentArea < areaRatio;
}
/**
 * Fit view to include the features extent.
 * By default, this method will let the features occupy about 50% of the viewport.
 * @param {?} map Map
 * @param {?} olFeatures OL features
 * @param {?=} motion To motion to the new map view
 * @param {?=} scale If this is defined, the original view will be scaled
 *  by that factor before any logic is applied.
 * @param {?=} areaRatio
 * @return {?}
 */
export function moveToOlFeatures(map, olFeatures, motion, scale, areaRatio) {
    if (motion === void 0) { motion = FeatureMotion.Default; }
    /** @type {?} */
    var featuresExtent = computeOlFeaturesExtent(map, olFeatures);
    /** @type {?} */
    var viewExtent = featuresExtent;
    if (scale !== undefined) {
        viewExtent = scaleExtent(viewExtent, scale);
    }
    if (motion === FeatureMotion.Zoom) {
        map.viewController.zoomToExtent(viewExtent);
    }
    else if (motion === FeatureMotion.Move) {
        map.viewController.moveToExtent(viewExtent);
    }
    else if (motion === FeatureMotion.Default) {
        if (featuresAreOutOfView(map, featuresExtent) ||
            featuresAreTooDeepInView(map, featuresExtent, areaRatio)) {
            map.viewController.zoomToExtent(viewExtent);
        }
    }
}
/**
 * Hide an OL feature
 * @param {?} olFeature OL feature
 * @return {?}
 */
export function hideOlFeature(olFeature) {
    olFeature.setStyle(new olstyle.Style({}));
}
/**
 * Try to bind a layer to a store if none is bound already.
 * The layer will also be added to the store's map.
 * If no layer is given to that function, a basic one will be created.
 * @param {?} store The store to bind the layer
 * @param {?=} layer An optional VectorLayer
 * @return {?}
 */
export function tryBindStoreLayer(store, layer) {
    if (store.layer !== undefined) {
        if (store.layer.map === undefined) {
            store.map.addLayer(store.layer);
        }
        return;
    }
    layer = layer ? layer : new VectorLayer({
        source: new FeatureDataSource()
    });
    store.bindLayer(layer);
    if (store.layer.map === undefined) {
        store.map.addLayer(store.layer);
    }
}
/**
 * Try to add a loading strategy to a store and activate it.
 * If no strategy is given to that function, a basic one will be created.
 * @param {?} store The store to bind the loading strategy
 * @param {?=} strategy An optional loading strategy
 * @return {?}
 */
export function tryAddLoadingStrategy(store, strategy) {
    if (store.getStrategyOfType(FeatureStoreLoadingStrategy) !== undefined) {
        store.activateStrategyOfType(FeatureStoreLoadingStrategy);
        return;
    }
    strategy = strategy ? strategy : new FeatureStoreLoadingStrategy({});
    store.addStrategy(strategy);
    strategy.activate();
}
/**
 * Try to add a selection strategy to a store and activate it.
 * If no strategy is given to that function, a basic one will be created.
 * @param {?} store The store to bind the selection strategy
 * @param {?=} strategy
 * @return {?}
 */
export function tryAddSelectionStrategy(store, strategy) {
    if (store.getStrategyOfType(FeatureStoreSelectionStrategy) !== undefined) {
        store.activateStrategyOfType(FeatureStoreSelectionStrategy);
        return;
    }
    strategy = strategy ? strategy : new FeatureStoreSelectionStrategy({
        map: store.map
    });
    store.addStrategy(strategy);
    strategy.activate();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFHaEQsT0FBTyxFQUVMLFdBQVcsRUFDWCxjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNsQixNQUFNLGNBQWMsQ0FBQztBQUd0QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQiw2QkFBNkIsRUFDOUIsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7OztBQVN0QixNQUFNLFVBQVUsV0FBVyxDQUN6QixPQUFnQixFQUNoQixhQUFxQixFQUNyQixLQUE4QjtJQUU5QixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQzs7UUFFOUIsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFOztRQUNoQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7UUFDOUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxVQUFVO1FBQ2xDLGlCQUFpQixFQUFFLGFBQWE7S0FDakMsQ0FBQztJQUVGLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1FBRTFCLEtB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QUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQzs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsS0FBbUIsRUFBRSxRQUFzQztJQUMvRixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN0RSxLQUFLLENBQUMsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxRCxPQUFPO0tBQ1I7SUFFRCxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQTJCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsS0FBbUIsRUFBRSxRQUF3QztJQUNuRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN4RSxLQUFLLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1RCxPQUFPO0tBQ1I7SUFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksNkJBQTZCLENBQUM7UUFDakUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgT2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcblxyXG5pbXBvcnQge1xyXG4gIEVudGl0eUtleSxcclxuICBnZXRFbnRpdHlJZCxcclxuICBnZXRFbnRpdHlUaXRsZSxcclxuICBnZXRFbnRpdHlSZXZpc2lvbixcclxuICBnZXRFbnRpdHlQcm9wZXJ0eVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4vZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSxcclxuICBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJy4vc3RyYXRlZ2llcyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIE9wZW5sYXllcnMgZmVhdHVyZSBvYmplY3Qgb3V0IG9mIGEgZmVhdHVyZSBkZWZpbml0aW9uLlxyXG4gKiBUaGUgb3V0cHV0IG9iamVjdCBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGZlYXR1cmUgaWQuXHJcbiAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmUgZGVmaW5pdGlvblxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbk91dCBGZWF0dXJlIG9iamVjdCBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIE9wZW5MYXllcnMgZmVhdHVyZSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlVG9PbChcclxuICBmZWF0dXJlOiBGZWF0dXJlLFxyXG4gIHByb2plY3Rpb25PdXQ6IHN0cmluZyxcclxuICBnZXRJZD86IChGZWF0dXJlKSA9PiBFbnRpdHlLZXlcclxuKTogT2xGZWF0dXJlIHtcclxuICBnZXRJZCA9IGdldElkID8gZ2V0SWQgOiBnZXRFbnRpdHlJZDtcclxuXHJcbiAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcbiAgY29uc3Qgb2xGZWF0dXJlID0gb2xGb3JtYXQucmVhZEZlYXR1cmUoZmVhdHVyZSwge1xyXG4gICAgZGF0YVByb2plY3Rpb246IGZlYXR1cmUucHJvamVjdGlvbixcclxuICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0XHJcbiAgfSk7XHJcblxyXG4gIG9sRmVhdHVyZS5zZXRJZChnZXRJZChmZWF0dXJlKSk7XHJcblxyXG4gIGNvbnN0IHRpdGxlID0gZ2V0RW50aXR5VGl0bGUoZmVhdHVyZSk7XHJcbiAgaWYgKHRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ190aXRsZScsIHRpdGxlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLmV4dGVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfZXh0ZW50JywgZmVhdHVyZS5leHRlbnQsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUucHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfcHJvamVjdGlvbicsIGZlYXR1cmUucHJvamVjdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5leHRlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX2V4dGVudCcsIGZlYXR1cmUuZXh0ZW50LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hcFRpdGxlID0gZ2V0RW50aXR5UHJvcGVydHkoZmVhdHVyZSwgJ21ldGEubWFwVGl0bGUnKTtcclxuICBpZiAobWFwVGl0bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX21hcFRpdGxlJywgbWFwVGl0bGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb2xGZWF0dXJlLnNldCgnX2VudGl0eVJldmlzaW9uJywgZ2V0RW50aXR5UmV2aXNpb24oZmVhdHVyZSksIHRydWUpO1xyXG5cclxuICByZXR1cm4gb2xGZWF0dXJlO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZmVhdHVyZSBvYmplY3Qgb3V0IG9mIGFuIE9MIGZlYXR1cmVcclxuICogVGhlIG91dHB1dCBvYmplY3QgaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBmZWF0dXJlIGlkLlxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIEZlYXR1cmVcclxuICogQHBhcmFtIHByb2plY3Rpb25JbiBPTCBmZWF0dXJlIHByb2plY3Rpb25cclxuICogQHBhcmFtIHByb2plY3Rpb25PdXQgRmVhdHVyZSBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIEZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlRnJvbU9sKFxyXG4gIG9sRmVhdHVyZTogT2xGZWF0dXJlLFxyXG4gIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gIG9sTGF5ZXI/OiBPbExheWVyLFxyXG4gIHByb2plY3Rpb25PdXQgPSAnRVBTRzo0MzI2J1xyXG4pOiBGZWF0dXJlIHtcclxuICBsZXQgdGl0bGU7XHJcbiAgbGV0IHR5cGVTb3VyY2U7XHJcbiAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIGNvbnN0IGtleXMgPSBvbEZlYXR1cmUuZ2V0S2V5cygpLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiAha2V5LnN0YXJ0c1dpdGgoJ18nKSAmJiBrZXkgIT09ICdnZW9tZXRyeSc7XHJcbiAgfSk7XHJcbiAgY29uc3QgcHJvcGVydGllcyA9IGtleXMucmVkdWNlKChhY2M6IG9iamVjdCwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgIGFjY1trZXldID0gb2xGZWF0dXJlLmdldChrZXkpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcblxyXG4gIGNvbnN0IGdlb21ldHJ5ID0gb2xGb3JtYXQud3JpdGVHZW9tZXRyeU9iamVjdChvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKSwge1xyXG4gICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluXHJcbiAgfSk7XHJcblxyXG4gIGlmIChvbExheWVyKSB7XHJcbiAgICB0aXRsZSA9IG9sTGF5ZXIuZ2V0KCd0aXRsZScpO1xyXG4gICAgdHlwZVNvdXJjZSA9IG9sTGF5ZXIuZ2V0KCdzb3VyY2VPcHRpb25zJykudHlwZTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGl0bGUgPSBvbEZlYXR1cmUuZ2V0KCdfdGl0bGUnKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hcFRpdGxlID0gb2xGZWF0dXJlLmdldCgnX21hcFRpdGxlJyk7XHJcbiAgY29uc3QgaWQgPSBvbEZlYXR1cmUuZ2V0SWQoKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgZXh0ZW50OiBvbEZlYXR1cmUuZ2V0KCdfZXh0ZW50JyksXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGlkLFxyXG4gICAgICB0aXRsZTogdGl0bGUgPyB0aXRsZSA6IChtYXBUaXRsZSA/IG1hcFRpdGxlIDogaWQpLFxyXG4gICAgICBtYXBUaXRsZSxcclxuICAgICAgdHlwZVNvdXJjZSxcclxuICAgICAgcmV2aXNpb246IG9sRmVhdHVyZS5nZXRSZXZpc2lvbigpXHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllcyxcclxuICAgIGdlb21ldHJ5XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYW4gT0wgZmVhdHVyZSBleHRlbnQgaW4gaXQncyBtYXAgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIGZlYXR1cmVcclxuICogQHJldHVybnMgRXh0ZW50IGluIHRoZSBtYXAgcHJvamVjdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVPbEZlYXR1cmVFeHRlbnQoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlOiBPbEZlYXR1cmVcclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGxldCBvbEV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcblxyXG4gIGNvbnN0IG9sRmVhdHVyZUV4dGVudCA9IG9sRmVhdHVyZS5nZXQoJ19leHRlbnQnKTtcclxuICBjb25zdCBvbEZlYXR1cmVQcm9qZWN0aW9uID0gb2xGZWF0dXJlLmdldCgnX3Byb2plY3Rpb24nKTtcclxuICBpZiAob2xGZWF0dXJlRXh0ZW50ICE9PSB1bmRlZmluZWQgJiYgb2xGZWF0dXJlUHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEV4dGVudCA9IG9scHJvai50cmFuc2Zvcm1FeHRlbnQoXHJcbiAgICAgIG9sRmVhdHVyZUV4dGVudCxcclxuICAgICAgb2xGZWF0dXJlUHJvamVjdGlvbixcclxuICAgICAgbWFwLnByb2plY3Rpb25cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgIGlmIChvbEdlb21ldHJ5ICE9PSBudWxsKSB7XHJcbiAgICAgIG9sRXh0ZW50ID0gb2xHZW9tZXRyeS5nZXRFeHRlbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvbEV4dGVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYSBtdWx0aXBsZSBPTCBmZWF0dXJlcyBleHRlbnQgaW4gdGhlaXIgbWFwIHByb2plY3Rpb25cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZXNcclxuICogQHJldHVybnMgRXh0ZW50IGluIHRoZSBtYXAgcHJvamVjdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVPbEZlYXR1cmVzRXh0ZW50KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBjb25zdCBleHRlbnQgPSBvbGV4dGVudC5jcmVhdGVFbXB0eSgpO1xyXG5cclxuICBvbEZlYXR1cmVzLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICBjb25zdCBmZWF0dXJlRXh0ZW50ID0gY29tcHV0ZU9sRmVhdHVyZUV4dGVudChtYXAsIG9sRmVhdHVyZSk7XHJcbiAgICBvbGV4dGVudC5leHRlbmQoZXh0ZW50LCBmZWF0dXJlRXh0ZW50KTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGV4dGVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNjYWxlIGFuIGV4dGVudC5cclxuICogQHBhcmFtIGV4dGVudCBFeHRlbnRcclxuICogQHBhcmFtIFNjYWxpbmcgZmFjdG9ycyBmb3IgdG9wLCByaWdodCwgYm90dG9tIGFuZCBsZWZ0IGRpcmVjdGlvbnMsIGluIHRoYXQgb3JkZXJcclxuICogQHJldHVybnMgU2NhbGVkIGV4dGVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlRXh0ZW50KFxyXG4gIGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgc2NhbGU6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBvbGV4dGVudC5nZXRTaXplKGV4dGVudCk7XHJcbiAgcmV0dXJuIFtcclxuICAgIHNjYWxlWzNdID8gZXh0ZW50WzBdIC0gd2lkdGggKiBzY2FsZVszXSA6IGV4dGVudFswXSxcclxuICAgIHNjYWxlWzJdID8gZXh0ZW50WzFdIC0gaGVpZ2h0ICogc2NhbGVbMl0gOiBleHRlbnRbMV0sXHJcbiAgICBzY2FsZVsxXSA/IGV4dGVudFsyXSArIHdpZHRoICogc2NhbGVbMV0gOiBleHRlbnRbMl0sXHJcbiAgICBzY2FsZVswXSA/IGV4dGVudFszXSArIGhlaWdodCAqIHNjYWxlWzBdIDogZXh0ZW50WzNdXHJcbiAgXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSBvdXQgb2Ygdmlldy5cclxuICogSWYgZmVhdHVyZXMgYXJlIHRvbyBjbG9zZSB0byB0aGUgZWRnZSwgdGhleSBhcmUgY29uc2lkZXJlZCBvdXQgb2Ygdmlldy5cclxuICogV2UgZGVmaW5lIHRoZSBlZGdlIGFzIDUlIG9mIHRoZSBleHRlbnQgc2l6ZS5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIGZlYXR1cmVzRXh0ZW50IFRoZSBmZWF0dXJlcydzIGV4dGVudFxyXG4gKiBAcmV0dXJucyBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgb3V0IG9mIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlc0FyZU91dE9mVmlldyhcclxuICBtYXA6IElnb01hcCxcclxuICBmZWF0dXJlc0V4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuKSB7XHJcbiAgY29uc3QgbWFwRXh0ZW50ID0gbWFwLmdldEV4dGVudCgpO1xyXG4gIGNvbnN0IGVkZ2VSYXRpbyA9IDAuMDU7XHJcbiAgY29uc3Qgc2NhbGUgPSBbLTEsIC0xLCAtMSwgLTFdLm1hcCh4ID0+IHggKiBlZGdlUmF0aW8pO1xyXG4gIGNvbnN0IHZpZXdFeHRlbnQgPSBzY2FsZUV4dGVudChtYXBFeHRlbnQsIHNjYWxlIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdKTtcclxuXHJcbiAgcmV0dXJuICFvbGV4dGVudC5jb250YWluc0V4dGVudCh2aWV3RXh0ZW50LCBmZWF0dXJlc0V4dGVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgdG9vIGRlZXAgaW50byB0aGUgdmlldy4gVGhpcyByZXN1bHRzXHJcbiAqIGluIGZlYXR1cmVzIGJlaW5nIHRvbyBzbWFsbC5cclxuICogRmVhdHVyZXMgYXJlIGNvbnNpZGVyZWQgdG9vIHNtYWxsIGlmIHRoZWlyIGV4dGVudCBvY2N1cGllcyBsZXNzIHRoYW5cclxuICogMSUgb2YgdGhlIG1hcCBleHRlbnQuXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBmZWF0dXJlc0V4dGVudCBUaGUgZmVhdHVyZXMncyBleHRlbnRcclxuICogQHBhcmFtIGFyZWFSYXRpbyBUaGUgZmVhdHVyZXMgZXh0ZW50IHRvIHZpZXcgZXh0ZW50IGFjY2VwdGFibGUgcmF0aW9cclxuICogQHJldHVybnMgUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIHRvbyBkZWVwIGluIHRoZSB2aWV3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZXNBcmVUb29EZWVwSW5WaWV3KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIGZlYXR1cmVzRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBhcmVhUmF0aW8/OiBudW1iZXJcclxuKSB7XHJcbiAgLy8gQW4gYXJlYSByYXRpbyBvZiAwLjAwNCBtZWFucyB0aGF0IHRoZSBmZWF0dXJlIGV4dGVudCdzIHdpZHRoIGFuZCBoZWlnaHRcclxuICAvLyBzaG91bGQgYmUgYWJvdXQgMS8xNiBvZiB0aGUgbWFwIGV4dGVudCdzIHdpZHRoIGFuZCBoZWlnaHRcclxuICBhcmVhUmF0aW8gPSBhcmVhUmF0aW8gPyBhcmVhUmF0aW8gOiAwLjAwNDtcclxuICBjb25zdCBtYXBFeHRlbnQgPSBtYXAuZ2V0RXh0ZW50KCk7XHJcbiAgY29uc3QgbWFwRXh0ZW50QXJlYSA9IG9sZXh0ZW50LmdldEFyZWEobWFwRXh0ZW50KTtcclxuICBjb25zdCBmZWF0dXJlc0V4dGVudEFyZWEgPSBvbGV4dGVudC5nZXRBcmVhKGZlYXR1cmVzRXh0ZW50KTtcclxuXHJcbiAgcmV0dXJuIGZlYXR1cmVzRXh0ZW50QXJlYSAvIG1hcEV4dGVudEFyZWEgPCBhcmVhUmF0aW87XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaXQgdmlldyB0byBpbmNsdWRlIHRoZSBmZWF0dXJlcyBleHRlbnQuXHJcbiAqIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIHdpbGwgbGV0IHRoZSBmZWF0dXJlcyBvY2N1cHkgYWJvdXQgNTAlIG9mIHRoZSB2aWV3cG9ydC5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZXNcclxuICogQHBhcmFtIG1vdGlvbiBUbyBtb3Rpb24gdG8gdGhlIG5ldyBtYXAgdmlld1xyXG4gKiBAcGFyYW0gc2NhbGUgSWYgdGhpcyBpcyBkZWZpbmVkLCB0aGUgb3JpZ2luYWwgdmlldyB3aWxsIGJlIHNjYWxlZFxyXG4gKiAgYnkgdGhhdCBmYWN0b3IgYmVmb3JlIGFueSBsb2dpYyBpcyBhcHBsaWVkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb09sRmVhdHVyZXMoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0LFxyXG4gIHNjYWxlPzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgYXJlYVJhdGlvPzogbnVtYmVyXHJcbikge1xyXG4gIGNvbnN0IGZlYXR1cmVzRXh0ZW50ID0gY29tcHV0ZU9sRmVhdHVyZXNFeHRlbnQobWFwLCBvbEZlYXR1cmVzKTtcclxuICBsZXQgdmlld0V4dGVudCA9IGZlYXR1cmVzRXh0ZW50O1xyXG4gIGlmIChzY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB2aWV3RXh0ZW50ID0gc2NhbGVFeHRlbnQodmlld0V4dGVudCwgc2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5ab29tKSB7XHJcbiAgICBtYXAudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KHZpZXdFeHRlbnQpO1xyXG4gIH0gZWxzZSBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLk1vdmUpIHtcclxuICAgIG1hcC52aWV3Q29udHJvbGxlci5tb3ZlVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgfSBlbHNlIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uRGVmYXVsdCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBmZWF0dXJlc0FyZU91dE9mVmlldyhtYXAsIGZlYXR1cmVzRXh0ZW50KSB8fFxyXG4gICAgICBmZWF0dXJlc0FyZVRvb0RlZXBJblZpZXcobWFwLCBmZWF0dXJlc0V4dGVudCwgYXJlYVJhdGlvKVxyXG4gICAgKSB7XHJcbiAgICAgIG1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGlkZSBhbiBPTCBmZWF0dXJlXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVPbEZlYXR1cmUob2xGZWF0dXJlOiBPbEZlYXR1cmUpIHtcclxuICBvbEZlYXR1cmUuc2V0U3R5bGUobmV3IG9sc3R5bGUuU3R5bGUoe30pKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBiaW5kIGEgbGF5ZXIgdG8gYSBzdG9yZSBpZiBub25lIGlzIGJvdW5kIGFscmVhZHkuXHJcbiAqIFRoZSBsYXllciB3aWxsIGFsc28gYmUgYWRkZWQgdG8gdGhlIHN0b3JlJ3MgbWFwLlxyXG4gKiBJZiBubyBsYXllciBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgbGF5ZXJcclxuICogQHBhcmFtIGxheWVyIEFuIG9wdGlvbmFsIFZlY3RvckxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QmluZFN0b3JlTGF5ZXIoc3RvcmU6IEZlYXR1cmVTdG9yZSwgbGF5ZXI/OiBWZWN0b3JMYXllcikge1xyXG4gIGlmIChzdG9yZS5sYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAoc3RvcmUubGF5ZXIubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3RvcmUubWFwLmFkZExheWVyKHN0b3JlLmxheWVyKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxheWVyID0gbGF5ZXIgPyBsYXllciA6IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICBzb3VyY2U6IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpXHJcbiAgfSk7XHJcbiAgc3RvcmUuYmluZExheWVyKGxheWVyKTtcclxuICBpZiAoc3RvcmUubGF5ZXIubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLm1hcC5hZGRMYXllcihzdG9yZS5sYXllcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGFkZCBhIGxvYWRpbmcgc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgYWN0aXZhdGUgaXQuXHJcbiAqIElmIG5vIHN0cmF0ZWd5IGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAqIEBwYXJhbSBzdHJhdGVneSBBbiBvcHRpb25hbCBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QWRkTG9hZGluZ1N0cmF0ZWd5KHN0b3JlOiBGZWF0dXJlU3RvcmUsIHN0cmF0ZWd5PzogRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KSB7XHJcbiAgaWYgKHN0b3JlLmdldFN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUuYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgc3RyYXRlZ3kgPSBzdHJhdGVneSA/IHN0cmF0ZWd5IDogbmV3IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSh7fSk7XHJcbiAgc3RvcmUuYWRkU3RyYXRlZ3koc3RyYXRlZ3kpO1xyXG4gIHN0cmF0ZWd5LmFjdGl2YXRlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYWRkIGEgc2VsZWN0aW9uIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGFjdGl2YXRlIGl0LlxyXG4gKiBJZiBubyBzdHJhdGVneSBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgc2VsZWN0aW9uIHN0cmF0ZWd5XHJcbiAqIEBwYXJhbSBbc3RyYXRlZ3ldIEFuIG9wdGlvbmFsIHNlbGVjdGlvbiBzdHJhdGVneVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyeUFkZFNlbGVjdGlvblN0cmF0ZWd5KHN0b3JlOiBGZWF0dXJlU3RvcmUsIHN0cmF0ZWd5PzogRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpIHtcclxuICBpZiAoc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLmFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBzdHJhdGVneSA9IHN0cmF0ZWd5ID8gc3RyYXRlZ3kgOiBuZXcgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3koe1xyXG4gICAgbWFwOiBzdG9yZS5tYXBcclxuICB9KTtcclxuICBzdG9yZS5hZGRTdHJhdGVneShzdHJhdGVneSk7XHJcbiAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxufVxyXG4iXX0=