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
                provideDefaultCoordinatesSearchResultFormatter(),
                provideILayerSearchResultFormatter()
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
                        IgoSearchSettingsModule,
                        SearchPointerSummaryDirective
                    ],
                    declarations: [SearchPointerSummaryDirective]
                },] }
    ];
    return IgoSearchModule;
}());
export { IgoSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRTFGO0lBQUE7SUE2QkEsQ0FBQzs7OztJQVhRLHVCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQTBCLEVBQUU7Z0JBQzVCLDJDQUEyQyxFQUFFO2dCQUM3Qyw4Q0FBOEMsRUFBRTtnQkFDaEQsa0NBQWtDLEVBQUU7YUFDckM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBNUJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixrQkFBa0I7d0JBQ2xCLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLDZCQUE2QjtxQkFDOUI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQzlDOztJQWFELHNCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0FaWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IHByb3ZpZGVTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VhcmNoLXNvdXJjZS1zZXJ2aWNlLnByb3ZpZGVycyc7XHJcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0SUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIgfSBmcm9tICcuL3NoYXJlZC9zb3VyY2VzL2ljaGVyY2hlLnByb3ZpZGVycyc7XHJcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIgfSBmcm9tICcuL3NoYXJlZC9zb3VyY2VzL2Nvb3JkaW5hdGVzLnByb3ZpZGVycyc7XHJcbmltcG9ydCB7IHByb3ZpZGVJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXIgfSBmcm9tICcuL3NoYXJlZC9zb3VyY2VzL2lsYXllci5wcm92aWRlcnMnO1xyXG5cclxuaW1wb3J0IHsgSWdvU2VhcmNoQmFyTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtYmFyL3NlYXJjaC1iYXIubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1zZWxlY3Rvci9zZWFyY2gtc2VsZWN0b3IubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMvc2VhcmNoLXJlc3VsdHMubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoU2V0dGluZ3NNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1zZXR0aW5ncy9zZWFyY2gtc2V0dGluZ3MubW9kdWxlJztcclxuaW1wb3J0IHsgU2VhcmNoUG9pbnRlclN1bW1hcnlEaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlZC9zZWFyY2gtcG9pbnRlci1zdW1tYXJ5LmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIElnb1NlYXJjaEJhck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSxcclxuICAgIElnb1NlYXJjaFNldHRpbmdzTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJZ29TZWFyY2hCYXJNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFJlc3VsdHNNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZXR0aW5nc01vZHVsZSxcclxuICAgIFNlYXJjaFBvaW50ZXJTdW1tYXJ5RGlyZWN0aXZlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTZWFyY2hQb2ludGVyU3VtbWFyeURpcmVjdGl2ZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb1NlYXJjaE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvU2VhcmNoTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBwcm92aWRlU2VhcmNoU291cmNlU2VydmljZSgpLFxyXG4gICAgICAgIHByb3ZpZGVEZWZhdWx0SUNoZXJjaGVTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKSxcclxuICAgICAgICBwcm92aWRlRGVmYXVsdENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKCksXHJcbiAgICAgICAgcHJvdmlkZUlMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlcigpXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==