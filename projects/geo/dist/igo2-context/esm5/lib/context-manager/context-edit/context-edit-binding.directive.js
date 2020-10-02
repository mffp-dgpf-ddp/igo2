/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Output, EventEmitter, Directive, Self, HostListener } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { ContextService } from '../shared/context.service';
import { ContextEditComponent } from './context-edit.component';
var ContextEditBindingDirective = /** @class */ (function () {
    function ContextEditBindingDirective(component, contextService, messageService, languageService) {
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
            _this.contextService.setEditedContext(undefined);
            _this.submitSuccessed.emit(context);
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
        submitSuccessed: [{ type: Output }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1lZGl0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1lZGl0L2NvbnRleHQtZWRpdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULElBQUksRUFHSixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFO0lBd0JFLHFDQUNVLFNBQStCLEVBQy9CLGNBQThCLEVBQzlCLGNBQThCLEVBQzlCLGVBQWdDO1FBRmhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBckJoQyxvQkFBZSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBdUJwRSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7OztJQXJCRCw0Q0FBTTs7OztJQUROLFVBQ08sT0FBZ0I7UUFEdkIsaUJBYUM7O1lBWE8sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVM7OztRQUFDOztnQkFDMUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7Z0JBQzFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDJDQUEyQyxFQUFFO2dCQUM3RSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2FBQ3JELENBQUM7O2dCQUNJLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDO1lBQzlFLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QyxLQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQVdELDhDQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQ2pFLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxFQUF2QyxDQUF1QyxFQUNuRCxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELGlEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBRU8sK0RBQXlCOzs7OztJQUFqQyxVQUFrQyxPQUF3QjtRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbkMsQ0FBQzs7Z0JBN0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO2lCQUNwQzs7OztnQkFKUSxvQkFBb0IsdUJBMkJ4QixJQUFJO2dCQTVCQSxjQUFjO2dCQUhkLGNBQWM7Z0JBQUUsZUFBZTs7O2tDQWFyQyxNQUFNO3lCQUVOLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBcUN4QyxrQ0FBQztDQUFBLEFBOUNELElBOENDO1NBM0NZLDJCQUEyQjs7Ozs7O0lBQ3RDLGdEQUF3Qzs7Ozs7SUFDeEMsc0RBQXNDOztJQUV0QyxzREFBc0U7Ozs7O0lBbUJwRSxxREFBc0M7Ozs7O0lBQ3RDLHFEQUFzQzs7Ozs7SUFDdEMsc0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIERpcmVjdGl2ZSxcclxuICBTZWxmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dCwgRGV0YWlsZWRDb250ZXh0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29udGV4dEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtZWRpdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ29udGV4dEVkaXRCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRFZGl0QmluZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogQ29udGV4dEVkaXRDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBlZGl0ZWRDb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQE91dHB1dCgpIHN1Ym1pdFN1Y2Nlc3NlZDogRXZlbnRFbWl0dGVyPENvbnRleHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdzdWJtaXRGb3JtJywgWyckZXZlbnQnXSlcclxuICBvbkVkaXQoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmNvbXBvbmVudC5jb250ZXh0LmlkO1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS51cGRhdGUoaWQsIGNvbnRleHQpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuc2F2ZU1zZycsIHtcclxuICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZSB8fCB0aGlzLmNvbXBvbmVudC5jb250ZXh0LnRpdGxlXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuc2F2ZVRpdGxlJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuY29udGV4dFNlcnZpY2Uuc2V0RWRpdGVkQ29udGV4dCh1bmRlZmluZWQpO1xyXG4gICAgICB0aGlzLnN1Ym1pdFN1Y2Nlc3NlZC5lbWl0KGNvbnRleHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgY29tcG9uZW50OiBDb250ZXh0RWRpdENvbXBvbmVudCxcclxuICAgIHByaXZhdGUgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5lZGl0ZWRDb250ZXh0JCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmVkaXRlZENvbnRleHQkLnN1YnNjcmliZShcclxuICAgICAgY29udGV4dCA9PiB0aGlzLmhhbmRsZUVkaXRlZENvbnRleHRDaGFuZ2UoY29udGV4dClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZWRpdGVkQ29udGV4dCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUVkaXRlZENvbnRleHRDaGFuZ2UoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcclxuICB9XHJcbn1cclxuIl19