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
    return IgoLayerModule;
}());
export { IgoLayerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNmLGNBQWMsRUFDZCxlQUFlLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBRXBHO0lBQUE7SUF3Q0EsQ0FBQzs7OztJQU5RLHNCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixDQUFDO1NBQzFELENBQUM7SUFDSixDQUFDOztnQkF2Q0YsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLG9CQUFvQjt3QkFDcEIsY0FBYztxQkFDZjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIseUJBQXlCO3dCQUN6QiwyQkFBMkI7cUJBQzVCO29CQUNELFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQix5QkFBeUI7d0JBQ3pCLDJCQUEyQjtxQkFDNUI7aUJBQ0Y7O0lBUUQscUJBQUM7Q0FBQSxBQXhDRCxJQXdDQztTQVBZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFNsaWRlck1vZHVsZSxcclxuICBNYXRCYWRnZU1vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0xpc3RNb2R1bGUsXHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvSW1hZ2VNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9sYXllci1saXN0L2xheWVyLWxpc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IExheWVySXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGVnZW5kQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci1sZWdlbmQvbGF5ZXItbGVnZW5kLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExheWVyTGlzdEJpbmRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2xheWVyLWxpc3QvbGF5ZXItbGlzdC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRyYWNrRmVhdHVyZUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vdHJhY2stZmVhdHVyZS1idXR0b24vdHJhY2stZmVhdHVyZS1idXR0b24uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFNsaWRlck1vZHVsZSxcclxuICAgIE1hdEJhZGdlTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgICBJZ29JbWFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTGF5ZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMZWdlbmRDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RDb21wb25lbnQsXHJcbiAgICBMYXllckxpc3RCaW5kaW5nRGlyZWN0aXZlLFxyXG4gICAgVHJhY2tGZWF0dXJlQnV0dG9uQ29tcG9uZW50XHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIExheWVySXRlbUNvbXBvbmVudCxcclxuICAgIExheWVyTGVnZW5kQ29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgTGF5ZXJMaXN0QmluZGluZ0RpcmVjdGl2ZSxcclxuICAgIFRyYWNrRmVhdHVyZUJ1dHRvbkNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0xheWVyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29MYXllck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbTGF5ZXJTZXJ2aWNlLCBTdHlsZVNlcnZpY2UsIExheWVyTGlzdFNlcnZpY2VdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=