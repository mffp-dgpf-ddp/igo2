/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatDialogModule, MatMenuModule, MatOptionModule, MatAutocompleteModule } from '@angular/material';
import { IgoAuthModule } from '@igo2/auth';
import { IgoLanguageModule } from '@igo2/core';
import { IgoListModule, IgoKeyValueModule, IgoCollapsibleModule, IgoStopPropagationModule, IgoActionbarModule } from '@igo2/common';
import { BookmarkDialogComponent } from './../context-map-button/bookmark-button/bookmark-dialog.component';
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
import { IgoContextMapButtonModule } from '../context-map-button/context-map-button.module';
import { IgoContextImportExportModule } from '../context-import-export/context-import-export.module';
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
                    MatDialogModule,
                    MatMenuModule,
                    MatOptionModule,
                    MatAutocompleteModule,
                    IgoAuthModule,
                    IgoListModule,
                    IgoKeyValueModule,
                    IgoCollapsibleModule,
                    IgoStopPropagationModule,
                    IgoLanguageModule,
                    IgoContextImportExportModule,
                    IgoContextMapButtonModule,
                    IgoActionbarModule
                ],
                entryComponents: [
                    BookmarkDialogComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsZUFBZSxFQUNmLGFBQWEsRUFDYixlQUFlLEVBQ2YscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbkIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFDNUcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDNUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDNUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDbEcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDakgsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDNUYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sdURBQXVELENBQUM7O01BRS9GLGtCQUFrQixHQUFHO0lBQ3pCLG1CQUFtQjtJQUNuQixxQkFBcUI7Q0FDdEI7QUF5REQsTUFBTSxPQUFPLHVCQUF1Qjs7OztJQUNsQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsdUJBQXVCO1NBQ2xDLENBQUM7SUFDSixDQUFDOzs7WUE1REYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixhQUFhO29CQUNiLGVBQWU7b0JBQ2YscUJBQXFCO29CQUNyQixhQUFhO29CQUNiLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLHdCQUF3QjtvQkFDeEIsaUJBQWlCO29CQUNqQiw0QkFBNEI7b0JBQzVCLHlCQUF5QjtvQkFDekIsa0JBQWtCO2lCQUNuQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsdUJBQXVCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asb0JBQW9CO29CQUNwQiwyQkFBMkI7b0JBQzNCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQixrQ0FBa0M7b0JBRWxDLEdBQUcsa0JBQWtCO2lCQUN0QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osb0JBQW9CO29CQUNwQiwyQkFBMkI7b0JBQzNCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQixrQ0FBa0M7b0JBRWxDLEdBQUcsa0JBQWtCO2lCQUN0QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRDaGVja2JveE1vZHVsZSxcclxuICBNYXRSYWRpb01vZHVsZSxcclxuICBNYXREaWFsb2dNb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvQXV0aE1vZHVsZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0xpc3RNb2R1bGUsXHJcbiAgSWdvS2V5VmFsdWVNb2R1bGUsXHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvU3RvcFByb3BhZ2F0aW9uTW9kdWxlLFxyXG4gIElnb0FjdGlvbmJhck1vZHVsZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBCb29rbWFya0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vLi4vY29udGV4dC1tYXAtYnV0dG9uL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwQ29udGV4dERpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL21hcC1jb250ZXh0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExheWVyQ29udGV4dERpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL2xheWVyLWNvbnRleHQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29udGV4dExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbGlzdC9jb250ZXh0LWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udGV4dExpc3RCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250ZXh0LWxpc3QvY29udGV4dC1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29udGV4dEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtaXRlbS9jb250ZXh0LWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udGV4dEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtZm9ybS9jb250ZXh0LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udGV4dEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtZWRpdC9jb250ZXh0LWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udGV4dEVkaXRCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250ZXh0LWVkaXQvY29udGV4dC1lZGl0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LXBlcm1pc3Npb25zL2NvbnRleHQtcGVybWlzc2lvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udGV4dFBlcm1pc3Npb25zQmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1wZXJtaXNzaW9ucy9jb250ZXh0LXBlcm1pc3Npb25zLWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSWdvQ29udGV4dE1hcEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2NvbnRleHQtbWFwLWJ1dHRvbi9jb250ZXh0LW1hcC1idXR0b24ubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvQ29udGV4dEltcG9ydEV4cG9ydE1vZHVsZSB9IGZyb20gJy4uL2NvbnRleHQtaW1wb3J0LWV4cG9ydC9jb250ZXh0LWltcG9ydC1leHBvcnQubW9kdWxlJztcclxuXHJcbmNvbnN0IENPTlRFWFRfRElSRUNUSVZFUyA9IFtcclxuICBNYXBDb250ZXh0RGlyZWN0aXZlLFxyXG4gIExheWVyQ29udGV4dERpcmVjdGl2ZVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0UmFkaW9Nb2R1bGUsXHJcbiAgICBNYXREaWFsb2dNb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgSWdvQXV0aE1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29LZXlWYWx1ZU1vZHVsZSxcclxuICAgIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gICAgSWdvU3RvcFByb3BhZ2F0aW9uTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29Db250ZXh0SW1wb3J0RXhwb3J0TW9kdWxlLFxyXG4gICAgSWdvQ29udGV4dE1hcEJ1dHRvbk1vZHVsZSxcclxuICAgIElnb0FjdGlvbmJhck1vZHVsZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBCb29rbWFya0RpYWxvZ0NvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQ29udGV4dExpc3RDb21wb25lbnQsXHJcbiAgICBDb250ZXh0TGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBDb250ZXh0SXRlbUNvbXBvbmVudCxcclxuICAgIENvbnRleHRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dEVkaXRDb21wb25lbnQsXHJcbiAgICBDb250ZXh0RWRpdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQsXHJcbiAgICBDb250ZXh0UGVybWlzc2lvbnNCaW5kaW5nRGlyZWN0aXZlLFxyXG5cclxuICAgIC4uLkNPTlRFWFRfRElSRUNUSVZFU1xyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDb250ZXh0TGlzdENvbXBvbmVudCxcclxuICAgIENvbnRleHRMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIENvbnRleHRJdGVtQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dEZvcm1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0RWRpdENvbXBvbmVudCxcclxuICAgIENvbnRleHRFZGl0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudCxcclxuICAgIENvbnRleHRQZXJtaXNzaW9uc0JpbmRpbmdEaXJlY3RpdmUsXHJcblxyXG4gICAgLi4uQ09OVEVYVF9ESVJFQ1RJVkVTXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQ29udGV4dE1hbmFnZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0NvbnRleHRNYW5hZ2VyTW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=