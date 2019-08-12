/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { IgoContextManagerModule } from './context-manager/context-manager.module';
import { IgoContextMapButtonModule } from './context-map-button/context-map-button.module';
import { IgoShareMapModule } from './share-map/share-map.module';
import { IgoSidenavModule } from './sidenav/sidenav.module';
var IgoContextModule = /** @class */ (function () {
    function IgoContextModule() {
    }
    /**
     * @return {?}
     */
    IgoContextModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoContextModule,
            providers: []
        };
    };
    IgoContextModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [],
                    exports: [
                        IgoContextManagerModule,
                        IgoContextMapButtonModule,
                        IgoShareMapModule,
                        IgoSidenavModule
                    ]
                },] }
    ];
    return IgoContextModule;
}());
export { IgoContextModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RDtJQUFBO0lBaUJBLENBQUM7Ozs7SUFOUSx3QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOztnQkFoQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsdUJBQXVCO3dCQUN2Qix5QkFBeUI7d0JBQ3pCLGlCQUFpQjt3QkFDakIsZ0JBQWdCO3FCQUNqQjtpQkFDRjs7SUFRRCx1QkFBQztDQUFBLEFBakJELElBaUJDO1NBUFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb0NvbnRleHRNYW5hZ2VyTW9kdWxlIH0gZnJvbSAnLi9jb250ZXh0LW1hbmFnZXIvY29udGV4dC1tYW5hZ2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0NvbnRleHRNYXBCdXR0b25Nb2R1bGUgfSBmcm9tICcuL2NvbnRleHQtbWFwLWJ1dHRvbi9jb250ZXh0LW1hcC1idXR0b24ubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2hhcmVNYXBNb2R1bGUgfSBmcm9tICcuL3NoYXJlLW1hcC9zaGFyZS1tYXAubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvU2lkZW5hdk1vZHVsZSB9IGZyb20gJy4vc2lkZW5hdi9zaWRlbmF2Lm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtdLFxyXG4gIGRlY2xhcmF0aW9uczogW10sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSWdvQ29udGV4dE1hbmFnZXJNb2R1bGUsXHJcbiAgICBJZ29Db250ZXh0TWFwQnV0dG9uTW9kdWxlLFxyXG4gICAgSWdvU2hhcmVNYXBNb2R1bGUsXHJcbiAgICBJZ29TaWRlbmF2TW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQ29udGV4dE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQ29udGV4dE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19