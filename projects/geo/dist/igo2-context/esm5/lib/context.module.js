/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatMenuModule } from '@angular/material';
import { IgoContextImportExportModule } from './context-import-export/context-import-export.module';
import { IgoContextManagerModule } from './context-manager/context-manager.module';
import { IgoContextMapButtonModule } from './context-map-button/context-map-button.module';
import { IgoShareMapModule } from './share-map/share-map.module';
import { IgoSidenavModule } from './sidenav/sidenav.module';
var IgoContextModule = /** @class */ (function () {
    function IgoContextModule() {
    }
    /**
     * @return {?}
     */
    IgoContextModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoContextModule,
            providers: []
        };
    };
    IgoContextModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatInputModule, MatFormFieldModule, MatMenuModule],
                    declarations: [],
                    exports: [
                        IgoContextImportExportModule,
                        IgoContextManagerModule,
                        IgoContextMapButtonModule,
                        IgoShareMapModule,
                        IgoSidenavModule
                    ]
                },] }
    ];
    return IgoContextModule;
}());
export { IgoContextModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNwRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RDtJQUFBO0lBa0JBLENBQUM7Ozs7SUFOUSx3QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOztnQkFqQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLENBQUM7b0JBQzVELFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsNEJBQTRCO3dCQUM1Qix1QkFBdUI7d0JBQ3ZCLHlCQUF5Qjt3QkFDekIsaUJBQWlCO3dCQUNqQixnQkFBZ0I7cUJBQ2pCO2lCQUNGOztJQVFELHVCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FQWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRNZW51TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvQ29udGV4dEltcG9ydEV4cG9ydE1vZHVsZSB9IGZyb20gJy4vY29udGV4dC1pbXBvcnQtZXhwb3J0L2NvbnRleHQtaW1wb3J0LWV4cG9ydC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29Db250ZXh0TWFuYWdlck1vZHVsZSB9IGZyb20gJy4vY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbWFuYWdlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29Db250ZXh0TWFwQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi9jb250ZXh0LW1hcC1idXR0b24vY29udGV4dC1tYXAtYnV0dG9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NoYXJlTWFwTW9kdWxlIH0gZnJvbSAnLi9zaGFyZS1tYXAvc2hhcmUtbWFwLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NpZGVuYXZNb2R1bGUgfSBmcm9tICcuL3NpZGVuYXYvc2lkZW5hdi5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbTWF0SW5wdXRNb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0TWVudU1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJZ29Db250ZXh0SW1wb3J0RXhwb3J0TW9kdWxlLFxyXG4gICAgSWdvQ29udGV4dE1hbmFnZXJNb2R1bGUsXHJcbiAgICBJZ29Db250ZXh0TWFwQnV0dG9uTW9kdWxlLFxyXG4gICAgSWdvU2hhcmVNYXBNb2R1bGUsXHJcbiAgICBJZ29TaWRlbmF2TW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQ29udGV4dE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQ29udGV4dE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19