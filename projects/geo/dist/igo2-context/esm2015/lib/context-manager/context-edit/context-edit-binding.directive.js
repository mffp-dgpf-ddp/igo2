/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Output, EventEmitter, Directive, Self, HostListener } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { ContextService } from '../shared/context.service';
import { ContextEditComponent } from './context-edit.component';
export class ContextEditBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} messageService
     * @param {?} languageService
     */
    constructor(component, contextService, messageService, languageService) {
        this.contextService = contextService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.submitSuccessed = new EventEmitter();
        this.component = component;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onEdit(context) {
        /** @type {?} */
        const id = this.component.context.id;
        this.contextService.update(id, context).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title || this.component.context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            this.messageService.success(message, title);
            this.contextService.setEditedContext(undefined);
            this.submitSuccessed.emit(context);
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.editedContext$$ = this.contextService.editedContext$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleEditedContextChange(context)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.editedContext$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleEditedContextChange(context) {
        this.component.context = context;
    }
}
ContextEditBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextEditBinding]'
            },] }
];
/** @nocollapse */
ContextEditBindingDirective.ctorParameters = () => [
    { type: ContextEditComponent, decorators: [{ type: Self }] },
    { type: ContextService },
    { type: MessageService },
    { type: LanguageService }
];
ContextEditBindingDirective.propDecorators = {
    submitSuccessed: [{ type: Output }],
    onEdit: [{ type: HostListener, args: ['submitForm', ['$event'],] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextEditBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    ContextEditBindingDirective.prototype.editedContext$$;
    /** @type {?} */
    ContextEditBindingDirective.prototype.submitSuccessed;
    /**
     * @type {?}
     * @private
     */
    ContextEditBindingDirective.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    ContextEditBindingDirective.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ContextEditBindingDirective.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1lZGl0L2NvbnRleHQtZWRpdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULElBQUksRUFHSixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBS2hFLE1BQU0sT0FBTywyQkFBMkI7Ozs7Ozs7SUFxQnRDLFlBQ1UsU0FBK0IsRUFDL0IsY0FBOEIsRUFDOUIsY0FBOEIsRUFDOUIsZUFBZ0M7UUFGaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFyQmhDLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUF1QnBFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBckJELE1BQU0sQ0FBQyxPQUFnQjs7Y0FDZixFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFOztrQkFDL0MsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7a0JBQzFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDJDQUEyQyxFQUFFO2dCQUM3RSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2FBQ3JELENBQUM7O2tCQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDO1lBQzlFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQVdELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFNBQVM7Ozs7UUFDakUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLEVBQ25ELENBQUM7SUFDSixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBRU8seUJBQXlCLENBQUMsT0FBd0I7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7OztZQTdDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjthQUNwQzs7OztZQUpRLG9CQUFvQix1QkEyQnhCLElBQUk7WUE1QkEsY0FBYztZQUhkLGNBQWM7WUFBRSxlQUFlOzs7OEJBYXJDLE1BQU07cUJBRU4sWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQUx0QyxnREFBd0M7Ozs7O0lBQ3hDLHNEQUFzQzs7SUFFdEMsc0RBQXNFOzs7OztJQW1CcEUscURBQXNDOzs7OztJQUN0QyxxREFBc0M7Ozs7O0lBQ3RDLHNEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBEaXJlY3RpdmUsXHJcbiAgU2VsZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbnRleHQsIERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRleHRFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWVkaXQuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0NvbnRleHRFZGl0QmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0RWRpdEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IENvbnRleHRFZGl0Q29tcG9uZW50O1xyXG4gIHByaXZhdGUgZWRpdGVkQ29udGV4dCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBPdXRwdXQoKSBzdWJtaXRTdWNjZXNzZWQ6IEV2ZW50RW1pdHRlcjxDb250ZXh0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc3VibWl0Rm9ybScsIFsnJGV2ZW50J10pXHJcbiAgb25FZGl0KGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5jb21wb25lbnQuY29udGV4dC5pZDtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UudXBkYXRlKGlkLCBjb250ZXh0KS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLnNhdmVNc2cnLCB7XHJcbiAgICAgICAgdmFsdWU6IGNvbnRleHQudGl0bGUgfHwgdGhpcy5jb21wb25lbnQuY29udGV4dC50aXRsZVxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLnNhdmVUaXRsZScpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnNldEVkaXRlZENvbnRleHQodW5kZWZpbmVkKTtcclxuICAgICAgdGhpcy5zdWJtaXRTdWNjZXNzZWQuZW1pdChjb250ZXh0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogQ29udGV4dEVkaXRDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZWRpdGVkQ29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5lZGl0ZWRDb250ZXh0JC5zdWJzY3JpYmUoXHJcbiAgICAgIGNvbnRleHQgPT4gdGhpcy5oYW5kbGVFZGl0ZWRDb250ZXh0Q2hhbmdlKGNvbnRleHQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVkaXRlZENvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFZGl0ZWRDb250ZXh0Q2hhbmdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==