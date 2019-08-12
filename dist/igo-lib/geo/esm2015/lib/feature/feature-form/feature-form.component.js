/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class FeatureFormComponent {
    constructor() {
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
    ngOnChanges(changes) {
        /** @type {?} */
        const store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            this.setStore(store.currentValue);
        }
        /** @type {?} */
        const feature = changes.feature;
        if (feature && feature.currentValue !== feature.previousValue) {
            this.feature$.next(feature.currentValue);
        }
    }
    /**
     * Show the original feature and reactivate the selection
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.setStore(undefined);
    }
    /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @param {?} data
     * @return {?}
     */
    onSubmit(data) {
        /** @type {?} */
        const feature = this.formDataToFeature(data);
        this.submitForm.emit(feature);
    }
    /**
     * Transform the form data to a feature
     * @private
     * @param {?} data Form data
     * @return {?} A feature
     */
    formDataToFeature(data) {
        /** @type {?} */
        const properties = {};
        /** @type {?} */
        const meta = {};
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
        const propertyPrefix = 'properties.';
        Object.entries(data).forEach((/**
         * @param {?} entry
         * @return {?}
         */
        (entry) => {
            const [key, value] = entry;
            if (key.startsWith(propertyPrefix)) {
                /** @type {?} */
                const property = key.substr(propertyPrefix.length);
                properties[property] = value;
            }
        }));
        /** @type {?} */
        let geometry = data.geometry;
        if (geometry === undefined && this.feature !== undefined) {
            geometry = this.feature.geometry;
        }
        return {
            meta: (/** @type {?} */ (meta)),
            type: FEATURE,
            geometry,
            projection: 'EPSG:4326',
            properties
        };
    }
    /**
     * @private
     * @param {?} store
     * @return {?}
     */
    setStore(store) {
        if (this.store !== undefined) {
            this.activateStoreSelection(this.store);
        }
        if (store !== undefined) {
            this.deactivateStoreSelection(store);
        }
        this.store = store;
    }
    /**
     * Deactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    deactivateStoreSelection(store) {
        /** @type {?} */
        const selectionStrategy = store.getStrategyOfType(FeatureStoreSelectionStrategy);
        if (selectionStrategy !== undefined) {
            selectionStrategy.deactivate();
            ((/** @type {?} */ (selectionStrategy))).unselectAll();
        }
    }
    /**
     * Reactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    activateStoreSelection(store) {
        // TODO: maybe we should recativate the strategies only if they
        // were active in the first place
        store.activateStrategyOfType(FeatureStoreSelectionStrategy);
    }
}
FeatureFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-feature-form',
                template: "\r\n<igo-form\r\n  [form]=\"form\"\r\n  [formData]=\"feature$ | async\"\r\n  (submitForm)=\"onSubmit($event)\">\r\n\r\n  <ng-content></ng-content>\r\n  \r\n  <ng-content select=\"[formButtons]\" formButtons></ng-content>\r\n  \r\n</igo-form>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}igo-form{height:100%}"]
            }] }
];
/** @nocollapse */
FeatureFormComponent.ctorParameters = () => [];
FeatureFormComponent.propDecorators = {
    form: [{ type: Input }],
    feature: [{ type: Input }],
    store: [{ type: Input }],
    submitForm: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZm9ybS9mZWF0dXJlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBUSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7O0FBZS9FLE1BQU0sT0FBTyxvQkFBb0I7SUF3Qi9CO1FBdkJPLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7UUFxQmpFLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRXBDLENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxPQUFzQjs7Y0FDMUIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLO1FBQzNCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuQzs7Y0FFSyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDL0IsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFlBQVksS0FBSyxPQUFPLENB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Q2pDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzlELENBQUM7OztZQXBJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsaVFBQTRDO2dCQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7O21CQU9FLEtBQUs7c0JBS0wsS0FBSztvQkFNTCxLQUFLO3lCQUtMLE1BQU07Ozs7SUFyQlAsd0NBQTJFOzs7OztJQUszRSxvQ0FBb0I7Ozs7O0lBS3BCLHVDQUFzQzs7Ozs7O0lBTXRDLHFDQUF5Qzs7Ozs7SUFLekMsMENBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtLCBnZXRFbnRpdHlSZXZpc2lvbiB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBGRUFUVVJFIH0gZnJvbSAnLi4vc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlLCBGZWF0dXJlTWV0YSB9IGZyb20gJy4uL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4uL3NoYXJlZC9zdHJhdGVnaWVzL3NlbGVjdGlvbic7XHJcblxyXG4vKipcclxuICogQSBjb25maWd1cmFibGUgZm9ybSwgb3B0aW9ubmFsbHkgYm91bmQgdG8gYSBmZWF0dXJlLlxyXG4gKiBUaGlzIGNvbXBvbmVudCBjcmVhdGVzIGFuIGVudGl0eSBmb3JtIGFuZCwgb24gc3VibWl0LFxyXG4gKiByZXR1cm5zIGEgZmVhdHVyZSBtYWRlIG91dCBvZiB0aGUgc3VibWl0dGVkIGRhdGEuIEl0IGFsc29cclxuICogZG9lcyB0aGluZ3MgbGlrZSBtYW5hZ2luZyB0aGUgZmVhdHVyZSB2aXNpYmlsaXR5IHdoaWxlIGl0J3MgYmVpbmcgdXBkYXRlZFxyXG4gKiBhcyB3ZWxsIGFzIGRpc2FibGluZyB0aGUgc2VsZWN0aW9uIG9mIGFub3RoZXIgZmVhdHVyZS5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZlYXR1cmUtZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmUtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyBmZWF0dXJlJDogQmVoYXZpb3JTdWJqZWN0PEZlYXR1cmU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybTogRm9ybTtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSB0byB1cGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKSBmZWF0dXJlOiBGZWF0dXJlIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3RvcmUgdGhlIGZlYXR1cmUgYmVsb25ncyB0by4gUmVxdWlyZWQgdG8gbWFuYWdlIHRoZVxyXG4gICAqIHZpc2libGl0eSBhbmQgc2VsZWN0aW9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBGZWF0dXJlU3RvcmUgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc3VibWl0Rm9ybSA9IG5ldyBFdmVudEVtaXR0ZXI8RmVhdHVyZT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNoYW5nZXMuc3RvcmU7XHJcbiAgICBpZiAoc3RvcmUgJiYgc3RvcmUuY3VycmVudFZhbHVlICE9PSBzdG9yZS5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RvcmUoc3RvcmUuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmZWF0dXJlID0gY2hhbmdlcy5mZWF0dXJlO1xyXG4gICAgaWYgKGZlYXR1cmUgJiYgZmVhdHVyZS5jdXJyZW50VmFsdWUgIT09IGZlYXR1cmUucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICB0aGlzLmZlYXR1cmUkLm5leHQoZmVhdHVyZS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGUgb3JpZ2luYWwgZmVhdHVyZSBhbmQgcmVhY3RpdmF0ZSB0aGUgc2VsZWN0aW9uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnNldFN0b3JlKHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2Zvcm0gdGhlIGZvcm0gZGF0YSB0byBhIGZlYXR1cmUgYW5kIGVtaXQgYW4gZXZlbnRcclxuICAgKiBAcGFyYW0gZXZlbnQgRm9ybSBzdWJtaXQgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblN1Ym1pdChkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XHJcbiAgICBjb25zdCBmZWF0dXJlID0gdGhpcy5mb3JtRGF0YVRvRmVhdHVyZShkYXRhKTtcclxuICAgIHRoaXMuc3VibWl0Rm9ybS5lbWl0KGZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNmb3JtIHRoZSBmb3JtIGRhdGEgdG8gYSBmZWF0dXJlXHJcbiAgICogQHBhcmFtIGRhdGEgRm9ybSBkYXRhXHJcbiAgICogQHJldHVybnMgQSBmZWF0dXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmb3JtRGF0YVRvRmVhdHVyZShkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogRmVhdHVyZSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge307XHJcbiAgICBjb25zdCBtZXRhID0ge307XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgKG1ldGEgYXMgYW55KS5pZCA9IHV1aWQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgdGhpcy5mZWF0dXJlLnByb3BlcnRpZXMpO1xyXG4gICAgICBPYmplY3QuYXNzaWduKG1ldGEsIHRoaXMuZmVhdHVyZS5tZXRhLCB7XHJcbiAgICAgICAgcmV2aXNpb246IGdldEVudGl0eVJldmlzaW9uKHRoaXMuZmVhdHVyZSkgKyAxXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb3BlcnR5UHJlZml4ID0gJ3Byb3BlcnRpZXMuJztcclxuICAgIE9iamVjdC5lbnRyaWVzKGRhdGEpLmZvckVhY2goKGVudHJ5OiBbc3RyaW5nLCBhbnldKSA9PiB7XHJcbiAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xyXG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgocHJvcGVydHlQcmVmaXgpKSB7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBrZXkuc3Vic3RyKHByb3BlcnR5UHJlZml4Lmxlbmd0aCk7XHJcbiAgICAgICAgcHJvcGVydGllc1twcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGdlb21ldHJ5ID0gZGF0YS5nZW9tZXRyeTtcclxuICAgIGlmIChnZW9tZXRyeSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZmVhdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdlb21ldHJ5ID0gdGhpcy5mZWF0dXJlLmdlb21ldHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1ldGE6IG1ldGEgYXMgRmVhdHVyZU1ldGEsXHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGdlb21ldHJ5LFxyXG4gICAgICBwcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcclxuICAgICAgcHJvcGVydGllc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0U3RvcmUoc3RvcmU6IEZlYXR1cmVTdG9yZSkge1xyXG4gICAgaWYgKHRoaXMuc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlU3RvcmVTZWxlY3Rpb24odGhpcy5zdG9yZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRlYWN0aXZhdGVTdG9yZVNlbGVjdGlvbihzdG9yZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIGZlYXR1cmUgc2VsZWN0aW9uIGZyb20gdGhlIHN0b3JlIGFuZCBmcm9tIHRoZSBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIGRlYWN0aXZhdGVTdG9yZVNlbGVjdGlvbihzdG9yZTogRmVhdHVyZVN0b3JlKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdHJhdGVneSA9IHN0b3JlLmdldFN0cmF0ZWd5T2ZUeXBlKFxyXG4gICAgICBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneVxyXG4gICAgKTtcclxuICAgIGlmIChzZWxlY3Rpb25TdHJhdGVneSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNlbGVjdGlvblN0cmF0ZWd5LmRlYWN0aXZhdGUoKTtcclxuICAgICAgKHNlbGVjdGlvblN0cmF0ZWd5IGFzIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KS51bnNlbGVjdEFsbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVhY3RpdmF0ZSBmZWF0dXJlIHNlbGVjdGlvbiBmcm9tIHRoZSBzdG9yZSBhbmQgZnJvbSB0aGUgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmF0ZVN0b3JlU2VsZWN0aW9uKHN0b3JlOiBGZWF0dXJlU3RvcmUpIHtcclxuICAgIC8vIFRPRE86IG1heWJlIHdlIHNob3VsZCByZWNhdGl2YXRlIHRoZSBzdHJhdGVnaWVzIG9ubHkgaWYgdGhleVxyXG4gICAgLy8gd2VyZSBhY3RpdmUgaW4gdGhlIGZpcnN0IHBsYWNlXHJcbiAgICBzdG9yZS5hY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5KTtcclxuICB9XHJcbn1cclxuIl19