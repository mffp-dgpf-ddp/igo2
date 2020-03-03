/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideSearchSourceService } from './shared/search-source-service.providers';
import { provideDefaultIChercheSearchResultFormatter } from './shared/sources/icherche.providers';
import { provideDefaultCoordinatesSearchResultFormatter } from './shared/sources/coordinates.providers';
import { provideILayerSearchResultFormatter } from './shared/sources/ilayer.providers';
import { IgoSearchBarModule } from './search-bar/search-bar.module';
import { IgoSearchSelectorModule } from './search-selector/search-selector.module';
import { IgoSearchResultsModule } from './search-results/search-results.module';
import { IgoSearchSettingsModule } from './search-settings/search-settings.module';
import { SearchPointerSummaryDirective } from './shared/search-pointer-summary.directive';
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
                provideDefaultCoordinatesSearchResultFormatter(),
                provideILayerSearchResultFormatter()
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
                    IgoSearchSettingsModule,
                    SearchPointerSummaryDirective
                ],
                declarations: [SearchPointerSummaryDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBbUIxRixNQUFNLE9BQU8sZUFBZTs7OztJQUMxQixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQTBCLEVBQUU7Z0JBQzVCLDJDQUEyQyxFQUFFO2dCQUM3Qyw4Q0FBOEMsRUFBRTtnQkFDaEQsa0NBQWtDLEVBQUU7YUFDckM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBNUJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixrQkFBa0I7b0JBQ2xCLHVCQUF1QjtvQkFDdkIsc0JBQXNCO29CQUN0Qix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxrQkFBa0I7b0JBQ2xCLHVCQUF1QjtvQkFDdkIsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLDZCQUE2QjtpQkFDOUI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsNkJBQTZCLENBQUM7YUFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgcHJvdmlkZVNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZWFyY2gtc291cmNlLXNlcnZpY2UucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvaWNoZXJjaGUucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvY29vcmRpbmF0ZXMucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZUlMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvaWxheWVyLnByb3ZpZGVycyc7XHJcblxyXG5pbXBvcnQgeyBJZ29TZWFyY2hCYXJNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZSB9IGZyb20gJy4vc2VhcmNoLXNlbGVjdG9yL3NlYXJjaC1zZWxlY3Rvci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TZWFyY2hTZXR0aW5nc01vZHVsZSB9IGZyb20gJy4vc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTZWFyY2hQb2ludGVyU3VtbWFyeURpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL3NlYXJjaC1wb2ludGVyLXN1bW1hcnkuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoQmFyTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2V0dGluZ3NNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIElnb1NlYXJjaEJhck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSxcclxuICAgIElnb1NlYXJjaFNldHRpbmdzTW9kdWxlLFxyXG4gICAgU2VhcmNoUG9pbnRlclN1bW1hcnlEaXJlY3RpdmVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1NlYXJjaFBvaW50ZXJTdW1tYXJ5RGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvU2VhcmNoTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29TZWFyY2hNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHByb3ZpZGVTZWFyY2hTb3VyY2VTZXJ2aWNlKCksXHJcbiAgICAgICAgcHJvdmlkZURlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcigpLFxyXG4gICAgICAgIHByb3ZpZGVEZWZhdWx0Q29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKSxcclxuICAgICAgICBwcm92aWRlSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKClcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19