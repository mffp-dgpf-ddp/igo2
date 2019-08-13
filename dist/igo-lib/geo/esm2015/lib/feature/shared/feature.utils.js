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
 * @param {?=} projectionOut Feature projection
 * @return {?} Feature
 */
export function featureFromOl(olFeature, projectionIn, projectionOut = 'EPSG:4326') {
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
    /** @type {?} */
    const title = olFeature.get('_title');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUVwQyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBRUwsV0FBVyxFQUNYLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sY0FBYyxDQUFDO0FBR3RCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLDZCQUE2QixFQUM5QixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O0FBU3RCLE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQWdCLEVBQ2hCLGFBQXFCLEVBQ3JCLEtBQThCO0lBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOztVQUU5QixRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUU7O1VBQ2hDLFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUM5QyxjQUFjLEVBQUUsT0FBTyxDQUFDLFVBQVU7UUFDbEMsaUJBQWlCLEVBQUUsYUFBYTtLQUNqQyxDQUFDO0lBRUYsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7VUFFMUIsS0FBSyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7SUFDckMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3ZCLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0QztJQUVELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDaEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNoRDtJQUVELElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN4RDtJQUVELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDaEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNoRDs7VUFFSyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQztJQUM1RCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7UUFDMUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzVDO0lBRUQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVuRSxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDOzs7Ozs7Ozs7QUFVRCxNQUFNLFVBQVUsYUFBYSxDQUMzQixTQUFvQixFQUNwQixZQUFvQixFQUNwQixhQUFhLEdBQUcsV0FBVzs7VUFFckIsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFFOztVQUVoQyxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU07Ozs7SUFBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxVQUFVLENBQUM7SUFDcEQsQ0FBQyxFQUFDOztVQUNJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTTs7Ozs7SUFBQyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBRTtRQUMxRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUMsR0FBRSxFQUFFLENBQUM7O1VBRUEsUUFBUSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDckUsY0FBYyxFQUFFLGFBQWE7UUFDN0IsaUJBQWlCLEVBQUUsWUFBWTtLQUNoQyxDQUFDOztVQUVJLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7VUFDL0IsUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDOztVQUNyQyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRTtJQUU1QixPQUFPO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixVQUFVLEVBQUUsYUFBYTtRQUN6QixNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxFQUFFO1lBQ0osRUFBRTtZQUNGLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pELFFBQVE7WUFDUixRQUFRLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRTtTQUNsQztRQUNELFVBQVU7UUFDVixRQUFRO0tBQ1QsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLEdBQVcsRUFDWCxTQUFvQjs7UUFFaEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUU7O1VBRS9CLGVBQWUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQzs7VUFDMUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDeEQsSUFBSSxlQUFlLEtBQUssU0FBUyxJQUFJLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtRQUN0RSxRQUFRLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FDL0IsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixHQUFHLENBQUMsVUFBVSxDQUNmLENBQUM7S0FDSDtTQUFNOztjQUNDLFVBQVUsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFO1FBQzFDLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtZQUN2QixRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ25DO0tBQ0Y7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLHVCQUF1QixDQUNyQyxHQUFXLEVBQ1gsVUFBdUI7O1VBRWpCLE1BQU0sR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFO0lBRXJDLFVBQVUsQ0FBQyxPQUFPOzs7O0lBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7O2NBQ3BDLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO1FBQzVELFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsRUFBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxXQUFXLENBQ3pCLE1BQXdDLEVBQ3hDLEtBQXVDO1VBRWpDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2hELE9BQU87UUFDTCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3JELENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7QUFVRCxNQUFNLFVBQVUsb0JBQW9CLENBQ2xDLEdBQVcsRUFDWCxjQUFnRDs7VUFFMUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUU7O1VBQzNCLFNBQVMsR0FBRyxJQUFJOztVQUNoQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUM7O1VBQ2hELFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUyxFQUFFLG1CQUFBLEtBQUssRUFBb0MsQ0FBQztJQUVwRixPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLFVBQVUsd0JBQXdCLENBQ3RDLEdBQVcsRUFDWCxjQUFnRCxFQUNoRCxTQUFrQjtJQUVsQiwwRUFBMEU7SUFDMUUsNERBQTREO0lBQzVELFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOztVQUNwQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRTs7VUFDM0IsYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztVQUMzQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUUzRCxPQUFPLGtCQUFrQixHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUM7QUFDeEQsQ0FBQzs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixHQUFXLEVBQ1gsVUFBdUIsRUFDdkIsU0FBd0IsYUFBYSxDQUFDLE9BQU8sRUFDN0MsS0FBd0MsRUFDeEMsU0FBa0I7O1VBRVosY0FBYyxHQUFHLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7O1FBQzNELFVBQVUsR0FBRyxjQUFjO0lBQy9CLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUN2QixVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3QztJQUVELElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDakMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0M7U0FBTSxJQUFJLE1BQU0sS0FBSyxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3hDLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdDO1NBQU0sSUFBSSxNQUFNLEtBQUssYUFBYSxDQUFDLE9BQU8sRUFBRTtRQUMzQyxJQUNFLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUM7WUFDekMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsRUFDeEQ7WUFDQSxHQUFHLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QztLQUNGO0FBQ0gsQ0FBQzs7Ozs7O0FBTUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxTQUFvQjtJQUNoRCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7Ozs7Ozs7OztBQVNELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUFtQixFQUFFLEtBQW1CO0lBQ3hFLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDN0IsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTztLQUNSO0lBRUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQztRQUN0QyxNQUFNLEVBQUUsSUFBSSxpQkFBaUIsRUFBRTtLQUNoQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQztBQUNILENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQW1CLEVBQUUsUUFBc0M7SUFDL0YsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsMkJBQTJCLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDdEUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDMUQsT0FBTztLQUNSO0lBRUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLHVCQUF1QixDQUFDLEtBQW1CLEVBQUUsUUFBd0M7SUFDbkcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsNkJBQTZCLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDeEUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDNUQsT0FBTztLQUNSO0lBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLDZCQUE2QixDQUFDO1FBQ2pFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztLQUNmLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgT2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgT2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRW50aXR5S2V5LFxyXG4gIGdldEVudGl0eUlkLFxyXG4gIGdldEVudGl0eVRpdGxlLFxyXG4gIGdldEVudGl0eVJldmlzaW9uLFxyXG4gIGdldEVudGl0eVByb3BlcnR5XHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGRUFUVVJFLCBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4vZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5LFxyXG4gIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnLi9zdHJhdGVnaWVzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gT3BlbmxheWVycyBmZWF0dXJlIG9iamVjdCBvdXQgb2YgYSBmZWF0dXJlIGRlZmluaXRpb24uXHJcbiAqIFRoZSBvdXRwdXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZmVhdHVyZSBpZC5cclxuICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZSBkZWZpbml0aW9uXHJcbiAqIEBwYXJhbSBwcm9qZWN0aW9uT3V0IEZlYXR1cmUgb2JqZWN0IHByb2plY3Rpb25cclxuICogQHJldHVybnMgT3BlbkxheWVycyBmZWF0dXJlIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVUb09sKFxyXG4gIGZlYXR1cmU6IEZlYXR1cmUsXHJcbiAgcHJvamVjdGlvbk91dDogc3RyaW5nLFxyXG4gIGdldElkPzogKEZlYXR1cmUpID0+IEVudGl0eUtleVxyXG4pOiBPbEZlYXR1cmUge1xyXG4gIGdldElkID0gZ2V0SWQgPyBnZXRJZCA6IGdldEVudGl0eUlkO1xyXG5cclxuICBjb25zdCBvbEZvcm1hdCA9IG5ldyBPbEZvcm1hdEdlb0pTT04oKTtcclxuICBjb25zdCBvbEZlYXR1cmUgPSBvbEZvcm1hdC5yZWFkRmVhdHVyZShmZWF0dXJlLCB7XHJcbiAgICBkYXRhUHJvamVjdGlvbjogZmVhdHVyZS5wcm9qZWN0aW9uLFxyXG4gICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25PdXRcclxuICB9KTtcclxuXHJcbiAgb2xGZWF0dXJlLnNldElkKGdldElkKGZlYXR1cmUpKTtcclxuXHJcbiAgY29uc3QgdGl0bGUgPSBnZXRFbnRpdHlUaXRsZShmZWF0dXJlKTtcclxuICBpZiAodGl0bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgb2xGZWF0dXJlLnNldCgnX3RpdGxlJywgdGl0bGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZlYXR1cmUuZXh0ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19leHRlbnQnLCBmZWF0dXJlLmV4dGVudCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZmVhdHVyZS5wcm9qZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG9sRmVhdHVyZS5zZXQoJ19wcm9qZWN0aW9uJywgZmVhdHVyZS5wcm9qZWN0aW9uLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChmZWF0dXJlLmV4dGVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfZXh0ZW50JywgZmVhdHVyZS5leHRlbnQsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWFwVGl0bGUgPSBnZXRFbnRpdHlQcm9wZXJ0eShmZWF0dXJlLCAnbWV0YS5tYXBUaXRsZScpO1xyXG4gIGlmIChtYXBUaXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEZlYXR1cmUuc2V0KCdfbWFwVGl0bGUnLCBtYXBUaXRsZSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBvbEZlYXR1cmUuc2V0KCdfZW50aXR5UmV2aXNpb24nLCBnZXRFbnRpdHlSZXZpc2lvbihmZWF0dXJlKSwgdHJ1ZSk7XHJcblxyXG4gIHJldHVybiBvbEZlYXR1cmU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBmZWF0dXJlIG9iamVjdCBvdXQgb2YgYW4gT0wgZmVhdHVyZVxyXG4gKiBUaGUgb3V0cHV0IG9iamVjdCBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGZlYXR1cmUgaWQuXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgRmVhdHVyZVxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbkluIE9MIGZlYXR1cmUgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gcHJvamVjdGlvbk91dCBGZWF0dXJlIHByb2plY3Rpb25cclxuICogQHJldHVybnMgRmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVGcm9tT2woXHJcbiAgb2xGZWF0dXJlOiBPbEZlYXR1cmUsXHJcbiAgcHJvamVjdGlvbkluOiBzdHJpbmcsXHJcbiAgcHJvamVjdGlvbk91dCA9ICdFUFNHOjQzMjYnXHJcbik6IEZlYXR1cmUge1xyXG4gIGNvbnN0IG9sRm9ybWF0ID0gbmV3IE9sRm9ybWF0R2VvSlNPTigpO1xyXG5cclxuICBjb25zdCBrZXlzID0gb2xGZWF0dXJlLmdldEtleXMoKS5maWx0ZXIoKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gIWtleS5zdGFydHNXaXRoKCdfJykgJiYga2V5ICE9PSAnZ2VvbWV0cnknO1xyXG4gIH0pO1xyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSBrZXlzLnJlZHVjZSgoYWNjOiBvYmplY3QsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBhY2Nba2V5XSA9IG9sRmVhdHVyZS5nZXQoa2V5KTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICBjb25zdCBnZW9tZXRyeSA9IG9sRm9ybWF0LndyaXRlR2VvbWV0cnlPYmplY3Qob2xGZWF0dXJlLmdldEdlb21ldHJ5KCksIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25JblxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB0aXRsZSA9IG9sRmVhdHVyZS5nZXQoJ190aXRsZScpO1xyXG4gIGNvbnN0IG1hcFRpdGxlID0gb2xGZWF0dXJlLmdldCgnX21hcFRpdGxlJyk7XHJcbiAgY29uc3QgaWQgPSBvbEZlYXR1cmUuZ2V0SWQoKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uT3V0LFxyXG4gICAgZXh0ZW50OiBvbEZlYXR1cmUuZ2V0KCdfZXh0ZW50JyksXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGlkLFxyXG4gICAgICB0aXRsZTogdGl0bGUgPyB0aXRsZSA6IChtYXBUaXRsZSA/IG1hcFRpdGxlIDogaWQpLFxyXG4gICAgICBtYXBUaXRsZSxcclxuICAgICAgcmV2aXNpb246IG9sRmVhdHVyZS5nZXRSZXZpc2lvbigpXHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllcyxcclxuICAgIGdlb21ldHJ5XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYW4gT0wgZmVhdHVyZSBleHRlbnQgaW4gaXQncyBtYXAgcHJvamVjdGlvblxyXG4gKiBAcGFyYW0gbWFwIE1hcFxyXG4gKiBAcGFyYW0gb2xGZWF0dXJlIE9MIGZlYXR1cmVcclxuICogQHJldHVybnMgRXh0ZW50IGluIHRoZSBtYXAgcHJvamVjdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVPbEZlYXR1cmVFeHRlbnQoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlOiBPbEZlYXR1cmVcclxuKTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG4gIGxldCBvbEV4dGVudCA9IG9sZXh0ZW50LmNyZWF0ZUVtcHR5KCk7XHJcblxyXG4gIGNvbnN0IG9sRmVhdHVyZUV4dGVudCA9IG9sRmVhdHVyZS5nZXQoJ19leHRlbnQnKTtcclxuICBjb25zdCBvbEZlYXR1cmVQcm9qZWN0aW9uID0gb2xGZWF0dXJlLmdldCgnX3Byb2plY3Rpb24nKTtcclxuICBpZiAob2xGZWF0dXJlRXh0ZW50ICE9PSB1bmRlZmluZWQgJiYgb2xGZWF0dXJlUHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBvbEV4dGVudCA9IG9scHJvai50cmFuc2Zvcm1FeHRlbnQoXHJcbiAgICAgIG9sRmVhdHVyZUV4dGVudCxcclxuICAgICAgb2xGZWF0dXJlUHJvamVjdGlvbixcclxuICAgICAgbWFwLnByb2plY3Rpb25cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IG9sR2VvbWV0cnkgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcclxuICAgIGlmIChvbEdlb21ldHJ5ICE9PSBudWxsKSB7XHJcbiAgICAgIG9sRXh0ZW50ID0gb2xHZW9tZXRyeS5nZXRFeHRlbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvbEV4dGVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgYSBtdWx0aXBsZSBPTCBmZWF0dXJlcyBleHRlbnQgaW4gdGhlaXIgbWFwIHByb2plY3Rpb25cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZXNcclxuICogQHJldHVybnMgRXh0ZW50IGluIHRoZSBtYXAgcHJvamVjdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVPbEZlYXR1cmVzRXh0ZW50KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIG9sRmVhdHVyZXM6IE9sRmVhdHVyZVtdXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBjb25zdCBleHRlbnQgPSBvbGV4dGVudC5jcmVhdGVFbXB0eSgpO1xyXG5cclxuICBvbEZlYXR1cmVzLmZvckVhY2goKG9sRmVhdHVyZTogT2xGZWF0dXJlKSA9PiB7XHJcbiAgICBjb25zdCBmZWF0dXJlRXh0ZW50ID0gY29tcHV0ZU9sRmVhdHVyZUV4dGVudChtYXAsIG9sRmVhdHVyZSk7XHJcbiAgICBvbGV4dGVudC5leHRlbmQoZXh0ZW50LCBmZWF0dXJlRXh0ZW50KTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGV4dGVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNjYWxlIGFuIGV4dGVudC5cclxuICogQHBhcmFtIGV4dGVudCBFeHRlbnRcclxuICogQHBhcmFtIFNjYWxpbmcgZmFjdG9ycyBmb3IgdG9wLCByaWdodCwgYm90dG9tIGFuZCBsZWZ0IGRpcmVjdGlvbnMsIGluIHRoYXQgb3JkZXJcclxuICogQHJldHVybnMgU2NhbGVkIGV4dGVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlRXh0ZW50KFxyXG4gIGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgc2NhbGU6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdXHJcbik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcclxuICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBvbGV4dGVudC5nZXRTaXplKGV4dGVudCk7XHJcbiAgcmV0dXJuIFtcclxuICAgIHNjYWxlWzNdID8gZXh0ZW50WzBdIC0gd2lkdGggKiBzY2FsZVszXSA6IGV4dGVudFswXSxcclxuICAgIHNjYWxlWzJdID8gZXh0ZW50WzFdIC0gaGVpZ2h0ICogc2NhbGVbMl0gOiBleHRlbnRbMV0sXHJcbiAgICBzY2FsZVsxXSA/IGV4dGVudFsyXSArIHdpZHRoICogc2NhbGVbMV0gOiBleHRlbnRbMl0sXHJcbiAgICBzY2FsZVswXSA/IGV4dGVudFszXSArIGhlaWdodCAqIHNjYWxlWzBdIDogZXh0ZW50WzNdXHJcbiAgXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0cnVlIGlmIGZlYXR1cmVzIGFyZSBvdXQgb2Ygdmlldy5cclxuICogSWYgZmVhdHVyZXMgYXJlIHRvbyBjbG9zZSB0byB0aGUgZWRnZSwgdGhleSBhcmUgY29uc2lkZXJlZCBvdXQgb2Ygdmlldy5cclxuICogV2UgZGVmaW5lIHRoZSBlZGdlIGFzIDUlIG9mIHRoZSBleHRlbnQgc2l6ZS5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIGZlYXR1cmVzRXh0ZW50IFRoZSBmZWF0dXJlcydzIGV4dGVudFxyXG4gKiBAcmV0dXJucyBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgb3V0IG9mIHZpZXdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlc0FyZU91dE9mVmlldyhcclxuICBtYXA6IElnb01hcCxcclxuICBmZWF0dXJlc0V4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cclxuKSB7XHJcbiAgY29uc3QgbWFwRXh0ZW50ID0gbWFwLmdldEV4dGVudCgpO1xyXG4gIGNvbnN0IGVkZ2VSYXRpbyA9IDAuMDU7XHJcbiAgY29uc3Qgc2NhbGUgPSBbLTEsIC0xLCAtMSwgLTFdLm1hcCh4ID0+IHggKiBlZGdlUmF0aW8pO1xyXG4gIGNvbnN0IHZpZXdFeHRlbnQgPSBzY2FsZUV4dGVudChtYXBFeHRlbnQsIHNjYWxlIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdKTtcclxuXHJcbiAgcmV0dXJuICFvbGV4dGVudC5jb250YWluc0V4dGVudCh2aWV3RXh0ZW50LCBmZWF0dXJlc0V4dGVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdHJ1ZSBpZiBmZWF0dXJlcyBhcmUgdG9vIGRlZXAgaW50byB0aGUgdmlldy4gVGhpcyByZXN1bHRzXHJcbiAqIGluIGZlYXR1cmVzIGJlaW5nIHRvbyBzbWFsbC5cclxuICogRmVhdHVyZXMgYXJlIGNvbnNpZGVyZWQgdG9vIHNtYWxsIGlmIHRoZWlyIGV4dGVudCBvY2N1cGllcyBsZXNzIHRoYW5cclxuICogMSUgb2YgdGhlIG1hcCBleHRlbnQuXHJcbiAqIEBwYXJhbSBtYXAgTWFwXHJcbiAqIEBwYXJhbSBmZWF0dXJlc0V4dGVudCBUaGUgZmVhdHVyZXMncyBleHRlbnRcclxuICogQHBhcmFtIGFyZWFSYXRpbyBUaGUgZmVhdHVyZXMgZXh0ZW50IHRvIHZpZXcgZXh0ZW50IGFjY2VwdGFibGUgcmF0aW9cclxuICogQHJldHVybnMgUmV0dXJuIHRydWUgaWYgZmVhdHVyZXMgYXJlIHRvbyBkZWVwIGluIHRoZSB2aWV3XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZXNBcmVUb29EZWVwSW5WaWV3KFxyXG4gIG1hcDogSWdvTWFwLFxyXG4gIGZlYXR1cmVzRXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcclxuICBhcmVhUmF0aW8/OiBudW1iZXJcclxuKSB7XHJcbiAgLy8gQW4gYXJlYSByYXRpbyBvZiAwLjAwNCBtZWFucyB0aGF0IHRoZSBmZWF0dXJlIGV4dGVudCdzIHdpZHRoIGFuZCBoZWlnaHRcclxuICAvLyBzaG91bGQgYmUgYWJvdXQgMS8xNiBvZiB0aGUgbWFwIGV4dGVudCdzIHdpZHRoIGFuZCBoZWlnaHRcclxuICBhcmVhUmF0aW8gPSBhcmVhUmF0aW8gPyBhcmVhUmF0aW8gOiAwLjAwNDtcclxuICBjb25zdCBtYXBFeHRlbnQgPSBtYXAuZ2V0RXh0ZW50KCk7XHJcbiAgY29uc3QgbWFwRXh0ZW50QXJlYSA9IG9sZXh0ZW50LmdldEFyZWEobWFwRXh0ZW50KTtcclxuICBjb25zdCBmZWF0dXJlc0V4dGVudEFyZWEgPSBvbGV4dGVudC5nZXRBcmVhKGZlYXR1cmVzRXh0ZW50KTtcclxuXHJcbiAgcmV0dXJuIGZlYXR1cmVzRXh0ZW50QXJlYSAvIG1hcEV4dGVudEFyZWEgPCBhcmVhUmF0aW87XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaXQgdmlldyB0byBpbmNsdWRlIHRoZSBmZWF0dXJlcyBleHRlbnQuXHJcbiAqIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIHdpbGwgbGV0IHRoZSBmZWF0dXJlcyBvY2N1cHkgYWJvdXQgNTAlIG9mIHRoZSB2aWV3cG9ydC5cclxuICogQHBhcmFtIG1hcCBNYXBcclxuICogQHBhcmFtIG9sRmVhdHVyZXMgT0wgZmVhdHVyZXNcclxuICogQHBhcmFtIG1vdGlvbiBUbyBtb3Rpb24gdG8gdGhlIG5ldyBtYXAgdmlld1xyXG4gKiBAcGFyYW0gc2NhbGUgSWYgdGhpcyBpcyBkZWZpbmVkLCB0aGUgb3JpZ2luYWwgdmlldyB3aWxsIGJlIHNjYWxlZFxyXG4gKiAgYnkgdGhhdCBmYWN0b3IgYmVmb3JlIGFueSBsb2dpYyBpcyBhcHBsaWVkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb09sRmVhdHVyZXMoXHJcbiAgbWFwOiBJZ29NYXAsXHJcbiAgb2xGZWF0dXJlczogT2xGZWF0dXJlW10sXHJcbiAgbW90aW9uOiBGZWF0dXJlTW90aW9uID0gRmVhdHVyZU1vdGlvbi5EZWZhdWx0LFxyXG4gIHNjYWxlPzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXHJcbiAgYXJlYVJhdGlvPzogbnVtYmVyXHJcbikge1xyXG4gIGNvbnN0IGZlYXR1cmVzRXh0ZW50ID0gY29tcHV0ZU9sRmVhdHVyZXNFeHRlbnQobWFwLCBvbEZlYXR1cmVzKTtcclxuICBsZXQgdmlld0V4dGVudCA9IGZlYXR1cmVzRXh0ZW50O1xyXG4gIGlmIChzY2FsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB2aWV3RXh0ZW50ID0gc2NhbGVFeHRlbnQodmlld0V4dGVudCwgc2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1vdGlvbiA9PT0gRmVhdHVyZU1vdGlvbi5ab29tKSB7XHJcbiAgICBtYXAudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KHZpZXdFeHRlbnQpO1xyXG4gIH0gZWxzZSBpZiAobW90aW9uID09PSBGZWF0dXJlTW90aW9uLk1vdmUpIHtcclxuICAgIG1hcC52aWV3Q29udHJvbGxlci5tb3ZlVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgfSBlbHNlIGlmIChtb3Rpb24gPT09IEZlYXR1cmVNb3Rpb24uRGVmYXVsdCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBmZWF0dXJlc0FyZU91dE9mVmlldyhtYXAsIGZlYXR1cmVzRXh0ZW50KSB8fFxyXG4gICAgICBmZWF0dXJlc0FyZVRvb0RlZXBJblZpZXcobWFwLCBmZWF0dXJlc0V4dGVudCwgYXJlYVJhdGlvKVxyXG4gICAgKSB7XHJcbiAgICAgIG1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodmlld0V4dGVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGlkZSBhbiBPTCBmZWF0dXJlXHJcbiAqIEBwYXJhbSBvbEZlYXR1cmUgT0wgZmVhdHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVPbEZlYXR1cmUob2xGZWF0dXJlOiBPbEZlYXR1cmUpIHtcclxuICBvbEZlYXR1cmUuc2V0U3R5bGUobmV3IG9sc3R5bGUuU3R5bGUoe30pKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSB0byBiaW5kIGEgbGF5ZXIgdG8gYSBzdG9yZSBpZiBub25lIGlzIGJvdW5kIGFscmVhZHkuXHJcbiAqIFRoZSBsYXllciB3aWxsIGFsc28gYmUgYWRkZWQgdG8gdGhlIHN0b3JlJ3MgbWFwLlxyXG4gKiBJZiBubyBsYXllciBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgbGF5ZXJcclxuICogQHBhcmFtIGxheWVyIEFuIG9wdGlvbmFsIFZlY3RvckxheWVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QmluZFN0b3JlTGF5ZXIoc3RvcmU6IEZlYXR1cmVTdG9yZSwgbGF5ZXI/OiBWZWN0b3JMYXllcikge1xyXG4gIGlmIChzdG9yZS5sYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAoc3RvcmUubGF5ZXIubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3RvcmUubWFwLmFkZExheWVyKHN0b3JlLmxheWVyKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxheWVyID0gbGF5ZXIgPyBsYXllciA6IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICBzb3VyY2U6IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpXHJcbiAgfSk7XHJcbiAgc3RvcmUuYmluZExheWVyKGxheWVyKTtcclxuICBpZiAoc3RvcmUubGF5ZXIubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLm1hcC5hZGRMYXllcihzdG9yZS5sYXllcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVHJ5IHRvIGFkZCBhIGxvYWRpbmcgc3RyYXRlZ3kgdG8gYSBzdG9yZSBhbmQgYWN0aXZhdGUgaXQuXHJcbiAqIElmIG5vIHN0cmF0ZWd5IGlzIGdpdmVuIHRvIHRoYXQgZnVuY3Rpb24sIGEgYmFzaWMgb25lIHdpbGwgYmUgY3JlYXRlZC5cclxuICogQHBhcmFtIHN0b3JlIFRoZSBzdG9yZSB0byBiaW5kIHRoZSBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAqIEBwYXJhbSBzdHJhdGVneSBBbiBvcHRpb25hbCBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJ5QWRkTG9hZGluZ1N0cmF0ZWd5KHN0b3JlOiBGZWF0dXJlU3RvcmUsIHN0cmF0ZWd5PzogRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KSB7XHJcbiAgaWYgKHN0b3JlLmdldFN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RvcmUuYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgc3RyYXRlZ3kgPSBzdHJhdGVneSA/IHN0cmF0ZWd5IDogbmV3IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSh7fSk7XHJcbiAgc3RvcmUuYWRkU3RyYXRlZ3koc3RyYXRlZ3kpO1xyXG4gIHN0cmF0ZWd5LmFjdGl2YXRlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gYWRkIGEgc2VsZWN0aW9uIHN0cmF0ZWd5IHRvIGEgc3RvcmUgYW5kIGFjdGl2YXRlIGl0LlxyXG4gKiBJZiBubyBzdHJhdGVneSBpcyBnaXZlbiB0byB0aGF0IGZ1bmN0aW9uLCBhIGJhc2ljIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSBzdG9yZSBUaGUgc3RvcmUgdG8gYmluZCB0aGUgc2VsZWN0aW9uIHN0cmF0ZWd5XHJcbiAqIEBwYXJhbSBbc3RyYXRlZ3ldIEFuIG9wdGlvbmFsIHNlbGVjdGlvbiBzdHJhdGVneVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyeUFkZFNlbGVjdGlvblN0cmF0ZWd5KHN0b3JlOiBGZWF0dXJlU3RvcmUsIHN0cmF0ZWd5PzogRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpIHtcclxuICBpZiAoc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHN0b3JlLmFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBzdHJhdGVneSA9IHN0cmF0ZWd5ID8gc3RyYXRlZ3kgOiBuZXcgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3koe1xyXG4gICAgbWFwOiBzdG9yZS5tYXBcclxuICB9KTtcclxuICBzdG9yZS5hZGRTdHJhdGVneShzdHJhdGVneSk7XHJcbiAgc3RyYXRlZ3kuYWN0aXZhdGUoKTtcclxufVxyXG4iXX0=