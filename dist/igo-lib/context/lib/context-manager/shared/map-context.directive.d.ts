import { OnInit, OnDestroy } from '@angular/core';
import { IgoMap, MapBrowserComponent } from '@igo2/geo';
import { ContextService } from './context.service';
export declare class MapContextDirective implements OnInit, OnDestroy {
    private contextService;
    private component;
    private context$$;
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, contextService: ContextService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleContextChange;
}
