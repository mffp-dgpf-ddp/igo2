/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, HostListener } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { MessageService, LanguageService } from '@igo2/core';
import { ConfirmDialogService } from '@igo2/common';
import { MapService } from '@igo2/geo';
import { ContextService } from '../shared/context.service';
import { ContextListComponent } from './context-list.component';
var ContextListBindingDirective = /** @class */ (function () {
    function ContextListBindingDirective(component, contextService, mapService, languageService, confirmDialogService, messageService) {
        this.contextService = contextService;
        this.mapService = mapService;
        this.languageService = languageService;
        this.confirmDialogService = confirmDialogService;
        this.messageService = messageService;
        this.component = component;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onSelect = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onEdit = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadEditedContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onSave = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var map = this.mapService.getMap();
        /** @type {?} */
        var contextFromMap = this.contextService.getContextFromMap(map);
        /** @type {?} */
        var changes = {
            layers: contextFromMap.layers,
            map: {
                view: contextFromMap.map.view
            }
        };
        this.contextService.update(context.id, changes).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title
            });
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onFavorite = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        this.contextService.setDefault(context.id).subscribe((/**
         * @return {?}
         */
        function () {
            _this.contextService.defaultContextId$.next(context.id);
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.dialog.favoriteMsg', {
                value: context.title
            });
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.favoriteTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onManageTools = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadEditedContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onManagePermissions = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this.contextService.loadEditedContext(context.uri);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onDelete = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var translate = this.languageService.translate;
        this.confirmDialogService
            .open(translate.instant('igo.context.contextManager.dialog.confirmDelete'))
            .subscribe((/**
         * @param {?} confirm
         * @return {?}
         */
        function (confirm) {
            if (confirm) {
                _this.contextService.delete(context.id).subscribe((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var message = translate.instant('igo.context.contextManager.dialog.deleteMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    var title = translate.instant('igo.context.contextManager.dialog.deleteTitle');
                    _this.messageService.info(message, title);
                }));
            }
        }));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    ContextListBindingDirective.prototype.onClone = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var properties = {
            title: context.title + '-copy',
            uri: context.uri + '-copy'
        };
        this.contextService.clone(context.id, properties).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.languageService.translate;
            /** @type {?} */
            var message = translate.instant('igo.context.contextManager.dialog.cloneMsg', {
                value: context.title
            });
            /** @type {?} */
            var title = translate.instant('igo.context.contextManager.dialog.cloneTitle');
            _this.messageService.success(message, title);
        }));
    };
    /**
     * @return {?}
     */
    ContextListBindingDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Override input contexts
        this.component.contexts = { ours: [] };
        this.contexts$$ = this.contextService.contexts$.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        function (contexts) {
            return _this.handleContextsChange(contexts);
        }));
        this.defaultContextId$$ = this.contextService.defaultContextId$.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            _this.component.defaultContextId = id;
        }));
        // See feature-list.component for an explanation about the debounce time
        this.selectedContext$$ = this.contextService.context$
            .pipe(debounceTime(100))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return (_this.component.selectedContext = context); }));
        this.contextService.loadContexts();
    };
    /**
     * @return {?}
     */
    ContextListBindingDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.contexts$$.unsubscribe();
        this.selectedContext$$.unsubscribe();
        this.defaultContextId$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    ContextListBindingDirective.prototype.handleContextsChange = /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    function (contexts) {
        this.component.contexts = contexts;
    };
    ContextListBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoContextListBinding]'
                },] }
    ];
    /** @nocollapse */
    ContextListBindingDirective.ctorParameters = function () { return [
        { type: ContextListComponent, decorators: [{ type: Self }] },
        { type: ContextService },
        { type: MapService },
        { type: LanguageService },
        { type: ConfirmDialogService },
        { type: MessageService }
    ]; };
    ContextListBindingDirective.propDecorators = {
        onSelect: [{ type: HostListener, args: ['select', ['$event'],] }],
        onEdit: [{ type: HostListener, args: ['edit', ['$event'],] }],
        onSave: [{ type: HostListener, args: ['save', ['$event'],] }],
        onFavorite: [{ type: HostListener, args: ['favorite', ['$event'],] }],
        onManageTools: [{ type: HostListener, args: ['manageTools', ['$event'],] }],
        onManagePermissions: [{ type: HostListener, args: ['managePermissions', ['$event'],] }],
        onDelete: [{ type: HostListener, args: ['delete', ['$event'],] }],
        onClone: [{ type: HostListener, args: ['clone', ['$event'],] }]
    };
    return ContextListBindingDirective;
}());
export { ContextListBindingDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.contexts$$;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.selectedContext$$;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.defaultContextId$$;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.mapService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.confirmDialogService;
    /**
     * @type {?}
     * @private
     */
    ContextListBindingDirective.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1saXN0L2NvbnRleHQtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBR0osWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU92QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEU7SUF3SEUscUNBQ1UsU0FBK0IsRUFDL0IsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsZUFBZ0MsRUFDaEMsb0JBQTBDLEVBQzFDLGNBQThCO1FBSjlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUV0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7OztJQXZIRCw4Q0FBUTs7OztJQURSLFVBQ1MsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9D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QVEsQ0FBQzt5QkFLakMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkFLL0IsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkEyQi9CLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBa0JuQyxZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO3NDQUt0QyxZQUFZLFNBQUMsbUJBQW1CLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkJBSzVDLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBeUJqQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztJQStEbkMsa0NBQUM7Q0FBQSxBQWxLRCxJQWtLQztTQS9KWSwyQkFBMkI7Ozs7OztJQUN0QyxnREFBd0M7Ozs7O0lBQ3hDLGlEQUFpQzs7Ozs7SUFDakMsd0RBQXdDOzs7OztJQUN4Qyx5REFBeUM7Ozs7O0lBbUh2QyxxREFBc0M7Ozs7O0lBQ3RDLGlEQUE4Qjs7Ozs7SUFDOUIsc0RBQXdDOzs7OztJQUN4QywyREFBa0Q7Ozs7O0lBQ2xELHFEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIFNlbGYsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBIb3N0TGlzdGVuZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlybURpYWxvZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ29udGV4dCxcclxuICBEZXRhaWxlZENvbnRleHQsXHJcbiAgQ29udGV4dHNMaXN0XHJcbn0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29udGV4dExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ29udGV4dExpc3RCaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRMaXN0QmluZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogQ29udGV4dExpc3RDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBjb250ZXh0cyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzZWxlY3RlZENvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZGVmYXVsdENvbnRleHRJZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdCcsIFsnJGV2ZW50J10pXHJcbiAgb25TZWxlY3QoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdlZGl0JywgWyckZXZlbnQnXSlcclxuICBvbkVkaXQoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkRWRpdGVkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzYXZlJywgWyckZXZlbnQnXSlcclxuICBvblNhdmUoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXBTZXJ2aWNlLmdldE1hcCgpO1xyXG4gICAgY29uc3QgY29udGV4dEZyb21NYXAgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTWFwKG1hcCk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlczogYW55ID0ge1xyXG4gICAgICBsYXllcnM6IGNvbnRleHRGcm9tTWFwLmxheWVycyxcclxuICAgICAgbWFwOiB7XHJcbiAgICAgICAgdmlldzogY29udGV4dEZyb21NYXAubWFwLnZpZXdcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnVwZGF0ZShjb250ZXh0LmlkLCBjaGFuZ2VzKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLnNhdmVNc2cnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuc2F2ZVRpdGxlJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmYXZvcml0ZScsIFsnJGV2ZW50J10pXHJcbiAgb25GYXZvcml0ZShjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLnNldERlZmF1bHQoY29udGV4dC5pZCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5kZWZhdWx0Q29udGV4dElkJC5uZXh0KGNvbnRleHQuaWQpO1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmZhdm9yaXRlTXNnJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmZhdm9yaXRlVGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21hbmFnZVRvb2xzJywgWyckZXZlbnQnXSlcclxuICBvbk1hbmFnZVRvb2xzKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UubG9hZEVkaXRlZENvbnRleHQoY29udGV4dC51cmkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbWFuYWdlUGVybWlzc2lvbnMnLCBbJyRldmVudCddKVxyXG4gIG9uTWFuYWdlUGVybWlzc2lvbnMoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkRWRpdGVkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkZWxldGUnLCBbJyRldmVudCddKVxyXG4gIG9uRGVsZXRlKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIHRoaXMuY29uZmlybURpYWxvZ1NlcnZpY2VcclxuICAgICAgLm9wZW4oXHJcbiAgICAgICAgdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5jb25maXJtRGVsZXRlJylcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKGNvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChjb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmRlbGV0ZShjb250ZXh0LmlkKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5kZWxldGVNc2cnLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuZGVsZXRlVGl0bGUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xvbmUnLCBbJyRldmVudCddKVxyXG4gIG9uQ2xvbmUoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge1xyXG4gICAgICB0aXRsZTogY29udGV4dC50aXRsZSArICctY29weScsXHJcbiAgICAgIHVyaTogY29udGV4dC51cmkgKyAnLWNvcHknXHJcbiAgICB9O1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5jbG9uZShjb250ZXh0LmlkLCBwcm9wZXJ0aWVzKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmNsb25lTXNnJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmNsb25lVGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBjb21wb25lbnQ6IENvbnRleHRMaXN0Q29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb25maXJtRGlhbG9nU2VydmljZTogQ29uZmlybURpYWxvZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIE92ZXJyaWRlIGlucHV0IGNvbnRleHRzXHJcbiAgICB0aGlzLmNvbXBvbmVudC5jb250ZXh0cyA9IHsgb3VyczogW10gfTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHRzJCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHRzJC5zdWJzY3JpYmUoY29udGV4dHMgPT5cclxuICAgICAgdGhpcy5oYW5kbGVDb250ZXh0c0NoYW5nZShjb250ZXh0cylcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5kZWZhdWx0Q29udGV4dElkJCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmRlZmF1bHRDb250ZXh0SWQkLnN1YnNjcmliZShcclxuICAgICAgaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRDb250ZXh0SWQgPSBpZDtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTZWUgZmVhdHVyZS1saXN0LmNvbXBvbmVudCBmb3IgYW4gZXhwbGFuYXRpb24gYWJvdXQgdGhlIGRlYm91bmNlIHRpbWVcclxuICAgIHRoaXMuc2VsZWN0ZWRDb250ZXh0JCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkXHJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSgxMDApKVxyXG4gICAgICAuc3Vic2NyaWJlKGNvbnRleHQgPT4gKHRoaXMuY29tcG9uZW50LnNlbGVjdGVkQ29udGV4dCA9IGNvbnRleHQpKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRDb250ZXh0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNvbnRleHRzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDb250ZXh0JCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZGVmYXVsdENvbnRleHRJZCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNvbnRleHRzQ2hhbmdlKGNvbnRleHRzOiBDb250ZXh0c0xpc3QpIHtcclxuICAgIHRoaXMuY29tcG9uZW50LmNvbnRleHRzID0gY29udGV4dHM7XHJcbiAgfVxyXG59XHJcbiJdfQ==