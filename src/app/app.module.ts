import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  provideConfigOptions,
  IgoMessageModule,
  IgoGestureModule,
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
  provideStoredQueriesSearchSource,
  provideOsrmDirectionsSource,
  provideStyleListOptions
} from '@igo2/geo';

import { environment } from '../environments/environment';
import { PortalModule } from './pages';
import { AppComponent } from './app.component';
import { ZoneSelectionModule } from 'projects/geo/src/lib/components/zone-selection/zone-selection.module';
import { FeatureViewerModule } from 'projects/geo/src/lib/components/feature-viewer/feature-viewer.module';
import { IonicModule } from '@ionic/angular';

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
