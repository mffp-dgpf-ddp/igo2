import { ConfigService } from '@igo2/core';
import { Observable } from 'rxjs';
import OlFeature from 'ol/Feature';
import { ExportFormat } from './export.type';
export declare class ExportService {
    private config;
    static ogreFormats: {
        GML: string;
        GPX: string;
        KML: string;
        Shapefile: string;
    };
    static noOgreFallbacks: string[];
    private ogreUrl;
    constructor(config: ConfigService);
    export(olFeatures: OlFeature[], format: ExportFormat, title: string, projectionIn?: string, projectionOut?: string): Observable<void>;
    private exportAsync;
    private exportToFile;
    private exportWithOgre;
    private nothingToExport;
}
