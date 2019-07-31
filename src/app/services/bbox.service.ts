import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BboxService {

  bbox: any = null;

  constructor() { }

  setBBOX(bbox: any) {
    this.bbox = bbox;
  }

  getBBOX() {
    return this.bbox;
  }
}
