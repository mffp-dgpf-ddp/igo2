import { Injectable } from '@angular/core';
import { MapService, FeatureDataSourceOptions, QueryableDataSourceOptions, FeatureDataSource, VectorLayer, Layer, ClusterDataSourceOptions, ClusterDataSource, Feature, FEATURE, featureToOl, StyleService } from "@igo2/geo";
import { ClusterParam, ClusterRange } from '@igo2/geo/lib/layer/shared/clusterParam';


@Injectable({
  providedIn: 'root'
})
export class FeatureLayerService {

  private baseStyle;
  private clusterStyle;

  constructor(
    private mapService: MapService,
    private styleService: StyleService
  ) {
    this.resetStyles();
  }


  resetStyles() {
    this.baseStyle = {
      circle: {
        fill: {
          color: 'red'
        },
        stroke: {
          color: 'black'
        },
        radius: 4
      }
    };

    this.clusterStyle = {
      circle: {
        fill: {
          color: 'red'
        },
        stroke: {
          color: 'black'
        },
        radius: 4
      }
    };
  }


  setBaseStyle(strokeColor: string, fillColor: string, radius: number) {
    this.baseStyle = {
      circle: {
        fill: {
          color: fillColor
        },
        stroke: {
          color: strokeColor
        },
        radius: radius,
      }
    };
  }

  setClusterStyle(strokeColor: string, fillColor: string) {
    this.clusterStyle = {
      circle: {
        fill: {
          color: fillColor
        },
        stroke: {
          color: strokeColor
        }
      }
    };
  }


  geojsonToFeature(geogson: any[]) {
    const features: Feature[] = new Array();

    for (let i = 0; i < geogson.length; i++) {
      const feature: Feature = {
        type: FEATURE,
        projection: 'EPSG:4326',
        properties: geogson[i].properties,
        geometry: {
          type: 'Point',
          coordinates: geogson[i].geometry.coordinates
        }
      };
      const olFeature = featureToOl(feature, this.mapService.getMap().projection);
      features.push(olFeature);
    }
    return features;
  }

  public addFeaturesOnNewMapLayer(features: Feature[], layerId: string, layerName: string) {
    const baseStyle = {
      circle: {
        fill: {
          color: 'red'
        },
        stroke: {
          color: 'black'
        },
        radius: 4,
      }
    };

    const style = this.styleService.createStyle(baseStyle);
    const sourceOptions: FeatureDataSourceOptions & QueryableDataSourceOptions = {
      queryable: true,
      type: 'vector'
    };
    const featureSource = new FeatureDataSource(sourceOptions);
    featureSource.ol.addFeatures(features);
    featureSource.ol.projection_ = 'EPSG:4326';
    const resultsLayer = this.mapService.getMap().getLayerById(layerId);
    if (resultsLayer !== undefined) {
      this.mapService.getMap().removeLayer(resultsLayer);
    }

    const today = this.getCurrentDate();
    const time = this.getCurrentTime();

    const layer = new VectorLayer({
      title: `Résultats ${layerName} ${today} ${time}`,
      source: featureSource,
      sourceOptions: sourceOptions,
      id: layerId,
      style: style,
    });
    this.mapService.getMap().addLayer(layer);
  }

  public addFeaturesOnNewClusterMapLayer(features: Feature[], layerId: string, layerName: string) {

    const clusterRange: ClusterRange = {
      minRadius: 2,
      maxRadius: 5,
      style: this.baseStyle
    };

    const clusterParam: ClusterParam = {
      clusterRanges: [clusterRange]
    };
    const sourceOptions: ClusterDataSourceOptions & QueryableDataSourceOptions = {
      distance: 70,
      queryable: true,
      type: 'cluster'
    };
    const featureSource = new ClusterDataSource(sourceOptions);
    featureSource.ol.source.addFeatures(features);
    const style = feature => {
      return this.styleService.createClusterStyle(feature, clusterParam, this.clusterStyle);
    };
    const resultsLayer = this.mapService.getMap().getLayerById(layerId);
    if (resultsLayer !== undefined) {
      this.mapService.getMap().removeLayer(resultsLayer);
    }

    const today = this.getCurrentDate();
    const time = this.getCurrentTime();

    const layer = new VectorLayer({
      title: `Résultats ${layerName} ${today} ${time}`,
      source: featureSource,
      id: layerId,
      style: style
    });
    this.mapService.getMap().addLayer(layer);
  }

  getCurrentDate() {
    const date = new Date();
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }

  getCurrentTime() {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }


}
