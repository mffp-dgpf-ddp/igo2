/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatSliderModule, MatBadgeModule, MatSelectModule, MatSlideToggleModule, MatDividerModule, MatMenuModule, MatCheckboxModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoListModule, IgoCollapsibleModule, IgoImageModule, IgoPanelModule } from '@igo2/common';
import { LayerService } from './shared/layer.service';
import { StyleService } from './shared/style.service';
import { LayerListToolService } from './layer-list-tool/layer-list-tool.service';
import { LayerItemComponent } from './layer-item/layer-item.component';
import { LayerLegendComponent } from './layer-legend/layer-legend.component';
import { LayerListComponent } from './layer-list/layer-list.component';
import { LayerListToolComponent } from './layer-list-tool/layer-list-tool.component';
import { LayerListBindingDirective } from './layer-list/layer-list-binding.directive';
import { LayerLegendListBindingDirective } from './layer-legend-list/layer-legend-list-binding.directive';
import { TrackFeatureButtonComponent } from './track-feature-button/track-feature-button.component';
import { LayerLegendListComponent } from './layer-legend-list/layer-legend-list.component';
import { LayerLegendItemComponent } from './layer-legend-item/layer-legend-item.component';
export class IgoLayerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoLayerModule,
            providers: [LayerService, StyleService, LayerListToolService]
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
                    MatDividerModule,
                    MatMenuModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSlideToggleModule,
                    MatSelectModule,
                    MatTooltipModule,
                    MatListModule,
                    MatSliderModule,
                    MatBadgeModule,
                    MatCheckboxModule,
                    IgoLanguageModule,
                    IgoListModule,
                    IgoCollapsibleModule,
                    IgoImageModule,
                    IgoPanelModule
                ],
                exports: [
                    LayerItemComponent,
                    LayerLegendItemComponent,
                    LayerLegendComponent,
                    LayerListComponent,
                    LayerListToolComponent,
                    LayerLegendListComponent,
                    LayerListBindingDirective,
                    LayerLegendListBindingDirective,
                    TrackFeatureButtonComponent
                ],
                declarations: [
                    LayerItemComponent,
                    LayerLegendItemComponent,
                    LayerLegendComponent,
                    LayerListComponent,
                    LayerListToolComponent,
                    LayerLegendListComponent,
                    LayerListBindingDirective,
                    LayerLegendListBindingDirective,
                    TrackFeatureButtonComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZCxlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxjQUFjLEVBQ2YsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQWdEM0YsTUFBTSxPQUFPLGNBQWM7Ozs7SUFDekIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztTQUM5RCxDQUFDO0lBQ0osQ0FBQzs7O1lBcERGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixlQUFlO29CQUNmLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLG9CQUFvQjtvQkFDcEIsY0FBYztvQkFDZCxjQUFjO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxrQkFBa0I7b0JBQ2xCLHdCQUF3QjtvQkFDeEIsb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLHNCQUFzQjtvQkFDdEIsd0JBQXdCO29CQUN4Qix5QkFBeUI7b0JBQ3pCLCtCQUErQjtvQkFDL0IsMkJBQTJCO2lCQUM1QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIseUJBQXlCO29CQUN6QiwrQkFBK0I7b0JBQy9CLDJCQUEyQjtpQkFDNUI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gIE1hdEJhZGdlTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gIE1hdE1lbnVNb2R1bGUsXHJcbiAgTWF0Q2hlY2tib3hNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0xpc3RNb2R1bGUsXHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvSW1hZ2VNb2R1bGUsXHJcbiAgSWdvUGFuZWxNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RUb29sU2VydmljZSB9IGZyb20gJy4vbGF5ZXItbGlzdC10b29sL2xheWVyLWxpc3QtdG9vbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1pdGVtL2xheWVyLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxlZ2VuZC9sYXllci1sZWdlbmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1saXN0L2xheWVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0VG9vbENvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItbGlzdC10b29sL2xheWVyLWxpc3QtdG9vbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXllci1saXN0L2xheWVyLWxpc3QtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMYXllckxlZ2VuZExpc3RCaW5kaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXllci1sZWdlbmQtbGlzdC9sYXllci1sZWdlbmQtbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRyYWNrRmVhdHVyZUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vdHJhY2stZmVhdHVyZS1idXR0b24vdHJhY2stZmVhdHVyZS1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMZWdlbmRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1sZWdlbmQtbGlzdC9sYXllci1sZWdlbmQtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMYXllckxlZ2VuZEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxlZ2VuZC1pdGVtL2xheWVyLWxlZ2VuZC1pdGVtLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxyXG4gICAgTWF0QmFkZ2VNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvTGlzdE1vZHVsZSxcclxuICAgIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gICAgSWdvSW1hZ2VNb2R1bGUsXHJcbiAgICBJZ29QYW5lbE1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTGF5ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRJdGVtQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RUb29sQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRMaXN0Q29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIExheWVyTGVnZW5kTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBUcmFja0ZlYXR1cmVCdXR0b25Db21wb25lbnRcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTGF5ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRJdGVtQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RUb29sQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRMaXN0Q29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIExheWVyTGVnZW5kTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBUcmFja0ZlYXR1cmVCdXR0b25Db21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29MYXllck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvTGF5ZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW0xheWVyU2VydmljZSwgU3R5bGVTZXJ2aWNlLCBMYXllckxpc3RUb29sU2VydmljZV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==