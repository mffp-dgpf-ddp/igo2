import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigService, LanguageService } from '@igo2/core';
import { User } from './auth.interface';
import { TokenService } from './token.service';
export declare class AuthService {
    private http;
    private tokenService;
    private config;
    private languageService;
    private router;
    authenticate$: BehaviorSubject<boolean>;
    redirectUrl: string;
    private options;
    private anonymous;
    constructor(http: HttpClient, tokenService: TokenService, config: ConfigService, languageService: LanguageService, router: Router);
    login(username: string, password: string): any;
    loginWithToken(token: string, type: string): any;
    loginAnonymous(): Observable<boolean>;
    logout(): Observable<boolean>;
    isAuthenticated(): boolean;
    getToken(): string;
    decodeToken(): any;
    goToRedirectUrl(): void;
    getUserInfo(): Observable<User>;
    getProfils(): Observable<Object>;
    updateUser(user: User): Observable<User>;
    private encodePassword;
    readonly logged: boolean;
    readonly isAnonymous: boolean;
    readonly authenticated: boolean;
    private loginCall;
}
