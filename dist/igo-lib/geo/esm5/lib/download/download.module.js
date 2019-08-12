/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { DownloadButtonComponent } from './download-button/download-button.component';
var IgoDownloadModule = /** @class */ (function () {
    function IgoDownloadModule() {
    }
    /**
     * @return {?}
     */
    IgoDownloadModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoDownloadModule
        };
    };
    IgoDownloadModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatTooltipModule,
                        IgoLanguageModule
                    ],
                    exports: [DownloadButtonComponent],
                    declarations: [DownloadButtonComponent]
                },] }
    ];
    return IgoDownloadModule;
}());
export { IgoDownloadModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2Rvd25sb2FkL2Rvd25sb2FkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNqQixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RjtJQUFBO0lBaUJBLENBQUM7Ozs7SUFMUSx5QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtTQUM1QixDQUFDO0lBQ0osQ0FBQzs7Z0JBaEJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixpQkFBaUI7cUJBQ2xCO29CQUNELE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUNsQyxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDeEM7O0lBT0Qsd0JBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQU5ZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRG93bmxvYWRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2Rvd25sb2FkLWJ1dHRvbi9kb3dubG9hZC1idXR0b24uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW0Rvd25sb2FkQnV0dG9uQ29tcG9uZW50XSxcclxuICBkZWNsYXJhdGlvbnM6IFtEb3dubG9hZEJ1dHRvbkNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0Rvd25sb2FkTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29Eb3dubG9hZE1vZHVsZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19