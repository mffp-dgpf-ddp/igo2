/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { IgoCatalogModule } from './catalog/catalog.module';
import { IgoDataSourceModule } from './datasource/datasource.module';
import { IgoDownloadModule } from './download/download.module';
import { IgoFeatureModule } from './feature/feature.module';
import { IgoFilterModule } from './filter/filter.module';
import { IgoGeometryModule } from './geometry/geometry.module';
import { IgoImportExportModule } from './import-export/import-export.module';
import { IgoLayerModule } from './layer/layer.module';
import { IgoMapModule } from './map/map.module';
import { IgoMeasureModule } from './measure/measure.module';
import { IgoMetadataModule } from './metadata/metadata.module';
import { IgoOverlayModule } from './overlay/overlay.module';
import { IgoPrintModule } from './print/print.module';
import { IgoQueryModule } from './query/query.module';
import { IgoDirectionsModule } from './directions/directions.module';
import { IgoSearchModule } from './search/search.module';
import { IgoToastModule } from './toast/toast.module';
import { IgoGeoWorkspaceModule } from './workspace/workspace.module';
import { IgoWktModule } from './wkt/wkt.module';
export class IgoGeoModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoGeoModule,
            providers: []
        };
    }
}
IgoGeoModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: [
                    IgoCatalogModule,
                    IgoDataSourceModule,
                    IgoDownloadModule,
                    IgoFeatureModule,
                    IgoFilterModule,
                    IgoGeometryModule,
                    IgoImportExportModule,
                    IgoLayerModule,
                    IgoMapModule,
                    IgoMeasureModule,
                    IgoMetadataModule,
                    IgoOverlayModule,
                    IgoPrintModule,
                    IgoQueryModule,
                    IgoDirectionsModule,
                    IgoSearchModule,
                    IgoToastModule,
                    IgoGeoWorkspaceModule,
                    IgoWktModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9nZW8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBMkJoRCxNQUFNLE9BQU8sWUFBWTs7OztJQUN2QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOzs7WUEvQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLGlCQUFpQjtvQkFDakIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixjQUFjO29CQUNkLHFCQUFxQjtvQkFDckIsWUFBWTtpQkFDYjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb0NhdGFsb2dNb2R1bGUgfSBmcm9tICcuL2NhdGFsb2cvY2F0YWxvZy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29EYXRhU291cmNlTW9kdWxlIH0gZnJvbSAnLi9kYXRhc291cmNlL2RhdGFzb3VyY2UubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvRG93bmxvYWRNb2R1bGUgfSBmcm9tICcuL2Rvd25sb2FkL2Rvd25sb2FkLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0ZlYXR1cmVNb2R1bGUgfSBmcm9tICcuL2ZlYXR1cmUvZmVhdHVyZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29GaWx0ZXJNb2R1bGUgfSBmcm9tICcuL2ZpbHRlci9maWx0ZXIubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvR2VvbWV0cnlNb2R1bGUgfSBmcm9tICcuL2dlb21ldHJ5L2dlb21ldHJ5Lm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0ltcG9ydEV4cG9ydE1vZHVsZSB9IGZyb20gJy4vaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0xheWVyTW9kdWxlIH0gZnJvbSAnLi9sYXllci9sYXllci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29NYXBNb2R1bGUgfSBmcm9tICcuL21hcC9tYXAubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvTWVhc3VyZU1vZHVsZSB9IGZyb20gJy4vbWVhc3VyZS9tZWFzdXJlLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb01ldGFkYXRhTW9kdWxlIH0gZnJvbSAnLi9tZXRhZGF0YS9tZXRhZGF0YS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi9vdmVybGF5L292ZXJsYXkubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvUHJpbnRNb2R1bGUgfSBmcm9tICcuL3ByaW50L3ByaW50Lm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1F1ZXJ5TW9kdWxlIH0gZnJvbSAnLi9xdWVyeS9xdWVyeS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29EaXJlY3Rpb25zTW9kdWxlIH0gZnJvbSAnLi9kaXJlY3Rpb25zL2RpcmVjdGlvbnMubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2VhcmNoTW9kdWxlIH0gZnJvbSAnLi9zZWFyY2gvc2VhcmNoLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1RvYXN0TW9kdWxlIH0gZnJvbSAnLi90b2FzdC90b2FzdC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29HZW9Xb3Jrc3BhY2VNb2R1bGUgfSBmcm9tICcuL3dvcmtzcGFjZS93b3Jrc3BhY2UubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvV2t0TW9kdWxlIH0gZnJvbSAnLi93a3Qvd2t0Lm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtdLFxyXG4gIGRlY2xhcmF0aW9uczogW10sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSWdvQ2F0YWxvZ01vZHVsZSxcclxuICAgIElnb0RhdGFTb3VyY2VNb2R1bGUsXHJcbiAgICBJZ29Eb3dubG9hZE1vZHVsZSxcclxuICAgIElnb0ZlYXR1cmVNb2R1bGUsXHJcbiAgICBJZ29GaWx0ZXJNb2R1bGUsXHJcbiAgICBJZ29HZW9tZXRyeU1vZHVsZSxcclxuICAgIElnb0ltcG9ydEV4cG9ydE1vZHVsZSxcclxuICAgIElnb0xheWVyTW9kdWxlLFxyXG4gICAgSWdvTWFwTW9kdWxlLFxyXG4gICAgSWdvTWVhc3VyZU1vZHVsZSxcclxuICAgIElnb01ldGFkYXRhTW9kdWxlLFxyXG4gICAgSWdvT3ZlcmxheU1vZHVsZSxcclxuICAgIElnb1ByaW50TW9kdWxlLFxyXG4gICAgSWdvUXVlcnlNb2R1bGUsXHJcbiAgICBJZ29EaXJlY3Rpb25zTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoTW9kdWxlLFxyXG4gICAgSWdvVG9hc3RNb2R1bGUsXHJcbiAgICBJZ29HZW9Xb3Jrc3BhY2VNb2R1bGUsXHJcbiAgICBJZ29Xa3RNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29HZW9Nb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0dlb01vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19