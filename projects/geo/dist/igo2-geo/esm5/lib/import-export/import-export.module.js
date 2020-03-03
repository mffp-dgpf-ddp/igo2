/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTabsModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoKeyValueModule, IgoDrapDropModule, IgoSpinnerModule } from '@igo2/common';
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
                        IgoSpinnerModule,
                        IgoKeyValueModule,
                        IgoDrapDropModule,
                        IgoStyleListModule.forRoot()
                    ],
                    exports: [ImportExportComponent, DropGeoFileDirective, IgoStyleListModule],
                    declarations: [ImportExportComponent, DropGeoFileDirective]
                },] }
    ];
    return IgoImportExportModule;
}());
export { IgoImportExportModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixjQUFjLEVBQ2YsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXRGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXBFO0lBQUE7SUEwQkEsQ0FBQzs7OztJQUxRLDZCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUscUJBQXFCO1NBQ2hDLENBQUM7SUFDSixDQUFDOztnQkF6QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUM7b0JBQzFFLFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDO2lCQUM1RDs7SUFPRCw0QkFBQztDQUFBLEFBMUJELElBMEJDO1NBTlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdFRhYnNNb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdE9wdGlvbk1vZHVsZSxcclxuICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgTWF0SW5wdXRNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29LZXlWYWx1ZU1vZHVsZSwgSWdvRHJhcERyb3BNb2R1bGUsIElnb1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSW1wb3J0RXhwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRHJvcEdlb0ZpbGVEaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlZC9kcm9wLWdlby1maWxlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElnb1N0eWxlTGlzdE1vZHVsZSB9IGZyb20gJy4vc3R5bGUtbGlzdC9zdHlsZS1saXN0Lm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFRhYnNNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgSWdvU3Bpbm5lck1vZHVsZSxcclxuICAgIElnb0tleVZhbHVlTW9kdWxlLFxyXG4gICAgSWdvRHJhcERyb3BNb2R1bGUsXHJcbiAgICBJZ29TdHlsZUxpc3RNb2R1bGUuZm9yUm9vdCgpXHJcbiAgXSxcclxuICBleHBvcnRzOiBbSW1wb3J0RXhwb3J0Q29tcG9uZW50LCBEcm9wR2VvRmlsZURpcmVjdGl2ZSwgSWdvU3R5bGVMaXN0TW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtJbXBvcnRFeHBvcnRDb21wb25lbnQsIERyb3BHZW9GaWxlRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvSW1wb3J0RXhwb3J0TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29JbXBvcnRFeHBvcnRNb2R1bGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==