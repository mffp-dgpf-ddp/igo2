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
export class ContextListBindingDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     * @param {?} mapService
     * @param {?} languageService
     * @param {?} confirmDialogService
     * @param {?} messageService
     */
    constructor(component, contextService, mapService, languageService, confirmDialogService, messageService) {
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
    onSelect(context) {
        this.contextService.loadContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onEdit(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onSave(context) {
        /** @type {?} */
        const map = this.mapService.getMap();
        /** @type {?} */
        const contextFromMap = this.contextService.getContextFromMap(map);
        /** @type {?} */
        const changes = {
            layers: contextFromMap.layers,
            map: {
                view: contextFromMap.map.view
            }
        };
        this.contextService.update(context.id, changes).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.saveMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.saveTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onFavorite(context) {
        this.contextService.setDefault(context.id).subscribe((/**
         * @return {?}
         */
        () => {
            this.contextService.defaultContextId$.next(context.id);
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.favoriteMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.favoriteTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onManageTools(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onManagePermissions(context) {
        this.contextService.loadEditedContext(context.uri);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onDelete(context) {
        /** @type {?} */
        const translate = this.languageService.translate;
        this.confirmDialogService
            .open(translate.instant('igo.context.contextManager.dialog.confirmDelete'))
            .subscribe((/**
         * @param {?} confirm
         * @return {?}
         */
        confirm => {
            if (confirm) {
                this.contextService.delete(context.id).subscribe((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const message = translate.instant('igo.context.contextManager.dialog.deleteMsg', {
                        value: context.title
                    });
                    /** @type {?} */
                    const title = translate.instant('igo.context.contextManager.dialog.deleteTitle');
                    this.messageService.info(message, title);
                }));
            }
        }));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onClone(context) {
        /** @type {?} */
        const properties = {
            title: context.title + '-copy',
            uri: context.uri + '-copy'
        };
        this.contextService.clone(context.id, properties).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const message = translate.instant('igo.context.contextManager.dialog.cloneMsg', {
                value: context.title
            });
            /** @type {?} */
            const title = translate.instant('igo.context.contextManager.dialog.cloneTitle');
            this.messageService.success(message, title);
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input contexts
        this.component.contexts = { ours: [] };
        this.contexts$$ = this.contextService.contexts$.subscribe((/**
         * @param {?} contexts
         * @return {?}
         */
        contexts => this.handleContextsChange(contexts)));
        this.defaultContextId$$ = this.contextService.defaultContextId$.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        id => {
            this.component.defaultContextId = id;
        }));
        // See feature-list.component for an explanation about the debounce time
        this.selectedContext$$ = this.contextService.context$
            .pipe(debounceTime(100))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => (this.component.selectedContext = context)));
        this.contextService.loadContexts();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.contexts$$.unsubscribe();
        this.selectedContext$$.unsubscribe();
        this.defaultContextId$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} contexts
     * @return {?}
     */
    handleContextsChange(contexts) {
        this.component.contexts = contexts;
    }
}
ContextListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextListBinding]'
            },] }
];
/** @nocollapse */
ContextListBindingDirective.ctorParameters = () => [
    { type: ContextListComponent, decorators: [{ type: Self }] },
    { type: ContextService },
    { type: MapService },
    { type: LanguageService },
    { type: ConfirmDialogService },
    { type: MessageService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1saXN0L2NvbnRleHQtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBR0osWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU92QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLaEUsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7Ozs7O0lBcUh0QyxZQUNVLFNBQStCLEVBQy9CLGNBQThCLEVBQzlCLFVBQXNCLEVBQ3RCLGVBQWdDLEVBQ2hDLG9CQUEwQyxFQUMxQyxjQUE4QjtRQUo5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUF2SEQsUUFBUSxDQUFDLE9BQWdCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFH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QUFDLFFBQVEsQ0FBQzs0QkFrQm5DLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7a0NBS3RDLFlBQVksU0FBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzt1QkFLNUMsWUFBWSxTQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztzQkF5QmpDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUEvRmpDLGdEQUF3Qzs7Ozs7SUFDeEMsaURBQWlDOzs7OztJQUNqQyx3REFBd0M7Ozs7O0lBQ3hDLHlEQUF5Qzs7Ozs7SUFtSHZDLHFEQUFzQzs7Ozs7SUFDdEMsaURBQThCOzs7OztJQUM5QixzREFBd0M7Ozs7O0lBQ3hDLDJEQUFrRDs7Ozs7SUFDbEQscURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgU2VsZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25maXJtRGlhbG9nU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb250ZXh0LFxyXG4gIERldGFpbGVkQ29udGV4dCxcclxuICBDb250ZXh0c0xpc3RcclxufSBmcm9tICcuLi9zaGFyZWQvY29udGV4dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb250ZXh0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Db250ZXh0TGlzdEJpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dExpc3RCaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBDb250ZXh0TGlzdENvbXBvbmVudDtcclxuICBwcml2YXRlIGNvbnRleHRzJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHNlbGVjdGVkQ29udGV4dCQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBkZWZhdWx0Q29udGV4dElkJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0JywgWyckZXZlbnQnXSlcclxuICBvblNlbGVjdChjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRDb250ZXh0KGNvbnRleHQudXJpKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2VkaXQnLCBbJyRldmVudCddKVxyXG4gIG9uRWRpdChjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRFZGl0ZWRDb250ZXh0KGNvbnRleHQudXJpKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3NhdmUnLCBbJyRldmVudCddKVxyXG4gIG9uU2F2ZShjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCk7XHJcbiAgICBjb25zdCBjb250ZXh0RnJvbU1hcCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZ2V0Q29udGV4dEZyb21NYXAobWFwKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VzOiBhbnkgPSB7XHJcbiAgICAgIGxheWVyczogY29udGV4dEZyb21NYXAubGF5ZXJzLFxyXG4gICAgICBtYXA6IHtcclxuICAgICAgICB2aWV3OiBjb250ZXh0RnJvbU1hcC5tYXAudmlld1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UudXBkYXRlKGNvbnRleHQuaWQsIGNoYW5nZXMpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuc2F2ZU1zZycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmFsdWU6IGNvbnRleHQudGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5zYXZlVGl0bGUnXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Zhdm9yaXRlJywgWyckZXZlbnQnXSlcclxuICBvbkZhdm9yaXRlKGNvbnRleHQ6IENvbnRleHQpIHtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2Uuc2V0RGVmYXVsdChjb250ZXh0LmlkKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmRlZmF1bHRDb250ZXh0SWQkLm5leHQoY29udGV4dC5pZCk7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuZmF2b3JpdGVNc2cnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuZmF2b3JpdGVUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbWFuYWdlVG9vbHMnLCBbJyRldmVudCddKVxyXG4gIG9uTWFuYWdlVG9vbHMoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkRWRpdGVkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtYW5hZ2VQZXJtaXNzaW9ucycsIFsnJGV2ZW50J10pXHJcbiAgb25NYW5hZ2VQZXJtaXNzaW9ucyhjb250ZXh0OiBDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmxvYWRFZGl0ZWRDb250ZXh0KGNvbnRleHQudXJpKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RlbGV0ZScsIFsnJGV2ZW50J10pXHJcbiAgb25EZWxldGUoY29udGV4dDogQ29udGV4dCkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgdGhpcy5jb25maXJtRGlhbG9nU2VydmljZVxyXG4gICAgICAub3BlbihcclxuICAgICAgICB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmNvbmZpcm1EZWxldGUnKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoY29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29udGV4dFNlcnZpY2UuZGVsZXRlKGNvbnRleHQuaWQpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmNvbnRleHQuY29udGV4dE1hbmFnZXIuZGlhbG9nLmRlbGV0ZU1zZycsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbnRleHQudGl0bGVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLmRpYWxvZy5kZWxldGVUaXRsZSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbG9uZScsIFsnJGV2ZW50J10pXHJcbiAgb25DbG9uZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XHJcbiAgICAgIHRpdGxlOiBjb250ZXh0LnRpdGxlICsgJy1jb3B5JyxcclxuICAgICAgdXJpOiBjb250ZXh0LnVyaSArICctY29weSdcclxuICAgIH07XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNsb25lKGNvbnRleHQuaWQsIHByb3BlcnRpZXMpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuY2xvbmVNc2cnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5kaWFsb2cuY2xvbmVUaXRsZSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIGNvbXBvbmVudDogQ29udGV4dExpc3RDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpcm1EaWFsb2dTZXJ2aWNlOiBDb25maXJtRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gT3ZlcnJpZGUgaW5wdXQgY29udGV4dHNcclxuICAgIHRoaXMuY29tcG9uZW50LmNvbnRleHRzID0geyBvdXJzOiBbXSB9O1xyXG5cclxuICAgIHRoaXMuY29udGV4dHMkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dHMkLnN1YnNjcmliZShjb250ZXh0cyA9PlxyXG4gICAgICB0aGlzLmhhbmRsZUNvbnRleHRzQ2hhbmdlKGNvbnRleHRzKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRDb250ZXh0SWQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZGVmYXVsdENvbnRleHRJZCQuc3Vic2NyaWJlKFxyXG4gICAgICBpZCA9PiB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdENvbnRleHRJZCA9IGlkO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIFNlZSBmZWF0dXJlLWxpc3QuY29tcG9uZW50IGZvciBhbiBleHBsYW5hdGlvbiBhYm91dCB0aGUgZGVib3VuY2UgdGltZVxyXG4gICAgdGhpcy5zZWxlY3RlZENvbnRleHQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCRcclxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoY29udGV4dCA9PiAodGhpcy5jb21wb25lbnQuc2VsZWN0ZWRDb250ZXh0ID0gY29udGV4dCkpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UubG9hZENvbnRleHRzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29udGV4dHMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZENvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5kZWZhdWx0Q29udGV4dElkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ29udGV4dHNDaGFuZ2UoY29udGV4dHM6IENvbnRleHRzTGlzdCkge1xyXG4gICAgdGhpcy5jb21wb25lbnQuY29udGV4dHMgPSBjb250ZXh0cztcclxuICB9XHJcbn1cclxuIl19