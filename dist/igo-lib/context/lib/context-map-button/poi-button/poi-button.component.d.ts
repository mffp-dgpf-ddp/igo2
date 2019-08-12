import { OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageService, LanguageService } from '@igo2/core';
import { ConfirmDialogService } from '@igo2/common';
import { AuthService } from '@igo2/auth';
import { IgoMap } from '@igo2/geo';
import { PoiService } from './shared/poi.service';
import { Poi } from './shared/poi.interface';
export declare class PoiButtonComponent implements OnInit, OnDestroy {
    private dialog;
    private authService;
    private poiService;
    private messageService;
    private languageService;
    private confirmDialogService;
    map: IgoMap;
    private _map;
    color: string;
    private _color;
    pois: Poi[];
    private authenticate$$;
    constructor(dialog: MatDialog, authService: AuthService, poiService: PoiService, messageService: MessageService, languageService: LanguageService, confirmDialogService: ConfirmDialogService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    deletePoi(poi: Poi): void;
    private getPois;
    createPoi(): void;
    zoomOnPoi(id: any): void;
}
