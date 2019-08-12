import { OnDestroy, AfterViewInit, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../message';
export interface ConnectionState {
    connection: boolean;
}
export declare class NetworkService implements OnDestroy, AfterViewInit {
    private messageService;
    private injector;
    private stateChangeEventEmitter;
    private onlineSubscription;
    private offlineSubscription;
    private state;
    constructor(messageService: MessageService, injector: Injector);
    private checkNetworkState;
    private emitEvent;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    currentState(reportState?: boolean): Observable<ConnectionState>;
}
