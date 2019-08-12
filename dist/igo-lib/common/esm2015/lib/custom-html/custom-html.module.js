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
export class IgoCustomHtmlModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoCustomHtmlModule
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWh0bWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2N1c3RvbS1odG1sL2N1c3RvbS1odG1sLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxlQUFlLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBY3RELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFDOUIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFtQjtTQUM5QixDQUFDO0lBQ0osQ0FBQzs7O1lBakJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxlQUFlO29CQUNmLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLENBQUM7Z0JBQ2hELFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDO2FBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IEN1c3RvbUh0bWxDb21wb25lbnQgfSBmcm9tICcuL2N1c3RvbS1odG1sLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNhbml0aXplSHRtbFBpcGUgfSBmcm9tICcuL2N1c3RvbS1odG1sLnBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtTYW5pdGl6ZUh0bWxQaXBlLCBDdXN0b21IdG1sQ29tcG9uZW50XSxcclxuICBkZWNsYXJhdGlvbnM6IFtTYW5pdGl6ZUh0bWxQaXBlLCBDdXN0b21IdG1sQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQ3VzdG9tSHRtbE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQ3VzdG9tSHRtbE1vZHVsZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19