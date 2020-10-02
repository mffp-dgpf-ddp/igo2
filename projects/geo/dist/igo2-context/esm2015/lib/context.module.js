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
export class IgoContextModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextModule,
            providers: []
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNwRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWE1RCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBQzNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7O1lBakJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxDQUFDO2dCQUM1RCxZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFO29CQUNQLDRCQUE0QjtvQkFDNUIsdUJBQXVCO29CQUN2Qix5QkFBeUI7b0JBQ3pCLGlCQUFpQjtvQkFDakIsZ0JBQWdCO2lCQUNqQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0NvbnRleHRJbXBvcnRFeHBvcnRNb2R1bGUgfSBmcm9tICcuL2NvbnRleHQtaW1wb3J0LWV4cG9ydC9jb250ZXh0LWltcG9ydC1leHBvcnQubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvQ29udGV4dE1hbmFnZXJNb2R1bGUgfSBmcm9tICcuL2NvbnRleHQtbWFuYWdlci9jb250ZXh0LW1hbmFnZXIubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvQ29udGV4dE1hcEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4vY29udGV4dC1tYXAtYnV0dG9uL2NvbnRleHQtbWFwLWJ1dHRvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TaGFyZU1hcE1vZHVsZSB9IGZyb20gJy4vc2hhcmUtbWFwL3NoYXJlLW1hcC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29TaWRlbmF2TW9kdWxlIH0gZnJvbSAnLi9zaWRlbmF2L3NpZGVuYXYubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW01hdElucHV0TW9kdWxlLCBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdE1lbnVNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW10sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSWdvQ29udGV4dEltcG9ydEV4cG9ydE1vZHVsZSxcclxuICAgIElnb0NvbnRleHRNYW5hZ2VyTW9kdWxlLFxyXG4gICAgSWdvQ29udGV4dE1hcEJ1dHRvbk1vZHVsZSxcclxuICAgIElnb1NoYXJlTWFwTW9kdWxlLFxyXG4gICAgSWdvU2lkZW5hdk1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0NvbnRleHRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0NvbnRleHRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW11cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==