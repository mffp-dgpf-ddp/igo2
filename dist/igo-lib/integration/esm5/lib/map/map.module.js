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
var IgoAppMapModule = /** @class */ (function () {
    function IgoAppMapModule() {
    }
    /**
     * @return {?}
     */
    IgoAppMapModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoAppMapModule,
            providers: []
        };
    };
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
    return IgoAppMapModule;
}());
export { IgoAppMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL21hcC9tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUVSLHNCQUFzQixFQUN2QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2hCLE1BQU0sV0FBVyxDQUFDO0FBRW5CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVqRTtJQUFBO0lBc0JBLENBQUM7Ozs7SUFOUSx1QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7Z0JBckJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsZ0JBQWdCO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUM7b0JBQ3BELGVBQWUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixDQUFDO29CQUM1RCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDbEM7O0lBUUQsc0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQVBZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIE5nTW9kdWxlLFxyXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXHJcbiAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSWdvTGF5ZXJNb2R1bGUsXHJcbiAgSWdvTWV0YWRhdGFNb2R1bGUsXHJcbiAgSWdvRG93bmxvYWRNb2R1bGUsXHJcbiAgSWdvRmlsdGVyTW9kdWxlXHJcbn0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IElnb0NvbnRleHRNb2R1bGUgfSBmcm9tICdAaWdvMi9jb250ZXh0JztcclxuXHJcbmltcG9ydCB7IE1hcERldGFpbHNUb29sQ29tcG9uZW50IH0gZnJvbSAnLi9tYXAtZGV0YWlscy10b29sL21hcC1kZXRhaWxzLXRvb2wuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwVG9vbENvbXBvbmVudCB9IGZyb20gJy4vbWFwLXRvb2wvbWFwLXRvb2wuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvTGF5ZXJNb2R1bGUsXHJcbiAgICBJZ29NZXRhZGF0YU1vZHVsZSxcclxuICAgIElnb0Rvd25sb2FkTW9kdWxlLFxyXG4gICAgSWdvRmlsdGVyTW9kdWxlLFxyXG4gICAgSWdvQ29udGV4dE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTWFwVG9vbENvbXBvbmVudCwgTWFwRGV0YWlsc1Rvb2xDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtNYXBUb29sQ29tcG9uZW50LCBNYXBEZXRhaWxzVG9vbENvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTWFwVG9vbENvbXBvbmVudCwgTWFwRGV0YWlsc1Rvb2xDb21wb25lbnRdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQXBwTWFwTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29BcHBNYXBNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW11cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==