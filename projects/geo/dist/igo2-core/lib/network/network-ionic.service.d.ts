import { OnDestroy, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { MessageService } from '../message/shared/message.service';
import { ConnectionState } from './network.interfaces';
export declare class NetworkIonicService implements OnDestroy {
    private messageService;
    private injector;
    private network;
    private platform;
    private stateChangeEventEmitter;
    private onlineSubscription;
    private offlineSubscription;
    private state;
    private previousState;
    constructor(messageService: MessageService, injector: Injector, network: Network, platform: Platform);
    private checkNetworkState;
    private checkNetworkStateMobile;
    private emitEvent;
    ngOnDestroy(): void;
    currentState(reportState?: boolean): Observable<ConnectionState>;
}
