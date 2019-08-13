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
            !map.viewController.getZoom()) {
            return;
        }
        /** @type {?} */
        const llc = publicShareOption.layerlistControls.querystring;
        /** @type {?} */
        let visibleKey = this.route.options.visibleOnLayersKey;
        /** @type {?} */
        let invisibleKey = this.route.options.visibleOffLayersKey;
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
        if (visibleLayers.length === 0) {
            visibleKey = '';
        }
        if (invisibleLayers.length === 0) {
            invisibleKey = '';
        }
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
        let zoom = 'zoom=' + map.viewController.getZoom();
        /** @type {?} */
        const arrayCenter = map.viewController.getCenter('EPSG:4326') || [];
        /** @type {?} */
        const long = arrayCenter[0].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const lat = arrayCenter[1].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const center = `center=${long},${lat}`.replace(/.00000/g, '');
        /** @type {?} */
        let context = '';
        if (this.contextService.context$.value) {
            if (this.contextService.context$.value.uri !== '_default') {
                context = 'context=' + this.contextService.context$.value.uri;
            }
            if (this.contextService.context$.value.map.view.zoom) {
                zoom =
                    this.contextService.context$.value.map.view.zoom ===
                        map.viewController.getZoom()
                        ? ''
                        : 'zoom=' + map.viewController.getZoom();
            }
        }
        /** @type {?} */
        let url = `${location.origin}${location.pathname}?${context}&${zoom}&${center}&${layersUrl}&${llc}&${routingUrl}`;
        for (let i = 0; i < 5; i++) {
            url = url.replace(/&&/g, '&');
            url = url.endsWith('&') ? url.slice(0, -1) : url;
        }
        url = url.endsWith('&') ? url.slice(0, -1) : url;
        url = url.replace('?&', '?');
        return url;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlLW1hcC9zaGFyZWQvc2hhcmUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6RSxPQUFPLEVBQVUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7OztBQUs5RSxNQUFNLE9BQU8sZUFBZTs7Ozs7Ozs7SUFHMUIsWUFDVSxNQUFxQixFQUNyQixjQUE4QixFQUM5QixjQUE4QixFQUNsQixrQkFBc0MsRUFDdEMsS0FBbUI7UUFKL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLFVBQVUsRUFBRSxpQkFBaUI7UUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7OztJQUVELGFB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2pELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OztZQS9IRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQc0IsYUFBYTtZQUczQixjQUFjO1lBSGUsY0FBYztZQUNuQyxrQkFBa0IsdUJBYzlCLFFBQVE7WUFmSixZQUFZLHVCQWdCaEIsUUFBUTs7Ozs7Ozs7SUFQWCxpQ0FBdUI7Ozs7O0lBR3JCLGlDQUE2Qjs7Ozs7SUFDN0IseUNBQXNDOzs7OztJQUN0Qyx5Q0FBc0M7Ozs7O0lBQ3RDLDZDQUEwRDs7Ozs7SUFDMUQsZ0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSwgQ29uZmlnU2VydmljZSwgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwLCBSb3V0aW5nRm9ybVNlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZU1hcFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgYXBpVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0aW5nRm9ybVNlcnZpY2U6IFJvdXRpbmdGb3JtU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5hcGlVcmwgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NvbnRleHQudXJsJyk7XHJcbiAgfVxyXG5cclxuICBnZXRVcmwobWFwOiBJZ29NYXAsIGZvcm1WYWx1ZXMsIHB1YmxpY1NoYXJlT3B0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5hcGlVcmwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsV2l0aEFwaShtYXAsIGZvcm1WYWx1ZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VXJsV2l0aG91dEFwaShtYXAsIHB1YmxpY1NoYXJlT3B0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldFVybFdpdGhBcGkobWFwOiBJZ29NYXAsIGZvcm1WYWx1ZXMpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTWFwKG1hcCk7XHJcbiAgICBjb250ZXh0LnNjb3BlID0gJ3B1YmxpYyc7XHJcbiAgICBjb250ZXh0LnRpdGxlID0gZm9ybVZhbHVlcy50aXRsZTtcclxuICAgIGNvbnRleHQudXJpID0gZm9ybVZhbHVlcy51cmk7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNyZWF0ZShjb250ZXh0KS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcCA9PiB7fSxcclxuICAgICAgZXJyID0+IHtcclxuICAgICAgICBlcnIuZXJyb3IudGl0bGUgPSAnU2hhcmUgTWFwJztcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dFcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lfT9jb250ZXh0PSR7Zm9ybVZhbHVlcy51cml9YDtcclxuICB9XHJcblxyXG4gIGdldFVybFdpdGhvdXRBcGkobWFwOiBJZ29NYXAsIHB1YmxpY1NoYXJlT3B0aW9uKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnJvdXRlIHx8XHJcbiAgICAgICF0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5IHx8XHJcbiAgICAgICF0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleSB8fFxyXG4gICAgICAhbWFwLnZpZXdDb250cm9sbGVyLmdldFpvb20oKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxsYyA9IHB1YmxpY1NoYXJlT3B0aW9uLmxheWVybGlzdENvbnRyb2xzLnF1ZXJ5c3RyaW5nO1xyXG5cclxuICAgIGxldCB2aXNpYmxlS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleTtcclxuICAgIGxldCBpbnZpc2libGVLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleTtcclxuICAgIGNvbnN0IGxheWVycyA9IG1hcC5sYXllcnM7XHJcblxyXG4gICAgY29uc3Qgcm91dGluZ0tleSA9IHRoaXMucm91dGUub3B0aW9ucy5yb3V0aW5nQ29vcmRLZXk7XHJcbiAgICBjb25zdCBzdG9wc0Nvb3JkaW5hdGVzID0gW107XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlICYmXHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKSAmJlxyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkubGVuZ3RoICE9PSAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgIHN0b3BzQ29vcmRpbmF0ZXMucHVzaChjb29yZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvdXRpbmdVcmwgPSAnJztcclxuICAgIGlmIChzdG9wc0Nvb3JkaW5hdGVzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgIHJvdXRpbmdVcmwgPSBgJHtyb3V0aW5nS2V5fT0ke3N0b3BzQ29vcmRpbmF0ZXMuam9pbignOycpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlzaWJsZUxheWVycyA9IGxheWVycy5maWx0ZXIobGF5ID0+IGxheS52aXNpYmxlKTtcclxuICAgIGNvbnN0IGludmlzaWJsZUxheWVycyA9IGxheWVycy5maWx0ZXIobGF5ID0+ICFsYXkudmlzaWJsZSk7XHJcblxyXG4gICAgaWYgKHZpc2libGVMYXllcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHZpc2libGVLZXkgPSAnJztcclxuICAgIH1cclxuICAgIGlmIChpbnZpc2libGVMYXllcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGludmlzaWJsZUtleSA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXllcnNVcmwgPSAnJztcclxuICAgIGxldCBsYXllcnNUb0xvb3AgPSBbXTtcclxuICAgIGlmICh2aXNpYmxlTGF5ZXJzLmxlbmd0aCA+IGludmlzaWJsZUxheWVycy5sZW5ndGgpIHtcclxuICAgICAgbGF5ZXJzVXJsID0gYCR7dmlzaWJsZUtleX09KiYke2ludmlzaWJsZUtleX09YDtcclxuICAgICAgbGF5ZXJzVG9Mb29wID0gaW52aXNpYmxlTGF5ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzVXJsID0gYCR7aW52aXNpYmxlS2V5fT0qJiR7dmlzaWJsZUtleX09YDtcclxuICAgICAgbGF5ZXJzVG9Mb29wID0gdmlzaWJsZUxheWVycztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVyc1RvTG9vcCkge1xyXG4gICAgICBpZiAobGF5ZXIuaWQpIHtcclxuICAgICAgICBsYXllcnNVcmwgKz0gbGF5ZXIuaWQgKyAnLCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxheWVyc1VybCA9IGxheWVyc1VybC5zdWJzdHIoMCwgbGF5ZXJzVXJsLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIGxldCB6b29tID0gJ3pvb209JyArIG1hcC52aWV3Q29udHJvbGxlci5nZXRab29tKCk7XHJcbiAgICBjb25zdCBhcnJheUNlbnRlciA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRDZW50ZXIoJ0VQU0c6NDMyNicpIHx8IFtdO1xyXG4gICAgY29uc3QgbG9uZyA9IGFycmF5Q2VudGVyWzBdLnRvRml4ZWQoNSkucmVwbGFjZSgvXFwuKFteMF0rKTArJC8sICcuJDEnKTtcclxuICAgIGNvbnN0IGxhdCA9IGFycmF5Q2VudGVyWzFdLnRvRml4ZWQoNSkucmVwbGFjZSgvXFwuKFteMF0rKTArJC8sICcuJDEnKTtcclxuICAgIGNvbnN0IGNlbnRlciA9IGBjZW50ZXI9JHtsb25nfSwke2xhdH1gLnJlcGxhY2UoLy4wMDAwMC9nLCAnJyk7XHJcbiAgICBsZXQgY29udGV4dCA9ICcnO1xyXG4gICAgaWYgKHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCQudmFsdWUpIHtcclxuICAgICAgaWYgKHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCQudmFsdWUudXJpICE9PSAnX2RlZmF1bHQnKSB7XHJcbiAgICAgICAgY29udGV4dCA9ICdjb250ZXh0PScgKyB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLnVyaTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZS5tYXAudmlldy56b29tKSB7XHJcbiAgICAgICAgem9vbSA9XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLm1hcC52aWV3Lnpvb20gPT09XHJcbiAgICAgICAgICBtYXAudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpXHJcbiAgICAgICAgICAgID8gJydcclxuICAgICAgICAgICAgOiAnem9vbT0nICsgbWFwLnZpZXdDb250cm9sbGVyLmdldFpvb20oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB1cmwgPSBgJHtsb2NhdGlvbi5vcmlnaW59JHtcclxuICAgICAgbG9jYXRpb24ucGF0aG5hbWVcclxuICAgIH0/JHtjb250ZXh0fSYke3pvb219JiR7Y2VudGVyfSYke2xheWVyc1VybH0mJHtsbGN9JiR7cm91dGluZ1VybH1gO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKC8mJi9nLCAnJicpO1xyXG4gICAgICB1cmwgPSB1cmwuZW5kc1dpdGgoJyYnKSA/IHVybC5zbGljZSgwLCAtMSkgOiB1cmw7XHJcbiAgICB9XHJcbiAgICB1cmwgPSB1cmwuZW5kc1dpdGgoJyYnKSA/IHVybC5zbGljZSgwLCAtMSkgOiB1cmw7XHJcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgnPyYnLCAnPycpO1xyXG5cclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG59XHJcbiJdfQ==