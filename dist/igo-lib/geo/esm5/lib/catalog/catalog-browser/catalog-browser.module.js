/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoCollapsibleModule, IgoListModule } from '@igo2/common';
import { IgoMetadataModule } from './../../metadata/metadata.module';
import { CatalogBrowserComponent } from './catalog-browser.component';
import { CatalogBrowserLayerComponent } from './catalog-browser-layer.component';
import { CatalogBrowserGroupComponent } from './catalog-browser-group.component';
/**
 * @ignore
 */
var IgoCatalogBrowserModule = /** @class */ (function () {
    function IgoCatalogBrowserModule() {
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
                        IgoCollapsibleModule,
                        IgoMetadataModule
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
    return IgoCatalogBrowserModule;
}());
export { IgoCatalogBrowserModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNkLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBS2pGO0lBQUE7SUFxQnNDLENBQUM7O2dCQXJCdEMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsdUJBQXVCO3FCQUN4QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLDRCQUE0QjtxQkFDN0I7aUJBQ0Y7O0lBQ3FDLDhCQUFDO0NBQUEsQUFyQnZDLElBcUJ1QztTQUExQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIElnb0NvbGxhcHNpYmxlTW9kdWxlLFxyXG4gIElnb0xpc3RNb2R1bGVcclxufSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWV0YWRhdGFNb2R1bGUgfSBmcm9tICcuLy4uLy4uL21ldGFkYXRhL21ldGFkYXRhLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhdGFsb2dCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jYXRhbG9nLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2F0YWxvZ0Jyb3dzZXJMYXllckNvbXBvbmVudCB9IGZyb20gJy4vY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhdGFsb2dCcm93c2VyR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2NhdGFsb2ctYnJvd3Nlci1ncm91cC5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29MaXN0TW9kdWxlLFxyXG4gICAgSWdvQ29sbGFwc2libGVNb2R1bGUsXHJcbiAgICBJZ29NZXRhZGF0YU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQ2F0YWxvZ0Jyb3dzZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ2F0YWxvZ0Jyb3dzZXJDb21wb25lbnQsXHJcbiAgICBDYXRhbG9nQnJvd3Nlckdyb3VwQ29tcG9uZW50LFxyXG4gICAgQ2F0YWxvZ0Jyb3dzZXJMYXllckNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0NhdGFsb2dCcm93c2VyTW9kdWxlIHt9XHJcbiJdfQ==