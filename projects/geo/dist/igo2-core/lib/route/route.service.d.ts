import { InjectionToken } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteServiceOptions } from './route.interface';
export declare let ROUTE_SERVICE_OPTIONS: InjectionToken<RouteServiceOptions>;
export declare function provideRouteServiceOptions(options: RouteServiceOptions): {
    provide: InjectionToken<RouteServiceOptions>;
    useValue: RouteServiceOptions;
};
export declare class RouteService {
    route: ActivatedRoute;
    options: RouteServiceOptions;
    constructor(route: ActivatedRoute, options: RouteServiceOptions);
    readonly queryParams: Observable<Params>;
}
