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
                        IgoSearchSettingsModule
                    ],
                    declarations: []
                },] }
    ];
    return IgoSearchModule;
}());
export { IgoSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUVuRjtJQUFBO0lBNEJBLENBQUM7Ozs7SUFYUSx1QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULDBCQUEwQixFQUFFO2dCQUM1QiwyQ0FBMkMsRUFBRTtnQkFDN0MsOENBQThDLEVBQUU7Z0JBQ2hELGtDQUFrQyxFQUFFO2FBQ3JDO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQTNCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3dCQUNsQix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3FCQUN4QjtvQkFDRCxZQUFZLEVBQUUsRUFBRTtpQkFDakI7O0lBYUQsc0JBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQVpZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgcHJvdmlkZVNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZWFyY2gtc291cmNlLXNlcnZpY2UucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvaWNoZXJjaGUucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvY29vcmRpbmF0ZXMucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZUlMYXllclNlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IElnb1NlYXJjaEJhck1vZHVsZSB9IGZyb20gJy4vc2VhcmNoLWJhci9zZWFyY2gtYmFyLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtc2VsZWN0b3Ivc2VhcmNoLXNlbGVjdG9yLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFJlc3VsdHNNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFNldHRpbmdzTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtc2V0dGluZ3Mvc2VhcmNoLXNldHRpbmdzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIElnb1NlYXJjaEJhck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoUmVzdWx0c01vZHVsZSxcclxuICAgIElnb1NlYXJjaFNldHRpbmdzTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJZ29TZWFyY2hCYXJNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFJlc3VsdHNNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZXR0aW5nc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvU2VhcmNoTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29TZWFyY2hNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHByb3ZpZGVTZWFyY2hTb3VyY2VTZXJ2aWNlKCksXHJcbiAgICAgICAgcHJvdmlkZURlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlcigpLFxyXG4gICAgICAgIHByb3ZpZGVEZWZhdWx0Q29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIoKSxcclxuICAgICAgICBwcm92aWRlSUxheWVyU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKClcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19