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
  provideStyleListOptions,
  PrintService,
  PrintIonicService
} from '@igo2/geo';

import { environment } from '../environments/environment';
import { PortalModule } from './pages/portal/portal.module';
import { AppComponent } from './app.component';
import { ZoneSelectionModule } from './components/zone-selection/zone-selection.module';
import { FeatureViewerModule } from './components/feature-viewer/feature-viewer.module';
import { IonicModule } from '@ionic/angular';
import { BboxService } from './services/bbox.service';
import { MapImageService } from './services/map-image.service';
import { Network } from '@ionic-native/network/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FeatureLayerService } from './services/feature-layer.service';

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
    ZoneSelectionModule,
    FeatureViewerModule,
    IonicModule
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
    BboxService,
    FeatureLayerService,
    MapImageService,
    Network,
    File,
    FileOpener,
    { provide: NetworkService, useExisting: NetworkIonicService },
    { provide: PrintService, useExisting: PrintIonicService },
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
