import { ConfigService } from '@igo2/core';
import { DetailedContext } from '../../context-manager/shared/context.interface';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ContextExportService } from './context-export.service';
export declare class ContextExportIonicService extends ContextExportService {
    private config;
    private platform;
    private fileOpener;
    private file;
    constructor(config: ConfigService, platform: Platform, fileOpener: FileOpener, file: File);
    protected exportAsync(res: DetailedContext): Observable<void>;
}
