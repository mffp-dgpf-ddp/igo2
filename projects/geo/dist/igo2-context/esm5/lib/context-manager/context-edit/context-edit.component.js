/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
var ContextEditComponent = /** @class */ (function () {
    function ContextEditComponent(cd) {
        this.cd = cd;
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
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ContextEditComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.cd.detectChanges();
    };
    ContextEditComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-edit',
                    template: "<igo-context-form *ngIf=\"context\"\r\n   [btnSubmitText]=\"'igo.context.contextManager.save' | translate\"\r\n   [context]=\"context\"\r\n   (submitForm)=\"submitForm.emit($event)\">\r\n</igo-context-form>\r\n"
                }] }
    ];
    /** @nocollapse */
    ContextEditComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    /**
     * @type {?}
     * @private
     */
    ContextEditComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZWRpdC9jb250ZXh0LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTFGO0lBaUJFLDhCQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUYvQixlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFckIsQ0FBQztJQVo3QyxzQkFDSSx5Q0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDOzs7T0FKQTs7OztJQVdELHNDQUFPOzs7SUFBUDtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Z0JBckJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1Qiw4TkFBNEM7aUJBQzdDOzs7O2dCQVBnRCxpQkFBaUI7OzswQkFTL0QsS0FBSzs2QkFVTCxNQUFNOztJQU9ULDJCQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0FsQlksb0JBQW9COzs7Ozs7SUFTL0Isd0NBQTBCOztJQUUxQiwwQ0FBaUU7Ozs7O0lBRXJELGtDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jb250ZXh0LWVkaXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZXh0LWVkaXQuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0RWRpdENvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGV4dCgpOiBDb250ZXh0IHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gIH1cclxuICBzZXQgY29udGV4dCh2YWx1ZTogQ29udGV4dCkge1xyXG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQ7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWJtaXRGb3JtOiBFdmVudEVtaXR0ZXI8Q29udGV4dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICByZWZyZXNoKCkge1xyXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==