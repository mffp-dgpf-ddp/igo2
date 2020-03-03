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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUVwQyxPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUNwQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFFTCxXQUFXLEVBQ1gsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sY0FBYyxDQUFDO0FBR3RCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLDZCQUE2QixFQUM5QixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O0FBU3RCLE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQWdCLEVBQ2hCLGFBQXFCLEVBQ3JCLEtBQThCO0lBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOztVQUU5QixRQUFRLEdBQUcsSUFBSSxlQUFl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YSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUMsRUFBQyxDQUFDOztVQUVHLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOztVQUNyRCxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU07Ozs7SUFBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtRQUM3RCxPQUFPLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxFQUFDO0lBRUYsT0FBTztRQUNMLEdBQUcsRUFBRSxlQUFlO1FBQ3BCLE1BQU0sRUFBRSxrQkFBa0I7S0FDM0IsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xHZW9tZXRyeUxheW91dCBmcm9tICdvbC9nZW9tL0dlb21ldHJ5TGF5b3V0JztcclxuaW1wb3J0IE9sUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xyXG5pbXBvcnQgT2xQb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcclxuaW1wb3J0IE9sTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xyXG5pbXBvcnQgT2xSZW5kZXJGZWF0dXJlIGZyb20gJ29sL3JlbmRlci9GZWF0dXJlJztcclxuaW1wb3J0IE9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcbmltcG9ydCBPbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRW50aXR5S2V5LFxyXG4gIGdldEVudGl0eUlkLFxyXG4gIGdldEVudGl0eVRpdGxlLFxyXG4gIGdldEVudGl0eVJldmlzaW9uLFxyXG4gIGdldEVudGl0eUljb24sXHJcbiAgZ2V0RW50aXR5UHJvcGVydHlcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmVNb3Rpb24gfSBmcm9tICcuL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHtcclxuICBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3ksXHJcbiAgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICcuL3N0cmF0ZWdpZXMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBPcGVubGF5ZXJzIGZlYXR1cmUgb2JqZWN0IG91dCBvZiBhIGZlYXR1cmUgZGVmaW5pdGlvbi5cclxuICogVGhlIG91dHB1dCBvYmplY3QgaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBmZWF0dXJlIGlkLlxyXG4gKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlIGRlZmluaXRpb25cclxuICogQHBhcmFtIHByb2plY3Rpb25PdXQgRmVhdHVyZSBvYmplY3QgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBPcGVuTGF5ZXJzIGZlYXR1cmUgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVRvT2woXHJcbiAgZmVhdHVyZTogRmVhdHVyZSxcclxuICBwcm9qZWN0aW9uT3V0OiBzdHJpbmcsXHJcbiAgZ2V0SWQ/OiAoRmVhdHVyZSkgPT4gRW50aXR5S2V5XHJcbik6IE9sRmVhdHVyZSB7XHJcbiAgZ2V0SWQgPSBnZXRJZCA/IGdldElkIDogZ2V0RW50aXR5SWQ7XHJcblxyXG4gIGNvbnN0IG9sRm9ybWF0ID0gbmV3IE9sRm9ybWF0R2VvSlNPTigpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZSA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlKGZlYXR1cmUsIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uOiBmZWF0dXJlLnByb2plY3Rpb24sXHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbk91dFxyXG4gIH0pO1xyXG5cclxuICBvbEZlYXR1cmUuc2V0SWQoZ2V0SWQoZmVhdHVyZSkpO1xyXG5cclxuICBjb25zdCB0aXRsZSA9IGdldEVudGl0eVRpdGxlKGZlYXR1cmUpO1xyXG4gIGlmICh0aXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfdGl0bGUnLCB0aXRsZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5leHRlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX2V4dGVudCcsIGZlYXR1cmUuZXh0ZW50LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLnByb2plY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX3Byb2plY3Rpb24nLCBmZWF0dXJlLnByb2plY3Rpb24sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWFwVGl0bGUgPSBnZXRFbnRpdHlQcm9wZXJ0eShmZWF0dXJlLCAnbWV0YS5tYXBUaXRsZScpO1xyXG4gIGlmIChtYXBUaXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfbWFwVGl0bGUnLCBtYXBUaXRsZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBvbEZlYXR1cmUuc2V0KCdfZW50aXR5UmV2aXNpb24nLCBnZXRFbnRpdHlSZXZpc2lvbihmZWF0dXJlKSwgdHJ1ZSk7XHJcblxyXG4gIGNvbnN0IGljb24gPSBnZXRFbnRpdHlJY29uKGZlYXR1cmUpO1xyXG4gIGlmIChpY29uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19pY29uJywgaWNvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5tZXRhICYmIGZlYXR1cmUubWV0YS5zdHlsZSkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX3N0eWxlJywgZmVhdHVyZS5tZXRhLnN0eWxlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvbEZlYXR1cmU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJGZWF0dXJlRnJvbU9sKFxyXG4gIG9sUmVuZGVyRmVhdHVyZTogT2xSZW5kZXJGZWF0dXJlLFxyXG4gIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gIG9sTGF5ZXI/OiBPbExheWVyLFxyXG4gIHByb2plY3Rpb25PdXQgPSAnRVBTRzo0MzI2J1xyXG4gICk6IEZlYXR1cmUge1xyXG4gICAgbGV0IGdlb207XHJcbiAgICBsZXQgdGl0bGU7XHJcbiAgICBsZXQgZXhjbHVkZTtcclxuICAgIGxldCBleGNsdWRlT2ZmbGluZTtcclxuXHJcbiAgICBpZiAob2xMYXllcikge1xyXG4gICAgICB0aXRsZSA9IG9sTGF5ZXIuZ2V0KCd0aXRsZScpO1xyXG4gICAgICBpZiAob2xMYXllci5nZXQoJ3NvdXJjZU9wdGlvbnMnKSkge1xyXG4gICAgICAgIGV4Y2x1ZGUgPSBvbExheWVyLmdldCgnc291cmNlT3B0aW9ucycpLmV4Y2x1ZGVBdHRyaWJ1dGU7XHJcbiAgICAgICAgZXhjbHVkZU9mZmxpbmUgPSBvbExheWVyLmdldCgnc291cmNlT3B0aW9ucycpLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aXRsZSA9IG9sUmVuZGVyRmVhdHVyZS5nZXQoJ190aXRsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9sRm9ybWF0ID0gbmV3IE9sRm9ybWF0R2VvSlNPTigpO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IG9sUmVuZGVyRmVhdHVyZS5nZXRQcm9wZXJ0aWVzKCk7XHJcbiAgICBjb25zdCBnZW9tZXRyeVR5cGUgPSBvbFJlbmRlckZlYXR1cmUuZ2V0VHlwZSgpO1xyXG5cclxuICAgIGlmIChnZW9tZXRyeVR5cGUgPT09ICdQb2x5Z29uJykge1xyXG4gICAgICBjb25zdCBlbmRzID0gb2xSZW5kZXJGZWF0dXJlLmVuZHNfO1xyXG4gICAgICBnZW9tID0gbmV3IE9sUG9seWdvbihvbFJlbmRlckZlYXR1cmUuZmxhdENvb3JkaW5hdGVzXywgT2xHZW9tZXRyeUxheW91dC5YWSwgZW5kcyk7XHJcbiAgICB9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICBnZW9tID0gbmV3IE9sUG9pbnQob2xSZW5kZXJGZWF0dXJlLmZsYXRDb29yZGluYXRlc18sIE9sR2VvbWV0cnlMYXlvdXQuWFkpO1xyXG4gICAgfSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT09ICdMaW5lU3RyaW5nJykge1xyXG4gICAgICBnZW9tID0gbmV3IE9sTGluZVN0cmluZyhvbFJlbmRlckZlYXR1cmUuZmxhdENvb3JkaW5hdGVzXywgT2xHZW9tZXRyeUxheW91dC5YWSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBvbEZvcm1hdC53cml0ZUdlb21ldHJ5T2JqZWN0KGdlb20sIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW5cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlkID0gb2xSZW5kZXJGZWF0dXJlLmdldElkKCkgPyBvbFJlbmRlckZlYXR1cmUuZ2V0SWQoKSA6IHV1aWQoKTtcclxuICAgIGNvbnN0IG1hcFRpdGxlID0gb2xSZW5kZXJGZWF0dXJlLmdldCgnX21hcFRpdGxlJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgcHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgICAgZXh0ZW50OiBvbFJlbmRlckZlYXR1cmUuZ2V0RXh0ZW50KCksXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBpZCxcclxuICAgICAgICB0aXRsZTogdGl0bGUgPyB0aXRsZSA6IG1hcFRpdGxlID8gbWFwVGl0bGUgOiBpZCxcclxuICAgICAgICBtYXBUaXRsZSxcclxuICAgICAgICBleGNsdWRlQXR0cmlidXRlOiBleGNsdWRlLFxyXG4gICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lOiBleGNsdWRlT2ZmbGluZVxyXG4gICAgICB9LFxyXG4gICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICBnZW9tZXRyeSxcclxuICAgICAgb2w6IG9sUmVuZGVyRmVhdHVyZVxyXG4gICAgfTtcclxuICB9XHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBmZWF0dXJlIG9iamVjdCBvdXQgb2YgYW4gT0wgZmVhdHVyZVxyXG4gKiBUaGUgb3V0cHV0IG9iamVjdCBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGZlYXR1cmUgaWQuXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgRmVhdHVyZVxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbkluIE9MIGZlYXR1cmUgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gb2xMYXllciBPTCBMYXllclxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbk91dCBGZWF0dXJlIHByb2plY3Rpb25cclxuICogQHJldHVybnMgRmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVGcm9tT2woXHJcbiAgb2xGZWF0dXJlOiBPbEZlYXR1cmUsXHJcbiAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgb2xMYXllcj86IE9sTGF5ZXIsXHJcbiAgcHJvamVjdGlvbk91dCA9ICdFUFNHOjQzMjYnXHJcbik6IEZlYXR1cmUge1xyXG4gIGxldCB0aXRsZTtcclxuICBsZXQgZXhjbHVkZTtcclxuICBsZXQgZXhjbHVkZU9mZmxpbmU7XHJcbiAgY29uc3Qgb2xGb3JtYXQgPSBuZXcgT2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIGNvbnN0IGtleXMgPSBvbEZlYXR1cmUuZ2V0S2V5cygpLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiAha2V5LnN0YXJ0c1dpdGgoJ18nKSAmJiBrZXkgIT09ICdnZW9tZXRyeSc7XHJcbiAgfSk7XHJcbiAgY29uc3QgcHJvcGVydGllcyA9IGtleXMucmVkdWNlKChhY2M6IG9iamVjdCwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgIGFjY1trZXldID0gb2xGZWF0dXJlLmdldChrZXkpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcblxyXG4gIGNvbnN0IGdlb21ldHJ5ID0gb2xGb3JtYXQud3JpdGVHZW9tZXRyeU9iamVjdChvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKSwge1xyXG4gICAgZGF0YVByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbkluXHJcbiAgfSk7XHJcblxyXG4gIGlmIChvbExheWVyKSB7XHJcbiAgICB0aXRsZSA9IG9sTGF5ZXIuZ2V0KCd0aXRsZScpO1xyXG4gICAgaWYgKG9sTGF5ZXIuZ2V0KCdzb3VyY2VPcHRpb25zJykpIHtcclxuICAgICAgZXhjbHVkZSA9IG9sTGF5ZXIuZ2V0KCdzb3VyY2VPcHRpb25zJykuZXhjbHVkZUF0dHJpYnV0ZTtcclxuICAgICAgZXhjbHVkZU9mZmxpbmUgPSBvbExheWVyLmdldCgnc291cmNlT3B0aW9ucycpLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aXRsZSA9IG9sRmVhdHVyZS5nZXQoJ190aXRsZScpO1xyXG4gIH1cclxuICBjb25zdCBtYXBUaXRsZSA9IG9sRmVhdHVyZS5nZXQoJ19tYXBUaXRsZScpO1xyXG4gIGNvbnN0IGlkID0gb2xGZWF0dXJlLmdldElkKCkgPyBvbEZlYXR1cmUuZ2V0SWQoKSA6IHV1aWQoKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgZXh0ZW50OiBvbEZlYXR1cmUuZ2V0KCdfZXh0ZW50JyksXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGlkLFxyXG4gICAgICB0aXRsZTogdGl0bGUgPyB0aXRsZSA6IG1hcFRpdGxlID8gbWFwVGl0bGUgOiBpZCxcclxuICAgICAgbWFwVGl0bGUsXHJcbiAgICAgIHJldmlzaW9uOiBvbEZlYXR1cmUuZ2V0UmV2aXNpb24oKSxcclxuICAgICAgc3R5bGU6IG9sRmVhdHVyZS5nZXQoJ19zdHlsZScpLFxyXG4gICAgICBleGNsdWRlQXR0cmlidXRlOiBleGNsdWRlLFxyXG4gICAgICBleGNsdWRlQXR0cmlidXRlT2ZmbGluZTogZXhjbHVkZU9mZmxpbmVcclxuICAgIH0sXHJcbiAgICBwcm9wZXJ0aWVzLFxyXG4gICAgZ2VvbWV0cnksXHJcbiAgICBvbDogb2xGZWF0dXJlXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYW4gT0wgZmVhdHVyZSBleHRlbnQgaW4gaXQncyBtYXAgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIGZlYXR1cmVcclxuICogQHJldHVybnMgRXh0ZW50IGluIHRoZSBtYXAgcHJvamVjdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVPbEZlYXR1cmVFeHRlbnQoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlOiBPbEZlYXR1cmVcclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGxldCBvbEV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcblxyXG4gIGNvbnN0IG9sRmVhdHVyZUV4dGVudCA9IG9sRmVhdHVyZS5nZXQoJ19leHRlbnQnKTtcclxuICBjb25zdCBvbEZlYXR1cmVQcm9qZWN0aW9uID0gb2xGZWF0dXJlLmdldCgnX3Byb2plY3Rpb24nKTtcclxuICBpZiAob2xGZWF0dXJlRXh0ZW50ICE9PSB1bmRlZmluZWQgJiYgb2xGZWF0dXJlUHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEV4dGVudCA9IG9scHJvai50cmFuc2Zvcm1FeHRlbnQoXHJcbiAgICAgIG9sRmVhdHVyZUV4dGVudCxcclxuICAgICAgb2xGZWF0dXJlUHJvamVjdGlvbixcclxuICAgICAgbWFwLnByb2plY3Rpb25cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgIGlmIChvbEdlb21ldHJ5ICE9PSBudWxsKSB7XHJcbiAgICAgIG9sRXh0ZW50ID0gb2xHZW9tZXRyeS5nZXRFeHRlbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvbEV4dGVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYSBtdWx0aXBsZSBPTCBmZWF0dXJlcyBleHRlbnQgaW4gdGhlaXIgbWFwIHByb2plY3Rpb25cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZXNcclxuICogQHJldHVybnMgRXh0ZW50IGluIHRoZSBtYXAgcHJvamVjdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVPbEZlYXR1cmVzRXh0ZW50KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBjb25zdCBleHRlbnQgPSBvbGV4dGVudC5jcmVhdGVFbXB0eSgpO1xyXG5cclxuICBvbEZlYXR1cmVzLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICBjb25zdCBmZWF0dXJlRXh0ZW50ID0gY29tcHV0ZU9sRmVhdHVyZUV4dGVudChtYXAsIG9sRmVhdHVyZSk7XHJcbiAgICBvbGV4dGVudC5leHRlbmQoZXh0ZW50LCBmZWF0dXJlRXh0ZW50KTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGV4dGVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNjYWxlIGFuIGV4dGVudC5cclxuICogQHBhcmFtIGV4dGVudCBFeHRlbnRcclxuICogQHBhcmFtIFNjYWxpbmcgZmFjdG9ycyBmb3IgdG9wLCByaWdodCwgYm90dG9tIGFuZCBsZWZ0IGRpcmVjdGlvbnMsIGluIHRoYXQgb3JkZXJcclxuICogQHJldHVybnMgU2NhbGVkIGV4dGVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlRXh0ZW50KFxyXG4gIGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgc2NhbGU6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBvbGV4dGVudC5nZXRTaXplKGV4dGVudCk7XHJcbiAgcmV0dXJuIFtcclxuICAgIHNjYWxlWzNdID8gZXh0ZW50WzBdIC0gd2lkdGggKiBzY2FsZVszXSA6IGV4dGVudFswXSxcclxuICAgIHNjYWxlWzJdID8gZXh0ZW50WzFdIC0gaGVpZ2h0ICogc2NhbGVbMl0gOiBleHRlbnRbMV0sXHJcbiAgICBzY2FsZVsxXSA/IGV4dGVudFsyXSArIHdpZHRoICogc2NhbGVbMV0gOiBleHRlbnRbMl0sXHJcbiAgICBzY2FsZVswXSA/IGV4dGVudFszXSArIGhlaWdodCAqIHNjYWxlWzBdIDogZXh0ZW50WzNdXHJcbiAgXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSBvdXQgb2Ygdmlldy5cclxuICogSWYgZmVhdHVyZXMgYXJlIHRvbyBjbG9zZSB0byB0aGUgZWRnZSwgdGhleSBhcmUgY29uc2lkZXJlZCBvdXQgb2Ygdmlldy5cclxuICogV2UgZGVmaW5lIHRoZSBlZGdlIGFzIDUlIG9mIHRoZSBleHRlbnQgc2l6ZS5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIGZlYXR1cmVzRXh0ZW50IFRoZSBmZWF0dXJlcydzIGV4dGVudFxyXG4gKiBAcmV0dXJucyBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgb3V0IG9mIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlc0FyZU91dE9mVmlldyhcclxuICBtYXA6IElnb01hcCxcclxuICBmZWF0dXJlc0V4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuKSB7XHJcbiAgY29uc3QgbWFwRXh0ZW50ID0gbWFwLnZpZXdDb250cm9sbGVyLmdldEV4dGVudCgpO1xyXG4gIGNvbnN0IGVkZ2VSYXRpbyA9IDAuMDU7XHJcbiAgY29uc3Qgc2NhbGUgPSBbLTEsIC0xLCAtMSwgLTFdLm1hcCh4ID0+IHggKiBlZGdlUmF0aW8pO1xyXG4gIGNvbnN0IHZpZXdFeHRlbnQgPSBzY2FsZUV4dGVudChtYXBFeHRlbnQsIHNjYWxlIGFzIFtcclxuICAgIG51bWJlcixcclxuICAgIG51bWJlcixcclxuICAgIG51bWJlcixcclxuICAgIG51bWJlclxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4gIW9sZXh0ZW50LmNvbnRhaW5zRXh0ZW50KHZpZXdFeHRlbnQsIGZlYXR1cmVzRXh0ZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSB0b28gZGVlcCBpbnRvIHRoZSB2aWV3LiBUaGlzIHJlc3VsdHNcclxuICogaW4gZmVhdHVyZXMgYmVpbmcgdG9vIHNtYWxsLlxyXG4gKiBGZWF0dXJlcyBhcmUgY29uc2lkZXJlZCB0b28gc21hbGwgaWYgdGhlaXIgZXh0ZW50IG9jY3VwaWVzIGxlc3MgdGhhblxyXG4gKiAxJSBvZiB0aGUgbWFwIGV4dGVudC5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIGZlYXR1cmVzRXh0ZW50IFRoZSBmZWF0dXJlcydzIGV4dGVudFxyXG4gKiBAcGFyYW0gYXJlYVJhdGlvIFRoZSBmZWF0dXJlcyBleHRlbnQgdG8gdmlldyBleHRlbnQgYWNjZXB0YWJsZSByYXRpb1xyXG4gKiBAcmV0dXJucyBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgdG9vIGRlZXAgaW4gdGhlIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlc0FyZVRvb0RlZXBJblZpZXcoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgZmVhdHVyZXNFeHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIGFyZWFSYXRpbz86IG51bWJlclxyXG4pIHtcclxuICAvLyBBbiBhcmVhIHJhdGlvIG9mIDAuMDA0IG1lYW5zIHRoYXQgdGhlIGZlYXR1cmUgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIC8vIHNob3VsZCBiZSBhYm91dCAxLzE2IG9mIHRoZSBtYXAgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIGFyZWFSYXRpbyA9IGFyZWFSYXRpbyA/IGFyZWFSYXRpbyA6IDAuMDA0O1xyXG4gIGNvbnN0IG1hcEV4dGVudCA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKTtcclxuICBjb25zdCBtYXBFeHRlbnRBcmVhID0gb2xleHRlbnQuZ2V0QXJlYShtYXBFeHRlbnQpO1xyXG4gIGNvbnN0IGZlYXR1cmVzRXh0ZW50QXJlYSA9IG9sZXh0ZW50LmdldEFyZWEoZmVhdHVyZXNFeHRlbnQpO1xyXG5cclxuICBpZiAoZmVhdHVyZXNFeHRlbnRBcmVhID09PSAwICYmIG1hcC52aWV3Q29udHJvbGxlci5nZXRab29tKCkgPiAxMykgeyAvLyBJbiBjYXNlIGl0J3MgYSBwb2ludFxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmVhdHVyZXNFeHRlbnRBcmVhIC8gbWFwRXh0ZW50QXJlYSA8IGFyZWFSYXRpbztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpdCB2aWV3IHRvIGluY2x1ZGUgdGhlIGZlYXR1cmVzIGV4dGVudC5cclxuICogQnkgZGVmYXVsdCwgdGhpcyBtZXRob2Qgd2lsbCBsZXQgdGhlIGZlYXR1cmVzIG9jY3VweSBhYm91dCA1MCUgb2YgdGhlIHZpZXdwb3J0LlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcGFyYW0gbW90aW9uIFRvIG1vdGlvbiB0byB0aGUgbmV3IG1hcCB2aWV3XHJcbiAqIEBwYXJhbSBzY2FsZSBJZiB0aGlzIGlzIGRlZmluZWQsIHRoZSBvcmlnaW5hbCB2aWV3IHdpbGwgYmUgc2NhbGVkXHJcbiAqICBieSB0aGF0IGZhY3RvciBiZWZvcmUgYW55IGxvZ2ljIGlzIGFwcGxpZWQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVRvT2xGZWF0dXJlcyhcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgc2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBhcmVhUmF0aW8/OiBudW1iZXJcclxuKSB7XHJcbiAgY29uc3QgZmVhdHVyZXNFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlc0V4dGVudChtYXAsIG9sRmVhdHVyZXMpO1xyXG4gIGxldCB2aWV3RXh0ZW50ID0gZmVhdHVyZXNFeHRlbnQ7XHJcbiAgaWYgKHNjYWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHZpZXdFeHRlbnQgPSBzY2FsZUV4dGVudCh2aWV3RXh0ZW50LCBzY2FsZSk7XHJcbiAgfVxyXG5cclxuICBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLlpvb20pIHtcclxuICAgIG1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgfSBlbHNlIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uTW92ZSkge1xyXG4gICAgbWFwLnZpZXdDb250cm9sbGVyLm1vdmVUb0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICB9IGVsc2UgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KG1hcCwgZmVhdHVyZXNFeHRlbnQpIHx8XHJcbiAgICAgIGZlYXR1cmVzQXJlVG9vRGVlcEluVmlldyhtYXAsIGZlYXR1cmVzRXh0ZW50LCBhcmVhUmF0aW8pXHJcbiAgICApIHtcclxuICAgICAgbWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWRlIGFuIE9MIGZlYXR1cmVcclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGlkZU9sRmVhdHVyZShvbEZlYXR1cmU6IE9sRmVhdHVyZSkge1xyXG4gIG9sRmVhdHVyZS5zZXRTdHlsZShuZXcgb2xzdHlsZS5TdHlsZSh7fSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGJpbmQgYSBsYXllciB0byBhIHN0b3JlIGlmIG5vbmUgaXMgYm91bmQgYWxyZWFkeS5cclxuICogVGhlIGxheWVyIHdpbGwgYWxzbyBiZSBhZGRlZCB0byB0aGUgc3RvcmUncyBtYXAuXHJcbiAqIElmIG5vIGxheWVyIGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBsYXllclxyXG4gKiBAcGFyYW0gbGF5ZXIgQW4gb3B0aW9uYWwgVmVjdG9yTGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlCaW5kU3RvcmVMYXllcihzdG9yZTogRmVhdHVyZVN0b3JlLCBsYXllcj86IFZlY3RvckxheWVyKSB7XHJcbiAgaWYgKHN0b3JlLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdG9yZS5tYXAuYWRkTGF5ZXIoc3RvcmUubGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGF5ZXIgPSBsYXllclxyXG4gICAgPyBsYXllclxyXG4gICAgOiBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKClcclxuICAgICAgfSk7XHJcbiAgc3RvcmUuYmluZExheWVyKGxheWVyKTtcclxuICBpZiAoc3RvcmUubGF5ZXIubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLm1hcC5hZGRMYXllcihzdG9yZS5sYXllcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGFkZCBhIGxvYWRpbmcgc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgYWN0aXZhdGUgaXQuXHJcbiAqIElmIG5vIHN0cmF0ZWd5IGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAqIEBwYXJhbSBzdHJhdGVneSBBbiBvcHRpb25hbCBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QWRkTG9hZGluZ1N0cmF0ZWd5KFxyXG4gIHN0b3JlOiBGZWF0dXJlU3RvcmUsXHJcbiAgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3lcclxuKSB7XHJcbiAgaWYgKHN0b3JlLmdldFN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUuYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgc3RyYXRlZ3kgPSBzdHJhdGVneSA/IHN0cmF0ZWd5IDogbmV3IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSh7fSk7XHJcbiAgc3RvcmUuYWRkU3RyYXRlZ3koc3RyYXRlZ3kpO1xyXG4gIHN0cmF0ZWd5LmFjdGl2YXRlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYWRkIGEgc2VsZWN0aW9uIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGFjdGl2YXRlIGl0LlxyXG4gKiBJZiBubyBzdHJhdGVneSBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgc2VsZWN0aW9uIHN0cmF0ZWd5XHJcbiAqIEBwYXJhbSBbc3RyYXRlZ3ldIEFuIG9wdGlvbmFsIHNlbGVjdGlvbiBzdHJhdGVneVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyeUFkZFNlbGVjdGlvblN0cmF0ZWd5KFxyXG4gIHN0b3JlOiBGZWF0dXJlU3RvcmUsXHJcbiAgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneVxyXG4pIHtcclxuICBpZiAoc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLmFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBzdHJhdGVneSA9IHN0cmF0ZWd5XHJcbiAgICA/IHN0cmF0ZWd5XHJcbiAgICA6IG5ldyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSh7XHJcbiAgICAgICAgbWFwOiBzdG9yZS5tYXBcclxuICAgICAgfSk7XHJcbiAgc3RvcmUuYWRkU3RyYXRlZ3koc3RyYXRlZ3kpO1xyXG4gIHN0cmF0ZWd5LmFjdGl2YXRlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlIGEgZGlmZiBiZXR3ZWVuIGEgc291cmNlIGFycmF5IG9mIE9sIGZlYXR1cmVzIGFuZCBhIHRhcmdldCBhcnJheVxyXG4gKiBAcGFyYW0gc291cmNlIFNvdXJjZSBhcnJheSBvZiBPTCBmZWF0dXJlc1xyXG4gKiBAcGFyYW0gc3RhcmdldCBUYXJnZXQgYXJyYXkgb2YgT0wgZmVhdHVyZXNcclxuICogQHJldHVybnMgRmVhdHVyZXMgdG8gYWRkIGFuZCByZW1vdmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlT2xGZWF0dXJlc0RpZmYoXHJcbiAgc291cmNlOiBPbEZlYXR1cmVbXSxcclxuICB0YXJnZXQ6IE9sRmVhdHVyZVtdXHJcbik6IHtcclxuICBhZGQ6IE9sRmVhdHVyZVtdO1xyXG4gIHJlbW92ZTogT2xGZWF0dXJlO1xyXG59IHtcclxuICBjb25zdCBvbEZlYXR1cmVzTWFwID0gbmV3IE1hcCgpO1xyXG4gIHRhcmdldC5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgb2xGZWF0dXJlc01hcC5zZXQob2xGZWF0dXJlLmdldElkKCksIG9sRmVhdHVyZSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IG9sRmVhdHVyZXNUb1JlbW92ZSA9IFtdO1xyXG4gIHNvdXJjZS5mb3JFYWNoKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgY29uc3QgbmV3T2xGZWF0dXJlID0gb2xGZWF0dXJlc01hcC5nZXQob2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgaWYgKG5ld09sRmVhdHVyZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9sRmVhdHVyZXNUb1JlbW92ZS5wdXNoKG9sRmVhdHVyZSk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBuZXdPbEZlYXR1cmUuZ2V0KCdfZW50aXR5UmV2aXNpb24nKSAhPT0gb2xGZWF0dXJlLmdldCgnX2VudGl0eVJldmlzaW9uJylcclxuICAgICkge1xyXG4gICAgICBvbEZlYXR1cmVzVG9SZW1vdmUucHVzaChvbEZlYXR1cmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2xGZWF0dXJlc01hcC5kZWxldGUobmV3T2xGZWF0dXJlLmdldElkKCkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBvbEZlYXR1cmVzVG9BZGRJZHMgPSBBcnJheS5mcm9tKG9sRmVhdHVyZXNNYXAua2V5cygpKTtcclxuICBjb25zdCBvbEZlYXR1cmVzVG9BZGQgPSB0YXJnZXQuZmlsdGVyKChvbEZlYXR1cmU6IE9sRmVhdHVyZSkgPT4ge1xyXG4gICAgcmV0dXJuIG9sRmVhdHVyZXNUb0FkZElkcy5pbmRleE9mKG9sRmVhdHVyZS5nZXRJZCgpKSA+PSAwO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYWRkOiBvbEZlYXR1cmVzVG9BZGQsXHJcbiAgICByZW1vdmU6IG9sRmVhdHVyZXNUb1JlbW92ZVxyXG4gIH07XHJcbn1cclxuIl19