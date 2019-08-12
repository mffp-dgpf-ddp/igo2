/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoDynamicOutletModule } from '../../dynamic-component/dynamic-outlet/dynamic-outlet.module';
import { FormFieldComponent } from './form-field.component';
import { FormFieldSelectComponent } from './form-field-select.component';
import { FormFieldTextComponent } from './form-field-text.component';
import { FormFieldTextareaComponent } from './form-field-textarea.component';
/**
 * @ignore
 */
var IgoFormFieldModule = /** @class */ (function () {
    function IgoFormFieldModule() {
    }
    IgoFormFieldModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatIconModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatSelectModule,
                        IgoLanguageModule,
                        IgoDynamicOutletModule
                    ],
                    exports: [
                        FormFieldComponent,
                        FormFieldSelectComponent,
                        FormFieldTextComponent,
                        FormFieldTextareaComponent
                    ],
                    declarations: [
                        FormFieldComponent,
                        FormFieldSelectComponent,
                        FormFieldTextComponent,
                        FormFieldTextareaComponent
                    ]
                },] }
    ];
    return IgoFormFieldModule;
}());
export { IgoFormFieldModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLWZpZWxkL2Zvcm0tZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUNMLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGVBQWUsRUFDaEIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFFdEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFLN0U7SUFBQTtJQXlCaUMsQ0FBQzs7Z0JBekJqQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIsc0JBQXNCO3dCQUN0QiwwQkFBMEI7cUJBQzNCO29CQUNELFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIsc0JBQXNCO3dCQUN0QiwwQkFBMEI7cUJBQzNCO2lCQUNGOztJQUNnQyx5QkFBQztDQUFBLEFBekJsQyxJQXlCa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvRHluYW1pY091dGxldE1vZHVsZSB9IGZyb20gJy4uLy4uL2R5bmFtaWMtY29tcG9uZW50L2R5bmFtaWMtb3V0bGV0L2R5bmFtaWMtb3V0bGV0Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tZmllbGQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUZpZWxkU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWZpZWxkLXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtRmllbGRUZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWZpZWxkLXRleHQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUZpZWxkVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tZmllbGQtdGV4dGFyZWEuY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvRHluYW1pY091dGxldE1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRm9ybUZpZWxkQ29tcG9uZW50LFxyXG4gICAgRm9ybUZpZWxkU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgRm9ybUZpZWxkVGV4dENvbXBvbmVudCxcclxuICAgIEZvcm1GaWVsZFRleHRhcmVhQ29tcG9uZW50XHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1GaWVsZENvbXBvbmVudCxcclxuICAgIEZvcm1GaWVsZFNlbGVjdENvbXBvbmVudCxcclxuICAgIEZvcm1GaWVsZFRleHRDb21wb25lbnQsXHJcbiAgICBGb3JtRmllbGRUZXh0YXJlYUNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0Zvcm1GaWVsZE1vZHVsZSB7fVxyXG4iXX0=