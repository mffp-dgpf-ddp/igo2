/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog.service';
var IgoConfirmDialogModule = /** @class */ (function () {
    function IgoConfirmDialogModule() {
    }
    /**
     * @return {?}
     */
    IgoConfirmDialogModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoConfirmDialogModule,
            providers: []
        };
    };
    IgoConfirmDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatButtonModule, MatDialogModule, IgoLanguageModule],
                    declarations: [ConfirmDialogComponent],
                    exports: [ConfirmDialogComponent],
                    providers: [ConfirmDialogService],
                    entryComponents: [ConfirmDialogComponent]
                },] }
    ];
    return IgoConfirmDialogModule;
}());
export { IgoConfirmDialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NvbmZpcm0tZGlhbG9nL2NvbmZpcm0tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEU7SUFBQTtJQWNBLENBQUM7Ozs7SUFOUSw4QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOztnQkFiRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQztvQkFDOUQsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDakMsZUFBZSxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQzFDOztJQVFELDZCQUFDO0NBQUEsQUFkRCxJQWNDO1NBUFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlybURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uZmlybURpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpcm0tZGlhbG9nLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsIElnb0xhbmd1YWdlTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtDb25maXJtRGlhbG9nQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbQ29uZmlybURpYWxvZ0NvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbQ29uZmlybURpYWxvZ1NlcnZpY2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0NvbmZpcm1EaWFsb2dDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29Db25maXJtRGlhbG9nTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29Db25maXJtRGlhbG9nTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=