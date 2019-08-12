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
        this.ogcFilterWriter = new OgcFilterWriter();
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
                const rebuildFilter = this.ogcFilterWriter.buildFilter(((/** @type {?} */ (layer.dataSource.options))).ogcFilters.filters, layer.map.getExtent(), new olProjection({ code: layer.map.projection }), wfsOptions.fieldNameGeometry);
                window.open(`${baseurl}&${rebuildFilter}&${outputFormatDownload}`, '_blank');
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
    DownloadService.prototype.ogcFilterWriter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQU90RCxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFHMUIsWUFDVSxjQUE4QixFQUM5QixlQUFnQztRQURoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXhDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUVELElBQUksQ0FBQyxLQUFZOztjQUNULFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7O2NBQzFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUN6QixTQUFTLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEVBQzNDLEtBQUssQ0FDTixDQUFDOztjQUVJLFNBQVMsR0FBc0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1FBQzdELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QyxJQUNFLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUNwQzs7b0JBQ0ksVUFBVTtnQkFDZCxJQUNFLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBQSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbkU7b0JBQ0EsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDMUQ7cUJBQU07b0JBQ0wsVUFBVSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDdkQ7O3NCQUVLLG9CQUFvQixHQUN4QixVQUFVLENBQUMsb0JBQW9CLEtBQUssU0FBUztvQkFDM0MsQ0FBQyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsWUFBWTtvQkFDM0MsQ0FBQyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsb0JBQW9COztzQkFFakQsT0FBTyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVTtxQkFDMUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQztxQkFDckMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztxQkFDL0IsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQzs7c0JBRTFCLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDcEQsQ0FBQyxtQkFBQSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFDcEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFDckIsSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNoRCxVQUFVLENBQUMsaUJBQWlCLENBQzdCO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQ1QsR0FBRyxPQUFPLElBQUksYUFBYSxJQUFJLG9CQUFvQixFQUFFLEVBQ3JELFFBQVEsQ0FDVCxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDOzs7WUE3REYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBVFEsY0FBYztZQUFFLGVBQWU7Ozs7Ozs7O0lBV3RDLDBDQUF5Qzs7Ozs7SUFHdkMseUNBQXNDOzs7OztJQUN0QywwQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgb2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgb2djRmlsdGVyV3JpdGVyOiBPZ2NGaWx0ZXJXcml0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICB9XHJcblxyXG4gIG9wZW4obGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRvd25sb2FkLnRpdGxlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MoXHJcbiAgICAgIHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRvd25sb2FkLnN0YXJ0JyksXHJcbiAgICAgIHRpdGxlXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IERTT3B0aW9uczogRGF0YVNvdXJjZU9wdGlvbnMgPSBsYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoRFNPcHRpb25zLmRvd25sb2FkKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBEU09wdGlvbnMuZG93bmxvYWQuZHluYW1pY1VybCAmJlxyXG4gICAgICAgIERTT3B0aW9ucy5kb3dubG9hZC51cmwgPT09IHVuZGVmaW5lZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgd2ZzT3B0aW9ucztcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTICYmXHJcbiAgICAgICAgICBPYmplY3Qua2V5cygobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTKS5sZW5ndGggPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB3ZnNPcHRpb25zID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2ZzT3B0aW9ucyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvdXRwdXRGb3JtYXREb3dubG9hZCA9XHJcbiAgICAgICAgICB3ZnNPcHRpb25zLm91dHB1dEZvcm1hdERvd25sb2FkID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyAnb3V0cHV0Zm9ybWF0PScgKyB3ZnNPcHRpb25zLm91dHB1dEZvcm1hdFxyXG4gICAgICAgICAgICA6ICdvdXRwdXRmb3JtYXQ9JyArIHdmc09wdGlvbnMub3V0cHV0Rm9ybWF0RG93bmxvYWQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2V1cmwgPSBEU09wdGlvbnMuZG93bmxvYWQuZHluYW1pY1VybFxyXG4gICAgICAgICAgLnJlcGxhY2UoLyY/b3V0cHV0Zm9ybWF0PVteJl0qL2dpLCAnJylcclxuICAgICAgICAgIC5yZXBsYWNlKC8mP2ZpbHRlcj1bXiZdKi9naSwgJycpXHJcbiAgICAgICAgICAucmVwbGFjZSgvJj9iYm94PVteJl0qL2dpLCAnJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlYnVpbGRGaWx0ZXIgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihcclxuICAgICAgICAgIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5vZ2NGaWx0ZXJzLmZpbHRlcnMsXHJcbiAgICAgICAgICBsYXllci5tYXAuZ2V0RXh0ZW50KCksXHJcbiAgICAgICAgICBuZXcgb2xQcm9qZWN0aW9uKHsgY29kZTogbGF5ZXIubWFwLnByb2plY3Rpb24gfSksXHJcbiAgICAgICAgICB3ZnNPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgICB3aW5kb3cub3BlbihcclxuICAgICAgICAgIGAke2Jhc2V1cmx9JiR7cmVidWlsZEZpbHRlcn0mJHtvdXRwdXRGb3JtYXREb3dubG9hZH1gLFxyXG4gICAgICAgICAgJ19ibGFuaydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKERTT3B0aW9ucy5kb3dubG9hZCkge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKERTT3B0aW9ucy5kb3dubG9hZC51cmwsICdfYmxhbmsnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=