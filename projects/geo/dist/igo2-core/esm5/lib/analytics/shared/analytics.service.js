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
    Object.defineProperty(AnalyticsService.prototype, "paq", {
        get: /**
         * @return {?}
         */
        function () {
            return (((/** @type {?} */ (window)))._paq = ((/** @type {?} */ (window)))._paq || []);
        },
        enumerable: true,
        configurable: true
    });
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
        /** @type {?} */
        var url = this.options.url.substr(-1) === '/'
            ? this.options.url + 'matomo'
            : this.options.url;
        // this.paq.push(['trackPageView']);
        // this.paq.push(['enableLinkTracking']);
        ((/**
         * @return {?}
         */
        function () {
            _this.paq.push(['setTrackerUrl', url + '.php']);
            _this.paq.push(['setSiteId', _this.options.id]);
            /** @type {?} */
            var g = document.createElement('script');
            /** @type {?} */
            var s = document.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = url + '.js';
            s.parentNode.insertBefore(g, s);
        }))();
    };
    /**
     * @param {?=} user
     * @param {?=} profils
     * @return {?}
     */
    AnalyticsService.prototype.setUser = /**
     * @param {?=} user
     * @param {?=} profils
     * @return {?}
     */
    function (user, profils) {
        if (this.options.provider === 'matomo') {
            if (!user) {
                this.paq.push(['resetUserId']);
                this.paq.push(['deleteCustomVariable', 1, 'user']);
                this.paq.push(['deleteCustomVariable', 2, 'name']);
                this.paq.push(['deleteCustomVariable', 3, 'profils']);
            }
            else {
                this.paq.push(['setUserId', user.id]);
                /** @type {?} */
                var name_1 = user.firstName + " " + user.lastName;
                this.paq.push(['setCustomVariable', 1, 'user', user.sourceId, 'visit']);
                this.paq.push(['setCustomVariable', 2, 'name', name_1, 'visit']);
                this.paq.push(['setCustomVariable', 3, 'profils', profils, 'visit']);
            }
            this.paq.push(['trackPageView']);
            this.paq.push(['enableLinkTracking']);
        }
    };
    /**
     * @param {?} term
     * @param {?} nbResults
     * @return {?}
     */
    AnalyticsService.prototype.trackSearch = /**
     * @param {?} term
     * @param {?} nbResults
     * @return {?}
     */
    function (term, nbResults) {
        if (this.options.provider === 'matomo') {
            this.paq.push(['trackSiteSearch', term, false, nbResults]);
        }
    };
    /**
     * @param {?} category
     * @param {?} action
     * @param {?} name
     * @return {?}
     */
    AnalyticsService.prototype.trackEvent = /**
     * @param {?} category
     * @param {?} action
     * @param {?} name
     * @return {?}
     */
    function (category, action, name) {
        if (this.options.provider === 'matomo') {
            this.paq.push(['trackEvent', category, action, name]);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FuYWx5dGljcy9zaGFyZWQvYW5hbHl0aWNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFJNUQ7SUFVRSwwQkFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBVkQsc0JBQUksaUNBQUc7Ozs7UUFBUDtZQUNFLE9BQU8sQ0FBQyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7Ozs7O0lBVU8scUNBQVU7Ozs7SUFBbEI7UUFBQSxpQkFzQkM7UUFyQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDekMsT0FBTztTQUNSOztZQUNLLEdBQUcsR0FDUCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO1lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRO1lBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7UUFFdEIsb0NBQW9DO1FBQ3BDLHlDQUF5QztRQUN6Qzs7O1FBQUM7WUFDQyxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQyxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O2dCQUN4QyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O2dCQUNwQyxDQUFDLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1lBQzNCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDcEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxFQUFFLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTSxrQ0FBTzs7Ozs7SUFBZCxVQUNFLElBS0MsRUFDRCxPQUFrQjtRQUVsQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7b0JBRWhDLE1BQUksR0FBTSxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxRQUFVO2dCQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7Ozs7OztJQUVNLHNDQUFXOzs7OztJQUFsQixVQUFtQixJQUFZLEVBQUUsU0FBaUI7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDOzs7Ozs7O0lBRU0scUNBQVU7Ozs7OztJQUFqQixVQUFrQixRQUFnQixFQUFFLE1BQWMsRUFBRSxJQUFZO1FBQzlELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7O2dCQWpGRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQU5RLGFBQWE7OzsyQkFGdEI7Q0F3RkMsQUFsRkQsSUFrRkM7U0EvRVksZ0JBQWdCOzs7Ozs7SUFDM0IsbUNBQWtDOzs7OztJQU10QixrQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEFuYWx5dGljc09wdGlvbnMgfSBmcm9tICcuL2FuYWx5dGljcy5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBBbmFseXRpY3NPcHRpb25zO1xyXG5cclxuICBnZXQgcGFxKCkge1xyXG4gICAgcmV0dXJuICgod2luZG93IGFzIGFueSkuX3BhcSA9ICh3aW5kb3cgYXMgYW55KS5fcGFxIHx8IFtdKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2FuYWx5dGljcycpIHx8IHt9O1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT09ICdtYXRvbW8nKSB7XHJcbiAgICAgIHRoaXMuaW5pdE1hdG9tbygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0TWF0b21vKCkge1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMudXJsIHx8ICF0aGlzLm9wdGlvbnMuaWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXJsID1cclxuICAgICAgdGhpcy5vcHRpb25zLnVybC5zdWJzdHIoLTEpID09PSAnLydcclxuICAgICAgICA/IHRoaXMub3B0aW9ucy51cmwgKyAnbWF0b21vJ1xyXG4gICAgICAgIDogdGhpcy5vcHRpb25zLnVybDtcclxuXHJcbiAgICAvLyB0aGlzLnBhcS5wdXNoKFsndHJhY2tQYWdlVmlldyddKTtcclxuICAgIC8vIHRoaXMucGFxLnB1c2goWydlbmFibGVMaW5rVHJhY2tpbmcnXSk7XHJcbiAgICAoKCkgPT4ge1xyXG4gICAgICB0aGlzLnBhcS5wdXNoKFsnc2V0VHJhY2tlclVybCcsIHVybCArICcucGhwJ10pO1xyXG4gICAgICB0aGlzLnBhcS5wdXNoKFsnc2V0U2l0ZUlkJywgdGhpcy5vcHRpb25zLmlkXSk7XHJcbiAgICAgIGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgY29uc3QgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuICAgICAgZy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgIGcuYXN5bmMgPSB0cnVlO1xyXG4gICAgICBnLmRlZmVyID0gdHJ1ZTtcclxuICAgICAgZy5zcmMgPSB1cmwgKyAnLmpzJztcclxuICAgICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShnLCBzKTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VXNlcihcclxuICAgIHVzZXI/OiB7XHJcbiAgICAgIGlkOiBudW1iZXI7XHJcbiAgICAgIHNvdXJjZUlkPzogc3RyaW5nO1xyXG4gICAgICBmaXJzdE5hbWU/OiBzdHJpbmc7XHJcbiAgICAgIGxhc3ROYW1lPzogc3RyaW5nO1xyXG4gICAgfSxcclxuICAgIHByb2ZpbHM/OiBzdHJpbmdbXVxyXG4gICkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm92aWRlciA9PT0gJ21hdG9tbycpIHtcclxuICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgdGhpcy5wYXEucHVzaChbJ3Jlc2V0VXNlcklkJ10pO1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydkZWxldGVDdXN0b21WYXJpYWJsZScsIDEsICd1c2VyJ10pO1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydkZWxldGVDdXN0b21WYXJpYWJsZScsIDIsICduYW1lJ10pO1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydkZWxldGVDdXN0b21WYXJpYWJsZScsIDMsICdwcm9maWxzJ10pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydzZXRVc2VySWQnLCB1c2VyLmlkXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBgJHt1c2VyLmZpcnN0TmFtZX0gJHt1c2VyLmxhc3ROYW1lfWA7XHJcbiAgICAgICAgdGhpcy5wYXEucHVzaChbJ3NldEN1c3RvbVZhcmlhYmxlJywgMSwgJ3VzZXInLCB1c2VyLnNvdXJjZUlkLCAndmlzaXQnXSk7XHJcbiAgICAgICAgdGhpcy5wYXEucHVzaChbJ3NldEN1c3RvbVZhcmlhYmxlJywgMiwgJ25hbWUnLCBuYW1lLCAndmlzaXQnXSk7XHJcbiAgICAgICAgdGhpcy5wYXEucHVzaChbJ3NldEN1c3RvbVZhcmlhYmxlJywgMywgJ3Byb2ZpbHMnLCBwcm9maWxzLCAndmlzaXQnXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucGFxLnB1c2goWyd0cmFja1BhZ2VWaWV3J10pO1xyXG4gICAgICB0aGlzLnBhcS5wdXNoKFsnZW5hYmxlTGlua1RyYWNraW5nJ10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRyYWNrU2VhcmNoKHRlcm06IHN0cmluZywgbmJSZXN1bHRzOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT09ICdtYXRvbW8nKSB7XHJcbiAgICAgIHRoaXMucGFxLnB1c2goWyd0cmFja1NpdGVTZWFyY2gnLCB0ZXJtLCBmYWxzZSwgbmJSZXN1bHRzXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJhY2tFdmVudChjYXRlZ29yeTogc3RyaW5nLCBhY3Rpb246IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09PSAnbWF0b21vJykge1xyXG4gICAgICB0aGlzLnBhcS5wdXNoKFsndHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIG5hbWVdKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19