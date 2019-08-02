import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BboxService {

  bbox: any = null;
  observableBbox: any;

  constructor() {
    this.observableBbox = new BehaviorSubject<any>(this.bbox);
  }

  eventChange() {
    this.observableBbox.next(this.bbox);
  }

  setBBOX(bbox: any) {
    this.bbox = bbox;
    this.eventChange();
  }

  getBBOX() {
    return this.bbox;
  }
}
