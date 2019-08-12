/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTabsModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoKeyValueModule, IgoDrapDropModule } from '@igo2/common';
import { ImportExportComponent } from './import-export/import-export.component';
import { DropGeoFileDirective } from './shared/drop-geo-file.directive';
var IgoImportExportModule = /** @class */ (function () {
    function IgoImportExportModule() {
    }
    /**
     * @return {?}
     */
    IgoImportExportModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoImportExportModule
        };
    };
    IgoImportExportModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        MatButtonModule,
                        MatTabsModule,
                        MatSelectModule,
                        MatOptionModule,
                        MatFormFieldModule,
                        MatInputModule,
                        IgoLanguageModule,
                        IgoKeyValueModule,
                        IgoDrapDropModule
                    ],
                    exports: [ImportExportComponent, DropGeoFileDirective],
                    declarations: [ImportExportComponent, DropGeoFileDirective]
                },] }
    ];
    return IgoImportExportModule;
}());
export { IgoImportExportModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixjQUFjLEVBQ2YsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXhFO0lBQUE7SUF3QkEsQ0FBQzs7OztJQUxRLDZCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUscUJBQXFCO1NBQ2hDLENBQUM7SUFDSixDQUFDOztnQkF2QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQztvQkFDdEQsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CLENBQUM7aUJBQzVEOztJQU9ELDRCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0FOWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VGFic01vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb0tleVZhbHVlTW9kdWxlLCBJZ29EcmFwRHJvcE1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJbXBvcnRFeHBvcnRDb21wb25lbnQgfSBmcm9tICcuL2ltcG9ydC1leHBvcnQvaW1wb3J0LWV4cG9ydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEcm9wR2VvRmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL2Ryb3AtZ2VvLWZpbGUuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29LZXlWYWx1ZU1vZHVsZSxcclxuICAgIElnb0RyYXBEcm9wTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbSW1wb3J0RXhwb3J0Q29tcG9uZW50LCBEcm9wR2VvRmlsZURpcmVjdGl2ZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbSW1wb3J0RXhwb3J0Q29tcG9uZW50LCBEcm9wR2VvRmlsZURpcmVjdGl2ZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0ltcG9ydEV4cG9ydE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvSW1wb3J0RXhwb3J0TW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=