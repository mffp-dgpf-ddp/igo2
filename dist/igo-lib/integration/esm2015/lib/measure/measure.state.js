/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FeatureStore } from '@igo2/geo';
import { MapState } from '../map/map.state';
import * as i0 from "@angular/core";
import * as i1 from "../map/map.state";
/**
 * Service that holds the state of the measure module
 */
export class MeasureState {
    /**
     * @param {?} mapState
     */
    constructor(mapState) {
        this.mapState = mapState;
        /**
         * Store that holds the measures
         */
        this.store = new FeatureStore([], {
            map: this.mapState.map
        });
    }
}
MeasureState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MeasureState.ctorParameters = () => [
    { type: MapState }
];
/** @nocollapse */ MeasureState.ngInjectableDef = i0.defineInjectable({ factory: function MeasureState_Factory() { return new MeasureState(i0.inject(i1.MapState)); }, token: MeasureState, providedIn: "root" });
if (false) {
    /**
     * Store that holds the measures
     * @type {?}
     */
    MeasureState.prototype.store;
    /**
     * @type {?}
     * @private
     */
    MeasureState.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL21lYXN1cmUvbWVhc3VyZS5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFzQixNQUFNLFdBQVcsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQVE1QyxNQUFNLE9BQU8sWUFBWTs7OztJQVN2QixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVOzs7O1FBSi9CLFVBQUssR0FBcUMsSUFBSSxZQUFZLENBQXFCLEVBQUUsRUFBRTtZQUN4RixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1NBQ3ZCLENBQUMsQ0FBQztJQUVzQyxDQUFDOzs7WUFaM0MsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUFEsUUFBUTs7Ozs7Ozs7SUFhZiw2QkFFRzs7Ozs7SUFFUyxnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUsIEZlYXR1cmVXaXRoTWVhc3VyZSB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcbmltcG9ydCB7IE1hcFN0YXRlIH0gZnJvbSAnLi4vbWFwL21hcC5zdGF0ZSc7XHJcblxyXG4vKipcclxuICogU2VydmljZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSBvZiB0aGUgbWVhc3VyZSBtb2R1bGVcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lYXN1cmVTdGF0ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIHRoYXQgaG9sZHMgdGhlIG1lYXN1cmVzXHJcbiAgICovXHJcbiAgcHVibGljIHN0b3JlOiBGZWF0dXJlU3RvcmU8RmVhdHVyZVdpdGhNZWFzdXJlPiA9IG5ldyBGZWF0dXJlU3RvcmU8RmVhdHVyZVdpdGhNZWFzdXJlPihbXSwge1xyXG4gICAgbWFwOiB0aGlzLm1hcFN0YXRlLm1hcFxyXG4gIH0pO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcFN0YXRlOiBNYXBTdGF0ZSkge31cclxuXHJcbn1cclxuIl19