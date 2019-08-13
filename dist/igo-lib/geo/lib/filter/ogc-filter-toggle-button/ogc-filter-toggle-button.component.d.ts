import { OnInit } from '@angular/core';
import { OgcFilterableDataSource, OgcPushButton, OgcPushButtonBundle } from '../../filter/shared/ogc-filter.interface';
import { IgoMap } from '../../map';
import { OGCFilterService } from '../shared/ogc-filter.service';
export declare class OgcFilterToggleButtonComponent implements OnInit {
    private ogcFilterService;
    refreshFilters: () => void;
    datasource: OgcFilterableDataSource;
    map: IgoMap;
    private ogcFilterWriter;
    color: string;
    pushButtonBundle: OgcPushButtonBundle[];
    constructor(ogcFilterService: OGCFilterService);
    ngOnInit(): void;
    getToolTip(pb: OgcPushButton): string;
    getButtonColor(pb: OgcPushButton): {};
    bundleIsVertical(bundle: OgcPushButtonBundle): boolean;
    applyFilters(currentOgcPushButton?: OgcPushButton): void;
}
