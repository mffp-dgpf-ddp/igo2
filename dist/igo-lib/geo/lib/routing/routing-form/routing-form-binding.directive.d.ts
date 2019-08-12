import { AfterViewInit } from '@angular/core';
import { RouteService } from '@igo2/core';
import { RoutingFormComponent } from './routing-form.component';
import { RoutingFormService } from './routing-form.service';
export declare class RoutingFormBindingDirective implements AfterViewInit {
    private component;
    private routingFormService;
    private route;
    constructor(component: RoutingFormComponent, routingFormService: RoutingFormService, route: RouteService);
    ngAfterViewInit(): void;
}
