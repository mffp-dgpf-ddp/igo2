/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Layer } from '../../../layer/shared/layers/layer';
import { IgoMap } from '../../../map/shared/map';
export class OgcFilterComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.showFeatureOnMap = true;
        /**
         * Event emitted on complete
         */
        this.complete = new EventEmitter();
        /**
         * Event emitted on cancel
         */
        this.cancel = new EventEmitter();
    }
    /**
     * Implemented as part of OnUpdateInputs
     * @return {?}
     */
    onUpdateInputs() {
        this.cdRef.detectChanges();
    }
    /**
     * On close, emit the cancel event
     * @return {?}
     */
    onClose() {
        this.cancel.emit();
    }
}
OgcFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter',
                template: "<igo-ogc-filterable-item\r\n  [layer]=\"layer\" \r\n  [map]=\"map\" >\r\n</igo-ogc-filterable-item>\r\n\r\n<div>\r\n  <button\r\n    mat-button\r\n    type=\"button\"\r\n    (click)=\"onClose()\">\r\n    {{ 'igo.geo.workspace.ogcFilter.close' | translate }}\r\n  </button>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
OgcFilterComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OgcFilterComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    showFeatureOnMap: [{ type: Input }],
    complete: [{ type: Output }],
    cancel: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    OgcFilterComponent.prototype.layer;
    /** @type {?} */
    OgcFilterComponent.prototype.map;
    /** @type {?} */
    OgcFilterComponent.prototype.showFeatureOnMap;
    /**
     * Event emitted on complete
     * @type {?}
     */
    OgcFilterComponent.prototype.complete;
    /**
     * Event emitted on cancel
     * @type {?}
     */
    OgcFilterComponent.prototype.cancel;
    /**
     * @type {?}
     * @private
     */
    OgcFilterComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dpZGdldHMvb2djLWZpbHRlci9vZ2MtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRakQsTUFBTSxPQUFPLGtCQUFrQjs7OztJQWtCN0IsWUFBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFabkMscUJBQWdCLEdBQVksSUFBSSxDQUFDOzs7O1FBS2hDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDOzs7O1FBS3BDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRUcsQ0FBQzs7Ozs7SUFLaEQsY0FBYztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFLRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDBTQUEwQztnQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBYkMsaUJBQWlCOzs7b0JBZ0JoQixLQUFLO2tCQUVMLEtBQUs7K0JBRUwsS0FBSzt1QkFLTCxNQUFNO3FCQUtOLE1BQU07Ozs7SUFkUCxtQ0FBc0I7O0lBRXRCLGlDQUFxQjs7SUFFckIsOENBQTBDOzs7OztJQUsxQyxzQ0FBOEM7Ozs7O0lBSzlDLG9DQUE0Qzs7Ozs7SUFFaEMsbUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT25VcGRhdGVJbnB1dHMsIFdpZGdldENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPblVwZGF0ZUlucHV0cywgV2lkZ2V0Q29tcG9uZW50IHtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KCkgc2hvd0ZlYXR1cmVPbk1hcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgb24gY29tcGxldGVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgb24gY2FuY2VsXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgT25VcGRhdGVJbnB1dHNcclxuICAgKi9cclxuICBvblVwZGF0ZUlucHV0cygpIHtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gY2xvc2UsIGVtaXQgdGhlIGNhbmNlbCBldmVudFxyXG4gICAqL1xyXG4gIG9uQ2xvc2UoKSB7XHJcbiAgICB0aGlzLmNhbmNlbC5lbWl0KCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=