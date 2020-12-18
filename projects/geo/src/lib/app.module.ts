import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  provideConfigOptions,
  IgoMessageModule,
  IgoGestureModule,
  RouteService,
  NetworkService,
  NetworkIonicService
} from '@igo2/core';
import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoAuthModule } from '@igo2/auth';
import {
  provideIChercheSearchSource,
  provideIChercheReverseSearchSource,
  provideNominatimSearchSource,
  provideCoordinatesReverseSearchSource,
  provideILayerSearchSource,
  provideStoredQueriesSearchSource,
  provideOsrmDirectionsSource,
  provideOptionsApi,
  provideCadastreSearchSource,
  provideStyleListOptions,
  PrintService,
  PrintIonicService,
  ExportService,
  ExportIonicService
} from '@igo2/geo';

import { environment } from '../environments/environment';
import { PortalModule } from './pages/portal/portal.module';
import { AppComponent } from './app.component';
import { Network } from '@ionic-native/network/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {
  ContextExportService,
  ContextExportIonicService
 } from '@igo2/context';
import { BboxService } from './services/bbox.service';
import { FeatureLayerService } from './services/feature-layer.service';
import { MapImageService } from './services/map-image.service';
import { FeatureViewerModule } from './components/feature-viewer/feature-viewer.module';
import { ZoneSelectionModule } from './components/zone-selection/zone-selection.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    IgoAuthModule.forRoot(),
    IgoGestureModule.forRoot(),
    IgoMessageModule,
    IgoSpinnerModule,
    IgoStopPropagationModule,
    PortalModule,
    FeatureViewerModule,
    ZoneSelectionModule
  ],
  providers: [
    provideConfigOptions({
      default: environment.igo,
      path: './config/config.json'
    }),
    provideStyleListOptions({
      default: environment.igo,
      path: './config/style-list.json'
    }),
    RouteService,
    Network,
    File,
    FileOpener,
    BboxService,
    FeatureLayerService,
    MapImageService,
    { provide: NetworkService, useExisting: NetworkIonicService },
    { provide: PrintService, useExisting: PrintIonicService },
    { provide: ExportService, useExisting: ExportIonicService },
    { provide: ContextExportService, useExisting: ContextExportIonicService },
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideIChercheReverseSearchSource(),
    provideCoordinatesReverseSearchSource(),
    provideILayerSearchSource(),
    provideStoredQueriesSearchSource(),
    provideOsrmDirectionsSource()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
