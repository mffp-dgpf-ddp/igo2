import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterableDataSource } from '../shared/time-filter.interface';
import { TimeFilterService } from '../shared/time-filter.service';
export declare class TimeFilterItemComponent {
    private timeFilterService;
    layer: Layer;
    private _layer;
    readonly datasource: TimeFilterableDataSource;
    constructor(timeFilterService: TimeFilterService);
    handleYearChange(year: string | [string, string]): void;
    handleDateChange(date: Date | [Date, Date]): void;
}
