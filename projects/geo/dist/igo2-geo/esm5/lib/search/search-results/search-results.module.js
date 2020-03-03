/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatIconModule, MatListModule, MatButtonModule, MatBadgeModule } from '@angular/material';
import { IgoCollapsibleModule, IgoListModule, IgoMatBadgeIconModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { IgoMetadataModule } from './../../metadata/metadata.module';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsItemComponent } from './search-results-item.component';
import { SearchResultAddButtonComponent } from './search-results-add-button.component';
/**
 * @ignore
 */
var IgoSearchResultsModule = /** @class */ (function () {
    function IgoSearchResultsModule() {
    }
    IgoSearchResultsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatBadgeModule,
                        MatTooltipModule,
                        MatIconModule,
                        MatListModule,
                        MatButtonModule,
                        IgoCollapsibleModule,
                        IgoListModule,
                        IgoStopPropagationModule,
                        IgoLanguageModule,
                        IgoMatBadgeIconModule,
                        IgoMetadataModule,
                    ],
                    exports: [
                        SearchResultsComponent,
                        SearchResultAddButtonComponent
                    ],
                    declarations: [
                        SearchResultsComponent,
                        SearchResultsItemComponent,
                        SearchResultAddButtonComponent
                    ]
                },] }
    ];
    return IgoSearchResultsModule;
}());
export { IgoSearchResultsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGFBQWEsRUFDYixlQUFlLEVBQ2YsY0FBYyxFQUNmLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLHdCQUF3QixFQUN6QixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7QUFLdkY7SUFBQTtJQXlCcUMsQ0FBQzs7Z0JBekJyQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsYUFBYTt3QkFDYix3QkFBd0I7d0JBQ3hCLGlCQUFpQjt3QkFDakIscUJBQXFCO3dCQUNyQixpQkFBaUI7cUJBQ2xCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLDhCQUE4QjtxQkFDL0I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHNCQUFzQjt3QkFDdEIsMEJBQTBCO3dCQUMxQiw4QkFBOEI7cUJBQy9CO2lCQUNGOztJQUNvQyw2QkFBQztDQUFBLEFBekJ0QyxJQXlCc0M7U0FBekIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdEJhZGdlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHtcclxuICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICBJZ29MaXN0TW9kdWxlLFxyXG4gIElnb01hdEJhZGdlSWNvbk1vZHVsZSxcclxuICBJZ29TdG9wUHJvcGFnYXRpb25Nb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWV0YWRhdGFNb2R1bGUgfSBmcm9tICcuLy4uLy4uL21ldGFkYXRhL21ldGFkYXRhLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdHNDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdHNJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdEFkZEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0QmFkZ2VNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29TdG9wUHJvcGFnYXRpb25Nb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb01hdEJhZGdlSWNvbk1vZHVsZSxcclxuICAgIElnb01ldGFkYXRhTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCxcclxuICAgIFNlYXJjaFJlc3VsdEFkZEJ1dHRvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50LFxyXG4gICAgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQsXHJcbiAgICBTZWFyY2hSZXN1bHRBZGRCdXR0b25Db21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlIHt9XHJcbiJdfQ==