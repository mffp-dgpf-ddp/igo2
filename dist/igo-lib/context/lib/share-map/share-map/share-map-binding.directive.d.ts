import { OnInit } from '@angular/core';
import { LayerListService } from '@igo2/geo';
import { ShareMapComponent } from './share-map.component';
import { RouteService } from '@igo2/core';
export declare class ShareMapBindingDirective implements OnInit {
    private layerListService;
    private route;
    private component;
    constructor(component: ShareMapComponent, layerListService: LayerListService, route: RouteService);
    ngOnInit(): void;
    private initRoutes;
}
