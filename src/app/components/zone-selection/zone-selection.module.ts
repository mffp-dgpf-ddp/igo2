import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule
} from '@angular/material';



import { IgoCoreModule } from '@igo2/core';
import {
  IgoPanelModule,
  IgoBackdropModule,
  IgoFlexibleModule
} from '@igo2/common';
import { IgoGeoModule } from '@igo2/geo';
import { IgoContextModule } from '@igo2/context';
import { IgoToolsModule } from '@igo2/tools';
import {MapOverlayModule} from '../../pages/portal/map-overlay/map-overlay.module';
import { ZoneSelectionComponent } from './zone-selection.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    IgoCoreModule,
    IgoPanelModule,
    IgoBackdropModule,
    IgoFlexibleModule,
    IgoGeoModule,
    IgoContextModule,
    IgoToolsModule,
  ],
  exports: [ZoneSelectionComponent],
  declarations: [ZoneSelectionComponent],
  entryComponents: [ZoneSelectionComponent]
})
export class ZoneSelectionModule {}
