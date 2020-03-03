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
var IgoDirectionsModule = /** @class */ (function () {
    function IgoDirectionsModule() {
    }
    /**
     * @return {?}
     */
    IgoDirectionsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoDirectionsModule
        };
    };
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
    return IgoDirectionsModule;
}());
export { IgoDirectionsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aW9ucy9kaXJlY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXBGO0lBQUE7SUEyQkEsQ0FBQzs7OztJQUxRLDJCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1NBQzlCLENBQUM7SUFDSixDQUFDOztnQkExQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixxQkFBcUI7d0JBQ3JCLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsOEJBQThCLENBQUM7b0JBQ2xFLFlBQVksRUFBRSxDQUFDLHVCQUF1QixFQUFFLDhCQUE4QixDQUFDO29CQUN2RSxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSw4QkFBOEIsRUFBRSxDQUFDO2lCQUNyRTs7SUFPRCwwQkFBQztDQUFBLEFBM0JELElBMkJDO1NBTlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0RGl2aWRlck1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25zRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vZGlyZWN0aW9ucy1mb3JtL2RpcmVjdGlvbnMtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zRm9ybUJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGlvbnMtZm9ybS9kaXJlY3Rpb25zLWZvcm0tYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zRm9ybVNlcnZpY2UgfSBmcm9tICcuL2RpcmVjdGlvbnMtZm9ybS9kaXJlY3Rpb25zLWZvcm0uc2VydmljZSc7XHJcbmltcG9ydCB7IHByb3ZpZGVEaXJlY3Rpb25zU291cmNlU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2RpcmVjdGlvbnMtc291cmNlLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdERpdmlkZXJNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW0RpcmVjdGlvbnNGb3JtQ29tcG9uZW50LCBEaXJlY3Rpb25zRm9ybUJpbmRpbmdEaXJlY3RpdmVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0RpcmVjdGlvbnNGb3JtQ29tcG9uZW50LCBEaXJlY3Rpb25zRm9ybUJpbmRpbmdEaXJlY3RpdmVdLFxyXG4gIHByb3ZpZGVyczogW0RpcmVjdGlvbnNGb3JtU2VydmljZSwgcHJvdmlkZURpcmVjdGlvbnNTb3VyY2VTZXJ2aWNlKCldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29EaXJlY3Rpb25zTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29EaXJlY3Rpb25zTW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=