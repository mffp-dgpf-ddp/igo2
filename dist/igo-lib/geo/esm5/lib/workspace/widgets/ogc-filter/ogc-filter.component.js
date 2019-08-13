/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Layer } from '../../../layer/shared/layers/layer';
import { IgoMap } from '../../../map/shared/map';
var OgcFilterComponent = /** @class */ (function () {
    function OgcFilterComponent(cdRef) {
        this.cdRef = cdRef;
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
     */
    /**
     * Implemented as part of OnUpdateInputs
     * @return {?}
     */
    OgcFilterComponent.prototype.onUpdateInputs = /**
     * Implemented as part of OnUpdateInputs
     * @return {?}
     */
    function () {
        this.cdRef.detectChanges();
    };
    /**
     * On close, emit the cancel event
     */
    /**
     * On close, emit the cancel event
     * @return {?}
     */
    OgcFilterComponent.prototype.onClose = /**
     * On close, emit the cancel event
     * @return {?}
     */
    function () {
        this.cancel.emit();
    };
    OgcFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-ogc-filter',
                    template: "<igo-ogc-filterable-item\r\n  [layer]=\"layer\" \r\n  [map]=\"map\" >\r\n</igo-ogc-filterable-item>\r\n\r\n<div>\r\n  <button\r\n    mat-button\r\n    type=\"button\"\r\n    (click)=\"onClose()\">\r\n    {{ 'igo.geo.workspace.ogcFilter.close' | translate }}\r\n  </button>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OgcFilterComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    OgcFilterComponent.propDecorators = {
        layer: [{ type: Input }],
        map: [{ type: Input }],
        complete: [{ type: Output }],
        cancel: [{ type: Output }]
    };
    return OgcFilterComponent;
}());
export { OgcFilterComponent };
if (false) {
    /** @type {?} */
    OgcFilterComponent.prototype.layer;
    /** @type {?} */
    OgcFilterComponent.prototype.map;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dpZGdldHMvb2djLWZpbHRlci9vZ2MtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7SUFzQkUsNEJBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1COzs7O1FBUGxDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDOzs7O1FBS3BDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRUcsQ0FBQztJQUVoRDs7T0FFRzs7Ozs7SUFDSCwyQ0FBYzs7OztJQUFkO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsb0NBQU87Ozs7SUFBUDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQiwwU0FBMEM7b0JBRTFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBYkMsaUJBQWlCOzs7d0JBZ0JoQixLQUFLO3NCQUVMLEtBQUs7MkJBS0wsTUFBTTt5QkFLTixNQUFNOztJQWtCVCx5QkFBQztDQUFBLEFBdENELElBc0NDO1NBaENZLGtCQUFrQjs7O0lBRTdCLG1DQUFzQjs7SUFFdEIsaUNBQXFCOzs7OztJQUtyQixzQ0FBOEM7Ozs7O0lBSzlDLG9DQUE0Qzs7Ozs7SUFFaEMsbUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgT25VcGRhdGVJbnB1dHMsIFdpZGdldENvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1vZ2MtZmlsdGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2djLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2djLWZpbHRlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZ2NGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPblVwZGF0ZUlucHV0cywgV2lkZ2V0Q29tcG9uZW50IHtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCBvbiBjb21wbGV0ZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCBvbiBjYW5jZWxcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBPblVwZGF0ZUlucHV0c1xyXG4gICAqL1xyXG4gIG9uVXBkYXRlSW5wdXRzKCkge1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBjbG9zZSwgZW1pdCB0aGUgY2FuY2VsIGV2ZW50XHJcbiAgICovXHJcbiAgb25DbG9zZSgpIHtcclxuICAgIHRoaXMuY2FuY2VsLmVtaXQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==