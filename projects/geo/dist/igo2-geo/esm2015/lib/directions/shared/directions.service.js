/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DirectionsSourceService } from './directions-source.service';
import * as i0 from "@angular/core";
import * as i1 from "./directions-source.service";
export class DirectionsService {
    /**
     * @param {?} directionsSourceService
     */
    constructor(directionsSourceService) {
        this.directionsSourceService = directionsSourceService;
    }
    /**
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    route(coordinates, directionsOptions = {}) {
        if (coordinates.length === 0) {
            return;
        }
        return this.directionsSourceService.sources
            .filter((/**
         * @param {?} source
         * @return {?}
         */
        (source) => source.enabled))
            .map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => this.routeSource(source, coordinates, directionsOptions)));
    }
    /**
     * @param {?} source
     * @param {?} coordinates
     * @param {?=} directionsOptions
     * @return {?}
     */
    routeSource(source, coordinates, directionsOptions = {}) {
        /** @type {?} */
        const request = source.route(coordinates, directionsOptions);
        return request;
    }
}
DirectionsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DirectionsService.ctorParameters = () => [
    { type: DirectionsSourceService }
];
/** @nocollapse */ DirectionsService.ngInjectableDef = i0.defineInjectable({ factory: function DirectionsService_Factory() { return new DirectionsService(i0.inject(i1.DirectionsSourceService)); }, token: DirectionsService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsService.prototype.directionsSourceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGlvbnMvc2hhcmVkL2RpcmVjdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBS3RFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFDNUIsWUFBb0IsdUJBQWdEO1FBQWhELDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7SUFBRyxDQUFDOzs7Ozs7SUFFeEUsS0FBSyxDQUFDLFdBQStCLEVBQUUsb0JBQXVDLEVBQUU7UUFDOUUsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPO2FBQ3hDLE1BQU07Ozs7UUFBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUM7YUFDcEQsR0FBRzs7OztRQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLEVBQUMsQ0FBQztJQUNqRyxDQUFDOzs7Ozs7O0lBRUQsV0FBVyxDQUNULE1BQXdCLEVBQ3hCLFdBQStCLEVBQy9CLG9CQUF1QyxFQUFFOztjQUVuQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUU7UUFDN0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7O1lBdEJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUpRLHVCQUF1Qjs7Ozs7Ozs7SUFNbEIsb0RBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25zLCBEaXJlY3Rpb25zT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9kaXJlY3Rpb25zLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNTb3VyY2UgfSBmcm9tICcuLi9kaXJlY3Rpb25zLXNvdXJjZXMvZGlyZWN0aW9ucy1zb3VyY2UnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zU291cmNlU2VydmljZSB9IGZyb20gJy4vZGlyZWN0aW9ucy1zb3VyY2Uuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25zU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaXJlY3Rpb25zU291cmNlU2VydmljZTogRGlyZWN0aW9uc1NvdXJjZVNlcnZpY2UpIHt9XHJcblxyXG4gIHJvdXRlKGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdW10sIGRpcmVjdGlvbnNPcHRpb25zOiBEaXJlY3Rpb25zT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxEaXJlY3Rpb25zW10+W10ge1xyXG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb25zU291cmNlU2VydmljZS5zb3VyY2VzXHJcbiAgICAgIC5maWx0ZXIoKHNvdXJjZTogRGlyZWN0aW9uc1NvdXJjZSkgPT4gc291cmNlLmVuYWJsZWQpXHJcbiAgICAgIC5tYXAoKHNvdXJjZTogRGlyZWN0aW9uc1NvdXJjZSkgPT4gdGhpcy5yb3V0ZVNvdXJjZShzb3VyY2UsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb25zT3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgcm91dGVTb3VyY2UoXHJcbiAgICBzb3VyY2U6IERpcmVjdGlvbnNTb3VyY2UsXHJcbiAgICBjb29yZGluYXRlczogW251bWJlciwgbnVtYmVyXVtdLFxyXG4gICAgZGlyZWN0aW9uc09wdGlvbnM6IERpcmVjdGlvbnNPcHRpb25zID0ge31cclxuICApOiBPYnNlcnZhYmxlPERpcmVjdGlvbnNbXT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHNvdXJjZS5yb3V0ZShjb29yZGluYXRlcywgZGlyZWN0aW9uc09wdGlvbnMgKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH1cclxufVxyXG4iXX0=