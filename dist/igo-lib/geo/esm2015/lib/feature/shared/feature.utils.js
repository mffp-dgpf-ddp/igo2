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
 * @param {?=} olLayer
 * @param {?=} projectionOut Feature projection
 * @return {?} Feature
 */
export function featureFromOl(olFeature, projectionIn, olLayer, projectionOut = 'EPSG:4326') {
    /** @type {?} */
    let title;
    /** @type {?} */
    let typeSource;
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
        typeSource = olLayer.get('sourceOptions').type;
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
            typeSource,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUVwQyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUdoRCxPQUFPLEVBRUwsV0FBVyxFQUNYLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sY0FBYyxDQUFDO0FBR3RCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLDZCQUE2QixFQUM5QixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O0FBU3RCLE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQWdCLEVBQ2hCLGFBQXFCLEVBQ3JCLEtBQThCO0lBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOztVQUU5QixRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUU7O1VBQ2hDLFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUM5QyxjQUFjLEVBQUUsT0FBTyxDQUFDLFVBQVU7UUFDbEMsaUJBQWlCLEVBQUUsYUFBYTtLQUNqQyxDQUFDO0lBRUYsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7VUFFMUIsS0FB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S0FDakM7QUFDSCxDQUFDOzs7Ozs7OztBQVFELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxLQUFtQixFQUFFLFFBQXNDO0lBQy9GLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLDJCQUEyQixDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ3RFLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQzFELE9BQU87S0FDUjtJQUVELFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRSxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0QixDQUFDOzs7Ozs7OztBQVFELE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxLQUFtQixFQUFFLFFBQXdDO0lBQ25HLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLDZCQUE2QixDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ3hFLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzVELE9BQU87S0FDUjtJQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSw2QkFBNkIsQ0FBQztRQUNqRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7S0FDZixDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xleHRlbnQgZnJvbSAnb2wvZXh0ZW50JztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IE9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcbmltcG9ydCBPbExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRW50aXR5S2V5LFxyXG4gIGdldEVudGl0eUlkLFxyXG4gIGdldEVudGl0eVRpdGxlLFxyXG4gIGdldEVudGl0eVJldmlzaW9uLFxyXG4gIGdldEVudGl0eVByb3BlcnR5XHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5LFxyXG4gIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnLi9zdHJhdGVnaWVzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdCBvdXQgb2YgYSBmZWF0dXJlIGRlZmluaXRpb24uXHJcbiAqIFRoZSBvdXRwdXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZmVhdHVyZSBpZC5cclxuICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZSBkZWZpbml0aW9uXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uT3V0IEZlYXR1cmUgb2JqZWN0IHByb2plY3Rpb25cclxuICogQHJldHVybnMgT3BlbkxheWVycyBmZWF0dXJlIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVUb09sKFxyXG4gIGZlYXR1cmU6IEZlYXR1cmUsXHJcbiAgcHJvamVjdGlvbk91dDogc3RyaW5nLFxyXG4gIGdldElkPzogKEZlYXR1cmUpID0+IEVudGl0eUtleVxyXG4pOiBPbEZlYXR1cmUge1xyXG4gIGdldElkID0gZ2V0SWQgPyBnZXRJZCA6IGdldEVudGl0eUlkO1xyXG5cclxuICBjb25zdCBvbEZvcm1hdCA9IG5ldyBPbEZvcm1hdEdlb0pTT04oKTtcclxuICBjb25zdCBvbEZlYXR1cmUgPSBvbEZvcm1hdC5yZWFkRmVhdHVyZShmZWF0dXJlLCB7XHJcbiAgICBkYXRhUHJvamVjdGlvbjogZmVhdHVyZS5wcm9qZWN0aW9uLFxyXG4gICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25PdXRcclxuICB9KTtcclxuXHJcbiAgb2xGZWF0dXJlLnNldElkKGdldElkKGZlYXR1cmUpKTtcclxuXHJcbiAgY29uc3QgdGl0bGUgPSBnZXRFbnRpdHlUaXRsZShmZWF0dXJlKTtcclxuICBpZiAodGl0bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX3RpdGxlJywgdGl0bGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUuZXh0ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19leHRlbnQnLCBmZWF0dXJlLmV4dGVudCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5wcm9qZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19wcm9qZWN0aW9uJywgZmVhdHVyZS5wcm9qZWN0aW9uLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLmV4dGVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfZXh0ZW50JywgZmVhdHVyZS5leHRlbnQsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWFwVGl0bGUgPSBnZXRFbnRpdHlQcm9wZXJ0eShmZWF0dXJlLCAnbWV0YS5tYXBUaXRsZScpO1xyXG4gIGlmIChtYXBUaXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfbWFwVGl0bGUnLCBtYXBUaXRsZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBvbEZlYXR1cmUuc2V0KCdfZW50aXR5UmV2aXNpb24nLCBnZXRFbnRpdHlSZXZpc2lvbihmZWF0dXJlKSwgdHJ1ZSk7XHJcblxyXG4gIHJldHVybiBvbEZlYXR1cmU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBmZWF0dXJlIG9iamVjdCBvdXQgb2YgYW4gT0wgZmVhdHVyZVxyXG4gKiBUaGUgb3V0cHV0IG9iamVjdCBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGZlYXR1cmUgaWQuXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgRmVhdHVyZVxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbkluIE9MIGZlYXR1cmUgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbk91dCBGZWF0dXJlIHByb2plY3Rpb25cclxuICogQHJldHVybnMgRmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVGcm9tT2woXHJcbiAgb2xGZWF0dXJlOiBPbEZlYXR1cmUsXHJcbiAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgb2xMYXllcj86IE9sTGF5ZXIsXHJcbiAgcHJvamVjdGlvbk91dCA9ICdFUFNHOjQzMjYnXHJcbik6IEZlYXR1cmUge1xyXG4gIGxldCB0aXRsZTtcclxuICBsZXQgdHlwZVNvdXJjZTtcclxuICBjb25zdCBvbEZvcm1hdCA9IG5ldyBPbEZvcm1hdEdlb0pTT04oKTtcclxuXHJcbiAgY29uc3Qga2V5cyA9IG9sRmVhdHVyZS5nZXRLZXlzKCkuZmlsdGVyKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuICFrZXkuc3RhcnRzV2l0aCgnXycpICYmIGtleSAhPT0gJ2dlb21ldHJ5JztcclxuICB9KTtcclxuICBjb25zdCBwcm9wZXJ0aWVzID0ga2V5cy5yZWR1Y2UoKGFjYzogb2JqZWN0LCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgYWNjW2tleV0gPSBvbEZlYXR1cmUuZ2V0KGtleSk7XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIHt9KTtcclxuXHJcbiAgY29uc3QgZ2VvbWV0cnkgPSBvbEZvcm1hdC53cml0ZUdlb21ldHJ5T2JqZWN0KG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpLCB7XHJcbiAgICBkYXRhUHJvamVjdGlvbjogcHJvamVjdGlvbk91dCxcclxuICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBwcm9qZWN0aW9uSW5cclxuICB9KTtcclxuXHJcbiAgaWYgKG9sTGF5ZXIpIHtcclxuICAgIHRpdGxlID0gb2xMYXllci5nZXQoJ3RpdGxlJyk7XHJcbiAgICB0eXBlU291cmNlID0gb2xMYXllci5nZXQoJ3NvdXJjZU9wdGlvbnMnKS50eXBlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aXRsZSA9IG9sRmVhdHVyZS5nZXQoJ190aXRsZScpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWFwVGl0bGUgPSBvbEZlYXR1cmUuZ2V0KCdfbWFwVGl0bGUnKTtcclxuICBjb25zdCBpZCA9IG9sRmVhdHVyZS5nZXRJZCgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogRkVBVFVSRSxcclxuICAgIHByb2plY3Rpb246IHByb2plY3Rpb25PdXQsXHJcbiAgICBleHRlbnQ6IG9sRmVhdHVyZS5nZXQoJ19leHRlbnQnKSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaWQsXHJcbiAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlIDogKG1hcFRpdGxlID8gbWFwVGl0bGUgOiBpZCksXHJcbiAgICAgIG1hcFRpdGxlLFxyXG4gICAgICB0eXBlU291cmNlLFxyXG4gICAgICByZXZpc2lvbjogb2xGZWF0dXJlLmdldFJldmlzaW9uKClcclxuICAgIH0sXHJcbiAgICBwcm9wZXJ0aWVzLFxyXG4gICAgZ2VvbWV0cnlcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhbiBPTCBmZWF0dXJlIGV4dGVudCBpbiBpdCdzIG1hcCBwcm9qZWN0aW9uXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgZmVhdHVyZVxyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZUV4dGVudChcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmU6IE9sRmVhdHVyZVxyXG4pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcbiAgbGV0IG9sRXh0ZW50ID0gb2xleHRlbnQuY3JlYXRlRW1wdHkoKTtcclxuXHJcbiAgY29uc3Qgb2xGZWF0dXJlRXh0ZW50ID0gb2xGZWF0dXJlLmdldCgnX2V4dGVudCcpO1xyXG4gIGNvbnN0IG9sRmVhdHVyZVByb2plY3Rpb24gPSBvbEZlYXR1cmUuZ2V0KCdfcHJvamVjdGlvbicpO1xyXG4gIGlmIChvbEZlYXR1cmVFeHRlbnQgIT09IHVuZGVmaW5lZCAmJiBvbEZlYXR1cmVQcm9qZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRXh0ZW50ID0gb2xwcm9qLnRyYW5zZm9ybUV4dGVudChcclxuICAgICAgb2xGZWF0dXJlRXh0ZW50LFxyXG4gICAgICBvbEZlYXR1cmVQcm9qZWN0aW9uLFxyXG4gICAgICBtYXAucHJvamVjdGlvblxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3Qgb2xHZW9tZXRyeSA9IG9sRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xyXG4gICAgaWYgKG9sR2VvbWV0cnkgIT09IG51bGwpIHtcclxuICAgICAgb2xFeHRlbnQgPSBvbEdlb21ldHJ5LmdldEV4dGVudCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9sRXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhIG11bHRpcGxlIE9MIGZlYXR1cmVzIGV4dGVudCBpbiB0aGVpciBtYXAgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcmV0dXJucyBFeHRlbnQgaW4gdGhlIG1hcCBwcm9qZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU9sRmVhdHVyZXNFeHRlbnQoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW11cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IGV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcblxyXG4gIG9sRmVhdHVyZXMuZm9yRWFjaCgob2xGZWF0dXJlOiBPbEZlYXR1cmUpID0+IHtcclxuICAgIGNvbnN0IGZlYXR1cmVFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlRXh0ZW50KG1hcCwgb2xGZWF0dXJlKTtcclxuICAgIG9sZXh0ZW50LmV4dGVuZChleHRlbnQsIGZlYXR1cmVFeHRlbnQpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZXh0ZW50O1xyXG59XHJcblxyXG4vKipcclxuICogU2NhbGUgYW4gZXh0ZW50LlxyXG4gKiBAcGFyYW0gZXh0ZW50IEV4dGVudFxyXG4gKiBAcGFyYW0gU2NhbGluZyBmYWN0b3JzIGZvciB0b3AsIHJpZ2h0LCBib3R0b20gYW5kIGxlZnQgZGlyZWN0aW9ucywgaW4gdGhhdCBvcmRlclxyXG4gKiBAcmV0dXJucyBTY2FsZWQgZXh0ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVFeHRlbnQoXHJcbiAgZXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBzY2FsZTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IG9sZXh0ZW50LmdldFNpemUoZXh0ZW50KTtcclxuICByZXR1cm4gW1xyXG4gICAgc2NhbGVbM10gPyBleHRlbnRbMF0gLSB3aWR0aCAqIHNjYWxlWzNdIDogZXh0ZW50WzBdLFxyXG4gICAgc2NhbGVbMl0gPyBleHRlbnRbMV0gLSBoZWlnaHQgKiBzY2FsZVsyXSA6IGV4dGVudFsxXSxcclxuICAgIHNjYWxlWzFdID8gZXh0ZW50WzJdICsgd2lkdGggKiBzY2FsZVsxXSA6IGV4dGVudFsyXSxcclxuICAgIHNjYWxlWzBdID8gZXh0ZW50WzNdICsgaGVpZ2h0ICogc2NhbGVbMF0gOiBleHRlbnRbM11cclxuICBdO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIG91dCBvZiB2aWV3LlxyXG4gKiBJZiBmZWF0dXJlcyBhcmUgdG9vIGNsb3NlIHRvIHRoZSBlZGdlLCB0aGV5IGFyZSBjb25zaWRlcmVkIG91dCBvZiB2aWV3LlxyXG4gKiBXZSBkZWZpbmUgdGhlIGVkZ2UgYXMgNSUgb2YgdGhlIGV4dGVudCBzaXplLlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gZmVhdHVyZXNFeHRlbnQgVGhlIGZlYXR1cmVzJ3MgZXh0ZW50XHJcbiAqIEByZXR1cm5zIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSBvdXQgb2Ygdmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIGZlYXR1cmVzRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXVxyXG4pIHtcclxuICBjb25zdCBtYXBFeHRlbnQgPSBtYXAuZ2V0RXh0ZW50KCk7XHJcbiAgY29uc3QgZWRnZVJhdGlvID0gMC4wNTtcclxuICBjb25zdCBzY2FsZSA9IFstMSwgLTEsIC0xLCAtMV0ubWFwKHggPT4geCAqIGVkZ2VSYXRpbyk7XHJcbiAgY29uc3Qgdmlld0V4dGVudCA9IHNjYWxlRXh0ZW50KG1hcEV4dGVudCwgc2NhbGUgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pO1xyXG5cclxuICByZXR1cm4gIW9sZXh0ZW50LmNvbnRhaW5zRXh0ZW50KHZpZXdFeHRlbnQsIGZlYXR1cmVzRXh0ZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSB0b28gZGVlcCBpbnRvIHRoZSB2aWV3LiBUaGlzIHJlc3VsdHNcclxuICogaW4gZmVhdHVyZXMgYmVpbmcgdG9vIHNtYWxsLlxyXG4gKiBGZWF0dXJlcyBhcmUgY29uc2lkZXJlZCB0b28gc21hbGwgaWYgdGhlaXIgZXh0ZW50IG9jY3VwaWVzIGxlc3MgdGhhblxyXG4gKiAxJSBvZiB0aGUgbWFwIGV4dGVudC5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIGZlYXR1cmVzRXh0ZW50IFRoZSBmZWF0dXJlcydzIGV4dGVudFxyXG4gKiBAcGFyYW0gYXJlYVJhdGlvIFRoZSBmZWF0dXJlcyBleHRlbnQgdG8gdmlldyBleHRlbnQgYWNjZXB0YWJsZSByYXRpb1xyXG4gKiBAcmV0dXJucyBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgdG9vIGRlZXAgaW4gdGhlIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlc0FyZVRvb0RlZXBJblZpZXcoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgZmVhdHVyZXNFeHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxyXG4gIGFyZWFSYXRpbz86IG51bWJlclxyXG4pIHtcclxuICAvLyBBbiBhcmVhIHJhdGlvIG9mIDAuMDA0IG1lYW5zIHRoYXQgdGhlIGZlYXR1cmUgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIC8vIHNob3VsZCBiZSBhYm91dCAxLzE2IG9mIHRoZSBtYXAgZXh0ZW50J3Mgd2lkdGggYW5kIGhlaWdodFxyXG4gIGFyZWFSYXRpbyA9IGFyZWFSYXRpbyA/IGFyZWFSYXRpbyA6IDAuMDA0O1xyXG4gIGNvbnN0IG1hcEV4dGVudCA9IG1hcC5nZXRFeHRlbnQoKTtcclxuICBjb25zdCBtYXBFeHRlbnRBcmVhID0gb2xleHRlbnQuZ2V0QXJlYShtYXBFeHRlbnQpO1xyXG4gIGNvbnN0IGZlYXR1cmVzRXh0ZW50QXJlYSA9IG9sZXh0ZW50LmdldEFyZWEoZmVhdHVyZXNFeHRlbnQpO1xyXG5cclxuICByZXR1cm4gZmVhdHVyZXNFeHRlbnRBcmVhIC8gbWFwRXh0ZW50QXJlYSA8IGFyZWFSYXRpbztcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpdCB2aWV3IHRvIGluY2x1ZGUgdGhlIGZlYXR1cmVzIGV4dGVudC5cclxuICogQnkgZGVmYXVsdCwgdGhpcyBtZXRob2Qgd2lsbCBsZXQgdGhlIGZlYXR1cmVzIG9jY3VweSBhYm91dCA1MCUgb2YgdGhlIHZpZXdwb3J0LlxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlcyBPTCBmZWF0dXJlc1xyXG4gKiBAcGFyYW0gbW90aW9uIFRvIG1vdGlvbiB0byB0aGUgbmV3IG1hcCB2aWV3XHJcbiAqIEBwYXJhbSBzY2FsZSBJZiB0aGlzIGlzIGRlZmluZWQsIHRoZSBvcmlnaW5hbCB2aWV3IHdpbGwgYmUgc2NhbGVkXHJcbiAqICBieSB0aGF0IGZhY3RvciBiZWZvcmUgYW55IGxvZ2ljIGlzIGFwcGxpZWQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVRvT2xGZWF0dXJlcyhcclxuICBtYXA6IElnb01hcCxcclxuICBvbEZlYXR1cmVzOiBPbEZlYXR1cmVbXSxcclxuICBtb3Rpb246IEZlYXR1cmVNb3Rpb24gPSBGZWF0dXJlTW90aW9uLkRlZmF1bHQsXHJcbiAgc2NhbGU/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBhcmVhUmF0aW8/OiBudW1iZXJcclxuKSB7XHJcbiAgY29uc3QgZmVhdHVyZXNFeHRlbnQgPSBjb21wdXRlT2xGZWF0dXJlc0V4dGVudChtYXAsIG9sRmVhdHVyZXMpO1xyXG4gIGxldCB2aWV3RXh0ZW50ID0gZmVhdHVyZXNFeHRlbnQ7XHJcbiAgaWYgKHNjYWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHZpZXdFeHRlbnQgPSBzY2FsZUV4dGVudCh2aWV3RXh0ZW50LCBzY2FsZSk7XHJcbiAgfVxyXG5cclxuICBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLlpvb20pIHtcclxuICAgIG1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgfSBlbHNlIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uTW92ZSkge1xyXG4gICAgbWFwLnZpZXdDb250cm9sbGVyLm1vdmVUb0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICB9IGVsc2UgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZlYXR1cmVzQXJlT3V0T2ZWaWV3KG1hcCwgZmVhdHVyZXNFeHRlbnQpIHx8XHJcbiAgICAgIGZlYXR1cmVzQXJlVG9vRGVlcEluVmlldyhtYXAsIGZlYXR1cmVzRXh0ZW50LCBhcmVhUmF0aW8pXHJcbiAgICApIHtcclxuICAgICAgbWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh2aWV3RXh0ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWRlIGFuIE9MIGZlYXR1cmVcclxuICogQHBhcmFtIG9sRmVhdHVyZSBPTCBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGlkZU9sRmVhdHVyZShvbEZlYXR1cmU6IE9sRmVhdHVyZSkge1xyXG4gIG9sRmVhdHVyZS5zZXRTdHlsZShuZXcgb2xzdHlsZS5TdHlsZSh7fSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGJpbmQgYSBsYXllciB0byBhIHN0b3JlIGlmIG5vbmUgaXMgYm91bmQgYWxyZWFkeS5cclxuICogVGhlIGxheWVyIHdpbGwgYWxzbyBiZSBhZGRlZCB0byB0aGUgc3RvcmUncyBtYXAuXHJcbiAqIElmIG5vIGxheWVyIGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBsYXllclxyXG4gKiBAcGFyYW0gbGF5ZXIgQW4gb3B0aW9uYWwgVmVjdG9yTGF5ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlCaW5kU3RvcmVMYXllcihzdG9yZTogRmVhdHVyZVN0b3JlLCBsYXllcj86IFZlY3RvckxheWVyKSB7XHJcbiAgaWYgKHN0b3JlLmxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdG9yZS5tYXAuYWRkTGF5ZXIoc3RvcmUubGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGF5ZXIgPSBsYXllciA/IGxheWVyIDogbmV3IFZlY3RvckxheWVyKHtcclxuICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKClcclxuICB9KTtcclxuICBzdG9yZS5iaW5kTGF5ZXIobGF5ZXIpO1xyXG4gIGlmIChzdG9yZS5sYXllci5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUubWFwLmFkZExheWVyKHN0b3JlLmxheWVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYWRkIGEgbG9hZGluZyBzdHJhdGVneSB0byBhIHN0b3JlIGFuZCBhY3RpdmF0ZSBpdC5cclxuICogSWYgbm8gc3RyYXRlZ3kgaXMgZ2l2ZW4gdG8gdGhhdCBmdW5jdGlvbiwgYSBiYXNpYyBvbmUgd2lsbCBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gc3RvcmUgVGhlIHN0b3JlIHRvIGJpbmQgdGhlIGxvYWRpbmcgc3RyYXRlZ3lcclxuICogQHBhcmFtIHN0cmF0ZWd5IEFuIG9wdGlvbmFsIGxvYWRpbmcgc3RyYXRlZ3lcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlBZGRMb2FkaW5nU3RyYXRlZ3koc3RvcmU6IEZlYXR1cmVTdG9yZSwgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpIHtcclxuICBpZiAoc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBzdHJhdGVneSA9IHN0cmF0ZWd5ID8gc3RyYXRlZ3kgOiBuZXcgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KHt9KTtcclxuICBzdG9yZS5hZGRTdHJhdGVneShzdHJhdGVneSk7XHJcbiAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBhZGQgYSBzZWxlY3Rpb24gc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgYWN0aXZhdGUgaXQuXHJcbiAqIElmIG5vIHN0cmF0ZWd5IGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBzZWxlY3Rpb24gc3RyYXRlZ3lcclxuICogQHBhcmFtIFtzdHJhdGVneV0gQW4gb3B0aW9uYWwgc2VsZWN0aW9uIHN0cmF0ZWd5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QWRkU2VsZWN0aW9uU3RyYXRlZ3koc3RvcmU6IEZlYXR1cmVTdG9yZSwgc3RyYXRlZ3k/OiBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkge1xyXG4gIGlmIChzdG9yZS5nZXRTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUuYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHN0cmF0ZWd5ID0gc3RyYXRlZ3kgPyBzdHJhdGVneSA6IG5ldyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSh7XHJcbiAgICBtYXA6IHN0b3JlLm1hcFxyXG4gIH0pO1xyXG4gIHN0b3JlLmFkZFN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICBzdHJhdGVneS5hY3RpdmF0ZSgpO1xyXG59XHJcbiJdfQ==