/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { RouteService, ConfigService, MessageService } from '@igo2/core';
import { ContextService } from '../../context-manager/shared/context.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "../../context-manager/shared/context.service";
var ShareMapService = /** @class */ (function () {
    function ShareMapService(config, contextService, messageService, route) {
        this.config = config;
        this.contextService = contextService;
        this.messageService = messageService;
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
        var e_1, _a, e_2, _b;
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
        var visibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        function (lay) { return lay.visible && lay.id !== 'searchPointerSummaryId'; }));
        /** @type {?} */
        var invisibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        function (lay) { return !lay.visible && lay.id !== 'searchPointerSummaryId'; }));
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
        /** @type {?} */
        var contextLayersID = [];
        /** @type {?} */
        var contextLayers = this.contextService.context$.value.layers;
        try {
            for (var contextLayers_1 = tslib_1.__values(contextLayers), contextLayers_1_1 = contextLayers_1.next(); !contextLayers_1_1.done; contextLayers_1_1 = contextLayers_1.next()) {
                var contextLayer = contextLayers_1_1.value;
                contextLayersID.push(contextLayer.id || contextLayer.source.id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (contextLayers_1_1 && !contextLayers_1_1.done && (_b = contextLayers_1.return)) _b.call(contextLayers_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        /** @type {?} */
        var addedLayersQueryParamsWms = this.makeLayersByService(layers, contextLayersID, 'wms');
        /** @type {?} */
        var addedLayersQueryParamsWmts = this.makeLayersByService(layers, contextLayersID, 'wmts');
        layersUrl = layersUrl.substr(0, layersUrl.length - 1);
        /** @type {?} */
        var zoomKey = this.route.options.zoomKey;
        /** @type {?} */
        var centerKey = this.route.options.centerKey;
        /** @type {?} */
        var contextKey = this.route.options.contextKey;
        /** @type {?} */
        var zoom = zoomKey + "=" + map.viewController.getZoom();
        /** @type {?} */
        var arrayCenter = map.viewController.getCenter('EPSG:4326') || [];
        /** @type {?} */
        var long = arrayCenter[0].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        var lat = arrayCenter[1].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        var center = (centerKey + "=" + long + "," + lat).replace(/.00000/g, '');
        /** @type {?} */
        var context = '';
        if (this.contextService.context$.value) {
            context = contextKey + "=" + this.contextService.context$.value.uri;
        }
        /** @type {?} */
        var url = "" + location.origin + location.pathname + "?" + context + "&" + zoom + "&" + center + "&" + layersUrl + "&" + llc + "&" + addedLayersQueryParamsWms + "&" + llc + "&" + addedLayersQueryParamsWmts;
        for (var i = 0; i < 5; i++) {
            url = url.replace(/&&/g, '&');
            url = url.endsWith('&') ? url.slice(0, -1) : url;
        }
        url = url.endsWith('&') ? url.slice(0, -1) : url;
        url = url.replace('?&wm', '&wm');
        url = url.replace('?&', '?');
        return url;
    };
    /**
     * @private
     * @param {?} layers
     * @param {?} contextLayersID
     * @param {?} typeService
     * @return {?}
     */
    ShareMapService.prototype.makeLayersByService = /**
     * @private
     * @param {?} layers
     * @param {?} contextLayersID
     * @param {?} typeService
     * @return {?}
     */
    function (layers, contextLayersID, typeService) {
        var e_3, _a;
        /** @type {?} */
        var addedLayersByService = [];
        var _loop_1 = function (layer) {
            if (contextLayersID.indexOf(layer.id) === -1) {
                /** @type {?} */
                var linkUrl_1 = ((/** @type {?} */ (layer.dataSource.options))).url;
                /** @type {?} */
                var addedLayer = '';
                if (layer.dataSource.options.type === 'wms') {
                    addedLayer = encodeURIComponent(((/** @type {?} */ (layer.dataSource.options))).params.LAYERS);
                }
                else if (layer.dataSource.options.type === 'wmts') {
                    addedLayer = encodeURIComponent(((/** @type {?} */ (layer.dataSource.options))).layer);
                }
                /** @type {?} */
                var addedLayerPosition_1 = addedLayer + ":igoz" + layer.zIndex;
                if (!addedLayersByService.find((/**
                 * @param {?} definedUrl
                 * @return {?}
                 */
                function (definedUrl) { return definedUrl.url === linkUrl_1; }))) {
                    addedLayersByService.push({
                        url: linkUrl_1,
                        layers: [addedLayerPosition_1]
                    });
                }
                else {
                    addedLayersByService.forEach((/**
                     * @param {?} service
                     * @return {?}
                     */
                    function (service) {
                        if (service.url === linkUrl_1) {
                            service.layers.push(addedLayerPosition_1);
                        }
                    }));
                }
            }
        };
        try {
            for (var _b = tslib_1.__values(layers.filter((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return l.dataSource.options && (l.dataSource.options.type === typeService); }))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var layer = _c.value;
                _loop_1(layer);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        /** @type {?} */
        var addedLayersQueryParams = '';
        if (addedLayersByService.length >= 1) {
            /** @type {?} */
            var linkUrlKey = (typeService === 'wms') ? this.route.options.wmsUrlKey :
                (typeService === 'wmts') ? this.route.options.wmtsUrlKey : '';
            /** @type {?} */
            var layersKey = (typeService === 'wms') ? this.route.options.wmsLayersKey :
                (typeService === 'wmts') ? this.route.options.wmtsLayersKey : '';
            /** @type {?} */
            var linkUrlQueryParams_1 = '';
            /** @type {?} */
            var layersQueryParams_1 = '';
            addedLayersByService.forEach((/**
             * @param {?} service
             * @return {?}
             */
            function (service) {
                linkUrlQueryParams_1 += service.url + ",";
                layersQueryParams_1 += "(" + service.layers.join(',') + "),";
            }));
            linkUrlQueryParams_1 = linkUrlQueryParams_1.endsWith(',')
                ? linkUrlQueryParams_1.slice(0, -1)
                : linkUrlQueryParams_1;
            layersQueryParams_1 = layersQueryParams_1.endsWith(',')
                ? layersQueryParams_1.slice(0, -1)
                : layersQueryParams_1;
            addedLayersQueryParams = linkUrlKey + "=" + linkUrlQueryParams_1 + "&" + layersKey + "=" + layersQueryParams_1;
        }
        return addedLayersQueryParams;
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
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ ShareMapService.ngInjectableDef = i0.defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(i0.inject(i1.ConfigService), i0.inject(i2.ContextService), i0.inject(i1.MessageService), i0.inject(i1.RouteService, 8)); }, token: ShareMapService, providedIn: "root" });
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
    ShareMapService.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlLW1hcC9zaGFyZWQvc2hhcmUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7O0FBRTlFO0lBTUUseUJBQ1UsTUFBcUIsRUFDckIsY0FBOEIsRUFDOUIsY0FBOEIsRUFDbEIsS0FBbUI7UUFIL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFFdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7Ozs7O0lBRUQsZ0NBQU07Ozs7OztJQUFOLFVBQU8sR0FBVyxFQUFFLFVBQVUsRUFBRSxpQkFBaUI7UUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7OztJQUVELHVDQUFhOzs7OztJQUFiLFVBQWMsR0FBVyxFQUFFLFVBQVU7UUFBckMsaUJBYUM7O1lBWk8sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsR0FBRyxD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QUFPO2dCQUNsQyxvQkFBa0IsSUFBTyxPQUFPLENBQUMsR0FBRyxNQUFHLENBQUM7Z0JBQ3hDLG1CQUFpQixJQUFJLE1BQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQUksQ0FBQztZQUN4RCxDQUFDLEVBQUMsQ0FBQztZQUNILG9CQUFrQixHQUFHLG9CQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxvQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsb0JBQWtCLENBQUM7WUFDdkIsbUJBQWlCLEdBQUcsbUJBQWlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDakQsQ0FBQyxDQUFDLG1CQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxtQkFBaUIsQ0FBQztZQUN0QixzQkFBc0IsR0FBTSxVQUFVLFNBQUksb0JBQWtCLFNBQUksU0FBUyxTQUFJLG1CQUFtQixDQUFDO1NBQ2xHO1FBRUQsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDOztnQkEzS0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFQc0IsYUFBYTtnQkFHM0IsY0FBYztnQkFIZSxjQUFjO2dCQUEzQyxZQUFZLHVCQWVoQixRQUFROzs7MEJBakJiO0NBbUxDLEFBNUtELElBNEtDO1NBektZLGVBQWU7Ozs7OztJQUMxQixpQ0FBdUI7Ozs7O0lBR3JCLGlDQUE2Qjs7Ozs7SUFDN0IseUNBQXNDOzs7OztJQUN0Qyx5Q0FBc0M7Ozs7O0lBQ3RDLGdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsIE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb01hcCwgTGF5ZXIgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZU1hcFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgYXBpVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmFwaVVybCA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dC51cmwnKTtcclxuICB9XHJcblxyXG4gIGdldFVybChtYXA6IElnb01hcCwgZm9ybVZhbHVlcywgcHVibGljU2hhcmVPcHRpb24pIHtcclxuICAgIGlmICh0aGlzLmFwaVVybCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRVcmxXaXRoQXBpKG1hcCwgZm9ybVZhbHVlcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5nZXRVcmxXaXRob3V0QXBpKG1hcCwgcHVibGljU2hhcmVPcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXJsV2l0aEFwaShtYXA6IElnb01hcCwgZm9ybVZhbHVlcykge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZ2V0Q29udGV4dEZyb21NYXAobWFwKTtcclxuICAgIGNvbnRleHQuc2NvcGUgPSAncHVibGljJztcclxuICAgIGNvbnRleHQudGl0bGUgPSBmb3JtVmFsdWVzLnRpdGxlO1xyXG4gICAgY29udGV4dC51cmkgPSBmb3JtVmFsdWVzLnVyaTtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UuY3JlYXRlKGNvbnRleHQpLnN1YnNjcmliZShcclxuICAgICAgcmVwID0+IHt9LFxyXG4gICAgICBlcnIgPT4ge1xyXG4gICAgICAgIGVyci5lcnJvci50aXRsZSA9ICdTaGFyZSBNYXAnO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2hvd0Vycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gYCR7bG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWV9P2NvbnRleHQ9JHtmb3JtVmFsdWVzLnVyaX1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXJsV2l0aG91dEFwaShtYXA6IElnb01hcCwgcHVibGljU2hhcmVPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMucm91dGUgfHxcclxuICAgICAgIXRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT25MYXllcnNLZXkgfHxcclxuICAgICAgIXRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5IHx8XHJcbiAgICAgICFtYXAudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGxjID0gcHVibGljU2hhcmVPcHRpb24ubGF5ZXJsaXN0Q29udHJvbHMucXVlcnlzdHJpbmc7XHJcblxyXG4gICAgbGV0IHZpc2libGVLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5O1xyXG4gICAgbGV0IGludmlzaWJsZUtleSA9IHRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5O1xyXG4gICAgY29uc3QgbGF5ZXJzID0gbWFwLmxheWVycztcclxuXHJcbiAgICBjb25zdCB2aXNpYmxlTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcihsYXkgPT4gbGF5LnZpc2libGUgJiYgbGF5LmlkICE9PSAnc2VhcmNoUG9pbnRlclN1bW1hcnlJZCcpO1xyXG4gICAgY29uc3QgaW52aXNpYmxlTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcihsYXkgPT4gIWxheS52aXNpYmxlICYmIGxheS5pZCAhPT0gJ3NlYXJjaFBvaW50ZXJTdW1tYXJ5SWQnKTtcclxuXHJcbiAgICBpZiAodmlzaWJsZUxheWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdmlzaWJsZUtleSA9ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKGludmlzaWJsZUxheWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgaW52aXNpYmxlS2V5ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxheWVyc1VybCA9ICcnO1xyXG4gICAgbGV0IGxheWVyc1RvTG9vcCA9IFtdO1xyXG4gICAgaWYgKHZpc2libGVMYXllcnMubGVuZ3RoID4gaW52aXNpYmxlTGF5ZXJzLmxlbmd0aCkge1xyXG4gICAgICBsYXllcnNVcmwgPSBgJHt2aXNpYmxlS2V5fT0qJiR7aW52aXNpYmxlS2V5fT1gO1xyXG4gICAgICBsYXllcnNUb0xvb3AgPSBpbnZpc2libGVMYXllcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXllcnNVcmwgPSBgJHtpbnZpc2libGVLZXl9PSomJHt2aXNpYmxlS2V5fT1gO1xyXG4gICAgICBsYXllcnNUb0xvb3AgPSB2aXNpYmxlTGF5ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgbGF5ZXJzVG9Mb29wKSB7XHJcbiAgICAgIGlmIChsYXllci5pZCkge1xyXG4gICAgICAgIGxheWVyc1VybCArPSBsYXllci5pZCArICcsJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgY29udGV4dExheWVyc0lEID0gW107XHJcbiAgICBjb25zdCBjb250ZXh0TGF5ZXJzID0gdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZS5sYXllcnM7XHJcbiAgICBmb3IgKGNvbnN0IGNvbnRleHRMYXllciBvZiBjb250ZXh0TGF5ZXJzKSB7XHJcbiAgICAgIGNvbnRleHRMYXllcnNJRC5wdXNoKGNvbnRleHRMYXllci5pZCB8fCBjb250ZXh0TGF5ZXIuc291cmNlLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zV21zID0gdGhpcy5tYWtlTGF5ZXJzQnlTZXJ2aWNlKGxheWVycywgY29udGV4dExheWVyc0lELCAnd21zJyk7XHJcbiAgICBjb25zdCBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zV210cyA9IHRoaXMubWFrZUxheWVyc0J5U2VydmljZShsYXllcnMsIGNvbnRleHRMYXllcnNJRCwgJ3dtdHMnKTtcclxuXHJcbiAgICBsYXllcnNVcmwgPSBsYXllcnNVcmwuc3Vic3RyKDAsIGxheWVyc1VybC5sZW5ndGggLSAxKTtcclxuXHJcbiAgICBjb25zdCB6b29tS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnpvb21LZXk7XHJcbiAgICBjb25zdCBjZW50ZXJLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMuY2VudGVyS2V5O1xyXG4gICAgY29uc3QgY29udGV4dEtleSA9IHRoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5O1xyXG5cclxuICAgIGNvbnN0IHpvb20gPSBgJHt6b29tS2V5fT0ke21hcC52aWV3Q29udHJvbGxlci5nZXRab29tKCl9YDtcclxuICAgIGNvbnN0IGFycmF5Q2VudGVyID0gbWFwLnZpZXdDb250cm9sbGVyLmdldENlbnRlcignRVBTRzo0MzI2JykgfHwgW107XHJcbiAgICBjb25zdCBsb25nID0gYXJyYXlDZW50ZXJbMF0udG9GaXhlZCg1KS5yZXBsYWNlKC9cXC4oW14wXSspMCskLywgJy4kMScpO1xyXG4gICAgY29uc3QgbGF0ID0gYXJyYXlDZW50ZXJbMV0udG9GaXhlZCg1KS5yZXBsYWNlKC9cXC4oW14wXSspMCskLywgJy4kMScpO1xyXG4gICAgY29uc3QgY2VudGVyID0gYCR7Y2VudGVyS2V5fT0ke2xvbmd9LCR7bGF0fWAucmVwbGFjZSgvLjAwMDAwL2csICcnKTtcclxuICAgIGxldCBjb250ZXh0ID0gJyc7XHJcbiAgICBpZiAodGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZSkge1xyXG4gICAgICBjb250ZXh0ID0gYCR7Y29udGV4dEtleX09JHt0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLnVyaX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1cmwgPSBgJHtsb2NhdGlvbi5vcmlnaW59JHtsb2NhdGlvbi5wYXRobmFtZX0/JHtjb250ZXh0fSYke3pvb219JiR7Y2VudGVyfSYke2xheWVyc1VybH0mJHtsbGN9JiR7YWRkZWRMYXllcnNRdWVyeVBhcmFtc1dtc30mJHtsbGN9JiR7YWRkZWRMYXllcnNRdWVyeVBhcmFtc1dtdHN9YDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICB1cmwgPSB1cmwucmVwbGFjZSgvJiYvZywgJyYnKTtcclxuICAgICAgdXJsID0gdXJsLmVuZHNXaXRoKCcmJykgPyB1cmwuc2xpY2UoMCwgLTEpIDogdXJsO1xyXG4gICAgfVxyXG4gICAgdXJsID0gdXJsLmVuZHNXaXRoKCcmJykgPyB1cmwuc2xpY2UoMCwgLTEpIDogdXJsO1xyXG4gICAgdXJsID0gdXJsLnJlcGxhY2UoJz8md20nLCAnJndtJyk7XHJcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgnPyYnLCAnPycpO1xyXG5cclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1ha2VMYXllcnNCeVNlcnZpY2UobGF5ZXJzOiBMYXllcltdLCBjb250ZXh0TGF5ZXJzSUQ6IGFueVtdLCB0eXBlU2VydmljZTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHJcbiAgICBjb25zdCBhZGRlZExheWVyc0J5U2VydmljZSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMuZmlsdGVyKFxyXG4gICAgICBsID0+IGwuZGF0YVNvdXJjZS5vcHRpb25zICYmIChsLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSB0eXBlU2VydmljZSlcclxuICAgICkpIHtcclxuICAgICAgaWYgKGNvbnRleHRMYXllcnNJRC5pbmRleE9mKGxheWVyLmlkKSA9PT0gLTEpIHtcclxuICAgICAgICBjb25zdCBsaW5rVXJsID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnVybDtcclxuICAgICAgICBsZXQgYWRkZWRMYXllciA9ICcnO1xyXG4gICAgICAgIGlmIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ3dtcycpIHtcclxuICAgICAgICAgIGFkZGVkTGF5ZXIgPSBlbmNvZGVVUklDb21wb25lbnQoKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtcy5MQVlFUlMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd3bXRzJykge1xyXG4gICAgICAgICAgYWRkZWRMYXllciA9IGVuY29kZVVSSUNvbXBvbmVudCgobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkubGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhZGRlZExheWVyUG9zaXRpb24gPSBgJHthZGRlZExheWVyfTppZ296JHtsYXllci56SW5kZXh9YDtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWFkZGVkTGF5ZXJzQnlTZXJ2aWNlLmZpbmQoZGVmaW5lZFVybCA9PiBkZWZpbmVkVXJsLnVybCA9PT0gbGlua1VybClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGFkZGVkTGF5ZXJzQnlTZXJ2aWNlLnB1c2goe1xyXG4gICAgICAgICAgICB1cmw6IGxpbmtVcmwsXHJcbiAgICAgICAgICAgIGxheWVyczogW2FkZGVkTGF5ZXJQb3NpdGlvbl1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhZGRlZExheWVyc0J5U2VydmljZS5mb3JFYWNoKHNlcnZpY2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VydmljZS51cmwgPT09IGxpbmtVcmwpIHtcclxuICAgICAgICAgICAgICBzZXJ2aWNlLmxheWVycy5wdXNoKGFkZGVkTGF5ZXJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zID0gJyc7XHJcbiAgICBpZiAoYWRkZWRMYXllcnNCeVNlcnZpY2UubGVuZ3RoID49IDEpIHtcclxuICAgICAgY29uc3QgbGlua1VybEtleSA9ICh0eXBlU2VydmljZSA9PT0gJ3dtcycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtc1VybEtleSA6XHJcbiAgICAgICAgKHR5cGVTZXJ2aWNlID09PSAnd210cycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtdHNVcmxLZXkgOiAnJyA7XHJcbiAgICAgIGNvbnN0IGxheWVyc0tleSA9ICh0eXBlU2VydmljZSA9PT0gJ3dtcycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtc0xheWVyc0tleSA6XHJcbiAgICAgICAgKHR5cGVTZXJ2aWNlID09PSAnd210cycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtdHNMYXllcnNLZXkgOiAnJyA7XHJcblxyXG4gICAgICBsZXQgbGlua1VybFF1ZXJ5UGFyYW1zID0gJyc7XHJcbiAgICAgIGxldCBsYXllcnNRdWVyeVBhcmFtcyA9ICcnO1xyXG4gICAgICBhZGRlZExheWVyc0J5U2VydmljZS5mb3JFYWNoKHNlcnZpY2UgPT4ge1xyXG4gICAgICAgIGxpbmtVcmxRdWVyeVBhcmFtcyArPSBgJHtzZXJ2aWNlLnVybH0sYDtcclxuICAgICAgICBsYXllcnNRdWVyeVBhcmFtcyArPSBgKCR7c2VydmljZS5sYXllcnMuam9pbignLCcpfSksYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGxpbmtVcmxRdWVyeVBhcmFtcyA9IGxpbmtVcmxRdWVyeVBhcmFtcy5lbmRzV2l0aCgnLCcpXHJcbiAgICAgICAgPyBsaW5rVXJsUXVlcnlQYXJhbXMuc2xpY2UoMCwgLTEpXHJcbiAgICAgICAgOiBsaW5rVXJsUXVlcnlQYXJhbXM7XHJcbiAgICAgIGxheWVyc1F1ZXJ5UGFyYW1zID0gbGF5ZXJzUXVlcnlQYXJhbXMuZW5kc1dpdGgoJywnKVxyXG4gICAgICAgID8gbGF5ZXJzUXVlcnlQYXJhbXMuc2xpY2UoMCwgLTEpXHJcbiAgICAgICAgOiBsYXllcnNRdWVyeVBhcmFtcztcclxuICAgICAgYWRkZWRMYXllcnNRdWVyeVBhcmFtcyA9IGAke2xpbmtVcmxLZXl9PSR7bGlua1VybFF1ZXJ5UGFyYW1zfSYke2xheWVyc0tleX09JHtsYXllcnNRdWVyeVBhcmFtc31gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zO1xyXG4gIH1cclxufVxyXG4iXX0=