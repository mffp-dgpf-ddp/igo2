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
                    IgoSearchResultsModule
                ],
                exports: [
                    IgoSearchBarModule,
                    IgoSearchSelectorModule,
                    IgoSearchResultsModule
                ],
                declarations: []
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXhHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBZ0JoRixNQUFNLE9BQU8sZUFBZTs7OztJQUMxQixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQTBCLEVBQUU7Z0JBQzVCLDJDQUEyQyxFQUFFO2dCQUM3Qyw4Q0FBOEMsRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUF4QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGtCQUFrQjtvQkFDbEIsdUJBQXVCO29CQUN2QixzQkFBc0I7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxrQkFBa0I7b0JBQ2xCLHVCQUF1QjtvQkFDdkIsc0JBQXNCO2lCQUN2QjtnQkFDRCxZQUFZLEVBQUUsRUFBRTthQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBwcm92aWRlU2VhcmNoU291cmNlU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlYXJjaC1zb3VyY2Utc2VydmljZS5wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIH0gZnJvbSAnLi9zaGFyZWQvc291cmNlcy9pY2hlcmNoZS5wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIH0gZnJvbSAnLi9zaGFyZWQvc291cmNlcy9jb29yZGluYXRlcy5wcm92aWRlcnMnO1xyXG5cclxuaW1wb3J0IHsgSWdvU2VhcmNoQmFyTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtYmFyL3NlYXJjaC1iYXIubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1zZWxlY3Rvci9zZWFyY2gtc2VsZWN0b3IubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMvc2VhcmNoLXJlc3VsdHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoQmFyTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJZ29TZWFyY2hCYXJNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFJlc3VsdHNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb1NlYXJjaE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvU2VhcmNoTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBwcm92aWRlU2VhcmNoU291cmNlU2VydmljZSgpLFxyXG4gICAgICAgIHByb3ZpZGVEZWZhdWx0SUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKSxcclxuICAgICAgICBwcm92aWRlRGVmYXVsdENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKClcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19