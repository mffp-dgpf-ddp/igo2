import { TableActionColor } from './table-action-color.enum';
export interface TableColumn {
    name: string;
    title: string;
    sortable?: boolean;
    filterable?: boolean;
    displayed?: boolean;
    html?: boolean;
}
export declare type RowClassFunc = (row: any) => {
    [key: string]: string;
};
export declare type CellClassFunc = (row: any, column: TableColumn) => {
    [key: string]: string;
};
export declare type ClickAction = (item: any) => void;
export interface TableAction {
    icon: string;
    color?: TableActionColor;
    click: ClickAction;
}
export interface TableModel {
    columns: TableColumn[];
    actions?: TableAction[];
    selectionCheckbox?: boolean;
    rowClassFunc?: RowClassFunc;
    cellClassFunc?: CellClassFunc;
}
