import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { MediaService, ConfigService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import {
  DataSourceService,
  LayerService,
  MapService,
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
import { BboxService } from '../../services/bbox.service';
import { MapState, ContextState, SearchState, ToolState, QueryState } from '@igo2/integration';
import olCircle from 'ol/geom/Circle';
import olFeature from 'ol/Feature';


@Component({
  selector: 'app-zone-selection',
  templateUrl: './zone-selection.component.html',
  styleUrls: ['./zone-selection.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class ZoneSelectionComponent implements OnInit/*extends PortalComponent*/ {

  @Input() public zoneSelectionMode: string;
  private bbox;
  private radius;
  private clickPosition;

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

  }

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

    if(this.zoneSelectionMode == 'rayon'){
      this.map_.ol.on('click', function(event){
        this.clickPosition = this.map_.ol.getLonLatFromViewPortPx(event.pixel);
        this.createArea();
      })
    }
  }

  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
      this.map_.ol.updateSize();
    }, 600);
  }

  close() {
    this.modalController.dismiss();
  }

  selectZone() {
    this.bbox = this.map_.ol.getView().calculateExtent(this.map_.ol.getSize());
    this.bboxService.setBBOX(this.bbox);
    this.close();
  }

  setRadius(radius: number){
    this.radius = radius;
  }

  getRadius(){
    return this.radius;
  }

  createArea(){
    const lonLat = this.map_.ol.getLonLatFromViewPortPx(this.clickPosition);
    const circle = new olCircle(lonLat, this.radius);
    const bufferFeature = new olFeature(circle);
    this.map_.overlay.addOlFeature(bufferFeature)
    this.updateMap();
  }

}
