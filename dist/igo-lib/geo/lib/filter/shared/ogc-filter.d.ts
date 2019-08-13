import { IgoOgcFilterObject, OgcInterfaceFilterOptions, OgcFilterableDataSourceOptions, OgcFiltersOptions } from './ogc-filter.interface';
export declare class OgcFilterWriter {
    private filterSequence;
    operators: {
        PropertyIsEqualTo: {
            spatial: boolean;
            fieldRestrict: any[];
        };
        PropertyIsNotEqualTo: {
            spatial: boolean;
            fieldRestrict: any[];
        };
        PropertyIsLike: {
            spatial: boolean;
            fieldRestrict: string[];
        };
        PropertyIsGreaterThan: {
            spatial: boolean;
            fieldRestrict: string[];
        };
        PropertyIsGreaterThanOrEqualTo: {
            spatial: boolean;
            fieldRestrict: string[];
        };
        PropertyIsLessThan: {
            spatial: boolean;
            fieldRestrict: string[];
        };
        PropertyIsLessThanOrEqualTo: {
            spatial: boolean;
            fieldRestrict: string[];
        };
        PropertyIsBetween: {
            spatial: boolean;
            fieldRestrict: string[];
        };
        During: {
            spatial: boolean;
            fieldRestrict: any[];
        };
        PropertyIsNull: {
            spatial: boolean;
            fieldRestrict: any[];
        };
        Intersects: {
            spatial: boolean;
            fieldRestrict: any[];
        };
        Within: {
            spatial: boolean;
            fieldRestrict: any[];
        };
        Contains: {
            spatial: boolean;
            fieldRestrict: any[];
        };
    };
    defineOgcFiltersDefaultOptions(ogcFiltersOptions: OgcFiltersOptions, fieldNameGeometry: string, srcType?: string): OgcFiltersOptions;
    buildFilter(filters?: IgoOgcFilterObject, extent?: [number, number, number, number], proj?: any, fieldNameGeometry?: string): string;
    private bundleFilter;
    private createFilter;
    defineInterfaceFilterSequence(filterObject: any, geometryName: any, logical?: string, level?: number): OgcInterfaceFilterOptions[];
    addInterfaceFilter(igoOgcFilterObject?: any, geometryName?: any, level?: number, parentLogical?: string): OgcInterfaceFilterOptions;
    checkIgoFiltersProperties(filterObject: any, fieldNameGeometry: any, active?: boolean): any;
    private addFilterProperties;
    rebuiltIgoOgcFilterObjectFromSequence(sequence: OgcInterfaceFilterOptions[]): IgoOgcFilterObject;
    handleOgcFiltersAppliedValue(options: OgcFilterableDataSourceOptions, fieldNameGeometry: string): string;
    formatProcessedOgcFilter(processedFilter: string, layersOrTypenames: string): string;
}
