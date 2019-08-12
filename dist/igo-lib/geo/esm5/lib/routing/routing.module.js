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
var IgoRoutingModule = /** @class */ (function () {
    function IgoRoutingModule() {
    }
    /**
     * @return {?}
     */
    IgoRoutingModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoRoutingModule
        };
    };
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
    return IgoRoutingModule;
}());
export { IgoRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvcm91dGluZy9yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTlFO0lBQUE7SUEyQkEsQ0FBQzs7OztJQUxRLHdCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzNCLENBQUM7SUFDSixDQUFDOztnQkExQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixxQkFBcUI7d0JBQ3JCLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsMkJBQTJCLENBQUM7b0JBQzVELFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLDJCQUEyQixDQUFDO29CQUNqRSxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSwyQkFBMkIsRUFBRSxDQUFDO2lCQUMvRDs7SUFPRCx1QkFBQztDQUFBLEFBM0JELElBMkJDO1NBTlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0RGl2aWRlck1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0aW5nRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vcm91dGluZy1mb3JtL3JvdXRpbmctZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSb3V0aW5nRm9ybUJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL3JvdXRpbmctZm9ybS9yb3V0aW5nLWZvcm0tYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBSb3V0aW5nRm9ybVNlcnZpY2UgfSBmcm9tICcuL3JvdXRpbmctZm9ybS9yb3V0aW5nLWZvcm0uc2VydmljZSc7XHJcbmltcG9ydCB7IHByb3ZpZGVSb3V0aW5nU291cmNlU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3JvdXRpbmctc291cmNlLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdERpdmlkZXJNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1JvdXRpbmdGb3JtQ29tcG9uZW50LCBSb3V0aW5nRm9ybUJpbmRpbmdEaXJlY3RpdmVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1JvdXRpbmdGb3JtQ29tcG9uZW50LCBSb3V0aW5nRm9ybUJpbmRpbmdEaXJlY3RpdmVdLFxyXG4gIHByb3ZpZGVyczogW1JvdXRpbmdGb3JtU2VydmljZSwgcHJvdmlkZVJvdXRpbmdTb3VyY2VTZXJ2aWNlKCldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29Sb3V0aW5nTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29Sb3V0aW5nTW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=