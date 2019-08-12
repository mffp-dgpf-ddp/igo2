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
                        IgoSearchSelectorModule
                    ],
                    exports: [
                        SearchBarComponent,
                        SearchBarComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLEVBQ2YsYUFBYSxFQUNiLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsY0FBYyxFQUNmLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBS3ZFO0lBQUE7SUF1QmlDLENBQUM7O2dCQXZCakMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3FCQUNuQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osa0JBQWtCO3dCQUNsQix1QkFBdUI7cUJBQ3hCO2lCQUNGOztJQUNnQyx5QkFBQztDQUFBLEFBdkJsQyxJQXVCa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSxcclxuICBNYXRSYWRpb01vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvU2VhcmNoU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuLi9zZWFyY2gtc2VsZWN0b3Ivc2VhcmNoLXNlbGVjdG9yLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNlYXJjaEJhckNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTZWFyY2hVcmxQYXJhbURpcmVjdGl2ZSB9IGZyb20gJy4vc2VhcmNoLXVybC1wYXJhbS5kaXJlY3RpdmUnO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXRSYWRpb01vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29TZWFyY2hTZWxlY3Rvck1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgU2VhcmNoQmFyQ29tcG9uZW50LFxyXG4gICAgU2VhcmNoQmFyQ29tcG9uZW50XHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFNlYXJjaEJhckNvbXBvbmVudCxcclxuICAgIFNlYXJjaFVybFBhcmFtRGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvU2VhcmNoQmFyTW9kdWxlIHt9XHJcbiJdfQ==