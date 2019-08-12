/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { ConfigService } from '@igo2/core';
export class PoiService {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.baseUrl = this.config.getConfig('context.url');
    }
    /**
     * @return {?}
     */
    get() {
        if (!this.baseUrl) {
            return EMPTY;
        }
        /** @type {?} */
        const url = this.baseUrl + '/pois';
        return this.http.get(url);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    delete(id) {
        /** @type {?} */
        const url = this.baseUrl + '/pois/' + id;
        return this.http.delete(url);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    create(context) {
        /** @type {?} */
        const url = this.baseUrl + '/pois';
        return this.http.post(url, JSON.stringify(context));
    }
}
PoiService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PoiService.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PoiService.prototype.baseUrl;
    /**
     * @type {?}
     * @private
     */
    PoiService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    PoiService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFwLWJ1dHRvbi9wb2ktYnV0dG9uL3NoYXJlZC9wb2kuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBSTNDLE1BQU0sT0FBTyxVQUFVOzs7OztJQUdyQixZQUFvQixJQUFnQixFQUFVLE1BQXFCO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7OztJQUVELEdBQUc7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQztTQUNkOztjQUVLLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87UUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxFQUFVOztjQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxFQUFFO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQU8sR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBWTs7Y0FDWCxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7WUF6QkYsVUFBVTs7OztZQU5GLFVBQVU7WUFHVixhQUFhOzs7Ozs7O0lBS3BCLDZCQUF3Qjs7Ozs7SUFFWiwwQkFBd0I7Ozs7O0lBQUUsNEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBFTVBUWSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBQb2kgfSBmcm9tICcuL3BvaS5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUG9pU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMuYmFzZVVybCA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dC51cmwnKTtcclxuICB9XHJcblxyXG4gIGdldCgpOiBPYnNlcnZhYmxlPFBvaVtdPiB7XHJcbiAgICBpZiAoIXRoaXMuYmFzZVVybCkge1xyXG4gICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9wb2lzJztcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBvaVtdPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvcG9pcy8nICsgaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTx2b2lkPih1cmwpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKGNvbnRleHQ6IFBvaSk6IE9ic2VydmFibGU8UG9pPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3BvaXMnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFBvaT4odXJsLCBKU09OLnN0cmluZ2lmeShjb250ZXh0KSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==