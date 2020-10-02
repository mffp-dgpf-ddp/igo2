import { ConfigService } from '@igo2/core';
import { Observer } from 'rxjs';
import OlFeature from 'ol/Feature';
import { ExportFormat } from './export.type';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ExportService } from './export.service';
export declare class ExportIonicService extends ExportService {
    private platform;
    private fileOpener;
    private file;
    constructor(config: ConfigService, platform: Platform, fileOpener: FileOpener, file: File);
    protected exportToFile(olFeatures: OlFeature[], observer: Observer<void>, format: ExportFormat, title: string, projectionIn: string, projectionOut: string): void;
}
