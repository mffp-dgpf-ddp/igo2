/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
                        IgoAuthModule,
                        IgoListModule,
                        IgoKeyValueModule,
                        IgoCollapsibleModule,
                        IgoStopPropagationModule,
                        IgoLanguageModule
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsY0FBYyxFQUNmLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN6QixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw2REFBNkQsQ0FBQzs7SUFFM0csa0JBQWtCLEdBQUc7SUFDekIsbUJBQW1CO0lBQ25CLHFCQUFxQjtDQUN0QjtBQUVEO0lBQUE7SUFtREEsQ0FBQzs7OztJQUxRLCtCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsdUJBQXVCO1NBQ2xDLENBQUM7SUFDSixDQUFDOztnQkFsREYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQix3QkFBd0I7d0JBQ3hCLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTzt3QkFDTCxvQkFBb0I7d0JBQ3BCLDJCQUEyQjt3QkFDM0Isb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsMkJBQTJCO3dCQUMzQiwyQkFBMkI7d0JBQzNCLGtDQUFrQzt1QkFFL0Isa0JBQWtCLENBQ3RCO29CQUNELFlBQVk7d0JBQ1Ysb0JBQW9CO3dCQUNwQiwyQkFBMkI7d0JBQzNCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLDJCQUEyQjt3QkFDM0IsMkJBQTJCO3dCQUMzQixrQ0FBa0M7dUJBRS9CLGtCQUFrQixDQUN0QjtpQkFDRjs7SUFPRCw4QkFBQztDQUFBLEFBbkRELElBbURDO1NBTlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRDaGVja2JveE1vZHVsZSxcclxuICBNYXRSYWRpb01vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0F1dGhNb2R1bGUgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29MaXN0TW9kdWxlLFxyXG4gIElnb0tleVZhbHVlTW9kdWxlLFxyXG4gIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gIElnb1N0b3BQcm9wYWdhdGlvbk1vZHVsZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBNYXBDb250ZXh0RGlyZWN0aXZlIH0gZnJvbSAnLi9zaGFyZWQvbWFwLWNvbnRleHQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTGF5ZXJDb250ZXh0RGlyZWN0aXZlIH0gZnJvbSAnLi9zaGFyZWQvbGF5ZXItY29udGV4dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb250ZXh0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1saXN0L2NvbnRleHQtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0TGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHQtbGlzdC9jb250ZXh0LWxpc3QtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb250ZXh0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1pdGVtL2NvbnRleHQtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1mb3JtL2NvbnRleHQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1lZGl0L2NvbnRleHQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0RWRpdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRleHQtZWRpdC9jb250ZXh0LWVkaXQtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb250ZXh0UGVybWlzc2lvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtcGVybWlzc2lvbnMvY29udGV4dC1wZXJtaXNzaW9ucy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb250ZXh0UGVybWlzc2lvbnNCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250ZXh0LXBlcm1pc3Npb25zL2NvbnRleHQtcGVybWlzc2lvbnMtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5cclxuY29uc3QgQ09OVEVYVF9ESVJFQ1RJVkVTID0gW1xyXG4gIE1hcENvbnRleHREaXJlY3RpdmUsXHJcbiAgTGF5ZXJDb250ZXh0RGlyZWN0aXZlXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXRSYWRpb01vZHVsZSxcclxuICAgIElnb0F1dGhNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvS2V5VmFsdWVNb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb1N0b3BQcm9wYWdhdGlvbk1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBDb250ZXh0TGlzdENvbXBvbmVudCxcclxuICAgIENvbnRleHRMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIENvbnRleHRJdGVtQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dEZvcm1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0RWRpdENvbXBvbmVudCxcclxuICAgIENvbnRleHRFZGl0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIENvbnRleHRQZXJtaXNzaW9uc0NvbXBvbmVudCxcclxuICAgIENvbnRleHRQZXJtaXNzaW9uc0JpbmRpbmdEaXJlY3RpdmUsXHJcblxyXG4gICAgLi4uQ09OVEVYVF9ESVJFQ1RJVkVTXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIENvbnRleHRMaXN0Q29tcG9uZW50LFxyXG4gICAgQ29udGV4dExpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgQ29udGV4dEl0ZW1Db21wb25lbnQsXHJcbiAgICBDb250ZXh0Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnRleHRFZGl0Q29tcG9uZW50LFxyXG4gICAgQ29udGV4dEVkaXRCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgQ29udGV4dFBlcm1pc3Npb25zQ29tcG9uZW50LFxyXG4gICAgQ29udGV4dFBlcm1pc3Npb25zQmluZGluZ0RpcmVjdGl2ZSxcclxuXHJcbiAgICAuLi5DT05URVhUX0RJUkVDVElWRVNcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29Db250ZXh0TWFuYWdlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQ29udGV4dE1hbmFnZXJNb2R1bGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==