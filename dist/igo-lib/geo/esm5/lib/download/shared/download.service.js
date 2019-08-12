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
var DownloadService = /** @class */ (function () {
    function DownloadService(messageService, languageService) {
        this.messageService = messageService;
        this.languageService = languageService;
        this.ogcFilterWriter = new OgcFilterWriter();
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    DownloadService.prototype.open = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var translate = this.languageService.translate;
        /** @type {?} */
        var title = translate.instant('igo.geo.download.title');
        this.messageService.success(translate.instant('igo.geo.download.start'), title);
        /** @type {?} */
        var DSOptions = layer.dataSource.options;
        if (Object.keys(DSOptions.download).length > 0) {
            if (DSOptions.download.dynamicUrl &&
                DSOptions.download.url === undefined) {
                /** @type {?} */
                var wfsOptions = void 0;
                if (((/** @type {?} */ (layer.dataSource.options))).paramsWFS &&
                    Object.keys(((/** @type {?} */ (layer.dataSource.options))).paramsWFS).length > 0) {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).paramsWFS;
                }
                else {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).params;
                }
                /** @type {?} */
                var outputFormatDownload = wfsOptions.outputFormatDownload === undefined
                    ? 'outputformat=' + wfsOptions.outputFormat
                    : 'outputformat=' + wfsOptions.outputFormatDownload;
                /** @type {?} */
                var baseurl = DSOptions.download.dynamicUrl
                    .replace(/&?outputformat=[^&]*/gi, '')
                    .replace(/&?filter=[^&]*/gi, '')
                    .replace(/&?bbox=[^&]*/gi, '');
                /** @type {?} */
                var rebuildFilter = this.ogcFilterWriter.buildFilter(((/** @type {?} */ (layer.dataSource.options))).ogcFilters.filters, layer.map.getExtent(), new olProjection({ code: layer.map.projection }), wfsOptions.fieldNameGeometry);
                window.open(baseurl + "&" + rebuildFilter + "&" + outputFormatDownload, '_blank');
            }
            else if (DSOptions.download) {
                window.open(DSOptions.download.url, '_blank');
            }
        }
    };
    DownloadService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DownloadService.ctorParameters = function () { return [
        { type: MessageService },
        { type: LanguageService }
    ]; };
    /** @nocollapse */ DownloadService.ngInjectableDef = i0.defineInjectable({ factory: function DownloadService_Factory() { return new DownloadService(i0.inject(i1.MessageService), i0.inject(i1.LanguageService)); }, token: DownloadService, providedIn: "root" });
    return DownloadService;
}());
export { DownloadService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9zaGFyZWQvZG93bmxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUl0RDtJQU1FLHlCQUNVLGNBQThCLEVBQzlCLGVBQWdDO1FBRGhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBRUQsOEJBQUk7Ozs7SUFBSixVQUFLLEtBQVk7O1lBQ1QsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs7WUFDMUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsRUFDM0MsS0FBSyxDQUNOLENBQUM7O1lBRUksU0FBUyxHQUFzQixLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU87UUFDN0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLElBQ0UsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVO2dCQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQ3BDOztvQkFDSSxVQUFVLFNBQUE7Z0JBQ2QsSUFDRSxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxTQUFTO29CQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ25FO29CQUNBLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQzFEO3FCQUFNO29CQUNMLFVBQVUsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQ3ZEOztvQkFFSyxvQkFBb0IsR0FDeEIsVUFBVSxDQUFDLG9CQUFvQixLQUFLLFNBQVM7b0JBQzNDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLFlBQVk7b0JBQzNDLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLG9CQUFvQjs7b0JBRWpELE9BQU8sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVU7cUJBQzFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUM7cUJBQ3JDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7cUJBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7O29CQUUxQixhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQ3BELENBQUMsbUJBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQ3BELEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQ3JCLElBQUksWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsRUFDaEQsVUFBVSxDQUFDLGlCQUFpQixDQUM3QjtnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUNOLE9BQU8sU0FBSSxhQUFhLFNBQUksb0JBQXNCLEVBQ3JELFFBQVEsQ0FDVCxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDOztnQkE3REYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFUUSxjQUFjO2dCQUFFLGVBQWU7OzswQkFKeEM7Q0F5RUMsQUE5REQsSUE4REM7U0EzRFksZUFBZTs7Ozs7O0lBQzFCLDBDQUF5Qzs7Ozs7SUFHdkMseUNBQXNDOzs7OztJQUN0QywwQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgb2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZCc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcldyaXRlciB9IGZyb20gJy4uLy4uL2ZpbHRlci9zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgb2djRmlsdGVyV3JpdGVyOiBPZ2NGaWx0ZXJXcml0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9nY0ZpbHRlcldyaXRlciA9IG5ldyBPZ2NGaWx0ZXJXcml0ZXIoKTtcclxuICB9XHJcblxyXG4gIG9wZW4obGF5ZXI6IExheWVyKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRvd25sb2FkLnRpdGxlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MoXHJcbiAgICAgIHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRvd25sb2FkLnN0YXJ0JyksXHJcbiAgICAgIHRpdGxlXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IERTT3B0aW9uczogRGF0YVNvdXJjZU9wdGlvbnMgPSBsYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoRFNPcHRpb25zLmRvd25sb2FkKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBEU09wdGlvbnMuZG93bmxvYWQuZHluYW1pY1VybCAmJlxyXG4gICAgICAgIERTT3B0aW9ucy5kb3dubG9hZC51cmwgPT09IHVuZGVmaW5lZFxyXG4gICAgICApIHtcclxuICAgICAgICBsZXQgd2ZzT3B0aW9ucztcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTICYmXHJcbiAgICAgICAgICBPYmplY3Qua2V5cygobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueSkucGFyYW1zV0ZTKS5sZW5ndGggPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB3ZnNPcHRpb25zID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBhbnkpLnBhcmFtc1dGUztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2ZzT3B0aW9ucyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5wYXJhbXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvdXRwdXRGb3JtYXREb3dubG9hZCA9XHJcbiAgICAgICAgICB3ZnNPcHRpb25zLm91dHB1dEZvcm1hdERvd25sb2FkID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyAnb3V0cHV0Zm9ybWF0PScgKyB3ZnNPcHRpb25zLm91dHB1dEZvcm1hdFxyXG4gICAgICAgICAgICA6ICdvdXRwdXRmb3JtYXQ9JyArIHdmc09wdGlvbnMub3V0cHV0Rm9ybWF0RG93bmxvYWQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2V1cmwgPSBEU09wdGlvbnMuZG93bmxvYWQuZHluYW1pY1VybFxyXG4gICAgICAgICAgLnJlcGxhY2UoLyY/b3V0cHV0Zm9ybWF0PVteJl0qL2dpLCAnJylcclxuICAgICAgICAgIC5yZXBsYWNlKC8mP2ZpbHRlcj1bXiZdKi9naSwgJycpXHJcbiAgICAgICAgICAucmVwbGFjZSgvJj9iYm94PVteJl0qL2dpLCAnJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlYnVpbGRGaWx0ZXIgPSB0aGlzLm9nY0ZpbHRlcldyaXRlci5idWlsZEZpbHRlcihcclxuICAgICAgICAgIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55KS5vZ2NGaWx0ZXJzLmZpbHRlcnMsXHJcbiAgICAgICAgICBsYXllci5tYXAuZ2V0RXh0ZW50KCksXHJcbiAgICAgICAgICBuZXcgb2xQcm9qZWN0aW9uKHsgY29kZTogbGF5ZXIubWFwLnByb2plY3Rpb24gfSksXHJcbiAgICAgICAgICB3ZnNPcHRpb25zLmZpZWxkTmFtZUdlb21ldHJ5XHJcbiAgICAgICAgKTtcclxuICAgICAgICB3aW5kb3cub3BlbihcclxuICAgICAgICAgIGAke2Jhc2V1cmx9JiR7cmVidWlsZEZpbHRlcn0mJHtvdXRwdXRGb3JtYXREb3dubG9hZH1gLFxyXG4gICAgICAgICAgJ19ibGFuaydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKERTT3B0aW9ucy5kb3dubG9hZCkge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKERTT3B0aW9ucy5kb3dubG9hZC51cmwsICdfYmxhbmsnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=