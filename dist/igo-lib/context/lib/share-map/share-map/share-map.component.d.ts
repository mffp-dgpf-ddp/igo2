import { AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService, MessageService, LanguageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { IgoMap, LayerListService } from '@igo2/geo';
import { ShareMapService } from '../shared/share-map.service';
export declare class ShareMapComponent implements AfterViewInit, OnInit {
    private config;
    private languageService;
    private messageService;
    private auth;
    private shareMapService;
    private formBuilder;
    private layerListService;
    form: FormGroup;
    map: IgoMap;
    private _map;
    hasShareMapButton: boolean;
    private _hasShareMapButton;
    hasCopyLinkButton: boolean;
    private _hasCopyLinkButton;
    url: string;
    hasApi: boolean;
    userId: any;
    publicShareOption: {
        layerlistControls: {
            querystring: string;
        };
    };
    constructor(config: ConfigService, languageService: LanguageService, messageService: MessageService, auth: AuthService, shareMapService: ShareMapService, formBuilder: FormBuilder, layerListService: LayerListService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    hasLayerListControls(): boolean;
    resetUrl(values?: any): void;
    copyTextToClipboard(textArea: any): void;
    private buildForm;
}
