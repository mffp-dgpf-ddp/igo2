import { Injectable } from '@angular/core';
import { IgoMap } from '@igo2/geo';

@Injectable({
  providedIn: 'root'
})
export class MapImageService {

  map: IgoMap;

  constructor() { }

  setMap(map: IgoMap) {
    this.map = map;
  }

  getMap() {
    return this.map;
  }
}
