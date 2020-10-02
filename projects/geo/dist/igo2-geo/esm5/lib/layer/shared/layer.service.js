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
var LayerService = /** @class */ (function () {
    function LayerService(http, styleService, dataSourceService, authInterceptor) {
        this.http = http;
        this.styleService = styleService;
        this.dataSourceService = dataSourceService;
        this.authInterceptor = authInterceptor;
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createLayer = /**
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        if (!layerOptions.source) {
            return;
        }
        if (layerOptions.source.options &&
            layerOptions.source.options._layerOptionsFromSource) {
            layerOptions = ObjectUtils.mergeDeep(layerOptions.source.options._layerOptionsFromSource, layerOptions || {});
        }
        /** @type {?} */
        var layer;
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
    };
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createAsyncLayer = /**
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        var _this = this;
        if (layerOptions.source) {
            return new Observable((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.next(_this.createLayer(layerOptions)); }));
        }
        return this.dataSourceService
            .createAsyncDataSource(layerOptions.sourceOptions)
            .pipe(map((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (source === undefined) {
                return undefined;
            }
            return _this.createLayer(Object.assign(layerOptions, { source: source }));
        })));
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createImageLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        return new ImageLayer(layerOptions, this.authInterceptor);
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createTileLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        return new TileLayer(layerOptions);
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createVectorLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        /** @type {?} */
        var style;
        /** @type {?} */
        var olLayer;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.source instanceof ArcGISRestDataSource) {
            /** @type {?} */
            var source = (/** @type {?} */ (layerOptions.source));
            style = source.options.params.style;
        }
        else if (layerOptions.styleByAttribute) {
            /** @type {?} */
            var serviceStyle_1 = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_1.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            olLayer = new VectorLayer(layerOptions);
        }
        if (layerOptions.source instanceof ClusterDataSource) {
            /** @type {?} */
            var serviceStyle_2 = this.styleService;
            /** @type {?} */
            var baseStyle_1 = layerOptions.clusterBaseStyle;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_2.createClusterStyle(feature, layerOptions.clusterParam, baseStyle_1);
            });
            olLayer = new VectorLayer(layerOptions);
        }
        /** @type {?} */
        var layerOptionsOl = Object.assign({}, layerOptions, {
            style: style
        });
        if (!olLayer) {
            olLayer = new VectorLayer(layerOptionsOl);
        }
        this.applyMapboxStyle(olLayer, layerOptionsOl);
        return olLayer;
    };
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.createVectorTileLayer = /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        /** @type {?} */
        var style;
        /** @type {?} */
        var olLayer;
        if (layerOptions.style !== undefined) {
            style = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.styleByAttribute) {
            /** @type {?} */
            var serviceStyle_3 = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return serviceStyle_3.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            olLayer = new VectorTileLayer(layerOptions);
        }
        /** @type {?} */
        var layerOptionsOl = Object.assign({}, layerOptions, {
            style: style
        });
        if (!olLayer) {
            olLayer = new VectorTileLayer(layerOptionsOl);
        }
        this.applyMapboxStyle(olLayer, layerOptionsOl);
        return olLayer;
    };
    /**
     * @private
     * @param {?} layer
     * @param {?} layerOptions
     * @return {?}
     */
    LayerService.prototype.applyMapboxStyle = /**
     * @private
     * @param {?} layer
     * @param {?} layerOptions
     * @return {?}
     */
    function (layer, layerOptions) {
        if (layerOptions.mapboxStyle) {
            this.getMapboxGlStyle(layerOptions.mapboxStyle.url).subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                stylefunction(layer.ol, res, layerOptions.mapboxStyle.source);
            }));
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    LayerService.prototype.getMapboxGlStyle = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.http.get(url).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            console.log('No style was found');
            return of(err);
        })));
    };
    LayerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LayerService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: StyleService },
        { type: DataSourceService },
        { type: AuthInterceptor, decorators: [{ type: Optional }] }
    ]; };
    /** @nocollapse */ LayerService.ngInjectableDef = i0.defineInjectable({ factory: function LayerService_Factory() { return new LayerService(i0.inject(i1.HttpClient), i0.inject(i2.StyleService), i0.inject(i3.DataSourceService), i0.inject(i4.AuthInterceptor, 8)); }, token: LayerService, providedIn: "root" });
    return LayerService;
}());
export { LayerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sK0JBQStCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRS9FLE9BQU8sRUFFTCxVQUFVLEVBRVYsU0FBUyxFQUVULFdBQVcsRUFHWCxlQUFlLEVBRWhCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBRS9DO0lBSUUsc0JBQ1UsSUFBZ0IsRUFDaEIsWUFBMEIsRUFDMUIsaUJBQW9DLEVBQ3hCLGVBQWdDO1FBSDVDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENB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Z0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQy9ELGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVNLHVDQUFnQjs7OztJQUF2QixVQUF3QixHQUFXO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM1QixHQUFHOzs7O1FBQUMsVUFBQyxHQUFRLElBQUssT0FBQSxHQUFHLEVBQUgsQ0FBRyxFQUFDLEVBQ3RCLFVBQVU7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O2dCQWxMRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXpDUSxVQUFVO2dCQXFDVixZQUFZO2dCQWZaLGlCQUFpQjtnQkFsQmpCLGVBQWUsdUJBMkNuQixRQUFROzs7dUJBaERiO0NBMk5DLEFBbkxELElBbUxDO1NBaExZLFlBQVk7Ozs7OztJQUVyQiw0QkFBd0I7Ozs7O0lBQ3hCLG9DQUFrQzs7Ozs7SUFDbEMseUNBQTRDOzs7OztJQUM1Qyx1Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgc3R5bGVmdW5jdGlvbiBmcm9tICdvbC1tYXBib3gtc3R5bGUvc3R5bGVmdW5jdGlvbic7XHJcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgT1NNRGF0YVNvdXJjZSxcclxuICBGZWF0dXJlRGF0YVNvdXJjZSxcclxuICBYWVpEYXRhU291cmNlLFxyXG4gIFdGU0RhdGFTb3VyY2UsXHJcbiAgV01UU0RhdGFTb3VyY2UsXHJcbiAgV01TRGF0YVNvdXJjZSxcclxuICBDYXJ0b0RhdGFTb3VyY2UsXHJcbiAgQXJjR0lTUmVzdERhdGFTb3VyY2UsXHJcbiAgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlLFxyXG4gIFdlYlNvY2tldERhdGFTb3VyY2UsXHJcbiAgTVZURGF0YVNvdXJjZSxcclxuICBDbHVzdGVyRGF0YVNvdXJjZVxyXG59IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBMYXllcixcclxuICBJbWFnZUxheWVyLFxyXG4gIEltYWdlTGF5ZXJPcHRpb25zLFxyXG4gIFRpbGVMYXllcixcclxuICBUaWxlTGF5ZXJPcHRpb25zLFxyXG4gIFZlY3RvckxheWVyLFxyXG4gIFZlY3RvckxheWVyT3B0aW9ucyxcclxuICBBbnlMYXllck9wdGlvbnMsXHJcbiAgVmVjdG9yVGlsZUxheWVyLFxyXG4gIFZlY3RvclRpbGVMYXllck9wdGlvbnNcclxufSBmcm9tICcuL2xheWVycyc7XHJcblxyXG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuL3N0eWxlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VTZXJ2aWNlOiBEYXRhU291cmNlU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgYXV0aEludGVyY2VwdG9yOiBBdXRoSW50ZXJjZXB0b3JcclxuICApIHt9XHJcblxyXG4gIGNyZWF0ZUxheWVyKGxheWVyT3B0aW9uczogQW55TGF5ZXJPcHRpb25zKTogTGF5ZXIge1xyXG4gICAgaWYgKCFsYXllck9wdGlvbnMuc291cmNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGxheWVyT3B0aW9ucy5zb3VyY2Uub3B0aW9ucyAmJlxyXG4gICAgICBsYXllck9wdGlvbnMuc291cmNlLm9wdGlvbnMuX2xheWVyT3B0aW9uc0Zyb21Tb3VyY2VcclxuICAgICkge1xyXG4gICAgICBsYXllck9wdGlvbnMgPSBPYmplY3RVdGlscy5tZXJnZURlZXAoXHJcbiAgICAgICAgbGF5ZXJPcHRpb25zLnNvdXJjZS5vcHRpb25zLl9sYXllck9wdGlvbnNGcm9tU291cmNlLFxyXG4gICAgICAgIGxheWVyT3B0aW9ucyB8fCB7fVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXllcjtcclxuICAgIHN3aXRjaCAobGF5ZXJPcHRpb25zLnNvdXJjZS5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICBjYXNlIE9TTURhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgV01UU0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgWFlaRGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBDYXJ0b0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlOlxyXG4gICAgICAgIGxheWVyID0gdGhpcy5jcmVhdGVUaWxlTGF5ZXIobGF5ZXJPcHRpb25zIGFzIFRpbGVMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEZlYXR1cmVEYXRhU291cmNlOlxyXG4gICAgICBjYXNlIFdGU0RhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgQXJjR0lTUmVzdERhdGFTb3VyY2U6XHJcbiAgICAgIGNhc2UgV2ViU29ja2V0RGF0YVNvdXJjZTpcclxuICAgICAgY2FzZSBDbHVzdGVyRGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlVmVjdG9yTGF5ZXIobGF5ZXJPcHRpb25zIGFzIFZlY3RvckxheWVyT3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgV01TRGF0YVNvdXJjZTpcclxuICAgICAgICBsYXllciA9IHRoaXMuY3JlYXRlSW1hZ2VMYXllcihsYXllck9wdGlvbnMgYXMgSW1hZ2VMYXllck9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE1WVERhdGFTb3VyY2U6XHJcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmNyZWF0ZVZlY3RvclRpbGVMYXllcihcclxuICAgICAgICAgIGxheWVyT3B0aW9ucyBhcyBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGF5ZXI7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVBc3luY0xheWVyKGxheWVyT3B0aW9uczogQW55TGF5ZXJPcHRpb25zKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2UpIHtcclxuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGQgPT4gZC5uZXh0KHRoaXMuY3JlYXRlTGF5ZXIobGF5ZXJPcHRpb25zKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2VTZXJ2aWNlXHJcbiAgICAgIC5jcmVhdGVBc3luY0RhdGFTb3VyY2UobGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChzb3VyY2UgPT4ge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVMYXllcihPYmplY3QuYXNzaWduKGxheWVyT3B0aW9ucywgeyBzb3VyY2UgfSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUltYWdlTGF5ZXIobGF5ZXJPcHRpb25zOiBJbWFnZUxheWVyT3B0aW9ucyk6IEltYWdlTGF5ZXIge1xyXG4gICAgcmV0dXJuIG5ldyBJbWFnZUxheWVyKGxheWVyT3B0aW9ucywgdGhpcy5hdXRoSW50ZXJjZXB0b3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVUaWxlTGF5ZXIobGF5ZXJPcHRpb25zOiBUaWxlTGF5ZXJPcHRpb25zKTogVGlsZUxheWVyIHtcclxuICAgIHJldHVybiBuZXcgVGlsZUxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVZlY3RvckxheWVyKGxheWVyT3B0aW9uczogVmVjdG9yTGF5ZXJPcHRpb25zKTogVmVjdG9yTGF5ZXIge1xyXG4gICAgbGV0IHN0eWxlO1xyXG4gICAgbGV0IG9sTGF5ZXI7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnN0eWxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShsYXllck9wdGlvbnMuc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXllck9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgQXJjR0lTUmVzdERhdGFTb3VyY2UpIHtcclxuICAgICAgY29uc3Qgc291cmNlID0gbGF5ZXJPcHRpb25zLnNvdXJjZSBhcyBBcmNHSVNSZXN0RGF0YVNvdXJjZTtcclxuICAgICAgc3R5bGUgPSBzb3VyY2Uub3B0aW9ucy5wYXJhbXMuc3R5bGU7XHJcbiAgICB9IGVsc2UgaWYgKGxheWVyT3B0aW9ucy5zdHlsZUJ5QXR0cmlidXRlKSB7XHJcbiAgICAgIGNvbnN0IHNlcnZpY2VTdHlsZSA9IHRoaXMuc3R5bGVTZXJ2aWNlO1xyXG4gICAgICBsYXllck9wdGlvbnMuc3R5bGUgPSBmZWF0dXJlID0+IHtcclxuICAgICAgICByZXR1cm4gc2VydmljZVN0eWxlLmNyZWF0ZVN0eWxlQnlBdHRyaWJ1dGUoXHJcbiAgICAgICAgICBmZWF0dXJlLFxyXG4gICAgICAgICAgbGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGVcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG4gICAgICBvbExheWVyID0gbmV3IFZlY3RvckxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2UgaW5zdGFuY2VvZiBDbHVzdGVyRGF0YVNvdXJjZSkge1xyXG4gICAgICBjb25zdCBzZXJ2aWNlU3R5bGUgPSB0aGlzLnN0eWxlU2VydmljZTtcclxuICAgICAgY29uc3QgYmFzZVN0eWxlID0gbGF5ZXJPcHRpb25zLmNsdXN0ZXJCYXNlU3R5bGU7XHJcbiAgICAgIGxheWVyT3B0aW9ucy5zdHlsZSA9IGZlYXR1cmUgPT4ge1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlU3R5bGUuY3JlYXRlQ2x1c3RlclN0eWxlKFxyXG4gICAgICAgICAgZmVhdHVyZSxcclxuICAgICAgICAgIGxheWVyT3B0aW9ucy5jbHVzdGVyUGFyYW0sXHJcbiAgICAgICAgICBiYXNlU3R5bGVcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG4gICAgICBvbExheWVyID0gbmV3IFZlY3RvckxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zT2wgPSBPYmplY3QuYXNzaWduKHt9LCBsYXllck9wdGlvbnMsIHtcclxuICAgICAgc3R5bGVcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghb2xMYXllcikge1xyXG4gICAgICBvbExheWVyID0gbmV3IFZlY3RvckxheWVyKGxheWVyT3B0aW9uc09sKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGx5TWFwYm94U3R5bGUob2xMYXllciwgbGF5ZXJPcHRpb25zT2wpO1xyXG5cclxuICAgIHJldHVybiBvbExheWVyO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVWZWN0b3JUaWxlTGF5ZXIoXHJcbiAgICBsYXllck9wdGlvbnM6IFZlY3RvclRpbGVMYXllck9wdGlvbnNcclxuICApOiBWZWN0b3JUaWxlTGF5ZXIge1xyXG4gICAgbGV0IHN0eWxlO1xyXG4gICAgbGV0IG9sTGF5ZXI7XHJcblxyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zdHlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2UuY3JlYXRlU3R5bGUobGF5ZXJPcHRpb25zLnN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnN0eWxlQnlBdHRyaWJ1dGUpIHtcclxuICAgICAgY29uc3Qgc2VydmljZVN0eWxlID0gdGhpcy5zdHlsZVNlcnZpY2U7XHJcbiAgICAgIGxheWVyT3B0aW9ucy5zdHlsZSA9IGZlYXR1cmUgPT4ge1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlU3R5bGUuY3JlYXRlU3R5bGVCeUF0dHJpYnV0ZShcclxuICAgICAgICAgIGZlYXR1cmUsXHJcbiAgICAgICAgICBsYXllck9wdGlvbnMuc3R5bGVCeUF0dHJpYnV0ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH07XHJcbiAgICAgIG9sTGF5ZXIgPSBuZXcgVmVjdG9yVGlsZUxheWVyKGxheWVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zT2wgPSBPYmplY3QuYXNzaWduKHt9LCBsYXllck9wdGlvbnMsIHtcclxuICAgICAgc3R5bGVcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghb2xMYXllcikge1xyXG4gICAgICBvbExheWVyID0gbmV3IFZlY3RvclRpbGVMYXllcihsYXllck9wdGlvbnNPbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBseU1hcGJveFN0eWxlKG9sTGF5ZXIsIGxheWVyT3B0aW9uc09sKTtcclxuICAgIHJldHVybiBvbExheWVyO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseU1hcGJveFN0eWxlKGxheWVyOiBMYXllciwgbGF5ZXJPcHRpb25zOiBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLm1hcGJveFN0eWxlKSB7XHJcbiAgICAgIHRoaXMuZ2V0TWFwYm94R2xTdHlsZShsYXllck9wdGlvbnMubWFwYm94U3R5bGUudXJsKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICBzdHlsZWZ1bmN0aW9uKGxheWVyLm9sLCByZXMsIGxheWVyT3B0aW9ucy5tYXBib3hTdHlsZS5zb3VyY2UpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNYXBib3hHbFN0eWxlKHVybDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpLnBpcGUoXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+IHJlcyksXHJcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gc3R5bGUgd2FzIGZvdW5kJyk7XHJcbiAgICAgICAgcmV0dXJuIG9mKGVycik7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=