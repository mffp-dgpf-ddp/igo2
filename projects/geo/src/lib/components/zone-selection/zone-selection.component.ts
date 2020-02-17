import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { MediaService, ConfigService, MessageService, Message } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { ContextService } from '@igo2/context';
import {
  DataSourceService,
  LayerService,
  MapService,
  OverlayService,
  SearchService,
  CapabilitiesService,
  SearchSourceService,
  IgoMap
} from '@igo2/geo';

import {
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from '../../pages/portal/portal.animation';
import { PortalComponent } from '../../pages/portal/portal.component';
import { BboxService } from '../../services/bbox.service';
import { MapState, ContextState, SearchState, ToolState, QueryState } from '@igo2/integration';


@Component({
  selector: 'app-zone-selection',
  templateUrl: './zone-selection.component.html',
  styleUrls: ['./zone-selection.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class ZoneSelectionComponent implements OnInit/*extends PortalComponent*/ {

  private bbox;

  map_ = new IgoMap({
    controls: {
      scaleLine: true,
      attribution: {
        collapsed: true
      }
    }
  });
  public view_ = {
    center: [-73, 47.2],
    zoom: 15
  };

  constructor(
    public bboxService: BboxService,
    public route: ActivatedRoute,
    // private workspaceState: WorkspaceState,
    public authService: AuthService,
    public mediaService: MediaService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public cdRef: ChangeDetectorRef,
    public capabilitiesService: CapabilitiesService,
    public contextState: ContextState,
    public mapState: MapState,
    public searchState: SearchState,
    public queryState: QueryState,
    public toolState: ToolState,
    public searchSourceService: SearchSourceService,
    public searchService: SearchService,
    public configService: ConfigService,
    public mapService: MapService,
    private modalController: ModalController,

  ) {
    /*super(
      route,
      // private workspaceState: WorkspaceState,
      authService,
      mediaService,
      layerService,
      dataSourceService,
      cdRef,
      capabilitiesService,
      contextState,
      mapState,
      searchState,
      queryState,
      toolState,
      searchSourceService,
      searchService,
      configService);*/
    // this.mapService.setMap(this.map);
  }

  /*
      private route: ActivatedRoute,
    // private workspaceState: WorkspaceState,
    public authService: AuthService,
    public mediaService: MediaService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public cdRef: ChangeDetectorRef,
    public capabilitiesService: CapabilitiesService,
    private contextState: ContextState,
    private mapState: MapState,
    private searchState: SearchState,
    private queryState: QueryState,
    private toolState: ToolState,
    private searchSourceService: SearchSourceService,
    private searchService: SearchService,
    private configService: ConfigService*/

  ngOnInit() {
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

  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
      this.mapService.getMap().ol.updateSize();
    }, 600);
  }

  close() {
    this.modalController.dismiss();
  }

  selectZone() {
    this.bbox = this.mapService.getMap().ol.getView().calculateExtent(this.mapService.getMap().ol.getSize());
    this.bboxService.setBBOX(this.bbox);
    this.close();
  }
}

