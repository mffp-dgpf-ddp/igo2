/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    if (feature.extent !== undefined) {
        olFeature.set('_extent', feature.extent, true);
    }
    /** @type {?} */
    const mapTitle = getEntityProperty(feature, 'meta.mapTitle');
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
export function featureFromOl(olFeature, projectionIn, olLayer, projectionOut = 'EPSG:4326') {
    /** @type {?} */
    let title;
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
    }
    else {
        title = olFeature.get('_title');
    }
    /** @type {?} */
    const mapTitle = olFeature.get('_mapTitle');
    /** @type {?} */
    const id = olFeature.getId();
    return {
        type: FEATURE,
        projection: projectionOut,
        extent: olFeature.get('_extent'),
        meta: {
            id,
            title: title ? title : (mapTitle ? mapTitle : id),
            mapTitle,
            revision: olFeature.getRevision()
        },
        properties,
        geometry
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
    const mapExtent = map.getExtent();
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
    const mapExtent = map.getExtent();
    /** @type {?} */
    const mapExtentArea = olextent.getArea(mapExtent);
    /** @type {?} */
    const featuresExtentArea = olextent.getArea(featuresExtent);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUVwQyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUdoRCxPQUFPLEVBRUwsV0FBVyxFQUNYLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sY0FBYyxDQUFDO0FBR3RCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLDZCQUE2QixFQUM5QixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O0FBU3RCLE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQWdCLEVBQ2hCLGFBQXFCLEVBQ3JCLEtBQThCO0lBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOztVQUU5QixRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUU7O1VBQ2hDLFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUM5QyxjQUFjLEVBQUUsT0FBTyxDQUFDLFVBQVU7UUFDbEMsaUJBQWlCLEVBQUUsYUFBYTtLQUNqQyxDQUFDO0lBRUYsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7VUFFMUIsS0FB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LENBQUMsaUJBQWlCLENBQUMsMkJBQTJCLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDdEUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDMUQsT0FBTztLQUNSO0lBRUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLHVCQUF1QixDQUFDLEtBQW1CLEVBQUUsUUFBd0M7SUFDbkcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsNkJBQTZCLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDeEUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDNUQsT0FBTztLQUNSO0lBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLDZCQUE2QixDQUFDO1FBQ2pFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztLQUNmLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IE9sTGF5ZXIgZnJvbSAnb2wvTGF5ZXInO1xyXG5cclxuaW1wb3J0IHtcclxuICBFbnRpdHlLZXksXHJcbiAgZ2V0RW50aXR5SWQsXHJcbiAgZ2V0RW50aXR5VGl0bGUsXHJcbiAgZ2V0RW50aXR5UmV2aXNpb24sXHJcbiAgZ2V0RW50aXR5UHJvcGVydHlcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEZFQVRVUkUsIEZlYXR1cmVNb3Rpb24gfSBmcm9tICcuL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHtcclxuICBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3ksXHJcbiAgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICcuL3N0cmF0ZWdpZXMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBPcGVubGF5ZXJzIGZlYXR1cmUgb2JqZWN0IG91dCBvZiBhIGZlYXR1cmUgZGVmaW5pdGlvbi5cclxuICogVGhlIG91dHB1dCBvYmplY3QgaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBmZWF0dXJlIGlkLlxyXG4gKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlIGRlZmluaXRpb25cclxuICogQHBhcmFtIHByb2plY3Rpb25PdXQgRmVhdHVyZSBvYmplY3QgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBPcGVuTGF5ZXJzIGZlYXR1cmUgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVRvT2woXHJcbiAgZmVhdHVyZTogRmVhdHVyZSxcclxuICBwcm9qZWN0aW9uT3V0OiBzdHJpbmcsXHJcbiAgZ2V0SWQ/OiAoRmVhdHVyZSkgPT4gRW50aXR5S2V5XHJcbik6IE9sRmVhdHVyZSB7XHJcbiAgZ2V0SWQgPSBnZXRJZCA/IGdldElkIDogZ2V0RW50aXR5SWQ7XHJcblxyXG4gIGNvbnN0IG9sRm9ybWF0ID0gbmV3IE9sRm9ybWF0R2VvSlNPTigpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZSA9IG9sRm9ybWF0LnJlYWRGZWF0dXJlKGZlYXR1cmUsIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uOiBmZWF0dXJlLnByb2plY3Rpb24sXHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbjogcHJvamVjdGlvbk91dFxyXG4gIH0pO1xyXG5cclxuICBvbEZlYXR1cmUuc2V0SWQoZ2V0SWQoZmVhdHVyZSkpO1xyXG5cclxuICBjb25zdCB0aXRsZSA9IGdldEVudGl0eVRpdGxlKGZlYXR1cmUpO1xyXG4gIGlmICh0aXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfdGl0bGUnLCB0aXRsZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5leHRlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX2V4dGVudCcsIGZlYXR1cmUuZXh0ZW50LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLnByb2plY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX3Byb2plY3Rpb24nLCBmZWF0dXJlLnByb2plY3Rpb24sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUuZXh0ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19leHRlbnQnLCBmZWF0dXJlLmV4dGVudCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXBUaXRsZSA9IGdldEVudGl0eVByb3BlcnR5KGZlYXR1cmUsICdtZXRhLm1hcFRpdGxlJyk7XHJcbiAgaWYgKG1hcFRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19tYXBUaXRsZScsIG1hcFRpdGxlLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIG9sRmVhdHVyZS5zZXQoJ19lbnRpdHlSZXZpc2lvbicsIGdldEVudGl0eVJldmlzaW9uKGZlYXR1cmUpLCB0cnVlKTtcclxuXHJcbiAgcmV0dXJuIG9sRmVhdHVyZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGZlYXR1cmUgb2JqZWN0IG91dCBvZiBhbiBPTCBmZWF0dXJlXHJcbiAqIFRoZSBvdXRwdXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZmVhdHVyZSBpZC5cclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBGZWF0dXJlXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uSW4gT0wgZmVhdHVyZSBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBvbExheWVyIE9MIExheWVyXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uT3V0IEZlYXR1cmUgcHJvamVjdGlvblxyXG4gKiBAcmV0dXJucyBGZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUZyb21PbChcclxuICBvbEZlYXR1cmU6IE9sRmVhdHVyZSxcclxuICBwcm9qZWN0aW9uSW46IHN0cmluZyxcclxuICBvbExheWVyPzogT2xMYXllcixcclxuICBwcm9qZWN0aW9uT3V0ID0gJ0VQU0c6NDMyNidcclxuKTogRmVhdHVyZSB7XHJcbiAgbGV0IHRpdGxlO1xyXG4gIGNvbnN0IG9sRm9ybWF0ID0gbmV3IE9sRm9ybWF0R2VvSlNPTigpO1xyXG5cclxuICBjb25zdCBrZXlzID0gb2xGZWF0dXJlLmdldEtleXMoKS5maWx0ZXIoKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gIWtleS5zdGFydHNXaXRoKCdfJykgJiYga2V5ICE9PSAnZ2VvbWV0cnknO1xyXG4gIH0pO1xyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSBrZXlzLnJlZHVjZSgoYWNjOiBvYmplY3QsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBhY2Nba2V5XSA9IG9sRmVhdHVyZS5nZXQoa2V5KTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICBjb25zdCBnZW9tZXRyeSA9IG9sRm9ybWF0LndyaXRlR2VvbWV0cnlPYmplY3Qob2xGZWF0dXJlLmdldEdlb21ldHJ5KCksIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JblxyXG4gIH0pO1xyXG5cclxuICBpZiAob2xMYXllcikge1xyXG4gICAgdGl0bGUgPSBvbExheWVyLmdldCgndGl0bGUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGl0bGUgPSBvbEZlYXR1cmUuZ2V0KCdfdGl0bGUnKTtcclxuICB9XHJcbiAgY29uc3QgbWFwVGl0bGUgPSBvbEZlYXR1cmUuZ2V0KCdfbWFwVGl0bGUnKTtcclxuICBjb25zdCBpZCA9IG9sRmVhdHVyZS5nZXRJZCgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogRkVBVFVSRSxcclxuICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBleHRlbnQ6IG9sRmVhdHVyZS5nZXQoJ19leHRlbnQnKSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaWQsXHJcbiAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlIDogKG1hcFRpdGxlID8gbWFwVGl0bGUgOiBpZCksXHJcbiAgICAgIG1hcFRpdGxlLFxyXG4gICAgICByZXZpc2lvbjogb2xGZWF0dXJlLmdldFJldmlzaW9uKClcclxuICAgIH0sXHJcbiAgICBwcm9wZXJ0aWVzLFxyXG4gICAgZ2VvbWV0cnlcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhbiBPTCBmZWF0dXJlIGV4dGVudCBpbiBpdCdzIG1hcCBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgZmVhdHVyZVxyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZUV4dGVudChcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmU6IE9sRmVhdHVyZVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgbGV0IG9sRXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuXHJcbiAgY29uc3Qgb2xGZWF0dXJlRXh0ZW50ID0gb2xGZWF0dXJlLmdldCgnX2V4dGVudCcpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZVByb2plY3Rpb24gPSBvbEZlYXR1cmUuZ2V0KCdfcHJvamVjdGlvbicpO1xyXG4gIGlmIChvbEZlYXR1cmVFeHRlbnQgIT09IHVuZGVmaW5lZCAmJiBvbEZlYXR1cmVQcm9qZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRXh0ZW50ID0gb2xwcm9qLnRyYW5zZm9ybUV4dGVudChcclxuICAgICAgb2xGZWF0dXJlRXh0ZW50LFxyXG4gICAgICBvbEZlYXR1cmVQcm9qZWN0aW9uLFxyXG4gICAgICBtYXAucHJvamVjdGlvblxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgaWYgKG9sR2VvbWV0cnkgIT09IG51bGwpIHtcclxuICAgICAgb2xFeHRlbnQgPSBvbEdlb21ldHJ5LmdldEV4dGVudCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9sRXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhIG11bHRpcGxlIE9MIGZlYXR1cmVzIGV4dGVudCBpbiB0aGVpciBtYXAgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZXNFeHRlbnQoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW11cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IGV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcblxyXG4gIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIGNvbnN0IGZlYXR1cmVFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlRXh0ZW50KG1hcCwgb2xGZWF0dXJlKTtcclxuICAgIG9sZXh0ZW50LmV4dGVuZChleHRlbnQsIGZlYXR1cmVFeHRlbnQpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogU2NhbGUgYW4gZXh0ZW50LlxyXG4gKiBAcGFyYW0gZXh0ZW50IEV4dGVudFxyXG4gKiBAcGFyYW0gU2NhbGluZyBmYWN0b3JzIGZvciB0b3AsIHJpZ2h0LCBib3R0b20gYW5kIGxlZnQgZGlyZWN0aW9ucywgaW4gdGhhdCBvcmRlclxyXG4gKiBAcmV0dXJucyBTY2FsZWQgZXh0ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVFeHRlbnQoXHJcbiAgZXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBzY2FsZTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IG9sZXh0ZW50LmdldFNpemUoZXh0ZW50KTtcclxuICByZXR1cm4gW1xyXG4gICAgc2NhbGVbM10gPyBleHRlbnRbMF0gLSB3aWR0aCAqIHNjYWxlWzNdIDogZXh0ZW50WzBdLFxyXG4gICAgc2NhbGVbMl0gPyBleHRlbnRbMV0gLSBoZWlnaHQgKiBzY2FsZVsyXSA6IGV4dGVudFsxXSxcclxuICAgIHNjYWxlWzFdID8gZXh0ZW50WzJdICsgd2lkdGggKiBzY2FsZVsxXSA6IGV4dGVudFsyXSxcclxuICAgIHNjYWxlWzBdID8gZXh0ZW50WzNdICsgaGVpZ2h0ICogc2NhbGVbMF0gOiBleHRlbnRbM11cclxuICBdO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIG91dCBvZiB2aWV3LlxyXG4gKiBJZiBmZWF0dXJlcyBhcmUgdG9vIGNsb3NlIHRvIHRoZSBlZGdlLCB0aGV5IGFyZSBjb25zaWRlcmVkIG91dCBvZiB2aWV3LlxyXG4gKiBXZSBkZWZpbmUgdGhlIGVkZ2UgYXMgNSUgb2YgdGhlIGV4dGVudCBzaXplLlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gZmVhdHVyZXNFeHRlbnQgVGhlIGZlYXR1cmVzJ3MgZXh0ZW50XHJcbiAqIEByZXR1cm5zIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSBvdXQgb2Ygdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIGZlYXR1cmVzRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG4pIHtcclxuICBjb25zdCBtYXBFeHRlbnQgPSBtYXAuZ2V0RXh0ZW50KCk7XHJcbiAgY29uc3QgZWRnZVJhdGlvID0gMC4wNTtcclxuICBjb25zdCBzY2FsZSA9IFstMSwgLTEsIC0xLCAtMV0ubWFwKHggPT4geCAqIGVkZ2VSYXRpbyk7XHJcbiAgY29uc3Qgdmlld0V4dGVudCA9IHNjYWxlRXh0ZW50KG1hcEV4dGVudCwgc2NhbGUgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pO1xyXG5cclxuICByZXR1cm4gIW9sZXh0ZW50LmNvbnRhaW5zRXh0ZW50KHZpZXdFeHRlbnQsIGZlYXR1cmVzRXh0ZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSB0b28gZGVlcCBpbnRvIHRoZSB2aWV3LiBUaGlzIHJlc3VsdHNcclxuICogaW4gZmVhdHVyZXMgYmVpbmcgdG9vIHNtYWxsLlxyXG4gKiBGZWF0dXJlcyBhcmUgY29uc2lkZXJlZCB0b28gc21hbGwgaWYgdGhlaXIgZXh0ZW50IG9jY3VwaWVzIGxlc3MgdGhhblxyXG4gKiAxJSBvZiB0aGUgbWFwIGV4dGVudC5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIGZlYXR1cmVzRXh0ZW50IFRoZSBmZWF0dXJlcydzIGV4dGVudFxyXG4gKiBAcGFyYW0gYXJlYVJhdGlvIFRoZSBmZWF0dXJlcyBleHRlbnQgdG8gdmlldyBleHRlbnQgYWNjZXB0YWJsZSByYXRpb1xyXG4gKiBAcmV0dXJucyBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgdG9vIGRlZXAgaW4gdGhlIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlc0FyZVRvb0RlZXBJblZpZXcoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgZmVhdHVyZXNFeHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIGFyZWFSYXRpbz86IG51bWJlclxyXG4pIHtcclxuICAvLyBBbiBhcmVhIHJhdGlvIG9mIDAuMDA0IG1lYW5zIHRoYXQgdGhlIGZlYXR1cmUgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIC8vIHNob3VsZCBiZSBhYm91dCAxLzE2IG9mIHRoZSBtYXAgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIGFyZWFSYXRpbyA9IGFyZWFSYXRpbyA/IGFyZWFSYXRpbyA6IDAuMDA0O1xyXG4gIGNvbnN0IG1hcEV4dGVudCA9IG1hcC5nZXRFeHRlbnQoKTtcclxuICBjb25zdCBtYXBFeHRlbnRBcmVhID0gb2xleHRlbnQuZ2V0QXJlYShtYXBFeHRlbnQpO1xyXG4gIGNvbnN0IGZlYXR1cmVzRXh0ZW50QXJlYSA9IG9sZXh0ZW50LmdldEFyZWEoZmVhdHVyZXNFeHRlbnQpO1xyXG5cclxuICByZXR1cm4gZmVhdHVyZXNFeHRlbnRBcmVhIC8gbWFwRXh0ZW50QXJlYSA8IGFyZWFSYXRpbztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpdCB2aWV3IHRvIGluY2x1ZGUgdGhlIGZlYXR1cmVzIGV4dGVudC5cclxuICogQnkgZGVmYXVsdCwgdGhpcyBtZXRob2Qgd2lsbCBsZXQgdGhlIGZlYXR1cmVzIG9jY3VweSBhYm91dCA1MCUgb2YgdGhlIHZpZXdwb3J0LlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcGFyYW0gbW90aW9uIFRvIG1vdGlvbiB0byB0aGUgbmV3IG1hcCB2aWV3XHJcbiAqIEBwYXJhbSBzY2FsZSBJZiB0aGlzIGlzIGRlZmluZWQsIHRoZSBvcmlnaW5hbCB2aWV3IHdpbGwgYmUgc2NhbGVkXHJcbiAqICBieSB0aGF0IGZhY3RvciBiZWZvcmUgYW55IGxvZ2ljIGlzIGFwcGxpZWQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVRvT2xGZWF0dXJlcyhcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgc2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBhcmVhUmF0aW8/OiBudW1iZXJcclxuKSB7XHJcbiAgY29uc3QgZmVhdHVyZXNFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlc0V4dGVudChtYXAsIG9sRmVhdHVyZXMpO1xyXG4gIGxldCB2aWV3RXh0ZW50ID0gZmVhdHVyZXNFeHRlbnQ7XHJcbiAgaWYgKHNjYWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHZpZXdFeHRlbnQgPSBzY2FsZUV4dGVudCh2aWV3RXh0ZW50LCBzY2FsZSk7XHJcbiAgfVxyXG5cclxuICBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLlpvb20pIHtcclxuICAgIG1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgfSBlbHNlIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uTW92ZSkge1xyXG4gICAgbWFwLnZpZXdDb250cm9sbGVyLm1vdmVUb0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICB9IGVsc2UgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KG1hcCwgZmVhdHVyZXNFeHRlbnQpIHx8XHJcbiAgICAgIGZlYXR1cmVzQXJlVG9vRGVlcEluVmlldyhtYXAsIGZlYXR1cmVzRXh0ZW50LCBhcmVhUmF0aW8pXHJcbiAgICApIHtcclxuICAgICAgbWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWRlIGFuIE9MIGZlYXR1cmVcclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGlkZU9sRmVhdHVyZShvbEZlYXR1cmU6IE9sRmVhdHVyZSkge1xyXG4gIG9sRmVhdHVyZS5zZXRTdHlsZShuZXcgb2xzdHlsZS5TdHlsZSh7fSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGJpbmQgYSBsYXllciB0byBhIHN0b3JlIGlmIG5vbmUgaXMgYm91bmQgYWxyZWFkeS5cclxuICogVGhlIGxheWVyIHdpbGwgYWxzbyBiZSBhZGRlZCB0byB0aGUgc3RvcmUncyBtYXAuXHJcbiAqIElmIG5vIGxheWVyIGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBsYXllclxyXG4gKiBAcGFyYW0gbGF5ZXIgQW4gb3B0aW9uYWwgVmVjdG9yTGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlCaW5kU3RvcmVMYXllcihzdG9yZTogRmVhdHVyZVN0b3JlLCBsYXllcj86IFZlY3RvckxheWVyKSB7XHJcbiAgaWYgKHN0b3JlLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdG9yZS5tYXAuYWRkTGF5ZXIoc3RvcmUubGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGF5ZXIgPSBsYXllciA/IGxheWVyIDogbmV3IFZlY3RvckxheWVyKHtcclxuICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKClcclxuICB9KTtcclxuICBzdG9yZS5iaW5kTGF5ZXIobGF5ZXIpO1xyXG4gIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUubWFwLmFkZExheWVyKHN0b3JlLmxheWVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYWRkIGEgbG9hZGluZyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBhY3RpdmF0ZSBpdC5cclxuICogSWYgbm8gc3RyYXRlZ3kgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIGxvYWRpbmcgc3RyYXRlZ3lcclxuICogQHBhcmFtIHN0cmF0ZWd5IEFuIG9wdGlvbmFsIGxvYWRpbmcgc3RyYXRlZ3lcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlBZGRMb2FkaW5nU3RyYXRlZ3koc3RvcmU6IEZlYXR1cmVTdG9yZSwgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpIHtcclxuICBpZiAoc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBzdHJhdGVneSA9IHN0cmF0ZWd5ID8gc3RyYXRlZ3kgOiBuZXcgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KHt9KTtcclxuICBzdG9yZS5hZGRTdHJhdGVneShzdHJhdGVneSk7XHJcbiAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBhZGQgYSBzZWxlY3Rpb24gc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgYWN0aXZhdGUgaXQuXHJcbiAqIElmIG5vIHN0cmF0ZWd5IGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBzZWxlY3Rpb24gc3RyYXRlZ3lcclxuICogQHBhcmFtIFtzdHJhdGVneV0gQW4gb3B0aW9uYWwgc2VsZWN0aW9uIHN0cmF0ZWd5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QWRkU2VsZWN0aW9uU3RyYXRlZ3koc3RvcmU6IEZlYXR1cmVTdG9yZSwgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkge1xyXG4gIGlmIChzdG9yZS5nZXRTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUuYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHN0cmF0ZWd5ID0gc3RyYXRlZ3kgPyBzdHJhdGVneSA6IG5ldyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSh7XHJcbiAgICBtYXA6IHN0b3JlLm1hcFxyXG4gIH0pO1xyXG4gIHN0b3JlLmFkZFN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICBzdHJhdGVneS5hY3RpdmF0ZSgpO1xyXG59XHJcbiJdfQ==