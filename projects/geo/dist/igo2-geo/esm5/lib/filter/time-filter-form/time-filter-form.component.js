/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';
import * as moment from 'moment';
import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterType, TimeFilterStyle } from '../shared/time-filter.enum';
var TimeFilterFormComponent = /** @class */ (function () {
    function TimeFilterFormComponent() {
        this.color = 'primary';
        this.listYears = [];
        this.startListYears = [];
        this.endListYears = [];
        this.playIcon = 'play-circle';
        this.resetIcon = 'replay';
        this.change = new EventEmitter();
        this.yearChange = new EventEmitter();
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
            return this.options.type === undefined ? TimeFilterType.DATE : this.options.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "isRange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.range === undefined || this.options.style === TimeFilterStyle.SLIDER
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
            return this.options.style === undefined ? TimeFilterStyle.SLIDER : this.options.style;
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
            return this.options.min === undefined
                ? undefined
                : new Date(this.options.min);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.max === undefined
                ? undefined
                : new Date(this.options.max);
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
            /** @type {?} */
            var utcmin = new Date(this.min);
            this.startDate = new Date(utcmin.getTime() + utcmin.getTimezoneOffset() * 60000);
        }
        if (this.endDate === undefined) {
            /** @type {?} */
            var utcmax = new Date(this.max);
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.storeCurrentFilterValue = /**
     * @return {?}
     */
    function () {
        // TODO: FIX THIS for ALL OTHER TYPES STYLES OR RANGE.
        if (!this.isRange && this.style === TimeFilterStyle.SLIDER && this.type === TimeFilterType.YEAR) {
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
            if (!this.isRange && TimeFilterStyle.SLIDER && this.type === TimeFilterType.YEAR) {
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
        if (!this.isRange && TimeFilterStyle.SLIDER && this.type === TimeFilterType.YEAR) {
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
                    styles: [".igo-layer-filters-container{padding-left:5px}mat-slider>>>div.mat-slider-thumb-label{width:32px;height:32px;margin:0 auto}mat-slider>>>span.mat-slider-thumb-label-text{font-size:10px}#time-slider{width:70%;margin:0 auto}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){#time-slider{width:60%;margin:0 auto}}.date-below{margin:0}mat-form-field{text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    TimeFilterFormComponent.ctorParameters = function () { return []; };
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWZvcm0vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RTtJQStHRTtRQXJHTyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBU2xCLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFzQmpDLGFBQVEsR0FBRyxhQUFhLENBQUM7UUFDekIsY0FBUyxHQUFHLFFBQVEsQ0FBQztRQUVsQixXQUFNLEdBQXNDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekUsZUFBVSxHQUE0QyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBK0QxRCxDQUFDO0lBeEZoQixzQkFDSSxpREFBWTs7Ozs7UUFEaEIsVUFDaUIsS0FBYTtZQUM1QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLElBQUksRUFBRTs7d0JBQy9CLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFDbkMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7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WSx1QkFBdUI7OztJQUNsQyx3Q0FBc0I7O0lBRXRCLDBDQUFvQzs7SUFFcEMsd0NBQXlCOztJQUN6Qix1Q0FBa0I7O0lBQ2xCLDRDQUF1Qjs7SUFDdkIsMENBQXFCOztJQUNyQix1Q0FBaUI7O0lBQ2pCLDRDQUFzQjs7SUFDdEIsMENBQW9COztJQUNwQixnREFBMEI7O0lBQzFCLDhDQUF3Qjs7SUFDeEIsNENBQXFDOztJQUNyQyxpREFBMEM7O0lBQzFDLCtDQUF3Qzs7SUFxQnhDLDJDQUFxQjs7SUFDckIsMkNBQWdDOztJQUNoQyw0Q0FBNEI7O0lBRTVCLHlDQUF5RTs7SUFDekUsNkNBQ3lFOztJQUN6RSwyQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0U2xpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL3RpbWUtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJUeXBlLCBUaW1lRmlsdGVyU3R5bGUgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuZW51bSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10aW1lLWZpbHRlci1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lRmlsdGVyRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zOiBUaW1lRmlsdGVyT3B0aW9ucztcclxuXHJcbiAgcHVibGljIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIHB1YmxpYyBkYXRlOiBEYXRlO1xyXG4gIHB1YmxpYyBzdGFydERhdGU6IERhdGU7XHJcbiAgcHVibGljIGVuZERhdGU6IERhdGU7XHJcbiAgcHVibGljIHllYXI6IGFueTtcclxuICBwdWJsaWMgc3RhcnRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGVuZFllYXI6IGFueTtcclxuICBwdWJsaWMgaW5pdFN0YXJ0WWVhcjogYW55O1xyXG4gIHB1YmxpYyBpbml0RW5kWWVhcjogYW55O1xyXG4gIHB1YmxpYyBsaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwdWJsaWMgc3RhcnRMaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwdWJsaWMgZW5kTGlzdFllYXJzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGN1cnJlbnRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gVGltZUZpbHRlclR5cGUuWUVBUikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlQXJyYXkgPSB2YWx1ZS5zcGxpdCgnLycpO1xyXG4gICAgICAgIGlmICh2YWx1ZUFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHZhbHVlQXJyYXlbMF0pO1xyXG4gICAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHZhbHVlQXJyYXlbMV0pO1xyXG4gICAgICAgICAgaWYgKCFpc05hTihzdGFydERhdGUudmFsdWVPZigpKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghaXNOYU4oZW5kRGF0ZS52YWx1ZU9mKCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IGVuZERhdGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW50ZXJ2YWw6IGFueTtcclxuICBwdWJsaWMgcGxheUljb24gPSAncGxheS1jaXJjbGUnO1xyXG4gIHB1YmxpYyByZXNldEljb24gPSAncmVwbGF5JztcclxuXHJcbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGUgfCBbRGF0ZSwgRGF0ZV0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIHllYXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAVmlld0NoaWxkKE1hdFNsaWRlcikgbXlTbGlkZXI7XHJcblxyXG4gIGdldCB0eXBlKCk6IFRpbWVGaWx0ZXJUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudHlwZSA9PT0gdW5kZWZpbmVkID8gVGltZUZpbHRlclR5cGUuREFURSA6IHRoaXMub3B0aW9ucy50eXBlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzUmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJhbmdlID09PSB1bmRlZmluZWQgfHwgdGhpcy5vcHRpb25zLnN0eWxlID09PSBUaW1lRmlsdGVyU3R5bGUuU0xJREVSXHJcbiAgICAgID8gZmFsc2VcclxuICAgICAgOiB0aGlzLm9wdGlvbnMucmFuZ2U7XHJcbiAgfVxyXG5cclxuICBnZXQgc3R5bGUoKTogVGltZUZpbHRlclN0eWxlIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc3R5bGUgPT09IHVuZGVmaW5lZCA/IFRpbWVGaWx0ZXJTdHlsZS5TTElERVIgOiB0aGlzLm9wdGlvbnMuc3R5bGU7XHJcbiAgfVxyXG5cclxuICBnZXQgc3RlcCgpOiBudW1iZXIge1xyXG4gICAgbGV0IHN0ZXAgPSAxMDgwMDAwMDtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RlcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBUaW1lRmlsdGVyVHlwZS5EQVRFOlxyXG4gICAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuREFURVRJTUU6XHJcbiAgICAgICAgICBzdGVwID0gMTA4MDAwMDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLlRJTUU6XHJcbiAgICAgICAgICBzdGVwID0gMzYwMDAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuWUVBUjpcclxuICAgICAgICAgIHN0ZXAgPSAzMTUzNjAwMDAwMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBzdGVwID0gMTA4MDAwMDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0ZXAgPSB0aGlzLmdldFN0ZXBEZWZpbml0aW9uKHRoaXMub3B0aW9ucy5zdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RlcDtcclxuICB9XHJcblxyXG4gIGdldCB0aW1lSW50ZXJ2YWwoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGltZUludGVydmFsID09PSB1bmRlZmluZWRcclxuICAgICAgPyAyMDAwXHJcbiAgICAgIDogdGhpcy5vcHRpb25zLnRpbWVJbnRlcnZhbDtcclxuICB9XHJcblxyXG4gIGdldCBtaW4oKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm1pbiA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgIDogbmV3IERhdGUodGhpcy5vcHRpb25zLm1pbik7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4KCk6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5tYXggPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICA6IG5ldyBEYXRlKHRoaXMub3B0aW9ucy5tYXgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yYW5nZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiB0aGlzLm9wdGlvbnMucmFuZ2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgdXRjbWluID0gbmV3IERhdGUodGhpcy5taW4pO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKFxyXG4gICAgICAgIHV0Y21pbi5nZXRUaW1lKCkgKyB1dGNtaW4uZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgdXRjbWF4ID0gbmV3IERhdGUodGhpcy5tYXgpO1xyXG4gICAgICB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICB1dGNtYXguZ2V0VGltZSgpICsgdXRjbWF4LmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdGFydFllYXIgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0RGF0ZSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgdGhpcy5pbml0U3RhcnRZZWFyID0gdGhpcy5zdGFydFllYXI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmRZZWFyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbmRZZWFyID0gbmV3IERhdGUodGhpcy5lbmREYXRlKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICB0aGlzLmluaXRFbmRZZWFyID0gdGhpcy5lbmRZZWFyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5pc1JhbmdlKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0WWVhcjsgaSA8PSB0aGlzLmVuZFllYXIgKyAxOyBpKyspIHtcclxuICAgICAgICB0aGlzLmxpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXI7IGkgPCB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXIgKyAxOyBpIDw9IHRoaXMuZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5lbmRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZWQgPSB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy5lbmFibGVkO1xyXG4gICAgdGhpcy5jaGVja0ZpbHRlclZhbHVlKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgdGhpcy5zdHlsZSA9PT0gJ3NsaWRlcicgJiYgdGhpcy50eXBlID09PSAneWVhcicpIHtcclxuICAgICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3JlQ3VycmVudEZpbHRlclZhbHVlKCk7XHJcbiAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KHVuZGVmaW5lZCk7IC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcmVDdXJyZW50RmlsdGVyVmFsdWUoKSB7XHJcbiAgICAvLyBUT0RPOiBGSVggVEhJUyBmb3IgQUxMIE9USEVSIFRZUEVTIFNUWUxFUyBPUiBSQU5HRS5cclxuICAgIGlmICghdGhpcy5pc1JhbmdlICYmIHRoaXMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5TTElERVIgJiYgdGhpcy50eXBlID09PSBUaW1lRmlsdGVyVHlwZS5ZRUFSKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnZhbHVlID0gdGhpcy55ZWFyLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0ZpbHRlclZhbHVlKCkge1xyXG4gICAgY29uc3QgdGltZUZyb21XbXMgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wuZ2V0UGFyYW1zKCkuVElNRTtcclxuICAgIGlmICghdGhpcy5pc1JhbmdlICYmIHRoaXMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5TTElERVIgJiYgdGhpcy50eXBlID09PSBUaW1lRmlsdGVyVHlwZS5ZRUFSKSB7XHJcbiAgICAgIGlmICh0aW1lRnJvbVdtcykge1xyXG4gICAgICAgIHRoaXMueWVhciA9IG5ldyBEYXRlKHRpbWVGcm9tV21zLnRvU3RyaW5nKCkpLmdldEZ1bGxZZWFyKCkgKyAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy52YWx1ZSkge1xyXG4gICAgICAgIHRoaXMueWVhciA9IG5ldyBEYXRlKHRoaXMub3B0aW9ucy52YWx1ZS50b1N0cmluZygpKS5nZXRGdWxsWWVhcigpICsgMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnllYXIgPSBuZXcgRGF0ZSh0aGlzLm1pbikuZ2V0RnVsbFllYXIoKSArIDE7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRGF0ZUNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnNldHVwRGF0ZU91dHB1dCgpO1xyXG4gICAgdGhpcy5hcHBseVR5cGVDaGFuZ2UoKTtcclxuXHJcbiAgICAvLyBPbmx5IGlmIGlzIHJhbmdlLCB1c2UgMiBkYXRlcyB0byBtYWtlIHRoZSByYW5nZVxyXG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZVllYXJDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xyXG4gICAgICB0aGlzLmVuZExpc3RZZWFycyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXIgKyAxOyBpIDw9IHRoaXMuaW5pdEVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZW5kTGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGFydExpc3RZZWFycyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5pbml0U3RhcnRZZWFyICsgMTsgaSA8IHRoaXMuZW5kWWVhcjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMueWVhckNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0WWVhciwgdGhpcy5lbmRZZWFyXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTGlzdFllYXJDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5oYW5kbGVZZWFyQ2hhbmdlKFt0aGlzLnN0YXJ0WWVhciwgdGhpcy5lbmRZZWFyXSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVMaXN0WWVhclN0YXJ0Q2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoW3RoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGVdKTtcclxuICB9XHJcblxyXG4gIGRhdGVUb051bWJlcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIGxldCBuZXdEYXRlO1xyXG4gICAgaWYgKGRhdGUpIHtcclxuICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMubWluKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3RGF0ZS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBzZXRTbGlkZXJUaHVtYkxhYmVsKGxhYmVsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRodW1iTGFiZWwgPSB0aGlzLmZpbmRUaHVtYkxhYmVsKFxyXG4gICAgICB0aGlzLm15U2xpZGVyLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlc1xyXG4gICAgKTtcclxuICAgIGlmICh0aHVtYkxhYmVsKSB7XHJcbiAgICAgIHRodW1iTGFiZWwudGV4dENvbnRlbnQgPSBsYWJlbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRUaHVtYkxhYmVsKHRlc3Q6IGFueVtdKTogYW55IHtcclxuICAgIGxldCB0aHVtYkxhYmVsO1xyXG5cclxuICAgIHRlc3QuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZS5jbGFzc05hbWUgPT09ICdtYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHQnKSB7XHJcbiAgICAgICAgdGh1bWJMYWJlbCA9IHZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodmFsdWUuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhdGh1bWJMYWJlbCkge1xyXG4gICAgICAgIHRodW1iTGFiZWwgPSB0aGlzLmZpbmRUaHVtYkxhYmVsKHZhbHVlLmNoaWxkTm9kZXMpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIHJldHVybiB0aHVtYkxhYmVsO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRmlsdGVyU3RhdGUoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9ICF0aGlzLm9wdGlvbnMuZW5hYmxlZDtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJiB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVIpIHtcclxuICAgICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdCh0aGlzLnllYXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3BGaWx0ZXIoKTtcclxuICAgICAgdGhpcy5zdG9yZUN1cnJlbnRGaWx0ZXJWYWx1ZSgpO1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHVuZGVmaW5lZCk7IC8vIFRPRE86IEZJWCBUSElTIGZvciBBTEwgT1RIRVIgVFlQRVMgU1RZTEVTIE9SIFJBTkdFLlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRGaWx0ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUodGhpcy5taW4pO1xyXG4gICAgdGhpcy55ZWFyID0gdGhpcy5kYXRlLmdldEZ1bGxZZWFyKCkgKyAxO1xyXG4gICAgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgVGltZUZpbHRlclN0eWxlLlNMSURFUiAmJiB0aGlzLnR5cGUgPT09IFRpbWVGaWx0ZXJUeXBlLllFQVIpIHtcclxuICAgICAgdGhpcy55ZWFyQ2hhbmdlLmVtaXQodGhpcy55ZWFyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0dXBEYXRlT3V0cHV0KCk7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodW5kZWZpbmVkKTsgLy8gVE9ETzogRklYIFRISVMgZm9yIEFMTCBPVEhFUiBUWVBFUyBTVFlMRVMgT1IgUkFOR0UuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGF5RmlsdGVyKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgIHRoaXMuc3RvcEZpbHRlcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wbGF5SWNvbiA9ICdwYXVzZS1jaXJjbGUnO1xyXG4gICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgKHRoYXQpID0+IHtcclxuICAgICAgICAgIGxldCBuZXdNaW5EYXRlTnVtYmVyO1xyXG4gICAgICAgICAgY29uc3QgbWF4RGF0ZU51bWJlciA9IG5ldyBEYXRlKHRoYXQubWF4KTtcclxuXHJcbiAgICAgICAgICBuZXdNaW5EYXRlTnVtYmVyID1cclxuICAgICAgICAgICAgdGhhdC5kYXRlID09PSB1bmRlZmluZWQgPyB0aGF0Lm1pbi5nZXRUaW1lKCkgOiB0aGF0LmRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgbmV3TWluRGF0ZU51bWJlciArPSB0aGF0Lm15U2xpZGVyLnN0ZXA7XHJcbiAgICAgICAgICB0aGF0LmRhdGUgPSBuZXcgRGF0ZShuZXdNaW5EYXRlTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3TWluRGF0ZU51bWJlciA+IG1heERhdGVOdW1iZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc3RvcEZpbHRlcigpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoYXQuaGFuZGxlRGF0ZUNoYW5nZSh7IHZhbHVlOiB0aGF0LmRhdGUsIGRhdGU6IHRoYXQuZGF0ZSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMudGltZUludGVydmFsLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYXlZZWFyKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnllYXIgKyB0aGlzLm15U2xpZGVyLnN0ZXAgPiAodGhpcy5tYXguZ2V0RnVsbFllYXIoKSArIHRoaXMubXlTbGlkZXIuc3RlcCkpIHtcclxuICAgICAgdGhpcy5zdG9wRmlsdGVyKCk7XHJcbiAgICAgIHRoaXMucmVzZXRGaWx0ZXIoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zdG9wRmlsdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlJY29uID0gJ3BhdXNlLWNpcmNsZSc7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b25seS1hcnJvdy1mdW5jdGlvbnNcclxuICAgICAgICBmdW5jdGlvbih0aGF0KSB7XHJcbiAgICAgICAgICB0aGF0LnllYXIgPSB0aGF0LnllYXIgKyB0aGF0Lm15U2xpZGVyLnN0ZXA7XHJcbiAgICAgICAgICBpZiAodGhhdC55ZWFyID4gdGhhdC5tYXguZ2V0RnVsbFllYXIoKSkge1xyXG4gICAgICAgICAgICB0aGF0LnN0b3BGaWx0ZXIoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoYXQueWVhckNoYW5nZS5lbWl0KHRoYXQueWVhcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbCxcclxuICAgICAgICB0aGlzXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9wRmlsdGVyKCkge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW50ZXJ2YWwgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnBsYXlJY29uID0gJ3BsYXktY2lyY2xlJztcclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlckRhdGVDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZXZlbnQudmFsdWUpO1xyXG4gICAgdGhpcy5zZXRTbGlkZXJUaHVtYkxhYmVsKHRoaXMuaGFuZGxlU2xpZGVyVG9vbHRpcCgpKTtcclxuICAgIHRoaXMuaGFuZGxlRGF0ZUNoYW5nZShldmVudCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJZZWFyQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMueWVhciA9IGV2ZW50LnZhbHVlO1xyXG4gICAgdGhpcy55ZWFyQ2hhbmdlLmVtaXQodGhpcy55ZWFyKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlclZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmN1cnJlbnQgPT09IHRydWUgfHwgIXRoaXMubWluKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgdGhpcy5kYXRlID0gdGhpcy5nZXRSb3VuZGVkRGF0ZShjdXJyZW50RGF0ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50eXBlID09PSBUaW1lRmlsdGVyVHlwZS5ZRUFSKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnllYXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRlID09PSB1bmRlZmluZWQgPyB0aGlzLm1pbi5nZXRUaW1lKCkgOiB0aGlzLmRhdGUuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlU2xpZGVyVG9vbHRpcCgpIHtcclxuICAgIGxldCBsYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuREFURTpcclxuICAgICAgICBsYWJlbCA9XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IHRoaXMubWluLnRvRGF0ZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLlRJTUU6XHJcbiAgICAgICAgbGFiZWwgPVxyXG4gICAgICAgICAgdGhpcy5kYXRlID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB0aGlzLm1pbi50b1RpbWVTdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZS50b1RpbWVTdHJpbmcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgLy8gZGF0ZXRpbWVcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBsYWJlbCA9XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IHRoaXMubWluLnRvVVRDU3RyaW5nKClcclxuICAgICAgICAgICAgOiB0aGlzLmRhdGUudG9VVENTdHJpbmcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbiAgfVxyXG5cclxuICBzZXR1cERhdGVPdXRwdXQoKSB7XHJcbiAgICBpZiAodGhpcy5zdHlsZSA9PT0gVGltZUZpbHRlclN0eWxlLlNMSURFUikge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlLnNldFNlY29uZHMoLSh0aGlzLnN0ZXAgLyAxMDAwKSk7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgdGhpcy5lbmREYXRlLnNldFNlY29uZHModGhpcy5zdGVwIC8gMTAwMCk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgISF0aGlzLmRhdGUpIHtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodGhpcy5kYXRlKTtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzUmFuZ2UgJiYgKCEhdGhpcy5kYXRlIHx8ICF0aGlzLmRhdGUpKSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID1cclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5taW4pIDogdGhpcy5zdGFydERhdGU7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1heCkgOiB0aGlzLmVuZERhdGU7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmRhdGUpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPVxyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1pbikgOiB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgdGhpcy5lbmREYXRlID1cclxuICAgICAgICB0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKHRoaXMubWF4KSA6IHRoaXMuZW5kRGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFwcGx5VHlwZUNoYW5nZSgpIHtcclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgVGltZUZpbHRlclR5cGUuREFURTpcclxuICAgICAgICBpZiAodGhpcy5zdGFydERhdGUgIT09IHVuZGVmaW5lZCB8fCB0aGlzLmVuZERhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0SG91cnMoMCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRNaW51dGVzKDApO1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0U2Vjb25kcygwKTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRIb3VycygyMyk7XHJcbiAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0TWludXRlcyg1OSk7XHJcbiAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0U2Vjb25kcyg1OSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFRpbWVGaWx0ZXJUeXBlLlRJTUU6XHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGUgPT09IFRpbWVGaWx0ZXJTdHlsZS5DQUxFTkRBUikge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlLmdldERheSgpICE9PSB0aGlzLm1pbi5nZXREYXkoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEhvdXIgPSB0aGlzLnN0YXJ0RGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1pbnV0ZSA9IHRoaXMuc3RhcnREYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0SG91cnMoc2VsZWN0ZWRIb3VyKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0TWludXRlcyhzZWxlY3RlZE1pbnV0ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZS5nZXREYXkoKSAhPT0gdGhpcy5taW4uZ2V0RGF5KCkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRIb3VyID0gdGhpcy5lbmREYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTWludXRlID0gdGhpcy5lbmREYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5taW47XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRIb3VycyhzZWxlY3RlZEhvdXIpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0TWludXRlcyhzZWxlY3RlZE1pbnV0ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNSYW5nZSAmJiB0aGlzLnN0ZXAgPiA2MCAqIDYwICogMTAwMCkge1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0TWludXRlcygwKTtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldFNlY29uZHMoMCk7XHJcbiAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0TWludXRlcyg1OSk7XHJcbiAgICAgICAgICB0aGlzLmVuZERhdGUuc2V0U2Vjb25kcyg1OSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAvLyBkYXRldGltZVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSYW5nZU1pbkRhdGUoKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGFydERhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMubWluIDogdGhpcy5zdGFydERhdGU7XHJcbiAgfVxyXG5cclxuICBnZXRSYW5nZU1heERhdGUoKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQgPyB0aGlzLm1heCA6IHRoaXMuZW5kRGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdW5kIGRhdGUgYXQgYSBjZXJ0YWluIHRpbWUsIDEwIG1pbnV0ZXMgYnkgRGVmYXVsdFxyXG4gICAqIEBwYXJhbSBkYXRlIC0gRGF0ZSB0byBSb3VuZFxyXG4gICAqIEBwYXJhbSBhdE1pbnV0ZSAtIHJvdW5kIHRvIGNsb3Nlc3QgJ2F0TWludXRlJyBtaW51dGUsIHJvdW5kZWQgMTAgYnkgZGVmYXVsdFxyXG4gICAqIEByZXR1cm4gdGhlIHJvdW5kZWQgZGF0ZVxyXG4gICAqL1xyXG4gIGdldFJvdW5kZWREYXRlKGRhdGUsIGF0TWludXRlID0gMTApIHtcclxuICAgIGNvbnN0IGNvZWZmID0gMTAwMCAqIDYwICogYXRNaW51dGU7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoTWF0aC5yb3VuZChkYXRlLmdldFRpbWUoKSAvIGNvZWZmKSAqIGNvZWZmKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc3RlcCAocGVyaW9kKSBkZWZpbml0aW9uIGZyb20gdGhlIGxheWVyIGRpbWVuc2lvbiB0YWdcclxuICAgKiBAcGFyYW0gc3RlcCBUaGUgc3RlcCBhcyBJU08gODYwMSBleGFtcGxlOiBQVDEwTSBmb3IgMTAgTWludXRlc1xyXG4gICAqIEByZXR1cm4gdGhlIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kc1xyXG4gICAqL1xyXG4gIGdldFN0ZXBEZWZpbml0aW9uKHN0ZXApIHtcclxuICAgIHJldHVybiBtb21lbnQuZHVyYXRpb24oc3RlcCkuYXNNaWxsaXNlY29uZHMoKTtcclxuICB9XHJcbn1cclxuIl19