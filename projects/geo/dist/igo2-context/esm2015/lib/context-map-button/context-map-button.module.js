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
export class IgoContextMapButtonModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoContextMapButtonModule
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tYXAtYnV0dG9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYXAtYnV0dG9uL2NvbnRleHQtbWFwLWJ1dHRvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixjQUFjLEVBQ2YsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBbUMxRSxNQUFNLE9BQU8seUJBQXlCOzs7O0lBQ3BDLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSx5QkFBeUI7U0FDcEMsQ0FBQztJQUNKLENBQUM7OztZQXRDRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osaUJBQWlCO29CQUNqQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsYUFBYTtvQkFDYixXQUFXO29CQUNYLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsY0FBYztpQkFDZjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQztnQkFDcEcsWUFBWSxFQUFFO29CQUNaLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2QixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO29CQUNuQixtQkFBbUI7aUJBQ3BCO2dCQUNELGVBQWUsRUFBRTtvQkFDZix1QkFBdUI7b0JBQ3ZCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO2lCQUNwQjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdE9wdGlvbk1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXREaWFsb2dNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29Db25maXJtRGlhbG9nTW9kdWxlLCBJZ29TdG9wUHJvcGFnYXRpb25Nb2R1bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29BdXRoTW9kdWxlIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcblxyXG5pbXBvcnQgeyBCb29rbWFya0J1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYm9va21hcmstYnV0dG9uL2Jvb2ttYXJrLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb29rbWFya0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vYm9va21hcmstYnV0dG9uL2Jvb2ttYXJrLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQb2lCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3BvaS1idXR0b24vcG9pLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQb2lEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3BvaS1idXR0b24vcG9pLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQb2lTZXJ2aWNlIH0gZnJvbSAnLi9wb2ktYnV0dG9uL3NoYXJlZC9wb2kuc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3VzZXItYnV0dG9uL3VzZXItZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFVzZXJCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3VzZXItYnV0dG9uL3VzZXItYnV0dG9uLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvQ29uZmlybURpYWxvZ01vZHVsZSxcclxuICAgIElnb1N0b3BQcm9wYWdhdGlvbk1vZHVsZSxcclxuICAgIElnb0F1dGhNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtCb29rbWFya0J1dHRvbkNvbXBvbmVudCwgUG9pQnV0dG9uQ29tcG9uZW50LCBVc2VyQnV0dG9uQ29tcG9uZW50LCBCb29rbWFya0RpYWxvZ0NvbXBvbmVudF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBCb29rbWFya0J1dHRvbkNvbXBvbmVudCxcclxuICAgIEJvb2ttYXJrRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgUG9pQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgUG9pRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgVXNlckJ1dHRvbkNvbXBvbmVudCxcclxuICAgIFVzZXJEaWFsb2dDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgQm9va21hcmtEaWFsb2dDb21wb25lbnQsXHJcbiAgICBQb2lEaWFsb2dDb21wb25lbnQsXHJcbiAgICBVc2VyRGlhbG9nQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtQb2lTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQ29udGV4dE1hcEJ1dHRvbk1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQ29udGV4dE1hcEJ1dHRvbk1vZHVsZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19