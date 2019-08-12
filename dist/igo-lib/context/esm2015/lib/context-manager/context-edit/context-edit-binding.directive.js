/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, HostListener } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1lZGl0L2NvbnRleHQtZWRpdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBR0osWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUtoRSxNQUFNLE9BQU8sMkJBQTJCOzs7Ozs7O0lBaUJ0QyxZQUNVLFNBQStCLEVBQy9CLGNBQThCLEVBQzlCLGNBQThCLEVBQzlCLGVBQWdDO1FBRmhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXhDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBbkJELE1BQU0sQ0FBQyxPQUFnQjs7Y0FDZixFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFOztrQkFDL0MsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7a0JBQzFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDJDQUEyQyxFQUFFO2dCQUM3RSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2FBQ3JELENBQUM7O2tCQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDO1lBQzlFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFXRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQ2pFLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxFQUNuRCxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUVPLHlCQUF5QixDQUFDLE9BQXdCO1FBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNuQyxDQUFDOzs7WUF6Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7YUFDcEM7Ozs7WUFKUSxvQkFBb0IsdUJBdUJ4QixJQUFJO1lBeEJBLGNBQWM7WUFIZCxjQUFjO1lBQUUsZUFBZTs7O3FCQWFyQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBSHRDLGdEQUF3Qzs7Ozs7SUFDeEMsc0RBQXNDOzs7OztJQWlCcEMscURBQXNDOzs7OztJQUN0QyxxREFBc0M7Ozs7O0lBQ3RDLHNEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBIb3N0TGlzdGVuZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb250ZXh0LCBEZXRhaWxlZENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1lZGl0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Db250ZXh0RWRpdEJpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEVkaXRCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBDb250ZXh0RWRpdENvbXBvbmVudDtcclxuICBwcml2YXRlIGVkaXRlZENvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdzdWJtaXRGb3JtJywgWyckZXZlbnQnXSlcclxuICBvbkVkaXQoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmNvbXBvbmVudC5jb250ZXh0LmlkO1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS51cGRhdGUoaWQsIGNvbnRleHQpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuc2F2ZU1zZycsIHtcclxuICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZSB8fCB0aGlzLmNvbXBvbmVudC5jb250ZXh0LnRpdGxlXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuc2F2ZVRpdGxlJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IENvbnRleHRFZGl0Q29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmVkaXRlZENvbnRleHQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZWRpdGVkQ29udGV4dCQuc3Vic2NyaWJlKFxyXG4gICAgICBjb250ZXh0ID0+IHRoaXMuaGFuZGxlRWRpdGVkQ29udGV4dENoYW5nZShjb250ZXh0KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5lZGl0ZWRDb250ZXh0JCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRWRpdGVkQ29udGV4dENoYW5nZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMuY29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0O1xyXG4gIH1cclxufVxyXG4iXX0=