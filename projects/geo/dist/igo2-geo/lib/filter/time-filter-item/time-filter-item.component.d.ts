import { Layer } from '../../layer/shared/layers/layer';
import { TimeFilterableDataSource } from '../shared/time-filter.interface';
import { TimeFilterService } from '../shared/time-filter.service';
import { BehaviorSubject } from 'rxjs';
export declare class TimeFilterItemComponent {
    private timeFilterService;
    showLegend$: BehaviorSubject<boolean>;
    filtersCollapsed: boolean;
    header: boolean;
    layer: Layer;
    readonly datasource: TimeFilterableDataSource;
    constructor(timeFilterService: TimeFilterService);
    handleYearChange(year: string | [string, string]): void;
    handleDateChange(date: Date | [Date, Date]): void;
    private toggleLegend;
    toggleLegendOnClick(): void;
    setVisible(): void;
    toggleFiltersCollapsed(): void;
}
