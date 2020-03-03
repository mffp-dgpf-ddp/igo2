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
export class IgoImportExportModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoImportExportModule
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixjQUFjLEVBQ2YsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXRGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBc0JwRSxNQUFNLE9BQU8scUJBQXFCOzs7O0lBQ2hDLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7U0FDaEMsQ0FBQztJQUNKLENBQUM7OztZQXpCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixlQUFlO29CQUNmLGVBQWU7b0JBQ2Ysa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsa0JBQWtCLENBQUMsT0FBTyxFQUFFO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQztnQkFDMUUsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CLENBQUM7YUFDNUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgTWF0VGFic01vZHVsZSxcclxuICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICBNYXRJbnB1dE1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb0tleVZhbHVlTW9kdWxlLCBJZ29EcmFwRHJvcE1vZHVsZSwgSWdvU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJbXBvcnRFeHBvcnRDb21wb25lbnQgfSBmcm9tICcuL2ltcG9ydC1leHBvcnQvaW1wb3J0LWV4cG9ydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEcm9wR2VvRmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL2Ryb3AtZ2VvLWZpbGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSWdvU3R5bGVMaXN0TW9kdWxlIH0gZnJvbSAnLi9zdHlsZS1saXN0L3N0eWxlLWxpc3QubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdE9wdGlvbk1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29TcGlubmVyTW9kdWxlLFxyXG4gICAgSWdvS2V5VmFsdWVNb2R1bGUsXHJcbiAgICBJZ29EcmFwRHJvcE1vZHVsZSxcclxuICAgIElnb1N0eWxlTGlzdE1vZHVsZS5mb3JSb290KClcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtJbXBvcnRFeHBvcnRDb21wb25lbnQsIERyb3BHZW9GaWxlRGlyZWN0aXZlLCBJZ29TdHlsZUxpc3RNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0ltcG9ydEV4cG9ydENvbXBvbmVudCwgRHJvcEdlb0ZpbGVEaXJlY3RpdmVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29JbXBvcnRFeHBvcnRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb0ltcG9ydEV4cG9ydE1vZHVsZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19