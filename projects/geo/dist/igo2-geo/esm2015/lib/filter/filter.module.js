/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatIconModule, MatButtonModule, MatButtonToggleModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatTableModule, MatTreeModule, MatInputModule, MatOptionModule, MatSelectModule, MatListModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatCheckboxModule, MatTabsModule, MatRadioModule, MatMenuModule, MatBadgeModule } from '@angular/material';
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
                    useValue: 'fr-FR'
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
                    IgoGeometryModule,
                    MatBadgeModule
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNmLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDeEIsTUFBTSwwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FB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QkFBMEI7b0JBQzFCLGlDQUFpQztvQkFDakMsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtpQkFDM0I7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7YUFDdkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxyXG4gIE1hdFNsaWRlck1vZHVsZSxcclxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0VGFibGVNb2R1bGUsXHJcbiAgTWF0VHJlZU1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgTUFUX0RBVEVfTE9DQUxFLFxyXG4gIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gIE1hdFRhYnNNb2R1bGUsXHJcbiAgTWF0UmFkaW9Nb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSxcclxuICBNYXRCYWRnZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0RGF0ZXRpbWVwaWNrZXJNb2R1bGUsXHJcbiAgTWF0TmF0aXZlRGF0ZXRpbWVNb2R1bGVcclxufSBmcm9tICdAbWF0LWRhdGV0aW1lcGlja2VyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICBJZ29MaXN0TW9kdWxlLFxyXG4gIElnb0tleVZhbHVlTW9kdWxlXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgSWdvR2VvbWV0cnlNb2R1bGUgfSBmcm9tICcuLy4uL2dlb21ldHJ5L2dlb21ldHJ5Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBGaWx0ZXJhYmxlRGF0YVNvdXJjZVBpcGUgfSBmcm9tICcuL3NoYXJlZC9maWx0ZXJhYmxlLWRhdGFzb3VyY2UucGlwZSc7XHJcbmltcG9ydCB7IElnb0xheWVyTW9kdWxlIH0gZnJvbSAnLi4vbGF5ZXIvbGF5ZXIubW9kdWxlJztcclxuaW1wb3J0IHsgVGltZUZpbHRlckJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1maWx0ZXItYnV0dG9uL3RpbWUtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1maWx0ZXItZm9ybS90aW1lLWZpbHRlci1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWZpbHRlci1pdGVtL3RpbWUtZmlsdGVyLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUZpbHRlckxpc3RCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi90aW1lLWZpbHRlci1saXN0L3RpbWUtZmlsdGVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdGltZS1maWx0ZXItbGlzdC90aW1lLWZpbHRlci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvdGltZS1maWx0ZXIuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyLWZvcm0vb2djLWZpbHRlci1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyYWJsZS1mb3JtL29nYy1maWx0ZXJhYmxlLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyYWJsZUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWl0ZW0vb2djLWZpbHRlcmFibGUtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL29nYy1maWx0ZXJhYmxlLWxpc3Qvb2djLWZpbHRlcmFibGUtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyYWJsZS1saXN0L29nYy1maWx0ZXJhYmxlLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgT2djRmlsdGVyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyLWJ1dHRvbi9vZ2MtZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPR0NGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvb2djLWZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2djRmlsdGVyVG9nZ2xlQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyLXRvZ2dsZS1idXR0b24vb2djLWZpbHRlci10b2dnbGUtYnV0dG9uLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyVHlwZUNvbXBvbmVudCB9IGZyb20gJy4vc3BhdGlhbC1maWx0ZXIvc3BhdGlhbC1maWx0ZXItdHlwZS9zcGF0aWFsLWZpbHRlci10eXBlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9zcGF0aWFsLWZpbHRlci9zcGF0aWFsLWZpbHRlci1saXN0L3NwYXRpYWwtZmlsdGVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3BhdGlhbEZpbHRlckl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NwYXRpYWwtZmlsdGVyL3NwYXRpYWwtZmlsdGVyLWl0ZW0vc3BhdGlhbC1maWx0ZXItaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTcGF0aWFsRmlsdGVyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NwYXRpYWwtZmlsdGVyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIE1hdFJhZGlvTW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdFRhYmxlTW9kdWxlLFxyXG4gICAgTWF0VHJlZU1vZHVsZSxcclxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgICBNYXREYXRldGltZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdE5hdGl2ZURhdGV0aW1lTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29MYXllck1vZHVsZSxcclxuICAgIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gICAgSWdvTGlzdE1vZHVsZSxcclxuICAgIElnb0tleVZhbHVlTW9kdWxlLFxyXG4gICAgSWdvR2VvbWV0cnlNb2R1bGUsXHJcbiAgICBNYXRCYWRnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlLFxyXG4gICAgVGltZUZpbHRlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckl0ZW1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIE9nY0ZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBTcGF0aWFsRmlsdGVyVHlwZUNvbXBvbmVudCxcclxuICAgIFNwYXRpYWxGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgU3BhdGlhbEZpbHRlckl0ZW1Db21wb25lbnRcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRmlsdGVyYWJsZURhdGFTb3VyY2VQaXBlLFxyXG4gICAgVGltZUZpbHRlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJGb3JtQ29tcG9uZW50LFxyXG4gICAgVGltZUZpbHRlckl0ZW1Db21wb25lbnQsXHJcbiAgICBUaW1lRmlsdGVyTGlzdENvbXBvbmVudCxcclxuICAgIFRpbWVGaWx0ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIE9nY0ZpbHRlckZvcm1Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJUb2dnbGVCdXR0b25Db21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlRm9ybUNvbXBvbmVudCxcclxuICAgIE9nY0ZpbHRlcmFibGVJdGVtQ29tcG9uZW50LFxyXG4gICAgT2djRmlsdGVyYWJsZUxpc3RDb21wb25lbnQsXHJcbiAgICBPZ2NGaWx0ZXJhYmxlTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBTcGF0aWFsRmlsdGVyVHlwZUNvbXBvbmVudCxcclxuICAgIFNwYXRpYWxGaWx0ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgU3BhdGlhbEZpbHRlckl0ZW1Db21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1RpbWVGaWx0ZXJTZXJ2aWNlLCBPR0NGaWx0ZXJTZXJ2aWNlLCBTcGF0aWFsRmlsdGVyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0ZpbHRlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvRmlsdGVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBNQVRfREFURV9MT0NBTEUsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogJ2ZyLUZSJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19