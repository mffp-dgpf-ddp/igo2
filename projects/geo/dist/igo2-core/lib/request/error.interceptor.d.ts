import { Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from '../message/shared/message.service';
export declare class ErrorInterceptor implements HttpInterceptor {
    private messageService;
    private injector;
    constructor(messageService: MessageService, injector: Injector);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private handleError;
    private handleCaughtError;
    private handleUncaughtError;
}
