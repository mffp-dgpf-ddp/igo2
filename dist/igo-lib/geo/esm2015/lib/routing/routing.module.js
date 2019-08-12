/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatTooltipModule, MatAutocompleteModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { RoutingFormComponent } from './routing-form/routing-form.component';
import { RoutingFormBindingDirective } from './routing-form/routing-form-binding.directive';
import { RoutingFormService } from './routing-form/routing-form.service';
import { provideRoutingSourceService } from './shared/routing-source.service';
export class IgoRoutingModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoRoutingModule
        };
    }
}
IgoRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatListModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatOptionModule,
                    MatSelectModule,
                    MatTooltipModule,
                    MatAutocompleteModule,
                    IgoLanguageModule
                ],
                exports: [RoutingFormComponent, RoutingFormBindingDirective],
                declarations: [RoutingFormComponent, RoutingFormBindingDirective],
                providers: [RoutingFormService, provideRoutingSourceService()]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcm91dGluZy9yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBdUI5RSxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBQzNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQztJQUNKLENBQUM7OztZQTFCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHFCQUFxQjtvQkFDckIsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSwyQkFBMkIsQ0FBQztnQkFDNUQsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsMkJBQTJCLENBQUM7Z0JBQ2pFLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLDJCQUEyQixFQUFFLENBQUM7YUFDL0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRpbmdGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0aW5nLWZvcm0vcm91dGluZy1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJvdXRpbmdGb3JtQmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vcm91dGluZy1mb3JtL3JvdXRpbmctZm9ybS1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFJvdXRpbmdGb3JtU2VydmljZSB9IGZyb20gJy4vcm91dGluZy1mb3JtL3JvdXRpbmctZm9ybS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgcHJvdmlkZVJvdXRpbmdTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvcm91dGluZy1zb3VyY2Uuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbUm91dGluZ0Zvcm1Db21wb25lbnQsIFJvdXRpbmdGb3JtQmluZGluZ0RpcmVjdGl2ZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUm91dGluZ0Zvcm1Db21wb25lbnQsIFJvdXRpbmdGb3JtQmluZGluZ0RpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbUm91dGluZ0Zvcm1TZXJ2aWNlLCBwcm92aWRlUm91dGluZ1NvdXJjZVNlcnZpY2UoKV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb1JvdXRpbmdNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb1JvdXRpbmdNb2R1bGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==