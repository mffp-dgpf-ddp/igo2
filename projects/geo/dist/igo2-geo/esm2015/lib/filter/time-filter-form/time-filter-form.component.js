/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSlider, DateAdapter } from '@angular/material';
import * as moment from 'moment';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterType, TimeFilterStyle } from '../shared/time-filter.enum';
export class TimeFilterFormComponent {
    /**
     * @param {?} dateAdapter
     */
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        this.color = 'primary';
        this.listYears = [];
        this.startListYears = [];
        this.endListYears = [];
        this.playIcon = 'play-circle';
        this.resetIcon = 'replay';
        this.change = new EventEmitter();
        this.yearChange = new EventEmitter();
        this.dateAdapter.setLocale('fr');
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
        return this.options.type === undefined
            ? TimeFilterType.DATE
            : this.options.type;
    }
    /**
     * @return {?}
     */
    get isRange() {
        return this.options.range === undefined ||
            this.options.style === TimeFilterStyle.SLIDER
            ? false
            : this.options.range;
    }
    /**
     * @return {?}
     */
    get style() {
        return this.options.style === undefined
            ? TimeFilterStyle.SLIDER
            : this.options.style;
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
        if (this.options.min) {
            /** @type {?} */
            const min = new Date(this.options.min);
            return new Date(min.getTime() + min.getTimezoneOffset() * 60000);
        }
        else {
            return undefined;
        }
    }
    /**
     * @return {?}
     */
    get max() {
        if (this.options.max) {
            /** @type {?} */
            const max = new Date(this.options.max);
            return new Date(max.getTime() + max.getTimezoneOffset() * 60000);
        }
        else {
            return undefined;
        }
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
            this.startDate = new Date(this.min);
        }
        if (this.endDate === undefined) {
            this.endDate = new Date(this.max);
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
        this.options.enabled =
            this.options.enabled === undefined ? true : this.options.enabled;
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
        if (!this.isRange &&
            this.style === TimeFilterStyle.SLIDER &&
            this.type === TimeFilterType.YEAR) {
            this.options.value = this.year.toString();
        }
    }
    /**
     * @return {?}
     */
    checkFilterValue() {
        /** @type {?} */
        const timeFromWms = this.layer.dataSource.ol.getParams().TIME;
        if (!this.isRange &&
            this.style === TimeFilterStyle.SLIDER &&
            this.type === TimeFilterType.YEAR) {
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
        else if (this.isRange &&
            this.style === TimeFilterStyle.CALENDAR &&
            this.type === TimeFilterType.YEAR) {
            if (timeFromWms) {
                this.startYear = parseInt(timeFromWms.substr(0, 4), 10);
                this.endYear = parseInt(timeFromWms.substr(5, 4), 10);
                /** @type {?} */
                const newStartListYears = [];
                /** @type {?} */
                const newEndListYears = [];
                for (let i = this.initStartYear; i < this.endYear; i++) {
                    newStartListYears.push(i);
                }
                for (let i = this.startYear + 1; i <= this.initEndYear; i++) {
                    newEndListYears.push(i);
                }
                this.startListYears = newStartListYears;
                this.endListYears = newEndListYears;
            }
        }
        // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
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
            if (!this.isRange &&
                TimeFilterStyle.SLIDER &&
                this.type === TimeFilterType.YEAR) {
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
        if (!this.isRange &&
            TimeFilterStyle.SLIDER &&
            this.type === TimeFilterType.YEAR) {
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
            that => {
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
        if (this.year + this.mySlider.step >
            this.max.getFullYear() + this.mySlider.step) {
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
                styles: [".igo-layer-filters-container{padding-left:5px}mat-slider>>>div.mat-slider-thumb-label{width:32px;height:32px;margin:0 auto}mat-slider>>>span.mat-slider-thumb-label-text{font-size:10px}#time-slider{width:70%;margin:0 auto}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){#time-slider{width:60%;margin:0 auto}}.date-below{margin:0}mat-form-field{text-align:center}mat-datetimepicker-toggle ::ng-deep .mat-icon{padding-bottom:30px}.igo-layer-actions-container>.mat-slide-toggle{vertical-align:middle}"]
            }] }
];
/** @nocollapse */
TimeFilterFormComponent.ctorParameters = () => [
    { type: DateAdapter }
];
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
    /**
     * @type {?}
     * @private
     */
    TimeFilterFormComponent.prototype.dateAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWZvcm0vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFakMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFPN0UsTUFBTSxPQUFPLHVCQUF1Qjs7OztJQXFIbEMsWUFBb0IsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBaEgzQyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBU2xCLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFzQmpDLGFBQVEsR0FBRyxhQUFhLENBQUM7UUFDekIsY0FBUyxHQUFHLFFBQVEsQ0FBQztRQUVsQixXQUFNLEdBQXNDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekUsZUFBVSxHQUE0QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBMkV2RSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQXJHRCxJQUNJLFlBQVksQ0FBQyxLQUFhO1FBQzVCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUU7O3NCQUMvQixVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ25DLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7OzBCQUNuQixTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzswQkFDbkMsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTt3QkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7cUJBQzVCO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7d0JBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3FCQUN4QjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBV0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTO1lBQ3BDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSTtZQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUMsTUFBTTtZQUM3QyxDQUFDLENBQUMsS0FBSztZQUNQLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQ3JDLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTTtZQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQUksSUFBSTs7WUFDRixJQUFJLEdBQUcsUUFBUTtRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNuQyxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLEtBQUssY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDekIsS0FBSyxjQUFjLENBQUMsUUFBUTtvQkFDMUIsSUFBSSxHQUFHLFFBQVEsQ0FBQztvQkFDaEIsTUFBTTtnQkFDUixLQUFLLGNBQWMsQ0FBQyxJQUFJO29CQUN0QixJQUFJLEdBQUcsT0FBTyxDQUFDO29CQUNmLE1BQU07Z0JBQ1IsS0FBSyxjQUFjLENBQUMsSUFBSTtvQkFDdEIsSUFBSSxHQUFHLFdBQVcsQ0FBQztvQkFDbkIsTUFBTTtnQkFDUjtvQkFDRSxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25CO1NBQ0Y7YUFBTTtZQUNMLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUztZQUM1QyxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUNoQyxDQUFDOzs7O0lBRUQsSUFBSSxHQUFHO1FBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTs7a0JBQ2QsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3RDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDTCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtJQUNILENBQUM7Ozs7SUFFRCxJQUFJLEdBQUc7UUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFOztrQkFDZCxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDdEMsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNMLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQzs7OztJQUVELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFNRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNyQztRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7U0FDRjthQUFNO1lBQ0wsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25FLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtTQUN4RjtJQUNILENBQUM7Ozs7SUFFRCx1QkFBdUI7UUFDckIsc0RBQXNEO1FBQ3RELElBQ0UsQ0FBQyxJQUFJLENBQUMsT0FBTztZQUNiLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLE1BQU07WUFDckMsSUFBSSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsSUFBSSxFQUNqQztZQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7O0lBRUQsZ0JBQWdCOztjQUNSLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSTtRQUM3RCxJQUNFLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDYixJQUFJLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQyxNQUFNO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLElBQUksRUFDakM7WUFDQSxJQUFJLFdBQVcsRUFBRTtnQkFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNoRTtpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNsRDtTQUNGO2FBQU0sSUFDTCxJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLFFBQVE7WUFDdkMsSUFBSSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsSUFBSSxFQUNqQztZQUNBLElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7c0JBQ2hELGlCQUFpQixHQUFVLEVBQUU7O3NCQUM3QixlQUFlLEdBQVUsRUFBRTtnQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNCO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNELGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pCO2dCQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO2FBQ3JDO1NBQ0Y7UUFDRCxzREFBc0Q7SUFDeEQsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFVO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsS0FBVTtRQUN6QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxLQUFVO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7SUFFRCx5QkFBeUIsQ0FBQyxLQUFVO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFVOztZQUNqQixPQUFPO1FBQ1gsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7UUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVELG1CQUFtQixDQUFDLEtBQWE7O2NBQ3pCLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUNuRDtRQUNELElBQUksVUFBVSxFQUFFO1lBQ2QsVUFBVSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFXOztZQUNwQixVQUFVO1FBRWQsSUFBSSxDQUFDLE9BQU87Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssNkJBQTZCLEVBQUU7Z0JBQ3JELFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDcEI7WUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDNUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BEO1FBQ0gsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUNFLENBQUMsSUFBSSxDQUFDLE9BQU87Z0JBQ2IsZUFBZSxDQUFDLE1BQU07Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLElBQUksRUFDakM7Z0JBQ0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtTQUNwRjtJQUNILENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUNFLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDYixlQUFlLENBQUMsTUFBTTtZQUN0QixJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQ2pDO1lBQ0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxzREFBc0Q7U0FDcEY7SUFDSCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVzs7OztZQUN6QixJQUFJLENBQUMsRUFBRTs7b0JBQ0QsZ0JBQWdCOztzQkFDZCxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFFeEMsZ0JBQWdCO29CQUNkLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyRSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUNuQjtnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxHQUNELElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FDTCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFDM0M7WUFDQSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVzs7Ozs7O1lBRXpCLFVBQVMsSUFBSTtnQkFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQzNDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ25CO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLEdBQ0QsSUFBSSxDQUFDLFlBQVksRUFDakIsSUFBSSxDQUNMLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELHNCQUFzQixDQUFDLEtBQVU7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsc0JBQXNCLENBQUMsS0FBVTtRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7O2tCQUN4QyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNFO0lBQ0gsQ0FBQzs7OztJQUVELG1CQUFtQjs7WUFDYixLQUFhO1FBRWpCLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLGNBQWMsQ0FBQyxJQUFJO2dCQUN0QixLQUFLO29CQUNILElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUzt3QkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFO3dCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDL0IsTUFBTTtZQUNSLEtBQUssY0FBYyxDQUFDLElBQUk7Z0JBQ3RCLEtBQUs7b0JBQ0gsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO3dCQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7d0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsV0FBVztZQUNYO2dCQUNFLEtBQUs7b0JBQ0gsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO3dCQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7d0JBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM5QixNQUFNO1NBQ1Q7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7YUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUztnQkFDWixJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPO2dCQUNWLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDbEU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUztnQkFDWixJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPO2dCQUNWLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDbEU7SUFDSCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLGNBQWMsQ0FBQyxJQUFJO2dCQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUM3QjtnQkFDRCxNQUFNO1lBQ1IsS0FBSyxjQUFjLENBQUMsSUFBSTtnQkFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQyxRQUFRLEVBQUU7b0JBQzNDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFOzs4QkFDM0MsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs4QkFDeEMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO3dCQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDM0M7b0JBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7OzhCQUN6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7OzhCQUN0QyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7d0JBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3FCQUN6QztpQkFDRjtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFO29CQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDN0I7Z0JBQ0QsTUFBTTtZQUNSLFdBQVc7WUFDWCxRQUFRO1lBQ1IsYUFBYTtTQUNkO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2xFLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5RCxDQUFDOzs7Ozs7O0lBUUQsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTs7Y0FDMUIsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsUUFBUTtRQUNsQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7OztJQU9ELGlCQUFpQixDQUFDLElBQUk7UUFDcEIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hELENBQUM7OztZQTVnQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLCt6TEFBZ0Q7O2FBRWpEOzs7O1lBWG1CLFdBQVc7OztvQkFhNUIsS0FBSztzQkFFTCxLQUFLOzJCQWVMLEtBQUs7cUJBdUJMLE1BQU07eUJBQ04sTUFBTTt1QkFFTixTQUFTLFNBQUMsU0FBUzs7OztJQTNDcEIsd0NBQXNCOztJQUV0QiwwQ0FBb0M7O0lBRXBDLHdDQUF5Qjs7SUFDekIsdUNBQWtCOztJQUNsQiw0Q0FBdUI7O0lBQ3ZCLDBDQUFxQjs7SUFDckIsdUNBQWlCOztJQUNqQiw0Q0FBc0I7O0lBQ3RCLDBDQUFvQjs7SUFDcEIsZ0RBQTBCOztJQUMxQiw4Q0FBd0I7O0lBQ3hCLDRDQUFxQzs7SUFDckMsaURBQTBDOztJQUMxQywrQ0FBd0M7O0lBcUJ4QywyQ0FBcUI7O0lBQ3JCLDJDQUFnQzs7SUFDaEMsNENBQTRCOztJQUU1Qix5Q0FBeUU7O0lBQ3pFLDZDQUN5RTs7SUFDekUsMkNBQStCOzs7OztJQXlFbkIsOENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNsaWRlciwgRGF0ZUFkYXB0ZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgVGltZUZpbHRlck9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlclR5cGUsIFRpbWVGaWx0ZXJTdHlsZSB9IGZyb20gJy4uL3NoYXJlZC90aW1lLWZpbHRlci5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IFRpbWVGaWx0ZXJPcHRpb25zO1xyXG5cclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHVibGljIGRhdGU6IERhdGU7XHJcbiAgcHVibGljIHN0YXJ0RGF0ZTogRGF0ZTtcclxuICBwdWJsaWMgZW5kRGF0ZTogRGF0ZTtcclxuICBwdWJsaWMgeWVhcjogYW55O1xyXG4gIHB1YmxpYyBzdGFydFllYXI6IGFueTtcclxuICBwdWJsaWMgZW5kWWVhcjogYW55O1xyXG4gIHB1YmxpYyBpbml0U3RhcnRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGluaXRFbmRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGxpc3RZZWFyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHB1YmxpYyBzdGFydExpc3RZZWFyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHB1YmxpYyBlbmRMaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY3VycmVudFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy50eXBlICE9PSBUaW1lRmlsdGVyVHlwZS5ZRUFSKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVBcnJheSA9IHZhbHVlLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYgKHZhbHVlQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVswXSk7XHJcbiAgICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVsxXSk7XHJcbiAgICAgICAgICBpZiAoIWlzTmFOKHN0YXJ0RGF0ZS52YWx1ZU9mKCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFpc05hTihlbmREYXRlLnZhbHVlT2YoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnRlcnZhbDogYW55O1xyXG4gIHB1YmxpYyBwbGF5SWNvbiA9ICdwbGF5LWNpcmNsZSc7XHJcbiAgcHVibGljIHJlc2V0SWNvbiA9ICdyZXBsYXknO1xyXG5cclxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZSB8IFtEYXRlLCBEYXRlXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgeWVhckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U2xpZGVyKSBteVNsaWRlcjtcclxuXHJcbiAgZ2V0IHR5cGUoKTogVGltZUZpbHRlclR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50eXBlID09PSB1bmRlZmluZWRcclxuICAgICAgPyBUaW1lRmlsdGVyVHlwZS5EQVRFXHJcbiAgICAgIDogdGhpcy5vcHRpb25zLnR5cGU7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNSYW5nZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmFuZ2UgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5TTElERVJcclxuICAgICAgPyBmYWxzZVxyXG4gICAgICA6IHRoaXMub3B0aW9ucy5yYW5nZTtcclxuICB9XHJcblxyXG4gIGdldCBzdHlsZSgpOiBUaW1lRmlsdGVyU3R5bGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gVGltZUZpbHRlclN0eWxlLlNMSURFUlxyXG4gICAgICA6IHRoaXMub3B0aW9ucy5zdHlsZTtcclxuICB9XHJcblxyXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XHJcbiAgICBsZXQgc3RlcCA9IDEwODAwMDAwO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdGVwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLkRBVEU6XHJcbiAgICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5EQVRFVElNRTpcclxuICAgICAgICAgIHN0ZXAgPSAxMDgwMDAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuVElNRTpcclxuICAgICAgICAgIHN0ZXAgPSAzNjAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5ZRUFSOlxyXG4gICAgICAgICAgc3RlcCA9IDMxNTM2MDAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHN0ZXAgPSAxMDgwMDAwMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RlcCA9IHRoaXMuZ2V0U3RlcERlZmluaXRpb24odGhpcy5vcHRpb25zLnN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGVwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRpbWVJbnRlcnZhbCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lSW50ZXJ2YWwgPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IDIwMDBcclxuICAgICAgOiB0aGlzLm9wdGlvbnMudGltZUludGVydmFsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pbigpOiBEYXRlIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubWluKSB7XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKHRoaXMub3B0aW9ucy5taW4pO1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUobWluLmdldFRpbWUoKSArIG1pbi5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBtYXgoKTogRGF0ZSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm1heCkge1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSh0aGlzLm9wdGlvbnMubWF4KTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKG1heC5nZXRUaW1lKCkgKyBtYXguZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgaXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJhbmdlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRoaXMub3B0aW9ucy5yYW5nZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPERhdGU+KSB7XHJcbiAgICB0aGlzLmRhdGVBZGFwdGVyLnNldExvY2FsZSgnZnInKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodGhpcy5tYXgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdGFydFllYXIgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0RGF0ZSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgdGhpcy5pbml0U3RhcnRZZWFyID0gdGhpcy5zdGFydFllYXI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmRZZWFyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbmRZZWFyID0gbmV3IERhdGUodGhpcy5lbmREYXRlKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICB0aGlzLmluaXRFbmRZZWFyID0gdGhpcy5lbmRZZWFyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5pc1JhbmdlKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0WWVhcjsgaSA8PSB0aGlzLmVuZFllYXIgKyAxOyBpKyspIHtcclxuICAgICAgICB0aGlzLmxpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXI7IGkgPCB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXIgKyAxOyBpIDw9IHRoaXMuZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5lbmRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZWQgPVxyXG4gICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy5lbmFibGVkO1xyXG4gICAgdGhpcy5jaGVja0ZpbHRlclZhbHVlKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgdGhpcy5zdHlsZSA9PT0gJ3NsaWRlcicgJiYgdGhpcy50eXBlID09PSAneWVhcicpIHtcclxuICAgICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3JlQ3VycmVudEZpbHRlclZhbHVlKCk7XHJcbiAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHVuZGVmaW5lZCk7IC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcmVDdXJyZW50RmlsdGVyVmFsdWUoKSB7XHJcbiAgICAvLyBUT0RPOiBGSVggVEhJUyBmb3IgQUxMIE9USEVSIFRZUEVTIFNUWUxFUyBPUiBSQU5HRS5cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMuaXNSYW5nZSAmJlxyXG4gICAgICB0aGlzLnN0eWxlID09PSBUaW1lRmlsdGVyU3R5bGUuU0xJREVSICYmXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUlxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy52YWx1ZSA9IHRoaXMueWVhci50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tGaWx0ZXJWYWx1ZSgpIHtcclxuICAgIGNvbnN0IHRpbWVGcm9tV21zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9sLmdldFBhcmFtcygpLlRJTUU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgdGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJlxyXG4gICAgICB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVJcclxuICAgICkge1xyXG4gICAgICBpZiAodGltZUZyb21XbXMpIHtcclxuICAgICAgICB0aGlzLnllYXIgPSBuZXcgRGF0ZSh0aW1lRnJvbVdtcy50b1N0cmluZygpKS5nZXRGdWxsWWVhcigpICsgMTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudmFsdWUpIHtcclxuICAgICAgICB0aGlzLnllYXIgPSBuZXcgRGF0ZSh0aGlzLm9wdGlvbnMudmFsdWUudG9TdHJpbmcoKSkuZ2V0RnVsbFllYXIoKSArIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gbmV3IERhdGUodGhpcy5taW4pLmdldEZ1bGxZZWFyKCkgKyAxO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgdGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLkNBTEVOREFSICYmXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUlxyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aW1lRnJvbVdtcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRZZWFyID0gcGFyc2VJbnQodGltZUZyb21XbXMuc3Vic3RyKDAsIDQpLCAxMCk7XHJcbiAgICAgICAgdGhpcy5lbmRZZWFyID0gcGFyc2VJbnQodGltZUZyb21XbXMuc3Vic3RyKDUsIDQpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbmV3U3RhcnRMaXN0WWVhcnM6IGFueVtdID0gW107XHJcbiAgICAgICAgY29uc3QgbmV3RW5kTGlzdFllYXJzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluaXRTdGFydFllYXI7IGkgPCB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgICAgbmV3U3RhcnRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyICsgMTsgaSA8PSB0aGlzLmluaXRFbmRZZWFyOyBpKyspIHtcclxuICAgICAgICAgIG5ld0VuZExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXJ0TGlzdFllYXJzID0gbmV3U3RhcnRMaXN0WWVhcnM7XHJcbiAgICAgICAgdGhpcy5lbmRMaXN0WWVhcnMgPSBuZXdFbmRMaXN0WWVhcnM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRGF0ZUNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnNldHVwRGF0ZU91dHB1dCgpO1xyXG4gICAgdGhpcy5hcHBseVR5cGVDaGFuZ2UoKTtcclxuXHJcbiAgICAvLyBPbmx5IGlmIGlzIHJhbmdlLCB1c2UgMiBkYXRlcyB0byBtYWtlIHRoZSByYW5nZVxyXG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZVllYXJDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xyXG4gICAgICB0aGlzLmVuZExpc3RZZWFycyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXIgKyAxOyBpIDw9IHRoaXMuaW5pdEVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZW5kTGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGFydExpc3RZZWFycyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5pbml0U3RhcnRZZWFyICsgMTsgaSA8IHRoaXMuZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0WWVhciwgdGhpcy5lbmRZZWFyXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTGlzdFllYXJDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKFt0aGlzLnN0YXJ0WWVhciwgdGhpcy5lbmRZZWFyXSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVMaXN0WWVhclN0YXJ0Q2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoW3RoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGVdKTtcclxuICB9XHJcblxyXG4gIGRhdGVUb051bWJlcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIGxldCBuZXdEYXRlO1xyXG4gICAgaWYgKGRhdGUpIHtcclxuICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWluKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3RGF0ZS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBzZXRTbGlkZXJUaHVtYkxhYmVsKGxhYmVsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRodW1iTGFiZWwgPSB0aGlzLmZpbmRUaHVtYkxhYmVsKFxyXG4gICAgICB0aGlzLm15U2xpZGVyLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlc1xyXG4gICAgKTtcclxuICAgIGlmICh0aHVtYkxhYmVsKSB7XHJcbiAgICAgIHRodW1iTGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRUaHVtYkxhYmVsKHRlc3Q6IGFueVtdKTogYW55IHtcclxuICAgIGxldCB0aHVtYkxhYmVsO1xyXG5cclxuICAgIHRlc3QuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZS5jbGFzc05hbWUgPT09ICdtYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHQnKSB7XHJcbiAgICAgICAgdGh1bWJMYWJlbCA9IHZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodmFsdWUuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhdGh1bWJMYWJlbCkge1xyXG4gICAgICAgIHRodW1iTGFiZWwgPSB0aGlzLmZpbmRUaHVtYkxhYmVsKHZhbHVlLmNoaWxkTm9kZXMpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIHJldHVybiB0aHVtYkxhYmVsO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRmlsdGVyU3RhdGUoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9ICF0aGlzLm9wdGlvbnMuZW5hYmxlZDtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICF0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgICBUaW1lRmlsdGVyU3R5bGUuU0xJREVSICYmXHJcbiAgICAgICAgdGhpcy50eXBlID09PSBUaW1lRmlsdGVyVHlwZS5ZRUFSXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHRoaXMueWVhcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgICB0aGlzLnN0b3JlQ3VycmVudEZpbHRlclZhbHVlKCk7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodW5kZWZpbmVkKTsgLy8gVE9ETzogRklYIFRISVMgZm9yIEFMTCBPVEhFUiBUWVBFUyBTVFlMRVMgT1IgUkFOR0UuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEZpbHRlcihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICB0aGlzLnllYXIgPSB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArIDE7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJlxyXG4gICAgICB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVJcclxuICAgICkge1xyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXR1cERhdGVPdXRwdXQoKTtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh1bmRlZmluZWQpOyAvLyBUT0RPOiBGSVggVEhJUyBmb3IgQUxMIE9USEVSIFRZUEVTIFNUWUxFUyBPUiBSQU5HRS5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYXlGaWx0ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zdG9wRmlsdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlJY29uID0gJ3BhdXNlLWNpcmNsZSc7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICB0aGF0ID0+IHtcclxuICAgICAgICAgIGxldCBuZXdNaW5EYXRlTnVtYmVyO1xyXG4gICAgICAgICAgY29uc3QgbWF4RGF0ZU51bWJlciA9IG5ldyBEYXRlKHRoYXQubWF4KTtcclxuXHJcbiAgICAgICAgICBuZXdNaW5EYXRlTnVtYmVyID1cclxuICAgICAgICAgICAgdGhhdC5kYXRlID09PSB1bmRlZmluZWQgPyB0aGF0Lm1pbi5nZXRUaW1lKCkgOiB0aGF0LmRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgbmV3TWluRGF0ZU51bWJlciArPSB0aGF0Lm15U2xpZGVyLnN0ZXA7XHJcbiAgICAgICAgICB0aGF0LmRhdGUgPSBuZXcgRGF0ZShuZXdNaW5EYXRlTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3TWluRGF0ZU51bWJlciA+IG1heERhdGVOdW1iZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc3RvcEZpbHRlcigpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoYXQuaGFuZGxlRGF0ZUNoYW5nZSh7IHZhbHVlOiB0aGF0LmRhdGUsIGRhdGU6IHRoYXQuZGF0ZSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMudGltZUludGVydmFsLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYXlZZWFyKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy55ZWFyICsgdGhpcy5teVNsaWRlci5zdGVwID5cclxuICAgICAgdGhpcy5tYXguZ2V0RnVsbFllYXIoKSArIHRoaXMubXlTbGlkZXIuc3RlcFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgICB0aGlzLnJlc2V0RmlsdGVyKGV2ZW50KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wbGF5SWNvbiA9ICdwYXVzZS1jaXJjbGUnO1xyXG4gICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm9ubHktYXJyb3ctZnVuY3Rpb25zXHJcbiAgICAgICAgZnVuY3Rpb24odGhhdCkge1xyXG4gICAgICAgICAgdGhhdC55ZWFyID0gdGhhdC55ZWFyICsgdGhhdC5teVNsaWRlci5zdGVwO1xyXG4gICAgICAgICAgaWYgKHRoYXQueWVhciA+IHRoYXQubWF4LmdldEZ1bGxZZWFyKCkpIHtcclxuICAgICAgICAgICAgdGhhdC5zdG9wRmlsdGVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGF0LnllYXJDaGFuZ2UuZW1pdCh0aGF0LnllYXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwsXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcEZpbHRlcigpIHtcclxuICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmludGVydmFsID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5wbGF5SWNvbiA9ICdwbGF5LWNpcmNsZSc7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJEYXRlQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGV2ZW50LnZhbHVlKTtcclxuICAgIHRoaXMuc2V0U2xpZGVyVGh1bWJMYWJlbCh0aGlzLmhhbmRsZVNsaWRlclRvb2x0aXAoKSk7XHJcbiAgICB0aGlzLmhhbmRsZURhdGVDaGFuZ2UoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlU2xpZGVyWWVhckNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnllYXIgPSBldmVudC52YWx1ZTtcclxuICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHRoaXMueWVhcik7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXJyZW50ID09PSB0cnVlIHx8ICF0aGlzLm1pbikge1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Um91bmRlZERhdGUoY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUikge1xyXG4gICAgICByZXR1cm4gdGhpcy55ZWFyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5taW4uZ2V0VGltZSgpIDogdGhpcy5kYXRlLmdldFRpbWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlclRvb2x0aXAoKSB7XHJcbiAgICBsZXQgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLkRBVEU6XHJcbiAgICAgICAgbGFiZWwgPVxyXG4gICAgICAgICAgdGhpcy5kYXRlID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB0aGlzLm1pbi50b0RhdGVTdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5USU1FOlxyXG4gICAgICAgIGxhYmVsID1cclxuICAgICAgICAgIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gdGhpcy5taW4udG9UaW1lU3RyaW5nKClcclxuICAgICAgICAgICAgOiB0aGlzLmRhdGUudG9UaW1lU3RyaW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIC8vIGRhdGV0aW1lXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbGFiZWwgPVxyXG4gICAgICAgICAgdGhpcy5kYXRlID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB0aGlzLm1pbi50b1VUQ1N0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvVVRDU3RyaW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBEYXRlT3V0cHV0KCkge1xyXG4gICAgaWYgKHRoaXMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5TTElERVIpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUpO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRTZWNvbmRzKC0odGhpcy5zdGVwIC8gMTAwMCkpO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKHRoaXMuc3RlcCAvIDEwMDApO1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1JhbmdlICYmICEhdGhpcy5kYXRlKSB7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy5kYXRlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc1JhbmdlICYmICghIXRoaXMuZGF0ZSB8fCAhdGhpcy5kYXRlKSkge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKHRoaXMubWluKSA6IHRoaXMuc3RhcnREYXRlO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPVxyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5tYXgpIDogdGhpcy5lbmREYXRlO1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5kYXRlKSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID1cclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5taW4pIDogdGhpcy5zdGFydERhdGU7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1heCkgOiB0aGlzLmVuZERhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhcHBseVR5cGVDaGFuZ2UoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLkRBVEU6XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5lbmREYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldEhvdXJzKDApO1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0TWludXRlcygwKTtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldFNlY29uZHMoMCk7XHJcbiAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0SG91cnMoMjMpO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldE1pbnV0ZXMoNTkpO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldFNlY29uZHMoNTkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5USU1FOlxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlID09PSBUaW1lRmlsdGVyU3R5bGUuQ0FMRU5EQVIpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5nZXREYXkoKSAhPT0gdGhpcy5taW4uZ2V0RGF5KCkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRIb3VyID0gdGhpcy5zdGFydERhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNaW51dGUgPSB0aGlzLnN0YXJ0RGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5taW47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldEhvdXJzKHNlbGVjdGVkSG91cik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldE1pbnV0ZXMoc2VsZWN0ZWRNaW51dGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUuZ2V0RGF5KCkgIT09IHRoaXMubWluLmdldERheSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSG91ciA9IHRoaXMuZW5kRGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1pbnV0ZSA9IHRoaXMuZW5kRGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0SG91cnMoc2VsZWN0ZWRIb3VyKTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlLnNldE1pbnV0ZXMoc2VsZWN0ZWRNaW51dGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgdGhpcy5zdGVwID4gNjAgKiA2MCAqIDEwMDApIHtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldE1pbnV0ZXMoMCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRTZWNvbmRzKDApO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldE1pbnV0ZXMoNTkpO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldFNlY29uZHMoNTkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgLy8gZGF0ZXRpbWVcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UmFuZ2VNaW5EYXRlKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQgPyB0aGlzLm1pbiA6IHRoaXMuc3RhcnREYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFuZ2VNYXhEYXRlKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuZW5kRGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5tYXggOiB0aGlzLmVuZERhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3VuZCBkYXRlIGF0IGEgY2VydGFpbiB0aW1lLCAxMCBtaW51dGVzIGJ5IERlZmF1bHRcclxuICAgKiBAcGFyYW0gZGF0ZSAtIERhdGUgdG8gUm91bmRcclxuICAgKiBAcGFyYW0gYXRNaW51dGUgLSByb3VuZCB0byBjbG9zZXN0ICdhdE1pbnV0ZScgbWludXRlLCByb3VuZGVkIDEwIGJ5IGRlZmF1bHRcclxuICAgKiBAcmV0dXJuIHRoZSByb3VuZGVkIGRhdGVcclxuICAgKi9cclxuICBnZXRSb3VuZGVkRGF0ZShkYXRlLCBhdE1pbnV0ZSA9IDEwKSB7XHJcbiAgICBjb25zdCBjb2VmZiA9IDEwMDAgKiA2MCAqIGF0TWludXRlO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKE1hdGgucm91bmQoZGF0ZS5nZXRUaW1lKCkgLyBjb2VmZikgKiBjb2VmZik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHN0ZXAgKHBlcmlvZCkgZGVmaW5pdGlvbiBmcm9tIHRoZSBsYXllciBkaW1lbnNpb24gdGFnXHJcbiAgICogQHBhcmFtIHN0ZXAgVGhlIHN0ZXAgYXMgSVNPIDg2MDEgZXhhbXBsZTogUFQxME0gZm9yIDEwIE1pbnV0ZXNcclxuICAgKiBAcmV0dXJuIHRoZSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHNcclxuICAgKi9cclxuICBnZXRTdGVwRGVmaW5pdGlvbihzdGVwKSB7XHJcbiAgICByZXR1cm4gbW9tZW50LmR1cmF0aW9uKHN0ZXApLmFzTWlsbGlzZWNvbmRzKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==