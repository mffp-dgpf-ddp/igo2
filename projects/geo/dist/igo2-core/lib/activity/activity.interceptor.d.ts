import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityService } from './activity.service';
export declare class ActivityInterceptor implements HttpInterceptor {
    private activityService;
    constructor(activityService: ActivityService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
