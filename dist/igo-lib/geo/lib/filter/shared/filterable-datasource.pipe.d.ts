import { PipeTransform } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
export declare class FilterableDataSourcePipe implements PipeTransform {
    transform(value: Layer[], arg: string): Layer[];
    private isTimeFilterable;
    private isOgcFilterable;
}
