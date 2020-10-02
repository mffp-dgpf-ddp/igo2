import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivityService } from '@igo2/core';
import { IgoMap, MapViewOptions } from '../shared';
export declare class MapBrowserComponent implements OnInit, AfterViewInit, OnDestroy {
    private activityService;
    private activityId;
    private status$$;
    map: IgoMap;
    view: MapViewOptions;
    private _view;
    id: string;
    constructor(activityService: ActivityService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private handleStatusChange;
}
