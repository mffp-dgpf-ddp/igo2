import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { Observable } from 'rxjs';
import { Feature } from '../../feature/shared/feature.interfaces';
export declare class ImportService {
    private http;
    private config;
    static allowedMimeTypes: string[];
    static allowedZipMimeTypes: string[];
    static allowedExtensions: string[];
    private ogreUrl;
    constructor(http: HttpClient, config: ConfigService);
    import(file: File, projectionIn?: string, projectionOut?: string): Observable<Feature[]>;
    private getFileImporter;
    private importAsync;
    private importFile;
    private importFileWithOgre;
    private parseFeaturesFromFile;
    private parseFeaturesFromGeoJSON;
}
