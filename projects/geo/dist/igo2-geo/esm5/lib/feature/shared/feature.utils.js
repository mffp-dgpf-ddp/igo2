/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as olextent from 'ol/extent';
import * as olproj from 'ol/proj';
import * as olstyle from 'ol/style';
import OlGeometryLayout from 'ol/geom/GeometryLayout';
import OlPolygon from 'ol/geom/Polygon';
import OlPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import { uuid } from '@igo2/utils';
import { getEntityId, getEntityTitle, getEntityRevision, getEntityIcon, getEntityProperty } from '@igo2/common';
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
    /** @type {?} */
    var mapTitle = getEntityProperty(feature, 'meta.mapTitle');
    if (mapTitle !== undefined) {
        olFeature.set('_mapTitle', mapTitle, true);
    }
    olFeature.set('_entityRevision', getEntityRevision(feature), true);
    /** @type {?} */
    var icon = getEntityIcon(feature);
    if (icon !== undefined) {
        olFeature.set('_icon', icon, true);
    }
    if (feature.meta && feature.meta.style) {
        olFeature.set('_style', feature.meta.style, true);
    }
    return olFeature;
}
/**
 * @param {?} olRenderFeature
 * @param {?} projectionIn
 * @param {?=} olLayer
 * @param {?=} projectionOut
 * @return {?}
 */
export function renderFeatureFromOl(olRenderFeature, projectionIn, olLayer, projectionOut) {
    if (projectionOut === void 0) { projectionOut = 'EPSG:4326'; }
    /** @type {?} */
    var geom;
    /** @type {?} */
    var title;
    /** @type {?} */
    var exclude;
    /** @type {?} */
    var excludeOffline;
    if (olLayer) {
        title = olLayer.get('title');
        if (olLayer.get('sourceOptions')) {
            exclude = olLayer.get('sourceOptions').excludeAttribute;
            excludeOffline = olLayer.get('sourceOptions').excludeAttributeOffline;
        }
    }
    else {
        title = olRenderFeature.get('_title');
    }
    /** @type {?} */
    var olFormat = new OlFormatGeoJSON();
    /** @type {?} */
    var properties = olRenderFeature.getProperties();
    /** @type {?} */
    var geometryType = olRenderFeature.getType();
    if (geometryType === 'Polygon') {
        /** @type {?} */
        var ends = olRenderFeature.ends_;
        geom = new OlPolygon(olRenderFeature.flatCoordinates_, OlGeometryLayout.XY, ends);
    }
    else if (geometryType === 'Point') {
        geom = new OlPoint(olRenderFeature.flatCoordinates_, OlGeometryLayout.XY);
    }
    else if (geometryType === 'LineString') {
        geom = new OlLineString(olRenderFeature.flatCoordinates_, OlGeometryLayout.XY);
    }
    /** @type {?} */
    var geometry = olFormat.writeGeometryObject(geom, {
        dataProjection: projectionOut,
        featureProjection: projectionIn
    });
    /** @type {?} */
    var id = olRenderFeature.getId() ? olRenderFeature.getId() : uuid();
    /** @type {?} */
    var mapTitle = olRenderFeature.get('_mapTitle');
    return {
        type: FEATURE,
        projection: projectionOut,
        extent: olRenderFeature.getExtent(),
        meta: {
            id: id,
            title: title ? title : mapTitle ? mapTitle : id,
            mapTitle: mapTitle,
            excludeAttribute: exclude,
            excludeAttributeOffline: excludeOffline
        },
        properties: properties,
        geometry: geometry,
        ol: olRenderFeature
    };
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
    var exclude;
    /** @type {?} */
    var excludeOffline;
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
        if (olLayer.get('sourceOptions')) {
            exclude = olLayer.get('sourceOptions').excludeAttribute;
            excludeOffline = olLayer.get('sourceOptions').excludeAttributeOffline;
        }
    }
    else {
        title = olFeature.get('_title');
    }
    /** @type {?} */
    var mapTitle = olFeature.get('_mapTitle');
    /** @type {?} */
    var id = olFeature.getId() ? olFeature.getId() : uuid();
    return {
        type: FEATURE,
        projection: projectionOut,
        extent: olFeature.get('_extent'),
        meta: {
            id: id,
            title: title ? title : mapTitle ? mapTitle : id,
            mapTitle: mapTitle,
            revision: olFeature.getRevision(),
            style: olFeature.get('_style'),
            excludeAttribute: exclude,
            excludeAttributeOffline: excludeOffline
        },
        properties: properties,
        geometry: geometry,
        ol: olFeature
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
    var mapExtent = map.viewController.getExtent();
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
    var mapExtent = map.viewController.getExtent();
    /** @type {?} */
    var mapExtentArea = olextent.getArea(mapExtent);
    /** @type {?} */
    var featuresExtentArea = olextent.getArea(featuresExtent);
    if (featuresExtentArea === 0 && map.viewController.getZoom() > 13) { // In case it's a point
        return false;
    }
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
    layer = layer
        ? layer
        : new VectorLayer({
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
    strategy = strategy
        ? strategy
        : new FeatureStoreSelectionStrategy({
            map: store.map
        });
    store.addStrategy(strategy);
    strategy.activate();
}
/**
 * Compute a diff between a source array of Ol features and a target array
 * @param {?} source Source array of OL features
 * @param {?} target
 * @return {?} Features to add and remove
 */
export function computeOlFeaturesDiff(source, target) {
    /** @type {?} */
    var olFeaturesMap = new Map();
    target.forEach((/**
     * @param {?} olFeature
     * @return {?}
     */
    function (olFeature) {
        olFeaturesMap.set(olFeature.getId(), olFeature);
    }));
    /** @type {?} */
    var olFeaturesToRemove = [];
    source.forEach((/**
     * @param {?} olFeature
     * @return {?}
     */
    function (olFeature) {
        /** @type {?} */
        var newOlFeature = olFeaturesMap.get(olFeature.getId());
        if (newOlFeature === undefined) {
            olFeaturesToRemove.push(olFeature);
        }
        else if (newOlFeature.get('_entityRevision') !== olFeature.get('_entityRevision')) {
            olFeaturesToRemove.push(olFeature);
        }
        else {
            olFeaturesMap.delete(newOlFeature.getId());
        }
    }));
    /** @type {?} */
    var olFeaturesToAddIds = Array.from(olFeaturesMap.keys());
    /** @type {?} */
    var olFeaturesToAdd = target.filter((/**
     * @param {?} olFeature
     * @return {?}
     */
    function (olFeature) {
        return olFeaturesToAddIds.indexOf(olFeature.getId()) >= 0;
    }));
    return {
        add: olFeaturesToAdd,
        remove: olFeaturesToRemove
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFDcEMsT0FBTyxZQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBRUwsV0FBVyxFQUNYLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGNBQWMsQ0FBQztBQUd0QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQiw2QkFBNkIsRUFDOUIsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7OztBQVN0QixNQUFNLFVBQVUsV0FBVyxDQUN6QixPQUFnQixFQUNoQixhQUFxQixFQUNyQixLQUE4QjtJQUU5QixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQzs7UUFFOUIsUUFBUSxHQUFHLElBQUksZUFB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Q0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxhQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQyxFQUFDLENBQUM7O1FBRUcsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O1FBQ3JELGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTTs7OztJQUFDLFVBQUMsU0FBb0I7UUFDekQsT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsRUFBQztJQUVGLE9BQU87UUFDTCxHQUFHLEVBQUUsZUFBZTtRQUNwQixNQUFNLEVBQUUsa0JBQWtCO0tBQzNCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xleHRlbnQgZnJvbSAnb2wvZXh0ZW50JztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sR2VvbWV0cnlMYXlvdXQgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeUxheW91dCc7XHJcbmltcG9ydCBPbFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcclxuaW1wb3J0IE9sUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcbmltcG9ydCBPbExpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcclxuaW1wb3J0IE9sUmVuZGVyRmVhdHVyZSBmcm9tICdvbC9yZW5kZXIvRmVhdHVyZSc7XHJcbmltcG9ydCBPbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgT2xMYXllciBmcm9tICdvbC9sYXllci9MYXllcic7XHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEVudGl0eUtleSxcclxuICBnZXRFbnRpdHlJZCxcclxuICBnZXRFbnRpdHlUaXRsZSxcclxuICBnZXRFbnRpdHlSZXZpc2lvbixcclxuICBnZXRFbnRpdHlJY29uLFxyXG4gIGdldEVudGl0eVByb3BlcnR5XHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5LFxyXG4gIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnLi9zdHJhdGVnaWVzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdCBvdXQgb2YgYSBmZWF0dXJlIGRlZmluaXRpb24uXHJcbiAqIFRoZSBvdXRwdXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZmVhdHVyZSBpZC5cclxuICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZSBkZWZpbml0aW9uXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uT3V0IEZlYXR1cmUgb2JqZWN0IHByb2plY3Rpb25cclxuICogQHJldHVybnMgT3BlbkxheWVycyBmZWF0dXJlIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVUb09sKFxyXG4gIGZlYXR1cmU6IEZlYXR1cmUsXHJcbiAgcHJvamVjdGlvbk91dDogc3RyaW5nLFxyXG4gIGdldElkPzogKEZlYXR1cmUpID0+IEVudGl0eUtleVxyXG4pOiBPbEZlYXR1cmUge1xyXG4gIGdldElkID0gZ2V0SWQgPyBnZXRJZCA6IGdldEVudGl0eUlkO1xyXG5cclxuICBjb25zdCBvbEZvcm1hdCA9IG5ldyBPbEZvcm1hdEdlb0pTT04oKTtcclxuICBjb25zdCBvbEZlYXR1cmUgPSBvbEZvcm1hdC5yZWFkRmVhdHVyZShmZWF0dXJlLCB7XHJcbiAgICBkYXRhUHJvamVjdGlvbjogZmVhdHVyZS5wcm9qZWN0aW9uLFxyXG4gICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25PdXRcclxuICB9KTtcclxuXHJcbiAgb2xGZWF0dXJlLnNldElkKGdldElkKGZlYXR1cmUpKTtcclxuXHJcbiAgY29uc3QgdGl0bGUgPSBnZXRFbnRpdHlUaXRsZShmZWF0dXJlKTtcclxuICBpZiAodGl0bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX3RpdGxlJywgdGl0bGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUuZXh0ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19leHRlbnQnLCBmZWF0dXJlLmV4dGVudCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5wcm9qZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19wcm9qZWN0aW9uJywgZmVhdHVyZS5wcm9qZWN0aW9uLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hcFRpdGxlID0gZ2V0RW50aXR5UHJvcGVydHkoZmVhdHVyZSwgJ21ldGEubWFwVGl0bGUnKTtcclxuICBpZiAobWFwVGl0bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX21hcFRpdGxlJywgbWFwVGl0bGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgb2xGZWF0dXJlLnNldCgnX2VudGl0eVJldmlzaW9uJywgZ2V0RW50aXR5UmV2aXNpb24oZmVhdHVyZSksIHRydWUpO1xyXG5cclxuICBjb25zdCBpY29uID0gZ2V0RW50aXR5SWNvbihmZWF0dXJlKTtcclxuICBpZiAoaWNvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfaWNvbicsIGljb24sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUubWV0YSAmJiBmZWF0dXJlLm1ldGEuc3R5bGUpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19zdHlsZScsIGZlYXR1cmUubWV0YS5zdHlsZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2xGZWF0dXJlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRmVhdHVyZUZyb21PbChcclxuICBvbFJlbmRlckZlYXR1cmU6IE9sUmVuZGVyRmVhdHVyZSxcclxuICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICBvbExheWVyPzogT2xMYXllcixcclxuICBwcm9qZWN0aW9uT3V0ID0gJ0VQU0c6NDMyNidcclxuICApOiBGZWF0dXJlIHtcclxuICAgIGxldCBnZW9tO1xyXG4gICAgbGV0IHRpdGxlO1xyXG4gICAgbGV0IGV4Y2x1ZGU7XHJcbiAgICBsZXQgZXhjbHVkZU9mZmxpbmU7XHJcblxyXG4gICAgaWYgKG9sTGF5ZXIpIHtcclxuICAgICAgdGl0bGUgPSBvbExheWVyLmdldCgndGl0bGUnKTtcclxuICAgICAgaWYgKG9sTGF5ZXIuZ2V0KCdzb3VyY2VPcHRpb25zJykpIHtcclxuICAgICAgICBleGNsdWRlID0gb2xMYXllci5nZXQoJ3NvdXJjZU9wdGlvbnMnKS5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgIGV4Y2x1ZGVPZmZsaW5lID0gb2xMYXllci5nZXQoJ3NvdXJjZU9wdGlvbnMnKS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGl0bGUgPSBvbFJlbmRlckZlYXR1cmUuZ2V0KCdfdGl0bGUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbEZvcm1hdCA9IG5ldyBPbEZvcm1hdEdlb0pTT04oKTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBvbFJlbmRlckZlYXR1cmUuZ2V0UHJvcGVydGllcygpO1xyXG4gICAgY29uc3QgZ2VvbWV0cnlUeXBlID0gb2xSZW5kZXJGZWF0dXJlLmdldFR5cGUoKTtcclxuXHJcbiAgICBpZiAoZ2VvbWV0cnlUeXBlID09PSAnUG9seWdvbicpIHtcclxuICAgICAgY29uc3QgZW5kcyA9IG9sUmVuZGVyRmVhdHVyZS5lbmRzXztcclxuICAgICAgZ2VvbSA9IG5ldyBPbFBvbHlnb24ob2xSZW5kZXJGZWF0dXJlLmZsYXRDb29yZGluYXRlc18sIE9sR2VvbWV0cnlMYXlvdXQuWFksIGVuZHMpO1xyXG4gICAgfSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgZ2VvbSA9IG5ldyBPbFBvaW50KG9sUmVuZGVyRmVhdHVyZS5mbGF0Q29vcmRpbmF0ZXNfLCBPbEdlb21ldHJ5TGF5b3V0LlhZKTtcclxuICAgIH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09PSAnTGluZVN0cmluZycpIHtcclxuICAgICAgZ2VvbSA9IG5ldyBPbExpbmVTdHJpbmcob2xSZW5kZXJGZWF0dXJlLmZsYXRDb29yZGluYXRlc18sIE9sR2VvbWV0cnlMYXlvdXQuWFkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gb2xGb3JtYXQud3JpdGVHZW9tZXRyeU9iamVjdChnZW9tLCB7XHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBpZCA9IG9sUmVuZGVyRmVhdHVyZS5nZXRJZCgpID8gb2xSZW5kZXJGZWF0dXJlLmdldElkKCkgOiB1dWlkKCk7XHJcbiAgICBjb25zdCBtYXBUaXRsZSA9IG9sUmVuZGVyRmVhdHVyZS5nZXQoJ19tYXBUaXRsZScpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICAgIGV4dGVudDogb2xSZW5kZXJGZWF0dXJlLmdldEV4dGVudCgpLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlID8gdGl0bGUgOiBtYXBUaXRsZSA/IG1hcFRpdGxlIDogaWQsXHJcbiAgICAgICAgbWFwVGl0bGUsXHJcbiAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZTogZXhjbHVkZSxcclxuICAgICAgICBleGNsdWRlQXR0cmlidXRlT2ZmbGluZTogZXhjbHVkZU9mZmxpbmVcclxuICAgICAgfSxcclxuICAgICAgcHJvcGVydGllcyxcclxuICAgICAgZ2VvbWV0cnksXHJcbiAgICAgIG9sOiBvbFJlbmRlckZlYXR1cmVcclxuICAgIH07XHJcbiAgfVxyXG4vKipcclxuICogQ3JlYXRlIGEgZmVhdHVyZSBvYmplY3Qgb3V0IG9mIGFuIE9MIGZlYXR1cmVcclxuICogVGhlIG91dHB1dCBvYmplY3QgaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBmZWF0dXJlIGlkLlxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIEZlYXR1cmVcclxuICogQHBhcmFtIHByb2plY3Rpb25JbiBPTCBmZWF0dXJlIHByb2plY3Rpb25cclxuICogQHBhcmFtIG9sTGF5ZXIgT0wgTGF5ZXJcclxuICogQHBhcmFtIHByb2plY3Rpb25PdXQgRmVhdHVyZSBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIEZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlRnJvbU9sKFxyXG4gIG9sRmVhdHVyZTogT2xGZWF0dXJlLFxyXG4gIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gIG9sTGF5ZXI/OiBPbExheWVyLFxyXG4gIHByb2plY3Rpb25PdXQgPSAnRVBTRzo0MzI2J1xyXG4pOiBGZWF0dXJlIHtcclxuICBsZXQgdGl0bGU7XHJcbiAgbGV0IGV4Y2x1ZGU7XHJcbiAgbGV0IGV4Y2x1ZGVPZmZsaW5lO1xyXG4gIGNvbnN0IG9sRm9ybWF0ID0gbmV3IE9sRm9ybWF0R2VvSlNPTigpO1xyXG5cclxuICBjb25zdCBrZXlzID0gb2xGZWF0dXJlLmdldEtleXMoKS5maWx0ZXIoKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gIWtleS5zdGFydHNXaXRoKCdfJykgJiYga2V5ICE9PSAnZ2VvbWV0cnknO1xyXG4gIH0pO1xyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSBrZXlzLnJlZHVjZSgoYWNjOiBvYmplY3QsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBhY2Nba2V5XSA9IG9sRmVhdHVyZS5nZXQoa2V5KTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICBjb25zdCBnZW9tZXRyeSA9IG9sRm9ybWF0LndyaXRlR2VvbWV0cnlPYmplY3Qob2xGZWF0dXJlLmdldEdlb21ldHJ5KCksIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JblxyXG4gIH0pO1xyXG5cclxuICBpZiAob2xMYXllcikge1xyXG4gICAgdGl0bGUgPSBvbExheWVyLmdldCgndGl0bGUnKTtcclxuICAgIGlmIChvbExheWVyLmdldCgnc291cmNlT3B0aW9ucycpKSB7XHJcbiAgICAgIGV4Y2x1ZGUgPSBvbExheWVyLmdldCgnc291cmNlT3B0aW9ucycpLmV4Y2x1ZGVBdHRyaWJ1dGU7XHJcbiAgICAgIGV4Y2x1ZGVPZmZsaW5lID0gb2xMYXllci5nZXQoJ3NvdXJjZU9wdGlvbnMnKS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGl0bGUgPSBvbEZlYXR1cmUuZ2V0KCdfdGl0bGUnKTtcclxuICB9XHJcbiAgY29uc3QgbWFwVGl0bGUgPSBvbEZlYXR1cmUuZ2V0KCdfbWFwVGl0bGUnKTtcclxuICBjb25zdCBpZCA9IG9sRmVhdHVyZS5nZXRJZCgpID8gb2xGZWF0dXJlLmdldElkKCkgOiB1dWlkKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgcHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgIGV4dGVudDogb2xGZWF0dXJlLmdldCgnX2V4dGVudCcpLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBpZCxcclxuICAgICAgdGl0bGU6IHRpdGxlID8gdGl0bGUgOiBtYXBUaXRsZSA/IG1hcFRpdGxlIDogaWQsXHJcbiAgICAgIG1hcFRpdGxlLFxyXG4gICAgICByZXZpc2lvbjogb2xGZWF0dXJlLmdldFJldmlzaW9uKCksXHJcbiAgICAgIHN0eWxlOiBvbEZlYXR1cmUuZ2V0KCdfc3R5bGUnKSxcclxuICAgICAgZXhjbHVkZUF0dHJpYnV0ZTogZXhjbHVkZSxcclxuICAgICAgZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU6IGV4Y2x1ZGVPZmZsaW5lXHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllcyxcclxuICAgIGdlb21ldHJ5LFxyXG4gICAgb2w6IG9sRmVhdHVyZVxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIGFuIE9MIGZlYXR1cmUgZXh0ZW50IGluIGl0J3MgbWFwIHByb2plY3Rpb25cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBmZWF0dXJlXHJcbiAqIEByZXR1cm5zIEV4dGVudCBpbiB0aGUgbWFwIHByb2plY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlT2xGZWF0dXJlRXh0ZW50KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG9sRmVhdHVyZTogT2xGZWF0dXJlXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBsZXQgb2xFeHRlbnQgPSBvbGV4dGVudC5jcmVhdGVFbXB0eSgpO1xyXG5cclxuICBjb25zdCBvbEZlYXR1cmVFeHRlbnQgPSBvbEZlYXR1cmUuZ2V0KCdfZXh0ZW50Jyk7XHJcbiAgY29uc3Qgb2xGZWF0dXJlUHJvamVjdGlvbiA9IG9sRmVhdHVyZS5nZXQoJ19wcm9qZWN0aW9uJyk7XHJcbiAgaWYgKG9sRmVhdHVyZUV4dGVudCAhPT0gdW5kZWZpbmVkICYmIG9sRmVhdHVyZVByb2plY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xFeHRlbnQgPSBvbHByb2oudHJhbnNmb3JtRXh0ZW50KFxyXG4gICAgICBvbEZlYXR1cmVFeHRlbnQsXHJcbiAgICAgIG9sRmVhdHVyZVByb2plY3Rpb24sXHJcbiAgICAgIG1hcC5wcm9qZWN0aW9uXHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBvbEdlb21ldHJ5ID0gb2xGZWF0dXJlLmdldEdlb21ldHJ5KCk7XHJcbiAgICBpZiAob2xHZW9tZXRyeSAhPT0gbnVsbCkge1xyXG4gICAgICBvbEV4dGVudCA9IG9sR2VvbWV0cnkuZ2V0RXh0ZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2xFeHRlbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIGEgbXVsdGlwbGUgT0wgZmVhdHVyZXMgZXh0ZW50IGluIHRoZWlyIG1hcCBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmVzIE9MIGZlYXR1cmVzXHJcbiAqIEByZXR1cm5zIEV4dGVudCBpbiB0aGUgbWFwIHByb2plY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlT2xGZWF0dXJlc0V4dGVudChcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgY29uc3QgZXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuXHJcbiAgb2xGZWF0dXJlcy5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgY29uc3QgZmVhdHVyZUV4dGVudCA9IGNvbXB1dGVPbEZlYXR1cmVFeHRlbnQobWFwLCBvbEZlYXR1cmUpO1xyXG4gICAgb2xleHRlbnQuZXh0ZW5kKGV4dGVudCwgZmVhdHVyZUV4dGVudCk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBleHRlbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTY2FsZSBhbiBleHRlbnQuXHJcbiAqIEBwYXJhbSBleHRlbnQgRXh0ZW50XHJcbiAqIEBwYXJhbSBTY2FsaW5nIGZhY3RvcnMgZm9yIHRvcCwgcmlnaHQsIGJvdHRvbSBhbmQgbGVmdCBkaXJlY3Rpb25zLCBpbiB0aGF0IG9yZGVyXHJcbiAqIEByZXR1cm5zIFNjYWxlZCBleHRlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUV4dGVudChcclxuICBleHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIHNjYWxlOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gb2xleHRlbnQuZ2V0U2l6ZShleHRlbnQpO1xyXG4gIHJldHVybiBbXHJcbiAgICBzY2FsZVszXSA/IGV4dGVudFswXSAtIHdpZHRoICogc2NhbGVbM10gOiBleHRlbnRbMF0sXHJcbiAgICBzY2FsZVsyXSA/IGV4dGVudFsxXSAtIGhlaWdodCAqIHNjYWxlWzJdIDogZXh0ZW50WzFdLFxyXG4gICAgc2NhbGVbMV0gPyBleHRlbnRbMl0gKyB3aWR0aCAqIHNjYWxlWzFdIDogZXh0ZW50WzJdLFxyXG4gICAgc2NhbGVbMF0gPyBleHRlbnRbM10gKyBoZWlnaHQgKiBzY2FsZVswXSA6IGV4dGVudFszXVxyXG4gIF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgb3V0IG9mIHZpZXcuXHJcbiAqIElmIGZlYXR1cmVzIGFyZSB0b28gY2xvc2UgdG8gdGhlIGVkZ2UsIHRoZXkgYXJlIGNvbnNpZGVyZWQgb3V0IG9mIHZpZXcuXHJcbiAqIFdlIGRlZmluZSB0aGUgZWRnZSBhcyA1JSBvZiB0aGUgZXh0ZW50IHNpemUuXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBmZWF0dXJlc0V4dGVudCBUaGUgZmVhdHVyZXMncyBleHRlbnRcclxuICogQHJldHVybnMgUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIG91dCBvZiB2aWV3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZXNBcmVPdXRPZlZpZXcoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgZmVhdHVyZXNFeHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdXHJcbikge1xyXG4gIGNvbnN0IG1hcEV4dGVudCA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKTtcclxuICBjb25zdCBlZGdlUmF0aW8gPSAwLjA1O1xyXG4gIGNvbnN0IHNjYWxlID0gWy0xLCAtMSwgLTEsIC0xXS5tYXAoeCA9PiB4ICogZWRnZVJhdGlvKTtcclxuICBjb25zdCB2aWV3RXh0ZW50ID0gc2NhbGVFeHRlbnQobWFwRXh0ZW50LCBzY2FsZSBhcyBbXHJcbiAgICBudW1iZXIsXHJcbiAgICBudW1iZXIsXHJcbiAgICBudW1iZXIsXHJcbiAgICBudW1iZXJcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuICFvbGV4dGVudC5jb250YWluc0V4dGVudCh2aWV3RXh0ZW50LCBmZWF0dXJlc0V4dGVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgdG9vIGRlZXAgaW50byB0aGUgdmlldy4gVGhpcyByZXN1bHRzXHJcbiAqIGluIGZlYXR1cmVzIGJlaW5nIHRvbyBzbWFsbC5cclxuICogRmVhdHVyZXMgYXJlIGNvbnNpZGVyZWQgdG9vIHNtYWxsIGlmIHRoZWlyIGV4dGVudCBvY2N1cGllcyBsZXNzIHRoYW5cclxuICogMSUgb2YgdGhlIG1hcCBleHRlbnQuXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBmZWF0dXJlc0V4dGVudCBUaGUgZmVhdHVyZXMncyBleHRlbnRcclxuICogQHBhcmFtIGFyZWFSYXRpbyBUaGUgZmVhdHVyZXMgZXh0ZW50IHRvIHZpZXcgZXh0ZW50IGFjY2VwdGFibGUgcmF0aW9cclxuICogQHJldHVybnMgUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIHRvbyBkZWVwIGluIHRoZSB2aWV3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZXNBcmVUb29EZWVwSW5WaWV3KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIGZlYXR1cmVzRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBhcmVhUmF0aW8/OiBudW1iZXJcclxuKSB7XHJcbiAgLy8gQW4gYXJlYSByYXRpbyBvZiAwLjAwNCBtZWFucyB0aGF0IHRoZSBmZWF0dXJlIGV4dGVudCdzIHdpZHRoIGFuZCBoZWlnaHRcclxuICAvLyBzaG91bGQgYmUgYWJvdXQgMS8xNiBvZiB0aGUgbWFwIGV4dGVudCdzIHdpZHRoIGFuZCBoZWlnaHRcclxuICBhcmVhUmF0aW8gPSBhcmVhUmF0aW8gPyBhcmVhUmF0aW8gOiAwLjAwNDtcclxuICBjb25zdCBtYXBFeHRlbnQgPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KCk7XHJcbiAgY29uc3QgbWFwRXh0ZW50QXJlYSA9IG9sZXh0ZW50LmdldEFyZWEobWFwRXh0ZW50KTtcclxuICBjb25zdCBmZWF0dXJlc0V4dGVudEFyZWEgPSBvbGV4dGVudC5nZXRBcmVhKGZlYXR1cmVzRXh0ZW50KTtcclxuXHJcbiAgaWYgKGZlYXR1cmVzRXh0ZW50QXJlYSA9PT0gMCAmJiBtYXAudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpID4gMTMpIHsgLy8gSW4gY2FzZSBpdCdzIGEgcG9pbnRcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZlYXR1cmVzRXh0ZW50QXJlYSAvIG1hcEV4dGVudEFyZWEgPCBhcmVhUmF0aW87XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaXQgdmlldyB0byBpbmNsdWRlIHRoZSBmZWF0dXJlcyBleHRlbnQuXHJcbiAqIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIHdpbGwgbGV0IHRoZSBmZWF0dXJlcyBvY2N1cHkgYWJvdXQgNTAlIG9mIHRoZSB2aWV3cG9ydC5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZXNcclxuICogQHBhcmFtIG1vdGlvbiBUbyBtb3Rpb24gdG8gdGhlIG5ldyBtYXAgdmlld1xyXG4gKiBAcGFyYW0gc2NhbGUgSWYgdGhpcyBpcyBkZWZpbmVkLCB0aGUgb3JpZ2luYWwgdmlldyB3aWxsIGJlIHNjYWxlZFxyXG4gKiAgYnkgdGhhdCBmYWN0b3IgYmVmb3JlIGFueSBsb2dpYyBpcyBhcHBsaWVkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb09sRmVhdHVyZXMoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0LFxyXG4gIHNjYWxlPzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgYXJlYVJhdGlvPzogbnVtYmVyXHJcbikge1xyXG4gIGNvbnN0IGZlYXR1cmVzRXh0ZW50ID0gY29tcHV0ZU9sRmVhdHVyZXNFeHRlbnQobWFwLCBvbEZlYXR1cmVzKTtcclxuICBsZXQgdmlld0V4dGVudCA9IGZlYXR1cmVzRXh0ZW50O1xyXG4gIGlmIChzY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB2aWV3RXh0ZW50ID0gc2NhbGVFeHRlbnQodmlld0V4dGVudCwgc2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5ab29tKSB7XHJcbiAgICBtYXAudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KHZpZXdFeHRlbnQpO1xyXG4gIH0gZWxzZSBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLk1vdmUpIHtcclxuICAgIG1hcC52aWV3Q29udHJvbGxlci5tb3ZlVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgfSBlbHNlIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uRGVmYXVsdCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBmZWF0dXJlc0FyZU91dE9mVmlldyhtYXAsIGZlYXR1cmVzRXh0ZW50KSB8fFxyXG4gICAgICBmZWF0dXJlc0FyZVRvb0RlZXBJblZpZXcobWFwLCBmZWF0dXJlc0V4dGVudCwgYXJlYVJhdGlvKVxyXG4gICAgKSB7XHJcbiAgICAgIG1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGlkZSBhbiBPTCBmZWF0dXJlXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVPbEZlYXR1cmUob2xGZWF0dXJlOiBPbEZlYXR1cmUpIHtcclxuICBvbEZlYXR1cmUuc2V0U3R5bGUobmV3IG9sc3R5bGUuU3R5bGUoe30pKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBiaW5kIGEgbGF5ZXIgdG8gYSBzdG9yZSBpZiBub25lIGlzIGJvdW5kIGFscmVhZHkuXHJcbiAqIFRoZSBsYXllciB3aWxsIGFsc28gYmUgYWRkZWQgdG8gdGhlIHN0b3JlJ3MgbWFwLlxyXG4gKiBJZiBubyBsYXllciBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgbGF5ZXJcclxuICogQHBhcmFtIGxheWVyIEFuIG9wdGlvbmFsIFZlY3RvckxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QmluZFN0b3JlTGF5ZXIoc3RvcmU6IEZlYXR1cmVTdG9yZSwgbGF5ZXI/OiBWZWN0b3JMYXllcikge1xyXG4gIGlmIChzdG9yZS5sYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAoc3RvcmUubGF5ZXIubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3RvcmUubWFwLmFkZExheWVyKHN0b3JlLmxheWVyKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxheWVyID0gbGF5ZXJcclxuICAgID8gbGF5ZXJcclxuICAgIDogbmV3IFZlY3RvckxheWVyKHtcclxuICAgICAgICBzb3VyY2U6IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpXHJcbiAgICAgIH0pO1xyXG4gIHN0b3JlLmJpbmRMYXllcihsYXllcik7XHJcbiAgaWYgKHN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5tYXAuYWRkTGF5ZXIoc3RvcmUubGF5ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBhZGQgYSBsb2FkaW5nIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGFjdGl2YXRlIGl0LlxyXG4gKiBJZiBubyBzdHJhdGVneSBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgbG9hZGluZyBzdHJhdGVneVxyXG4gKiBAcGFyYW0gc3RyYXRlZ3kgQW4gb3B0aW9uYWwgbG9hZGluZyBzdHJhdGVneVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyeUFkZExvYWRpbmdTdHJhdGVneShcclxuICBzdG9yZTogRmVhdHVyZVN0b3JlLFxyXG4gIHN0cmF0ZWd5PzogRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5XHJcbikge1xyXG4gIGlmIChzdG9yZS5nZXRTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLmFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHN0cmF0ZWd5ID0gc3RyYXRlZ3kgPyBzdHJhdGVneSA6IG5ldyBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3koe30pO1xyXG4gIHN0b3JlLmFkZFN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICBzdHJhdGVneS5hY3RpdmF0ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGFkZCBhIHNlbGVjdGlvbiBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBhY3RpdmF0ZSBpdC5cclxuICogSWYgbm8gc3RyYXRlZ3kgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIHNlbGVjdGlvbiBzdHJhdGVneVxyXG4gKiBAcGFyYW0gW3N0cmF0ZWd5XSBBbiBvcHRpb25hbCBzZWxlY3Rpb24gc3RyYXRlZ3lcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlBZGRTZWxlY3Rpb25TdHJhdGVneShcclxuICBzdG9yZTogRmVhdHVyZVN0b3JlLFxyXG4gIHN0cmF0ZWd5PzogRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lcclxuKSB7XHJcbiAgaWYgKHN0b3JlLmdldFN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgc3RyYXRlZ3kgPSBzdHJhdGVneVxyXG4gICAgPyBzdHJhdGVneVxyXG4gICAgOiBuZXcgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3koe1xyXG4gICAgICAgIG1hcDogc3RvcmUubWFwXHJcbiAgICAgIH0pO1xyXG4gIHN0b3JlLmFkZFN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICBzdHJhdGVneS5hY3RpdmF0ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhIGRpZmYgYmV0d2VlbiBhIHNvdXJjZSBhcnJheSBvZiBPbCBmZWF0dXJlcyBhbmQgYSB0YXJnZXQgYXJyYXlcclxuICogQHBhcmFtIHNvdXJjZSBTb3VyY2UgYXJyYXkgb2YgT0wgZmVhdHVyZXNcclxuICogQHBhcmFtIHN0YXJnZXQgVGFyZ2V0IGFycmF5IG9mIE9MIGZlYXR1cmVzXHJcbiAqIEByZXR1cm5zIEZlYXR1cmVzIHRvIGFkZCBhbmQgcmVtb3ZlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZXNEaWZmKFxyXG4gIHNvdXJjZTogT2xGZWF0dXJlW10sXHJcbiAgdGFyZ2V0OiBPbEZlYXR1cmVbXVxyXG4pOiB7XHJcbiAgYWRkOiBPbEZlYXR1cmVbXTtcclxuICByZW1vdmU6IE9sRmVhdHVyZTtcclxufSB7XHJcbiAgY29uc3Qgb2xGZWF0dXJlc01hcCA9IG5ldyBNYXAoKTtcclxuICB0YXJnZXQuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIG9sRmVhdHVyZXNNYXAuc2V0KG9sRmVhdHVyZS5nZXRJZCgpLCBvbEZlYXR1cmUpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBvbEZlYXR1cmVzVG9SZW1vdmUgPSBbXTtcclxuICBzb3VyY2UuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIGNvbnN0IG5ld09sRmVhdHVyZSA9IG9sRmVhdHVyZXNNYXAuZ2V0KG9sRmVhdHVyZS5nZXRJZCgpKTtcclxuICAgIGlmIChuZXdPbEZlYXR1cmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvbEZlYXR1cmVzVG9SZW1vdmUucHVzaChvbEZlYXR1cmUpO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgbmV3T2xGZWF0dXJlLmdldCgnX2VudGl0eVJldmlzaW9uJykgIT09IG9sRmVhdHVyZS5nZXQoJ19lbnRpdHlSZXZpc2lvbicpXHJcbiAgICApIHtcclxuICAgICAgb2xGZWF0dXJlc1RvUmVtb3ZlLnB1c2gob2xGZWF0dXJlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9sRmVhdHVyZXNNYXAuZGVsZXRlKG5ld09sRmVhdHVyZS5nZXRJZCgpKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29uc3Qgb2xGZWF0dXJlc1RvQWRkSWRzID0gQXJyYXkuZnJvbShvbEZlYXR1cmVzTWFwLmtleXMoKSk7XHJcbiAgY29uc3Qgb2xGZWF0dXJlc1RvQWRkID0gdGFyZ2V0LmZpbHRlcigob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIHJldHVybiBvbEZlYXR1cmVzVG9BZGRJZHMuaW5kZXhPZihvbEZlYXR1cmUuZ2V0SWQoKSkgPj0gMDtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGFkZDogb2xGZWF0dXJlc1RvQWRkLFxyXG4gICAgcmVtb3ZlOiBvbEZlYXR1cmVzVG9SZW1vdmVcclxuICB9O1xyXG59XHJcbiJdfQ==