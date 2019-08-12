/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, HostListener } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { ContextService } from '../shared/context.service';
import { ContextEditComponent } from './context-edit.component';
var ContextEditBindingDirective = /** @class */ (function () {
    function ContextEditBindingDirective(component, contextService, messageService, languageService) {
        this.contextService = contextService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.component = component;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    ContextEditBindingDirective.prototype.onEdit = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var id = this.component.context.id;
        this.contextService.update(id, context).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title || _this.component.context.title
            });
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @return {?}
     */
    ContextEditBindingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.editedContext$$ = this.contextService.editedContext$.subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return _this.handleEditedContextChange(context); }));
    };
    /**
     * @return {?}
     */
    ContextEditBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.editedContext$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    ContextEditBindingDirective.prototype.handleEditedContextChange = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.component.context = context;
    };
    ContextEditBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoContextEditBinding]'
                },] }
    ];
    /** @nocollapse */
    ContextEditBindingDirective.ctorParameters = function () { return [
        { type: ContextEditComponent, decorators: [{ type: Self }] },
        { type: ContextService },
        { type: MessageService },
        { type: LanguageService }
    ]; };
    ContextEditBindingDirective.propDecorators = {
        onEdit: [{ type: HostListener, args: ['submitForm', ['$event'],] }]
    };
    return ContextEditBindingDirective;
}());
export { ContextEditBindingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1lZGl0L2NvbnRleHQtZWRpdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBR0osWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRTtJQW9CRSxxQ0FDVSxTQUErQixFQUMvQixjQUE4QixFQUM5QixjQUE4QixFQUM5QixlQUFnQztRQUZoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7OztJQW5CRCw0Q0FBTTs7OztJQUROLFVBQ08sT0FBZ0I7UUFEdkIsaUJBV0M7O1lBVE8sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVM7OztRQUFDOztnQkFDMUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7Z0JBQzFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDJDQUEyQyxFQUFFO2dCQUM3RSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2FBQ3JELENBQUM7O2dCQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDO1lBQzlFLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFXRCw4Q0FBUTs7O0lBQVI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsU0FBUzs7OztRQUNqRSxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsRUFBdkMsQ0FBdUMsRUFDbkQsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxpREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUVPLCtEQUF5Qjs7Ozs7SUFBakMsVUFBa0MsT0FBd0I7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7O2dCQXpDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtpQkFDcEM7Ozs7Z0JBSlEsb0JBQW9CLHVCQXVCeEIsSUFBSTtnQkF4QkEsY0FBYztnQkFIZCxjQUFjO2dCQUFFLGVBQWU7Ozt5QkFhckMsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFtQ3hDLGtDQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0F2Q1ksMkJBQTJCOzs7Ozs7SUFDdEMsZ0RBQXdDOzs7OztJQUN4QyxzREFBc0M7Ozs7O0lBaUJwQyxxREFBc0M7Ozs7O0lBQ3RDLHFEQUFzQzs7Ozs7SUFDdEMsc0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgU2VsZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbnRleHQsIERldGFpbGVkQ29udGV4dCB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRleHRFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWVkaXQuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0NvbnRleHRFZGl0QmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0RWRpdEJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IENvbnRleHRFZGl0Q29tcG9uZW50O1xyXG4gIHByaXZhdGUgZWRpdGVkQ29udGV4dCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3N1Ym1pdEZvcm0nLCBbJyRldmVudCddKVxyXG4gIG9uRWRpdChjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuY29tcG9uZW50LmNvbnRleHQuaWQ7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnVwZGF0ZShpZCwgY29udGV4dCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5zYXZlTXNnJywge1xyXG4gICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlIHx8IHRoaXMuY29tcG9uZW50LmNvbnRleHQudGl0bGVcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5zYXZlVGl0bGUnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogQ29udGV4dEVkaXRDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZWRpdGVkQ29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5lZGl0ZWRDb250ZXh0JC5zdWJzY3JpYmUoXHJcbiAgICAgIGNvbnRleHQgPT4gdGhpcy5oYW5kbGVFZGl0ZWRDb250ZXh0Q2hhbmdlKGNvbnRleHQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVkaXRlZENvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFZGl0ZWRDb250ZXh0Q2hhbmdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==