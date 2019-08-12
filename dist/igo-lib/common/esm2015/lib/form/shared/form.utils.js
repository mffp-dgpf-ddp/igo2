/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} control
 * @return {?}
 */
export function formControlIsRequired(control) {
    if (control.validator) {
        /** @type {?} */
        const validator = control.validator((/** @type {?} */ ({})));
        if (validator && validator.required) {
            return true;
        }
    }
    if (((/** @type {?} */ (control))).controls) {
        /** @type {?} */
        const requiredControl = Object.keys(((/** @type {?} */ (control))).controls).find((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            return formControlIsRequired(((/** @type {?} */ (control))).controls[key]);
        }));
        return requiredControl !== undefined;
    }
    return false;
}
/**
 * @return {?}
 */
export function getDefaultErrorMessages() {
    return {
        required: 'igo.common.form.errors.required'
    };
}
/**
 * @param {?} control
 * @param {?} messages
 * @return {?}
 */
export function getControlErrorMessage(control, messages) {
    /** @type {?} */
    const errors = control.errors || {};
    /** @type {?} */
    const errorKeys = Object.keys(errors);
    /** @type {?} */
    const errorMessages = errorKeys
        .map((/**
     * @param {?} key
     * @return {?}
     */
    (key) => messages[key]))
        .filter((/**
     * @param {?} message
     * @return {?}
     */
    (message) => message !== undefined));
    return errorMessages.length > 0 ? errorMessages[0] : '';
}
/**
 * @param {?} form
 * @return {?}
 */
export function getAllFormFields(form) {
    return form.groups.reduce((/**
     * @param {?} acc
     * @param {?} group
     * @return {?}
     */
    (acc, group) => {
        return acc.concat(group.fields);
    }), [].concat(form.fields));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL3NoYXJlZC9mb3JtLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE9BQXdCO0lBQzVELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTs7Y0FDZixTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBQSxFQUFFLEVBQW1CLENBQUM7UUFDMUQsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxJQUFJLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUU7O2NBQ3ZCLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUNsRixPQUFPLHFCQUFxQixDQUFDLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLEVBQUM7UUFDRixPQUFPLGVBQWUsS0FBSyxTQUFTLENBQUM7S0FDdEM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsdUJBQXVCO0lBQ3JDLE9BQU87UUFDTCxRQUFRLEVBQUUsaUNBQWlDO0tBQzVDLENBQUM7QUFDSixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsT0FBd0IsRUFBRSxRQUFpQzs7VUFDMUYsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRTs7VUFDN0IsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztVQUMvQixhQUFhLEdBQUcsU0FBUztTQUM1QixHQUFHOzs7O0lBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBQztTQUNuQyxNQUFNOzs7O0lBQUMsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUM7SUFDckQsT0FBTyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBVTtJQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTs7Ozs7SUFBQyxDQUFDLEdBQWdCLEVBQUUsS0FBcUIsRUFBRSxFQUFFO1FBQ3BFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFFN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZvcm0sIEZvcm1GaWVsZCwgRm9ybUZpZWxkR3JvdXAgfSBmcm9tICcuL2Zvcm0uaW50ZXJmYWNlcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybUNvbnRyb2xJc1JlcXVpcmVkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IGJvb2xlYW4ge1xyXG4gIGlmIChjb250cm9sLnZhbGlkYXRvcikge1xyXG4gICAgY29uc3QgdmFsaWRhdG9yID0gY29udHJvbC52YWxpZGF0b3Ioe30gYXMgQWJzdHJhY3RDb250cm9sKTtcclxuICAgIGlmICh2YWxpZGF0b3IgJiYgdmFsaWRhdG9yLnJlcXVpcmVkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKChjb250cm9sIGFzIGFueSkuY29udHJvbHMpIHtcclxuICAgIGNvbnN0IHJlcXVpcmVkQ29udHJvbCA9IE9iamVjdC5rZXlzKChjb250cm9sIGFzIGFueSkuY29udHJvbHMpLmZpbmQoKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHJldHVybiBmb3JtQ29udHJvbElzUmVxdWlyZWQoKGNvbnRyb2wgYXMgYW55KS5jb250cm9sc1trZXldKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcXVpcmVkQ29udHJvbCAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEVycm9yTWVzc2FnZXMoKToge1trZXk6IHN0cmluZ106IHN0cmluZ30ge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXF1aXJlZDogJ2lnby5jb21tb24uZm9ybS5lcnJvcnMucmVxdWlyZWQnXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyb2xFcnJvck1lc3NhZ2UoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBtZXNzYWdlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBzdHJpbmcge1xyXG4gIGNvbnN0IGVycm9ycyA9IGNvbnRyb2wuZXJyb3JzIHx8IHt9O1xyXG4gIGNvbnN0IGVycm9yS2V5cyA9IE9iamVjdC5rZXlzKGVycm9ycyk7XHJcbiAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IGVycm9yS2V5c1xyXG4gICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IG1lc3NhZ2VzW2tleV0pXHJcbiAgICAuZmlsdGVyKChtZXNzYWdlOiBzdHJpbmcpID0+IG1lc3NhZ2UgIT09IHVuZGVmaW5lZCk7XHJcbiAgcmV0dXJuIGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCA/IGVycm9yTWVzc2FnZXNbMF0gOiAnJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbEZvcm1GaWVsZHMoZm9ybTogRm9ybSk6IEZvcm1GaWVsZFtdIHtcclxuICByZXR1cm4gZm9ybS5ncm91cHMucmVkdWNlKChhY2M6IEZvcm1GaWVsZFtdLCBncm91cDogRm9ybUZpZWxkR3JvdXApID0+IHtcclxuICAgIHJldHVybiBhY2MuY29uY2F0KGdyb3VwLmZpZWxkcyk7XHJcbiAgfSwgW10uY29uY2F0KGZvcm0uZmllbGRzKSk7XHJcblxyXG59XHJcbiJdfQ==