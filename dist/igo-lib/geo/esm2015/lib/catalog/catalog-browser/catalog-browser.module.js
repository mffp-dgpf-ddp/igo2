/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoCollapsibleModule, IgoListModule } from '@igo2/common';
import { CatalogBrowserComponent } from './catalog-browser.component';
import { CatalogBrowserLayerComponent } from './catalog-browser-layer.component';
import { CatalogBrowserGroupComponent } from './catalog-browser-group.component';
/**
 * @ignore
 */
export class IgoCatalogBrowserModule {
}
IgoCatalogBrowserModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatIconModule,
                    MatListModule,
                    MatTooltipModule,
                    IgoLanguageModule,
                    IgoListModule,
                    IgoCollapsibleModule
                ],
                exports: [
                    CatalogBrowserComponent
                ],
                declarations: [
                    CatalogBrowserComponent,
                    CatalogBrowserGroupComponent,
                    CatalogBrowserLayerComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNkLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBeUJqRixNQUFNLE9BQU8sdUJBQXVCOzs7WUFwQm5DLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGlCQUFpQjtvQkFDakIsYUFBYTtvQkFDYixvQkFBb0I7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCx1QkFBdUI7aUJBQ3hCO2dCQUNELFlBQVksRUFBRTtvQkFDWix1QkFBdUI7b0JBQ3ZCLDRCQUE0QjtvQkFDNUIsNEJBQTRCO2lCQUM3QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHtcclxuICBJZ29Db2xsYXBzaWJsZU1vZHVsZSxcclxuICBJZ29MaXN0TW9kdWxlXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IENhdGFsb2dCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2F0YWxvZ0Jyb3dzZXJMYXllckNvbXBvbmVudCB9IGZyb20gJy4vY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhdGFsb2dCcm93c2VyR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2NhdGFsb2ctYnJvd3Nlci1ncm91cC5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvQ29sbGFwc2libGVNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIENhdGFsb2dCcm93c2VyQ29tcG9uZW50XHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIENhdGFsb2dCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgQ2F0YWxvZ0Jyb3dzZXJHcm91cENvbXBvbmVudCxcclxuICAgIENhdGFsb2dCcm93c2VyTGF5ZXJDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29DYXRhbG9nQnJvd3Nlck1vZHVsZSB7fVxyXG4iXX0=