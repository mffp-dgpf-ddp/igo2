/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
export class ContextEditComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
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
        this.refresh();
    }
    /**
     * @return {?}
     */
    refresh() {
        this.cd.detectChanges();
    }
}
ContextEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-edit',
                template: "<igo-context-form *ngIf=\"context\"\r\n   [btnSubmitText]=\"'igo.context.contextManager.save' | translate\"\r\n   [context]=\"context\"\r\n   (submitForm)=\"submitForm.emit($event)\">\r\n</igo-context-form>\r\n"
            }] }
];
/** @nocollapse */
ContextEditComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
    /**
     * @type {?}
     * @private
     */
    ContextEditComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtZWRpdC9jb250ZXh0LWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUTFGLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFhL0IsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFGL0IsZUFBVSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRXJCLENBQUM7Ozs7SUFaN0MsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7OztJQU9ELE9BQU87UUFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUM7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsOE5BQTRDO2FBQzdDOzs7O1lBUGdELGlCQUFpQjs7O3NCQVMvRCxLQUFLO3lCQVVMLE1BQU07Ozs7Ozs7SUFGUCx3Q0FBMEI7O0lBRTFCLDBDQUFpRTs7Ozs7SUFFckQsa0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbnRleHQtZWRpdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRleHQtZWRpdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRFZGl0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZXh0KCk6IENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgfVxyXG4gIHNldCBjb250ZXh0KHZhbHVlOiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dDogQ29udGV4dDtcclxuXHJcbiAgQE91dHB1dCgpIHN1Ym1pdEZvcm06IEV2ZW50RW1pdHRlcjxDb250ZXh0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbn1cclxuIl19