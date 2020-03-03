/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MeasureType, MeasureAreaUnit, MeasureLengthUnit } from '../shared/measure.enum';
import { computeBestAreaUnit, computeBestLengthUnit } from '../shared/measure.utils';
/**
 * Measurer item
 */
export class MeasurerItemComponent {
    constructor() {
        /**
         * Measure observable
         * \@internal
         */
        this.measure$ = new BehaviorSubject(undefined);
        this._auto = false;
        /**
         * Event emitted when the measure unit changes
         */
        this.measureUnitChange = new EventEmitter();
    }
    /**
     * Measure
     * @param {?} value
     * @return {?}
     */
    set measure(value) {
        this.measure$.next(value);
    }
    /**
     * @return {?}
     */
    get measure() { return this.measure$.value; }
    /**
     * Whther measure units should be automatically determined
     * @param {?} value
     * @return {?}
     */
    set auto(value) { this.toggleAutoUnit(value); }
    /**
     * @return {?}
     */
    get auto() { return this._auto; }
    /**
     * Available measure units for the measure type given
     * \@internal
     * @return {?}
     */
    get measureUnits() {
        if (this.measureType === MeasureType.Area) {
            return Object.values(MeasureAreaUnit);
        }
        return Object.values(MeasureLengthUnit);
    }
    /**
     * Toggle the auto unit off
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.toggleAutoUnit(false);
    }
    /**
     * Set the measure unit
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    onMeasureUnitChange(unit) {
        this.measureUnit = unit;
        this.measureUnitChange.emit(unit);
    }
    /**
     * @private
     * @param {?} toggle
     * @return {?}
     */
    toggleAutoUnit(toggle) {
        if (this.measure$$ !== undefined) {
            this.measure$$.unsubscribe();
        }
        if (toggle === true) {
            this.measure$$ = this.measure$.subscribe((/**
             * @param {?} measure
             * @return {?}
             */
            (measure) => {
                this.computeBestMeasureUnit(measure);
            }));
        }
        this._auto = toggle;
    }
    /**
     * @private
     * @param {?} measure
     * @return {?}
     */
    computeBestMeasureUnit(measure) {
        /** @type {?} */
        let measureUnit = this.measureUnit;
        if (this.measureType === MeasureType.Area) {
            measureUnit = computeBestAreaUnit(measure);
        }
        else if (this.measureType === MeasureType.Length) {
            measureUnit = computeBestLengthUnit(measure);
        }
        if (measureUnit !== this.measureUnit) {
            this.onMeasureUnitChange(measureUnit);
        }
    }
}
MeasurerItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer-item',
                template: "<mat-form-field class=\"measure-field\">\r\n  <input\r\n    matInput\r\n    [readonly]=\"true\"\r\n    [placeholder]=\"placeholder\"\r\n    [value]=\"((measure$ | async) || 0) | measureFormat: measureUnit\">\r\n</mat-form-field>\r\n<mat-form-field class=\"unit-field\">\r\n  <mat-select\r\n    [value]=\"measureUnit\"\r\n    [disabled]=\"auto\"\r\n    (selectionChange)=\"onMeasureUnitChange($event.value)\">\r\n    <mat-option *ngFor=\"let measureUnit of measureUnits\" [value]=\"measureUnit\">\r\n      {{('igo.geo.measure.' + measureUnit) | translate}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:-webkit-box;display:flex;width:100%;padding:5px 10px}.measure-field{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-flow:column nowrap;width:100%}.unit-field{width:110px;margin-left:10px}"]
            }] }
];
/** @nocollapse */
MeasurerItemComponent.ctorParameters = () => [];
MeasurerItemComponent.propDecorators = {
    measureType: [{ type: Input }],
    measureUnit: [{ type: Input }],
    measure: [{ type: Input }],
    auto: [{ type: Input }],
    placeholder: [{ type: Input }],
    measureUnitChange: [{ type: Output }]
};
if (false) {
    /**
     * Measure observable
     * \@internal
     * @type {?}
     */
    MeasurerItemComponent.prototype.measure$;
    /**
     * Subscription to the measure observable when the auto mode is on
     * \@internal
     * @type {?}
     */
    MeasurerItemComponent.prototype.measure$$;
    /**
     * Measure type
     * @type {?}
     */
    MeasurerItemComponent.prototype.measureType;
    /**
     * Measure unit
     * @type {?}
     */
    MeasurerItemComponent.prototype.measureUnit;
    /**
     * @type {?}
     * @private
     */
    MeasurerItemComponent.prototype._auto;
    /**
     * Placeholder
     * @type {?}
     */
    MeasurerItemComponent.prototype.placeholder;
    /**
     * Event emitted when the measure unit changes
     * @type {?}
     */
    MeasurerItemComponent.prototype.measureUnitChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWVhc3VyZS9tZWFzdXJlci9tZWFzdXJlci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUNMLFdBQVcsRUFDWCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFXckYsTUFBTSxPQUFPLHFCQUFxQjtJQThEaEM7Ozs7O1FBeERPLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFpQ2xFLFVBQUssR0FBWSxLQUFLLENBQUM7Ozs7UUFVckIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQXVDLENBQUM7SUFhdkUsQ0FBQzs7Ozs7O0lBbkNoQixJQUNJLE9BQU8sQ0FBQyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFDRCxJQUFJLE9BQU8sS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBS3JELElBQ0ksSUFBSSxDQUFDLEtBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUN4RCxJQUFJLElBQUksS0FBYyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFpQjFDLElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3pDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN2QztRQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQVFELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7SUFNRCxtQkFBbUIsQ0FBQyxJQUF5QztRQUMzRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxNQUFlO1FBQ3BDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM5QjtRQUNELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7OztZQUFDLENBQUMsT0FBZSxFQUFFLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQzs7Ozs7O0lBRU8sc0JBQXNCLENBQUMsT0FBZTs7WUFDeEMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXO1FBQ2xDLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3pDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ2xELFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7O1lBN0dGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qix3bkJBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7OzBCQWtCRSxLQUFLOzBCQUtMLEtBQUs7c0JBS0wsS0FBSzttQkFTTCxLQUFLOzBCQVFMLEtBQUs7Z0NBS0wsTUFBTTs7Ozs7Ozs7SUEzQ1AseUNBQTBFOzs7Ozs7SUFNMUUsMENBQStCOzs7OztJQUsvQiw0Q0FBa0M7Ozs7O0lBS2xDLDRDQUEwRDs7Ozs7SUFpQjFELHNDQUErQjs7Ozs7SUFLL0IsNENBQTZCOzs7OztJQUs3QixrREFBc0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWVhc3VyZVR5cGUsXHJcbiAgTWVhc3VyZUFyZWFVbml0LFxyXG4gIE1lYXN1cmVMZW5ndGhVbml0XHJcbn0gZnJvbSAnLi4vc2hhcmVkL21lYXN1cmUuZW51bSc7XHJcbmltcG9ydCB7IGNvbXB1dGVCZXN0QXJlYVVuaXQsIGNvbXB1dGVCZXN0TGVuZ3RoVW5pdCB9IGZyb20gJy4uL3NoYXJlZC9tZWFzdXJlLnV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBNZWFzdXJlciBpdGVtXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1tZWFzdXJlci1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWVhc3VyZXItaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWVhc3VyZXItaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWFzdXJlckl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBNZWFzdXJlIG9ic2VydmFibGVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgbWVhc3VyZSQ6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIG1lYXN1cmUgb2JzZXJ2YWJsZSB3aGVuIHRoZSBhdXRvIG1vZGUgaXMgb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgbWVhc3VyZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lYXN1cmUgdHlwZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1lYXN1cmVUeXBlOiBNZWFzdXJlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWVhc3VyZSB1bml0XHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVhc3VyZVVuaXQ6IE1lYXN1cmVBcmVhVW5pdCB8IE1lYXN1cmVMZW5ndGhVbml0O1xyXG5cclxuICAvKipcclxuICAgKiBNZWFzdXJlXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgbWVhc3VyZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm1lYXN1cmUkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgbWVhc3VyZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5tZWFzdXJlJC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBXaHRoZXIgbWVhc3VyZSB1bml0cyBzaG91bGQgYmUgYXV0b21hdGljYWxseSBkZXRlcm1pbmVkXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgYXV0byh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLnRvZ2dsZUF1dG9Vbml0KHZhbHVlKTsgfVxyXG4gIGdldCBhdXRvKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYXV0bzsgfVxyXG4gIHByaXZhdGUgX2F1dG86IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIG1lYXN1cmUgdW5pdCBjaGFuZ2VzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1lYXN1cmVVbml0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNZWFzdXJlQXJlYVVuaXQgfCBNZWFzdXJlTGVuZ3RoVW5pdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQXZhaWxhYmxlIG1lYXN1cmUgdW5pdHMgZm9yIHRoZSBtZWFzdXJlIHR5cGUgZ2l2ZW5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWVhc3VyZVVuaXRzKCk6IHN0cmluZ1tdIHtcclxuICAgIGlmICh0aGlzLm1lYXN1cmVUeXBlID09PSBNZWFzdXJlVHlwZS5BcmVhKSB7XHJcbiAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKE1lYXN1cmVBcmVhVW5pdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhNZWFzdXJlTGVuZ3RoVW5pdCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSB0aGUgYXV0byB1bml0IG9mZlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy50b2dnbGVBdXRvVW5pdChmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIG1lYXN1cmUgdW5pdFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uTWVhc3VyZVVuaXRDaGFuZ2UodW5pdDogTWVhc3VyZUFyZWFVbml0IHwgTWVhc3VyZUxlbmd0aFVuaXQpIHtcclxuICAgIHRoaXMubWVhc3VyZVVuaXQgPSB1bml0O1xyXG4gICAgdGhpcy5tZWFzdXJlVW5pdENoYW5nZS5lbWl0KHVuaXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVBdXRvVW5pdCh0b2dnbGU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLm1lYXN1cmUkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWVhc3VyZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodG9nZ2xlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubWVhc3VyZSQkID0gdGhpcy5tZWFzdXJlJC5zdWJzY3JpYmUoKG1lYXN1cmU6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuY29tcHV0ZUJlc3RNZWFzdXJlVW5pdChtZWFzdXJlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hdXRvID0gdG9nZ2xlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlQmVzdE1lYXN1cmVVbml0KG1lYXN1cmU6IG51bWJlcikge1xyXG4gICAgbGV0IG1lYXN1cmVVbml0ID0gdGhpcy5tZWFzdXJlVW5pdDtcclxuICAgIGlmICh0aGlzLm1lYXN1cmVUeXBlID09PSBNZWFzdXJlVHlwZS5BcmVhKSB7XHJcbiAgICAgIG1lYXN1cmVVbml0ID0gY29tcHV0ZUJlc3RBcmVhVW5pdChtZWFzdXJlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5tZWFzdXJlVHlwZSA9PT0gTWVhc3VyZVR5cGUuTGVuZ3RoKSB7XHJcbiAgICAgIG1lYXN1cmVVbml0ID0gY29tcHV0ZUJlc3RMZW5ndGhVbml0KG1lYXN1cmUpO1xyXG4gICAgfVxyXG4gICAgaWYgKG1lYXN1cmVVbml0ICE9PSB0aGlzLm1lYXN1cmVVbml0KSB7XHJcbiAgICAgIHRoaXMub25NZWFzdXJlVW5pdENoYW5nZShtZWFzdXJlVW5pdCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==