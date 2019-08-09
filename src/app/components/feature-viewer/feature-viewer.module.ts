import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule
} from '@angular/material';


import { IgoCoreModule } from '@igo2/core';
import {
  IgoPanelModule,
  IgoBackdropModule,
  IgoFlexibleModule
} from '@igo2/common';
import { IgoGeoModule } from '@igo2/geo';
import { IgoContextModule } from '@igo2/context';
import { FeatureViewerComponent } from './feature-viewer.component';
import { MapOverlayModule } from '../../pages/portal/map-overlay/map-overlay.module';
@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    IgoCoreModule,
    IgoPanelModule,
    IgoBackdropModule,
    IgoFlexibleModule,
    IgoGeoModule,
    IgoContextModule,
    MapOverlayModule
  ],
  exports: [FeatureViewerComponent],
  declarations: [FeatureViewerComponent],
  entryComponents: [FeatureViewerComponent]
})
export class FeatureViewerModule { }
