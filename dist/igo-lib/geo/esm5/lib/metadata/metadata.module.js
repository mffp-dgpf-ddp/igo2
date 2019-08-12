/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { MetadataButtonComponent } from './metadata-button/metadata-button.component';
var IgoMetadataModule = /** @class */ (function () {
    function IgoMetadataModule() {
    }
    /**
     * @return {?}
     */
    IgoMetadataModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoMetadataModule,
            providers: []
        };
    };
    IgoMetadataModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatTooltipModule,
                        IgoLanguageModule
                    ],
                    exports: [MetadataButtonComponent],
                    declarations: [MetadataButtonComponent]
                },] }
    ];
    return IgoMetadataModule;
}());
export { IgoMetadataModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21ldGFkYXRhL21ldGFkYXRhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNqQixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RjtJQUFBO0lBa0JBLENBQUM7Ozs7SUFOUSx5QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOztnQkFqQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lCQUN4Qzs7SUFRRCx3QkFBQztDQUFBLEFBbEJELElBa0JDO1NBUFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VG9vbHRpcE1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBNZXRhZGF0YUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vbWV0YWRhdGEtYnV0dG9uL21ldGFkYXRhLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbTWV0YWRhdGFCdXR0b25Db21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW01ldGFkYXRhQnV0dG9uQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvTWV0YWRhdGFNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb01ldGFkYXRhTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=