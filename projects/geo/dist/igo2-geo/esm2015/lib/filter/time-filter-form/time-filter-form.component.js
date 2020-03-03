/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';
import * as moment from 'moment';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterType, TimeFilterStyle } from '../shared/time-filter.enum';
export class TimeFilterFormComponent {
    constructor() {
        this.color = 'primary';
        this.listYears = [];
        this.startListYears = [];
        this.endListYears = [];
        this.playIcon = 'play-circle';
        this.resetIcon = 'replay';
        this.change = new EventEmitter();
        this.yearChange = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentValue(value) {
        if (value) {
            if (this.type !== TimeFilterType.YEAR) {
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
        return this.options.type === undefined ? TimeFilterType.DATE : this.options.type;
    }
    /**
     * @return {?}
     */
    get isRange() {
        return this.options.range === undefined || this.options.style === TimeFilterStyle.SLIDER
            ? false
            : this.options.range;
    }
    /**
     * @return {?}
     */
    get style() {
        return this.options.style === undefined ? TimeFilterStyle.SLIDER : this.options.style;
    }
    /**
     * @return {?}
     */
    get step() {
        /** @type {?} */
        let step = 10800000;
        if (this.options.step === undefined) {
            switch (this.type) {
                case TimeFilterType.DATE:
                case TimeFilterType.DATETIME:
                    step = 10800000;
                    break;
                case TimeFilterType.TIME:
                    step = 3600000;
                    break;
                case TimeFilterType.YEAR:
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
        this.options.enabled = this.options.enabled === undefined ? true : this.options.enabled;
        this.checkFilterValue();
        if (this.options.enabled) {
            if (!this.isRange && this.style === 'slider' && this.type === 'year') {
                this.yearChange.emit(this.year);
            }
        }
        else {
            this.storeCurrentFilterValue();
            this.yearChange.emit(undefined); // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
        }
    }
    /**
     * @return {?}
     */
    storeCurrentFilterValue() {
        // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
        if (!this.isRange && this.style === TimeFilterStyle.SLIDER && this.type === TimeFilterType.YEAR) {
            this.options.value = this.year.toString();
        }
    }
    /**
     * @return {?}
     */
    checkFilterValue() {
        /** @type {?} */
        const timeFromWms = this.layer.dataSource.ol.getParams().TIME;
        if (!this.isRange && this.style === TimeFilterStyle.SLIDER && this.type === TimeFilterType.YEAR) {
            if (timeFromWms) {
                this.year = new Date(timeFromWms.toString()).getFullYear() + 1;
            }
            else if (this.options.value) {
                this.year = new Date(this.options.value.toString()).getFullYear() + 1;
            }
            else {
                this.year = new Date(this.min).getFullYear() + 1;
            }
        }
        else {
            // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
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
     * @return {?}
     */
    toggleFilterState() {
        this.options.enabled = !this.options.enabled;
        if (this.options.enabled) {
            if (!this.isRange && TimeFilterStyle.SLIDER && this.type === TimeFilterType.YEAR) {
                this.yearChange.emit(this.year);
            }
        }
        else {
            this.stopFilter();
            this.storeCurrentFilterValue();
            this.change.emit(undefined); // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    resetFilter(event) {
        this.date = new Date(this.min);
        this.year = this.date.getFullYear() + 1;
        if (!this.isRange && TimeFilterStyle.SLIDER && this.type === TimeFilterType.YEAR) {
            this.yearChange.emit(this.year);
        }
        else {
            this.setupDateOutput();
            this.change.emit(undefined); // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
        }
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
            this.playIcon = 'pause-circle';
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
     * @param {?} event
     * @return {?}
     */
    playYear(event) {
        if (this.year + this.mySlider.step > (this.max.getFullYear() + this.mySlider.step)) {
            this.stopFilter();
            this.resetFilter(event);
        }
        if (this.interval) {
            this.stopFilter();
        }
        else {
            this.playIcon = 'pause-circle';
            this.interval = setInterval((
            // tslint:disable-next-line:only-arrow-functions
            /**
             * @param {?} that
             * @return {?}
             */
            function (that) {
                that.year = that.year + that.mySlider.step;
                if (that.year > that.max.getFullYear()) {
                    that.stopFilter();
                }
                that.yearChange.emit(that.year);
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
        this.playIcon = 'play-circle';
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
     * @param {?} event
     * @return {?}
     */
    handleSliderYearChange(event) {
        this.year = event.value;
        this.yearChange.emit(this.year);
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
        if (this.type === TimeFilterType.YEAR) {
            return this.year;
        }
        else {
            return this.date === undefined ? this.min.getTime() : this.date.getTime();
        }
    }
    /**
     * @return {?}
     */
    handleSliderTooltip() {
        /** @type {?} */
        let label;
        switch (this.type) {
            case TimeFilterType.DATE:
                label =
                    this.date === undefined
                        ? this.min.toDateString()
                        : this.date.toDateString();
                break;
            case TimeFilterType.TIME:
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
        if (this.style === TimeFilterStyle.SLIDER) {
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
            case TimeFilterType.DATE:
                if (this.startDate !== undefined || this.endDate !== undefined) {
                    this.startDate.setHours(0);
                    this.startDate.setMinutes(0);
                    this.startDate.setSeconds(0);
                    this.endDate.setHours(23);
                    this.endDate.setMinutes(59);
                    this.endDate.setSeconds(59);
                }
                break;
            case TimeFilterType.TIME:
                if (this.style === TimeFilterStyle.CALENDAR) {
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
                template: "<div *ngIf=\"style === 'calendar' && type !=='year'\">\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-form-field>\r\n      <mat-datetimepicker-toggle [for]=\"datetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n      <mat-datetimepicker #datetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n      <input matInput autocomplete=\"false\"\r\n        placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\"\r\n        [matDatetimepicker]=\"datetimePicker\"\r\n        [(ngModel)]=\"date\"\r\n        [min]=\"min\"\r\n        [max]=\"max\"\r\n        readonly=\"readonly\"\r\n        (dateChange)=\"handleDateChange($event)\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"minDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #minDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\"\r\n          [matDatetimepicker]=\"minDatetimePicker\"\r\n          [(ngModel)]=\"startDate\"\r\n          [min]=\"min\"\r\n          [max]=\"getRangeMaxDate()\"\r\n          readonly=\"readonly\"\r\n          (input)=\"startDate\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"maxDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #maxDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\"\r\n          [matDatetimepicker]=\"maxDatetimePicker\"\r\n          [(ngModel)]=\"endDate\"\r\n          [min]=\"getRangeMinDate()\"\r\n          [max]=\"max\"\r\n          readonly=\"readonly\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"style === 'calendar' && type ==='year'\">\r\n\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\" [(ngModel)]=\"year\" (selectionChange)=\"handleYearChange($event)\">\r\n                  <mat-option [value]=\"year\" *ngFor=\"let year of listYears\">{{year}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\" [(ngModel)]=\"startYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"startYear\" *ngFor=\"let startYear of startListYears\">{{startYear}}</mat-option>\r\n            </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n    <mat-form-field>\r\n        <mat-select placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\" [(ngModel)]=\"endYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"endYear\" *ngFor=\"let endYear of endListYears\">{{endYear}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n  <br>\r\n  <div *ngIf=\"!isRange && style === 'slider' && type === 'year'\" class=\"igo-col igo-col-100 igo-col-100-m mat-typography\">\r\n    <span>{{startYear}}</span>\r\n    <mat-slider\r\n        id=\"time-slider\"\r\n        tickInterval=\"auto\"\r\n        step=\"{{step}}\"\r\n        [min]=\"startYear\"\r\n        [max]=\"endYear\"\r\n        [value]=\"handleSliderValue()\"\r\n        [color]=\"color\"\r\n        thumbLabel\r\n        (input)=\"handleSliderYearChange($event)\"\r\n        (change)=\"handleSliderYearChange($event)\"\r\n        [disabled]= \"!options.enabled || !layer.visible\">\r\n    </mat-slider>\r\n    <span>{{endYear}}</span>\r\n    <p *ngIf= \"options.enabled\" class=\"date-below\">{{year}}</p>\r\n    <div #actions class=\"igo-layer-actions-container\">\r\n      <mat-slide-toggle (change)=\"toggleFilterState()\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"options.enabled\"\r\n        [disabled]=\"!layer.visible\">\r\n      </mat-slide-toggle>\r\n      <button [disabled]= \"!options.enabled  || !layer.visible\" mat-icon-button color=\"primary\" (click)=\"playYear($event)\">\r\n        <mat-icon svgIcon=\"{{playIcon}}\"></mat-icon>\r\n       </button>\r\n      <button [disabled]=\"!options.enabled  || !layer.visible\" mat-icon-button color=\"primary\" (click)=\"resetFilter($event)\">\r\n        <mat-icon svgIcon=\"{{resetIcon}}\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n<div *ngIf=\"style === 'slider' && type !== 'year'\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n  <mat-slider\r\n      id=\"time-slider\"\r\n      tickInterval=\"auto\"\r\n      step=\"{{step}}\"\r\n      [min]=\"dateToNumber(min)\"\r\n      [max]=\"dateToNumber(max)\"\r\n      [value]=\"handleSliderValue()\"\r\n      thumbLabel\r\n      (input)=\"handleSliderDateChange($event)\"\r\n      (selectionChange)=\"handleSliderDateChange($event)\">\r\n  </mat-slider>\r\n  <p class=\"date-below\">{{handleSliderTooltip()}}</p>\r\n  <button mat-icon-button color=\"primary\" (click)=\"playFilter($event)\">\r\n   <mat-icon svgIcon=\"{{playIcon}}\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                styles: [".igo-layer-filters-container{padding-left:5px}mat-slider>>>div.mat-slider-thumb-label{width:32px;height:32px;margin:0 auto}mat-slider>>>span.mat-slider-thumb-label-text{font-size:10px}#time-slider{width:70%;margin:0 auto}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){#time-slider{width:60%;margin:0 auto}}.date-below{margin:0}mat-form-field{text-align:center}"]
            }] }
];
/** @nocollapse */
TimeFilterFormComponent.ctorParameters = () => [];
TimeFilterFormComponent.propDecorators = {
    layer: [{ type: Input }],
    options: [{ type: Input }],
    currentValue: [{ type: Input }],
    change: [{ type: Output }],
    yearChange: [{ type: Output }],
    mySlider: [{ type: ViewChild, args: [MatSlider,] }]
};
if (false) {
    /** @type {?} */
    TimeFilterFormComponent.prototype.layer;
    /** @type {?} */
    TimeFilterFormComponent.prototype.options;
    /** @type {?} */
    TimeFilterFormComponent.prototype.color;
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
    TimeFilterFormComponent.prototype.resetIcon;
    /** @type {?} */
    TimeFilterFormComponent.prototype.change;
    /** @type {?} */
    TimeFilterFormComponent.prototype.yearChange;
    /** @type {?} */
    TimeFilterFormComponent.prototype.mySlider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWZvcm0vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU83RSxNQUFNLE9BQU8sdUJBQXVCO0lBMEdsQztRQXJHTyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBU2xCLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFzQmpDLGFBQVEsR0FBRyxhQUFhLENBQUM7UUFDekIsY0FBUyxHQUFHLFFBQVEsQ0FBQztRQUVsQixXQUFNLEdBQXNDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekUsZUFBVSxHQUE0QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBK0QxRCxDQUFDOzs7OztJQXhGaEIsSUFDSSxZQUFZLENBQUMsS0FBYTtRQUM1QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFOztzQkFDL0IsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FB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QzNDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7YUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUztnQkFDWixJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPO2dCQUNWLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDbEU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUztnQkFDWixJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPO2dCQUNWLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDbEU7SUFD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LENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5RCxDQUFDOzs7Ozs7O0lBUUQsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTs7Y0FDMUIsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsUUFBUTtRQUNsQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7OztJQU9ELGlCQUFpQixDQUFDLElBQUk7UUFDcEIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hELENBQUM7OztZQS9kRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsK3pMQUFnRDs7YUFFakQ7Ozs7O29CQUVFLEtBQUs7c0JBRUwsS0FBSzsyQkFlTCxLQUFLO3FCQXVCTCxNQUFNO3lCQUNOLE1BQU07dUJBRU4sU0FBUyxTQUFDLFNBQVM7Ozs7SUEzQ3BCLHdDQUFzQjs7SUFFdEIsMENBQW9DOztJQUVwQyx3Q0FBeUI7O0lBQ3pCLHVDQUFrQjs7SUFDbEIsNENBQXVCOztJQUN2QiwwQ0FBcUI7O0lBQ3JCLHVDQUFpQjs7SUFDakIsNENBQXNCOztJQUN0QiwwQ0FBb0I7O0lBQ3BCLGdEQUEwQjs7SUFDMUIsOENBQXdCOztJQUN4Qiw0Q0FBcUM7O0lBQ3JDLGlEQUEwQzs7SUFDMUMsK0NBQXdDOztJQXFCeEMsMkNBQXFCOztJQUNyQiwyQ0FBZ0M7O0lBQ2hDLDRDQUE0Qjs7SUFFNUIseUNBQXlFOztJQUN6RSw2Q0FDeUU7O0lBQ3pFLDJDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgVGltZUZpbHRlck9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlclR5cGUsIFRpbWVGaWx0ZXJTdHlsZSB9IGZyb20gJy4uL3NoYXJlZC90aW1lLWZpbHRlci5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IFRpbWVGaWx0ZXJPcHRpb25zO1xyXG5cclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHVibGljIGRhdGU6IERhdGU7XHJcbiAgcHVibGljIHN0YXJ0RGF0ZTogRGF0ZTtcclxuICBwdWJsaWMgZW5kRGF0ZTogRGF0ZTtcclxuICBwdWJsaWMgeWVhcjogYW55O1xyXG4gIHB1YmxpYyBzdGFydFllYXI6IGFueTtcclxuICBwdWJsaWMgZW5kWWVhcjogYW55O1xyXG4gIHB1YmxpYyBpbml0U3RhcnRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGluaXRFbmRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGxpc3RZZWFyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHB1YmxpYyBzdGFydExpc3RZZWFyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHB1YmxpYyBlbmRMaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY3VycmVudFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy50eXBlICE9PSBUaW1lRmlsdGVyVHlwZS5ZRUFSKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVBcnJheSA9IHZhbHVlLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYgKHZhbHVlQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVswXSk7XHJcbiAgICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVsxXSk7XHJcbiAgICAgICAgICBpZiAoIWlzTmFOKHN0YXJ0RGF0ZS52YWx1ZU9mKCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFpc05hTihlbmREYXRlLnZhbHVlT2YoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnRlcnZhbDogYW55O1xyXG4gIHB1YmxpYyBwbGF5SWNvbiA9ICdwbGF5LWNpcmNsZSc7XHJcbiAgcHVibGljIHJlc2V0SWNvbiA9ICdyZXBsYXknO1xyXG5cclxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZSB8IFtEYXRlLCBEYXRlXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgeWVhckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U2xpZGVyKSBteVNsaWRlcjtcclxuXHJcbiAgZ2V0IHR5cGUoKTogVGltZUZpbHRlclR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50eXBlID09PSB1bmRlZmluZWQgPyBUaW1lRmlsdGVyVHlwZS5EQVRFIDogdGhpcy5vcHRpb25zLnR5cGU7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNSYW5nZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmFuZ2UgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9wdGlvbnMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5TTElERVJcclxuICAgICAgPyBmYWxzZVxyXG4gICAgICA6IHRoaXMub3B0aW9ucy5yYW5nZTtcclxuICB9XHJcblxyXG4gIGdldCBzdHlsZSgpOiBUaW1lRmlsdGVyU3R5bGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gdW5kZWZpbmVkID8gVGltZUZpbHRlclN0eWxlLlNMSURFUiA6IHRoaXMub3B0aW9ucy5zdHlsZTtcclxuICB9XHJcblxyXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XHJcbiAgICBsZXQgc3RlcCA9IDEwODAwMDAwO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdGVwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLkRBVEU6XHJcbiAgICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5EQVRFVElNRTpcclxuICAgICAgICAgIHN0ZXAgPSAxMDgwMDAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuVElNRTpcclxuICAgICAgICAgIHN0ZXAgPSAzNjAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5ZRUFSOlxyXG4gICAgICAgICAgc3RlcCA9IDMxNTM2MDAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHN0ZXAgPSAxMDgwMDAwMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RlcCA9IHRoaXMuZ2V0U3RlcERlZmluaXRpb24odGhpcy5vcHRpb25zLnN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGVwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRpbWVJbnRlcnZhbCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lSW50ZXJ2YWwgPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IDIwMDBcclxuICAgICAgOiB0aGlzLm9wdGlvbnMudGltZUludGVydmFsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pbigpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubWluID09PSB1bmRlZmluZWRcclxuICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgOiBuZXcgRGF0ZSh0aGlzLm9wdGlvbnMubWluKTtcclxuICB9XHJcblxyXG4gIGdldCBtYXgoKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm1heCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgIDogbmV3IERhdGUodGhpcy5vcHRpb25zLm1heCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJhbmdlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRoaXMub3B0aW9ucy5yYW5nZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5zdGFydERhdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCB1dGNtaW4gPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgdXRjbWluLmdldFRpbWUoKSArIHV0Y21pbi5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCB1dGNtYXggPSBuZXcgRGF0ZSh0aGlzLm1heCk7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKFxyXG4gICAgICAgIHV0Y21heC5nZXRUaW1lKCkgKyB1dGNtYXguZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdGFydFllYXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0YXJ0WWVhciA9IG5ldyBEYXRlKHRoaXMuc3RhcnREYXRlKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICB0aGlzLmluaXRTdGFydFllYXIgPSB0aGlzLnN0YXJ0WWVhcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmVuZFllYXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmVuZFllYXIgPSBuZXcgRGF0ZSh0aGlzLmVuZERhdGUpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIHRoaXMuaW5pdEVuZFllYXIgPSB0aGlzLmVuZFllYXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzUmFuZ2UpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyOyBpIDw9IHRoaXMuZW5kWWVhciArIDE7IGkrKykge1xyXG4gICAgICAgIHRoaXMubGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0WWVhcjsgaSA8IHRoaXMuZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0WWVhciArIDE7IGkgPD0gdGhpcy5lbmRZZWFyOyBpKyspIHtcclxuICAgICAgICB0aGlzLmVuZExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9IHRoaXMub3B0aW9ucy5lbmFibGVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5vcHRpb25zLmVuYWJsZWQ7XHJcbiAgICB0aGlzLmNoZWNrRmlsdGVyVmFsdWUoKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlZCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNSYW5nZSAmJiB0aGlzLnN0eWxlID09PSAnc2xpZGVyJyAmJiB0aGlzLnR5cGUgPT09ICd5ZWFyJykge1xyXG4gICAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHRoaXMueWVhcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcmVDdXJyZW50RmlsdGVyVmFsdWUoKTtcclxuICAgICAgdGhpcy55ZWFyQ2hhbmdlLmVtaXQodW5kZWZpbmVkKTsgLy8gVE9ETzogRklYIFRISVMgZm9yIEFMTCBPVEhFUiBUWVBFUyBTVFlMRVMgT1IgUkFOR0UuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9yZUN1cnJlbnRGaWx0ZXJWYWx1ZSgpIHtcclxuICAgIC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgdGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJiB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVIpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMudmFsdWUgPSB0aGlzLnllYXIudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrRmlsdGVyVmFsdWUoKSB7XHJcbiAgICBjb25zdCB0aW1lRnJvbVdtcyA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vbC5nZXRQYXJhbXMoKS5USU1FO1xyXG4gICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgdGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJiB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVIpIHtcclxuICAgICAgaWYgKHRpbWVGcm9tV21zKSB7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gbmV3IERhdGUodGltZUZyb21XbXMudG9TdHJpbmcoKSkuZ2V0RnVsbFllYXIoKSArIDE7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gbmV3IERhdGUodGhpcy5vcHRpb25zLnZhbHVlLnRvU3RyaW5nKCkpLmdldEZ1bGxZZWFyKCkgKyAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueWVhciA9IG5ldyBEYXRlKHRoaXMubWluKS5nZXRGdWxsWWVhcigpICsgMTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gVE9ETzogRklYIFRISVMgZm9yIEFMTCBPVEhFUiBUWVBFUyBTVFlMRVMgT1IgUkFOR0UuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVEYXRlQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuc2V0dXBEYXRlT3V0cHV0KCk7XHJcbiAgICB0aGlzLmFwcGx5VHlwZUNoYW5nZSgpO1xyXG5cclxuICAgIC8vIE9ubHkgaWYgaXMgcmFuZ2UsIHVzZSAyIGRhdGVzIHRvIG1ha2UgdGhlIHJhbmdlXHJcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoW3RoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGVdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5zdGFydERhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlWWVhckNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XHJcbiAgICAgIHRoaXMuZW5kTGlzdFllYXJzID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0WWVhciArIDE7IGkgPD0gdGhpcy5pbml0RW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5lbmRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXJ0TGlzdFllYXJzID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluaXRTdGFydFllYXIgKyAxOyBpIDwgdGhpcy5lbmRZZWFyOyBpKyspIHtcclxuICAgICAgICB0aGlzLnN0YXJ0TGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy55ZWFyQ2hhbmdlLmVtaXQoW3RoaXMuc3RhcnRZZWFyLCB0aGlzLmVuZFllYXJdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHRoaXMueWVhcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVMaXN0WWVhckNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmhhbmRsZVllYXJDaGFuZ2UoW3RoaXMuc3RhcnRZZWFyLCB0aGlzLmVuZFllYXJdKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUxpc3RZZWFyU3RhcnRDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChbdGhpcy5zdGFydERhdGUsIHRoaXMuZW5kRGF0ZV0pO1xyXG4gIH1cclxuXHJcbiAgZGF0ZVRvTnVtYmVyKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgbGV0IG5ld0RhdGU7XHJcbiAgICBpZiAoZGF0ZSkge1xyXG4gICAgICBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXdEYXRlID0gbmV3IERhdGUodGhpcy5taW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXdEYXRlLmdldFRpbWUoKTtcclxuICB9XHJcblxyXG4gIHNldFNsaWRlclRodW1iTGFiZWwobGFiZWw6IHN0cmluZykge1xyXG4gICAgY29uc3QgdGh1bWJMYWJlbCA9IHRoaXMuZmluZFRodW1iTGFiZWwoXHJcbiAgICAgIHRoaXMubXlTbGlkZXIuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzXHJcbiAgICApO1xyXG4gICAgaWYgKHRodW1iTGFiZWwpIHtcclxuICAgICAgdGh1bWJMYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmluZFRodW1iTGFiZWwodGVzdDogYW55W10pOiBhbnkge1xyXG4gICAgbGV0IHRodW1iTGFiZWw7XHJcblxyXG4gICAgdGVzdC5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgaWYgKHZhbHVlLmNsYXNzTmFtZSA9PT0gJ21hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dCcpIHtcclxuICAgICAgICB0aHVtYkxhYmVsID0gdmFsdWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh2YWx1ZS5jaGlsZHJlbi5sZW5ndGggPiAwICYmICF0aHVtYkxhYmVsKSB7XHJcbiAgICAgICAgdGh1bWJMYWJlbCA9IHRoaXMuZmluZFRodW1iTGFiZWwodmFsdWUuY2hpbGROb2Rlcyk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gICAgcmV0dXJuIHRodW1iTGFiZWw7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGaWx0ZXJTdGF0ZSgpIHtcclxuICAgIHRoaXMub3B0aW9ucy5lbmFibGVkID0gIXRoaXMub3B0aW9ucy5lbmFibGVkO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlZCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNSYW5nZSAmJiBUaW1lRmlsdGVyU3R5bGUuU0xJREVSICYmIHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUikge1xyXG4gICAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHRoaXMueWVhcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgICB0aGlzLnN0b3JlQ3VycmVudEZpbHRlclZhbHVlKCk7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodW5kZWZpbmVkKTsgLy8gVE9ETzogRklYIFRISVMgZm9yIEFMTCBPVEhFUiBUWVBFUyBTVFlMRVMgT1IgUkFOR0UuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEZpbHRlcihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICB0aGlzLnllYXIgPSB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArIDE7XHJcbiAgICBpZiAoIXRoaXMuaXNSYW5nZSAmJiBUaW1lRmlsdGVyU3R5bGUuU0xJREVSICYmIHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUikge1xyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXR1cERhdGVPdXRwdXQoKTtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh1bmRlZmluZWQpOyAvLyBUT0RPOiBGSVggVEhJUyBmb3IgQUxMIE9USEVSIFRZUEVTIFNUWUxFUyBPUiBSQU5HRS5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYXlGaWx0ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zdG9wRmlsdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlJY29uID0gJ3BhdXNlLWNpcmNsZSc7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICAodGhhdCkgPT4ge1xyXG4gICAgICAgICAgbGV0IG5ld01pbkRhdGVOdW1iZXI7XHJcbiAgICAgICAgICBjb25zdCBtYXhEYXRlTnVtYmVyID0gbmV3IERhdGUodGhhdC5tYXgpO1xyXG5cclxuICAgICAgICAgIG5ld01pbkRhdGVOdW1iZXIgPVxyXG4gICAgICAgICAgICB0aGF0LmRhdGUgPT09IHVuZGVmaW5lZCA/IHRoYXQubWluLmdldFRpbWUoKSA6IHRoYXQuZGF0ZS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICBuZXdNaW5EYXRlTnVtYmVyICs9IHRoYXQubXlTbGlkZXIuc3RlcDtcclxuICAgICAgICAgIHRoYXQuZGF0ZSA9IG5ldyBEYXRlKG5ld01pbkRhdGVOdW1iZXIpO1xyXG5cclxuICAgICAgICAgIGlmIChuZXdNaW5EYXRlTnVtYmVyID4gbWF4RGF0ZU51bWJlci5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgdGhhdC5zdG9wRmlsdGVyKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhhdC5oYW5kbGVEYXRlQ2hhbmdlKHsgdmFsdWU6IHRoYXQuZGF0ZSwgZGF0ZTogdGhhdC5kYXRlIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwsXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxheVllYXIoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMueWVhciArIHRoaXMubXlTbGlkZXIuc3RlcCA+ICh0aGlzLm1heC5nZXRGdWxsWWVhcigpICsgdGhpcy5teVNsaWRlci5zdGVwKSkge1xyXG4gICAgICB0aGlzLnN0b3BGaWx0ZXIoKTtcclxuICAgICAgdGhpcy5yZXNldEZpbHRlcihldmVudCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLnN0b3BGaWx0ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGxheUljb24gPSAncGF1c2UtY2lyY2xlJztcclxuICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpvbmx5LWFycm93LWZ1bmN0aW9uc1xyXG4gICAgICAgIGZ1bmN0aW9uKHRoYXQpIHtcclxuICAgICAgICAgIHRoYXQueWVhciA9IHRoYXQueWVhciArIHRoYXQubXlTbGlkZXIuc3RlcDtcclxuICAgICAgICAgIGlmICh0aGF0LnllYXIgPiB0aGF0Lm1heC5nZXRGdWxsWWVhcigpKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc3RvcEZpbHRlcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhhdC55ZWFyQ2hhbmdlLmVtaXQodGhhdC55ZWFyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMudGltZUludGVydmFsLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0b3BGaWx0ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMucGxheUljb24gPSAncGxheS1jaXJjbGUnO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlU2xpZGVyRGF0ZUNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShldmVudC52YWx1ZSk7XHJcbiAgICB0aGlzLnNldFNsaWRlclRodW1iTGFiZWwodGhpcy5oYW5kbGVTbGlkZXJUb29sdGlwKCkpO1xyXG4gICAgdGhpcy5oYW5kbGVEYXRlQ2hhbmdlKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlclllYXJDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy55ZWFyID0gZXZlbnQudmFsdWU7XHJcbiAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlU2xpZGVyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuY3VycmVudCA9PT0gdHJ1ZSB8fCAhdGhpcy5taW4pIHtcclxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmdldFJvdW5kZWREYXRlKGN1cnJlbnREYXRlKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMueWVhcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMubWluLmdldFRpbWUoKSA6IHRoaXMuZGF0ZS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJUb29sdGlwKCkge1xyXG4gICAgbGV0IGxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5EQVRFOlxyXG4gICAgICAgIGxhYmVsID1cclxuICAgICAgICAgIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gdGhpcy5taW4udG9EYXRlU3RyaW5nKClcclxuICAgICAgICAgICAgOiB0aGlzLmRhdGUudG9EYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuVElNRTpcclxuICAgICAgICBsYWJlbCA9XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IHRoaXMubWluLnRvVGltZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvVGltZVN0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAvLyBkYXRldGltZVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGxhYmVsID1cclxuICAgICAgICAgIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gdGhpcy5taW4udG9VVENTdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZS50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxuICB9XHJcblxyXG4gIHNldHVwRGF0ZU91dHB1dCgpIHtcclxuICAgIGlmICh0aGlzLnN0eWxlID09PSBUaW1lRmlsdGVyU3R5bGUuU0xJREVSKSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy5kYXRlKTtcclxuICAgICAgdGhpcy5zdGFydERhdGUuc2V0U2Vjb25kcygtKHRoaXMuc3RlcCAvIDEwMDApKTtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodGhpcy5zdGFydERhdGUpO1xyXG4gICAgICB0aGlzLmVuZERhdGUuc2V0U2Vjb25kcyh0aGlzLnN0ZXAgLyAxMDAwKTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNSYW5nZSAmJiAhIXRoaXMuZGF0ZSkge1xyXG4gICAgICB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUpO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNSYW5nZSAmJiAoISF0aGlzLmRhdGUgfHwgIXRoaXMuZGF0ZSkpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPVxyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1pbikgOiB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgdGhpcy5lbmREYXRlID1cclxuICAgICAgICB0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKHRoaXMubWF4KSA6IHRoaXMuZW5kRGF0ZTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuZGF0ZSkge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKHRoaXMubWluKSA6IHRoaXMuc3RhcnREYXRlO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPVxyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5tYXgpIDogdGhpcy5lbmREYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXBwbHlUeXBlQ2hhbmdlKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5EQVRFOlxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMuZW5kRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRIb3VycygwKTtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldE1pbnV0ZXMoMCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRTZWNvbmRzKDApO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldEhvdXJzKDIzKTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKDU5KTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKDU5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuVElNRTpcclxuICAgICAgICBpZiAodGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLkNBTEVOREFSKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zdGFydERhdGUuZ2V0RGF5KCkgIT09IHRoaXMubWluLmdldERheSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSG91ciA9IHRoaXMuc3RhcnREYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTWludXRlID0gdGhpcy5zdGFydERhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRIb3VycyhzZWxlY3RlZEhvdXIpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRNaW51dGVzKHNlbGVjdGVkTWludXRlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5lbmREYXRlLmdldERheSgpICE9PSB0aGlzLm1pbi5nZXREYXkoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEhvdXIgPSB0aGlzLmVuZERhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNaW51dGUgPSB0aGlzLmVuZERhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlLnNldEhvdXJzKHNlbGVjdGVkSG91cik7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKHNlbGVjdGVkTWludXRlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1JhbmdlICYmIHRoaXMuc3RlcCA+IDYwICogNjAgKiAxMDAwKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRNaW51dGVzKDApO1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0U2Vjb25kcygwKTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKDU5KTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKDU5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIC8vIGRhdGV0aW1lXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFJhbmdlTWluRGF0ZSgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5taW4gOiB0aGlzLnN0YXJ0RGF0ZTtcclxuICB9XHJcblxyXG4gIGdldFJhbmdlTWF4RGF0ZSgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMubWF4IDogdGhpcy5lbmREYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm91bmQgZGF0ZSBhdCBhIGNlcnRhaW4gdGltZSwgMTAgbWludXRlcyBieSBEZWZhdWx0XHJcbiAgICogQHBhcmFtIGRhdGUgLSBEYXRlIHRvIFJvdW5kXHJcbiAgICogQHBhcmFtIGF0TWludXRlIC0gcm91bmQgdG8gY2xvc2VzdCAnYXRNaW51dGUnIG1pbnV0ZSwgcm91bmRlZCAxMCBieSBkZWZhdWx0XHJcbiAgICogQHJldHVybiB0aGUgcm91bmRlZCBkYXRlXHJcbiAgICovXHJcbiAgZ2V0Um91bmRlZERhdGUoZGF0ZSwgYXRNaW51dGUgPSAxMCkge1xyXG4gICAgY29uc3QgY29lZmYgPSAxMDAwICogNjAgKiBhdE1pbnV0ZTtcclxuICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLnJvdW5kKGRhdGUuZ2V0VGltZSgpIC8gY29lZmYpICogY29lZmYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzdGVwIChwZXJpb2QpIGRlZmluaXRpb24gZnJvbSB0aGUgbGF5ZXIgZGltZW5zaW9uIHRhZ1xyXG4gICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIGFzIElTTyA4NjAxIGV4YW1wbGU6IFBUMTBNIGZvciAxMCBNaW51dGVzXHJcbiAgICogQHJldHVybiB0aGUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICovXHJcbiAgZ2V0U3RlcERlZmluaXRpb24oc3RlcCkge1xyXG4gICAgcmV0dXJuIG1vbWVudC5kdXJhdGlvbihzdGVwKS5hc01pbGxpc2Vjb25kcygpO1xyXG4gIH1cclxufVxyXG4iXX0=