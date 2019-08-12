/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { ProtectedDirective } from './shared/protected.directive';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthInternComponent } from './auth-form/auth-intern.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthGoogleComponent } from './auth-form/auth-google.component';
import { AuthFacebookComponent } from './auth-form/auth-facebook.component';
export class IgoAuthModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoAuthModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }
            ]
        };
    }
}
IgoAuthModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatButtonModule,
                    IgoLanguageModule
                ],
                declarations: [
                    AuthFormComponent,
                    AuthGoogleComponent,
                    AuthInternComponent,
                    AuthFacebookComponent,
                    ProtectedDirective
                ],
                exports: [AuthFormComponent, ProtectedDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9hdXRoLyIsInNvdXJjZXMiOlsibGliL2F1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZUFBZSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFvQjVFLE1BQU0sT0FBTyxhQUFhOzs7O0lBQ3hCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsZUFBZTtvQkFDekIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUE5QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsaUJBQWlCO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osaUJBQWlCO29CQUNqQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDO2FBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBQcm90ZWN0ZWREaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlZC9wcm90ZWN0ZWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnLi9zaGFyZWQvYXV0aC5pbnRlcmNlcHRvcic7XHJcblxyXG5pbXBvcnQgeyBBdXRoSW50ZXJuQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoLWZvcm0vYXV0aC1pbnRlcm4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXV0aEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2F1dGgtZm9ybS9hdXRoLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXV0aEdvb2dsZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0aC1mb3JtL2F1dGgtZ29vZ2xlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF1dGhGYWNlYm9va0NvbXBvbmVudCB9IGZyb20gJy4vYXV0aC1mb3JtL2F1dGgtZmFjZWJvb2suY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXV0aEZvcm1Db21wb25lbnQsXHJcbiAgICBBdXRoR29vZ2xlQ29tcG9uZW50LFxyXG4gICAgQXV0aEludGVybkNvbXBvbmVudCxcclxuICAgIEF1dGhGYWNlYm9va0NvbXBvbmVudCxcclxuICAgIFByb3RlY3RlZERpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW0F1dGhGb3JtQ29tcG9uZW50LCBQcm90ZWN0ZWREaXJlY3RpdmVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29BdXRoTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29BdXRoTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcclxuICAgICAgICAgIHVzZUNsYXNzOiBBdXRoSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19