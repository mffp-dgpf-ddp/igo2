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
        var validator = control.validator((/** @type {?} */ ({})));
        if (validator && validator.required) {
            return true;
        }
    }
    if (((/** @type {?} */ (control))).controls) {
        /** @type {?} */
        var requiredControl = Object.keys(((/** @type {?} */ (control))).controls).find((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
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
    var errors = control.errors || {};
    /** @type {?} */
    var errorKeys = Object.keys(errors);
    /** @type {?} */
    var errorMessages = errorKeys
        .map((/**
     * @param {?} key
     * @return {?}
     */
    function (key) { return messages[key]; }))
        .filter((/**
     * @param {?} message
     * @return {?}
     */
    function (message) { return message !== undefined; }));
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
    function (acc, group) {
        return acc.concat(group.fields);
    }), [].concat(form.fields));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL3NoYXJlZC9mb3JtLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE9BQXdCO0lBQzVELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTs7WUFDZixTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBQSxFQUFFLEVBQW1CLENBQUM7UUFDMUQsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxJQUFJLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUU7O1lBQ3ZCLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQyxHQUFXO1lBQzlFLE9BQU8scUJBQXFCLENBQUMsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsRUFBQztRQUNGLE9BQU8sZUFBZSxLQUFLLFNBQVMsQ0FBQztLQUN0QztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSx1QkFBdUI7SUFDckMsT0FBTztRQUNMLFFBQVEsRUFBRSxpQ0FBaUM7S0FDNUMsQ0FBQztBQUNKLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUF3QixFQUFFLFFBQWlDOztRQUMxRixNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFOztRQUM3QixTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O1FBQy9CLGFBQWEsR0FBRyxTQUFTO1NBQzVCLEdBQUc7Ozs7SUFBQyxVQUFDLEdBQVcsSUFBSyxPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBYixDQUFhLEVBQUM7U0FDbkMsTUFBTTs7OztJQUFDLFVBQUMsT0FBZSxJQUFLLE9BQUEsT0FBTyxLQUFLLFNBQVMsRUFBckIsQ0FBcUIsRUFBQztJQUNyRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFVO0lBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNOzs7OztJQUFDLFVBQUMsR0FBZ0IsRUFBRSxLQUFxQjtRQUNoRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUMsR0FBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBRTdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtLCBGb3JtRmllbGQsIEZvcm1GaWVsZEdyb3VwIH0gZnJvbSAnLi9mb3JtLmludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1Db250cm9sSXNSZXF1aXJlZChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBib29sZWFuIHtcclxuICBpZiAoY29udHJvbC52YWxpZGF0b3IpIHtcclxuICAgIGNvbnN0IHZhbGlkYXRvciA9IGNvbnRyb2wudmFsaWRhdG9yKHt9IGFzIEFic3RyYWN0Q29udHJvbCk7XHJcbiAgICBpZiAodmFsaWRhdG9yICYmIHZhbGlkYXRvci5yZXF1aXJlZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICgoY29udHJvbCBhcyBhbnkpLmNvbnRyb2xzKSB7XHJcbiAgICBjb25zdCByZXF1aXJlZENvbnRyb2wgPSBPYmplY3Qua2V5cygoY29udHJvbCBhcyBhbnkpLmNvbnRyb2xzKS5maW5kKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICByZXR1cm4gZm9ybUNvbnRyb2xJc1JlcXVpcmVkKChjb250cm9sIGFzIGFueSkuY29udHJvbHNba2V5XSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXF1aXJlZENvbnRyb2wgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRFcnJvck1lc3NhZ2VzKCk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9IHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVxdWlyZWQ6ICdpZ28uY29tbW9uLmZvcm0uZXJyb3JzLnJlcXVpcmVkJ1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sRXJyb3JNZXNzYWdlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgbWVzc2FnZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KTogc3RyaW5nIHtcclxuICBjb25zdCBlcnJvcnMgPSBjb250cm9sLmVycm9ycyB8fCB7fTtcclxuICBjb25zdCBlcnJvcktleXMgPSBPYmplY3Qua2V5cyhlcnJvcnMpO1xyXG4gIGNvbnN0IGVycm9yTWVzc2FnZXMgPSBlcnJvcktleXNcclxuICAgIC5tYXAoKGtleTogc3RyaW5nKSA9PiBtZXNzYWdlc1trZXldKVxyXG4gICAgLmZpbHRlcigobWVzc2FnZTogc3RyaW5nKSA9PiBtZXNzYWdlICE9PSB1bmRlZmluZWQpO1xyXG4gIHJldHVybiBlcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBlcnJvck1lc3NhZ2VzWzBdIDogJyc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxGb3JtRmllbGRzKGZvcm06IEZvcm0pOiBGb3JtRmllbGRbXSB7XHJcbiAgcmV0dXJuIGZvcm0uZ3JvdXBzLnJlZHVjZSgoYWNjOiBGb3JtRmllbGRbXSwgZ3JvdXA6IEZvcm1GaWVsZEdyb3VwKSA9PiB7XHJcbiAgICByZXR1cm4gYWNjLmNvbmNhdChncm91cC5maWVsZHMpO1xyXG4gIH0sIFtdLmNvbmNhdChmb3JtLmZpZWxkcykpO1xyXG5cclxufVxyXG4iXX0=