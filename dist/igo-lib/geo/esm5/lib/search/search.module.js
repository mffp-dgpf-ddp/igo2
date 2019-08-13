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
var IgoSearchModule = /** @class */ (function () {
    function IgoSearchModule() {
    }
    /**
     * @return {?}
     */
    IgoSearchModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoSearchModule,
            providers: [
                provideSearchSourceService(),
                provideDefaultIChercheSearchResultFormatter(),
                provideDefaultCoordinatesSearchResultFormatter()
            ]
        };
    };
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
    return IgoSearchModule;
}());
export { IgoSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXhHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRW5GO0lBQUE7SUEyQkEsQ0FBQzs7OztJQVZRLHVCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQTBCLEVBQUU7Z0JBQzVCLDJDQUEyQyxFQUFFO2dCQUM3Qyw4Q0FBOEMsRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOztnQkExQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsdUJBQXVCO3dCQUN2QixzQkFBc0I7d0JBQ3RCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjt3QkFDbEIsdUJBQXVCO3dCQUN2QixzQkFBc0I7d0JBQ3RCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsWUFBWSxFQUFFLEVBQUU7aUJBQ2pCOztJQVlELHNCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0FYWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IHByb3ZpZGVTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VhcmNoLXNvdXJjZS1zZXJ2aWNlLnByb3ZpZGVycyc7XHJcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0SUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIgfSBmcm9tICcuL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnByb3ZpZGVycyc7XHJcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIgfSBmcm9tICcuL3NoYXJlZC9zb3VyY2VzL2Nvb3JkaW5hdGVzLnByb3ZpZGVycyc7XHJcblxyXG5pbXBvcnQgeyBJZ29TZWFyY2hCYXJNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZSB9IGZyb20gJy4vc2VhcmNoLXNlbGVjdG9yL3NlYXJjaC1zZWxlY3Rvci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TZWFyY2hTZXR0aW5nc01vZHVsZSB9IGZyb20gJy4vc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hCYXJNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFJlc3VsdHNNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZXR0aW5nc01vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSWdvU2VhcmNoQmFyTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2V0dGluZ3NNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb1NlYXJjaE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvU2VhcmNoTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBwcm92aWRlU2VhcmNoU291cmNlU2VydmljZSgpLFxyXG4gICAgICAgIHByb3ZpZGVEZWZhdWx0SUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKSxcclxuICAgICAgICBwcm92aWRlRGVmYXVsdENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKClcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19