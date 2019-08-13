/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatIconModule, MatButtonModule, MatButtonToggleModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatListModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatCheckboxModule } from '@angular/material';
// import {
//   MatDatetimepickerModule,
//   MatNativeDatetimeModule
// } from '@mat-datetimepicker/core';
import { IgoLanguageModule } from '@igo2/core';
import { IgoCollapsibleModule, IgoListModule, IgoKeyValueModule } from '@igo2/common';
import { FilterableDataSourcePipe } from './shared/filterable-datasource.pipe';
import { TimeFilterFormComponent } from './time-filter-form/time-filter-form.component';
import { TimeFilterItemComponent } from './time-filter-item/time-filter-item.component';
import { TimeFilterListBindingDirective } from './time-filter-list/time-filter-list-binding.directive';
import { TimeFilterListComponent } from './time-filter-list/time-filter-list.component';
import { TimeFilterService } from './shared/time-filter.service';
import { OgcFilterFormComponent } from './ogc-filter-form/ogc-filter-form.component';
import { OgcFilterableFormComponent } from './ogc-filterable-form/ogc-filterable-form.component';
import { OgcFilterableItemComponent } from './ogc-filterable-item/ogc-filterable-item.component';
import { OgcFilterableListBindingDirective } from './ogc-filterable-list/ogc-filterable-list-binding.directive';
import { OgcFilterableListComponent } from './ogc-filterable-list/ogc-filterable-list.component';
import { OgcFilterButtonComponent } from './ogc-filter-button/ogc-filter-button.component';
import { OGCFilterService } from './shared/ogc-filter.service';
import { OgcFilterToggleButtonComponent } from './ogc-filter-toggle-button/ogc-filter-toggle-button.component';
export class IgoFilterModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoFilterModule,
            providers: [
                {
                    provide: MAT_DATE_LOCALE,
                    useValue: 'fr'
                }
            ]
        };
    }
}
IgoFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatAutocompleteModule,
                    MatIconModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCheckboxModule,
                    MatSliderModule,
                    MatSlideToggleModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatOptionModule,
                    MatSelectModule,
                    MatListModule,
                    MatTooltipModule,
                    MatDatepickerModule,
                    MatNativeDateModule,
                    // MatDatetimepickerModule,
                    // MatNativeDatetimeModule,
                    IgoLanguageModule,
                    IgoCollapsibleModule,
                    IgoListModule,
                    IgoKeyValueModule
                ],
                exports: [
                    FilterableDataSourcePipe,
                    TimeFilterFormComponent,
                    TimeFilterItemComponent,
                    TimeFilterListComponent,
                    TimeFilterListBindingDirective,
                    OgcFilterFormComponent,
                    OgcFilterButtonComponent,
                    OgcFilterToggleButtonComponent,
                    OgcFilterableFormComponent,
                    OgcFilterableItemComponent,
                    OgcFilterableListComponent,
                    OgcFilterableListBindingDirective
                ],
                declarations: [
                    FilterableDataSourcePipe,
                    TimeFilterFormComponent,
                    TimeFilterItemComponent,
                    TimeFilterListComponent,
                    TimeFilterListBindingDirective,
                    OgcFilterFormComponent,
                    OgcFilterButtonComponent,
                    OgcFilterToggleButtonComponent,
                    OgcFilterableFormComponent,
                    OgcFilterableItemComponent,
                    OgcFilterableListComponent,
                    OgcFilterableListBindingDirective
                ],
                providers: [TimeFilterService, OGCFilterService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZUFBZSxFQUNmLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBTzNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDdkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDaEgsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUEyRC9HLE1BQU0sT0FBTyxlQUFlOzs7O0lBQzFCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFwRUYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxlQUFlO29CQUNmLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQiwyQkFBMkI7b0JBQzNCLDJCQUEyQjtvQkFDM0IsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLGFBQWE7b0JBQ2IsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qiw4QkFBOEI7b0JBQzlCLHNCQUFzQjtvQkFDdEIsd0JBQXdCO29CQUN4Qiw4QkFBOEI7b0JBQzlCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLGlDQUFpQztpQkFDbEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsOEJBQThCO29CQUM5QixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsOEJBQThCO29CQUM5QiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQixpQ0FBaUM7aUJBQ2xDO2dCQUNELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO2FBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcclxuICBNYXRTbGlkZXJNb2R1bGUsXHJcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdE9wdGlvbk1vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICBNQVRfREFURV9MT0NBTEUsXHJcbiAgTWF0Q2hlY2tib3hNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG4vLyBpbXBvcnQge1xyXG4vLyAgIE1hdERhdGV0aW1lcGlja2VyTW9kdWxlLFxyXG4vLyAgIE1hdE5hdGl2ZURhdGV0aW1lTW9kdWxlXHJcbi8vIH0gZnJvbSAnQG1hdC1kYXRldGltZXBpY2tlci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvTGlzdE1vZHVsZSxcclxuICBJZ29LZXlWYWx1ZU1vZHVsZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUgfSBmcm9tICcuL3NoYXJlZC9maWx0ZXJhYmxlLWRhdGFzb3VyY2UucGlwZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1mb3JtL3RpbWUtZmlsdGVyLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlckl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWxpc3QvdGltZS1maWx0ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1saXN0L3RpbWUtZmlsdGVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC90aW1lLWZpbHRlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlckZvcm1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItZm9ybS9vZ2MtZmlsdGVyLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWZvcm0vb2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtaXRlbS9vZ2MtZmlsdGVyYWJsZS1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtbGlzdC9vZ2MtZmlsdGVyYWJsZS1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWxpc3Qvb2djLWZpbHRlcmFibGUtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItYnV0dG9uL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9HQ0ZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9vZ2MtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItdG9nZ2xlLWJ1dHRvbi9vZ2MtZmlsdGVyLXRvZ2dsZS1idXR0b24uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgICAvLyBNYXREYXRldGltZXBpY2tlck1vZHVsZSxcclxuICAgIC8vIE1hdE5hdGl2ZURhdGV0aW1lTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29LZXlWYWx1ZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlLFxyXG4gICAgVGltZUZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVySXRlbUNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckxpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgT2djRmlsdGVyRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlclRvZ2dsZUJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVGb3JtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUl0ZW1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdENvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVMaXN0QmluZGluZ0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUsXHJcbiAgICBUaW1lRmlsdGVyRm9ybUNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckxpc3RDb21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBPZ2NGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyVG9nZ2xlQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RCaW5kaW5nRGlyZWN0aXZlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtUaW1lRmlsdGVyU2VydmljZSwgT0dDRmlsdGVyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0ZpbHRlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvRmlsdGVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBNQVRfREFURV9MT0NBTEUsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogJ2ZyJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19