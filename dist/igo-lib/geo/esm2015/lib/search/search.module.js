/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideSearchSourceService } from './shared/search-source-service.providers';
import { provideDefaultIChercheSearchResultFormatter } from './shared/sources/icherche.providers';
import { provideDefaultCoordinatesSearchResultFormatter } from './shared/sources/coordinates.providers';
import { IgoSearchBarModule } from './search-bar/search-bar.module';
import { IgoSearchSelectorModule } from './search-selector/search-selector.module';
import { IgoSearchResultsModule } from './search-results/search-results.module';
import { IgoSearchSettingsModule } from './search-settings/search-settings.module';
export class IgoSearchModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoSearchModule,
            providers: [
                provideSearchSourceService(),
                provideDefaultIChercheSearchResultFormatter(),
                provideDefaultCoordinatesSearchResultFormatter()
            ]
        };
    }
}
IgoSearchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoSearchBarModule,
                    IgoSearchSelectorModule,
                    IgoSearchResultsModule,
                    IgoSearchSettingsModule
                ],
                exports: [
                    IgoSearchBarModule,
                    IgoSearchSelectorModule,
                    IgoSearchResultsModule,
                    IgoSearchSettingsModule
                ],
                declarations: []
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXhHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBa0JuRixNQUFNLE9BQU8sZUFBZTs7OztJQUMxQixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQTBCLEVBQUU7Z0JBQzVCLDJDQUEyQyxFQUFFO2dCQUM3Qyw4Q0FBOEMsRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUExQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGtCQUFrQjtvQkFDbEIsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsWUFBWSxFQUFFLEVBQUU7YUFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgcHJvdmlkZVNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZWFyY2gtc291cmNlLXNlcnZpY2UucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvaWNoZXJjaGUucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvY29vcmRpbmF0ZXMucHJvdmlkZXJzJztcclxuXHJcbmltcG9ydCB7IElnb1NlYXJjaEJhck1vZHVsZSB9IGZyb20gJy4vc2VhcmNoLWJhci9zZWFyY2gtYmFyLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtc2VsZWN0b3Ivc2VhcmNoLXNlbGVjdG9yLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFJlc3VsdHNNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFNldHRpbmdzTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtc2V0dGluZ3Mvc2VhcmNoLXNldHRpbmdzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIElnb1NlYXJjaEJhck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSxcclxuICAgIElnb1NlYXJjaFNldHRpbmdzTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJZ29TZWFyY2hCYXJNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFJlc3VsdHNNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZXR0aW5nc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvU2VhcmNoTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29TZWFyY2hNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHByb3ZpZGVTZWFyY2hTb3VyY2VTZXJ2aWNlKCksXHJcbiAgICAgICAgcHJvdmlkZURlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcigpLFxyXG4gICAgICAgIHByb3ZpZGVEZWZhdWx0Q29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=