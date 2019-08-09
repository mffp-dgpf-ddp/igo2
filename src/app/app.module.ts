import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  provideConfigOptions,
  IgoMessageModule,
  RouteService
} from '@igo2/core';

import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoAuthModule } from '@igo2/auth';
import {
  provideIChercheSearchSource,
  provideIChercheReverseSearchSource,
  provideNominatimSearchSource,
  provideCoordinatesReverseSearchSource,
  provideILayerSearchSource,
  provideOsrmRoutingSource
} from '@igo2/geo';

import { environment } from '../environments/environment';
import { PortalModule } from './pages/portal/portal.module';
import { AppComponent } from './app.component';
import { BboxService } from './services/bbox.service';
import { FeatureViewerModule } from './components/feature-viewer/feature-viewer.module';
import { ZoneSelectionModule } from './components/zone-selection/zone-selection.module';
import { MapImageService } from './services/map-image.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    IgoAuthModule.forRoot(),
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
    RouteService,
    BboxService,
    MapImageService,
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideIChercheReverseSearchSource(), // TODO: replace by territoire
    provideCoordinatesReverseSearchSource(),
    provideILayerSearchSource(),
    provideOsrmRoutingSource(),
    AndroidPermissions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
