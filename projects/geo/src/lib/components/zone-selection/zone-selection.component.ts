import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Notification } from 'angular2-notifications';
import View from 'ol/View';

import { MediaService, ConfigService, MessageService, Message } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { Context, ContextService, ToolService } from '@igo2/context';
import {
  DataSourceService,
  Feature,
  FeatureService,
  IgoMap,
  LayerService,
  MapService,
  OverlayAction,
  OverlayService,
  SearchService,
  CapabilitiesService
} from '@igo2/geo';

import {
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from '../../pages/portal/portal.animation';
import { PortalComponent } from '../../pages/portal/portal.component';
import { BboxService } from '../../services/bbox.service';


@Component({
  selector: 'app-zone-selection',
  templateUrl: './zone-selection.component.html',
  styleUrls: ['./zone-selection.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class ZoneSelectionComponent implements OnInit /*extends PortalComponent*/ {

  private bbox;

  map_ = new IgoMap({
    controls: {
      scaleLine: true,
      attribution: {
        collapsed: true
      }
    }
  });


  constructor(
    private bboxService: BboxService,
    public route: ActivatedRoute,
    public configService: ConfigService,
    public authService: AuthService,
    public featureService: FeatureService,
    public mediaService: MediaService,
    public toolService: ToolService,
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
    /*super(
      route,
      configService,
      authService,
      featureService,
      mediaService,
      toolService,
      searchService,
      overlayService,
      mapService,
      layerService,
      dataSourceService,
      contextService,
      cdRef,
      capabilitiesService,
      messageService);*/
    //this.mapService.setMap(this.map);
    //this.map = this.mapService.getMap();
    this.dataSourceService
      .createAsyncDataSource({
        type: 'osm'
      })
      .subscribe(dataSource => {
        this.map_.addLayer(
          this.layerService.createLayer({
            title: 'OSM',
            source: dataSource
          })
        );
      });
    this.updateMap();
  }

  ngOnInit() {
  }

  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
      this.map_.ol.updateSize();
      this.mapService.setMap(this.map_);
    }, 600);
  }

  selectZone() {
    this.bbox = this.map_.ol.getView().calculateExtent(this.map_.ol.getSize());
    this.bboxService.setBBOX(this.bbox);
  }
}


