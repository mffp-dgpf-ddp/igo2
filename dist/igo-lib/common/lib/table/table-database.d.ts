import { BehaviorSubject } from 'rxjs';
export declare class TableDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<any[]>;
    readonly data: any[];
    constructor(data?: any);
    set(data: any): void;
    add(item: any): void;
    remove(item: any): void;
}
