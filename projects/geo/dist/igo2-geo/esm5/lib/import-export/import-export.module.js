/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTabsModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatIconModule, MatTooltipModule, MatButtonToggleModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoKeyValueModule, IgoDrapDropModule, IgoSpinnerModule } from '@igo2/common';
import { ExportButtonComponent } from './export-button/export-button.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { DropGeoFileDirective } from './shared/drop-geo-file.directive';
import { IgoStyleListModule } from './style-list/style-list.module';
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
                        MatIconModule,
                        MatTooltipModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatTabsModule,
                        MatSelectModule,
                        MatOptionModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatSlideToggleModule,
                        IgoLanguageModule,
                        IgoSpinnerModule,
                        IgoKeyValueModule,
                        IgoDrapDropModule,
                        IgoStyleListModule.forRoot()
                    ],
                    exports: [ImportExportComponent, DropGeoFileDirective, IgoStyleListModule, ExportButtonComponent],
                    declarations: [ImportExportComponent, DropGeoFileDirective, ExportButtonComponent]
                },] }
    ];
    return IgoImportExportModule;
}());
export { IgoImportExportModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV0RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVwRTtJQUFBO0lBOEJBLENBQUM7Ozs7SUFMUSw2QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFxQjtTQUNoQyxDQUFDO0lBQ0osQ0FBQzs7Z0JBN0JGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixpQkFBaUI7d0JBQ2pCLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLENBQUM7b0JBQ2pHLFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDO2lCQUNuRjs7SUFPRCw0QkFBQztDQUFBLEFBOUJELElBOEJDO1NBTlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFRhYnNNb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdE9wdGlvbk1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb0tleVZhbHVlTW9kdWxlLCBJZ29EcmFwRHJvcE1vZHVsZSwgSWdvU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBFeHBvcnRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2V4cG9ydC1idXR0b24vZXhwb3J0LWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbXBvcnRFeHBvcnRDb21wb25lbnQgfSBmcm9tICcuL2ltcG9ydC1leHBvcnQvaW1wb3J0LWV4cG9ydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEcm9wR2VvRmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL2Ryb3AtZ2VvLWZpbGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSWdvU3R5bGVMaXN0TW9kdWxlIH0gZnJvbSAnLi9zdHlsZS1saXN0L3N0eWxlLWxpc3QubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXHJcbiAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvU3Bpbm5lck1vZHVsZSxcclxuICAgIElnb0tleVZhbHVlTW9kdWxlLFxyXG4gICAgSWdvRHJhcERyb3BNb2R1bGUsXHJcbiAgICBJZ29TdHlsZUxpc3RNb2R1bGUuZm9yUm9vdCgpXHJcbiAgXSxcclxuICBleHBvcnRzOiBbSW1wb3J0RXhwb3J0Q29tcG9uZW50LCBEcm9wR2VvRmlsZURpcmVjdGl2ZSwgSWdvU3R5bGVMaXN0TW9kdWxlLCBFeHBvcnRCdXR0b25Db21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW0ltcG9ydEV4cG9ydENvbXBvbmVudCwgRHJvcEdlb0ZpbGVEaXJlY3RpdmUsIEV4cG9ydEJ1dHRvbkNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0ltcG9ydEV4cG9ydE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvSW1wb3J0RXhwb3J0TW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=