/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatSliderModule, MatBadgeModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoListModule, IgoCollapsibleModule, IgoImageModule } from '@igo2/common';
import { LayerService } from './shared/layer.service';
import { StyleService } from './shared/style.service';
import { LayerListService } from './layer-list/layer-list.service';
import { LayerItemComponent } from './layer-item/layer-item.component';
import { LayerLegendComponent } from './layer-legend/layer-legend.component';
import { LayerListComponent } from './layer-list/layer-list.component';
import { LayerListBindingDirective } from './layer-list/layer-list-binding.directive';
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
            providers: [LayerService, StyleService, LayerListService]
        };
    };
    IgoLayerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MatInputModule,
                        MatFormFieldModule,
                        CommonModule,
                        FormsModule,
                        MatIconModule,
                        MatButtonModule,
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
                        LayerListBindingDirective
                    ],
                    declarations: [
                        LayerItemComponent,
                        LayerLegendComponent,
                        LayerListComponent,
                        LayerListBindingDirective
                    ]
                },] }
    ];
    return IgoLayerModule;
}());
export { IgoLayerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQ0wsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixjQUFjLEVBQ2YsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV0RjtJQUFBO0lBcUNBLENBQUM7Ozs7SUFOUSxzQkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztTQUMxRCxDQUFDO0lBQ0osQ0FBQzs7Z0JBcENGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQix5QkFBeUI7cUJBQzFCO29CQUNELFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQix5QkFBeUI7cUJBQzFCO2lCQUNGOztJQVFELHFCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FQWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXRTbGlkZXJNb2R1bGUsXHJcbiAgTWF0QmFkZ2VNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0xpc3RNb2R1bGUsXHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvSW1hZ2VNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9sYXllci1saXN0L2xheWVyLWxpc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVySXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1sZWdlbmQvbGF5ZXItbGVnZW5kLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2xheWVyLWxpc3QvbGF5ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRTbGlkZXJNb2R1bGUsXHJcbiAgICBNYXRCYWRnZU1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvTGlzdE1vZHVsZSxcclxuICAgIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gICAgSWdvSW1hZ2VNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIExheWVySXRlbUNvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBMYXllckl0ZW1Db21wb25lbnQsXHJcbiAgICBMYXllckxlZ2VuZENvbXBvbmVudCxcclxuICAgIExheWVyTGlzdENvbXBvbmVudCxcclxuICAgIExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29MYXllck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvTGF5ZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW0xheWVyU2VydmljZSwgU3R5bGVTZXJ2aWNlLCBMYXllckxpc3RTZXJ2aWNlXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19