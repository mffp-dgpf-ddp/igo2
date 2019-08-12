/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
import * as i0 from "@angular/core";
export class ConfigService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.config = {};
    }
    /**
     * Use to get the data found in config file
     * @param {?} key
     * @return {?}
     */
    getConfig(key) {
        return ObjectUtils.resolve(this.config, key);
    }
    /**
     * This method loads "[path]" to get all config's variables
     * @param {?} options
     * @return {?}
     */
    load(options) {
        /** @type {?} */
        const baseConfig = options.default || {};
        if (!options.path) {
            this.config = baseConfig;
            return true;
        }
        /** @type {?} */
        const http = this.injector.get(HttpClient);
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            http
                .get(options.path)
                .pipe(catchError((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                console.log(`Configuration file ${options.path} could not be read`);
                resolve(true);
                return throwError(error.error || 'Server error');
            })))
                .subscribe((/**
             * @param {?} configResponse
             * @return {?}
             */
            configResponse => {
                this.config = ObjectUtils.mergeDeep(baseConfig, configResponse);
                resolve(true);
            }));
        }));
    }
}
ConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: Injector }
];
/** @nocollapse */ ConfigService.ngInjectableDef = i0.defineInjectable({ factory: function ConfigService_Factory() { return new ConfigService(i0.inject(i0.INJECTOR)); }, token: ConfigService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ConfigService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBTzFDLE1BQU0sT0FBTyxhQUFhOzs7O0lBSXhCLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGOUIsV0FBTSxHQUFXLEVBQUUsQ0FBQztJQUVhLENBQUM7Ozs7OztJQUtuQyxTQUFTLENBQUMsR0FBVztRQUMxQixPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFLTSxJQUFJLENBQUMsT0FBc0I7O2NBQzFCLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUU7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDekIsT0FBTyxJQUFJLENBQUM7U0FDYjs7Y0FFSyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBRTFDLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUk7aUJBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ2pCLElBQUksQ0FDSCxVQUFVOzs7O1lBQ1IsQ0FBQyxLQUFVLEVBQU8sRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxzQkFBc0IsT0FBTyxDQUFDLElBQUksb0JBQW9CLENBQ3ZELENBQUM7Z0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksY0FBYyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxFQUNGLENBQ0Y7aUJBQ0EsU0FBUzs7OztZQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQS9DRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFYb0IsUUFBUTs7Ozs7Ozs7SUFjM0IsK0JBQTRCOzs7OztJQUVoQixpQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ09wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgY29uZmlnOiBvYmplY3QgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBnZXQgdGhlIGRhdGEgZm91bmQgaW4gY29uZmlnIGZpbGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29uZmlnKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiBPYmplY3RVdGlscy5yZXNvbHZlKHRoaXMuY29uZmlnLCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgbG9hZHMgXCJbcGF0aF1cIiB0byBnZXQgYWxsIGNvbmZpZydzIHZhcmlhYmxlc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBsb2FkKG9wdGlvbnM6IENvbmZpZ09wdGlvbnMpIHtcclxuICAgIGNvbnN0IGJhc2VDb25maWcgPSBvcHRpb25zLmRlZmF1bHQgfHwge307XHJcbiAgICBpZiAoIW9wdGlvbnMucGF0aCkge1xyXG4gICAgICB0aGlzLmNvbmZpZyA9IGJhc2VDb25maWc7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGh0dHAgPSB0aGlzLmluamVjdG9yLmdldChIdHRwQ2xpZW50KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBodHRwXHJcbiAgICAgICAgLmdldChvcHRpb25zLnBhdGgpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBjYXRjaEVycm9yKFxyXG4gICAgICAgICAgICAoZXJyb3I6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICBgQ29uZmlndXJhdGlvbiBmaWxlICR7b3B0aW9ucy5wYXRofSBjb3VsZCBub3QgYmUgcmVhZGBcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IuZXJyb3IgfHwgJ1NlcnZlciBlcnJvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoY29uZmlnUmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb25maWcgPSBPYmplY3RVdGlscy5tZXJnZURlZXAoYmFzZUNvbmZpZywgY29uZmlnUmVzcG9uc2UpO1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=