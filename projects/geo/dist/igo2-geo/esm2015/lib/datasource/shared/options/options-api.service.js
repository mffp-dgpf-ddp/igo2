/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OptionsService } from './options.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class OptionsApiService extends OptionsService {
    /**
     * @param {?} http
     * @param {?=} options
     */
    constructor(http, options = {}) {
        super();
        this.http = http;
        this.urlApi = options.url || this.urlApi;
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getWMSOptions(baseOptions) {
        if (!this.urlApi) {
            return of((/** @type {?} */ ({})));
        }
        /** @type {?} */
        const params = new HttpParams({
            fromObject: {
                type: baseOptions.type,
                url: baseOptions.url,
                layers: baseOptions.params.LAYERS
            }
        });
        /** @type {?} */
        const request = this.http.get(this.urlApi, {
            params
        });
        return request.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (!res || !res.sourceOptions) {
                return (/** @type {?} */ ({}));
            }
            res.sourceOptions._layerOptionsFromSource = res.layerOptions;
            return res.sourceOptions;
        })));
    }
}
OptionsApiService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
OptionsApiService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
/** @nocollapse */ OptionsApiService.ngInjectableDef = i0.defineInjectable({ factory: function OptionsApiService_Factory() { return new OptionsApiService(i0.inject(i1.HttpClient), i0.inject("options")); }, token: OptionsApiService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    OptionsApiService.prototype.urlApi;
    /**
     * @type {?}
     * @private
     */
    OptionsApiService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy1hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc291cmNlL3NoYXJlZC9vcHRpb25zL29wdGlvbnMtYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFNbkQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGNBQWM7Ozs7O0lBR25ELFlBQ1UsSUFBZ0IsRUFDTCxVQUE2QixFQUFFO1FBRWxELEtBQUssRUFBRSxDQUFDO1FBSEEsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUl4QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELGFBQWEsQ0FDWCxXQUFpQztRQUVqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLEVBQUUsQ0FBQyxtQkFBQSxFQUFFLEVBQXdCLENBQUMsQ0FBQztTQUN2Qzs7Y0FDSyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDNUIsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDdEIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxHQUFHO2dCQUNwQixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ2xDO1NBQ0YsQ0FBQzs7Y0FFSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxNQUFNO1NBQ1AsQ0FBQztRQUVGLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FDakIsR0FBRzs7OztRQUNELENBQUMsR0FHQSxFQUFFLEVBQUU7WUFDSCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtnQkFDOUIsT0FBTyxtQkFBQSxFQUFFLEVBQXdCLENBQUM7YUFDbkM7WUFDRCxHQUFHLENBQUMsYUFBYSxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7WUFDN0QsT0FBTyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzNCLENBQUMsRUFDRixDQUNGLENBQUM7SUFDSixDQUFDOzs7WUE5Q0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBVlEsVUFBVTs0Q0FnQmQsTUFBTSxTQUFDLFNBQVM7Ozs7Ozs7O0lBSm5CLG1DQUF1Qjs7Ozs7SUFHckIsaUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vZGF0YXNvdXJjZXMnO1xyXG5pbXBvcnQgeyBPcHRpb25zU2VydmljZSB9IGZyb20gJy4vb3B0aW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3B0aW9uc0FwaU9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMtYXBpLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zQXBpU2VydmljZSBleHRlbmRzIE9wdGlvbnNTZXJ2aWNlIHtcclxuICBwcml2YXRlIHVybEFwaTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zOiBPcHRpb25zQXBpT3B0aW9ucyA9IHt9XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy51cmxBcGkgPSBvcHRpb25zLnVybCB8fCB0aGlzLnVybEFwaTtcclxuICB9XHJcblxyXG4gIGdldFdNU09wdGlvbnMoXHJcbiAgICBiYXNlT3B0aW9uczogV01TRGF0YVNvdXJjZU9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFdNU0RhdGFTb3VyY2VPcHRpb25zPiB7XHJcbiAgICBpZiAoIXRoaXMudXJsQXBpKSB7XHJcbiAgICAgIHJldHVybiBvZih7fSBhcyBXTVNEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7XHJcbiAgICAgIGZyb21PYmplY3Q6IHtcclxuICAgICAgICB0eXBlOiBiYXNlT3B0aW9ucy50eXBlLFxyXG4gICAgICAgIHVybDogYmFzZU9wdGlvbnMudXJsLFxyXG4gICAgICAgIGxheWVyczogYmFzZU9wdGlvbnMucGFyYW1zLkxBWUVSU1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5odHRwLmdldCh0aGlzLnVybEFwaSwge1xyXG4gICAgICBwYXJhbXNcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0LnBpcGUoXHJcbiAgICAgIG1hcChcclxuICAgICAgICAocmVzOiB7XHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICAgIGxheWVyT3B0aW9uczogeyBba2V5czogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFyZXMgfHwgIXJlcy5zb3VyY2VPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fSBhcyBXTVNEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlcy5zb3VyY2VPcHRpb25zLl9sYXllck9wdGlvbnNGcm9tU291cmNlID0gcmVzLmxheWVyT3B0aW9ucztcclxuICAgICAgICAgIHJldHVybiByZXMuc291cmNlT3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==