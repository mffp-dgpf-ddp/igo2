/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import stylefunction from 'ol-mapbox-style/stylefunction';
import { AuthInterceptor } from '@igo2/auth';
import { ObjectUtils } from '@igo2/utils';
import { OSMDataSource, FeatureDataSource, XYZDataSource, WFSDataSource, WMTSDataSource, WMSDataSource, CartoDataSource, ArcGISRestDataSource, TileArcGISRestDataSource, WebSocketDataSource, MVTDataSource, ClusterDataSource } from '../../datasource';
import { DataSourceService } from '../../datasource/shared/datasource.service';
import { ImageLayer, TileLayer, VectorLayer, VectorTileLayer } from './layers';
import { StyleService } from './style.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./style.service";
import * as i3 from "../../datasource/shared/datasource.service";
import * as i4 from "@igo2/auth";
export class LayerService {
    /**
     * @param {?} http
     * @param {?} styleService
     * @param {?} dataSourceService
     * @param {?} authInterceptor
     */
    constructor(http, styleService, dataSourceService, authInterceptor) {
        this.http = http;
        this.styleService = styleService;
        this.dataSourceService = dataSourceService;
        this.authInterceptor = authInterceptor;
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    createLayer(layerOptions) {
        if (!layerOptions.source) {
            return;
        }
        if (layerOptions.source.options &&
            layerOptions.source.options._layerOptionsFromSource) {
            layerOptions = ObjectUtils.mergeDeep(layerOptions.source.options._layerOptionsFromSource, layerOptions || {});
        }
        /** @type {?} */
        let layer;
        switch (layerOptions.source.constructor) {
            case OSMDataSource:
            case WMTSDataSource:
            case XYZDataSource:
            case CartoDataSource:
            case TileArcGISRestDataSource:
                layer = this.createTileLayer((/** @type {?} */ (layerOptions)));
                break;
            case FeatureDataSource:
            case WFSDataSource:
            case ArcGISRestDataSource:
            case WebSocketDataSource:
            case ClusterDataSource:
                layer = this.createVectorLayer((/** @type {?} */ (layerOptions)));
                break;
            case WMSDataSource:
                layer = this.createImageLayer((/** @type {?} */ (layerOptions)));
                break;
            case MVTDataSource:
                layer = this.createVectorTileLayer((/** @type {?} */ (layerOptions)));
                break;
            default:
                break;
        }
        return layer;
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    createAsyncLayer(layerOptions) {
        if (layerOptions.source) {
            return new Observable((/**
             * @param {?} d
             * @return {?}
             */
            d => d.next(this.createLayer(layerOptions))));
        }
        return this.dataSourceService
            .createAsyncDataSource(layerOptions.sourceOptions)
            .pipe(map((/**
         * @param {?} source
         * @return {?}
         */
        source => {
            if (source === undefined) {
                return undefined;
            }
            return this.createLayer(Object.assign(layerOptions, { source }));
        })));
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createImageLayer(layerOptions) {
        return new ImageLayer(layerOptions, this.authInterceptor);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createTileLayer(layerOptions) {
        return new TileLayer(layerOptions);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createVectorLayer(layerOptions) {
        /** @type {?} */
        let style;
        /** @type {?} */
        let olLayer;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.source instanceof ArcGISRestDataSource) {
            /** @type {?} */
            const source = (/** @type {?} */ (layerOptions.source));
            style = source.options.params.style;
        }
        else if (layerOptions.styleByAttribute) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            olLayer = new VectorLayer(layerOptions);
        }
        if (layerOptions.source instanceof ClusterDataSource) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            /** @type {?} */
            const baseStyle = layerOptions.clusterBaseStyle;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createClusterStyle(feature, layerOptions.clusterParam, baseStyle);
            });
            olLayer = new VectorLayer(layerOptions);
        }
        /** @type {?} */
        const layerOptionsOl = Object.assign({}, layerOptions, {
            style
        });
        if (!olLayer) {
            olLayer = new VectorLayer(layerOptionsOl);
        }
        this.applyMapboxStyle(olLayer, layerOptionsOl);
        return olLayer;
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createVectorTileLayer(layerOptions) {
        /** @type {?} */
        let style;
        /** @type {?} */
        let olLayer;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.styleByAttribute) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            olLayer = new VectorTileLayer(layerOptions);
        }
        /** @type {?} */
        const layerOptionsOl = Object.assign({}, layerOptions, {
            style
        });
        if (!olLayer) {
            olLayer = new VectorTileLayer(layerOptionsOl);
        }
        this.applyMapboxStyle(olLayer, layerOptionsOl);
        return olLayer;
    }
    /**
     * @private
     * @param {?} layer
     * @param {?} layerOptions
     * @return {?}
     */
    applyMapboxStyle(layer, layerOptions) {
        if (layerOptions.mapboxStyle) {
            this.getMapboxGlStyle(layerOptions.mapboxStyle.url).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                stylefunction(layer.ol, res, layerOptions.mapboxStyle.source);
            }));
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getMapboxGlStyle(url) {
        return this.http.get(url).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res)), catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            console.log('No style was found');
            return of(err);
        })));
    }
}
LayerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LayerService.ctorParameters = () => [
    { type: HttpClient },
    { type: StyleService },
    { type: DataSourceService },
    { type: AuthInterceptor, decorators: [{ type: Optional }] }
];
/** @nocollapse */ LayerService.ngInjectableDef = i0.defineInjectable({ factory: function LayerService_Factory() { return new LayerService(i0.inject(i1.HttpClient), i0.inject(i2.StyleService), i0.inject(i3.DataSourceService), i0.inject(i4.AuthInterceptor, 8)); }, token: LayerService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.styleService;
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.dataSourceService;
    /**
     * @type {?}
     * @private
     */
    LayerService.prototype.authInterceptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sK0JBQStCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRS9FLE9BQU8sRUFFTCxVQUFVLEVBRVYsU0FBUyxFQUVULFdBQVcsRUFHWCxlQUFlLEVBRWhCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBSy9DLE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBQ3ZCLFlBQ1UsSUFBZ0IsRUFDaEIsWUFBMEIsRUFDMUIsaUJBQW9DLEVBQ3hCLGVBQWdDO1FBSDVDLFNBQUksR0FBSixJQUFJLENBQVk7UUFD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Z0JBQ2xFLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVNLGdCQUFnQixDQUFDLEdBQVc7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzVCLEdBQUc7Ozs7UUFBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQ3RCLFVBQVU7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7O1lBbExGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXpDUSxVQUFVO1lBcUNWLFlBQVk7WUFmWixpQkFBaUI7WUFsQmpCLGVBQWUsdUJBMkNuQixRQUFROzs7Ozs7OztJQUhULDRCQUF3Qjs7Ozs7SUFDeEIsb0NBQWtDOzs7OztJQUNsQyx5Q0FBNEM7Ozs7O0lBQzVDLHVDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCBzdHlsZWZ1bmN0aW9uIGZyb20gJ29sLW1hcGJveC1zdHlsZS9zdHlsZWZ1bmN0aW9uJztcclxuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPU01EYXRhU291cmNlLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlLFxyXG4gIFhZWkRhdGFTb3VyY2UsXHJcbiAgV0ZTRGF0YVNvdXJjZSxcclxuICBXTVRTRGF0YVNvdXJjZSxcclxuICBXTVNEYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZSxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgV2ViU29ja2V0RGF0YVNvdXJjZSxcclxuICBNVlREYXRhU291cmNlLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlXHJcbn0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIExheWVyLFxyXG4gIEltYWdlTGF5ZXIsXHJcbiAgSW1hZ2VMYXllck9wdGlvbnMsXHJcbiAgVGlsZUxheWVyLFxyXG4gIFRpbGVMYXllck9wdGlvbnMsXHJcbiAgVmVjdG9yTGF5ZXIsXHJcbiAgVmVjdG9yTGF5ZXJPcHRpb25zLFxyXG4gIEFueUxheWVyT3B0aW9ucyxcclxuICBWZWN0b3JUaWxlTGF5ZXIsXHJcbiAgVmVjdG9yVGlsZUxheWVyT3B0aW9uc1xyXG59IGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4vc3R5bGUuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNvdXJjZVNlcnZpY2U6IERhdGFTb3VyY2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBhdXRoSW50ZXJjZXB0b3I6IEF1dGhJbnRlcmNlcHRvclxyXG4gICkge31cclxuXHJcbiAgY3JlYXRlTGF5ZXIobGF5ZXJPcHRpb25zOiBBbnlMYXllck9wdGlvbnMpOiBMYXllciB7XHJcbiAgICBpZiAoIWxheWVyT3B0aW9ucy5zb3VyY2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgbGF5ZXJPcHRpb25zLnNvdXJjZS5vcHRpb25zICYmXHJcbiAgICAgIGxheWVyT3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5fbGF5ZXJPcHRpb25zRnJvbVNvdXJjZVxyXG4gICAgKSB7XHJcbiAgICAgIGxheWVyT3B0aW9ucyA9IE9iamVjdFV0aWxzLm1lcmdlRGVlcChcclxuICAgICAgICBsYXllck9wdGlvbnMuc291cmNlLm9wdGlvbnMuX2xheWVyT3B0aW9uc0Zyb21Tb3VyY2UsXHJcbiAgICAgICAgbGF5ZXJPcHRpb25zIHx8IHt9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxheWVyO1xyXG4gICAgc3dpdGNoIChsYXllck9wdGlvbnMuc291cmNlLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgIGNhc2UgT1NNRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBXTVRTRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBYWVpEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIENhcnRvRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZVRpbGVMYXllcihsYXllck9wdGlvbnMgYXMgVGlsZUxheWVyT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRmVhdHVyZURhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgV0ZTRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBBcmNHSVNSZXN0RGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBXZWJTb2NrZXREYXRhU291cmNlOlxyXG4gICAgICBjYXNlIENsdXN0ZXJEYXRhU291cmNlOlxyXG4gICAgICAgIGxheWVyID0gdGhpcy5jcmVhdGVWZWN0b3JMYXllcihsYXllck9wdGlvbnMgYXMgVmVjdG9yTGF5ZXJPcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBXTVNEYXRhU291cmNlOlxyXG4gICAgICAgIGxheWVyID0gdGhpcy5jcmVhdGVJbWFnZUxheWVyKGxheWVyT3B0aW9ucyBhcyBJbWFnZUxheWVyT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTVZURGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlVmVjdG9yVGlsZUxheWVyKFxyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zIGFzIFZlY3RvclRpbGVMYXllck9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXJPcHRpb25zOiBBbnlMYXllck9wdGlvbnMpOiBPYnNlcnZhYmxlPExheWVyPiB7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZCA9PiBkLm5leHQodGhpcy5jcmVhdGVMYXllcihsYXllck9wdGlvbnMpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZVNlcnZpY2VcclxuICAgICAgLmNyZWF0ZUFzeW5jRGF0YVNvdXJjZShsYXllck9wdGlvbnMuc291cmNlT3B0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKHNvdXJjZSA9PiB7XHJcbiAgICAgICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUxheWVyKE9iamVjdC5hc3NpZ24obGF5ZXJPcHRpb25zLCB7IHNvdXJjZSB9KSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW1hZ2VMYXllcihsYXllck9wdGlvbnM6IEltYWdlTGF5ZXJPcHRpb25zKTogSW1hZ2VMYXllciB7XHJcbiAgICByZXR1cm4gbmV3IEltYWdlTGF5ZXIobGF5ZXJPcHRpb25zLCB0aGlzLmF1dGhJbnRlcmNlcHRvcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVRpbGVMYXllcihsYXllck9wdGlvbnM6IFRpbGVMYXllck9wdGlvbnMpOiBUaWxlTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBUaWxlTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zOiBWZWN0b3JMYXllck9wdGlvbnMpOiBWZWN0b3JMYXllciB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBsZXQgb2xMYXllcjtcclxuICAgIGlmIChsYXllck9wdGlvbnMuc3R5bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKGxheWVyT3B0aW9ucy5zdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2UgaW5zdGFuY2VvZiBBcmNHSVNSZXN0RGF0YVNvdXJjZSkge1xyXG4gICAgICBjb25zdCBzb3VyY2UgPSBsYXllck9wdGlvbnMuc291cmNlIGFzIEFyY0dJU1Jlc3REYXRhU291cmNlO1xyXG4gICAgICBzdHlsZSA9IHNvdXJjZS5vcHRpb25zLnBhcmFtcy5zdHlsZTtcclxuICAgIH0gZWxzZSBpZiAobGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGUpIHtcclxuICAgICAgY29uc3Qgc2VydmljZVN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2U7XHJcbiAgICAgIGxheWVyT3B0aW9ucy5zdHlsZSA9IGZlYXR1cmUgPT4ge1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlU3R5bGUuY3JlYXRlU3R5bGVCeUF0dHJpYnV0ZShcclxuICAgICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgICBsYXllck9wdGlvbnMuc3R5bGVCeUF0dHJpYnV0ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH07XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnNvdXJjZSBpbnN0YW5jZW9mIENsdXN0ZXJEYXRhU291cmNlKSB7XHJcbiAgICAgIGNvbnN0IHNlcnZpY2VTdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlO1xyXG4gICAgICBjb25zdCBiYXNlU3R5bGUgPSBsYXllck9wdGlvbnMuY2x1c3RlckJhc2VTdHlsZTtcclxuICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VTdHlsZS5jcmVhdGVDbHVzdGVyU3R5bGUoXHJcbiAgICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zLmNsdXN0ZXJQYXJhbSxcclxuICAgICAgICAgIGJhc2VTdHlsZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH07XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXllck9wdGlvbnNPbCA9IE9iamVjdC5hc3NpZ24oe30sIGxheWVyT3B0aW9ucywge1xyXG4gICAgICBzdHlsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFvbExheWVyKSB7XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zT2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwbHlNYXBib3hTdHlsZShvbExheWVyLCBsYXllck9wdGlvbnNPbCk7XHJcblxyXG4gICAgcmV0dXJuIG9sTGF5ZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVZlY3RvclRpbGVMYXllcihcclxuICAgIGxheWVyT3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9uc1xyXG4gICk6IFZlY3RvclRpbGVMYXllciB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBsZXQgb2xMYXllcjtcclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnN0eWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShsYXllck9wdGlvbnMuc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc3R5bGVCeUF0dHJpYnV0ZSkge1xyXG4gICAgICBjb25zdCBzZXJ2aWNlU3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZTtcclxuICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlID0gZmVhdHVyZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VTdHlsZS5jcmVhdGVTdHlsZUJ5QXR0cmlidXRlKFxyXG4gICAgICAgICAgZmVhdHVyZSxcclxuICAgICAgICAgIGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICAgICAgb2xMYXllciA9IG5ldyBWZWN0b3JUaWxlTGF5ZXIobGF5ZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXllck9wdGlvbnNPbCA9IE9iamVjdC5hc3NpZ24oe30sIGxheWVyT3B0aW9ucywge1xyXG4gICAgICBzdHlsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFvbExheWVyKSB7XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yVGlsZUxheWVyKGxheWVyT3B0aW9uc09sKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGx5TWFwYm94U3R5bGUob2xMYXllciwgbGF5ZXJPcHRpb25zT2wpO1xyXG4gICAgcmV0dXJuIG9sTGF5ZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5TWFwYm94U3R5bGUobGF5ZXI6IExheWVyLCBsYXllck9wdGlvbnM6IFZlY3RvclRpbGVMYXllck9wdGlvbnMpIHtcclxuICAgIGlmIChsYXllck9wdGlvbnMubWFwYm94U3R5bGUpIHtcclxuICAgICAgdGhpcy5nZXRNYXBib3hHbFN0eWxlKGxheWVyT3B0aW9ucy5tYXBib3hTdHlsZS51cmwpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgIHN0eWxlZnVuY3Rpb24obGF5ZXIub2wsIHJlcywgbGF5ZXJPcHRpb25zLm1hcGJveFN0eWxlLnNvdXJjZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1hcGJveEdsU3R5bGUodXJsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCkucGlwZShcclxuICAgICAgbWFwKChyZXM6IGFueSkgPT4gcmVzKSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBzdHlsZSB3YXMgZm91bmQnKTtcclxuICAgICAgICByZXR1cm4gb2YoZXJyKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==