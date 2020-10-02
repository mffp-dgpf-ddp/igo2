/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormComponent, getEntityRevision } from '@igo2/common';
import { uuid } from '@igo2/utils';
import { FEATURE } from '../shared/feature.enums';
/**
 * A configurable form, optionnally bound to a feature.
 * This component creates an entity form and, on submit,
 * returns a feature made out of the submitted data. It also
 * does things like managing the feature visibility while it's being updated
 * as well as disabling the selection of another feature.
 */
var FeatureFormComponent = /** @class */ (function () {
    function FeatureFormComponent() {
        this.feature$ = new BehaviorSubject(undefined);
        /**
         * Event emitted when the form is submitted
         */
        this.submitForm = new EventEmitter();
    }
    Object.defineProperty(FeatureFormComponent.prototype, "feature", {
        get: /**
         * @return {?}
         */
        function () { return this.feature$.value; },
        /**
         * Feature to update
         */
        set: /**
         * Feature to update
         * @param {?} value
         * @return {?}
         */
        function (value) { this.feature$.next(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Transform the form data to a feature and emit an event
     * @param event Form submit event
     * @internal
     */
    /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @param {?} data
     * @return {?}
     */
    FeatureFormComponent.prototype.onSubmit = /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var feature = this.formDataToFeature(data);
        this.submitForm.emit(feature);
    };
    /**
     * @return {?}
     */
    FeatureFormComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        return this.formDataToFeature(this.igoForm.getData());
    };
    /**
     * Transform the form data to a feature
     * @param data Form data
     * @returns A feature
     */
    /**
     * Transform the form data to a feature
     * @private
     * @param {?} data Form data
     * @return {?} A feature
     */
    FeatureFormComponent.prototype.formDataToFeature = /**
     * Transform the form data to a feature
     * @private
     * @param {?} data Form data
     * @return {?} A feature
     */
    function (data) {
        /** @type {?} */
        var properties = {};
        /** @type {?} */
        var meta = {};
        if (this.feature === undefined) {
            ((/** @type {?} */ (meta))).id = uuid();
        }
        else {
            Object.assign(properties, this.feature.properties);
            Object.assign(meta, this.feature.meta, {
                revision: getEntityRevision(this.feature) + 1
            });
        }
        /** @type {?} */
        var propertyPrefix = 'properties.';
        Object.entries(data).forEach((/**
         * @param {?} entry
         * @return {?}
         */
        function (entry) {
            var _a = tslib_1.__read(entry, 2), key = _a[0], value = _a[1];
            if (key.startsWith(propertyPrefix)) {
                /** @type {?} */
                var property = key.substr(propertyPrefix.length);
                properties[property] = value;
            }
        }));
        /** @type {?} */
        var geometry = data.geometry;
        if (geometry === undefined && this.feature !== undefined) {
            geometry = this.feature.geometry;
        }
        return {
            meta: (/** @type {?} */ (meta)),
            type: FEATURE,
            geometry: geometry,
            projection: 'EPSG:4326',
            properties: properties
        };
    };
    FeatureFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-feature-form',
                    template: "\r\n<igo-form\r\n  #igoForm\r\n  [form]=\"form\"\r\n  [formData]=\"feature$ | async\"\r\n  (submitForm)=\"onSubmit($event)\">\r\n\r\n  <ng-content></ng-content>\r\n  \r\n  <ng-content select=\"[formButtons]\" formButtons></ng-content>\r\n  \r\n</igo-form>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}igo-form{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    FeatureFormComponent.ctorParameters = function () { return []; };
    FeatureFormComponent.propDecorators = {
        form: [{ type: Input }],
        feature: [{ type: Input }],
        submitForm: [{ type: Output }],
        igoForm: [{ type: ViewChild, args: ['igoForm',] }]
    };
    return FeatureFormComponent;
}());
export { FeatureFormComponent };
if (false) {
    /**
     * Form
     * @type {?}
     */
    FeatureFormComponent.prototype.form;
    /** @type {?} */
    FeatureFormComponent.prototype.feature$;
    /**
     * Event emitted when the form is submitted
     * @type {?}
     */
    FeatureFormComponent.prototype.submitForm;
    /** @type {?} */
    FeatureFormComponent.prototype.igoForm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZm9ybS9mZWF0dXJlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFRLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7QUFVbEQ7SUE0QkU7UUFUUyxhQUFRLEdBQTZCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS25FLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBSXBDLENBQUM7SUFaaEIsc0JBQ0kseUNBQU87Ozs7UUFDWCxjQUFxQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUxsRTs7V0FFRzs7Ozs7O1FBQ0gsVUFDWSxLQUEwQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFhdEU7Ozs7T0FJRzs7Ozs7OztJQUNILHVDQUFROzs7Ozs7SUFBUixVQUFTLElBQTRCOztZQUM3QixPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7O0lBRUQsc0NBQU87OztJQUFQO1FBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0ssZ0RBQWlCOzs7Ozs7SUFBekIsVUFBMEIsSUFBNEI7O1lBQzlDLFVBQVUsR0FBRyxFQUFFOztZQUNmLElBQUksR0FBRyxFQUFFO1FBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM5QixDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1NBQzNCO2FBQU07WUFDTCxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUNyQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1NBQ0o7O1lBRUssY0FBYyxHQUFHLGFBQWE7UUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxLQUFvQjtZQUMxQyxJQUFBLDZCQUFvQixFQUFuQixXQUFHLEVBQUUsYUFBYztZQUMxQixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7O29CQUM1QixRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO2dCQUNsRCxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7O1lBRUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRO1FBQzVCLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN4RCxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDbEM7UUFFRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBZTtZQUN6QixJQUFJLEVBQUUsT0FBTztZQUNiLFFBQVEsVUFBQTtZQUNSLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFVBQVUsWUFBQTtTQUNYLENBQUM7SUFDSixDQUFDOztnQkFsRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLCtRQUE0QztvQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7dUJBTUUsS0FBSzswQkFLTCxLQUFLOzZCQVFMLE1BQU07MEJBRU4sU0FBUyxTQUFDLFNBQVM7O0lBeUR0QiwyQkFBQztDQUFBLEFBbkZELElBbUZDO1NBN0VZLG9CQUFvQjs7Ozs7O0lBSy9CLG9DQUFvQjs7SUFRcEIsd0NBQTZFOzs7OztJQUs3RSwwQ0FBbUQ7O0lBRW5ELHVDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEZvcm0sIEZvcm1Db21wb25lbnQsIGdldEVudGl0eVJldmlzaW9uIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEZFQVRVUkUgfSBmcm9tICcuLi9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVNZXRhIH0gZnJvbSAnLi4vc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQSBjb25maWd1cmFibGUgZm9ybSwgb3B0aW9ubmFsbHkgYm91bmQgdG8gYSBmZWF0dXJlLlxyXG4gKiBUaGlzIGNvbXBvbmVudCBjcmVhdGVzIGFuIGVudGl0eSBmb3JtIGFuZCwgb24gc3VibWl0LFxyXG4gKiByZXR1cm5zIGEgZmVhdHVyZSBtYWRlIG91dCBvZiB0aGUgc3VibWl0dGVkIGRhdGEuIEl0IGFsc29cclxuICogZG9lcyB0aGluZ3MgbGlrZSBtYW5hZ2luZyB0aGUgZmVhdHVyZSB2aXNpYmlsaXR5IHdoaWxlIGl0J3MgYmVpbmcgdXBkYXRlZFxyXG4gKiBhcyB3ZWxsIGFzIGRpc2FibGluZyB0aGUgc2VsZWN0aW9uIG9mIGFub3RoZXIgZmVhdHVyZS5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZlYXR1cmUtZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmUtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVGb3JtQ29tcG9uZW50IHtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm07XHJcblxyXG4gIC8qKlxyXG4gICAqIEZlYXR1cmUgdG8gdXBkYXRlXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgZmVhdHVyZSh2YWx1ZTogRmVhdHVyZSB8IHVuZGVmaW5lZCkgeyB0aGlzLmZlYXR1cmUkLm5leHQodmFsdWUpOyB9XHJcbiAgZ2V0IGZlYXR1cmUoKTogRmVhdHVyZSB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLmZlYXR1cmUkLnZhbHVlOyB9XHJcbiAgcmVhZG9ubHkgZmVhdHVyZSQ6IEJlaGF2aW9yU3ViamVjdDxGZWF0dXJlPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzdWJtaXRGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjxGZWF0dXJlPigpO1xyXG5cclxuICBAVmlld0NoaWxkKCdpZ29Gb3JtJykgaWdvRm9ybTogRm9ybUNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2Zvcm0gdGhlIGZvcm0gZGF0YSB0byBhIGZlYXR1cmUgYW5kIGVtaXQgYW4gZXZlbnRcclxuICAgKiBAcGFyYW0gZXZlbnQgRm9ybSBzdWJtaXQgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblN1Ym1pdChkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XHJcbiAgICBjb25zdCBmZWF0dXJlID0gdGhpcy5mb3JtRGF0YVRvRmVhdHVyZShkYXRhKTtcclxuICAgIHRoaXMuc3VibWl0Rm9ybS5lbWl0KGZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSgpOiBGZWF0dXJlIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1EYXRhVG9GZWF0dXJlKHRoaXMuaWdvRm9ybS5nZXREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNmb3JtIHRoZSBmb3JtIGRhdGEgdG8gYSBmZWF0dXJlXHJcbiAgICogQHBhcmFtIGRhdGEgRm9ybSBkYXRhXHJcbiAgICogQHJldHVybnMgQSBmZWF0dXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmb3JtRGF0YVRvRmVhdHVyZShkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogRmVhdHVyZSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge307XHJcbiAgICBjb25zdCBtZXRhID0ge307XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgKG1ldGEgYXMgYW55KS5pZCA9IHV1aWQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgdGhpcy5mZWF0dXJlLnByb3BlcnRpZXMpO1xyXG4gICAgICBPYmplY3QuYXNzaWduKG1ldGEsIHRoaXMuZmVhdHVyZS5tZXRhLCB7XHJcbiAgICAgICAgcmV2aXNpb246IGdldEVudGl0eVJldmlzaW9uKHRoaXMuZmVhdHVyZSkgKyAxXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb3BlcnR5UHJlZml4ID0gJ3Byb3BlcnRpZXMuJztcclxuICAgIE9iamVjdC5lbnRyaWVzKGRhdGEpLmZvckVhY2goKGVudHJ5OiBbc3RyaW5nLCBhbnldKSA9PiB7XHJcbiAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xyXG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgocHJvcGVydHlQcmVmaXgpKSB7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBrZXkuc3Vic3RyKHByb3BlcnR5UHJlZml4Lmxlbmd0aCk7XHJcbiAgICAgICAgcHJvcGVydGllc1twcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5ID0gZGF0YS5nZW9tZXRyeTtcclxuICAgIGlmIChnZW9tZXRyeSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZmVhdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdlb21ldHJ5ID0gdGhpcy5mZWF0dXJlLmdlb21ldHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1ldGE6IG1ldGEgYXMgRmVhdHVyZU1ldGEsXHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGdlb21ldHJ5LFxyXG4gICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgcHJvcGVydGllc1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19