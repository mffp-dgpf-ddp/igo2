import { AfterViewInit } from '@angular/core';
import { NetworkService, MessageService, LanguageService } from '@igo2/core';
import { IgoMap } from './map';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
export declare class MapOfflineDirective implements AfterViewInit {
    private networkService;
    private messageService;
    private languageService;
    private component;
    private offlineButtonStatus;
    private networkState;
    private offlineButtonState;
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, networkService: NetworkService, messageService: MessageService, languageService: LanguageService);
    ngAfterViewInit(): void;
    private changeLayer;
}
