import { OnInit, ChangeDetectorRef } from '@angular/core';
import { RouteService } from '@igo2/core';
import { SearchBarComponent } from './search-bar.component';
export declare class SearchUrlParamDirective implements OnInit {
    private component;
    private ref;
    private route;
    constructor(component: SearchBarComponent, ref: ChangeDetectorRef, route: RouteService);
    ngOnInit(): void;
}
