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
        showFeatureOnMap: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dpZGdldHMvb2djLWZpbHRlci9vZ2MtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7SUF3QkUsNEJBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBWm5DLHFCQUFnQixHQUFZLElBQUksQ0FBQzs7OztRQUtoQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUtwQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUVHLENBQUM7SUFFaEQ7O09BRUc7Ozs7O0lBQ0gsMkNBQWM7Ozs7SUFBZDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILG9DQUFPOzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7O2dCQXRDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsMFNBQTBDO29CQUUxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWJDLGlCQUFpQjs7O3dCQWdCaEIsS0FBSztzQkFFTCxLQUFLO21DQUVMLEtBQUs7MkJBS0wsTUFBTTt5QkFLTixNQUFNOztJQWtCVCx5QkFBQztDQUFBLEFBeENELElBd0NDO1NBbENZLGtCQUFrQjs7O0lBRTdCLG1DQUFzQjs7SUFFdEIsaUNBQXFCOztJQUVyQiw4Q0FBMEM7Ozs7O0lBSzFDLHNDQUE4Qzs7Ozs7SUFLOUMsb0NBQTRDOzs7OztJQUVoQyxtQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPblVwZGF0ZUlucHV0cywgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW9nYy1maWx0ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZ2MtZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZ2MtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE9nY0ZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uVXBkYXRlSW5wdXRzLCBXaWRnZXRDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKSBzaG93RmVhdHVyZU9uTWFwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCBvbiBjb21wbGV0ZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjb21wbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCBvbiBjYW5jZWxcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBPblVwZGF0ZUlucHV0c1xyXG4gICAqL1xyXG4gIG9uVXBkYXRlSW5wdXRzKCkge1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBjbG9zZSwgZW1pdCB0aGUgY2FuY2VsIGV2ZW50XHJcbiAgICovXHJcbiAgb25DbG9zZSgpIHtcclxuICAgIHRoaXMuY2FuY2VsLmVtaXQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==