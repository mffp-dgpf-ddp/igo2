/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatSliderModule, MatBadgeModule, MatSelectModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoListModule, IgoCollapsibleModule, IgoImageModule } from '@igo2/common';
import { LayerService } from './shared/layer.service';
import { StyleService } from './shared/style.service';
import { LayerListService } from './layer-list/layer-list.service';
import { LayerItemComponent } from './layer-item/layer-item.component';
import { LayerLegendComponent } from './layer-legend/layer-legend.component';
import { LayerListComponent } from './layer-list/layer-list.component';
import { LayerListBindingDirective } from './layer-list/layer-list-binding.directive';
import { TrackFeatureButtonComponent } from './track-feature-button/track-feature-button.component';
export class IgoLayerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoLayerModule,
            providers: [LayerService, StyleService, LayerListService]
        };
    }
}
IgoLayerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatInputModule,
                    MatFormFieldModule,
                    CommonModule,
                    FormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSelectModule,
                    MatTooltipModule,
                    MatListModule,
                    MatSliderModule,
                    MatBadgeModule,
                    IgoLanguageModule,
                    IgoListModule,
                    IgoCollapsibleModule,
                    IgoImageModule
                ],
                exports: [
                    LayerItemComponent,
                    LayerLegendComponent,
                    LayerListComponent,
                    LayerListBindingDirective,
                    TrackFeatureButtonComponent
                ],
                declarations: [
                    LayerItemComponent,
                    LayerLegendComponent,
                    LayerListComponent,
                    LayerListBindingDirective,
                    TrackFeatureButtonComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZCxlQUFlLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBbUNwRyxNQUFNLE9BQU8sY0FBYzs7OztJQUN6QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixDQUFDO1NBQzFELENBQUM7SUFDSixDQUFDOzs7WUF2Q0YsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEIsWUFBWTtvQkFDWixXQUFXO29CQUNYLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLG9CQUFvQjtvQkFDcEIsY0FBYztpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIseUJBQXlCO29CQUN6QiwyQkFBMkI7aUJBQzVCO2dCQUNELFlBQVksRUFBRTtvQkFDWixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQix5QkFBeUI7b0JBQ3pCLDJCQUEyQjtpQkFDNUI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gIE1hdEJhZGdlTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSWdvTGlzdE1vZHVsZSxcclxuICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICBJZ29JbWFnZU1vZHVsZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc3R5bGUuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyTGlzdFNlcnZpY2UgfSBmcm9tICcuL2xheWVyLWxpc3QvbGF5ZXItbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1pdGVtL2xheWVyLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxlZ2VuZC9sYXllci1sZWdlbmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1saXN0L2xheWVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vbGF5ZXItbGlzdC9sYXllci1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVHJhY2tGZWF0dXJlQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi90cmFjay1mZWF0dXJlLWJ1dHRvbi90cmFjay1mZWF0dXJlLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gICAgTWF0QmFkZ2VNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb0ltYWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBMYXllckl0ZW1Db21wb25lbnQsXHJcbiAgICBMYXllckxlZ2VuZENvbXBvbmVudCxcclxuICAgIExheWVyTGlzdENvbXBvbmVudCxcclxuICAgIExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBUcmFja0ZlYXR1cmVCdXR0b25Db21wb25lbnRcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTGF5ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgVHJhY2tGZWF0dXJlQnV0dG9uQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvTGF5ZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0xheWVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtMYXllclNlcnZpY2UsIFN0eWxlU2VydmljZSwgTGF5ZXJMaXN0U2VydmljZV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==