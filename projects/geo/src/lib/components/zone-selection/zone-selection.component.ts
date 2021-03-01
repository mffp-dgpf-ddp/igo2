import { Component, OnInit, ChangeDetectorRef, Input, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { transform } from 'ol/proj';
import { ListenerFunction } from 'ol/events';
import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';

import { MediaService, ConfigService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import {
  DataSourceService,
  LayerService,
  MapService,
  SearchService,
  CapabilitiesService,
  SearchSourceService,
  IgoMap,
  MapViewOptions
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
import { CoordService } from '../../services/coord.service';


@Component({
  selector: 'app-zone-selection',
  templateUrl: './zone-selection.component.html',
  styleUrls: ['./zone-selection.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class ZoneSelectionComponent implements OnInit, AfterViewChecked/*extends PortalComponent*/ {

  @Input() public zoneSelectionMode: string;
  private bbox;
  private radius;
  private clickPosition;
  private lastCirclePosition;
  private mapClickListener: ListenerFunction;

  map_ = new IgoMap({
    controls: {
      scaleLine: true,
      attribution: {
        collapsed: true
      }
    },
  });


  constructor(
    public bboxService: BboxService,
    public coordService: CoordService,
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
    this.radius = 1000;
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
    if (this.zoneSelectionMode == 'coord') {
      this.listenToMapClick();
    }
    setTimeout(() => {
      if (this.coordService.coord !== undefined && this.coordService.coord !== null) {
        this.createArea(transform(this.coordService.coord, 'EPSG:4326', this.map_.projection));
      }
    }, 1000);
    this.updateMap();
  }
  
  ngAfterViewChecked() {
    this.map_.ol.updateSize();
  }

  private listenToMapClick() {
    this.mapClickListener = this.map_.ol.on(
      'singleclick',
      (event: OlMapBrowserPointerEvent) => this.onPointerEvent(event)
    );
  }


  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
      this.map_.ol.updateSize();
    }, 1100);
  }

  close() {
    this.modalController.dismiss();
  }

  selectZone() {
    this.bbox = this.map_.ol.getView().calculateExtent(this.map_.ol.getSize());
    this.bboxService.setBBOX(this.bbox);
    this.close();
  }

  setRadius(radius: number) {
    this.radius = radius;
    this.coordService.setRadius(radius);
    if (this.coordService.coord !== undefined && this.coordService.coord !== null) {
      this.map_.overlay.clear();
      this.createArea(transform(this.coordService.coord, 'EPSG:4326', this.map_.projection));
    }
  }

  getRadius() {
    return this.radius;
  }

  createArea(coord: any) {
    const circle = new olCircle(coord, this.radius);
    const bufferFeature = new olFeature(circle);
    this.map_.overlay.addOlFeature(bufferFeature);
  }

  private onPointerEvent(event: OlMapBrowserPointerEvent) {
    const lonlat = transform(event.coordinate, this.map_.projection, 'EPSG:4326');
    this.coordService.setCoord(lonlat);
    this.map_.overlay.clear();
    this.createArea(event.coordinate);
    this.updateMap();
  }

}

