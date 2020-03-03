/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatIconModule, MatButtonModule, MatButtonToggleModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatTableModule, MatTreeModule, MatInputModule, MatOptionModule, MatSelectModule, MatListModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatCheckboxModule, MatTabsModule, MatRadioModule, MatMenuModule } from '@angular/material';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { IgoLanguageModule } from '@igo2/core';
import { IgoCollapsibleModule, IgoListModule, IgoKeyValueModule } from '@igo2/common';
import { IgoGeometryModule } from './../geometry/geometry.module';
import { FilterableDataSourcePipe } from './shared/filterable-datasource.pipe';
import { IgoLayerModule } from '../layer/layer.module';
import { TimeFilterButtonComponent } from './time-filter-button/time-filter-button.component';
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
import { SpatialFilterTypeComponent } from './spatial-filter/spatial-filter-type/spatial-filter-type.component';
import { SpatialFilterListComponent } from './spatial-filter/spatial-filter-list/spatial-filter-list.component';
import { SpatialFilterItemComponent } from './spatial-filter/spatial-filter-item/spatial-filter-item.component';
import { SpatialFilterService } from './shared/spatial-filter.service';
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
                    MatTabsModule,
                    MatRadioModule,
                    MatMenuModule,
                    MatTableModule,
                    MatTreeModule,
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
                    MatDatetimepickerModule,
                    MatNativeDatetimeModule,
                    IgoLanguageModule,
                    IgoLayerModule,
                    IgoCollapsibleModule,
                    IgoListModule,
                    IgoKeyValueModule,
                    IgoGeometryModule
                ],
                exports: [
                    FilterableDataSourcePipe,
                    TimeFilterButtonComponent,
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
                    OgcFilterableListBindingDirective,
                    SpatialFilterTypeComponent,
                    SpatialFilterListComponent,
                    SpatialFilterItemComponent
                ],
                declarations: [
                    FilterableDataSourcePipe,
                    TimeFilterButtonComponent,
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
                    OgcFilterableListBindingDirective,
                    SpatialFilterTypeComponent,
                    SpatialFilterListComponent,
                    SpatialFilterItemComponent
                ],
                providers: [TimeFilterService, OGCFilterService, SpatialFilterService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN4QixNQUFNLDBCQUEwQixDQUFDO0FBRWxDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9B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QUNqQywwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO2lCQUMzQjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQzthQUN2RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXHJcbiAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRUYWJsZU1vZHVsZSxcclxuICBNYXRUcmVlTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdE9wdGlvbk1vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICBNQVRfREFURV9MT0NBTEUsXHJcbiAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgTWF0VGFic01vZHVsZSxcclxuICBNYXRSYWRpb01vZHVsZSxcclxuICBNYXRNZW51TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHtcclxuICBNYXREYXRldGltZXBpY2tlck1vZHVsZSxcclxuICBNYXROYXRpdmVEYXRldGltZU1vZHVsZVxyXG59IGZyb20gJ0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gIElnb0xpc3RNb2R1bGUsXHJcbiAgSWdvS2V5VmFsdWVNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29HZW9tZXRyeU1vZHVsZSB9IGZyb20gJy4vLi4vZ2VvbWV0cnkvZ2VvbWV0cnkubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IEZpbHRlcmFibGVEYXRhU291cmNlUGlwZSB9IGZyb20gJy4vc2hhcmVkL2ZpbHRlcmFibGUtZGF0YXNvdXJjZS5waXBlJztcclxuaW1wb3J0IHsgSWdvTGF5ZXJNb2R1bGUgfSBmcm9tICcuLi9sYXllci9sYXllci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1idXR0b24vdGltZS1maWx0ZXItYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1mb3JtL3RpbWUtZmlsdGVyLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlckl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWl0ZW0vdGltZS1maWx0ZXItaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL3RpbWUtZmlsdGVyLWxpc3QvdGltZS1maWx0ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1saXN0L3RpbWUtZmlsdGVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC90aW1lLWZpbHRlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE9nY0ZpbHRlckZvcm1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItZm9ybS9vZ2MtZmlsdGVyLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUZvcm1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWZvcm0vb2djLWZpbHRlcmFibGUtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtaXRlbS9vZ2MtZmlsdGVyYWJsZS1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vb2djLWZpbHRlcmFibGUtbGlzdC9vZ2MtZmlsdGVyYWJsZS1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWxpc3Qvb2djLWZpbHRlcmFibGUtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItYnV0dG9uL29nYy1maWx0ZXItYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9HQ0ZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9vZ2MtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItdG9nZ2xlLWJ1dHRvbi9vZ2MtZmlsdGVyLXRvZ2dsZS1idXR0b24uY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJUeXBlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGF0aWFsLWZpbHRlci9zcGF0aWFsLWZpbHRlci10eXBlL3NwYXRpYWwtZmlsdGVyLXR5cGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3BhdGlhbEZpbHRlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3NwYXRpYWwtZmlsdGVyL3NwYXRpYWwtZmlsdGVyLWxpc3Qvc3BhdGlhbC1maWx0ZXItbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVySXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc3BhdGlhbC1maWx0ZXIvc3BhdGlhbC1maWx0ZXItaXRlbS9zcGF0aWFsLWZpbHRlci1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc3BhdGlhbC1maWx0ZXIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgTWF0UmFkaW9Nb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0VGFibGVNb2R1bGUsXHJcbiAgICBNYXRUcmVlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXRTbGlkZXJNb2R1bGUsXHJcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICAgIE1hdERhdGV0aW1lcGlja2VyTW9kdWxlLFxyXG4gICAgTWF0TmF0aXZlRGF0ZXRpbWVNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb0xheWVyTW9kdWxlLFxyXG4gICAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvS2V5VmFsdWVNb2R1bGUsXHJcbiAgICBJZ29HZW9tZXRyeU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlLFxyXG4gICAgVGltZUZpbHRlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckl0ZW1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIE9nY0ZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBTcGF0aWFsRmlsdGVyVHlwZUNvbXBvbmVudCxcclxuICAgIFNwYXRpYWxGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgU3BhdGlhbEZpbHRlckl0ZW1Db21wb25lbnRcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlLFxyXG4gICAgVGltZUZpbHRlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckl0ZW1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIE9nY0ZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBTcGF0aWFsRmlsdGVyVHlwZUNvbXBvbmVudCxcclxuICAgIFNwYXRpYWxGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgU3BhdGlhbEZpbHRlckl0ZW1Db21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1RpbWVGaWx0ZXJTZXJ2aWNlLCBPR0NGaWx0ZXJTZXJ2aWNlLCBTcGF0aWFsRmlsdGVyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0ZpbHRlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvRmlsdGVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBNQVRfREFURV9MT0NBTEUsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogJ2ZyJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19