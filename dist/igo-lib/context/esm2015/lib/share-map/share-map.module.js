/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { ShareMapComponent } from './share-map/share-map.component';
import { ShareMapBindingDirective } from './share-map/share-map-binding.directive';
export class IgoShareMapModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoShareMapModule
        };
    }
}
IgoShareMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatTooltipModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatButtonModule,
                    IgoLanguageModule
                ],
                exports: [ShareMapComponent, ShareMapBindingDirective],
                declarations: [ShareMapComponent, ShareMapBindingDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmUtbWFwL3NoYXJlLW1hcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxlQUFlLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBaUJuRixNQUFNLE9BQU8saUJBQWlCOzs7O0lBQzVCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7U0FDNUIsQ0FBQztJQUNKLENBQUM7OztZQXBCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDO2dCQUN0RCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQzthQUM1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNoYXJlTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9zaGFyZS1tYXAvc2hhcmUtbWFwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNoYXJlTWFwQmluZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmUtbWFwL3NoYXJlLW1hcC1iaW5kaW5nLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1NoYXJlTWFwQ29tcG9uZW50LCBTaGFyZU1hcEJpbmRpbmdEaXJlY3RpdmVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1NoYXJlTWFwQ29tcG9uZW50LCBTaGFyZU1hcEJpbmRpbmdEaXJlY3RpdmVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29TaGFyZU1hcE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvU2hhcmVNYXBNb2R1bGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==