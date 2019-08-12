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
                    IgoKeyValueModule,
                    IgoDrapDropModule
                ],
                exports: [ImportExportComponent, DropGeoFileDirective],
                declarations: [ImportExportComponent, DropGeoFileDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixjQUFjLEVBQ2YsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBb0J4RSxNQUFNLE9BQU8scUJBQXFCOzs7O0lBQ2hDLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7U0FDaEMsQ0FBQztJQUNKLENBQUM7OztZQXZCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixlQUFlO29CQUNmLGVBQWU7b0JBQ2Ysa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUNqQixpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDO2dCQUN0RCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQzthQUM1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRUYWJzTW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRPcHRpb25Nb2R1bGUsXHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvS2V5VmFsdWVNb2R1bGUsIElnb0RyYXBEcm9wTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEltcG9ydEV4cG9ydENvbXBvbmVudCB9IGZyb20gJy4vaW1wb3J0LWV4cG9ydC9pbXBvcnQtZXhwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERyb3BHZW9GaWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9zaGFyZWQvZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb0tleVZhbHVlTW9kdWxlLFxyXG4gICAgSWdvRHJhcERyb3BNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtJbXBvcnRFeHBvcnRDb21wb25lbnQsIERyb3BHZW9GaWxlRGlyZWN0aXZlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtJbXBvcnRFeHBvcnRDb21wb25lbnQsIERyb3BHZW9GaWxlRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvSW1wb3J0RXhwb3J0TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29JbXBvcnRFeHBvcnRNb2R1bGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==