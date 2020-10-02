import * as jsPDF from 'jspdf';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MessageService, ActivityService, LanguageService } from '@igo2/core';
import { PrintService } from './print.service';
export declare class PrintIonicService extends PrintService {
    private platform;
    private fileOpener;
    private file;
    date: Date;
    day: string;
    month: any;
    hour: string;
    minute: string;
    year: string;
    constructor(messageService: MessageService, activityService: ActivityService, languageService: LanguageService, platform: Platform, fileOpener: FileOpener, file: File);
    protected saveDoc(doc: jsPDF): void;
    private setDate;
}
