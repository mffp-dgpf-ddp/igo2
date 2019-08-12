import { ElementRef, OnChanges, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TableModel } from './table-model.interface';
import { TableDatabase } from './table-database';
import { TableDataSource } from './table-datasource';
export declare class TableComponent implements OnChanges, OnInit, AfterViewInit {
    database: TableDatabase;
    private _database;
    model: TableModel;
    private _model;
    hasFilterInput: boolean;
    private _hasFIlterInput;
    displayedColumns: any;
    dataSource: TableDataSource | null;
    selection: SelectionModel<any>;
    select: EventEmitter<{
        added: any[];
        removed: any[];
        source: SelectionModel<any>;
    }>;
    filter: ElementRef;
    sort: MatSort;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(change: any): void;
    getActionColor(colorId: number): string;
    getValue(row: any, key: any): any;
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean;
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void;
    handleClickAction(event: any, action: any, row: any): void;
}
