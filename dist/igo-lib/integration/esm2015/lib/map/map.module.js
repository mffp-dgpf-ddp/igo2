/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoLayerModule, IgoMetadataModule, IgoDownloadModule, IgoFilterModule } from '@igo2/geo';
import { IgoContextModule } from '@igo2/context';
import { MapDetailsToolComponent } from './map-details-tool/map-details-tool.component';
import { MapToolComponent } from './map-tool/map-tool.component';
export class IgoAppMapModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAppMapModule,
            providers: []
        };
    }
}
IgoAppMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatTabsModule,
                    IgoLanguageModule,
                    IgoLayerModule,
                    IgoMetadataModule,
                    IgoDownloadModule,
                    IgoFilterModule,
                    IgoContextModule
                ],
                declarations: [MapToolComponent, MapDetailsToolComponent],
                exports: [MapToolComponent, MapDetailsToolComponent],
                entryComponents: [MapToolComponent, MapDetailsToolComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL21hcC9tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUVSLHNCQUFzQixFQUN2QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2hCLE1BQU0sV0FBVyxDQUFDO0FBRW5CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWlCakUsTUFBTSxPQUFPLGVBQWU7Ozs7SUFDMUIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7O1lBckJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZ0JBQWdCO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQztnQkFDekQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUM7Z0JBQ3BELGVBQWUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixDQUFDO2dCQUM1RCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgTmdNb2R1bGUsXHJcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcclxuICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29MYXllck1vZHVsZSxcclxuICBJZ29NZXRhZGF0YU1vZHVsZSxcclxuICBJZ29Eb3dubG9hZE1vZHVsZSxcclxuICBJZ29GaWx0ZXJNb2R1bGVcclxufSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgSWdvQ29udGV4dE1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvbnRleHQnO1xyXG5cclxuaW1wb3J0IHsgTWFwRGV0YWlsc1Rvb2xDb21wb25lbnQgfSBmcm9tICcuL21hcC1kZXRhaWxzLXRvb2wvbWFwLWRldGFpbHMtdG9vbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXBUb29sQ29tcG9uZW50IH0gZnJvbSAnLi9tYXAtdG9vbC9tYXAtdG9vbC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29MYXllck1vZHVsZSxcclxuICAgIElnb01ldGFkYXRhTW9kdWxlLFxyXG4gICAgSWdvRG93bmxvYWRNb2R1bGUsXHJcbiAgICBJZ29GaWx0ZXJNb2R1bGUsXHJcbiAgICBJZ29Db250ZXh0TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtNYXBUb29sQ29tcG9uZW50LCBNYXBEZXRhaWxzVG9vbENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW01hcFRvb2xDb21wb25lbnQsIE1hcERldGFpbHNUb29sQ29tcG9uZW50XSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtNYXBUb29sQ29tcG9uZW50LCBNYXBEZXRhaWxzVG9vbENvbXBvbmVudF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29BcHBNYXBNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0FwcE1hcE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19