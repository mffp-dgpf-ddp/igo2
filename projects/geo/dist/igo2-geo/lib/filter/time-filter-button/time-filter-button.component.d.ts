import { OnInit } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { IgoMap } from '../../map';
import { TimeFilterableDataSourceOptions } from '../shared/time-filter.interface';
export declare class TimeFilterButtonComponent implements OnInit {
    options: TimeFilterableDataSourceOptions;
    layer: Layer;
    map: IgoMap;
    color: string;
    header: boolean;
    timeFilterCollapse: boolean;
    constructor();
    ngOnInit(): void;
    toggleTimeFilter(): void;
}
