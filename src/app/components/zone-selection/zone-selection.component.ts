import { Component, OnInit } from '@angular/core';
import { MapService } from '@igo2/geo';
import { ModalController } from '@ionic/angular';

import { Igo2MapService } from '../ion-igo2/igo2-map.service';


@Component({
  selector: 'app-zone-selection',
  templateUrl: './zone-selection.component.html',
  styleUrls: ['./zone-selection.component.scss']
})
export class ZoneSelectionComponent implements OnInit {


  private bbox;


  constructor(
    private modalController: ModalController,
    private igo2MapService: Igo2MapService,
    private mapService: MapService,
  ) {
  }

  ngOnInit() {
    this.updateMap();
  }

  updateMap() {
    // Sans cela la carte n'affichait pas
    setTimeout(() => {
      this.mapService.getMap().ol.updateSize();
    }, 600);
  }

  close() {
    this.modalController.dismiss();
  }

  selectZone() {
    this.bbox = this.mapService.getMap().ol.getView().calculateExtent(this.mapService.getMap().ol.getSize());
    this.igo2MapService.setBBOX(this.bbox);
    this.close();
  }

}
