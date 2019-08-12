/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import * as i0 from "@angular/core";
import * as i1 from "../../config/config.service";
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(config) {
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
    AnalyticsService.prototype.initMatomo = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.options.url || !this.options.id) {
            return;
        }
        ((/** @type {?} */ (window)))._paq = ((/** @type {?} */ (window)))._paq || [];
        /** @type {?} */
        var paq = ((/** @type {?} */ (window)))._paq;
        paq.push(['trackPageView']);
        paq.push(['enableLinkTracking']);
        ((/**
         * @return {?}
         */
        function () {
            paq.push(['setTrackerUrl', _this.options.url + 'matomo.php']);
            paq.push(['setSiteId', _this.options.id]);
            /** @type {?} */
            var g = document.createElement('script');
            /** @type {?} */
            var s = document.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = _this.options.url + 'matomo.js';
            s.parentNode.insertBefore(g, s);
        }))();
    };
    AnalyticsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AnalyticsService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    /** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(i1.ConfigService)); }, token: AnalyticsService, providedIn: "root" });
    return AnalyticsService;
}());
export { AnalyticsService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FuYWx5dGljcy9zaGFyZWQvYW5hbHl0aWNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFJNUQ7SUFNRSwwQkFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDOzs7OztJQUVPLHFDQUFVOzs7O0lBQWxCO1FBQUEsaUJBb0JDO1FBbkJDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE9BQU87U0FDUjtRQUVELENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7O1lBQzVDLEdBQUcsR0FBUSxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsSUFBSTtRQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBQ2pDOzs7UUFBQztZQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM3RCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ25DLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzs7Z0JBQ3BDLENBQUMsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7WUFDM0IsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNmLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQzs7Z0JBbENGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTlEsYUFBYTs7OzJCQUZ0QjtDQXlDQyxBQW5DRCxJQW1DQztTQWhDWSxnQkFBZ0I7Ozs7OztJQUMzQixtQ0FBa0M7Ozs7O0lBRXRCLGtDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQW5hbHl0aWNzT3B0aW9ucyB9IGZyb20gJy4vYW5hbHl0aWNzLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NTZXJ2aWNlIHtcclxuICBwcml2YXRlIG9wdGlvbnM6IEFuYWx5dGljc09wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2FuYWx5dGljcycpIHx8IHt9O1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT09ICdtYXRvbW8nKSB7XHJcbiAgICAgIHRoaXMuaW5pdE1hdG9tbygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0TWF0b21vKCkge1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMudXJsIHx8ICF0aGlzLm9wdGlvbnMuaWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICh3aW5kb3cgYXMgYW55KS5fcGFxID0gKHdpbmRvdyBhcyBhbnkpLl9wYXEgfHwgW107XHJcbiAgICBjb25zdCBwYXE6IGFueSA9ICh3aW5kb3cgYXMgYW55KS5fcGFxO1xyXG4gICAgcGFxLnB1c2goWyd0cmFja1BhZ2VWaWV3J10pO1xyXG4gICAgcGFxLnB1c2goWydlbmFibGVMaW5rVHJhY2tpbmcnXSk7XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICBwYXEucHVzaChbJ3NldFRyYWNrZXJVcmwnLCB0aGlzLm9wdGlvbnMudXJsICsgJ21hdG9tby5waHAnXSk7XHJcbiAgICAgIHBhcS5wdXNoKFsnc2V0U2l0ZUlkJywgdGhpcy5vcHRpb25zLmlkXSk7XHJcbiAgICAgIGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgY29uc3QgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuICAgICAgZy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgIGcuYXN5bmMgPSB0cnVlO1xyXG4gICAgICBnLmRlZmVyID0gdHJ1ZTtcclxuICAgICAgZy5zcmMgPSB0aGlzLm9wdGlvbnMudXJsICsgJ21hdG9tby5qcyc7XHJcbiAgICAgIHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZywgcyk7XHJcbiAgICB9KSgpO1xyXG4gIH1cclxufVxyXG4iXX0=