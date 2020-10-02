import { AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService, MessageService, LanguageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { IgoMap } from '@igo2/geo';
import { ShareMapService } from '../shared/share-map.service';
export declare class ShareMapComponent implements AfterViewInit, OnInit, OnDestroy {
    private config;
    private languageService;
    private messageService;
    private auth;
    private shareMapService;
    private formBuilder;
    private cdRef;
    form: FormGroup;
    private mapState$$;
    map: IgoMap;
    url: string;
    hasApi: boolean;
    userId: any;
    publicShareOption: {
        layerlistControls: {
            querystring: string;
        };
    };
    constructor(config: ConfigService, languageService: LanguageService, messageService: MessageService, auth: AuthService, shareMapService: ShareMapService, formBuilder: FormBuilder, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    resetUrl(values?: any): void;
    copyTextToClipboard(textArea: any): void;
    private buildForm;
}
