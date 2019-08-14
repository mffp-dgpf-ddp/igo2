import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';
import * as olProj from 'ol/proj';

import { MediaService, ConfigService, Media } from '@igo2/core';
import {
  // ActionbarMode,
  // Workspace,
  // WorkspaceStore,
  // EntityRecord,
  ActionStore,
  EntityStore,
  // getEntityTitle,
  Toolbox
} from '@igo2/common';
import { AuthService } from '@igo2/auth';
import { DetailedContext } from '@igo2/context';
import {
  DataSourceService,
  Feature,
  // FEATURE,
  FeatureMotion,
  featureToSearchResult,
  GoogleLinks,
  IgoMap,
  LayerService,
  QuerySearchSource,
  Research,
  SearchResult,
  SearchSource,
  SearchService,
  SearchSourceService,
  CapabilitiesService,
  MapService
} from '@igo2/geo';

import {
  ContextState,
  // WorkspaceState,
  ToolState,
  MapState,
  SearchState,
  QueryState
} from '@igo2/integration';

import {
  expansionPanelAnimation,
  toastPanelAnimation,
  baselayersAnimation,
  controlsAnimations,
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
  animations: [
    expansionPanelAnimation(),
    toastPanelAnimation(),
    baselayersAnimation(),
    controlsAnimations(),
    controlSlideX(),
    controlSlideY(),
    mapSlideX(),
    mapSlideY()
  ]
})
export class ZoneSelectionComponent extends PortalComponent {

  private bbox;

  constructor(
    private mapService: MapService,
    private bboxService: BboxService,
    protected route: ActivatedRoute,
    protected configService: ConfigService,
    // private workspaceState: WorkspaceState,
    public authService: AuthService,
    public mediaService: MediaService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public cdRef: ChangeDetectorRef,
    public capabilitiesService: CapabilitiesService,
    protected contextState: ContextState,
    protected mapState: MapState,
    protected searchState: SearchState,
    protected queryState: QueryState,
    protected toolState: ToolState,
    protected searchSourceService: SearchSourceService,
    protected searchService: SearchService
  ) {
    super(
      route,
      configService,
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
      searchService
    );
    this.mapService.setMap(this.map);
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

