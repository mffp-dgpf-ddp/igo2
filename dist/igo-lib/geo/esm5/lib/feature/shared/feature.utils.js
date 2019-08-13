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
 * @param {?=} projectionOut Feature projection
 * @return {?} Feature
 */
export function featureFromOl(olFeature, projectionIn, projectionOut) {
    if (projectionOut === void 0) { projectionOut = 'EPSG:4326'; }
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
    /** @type {?} */
    var title = olFeature.get('_title');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUVMLFdBQVcsRUFDWCxjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNsQixNQUFNLGNBQWMsQ0FBQztBQUd0QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQiw2QkFBNkIsRUFDOUIsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7OztBQVN0QixNQUFNLFVBQVUsV0FBVyxDQUN6QixPQUFnQixFQUNoQixhQUFxQixFQUNyQixLQUE4QjtJQUU5QixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQzs7UUFFOUIsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFOztRQUNoQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7UUFDOUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxVQUFVO1FBQ2xDLGlCQUFpQixFQUFFLGFBQWE7S0FDakMsQ0FBQztJQUVGLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1FBRTFCLEtB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O0tBQ1I7SUFFRCxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksMkJBQTJCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsQ0FBQzs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsS0FBbUIsRUFBRSxRQUF3QztJQUNuRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN4RSxLQUFLLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1RCxPQUFPO0tBQ1I7SUFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksNkJBQTZCLENBQUM7UUFDakUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5cclxuaW1wb3J0IHtcclxuICBFbnRpdHlLZXksXHJcbiAgZ2V0RW50aXR5SWQsXHJcbiAgZ2V0RW50aXR5VGl0bGUsXHJcbiAgZ2V0RW50aXR5UmV2aXNpb24sXHJcbiAgZ2V0RW50aXR5UHJvcGVydHlcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmVNb3Rpb24gfSBmcm9tICcuL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHtcclxuICBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3ksXHJcbiAgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICcuL3N0cmF0ZWdpZXMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBPcGVubGF5ZXJzIGZlYXR1cmUgb2JqZWN0IG91dCBvZiBhIGZlYXR1cmUgZGVmaW5pdGlvbi5cclxuICogVGhlIG91dHB1dCBvYmplY3QgaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBmZWF0dXJlIGlkLlxyXG4gKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlIGRlZmluaXRpb25cclxuICogQHBhcmFtIHByb2plY3Rpb25PdXQgRmVhdHVyZSBvYmplY3QgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBPcGVuTGF5ZXJzIGZlYXR1cmUgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVRvT2woXHJcbiAgZmVhdHVyZTogRmVhdHVyZSxcclxuICBwcm9qZWN0aW9uT3V0OiBzdHJpbmcsXHJcbiAgZ2V0SWQ/OiAoRmVhdHVyZSkgPT4gRW50aXR5S2V5XHJcbik6IE9sRmVhdHVyZSB7XHJcbiAgZ2V0SWQgPSBnZXRJZCA/IGdldElkIDogZ2V0RW50aXR5SWQ7XHJcblxyXG4gIGNvbnN0IG9sRm9ybWF0ID0gbmV3IE9sRm9ybWF0R2VvSlNPTigpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZSA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlKGZlYXR1cmUsIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uOiBmZWF0dXJlLnByb2plY3Rpb24sXHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbk91dFxyXG4gIH0pO1xyXG5cclxuICBvbEZlYXR1cmUuc2V0SWQoZ2V0SWQoZmVhdHVyZSkpO1xyXG5cclxuICBjb25zdCB0aXRsZSA9IGdldEVudGl0eVRpdGxlKGZlYXR1cmUpO1xyXG4gIGlmICh0aXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfdGl0bGUnLCB0aXRsZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5leHRlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX2V4dGVudCcsIGZlYXR1cmUuZXh0ZW50LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLnByb2plY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX3Byb2plY3Rpb24nLCBmZWF0dXJlLnByb2plY3Rpb24sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUuZXh0ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19leHRlbnQnLCBmZWF0dXJlLmV4dGVudCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXBUaXRsZSA9IGdldEVudGl0eVByb3BlcnR5KGZlYXR1cmUsICdtZXRhLm1hcFRpdGxlJyk7XHJcbiAgaWYgKG1hcFRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19tYXBUaXRsZScsIG1hcFRpdGxlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIG9sRmVhdHVyZS5zZXQoJ19lbnRpdHlSZXZpc2lvbicsIGdldEVudGl0eVJldmlzaW9uKGZlYXR1cmUpLCB0cnVlKTtcclxuXHJcbiAgcmV0dXJuIG9sRmVhdHVyZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGZlYXR1cmUgb2JqZWN0IG91dCBvZiBhbiBPTCBmZWF0dXJlXHJcbiAqIFRoZSBvdXRwdXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZmVhdHVyZSBpZC5cclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBGZWF0dXJlXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uSW4gT0wgZmVhdHVyZSBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uT3V0IEZlYXR1cmUgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBGZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUZyb21PbChcclxuICBvbEZlYXR1cmU6IE9sRmVhdHVyZSxcclxuICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICBwcm9qZWN0aW9uT3V0ID0gJ0VQU0c6NDMyNidcclxuKTogRmVhdHVyZSB7XHJcbiAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIGNvbnN0IGtleXMgPSBvbEZlYXR1cmUuZ2V0S2V5cygpLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiAha2V5LnN0YXJ0c1dpdGgoJ18nKSAmJiBrZXkgIT09ICdnZW9tZXRyeSc7XHJcbiAgfSk7XHJcbiAgY29uc3QgcHJvcGVydGllcyA9IGtleXMucmVkdWNlKChhY2M6IG9iamVjdCwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgIGFjY1trZXldID0gb2xGZWF0dXJlLmdldChrZXkpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcblxyXG4gIGNvbnN0IGdlb21ldHJ5ID0gb2xGb3JtYXQud3JpdGVHZW9tZXRyeU9iamVjdChvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKSwge1xyXG4gICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRpdGxlID0gb2xGZWF0dXJlLmdldCgnX3RpdGxlJyk7XHJcbiAgY29uc3QgbWFwVGl0bGUgPSBvbEZlYXR1cmUuZ2V0KCdfbWFwVGl0bGUnKTtcclxuICBjb25zdCBpZCA9IG9sRmVhdHVyZS5nZXRJZCgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogRkVBVFVSRSxcclxuICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBleHRlbnQ6IG9sRmVhdHVyZS5nZXQoJ19leHRlbnQnKSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaWQsXHJcbiAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlIDogKG1hcFRpdGxlID8gbWFwVGl0bGUgOiBpZCksXHJcbiAgICAgIG1hcFRpdGxlLFxyXG4gICAgICByZXZpc2lvbjogb2xGZWF0dXJlLmdldFJldmlzaW9uKClcclxuICAgIH0sXHJcbiAgICBwcm9wZXJ0aWVzLFxyXG4gICAgZ2VvbWV0cnlcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhbiBPTCBmZWF0dXJlIGV4dGVudCBpbiBpdCdzIG1hcCBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgZmVhdHVyZVxyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZUV4dGVudChcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmU6IE9sRmVhdHVyZVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgbGV0IG9sRXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuXHJcbiAgY29uc3Qgb2xGZWF0dXJlRXh0ZW50ID0gb2xGZWF0dXJlLmdldCgnX2V4dGVudCcpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZVByb2plY3Rpb24gPSBvbEZlYXR1cmUuZ2V0KCdfcHJvamVjdGlvbicpO1xyXG4gIGlmIChvbEZlYXR1cmVFeHRlbnQgIT09IHVuZGVmaW5lZCAmJiBvbEZlYXR1cmVQcm9qZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRXh0ZW50ID0gb2xwcm9qLnRyYW5zZm9ybUV4dGVudChcclxuICAgICAgb2xGZWF0dXJlRXh0ZW50LFxyXG4gICAgICBvbEZlYXR1cmVQcm9qZWN0aW9uLFxyXG4gICAgICBtYXAucHJvamVjdGlvblxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgaWYgKG9sR2VvbWV0cnkgIT09IG51bGwpIHtcclxuICAgICAgb2xFeHRlbnQgPSBvbEdlb21ldHJ5LmdldEV4dGVudCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9sRXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhIG11bHRpcGxlIE9MIGZlYXR1cmVzIGV4dGVudCBpbiB0aGVpciBtYXAgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZXNFeHRlbnQoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW11cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IGV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcblxyXG4gIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIGNvbnN0IGZlYXR1cmVFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlRXh0ZW50KG1hcCwgb2xGZWF0dXJlKTtcclxuICAgIG9sZXh0ZW50LmV4dGVuZChleHRlbnQsIGZlYXR1cmVFeHRlbnQpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogU2NhbGUgYW4gZXh0ZW50LlxyXG4gKiBAcGFyYW0gZXh0ZW50IEV4dGVudFxyXG4gKiBAcGFyYW0gU2NhbGluZyBmYWN0b3JzIGZvciB0b3AsIHJpZ2h0LCBib3R0b20gYW5kIGxlZnQgZGlyZWN0aW9ucywgaW4gdGhhdCBvcmRlclxyXG4gKiBAcmV0dXJucyBTY2FsZWQgZXh0ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVFeHRlbnQoXHJcbiAgZXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBzY2FsZTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IG9sZXh0ZW50LmdldFNpemUoZXh0ZW50KTtcclxuICByZXR1cm4gW1xyXG4gICAgc2NhbGVbM10gPyBleHRlbnRbMF0gLSB3aWR0aCAqIHNjYWxlWzNdIDogZXh0ZW50WzBdLFxyXG4gICAgc2NhbGVbMl0gPyBleHRlbnRbMV0gLSBoZWlnaHQgKiBzY2FsZVsyXSA6IGV4dGVudFsxXSxcclxuICAgIHNjYWxlWzFdID8gZXh0ZW50WzJdICsgd2lkdGggKiBzY2FsZVsxXSA6IGV4dGVudFsyXSxcclxuICAgIHNjYWxlWzBdID8gZXh0ZW50WzNdICsgaGVpZ2h0ICogc2NhbGVbMF0gOiBleHRlbnRbM11cclxuICBdO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIG91dCBvZiB2aWV3LlxyXG4gKiBJZiBmZWF0dXJlcyBhcmUgdG9vIGNsb3NlIHRvIHRoZSBlZGdlLCB0aGV5IGFyZSBjb25zaWRlcmVkIG91dCBvZiB2aWV3LlxyXG4gKiBXZSBkZWZpbmUgdGhlIGVkZ2UgYXMgNSUgb2YgdGhlIGV4dGVudCBzaXplLlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gZmVhdHVyZXNFeHRlbnQgVGhlIGZlYXR1cmVzJ3MgZXh0ZW50XHJcbiAqIEByZXR1cm5zIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSBvdXQgb2Ygdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIGZlYXR1cmVzRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG4pIHtcclxuICBjb25zdCBtYXBFeHRlbnQgPSBtYXAuZ2V0RXh0ZW50KCk7XHJcbiAgY29uc3QgZWRnZVJhdGlvID0gMC4wNTtcclxuICBjb25zdCBzY2FsZSA9IFstMSwgLTEsIC0xLCAtMV0ubWFwKHggPT4geCAqIGVkZ2VSYXRpbyk7XHJcbiAgY29uc3Qgdmlld0V4dGVudCA9IHNjYWxlRXh0ZW50KG1hcEV4dGVudCwgc2NhbGUgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pO1xyXG5cclxuICByZXR1cm4gIW9sZXh0ZW50LmNvbnRhaW5zRXh0ZW50KHZpZXdFeHRlbnQsIGZlYXR1cmVzRXh0ZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSB0b28gZGVlcCBpbnRvIHRoZSB2aWV3LiBUaGlzIHJlc3VsdHNcclxuICogaW4gZmVhdHVyZXMgYmVpbmcgdG9vIHNtYWxsLlxyXG4gKiBGZWF0dXJlcyBhcmUgY29uc2lkZXJlZCB0b28gc21hbGwgaWYgdGhlaXIgZXh0ZW50IG9jY3VwaWVzIGxlc3MgdGhhblxyXG4gKiAxJSBvZiB0aGUgbWFwIGV4dGVudC5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIGZlYXR1cmVzRXh0ZW50IFRoZSBmZWF0dXJlcydzIGV4dGVudFxyXG4gKiBAcGFyYW0gYXJlYVJhdGlvIFRoZSBmZWF0dXJlcyBleHRlbnQgdG8gdmlldyBleHRlbnQgYWNjZXB0YWJsZSByYXRpb1xyXG4gKiBAcmV0dXJucyBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgdG9vIGRlZXAgaW4gdGhlIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlc0FyZVRvb0RlZXBJblZpZXcoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgZmVhdHVyZXNFeHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIGFyZWFSYXRpbz86IG51bWJlclxyXG4pIHtcclxuICAvLyBBbiBhcmVhIHJhdGlvIG9mIDAuMDA0IG1lYW5zIHRoYXQgdGhlIGZlYXR1cmUgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIC8vIHNob3VsZCBiZSBhYm91dCAxLzE2IG9mIHRoZSBtYXAgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIGFyZWFSYXRpbyA9IGFyZWFSYXRpbyA/IGFyZWFSYXRpbyA6IDAuMDA0O1xyXG4gIGNvbnN0IG1hcEV4dGVudCA9IG1hcC5nZXRFeHRlbnQoKTtcclxuICBjb25zdCBtYXBFeHRlbnRBcmVhID0gb2xleHRlbnQuZ2V0QXJlYShtYXBFeHRlbnQpO1xyXG4gIGNvbnN0IGZlYXR1cmVzRXh0ZW50QXJlYSA9IG9sZXh0ZW50LmdldEFyZWEoZmVhdHVyZXNFeHRlbnQpO1xyXG5cclxuICByZXR1cm4gZmVhdHVyZXNFeHRlbnRBcmVhIC8gbWFwRXh0ZW50QXJlYSA8IGFyZWFSYXRpbztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpdCB2aWV3IHRvIGluY2x1ZGUgdGhlIGZlYXR1cmVzIGV4dGVudC5cclxuICogQnkgZGVmYXVsdCwgdGhpcyBtZXRob2Qgd2lsbCBsZXQgdGhlIGZlYXR1cmVzIG9jY3VweSBhYm91dCA1MCUgb2YgdGhlIHZpZXdwb3J0LlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcGFyYW0gbW90aW9uIFRvIG1vdGlvbiB0byB0aGUgbmV3IG1hcCB2aWV3XHJcbiAqIEBwYXJhbSBzY2FsZSBJZiB0aGlzIGlzIGRlZmluZWQsIHRoZSBvcmlnaW5hbCB2aWV3IHdpbGwgYmUgc2NhbGVkXHJcbiAqICBieSB0aGF0IGZhY3RvciBiZWZvcmUgYW55IGxvZ2ljIGlzIGFwcGxpZWQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVRvT2xGZWF0dXJlcyhcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgc2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBhcmVhUmF0aW8/OiBudW1iZXJcclxuKSB7XHJcbiAgY29uc3QgZmVhdHVyZXNFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlc0V4dGVudChtYXAsIG9sRmVhdHVyZXMpO1xyXG4gIGxldCB2aWV3RXh0ZW50ID0gZmVhdHVyZXNFeHRlbnQ7XHJcbiAgaWYgKHNjYWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHZpZXdFeHRlbnQgPSBzY2FsZUV4dGVudCh2aWV3RXh0ZW50LCBzY2FsZSk7XHJcbiAgfVxyXG5cclxuICBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLlpvb20pIHtcclxuICAgIG1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgfSBlbHNlIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uTW92ZSkge1xyXG4gICAgbWFwLnZpZXdDb250cm9sbGVyLm1vdmVUb0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICB9IGVsc2UgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KG1hcCwgZmVhdHVyZXNFeHRlbnQpIHx8XHJcbiAgICAgIGZlYXR1cmVzQXJlVG9vRGVlcEluVmlldyhtYXAsIGZlYXR1cmVzRXh0ZW50LCBhcmVhUmF0aW8pXHJcbiAgICApIHtcclxuICAgICAgbWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWRlIGFuIE9MIGZlYXR1cmVcclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGlkZU9sRmVhdHVyZShvbEZlYXR1cmU6IE9sRmVhdHVyZSkge1xyXG4gIG9sRmVhdHVyZS5zZXRTdHlsZShuZXcgb2xzdHlsZS5TdHlsZSh7fSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGJpbmQgYSBsYXllciB0byBhIHN0b3JlIGlmIG5vbmUgaXMgYm91bmQgYWxyZWFkeS5cclxuICogVGhlIGxheWVyIHdpbGwgYWxzbyBiZSBhZGRlZCB0byB0aGUgc3RvcmUncyBtYXAuXHJcbiAqIElmIG5vIGxheWVyIGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBsYXllclxyXG4gKiBAcGFyYW0gbGF5ZXIgQW4gb3B0aW9uYWwgVmVjdG9yTGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlCaW5kU3RvcmVMYXllcihzdG9yZTogRmVhdHVyZVN0b3JlLCBsYXllcj86IFZlY3RvckxheWVyKSB7XHJcbiAgaWYgKHN0b3JlLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdG9yZS5tYXAuYWRkTGF5ZXIoc3RvcmUubGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGF5ZXIgPSBsYXllciA/IGxheWVyIDogbmV3IFZlY3RvckxheWVyKHtcclxuICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKClcclxuICB9KTtcclxuICBzdG9yZS5iaW5kTGF5ZXIobGF5ZXIpO1xyXG4gIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUubWFwLmFkZExheWVyKHN0b3JlLmxheWVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYWRkIGEgbG9hZGluZyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBhY3RpdmF0ZSBpdC5cclxuICogSWYgbm8gc3RyYXRlZ3kgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIGxvYWRpbmcgc3RyYXRlZ3lcclxuICogQHBhcmFtIHN0cmF0ZWd5IEFuIG9wdGlvbmFsIGxvYWRpbmcgc3RyYXRlZ3lcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlBZGRMb2FkaW5nU3RyYXRlZ3koc3RvcmU6IEZlYXR1cmVTdG9yZSwgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpIHtcclxuICBpZiAoc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBzdHJhdGVneSA9IHN0cmF0ZWd5ID8gc3RyYXRlZ3kgOiBuZXcgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KHt9KTtcclxuICBzdG9yZS5hZGRTdHJhdGVneShzdHJhdGVneSk7XHJcbiAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBhZGQgYSBzZWxlY3Rpb24gc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgYWN0aXZhdGUgaXQuXHJcbiAqIElmIG5vIHN0cmF0ZWd5IGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBzZWxlY3Rpb24gc3RyYXRlZ3lcclxuICogQHBhcmFtIFtzdHJhdGVneV0gQW4gb3B0aW9uYWwgc2VsZWN0aW9uIHN0cmF0ZWd5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QWRkU2VsZWN0aW9uU3RyYXRlZ3koc3RvcmU6IEZlYXR1cmVTdG9yZSwgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkge1xyXG4gIGlmIChzdG9yZS5nZXRTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUuYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHN0cmF0ZWd5ID0gc3RyYXRlZ3kgPyBzdHJhdGVneSA6IG5ldyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSh7XHJcbiAgICBtYXA6IHN0b3JlLm1hcFxyXG4gIH0pO1xyXG4gIHN0b3JlLmFkZFN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICBzdHJhdGVneS5hY3RpdmF0ZSgpO1xyXG59XHJcbiJdfQ==