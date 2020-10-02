import { OnInit, OnDestroy } from '@angular/core';
import { RouteService, ConfigService } from '@igo2/core';
import { IgoMap, MapBrowserComponent, LayerService, StyleListService, StyleService } from '@igo2/geo';
import { ContextService } from './context.service';
export declare class LayerContextDirective implements OnInit, OnDestroy {
    private component;
    private contextService;
    private layerService;
    private configService;
    private styleListService;
    private styleService;
    private route;
    private context$$;
    private queryParams;
    private contextLayers;
    removeLayersOnContextChange: boolean;
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, contextService: ContextService, layerService: LayerService, configService: ConfigService, styleListService: StyleListService, styleService: StyleService, route: RouteService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleContextChange;
    private computeLayerVisibilityFromUrl;
}
