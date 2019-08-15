/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';
import { IgoCollapsibleModule, IgoListModule } from '@igo2/common';
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
                        MatTooltipModule,
                        MatIconModule,
                        MatListModule,
                        MatButtonModule,
                        IgoCollapsibleModule,
                        IgoListModule,
                        IgoLanguageModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGFBQWEsRUFDYixlQUFlLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixhQUFhLEVBQ2QsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7O0FBS3ZGO0lBQUE7SUFzQnFDLENBQUM7O2dCQXRCckMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asc0JBQXNCO3dCQUN0Qiw4QkFBOEI7cUJBQy9CO29CQUNELFlBQVksRUFBRTt3QkFDWixzQkFBc0I7d0JBQ3RCLDBCQUEwQjt3QkFDMUIsOEJBQThCO3FCQUMvQjtpQkFDRjs7SUFDb0MsNkJBQUM7Q0FBQSxBQXRCdEMsSUFzQnNDO1NBQXpCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgSWdvTGlzdE1vZHVsZVxyXG59IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NZXRhZGF0YU1vZHVsZSB9IGZyb20gJy4vLi4vLi4vbWV0YWRhdGEvbWV0YWRhdGEubW9kdWxlJztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0QWRkQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy1hZGQtYnV0dG9uLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICAgIElnb0xpc3RNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb01ldGFkYXRhTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCxcclxuICAgIFNlYXJjaFJlc3VsdEFkZEJ1dHRvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50LFxyXG4gICAgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQsXHJcbiAgICBTZWFyY2hSZXN1bHRBZGRCdXR0b25Db21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29TZWFyY2hSZXN1bHRzTW9kdWxlIHt9XHJcbiJdfQ==