/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { IgoAuthModule } from '@igo2/auth';
import { IgoLanguageModule } from '@igo2/core';
import { IgoListModule, IgoKeyValueModule, IgoCollapsibleModule, IgoStopPropagationModule } from '@igo2/common';
import { MapContextDirective } from './shared/map-context.directive';
import { LayerContextDirective } from './shared/layer-context.directive';
import { ContextListComponent } from './context-list/context-list.component';
import { ContextListBindingDirective } from './context-list/context-list-binding.directive';
import { ContextItemComponent } from './context-item/context-item.component';
import { ContextFormComponent } from './context-form/context-form.component';
import { ContextEditComponent } from './context-edit/context-edit.component';
import { ContextEditBindingDirective } from './context-edit/context-edit-binding.directive';
import { ContextPermissionsComponent } from './context-permissions/context-permissions.component';
import { ContextPermissionsBindingDirective } from './context-permissions/context-permissions-binding.directive';
/** @type {?} */
const CONTEXT_DIRECTIVES = [
    MapContextDirective,
    LayerContextDirective
];
export class IgoContextManagerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextManagerModule
        };
    }
}
IgoContextManagerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule,
                    MatListModule,
                    MatCheckboxModule,
                    MatRadioModule,
                    IgoAuthModule,
                    IgoListModule,
                    IgoKeyValueModule,
                    IgoCollapsibleModule,
                    IgoStopPropagationModule,
                    IgoLanguageModule
                ],
                exports: [
                    ContextListComponent,
                    ContextListBindingDirective,
                    ContextItemComponent,
                    ContextFormComponent,
                    ContextEditComponent,
                    ContextEditBindingDirective,
                    ContextPermissionsComponent,
                    ContextPermissionsBindingDirective,
                    ...CONTEXT_DIRECTIVES
                ],
                declarations: [
                    ContextListComponent,
                    ContextListBindingDirective,
                    ContextItemComponent,
                    ContextFormComponent,
                    ContextEditComponent,
                    ContextEditBindingDirective,
                    ContextPermissionsComponent,
                    ContextPermissionsBindingDirective,
                    ...CONTEXT_DIRECTIVES
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixjQUFjLEVBQ2YsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDcEIsd0JBQXdCLEVBQ3pCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDZEQUE2RCxDQUFDOztNQUUzRyxrQkFBa0IsR0FBRztJQUN6QixtQkFBbUI7SUFDbkIscUJBQXFCO0NBQ3RCO0FBK0NELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFDbEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtTQUNsQyxDQUFDO0lBQ0osQ0FBQzs7O1lBbERGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxvQkFBb0I7b0JBQ3BCLDJCQUEyQjtvQkFDM0Isb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsMkJBQTJCO29CQUMzQiwyQkFBMkI7b0JBQzNCLGtDQUFrQztvQkFFbEMsR0FBRyxrQkFBa0I7aUJBQ3RCO2dCQUNELFlBQVksRUFBRTtvQkFDWixvQkFBb0I7b0JBQ3BCLDJCQUEyQjtvQkFDM0Isb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsMkJBQTJCO29CQUMzQiwyQkFBMkI7b0JBQzNCLGtDQUFrQztvQkFFbEMsR0FBRyxrQkFBa0I7aUJBQ3RCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gIE1hdFJhZGlvTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvQXV0aE1vZHVsZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0xpc3RNb2R1bGUsXHJcbiAgSWdvS2V5VmFsdWVNb2R1bGUsXHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvU3RvcFByb3BhZ2F0aW9uTW9kdWxlXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE1hcENvbnRleHREaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlZC9tYXAtY29udGV4dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMYXllckNvbnRleHREaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlZC9sYXllci1jb250ZXh0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbnRleHRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWxpc3QvY29udGV4dC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1saXN0L2NvbnRleHQtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbnRleHRJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWl0ZW0vY29udGV4dC1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWZvcm0vY29udGV4dC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWVkaXQvY29udGV4dC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRFZGl0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1lZGl0L2NvbnRleHQtZWRpdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1wZXJtaXNzaW9ucy9jb250ZXh0LXBlcm1pc3Npb25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRQZXJtaXNzaW9uc0JpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHQtcGVybWlzc2lvbnMvY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcblxyXG5jb25zdCBDT05URVhUX0RJUkVDVElWRVMgPSBbXHJcbiAgTWFwQ29udGV4dERpcmVjdGl2ZSxcclxuICBMYXllckNvbnRleHREaXJlY3RpdmVcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdFJhZGlvTW9kdWxlLFxyXG4gICAgSWdvQXV0aE1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29LZXlWYWx1ZU1vZHVsZSxcclxuICAgIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gICAgSWdvU3RvcFByb3BhZ2F0aW9uTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIENvbnRleHRMaXN0Q29tcG9uZW50LFxyXG4gICAgQ29udGV4dExpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgQ29udGV4dEl0ZW1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnRleHRFZGl0Q29tcG9uZW50LFxyXG4gICAgQ29udGV4dEVkaXRCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dFBlcm1pc3Npb25zQmluZGluZ0RpcmVjdGl2ZSxcclxuXHJcbiAgICAuLi5DT05URVhUX0RJUkVDVElWRVNcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ29udGV4dExpc3RDb21wb25lbnQsXHJcbiAgICBDb250ZXh0TGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBDb250ZXh0SXRlbUNvbXBvbmVudCxcclxuICAgIENvbnRleHRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dEVkaXRDb21wb25lbnQsXHJcbiAgICBDb250ZXh0RWRpdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQsXHJcbiAgICBDb250ZXh0UGVybWlzc2lvbnNCaW5kaW5nRGlyZWN0aXZlLFxyXG5cclxuICAgIC4uLkNPTlRFWFRfRElSRUNUSVZFU1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0NvbnRleHRNYW5hZ2VyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29Db250ZXh0TWFuYWdlck1vZHVsZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19