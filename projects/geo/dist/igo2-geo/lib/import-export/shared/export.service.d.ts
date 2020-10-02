import { ConfigService } from '@igo2/core';
import { Observable, Observer } from 'rxjs';
import OlFeature from 'ol/Feature';
import { ExportFormat } from './export.type';
export declare class ExportService {
    private config;
    static ogreFormats: {
        GML: string;
        GPX: string;
        KML: string;
        Shapefile: string;
        CSVcomma: string;
        CSVsemicolon: string;
    };
    static noOgreFallbacks: string[];
    private ogreUrl;
    private aggregateInComment;
    constructor(config: ConfigService);
    export(olFeatures: OlFeature[], format: ExportFormat, title: string, projectionIn?: string, projectionOut?: string): Observable<void>;
    private generateFeature;
    private generateAggratedFeature;
    private exportAsync;
    protected exportToFile(olFeatures: OlFeature[], observer: Observer<void>, format: ExportFormat, title: string, projectionIn: string, projectionOut: string): void;
    private exportWithOgre;
    private nothingToExport;
}
