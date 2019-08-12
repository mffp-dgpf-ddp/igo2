/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
var FormService = /** @class */ (function () {
    function FormService(formBuilder) {
        this.formBuilder = formBuilder;
    }
    /**
     * @param {?} fields
     * @param {?} groups
     * @return {?}
     */
    FormService.prototype.form = /**
     * @param {?} fields
     * @param {?} groups
     * @return {?}
     */
    function (fields, groups) {
        /** @type {?} */
        var control = this.formBuilder.group({});
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            control.addControl(field.name, field.control);
        }));
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            control.addControl(group.name, group.control);
        }));
        return { fields: fields, groups: groups, control: control };
    };
    /**
     * @param {?} config
     * @param {?} fields
     * @return {?}
     */
    FormService.prototype.group = /**
     * @param {?} config
     * @param {?} fields
     * @return {?}
     */
    function (config, fields) {
        /** @type {?} */
        var options = config.options || {};
        /** @type {?} */
        var control = this.formBuilder.group({});
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            control.addControl(field.name, field.control);
        }));
        control.setValidators(options.validator);
        return (/** @type {?} */ (Object.assign({}, config, { fields: fields, control: control })));
    };
    /**
     * @param {?} config
     * @return {?}
     */
    FormService.prototype.field = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var options = config.options || {};
        /** @type {?} */
        var state = Object.assign({ value: '' }, {
            disabled: options.disabled
        });
        /** @type {?} */
        var control = this.formBuilder.control(state);
        control.setValidators(options.validator);
        return (/** @type {?} */ (Object.assign({ type: 'text' }, config, { control: control })));
    };
    /**
     * @param {?} config
     * @param {?} partial
     * @return {?}
     */
    FormService.prototype.extendFieldConfig = /**
     * @param {?} config
     * @param {?} partial
     * @return {?}
     */
    function (config, partial) {
        /** @type {?} */
        var options = Object.assign({}, config.options || {}, partial.options || {});
        /** @type {?} */
        var inputs = Object.assign({}, config.inputs || {}, partial.inputs || {});
        /** @type {?} */
        var subscribers = Object.assign({}, config.subscribers || {}, partial.subscribers || {});
        return Object.assign({}, config, { options: options, inputs: inputs, subscribers: subscribers });
    };
    FormService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FormService.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    /** @nocollapse */ FormService.ngInjectableDef = i0.defineInjectable({ factory: function FormService_Factory() { return new FormService(i0.inject(i1.FormBuilder)); }, token: FormService, providedIn: "root" });
    return FormService;
}());
export { FormService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormService.prototype.formBuilder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2Zvcm0vc2hhcmVkL2Zvcm0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQVU3QztJQUtFLHFCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7Ozs7OztJQUVoRCwwQkFBSTs7Ozs7SUFBSixVQUFLLE1BQW1CLEVBQUUsTUFBd0I7O1lBQzFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEtBQWdCO1lBQzlCLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxFQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsS0FBcUI7WUFDbkMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sRUFBQyxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUVELDJCQUFLOzs7OztJQUFMLFVBQU0sTUFBNEIsRUFBRSxNQUFtQjs7WUFDL0MsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRTs7WUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsS0FBZ0I7WUFDOUIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLE9BQU8sbUJBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUMsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQyxFQUFrQixDQUFDO0lBQ3hFLENBQUM7Ozs7O0lBRUQsMkJBQUs7Ozs7SUFBTCxVQUFNLE1BQXVCOztZQUNyQixPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFOztZQUM5QixLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsRUFBRTtZQUN2QyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7U0FDM0IsQ0FBQzs7WUFDSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLE9BQU8sbUJBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBRSxNQUFNLEVBQUUsRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLEVBQWEsQ0FBQztJQUN2RSxDQUFDOzs7Ozs7SUFFRCx1Q0FBaUI7Ozs7O0lBQWpCLFVBQWtCLE1BQXVCLEVBQUUsT0FBaUM7O1lBQ3BFLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7WUFDeEUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDOztZQUNyRSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDMUYsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBQyxPQUFPLFNBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxXQUFXLGFBQUEsRUFBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Z0JBOUNGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBWlEsV0FBVzs7O3NCQURwQjtDQTJEQyxBQWhERCxJQWdEQztTQTdDWSxXQUFXOzs7Ozs7SUFFVixrQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBGb3JtLFxyXG4gIEZvcm1GaWVsZCxcclxuICBGb3JtRmllbGRDb25maWcsXHJcbiAgRm9ybUZpZWxkR3JvdXAsXHJcbiAgRm9ybUZpZWxkR3JvdXBDb25maWdcclxufSBmcm9tICcuL2Zvcm0uaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7fVxyXG5cclxuICBmb3JtKGZpZWxkczogRm9ybUZpZWxkW10sIGdyb3VwczogRm9ybUZpZWxkR3JvdXBbXSk6IEZvcm0ge1xyXG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xyXG4gICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBGb3JtRmllbGQpID0+IHtcclxuICAgICAgY29udHJvbC5hZGRDb250cm9sKGZpZWxkLm5hbWUsIGZpZWxkLmNvbnRyb2wpO1xyXG4gICAgfSk7XHJcbiAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXA6IEZvcm1GaWVsZEdyb3VwKSA9PiB7XHJcbiAgICAgIGNvbnRyb2wuYWRkQ29udHJvbChncm91cC5uYW1lLCBncm91cC5jb250cm9sKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7ZmllbGRzLCBncm91cHMsIGNvbnRyb2x9O1xyXG4gIH1cclxuXHJcbiAgZ3JvdXAoY29uZmlnOiBGb3JtRmllbGRHcm91cENvbmZpZywgZmllbGRzOiBGb3JtRmllbGRbXSk6IEZvcm1GaWVsZEdyb3VwIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBjb25maWcub3B0aW9ucyB8fCB7fTtcclxuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcclxuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogRm9ybUZpZWxkKSA9PiB7XHJcbiAgICAgIGNvbnRyb2wuYWRkQ29udHJvbChmaWVsZC5uYW1lLCBmaWVsZC5jb250cm9sKTtcclxuICAgIH0pO1xyXG4gICAgY29udHJvbC5zZXRWYWxpZGF0b3JzKG9wdGlvbnMudmFsaWRhdG9yKTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCB7ZmllbGRzLCBjb250cm9sfSkgYXMgRm9ybUZpZWxkR3JvdXA7XHJcbiAgfVxyXG5cclxuICBmaWVsZChjb25maWc6IEZvcm1GaWVsZENvbmZpZyk6IEZvcm1GaWVsZCB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gY29uZmlnLm9wdGlvbnMgfHwge307XHJcbiAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe3ZhbHVlOiAnJ30sIHtcclxuICAgICAgZGlzYWJsZWQ6IG9wdGlvbnMuZGlzYWJsZWRcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbChzdGF0ZSk7XHJcbiAgICBjb250cm9sLnNldFZhbGlkYXRvcnMob3B0aW9ucy52YWxpZGF0b3IpO1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt0eXBlOiAndGV4dCd9LCBjb25maWcsIHtjb250cm9sfSkgYXMgRm9ybUZpZWxkO1xyXG4gIH1cclxuXHJcbiAgZXh0ZW5kRmllbGRDb25maWcoY29uZmlnOiBGb3JtRmllbGRDb25maWcsIHBhcnRpYWw6IFBhcnRpYWw8Rm9ybUZpZWxkQ29uZmlnPik6IEZvcm1GaWVsZENvbmZpZyB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLm9wdGlvbnMgfHwge30sIHBhcnRpYWwub3B0aW9ucyB8fCB7fSk7XHJcbiAgICBjb25zdCBpbnB1dHMgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcuaW5wdXRzIHx8IHt9LCBwYXJ0aWFsLmlucHV0cyB8fCB7fSk7XHJcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZy5zdWJzY3JpYmVycyB8fCB7fSwgcGFydGlhbC5zdWJzY3JpYmVycyB8fCB7fSk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCB7b3B0aW9ucywgaW5wdXRzLCBzdWJzY3JpYmVyc30pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19