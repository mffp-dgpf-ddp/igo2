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
    return IgoSearchModule;
}());
export { IgoSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gvc2VhcmNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXhHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRWhGO0lBQUE7SUF5QkEsQ0FBQzs7OztJQVZRLHVCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QsMEJBQTBCLEVBQUU7Z0JBQzVCLDJDQUEyQyxFQUFFO2dCQUM3Qyw4Q0FBOEMsRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOztnQkF4QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsdUJBQXVCO3dCQUN2QixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3FCQUN2QjtvQkFDRCxZQUFZLEVBQUUsRUFBRTtpQkFDakI7O0lBWUQsc0JBQUM7Q0FBQSxBQXpCRCxJQXlCQztTQVhZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgcHJvdmlkZVNlYXJjaFNvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZWFyY2gtc291cmNlLXNlcnZpY2UucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRJQ2hlcmNoZVNlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvaWNoZXJjaGUucHJvdmlkZXJzJztcclxuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlciB9IGZyb20gJy4vc2hhcmVkL3NvdXJjZXMvY29vcmRpbmF0ZXMucHJvdmlkZXJzJztcclxuXHJcbmltcG9ydCB7IElnb1NlYXJjaEJhck1vZHVsZSB9IGZyb20gJy4vc2VhcmNoLWJhci9zZWFyY2gtYmFyLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gtc2VsZWN0b3Ivc2VhcmNoLXNlbGVjdG9yLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFJlc3VsdHNNb2R1bGUgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIElnb1NlYXJjaEJhck1vZHVsZSxcclxuICAgIElnb1NlYXJjaFNlbGVjdG9yTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoUmVzdWx0c01vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSWdvU2VhcmNoQmFyTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29TZWFyY2hNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb1NlYXJjaE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgcHJvdmlkZVNlYXJjaFNvdXJjZVNlcnZpY2UoKSxcclxuICAgICAgICBwcm92aWRlRGVmYXVsdElDaGVyY2hlU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKCksXHJcbiAgICAgICAgcHJvdmlkZURlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlcigpXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==