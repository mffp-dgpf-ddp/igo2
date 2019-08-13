/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { RouteService, ConfigService, MessageService } from '@igo2/core';
import { RoutingFormService } from '@igo2/geo';
import { ContextService } from '../../context-manager/shared/context.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "../../context-manager/shared/context.service";
import * as i3 from "@igo2/geo";
var ShareMapService = /** @class */ (function () {
    function ShareMapService(config, contextService, messageService, routingFormService, route) {
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
    ShareMapService.prototype.getUrl = /**
     * @param {?} map
     * @param {?} formValues
     * @param {?} publicShareOption
     * @return {?}
     */
    function (map, formValues, publicShareOption) {
        if (this.apiUrl) {
            return this.getUrlWithApi(map, formValues);
        }
        return this.getUrlWithoutApi(map, publicShareOption);
    };
    /**
     * @param {?} map
     * @param {?} formValues
     * @return {?}
     */
    ShareMapService.prototype.getUrlWithApi = /**
     * @param {?} map
     * @param {?} formValues
     * @return {?}
     */
    function (map, formValues) {
        var _this = this;
        /** @type {?} */
        var context = this.contextService.getContextFromMap(map);
        context.scope = 'public';
        context.title = formValues.title;
        context.uri = formValues.uri;
        this.contextService.create(context).subscribe((/**
         * @param {?} rep
         * @return {?}
         */
        function (rep) { }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            err.error.title = 'Share Map';
            _this.messageService.showError(err);
        }));
        return location.origin + location.pathname + "?context=" + formValues.uri;
    };
    /**
     * @param {?} map
     * @param {?} publicShareOption
     * @return {?}
     */
    ShareMapService.prototype.getUrlWithoutApi = /**
     * @param {?} map
     * @param {?} publicShareOption
     * @return {?}
     */
    function (map, publicShareOption) {
        var e_1, _a;
        if (!this.route ||
            !this.route.options.visibleOnLayersKey ||
            !this.route.options.visibleOffLayersKey ||
            !map.viewController.getZoom()) {
            return;
        }
        /** @type {?} */
        var llc = publicShareOption.layerlistControls.querystring;
        /** @type {?} */
        var visibleKey = this.route.options.visibleOnLayersKey;
        /** @type {?} */
        var invisibleKey = this.route.options.visibleOffLayersKey;
        /** @type {?} */
        var layers = map.layers;
        /** @type {?} */
        var routingKey = this.route.options.routingCoordKey;
        /** @type {?} */
        var stopsCoordinates = [];
        if (this.routingFormService &&
            this.routingFormService.getStopsCoordinates() &&
            this.routingFormService.getStopsCoordinates().length !== 0) {
            this.routingFormService.getStopsCoordinates().forEach((/**
             * @param {?} coord
             * @return {?}
             */
            function (coord) {
                stopsCoordinates.push(coord);
            }));
        }
        /** @type {?} */
        var routingUrl = '';
        if (stopsCoordinates.length >= 2) {
            routingUrl = routingKey + "=" + stopsCoordinates.join(';');
        }
        /** @type {?} */
        var visibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        function (lay) { return lay.visible; }));
        /** @type {?} */
        var invisibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        function (lay) { return !lay.visible; }));
        if (visibleLayers.length === 0) {
            visibleKey = '';
        }
        if (invisibleLayers.length === 0) {
            invisibleKey = '';
        }
        /** @type {?} */
        var layersUrl = '';
        /** @type {?} */
        var layersToLoop = [];
        if (visibleLayers.length > invisibleLayers.length) {
            layersUrl = visibleKey + "=*&" + invisibleKey + "=";
            layersToLoop = invisibleLayers;
        }
        else {
            layersUrl = invisibleKey + "=*&" + visibleKey + "=";
            layersToLoop = visibleLayers;
        }
        try {
            for (var layersToLoop_1 = tslib_1.__values(layersToLoop), layersToLoop_1_1 = layersToLoop_1.next(); !layersToLoop_1_1.done; layersToLoop_1_1 = layersToLoop_1.next()) {
                var layer = layersToLoop_1_1.value;
                if (layer.id) {
                    layersUrl += layer.id + ',';
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (layersToLoop_1_1 && !layersToLoop_1_1.done && (_a = layersToLoop_1.return)) _a.call(layersToLoop_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        layersUrl = layersUrl.substr(0, layersUrl.length - 1);
        /** @type {?} */
        var zoom = 'zoom=' + map.viewController.getZoom();
        /** @type {?} */
        var arrayCenter = map.viewController.getCenter('EPSG:4326') || [];
        /** @type {?} */
        var long = arrayCenter[0].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        var lat = arrayCenter[1].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        var center = ("center=" + long + "," + lat).replace(/.00000/g, '');
        /** @type {?} */
        var context = '';
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
        var url = "" + location.origin + location.pathname + "?" + context + "&" + zoom + "&" + center + "&" + layersUrl + "&" + llc + "&" + routingUrl;
        for (var i = 0; i < 5; i++) {
            url = url.replace(/&&/g, '&');
            url = url.endsWith('&') ? url.slice(0, -1) : url;
        }
        url = url.endsWith('&') ? url.slice(0, -1) : url;
        url = url.replace('?&', '?');
        return url;
    };
    ShareMapService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ShareMapService.ctorParameters = function () { return [
        { type: ConfigService },
        { type: ContextService },
        { type: MessageService },
        { type: RoutingFormService, decorators: [{ type: Optional }] },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ ShareMapService.ngInjectableDef = i0.defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(i0.inject(i1.ConfigService), i0.inject(i2.ContextService), i0.inject(i1.MessageService), i0.inject(i3.RoutingFormService, 8), i0.inject(i1.RouteService, 8)); }, token: ShareMapService, providedIn: "root" });
    return ShareMapService;
}());
export { ShareMapService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlLW1hcC9zaGFyZWQvc2hhcmUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekUsT0FBTyxFQUFVLGtCQUFrQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7QUFFOUU7SUFNRSx5QkFDVSxNQUFxQixFQUNyQixjQUE4QixFQUM5QixjQUE4QixFQUNsQixrQkFBc0MsRUFDdEMsS0FBbUI7UUFKL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFFRCxnQ0FBTTs7Ozs7O0lBQU4sVUFBTyxHQUFXLEVBQUUsVUFBVSxFQUFFLGlCQUFpQjtRQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7O0lBRUQsdUNBQWE7Ozs7O0lB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QyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDakQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0JBL0hGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUHNCLGFBQWE7Z0JBRzNCLGNBQWM7Z0JBSGUsY0FBYztnQkFDbkMsa0JBQWtCLHVCQWM5QixRQUFRO2dCQWZKLFlBQVksdUJBZ0JoQixRQUFROzs7MEJBbEJiO0NBdUlDLEFBaElELElBZ0lDO1NBN0hZLGVBQWU7Ozs7OztJQUMxQixpQ0FBdUI7Ozs7O0lBR3JCLGlDQUE2Qjs7Ozs7SUFDN0IseUNBQXNDOzs7OztJQUN0Qyx5Q0FBc0M7Ozs7O0lBQ3RDLDZDQUEwRDs7Ozs7SUFDMUQsZ0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSwgQ29uZmlnU2VydmljZSwgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwLCBSb3V0aW5nRm9ybVNlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZU1hcFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgYXBpVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0aW5nRm9ybVNlcnZpY2U6IFJvdXRpbmdGb3JtU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5hcGlVcmwgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NvbnRleHQudXJsJyk7XHJcbiAgfVxyXG5cclxuICBnZXRVcmwobWFwOiBJZ29NYXAsIGZvcm1WYWx1ZXMsIHB1YmxpY1NoYXJlT3B0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5hcGlVcmwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsV2l0aEFwaShtYXAsIGZvcm1WYWx1ZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VXJsV2l0aG91dEFwaShtYXAsIHB1YmxpY1NoYXJlT3B0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldFVybFdpdGhBcGkobWFwOiBJZ29NYXAsIGZvcm1WYWx1ZXMpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTWFwKG1hcCk7XHJcbiAgICBjb250ZXh0LnNjb3BlID0gJ3B1YmxpYyc7XHJcbiAgICBjb250ZXh0LnRpdGxlID0gZm9ybVZhbHVlcy50aXRsZTtcclxuICAgIGNvbnRleHQudXJpID0gZm9ybVZhbHVlcy51cmk7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNyZWF0ZShjb250ZXh0KS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcCA9PiB7fSxcclxuICAgICAgZXJyID0+IHtcclxuICAgICAgICBlcnIuZXJyb3IudGl0bGUgPSAnU2hhcmUgTWFwJztcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dFcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lfT9jb250ZXh0PSR7Zm9ybVZhbHVlcy51cml9YDtcclxuICB9XHJcblxyXG4gIGdldFVybFdpdGhvdXRBcGkobWFwOiBJZ29NYXAsIHB1YmxpY1NoYXJlT3B0aW9uKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnJvdXRlIHx8XHJcbiAgICAgICF0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5IHx8XHJcbiAgICAgICF0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleSB8fFxyXG4gICAgICAhbWFwLnZpZXdDb250cm9sbGVyLmdldFpvb20oKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxsYyA9IHB1YmxpY1NoYXJlT3B0aW9uLmxheWVybGlzdENvbnRyb2xzLnF1ZXJ5c3RyaW5nO1xyXG5cclxuICAgIGxldCB2aXNpYmxlS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPbkxheWVyc0tleTtcclxuICAgIGxldCBpbnZpc2libGVLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleTtcclxuICAgIGNvbnN0IGxheWVycyA9IG1hcC5sYXllcnM7XHJcblxyXG4gICAgY29uc3Qgcm91dGluZ0tleSA9IHRoaXMucm91dGUub3B0aW9ucy5yb3V0aW5nQ29vcmRLZXk7XHJcbiAgICBjb25zdCBzdG9wc0Nvb3JkaW5hdGVzID0gW107XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlICYmXHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKSAmJlxyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkubGVuZ3RoICE9PSAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgIHN0b3BzQ29vcmRpbmF0ZXMucHVzaChjb29yZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvdXRpbmdVcmwgPSAnJztcclxuICAgIGlmIChzdG9wc0Nvb3JkaW5hdGVzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgIHJvdXRpbmdVcmwgPSBgJHtyb3V0aW5nS2V5fT0ke3N0b3BzQ29vcmRpbmF0ZXMuam9pbignOycpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlzaWJsZUxheWVycyA9IGxheWVycy5maWx0ZXIobGF5ID0+IGxheS52aXNpYmxlKTtcclxuICAgIGNvbnN0IGludmlzaWJsZUxheWVycyA9IGxheWVycy5maWx0ZXIobGF5ID0+ICFsYXkudmlzaWJsZSk7XHJcblxyXG4gICAgaWYgKHZpc2libGVMYXllcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHZpc2libGVLZXkgPSAnJztcclxuICAgIH1cclxuICAgIGlmIChpbnZpc2libGVMYXllcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGludmlzaWJsZUtleSA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXllcnNVcmwgPSAnJztcclxuICAgIGxldCBsYXllcnNUb0xvb3AgPSBbXTtcclxuICAgIGlmICh2aXNpYmxlTGF5ZXJzLmxlbmd0aCA+IGludmlzaWJsZUxheWVycy5sZW5ndGgpIHtcclxuICAgICAgbGF5ZXJzVXJsID0gYCR7dmlzaWJsZUtleX09KiYke2ludmlzaWJsZUtleX09YDtcclxuICAgICAgbGF5ZXJzVG9Mb29wID0gaW52aXNpYmxlTGF5ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzVXJsID0gYCR7aW52aXNpYmxlS2V5fT0qJiR7dmlzaWJsZUtleX09YDtcclxuICAgICAgbGF5ZXJzVG9Mb29wID0gdmlzaWJsZUxheWVycztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVyc1RvTG9vcCkge1xyXG4gICAgICBpZiAobGF5ZXIuaWQpIHtcclxuICAgICAgICBsYXllcnNVcmwgKz0gbGF5ZXIuaWQgKyAnLCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxheWVyc1VybCA9IGxheWVyc1VybC5zdWJzdHIoMCwgbGF5ZXJzVXJsLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIGxldCB6b29tID0gJ3pvb209JyArIG1hcC52aWV3Q29udHJvbGxlci5nZXRab29tKCk7XHJcbiAgICBjb25zdCBhcnJheUNlbnRlciA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRDZW50ZXIoJ0VQU0c6NDMyNicpIHx8IFtdO1xyXG4gICAgY29uc3QgbG9uZyA9IGFycmF5Q2VudGVyWzBdLnRvRml4ZWQoNSkucmVwbGFjZSgvXFwuKFteMF0rKTArJC8sICcuJDEnKTtcclxuICAgIGNvbnN0IGxhdCA9IGFycmF5Q2VudGVyWzFdLnRvRml4ZWQoNSkucmVwbGFjZSgvXFwuKFteMF0rKTArJC8sICcuJDEnKTtcclxuICAgIGNvbnN0IGNlbnRlciA9IGBjZW50ZXI9JHtsb25nfSwke2xhdH1gLnJlcGxhY2UoLy4wMDAwMC9nLCAnJyk7XHJcbiAgICBsZXQgY29udGV4dCA9ICcnO1xyXG4gICAgaWYgKHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCQudmFsdWUpIHtcclxuICAgICAgaWYgKHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCQudmFsdWUudXJpICE9PSAnX2RlZmF1bHQnKSB7XHJcbiAgICAgICAgY29udGV4dCA9ICdjb250ZXh0PScgKyB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLnVyaTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZS5tYXAudmlldy56b29tKSB7XHJcbiAgICAgICAgem9vbSA9XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLm1hcC52aWV3Lnpvb20gPT09XHJcbiAgICAgICAgICBtYXAudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpXHJcbiAgICAgICAgICAgID8gJydcclxuICAgICAgICAgICAgOiAnem9vbT0nICsgbWFwLnZpZXdDb250cm9sbGVyLmdldFpvb20oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB1cmwgPSBgJHtsb2NhdGlvbi5vcmlnaW59JHtcclxuICAgICAgbG9jYXRpb24ucGF0aG5hbWVcclxuICAgIH0/JHtjb250ZXh0fSYke3pvb219JiR7Y2VudGVyfSYke2xheWVyc1VybH0mJHtsbGN9JiR7cm91dGluZ1VybH1gO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKC8mJi9nLCAnJicpO1xyXG4gICAgICB1cmwgPSB1cmwuZW5kc1dpdGgoJyYnKSA/IHVybC5zbGljZSgwLCAtMSkgOiB1cmw7XHJcbiAgICB9XHJcbiAgICB1cmwgPSB1cmwuZW5kc1dpdGgoJyYnKSA/IHVybC5zbGljZSgwLCAtMSkgOiB1cmw7XHJcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgnPyYnLCAnPycpO1xyXG5cclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG59XHJcbiJdfQ==