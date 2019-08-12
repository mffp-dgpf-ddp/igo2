/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatIconModule, MatButtonModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatListModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLG9CQUFvQixFQUNwQixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDaEIsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFPM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUNoSCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUvRDtJQUFBO0lBaUVBLENBQUM7Ozs7SUFYUSx1QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixRQUFRLEVBQUUsSUFBSTtpQkFDZjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQWhFRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3dCQUMzQiwyQkFBMkI7d0JBQzNCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixhQUFhO3dCQUNiLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsOEJBQThCO3dCQUM5QixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsaUNBQWlDO3FCQUNsQztvQkFDRCxZQUFZLEVBQUU7d0JBQ1osd0JBQXdCO3dCQUN4Qix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3dCQUN2Qiw4QkFBOEI7d0JBQzlCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4QiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQixpQ0FBaUM7cUJBQ2xDO29CQUNELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO2lCQUNqRDs7SUFhRCxzQkFBQztDQUFBLEFBakVELElBaUVDO1NBWlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRTbGlkZXJNb2R1bGUsXHJcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdE9wdGlvbk1vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICBNQVRfREFURV9MT0NBTEVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG4vLyBpbXBvcnQge1xyXG4vLyAgIE1hdERhdGV0aW1lcGlja2VyTW9kdWxlLFxyXG4vLyAgIE1hdE5hdGl2ZURhdGV0aW1lTW9kdWxlXHJcbi8vIH0gZnJvbSAnQG1hdC1kYXRldGltZXBpY2tlci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvTGlzdE1vZHVsZSxcclxuICBJZ29LZXlWYWx1ZU1vZHVsZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUgfSBmcm9tICcuL3NoYXJlZC9maWx0ZXJhYmxlLWRhdGFzb3VyY2UucGlwZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1mb3JtL3RpbWUtZmlsdGVyLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlckl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWxpc3QvdGltZS1maWx0ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1saXN0L3RpbWUtZmlsdGVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC90aW1lLWZpbHRlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlckZvcm1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItZm9ybS9vZ2MtZmlsdGVyLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWZvcm0vb2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtaXRlbS9vZ2MtZmlsdGVyYWJsZS1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtbGlzdC9vZ2MtZmlsdGVyYWJsZS1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWxpc3Qvb2djLWZpbHRlcmFibGUtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItYnV0dG9uL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9HQ0ZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9vZ2MtZmlsdGVyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgICAvLyBNYXREYXRldGltZXBpY2tlck1vZHVsZSxcclxuICAgIC8vIE1hdE5hdGl2ZURhdGV0aW1lTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29LZXlWYWx1ZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlLFxyXG4gICAgVGltZUZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVySXRlbUNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckxpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgT2djRmlsdGVyRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVGb3JtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUl0ZW1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdENvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVMaXN0QmluZGluZ0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUsXHJcbiAgICBUaW1lRmlsdGVyRm9ybUNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckxpc3RDb21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBPZ2NGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RCaW5kaW5nRGlyZWN0aXZlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtUaW1lRmlsdGVyU2VydmljZSwgT0dDRmlsdGVyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0ZpbHRlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvRmlsdGVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBNQVRfREFURV9MT0NBTEUsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogJ2ZyJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19