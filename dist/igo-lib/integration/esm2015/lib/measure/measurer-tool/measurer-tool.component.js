/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolComponent } from '@igo2/common';
import { MapState } from '../../map/map.state';
import { MeasureState } from '../measure.state';
/**
 * Tool to measure lengths and areas
 */
let MeasurerToolComponent = /**
 * Tool to measure lengths and areas
 */
class MeasurerToolComponent {
    /**
     * @param {?} measureState
     * @param {?} mapState
     */
    constructor(measureState, mapState) {
        this.measureState = measureState;
        this.mapState = mapState;
    }
    /**
     * Map to measure on
     * \@internal
     * @return {?}
     */
    get store() { return this.measureState.store; }
    /**
     * Map to measure on
     * \@internal
     * @return {?}
     */
    get map() { return this.mapState.map; }
};
MeasurerToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer-tool',
                template: "<igo-measurer [store]=\"store\" [map]=\"map\"></igo-measurer>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MeasurerToolComponent.ctorParameters = () => [
    { type: MeasureState },
    { type: MapState }
];
/**
 * Tool to measure lengths and areas
 */
MeasurerToolComponent = tslib_1.__decorate([
    ToolComponent({
        name: 'measurer',
        title: 'igo.integration.tools.measurer',
        icon: 'ruler'
    }),
    tslib_1.__metadata("design:paramtypes", [MeasureState,
        MapState])
], MeasurerToolComponent);
export { MeasurerToolComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MeasurerToolComponent.prototype.measureState;
    /**
     * @type {?}
     * @private
     */
    MeasurerToolComponent.prototype.mapState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXItdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9tZWFzdXJlL21lYXN1cmVyLXRvb2wvbWVhc3VyZXItdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7SUFlbkMscUJBQXFCOzs7TUFBckIscUJBQXFCOzs7OztJQWNoQyxZQUNVLFlBQTBCLEVBQzFCLFFBQWtCO1FBRGxCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQzs7Ozs7O0lBWEosSUFBSSxLQUFLLEtBQXVDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFNakYsSUFBSSxHQUFHLEtBQWEsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FPaEQsQ0FBQTs7WUF4QkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDZFQUE2QztnQkFDN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFkUSxZQUFZO1lBRFosUUFBUTs7Ozs7QUFnQkoscUJBQXFCO0lBVmpDLGFBQWEsQ0FBQztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxnQ0FBZ0M7UUFDdkMsSUFBSSxFQUFFLE9BQU87S0FDZCxDQUFDOzZDQXFCd0IsWUFBWTtRQUNoQixRQUFRO0dBaEJqQixxQkFBcUIsQ0FtQmpDO1NBbkJZLHFCQUFxQjs7Ozs7O0lBZTlCLDZDQUFrQzs7Ozs7SUFDbEMseUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUsIEZlYXR1cmVXaXRoTWVhc3VyZSwgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuaW1wb3J0IHsgTWFwU3RhdGUgfSBmcm9tICcuLi8uLi9tYXAvbWFwLnN0YXRlJztcclxuaW1wb3J0IHsgTWVhc3VyZVN0YXRlIH0gZnJvbSAnLi4vbWVhc3VyZS5zdGF0ZSc7XHJcblxyXG4vKipcclxuICogVG9vbCB0byBtZWFzdXJlIGxlbmd0aHMgYW5kIGFyZWFzXHJcbiAqL1xyXG5AVG9vbENvbXBvbmVudCh7XHJcbiAgbmFtZTogJ21lYXN1cmVyJyxcclxuICB0aXRsZTogJ2lnby5pbnRlZ3JhdGlvbi50b29scy5tZWFzdXJlcicsXHJcbiAgaWNvbjogJ3J1bGVyJ1xyXG59KVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1tZWFzdXJlci10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWVhc3VyZXItdG9vbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lYXN1cmVyVG9vbENvbXBvbmVudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBtZWFzdXJlIG9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHN0b3JlKCk6IEZlYXR1cmVTdG9yZTxGZWF0dXJlV2l0aE1lYXN1cmU+IHsgcmV0dXJuIHRoaXMubWVhc3VyZVN0YXRlLnN0b3JlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCB0byBtZWFzdXJlIG9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAgeyByZXR1cm4gdGhpcy5tYXBTdGF0ZS5tYXA7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lYXN1cmVTdGF0ZTogTWVhc3VyZVN0YXRlLFxyXG4gICAgcHJpdmF0ZSBtYXBTdGF0ZTogTWFwU3RhdGVcclxuICApIHt9XHJcblxyXG59XHJcbiJdfQ==