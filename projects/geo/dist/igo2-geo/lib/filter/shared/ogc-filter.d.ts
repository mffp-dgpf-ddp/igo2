import olProjection from 'ol/proj/Projection';
import { IgoOgcFilterObject, OgcInterfaceFilterOptions, OgcFilterableDataSourceOptions, OgcFiltersOptions } from './ogc-filter.interface';
import { OgcFilterOperatorType } from './ogc-filter.enum';
import { SourceFieldsOptionsParams } from '../../datasource/shared/datasources/datasource.interface';
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
    buildFilter(filters?: IgoOgcFilterObject, extent?: [number, number, number, number], proj?: olProjection, fieldNameGeometry?: string): string;
    private bundleFilter;
    private createFilter;
    defineInterfaceFilterSequence(filterObject: any, geometryName: any, logical?: string, level?: number): OgcInterfaceFilterOptions[];
    computeAllowedOperators(fields?: SourceFieldsOptionsParams[], propertyName?: string, defaultOperatorsType?: OgcFilterOperatorType): {};
    addInterfaceFilter(igoOgcFilterObject?: any, geometryName?: any, level?: number, parentLogical?: string): OgcInterfaceFilterOptions;
    checkIgoFiltersProperties(filterObject: any, fieldNameGeometry: any, proj: olProjection, active?: boolean): any;
    private addFilterProperties;
    rebuiltIgoOgcFilterObjectFromSequence(sequence: OgcInterfaceFilterOptions[]): IgoOgcFilterObject;
    private computeIgoPushButton;
    handleOgcFiltersAppliedValue(options: OgcFilterableDataSourceOptions, fieldNameGeometry: string, extent?: [number, number, number, number], proj?: olProjection): string;
    formatProcessedOgcFilter(processedFilter: string, layersOrTypenames: string): string;
}
