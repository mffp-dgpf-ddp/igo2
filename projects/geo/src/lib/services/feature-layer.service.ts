import { Injectable } from '@angular/core';
import Point from 'ol/geom/Point';
//import Feature from 'ol/Feature';
import {MapService, FeatureDataSourceOptions, QueryableDataSourceOptions, FeatureDataSource, VectorLayer, Layer, ClusterDataSourceOptions, ClusterDataSource, Feature, FEATURE, featureToOl, StyleService} from "@igo2/geo";
import { ClusterParam, ClusterRange } from '@igo2/geo/lib/layer/shared/clusterParam';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeatureLayerService {

  constructor(
    private mapService : MapService,
    private styleService : StyleService
    ) { }


  geojsonToFeature(geogson : any[]){
    let features : Feature[] = new Array();

    for(let i =0; i<geogson.length; i++){
      const feature: Feature = {
        type: FEATURE,
        projection: 'EPSG:4326',
        properties: geogson[i].properties,
        geometry: {
          type: 'Point',
          coordinates: geogson[i].geometry.coordinates
        }
      }
      let olFeature = featureToOl(feature, this.mapService.getMap().projection)
      features.push(olFeature);
    }
    return features;
  }

  public addFeaturesOnNewMapLayer(features : Feature[], layerId : string, layerName : string){
    let baseStyle = {
      circle: {
       fill: {
         color: "red"
       },
       stroke: {
         color: "black"
       },
       radius: 4,
      }
    };

    let style = this.styleService.createStyle(baseStyle);
    const sourceOptions : FeatureDataSourceOptions & QueryableDataSourceOptions = {
      queryable: true,
      type: 'vector'
    };
    const featureSource = new FeatureDataSource(sourceOptions);
    featureSource.ol.addFeatures(features);
    featureSource.ol.projection_ = "EPSG:4326";
    let grifResultsLayer = this.mapService.getMap().getLayerById(layerId);
    if(grifResultsLayer !== undefined){
      this.mapService.getMap().removeLayer(grifResultsLayer);
    }
    const layer = new VectorLayer({
      title: `Résultats ${layerName}`,
      source: featureSource,
      sourceOptions: sourceOptions,
      id: layerId,
      style : style,
    })
    this.mapService.getMap().addLayer(layer);
  }

  public addFeaturesOnNewClusterMapLayer(features : Feature[], layerId : string, layerName : string){
    let baseStyle = {
      circle: {
       fill: {
         color: "green"
       },
       stroke: {
         color: "black"
       },
       radius: 4
      }
    };

    let baseStyler = {
      circle: {
       fill: {
         color: "red"
       },
       stroke: {
         color: "black"
       }
      }
    };
    let clusterRange : ClusterRange ={
      minRadius : 2,
      maxRadius : 5,
      style : baseStyle
    }

    const clusterParam: ClusterParam ={
      clusterRanges: [clusterRange]
    };
    const sourceOptions : ClusterDataSourceOptions & QueryableDataSourceOptions = {
      distance: 70,
      queryable: true,
      type: 'cluster'
    };
    const featureSource = new ClusterDataSource(sourceOptions);
    featureSource.ol.source.addFeatures(features);
    let style = feature =>{
      return this.styleService.createClusterStyle(feature,clusterParam,baseStyler);
    };
    const layer = new VectorLayer({
      title: `Résultats ${layerName}`,
      source: featureSource,
      id : layerId,
      style : style
    });
    this.mapService.getMap().addLayer(layer);
  }


}
