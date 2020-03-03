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
    complete: [{ type: Output }],
    cancel: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2djLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dpZGdldHMvb2djLWZpbHRlci9vZ2MtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRakQsTUFBTSxPQUFPLGtCQUFrQjs7OztJQWdCN0IsWUFBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7Ozs7UUFQbEMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7Ozs7UUFLcEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFFRyxDQUFDOzs7OztJQUtoRCxjQUFjO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUtELE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7OztZQXBDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsMFNBQTBDO2dCQUUxQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFiQyxpQkFBaUI7OztvQkFnQmhCLEtBQUs7a0JBRUwsS0FBSzt1QkFLTCxNQUFNO3FCQUtOLE1BQU07Ozs7SUFaUCxtQ0FBc0I7O0lBRXRCLGlDQUFxQjs7Ozs7SUFLckIsc0NBQThDOzs7OztJQUs5QyxvQ0FBNEM7Ozs7O0lBRWhDLG1DQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9uVXBkYXRlSW5wdXRzLCBXaWRnZXRDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tb2djLWZpbHRlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29nYy1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29nYy1maWx0ZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2djRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25VcGRhdGVJbnB1dHMsIFdpZGdldENvbXBvbmVudCB7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgb24gY29tcGxldGVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgb24gY2FuY2VsXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgT25VcGRhdGVJbnB1dHNcclxuICAgKi9cclxuICBvblVwZGF0ZUlucHV0cygpIHtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gY2xvc2UsIGVtaXQgdGhlIGNhbmNlbCBldmVudFxyXG4gICAqL1xyXG4gIG9uQ2xvc2UoKSB7XHJcbiAgICB0aGlzLmNhbmNlbC5lbWl0KCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=