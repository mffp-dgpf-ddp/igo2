import { EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MeasureType, MeasureAreaUnit, MeasureLengthUnit } from '../shared/measure.enum';
/**
 * Measurer item
 */
export declare class MeasurerItemComponent implements OnDestroy {
    /**
     * Measure observable
     * @internal
     */
    measure$: BehaviorSubject<number>;
    /**
     * Subscription to the measure observable when the auto mode is on
     * @internal
     */
    measure$$: Subscription;
    /**
     * Measure type
     */
    measureType: MeasureType;
    /**
     * Measure unit
     */
    measureUnit: MeasureAreaUnit | MeasureLengthUnit;
    /**
     * Measure
     */
    measure: number;
    /**
     * Whther measure units should be automatically determined
     */
    auto: boolean;
    private _auto;
    /**
     * Placeholder
     */
    placeholder: string;
    /**
     * Event emitted when the measure unit changes
     */
    measureUnitChange: EventEmitter<MeasureLengthUnit | MeasureAreaUnit>;
    /**
     * Available measure units for the measure type given
     * @internal
     */
    readonly measureUnits: string[];
    constructor();
    /**
     * Toggle the auto unit off
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Set the measure unit
     * @internal
     */
    onMeasureUnitChange(unit: MeasureAreaUnit | MeasureLengthUnit): void;
    private toggleAutoUnit;
    private computeBestMeasureUnit;
}
