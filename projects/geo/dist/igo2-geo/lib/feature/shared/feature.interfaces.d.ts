import { FormGroup } from '@angular/forms';
import { GeoJsonGeometryTypes } from 'geojson';
import { EntityKey, EntityStoreOptions, EntityStoreStrategyOptions } from '@igo2/common';
import { VectorLayer } from '../../layer';
import { IgoMap } from '../../map';
import { FeatureMotion } from './feature.enums';
import OlFeature from 'ol/Feature';
export interface Feature<P = {
    [key: string]: any;
}> {
    type: string;
    projection?: string;
    geometry?: FeatureGeometry;
    properties: P;
    extent?: [number, number, number, number];
    meta?: FeatureMeta;
    ol?: OlFeature;
}
export interface FeatureMeta {
    id: EntityKey;
    title?: string;
    mapTitle?: string;
    sourceTitle?: string;
    order?: number;
    icon?: string;
    style?: {
        [key: string]: any;
    };
    alias?: {
        [key: string]: string;
    };
    revision?: number;
    excludeAttribute?: Array<string>;
    excludeAttributeOffline?: Array<string>;
}
export interface FeatureGeometry {
    type: GeoJsonGeometryTypes;
    coordinates: any;
}
export interface FeatureStoreOptions extends EntityStoreOptions {
    map: IgoMap;
    layer?: VectorLayer;
}
export interface FeatureStoreStrategyOptions extends EntityStoreStrategyOptions {
    viewScale?: [number, number, number, number];
    areaRatio?: number;
}
export interface FeatureStoreLoadingStrategyOptions extends FeatureStoreStrategyOptions {
    getFeatureId?: (Feature: any) => EntityKey;
    motion?: FeatureMotion;
}
export interface FeatureStoreLoadingLayerStrategyOptions extends FeatureStoreStrategyOptions {
}
export interface FeatureStoreSelectionStrategyOptions extends FeatureStoreStrategyOptions {
    map: IgoMap;
    getFeatureId?: (Feature: any) => EntityKey;
    motion?: FeatureMotion;
    layer?: VectorLayer;
    many?: boolean;
    hitTolerance?: number;
    dragBox?: boolean;
}
export interface FeatureFormSubmitEvent {
    form: FormGroup;
    feature: Feature | undefined;
    data: Feature;
}
