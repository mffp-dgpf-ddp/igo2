/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class ContextEditComponent {
    constructor() {
        this.submitForm = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
    }
}
ContextEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-edit',
                template: "<igo-context-form *ngIf=\"context\"\r\n   [btnSubmitText]=\"'igo.context.contextManager.save' | translate\"\r\n   [context]=\"context\"\r\n   (submitForm)=\"submitForm.emit($event)\">\r\n</igo-context-form>\r\n"
            }] }
];
/** @nocollapse */
ContextEditComponent.ctorParameters = () => [];
ContextEditComponent.propDecorators = {
    context: [{ type: Input }],
    submitForm: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextEditComponent.prototype._context;
    /** @type {?} */
    ContextEditComponent.prototype.submitForm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZWRpdC9jb250ZXh0LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUXZFLE1BQU0sT0FBTyxvQkFBb0I7SUFZL0I7UUFGVSxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFOUMsQ0FBQzs7OztJQVhoQixJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7OztZQVhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qiw4TkFBNEM7YUFDN0M7Ozs7O3NCQUVFLEtBQUs7eUJBU0wsTUFBTTs7Ozs7OztJQUZQLHdDQUEwQjs7SUFFMUIsMENBQTZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY29udGV4dC1lZGl0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1lZGl0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEVkaXRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRleHQoKTogQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcbiAgc2V0IGNvbnRleHQodmFsdWU6IENvbnRleHQpIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dDogQ29udGV4dDtcclxuXHJcbiAgQE91dHB1dCgpIHN1Ym1pdEZvcm06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19