/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class FeatureFormComponent {
    constructor() {
        this.feature$ = new BehaviorSubject(undefined);
        /**
         * Event emitted when the form is submitted
         */
        this.submitForm = new EventEmitter();
    }
    /**
     * Feature to update
     * @param {?} value
     * @return {?}
     */
    set feature(value) { this.feature$.next(value); }
    /**
     * @return {?}
     */
    get feature() { return this.feature$.value; }
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
     * @return {?}
     */
    getData() {
        return this.formDataToFeature(this.igoForm.getData());
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
}
FeatureFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-feature-form',
                template: "\r\n<igo-form\r\n  #igoForm\r\n  [form]=\"form\"\r\n  [formData]=\"feature$ | async\"\r\n  (submitForm)=\"onSubmit($event)\">\r\n\r\n  <ng-content></ng-content>\r\n  \r\n  <ng-content select=\"[formButtons]\" formButtons></ng-content>\r\n  \r\n</igo-form>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}igo-form{height:100%}"]
            }] }
];
/** @nocollapse */
FeatureFormComponent.ctorParameters = () => [];
FeatureFormComponent.propDecorators = {
    form: [{ type: Input }],
    feature: [{ type: Input }],
    submitForm: [{ type: Output }],
    igoForm: [{ type: ViewChild, args: ['igoForm',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZm9ybS9mZWF0dXJlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQVEsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztBQWdCbEQsTUFBTSxPQUFPLG9CQUFvQjtJQXNCL0I7UUFUUyxhQUFRLEdBQTZCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS25FLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBSXBDLENBQUM7Ozs7OztJQVpoQixJQUNJLE9BQU8sQ0FBQyxLQUEwQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUN0RSxJQUFJLE9BQU8sS0FBMEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7SUFpQmxFLFFBQVEsQ0FBQyxJQUE0Qjs7Y0FDN0IsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7OztJQU9PLGlCQUFpQixDQUFDLElBQTRCOztjQUM5QyxVQUFVLEdBQUcsRUFBRTs7Y0FDZixJQUFJLEdBQUcsRUFBRTtRQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDOUIsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQztTQUMzQjthQUFNO1lBQ0wsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDckMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQzlDLENBQUMsQ0FBQztTQUNKOztjQUVLLGNBQWMsR0FBRyxhQUFhO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBb0IsRUFBRSxFQUFFO2tCQUM5QyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxLQUFLO1lBQzFCLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTs7c0JBQzVCLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xELFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDOUI7UUFDSCxDQUFDLEVBQUMsQ0FBQzs7WUFFQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7UUFDNUIsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3hELFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUNsQztRQUVELE9BQU87WUFDTCxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFlO1lBQ3pCLElBQUksRUFBRSxPQUFPO1lBQ2IsUUFBUTtZQUNSLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFVBQVU7U0FDWCxDQUFDO0lBQ0osQ0FBQzs7O1lBbEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QiwrUUFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozs7bUJBTUUsS0FBSztzQkFLTCxLQUFLO3lCQVFMLE1BQU07c0JBRU4sU0FBUyxTQUFDLFNBQVM7Ozs7Ozs7SUFmcEIsb0NBQW9COztJQVFwQix3Q0FBNkU7Ozs7O0lBSzdFLDBDQUFtRDs7SUFFbkQsdUNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybSwgRm9ybUNvbXBvbmVudCwgZ2V0RW50aXR5UmV2aXNpb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRkVBVFVSRSB9IGZyb20gJy4uL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZU1ldGEgfSBmcm9tICcuLi9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbmZpZ3VyYWJsZSBmb3JtLCBvcHRpb25uYWxseSBib3VuZCB0byBhIGZlYXR1cmUuXHJcbiAqIFRoaXMgY29tcG9uZW50IGNyZWF0ZXMgYW4gZW50aXR5IGZvcm0gYW5kLCBvbiBzdWJtaXQsXHJcbiAqIHJldHVybnMgYSBmZWF0dXJlIG1hZGUgb3V0IG9mIHRoZSBzdWJtaXR0ZWQgZGF0YS4gSXQgYWxzb1xyXG4gKiBkb2VzIHRoaW5ncyBsaWtlIG1hbmFnaW5nIHRoZSBmZWF0dXJlIHZpc2liaWxpdHkgd2hpbGUgaXQncyBiZWluZyB1cGRhdGVkXHJcbiAqIGFzIHdlbGwgYXMgZGlzYWJsaW5nIHRoZSBzZWxlY3Rpb24gb2YgYW5vdGhlciBmZWF0dXJlLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZmVhdHVyZS1mb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmVhdHVyZS1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mZWF0dXJlLWZvcm0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZUZvcm1Db21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybTogRm9ybTtcclxuXHJcbiAgLyoqXHJcbiAgICogRmVhdHVyZSB0byB1cGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlIHwgdW5kZWZpbmVkKSB7IHRoaXMuZmVhdHVyZSQubmV4dCh2YWx1ZSk7IH1cclxuICBnZXQgZmVhdHVyZSgpOiBGZWF0dXJlIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuZmVhdHVyZSQudmFsdWU7IH1cclxuICByZWFkb25seSBmZWF0dXJlJDogQmVoYXZpb3JTdWJqZWN0PEZlYXR1cmU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHN1Ym1pdEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPEZlYXR1cmU+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2lnb0Zvcm0nKSBpZ29Gb3JtOiBGb3JtQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zZm9ybSB0aGUgZm9ybSBkYXRhIHRvIGEgZmVhdHVyZSBhbmQgZW1pdCBhbiBldmVudFxyXG4gICAqIEBwYXJhbSBldmVudCBGb3JtIHN1Ym1pdCBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU3VibWl0KGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmZvcm1EYXRhVG9GZWF0dXJlKGRhdGEpO1xyXG4gICAgdGhpcy5zdWJtaXRGb3JtLmVtaXQoZmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRhKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybURhdGFUb0ZlYXR1cmUodGhpcy5pZ29Gb3JtLmdldERhdGEoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2Zvcm0gdGhlIGZvcm0gZGF0YSB0byBhIGZlYXR1cmVcclxuICAgKiBAcGFyYW0gZGF0YSBGb3JtIGRhdGFcclxuICAgKiBAcmV0dXJucyBBIGZlYXR1cmVcclxuICAgKi9cclxuICBwcml2YXRlIGZvcm1EYXRhVG9GZWF0dXJlKGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBGZWF0dXJlIHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcclxuICAgIGNvbnN0IG1ldGEgPSB7fTtcclxuICAgIGlmICh0aGlzLmZlYXR1cmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAobWV0YSBhcyBhbnkpLmlkID0gdXVpZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB0aGlzLmZlYXR1cmUucHJvcGVydGllcyk7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24obWV0YSwgdGhpcy5mZWF0dXJlLm1ldGEsIHtcclxuICAgICAgICByZXZpc2lvbjogZ2V0RW50aXR5UmV2aXNpb24odGhpcy5mZWF0dXJlKSArIDFcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvcGVydHlQcmVmaXggPSAncHJvcGVydGllcy4nO1xyXG4gICAgT2JqZWN0LmVudHJpZXMoZGF0YSkuZm9yRWFjaCgoZW50cnk6IFtzdHJpbmcsIGFueV0pID0+IHtcclxuICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cnk7XHJcbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChwcm9wZXJ0eVByZWZpeCkpIHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGtleS5zdWJzdHIocHJvcGVydHlQcmVmaXgubGVuZ3RoKTtcclxuICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZ2VvbWV0cnkgPSBkYXRhLmdlb21ldHJ5O1xyXG4gICAgaWYgKGdlb21ldHJ5ID09PSB1bmRlZmluZWQgJiYgdGhpcy5mZWF0dXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZ2VvbWV0cnkgPSB0aGlzLmZlYXR1cmUuZ2VvbWV0cnk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWV0YTogbWV0YSBhcyBGZWF0dXJlTWV0YSxcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgZ2VvbWV0cnksXHJcbiAgICAgIHByb2plY3Rpb246ICdFUFNHOjQzMjYnLFxyXG4gICAgICBwcm9wZXJ0aWVzXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=