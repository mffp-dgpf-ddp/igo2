/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
import { version } from './version';
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
         * @param {?} _reject
         * @return {?}
         */
        (resolve, _reject) => {
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
                this.config = ObjectUtils.mergeDeep(ObjectUtils.mergeDeep({ version }, baseConfig), configResponse);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFLcEMsTUFBTSxPQUFPLGFBQWE7Ozs7SUFHeEIsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUY5QixXQUFNLEdBQVcsRUFBRSxDQUFDO0lBRWEsQ0FBQzs7Ozs7O0lBS25DLFNBQVMsQ0FBQyxHQUFXO1FBQzFCLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7OztJQUtNLElBQUksQ0FBQyxPQUFzQjs7Y0FDMUIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRTtRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQztTQUNiOztjQUVLLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFFMUMsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDdEMsSUFBSTtpQkFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFDakIsSUFBSSxDQUNILFVBQVU7Ozs7WUFBQyxDQUFDLEtBQVUsRUFBTyxFQUFFO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixPQUFPLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNwRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FDSDtpQkFDQSxTQUFTOzs7O1lBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FDakMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLFVBQVUsQ0FBQyxFQUM5QyxjQUFjLENBQ2YsQ0FBQztnQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQTdDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFab0IsUUFBUTs7Ozs7Ozs7SUFjM0IsK0JBQTRCOzs7OztJQUVoQixpQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ09wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgY29uZmlnOiBvYmplY3QgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBnZXQgdGhlIGRhdGEgZm91bmQgaW4gY29uZmlnIGZpbGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q29uZmlnKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiBPYmplY3RVdGlscy5yZXNvbHZlKHRoaXMuY29uZmlnLCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgbG9hZHMgXCJbcGF0aF1cIiB0byBnZXQgYWxsIGNvbmZpZydzIHZhcmlhYmxlc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBsb2FkKG9wdGlvbnM6IENvbmZpZ09wdGlvbnMpIHtcclxuICAgIGNvbnN0IGJhc2VDb25maWcgPSBvcHRpb25zLmRlZmF1bHQgfHwge307XHJcbiAgICBpZiAoIW9wdGlvbnMucGF0aCkge1xyXG4gICAgICB0aGlzLmNvbmZpZyA9IGJhc2VDb25maWc7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGh0dHAgPSB0aGlzLmluamVjdG9yLmdldChIdHRwQ2xpZW50KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIF9yZWplY3QpID0+IHtcclxuICAgICAgaHR0cFxyXG4gICAgICAgIC5nZXQob3B0aW9ucy5wYXRoKVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDb25maWd1cmF0aW9uIGZpbGUgJHtvcHRpb25zLnBhdGh9IGNvdWxkIG5vdCBiZSByZWFkYCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yLmVycm9yIHx8ICdTZXJ2ZXIgZXJyb3InKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoY29uZmlnUmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb25maWcgPSBPYmplY3RVdGlscy5tZXJnZURlZXAoXHJcbiAgICAgICAgICAgIE9iamVjdFV0aWxzLm1lcmdlRGVlcCh7IHZlcnNpb24gfSwgYmFzZUNvbmZpZyksXHJcbiAgICAgICAgICAgIGNvbmZpZ1Jlc3BvbnNlXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=