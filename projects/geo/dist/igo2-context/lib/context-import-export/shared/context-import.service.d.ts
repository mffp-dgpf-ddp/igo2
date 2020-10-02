import { Observable } from 'rxjs';
import { ConfigService } from '@igo2/core';
import { DetailedContext } from '../../context-manager/shared/context.interface';
export declare class ContextImportService {
    private config;
    static allowedMimeTypes: string[];
    static allowedExtensions: string;
    private clientSideFileSizeMax;
    constructor(config: ConfigService);
    import(file: File): Observable<DetailedContext>;
    private getFileImporter;
    private importAsync;
    private importFile;
    private parseContextFromFile;
}
