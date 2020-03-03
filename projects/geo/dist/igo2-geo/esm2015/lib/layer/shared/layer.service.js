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
            layerOptions.source.options.optionsFromCapabilities) {
            layerOptions = ObjectUtils.mergeDeep(((/** @type {?} */ (layerOptions.source.options)))._layerOptionsFromCapabilities ||
                {}, layerOptions || {});
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
            const baseStyle = layerOptions.style;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sK0JBQStCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRS9FLE9BQU8sRUFFTCxVQUFVLEVBRVYsU0FBUyxFQUVULFdBQVcsRUFHWCxlQUFlLEVBRWhCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBSy9DLE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBQ3ZCLFlBQ1UsSUFBZ0IsRUFDaEIsWUFBMEIsRUFDMUIsaUJBQW9DLEVBQ3hCLGVBQWdDO1FBSDVDLFNBQUksR0FBSixJQUFJLENBQVk7UUFD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QyxTQUFTOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xFLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVNLGdCQUFnQixDQUFDLEdBQVc7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzVCLEdBQUc7Ozs7UUFBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQ3RCLFVBQVU7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7O1lBbkxGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXpDUSxVQUFVO1lBcUNWLFlBQVk7WUFmWixpQkFBaUI7WUFsQmpCLGVBQWUsdUJBMkNuQixRQUFROzs7Ozs7OztJQUhULDRCQUF3Qjs7Ozs7SUFDeEIsb0NBQWtDOzs7OztJQUNsQyx5Q0FBNEM7Ozs7O0lBQzVDLHVDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCBzdHlsZWZ1bmN0aW9uIGZyb20gJ29sLW1hcGJveC1zdHlsZS9zdHlsZWZ1bmN0aW9uJztcclxuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnQGlnbzIvYXV0aCc7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBPU01EYXRhU291cmNlLFxyXG4gIEZlYXR1cmVEYXRhU291cmNlLFxyXG4gIFhZWkRhdGFTb3VyY2UsXHJcbiAgV0ZTRGF0YVNvdXJjZSxcclxuICBXTVRTRGF0YVNvdXJjZSxcclxuICBXTVNEYXRhU291cmNlLFxyXG4gIENhcnRvRGF0YVNvdXJjZSxcclxuICBBcmNHSVNSZXN0RGF0YVNvdXJjZSxcclxuICBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgV2ViU29ja2V0RGF0YVNvdXJjZSxcclxuICBNVlREYXRhU291cmNlLFxyXG4gIENsdXN0ZXJEYXRhU291cmNlXHJcbn0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIExheWVyLFxyXG4gIEltYWdlTGF5ZXIsXHJcbiAgSW1hZ2VMYXllck9wdGlvbnMsXHJcbiAgVGlsZUxheWVyLFxyXG4gIFRpbGVMYXllck9wdGlvbnMsXHJcbiAgVmVjdG9yTGF5ZXIsXHJcbiAgVmVjdG9yTGF5ZXJPcHRpb25zLFxyXG4gIEFueUxheWVyT3B0aW9ucyxcclxuICBWZWN0b3JUaWxlTGF5ZXIsXHJcbiAgVmVjdG9yVGlsZUxheWVyT3B0aW9uc1xyXG59IGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4vc3R5bGUuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNvdXJjZVNlcnZpY2U6IERhdGFTb3VyY2VTZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBhdXRoSW50ZXJjZXB0b3I6IEF1dGhJbnRlcmNlcHRvclxyXG4gICkge31cclxuXHJcbiAgY3JlYXRlTGF5ZXIobGF5ZXJPcHRpb25zOiBBbnlMYXllck9wdGlvbnMpOiBMYXllciB7XHJcbiAgICBpZiAoIWxheWVyT3B0aW9ucy5zb3VyY2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgbGF5ZXJPcHRpb25zLnNvdXJjZS5vcHRpb25zICYmXHJcbiAgICAgIGxheWVyT3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5vcHRpb25zRnJvbUNhcGFiaWxpdGllc1xyXG4gICAgKSB7XHJcbiAgICAgIGxheWVyT3B0aW9ucyA9IE9iamVjdFV0aWxzLm1lcmdlRGVlcChcclxuICAgICAgICAobGF5ZXJPcHRpb25zLnNvdXJjZS5vcHRpb25zIGFzIGFueSkuX2xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMgfHxcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgIGxheWVyT3B0aW9ucyB8fCB7fVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXllcjtcclxuICAgIHN3aXRjaCAobGF5ZXJPcHRpb25zLnNvdXJjZS5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICBjYXNlIE9TTURhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgV01UU0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgWFlaRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBDYXJ0b0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICAgIGxheWVyID0gdGhpcy5jcmVhdGVUaWxlTGF5ZXIobGF5ZXJPcHRpb25zIGFzIFRpbGVMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEZlYXR1cmVEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFdGU0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgQXJjR0lTUmVzdERhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgV2ViU29ja2V0RGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBDbHVzdGVyRGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zIGFzIFZlY3RvckxheWVyT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgV01TRGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlSW1hZ2VMYXllcihsYXllck9wdGlvbnMgYXMgSW1hZ2VMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE1WVERhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZVZlY3RvclRpbGVMYXllcihcclxuICAgICAgICAgIGxheWVyT3B0aW9ucyBhcyBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVBc3luY0xheWVyKGxheWVyT3B0aW9uczogQW55TGF5ZXJPcHRpb25zKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2UpIHtcclxuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KHRoaXMuY3JlYXRlTGF5ZXIobGF5ZXJPcHRpb25zKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2VTZXJ2aWNlXHJcbiAgICAgIC5jcmVhdGVBc3luY0RhdGFTb3VyY2UobGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChzb3VyY2UgPT4ge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVMYXllcihPYmplY3QuYXNzaWduKGxheWVyT3B0aW9ucywgeyBzb3VyY2UgfSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUltYWdlTGF5ZXIobGF5ZXJPcHRpb25zOiBJbWFnZUxheWVyT3B0aW9ucyk6IEltYWdlTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBJbWFnZUxheWVyKGxheWVyT3B0aW9ucywgdGhpcy5hdXRoSW50ZXJjZXB0b3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVUaWxlTGF5ZXIobGF5ZXJPcHRpb25zOiBUaWxlTGF5ZXJPcHRpb25zKTogVGlsZUxheWVyIHtcclxuICAgIHJldHVybiBuZXcgVGlsZUxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVZlY3RvckxheWVyKGxheWVyT3B0aW9uczogVmVjdG9yTGF5ZXJPcHRpb25zKTogVmVjdG9yTGF5ZXIge1xyXG4gICAgbGV0IHN0eWxlO1xyXG4gICAgbGV0IG9sTGF5ZXI7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnN0eWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShsYXllck9wdGlvbnMuc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgQXJjR0lTUmVzdERhdGFTb3VyY2UpIHtcclxuICAgICAgY29uc3Qgc291cmNlID0gbGF5ZXJPcHRpb25zLnNvdXJjZSBhcyBBcmNHSVNSZXN0RGF0YVNvdXJjZTtcclxuICAgICAgc3R5bGUgPSBzb3VyY2Uub3B0aW9ucy5wYXJhbXMuc3R5bGU7XHJcbiAgICB9IGVsc2UgaWYgKGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlKSB7XHJcbiAgICAgIGNvbnN0IHNlcnZpY2VTdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlO1xyXG4gICAgICBsYXllck9wdGlvbnMuc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgICByZXR1cm4gc2VydmljZVN0eWxlLmNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoXHJcbiAgICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGVcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG4gICAgICBvbExheWVyID0gbmV3IFZlY3RvckxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2UgaW5zdGFuY2VvZiBDbHVzdGVyRGF0YVNvdXJjZSkge1xyXG4gICAgICBjb25zdCBzZXJ2aWNlU3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZTtcclxuICAgICAgY29uc3QgYmFzZVN0eWxlID0gbGF5ZXJPcHRpb25zLnN0eWxlO1xyXG4gICAgICBsYXllck9wdGlvbnMuc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgICByZXR1cm4gc2VydmljZVN0eWxlLmNyZWF0ZUNsdXN0ZXJTdHlsZShcclxuICAgICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgICBsYXllck9wdGlvbnMuY2x1c3RlclBhcmFtLFxyXG4gICAgICAgICAgYmFzZVN0eWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICAgICAgb2xMYXllciA9IG5ldyBWZWN0b3JMYXllcihsYXllck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9uc09sID0gT2JqZWN0LmFzc2lnbih7fSwgbGF5ZXJPcHRpb25zLCB7XHJcbiAgICAgIHN0eWxlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIW9sTGF5ZXIpIHtcclxuICAgICAgb2xMYXllciA9IG5ldyBWZWN0b3JMYXllcihsYXllck9wdGlvbnNPbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBseU1hcGJveFN0eWxlKG9sTGF5ZXIsIGxheWVyT3B0aW9uc09sKTtcclxuXHJcbiAgICByZXR1cm4gb2xMYXllcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVmVjdG9yVGlsZUxheWVyKFxyXG4gICAgbGF5ZXJPcHRpb25zOiBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zXHJcbiAgKTogVmVjdG9yVGlsZUxheWVyIHtcclxuICAgIGxldCBzdHlsZTtcclxuICAgIGxldCBvbExheWVyO1xyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc3R5bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlLmNyZWF0ZVN0eWxlKGxheWVyT3B0aW9ucy5zdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlKSB7XHJcbiAgICAgIGNvbnN0IHNlcnZpY2VTdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlO1xyXG4gICAgICBsYXllck9wdGlvbnMuc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgICByZXR1cm4gc2VydmljZVN0eWxlLmNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoXHJcbiAgICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGVcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG4gICAgICBvbExheWVyID0gbmV3IFZlY3RvclRpbGVMYXllcihsYXllck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9uc09sID0gT2JqZWN0LmFzc2lnbih7fSwgbGF5ZXJPcHRpb25zLCB7XHJcbiAgICAgIHN0eWxlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIW9sTGF5ZXIpIHtcclxuICAgICAgb2xMYXllciA9IG5ldyBWZWN0b3JUaWxlTGF5ZXIobGF5ZXJPcHRpb25zT2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwbHlNYXBib3hTdHlsZShvbExheWVyLCBsYXllck9wdGlvbnNPbCk7XHJcbiAgICByZXR1cm4gb2xMYXllcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlNYXBib3hTdHlsZShsYXllcjogTGF5ZXIsIGxheWVyT3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9ucykge1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5tYXBib3hTdHlsZSkge1xyXG4gICAgICB0aGlzLmdldE1hcGJveEdsU3R5bGUobGF5ZXJPcHRpb25zLm1hcGJveFN0eWxlLnVybCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgc3R5bGVmdW5jdGlvbihsYXllci5vbCwgcmVzLCBsYXllck9wdGlvbnMubWFwYm94U3R5bGUuc291cmNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWFwYm94R2xTdHlsZSh1cmw6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PiByZXMpLFxyXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vIHN0eWxlIHdhcyBmb3VuZCcpO1xyXG4gICAgICAgIHJldHVybiBvZihlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19