/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getEntityRevision } from '@igo2/common';
import { uuid } from '@igo2/utils';
import { FEATURE } from '../shared/feature.enums';
import { FeatureStore } from '../shared/store';
import { FeatureStoreSelectionStrategy } from '../shared/strategies/selection';
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
    /**
     * @param {?} changes
     * @return {?}
     */
    FeatureFormComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            this.setStore(store.currentValue);
        }
        /** @type {?} */
        var feature = changes.feature;
        if (feature && feature.currentValue !== feature.previousValue) {
            this.feature$.next(feature.currentValue);
        }
    };
    /**
     * Show the original feature and reactivate the selection
     * @internal
     */
    /**
     * Show the original feature and reactivate the selection
     * \@internal
     * @return {?}
     */
    FeatureFormComponent.prototype.ngOnDestroy = /**
     * Show the original feature and reactivate the selection
     * \@internal
     * @return {?}
     */
    function () {
        this.setStore(undefined);
    };
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
    /**
     * @private
     * @param {?} store
     * @return {?}
     */
    FeatureFormComponent.prototype.setStore = /**
     * @private
     * @param {?} store
     * @return {?}
     */
    function (store) {
        if (this.store !== undefined) {
            this.activateStoreSelection(this.store);
        }
        if (store !== undefined) {
            this.deactivateStoreSelection(store);
        }
        this.store = store;
    };
    /**
     * Deactivate feature selection from the store and from the map
     */
    /**
     * Deactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    FeatureFormComponent.prototype.deactivateStoreSelection = /**
     * Deactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    function (store) {
        /** @type {?} */
        var selectionStrategy = store.getStrategyOfType(FeatureStoreSelectionStrategy);
        if (selectionStrategy !== undefined) {
            selectionStrategy.deactivate();
            ((/** @type {?} */ (selectionStrategy))).unselectAll();
        }
    };
    /**
     * Reactivate feature selection from the store and from the map
     */
    /**
     * Reactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    FeatureFormComponent.prototype.activateStoreSelection = /**
     * Reactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    function (store) {
        // TODO: maybe we should recativate the strategies only if they
        // were active in the first place
        store.activateStrategyOfType(FeatureStoreSelectionStrategy);
    };
    FeatureFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-feature-form',
                    template: "\r\n<igo-form\r\n  [form]=\"form\"\r\n  [formData]=\"feature$ | async\"\r\n  (submitForm)=\"onSubmit($event)\">\r\n\r\n  <ng-content></ng-content>\r\n  \r\n  <ng-content select=\"[formButtons]\" formButtons></ng-content>\r\n  \r\n</igo-form>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}igo-form{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    FeatureFormComponent.ctorParameters = function () { return []; };
    FeatureFormComponent.propDecorators = {
        form: [{ type: Input }],
        feature: [{ type: Input }],
        store: [{ type: Input }],
        submitForm: [{ type: Output }]
    };
    return FeatureFormComponent;
}());
export { FeatureFormComponent };
if (false) {
    /** @type {?} */
    FeatureFormComponent.prototype.feature$;
    /**
     * Form
     * @type {?}
     */
    FeatureFormComponent.prototype.form;
    /**
     * Feature to update
     * @type {?}
     */
    FeatureFormComponent.prototype.feature;
    /**
     * The store the feature belongs to. Required to manage the
     * visiblity and selection.
     * @type {?}
     */
    FeatureFormComponent.prototype.store;
    /**
     * Event emitted when the form is submitted
     * @type {?}
     */
    FeatureFormComponent.prototype.submitForm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZm9ybS9mZWF0dXJlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQVEsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7OztBQVMvRTtJQThCRTtRQXZCTyxhQUFRLEdBQTZCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBcUJqRSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUVwQyxDQUFDOzs7OztJQUVoQiwwQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7O1lBQzFCLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSztRQUMzQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7O1lBRUssT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQy9CLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLGFBQWEs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QyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BFO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0sscURBQXNCOzs7Ozs7SUFBOUIsVUFBK0IsS0FBbUI7UUFDaEQsK0RBQStEO1FBQy9ELGlDQUFpQztRQUNqQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUM5RCxDQUFDOztnQkFwSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGlRQUE0QztvQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7Ozs7dUJBT0UsS0FBSzswQkFLTCxLQUFLO3dCQU1MLEtBQUs7NkJBS0wsTUFBTTs7SUF5R1QsMkJBQUM7Q0FBQSxBQXJJRCxJQXFJQztTQS9IWSxvQkFBb0I7OztJQUMvQix3Q0FBMkU7Ozs7O0lBSzNFLG9DQUFvQjs7Ozs7SUFLcEIsdUNBQXNDOzs7Ozs7SUFNdEMscUNBQXlDOzs7OztJQUt6QywwQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEZvcm0sIGdldEVudGl0eVJldmlzaW9uIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEZFQVRVUkUgfSBmcm9tICcuLi9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVNZXRhIH0gZnJvbSAnLi4vc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZSB9IGZyb20gJy4uL3NoYXJlZC9zdG9yZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vc2hhcmVkL3N0cmF0ZWdpZXMvc2VsZWN0aW9uJztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbmZpZ3VyYWJsZSBmb3JtLCBvcHRpb25uYWxseSBib3VuZCB0byBhIGZlYXR1cmUuXHJcbiAqIFRoaXMgY29tcG9uZW50IGNyZWF0ZXMgYW4gZW50aXR5IGZvcm0gYW5kLCBvbiBzdWJtaXQsXHJcbiAqIHJldHVybnMgYSBmZWF0dXJlIG1hZGUgb3V0IG9mIHRoZSBzdWJtaXR0ZWQgZGF0YS4gSXQgYWxzb1xyXG4gKiBkb2VzIHRoaW5ncyBsaWtlIG1hbmFnaW5nIHRoZSBmZWF0dXJlIHZpc2liaWxpdHkgd2hpbGUgaXQncyBiZWluZyB1cGRhdGVkXHJcbiAqIGFzIHdlbGwgYXMgZGlzYWJsaW5nIHRoZSBzZWxlY3Rpb24gb2YgYW5vdGhlciBmZWF0dXJlLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZmVhdHVyZS1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mZWF0dXJlLWZvcm0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZUZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIGZlYXR1cmUkOiBCZWhhdmlvclN1YmplY3Q8RmVhdHVyZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1cclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JtOiBGb3JtO1xyXG5cclxuICAvKipcclxuICAgKiBGZWF0dXJlIHRvIHVwZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZlYXR1cmU6IEZlYXR1cmUgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdG9yZSB0aGUgZmVhdHVyZSBiZWxvbmdzIHRvLiBSZXF1aXJlZCB0byBtYW5hZ2UgdGhlXHJcbiAgICogdmlzaWJsaXR5IGFuZCBzZWxlY3Rpb24uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEZlYXR1cmVTdG9yZSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzdWJtaXRGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjxGZWF0dXJlPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gY2hhbmdlcy5zdG9yZTtcclxuICAgIGlmIChzdG9yZSAmJiBzdG9yZS5jdXJyZW50VmFsdWUgIT09IHN0b3JlLnByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgdGhpcy5zZXRTdG9yZShzdG9yZS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZlYXR1cmUgPSBjaGFuZ2VzLmZlYXR1cmU7XHJcbiAgICBpZiAoZmVhdHVyZSAmJiBmZWF0dXJlLmN1cnJlbnRWYWx1ZSAhPT0gZmVhdHVyZS5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZmVhdHVyZSQubmV4dChmZWF0dXJlLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHRoZSBvcmlnaW5hbCBmZWF0dXJlIGFuZCByZWFjdGl2YXRlIHRoZSBzZWxlY3Rpb25cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc2V0U3RvcmUodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zZm9ybSB0aGUgZm9ybSBkYXRhIHRvIGEgZmVhdHVyZSBhbmQgZW1pdCBhbiBldmVudFxyXG4gICAqIEBwYXJhbSBldmVudCBGb3JtIHN1Ym1pdCBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU3VibWl0KGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmZvcm1EYXRhVG9GZWF0dXJlKGRhdGEpO1xyXG4gICAgdGhpcy5zdWJtaXRGb3JtLmVtaXQoZmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2Zvcm0gdGhlIGZvcm0gZGF0YSB0byBhIGZlYXR1cmVcclxuICAgKiBAcGFyYW0gZGF0YSBGb3JtIGRhdGFcclxuICAgKiBAcmV0dXJucyBBIGZlYXR1cmVcclxuICAgKi9cclxuICBwcml2YXRlIGZvcm1EYXRhVG9GZWF0dXJlKGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBGZWF0dXJlIHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcclxuICAgIGNvbnN0IG1ldGEgPSB7fTtcclxuICAgIGlmICh0aGlzLmZlYXR1cmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAobWV0YSBhcyBhbnkpLmlkID0gdXVpZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB0aGlzLmZlYXR1cmUucHJvcGVydGllcyk7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24obWV0YSwgdGhpcy5mZWF0dXJlLm1ldGEsIHtcclxuICAgICAgICByZXZpc2lvbjogZ2V0RW50aXR5UmV2aXNpb24odGhpcy5mZWF0dXJlKSArIDFcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvcGVydHlQcmVmaXggPSAncHJvcGVydGllcy4nO1xyXG4gICAgT2JqZWN0LmVudHJpZXMoZGF0YSkuZm9yRWFjaCgoZW50cnk6IFtzdHJpbmcsIGFueV0pID0+IHtcclxuICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cnk7XHJcbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChwcm9wZXJ0eVByZWZpeCkpIHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGtleS5zdWJzdHIocHJvcGVydHlQcmVmaXgubGVuZ3RoKTtcclxuICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZ2VvbWV0cnkgPSBkYXRhLmdlb21ldHJ5O1xyXG4gICAgaWYgKGdlb21ldHJ5ID09PSB1bmRlZmluZWQgJiYgdGhpcy5mZWF0dXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZ2VvbWV0cnkgPSB0aGlzLmZlYXR1cmUuZ2VvbWV0cnk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWV0YTogbWV0YSBhcyBGZWF0dXJlTWV0YSxcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgZ2VvbWV0cnksXHJcbiAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICBwcm9wZXJ0aWVzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRTdG9yZShzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBpZiAodGhpcy5zdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVTdG9yZVNlbGVjdGlvbih0aGlzLnN0b3JlKTtcclxuICAgIH1cclxuICAgIGlmIChzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVN0b3JlU2VsZWN0aW9uKHN0b3JlKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgZmVhdHVyZSBzZWxlY3Rpb24gZnJvbSB0aGUgc3RvcmUgYW5kIGZyb20gdGhlIG1hcFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVhY3RpdmF0ZVN0b3JlU2VsZWN0aW9uKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvblN0cmF0ZWd5ID0gc3RvcmUuZ2V0U3RyYXRlZ3lPZlR5cGUoXHJcbiAgICAgIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5XHJcbiAgICApO1xyXG4gICAgaWYgKHNlbGVjdGlvblN0cmF0ZWd5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc2VsZWN0aW9uU3RyYXRlZ3kuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAoc2VsZWN0aW9uU3RyYXRlZ3kgYXMgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpLnVuc2VsZWN0QWxsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWFjdGl2YXRlIGZlYXR1cmUgc2VsZWN0aW9uIGZyb20gdGhlIHN0b3JlIGFuZCBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2YXRlU3RvcmVTZWxlY3Rpb24oc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgLy8gVE9ETzogbWF5YmUgd2Ugc2hvdWxkIHJlY2F0aXZhdGUgdGhlIHN0cmF0ZWdpZXMgb25seSBpZiB0aGV5XHJcbiAgICAvLyB3ZXJlIGFjdGl2ZSBpbiB0aGUgZmlyc3QgcGxhY2VcclxuICAgIHN0b3JlLmFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3kpO1xyXG4gIH1cclxufVxyXG4iXX0=