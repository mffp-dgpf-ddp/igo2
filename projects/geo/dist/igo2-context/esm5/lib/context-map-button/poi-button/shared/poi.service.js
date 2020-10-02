/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { ConfigService } from '@igo2/core';
var PoiService = /** @class */ (function () {
    function PoiService(http, config) {
        this.http = http;
        this.config = config;
        this.baseUrl = this.config.getConfig('context.url');
    }
    /**
     * @return {?}
     */
    PoiService.prototype.get = /**
     * @return {?}
     */
    function () {
        if (!this.baseUrl) {
            return EMPTY;
        }
        /** @type {?} */
        var url = this.baseUrl + '/pois';
        return this.http.get(url);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PoiService.prototype.delete = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var url = this.baseUrl + '/pois/' + id;
        return this.http.delete(url);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    PoiService.prototype.create = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var url = this.baseUrl + '/pois';
        return this.http.post(url, JSON.stringify(context));
    };
    PoiService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PoiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ConfigService }
    ]; };
    return PoiService;
}());
export { PoiService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFwLWJ1dHRvbi9wb2ktYnV0dG9uL3NoYXJlZC9wb2kuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzNDO0lBSUUsb0JBQW9CLElBQWdCLEVBQVUsTUFBcUI7UUFBL0MsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7O0lBRUQsd0JBQUc7OztJQUFIO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDZDs7WUFFSyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCwyQkFBTTs7OztJQUFOLFVBQU8sRUFBVTs7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsRUFBRTtRQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsMkJBQU07Ozs7SUFBTixVQUFPLE9BQVk7O1lBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Z0JBekJGLFVBQVU7Ozs7Z0JBTkYsVUFBVTtnQkFHVixhQUFhOztJQTZCdEIsaUJBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXpCWSxVQUFVOzs7Ozs7SUFDckIsNkJBQXdCOzs7OztJQUVaLDBCQUF3Qjs7Ozs7SUFBRSw0QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEVNUFRZIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFBvaSB9IGZyb20gJy4vcG9pLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQb2lTZXJ2aWNlIHtcclxuICBwcml2YXRlIGJhc2VVcmw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5iYXNlVXJsID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjb250ZXh0LnVybCcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0KCk6IE9ic2VydmFibGU8UG9pW10+IHtcclxuICAgIGlmICghdGhpcy5iYXNlVXJsKSB7XHJcbiAgICAgIHJldHVybiBFTVBUWTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmJhc2VVcmwgKyAnL3BvaXMnO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UG9pW10+KHVybCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5iYXNlVXJsICsgJy9wb2lzLycgKyBpZDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPHZvaWQ+KHVybCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoY29udGV4dDogUG9pKTogT2JzZXJ2YWJsZTxQb2k+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuYmFzZVVybCArICcvcG9pcyc7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UG9pPih1cmwsIEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcclxuICB9XHJcbn1cclxuIl19