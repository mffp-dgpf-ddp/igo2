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
import { MapOfflineDirective } from './shared/mapOffline.directive';
var IgoMapModule = /** @class */ (function () {
    function IgoMapModule() {
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
                        MapOfflineDirective
                    ],
                    declarations: [
                        MapBrowserComponent,
                        ZoomButtonComponent,
                        GeolocateButtonComponent,
                        RotationButtonComponent,
                        BaseLayersSwitcherComponent,
                        MiniBaseMapComponent,
                        MapOfflineDirective
                    ]
                },] }
    ];
    return IgoMapModule;
}());
export { IgoMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvbWFwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVwRTtJQUFBO0lBNEIyQixDQUFDOztnQkE1QjNCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLHVCQUF1Qjt3QkFDdkIsMkJBQTJCO3dCQUMzQixvQkFBb0I7d0JBQ3BCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLHVCQUF1Qjt3QkFDdkIsMkJBQTJCO3dCQUMzQixvQkFBb0I7d0JBQ3BCLG1CQUFtQjtxQkFDcEI7aUJBQ0Y7O0lBQzBCLG1CQUFDO0NBQUEsQUE1QjVCLElBNEI0QjtTQUFmLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvQ29uZmlybURpYWxvZ01vZHVsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBab29tQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi96b29tLWJ1dHRvbi96b29tLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHZW9sb2NhdGVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2dlb2xvY2F0ZS1idXR0b24vZ2VvbG9jYXRlLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSb3RhdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vcm90YXRpb24tYnV0dG9uL3JvdGF0aW9uLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCYXNlTGF5ZXJzU3dpdGNoZXJDb21wb25lbnQgfSBmcm9tICcuL2Jhc2VsYXllcnMtc3dpdGNoZXIvYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNaW5pQmFzZU1hcENvbXBvbmVudCB9IGZyb20gJy4vYmFzZWxheWVycy1zd2l0Y2hlci9taW5pLWJhc2VtYXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwT2ZmbGluZURpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL21hcE9mZmxpbmUuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29Db25maXJtRGlhbG9nTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBab29tQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgR2VvbG9jYXRlQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgUm90YXRpb25CdXR0b25Db21wb25lbnQsXHJcbiAgICBCYXNlTGF5ZXJzU3dpdGNoZXJDb21wb25lbnQsXHJcbiAgICBNaW5pQmFzZU1hcENvbXBvbmVudCxcclxuICAgIE1hcE9mZmxpbmVEaXJlY3RpdmVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIFpvb21CdXR0b25Db21wb25lbnQsXHJcbiAgICBHZW9sb2NhdGVCdXR0b25Db21wb25lbnQsXHJcbiAgICBSb3RhdGlvbkJ1dHRvbkNvbXBvbmVudCxcclxuICAgIEJhc2VMYXllcnNTd2l0Y2hlckNvbXBvbmVudCxcclxuICAgIE1pbmlCYXNlTWFwQ29tcG9uZW50LFxyXG4gICAgTWFwT2ZmbGluZURpcmVjdGl2ZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb01hcE1vZHVsZSB7fVxyXG4iXX0=