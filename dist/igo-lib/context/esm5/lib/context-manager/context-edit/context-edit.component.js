/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var ContextEditComponent = /** @class */ (function () {
    function ContextEditComponent() {
        this.submitForm = new EventEmitter();
    }
    Object.defineProperty(ContextEditComponent.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            return this._context;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    ContextEditComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-edit',
                    template: "<igo-context-form *ngIf=\"context\"\r\n   [btnSubmitText]=\"'igo.context.contextManager.save' | translate\"\r\n   [context]=\"context\"\r\n   (submitForm)=\"submitForm.emit($event)\">\r\n</igo-context-form>\r\n"
                }] }
    ];
    /** @nocollapse */
    ContextEditComponent.ctorParameters = function () { return []; };
    ContextEditComponent.propDecorators = {
        context: [{ type: Input }],
        submitForm: [{ type: Output }]
    };
    return ContextEditComponent;
}());
export { ContextEditComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextEditComponent.prototype._context;
    /** @type {?} */
    ContextEditComponent.prototype.submitForm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZWRpdC9jb250ZXh0LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXZFO0lBZ0JFO1FBRlUsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRTlDLENBQUM7SUFYaEIsc0JBQ0kseUNBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQUNELFVBQVksS0FBYztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FIQTs7Z0JBUkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLDhOQUE0QztpQkFDN0M7Ozs7OzBCQUVFLEtBQUs7NkJBU0wsTUFBTTs7SUFHVCwyQkFBQztDQUFBLEFBakJELElBaUJDO1NBYlksb0JBQW9COzs7Ozs7SUFRL0Isd0NBQTBCOztJQUUxQiwwQ0FBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jb250ZXh0LWVkaXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZXh0LWVkaXQuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0RWRpdENvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGV4dCgpOiBDb250ZXh0IHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gIH1cclxuICBzZXQgY29udGV4dCh2YWx1ZTogQ29udGV4dCkge1xyXG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb250ZXh0OiBDb250ZXh0O1xyXG5cclxuICBAT3V0cHV0KCkgc3VibWl0Rm9ybTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=