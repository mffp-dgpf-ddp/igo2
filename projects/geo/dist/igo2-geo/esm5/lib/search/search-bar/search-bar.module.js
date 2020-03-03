/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule, MatIconModule, MatButtonModule, MatMenuModule, MatRadioModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoSearchSelectorModule } from '../search-selector/search-selector.module';
import { IgoSearchSettingsModule } from '../search-settings/search-settings.module';
import { SearchBarComponent } from './search-bar.component';
import { SearchUrlParamDirective } from './search-url-param.directive';
/**
 * @ignore
 */
var IgoSearchBarModule = /** @class */ (function () {
    function IgoSearchBarModule() {
    }
    IgoSearchBarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        MatTooltipModule,
                        MatIconModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatRadioModule,
                        MatFormFieldModule,
                        MatInputModule,
                        IgoLanguageModule,
                        IgoSearchSelectorModule,
                        IgoSearchSettingsModule
                    ],
                    exports: [
                        SearchBarComponent,
                    ],
                    declarations: [
                        SearchBarComponent,
                        SearchUrlParamDirective
                    ]
                },] }
    ];
    return IgoSearchBarModule;
}());
export { IgoSearchBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLEVBQ2YsYUFBYSxFQUNiLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsY0FBYyxFQUNmLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBS3ZFO0lBQUE7SUF1QmlDLENBQUM7O2dCQXZCakMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3FCQUNuQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osa0JBQWtCO3dCQUNsQix1QkFBdUI7cUJBQ3hCO2lCQUNGOztJQUNnQyx5QkFBQztDQUFBLEFBdkJsQyxJQXVCa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSxcclxuICBNYXRSYWRpb01vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuLi9zZWFyY2gtc2VsZWN0b3Ivc2VhcmNoLXNlbGVjdG9yLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb1NlYXJjaFNldHRpbmdzTW9kdWxlIH0gZnJvbSAnLi4vc2VhcmNoLXNldHRpbmdzL3NlYXJjaC1zZXR0aW5ncy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXJDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2VhcmNoVXJsUGFyYW1EaXJlY3RpdmUgfSBmcm9tICcuL3NlYXJjaC11cmwtcGFyYW0uZGlyZWN0aXZlJztcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0UmFkaW9Nb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZXR0aW5nc01vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgU2VhcmNoQmFyQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTZWFyY2hCYXJDb21wb25lbnQsXHJcbiAgICBTZWFyY2hVcmxQYXJhbURpcmVjdGl2ZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb1NlYXJjaEJhck1vZHVsZSB7fVxyXG4iXX0=