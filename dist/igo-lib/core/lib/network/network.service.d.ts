import { OnDestroy, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../message';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
export interface ConnectionState {
    connection: boolean;
}
export declare class NetworkService implements OnDestroy {
    private messageService;
    private injector;
    private network;
    private platform;
    private stateChangeEventEmitter;
    private onlineSubscription;
    private offlineSubscription;
    private connectionType;
    private state;
    constructor(messageService: MessageService, injector: Injector, network: Network, platform: Platform);
    private checkNetworkState;
    initializeService(): void;
    private emitEvent;
    ngOnDestroy(): void;
    currentState(reportState?: boolean): Observable<ConnectionState>;
}
