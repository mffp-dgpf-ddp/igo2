import { Injector } from '@angular/core';
export declare class TokenService {
    private injector;
    private options;
    constructor(injector: Injector);
    set(token: any): void;
    remove(): void;
    get(): string;
    decode(): any;
    isExpired(): boolean;
    private readonly tokenKey;
}
