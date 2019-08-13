import { OnInit } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { DownloadService } from '../../download/shared/download.service';
import { OgcFilterableDataSource } from '../shared/ogc-filter.interface';
import { OGCFilterService } from '../shared/ogc-filter.service';
import { IgoMap } from '../../map';
export declare class OgcFilterableItemComponent implements OnInit {
    private ogcFilterService;
    private downloadService;
    color: string;
    private lastRunOgcFilter;
    private defaultLogicalParent;
    hasActiveSpatialFilter: boolean;
    filtersAreEditable: boolean;
    filtersCollapsed: boolean;
    hasPushButton: boolean;
    layer: Layer;
    map: IgoMap;
    readonly refreshFunc: any;
    readonly datasource: OgcFilterableDataSource;
    ogcFiltersHeaderShown: boolean;
    readonly downloadable: any;
    constructor(ogcFilterService: OGCFilterService, downloadService: DownloadService);
    ngOnInit(): void;
    addFilterToSequence(): void;
    openDownload(): void;
    refreshFilters(force?: boolean): void;
    setVisible(): void;
    isAdvancedOgcFilters(): boolean;
    addFilterDisabled(): boolean;
    private changeOgcFiltersAdvancedOgcFilters;
    changeOgcFilterType(isAdvancedOgcFilters: any): void;
}
