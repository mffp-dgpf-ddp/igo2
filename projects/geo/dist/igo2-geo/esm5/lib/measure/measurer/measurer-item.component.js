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
var MeasurerItemComponent = /** @class */ (function () {
    function MeasurerItemComponent() {
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
    Object.defineProperty(MeasurerItemComponent.prototype, "measure", {
        get: /**
         * @return {?}
         */
        function () { return this.measure$.value; },
        /**
         * Measure
         */
        set: /**
         * Measure
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.measure$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MeasurerItemComponent.prototype, "auto", {
        get: /**
         * @return {?}
         */
        function () { return this._auto; },
        /**
         * Whther measure units should be automatically determined
         */
        set: /**
         * Whther measure units should be automatically determined
         * @param {?} value
         * @return {?}
         */
        function (value) { this.toggleAutoUnit(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MeasurerItemComponent.prototype, "measureUnits", {
        /**
         * Available measure units for the measure type given
         * @internal
         */
        get: /**
         * Available measure units for the measure type given
         * \@internal
         * @return {?}
         */
        function () {
            if (this.measureType === MeasureType.Area) {
                return Object.values(MeasureAreaUnit);
            }
            return Object.values(MeasureLengthUnit);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the auto unit off
     * @internal
     */
    /**
     * Toggle the auto unit off
     * \@internal
     * @return {?}
     */
    MeasurerItemComponent.prototype.ngOnDestroy = /**
     * Toggle the auto unit off
     * \@internal
     * @return {?}
     */
    function () {
        this.toggleAutoUnit(false);
    };
    /**
     * Set the measure unit
     * @internal
     */
    /**
     * Set the measure unit
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    MeasurerItemComponent.prototype.onMeasureUnitChange = /**
     * Set the measure unit
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.measureUnit = unit;
        this.measureUnitChange.emit(unit);
    };
    /**
     * @private
     * @param {?} toggle
     * @return {?}
     */
    MeasurerItemComponent.prototype.toggleAutoUnit = /**
     * @private
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        var _this = this;
        if (this.measure$$ !== undefined) {
            this.measure$$.unsubscribe();
        }
        if (toggle === true) {
            this.measure$$ = this.measure$.subscribe((/**
             * @param {?} measure
             * @return {?}
             */
            function (measure) {
                _this.computeBestMeasureUnit(measure);
            }));
        }
        this._auto = toggle;
    };
    /**
     * @private
     * @param {?} measure
     * @return {?}
     */
    MeasurerItemComponent.prototype.computeBestMeasureUnit = /**
     * @private
     * @param {?} measure
     * @return {?}
     */
    function (measure) {
        /** @type {?} */
        var measureUnit = this.measureUnit;
        if (this.measureType === MeasureType.Area) {
            measureUnit = computeBestAreaUnit(measure);
        }
        else if (this.measureType === MeasureType.Length) {
            measureUnit = computeBestLengthUnit(measure);
        }
        if (measureUnit !== this.measureUnit) {
            this.onMeasureUnitChange(measureUnit);
        }
    };
    MeasurerItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-measurer-item',
                    template: "<mat-form-field class=\"measure-field\">\r\n  <input\r\n    matInput\r\n    [readonly]=\"true\"\r\n    [placeholder]=\"placeholder\"\r\n    [value]=\"((measure$ | async) || 0) | measureFormat: measureUnit\">\r\n</mat-form-field>\r\n<mat-form-field class=\"unit-field\">\r\n  <mat-select\r\n    [value]=\"measureUnit\"\r\n    [disabled]=\"auto\"\r\n    (selectionChange)=\"onMeasureUnitChange($event.value)\">\r\n    <mat-option *ngFor=\"let measureUnit of measureUnits\" [value]=\"measureUnit\">\r\n      {{('igo.geo.measure.' + measureUnit) | translate}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:-webkit-box;display:flex;width:100%;padding:5px 10px}.measure-field{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-flow:column nowrap;width:100%}.unit-field{width:110px;margin-left:10px}"]
                }] }
    ];
    /** @nocollapse */
    MeasurerItemComponent.ctorParameters = function () { return []; };
    MeasurerItemComponent.propDecorators = {
        measureType: [{ type: Input }],
        measureUnit: [{ type: Input }],
        measure: [{ type: Input }],
        auto: [{ type: Input }],
        placeholder: [{ type: Input }],
        measureUnitChange: [{ type: Output }]
    };
    return MeasurerItemComponent;
}());
export { MeasurerItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWVhc3VyZS9tZWFzdXJlci9tZWFzdXJlci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFckQsT0FBTyxFQUNMLFdBQVcsRUFDWCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFLckY7SUFvRUU7Ozs7O1FBeERPLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFpQ2xFLFVBQUssR0FBWSxLQUFLLENBQUM7Ozs7UUFVckIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQXVDLENBQUM7SUFhdkUsQ0FBQztJQW5DaEIsc0JBQ0ksMENBQU87Ozs7UUFHWCxjQUF3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQVByRDs7V0FFRzs7Ozs7O1FBQ0gsVUFDWSxLQUFhO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBTUQsc0JBQ0ksdUNBQUk7Ozs7UUFDUixjQUFzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBTDFDOztXQUVHOzs7Ozs7UUFDSCxVQUNTLEtBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFrQnhELHNCQUFJLCtDQUFZO1FBSmhCOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDekMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFJRDs7O09BR0c7Ozs7OztJQUNILDJDQUFXOzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsbURBQW1COzs7Ozs7SUFBbkIsVUFBb0IsSUFBeUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFTyw4Q0FBYzs7Ozs7SUFBdEIsVUFBdUIsTUFBZTtRQUF0QyxpQkFVQztRQVRDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM5QjtRQUNELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsT0FBZTtnQkFDdkQsS0FBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFFTyxzREFBc0I7Ozs7O0lBQTlCLFVBQStCLE9BQWU7O1lBQ3hDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztRQUNsQyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtZQUN6QyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUNsRCxXQUFXLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLFdBQVcsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7O2dCQTdHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0Isd25CQUE2QztvQkFFN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7OEJBa0JFLEtBQUs7OEJBS0wsS0FBSzswQkFLTCxLQUFLO3VCQVNMLEtBQUs7OEJBUUwsS0FBSztvQ0FLTCxNQUFNOztJQXVEVCw0QkFBQztDQUFBLEFBOUdELElBOEdDO1NBeEdZLHFCQUFxQjs7Ozs7OztJQU1oQyx5Q0FBMEU7Ozs7OztJQU0xRSwwQ0FBK0I7Ozs7O0lBSy9CLDRDQUFrQzs7Ozs7SUFLbEMsNENBQTBEOzs7OztJQWlCMUQsc0NBQStCOzs7OztJQUsvQiw0Q0FBNkI7Ozs7O0lBSzdCLGtEQUFzRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBNZWFzdXJlVHlwZSxcclxuICBNZWFzdXJlQXJlYVVuaXQsXHJcbiAgTWVhc3VyZUxlbmd0aFVuaXRcclxufSBmcm9tICcuLi9zaGFyZWQvbWVhc3VyZS5lbnVtJztcclxuaW1wb3J0IHsgY29tcHV0ZUJlc3RBcmVhVW5pdCwgY29tcHV0ZUJlc3RMZW5ndGhVbml0IH0gZnJvbSAnLi4vc2hhcmVkL21lYXN1cmUudXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIE1lYXN1cmVyIGl0ZW1cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1lYXN1cmVyLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tZWFzdXJlci1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tZWFzdXJlci1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lYXN1cmVySXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lYXN1cmUgb2JzZXJ2YWJsZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtZWFzdXJlJDogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgbWVhc3VyZSBvYnNlcnZhYmxlIHdoZW4gdGhlIGF1dG8gbW9kZSBpcyBvblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBtZWFzdXJlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWVhc3VyZSB0eXBlXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVhc3VyZVR5cGU6IE1lYXN1cmVUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBNZWFzdXJlIHVuaXRcclxuICAgKi9cclxuICBASW5wdXQoKSBtZWFzdXJlVW5pdDogTWVhc3VyZUFyZWFVbml0IHwgTWVhc3VyZUxlbmd0aFVuaXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lYXN1cmVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBtZWFzdXJlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMubWVhc3VyZSQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBtZWFzdXJlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1lYXN1cmUkLnZhbHVlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdodGhlciBtZWFzdXJlIHVuaXRzIHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGRldGVybWluZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBhdXRvKHZhbHVlOiBib29sZWFuKSB7IHRoaXMudG9nZ2xlQXV0b1VuaXQodmFsdWUpOyB9XHJcbiAgZ2V0IGF1dG8oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hdXRvOyB9XHJcbiAgcHJpdmF0ZSBfYXV0bzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBQbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgbWVhc3VyZSB1bml0IGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWVhc3VyZVVuaXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1lYXN1cmVBcmVhVW5pdCB8IE1lYXN1cmVMZW5ndGhVbml0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBdmFpbGFibGUgbWVhc3VyZSB1bml0cyBmb3IgdGhlIG1lYXN1cmUgdHlwZSBnaXZlblxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBtZWFzdXJlVW5pdHMoKTogc3RyaW5nW10ge1xyXG4gICAgaWYgKHRoaXMubWVhc3VyZVR5cGUgPT09IE1lYXN1cmVUeXBlLkFyZWEpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoTWVhc3VyZUFyZWFVbml0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKE1lYXN1cmVMZW5ndGhVbml0KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIHRoZSBhdXRvIHVuaXQgb2ZmXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnRvZ2dsZUF1dG9Vbml0KGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgbWVhc3VyZSB1bml0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25NZWFzdXJlVW5pdENoYW5nZSh1bml0OiBNZWFzdXJlQXJlYVVuaXQgfCBNZWFzdXJlTGVuZ3RoVW5pdCkge1xyXG4gICAgdGhpcy5tZWFzdXJlVW5pdCA9IHVuaXQ7XHJcbiAgICB0aGlzLm1lYXN1cmVVbml0Q2hhbmdlLmVtaXQodW5pdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZUF1dG9Vbml0KHRvZ2dsZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMubWVhc3VyZSQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tZWFzdXJlJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0b2dnbGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5tZWFzdXJlJCQgPSB0aGlzLm1lYXN1cmUkLnN1YnNjcmliZSgobWVhc3VyZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb21wdXRlQmVzdE1lYXN1cmVVbml0KG1lYXN1cmUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2F1dG8gPSB0b2dnbGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVCZXN0TWVhc3VyZVVuaXQobWVhc3VyZTogbnVtYmVyKSB7XHJcbiAgICBsZXQgbWVhc3VyZVVuaXQgPSB0aGlzLm1lYXN1cmVVbml0O1xyXG4gICAgaWYgKHRoaXMubWVhc3VyZVR5cGUgPT09IE1lYXN1cmVUeXBlLkFyZWEpIHtcclxuICAgICAgbWVhc3VyZVVuaXQgPSBjb21wdXRlQmVzdEFyZWFVbml0KG1lYXN1cmUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm1lYXN1cmVUeXBlID09PSBNZWFzdXJlVHlwZS5MZW5ndGgpIHtcclxuICAgICAgbWVhc3VyZVVuaXQgPSBjb21wdXRlQmVzdExlbmd0aFVuaXQobWVhc3VyZSk7XHJcbiAgICB9XHJcbiAgICBpZiAobWVhc3VyZVVuaXQgIT09IHRoaXMubWVhc3VyZVVuaXQpIHtcclxuICAgICAgdGhpcy5vbk1lYXN1cmVVbml0Q2hhbmdlKG1lYXN1cmVVbml0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19