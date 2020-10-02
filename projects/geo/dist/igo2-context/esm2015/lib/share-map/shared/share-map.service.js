/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { RouteService, ConfigService, MessageService } from '@igo2/core';
import { ContextService } from '../../context-manager/shared/context.service';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
import * as i2 from "../../context-manager/shared/context.service";
export class ShareMapService {
    /**
     * @param {?} config
     * @param {?} contextService
     * @param {?} messageService
     * @param {?} route
     */
    constructor(config, contextService, messageService, route) {
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
        const visibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => lay.visible && lay.id !== 'searchPointerSummaryId'));
        /** @type {?} */
        const invisibleLayers = layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => !lay.visible && lay.id !== 'searchPointerSummaryId'));
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
        /** @type {?} */
        const contextLayersID = [];
        /** @type {?} */
        const contextLayers = this.contextService.context$.value.layers;
        for (const contextLayer of contextLayers) {
            contextLayersID.push(contextLayer.id || contextLayer.source.id);
        }
        /** @type {?} */
        const addedLayersQueryParamsWms = this.makeLayersByService(layers, contextLayersID, 'wms');
        /** @type {?} */
        const addedLayersQueryParamsWmts = this.makeLayersByService(layers, contextLayersID, 'wmts');
        layersUrl = layersUrl.substr(0, layersUrl.length - 1);
        /** @type {?} */
        const zoomKey = this.route.options.zoomKey;
        /** @type {?} */
        const centerKey = this.route.options.centerKey;
        /** @type {?} */
        const contextKey = this.route.options.contextKey;
        /** @type {?} */
        const zoom = `${zoomKey}=${map.viewController.getZoom()}`;
        /** @type {?} */
        const arrayCenter = map.viewController.getCenter('EPSG:4326') || [];
        /** @type {?} */
        const long = arrayCenter[0].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const lat = arrayCenter[1].toFixed(5).replace(/\.([^0]+)0+$/, '.$1');
        /** @type {?} */
        const center = `${centerKey}=${long},${lat}`.replace(/.00000/g, '');
        /** @type {?} */
        let context = '';
        if (this.contextService.context$.value) {
            context = `${contextKey}=${this.contextService.context$.value.uri}`;
        }
        /** @type {?} */
        let url = `${location.origin}${location.pathname}?${context}&${zoom}&${center}&${layersUrl}&${llc}&${addedLayersQueryParamsWms}&${llc}&${addedLayersQueryParamsWmts}`;
        for (let i = 0; i < 5; i++) {
            url = url.replace(/&&/g, '&');
            url = url.endsWith('&') ? url.slice(0, -1) : url;
        }
        url = url.endsWith('&') ? url.slice(0, -1) : url;
        url = url.replace('?&wm', '&wm');
        url = url.replace('?&', '?');
        return url;
    }
    /**
     * @private
     * @param {?} layers
     * @param {?} contextLayersID
     * @param {?} typeService
     * @return {?}
     */
    makeLayersByService(layers, contextLayersID, typeService) {
        /** @type {?} */
        const addedLayersByService = [];
        for (const layer of layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => l.dataSource.options && (l.dataSource.options.type === typeService)))) {
            if (contextLayersID.indexOf(layer.id) === -1) {
                /** @type {?} */
                const linkUrl = ((/** @type {?} */ (layer.dataSource.options))).url;
                /** @type {?} */
                let addedLayer = '';
                if (layer.dataSource.options.type === 'wms') {
                    addedLayer = encodeURIComponent(((/** @type {?} */ (layer.dataSource.options))).params.LAYERS);
                }
                else if (layer.dataSource.options.type === 'wmts') {
                    addedLayer = encodeURIComponent(((/** @type {?} */ (layer.dataSource.options))).layer);
                }
                /** @type {?} */
                const addedLayerPosition = `${addedLayer}:igoz${layer.zIndex}`;
                if (!addedLayersByService.find((/**
                 * @param {?} definedUrl
                 * @return {?}
                 */
                definedUrl => definedUrl.url === linkUrl))) {
                    addedLayersByService.push({
                        url: linkUrl,
                        layers: [addedLayerPosition]
                    });
                }
                else {
                    addedLayersByService.forEach((/**
                     * @param {?} service
                     * @return {?}
                     */
                    service => {
                        if (service.url === linkUrl) {
                            service.layers.push(addedLayerPosition);
                        }
                    }));
                }
            }
        }
        /** @type {?} */
        let addedLayersQueryParams = '';
        if (addedLayersByService.length >= 1) {
            /** @type {?} */
            const linkUrlKey = (typeService === 'wms') ? this.route.options.wmsUrlKey :
                (typeService === 'wmts') ? this.route.options.wmtsUrlKey : '';
            /** @type {?} */
            const layersKey = (typeService === 'wms') ? this.route.options.wmsLayersKey :
                (typeService === 'wmts') ? this.route.options.wmtsLayersKey : '';
            /** @type {?} */
            let linkUrlQueryParams = '';
            /** @type {?} */
            let layersQueryParams = '';
            addedLayersByService.forEach((/**
             * @param {?} service
             * @return {?}
             */
            service => {
                linkUrlQueryParams += `${service.url},`;
                layersQueryParams += `(${service.layers.join(',')}),`;
            }));
            linkUrlQueryParams = linkUrlQueryParams.endsWith(',')
                ? linkUrlQueryParams.slice(0, -1)
                : linkUrlQueryParams;
            layersQueryParams = layersQueryParams.endsWith(',')
                ? layersQueryParams.slice(0, -1)
                : layersQueryParams;
            addedLayersQueryParams = `${linkUrlKey}=${linkUrlQueryParams}&${layersKey}=${layersQueryParams}`;
        }
        return addedLayersQueryParams;
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
    { type: RouteService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ ShareMapService.ngInjectableDef = i0.defineInjectable({ factory: function ShareMapService_Factory() { return new ShareMapService(i0.inject(i1.ConfigService), i0.inject(i2.ContextService), i0.inject(i1.MessageService), i0.inject(i1.RouteService, 8)); }, token: ShareMapService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlLW1hcC9zaGFyZWQvc2hhcmUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUd6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7QUFLOUUsTUFBTSxPQUFPLGVBQWU7Ozs7Ozs7SUFHMUIsWUFDVSxNQUFxQixFQUNyQixjQUE4QixFQUM5QixjQUE4QixFQUNsQixLQUFtQjtRQUgvQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUV2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLFVBQVUsRUFBRSxpQkFBaUI7UUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7OztJQUVELGFBQWEsQ0FBQyxHQUFXLEVBQUUsVUFBVTs7Y0FDN0IsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1FBQzFELE9B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LENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUN2QixpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ3RCLHNCQUFzQixHQUFHLEdBQUcsVUFBVSxJQUFJLGtCQUFrQixJQUFJLFNBQVMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1NBQ2xHO1FBRUQsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDOzs7WUEzS0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUHNCLGFBQWE7WUFHM0IsY0FBYztZQUhlLGNBQWM7WUFBM0MsWUFBWSx1QkFlaEIsUUFBUTs7Ozs7Ozs7SUFOWCxpQ0FBdUI7Ozs7O0lBR3JCLGlDQUE2Qjs7Ozs7SUFDN0IseUNBQXNDOzs7OztJQUN0Qyx5Q0FBc0M7Ozs7O0lBQ3RDLGdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsIE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb01hcCwgTGF5ZXIgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZU1hcFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgYXBpVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmFwaVVybCA9IHRoaXMuY29uZmlnLmdldENvbmZpZygnY29udGV4dC51cmwnKTtcclxuICB9XHJcblxyXG4gIGdldFVybChtYXA6IElnb01hcCwgZm9ybVZhbHVlcywgcHVibGljU2hhcmVPcHRpb24pIHtcclxuICAgIGlmICh0aGlzLmFwaVVybCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRVcmxXaXRoQXBpKG1hcCwgZm9ybVZhbHVlcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5nZXRVcmxXaXRob3V0QXBpKG1hcCwgcHVibGljU2hhcmVPcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXJsV2l0aEFwaShtYXA6IElnb01hcCwgZm9ybVZhbHVlcykge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZ2V0Q29udGV4dEZyb21NYXAobWFwKTtcclxuICAgIGNvbnRleHQuc2NvcGUgPSAncHVibGljJztcclxuICAgIGNvbnRleHQudGl0bGUgPSBmb3JtVmFsdWVzLnRpdGxlO1xyXG4gICAgY29udGV4dC51cmkgPSBmb3JtVmFsdWVzLnVyaTtcclxuICAgIHRoaXMuY29udGV4dFNlcnZpY2UuY3JlYXRlKGNvbnRleHQpLnN1YnNjcmliZShcclxuICAgICAgcmVwID0+IHt9LFxyXG4gICAgICBlcnIgPT4ge1xyXG4gICAgICAgIGVyci5lcnJvci50aXRsZSA9ICdTaGFyZSBNYXAnO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2hvd0Vycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gYCR7bG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWV9P2NvbnRleHQ9JHtmb3JtVmFsdWVzLnVyaX1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXJsV2l0aG91dEFwaShtYXA6IElnb01hcCwgcHVibGljU2hhcmVPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMucm91dGUgfHxcclxuICAgICAgIXRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT25MYXllcnNLZXkgfHxcclxuICAgICAgIXRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5IHx8XHJcbiAgICAgICFtYXAudmlld0NvbnRyb2xsZXIuZ2V0Wm9vbSgpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGxjID0gcHVibGljU2hhcmVPcHRpb24ubGF5ZXJsaXN0Q29udHJvbHMucXVlcnlzdHJpbmc7XHJcblxyXG4gICAgbGV0IHZpc2libGVLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMudmlzaWJsZU9uTGF5ZXJzS2V5O1xyXG4gICAgbGV0IGludmlzaWJsZUtleSA9IHRoaXMucm91dGUub3B0aW9ucy52aXNpYmxlT2ZmTGF5ZXJzS2V5O1xyXG4gICAgY29uc3QgbGF5ZXJzID0gbWFwLmxheWVycztcclxuXHJcbiAgICBjb25zdCB2aXNpYmxlTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcihsYXkgPT4gbGF5LnZpc2libGUgJiYgbGF5LmlkICE9PSAnc2VhcmNoUG9pbnRlclN1bW1hcnlJZCcpO1xyXG4gICAgY29uc3QgaW52aXNpYmxlTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcihsYXkgPT4gIWxheS52aXNpYmxlICYmIGxheS5pZCAhPT0gJ3NlYXJjaFBvaW50ZXJTdW1tYXJ5SWQnKTtcclxuXHJcbiAgICBpZiAodmlzaWJsZUxheWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdmlzaWJsZUtleSA9ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKGludmlzaWJsZUxheWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgaW52aXNpYmxlS2V5ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxheWVyc1VybCA9ICcnO1xyXG4gICAgbGV0IGxheWVyc1RvTG9vcCA9IFtdO1xyXG4gICAgaWYgKHZpc2libGVMYXllcnMubGVuZ3RoID4gaW52aXNpYmxlTGF5ZXJzLmxlbmd0aCkge1xyXG4gICAgICBsYXllcnNVcmwgPSBgJHt2aXNpYmxlS2V5fT0qJiR7aW52aXNpYmxlS2V5fT1gO1xyXG4gICAgICBsYXllcnNUb0xvb3AgPSBpbnZpc2libGVMYXllcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXllcnNVcmwgPSBgJHtpbnZpc2libGVLZXl9PSomJHt2aXNpYmxlS2V5fT1gO1xyXG4gICAgICBsYXllcnNUb0xvb3AgPSB2aXNpYmxlTGF5ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgbGF5ZXJzVG9Mb29wKSB7XHJcbiAgICAgIGlmIChsYXllci5pZCkge1xyXG4gICAgICAgIGxheWVyc1VybCArPSBsYXllci5pZCArICcsJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgY29udGV4dExheWVyc0lEID0gW107XHJcbiAgICBjb25zdCBjb250ZXh0TGF5ZXJzID0gdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZS5sYXllcnM7XHJcbiAgICBmb3IgKGNvbnN0IGNvbnRleHRMYXllciBvZiBjb250ZXh0TGF5ZXJzKSB7XHJcbiAgICAgIGNvbnRleHRMYXllcnNJRC5wdXNoKGNvbnRleHRMYXllci5pZCB8fCBjb250ZXh0TGF5ZXIuc291cmNlLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zV21zID0gdGhpcy5tYWtlTGF5ZXJzQnlTZXJ2aWNlKGxheWVycywgY29udGV4dExheWVyc0lELCAnd21zJyk7XHJcbiAgICBjb25zdCBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zV210cyA9IHRoaXMubWFrZUxheWVyc0J5U2VydmljZShsYXllcnMsIGNvbnRleHRMYXllcnNJRCwgJ3dtdHMnKTtcclxuXHJcbiAgICBsYXllcnNVcmwgPSBsYXllcnNVcmwuc3Vic3RyKDAsIGxheWVyc1VybC5sZW5ndGggLSAxKTtcclxuXHJcbiAgICBjb25zdCB6b29tS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLnpvb21LZXk7XHJcbiAgICBjb25zdCBjZW50ZXJLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMuY2VudGVyS2V5O1xyXG4gICAgY29uc3QgY29udGV4dEtleSA9IHRoaXMucm91dGUub3B0aW9ucy5jb250ZXh0S2V5O1xyXG5cclxuICAgIGNvbnN0IHpvb20gPSBgJHt6b29tS2V5fT0ke21hcC52aWV3Q29udHJvbGxlci5nZXRab29tKCl9YDtcclxuICAgIGNvbnN0IGFycmF5Q2VudGVyID0gbWFwLnZpZXdDb250cm9sbGVyLmdldENlbnRlcignRVBTRzo0MzI2JykgfHwgW107XHJcbiAgICBjb25zdCBsb25nID0gYXJyYXlDZW50ZXJbMF0udG9GaXhlZCg1KS5yZXBsYWNlKC9cXC4oW14wXSspMCskLywgJy4kMScpO1xyXG4gICAgY29uc3QgbGF0ID0gYXJyYXlDZW50ZXJbMV0udG9GaXhlZCg1KS5yZXBsYWNlKC9cXC4oW14wXSspMCskLywgJy4kMScpO1xyXG4gICAgY29uc3QgY2VudGVyID0gYCR7Y2VudGVyS2V5fT0ke2xvbmd9LCR7bGF0fWAucmVwbGFjZSgvLjAwMDAwL2csICcnKTtcclxuICAgIGxldCBjb250ZXh0ID0gJyc7XHJcbiAgICBpZiAodGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JC52YWx1ZSkge1xyXG4gICAgICBjb250ZXh0ID0gYCR7Y29udGV4dEtleX09JHt0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkLnZhbHVlLnVyaX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1cmwgPSBgJHtsb2NhdGlvbi5vcmlnaW59JHtsb2NhdGlvbi5wYXRobmFtZX0/JHtjb250ZXh0fSYke3pvb219JiR7Y2VudGVyfSYke2xheWVyc1VybH0mJHtsbGN9JiR7YWRkZWRMYXllcnNRdWVyeVBhcmFtc1dtc30mJHtsbGN9JiR7YWRkZWRMYXllcnNRdWVyeVBhcmFtc1dtdHN9YDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICB1cmwgPSB1cmwucmVwbGFjZSgvJiYvZywgJyYnKTtcclxuICAgICAgdXJsID0gdXJsLmVuZHNXaXRoKCcmJykgPyB1cmwuc2xpY2UoMCwgLTEpIDogdXJsO1xyXG4gICAgfVxyXG4gICAgdXJsID0gdXJsLmVuZHNXaXRoKCcmJykgPyB1cmwuc2xpY2UoMCwgLTEpIDogdXJsO1xyXG4gICAgdXJsID0gdXJsLnJlcGxhY2UoJz8md20nLCAnJndtJyk7XHJcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgnPyYnLCAnPycpO1xyXG5cclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1ha2VMYXllcnNCeVNlcnZpY2UobGF5ZXJzOiBMYXllcltdLCBjb250ZXh0TGF5ZXJzSUQ6IGFueVtdLCB0eXBlU2VydmljZTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHJcbiAgICBjb25zdCBhZGRlZExheWVyc0J5U2VydmljZSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMuZmlsdGVyKFxyXG4gICAgICBsID0+IGwuZGF0YVNvdXJjZS5vcHRpb25zICYmIChsLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSB0eXBlU2VydmljZSlcclxuICAgICkpIHtcclxuICAgICAgaWYgKGNvbnRleHRMYXllcnNJRC5pbmRleE9mKGxheWVyLmlkKSA9PT0gLTEpIHtcclxuICAgICAgICBjb25zdCBsaW5rVXJsID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnVybDtcclxuICAgICAgICBsZXQgYWRkZWRMYXllciA9ICcnO1xyXG4gICAgICAgIGlmIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ3dtcycpIHtcclxuICAgICAgICAgIGFkZGVkTGF5ZXIgPSBlbmNvZGVVUklDb21wb25lbnQoKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtcy5MQVlFUlMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd3bXRzJykge1xyXG4gICAgICAgICAgYWRkZWRMYXllciA9IGVuY29kZVVSSUNvbXBvbmVudCgobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkubGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhZGRlZExheWVyUG9zaXRpb24gPSBgJHthZGRlZExheWVyfTppZ296JHtsYXllci56SW5kZXh9YDtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWFkZGVkTGF5ZXJzQnlTZXJ2aWNlLmZpbmQoZGVmaW5lZFVybCA9PiBkZWZpbmVkVXJsLnVybCA9PT0gbGlua1VybClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGFkZGVkTGF5ZXJzQnlTZXJ2aWNlLnB1c2goe1xyXG4gICAgICAgICAgICB1cmw6IGxpbmtVcmwsXHJcbiAgICAgICAgICAgIGxheWVyczogW2FkZGVkTGF5ZXJQb3NpdGlvbl1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhZGRlZExheWVyc0J5U2VydmljZS5mb3JFYWNoKHNlcnZpY2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VydmljZS51cmwgPT09IGxpbmtVcmwpIHtcclxuICAgICAgICAgICAgICBzZXJ2aWNlLmxheWVycy5wdXNoKGFkZGVkTGF5ZXJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zID0gJyc7XHJcbiAgICBpZiAoYWRkZWRMYXllcnNCeVNlcnZpY2UubGVuZ3RoID49IDEpIHtcclxuICAgICAgY29uc3QgbGlua1VybEtleSA9ICh0eXBlU2VydmljZSA9PT0gJ3dtcycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtc1VybEtleSA6XHJcbiAgICAgICAgKHR5cGVTZXJ2aWNlID09PSAnd210cycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtdHNVcmxLZXkgOiAnJyA7XHJcbiAgICAgIGNvbnN0IGxheWVyc0tleSA9ICh0eXBlU2VydmljZSA9PT0gJ3dtcycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtc0xheWVyc0tleSA6XHJcbiAgICAgICAgKHR5cGVTZXJ2aWNlID09PSAnd210cycpID8gdGhpcy5yb3V0ZS5vcHRpb25zLndtdHNMYXllcnNLZXkgOiAnJyA7XHJcblxyXG4gICAgICBsZXQgbGlua1VybFF1ZXJ5UGFyYW1zID0gJyc7XHJcbiAgICAgIGxldCBsYXllcnNRdWVyeVBhcmFtcyA9ICcnO1xyXG4gICAgICBhZGRlZExheWVyc0J5U2VydmljZS5mb3JFYWNoKHNlcnZpY2UgPT4ge1xyXG4gICAgICAgIGxpbmtVcmxRdWVyeVBhcmFtcyArPSBgJHtzZXJ2aWNlLnVybH0sYDtcclxuICAgICAgICBsYXllcnNRdWVyeVBhcmFtcyArPSBgKCR7c2VydmljZS5sYXllcnMuam9pbignLCcpfSksYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGxpbmtVcmxRdWVyeVBhcmFtcyA9IGxpbmtVcmxRdWVyeVBhcmFtcy5lbmRzV2l0aCgnLCcpXHJcbiAgICAgICAgPyBsaW5rVXJsUXVlcnlQYXJhbXMuc2xpY2UoMCwgLTEpXHJcbiAgICAgICAgOiBsaW5rVXJsUXVlcnlQYXJhbXM7XHJcbiAgICAgIGxheWVyc1F1ZXJ5UGFyYW1zID0gbGF5ZXJzUXVlcnlQYXJhbXMuZW5kc1dpdGgoJywnKVxyXG4gICAgICAgID8gbGF5ZXJzUXVlcnlQYXJhbXMuc2xpY2UoMCwgLTEpXHJcbiAgICAgICAgOiBsYXllcnNRdWVyeVBhcmFtcztcclxuICAgICAgYWRkZWRMYXllcnNRdWVyeVBhcmFtcyA9IGAke2xpbmtVcmxLZXl9PSR7bGlua1VybFF1ZXJ5UGFyYW1zfSYke2xheWVyc0tleX09JHtsYXllcnNRdWVyeVBhcmFtc31gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhZGRlZExheWVyc1F1ZXJ5UGFyYW1zO1xyXG4gIH1cclxufVxyXG4iXX0=