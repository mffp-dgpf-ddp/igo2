/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IgoFilterModule } from '@igo2/geo';
import { OgcFilterToolComponent } from './ogc-filter-tool/ogc-filter-tool.component';
import { TimeAnalysisToolComponent } from './time-analysis-tool/time-analysis-tool.component';
var IgoAppFilterModule = /** @class */ (function () {
    function IgoAppFilterModule() {
    }
    /**
     * @return {?}
     */
    IgoAppFilterModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoAppFilterModule,
            providers: []
        };
    };
    IgoAppFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [IgoFilterModule],
                    declarations: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                    exports: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                    entryComponents: [OgcFilterToolComponent, TimeAnalysisToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return IgoAppFilterModule;
}());
export { IgoAppFilterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlci9maWx0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUVSLHNCQUFzQixFQUN2QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRTlGO0lBQUE7SUFjQSxDQUFDOzs7O0lBTlEsMEJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7Z0JBYkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsWUFBWSxFQUFFLENBQUMsc0JBQXNCLEVBQUUseUJBQXlCLENBQUM7b0JBQ2pFLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLHlCQUF5QixDQUFDO29CQUM1RCxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztvQkFDcEUsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDOztJQVFELHlCQUFDO0NBQUEsQUFkRCxJQWNDO1NBUFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBOZ01vZHVsZSxcclxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxyXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUFcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb0ZpbHRlck1vZHVsZSB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlclRvb2xDb21wb25lbnQgfSBmcm9tICcuL29nYy1maWx0ZXItdG9vbC9vZ2MtZmlsdGVyLXRvb2wuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZUFuYWx5c2lzVG9vbENvbXBvbmVudCB9IGZyb20gJy4vdGltZS1hbmFseXNpcy10b29sL3RpbWUtYW5hbHlzaXMtdG9vbC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbSWdvRmlsdGVyTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtPZ2NGaWx0ZXJUb29sQ29tcG9uZW50LCBUaW1lQW5hbHlzaXNUb29sQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbT2djRmlsdGVyVG9vbENvbXBvbmVudCwgVGltZUFuYWx5c2lzVG9vbENvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbT2djRmlsdGVyVG9vbENvbXBvbmVudCwgVGltZUFuYWx5c2lzVG9vbENvbXBvbmVudF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29BcHBGaWx0ZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0FwcEZpbHRlck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19