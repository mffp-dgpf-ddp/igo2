/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { RouteService, ConfigService, MessageService } from '@igo2/core';
import { RoutingFormService } from '@igo2/geo';
import { ContextService } from '../../context-manager/shared/context.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "../../context-manager/shared/context.service";
import * as i3 from "@igo2/geo";
export class ShareMapService {
    /**
     * @param {?} config
     * @param {?} contextService
     * @param {?} messageService
     * @param {?} routingFormService
     * @param {?} route
     */
    constructor(config, contextService, messageService, routingFormService, route) {
        this.config = config;
        this.contextService = contextService;
        this.messageService = messageService;
        this.routingFormService = routingFormService;
        this.route = route;
        this.apiUrl = this.config.getConfig('context.url');
    }
    /**
     * @param {?} map
     * @param {?} formValues
     * @param {?} publicShareOption
     * @return {?}
     */
    getUrl(map, formValues, publicShareOption) {
        if (this.apiUrl) {
            return this.getUrlWithApi(map, formValues);
        }
        return this.getUrlWithoutApi(map, publicShareOption);
    }
    /**
     * @param {?} map
     * @param {?} formValues
     * @return {?}
     */
    getUrlWithApi(map, formValues) {
        /** @type {?} */
        const context = this.contextService.getContextFromMap(map);
        context.scope = 'public';
        context.title = formValues.title;
        context.uri = formValues.uri;
        this.contextService.create(context).subscribe((/**
         * @param {?} rep
         * @return {?}
         */
        rep => { }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            err.error.title = 'Share Map';
            this.messageService.showError(err);
        }));
        return `${location.origin + location.pathname}?context=${formValues.uri}`;
    }
    /**
     * @param {?} map
     * @param {?} publicShareOption
     * @return {?}
     */
    getUrlWithoutApi(map, publicShareOption) {
        if (!this.route ||
            !this.route.options.visibleOnLayersKey ||
            !this.route.options.visibleOffLayersKey ||
            !map.getZoom()) {
            return;
        }
        /** @type {?} */
        const llc = publicShareOption.layerlistControls.querystring;
        /** @type {?} */
        const visibleKey = this.route.options.visibleOnLayersKey;
        /** @type {?} */
        const invisibleKey = this.route.options.visibleOffLayersKey;
        /** @type {?} */
        const layers = map.layers;
        /** @type {?} */
        const routingKey = this.route.options.routingCoordKey;
        /** @type {?} */
        const stopsCoordinates = [];
        if (this.routingFormService &&
            this.routingFormService.getStopsCoordinates() &&
            this.routingFormService.getStopsCoordinates().length !== 0) {
            this.routingFormService.getStopsCoordinates().forEach((/**
             * @param {?} coord
             * @return {?}
             */
            coord => {
                stopsCoordinates.push(coord);
            }));
        }
        /** @type {?} */
        let routingUrl = '';
        if (stopsCoordinates.length >= 2) {
            routingUrl = `${routingKey}=${stopsCoordinates.join(';')}`;
        }
        /** @type {?} */
        const visibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => lay.visible));
        /** @type {?} */
        const invisibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => !lay.visible));
        /** @type {?} */
        let layersUrl = '';
        /** @type {?} */
        let layersToLoop = [];
        if (visibleLayers.length > invisibleLayers.length) {
            layersUrl = `${visibleKey}=*&${invisibleKey}=`;
            layersToLoop = invisibleLayers;
        }
        else {
            layersUrl = `${invisibleKey}=*&${visibleKey}=`;
            layersToLoop = visibleLayers;
        }
        for (const layer of layersToLoop) {
            if (layer.id) {
                layersUrl += layer.id + ',';
            }
        }
        layersUrl = layersUrl.substr(0, layersUrl.length - 1);
        /** @type {?} */
        const zoom = 'zoom=' + map.getZoom();
        /** @type {?} */
        const arrayCenter = map.getCenter('EPSG:4326') || [];
        /** @type {?} */
        const center = 'center=' + arrayCenter.toString();
        /** @type {?} */
        let context = '';
        if (this.contextService.context$.value) {
            context = 'context=' + this.contextService.context$.value.uri;
        }
        return `${location.origin}${location.pathname}?${context}&${zoom}&${center}&${layersUrl}&${llc}&${routingUrl}`.replace(/&&/g, '&');
    }
}
ShareMapService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ShareMapService.ctorParameters = () => [
    { type: ConfigService },
    { type: ContextService },
    { type: MessageService },
    { type: RoutingFormService, decorators: [{ type: Optional }] },
    { type: RouteService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ ShareMapService.ngInjectableDef = i0.defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(i0.inject(i1.ConfigService), i0.inject(i2.ContextService), i0.inject(i1.MessageService), i0.inject(i3.RoutingFormService, 8), i0.inject(i1.RouteService, 8)); }, token: ShareMapService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShareMapService.prototype.apiUrl;
    /**
     * @type {?}
     * @private
     */
    ShareMapService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ShareMapService.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    ShareMapService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ShareMapService.prototype.routingFormService;
    /**
     * @type {?}
     * @private
     */
    ShareMapService.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlLW1hcC9zaGFyZWQvc2hhcmUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6RSxPQUFPLEVBQVUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7OztBQUs5RSxNQUFNLE9BQU8sZUFBZTs7Ozs7Ozs7SUFHMUIsWUFDVSxNQUFxQixFQUNyQixjQUE4QixFQUM5QixjQUE4QixFQUNsQixrQkFBc0MsRUFDdEMsS0FBbUI7UUFKL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLFVBQVUsRUFBRSxpQkFBaUI7UUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7OztJQUVELGFB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Qzs7Ozs7SUFDdEMseUNBQXNDOzs7OztJQUN0Qyw2Q0FBMEQ7Ozs7O0lBQzFELGdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsIE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb01hcCwgUm91dGluZ0Zvcm1TZXJ2aWNlIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29udGV4dC1tYW5hZ2VyL3NoYXJlZC9jb250ZXh0LnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2hhcmVNYXBTZXJ2aWNlIHtcclxuICBwcml2YXRlIGFwaVVybDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGluZ0Zvcm1TZXJ2aWNlOiBSb3V0aW5nRm9ybVNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuYXBpVXJsID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdjb250ZXh0LnVybCcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXJsKG1hcDogSWdvTWFwLCBmb3JtVmFsdWVzLCBwdWJsaWNTaGFyZU9wdGlvbikge1xyXG4gICAgaWYgKHRoaXMuYXBpVXJsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFVybFdpdGhBcGkobWFwLCBmb3JtVmFsdWVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmdldFVybFdpdGhvdXRBcGkobWFwLCBwdWJsaWNTaGFyZU9wdGlvbik7XHJcbiAgfVxyXG5cclxuICBnZXRVcmxXaXRoQXBpKG1hcDogSWdvTWFwLCBmb3JtVmFsdWVzKSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0U2VydmljZS5nZXRDb250ZXh0RnJvbU1hcChtYXApO1xyXG4gICAgY29udGV4dC5zY29wZSA9ICdwdWJsaWMnO1xyXG4gICAgY29udGV4dC50aXRsZSA9IGZvcm1WYWx1ZXMudGl0bGU7XHJcbiAgICBjb250ZXh0LnVyaSA9IGZvcm1WYWx1ZXMudXJpO1xyXG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5jcmVhdGUoY29udGV4dCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXAgPT4ge30sXHJcbiAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgZXJyLmVycm9yLnRpdGxlID0gJ1NoYXJlIE1hcCc7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93RXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBgJHtsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZX0/Y29udGV4dD0ke2Zvcm1WYWx1ZXMudXJpfWA7XHJcbiAgfVxyXG5cclxuICBnZXRVcmxXaXRob3V0QXBpKG1hcDogSWdvTWFwLCBwdWJsaWNTaGFyZU9wdGlvbikge1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5yb3V0ZSB8fFxyXG4gICAgICAhdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleSB8fFxyXG4gICAgICAhdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXkgfHxcclxuICAgICAgIW1hcC5nZXRab29tKClcclxuICAgICkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBsbGMgPSBwdWJsaWNTaGFyZU9wdGlvbi5sYXllcmxpc3RDb250cm9scy5xdWVyeXN0cmluZztcclxuXHJcbiAgICBjb25zdCB2aXNpYmxlS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleTtcclxuICAgIGNvbnN0IGludmlzaWJsZUtleSA9IHRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5O1xyXG4gICAgY29uc3QgbGF5ZXJzID0gbWFwLmxheWVycztcclxuXHJcbiAgICBjb25zdCByb3V0aW5nS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnJvdXRpbmdDb29yZEtleTtcclxuICAgIGNvbnN0IHN0b3BzQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UgJiZcclxuICAgICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpICYmXHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKS5sZW5ndGggIT09IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgc3RvcHNDb29yZGluYXRlcy5wdXNoKGNvb3JkKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcm91dGluZ1VybCA9ICcnO1xyXG4gICAgaWYgKHN0b3BzQ29vcmRpbmF0ZXMubGVuZ3RoID49IDIpIHtcclxuICAgICAgcm91dGluZ1VybCA9IGAke3JvdXRpbmdLZXl9PSR7c3RvcHNDb29yZGluYXRlcy5qb2luKCc7Jyl9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aXNpYmxlTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcihsYXkgPT4gbGF5LnZpc2libGUpO1xyXG4gICAgY29uc3QgaW52aXNpYmxlTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcihsYXkgPT4gIWxheS52aXNpYmxlKTtcclxuXHJcbiAgICBsZXQgbGF5ZXJzVXJsID0gJyc7XHJcbiAgICBsZXQgbGF5ZXJzVG9Mb29wID0gW107XHJcbiAgICBpZiAodmlzaWJsZUxheWVycy5sZW5ndGggPiBpbnZpc2libGVMYXllcnMubGVuZ3RoKSB7XHJcbiAgICAgIGxheWVyc1VybCA9IGAke3Zpc2libGVLZXl9PSomJHtpbnZpc2libGVLZXl9PWA7XHJcbiAgICAgIGxheWVyc1RvTG9vcCA9IGludmlzaWJsZUxheWVycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxheWVyc1VybCA9IGAke2ludmlzaWJsZUtleX09KiYke3Zpc2libGVLZXl9PWA7XHJcbiAgICAgIGxheWVyc1RvTG9vcCA9IHZpc2libGVMYXllcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnNUb0xvb3ApIHtcclxuICAgICAgaWYgKGxheWVyLmlkKSB7XHJcbiAgICAgICAgbGF5ZXJzVXJsICs9IGxheWVyLmlkICsgJywnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsYXllcnNVcmwgPSBsYXllcnNVcmwuc3Vic3RyKDAsIGxheWVyc1VybC5sZW5ndGggLSAxKTtcclxuXHJcbiAgICBjb25zdCB6b29tID0gJ3pvb209JyArIG1hcC5nZXRab29tKCk7XHJcbiAgICBjb25zdCBhcnJheUNlbnRlciA9IG1hcC5nZXRDZW50ZXIoJ0VQU0c6NDMyNicpIHx8IFtdO1xyXG4gICAgY29uc3QgY2VudGVyID0gJ2NlbnRlcj0nICsgYXJyYXlDZW50ZXIudG9TdHJpbmcoKTtcclxuICAgIGxldCBjb250ZXh0ID0gJyc7XHJcbiAgICBpZiAodGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZSkge1xyXG4gICAgICBjb250ZXh0ID0gJ2NvbnRleHQ9JyArIHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCQudmFsdWUudXJpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgJHtsb2NhdGlvbi5vcmlnaW59JHtcclxuICAgICAgbG9jYXRpb24ucGF0aG5hbWVcclxuICAgIH0/JHtjb250ZXh0fSYke3pvb219JiR7Y2VudGVyfSYke2xheWVyc1VybH0mJHtsbGN9JiR7cm91dGluZ1VybH1gLnJlcGxhY2UoLyYmL2csICcmJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==