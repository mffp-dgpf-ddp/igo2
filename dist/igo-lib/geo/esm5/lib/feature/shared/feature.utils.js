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
 * @param {?=} olLayer OL Layer
 * @param {?=} projectionOut Feature projection
 * @return {?} Feature
 */
export function featureFromOl(olFeature, projectionIn, olLayer, projectionOut) {
    if (projectionOut === void 0) { projectionOut = 'EPSG:4326'; }
    /** @type {?} */
    var title;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFHaEQsT0FBTyxFQUVMLFdBQVcsRUFDWCxjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNsQixNQUFNLGNBQWMsQ0FBQztBQUd0QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQiw2QkFBNkIsRUFDOUIsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7OztBQVN0QixNQUFNLFVBQVUsV0FBVyxDQUN6QixPQUFnQixFQUNoQixhQUFxQixFQUNyQixLQUE4QjtJQUU5QixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQzs7UUFFOUIsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFOztRQUNoQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7UUFDOUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxVQUFVO1FBQ2xDLGlCQUFpQixFQUFFLGFBQWE7S0FDakMsQ0FBQztJQUVGLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1FBRTFCLEtB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QUMvRixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN0RSxLQUFLLENBQUMsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxRCxPQUFPO0tBQ1I7SUFFRCxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQTJCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsS0FBbUIsRUFBRSxRQUF3QztJQUNuRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN4RSxLQUFLLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1RCxPQUFPO0tBQ1I7SUFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksNkJBQTZCLENBQUM7UUFDakUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgT2xMYXllciBmcm9tICdvbC9MYXllcic7XHJcblxyXG5pbXBvcnQge1xyXG4gIEVudGl0eUtleSxcclxuICBnZXRFbnRpdHlJZCxcclxuICBnZXRFbnRpdHlUaXRsZSxcclxuICBnZXRFbnRpdHlSZXZpc2lvbixcclxuICBnZXRFbnRpdHlQcm9wZXJ0eVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4vZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSxcclxuICBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJy4vc3RyYXRlZ2llcyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIE9wZW5sYXllcnMgZmVhdHVyZSBvYmplY3Qgb3V0IG9mIGEgZmVhdHVyZSBkZWZpbml0aW9uLlxyXG4gKiBUaGUgb3V0cHV0IG9iamVjdCBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGZlYXR1cmUgaWQuXHJcbiAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmUgZGVmaW5pdGlvblxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbk91dCBGZWF0dXJlIG9iamVjdCBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIE9wZW5MYXllcnMgZmVhdHVyZSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlVG9PbChcclxuICBmZWF0dXJlOiBGZWF0dXJlLFxyXG4gIHByb2plY3Rpb25PdXQ6IHN0cmluZyxcclxuICBnZXRJZD86IChGZWF0dXJlKSA9PiBFbnRpdHlLZXlcclxuKTogT2xGZWF0dXJlIHtcclxuICBnZXRJZCA9IGdldElkID8gZ2V0SWQgOiBnZXRFbnRpdHlJZDtcclxuXHJcbiAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcbiAgY29uc3Qgb2xGZWF0dXJlID0gb2xGb3JtYXQucmVhZEZlYXR1cmUoZmVhdHVyZSwge1xyXG4gICAgZGF0YVByb2plY3Rpb246IGZlYXR1cmUucHJvamVjdGlvbixcclxuICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0XHJcbiAgfSk7XHJcblxyXG4gIG9sRmVhdHVyZS5zZXRJZChnZXRJZChmZWF0dXJlKSk7XHJcblxyXG4gIGNvbnN0IHRpdGxlID0gZ2V0RW50aXR5VGl0bGUoZmVhdHVyZSk7XHJcbiAgaWYgKHRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ190aXRsZScsIHRpdGxlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLmV4dGVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfZXh0ZW50JywgZmVhdHVyZS5leHRlbnQsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUucHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfcHJvamVjdGlvbicsIGZlYXR1cmUucHJvamVjdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5leHRlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX2V4dGVudCcsIGZlYXR1cmUuZXh0ZW50LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hcFRpdGxlID0gZ2V0RW50aXR5UHJvcGVydHkoZmVhdHVyZSwgJ21ldGEubWFwVGl0bGUnKTtcclxuICBpZiAobWFwVGl0bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX21hcFRpdGxlJywgbWFwVGl0bGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb2xGZWF0dXJlLnNldCgnX2VudGl0eVJldmlzaW9uJywgZ2V0RW50aXR5UmV2aXNpb24oZmVhdHVyZSksIHRydWUpO1xyXG5cclxuICByZXR1cm4gb2xGZWF0dXJlO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZmVhdHVyZSBvYmplY3Qgb3V0IG9mIGFuIE9MIGZlYXR1cmVcclxuICogVGhlIG91dHB1dCBvYmplY3QgaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBmZWF0dXJlIGlkLlxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIEZlYXR1cmVcclxuICogQHBhcmFtIHByb2plY3Rpb25JbiBPTCBmZWF0dXJlIHByb2plY3Rpb25cclxuICogQHBhcmFtIG9sTGF5ZXIgT0wgTGF5ZXJcclxuICogQHBhcmFtIHByb2plY3Rpb25PdXQgRmVhdHVyZSBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIEZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlRnJvbU9sKFxyXG4gIG9sRmVhdHVyZTogT2xGZWF0dXJlLFxyXG4gIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gIG9sTGF5ZXI/OiBPbExheWVyLFxyXG4gIHByb2plY3Rpb25PdXQgPSAnRVBTRzo0MzI2J1xyXG4pOiBGZWF0dXJlIHtcclxuICBsZXQgdGl0bGU7XHJcbiAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIGNvbnN0IGtleXMgPSBvbEZlYXR1cmUuZ2V0S2V5cygpLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiAha2V5LnN0YXJ0c1dpdGgoJ18nKSAmJiBrZXkgIT09ICdnZW9tZXRyeSc7XHJcbiAgfSk7XHJcbiAgY29uc3QgcHJvcGVydGllcyA9IGtleXMucmVkdWNlKChhY2M6IG9iamVjdCwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgIGFjY1trZXldID0gb2xGZWF0dXJlLmdldChrZXkpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcblxyXG4gIGNvbnN0IGdlb21ldHJ5ID0gb2xGb3JtYXQud3JpdGVHZW9tZXRyeU9iamVjdChvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKSwge1xyXG4gICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluXHJcbiAgfSk7XHJcblxyXG4gIGlmIChvbExheWVyKSB7XHJcbiAgICB0aXRsZSA9IG9sTGF5ZXIuZ2V0KCd0aXRsZScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aXRsZSA9IG9sRmVhdHVyZS5nZXQoJ190aXRsZScpO1xyXG4gIH1cclxuICBjb25zdCBtYXBUaXRsZSA9IG9sRmVhdHVyZS5nZXQoJ19tYXBUaXRsZScpO1xyXG4gIGNvbnN0IGlkID0gb2xGZWF0dXJlLmdldElkKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgcHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgIGV4dGVudDogb2xGZWF0dXJlLmdldCgnX2V4dGVudCcpLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBpZCxcclxuICAgICAgdGl0bGU6IHRpdGxlID8gdGl0bGUgOiAobWFwVGl0bGUgPyBtYXBUaXRsZSA6IGlkKSxcclxuICAgICAgbWFwVGl0bGUsXHJcbiAgICAgIHJldmlzaW9uOiBvbEZlYXR1cmUuZ2V0UmV2aXNpb24oKVxyXG4gICAgfSxcclxuICAgIHByb3BlcnRpZXMsXHJcbiAgICBnZW9tZXRyeVxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIGFuIE9MIGZlYXR1cmUgZXh0ZW50IGluIGl0J3MgbWFwIHByb2plY3Rpb25cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBmZWF0dXJlXHJcbiAqIEByZXR1cm5zIEV4dGVudCBpbiB0aGUgbWFwIHByb2plY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlT2xGZWF0dXJlRXh0ZW50KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG9sRmVhdHVyZTogT2xGZWF0dXJlXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBsZXQgb2xFeHRlbnQgPSBvbGV4dGVudC5jcmVhdGVFbXB0eSgpO1xyXG5cclxuICBjb25zdCBvbEZlYXR1cmVFeHRlbnQgPSBvbEZlYXR1cmUuZ2V0KCdfZXh0ZW50Jyk7XHJcbiAgY29uc3Qgb2xGZWF0dXJlUHJvamVjdGlvbiA9IG9sRmVhdHVyZS5nZXQoJ19wcm9qZWN0aW9uJyk7XHJcbiAgaWYgKG9sRmVhdHVyZUV4dGVudCAhPT0gdW5kZWZpbmVkICYmIG9sRmVhdHVyZVByb2plY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xFeHRlbnQgPSBvbHByb2oudHJhbnNmb3JtRXh0ZW50KFxyXG4gICAgICBvbEZlYXR1cmVFeHRlbnQsXHJcbiAgICAgIG9sRmVhdHVyZVByb2plY3Rpb24sXHJcbiAgICAgIG1hcC5wcm9qZWN0aW9uXHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gb2xGZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICBpZiAob2xHZW9tZXRyeSAhPT0gbnVsbCkge1xyXG4gICAgICBvbEV4dGVudCA9IG9sR2VvbWV0cnkuZ2V0RXh0ZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2xFeHRlbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIGEgbXVsdGlwbGUgT0wgZmVhdHVyZXMgZXh0ZW50IGluIHRoZWlyIG1hcCBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmVzIE9MIGZlYXR1cmVzXHJcbiAqIEByZXR1cm5zIEV4dGVudCBpbiB0aGUgbWFwIHByb2plY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlT2xGZWF0dXJlc0V4dGVudChcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgY29uc3QgZXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuXHJcbiAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgY29uc3QgZmVhdHVyZUV4dGVudCA9IGNvbXB1dGVPbEZlYXR1cmVFeHRlbnQobWFwLCBvbEZlYXR1cmUpO1xyXG4gICAgb2xleHRlbnQuZXh0ZW5kKGV4dGVudCwgZmVhdHVyZUV4dGVudCk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBleHRlbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTY2FsZSBhbiBleHRlbnQuXHJcbiAqIEBwYXJhbSBleHRlbnQgRXh0ZW50XHJcbiAqIEBwYXJhbSBTY2FsaW5nIGZhY3RvcnMgZm9yIHRvcCwgcmlnaHQsIGJvdHRvbSBhbmQgbGVmdCBkaXJlY3Rpb25zLCBpbiB0aGF0IG9yZGVyXHJcbiAqIEByZXR1cm5zIFNjYWxlZCBleHRlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUV4dGVudChcclxuICBleHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIHNjYWxlOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gb2xleHRlbnQuZ2V0U2l6ZShleHRlbnQpO1xyXG4gIHJldHVybiBbXHJcbiAgICBzY2FsZVszXSA/IGV4dGVudFswXSAtIHdpZHRoICogc2NhbGVbM10gOiBleHRlbnRbMF0sXHJcbiAgICBzY2FsZVsyXSA/IGV4dGVudFsxXSAtIGhlaWdodCAqIHNjYWxlWzJdIDogZXh0ZW50WzFdLFxyXG4gICAgc2NhbGVbMV0gPyBleHRlbnRbMl0gKyB3aWR0aCAqIHNjYWxlWzFdIDogZXh0ZW50WzJdLFxyXG4gICAgc2NhbGVbMF0gPyBleHRlbnRbM10gKyBoZWlnaHQgKiBzY2FsZVswXSA6IGV4dGVudFszXVxyXG4gIF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgb3V0IG9mIHZpZXcuXHJcbiAqIElmIGZlYXR1cmVzIGFyZSB0b28gY2xvc2UgdG8gdGhlIGVkZ2UsIHRoZXkgYXJlIGNvbnNpZGVyZWQgb3V0IG9mIHZpZXcuXHJcbiAqIFdlIGRlZmluZSB0aGUgZWRnZSBhcyA1JSBvZiB0aGUgZXh0ZW50IHNpemUuXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBmZWF0dXJlc0V4dGVudCBUaGUgZmVhdHVyZXMncyBleHRlbnRcclxuICogQHJldHVybnMgUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIG91dCBvZiB2aWV3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZXNBcmVPdXRPZlZpZXcoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgZmVhdHVyZXNFeHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdXHJcbikge1xyXG4gIGNvbnN0IG1hcEV4dGVudCA9IG1hcC5nZXRFeHRlbnQoKTtcclxuICBjb25zdCBlZGdlUmF0aW8gPSAwLjA1O1xyXG4gIGNvbnN0IHNjYWxlID0gWy0xLCAtMSwgLTEsIC0xXS5tYXAoeCA9PiB4ICogZWRnZVJhdGlvKTtcclxuICBjb25zdCB2aWV3RXh0ZW50ID0gc2NhbGVFeHRlbnQobWFwRXh0ZW50LCBzY2FsZSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSk7XHJcblxyXG4gIHJldHVybiAhb2xleHRlbnQuY29udGFpbnNFeHRlbnQodmlld0V4dGVudCwgZmVhdHVyZXNFeHRlbnQpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIHRvbyBkZWVwIGludG8gdGhlIHZpZXcuIFRoaXMgcmVzdWx0c1xyXG4gKiBpbiBmZWF0dXJlcyBiZWluZyB0b28gc21hbGwuXHJcbiAqIEZlYXR1cmVzIGFyZSBjb25zaWRlcmVkIHRvbyBzbWFsbCBpZiB0aGVpciBleHRlbnQgb2NjdXBpZXMgbGVzcyB0aGFuXHJcbiAqIDElIG9mIHRoZSBtYXAgZXh0ZW50LlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gZmVhdHVyZXNFeHRlbnQgVGhlIGZlYXR1cmVzJ3MgZXh0ZW50XHJcbiAqIEBwYXJhbSBhcmVhUmF0aW8gVGhlIGZlYXR1cmVzIGV4dGVudCB0byB2aWV3IGV4dGVudCBhY2NlcHRhYmxlIHJhdGlvXHJcbiAqIEByZXR1cm5zIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSB0b28gZGVlcCBpbiB0aGUgdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVzQXJlVG9vRGVlcEluVmlldyhcclxuICBtYXA6IElnb01hcCxcclxuICBmZWF0dXJlc0V4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgYXJlYVJhdGlvPzogbnVtYmVyXHJcbikge1xyXG4gIC8vIEFuIGFyZWEgcmF0aW8gb2YgMC4wMDQgbWVhbnMgdGhhdCB0aGUgZmVhdHVyZSBleHRlbnQncyB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgLy8gc2hvdWxkIGJlIGFib3V0IDEvMTYgb2YgdGhlIG1hcCBleHRlbnQncyB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgYXJlYVJhdGlvID0gYXJlYVJhdGlvID8gYXJlYVJhdGlvIDogMC4wMDQ7XHJcbiAgY29uc3QgbWFwRXh0ZW50ID0gbWFwLmdldEV4dGVudCgpO1xyXG4gIGNvbnN0IG1hcEV4dGVudEFyZWEgPSBvbGV4dGVudC5nZXRBcmVhKG1hcEV4dGVudCk7XHJcbiAgY29uc3QgZmVhdHVyZXNFeHRlbnRBcmVhID0gb2xleHRlbnQuZ2V0QXJlYShmZWF0dXJlc0V4dGVudCk7XHJcblxyXG4gIHJldHVybiBmZWF0dXJlc0V4dGVudEFyZWEgLyBtYXBFeHRlbnRBcmVhIDwgYXJlYVJhdGlvO1xyXG59XHJcblxyXG4vKipcclxuICogRml0IHZpZXcgdG8gaW5jbHVkZSB0aGUgZmVhdHVyZXMgZXh0ZW50LlxyXG4gKiBCeSBkZWZhdWx0LCB0aGlzIG1ldGhvZCB3aWxsIGxldCB0aGUgZmVhdHVyZXMgb2NjdXB5IGFib3V0IDUwJSBvZiB0aGUgdmlld3BvcnQuXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmVzIE9MIGZlYXR1cmVzXHJcbiAqIEBwYXJhbSBtb3Rpb24gVG8gbW90aW9uIHRvIHRoZSBuZXcgbWFwIHZpZXdcclxuICogQHBhcmFtIHNjYWxlIElmIHRoaXMgaXMgZGVmaW5lZCwgdGhlIG9yaWdpbmFsIHZpZXcgd2lsbCBiZSBzY2FsZWRcclxuICogIGJ5IHRoYXQgZmFjdG9yIGJlZm9yZSBhbnkgbG9naWMgaXMgYXBwbGllZC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9PbEZlYXR1cmVzKFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdCxcclxuICBzY2FsZT86IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIGFyZWFSYXRpbz86IG51bWJlclxyXG4pIHtcclxuICBjb25zdCBmZWF0dXJlc0V4dGVudCA9IGNvbXB1dGVPbEZlYXR1cmVzRXh0ZW50KG1hcCwgb2xGZWF0dXJlcyk7XHJcbiAgbGV0IHZpZXdFeHRlbnQgPSBmZWF0dXJlc0V4dGVudDtcclxuICBpZiAoc2NhbGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdmlld0V4dGVudCA9IHNjYWxlRXh0ZW50KHZpZXdFeHRlbnQsIHNjYWxlKTtcclxuICB9XHJcblxyXG4gIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uWm9vbSkge1xyXG4gICAgbWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICB9IGVsc2UgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5Nb3ZlKSB7XHJcbiAgICBtYXAudmlld0NvbnRyb2xsZXIubW92ZVRvRXh0ZW50KHZpZXdFeHRlbnQpO1xyXG4gIH0gZWxzZSBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLkRlZmF1bHQpIHtcclxuICAgIGlmIChcclxuICAgICAgZmVhdHVyZXNBcmVPdXRPZlZpZXcobWFwLCBmZWF0dXJlc0V4dGVudCkgfHxcclxuICAgICAgZmVhdHVyZXNBcmVUb29EZWVwSW5WaWV3KG1hcCwgZmVhdHVyZXNFeHRlbnQsIGFyZWFSYXRpbylcclxuICAgICkge1xyXG4gICAgICBtYXAudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KHZpZXdFeHRlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZGUgYW4gT0wgZmVhdHVyZVxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIGZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlT2xGZWF0dXJlKG9sRmVhdHVyZTogT2xGZWF0dXJlKSB7XHJcbiAgb2xGZWF0dXJlLnNldFN0eWxlKG5ldyBvbHN0eWxlLlN0eWxlKHt9KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYmluZCBhIGxheWVyIHRvIGEgc3RvcmUgaWYgbm9uZSBpcyBib3VuZCBhbHJlYWR5LlxyXG4gKiBUaGUgbGF5ZXIgd2lsbCBhbHNvIGJlIGFkZGVkIHRvIHRoZSBzdG9yZSdzIG1hcC5cclxuICogSWYgbm8gbGF5ZXIgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIGxheWVyXHJcbiAqIEBwYXJhbSBsYXllciBBbiBvcHRpb25hbCBWZWN0b3JMYXllclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyeUJpbmRTdG9yZUxheWVyKHN0b3JlOiBGZWF0dXJlU3RvcmUsIGxheWVyPzogVmVjdG9yTGF5ZXIpIHtcclxuICBpZiAoc3RvcmUubGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0b3JlLm1hcC5hZGRMYXllcihzdG9yZS5sYXllcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBsYXllciA9IGxheWVyID8gbGF5ZXIgOiBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKVxyXG4gIH0pO1xyXG4gIHN0b3JlLmJpbmRMYXllcihsYXllcik7XHJcbiAgaWYgKHN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5tYXAuYWRkTGF5ZXIoc3RvcmUubGF5ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBhZGQgYSBsb2FkaW5nIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGFjdGl2YXRlIGl0LlxyXG4gKiBJZiBubyBzdHJhdGVneSBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgbG9hZGluZyBzdHJhdGVneVxyXG4gKiBAcGFyYW0gc3RyYXRlZ3kgQW4gb3B0aW9uYWwgbG9hZGluZyBzdHJhdGVneVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyeUFkZExvYWRpbmdTdHJhdGVneShzdG9yZTogRmVhdHVyZVN0b3JlLCBzdHJhdGVneT86IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSkge1xyXG4gIGlmIChzdG9yZS5nZXRTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLmFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHN0cmF0ZWd5ID0gc3RyYXRlZ3kgPyBzdHJhdGVneSA6IG5ldyBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3koe30pO1xyXG4gIHN0b3JlLmFkZFN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICBzdHJhdGVneS5hY3RpdmF0ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGFkZCBhIHNlbGVjdGlvbiBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBhY3RpdmF0ZSBpdC5cclxuICogSWYgbm8gc3RyYXRlZ3kgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIHNlbGVjdGlvbiBzdHJhdGVneVxyXG4gKiBAcGFyYW0gW3N0cmF0ZWd5XSBBbiBvcHRpb25hbCBzZWxlY3Rpb24gc3RyYXRlZ3lcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlBZGRTZWxlY3Rpb25TdHJhdGVneShzdG9yZTogRmVhdHVyZVN0b3JlLCBzdHJhdGVneT86IEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KSB7XHJcbiAgaWYgKHN0b3JlLmdldFN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgc3RyYXRlZ3kgPSBzdHJhdGVneSA/IHN0cmF0ZWd5IDogbmV3IEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KHtcclxuICAgIG1hcDogc3RvcmUubWFwXHJcbiAgfSk7XHJcbiAgc3RvcmUuYWRkU3RyYXRlZ3koc3RyYXRlZ3kpO1xyXG4gIHN0cmF0ZWd5LmFjdGl2YXRlKCk7XHJcbn1cclxuIl19