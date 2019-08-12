/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatIconModule, MatListModule } from '@angular/material';
import { IgoCollapsibleModule, IgoListModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsItemComponent } from './search-results-item.component';
/**
 * @ignore
 */
export class IgoSearchResultsModule {
}
IgoSearchResultsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatTooltipModule,
                    MatIconModule,
                    MatListModule,
                    IgoCollapsibleModule,
                    IgoListModule,
                    IgoLanguageModule
                ],
                exports: [
                    SearchResultsComponent
                ],
                declarations: [
                    SearchResultsComponent,
                    SearchResultsItemComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGFBQWEsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNkLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7OztBQXVCN0UsTUFBTSxPQUFPLHNCQUFzQjs7O1lBbEJsQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsMEJBQTBCO2lCQUMzQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gIElnb0xpc3RNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gICAgSWdvTGlzdE1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50XHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFNlYXJjaFJlc3VsdHNDb21wb25lbnQsXHJcbiAgICBTZWFyY2hSZXN1bHRzSXRlbUNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb1NlYXJjaFJlc3VsdHNNb2R1bGUge31cclxuIl19