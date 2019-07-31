import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Notification } from 'angular2-notifications';

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
  CapabilitiesService,
  FeatureType
} from '@igo2/geo';

import {
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from '../../pages/portal/portal.animation';

import { PortalComponent } from '../../pages/portal/portal.component';

@Component({
  selector: 'app-feature-viewer',
  templateUrl: './feature-viewer.component.html',
  styleUrls: ['./feature-viewer.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class FeatureViewerComponent extends PortalComponent implements OnChanges, OnDestroy, OnInit {


  @Input() feature: any;


  constructor(
    public route: ActivatedRoute,
    protected configService: ConfigService,
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
    super(
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
      messageService);
  }

  public view = {
    center: [-73, 47.2],
    zoom: 15
  };



  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'feature') {
        if (
          this.feature !== undefined &&
          this.feature !== null
        ) {
       //   this.addFeature(this.feature);
        }
      }
    }
  }

  ngOnInit() {
    if (this.feature !== undefined && this.feature !== null) {
     this.addFeature(this.feature);
    }
  }

  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
    this.mapService.getMap().ol.updateSize();
    }, 600);
  }

  addFeature(feature: any) {


    this.featureService.setFeatures([feature]);
    this.overlayService.clear();
    this.overlayService.setFeatures([feature], OverlayAction.ZoomIfOutMapExtent)
    this.updateMap();
  }
}
