/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    const olFormat = new OlFormatGeoJSON();
    /** @type {?} */
    const olFeature = olFormat.readFeature(feature, {
        dataProjection: feature.projection,
        featureProjection: projectionOut
    });
    olFeature.setId(getId(feature));
    /** @type {?} */
    const title = getEntityTitle(feature);
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
    const mapTitle = getEntityProperty(feature, 'meta.mapTitle');
    if (mapTitle !== undefined) {
        olFeature.set('_mapTitle', mapTitle, true);
    }
    olFeature.set('_entityRevision', getEntityRevision(feature), true);
    /** @type {?} */
    const icon = getEntityIcon(feature);
    if (icon !== undefined) {
        olFeature.set('_icon', icon, true);
    }
    if (feature.meta && feature.meta.style) {
        olFeature.set('_style', feature.meta.style, true);
    }
    if (feature.sourceId) {
        olFeature.set('_sourceId', feature.sourceId, true);
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
export function renderFeatureFromOl(olRenderFeature, projectionIn, olLayer, projectionOut = 'EPSG:4326') {
    /** @type {?} */
    let geom;
    /** @type {?} */
    let title;
    /** @type {?} */
    let exclude;
    /** @type {?} */
    let excludeOffline;
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
    const olFormat = new OlFormatGeoJSON();
    /** @type {?} */
    const properties = olRenderFeature.getProperties();
    /** @type {?} */
    const geometryType = olRenderFeature.getType();
    if (geometryType === 'Polygon') {
        /** @type {?} */
        const ends = olRenderFeature.ends_;
        geom = new OlPolygon(olRenderFeature.flatCoordinates_, OlGeometryLayout.XY, ends);
    }
    else if (geometryType === 'Point') {
        geom = new OlPoint(olRenderFeature.flatCoordinates_, OlGeometryLayout.XY);
    }
    else if (geometryType === 'LineString') {
        geom = new OlLineString(olRenderFeature.flatCoordinates_, OlGeometryLayout.XY);
    }
    /** @type {?} */
    const geometry = olFormat.writeGeometryObject(geom, {
        dataProjection: projectionOut,
        featureProjection: projectionIn
    });
    /** @type {?} */
    const id = olRenderFeature.getId() ? olRenderFeature.getId() : uuid();
    /** @type {?} */
    const mapTitle = olRenderFeature.get('_mapTitle');
    return {
        type: FEATURE,
        projection: projectionOut,
        extent: olRenderFeature.getExtent(),
        meta: {
            id,
            title: title ? title : mapTitle ? mapTitle : id,
            mapTitle,
            excludeAttribute: exclude,
            excludeAttributeOffline: excludeOffline
        },
        properties,
        geometry,
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
export function featureFromOl(olFeature, projectionIn, olLayer, projectionOut = 'EPSG:4326') {
    /** @type {?} */
    let title;
    /** @type {?} */
    let exclude;
    /** @type {?} */
    let excludeOffline;
    /** @type {?} */
    const olFormat = new OlFormatGeoJSON();
    /** @type {?} */
    const keys = olFeature.getKeys().filter((/**
     * @param {?} key
     * @return {?}
     */
    (key) => {
        return !key.startsWith('_') && key !== 'geometry';
    }));
    /** @type {?} */
    const properties = keys.reduce((/**
     * @param {?} acc
     * @param {?} key
     * @return {?}
     */
    (acc, key) => {
        acc[key] = olFeature.get(key);
        return acc;
    }), {});
    /** @type {?} */
    const geometry = olFormat.writeGeometryObject(olFeature.getGeometry(), {
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
    const mapTitle = olFeature.get('_mapTitle');
    /** @type {?} */
    const id = olFeature.getId() ? olFeature.getId() : uuid();
    return {
        type: FEATURE,
        projection: projectionOut,
        extent: olFeature.get('_extent'),
        meta: {
            id,
            title: title ? title : mapTitle ? mapTitle : id,
            mapTitle,
            revision: olFeature.getRevision(),
            style: olFeature.get('_style'),
            excludeAttribute: exclude,
            excludeAttributeOffline: excludeOffline
        },
        properties,
        geometry,
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
    let olExtent = olextent.createEmpty();
    /** @type {?} */
    const olFeatureExtent = olFeature.get('_extent');
    /** @type {?} */
    const olFeatureProjection = olFeature.get('_projection');
    if (olFeatureExtent !== undefined && olFeatureProjection !== undefined) {
        olExtent = olproj.transformExtent(olFeatureExtent, olFeatureProjection, map.projection);
    }
    else {
        /** @type {?} */
        const olGeometry = olFeature.getGeometry();
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
    const extent = olextent.createEmpty();
    olFeatures.forEach((/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature) => {
        /** @type {?} */
        const featureExtent = computeOlFeatureExtent(map, olFeature);
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
    const [width, height] = olextent.getSize(extent);
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
    const mapExtent = map.viewController.getExtent();
    /** @type {?} */
    const edgeRatio = 0.05;
    /** @type {?} */
    const scale = [-1, -1, -1, -1].map((/**
     * @param {?} x
     * @return {?}
     */
    x => x * edgeRatio));
    /** @type {?} */
    const viewExtent = scaleExtent(mapExtent, (/** @type {?} */ (scale)));
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
    const mapExtent = map.viewController.getExtent();
    /** @type {?} */
    const mapExtentArea = olextent.getArea(mapExtent);
    /** @type {?} */
    const featuresExtentArea = olextent.getArea(featuresExtent);
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
export function moveToOlFeatures(map, olFeatures, motion = FeatureMotion.Default, scale, areaRatio) {
    /** @type {?} */
    const featuresExtent = computeOlFeaturesExtent(map, olFeatures);
    /** @type {?} */
    let viewExtent = featuresExtent;
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
    const olFeaturesMap = new Map();
    target.forEach((/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature) => {
        olFeaturesMap.set(olFeature.getId(), olFeature);
    }));
    /** @type {?} */
    const olFeaturesToRemove = [];
    source.forEach((/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature) => {
        /** @type {?} */
        const newOlFeature = olFeaturesMap.get(olFeature.getId());
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
    const olFeaturesToAddIds = Array.from(olFeaturesMap.keys());
    /** @type {?} */
    const olFeaturesToAdd = target.filter((/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature) => {
        return olFeaturesToAddIds.indexOf(olFeature.getId()) >= 0;
    }));
    return {
        add: olFeaturesToAdd,
        remove: olFeaturesToRemove
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUVwQyxPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUNwQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFFTCxXQUFXLEVBQ1gsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sY0FBYyxDQUFDO0FBR3RCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLDZCQUE2QixFQUM5QixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O0FBU3RCLE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQWdCLEVBQ2hCLGFBQXFCLEVBQ3JCLEtBQThCO0lBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOztVQUU5QixRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUU7O1VBQ2hDLFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUM5QyxjQUFjLEVBQUUsT0FBTyxDQUFDLFVBQVU7UUFDbEMsaUJBQWlCLEVBQUUsYUFBYTtLQUNqQyxDQUFDO0lBRUYsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7VUFFMUIsS0FBSyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7SUFDckMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3ZCLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0QztJQUVELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDaEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNoRDtJQUVELElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN4RDs7VUFFSyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQztJQUM1RCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7UUFDMUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzVDO0lBRUQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7VUFFN0QsSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNwQztJQUVELElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUN0QyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNuRDtJQUVELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNwQixTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLGVBQWdDLEVBQ2hDLFlBQW9CLEVBQ3BCLE9BQWlCLEVBQ2pCLGFBQWEsR0FBRyxXQUFXOztRQUVyQixJQUFJOztRQUNKLEtBQUs7O1FBQ0wsT0FBTzs7UUFDUCxjQUFjO0lBRWxCLElBQUksT0FBTyxFQUFFO1FBQ1gsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO1lBQ3hELGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO1NBQ3ZFO0tBQ0Y7U0FBTTtRQUNMLEtBQUssR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZDOztVQUVLLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRTs7VUFDaEMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxhQUFhLEVBQUU7O1VBQzVDLFlBQVksR0FBRyxlQUFlLENBQUMsT0FBTyxFQUFFO0lBRTlDLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTs7Y0FDeEIsSUFBSSxHQUFHLGVBQWUsQ0FBQyxLQUFLO1FBQ2xDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ25GO1NBQU0sSUFBSSxZQUFZLEtBQUssT0FBTyxFQUFFO1FBQ25DLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDM0U7U0FBTSxJQUFJLFlBQVksS0FBSyxZQUFZLEVBQUU7UUFDeEMsSUFBSSxHQUFHLElBQUksWUFBWSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNoRjs7VUFFSyxRQUFRLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRTtRQUNsRCxjQUFjLEVBQUUsYUFBYTtRQUM3QixpQkFBaUIsRUFBRSxZQUFZO0tBQ2hDLENBQUM7O1VBRUksRUFBRSxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7O1VBQy9ELFFBQVEsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUVqRCxPQUFPO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixVQUFVLEVBQUUsYUFBYTtRQUN6QixNQUFNLEVBQUUsZUFBZSxDQUFDLFNBQVMsRUFBRTtRQUNuQyxJQUFJLEVBQUU7WUFDSixFQUFFO1lBQ0YsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQyxRQUFRO1lBQ1IsZ0JBQWdCLEVBQUUsT0FBTztZQUN6Qix1QkFBdUIsRUFBRSxjQUFjO1NBQ3hDO1FBQ0QsVUFBVTtRQUNWLFFBQVE7UUFDUixFQUFFLEVBQUUsZUFBZTtLQUNwQixDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7OztBQVVILE1BQU0sVUFBVSxhQUFhLENBQzNCLFNBQW9CLEVBQ3BCLFlBQW9CLEVBQ3BCLE9BQWlCLEVBQ2pCLGFBQWEsR0FBRyxXQUFXOztRQUV2QixLQUFLOztRQUNMLE9BQU87O1FBQ1AsY0FBYzs7VUFDWixRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUU7O1VBRWhDLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTTs7OztJQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLFVBQVUsQ0FBQztJQUNwRCxDQUFDLEVBQUM7O1VBQ0ksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNOzs7OztJQUFDLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxFQUFFO1FBQzFELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxHQUFFLEVBQUUsQ0FBQzs7VUFFQSxRQUFRLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNyRSxjQUFjLEVBQUUsYUFBYTtRQUM3QixpQkFBaUIsRUFBRSxZQUFZO0tBQ2hDLENBQUM7SUFFRixJQUFJLE9BQU8sRUFBRTtRQUNYLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNoQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN4RCxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2RTtLQUNGO1NBQU07UUFDTCxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQzs7VUFDSyxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7O1VBQ3JDLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBRXpELE9BQU87UUFDTCxJQUFJLEVBQUUsT0FBTztRQUNiLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLEVBQUU7WUFDSixFQUFFO1lBQ0YsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQyxRQUFRO1lBQ1IsUUFBUSxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDakMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzlCLGdCQUFnQixFQUFFLE9BQU87WUFDekIsdUJBQXVCLEVBQUUsY0FBYztTQUN4QztRQUNELFVBQVU7UUFDVixRQUFRO1FBQ1IsRUFBRSxFQUFFLFNBQVM7S0FDZCxDQUFDO0FBQ0osQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxzQkFBc0IsQ0FDcEMsR0FBVyxFQUNYLFNBQW9COztRQUVoQixRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRTs7VUFFL0IsZUFBZSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDOztVQUMxQyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN4RCxJQUFJLGVBQWUsS0FBSyxTQUFTLElBQUksbUJBQW1CLEtBQUssU0FBUyxFQUFFO1FBQ3RFLFFBQVEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUMvQixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLEdBQUcsQ0FBQyxVQUFVLENBQ2YsQ0FBQztLQUNIO1NBQU07O2NBQ0MsVUFBVSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7UUFDMUMsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbkM7S0FDRjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsdUJBQXVCLENBQ3JDLEdBQVcsRUFDWCxVQUF1Qjs7VUFFakIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFFckMsVUFBVSxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTs7Y0FDcEMsYUFBYSxHQUFHLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7UUFDNUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDekMsQ0FBQyxFQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLFdBQVcsQ0FDekIsTUFBd0MsRUFDeEMsS0FBdUM7VUFFakMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDaEQsT0FBTztRQUNMLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDckQsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7OztBQVVELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsR0FBVyxFQUNYLGNBQWdEOztVQUUxQyxTQUFTLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7O1VBQzFDLFNBQVMsR0FBRyxJQUFJOztVQUNoQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUM7O1VBQ2hELFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUyxFQUFFLG1CQUFBLEtBQUssRUFLOUMsQ0FBQztJQUVGLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM5RCxDQUFDOzs7Ozs7Ozs7OztBQVlELE1BQU0sVUFBVSx3QkFBd0IsQ0FDdEMsR0FBVyxFQUNYLGNBQWdELEVBQ2hELFNBQWtCO0lBRWxCLDBFQUEwRTtJQUMxRSw0REFBNEQ7SUFDNUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O1VBQ3BDLFNBQVMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRTs7VUFDMUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztVQUMzQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUUzRCxJQUFJLGtCQUFrQixLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLHVCQUF1QjtRQUN4RixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE9BQU8sa0JBQWtCLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUN4RCxDQUFDOzs7Ozs7Ozs7Ozs7QUFXRCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLEdBQVcsRUFDWCxVQUF1QixFQUN2QixTQUF3QixhQUFhLENBQUMsT0FBTyxFQUM3QyxLQUF3QyxFQUN4QyxTQUFrQjs7VUFFWixjQUFjLEdBQUcsdUJBQXVCLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQzs7UUFDM0QsVUFBVSxHQUFHLGNBQWM7SUFDL0IsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3ZCLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdDO0lBRUQsSUFBSSxNQUFNLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtRQUNqQyxHQUFHLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM3QztTQUFNLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDeEMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0M7U0FBTSxJQUFJLE1BQU0sS0FBSyxhQUFhLENBQUMsT0FBTyxFQUFFO1FBQzNDLElBQ0Usb0JBQW9CLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQztZQUN6Qyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUN4RDtZQUNBLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdDO0tBQ0Y7QUFDSCxDQUFDOzs7Ozs7QUFNRCxNQUFNLFVBQVUsYUFBYSxDQUFDLFNBQW9CO0lBQ2hELFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQzs7Ozs7Ozs7O0FBU0QsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQW1CLEVBQUUsS0FBbUI7SUFDeEUsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUM3QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPO0tBQ1I7SUFFRCxLQUFLLEdBQUcsS0FBSztRQUNYLENBQUMsQ0FBQyxLQUFLO1FBQ1AsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDO1lBQ2QsTUFBTSxFQUFFLElBQUksaUJBQWlCLEVBQUU7U0FDaEMsQ0FBQyxDQUFDO0lBQ1AsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtRQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDOzs7Ozs7OztBQVFELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsS0FBbUIsRUFDbkIsUUFBc0M7SUFFdEMsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsMkJBQTJCLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDdEUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDMUQsT0FBTztLQUNSO0lBRUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLHVCQUF1QixDQUNyQyxLQUFtQixFQUNuQixRQUF3QztJQUV4QyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN4RSxLQUFLLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1RCxPQUFPO0tBQ1I7SUFDRCxRQUFRLEdBQUcsUUFBUTtRQUNqQixDQUFDLENBQUMsUUFBUTtRQUNWLENBQUMsQ0FBQyxJQUFJLDZCQUE2QixDQUFDO1lBQ2hDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztTQUNmLENBQUMsQ0FBQztJQUNQLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLENBQUM7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLE1BQW1CLEVBQ25CLE1BQW1COztVQUtiLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRTtJQUMvQixNQUFNLENBQUMsT0FBTzs7OztJQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1FBQ3RDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUMsRUFBQyxDQUFDOztVQUVHLGtCQUFrQixHQUFHLEVBQUU7SUFDN0IsTUFBTSxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTs7Y0FDaEMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pELElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUM5QixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUNMLFlBQVksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQ3hFO1lBQ0Esa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxhQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQyxFQUFDLENBQUM7O1VBRUcsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O1VBQ3JELGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTTs7OztJQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1FBQzdELE9BQU8sa0JBQWtCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLEVBQUM7SUFFRixPQUFPO1FBQ0wsR0FBRyxFQUFFLGVBQWU7UUFDcEIsTUFBTSxFQUFFLGtCQUFrQjtLQUMzQixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbEdlb21ldHJ5TGF5b3V0IGZyb20gJ29sL2dlb20vR2VvbWV0cnlMYXlvdXQnO1xyXG5pbXBvcnQgT2xQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XHJcbmltcG9ydCBPbFBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xyXG5pbXBvcnQgT2xMaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XHJcbmltcG9ydCBPbFJlbmRlckZlYXR1cmUgZnJvbSAnb2wvcmVuZGVyL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IE9sTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBFbnRpdHlLZXksXHJcbiAgZ2V0RW50aXR5SWQsXHJcbiAgZ2V0RW50aXR5VGl0bGUsXHJcbiAgZ2V0RW50aXR5UmV2aXNpb24sXHJcbiAgZ2V0RW50aXR5SWNvbixcclxuICBnZXRFbnRpdHlQcm9wZXJ0eVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRkVBVFVSRSwgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4vZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSxcclxuICBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJy4vc3RyYXRlZ2llcyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIE9wZW5sYXllcnMgZmVhdHVyZSBvYmplY3Qgb3V0IG9mIGEgZmVhdHVyZSBkZWZpbml0aW9uLlxyXG4gKiBUaGUgb3V0cHV0IG9iamVjdCBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGZlYXR1cmUgaWQuXHJcbiAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmUgZGVmaW5pdGlvblxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbk91dCBGZWF0dXJlIG9iamVjdCBwcm9qZWN0aW9uXHJcbiAqIEByZXR1cm5zIE9wZW5MYXllcnMgZmVhdHVyZSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlVG9PbChcclxuICBmZWF0dXJlOiBGZWF0dXJlLFxyXG4gIHByb2plY3Rpb25PdXQ6IHN0cmluZyxcclxuICBnZXRJZD86IChGZWF0dXJlKSA9PiBFbnRpdHlLZXlcclxuKTogT2xGZWF0dXJlIHtcclxuICBnZXRJZCA9IGdldElkID8gZ2V0SWQgOiBnZXRFbnRpdHlJZDtcclxuXHJcbiAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcbiAgY29uc3Qgb2xGZWF0dXJlID0gb2xGb3JtYXQucmVhZEZlYXR1cmUoZmVhdHVyZSwge1xyXG4gICAgZGF0YVByb2plY3Rpb246IGZlYXR1cmUucHJvamVjdGlvbixcclxuICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0XHJcbiAgfSk7XHJcblxyXG4gIG9sRmVhdHVyZS5zZXRJZChnZXRJZChmZWF0dXJlKSk7XHJcblxyXG4gIGNvbnN0IHRpdGxlID0gZ2V0RW50aXR5VGl0bGUoZmVhdHVyZSk7XHJcbiAgaWYgKHRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ190aXRsZScsIHRpdGxlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLmV4dGVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfZXh0ZW50JywgZmVhdHVyZS5leHRlbnQsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUucHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfcHJvamVjdGlvbicsIGZlYXR1cmUucHJvamVjdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXBUaXRsZSA9IGdldEVudGl0eVByb3BlcnR5KGZlYXR1cmUsICdtZXRhLm1hcFRpdGxlJyk7XHJcbiAgaWYgKG1hcFRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19tYXBUaXRsZScsIG1hcFRpdGxlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIG9sRmVhdHVyZS5zZXQoJ19lbnRpdHlSZXZpc2lvbicsIGdldEVudGl0eVJldmlzaW9uKGZlYXR1cmUpLCB0cnVlKTtcclxuXHJcbiAgY29uc3QgaWNvbiA9IGdldEVudGl0eUljb24oZmVhdHVyZSk7XHJcbiAgaWYgKGljb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX2ljb24nLCBpY29uLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLm1ldGEgJiYgZmVhdHVyZS5tZXRhLnN0eWxlKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfc3R5bGUnLCBmZWF0dXJlLm1ldGEuc3R5bGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUuc291cmNlSWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19zb3VyY2VJZCcsIGZlYXR1cmUuc291cmNlSWQsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9sRmVhdHVyZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckZlYXR1cmVGcm9tT2woXHJcbiAgb2xSZW5kZXJGZWF0dXJlOiBPbFJlbmRlckZlYXR1cmUsXHJcbiAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgb2xMYXllcj86IE9sTGF5ZXIsXHJcbiAgcHJvamVjdGlvbk91dCA9ICdFUFNHOjQzMjYnXHJcbiAgKTogRmVhdHVyZSB7XHJcbiAgICBsZXQgZ2VvbTtcclxuICAgIGxldCB0aXRsZTtcclxuICAgIGxldCBleGNsdWRlO1xyXG4gICAgbGV0IGV4Y2x1ZGVPZmZsaW5lO1xyXG5cclxuICAgIGlmIChvbExheWVyKSB7XHJcbiAgICAgIHRpdGxlID0gb2xMYXllci5nZXQoJ3RpdGxlJyk7XHJcbiAgICAgIGlmIChvbExheWVyLmdldCgnc291cmNlT3B0aW9ucycpKSB7XHJcbiAgICAgICAgZXhjbHVkZSA9IG9sTGF5ZXIuZ2V0KCdzb3VyY2VPcHRpb25zJykuZXhjbHVkZUF0dHJpYnV0ZTtcclxuICAgICAgICBleGNsdWRlT2ZmbGluZSA9IG9sTGF5ZXIuZ2V0KCdzb3VyY2VPcHRpb25zJykuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRpdGxlID0gb2xSZW5kZXJGZWF0dXJlLmdldCgnX3RpdGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gb2xSZW5kZXJGZWF0dXJlLmdldFByb3BlcnRpZXMoKTtcclxuICAgIGNvbnN0IGdlb21ldHJ5VHlwZSA9IG9sUmVuZGVyRmVhdHVyZS5nZXRUeXBlKCk7XHJcblxyXG4gICAgaWYgKGdlb21ldHJ5VHlwZSA9PT0gJ1BvbHlnb24nKSB7XHJcbiAgICAgIGNvbnN0IGVuZHMgPSBvbFJlbmRlckZlYXR1cmUuZW5kc187XHJcbiAgICAgIGdlb20gPSBuZXcgT2xQb2x5Z29uKG9sUmVuZGVyRmVhdHVyZS5mbGF0Q29vcmRpbmF0ZXNfLCBPbEdlb21ldHJ5TGF5b3V0LlhZLCBlbmRzKTtcclxuICAgIH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICAgIGdlb20gPSBuZXcgT2xQb2ludChvbFJlbmRlckZlYXR1cmUuZmxhdENvb3JkaW5hdGVzXywgT2xHZW9tZXRyeUxheW91dC5YWSk7XHJcbiAgICB9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PT0gJ0xpbmVTdHJpbmcnKSB7XHJcbiAgICAgIGdlb20gPSBuZXcgT2xMaW5lU3RyaW5nKG9sUmVuZGVyRmVhdHVyZS5mbGF0Q29vcmRpbmF0ZXNfLCBPbEdlb21ldHJ5TGF5b3V0LlhZKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG9sRm9ybWF0LndyaXRlR2VvbWV0cnlPYmplY3QoZ2VvbSwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JblxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaWQgPSBvbFJlbmRlckZlYXR1cmUuZ2V0SWQoKSA/IG9sUmVuZGVyRmVhdHVyZS5nZXRJZCgpIDogdXVpZCgpO1xyXG4gICAgY29uc3QgbWFwVGl0bGUgPSBvbFJlbmRlckZlYXR1cmUuZ2V0KCdfbWFwVGl0bGUnKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgICBleHRlbnQ6IG9sUmVuZGVyRmVhdHVyZS5nZXRFeHRlbnQoKSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlIDogbWFwVGl0bGUgPyBtYXBUaXRsZSA6IGlkLFxyXG4gICAgICAgIG1hcFRpdGxlLFxyXG4gICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGU6IGV4Y2x1ZGUsXHJcbiAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU6IGV4Y2x1ZGVPZmZsaW5lXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3BlcnRpZXMsXHJcbiAgICAgIGdlb21ldHJ5LFxyXG4gICAgICBvbDogb2xSZW5kZXJGZWF0dXJlXHJcbiAgICB9O1xyXG4gIH1cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGZlYXR1cmUgb2JqZWN0IG91dCBvZiBhbiBPTCBmZWF0dXJlXHJcbiAqIFRoZSBvdXRwdXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZmVhdHVyZSBpZC5cclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBGZWF0dXJlXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uSW4gT0wgZmVhdHVyZSBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBvbExheWVyIE9MIExheWVyXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uT3V0IEZlYXR1cmUgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBGZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUZyb21PbChcclxuICBvbEZlYXR1cmU6IE9sRmVhdHVyZSxcclxuICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICBvbExheWVyPzogT2xMYXllcixcclxuICBwcm9qZWN0aW9uT3V0ID0gJ0VQU0c6NDMyNidcclxuKTogRmVhdHVyZSB7XHJcbiAgbGV0IHRpdGxlO1xyXG4gIGxldCBleGNsdWRlO1xyXG4gIGxldCBleGNsdWRlT2ZmbGluZTtcclxuICBjb25zdCBvbEZvcm1hdCA9IG5ldyBPbEZvcm1hdEdlb0pTT04oKTtcclxuXHJcbiAgY29uc3Qga2V5cyA9IG9sRmVhdHVyZS5nZXRLZXlzKCkuZmlsdGVyKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuICFrZXkuc3RhcnRzV2l0aCgnXycpICYmIGtleSAhPT0gJ2dlb21ldHJ5JztcclxuICB9KTtcclxuICBjb25zdCBwcm9wZXJ0aWVzID0ga2V5cy5yZWR1Y2UoKGFjYzogb2JqZWN0LCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgYWNjW2tleV0gPSBvbEZlYXR1cmUuZ2V0KGtleSk7XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIHt9KTtcclxuXHJcbiAgY29uc3QgZ2VvbWV0cnkgPSBvbEZvcm1hdC53cml0ZUdlb21ldHJ5T2JqZWN0KG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpLCB7XHJcbiAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW5cclxuICB9KTtcclxuXHJcbiAgaWYgKG9sTGF5ZXIpIHtcclxuICAgIHRpdGxlID0gb2xMYXllci5nZXQoJ3RpdGxlJyk7XHJcbiAgICBpZiAob2xMYXllci5nZXQoJ3NvdXJjZU9wdGlvbnMnKSkge1xyXG4gICAgICBleGNsdWRlID0gb2xMYXllci5nZXQoJ3NvdXJjZU9wdGlvbnMnKS5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICBleGNsdWRlT2ZmbGluZSA9IG9sTGF5ZXIuZ2V0KCdzb3VyY2VPcHRpb25zJykuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpdGxlID0gb2xGZWF0dXJlLmdldCgnX3RpdGxlJyk7XHJcbiAgfVxyXG4gIGNvbnN0IG1hcFRpdGxlID0gb2xGZWF0dXJlLmdldCgnX21hcFRpdGxlJyk7XHJcbiAgY29uc3QgaWQgPSBvbEZlYXR1cmUuZ2V0SWQoKSA/IG9sRmVhdHVyZS5nZXRJZCgpIDogdXVpZCgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogRkVBVFVSRSxcclxuICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBleHRlbnQ6IG9sRmVhdHVyZS5nZXQoJ19leHRlbnQnKSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaWQsXHJcbiAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlIDogbWFwVGl0bGUgPyBtYXBUaXRsZSA6IGlkLFxyXG4gICAgICBtYXBUaXRsZSxcclxuICAgICAgcmV2aXNpb246IG9sRmVhdHVyZS5nZXRSZXZpc2lvbigpLFxyXG4gICAgICBzdHlsZTogb2xGZWF0dXJlLmdldCgnX3N0eWxlJyksXHJcbiAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGU6IGV4Y2x1ZGUsXHJcbiAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lOiBleGNsdWRlT2ZmbGluZVxyXG4gICAgfSxcclxuICAgIHByb3BlcnRpZXMsXHJcbiAgICBnZW9tZXRyeSxcclxuICAgIG9sOiBvbEZlYXR1cmVcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhbiBPTCBmZWF0dXJlIGV4dGVudCBpbiBpdCdzIG1hcCBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgZmVhdHVyZVxyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZUV4dGVudChcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmU6IE9sRmVhdHVyZVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgbGV0IG9sRXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuXHJcbiAgY29uc3Qgb2xGZWF0dXJlRXh0ZW50ID0gb2xGZWF0dXJlLmdldCgnX2V4dGVudCcpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZVByb2plY3Rpb24gPSBvbEZlYXR1cmUuZ2V0KCdfcHJvamVjdGlvbicpO1xyXG4gIGlmIChvbEZlYXR1cmVFeHRlbnQgIT09IHVuZGVmaW5lZCAmJiBvbEZlYXR1cmVQcm9qZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRXh0ZW50ID0gb2xwcm9qLnRyYW5zZm9ybUV4dGVudChcclxuICAgICAgb2xGZWF0dXJlRXh0ZW50LFxyXG4gICAgICBvbEZlYXR1cmVQcm9qZWN0aW9uLFxyXG4gICAgICBtYXAucHJvamVjdGlvblxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgaWYgKG9sR2VvbWV0cnkgIT09IG51bGwpIHtcclxuICAgICAgb2xFeHRlbnQgPSBvbEdlb21ldHJ5LmdldEV4dGVudCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9sRXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhIG11bHRpcGxlIE9MIGZlYXR1cmVzIGV4dGVudCBpbiB0aGVpciBtYXAgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZXNFeHRlbnQoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW11cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IGV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcblxyXG4gIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIGNvbnN0IGZlYXR1cmVFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlRXh0ZW50KG1hcCwgb2xGZWF0dXJlKTtcclxuICAgIG9sZXh0ZW50LmV4dGVuZChleHRlbnQsIGZlYXR1cmVFeHRlbnQpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogU2NhbGUgYW4gZXh0ZW50LlxyXG4gKiBAcGFyYW0gZXh0ZW50IEV4dGVudFxyXG4gKiBAcGFyYW0gU2NhbGluZyBmYWN0b3JzIGZvciB0b3AsIHJpZ2h0LCBib3R0b20gYW5kIGxlZnQgZGlyZWN0aW9ucywgaW4gdGhhdCBvcmRlclxyXG4gKiBAcmV0dXJucyBTY2FsZWQgZXh0ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVFeHRlbnQoXHJcbiAgZXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBzY2FsZTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IG9sZXh0ZW50LmdldFNpemUoZXh0ZW50KTtcclxuICByZXR1cm4gW1xyXG4gICAgc2NhbGVbM10gPyBleHRlbnRbMF0gLSB3aWR0aCAqIHNjYWxlWzNdIDogZXh0ZW50WzBdLFxyXG4gICAgc2NhbGVbMl0gPyBleHRlbnRbMV0gLSBoZWlnaHQgKiBzY2FsZVsyXSA6IGV4dGVudFsxXSxcclxuICAgIHNjYWxlWzFdID8gZXh0ZW50WzJdICsgd2lkdGggKiBzY2FsZVsxXSA6IGV4dGVudFsyXSxcclxuICAgIHNjYWxlWzBdID8gZXh0ZW50WzNdICsgaGVpZ2h0ICogc2NhbGVbMF0gOiBleHRlbnRbM11cclxuICBdO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIG91dCBvZiB2aWV3LlxyXG4gKiBJZiBmZWF0dXJlcyBhcmUgdG9vIGNsb3NlIHRvIHRoZSBlZGdlLCB0aGV5IGFyZSBjb25zaWRlcmVkIG91dCBvZiB2aWV3LlxyXG4gKiBXZSBkZWZpbmUgdGhlIGVkZ2UgYXMgNSUgb2YgdGhlIGV4dGVudCBzaXplLlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gZmVhdHVyZXNFeHRlbnQgVGhlIGZlYXR1cmVzJ3MgZXh0ZW50XHJcbiAqIEByZXR1cm5zIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSBvdXQgb2Ygdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIGZlYXR1cmVzRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG4pIHtcclxuICBjb25zdCBtYXBFeHRlbnQgPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KCk7XHJcbiAgY29uc3QgZWRnZVJhdGlvID0gMC4wNTtcclxuICBjb25zdCBzY2FsZSA9IFstMSwgLTEsIC0xLCAtMV0ubWFwKHggPT4geCAqIGVkZ2VSYXRpbyk7XHJcbiAgY29uc3Qgdmlld0V4dGVudCA9IHNjYWxlRXh0ZW50KG1hcEV4dGVudCwgc2NhbGUgYXMgW1xyXG4gICAgbnVtYmVyLFxyXG4gICAgbnVtYmVyLFxyXG4gICAgbnVtYmVyLFxyXG4gICAgbnVtYmVyXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiAhb2xleHRlbnQuY29udGFpbnNFeHRlbnQodmlld0V4dGVudCwgZmVhdHVyZXNFeHRlbnQpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIHRvbyBkZWVwIGludG8gdGhlIHZpZXcuIFRoaXMgcmVzdWx0c1xyXG4gKiBpbiBmZWF0dXJlcyBiZWluZyB0b28gc21hbGwuXHJcbiAqIEZlYXR1cmVzIGFyZSBjb25zaWRlcmVkIHRvbyBzbWFsbCBpZiB0aGVpciBleHRlbnQgb2NjdXBpZXMgbGVzcyB0aGFuXHJcbiAqIDElIG9mIHRoZSBtYXAgZXh0ZW50LlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gZmVhdHVyZXNFeHRlbnQgVGhlIGZlYXR1cmVzJ3MgZXh0ZW50XHJcbiAqIEBwYXJhbSBhcmVhUmF0aW8gVGhlIGZlYXR1cmVzIGV4dGVudCB0byB2aWV3IGV4dGVudCBhY2NlcHRhYmxlIHJhdGlvXHJcbiAqIEByZXR1cm5zIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSB0b28gZGVlcCBpbiB0aGUgdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVzQXJlVG9vRGVlcEluVmlldyhcclxuICBtYXA6IElnb01hcCxcclxuICBmZWF0dXJlc0V4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgYXJlYVJhdGlvPzogbnVtYmVyXHJcbikge1xyXG4gIC8vIEFuIGFyZWEgcmF0aW8gb2YgMC4wMDQgbWVhbnMgdGhhdCB0aGUgZmVhdHVyZSBleHRlbnQncyB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgLy8gc2hvdWxkIGJlIGFib3V0IDEvMTYgb2YgdGhlIG1hcCBleHRlbnQncyB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgYXJlYVJhdGlvID0gYXJlYVJhdGlvID8gYXJlYVJhdGlvIDogMC4wMDQ7XHJcbiAgY29uc3QgbWFwRXh0ZW50ID0gbWFwLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpO1xyXG4gIGNvbnN0IG1hcEV4dGVudEFyZWEgPSBvbGV4dGVudC5nZXRBcmVhKG1hcEV4dGVudCk7XHJcbiAgY29uc3QgZmVhdHVyZXNFeHRlbnRBcmVhID0gb2xleHRlbnQuZ2V0QXJlYShmZWF0dXJlc0V4dGVudCk7XHJcblxyXG4gIGlmIChmZWF0dXJlc0V4dGVudEFyZWEgPT09IDAgJiYgbWFwLnZpZXdDb250cm9sbGVyLmdldFpvb20oKSA+IDEzKSB7IC8vIEluIGNhc2UgaXQncyBhIHBvaW50XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmZWF0dXJlc0V4dGVudEFyZWEgLyBtYXBFeHRlbnRBcmVhIDwgYXJlYVJhdGlvO1xyXG59XHJcblxyXG4vKipcclxuICogRml0IHZpZXcgdG8gaW5jbHVkZSB0aGUgZmVhdHVyZXMgZXh0ZW50LlxyXG4gKiBCeSBkZWZhdWx0LCB0aGlzIG1ldGhvZCB3aWxsIGxldCB0aGUgZmVhdHVyZXMgb2NjdXB5IGFib3V0IDUwJSBvZiB0aGUgdmlld3BvcnQuXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmVzIE9MIGZlYXR1cmVzXHJcbiAqIEBwYXJhbSBtb3Rpb24gVG8gbW90aW9uIHRvIHRoZSBuZXcgbWFwIHZpZXdcclxuICogQHBhcmFtIHNjYWxlIElmIHRoaXMgaXMgZGVmaW5lZCwgdGhlIG9yaWdpbmFsIHZpZXcgd2lsbCBiZSBzY2FsZWRcclxuICogIGJ5IHRoYXQgZmFjdG9yIGJlZm9yZSBhbnkgbG9naWMgaXMgYXBwbGllZC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9PbEZlYXR1cmVzKFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdLFxyXG4gIG1vdGlvbjogRmVhdHVyZU1vdGlvbiA9IEZlYXR1cmVNb3Rpb24uRGVmYXVsdCxcclxuICBzY2FsZT86IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIGFyZWFSYXRpbz86IG51bWJlclxyXG4pIHtcclxuICBjb25zdCBmZWF0dXJlc0V4dGVudCA9IGNvbXB1dGVPbEZlYXR1cmVzRXh0ZW50KG1hcCwgb2xGZWF0dXJlcyk7XHJcbiAgbGV0IHZpZXdFeHRlbnQgPSBmZWF0dXJlc0V4dGVudDtcclxuICBpZiAoc2NhbGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdmlld0V4dGVudCA9IHNjYWxlRXh0ZW50KHZpZXdFeHRlbnQsIHNjYWxlKTtcclxuICB9XHJcblxyXG4gIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uWm9vbSkge1xyXG4gICAgbWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICB9IGVsc2UgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5Nb3ZlKSB7XHJcbiAgICBtYXAudmlld0NvbnRyb2xsZXIubW92ZVRvRXh0ZW50KHZpZXdFeHRlbnQpO1xyXG4gIH0gZWxzZSBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLkRlZmF1bHQpIHtcclxuICAgIGlmIChcclxuICAgICAgZmVhdHVyZXNBcmVPdXRPZlZpZXcobWFwLCBmZWF0dXJlc0V4dGVudCkgfHxcclxuICAgICAgZmVhdHVyZXNBcmVUb29EZWVwSW5WaWV3KG1hcCwgZmVhdHVyZXNFeHRlbnQsIGFyZWFSYXRpbylcclxuICAgICkge1xyXG4gICAgICBtYXAudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KHZpZXdFeHRlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEhpZGUgYW4gT0wgZmVhdHVyZVxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIGZlYXR1cmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlT2xGZWF0dXJlKG9sRmVhdHVyZTogT2xGZWF0dXJlKSB7XHJcbiAgb2xGZWF0dXJlLnNldFN0eWxlKG5ldyBvbHN0eWxlLlN0eWxlKHt9KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYmluZCBhIGxheWVyIHRvIGEgc3RvcmUgaWYgbm9uZSBpcyBib3VuZCBhbHJlYWR5LlxyXG4gKiBUaGUgbGF5ZXIgd2lsbCBhbHNvIGJlIGFkZGVkIHRvIHRoZSBzdG9yZSdzIG1hcC5cclxuICogSWYgbm8gbGF5ZXIgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIGxheWVyXHJcbiAqIEBwYXJhbSBsYXllciBBbiBvcHRpb25hbCBWZWN0b3JMYXllclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyeUJpbmRTdG9yZUxheWVyKHN0b3JlOiBGZWF0dXJlU3RvcmUsIGxheWVyPzogVmVjdG9yTGF5ZXIpIHtcclxuICBpZiAoc3RvcmUubGF5ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHN0b3JlLmxheWVyLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0b3JlLm1hcC5hZGRMYXllcihzdG9yZS5sYXllcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBsYXllciA9IGxheWVyXHJcbiAgICA/IGxheWVyXHJcbiAgICA6IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICAgICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKVxyXG4gICAgICB9KTtcclxuICBzdG9yZS5iaW5kTGF5ZXIobGF5ZXIpO1xyXG4gIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUubWFwLmFkZExheWVyKHN0b3JlLmxheWVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYWRkIGEgbG9hZGluZyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBhY3RpdmF0ZSBpdC5cclxuICogSWYgbm8gc3RyYXRlZ3kgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIGxvYWRpbmcgc3RyYXRlZ3lcclxuICogQHBhcmFtIHN0cmF0ZWd5IEFuIG9wdGlvbmFsIGxvYWRpbmcgc3RyYXRlZ3lcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlBZGRMb2FkaW5nU3RyYXRlZ3koXHJcbiAgc3RvcmU6IEZlYXR1cmVTdG9yZSxcclxuICBzdHJhdGVneT86IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneVxyXG4pIHtcclxuICBpZiAoc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBzdHJhdGVneSA9IHN0cmF0ZWd5ID8gc3RyYXRlZ3kgOiBuZXcgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KHt9KTtcclxuICBzdG9yZS5hZGRTdHJhdGVneShzdHJhdGVneSk7XHJcbiAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBhZGQgYSBzZWxlY3Rpb24gc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgYWN0aXZhdGUgaXQuXHJcbiAqIElmIG5vIHN0cmF0ZWd5IGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBzZWxlY3Rpb24gc3RyYXRlZ3lcclxuICogQHBhcmFtIFtzdHJhdGVneV0gQW4gb3B0aW9uYWwgc2VsZWN0aW9uIHN0cmF0ZWd5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QWRkU2VsZWN0aW9uU3RyYXRlZ3koXHJcbiAgc3RvcmU6IEZlYXR1cmVTdG9yZSxcclxuICBzdHJhdGVneT86IEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5XHJcbikge1xyXG4gIGlmIChzdG9yZS5nZXRTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUuYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHN0cmF0ZWd5ID0gc3RyYXRlZ3lcclxuICAgID8gc3RyYXRlZ3lcclxuICAgIDogbmV3IEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KHtcclxuICAgICAgICBtYXA6IHN0b3JlLm1hcFxyXG4gICAgICB9KTtcclxuICBzdG9yZS5hZGRTdHJhdGVneShzdHJhdGVneSk7XHJcbiAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYSBkaWZmIGJldHdlZW4gYSBzb3VyY2UgYXJyYXkgb2YgT2wgZmVhdHVyZXMgYW5kIGEgdGFyZ2V0IGFycmF5XHJcbiAqIEBwYXJhbSBzb3VyY2UgU291cmNlIGFycmF5IG9mIE9MIGZlYXR1cmVzXHJcbiAqIEBwYXJhbSBzdGFyZ2V0IFRhcmdldCBhcnJheSBvZiBPTCBmZWF0dXJlc1xyXG4gKiBAcmV0dXJucyBGZWF0dXJlcyB0byBhZGQgYW5kIHJlbW92ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVPbEZlYXR1cmVzRGlmZihcclxuICBzb3VyY2U6IE9sRmVhdHVyZVtdLFxyXG4gIHRhcmdldDogT2xGZWF0dXJlW11cclxuKToge1xyXG4gIGFkZDogT2xGZWF0dXJlW107XHJcbiAgcmVtb3ZlOiBPbEZlYXR1cmU7XHJcbn0ge1xyXG4gIGNvbnN0IG9sRmVhdHVyZXNNYXAgPSBuZXcgTWFwKCk7XHJcbiAgdGFyZ2V0LmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICBvbEZlYXR1cmVzTWFwLnNldChvbEZlYXR1cmUuZ2V0SWQoKSwgb2xGZWF0dXJlKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3Qgb2xGZWF0dXJlc1RvUmVtb3ZlID0gW107XHJcbiAgc291cmNlLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICBjb25zdCBuZXdPbEZlYXR1cmUgPSBvbEZlYXR1cmVzTWFwLmdldChvbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICBpZiAobmV3T2xGZWF0dXJlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb2xGZWF0dXJlc1RvUmVtb3ZlLnB1c2gob2xGZWF0dXJlKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIG5ld09sRmVhdHVyZS5nZXQoJ19lbnRpdHlSZXZpc2lvbicpICE9PSBvbEZlYXR1cmUuZ2V0KCdfZW50aXR5UmV2aXNpb24nKVxyXG4gICAgKSB7XHJcbiAgICAgIG9sRmVhdHVyZXNUb1JlbW92ZS5wdXNoKG9sRmVhdHVyZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbEZlYXR1cmVzTWFwLmRlbGV0ZShuZXdPbEZlYXR1cmUuZ2V0SWQoKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IG9sRmVhdHVyZXNUb0FkZElkcyA9IEFycmF5LmZyb20ob2xGZWF0dXJlc01hcC5rZXlzKCkpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZXNUb0FkZCA9IHRhcmdldC5maWx0ZXIoKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICByZXR1cm4gb2xGZWF0dXJlc1RvQWRkSWRzLmluZGV4T2Yob2xGZWF0dXJlLmdldElkKCkpID49IDA7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhZGQ6IG9sRmVhdHVyZXNUb0FkZCxcclxuICAgIHJlbW92ZTogb2xGZWF0dXJlc1RvUmVtb3ZlXHJcbiAgfTtcclxufVxyXG4iXX0=