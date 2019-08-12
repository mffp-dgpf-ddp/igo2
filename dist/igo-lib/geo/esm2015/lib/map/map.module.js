/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoConfirmDialogModule } from '@igo2/common';
import { MapBrowserComponent } from './map-browser/map-browser.component';
import { ZoomButtonComponent } from './zoom-button/zoom-button.component';
import { GeolocateButtonComponent } from './geolocate-button/geolocate-button.component';
import { RotationButtonComponent } from './rotation-button/rotation-button.component';
import { BaseLayersSwitcherComponent } from './baselayers-switcher/baselayers-switcher.component';
import { MiniBaseMapComponent } from './baselayers-switcher/mini-basemap.component';
import { MapLayerDirective } from './shared/mapLayer.directive';
export class IgoMapModule {
}
IgoMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoLanguageModule,
                    IgoConfirmDialogModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule
                ],
                exports: [
                    MapBrowserComponent,
                    ZoomButtonComponent,
                    GeolocateButtonComponent,
                    RotationButtonComponent,
                    BaseLayersSwitcherComponent,
                    MiniBaseMapComponent,
                    MapLayerDirective
                ],
                declarations: [
                    MapBrowserComponent,
                    ZoomButtonComponent,
                    GeolocateButtonComponent,
                    RotationButtonComponent,
                    BaseLayersSwitcherComponent,
                    MiniBaseMapComponent,
                    MapLayerDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvbWFwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQThCaEUsTUFBTSxPQUFPLFlBQVk7OztZQTVCeEIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGlCQUFpQjtvQkFDakIsc0JBQXNCO29CQUN0QixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsZ0JBQWdCO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2QiwyQkFBMkI7b0JBQzNCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2QiwyQkFBMkI7b0JBQzNCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO2lCQUNsQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb0NvbmZpcm1EaWFsb2dNb2R1bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4vbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgWm9vbUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vem9vbS1idXR0b24vem9vbS1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2VvbG9jYXRlQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9nZW9sb2NhdGUtYnV0dG9uL2dlb2xvY2F0ZS1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUm90YXRpb25CdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3JvdGF0aW9uLWJ1dHRvbi9yb3RhdGlvbi1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmFzZUxheWVyc1N3aXRjaGVyQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlbGF5ZXJzLXN3aXRjaGVyL2Jhc2VsYXllcnMtc3dpdGNoZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWluaUJhc2VNYXBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2VsYXllcnMtc3dpdGNoZXIvbWluaS1iYXNlbWFwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi9zaGFyZWQvbWFwTGF5ZXIuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29Db25maXJtRGlhbG9nTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBab29tQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgR2VvbG9jYXRlQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgUm90YXRpb25CdXR0b25Db21wb25lbnQsXHJcbiAgICBCYXNlTGF5ZXJzU3dpdGNoZXJDb21wb25lbnQsXHJcbiAgICBNaW5pQmFzZU1hcENvbXBvbmVudCxcclxuICAgIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBab29tQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgR2VvbG9jYXRlQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgUm90YXRpb25CdXR0b25Db21wb25lbnQsXHJcbiAgICBCYXNlTGF5ZXJzU3dpdGNoZXJDb21wb25lbnQsXHJcbiAgICBNaW5pQmFzZU1hcENvbXBvbmVudCxcclxuICAgIE1hcExheWVyRGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvTWFwTW9kdWxlIHt9XHJcbiJdfQ==