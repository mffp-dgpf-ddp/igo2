/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatSidenavModule, MatTooltipModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoPanelModule, IgoFlexibleModule } from '@igo2/common';
import { IgoFeatureModule } from '@igo2/geo';
import { IgoContextManagerModule } from '../context-manager/context-manager.module';
import { SidenavComponent } from './sidenav.component';
export class IgoSidenavModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoSidenavModule
        };
    }
}
IgoSidenavModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSidenavModule,
                    MatTooltipModule,
                    IgoLanguageModule,
                    IgoPanelModule,
                    IgoFlexibleModule,
                    IgoFeatureModule,
                    IgoContextManagerModule
                ],
                exports: [SidenavComponent],
                declarations: [SidenavComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NpZGVuYXYvc2lkZW5hdi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTdDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBa0J2RCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBQzNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQztJQUNKLENBQUM7OztZQXJCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixnQkFBZ0I7b0JBQ2hCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRTaWRlbmF2TW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29QYW5lbE1vZHVsZSwgSWdvRmxleGlibGVNb2R1bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBJZ29GZWF0dXJlTW9kdWxlIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IElnb0NvbnRleHRNYW5hZ2VyTW9kdWxlIH0gZnJvbSAnLi4vY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbWFuYWdlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTaWRlbmF2Q29tcG9uZW50IH0gZnJvbSAnLi9zaWRlbmF2LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvUGFuZWxNb2R1bGUsXHJcbiAgICBJZ29GbGV4aWJsZU1vZHVsZSxcclxuICAgIElnb0ZlYXR1cmVNb2R1bGUsXHJcbiAgICBJZ29Db250ZXh0TWFuYWdlck1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1NpZGVuYXZDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW1NpZGVuYXZDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29TaWRlbmF2TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29TaWRlbmF2TW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=