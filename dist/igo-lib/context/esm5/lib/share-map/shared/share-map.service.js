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
            !map.getZoom()) {
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
        var zoom = 'zoom=' + map.getZoom();
        /** @type {?} */
        var arrayCenter = map.getCenter('EPSG:4326') || [];
        /** @type {?} */
        var center = 'center=' + arrayCenter.toString();
        /** @type {?} */
        var context = '';
        if (this.contextService.context$.value) {
            context = 'context=' + this.contextService.context$.value.uri;
        }
        return ("" + location.origin + location.pathname + "?" + context + "&" + zoom + "&" + center + "&" + layersUrl + "&" + llc + "&" + routingUrl).replace(/&&/g, '&');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlLW1hcC9zaGFyZWQvc2hhcmUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekUsT0FBTyxFQUFVLGtCQUFrQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7QUFFOUU7SUFNRSx5QkFDVSxNQUFxQixFQUNyQixjQUE4QixFQUM5QixjQUE4QixFQUNsQixrQkFBc0MsRUFDdEMsS0FBbUI7UUFKL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFFRCxnQ0FBTTs7Ozs7O0lBQU4sVUFBTyxHQUFXLEVBQUUsVUFBVSxFQUFFLGlCQUFpQjtRQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7O0lBRUQsdUNBQWE7Ozs7O0lB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QixRQUFROzs7MEJBbEJiO0NBNEdDLEFBckdELElBcUdDO1NBbEdZLGVBQWU7Ozs7OztJQUMxQixpQ0FBdUI7Ozs7O0lBR3JCLGlDQUE2Qjs7Ozs7SUFDN0IseUNBQXNDOzs7OztJQUN0Qyx5Q0FBc0M7Ozs7O0lBQ3RDLDZDQUEwRDs7Ozs7SUFDMUQsZ0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSwgQ29uZmlnU2VydmljZSwgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwLCBSb3V0aW5nRm9ybVNlcnZpY2UgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZU1hcFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgYXBpVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0aW5nRm9ybVNlcnZpY2U6IFJvdXRpbmdGb3JtU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5hcGlVcmwgPSB0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2NvbnRleHQudXJsJyk7XHJcbiAgfVxyXG5cclxuICBnZXRVcmwobWFwOiBJZ29NYXAsIGZvcm1WYWx1ZXMsIHB1YmxpY1NoYXJlT3B0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5hcGlVcmwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsV2l0aEFwaShtYXAsIGZvcm1WYWx1ZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VXJsV2l0aG91dEFwaShtYXAsIHB1YmxpY1NoYXJlT3B0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldFVybFdpdGhBcGkobWFwOiBJZ29NYXAsIGZvcm1WYWx1ZXMpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTWFwKG1hcCk7XHJcbiAgICBjb250ZXh0LnNjb3BlID0gJ3B1YmxpYyc7XHJcbiAgICBjb250ZXh0LnRpdGxlID0gZm9ybVZhbHVlcy50aXRsZTtcclxuICAgIGNvbnRleHQudXJpID0gZm9ybVZhbHVlcy51cmk7XHJcbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNyZWF0ZShjb250ZXh0KS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcCA9PiB7fSxcclxuICAgICAgZXJyID0+IHtcclxuICAgICAgICBlcnIuZXJyb3IudGl0bGUgPSAnU2hhcmUgTWFwJztcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dFcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lfT9jb250ZXh0PSR7Zm9ybVZhbHVlcy51cml9YDtcclxuICB9XHJcblxyXG4gIGdldFVybFdpdGhvdXRBcGkobWFwOiBJZ29NYXAsIHB1YmxpY1NoYXJlT3B0aW9uKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnJvdXRlIHx8XHJcbiAgICAgICF0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5IHx8XHJcbiAgICAgICF0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9mZkxheWVyc0tleSB8fFxyXG4gICAgICAhbWFwLmdldFpvb20oKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGxsYyA9IHB1YmxpY1NoYXJlT3B0aW9uLmxheWVybGlzdENvbnRyb2xzLnF1ZXJ5c3RyaW5nO1xyXG5cclxuICAgIGNvbnN0IHZpc2libGVLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5O1xyXG4gICAgY29uc3QgaW52aXNpYmxlS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnZpc2libGVPZmZMYXllcnNLZXk7XHJcbiAgICBjb25zdCBsYXllcnMgPSBtYXAubGF5ZXJzO1xyXG5cclxuICAgIGNvbnN0IHJvdXRpbmdLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMucm91dGluZ0Nvb3JkS2V5O1xyXG4gICAgY29uc3Qgc3RvcHNDb29yZGluYXRlcyA9IFtdO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZSAmJlxyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkgJiZcclxuICAgICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpLmxlbmd0aCAhPT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKS5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICBzdG9wc0Nvb3JkaW5hdGVzLnB1c2goY29vcmQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxldCByb3V0aW5nVXJsID0gJyc7XHJcbiAgICBpZiAoc3RvcHNDb29yZGluYXRlcy5sZW5ndGggPj0gMikge1xyXG4gICAgICByb3V0aW5nVXJsID0gYCR7cm91dGluZ0tleX09JHtzdG9wc0Nvb3JkaW5hdGVzLmpvaW4oJzsnKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpc2libGVMYXllcnMgPSBsYXllcnMuZmlsdGVyKGxheSA9PiBsYXkudmlzaWJsZSk7XHJcbiAgICBjb25zdCBpbnZpc2libGVMYXllcnMgPSBsYXllcnMuZmlsdGVyKGxheSA9PiAhbGF5LnZpc2libGUpO1xyXG5cclxuICAgIGxldCBsYXllcnNVcmwgPSAnJztcclxuICAgIGxldCBsYXllcnNUb0xvb3AgPSBbXTtcclxuICAgIGlmICh2aXNpYmxlTGF5ZXJzLmxlbmd0aCA+IGludmlzaWJsZUxheWVycy5sZW5ndGgpIHtcclxuICAgICAgbGF5ZXJzVXJsID0gYCR7dmlzaWJsZUtleX09KiYke2ludmlzaWJsZUtleX09YDtcclxuICAgICAgbGF5ZXJzVG9Mb29wID0gaW52aXNpYmxlTGF5ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzVXJsID0gYCR7aW52aXNpYmxlS2V5fT0qJiR7dmlzaWJsZUtleX09YDtcclxuICAgICAgbGF5ZXJzVG9Mb29wID0gdmlzaWJsZUxheWVycztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVyc1RvTG9vcCkge1xyXG4gICAgICBpZiAobGF5ZXIuaWQpIHtcclxuICAgICAgICBsYXllcnNVcmwgKz0gbGF5ZXIuaWQgKyAnLCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxheWVyc1VybCA9IGxheWVyc1VybC5zdWJzdHIoMCwgbGF5ZXJzVXJsLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIGNvbnN0IHpvb20gPSAnem9vbT0nICsgbWFwLmdldFpvb20oKTtcclxuICAgIGNvbnN0IGFycmF5Q2VudGVyID0gbWFwLmdldENlbnRlcignRVBTRzo0MzI2JykgfHwgW107XHJcbiAgICBjb25zdCBjZW50ZXIgPSAnY2VudGVyPScgKyBhcnJheUNlbnRlci50b1N0cmluZygpO1xyXG4gICAgbGV0IGNvbnRleHQgPSAnJztcclxuICAgIGlmICh0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlKSB7XHJcbiAgICAgIGNvbnRleHQgPSAnY29udGV4dD0nICsgdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZS51cmk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLm9yaWdpbn0ke1xyXG4gICAgICBsb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgfT8ke2NvbnRleHR9JiR7em9vbX0mJHtjZW50ZXJ9JiR7bGF5ZXJzVXJsfSYke2xsY30mJHtyb3V0aW5nVXJsfWAucmVwbGFjZSgvJiYvZywgJyYnKTtcclxuICB9XHJcbn1cclxuIl19