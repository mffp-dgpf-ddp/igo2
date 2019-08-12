/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IgoFilterModule } from '@igo2/geo';
import { OgcFilterToolComponent } from './ogc-filter-tool/ogc-filter-tool.component';
import { TimeAnalysisToolComponent } from './time-analysis-tool/time-analysis-tool.component';
export class IgoAppFilterModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppFilterModule,
            providers: []
        };
    }
}
IgoAppFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [IgoFilterModule],
                declarations: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                exports: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                entryComponents: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9maWx0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUVSLHNCQUFzQixFQUN2QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBUzlGLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFDN0IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOzs7WUFiRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztnQkFDakUsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUseUJBQXlCLENBQUM7Z0JBQzVELGVBQWUsRUFBRSxDQUFDLHNCQUFzQixFQUFFLHlCQUF5QixDQUFDO2dCQUNwRSxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgTmdNb2R1bGUsXHJcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcclxuICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29GaWx0ZXJNb2R1bGUgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJUb29sQ29tcG9uZW50IH0gZnJvbSAnLi9vZ2MtZmlsdGVyLXRvb2wvb2djLWZpbHRlci10b29sLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVBbmFseXNpc1Rvb2xDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtYW5hbHlzaXMtdG9vbC90aW1lLWFuYWx5c2lzLXRvb2wuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0lnb0ZpbHRlck1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbT2djRmlsdGVyVG9vbENvbXBvbmVudCwgVGltZUFuYWx5c2lzVG9vbENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW09nY0ZpbHRlclRvb2xDb21wb25lbnQsIFRpbWVBbmFseXNpc1Rvb2xDb21wb25lbnRdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW09nY0ZpbHRlclRvb2xDb21wb25lbnQsIFRpbWVBbmFseXNpc1Rvb2xDb21wb25lbnRdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQXBwRmlsdGVyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29BcHBGaWx0ZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW11cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==