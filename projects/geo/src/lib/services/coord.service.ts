import { Injectable } from '@angular/core';
import { toStringHDMS, toStringXY } from 'ol/coordinate';
import { BehaviorSubject } from 'rxjs';
import { transform } from 'ol/proj';
import { MapService } from '@igo2/geo';
import { createStringXY } from 'ol/coordinate';

@Injectable({
  providedIn: 'root'
})
export class CoordService {
  radius = 1000;
  coord: any = null;
  observableCoord: any;
  observableRadius: any;

  constructor(private mapService: MapService) {
    this.observableCoord = new BehaviorSubject<any>(this.coord);
    this.observableRadius = new BehaviorSubject<any>(this.radius);
  }

  eventChange() {
    this.observableCoord.next(this.coord);
    this.observableRadius.next(this.radius);
  }

  public setCoord(coord: any) {
    this.coord = coord;
    this.eventChange();
  }

  public setRadius(radius: any) {
    this.radius = radius;
    this.eventChange();
  }

  public getHDMS() {
    if (this.coord !== null && this.coord !== undefined) {
      return toStringHDMS(this.coord, 5);
    }
    return null;
  }

  public getStringXY() {
    return toStringXY(this.coord, 5);
  }

  public convertDMSToDEG(dms) {
    if (dms != null) {
      const dms_Array = dms.split(/[^\d\w\.]+/);
      if (dms_Array.length === 8) {
        const degreesX = dms_Array[0];
        const minutesX = dms_Array[1];
        const secondsX = dms_Array[2];
        const directionX = dms_Array[3];
        const degreesY = dms_Array[4];
        const minutesY = dms_Array[5];
        const secondsY = dms_Array[6];
        const directionY = dms_Array[7];

        let degX = (Number(degreesX) + Number(minutesX) / 60 + Number(secondsX) / 3600);
        let degY = (Number(degreesY) + Number(minutesY) / 60 + Number(secondsY) / 3600);

        if (directionX === 'S' || directionX === 'W' || directionX === 'O') {
          degX = degX * -1;
        } // Don't do anything for N or E

        if (directionY === 'S' || directionY === 'W' || directionY === 'O') {
          degY = degY * -1;
        }

        return [degY, degX];
      }
    }
    return null;
  }

  getBBOX() {
    const coordXY = transform(this.coord, 'EPSG:4326', 'EPSG:3857');
    const bottomLeftCoord = transform([coordXY[0] - this.radius, coordXY[1] - this.radius], 'EPSG:3857', 'EPSG:4326');
    const topRightCoord = transform([coordXY[0] + this.radius, coordXY[1] + this.radius], 'EPSG:3857', 'EPSG:4326');
    const bottomLeftCoordString = toStringXY(bottomLeftCoord, 5).split(', ').join(',');
    const topRightCoordString = toStringXY(topRightCoord, 5).split(', ').join(',');
    return `${bottomLeftCoordString},${topRightCoordString}`;
  }

  public coordIs4326(coord) {
    if (coord[0].toString().slice(0, 3).includes('.') ||
      coord[0].toString().slice(0, 4).includes('.')) {
      return true;
    }
    return false;
  }



}
