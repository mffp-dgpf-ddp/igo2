/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import * as i0 from "@angular/core";
import * as i1 from "../../config/config.service";
export class AnalyticsService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.options = this.config.getConfig('analytics') || {};
        if (this.options.provider === 'matomo') {
            this.initMatomo();
        }
    }
    /**
     * @private
     * @return {?}
     */
    initMatomo() {
        if (!this.options.url || !this.options.id) {
            return;
        }
        ((/** @type {?} */ (window)))._paq = ((/** @type {?} */ (window)))._paq || [];
        /** @type {?} */
        const paq = ((/** @type {?} */ (window)))._paq;
        paq.push(['trackPageView']);
        paq.push(['enableLinkTracking']);
        ((/**
         * @return {?}
         */
        () => {
            paq.push(['setTrackerUrl', this.options.url + 'matomo.php']);
            paq.push(['setSiteId', this.options.id]);
            /** @type {?} */
            const g = document.createElement('script');
            /** @type {?} */
            const s = document.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = this.options.url + 'matomo.js';
            s.parentNode.insertBefore(g, s);
        }))();
    }
}
AnalyticsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AnalyticsService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.ConfigService)); }, token: AnalyticsService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AnalyticsService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    AnalyticsService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FuYWx5dGljcy9zaGFyZWQvYW5hbHl0aWNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFPNUQsTUFBTSxPQUFPLGdCQUFnQjs7OztJQUczQixZQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxPQUFPO1NBQ1I7UUFFRCxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDOztjQUM1QyxHQUFHLEdBQVEsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLElBQUk7UUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUNqQzs7O1FBQUMsR0FBRyxFQUFFO1lBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztrQkFDbkMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDOztrQkFDcEMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztZQUMzQixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNmLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7WUFDdkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxFQUFFLENBQUM7SUFDUCxDQUFDOzs7WUFsQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTlEsYUFBYTs7Ozs7Ozs7SUFRcEIsbUNBQWtDOzs7OztJQUV0QixrQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEFuYWx5dGljc09wdGlvbnMgfSBmcm9tICcuL2FuYWx5dGljcy5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBBbmFseXRpY3NPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhbmFseXRpY3MnKSB8fCB7fTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09PSAnbWF0b21vJykge1xyXG4gICAgICB0aGlzLmluaXRNYXRvbW8oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdE1hdG9tbygpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnVybCB8fCAhdGhpcy5vcHRpb25zLmlkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAod2luZG93IGFzIGFueSkuX3BhcSA9ICh3aW5kb3cgYXMgYW55KS5fcGFxIHx8IFtdO1xyXG4gICAgY29uc3QgcGFxOiBhbnkgPSAod2luZG93IGFzIGFueSkuX3BhcTtcclxuICAgIHBhcS5wdXNoKFsndHJhY2tQYWdlVmlldyddKTtcclxuICAgIHBhcS5wdXNoKFsnZW5hYmxlTGlua1RyYWNraW5nJ10pO1xyXG4gICAgKCgpID0+IHtcclxuICAgICAgcGFxLnB1c2goWydzZXRUcmFja2VyVXJsJywgdGhpcy5vcHRpb25zLnVybCArICdtYXRvbW8ucGhwJ10pO1xyXG4gICAgICBwYXEucHVzaChbJ3NldFNpdGVJZCcsIHRoaXMub3B0aW9ucy5pZF0pO1xyXG4gICAgICBjb25zdCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbiAgICAgIGcudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICBnLmFzeW5jID0gdHJ1ZTtcclxuICAgICAgZy5kZWZlciA9IHRydWU7XHJcbiAgICAgIGcuc3JjID0gdGhpcy5vcHRpb25zLnVybCArICdtYXRvbW8uanMnO1xyXG4gICAgICBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGcsIHMpO1xyXG4gICAgfSkoKTtcclxuICB9XHJcbn1cclxuIl19