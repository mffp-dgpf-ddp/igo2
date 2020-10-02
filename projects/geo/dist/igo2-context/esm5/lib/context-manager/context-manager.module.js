/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var CONTEXT_DIRECTIVES = [
    MapContextDirective,
    LayerContextDirective
];
var IgoContextManagerModule = /** @class */ (function () {
    function IgoContextManagerModule() {
    }
    /**
     * @return {?}
     */
    IgoContextManagerModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoContextManagerModule
        };
    };
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
                    exports: tslib_1.__spread([
                        ContextListComponent,
                        ContextListBindingDirective,
                        ContextItemComponent,
                        ContextFormComponent,
                        ContextEditComponent,
                        ContextEditBindingDirective,
                        ContextPermissionsComponent,
                        ContextPermissionsBindingDirective
                    ], CONTEXT_DIRECTIVES),
                    declarations: tslib_1.__spread([
                        ContextListComponent,
                        ContextListBindingDirective,
                        ContextItemComponent,
                        ContextFormComponent,
                        ContextEditComponent,
                        ContextEditBindingDirective,
                        ContextPermissionsComponent,
                        ContextPermissionsBindingDirective
                    ], CONTEXT_DIRECTIVES)
                },] }
    ];
    return IgoContextManagerModule;
}());
export { IgoContextManagerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsY0FBYyxFQUNkLGVBQWUsRUFDZixhQUFhLEVBQ2IsZUFBZSxFQUNmLHFCQUFxQixFQUN0QixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQix3QkFBd0IsRUFDeEIsa0JBQWtCLEVBQ25CLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQ2pILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDOztJQUUvRixrQkFBa0IsR0FBRztJQUN6QixtQkFBbUI7SUFDbkIscUJBQXFCO0NBQ3RCO0FBRUQ7SUFBQTtJQTZEQSxDQUFDOzs7O0lBTFEsK0JBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSx1QkFBdUI7U0FDbEMsQ0FBQztJQUNKLENBQUM7O2dCQTVERixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsd0JBQXdCO3dCQUN4QixpQkFBaUI7d0JBQ2pCLDRCQUE0Qjt3QkFDNUIseUJBQXlCO3dCQUN6QixrQkFBa0I7cUJBQ25CO29CQUNELGVBQWUsRUFBRTt3QkFDZix1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU87d0JBQ0wsb0JBQW9CO3dCQUNwQiwyQkFBMkI7d0JBQzNCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLDJCQUEyQjt3QkFDM0IsMkJBQTJCO3dCQUMzQixrQ0FBa0M7dUJBRS9CLGtCQUFrQixDQUN0QjtvQkFDRCxZQUFZO3dCQUNWLG9CQUFvQjt3QkFDcEIsMkJBQTJCO3dCQUMzQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQiwyQkFBMkI7d0JBQzNCLDJCQUEyQjt3QkFDM0Isa0NBQWtDO3VCQUUvQixrQkFBa0IsQ0FDdEI7aUJBQ0Y7O0lBT0QsOEJBQUM7Q0FBQSxBQTdERCxJQTZEQztTQU5ZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgTWF0UmFkaW9Nb2R1bGUsXHJcbiAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gIE1hdE1lbnVNb2R1bGUsXHJcbiAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0F1dGhNb2R1bGUgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29MaXN0TW9kdWxlLFxyXG4gIElnb0tleVZhbHVlTW9kdWxlLFxyXG4gIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gIElnb1N0b3BQcm9wYWdhdGlvbk1vZHVsZSxcclxuICBJZ29BY3Rpb25iYXJNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQm9va21hcmtEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLy4uL2NvbnRleHQtbWFwLWJ1dHRvbi9ib29rbWFyay1idXR0b24vYm9va21hcmstZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcENvbnRleHREaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlZC9tYXAtY29udGV4dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMYXllckNvbnRleHREaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlZC9sYXllci1jb250ZXh0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbnRleHRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWxpc3QvY29udGV4dC1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1saXN0L2NvbnRleHQtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbnRleHRJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWl0ZW0vY29udGV4dC1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWZvcm0vY29udGV4dC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXh0LWVkaXQvY29udGV4dC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRFZGl0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29udGV4dC1lZGl0L2NvbnRleHQtZWRpdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1wZXJtaXNzaW9ucy9jb250ZXh0LXBlcm1pc3Npb25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRleHRQZXJtaXNzaW9uc0JpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHQtcGVybWlzc2lvbnMvY29udGV4dC1wZXJtaXNzaW9ucy1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElnb0NvbnRleHRNYXBCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9jb250ZXh0LW1hcC1idXR0b24vY29udGV4dC1tYXAtYnV0dG9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0NvbnRleHRJbXBvcnRFeHBvcnRNb2R1bGUgfSBmcm9tICcuLi9jb250ZXh0LWltcG9ydC1leHBvcnQvY29udGV4dC1pbXBvcnQtZXhwb3J0Lm1vZHVsZSc7XHJcblxyXG5jb25zdCBDT05URVhUX0RJUkVDVElWRVMgPSBbXHJcbiAgTWFwQ29udGV4dERpcmVjdGl2ZSxcclxuICBMYXllckNvbnRleHREaXJlY3RpdmVcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdFJhZGlvTW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIElnb0F1dGhNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvS2V5VmFsdWVNb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb1N0b3BQcm9wYWdhdGlvbk1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvQ29udGV4dEltcG9ydEV4cG9ydE1vZHVsZSxcclxuICAgIElnb0NvbnRleHRNYXBCdXR0b25Nb2R1bGUsXHJcbiAgICBJZ29BY3Rpb25iYXJNb2R1bGVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgQm9va21hcmtEaWFsb2dDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIENvbnRleHRMaXN0Q29tcG9uZW50LFxyXG4gICAgQ29udGV4dExpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgQ29udGV4dEl0ZW1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnRleHRFZGl0Q29tcG9uZW50LFxyXG4gICAgQ29udGV4dEVkaXRCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dFBlcm1pc3Npb25zQmluZGluZ0RpcmVjdGl2ZSxcclxuXHJcbiAgICAuLi5DT05URVhUX0RJUkVDVElWRVNcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ29udGV4dExpc3RDb21wb25lbnQsXHJcbiAgICBDb250ZXh0TGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBDb250ZXh0SXRlbUNvbXBvbmVudCxcclxuICAgIENvbnRleHRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dEVkaXRDb21wb25lbnQsXHJcbiAgICBDb250ZXh0RWRpdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQsXHJcbiAgICBDb250ZXh0UGVybWlzc2lvbnNCaW5kaW5nRGlyZWN0aXZlLFxyXG5cclxuICAgIC4uLkNPTlRFWFRfRElSRUNUSVZFU1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0NvbnRleHRNYW5hZ2VyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29Db250ZXh0TWFuYWdlck1vZHVsZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19