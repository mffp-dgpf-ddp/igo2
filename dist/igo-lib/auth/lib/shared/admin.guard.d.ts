import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ConfigService } from '@igo2/core';
import { AuthService } from './auth.service';
export declare class AdminGuard implements CanActivate {
    private authService;
    private config;
    private router;
    constructor(authService: AuthService, config: ConfigService, router: Router);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
