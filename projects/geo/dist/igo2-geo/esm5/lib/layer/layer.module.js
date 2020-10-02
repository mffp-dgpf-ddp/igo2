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
var IgoLayerModule = /** @class */ (function () {
    function IgoLayerModule() {
    }
    /**
     * @return {?}
     */
    IgoLayerModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoLayerModule,
            providers: [LayerService, StyleService, LayerListToolService]
        };
    };
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
    return IgoLayerModule;
}());
export { IgoLayerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZCxlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxjQUFjLEVBQ2YsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUUzRjtJQUFBO0lBcURBLENBQUM7Ozs7SUFOUSxzQkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztTQUM5RCxDQUFDO0lBQ0osQ0FBQzs7Z0JBcERGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLG9CQUFvQjt3QkFDcEIsY0FBYzt3QkFDZCxjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4Qix5QkFBeUI7d0JBQ3pCLCtCQUErQjt3QkFDL0IsMkJBQTJCO3FCQUM1QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3dCQUN6QiwrQkFBK0I7d0JBQy9CLDJCQUEyQjtxQkFDNUI7aUJBQ0Y7O0lBUUQscUJBQUM7Q0FBQSxBQXJERCxJQXFEQztTQVBZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFNsaWRlck1vZHVsZSxcclxuICBNYXRCYWRnZU1vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgTWF0RGl2aWRlck1vZHVsZSxcclxuICBNYXRNZW51TW9kdWxlLFxyXG4gIE1hdENoZWNrYm94TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29MaXN0TW9kdWxlLFxyXG4gIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gIElnb0ltYWdlTW9kdWxlLFxyXG4gIElnb1BhbmVsTW9kdWxlXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zdHlsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0VG9vbFNlcnZpY2UgfSBmcm9tICcuL2xheWVyLWxpc3QtdG9vbC9sYXllci1saXN0LXRvb2wuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVySXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1sZWdlbmQvbGF5ZXItbGVnZW5kLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGlzdFRvb2xDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxpc3QtdG9vbC9sYXllci1saXN0LXRvb2wuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vbGF5ZXItbGlzdC9sYXllci1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTGF5ZXJMZWdlbmRMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vbGF5ZXItbGVnZW5kLWxpc3QvbGF5ZXItbGVnZW5kLWxpc3QtYmluZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUcmFja0ZlYXR1cmVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3RyYWNrLWZlYXR1cmUtYnV0dG9uL3RyYWNrLWZlYXR1cmUtYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGVnZW5kTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItbGVnZW5kLWxpc3QvbGF5ZXItbGVnZW5kLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMZWdlbmRJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1sZWdlbmQtaXRlbS9sYXllci1sZWdlbmQtaXRlbS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFNsaWRlck1vZHVsZSxcclxuICAgIE1hdEJhZGdlTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb0ltYWdlTW9kdWxlLFxyXG4gICAgSWdvUGFuZWxNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIExheWVySXRlbUNvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kSXRlbUNvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0VG9vbENvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kTGlzdENvbXBvbmVudCxcclxuICAgIExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBMYXllckxlZ2VuZExpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgVHJhY2tGZWF0dXJlQnV0dG9uQ29tcG9uZW50XHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIExheWVySXRlbUNvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kSXRlbUNvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0VG9vbENvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kTGlzdENvbXBvbmVudCxcclxuICAgIExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmUsXHJcbiAgICBMYXllckxlZ2VuZExpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgVHJhY2tGZWF0dXJlQnV0dG9uQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvTGF5ZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0xheWVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtMYXllclNlcnZpY2UsIFN0eWxlU2VydmljZSwgTGF5ZXJMaXN0VG9vbFNlcnZpY2VdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=