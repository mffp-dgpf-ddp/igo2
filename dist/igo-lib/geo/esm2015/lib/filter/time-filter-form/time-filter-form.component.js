/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';
import * as moment from 'moment';
export class TimeFilterFormComponent {
    constructor() {
        this.listYears = [];
        this.startListYears = [];
        this.endListYears = [];
        this.playIcon = 'play_circle_filled';
        this.change = new EventEmitter();
        this.yearChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentValue(value) {
        if (value) {
            if (this.type !== 'year') {
                /** @type {?} */
                const valueArray = value.split('/');
                if (valueArray.length > 0) {
                    /** @type {?} */
                    const startDate = new Date(valueArray[0]);
                    /** @type {?} */
                    const endDate = new Date(valueArray[1]);
                    if (!isNaN(startDate.valueOf())) {
                        this.startDate = startDate;
                    }
                    if (!isNaN(endDate.valueOf())) {
                        this.endDate = endDate;
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this.options.type === undefined ? 'date' : this.options.type;
    }
    /**
     * @return {?}
     */
    get isRange() {
        return this.options.range === undefined || this.options.style === 'slider'
            ? false
            : this.options.range;
    }
    /**
     * @return {?}
     */
    get style() {
        return this.options.style === undefined ? 'slider' : this.options.style;
    }
    /**
     * @return {?}
     */
    get step() {
        /** @type {?} */
        let step = 10800000;
        if (this.options.step === undefined) {
            switch (this.type) {
                case 'date':
                case 'datetime':
                    step = 10800000;
                    break;
                case 'time':
                    step = 3600000;
                    break;
                case 'year':
                    step = 31536000000;
                    break;
                default:
                    step = 10800000;
            }
        }
        else {
            step = this.getStepDefinition(this.options.step);
        }
        return step;
    }
    /**
     * @return {?}
     */
    get timeInterval() {
        return this.options.timeInterval === undefined
            ? 2000
            : this.options.timeInterval;
    }
    /**
     * @return {?}
     */
    get min() {
        return this.options.min === undefined
            ? undefined
            : new Date(this.options.min);
    }
    /**
     * @return {?}
     */
    get max() {
        return this.options.max === undefined
            ? undefined
            : new Date(this.options.max);
    }
    /**
     * @return {?}
     */
    get is() {
        return this.options.range === undefined ? false : this.options.range;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.startDate === undefined) {
            /** @type {?} */
            const utcmin = new Date(this.min);
            this.startDate = new Date(utcmin.getTime() + utcmin.getTimezoneOffset() * 60000);
        }
        if (this.endDate === undefined) {
            /** @type {?} */
            const utcmax = new Date(this.max);
            this.endDate = new Date(utcmax.getTime() + utcmax.getTimezoneOffset() * 60000);
        }
        if (this.startYear === undefined) {
            this.startYear = new Date(this.startDate).getFullYear();
            this.initStartYear = this.startYear;
        }
        if (this.endYear === undefined) {
            this.endYear = new Date(this.endDate).getFullYear();
            this.initEndYear = this.endYear;
        }
        if (!this.isRange) {
            for (let i = this.startYear; i <= this.endYear + 1; i++) {
                this.listYears.push(i);
            }
        }
        else {
            for (let i = this.startYear; i < this.endYear; i++) {
                this.startListYears.push(i);
            }
            for (let i = this.startYear + 1; i <= this.endYear; i++) {
                this.endListYears.push(i);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleDateChange(event) {
        this.setupDateOutput();
        this.applyTypeChange();
        // Only if is range, use 2 dates to make the range
        if (this.isRange) {
            this.change.emit([this.startDate, this.endDate]);
        }
        else {
            this.change.emit(this.startDate);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleYearChange(event) {
        if (this.isRange) {
            this.endListYears = [];
            for (let i = this.startYear + 1; i <= this.initEndYear; i++) {
                this.endListYears.push(i);
            }
            this.startListYears = [];
            for (let i = this.initStartYear + 1; i < this.endYear; i++) {
                this.startListYears.push(i);
            }
            this.yearChange.emit([this.startYear, this.endYear]);
        }
        else {
            this.yearChange.emit(this.year);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleListYearChange(event) {
        this.handleYearChange([this.startYear, this.endYear]);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleListYearStartChange(event) {
        this.change.emit([this.startDate, this.endDate]);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    dateToNumber(date) {
        /** @type {?} */
        let newDate;
        if (date) {
            newDate = new Date(date);
        }
        else {
            newDate = new Date(this.min);
        }
        return newDate.getTime();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    setSliderThumbLabel(label) {
        /** @type {?} */
        const thumbLabel = this.findThumbLabel(this.mySlider._elementRef.nativeElement.childNodes);
        if (thumbLabel) {
            thumbLabel.textContent = label;
        }
    }
    /**
     * @param {?} test
     * @return {?}
     */
    findThumbLabel(test) {
        /** @type {?} */
        let thumbLabel;
        test.forEach((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (value.className === 'mat-slider-thumb-label-text') {
                thumbLabel = value;
            }
            if (value.children.length > 0 && !thumbLabel) {
                thumbLabel = this.findThumbLabel(value.childNodes);
            }
        }), this);
        return thumbLabel;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    playFilter(event) {
        if (this.interval) {
            this.stopFilter();
        }
        else {
            this.playIcon = 'pause_circle_filled';
            this.interval = setInterval((/**
             * @param {?} that
             * @return {?}
             */
            (that) => {
                /** @type {?} */
                let newMinDateNumber;
                /** @type {?} */
                const maxDateNumber = new Date(that.max);
                newMinDateNumber =
                    that.date === undefined ? that.min.getTime() : that.date.getTime();
                newMinDateNumber += that.mySlider.step;
                that.date = new Date(newMinDateNumber);
                if (newMinDateNumber > maxDateNumber.getTime()) {
                    that.stopFilter();
                }
                that.handleDateChange({ value: that.date, date: that.date });
            }), this.timeInterval, this);
        }
    }
    /**
     * @return {?}
     */
    stopFilter() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = undefined;
        this.playIcon = 'play_circle_filled';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleSliderDateChange(event) {
        this.date = new Date(event.value);
        this.setSliderThumbLabel(this.handleSliderTooltip());
        this.handleDateChange(event);
    }
    /**
     * @return {?}
     */
    handleSliderValue() {
        if (this.options.current === true || !this.min) {
            /** @type {?} */
            const currentDate = new Date();
            this.date = this.getRoundedDate(currentDate);
        }
        return this.date === undefined ? this.min.getTime() : this.date.getTime();
    }
    /**
     * @return {?}
     */
    handleSliderTooltip() {
        /** @type {?} */
        let label;
        switch (this.type) {
            case 'date':
                label =
                    this.date === undefined
                        ? this.min.toDateString()
                        : this.date.toDateString();
                break;
            case 'time':
                label =
                    this.date === undefined
                        ? this.min.toTimeString()
                        : this.date.toTimeString();
                break;
            // datetime
            default:
                label =
                    this.date === undefined
                        ? this.min.toUTCString()
                        : this.date.toUTCString();
                break;
        }
        return label;
    }
    /**
     * @return {?}
     */
    setupDateOutput() {
        if (this.style === 'slider') {
            this.startDate = new Date(this.date);
            this.startDate.setSeconds(-(this.step / 1000));
            this.endDate = new Date(this.startDate);
            this.endDate.setSeconds(this.step / 1000);
        }
        else if (!this.isRange && !!this.date) {
            this.endDate = new Date(this.date);
            this.startDate = new Date(this.date);
        }
        else if (this.isRange && (!!this.date || !this.date)) {
            this.startDate =
                this.startDate === undefined ? new Date(this.min) : this.startDate;
            this.endDate =
                this.endDate === undefined ? new Date(this.max) : this.endDate;
        }
        else if (!this.date) {
            this.startDate =
                this.startDate === undefined ? new Date(this.min) : this.startDate;
            this.endDate =
                this.endDate === undefined ? new Date(this.max) : this.endDate;
        }
    }
    /**
     * @return {?}
     */
    applyTypeChange() {
        switch (this.type) {
            case 'date':
                if (this.startDate !== undefined || this.endDate !== undefined) {
                    this.startDate.setHours(0);
                    this.startDate.setMinutes(0);
                    this.startDate.setSeconds(0);
                    this.endDate.setHours(23);
                    this.endDate.setMinutes(59);
                    this.endDate.setSeconds(59);
                }
                break;
            case 'time':
                if (this.style === 'calendar') {
                    if (this.startDate.getDay() !== this.min.getDay()) {
                        /** @type {?} */
                        const selectedHour = this.startDate.getHours();
                        /** @type {?} */
                        const selectedMinute = this.startDate.getMinutes();
                        this.startDate = this.min;
                        this.startDate.setHours(selectedHour);
                        this.startDate.setMinutes(selectedMinute);
                    }
                    if (this.endDate.getDay() !== this.min.getDay()) {
                        /** @type {?} */
                        const selectedHour = this.endDate.getHours();
                        /** @type {?} */
                        const selectedMinute = this.endDate.getMinutes();
                        this.endDate = this.min;
                        this.endDate.setHours(selectedHour);
                        this.endDate.setMinutes(selectedMinute);
                    }
                }
                if (!this.isRange && this.step > 60 * 60 * 1000) {
                    this.startDate.setMinutes(0);
                    this.startDate.setSeconds(0);
                    this.endDate.setMinutes(59);
                    this.endDate.setSeconds(59);
                }
                break;
            // datetime
            default:
            // do nothing
        }
    }
    /**
     * @return {?}
     */
    getRangeMinDate() {
        return this.startDate === undefined ? this.min : this.startDate;
    }
    /**
     * @return {?}
     */
    getRangeMaxDate() {
        return this.endDate === undefined ? this.max : this.endDate;
    }
    /**
     * Round date at a certain time, 10 minutes by Default
     * @param {?} date - Date to Round
     * @param {?=} atMinute - round to closest 'atMinute' minute, rounded 10 by default
     * @return {?} the rounded date
     */
    getRoundedDate(date, atMinute = 10) {
        /** @type {?} */
        const coeff = 1000 * 60 * atMinute;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }
    /**
     * Get the step (period) definition from the layer dimension tag
     * @param {?} step The step as ISO 8601 example: PT10M for 10 Minutes
     * @return {?} the duration in milliseconds
     */
    getStepDefinition(step) {
        return moment.duration(step).asMilliseconds();
    }
}
TimeFilterFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-filter-form',
                template: "<!-- <div *ngIf=\"style === 'calendar' && type !=='year'\">\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-form-field>\r\n      <mat-datetimepicker-toggle [for]=\"datetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n      <mat-datetimepicker #datetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n      <input matInput autocomplete=\"false\"\r\n        placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\"\r\n        [matDatetimepicker]=\"datetimePicker\"\r\n        [(ngModel)]=\"date\"\r\n        [min]=\"min\"\r\n        [max]=\"max\"\r\n        readonly=\"readonly\"\r\n        (dateChange)=\"handleDateChange($event)\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"minDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #minDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\"\r\n          [matDatetimepicker]=\"minDatetimePicker\"\r\n          [(ngModel)]=\"startDate\"\r\n          [min]=\"min\"\r\n          [max]=\"getRangeMaxDate()\"\r\n          readonly=\"readonly\"\r\n          (input)=\"startDate\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"maxDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #maxDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\"\r\n          [matDatetimepicker]=\"maxDatetimePicker\"\r\n          [(ngModel)]=\"endDate\"\r\n          [min]=\"getRangeMinDate()\"\r\n          [max]=\"max\"\r\n          readonly=\"readonly\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"style === 'calendar' && type ==='year'\">\r\n\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\" [(ngModel)]=\"year\" (selectionChange)=\"handleYearChange($event)\">\r\n                  <mat-option [value]=\"year\" *ngFor=\"let year of listYears\">{{year}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\" [(ngModel)]=\"startYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"startYear\" *ngFor=\"let startYear of startListYears\">{{startYear}}</mat-option>\r\n            </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n    <mat-form-field>\r\n        <mat-select placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\" [(ngModel)]=\"endYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"endYear\" *ngFor=\"let endYear of endListYears\">{{endYear}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n  <br>\r\n\r\n\r\n<div *ngIf=\"style === 'slider'\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n  <mat-slider\r\n      id=\"time-slider\"\r\n      tickInterval=\"auto\"\r\n      step=\"{{step}}\"\r\n      [min]=\"dateToNumber(min)\"\r\n      [max]=\"dateToNumber(max)\"\r\n      [value]=\"handleSliderValue()\"\r\n      thumbLabel\r\n      (input)=\"handleSliderDateChange($event)\"\r\n      (selectionChange)=\"handleSliderDateChange($event)\">\r\n  </mat-slider>\r\n  <p class=\"date-below\">{{handleSliderTooltip()}}</p>\r\n  <button mat-icon-button color=\"primary\" (click)=\"playFilter($event)\">\r\n   <mat-icon svgIcon=\"{{playIcon}}\"></mat-icon>\r\n  </button>\r\n</div> -->\r\n",
                styles: [".igo-layer-filters-container{padding-left:5px}mat-slider>>>div.mat-slider-thumb-label{width:32px;height:32px;margin:0 auto}mat-slider>>>span.mat-slider-thumb-label-text{font-size:8px}#time-slider{width:70%;margin:0 auto}@media only screen and (max-width:450px),only screen and (max-height:450px){#time-slider{width:60%;margin:0 auto}}#playFilterIcon{font-size:32px;cursor:pointer}.date-below{margin:0}mat-form-field{text-align:center}"]
            }] }
];
/** @nocollapse */
TimeFilterFormComponent.ctorParameters = () => [];
TimeFilterFormComponent.propDecorators = {
    options: [{ type: Input }],
    currentValue: [{ type: Input }],
    change: [{ type: Output }],
    yearChange: [{ type: Output }],
    mySlider: [{ type: ViewChild, args: [MatSlider,] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimeFilterFormComponent.prototype._options;
    /** @type {?} */
    TimeFilterFormComponent.prototype.date;
    /** @type {?} */
    TimeFilterFormComponent.prototype.startDate;
    /** @type {?} */
    TimeFilterFormComponent.prototype.endDate;
    /** @type {?} */
    TimeFilterFormComponent.prototype.year;
    /** @type {?} */
    TimeFilterFormComponent.prototype.startYear;
    /** @type {?} */
    TimeFilterFormComponent.prototype.endYear;
    /** @type {?} */
    TimeFilterFormComponent.prototype.initStartYear;
    /** @type {?} */
    TimeFilterFormComponent.prototype.initEndYear;
    /** @type {?} */
    TimeFilterFormComponent.prototype.listYears;
    /** @type {?} */
    TimeFilterFormComponent.prototype.startListYears;
    /** @type {?} */
    TimeFilterFormComponent.prototype.endListYears;
    /** @type {?} */
    TimeFilterFormComponent.prototype.interval;
    /** @type {?} */
    TimeFilterFormComponent.prototype.playIcon;
    /** @type {?} */
    TimeFilterFormComponent.prototype.change;
    /** @type {?} */
    TimeFilterFormComponent.prototype.yearChange;
    /** @type {?} */
    TimeFilterFormComponent.prototype.mySlider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWZvcm0vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQVNqQyxNQUFNLE9BQU8sdUJBQXVCO0lBNkdsQztRQTNGTyxjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFDbkMsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBc0JqQyxhQUFRLEdBQUcsb0JBQW9CLENBQUM7UUFFN0IsV0FBTSxHQUFzQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpFLGVBQVUsR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStEMUQsQ0FBQzs7OztJQTVHaEIsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBd0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFlRCxJQUNJLFlBQVksQ0FBQyxLQUFhO1FBQzVCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTs7c0JBQ2xCLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDbkMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7MEJBQ25CLFNBQVMs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QUMxQywrQ0FBd0M7O0lBcUJ4QywyQ0FBcUI7O0lBQ3JCLDJDQUF1Qzs7SUFFdkMseUNBQXlFOztJQUN6RSw2Q0FDeUU7O0lBQ3pFLDJDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgVGltZUZpbHRlck9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBvcHRpb25zKCk6IFRpbWVGaWx0ZXJPcHRpb25zIHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuICBzZXQgb3B0aW9ucyh2YWx1ZTogVGltZUZpbHRlck9wdGlvbnMpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogVGltZUZpbHRlck9wdGlvbnM7XHJcblxyXG4gIHB1YmxpYyBkYXRlOiBEYXRlO1xyXG4gIHB1YmxpYyBzdGFydERhdGU6IERhdGU7XHJcbiAgcHVibGljIGVuZERhdGU6IERhdGU7XHJcbiAgcHVibGljIHllYXI6IGFueTtcclxuICBwdWJsaWMgc3RhcnRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGVuZFllYXI6IGFueTtcclxuICBwdWJsaWMgaW5pdFN0YXJ0WWVhcjogYW55O1xyXG4gIHB1YmxpYyBpbml0RW5kWWVhcjogYW55O1xyXG4gIHB1YmxpYyBsaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwdWJsaWMgc3RhcnRMaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwdWJsaWMgZW5kTGlzdFllYXJzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGN1cnJlbnRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ3llYXInKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVBcnJheSA9IHZhbHVlLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYgKHZhbHVlQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVswXSk7XHJcbiAgICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVsxXSk7XHJcbiAgICAgICAgICBpZiAoIWlzTmFOKHN0YXJ0RGF0ZS52YWx1ZU9mKCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFpc05hTihlbmREYXRlLnZhbHVlT2YoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnRlcnZhbDogYW55O1xyXG4gIHB1YmxpYyBwbGF5SWNvbiA9ICdwbGF5X2NpcmNsZV9maWxsZWQnO1xyXG5cclxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZSB8IFtEYXRlLCBEYXRlXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgeWVhckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U2xpZGVyKSBteVNsaWRlcjtcclxuXHJcbiAgZ2V0IHR5cGUoKTogJ2RhdGUnIHwgJ3RpbWUnIHwgJ2RhdGV0aW1lJyB8ICd5ZWFyJyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnR5cGUgPT09IHVuZGVmaW5lZCA/ICdkYXRlJyA6IHRoaXMub3B0aW9ucy50eXBlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzUmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJhbmdlID09PSB1bmRlZmluZWQgfHwgdGhpcy5vcHRpb25zLnN0eWxlID09PSAnc2xpZGVyJ1xyXG4gICAgICA/IGZhbHNlXHJcbiAgICAgIDogdGhpcy5vcHRpb25zLnJhbmdlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHN0eWxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN0eWxlID09PSB1bmRlZmluZWQgPyAnc2xpZGVyJyA6IHRoaXMub3B0aW9ucy5zdHlsZTtcclxuICB9XHJcblxyXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XHJcbiAgICBsZXQgc3RlcCA9IDEwODAwMDAwO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdGVwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICBjYXNlICdkYXRldGltZSc6XHJcbiAgICAgICAgICBzdGVwID0gMTA4MDAwMDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICAgIHN0ZXAgPSAzNjAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgICBzdGVwID0gMzE1MzYwMDAwMDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgc3RlcCA9IDEwODAwMDAwO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGVwID0gdGhpcy5nZXRTdGVwRGVmaW5pdGlvbih0aGlzLm9wdGlvbnMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0ZXA7XHJcbiAgfVxyXG5cclxuICBnZXQgdGltZUludGVydmFsKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVJbnRlcnZhbCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gMjAwMFxyXG4gICAgICA6IHRoaXMub3B0aW9ucy50aW1lSW50ZXJ2YWw7XHJcbiAgfVxyXG5cclxuICBnZXQgbWluKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5taW4gPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICA6IG5ldyBEYXRlKHRoaXMub3B0aW9ucy5taW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1heCgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubWF4ID09PSB1bmRlZmluZWRcclxuICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgOiBuZXcgRGF0ZSh0aGlzLm9wdGlvbnMubWF4KTtcclxuICB9XHJcblxyXG4gIGdldCBpcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmFuZ2UgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogdGhpcy5vcHRpb25zLnJhbmdlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHV0Y21pbiA9IG5ldyBEYXRlKHRoaXMubWluKTtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICB1dGNtaW4uZ2V0VGltZSgpICsgdXRjbWluLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHV0Y21heCA9IG5ldyBEYXRlKHRoaXMubWF4KTtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgdXRjbWF4LmdldFRpbWUoKSArIHV0Y21heC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRZZWFyID0gbmV3IERhdGUodGhpcy5zdGFydERhdGUpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIHRoaXMuaW5pdFN0YXJ0WWVhciA9IHRoaXMuc3RhcnRZZWFyO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kWWVhciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZW5kWWVhciA9IG5ldyBEYXRlKHRoaXMuZW5kRGF0ZSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgdGhpcy5pbml0RW5kWWVhciA9IHRoaXMuZW5kWWVhcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuaXNSYW5nZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXI7IGkgPD0gdGhpcy5lbmRZZWFyICsgMTsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyOyBpIDwgdGhpcy5lbmRZZWFyOyBpKyspIHtcclxuICAgICAgICB0aGlzLnN0YXJ0TGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyICsgMTsgaSA8PSB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZW5kTGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZURhdGVDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5zZXR1cERhdGVPdXRwdXQoKTtcclxuICAgIHRoaXMuYXBwbHlUeXBlQ2hhbmdlKCk7XHJcblxyXG4gICAgLy8gT25seSBpZiBpcyByYW5nZSwgdXNlIDIgZGF0ZXMgdG8gbWFrZSB0aGUgcmFuZ2VcclxuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChbdGhpcy5zdGFydERhdGUsIHRoaXMuZW5kRGF0ZV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVZZWFyQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcclxuICAgICAgdGhpcy5lbmRMaXN0WWVhcnMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyICsgMTsgaSA8PSB0aGlzLmluaXRFbmRZZWFyOyBpKyspIHtcclxuICAgICAgICB0aGlzLmVuZExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhcnRMaXN0WWVhcnMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5pdFN0YXJ0WWVhciArIDE7IGkgPCB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdChbdGhpcy5zdGFydFllYXIsIHRoaXMuZW5kWWVhcl0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy55ZWFyQ2hhbmdlLmVtaXQodGhpcy55ZWFyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUxpc3RZZWFyQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZShbdGhpcy5zdGFydFllYXIsIHRoaXMuZW5kWWVhcl0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlTGlzdFllYXJTdGFydENoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlXSk7XHJcbiAgfVxyXG5cclxuICBkYXRlVG9OdW1iZXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICBsZXQgbmV3RGF0ZTtcclxuICAgIGlmIChkYXRlKSB7XHJcbiAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld0RhdGUuZ2V0VGltZSgpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2xpZGVyVGh1bWJMYWJlbChsYWJlbDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB0aHVtYkxhYmVsID0gdGhpcy5maW5kVGh1bWJMYWJlbChcclxuICAgICAgdGhpcy5teVNsaWRlci5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXNcclxuICAgICk7XHJcbiAgICBpZiAodGh1bWJMYWJlbCkge1xyXG4gICAgICB0aHVtYkxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaW5kVGh1bWJMYWJlbCh0ZXN0OiBhbnlbXSk6IGFueSB7XHJcbiAgICBsZXQgdGh1bWJMYWJlbDtcclxuXHJcbiAgICB0ZXN0LmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICBpZiAodmFsdWUuY2xhc3NOYW1lID09PSAnbWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0Jykge1xyXG4gICAgICAgIHRodW1iTGFiZWwgPSB2YWx1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHZhbHVlLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIXRodW1iTGFiZWwpIHtcclxuICAgICAgICB0aHVtYkxhYmVsID0gdGhpcy5maW5kVGh1bWJMYWJlbCh2YWx1ZS5jaGlsZE5vZGVzKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgICByZXR1cm4gdGh1bWJMYWJlbDtcclxuICB9XHJcblxyXG4gIHBsYXlGaWx0ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zdG9wRmlsdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlJY29uID0gJ3BhdXNlX2NpcmNsZV9maWxsZWQnO1xyXG4gICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgKHRoYXQpID0+IHtcclxuICAgICAgICAgIGxldCBuZXdNaW5EYXRlTnVtYmVyO1xyXG4gICAgICAgICAgY29uc3QgbWF4RGF0ZU51bWJlciA9IG5ldyBEYXRlKHRoYXQubWF4KTtcclxuXHJcbiAgICAgICAgICBuZXdNaW5EYXRlTnVtYmVyID1cclxuICAgICAgICAgICAgdGhhdC5kYXRlID09PSB1bmRlZmluZWQgPyB0aGF0Lm1pbi5nZXRUaW1lKCkgOiB0aGF0LmRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgbmV3TWluRGF0ZU51bWJlciArPSB0aGF0Lm15U2xpZGVyLnN0ZXA7XHJcbiAgICAgICAgICB0aGF0LmRhdGUgPSBuZXcgRGF0ZShuZXdNaW5EYXRlTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3TWluRGF0ZU51bWJlciA+IG1heERhdGVOdW1iZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc3RvcEZpbHRlcigpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoYXQuaGFuZGxlRGF0ZUNoYW5nZSh7IHZhbHVlOiB0aGF0LmRhdGUsIGRhdGU6IHRoYXQuZGF0ZSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMudGltZUludGVydmFsLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0b3BGaWx0ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMucGxheUljb24gPSAncGxheV9jaXJjbGVfZmlsbGVkJztcclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlckRhdGVDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZXZlbnQudmFsdWUpO1xyXG4gICAgdGhpcy5zZXRTbGlkZXJUaHVtYkxhYmVsKHRoaXMuaGFuZGxlU2xpZGVyVG9vbHRpcCgpKTtcclxuICAgIHRoaXMuaGFuZGxlRGF0ZUNoYW5nZShldmVudCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXJyZW50ID09PSB0cnVlIHx8ICF0aGlzLm1pbikge1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Um91bmRlZERhdGUoY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5taW4uZ2V0VGltZSgpIDogdGhpcy5kYXRlLmdldFRpbWUoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlclRvb2x0aXAoKSB7XHJcbiAgICBsZXQgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICBsYWJlbCA9XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IHRoaXMubWluLnRvRGF0ZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICBsYWJlbCA9XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IHRoaXMubWluLnRvVGltZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvVGltZVN0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAvLyBkYXRldGltZVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGxhYmVsID1cclxuICAgICAgICAgIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gdGhpcy5taW4udG9VVENTdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZS50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxuICB9XHJcblxyXG4gIHNldHVwRGF0ZU91dHB1dCgpIHtcclxuICAgIGlmICh0aGlzLnN0eWxlID09PSAnc2xpZGVyJykge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlLnNldFNlY29uZHMoLSh0aGlzLnN0ZXAgLyAxMDAwKSk7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgdGhpcy5lbmREYXRlLnNldFNlY29uZHModGhpcy5zdGVwIC8gMTAwMCk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgISF0aGlzLmRhdGUpIHtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodGhpcy5kYXRlKTtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzUmFuZ2UgJiYgKCEhdGhpcy5kYXRlIHx8ICF0aGlzLmRhdGUpKSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID1cclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5taW4pIDogdGhpcy5zdGFydERhdGU7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1heCkgOiB0aGlzLmVuZERhdGU7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmRhdGUpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPVxyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1pbikgOiB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgdGhpcy5lbmREYXRlID1cclxuICAgICAgICB0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKHRoaXMubWF4KSA6IHRoaXMuZW5kRGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFwcGx5VHlwZUNoYW5nZSgpIHtcclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMuZW5kRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRIb3VycygwKTtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldE1pbnV0ZXMoMCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRTZWNvbmRzKDApO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldEhvdXJzKDIzKTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKDU5KTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKDU5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RpbWUnOlxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlID09PSAnY2FsZW5kYXInKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zdGFydERhdGUuZ2V0RGF5KCkgIT09IHRoaXMubWluLmdldERheSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSG91ciA9IHRoaXMuc3RhcnREYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTWludXRlID0gdGhpcy5zdGFydERhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRIb3VycyhzZWxlY3RlZEhvdXIpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRNaW51dGVzKHNlbGVjdGVkTWludXRlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5lbmREYXRlLmdldERheSgpICE9PSB0aGlzLm1pbi5nZXREYXkoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEhvdXIgPSB0aGlzLmVuZERhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNaW51dGUgPSB0aGlzLmVuZERhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlLnNldEhvdXJzKHNlbGVjdGVkSG91cik7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKHNlbGVjdGVkTWludXRlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1JhbmdlICYmIHRoaXMuc3RlcCA+IDYwICogNjAgKiAxMDAwKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRNaW51dGVzKDApO1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0U2Vjb25kcygwKTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKDU5KTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKDU5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIC8vIGRhdGV0aW1lXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFJhbmdlTWluRGF0ZSgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5taW4gOiB0aGlzLnN0YXJ0RGF0ZTtcclxuICB9XHJcblxyXG4gIGdldFJhbmdlTWF4RGF0ZSgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMubWF4IDogdGhpcy5lbmREYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm91bmQgZGF0ZSBhdCBhIGNlcnRhaW4gdGltZSwgMTAgbWludXRlcyBieSBEZWZhdWx0XHJcbiAgICogQHBhcmFtIGRhdGUgLSBEYXRlIHRvIFJvdW5kXHJcbiAgICogQHBhcmFtIGF0TWludXRlIC0gcm91bmQgdG8gY2xvc2VzdCAnYXRNaW51dGUnIG1pbnV0ZSwgcm91bmRlZCAxMCBieSBkZWZhdWx0XHJcbiAgICogQHJldHVybiB0aGUgcm91bmRlZCBkYXRlXHJcbiAgICovXHJcbiAgZ2V0Um91bmRlZERhdGUoZGF0ZSwgYXRNaW51dGUgPSAxMCkge1xyXG4gICAgY29uc3QgY29lZmYgPSAxMDAwICogNjAgKiBhdE1pbnV0ZTtcclxuICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLnJvdW5kKGRhdGUuZ2V0VGltZSgpIC8gY29lZmYpICogY29lZmYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzdGVwIChwZXJpb2QpIGRlZmluaXRpb24gZnJvbSB0aGUgbGF5ZXIgZGltZW5zaW9uIHRhZ1xyXG4gICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIGFzIElTTyA4NjAxIGV4YW1wbGU6IFBUMTBNIGZvciAxMCBNaW51dGVzXHJcbiAgICogQHJldHVybiB0aGUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICovXHJcbiAgZ2V0U3RlcERlZmluaXRpb24oc3RlcCkge1xyXG4gICAgcmV0dXJuIG1vbWVudC5kdXJhdGlvbihzdGVwKS5hc01pbGxpc2Vjb25kcygpO1xyXG4gIH1cclxufVxyXG4iXX0=