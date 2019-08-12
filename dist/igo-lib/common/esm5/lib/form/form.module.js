/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgoFormFormModule } from './form/form.module';
import { IgoFormGroupModule } from './form-group/form-group.module';
import { IgoFormFieldModule } from './form-field/form-field.module';
import { FormFieldSelectComponent } from './form-field/form-field-select.component';
import { FormFieldTextComponent } from './form-field/form-field-text.component';
import { FormFieldTextareaComponent } from './form-field/form-field-textarea.component';
import { FormService } from './shared/form.service';
import { FormFieldService } from './shared/form-field.service';
/**
 * @ignore
 */
var IgoFormModule = /** @class */ (function () {
    function IgoFormModule() {
    }
    IgoFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        IgoFormGroupModule,
                        IgoFormFieldModule
                    ],
                    exports: [
                        IgoFormFormModule,
                        IgoFormGroupModule,
                        IgoFormFieldModule
                    ],
                    declarations: [],
                    providers: [
                        FormService,
                        FormFieldService
                    ],
                    entryComponents: [
                        FormFieldSelectComponent,
                        FormFieldTextComponent,
                        FormFieldTextareaComponent
                    ]
                },] }
    ];
    return IgoFormModule;
}());
export { IgoFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7O0FBSy9EO0lBQUE7SUFzQjRCLENBQUM7O2dCQXRCNUIsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLGtCQUFrQjtxQkFDbkI7b0JBQ0QsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLFNBQVMsRUFBRTt3QkFDVCxXQUFXO3dCQUNYLGdCQUFnQjtxQkFDakI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLHdCQUF3Qjt3QkFDeEIsc0JBQXNCO3dCQUN0QiwwQkFBMEI7cUJBQzNCO2lCQUNGOztJQUMyQixvQkFBQztDQUFBLEFBdEI3QixJQXNCNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29Gb3JtRm9ybU1vZHVsZSB9IGZyb20gJy4vZm9ybS9mb3JtLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0Zvcm1Hcm91cE1vZHVsZSB9IGZyb20gJy4vZm9ybS1ncm91cC9mb3JtLWdyb3VwLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0Zvcm1GaWVsZE1vZHVsZSB9IGZyb20gJy4vZm9ybS1maWVsZC9mb3JtLWZpZWxkLm1vZHVsZSc7XHJcbmltcG9ydCB7IEZvcm1GaWVsZFNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1maWVsZC9mb3JtLWZpZWxkLXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWZpZWxkL2Zvcm0tZmllbGQtdGV4dC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRUZXh0YXJlYUNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1maWVsZC9mb3JtLWZpZWxkLXRleHRhcmVhLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvZm9ybS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUZpZWxkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2Zvcm0tZmllbGQuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBJZ29Gb3JtR3JvdXBNb2R1bGUsXHJcbiAgICBJZ29Gb3JtRmllbGRNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIElnb0Zvcm1Gb3JtTW9kdWxlLFxyXG4gICAgSWdvRm9ybUdyb3VwTW9kdWxlLFxyXG4gICAgSWdvRm9ybUZpZWxkTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgRm9ybVNlcnZpY2UsXHJcbiAgICBGb3JtRmllbGRTZXJ2aWNlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIEZvcm1GaWVsZFNlbGVjdENvbXBvbmVudCxcclxuICAgIEZvcm1GaWVsZFRleHRDb21wb25lbnQsXHJcbiAgICBGb3JtRmllbGRUZXh0YXJlYUNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0Zvcm1Nb2R1bGUge31cclxuIl19