import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { DragAndDropDirective } from '@igo2/common';
import { IgoMap } from '../../map/shared/map';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { ImportService } from './import.service';
export declare class DropGeoFileDirective extends DragAndDropDirective implements OnInit, OnDestroy {
    private component;
    private importService;
    private languageService;
    private messageService;
    protected filesDropped: EventEmitter<File[]>;
    protected filesInvalid: EventEmitter<File[]>;
    private filesDropped$$;
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, importService: ImportService, languageService: LanguageService, messageService: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onDragOver(evt: any): void;
    onDragLeave(evt: any): void;
    onDrop(evt: any): void;
    private onFilesDropped;
    private onFileImportSuccess;
    private onFileImportError;
}
