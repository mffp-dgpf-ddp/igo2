/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { IgoKeyValueModule } from '../keyvalue/keyvalue.module';
import { JsonDialogComponent } from './json-dialog.component';
import { JsonDialogService } from './json-dialog.service';
var IgoJsonDialogModule = /** @class */ (function () {
    function IgoJsonDialogModule() {
    }
    /**
     * @return {?}
     */
    IgoJsonDialogModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoJsonDialogModule
        };
    };
    IgoJsonDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatButtonModule, MatDialogModule, IgoKeyValueModule],
                    exports: [JsonDialogComponent],
                    declarations: [JsonDialogComponent],
                    entryComponents: [JsonDialogComponent],
                    providers: [JsonDialogService]
                },] }
    ];
    return IgoJsonDialogModule;
}());
export { IgoJsonDialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2pzb24tZGlhbG9nL2pzb24tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQ7SUFBQTtJQWFBLENBQUM7Ozs7SUFMUSwyQkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFtQjtTQUM5QixDQUFDO0lBQ0osQ0FBQzs7Z0JBWkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixDQUFDO29CQUM1RSxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQ25DLGVBQWUsRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUN0QyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDL0I7O0lBT0QsMEJBQUM7Q0FBQSxBQWJELElBYUM7U0FOWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0tleVZhbHVlTW9kdWxlIH0gZnJvbSAnLi4va2V5dmFsdWUva2V5dmFsdWUubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IEpzb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2pzb24tZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEpzb25EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9qc29uLWRpYWxvZy5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsIElnb0tleVZhbHVlTW9kdWxlXSxcclxuICBleHBvcnRzOiBbSnNvbkRpYWxvZ0NvbXBvbmVudF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbSnNvbkRpYWxvZ0NvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbSnNvbkRpYWxvZ0NvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbSnNvbkRpYWxvZ1NlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29Kc29uRGlhbG9nTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29Kc29uRGlhbG9nTW9kdWxlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=