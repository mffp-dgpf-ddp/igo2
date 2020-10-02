import { AfterViewInit } from '@angular/core';
import { RouteService } from '@igo2/core';
import { DirectionsFormComponent } from './directions-form.component';
import { DirectionsFormService } from './directions-form.service';
export declare class DirectionsFormBindingDirective implements AfterViewInit {
    private component;
    private directionsFormService;
    private route;
    constructor(component: DirectionsFormComponent, directionsFormService: DirectionsFormService, route: RouteService);
    ngAfterViewInit(): void;
}
