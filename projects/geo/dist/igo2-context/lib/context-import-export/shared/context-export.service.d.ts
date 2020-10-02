import { DetailedContext } from '../../context-manager/shared/context.interface';
import { Observable } from 'rxjs';
export declare class ContextExportService {
    export(res: DetailedContext): Observable<void>;
    protected exportAsync(res: DetailedContext): Observable<void>;
    protected nothingToExport(res: DetailedContext): boolean;
}
