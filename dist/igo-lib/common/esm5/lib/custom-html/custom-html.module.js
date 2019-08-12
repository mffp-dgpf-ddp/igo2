/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatTooltipModule, MatInputModule, MatButtonModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { CustomHtmlComponent } from './custom-html.component';
import { SanitizeHtmlPipe } from './custom-html.pipe';
var IgoCustomHtmlModule = /** @class */ (function () {
    function IgoCustomHtmlModule() {
    }
    /**
     * @return {?}
     */
    IgoCustomHtmlModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoCustomHtmlModule
        };
    };
    IgoCustomHtmlModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatTooltipModule,
                        MatInputModule,
                        MatButtonModule,
                        IgoLanguageModule
                    ],
                    exports: [SanitizeHtmlPipe, CustomHtmlComponent],
                    declarations: [SanitizeHtmlPipe, CustomHtmlComponent]
                },] }
    ];
    return IgoCustomHtmlModule;
}());
export { IgoCustomHtmlModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWh0bWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2N1c3RvbS1odG1sL2N1c3RvbS1odG1sLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxlQUFlLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXREO0lBQUE7SUFrQkEsQ0FBQzs7OztJQUxRLDJCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1NBQzlCLENBQUM7SUFDSixDQUFDOztnQkFqQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQztvQkFDaEQsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLENBQUM7aUJBQ3REOztJQU9ELDBCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FOWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ3VzdG9tSHRtbENvbXBvbmVudCB9IGZyb20gJy4vY3VzdG9tLWh0bWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2FuaXRpemVIdG1sUGlwZSB9IGZyb20gJy4vY3VzdG9tLWh0bWwucGlwZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1Nhbml0aXplSHRtbFBpcGUsIEN1c3RvbUh0bWxDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW1Nhbml0aXplSHRtbFBpcGUsIEN1c3RvbUh0bWxDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29DdXN0b21IdG1sTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29DdXN0b21IdG1sTW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=