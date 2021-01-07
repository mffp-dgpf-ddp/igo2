import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaService, ConfigService, MessageService, Message } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { Context, ContextService } from '@igo2/context';
import {
  DataSourceService,
  IgoMap,
  LayerService,
  MapService,
  OverlayAction,
  OverlayService,
  SearchService,
  CapabilitiesService,
  FeatureMotion,
} from '@igo2/geo';

import {
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from '../../pages/portal/portal.animation';

import { MapImageService } from '../../services/map-image.service';

@Component({
  selector: 'app-feature-viewer',
  templateUrl: './feature-viewer.component.html',
  styleUrls: ['./feature-viewer.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class FeatureViewerComponent implements OnChanges, OnInit {


  @Input() feature: any;

  map = new IgoMap({
    controls: {
      scaleLine: true,
      attribution: {
        collapsed: true
      }
    }
  });

  public view = {
    center: [-73, 47.2],
    zoom: 15
  };

  constructor(
    private mapImageService: MapImageService,
    public route: ActivatedRoute,
    protected configService: ConfigService,
    public authService: AuthService,
    public mediaService: MediaService,
    public searchService: SearchService,
    public overlayService: OverlayService,
    public mapService: MapService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public contextService: ContextService,
    public cdRef: ChangeDetectorRef,
    public capabilitiesService: CapabilitiesService,
    public messageService: MessageService
  ) {
    this.dataSourceService
      .createAsyncDataSource({
        type: 'osm'
      })
      .subscribe(dataSource => {
        this.map.addLayer(
          this.layerService.createLayer({
            title: 'OSM',
            source: dataSource
          })
        );
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'feature') {
        if (
          this.feature !== undefined &&
          this.feature !== null
        ) {
          this.addFeature(this.feature);
        }
      }
    }
  }

  ngOnInit() {
    if (this.feature !== undefined && this.feature !== null) {
      this.updateMap();
      this.addFeature(this.feature);
    }
  }

  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
      this.map.ol.updateSize();
      this.view.zoom = 4;
    }, 600);
  }

  addFeature(feature: any) {

    setTimeout(() => {
      this.map.overlay.clear();
      this.map.overlay.setFeatures([feature], FeatureMotion.Default);
      this.map.setView({ center: this.feature.geometry.coordinates, zoom: this.view.zoom });
      this.mapImageService.setMap(this.map);
      this.updateMap();
    }, 1000);

  }
}
