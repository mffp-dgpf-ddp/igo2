import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '@igo2/core';
import { TokenService } from './token.service';
export declare class AuthInterceptor implements HttpInterceptor {
    private config;
    private tokenService;
    private trustHosts;
    constructor(config: ConfigService, tokenService: TokenService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
