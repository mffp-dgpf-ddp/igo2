/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgoWidgetModule } from '@igo2/common';
import { provideOgcFilterWidget } from './widgets/widgets';
import { IgoOgcFilterModule } from './widgets/ogc-filter/ogc-filter.module';
import { IgoWorkspaceSelectorModule } from './workspace-selector/workspace-selector.module';
export class IgoGeoWorkspaceModule {
}
IgoGeoWorkspaceModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoWidgetModule,
                    IgoWorkspaceSelectorModule,
                    IgoOgcFilterModule
                ],
                exports: [
                    IgoWorkspaceSelectorModule,
                    IgoOgcFilterModule
                ],
                declarations: [],
                providers: [
                    provideOgcFilterWidget()
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi93b3Jrc3BhY2Uvd29ya3NwYWNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQWtCNUYsTUFBTSxPQUFPLHFCQUFxQjs7O1lBaEJqQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZiwwQkFBMEI7b0JBQzFCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLDBCQUEwQjtvQkFDMUIsa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUUsRUFBRTtnQkFDaEIsU0FBUyxFQUFFO29CQUNULHNCQUFzQixFQUFFO2lCQUN6QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSWdvV2lkZ2V0TW9kdWxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IHByb3ZpZGVPZ2NGaWx0ZXJXaWRnZXQgfSBmcm9tICcuL3dpZGdldHMvd2lkZ2V0cyc7XHJcblxyXG5pbXBvcnQgeyBJZ29PZ2NGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL3dpZGdldHMvb2djLWZpbHRlci9vZ2MtZmlsdGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1dvcmtzcGFjZVNlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi93b3Jrc3BhY2Utc2VsZWN0b3Ivd29ya3NwYWNlLXNlbGVjdG9yLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIElnb1dpZGdldE1vZHVsZSxcclxuICAgIElnb1dvcmtzcGFjZVNlbGVjdG9yTW9kdWxlLFxyXG4gICAgSWdvT2djRmlsdGVyTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJZ29Xb3Jrc3BhY2VTZWxlY3Rvck1vZHVsZSxcclxuICAgIElnb09nY0ZpbHRlck1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHByb3ZpZGVPZ2NGaWx0ZXJXaWRnZXQoKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0dlb1dvcmtzcGFjZU1vZHVsZSB7fVxyXG4iXX0=