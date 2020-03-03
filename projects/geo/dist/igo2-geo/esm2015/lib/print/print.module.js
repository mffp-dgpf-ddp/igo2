/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatSelectModule, MatOptionModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoKeyValueModule } from '@igo2/common';
import { PrintComponent } from './print/print.component';
import { PrintFormComponent } from './print-form/print-form.component';
export class IgoPrintModule {
}
IgoPrintModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatInputModule,
                    MatFormFieldModule,
                    MatSlideToggleModule,
                    IgoLanguageModule,
                    IgoKeyValueModule
                ],
                exports: [PrintComponent, PrintFormComponent],
                declarations: [PrintComponent, PrintFormComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3ByaW50L3ByaW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsRUFDZixlQUFlLEVBQ2YsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixvQkFBb0IsRUFDckIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQW9CdkUsTUFBTSxPQUFPLGNBQWM7OztZQWxCMUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixlQUFlO29CQUNmLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUM7Z0JBQzdDLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQzthQUNuRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvS2V5VmFsdWVNb2R1bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgUHJpbnRDb21wb25lbnQgfSBmcm9tICcuL3ByaW50L3ByaW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFByaW50Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vcHJpbnQtZm9ybS9wcmludC1mb3JtLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29LZXlWYWx1ZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1ByaW50Q29tcG9uZW50LCBQcmludEZvcm1Db21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW1ByaW50Q29tcG9uZW50LCBQcmludEZvcm1Db21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29QcmludE1vZHVsZSB7fVxyXG4iXX0=