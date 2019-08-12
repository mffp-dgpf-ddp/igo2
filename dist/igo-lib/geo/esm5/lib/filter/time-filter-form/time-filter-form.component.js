/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';
import * as moment from 'moment';
var TimeFilterFormComponent = /** @class */ (function () {
    function TimeFilterFormComponent() {
        this.listYears = [];
        this.startListYears = [];
        this.endListYears = [];
        this.playIcon = 'play_circle_filled';
        this.change = new EventEmitter();
        this.yearChange = new EventEmitter();
    }
    Object.defineProperty(TimeFilterFormComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this._options;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "currentValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                if (this.type !== 'year') {
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
            return this.options.type === undefined ? 'date' : this.options.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFilterFormComponent.prototype, "isRange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.range === undefined || this.options.style === 'slider'
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
            return this.options.style === undefined ? 'slider' : this.options.style;
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
            this.playIcon = 'pause_circle_filled';
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
        this.playIcon = 'play_circle_filled';
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
        return this.date === undefined ? this.min.getTime() : this.date.getTime();
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.setupDateOutput = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    TimeFilterFormComponent.prototype.applyTypeChange = /**
     * @return {?}
     */
    function () {
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
                    template: "<!-- <div *ngIf=\"style === 'calendar' && type !=='year'\">\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-form-field>\r\n      <mat-datetimepicker-toggle [for]=\"datetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n      <mat-datetimepicker #datetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n      <input matInput autocomplete=\"false\"\r\n        placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\"\r\n        [matDatetimepicker]=\"datetimePicker\"\r\n        [(ngModel)]=\"date\"\r\n        [min]=\"min\"\r\n        [max]=\"max\"\r\n        readonly=\"readonly\"\r\n        (dateChange)=\"handleDateChange($event)\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"minDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #minDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\"\r\n          [matDatetimepicker]=\"minDatetimePicker\"\r\n          [(ngModel)]=\"startDate\"\r\n          [min]=\"min\"\r\n          [max]=\"getRangeMaxDate()\"\r\n          readonly=\"readonly\"\r\n          (input)=\"startDate\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"maxDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #maxDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\"\r\n          [matDatetimepicker]=\"maxDatetimePicker\"\r\n          [(ngModel)]=\"endDate\"\r\n          [min]=\"getRangeMinDate()\"\r\n          [max]=\"max\"\r\n          readonly=\"readonly\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"style === 'calendar' && type ==='year'\">\r\n\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\" [(ngModel)]=\"year\" (selectionChange)=\"handleYearChange($event)\">\r\n                  <mat-option [value]=\"year\" *ngFor=\"let year of listYears\">{{year}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\" [(ngModel)]=\"startYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"startYear\" *ngFor=\"let startYear of startListYears\">{{startYear}}</mat-option>\r\n            </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n    <mat-form-field>\r\n        <mat-select placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\" [(ngModel)]=\"endYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"endYear\" *ngFor=\"let endYear of endListYears\">{{endYear}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n  <br>\r\n\r\n\r\n<div *ngIf=\"style === 'slider'\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n  <mat-slider\r\n      id=\"time-slider\"\r\n      tickInterval=\"auto\"\r\n      step=\"{{step}}\"\r\n      [min]=\"dateToNumber(min)\"\r\n      [max]=\"dateToNumber(max)\"\r\n      [value]=\"handleSliderValue()\"\r\n      thumbLabel\r\n      (input)=\"handleSliderDateChange($event)\"\r\n      (selectionChange)=\"handleSliderDateChange($event)\">\r\n  </mat-slider>\r\n  <p class=\"date-below\">{{handleSliderTooltip()}}</p>\r\n  <button mat-icon-button color=\"primary\" (click)=\"playFilter($event)\">\r\n   <mat-icon svgIcon=\"{{playIcon}}\"></mat-icon>\r\n  </button>\r\n</div> -->\r\n",
                    styles: [".igo-layer-filters-container{padding-left:5px}mat-slider>>>div.mat-slider-thumb-label{width:32px;height:32px;margin:0 auto}mat-slider>>>span.mat-slider-thumb-label-text{font-size:8px}#time-slider{width:70%;margin:0 auto}@media only screen and (max-width:450px),only screen and (max-height:450px){#time-slider{width:60%;margin:0 auto}}#playFilterIcon{font-size:32px;cursor:pointer}.date-below{margin:0}mat-form-field{text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    TimeFilterFormComponent.ctorParameters = function () { return []; };
    TimeFilterFormComponent.propDecorators = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3RpbWUtZmlsdGVyLWZvcm0vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUlqQztJQWtIRTtRQTNGTyxjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFDbkMsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBc0JqQyxhQUFRLEdBQUcsb0JBQW9CLENBQUM7UUFFN0IsV0FBTSxHQUFzQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpFLGVBQVUsR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStEMUQsQ0FBQztJQTVHaEIsc0JBQ0ksNENBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQUNELFVBQVksS0FBd0I7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSEE7SUFrQkQsc0JBQ0ksaURBQVk7Ozs7O1FBRGhCLFVBQ2lCLEtBQWE7WUFDNUIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTs7d0JBQ2xCLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFDbkMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7NEJBQ25CLFNBQVMsR0FB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LElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hELENBQUM7O2dCQXhZRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsaXpJQUFnRDs7aUJBRWpEOzs7OzswQkFFRSxLQUFLOytCQXFCTCxLQUFLO3lCQXNCTCxNQUFNOzZCQUNOLE1BQU07MkJBRU4sU0FBUyxTQUFDLFNBQVM7O0lBcVZ0Qiw4QkFBQztDQUFBLEFBellELElBeVlDO1NBcFlZLHVCQUF1Qjs7Ozs7O0lBUWxDLDJDQUFvQzs7SUFFcEMsdUNBQWtCOztJQUNsQiw0Q0FBdUI7O0lBQ3ZCLDBDQUFxQjs7SUFDckIsdUNBQWlCOztJQUNqQiw0Q0FBc0I7O0lBQ3RCLDBDQUFvQjs7SUFDcEIsZ0RBQTBCOztJQUMxQiw4Q0FBd0I7O0lBQ3hCLDRDQUFxQzs7SUFDckMsaURBQTBDOztJQUMxQywrQ0FBd0M7O0lBcUJ4QywyQ0FBcUI7O0lBQ3JCLDJDQUF1Qzs7SUFFdkMseUNBQXlFOztJQUN6RSw2Q0FDeUU7O0lBQ3pFLDJDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgVGltZUZpbHRlck9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvdGltZS1maWx0ZXIuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXRpbWUtZmlsdGVyLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBvcHRpb25zKCk6IFRpbWVGaWx0ZXJPcHRpb25zIHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuICBzZXQgb3B0aW9ucyh2YWx1ZTogVGltZUZpbHRlck9wdGlvbnMpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogVGltZUZpbHRlck9wdGlvbnM7XHJcblxyXG4gIHB1YmxpYyBkYXRlOiBEYXRlO1xyXG4gIHB1YmxpYyBzdGFydERhdGU6IERhdGU7XHJcbiAgcHVibGljIGVuZERhdGU6IERhdGU7XHJcbiAgcHVibGljIHllYXI6IGFueTtcclxuICBwdWJsaWMgc3RhcnRZZWFyOiBhbnk7XHJcbiAgcHVibGljIGVuZFllYXI6IGFueTtcclxuICBwdWJsaWMgaW5pdFN0YXJ0WWVhcjogYW55O1xyXG4gIHB1YmxpYyBpbml0RW5kWWVhcjogYW55O1xyXG4gIHB1YmxpYyBsaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwdWJsaWMgc3RhcnRMaXN0WWVhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwdWJsaWMgZW5kTGlzdFllYXJzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGN1cnJlbnRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ3llYXInKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVBcnJheSA9IHZhbHVlLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYgKHZhbHVlQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVswXSk7XHJcbiAgICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUodmFsdWVBcnJheVsxXSk7XHJcbiAgICAgICAgICBpZiAoIWlzTmFOKHN0YXJ0RGF0ZS52YWx1ZU9mKCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFpc05hTihlbmREYXRlLnZhbHVlT2YoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnRlcnZhbDogYW55O1xyXG4gIHB1YmxpYyBwbGF5SWNvbiA9ICdwbGF5X2NpcmNsZV9maWxsZWQnO1xyXG5cclxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZSB8IFtEYXRlLCBEYXRlXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgeWVhckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U2xpZGVyKSBteVNsaWRlcjtcclxuXHJcbiAgZ2V0IHR5cGUoKTogJ2RhdGUnIHwgJ3RpbWUnIHwgJ2RhdGV0aW1lJyB8ICd5ZWFyJyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnR5cGUgPT09IHVuZGVmaW5lZCA/ICdkYXRlJyA6IHRoaXMub3B0aW9ucy50eXBlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzUmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJhbmdlID09PSB1bmRlZmluZWQgfHwgdGhpcy5vcHRpb25zLnN0eWxlID09PSAnc2xpZGVyJ1xyXG4gICAgICA/IGZhbHNlXHJcbiAgICAgIDogdGhpcy5vcHRpb25zLnJhbmdlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHN0eWxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN0eWxlID09PSB1bmRlZmluZWQgPyAnc2xpZGVyJyA6IHRoaXMub3B0aW9ucy5zdHlsZTtcclxuICB9XHJcblxyXG4gIGdldCBzdGVwKCk6IG51bWJlciB7XHJcbiAgICBsZXQgc3RlcCA9IDEwODAwMDAwO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdGVwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICBjYXNlICdkYXRldGltZSc6XHJcbiAgICAgICAgICBzdGVwID0gMTA4MDAwMDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICAgIHN0ZXAgPSAzNjAwMDAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgICBzdGVwID0gMzE1MzYwMDAwMDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgc3RlcCA9IDEwODAwMDAwO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGVwID0gdGhpcy5nZXRTdGVwRGVmaW5pdGlvbih0aGlzLm9wdGlvbnMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0ZXA7XHJcbiAgfVxyXG5cclxuICBnZXQgdGltZUludGVydmFsKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVJbnRlcnZhbCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gMjAwMFxyXG4gICAgICA6IHRoaXMub3B0aW9ucy50aW1lSW50ZXJ2YWw7XHJcbiAgfVxyXG5cclxuICBnZXQgbWluKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5taW4gPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICA6IG5ldyBEYXRlKHRoaXMub3B0aW9ucy5taW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1heCgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubWF4ID09PSB1bmRlZmluZWRcclxuICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgOiBuZXcgRGF0ZSh0aGlzLm9wdGlvbnMubWF4KTtcclxuICB9XHJcblxyXG4gIGdldCBpcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmFuZ2UgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogdGhpcy5vcHRpb25zLnJhbmdlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHV0Y21pbiA9IG5ldyBEYXRlKHRoaXMubWluKTtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICB1dGNtaW4uZ2V0VGltZSgpICsgdXRjbWluLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHV0Y21heCA9IG5ldyBEYXRlKHRoaXMubWF4KTtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgdXRjbWF4LmdldFRpbWUoKSArIHV0Y21heC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRZZWFyID0gbmV3IERhdGUodGhpcy5zdGFydERhdGUpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIHRoaXMuaW5pdFN0YXJ0WWVhciA9IHRoaXMuc3RhcnRZZWFyO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kWWVhciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZW5kWWVhciA9IG5ldyBEYXRlKHRoaXMuZW5kRGF0ZSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgdGhpcy5pbml0RW5kWWVhciA9IHRoaXMuZW5kWWVhcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuaXNSYW5nZSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5zdGFydFllYXI7IGkgPD0gdGhpcy5lbmRZZWFyICsgMTsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyOyBpIDwgdGhpcy5lbmRZZWFyOyBpKyspIHtcclxuICAgICAgICB0aGlzLnN0YXJ0TGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyICsgMTsgaSA8PSB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZW5kTGlzdFllYXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZURhdGVDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5zZXR1cERhdGVPdXRwdXQoKTtcclxuICAgIHRoaXMuYXBwbHlUeXBlQ2hhbmdlKCk7XHJcblxyXG4gICAgLy8gT25seSBpZiBpcyByYW5nZSwgdXNlIDIgZGF0ZXMgdG8gbWFrZSB0aGUgcmFuZ2VcclxuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChbdGhpcy5zdGFydERhdGUsIHRoaXMuZW5kRGF0ZV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVZZWFyQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcclxuICAgICAgdGhpcy5lbmRMaXN0WWVhcnMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnRZZWFyICsgMTsgaSA8PSB0aGlzLmluaXRFbmRZZWFyOyBpKyspIHtcclxuICAgICAgICB0aGlzLmVuZExpc3RZZWFycy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhcnRMaXN0WWVhcnMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5pdFN0YXJ0WWVhciArIDE7IGkgPCB0aGlzLmVuZFllYXI7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRMaXN0WWVhcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnllYXJDaGFuZ2UuZW1pdChbdGhpcy5zdGFydFllYXIsIHRoaXMuZW5kWWVhcl0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy55ZWFyQ2hhbmdlLmVtaXQodGhpcy55ZWFyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUxpc3RZZWFyQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuaGFuZGxlWWVhckNoYW5nZShbdGhpcy5zdGFydFllYXIsIHRoaXMuZW5kWWVhcl0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlTGlzdFllYXJTdGFydENoYW5nZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KFt0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlXSk7XHJcbiAgfVxyXG5cclxuICBkYXRlVG9OdW1iZXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICBsZXQgbmV3RGF0ZTtcclxuICAgIGlmIChkYXRlKSB7XHJcbiAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLm1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld0RhdGUuZ2V0VGltZSgpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2xpZGVyVGh1bWJMYWJlbChsYWJlbDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB0aHVtYkxhYmVsID0gdGhpcy5maW5kVGh1bWJMYWJlbChcclxuICAgICAgdGhpcy5teVNsaWRlci5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXNcclxuICAgICk7XHJcbiAgICBpZiAodGh1bWJMYWJlbCkge1xyXG4gICAgICB0aHVtYkxhYmVsLnRleHRDb250ZW50ID0gbGFiZWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaW5kVGh1bWJMYWJlbCh0ZXN0OiBhbnlbXSk6IGFueSB7XHJcbiAgICBsZXQgdGh1bWJMYWJlbDtcclxuXHJcbiAgICB0ZXN0LmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICBpZiAodmFsdWUuY2xhc3NOYW1lID09PSAnbWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0Jykge1xyXG4gICAgICAgIHRodW1iTGFiZWwgPSB2YWx1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHZhbHVlLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIXRodW1iTGFiZWwpIHtcclxuICAgICAgICB0aHVtYkxhYmVsID0gdGhpcy5maW5kVGh1bWJMYWJlbCh2YWx1ZS5jaGlsZE5vZGVzKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgICByZXR1cm4gdGh1bWJMYWJlbDtcclxuICB9XHJcblxyXG4gIHBsYXlGaWx0ZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zdG9wRmlsdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXlJY29uID0gJ3BhdXNlX2NpcmNsZV9maWxsZWQnO1xyXG4gICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgKHRoYXQpID0+IHtcclxuICAgICAgICAgIGxldCBuZXdNaW5EYXRlTnVtYmVyO1xyXG4gICAgICAgICAgY29uc3QgbWF4RGF0ZU51bWJlciA9IG5ldyBEYXRlKHRoYXQubWF4KTtcclxuXHJcbiAgICAgICAgICBuZXdNaW5EYXRlTnVtYmVyID1cclxuICAgICAgICAgICAgdGhhdC5kYXRlID09PSB1bmRlZmluZWQgPyB0aGF0Lm1pbi5nZXRUaW1lKCkgOiB0aGF0LmRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgbmV3TWluRGF0ZU51bWJlciArPSB0aGF0Lm15U2xpZGVyLnN0ZXA7XHJcbiAgICAgICAgICB0aGF0LmRhdGUgPSBuZXcgRGF0ZShuZXdNaW5EYXRlTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3TWluRGF0ZU51bWJlciA+IG1heERhdGVOdW1iZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc3RvcEZpbHRlcigpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoYXQuaGFuZGxlRGF0ZUNoYW5nZSh7IHZhbHVlOiB0aGF0LmRhdGUsIGRhdGU6IHRoYXQuZGF0ZSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMudGltZUludGVydmFsLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0b3BGaWx0ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMucGxheUljb24gPSAncGxheV9jaXJjbGVfZmlsbGVkJztcclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlckRhdGVDaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZXZlbnQudmFsdWUpO1xyXG4gICAgdGhpcy5zZXRTbGlkZXJUaHVtYkxhYmVsKHRoaXMuaGFuZGxlU2xpZGVyVG9vbHRpcCgpKTtcclxuICAgIHRoaXMuaGFuZGxlRGF0ZUNoYW5nZShldmVudCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTbGlkZXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXJyZW50ID09PSB0cnVlIHx8ICF0aGlzLm1pbikge1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZ2V0Um91bmRlZERhdGUoY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5taW4uZ2V0VGltZSgpIDogdGhpcy5kYXRlLmdldFRpbWUoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVNsaWRlclRvb2x0aXAoKSB7XHJcbiAgICBsZXQgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICBsYWJlbCA9XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IHRoaXMubWluLnRvRGF0ZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICBsYWJlbCA9XHJcbiAgICAgICAgICB0aGlzLmRhdGUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IHRoaXMubWluLnRvVGltZVN0cmluZygpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlLnRvVGltZVN0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAvLyBkYXRldGltZVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGxhYmVsID1cclxuICAgICAgICAgIHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gdGhpcy5taW4udG9VVENTdHJpbmcoKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZS50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxuICB9XHJcblxyXG4gIHNldHVwRGF0ZU91dHB1dCgpIHtcclxuICAgIGlmICh0aGlzLnN0eWxlID09PSAnc2xpZGVyJykge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlLnNldFNlY29uZHMoLSh0aGlzLnN0ZXAgLyAxMDAwKSk7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgdGhpcy5lbmREYXRlLnNldFNlY29uZHModGhpcy5zdGVwIC8gMTAwMCk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzUmFuZ2UgJiYgISF0aGlzLmRhdGUpIHtcclxuICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodGhpcy5kYXRlKTtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzUmFuZ2UgJiYgKCEhdGhpcy5kYXRlIHx8ICF0aGlzLmRhdGUpKSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID1cclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUodGhpcy5taW4pIDogdGhpcy5zdGFydERhdGU7XHJcbiAgICAgIHRoaXMuZW5kRGF0ZSA9XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1heCkgOiB0aGlzLmVuZERhdGU7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmRhdGUpIHtcclxuICAgICAgdGhpcy5zdGFydERhdGUgPVxyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSh0aGlzLm1pbikgOiB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgdGhpcy5lbmREYXRlID1cclxuICAgICAgICB0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKHRoaXMubWF4KSA6IHRoaXMuZW5kRGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFwcGx5VHlwZUNoYW5nZSgpIHtcclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMuZW5kRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRIb3VycygwKTtcclxuICAgICAgICAgIHRoaXMuc3RhcnREYXRlLnNldE1pbnV0ZXMoMCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRTZWNvbmRzKDApO1xyXG4gICAgICAgICAgdGhpcy5lbmREYXRlLnNldEhvdXJzKDIzKTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKDU5KTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKDU5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RpbWUnOlxyXG4gICAgICAgIGlmICh0aGlzLnN0eWxlID09PSAnY2FsZW5kYXInKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zdGFydERhdGUuZ2V0RGF5KCkgIT09IHRoaXMubWluLmdldERheSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSG91ciA9IHRoaXMuc3RhcnREYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTWludXRlID0gdGhpcy5zdGFydERhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRIb3VycyhzZWxlY3RlZEhvdXIpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRNaW51dGVzKHNlbGVjdGVkTWludXRlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5lbmREYXRlLmdldERheSgpICE9PSB0aGlzLm1pbi5nZXREYXkoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEhvdXIgPSB0aGlzLmVuZERhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNaW51dGUgPSB0aGlzLmVuZERhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlLnNldEhvdXJzKHNlbGVjdGVkSG91cik7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKHNlbGVjdGVkTWludXRlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1JhbmdlICYmIHRoaXMuc3RlcCA+IDYwICogNjAgKiAxMDAwKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXRNaW51dGVzKDApO1xyXG4gICAgICAgICAgdGhpcy5zdGFydERhdGUuc2V0U2Vjb25kcygwKTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRNaW51dGVzKDU5KTtcclxuICAgICAgICAgIHRoaXMuZW5kRGF0ZS5zZXRTZWNvbmRzKDU5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIC8vIGRhdGV0aW1lXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFJhbmdlTWluRGF0ZSgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXJ0RGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5taW4gOiB0aGlzLnN0YXJ0RGF0ZTtcclxuICB9XHJcblxyXG4gIGdldFJhbmdlTWF4RGF0ZSgpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLmVuZERhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMubWF4IDogdGhpcy5lbmREYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm91bmQgZGF0ZSBhdCBhIGNlcnRhaW4gdGltZSwgMTAgbWludXRlcyBieSBEZWZhdWx0XHJcbiAgICogQHBhcmFtIGRhdGUgLSBEYXRlIHRvIFJvdW5kXHJcbiAgICogQHBhcmFtIGF0TWludXRlIC0gcm91bmQgdG8gY2xvc2VzdCAnYXRNaW51dGUnIG1pbnV0ZSwgcm91bmRlZCAxMCBieSBkZWZhdWx0XHJcbiAgICogQHJldHVybiB0aGUgcm91bmRlZCBkYXRlXHJcbiAgICovXHJcbiAgZ2V0Um91bmRlZERhdGUoZGF0ZSwgYXRNaW51dGUgPSAxMCkge1xyXG4gICAgY29uc3QgY29lZmYgPSAxMDAwICogNjAgKiBhdE1pbnV0ZTtcclxuICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLnJvdW5kKGRhdGUuZ2V0VGltZSgpIC8gY29lZmYpICogY29lZmYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzdGVwIChwZXJpb2QpIGRlZmluaXRpb24gZnJvbSB0aGUgbGF5ZXIgZGltZW5zaW9uIHRhZ1xyXG4gICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIGFzIElTTyA4NjAxIGV4YW1wbGU6IFBUMTBNIGZvciAxMCBNaW51dGVzXHJcbiAgICogQHJldHVybiB0aGUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzXHJcbiAgICovXHJcbiAgZ2V0U3RlcERlZmluaXRpb24oc3RlcCkge1xyXG4gICAgcmV0dXJuIG1vbWVudC5kdXJhdGlvbihzdGVwKS5hc01pbGxpc2Vjb25kcygpO1xyXG4gIH1cclxufVxyXG4iXX0=