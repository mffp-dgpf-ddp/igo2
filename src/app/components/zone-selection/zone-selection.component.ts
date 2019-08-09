import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Notification } from 'angular2-notifications';

import { MediaService, ConfigService, MessageService, Message } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { Context, ContextService } from '@igo2/context';
import {
  DataSourceService,
  Feature,
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
export class ZoneSelectionComponent /*extends PortalComponent*/ {

  private bbox;

  constructor(
    private bboxService: BboxService,
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
  ) {/*
    super(
      route,
      configService,
      authService,
      searchService,
      overlayService,
      mapService,
      layerService,
      dataSourceService,
      contextService,
      cdRef,
      capabilitiesService,
      messageService);
    this.mapService.setMap(this.map);*/
  }

  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
      this.mapService.getMap().ol.updateSize();
    }, 600);
  }

  close() {
    // this.modalController.dismiss();
  }

  selectZone() {
    this.bbox = this.mapService.getMap().ol.getView().calculateExtent(this.mapService.getMap().ol.getSize());
    this.bboxService.setBBOX(this.bbox);
    this.close();
  }
}

