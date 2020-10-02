/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatSelectModule, MatOptionModule, MatTooltipModule, MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoConfirmDialogModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoAuthModule } from '@igo2/auth';
import { BookmarkButtonComponent } from './bookmark-button/bookmark-button.component';
import { BookmarkDialogComponent } from './bookmark-button/bookmark-dialog.component';
import { PoiButtonComponent } from './poi-button/poi-button.component';
import { PoiDialogComponent } from './poi-button/poi-dialog.component';
import { PoiService } from './poi-button/shared/poi.service';
import { UserDialogComponent } from './user-button/user-dialog.component';
import { UserButtonComponent } from './user-button/user-button.component';
var IgoContextMapButtonModule = /** @class */ (function () {
    function IgoContextMapButtonModule() {
    }
    /**
     * @return {?}
     */
    IgoContextMapButtonModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoContextMapButtonModule
        };
    };
    IgoContextMapButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        IgoLanguageModule,
                        IgoConfirmDialogModule,
                        IgoStopPropagationModule,
                        IgoAuthModule,
                        FormsModule,
                        MatIconModule,
                        MatButtonModule,
                        MatSelectModule,
                        MatOptionModule,
                        MatTooltipModule,
                        MatFormFieldModule,
                        MatDialogModule,
                        MatInputModule
                    ],
                    exports: [BookmarkButtonComponent, PoiButtonComponent, UserButtonComponent, BookmarkDialogComponent],
                    declarations: [
                        BookmarkButtonComponent,
                        BookmarkDialogComponent,
                        PoiButtonComponent,
                        PoiDialogComponent,
                        UserButtonComponent,
                        UserDialogComponent
                    ],
                    entryComponents: [
                        BookmarkDialogComponent,
                        PoiDialogComponent,
                        UserDialogComponent
                    ],
                    providers: [PoiService]
                },] }
    ];
    return IgoContextMapButtonModule;
}());
export { IgoContextMapButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tYXAtYnV0dG9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYXAtYnV0dG9uL2NvbnRleHQtbWFwLWJ1dHRvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixjQUFjLEVBQ2YsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTFFO0lBQUE7SUF1Q0EsQ0FBQzs7OztJQUxRLGlDQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUseUJBQXlCO1NBQ3BDLENBQUM7SUFDSixDQUFDOztnQkF0Q0YsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7d0JBQ3hCLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLGNBQWM7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLENBQUM7b0JBQ3BHLFlBQVksRUFBRTt3QkFDWix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3FCQUNwQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2YsdUJBQXVCO3dCQUN2QixrQkFBa0I7d0JBQ2xCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUN4Qjs7SUFPRCxnQ0FBQztDQUFBLEFBdkNELElBdUNDO1NBTlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvQ29uZmlybURpYWxvZ01vZHVsZSwgSWdvU3RvcFByb3BhZ2F0aW9uTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgSWdvQXV0aE1vZHVsZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5cclxuaW1wb3J0IHsgQm9va21hcmtCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9va21hcmtEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUG9pQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9wb2ktYnV0dG9uL3BvaS1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUG9pRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9wb2ktYnV0dG9uL3BvaS1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUG9pU2VydmljZSB9IGZyb20gJy4vcG9pLWJ1dHRvbi9zaGFyZWQvcG9pLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWJ1dHRvbi91c2VyLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBVc2VyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWJ1dHRvbi91c2VyLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb0NvbmZpcm1EaWFsb2dNb2R1bGUsXHJcbiAgICBJZ29TdG9wUHJvcGFnYXRpb25Nb2R1bGUsXHJcbiAgICBJZ29BdXRoTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdERpYWxvZ01vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbQm9va21hcmtCdXR0b25Db21wb25lbnQsIFBvaUJ1dHRvbkNvbXBvbmVudCwgVXNlckJ1dHRvbkNvbXBvbmVudCwgQm9va21hcmtEaWFsb2dDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQm9va21hcmtCdXR0b25Db21wb25lbnQsXHJcbiAgICBCb29rbWFya0RpYWxvZ0NvbXBvbmVudCxcclxuICAgIFBvaUJ1dHRvbkNvbXBvbmVudCxcclxuICAgIFBvaURpYWxvZ0NvbXBvbmVudCxcclxuICAgIFVzZXJCdXR0b25Db21wb25lbnQsXHJcbiAgICBVc2VyRGlhbG9nQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIEJvb2ttYXJrRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgUG9pRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgVXNlckRpYWxvZ0NvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbUG9pU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0NvbnRleHRNYXBCdXR0b25Nb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0NvbnRleHRNYXBCdXR0b25Nb2R1bGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==