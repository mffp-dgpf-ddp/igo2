/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import olProjection from 'ol/proj/Projection';
import { MessageService, LanguageService } from '@igo2/core';
import { OgcFilterWriter } from '../../filter/shared';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
export class DownloadService {
    /**
     * @param {?} messageService
     * @param {?} languageService
     */
    constructor(messageService, languageService) {
        this.messageService = messageService;
        this.languageService = languageService;
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    open(layer) {
        /** @type {?} */
        const translate = this.languageService.translate;
        /** @type {?} */
        const title = translate.instant('igo.geo.download.title');
        this.messageService.success(translate.instant('igo.geo.download.start'), title);
        /** @type {?} */
        const DSOptions = layer.dataSource.options;
        if (Object.keys(DSOptions.download).length > 0) {
            if (DSOptions.download.dynamicUrl &&
                DSOptions.download.url === undefined) {
                /** @type {?} */
                let wfsOptions;
                if (((/** @type {?} */ (layer.dataSource.options))).paramsWFS &&
                    Object.keys(((/** @type {?} */ (layer.dataSource.options))).paramsWFS).length > 0) {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).paramsWFS;
                }
                else {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).params;
                }
                /** @type {?} */
                const outputFormatDownload = wfsOptions.outputFormatDownload === undefined
                    ? 'outputformat=' + wfsOptions.outputFormat
                    : 'outputformat=' + wfsOptions.outputFormatDownload;
                /** @type {?} */
                const baseurl = DSOptions.download.dynamicUrl
                    .replace(/&?outputformat=[^&]*/gi, '')
                    .replace(/&?filter=[^&]*/gi, '')
                    .replace(/&?bbox=[^&]*/gi, '');
                /** @type {?} */
                const ogcFilters = ((/** @type {?} */ (layer.dataSource.options))).ogcFilters;
                /** @type {?} */
                let filterQueryString;
                filterQueryString = new OgcFilterWriter()
                    .handleOgcFiltersAppliedValue(layer.dataSource.options, ogcFilters.geometryName);
                if (!filterQueryString) {
                    // Prevent getting all the features for empty filter
                    filterQueryString = new OgcFilterWriter().buildFilter(undefined, layer.map.getExtent(), new olProjection({ code: layer.map.projection }), ogcFilters.geometryName);
                }
                else {
                    filterQueryString = 'filter=' + filterQueryString;
                }
                window.open(`${baseurl}&${filterQueryString}&${outputFormatDownload}`, '_blank');
            }
            else if (DSOptions.download) {
                window.open(DSOptions.download.url, '_blank');
            }
        }
    }
}
DownloadService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DownloadService.ctorParameters = () => [
    { type: MessageService },
    { type: LanguageService }
];
/** @nocollapse */ DownloadService.ngInjectableDef = i0.defineInjectable({ factory: function DownloadService_Factory() { return new DownloadService(i0.inject(i1.MessageService), i0.inject(i1.LanguageService)); }, token: DownloadService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    DownloadService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    DownloadService.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFrQyxNQUFNLHFCQUFxQixDQUFDOzs7QUFPdEYsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBRTFCLFlBQ1UsY0FBOEIsRUFDOUIsZUFBZ0M7UUFEaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN2QyxDQUFDOzs7OztJQUVKLElBQUksQ0FBQyxLQUFZOztjQUNULFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7O2NBQzFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUN6QixTQUFTLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEVBQzNDLEtBQUssQ0FDTixDQUFDOztjQUVJLFNBQVMsR0FBc0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1FBQzdELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QyxJQUNFLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUNwQzs7b0JBQ0ksVUFBVTtnQkFDZCxJQUNFLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBQSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbkU7b0JBQ0EsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDMUQ7cUJBQU07b0JBQ0wsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDdkQ7O3NCQUVLLG9CQUFvQixHQUN4QixVQUFVLENBQUMsb0JBQW9CLEtBQUssU0FBUztvQkFDM0MsQ0FBQyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsWUFBWTtvQkFDM0MsQ0FBQyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsb0JBQW9COztzQkFFakQsT0FBTyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVTtxQkFDMUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQztxQkFDckMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztxQkFDL0IsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQzs7c0JBRTFCLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFrQyxDQUFDLENBQUMsVUFBVTs7b0JBRXRGLGlCQUFpQjtnQkFDckIsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLEVBQUU7cUJBQ3hDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUN0QixvREFBb0Q7b0JBQ2xELGlCQUFpQixHQUFHLElBQUksZUFBZSxFQUFFLENBQUMsV0FBVyxDQUNyRCxTQUFTLEVBQ1QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFDckIsSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNoRCxVQUFVLENBQUMsWUFBWSxDQUN4QixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLGlCQUFpQixHQUFHLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztpQkFDbkQ7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FDVCxHQUFHLE9BQU8sSUFBSSxpQkFBaUIsSUFBSSxvQkFBb0IsRUFBRSxFQUN6RCxRQUFRLENBQ1QsQ0FBQzthQUNIO2lCQUFNLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUMvQztTQUNGO0lBQ0gsQ0FBQzs7O1lBcEVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVRRLGNBQWM7WUFBRSxlQUFlOzs7Ozs7OztJQWFwQyx5Q0FBc0M7Ozs7O0lBQ3RDLDBDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCBvbFByb2plY3Rpb24gZnJvbSAnb2wvcHJvai9Qcm9qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkJztcclxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyLCBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9maWx0ZXIvc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRG93bmxvYWRTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG9wZW4obGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRvd25sb2FkLnRpdGxlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MoXHJcbiAgICAgIHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRvd25sb2FkLnN0YXJ0JyksXHJcbiAgICAgIHRpdGxlXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IERTT3B0aW9uczogRGF0YVNvdXJjZU9wdGlvbnMgPSBsYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoRFNPcHRpb25zLmRvd25sb2FkKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBEU09wdGlvbnMuZG93bmxvYWQuZHluYW1pY1VybCAmJlxyXG4gICAgICAgIERTT3B0aW9ucy5kb3dubG9hZC51cmwgPT09IHVuZGVmaW5lZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgd2ZzT3B0aW9ucztcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTICYmXHJcbiAgICAgICAgICBPYmplY3Qua2V5cygobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTKS5sZW5ndGggPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB3ZnNPcHRpb25zID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2ZzT3B0aW9ucyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvdXRwdXRGb3JtYXREb3dubG9hZCA9XHJcbiAgICAgICAgICB3ZnNPcHRpb25zLm91dHB1dEZvcm1hdERvd25sb2FkID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyAnb3V0cHV0Zm9ybWF0PScgKyB3ZnNPcHRpb25zLm91dHB1dEZvcm1hdFxyXG4gICAgICAgICAgICA6ICdvdXRwdXRmb3JtYXQ9JyArIHdmc09wdGlvbnMub3V0cHV0Rm9ybWF0RG93bmxvYWQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2V1cmwgPSBEU09wdGlvbnMuZG93bmxvYWQuZHluYW1pY1VybFxyXG4gICAgICAgICAgLnJlcGxhY2UoLyY/b3V0cHV0Zm9ybWF0PVteJl0qL2dpLCAnJylcclxuICAgICAgICAgIC5yZXBsYWNlKC8mP2ZpbHRlcj1bXiZdKi9naSwgJycpXHJcbiAgICAgICAgICAucmVwbGFjZSgvJj9iYm94PVteJl0qL2dpLCAnJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9nY0ZpbHRlcnMgPSAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycztcclxuXHJcbiAgICAgICAgbGV0IGZpbHRlclF1ZXJ5U3RyaW5nO1xyXG4gICAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nID0gbmV3IE9nY0ZpbHRlcldyaXRlcigpXHJcbiAgICAgICAgLmhhbmRsZU9nY0ZpbHRlcnNBcHBsaWVkVmFsdWUobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLCBvZ2NGaWx0ZXJzLmdlb21ldHJ5TmFtZSk7XHJcbiAgICAgICAgaWYgKCFmaWx0ZXJRdWVyeVN0cmluZykge1xyXG4gICAgICAgICAgLy8gUHJldmVudCBnZXR0aW5nIGFsbCB0aGUgZmVhdHVyZXMgZm9yIGVtcHR5IGZpbHRlclxyXG4gICAgICAgICAgICBmaWx0ZXJRdWVyeVN0cmluZyA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKS5idWlsZEZpbHRlcihcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBsYXllci5tYXAuZ2V0RXh0ZW50KCksXHJcbiAgICAgICAgICAgIG5ldyBvbFByb2plY3Rpb24oeyBjb2RlOiBsYXllci5tYXAucHJvamVjdGlvbiB9KSxcclxuICAgICAgICAgICAgb2djRmlsdGVycy5nZW9tZXRyeU5hbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZpbHRlclF1ZXJ5U3RyaW5nID0gJ2ZpbHRlcj0nICsgZmlsdGVyUXVlcnlTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5vcGVuKFxyXG4gICAgICAgICAgYCR7YmFzZXVybH0mJHtmaWx0ZXJRdWVyeVN0cmluZ30mJHtvdXRwdXRGb3JtYXREb3dubG9hZH1gLFxyXG4gICAgICAgICAgJ19ibGFuaydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKERTT3B0aW9ucy5kb3dubG9hZCkge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKERTT3B0aW9ucy5kb3dubG9hZC51cmwsICdfYmxhbmsnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=