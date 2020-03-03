/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { SpatialFilterQueryType, SpatialFilterType } from '../../shared/spatial-filter.enum';
import { FormControl } from '@angular/forms';
import { EntityStore } from '@igo2/common';
/**
 * Spatial Filter Type
 */
var SpatialFilterTypeComponent = /** @class */ (function () {
    function SpatialFilterTypeComponent() {
        this.queryType = ['Arrond', 'CircFed', 'CircProv', 'DirReg', 'Mun', 'MRC', 'AdmRegion', 'RegTour'];
        this.selectedTypeIndex = new FormControl(0);
        /**
         * Reference to the SpatialFIlterType enum
         * \@internal
         */
        this.spatialType = SpatialFilterType;
        this.activeDrawType = this.spatialType.Polygon;
        this.eventType = new EventEmitter();
        this.eventQueryType = new EventEmitter();
        this.zoneChange = new EventEmitter();
    }
    Object.defineProperty(SpatialFilterTypeComponent.prototype, "store", {
        get: /**
         * @return {?}
         */
        function () {
            return this._store;
        },
        set: /**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            this._store = store;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SpatialFilterTypeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.selectedTypeIndex.value === 0) {
            this.type = this.spatialType.Predefined;
        }
        if (this.selectedTypeIndex.value === 1) {
            this.type = this.activeDrawType;
        }
        this.eventType.emit(this.type);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SpatialFilterTypeComponent.prototype.onTypeChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.selectedTypeIndex.value === 0) {
            this.type = SpatialFilterType.Predefined;
        }
        if (this.selectedTypeIndex.value === 1) {
            this.type = this.activeDrawType;
        }
        this.eventType.emit(this.type);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SpatialFilterTypeComponent.prototype.onQueryTypeChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.eventQueryType.emit(this.selectedQueryType);
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    SpatialFilterTypeComponent.prototype.onZoneChange = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        this.zoneChange.emit(feature);
    };
    /**
     * @param {?} spatialType
     * @return {?}
     */
    SpatialFilterTypeComponent.prototype.onDrawTypeChange = /**
     * @param {?} spatialType
     * @return {?}
     */
    function (spatialType) {
        this.activeDrawType = spatialType;
        this.eventType.emit(this.activeDrawType);
    };
    SpatialFilterTypeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-spatial-filter-type',
                    template: "<mat-tab-group\r\n  [selectedIndex]=\"selectedTypeIndex.value\"\r\n  (selectedIndexChange)=\"selectedTypeIndex.setValue($event)\"\r\n  (selectedTabChange)=\"onTypeChange($event)\">\r\n\r\n  <mat-tab [label]=\"'igo.geo.spatialFilter.predefined' |\u00A0translate\">\r\n    <mat-form-field>\r\n      <mat-label>{{'igo.geo.spatialFilter.searchLabel' | translate}}</mat-label>\r\n      <mat-select (selectionChange)=\"onQueryTypeChange($event)\" [(value)]=\"selectedQueryType\">\r\n        <mat-option *ngFor=\"let queryType of queryType\" [value]=\"queryType\">\r\n          {{('igo.geo.terrapi.' + queryType) | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <igo-spatial-filter-list\r\n      [store]=\"store\"\r\n      [queryType]=\"selectedQueryType\"\r\n      [selectedZone]=\"zone\"\r\n      (zoneChange)=\"onZoneChange($event)\">\r\n    </igo-spatial-filter-list>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.geo.spatialFilter.draw' |\u00A0translate\">\r\n    <div class=\"spatial-type-toggle\">\r\n      <mat-button-toggle-group\r\n        [value]=\"activeDrawType\"\r\n        (change)=\"onDrawTypeChange($event.value)\">\r\n        <mat-button-toggle [value]=\"spatialType.Polygon\" [matTooltip]=\"'igo.geo.spatialFilter.drawPolygon' |\u00A0translate\">\r\n            <mat-icon svgIcon=\"pentagon-outline\"></mat-icon>\r\n        </mat-button-toggle>\r\n        <mat-button-toggle [value]=\"spatialType.Point\" [matTooltip]=\"'igo.geo.spatialFilter.drawCircle' |\u00A0translate\">\r\n            <mat-icon svgIcon=\"record-circle-outline\"></mat-icon>\r\n        </mat-button-toggle>\r\n      </mat-button-toggle-group>\r\n    </div>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mat-form-field{padding:5px;width:95%;margin-left:2px}.mat-tab-group ::ng-deep .mat-tab-body-content{overflow:hidden}.mat-tab-group ::ng-deep .mat-tab-label{padding:10px}.mat-tab-group ::ng-deep .mat-tab-body-wrapper{margin-top:5px}.spatial-type-toggle{padding:10px;text-align:center}.spatial-type-toggle mat-button-toggle-group,.spatial-type-toggle mat-button-toggle-group mat-button-toggle{width:50%}"]
                }] }
    ];
    /** @nocollapse */
    SpatialFilterTypeComponent.ctorParameters = function () { return []; };
    SpatialFilterTypeComponent.propDecorators = {
        store: [{ type: Input }],
        selectedQueryType: [{ type: Input }],
        zone: [{ type: Input }],
        eventType: [{ type: Output }],
        eventQueryType: [{ type: Output }],
        zoneChange: [{ type: Output }]
    };
    return SpatialFilterTypeComponent;
}());
export { SpatialFilterTypeComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SpatialFilterTypeComponent.prototype._store;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.queryType;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.selectedTypeIndex;
    /**
     * Reference to the SpatialFIlterType enum
     * \@internal
     * @type {?}
     */
    SpatialFilterTypeComponent.prototype.spatialType;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.activeDrawType;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.selectedQueryType;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.zone;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.type;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.eventType;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.eventQueryType;
    /** @type {?} */
    SpatialFilterTypeComponent.prototype.zoneChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhdGlhbC1maWx0ZXItdHlwZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NwYXRpYWwtZmlsdGVyL3NwYXRpYWwtZmlsdGVyLXR5cGUvc3BhdGlhbC1maWx0ZXItdHlwZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLHVCQUF1QixFQUN2QixNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzdGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7O0FBTTNDO0lBd0NFO1FBdkJPLGNBQVMsR0FBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RyxzQkFBaUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFNdkMsZ0JBQVcsR0FBRyxpQkFBaUIsQ0FBQztRQUVoQyxtQkFBYyxHQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQVExRCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFFbEQsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUU1RCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUVwQyxDQUFDO0lBaENoQixzQkFDSSw2Q0FBSzs7OztRQURUO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBQ0QsVUFBVSxLQUEyQjtZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTs7OztJQStCRCw2Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7U0FDekM7UUFDRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELGlEQUFZOzs7O0lBQVosVUFBYSxLQUFLO1FBQ2hCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELHNEQUFpQjs7OztJQUFqQixVQUFrQixLQUFLO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7O0lBRUQsaURBQVk7Ozs7SUFBWixVQUFhLE9BQU87UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxxREFBZ0I7Ozs7SUFBaEIsVUFBaUIsV0FBOEI7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7O2dCQXpFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsK3NEQUFtRDtvQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7d0JBR0UsS0FBSztvQ0FvQkwsS0FBSzt1QkFFTCxLQUFLOzRCQUlMLE1BQU07aUNBRU4sTUFBTTs2QkFFTixNQUFNOztJQW9DVCxpQ0FBQztDQUFBLEFBMUVELElBMEVDO1NBcEVZLDBCQUEwQjs7Ozs7O0lBU3JDLDRDQUFxQzs7SUFFckMsK0NBQStHOztJQUMvRyx1REFBOEM7Ozs7OztJQU05QyxpREFBdUM7O0lBRXZDLG9EQUFvRTs7SUFFcEUsdURBQW1EOztJQUVuRCwwQ0FBdUI7O0lBRXZCLDBDQUErQjs7SUFFL0IsK0NBQTREOztJQUU1RCxvREFBc0U7O0lBRXRFLGdEQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUsIFNwYXRpYWxGaWx0ZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NwYXRpYWwtZmlsdGVyLmVudW0nO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vLi4vZmVhdHVyZSc7XHJcblxyXG4vKipcclxuICogU3BhdGlhbCBGaWx0ZXIgVHlwZVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc3BhdGlhbC1maWx0ZXItdHlwZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NwYXRpYWwtZmlsdGVyLXR5cGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NwYXRpYWwtZmlsdGVyLXR5cGUuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3BhdGlhbEZpbHRlclR5cGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzdG9yZSgpOiBFbnRpdHlTdG9yZTxGZWF0dXJlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgfVxyXG4gIHNldCBzdG9yZShzdG9yZTogRW50aXR5U3RvcmU8RmVhdHVyZT4pIHtcclxuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3N0b3JlOiBFbnRpdHlTdG9yZTxGZWF0dXJlPjtcclxuXHJcbiAgcHVibGljIHF1ZXJ5VHlwZTogc3RyaW5nW10gPSBbJ0Fycm9uZCcsICdDaXJjRmVkJywgJ0NpcmNQcm92JywgJ0RpclJlZycsICdNdW4nLCAnTVJDJywgJ0FkbVJlZ2lvbicsICdSZWdUb3VyJ107XHJcbiAgcHVibGljIHNlbGVjdGVkVHlwZUluZGV4ID0gbmV3IEZvcm1Db250cm9sKDApO1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIFNwYXRpYWxGSWx0ZXJUeXBlIGVudW1cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgc3BhdGlhbFR5cGUgPSBTcGF0aWFsRmlsdGVyVHlwZTtcclxuXHJcbiAgcHVibGljIGFjdGl2ZURyYXdUeXBlOiBTcGF0aWFsRmlsdGVyVHlwZSA9IHRoaXMuc3BhdGlhbFR5cGUuUG9seWdvbjtcclxuXHJcbiAgQElucHV0KCkgc2VsZWN0ZWRRdWVyeVR5cGU6IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGU7XHJcblxyXG4gIEBJbnB1dCgpIHpvbmU6IEZlYXR1cmU7XHJcblxyXG4gIHB1YmxpYyB0eXBlOiBTcGF0aWFsRmlsdGVyVHlwZTtcclxuXHJcbiAgQE91dHB1dCgpIGV2ZW50VHlwZSA9IG5ldyBFdmVudEVtaXR0ZXI8U3BhdGlhbEZpbHRlclR5cGU+KCk7XHJcblxyXG4gIEBPdXRwdXQoKSBldmVudFF1ZXJ5VHlwZSA9IG5ldyBFdmVudEVtaXR0ZXI8U3BhdGlhbEZpbHRlclF1ZXJ5VHlwZT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIHpvbmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZlYXR1cmU+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFR5cGVJbmRleC52YWx1ZSA9PT0gMCkge1xyXG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLnNwYXRpYWxUeXBlLlByZWRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFR5cGVJbmRleC52YWx1ZSA9PT0gMSkge1xyXG4gICAgICB0aGlzLnR5cGUgPSB0aGlzLmFjdGl2ZURyYXdUeXBlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ldmVudFR5cGUuZW1pdCh0aGlzLnR5cGUpO1xyXG4gIH1cclxuXHJcbiAgb25UeXBlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFR5cGVJbmRleC52YWx1ZSA9PT0gMCkge1xyXG4gICAgICB0aGlzLnR5cGUgPSBTcGF0aWFsRmlsdGVyVHlwZS5QcmVkZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUeXBlSW5kZXgudmFsdWUgPT09IDEpIHtcclxuICAgICAgdGhpcy50eXBlID0gdGhpcy5hY3RpdmVEcmF3VHlwZTtcclxuICAgIH1cclxuICAgIHRoaXMuZXZlbnRUeXBlLmVtaXQodGhpcy50eXBlKTtcclxuICB9XHJcblxyXG4gIG9uUXVlcnlUeXBlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmV2ZW50UXVlcnlUeXBlLmVtaXQodGhpcy5zZWxlY3RlZFF1ZXJ5VHlwZSk7XHJcbiAgfVxyXG5cclxuICBvblpvbmVDaGFuZ2UoZmVhdHVyZSkge1xyXG4gICAgdGhpcy56b25lQ2hhbmdlLmVtaXQoZmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICBvbkRyYXdUeXBlQ2hhbmdlKHNwYXRpYWxUeXBlOiBTcGF0aWFsRmlsdGVyVHlwZSkge1xyXG4gICAgdGhpcy5hY3RpdmVEcmF3VHlwZSA9IHNwYXRpYWxUeXBlO1xyXG4gICAgdGhpcy5ldmVudFR5cGUuZW1pdCh0aGlzLmFjdGl2ZURyYXdUeXBlKTtcclxuICB9XHJcbn1cclxuIl19