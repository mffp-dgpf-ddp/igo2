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
var IgoAuthModule = /** @class */ (function () {
    function IgoAuthModule() {
    }
    /**
     * @return {?}
     */
    IgoAuthModule.forRoot = /**
     * @return {?}
     */
    function () {
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
    };
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
    return IgoAuthModule;
}());
export { IgoAuthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9hdXRoLyIsInNvdXJjZXMiOlsibGliL2F1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZUFBZSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFNUU7SUFBQTtJQStCQSxDQUFDOzs7O0lBWlEscUJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsZUFBZTtvQkFDekIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztnQkE5QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixrQkFBa0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDO2lCQUNqRDs7SUFjRCxvQkFBQztDQUFBLEFBL0JELElBK0JDO1NBYlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUHJvdGVjdGVkRGlyZWN0aXZlIH0gZnJvbSAnLi9zaGFyZWQvcHJvdGVjdGVkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJy4vc2hhcmVkL2F1dGguaW50ZXJjZXB0b3InO1xyXG5cclxuaW1wb3J0IHsgQXV0aEludGVybkNvbXBvbmVudCB9IGZyb20gJy4vYXV0aC1mb3JtL2F1dGgtaW50ZXJuLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF1dGhGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoLWZvcm0vYXV0aC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF1dGhHb29nbGVDb21wb25lbnQgfSBmcm9tICcuL2F1dGgtZm9ybS9hdXRoLWdvb2dsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdXRoRmFjZWJvb2tDb21wb25lbnQgfSBmcm9tICcuL2F1dGgtZm9ybS9hdXRoLWZhY2Vib29rLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEF1dGhGb3JtQ29tcG9uZW50LFxyXG4gICAgQXV0aEdvb2dsZUNvbXBvbmVudCxcclxuICAgIEF1dGhJbnRlcm5Db21wb25lbnQsXHJcbiAgICBBdXRoRmFjZWJvb2tDb21wb25lbnQsXHJcbiAgICBQcm90ZWN0ZWREaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtBdXRoRm9ybUNvbXBvbmVudCwgUHJvdGVjdGVkRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQXV0aE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQXV0aE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXHJcbiAgICAgICAgICB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==