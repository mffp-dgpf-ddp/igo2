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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLG9CQUFvQixFQUNwQixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDaEIsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFPM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUNoSCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQXVEL0QsTUFBTSxPQUFPLGVBQWU7Ozs7SUFDMUIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixRQUFRLEVBQUUsSUFBSTtpQkFDZjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWhFRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsYUFBYTtvQkFDYixlQUFlO29CQUNmLGVBQWU7b0JBQ2Ysb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsMkJBQTJCO29CQUMzQiwyQkFBMkI7b0JBQzNCLGlCQUFpQjtvQkFDakIsb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsOEJBQThCO29CQUM5QixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsaUNBQWlDO2lCQUNsQztnQkFDRCxZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qiw4QkFBOEI7b0JBQzlCLHNCQUFzQjtvQkFDdEIsd0JBQXdCO29CQUN4QiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQixpQ0FBaUM7aUJBQ2xDO2dCQUNELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO2FBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFNsaWRlck1vZHVsZSxcclxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gIE1BVF9EQVRFX0xPQ0FMRVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbi8vIGltcG9ydCB7XHJcbi8vICAgTWF0RGF0ZXRpbWVwaWNrZXJNb2R1bGUsXHJcbi8vICAgTWF0TmF0aXZlRGF0ZXRpbWVNb2R1bGVcclxuLy8gfSBmcm9tICdAbWF0LWRhdGV0aW1lcGlja2VyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICBJZ29MaXN0TW9kdWxlLFxyXG4gIElnb0tleVZhbHVlTW9kdWxlXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZpbHRlcmFibGVEYXRhU291cmNlUGlwZSB9IGZyb20gJy4vc2hhcmVkL2ZpbHRlcmFibGUtZGF0YXNvdXJjZS5waXBlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlckZvcm1Db21wb25lbnQgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWZvcm0vdGltZS1maWx0ZXItZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVySXRlbUNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1maWx0ZXItaXRlbS90aW1lLWZpbHRlci1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vdGltZS1maWx0ZXItbGlzdC90aW1lLWZpbHRlci1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWxpc3QvdGltZS1maWx0ZXItbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3RpbWUtZmlsdGVyLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgT2djRmlsdGVyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vb2djLWZpbHRlci1mb3JtL29nYy1maWx0ZXItZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtZm9ybS9vZ2MtZmlsdGVyYWJsZS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyYWJsZS1pdGVtL29nYy1maWx0ZXJhYmxlLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUxpc3RCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9vZ2MtZmlsdGVyYWJsZS1saXN0L29nYy1maWx0ZXJhYmxlLWxpc3QtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtbGlzdC9vZ2MtZmlsdGVyYWJsZS1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlckJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vb2djLWZpbHRlci1idXR0b24vb2djLWZpbHRlci1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT0dDRmlsdGVyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL29nYy1maWx0ZXIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTbGlkZXJNb2R1bGUsXHJcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICAgIC8vIE1hdERhdGV0aW1lcGlja2VyTW9kdWxlLFxyXG4gICAgLy8gTWF0TmF0aXZlRGF0ZXRpbWVNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gICAgSWdvTGlzdE1vZHVsZSxcclxuICAgIElnb0tleVZhbHVlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUsXHJcbiAgICBUaW1lRmlsdGVyRm9ybUNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckxpc3RDb21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBPZ2NGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RCaW5kaW5nRGlyZWN0aXZlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZpbHRlcmFibGVEYXRhU291cmNlUGlwZSxcclxuICAgIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckl0ZW1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIE9nY0ZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1RpbWVGaWx0ZXJTZXJ2aWNlLCBPR0NGaWx0ZXJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvRmlsdGVyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29GaWx0ZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IE1BVF9EQVRFX0xPQ0FMRSxcclxuICAgICAgICAgIHVzZVZhbHVlOiAnZnInXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=