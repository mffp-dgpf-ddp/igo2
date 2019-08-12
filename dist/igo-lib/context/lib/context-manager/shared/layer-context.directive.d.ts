import { OnInit, OnDestroy } from '@angular/core';
import { RouteService } from '@igo2/core';
import { IgoMap, MapBrowserComponent, LayerService } from '@igo2/geo';
import { ContextService } from './context.service';
export declare class LayerContextDirective implements OnInit, OnDestroy {
    private component;
    private contextService;
    private layerService;
    private route;
    private context$$;
    private queryParams;
    private contextLayers;
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, contextService: ContextService, layerService: LayerService, route: RouteService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleContextChange;
    private computeLayerVisibilityFromUrl;
}
