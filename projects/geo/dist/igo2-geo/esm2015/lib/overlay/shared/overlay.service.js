/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayAction } from './overlay.enum';
import * as i0 from "@angular/core";
export class OverlayService {
    constructor() {
        this.features$ = new BehaviorSubject([
            [],
            undefined
        ]);
    }
    /**
     * @param {?} features
     * @param {?=} action
     * @return {?}
     */
    setFeatures(features, action = OverlayAction.None) {
        this.features$.next([features, action]);
    }
    /**
     * @return {?}
     */
    clear() {
        this.features$.next([[], OverlayAction.None]);
    }
}
OverlayService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
OverlayService.ctorParameters = () => [];
/** @nocollapse */ OverlayService.ngInjectableDef = i0.defineInjectable({ factory: function OverlayService_Factory() { return new OverlayService(); }, token: OverlayService, providedIn: "root" });
if (false) {
    /** @type {?} */
    OverlayService.prototype.features$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL292ZXJsYXkvc2hhcmVkL292ZXJsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSXZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLL0MsTUFBTSxPQUFPLGNBQWM7SUFNekI7UUFMTyxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQTZCO1lBQ2pFLEVBQUU7WUFDRixTQUFTO1NBQ1YsQ0FBQyxDQUFDO0lBRVksQ0FBQzs7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxRQUFtQixFQUFFLFNBQXdCLGFBQWEsQ0FBQyxJQUFJO1FBQ3pFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7WUFqQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7O0lBRUMsbUNBR0ciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcblxyXG5pbXBvcnQgeyBPdmVybGF5QWN0aW9uIH0gZnJvbSAnLi9vdmVybGF5LmVudW0nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgT3ZlcmxheVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBmZWF0dXJlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFtGZWF0dXJlW10sIE92ZXJsYXlBY3Rpb25dPihbXHJcbiAgICBbXSxcclxuICAgIHVuZGVmaW5lZFxyXG4gIF0pO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHNldEZlYXR1cmVzKGZlYXR1cmVzOiBGZWF0dXJlW10sIGFjdGlvbjogT3ZlcmxheUFjdGlvbiA9IE92ZXJsYXlBY3Rpb24uTm9uZSkge1xyXG4gICAgdGhpcy5mZWF0dXJlcyQubmV4dChbZmVhdHVyZXMsIGFjdGlvbl0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzJC5uZXh0KFtbXSwgT3ZlcmxheUFjdGlvbi5Ob25lXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==