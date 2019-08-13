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
var IgoFilterModule = /** @class */ (function () {
    function IgoFilterModule() {
    }
    /**
     * @return {?}
     */
    IgoFilterModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoFilterModule,
            providers: [
                {
                    provide: MAT_DATE_LOCALE,
                    useValue: 'fr'
                }
            ]
        };
    };
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
    return IgoFilterModule;
}());
export { IgoFilterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZUFBZSxFQUNmLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBTzNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDdkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDaEgsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFFL0c7SUFBQTtJQXFFQSxDQUFDOzs7O0lBWFEsdUJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztnQkFwRUYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQiwyQkFBMkI7d0JBQzNCLDJCQUEyQjt3QkFDM0IsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLGFBQWE7d0JBQ2IsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4Qix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qiw4QkFBOEI7d0JBQzlCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4Qiw4QkFBOEI7d0JBQzlCLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLGlDQUFpQztxQkFDbEM7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsOEJBQThCO3dCQUM5QixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsOEJBQThCO3dCQUM5QiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQixpQ0FBaUM7cUJBQ2xDO29CQUNELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO2lCQUNqRDs7SUFhRCxzQkFBQztDQUFBLEFBckVELElBcUVDO1NBWlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXHJcbiAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgTUFUX0RBVEVfTE9DQUxFLFxyXG4gIE1hdENoZWNrYm94TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuLy8gaW1wb3J0IHtcclxuLy8gICBNYXREYXRldGltZXBpY2tlck1vZHVsZSxcclxuLy8gICBNYXROYXRpdmVEYXRldGltZU1vZHVsZVxyXG4vLyB9IGZyb20gJ0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gIElnb0xpc3RNb2R1bGUsXHJcbiAgSWdvS2V5VmFsdWVNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlIH0gZnJvbSAnLi9zaGFyZWQvZmlsdGVyYWJsZS1kYXRhc291cmNlLnBpcGUnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1maWx0ZXItZm9ybS90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1pdGVtL3RpbWUtZmlsdGVyLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlckxpc3RCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi90aW1lLWZpbHRlci1saXN0L3RpbWUtZmlsdGVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdGltZS1maWx0ZXItbGlzdC90aW1lLWZpbHRlci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvdGltZS1maWx0ZXIuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyLWZvcm0vb2djLWZpbHRlci1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyYWJsZS1mb3JtL29nYy1maWx0ZXJhYmxlLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWxpc3Qvb2djLWZpbHRlcmFibGUtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyYWJsZS1saXN0L29nYy1maWx0ZXJhYmxlLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPR0NGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyVG9nZ2xlQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyLXRvZ2dsZS1idXR0b24vb2djLWZpbHRlci10b2dnbGUtYnV0dG9uLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdFNsaWRlck1vZHVsZSxcclxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gICAgLy8gTWF0RGF0ZXRpbWVwaWNrZXJNb2R1bGUsXHJcbiAgICAvLyBNYXROYXRpdmVEYXRldGltZU1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvS2V5VmFsdWVNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEZpbHRlcmFibGVEYXRhU291cmNlUGlwZSxcclxuICAgIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckl0ZW1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIE9nY0ZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlLFxyXG4gICAgVGltZUZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVySXRlbUNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckxpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgT2djRmlsdGVyRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlclRvZ2dsZUJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVGb3JtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUl0ZW1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdENvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVMaXN0QmluZGluZ0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbVGltZUZpbHRlclNlcnZpY2UsIE9HQ0ZpbHRlclNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29GaWx0ZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0ZpbHRlck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogTUFUX0RBVEVfTE9DQUxFLFxyXG4gICAgICAgICAgdXNlVmFsdWU6ICdmcidcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==