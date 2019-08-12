/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { IgoFlexibleModule, IgoPanelModule } from '@igo2/common';
import { IgoFeatureModule, IgoSearchModule, IgoFeatureDetailsModule } from '@igo2/geo';
import { SearchResultsToolComponent } from './search-results-tool/search-results-tool.component';
var IgoAppSearchModule = /** @class */ (function () {
    function IgoAppSearchModule() {
    }
    IgoAppSearchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        IgoFeatureModule,
                        IgoSearchModule,
                        IgoFlexibleModule,
                        IgoPanelModule,
                        IgoFeatureDetailsModule
                    ],
                    declarations: [SearchResultsToolComponent],
                    exports: [SearchResultsToolComponent],
                    entryComponents: [SearchResultsToolComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return IgoAppSearchModule;
}());
export { IgoAppSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2ludGVncmF0aW9uLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zZWFyY2gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakUsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsdUJBQXVCLEVBQ3hCLE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBRWpHO0lBQUE7SUFnQmlDLENBQUM7O2dCQWhCakMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLHVCQUF1QjtxQkFDeEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUNyQyxlQUFlLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDN0MsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDOztJQUNnQyx5QkFBQztDQUFBLEFBaEJsQyxJQWdCa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0ZsZXhpYmxlTW9kdWxlLCBJZ29QYW5lbE1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgSWdvRmVhdHVyZU1vZHVsZSxcclxuICBJZ29TZWFyY2hNb2R1bGUsXHJcbiAgSWdvRmVhdHVyZURldGFpbHNNb2R1bGVcclxufSBmcm9tICdAaWdvMi9nZW8nO1xyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzVG9vbENvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMtdG9vbC9zZWFyY2gtcmVzdWx0cy10b29sLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBJZ29GZWF0dXJlTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoTW9kdWxlLFxyXG4gICAgSWdvRmxleGlibGVNb2R1bGUsXHJcbiAgICBJZ29QYW5lbE1vZHVsZSxcclxuICAgIElnb0ZlYXR1cmVEZXRhaWxzTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTZWFyY2hSZXN1bHRzVG9vbENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1NlYXJjaFJlc3VsdHNUb29sQ29tcG9uZW50XSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtTZWFyY2hSZXN1bHRzVG9vbENvbXBvbmVudF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29BcHBTZWFyY2hNb2R1bGUge31cclxuIl19