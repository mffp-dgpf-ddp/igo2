import { OnInit, EventEmitter } from '@angular/core';
import { TimeFilterOptions } from '../shared/time-filter.interface';
export declare class TimeFilterFormComponent implements OnInit {
    options: TimeFilterOptions;
    private _options;
    date: Date;
    startDate: Date;
    endDate: Date;
    year: any;
    startYear: any;
    endYear: any;
    initStartYear: any;
    initEndYear: any;
    listYears: Array<string>;
    startListYears: Array<string>;
    endListYears: Array<string>;
    currentValue: string;
    interval: any;
    playIcon: string;
    change: EventEmitter<Date | [Date, Date]>;
    yearChange: EventEmitter<string | [string, string]>;
    mySlider: any;
    readonly type: 'date' | 'time' | 'datetime' | 'year';
    readonly isRange: boolean;
    readonly style: string;
    readonly step: number;
    readonly timeInterval: number;
    readonly min: Date;
    readonly max: Date;
    readonly is: boolean;
    constructor();
    ngOnInit(): void;
    handleDateChange(event: any): void;
    handleYearChange(event: any): void;
    handleListYearChange(event: any): void;
    handleListYearStartChange(event: any): void;
    dateToNumber(date: Date): number;
    setSliderThumbLabel(label: string): void;
    findThumbLabel(test: any[]): any;
    playFilter(event: any): void;
    stopFilter(): void;
    handleSliderDateChange(event: any): void;
    handleSliderValue(): number;
    handleSliderTooltip(): string;
    setupDateOutput(): void;
    applyTypeChange(): void;
    getRangeMinDate(): Date;
    getRangeMaxDate(): Date;
    /**
     * Round date at a certain time, 10 minutes by Default
     * @param date - Date to Round
     * @param atMinute - round to closest 'atMinute' minute, rounded 10 by default
     * @return the rounded date
     */
    getRoundedDate(date: any, atMinute?: number): Date;
    /**
     * Get the step (period) definition from the layer dimension tag
     * @param step The step as ISO 8601 example: PT10M for 10 Minutes
     * @return the duration in milliseconds
     */
    getStepDefinition(step: any): number;
}
