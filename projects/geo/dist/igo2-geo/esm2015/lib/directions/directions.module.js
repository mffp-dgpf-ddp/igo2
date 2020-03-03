/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatTooltipModule, MatAutocompleteModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { DirectionsFormComponent } from './directions-form/directions-form.component';
import { DirectionsFormBindingDirective } from './directions-form/directions-form-binding.directive';
import { DirectionsFormService } from './directions-form/directions-form.service';
import { provideDirectionsSourceService } from './shared/directions-source.service';
export class IgoDirectionsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoDirectionsModule
        };
    }
}
IgoDirectionsModule.decorators = [
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
                exports: [DirectionsFormComponent, DirectionsFormBindingDirective],
                declarations: [DirectionsFormComponent, DirectionsFormBindingDirective],
                providers: [DirectionsFormService, provideDirectionsSourceService()]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aW9ucy9kaXJlY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBdUJwRixNQUFNLE9BQU8sbUJBQW1COzs7O0lBQzlCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQztJQUNKLENBQUM7OztZQTFCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHFCQUFxQjtvQkFDckIsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSw4QkFBOEIsQ0FBQztnQkFDbEUsWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsOEJBQThCLENBQUM7Z0JBQ3ZFLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLDhCQUE4QixFQUFFLENBQUM7YUFDckUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IERpcmVjdGlvbnNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9kaXJlY3Rpb25zLWZvcm0vZGlyZWN0aW9ucy1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNGb3JtQmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aW9ucy1mb3JtL2RpcmVjdGlvbnMtZm9ybS1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNGb3JtU2VydmljZSB9IGZyb20gJy4vZGlyZWN0aW9ucy1mb3JtL2RpcmVjdGlvbnMtZm9ybS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgcHJvdmlkZURpcmVjdGlvbnNTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvZGlyZWN0aW9ucy1zb3VyY2Uuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbRGlyZWN0aW9uc0Zvcm1Db21wb25lbnQsIERpcmVjdGlvbnNGb3JtQmluZGluZ0RpcmVjdGl2ZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbRGlyZWN0aW9uc0Zvcm1Db21wb25lbnQsIERpcmVjdGlvbnNGb3JtQmluZGluZ0RpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbRGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLCBwcm92aWRlRGlyZWN0aW9uc1NvdXJjZVNlcnZpY2UoKV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0RpcmVjdGlvbnNNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0RpcmVjdGlvbnNNb2R1bGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==