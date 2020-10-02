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
     * @return {?}
     */
    get paq() {
        return (((/** @type {?} */ (window)))._paq = ((/** @type {?} */ (window)))._paq || []);
    }
    /**
     * @private
     * @return {?}
     */
    initMatomo() {
        if (!this.options.url || !this.options.id) {
            return;
        }
        /** @type {?} */
        const url = this.options.url.substr(-1) === '/'
            ? this.options.url + 'matomo'
            : this.options.url;
        // this.paq.push(['trackPageView']);
        // this.paq.push(['enableLinkTracking']);
        ((/**
         * @return {?}
         */
        () => {
            this.paq.push(['setTrackerUrl', url + '.php']);
            this.paq.push(['setSiteId', this.options.id]);
            /** @type {?} */
            const g = document.createElement('script');
            /** @type {?} */
            const s = document.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = url + '.js';
            s.parentNode.insertBefore(g, s);
        }))();
    }
    /**
     * @param {?=} user
     * @param {?=} profils
     * @return {?}
     */
    setUser(user, profils) {
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
                const name = `${user.firstName} ${user.lastName}`;
                this.paq.push(['setCustomVariable', 1, 'user', user.sourceId, 'visit']);
                this.paq.push(['setCustomVariable', 2, 'name', name, 'visit']);
                this.paq.push(['setCustomVariable', 3, 'profils', profils, 'visit']);
            }
            this.paq.push(['trackPageView']);
            this.paq.push(['enableLinkTracking']);
        }
    }
    /**
     * @param {?} term
     * @param {?} nbResults
     * @return {?}
     */
    trackSearch(term, nbResults) {
        if (this.options.provider === 'matomo') {
            this.paq.push(['trackSiteSearch', term, false, nbResults]);
        }
    }
    /**
     * @param {?} category
     * @param {?} action
     * @param {?} name
     * @return {?}
     */
    trackEvent(category, action, name) {
        if (this.options.provider === 'matomo') {
            this.paq.push(['trackEvent', category, action, name]);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FuYWx5dGljcy9zaGFyZWQvYW5hbHl0aWNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFPNUQsTUFBTSxPQUFPLGdCQUFnQjs7OztJQU8zQixZQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7SUFWRCxJQUFJLEdBQUc7UUFDTCxPQUFPLENBQUMsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBVU8sVUFBVTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxPQUFPO1NBQ1I7O2NBQ0ssR0FBRyxHQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7WUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVE7WUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FB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S0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDOzs7Ozs7O0lBRU0sVUFBVSxDQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLElBQVk7UUFDOUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQzs7O1lBakZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQU5RLGFBQWE7Ozs7Ozs7O0lBUXBCLG1DQUFrQzs7Ozs7SUFNdEIsa0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBBbmFseXRpY3NPcHRpb25zIH0gZnJvbSAnLi9hbmFseXRpY3MuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgb3B0aW9uczogQW5hbHl0aWNzT3B0aW9ucztcclxuXHJcbiAgZ2V0IHBhcSgpIHtcclxuICAgIHJldHVybiAoKHdpbmRvdyBhcyBhbnkpLl9wYXEgPSAod2luZG93IGFzIGFueSkuX3BhcSB8fCBbXSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdhbmFseXRpY3MnKSB8fCB7fTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09PSAnbWF0b21vJykge1xyXG4gICAgICB0aGlzLmluaXRNYXRvbW8oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdE1hdG9tbygpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnVybCB8fCAhdGhpcy5vcHRpb25zLmlkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHVybCA9XHJcbiAgICAgIHRoaXMub3B0aW9ucy51cmwuc3Vic3RyKC0xKSA9PT0gJy8nXHJcbiAgICAgICAgPyB0aGlzLm9wdGlvbnMudXJsICsgJ21hdG9tbydcclxuICAgICAgICA6IHRoaXMub3B0aW9ucy51cmw7XHJcblxyXG4gICAgLy8gdGhpcy5wYXEucHVzaChbJ3RyYWNrUGFnZVZpZXcnXSk7XHJcbiAgICAvLyB0aGlzLnBhcS5wdXNoKFsnZW5hYmxlTGlua1RyYWNraW5nJ10pO1xyXG4gICAgKCgpID0+IHtcclxuICAgICAgdGhpcy5wYXEucHVzaChbJ3NldFRyYWNrZXJVcmwnLCB1cmwgKyAnLnBocCddKTtcclxuICAgICAgdGhpcy5wYXEucHVzaChbJ3NldFNpdGVJZCcsIHRoaXMub3B0aW9ucy5pZF0pO1xyXG4gICAgICBjb25zdCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbiAgICAgIGcudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICBnLmFzeW5jID0gdHJ1ZTtcclxuICAgICAgZy5kZWZlciA9IHRydWU7XHJcbiAgICAgIGcuc3JjID0gdXJsICsgJy5qcyc7XHJcbiAgICAgIHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZywgcyk7XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFVzZXIoXHJcbiAgICB1c2VyPzoge1xyXG4gICAgICBpZDogbnVtYmVyO1xyXG4gICAgICBzb3VyY2VJZD86IHN0cmluZztcclxuICAgICAgZmlyc3ROYW1lPzogc3RyaW5nO1xyXG4gICAgICBsYXN0TmFtZT86IHN0cmluZztcclxuICAgIH0sXHJcbiAgICBwcm9maWxzPzogc3RyaW5nW11cclxuICApIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvdmlkZXIgPT09ICdtYXRvbW8nKSB7XHJcbiAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydyZXNldFVzZXJJZCddKTtcclxuICAgICAgICB0aGlzLnBhcS5wdXNoKFsnZGVsZXRlQ3VzdG9tVmFyaWFibGUnLCAxLCAndXNlciddKTtcclxuICAgICAgICB0aGlzLnBhcS5wdXNoKFsnZGVsZXRlQ3VzdG9tVmFyaWFibGUnLCAyLCAnbmFtZSddKTtcclxuICAgICAgICB0aGlzLnBhcS5wdXNoKFsnZGVsZXRlQ3VzdG9tVmFyaWFibGUnLCAzLCAncHJvZmlscyddKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhcS5wdXNoKFsnc2V0VXNlcklkJywgdXNlci5pZF0pO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gYCR7dXNlci5maXJzdE5hbWV9ICR7dXNlci5sYXN0TmFtZX1gO1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydzZXRDdXN0b21WYXJpYWJsZScsIDEsICd1c2VyJywgdXNlci5zb3VyY2VJZCwgJ3Zpc2l0J10pO1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydzZXRDdXN0b21WYXJpYWJsZScsIDIsICduYW1lJywgbmFtZSwgJ3Zpc2l0J10pO1xyXG4gICAgICAgIHRoaXMucGFxLnB1c2goWydzZXRDdXN0b21WYXJpYWJsZScsIDMsICdwcm9maWxzJywgcHJvZmlscywgJ3Zpc2l0J10pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnBhcS5wdXNoKFsndHJhY2tQYWdlVmlldyddKTtcclxuICAgICAgdGhpcy5wYXEucHVzaChbJ2VuYWJsZUxpbmtUcmFja2luZyddKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cmFja1NlYXJjaCh0ZXJtOiBzdHJpbmcsIG5iUmVzdWx0czogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3ZpZGVyID09PSAnbWF0b21vJykge1xyXG4gICAgICB0aGlzLnBhcS5wdXNoKFsndHJhY2tTaXRlU2VhcmNoJywgdGVybSwgZmFsc2UsIG5iUmVzdWx0c10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRyYWNrRXZlbnQoY2F0ZWdvcnk6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm92aWRlciA9PT0gJ21hdG9tbycpIHtcclxuICAgICAgdGhpcy5wYXEucHVzaChbJ3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBuYW1lXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==