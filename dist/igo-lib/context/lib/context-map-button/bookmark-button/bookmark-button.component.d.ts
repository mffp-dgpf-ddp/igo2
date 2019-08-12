import { MatDialog } from '@angular/material';
import { MessageService, LanguageService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { ContextService } from '../../context-manager/shared/context.service';
export declare class BookmarkButtonComponent {
    private dialog;
    private contextService;
    private languageService;
    private messageService;
    map: IgoMap;
    private _map;
    color: string;
    private _color;
    constructor(dialog: MatDialog, contextService: ContextService, languageService: LanguageService, messageService: MessageService);
    createContext(): void;
}
