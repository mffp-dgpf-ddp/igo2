import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  provideConfigOptions,
  IgoMessageModule,
  RouteService,
  NetworkModule,
  NetworkService
} from '@igo2/core';

import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoAuthModule } from '@igo2/auth';
import {
  provideIChercheSearchSource,
  provideIChercheReverseSearchSource,
  provideNominatimSearchSource,
  provideCoordinatesReverseSearchSource,
  provideILayerSearchSource,
  provideOsrmRoutingSource,
  IgoQueryModule
} from '@igo2/geo';

import { Network } from '@ionic-native/network/ngx';

import { environment } from '../environments/environment';
import { PortalModule } from './pages/portal/portal.module';
import { AppComponent } from './app.component';
import { BboxService } from './services/bbox.service';
import { FeatureViewerModule } from './components/feature-viewer/feature-viewer.module';
import { ZoneSelectionModule } from './components/zone-selection/zone-selection.module';
import { MapImageService } from './services/map-image.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    IgoAuthModule.forRoot(),
    IgoMessageModule,
    IgoSpinnerModule,
    IgoStopPropagationModule,
    PortalModule,
    FeatureViewerModule,
    ZoneSelectionModule,
    IgoQueryModule
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
    provideIChercheReverseSearchSource(),
    provideCoordinatesReverseSearchSource(),
    provideILayerSearchSource(),
    provideOsrmRoutingSource(),
    AndroidPermissions,
    Network,
    StatusBar,
    SplashScreen,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
