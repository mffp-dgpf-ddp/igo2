import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { TableDatabase, TableModel } from './index';
export declare class TableDataSource extends DataSource<any> {
    private _database;
    private _model;
    private _sort;
    filter: string;
    private _filterChange;
    constructor(_database: TableDatabase, _model: TableModel, _sort: MatSort);
    connect(): Observable<any[]>;
    disconnect(): void;
    getFilteredData(data: any): any[];
    getSortedData(data: any): any[];
}
