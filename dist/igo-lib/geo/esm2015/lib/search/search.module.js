/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideSearchSourceService } from './shared/search-source-service.providers';
import { provideDefaultIChercheSearchResultFormatter } from './shared/sources/icherche.providers';
import { provideDefaultCoordinatesSearchResultFormatter } from './shared/sources/coordinates.providers';
import { provideILayerSearchResultFormatter } from './shared';
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
                    IgoSearchSettingsModule
                ],
                declarations: []
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQWtCbkYsTUFBTSxPQUFPLGVBQWU7Ozs7SUFDMUIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULDBCQUEwQixFQUFFO2dCQUM1QiwyQ0FBMkMsRUFBRTtnQkFDN0MsOENBQThDLEVBQUU7Z0JBQ2hELGtDQUFrQyxFQUFFO2FBQ3JDO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTNCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osa0JBQWtCO29CQUNsQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asa0JBQWtCO29CQUNsQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO2lCQUN4QjtnQkFDRCxZQUFZLEVBQUUsRUFBRTthQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBwcm92aWRlU2VhcmNoU291cmNlU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlYXJjaC1zb3VyY2Utc2VydmljZS5wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIH0gZnJvbSAnLi9zaGFyZWQvc291cmNlcy9pY2hlcmNoZS5wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIH0gZnJvbSAnLi9zaGFyZWQvc291cmNlcy9jb29yZGluYXRlcy5wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBwcm92aWRlSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyIH0gZnJvbSAnLi9zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgSWdvU2VhcmNoQmFyTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtYmFyL3NlYXJjaC1iYXIubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1zZWxlY3Rvci9zZWFyY2gtc2VsZWN0b3IubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMvc2VhcmNoLXJlc3VsdHMubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoU2V0dGluZ3NNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1zZXR0aW5ncy9zZWFyY2gtc2V0dGluZ3MubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoQmFyTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2V0dGluZ3NNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIElnb1NlYXJjaEJhck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSxcclxuICAgIElnb1NlYXJjaFNldHRpbmdzTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29TZWFyY2hNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb1NlYXJjaE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgcHJvdmlkZVNlYXJjaFNvdXJjZVNlcnZpY2UoKSxcclxuICAgICAgICBwcm92aWRlRGVmYXVsdElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKCksXHJcbiAgICAgICAgcHJvdmlkZURlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlcigpLFxyXG4gICAgICAgIHByb3ZpZGVJTGF5ZXJTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=