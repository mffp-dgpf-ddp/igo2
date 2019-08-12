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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQ0wsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixjQUFjLEVBQ2YsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQWdDdEYsTUFBTSxPQUFPLGNBQWM7Ozs7SUFDekIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztTQUMxRCxDQUFDO0lBQ0osQ0FBQzs7O1lBcENGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxhQUFhO29CQUNiLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixjQUFjO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQix5QkFBeUI7aUJBQzFCO2dCQUNELFlBQVksRUFBRTtvQkFDWixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQix5QkFBeUI7aUJBQzFCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFNsaWRlck1vZHVsZSxcclxuICBNYXRCYWRnZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSWdvTGlzdE1vZHVsZSxcclxuICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICBJZ29JbWFnZU1vZHVsZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc3R5bGUuc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVyTGlzdFNlcnZpY2UgfSBmcm9tICcuL2xheWVyLWxpc3QvbGF5ZXItbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1pdGVtL2xheWVyLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLWxlZ2VuZC9sYXllci1sZWdlbmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1saXN0L2xheWVyLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vbGF5ZXItbGlzdC9sYXllci1saXN0LWJpbmRpbmcuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFNsaWRlck1vZHVsZSxcclxuICAgIE1hdEJhZGdlTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgICBJZ29JbWFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTGF5ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RCaW5kaW5nRGlyZWN0aXZlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIExheWVySXRlbUNvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0xheWVyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29MYXllck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbTGF5ZXJTZXJ2aWNlLCBTdHlsZVNlcnZpY2UsIExheWVyTGlzdFNlcnZpY2VdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=