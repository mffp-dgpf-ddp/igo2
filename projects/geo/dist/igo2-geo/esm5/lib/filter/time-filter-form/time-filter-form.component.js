/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSlider, DateAdapter } from '@angular/material';
import * as moment from 'moment';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterType, TimeFilterStyle } from '../shared/time-filter.enum';
var TimeFilterFormComponent = /** @class */ (function () {
    function TimeFilterFormComponent(dateAdapter) {
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
    Object.defineProperty(TimeFilterFormComponent.prototype, "currentValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                if (this.type !== TimeFilterType.YEAR) {
                    /** @type {?} */
                    var valueArray = value.split('/');
                    if (valueArray.length > 0) {
                        /** @type {?} */
                        var startDate = new Date(valueArray[0]);
                        /** @type {?} */
                        var endDate = new Date(valueArray[1]);
                        if (!isNaN(startDate.valueOf())) {
                            this.startDate = startDate;
                        }
                        if (!isNaN(endDate.valueOf())) {
                            this.endDate = endDate;
                        }
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.type === undefined
                ? TimeFilterType.DATE
                : this.options.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "isRange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.range === undefined ||
                this.options.style === TimeFilterStyle.SLIDER
                ? false
                : this.options.range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "style", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.style === undefined
                ? TimeFilterStyle.SLIDER
                : this.options.style;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var step = 10800000;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "timeInterval", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.timeInterval === undefined
                ? 2000
                : this.options.timeInterval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.options.min) {
                /** @type {?} */
                var min = new Date(this.options.min);
                return new Date(min.getTime() + min.getTimezoneOffset() * 60000);
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.options.max) {
                /** @type {?} */
                var max = new Date(this.options.max);
                return new Date(max.getTime() + max.getTimezoneOffset() * 60000);
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "is", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.range === undefined ? false : this.options.range;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
            for (var i = this.startYear; i <= this.endYear + 1; i++) {
                this.listYears.push(i);
            }
        }
        else {
            for (var i = this.startYear; i < this.endYear; i++) {
                this.startListYears.push(i);
            }
            for (var i = this.startYear + 1; i <= this.endYear; i++) {
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.storeCurrentFilterValue = /**
     * @return {?}
     */
    function () {
        // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
        if (!this.isRange &&
            this.style === TimeFilterStyle.SLIDER &&
            this.type === TimeFilterType.YEAR) {
            this.options.value = this.year.toString();
        }
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.checkFilterValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var timeFromWms = this.layer.dataSource.ol.getParams().TIME;
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
                var newStartListYears = [];
                /** @type {?} */
                var newEndListYears = [];
                for (var i = this.initStartYear; i < this.endYear; i++) {
                    newStartListYears.push(i);
                }
                for (var i = this.startYear + 1; i <= this.initEndYear; i++) {
                    newEndListYears.push(i);
                }
                this.startListYears = newStartListYears;
                this.endListYears = newEndListYears;
            }
        }
        // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleDateChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setupDateOutput();
        this.applyTypeChange();
        // Only if is range, use 2 dates to make the range
        if (this.isRange) {
            this.change.emit([this.startDate, this.endDate]);
        }
        else {
            this.change.emit(this.startDate);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleYearChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isRange) {
            this.endListYears = [];
            for (var i = this.startYear + 1; i <= this.initEndYear; i++) {
                this.endListYears.push(i);
            }
            this.startListYears = [];
            for (var i = this.initStartYear + 1; i < this.endYear; i++) {
                this.startListYears.push(i);
            }
            this.yearChange.emit([this.startYear, this.endYear]);
        }
        else {
            this.yearChange.emit(this.year);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleListYearChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleYearChange([this.startYear, this.endYear]);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleListYearStartChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.change.emit([this.startDate, this.endDate]);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    TimeFilterFormComponent.prototype.dateToNumber = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var newDate;
        if (date) {
            newDate = new Date(date);
        }
        else {
            newDate = new Date(this.min);
        }
        return newDate.getTime();
    };
    /**
     * @param {?} label
     * @return {?}
     */
    TimeFilterFormComponent.prototype.setSliderThumbLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        /** @type {?} */
        var thumbLabel = this.findThumbLabel(this.mySlider._elementRef.nativeElement.childNodes);
        if (thumbLabel) {
            thumbLabel.textContent = label;
        }
    };
    /**
     * @param {?} test
     * @return {?}
     */
    TimeFilterFormComponent.prototype.findThumbLabel = /**
     * @param {?} test
     * @return {?}
     */
    function (test) {
        var _this = this;
        /** @type {?} */
        var thumbLabel;
        test.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value.className === 'mat-slider-thumb-label-text') {
                thumbLabel = value;
            }
            if (value.children.length > 0 && !thumbLabel) {
                thumbLabel = _this.findThumbLabel(value.childNodes);
            }
        }), this);
        return thumbLabel;
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.toggleFilterState = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.resetFilter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.playFilter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.interval) {
            this.stopFilter();
        }
        else {
            this.playIcon = 'pause-circle';
            this.interval = setInterval((/**
             * @param {?} that
             * @return {?}
             */
            function (that) {
                /** @type {?} */
                var newMinDateNumber;
                /** @type {?} */
                var maxDateNumber = new Date(that.max);
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.playYear = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.stopFilter = /**
     * @return {?}
     */
    function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = undefined;
        this.playIcon = 'play-circle';
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleSliderDateChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.date = new Date(event.value);
        this.setSliderThumbLabel(this.handleSliderTooltip());
        this.handleDateChange(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleSliderYearChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.year = event.value;
        this.yearChange.emit(this.year);
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleSliderValue = /**
     * @return {?}
     */
    function () {
        if (this.options.current === true || !this.min) {
            /** @type {?} */
            var currentDate = new Date();
            this.date = this.getRoundedDate(currentDate);
        }
        if (this.type === TimeFilterType.YEAR) {
            return this.year;
        }
        else {
            return this.date === undefined ? this.min.getTime() : this.date.getTime();
        }
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.handleSliderTooltip = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var label;
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.setupDateOutput = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.applyTypeChange = /**
     * @return {?}
     */
    function () {
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
                        var selectedHour = this.startDate.getHours();
                        /** @type {?} */
                        var selectedMinute = this.startDate.getMinutes();
                        this.startDate = this.min;
                        this.startDate.setHours(selectedHour);
                        this.startDate.setMinutes(selectedMinute);
                    }
                    if (this.endDate.getDay() !== this.min.getDay()) {
                        /** @type {?} */
                        var selectedHour = this.endDate.getHours();
                        /** @type {?} */
                        var selectedMinute = this.endDate.getMinutes();
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.getRangeMinDate = /**
     * @return {?}
     */
    function () {
        return this.startDate === undefined ? this.min : this.startDate;
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.getRangeMaxDate = /**
     * @return {?}
     */
    function () {
        return this.endDate === undefined ? this.max : this.endDate;
    };
    /**
     * Round date at a certain time, 10 minutes by Default
     * @param date - Date to Round
     * @param atMinute - round to closest 'atMinute' minute, rounded 10 by default
     * @return the rounded date
     */
    /**
     * Round date at a certain time, 10 minutes by Default
     * @param {?} date - Date to Round
     * @param {?=} atMinute - round to closest 'atMinute' minute, rounded 10 by default
     * @return {?} the rounded date
     */
    TimeFilterFormComponent.prototype.getRoundedDate = /**
     * Round date at a certain time, 10 minutes by Default
     * @param {?} date - Date to Round
     * @param {?=} atMinute - round to closest 'atMinute' minute, rounded 10 by default
     * @return {?} the rounded date
     */
    function (date, atMinute) {
        if (atMinute === void 0) { atMinute = 10; }
        /** @type {?} */
        var coeff = 1000 * 60 * atMinute;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    };
    /**
     * Get the step (period) definition from the layer dimension tag
     * @param step The step as ISO 8601 example: PT10M for 10 Minutes
     * @return the duration in milliseconds
     */
    /**
     * Get the step (period) definition from the layer dimension tag
     * @param {?} step The step as ISO 8601 example: PT10M for 10 Minutes
     * @return {?} the duration in milliseconds
     */
    TimeFilterFormComponent.prototype.getStepDefinition = /**
     * Get the step (period) definition from the layer dimension tag
     * @param {?} step The step as ISO 8601 example: PT10M for 10 Minutes
     * @return {?} the duration in milliseconds
     */
    function (step) {
        return moment.duration(step).asMilliseconds();
    };
    TimeFilterFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-time-filter-form',
                    template: "<div *ngIf=\"style === 'calendar' && type !=='year'\">\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-form-field>\r\n      <mat-datetimepicker-toggle [for]=\"datetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n      <mat-datetimepicker #datetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n      <input matInput autocomplete=\"false\"\r\n        placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\"\r\n        [matDatetimepicker]=\"datetimePicker\"\r\n        [(ngModel)]=\"date\"\r\n        [min]=\"min\"\r\n        [max]=\"max\"\r\n        readonly=\"readonly\"\r\n        (dateChange)=\"handleDateChange($event)\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"minDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #minDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\"\r\n          [matDatetimepicker]=\"minDatetimePicker\"\r\n          [(ngModel)]=\"startDate\"\r\n          [min]=\"min\"\r\n          [max]=\"getRangeMaxDate()\"\r\n          readonly=\"readonly\"\r\n          (input)=\"startDate\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"maxDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #maxDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\"\r\n          [matDatetimepicker]=\"maxDatetimePicker\"\r\n          [(ngModel)]=\"endDate\"\r\n          [min]=\"getRangeMinDate()\"\r\n          [max]=\"max\"\r\n          readonly=\"readonly\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"style === 'calendar' && type ==='year'\">\r\n\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\" [(ngModel)]=\"year\" (selectionChange)=\"handleYearChange($event)\">\r\n                  <mat-option [value]=\"year\" *ngFor=\"let year of listYears\">{{year}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\" [(ngModel)]=\"startYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"startYear\" *ngFor=\"let startYear of startListYears\">{{startYear}}</mat-option>\r\n            </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n    <mat-form-field>\r\n        <mat-select placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\" [(ngModel)]=\"endYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"endYear\" *ngFor=\"let endYear of endListYears\">{{endYear}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n  <br>\r\n  <div *ngIf=\"!isRange && style === 'slider' && type === 'year'\" class=\"igo-col igo-col-100 igo-col-100-m mat-typography\">\r\n    <span>{{startYear}}</span>\r\n    <mat-slider\r\n        id=\"time-slider\"\r\n        tickInterval=\"auto\"\r\n        step=\"{{step}}\"\r\n        [min]=\"startYear\"\r\n        [max]=\"endYear\"\r\n        [value]=\"handleSliderValue()\"\r\n        [color]=\"color\"\r\n        thumbLabel\r\n        (input)=\"handleSliderYearChange($event)\"\r\n        (change)=\"handleSliderYearChange($event)\"\r\n        [disabled]= \"!options.enabled || !layer.visible\">\r\n    </mat-slider>\r\n    <span>{{endYear}}</span>\r\n    <p *ngIf= \"options.enabled\" class=\"date-below\">{{year}}</p>\r\n    <div #actions class=\"igo-layer-actions-container\">\r\n      <mat-slide-toggle (change)=\"toggleFilterState()\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"options.enabled\"\r\n        [disabled]=\"!layer.visible\">\r\n      </mat-slide-toggle>\r\n      <button [disabled]= \"!options.enabled  || !layer.visible\" mat-icon-button color=\"primary\" (click)=\"playYear($event)\">\r\n        <mat-icon svgIcon=\"{{playIcon}}\"></mat-icon>\r\n       </button>\r\n      <button [disabled]=\"!options.enabled  || !layer.visible\" mat-icon-button color=\"primary\" (click)=\"resetFilter($event)\">\r\n        <mat-icon svgIcon=\"{{resetIcon}}\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n<div *ngIf=\"style === 'slider' && type !== 'year'\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n  <mat-slider\r\n      id=\"time-slider\"\r\n      tickInterval=\"auto\"\r\n      step=\"{{step}}\"\r\n      [min]=\"dateToNumber(min)\"\r\n      [max]=\"dateToNumber(max)\"\r\n      [value]=\"handleSliderValue()\"\r\n      thumbLabel\r\n      (input)=\"handleSliderDateChange($event)\"\r\n      (selectionChange)=\"handleSliderDateChange($event)\">\r\n  </mat-slider>\r\n  <p class=\"date-below\">{{handleSliderTooltip()}}</p>\r\n  <button mat-icon-button color=\"primary\" (click)=\"playFilter($event)\">\r\n   <mat-icon svgIcon=\"{{playIcon}}\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                    styles: [".igo-layer-filters-container{padding-left:5px}mat-slider>>>div.mat-slider-thumb-label{width:32px;height:32px;margin:0 auto}mat-slider>>>span.mat-slider-thumb-label-text{font-size:10px}#time-slider{width:70%;margin:0 auto}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){#time-slider{width:60%;margin:0 auto}}.date-below{margin:0}mat-form-field{text-align:center}mat-datetimepicker-toggle ::ng-deep .mat-icon{padding-bottom:30px}.igo-layer-actions-container>.mat-slide-toggle{vertical-align:middle}"]
                }] }
    ];
    /** @nocollapse */
    TimeFilterFormComponent.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
    TimeFilterFormComponent.propDecorators = {
        layer: [{ type: Input }],
        options: [{ type: Input }],
        currentValue: [{ type: Input }],
        change: [{ type: Output }],
        yearChange: [{ type: Output }],
        mySlider: [{ type: ViewChild, args: [MatSlider,] }]
    };
    return TimeFilterFormComponent;
}());
export { TimeFilterFormComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWZvcm0vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFakMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0U7SUEwSEUsaUNBQW9CLFdBQThCO1FBQTlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQWhIM0MsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQVNsQixjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFDbkMsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBc0JqQyxhQUFRLEdBQUcsYUFBYSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxRQUFRLENBQUM7UUFFbEIsV0FBTSxHQUFzQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpFLGVBQVUsR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTJFdkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXJHRCxzQkFDSSxpREFBWTs7Ozs7UUFEaEIsVUFDaUIsS0FBYTtZQUM1QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFD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QXNCOztJQUV0QiwwQ0FBb0M7O0lBRXBDLHdDQUF5Qjs7SUFDekIsdUNBQWtCOztJQUNsQiw0Q0FBdUI7O0lBQ3ZCLDBDQUFxQjs7SUFDckIsdUNBQWlCOztJQUNqQiw0Q0FBc0I7O0lBQ3RCLDBDQUFvQjs7SUFDcEIsZ0RBQTBCOztJQUMxQiw4Q0FBd0I7O0lBQ3hCLDRDQUFxQzs7SUFDckMsaURBQTBDOztJQUMxQywrQ0FBd0M7O0lBcUJ4QywyQ0FBcUI7O0lBQ3JCLDJDQUFnQzs7SUFDaEMsNENBQTRCOztJQUU1Qix5Q0FBeUU7O0lBQ3pFLDZDQUN5RTs7SUFDekUsMkNBQStCOzs7OztJQXlFbkIsOENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNsaWRlciwgRGF0ZUFkYXB0ZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgVGltZUZpbHRlck9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlclR5cGUsIFRpbWVGaWx0ZXJTdHlsZSB9IGZyb20gJy4uL3NoYXJlZC90aW1lLWZpbHRlci5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IFRpbWVGaWx0ZXJPcHRpb25zO1xyXG5cclxuICBwdWJsaWMgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgcHVibGljIGRhdGU6IERhdGU7XHJcbiAgcHVibGljIHN0YXJ0RGF0ZTogRGF0ZTtcclxuICBwdWJsaWMgZW5kRGF0ZTogRGF0ZTtcclxuICBwdWJsaWMgeWVhcjogYW55O1xyXG4gIHB1YmxpYyBzdGFydFllYXI6IGFueTtcclxuICBwdWJsaWMgZW5kWWVhcjogYW55O1xyXG4gIHB1YmxpYyBpbml0U3RhcnRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGluaXRFbmRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGxpc3RZZWFyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHB1YmxpYyBzdGFydExpc3RZZWFyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHB1YmxpYyBlbmRMaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY3VycmVudFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy50eXBlICE9PSBUaW1lRmlsdGVyVHlwZS5ZRUFSKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVBcnJheSA9IHZhbHVlLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYgKHZhbHVlQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVswXSk7XHJcbiAgICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVsxXSk7XHJcbiAgICAgICAgICBpZiAoIWlzTmFOKHN0YXJ0RGF0ZS52YWx1ZU9mKCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFpc05hTihlbmREYXRlLnZhbHVlT2YoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnRlcnZhbDogYW55O1xyXG4gIHB1YmxpYyBwbGF5SWNvbiA9ICdwbGF5LWNpcmNsZSc7XHJcbiAgcHVibGljIHJlc2V0SWNvbiA9ICdyZXBsYXknO1xyXG5cclxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZSB8IFtEYXRlLCBEYXRlXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgeWVhckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U2xpZGVyKSBteVNsaWRlcjtcclxuXHJcbiAgZ2V0IHR5cGUoKTogVGltZUZpbHRlclR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50eXBlID09PSB1bmRlZmluZWRcclxuICAgICAgPyBUaW1lRmlsdGVyVHlwZS5EQVRFXHJcbiAgICAgIDogdGhpcy5vcHRpb25zLnR5cGU7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNSYW5nZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmFuZ2UgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5TTElERVJcclxuICAgICAgPyBmYWxzZVxyXG4gICAgICA6IHRoaXMub3B0aW9ucy5yYW5nZTtcclxuICB9XHJcblxyXG4gIGdldCBzdHlsZSgpOiBUaW1lRmlsdGVyU3R5bGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gVGltZUZpbHRlclN0eWxlLlNMSURFUlxyXG4gICAgICA6IHRoaXMub3B0aW9ucy5zdHlsZTtcclxuICB9XHJcblxyXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XHJcbiAgICBsZXQgc3RlcCA9IDEwODAwMDAwO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdGVwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLkRBVEU6XHJcbiAgICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5EQVRFVElNRTpcclxuICAgICAgICAgIHN0ZXAgPSAxMDgwMDAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuVElNRTpcclxuICAgICAgICAgIHN0ZXAgPSAzNjAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5ZRUFSOlxyXG4gICAgICAgICAgc3RlcCA9IDMxNTM2MDAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHN0ZXAgPSAxMDgwMDAwMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RlcCA9IHRoaXMuZ2V0U3RlcERlZmluaXRpb24odGhpcy5vcHRpb25zLnN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGVwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRpbWVJbnRlcnZhbCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lSW50ZXJ2YWwgPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IDIwMDBcclxuICAgICAgOiB0aGlzLm9wdGlvbnMudGltZUludGVydmFsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pbigpOiBEYXRlIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubWluKSB7XHJcbiAgICAgIGNvbnN0IG1pbiA9IG5ldyBEYXRlKHRoaXMub3B0aW9ucy5taW4pO1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUobWluLmdldFRpbWUoKSArIG1pbi5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBtYXgoKTogRGF0ZSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm1heCkge1xyXG4gICAgICBjb25zdCBtYXggPSBuZXcgRGF0ZSh0aGlzLm9wdGlvbnMubWF4KTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKG1heC5nZXRUaW1lKCkgKyBtYXguZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgaXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJhbmdlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRoaXMub3B0aW9ucy5yYW5nZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPERhdGU+KSB7XHJcbiAgICB0aGlzLmRhdGVBZGFwdGVyLnNldExvY2FsZSgnZnInKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodGhpcy5tYXgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdGFydFllYXIgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0RGF0ZSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgdGhpcy5pbml0U3RhcnRZZWFyID0gdGhpcy5zdGFydFllYXI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmRZZWFyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbmRZZWFyID0gbmV3IERhdGUodGhpcy5lbmREYXRlKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICB0aGlzLmluaXRFbmRZZWFyID0gdGhpcy5lbmRZZWFyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5pc1JhbmdlKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0WWVhcjsgaSA8PSB0aGlzLmVuZFllYXIgKyAxOyBpKyspIHtcclxuICAgICAgICB0aGlzLmxpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXI7IGkgPCB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXIgKyAxOyBpIDw9IHRoaXMuZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5lbmRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZWQgPVxyXG4gICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy5lbmFibGVkO1xyXG4gICAgdGhpcy5jaGVja0ZpbHRlclZhbHVlKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgdGhpcy5zdHlsZSA9PT0gJ3NsaWRlcicgJiYgdGhpcy50eXBlID09PSAneWVhcicpIHtcclxuICAgICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3JlQ3VycmVudEZpbHRlclZhbHVlKCk7XHJcbiAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHVuZGVmaW5lZCk7IC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcmVDdXJyZW50RmlsdGVyVmFsdWUoKSB7XHJcbiAgICAvLyBUT0RPOiBGSVggVEhJUyBmb3IgQUxMIE9USEVSIFRZUEVTIFNUWUxFUyBPUiBSQU5HRS5cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMuaXNSYW5nZSAmJlxyXG4gICAgICB0aGlzLnN0eWxlID09PSBUaW1lRmlsdGVyU3R5bGUuU0xJREVSICYmXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUlxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy52YWx1ZSA9IHRoaXMueWVhci50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tGaWx0ZXJWYWx1ZSgpIHtcclxuICAgIGNvbnN0IHRpbWVGcm9tV21zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9sLmdldFBhcmFtcygpLlRJTUU7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgdGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJlxyXG4gICAgICB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVJcclxuICAgICkge1xyXG4gICAgICBpZiAodGltZUZyb21XbXMpIHtcclxuICAgICAgICB0aGlzLnllYXIgPSBuZXcgRGF0ZSh0aW1lRnJvbVdtcy50b1N0cmluZygpKS5nZXRGdWxsWWVhcigpICsgMTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudmFsdWUpIHtcclxuICAgICAgICB0aGlzLnllYXIgPSBuZXcgRGF0ZSh0aGlzLm9wdGlvbnMudmFsdWUudG9TdHJpbmcoKSkuZ2V0RnVsbFllYXIoKSArIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gbmV3IERhdGUodGhpcy5taW4pLmdldEZ1bGxZZWFyKCkgKyAxO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgdGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLkNBTEVOREFSICYmXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUlxyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aW1lRnJvbVdtcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRZZWFyID0gcGFyc2VJbnQodGltZUZyb21XbXMuc3Vic3RyKDAsIDQpLCAxMCk7XHJcbiAgICAgICAgdGhpcy5lbmRZZWFyID0gcGFyc2VJbnQodGltZUZyb21XbXMuc3Vic3RyKDUsIDQpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbmV3U3RhcnRMaXN0WWVhcnM6IGFueVtdID0gW107XHJcbiAgICAgICAgY29uc3QgbmV3RW5kTGlzdFllYXJzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluaXRTdGFydFllYXI7IGkgPCB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgICAgbmV3U3RhcnRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyICsgMTsgaSA8PSB0aGlzLmluaXRFbmRZZWFyOyBpKyspIHtcclxuICAgICAgICAgIG5ld0VuZExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXJ0TGlzdFllYXJzID0gbmV3U3RhcnRMaXN0WWVhcnM7XHJcbiAgICAgICAgdGhpcy5lbmRMaXN0WWVhcnMgPSBuZXdFbmRMaXN0WWVhcnM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRGF0ZUNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnNldHVwRGF0ZU91dHB1dCgpO1xyXG4gICAgdGhpcy5hcHBseVR5cGVDaGFuZ2UoKTtcclxuXHJcbiAgICAvLyBPbmx5IGlmIGlzIHJhbmdlLCB1c2UgMiBkYXRlcyB0byBtYWtlIHRoZSByYW5nZVxyXG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZVllYXJDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xyXG4gICAgICB0aGlzLmVuZExpc3RZZWFycyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXIgKyAxOyBpIDw9IHRoaXMuaW5pdEVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZW5kTGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGFydExpc3RZZWFycyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5pbml0U3RhcnRZZWFyICsgMTsgaSA8IHRoaXMuZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0WWVhciwgdGhpcy5lbmRZZWFyXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTGlzdFllYXJDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKFt0aGlzLnN0YXJ0WWVhciwgdGhpcy5lbmRZZWFyXSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVMaXN0WWVhclN0YXJ0Q2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoW3RoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGVdKTtcclxuICB9XHJcblxyXG4gIGRhdGVUb051bWJlcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIGxldCBuZXdEYXRlO1xyXG4gICAgaWYgKGRhdGUpIHtcclxuICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWluKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3RGF0ZS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBzZXRTbGlkZXJUaHVtYkxhYmVsKGxhYmVsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRodW1iTGFiZWwgPSB0aGlzLmZpbmRUaHVtYkxhYmVsKFxyXG4gICAgICB0aGlzLm15U2xpZGVyLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlc1xyXG4gICAgKTtcclxuICAgIGlmICh0aHVtYkxhYmVsKSB7XHJcbiAgICAgIHRodW1iTGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRUaHVtYkxhYmVsKHRlc3Q6IGFueVtdKTogYW55IHtcclxuICAgIGxldCB0aHVtYkxhYmVsO1xyXG5cclxuICAgIHRlc3QuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZS5jbGFzc05hbWUgPT09ICdtYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHQnKSB7XHJcbiAgICAgICAgdGh1bWJMYWJlbCA9IHZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodmFsdWUuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhdGh1bWJMYWJlbCkge1xyXG4gICAgICAgIHRodW1iTGFiZWwgPSB0aGlzLmZpbmRUaHVtYkxhYmVsKHZhbHVlLmNoaWxkTm9kZXMpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIHJldHVybiB0aHVtYkxhYmVsO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRmlsdGVyU3RhdGUoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9ICF0aGlzLm9wdGlvbnMuZW5hYmxlZDtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICF0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgICBUaW1lRmlsdGVyU3R5bGUuU0xJREVSICYmXHJcbiAgICAgICAgdGhpcy50eXBlID09PSBUaW1lRmlsdGVyVHlwZS5ZRUFSXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHRoaXMueWVhcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgICB0aGlzLnN0b3JlQ3VycmVudEZpbHRlclZhbHVlKCk7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodW5kZWZpbmVkKTsgLy8gVE9ETzogRklYIFRISVMgZm9yIEFMTCBPVEhFUiBUWVBFUyBTVFlMRVMgT1IgUkFOR0UuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEZpbHRlcihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICB0aGlzLnllYXIgPSB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKSArIDE7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLmlzUmFuZ2UgJiZcclxuICAgICAgVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJlxyXG4gICAgICB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVJcclxuICAgICkge1xyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXR1cERhdGVPdXRwdXQoKTtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh1bmRlZmluZWQpOyAvLyBUT0RPOiBGSVggVEhJUyBmb3IgQUxMIE9USEVSIFRZUEVTIFNUWUxFUyBPUiBSQU5HRS5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYXlGaWx0ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zdG9wRmlsdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlJY29uID0gJ3BhdXNlLWNpcmNsZSc7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICB0aGF0ID0+IHtcclxuICAgICAgICAgIGxldCBuZXdNaW5EYXRlTnVtYmVyO1xyXG4gICAgICAgICAgY29uc3QgbWF4RGF0ZU51bWJlciA9IG5ldyBEYXRlKHRoYXQubWF4KTtcclxuXHJcbiAgICAgICAgICBuZXdNaW5EYXRlTnVtYmVyID1cclxuICAgICAgICAgICAgdGhhdC5kYXRlID09PSB1bmRlZmluZWQgPyB0aGF0Lm1pbi5nZXRUaW1lKCkgOiB0aGF0LmRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgbmV3TWluRGF0ZU51bWJlciArPSB0aGF0Lm15U2xpZGVyLnN0ZXA7XHJcbiAgICAgICAgICB0aGF0LmRhdGUgPSBuZXcgRGF0ZShuZXdNaW5EYXRlTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3TWluRGF0ZU51bWJlciA+IG1heERhdGVOdW1iZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc3RvcEZpbHRlcigpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoYXQuaGFuZGxlRGF0ZUNoYW5nZSh7IHZhbHVlOiB0aGF0LmRhdGUsIGRhdGU6IHRoYXQuZGF0ZSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMudGltZUludGVydmFsLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYXlZZWFyKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy55ZWFyICsgdGhpcy5teVNsaWRlci5zdGVwID5cclxuICAgICAgdGhpcy5tYXguZ2V0RnVsbFllYXIoKSArIHRoaXMubXlTbGlkZXIuc3RlcFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgICB0aGlzLnJlc2V0RmlsdGVyKGV2ZW50KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wbGF5SWNvbiA9ICdwYXVzZS1jaXJjbGUnO1xyXG4gICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm9ubHktYXJyb3ctZnVuY3Rpb25zXHJcbiAgICAgICAgZnVuY3Rpb24odGhhdCkge1xyXG4gICAgICAgICAgdGhhdC55ZWFyID0gdGhhdC55ZWFyICsgdGhhdC5teVNsaWRlci5zdGVwO1xyXG4gICAgICAgICAgaWYgKHRoYXQueWVhciA+IHRoYXQubWF4LmdldEZ1bGxZZWFyKCkpIHtcclxuICAgICAgICAgICAgdGhhdC5zdG9wRmlsdGVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGF0LnllYXJDaGFuZ2UuZW1pdCh0aGF0LnllYXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwsXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcEZpbHRlcigpIHtcclxuICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmludGVydmFsID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5wbGF5SWNvbiA9ICdwbGF5LWNpcmNsZSc7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJEYXRlQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGV2ZW50LnZhbHVlKTtcclxuICAgIHRoaXMuc2V0U2xpZGVyVGh1bWJMYWJlbCh0aGlzLmhhbmRsZVNsaWRlclRvb2x0aXAoKSk7XHJcbiAgICB0aGlzLmhhbmRsZURhdGVDaGFuZ2UoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlU2xpZGVyWWVhckNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnllYXIgPSBldmVudC52YWx1ZTtcclxuICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHRoaXMueWVhcik7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXJyZW50ID09PSB0cnVlIHx8ICF0aGlzLm1pbikge1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Um91bmRlZERhdGUoY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gVGltZUZpbHRlclR5cGUuWUVBUikge1xyXG4gICAgICByZXR1cm4gdGhpcy55ZWFyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5taW4uZ2V0VGltZSgpIDogdGhpcy5kYXRlLmdldFRpbWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlclRvb2x0aXAoKSB7XHJcbiAgICBsZXQgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLkRBVEU6XHJcbiAgICAgICAgbGFiZWwgPVxyXG4gICAgICAgICAgdGhpcy5kYXRlID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB0aGlzLm1pbi50b0RhdGVTdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5USU1FOlxyXG4gICAgICAgIGxhYmVsID1cclxuICAgICAgICAgIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gdGhpcy5taW4udG9UaW1lU3RyaW5nKClcclxuICAgICAgICAgICAgOiB0aGlzLmRhdGUudG9UaW1lU3RyaW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIC8vIGRhdGV0aW1lXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbGFiZWwgPVxyXG4gICAgICAgICAgdGhpcy5kYXRlID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB0aGlzLm1pbi50b1VUQ1N0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvVVRDU3RyaW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBEYXRlT3V0cHV0KCkge1xyXG4gICAgaWYgKHRoaXMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5TTElERVIpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUpO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRTZWNvbmRzKC0odGhpcy5zdGVwIC8gMTAwMCkpO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKHRoaXMuc3RlcCAvIDEwMDApO1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1JhbmdlICYmICEhdGhpcy5kYXRlKSB7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy5kYXRlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc1JhbmdlICYmICghIXRoaXMuZGF0ZSB8fCAhdGhpcy5kYXRlKSkge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKHRoaXMubWluKSA6IHRoaXMuc3RhcnREYXRlO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPVxyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5tYXgpIDogdGhpcy5lbmREYXRlO1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5kYXRlKSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID1cclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5taW4pIDogdGhpcy5zdGFydERhdGU7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1heCkgOiB0aGlzLmVuZERhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhcHBseVR5cGVDaGFuZ2UoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLkRBVEU6XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlICE9PSB1bmRlZmluZWQgfHwgdGhpcy5lbmREYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldEhvdXJzKDApO1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0TWludXRlcygwKTtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldFNlY29uZHMoMCk7XHJcbiAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0SG91cnMoMjMpO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldE1pbnV0ZXMoNTkpO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldFNlY29uZHMoNTkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5USU1FOlxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlID09PSBUaW1lRmlsdGVyU3R5bGUuQ0FMRU5EQVIpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5nZXREYXkoKSAhPT0gdGhpcy5taW4uZ2V0RGF5KCkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRIb3VyID0gdGhpcy5zdGFydERhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNaW51dGUgPSB0aGlzLnN0YXJ0RGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5taW47XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldEhvdXJzKHNlbGVjdGVkSG91cik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldE1pbnV0ZXMoc2VsZWN0ZWRNaW51dGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLmVuZERhdGUuZ2V0RGF5KCkgIT09IHRoaXMubWluLmdldERheSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSG91ciA9IHRoaXMuZW5kRGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1pbnV0ZSA9IHRoaXMuZW5kRGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0SG91cnMoc2VsZWN0ZWRIb3VyKTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlLnNldE1pbnV0ZXMoc2VsZWN0ZWRNaW51dGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgdGhpcy5zdGVwID4gNjAgKiA2MCAqIDEwMDApIHtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldE1pbnV0ZXMoMCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRTZWNvbmRzKDApO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldE1pbnV0ZXMoNTkpO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldFNlY29uZHMoNTkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgLy8gZGF0ZXRpbWVcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UmFuZ2VNaW5EYXRlKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQgPyB0aGlzLm1pbiA6IHRoaXMuc3RhcnREYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFuZ2VNYXhEYXRlKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuZW5kRGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5tYXggOiB0aGlzLmVuZERhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3VuZCBkYXRlIGF0IGEgY2VydGFpbiB0aW1lLCAxMCBtaW51dGVzIGJ5IERlZmF1bHRcclxuICAgKiBAcGFyYW0gZGF0ZSAtIERhdGUgdG8gUm91bmRcclxuICAgKiBAcGFyYW0gYXRNaW51dGUgLSByb3VuZCB0byBjbG9zZXN0ICdhdE1pbnV0ZScgbWludXRlLCByb3VuZGVkIDEwIGJ5IGRlZmF1bHRcclxuICAgKiBAcmV0dXJuIHRoZSByb3VuZGVkIGRhdGVcclxuICAgKi9cclxuICBnZXRSb3VuZGVkRGF0ZShkYXRlLCBhdE1pbnV0ZSA9IDEwKSB7XHJcbiAgICBjb25zdCBjb2VmZiA9IDEwMDAgKiA2MCAqIGF0TWludXRlO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKE1hdGgucm91bmQoZGF0ZS5nZXRUaW1lKCkgLyBjb2VmZikgKiBjb2VmZik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHN0ZXAgKHBlcmlvZCkgZGVmaW5pdGlvbiBmcm9tIHRoZSBsYXllciBkaW1lbnNpb24gdGFnXHJcbiAgICogQHBhcmFtIHN0ZXAgVGhlIHN0ZXAgYXMgSVNPIDg2MDEgZXhhbXBsZTogUFQxME0gZm9yIDEwIE1pbnV0ZXNcclxuICAgKiBAcmV0dXJuIHRoZSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHNcclxuICAgKi9cclxuICBnZXRTdGVwRGVmaW5pdGlvbihzdGVwKSB7XHJcbiAgICByZXR1cm4gbW9tZW50LmR1cmF0aW9uKHN0ZXApLmFzTWlsbGlzZWNvbmRzKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==