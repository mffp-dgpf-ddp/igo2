/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFormComponent } from './auth-form/auth-form.component';
/** @type {?} */
var routes = [
    { path: 'login', component: AuthFormComponent },
    { path: 'logout', component: AuthFormComponent }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule],
                    providers: []
                },] }
    ];
    return AuthRoutingModule;
}());
export { AuthRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2F1dGgvIiwic291cmNlcyI6WyJsaWIvYXV0aC1yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQVUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBRTlELE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFO0lBQy9DLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUU7Q0FDakQ7QUFFRDtJQUFBO0lBS2dDLENBQUM7O2dCQUxoQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUUsRUFBRTtpQkFDZDs7SUFDK0Isd0JBQUM7Q0FBQSxBQUxqQyxJQUtpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBBdXRoRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vYXV0aC1mb3JtL2F1dGgtZm9ybS5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgeyBwYXRoOiAnbG9naW4nLCBjb21wb25lbnQ6IEF1dGhGb3JtQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAnbG9nb3V0JywgY29tcG9uZW50OiBBdXRoRm9ybUNvbXBvbmVudCB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aFJvdXRpbmdNb2R1bGUge31cclxuIl19